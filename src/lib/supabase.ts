import 'react-native-url-polyfill/auto';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Connexion à Supabase pour le système d'amis.
 *
 * Seules deux valeurs PUBLIQUES sont utilisées, fournies au moment du build :
 * - EXPO_PUBLIC_SUPABASE_URL             (ex. https://abcd1234.supabase.co)
 * - EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY (clé « publishable » sb_publishable_… ou ancienne clé « anon »)
 * La clé publique peut être visible dans l'appli : la sécurité repose sur les règles RLS
 * de la base (supabase/anidex.sql). La clé SECRÈTE (sb_secret_… / service_role) ne doit
 * JAMAIS se retrouver ici : si c'est le cas, la fonction amis est désactivée.
 *
 * Sans ces valeurs, ou sans connexion, le reste de l'appli fonctionne normalement.
 */
const url = (process.env.EXPO_PUBLIC_SUPABASE_URL ?? '').trim();
const key = (process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? '').trim();

/** Vrai si la clé ressemble à une clé secrète (à ne jamais embarquer dans une appli). */
export function isSecretKey(k: string): boolean {
  if (k.startsWith('sb_secret_')) return true;
  const parts = k.split('.');
  if (parts.length === 3) {
    try {
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'))) as { role?: string };
      return payload.role === 'service_role';
    } catch {
      return false;
    }
  }
  return false;
}

export type SupabaseStatus = 'ready' | 'not-configured' | 'unsafe-key';

export const supabaseStatus: SupabaseStatus =
  !url || !key ? 'not-configured' : isSecretKey(key) ? 'unsafe-key' : 'ready';

let client: SupabaseClient | null = null;

/** Client Supabase (null si la fonction amis n'est pas configurée). */
export function getSupabase(): SupabaseClient | null {
  if (supabaseStatus !== 'ready') return null;
  if (!client) {
    client = createClient(url, key, {
      auth: {
        // La session est gardée sur l'appareil pour rester connecté entre deux ouvertures.
        storage: AsyncStorage,
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    });
  }
  return client;
}
