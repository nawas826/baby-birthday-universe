import React from 'react';
import { Heart, Sparkles, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-pink-500/15 bg-[#0e0511] text-center text-pink-200/70">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Monogram Badge */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-600 via-rose-400 to-amber-300 p-[1px] mb-4 shadow-lg">
          <div className="w-full h-full bg-[#1b091f] rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />
          </div>
        </div>

        <h3 className="font-serif text-2xl text-pink-100 font-medium mb-1">
          Shamna & Nawas
        </h3>

        <p className="font-script text-2xl sm:text-3xl text-pink-300 mb-4">
          “Today, tomorrow, and always. Forever yours.”
        </p>

        <p className="text-xs sm:text-sm text-pink-300/60 font-light max-w-md mx-auto mb-8">
          A personalized 3D birthday universe crafted with endless love for Baby's 26th birthday celebration.
        </p>

        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-pink-500/20 text-xs text-pink-200 transition-colors"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>Back to Top</span>
        </button>
      </div>
    </footer>
  );
};
