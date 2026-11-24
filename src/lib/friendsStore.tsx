import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

import {
  FriendsError,
  addFriend as apiAddFriend,
  createAccount as apiCreateAccount,
  currentUserId,
  deleteAccount as apiDeleteAccount,
  getFriends,
  getMyProfile,
  regenerateCode as apiRegenerateCode,
  removeFriend as apiRemoveFriend,
  setPseudo as apiSetPseudo,
  syncMyData,
  type FriendSummary,
  type FriendsErrorCode,
  type MyProfile,
} from './friends';
import { useDex } from './store';
import { supabaseStatus } from './supabase';

/**
 * État du système d'amis. Tout est facultatif : sans compte ou sans connexion,
 * l'appli fonctionne comme avant. Le profil et la liste d'amis sont gardés sur
 * l'appareil pour rester visibles hors connexion.
 */
type Status = 'not-configured' | 'unsafe-key' | 'loading' | 'signed-out' | 'ready';

interface CachedFriends {
  at: string;
  friends: FriendSummary[];
}

interface FriendsValue {
  status: Status;
  profile: MyProfile | null;
  friends: FriendSummary[];
  friendsAt: string | null;
  lastSync: string | null;
  offline: boolean;
  createAccount: (pseudo: string) => Promise<void>;
  refresh: () => Promise<void>;
  addFriend: (code: string) => Promise<string>;
  removeFriend: (id: string) => Promise<void>;
  regenerateCode: () => Promise<void>;
  rename: (pseudo: string) => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const PROFILE_KEY = 'anidex/friends/profile/v1';
const FRIENDS_KEY = 'anidex/friends/list/v1';
const SYNC_KEY = 'anidex/friends/last-sync/v1';

const FriendsContext = createContext<FriendsValue | null>(null);

function errorCode(e: unknown): FriendsErrorCode {
  return e instanceof FriendsError ? e.code : 'unknown';
}

export function FriendsProvider({ children }: { children: ReactNode }) {
  const { sightings, progress, unlockedBadges, ready: dexReady } = useDex();
  const [status, setStatus] = useState<Status>(
    supabaseStatus === 'ready' ? 'loading' : supabaseStatus === 'unsafe-key' ? 'unsafe-key' : 'not-configured',
  );
  const [profile, setProfile] = useState<MyProfile | null>(null);
  const [cached, setCached] = useState<CachedFriends | null>(null);
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [offline, setOffline] = useState(false);

  const saveProfile = useCallback((p: MyProfile | null) => {
    setProfile(p);
    void (p ? AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(p)) : AsyncStorage.removeItem(PROFILE_KEY)).catch(() => undefined);
  }, []);

  const saveFriends = useCallback((friends: FriendSummary[]) => {
    const value = { at: new Date().toISOString(), friends };
    setCached(value);
    void AsyncStorage.setItem(FRIENDS_KEY, JSON.stringify(value)).catch(() => undefined);
  }, []);

  const refresh = useCallback(async () => {
    if (supabaseStatus !== 'ready') return;
    try {
      const me = await getMyProfile();
      if (!me) return;
      saveProfile(me);
      saveFriends(await getFriends());
      setOffline(false);
    } catch (e) {
      if (errorCode(e) === 'offline') setOffline(true);
    }
  }, [saveFriends, saveProfile]);

  // Démarrage : on affiche d'abord ce qui est en cache, puis on rafraîchit en ligne.
  useEffect(() => {
    if (supabaseStatus !== 'ready') return;
    let alive = true;
    (async () => {
      const [p, f, s, uid] = await Promise.all([
        AsyncStorage.getItem(PROFILE_KEY).catch(() => null),
        AsyncStorage.getItem(FRIENDS_KEY).catch(() => null),
        AsyncStorage.getItem(SYNC_KEY).catch(() => null),
        currentUserId().catch(() => null),
      ]);
      if (!alive) return;
      const cachedProfile = p ? (JSON.parse(p) as MyProfile) : null;
      if (f) setCached(JSON.parse(f) as CachedFriends);
      if (s) setLastSync(s);
      if (uid && cachedProfile && cachedProfile.id === uid) {
        setProfile(cachedProfile);
        setStatus('ready');
        void refresh();
      } else if (uid) {
        // Session présente mais profil inconnu localement : on le récupère.
        try {
          const me = await getMyProfile();
          if (!alive) return;
          if (me) {
            saveProfile(me);
            setStatus('ready');
            void refresh();
          } else setStatus('signed-out');
        } catch {
          if (alive) setStatus(cachedProfile ? 'ready' : 'signed-out');
          if (cachedProfile) setProfile(cachedProfile);
        }
      } else {
        setStatus('signed-out');
      }
    })();
    return () => {
      alive = false;
    };
  }, [refresh, saveProfile]);

  // Synchronisation automatique de ma progression, quelques secondes après chaque changement.
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (status !== 'ready' || !dexReady) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      syncMyData(progress, unlockedBadges, sightings)
        .then(() => {
          const at = new Date().toISOString();
          setLastSync(at);
          setOffline(false);
          void AsyncStorage.setItem(SYNC_KEY, at).catch(() => undefined);
        })
        .catch((e) => {
          if (errorCode(e) === 'offline') setOffline(true);
        });
    }, 2500);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [status, dexReady, progress, unlockedBadges, sightings]);

  const createAccount = useCallback(async (pseudo: string) => {
    const me = await apiCreateAccount(pseudo);
    saveProfile(me);
    saveFriends([]);
    setStatus('ready');
  }, [saveFriends, saveProfile]);

  const addFriend = useCallback(async (code: string) => {
    const friend = await apiAddFriend(code);
    await refresh();
    return friend.pseudo;
  }, [refresh]);

  const removeFriend = useCallback(async (id: string) => {
    await apiRemoveFriend(id);
    await refresh();
  }, [refresh]);

  const regenerateCode = useCallback(async () => {
    const code = await apiRegenerateCode();
    if (profile) saveProfile({ ...profile, friend_code: code });
  }, [profile, saveProfile]);

  const rename = useCallback(async (pseudo: string) => {
    await apiSetPseudo(pseudo);
    if (profile) saveProfile({ ...profile, pseudo: pseudo.trim() });
  }, [profile, saveProfile]);

  const deleteAccount = useCallback(async () => {
    await apiDeleteAccount();
    saveProfile(null);
    setCached(null);
    setLastSync(null);
    await AsyncStorage.multiRemove([FRIENDS_KEY, SYNC_KEY]).catch(() => undefined);
    setStatus('signed-out');
  }, [saveProfile]);

  const value = useMemo<FriendsValue>(() => ({
    status, profile, friends: cached?.friends ?? [], friendsAt: cached?.at ?? null, lastSync, offline,
    createAccount, refresh, addFriend, removeFriend, regenerateCode, rename, deleteAccount,
  }), [status, profile, cached, lastSync, offline, createAccount, refresh, addFriend, removeFriend, regenerateCode, rename, deleteAccount]);

  return <FriendsContext.Provider value={value}>{children}</FriendsContext.Provider>;
}

export function useFriends(): FriendsValue {
  const ctx = useContext(FriendsContext);
  if (!ctx) throw new Error('useFriends must be used inside <FriendsProvider>');
  return ctx;
}
