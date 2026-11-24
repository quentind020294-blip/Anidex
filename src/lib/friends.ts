import { getAnimal } from '../data/animals';
import { hidesLocation } from '../data/conservation';
import type { Sighting, StateCode } from '../data/types';
import type { Progress } from './progress';
import { getSupabase } from './supabase';

export interface MyProfile {
  id: string;
  pseudo: string;
  friend_code: string;
}

export interface FriendSummary {
  id: string;
  pseudo: string;
  level: number;
  xp: number;
  species: number;
  badges: number;
  updated_at: string | null;
}

export interface FriendDetail {
  id: string;
  pseudo: string;
  level: number;
  xp: number;
  discovered: number[];
  badges: string[];
  sightings_count: number;
  updated_at: string | null;
  sightings: { animal_id: number; observed_on: string; state: StateCode | null }[];
}

/** Erreurs traduites par l'interface. */
export type FriendsErrorCode =
  | 'not_configured' | 'offline' | 'code_not_found' | 'own_code' | 'too_many_friends'
  | 'invalid_pseudo' | 'anonymous_disabled' | 'unknown';

export class FriendsError extends Error {
  constructor(public code: FriendsErrorCode) {
    super(code);
  }
}

function toError(error: { message?: string; code?: string; status?: number } | null | undefined): FriendsError {
  const msg = error?.message ?? '';
  if (/code_not_found/.test(msg)) return new FriendsError('code_not_found');
  if (/own_code/.test(msg)) return new FriendsError('own_code');
  if (/too_many_friends/.test(msg)) return new FriendsError('too_many_friends');
  if (/check constraint|violates check/i.test(msg) || error?.code === '23514') return new FriendsError('invalid_pseudo');
  if (/anonymous sign-ins are disabled/i.test(msg)) return new FriendsError('anonymous_disabled');
  if (/fetch|network|Failed to fetch|timeout|abort/i.test(msg) || error?.status === 0) return new FriendsError('offline');
  return new FriendsError('unknown');
}

function client() {
  const sb = getSupabase();
  if (!sb) throw new FriendsError('not_configured');
  return sb;
}

async function rpc<T>(fn: string, args?: Record<string, unknown>): Promise<T> {
  try {
    const { data, error } = await client().rpc(fn, args);
    if (error) throw toError(error);
    return data as T;
  } catch (e) {
    if (e instanceof FriendsError) throw e;
    throw toError(e as { message?: string });
  }
}

/** Identifiant de la session en cours sur cet appareil (sans appel réseau). */
export async function currentUserId(): Promise<string | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data } = await sb.auth.getSession();
  return data.session?.user.id ?? null;
}

/** Crée un compte anonyme (sans e-mail) puis le profil avec son pseudo et son code ami. */
export async function createAccount(pseudo: string): Promise<MyProfile> {
  const sb = client();
  if (!(await currentUserId())) {
    try {
      const { error } = await sb.auth.signInAnonymously();
      if (error) throw toError(error);
    } catch (e) {
      throw e instanceof FriendsError ? e : toError(e as { message?: string });
    }
  }
  const profile = await rpc<MyProfile>('create_profile', { p_pseudo: pseudo.trim() });
  return { id: profile.id, pseudo: profile.pseudo, friend_code: profile.friend_code };
}

export const getMyProfile = () => rpc<MyProfile | null>('get_my_profile');
export const setPseudo = (pseudo: string) => rpc<void>('set_pseudo', { p_pseudo: pseudo.trim() });
export const regenerateCode = () => rpc<string>('regenerate_friend_code');
export const addFriend = (code: string) => rpc<{ id: string; pseudo: string }>('add_friend', { p_code: code });
export const removeFriend = (id: string) => rpc<void>('remove_friend', { p_friend: id });
export const getFriends = () => rpc<FriendSummary[]>('get_friends');
export const getFriend = (id: string) => rpc<FriendDetail | null>('get_friend', { p_friend: id });

/** Supprime le compte en ligne et toutes ses données, puis se déconnecte. Les données locales restent. */
export async function deleteAccount(): Promise<void> {
  await rpc<void>('delete_my_account');
  await getSupabase()?.auth.signOut({ scope: 'local' });
}

/** Jour local de l'observation (AAAA-MM-JJ), sans l'heure. */
function localDay(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/**
 * Données partagées avec les amis. Jamais de coordonnées GPS ni de nom de lieu :
 * seulement l'État, et rien du tout pour les espèces menacées.
 */
export function shareableSightings(sightings: Sighting[]) {
  return [...sightings]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 500)
    .map((s) => {
      const animal = getAnimal(s.animalId);
      const state = animal && !hidesLocation(animal) ? s.state ?? null : null;
      return { id: s.id.slice(0, 40), animal_id: s.animalId, observed_on: localDay(s.date), state };
    });
}

/** Envoie ma progression et mes observations (version partageable) à Supabase. */
export async function syncMyData(progress: Progress, unlockedBadges: Set<string>, sightings: Sighting[]): Promise<void> {
  await rpc<void>('sync_progress', {
    p_xp: progress.xp,
    p_level: progress.level,
    p_discovered: [...progress.discovered].sort((a, b) => a - b),
    p_badges: [...unlockedBadges].sort(),
    p_sightings_count: sightings.length,
  });
  await rpc<void>('sync_sightings', { p_sightings: shareableSightings(sightings) });
}
