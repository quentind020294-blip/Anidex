import type { Range } from '../data/traitsTypes';
import type { Lang } from '../data/types';

/** Espace insécable : l'unité ne se retrouve jamais seule sur une ligne. */
const NBSP = '\u00A0';

/** Nombre formaté selon la langue (virgule en français), sans décimales inutiles. */
function num(n: number, lang: Lang, digits = 1): string {
  return n.toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-AU', { maximumFractionDigits: digits });
}

/** « 4–15 », « 10 », ou « ≤ 20 » pour une fourchette [0, 20] (« jusqu'à 20 »). */
function span(r: Range, f: (n: number) => string): string {
  if (r[0] === 0 && r[1] > 0) return `≤${NBSP}${f(r[1])}`;
  return r[0] === r[1] ? f(r[0]) : `${f(r[0])}–${f(r[1])}`;
}

/** Poids en grammes → « 450 g », « 4–15 kg » ou « 15–20 t » (unité choisie d'après la valeur max). */
export function formatWeight(g: Range, lang: Lang): string {
  const max = g[1];
  if (max >= 1_000_000) return `${span(g, (n) => num(n / 1_000_000, lang))}${NBSP}t`;
  if (max >= 1000) return `${span(g, (n) => num(n / 1000, lang, n < 10_000 ? 1 : 0))}${NBSP}kg`;
  return `${span(g, (n) => num(n, lang, n < 10 ? 1 : 0))}${NBSP}g`;
}

/** Taille en centimètres → « 8–14 mm », « 45–60 cm » ou « 1,5–2 m ». */
export function formatSize(cm: Range, lang: Lang): string {
  const max = cm[1];
  if (max >= 100) return `${span(cm, (n) => num(n / 100, lang, 2))}${NBSP}m`;
  if (max < 1) return `${span(cm, (n) => num(n * 10, lang))}${NBSP}mm`;
  return `${span(cm, (n) => num(n, lang))}${NBSP}cm`;
}

/** Longévité en années → « 12–20 ans », ou en mois si moins d'un an. */
export function formatLifespan(years: Range, lang: Lang, unit: { years: string; months: string }): string {
  if (years[1] < 1) return `${span(years, (n) => num(n * 12, lang, 0))}${NBSP}${unit.months}`;
  return `${span(years, (n) => num(n, lang))}${NBSP}${unit.years}`;
}

export function formatCount(n: Range, lang: Lang): string {
  return span(n, (x) => num(x, lang, 0));
}

export function formatSpeed(kmh: number, lang: Lang): string {
  return `${num(kmh, lang, kmh < 1 ? 2 : 0)}${NBSP}km/h`;
}
