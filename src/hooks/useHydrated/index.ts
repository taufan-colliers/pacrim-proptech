import { useEffect } from 'react';

import apiClient from '../../config/apiClient';
import { getToken } from '../../helpers';
import { useComponentState } from '../../stores/useComponentState';
import useClearSession from '../useClearSession';

/**
 * Wait for the persisted store to hydrate, then re-attach the saved bearer token to the Axios
 * client. If the store says the user is logged in but no token exists, clear the stale session.
 *
 * @returns `true` once AsyncStorage hydration is complete.
 */
export default function useHydrated() {
  const hasHydrated = useComponentState((state) => state._hasHydrated),
    loginStatus = useComponentState((state) => state.loginStatus),
    loginStatusSet = useComponentState((state) => state.loginStatusSet),
    clearSession = useClearSession();

  useEffect(() => {
    async function checkRoute() {
      const token = await getToken();
      if (token && loginStatus) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        clearSession();
        loginStatusSet(false);
      }
    }

    if (hasHydrated) checkRoute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasHydrated]);

  return hasHydrated;
}
