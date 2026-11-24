import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

import { getAnimal } from '../data/animals';
import type { Settings, Sighting } from '../data/types';
import { BADGES, computeProgress, unlockedBadgeIds, xpFor, type Badge, type Progress } from './progress';
import {
  DEFAULT_SETTINGS,
  deletePhoto,
  loadApiKey,
  loadSettings,
  loadSightings,
  saveApiKey,
  saveSettings,
  saveSightings,
} from './storage';

export interface AddResult {
  isNew: boolean;
  xpGained: number;
  newBadges: Badge[];
  levelUp: boolean;
  level: number;
  rank: string;
}

interface DexContextValue {
  ready: boolean;
  sightings: Sighting[];
  progress: Progress;
  unlockedBadges: Set<string>;
  settings: Settings;
  apiKey: string;
  addSighting: (s: Sighting) => Promise<AddResult>;
  removeSighting: (id: string) => Promise<void>;
  updateSettings: (patch: Partial<Settings>) => Promise<void>;
  setApiKey: (key: string) => Promise<void>;
  resetAll: () => Promise<void>;
}

const DexContext = createContext<DexContextValue | null>(null);

export function DexProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [sightings, setSightings] = useState<Sighting[]>([]);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [apiKey, setApiKeyState] = useState('');
  // Référence toujours à jour pour éviter les courses entre deux ajouts rapprochés.
  const sightingsRef = useRef<Sighting[]>([]);

  useEffect(() => {
    (async () => {
      const [s, st, key] = await Promise.all([loadSightings(), loadSettings(), loadApiKey()]);
      sightingsRef.current = s;
      setSightings(s);
      setSettings(st);
      setApiKeyState(key);
      setReady(true);
    })();
  }, []);

  const commit = useCallback(async (next: Sighting[]) => {
    sightingsRef.current = next;
    setSightings(next);
    await saveSightings(next);
  }, []);

  const progress = useMemo(() => computeProgress(sightings), [sightings]);
  const unlockedBadges = useMemo(() => unlockedBadgeIds(progress, sightings), [progress, sightings]);

  const addSighting = useCallback(
    async (s: Sighting): Promise<AddResult> => {
      const before = sightingsRef.current;
      const prevProgress = computeProgress(before);
      const prevBadges = unlockedBadgeIds(prevProgress, before);
      const next = [...before, s];
      const nextProgress = computeProgress(next);
      const nextBadges = unlockedBadgeIds(nextProgress, next);
      await commit(next);
      const animal = getAnimal(s.animalId);
      const isNew = !prevProgress.discovered.has(s.animalId);
      return {
        isNew,
        xpGained: animal ? xpFor(animal, isNew) : 0,
        newBadges: BADGES.filter((b) => nextBadges.has(b.id) && !prevBadges.has(b.id)),
        levelUp: nextProgress.level > prevProgress.level,
        level: nextProgress.level,
        rank: nextProgress.rank,
      };
    },
    [commit],
  );

  const removeSighting = useCallback(
    async (id: string) => {
      const target = sightingsRef.current.find((s) => s.id === id);
      if (target) deletePhoto(target.photoUri);
      await commit(sightingsRef.current.filter((s) => s.id !== id));
    },
    [commit],
  );

  const updateSettings = useCallback(async (patch: Partial<Settings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      void saveSettings(next);
      return next;
    });
  }, []);

  const setApiKey = useCallback(async (key: string) => {
    await saveApiKey(key);
    setApiKeyState(key.trim());
  }, []);

  const resetAll = useCallback(async () => {
    for (const s of sightingsRef.current) deletePhoto(s.photoUri);
    await commit([]);
  }, [commit]);

  const value = useMemo<DexContextValue>(
    () => ({
      ready, sightings, progress, unlockedBadges, settings, apiKey,
      addSighting, removeSighting, updateSettings, setApiKey, resetAll,
    }),
    [ready, sightings, progress, unlockedBadges, settings, apiKey, addSighting, removeSighting, updateSettings, setApiKey, resetAll],
  );

  return <DexContext.Provider value={value}>{children}</DexContext.Provider>;
}

export function useDex(): DexContextValue {
  const ctx = useContext(DexContext);
  if (!ctx) throw new Error('useDex doit être utilisé dans <DexProvider>');
  return ctx;
}
