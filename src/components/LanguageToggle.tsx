import { Pressable, StyleSheet, Text, View } from 'react-native';

import { LANGS, useI18n } from '../i18n';
import { colors, radius } from './theme';

/**
 * Sélecteur de langue « FR | EN ».
 * - variant "header" : pastille blanche sur la barre rouge du haut ;
 * - variant "settings" : grand sélecteur pour l'écran des réglages.
 */
export function LanguageToggle({ variant = 'header' }: { variant?: 'header' | 'settings' }) {
  const { lang, setLang, s } = useI18n();
  const big = variant === 'settings';
  return (
    <View
      style={[styles.wrap, big && styles.wrapBig]}
      accessibilityRole="radiogroup"
      accessibilityLabel={s.a11y.languageSwitch}
    >
      {LANGS.map((l, i) => {
        const active = l === lang;
        return (
          <View key={l} style={[styles.row, big && styles.rowBig]}>
            {i > 0 && !big && <Text style={styles.sep}>|</Text>}
            <Pressable
              onPress={() => setLang(l)}
              hitSlop={6}
              accessibilityRole="radio"
              accessibilityState={{ checked: active }}
              accessibilityLabel={l === 'fr' ? 'Français' : 'English'}
              style={[styles.item, big && styles.itemBig, active && (big ? styles.activeBig : styles.active)]}
            >
              <Text style={[styles.text, big && styles.textBig, active && (big ? styles.textActiveBig : styles.textActive)]}>
                {big ? (l === 'fr' ? '🇫🇷  Français' : '🇬🇧  English') : l.toUpperCase()}
              </Text>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: radius.pill, padding: 3, borderWidth: 1, borderColor: 'rgba(255,255,255,0.5)',
  },
  wrapBig: { backgroundColor: '#E9E4D8', borderColor: 'transparent', borderRadius: radius.md, padding: 4, gap: 4 },
  row: { flexDirection: 'row', alignItems: 'center' },
  rowBig: { flex: 1 },
  sep: { color: 'rgba(255,255,255,0.6)', fontWeight: '700', marginHorizontal: 1 },
  item: { paddingHorizontal: 9, paddingVertical: 4, borderRadius: radius.pill },
  itemBig: { flex: 1, alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, borderRadius: radius.md - 4 },
  active: { backgroundColor: '#fff' },
  activeBig: { backgroundColor: colors.ink },
  text: { color: '#fff', fontWeight: '900', fontSize: 13, letterSpacing: 0.5 },
  textBig: { color: colors.ink, fontSize: 15, fontWeight: '800' },
  textActive: { color: colors.red },
  textActiveBig: { color: '#fff' },
});
