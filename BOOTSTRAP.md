# React Native Template App — Bootstrap Guide

Reference for bootstrapping new React Native apps using the framework, Expo configuration, and packages established in this repository.

---

## Table of Contents

1. [Core Framework](#core-framework)
2. [3D & Animation Stack](#3d--animation-stack)
3. [Packages](#packages)
4. [Expo Configuration](#expo-configuration)
5. [TypeScript](#typescript)
6. [Babel](#babel)
7. [Metro Bundler](#metro-bundler)
8. [Styling (NativeWind + Tailwind)](#styling-nativewind--tailwind)
9. [UI Components (React Native Reusables)](#ui-components-react-native-reusables)
10. [Dark / Light Mode](#dark--light-mode)
11. [React Navigation](#react-navigation)
12. [State Management (Context API)](#state-management-context-api)
13. [Gestures](#gestures)
14. [Internationalization (i18n)](#internationalization-i18n)
15. [Local Storage (AsyncStorage)](#local-storage-asyncstorage)
16. [Authentication (Google Sign-In)](#authentication-google-sign-in)
17. [Ads (Google AdMob)](#ads-google-admob)
18. [Realtime (Socket.io)](#realtime-socketio)
19. [Haptics](#haptics)
20. [Web Support](#web-support)
21. [Testing](#testing)
22. [ESLint](#eslint)
23. [Prettier](#prettier)
24. [Scripts](#scripts)
25. [Platform Notes](#platform-notes)

---

## Core Framework

| Package | Version | Purpose |
|---|---|---|
| `react` | 18.2.0 | UI library |
| `react-native` | 0.73.2 | Native runtime |
| `expo` | ~50.0.0 | Managed workflow, dev tooling, OTA updates |
| `typescript` | ^5.1.3 | Type-safe development (strict mode) |

Expo managed workflow is used — no ejected native projects. Native modules that require custom builds use `expo-dev-client`.

---

## 3D & Animation Stack

| Package | Version | Purpose |
|---|---|---|
| `three` | ^0.185.1 | Core 3D engine |
| `@react-three/fiber` | ^8.17.10 | R3F Bridge |
| `@react-three/drei` | ^9.121.5 | R3F Helpers |
| `framer-motion` | ^12.42.2 | UI animations (Web) |
| `react-native-reanimated` | ~3.6.0 | Native animations |

---

## Packages

| Package | Version | Category |
|---|---|---|
| `react` | 18.2.0 | Core |
| `react-native` | 0.73.2 | Core |
| `expo` | ~50.0.0 | Core |
| `react-dom` | 18.2.0 | Web |
| `react-native-web` | ~0.19.6 | Web |
| `@expo/metro-runtime` | ~3.1.3 | Web |
| `@react-navigation/native` | ^6.1.9 | Navigation |
| `@react-navigation/native-stack` | ^6.9.17 | Navigation |
| `@react-navigation/drawer` | ^6.7.2 | Navigation (side menu) |
| `react-native-screens` | ~3.29.0 | Navigation |
| `react-native-safe-area-context` | 4.8.2 | Navigation / Layout |
| `react-native-gesture-handler` | ~2.14.0 | Gestures |
| `react-native-reanimated` | ~3.6.0 | Animations (required by drawer) |
| `nativewind` | ^4.2.1 | Tailwind CSS for React Native |
| `tailwindcss` | ^3.4.19 | Styling |
| `tailwindcss-animate` | ^1.0.7 | Tailwind animation plugin |
| `tailwind-merge` | ^3.4.0 | Utility — merge Tailwind classes |
| `clsx` | ^2.1.1 | Utility — conditional class names |
| `class-variance-authority` | ^0.7.1 | Component variant styling (CVA) |
| `@rn-primitives/slot` | ^1.2.0 | Slot pattern for React Native Reusables |
| `react-native-css-interop` | 0.2.1 | NativeWind CSS interop layer |
| `@react-native-async-storage/async-storage` | 1.21.0 | Local storage |
| `@react-native-google-signin/google-signin` | ^13.1.0 | Authentication |
| `react-native-google-mobile-ads` | ^16.0.1 | Monetization |
| `i18next` | ^25.7.4 | Internationalization |
| `react-i18next` | ^16.5.3 | i18n React bindings |
| `socket.io-client` | ^4.8.0 | WebSocket / realtime |
| `expo-haptics` | ^15.0.8 | Haptic feedback |
| `expo-dev-client` | ^6.0.20 | Custom native dev builds |
| `react-native-get-random-values` | ^1.11.0 | Crypto polyfill (required by uuid) |
| `uuid` | ^9.0.0 | Unique ID generation |
| `@expo/vector-icons` | ^14.1.0 | Icon sets |
| `lucide-react-native` | ^0.545.0 | Icon set used in UI components |
| `react-native-svg` | ^15.15.3 | SVG support (required by lucide) |
| `@react-native/assets-registry` | ^0.83.1 | Asset resolution |
| `@babel/runtime` | ^7.28.4 | Babel polyfills |

---

## Expo Configuration

`app.config.js` uses a dynamic function to conditionally include native-only plugins:

```js
module.exports = () => {
  const isWebBuild = process.env.EXPO_PUBLIC_BUILD_PLATFORM === 'web';

  const plugins = isWebBuild ? [] : [
    "@react-native-google-signin/google-signin"
  ];

  return {
    expo: {
      name: "Hemp Ramps Configurator",
      slug: "hemp-ramps-config",
      version: "1.0.0",
      orientation: "portrait",
      icon: "./assets/icon.png",
      userInterfaceStyle: "automatic",
      splash: {
        image: "./assets/splash.png",
        resizeMode: "contain",
        backgroundColor: "#0A0A0A"
      },
      assetBundlePatterns: ["**/*"],
      ios: {
        supportsTablet: true,
        bundleIdentifier: "com.cpxlabs.hempramps",
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/adaptive-icon.png",
          backgroundColor: "#0A0A0A"
        },
        package: "com.cpxlabs.hempramps",
      },
      web: { favicon: "./assets/favicon.png" },
      plugins
    }
  };
};
```

---

## TypeScript

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  },
  "include": ["**/*.ts", "**/*.tsx"]
}
```

---

## Babel

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      'nativewind/babel',
    ],
    plugins: [
      '@babel/plugin-transform-class-static-block', // Required for Three.js
      'react-native-reanimated/plugin'
    ],
  };
};
```

- `@babel/plugin-transform-class-static-block` is essential for bundling Three.js in the Metro/Expo environment.
- `react-native-reanimated/plugin` must always be the last plugin.

---

## Metro Bundler

Use the `resolveRequest` hook in `metro.config.js` to map native modules to their web equivalents or empty-resolve native-only packages on web.

---

## Styling (NativeWind + Tailwind)

Packages: `nativewind` ^4.2.1, `tailwindcss` ^3.4.19, `react-native-css-interop` 0.2.1

NativeWind v4 brings Tailwind utility classes to React Native via `className` props, with full CSS variable support for theming.

---

## UI Components (React Native Reusables)

[React Native Reusables](https://reactnativereusables.com) is a shadcn/ui-style, copy-paste component library built on NativeWind. Components land in `src/components/ui/` and use `class-variance-authority` for variant management.

---

## Dark / Light Mode

Managed by `src/providers/ThemeProvider.tsx`.
- **Light**: Saudade (Parchment)
- **Dark**: Hemp Ramps (Neon Green / Carbon)

---

## React Navigation

Uses a **Drawer wrapping a Stack** pattern. Type-safe routes are defined in `src/types/navigation.ts`.

---

## State Management (Context API)

No external state library is used. Each feature domain has its own React Context. Providers are nested in `App.tsx` in dependency order.

---

## Gestures

Package: `react-native-gesture-handler`. `GestureHandlerRootView` must wrap the entire app.

---

## Internationalization (i18n)

Packages: `i18next`, `react-i18next`. Translations are located in `src/locales/`.

---

## Local Storage (AsyncStorage)

Package: `@react-native-async-storage/async-storage`. Used for theme and language persistence.

---

## Authentication (Google Sign-In)

Package: `@react-native-google-signin/google-signin`. Native-only.

---

## Ads (Google AdMob)

Package: `react-native-google-mobile-ads`. Native-only. Empty-resolved on web.

---

## Realtime (Socket.io)

Package: `socket.io-client` ^4.8.0.

---

## Haptics

Package: `expo-haptics`. Safe no-op on web.

---

## Web Support

Set `EXPO_PUBLIC_BUILD_PLATFORM=web` to exclude native plugins.

---

## Testing

Packages: `jest`, `jest-expo`, `@testing-library/react-native`.
Run via `pnpm test`.

---

## ESLint & Prettier

Configured via `eslint.config.js` and `.prettierrc`. `prettier-plugin-tailwindcss` is used for auto-sorting classes.

---

## Scripts

| Script | Command | Description |
|---|---|---|
| `start` | `expo start` | Start Expo dev server |
| `web` | `EXPO_PUBLIC_BUILD_PLATFORM=web expo start --web` | Run on web |
| `test` | `jest` | Run test suite |
| `lint` | `eslint "src/**/*.{ts,tsx}"` | Lint source files |

---

## Platform Notes

### Web (Primary Target)
- High-performance 3D rendering via WebGL/Three.js.
- Framer Motion for desktop-class UI animations.

### Native
- Expo GL for 3D support.
- Native gestures and haptics.

---

**Last Updated**: 2025-05-15
