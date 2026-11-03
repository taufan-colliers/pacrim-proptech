import type authentication from '@/services/authentication';
import type { OTPPayload } from '@/types/apiRequests';

/**
 * Narrow port of the auth service, used by `dataTransform` so request shaping stays independent
 * of Axios.
 */
export interface AuthenticationService {
  login: (auth: string) => ReturnType<typeof authentication.login>;
  getUserInfo: () => ReturnType<typeof authentication.userInfo>;
  verifyOTP: (data: OTPPayload) => ReturnType<typeof authentication.verifyOTP>;
  getAccessList: () => ReturnType<typeof authentication.accessList>;
}
