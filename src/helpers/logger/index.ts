/**
 * Log events in the terminal with timestamp. No-op in production builds.
 *
 * @example
 * // ✅ useFcmToken 9:54:35 AM 629
 * // FCM Token Saved
 */
export default function logger(
  payload: unknown,
  extra?: unknown,
  location?: string,
  type: 'success' | 'error' | 'warn' = 'success',
) {
  if (payload && __DEV__) {
    const date = new Date();
    console.log('====================');
    console.log(
      type === 'success' ? '✅' : type === 'error' ? '🔥' : '🌝',
      location || '',
      date.toLocaleTimeString(),
      date.getMilliseconds(),
    );
    console.log(payload);
    if (extra) {
      console.log(extra);
    }
    console.log('====================');
  }
}
