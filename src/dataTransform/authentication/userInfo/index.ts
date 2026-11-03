import parsers from '@/parsers';

import type { UserInfo } from '../../../parsers/authentication/userInfo';
import type { AuthenticationService } from '../../../types/infrastructures/authentication';

/**
 * Fetch and validate the current user's profile.
 */
export default async function userInfo(
  service: AuthenticationService,
): Promise<UserInfo> {
  const { data } = await service.getUserInfo();

  return parsers.authentication.userInfo(data[0]);
}
