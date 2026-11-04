import { useQuery } from '@tanstack/react-query';

import apiClient from '@/config/apiClient';
import { queryKeys } from '@/helpers';
import { authentication } from '@/infrastructure';

/**
 * Fetch the signed-in user's profile (role flags, MFA requirement, client/employee ids).
 *
 * Disabled until `useGetToken` has attached a bearer token. Cached forever because a profile
 * only changes when the session does; the login mutation invalidates it.
 *
 * @example
 * const reqUserInfo = useUserInfo();
 * reqUserInfo.data?.isMFARequired;
 */
export default function useUserInfo() {
  return useQuery({
    staleTime: Infinity,
    queryKey: queryKeys.userInfo,
    queryFn: authentication.getUserInfo,
    enabled: !!apiClient.defaults.headers.common['Authorization'],
  });
}
