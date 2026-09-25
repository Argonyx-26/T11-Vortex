class SoundFX {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this._unlocked = false;
    this._setupAutoUnlock();
  }

  _setupAutoUnlock() {
    if (typeof window === 'undefined') return;
    const unlock = () => {
      this.init();
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      this._unlocked = true;
    };
    ['pointerdown', 'mousedown', 'keydown', 'touchstart', 'mousemove', 'scroll', 'click'].forEach(evt => {
      window.addEventListener(evt, unlock, { once: true, passive: true });
    });
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  playTone(freq, type = 'sine', duration = 0.1, gainVal = 0.08) {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  playClick() {
    this.playTone(1200, 'triangle', 0.04, 0.05);
  }

  playScan() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(980, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch {}
  }

  playNormal() {
    // Pleasant double harmonic chime for authorized clearance
    this.playTone(659.25, 'sine', 0.18, 0.07); // E5
    setTimeout(() => {
      this.playTone(880, 'sine', 0.28, 0.06); // A5
    }, 90);
  }

  playSuspicious() {
    // Amber double alert pip
    this.playTone(550, 'sawtooth', 0.12, 0.06);
    setTimeout(() => {
      this.playTone(480, 'sawtooth', 0.18, 0.07);
    }, 120);
  }

  playCritical() {
    // High-urgency military siren sweep
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.linearRampToValueAtTime(440, now + 0.25);
      osc.frequency.linearRampToValueAtTime(880, now + 0.5);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.55);
    } catch {}
  }

  playAlarmClock(durationSec = 3.0) {
    // Authentic digital alarm clock buzzer sound effect for exactly durationSec (default 3 seconds)
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().then(() => {
          this._renderAlarmBeeps(durationSec);
        }).catch(() => {
          this._renderAlarmBeeps(durationSec);
        });
        return;
      }
      this._renderAlarmBeeps(durationSec);
    } catch (e) {
      console.warn('Alarm clock trigger error:', e);
    }
  }

  _renderAlarmBeeps(durationSec = 3.0) {
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const endTime = now + durationSec;

      // Authentic Digital Alarm Clock: Urgent repeating 4-beep sequence
      // Beep: 75ms active, 55ms silence between each of the 4 beeps
      // Followed by 180ms cycle pause before next burst, repeating for exactly durationSec
      const beepDuration = 0.075;
      const beepGap = 0.055;
      const cycleBeeps = 4;
      const cyclePause = 0.18;

      let t = now;
      while (t < endTime) {
        for (let i = 0; i < cycleBeeps; i++) {
          if (t >= endTime) break;
          const actualDuration = Math.min(beepDuration, endTime - t);
          if (actualDuration <= 0.015) break;

          // 1. Primary piercing piezo square wave (classic alarm clock 2048 Hz)
          const osc1 = this.ctx.createOscillator();
          const gain1 = this.ctx.createGain();
          osc1.type = 'square';
          osc1.frequency.setValueAtTime(2048, t);

          gain1.gain.setValueAtTime(0, t);
          gain1.gain.linearRampToValueAtTime(0.22, t + 0.006);
          gain1.gain.setValueAtTime(0.22, t + actualDuration - 0.008);
          gain1.gain.linearRampToValueAtTime(0.0001, t + actualDuration);

          osc1.connect(gain1);
          gain1.connect(this.ctx.destination);
          osc1.start(t);
          osc1.stop(t + actualDuration);

          // 2. Harmonic sub-octave resonator (1024 Hz)
          const osc2 = this.ctx.createOscillator();
          const gain2 = this.ctx.createGain();
          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(1024, t);

          gain2.gain.setValueAtTime(0, t);
          gain2.gain.linearRampToValueAtTime(0.14, t + 0.006);
          gain2.gain.setValueAtTime(0.14, t + actualDuration - 0.008);
          gain2.gain.linearRampToValueAtTime(0.0001, t + actualDuration);

          osc2.connect(gain2);
          gain2.connect(this.ctx.destination);
          osc2.start(t);
          osc2.stop(t + actualDuration);

          // 3. High overtone ping (4096 Hz) for crisp alarm clock edge
          const osc3 = this.ctx.createOscillator();
          const gain3 = this.ctx.createGain();
          osc3.type = 'triangle';
          osc3.frequency.setValueAtTime(4096, t);

          gain3.gain.setValueAtTime(0, t);
          gain3.gain.linearRampToValueAtTime(0.08, t + 0.004);
          gain3.gain.setValueAtTime(0.08, t + actualDuration - 0.006);
          gain3.gain.linearRampToValueAtTime(0.0001, t + actualDuration);

          osc3.connect(gain3);
          gain3.connect(this.ctx.destination);
          osc3.start(t);
          osc3.stop(t + actualDuration);

          t += beepDuration + beepGap;
        }
        t += cyclePause;
      }
    } catch (err) {
      console.warn('Alarm clock audio playback error:', err);
    }
  }
}

export const soundFx = new SoundFX();
