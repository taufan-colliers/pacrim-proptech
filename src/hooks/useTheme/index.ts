import { useColorScheme as useRNColorScheme } from 'react-native';

import { darkColors, lightColors } from '@/constants/colors';
import { logAnalytic } from '@/helpers';
import type { ThemePreference } from '@/types/components/general';

import { useComponentState } from '../../stores/useComponentState';

/**
 * Resolve the active colour palette from the user's preference (or the OS when set to
 * "system") and expose helpers to change it.
 *
 * The resolved scheme is derived during render — no effect/setState round trip — so theme
 * changes apply in the same render pass.
 *
 * @example
 * const { colors, isLight, toggleTheme } = useTheme();
 */
export default function useTheme() {
  const systemTheme = useRNColorScheme();
  const themePref = useComponentState((state) => state.themePref);
  const themePrefSet = useComponentState((state) => state.themePrefSet);

  const theme = (themePref === 'system' ? systemTheme : themePref) ?? 'light';
  const isLight = theme === 'light';

  function changeTheme(newTheme: ThemePreference) {
    themePrefSet(newTheme);
  }

  function toggleTheme() {
    if (themePref === 'light') {
      logAnalytic('CHANGE_THEME_TO_DARK', undefined);
      themePrefSet('dark');
    } else if (themePref === 'dark') themePrefSet('system');
    else {
      logAnalytic('CHANGE_THEME_TO_LIGHT', undefined);
      themePrefSet('light');
    }
  }

  return {
    changeTheme,
    colors: isLight ? lightColors : darkColors,
    isLight,
    theme,
    themePref,
    toggleTheme,
  };
}
