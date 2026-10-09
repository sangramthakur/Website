/**
 * Synthesized Micro-Soundscape Engine for Award-Winning UX
 * Uses the Web Audio API to produce subtle, tactile micro-clicks, soft pops,
 * and delicate harmonic chimes without requiring any external mp3/wav assets.
 * 
 * Disabled by default to respect user silence; enabled via the Sound toggle
 * in Header / Jury Mode.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = false;
  private volume: number = 0.2;

  constructor() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('site_audio_feedback');
      this.isEnabled = stored === 'true';
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public getEnabled(): boolean {
    return this.isEnabled;
  }

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('site_audio_feedback', enabled ? 'true' : 'false');
    }
    if (enabled) {
      this.initContext();
      this.playChime(580, 'sine', 0.1, 0.08);
    }
  }

  public toggle(): boolean {
    const nextState = !this.isEnabled;
    this.setEnabled(nextState);
    return nextState;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  public getVolume(): number {
    return this.volume;
  }

  /**
   * Crisp, tactile micro-click (like a mechanical switch or Leica shutter)
   */
  public playClick() {
    if (!this.isEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, t);
      osc.frequency.exponentialRampToValueAtTime(320, t + 0.025);

      gain.gain.setValueAtTime(this.volume * 0.35, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.035);
    } catch {
      // AudioContext could be blocked or busy
    }
  }

  /**
   * Delicate high-frequency tick for tabs / hovering
   */
  public playHover() {
    if (!this.isEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(2400, t);
      osc.frequency.exponentialRampToValueAtTime(1800, t + 0.012);

      gain.gain.setValueAtTime(this.volume * 0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.015);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.02);
    } catch {
      // safe fallback
    }
  }

  /**
   * Elegant harmonic chord for affirmative actions (modal open, submit, chapter switch)
   */
  public playChime(rootFreq = 440, type: OscillatorType = 'sine', duration = 0.22, level = 0.2) {
    if (!this.isEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const freqs = [rootFreq, rootFreq * 1.25, rootFreq * 1.5]; // major triad

      freqs.forEach((f, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(f, t + idx * 0.02);

        const currentVol = this.volume * level * (1 - idx * 0.25);
        gain.gain.setValueAtTime(currentVol, t + idx * 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t + idx * 0.02);
        osc.stop(t + duration + 0.05);
      });
    } catch {
      // safe fallback
    }
  }

  /**
   * Low-frequency subtle tactile thump (drawer toggle, mode switch)
   */
  public playThump() {
    if (!this.isEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, t);
      osc.frequency.exponentialRampToValueAtTime(60, t + 0.045);

      gain.gain.setValueAtTime(this.volume * 0.4, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.06);
    } catch {
      // safe fallback
    }
  }
}

export const soundEngine = new SoundEngine();
