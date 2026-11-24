import { Image, Pressable, StyleSheet, Text, View, type ImageStyle, type StyleProp, type ViewStyle } from 'react-native';

import { CATEGORIES, RARITIES } from '../data/meta';
import type { Animal, Category, Rarity } from '../data/types';
import { usePhotoUri } from '../lib/photoStore';
import { colors, radius } from './theme';

export function TypeBadge({ category, small }: { category: Category; small?: boolean }) {
  const meta = CATEGORIES[category];
  return (
    <View style={[styles.badge, { backgroundColor: meta.color }, small && styles.badgeSmall]}>
      <Text style={[styles.badgeText, small && styles.badgeTextSmall]}>
        {meta.emoji} {meta.label}
      </Text>
    </View>
  );
}

export function RarityStars({ rarity, light }: { rarity: Rarity; light?: boolean }) {
  const meta = RARITIES[rarity];
  return (
    <Text style={[styles.stars, { color: light ? '#fff' : meta.color }]} accessibilityLabel={meta.label}>
      {'★'.repeat(meta.stars)}
      <Text style={{ opacity: 0.25 }}>{'★'.repeat(4 - meta.stars)}</Text>
    </Text>
  );
}

export function ProgressBar({ value, color = colors.red, height = 10, track = '#E9E4D8' }: {
  value: number; color?: string; height?: number; track?: string;
}) {
  const pct = Math.max(0, Math.min(1, value));
  return (
    <View style={{ height, borderRadius: height, backgroundColor: track, overflow: 'hidden' }}>
      <View style={{ width: `${pct * 100}%`, height: '100%', backgroundColor: color, borderRadius: height }} />
    </View>
  );
}

/** Portrait de l'animal : la photo de l'utilisateur si découvert, sinon une silhouette mystère. */
export function AnimalAvatar({ animal, photoUri, discovered, size }: {
  animal: Animal; photoUri?: string | null; discovered: boolean; size: number;
}) {
  const color = CATEGORIES[animal.category].color;
  const resolved = usePhotoUri(photoUri);
  const base: ViewStyle = { width: size, height: size, borderRadius: size / 2, overflow: 'hidden' };
  if (discovered && resolved) {
    return (
      <View style={[base, { borderWidth: 3, borderColor: color }]}>
        <Image source={{ uri: resolved }} style={{ width: '100%', height: '100%' }} />
      </View>
    );
  }
  return (
    <View
      style={[base, styles.center, {
        backgroundColor: discovered ? `${color}22` : colors.locked,
        borderWidth: 3,
        borderColor: discovered ? color : '#454B5A',
      }]}
    >
      <Text style={{ fontSize: size * 0.48, opacity: discovered ? 1 : 0.18 }}>{animal.emoji}</Text>
      {!discovered && <Text style={[styles.question, { fontSize: size * 0.3 }]}>?</Text>}
    </View>
  );
}

/** Affiche une photo enregistrée (URI de fichier, data-URI ou référence IndexedDB sur le web). */
export function StoredImage({ uri, style }: { uri: string | null | undefined; style: StyleProp<ImageStyle> }) {
  const resolved = usePhotoUri(uri);
  if (!resolved) return <View style={[style as StyleProp<ViewStyle>, { backgroundColor: '#EEE9DD' }]} />;
  return <Image source={{ uri: resolved }} style={style} />;
}

export function Button({ title, onPress, variant = 'primary', icon, disabled, style }: {
  title: string; onPress: () => void; variant?: 'primary' | 'secondary' | 'ghost'; icon?: string;
  disabled?: boolean; style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.button,
        variant === 'primary' && { backgroundColor: colors.red },
        variant === 'secondary' && { backgroundColor: colors.card, borderWidth: 2, borderColor: colors.red },
        variant === 'ghost' && { backgroundColor: 'transparent' },
        (pressed || disabled) && { opacity: 0.6 },
        style,
      ]}
    >
      <Text style={[styles.buttonText, variant !== 'primary' && { color: colors.red }]}>
        {icon ? `${icon}  ` : ''}{title}
      </Text>
    </Pressable>
  );
}

export function Card({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.pill, alignSelf: 'flex-start' },
  badgeSmall: { paddingHorizontal: 7, paddingVertical: 2 },
  badgeText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  badgeTextSmall: { fontSize: 10 },
  stars: { fontSize: 14, letterSpacing: 1 },
  question: { position: 'absolute', color: '#8B93A7', fontWeight: '900' },
  button: {
    paddingVertical: 14, paddingHorizontal: 20, borderRadius: radius.md,
    alignItems: 'center', justifyContent: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  card: {
    backgroundColor: colors.card, borderRadius: radius.lg, padding: 16,
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 10, shadowOffset: { width: 0, height: 3 }, elevation: 2,
  },
});
