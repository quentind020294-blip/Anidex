import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales } from 'expo-localization';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { Platform } from 'react-native';

import type { Lang } from '../data/types';
import { en } from './en';
import { fr, type Strings } from './fr';

export type { Strings };

export const LANGS: Lang[] = ['fr', 'en'];
const STRINGS: Record<Lang, Strings> = { fr, en };
const STORAGE_KEY = 'anidex/lang/v1';

/** Langue du téléphone : français s'il est réglé en français, anglais sinon. */
export function deviceLang(): Lang {
  try {
    return getLocales()[0]?.languageCode === 'fr' ? 'fr' : 'en';
  } catch {
    return 'en';
  }
}

interface I18nValue {
  lang: Lang;
  s: Strings;
  ready: boolean;
  setLang: (lang: Lang) => void;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(deviceLang);
  const [ready, setReady] = useState(false);

  // Choix mémorisé lors d'une ouverture précédente (prioritaire sur la langue du téléphone).
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => {
        if (saved === 'fr' || saved === 'en') setLangState(saved);
      })
      .catch(() => undefined)
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    void AsyncStorage.setItem(STORAGE_KEY, next).catch(() => undefined);
  }, []);

  const value = useMemo(() => ({ lang, s: STRINGS[lang], ready, setLang }), [lang, ready, setLang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>');
  return ctx;
}
