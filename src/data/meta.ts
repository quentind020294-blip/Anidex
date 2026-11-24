import type { Category, Conservation, Rarity, StateCode } from './types';

export const CATEGORIES: Record<Category, { label: string; plural: string; color: string; emoji: string }> = {
  mammifere: { label: 'Mammifère', plural: 'Mammifères', color: '#C0622D', emoji: '🦘' },
  oiseau: { label: 'Oiseau', plural: 'Oiseaux', color: '#D99A0E', emoji: '🦜' },
  reptile: { label: 'Reptile', plural: 'Reptiles', color: '#4D8F2E', emoji: '🦎' },
  amphibien: { label: 'Amphibien', plural: 'Amphibiens', color: '#0F8F80', emoji: '🐸' },
  marin: { label: 'Marin', plural: 'Vie marine', color: '#2563EB', emoji: '🐠' },
  invertebre: { label: 'Invertébré', plural: 'Invertébrés', color: '#8250C4', emoji: '🕷️' },
};

export const CATEGORY_ORDER: Category[] = ['mammifere', 'oiseau', 'reptile', 'amphibien', 'marin', 'invertebre'];

export const RARITIES: Record<Rarity, { label: string; xp: number; color: string; stars: number }> = {
  commun: { label: 'Commun', xp: 10, color: '#6B7280', stars: 1 },
  'peu-commun': { label: 'Peu commun', xp: 25, color: '#059669', stars: 2 },
  rare: { label: 'Rare', xp: 50, color: '#2563EB', stars: 3 },
  legendaire: { label: 'Légendaire', xp: 100, color: '#D97706', stars: 4 },
};

/** XP gagnés pour une nouvelle observation d'une espèce déjà découverte. */
export const REPEAT_XP = 2;

export const STATES: Record<StateCode, string> = {
  NSW: 'Nouvelle-Galles du Sud',
  VIC: 'Victoria',
  QLD: 'Queensland',
  WA: 'Australie-Occidentale',
  SA: 'Australie-Méridionale',
  TAS: 'Tasmanie',
  NT: 'Territoire du Nord',
  ACT: 'Territoire de la capitale',
};

export const CONSERVATION: Record<Conservation, { label: string; color: string }> = {
  LC: { label: 'Préoccupation mineure', color: '#16A34A' },
  NT: { label: 'Quasi menacée', color: '#84CC16' },
  VU: { label: 'Vulnérable', color: '#EAB308' },
  EN: { label: 'En danger', color: '#F97316' },
  CR: { label: 'En danger critique', color: '#DC2626' },
};

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
