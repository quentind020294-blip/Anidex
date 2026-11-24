import { router } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius } from '../../components/theme';
import { JournalMap } from '../../components/JournalMap';
import { AnimalAvatar, Button, StoredImage, TypeBadge } from '../../components/ui';
import { dexNumber, getAnimal } from '../../data/animals';
import { useI18n } from '../../i18n';
import { formatDate, placeLabel } from '../../lib/format';
import { useDex } from '../../lib/store';
import { useUnlock } from '../../lib/unlock';

export default function JournalScreen() {
  const { sightings } = useDex();
  const { s, lang } = useI18n();
  const { isUnlocked } = useUnlock();
  const sorted = [...sightings].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <FlatList
      data={sorted}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      ListHeaderComponent={
        sorted.length ? (
          <View>
            <JournalMap sightings={sorted} />
            <Text style={styles.header}>{s.journal.count(sorted.length)}</Text>
          </View>
        ) : undefined
      }
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={{ fontSize: 56 }}>📔</Text>
          <Text style={styles.emptyTitle}>{s.journal.emptyTitle}</Text>
          <Text style={styles.emptyText}>{s.journal.emptyText}</Text>
          <Button title={s.journal.firstObservation} icon="📷" onPress={() => router.navigate('/observer')} />
        </View>
      }
      renderItem={({ item }) => {
        const animal = getAnimal(item.animalId);
        if (!animal) return null;
        const where = placeLabel(item, s);
        return (
          <Pressable onPress={() => router.push(`/animal/${animal.id}`)} style={({ pressed }) => [styles.row, pressed && { opacity: 0.8 }]}>
            {item.photoUri ? (
              <StoredImage uri={item.photoUri} style={styles.photo} />
            ) : (
              <View style={[styles.photo, { alignItems: 'center', justifyContent: 'center' }]}>
                <AnimalAvatar animal={animal} discovered={isUnlocked(animal.id)} size={60} />
              </View>
            )}
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={styles.number}>{dexNumber(animal.id)}</Text>
              <Text style={styles.name}>{animal.name[lang]}</Text>
              <TypeBadge category={animal.category} small />
              <Text style={styles.meta}>🗓️ {formatDate(item.date, s)}</Text>
              {where && <Text style={styles.meta} numberOfLines={1}>📍 {where}</Text>}
              <Text style={styles.meta}>
                {item.method === 'ia'
                  ? s.method.ai(item.confidence != null ? Math.round(item.confidence * 100) : undefined)
                  : s.method.manual}
              </Text>
            </View>
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16, gap: 10, maxWidth: 720, width: '100%', alignSelf: 'center', flexGrow: 1 },
  header: { fontWeight: '800', color: colors.muted, marginBottom: 4 },
  row: { flexDirection: 'row', gap: 12, backgroundColor: colors.card, borderRadius: radius.md, padding: 10 },
  photo: { width: 104, height: 104, borderRadius: radius.sm, backgroundColor: '#EEE9DD' },
  number: { fontSize: 11, fontWeight: '800', color: colors.muted },
  name: { fontSize: 16, fontWeight: '800', color: colors.ink },
  meta: { fontSize: 12, color: colors.muted },
  empty: { alignItems: 'center', gap: 10, paddingTop: 60, paddingHorizontal: 20 },
  emptyTitle: { fontSize: 18, fontWeight: '800', color: colors.ink, textAlign: 'center' },
  emptyText: { color: colors.muted, textAlign: 'center', lineHeight: 20, marginBottom: 8 },
});
