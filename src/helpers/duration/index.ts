/**
 * Convert date/time to milliseconds. Avoid manually calculating time conversion in each file.
 *
 * @example
 * duration(3, 'day') // 259200000
 */
export default function duration(time: number, type: 'month' | 'day') {
  switch (type) {
    case 'month':
      return time * 30 * 24 * 60 * 60 * 1000;
    case 'day':
      return time * 24 * 60 * 60 * 1000;

    default:
      return time;
  }
}
