import * as Haptics from 'expo-haptics';
import {
  FadeInDown,
  FadeInLeft,
  FadeInUp,
  FadeOutDown,
  FadeOutLeft,
  FadeOutUp,
  LinearTransition,
} from 'react-native-reanimated';

/** Horizontal padding used by full-page screens and their content blocks. */
export const SCREEN_HR_PADDING = 16;

/** CFM self-service page for recovering a username or password. */
export const FORGOT_PASSWORD_LINK =
  'https://cfm-system.com/Pages/UserVerification.aspx';

/**
 * Shared spring configuration for layout transitions. Keeping damping/stiffness in one place
 * makes every animated list/tile feel like part of the same app.
 */
export const DAMPING = 80;
export const STIFFNESS = 200;

export const LINEAR_TRANSITION = LinearTransition.springify()
  .damping(DAMPING)
  .stiffness(STIFFNESS);

/**
 * Enter/exit presets keyed by the direction content should travel. Used by `Touch` when
 * `animated` is set.
 */
export const ANIMATION_MOVEMENTS = {
  right: {
    entering: FadeInLeft.springify().damping(DAMPING).stiffness(STIFFNESS),
    exiting: FadeOutLeft.springify().damping(DAMPING).stiffness(STIFFNESS),
  },
  top: {
    entering: FadeInDown.springify().damping(DAMPING).stiffness(STIFFNESS),
    exiting: FadeOutDown.springify().damping(DAMPING).stiffness(STIFFNESS),
  },
  bottom: {
    entering: FadeInUp.springify().damping(DAMPING).stiffness(STIFFNESS),
    exiting: FadeOutUp.springify().damping(DAMPING).stiffness(STIFFNESS),
  },
};

/** Maps the app's haptic vocabulary to `expo-haptics` impact styles. */
export const HAPTICS = {
  heavy: Haptics.ImpactFeedbackStyle.Heavy,
  light: Haptics.ImpactFeedbackStyle.Light,
  medium: Haptics.ImpactFeedbackStyle.Medium,
  rigid: Haptics.ImpactFeedbackStyle.Rigid,
  soft: Haptics.ImpactFeedbackStyle.Soft,
};
