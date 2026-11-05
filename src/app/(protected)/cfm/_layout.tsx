import { Stack } from 'expo-router';

/**
 * CFM product stack. Screens inside manage their own layout, so the native header is hidden.
 */
export default function CfmLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
