import { Stack, router, useLocalSearchParams } from 'expo-router';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, radius } from '../../components/theme';
import { ConservationCard } from '../../components/ConservationCard';
import { AnimalAvatar, Button, Card, RarityStars, StoredImage } from '../../components/ui';
import { ANIMALS, dexNumber, getAnimal } from '../../data/animals';
import { CATEGORIES, RARITIES, STATE_ORDER } from '../../data/meta';
import { useI18n } from '../../i18n';
import { formatDate, placeLabel } from '../../lib/format';
import { useDex } from '../../lib/store';

// Export web statique : une page HTML est générée pour chaque espèce.
export function generateStaticParams(): { id: string }[] {
  return ANIMALS.map((a) => ({ id: String(a.id) }));
}

export default function AnimalScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const animal = getAnimal(Number(id));
  const { progress, removeSighting } = useDex();
  const { s, lang } = useI18n();

  if (!animal) {
    return (
      <View style={{ padding: 24 }}>
        <Text>{s.animal.notFound}</Text>
      </View>
    );
  }

  const discovered = progress.discovered.has(animal.id);
  const sightings = [...(progress.sightingsByAnimal.get(animal.id) ?? [])].reverse();
  const cover = sightings.find((x) => x.photoUri)?.photoUri;
  const color = CATEGORIES[animal.category].color;
  const prev = getAnimal(animal.id - 1);
  const next = getAnimal(animal.id + 1);

  function confirmDelete(sightingId: string) {
    const doDelete = () => void removeSighting(sightingId);
    if (Platform.OS === 'web') {
      if (window.confirm(`${s.animal.deleteTitle}\n${s.animal.deleteText}`)) doDelete();
      return;
    }
    Alert.alert(s.animal.deleteTitle, s.animal.deleteText, [
      { text: s.animal.cancel, style: 'cancel' },
      { text: s.animal.delete, style: 'destructive', onPress: doDelete },
    ]);
  }

  return (
    <>
      <Stack.Screen options={{ title: `${dexNumber(animal.id)}  ${animal.name[lang]}`, headerStyle: { backgroundColor: color } }} />
      <ScrollView contentContainerStyle={styles.page}>
        <View style={[styles.hero, { backgroundColor: color }]}>
          {discovered && cover ? (
            <StoredImage uri={cover} style={styles.cover} />
          ) : (
            <View style={styles.avatarRing}>
              <AnimalAvatar animal={animal} discovered={discovered} size={150} />
            </View>
          )}
          <Text style={styles.heroNumber}>{dexNumber(animal.id)}</Text>
          <Text style={styles.heroName}>{animal.name[lang]}</Text>
          <Text style={[styles.heroSub, { fontStyle: 'italic' }]}>{animal.scientific}</Text>
          <View style={styles.heroTags}>
            <View style={styles.whitePill}><Text style={[styles.pillText, { color }]}>{CATEGORIES[animal.category].emoji} {s.categories[animal.category].label}</Text></View>
            <View style={styles.whitePill}>
              <RarityStars rarity={animal.rarity} />
              <Text style={[styles.pillText, { color: RARITIES[animal.rarity].color }]}> {s.rarities[animal.rarity]}</Text>
            </View>
          </View>
          <Text style={styles.status}>
            {discovered ? s.animal.discovered(sightings.length) : s.animal.notSeen}
          </Text>
        </View>

        {(animal.dangerous || animal.introduced) && (
          <View style={{ gap: 8 }}>
            {animal.dangerous && (
              <View style={[styles.alert, { backgroundColor: '#FDE8E8', borderColor: '#F5B5B5' }]}>
                <Text style={styles.alertText}>{s.animal.dangerous}</Text>
              </View>
            )}
            {animal.introduced && (
              <View style={[styles.alert, { backgroundColor: '#FEF3C7', borderColor: '#F5D88A' }]}>
                <Text style={styles.alertText}>{s.animal.introduced}</Text>
              </View>
            )}
          </View>
        )}

        <Card style={{ gap: 8 }}>
          <Text style={styles.section}>{s.animal.description}</Text>
          <Text style={styles.text}>{animal.description[lang]}</Text>
          <Text style={[styles.section, { marginTop: 6 }]}>{s.animal.didYouKnow}</Text>
          <Text style={styles.text}>💡 {animal.funFact[lang]}</Text>
        </Card>

        <Card style={{ gap: 12 }}>
          <Info label={s.animal.habitat} value={animal.habitat[lang]} />
          <View style={{ gap: 6 }}>
            <Text style={styles.label}>{s.animal.whereToSee}</Text>
            <View style={styles.states}>
              {STATE_ORDER.map((code) => {
                const present = animal.states.includes(code);
                return (
                  <View key={code} style={[styles.stateChip, present ? { backgroundColor: color } : { backgroundColor: '#EEE9DD' }]}>
                    <Text style={[styles.stateText, { color: present ? '#fff' : '#A8A293' }]}>{code}</Text>
                  </View>
                );
              })}
            </View>
            <Text style={styles.small}>{STATE_ORDER.filter((code) => animal.states.includes(code)).map((code) => s.states[code]).join(' · ')}</Text>
          </View>
        </Card>

        <ConservationCard animal={animal} />

        {discovered ? (
          <View style={{ gap: 10 }}>
            <Text style={styles.section}>{s.animal.mySightings}</Text>
            {sightings.map((sg) => {
              const where = placeLabel(sg, s);
              return (
              <Card key={sg.id} style={styles.sighting}>
                <StoredImage uri={sg.photoUri} style={styles.thumb} />
                <View style={{ flex: 1, gap: 3 }}>
                  <Text style={styles.text}>🗓️ {formatDate(sg.date, s)}</Text>
                  {where && <Text style={styles.small}>📍 {where}</Text>}
                  <Text style={styles.small}>
                    {sg.method === 'ia'
                      ? s.method.ai(sg.confidence != null ? Math.round(sg.confidence * 100) : undefined)
                      : s.method.manual}
                  </Text>
                </View>
                <Pressable onPress={() => confirmDelete(sg.id)} hitSlop={10} accessibilityLabel={s.a11y.deleteSighting}>
                  <Text style={{ fontSize: 18 }}>🗑️</Text>
                </Pressable>
              </Card>
              );
            })}
          </View>
        ) : (
          <Button title={s.animal.foundIt} icon="📷" onPress={() => router.navigate('/observer')} />
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
  states: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  stateChip: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: radius.pill },
  stateText: { fontWeight: '800', fontSize: 12 },
  sighting: { flexDirection: 'row', gap: 12, alignItems: 'center', padding: 10 },
  thumb: { width: 64, height: 64, borderRadius: radius.sm, backgroundColor: '#EEE9DD' },
  nav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  navBtn: { backgroundColor: colors.card, paddingHorizontal: 14, paddingVertical: 10, borderRadius: radius.md },
  navText: { fontWeight: '800', color: colors.ink },
});
