import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ChevronDown, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BIRTHDAY_DATA } from '../data/birthday';
import { RomanticScene3D } from './3d/RomanticScene3D';
import { romanticAudio } from '../audio/RomanticAudio';

interface BirthdayHeroProps {
  onOpenSurprise: () => void;
  isUnlocked: boolean;
}

export const BirthdayHero: React.FC<BirthdayHeroProps> = ({ onOpenSurprise, isUnlocked }) => {
  const handleOpenSurprise = () => {
    // Play sound chime
    romanticAudio.playCelebrationChime();

    // Trigger sweet burst of floating hearts
    const heartDefaults = {
      spread: 360,
      ticks: 80,
      gravity: 0.4,
      decay: 0.94,
      startVelocity: 25,
      colors: ['#f472b6', '#fb7185', '#ec4899', '#fbcfe8', '#ffd700'],
      shapes: ['circle'] as ('circle' | 'square')[],
    };

    confetti({
      ...heartDefaults,
      particleCount: 45,
      scalar: 1.2,
      origin: { y: 0.65 },
    });

    onOpenSurprise();
  };

  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Romantic Universe Canvas Background */}
      <div className="absolute inset-0 z-0">
        <RomanticScene3D mode="hero" />
      </div>

      {/* Atmospheric Radial Gradient Overlay for maximum readability */}
      <div className="absolute inset-0 z-[1] bg-radial-gradient pointer-events-none bg-[radial-gradient(circle_at_center,rgba(18,8,21,0.25)_0%,rgba(18,8,21,0.85)_80%)]" />

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16 flex flex-col items-center">
        {/* Cinematic Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-pink-400/30 text-pink-200 text-xs sm:text-sm font-medium mb-6 shadow-[0_0_20px_rgba(244,114,182,0.25)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span>{BIRTHDAY_DATA.hero.badge}</span>
          <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
        </motion.div>

        {/* Primary Headline: Happy 26th Birthday, Baby ♡ */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif font-medium tracking-tight mb-4 leading-tight"
        >
          <span className="block text-white drop-shadow-[0_4px_25px_rgba(0,0,0,0.6)]">
            Happy <span className="gold-gradient-text font-serif italic">26th</span> Birthday,
          </span>
          <span className="font-script text-5xl sm:text-7xl md:text-8xl rose-gradient-text block mt-1 drop-shadow-[0_0_35px_rgba(244,114,182,0.6)]">
            Baby ♡
          </span>
        </motion.h1>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.45 }}
          className="max-w-2xl text-base sm:text-xl text-pink-100/90 font-light leading-relaxed mb-10 drop-shadow-[0_2px_15px_rgba(0,0,0,0.7)]"
        >
          “{BIRTHDAY_DATA.hero.subheadline}”
        </motion.p>

        {/* Action Button: Open Your Surprise ♡ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={handleOpenSurprise}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-base sm:text-lg font-medium text-white rounded-full overflow-hidden shadow-[0_10px_35px_rgba(236,72,153,0.45)] transition-all duration-500 hover:scale-105 active:scale-95"
          >
            {/* Pulsing Gradient Background */}
            <span className="absolute inset-0 bg-gradient-to-r from-pink-600 via-rose-500 to-amber-400 group-hover:opacity-90 transition-opacity" />
            <span className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer" />

            <span className="relative flex items-center space-x-3">
              <span>{isUnlocked ? "Continue Exploring ♡" : BIRTHDAY_DATA.hero.cta}</span>
              <Heart className="w-5 h-5 text-white fill-white/80 group-hover:scale-125 transition-transform" />
            </span>
          </button>
        </motion.div>

        {/* Subtle Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1.0 }}
          className="absolute bottom-6 flex flex-col items-center cursor-pointer group"
          onClick={handleOpenSurprise}
        >
          <span className="text-xs text-pink-300/70 font-light tracking-widest uppercase mb-1.5 group-hover:text-pink-200 transition-colors">
            Scroll to explore
          </span>
          <ChevronDown className="w-5 h-5 text-pink-400/80 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};
