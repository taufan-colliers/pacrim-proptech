import authentication from '@/services/authentication';

import apiClient from '../../config/apiClient';
import keychainServices from '../../constants/keychainServices';
import base64 from '../base64';
import captureError from '../captureError';
import clearStorage from '../clearStorage';
import keychain from '../keychain';

export interface Inputs {
  onSuccess: () => Promise<void> | void;
  onError: () => Promise<void> | void;
}

/**
 * Attempt to refresh the token by replaying the saved credentials.
 *
 * CFM has no refresh-token endpoint, so "refresh" means a fresh Basic-auth call to the same
 * login endpoint. Calls `onSuccess` after the new token is applied and persisted, or `onError`
 * when there is nothing to replay or the request fails.
 *
 * @example
 * await handleExpiredToken({ onSuccess: retry, onError: signOut });
 */
export default async function handleExpiredToken({
  onSuccess,
  onError,
}: Inputs) {
  try {
    const { value: account } =
      (await keychain.getValue(keychainServices.credential)) || {};

    if (account) {
      // Setup API auth token
      const upassToBase64 = base64.encode(
        account?.username + ':' + account?.password,
      );
      const basicAuth = `Basic ${upassToBase64}`;

      // Get access token from API
      const newToken = (await authentication.login(basicAuth, true)).data?.[0]
        ?.accessToken;

      // Set access token to axios instance and store token locally
      if (newToken) {
        apiClient.defaults.headers.common['Authorization'] =
          `Bearer ${newToken}`;
        await keychain.save(keychainServices.bearerToken, newToken);
        await onSuccess();
      }
    } else {
      // Clear any local stored data
      await clearStorage();
      await onError();
    }
  } catch (refreshError) {
    await onError();
    captureError({
      extra: JSON.stringify(refreshError),
      error: refreshError as Error,
      payload: 'Failed to refresh token',
      location: `queryClient/relogin`,
    });
  }
}
