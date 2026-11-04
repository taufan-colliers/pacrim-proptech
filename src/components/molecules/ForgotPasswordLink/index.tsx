import { View } from 'react-native';

import { Phrase, Touch } from '@/components/atoms';
import { useTheme } from '@/hooks';

import styles from './styles';

interface Props {
  onPress: () => void;
}

/**
 * Underlined "Forgot username or password?" action shown under the sign-in password field.
 * Opens the CFM user-verification page (see `useSignIn.onForgotPassword`).
 *
 * @example
 * <ForgotPasswordLink onPress={onForgotPassword} />
 */
export default function ForgotPasswordLink({ onPress }: Props) {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <Touch onPress={onPress}>
        <Phrase
          type="content"
          style={[styles.text, { color: colors.link }]}
        >
          Forgot username or password?
        </Phrase>
      </Touch>
    </View>
  );
}
