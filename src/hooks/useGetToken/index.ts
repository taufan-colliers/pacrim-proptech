import { useMutation, useQueryClient } from '@tanstack/react-query';

import apiClient from '@/config/apiClient';
import keychainServices from '@/constants/keychainServices';
import { keychain, queryKeys } from '@/helpers';
import { authentication } from '@/infrastructure';
import { useComponentState } from '@/stores/useComponentState';

export interface GetTokenOptions {
  /** Persist the submitted credentials so the 417 replay can obtain a fresh token. */
  saveCred?: boolean;
  /** Credentials to persist when `saveCred` is true. */
  credential: { username: string; password: string };
}

/**
 * Exchange HTTP Basic credentials for a CFM bearer token.
 *
 * On success the token is written to the Axios default headers and the keychain, the user is
 * marked as logged in, and the cached `/user-info` + client-permission queries are invalidated
 * so they refetch with the new identity.
 *
 * @example
 * const reqGetToken = useGetToken({ saveCred: true, credential });
 * reqGetToken.mutate({ username, password });
 */
export default function useGetToken({ saveCred, credential }: GetTokenOptions) {
  const queryClient = useQueryClient();
  const loginStatusSet = useComponentState((state) => state.loginStatusSet);

  return useMutation({
    mutationKey: queryKeys.loginKey,
    mutationFn: authentication.login,
    onSuccess: async (data) => {
      if (data.accessToken) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
        await keychain.save(keychainServices.bearerToken, data.accessToken);
        if (saveCred)
          await keychain.save(keychainServices.credential, credential);
        loginStatusSet(true);

        queryClient.invalidateQueries({ queryKey: queryKeys.clientActive });
        queryClient.invalidateQueries({ queryKey: queryKeys.userInfo });
      }
    },
  });
}
