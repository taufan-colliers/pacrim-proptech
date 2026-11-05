import type { ColorStyle } from '@/types/components/general';
import { StyleSheet } from 'react-native';

export default function styles({
  colors,
  danger,
  compact,
}: ColorStyle & { danger?: boolean; compact?: boolean }) {
  return StyleSheet.create({
    container: {
      padding: 8,
      borderRadius: 8,
      backgroundColor: danger ? colors['tile-danger'] : colors.tile,
      borderWidth: 1,
      borderColor: danger ? colors.danger : colors.primary,
      alignSelf: compact ? 'flex-start' : 'auto',
    },
  });
}
