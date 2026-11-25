import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { conservationOf, type AuStatus, type Listing } from '../data/conservation';
import { IUCN_COLORS, IUCN_ORDER } from '../data/meta';
import type { Animal } from '../data/types';
import { useI18n } from '../i18n';
import { colors, radius } from './theme';
import { Button, Card } from './ui';

const AU_COLORS: Record<AuStatus, string> = {
  CR: '#DC2626', EN: '#F97316', VU: '#CA8A04', CD: '#65A30D', TH: '#F97316', EW: '#7F1D1D', EX: '#111827',
};

/** Section « Conservation » d'une fiche : statuts, tendance, menaces, gestes, programmes. */
export function ConservationCard({ animal }: { animal: Animal }) {
  const { s, lang } = useI18n();
  const c = conservationOf(animal);
  const iucnKnown = IUCN_ORDER.includes(c.iucn);

  return (
    <Card style={{ gap: 14 }}>
      <Text style={styles.section}>🛡️ {s.animal.conservation}</Text>

      {animal.introduced && c.impact && (
        <View style={styles.invasive}>
          <Text style={styles.invasiveTitle}>{s.consSection.invasive}</Text>
          <Text style={styles.text}>{c.impact[lang]}</Text>
        </View>
      )}

      {/* Liste rouge mondiale */}
      <View style={{ gap: 6 }}>
        <Text style={styles.label}>{s.consSection.iucn}</Text>
        <View style={styles.consRow}>
          {IUCN_ORDER.map((k) => (
            <View key={k} style={[styles.consCell, { backgroundColor: k === c.iucn ? IUCN_COLORS[k] : '#EEE9DD' }]}>
              <Text style={[styles.consCode, { color: k === c.iucn ? '#fff' : colors.muted }]}>{k}</Text>
            </View>
          ))}
        </View>
        <Text style={[styles.status, { color: iucnKnown ? IUCN_COLORS[c.iucn] : colors.muted }]}>
          {iucnKnown ? '' : `${c.iucn} · `}{s.conservation[c.iucn]}
        </Text>
        {c.iucnNote && <Text style={styles.note}>ℹ️ {c.iucnNote[lang]}</Text>}
      </View>

      <ListingRow label={s.consSection.epbc} listing={c.epbc} />
      <ListingRow label={s.consSection.vic} listing={c.vic} />

      <View style={{ gap: 4 }}>
        <Text style={styles.label}>{s.consSection.trend}</Text>
        <Text style={styles.text}>{s.trend[c.trend]}</Text>
        {c.trend !== 'unknown' && <Text style={styles.note}>{s.consSection.trendEstimate}</Text>}
      </View>

      {!animal.introduced && (
        <View style={{ gap: 4 }}>
          <Text style={styles.label}>{s.consSection.threats}</Text>
          {c.threats.length ? (
            <View style={styles.tags}>
              {c.threats.map((t) => (
                <View key={t} style={styles.tag}><Text style={styles.tagText}>{s.threats[t]}</Text></View>
              ))}
            </View>
          ) : (
            <Text style={styles.text}>{s.consSection.noThreats}</Text>
          )}
        </View>
      )}

      <View style={{ gap: 4 }}>
        <Text style={styles.label}>{s.consSection.actions}</Text>
        {c.actions.map((a) => (
          <Text key={a} style={styles.text}>• {s.actions[a]}</Text>
        ))}
      </View>

      {c.programs && (
        <View style={{ gap: 4 }}>
          <Text style={styles.label}>{s.consSection.programs}</Text>
          <Text style={styles.text}>{c.programs[lang]}</Text>
        </View>
      )}

      <Button title={s.consSection.reportInjured} variant="secondary" onPress={() => router.push('/secours')} />
      <Text style={styles.note}>{s.consSection.sources}</Text>
    </Card>
  );
}

function ListingRow({ label, listing }: { label: string; listing?: Listing }) {
  const { s, lang } = useI18n();
  return (
    <View style={{ gap: 4 }}>
      <Text style={styles.label}>{label}</Text>
      {listing ? (
        <View style={{ gap: 2 }}>
          <View style={[styles.pill, { backgroundColor: AU_COLORS[listing.status] }]}>
            <Text style={styles.pillText}>{s.auStatus[listing.status]}</Text>
          </View>
          {listing.scope && <Text style={styles.note}>ℹ️ {listing.scope[lang]}</Text>}
        </View>
      ) : (
        <Text style={[styles.text, { color: colors.muted }]}>{s.consSection.notListed}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { fontSize: 17, fontWeight: '900', color: colors.ink },
  label: { fontSize: 12, fontWeight: '800', color: colors.muted, textTransform: 'uppercase', letterSpacing: 0.5 },
  text: { fontSize: 15, color: colors.ink, lineHeight: 21 },
  status: { fontSize: 15, fontWeight: '800' },
  note: { fontSize: 12, color: colors.muted, lineHeight: 17 },
  consRow: { flexDirection: 'row', gap: 4 },
  consCell: { flex: 1, paddingVertical: 6, borderRadius: 6, alignItems: 'center' },
  consCode: { fontWeight: '900', fontSize: 12 },
  pill: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.pill },
  pillText: { color: '#fff', fontWeight: '800', fontSize: 13 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  // maxWidth + flexShrink : une menace longue passe à la ligne au lieu de sortir de l'écran.
  tag: { backgroundColor: '#F4EBDD', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 14, maxWidth: '100%' },
  tagText: { fontSize: 13, color: colors.ink, fontWeight: '600', flexShrink: 1 },
  invasive: { backgroundColor: '#FEF3C7', borderColor: '#F5D88A', borderWidth: 1, borderRadius: radius.md, padding: 12, gap: 4 },
  invasiveTitle: { fontWeight: '800', color: colors.ink },
});
