import AsyncStorage from '@react-native-async-storage/async-storage';
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
