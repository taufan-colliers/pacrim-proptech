import { useMutation } from '@tanstack/react-query';

import { useComponentState } from '@/stores/useComponentState';

/**
 * Report the device's push token to CFM and, once settled, mark the session as fully logged in.
 *
 * TODO(replace-firebase): ghost implementation. The source app obtained an FCM token with
 * `@react-native-firebase/messaging` and posted it to `/fcm-token/cfmcrm`. Firebase has no
 * project for this app's bundle ids yet, so the mutation resolves without a request while
 * keeping the call site and `loginStatus` transition identical. Replace the body when the
 * Firebase project is configured.
 *
 * @example
 * const reqSaveFCMToken = useSaveFCMToken();
 * reqSaveFCMToken.mutate();
 */
export default function useSaveFCMToken() {
  const loginStatusSet = useComponentState((state) => state.loginStatusSet);

  return useMutation({
    mutationFn: async (): Promise<void> => {
      // TODO(replace-firebase): call notification.saveFCMToken(fcmToken) here.
    },
    onSettled: () => {
      loginStatusSet(true);
    },
  });
}
