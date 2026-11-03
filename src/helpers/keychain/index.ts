import * as SecureStore from 'expo-secure-store';

import keychainServices from '@/constants/keychainServices';

import captureError from '../captureError';

/**
 * Save any value to the device keychain, wrapped as `{ value }` so `null`/primitives survive
 * serialisation. Resolves `false` instead of throwing so callers can keep flows non-blocking.
 *
 * @example
 * await keychain.save(keychainServices.bearerToken, accessToken);
 */
async function save(key: string, value: unknown) {
  return await SecureStore.setItemAsync(key, JSON.stringify({ value }))
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

/**
 * Read a keychain value previously saved with `save`.
 *
 * @returns `null` when the key has never been written; otherwise the parsed `{ value }` wrapper.
 */
async function getValue(key: string): Promise<Record<'value', any> | null> {
  try {
    const result = await SecureStore.getItemAsync(key);
    if (result === null) return null;
    else return JSON.parse(result);
  } catch (error) {
    captureError({
      location: 'keychain/getValue',
      payload: 'Cannot get keychain value',
      error: error as Error,
      extra: `cannot get keychain value for key: ${key}`,
    });
    throw error;
  }
}

/**
 * Delete one keychain entry. Resolves `true` when the native delete succeeds.
 */
async function deleteValue(key: string): Promise<boolean> {
  try {
    await SecureStore.deleteItemAsync(key);
    return true;
  } catch (error) {
    captureError({
      location: 'keychain/deleteValue',
      payload: 'Cannot delete keychain',
      error: error as Error,
      extra: `cannot delete keychain for key: ${key}`,
    });
    throw error;
  }
}

/**
 * Delete every key registered in `keychainServices`. Call on logout.
 */
async function clear() {
  try {
    const keys = Object.keys(keychainServices);
    Promise.all(
      keys.map(async (key) => {
        await deleteValue(key);
      }),
    );
  } catch (error) {
    captureError({
      location: 'keychain/clear',
      payload: 'Cannot clear keychains',
      error: error as Error,
      extra: `cannot clear all keychains`,
    });
    throw error;
  }
}

const keychain = { save, getValue, deleteValue, clear };

export default keychain;
