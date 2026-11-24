export type Category =
  | 'mammifere'
  | 'oiseau'
  | 'reptile'
  | 'amphibien'
  | 'marin'
  | 'invertebre';

export type Rarity = 'commun' | 'peu-commun' | 'rare' | 'legendaire';

export type StateCode = 'NSW' | 'VIC' | 'QLD' | 'WA' | 'SA' | 'TAS' | 'NT' | 'ACT';

/** IUCN Red List categories. */
export type Conservation = 'LC' | 'NT' | 'VU' | 'EN' | 'CR';

export interface Animal {
  /** Numéro dans l'Anidex (1-based, stable). */
  id: number;
  nameFr: string;
  nameEn: string;
  scientific: string;
  category: Category;
  rarity: Rarity;
  emoji: string;
  states: StateCode[];
  habitat: string;
  description: string;
  funFact: string;
  conservation: Conservation;
  /** Espèce introduite (envahissante) en Australie. */
  introduced?: boolean;
  /** Venimeuse ou dangereuse : à observer de loin ! */
  dangerous?: boolean;
}

export interface Sighting {
  id: string;
  animalId: number;
  photoUri: string | null;
  date: string; // ISO
  latitude?: number;
  longitude?: number;
  place?: string;
  state?: StateCode;
  method: 'ia' | 'manuel';
  confidence?: number;
}

export interface Settings {
  autoIdentify: boolean;
  saveLocation: boolean;
}
