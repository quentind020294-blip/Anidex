import { useCallback } from 'react';

import { useDex } from './store';

/**
 * Fiche débloquée : l'espèce a au moins une observation avec photo, ou le
 * « mode explorateur » (réglages) affiche tout. La progression (XP, badges)
 * ne dépend jamais du mode explorateur.
 */
export function useUnlock() {
  const { progress, settings } = useDex();
  const explorer = settings.explorerMode;
  const isUnlocked = useCallback((id: number) => explorer || progress.discovered.has(id), [explorer, progress.discovered]);
  return { isUnlocked, explorer };
}

/** Recherche : un nom caché ne doit jamais être trouvable, seulement le numéro. */
export function matchesNumber(id: number, query: string): boolean {
  const digits = query.replace(/^#/, '').replace(/^0+/, '');
  return digits.length > 0 && /^\d+$/.test(digits) && String(id).includes(digits);
}
