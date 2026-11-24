export type Category =
  | 'mammifere'
  | 'oiseau'
  | 'reptile'
  | 'amphibien'
  | 'marin'
  | 'insecte'
  | 'arachnide'
  | 'invertebre';

export type Rarity = 'commun' | 'peu-commun' | 'rare' | 'legendaire';

export type StateCode = 'NSW' | 'VIC' | 'QLD' | 'WA' | 'SA' | 'TAS' | 'NT' | 'ACT';

export type Lang = 'fr' | 'en';

/** Texte disponible dans les deux langues de l'app. */
export type Localized = Record<Lang, string>;

export interface Animal {
  /** Numéro dans l'Anidex (1-based, stable). */
  id: number;
  /** Nom courant : français en mode FR, anglais en mode EN. */
  name: Localized;
  scientific: string;
  category: Category;
  rarity: Rarity;
  emoji: string;
  states: StateCode[];
  habitat: Localized;
  description: Localized;
  funFact: Localized;
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
  /** Mode explorateur : affiche toutes les fiches, même celles des espèces non découvertes. */
  explorerMode: boolean;
}
