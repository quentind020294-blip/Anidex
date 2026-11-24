import { ANIMALS, getAnimal } from '../data/animals';
import { CATEGORIES, CATEGORY_ORDER, RARITIES, REPEAT_XP } from '../data/meta';
import type { Animal, Category, Sighting, StateCode } from '../data/types';
import type { Strings } from '../i18n/fr';

/** Nom du rang (traduit) correspondant à un niveau. */
export function rankName(s: Strings, level: number): string {
  return s.ranks[Math.min(level, s.ranks.length) - 1];
}

/** XP total nécessaire pour atteindre chaque niveau (index = niveau - 1). */
export const LEVEL_THRESHOLDS = [0, 40, 110, 220, 380, 600, 900, 1300, 1800, 2500];

export interface Progress {
  xp: number;
  level: number;
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
  emoji: string;
  color: string;
  /** Titre et description dans la langue choisie. */
  text: (s: Strings) => { title: string; description: string };
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

// Kangourou roux, koala, wombat, ornithorynque, échidné, émeu.
const ICONS = [
  'Osphranter rufus',
  'Phascolarctos cinereus',
  'Vombatus ursinus',
  'Ornithorhynchus anatinus',
  'Tachyglossus aculeatus',
  'Dromaius novaehollandiae',
];
const iconIds = ICONS.map((n) => ANIMALS.find((a) => a.scientific === n)?.id).filter((x): x is number => !!x);

type SimpleKey = 'first' | 'ten' | 'twentyfive' | 'fifty' | 'icons' | 'rare' | 'legend' | 'danger' | 'invasive' | 'endangered' | 'states3' | 'states8' | 'obs50';

function simple(key: SimpleKey, emoji: string, color: string, progress: Badge['progress']): Badge {
  return { id: key, emoji, color, progress, text: (s) => ({ title: s.badges[key].title, description: s.badges[key].desc }) };
}

const CATEGORY_GOAL = 5;

const categoryBadges: Badge[] = CATEGORY_ORDER.map((cat: Category) => {
  const total = ANIMALS.filter((a) => a.category === cat).length;
  const goal = Math.min(CATEGORY_GOAL, total);
  return {
    id: `cat-${cat}`,
    emoji: CATEGORIES[cat].emoji,
    color: CATEGORIES[cat].color,
    text: (s) => ({
      title: s.badges.category[cat],
      description: s.badges.categoryDesc(s.categories[cat].plural, goal, total),
    }),
    progress: (p) => [countWhere(p, (a) => a.category === cat), goal],
  };
});

export const BADGES: Badge[] = [
  simple('first', '👣', '#D7263D', (p) => [p.discovered.size, 1]),
  simple('ten', '📘', '#D7263D', (p) => [p.discovered.size, 10]),
  simple('twentyfive', '🌿', '#D7263D', (p) => [p.discovered.size, 25]),
  simple('fifty', '📚', '#D7263D', (p) => [p.discovered.size, 50]),
  {
    id: 'all',
    emoji: '🏆',
    color: '#D97706',
    text: (s) => ({ title: s.badges.all.title, description: s.badges.all.desc(ANIMALS.length) }),
    progress: (p) => [p.discovered.size, ANIMALS.length],
  },
  simple('icons', '🇦🇺', '#0F766E', (p) => [iconIds.filter((id) => p.discovered.has(id)).length, iconIds.length]),
  ...categoryBadges,
  simple('rare', '🔎', RARITIES.rare.color, (p) => [countWhere(p, (a) => a.rarity === 'rare'), 5]),
  simple('legend', '⭐', RARITIES.legendaire.color, (p) => [countWhere(p, (a) => a.rarity === 'legendaire'), 1]),
  simple('danger', '☠️', '#991B1B', (p) => [countWhere(p, (a) => !!a.dangerous), 3]),
  simple('invasive', '🚨', '#B45309', (p) => [countWhere(p, (a) => !!a.introduced), 3]),
  simple('endangered', '🛡️', '#EA580C', (p) => [countWhere(p, (a) => ['VU', 'EN', 'CR'].includes(a.conservation)), 3]),
  simple('states3', '🗺️', '#4338CA', (p) => [p.statesVisited.size, 3]),
  simple('states8', '🧭', '#4338CA', (p) => [p.statesVisited.size, 8]),
  simple('obs50', '📸', '#0369A1', (_p, s) => [s.length, 50]),
];

export function unlockedBadgeIds(p: Progress, sightings: Sighting[]): Set<string> {
  const ids = new Set<string>();
  for (const b of BADGES) {
    const [value, goal] = b.progress(p, sightings);
    if (value >= goal) ids.add(b.id);
  }
  return ids;
}
