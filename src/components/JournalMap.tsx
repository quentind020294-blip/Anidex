import { StyleSheet, Text, View } from 'react-native';

import { getAnimal } from '../data/animals';
import { CATEGORIES } from '../data/meta';
import type { Sighting, StateCode } from '../data/types';
import { useI18n } from '../i18n';
import { HIDDEN_NAME, useUnlock } from '../lib/unlock';
import { formatDate } from '../lib/format';
import { AustraliaMap, LegendSwatch, type MapPoint, type Presence } from './AustraliaMap';
import { colors } from './theme';
import { Card } from './ui';

/** Carte globale de toutes mes observations géolocalisées. */
export function JournalMap({ sightings }: { sightings: Sighting[] }) {
  const { s, lang } = useI18n();
  const { isUnlocked } = useUnlock();
  const points: MapPoint[] = [];
  const visited: Partial<Record<StateCode, Presence>> = {};
  for (const x of sightings) {
    if (x.state) visited[x.state] = 'rare';
    const animal = getAnimal(x.animalId);
    if (!animal || x.latitude == null || x.longitude == null) continue;
    points.push({
      id: x.id,
      lat: x.latitude,
      lon: x.longitude,
      color: CATEGORIES[animal.category].color,
      label: s.map.pointWithName(isUnlocked(animal.id) ? animal.name[lang] : HIDDEN_NAME, formatDate(x.date, s)),
    });
  }
  const visitedNames = Object.keys(visited).map((st) => s.states[st as StateCode]).join(', ');

  return (
    <Card style={{ gap: 8, marginBottom: 6 }}>
      <Text style={styles.title}>🗺️ {s.map.journalTitle}</Text>
      <Text style={styles.count}>{s.map.journalCount(points.length, sightings.length)}</Text>
      <AustraliaMap
        presence={visited}
        color={colors.red}
        points={points}
        accessibilityLabel={visitedNames ? s.map.a11y(visitedNames) : s.map.a11yNone}
        emptyHint={points.length ? s.map.journalHint : undefined}
      />
      <View style={styles.legend}>
        <View style={styles.row}>
          <LegendSwatch kind="rare" color={colors.red} />
          <Text style={styles.legendText}>{s.map.journalVisited}</Text>
        </View>
        {points.length > 0 && (
          <View style={styles.row}>
            <LegendSwatch kind="point" color={colors.ink} />
            <Text style={styles.legendText}>{s.map.journalPoints}</Text>
          </View>
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 16, fontWeight: '900', color: colors.ink },
  count: { fontSize: 12, color: colors.muted, fontWeight: '700' },
  legend: { flexDirection: 'row', flexWrap: 'wrap', columnGap: 14, rowGap: 6 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendText: { fontSize: 12, color: colors.ink },
});
