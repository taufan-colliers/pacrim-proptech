import { useState } from 'react';

import keychainServices from '@/constants/keychainServices';
import { duration, keychain } from '@/helpers';

import useUserInfo from '../useUserInfo';
import useVerifyOTP from '../useVerifyOTP';

export interface VerifyOTPInputOptions {
  idWebUser: number;
  /** Called when the entered code is rejected, so the screen can clear and refocus the input. */
  onError: () => void;
  /** Called after a valid code is saved, or immediately when MFA is not required. */
  onVerified: () => void;
}

/**
 * Wire the OTP input to the verification mutation and the local MFA marker.
 *
 * A successful verification writes `verifiedSesion` to the keychain with an expiry derived from
 * the server's `mfaExpiryPeriod` (days, defaulting to 120). The protected layout reads that
 * marker on cold start instead of prompting again.
 *
 * @example
 * const { OTP, onFilled, verifyCode, pending } = useVerifyOTPInput({ idWebUser, ... });
 */
export default function useVerifyOTPInput({
  idWebUser,
  onError,
  onVerified,
}: VerifyOTPInputOptions) {
  const [OTP, OTPSet] = useState<string>();

  const reqUserInfo = useUserInfo();
  const expiryTime = reqUserInfo.data?.mfaExpiryPeriod;

  const reqVerifyOTP = useVerifyOTP();

  async function verifiedSession() {
    await keychain.save(keychainServices.verifiedSesion, {
      idWebUser,
      expire: new Date().getTime() + duration(expiryTime ?? 120, 'day'),
    });

    onVerified();
  }

  function verifyCode(otp: string) {
    if (otp && otp.length === 6)
      reqVerifyOTP.mutate(otp, {
        onSuccess(data) {
          if (data) verifiedSession();
        },
        onError,
      });
  }

  function onFilled(otp: string) {
    verifyCode(otp);
    OTPSet(otp);
  }

  return { onFilled, OTP, verifyCode, pending: reqVerifyOTP.isPending };
}
