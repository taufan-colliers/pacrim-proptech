import { Dimensions, StyleSheet, type DimensionValue } from 'react-native';

export default function styles({
  fullPage,
  animationSize,
  containerSize,
  aspectRatio,
}: {
  fullPage?: boolean;
  animationSize?: DimensionValue;
  containerSize?: number;
  aspectRatio?: number;
}) {
  return StyleSheet.create({
    animation: { width: animationSize, height: animationSize, flex: 1 },
    container: {
      width: '100%',
      height:
        Dimensions.get('screen').height *
        (containerSize ?? (fullPage ? 0.7 : 0.5)),
      justifyContent: 'center',
      alignItems: 'center',
    },
    containerAnimation: {
      width: '100%',
      aspectRatio: aspectRatio ?? 1.5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    containerButton: { alignSelf: 'center' },
    containerContent: {
      width: '100%',
      height: '100%',
      gap: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    containerDetails: { width: 'auto', gap: 24 },
  });
}
