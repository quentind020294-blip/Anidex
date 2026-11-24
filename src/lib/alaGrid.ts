import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

/**
 * Zones réelles de présence, d'après les observations publiques de l'Atlas of Living Australia
 * (API biocache, gratuite et sans clé). On demande une grille de carrés de 1° (~100 km) :
 * léger à télécharger et suffisant pour une carte de téléphone.
 *
 * Filtres : pas d'animaux captifs (zoos), pas de mentions d'absence, uniquement le cadre
 * de l'Australie, et on ignore les carrés presque vides (moins d'une donnée sur 20 000, et au moins 2)
 * quand l'espèce est bien documentée : ce sont souvent des erreurs d'identification ou de position.
 * Le résultat est gardé 30 jours sur l'appareil, pour fonctionner ensuite hors connexion.
 */
export interface GridCell {
  lat: number;
  lon: number;
  count: number;
}

const CACHE_PREFIX = 'anidex/ala-grid/v1/';
const TTL_MS = 30 * 24 * 3600 * 1000;
const TIMEOUT_MS = 15000;
const memory = new Map<string, GridCell[]>();

function url(scientific: string): string {
  const params = [
    `q=${encodeURIComponent(`taxon_name:"${scientific}"`)}`,
    `fq=${encodeURIComponent('-basis_of_record:LIVING_SPECIMEN')}`,
    `fq=${encodeURIComponent('-occurrence_status:absent')}`,
    'pageSize=0',
    'facets=point-1',
    'flimit=-1',
  ];
  return `https://biocache-ws.ala.org.au/ws/occurrences/search?${params.join('&')}`;
}

interface FacetResponse {
  totalRecords?: number;
  facetResults?: { fieldName: string; fieldResult: { label: string; count: number }[] }[];
}

export function parseGrid(data: FacetResponse): GridCell[] {
  const total = data.totalRecords ?? 0;
  const raw = data.facetResults?.find((f) => f.fieldName === 'point-1')?.fieldResult ?? [];
  const minCount = total >= 300 ? Math.max(2, Math.round(total / 20000)) : 1;
  const cells: GridCell[] = [];
  for (const r of raw) {
    const [lat, lon] = r.label.split(',').map(Number);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) continue; // « Not supplied »
    if (lat > -8 || lat < -45 || lon < 111 || lon > 156) continue; // hors d'Australie
    if (r.count < minCount) continue; // carré presque vide, probablement une erreur
    cells.push({ lat, lon, count: r.count });
  }
  return cells;
}

export async function fetchOccurrenceGrid(scientific: string): Promise<GridCell[]> {
  const hit = memory.get(scientific);
  if (hit) return hit;
  try {
    const cached = await AsyncStorage.getItem(CACHE_PREFIX + scientific);
    if (cached) {
      const { at, cells } = JSON.parse(cached) as { at: number; cells: GridCell[] };
      if (Date.now() - at < TTL_MS) {
        memory.set(scientific, cells);
        return cells;
      }
    }
  } catch {
    // Cache illisible : on retélécharge.
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url(scientific), { signal: controller.signal });
    if (!res.ok) throw new Error(`ALA ${res.status}`);
    const cells = parseGrid((await res.json()) as FacetResponse);
    memory.set(scientific, cells);
    void AsyncStorage.setItem(CACHE_PREFIX + scientific, JSON.stringify({ at: Date.now(), cells })).catch(() => undefined);
    return cells;
  } finally {
    clearTimeout(timer);
  }
}

export type GridState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'ok'; cells: GridCell[] }
  | { status: 'error' };

/** Charge la grille quand `enabled` est vrai ; renvoie l'état du chargement. */
export function useOccurrenceGrid(scientific: string, enabled: boolean): GridState {
  const [entry, setEntry] = useState<{ key: string; cells?: GridCell[]; error?: boolean } | null>(null);

  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    fetchOccurrenceGrid(scientific)
      .then((cells) => alive && setEntry({ key: scientific, cells }))
      .catch(() => alive && setEntry({ key: scientific, error: true }));
    return () => {
      alive = false;
    };
  }, [scientific, enabled]);

  if (!enabled) return { status: 'idle' };
  const cached = memory.get(scientific);
  if (cached) return { status: 'ok', cells: cached };
  if (entry?.key !== scientific) return { status: 'loading' };
  return entry.error ? { status: 'error' } : { status: 'ok', cells: entry.cells ?? [] };
}
