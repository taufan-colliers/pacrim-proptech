import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';

import { API_TOKEN_FAILURE } from '@/constants/api';
import {
  captureError,
  clearStorage,
  handleExpiredToken,
  logger,
  toast,
} from '@/helpers';
import { useComponentState } from '@/stores/useComponentState';

type HttpError = { status?: number; message?: string; name?: string };

function showToast(message: string) {
  toast.show({
    type: 'error',
    text: message,
  });
}

/**
 * Build the app-wide React Query client, including the shared auth error policy.
 *
 * - `417` → replay saved credentials (`handleExpiredToken`), then invalidate queries.
 * - `401` → wipe local session and flip `loginStatus` off so the protected layout redirects.
 * - Other errors → toast the server message; Zod failures become "Invalid server response!".
 * - Auth failures are never retried.
 *
 * Keep a single instance per app render tree (create it with `useState` in the root layout).
 */
export default function createQueryClient(): QueryClient {
  let queryClient: QueryClient;

  function resetSession() {
    queryClient.resetQueries();
    queryClient.removeQueries();
    queryClient.clear();
  }

  async function handleInvalidCredential() {
    await clearStorage();
    useComponentState.getState().loginStatusSet(false);
    resetSession();
  }

  function handleAuthError(
    error: unknown,
    kind: 'query' | 'mutation',
    queryKey?: readonly unknown[],
  ) {
    const status = (error as HttpError)?.status;
    const loginStatusSet = useComponentState.getState().loginStatusSet;

    if (status === API_TOKEN_FAILURE.expired) {
      handleExpiredToken({
        onSuccess() {
          loginStatusSet(true);
          queryClient.invalidateQueries();
        },
        onError() {
          loginStatusSet(false);
          resetSession();
        },
      });
    } else if (status === API_TOKEN_FAILURE.unauthorized) {
      handleInvalidCredential();
      if (kind === 'mutation') showToast((error as HttpError)?.message ?? 'Invalid credentials!');
    } else if (error instanceof Error && error.name === 'ZodError') {
      showToast('Invalid server response!');
    } else {
      showToast((error as HttpError)?.message || 'Something went wrong');
    }

    if (kind === 'query' && queryKey) {
      logger(queryKey, 'queryKey', 'queryClient/handleAuthError', 'error');
    }
  }

  queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry(failureCount, error) {
          const status = (error as HttpError)?.status;
          if (
            status === API_TOKEN_FAILURE.unauthorized ||
            status === API_TOKEN_FAILURE.expired
          )
            return false;
          return failureCount < 2;
        },
      },
    },
    mutationCache: new MutationCache({
      onError: (error) => {
        captureError({
          extra: JSON.stringify(error),
          error: error as Error,
          payload: 'Mutation failed',
          location: 'mutationCache',
          attributes: { queryType: 'mutation' },
        });

        handleAuthError(error, 'mutation');
      },
    }),
    queryCache: new QueryCache({
      onError: (error, query) => {
        captureError({
          error: error as Error,
          payload: 'Query failed',
          extra: query.queryKey,
          location: 'queryCache',
          attributes: {
            queryKey: JSON.stringify(query.queryKey),
            queryType: 'query',
          },
        });

        handleAuthError(error, 'query', query.queryKey);

        if (query.state.data !== undefined) {
          logger(
            `Something went wrong: ${(error as Error).message}`,
            null,
            'queryClient/if',
            'error',
          );
        }
      },
    }),
  });

  return queryClient;
}
