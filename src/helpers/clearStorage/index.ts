import AsyncStorage from '@react-native-async-storage/async-storage';

import keychainServices from '@/constants/keychainServices';

import keychain from '../keychain';

/**
 * Reset every piece of local session state.
 *
 * Clears AsyncStorage (including the zustand store) plus token/session keychain entries.
 * Saved credentials are only removed on an explicit logout so the expired-token replay can
 * keep working across ordinary session expiry.
 */
export default async function clearStorage(isLoggingOut: boolean = false) {
  await AsyncStorage.clear();
  await keychain.deleteValue(keychainServices.bearerToken);
  await keychain.deleteValue(keychainServices.verifiedSesion);
  await keychain.deleteValue(keychainServices.secretKey);
  isLoggingOut && (await keychain.deleteValue(keychainServices.credential));
}
