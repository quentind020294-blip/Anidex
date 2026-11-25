import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, radius } from '../components/theme';
import { Button, Card } from '../components/ui';
import { STATE_ORDER } from '../data/meta';
import { NATIONAL_CONTACTS, RESCUE_CONTACTS, type RescueContact } from '../data/rescue';
import type { StateCode } from '../data/types';
import { useI18n } from '../i18n';
import { useDex } from '../lib/store';

export default function RescueScreen() {
  const { s } = useI18n();
  const { sightings } = useDex();
  // État de la dernière observation géolocalisée, pour le mettre en tête de liste.
  const lastState = [...sightings].sort((a, b) => b.date.localeCompare(a.date)).find((x) => x.state)?.state;
  const others = STATE_ORDER.filter((st) => st !== lastState);

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.intro}>{s.rescue.intro}</Text>

      {lastState && (
        <View style={{ gap: 8 }}>
          <Text style={styles.heading}>{s.rescue.yourState}</Text>
          <StateBlock code={lastState} highlight />
        </View>
      )}

      <Card style={{ gap: 6 }}>
        <Text style={styles.section}>{s.rescue.tipsTitle}</Text>
        {s.rescue.tips.map((tip) => (
          <Text key={tip} style={styles.text}>• {tip}</Text>
        ))}
      </Card>

      <Text style={styles.heading}>{s.rescue.allStates}</Text>
      {others.map((code) => (
        <StateBlock key={code} code={code} />
      ))}

      <Text style={styles.heading}>{s.rescue.national}</Text>
      {NATIONAL_CONTACTS.map((c) => (
        <ContactCard key={c.phone} contact={c} />
      ))}

      <Text style={styles.note}>{s.rescue.checkedOn}</Text>
    </ScrollView>
  );
}

function StateBlock({ code, highlight }: { code: StateCode; highlight?: boolean }) {
  const { s } = useI18n();
  return (
    <View style={[styles.state, highlight && styles.stateHighlight]}>
      <Text style={styles.stateName}>{code} · {s.states[code]}</Text>
      {RESCUE_CONTACTS[code].map((c) => (
        <ContactCard key={c.phone} contact={c} />
      ))}
    </View>
  );
}

function ContactCard({ contact }: { contact: RescueContact }) {
  const { s, lang } = useI18n();
  return (
    <Card style={{ gap: 6 }}>
      <Text style={styles.contactName}>{contact.name}</Text>
      <Text style={styles.phone}>{contact.phone}</Text>
      <Text style={styles.text}>{contact.note?.[lang]}</Text>
      <Text style={[styles.note, contact.verified === 'unconfirmed' && { color: '#B45309', fontWeight: '700' }]}>
        {s.rescue.verified[contact.verified]}
      </Text>
      <View style={styles.buttons}>
        <Button title={`📞 ${s.rescue.call}`} onPress={() => void Linking.openURL(`tel:${contact.tel}`)} style={{ flex: 1 }} />
        {contact.url && (
          <Button title={s.rescue.website} variant="secondary" onPress={() => void Linking.openURL(contact.url!)} style={{ flex: 1 }} />
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  page: { padding: 16, gap: 12, maxWidth: 720, width: '100%', alignSelf: 'center', paddingBottom: 40 },
  intro: { fontSize: 15, color: colors.ink, lineHeight: 21 },
  heading: { fontSize: 17, fontWeight: '900', color: colors.ink, marginTop: 6 },
  section: { fontSize: 16, fontWeight: '900', color: colors.ink },
  text: { fontSize: 14, color: colors.ink, lineHeight: 20 },
  note: { fontSize: 12, color: colors.muted, lineHeight: 17 },
  state: { gap: 8 },
  stateHighlight: { backgroundColor: '#FDE8EA', padding: 10, borderRadius: radius.lg },
  stateName: { fontSize: 15, fontWeight: '800', color: colors.redDark },
  contactName: { fontSize: 16, fontWeight: '800', color: colors.ink },
  phone: { fontSize: 22, fontWeight: '900', color: colors.red, letterSpacing: 0.5 },
  buttons: { flexDirection: 'row', gap: 10, marginTop: 4 },
});
