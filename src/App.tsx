import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { BirthdayHero } from './components/BirthdayHero';
import { OurStoryTimeline } from './components/OurStoryTimeline';
import { MemoryGallery } from './components/MemoryGallery';
import { LoveLetter } from './components/LoveLetter';
import { ReasonsGrid } from './components/ReasonsGrid';
import { BirthdayFinale } from './components/BirthdayFinale';
import { MusicPlayer } from './components/MusicPlayer';
import { Footer } from './components/Footer';
import { romanticAudio } from './audio/RomanticAudio';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);

  // Smooth navigation helper
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Open surprise action
  const handleOpenSurprise = () => {
    setIsUnlocked(true);
    handleNavigate('story');
    if (!isMusicPlaying) {
      // Prompt user or start music gently if they wish
      const started = romanticAudio.toggle();
      setIsMusicPlaying(started);
    }
  };

  // Toggle music playback
  const handleToggleMusic = () => {
    const playing = romanticAudio.toggle();
    setIsMusicPlaying(playing);
  };

  // Scrollspy to update active section in navigation
  useEffect(() => {
    const sections = ['hero', 'story', 'memories', 'letter', 'reasons', 'surprise'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#120815] text-[#fce7f3] selection:bg-pink-500 selection:text-white relative">
      {/* Navigation Header */}
      <Navigation
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
      />

      {/* Hero Section */}
      <BirthdayHero
        onOpenSurprise={handleOpenSurprise}
        isUnlocked={isUnlocked}
      />

      {/* Story Timeline */}
      <OurStoryTimeline />

      {/* 3D Photo Memory Gallery */}
      <MemoryGallery />

      {/* Love Letter */}
      <LoveLetter />

      {/* 26 Reasons Grid */}
      <ReasonsGrid />

      {/* Finale Surprise & 3D Cake */}
      <BirthdayFinale />

      {/* Floating Music Controller */}
      <MusicPlayer
        isPlaying={isMusicPlaying}
        onToggle={handleToggleMusic}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
