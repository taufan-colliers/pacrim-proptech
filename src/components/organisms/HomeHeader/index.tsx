import { View } from 'react-native';

import { Icon, Phrase, Touch } from '@/components/atoms';
import { useCurrentClient, useUserInfo } from '@/hooks';
import useTheme from '@/hooks/useTheme';

import styles from './styles';

interface Props {
  /** Callback when the client name is pressed. */
  onPress?: () => void;
  /** Callback when the notification bell is pressed. */
  onBellPress?: () => void;
}

/**
 * Header for the CFM home screen: signed-in user, active client and the notification bell.
 *
 * @example
 * <HomeHeader onPress={onTapClientName} onBellPress={onNotificationPress} />
 */
export default function HomeHeader({ onPress, onBellPress }: Props) {
  const reqClientActive = useCurrentClient();
  const reqUserInfo = useUserInfo();
  const { colors } = useTheme();

  const style = styles({ colors });

  return (
    <View style={style.container}>
      <View style={style.containerContent}>
        <Phrase type="content">{reqUserInfo.data?.personName}</Phrase>
        {reqClientActive.data && (
          <Touch onPress={onPress} style={style.containerClientName}>
            <Phrase numberOfLines={2} color="primary">
              {reqClientActive.data.clientName}
            </Phrase>
          </Touch>
        )}
      </View>
      <View style={style.containerActions}>
        <Touch
          style={style.containerAction}
          onPress={onBellPress}
          haptic="soft"
        >
          <Icon name="bell" color={colors.primary} size={20} />
        </Touch>
      </View>
    </View>
  );
}
