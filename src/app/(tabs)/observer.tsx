import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  ActivityIndicator, FlatList, Image, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius } from '../../components/theme';
import { AnimalAvatar, Button, Card, ProgressBar, RarityStars, TypeBadge } from '../../components/ui';
import { ANIMALS, dexNumber } from '../../data/animals';
import { CATEGORIES, RARITIES, STATES } from '../../data/meta';
import type { Animal, Sighting } from '../../data/types';
import { getCurrentPlace, pickPhoto, type PreparedPhoto } from '../../lib/capture';
import { identifyAnimal, IdentifyError, type IdentifyResult } from '../../lib/identify';
import { persistPhoto } from '../../lib/storage';
import { useDex, type AddResult } from '../../lib/store';

type Phase =
  | { kind: 'idle' }
  | { kind: 'analyzing'; photo: PreparedPhoto }
  | { kind: 'results'; photo: PreparedPhoto; result: IdentifyResult | null; error?: string }
  | { kind: 'saving'; photo: PreparedPhoto }
  | { kind: 'done'; animal: Animal; reward: AddResult; photoUri: string | null; place?: string };

function makeId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function ObserverScreen() {
  const { apiKey, settings, addSighting, progress } = useDex();
  const [phase, setPhase] = useState<Phase>({ kind: 'idle' });
  const [pickerOpen, setPickerOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function start(source: 'camera' | 'library') {
    setError(null);
    try {
      const photo = await pickPhoto(source);
      if (!photo) return;
      if (apiKey && settings.autoIdentify) {
        await analyze(photo);
      } else {
        setPhase({ kind: 'results', photo, result: null });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Impossible d’ouvrir la photo.');
    }
  }

  async function analyze(photo: PreparedPhoto) {
    setPhase({ kind: 'analyzing', photo });
    try {
      const result = await identifyAnimal(apiKey, photo.base64);
      setPhase({ kind: 'results', photo, result });
    } catch (e) {
      const message = e instanceof IdentifyError ? e.message : 'L’identification a échoué. Choisis l’espèce manuellement.';
      setPhase({ kind: 'results', photo, result: null, error: message });
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
    setPhase({ kind: 'done', animal, reward, photoUri, place: place?.place ?? (place?.state ? STATES[place.state] : undefined) });
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
        <Text style={styles.title}>Pars à la découverte !</Text>
        <Text style={styles.subtitle}>
          Photographie un animal australien : l’Anidex l’identifie et l’ajoute à ta collection.
        </Text>
        <View style={{ gap: 10, width: '100%' }}>
          <Button title="Prendre une photo" icon="📷" onPress={() => start('camera')} />
          <Button title="Importer depuis la galerie" icon="🖼️" variant="secondary" onPress={() => start('library')} />
        </View>
        {error && <Text style={styles.error}>{error}</Text>}
        {!apiKey && (
          <Card style={{ width: '100%', gap: 8 }}>
            <Text style={styles.cardTitle}>🤖 Identification automatique</Text>
            <Text style={styles.text}>
              Ajoute ta clé API Claude dans les réglages pour que l’app reconnaisse les animaux toute seule.
              Sans clé, tu choisis l’espèce dans la liste.
            </Text>
            <Button title="Ouvrir les réglages" variant="ghost" onPress={() => router.push('/reglages')} />
          </Card>
        )}
        <Card style={{ width: '100%', gap: 6 }}>
          <Text style={styles.cardTitle}>Conseils de ranger</Text>
          <Text style={styles.text}>• Garde tes distances : serpents, crocodiles et araignées se photographient de loin.</Text>
          <Text style={styles.text}>• Ne nourris pas les animaux sauvages.</Text>
          <Text style={styles.text}>• Cadre l’animal en entier, bien net et éclairé.</Text>
          <Text style={styles.text}>• Les espèces rares rapportent plus d’XP !</Text>
        </Card>
        <Text style={styles.footnote}>{progress.discovered.size} / {ANIMALS.length} espèces découvertes</Text>
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
          <Text style={styles.cardTitle}>Analyse en cours…</Text>
          <Text style={styles.text}>L’Anidex compare ta photo aux {ANIMALS.length} espèces du catalogue.</Text>
        </Card>
      )}

      {phase.kind === 'saving' && (
        <Card style={styles.analyzing}>
          <ActivityIndicator color={colors.red} size="large" />
          <Text style={styles.cardTitle}>Enregistrement…</Text>
        </Card>
      )}

      {phase.kind === 'results' && (
        <View style={{ width: '100%', gap: 12 }}>
          {phase.error && <Text style={styles.error}>{phase.error}</Text>}
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
          {!phase.result && !phase.error && (
            <Text style={styles.text}>Quelle espèce as-tu photographiée ?</Text>
          )}
          <Button
            title={phase.result?.candidates.length ? 'Autre espèce : choisir dans la liste' : 'Choisir l’espèce dans la liste'}
            icon="📖"
            variant={phase.result?.candidates.length ? 'secondary' : 'primary'}
            onPress={() => setPickerOpen(true)}
          />
          {apiKey && !phase.result && (
            <Button title="Relancer l’identification" icon="🤖" variant="secondary" onPress={() => analyze(photo)} />
          )}
          <Button title="Annuler" variant="ghost" onPress={() => setPhase({ kind: 'idle' })} />
        </View>
      )}

      <SpeciesPicker
        visible={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onPick={(a) => confirm(a, 'manuel')}
        discovered={progress.discovered}
      />
    </ScrollView>
  );
}

function ResultSummary({ result }: { result: IdentifyResult }) {
  let headline = 'Voici ce que l’Anidex a trouvé :';
  if (!result.containsAnimal) headline = 'Aucun animal détecté sur cette photo.';
  else if (!result.candidates.length) {
    headline = result.outsideDex
      ? `Ça ressemble à : ${result.outsideDex}. Cette espèce n’est pas (encore) dans l’Anidex.`
      : 'Impossible de reconnaître une espèce de l’Anidex.';
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
  const pct = Math.round(confidence * 100);
  const color = CATEGORIES[animal.category].color;
  return (
    <Card style={[{ gap: 10 }, best && { borderWidth: 2, borderColor: color }]}>
      <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
        <AnimalAvatar animal={animal} discovered size={56} />
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={styles.muted}>{dexNumber(animal.id)} {discovered ? '· déjà découvert' : '· nouvelle espèce !'}</Text>
          <Text style={styles.candidateName}>{animal.nameFr}</Text>
          <Text style={styles.scientific}>{animal.scientific}</Text>
        </View>
        <Text style={[styles.pct, { color }]}>{pct}%</Text>
      </View>
      <ProgressBar value={confidence} color={color} height={6} />
      <Button title={best ? 'C’est lui !' : 'Plutôt celui-ci'} variant={best ? 'primary' : 'secondary'} onPress={onConfirm} />
    </Card>
  );
}

function SpeciesPicker({ visible, onClose, onPick, discovered }: {
  visible: boolean; onClose: () => void; onPick: (a: Animal) => void; discovered: Set<number>;
}) {
  const [q, setQ] = useState('');
  const list = useMemo(() => {
    const n = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    const query = n(q.trim());
    return query ? ANIMALS.filter((a) => [a.nameFr, a.nameEn, a.scientific].some((v) => n(v).includes(query))) : ANIMALS;
  }, [q]);
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose} presentationStyle="pageSheet">
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
        <View style={styles.pickerHeader}>
          <Text style={styles.pickerTitle}>Choisir l’espèce</Text>
          <Pressable onPress={onClose} hitSlop={12}><Text style={styles.close}>Fermer</Text></Pressable>
        </View>
        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder="Rechercher une espèce…"
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
                <Text style={styles.candidateName}>{item.nameFr}</Text>
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

function Reward({ phase, onAgain }: { phase: Extract<Phase, { kind: 'done' }>; onAgain: () => void }) {
  const { animal, reward, place, photoUri } = phase;
  const color = CATEGORIES[animal.category].color;
  return (
    <ScrollView contentContainerStyle={[styles.page, { paddingTop: 32 }]}>
      <Text style={styles.rewardKicker}>{reward.isNew ? 'NOUVELLE ESPÈCE !' : 'Nouvelle observation'}</Text>
      <AnimalAvatar animal={animal} discovered photoUri={photoUri} size={150} />
      <Text style={styles.muted}>{dexNumber(animal.id)}</Text>
      <Text style={styles.title}>{animal.nameFr}</Text>
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <TypeBadge category={animal.category} />
        <Text style={[styles.rarity, { color: RARITIES[animal.rarity].color }]}>{RARITIES[animal.rarity].label}</Text>
      </View>
      {place && <Text style={styles.muted}>📍 {place}</Text>}
      <View style={[styles.xp, { backgroundColor: color }]}>
        <Text style={styles.xpText}>+{reward.xpGained} XP</Text>
      </View>
      {reward.levelUp && (
        <Card style={{ width: '100%', alignItems: 'center', gap: 4 }}>
          <Text style={{ fontSize: 28 }}>🎉</Text>
          <Text style={styles.cardTitle}>Niveau {reward.level} atteint !</Text>
          <Text style={styles.text}>Tu es maintenant « {reward.rank} ».</Text>
        </Card>
      )}
      {reward.newBadges.map((b) => (
        <Card key={b.id} style={{ width: '100%', flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          <View style={[styles.badgeIcon, { backgroundColor: b.color }]}><Text style={{ fontSize: 24 }}>{b.emoji}</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.muted}>Badge débloqué</Text>
            <Text style={styles.cardTitle}>{b.title}</Text>
          </View>
        </Card>
      ))}
      <Card style={{ width: '100%', gap: 4 }}>
        <Text style={styles.cardTitle}>Le savais-tu ?</Text>
        <Text style={styles.text}>{animal.funFact}</Text>
      </Card>
      <View style={{ gap: 10, width: '100%' }}>
        <Button title="Voir la fiche" icon="📖" onPress={() => router.push(`/animal/${animal.id}`)} />
        <Button title="Nouvelle observation" icon="📷" variant="secondary" onPress={onAgain} />
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
  rewardKicker: { color: colors.red, fontWeight: '900', letterSpacing: 2, fontSize: 15 },
  rarity: { fontWeight: '800' },
  xp: { paddingHorizontal: 22, paddingVertical: 10, borderRadius: radius.pill },
  xpText: { color: '#fff', fontSize: 22, fontWeight: '900' },
  badgeIcon: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
});
