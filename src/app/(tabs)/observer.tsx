import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
  AccessibilityInfo, ActivityIndicator, Animated, Easing, FlatList, Image, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius } from '../../components/theme';
import { AnimalAvatar, Button, Card, ProgressBar, RarityStars, TypeBadge } from '../../components/ui';
import { ANIMALS, dexNumber } from '../../data/animals';
import { CATEGORIES, RARITIES } from '../../data/meta';
import type { Animal, Lang, Sighting, StateCode } from '../../data/types';
import { useI18n, type Strings } from '../../i18n';
import { CaptureError, getCurrentPlace, pickPhoto, type PreparedPhoto } from '../../lib/capture';
import { identifyAnimal, identifyErrorMessage, type IdentifyResult } from '../../lib/identify';
import { persistPhoto } from '../../lib/photoStore';
import { rankName } from '../../lib/progress';
import { useDex, type AddResult } from '../../lib/store';

// Les erreurs sont gardées telles quelles (et non en texte) pour être traduites à l'affichage :
// changer de langue met donc aussi le message à jour.
type Phase =
  | { kind: 'idle' }
  | { kind: 'analyzing'; photo: PreparedPhoto }
  | { kind: 'results'; photo: PreparedPhoto; result: IdentifyResult | null; error?: unknown }
  | { kind: 'saving'; photo: PreparedPhoto }
  | { kind: 'done'; animal: Animal; reward: AddResult; photoUri: string | null; place?: string; state?: StateCode };

function makeId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function captureErrorMessage(error: unknown, s: Strings): string {
  return error instanceof CaptureError ? s.errors[error.code] : s.errors.openPhoto;
}

