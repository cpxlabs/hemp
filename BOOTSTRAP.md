# React Native Template App — Bootstrap Guide

Reference for bootstrapping new React Native apps using the framework, Expo configuration, and packages established in this repository.

---

## Table of Contents

1. [Core Framework](#core-framework)
2. [Packages](#packages)
3. [Expo Configuration](#expo-configuration)
4. [TypeScript](#typescript)
5. [Babel](#babel)
6. [Metro Bundler](#metro-bundler)
7. [Styling (NativeWind + Tailwind)](#styling-nativewind--tailwind)
8. [UI Components (React Native Reusables)](#ui-components-react-native-reusables)
9. [Dark / Light Mode](#dark--light-mode)
10. [React Navigation](#react-navigation)
11. [State Management (Context API)](#state-management-context-api)
12. [Gestures](#gestures)
13. [Internationalization (i18n)](#internationalization-i18n)
14. [Local Storage (AsyncStorage)](#local-storage-asyncstorage)
15. [Authentication (Google Sign-In)](#authentication-google-sign-in)
16. [Ads (Google AdMob)](#ads-google-admob)
17. [Realtime (Socket.io)](#realtime-socketio)
18. [Haptics](#haptics)
19. [Web Support](#web-support)
20. [Testing](#testing)
21. [ESLint](#eslint)
22. [Prettier](#prettier)
23. [Scripts](#scripts)
24. [Platform Notes](#platform-notes)

---

## Core Framework

| Package | Version | Purpose |
|---|---|---|
| `react` | 18.2.0 | UI library |
| `react-native` | 0.73.2 | Native runtime |
| `expo` | ~50.0.0 | Managed workflow, dev tooling, OTA updates |
| `typescript` | ^5.1.3 | Type-safe development (strict mode) |

Expo managed workflow is used — no ejected native projects. Native modules that require custom builds use `expo-dev-client`.

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

### Dev Dependencies

| Package | Version | Category |
|---|---|---|
| `typescript` | ^5.1.3 | Language |
| `@babel/core` | ^7.20.0 | Build |
| `@babel/preset-flow` | ^7.27.1 | Build (Flow-typed third-party code) |
| `babel-jest` | ^30.2.0 | Test transform |
| `jest` | ^30.2.0 | Test runner |
| `jest-expo` | 50.0.0 | Test preset |
| `@testing-library/react-native` | ^13.3.3 | Component testing |
| `react-test-renderer` | 18.2.0 | Render testing |
| `ts-jest` | ^29.4.6 | TS transform |
| `@types/jest` | ^30.0.0 | Types |
| `@types/node` | ^25.0.9 | Types |
| `@types/react` | ~18.2.45 | Types |
| `@types/uuid` | ^9.0.0 | Types |
| `eslint` | ^9.39.2 | Linting |
| `@eslint/js` | ^9.39.2 | Linting |
| `@typescript-eslint/eslint-plugin` | ^8.53.0 | Linting |
| `@typescript-eslint/parser` | ^8.53.0 | Linting |
| `eslint-plugin-react` | ^7.37.5 | Linting |
| `eslint-plugin-react-hooks` | ^7.0.1 | Linting |
| `prettier` | ^3.8.0 | Formatting |
| `prettier-plugin-tailwindcss` | ^0.6.14 | Auto-sort Tailwind classes |

---

## Expo Configuration

`app.config.js` uses a dynamic function to conditionally include native-only plugins:

```js
module.exports = () => {
  const isWebBuild = process.env.EXPO_PUBLIC_BUILD_PLATFORM === 'web';

  const plugins = isWebBuild ? [] : [
    "@react-native-google-signin/google-signin"
    // For production, also add:
    // ["react-native-google-mobile-ads", {
    //   androidAppId: "ca-app-pub-xxx",
    //   iosAppId: "ca-app-pub-xxx"
    // }]
  ];

  return {
    expo: {
      name: "App Name",
      slug: "app-slug",
      version: "1.0.0",
      orientation: "portrait",
      icon: "./assets/icon.png",
      userInterfaceStyle: "light",
      splash: {
        image: "./assets/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff"
      },
      assetBundlePatterns: ["**/*"],
      ios: {
        supportsTablet: true,
        bundleIdentifier: "com.yourorg.yourapp",
        googleServicesFile: "./GoogleService-Info.plist"
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/adaptive-icon.png",
          backgroundColor: "#ffffff"
        },
        package: "com.yourorg.yourapp",
        googleServicesFile: "./google-services.json"
      },
      web: { favicon: "./assets/favicon.png" },
      plugins
    }
  };
};
```

Key points:
- Native-only plugins (Google Sign-In, AdMob) are excluded when `EXPO_PUBLIC_BUILD_PLATFORM=web`.
- `expo-dev-client` is used for custom dev builds that include native modules.
- Google services config files are required for mobile auth/ads.

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

- **Strict mode** is enabled.
- **Path alias** `@/*` maps to `src/*` — must also be configured in `jest.config.js` and `babel.config.js` if used.
- Extends Expo's base TS config for React Native compatibility.

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
    plugins: ['react-native-reanimated/plugin'],
  };
};
```

- `babel-preset-expo` handles React Native + JSX transform.
- `nativewind/babel` enables Tailwind class compilation.
- `@babel/preset-flow` is installed as a dev dependency to handle Flow-typed third-party packages at transpile time.
- **`react-native-reanimated/plugin` must always be the last plugin** in the list (required by `@react-navigation/drawer`).

---

## Metro Bundler

```js
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);

config.resolver.sourceExts = [...config.resolver.sourceExts, 'tsx', 'ts'];

config.resolver.resolveRequest = (context, moduleName, platform) => {
  const originalResolveRequest = context.resolveRequest;

  if (platform === 'web') {
    // Resolve RN Platform module to web equivalent
    if (moduleName.includes('../Utilities/Platform')) {
      return {
        type: 'sourceFile',
        filePath: require.resolve('react-native-web/dist/exports/Platform'),
      };
    }
    // Empty-resolve native-only modules on web
    if (moduleName === 'react-native-google-mobile-ads') {
      return { type: 'empty' };
    }
  }

  return originalResolveRequest(context, moduleName, platform);
};

module.exports = config;
```

Use the `resolveRequest` hook to:
- Map native modules to their web equivalents.
- Return `{ type: 'empty' }` for packages that have no web support.

---

## Styling (NativeWind + Tailwind)

Packages: `nativewind` ^4.2.1, `tailwindcss` ^3.4.19, `react-native-css-interop` 0.2.1

NativeWind v4 brings Tailwind utility classes to React Native via `className` props, with full CSS variable support for theming.

### Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}', './App.tsx'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        // ... other semantic color tokens
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
```

- `darkMode: 'class'` — dark mode is toggled by adding/removing the `dark` class on the root element.
- All colors are CSS custom properties defined in `global.css`, enabling runtime theme switching.

### CSS Variables (`global.css`)

Define semantic color tokens under `:root` (light) and `.dark` (dark):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 50 100% 95%;
    --foreground: 217 74% 17%;
    --primary: 217 74% 17%;
    /* ... */
  }

  .dark {
    --background: 217 74% 10%;
    --foreground: 50 100% 95%;
    --primary: 46 63% 53%;
    /* ... */
  }
}
```

### `cn()` Utility

`src/lib/utils.ts` exports a `cn()` helper that merges class names:

```ts
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Use `cn()` when composing conditional or overridable Tailwind classes.

---

## UI Components (React Native Reusables)

[React Native Reusables](https://reactnativereusables.com) is a shadcn/ui-style, copy-paste component library built on NativeWind. Components are generated into `src/components/ui/` and are fully owned — no black-box library to version-bump.

### Installed Components

| Component | File | Description |
|---|---|---|
| `Button` | `ui/button.tsx` | Pressable button with CVA variants (default, destructive, outline, secondary, ghost, link) |
| `Card` | `ui/card.tsx` | Card container with Header, Title, Description, Content, Footer sub-components |
| `Text` | `ui/text.tsx` | Text with `TextClassContext` for inheriting styles from parent (e.g., Button) |
| `Toggle` | `ui/toggle.tsx` | Animated switch built on `Animated.Value` (used for theme toggle in the drawer) |
| `MenuButton` | `ui/menu-button.tsx` | Floating hamburger button that calls `navigation.openDrawer()` |

### Adding Components

```bash
pnpm dlx @react-native-reusables/cli@latest add [component]
```

Components are configured via `components.json` (shadcn schema) with the `@/components` alias pointing to `src/components`.

### Component Variants with CVA

Components use `class-variance-authority` for variant management:

```ts
import { cva } from 'class-variance-authority';

const buttonVariants = cva('base-classes', {
  variants: {
    variant: {
      default: 'bg-primary',
      outline: 'border border-border bg-background',
    },
    size: {
      default: 'h-10 px-4',
      sm: 'h-9 px-3',
    },
  },
  defaultVariants: { variant: 'default', size: 'default' },
});
```

---

## Dark / Light Mode

Package: `nativewind` (useColorScheme), `@react-native-async-storage/async-storage` (persistence)

### ThemeProvider

`src/providers/ThemeProvider.tsx` manages the active theme and exposes it via context:

- **Persistence**: reads/writes `@app:theme` in AsyncStorage.
- **System preference**: falls back to `Appearance.getColorScheme()` if no stored value.
- **NativeWind integration**: calls `setColorScheme()` from `nativewind` to switch utility classes.
- **Web**: toggles the `dark` class on `document.documentElement` for CSS variable switching.

```tsx
import { useTheme } from '@/providers/ThemeProvider';

const MyComponent = () => {
  const { isDark, toggleTheme, setTheme } = useTheme();
  return <Button onPress={toggleTheme}>{isDark ? 'Light Mode' : 'Dark Mode'}</Button>;
};
```

### Dark Mode Utilities

Prefix any Tailwind class with `dark:` to apply it only in dark mode:

```tsx
// Use dark: prefix for classes that differ between themes
<View className="bg-white dark:bg-gray-900">
  <Text className="text-black dark:text-white">Hello</Text>
</View>
```

Because semantic color tokens (`bg-background`, `text-foreground`, etc.) are CSS variables, they automatically resolve to the correct value in each theme — no `dark:` prefix needed for those classes. Use `dark:` only when applying a *different* class value in dark mode.

---

## React Navigation

Packages: `@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/drawer`, `react-native-screens`, `react-native-safe-area-context`, `react-native-reanimated`.

### Structure

The navigator uses a **Drawer wrapping a Stack** pattern:

```
NavigationContainer
 └─ DrawerNavigator
     ├─ drawerContent: <DrawerContent />   (custom side menu)
     └─ Screen "Main"
          └─ NativeStackNavigator
               ├─ Screen "Home"
               ├─ Screen "Menu"
               └─ Screen "About"
```

### Setup

```tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

const MainStack: React.FC = () => (
  <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Menu" component={MenuScreen} />
    <Stack.Screen name="About" component={AboutScreen} />
  </Stack.Navigator>
);

const AppNavigator: React.FC = () => (
  <NavigationContainer>
    <Drawer.Navigator
      screenOptions={{ headerShown: false, drawerType: 'front' }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Main" component={MainStack} />
    </Drawer.Navigator>
  </NavigationContainer>
);
```

### Type-Safe Routes

```ts
// src/types/navigation.ts
export type RootStackParamList = {
  Home: undefined;
  Menu: undefined;
  About: undefined;
};

export type DrawerParamList = {
  Main: NavigatorScreenParams<RootStackParamList>;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends DrawerParamList {}
  }
}
```

### Opening the Drawer

Use the `MenuButton` component (top-left of each screen) which calls `navigation.openDrawer()`. On mobile the drawer is also accessible via a swipe gesture from the left edge.

### Custom Drawer Content (`DrawerContent`)

`src/components/DrawerContent.tsx` renders the side menu with:
- Navigation links (Home, Menu, About)
- Theme toggle (dark/light) using `useTheme()`
- Language switcher using `useLanguage()`

---

## State Management (Context API)

No external state library is used. Each feature domain has its own React Context:

```tsx
// 1. Types
interface MyState { count: number }
interface MyContextValue extends MyState { increment: () => void }

// 2. Context
const MyContext = createContext<MyContextValue | undefined>(undefined);

// 3. Provider
export const MyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [count, setCount] = useState(0);
  const increment = () => setCount((c) => c + 1);
  return <MyContext.Provider value={{ count, increment }}>{children}</MyContext.Provider>;
};

// 4. Consumer hook with guard
export const useMy = () => {
  const ctx = useContext(MyContext);
  if (!ctx) throw new Error('useMy must be used within MyProvider');
  return ctx;
};
```

### Provider Composition

Providers are nested in `App.tsx` in dependency order:

```tsx
<ErrorBoundary>
  <GestureHandlerRootView style={{ flex: 1 }}>
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <AdProvider>
            <ToastProvider>
              <AppNavigator />
            </ToastProvider>
          </AdProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  </GestureHandlerRootView>
</ErrorBoundary>
```

Order matters — outer providers are available to inner ones. `ThemeProvider` wraps all others so that UI components and the drawer can access the current theme.

---

## Gestures

Package: `react-native-gesture-handler` ~2.14.0

- `GestureHandlerRootView` must wrap the entire app.
- Provides `Pan`, `Tap`, `LongPress`, `Pinch`, `Rotation` gesture handlers.

---

## Internationalization (i18n)

Packages: `i18next` ^25.7.4, `react-i18next` ^16.5.3

### Initialization

```ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ptBR from './locales/pt-BR.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    'pt-BR': { translation: ptBR },
  },
  lng: 'en',           // or auto-detect from device
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  compatibilityJSON: 'v4',
});
```

### Device Language Detection

```ts
import { Platform, NativeModules } from 'react-native';

const getDeviceLanguage = () => {
  if (Platform.OS === 'ios') {
    return NativeModules.SettingsManager?.settings?.AppleLocale || 'en';
  } else if (Platform.OS === 'android') {
    return NativeModules.I18nManager?.localeIdentifier || 'en';
  }
  return navigator.language || 'en';  // web
};
```

### Usage

```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  return <Text>{t('common.confirm')}</Text>;
};
```

### Adding a Language

1. Create `src/locales/{lang}.json` with the same keys as `en.json`.
2. Import and add it to the `resources` object in the i18n init.

---

## Local Storage (AsyncStorage)

Package: `@react-native-async-storage/async-storage` 1.21.0

```ts
import AsyncStorage from '@react-native-async-storage/async-storage';

// Write
await AsyncStorage.setItem('key', JSON.stringify(data));

// Read
const raw = await AsyncStorage.getItem('key');
const data = raw ? JSON.parse(raw) : null;

// Delete
await AsyncStorage.removeItem('key');
```

Tips:
- Namespace keys by user ID for multi-user isolation.
- Debounce frequent writes to avoid performance issues.
- Validate data on read to handle schema changes.

---

## Authentication (Google Sign-In)

Package: `@react-native-google-signin/google-signin` ^13.1.0

- **Android**: requires `google-services.json` in project root.
- **iOS**: requires `GoogleService-Info.plist` in project root.
- **Web**: not supported — use a fallback (guest mode or web OAuth).
- Must be listed as an Expo plugin in `app.config.js` for native builds.
- Excluded from web builds via the `EXPO_PUBLIC_BUILD_PLATFORM` check.

---

## Ads (Google AdMob)

Package: `react-native-google-mobile-ads` ^16.0.1

- Supports banner, rewarded, and interstitial ad formats.
- COPPA-compliant child-directed settings available.
- Test ad unit IDs available for development.
- Not available on web — resolve as empty module in `metro.config.js`.
- Requires `expo-dev-client` for custom native builds.

---

## Realtime (Socket.io)

Package: `socket.io-client` ^4.8.0

```ts
import { io } from 'socket.io-client';

const socket = io('https://your-server.com');
socket.on('connect', () => { /* connected */ });
socket.on('event-name', (data) => { /* handle */ });
socket.emit('event-name', payload);
socket.disconnect();
```

Wrap connection lifecycle in a custom hook for clean mount/unmount handling.

---

## Haptics

Package: `expo-haptics` ^15.0.8

```ts
import * as Haptics from 'expo-haptics';

Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
```

No-op on web — safe to call on all platforms.

---

## Web Support

Package: `react-native-web` ~0.19.6, `@expo/metro-runtime` ~3.1.3

### Running

```bash
EXPO_PUBLIC_BUILD_PLATFORM=web expo start --web
```

### Metro Overrides

Native-only modules must be handled in `metro.config.js`:
- Map `react-native` Platform to `react-native-web` equivalent.
- Return `{ type: 'empty' }` for packages without web support (e.g., `react-native-google-mobile-ads`).

### Expo Config

Exclude native-only plugins from `app.config.js` when `EXPO_PUBLIC_BUILD_PLATFORM === 'web'`.

---

## Testing

### Packages

| Package | Purpose |
|---|---|
| `jest` ^30.2.0 | Test runner |
| `jest-expo` 50.0.0 | Expo-aware Jest preset |
| `babel-jest` ^30.2.0 | Transform JS/TS for Jest |
| `@testing-library/react-native` ^13.3.3 | Component rendering & queries |
| `react-test-renderer` 18.2.0 | Render tree snapshots |
| `ts-jest` ^29.4.6 | TypeScript transform |

### Jest Configuration

```js
module.exports = {
  preset: 'jest-expo',
  setupFiles: ['<rootDir>/jest.setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/types/**/*',
  ],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!.*((jest-)?react-native|@react-native(-community)?|'
    + '@react-native/.*|expo(nent)?|@expo(nent)?/.*|react-navigation|'
    + '@react-navigation/.*|@unimodules/.*|unimodules|'
    + 'react-native-gesture-handler|'
    + 'react-native-safe-area-context|react-native-screens|'
    + 'react-native-get-random-values|react-native-google-mobile-ads|'
    + 'uuid|expo-haptics|expo-constants))',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
};
```

Key details:
- `transformIgnorePatterns` whitelists React Native and Expo packages that ship un-transpiled ESM.
- `moduleNameMapper` mirrors the `@/*` path alias and stubs image imports.
- Coverage excludes `.d.ts` files and the `types/` directory.

### Mock Setup (`jest.setup.js`)

Pre-configure mocks for native modules that don't run in Node:
- React Native core (View, Text, ScrollView, FlatList, etc.)
- Gesture handler
- AsyncStorage
- Google Sign-In
- expo-haptics
- uuid
- Safe area context
- React Navigation
- Any native module your app uses

### Test File Convention

Place tests in `__tests__/` directories next to the source:

```
src/hooks/useMyHook.ts
src/hooks/__tests__/useMyHook.test.ts
```

---

## ESLint

Uses the new [flat config format](https://eslint.org/docs/latest/use/configure/configuration-files-new) (`eslint.config.js`):

```js
const js = require('@eslint/js');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');

module.exports = [
  js.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2021,
        sourceType: 'module',
      },
      globals: {
        console: 'readonly',
        navigator: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        fetch: 'readonly',
        window: 'readonly',
        document: 'readonly',
        require: 'readonly',
        module: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        global: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
    settings: { react: { version: 'detect' } },
  },
];
```

Key differences from the legacy `.eslintrc.js` format:
- Uses an array of config objects instead of a single object.
- `env` is replaced by explicit `globals` in `languageOptions`.
- Plugins are provided as objects, not string arrays.
- A separate config block for test files adds Jest globals.

---

## Prettier

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

`prettier-plugin-tailwindcss` automatically sorts Tailwind class names in the canonical order on format.

---

## Scripts

| Script | Command | Description |
|---|---|---|
| `start` | `expo start` | Start Expo dev server |
| `android` | `expo start --android` | Run on Android |
| `ios` | `expo start --ios` | Run on iOS |
| `web` | `EXPO_PUBLIC_BUILD_PLATFORM=web expo start --web` | Run on web |
| `test` | `jest` | Run test suite |
| `test:watch` | `jest --watch` | Watch mode |
| `test:coverage` | `jest --coverage` | With coverage report |
| `test:ci` | `jest --ci --coverage --maxWorkers=2` | CI-optimized |
| `lint` | `eslint "src/**/*.{ts,tsx}"` | Lint source files |
| `lint:fix` | `eslint "src/**/*.{ts,tsx}" --fix` | Lint and auto-fix |
| `format` | `prettier --write "src/**/*.{ts,tsx}"` | Format source files |
| `format:check` | `prettier --check "src/**/*.{ts,tsx}"` | Check formatting |

---

## Dependency Update Workflow

Use this lightweight maintenance cycle for routine updates:

1. Run `pnpm update` to pull the latest non-breaking versions allowed by `package.json`.
2. Run `pnpm outdated` to review remaining major-version upgrades that may require migration work.
3. Run lint and tests (`pnpm run lint`, `pnpm test`) before merging.

For Expo major SDK migrations, follow Expo's upgrade guide and update React Native ecosystem packages together.

---

## Platform Notes

### Android
- Requires `google-services.json` for Firebase/Google services.
- Uses `expo-dev-client` for custom dev builds with native modules.
- Hardware back button handling via `BackHandler` from `react-native`.
- Haptic feedback via `expo-haptics`.

### iOS
- Requires `GoogleService-Info.plist` for Firebase/Google services.
- `SafeAreaView` (from `react-native-safe-area-context`) for notch/Dynamic Island.
- `supportsTablet: true` in Expo config to enable iPad.

### Web
- Set `EXPO_PUBLIC_BUILD_PLATFORM=web` to exclude native plugins.
- `metro.config.js` must resolve `react-native-web` Platform and empty-resolve native-only packages.
- Google Sign-In and AdMob are not available — implement fallbacks.
- `expo-haptics` is a safe no-op on web.
- Dark mode applies the `dark` class to `document.documentElement` via `ThemeProvider`.
