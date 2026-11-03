import axios, { type AxiosResponse } from 'axios';

import apiClient, { baseURL } from '@/config/apiClient';
import type { LoginInfoResponse } from '@/types/apiResponses';

/**
 * Request a bearer token from the CFM Ticket endpoint.
 *
 * @param Authorization pre-built `Basic <base64(user:pass)>` header.
 * @param plain when true, bypasses `apiClient` interceptors. Required for the 417 replay path,
 * because interceptors would run the same error policy again.
 */
export default function login(
  Authorization: string,
  plain?: boolean,
): Promise<AxiosResponse<LoginInfoResponse[]>> {
  const base = `/token/cfmcrm`;
  if (plain)
    return axios.get(`${baseURL}${base}`, {
      headers: {
        Authorization,
      },
    });
  return apiClient.get(base, {
    headers: {
      Authorization,
    },
  });
}
