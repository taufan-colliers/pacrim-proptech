const { withAndroidManifest } = require('@expo/config-plugins');

/**
 * Add Android `<queries>` entries for the sibling CFM apps so `Linking.canOpenURL` /
 * deep-link checks can see them (Android 11+ package visibility).
 *
 * Kept in sync with `SIBLING_APP_PACKAGES` in `src/constants/api`.
 */
const SIBLING_APP_PACKAGES = [
  'com.colliers.indonesia.cfmfia',
  'com.colliers.indonesia.cfmfam',
];

module.exports = function withQueries(config) {
  return withAndroidManifest(config, (config) => {
    const queries = config.modResults.manifest.queries ?? [];

    const packages = SIBLING_APP_PACKAGES.map((name) => ({
      package: [{ $: { 'android:name': name } }],
    }));

    config.modResults.manifest.queries = [...queries, ...packages];

    return config;
  });
};
