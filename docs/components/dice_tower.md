# Dice Tower Documentation

The Dice Tower features a dark castle stone tower column, complete with exit arch, catchment tray, neon logo accents, and dual side transparent exit chutes.

## Geometry Specifications
- **Tower Column**: `boxGeometry args={[0.9, 1.4, 0.9]}` at `position={[3.0, -0.425, -1.3]}`.
- **Top Battlements notch cuts**: Overlapping stone boxes for realistic notches.
- **Transparent exit chutes**: Dual glass slopes mounted on the left and right sides of the catch tray (`rotation={[0, 0, Math.PI / 8]}` and `[-Math.PI / 8]`) with transmission physics.

## Material Specs
- **Stone structure**: `#4a4d48`/`#3f413d` (rough slate stone gray, `roughness: 0.9`)
- **Transparent chutes**: `#ffffff` with `transmission: 0.9` and `opacity: 0.35` (acrylic/glass plates)
- **Central Core Logo**: Glowing neon green (`#39FF14`)
