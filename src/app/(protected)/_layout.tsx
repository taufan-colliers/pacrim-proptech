import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Redirect, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import apiClient from '@/config/apiClient';
import { API_TOKEN_FAILURE } from '@/constants/api';
import keychainServices from '@/constants/keychainServices';
import {
  clearStorage,
  getToken,
  getVerifiedSession,
  handleExpiredToken,
  keychain,
  queryKeys,
} from '@/helpers';
import { useColors, useHydrated } from '@/hooks';
import { authentication } from '@/infrastructure';
import { useComponentState } from '@/stores/useComponentState';

/**
 * Validate the persisted session before rendering any protected route.
 *
 * Runs once per app load: attaches the saved bearer token, then checks the token, the MFA
 * marker and `/user-info`. A 417 is replayed once with the saved credential here; every other
 * failure clears local session state and redirects to `/sign-in`.
 *
 * TODO(replace-firebase): the source app also subscribed to FCM `onMessage` here to display
 * local notifications. That returns with the Firebase phase.
 */
export default function ProtectedLayout() {
  const colors = useColors();
  const hasHydrated = useHydrated();

  const loginStatus = useComponentState((state) => state.loginStatus);
  const loginStatusSet = useComponentState((state) => state.loginStatusSet);
  const queryClient = useQueryClient();

  const authCheck = useQuery({
    queryKey: queryKeys.authCheck,
    queryFn: async () => {
      try {
        // A logged-out cold start has nothing to validate; avoid a guaranteed 401.
        if (!useComponentState.getState().loginStatus) return false;

        if (!apiClient.defaults.headers.common.Authorization) {
          const saved = await keychain.getValue(keychainServices.bearerToken);
          if (saved?.value) {
            apiClient.defaults.headers.common.Authorization = `Bearer ${saved.value}`;
          }
        }

        const token = await getToken();
        const verified = await getVerifiedSession();
        const data = await authentication.getUserInfo();

        // Prime the shared profile query so screens (CFM header/callout) render without a
        // second `/user-info` round trip.
        if (data) queryClient.setQueryData(queryKeys.userInfo, data);

        /**
         * Authentication is valid if:
         * + a token exists,
         * + MFA is not required or the MFA marker has not expired,
         * + the store says the login completed, and
         * + `/user-info` returned a profile.
         */
        return Boolean(
          token &&
            (data?.isMFARequired === true ? verified?.expired === false : true) &&
            useComponentState.getState().loginStatus &&
            data,
        );
      } catch (error) {
        // 417 means the saved token expired: replay the saved credential once, exactly like
        // the source splash screen. Other statuses (including 401) fall through to the shared
        // React Query auth policy.
        if (
          (error as { status?: number })?.status === API_TOKEN_FAILURE.expired
        ) {
          let valid = false;

          await handleExpiredToken({
            onSuccess() {
              useComponentState.getState().loginStatusSet(true);
              valid = true;
            },
            onError() {
              valid = false;
            },
          });

          return valid;
        }

        throw error;
      }
    },
    enabled: hasHydrated,
    retry: false,
  });

  const settled = !authCheck.isPending;

  useEffect(() => {
    if (settled) SplashScreen.hide();
  }, [settled]);

  useEffect(() => {
    if (!settled || authCheck.data === true) return;

    loginStatusSet(false);
    apiClient.defaults.headers.common.Authorization = '';
    clearStorage();
  }, [settled, authCheck.data, loginStatusSet]);

  if (!settled) return null;

  if (!loginStatus || authCheck.data !== true) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
