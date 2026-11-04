import { QueryClientProvider } from '@tanstack/react-query';
import { DarkTheme, DefaultTheme, Slot, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import ToastManager from 'toastify-react-native';

import { useColors, useHydrated, useTheme } from '@/hooks';
import createQueryClient from '@/lib/queryClient';

// Keep the native splash visible until the persisted store has hydrated, otherwise the app
// could flash the sign-in screen before a saved session is restored.
SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ duration: 300, fade: true });

/**
 * Application root: owns the React Query client and every provider screens rely on.
 *
 * `RootShell` is a child component so it can read from the Query client (via `useHydrated`)
 * and only render routes once hydration has finished.
 */
export default function RootLayout() {
  const [queryClient] = useState(createQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardProvider>
          <RootShell />
        </KeyboardProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

function RootShell() {
  const hasHydrated = useHydrated();
  const colors = useColors();
  const { isLight } = useTheme();

  useEffect(() => {
    if (hasHydrated) SplashScreen.hide();
  }, [hasHydrated]);

  if (!hasHydrated) return null;

  const baseTheme = isLight ? DefaultTheme : DarkTheme;
  const navigationTheme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      background: colors.background,
      card: colors.background,
      text: colors.text,
      primary: colors.primary,
      border: colors.divider,
      notification: colors.danger,
    },
  };

  return (
    <ThemeProvider value={navigationTheme}>
      <StatusBar style="light" />
      <ToastManager
        position="top"
        showProgressBar
        textStyle={{ fontSize: 14, width: 'auto', flex: 1 }}
        showCloseIcon={false}
        height="auto"
      />
      <Slot />
    </ThemeProvider>
  );
}
