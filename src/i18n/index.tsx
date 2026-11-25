import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales } from 'expo-localization';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { Platform } from 'react-native';

import { FALLBACK_LANG, LANGS, LOCALES, isLang, type Lang } from './registry';
import type { Strings } from './types';

export type { Strings };
export { LANGS, LOCALES, type Lang };

const STORAGE_KEY = 'anidex/lang/v1';

/**
 * Langue du téléphone : la première langue préférée de l'utilisateur que l'Anidex
 * sait afficher (français, anglais, espagnol…), sinon l'anglais.
 */
export function deviceLang(): Lang {
  try {
    const found = getLocales().map((l) => l.languageCode).find(isLang);
    return found ?? FALLBACK_LANG;
  } catch {
    return FALLBACK_LANG;
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
        if (isLang(saved)) setLangState(saved);
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

  const value = useMemo(() => ({ lang, s: LOCALES[lang].ui, ready, setLang }), [lang, ready, setLang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>');
  return ctx;
}
