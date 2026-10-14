import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { RosePetals } from './RosePetals';
import { FloatingHearts } from './FloatingHearts';
import { FloralArch } from './FloralArch';
import { Number26Centerpiece } from './Number26Centerpiece';
import { BirthdayCake3D } from './BirthdayCake3D';

interface SceneContentProps {
  mode: 'hero' | 'cake';
  candlesLit?: boolean;
}

const CameraRig: React.FC = () => {
  useFrame((state) => {
    // Smooth subtle mouse / touch parallax
    const targetX = (state.pointer.x * 0.9);
    const targetY = (state.pointer.y * 0.5) + 0.2;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.04);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
};

const SceneContent: React.FC<SceneContentProps> = ({ mode, candlesLit = true }) => {
  return (
    <>
      <CameraRig />
      {/* Ambient and Romantic Mood Lighting */}
      <ambientLight intensity={0.85} color="#ffe4e6" />
      <directionalLight position={[5, 8, 5]} intensity={1.2} color="#fef3c7" />
      <pointLight position={[-4, 2, 3]} intensity={1.0} color="#f472b6" distance={10} />
      <pointLight position={[4, -1, 2]} intensity={0.9} color="#e0a96d" distance={8} />

      {/* Floating Sparkles & Firefly Stars */}
      <Sparkles
        count={70}
        scale={12}
        size={2.5}
        speed={0.35}
        opacity={0.7}
        color="#fef08a"
      />
      <Sparkles
        count={50}
        scale={10}
        size={3.0}
        speed={0.25}
        opacity={0.65}
        color="#f472b6"
      />
      <Stars radius={40} depth={20} count={600} factor={3} saturation={0.8} fade speed={0.8} />

      {/* Rose Petals & Floating 3D Hearts */}
      <RosePetals count={50} />
      <FloatingHearts />

      {/* Hero Mode vs Finale Cake Mode */}
      {mode === 'hero' ? (
        <>
          <FloralArch />
          <Number26Centerpiece />
        </>
      ) : (
        <BirthdayCake3D candlesLit={candlesLit} />
      )}
    </>
  );
};

interface RomanticScene3DProps {
  mode?: 'hero' | 'cake';
  candlesLit?: boolean;
  className?: string;
}

export const RomanticScene3D: React.FC<RomanticScene3DProps> = ({
  mode = 'hero',
  candlesLit = true,
  className = 'w-full h-full',
}) => {
  const [hasWebGLError, setHasWebGLError] = useState(false);

  useEffect(() => {
    // Quick check if WebGL is available
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGLError(true);
      }
    } catch {
      setHasWebGLError(true);
    }
  }, []);

  if (hasWebGLError) {
    return (
      <div className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#1b091f] via-[#2c0e28] to-[#140616] ${className}`}>
        {/* CSS Animated Fallback when WebGL is unavailable */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,114,182,0.25)_0,transparent_70%)]" />
        <div className="text-center z-10 px-4">
          <div className="inline-block p-4 rounded-full bg-pink-500/10 border border-pink-400/30 mb-3 animate-pulse">
            <span className="text-4xl">🌸 💖 🌸</span>
          </div>
          <p className="text-pink-200/80 text-sm font-light">A Romantic Universe for Shamna</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{ position: [0, 0.4, 4.8], fov: 48, near: 0.1, far: 80 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          <SceneContent mode={mode} candlesLit={candlesLit} />
        </Suspense>
      </Canvas>
    </div>
  );
};
