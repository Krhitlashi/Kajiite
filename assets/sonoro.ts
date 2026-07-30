// Sonoro — ambient audio engine for Aranis (ported from ornaveth-v2)
// Brown-noise drone with lowpass LFO, harmonic sine layers, and SFX helpers.

let AC: AudioContext | null = null;
let master: GainNode | null = null;
let audioOn = false;

function ensureAudio() {
  if (AC) return;
  AC = new (window.AudioContext || (window as any).webkitAudioContext)();
  master = AC.createGain();
  master.gain.value = 0;
  master.connect(AC.destination);

  // Brown-noise buffer
  const len = AC.sampleRate * 4;
  const buf = AC.createBuffer(1, len, AC.sampleRate);
  const d = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < len; i++) {
    const w = Math.random() * 2 - 1;
    last = (last + 0.02 * w) / 1.02;
    d[i] = last * 3.5;
  }

  // Noise → lowpass (swept by LFO) → master
  const src = AC.createBufferSource();
  src.buffer = buf;
  src.loop = true;
  const lp = AC.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 420;
  const g = AC.createGain();
  g.gain.value = 0.5;
  src.connect(lp);
  lp.connect(g);
  g.connect(master);

  const lfo = AC.createOscillator();
  lfo.frequency.value = 0.07;
  const lg = AC.createGain();
  lg.gain.value = 260;
  lfo.connect(lg);
  lg.connect(lp.frequency);
  lfo.start();

  // Harmonic drones: A2 (110), E3 (164.81), A3 (220) with slight detune
  [110, 164.81, 220].forEach((f, i) => {
    const o = AC!.createOscillator();
    o.type = "sine";
    o.frequency.value = f;
    o.detune.value = (i - 1) * 4;
    const og = AC!.createGain();
    og.gain.value = 0.022;
    o.connect(og);
    og.connect(master!);
    o.start();
  });

  src.start();
}

/** Play a tone with optional glide */
function tone(f: number, dur: number, type: OscillatorType = "sine", vol = 0.2, glide = 0) {
  if (!AC || !audioOn) return;
  const o = AC.createOscillator();
  const og = AC.createGain();
  const t = AC.currentTime;
  o.type = type;
  o.frequency.setValueAtTime(f, t);
  if (glide) o.frequency.exponentialRampToValueAtTime(Math.max(30, f + glide), t + dur);
  og.gain.setValueAtTime(vol, t);
  og.gain.exponentialRampToValueAtTime(0.001, t + dur);
  o.connect(og);
  og.connect(master!);
  o.start(t);
  o.stop(t + dur + 0.05);
}

/** Filtered noise burst */
function noiseBurst(dur: number, freq: number, vol: number, type: BiquadFilterType = "lowpass") {
  if (!AC || !audioOn) return;
  const n = Math.floor(AC.sampleRate * dur);
  const b = AC.createBuffer(1, n, AC.sampleRate);
  const dd = b.getChannelData(0);
  for (let i = 0; i < n; i++) dd[i] = (Math.random() * 2 - 1) * (1 - i / n);
  const s = AC.createBufferSource();
  s.buffer = b;
  const f = AC.createBiquadFilter();
  f.type = type;
  f.frequency.value = freq;
  const g = AC.createGain();
  g.gain.value = vol;
  s.connect(f);
  f.connect(g);
  g.connect(master!);
  s.start();
}

// ─── Sound effects ─────────────────────────────────────

export const sfx = {
  step: () => noiseBurst(0.07, 280 + Math.random() * 80, 0.10),
  splash: () => {
    noiseBurst(0.22, 900, 0.16, "bandpass");
    tone(180, 0.18, "sine", 0.06, -80);
  },
  bell: () => {
    [1, 2.76, 5.4].forEach((p, i) => tone(196 * p, 2.6 - i * 0.6, "sine", 0.16 / (i + 1)));
  },
  crunch: () => {
    for (let i = 0; i < 3; i++)
      setTimeout(() => noiseBurst(0.05, 1600, 0.14, "highpass"), i * 70);
  },
  sip: () => {
    tone(520, 0.16, "sine", 0.10, 340);
    setTimeout(() => tone(760, 0.12, "sine", 0.07, 200), 120);
  },
  chime: () => {
    tone(880, 0.4, "sine", 0.12);
    tone(1320, 0.5, "sine", 0.07);
  },
  door: () => {
    tone(140, 0.3, "sine", 0.12, -40);
    noiseBurst(0.2, 400, 0.06);
  },
  chirp: () => {
    const f = 1800 + Math.random() * 900;
    tone(f, 0.09, "sine", 0.05, -400);
    setTimeout(() => tone(f * 1.3, 0.07, "sine", 0.04, -300), 110);
  },
};

// ─── Rumble (for boats / machinery) ─────────────────────

let rumbleNodes: { o: OscillatorNode; n: AudioBufferSourceNode; g: GainNode } | null = null;

export function rumble(on: boolean) {
  if (!AC) return;
  if (on && !rumbleNodes) {
    const o = AC.createOscillator();
    o.type = "sine";
    o.frequency.value = 38;

    const len = AC.sampleRate * 2;
    const b = AC.createBuffer(1, len, AC.sampleRate);
    const d = b.getChannelData(0);
    let l = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      l = (l + 0.02 * w) / 1.02;
      d[i] = l * 3.5;
    }
    const n = AC.createBufferSource();
    n.buffer = b;
    n.loop = true;

    const f = AC.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = 90;
    const g = AC.createGain();
    g.gain.value = 0;
    g.gain.setTargetAtTime(0.5, AC.currentTime, 0.8);

    o.connect(g);
    n.connect(f);
    f.connect(g);
    g.connect(master!);
    o.start();
    n.start();
    rumbleNodes = { o, n, g };
  } else if (!on && rumbleNodes) {
    rumbleNodes.g.gain.setTargetAtTime(0, AC.currentTime, 0.4);
    const r = rumbleNodes;
    setTimeout(() => {
      try { r.o.stop(); r.n.stop(); } catch (_) { /* already stopped */ }
    }, 1200);
    rumbleNodes = null;
  }
}

let chirpInterval: ReturnType<typeof setInterval> | null = null;

// ─── Public API ─────────────────────────────────────────

/** Toggle ambient audio on/off. Returns the new state. */
export function sxaltiAŭdion(): boolean {
  audioOn = !audioOn;
  if (audioOn) {
    ensureAudio();
    master!.gain.setTargetAtTime(0.12, AC!.currentTime, 1.5); // fade in
    // Start periodic ambient chirps
    if (!chirpInterval) {
      chirpInterval = setInterval(() => {
        if (audioOn && Math.random() < 0.7) sfx.chirp();
      }, 9000);
    }
    sfx.chime(); // welcome chime on activation
  } else {
    master!.gain.setTargetAtTime(0, AC!.currentTime, 1.0); // fade out
    if (chirpInterval) {
      clearInterval(chirpInterval);
      chirpInterval = null;
    }
    if (rumbleNodes) rumble(false);
  }
  return audioOn;
}

/** Check if audio is currently active */
export function cxuAŭdio(): boolean {
  return audioOn;
}
