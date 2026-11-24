import type MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import type { ComponentProps } from 'react';

/**
 * « Types » de l'Anidex : un système maison (sans lien avec les jeux Pokémon) pour
 * résumer chaque espèce en une ou deux pastilles. Le premier type décrit le milieu de
 * vie, le second un trait marquant (régime, activité, défense…).
 */
export type AnimalType =
  | 'terrestre' | 'arboricole' | 'volant' | 'aquatique' | 'fouisseur'
  | 'nocturne' | 'carnivore' | 'herbivore' | 'insectivore' | 'omnivore' | 'venimeux' | 'toxique' | 'planeur';

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

export const ANIMAL_TYPES: Record<AnimalType, { color: string; icon: IconName }> = {
  // Milieu de vie
  terrestre: { color: '#B45309', icon: 'paw' },
  arboricole: { color: '#15803D', icon: 'tree' },
  volant: { color: '#0284C7', icon: 'feather' },
  aquatique: { color: '#1D4ED8', icon: 'water' },
  fouisseur: { color: '#78350F', icon: 'shovel' },
  // Trait marquant
  nocturne: { color: '#4338CA', icon: 'weather-night' },
  carnivore: { color: '#DC2626', icon: 'food-steak' },
  herbivore: { color: '#65A30D', icon: 'leaf' },
  insectivore: { color: '#C026D3', icon: 'bug' },
  omnivore: { color: '#EA580C', icon: 'silverware-fork-knife' },
  venimeux: { color: '#6B21A8', icon: 'skull-crossbones' },
  toxique: { color: '#7C2D12', icon: 'bottle-tonic-skull' },
  planeur: { color: '#0D9488', icon: 'parachute' },
};