export default function ObserverScreen() {
  const { apiKey, settings, addSighting, progress } = useDex();
  const { s, lang } = useI18n();
  const [phase, setPhase] = useState<Phase>({ kind: 'idle' });
  const [pickerOpen, setPickerOpen] = useState(false);
  const [startError, setStartError] = useState<unknown>(null);

  async function start(source: 'camera' | 'library') {
    setStartError(null);
    try {
      const photo = await pickPhoto(source);
      if (!photo) return;
      if (apiKey && settings.autoIdentify) {
        await analyze(photo);
      } else {
        setPhase({ kind: 'results', photo, result: null });
      }
    } catch (e) {
      setStartError(e ?? new Error('unknown'));
    }
  }

  async function analyze(photo: PreparedPhoto) {
    setPhase({ kind: 'analyzing', photo });
    try {
      const result = await identifyAnimal(apiKey, photo.base64, s);
      setPhase({ kind: 'results', photo, result });
    } catch (e) {
      setPhase({ kind: 'results', photo, result: null, error: e ?? new Error('unknown') });
    }
  }

  async function confirm(animal: Animal, method: Sighting['method'], confidence?: number) {
    if (phase.kind !== 'results') return;
    const photo = phase.photo;
    setPickerOpen(false);
    setPhase({ kind: 'saving', photo });
    const id = makeId();
    const [photoUri, place] = await Promise.all([
      persistPhoto(photo.uri, id, photo.base64).catch(() => null),
      settings.saveLocation ? getCurrentPlace() : Promise.resolve(null),
    ]);
    const reward = await addSighting({
      id,
      animalId: animal.id,
      photoUri,
      date: new Date().toISOString(),
      method,
      confidence,
      latitude: place?.latitude,
      longitude: place?.longitude,
      place: place?.place,
      state: place?.state,
    });
    if (Platform.OS !== 'web') {
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    setPhase({ kind: 'done', animal, reward, photoUri, place: place?.place, state: place?.state });
  }

  // ───────── Rendu ─────────

  if (phase.kind === 'done') {
    return <Reward phase={phase} onAgain={() => setPhase({ kind: 'idle' })} />;
  }

  if (phase.kind === 'idle') {
    return (
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.lens}>
          <View style={styles.lensInner}>
            <Text style={{ fontSize: 64 }}>🦘</Text>
          </View>
        </View>
        <Text style={styles.title}>{s.observe.title}</Text>
        <Text style={styles.subtitle}>{s.observe.subtitle}</Text>
        <View style={{ gap: 10, width: '100%' }}>
          <Button title={s.observe.takePhoto} icon="📷" onPress={() => start('camera')} />
          <Button title={s.observe.importPhoto} icon="🖼️" variant="secondary" onPress={() => start('library')} />
        </View>
        {startError != null && <Text style={styles.error}>{captureErrorMessage(startError, s)}</Text>}
        {!apiKey && (
          <Card style={{ width: '100%', gap: 8 }}>
            <Text style={styles.cardTitle}>{s.observe.aiTitle}</Text>
            <Text style={styles.text}>{s.observe.aiText}</Text>
            <Button title={s.observe.openSettings} variant="ghost" onPress={() => router.push('/reglages')} />
          </Card>
        )}
        <Card style={{ width: '100%', gap: 6 }}>
          <Text style={styles.cardTitle}>{s.observe.tipsTitle}</Text>
          {s.observe.tips.map((tip) => (
            <Text key={tip} style={styles.text}>• {tip}</Text>
          ))}
        </Card>
        <Text style={styles.footnote}>{s.observe.footnote(progress.discovered.size, ANIMALS.length)}</Text>
      </ScrollView>
    );
  }

  const photo = phase.photo;
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Image source={{ uri: photo.uri }} style={styles.preview} resizeMode="cover" />

      {phase.kind === 'analyzing' && (
        <Card style={styles.analyzing}>
          <ActivityIndicator color={colors.red} size="large" />
          <Text style={styles.cardTitle}>{s.observe.analyzing}</Text>
          <Text style={styles.text}>{s.observe.analyzingText(ANIMALS.length)}</Text>
        </Card>
      )}

      {phase.kind === 'saving' && (
        <Card style={styles.analyzing}>
          <ActivityIndicator color={colors.red} size="large" />
          <Text style={styles.cardTitle}>{s.observe.saving}</Text>
        </Card>
      )}

      {phase.kind === 'results' && (
        <View style={{ width: '100%', gap: 12 }}>
          {phase.error != null && <Text style={styles.error}>{identifyErrorMessage(phase.error, s)}</Text>}
          {phase.result && <ResultSummary result={phase.result} />}
          {phase.result?.candidates.map((c, i) => (
            <CandidateRow
              key={c.animal.id}
              animal={c.animal}
              confidence={c.confidence}
              best={i === 0}
              discovered={progress.discovered.has(c.animal.id)}
              onConfirm={() => confirm(c.animal, 'ia', c.confidence)}
            />
          ))}
          {!phase.result && phase.error == null && <Text style={styles.text}>{s.observe.whichSpecies}</Text>}
          <Button
            title={phase.result?.candidates.length ? s.observe.pickOther : s.observe.pickFromList}
            icon="📖"
            variant={phase.result?.candidates.length ? 'secondary' : 'primary'}
            onPress={() => setPickerOpen(true)}
          />
          {apiKey && !phase.result && (
            <Button title={s.observe.retry} icon="🤖" variant="secondary" onPress={() => analyze(photo)} />
          )}
          <Button title={s.observe.cancel} variant="ghost" onPress={() => setPhase({ kind: 'idle' })} />
        </View>
      )}

      <SpeciesPicker
        visible={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onPick={(a) => confirm(a, 'manuel')}
        discovered={progress.discovered}
        lang={lang}
      />
    </ScrollView>
  );
}

function ResultSummary({ result }: { result: IdentifyResult }) {
  const { s } = useI18n();
  let headline = s.observe.resultFound;
  if (!result.containsAnimal) headline = s.observe.noAnimal;
  else if (!result.candidates.length) {
    headline = result.outsideDex ? s.observe.outsideDex(result.outsideDex) : s.observe.unknown;
  }
  return (
    <Card style={{ gap: 6 }}>
      <Text style={styles.cardTitle}>{headline}</Text>
      {!!result.comment && <Text style={styles.text}>{result.comment}</Text>}
    </Card>
  );
}

