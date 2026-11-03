import type { LoginPayload } from '@/types/apiRequests';

import type { AuthenticationService } from '../../types/infrastructures/authentication';
import accessList from './accessList';
import login from './login';
import userInfo from './userInfo';
import verifyOTP from './verifyOTP';

/**
 * Compose the auth use-cases on top of a service, so callers get parsed domain data.
 */
export default function authentication(service: AuthenticationService) {
  return {
    getAccessList: () => accessList(service),
    getUserInfo: () => userInfo(service),
    login: (auth: LoginPayload) => login(service, auth),
    verifyOTP: (otp: string) => verifyOTP(service, otp),
  };
}
