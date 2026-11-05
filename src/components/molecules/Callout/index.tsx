import { View } from 'react-native';

import { Phrase } from '@/components/atoms';
import useColors from '@/hooks/useColors';

import styles from './styles';

interface Props {
  content: string;
  /** Use the danger palette for warnings/errors. */
  danger?: boolean;
  /** Shrink the callout to its content instead of filling the row. */
  compact?: boolean;
}

/**
 * Inline notice used for warnings and contextual hints.
 *
 * @example
 * <Callout danger content={`⚠ You are not an employee of ${companyName}`} />
 */
export default function Callout({ content, danger, compact }: Props) {
  const colors = useColors();
  const style = styles({ colors, danger, compact });

  return (
    <View style={style.container}>
      <Phrase color={danger ? 'danger' : 'primary'} type="content">
        {content}
      </Phrase>
    </View>
  );
}