function CandidateRow({ animal, confidence, best, discovered, onConfirm }: {
  animal: Animal; confidence: number; best: boolean; discovered: boolean; onConfirm: () => void;
}) {
  const { s, lang } = useI18n();
  const pct = Math.round(confidence * 100);
  const color = CATEGORIES[animal.category].color;
  return (
    <Card style={[{ gap: 10 }, best && { borderWidth: 2, borderColor: color }]}>
      <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
        <AnimalAvatar animal={animal} discovered size={56} />
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={styles.muted}>
            {dexNumber(animal.id)} · {discovered ? s.observe.alreadyFound : s.observe.newSpecies}
          </Text>
          <Text style={styles.candidateName}>{animal.name[lang]}</Text>
          <Text style={styles.scientific}>{animal.scientific}</Text>
        </View>
        <Text style={[styles.pct, { color }]}>{pct}%</Text>
      </View>
      <ProgressBar value={confidence} color={color} height={6} />
      <Button title={best ? s.observe.itsThisOne : s.observe.ratherThis} variant={best ? 'primary' : 'secondary'} onPress={onConfirm} />
    </Card>
  );
}

function SpeciesPicker({ visible, onClose, onPick, discovered, lang }: {
  visible: boolean; onClose: () => void; onPick: (a: Animal) => void; discovered: Set<number>; lang: Lang;
}) {
  const { s } = useI18n();
  const [q, setQ] = useState('');
  const list = useMemo(() => {
    const n = (v: string) => v.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    const query = n(q.trim());
    const filtered = query
      ? ANIMALS.filter((a) => [...Object.values(a.name), a.scientific].some((v) => n(v).includes(query)))
      : ANIMALS;
    return [...filtered].sort((a, b) => a.name[lang].localeCompare(b.name[lang], lang));
  }, [q, lang]);
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose} presentationStyle="pageSheet">
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
        <View style={styles.pickerHeader}>
          <Text style={styles.pickerTitle}>{s.observe.pickerTitle}</Text>
          <Pressable onPress={onClose} hitSlop={12}><Text style={styles.close}>{s.observe.close}</Text></Pressable>
        </View>
        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder={s.observe.pickerSearch}
          placeholderTextColor={colors.muted}
          style={styles.search}
          autoFocus
          autoCorrect={false}
        />
        <FlatList
          data={list}
          keyExtractor={(a) => String(a.id)}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ padding: 16, gap: 8 }}
          renderItem={({ item }) => (
            <Pressable onPress={() => onPick(item)} style={({ pressed }) => [styles.pickRow, pressed && { opacity: 0.7 }]}>
              <AnimalAvatar animal={item} discovered size={44} />
              <View style={{ flex: 1 }}>
                <Text style={styles.candidateName}>{item.name[lang]}</Text>
                <Text style={styles.scientific}>{item.scientific}</Text>
              </View>
              {discovered.has(item.id) ? <Text style={styles.muted}>✓</Text> : <RarityStars rarity={item.rarity} />}
            </Pressable>
          )}
        />
      </SafeAreaView>
    </Modal>
  );
}

/**
 * Animation de déblocage : la silhouette sombre se colore, puis les infos de la fiche
 * apparaissent une à une. Respecte le réglage système « réduire les animations ».
 */
