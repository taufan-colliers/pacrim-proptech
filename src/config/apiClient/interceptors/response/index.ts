import type { AxiosResponse } from 'axios';

/**
 * Turns a 404-shaped success response into a rejected promise so callers can use one error path.
 *
 * @see https://axios-http.com/docs/interceptors
 */
export default function responseInterceptor(response: AxiosResponse) {
  if (response.status === 404) {
    const customError = new Error(response?.data?.message || 'Error 404');
    return Promise.reject(customError);
  }

  return response;
}
