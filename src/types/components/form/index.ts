import type { TextInputProps } from 'react-native';

/** Text input configuration shared by form field definitions such as `loginForm`. */
export interface InputProps extends TextInputProps {
  label?: string;
}
