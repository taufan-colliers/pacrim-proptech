import { useQueryClient } from '@tanstack/react-query';

import apiClient from '@/config/apiClient';
import { clearStorage } from '@/helpers';

/**
 * Clear every trace of the current session: React Query cache, the Authorization header and
 * AsyncStorage/keychain.
 *
 * Saved credentials are only deleted when `isLoggingOut` is true, so the 417 replay path can
 * still reuse them after a token expiry.
 */
export default function useClearSession(isLoggingOut: boolean = false) {
  const queryClient = useQueryClient();

  async function clearSession() {
    queryClient.removeQueries();
    queryClient.clear();
    apiClient.defaults.headers.common.Authorization = '';
    await clearStorage(isLoggingOut);
  }

  return clearSession;
}
