import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Sparkles,
  Smile,
  Flame,
  Star,
  Home,
  Camera,
  Compass,
  Music,
  Gift,
  Award,
  Crown,
  Coffee,
  Navigation,
  Eye,
  Clock,
  Footprints,
  Utensils,
  Wand2,
  Key,
  Infinity,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';
import { BIRTHDAY_DATA, ReasonItem } from '../data/birthday';
import { romanticAudio } from '../audio/RomanticAudio';

const getReasonIcon = (iconName: string) => {
  switch (iconName) {
    case 'Sparkles':
      return Sparkles;
    case 'Heart':
    case 'ShieldHeart':
    case 'MessageCircleHeart':
    case 'HandHeart':
      return Heart;
    case 'Smile':
      return Smile;
    case 'Flame':
      return Flame;
    case 'Star':
      return Star;
    case 'Home':
      return Home;
    case 'Camera':
      return Camera;
    case 'Compass':
      return Compass;
    case 'Music':
      return Music;
    case 'Gift':
      return Gift;
    case 'Award':
      return Award;
    case 'Crown':
      return Crown;
    case 'Coffee':
      return Coffee;
    case 'Navigation':
      return Navigation;
    case 'Eye':
      return Eye;
    case 'Clock':
      return Clock;
    case 'Footprints':
      return Footprints;
    case 'Utensils':
      return Utensils;
    case 'Wand2':
      return Wand2;
    case 'Key':
      return Key;
    case 'Infinity':
    case 'Ring':
      return Infinity;
    default:
      return Heart;
  }
};

export const ReasonsGrid: React.FC = () => {
  // Set of flipped card indices
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const handleToggleCard = (index: number) => {
    romanticAudio.playSparkle();
    setFlippedCards((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const handleFlipAll = () => {
    romanticAudio.playCelebrationChime();
    const all = new Set<number>();
    for (let i = 0; i < BIRTHDAY_DATA.reasons.length; i++) {
      all.add(i);
    }
    setFlippedCards(all);
  };

  const handleResetAll = () => {
    setFlippedCards(new Set());
  };

  return (
    <section id="reasons" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/25 text-pink-300 text-xs sm:text-sm font-medium mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Celebrating 26 Years of Shamna</span>
          <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-medium text-white mb-4">
          26 Reasons I Love My Baby
        </h2>

        <p className="text-pink-200/80 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
          One unforgettable reason for each beautiful year you've blessed this world. Click each card to reveal what makes you so irreplaceable.
        </p>

        {/* Unlocked Progress & Quick Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="px-5 py-2 rounded-full bg-white/5 border border-pink-500/20 backdrop-blur-md flex items-center space-x-2 text-xs sm:text-sm text-pink-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>
              Discovered: <strong>{flippedCards.size}</strong> of {BIRTHDAY_DATA.reasons.length} Reasons
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleFlipAll}
              className="px-4 py-2 rounded-full bg-pink-500/20 hover:bg-pink-500/30 border border-pink-400/30 text-xs text-pink-200 transition-all font-medium"
            >
              Reveal All ✨
            </button>
            <button
              onClick={handleResetAll}
              className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-pink-500/15 text-xs text-pink-300/70 transition-all font-medium flex items-center space-x-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Exactly 26 Responsive 3D Flip Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
        {BIRTHDAY_DATA.reasons.map((reason: ReasonItem, index: number) => {
          const isFlipped = flippedCards.has(index);
          const IconComponent = getReasonIcon(reason.icon);

          return (
            <div
              key={reason.number}
              onClick={() => handleToggleCard(index)}
              className="perspective-1000 h-[250px] cursor-pointer group"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 8) * 0.05 }}
                className={`relative w-full h-full preserve-3d transition-transform duration-700 ease-out ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* FRONT FACE: Gift / Heart Sealed Presentation */}
                <div className="absolute inset-0 backface-hidden rounded-3xl p-6 bg-gradient-to-tr from-[#250d28] via-[#351138] to-[#1c0820] border border-pink-500/25 shadow-lg group-hover:border-pink-400/50 group-hover:shadow-[0_10px_30px_rgba(244,114,182,0.25)] flex flex-col items-center justify-between transition-all">
                  {/* Top card number badge */}
                  <div className="w-full flex items-center justify-between">
                    <span className="font-serif text-sm font-semibold text-amber-300/90 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                      #{reason.number}
                    </span>
                    <Heart className="w-4 h-4 text-pink-400/70 group-hover:scale-125 transition-transform" />
                  </div>

                  {/* Center Heart Emblem & Reason Title */}
                  <div className="flex flex-col items-center text-center my-auto">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500/20 to-amber-300/20 border border-pink-400/30 flex items-center justify-center mb-3 shadow-inner group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6 text-pink-300 group-hover:text-pink-200" />
                    </div>
                    <h3 className="font-serif text-lg font-medium text-white group-hover:text-pink-200 transition-colors">
                      {reason.title}
                    </h3>
                  </div>

                  {/* Bottom Tap Prompt */}
                  <p className="text-[11px] uppercase tracking-wider text-pink-300/60 font-sans group-hover:text-pink-200 transition-colors">
                    Click to Open ♡
                  </p>
                </div>

                {/* BACK FACE: Revealed Romantic Reason */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl p-6 bg-gradient-to-tr from-[#fffdf9] to-[#fff1f2] border-2 border-pink-300 shadow-2xl flex flex-col justify-between text-gray-800">
                  {/* Header on back */}
                  <div className="flex items-center justify-between pb-2 border-b border-pink-200/60">
                    <span className="text-xs font-serif font-bold text-rose-700">
                      Year #{reason.number}
                    </span>
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  </div>

                  {/* Quote & Description */}
                  <div className="my-auto py-1">
                    <p className="font-script text-xl text-rose-800 leading-tight mb-2">
                      “{reason.quote}”
                    </p>
                    <p className="font-sans text-xs sm:text-[13px] text-gray-700 font-light leading-relaxed">
                      {reason.description}
                    </p>
                  </div>

                  {/* Footer on back */}
                  <div className="pt-2 border-t border-pink-200/60 flex items-center justify-between text-[10px] text-rose-600/70 uppercase tracking-widest font-mono">
                    <span>Forever Baby</span>
                    <span>Click to flip</span>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
