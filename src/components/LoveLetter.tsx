import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, MailOpen, Mail, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BIRTHDAY_DATA } from '../data/birthday';
import { romanticAudio } from '../audio/RomanticAudio';

export const LoveLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    romanticAudio.playCelebrationChime();

    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#fb7185', '#ffd700'],
    });

    setIsOpen(true);
  };

  return (
    <section id="letter" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/25 text-pink-300 text-xs sm:text-sm font-medium mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>From My Heart to Yours</span>
          <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-medium text-white mb-4">
          A Letter to My Baby
        </h2>

        <p className="text-pink-200/80 text-sm sm:text-base font-light">
          A little piece of my soul, written just for you on your 26th birthday.
        </p>
      </div>

      {/* Main Interactive Envelope & Letter Container */}
      <div className="flex flex-col items-center justify-center">
        {!isOpen ? (
          /* Sealed 3D Envelope Presentation */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03, y: -6 }}
            onClick={handleOpenLetter}
            className="cursor-pointer group relative w-full max-w-md aspect-[16/11] bg-gradient-to-tr from-[#9b2e3c] via-[#b83b4c] to-[#d05967] rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(184,59,76,0.45)] border border-rose-300/30 flex flex-col items-center justify-between overflow-hidden"
          >
            {/* Envelope Flap Lines & Shimmer */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.25)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-1/2 border-b border-rose-300/20 bg-gradient-to-b from-rose-900/30 to-transparent" />

            {/* Top To Badge */}
            <div className="z-10 flex items-center space-x-2 text-rose-200/90 text-xs uppercase tracking-widest font-sans">
              <span>Private & Confidential</span>
              <Heart className="w-3.5 h-3.5 fill-rose-300 text-rose-300" />
            </div>

            {/* Golden Wax Seal with Heart in the Center */}
            <div className="z-10 relative flex flex-col items-center group-hover:scale-110 transition-transform duration-300">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 p-1 shadow-[0_10px_25px_rgba(217,119,6,0.6)] flex items-center justify-center border-2 border-amber-300/70">
                <div className="w-full h-full rounded-full bg-[#831843] flex items-center justify-center shadow-inner">
                  <Heart className="w-9 h-9 text-amber-300 fill-amber-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] animate-pulse" />
                </div>
              </div>
              <p className="mt-3 font-script text-2xl text-amber-200 tracking-wide drop-shadow">
                Click to Open Wax Seal
              </p>
            </div>

            {/* Bottom Inscription */}
            <div className="z-10 text-center">
              <p className="font-serif text-lg text-rose-100 font-medium tracking-wide">
                To My Baby ♡
              </p>
              <p className="text-xs text-rose-200/70 font-light mt-0.5">
                Celebrating 26 Wonderful Years
              </p>
            </div>
          </motion.div>
        ) : (
          /* Unfolded Letter Presentation on Ivory Parchment Paper */
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#fffdfa] text-gray-800 rounded-3xl p-8 sm:p-14 shadow-[0_25px_60px_rgba(0,0,0,0.7)] border-2 border-[#e5d4bc]"
          >
            {/* Close button to re-seal envelope */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-rose-100/70 hover:bg-rose-200 text-rose-700 transition-colors"
              title="Close Letter"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Gold Filigree Header Detail */}
            <div className="flex items-center justify-center space-x-3 mb-8">
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#d4af37]" />
              <div className="flex items-center space-x-1.5 text-[#d4af37]">
                <Heart className="w-4 h-4 fill-[#d4af37]" />
                <Sparkles className="w-4 h-4" />
                <Heart className="w-4 h-4 fill-[#d4af37]" />
              </div>
              <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#d4af37]" />
            </div>

            {/* Salutation */}
            <h3 className="font-script text-4xl sm:text-5xl text-rose-800 mb-6 font-normal">
              {BIRTHDAY_DATA.letter.salutation}
            </h3>

            {/* Letter Body */}
            <div className="space-y-4 font-serif text-base sm:text-lg text-gray-700 leading-relaxed">
              {BIRTHDAY_DATA.letter.paragraphs.map((p, index) => (
                <p key={index} className="indent-4 sm:indent-6">
                  {p}
                </p>
              ))}
            </div>

            {/* Closing & Signature */}
            <div className="mt-10 pt-6 border-t border-rose-200/50 flex flex-col items-end">
              <p className="font-script text-3xl sm:text-4xl text-rose-700 mb-1">
                {BIRTHDAY_DATA.letter.closing}
              </p>
              <p className="font-sans text-xs uppercase tracking-widest text-gray-400 font-medium">
                Written with all my heart
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
