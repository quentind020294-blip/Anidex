import { Stack, router, useLocalSearchParams } from 'expo-router';
import { Alert, Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, radius } from '../../components/theme';
import { AnimalAvatar, Button, Card, RarityStars } from '../../components/ui';
import { ANIMALS, dexNumber, getAnimal } from '../../data/animals';
import { CATEGORIES, CONSERVATION, RARITIES, STATES } from '../../data/meta';
import type { StateCode } from '../../data/types';
import { formatDate } from '../../lib/format';
import { useDex } from '../../lib/store';

const STATE_ORDER: StateCode[] = ['WA', 'NT', 'SA', 'QLD', 'NSW', 'ACT', 'VIC', 'TAS'];

export default function AnimalScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const animal = getAnimal(Number(id));
  const { progress, removeSighting } = useDex();

  if (!animal) {
    return (
      <View style={{ padding: 24 }}>
        <Text>Espèce introuvable.</Text>
      </View>
    );
  }

  const discovered = progress.discovered.has(animal.id);
  const sightings = [...(progress.sightingsByAnimal.get(animal.id) ?? [])].reverse();
  const cover = sightings.find((s) => s.photoUri)?.photoUri;
  const color = CATEGORIES[animal.category].color;
  const cons = CONSERVATION[animal.conservation];
  const prev = getAnimal(animal.id - 1);
  const next = getAnimal(animal.id + 1);

  function confirmDelete(sightingId: string) {
    const doDelete = () => void removeSighting(sightingId);
    if (Platform.OS === 'web') {
      if (window.confirm('Supprimer cette observation ?')) doDelete();
      return;
    }
    Alert.alert('Supprimer cette observation ?', 'La photo sera aussi supprimée.', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Supprimer', style: 'destructive', onPress: doDelete },
    ]);
  }

  return (
    <>
      <Stack.Screen options={{ title: `${dexNumber(animal.id)}  ${animal.nameFr}`, headerStyle: { backgroundColor: color } }} />
      <ScrollView contentContainerStyle={styles.page}>
        <View style={[styles.hero, { backgroundColor: color }]}>
          {discovered && cover ? (
            <Image source={{ uri: cover }} style={styles.cover} />
          ) : (
            <View style={styles.avatarRing}>
              <AnimalAvatar animal={animal} discovered={discovered} size={150} />
            </View>
          )}
          <Text style={styles.heroNumber}>{dexNumber(animal.id)}</Text>
          <Text style={styles.heroName}>{animal.nameFr}</Text>
          <Text style={styles.heroSub}>{animal.nameEn} · <Text style={{ fontStyle: 'italic' }}>{animal.scientific}</Text></Text>
          <View style={styles.heroTags}>
            <View style={styles.whitePill}><Text style={[styles.pillText, { color }]}>{CATEGORIES[animal.category].emoji} {CATEGORIES[animal.category].label}</Text></View>
            <View style={styles.whitePill}>
              <RarityStars rarity={animal.rarity} />
              <Text style={[styles.pillText, { color: RARITIES[animal.rarity].color }]}> {RARITIES[animal.rarity].label}</Text>
            </View>
          </View>
          <Text style={styles.status}>
            {discovered ? `✓ Découvert · ${sightings.length} observation${sightings.length > 1 ? 's' : ''}` : 'Pas encore observé'}
          </Text>
        </View>

        {(animal.dangerous || animal.introduced) && (
          <View style={{ gap: 8 }}>
            {animal.dangerous && (
              <View style={[styles.alert, { backgroundColor: '#FDE8E8', borderColor: '#F5B5B5' }]}>
                <Text style={styles.alertText}>☠️ Espèce dangereuse : observe-la de loin et ne la touche jamais.</Text>
              </View>
            )}
            {animal.introduced && (
              <View style={[styles.alert, { backgroundColor: '#FEF3C7', borderColor: '#F5D88A' }]}>
                <Text style={styles.alertText}>🚨 Espèce introduite : elle menace la faune locale.</Text>
              </View>
            )}
          </View>
        )}

        <Card style={{ gap: 8 }}>
          <Text style={styles.section}>Description</Text>
          <Text style={styles.text}>{animal.description}</Text>
          <Text style={[styles.section, { marginTop: 6 }]}>Le savais-tu ?</Text>
          <Text style={styles.text}>💡 {animal.funFact}</Text>
        </Card>

        <Card style={{ gap: 12 }}>
          <Info label="Habitat" value={animal.habitat} />
          <View style={{ gap: 6 }}>
            <Text style={styles.label}>Statut de conservation (UICN)</Text>
            <View style={styles.consRow}>
              {(Object.keys(CONSERVATION) as (keyof typeof CONSERVATION)[]).map((k) => (
                <View
                  key={k}
                  style={[styles.consCell, { backgroundColor: k === animal.conservation ? CONSERVATION[k].color : '#EEE9DD' }]}
                >
                  <Text style={[styles.consCode, { color: k === animal.conservation ? '#fff' : colors.muted }]}>{k}</Text>
                </View>
              ))}
            </View>
            <Text style={[styles.text, { color: cons.color, fontWeight: '800' }]}>{cons.label}</Text>
          </View>
          <View style={{ gap: 6 }}>
            <Text style={styles.label}>Où l’observer</Text>
            <View style={styles.states}>
              {STATE_ORDER.map((s) => {
                const present = animal.states.includes(s);
                return (
                  <View key={s} style={[styles.stateChip, present ? { backgroundColor: color } : { backgroundColor: '#EEE9DD' }]}>
                    <Text style={[styles.stateText, { color: present ? '#fff' : '#A8A293' }]}>{s}</Text>
                  </View>
                );
              })}
            </View>
            <Text style={styles.small}>{animal.states.map((s) => STATES[s]).join(' · ')}</Text>
          </View>
        </Card>

        {discovered ? (
          <View style={{ gap: 10 }}>
            <Text style={styles.section}>Mes observations</Text>
            {sightings.map((s) => (
              <Card key={s.id} style={styles.sighting}>
                {s.photoUri ? <Image source={{ uri: s.photoUri }} style={styles.thumb} /> : <View style={styles.thumb} />}
                <View style={{ flex: 1, gap: 3 }}>
                  <Text style={styles.text}>🗓️ {formatDate(s.date)}</Text>
                  {(s.place || s.state) && <Text style={styles.small}>📍 {s.place ?? STATES[s.state!]}</Text>}
                  <Text style={styles.small}>{s.method === 'ia' ? '🤖 Identifié par l’IA' : '✍️ Identifié manuellement'}</Text>
                </View>
                <Pressable onPress={() => confirmDelete(s.id)} hitSlop={10} accessibilityLabel="Supprimer l’observation">
                  <Text style={{ fontSize: 18 }}>🗑️</Text>
                </Pressable>
              </Card>
            ))}
          </View>
        ) : (
          <Button title="Je l’ai trouvé ! Observer" icon="📷" onPress={() => router.navigate('/observer')} />
        )}

        <View style={styles.nav}>
          {prev ? (
            <Pressable onPress={() => router.replace(`/animal/${prev.id}`)} style={styles.navBtn}>
              <Text style={styles.navText}>‹ {dexNumber(prev.id)}</Text>
            </Pressable>
          ) : <View />}
          <Text style={styles.small}>{animal.id} / {ANIMALS.length}</Text>
          {next ? (
            <Pressable onPress={() => router.replace(`/animal/${next.id}`)} style={styles.navBtn}>
              <Text style={styles.navText}>{dexNumber(next.id)} ›</Text>
            </Pressable>
          ) : <View />}
        </View>
      </ScrollView>
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ gap: 2 }}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.text}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { padding: 16, gap: 14, maxWidth: 720, width: '100%', alignSelf: 'center', paddingBottom: 40 },
  hero: { borderRadius: radius.lg, padding: 20, alignItems: 'center', gap: 6 },
  avatarRing: { backgroundColor: '#fff', borderRadius: 90, padding: 6 },
  cover: { width: 180, height: 180, borderRadius: 90, borderWidth: 5, borderColor: '#fff' },
  heroNumber: { color: 'rgba(255,255,255,0.85)', fontWeight: '900', marginTop: 6 },
  heroName: { color: '#fff', fontSize: 26, fontWeight: '900', textAlign: 'center' },
  heroSub: { color: 'rgba(255,255,255,0.9)', textAlign: 'center' },
  heroTags: { flexDirection: 'row', gap: 8, marginTop: 6, flexWrap: 'wrap', justifyContent: 'center' },
  whitePill: { backgroundColor: '#fff', borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 4, flexDirection: 'row', alignItems: 'center' },
  pillText: { fontWeight: '800', fontSize: 13 },
  status: { color: '#fff', fontWeight: '800', marginTop: 6 },
  alert: { borderWidth: 1, borderRadius: radius.md, padding: 12 },
  alertText: { color: colors.ink, fontWeight: '700' },
  section: { fontSize: 17, fontWeight: '900', color: colors.ink },
  text: { fontSize: 15, color: colors.ink, lineHeight: 21 },
  label: { fontSize: 12, fontWeight: '800', color: colors.muted, textTransform: 'uppercase', letterSpacing: 0.5 },
  small: { fontSize: 12, color: colors.muted },
  consRow: { flexDirection: 'row', gap: 4 },
  consCell: { flex: 1, paddingVertical: 6, borderRadius: 6, alignItems: 'center' },
  consCode: { fontWeight: '900', fontSize: 12 },
  states: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  stateChip: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: radius.pill },
  stateText: { fontWeight: '800', fontSize: 12 },
  sighting: { flexDirection: 'row', gap: 12, alignItems: 'center', padding: 10 },
  thumb: { width: 64, height: 64, borderRadius: radius.sm, backgroundColor: '#EEE9DD' },
  nav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  navBtn: { backgroundColor: colors.card, paddingHorizontal: 14, paddingVertical: 10, borderRadius: radius.md },
  navText: { fontWeight: '800', color: colors.ink },
});
