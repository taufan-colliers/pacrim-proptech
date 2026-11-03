---
name: Migrate Components
description: Port components from other projects into this Expo app (SDK 58, expo-router, styled-components, strict TS). Ensures code is updated to the current Expo SDK, uses this repo's conventions, and documents with meaningful JSDoc.
---

## Workflow

1. **Locate** — read the component being ported and its dependencies/HOCs. Identify the target
   location: `src/components/...` (never `src/app/` — only routes live there).
2. **Check the SDK first** — read `package.json` and find the `expo` package's **major** version.
   Before writing any Expo/RN/EAS API code, fetch `https://docs.expo.dev/versions/v<major>.0.0/`.
   For anything else, fetch `https://docs.expo.dev/llms.txt` and follow its links to the specific
   page. Never write Expo APIs from memory.
3. **Adapt the code**
   - Rewrite imports to this repo's alias: `@/components/...`, `@/hooks/...`, `@/lib/...`
     (maps to `./src/*`, see `tsconfig.json` — strict mode, so no implicit any).
   - Convert web/non-RN primitives to React Native equivalents (`div → View`, `img → Image`,
     `button → Pressable`, …). Match the style of sibling components in `src/components/`
     (functional components, `forwardRef` where siblings use it, `styled-components` for styling).
   - Replace deprecated/renamed APIs with the current SDK equivalents from the docs fetched in step 2.
4. **Dependencies** — if the component needs new packages, ALWAYS use
   `npx expo install <package>` (or `bunx` when `bun.lock` exists) so versions resolve to the SDK.
   Prefer recommended Expo modules over third-party libraries; never create or edit `ios/`/`android/`.
5. **Document (JSDoc)** — every ported component, prop, hook, and util gets JSDoc that is
   **detailed but never repeats TypeScript types**. Instead document:
   - What the component does and when to use it
   - How it affects/behaves — side effects, callbacks, visual/UX notes, platform differences
   - A short `@example` when usage isn't obvious
   - Skip `@param <name> {type}` — the types already say that

   ```tsx
   /**
    * Themed pressable card used to wrap list items and dashboard entries.
    * Pressing calls `onSelect` with the item's id; disabled states render at 60% opacity.
    *
    * @example
    * <EntryCard entry={item} onSelect={(id) => router.push(`/entries/${id}`)} />
    */
   interface EntryCardProps {
     /** Item shown inside the card; styling recalculates when the theme changes. */
     entry: Entry;
     /** Fires once per press gesture completion, with the entry id. */
     onSelect?: (id: string) => void;
   }
   ```
6. **Verify before done**
   - `npx expo lint`
   - `npx tsc --noEmit`
   - Fix until both pass.

## House rules (from AGENTS.md)

- Expo Router: routes in `src/app/`, non-route code outside it.
- `npx expo install` over npm/yarn/bun add, always.
- Use `bunx` instead of `npx` if `bun.lock` is present.
