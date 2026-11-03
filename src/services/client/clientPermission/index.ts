import apiClient from '../../../config/apiClient';
import parsers from '../../../parsers';
import type { ClientPermission } from '../../../parsers/client/permissions';
import type { ClientPermissionResponse } from '../../../types/apiResponses';

/**
 * Fetch the clients the user can switch to, parsed and validated per entry.
 */
export default async function clientPermission(): Promise<ClientPermission[]> {
  const { data } = await apiClient.get('/client-permissions');
  return data?.map((client: ClientPermissionResponse) =>
    parsers.client.permissions(client),
  );
}
