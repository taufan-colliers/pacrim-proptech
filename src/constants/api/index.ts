/** Access roles assigned from `/user-info` after login. */
export const ROLES = {
  user: 1,
  PIC: 2,
  technician: 3,
} as const;

/** HTTP statuses used by the app-wide auth error policy. */
export const API_TOKEN_FAILURE = {
  unauthorized: 401,
  expired: 417,
} as const;

/** Deep-link schemes of the sibling CFM apps opened from Home. */
export const SIBLING_APP_SCHEMES = {
  inspector: 'cfmfi://',
  asset: 'cfmam://',
} as const;

/** App package identifiers used by the Android `<queries>` config plugin. */
export const SIBLING_APP_PACKAGES = {
  inspector: 'com.colliers.indonesia.cfmfia',
  asset: 'com.colliers.indonesia.cfmfam',
} as const;
