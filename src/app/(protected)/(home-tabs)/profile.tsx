import { ScrollView, View } from 'react-native';

import { Gap, Phrase, Touch } from '@/components/atoms';
import { Button } from '@/components/molecules';
import { Screen } from '@/components/organisms';
import { SCREEN_HR_PADDING } from '@/constants/components';
import { useLogout, useTheme, useUserInfo } from '@/hooks';
import { useComponentState } from '@/stores/useComponentState';

/**
 * Profile tab placeholder.
 *
 * Shows the profile fields the authenticated shell already has and keeps the theme toggle and
 * logout actions available. The full settings/privacy sections come with the profile feature.
 */
export default function ProfileScreen() {
  const logout = useLogout();
  const reqUserInfo = useUserInfo();
  const role = useComponentState((state) => state.role);
  const { themePref, toggleTheme } = useTheme();

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ padding: SCREEN_HR_PADDING }}>
        <Phrase type="subheading" color="primary">
          Profile
        </Phrase>
        <Gap vertical={12} />
        <Phrase type="defaultSemiBold">
          {reqUserInfo.data?.personName ?? '-'}
        </Phrase>
        <Phrase type="content">{reqUserInfo.data?.emailAddress ?? '-'}</Phrase>
        <Phrase type="content">
          {reqUserInfo.data?.companyName ?? '-'}
        </Phrase>
        <Phrase type="caption" color="description">
          {role ?? 'user'}
        </Phrase>
        <Gap vertical={16} />
        <Touch onPress={toggleTheme}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Phrase type="content">Color Theme</Phrase>
            <Phrase type="defaultSemiBold" color="primary">
              {themePref === 'light'
                ? 'Light'
                : themePref === 'dark'
                  ? 'Dark'
                  : 'System'}
            </Phrase>
          </View>
        </Touch>
        <Gap vertical={24} />
        <Button type="clear" danger onPress={logout}>
          Logout
        </Button>
        <Gap vertical={8} />
        <Phrase type="caption" color="app-version-text" align="center">
          Copyright © 2025 PT. Colliers International Indonesia
        </Phrase>
      </ScrollView>
    </Screen>
  );
}
