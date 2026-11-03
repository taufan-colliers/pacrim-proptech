import type { AxiosError } from 'axios';

import logger from '@/helpers/logger';

const LOCATION = 'config/apiClient/interceptors/error/index.ts';

/**
 * Normalises Axios failures into the error shapes the app expects.
 *
 * 401 becomes `{ message: 'Invalid credentials!', status }`, 417 becomes
 * `{ message: external_message, status }` so the global query/mutation caches can trigger the
 * expired-token replay, and 406 surfaces the first server validation message.
 *
 * @see https://axios-http.com/docs/interceptors
 */
export default function errorInterceptor(error: AxiosError) {
  const statusCode = error?.response ? error.response.status : null;

  if (statusCode === null) return Promise.reject(error);

  if (statusCode === 406) {
    const customError = (error.response?.data as any)?.errors?.[0];
    if (customError) {
      return Promise.reject({
        ...error,
        message:
          customError?.external_message ||
          customError?.internal_message ||
          'Cannot update data',
        statusCode,
      });
    }
    return Promise.reject(error);
  }

  if (statusCode === 417) {
    return Promise.reject({
      message: (error.response?.data as any)?.external_message,
      status: statusCode,
    });
  }

  if (statusCode === 413 || statusCode === 405 || statusCode === 403) {
    return Promise.reject(error);
  }

  if (statusCode === 401) {
    return Promise.reject({
      message: 'Invalid credentials!',
      status: statusCode,
    });
  }

  if (statusCode >= 500) {
    if ((error.response?.data as any)?.message) {
      return Promise.reject({
        ...error,
        message: (error.response?.data as any).message,
      });
    }
    return Promise.reject(error);
  }

  if (statusCode === 400) {
    if (error?.response?.data) return Promise.reject(error.response.data);
    return Promise.reject(error);
  }

  if (statusCode === 422) {
    logger(
      'Unable to process the request',
      undefined,
      `${LOCATION}/422`,
      'error',
    );
    return;
  }

  return Promise.reject(error);
}
