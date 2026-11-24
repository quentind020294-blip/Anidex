import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import { ANIMAL_TYPES } from '../data/animalTypes';
import type { Traits } from '../data/traitsTypes';
import { useI18n } from '../i18n';
import { formatCount, formatLifespan, formatSize, formatSpeed, formatWeight } from '../lib/traitsFormat';
import { colors, radius } from './theme';

const DASH = '—';

/** Ligne de 3 colonnes (poids · taille · type), valeur en gros, intitulé en petites majuscules. */
export function SpeciesStats({ traits }: { traits: Traits }) {
  const { s, lang } = useI18n();
  const { width } = useWindowDimensions();
  const w = traits.weight;
  const sexed = w?.male && w?.female;
  // Taille des valeurs adaptée à la largeur de l'écran (rien ne doit être coupé, même à 320 px).
  const big = { fontSize: width < 360 ? 15 : width < 420 ? 17 : 19, lineHeight: width < 360 ? 18 : width < 420 ? 20 : 23 };
  const small = { fontSize: width < 360 ? 12.5 : 14 };

  return (
    <View style={styles.row} testID="species-stats">
      <View style={styles.col}>
        {sexed ? (
          <View style={{ alignItems: 'center' }}>
            <Text style={[styles.valueSmall, small]}>{s.traits.male} {formatWeight(w.male!, lang)}</Text>
            <Text style={[styles.valueSmall, small]}>{s.traits.female} {formatWeight(w.female!, lang)}</Text>
          </View>
        ) : (
          <Text style={[styles.value, big]}>{w?.all ? formatWeight(w.all, lang) : DASH}</Text>
        )}
        <Text style={styles.label}>{s.traits.weight}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.col}>
        <Text style={[styles.value, big]}>{traits.size ? formatSize(traits.size.cm, lang) : DASH}</Text>
        <Text style={styles.label} numberOfLines={2}>{traits.size ? s.traits.sizeKinds[traits.size.kind] : s.traits.size}</Text>
      </View>

      <View style={styles.divider} />

      <View style={[styles.col, styles.colTypes]}>
        <View style={styles.types}>
          {traits.types.map((t) => (
            <View key={t} style={styles.type} accessible accessibilityLabel={s.traits.types[t]}>
              <View style={[styles.typeIcon, { backgroundColor: ANIMAL_TYPES[t].color }]}>
                <MaterialCommunityIcons name={ANIMAL_TYPES[t].icon} size={12} color="#fff" />
              </View>
              <Text style={styles.typeName}>{s.traits.types[t]}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.label}>{s.traits.type}</Text>
      </View>
    </View>
  );
}

/** Second bloc, plus discret : longévité, régime, activité, vitesse, reproduction. */
export function SpeciesFacts({ traits }: { traits: Traits }) {
  const { s, lang } = useI18n();
  const items: { label: string; value: string }[] = [
    { label: s.traits.lifespan, value: traits.lifespan ? formatLifespan(traits.lifespan, lang, s.traits) : DASH },
    { label: s.traits.diet, value: traits.diet?.[lang] ?? DASH },
    { label: s.traits.activity, value: traits.activity ? s.traits.activities[traits.activity] : DASH },
    { label: s.traits.speed, value: traits.speed != null ? formatSpeed(traits.speed, lang) : DASH },
    {
      label: traits.offspring ? (traits.offspring.kind === 'eggs' ? s.traits.eggs : s.traits.young) : s.traits.offspring,
      value: traits.offspring ? formatCount(traits.offspring.n, lang) : DASH,
    },
  ];
  return (
    <View style={styles.facts} testID="species-facts">
      {items.map((it) => (
        <View key={it.label} style={styles.fact}>
          <Text style={styles.factLabel}>{it.label}</Text>
          <Text style={styles.factValue}>{it.value}</Text>
        </View>
      ))}
      <Text style={styles.note}>{s.traits.note}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row', alignItems: 'stretch', backgroundColor: '#fff', borderRadius: radius.md,
    paddingVertical: 12, paddingHorizontal: 4, width: '100%',
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 10, shadowOffset: { width: 0, height: 3 }, elevation: 2,
  },
  col: { flex: 1, alignItems: 'center', justifyContent: 'space-between', gap: 6, paddingHorizontal: 3, minWidth: 0 },
  colTypes: { flex: 1.3 },
  divider: { width: StyleSheet.hairlineWidth * 2, backgroundColor: '#D6D1C4', marginVertical: 4 },
  value: { fontWeight: '800', color: colors.ink, textAlign: 'center' },
  valueSmall: { fontWeight: '800', color: colors.ink, textAlign: 'center' },
  label: {
    fontSize: 10, fontWeight: '700', color: '#8A8577', textTransform: 'uppercase', letterSpacing: 0.8, textAlign: 'center',
  },
  types: { gap: 5, alignItems: 'flex-start' },
  type: { flexDirection: 'row', alignItems: 'center', gap: 4, maxWidth: '100%' },
  typeIcon: { width: 18, height: 18, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  typeName: { fontSize: 11.5, fontWeight: '800', color: colors.ink, flexShrink: 1 },
  facts: { gap: 0 },
  fact: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, paddingVertical: 7,
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.line,
  },
  factLabel: { fontSize: 11, fontWeight: '700', color: '#8A8577', textTransform: 'uppercase', letterSpacing: 0.6, flexShrink: 0 },
  factValue: { fontSize: 14, color: colors.ink, fontWeight: '600', flexShrink: 1, textAlign: 'right' },
  note: { fontSize: 11, color: colors.muted, lineHeight: 15, marginTop: 8 },
});
