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
import { useConfigurator } from '../providers/ConfiguratorProvider';

// --- Placeholder Components ---

const SkateRamp = ({ active, ...props }: any) => {
  return (
    <group {...props}>
      <mesh receiveShadow position={[0, -0.5, 0]}>
        <boxGeometry args={[4, 0.2, 2]} />
        <meshStandardMaterial color={active ? "#39FF14" : "#4a2d17"} />
      </mesh>
      <mesh position={[-1.5, 0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[1.5, 0.1, 2]} />
        <meshStandardMaterial color={active ? "#39FF14" : "#5a3c26"} />
      </mesh>
      <mesh position={[1.5, 0.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[1.5, 0.1, 2]} />
        <meshStandardMaterial color={active ? "#39FF14" : "#5a3c26"} />
      </mesh>
    </group>
  );
};

const SkateDecks = ({ active, ...props }: any) => {
  return (
    <group {...props}>
      {[0, 0.1, 0.2].map((y) => (
        <mesh key={y} position={[0, y, 0]} castShadow>
          <boxGeometry args={[0.8, 0.05, 2.5]} />
          <meshStandardMaterial color={active ? "#39FF14" : "#222"} />
        </mesh>
      ))}
    </group>
  );
};

const DiceTower = ({ active, ...props }: any) => {
  return (
    <group {...props}>
      <mesh castShadow position={[0, 1, 0]}>
        <boxGeometry args={[0.8, 2, 0.8]} />
        <meshStandardMaterial color={active ? "#39FF14" : "#1a1a1a"} roughness={0.1} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0, 0.5]}>
        <boxGeometry args={[1, 0.2, 1.2]} />
        <meshStandardMaterial color={active ? "#39FF14" : "#1a1a1a"} />
      </mesh>
    </group>
  );
};

const Loader = () => (
  <View style={styles.loaderContainer}>
    <ActivityIndicator size="large" color="#39FF14" />
  </View>
);

const Scene3D = () => {
  const { activeProductIndex } = useConfigurator();

  return (
    <View style={styles.container}>
      <Suspense fallback={<Loader />}>
        <Canvas shadows dpr={[1, 2]}>
          <color attach="background" args={['#050505']} />

          <PerspectiveCamera makeDefault position={[8, 5, 10]} fov={40} />
          <OrbitControls
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2.1}
            makeDefault
            autoRotate={activeProductIndex === -1}
            autoRotateSpeed={0.5}
          />

          <ambientLight intensity={0.4} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#39FF14" />

          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <SkateRamp position={[-3, 0, 0]} rotation={[0, Math.PI / 4, 0]} active={activeProductIndex === 0} />
            <SkateDecks position={[0, 0, 2]} rotation={[0, -Math.PI / 6, 0]} active={activeProductIndex === 1} />
            <DiceTower position={[3, 0, -1]} active={activeProductIndex === 2} />
          </Float>

          <ContactShadows
            position={[0, -0.5, 0]}
            opacity={0.6}
            scale={20}
            blur={3}
            far={4.5}
            color="#39FF14"
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
    backgroundColor: '#050505',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#050505',
    zIndex: 10,
  }
});

export default Scene3D;
