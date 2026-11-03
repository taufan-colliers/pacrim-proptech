/**
 * Keys used with `expo-secure-store`.
 *
 * Keep this list in sync with the keys returned by `keychain.clear()`; every key here is
 * deleted on logout.
 */
const keychainServices = {
  bearerToken: 'bearerToken',

  credential: 'credential',

  secretKey: 'secretKey',

  verifiedSesion: 'verifiedSesion',
};

export default keychainServices;
