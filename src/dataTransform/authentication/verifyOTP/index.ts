import type { AuthenticationService } from '@/types/infrastructures/authentication';

/**
 * Submit a TOTP code. Success is either an explicit `"success"` message or HTTP 200.
 */
export default async function verifyOTP(
  services: AuthenticationService,
  otp: string,
) {
  const { data, status } = await services.verifyOTP({ otp });

  return data.message === 'success' || status === 200;
}
