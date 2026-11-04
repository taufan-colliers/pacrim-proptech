import { Platform, StyleSheet } from 'react-native';

import type { ColorStyle } from '@/types/components/general';

export default function styles({ colors }: ColorStyle) {
  return StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 16,
    },
    codeContainer: {
      borderWidth: 1,
      borderRadius: 12,
      borderColor: colors['otp-input-border-default'],
      height: undefined,
      aspectRatio: 3 / 4,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    containerFilledPinCode: {
      borderColor: colors['otp-input-border-filled'],
      backgroundColor: colors['otp-input-bg-filled'],
    },
    codeText: {
      fontSize: 24,
    },
    hiddenInput: {
      ...StyleSheet.absoluteFill,
      ...Platform.select({
        ios: {
          opacity: 0.02,
          color: 'transparent',
        },
        default: {
          opacity: 0,
        },
      }),
    },
  });
}