function useReveal(enabled: boolean) {
  const [avatar] = useState(() => new Animated.Value(enabled ? 0 : 1));
  const [info] = useState(() => new Animated.Value(enabled ? 0 : 1));
  useEffect(() => {
    if (!enabled) return;
    const nativeDriver = Platform.OS !== 'web';
    let cancelled = false;
    AccessibilityInfo.isReduceMotionEnabled()
      .catch(() => false)
      .then((reduce) => {
        if (cancelled) return;
        if (reduce) {
          avatar.setValue(1);
          info.setValue(1);
          return;
        }
        Animated.sequence([
          Animated.delay(400),
          Animated.timing(avatar, { toValue: 1, duration: 900, easing: Easing.out(Easing.cubic), useNativeDriver: nativeDriver }),
          Animated.timing(info, { toValue: 1, duration: 900, easing: Easing.out(Easing.quad), useNativeDriver: nativeDriver }),
        ]).start();
      });
    return () => { cancelled = true; };
  }, [enabled, avatar, info]);
  return { avatar, info };
}

/** Style d'apparition décalé : l'élément n°index (0…count-1) glisse et apparaît à son tour. */
function appear(info: Animated.Value, index: number, count: number) {
  const from = index / (count + 1);
  const to = Math.min(1, from + 2 / (count + 1));
  return {
    opacity: info.interpolate({ inputRange: [from, to], outputRange: [0, 1], extrapolate: 'clamp' }),
    transform: [{ translateY: info.interpolate({ inputRange: [from, to], outputRange: [12, 0], extrapolate: 'clamp' }) }],
  };
}

function RevealAvatar({ animal, photoUri, progress }: { animal: Animal; photoUri: string | null; progress: Animated.Value }) {
  const scale = progress.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1, 1.12, 1] });
  return (
    <Animated.View style={{ width: 150, height: 150, transform: [{ scale }] }}>
      <View style={StyleSheet.absoluteFill}>
        <AnimalAvatar animal={animal} discovered={false} size={150} />
      </View>
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: progress }]}>
        <AnimalAvatar animal={animal} discovered photoUri={photoUri} size={150} />
      </Animated.View>
    </Animated.View>
  );
}

