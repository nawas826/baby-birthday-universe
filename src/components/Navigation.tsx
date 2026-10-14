import React, { useState, useEffect } from 'react';
import { Heart, Music, VolumeX, Menu, X, Sparkles } from 'lucide-react';
import { romanticAudio } from '../audio/RomanticAudio';

interface NavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onNavigate,
  isMusicPlaying,
  onToggleMusic,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'story', label: 'Our Story' },
    { id: 'memories', label: 'Memories' },
    { id: 'letter', label: 'My Letter' },
    { id: 'reasons', label: '26 Reasons' },
    { id: 'surprise', label: 'Birthday Surprise' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3 bg-[#120815]/85 backdrop-blur-md border-b border-pink-500/15 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Monogram */}
          <button
            onClick={() => onNavigate('hero')}
            className="flex items-center space-x-2.5 text-left group"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-600 via-rose-400 to-amber-300 p-[1px] shadow-sm group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#1b091f] rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-pink-400 fill-pink-400/30 group-hover:fill-pink-400 transition-colors" />
              </div>
            </div>
            <div>
              <span className="font-serif text-base sm:text-lg tracking-wide text-pink-100 font-medium">
                Baby's <span className="text-pink-400 font-script text-xl sm:text-2xl">26th</span>
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-pink-500/20 shadow-inner">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-md shadow-pink-500/25 scale-105'
                      : 'text-pink-200/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Audio pill and mobile menu toggle */}
          <div className="flex items-center space-x-2.5">
            {/* Music Toggle Pill */}
            <button
              onClick={onToggleMusic}
              title={isMusicPlaying ? "Pause romantic melody" : "Play romantic melody"}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-300 ${
                isMusicPlaying
                  ? 'bg-pink-600/30 border-pink-400 text-pink-200 shadow-[0_0_15px_rgba(236,72,153,0.35)]'
                  : 'bg-white/5 border-pink-500/20 text-pink-300/70 hover:bg-white/10'
              }`}
            >
              {isMusicPlaying ? (
                <>
                  <div className="flex items-end space-x-0.5 h-3.5">
                    <span className="w-0.5 h-full bg-pink-400 animate-[pulse_0.6s_ease-in-out_infinite]" />
                    <span className="w-0.5 h-2/3 bg-pink-400 animate-[pulse_0.8s_ease-in-out_infinite]" />
                    <span className="w-0.5 h-4/5 bg-pink-400 animate-[pulse_0.5s_ease-in-out_infinite]" />
                  </div>
                  <span className="hidden sm:inline">Music: On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-pink-300/60" />
                  <span className="hidden sm:inline">Music: Off</span>
                </>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white/5 border border-pink-500/20 text-pink-200 hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#120815]/95 backdrop-blur-xl md:hidden pt-24 px-6 flex flex-col justify-between pb-8 animate-fadeIn">
          <div className="flex flex-col space-y-3">
            <p className="text-xs uppercase tracking-widest text-pink-400/60 font-medium mb-1">
              Navigate Universe
            </p>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-4 py-3 rounded-2xl text-base font-medium transition-all ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-lg'
                    : 'text-pink-100/90 hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-pink-500/20">
            <div className="flex items-center justify-between text-xs text-pink-300/70">
              <span>Made with endless love for Shamna</span>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
