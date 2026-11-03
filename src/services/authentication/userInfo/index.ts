import type { AxiosResponse } from 'axios';

import apiClient from '../../../config/apiClient';
import type { UserInfoResponse } from '../../../types/apiResponses';

/**
 * Fetch the signed-in user's profile, role flags and client.
 */
export default function userInfo(): Promise<AxiosResponse<UserInfoResponse[]>> {
  return apiClient.get('/user-info');
}
