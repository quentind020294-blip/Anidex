import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';

import { colors, radius } from '../../components/theme';
import { AnimalAvatar, ProgressBar, RarityStars } from '../../components/ui';
import { ANIMALS, dexNumber } from '../../data/animals';
import { isThreatened, isThreatenedInVictoria } from '../../data/conservation';
import { CATEGORIES, CATEGORY_ORDER } from '../../data/meta';
import type { Category } from '../../data/types';
import { useI18n } from '../../i18n';
import { rankName } from '../../lib/progress';
import { useDex } from '../../lib/store';
import { matchesNumber, useUnlock } from '../../lib/unlock';

type Filter = Category | 'tous';
type Show = 'tous' | 'decouverts' | 'a-trouver';
type Status = 'all' | 'threatened' | 'vic';

function normalize(s: string) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

export default function DexScreen() {
  const { progress } = useDex();
  const { s, lang } = useI18n();
  const { isUnlocked } = useUnlock();
  const { width } = useWindowDimensions();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('tous');
  const [show, setShow] = useState<Show>('tous');
  const [status, setStatus] = useState<Status>('all');
  // Le bilan de conservation peut ouvrir l'Anidex avec un filtre (« ?status=threatened »).
  const { status: statusParam } = useLocalSearchParams<{ status?: Status }>();
  const [appliedParam, setAppliedParam] = useState(statusParam);
  if (statusParam !== appliedParam) {
    setAppliedParam(statusParam);
    if (statusParam === 'all' || statusParam === 'threatened' || statusParam === 'vic') setStatus(statusParam);
  }

  const columns = width >= 700 ? 5 : width >= 500 ? 4 : 3;
  const cardWidth = (Math.min(width, 1000) - 16 * 2 - 10 * (columns - 1)) / columns;

  const data = useMemo(() => {
    const q = normalize(query.trim());
    return ANIMALS.filter((a) => {
      if (filter !== 'tous' && a.category !== filter) return false;
      const unlocked = isUnlocked(a.id);
      // Le statut de conservation fait partie de la fiche : les filtres « menacées »
      // ne s'appliquent qu'aux espèces débloquées, pour ne rien dévoiler des autres.
      if (status === 'threatened' && !(unlocked && isThreatened(a))) return false;
      if (status === 'vic' && !(unlocked && isThreatenedInVictoria(a))) return false;
      const found = progress.discovered.has(a.id);
      if (show === 'decouverts' && !found) return false;
      if (show === 'a-trouver' && found) return false;
      if (!q) return true;
      if (matchesNumber(a.id, q)) return true;
      return [...Object.values(a.name), a.scientific].some((v) => normalize(v).includes(q));
    });
  }, [query, filter, show, status, progress.discovered, isUnlocked]);

  const total = ANIMALS.length;
  const found = progress.discovered.size;

  return (
    <FlatList
      key={columns}
      data={data}
      numColumns={columns}
      keyExtractor={(a) => String(a.id)}
      contentContainerStyle={styles.list}
      columnWrapperStyle={{ gap: 10 }}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={
        <View style={{ gap: 12, marginBottom: 12 }}>
          <View style={styles.hero}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <View>
                <Text style={styles.heroLabel}>{s.dex.discovered}</Text>
                <Text style={styles.heroCount}>
                  {found}<Text style={styles.heroTotal}> / {total}</Text>
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.heroLabel}>{s.dex.level(progress.level)}</Text>
                <Text style={styles.heroRank}>{rankName(s, progress.level)}</Text>
              </View>
            </View>
            <ProgressBar value={found / total} color={colors.gold} track="rgba(255,255,255,0.25)" />
          </View>

          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder={s.dex.search}
            placeholderTextColor={colors.muted}
            style={styles.search}
            autoCorrect={false}
            clearButtonMode="while-editing"
          />

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
            <Chip label={s.dex.allCategories} active={filter === 'tous'} onPress={() => setFilter('tous')} color={colors.ink} />
            {CATEGORY_ORDER.map((c) => (
              <Chip
                key={c}
                label={`${CATEGORIES[c].emoji} ${s.categories[c].plural}`}
                active={filter === c}
                color={CATEGORIES[c].color}
                onPress={() => setFilter(filter === c ? 'tous' : c)}
              />
            ))}
          </ScrollView>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
            <Chip label={s.dex.statusAll} active={status === 'all'} onPress={() => setStatus('all')} color={colors.ink} />
            <Chip label={s.dex.statusThreatened} active={status === 'threatened'} onPress={() => setStatus(status === 'threatened' ? 'all' : 'threatened')} color="#C2410C" />
            <Chip label={s.dex.statusVic} active={status === 'vic'} onPress={() => setStatus(status === 'vic' ? 'all' : 'vic')} color="#1E3A8A" />
          </ScrollView>

          <View style={styles.segment}>
            {(['tous', 'decouverts', 'a-trouver'] as Show[]).map((v) => (
              <Pressable key={v} onPress={() => setShow(v)} style={[styles.segmentItem, show === v && styles.segmentActive]}>
                <Text style={[styles.segmentText, show === v && { color: '#fff' }]}>
                  {v === 'tous' ? s.dex.showAll : v === 'decouverts' ? s.dex.showFound : s.dex.showMissing}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      }
      ListEmptyComponent={
        <Text style={styles.empty}>
          {show === 'decouverts' && found === 0
            ? s.dex.emptyNone
            : s.dex.emptySearch}
        </Text>
      }
      renderItem={({ item }) => {
        const discovered = isUnlocked(item.id);
        const sightings = progress.sightingsByAnimal.get(item.id);
        const photo = sightings?.find((s) => s.photoUri)?.photoUri;
        return (
          <Pressable
            onPress={() => router.push(`/animal/${item.id}`)}
            accessibilityLabel={`${dexNumber(item.id)} ${item.name[lang]}${discovered ? '' : `, ${s.locked.a11yLocked}`}`}
            style={({ pressed }) => [styles.cell, { width: cardWidth }, pressed && { transform: [{ scale: 0.97 }] }]}
          >
            <Text style={styles.number}>{dexNumber(item.id)}</Text>
            <AnimalAvatar animal={item} discovered={discovered} photoUri={photo} size={Math.min(cardWidth - 24, 96)} />
            <Text numberOfLines={2} style={[styles.name, !discovered && { color: colors.muted }]}>
              {item.name[lang]}
            </Text>
            {discovered ? (
              <View style={[styles.dot, { backgroundColor: CATEGORIES[item.category].color }]} />
            ) : (
              <RarityStars rarity={item.rarity} />
            )}
          </Pressable>
        );
      }}
    />
  );
}

function Chip({ label, active, onPress, color }: { label: string; active: boolean; onPress: () => void; color: string }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, { borderColor: color }, active && { backgroundColor: color }]}
    >
      <Text style={[styles.chipText, { color: active ? '#fff' : color }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  list: { padding: 16, paddingBottom: 32, gap: 10, maxWidth: 1000, width: '100%', alignSelf: 'center' },
  hero: { backgroundColor: colors.red, borderRadius: radius.lg, padding: 16, gap: 12 },
  heroLabel: { color: 'rgba(255,255,255,0.8)', fontWeight: '600', fontSize: 13 },
  heroCount: { color: '#fff', fontSize: 34, fontWeight: '900' },
  heroTotal: { fontSize: 18, fontWeight: '700', color: 'rgba(255,255,255,0.75)' },
  heroRank: { color: '#fff', fontWeight: '800', fontSize: 16 },
  search: {
    backgroundColor: colors.card, borderRadius: radius.md, paddingHorizontal: 14, paddingVertical: 12,
    fontSize: 15, color: colors.ink, borderWidth: 1, borderColor: colors.line,
  },
  chip: { borderWidth: 2, borderRadius: radius.pill, paddingHorizontal: 12, paddingVertical: 6 },
  chipText: { fontWeight: '700', fontSize: 13 },
  segment: { flexDirection: 'row', backgroundColor: '#E9E4D8', borderRadius: radius.md, padding: 3 },
  segmentItem: { flex: 1, paddingVertical: 8, borderRadius: radius.md - 3, alignItems: 'center' },
  segmentActive: { backgroundColor: colors.ink },
  segmentText: { fontWeight: '700', color: colors.ink, fontSize: 13 },
  cell: {
    backgroundColor: colors.card, borderRadius: radius.md, paddingVertical: 10, paddingHorizontal: 6,
    alignItems: 'center', gap: 6, borderWidth: 1, borderColor: colors.line,
  },
  number: { alignSelf: 'flex-start', marginLeft: 4, fontSize: 11, fontWeight: '800', color: colors.muted },
  name: { fontSize: 12, fontWeight: '700', textAlign: 'center', color: colors.ink, minHeight: 30 },
  dot: { width: 8, height: 8, borderRadius: 4, marginTop: 4 },
  empty: { textAlign: 'center', color: colors.muted, marginTop: 40, lineHeight: 22 },
});