function Reward({ phase, onAgain }: { phase: Extract<Phase, { kind: 'done' }>; onAgain: () => void }) {
  const { s, lang } = useI18n();
  const { animal, reward, place, state, photoUri } = phase;
  const color = CATEGORIES[animal.category].color;
  const where = place ?? (state ? s.states[state] : undefined);
  const { avatar, info } = useReveal(reward.isNew);
  const N = 5;
  return (
    <ScrollView contentContainerStyle={[styles.page, { paddingTop: 32 }]}>
      <Text style={styles.rewardKicker}>{reward.isNew ? s.observe.rewardNew : s.observe.rewardRepeat}</Text>
      <RevealAvatar animal={animal} photoUri={photoUri} progress={avatar} />
      <Text style={styles.muted}>{dexNumber(animal.id)}</Text>
      <Text style={styles.title}>{animal.name[lang]}</Text>
      {reward.isNew && (
        <Animated.View style={[styles.unlockedBadge, appear(info, 0, N)]}>
          <Text style={styles.unlockedText}>🔓 {s.locked.unlocked}</Text>
        </Animated.View>
      )}
      <Animated.View style={[{ flexDirection: 'row', gap: 8, alignItems: 'center' }, appear(info, 1, N)]}>
        <TypeBadge category={animal.category} />
        <Text style={[styles.rarity, { color: RARITIES[animal.rarity].color }]}>{s.rarities[animal.rarity]}</Text>
      </Animated.View>
      {where && <Animated.Text style={[styles.muted, appear(info, 2, N)]}>📍 {where}</Animated.Text>}
      <Animated.View style={[styles.xp, { backgroundColor: color }, appear(info, 2, N)]}>
        <Text style={styles.xpText}>+{reward.xpGained} XP</Text>
      </Animated.View>
      {reward.levelUp && (
        <Card style={{ width: '100%', alignItems: 'center', gap: 4 }}>
          <Text style={{ fontSize: 28 }}>🎉</Text>
          <Text style={styles.cardTitle}>{s.observe.levelReached(reward.level)}</Text>
          <Text style={styles.text}>{s.observe.nowRank(rankName(s, reward.level))}</Text>
        </Card>
      )}
      {reward.newBadges.map((b) => (
        <Card key={b.id} style={{ width: '100%', flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          <View style={[styles.badgeIcon, { backgroundColor: b.color }]}><Text style={{ fontSize: 24 }}>{b.emoji}</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.muted}>{s.observe.badgeUnlocked}</Text>
            <Text style={styles.cardTitle}>{b.text(s).title}</Text>
          </View>
        </Card>
      ))}
      <Animated.View style={[{ width: '100%' }, appear(info, 3, N)]}>
        <Card style={{ gap: 4 }}>
          <Text style={styles.cardTitle}>{s.observe.didYouKnow}</Text>
          <Text style={styles.text}>{animal.funFact[lang]}</Text>
        </Card>
      </Animated.View>
      <View style={{ gap: 10, width: '100%' }}>
        <Button title={s.observe.seeEntry} icon="📖" onPress={() => router.push(`/animal/${animal.id}`)} />
        <Button title={s.observe.newObservation} icon="📷" variant="secondary" onPress={onAgain} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { padding: 20, gap: 16, alignItems: 'center', maxWidth: 640, width: '100%', alignSelf: 'center', paddingBottom: 40 },
  lens: {
    width: 170, height: 170, borderRadius: 85, backgroundColor: colors.red, alignItems: 'center', justifyContent: 'center',
    borderWidth: 8, borderColor: '#fff', marginTop: 8,
    shadowColor: colors.red, shadowOpacity: 0.35, shadowRadius: 18, shadowOffset: { width: 0, height: 6 }, elevation: 6,
  },
  lensInner: {
    width: 120, height: 120, borderRadius: 60, backgroundColor: '#7DD3FC', alignItems: 'center', justifyContent: 'center',
    borderWidth: 6, borderColor: colors.redDark,
  },
  title: { fontSize: 26, fontWeight: '900', color: colors.ink, textAlign: 'center' },
  subtitle: { fontSize: 15, color: colors.muted, textAlign: 'center', lineHeight: 21 },
  cardTitle: { fontSize: 16, fontWeight: '800', color: colors.ink },
  text: { fontSize: 14, color: colors.ink, lineHeight: 20 },
  muted: { fontSize: 13, color: colors.muted, fontWeight: '600' },
  footnote: { color: colors.muted, fontSize: 12 },
  error: { color: colors.redDark, fontWeight: '700', textAlign: 'center' },
  preview: { width: '100%', aspectRatio: 4 / 3, borderRadius: radius.lg, backgroundColor: colors.locked },
  analyzing: { width: '100%', alignItems: 'center', gap: 8 },
  candidateName: { fontSize: 16, fontWeight: '800', color: colors.ink },
  scientific: { fontSize: 13, fontStyle: 'italic', color: colors.muted },
  pct: { fontSize: 22, fontWeight: '900' },
  pickerHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  pickerTitle: { fontSize: 20, fontWeight: '900', color: colors.ink },
  close: { color: colors.red, fontWeight: '800', fontSize: 16 },
  search: {
    backgroundColor: colors.card, borderRadius: radius.md, paddingHorizontal: 14, paddingVertical: 12, marginHorizontal: 16,
    fontSize: 15, color: colors.ink, borderWidth: 1, borderColor: colors.line,
  },
  pickRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.card, padding: 10, borderRadius: radius.md,
  },
  unlockedBadge: { backgroundColor: colors.gold, borderRadius: radius.pill, paddingHorizontal: 14, paddingVertical: 6 },
  unlockedText: { color: colors.ink, fontWeight: '900', letterSpacing: 1 },
  rewardKicker: { color: colors.red, fontWeight: '900', letterSpacing: 2, fontSize: 15 },
  rarity: { fontWeight: '800' },
  xp: { paddingHorizontal: 22, paddingVertical: 10, borderRadius: radius.pill },
  xpText: { color: '#fff', fontSize: 22, fontWeight: '900' },
  badgeIcon: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
});
