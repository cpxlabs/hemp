/* eslint-disable react/no-unknown-property */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  ContactShadows,
  Float
} from '@react-three/drei';
import { useTheme } from '../providers/ThemeProvider';
import { useConfigurator } from '../providers/ConfiguratorProvider';

// --- Material Selector Helper ---
const getMaterialProps = (materialName?: string, isDark?: boolean) => {
  const name = materialName?.toLowerCase() || '';
  if (name.includes('carbon') || name.includes('polymer') || name.includes('neon') || name.includes('acrylic')) {
    return {
      color: isDark ? '#39FF14' : '#00aa00',
      roughness: 0.1,
      metalness: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      emissive: isDark ? '#052200' : '#001100',
    };
  }
  if (name.includes('wood') || name.includes('walnut') || name.includes('bamboo') || name.includes('maple')) {
    return {
      color: '#6f4a27',
      roughness: 0.75,
      metalness: 0.05,
      clearcoat: 0.15,
      clearcoatRoughness: 0.4,
    };
  }
  // Default / Natural Fiber
  return {
    color: isDark ? '#d4af37' : '#b89223', // gold / brass tones
    roughness: 0.35,
    metalness: 0.6,
    clearcoat: 0.5,
  };
};

const StadiumLight = ({ position, isDark, color }: any) => {
  const poleColor = isDark ? '#1a1a1a' : '#666666';
  const lightColor = color || (isDark ? '#39FF14' : '#fff9e6');
  return (
    <group position={position}>
      {/* Pole - tapered for realism */}
      <mesh castShadow position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.025, 0.06, 2.2, 8]} />
        <meshStandardMaterial color={poleColor} roughness={0.3} metalness={0.85} />
      </mesh>
      {/* Pole base flange */}
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.08, 8]} />
        <meshStandardMaterial color={poleColor} roughness={0.4} metalness={0.9} />
      </mesh>
      {/* Arm bracket */}
      <mesh castShadow position={[0.1, 2.2, 0]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.2, 0.02, 0.02]} />
        <meshStandardMaterial color={poleColor} metalness={0.9} />
      </mesh>
      {/* Light Head housing */}
      <mesh castShadow position={[0.15, 2.3, 0]} rotation={[0.5, 0, 0]}>
        <boxGeometry args={[0.22, 0.1, 0.16]} />
        <meshStandardMaterial color="#111111" roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Glowing Lens Panel */}
      <mesh position={[0.15, 2.26, 0.05]} rotation={[0.5, 0, 0]}>
        <boxGeometry args={[0.18, 0.02, 0.13]} />
        <meshBasicMaterial color={lightColor} />
      </mesh>
      {/* Inner glow halo mesh */}
      <mesh position={[0.15, 2.28, 0.07]} rotation={[0.5, 0, 0]}>
        <boxGeometry args={[0.22, 0.01, 0.17]} />
        <meshBasicMaterial color={lightColor} transparent opacity={0.3} />
      </mesh>
      {/* SpotLight — narrow theatrical beam */}
      <spotLight
        position={[0.15, 2.35, 0.1]}
        target-position={[0, -0.4, 0]}
        intensity={isDark ? 12.0 : 5.0}
        distance={14}
        angle={Math.PI / 3}
        penumbra={0.6}
        color={lightColor}
        castShadow
        shadow-mapSize={[512, 512]}
      />
      {/* Halo point light for color bleed */}
      <pointLight
        position={[0.15, 2.3, 0.1]}
        intensity={isDark ? 3.0 : 1.0}
        distance={4}
        color={lightColor}
      />
    </group>
  );
};

const ChessPiece3D = ({ type, color }: { type: string; color: string }) => {
  const matProps = {
    color,
    roughness: color === '#eaeaea' ? 0.08 : 0.05,
    metalness: color === '#eaeaea' ? 0.2 : 0.8,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
  };
  
  if (type === 'pawn') {
    return (
      <group>
        {/* Base */}
        <mesh castShadow position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.06, 0.07, 0.04, 16]} />
          <meshPhysicalMaterial {...matProps} />
        </mesh>
        {/* Collar */}
        <mesh castShadow position={[0, 0.045, 0]}>
          <cylinderGeometry args={[0.04, 0.05, 0.01, 16]} />
          <meshPhysicalMaterial {...matProps} />
        </mesh>
        {/* Body */}
        <mesh castShadow position={[0, 0.09, 0]}>
          <cylinderGeometry args={[0.02, 0.04, 0.1, 16]} />
          <meshPhysicalMaterial {...matProps} />
        </mesh>
        {/* Head */}
        <mesh castShadow position={[0, 0.16, 0]}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshPhysicalMaterial {...matProps} />
        </mesh>
      </group>
    );
  }

  if (type === 'rook') {
    return (
      <group>
        {/* Base */}
        <mesh castShadow position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.065, 0.075, 0.04, 8]} />
          <meshPhysicalMaterial {...matProps} />
        </mesh>
        {/* Body */}
        <mesh castShadow position={[0, 0.09, 0]}>
          <cylinderGeometry args={[0.045, 0.055, 0.12, 8]} />
          <meshPhysicalMaterial {...matProps} />
        </mesh>
        {/* Top Battlements */}
        <mesh castShadow position={[0, 0.17, 0]}>
          <cylinderGeometry args={[0.065, 0.065, 0.04, 8]} />
          <meshPhysicalMaterial {...matProps} />
        </mesh>
      </group>
    );
  }

  if (type === 'knight') {
    return (
      <group>
        {/* Base */}
        <mesh castShadow position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.065, 0.075, 0.04, 8]} />
          <meshPhysicalMaterial {...matProps} />
        </mesh>
        {/* Mane/Body */}
        <mesh castShadow position={[0, 0.09, -0.01]}>
          <boxGeometry args={[0.04, 0.11, 0.07]} />
          <meshPhysicalMaterial {...matProps} />
        </mesh>
        {/* Snout */}
        <mesh castShadow position={[0, 0.13, 0.03]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.04, 0.05, 0.07]} />
          <meshPhysicalMaterial {...matProps} />
        </mesh>
      </group>
    );
  }

  if (type === 'bishop') {
    return (
      <group>
        {/* Base */}
        <mesh castShadow position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.065, 0.075, 0.04, 8]} />
          <meshPhysicalMaterial {...matProps} />
        </mesh>
        {/* Body */}
        <mesh castShadow position={[0, 0.09, 0]}>
          <coneGeometry args={[0.012, 0.048, 0.13, 8]} />
          <meshPhysicalMaterial {...matProps} />
        </mesh>
        {/* Oval Head */}
        <mesh castShadow position={[0, 0.16, 0]}>
          <sphereGeometry args={[0.036, 8, 8]} />
          <meshPhysicalMaterial {...matProps} />
        </mesh>
        {/* Tip */}
        <mesh castShadow position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.01, 8, 8]} />
          <meshPhysicalMaterial {...matProps} />
        </mesh>
      </group>
    );
  }

  if (type === 'queen') {
    return (
      <group>
        {/* Base */}
        <mesh castShadow position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.07, 0.08, 0.04, 8]} />
          <meshPhysicalMaterial {...matProps} />
        </mesh>
        {/* Body */}
        <mesh castShadow position={[0, 0.11, 0]}>
          <coneGeometry args={[0.018, 0.052, 0.16, 8]} />
          <meshPhysicalMaterial {...matProps} />
        </mesh>
        {/* Crown */}
        <mesh castShadow position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.055, 0.038, 0.04, 8]} />
          <meshPhysicalMaterial {...matProps} />
        </mesh>
        {/* Tiny top sphere */}
        <mesh castShadow position={[0, 0.23, 0]}>
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshPhysicalMaterial {...matProps} />
        </mesh>
      </group>
    );
  }

  // King
  return (
    <group>
      {/* Base */}
      <mesh castShadow position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.07, 0.08, 0.04, 8]} />
        <meshPhysicalMaterial {...matProps} />
      </mesh>
      {/* Body */}
      <mesh castShadow position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.03, 0.055, 0.18, 8]} />
        <meshPhysicalMaterial {...matProps} />
      </mesh>
      {/* Head/Crown */}
      <mesh castShadow position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.055, 0.045, 0.04, 8]} />
        <meshPhysicalMaterial {...matProps} />
      </mesh>
      {/* Cross on top */}
      <mesh castShadow position={[0, 0.25, 0]}>
        <boxGeometry args={[0.012, 0.036, 0.012]} />
        <meshPhysicalMaterial {...matProps} />
      </mesh>
      <mesh castShadow position={[0, 0.25, 0]}>
        <boxGeometry args={[0.036, 0.012, 0.012]} />
        <meshPhysicalMaterial {...matProps} />
      </mesh>
    </group>
  );
};

