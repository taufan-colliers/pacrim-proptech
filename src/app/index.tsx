import { Redirect } from 'expo-router';
import { View } from 'react-native';

import { Phrase } from '@/components/atoms';
import { Button } from '@/components/molecules';
import { Screen } from '@/components/organisms';
import { useLogout } from '@/hooks';
import { useComponentState } from '@/stores/useComponentState';

/**
 * Temporary landing route after login.
 *
 * Phase 1b replaces this file with the protected shell and the `(home-tabs)` home screen;
 * for now it proves the session gate works and offers a way to sign out.
 */
export default function HomeScreen() {
  const loginStatus = useComponentState((state) => state.loginStatus);
  const role = useComponentState((state) => state.role);
  const logout = useLogout();

  if (!loginStatus) return <Redirect href="/sign-in" />;

  return (
    <Screen>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          gap: 16,
          padding: 24,
        }}
      >
        <Phrase type="title">Home</Phrase>
        <Phrase type="content">Signed in as {role ?? 'user'}.</Phrase>
        <Phrase type="caption">
          The consolidated home tabs land in Phase 1b.
        </Phrase>
        <Button type="outline" onPress={logout}>
          Logout
        </Button>
      </View>
    </Screen>
  );
}
