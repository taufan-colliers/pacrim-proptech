import useTheme from '../useTheme';

/**
 * Convenience accessor for the active palette.
 *
 * @example
 * const colors = useColors();
 * <View style={{ backgroundColor: colors.background }} />
 */
export default function useColors() {
  const { colors } = useTheme();
  return colors;
}
