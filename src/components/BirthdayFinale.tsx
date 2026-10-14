import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Wand2, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BIRTHDAY_DATA } from '../data/birthday';
import { RomanticScene3D } from './3d/RomanticScene3D';
import { romanticAudio } from '../audio/RomanticAudio';

export const BirthdayFinale: React.FC = () => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [isWishMade, setIsWishMade] = useState(false);

  const handleMakeWish = () => {
    // Extinguish candles with a magical puff
    setCandlesLit(false);
    setIsWishMade(true);

    // Audio chime
    romanticAudio.playCelebrationChime();

    // Multistage spectacular confetti and heart explosion
    const end = Date.now() + 3.5 * 1000;
    const colors = ['#f472b6', '#fb7185', '#ec4899', '#fef08a', '#ffd700', '#ffffff'];

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleReplay = () => {
    setCandlesLit(true);
    setIsWishMade(false);
    romanticAudio.playSparkle();
  };

  return (
    <section id="surprise" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto overflow-hidden">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/25 text-pink-300 text-xs sm:text-sm font-medium mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>The Grand Finale</span>
          <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-medium text-white mb-4">
          {BIRTHDAY_DATA.finale.title}
        </h2>

        <p className="font-script text-2xl sm:text-3xl text-pink-300 mb-2">
          “{BIRTHDAY_DATA.finale.subtitle}”
        </p>

        <p className="text-pink-200/70 text-xs sm:text-sm font-light">
          26 glowing candles on your cake — one for every year of happiness you bring to my life.
        </p>
      </div>

      {/* 3D Birthday Cake Interactive Stage */}
      <div className="relative w-full h-[400px] sm:h-[480px] rounded-3xl overflow-hidden glass-panel mb-12 border border-pink-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        {/* Cake Status Banner */}
        <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-pink-400/20 text-xs text-pink-200 flex items-center space-x-2">
          <span className={`w-2 h-2 rounded-full ${candlesLit ? 'bg-amber-400 animate-ping' : 'bg-gray-400'}`} />
          <span>{candlesLit ? '26 Candles Glowing' : 'Wish Made ♡'}</span>
        </div>

        {/* 3D Canvas with Cake */}
        <RomanticScene3D mode="cake" candlesLit={candlesLit} />
      </div>

      {/* Action Controls & Revealed Wish Message */}
      <div className="flex flex-col items-center justify-center text-center">
        {!isWishMade ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <button
              onClick={handleMakeWish}
              className="group relative inline-flex items-center justify-center px-10 py-5 text-lg sm:text-xl font-medium text-white rounded-full overflow-hidden shadow-[0_10px_40px_rgba(244,114,182,0.5)] transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-pink-600 via-rose-500 to-amber-400 group-hover:opacity-95 transition-opacity" />
              <span className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer" />

              <span className="relative flex items-center space-x-3">
                <Wand2 className="w-5 h-5 text-amber-200 animate-bounce" />
                <span>{BIRTHDAY_DATA.finale.buttonText}</span>
                <Sparkles className="w-5 h-5 text-amber-200" />
              </span>
            </button>
            <p className="text-xs text-pink-300/60 font-light mt-3">
              Close your eyes, make your deepest wish, and blow the candles ♡
            </p>
          </motion.div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl w-full p-8 sm:p-12 rounded-3xl bg-gradient-to-tr from-[#fffdfa] via-[#fff5f7] to-[#fef2f2] border-2 border-pink-300/60 shadow-[0_25px_60px_rgba(244,114,182,0.3)] text-gray-800"
            >
              <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-6 shadow-inner">
                <Heart className="w-8 h-8 text-rose-600 fill-rose-600 animate-pulse" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-rose-900 mb-4">
                Your Birthday Wish Is Set Free ✨
              </h3>

              <p className="font-serif text-lg sm:text-xl text-gray-700 leading-relaxed mb-6 italic">
                “{BIRTHDAY_DATA.finale.wishMessage}”
              </p>

              <div className="pt-6 border-t border-rose-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="font-script text-2xl text-rose-700">
                  Forever Your Nawas ♡
                </span>

                <button
                  onClick={handleReplay}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-medium transition-all shadow-md hover:scale-105"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Experience Again ✨</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};
