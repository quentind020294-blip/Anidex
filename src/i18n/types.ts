// Types communs à toutes les langues.
export type { Strings } from './fr/ui';

/** Textes d'une espèce dans une langue. */
export interface SpeciesText {
  /**
   * Nom commun. Facultatif pour les langues autres que le français et l'anglais :
   * s'il n'existe pas de nom commun fiable, on l'omet et l'appli affiche le nom anglais
   * (le nom scientifique reste toujours affiché).
   */
  name?: string;
  habitat: string;
  description: string;
  funFact: string;
  /** Régime alimentaire (présent seulement si la donnée est connue). */
  diet?: string;
}

/** Textes de conservation d'une espèce (tous facultatifs, selon les données de l'espèce). */
export interface ConservationText {
  iucnNote?: string;
  epbcScope?: string;
  vicScope?: string;
  programs?: string;
  impact?: string;
}

/** Tout le contenu des fiches dans une langue (src/i18n/<langue>/content.ts). */
export interface ContentPack {
  /** Clé : numéro de l'espèce dans l'Anidex. */
  species: Record<number, SpeciesText>;
  conservation: Record<number, ConservationText>;
  /** Clé : identifiant du contact (champ `id` de src/data/rescue.ts). */
  rescue: Record<string, string>;
}
