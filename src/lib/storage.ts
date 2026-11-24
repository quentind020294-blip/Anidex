import AsyncStorage from '@react-native-async-storage/async-storage';
import { Directory, File, Paths } from 'expo-file-system';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

import type { Settings, Sighting } from '../data/types';

const SIGHTINGS_KEY = 'anidex/sightings/v1';
const SETTINGS_KEY = 'anidex/settings/v1';
const API_KEY_KEY = 'anidex_anthropic_api_key';

export const DEFAULT_SETTINGS: Settings = { autoIdentify: true, saveLocation: true };

export async function loadSightings(): Promise<Sighting[]> {
  try {
    const raw = await AsyncStorage.getItem(SIGHTINGS_KEY);
    return raw ? (JSON.parse(raw) as Sighting[]) : [];
  } catch {
    return [];
  }
}

export async function saveSightings(sightings: Sighting[]): Promise<void> {
  await AsyncStorage.setItem(SIGHTINGS_KEY, JSON.stringify(sightings));
}

export async function loadSettings(): Promise<Settings> {
  try {
    const raw = await AsyncStorage.getItem(SETTINGS_KEY);
    return raw ? { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<Settings>) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(settings: Settings): Promise<void> {
  await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

// La clé API est stockée dans le trousseau sécurisé de l'appareil (Keychain / Keystore).
// Sur le web (aperçu de développement uniquement), on se replie sur AsyncStorage.
export async function loadApiKey(): Promise<string> {
  try {
    if (Platform.OS === 'web') return (await AsyncStorage.getItem(API_KEY_KEY)) ?? '';
    return (await SecureStore.getItemAsync(API_KEY_KEY)) ?? '';
  } catch {
    return '';
  }
}

export async function saveApiKey(key: string): Promise<void> {
  const value = key.trim();
  if (Platform.OS === 'web') {
    if (value) await AsyncStorage.setItem(API_KEY_KEY, value);
    else await AsyncStorage.removeItem(API_KEY_KEY);
    return;
  }
  if (value) await SecureStore.setItemAsync(API_KEY_KEY, value);
  else await SecureStore.deleteItemAsync(API_KEY_KEY);
}

// ───────────── Photos ─────────────

function photoDir(): Directory {
  const dir = new Directory(Paths.document, 'photos');
  if (!dir.exists) dir.create({ intermediates: true, idempotent: true });
  return dir;
}

/**
 * Copie la photo dans le stockage permanent de l'app et renvoie son URI.
 * Sur le web, on conserve une data-URI (base64) puisque les blobs sont temporaires.
 */
export async function persistPhoto(uri: string, id: string, base64?: string | null): Promise<string> {
  if (Platform.OS === 'web') {
    return base64 ? `data:image/jpeg;base64,${base64}` : uri;
  }
  const dest = new File(photoDir(), `${id}.jpg`);
  await new File(uri).copy(dest);
  return dest.uri;
}

export function deletePhoto(uri: string | null): void {
  if (!uri || Platform.OS === 'web' || uri.startsWith('data:')) return;
  try {
    const file = new File(uri);
    if (file.exists) file.delete();
  } catch {
    // Photo déjà supprimée : rien à faire.
  }
}
