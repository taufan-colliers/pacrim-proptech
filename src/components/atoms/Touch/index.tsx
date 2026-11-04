import * as Haptics from 'expo-haptics';
import type { PropsWithChildren } from 'react';
import {
  Pressable,
  View,
  type GestureResponderEvent,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {
  ANIMATION_MOVEMENTS,
  HAPTICS,
  LINEAR_TRANSITION,
} from '@/constants/components';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface TouchProps
  extends PropsWithChildren<Omit<PressableProps, 'style'>> {
  /** Style applied to the pressable surface (used for the dim-on-press effect). */
  containerStyle?: PressableProps['style'];
  /** Style applied to the inner `View`. */
  style?: StyleProp<ViewStyle>;
  /** Enable enter/exit animations plus the press-scale spring. */
  animated?: boolean;
  /** Scale applied while pressed when `animated` is true. */
  scale?: number;
  /** Direction content travels for the enter/exit animations. */
  animationDirection?: 'right' | 'top' | 'bottom';
  /** Haptic impact fired on press. */
  haptic?: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft';
}

/**
 * Base pressable with a dim-on-press effect, optional scale spring and haptic feedback.
 *
 * Prefer this over `Pressable` so taps feel consistent and haptics are never forgotten. The
 * `onPress` callback only fires after the haptic has been requested.
 *
 * @example
 * <Touch onPress={openDrawer} style={{ padding: 8 }}>
 *   <Icon name="menu" color="#333" />
 * </Touch>
 */
export default function Touch({
  containerStyle,
  style,
  animated,
  scale = 0.98,
  animationDirection = 'right',
  haptic = 'medium',
  onPress,
  ...props
}: TouchProps) {
  const scaleValue = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleValue.value }],
  }));

  function onPressIn() {
    scaleValue.set(withSpring(scale));
  }

  function onPressOut() {
    scaleValue.set(withSpring(1));
  }

  function onButtonPress(e: GestureResponderEvent) {
    Haptics.impactAsync(HAPTICS[haptic]);
    onPress?.(e);
  }

  if (animated) {
    return (
      <Animated.View
        style={style}
        layout={LINEAR_TRANSITION}
        entering={ANIMATION_MOVEMENTS[animationDirection].entering}
        exiting={ANIMATION_MOVEMENTS[animationDirection].exiting}
      >
        <AnimatedPressable
          layout={LINEAR_TRANSITION}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onPress={onButtonPress}
          {...props}
          style={[containerStyle, animatedStyle]}
        >
          {props?.children}
        </AnimatedPressable>
      </Animated.View>
    );
  }

  return (
    <Pressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onButtonPress}
      {...props}
      style={({ pressed }) => [
        { opacity: pressed ? 0.8 : 1 },
        typeof containerStyle === 'function'
          ? containerStyle({ pressed, hovered: false })
          : containerStyle,
      ]}
    >
      <View style={style}>{props?.children}</View>
    </Pressable>
  );
}
