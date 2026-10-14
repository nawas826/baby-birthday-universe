import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface BirthdayCake3DProps {
  candlesLit: boolean;
}

export const BirthdayCake3D: React.FC<BirthdayCake3DProps> = ({ candlesLit }) => {
  const cakeGroup = useRef<THREE.Group>(null!);
  const flameGroup = useRef<THREE.Group>(null!);

  // Generate positions for exactly 26 candles
  // 16 candles on tier 1 (radius = 1.35), 10 candles on tier 2 (radius = 0.85)
  const candles = useMemo(() => {
    const list: { pos: [number, number, number]; height: number; color: string }[] = [];
    const colors = ['#f472b6', '#fcd34d', '#fb7185', '#ffffff'];

    // 16 on Tier 1
    const countTier1 = 16;
    const r1 = 1.35;
    const y1 = 0.28;
    for (let i = 0; i < countTier1; i++) {
      const angle = (i / countTier1) * Math.PI * 2;
      list.push({
        pos: [Math.cos(angle) * r1, y1, Math.sin(angle) * r1],
        height: 0.38,
        color: colors[i % colors.length],
      });
    }

    // 10 on Tier 2
    const countTier2 = 10;
    const r2 = 0.82;
    const y2 = 0.98;
    for (let i = 0; i < countTier2; i++) {
      const angle = (i / countTier2) * Math.PI * 2 + 0.2;
      list.push({
        pos: [Math.cos(angle) * r2, y2, Math.sin(angle) * r2],
        height: 0.35,
        color: colors[(i + 2) % colors.length],
      });
    }

    return list;
  }, []);

  // Animate candle flame flicker
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (flameGroup.current && candlesLit) {
      flameGroup.current.children.forEach((child, idx) => {
        const s = 1 + Math.sin(t * 8 + idx) * 0.15;
        child.scale.set(s, s * (1 + Math.cos(t * 10 + idx) * 0.1), s);
      });
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.35}>
      <group ref={cakeGroup} position={[0, -0.4, 0]}>
        {/* Cake Stand: Ivory porcelain with gold trim */}
        <mesh position={[0, -1.3, 0]}>
          <cylinderGeometry args={[2.0, 2.2, 0.15, 40]} />
          <meshStandardMaterial color="#fffbf2" roughness={0.2} metalness={0.1} />
        </mesh>
        <mesh position={[0, -1.6, 0]}>
          <cylinderGeometry args={[0.55, 1.1, 0.5, 32]} />
          <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.7} />
        </mesh>

        {/* Tier 1: Bottom Layer (Blush Pink Velvet) */}
        <mesh position={[0, -0.45, 0]}>
          <cylinderGeometry args={[1.65, 1.65, 0.75, 40]} />
          <meshStandardMaterial color="#fca5a5" roughness={0.4} metalness={0.05} />
        </mesh>
        {/* Frosting Border Tier 1 */}
        <mesh position={[0, -0.08, 0]}>
          <torusGeometry args={[1.66, 0.07, 16, 40]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>

        {/* Tier 2: Middle/Top Layer (Ivory Vanilla Cream) */}
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[1.1, 1.1, 0.65, 36]} />
          <meshStandardMaterial color="#fff1f2" roughness={0.35} metalness={0.05} />
        </mesh>
        {/* Frosting Drips / Border Tier 2 */}
        <mesh position={[0, 0.77, 0]}>
          <torusGeometry args={[1.11, 0.06, 16, 36]} />
          <meshStandardMaterial color="#f472b6" roughness={0.3} />
        </mesh>

        {/* Cake Crown Topper Heart */}
        <mesh position={[0, 1.35, 0]} scale={0.28}>
          <dodecahedronGeometry args={[0.7, 1]} />
          <meshStandardMaterial
            color="#fb7185"
            emissive="#f43f5e"
            emissiveIntensity={candlesLit ? 0.8 : 0.2}
            metalness={0.6}
            roughness={0.2}
          />
        </mesh>

        {/* Decorative Gold & Strawberry Pearls around cake */}
        {Array.from({ length: 18 }).map((_, i) => {
          const angle = (i / 18) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 1.62, -0.06, Math.sin(angle) * 1.62]}
              scale={0.07}
            >
              <sphereGeometry args={[1, 12, 12]} />
              <meshStandardMaterial color={i % 2 === 0 ? '#f5d166' : '#e11d48'} metalness={0.6} roughness={0.2} />
            </mesh>
          );
        })}

        {/* Exactly 26 Candles */}
        <group>
          {candles.map((c, i) => (
            <group key={i} position={c.pos}>
              {/* Candle Body */}
              <mesh position={[0, c.height / 2, 0]}>
                <cylinderGeometry args={[0.038, 0.038, c.height, 12]} />
                <meshStandardMaterial color={c.color} roughness={0.3} />
              </mesh>
              {/* Candle Wick */}
              <mesh position={[0, c.height + 0.03, 0]}>
                <cylinderGeometry args={[0.006, 0.006, 0.06, 6]} />
                <meshBasicMaterial color="#374151" />
              </mesh>
            </group>
          ))}
        </group>

        {/* 26 Candle Flames */}
        <group ref={flameGroup}>
          {candles.map((c, i) => (
            <mesh
              key={`flame-${i}`}
              position={[c.pos[0], c.pos[1] + c.height + 0.09, c.pos[2]]}
              scale={candlesLit ? 0.055 : 0.0}
            >
              <sphereGeometry args={[1, 10, 10]} />
              <meshBasicMaterial color="#fed7aa" />
            </mesh>
          ))}
        </group>

        {/* Warm Ambient Cake Lights */}
        {candlesLit && (
          <>
            <pointLight position={[0, 1.4, 0]} intensity={3.5} color="#fed7aa" distance={5} />
            <pointLight position={[0, 0.7, 1.2]} intensity={2.0} color="#f472b6" distance={4} />
          </>
        )}
      </group>
    </Float>
  );
};
