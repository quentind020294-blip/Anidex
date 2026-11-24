import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { CATEGORIES, STATE_ORDER } from '../data/meta';
import type { Animal, Sighting, StateCode } from '../data/types';
import { useI18n } from '../i18n';
import { useOccurrenceGrid } from '../lib/alaGrid';
import { formatDate, placeLabel } from '../lib/format';
import { AustraliaMap, LegendSwatch, type MapPoint, type Presence } from './AustraliaMap';
import { colors, radius } from './theme';

type Mode = 'states' | 'precise';

/** Carte de répartition d'une espèce, avec mes observations en points. */
export function SpeciesMap({ animal, sightings }: { animal: Animal; sightings: Sighting[] }) {
  const { s } = useI18n();
  const [mode, setMode] = useState<Mode>('states');
  const grid = useOccurrenceGrid(animal.scientific, mode === 'precise');
  const color = CATEGORIES[animal.category].color;

  const kind: Presence = animal.introduced
    ? 'introduced'
    : animal.rarity === 'rare' || animal.rarity === 'legendaire'
      ? 'rare'
      : 'common';
  const presence: Partial<Record<StateCode, Presence>> = {};
  for (const st of animal.states) presence[st] = kind;

  const points: MapPoint[] = sightings
    .filter((x) => x.latitude != null && x.longitude != null)
    .map((x) => ({
      id: x.id,
      lat: x.latitude!,
      lon: x.longitude!,
      color: colors.ink,
      label: s.map.point(formatDate(x.date, s), placeLabel(x, s)),
    }));

  const showCells = mode === 'precise' && grid.status === 'ok' && grid.cells.length > 0;
  const fallbackMessage =
    mode !== 'precise' ? null
      : grid.status === 'error' ? s.map.offline
        : grid.status === 'ok' && grid.cells.length === 0 ? s.map.noData
          : null;

  const presentNames = STATE_ORDER.filter((st) => presence[st]).map((st) => s.states[st]).join(', ');

  return (
    <View style={{ gap: 8 }}>
      <View style={styles.segment}>
        {(['states', 'precise'] as Mode[]).map((m) => (
          <Pressable key={m} onPress={() => setMode(m)} style={[styles.segmentItem, mode === m && styles.segmentActive]}
            accessibilityRole="button" accessibilityState={{ selected: mode === m }}>
            <Text style={[styles.segmentText, mode === m && { color: '#fff' }]}>
              {m === 'states' ? s.map.modeStates : s.map.modePrecise}
            </Text>
          </Pressable>
        ))}
      </View>

      <View>
        <AustraliaMap
          presence={presence}
          color={color}
          cells={showCells ? grid.cells : undefined}
          points={points}
          accessibilityLabel={presentNames ? s.map.a11y(presentNames) : s.map.a11yNone}
          emptyHint={points.length ? s.map.tapHint : undefined}
        />
        {mode === 'precise' && grid.status === 'loading' && (
          <View style={styles.loading}>
            <ActivityIndicator color={color} />
            <Text style={styles.loadingText}>{s.map.loading}</Text>
          </View>
        )}
      </View>

      {fallbackMessage && <Text style={styles.warn}>⚠️ {fallbackMessage}</Text>}

      <View style={styles.legend}>
        {showCells ? (
          <LegendRow swatch={<LegendSwatch kind="cell" color={color} />} label={s.map.legendCells} />
        ) : (
          <>
            {kind === 'common' && <LegendRow swatch={<LegendSwatch kind="common" color={color} />} label={s.map.legendCommon} />}
            {kind === 'rare' && <LegendRow swatch={<LegendSwatch kind="rare" color={color} />} label={s.map.legendRare} />}
            {kind === 'introduced' && <LegendRow swatch={<LegendSwatch kind="introduced" color={color} />} label={s.map.legendIntroduced} />}
            <LegendRow swatch={<LegendSwatch kind="absent" color={color} />} label={s.map.legendAbsent} />
          </>
        )}
        {points.length > 0 && <LegendRow swatch={<LegendSwatch kind="point" color={colors.ink} />} label={s.map.legendMine} />}
      </View>
      <Text style={styles.note}>{showCells ? s.map.preciseNote : s.map.shadeNote}</Text>
      {sightings.length > 0 && points.length === 0 && <Text style={styles.note}>{s.map.noGps}</Text>}
      <Text style={styles.note}>{s.map.credits}</Text>
    </View>
  );
}

function LegendRow({ swatch, label }: { swatch: React.ReactNode; label: string }) {
  return (
    <View style={styles.legendRow}>
      {swatch}
      <Text style={styles.legendText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  segment: { flexDirection: 'row', backgroundColor: '#E9E4D8', borderRadius: radius.md, padding: 3 },
  segmentItem: { flex: 1, paddingVertical: 7, borderRadius: radius.md - 3, alignItems: 'center' },
  segmentActive: { backgroundColor: colors.ink },
  segmentText: { fontWeight: '700', color: colors.ink, fontSize: 13 },
  loading: {
    position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.65)', borderRadius: radius.md, gap: 8, padding: 16,
  },
  loadingText: { color: colors.ink, fontWeight: '700', textAlign: 'center', fontSize: 13 },
  warn: { fontSize: 12, color: '#92400E', fontWeight: '700' },
  legend: { flexDirection: 'row', flexWrap: 'wrap', columnGap: 14, rowGap: 6 },
  legendRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendText: { fontSize: 12, color: colors.ink },
  note: { fontSize: 11, color: colors.muted, lineHeight: 16 },
});
