import * as Clipboard from 'expo-clipboard';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator, Alert, Platform, Pressable, RefreshControl, ScrollView, Share, StyleSheet, Text, TextInput, View,
} from 'react-native';

import { colors, radius } from '../../components/theme';
import { Button, Card } from '../../components/ui';
import { ANIMALS } from '../../data/animals';
import { useI18n, type Strings } from '../../i18n';
import { formatDate } from '../../lib/format';
import { FriendsError } from '../../lib/friends';
import { useFriends } from '../../lib/friendsStore';
import { useDex } from '../../lib/store';

function errorMessage(e: unknown, s: Strings): string {
  return e instanceof FriendsError ? s.friends.errors[e.code] : s.friends.errors.unknown;
}

function confirmAction(title: string, text: string, s: Strings, onConfirm: () => void) {
  if (Platform.OS === 'web') {
    if (window.confirm(`${title}\n${text}`)) onConfirm();
    return;
  }
  Alert.alert(title, text, [
    { text: s.friends.cancel, style: 'cancel' },
    { text: s.friends.confirm, style: 'destructive', onPress: onConfirm },
  ]);
}

export default function FriendsScreen() {
  const { s } = useI18n();
  const f = useFriends();

  if (f.status === 'not-configured' || f.status === 'unsafe-key') {
    return (
      <ScrollView contentContainerStyle={styles.page}>
        <Card style={{ gap: 8 }}>
          <Text style={styles.title}>👥 {s.friends.notConfiguredTitle}</Text>
          <Text style={styles.text}>{f.status === 'unsafe-key' ? s.friends.unsafeKey : s.friends.notConfiguredText}</Text>
        </Card>
      </ScrollView>
    );
  }
  if (f.status === 'loading') {
    return <View style={styles.center}><ActivityIndicator color={colors.red} /></View>;
  }
  return f.status === 'signed-out' ? <SignUp /> : <FriendsHome />;
}

function WhatIsShared() {
  const { s } = useI18n();
  return (
    <Card style={{ gap: 6 }}>
      <Text style={styles.subtitle}>🔒 {s.friends.sharedTitle}</Text>
      {s.friends.shared.map((line) => <Text key={line} style={styles.text}>• {line}</Text>)}
      <Text style={styles.note}>{s.friends.optional}</Text>
    </Card>
  );
}

