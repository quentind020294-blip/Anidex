import type { AnimalType } from './animalTypes';
import type { Localized } from './types';

/** Fourchette de valeurs (min = max pour une valeur unique). */
export type Range = [number, number];

export type SizeKind = 'height' | 'length' | 'headBody' | 'wingspan' | 'shell' | 'legspan';
export type Activity = 'diurnal' | 'nocturnal' | 'crepuscular' | 'variable';

/** Caractéristiques d'une espèce. Une valeur absente s'affiche « — ». */
export interface Traits {
  /** Poids d'un adulte, en grammes. Avec `male`/`female` si les sexes diffèrent beaucoup. */
  weight?: { all?: Range; male?: Range; female?: Range };
  /** Taille, en centimètres, avec ce qu'elle mesure. */
  size?: { kind: SizeKind; cm: Range };
  types: [AnimalType] | [AnimalType, AnimalType];
  /** Longévité habituelle, en années. */
  lifespan?: Range;
  diet?: Localized;
  activity?: Activity;
  /** Vitesse maximale connue, en km/h. */
  speed?: number;
  /** Petits par portée ou œufs par ponte. */
  offspring?: { kind: 'young' | 'eggs'; n: Range };
}
