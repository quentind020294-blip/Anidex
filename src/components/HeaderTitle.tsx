import { StyleSheet, Text, type ColorValue } from 'react-native';

/**
 * Titre d'en-tête qui ne déborde jamais : jusqu'à deux lignes, puis coupé avec « … ».
 * Utile pour les fiches aux noms longs (ex. « #062 Eastern Blue-tongued Lizard »).
 */
export function HeaderTitle({ children, tintColor }: { children: string; tintColor?: ColorValue }) {
  return (
    <Text numberOfLines={2} ellipsizeMode="tail" style={[styles.title, { color: tintColor ?? '#fff' }]} accessibilityRole="header">
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: { fontWeight: '800', fontSize: 17, lineHeight: 21, flexShrink: 1 },
});
