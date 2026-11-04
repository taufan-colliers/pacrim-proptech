import useTheme from '@/hooks/useTheme';

import Phrase from '../Phrase';

/**
 * Red asterisk marking a required field in `FieldLabel`.
 *
 * @example
 * <FieldLabel required>Username</FieldLabel>
 */
export default function RequiredIndicator() {
  const { colors } = useTheme();
  return <Phrase style={{ color: colors.danger }}>*</Phrase>;
}
