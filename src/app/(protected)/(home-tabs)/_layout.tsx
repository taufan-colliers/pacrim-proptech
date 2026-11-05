import { Tabs } from 'expo-router';

import { Icon } from '@/components/atoms';
import { useColors } from '@/hooks';

/**
 * Bottom tabs for the signed-in shell: consolidated Home plus the Company and Profile tabs.
 *
 * Mirrors the source `cfm-ticket` tab navigator (react-navigation bottom tabs) rather than
 * expo-router's native tabs.
 */
export default function HomeTabsLayout() {
  const colors = useColors();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.activeIcon,
        tabBarInactiveTintColor: colors.inactiveIcon,
        tabBarActiveBackgroundColor: colors['bottom-tab-active-bg'],
        tabBarInactiveBackgroundColor: colors['bottom-tab-inactive-bg'],
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: colors['bottom-tab-inactive-bg'],
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon
              name="home"
              color={typeof color === 'string' ? color : colors.primary}
              size={32}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="clients"
        options={{
          headerShown: false,
          tabBarLabel: 'Company',
          tabBarIcon: ({ color }) => (
            <Icon
              name="office-building"
              color={typeof color === 'string' ? color : colors.primary}
              size={32}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Icon
              name="account"
              color={typeof color === 'string' ? color : colors.primary}
              size={32}
            />
          ),
        }}
      />
    </Tabs>
  );
}
