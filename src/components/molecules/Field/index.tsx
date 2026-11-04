import { forwardRef, useEffect, type ReactNode } from 'react';
import {
  TextInput,
  View,
  type GestureResponderEvent,
  type TextInputFocusEvent,
  type TextInputInstance,
  type TextInputProps,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import Phrase from '@/components/atoms/Phrase';
import Touch from '@/components/atoms/Touch';
import useTheme from '@/hooks/useTheme';

import FieldLabel from '../FieldLabel';
import styles from './styles';

export interface FieldProps extends TextInputProps {
  /** Render as a non-editable pressable that displays `defaultPlaceholder`. */
  asButton?: boolean;
  /** Text shown when `asButton` is true and there is no value. */
  defaultPlaceholder?: string;
  /** Disable interaction; only meaningful when `asButton` is true. */
  disabled?: boolean;
  editable?: boolean;
  /** Message rendered under the input when `isError` is true. */
  error?: string;
  /** Switches the border to the danger colour and shows `error`. */
  isError?: boolean;
  label?: string | ReactNode;
  onPress?: (e: GestureResponderEvent) => void;
  /** Show a red asterisk next to the label. */
  required?: boolean;
  /** Control rendered on the right edge of the input. */
  rightIcon?: ReactNode;
  /** Separate press handler for `rightIcon`; defaults to `onPress`. */
  rightIconPress?: () => void;
  testIDRightIcon?: string;
}

/**
 * Standard text input across CFM screens.
 *
 * The border animates between the default, focused (primary) and error colours. With
 * `asButton` the same visual shell becomes a picker-like touch target: the inner input is
 * disabled and the whole field calls `onPress`.
 *
 * @example
 * <Field
 *   ref={ref}
 *   label="Password"
 *   secureTextEntry
 *   rightIcon={<Icon name="eye" color="#333" />}
 *   rightIconPress={toggleVisibility}
 * />
 */
const Field = forwardRef<TextInputInstance, FieldProps>(
  (
    {
      asButton,
      defaultPlaceholder,
      disabled,
      editable = true,
      error,
      isError,
      label,
      onPress,
      required,
      rightIcon,
      rightIconPress,
      testIDRightIcon,
      ...props
    },
    ref,
  ) => {
    const { colors } = useTheme();
    const defaultBorder = colors['field-border-default'];
    const danger = colors.danger;

    const borderColor = useSharedValue(defaultBorder);

    const animatedContainerStyle = useAnimatedStyle(() => ({
      borderColor: borderColor.value,
    }));

    useEffect(() => {
      borderColor.value = withTiming(isError ? danger : defaultBorder);
    }, [isError, danger, defaultBorder, borderColor]);

    useEffect(() => {
      borderColor.value = defaultBorder;
    }, [defaultBorder, borderColor]);

    function onFocus(event: TextInputFocusEvent) {
      props?.onFocus?.(event);
      borderColor.value = withTiming(isError ? danger : colors.primary);
    }

    function onBlur(event: TextInputFocusEvent) {
      props?.onBlur?.(event);
      borderColor.value = withTiming(isError ? danger : defaultBorder);
    }

    return (
      <View style={styles.container}>
        {label && (
          <FieldLabel required={required && typeof label === 'string'}>
            {label}
          </FieldLabel>
        )}
        <Touch
          onPress={onPress}
          disabled={
            editable ? (disabled !== undefined ? disabled : !asButton) : true
          }
        >
          <Animated.View
            style={[
              animatedContainerStyle,
              {
                backgroundColor: colors['field-bg'],
                height: 56,
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                borderRadius: 16,
                borderWidth: 2,
                paddingHorizontal: 12,
              },
            ]}
          >
            <TextInput
              {...props}
              allowFontScaling={false}
              style={[
                props.style,
                {
                  color:
                    editable === false || (asButton && disabled)
                      ? colors['disabled-input'] || colors.placeholderInput
                      : colors.text,
                  flex: 1,
                  paddingHorizontal: 0,
                  paddingVertical: 8,
                },
              ]}
              editable={asButton ? false : editable}
              onBlur={onBlur}
              onFocus={onFocus}
              onPress={disabled || !editable ? undefined : onPress}
              placeholderTextColor={colors.placeholderInput}
              ref={ref}
              removeClippedSubviews
              placeholder={
                editable === false
                  ? ''
                  : asButton
                    ? defaultPlaceholder
                    : props.placeholder
              }
            />
            {rightIcon && (
              <Touch
                testID={testIDRightIcon}
                onPress={rightIconPress || onPress}
                disabled={asButton ? disabled : false}
                style={{ paddingLeft: 16 }}
              >
                {rightIcon}
              </Touch>
            )}
          </Animated.View>
        </Touch>
        {isError && <Phrase style={{ color: colors.danger }}>{error}</Phrase>}
      </View>
    );
  },
);

Field.displayName = 'Field';

export default Field;
