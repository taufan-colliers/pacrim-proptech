# Migration: CFM apps → `pacrim-proptech`

Consolidating four existing Expo apps into this one. Migration happens in phases; each phase is
executed in its own session so context stays focused. Update the checkboxes as work lands.

## Goal

One app that eventually replaces:

| App | Repo | Status |
| --- | --- | --- |
| CFM Ticket | `cfm-ticket` (canonical source for login + home) | **Phase 1 — in progress** |
| CFM Asset 2025 | `cfm-asset-2025` | Phase 2 — not started |
| CFM Inspector (new) | `cfm-inspector-new` | Phase 3 — not started |
| CFM Mail / Mail Courier | `cfm-mail`, `cfm-mail-courier` | Phase 4 — not started |

**Scope of this plan's detail:** login page + everything login depends on, then the protected
shell + home page. Later app migrations get their own detailed phase docs when they start.

## Decisions locked

| Decision | Choice |
| --- | --- |
| Canonical login/home source | `cfm-ticket` |
| Login backend | `cfm-ticket` endpoints (`/token/cfmcrm`, `/user-info`, `/auth/totp/verify`). All CFM APIs accept tokens from any login endpoint, so no multi-login support needed now. |
| MFA | Ported as-is (TOTP via `/verify-session`) — it is part of login. |
| Firebase / FCM | **Deferred.** Port the call site behind a ghost module so `loginStatus` still flips. Replace later. |
| Tab navigator | Port `cfm-ticket`'s react-navigation bottom tabs (not `NativeTabs`). |
| Native dirs | CNG only. Committed `ios/` deleted; never hand-edit `ios/`/`android/`. |
| Dead-end routes from home | Stub screens so navigation compiles and taps don't crash. |
| Branding | Login/MFA headers use `app-logo.png` (`@/assets/images/app-logo.png`); rebrand otherwise deferred. |
| Home menu (consolidated) | Home hosts exactly two tiles — CFM and CHR — both using `cfm-logo.jpeg` (`@/assets/images/cfm-logo.jpeg`). The CFM Ticket square menu moves into the CFM screen. |
| CFM route | Tapping the CFM tile opens a basic Stack at `(protected)/cfm` mirroring `cfm-ticket/app/(protected)/(home-tabs)/index.tsx` (Screen + HomeHeader + MainSquareMenuTile + Callout). |
| CFM menu | Hardcoded for now: the full tile list from the CFM Ticket home `appAccess` map replaces `useGetAccessList`-driven rendering. |
| Deep links | `cfmfi://` / `cfmam://` are replaced for now by in-app stub screens (`inspector`, `asset`); revisit when those apps are ported. |
| Tile image support | `MainSquareMenuTile.Item` renders local image assets in addition to remote `iconURI` URLs, keeping the same square tile size/proportions. |

## Target conventions

- Expo **SDK 58**, React Native 0.88, React 19, React Compiler + typed routes enabled.
- TypeScript **strict**; aliases `@/* → ./src/*`, `@/assets/* → ./assets/*`.
- Routes only in `src/app/`. Everything else in `src/{components,hooks,lib,constants,helpers,services,stores,types,parsers,dataTransform,infrastructure,config,context}`.
- Package manager: **npm**. Install native/Expo packages with `npx expo install`.
- Styling: `StyleSheet.create` + color tokens from `@/constants/colors` via `useColors()`.
  (`src/constants/theme.ts` + `themed-*` starter primitives stay for now, unused by migrated screens.)
- **Always re-check the SDK 58 docs before writing Expo API code**:
  `https://docs.expo.dev/versions/v58.0.0/` (source app is SDK 56 — do not copy APIs blindly).

## Architecture map (source → target)

