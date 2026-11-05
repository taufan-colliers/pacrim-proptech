import { router } from 'expo-router';
import { View } from 'react-native';

import { Callout, MainSquareMenuTile } from '@/components/molecules';
import { HomeHeader, Screen } from '@/components/organisms';
import { SCREEN_HR_PADDING } from '@/constants/components';
import { CFM_MENU } from '@/constants/cfmMenu';
import { logAnalytic } from '@/helpers';
import { useUserInfo } from '@/hooks';

/**
 * CFM service menu, mirroring `cfm-ticket/app/(protected)/(home-tabs)/index.tsx`.
 *
 * The tile list is hardcoded in `CFM_MENU` for this phase (it used to come from
 * `useGetAccessList`). CFM Asset and CFM Inspector open in-app placeholders instead of the
 * old `cfmam://` / `cfmfi://` deep links.
 */
export default function CfmHomeScreen() {
  const reqUserInfo = useUserInfo();

  function onNotificationPress() {
    router.navigate('/notifications/general');
  }

  function onTapClientName() {
    router.navigate('/clients');
  }

  function onMenuPress(item: (typeof CFM_MENU)[number]) {
    if (item.key === 'cfmfi') logAnalytic('OPEN_CFM_INSPECT', undefined);
    if (item.key === 'cfmam') logAnalytic('OPEN_CFM_ASSET', undefined);

    router.navigate(item.route);
  }

  return (
    <Screen>
      <HomeHeader onPress={onTapClientName} onBellPress={onNotificationPress} />
      {reqUserInfo.data?.idEmployee === 0 && (
        <View style={{ paddingHorizontal: SCREEN_HR_PADDING }}>
          <Callout
            danger
            content={`⚠ You are not an employee of ${reqUserInfo.data?.companyName}`}
          />
        </View>
      )}
      <MainSquareMenuTile>
        {CFM_MENU.map((item) => (
          <MainSquareMenuTile.Item
            key={item.key}
            label={item.label}
            icon={item.icon}
            onPress={() => onMenuPress(item)}
          />
        ))}
      </MainSquareMenuTile>
    </Screen>
  );
}
