# Chessboard & Pieces Set Documentation

The chess set features a polished wood chessboard with two complete sets of physical-material carved wooden chess pieces.

## Geometry Specifications
- **Chess Board**: Renders a dark wooden base (`boxGeometry args={[2.5, 0.1, 2.5]}`) with lighter wood insert grid face at `position={[2.4, -0.425, 1.1]}`.
- **Visual checker squares**: Checker pattern layout using coordinates offsets mapped dynamically.
- **Pieces**: Complete 32 pieces setup (pawns, rooks, knights, bishops, queens, kings) with custom geometries.

## Material Specs
- **Board Frame**: `#4a3b32` (dark walnut wood, `roughness: 0.6`)
- **Light squares**: `#bda591` (light birch wood, `roughness: 0.4`)
- **Chess Pieces**: 
  - Dark pieces: `#1b1b1b` (polished black obsidian/ceramic, `roughness: 0.12`, `clearcoat: 1.0`)
  - Light pieces: `#eaeaea` (polished white ivory, `roughness: 0.2`, `clearcoat: 1.0`)
