import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export const Number26Centerpiece: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null!);
  const ringRef1 = useRef<THREE.Mesh>(null!);
  const ringRef2 = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ringRef1.current) {
      ringRef1.current.rotation.z = t * 0.4;
      ringRef1.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z = -t * 0.3;
      ringRef2.current.rotation.y = Math.cos(t * 0.4) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={groupRef} position={[0, 0.2, -1.2]}>
        {/* Pedestal Base Disc */}
        <mesh position={[0, -1.8, 0]}>
          <cylinderGeometry args={[2.2, 2.5, 0.25, 32]} />
          <meshStandardMaterial
            color="#2d132c"
            metalness={0.8}
            roughness={0.2}
            emissive="#4a1532"
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* Golden Pedestal Trim */}
        <mesh position={[0, -1.68, 0]}>
          <torusGeometry args={[2.22, 0.05, 16, 40]} />
          <meshStandardMaterial color="#f5d166" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Orbiting Golden Halos */}
        <mesh ref={ringRef1} position={[0, 0.1, 0]} rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[1.9, 0.035, 16, 64]} />
          <meshStandardMaterial
            color="#fcd34d"
            emissive="#f59e0b"
            emissiveIntensity={0.7}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        <mesh ref={ringRef2} position={[0, 0.1, 0]} rotation={[-Math.PI / 2.6, 0, 0]}>
          <torusGeometry args={[2.1, 0.025, 16, 64]} />
          <meshStandardMaterial
            color="#f472b6"
            emissive="#ec4899"
            emissiveIntensity={0.6}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Sculpted 3D "2" */}
        <group position={[-0.72, 0.1, 0]}>
          {/* Top curve of 2 */}
          <mesh position={[0, 0.45, 0]}>
            <torusGeometry args={[0.42, 0.14, 16, 32, Math.PI * 1.1]} />
            <meshStandardMaterial
              color="#ff8fab"
              emissive="#fb7185"
              emissiveIntensity={0.5}
              metalness={0.6}
              roughness={0.2}
            />
          </mesh>
          {/* Diagonal stem */}
          <mesh position={[-0.05, -0.15, 0]} rotation={[0, 0, -0.65]}>
            <cylinderGeometry args={[0.13, 0.13, 0.95, 20]} />
            <meshStandardMaterial
              color="#ff8fab"
              emissive="#fb7185"
              emissiveIntensity={0.5}
              metalness={0.6}
              roughness={0.2}
            />
          </mesh>
          {/* Bottom horizontal bar */}
          <mesh position={[0.08, -0.6, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.13, 0.13, 0.85, 20]} />
            <meshStandardMaterial
              color="#ff8fab"
              emissive="#fb7185"
              emissiveIntensity={0.5}
              metalness={0.6}
              roughness={0.2}
            />
          </mesh>
        </group>

        {/* Sculpted 3D "6" */}
        <group position={[0.72, 0.1, 0]}>
          {/* Bottom loop of 6 */}
          <mesh position={[0, -0.22, 0]}>
            <torusGeometry args={[0.42, 0.14, 16, 32]} />
            <meshStandardMaterial
              color="#ffd166"
              emissive="#f59e0b"
              emissiveIntensity={0.5}
              metalness={0.6}
              roughness={0.2}
            />
          </mesh>
          {/* Top curve sweeping up to the right */}
          <mesh position={[-0.15, 0.4, 0]} rotation={[0, 0, 0.45]}>
            <torusGeometry args={[0.45, 0.13, 16, 32, Math.PI * 0.95]} />
            <meshStandardMaterial
              color="#ffd166"
              emissive="#f59e0b"
              emissiveIntensity={0.5}
              metalness={0.6}
              roughness={0.2}
            />
          </mesh>
        </group>

        {/* Floating Crown Heart over 26 */}
        <mesh position={[0, 1.35, 0]} scale={0.45} rotation={[0, 0, Math.PI]}>
          <dodecahedronGeometry args={[0.4, 1]} />
          <meshStandardMaterial
            color="#ff69b4"
            emissive="#f43f5e"
            emissiveIntensity={0.8}
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>

        {/* Centerpiece core light */}
        <pointLight position={[0, 0.3, 0.8]} intensity={2.8} color="#ffb3c6" distance={6} />
      </group>
    </Float>
  );
};
