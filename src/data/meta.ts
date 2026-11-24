import type { Category, Conservation, Rarity, StateCode } from './types';

// Données visuelles et de jeu. Les libellés (noms de catégories, d'États, de statuts…)
// sont traduits dans src/i18n/.
export const CATEGORIES: Record<Category, { color: string; emoji: string }> = {
  mammifere: { color: '#C0622D', emoji: '🦘' },
  oiseau: { color: '#D99A0E', emoji: '🦜' },
  reptile: { color: '#4D8F2E', emoji: '🦎' },
  amphibien: { color: '#0F8F80', emoji: '🐸' },
  marin: { color: '#2563EB', emoji: '🐠' },
  invertebre: { color: '#8250C4', emoji: '🕷️' },
};

export const CATEGORY_ORDER: Category[] = ['mammifere', 'oiseau', 'reptile', 'amphibien', 'marin', 'invertebre'];

export const RARITIES: Record<Rarity, { xp: number; color: string; stars: number }> = {
  commun: { xp: 10, color: '#6B7280', stars: 1 },
  'peu-commun': { xp: 25, color: '#059669', stars: 2 },
  rare: { xp: 50, color: '#2563EB', stars: 3 },
  legendaire: { xp: 100, color: '#D97706', stars: 4 },
};

export const RARITY_ORDER: Rarity[] = ['commun', 'peu-commun', 'rare', 'legendaire'];

/** XP gagnés pour une nouvelle observation d'une espèce déjà découverte. */
export const REPEAT_XP = 2;

/** Ordre d'affichage des États (d'ouest en est, puis la Tasmanie). */
export const STATE_ORDER: StateCode[] = ['WA', 'NT', 'SA', 'QLD', 'NSW', 'ACT', 'VIC', 'TAS'];

export const CONSERVATION: Record<Conservation, { color: string }> = {
  LC: { color: '#16A34A' },
  NT: { color: '#84CC16' },
  VU: { color: '#EAB308' },
  EN: { color: '#F97316' },
  CR: { color: '#DC2626' },
};

export const CONSERVATION_ORDER: Conservation[] = ['LC', 'NT', 'VU', 'EN', 'CR'];

/** Associe un nom de région renvoyé par le géocodage inverse à un code d'État. */
export function stateFromRegion(region?: string | null): StateCode | undefined {
  if (!region) return undefined;
  const r = region.toLowerCase();
  const table: [string[], StateCode][] = [
    [['new south wales', 'nsw', 'nouvelle-galles'], 'NSW'],
    [['victoria', 'vic'], 'VIC'],
    [['queensland', 'qld'], 'QLD'],
    [['western australia', 'wa', 'australie-occidentale'], 'WA'],
    [['south australia', 'sa', 'australie-méridionale'], 'SA'],
    [['tasmania', 'tas', 'tasmanie'], 'TAS'],
    [['northern territory', 'nt', 'territoire du nord'], 'NT'],
    [['australian capital territory', 'act', 'canberra'], 'ACT'],
  ];
  for (const [names, code] of table) {
    if (names.some((n) => r === n || (n.length > 3 && r.includes(n)))) return code;
  }
  return undefined;
}

/**
 * Estimation de l'État à partir des coordonnées GPS, à partir de frontières simplifiées.
 * Utilisée sur le web (pas de géocodage inverse) et en secours sur mobile.
 * Peut se tromper à quelques kilomètres des frontières.
 */
export function approxStateFromCoords(lat: number, lon: number): StateCode | undefined {
  // En dehors du cadre géographique de l'Australie (Tasmanie comprise).
  if (lat > -9 || lat < -44 || lon < 112 || lon > 154.5) return undefined;
  if (lat < -39.5) return 'TAS';
  if (lon < 129) return 'WA';
  if (lon >= 148.76 && lon <= 149.4 && lat >= -35.92 && lat <= -35.12) return 'ACT';
  if (lon < 138) return lat > -26 ? 'NT' : 'SA';
  if (lon < 141) return lat > -26 ? 'QLD' : 'SA';
  if (lat > -29) return 'QLD';
  // Frontière NSW/VIC approchée par une droite entre (141 ; -34) et (150 ; -37,5).
  const border = -34 - ((lon - 141) * 3.5) / 9;
  return lat < border ? 'VIC' : 'NSW';
}