const SkatePark3D = ({ isDark }: { isDark: boolean }) => {
  const { lightsColor } = useConfigurator();
  const parkColor = '#dcdcdc'; // Crisper off-white concrete for premium look
  const structuralColor = isDark ? '#1f1f1f' : '#d5cbbd';
  const woodColor = '#a87544'; // Beautiful rich warm wood color for the ramp face
  const logoGreen = '#39FF14';

  const miniSkateRef = React.useRef<any>();

  useFrame((state) => {
    if (miniSkateRef.current) {
      const time = state.clock.getElapsedTime();
      // Slow speed movement back and forth along the quadrant curve
      // theta goes from bottom (around 0) to mid ramp (around 0.5)
      const theta = Math.sin(time * 0.7) * 0.35 - 0.25; 
      const R = 0.76; // Radius slightly smaller than the 0.8 ramp radius so the wheels rest exactly on the surface
      
      // Center of cylinder quadrant is at [0, 0.8, -0.4] in ramp space
      const localY = 0.8 + Math.sin(theta) * R;
      const localZ = -0.4 + Math.cos(theta) * R;
      
      miniSkateRef.current.position.set(-0.4, localY, localZ);
      
      // Tangent angle to curve
      miniSkateRef.current.rotation.x = -theta - Math.PI / 2;
      
      // Gentle realistic wiggle steer
      miniSkateRef.current.rotation.y = Math.sin(time * 1.4) * 0.12 + 0.3;
      miniSkateRef.current.rotation.z = Math.cos(time * 0.7) * 0.04;
    }
  });

  return (
    <group position={[0, -0.2, 0]}>
      {/* Ground Concrete Slab - Thick elevated platform */}
      <mesh receiveShadow position={[0, -0.65, 0]}>
        <boxGeometry args={[9.5, 0.4, 5.0]} />
        <meshPhysicalMaterial
          color={parkColor}
          roughness={0.75}
          metalness={0.05}
          clearcoat={0.1}
          clearcoatRoughness={0.8}
        />
      </mesh>

      {/* Concrete slab beveled edge strips for premium look */}
      {/* Front edge */}
      <mesh position={[0, -0.84, 2.55]}>
        <boxGeometry args={[9.5, 0.02, 0.08]} />
        <meshStandardMaterial color="#c8c8c8" roughness={0.3} metalness={0.5} />
      </mesh>
      {/* Back edge */}
      <mesh position={[0, -0.84, -2.55]}>
        <boxGeometry args={[9.5, 0.02, 0.08]} />
        <meshStandardMaterial color="#c8c8c8" roughness={0.3} metalness={0.5} />
      </mesh>

      {/* RGB LED Underglow Strip — thicker glow bar */}
      <mesh position={[0, -0.855, 0]}>
        <boxGeometry args={[9.62, 0.06, 5.12]} />
        <meshBasicMaterial color={lightsColor || '#39FF14'} />
      </mesh>
      {/* Underglow point lights for realistic color bleed onto floor */}
      <pointLight position={[-3.5, -0.9, 0]} intensity={isDark ? 2.0 : 0.5} distance={5} color={lightsColor || '#39FF14'} />
      <pointLight position={[3.5, -0.9, 0]} intensity={isDark ? 2.0 : 0.5} distance={5} color={lightsColor || '#39FF14'} />
      <pointLight position={[0, -0.9, 2]} intensity={isDark ? 1.5 : 0.4} distance={4} color={lightsColor || '#39FF14'} />

      {/* Diagonal bevelled sloped ramp on the left-front corner of the slab */}
      <mesh position={[-4.0, -0.65, 1.8]} rotation={[0.3, -0.6, 0.1]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.4, 2.0]} />
        <meshPhysicalMaterial color={parkColor} roughness={0.8} metalness={0.05} />
      </mesh>

      {/* Catalog booklet resting on the sloped bevel corner */}
      <group position={[-3.8, -0.42, 1.6]} rotation={[-0.2, 0.6, -0.15]}>
        {/* Book Cover */}
        <mesh castShadow>
          <boxGeometry args={[0.55, 0.03, 0.8]} />
          <meshStandardMaterial color="#cbd3c9" roughness={0.4} />
        </mesh>
        {/* Green CPX Label on the cover */}
        <mesh position={[0, 0.016, 0.02]}>
          <boxGeometry args={[0.38, 0.005, 0.4]} />
          <meshBasicMaterial color="#39FF14" />
        </mesh>
        {/* Label content lettering */}
        <mesh position={[0, 0.02, 0.02]}>
          <boxGeometry args={[0.22, 0.002, 0.08]} />
          <meshBasicMaterial color="#111111" />
        </mesh>
      </group>
      
      {/* Concrete slab joint cuts (subtle grid lines) */}
      <gridHelper args={[9.5, 10, isDark ? '#c0c0c0' : '#999999', isDark ? '#b8b8b8' : '#aaaaaa']} position={[0, -0.44, 0]} />

      {/* Painted floor markings - start/boundary lines */}
      {/* Center line */}
      <mesh position={[0, -0.437, 0]}>
        <boxGeometry args={[0.06, 0.001, 5.0]} />
        <meshBasicMaterial color={isDark ? '#555555' : '#aaaaaa'} />
      </mesh>
      {/* Left boundary */}
      <mesh position={[-2.5, -0.437, 0]}>
        <boxGeometry args={[0.06, 0.001, 5.0]} />
        <meshBasicMaterial color={isDark ? '#555555' : '#aaaaaa'} />
      </mesh>
      {/* Right boundary */}
      <mesh position={[2.5, -0.437, 0]}>
        <boxGeometry args={[0.06, 0.001, 5.0]} />
        <meshBasicMaterial color={isDark ? '#555555' : '#aaaaaa'} />
      </mesh>
      {/* Front boundary (bright accent) */}
      <mesh position={[0, -0.437, 1.8]}>
        <boxGeometry args={[9.5, 0.001, 0.08]} />
        <meshBasicMaterial color={lightsColor || '#39FF14'} transparent opacity={0.5} />
      </mesh>
      {/* Back boundary accent */}
      <mesh position={[0, -0.437, -1.8]}>
        <boxGeometry args={[9.5, 0.001, 0.08]} />
        <meshBasicMaterial color={lightsColor || '#39FF14'} transparent opacity={0.3} />
      </mesh>

      {/* --- Stadium Corner Lights for Sparks and Warm Glow --- */}
      <StadiumLight position={[-4.2, -0.425, -2.2]} isDark={isDark} color={lightsColor} />
      <StadiumLight position={[4.2, -0.425, -2.2]} isDark={isDark} color={lightsColor} />
      <StadiumLight position={[-4.2, -0.425, 2.2]} isDark={isDark} color={lightsColor} />
      <StadiumLight position={[4.2, -0.425, 2.2]} isDark={isDark} color={lightsColor} />
      {/* Mid-side accent poles */}
      <StadiumLight position={[-4.2, -0.425, 0]} isDark={isDark} color={lightsColor} />
      <StadiumLight position={[4.2, -0.425, 0]} isDark={isDark} color={lightsColor} />

      {/* Secondary glowing RGB light orbs at the sides of the concrete park */}
      <group position={[-3.8, -0.3, -0.5]}>
        <mesh castShadow>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color={lightsColor} />
        </mesh>
        <pointLight color={lightsColor} intensity={isDark ? 4.0 : 1.5} distance={6} />
      </group>
      <group position={[3.8, -0.3, -0.5]}>
        <mesh castShadow>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color={lightsColor} />
        </mesh>
        <pointLight color={lightsColor} intensity={isDark ? 4.0 : 1.5} distance={6} />
      </group>
      {/* Back-center accent orb */}
      <group position={[0, -0.3, -2.0]}>
        <mesh>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color={lightsColor} />
        </mesh>
        <pointLight color={lightsColor} intensity={isDark ? 2.5 : 0.8} distance={4} />
      </group>

      {/* --- Central Skate Ramp (Quarterpipe with L-shaped Curved Corner Pocket) --- */}
      <group position={[-0.4, -0.425, -0.5]}>
        {/* Base block - now with richer material */}
        <mesh castShadow receiveShadow position={[0.5, 0.4, -0.8]}>
          <boxGeometry args={[2.2, 0.8, 1.2]} />
          <meshPhysicalMaterial color="#151515" roughness={0.5} metalness={0.4} clearcoat={0.2} />
        </mesh>

        {/* Left corner block extension for L-shaped pocket */}
        <mesh castShadow receiveShadow position={[-1.1, 0.4, -0.8]}>
          <boxGeometry args={[1.0, 0.8, 1.2]} />
          <meshPhysicalMaterial color="#151515" roughness={0.5} metalness={0.4} clearcoat={0.2} />
        </mesh>

        {/* Concrete wall backdrop behind the ramp for scene depth */}
        <mesh receiveShadow position={[0, 0.6, -2.1]}>
          <boxGeometry args={[4.0, 2.8, 0.12]} />
          <meshPhysicalMaterial color={isDark ? '#111111' : '#cccccc'} roughness={0.95} metalness={0.0} />
        </mesh>
        {/* Wall accent stripe */}
        <mesh position={[0, 1.4, -2.03]}>
          <boxGeometry args={[4.0, 0.06, 0.02]} />
          <meshBasicMaterial color={lightsColor || '#39FF14'} transparent opacity={0.6} />
        </mesh>
        {/* Lower wall skirt */}
        <mesh position={[0, -0.1, -2.03]}>
          <boxGeometry args={[4.0, 0.3, 0.02]} />
          <meshStandardMaterial color={isDark ? '#0a0a0a' : '#bbbbbb'} roughness={0.9} />
        </mesh>
        
        {/* Curved ramp surface - Straight center section with richer maple */}
        <mesh castShadow receiveShadow position={[0.5, 0.8, -0.4]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.8, 0.8, 2.2, 32, 1, true, Math.PI, Math.PI / 2]} />
          <meshPhysicalMaterial color="#d4a66a" roughness={0.28} clearcoat={0.5} clearcoatRoughness={0.1} side={2} />
        </mesh>
        {/* Wood plank ribs on center ramp (horizontal lines across the surface) */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const angle = Math.PI + (Math.PI / 2) * (i / 7);
          const ry = 0.8 + Math.sin(angle) * 0.8;
          const rz = -0.4 + Math.cos(angle) * 0.8;
          return (
            <mesh key={`rib-${i}`} position={[0.5, ry, rz]} rotation={[angle, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.808, 0.808, 2.2, 4, 1, true, 0, 0.03]} />
              <meshBasicMaterial color={isDark ? '#1a1108' : '#3a200a'} transparent opacity={0.5} />
            </mesh>
          );
        })}

        {/* Curved ramp surface - Left wrapping corner pocket section */}
        <mesh castShadow receiveShadow position={[-0.6, 0.8, -0.4]} rotation={[0, Math.PI / 2, Math.PI / 2]}>
          <cylinderGeometry args={[0.8, 0.8, 1.2, 32, 1, true, Math.PI, Math.PI / 2]} />
          <meshPhysicalMaterial color="#d4a66a" roughness={0.28} clearcoat={0.5} clearcoatRoughness={0.1} side={2} />
        </mesh>

        {/* Left carbon side wall enclosing transition curve */}
        <mesh castShadow receiveShadow position={[-1.58, 0.4, -0.4]}>
          <boxGeometry args={[0.04, 0.8, 0.8]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.75} />
        </mesh>
        {/* Right carbon side wall enclosing transition curve */}
        <mesh castShadow receiveShadow position={[1.58, 0.4, -0.4]}>
          <boxGeometry args={[0.04, 0.8, 0.8]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.75} />
        </mesh>

        {/* CPX stencil logo tag on the top right of the ramp */}
        <mesh position={[1.2, 0.62, -0.81]} rotation={[Math.PI / 6, 0, 0]}>
          <planeGeometry args={[0.22, 0.15]} />
          <meshBasicMaterial color="#111111" transparent opacity={0.65} />
        </mesh>

        {/* Beautiful 3D CPX Labs leaf logo matching the reference image */}
        <group position={[0.5, 0.38, -0.15]} rotation={[Math.PI / 6, 0, 0]}>
          {/* Stylized dark gray X background plate */}
          <group>
            <mesh castShadow rotation={[0, 0, 0.5]}>
              <boxGeometry args={[0.9, 0.16, 0.05]} />
              <meshStandardMaterial color="#1f2122" roughness={0.5} />
            </mesh>
            <mesh castShadow rotation={[0, 0, -0.5]}>
              <boxGeometry args={[0.9, 0.16, 0.05]} />
              <meshStandardMaterial color="#1f2122" roughness={0.5} />
            </mesh>
            {/* Green accents on the background plate */}
            <mesh position={[-0.2, 0.15, 0.03]} rotation={[0, 0, 0.5]}>
              <boxGeometry args={[0.2, 0.04, 0.01]} />
              <meshBasicMaterial color="#39FF14" />
            </mesh>
            <mesh position={[-0.32, 0.05, 0.03]} rotation={[0, 0, -0.5]}>
               <boxGeometry args={[0.2, 0.04, 0.01]} />
               <meshBasicMaterial color="#39FF14" />
            </mesh>
          </group>

          {/* Stylized White swoosh shield */}
          <mesh position={[-0.05, -0.05, 0.04]} rotation={[0, 0, 0.3]}>
            <boxGeometry args={[0.15, 0.3, 0.02]} />
            <meshStandardMaterial color="#ffffff" roughness={0.3} />
          </mesh>
          <mesh position={[-0.1, -0.1, 0.05]} rotation={[0, 0, -0.1]}>
            <boxGeometry args={[0.12, 0.25, 0.02]} />
            <meshStandardMaterial color="#ffffff" roughness={0.3} />
          </mesh>

          {/* Green Skateboard Leaf Symbol */}
          <group position={[0.15, 0, 0.06]} rotation={[0, 0, -0.2]}>
            {/* Center stem */}
            <mesh position={[0, -0.1, 0]}>
              <boxGeometry args={[0.015, 0.18, 0.01]} />
              <meshBasicMaterial color="#2d4a23" />
            </mesh>
            {/* Overlapping green leaf lobes */}
            {[0.12, 0.16, 0.2, 0.16, 0.12].map((len, idx) => {
              const rot = -0.8 + idx * 0.4;
              return (
                <mesh key={idx} position={[Math.sin(rot) * len * 0.4, Math.cos(rot) * len * 0.4 - 0.05, 0.005]} rotation={[0, 0, -rot]}>
                  <boxGeometry args={[0.04, len, 0.01]} />
                  <meshBasicMaterial color="#365e2b" />
                </mesh>
              );
            })}
          </group>
        </group>
        
        {/* Metal transition plate at bottom - Straight center section */}
        <mesh receiveShadow position={[0.5, 0.05, 0.75]} rotation={[-Math.PI / 24, 0, 0]}>
          <boxGeometry args={[2.2, 0.02, 0.5]} />
          <meshPhysicalMaterial color="#e5e5e5" metalness={0.98} roughness={0.05} clearcoat={1.0} clearcoatRoughness={0.02} />
        </mesh>
        {/* Metal transition plate at bottom - Left corner section */}
        <mesh receiveShadow position={[-1.1, 0.05, 0.75]} rotation={[-Math.PI / 24, 0, 0]}>
          <boxGeometry args={[1.0, 0.02, 0.5]} />
          <meshPhysicalMaterial color="#e5e5e5" metalness={0.98} roughness={0.05} clearcoat={1.0} clearcoatRoughness={0.02} />
        </mesh>

        {/* Coping metal rail at top - Straight center section (GLOWING) */}
        <mesh castShadow position={[0.5, 0.8, -1.2]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, 2.2, 16]} />
          <meshPhysicalMaterial color="#f8f8f8" metalness={0.99} roughness={0.01} clearcoat={1.0} clearcoatRoughness={0.01} emissive="#ffffff" emissiveIntensity={isDark ? 0.4 : 0.1} />
        </mesh>
        {/* Coping glow fill light */}
        {isDark && <pointLight position={[0.5, 0.85, -1.15]} intensity={1.5} distance={3} color="#ffffff" />}

        {/* Coping metal rail at top - 90-degree curved corner section */}
        <mesh castShadow position={[-0.6, 0.8, -0.6]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 1.2, 16]} />
          <meshPhysicalMaterial color="#f8f8f8" metalness={0.99} roughness={0.01} clearcoat={1.0} clearcoatRoughness={0.01} emissive="#ffffff" emissiveIntensity={isDark ? 0.3 : 0.1} />
        </mesh>

        {/* Wooden guard rail fence behind top platform - warmer wood */}
        <group position={[0, 0.8, -1.35]}>
          {/* Vertical posts */}
          {[-1.5, 0, 1.5].map((x) => (
            <mesh key={x} position={[x, 0.45, 0]} castShadow>
              <boxGeometry args={[0.05, 0.9, 0.05]} />
              <meshPhysicalMaterial color="#8b5e2c" roughness={0.65} clearcoat={0.3} />
            </mesh>
          ))}
          {/* Horizontal rails */}
          {[0.25, 0.55, 0.82].map((y) => (
            <mesh key={y} position={[0, y, 0]} castShadow>
              <boxGeometry args={[3.15, 0.055, 0.04]} />
              <meshPhysicalMaterial color="#8b5e2c" roughness={0.6} clearcoat={0.3} />
            </mesh>
          ))}
          {/* Safety net between rails */}
          <mesh position={[0, 0.5, 0]}>
            <boxGeometry args={[3.1, 0.7, 0.005]} />
            <meshBasicMaterial color={isDark ? '#111111' : '#888888'} transparent opacity={0.35} />
          </mesh>
        </group>


        {/* Complete Miniature Skateboard (Tech Deck) sliding slowly back and forth */}
        <SkateDecks ref={miniSkateRef} active={false} material="wood" isDark={isDark} scale={0.42} />

        {/* Spray can prop on the flat surface */}
        <group position={[1.1, 0.1, 0.55]} rotation={[0, -0.8, 0]}>
          {/* Can body */}
          <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.32, 16]} />
            <meshPhysicalMaterial color={lightsColor || '#39FF14'} roughness={0.15} metalness={0.7} clearcoat={1.0} />
          </mesh>
          {/* Can cap */}
          <mesh castShadow position={[0, 0, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.06, 0.06, 12]} />
            <meshStandardMaterial color="#111111" roughness={0.3} />
          </mesh>
          {/* Can nozzle */}
          <mesh position={[0, 0, 0.245]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.012, 0.012, 0.04, 8]} />
            <meshStandardMaterial color="#dddddd" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Label band */}
          <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.062, 0.062, 0.15, 16]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
          </mesh>
        </group>

        {/* Miniature metal trucks and loose screws lying on the flat surface */}
        <group position={[0.2, 0.1, 0.3]} rotation={[0, -0.4, 0]} scale={1.5}>
          {/* Tiny truck hanger */}
          <mesh position={[0, 0.02, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, 0.25, 8]} />
            <meshPhysicalMaterial color="#ffffff" metalness={1.0} roughness={0.05} clearcoat={1.0} />
          </mesh>
          {/* Baseplate */}
          <mesh position={[0, 0.005, 0]} castShadow>
            <boxGeometry args={[0.07, 0.01, 0.09]} />
            <meshPhysicalMaterial color="#e0e0e0" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Loose screws */}
          {[-0.12, 0.05, 0.18].map((x, idx) => (
            <mesh key={x} position={[x, 0.005, 0.1 + idx * 0.03]} rotation={[0.4, idx * 0.8, 0.2]} castShadow>
              <cylinderGeometry args={[0.006, 0.006, 0.05, 8]} />
              <meshPhysicalMaterial color={lightsColor || "#39FF14"} metalness={0.8} roughness={0.2} emissive={lightsColor || "#39FF14"} emissiveIntensity={0.5} />
            </mesh>
          ))}
        </group>

        {/* Graffiti / sticker tag on the LEFT black side wall */}
        <group position={[-1.585, 0.42, -0.28]}>
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[0.5, 0.28]} />
            <meshBasicMaterial color="#080808" transparent opacity={0.9} />
          </mesh>
          <mesh position={[0.022, 0.06, 0]} rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[0.32, 0.06, 0.008]} />
            <meshBasicMaterial color={lightsColor || '#39FF14'} />
          </mesh>
          <mesh position={[0.022, -0.005, 0]} rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[0.25, 0.035, 0.008]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
          </mesh>
          {/* Point light so the sticker glows */}
          {isDark && <pointLight position={[0.1, 0.42, -0.28]} intensity={1.5} distance={1.5} color={lightsColor || '#39FF14'} />}
        </group>

        {/* Graffiti sticker on the RIGHT black side wall */}
        <group position={[1.585, 0.4, -0.55]} rotation={[0, Math.PI, 0]}>
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[0.4, 0.22]} />
            <meshBasicMaterial color="#080808" transparent opacity={0.85} />
          </mesh>
          {/* Star shape approximation */}
          <mesh position={[-0.022, 0.02, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <boxGeometry args={[0.2, 0.04, 0.008]} />
            <meshBasicMaterial color="#FF1493" />
          </mesh>
          <mesh position={[-0.022, 0.02, 0]} rotation={[0, -Math.PI / 2, 0.9]}>
            <boxGeometry args={[0.18, 0.035, 0.008]} />
            <meshBasicMaterial color="#FF1493" />
          </mesh>
          <mesh position={[-0.022, -0.04, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <boxGeometry args={[0.14, 0.02, 0.008]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.7} />
          </mesh>
        </group>

        {/* Small stack of spare wheels on the right wall */}
        <group position={[1.585, 0.09, -0.7]}>
          {[0, 1, 2].map((i) => (
            <mesh key={i} position={[0, i * 0.06, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.085, 0.075, 0.055, 20]} />
              <meshPhysicalMaterial color="#eeeeee" roughness={0.45} clearcoat={0.3} />
            </mesh>
          ))}
        </group>

        {/* Skid mark on the flat bottom surface */}
        <mesh position={[0.5, 0.07, 0.4]} rotation={[-Math.PI / 2, 0, 0.3]}>
          <planeGeometry args={[0.8, 0.06]} />
          <meshBasicMaterial color={isDark ? '#333333' : '#888888'} transparent opacity={0.4} />
        </mesh>
        <mesh position={[0.3, 0.07, 0.6]} rotation={[-Math.PI / 2, 0, 0.1]}>
          <planeGeometry args={[0.5, 0.04]} />
          <meshBasicMaterial color={isDark ? '#2a2a2a' : '#777777'} transparent opacity={0.3} />
        </mesh>
      </group>

      {/* --- Stack of Premium Cardboard Packaging Boxes to the Left --- */}
      <group position={[-3.3, -0.425, 0.4]} rotation={[0.05, 0.5, 0]}>
        {[0, 1, 2].map((index) => {
          // Subtle organic offsets for hand-stacked realism
          const randRotY = index === 2 ? 0 : Math.sin(index * 45) * 0.08;
          const randOffsetX = index === 2 ? 0 : Math.cos(index * 30) * 0.05;
          const randOffsetZ = index === 2 ? 0 : Math.sin(index * 20) * 0.05;
          
          return (
            <group key={index} position={[randOffsetX, 0.06 + index * 0.12, randOffsetZ]} rotation={[0, randRotY, 0]}>
              {/* Premium Matte Cardboard Box */}
              <mesh castShadow position={[0, 0, 0]}>
                <boxGeometry args={[0.9, 0.11, 1.8]} />
                <meshStandardMaterial color={isDark ? '#1a1a1a' : '#d9cfc1'} roughness={0.9} />
              </mesh>
              
              {/* Colored Foil Trim (Side accents) */}
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.91, 0.01, 1.81]} />
                <meshPhysicalMaterial color={index % 2 === 0 ? (lightsColor || '#39FF14') : '#f5f5f5'} metalness={1.0} roughness={0.1} clearcoat={1.0} />
              </mesh>

              {/* Holographic / Emissive Screen on the top box */}
              {index === 2 && (
                <group position={[0, 0.056, 0]}>
                  {/* Outer gloss plate */}
                  <mesh>
                    <boxGeometry args={[0.6, 0.002, 1.2]} />
                    <meshPhysicalMaterial color="#050505" roughness={0.05} metalness={0.8} clearcoat={1.0} />
                  </mesh>
                  {/* Inside glowing holographic screen */}
                  <mesh position={[0, 0.002, 0]}>
                    <boxGeometry args={[0.5, 0.002, 1.0]} />
                    <meshBasicMaterial color={lightsColor || logoGreen} />
                    <pointLight position={[0, 0.5, 0]} intensity={isDark ? 1.5 : 0.5} distance={2} color={lightsColor || logoGreen} />
                  </mesh>
                </group>
              )}
            </group>
          );
        })}
      </group>

      {/* --- Detailed Stone Dice Tower to the Right --- */}
      <group position={[2.7, -0.425, -1.75]} rotation={[0, -0.4, 0]} scale={0.8}>
        {/* Tower Base castle wall */}
        <mesh castShadow position={[0, 0.7, 0]}>
          <boxGeometry args={[0.9, 1.4, 0.9]} />
          <meshStandardMaterial color="#1c1c1a" roughness={0.75} metalness={0.4} />
        </mesh>
        {/* Battlements top rim */}
        <mesh position={[0, 1.45, 0]} castShadow>
          <boxGeometry args={[1.05, 0.2, 1.05]} />
          <meshStandardMaterial color="#121210" roughness={0.75} metalness={0.4} />
        </mesh>
        {/* Battlement corner notches */}
        {[-0.45, 0.45].map((x) =>
          [-0.45, 0.45].map((z) => (
            <mesh key={`${x}-${z}`} position={[x, 1.6, z]} castShadow>
              <boxGeometry args={[0.2, 0.15, 0.2]} />
              <meshStandardMaterial color="#121210" roughness={0.75} metalness={0.4} />
            </mesh>
          ))
        )}
        {/* Catch Tray front box */}
        <mesh position={[0, 0.125, 0.65]} castShadow>
          <boxGeometry args={[1.0, 0.25, 0.8]} />
          <meshStandardMaterial color="#1c1c1a" roughness={0.75} metalness={0.4} />
        </mesh>
        {/* Dice Catch interior tray */}
        <mesh position={[0, 0.05, 0.65]}>
          <boxGeometry args={[0.85, 0.1, 0.65]} />
          <meshStandardMaterial color="#0c0c0a" roughness={0.8} />
        </mesh>
        {/* Arch exit door / Glowing Portal */}
        <mesh position={[0, 0.25, 0.451]}>
          <boxGeometry args={[0.35, 0.5, 0.02]} />
          <meshBasicMaterial color={lightsColor || '#39FF14'} />
          <pointLight position={[0, 0, 0.3]} intensity={isDark ? 2.5 : 1.0} distance={3} color={lightsColor || '#39FF14'} />
        </mesh>
        {/* Engraved logo details on front */}
        <mesh position={[0, 0.9, 0.452]}>
          <boxGeometry args={[0.4, 0.3, 0.01]} />
          <meshStandardMaterial color="#2c2c2a" roughness={0.7} />
        </mesh>
        {/* Left Glass Chute */}
        <mesh position={[-0.8, 0.18, 0.65]} rotation={[0, 0, Math.PI / 8]} castShadow>
          <boxGeometry args={[0.6, 0.02, 0.65]} />
          <meshPhysicalMaterial color="#ffffff" transparent opacity={0.4} roughness={0.05} transmission={0.95} thickness={0.5} clearcoat={1.0} />
        </mesh>
        {/* Right Glass Chute */}
        <mesh position={[0.8, 0.18, 0.65]} rotation={[0, 0, -Math.PI / 8]} castShadow>
          <boxGeometry args={[0.6, 0.02, 0.65]} />
          <meshPhysicalMaterial color="#ffffff" transparent opacity={0.4} roughness={0.05} transmission={0.95} thickness={0.5} clearcoat={1.0} />
        </mesh>
      </group>

      {/* --- Chess Board and pieces in Front Right --- */}
      <group position={[2.0, -0.425, 0.75]} rotation={[0, -0.15, 0]} scale={0.78}>
        {/* Chess board base frame main block */}
        <mesh castShadow receiveShadow position={[0, 0.05, 0]}>
          <boxGeometry args={[2.5, 0.1, 2.5]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.65} metalness={0.3} />
        </mesh>
        {/* Beveled top rim for premium feel */}
        <mesh receiveShadow position={[0, 0.11, 0]}>
          <boxGeometry args={[2.4, 0.02, 2.4]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.65} metalness={0.3} />
        </mesh>
        {/* Lighter wooden inner board inset */}
        <mesh position={[0, 0.121, 0]}>
          <boxGeometry args={[2.3, 0.005, 2.3]} />
          <meshStandardMaterial color="#bda591" roughness={0.4} />
        </mesh>
        {/* Visual dark squares grid pattern */}
        {[-3.5, -1.5, 0.5, 2.5].map((xOffset) =>
          [-3.5, -1.5, 0.5, 2.5].map((zOffset) => (
            <group key={`${xOffset}-${zOffset}`}>
              {/* Checkerboard square alignment offsets */}
              {[-0.5, 0.5].map((dx) =>
                [-0.5, 0.5].map((dz) => {
                  const isBlack = (Math.floor(xOffset) + Math.floor(zOffset) + (dx > 0 ? 1 : 0) + (dz > 0 ? 1 : 0)) % 2 === 0;
                  if (isBlack) return null;
                  return (
                    <mesh key={`${dx}-${dz}`} position={[(xOffset + dx) * 0.275, 0.116, (zOffset + dz) * 0.275]}>
                      <boxGeometry args={[0.275, 0.005, 0.275]} />
                      <meshStandardMaterial color="#30241b" roughness={0.7} />
                    </mesh>
                  );
                })
              )}
            </group>
          ))
        )}

        {/* Detailed 3D Chess Pieces set (Full 8x2 set for each player) */}
        {/* Player 1 (Black pieces - Back Row & Pawns) */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((colIdx) => {
          const x = (colIdx - 3.5) * 0.275;
          const pieceType = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'][colIdx];
          return (
            <group key={`black-${colIdx}`}>
              {/* Back Row */}
              <group position={[x, 0.11, -0.96]}>
                <ChessPiece3D type={pieceType} color="#1a1a1a" />
              </group>
              {/* Pawns Row */}
              <group position={[x, 0.11, -0.685]}>
                <ChessPiece3D type="pawn" color="#1a1a1a" />
              </group>
            </group>
          );
        })}

        {/* Player 2 (White pieces - Back Row & Pawns) */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((colIdx) => {
          const x = (colIdx - 3.5) * 0.275;
          const pieceType = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'][colIdx];
          return (
            <group key={`white-${colIdx}`}>
              {/* Back Row */}
              <group position={[x, 0.11, 0.96]}>
                <ChessPiece3D type={pieceType} color="#eaeaea" />
              </group>
              {/* Pawns Row */}
              <group position={[x, 0.11, 0.685]}>
                <ChessPiece3D type="pawn" color="#eaeaea" />
              </group>
            </group>
          );
        })}
      </group>
    </group>
  );
};

