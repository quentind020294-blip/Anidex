import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { LOGO_FULL_SVG, LOGO_MARK_SVG } from './logoSvg';

/**
 * Logo de l'Anidex (dessin vectoriel, voir assets/logo/ et scripts/logo/gen-logo.py).
 * - variant « mark » : l'icône seule (patte, carte, feuilles), coins arrondis comme une icône d'appli ;
 * - variant « full » : le logo avec « ANIDEX ».
 */
export function AnidexLogo({ size, variant = 'mark', style }: { size: number; variant?: 'mark' | 'full'; style?: StyleProp<ViewStyle> }) {
  return (
    <View
      style={[styles.wrap, { width: size, height: size, borderRadius: variant === 'mark' ? size * 0.22 : size * 0.08 }, style]}
      accessible
      accessibilityRole="image"
      accessibilityLabel="Anidex"
    >
      <SvgXml xml={variant === 'mark' ? LOGO_MARK_SVG : LOGO_FULL_SVG} width={size} height={size} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { overflow: 'hidden' },
});
