import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { Role, ThemePreference } from '@/types/components/general';

interface ComponentState {
  _hasHydrated: boolean;
  role: Role;
  changeRole: (role: Role) => void;
  loginStatus: boolean;
  loginStatusSet: (status: boolean) => void;
  rememberLoginCred: boolean;
  rememberLoginCredSet: (status: boolean) => void;
  setHasHydrated: (status: boolean) => void;
  themePref: ThemePreference;
  themePrefSet: (theme: ThemePreference) => void;
}

/**
 * Persisted app-wide UI/auth state.
 *
 * `loginStatus` is the gate the protected layout reads: it is only `true` after a successful
 * login (and, in the source app, after the FCM token was saved). `_hasHydrated` tells the root
 * layout that AsyncStorage has been read, which prevents a login flash on cold start.
 */
export const useComponentState = create<ComponentState>()(
  persist(
    (set) => ({
      role: null,
      changeRole(role) {
        set({ role });
      },
      _hasHydrated: false,
      loginStatus: false,
      rememberLoginCred: true,
      themePref: 'light',
      themePrefSet(themePref) {
        set({ themePref });
      },
      loginStatusSet(status) {
        set({ loginStatus: status });
      },
      rememberLoginCredSet(remember) {
        set({ rememberLoginCred: remember });
      },
      setHasHydrated: (state) => {
        set({
          _hasHydrated: state,
        });
      },
    }),
    {
      name: 'pacrim-proptech-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: (state) => {
        return () => state.setHasHydrated(true);
      },
    },
  ),
);
