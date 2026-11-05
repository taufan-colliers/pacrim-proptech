import type { MaterialDesignIconsIconName } from '@react-native-vector-icons/material-design-icons';
import type { ImageSourcePropType, ViewProps } from 'react-native';
import { View } from 'react-native';

import { Icon, Phrase, Picture, Touch } from '@/components/atoms';
import useTheme from '@/hooks/useTheme';

import styles, { TILE_WIDTH } from './styles';

/**
 * Wrapper for `MainSquareMenuTile.Item` that lays the tiles out in a wrapping row.
 *
 * @prop ...props - Extends `ViewProps`.
 *
 * @example
 * <MainSquareMenuTile>
 *   <MainSquareMenuTile.Item label="CFM" source={cfmLogo} onPress={openCfm} />
 * </MainSquareMenuTile>
 */
export default function MainSquareMenuTile(props: ViewProps) {
  const { colors } = useTheme();
  const style = styles({ colors });

  return (
    <View {...props} style={style.containerWrapper}>
      {props.children}
    </View>
  );
}

interface Props {
  label: string;
  /** Remote icon URL. The offline placeholder is shown while it loads or when it fails. */
  iconURI?: string | null;
  /** Local static image, e.g. `require('@/assets/images/cfm-logo.jpeg')`. Takes precedence. */
  source?: ImageSourcePropType;
  /** Vector fallback for tiles that have no image, e.g. a hardcoded menu. */
  icon?: MaterialDesignIconsIconName;
  onPress: () => void;
}

/**
 * One square tile in the main service menu.
 *
 * Renders, in order of preference: a local `source`, a remote `iconURI`, then a Material
 * Design `icon`. The icon box is always square so mixed sources keep the same proportions.
 *
 * @example
 * <MainSquareMenuTile.Item
 *   label="CFM Ticket"
 *   icon="ticket-confirmation"
 *   onPress={() => router.navigate('/(protected)/cfm')}
 * />
 */
function MainSquareMenuTileItem(props: Props) {
  const { label, iconURI, source, icon, onPress } = props;
  const { colors } = useTheme();
  const style = styles({ colors });

  return (
    <Touch onPress={onPress} style={style.container} haptic="heavy">
      <View style={style.containerIcon}>
        {icon && !source && !iconURI ? (
          <Icon name={icon} size={TILE_WIDTH * 0.5} color={colors.primary} />
        ) : (
          <Picture style={style.icon} uri={iconURI} source={source} />
        )}
      </View>
      <Phrase type="caption" align="center">
        {label}
      </Phrase>
    </Touch>
  );
}

MainSquareMenuTile.Item = MainSquareMenuTileItem;
