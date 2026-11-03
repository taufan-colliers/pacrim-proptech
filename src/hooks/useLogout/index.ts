import { useComponentState } from '@/stores/useComponentState';

import useClearSession from '../useClearSession';

/**
 * Returns an async logout action that clears the session (including saved credentials) and
 * flips `loginStatus` to false, which makes the protected layout redirect to sign-in.
 */
export default function useLogout() {
  const loginStatusSet = useComponentState((state) => state.loginStatusSet);
  const clearSession = useClearSession(true);

  return async function () {
    await clearSession();
    loginStatusSet(false);
  };
}
