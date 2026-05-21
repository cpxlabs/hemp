# Template React Native Web Expo TypeScript

**Live demo:** [saudade-rn.vercel.app](https://saudade-rn.vercel.app/)

A fully scaffolded, cross-platform (iOS / Android / Web) React Native template app built with Expo, TypeScript, and modern tooling.

## Features

- **Expo managed workflow** — no ejected native projects
- **TypeScript** in strict mode with `@/*` path alias
- **React Navigation** — Drawer + native stack with type-safe routes
- **Side menu (DrawerNavigator)** — gesture-based on mobile, animated panel on web
- **NativeWind v4** — Tailwind CSS utilities for React Native with full dark mode support
- **React Native Reusables** — shadcn/ui-style copy-paste component library (Button, Card, Text, Toggle, and more)
- **Dark / Light mode** — system preference detection, manual toggle, persisted via AsyncStorage
- **Context API** state management (Theme, Language, Auth, Ads, Toast)
- **i18n** — English & Portuguese (device language auto-detection)
- **Auth stub** — Google Sign-In on native, guest mode on web
- **Ad stub** — AdMob placeholders (banner, rewarded, interstitial)
- **Realtime** — Socket.io client wrapper & hook
- **Haptics** — `expo-haptics` with web-safe no-op
- **Error Boundary** with fallback UI
- **Jest + React Testing Library** test suite
- **ESLint + Prettier** code quality tooling

## Prerequisites

- **Node.js** 24.x (current LTS line)
- **npm** 11.x
- **pnpm** 10.x
- **Expo CLI** (bundled via `npx expo`)

## Dependency Maintenance

Keep dependencies current with safe, non-breaking updates:

```bash
# Refresh lockfile to latest versions allowed by package.json ranges
pnpm update

# Check remaining newer major versions
pnpm outdated
```

Use Expo SDK upgrades separately (for example, Expo 50 to 51+) because they require coordinated React Native and tooling changes.

## UI Component Library

This project uses [React Native Reusables](https://reactnativereusables.com) — a shadcn/ui-style, copy-paste component library built on NativeWind. Components land in `src/components/ui/` and are fully owned/customizable.

**Installed components:** `button`, `card`, `text`, `toggle`, `menu-button`

To add more components (e.g., avatar, checkbox, dialog):

```bash
pnpm dlx @react-native-reusables/cli@latest add [component]
```

Use `pnpm dlx @react-native-reusables/cli@latest add --help` to see all available components.

## Quick Start

```bash
# Install dependencies
pnpm install

# Start Expo dev server
pnpm start

# Run on web
pnpm run web

# Run on Android
pnpm run android

# Run on iOS
pnpm run ios
```

## Available Scripts

| Script | Description |
|---|---|
| `pnpm start` | Start Expo dev server |
| `pnpm run android` | Run on Android |
| `pnpm run ios` | Run on iOS |
| `pnpm run web` | Run on web (sets `EXPO_PUBLIC_BUILD_PLATFORM=web`) |
| `pnpm test` | Run test suite |
| `pnpm run test:watch` | Run tests in watch mode |
| `pnpm run test:coverage` | Run tests with coverage report |
| `pnpm run test:ci` | CI-optimized test run |
| `pnpm run lint` | Lint source files |
| `pnpm run lint:fix` | Lint and auto-fix |
| `pnpm run format` | Format source files with Prettier |
| `pnpm run format:check` | Check formatting |

## Project Structure

```
├── App.tsx                    # Root component (provider composition)
├── app.config.js              # Expo dynamic config
├── babel.config.js            # Babel presets & plugins
├── metro.config.js            # Metro bundler (web overrides)
├── jest.config.js             # Jest configuration
├── jest.setup.js              # Native module mocks
├── tailwind.config.js         # Tailwind / NativeWind config (darkMode: 'class')
├── global.css                 # CSS custom properties (light & dark theme tokens)
├── components.json            # React Native Reusables / shadcn config
├── assets/                    # App icons & splash screen
└── src/
    ├── components/            # Shared UI components
    │   ├── DrawerContent.tsx  # Side menu (theme toggle, language, nav links)
    │   ├── ErrorBoundary.tsx
    │   └── ui/                # React Native Reusables components
    │       ├── button.tsx
    │       ├── card.tsx
    │       ├── menu-button.tsx
    │       ├── text.tsx
    │       └── toggle.tsx
    ├── screens/               # Screen components
    │   ├── HomeScreen.tsx
    │   ├── DetailsScreen.tsx  # Menu / milkshake list screen
    │   └── AboutScreen.tsx
    ├── navigation/            # Navigator definitions
    │   └── AppNavigator.tsx   # DrawerNavigator wrapping NativeStackNavigator
    ├── providers/             # Context providers
    │   ├── ThemeProvider.tsx  # Dark/light mode + persistence
    │   ├── LanguageProvider.tsx
    │   ├── AuthProvider.tsx
    │   ├── AdProvider.tsx
    │   └── ToastProvider.tsx
    ├── hooks/                 # Custom hooks
    │   ├── useSocket.ts
    │   └── useHaptics.ts
    ├── lib/                   # Shared utilities
    │   ├── utils.ts           # cn() helper (clsx + tailwind-merge)
    │   └── constants.ts
    ├── services/              # External service clients
    │   ├── storage.ts
    │   └── socket.ts
    ├── i18n/                  # i18n initialization
    │   └── index.ts
    ├── locales/               # Translation files
    │   ├── en.json
    │   └── pt-BR.json
    ├── types/                 # Shared TypeScript types
    │   └── navigation.ts      # RootStackParamList + DrawerParamList
    └── utils/                 # Utility functions
        └── platform.ts
```

## Provider Composition

Providers are nested in `App.tsx` in dependency order:

```
ErrorBoundary
 └─ GestureHandlerRootView
     └─ ThemeProvider          (dark/light mode)
         └─ LanguageProvider   (i18n)
             └─ AuthProvider
                 └─ AdProvider
                     └─ ToastProvider
                         └─ AppNavigator
                              └─ DrawerNavigator
                                  ├─ DrawerContent  (side menu)
                                  └─ NativeStackNavigator
                                       ├─ HomeScreen
                                       ├─ DetailsScreen
                                       └─ AboutScreen
```

## Detailed Reference

See [BOOTSTRAP.md](./BOOTSTRAP.md) for the full technology decisions, package versions, and configuration patterns.
