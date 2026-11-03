import parsers from '@/parsers';
import type { LoginPayload } from '@/types/apiRequests';

import { base64 } from '../../../helpers';
import type { LoginInfo } from '../../../parsers/authentication/login';
import type { AuthenticationService } from '../../../types/infrastructures/authentication';

/**
 * Turn username/password into the HTTP Basic header the token endpoint expects, then validate
 * the returned token.
 */
export default async function login(
  service: AuthenticationService,
  { username, password }: LoginPayload,
): Promise<LoginInfo> {
  const upassToBase64 = base64.encode(username + ':' + password),
    basicAuth = `Basic ${upassToBase64}`;

  const { data } = await service.login(basicAuth);

  return parsers.authentication.login(data[0]);
}
