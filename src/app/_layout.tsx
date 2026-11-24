import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { colors } from '../components/theme';
import { DexProvider, useDex } from '../lib/store';

function Gate() {
  const { ready } = useDex();
  if (!ready) {
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
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="animal/[id]" options={{ title: '' }} />
      <Stack.Screen name="reglages" options={{ title: 'Réglages' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <DexProvider>
        <StatusBar style="light" />
        <Gate />
      </DexProvider>
    </SafeAreaProvider>
  );
}
