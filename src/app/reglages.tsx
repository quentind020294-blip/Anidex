import { useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';

import { colors, radius } from '../components/theme';
import { Button, Card } from '../components/ui';
import { ANIMALS } from '../data/animals';
import { useDex } from '../lib/store';

function mask(key: string) {
  return key.length > 12 ? `${key.slice(0, 7)}…${key.slice(-4)}` : '••••';
}

export default function SettingsScreen() {
  const { apiKey, setApiKey, settings, updateSettings, sightings, resetAll } = useDex();
  const [draft, setDraft] = useState('');
  const [saved, setSaved] = useState(false);

  async function save() {
    await setApiKey(draft);
    setDraft('');
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function confirmReset() {
    const message = `Toutes tes observations (${sightings.length}) et leurs photos seront supprimées.`;
    if (Platform.OS === 'web') {
      if (window.confirm(`Tout effacer ?\n${message}`)) void resetAll();
      return;
    }
    Alert.alert('Tout effacer ?', message, [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Tout effacer', style: 'destructive', onPress: () => void resetAll() },
    ]);
  }

  return (
    <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
      <Card style={{ gap: 10 }}>
        <Text style={styles.title}>🤖 Identification par IA</Text>
        <Text style={styles.text}>
          L’Anidex utilise Claude (Anthropic) pour reconnaître les animaux sur tes photos. Crée une clé API sur
          console.anthropic.com puis colle-la ici. Elle n’est envoyée qu’à l’API d’Anthropic.{' '}
          {Platform.OS === 'web'
            ? 'Sur la version web, elle est enregistrée dans ce navigateur uniquement (non chiffrée) : n’utilise l’app que sur ton propre appareil, et fixe une limite de dépenses sur ta clé dans la console Anthropic.'
            : 'Elle est stockée de façon chiffrée sur ton appareil.'}
        </Text>
        <Text style={styles.status}>
          {apiKey ? `✓ Clé enregistrée (${mask(apiKey)})` : 'Aucune clé enregistrée : identification manuelle uniquement.'}
        </Text>
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
          <Button title={saved ? 'Enregistrée ✓' : 'Enregistrer'} onPress={save} disabled={!draft.trim()} style={{ flex: 1 }} />
          {!!apiKey && <Button title="Supprimer" variant="secondary" onPress={() => void setApiKey('')} style={{ flex: 1 }} />}
        </View>
        <Row
          label="Identifier automatiquement après la photo"
          value={settings.autoIdentify}
          onChange={(v) => void updateSettings({ autoIdentify: v })}
        />
      </Card>

      <Card style={{ gap: 10 }}>
        <Text style={styles.title}>📍 Localisation</Text>
        <Row
          label="Enregistrer le lieu de chaque observation"
          value={settings.saveLocation}
          onChange={(v) => void updateSettings({ saveLocation: v })}
        />
        <Text style={styles.small}>Le lieu sert à ton journal et aux badges d’exploration. Il reste sur ton téléphone.</Text>
      </Card>

      <Card style={{ gap: 10 }}>
        <Text style={styles.title}>🗂️ Données</Text>
        <Text style={styles.text}>{sightings.length} observation(s) enregistrée(s) · {ANIMALS.length} espèces dans l’Anidex.</Text>
        <Button title="Tout effacer" variant="secondary" onPress={confirmReset} disabled={!sightings.length} />
      </Card>

      <Text style={styles.footer}>
        Anidex · Un Pokédex de la faune australienne.{'\n'}Respecte la faune : observe sans déranger. 🦘
      </Text>
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
