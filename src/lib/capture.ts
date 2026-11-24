import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Platform } from 'react-native';

import { stateFromRegion } from '../data/meta';
import type { StateCode } from '../data/types';

export interface PreparedPhoto {
  uri: string;
  base64: string;
}

/** Ouvre l'appareil photo (ou la galerie) et renvoie une image redimensionnée prête pour l'analyse. */
export async function pickPhoto(source: 'camera' | 'library'): Promise<PreparedPhoto | null> {
  if (source === 'camera' && Platform.OS !== 'web') {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) throw new Error('L’accès à l’appareil photo est nécessaire pour observer des animaux.');
  }
  const options: ImagePicker.ImagePickerOptions = { mediaTypes: ['images'], quality: 0.9 };
  const result =
    source === 'camera' && Platform.OS !== 'web'
      ? await ImagePicker.launchCameraAsync(options)
      : await ImagePicker.launchImageLibraryAsync(options);
  if (result.canceled || !result.assets[0]) return null;

  const asset = result.assets[0];
  // On réduit l'image (côté le plus long ≈ 1280 px) : plus rapide à envoyer et assez précis pour l'IA.
  const landscape = (asset.width ?? 0) >= (asset.height ?? 0);
  const ctx = ImageManipulator.manipulate(asset.uri);
  ctx.resize(landscape ? { width: 1280 } : { height: 1280 });
  const image = await ctx.renderAsync();
  const saved = await image.saveAsync({ base64: true, compress: 0.7, format: SaveFormat.JPEG });
  if (!saved.base64) throw new Error('Impossible de préparer la photo.');
  return { uri: saved.uri, base64: saved.base64 };
}

export interface Place {
  latitude: number;
  longitude: number;
  place?: string;
  state?: StateCode;
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | null> {
  return Promise.race([promise, new Promise<null>((resolve) => setTimeout(() => resolve(null), ms))]);
}

/** Récupère la position actuelle (si autorisée) et un nom de lieu lisible. Ne lève jamais d'erreur. */
export async function getCurrentPlace(): Promise<Place | null> {
  try {
    const perm = await Location.requestForegroundPermissionsAsync();
    if (!perm.granted) return null;
    const pos = await withTimeout(
      Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced }),
      10000,
    );
    if (!pos) return null;
    const { latitude, longitude } = pos.coords;
    let place: string | undefined;
    let state: StateCode | undefined;
    if (Platform.OS !== 'web') {
      const geo = await withTimeout(Location.reverseGeocodeAsync({ latitude, longitude }), 6000);
      const first = geo?.[0];
      if (first) {
        place = [first.city ?? first.subregion ?? first.district, first.region].filter(Boolean).join(', ');
        state = stateFromRegion(first.region);
      }
    }
    return { latitude, longitude, place, state };
  } catch {
    return null;
  }
}
