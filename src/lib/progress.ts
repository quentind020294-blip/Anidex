import { ANIMALS, getAnimal } from '../data/animals';
import { CATEGORIES, CATEGORY_ORDER, RARITIES, REPEAT_XP } from '../data/meta';
import type { Animal, Category, Sighting, StateCode } from '../data/types';

export const RANKS = [
  'Touriste curieux',
  'Randonneur',
  'Explorateur du bush',
  'Ranger junior',
  'Ranger',
  'Naturaliste',
  'Pisteur aguerri',
  'Gardien de l’Outback',
  'Maître du Bush',
  'Légende de l’Anidex',
];

/** XP total nécessaire pour atteindre chaque niveau (index = niveau - 1). */
export const LEVEL_THRESHOLDS = [0, 40, 110, 220, 380, 600, 900, 1300, 1800, 2500];

export interface Progress {
  xp: number;
  level: number;
  rank: string;
  levelStartXp: number;
  nextLevelXp: number | null;
  discovered: Set<number>;
  sightingsByAnimal: Map<number, Sighting[]>;
  statesVisited: Set<StateCode>;
}

/** XP rapporté par une observation (selon qu'elle découvre l'espèce ou non). */
export function xpFor(animal: Animal, isNew: boolean): number {
  return isNew ? RARITIES[animal.rarity].xp : REPEAT_XP;
}

export function computeProgress(sightings: Sighting[]): Progress {
  const sorted = [...sightings].sort((a, b) => a.date.localeCompare(b.date));
  const discovered = new Set<number>();
  const sightingsByAnimal = new Map<number, Sighting[]>();
  const statesVisited = new Set<StateCode>();
  let xp = 0;

  for (const s of sorted) {
    const animal = getAnimal(s.animalId);
    if (!animal) continue;
    const isNew = !discovered.has(animal.id);
    xp += xpFor(animal, isNew);
    discovered.add(animal.id);
    const list = sightingsByAnimal.get(animal.id) ?? [];
    list.push(s);
    sightingsByAnimal.set(animal.id, list);
    if (s.state) statesVisited.add(s.state);
  }

  let level = 1;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]) level = i + 1;
  }
  return {
    xp,
    level,
    rank: RANKS[level - 1],
    levelStartXp: LEVEL_THRESHOLDS[level - 1],
    nextLevelXp: LEVEL_THRESHOLDS[level] ?? null,
    discovered,
    sightingsByAnimal,
    statesVisited,
  };
}

// ───────────── Badges ─────────────

export interface Badge {
  id: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  /** Renvoie [valeur actuelle, objectif]. */
  progress: (p: Progress, sightings: Sighting[]) => [number, number];
}

function countWhere(p: Progress, pred: (a: Animal) => boolean): number {
  let n = 0;
  for (const id of p.discovered) {
    const a = getAnimal(id);
    if (a && pred(a)) n++;
  }
  return n;
}

const ICONS = ['Kangourou roux', 'Koala', 'Wombat commun', 'Ornithorynque', 'Échidné à nez court', 'Émeu d’Australie'];
const iconIds = ICONS.map((n) => ANIMALS.find((a) => a.nameFr === n)?.id).filter((x): x is number => !!x);

const categoryBadges: Badge[] = CATEGORY_ORDER.map((cat: Category) => {
  const meta = CATEGORIES[cat];
  const total = ANIMALS.filter((a) => a.category === cat).length;
  const titles: Record<Category, string> = {
    mammifere: 'Ami des marsupiaux',
    oiseau: 'Ornithologue',
    reptile: 'Herpétologue',
    amphibien: 'Roi de la mare',
    marin: 'Plongeur du récif',
    invertebre: 'Entomologiste',
  };
  return {
    id: `cat-${cat}`,
    title: titles[cat],
    description: `Découvre 5 espèces de la catégorie « ${meta.plural} » (sur ${total}).`,
    emoji: meta.emoji,
    color: meta.color,
    progress: (p) => [countWhere(p, (a) => a.category === cat), Math.min(5, total)],
  };
});

