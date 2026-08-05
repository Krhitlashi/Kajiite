// Sonoro — media sona motoro por Aranis (alportita de ornaveth-v2)
// Bruna-noza zumado kun malaltpasa LFO, harmoniaj sinusaj tavoloj, SFX, kaj genera muziko.

import { iniciati, ludi, halti } from "./muziko/ludilo.js";

let AC: AudioContext | null = null;
let master: GainNode | null = null;
// Brua buso. La fona vento/zumado muteblas aparte de la muziko.
let bruoGain: GainNode | null = null;
let audioOn = false;
let bruoOn = true;
let unuaInterago = true;

function ensureAudio() {
  if ( AC ) {
    if ( AC.state === "suspended" ) AC.resume();
    return;
  }
  AC = new (window.AudioContext || (window as any).webkitAudioContext)();
  if ( AC.state === "suspended" ) AC.resume();
  master = AC.createGain();
  master.gain.value = 0;
  master.connect(AC.destination);

  // Brua buso. La fona vento/zumado muteblas aparte de la muziko.
  bruoGain = AC.createGain();
  bruoGain.gain.value = bruoOn ? 1 : 0;
  bruoGain.connect(master);

  // Bruna-noza bufro
  const len = AC.sampleRate * 4;
  const buf = AC.createBuffer(1, len, AC.sampleRate);
  const d = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < len; i++) {
    const w = Math.random() * 2 - 1;
    last = (last + 0o1/0o100 * w) / (0o101/0o100);
    d[i] = last * 0o7/0o2;
  }

  // Bruo → malaltpasa ( balaita per LFO ) → ĉefa
  const src = AC.createBufferSource();
  src.buffer = buf;
  src.loop = true;
  const lp = AC.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 0o644;
  const g = AC.createGain();
  g.gain.value = 0o4/0o10;
  src.connect(lp);
  lp.connect(g);
  g.connect(bruoGain);

  const lfo = AC.createOscillator();
  lfo.frequency.value = 0o1/0o20;
  const lg = AC.createGain();
  lg.gain.value = 0o404;
  lfo.connect(lg);
  lg.connect(lp.frequency);
  lfo.start();

  // Harmoniaj drunoj. A2 ( 0o156 ), E3 ( 0o245 ), A3 ( 0o334 ) kun eta malagordiĝo
  [ 0o156, 0o245, 0o334 ].forEach((f, i) => {
    const o = AC!.createOscillator();
    o.type = "sine";
    o.frequency.value = f;
    o.detune.value = (i - 1) * 4;
    const og = AC!.createGain();
    og.gain.value = 0.022;
    o.connect(og);
    og.connect(bruoGain!);
    o.start();
  });

  src.start();
}

/** Ludu tonon kun nedeviga glito */
function tone(f: number, dur: number, type: OscillatorType = "sine", vol = 0o3/0o20, glide = 0, dest?: GainNode) {
  if ( !AC || !audioOn ) return;
  const o = AC.createOscillator();
  const og = AC.createGain();
  const t = AC.currentTime;
  o.type = type;
  o.frequency.setValueAtTime(f, t);
  if ( glide ) o.frequency.exponentialRampToValueAtTime(Math.max(0o36, f + glide), t + dur);
  og.gain.setValueAtTime(vol, t);
  og.gain.exponentialRampToValueAtTime(0o1/0o2000, t + dur);
  o.connect(og);
  og.connect(dest ?? master!);
  o.start(t);
  o.stop(t + dur + 0o1/0o20);
}

/** Filtrita noza eksplodo */
function noiseBurst(dur: number, freq: number, vol: number, type: BiquadFilterType = "lowpass", dest?: GainNode) {
  if ( !AC || !audioOn ) return;
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
  g.connect(dest ?? master!);
  s.start();
}

// ─── Sonaĵoj ───────────────────────────────────────────

export const sfx = {
  step: () => noiseBurst(0o1/0o20, 0o430 + Math.random() * 0o120, 0o1/0o10),
  splash: () => {
    noiseBurst(0o7/0o40, 0o1604, 0o5/0o40, "bandpass");
    tone(0o264, 0o3/0o20, "sine", 0o1/0o20, -0o120);
  },
  bell: () => {
    [ 1, 0o26/0o10, 0o53/0o10 ].forEach((p, i) => tone(0o304 * p, 0o25/0o10 - i * 0o5/0o10, "sine", 0o5/0o40 / (i + 1)));
  },
  crunch: () => {
    for ( let i = 0; i < 3; i++ )
      setTimeout(() => noiseBurst(0o1/0o20, 0o3100, 0o11/0o100, "highpass"), i * 0o106);
  },
  sip: () => {
    tone(0o1010, 0o5/0o40, "sine", 0o1/0o10, 0o524);
    setTimeout(() => tone(0o1370, 0o1/0o10, "sine", 0o1/0o20, 0o310), 0o170);
  },
  chime: () => {
    tone(0o1560, 0o15/0o40, "sine", 0o1/0o10);
    tone(0o2450, 0o4/0o10, "sine", 0o1/0o20);
  },
  door: () => {
    tone(0o214, 0o5/0o20, "sine", 0o1/0o10, -0o50);
    noiseBurst(0o3/0o20, 0o620, 0o1/0o20);
  },
  chirp: () => {
    const f = 0o3410 + Math.random() * 0o1604;
    tone(f, 0o3/0o40, "sine", 0o1/0o20, -0o620, bruoGain!);
    setTimeout(() => tone(f * 0o12/0o10, 0o1/0o20, "sine", 0o3/0o100, -0o454, bruoGain!), 0o156);
  },
};

