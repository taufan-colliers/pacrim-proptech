import type { InternalAxiosRequestConfig } from 'axios';

/**
 * Pass-through request interceptor kept as the extension point for per-URL auth exclusions.
 *
 * @see https://axios-http.com/docs/interceptors
 */
export default function requestInterceptor(config: InternalAxiosRequestConfig) {
  return config;
}
