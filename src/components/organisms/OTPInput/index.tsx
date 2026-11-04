import { forwardRef, useImperativeHandle } from 'react';
import {
  Platform,
  Pressable,
  TextInput,
  View,
  type ColorValue,
  type TextInputProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';

import { Phrase } from '@/components/atoms';
import { VerticalStick } from '@/components/molecules';
import { useOTPInput, useTheme } from '@/hooks';

import styles from './styles';

export interface OTPInputProps {
  autoFocus?: boolean;
  blurOnFilled?: boolean;
  disabled?: boolean;
  focusColor?: ColorValue;
  focusStickBlinkingDuration?: number;
  hideStick?: boolean;
  numberOfDigits?: number;
  onBlur?: () => void;
  onFilled?: (text: string) => void;
  onFocus?: () => void;
  onTextChange?: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  textInputProps?: TextInputProps;
  theme?: Theme;
  type?: 'alpha' | 'numeric' | 'alphanumeric';
}

export interface OTPInputRef {
  clear: () => void;
  focus: () => void;
  setValue: (value: string) => void;
}

export interface Theme {
  containerStyle?: ViewStyle;
  disabledPinCodeContainerStyle?: ViewStyle;
  focusedPinCodeContainerStyle?: ViewStyle;
  focusStickStyle?: ViewStyle;
  pinCodeContainerStyle?: ViewStyle;
  pinCodeTextStyle?: TextStyle;
  placeholderTextStyle?: TextStyle;
}

/**
 * One-time-password input rendered as individual cells over a single hidden `TextInput`.
 *
 * The hidden input receives all typing/paste/autofill events; the cells only visualise the
 * value. When the last digit is entered `onFilled` fires and the keyboard closes.
 *
 * @example
 * const ref = useRef<OTPInputRef>(null);
 * <OTPInput ref={ref} numberOfDigits={6} onFilled={verifyCode} />
 */
const OTPInput = forwardRef<OTPInputRef, OTPInputProps>((props, ref) => {
  const { colors } = useTheme();
  const style = styles({ colors });

  const {
    models: { text, inputRef, focusedInputIndex, isFocused, placeholder },
    actions: {
      clear,
      focus,
      handleBlur,
      handleFocus,
      handlePress,
      handleTextChange,
    },
    forms: { setTextWithRef },
  } = useOTPInput(props);

  const {
    autoFocus = true,
    disabled,
    focusColor = colors['otp-input-focused'],
    focusStickBlinkingDuration,
    hideStick,
    numberOfDigits = 6,
    secureTextEntry = false,
    textInputProps,
    theme = {},
    type = 'numeric',
  } = props;

  const {
    containerStyle,
    disabledPinCodeContainerStyle,
    focusedPinCodeContainerStyle,
    focusStickStyle,
    pinCodeContainerStyle,
    pinCodeTextStyle,
    placeholderTextStyle,
  } = theme;

  useImperativeHandle(ref, () => ({ clear, focus, setValue: setTextWithRef }));

  function generatePinCodeContainerStyle(
    isFocusedContainer: boolean,
    char: string,
  ) {
    const stylesArray = [style.codeContainer, pinCodeContainerStyle];
    if (focusColor && isFocusedContainer) {
      stylesArray.push({ borderColor: focusColor });
    }

    if (focusedPinCodeContainerStyle && isFocusedContainer) {
      stylesArray.push(focusedPinCodeContainerStyle);
    }

    if (char) {
      stylesArray.push(style.containerFilledPinCode);
    }

    if (disabledPinCodeContainerStyle && disabled) {
      stylesArray.push(disabledPinCodeContainerStyle);
    }

    return stylesArray;
  }

  const placeholderStyle = {
    opacity: placeholder ? 0.5 : pinCodeTextStyle?.opacity || 1,
    ...(placeholder ? placeholderTextStyle : []),
  };

  return (
    <View style={[style.container, containerStyle]}>
      {Array(numberOfDigits)
        .fill(0)
        .map((_, index) => {
          const isPlaceholderCell = !!placeholder && !text?.[index];
          const char = isPlaceholderCell
            ? placeholder?.[index] || ' '
            : text[index];
          const isFocusedInput =
            index === focusedInputIndex && !disabled && Boolean(isFocused);
          const isFilledLastInput =
            text.length === numberOfDigits && index === text.length - 1;
          const isFocusedContainer =
            isFocusedInput || (isFilledLastInput && Boolean(isFocused));

          return (
            <Pressable
              disabled={disabled}
              key={`${char}-${index}`}
              onPress={handlePress}
              style={generatePinCodeContainerStyle(isFocusedContainer, char)}
              testID="otp-input"
            >
              {isFocusedInput && !hideStick ? (
                <VerticalStick
                  focusColor={focusColor}
                  style={focusStickStyle}
                  focusStickBlinkingDuration={focusStickBlinkingDuration}
                />
              ) : (
                <Animated.View>
                  <Phrase
                    color={char ? 'primary' : 'text'}
                    style={[
                      style.codeText,
                      pinCodeTextStyle,
                      isPlaceholderCell ? placeholderStyle : {},
                    ]}
                  >
                    {char && secureTextEntry ? '•' : char}
                  </Phrase>
                </Animated.View>
              )}
            </Pressable>
          );
        })}
      <TextInput
        aria-disabled={disabled}
        autoComplete={Platform.OS === 'android' ? 'sms-otp' : 'one-time-code'}
        autoFocus={autoFocus}
        caretHidden={Platform.OS === 'ios'}
        editable={!disabled}
        inputMode={type === 'numeric' ? type : 'text'}
        maxLength={numberOfDigits}
        onBlur={handleBlur}
        onChangeText={handleTextChange}
        onFocus={handleFocus}
        ref={inputRef}
        secureTextEntry={secureTextEntry}
        testID="otp-input-hidden"
        textContentType="oneTimeCode"
        value={text}
        {...textInputProps}
        style={[style.hiddenInput, textInputProps?.style]}
      />
    </View>
  );
});

OTPInput.displayName = 'OTPInput';

export default OTPInput;