| Source (`cfm-ticket` root) | Target (`pacrim-proptech/src`) |
| --- | --- |
| `app/` | `src/app/` |
| `config/apiClient/` | `config/apiClient/` |
| `constants/` | `constants/` |
| `helpers/` | `helpers/` |
| `stores/` | `stores/` |
| `types/` | `types/` |
| `parsers/` | `parsers/` |
| `dataTransform/` | `dataTransform/` |
| `services/` | `services/` |
| `infrastructure/` | `infrastructure/` |
| `hooks/` | `hooks/` |
| `components/{atoms,molecules,organisms}/` | `components/{atoms,molecules,organisms}/` |
| `context/` | `context/` |

`@/*` resolves to `./src/*` here, so source imports mostly keep their shape.

---

## Phase 0 — Shared foundation

**Goal:** the non-UI plumbing login and home depend on. No screens yet.

### 0.1 Project housekeeping

- [x] Delete committed prebuilt `ios/` (CNG; regenerable via `npx expo prebuild`).
- [x] Add `expo-secure-store` config plugin to `app.json` (CNG-safe keychain access).
- [x] Add `.env` + `.env.example` with `EXPO_PUBLIC_API_URL=https://cfm-system.com/api`.
- [x] Decide starter screen fate: keep `index.tsx`/`explore.tsx` untouched until Phase 1a replaces the route tree.

### 0.2 Dependencies (SDK 58 compatible, installed with `npx expo install`)

- [x] Data: `@tanstack/react-query`, `zustand`, `@react-native-async-storage/async-storage`
- [x] Auth/storage: `expo-secure-store`
- [x] Network: `axios`
- [x] Forms: `@tanstack/react-form`, `zod`
- [x] UI runtime: `@react-navigation/native`, `@react-navigation/bottom-tabs`, `@react-navigation/material-top-tabs` (+ `react-native-pager-view` peer), `react-native-keyboard-controller`, `toastify-react-native`, `lottie-react-native`, `expo-haptics`
- [x] Verify with `npx expo-doctor` (18/18 checks passed)

### 0.3 API client

- [x] `src/config/apiClient/index.ts` — axios instance, `baseURL` from `EXPO_PUBLIC_API_URL`
- [x] `src/config/apiClient/interceptors/{index,request,response,error}` — status → friendly error mapping
- [x] `src/lib/queryClient.ts` — QueryClient factory with global 401/417 policy (token refresh, session clear, toasts)

### 0.4 Constants, types, helpers

- [x] `src/constants/api` (auth-relevant subset + `API_TOKEN_FAILURE`)
- [x] `src/constants/keychainServices`
- [x] `src/constants/colors` (light/dark tokens, Colliers blue)
- [x] `src/types/components/general` (theme/role types only for now)
- [x] `src/types/apiResponses/{authentication,client}` + barrel
- [x] `src/types/apiRequests` (login/OTP/FCM subset; grows per phase)
- [x] `src/types/infrastructures/authentication`
- [x] `src/parsers/{index,authentication/*,client/*}`
- [x] `src/helpers/{base64,captureError,clearStorage,duration,getToken,getVerifiedSession,handleExpiredToken,keychain,logger,queryKeys,toast,validateType,haptics}` + barrel
- [x] `src/helpers/logAnalytic` — **ghost**, no Firebase; same signature

### 0.5 State + hooks

- [x] `src/stores/useComponentState` (zustand persist: `role`, `loginStatus`, `themePref`, `_hasHydrated`)
- [x] `src/hooks/{useTheme,useColors,useClearSession,useHydrated,useLogout}`
- [x] `src/hooks/index.ts` barrel (grows per phase)

### 0.6 Data layer (auth + client permissions)

- [x] `src/services/authentication/{login,userInfo,verifyOTP,accessList,index}`
- [x] `src/services/client/{clientPermission,index}`
- [x] `src/dataTransform/authentication/{login,userInfo,verifyOTP,accessList,index}`
- [x] `src/infrastructure/{authentication,index}`

### 0.7 Verification

- [x] `npx tsc --noEmit` passes
- [x] `npx expo lint` passes
- [x] `npx expo-doctor` clean

