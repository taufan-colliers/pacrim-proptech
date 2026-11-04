import type { ViewProps } from 'react-native';
import { View } from 'react-native';

import styles from './styles';

/**
 * Centred, padded container for the MFA verification form. Keeps the OTP screen visually
 * centred on every device size.
 *
 * @example
 * <OTPInputWrapper>
 *   <OTPInput onFilled={onFilled} />
 * </OTPInputWrapper>
 */
export default function OTPInputWrapper(props: ViewProps) {
  return <View {...props} style={[styles.container, props.style]} />;
}
