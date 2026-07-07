# Catalog Booklet Documentation

The brochure rests on the left sloped concrete bevel corner, representing the CPX catalog product brochure.

## Geometry Specifications
- **Main booklet**: A flat box: `boxGeometry args={[0.55, 0.03, 0.8]}`.
- **Label**: A thin green label sheet: `boxGeometry args={[0.38, 0.005, 0.4]}`.
- **Placement**: Renders on the sloped bevel face at `position={[-3.8, -0.42, 1.6]}` and rotated `[-0.2, 0.6, -0.15]` to match the concrete slope angle perfectly.

## Material Specs
- **Book Cover**: `#cbd3c9` (silver/grey paper finish, `roughness: 0.4`)
- **Cover label**: `#39FF14` (fluorescent neon green label)
