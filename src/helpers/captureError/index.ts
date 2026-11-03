import logger from '../logger';

export interface Props {
  payload: unknown;
  extra?: unknown;
  location: string;
  error?: Error;
  log?: string;
  attributes?: { [key: string]: string };
}

/**
 * Central error logger. Writes to the terminal logger for now; remote crash reporting
 * (Firebase Crashlytics) can be wired here later without touching call sites.
 */
async function captureError({
  extra,
  location,
  payload,
  error,
  log,
  attributes,
}: Props) {
  logger(payload, JSON.stringify({ error, extra, log, attributes }), location, 'error');
}

export default captureError;
