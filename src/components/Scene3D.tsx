import React, { Suspense } from 'react';
import { View, StyleSheet } from 'react-native';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  ContactShadows,
  Float
} from '@react-three/drei';
import * as THREE from 'three';

// --- Placeholder Components ---

const SkateRamp = (props: any) => {
  return (
    <group {...props}>
      {/* Base */}
      <mesh receiveShadow position={[0, -0.5, 0]}>
        <boxGeometry args={[4, 0.2, 2]} />
        <meshStandardMaterial color="#4a2d17" />
      </mesh>
      {/* Curve (Approximated with a partial cylinder or bent box) */}
      <mesh position={[-1.5, 0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[1.5, 0.1, 2]} />
        <meshStandardMaterial color="#5a3c26" />
      </mesh>
      <mesh position={[1.5, 0.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[1.5, 0.1, 2]} />
        <meshStandardMaterial color="#5a3c26" />
      </mesh>
    </group>
  );
};

const SkateDecks = (props: any) => {
  return (
    <group {...props}>
      {[0, 0.1, 0.2].map((y) => (
        <mesh key={y} position={[0, y, 0]} castShadow>
          <boxGeometry args={[0.8, 0.05, 2.5]} />
          <meshStandardMaterial color="#39FF14" />
        </mesh>
      ))}
    </group>
  );
};

const DiceTower = (props: any) => {
  return (
    <group {...props}>
      <mesh castShadow position={[0, 1, 0]}>
        <boxGeometry args={[0.8, 2, 0.8]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0, 0.5]}>
        <boxGeometry args={[1, 0.2, 1.2]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
};

const ChessBoard = (props: any) => {
  return (
    <group {...props}>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2, 2]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      {/* Simple pieces */}
      <mesh position={[0.5, 0.25, 0.5]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.5]} />
        <meshStandardMaterial color="#39FF14" />
      </mesh>
      <mesh position={[-0.5, 0.25, -0.5]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.5]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
    </group>
  );
};

const Scene3D = () => {
  return (
    <View style={styles.container}>
      <Canvas shadows dpr={[1, 2]}>
        <color attach="background" args={['#050505']} />

        <PerspectiveCamera makeDefault position={[5, 5, 10]} fov={50} />
        <OrbitControls
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.1}
          makeDefault
        />

        <ambientLight intensity={0.2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <SkateRamp position={[-2, 0, 0]} rotation={[0, Math.PI / 4, 0]} />
            <SkateDecks position={[2, 0, 1]} rotation={[0, -Math.PI / 6, 0]} />
            <DiceTower position={[3, 0, -2]} />
            <ChessBoard position={[-3, 0, -2]} />
          </Float>

          <ContactShadows
            position={[0, -0.5, 0]}
            opacity={0.4}
            scale={20}
            blur={2.4}
            far={4.5}
          />

          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#050505',
  },
});

export default Scene3D;
