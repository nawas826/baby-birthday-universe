import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const FloralArch: React.FC = () => {
  const fairyLightsRef = useRef<THREE.Points>(null!);

  // Generate fairy lights along the arch curve
  const { archPoints, flowerPositions } = useMemo(() => {
    const points: [number, number, number][] = [];
    const flowers: { pos: [number, number, number]; color: string; scale: number }[] = [];
    const colors = ['#f472b6', '#fbcfe8', '#fecdd3', '#e08ba2', '#fef08a'];

    const radius = 3.6;
    const segments = 40;

    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI; // 0 to PI
      const x = Math.cos(theta) * radius;
      const y = Math.sin(theta) * (radius * 0.95) - 0.5;
      const z = -2.5 + Math.sin(theta * 2) * 0.4;

      // Add fairy light points around each segment
      for (let j = 0; j < 3; j++) {
        points.push([
          x + (Math.random() - 0.5) * 0.35,
          y + (Math.random() - 0.5) * 0.35,
          z + (Math.random() - 0.5) * 0.35,
        ]);
      }

      // Add decorative flower blooms along the arch
      if (i % 2 === 0) {
        flowers.push({
          pos: [
            x + (Math.random() - 0.5) * 0.25,
            y + (Math.random() - 0.5) * 0.25,
            z + (Math.random() - 0.5) * 0.2,
          ],
          color: colors[Math.floor(Math.random() * colors.length)],
          scale: 0.12 + Math.random() * 0.08,
        });
      }
    }

    return { archPoints: points, flowerPositions: flowers };
  }, []);

  const fairyBuffer = useMemo(() => {
    const arr = new Float32Array(archPoints.length * 3);
    archPoints.forEach((pt, i) => {
      arr[i * 3] = pt[0];
      arr[i * 3 + 1] = pt[1];
      arr[i * 3 + 2] = pt[2];
    });
    return arr;
  }, [archPoints]);

  useFrame((state) => {
    if (fairyLightsRef.current) {
      const mat = fairyLightsRef.current.material as THREE.PointsMaterial;
      mat.size = 0.08 + Math.sin(state.clock.getElapsedTime() * 3) * 0.02;
    }
  });

  return (
    <group position={[0, -0.6, -1]}>
      {/* Main Arch Frame: Curved Tube */}
      <mesh position={[0, 1.2, -2.5]}>
        <torusGeometry args={[3.6, 0.08, 16, 50, Math.PI]} />
        <meshStandardMaterial
          color="#d4af37"
          roughness={0.3}
          metalness={0.8}
          emissive="#5c4410"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Secondary Inner Arch Ring */}
      <mesh position={[0, 1.2, -2.4]}>
        <torusGeometry args={[3.45, 0.05, 16, 50, Math.PI]} />
        <meshStandardMaterial
          color="#fbcfe8"
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      {/* Flower blooms clustered on arch */}
      {flowerPositions.map((fl, idx) => (
        <mesh key={idx} position={fl.pos}>
          <dodecahedronGeometry args={[fl.scale, 1]} />
          <meshStandardMaterial
            color={fl.color}
            roughness={0.5}
            emissive={fl.color}
            emissiveIntensity={0.35}
          />
        </mesh>
      ))}

      {/* Twinkling Fairy Lights */}
      <points ref={fairyLightsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={archPoints.length}
            array={fairyBuffer}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#fff5ba"
          size={0.08}
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Warm romantic point light under the arch */}
      <pointLight position={[0, 2.5, -2]} intensity={2.2} color="#f472b6" distance={8} />
      <pointLight position={[-2.5, 0.5, -2]} intensity={1.5} color="#fbbf24" distance={6} />
      <pointLight position={[2.5, 0.5, -2]} intensity={1.5} color="#fbbf24" distance={6} />
    </group>
  );
};
