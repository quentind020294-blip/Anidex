import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Platform, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { LanguageToggle } from '../components/LanguageToggle';
import { colors } from '../components/theme';
import { I18nProvider, useI18n } from '../i18n';
import { DexProvider, useDex } from '../lib/store';

function Gate() {
  const { ready } = useDex();
  const { ready: langReady, s } = useI18n();
  if (!ready || !langReady) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.red, alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <Text style={{ color: '#fff', fontSize: 34, fontWeight: '900', letterSpacing: 2 }}>ANIDEX</Text>
        <ActivityIndicator color="#fff" />
      </View>
    );
  }
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.red },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '800' },
        contentStyle: { backgroundColor: colors.bg },
        // Sur le web, l'en-tête n'ajoute pas de marge à droite (le natif le fait déjà).
        headerRight: () => (
          <View style={{ marginRight: Platform.OS === 'web' ? 16 : 0 }}>
            <LanguageToggle />
          </View>
        ),
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="animal/[id]" options={{ title: '' }} />
      <Stack.Screen name="reglages" options={{ title: s.screens.settings }} />
      <Stack.Screen name="conservation" options={{ title: s.screens.conservation }} />
      <Stack.Screen name="secours" options={{ title: s.screens.rescue }} />
      <Stack.Screen name="+not-found" options={{ title: s.screens.notFound }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <I18nProvider>
        <DexProvider>
          <StatusBar style="light" />
          <Gate />
        </DexProvider>
      </I18nProvider>
    </SafeAreaProvider>
  );
}
