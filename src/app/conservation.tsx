import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, radius } from '../components/theme';
import { Button, Card, ProgressBar } from '../components/ui';
import { ANIMALS } from '../data/animals';
import { conservationOf, isThreatened, isThreatenedInVictoria, type AuStatus } from '../data/conservation';
import { IUCN_ALL, IUCN_COLORS } from '../data/meta';
import type { Animal } from '../data/types';
import { useI18n } from '../i18n';
import { useDex } from '../lib/store';

const AU_ORDER: AuStatus[] = ['EX', 'EW', 'CR', 'EN', 'VU', 'TH', 'CD'];
const AU_COLORS: Record<AuStatus, string> = {
  CR: '#DC2626', EN: '#F97316', VU: '#CA8A04', CD: '#65A30D', TH: '#F97316', EW: '#7F1D1D', EX: '#111827',
};

export default function ConservationSummary() {
  const { s } = useI18n();
  const { progress } = useDex();
  const seen = (list: Animal[]) => list.filter((a) => progress.discovered.has(a.id)).length;

  const threatened = ANIMALS.filter(isThreatened);
  const vicThreatened = ANIMALS.filter(isThreatenedInVictoria);
  const introduced = ANIMALS.filter((a) => a.introduced);

  // Seules les inscriptions qui concernent toute l'espèce sont comptées par catégorie.
  const byListing = (key: 'epbc' | 'vic') => {
    const rows = AU_ORDER.map((st) => ({
      key: st,
      label: s.auStatus[st],
      color: AU_COLORS[st],
      list: ANIMALS.filter((a) => {
        const l = conservationOf(a)[key];
        return l && !l.partial && l.status === st;
      }),
    })).filter((r) => r.list.length);
    const notListed = ANIMALS.filter((a) => {
      const l = conservationOf(a)[key];
      return !l || l.partial;
    });
    return [...rows, { key: 'none', label: s.summary.notListed, color: '#9CA3AF', list: notListed }];
  };

  const iucnRows = IUCN_ALL.map((code) => ({
    key: code,
    label: `${code} · ${s.conservation[code]}`,
    color: IUCN_COLORS[code],
    list: ANIMALS.filter((a) => conservationOf(a).iucn === code),
  })).filter((r) => r.list.length);

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.intro}>{s.summary.intro}</Text>

      <View style={styles.bigRow}>
        <BigStat
          title={s.summary.threatened}
          hint={s.summary.threatenedHint}
          value={seen(threatened)}
          total={threatened.length}
          color="#C2410C"
          onPress={() => router.navigate({ pathname: '/', params: { status: 'threatened' } })}
        />
        <BigStat
          title={s.summary.vicThreatened}
          value={seen(vicThreatened)}
          total={vicThreatened.length}
          color="#1E3A8A"
          onPress={() => router.navigate({ pathname: '/', params: { status: 'vic' } })}
        />
      </View>

      <Section title={s.summary.iucnTitle} rows={iucnRows} seen={seen} />
      <Section title={s.summary.epbcTitle} rows={byListing('epbc')} seen={seen} />
      <Section title={s.summary.vicTitle} rows={byListing('vic')} seen={seen} />

      <Card style={{ gap: 8 }}>
        <View style={styles.rowHead}>
          <Text style={styles.section}>🚨 {s.summary.introducedTitle}</Text>
          <Text style={styles.count}>{s.summary.seen(seen(introduced), introduced.length)}</Text>
        </View>
        <ProgressBar value={seen(introduced) / introduced.length} color="#B45309" height={8} />
        <Text style={styles.note}>{s.summary.introducedHint}</Text>
      </Card>

      <Text style={styles.note}>{s.summary.sources}</Text>
      <Button title={s.summary.rescueButton} variant="secondary" onPress={() => router.push('/secours')} />
    </ScrollView>
  );
}

function BigStat({ title, hint, value, total, color, onPress }: {
  title: string; hint?: string; value: number; total: number; color: string; onPress: () => void;
}) {
  const { s } = useI18n();
  return (
    <Card style={[styles.big, { borderColor: color }]}>
      <Text style={[styles.bigValue, { color }]}>{value}<Text style={styles.bigTotal}> / {total}</Text></Text>
      <Text style={styles.bigTitle}>{title}</Text>
      {hint && <Text style={styles.note}>{hint}</Text>}
      <ProgressBar value={total ? value / total : 0} color={color} height={6} />
      <Button title={s.summary.openList} variant="ghost" onPress={onPress} style={{ paddingVertical: 6 }} />
    </Card>
  );
}

function Section({ title, rows, seen }: {
  title: string;
  rows: { key: string; label: string; color: string; list: Animal[] }[];
  seen: (list: Animal[]) => number;
}) {
  const { s } = useI18n();
  return (
    <Card style={{ gap: 10 }}>
      <Text style={styles.section}>{title}</Text>
      {rows.map((r) => {
        const n = seen(r.list);
        return (
          <View key={r.key} style={{ gap: 4 }}>
            <View style={styles.rowHead}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
                <View style={[styles.dot, { backgroundColor: r.color }]} />
                <Text style={styles.rowLabel}>{r.label}</Text>
              </View>
              <Text style={styles.count}>{s.summary.seen(n, r.list.length)}</Text>
            </View>
            <ProgressBar value={n / r.list.length} color={r.color} height={6} />
          </View>
        );
      })}
    </Card>
  );
}

const styles = StyleSheet.create({
  page: { padding: 16, gap: 14, maxWidth: 720, width: '100%', alignSelf: 'center', paddingBottom: 40 },
  intro: { fontSize: 15, color: colors.ink, lineHeight: 21 },
  bigRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  big: { flexGrow: 1, flexBasis: 240, gap: 6, borderWidth: 2, borderRadius: radius.lg },
  bigValue: { fontSize: 34, fontWeight: '900' },
  bigTotal: { fontSize: 18, color: colors.muted, fontWeight: '700' },
  bigTitle: { fontSize: 15, fontWeight: '800', color: colors.ink },
  section: { fontSize: 17, fontWeight: '900', color: colors.ink },
  rowHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  rowLabel: { fontWeight: '700', color: colors.ink, flexShrink: 1 },
  count: { fontWeight: '800', color: colors.muted },
  dot: { width: 10, height: 10, borderRadius: 5 },
  note: { fontSize: 12, color: colors.muted, lineHeight: 17 },
});
