import type { PropsWithChildren, ReactNode } from 'react';
import { ActivityIndicator, View } from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOutDown,
  FadeOutUp,
} from 'react-native-reanimated';

import Phrase, { TEXT_STYLES } from '@/components/atoms/Phrase';
import type { TouchProps } from '@/components/atoms/Touch';
import Touch from '@/components/atoms/Touch';
import type { Colors, ColorsKey } from '@/constants/colors';
import useColors from '@/hooks/useColors';

import styles from './styles';

interface Props extends TouchProps {
  /** Animate the swap between the label and the loading indicator. */
  animated?: boolean;
  /** Render in the danger palette. */
  danger?: boolean;
  /** Render in the success palette. */
  safe?: boolean;
  haptic?: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft';
  /** Show the loading indicator and block further presses. */
  loading?: boolean;
  /** Solid (primary), outlined (secondary), or clear (text-like) styling. */
  type?: 'solid' | 'outline' | 'clear';
  /** Custom indicator shown instead of the default spinner. */
  renderLoading?: ReactNode;
  /** Smaller height/padding for inline actions. */
  compact?: boolean;
}

/**
 * Primary action button.
 *
 * String children are automatically styled with the correct label colour for the button type;
 * pass JSX children if you need full control. `loading` implies `disabled`, so a pending
 * mutation cannot be submitted twice.
 *
 * @example
 * <Button haptic="heavy" onPress={login} loading={pending} disabled={!canSubmit}>
 *   Login
 * </Button>
 */
export default function Button({
  animated = true,
  children,
  danger,
  safe,
  disabled,
  haptic = 'medium',
  loading,
  type = 'solid',
  renderLoading,
  compact,
  ...props
}: Props) {
  const colors = useColors();

  const style = styles({ colors, compact });

  const mainColorKey: ColorsKey = danger
    ? 'danger'
    : safe
      ? 'success'
      : 'button-primary';

  const mainColor = colors[mainColorKey];

  const TYPE = {
    solid: type === 'solid',
    outline: type === 'outline',
    clear: type === 'clear',
  };

  return (
    <Touch
      haptic={haptic}
      animated={animated == null ? !TYPE.clear : animated}
      disabled={disabled || loading}
      {...props}
      containerStyle={[
        style.container,
        {
          borderWidth: 1,
          borderColor: TYPE.clear
            ? 'transparent'
            : disabled
              ? colors['disabled-button']
              : mainColor,
          backgroundColor: TYPE.solid
            ? disabled
              ? colors['disabled-button']
              : mainColor
            : 'transparent',
        },
        props.style,
      ]}
    >
      {loading ? (
        <Container animated={animated} loading key={`${animated}-loading`}>
          {renderLoading || (
            <ActivityIndicator
              color={TYPE.solid ? colors.white : colors.primary}
              size={20}
            />
          )}
        </Container>
      ) : typeof children === 'string' ? (
        <Container animated={animated} key={`${animated}-children`}>
          <Phrase
            type="defaultSemiBold"
            color={
              !TYPE.solid
                ? disabled
                  ? 'disabled-button-label'
                  : mainColorKey
                : disabled
                  ? 'disabled-button-solid-label'
                  : 'white'
            }
          >
            {children}
          </Phrase>
        </Container>
      ) : (
        children
      )}
    </Touch>
  );
}

function Container({
  animated,
  children,
  loading,
}: PropsWithChildren<{ animated?: boolean; loading?: boolean }>) {
  if (animated)
    return (
      <Animated.View
        entering={
          loading
            ? FadeInDown.springify().damping(80).stiffness(200)
            : FadeInUp.springify().damping(80).stiffness(200)
        }
        exiting={
          loading
            ? FadeOutDown.springify().damping(80).stiffness(200)
            : FadeOutUp.springify().damping(80).stiffness(200)
        }
      >
        {children}
      </Animated.View>
    );
  return <View>{children}</View>;
}

/**
 * Style array for a button label, for call sites that need to render their own label element.
 */
export function generateButtonLabelStyle({
  type,
  danger,
  safe,
  disabled,
  colors,
}: Pick<Props, 'type' | 'danger' | 'safe' | 'disabled'> & { colors: Colors }) {
  const TYPE = {
    solid: type === 'solid',
    outline: type === 'outline',
    clear: type === 'clear',
  };

  return [
    TEXT_STYLES.defaultSemiBold,
    {
      color: !TYPE.solid
        ? disabled
          ? colors['disabled-button-label']
          : danger
            ? colors.danger
            : safe
              ? colors.success
              : colors['button-primary']
        : colors.white,
    },
  ];
}
