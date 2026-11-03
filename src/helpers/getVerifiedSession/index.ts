import keychainServices from '@/constants/keychainServices';

import keychain from '../keychain';
import logger from '../logger';

/**
 * Read the MFA verification marker saved after a successful TOTP check.
 *
 * `expired` is derived from `expire` on every read, so callers never need to compare dates.
 */
export default async function getVerifiedSession(): Promise<
  { idWebUser: number; expired: boolean } | null | undefined
> {
  try {
    const result = await keychain.getValue(keychainServices.verifiedSesion);

    if (result?.value)
      return {
        ...result.value,
        expired: result.value?.expire
          ? new Date().getTime() > result.value?.expire
          : true,
      };
    else if (result === null) return null;
    else return result?.value;
  } catch (error) {
    logger(error, '', 'getVerifiedSession', 'error');
  }
}
