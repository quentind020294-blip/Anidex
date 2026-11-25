// ─────────────────────────────────────────────────────────────────────────────
// Registre des langues : le SEUL endroit à modifier pour ajouter une langue.
//
// Pour ajouter une langue (ex. l'allemand « de ») :
//  1. copier src/i18n/en/ en src/i18n/de/ et traduire ui.ts et content.ts ;
//  2. l'ajouter ci-dessous (libellé et drapeau ; le format des dates et nombres vient de
//     `dateLocale` dans ui.ts, ex. 'de-DE') ;
//  3. lancer `npm run check:i18n` : il signale tout texte manquant ou oublié.
// Voir src/i18n/README.md.
// ─────────────────────────────────────────────────────────────────────────────
import { content as en } from './en/content';
import { en as enUi } from './en/ui';
import { content as es } from './es/content';
import { es as esUi } from './es/ui';
import { content as fr } from './fr/content';
import { fr as frUi } from './fr/ui';
import type { ContentPack, Strings } from './types';

export interface Locale {
  /** Nom de la langue, écrit dans cette langue (pour être reconnu par tous). */
  label: string;
  flag: string;
  ui: Strings;
  content: ContentPack;
}

export const LOCALES = {
  fr: { label: 'Français', flag: '🇫🇷', ui: frUi, content: fr },
  en: { label: 'English', flag: '🇬🇧', ui: enUi, content: en },
  es: { label: 'Español', flag: '🇪🇸', ui: esUi, content: es },
} satisfies Record<string, Locale>;

export type Lang = keyof typeof LOCALES;

/** Ordre d'affichage dans le sélecteur de langue. */
export const LANGS = Object.keys(LOCALES) as Lang[];

/** Langue de secours (texte manquant, ou téléphone dans une langue non prise en charge). */
export const FALLBACK_LANG: Lang = 'en';

export function isLang(v: unknown): v is Lang {
  return typeof v === 'string' && v in LOCALES;
}

/**
 * Construit un texte dans toutes les langues à partir des fichiers de contenu.
 * Renvoie undefined si le texte n'existe pas en français (langue de référence).
 * Un texte absent dans une langue retombe sur l'anglais.
 */
export function localized(pick: (c: ContentPack) => string | undefined): Record<Lang, string> | undefined {
  const ref = pick(LOCALES.fr.content);
  if (ref === undefined) return undefined;
  const fallback = pick(LOCALES[FALLBACK_LANG].content) ?? ref;
  return Object.fromEntries(LANGS.map((l) => [l, pick(LOCALES[l].content) ?? fallback])) as Record<Lang, string>;
}
