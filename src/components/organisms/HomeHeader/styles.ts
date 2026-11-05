import { SCREEN_HR_PADDING } from '@/constants/components';
import type { ColorStyle } from '@/types/components/general';
import { StyleSheet } from 'react-native';

export default function styles({ colors }: ColorStyle) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingHorizontal: SCREEN_HR_PADDING,
      backgroundColor: colors['home-header-bg'],
    },
    containerContent: {
      flex: 1,
      justifyContent: 'center',
      paddingVertical: 8,
    },
    containerClientName: {
      alignSelf: 'flex-start',
    },
    containerAction: {
      aspectRatio: 1,
      width: 40,
      height: undefined,
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerActions: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 8,
    },
  });
}