function SignUp() {
  const { s } = useI18n();
  const { createAccount } = useFriends();
  const [pseudo, setPseudo] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setBusy(true);
    setError(null);
    try {
      await createAccount(pseudo);
    } catch (e) {
      setError(errorMessage(e, s));
    } finally {
      setBusy(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
      <View style={{ alignItems: 'center', gap: 6 }}>
        <Text style={{ fontSize: 48 }}>👥</Text>
        <Text style={[styles.title, { textAlign: 'center' }]}>{s.friends.introTitle}</Text>
        <Text style={[styles.text, { textAlign: 'center' }]}>{s.friends.introText}</Text>
      </View>
      <WhatIsShared />
      <Card style={{ gap: 8 }}>
        <Text style={styles.label}>{s.friends.pseudoLabel}</Text>
        <TextInput
          value={pseudo}
          onChangeText={setPseudo}
          placeholder={s.friends.pseudoPlaceholder}
          placeholderTextColor={colors.muted}
          maxLength={20}
          autoCorrect={false}
          style={styles.input}
        />
        <Text style={styles.note}>{s.friends.pseudoHint}</Text>
        {error && <Text style={styles.error}>{error}</Text>}
        <Button title={busy ? s.friends.working : s.friends.create} onPress={submit} disabled={busy || pseudo.trim().length < 3} />
        <Text style={styles.note}>{s.friends.accountNote}</Text>
      </Card>
    </ScrollView>
  );
}

function FriendsHome() {
  const { s } = useI18n();
  const f = useFriends();
  const { progress } = useDex();
  const [refreshing, setRefreshing] = useState(false);
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [sort, setSort] = useState<'xp' | 'species'>('xp');
  const [newPseudo, setNewPseudo] = useState('');
  const profile = f.profile!;

  async function onRefresh() {
    setRefreshing(true);
    await f.refresh();
    setRefreshing(false);
  }

  async function add() {
    setBusy(true);
    setMessage(null);
    try {
      const pseudo = await f.addFriend(code);
      setCode('');
      setMessage({ ok: true, text: s.friends.added(pseudo) });
    } catch (e) {
      setMessage({ ok: false, text: errorMessage(e, s) });
    } finally {
      setBusy(false);
    }
  }

  async function run(action: () => Promise<void>) {
    setMessage(null);
    try {
      await action();
    } catch (e) {
      setMessage({ ok: false, text: errorMessage(e, s) });
    }
  }

  const prettyCode = `${profile.friend_code.slice(0, 4)}-${profile.friend_code.slice(4)}`;
  const board = [
    { id: profile.id, pseudo: profile.pseudo, xp: progress.xp, level: progress.level, species: progress.discovered.size, me: true },
    ...f.friends.map((x) => ({ ...x, me: false })),
  ].sort((a, b) => (sort === 'xp' ? b.xp - a.xp || b.species - a.species : b.species - a.species || b.xp - a.xp));

  return (
    <ScrollView
      contentContainerStyle={styles.page}
      keyboardShouldPersistTaps="handled"
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {f.offline && f.friendsAt && <Text style={styles.warn}>📴 {s.friends.offline(formatDate(f.friendsAt, s))}</Text>}

      <Card style={styles.codeCard}>
        <Text style={styles.codeLabel}>{s.friends.myCode}</Text>
        <Text style={styles.code} selectable accessibilityLabel={profile.friend_code.split('').join(' ')}>{prettyCode}</Text>
        <Text style={styles.codeHint}>{s.friends.myCodeHint}</Text>
        <View style={styles.row}>
          <Button
            title={copied ? s.friends.copied : `📋 ${s.friends.copy}`}
            variant="secondary"
            style={{ flex: 1 }}
            onPress={() => {
              void Clipboard.setStringAsync(profile.friend_code).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              });
            }}
          />
          <Button
            title={`📤 ${s.friends.share}`}
            style={{ flex: 1 }}
            onPress={() => void Share.share({ message: s.friends.shareMessage(prettyCode) }).catch(() => undefined)}
          />
        </View>
      </Card>

      <Card style={{ gap: 8 }}>
        <Text style={styles.subtitle}>➕ {s.friends.addTitle}</Text>
        <View style={styles.row}>
          <TextInput
            value={code}
            onChangeText={(v) => setCode(v.toUpperCase())}
            placeholder={s.friends.addPlaceholder}
            placeholderTextColor={colors.muted}
            autoCapitalize="characters"
            autoCorrect={false}
            maxLength={9}
            style={[styles.input, { flex: 1 }]}
          />
          <Button title={s.friends.add} onPress={add} disabled={busy || code.replace(/[^A-Za-z0-9]/g, '').length !== 8} />
        </View>
        {message && <Text style={message.ok ? styles.success : styles.error}>{message.text}</Text>}
      </Card>

      <Card style={{ gap: 8 }}>
        <View style={styles.rowBetween}>
          <Text style={styles.subtitle}>🏆 {s.friends.leaderboard}</Text>
          <View style={styles.segment}>
            {(['xp', 'species'] as const).map((k) => (
              <Pressable key={k} onPress={() => setSort(k)} style={[styles.segmentItem, sort === k && styles.segmentActive]}>
                <Text style={[styles.segmentText, sort === k && { color: '#fff' }]}>{k === 'xp' ? s.friends.sortXp : s.friends.sortSpecies}</Text>
              </Pressable>
            ))}
          </View>
        </View>
        {board.map((e, i) => (
          <Pressable
            key={e.id}
            disabled={e.me}
            onPress={() => router.push(`/ami/${e.id}`)}
            style={({ pressed }) => [styles.boardRow, e.me && styles.boardMe, pressed && { opacity: 0.7 }]}
          >
            <Text style={styles.rank}>{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.boardName} numberOfLines={1}>{e.pseudo}{e.me ? ` (${s.friends.you})` : ''}</Text>
              <Text style={styles.note}>{s.friends.levelShort(e.level)} · {s.friends.speciesCount(e.species, ANIMALS.length)}</Text>
            </View>
            <Text style={styles.boardScore}>{sort === 'xp' ? s.friends.xp(e.xp) : e.species}</Text>
          </Pressable>
        ))}
        {f.friends.length === 0 && <Text style={styles.note}>{s.friends.noFriends}</Text>}
      </Card>

      {f.friends.length > 0 && (
        <Card style={{ gap: 8 }}>
          <Text style={styles.subtitle}>👥 {s.friends.friendsTitle(f.friends.length)}</Text>
          {f.friends.map((x) => (
            <Pressable key={x.id} onPress={() => router.push(`/ami/${x.id}`)} style={({ pressed }) => [styles.friendRow, pressed && { opacity: 0.7 }]}>
              <View style={styles.avatar}><Text style={styles.avatarText}>{x.pseudo.slice(0, 1).toUpperCase()}</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.boardName} numberOfLines={1}>{x.pseudo}</Text>
                <Text style={styles.note}>{s.friends.levelShort(x.level)} · {s.friends.speciesCount(x.species, ANIMALS.length)} · 🏅 {x.badges}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </Pressable>
          ))}
        </Card>
      )}

      <Text style={styles.note}>{f.lastSync ? s.friends.lastSync(formatDate(f.lastSync, s)) : s.friends.notSynced}</Text>
      <Button title={`🔄 ${s.friends.refresh}`} variant="ghost" onPress={onRefresh} />

      <WhatIsShared />

      <Card style={{ gap: 8 }}>
        <Text style={styles.subtitle}>⚙️ {s.friends.accountTitle}</Text>
        <Text style={styles.label}>{s.friends.renameLabel}</Text>
        <View style={styles.row}>
          <TextInput
            value={newPseudo}
            onChangeText={setNewPseudo}
            placeholder={profile.pseudo}
            placeholderTextColor={colors.muted}
            maxLength={20}
            autoCorrect={false}
            style={[styles.input, { flex: 1 }]}
          />
          <Button
            title={s.friends.save}
            disabled={newPseudo.trim().length < 3}
            onPress={() => void run(async () => {
              await f.rename(newPseudo);
              setNewPseudo('');
            })}
          />
        </View>
        <Button title={s.friends.newCode} variant="secondary" onPress={() => void run(f.regenerateCode)} />
        <Text style={styles.note}>{s.friends.newCodeHint}</Text>
        <Text style={styles.note}>{s.friends.accountNote}</Text>
        <Button
          title={s.friends.deleteAccount}
          variant="ghost"
          onPress={() => confirmAction(s.friends.deleteTitle, s.friends.deleteText, s, () => void run(f.deleteAccount))}
        />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { padding: 16, gap: 14, maxWidth: 720, width: '100%', alignSelf: 'center', paddingBottom: 40 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: '900', color: colors.ink },
  subtitle: { fontSize: 16, fontWeight: '900', color: colors.ink, flexShrink: 1 },
  text: { fontSize: 14, color: colors.ink, lineHeight: 20 },
  note: { fontSize: 12, color: colors.muted, lineHeight: 17 },
  label: { fontSize: 12, fontWeight: '800', color: colors.muted, textTransform: 'uppercase', letterSpacing: 0.5 },
  input: {
    backgroundColor: '#F7F5EF', borderRadius: radius.md, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15,
    borderWidth: 1, borderColor: colors.line, color: colors.ink, minWidth: 0,
  },
  error: { color: colors.redDark, fontWeight: '700' },
  success: { color: '#15803D', fontWeight: '700' },
  warn: { color: '#92400E', fontWeight: '700', fontSize: 13 },
  row: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' },
  codeCard: { gap: 8, backgroundColor: colors.ink },
  codeLabel: { color: 'rgba(255,255,255,0.75)', fontWeight: '800', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 },
  code: { color: '#fff', fontSize: 34, fontWeight: '900', letterSpacing: 4, fontVariant: ['tabular-nums'] },
  codeHint: { color: 'rgba(255,255,255,0.8)', fontSize: 13, lineHeight: 18 },
  segment: { flexDirection: 'row', backgroundColor: '#E9E4D8', borderRadius: radius.md, padding: 3 },
  segmentItem: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: radius.md - 3 },
  segmentActive: { backgroundColor: colors.ink },
  segmentText: { fontWeight: '700', color: colors.ink, fontSize: 13 },
  boardRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8, paddingHorizontal: 8, borderRadius: radius.md },
  boardMe: { backgroundColor: '#FDE8EA' },
  rank: { width: 30, fontSize: 18, fontWeight: '900', color: colors.ink, textAlign: 'center' },
  boardName: { fontSize: 15, fontWeight: '800', color: colors.ink },
  boardScore: { fontSize: 15, fontWeight: '900', color: colors.red },
  friendRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 6 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.red, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontWeight: '900', fontSize: 18 },
  chevron: { fontSize: 24, color: colors.muted },
});
