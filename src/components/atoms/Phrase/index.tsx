import { StyleSheet, Text, type TextStyle, type TextProps } from 'react-native';

import type { Colors, ColorsKey } from '@/constants/colors';
import useColors from '@/hooks/useColors';

/**
 * Named text treatments shared across the app. Keep sizes/weights here so screens express
 * intent (`type="heading"`) instead of duplicating font styles.
 */
export const TEXT_STYLES = {
  caption: { fontSize: 12, lineHeight: 16 },
  'caption-semibold': { fontSize: 12, lineHeight: 16, fontWeight: '500' },
  content: { fontSize: 14 },
  'content-semibold': { fontSize: 14, lineHeight: 20, fontWeight: '500' },
  'content-bold': { fontSize: 14, lineHeight: 20, fontWeight: 'bold' },
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
  },
  'default-bold': {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  'subheading-s': {
    fontSize: 18,
  },
  'subheading-s-semibold': {
    fontSize: 18,
    fontWeight: '500',
  },
  'subheading-s-bold': {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subheading: {
    fontSize: 20,
  },
  heading: {
    fontSize: 24,
    lineHeight: 32,
  },
  'heading-semibold': {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '500',
  },
  'heading-bold': {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 32,
    lineHeight: 32,
  },
  'title-bold': {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  link: {
    fontSize: 16,
    lineHeight: 30,
  },
} as const satisfies Record<string, TextStyle>;

export type PhraseProps = TextProps & {
  align?: 'center' | 'left' | 'right';
  /** Token name from `@/constants/colors`; resolved against the active theme. */
  color?: ColorsKey;
  type?: keyof typeof TEXT_STYLES;
  underline?: boolean;
};

/**
 * Standard text component.
 *
 * Defaults to the theme's body colour; `type="link"` also switches the default colour to the
 * link token and dims automatically when `disabled` is set.
 *
 * @example
 * <Phrase type="content" color="app-version-text">{appVersion}</Phrase>
 */
export default function Phrase({
  align,
  color,
  style,
  type = 'default',
  underline,
  ...rest
}: PhraseProps) {
  const colors = useColors();

  return (
    <Text
      style={[
        {
          color:
            type === 'link'
              ? rest.disabled
                ? colors['text-disabled']
                : color
                  ? colors[color]
                  : colors.link
              : color
                ? colors[color]
                : colors.text,
          textAlign: align,
          textDecorationLine: underline ? 'underline' : 'none',
          flexShrink: 1,
        },
        styles[type],
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({ ...TEXT_STYLES });

/**
 * Build the same style array `Phrase` uses for call sites that must style a non-`Text`
 * element (for example a `TextInput` that mimics text).
 */
export function generateTextStyle({
  align,
  color,
  type = 'default',
  disabled,
  colors,
}: {
  align?: 'center' | 'left' | 'right';
  color?: ColorsKey;
  type?: keyof typeof TEXT_STYLES;
  disabled?: boolean;
  colors: Colors;
}) {
  return [
    {
      color:
        type === 'link'
          ? disabled
            ? colors['text-disabled']
            : color
              ? colors[color]
              : colors.link
          : color
            ? colors[color]
            : colors.text,
      textAlign: align,
    },
    styles[type],
  ];
}
