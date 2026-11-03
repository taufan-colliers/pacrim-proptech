import keychainServices from '@/constants/keychainServices';

import keychain from '../keychain';

/**
 * Read the stored API access token.
 *
 * @returns the bearer token, or `undefined` when the user has no saved session.
 */
export default async function getToken(): Promise<string | undefined> {
  const result = await keychain.getValue(keychainServices.bearerToken);
  return result?.value;
}
