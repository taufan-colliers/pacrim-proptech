import { memo, useEffect, useRef } from 'react';
import { Animated, View, type ColorValue, type ViewStyle } from 'react-native';

import useTheme from '@/hooks/useTheme';

import styles from './styles';

interface VerticalStickProps {
  /** Colour of the blinking cursor. Defaults to the theme's vertical-stick token. */
  focusColor?: ColorValue;
  style?: ViewStyle;
  /** Half-period of the blink animation in milliseconds. */
  focusStickBlinkingDuration?: number;
}

/**
 * Blinking cursor rendered in the focused OTP cell, so the hidden native input still looks
 * like a normal focused field.
 *
 * @example
 * <VerticalStick focusColor={colors.primary} />
 */
const VerticalStick = memo(function VerticalStick({
  focusColor,
  style,
  focusStickBlinkingDuration = 350,
}: VerticalStickProps) {
  const { colors } = useTheme();

  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0,
          useNativeDriver: true,
          duration: focusStickBlinkingDuration,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          useNativeDriver: true,
          duration: focusStickBlinkingDuration,
        }),
      ]),
      { iterations: -1 },
    );
    animation.start();

    return () => animation.stop();
  }, [opacityAnim, focusStickBlinkingDuration]);

  return (
    <Animated.View style={{ opacity: opacityAnim }}>
      <View
        style={[
          styles.stick,
          focusColor ? { backgroundColor: focusColor || colors['vertical-stick'] } : {},
          style,
        ]}
        testID="otp-input-stick"
      />
    </Animated.View>
  );
});

export default VerticalStick;
