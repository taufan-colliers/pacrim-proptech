import { View } from 'react-native';

import { Phrase } from '@/components/atoms';

import Screen from '../Screen';

interface Props {
  title: string;
  description?: string;
}

/**
 * Simple placeholder route for screens that land in a later migration phase.
 *
 * Keeps navigation compiling and taps from crashing while the real feature is ported.
 *
 * @example
 * <Placeholder title="Reports" description="Dashboard reports arrive in Phase 2." />
 */
export default function Placeholder({ title, description }: Props) {
  return (
    <Screen>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          padding: 24,
        }}
      >
        <Phrase type="title" align="center">
          {title}
        </Phrase>
        <Phrase type="content" color="description" align="center">
          {description ?? 'This screen is ported in a later migration phase.'}
        </Phrase>
      </View>
    </Screen>
  );
}
