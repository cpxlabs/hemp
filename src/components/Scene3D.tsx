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
  const parkColor = isDark ? '#161616' : '#e6dfd5';
  const railColor = isDark ? '#39FF14' : '#c49a3a';
  const structuralColor = isDark ? '#222222' : '#d5cbbd';
  const woodColor = '#8b5a2b';

  return (
    <group position={[0, -0.2, 0]}>
      {/* Ground Concrete Slab */}
      <mesh receiveShadow position={[0, -0.5, 0]}>
        <boxGeometry args={[9.2, 0.15, 5.0]} />
        <meshStandardMaterial color={parkColor} roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Corner Stadium Floodlights */}
      <StadiumLight position={[-4.2, -0.525, -2.2]} isDark={isDark} />
      <StadiumLight position={[4.2, -0.525, -2.2]} isDark={isDark} />
      <StadiumLight position={[-4.2, -0.525, 2.2]} isDark={isDark} />
      <StadiumLight position={[4.2, -0.525, 2.2]} isDark={isDark} />
      
      {/* Quarterpipe transition on Left */}
      <group position={[-3.5, -0.425, 0]}>
        {/* Base block */}
        <mesh castShadow receiveShadow position={[-0.4, 0.4, 0]}>
          <boxGeometry args={[0.8, 0.8, 4.2]} />
          <meshStandardMaterial color={structuralColor} roughness={0.7} />
        </mesh>
        {/* Transition ramp surface */}
        <mesh castShadow receiveShadow position={[0.2, 0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.9, 0.08, 4.2]} />
          <meshStandardMaterial color={isDark ? '#39FF14' : woodColor} roughness={0.4} />
        </mesh>
        {/* Coping metal rail at top */}
        <mesh castShadow position={[0, 0.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 4.2, 16]} />
          <meshStandardMaterial color="#cccccc" metalness={0.95} roughness={0.05} />
        </mesh>
      </group>

      {/* Funbox Platform in Center Back */}
      <mesh castShadow receiveShadow position={[0, -0.225, -1.3]}>
        <boxGeometry args={[2.2, 0.4, 1.8]} />
        <meshStandardMaterial color={structuralColor} roughness={0.7} />
      </mesh>
      {/* Ledge top board */}
      <mesh castShadow position={[0, 0.05, -1.3]}>
        <boxGeometry args={[1.8, 0.15, 0.6]} />
        <meshStandardMaterial color={isDark ? '#39FF14' : woodColor} roughness={0.5} />
      </mesh>

      {/* Grind Rail in Center Front */}
      <group position={[0, -0.425, 0.8]}>
        {/* Horizontal Rail */}
        <mesh castShadow position={[0, 0.4, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 2.8, 16]} />
          <meshStandardMaterial color={railColor} metalness={0.95} roughness={0.05} />
        </mesh>
        {/* Supports */}
        <mesh castShadow position={[-1.1, 0.2, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.4, 16]} />
          <meshStandardMaterial color={railColor} metalness={0.9} />
        </mesh>
        <mesh castShadow position={[1.1, 0.2, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.4, 16]} />
          <meshStandardMaterial color={railColor} metalness={0.9} />
        </mesh>
        {/* Base feet */}
        <mesh castShadow position={[-1.1, 0.01, 0]}>
          <boxGeometry args={[0.3, 0.02, 0.15]} />
          <meshStandardMaterial color={railColor} />
        </mesh>
        <mesh castShadow position={[1.1, 0.01, 0]}>
          <boxGeometry args={[0.3, 0.02, 0.15]} />
          <meshStandardMaterial color={railColor} />
        </mesh>
      </group>

      {/* Kicker Ramp on Right */}
      <group position={[3.3, -0.425, 0]}>
        {/* Base wedge slope */}
        <mesh castShadow position={[-0.2, 0.125, 0]} rotation={[0, 0, -Math.PI / 12]}>
          <boxGeometry args={[1.3, 0.08, 2.6]} />
          <meshStandardMaterial color={isDark ? '#39FF14' : woodColor} roughness={0.4} />
        </mesh>
        {/* Back support box */}
        <mesh castShadow position={[0.35, 0.125, 0]}>
          <boxGeometry args={[0.3, 0.25, 2.6]} />
          <meshStandardMaterial color={structuralColor} roughness={0.7} />
        </mesh>
      </group>

      {/* Stylized small skateboard resting on the funbox */}
      <group position={[0, 0.2, -1.3]} rotation={[0.2, 0.6, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.3, 0.02, 0.9]} />
          <meshStandardMaterial color={isDark ? '#ffffff' : '#333333'} roughness={0.2} />
        </mesh>
        {/* Tiny wheels */}
        {[-0.28, 0.28].map((z) => (
          <group key={z} position={[0, -0.03, z]}>
            <mesh position={[-0.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.05, 0.05, 0.06, 8]} />
              <meshStandardMaterial color={isDark ? '#39FF14' : '#111'} roughness={0.5} />
            </mesh>
            <mesh position={[0.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.05, 0.05, 0.06, 8]} />
              <meshStandardMaterial color={isDark ? '#39FF14' : '#111'} roughness={0.5} />
            </mesh>
          </group>
        ))}
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
            <boxGeometry args={[0.42, 0.04, 1.2]} />
            <meshStandardMaterial {...matProps} />
          </mesh>
          {/* Left Concave Rail */}
          <mesh castShadow receiveShadow position={[-0.28, 0.02, 0]} rotation={[0, 0, Math.PI / 18]}>
            <boxGeometry args={[0.16, 0.04, 1.2]} />
            <meshStandardMaterial {...matProps} />
          </mesh>
          {/* Right Concave Rail */}
          <mesh castShadow receiveShadow position={[0.26, 0.02, 0]} rotation={[0, 0, -Math.PI / 18]}>
            <boxGeometry args={[0.16, 0.04, 1.2]} />
            <meshStandardMaterial {...matProps} />
          </mesh>

          {/* Laminated Wood Core Layer (visible edge line) */}
          <mesh position={[0, -0.015, 0]}>
            <boxGeometry args={[0.74, 0.01, 1.18]} />
            <meshStandardMaterial {...woodCoreProps} />
          </mesh>
        </group>

        {/* --- Nose Kicktail (Front) Hinge Group --- */}
        <group position={[0, 0, 0.6]} rotation={[Math.PI / 10, 0, 0]}>
          <group position={[0, 0.015, 0.225]}>
            {/* Center */}
            <mesh castShadow>
              <boxGeometry args={[0.42, 0.04, 0.45]} />
              <meshStandardMaterial {...matProps} />
            </mesh>
            {/* Left Concave */}
            <mesh castShadow position={[-0.28, 0.02, 0]} rotation={[0, 0, Math.PI / 18]}>
              <boxGeometry args={[0.16, 0.04, 0.45]} />
              <meshStandardMaterial {...matProps} />
            </mesh>
            {/* Right Concave */}
            <mesh castShadow position={[0.26, 0.02, 0]} rotation={[0, 0, -Math.PI / 18]}>
              <boxGeometry args={[0.16, 0.04, 0.45]} />
              <meshStandardMaterial {...matProps} />
            </mesh>
          </group>
        </group>

        {/* --- Tail Kicktail (Back) Hinge Group --- */}
        <group position={[0, 0, -0.6]} rotation={[-Math.PI / 10, 0, 0]}>
          <group position={[0, 0.015, -0.225]}>
            {/* Center */}
            <mesh castShadow>
              <boxGeometry args={[0.42, 0.04, 0.45]} />
              <meshStandardMaterial {...matProps} />
            </mesh>
            {/* Left Concave */}
            <mesh castShadow position={[-0.28, 0.02, 0]} rotation={[0, 0, Math.PI / 18]}>
              <boxGeometry args={[0.16, 0.04, 0.45]} />
              <meshStandardMaterial {...matProps} />
            </mesh>
            {/* Right Concave */}
            <mesh castShadow position={[0.26, 0.02, 0]} rotation={[0, 0, -Math.PI / 18]}>
              <boxGeometry args={[0.16, 0.04, 0.45]} />
              <meshStandardMaterial {...matProps} />
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
