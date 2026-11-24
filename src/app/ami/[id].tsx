import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, radius } from '../../components/theme';
import { AnimalAvatar, Button, Card, ProgressBar } from '../../components/ui';
import { ANIMALS, dexNumber, getAnimal } from '../../data/animals';
import { hidesLocation } from '../../data/conservation';
import { useI18n } from '../../i18n';
import { formatDate } from '../../lib/format';
import { getFriend, type FriendDetail } from '../../lib/friends';
import { useFriends } from '../../lib/friendsStore';
import { BADGES, LEVEL_THRESHOLDS, rankName } from '../../lib/progress';
import { useDex } from '../../lib/store';

export default function FriendScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { s, lang } = useI18n();
  const { progress } = useDex();
  const { removeFriend, friends } = useFriends();
  const [entry, setEntry] = useState<{ key: string; data: FriendDetail | null } | null>(null);

  useEffect(() => {
    let alive = true;
    getFriend(id)
      .then((data) => alive && setEntry({ key: id, data }))
      .catch(() => alive && setEntry({ key: id, data: null }));
    return () => {
      alive = false;
    };
  }, [id]);

  const summary = friends.find((x) => x.id === id);
  const title = entry?.data?.pseudo ?? summary?.pseudo ?? s.screens.friend;

  if (!entry || entry.key !== id) {
    return (
      <View style={styles.center}>
        <Stack.Screen options={{ title }} />
        <ActivityIndicator color={colors.red} />
      </View>
    );
  }
  const f = entry.data;
  if (!f) {
    return (
      <ScrollView contentContainerStyle={styles.page}>
        <Stack.Screen options={{ title }} />
        <Card><Text style={styles.text}>{s.friends.notFound}</Text></Card>
      </ScrollView>
    );
  }

  const discovered = new Set(f.discovered);
  const inCommon = [...discovered].filter((x) => progress.discovered.has(x)).length;
  const badges = BADGES.filter((b) => f.badges.includes(b.id));
  const next = LEVEL_THRESHOLDS[f.level] ?? null;
  const start = LEVEL_THRESHOLDS[f.level - 1] ?? 0;
  const animals = ANIMALS.filter((a) => discovered.has(a.id));

  function confirmRemove() {
    const go = () => void removeFriend(f!.id).then(() => router.back()).catch(() => undefined);
    if (Platform.OS === 'web') {
      if (window.confirm(`${s.friends.removeTitle(f!.pseudo)}\n${s.friends.removeText}`)) go();
      return;
    }
    Alert.alert(s.friends.removeTitle(f!.pseudo), s.friends.removeText, [
      { text: s.friends.cancel, style: 'cancel' },
      { text: s.friends.confirm, style: 'destructive', onPress: go },
    ]);
  }

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Stack.Screen options={{ title }} />

      <View style={styles.hero}>
        <View style={styles.avatar}><Text style={styles.avatarText}>{f.pseudo.slice(0, 1).toUpperCase()}</Text></View>
        <Text style={styles.heroName} numberOfLines={2}>{f.pseudo}</Text>
        <Text style={styles.heroRank}>{s.friends.levelShort(f.level)} · {rankName(s, f.level)}</Text>
        <View style={{ width: '100%', gap: 4 }}>
          <ProgressBar value={next ? (f.xp - start) / (next - start) : 1} color={colors.gold} track="rgba(255,255,255,0.25)" />
          <Text style={styles.heroSmall}>{s.friends.xp(f.xp)}</Text>
        </View>
        {f.updated_at && <Text style={styles.heroSmall}>{s.friends.updated(formatDate(f.updated_at, s))}</Text>}
      </View>

      <Card style={{ gap: 8 }}>
        <Text style={styles.section}>{s.friends.speciesTitle(discovered.size, ANIMALS.length)}</Text>
        <ProgressBar value={discovered.size / ANIMALS.length} />
        <Text style={styles.note}>{s.friends.inCommon(inCommon)}</Text>
        <View style={styles.grid}>
          {animals.map((a) => (
            <Pressable key={a.id} onPress={() => router.push(`/animal/${a.id}`)} style={styles.cell} accessibilityLabel={a.name[lang]}>
              <AnimalAvatar animal={a} discovered size={44} />
              <Text style={styles.cellText} numberOfLines={2}>{a.name[lang]}</Text>
            </Pressable>
          ))}
        </View>
      </Card>

      <Card style={{ gap: 8 }}>
        <Text style={styles.section}>{s.friends.badgesTitle(badges.length, BADGES.length)}</Text>
        <View style={styles.badges}>
          {badges.map((b) => (
            <View key={b.id} style={styles.badge}>
              <View style={[styles.medal, { backgroundColor: b.color }]}><Text style={{ fontSize: 20 }}>{b.emoji}</Text></View>
              <Text style={styles.cellText} numberOfLines={2}>{b.text(s).title}</Text>
            </View>
          ))}
        </View>
      </Card>

      <Card style={{ gap: 8 }}>
        <Text style={styles.section}>{s.friends.recentTitle}</Text>
        {f.sightings.length === 0 && <Text style={styles.note}>{s.friends.noRecent}</Text>}
        {f.sightings.map((x, i) => {
          const a = getAnimal(x.animal_id);
          if (!a) return null;
          // Double sécurité : même si le serveur renvoyait un État, on ne l'affiche pas pour une espèce menacée.
          const where = hidesLocation(a) ? s.friends.locationHidden : x.state ? `📍 ${s.states[x.state]}` : s.friends.noLocation;
          return (
            <View key={`${x.animal_id}-${x.observed_on}-${i}`} style={styles.sighting}>
              <AnimalAvatar animal={a} discovered size={36} />
              <View style={{ flex: 1 }}>
                <Text style={styles.text} numberOfLines={1}>{dexNumber(a.id)} {a.name[lang]}</Text>
                <Text style={styles.note}>🗓️ {formatDate(x.observed_on, s)} · {where}</Text>
              </View>
            </View>
          );
        })}
      </Card>

      <Button title={s.friends.removeFriend} variant="ghost" onPress={confirmRemove} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { padding: 16, gap: 14, maxWidth: 720, width: '100%', alignSelf: 'center', paddingBottom: 40 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  hero: { backgroundColor: colors.ink, borderRadius: radius.lg, padding: 18, alignItems: 'center', gap: 6 },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: colors.red, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: colors.gold },
  avatarText: { color: '#fff', fontWeight: '900', fontSize: 28 },
  heroName: { color: '#fff', fontSize: 22, fontWeight: '900', textAlign: 'center' },
  heroRank: { color: colors.gold, fontWeight: '800' },
  heroSmall: { color: 'rgba(255,255,255,0.75)', fontSize: 12, textAlign: 'center' },
  section: { fontSize: 16, fontWeight: '900', color: colors.ink },
  text: { fontSize: 14, color: colors.ink, lineHeight: 20 },
  note: { fontSize: 12, color: colors.muted, lineHeight: 17 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  cell: { width: 72, alignItems: 'center', gap: 4 },
  cellText: { fontSize: 10, textAlign: 'center', color: colors.ink, fontWeight: '600' },
  badges: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  badge: { width: 76, alignItems: 'center', gap: 4 },
  medal: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  sighting: { flexDirection: 'row', alignItems: 'center', gap: 10 },
});
