import { useMemo, useRef, useState } from 'react';
import { Keyboard, type TextInputInstance } from 'react-native';

export interface OTPInputOptions {
  autoFocus?: boolean;
  blurOnFilled?: boolean;
  disabled?: boolean;
  numberOfDigits?: number;
  onBlur?: () => void;
  onFilled?: (text: string) => void;
  onFocus?: () => void;
  onTextChange?: (text: string) => void;
  placeholder?: string;
  type?: 'alpha' | 'numeric' | 'alphanumeric';
}

const regexMap = {
  alpha: /[^a-zA-Z]/,
  numeric: /[^\d]/,
  alphanumeric: /[^a-zA-Z\d]/,
};

/**
 * State machine behind `OTPInput`: tracks the entered digits, the active cell, and fires
 * `onFilled` once the last cell is typed.
 *
 * A single hidden `TextInput` owns the native keyboard; the visible cells are just renderings of
 * its value. That keeps paste, SMS autofill and backspace working without per-cell inputs.
 *
 * @example
 * const { models, actions, forms } = useOTPInput({ numberOfDigits: 6, onFilled });
 */
export default function useOTPInput({
  onTextChange,
  onFilled,
  numberOfDigits = 6,
  disabled,
  autoFocus = true,
  blurOnFilled = true,
  type,
  onFocus,
  onBlur,
  placeholder: _placeholder,
}: OTPInputOptions) {
  const [text, setText] = useState('');
  const focusedInputIndex = text.length;
  const [isFocused, setIsFocused] = useState(autoFocus);
  const inputRef = useRef<TextInputInstance>(null);

  const placeholder = useMemo(
    () =>
      _placeholder?.length === 1
        ? _placeholder.repeat(numberOfDigits)
        : _placeholder,
    [_placeholder, numberOfDigits],
  );

  function handlePress() {
    // Tapping the cells after dismissing the keyboard must bring it back.
    if (!Keyboard.isVisible()) {
      Keyboard.dismiss();
    }
    inputRef.current?.focus();
  }

  function handleTextChange(value: string) {
    if (type && regexMap[type].test(value)) return;
    if (disabled) return;
    setText(value);
    onTextChange?.(value);
    if (value.length === numberOfDigits) {
      onFilled?.(value);
      if (blurOnFilled) inputRef.current?.blur();
    }
  }

  /** Apply a value programmatically (imperative `setValue`), clamping to `numberOfDigits`. */
  function setTextWithRef(value: string) {
    const normalizedValue =
      value.length > numberOfDigits ? value.slice(0, numberOfDigits) : value;
    handleTextChange(normalizedValue);
  }

  function clear() {
    setText('');
  }

  function focus() {
    inputRef.current?.focus();
  }

  function handleFocus() {
    setIsFocused(true);
    onFocus?.();
  }

  function handleBlur() {
    setIsFocused(false);
    onBlur?.();
  }

  return {
    models: { text, inputRef, focusedInputIndex, isFocused, placeholder },
    actions: {
      handlePress,
      handleTextChange,
      clear,
      focus,
      handleFocus,
      handleBlur,
    },
    forms: { setText, setTextWithRef },
  };
}
