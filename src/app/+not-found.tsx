import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Phrase } from '@/components/atoms';
import { Screen } from '@/components/organisms';

/**
 * Fallback route for unknown paths. Keeps the user inside the app instead of showing a blank
 * native error screen.
 */
export default function NotFoundScreen() {
  return (
    <Screen>
      <View style={styles.container}>
        <Phrase type="title">This screen doesn&apos;t exist.</Phrase>
        <Link href="/" style={styles.link}>
          <Phrase type="link">Go to home screen!</Phrase>
        </Link>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
