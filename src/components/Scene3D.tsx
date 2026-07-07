/* eslint-disable react/no-unknown-property */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  ContactShadows,
  Float
} from '@react-three/drei';
import { useTheme } from '../providers/ThemeProvider';

// --- Material Selector Helper ---
const getMaterialProps = (materialName?: string, isDark?: boolean) => {
  const name = materialName?.toLowerCase() || '';
  if (name.includes('carbon') || name.includes('polymer') || name.includes('neon') || name.includes('acrylic')) {
    return {
      color: isDark ? '#39FF14' : '#00aa00',
      roughness: 0.15,
      metalness: 0.8,
      emissive: isDark ? '#052200' : '#001100',
    };
  }
  if (name.includes('wood') || name.includes('walnut') || name.includes('bamboo') || name.includes('maple')) {
    return {
      color: '#8b5a2b',
      roughness: 0.6,
      metalness: 0.1,
    };
  }
  // Default / Natural Fiber
  return {
    color: isDark ? '#d4af37' : '#b89223', // gold / brass tones
    roughness: 0.4,
    metalness: 0.5,
  };
};

// --- 3D Model Components ---

const SkateRamp = ({ active, material, isDark, ...props }: any) => {
  const matProps = getMaterialProps(material, isDark);
  return (
    <group {...props}>
      {/* Base Ramp Structure */}
      <mesh receiveShadow castShadow position={[0, -0.2, 0]}>
        <boxGeometry args={[3.2, 0.4, 1.8]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      {/* Slopes */}
      <mesh position={[-1.2, 0.3, 0]} rotation={[0, 0, Math.PI / 6]} castShadow>
        <boxGeometry args={[1.5, 0.1, 1.8]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      <mesh position={[1.2, 0.3, 0]} rotation={[0, 0, -Math.PI / 6]} castShadow>
        <boxGeometry args={[1.5, 0.1, 1.8]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
    </group>
  );
};

const SkateDecks = ({ active, material, isDark, ...props }: any) => {
  const matProps = getMaterialProps(material, isDark);
  return (
    <group {...props}>
      {/* Deck Board */}
      <mesh castShadow position={[0, 0.2, 0]} rotation={[0.1, 0, 0.1]}>
        <boxGeometry args={[0.8, 0.06, 2.4]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      {/* Wheels */}
      {[-0.8, 0.8].map((z) => (
        <group key={z} position={[0, 0.05, z]}>
          <mesh position={[-0.35, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.18, 0.18, 0.15, 16]} />
            <meshStandardMaterial color={isDark ? '#ffffff' : '#333333'} roughness={0.5} />
          </mesh>
          <mesh position={[0.35, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.18, 0.18, 0.15, 16]} />
            <meshStandardMaterial color={isDark ? '#ffffff' : '#333333'} roughness={0.5} />
          </mesh>
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

  const backgroundColor = isDark ? '#050505' : '#f7f0e6';
  const ambientIntensity = isDark ? 0.3 : 0.6;
  const spotIntensity = isDark ? 2.5 : 1.5;
  const shadowColor = isDark ? '#39FF14' : '#4d372c';

  return (
    <View style={styles.container}>
      <Suspense fallback={<Loader />}>
        <Canvas shadows dpr={[1, 2]}>
          <color attach="background" args={[backgroundColor]} />

          <PerspectiveCamera makeDefault position={[0, 3, 5.5]} fov={40} />
          <OrbitControls
            enablePan={false}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.1}
            makeDefault
            autoRotate={category === 'Home'}
            autoRotateSpeed={0.5}
          />

          <ambientLight intensity={ambientIntensity} />
          <spotLight
            position={[5, 8, 5]}
            angle={0.25}
            penumbra={1}
            intensity={spotIntensity}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          {isDark && (
            <pointLight position={[-5, 5, -5]} intensity={1.5} color="#39FF14" />
          )}

          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            {category === 'Home' && (
              <group>
                <SkateRamp position={[-1.8, 0, 0]} material="Acrylic" isDark={isDark} />
                <SkateDecks position={[0, 0, 0]} material="Carbonized" isDark={isDark} />
                <DiceTower position={[1.8, 0, 0]} material="Wood" isDark={isDark} />
              </group>
            )}

            {category === 'Ramps' && (
              <SkateRamp active={true} material={material} isDark={isDark} />
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
