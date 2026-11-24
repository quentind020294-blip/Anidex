import { useId, useMemo, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Defs, G, Line, Path, Pattern, Rect, Text as SvgText } from 'react-native-svg';

import { DRAW_ORDER, MAP, STATE_CENTERS, STATE_PATHS, project } from '../data/australiaMap';
import type { StateCode } from '../data/types';
import type { GridCell } from '../lib/alaGrid';
import { colors, radius } from './theme';

/** Présence d'une espèce dans un État : foncé = commune, clair = rare ou localisée, hachuré = introduite. */
export type Presence = 'common' | 'rare' | 'introduced';

export interface MapPoint {
  id: string;
  lat: number;
  lon: number;
  color?: string;
  /** Texte affiché quand on touche le point (date, lieu…). */
  label: string;
}

const ABSENT = '#E7E2D6';
// Dans un SVG, le navigateur utilise une police à empattements par défaut.
const LABEL_FONT = Platform.OS === 'web' ? 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif' : undefined;
const ABSENT_STROKE = '#FFFFFF';

/** Mélange une couleur hexadécimale avec du blanc (amount = 0 → couleur d'origine, 1 → blanc). */
export function tint(hex: string, amount: number): string {
  const n = parseInt(hex.slice(1), 16);
  const mix = (c: number) => Math.round(c + (255 - c) * amount);
  const r = mix((n >> 16) & 255), g = mix((n >> 8) & 255), b = mix(n & 255);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

export function AustraliaMap({
  presence = {},
  color = colors.red,
  cells,
  points = [],
  showLabels = true,
  accessibilityLabel,
  emptyHint,
}: {
  presence?: Partial<Record<StateCode, Presence>>;
  color?: string;
  /** Mode précis : carrés de 1° où l'espèce a été observée (Atlas of Living Australia). */
  cells?: GridCell[];
  points?: MapPoint[];
  showLabels?: boolean;
  accessibilityLabel: string;
  /** Message affiché sous la carte tant qu'aucun point n'est sélectionné. */
  emptyHint?: string;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const hatchId = `hatch-${uid}`;
  const [selected, setSelected] = useState<string | null>(null);
  const selectedPoint = points.find((p) => p.id === selected);
  const precise = !!cells;

  const maxCount = useMemo(() => Math.max(1, ...(cells ?? []).map((c) => c.count)), [cells]);

  const fillFor = (st: StateCode) => {
    if (precise) return ABSENT;
    const p = presence[st];
    if (p === 'common') return color;
    if (p === 'rare') return tint(color, 0.55);
    if (p === 'introduced') return `url(#${hatchId})`;
    return ABSENT;
  };
  const labelColor = (st: StateCode) => (!precise && presence[st] === 'common' ? '#FFFFFF' : '#5B5548');

  return (
    <View style={styles.wrap}>
      <View style={styles.mapBox} accessible accessibilityRole="image" accessibilityLabel={accessibilityLabel}>
        <Svg width="100%" height="100%" viewBox={`-6 -6 ${MAP.width + 12} ${MAP.height + 12}`}>
          <Defs>
            <Pattern id={hatchId} patternUnits="userSpaceOnUse" width={7} height={7} patternTransform="rotate(45)">
              <Rect x={0} y={0} width={7} height={7} fill={tint(color, 0.7)} />
              <Line x1={0} y1={0} x2={0} y2={7} stroke={color} strokeWidth={3.5} />
            </Pattern>
          </Defs>

          {DRAW_ORDER.map((st) => (
            <Path key={st} d={STATE_PATHS[st]} fill={fillFor(st)} stroke={ABSENT_STROKE} strokeWidth={1.1} strokeLinejoin="round" />
          ))}

          {precise && (
            <G>
              {cells!.map((c) => {
                const [x1, y1] = project(c.lon - 0.5, c.lat + 0.5);
                const [x2, y2] = project(c.lon + 0.5, c.lat - 0.5);
                const strength = 0.35 + 0.65 * (Math.log(c.count + 1) / Math.log(maxCount + 1));
                return (
                  <Rect key={`${c.lat},${c.lon}`} x={x1} y={y1} width={x2 - x1} height={y2 - y1}
                    fill={color} fillOpacity={strength} stroke="#FFFFFF" strokeWidth={0.3} />
                );
              })}
              {/* Les frontières restent lisibles par-dessus les carrés. */}
              {DRAW_ORDER.map((st) => (
                <Path key={`b-${st}`} d={STATE_PATHS[st]} fill="none" stroke="#FFFFFF" strokeOpacity={0.9} strokeWidth={0.9} />
              ))}
            </G>
          )}

          {showLabels && DRAW_ORDER.map((st) => {
            const [x, y] = STATE_CENTERS[st];
            const isAct = st === 'ACT';
            return (
              <SvgText key={`l-${st}`} x={isAct ? x + 16 : x} y={isAct ? y + 4 : y + 4} fontSize={isAct ? 9 : 12}
                fontWeight="bold" fontFamily={LABEL_FONT} fill={isAct ? '#5B5548' : labelColor(st)} textAnchor="middle">
                {st}
              </SvgText>
            );
          })}

          {points.map((p) => {
            const [x, y] = project(p.lon, p.lat);
            const active = p.id === selected;
            return (
              <G key={p.id} onPress={() => setSelected(active ? null : p.id)}>
                {/* Zone tactile plus large que le point visible. */}
                <Circle cx={x} cy={y} r={11} fill="#000" fillOpacity={0.001} />
                <Circle cx={x} cy={y} r={active ? 6.5 : 4.5} fill={p.color ?? colors.ink} stroke="#FFFFFF" strokeWidth={active ? 2.5 : 1.8} />
              </G>
            );
          })}
        </Svg>
      </View>

      {selectedPoint ? (
        <View style={styles.tooltip}>
          <View style={[styles.tooltipDot, { backgroundColor: selectedPoint.color ?? colors.ink }]} />
          <Text style={styles.tooltipText}>{selectedPoint.label}</Text>
        </View>
      ) : emptyHint ? (
        <Text style={styles.hint}>{emptyHint}</Text>
      ) : null}
    </View>
  );
}

/** Pastille de légende (couleur pleine, claire, hachurée, grise ou point). */
export function LegendSwatch({ kind, color }: { kind: Presence | 'absent' | 'point' | 'cell'; color: string }) {
  if (kind === 'point') {
    return <View style={[styles.swatchDot, { backgroundColor: color }]} />;
  }
  if (kind === 'introduced') {
    return (
      <View style={[styles.swatch, { overflow: 'hidden' }]}>
        <Svg width="100%" height="100%" viewBox="0 0 16 12">
          <Rect width={16} height={12} fill={tint(color, 0.7)} />
          {[-12, -6, 0, 6, 12, 18].map((o) => (
            <Line key={o} x1={o} y1={12} x2={o + 12} y2={0} stroke={color} strokeWidth={2.4} />
          ))}
        </Svg>
      </View>
    );
  }
  const bg = kind === 'common' || kind === 'cell' ? color : kind === 'rare' ? tint(color, 0.55) : ABSENT;
  return <View style={[styles.swatch, { backgroundColor: bg }]} />;
}

const styles = StyleSheet.create({
  wrap: { gap: 6 },
  mapBox: {
    width: '100%',
    aspectRatio: (MAP.width + 12) / (MAP.height + 12),
    backgroundColor: '#DCEFF7',
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  tooltip: {
    flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.ink,
    paddingHorizontal: 12, paddingVertical: 8, borderRadius: radius.md,
  },
  tooltipDot: { width: 10, height: 10, borderRadius: 5, borderWidth: 1.5, borderColor: '#fff' },
  tooltipText: { color: '#fff', fontWeight: '700', flex: 1, fontSize: 13 },
  hint: { fontSize: 12, color: colors.muted },
  swatch: { width: 18, height: 13, borderRadius: 3 },
  swatchDot: { width: 11, height: 11, borderRadius: 6, borderWidth: 1.5, borderColor: '#fff', marginHorizontal: 3.5 },
});
