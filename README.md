# Hemp Ramps 3D Configurator

**Live demo:** [saudade-rn.vercel.app](https://saudade-rn.vercel.app/) (CPX Labs Edition)

A high-performance 3D product configurator built with Expo (React Native Web), Three.js, and NativeWind. This application allows users to customize Hemp Ramps products in a real-time 3D environment with high-fidelity textures and animations.

## Features

- **Real-time 3D Rendering** — Powered by `@react-three/fiber` and `@react-three/drei`
- **Dynamic Configuration** — Instant visual feedback for material and geometry changes
- **Expo Managed Workflow** — Unified codebase for Web, iOS, and Android
- **NativeWind v4** — Tailwind CSS utilities for React Native with full dark mode support
- **CPX Labs Branding** — Dark mode aesthetics with neon green accents and carbon fiber textures
- **Glassmorphism UI** — Modern, semi-transparent interface panels using Framer Motion
- **Cross-Platform Navigation** — Type-safe routing with React Navigation (Drawer + Stack)
- **i18n Support** — Multi-language localization (English & Portuguese)
- **State Management** — Context API for theme, localization, and configuration state

## 3D Tech Stack

- **Three.js**: Core 3D engine
- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Useful helpers for R3F
- **Framer Motion**: Smooth UI transitions and configurator panel animations
- **Babel Static Block Support**: Essential for Three.js static class blocks in Metro

## Quick Start

```bash
# Install dependencies
pnpm install

# Run on web (Primary target)
pnpm run web

# Start Expo dev server
pnpm start
```

## Project Structure

```
├── App.tsx                    # Root component (provider composition)
├── src/
    ├── components/            # UI & 3D Components
    │   ├── Scene3D.tsx        # Main R3F Canvas and 3D Model logic
    │   ├── ConfiguratorPanel.tsx # Customizable options UI
    │   ├── Header.tsx         # Brand header with navigation
    │   └── ui/                # Base UI components (Button, Card, etc.)
    ├── screens/               # Screen components
    │   └── HomeScreen.tsx     # Main configurator landing page
    ├── providers/             # Global state (Theme, i18n, Auth)
    ├── lib/                   # Utils & brand constants
    └── i18n/                  # Translation setup
```

## Detailed Reference

See [BOOTSTRAP.md](./BOOTSTRAP.md) for full technology decisions and configuration patterns.
