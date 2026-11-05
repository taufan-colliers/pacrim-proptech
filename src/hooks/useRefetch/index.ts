import { useState } from 'react';

/**
 * Wrap a React Query `refetch` so pull-to-refresh can show its spinner independently from
 * background refetches.
 *
 * @example
 * const { isRefetchingByUser, refetchByUser } = useRefetch(query.refetch);
 * <RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />
 */
export default function useRefetch(refetch: () => Promise<unknown>) {
  const [isRefetchingByUser, setIsRefetchingByUser] = useState(false);

  async function refetchByUser() {
    setIsRefetchingByUser(true);

    try {
      await refetch();
    } finally {
      setIsRefetchingByUser(false);
    }
  }

  return {
    isRefetchingByUser,
    refetchByUser,
  };
}
