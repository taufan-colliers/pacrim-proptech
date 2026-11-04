import { router } from 'expo-router';
import { useCallback, useEffect, useReducer } from 'react';
import { Linking } from 'react-native';

import { FORGOT_PASSWORD_LINK } from '@/constants/components';
import keychainServices from '@/constants/keychainServices';
import { useParentForm } from '@/context/parentForm/formHook';
import { captureError, getVerifiedSession, keychain } from '@/helpers';

import useGetToken from '../useGetToken';

export interface SignInOptions {
  /** Runs after the token is stored, before navigation. Used to kick off the FCM ghost save. */
  onLoginSuccess?: () => void;
}

/**
 * Sign-in screen state: a TanStack form with username/password validation, the reactive
 * password visibility toggle, saved-credential prefill, and post-login routing.
 *
 * After a successful token exchange the screen routes to `/verify-session` when no valid MFA
 * marker exists, otherwise straight to `/` (home). The saved credential is only pre-filled when
 * the keychain still has it.
 *
 * @example
 * const { form, login, loginPending, onForgotPassword } = useSignIn({ onLoginSuccess });
 */
export default function useSignIn(params?: SignInOptions) {
  const { onLoginSuccess } = params || {};

  const [secureTextEntry, secureTextEntryToggle] = useReducer((c) => !c, true);

  const form = useParentForm({
    defaultValues: { username: '', password: '' },
    validators: {
      onChange: ({ value }) => {
        const fields: Record<string, string> = {};
        if (value.username.length < 1)
          fields.username = 'Please enter your username!';

        if (value.username.length < 3)
          fields.username = 'Username should be more than 2 characters!';

        if (value.username.length > 75)
          fields.username = 'Username should be less than 75 characters!';

        if (value.password.length < 1)
          fields.password = 'Please enter your password!';

        if (value.password.length < 3)
          fields.password = 'Password should be more than 2 characters!';

        if (value.password.length > 75)
          fields.password = 'Password should be less than 75 characters!';

        if (Object.keys(fields).length === 0) return undefined;
        return { fields };
      },
    },
    onSubmit: ({ value }) => {
      onLogin(value);
    },
  });

  const reqGetToken = useGetToken({
    saveCred: true,
    credential: {
      username: form.getFieldValue('username'),
      password: form.getFieldValue('password'),
    },
  });

  const loadCredential = useCallback(async () => {
    try {
      const savedCredential = await keychain.getValue(
        keychainServices.credential,
      );
      if (savedCredential) {
        form.setFieldValue('username', savedCredential.value?.username);
        form.setFieldValue('password', savedCredential.value?.password);
      }
    } catch (error) {
      captureError({
        error: error as Error,
        payload: 'Saved credential is not available',
        location: 'LoginScreen/loadCredential',
        extra: JSON.stringify(error),
      });
    }
  }, [form]);

  useEffect(() => {
    loadCredential();
  }, [loadCredential]);

  function onLogin(data: { username: string; password: string }) {
    reqGetToken.mutate(
      {
        password: data.password.trim(),
        username: data.username.trim(),
      },
      {
        onSuccess: async () => {
          onLoginSuccess?.();
          const verifiedSesion = await getVerifiedSession();
          if (verifiedSesion === null) router.replace('/verify-session');
          else router.replace('/');
        },
      },
    );
  }

  function login() {
    form.handleSubmit();
  }

  /** Opens the CFM user-verification page in the system browser. */
  function onForgotPassword() {
    Linking.openURL(FORGOT_PASSWORD_LINK);
  }

  return {
    form,
    login,
    loginPending: reqGetToken.isPending,
    onForgotPassword,
    secureTextEntry,
    secureTextEntryToggle,
  };
}
