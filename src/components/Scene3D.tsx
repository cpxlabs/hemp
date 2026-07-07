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

const StadiumLight = ({ position, isDark }: any) => {
  const poleColor = isDark ? '#222222' : '#888888';
  const lightColor = isDark ? '#39FF14' : '#fff9e6';
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

const SkatePark3D = ({ isDark }: { isDark: boolean }) => {
  const parkColor = '#0c0c0c'; // Carbon fiber grid color (deep dark gray/black)
  const structuralColor = isDark ? '#1f1f1f' : '#d5cbbd';
  const woodColor = '#a87544'; // Beautiful rich warm wood color for the ramp face
  const logoGreen = '#39FF14';

  return (
    <group position={[0, -0.2, 0]}>
      {/* Ground Carbon Fiber Slab */}
      <mesh receiveShadow position={[0, -0.5, 0]}>
        <boxGeometry args={[9.5, 0.15, 5.0]} />
        <meshPhysicalMaterial color={parkColor} roughness={0.2} metalness={0.9} clearcoat={1.0} clearcoatRoughness={0.1} />
      </mesh>
      
      {/* Visual carbon grid pattern (thin cylinders or boxes to create a high-tech weave texture) */}
      <gridHelper args={[9.5, 30, '#333333', '#222222']} position={[0, -0.42, 0]} />

      {/* --- Stadium Corner Lights for Sparks and Warm Glow --- */}
      <StadiumLight position={[-4.2, -0.525, -2.2]} isDark={isDark} />
      <StadiumLight position={[4.2, -0.525, -2.2]} isDark={isDark} />
      <StadiumLight position={[-4.2, -0.525, 2.2]} isDark={isDark} />
      <StadiumLight position={[4.2, -0.525, 2.2]} isDark={isDark} />

      {/* --- Central Skate Ramp (Quarterpipe) --- */}
      <group position={[-0.2, -0.425, -0.1]}>
        {/* Base block */}
        <mesh castShadow receiveShadow position={[0, 0.4, -0.8]}>
          <boxGeometry args={[3.2, 0.8, 1.2]} />
          <meshStandardMaterial color={structuralColor} roughness={0.7} />
        </mesh>
        
        {/* Curved ramp surface (using angled segment structure to make it transition smoothly) */}
        <mesh castShadow receiveShadow position={[0, 0.25, 0]} rotation={[Math.PI / 12, 0, 0]}>
          <boxGeometry args={[3.2, 0.06, 1.6]} />
          <meshPhysicalMaterial color={woodColor} roughness={0.25} clearcoat={1.0} clearcoatRoughness={0.1} />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0.6, -0.6]} rotation={[Math.PI / 4, 0, 0]}>
          <boxGeometry args={[3.2, 0.06, 1.2]} />
          <meshPhysicalMaterial color={woodColor} roughness={0.25} clearcoat={1.0} clearcoatRoughness={0.1} />
        </mesh>
        
        {/* Metal transition plate at bottom */}
        <mesh receiveShadow position={[0, 0.05, 0.75]} rotation={[-Math.PI / 24, 0, 0]}>
          <boxGeometry args={[3.2, 0.02, 0.5]} />
          <meshStandardMaterial color="#cccccc" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Coping metal rail at top */}
        <mesh castShadow position={[0, 0.8, -1.2]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, 3.2, 16]} />
          <meshStandardMaterial color="#dddddd" metalness={0.95} roughness={0.05} />
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

        {/* Large green/white logo plate resting in the middle of transition */}
        <group position={[0, 0.42, -0.2]} rotation={[Math.PI / 6, 0, 0]}>
          {/* Logo plate base */}
          <mesh castShadow position={[0, 0, 0]}>
            <boxGeometry args={[0.9, 0.05, 0.7]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
          </mesh>
          {/* Logo face overlay (white/green graphic design) */}
          <mesh position={[0, 0.03, 0]}>
            <boxGeometry args={[0.82, 0.01, 0.62]} />
            <meshStandardMaterial color={isDark ? logoGreen : '#00aa00'} roughness={0.2} />
          </mesh>
          {/* Accent graphics */}
          <mesh position={[-0.1, 0.04, 0]}>
            <boxGeometry args={[0.15, 0.01, 0.4]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0.15, 0.04, 0.05]} rotation={[0, 0.3, 0]}>
            <boxGeometry args={[0.2, 0.01, 0.2]} />
            <meshStandardMaterial color="#222222" />
          </mesh>
        </group>

        {/* Complete Miniature Skateboard (Tech Deck) sitting on transition */}
        <SkateDecks active={false} material="wood" isDark={isDark} scale={0.4} position={[-0.4, 0.22, 0.2]} rotation={[Math.PI / 12, 0.5, 0.05]} />

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
      <group position={[-2.85, -0.425, 0.0]} rotation={[0.05, 0.5, 0]}>
        {[0, 1, 2, 3, 4].map((index) => {
          const woodHue = index === 4 ? woodColor : index % 2 === 0 ? '#8b5a2b' : '#6f4a27';
          return (
            <group key={index} position={[0, index * 0.045, 0]}>
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
      <group position={[2.55, -0.425, -0.7]} rotation={[0, -0.3, 0]}>
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
        <mesh position={[0, 0.9, 0.458]}>
          <boxGeometry args={[0.2, 0.2, 0.01]} />
          <meshStandardMaterial color={isDark ? logoGreen : '#00aa00'} roughness={0.3} />
        </mesh>
      </group>

      {/* --- Chess Board and pieces in Front Right --- */}
      <group position={[1.8, -0.425, 1.25]} rotation={[0, -0.2, 0]}>
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
        {[-3, -1, 1, 3].map((xIdx) =>
          [-3, -1, 1, 3].map((zIdx) => (
            <mesh key={`${xIdx}-${zIdx}`} position={[xIdx * 0.26, 0.116, zIdx * 0.26]}>
              <boxGeometry args={[0.26, 0.005, 0.26]} />
              <meshStandardMaterial color="#30241b" roughness={0.7} />
            </mesh>
          ))
        )}

        {/* Simplified chess pieces lined up in 2 rows on each side */}
        {/* Player 1 (Back Row/Dark pieces) */}
        {[-3, -2, -1, 0, 1, 2, 3].map((colIdx) => {
          const x = colIdx * 0.26;
          return (
            <group key={colIdx} position={[x, 0.12, -0.9]}>
              <mesh castShadow position={[0, 0.12, 0]}>
                <cylinderGeometry args={[0.04, 0.08, 0.24, 8]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.2} />
              </mesh>
              {/* Pawns in front row */}
              <mesh castShadow position={[0, 0.08, 0.26]}>
                <cylinderGeometry args={[0.03, 0.06, 0.16, 8]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.2} />
              </mesh>
            </group>
          );
        })}

        {/* Player 2 (Front Row/Light pieces) */}
        {[-3, -2, -1, 0, 1, 2, 3].map((colIdx) => {
          const x = colIdx * 0.26;
          return (
            <group key={colIdx} position={[x, 0.12, 0.9]}>
              <mesh castShadow position={[0, 0.12, 0]}>
                <cylinderGeometry args={[0.04, 0.08, 0.24, 8]} />
                <meshStandardMaterial color="#eaeaea" roughness={0.3} />
              </mesh>
              {/* Pawns in back row */}
              <mesh castShadow position={[0, 0.08, -0.26]}>
                <cylinderGeometry args={[0.03, 0.06, 0.16, 8]} />
                <meshStandardMaterial color="#eaeaea" roughness={0.3} />
              </mesh>
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

const SkateDecks = ({ active, material, isDark, ...props }: any) => {
  const matProps = getMaterialProps(material || 'wood', isDark);
  const woodCoreProps = getMaterialProps('wood', isDark);
  
  const metalProps = {
    color: '#dddddd',
    roughness: 0.1,
    metalness: 0.95,
  };

  return (
    <group {...props} rotation={[0.1, 0.2, 0.05]}>
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
            <meshStandardMaterial color={isDark ? '#39FF14' : '#ef4444'} roughness={0.3} />
          </mesh>
          {/* Hanger / Axle */}
          <mesh castShadow position={[0, -0.03, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.035, 0.035, 0.72, 16]} />
            <meshStandardMaterial {...metalProps} />
          </mesh>
          
          {/* Urethane Wheels */}
          <group position={[0, -0.03, 0]}>
            <mesh position={[-0.38, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.13, 0.13, 0.09, 16]} />
              <meshStandardMaterial color={isDark ? '#ffffff' : '#dddddd'} roughness={0.4} />
            </mesh>
            <mesh position={[0.38, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.13, 0.13, 0.09, 16]} />
              <meshStandardMaterial color={isDark ? '#ffffff' : '#dddddd'} roughness={0.4} />
            </mesh>
          </group>
        </group>
      ))}
    </group>
  );
};

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
  activeProductId,
  material,
  finish
}) => {
  const { isDark } = useTheme();
  const { isRampCollapsed } = useConfigurator();

  const backgroundColor = isDark ? '#050505' : '#f7f0e6';
  const ambientIntensity = isDark ? 0.3 : 0.6;
  const spotIntensity = isDark ? 2.5 : 1.5;
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
          <spotLight
            position={[6, 9, 6]}
            angle={0.3}
            penumbra={1}
            intensity={spotIntensity}
            castShadow
            shadow-mapSize={[2048, 2048]}
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