const SkateRamp = ({ active, material, isDark, isCollapsed = false, ...props }: any) => {
  const matProps = getMaterialProps(material, isDark);
  const leftSlopeRef = React.useRef<any>();
  const rightSlopeRef = React.useRef<any>();

  const targetRotation = isCollapsed ? 0 : Math.PI / 6;
  const targetY = isCollapsed ? 0.05 : 0.3;
  const targetXOffset = isCollapsed ? 0.75 : 1.2;

  useFrame(() => {
    if (leftSlopeRef.current && rightSlopeRef.current) {
      leftSlopeRef.current.rotation.z += (targetRotation - leftSlopeRef.current.rotation.z) * 0.1;
      rightSlopeRef.current.rotation.z += (-targetRotation - rightSlopeRef.current.rotation.z) * 0.1;
      
      leftSlopeRef.current.position.y += (targetY - leftSlopeRef.current.position.y) * 0.1;
      rightSlopeRef.current.position.y += (targetY - rightSlopeRef.current.position.y) * 0.1;
      
      leftSlopeRef.current.position.x += (-targetXOffset - leftSlopeRef.current.position.x) * 0.1;
      rightSlopeRef.current.position.x += (targetXOffset - rightSlopeRef.current.position.x) * 0.1;
    }
  });

  return (
    <group {...props}>
      {/* Base Ramp Structure */}
      <mesh receiveShadow castShadow position={[0, -0.2, 0]}>
        <boxGeometry args={[3.2, 0.4, 1.8]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      {/* Slopes */}
      <mesh ref={leftSlopeRef} position={[-1.2, 0.3, 0]} rotation={[0, 0, Math.PI / 6]} castShadow>
        <boxGeometry args={[1.5, 0.1, 1.8]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      <mesh ref={rightSlopeRef} position={[1.2, 0.3, 0]} rotation={[0, 0, -Math.PI / 6]} castShadow>
        <boxGeometry args={[1.5, 0.1, 1.8]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
    </group>
  );
};

const SkateDecks = React.forwardRef(({ active, material, isDark, ...props }: any, ref: any) => {
  const matProps = {
    color: '#1a1a1a', // Black grip tape look
    roughness: 0.98,
    metalness: 0.05,
  };
  const woodCoreProps = {
    color: '#d1a075', // Richer maple ply
    roughness: 0.35,
    metalness: 0.05,
    clearcoat: 0.8,
    clearcoatRoughness: 0.1,
  };
  
  const graphicProps = {
    color: '#0a0a0a',
    roughness: 0.2,
    metalness: 0.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
  };

  const bushingProps = {
    color: '#39FF14', // Neon lime green Pro bushings
    roughness: 0.4,
    transmission: 0.2,
    thickness: 0.1,
  };

  const metalProps = {
    color: '#e0e0e0', // Polished silver trucks
    roughness: 0.1,
    metalness: 0.95,
  };

  const hardwareColor = '#111111'; // Black allen bolts

  return (
    <group ref={ref} {...props} rotation={[0, 0, 0]}>
      {/* --- The Deck with Concave & Double Kicktail --- */}
      <group position={[0, 0.1, 0]}>
        {/* --- Middle Section with Concave (Split into center + side rails) --- */}
        <group position={[0, 0, 0]}>
          {/* Flat Center Grip */}
          <mesh castShadow receiveShadow position={[0, 0, 0]}>
            <boxGeometry args={[0.42, 0.025, 1.2]} />
            <meshPhysicalMaterial {...matProps} />
          </mesh>
          {/* Grip Tape Cut-out line exposing wood underneath */}
          <mesh position={[0, 0.013, -0.2]}>
            <boxGeometry args={[0.425, 0.002, 0.03]} />
            <meshPhysicalMaterial {...woodCoreProps} />
          </mesh>

          {/* Left Concave Rail */}
          <mesh castShadow receiveShadow position={[-0.28, 0.035, 0]} rotation={[0, 0, Math.PI / 12]}>
            <boxGeometry args={[0.16, 0.025, 1.2]} />
            <meshPhysicalMaterial {...matProps} />
          </mesh>
          {/* Right Concave Rail */}
          <mesh castShadow receiveShadow position={[0.28, 0.035, 0]} rotation={[0, 0, -Math.PI / 12]}>
            <boxGeometry args={[0.16, 0.025, 1.2]} />
            <meshPhysicalMaterial {...matProps} />
          </mesh>

          {/* Laminated Wood Core Layer (7-Ply visible edge) */}
          {Array.from({ length: 5 }).map((_, plyIdx) => {
            const plyThickness = 0.003;
            const isDyed = plyIdx === 2;
            const plyColor = isDyed ? '#39FF14' : (plyIdx % 2 === 0 ? '#d1a075' : '#b37f50');
            return (
              <mesh key={`center-ply-${plyIdx}`} position={[0, -0.015 - (plyIdx * plyThickness), 0]}>
                <boxGeometry args={[0.74, plyThickness, 1.2]} />
                <meshPhysicalMaterial {...woodCoreProps} color={plyColor} />
              </mesh>
            );
          })}

          {/* Bottom Deck Graphic (CPX Custom Foil Decal) */}
          <group position={[0, -0.032, 0]}>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.7, 0.002, 1.1]} />
              <meshPhysicalMaterial {...graphicProps} />
            </mesh>
            <mesh position={[0, -0.001, 0.1]}>
              <boxGeometry args={[0.3, 0.002, 0.6]} />
              <meshBasicMaterial color="#39FF14" />
            </mesh>
            <mesh position={[0, -0.001, -0.3]}>
              <boxGeometry args={[0.4, 0.002, 0.1]} />
              <meshBasicMaterial color="#39FF14" />
            </mesh>
          </group>

          {/* 8 Black Hardware Bolts sunken into grip tape */}
          {/* Front Truck Bolts */}
          {[[-0.12, 0.45], [0.12, 0.45], [-0.12, 0.55], [0.12, 0.55]].map(([hx, hz], i) => (
            <group key={`f-bolt-${i}`} position={[hx, 0.012, hz]}>
              <mesh position={[0, 0.001, 0]}>
                <cylinderGeometry args={[0.022, 0.022, 0.002, 12]} />
                <meshBasicMaterial color="#050505" />
              </mesh>
              <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.012, 0.012, 0.01, 8]} />
                <meshStandardMaterial color={hardwareColor} metalness={0.8} roughness={0.2} />
              </mesh>
            </group>
          ))}

          {/* Rear Truck Bolts */}
          {[[-0.12, -0.45], [0.12, -0.45], [-0.12, -0.55], [0.12, -0.55]].map(([hx, hz], i) => (
            <group key={`r-bolt-${i}`} position={[hx, 0.012, hz]}>
              <mesh position={[0, 0.001, 0]}>
                <cylinderGeometry args={[0.022, 0.022, 0.002, 12]} />
                <meshBasicMaterial color="#050505" />
              </mesh>
              <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.012, 0.012, 0.01, 8]} />
                <meshStandardMaterial color={hardwareColor} metalness={0.8} roughness={0.2} />
              </mesh>
            </group>
          ))}
        </group>

        {/* --- Nose Kicktail (Front) Hinge Group --- */}
        <group position={[0, 0, 0.6]} rotation={[Math.PI / 11, 0, 0]}>
          <group position={[0, 0.015, 0.15]}>
            {/* Center */}
            <mesh castShadow>
              <boxGeometry args={[0.42, 0.025, 0.3]} />
              <meshPhysicalMaterial {...matProps} />
            </mesh>
            {/* Left Concave */}
            <mesh castShadow position={[-0.28, 0.035, 0]} rotation={[0, 0, Math.PI / 12]}>
              <boxGeometry args={[0.16, 0.025, 0.3]} />
              <meshPhysicalMaterial {...matProps} />
            </mesh>
            {/* Right Concave */}
            <mesh castShadow position={[0.26, 0.035, 0]} rotation={[0, 0, -Math.PI / 12]}>
              <boxGeometry args={[0.16, 0.025, 0.3]} />
              <meshPhysicalMaterial {...matProps} />
            </mesh>
            
            {/* Rounded Tip */}
            <mesh castShadow position={[0, 0, 0.15]} scale={[1, 1, 0.6]}>
              <cylinderGeometry args={[0.37, 0.37, 0.025, 32]} />
              <meshPhysicalMaterial {...matProps} />
            </mesh>

            {/* Kicktail Plies */}
            {Array.from({ length: 5 }).map((_, plyIdx) => {
              const plyThickness = 0.003;
              const isDyed = plyIdx === 2;
              const plyColor = isDyed ? '#39FF14' : (plyIdx % 2 === 0 ? '#d1a075' : '#b37f50');
              return (
                <group key={`nose-ply-${plyIdx}`} position={[0, -0.015 - (plyIdx * plyThickness), 0]}>
                  <mesh>
                    <boxGeometry args={[0.74, plyThickness, 0.3]} />
                    <meshPhysicalMaterial {...woodCoreProps} color={plyColor} />
                  </mesh>
                  <mesh position={[0, 0, 0.15]} scale={[1, 1, 0.6]}>
                    <cylinderGeometry args={[0.37, 0.37, plyThickness, 32]} />
                    <meshPhysicalMaterial {...woodCoreProps} color={plyColor} />
                  </mesh>
                </group>
              );
            })}
          </group>
        </group>

        {/* --- Tail Kicktail (Back) Hinge Group --- */}
        <group position={[0, 0, -0.6]} rotation={[-Math.PI / 12, 0, 0]}>
          <group position={[0, 0.015, -0.15]}>
            {/* Center */}
            <mesh castShadow>
              <boxGeometry args={[0.42, 0.025, 0.3]} />
              <meshPhysicalMaterial {...matProps} />
            </mesh>
            {/* Left Concave */}
            <mesh castShadow position={[-0.28, 0.035, 0]} rotation={[0, 0, Math.PI / 12]}>
              <boxGeometry args={[0.16, 0.025, 0.3]} />
              <meshPhysicalMaterial {...matProps} />
            </mesh>
            {/* Right Concave */}
            <mesh castShadow position={[0.26, 0.035, 0]} rotation={[0, 0, -Math.PI / 12]}>
              <boxGeometry args={[0.16, 0.025, 0.3]} />
              <meshPhysicalMaterial {...matProps} />
            </mesh>

            {/* Rounded Tip */}
            <mesh castShadow position={[0, 0, -0.15]} scale={[1, 1, 0.5]}>
              <cylinderGeometry args={[0.37, 0.37, 0.025, 32]} />
              <meshPhysicalMaterial {...matProps} />
            </mesh>

            {/* Kicktail Plies */}
            {Array.from({ length: 5 }).map((_, plyIdx) => {
              const plyThickness = 0.003;
              const isDyed = plyIdx === 2;
              const plyColor = isDyed ? '#39FF14' : (plyIdx % 2 === 0 ? '#d1a075' : '#b37f50');
              return (
                <group key={`tail-ply-${plyIdx}`} position={[0, -0.015 - (plyIdx * plyThickness), 0]}>
                  <mesh>
                    <boxGeometry args={[0.74, plyThickness, 0.3]} />
                    <meshPhysicalMaterial {...woodCoreProps} color={plyColor} />
                  </mesh>
                  <mesh position={[0, 0, -0.15]} scale={[1, 1, 0.5]}>
                    <cylinderGeometry args={[0.37, 0.37, plyThickness, 32]} />
                    <meshPhysicalMaterial {...woodCoreProps} color={plyColor} />
                  </mesh>
                </group>
              );
            })}
          </group>
        </group>
      </group>

      {/* --- Pro Metal Trucks & Wheels (Front & Back) --- */}
      {[-0.5, 0.5].map((z) => (
        <group key={z} position={[0, 0.04, z]}>
          {/* Baseplate */}
          <mesh castShadow position={[0, 0.04, 0]}>
            <boxGeometry args={[0.2, 0.02, 0.25]} />
            <meshStandardMaterial {...metalProps} />
          </mesh>
          {/* Pivot Cup & Kingpin Bushings */}
          <group position={[0, 0.015, z > 0 ? -0.05 : 0.05]}>
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.045, 0.045, 0.08, 12]} />
              <meshPhysicalMaterial {...bushingProps} />
            </mesh>
            {/* Bushing Washers */}
            <mesh position={[0, 0.045, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.01, 12]} />
              <meshStandardMaterial {...metalProps} />
            </mesh>
          </group>
          
          {/* Hanger / Axle (Tapered profile) */}
          <group position={[0, -0.03, 0]}>
            {/* Main Tapered Hanger */}
            <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.025, 0.045, 0.5, 16]} />
              <meshStandardMaterial {...metalProps} />
            </mesh>
            {/* Axle Rods */}
            <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.015, 0.015, 0.76, 8]} />
              <meshStandardMaterial {...metalProps} />
            </mesh>
          </group>
          
          {/* Conical Urethane Wheels */}
          <group position={[0, -0.03, 0]}>
            {[-0.39, 0.39].map((wx, i) => (
              <group key={wx} position={[wx, 0, 0]}>
                {/* Wheel Outer Edge (Conical shape) */}
                <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
                  <cylinderGeometry args={[0.13, 0.11, 0.08, 24]} />
                  <meshPhysicalMaterial color="#ffffff" roughness={0.5} clearcoat={0.1} />
                </mesh>
                {/* Inner Core Recess */}
                <mesh position={[i === 0 ? 0.02 : -0.02, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.09, 0.09, 0.04, 16]} />
                  <meshStandardMaterial color="#f0f0f0" roughness={0.3} />
                </mesh>
                {/* Metallic Bearing */}
                <mesh position={[i === 0 ? 0.035 : -0.035, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
                  <meshStandardMaterial color="#b0b0b0" metalness={0.9} roughness={0.2} />
                </mesh>
                {/* Bearing Inner Hole */}
                <mesh position={[i === 0 ? 0.045 : -0.045, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.02, 0.02, 0.01, 12]} />
                  <meshBasicMaterial color="#111111" />
                </mesh>
                {/* Axle Nut */}
                <mesh position={[i === 0 ? -0.05 : 0.05, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.035, 0.035, 0.02, 8]} />
                  <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.1} />
                </mesh>
              </group>
            ))}
          </group>
        </group>
      ))}
    </group>
  );
});
SkateDecks.displayName = 'SkateDecks';

