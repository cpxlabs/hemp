# Ground Concrete Slab Documentation

The ground structure of the Hemp Ramps 3D customization scene simulates a solid, thick, elevated concrete slab of a modern skatepark.

## Geometry Specifications
- **Base Geometry**: Renders a thick elevated box: `boxGeometry args={[9.5, 0.4, 5.0]}`.
- **Chamfered Bevel corner**: Features a diagonal sloped ramp block on the left-front corner at `position={[-4.0, -0.65, 1.8]}` with rotation `[0.3, -0.6, 0.1]` and size `args={[1.5, 0.4, 2.0]}`.
- **Subtle Slab Joint helper**: Includes a grid cuts pattern (`gridHelper args={[9.5, 12, ...]} position={[0, -0.44, 0]}`) that overlays thin, dark joints simulating concrete expansion cracks.

## Material Specs
- **Color**: `#b5b0a6` (concrete grey)
- **Roughness**: `0.8` (grainy, non-slippery skate concrete)
- **Metalness**: `0.15` (non-metallic)
