import type { Colors } from '@/constants/colors';
import type { ColorSchemeName } from 'react-native';

/** User-selected colour scheme; "system" follows the OS setting. */
export type ThemePreference = ColorSchemeName | 'system';

/** Role resolved from `/user-info` after MFA verification. */
export type Role = 'user' | 'PIC' | 'technician' | null;

/** Helper for style factories that need the active palette. */
export interface ColorStyle {
  colors: Colors;
}

/** Generic selectable option used by forms. */
export type Option<T> = {
  id: T;
  label: string;
  description?: string | undefined;
};
