import MaterialDesignIcons, {
  type MaterialDesignIconsIconName,
} from '@react-native-vector-icons/material-design-icons';
import type { OpaqueColorValue, StyleProp, TextStyle } from 'react-native';

export interface IconProps {
  /** Icon name from the Material Design Icons set. */
  name: MaterialDesignIconsIconName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
}

/**
 * Material Design icon rendered through the current `@react-native-vector-icons` package.
 *
 * @example
 * <Icon name="eye" color="#333" size={24} />
 *
 * Browse names at https://pictogrammers.com/library/mdi/
 */
export default function Icon({ name, size = 24, color, style }: IconProps) {
  return (
    <MaterialDesignIcons color={color} size={size} name={name} style={style} />
  );
}
