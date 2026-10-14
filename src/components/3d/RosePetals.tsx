import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface RosePetalsProps {
  count?: number;
}

export const RosePetals: React.FC<RosePetalsProps> = ({ count = 65 }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate petal geometry (slightly curved oval resembling a real rose petal)
  const petalGeometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(0.35, 0.45, 4, 4);
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      // add gentle cup curvature
      pos.setZ(i, (x * x + y * y) * 0.4);
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  // Initial random positions, velocities, and rotations
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 22,
      y: Math.random() * 18 - 4,
      z: (Math.random() - 0.5) * 16,
      speedY: 0.015 + Math.random() * 0.025,
      swaySpeed: 0.8 + Math.random() * 1.5,
      rotSpeedX: (Math.random() - 0.5) * 0.03,
      rotSpeedY: (Math.random() - 0.5) * 0.03,
      rotSpeedZ: (Math.random() - 0.5) * 0.02,
      scale: 0.7 + Math.random() * 0.6,
      phase: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    particles.forEach((p, i) => {
      // Gentle downward descent with sine wave wind drift
      p.y -= p.speedY;
      p.x += Math.sin(time * p.swaySpeed + p.phase) * 0.008;
      p.z += Math.cos(time * 0.7 + p.phase) * 0.005;

      // Wrap around when falling beneath view
      if (p.y < -7) {
        p.y = 12;
        p.x = (Math.random() - 0.5) * 22;
        p.z = (Math.random() - 0.5) * 16;
      }

      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.x = time * p.rotSpeedX * 15 + p.phase;
      dummy.rotation.y = time * p.rotSpeedY * 15 + p.phase;
      dummy.rotation.z = Math.sin(time * 1.2 + p.phase) * 0.5;
      dummy.scale.set(p.scale, p.scale, p.scale);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[petalGeometry, undefined, count]}
      frustumCulled={false}
    >
      <meshStandardMaterial
        color="#e05878"
        roughness={0.4}
        metalness={0.1}
        side={THREE.DoubleSide}
        transparent
        opacity={0.88}
      />
    </instancedMesh>
  );
};
