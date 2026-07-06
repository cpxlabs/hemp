# Design System - Color Tokens

## Overview

This design system uses a semantic color token approach with full dark mode support. All colors are defined using HSL (Hue, Saturation, Lightness) format for better color manipulation and consistency across platforms (iOS, Android, Web).

## Brand Identities

- **Light Mode (Saudade)**: Parchment and Deep Walnut aesthetics, conveying a vintage, organic feel.
- **Dark Mode (Hemp Ramps)**: CPX Labs branding with Neon Green accents and Carbon Fiber textures, conveying a high-tech, performance-oriented feel.

## Color Architecture

- **Single Source of Truth**: All colors are defined as CSS custom properties in `global.css`.
- **Semantic Naming**: Colors are named by their purpose (e.g., `primary`, `destructive`) rather than their appearance.
- **Dark Mode Support**: Automatic theme switching via CSS class toggle.
- **Cross-Platform**: Works seamlessly with React Native via NativeWind and Tailwind CSS.

---

## Core Color Tokens

### Background Colors

#### Light Background (Parchment)
```css
--background: 40 60% 96%
```
- **Hex**: `#f7f0e6`
- **Usage**: Main background for Saudade theme.
- **Tailwind Class**: `bg-background`

#### Dark Background (Carbon/Black)
```css
--background: 0 0% 4%
```
- **Hex**: `#0A0A0A`
- **Usage**: Main background for Hemp Ramps theme.
- **Tailwind Class**: `dark:bg-background`

---

### Primary Colors

#### Primary (Deep Walnut / Neon Green)
- **Light (Saudade)**: `25 40% 18%` (#3d2b1a)
- **Dark (Hemp Ramps)**: `111 100% 54%` (#39FF14)
- **Usage**: Primary buttons, links, neon accents in dark mode.
- **Tailwind Class**: `bg-primary`

---

### Brand Palettes (src/lib/brand-colors.js)

These palettes are exported as JS constants for use in both Tailwind config and R3F component props.

#### CPX Labs (Branding)
- **Neon**: `#39FF14`
- **Dark**: `#0A0A0A`
- **Carbon**: `#121212`

#### Wood (Saudade)
- **Darkest**: `#2a1a10`
- **Dark**: `#332013`
- **Mid**: `#4a2d17`
- **Card**: `#3a2415`
- **Border**: `#5a3c26`

#### Gold (Antique/Accent)
- **Antique**: `#d4af37`
- **DEFAULT**: `#e6c280`
- **Muted**: `#d1bfa7`

---

## Utility Classes

### Glassmorphism
```css
.glass {
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### Carbon Texture
```css
.bg-carbon {
  background-color: #050505;
  background-image: radial-gradient(#111 10%, transparent 10%);
  background-size: 4px 4px;
}
```

---

## Usage Best Practices

1. **Always Use Semantic Tokens**: Prefer `bg-primary` over hardcoded hex values to ensure theme compatibility.
2. **Pair Background with Foreground**: Use `bg-primary` with `text-primary-foreground` for guaranteed contrast.
3. **Use Opacity Modifiers**: Leverage Tailwind's slash syntax (e.g., `bg-primary/80`) for subtle states.
4. **Test Both Themes**: Ensure configurator UI remains legible in both Parchment and Carbon themes.

---

**Last Updated**: 2025-05-15
**Version**: 1.2.0
