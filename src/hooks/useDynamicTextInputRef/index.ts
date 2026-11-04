import { useRef } from 'react';
import type { TextInputInstance } from 'react-native';

/**
 * Keep a ref for each named text input so one field can move focus to the next.
 *
 * @example
 * const { registerRef, focusField } = useDynamicTextInputRef();
 * <Field ref={registerRef('password')} onSubmitEditing={() => focusField('password')} />
 */
export default function useDynamicTextInputRef() {
  const inputRefs = useRef<Record<string, TextInputInstance | null>>({});

  function registerRef(name: string) {
    return (ref: TextInputInstance | null) => {
      inputRefs.current[name] = ref;
    };
  }

  function focusField(name: string) {
    inputRefs.current[name]?.focus();
  }

  return { registerRef, focusField };
}
