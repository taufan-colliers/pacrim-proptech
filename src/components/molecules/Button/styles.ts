import { StyleSheet } from 'react-native';

import type { ColorStyle } from '@/types/components/general';

function styles({ compact }: ColorStyle & { compact?: boolean }) {
  return StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: compact ? 4 : 8,
      borderRadius: compact ? 4 : 8,
      alignItems: 'center',
      justifyContent: 'center',
      height: compact ? 32 : 48,
      overflow: 'hidden',
      alignSelf: compact ? 'flex-start' : 'auto',
    },
  });
}

export default styles;