const DiceTower = ({ active, material, isDark, ...props }: any) => {
  const matProps = getMaterialProps(material, isDark);
  return (
    <group {...props}>
      {/* Main Tower Column */}
      <mesh castShadow position={[0, 1.1, 0]}>
        <boxGeometry args={[1, 2.2, 1]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      {/* Castle Battlement Top */}
      <mesh position={[0, 2.2, 0]} castShadow>
        <boxGeometry args={[1.2, 0.3, 1.2]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      {/* Dice Catch Tray */}
      <mesh position={[0, 0.1, 0.8]} castShadow>
        <boxGeometry args={[1.2, 0.2, 1.4]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
    </group>
  );
};

const Accessories3D = ({ active, material, isDark, ...props }: any) => {
  const matProps = getMaterialProps(material, isDark);
  return (
    <group {...props}>
      {/* Rotating Polyhedral Dice (d20 structure represented by icosahedron) */}
      <mesh castShadow position={[0, 0.6, 0]} rotation={[0.4, 0.2, 0.1]}>
        <icosahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      {/* Life Counter Dials base */}
      <mesh castShadow position={[0, -0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.4, 32]} />
        <meshStandardMaterial color={isDark ? '#111111' : '#dddddd'} roughness={0.3} metalness={0.7} />
      </mesh>
    </group>
  );
};

const Chess3D = ({ active, material, isDark, ...props }: any) => {
  const matProps = getMaterialProps(material, isDark);
  return (
    <group {...props}>
      {/* Chessboard base */}
      <mesh castShadow receiveShadow position={[0, -0.1, 0]}>
        <boxGeometry args={[2.5, 0.15, 2.5]} />
        <meshStandardMaterial color={isDark ? '#1a1a1a' : '#eae0d5'} roughness={0.4} />
      </mesh>
      {/* Chess grid pattern (visual grid) */}
      <mesh receiveShadow position={[0, -0.01, 0]}>
        <boxGeometry args={[2.3, 0.01, 2.3]} />
        <meshStandardMaterial color={isDark ? '#050505' : '#8b5a2b'} roughness={0.7} />
      </mesh>
      {/* Stand-in chess piece */}
      <mesh castShadow position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.15, 0.25, 0.8, 16]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      <mesh castShadow position={[0, 0.85, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
    </group>
  );
};

const Loader = () => (
  <View style={styles.loaderContainer}>
    <ActivityIndicator size="large" color="#39FF14" />
  </View>
);

interface Scene3DProps {
  category: 'Ramps' | 'Decks' | 'Dice Tower' | 'Acessórios' | 'Xadrez' | 'Home';
  activeProductId?: string;
  material?: string;
  finish?: string;
}

const Scene3D: React.FC<Scene3DProps> = ({
  category,
  material
}) => {
  const { isDark } = useTheme();
  const { isRampCollapsed } = useConfigurator();

  const backgroundColor = isDark ? '#080808' : '#f0ebe0';
  const ambientIntensity = isDark ? 0.6 : 1.0;
  const spotIntensity = isDark ? 5.0 : 2.5;
  const shadowColor = isDark ? '#1a3a0a' : '#4d372c';

  return (
    <View style={styles.container}>
      <Suspense fallback={<Loader />}>
        <Canvas shadows dpr={[1, 2]}>
          <color attach="background" args={[backgroundColor]} />
          <fog attach="fog" args={[backgroundColor, 8, 20]} />

          <PerspectiveCamera makeDefault position={[0, 2.5, 4.8]} fov={44} />
          <OrbitControls
            enablePan={false}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.1}
            makeDefault
            autoRotate={category === 'Home'}
            autoRotateSpeed={0.25}
          />

          <ambientLight intensity={ambientIntensity} />
          {/* Key Light - warm from upper right */}
          <directionalLight
            position={[5, 12, 8]}
            intensity={isDark ? 3.5 : 2.5}
            color={isDark ? '#ffffff' : '#fff8f0'}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.0005}
          />
          {/* Cool rim light for separation */}
          <directionalLight
            position={[-8, 6, -8]}
            intensity={isDark ? 2.5 : 1.2}
            color={isDark ? '#6688ff' : '#e0e8ff'}
          />
          {/* Main theatrical spot */}
          <spotLight
            position={[0, 10, 6]}
            angle={0.5}
            penumbra={0.9}
            intensity={spotIntensity}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.0005}
            color="#ffffff"
          />
          {/* Counter spot from back */}
          <spotLight
            position={[-4, 8, -6]}
            angle={0.5}
            penumbra={1}
            intensity={isDark ? 2.0 : 1.0}
            color={isDark ? '#88aaff' : '#ffffff'}
          />
          {/* Front fill to brighten ramp face */}
          <spotLight
            position={[0, 3, 7]}
            angle={0.9}
            penumbra={0.6}
            intensity={isDark ? 2.0 : 1.2}
            color="#ffffff"
          />
          {/* Neon underbelly RGB fill */}
          {isDark && (
            <>
              <pointLight position={[-3, -1, 2]} intensity={3.5} color="#39FF14" distance={8} />
              <pointLight position={[3, -1, -2]} intensity={2.0} color="#39FF14" distance={6} />
            </>
          )}

          {category === 'Home' ? (
            <SkatePark3D isDark={isDark} />
          ) : (
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
              {category === 'Ramps' && (
                <SkateRamp active={true} material={material} isDark={isDark} isCollapsed={isRampCollapsed} />
              )}

              {category === 'Decks' && (
                <SkateDecks active={true} material={material} isDark={isDark} />
              )}

              {category === 'Dice Tower' && (
                <DiceTower active={true} material={material} isDark={isDark} />
              )}

              {category === 'Acessórios' && (
                <Accessories3D active={true} material={material} isDark={isDark} />
              )}

              {category === 'Xadrez' && (
                <Chess3D active={true} material={material} isDark={isDark} />
              )}
            </Float>
          )}

          {/* Double-layered soft contact shadows for realistic grounding */}
          {/* Layer 1: Grounding the toys (Chessboard, ramp, dice tower) on the concrete slab surface */}
          <ContactShadows
            position={[0, -0.42, 0]}
            opacity={isDark ? 0.65 : 0.4}
            scale={9}
            blur={1.8}
            far={3}
            color={shadowColor}
          />
          {/* Layer 2: Grounding the elevated concrete slab platform itself onto the grid floor */}
          <ContactShadows
            position={[0, -0.85, 0]}
            opacity={isDark ? 0.8 : 0.5}
            scale={10}
            blur={2.5}
            far={5}
            color="#000000"
          />

          <Environment preset="night" />
        </Canvas>
      </Suspense>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  }
});

export default Scene3D;
