import type { Sighting } from '../data/types';
import { fr } from '../i18n/fr/ui';
import type { Strings } from '../i18n/types';

export function formatDate(iso: string, s: Strings) {
  return new Date(iso).toLocaleDateString(s.dateLocale, { day: 'numeric', month: 'long', year: 'numeric' });
}

/**
 * Lieu d'une observation dans la langue choisie : le nom de ville du géocodage si on l'a,
 * sinon le nom (traduit) de l'État. Les premières versions web enregistraient le nom
 * français de l'État comme lieu : on le retraduit aussi.
 */
export function placeLabel(sighting: Pick<Sighting, 'place' | 'state'>, s: Strings): string | null {
  const { place, state } = sighting;
  if (state && (!place || place === fr.states[state])) return s.states[state];
  return place ?? null;
}
