import type { PropsWithChildren } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';

export interface GapProps {
  /** Total vertical space to reserve. Halved when children are present (padding vs. spacer). */
  vertical?: number;
  /** Total horizontal space to reserve, halved when children are present. */
  horizontal?: number;
  /** CSS `gap` between children. */
  gap?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * Spacer/view for creating consistent gaps without sprinkling magic margins around screens.
 *
 * Without children it acts as a fixed-size spacer; with children it becomes a padded wrapper.
 *
 * @example
 * <Gap vertical={24} />
 * <Gap vertical={16}>{children}</Gap>
 */
export default function Gap({
  vertical,
  horizontal,
  children,
  gap,
  style,
}: PropsWithChildren<GapProps>) {
  const paddingVertical = (vertical || 0) / (children ? 1 : 2);
  const paddingHorizontal = (horizontal || 0) / (children ? 1 : 2);

  return (
    <View
      style={[
        vertical !== undefined && { paddingVertical },
        horizontal !== undefined && { paddingHorizontal },
        { gap },
        style,
      ]}
    >
      {children}
    </View>
  );
}
