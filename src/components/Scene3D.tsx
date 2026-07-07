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
  const poleColor = isDark ? '#222222' : '#888888';
  const lightColor = color || (isDark ? '#39FF14' : '#fff9e6');
  return (
    <group position={position}>
      {/* Pole */}
      <mesh castShadow position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.03, 0.05, 2.4, 8]} />
        <meshStandardMaterial color={poleColor} roughness={0.5} metalness={0.7} />
      </mesh>
      {/* Light Head */}
      <mesh castShadow position={[0, 2.4, 0]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[0.25, 0.12, 0.18]} />
        <meshStandardMaterial color={poleColor} />
      </mesh>
      {/* SpotLight */}
      <spotLight
        position={[0, 2.4, 0]}
        intensity={isDark ? 3.0 : 1.5}
        distance={7}
        angle={Math.PI / 3}
        penumbra={0.4}
        color={lightColor}
        castShadow
        shadow-mapSize={[512, 512]}
      />
    </group>
  );
};

const ChessPiece3D = ({ type, color }: { type: string; color: string }) => {
  const matProps = {
    color,
    roughness: color === '#eaeaea' ? 0.2 : 0.12,
    metalness: color === '#eaeaea' ? 0.05 : 0.15,
    clearcoat: 1.0,
    clearcoatRoughness: 0.06,
  };
  
  if (type === 'pawn') {
    return (
      <group>
        {/* Base */}
        <mesh castShadow position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.05, 0.06, 0.04, 8]} />
          <meshPhysicalMaterial {...matProps} />
        </mesh>
        {/* Body */}
        <mesh castShadow position={[0, 0.08, 0]}>
          <coneGeometry args={[0.015, 0.045, 0.12, 8]} />
          <meshPhysicalMaterial {...matProps} />
        </mesh>
        {/* Head */}
        <mesh castShadow position={[0, 0.15, 0]}>
          <sphereGeometry args={[0.032, 8, 8]} />
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
  const parkColor = '#b5b0a6'; // Concrete grey color for realistic skatepark ground
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
        <meshStandardMaterial color={parkColor} roughness={0.8} metalness={0.15} />
      </mesh>

      {/* Diagonal bevelled sloped ramp on the left-front corner of the slab */}
      <mesh position={[-4.0, -0.65, 1.8]} rotation={[0.3, -0.6, 0.1]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.4, 2.0]} />
        <meshStandardMaterial color="#ababa1" roughness={0.8} />
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
      <gridHelper args={[9.5, 12, isDark ? '#2a2825' : '#8e8a82', isDark ? '#1a1917' : '#9c978f']} position={[0, -0.44, 0]} />

      {/* --- Stadium Corner Lights for Sparks and Warm Glow --- */}
      <StadiumLight position={[-4.2, -0.425, -2.2]} isDark={isDark} color={lightsColor} />
      <StadiumLight position={[4.2, -0.425, -2.2]} isDark={isDark} color={lightsColor} />
      <StadiumLight position={[-4.2, -0.425, 2.2]} isDark={isDark} color={lightsColor} />
      <StadiumLight position={[4.2, -0.425, 2.2]} isDark={isDark} color={lightsColor} />

      {/* Secondary glowing RGB light bulbs at the sides of the concrete park */}
      <group position={[-3.8, -0.3, -0.5]}>
        <mesh castShadow>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color={lightsColor} />
        </mesh>
        <pointLight color={lightsColor} intensity={2.5} distance={5} />
      </group>
      <group position={[3.8, -0.3, -0.5]}>
        <mesh castShadow>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color={lightsColor} />
        </mesh>
        <pointLight color={lightsColor} intensity={2.5} distance={5} />
      </group>

      {/* --- Central Skate Ramp (Quarterpipe with L-shaped Curved Corner Pocket) --- */}
      <group position={[-0.4, -0.425, -0.5]}>
        {/* Base block */}
        <mesh castShadow receiveShadow position={[0.5, 0.4, -0.8]}>
          <boxGeometry args={[2.2, 0.8, 1.2]} />
          <meshStandardMaterial color="#121212" roughness={0.55} metalness={0.6} />
        </mesh>

        {/* Left corner block extension for L-shaped pocket */}
        <mesh castShadow receiveShadow position={[-1.1, 0.4, -0.8]}>
          <boxGeometry args={[1.0, 0.8, 1.2]} />
          <meshStandardMaterial color="#121212" roughness={0.55} metalness={0.6} />
        </mesh>
        
        {/* Curved ramp surface - Straight center section */}
        <mesh castShadow receiveShadow position={[0.5, 0.8, -0.4]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.8, 0.8, 2.2, 32, 1, true, Math.PI, Math.PI / 2]} />
          <meshPhysicalMaterial color="#e3be94" roughness={0.35} clearcoat={0.3} clearcoatRoughness={0.15} side={2} />
        </mesh>

        {/* Curved ramp surface - Left wrapping corner pocket section */}
        <mesh castShadow receiveShadow position={[-0.6, 0.8, -0.4]} rotation={[0, Math.PI / 2, Math.PI / 2]}>
          <cylinderGeometry args={[0.8, 0.8, 1.2, 32, 1, true, Math.PI, Math.PI / 2]} />
          <meshPhysicalMaterial color="#e3be94" roughness={0.35} clearcoat={0.3} clearcoatRoughness={0.15} side={2} />
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

        {/* Coping metal rail at top - Straight center section */}
        <mesh castShadow position={[0.5, 0.8, -1.2]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, 2.2, 16]} />
          <meshPhysicalMaterial color="#f0f0f0" metalness={0.98} roughness={0.02} clearcoat={1.0} clearcoatRoughness={0.02} />
        </mesh>

        {/* Coping metal rail at top - 90-degree curved corner section wrapping around the left pocket */}
        <mesh castShadow position={[-0.6, 0.8, -0.6]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 1.2, 16]} />
          <meshPhysicalMaterial color="#f0f0f0" metalness={0.98} roughness={0.02} clearcoat={1.0} clearcoatRoughness={0.02} />
        </mesh>

        {/* Wooden guard rail fence behind top platform */}
        <group position={[0, 0.8, -1.35]}>
          {/* Vertical posts */}
          {[-1.5, 0, 1.5].map((x) => (
            <mesh key={x} position={[x, 0.45, 0]} castShadow>
              <boxGeometry args={[0.06, 0.9, 0.06]} />
              <meshStandardMaterial color={isDark ? '#333333' : '#a87544'} roughness={0.8} />
            </mesh>
          ))}
          {/* Horizontal rails */}
          {[0.3, 0.6, 0.85].map((y) => (
            <mesh key={y} position={[0, y, 0]} castShadow>
              <boxGeometry args={[3.1, 0.08, 0.04]} />
              <meshStandardMaterial color={isDark ? '#333333' : '#a87544'} roughness={0.8} />
            </mesh>
          ))}
        </group>


        {/* Complete Miniature Skateboard (Tech Deck) sliding slowly back and forth */}
        <SkateDecks ref={miniSkateRef} active={false} material="wood" isDark={isDark} scale={0.35} />

        {/* Miniature metal trucks and loose screws lying on the flat surface */}
        <group position={[0.2, 0.1, 0.3]} rotation={[0, -0.4, 0]}>
          {/* Tiny truck hanger */}
          <mesh position={[0, 0.02, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, 0.25, 8]} />
            <meshStandardMaterial color="#cccccc" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Baseplate */}
          <mesh position={[0, 0.005, 0]} castShadow>
            <boxGeometry args={[0.07, 0.01, 0.09]} />
            <meshStandardMaterial color="#cccccc" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Loose screws */}
          {[-0.12, 0.05, 0.18].map((x, idx) => (
            <mesh key={x} position={[x, 0.005, 0.1 + idx * 0.03]} rotation={[0.4, idx * 0.8, 0.2]} castShadow>
              <cylinderGeometry args={[0.006, 0.006, 0.05, 8]} />
              <meshStandardMaterial color="#bbbbbb" metalness={0.9} />
            </mesh>
          ))}
        </group>
      </group>

      {/* --- Stack of Wooden Fingerboard Decks to the Left --- */}
      <group position={[-3.3, -0.425, 0.4]} rotation={[0.05, 0.5, 0]}>
        {[0, 1, 2, 3, 4].map((index) => {
          const woodHue = index === 4 ? woodColor : index % 2 === 0 ? '#8b5a2b' : '#6f4a27';
          // Subtle organic offsets for hand-stacked realism
          const randRotY = index === 4 ? 0 : Math.sin(index * 45) * 0.06;
          const randOffsetX = index === 4 ? 0 : Math.cos(index * 30) * 0.03;
          const randOffsetZ = index === 4 ? 0 : Math.sin(index * 20) * 0.03;
          
          return (
            <group key={index} position={[randOffsetX, index * 0.045, randOffsetZ]} rotation={[0, randRotY, 0]}>
              {/* Deck Center */}
              <mesh castShadow position={[0, 0, 0]}>
                <boxGeometry args={[0.75, 0.04, 1.5]} />
                <meshStandardMaterial color={woodHue} roughness={0.7} />
              </mesh>
              {/* Nose kick */}
              <mesh castShadow position={[0, 0.06, 0.82]} rotation={[Math.PI / 10, 0, 0]}>
                <boxGeometry args={[0.75, 0.04, 0.45]} />
                <meshStandardMaterial color={woodHue} roughness={0.7} />
              </mesh>
              {/* Tail kick */}
              <mesh castShadow position={[0, 0.06, -0.82]} rotation={[-Math.PI / 10, 0, 0]}>
                <boxGeometry args={[0.75, 0.04, 0.45]} />
                <meshStandardMaterial color={woodHue} roughness={0.7} />
              </mesh>
              {/* Laminated colored ply line */}
              <mesh position={[0, -0.012, 0]}>
                <boxGeometry args={[0.73, 0.008, 1.48]} />
                <meshStandardMaterial color={index % 2 === 0 ? '#39FF14' : '#ef4444'} roughness={0.6} />
              </mesh>

              {/* Graphic on the top deck */}
              {index === 4 && (
                <group position={[0, 0.025, 0]}>
                  {/* Outer graphic plate */}
                  <mesh>
                    <boxGeometry args={[0.45, 0.002, 0.9]} />
                    <meshStandardMaterial color="#111" roughness={0.2} />
                  </mesh>
                  {/* Inside green graphic design */}
                  <mesh position={[0, 0.001, 0]}>
                    <boxGeometry args={[0.38, 0.002, 0.7]} />
                    <meshStandardMaterial color={logoGreen} roughness={0.1} />
                  </mesh>
                </group>
              )}
            </group>
          );
        })}
      </group>

      {/* --- Detailed Stone Dice Tower to the Right --- */}
      <group position={[3.0, -0.425, -1.3]} rotation={[0, -0.3, 0]}>
        {/* Tower Base castle wall */}
        <mesh castShadow position={[0, 0.7, 0]}>
          <boxGeometry args={[0.9, 1.4, 0.9]} />
          <meshStandardMaterial color="#4a4d48" roughness={0.9} />
        </mesh>
        {/* Battlements top rim */}
        <mesh position={[0, 1.45, 0]} castShadow>
          <boxGeometry args={[1.05, 0.2, 1.05]} />
          <meshStandardMaterial color="#3f413d" roughness={0.9} />
        </mesh>
        {/* Battlement corner notches */}
        {[-0.45, 0.45].map((x) =>
          [-0.45, 0.45].map((z) => (
            <mesh key={`${x}-${z}`} position={[x, 1.6, z]} castShadow>
              <boxGeometry args={[0.2, 0.15, 0.2]} />
              <meshStandardMaterial color="#3f413d" roughness={0.9} />
            </mesh>
          ))
        )}
        {/* Catch Tray front box */}
        <mesh position={[0, 0.125, 0.65]} castShadow>
          <boxGeometry args={[1.0, 0.25, 0.8]} />
          <meshStandardMaterial color="#3f413d" roughness={0.9} />
        </mesh>
        {/* Dice Catch interior tray */}
        <mesh position={[0, 0.05, 0.65]}>
          <boxGeometry args={[0.85, 0.1, 0.65]} />
          <meshStandardMaterial color="#2d2d2a" roughness={0.8} />
        </mesh>
        {/* Arch exit door */}
        <mesh position={[0, 0.25, 0.451]}>
          <boxGeometry args={[0.35, 0.5, 0.02]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        {/* Engraved logo details on front */}
        <mesh position={[0, 0.9, 0.452]}>
          <boxGeometry args={[0.4, 0.3, 0.01]} />
          <meshStandardMaterial color="#2b2d29" roughness={0.7} />
        </mesh>
        {/* Left Glass Chute */}
        <mesh position={[-0.8, 0.18, 0.65]} rotation={[0, 0, Math.PI / 8]} castShadow>
          <boxGeometry args={[0.6, 0.02, 0.65]} />
          <meshPhysicalMaterial color="#ffffff" transparent opacity={0.35} roughness={0.15} transmission={0.9} thickness={0.5} />
        </mesh>
        {/* Right Glass Chute */}
        <mesh position={[0.8, 0.18, 0.65]} rotation={[0, 0, -Math.PI / 8]} castShadow>
          <boxGeometry args={[0.6, 0.02, 0.65]} />
          <meshPhysicalMaterial color="#ffffff" transparent opacity={0.35} roughness={0.15} transmission={0.9} thickness={0.5} />
        </mesh>
      </group>

      {/* --- Chess Board and pieces in Front Right --- */}
      <group position={[2.4, -0.425, 1.1]} rotation={[0, -0.2, 0]}>
        {/* Chess board base frame */}
        <mesh castShadow receiveShadow position={[0, 0.05, 0]}>
          <boxGeometry args={[2.5, 0.1, 2.5]} />
          <meshStandardMaterial color="#4a3b32" roughness={0.6} />
        </mesh>
        {/* Lighter wooden inner board */}
        <mesh position={[0, 0.105, 0]}>
          <boxGeometry args={[2.3, 0.02, 2.3]} />
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
    color: '#1a1a1a', // Black grip tape look matching base photo
    roughness: 0.85,
    metalness: 0.1,
  };
  const woodCoreProps = {
    color: '#e3be94', // Light birch ply color matching the photo edge
    roughness: 0.45,
    metalness: 0.1,
    clearcoat: 0.25,
  };
  
  const metalProps = {
    color: '#d4af37', // Polished gold/brass trucks matching photo
    roughness: 0.18,
    metalness: 0.95,
  };

  const hardwareColor = '#d4af37'; // Gold hardware bolts

  return (
    <group ref={ref} {...props} rotation={[0, 0, 0]}>
      {/* --- The Deck with Concave & Double Kicktail --- */}
      <group position={[0, 0.1, 0]}>
        {/* --- Middle Section with Concave (Split into center + side rails) --- */}
        <group position={[0, 0, 0]}>
          {/* Flat Center */}
          <mesh castShadow receiveShadow position={[0, 0, 0]}>
            <boxGeometry args={[0.42, 0.025, 1.2]} />
            <meshPhysicalMaterial {...matProps} />
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

          {/* Laminated Wood Core Layer (visible edge line) */}
          <mesh position={[0, -0.012, 0]}>
            <boxGeometry args={[0.74, 0.008, 1.18]} />
            <meshPhysicalMaterial {...woodCoreProps} />
          </mesh>

          {/* 8 Gold Hardware Bolts on Top */}
          {/* Front Truck Bolts */}
          <mesh position={[-0.12, 0.015, 0.45]}>
            <cylinderGeometry args={[0.015, 0.015, 0.02, 8]} />
            <meshStandardMaterial color={hardwareColor} metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0.12, 0.015, 0.45]}>
            <cylinderGeometry args={[0.015, 0.015, 0.02, 8]} />
            <meshStandardMaterial color={hardwareColor} metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[-0.12, 0.015, 0.55]}>
            <cylinderGeometry args={[0.015, 0.015, 0.02, 8]} />
            <meshStandardMaterial color={hardwareColor} metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0.12, 0.015, 0.55]}>
            <cylinderGeometry args={[0.015, 0.015, 0.02, 8]} />
            <meshStandardMaterial color={hardwareColor} metalness={0.9} roughness={0.1} />
          </mesh>

          {/* Rear Truck Bolts */}
          <mesh position={[-0.12, 0.015, -0.45]}>
            <cylinderGeometry args={[0.015, 0.015, 0.02, 8]} />
            <meshStandardMaterial color={hardwareColor} metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0.12, 0.015, -0.45]}>
            <cylinderGeometry args={[0.015, 0.015, 0.02, 8]} />
            <meshStandardMaterial color={hardwareColor} metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[-0.12, 0.015, -0.55]}>
            <cylinderGeometry args={[0.015, 0.015, 0.02, 8]} />
            <meshStandardMaterial color={hardwareColor} metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0.12, 0.015, -0.55]}>
            <cylinderGeometry args={[0.015, 0.015, 0.02, 8]} />
            <meshStandardMaterial color={hardwareColor} metalness={0.9} roughness={0.1} />
          </mesh>
        </group>

        {/* --- Nose Kicktail (Front) Hinge Group --- */}
        <group position={[0, 0, 0.6]} rotation={[Math.PI / 8, 0, 0]}>
          <group position={[0, 0.015, 0.225]}>
            {/* Center */}
            <mesh castShadow>
              <boxGeometry args={[0.42, 0.025, 0.45]} />
              <meshPhysicalMaterial {...matProps} />
            </mesh>
            {/* Left Concave */}
            <mesh castShadow position={[-0.28, 0.035, 0]} rotation={[0, 0, Math.PI / 12]}>
              <boxGeometry args={[0.16, 0.025, 0.45]} />
              <meshPhysicalMaterial {...matProps} />
            </mesh>
            {/* Right Concave */}
            <mesh castShadow position={[0.26, 0.035, 0]} rotation={[0, 0, -Math.PI / 12]}>
              <boxGeometry args={[0.16, 0.025, 0.45]} />
              <meshPhysicalMaterial {...matProps} />
            </mesh>
          </group>
        </group>

        {/* --- Tail Kicktail (Back) Hinge Group --- */}
        <group position={[0, 0, -0.6]} rotation={[-Math.PI / 8, 0, 0]}>
          <group position={[0, 0.015, -0.225]}>
            {/* Center */}
            <mesh castShadow>
              <boxGeometry args={[0.42, 0.025, 0.45]} />
              <meshPhysicalMaterial {...matProps} />
            </mesh>
            {/* Left Concave */}
            <mesh castShadow position={[-0.28, 0.035, 0]} rotation={[0, 0, Math.PI / 12]}>
              <boxGeometry args={[0.16, 0.025, 0.45]} />
              <meshPhysicalMaterial {...matProps} />
            </mesh>
            {/* Right Concave */}
            <mesh castShadow position={[0.26, 0.035, 0]} rotation={[0, 0, -Math.PI / 12]}>
              <boxGeometry args={[0.16, 0.025, 0.45]} />
              <meshPhysicalMaterial {...matProps} />
            </mesh>
          </group>
        </group>
      </group>

      {/* --- Pro Metal Trucks (Front & Back) --- */}
      {[-0.5, 0.5].map((z) => (
        <group key={z} position={[0, 0.04, z]}>
          {/* Baseplate */}
          <mesh castShadow position={[0, 0.04, 0]}>
            <boxGeometry args={[0.2, 0.03, 0.25]} />
            <meshStandardMaterial {...metalProps} />
          </mesh>
          {/* Kingpin & Bushings */}
          <mesh position={[0, 0.01, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.08, 8]} />
            <meshStandardMaterial color="#2c6b85" roughness={0.3} />
          </mesh>
          {/* Hanger / Axle */}
          <mesh castShadow position={[0, -0.03, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.035, 0.035, 0.72, 16]} />
            <meshStandardMaterial {...metalProps} />
          </mesh>
          
          {/* Urethane Wheels */}
          <group position={[0, -0.03, 0]}>
            {/* Left Wheel (Teal tyre) */}
            <mesh position={[-0.38, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.13, 0.13, 0.09, 16]} />
              <meshPhysicalMaterial color="#35778a" roughness={0.35} />
            </mesh>
            {/* Left White Hub */}
            <mesh position={[-0.41, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.09, 0.09, 0.04, 12]} />
              <meshStandardMaterial color="#ffffff" roughness={0.4} />
            </mesh>
            {/* Left Center Nut (Gold) */}
            <mesh position={[-0.435, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.035, 0.035, 0.02, 8]} />
              <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Right Wheel (Teal tyre) */}
            <mesh position={[0.38, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.13, 0.13, 0.09, 16]} />
              <meshPhysicalMaterial color="#35778a" roughness={0.35} />
            </mesh>
            {/* Right White Hub */}
            <mesh position={[0.41, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.09, 0.09, 0.04, 12]} />
              <meshStandardMaterial color="#ffffff" roughness={0.4} />
            </mesh>
            {/* Right Center Nut (Gold) */}
            <mesh position={[0.435, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.035, 0.035, 0.02, 8]} />
              <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
            </mesh>
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

  const backgroundColor = isDark ? '#050505' : '#f7f0e6';
  const ambientIntensity = isDark ? 0.75 : 0.95;
  const spotIntensity = isDark ? 3.0 : 2.0;
  const shadowColor = isDark ? '#39FF14' : '#4d372c';

  return (
    <View style={styles.container}>
      <Suspense fallback={<Loader />}>
        <Canvas shadows dpr={[1, 2]}>
          <color attach="background" args={[backgroundColor]} />

          <PerspectiveCamera makeDefault position={[0, 3.5, 6]} fov={42} />
          <OrbitControls
            enablePan={false}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.1}
            makeDefault
            autoRotate={category === 'Home'}
            autoRotateSpeed={0.3}
          />

          <ambientLight intensity={ambientIntensity} />
          <directionalLight position={[0, 10, 2]} intensity={isDark ? 2.2 : 1.5} castShadow shadow-mapSize={[1024, 1024]} />
          
          <spotLight
            position={[6, 9, 6]}
            angle={0.6}
            penumbra={1}
            intensity={spotIntensity}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <spotLight
            position={[-6, 9, -6]}
            angle={0.6}
            penumbra={1}
            intensity={isDark ? 2.0 : 1.2}
          />
          {/* Front-fill light to ensure the wood ramp surface, logo shield, and wheels are bright and clear */}
          <spotLight
            position={[0, 4, 6]}
            angle={0.8}
            penumbra={0.5}
            intensity={isDark ? 2.5 : 1.5}
            color="#ffffff"
          />
          {isDark && (
            <pointLight position={[-5, 5, -5]} intensity={1.5} color="#39FF14" />
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

          <ContactShadows
            position={[0, -0.6, 0]}
            opacity={isDark ? 0.6 : 0.3}
            scale={8}
            blur={2.5}
            far={4}
            color={shadowColor}
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