---

## Phase 1a — Login + MFA

**Routes**

- [x] `src/app/_layout.tsx` — providers: QueryClient, ToastManager, GestureHandlerRootView, KeyboardProvider, theme
- [x] `src/app/sign-in.tsx`
- [x] `src/app/verify-session.tsx`
- [x] `src/app/+not-found.tsx`
- [x] Remove starter `src/app/explore.tsx`, repoint `src/app/index.tsx` to the home tab
  - Note: `index.tsx` is a temporary session-gated placeholder (role + logout) until Phase 1b
    adds `(protected)/(home-tabs)`. Starter `app-tabs.tsx` / `app-tabs.web.tsx` removed too —
    both referenced the deleted `/explore` route and are superseded by Phase 1b's react-navigation
    bottom tabs.

**Form system**

- [x] `src/context/parentForm/{formHook,formHookContext,TSFField}` (+ TSF* modules needed to compile)
  - Note: only `TSFField` is registered. `TSFList` / `TSFPhotos` / `TSFSelect` depend on
    work-request code and arrive with their feature phase.
- [x] `src/constants/forms/login`, `src/constants/forms/index`
- [x] `src/types/components/form`

**Hooks**

- [x] `useSignIn`, `useGetToken`, `useVerifyOTPInput`, `useVerifyOTP`, `useOTPInput`, `useDynamicTextInputRef`
- [x] `useSaveFCMToken` — **ghost version**: resolves, sets `loginStatus = true`, `TODO(replace-firebase)`

**Components**

- [x] Atoms: `Gap`, `Icon`, `Phrase`, `Picture` (+ placeholder asset), `Touch`, `OTPInputWrapper`
  - Note: `Icon` uses `@react-native-vector-icons/material-design-icons`;
    `@expo/vector-icons` is deprecated and not installed.
- [x] Molecules: `AuthenticationHeader` (+ logo), `Button`, `ForgotPasswordLink`, `Field`, `FieldLabel`, `VerticalStick`
- [x] Organisms: `Screen`, `OTPInput`, `StatesWrapper` (+ lottie assets)
- [x] `src/constants/components`, `src/constants/keychainServices` usage, `src/helpers/haptics`

**Behaviour**

- [x] Login success → save token → ghost FCM save → `loginStatus` true → `/` or `/verify-session`
- [x] MFA flow stores `verifiedSesion` with `mfaExpiryPeriod`
- [x] Expired-token (417) replay via saved credential works
- [x] Forgot-password link opens CFM user verification page

---

## Phase 1b — Protected shell + home

**Shell**

- [ ] `src/app/(protected)/_layout.tsx` — auth gate (`token` + `loginStatus` + `/user-info` + MFA verified), splash control
- [ ] `src/app/(protected)/(home-tabs)/_layout.tsx` — bottom tabs: Home / Company / Profile
- [ ] Placeholder Company (`clients.tsx`) and Profile tabs

**Home (consolidation launcher)**

- [ ] `src/app/(protected)/(home-tabs)/index.tsx` — exactly two tiles: CFM and CHR (both use `cfm-logo.jpeg`)
- [ ] `MainSquareMenuTile.Item` accepts local static image sources alongside `iconURI`, with identical tile sizing/proportions
- [ ] CFM tile → `/(protected)/cfm`; CHR tile → `/(protected)/chr` stub

**CFM screen (mirrors `cfm-ticket/app/(protected)/(home-tabs)/index.tsx`)**

