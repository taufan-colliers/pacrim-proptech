import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/helpers';
import type { ClientPermission } from '@/parsers/client/permissions';
import client from '@/services/client';

import useRefetch from '../useRefetch';

/**
 * Fetch the clients the signed-in user can access.
 *
 * Shared by the home header (selected client) and the Company tab (switchable list). Cached
 * forever because permissions only change when the session does; `refetchByUser` lets the list
 * pull-to-refresh without flickering on background refetches.
 *
 * @example
 * const reqClientActive = useClientActive();
 * reqClientActive.data?.length;
 */
export default function useClientActive<T = ClientPermission[]>(
  select?: (data: ClientPermission[]) => T | undefined,
) {
  const query = useQuery({
    queryKey: queryKeys.clientActive,
    queryFn: client.clientPermission,
    select,
    staleTime: Infinity,
  });

  const refetchByUser = useRefetch(query.refetch);

  return { ...query, ...refetchByUser };
}

/**
 * Clients sorted with the selected client first, then alphabetically.
 */
export function useClientList() {
  return useClientActive<ClientPermission[]>((data) =>
    data.sort((a, b) => {
      if (a.isSelected === b.isSelected) {
        return a.clientName.localeCompare(b.clientName);
      }
      return a.isSelected ? -1 : 1;
    }),
  );
}

/**
 * The client currently selected for the session, if any.
 */
export function useCurrentClient() {
  return useClientActive<ClientPermission>((clients) =>
    clients.find((client) => client.isSelected),
  );
}