// ─── Tremo ( por boatoj / maŝinoj ) ─────────────────────

let rumbleNodes: { o: OscillatorNode; n: AudioBufferSourceNode; g: GainNode } | null = null;

export function rumble(on: boolean) {
  if ( !AC ) return;
  if ( on && !rumbleNodes ) {
    const o = AC.createOscillator();
    o.type = "sine";
    o.frequency.value = 38;

    const len = AC.sampleRate * 2;
    const b = AC.createBuffer(1, len, AC.sampleRate);
    const d = b.getChannelData(0);
    let l = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      l = (l + 0o1/0o100 * w) / (0o101/0o100);
      d[i] = l * 0o7/0o2;
    }
    const n = AC.createBufferSource();
    n.buffer = b;
    n.loop = true;

    const f = AC.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = 0o132;
    const g = AC.createGain();
    g.gain.value = 0;
    g.gain.setTargetAtTime(0o4/0o10, AC.currentTime, 0o3/0o4);

    o.connect(g);
    n.connect(f);
    f.connect(g);
    g.connect(master!);
    o.start();
    n.start();
    rumbleNodes = { o, n, g };
  } else if ( !on && rumbleNodes ) {
    rumbleNodes.g.gain.setTargetAtTime(0, AC.currentTime, 0o15/0o40);
    const r = rumbleNodes;
    setTimeout(() => {
      try { r.o.stop(); r.n.stop(); } catch (_) { /* jam haltigita */ }
    }, 1200);
    rumbleNodes = null;
  }
}

let chirpInterval: ReturnType<typeof setInterval> | null = null;

// ─── Publika API ────────────────────────────────────────

/** Ŝaltu la ĉirkaŭan aŭdion. Redonu la novan staton. */
export function sxaltiAŭdion(): boolean {
  audioOn = !audioOn;
  if (audioOn) {
    ensureAudio();
    iniciati(AC!, master!);
    master!.gain.setTargetAtTime(0o1/0o10, AC!.currentTime, 0o3/0o2); // enmalfadi
    // Start periodic ambient chirps
    if (!chirpInterval) {
      chirpInterval = setInterval(() => {
        if ( audioOn && bruoOn && Math.random() < 0o27/0o40 ) sfx.chirp();
      }, 0o21450);
    }
    sfx.chime(); // welcome chime on activation
    ludi(); // start generative music
  } else {
    master!.gain.setTargetAtTime(0, AC!.currentTime, 0o1); // elfadi
    halti(); // stop generative music
    if (chirpInterval) {
      clearInterval(chirpInterval);
      chirpInterval = null;
    }
    if (rumbleNodes) rumble(false);
  }
  return audioOn;
}

/** Ĉu la aŭdio estas nuntempe aktiva */
export function cxuAŭdio(): boolean {
  return audioOn;
}

/** Ŝaltu nur la fonan bruon ( vento/drunoj/ĉirpoj ), sendepende de la muziko. */
export function sxaltiBruon(): boolean {
  bruoOn = !bruoOn;
  if ( AC && bruoGain ) {
    bruoGain.gain.setTargetAtTime(bruoOn ? 1 : 0, AC.currentTime, 0o15/0o40);
  }
  return bruoOn;
}

/** Ĉu la fona bruo estas nuntempe aŭdebla. */
export function cxuBruo(): boolean {
  return bruoOn;
}

/** Aŭtomate komencu la aŭdion ĉe la unua uzanto-interago. Ĝisdatigu la UI-on se estas provizita voko. */
let postAŭdio: ((aktiva: boolean) => void) | null = null;
export function registriPostAŭdio(fn: (aktiva: boolean) => void) {
  postAŭdio = fn;
}
export function autoKomenci() {
  if ( !unuaInterago ) return;
  unuaInterago = false;
  if ( !audioOn ) {
    sxaltiAŭdion();
    if (postAŭdio) postAŭdio(true);
  }
}