- [ ] `src/app/(protected)/cfm/_layout.tsx` — basic Stack, `headerShown: false`
- [ ] `src/app/(protected)/cfm/index.tsx` — `Screen`, `HomeHeader`, `MainSquareMenuTile`, `Callout` (+ styles)
- [ ] Non-employee callout (`idEmployee == 0`) preserved
- [ ] Hardcoded menu constant replacing `useGetAccessList`; tiles match the source `appAccess` map:
  - CFM Ticket (`cfmcrm`) → `/work-request/status/outstanding-wr`
  - CFM Asset (`cfmam`) → `/(protected)/asset` stub
  - CFM Inspector (`cfmfi`) → `/(protected)/inspector` stub
  - Dashboard → `/reports`
  - Cost Approval → `/cost-approval/requests/outstanding-ca`
- [ ] `useUserInfo`, `useClientActive`, `useRefetch`
- [ ] `services/client/clientPermission` wiring (parser already ported)
- [ ] `MainSquareMenuTile.Item` renders remote `appIconURL` icons via `Picture`
- [ ] Bell press → notifications stub; client-name tap → `clients` stub

**Stubs (real screens in later phases)**

- [ ] `(protected)/notifications/general`
- [ ] `(protected)/work-request/status/outstanding-wr`
- [ ] `(protected)/reports/index`
- [ ] `(protected)/cost-approval/requests/outstanding-ca`
- [ ] `(protected)/chr` — CHR stack placeholder
- [ ] `(protected)/asset` and `(protected)/inspector` — basic placeholder screens replacing the `cfmfi://`/`cfmam://` deep links
- [ ] Analytics ghosted
- [ ] `plugins/withQueries.js` for Android sibling-app visibility

---

## Phase 1c — Verification gate

- [ ] `npx tsc --noEmit`
- [ ] `npx expo lint`
- [ ] Manual: login success/failure, 417 refresh, MFA required/not, cold-start hydration, dark mode, toast errors
- [ ] Manual: home access-list renders tiles; stubs navigate; logout clears session

---

## Phase 2 — CFM Asset 2025 (skeleton)

- [ ] Inventory screens/hooks/services in `cfm-asset-2025`
- [ ] Map overlaps with ported foundation; list deltas
- [ ] Port feature groups behind the protected gate
- [ ] Replace asset deep link with in-app route where applicable

## Phase 3 — CFM Inspector new (skeleton)

- [ ] Inventory and delta list
- [ ] Port screens behind protected gate
- [ ] Replace `cfmfi://` deep link where applicable

## Phase 4 — CFM Mail / Mail Courier (skeleton)

- [ ] Inventory both mail apps; decide merge strategy (one tab group vs two)
- [ ] Port screens behind protected gate
- [ ] Unify auth against ported login

---

## Deferred / ghost modules

| Module | Current stand-in | Replace when |
| --- | --- | --- |
| Firebase messaging (FCM token save) | `useSaveFCMToken` ghost resolves + sets `loginStatus` | Firebase project has new bundle IDs |
| Firebase analytics (`logAnalytic`) | No-op with same signature | Firebase configured |
| Expo notifications permission prompt | Omitted | Firebase/notifications phase |
| Jailbreak/developer-mode detection (`jail-monkey`) | Omitted (was disabled in source) | Security hardening pass |
| Notification deep-link handling (`onMessage`) | Omitted | Firebase phase |

## Version-gap notes (SDK 56 → 58)

- Re-check every Expo API against `https://docs.expo.dev/versions/v58.0.0/` while porting.
- `expo-splash-screen` SDK 58: `SplashScreen.hide()` is sync; `preventAutoHideAsync()` in module scope.
- `react-native-edge-to-edge` (`SystemBars`) is not a target dependency — use `expo-status-bar` / `expo-system-ui`.
- React Compiler is enabled here; avoid patterns that break memoization assumptions, and fix lint findings rather than disabling rules.
- Strict TS may surface `any`/implicit issues in ported source; fix at the port site (no `@ts-ignore` unless already load-bearing, e.g. Axios error `.status`).

## How to continue

1. Open this file and pick the first unchecked item of the current phase.
2. Switch to Build agent: "continue MIGRATION.md phase X".
3. Tick checkboxes as items land; add sub-notes only when a decision changes.
