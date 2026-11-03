import { create } from 'axios';

import {
  errorInterceptor,
  requestInterceptor,
  responseInterceptor,
} from './interceptors';

/**
 * Shared Axios instance for every CFM API call.
 *
 * The bearer token is attached by mutating `apiClient.defaults.headers.common.Authorization`
 * after sign-in (see `useGetToken`) and re-attached on cold start (see `useHydrated`).
 */
const apiClient = create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

apiClient.interceptors.response.use(responseInterceptor, errorInterceptor);
apiClient.interceptors.request.use(requestInterceptor, errorInterceptor);

export default apiClient;

export const baseURL = process.env.EXPO_PUBLIC_API_URL;
