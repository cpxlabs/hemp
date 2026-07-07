# L-Shaped Curved Corner Pocket Ramp Documentation

The central skateboarding quarterpipe ramp incorporates a smooth, 90-degree wrapping corner pocket on the left side, matching custom wood-veneer transitions.

## Geometry Specifications
- **Straight Section**: A cylindrical segment quadrant of width 2.2 units: `cylinderGeometry args={[0.8, 0.8, 2.2, 32, 1, true, Math.PI, Math.PI / 2]}` at `position={[0.5, 0.8, -0.4]}`.
- **90-Degree wrapping pocket**: A curved quadrant cylinder rotated 90 degrees around Y: `cylinderGeometry args={[0.8, 0.8, 1.2, 32, 1, true, Math.PI, Math.PI / 2]}` at `position={[-0.6, 0.8, -0.4]}` and rotated `[0, Math.PI / 2, Math.PI / 2]`.
- **Coping Rails**: Splitted steel coping rails matching the straight center segment (`args={[0.05, 0.05, 2.2]}`) and the left pocket wrapper rail (`args={[0.05, 0.05, 1.2]}`).
- **Logo Shield**: Displays the custom 3D layered CPX Labs leaf logo shield mounted on the wood transition face.
- **Stencil tag**: Contains a dark stencil stencil plane (`planeGeometry args={[0.22, 0.15]}`) representing a "CPX" spray tag on the top right.

## Material Specs
- **Wood Veneer**: `#e3be94` (orange/golden maple wood plank style)
- **Sides/Platform**: `#1a1a1a` (matte black carbon composite structure)
- **Coping/Metal Plate**: `#f0f0f0`/`#e5e5e5` with `clearcoat={1.0}` and `roughness={0.02}` (highly polished stainless steel)
