import type { AxiosResponse } from 'axios';

import apiClient from '../../../config/apiClient';
import type { UserAccessResponse } from '../../../types/apiResponses';

/**
 * List the CFM apps the current user may access; drives the Home tile grid.
 */
export default function accessList(): Promise<
  AxiosResponse<UserAccessResponse[]>
> {
  return apiClient.get('/user-accessList');
}
