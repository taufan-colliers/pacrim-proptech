import { SCREEN_HR_PADDING } from '@/constants/components';
import type { ColorStyle } from '@/types/components/general';
import { Dimensions, StyleSheet } from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;

const HR_PADDING = SCREEN_HR_PADDING;
const GAP = 24;
const COLUMN = 3;

/** Width/height of one square tile icon. */
export const TILE_WIDTH =
  (WINDOW_WIDTH - HR_PADDING * 2 - GAP * (COLUMN - 1)) / COLUMN;

export default function styles({ colors }: ColorStyle) {
  return StyleSheet.create({
    container: {
      gap: 4,
      width: TILE_WIDTH,
      alignItems: 'center',
    },
    containerIcon: {
      width: TILE_WIDTH,
      height: TILE_WIDTH,
      backgroundColor: colors.tile,
      padding: TILE_WIDTH * 0.25,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      width: '100%',
      height: '100%',
    },
    containerWrapper: {
      width: '100%',
      padding: HR_PADDING,
      gap: GAP * 0.99,
      flexWrap: 'wrap',
      flexDirection: 'row',
    },
  });
}