export const BADGES: Badge[] = [
  {
    id: 'first',
    title: 'Premiers pas',
    description: 'Ajoute ta première espèce à l’Anidex.',
    emoji: '👣',
    color: '#D7263D',
    progress: (p) => [p.discovered.size, 1],
  },
  {
    id: 'ten',
    title: 'Collectionneur',
    description: 'Découvre 10 espèces différentes.',
    emoji: '📘',
    color: '#D7263D',
    progress: (p) => [p.discovered.size, 10],
  },
  {
    id: 'twentyfive',
    title: 'Naturaliste en herbe',
    description: 'Découvre 25 espèces différentes.',
    emoji: '🌿',
    color: '#D7263D',
    progress: (p) => [p.discovered.size, 25],
  },
  {
    id: 'fifty',
    title: 'Encyclopédie vivante',
    description: 'Découvre 50 espèces différentes.',
    emoji: '📚',
    color: '#D7263D',
    progress: (p) => [p.discovered.size, 50],
  },
  {
    id: 'all',
    title: 'Anidex complet',
    description: `Découvre les ${ANIMALS.length} espèces de l’Anidex.`,
    emoji: '🏆',
    color: '#D97706',
    progress: (p) => [p.discovered.size, ANIMALS.length],
  },
  {
    id: 'icons',
    title: 'Icônes australiennes',
    description: 'Observe le kangourou roux, le koala, le wombat, l’ornithorynque, l’échidné et l’émeu.',
    emoji: '🇦🇺',
    color: '#0F766E',
    progress: (p) => [iconIds.filter((id) => p.discovered.has(id)).length, iconIds.length],
  },
  ...categoryBadges,
  {
    id: 'rare',
    title: 'Œil de lynx',
    description: 'Découvre 5 espèces rares.',
    emoji: '🔎',
    color: RARITIES.rare.color,
    progress: (p) => [countWhere(p, (a) => a.rarity === 'rare'), 5],
  },
  {
    id: 'legend',
    title: 'Chasseur de légendes',
    description: 'Découvre une espèce légendaire.',
    emoji: '⭐',
    color: RARITIES.legendaire.color,
    progress: (p) => [countWhere(p, (a) => a.rarity === 'legendaire'), 1],
  },
  {
    id: 'danger',
    title: 'Sang-froid',
    description: 'Observe (de loin !) 3 espèces dangereuses.',
    emoji: '☠️',
    color: '#991B1B',
    progress: (p) => [countWhere(p, (a) => !!a.dangerous), 3],
  },
  {
    id: 'invasive',
    title: 'Sentinelle',
    description: 'Signale 3 espèces introduites envahissantes.',
    emoji: '🚨',
    color: '#B45309',
    progress: (p) => [countWhere(p, (a) => !!a.introduced), 3],
  },
  {
    id: 'endangered',
    title: 'Protecteur',
    description: 'Observe 3 espèces menacées (vulnérables ou plus).',
    emoji: '🛡️',
    color: '#EA580C',
    progress: (p) => [countWhere(p, (a) => ['VU', 'EN', 'CR'].includes(a.conservation)), 3],
  },
  {
    id: 'states3',
    title: 'Globe-trotter',
    description: 'Fais des observations dans 3 États ou territoires.',
    emoji: '🗺️',
    color: '#4338CA',
    progress: (p) => [p.statesVisited.size, 3],
  },
  {
    id: 'states8',
    title: 'Tour d’Australie',
    description: 'Fais des observations dans les 8 États et territoires.',
    emoji: '🧭',
    color: '#4338CA',
    progress: (p) => [p.statesVisited.size, 8],
  },
  {
    id: 'obs50',
    title: 'Observateur assidu',
    description: 'Enregistre 50 observations.',
    emoji: '📸',
    color: '#0369A1',
    progress: (_p, s) => [s.length, 50],
  },
];

export function unlockedBadgeIds(p: Progress, sightings: Sighting[]): Set<string> {
  const ids = new Set<string>();
  for (const b of BADGES) {
    const [value, goal] = b.progress(p, sightings);
    if (value >= goal) ids.add(b.id);
  }
  return ids;
}
