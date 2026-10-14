import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HeartMeshProps {
  position: [number, number, number];
  scale: number;
  rotationSpeed: number;
  bobSpeed: number;
  bobAmp: number;
  phase: number;
  color: string;
}

const SingleHeart: React.FC<HeartMeshProps & { geometry: THREE.BufferGeometry }> = ({
  position,
  scale,
  rotationSpeed,
  bobSpeed,
  bobAmp,
  phase,
  color,
  geometry,
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * rotationSpeed + phase;
    meshRef.current.rotation.z = Math.sin(t * 0.8 + phase) * 0.12;
    meshRef.current.position.y = position[1] + Math.sin(t * bobSpeed + phase) * bobAmp;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale} geometry={geometry}>
      <meshStandardMaterial
        color={color}
        roughness={0.25}
        metalness={0.4}
        emissive={color}
        emissiveIntensity={0.25}
      />
    </mesh>
  );
};

export const FloatingHearts: React.FC = () => {
  // Create 3D Heart geometry once
  const heartGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    shape.moveTo(x + 0.25, y + 0.25);
    shape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
    shape.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35);
    shape.bezierCurveTo(x - 0.3, y + 0.55, x - 0.1, y + 0.77, x + 0.25, y + 1.0);
    shape.bezierCurveTo(x + 0.6, y + 0.77, x + 0.8, y + 0.55, x + 0.8, y + 0.35);
    shape.bezierCurveTo(x + 0.8, y + 0.35, x + 0.8, y, x + 0.5, y);
    shape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);

    const extrudeSettings = {
      depth: 0.16,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    };

    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.center();
    // Rotate so heart faces front correctly
    geom.rotateZ(Math.PI);
    return geom;
  }, []);

  const heartConfigs = useMemo(() => {
    const colors = ['#f472b6', '#fb7185', '#ec4899', '#fca5a5', '#e879f9'];
    return [
      { pos: [-4.2, 1.8, -2] as [number, number, number], scale: 1.1, speed: 0.6, bob: 1.2, amp: 0.3, phase: 0.5, color: colors[0] },
      { pos: [4.5, 2.2, -1.8] as [number, number, number], scale: 1.0, speed: 0.5, bob: 1.4, amp: 0.28, phase: 1.8, color: colors[1] },
      { pos: [-3.2, -1.5, 0.5] as [number, number, number], scale: 0.75, speed: 0.7, bob: 1.6, amp: 0.22, phase: 2.5, color: colors[2] },
      { pos: [3.8, -1.2, 0.2] as [number, number, number], scale: 0.85, speed: 0.45, bob: 1.1, amp: 0.25, phase: 3.2, color: colors[3] },
      { pos: [-1.8, 3.2, -3.5] as [number, number, number], scale: 0.65, speed: 0.8, bob: 1.5, amp: 0.2, phase: 4.1, color: colors[4] },
      { pos: [2.2, 3.4, -3.2] as [number, number, number], scale: 0.7, speed: 0.65, bob: 1.3, amp: 0.24, phase: 5.0, color: colors[0] },
      { pos: [-5.2, 0.2, -4] as [number, number, number], scale: 0.6, speed: 0.5, bob: 1.0, amp: 0.18, phase: 1.2, color: colors[2] },
      { pos: [5.2, -0.4, -3.5] as [number, number, number], scale: 0.65, speed: 0.55, bob: 1.2, amp: 0.2, phase: 3.7, color: colors[1] },
    ];
  }, []);

  return (
    <group>
      {heartConfigs.map((cfg, i) => (
        <SingleHeart
          key={i}
          position={cfg.pos}
          scale={cfg.scale}
          rotationSpeed={cfg.speed}
          bobSpeed={cfg.bob}
          bobAmp={cfg.amp}
          phase={cfg.phase}
          color={cfg.color}
          geometry={heartGeometry}
        />
      ))}
    </group>
  );
};
