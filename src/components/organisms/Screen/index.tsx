import type { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import useColors from '@/hooks/useColors';

import styles from './styles';

interface Props {
  /** Reserve the status-bar height at the top of the screen. */
  topOffsetEnabled?: boolean;
  /** Override the themed background colour. */
  backgroundColor?: string;
}

/**
 * Backbone canvas for every screen: safe area, themed background and keyboard avoidance.
 *
 * The keyboard padding comes from `react-native-keyboard-controller`, so screens must be
 * rendered under its `KeyboardProvider` (set up in the root layout).
 *
 * @example
 * <Screen>
 *   <ScrollView>...</ScrollView>
 * </Screen>
 */
export default function Screen(props: PropsWithChildren<Props>) {
  const colors = useColors();
  const {
    children,
    topOffsetEnabled = true,
    backgroundColor = colors.background,
  } = props;
  const inset = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {topOffsetEnabled && (
        <View
          style={[
            styles.statusBar,
            { height: inset.top, backgroundColor: colors['status-bar-bg'] },
          ]}
        />
      )}
      <KeyboardAvoidingView behavior="padding" style={styles.keyboardView}>
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/**
 * Compact screen variant that skips safe-area and keyboard handling. Use inside modals or
 * full-bleed routes that manage their own insets.
 */
Screen.Compact = function Compact({ children }: PropsWithChildren) {
  const colors = useColors();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {children}
    </View>
  );
};
