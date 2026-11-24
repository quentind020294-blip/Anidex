import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { HeaderTitle } from '../components/HeaderTitle';
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
        // Titres longs : deux lignes au maximum, puis « … » (jamais de chevauchement).
        headerTitle: ({ children, tintColor }) => <HeaderTitle tintColor={tintColor}>{children}</HeaderTitle>,
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
