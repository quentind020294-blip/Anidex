import { Pressable, StyleSheet, Text, View } from 'react-native';

import { LANGS, useI18n } from '../i18n';
import { colors, radius } from './theme';

// Les noms de langue restent écrits dans leur propre langue, pour être reconnus par tout le monde.
const LANG_LABELS = { fr: '🇫🇷  Français', en: '🇬🇧  English' } as const;

/** Sélecteur de langue de l'écran des réglages : « Français / English ». Le choix est mémorisé. */
export function LanguageToggle() {
  const { lang, setLang, s } = useI18n();
  return (
    <View style={styles.wrap} accessibilityRole="radiogroup" accessibilityLabel={s.a11y.languageSwitch}>
      {LANGS.map((l) => {
        const active = l === lang;
        return (
          <Pressable
            key={l}
            onPress={() => setLang(l)}
            accessibilityRole="radio"
            accessibilityState={{ checked: active }}
            accessibilityLabel={l === 'fr' ? 'Français' : 'English'}
            style={[styles.item, active && styles.active]}
          >
            <Text style={[styles.text, active && styles.textActive]} numberOfLines={1}>
              {LANG_LABELS[l]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', backgroundColor: '#E9E4D8', borderRadius: radius.md, padding: 4, gap: 4 },
  item: { flex: 1, alignItems: 'center', paddingHorizontal: 10, paddingVertical: 10, borderRadius: radius.md - 4 },
  active: { backgroundColor: colors.ink },
  text: { color: colors.ink, fontSize: 15, fontWeight: '800' },
  textActive: { color: '#fff' },
});
