/**
 * Romantic Audio Engine
 * Supports:
 * 1. Web Audio API synthesized romantic ambient piano/rhodes chords & chime sparkles (no external file needed, 100% reliable)
 * 2. Custom MP3 audio playback if supplied in public/audio/romantic.mp3 or uploaded by user
 * 3. Chime and sparkle sound effects on interaction
 */
import { BIRTHDAY_DATA } from '../data/birthday';

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private intervalId: number | null = null;
  private customAudio: HTMLAudioElement | null = null;
  private customAudioUrl: string | null = BIRTHDAY_DATA.audio?.url || null;

  private chordProgression = [
    [261.63, 329.63, 392.00, 493.88], // Cmaj7 (C4, E4, G4, B4)
    [220.00, 261.63, 329.63, 392.00], // Am7 (A3, C4, E4, G4)
    [174.61, 220.00, 261.63, 329.63], // Fmaj7 (F3, A3, C4, E4)
    [196.00, 246.94, 293.66, 392.00], // G6 (G3, B3, D4, G4)
  ];
  private chordIndex = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setCustomAudio(url: string) {
    this.customAudioUrl = url;
    if (this.customAudio) {
      this.customAudio.pause();
      this.customAudio.src = url;
      if (this.isPlaying) {
        this.customAudio.play().catch(console.error);
      }
    }
  }

  public start() {
    this.isPlaying = true;
    this.initContext();

    if (this.customAudioUrl) {
      if (!this.customAudio) {
        this.customAudio = new Audio(this.customAudioUrl);
        this.customAudio.loop = true;
      }
      this.customAudio.play().catch(() => {
        // Fallback to synth if custom audio fails
        this.startAmbientSynth();
      });
      return;
    }

    this.startAmbientSynth();
  }

  public stop() {
    this.isPlaying = false;
    if (this.customAudio) {
      this.customAudio.pause();
    }
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private startAmbientSynth() {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
    }
    this.playChord();
    this.intervalId = window.setInterval(() => {
      this.playChord();
    }, 4500);
  }

  private playChord() {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;
    const chord = this.chordProgression[this.chordIndex];
    this.chordIndex = (this.chordIndex + 1) % this.chordProgression.length;

    const now = this.ctx.currentTime;

    // Play chord tones with soft attack and long gentle release
    chord.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      // Soft sine + triangle blend
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.15);

      noteGain.gain.setValueAtTime(0.0001, now + idx * 0.15);
      noteGain.gain.exponentialRampToValueAtTime(0.12 / chord.length, now + idx * 0.15 + 0.8);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.15 + 4.2);

      osc.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc.start(now + idx * 0.15);
      osc.stop(now + idx * 0.15 + 4.3);
    });

    // Random gentle sparkle chime
    if (Math.random() > 0.4) {
      this.playSparkle(now + 2.0);
    }
  }

  public playSparkle(when?: number) {
    if (!this.ctx || !this.masterGain) return;
    const t = when || this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();

    osc.type = 'sine';
    const freqs = [880, 1046.5, 1318.5, 1567.98, 1760];
    const chosenFreq = freqs[Math.floor(Math.random() * freqs.length)];
    osc.frequency.setValueAtTime(chosenFreq, t);

    g.gain.setValueAtTime(0.001, t);
    g.gain.exponentialRampToValueAtTime(0.06, t + 0.05);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);

    osc.connect(g);
    g.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 1.25);
  }

  public playCelebrationChime() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    notes.forEach((freq, i) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.12);

      gain.gain.setValueAtTime(0.0001, now + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.15, now + i * 0.12 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.12 + 2.5);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + i * 0.12);
      osc.stop(now + i * 0.12 + 2.6);
    });
  }
}

export const romanticAudio = new RomanticAudioEngine();
