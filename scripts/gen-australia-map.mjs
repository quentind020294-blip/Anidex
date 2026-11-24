// Génère src/data/australiaMap.ts : contours SVG des 8 États et territoires australiens.
// Source : Natural Earth 1:50m (domaine public), via le paquet npm « sane-topojson » (MIT).
// Usage : node scripts/gen-australia-map.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { feature } from 'topojson-client';

const require = createRequire(import.meta.url);
const topo = JSON.parse(readFileSync(require.resolve('sane-topojson/dist/world_50m.json'), 'utf8'));

// Projection équirectangulaire centrée sur l'Australie (écart de forme négligeable à cette échelle).
const LON_MIN = 112.5;
const LON_MAX = 154;
const LAT_MAX = -9.5; // nord
const LAT_MIN = -44; // sud
const K = 10; // pixels par degré de latitude
const COS = Math.cos((27 * Math.PI) / 180);
const width = Math.round((LON_MAX - LON_MIN) * COS * K);
const height = Math.round((LAT_MAX - LAT_MIN) * K);
const px = (lon) => (lon - LON_MIN) * COS * K;
const py = (lat) => (LAT_MAX - lat) * K;

const CODES = { WA: 'WA', NT: 'NT', SA: 'SA', QL: 'QLD', NS: 'NSW', VI: 'VIC', TS: 'TAS', CT: 'ACT', JB: 'NSW' };
const MIN_AREA = 1.2; // px² : on retire les îlots invisibles à cette échelle

function ringArea(pts) {
  let a = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % pts.length];
    a += x1 * y2 - x2 * y1;
  }
  return Math.abs(a / 2);
}

function ringPath(ring) {
  const pts = ring.map(([lon, lat]) => [px(lon), py(lat)]);
  if (ringArea(pts) < MIN_AREA) return '';
  // Retire les points quasi identiques (moins de 0,4 px d'écart) pour alléger le tracé.
  const out = [];
  for (const p of pts) {
    const last = out[out.length - 1];
    if (!last || Math.hypot(p[0] - last[0], p[1] - last[1]) >= 0.4) out.push(p);
  }
  if (out.length < 3) return '';
  return 'M' + out.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join('L') + 'Z';
}

const fc = feature(topo, topo.objects.subunits);
const paths = {};
const centers = {};
for (const f of fc.features) {
  if (f.properties?.gu !== 'AUS') continue;
  const code = CODES[f.id];
  if (!code) throw new Error(`Code inconnu : ${f.id}`);
  const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
  const d = polys.flatMap((poly) => poly.map(ringPath)).join('');
  paths[code] = (paths[code] ?? '') + d;
  if (f.id !== 'JB') centers[code] = [Number(px(f.properties.ct[0]).toFixed(1)), Number(py(f.properties.ct[1]).toFixed(1))];
}

const order = ['WA', 'NT', 'SA', 'QLD', 'NSW', 'ACT', 'VIC', 'TAS'];
for (const c of order) if (!paths[c]) throw new Error(`État manquant : ${c}`);

const ts = `// Fichier généré par scripts/gen-australia-map.mjs — ne pas modifier à la main.
// Contours : Natural Earth 1:50m (domaine public), via sane-topojson (MIT).
import type { StateCode } from './types';

/** Taille du dessin et paramètres de la projection équirectangulaire. */
export const MAP = {
  width: ${width},
  height: ${height},
  lonMin: ${LON_MIN},
  latMax: ${LAT_MAX},
  scale: ${K},
  cos: ${COS.toFixed(6)},
} as const;

/** Coordonnées (longitude, latitude) → position dans le dessin. */
export function project(lon: number, lat: number): [number, number] {
  return [(lon - MAP.lonMin) * MAP.cos * MAP.scale, (MAP.latMax - lat) * MAP.scale];
}

/** Ordre de dessin : l'ACT, enclavé dans la NSW, en dernier pour rester visible. */
export const DRAW_ORDER: StateCode[] = ${JSON.stringify(['WA', 'NT', 'SA', 'QLD', 'NSW', 'VIC', 'TAS', 'ACT']).replace(/"/g, "'").replace(/,/g, ', ')};

/** Position des étiquettes (centre approximatif de chaque État). */
export const STATE_CENTERS: Record<StateCode, [number, number]> = ${JSON.stringify(centers).replace(/"/g, "'").replace(/,'/g, ", '").replace(/:/g, ': ')};

export const STATE_PATHS: Record<StateCode, string> = {
${order.map((c) => `  ${c}: '${paths[c]}',`).join('\n')}
};
`;
writeFileSync('src/data/australiaMap.ts', ts);
const size = Object.values(paths).reduce((n, d) => n + d.length, 0);
console.log(`australiaMap.ts : ${width}×${height}, ${(size / 1024).toFixed(0)} Ko de tracés`);
