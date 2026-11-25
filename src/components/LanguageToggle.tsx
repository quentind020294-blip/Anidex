import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import { LANGS, LOCALES, useI18n } from '../i18n';
import { colors, radius } from './theme';

/**
 * Sélecteur de langue des réglages : « Français / English / Español ».
 * Les noms de langue restent écrits dans leur propre langue, pour être reconnus par tous.
 * Sur un écran étroit, les choix passent les uns sous les autres. Le choix est mémorisé.
 */
export function LanguageToggle() {
  const { lang, setLang, s } = useI18n();
  const { width } = useWindowDimensions();
  const stacked = width < 120 * LANGS.length + 80;
  return (
    <View
      style={[styles.wrap, stacked && styles.stacked]}
      accessibilityRole="radiogroup"
      accessibilityLabel={s.a11y.languageSwitch}
    >
      {LANGS.map((l) => {
        const active = l === lang;
        return (
          <Pressable
            key={l}
            onPress={() => setLang(l)}
            accessibilityRole="radio"
            accessibilityState={{ checked: active }}
            accessibilityLabel={LOCALES[l].label}
            style={[styles.item, !stacked && { flex: 1 }, active && styles.active]}
          >
            <Text style={[styles.text, active && styles.textActive]} numberOfLines={1}>
              {LOCALES[l].flag}  {LOCALES[l].label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', backgroundColor: '#E9E4D8', borderRadius: radius.md, padding: 4, gap: 4 },
  stacked: { flexDirection: 'column' },
  item: { alignItems: 'center', paddingHorizontal: 10, paddingVertical: 10, borderRadius: radius.md - 4 },
  active: { backgroundColor: colors.ink },
  text: { color: colors.ink, fontSize: 15, fontWeight: '800' },
  textActive: { color: '#fff' },
});
