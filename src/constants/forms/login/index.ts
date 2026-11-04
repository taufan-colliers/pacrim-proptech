import type { InputProps } from '@/types/components/form';

/**
 * Default props for each field on the sign-in form. Keyed by the field name used in
 * `useSignIn`'s `defaultValues`.
 */
const login: Record<string, InputProps> = {
  username: {
    maxLength: 71,
    label: 'Username',
    placeholder: 'Enter your username',
    autoCapitalize: 'none',
    autoFocus: true,
    returnKeyLabel: 'next',
    returnKeyType: 'next',
  },
  password: {
    maxLength: 23,
    placeholder: 'Enter your password',
    label: 'Password',
    autoCapitalize: 'none',
  },
};

export default login;
