import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { colors, radius } from '../components/theme';
import { useI18n } from '../i18n';

export default function NotFoundScreen() {
  const { s } = useI18n();
  return (
    <View style={styles.page}>
      <Text style={{ fontSize: 56 }}>🦘💨</Text>
      <Text style={styles.title}>{s.notFound.title}</Text>
      <Text style={styles.text}>{s.notFound.text}</Text>
      <Link href="/" style={styles.link}>{s.notFound.back}</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24 },
  title: { fontSize: 22, fontWeight: '900', color: colors.ink, textAlign: 'center' },
  text: { color: colors.muted, textAlign: 'center' },
  link: {
    marginTop: 8, backgroundColor: colors.red, color: '#fff', fontWeight: '800', paddingHorizontal: 20,
    paddingVertical: 12, borderRadius: radius.md, overflow: 'hidden',
  },
});
