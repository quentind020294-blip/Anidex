import { useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';

import { LanguageToggle } from '../components/LanguageToggle';
import { colors, radius } from '../components/theme';
import { Button, Card } from '../components/ui';
import { ANIMALS } from '../data/animals';
import { useI18n } from '../i18n';
import { useDex } from '../lib/store';

function mask(key: string) {
  return key.length > 12 ? `${key.slice(0, 7)}…${key.slice(-4)}` : '••••';
}

export default function SettingsScreen() {
  const { apiKey, setApiKey, settings, updateSettings, sightings, resetAll } = useDex();
  const { s } = useI18n();
  const [draft, setDraft] = useState('');
  const [saved, setSaved] = useState(false);

  async function save() {
    await setApiKey(draft);
    setDraft('');
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function confirmReset() {
    const message = s.settings.resetText(sightings.length);
    if (Platform.OS === 'web') {
      if (window.confirm(`${s.settings.resetTitle}\n${message}`)) void resetAll();
      return;
    }
    Alert.alert(s.settings.resetTitle, message, [
      { text: s.settings.cancel, style: 'cancel' },
      { text: s.settings.resetAll, style: 'destructive', onPress: () => void resetAll() },
    ]);
  }

  return (
    <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
      <Card style={{ gap: 10 }}>
        {/* Le sélecteur affiche « Français » et « English » : il reste reconnaissable dans les deux langues. */}
        <Text style={styles.title}>🌐 {s.language.title}</Text>
        <LanguageToggle />
        <Text style={styles.small}>{s.language.hint}</Text>
      </Card>

      <Card style={{ gap: 10 }}>
        <Text style={styles.title}>{s.settings.aiTitle}</Text>
        <Text style={styles.text}>
          {s.settings.aiText} {Platform.OS === 'web' ? s.settings.keyStorageWeb : s.settings.keyStorageNative}
        </Text>
        <Text style={styles.status}>{apiKey ? s.settings.keySaved(mask(apiKey)) : s.settings.noKey}</Text>
        <TextInput
          value={draft}
          onChangeText={setDraft}
          placeholder="sk-ant-…"
          placeholderTextColor={colors.muted}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Button title={saved ? s.settings.saved : s.settings.save} onPress={save} disabled={!draft.trim()} style={{ flex: 1 }} />
          {!!apiKey && <Button title={s.settings.remove} variant="secondary" onPress={() => void setApiKey('')} style={{ flex: 1 }} />}
        </View>
        <Row
          label={s.settings.autoIdentify}
          value={settings.autoIdentify}
          onChange={(v) => void updateSettings({ autoIdentify: v })}
        />
      </Card>

      <Card style={{ gap: 10 }}>
        <Text style={styles.title}>{s.settings.locationTitle}</Text>
        <Row
          label={s.settings.saveLocation}
          value={settings.saveLocation}
          onChange={(v) => void updateSettings({ saveLocation: v })}
        />
        <Text style={styles.small}>{s.settings.locationHint}</Text>
      </Card>

      <Card style={{ gap: 10 }}>
        <Text style={styles.title}>{s.settings.dataTitle}</Text>
        <Text style={styles.text}>{s.settings.dataSummary(sightings.length, ANIMALS.length)}</Text>
        <Button title={s.settings.resetAll} variant="secondary" onPress={confirmReset} disabled={!sightings.length} />
      </Card>

      <Text style={styles.footer}>{s.settings.footer}</Text>
    </ScrollView>
  );
}

function Row({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <View style={styles.row}>
      <Text style={[styles.text, { flex: 1 }]}>{label}</Text>
      <Switch value={value} onValueChange={onChange} trackColor={{ true: colors.red, false: '#D1D5DB' }} thumbColor="#fff" />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { padding: 16, gap: 14, maxWidth: 640, width: '100%', alignSelf: 'center', paddingBottom: 40 },
  title: { fontSize: 17, fontWeight: '900', color: colors.ink },
  text: { fontSize: 14, color: colors.ink, lineHeight: 20 },
  small: { fontSize: 12, color: colors.muted, lineHeight: 17 },
  status: { fontWeight: '700', color: colors.muted },
  input: {
    backgroundColor: '#F7F5EF', borderRadius: radius.md, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15,
    borderWidth: 1, borderColor: colors.line, color: colors.ink,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  footer: { textAlign: 'center', color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 8 },
});
