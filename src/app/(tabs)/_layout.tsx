import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { Tabs } from 'expo-router/js-tabs';
import { Pressable, type ColorValue } from 'react-native';

import { colors } from '../../components/theme';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

function icon(name: IconName) {
  function TabIcon({ color, size }: { color: ColorValue; size: number }) {
    return <Ionicons name={name} color={typeof color === 'string' ? color : undefined} size={size} />;
  }
  return TabIcon;
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.red },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '800' },
        tabBarActiveTintColor: colors.red,
        tabBarInactiveTintColor: colors.muted,
        sceneStyle: { backgroundColor: colors.bg },
        headerRight: () => (
          <Link href="/reglages" asChild>
            <Pressable hitSlop={12} style={{ marginRight: 16 }} accessibilityLabel="Réglages">
              <Ionicons name="settings-outline" size={22} color="#fff" />
            </Pressable>
          </Link>
        ),
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Anidex', tabBarIcon: icon('book') }} />
      <Tabs.Screen name="observer" options={{ title: 'Observer', tabBarIcon: icon('camera') }} />
      <Tabs.Screen name="journal" options={{ title: 'Journal', tabBarIcon: icon('images') }} />
      <Tabs.Screen name="badges" options={{ title: 'Badges', tabBarIcon: icon('ribbon') }} />
    </Tabs>
  );
}
