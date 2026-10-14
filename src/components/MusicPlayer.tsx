import React, { useState, useRef } from 'react';
import { Music, Play, Pause, Volume2, Upload, Sparkles, ChevronUp, ChevronDown } from 'lucide-react';
import { romanticAudio } from '../audio/RomanticAudio';

interface MusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ isPlaying, onToggle }) => {
  const [songName, setSongName] = useState<string>('Synthesized Romantic Chords & Sparkles');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const handleCustomAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    romanticAudio.setCustomAudio(url);
    setSongName(file.name.replace(/\.[^/.]+$/, ''));
    if (!isPlaying) {
      onToggle();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Expanded Control Box */}
      {isExpanded && (
        <div className="mb-2 p-4 rounded-2xl bg-[#1c0b20]/90 backdrop-blur-xl border border-pink-500/25 shadow-2xl max-w-xs text-xs text-pink-200 animate-fadeIn">
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-pink-500/20">
            <span className="font-semibold text-pink-100 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Romantic Sound Studio</span>
            </span>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-pink-400 hover:text-white"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-pink-300/80 mb-3 leading-relaxed">
            Playing soothing generative piano chords. You can also pick any song file from your device to play Baby's favorite track!
          </p>

          <input
            ref={audioInputRef}
            type="file"
            accept="audio/*"
            onChange={handleCustomAudioUpload}
            className="hidden"
          />

          <button
            onClick={() => audioInputRef.current?.click()}
            className="w-full py-2 px-3 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 border border-pink-400/30 text-pink-100 text-xs font-medium flex items-center justify-center space-x-2 transition-colors"
          >
            <Upload className="w-3.5 h-3.5 text-amber-300" />
            <span>Choose Your Song (MP3)</span>
          </button>
        </div>
      )}

      {/* Floating Pill Controller */}
      <div className="flex items-center space-x-2 p-1.5 sm:p-2 rounded-full bg-[#1b091f]/85 backdrop-blur-md border border-pink-500/30 shadow-[0_8px_25px_rgba(0,0,0,0.5)]">
        {/* Play / Pause Action Button */}
        <button
          onClick={onToggle}
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all ${
            isPlaying
              ? 'bg-gradient-to-tr from-pink-600 to-rose-400 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)] scale-105'
              : 'bg-white/10 text-pink-200 hover:bg-white/15'
          }`}
          title={isPlaying ? "Pause music" : "Play romantic melody"}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        {/* Current Track Label & Equalizer */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="cursor-pointer px-2 sm:px-3 text-left hidden sm:block max-w-[150px] truncate"
        >
          <div className="flex items-center space-x-1.5">
            <span className="text-[10px] uppercase font-mono tracking-wider text-pink-400/80">
              {isPlaying ? 'Playing' : 'Audio Muted'}
            </span>
            {isPlaying && (
              <span className="flex space-x-0.5 items-end h-2.5">
                <span className="w-0.5 h-full bg-pink-400 animate-pulse" />
                <span className="w-0.5 h-1/2 bg-pink-400 animate-pulse delay-75" />
                <span className="w-0.5 h-3/4 bg-pink-400 animate-pulse delay-150" />
              </span>
            )}
          </div>
          <p className="text-xs font-medium text-pink-100 truncate">{songName}</p>
        </div>

        {/* Expand / Options toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1.5 rounded-full hover:bg-white/10 text-pink-300"
          title="Music options"
        >
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
