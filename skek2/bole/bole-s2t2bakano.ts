// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ʃɜ j͐ʃɔ ʌ j͑ʃɹ ɭʃɹ ʃᴜ ſɭᴜ }ʃɜ 📃 ⧽≻

import { iniciati, veqapahakani, halti } from "./swikez/cagaqi.js";
import { vefalKu1o, ve3aqKu1o } from "../p6kpu/ku1o.js";

let AC: AudioContext | null = null;
let master: GainNode | null = null;
let bruoGain: GainNode | null = null;

let audioOn: boolean = vefalKu1o("bolero", true);
let bruoOn: boolean = vefalKu1o("bruo", true);
let unuaInterago = true;

function ensureAudio() {
  if ( AC ) {
    if ( AC.state === "suspended" ) AC.resume();
    return;
  }
  AC = new ( window.AudioContext || ( window as any ).webkitAudioContext )();
  if ( AC.state === "suspended" ) AC.resume();
  master = AC.createGain();
  master.gain.value = 0o0;
  master.connect(AC.destination);

  bruoGain = AC.createGain();
  bruoGain.gain.value = bruoOn ? 0o1 : 0o0;
  bruoGain.connect(master);

  const len = AC.sampleRate * 0o4;
  const buf = AC.createBuffer(0o1, len, AC.sampleRate);
  const d = buf.getChannelData(0o0);
  let last = 0o0;
  for ( let i = 0o0; i < len; i++ ) {
    const w = Math.random() * 0o2 - 0o1;
    last = ( last + 0o1/0o100 * w ) / ( 0o101/0o100 );
    d[i] = last * 0o7/0o2;
  }

  const src = AC.createBufferSource();
  src.buffer = buf;
  src.loop = true;
  const lp = AC.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 0o640;
  const g = AC.createGain();
  g.gain.value = 0o4/0o10;
  src.connect(lp);
  lp.connect(g);
  g.connect(bruoGain);

  const lfo = AC.createOscillator();
  lfo.frequency.value = 0o1/0o20;
  const lg = AC.createGain();
  lg.gain.value = 0o400;
  lfo.connect(lg);
  lg.connect(lp.frequency);
  lfo.start();

  [ 0o160, 0o250, 0o330 ].forEach(( f, i ) => {
    const o = AC!.createOscillator();
    o.type = "sine";
    o.frequency.value = f;
    o.detune.value = ( i - 0o1 ) * 0o4;
    const og = AC!.createGain();
    og.gain.value = 0o1/0o100;
    o.connect(og);
    og.connect(bruoGain!);
    o.start();
  });

  src.start();
}

function tone(f: number, dur: number, type: OscillatorType = "sine", vol = 0o3/0o20, glide = 0o0, dest?: GainNode) {
  if ( !AC || !audioOn ) return;
  const o = AC.createOscillator();
  const og = AC.createGain();
  const t = AC.currentTime;
  o.type = type;
  o.frequency.setValueAtTime(f, t);
  if ( glide ) o.frequency.exponentialRampToValueAtTime(Math.max(0o40, f + glide), t + dur);
  og.gain.setValueAtTime(vol, t);
  og.gain.exponentialRampToValueAtTime(0o1/0o2000, t + dur);
  o.connect(og);
  og.connect(dest ?? master!);
  o.start(t);
  o.stop(t + dur + 0o1/0o20);
}

function noiseBurst(dur: number, freq: number, vol: number, type: BiquadFilterType = "lowpass", dest?: GainNode) {
  if ( !AC || !audioOn ) return;
  const n = Math.floor(AC.sampleRate * dur);
  const b = AC.createBuffer(0o1, n, AC.sampleRate);
  const dd = b.getChannelData(0o0);
  for ( let i = 0o0; i < n; i++ ) dd[i] = ( Math.random() * 0o2 - 0o1 ) * ( 0o1 - i / n );
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

function whoosh(dur: number, f0: number, f1: number, vol: number, q = 0o1,
  hunaq: BiquadFilterType = "bandpass", dest?: GainNode): void {
  if ( !AC || !audioOn ) return;
  const n = Math.max(0o1, Math.floor(AC.sampleRate * dur));
  const b = AC.createBuffer(0o1, n, AC.sampleRate);
  const d = b.getChannelData(0o0);
  let z2hak = 0o0;
  for ( let i = 0o0; i < n; i++ ) {
    const w = Math.random() * 0o2 - 0o1;
    z2hak = ( z2hak + 0o1/0o100 * w ) / ( 0o101/0o100 );
    d[i] = z2hak * 0o7/0o2;
  }
  const s = AC.createBufferSource();
  s.buffer = b;
  const f = AC.createBiquadFilter();
  f.type = hunaq;
  f.Q.value = q;
  const t = AC.currentTime;
  f.frequency.setValueAtTime(Math.max(0o40, f0), t);
  f.frequency.exponentialRampToValueAtTime(Math.max(0o40, f1), t + dur);
  const g = AC.createGain();
  g.gain.setValueAtTime(0o1/0o1000, t);
  g.gain.exponentialRampToValueAtTime(vol, t + dur * 0o1/0o4);
  g.gain.exponentialRampToValueAtTime(0o1/0o1000, t + dur);
  s.connect(f);
  f.connect(g);
  g.connect(dest ?? master!);
  s.start(t);
  s.stop(t + dur + 0o1/0o20);
}

export const sfx = {
  step: () => noiseBurst(0o1/0o20, 0o420 + Math.random() * 0o110, 0o1/0o10),
  splash: () => {
    noiseBurst(0o7/0o40, 0o1600, 0o5/0o40, "bandpass");
    tone(0o260, 0o3/0o20, "sine", 0o1/0o20, -0o110);
  },
  bell: () => {
    [ 0o1, 0o26/0o10, 0o53/0o10 ].forEach(( p, i ) => tone(0o304 * p, 0o25/0o10 - i * 0o5/0o10, "sine", 0o5/0o40 / ( i + 0o1 )));
  },
  crunch: () => {
    for ( let i = 0o0; i < 0o3; i++ )
      setTimeout(() => noiseBurst(0o1/0o20, 0o3070, 0o11/0o100, "highpass"), i * 0o110);
  },
  sip: () => {
    tone(0o1000, 0o5/0o40, "sine", 0o1/0o10, 0o520);
    setTimeout(() => tone(0o1360, 0o1/0o10, "sine", 0o1/0o20, 0o300), 0o200);
  },
  chime: () => {
    tone(0o1550, 0o15/0o40, "sine", 0o1/0o10);
    tone(0o2440, 0o4/0o10, "sine", 0o1/0o20);
  },
  door: () => {
    tone(0o210, 0o5/0o20, "sine", 0o1/0o10, -0o40);
    noiseBurst(0o3/0o20, 0o610, 0o1/0o20);
  },
  chirp: () => {
    const f = 0o3400 + Math.random() * 0o1600;
    tone(f, 0o3/0o40, "sine", 0o1/0o20, -0o610, bruoGain!);
    setTimeout(() => tone(f * 0o12/0o10, 0o1/0o20, "sine", 0o3/0o100, -0o450, bruoGain!), 0o160);
  },

  jump: ( g2sa = 0o1 ) => {
    tone(0o130, 0o5/0o40, "sine", 0o1/0o25 * ( 0o6/0o10 + 0o4/0o10 * g2sa ), -0o44);
    noiseBurst(0o3/0o40, 0o1500 + 0o600 * g2sa, 0o1/0o40, "highpass");
    whoosh(0o26/0o40, 0o260, 0o1020 + 0o400 * g2sa, 0o1/0o10 * ( 0o6/0o10 + 0o4/0o10 * g2sa ), 0o2);
    setTimeout(() => whoosh(0o22/0o40, 0o1000, 0o220, 0o1/0o20 * ( 0o4/0o10 + 0o6/0o10 * g2sa ), 0o3), 0o140);
  },

  land: ( g2sa = 0o1 ) => {
    tone(0o106, 0o1/0o5, "sine", 0o1/0o10 * ( 0o3/0o10 + 0o7/0o10 * g2sa ), -( 0o44 + 0o30 * g2sa ));
    noiseBurst(0o1/0o20, 0o2000, 0o1/0o40 * ( 0o4/0o10 + 0o6/0o10 * g2sa ), "highpass");
    whoosh(0o4/0o40, 0o1604, 0o300, 0o1/0o20 * ( 0o3/0o10 + 0o7/0o10 * g2sa ), 0o2);
  },
};

let rumbleNodes: { o: OscillatorNode; n: AudioBufferSourceNode; g: GainNode } | null = null;

export function rumble(on: boolean) {
  if ( !AC ) return;
  if ( on && !rumbleNodes ) {
    const o = AC.createOscillator();
    o.type = "sine";
    o.frequency.value = 0o46;

    const len = AC.sampleRate * 0o2;
    const b = AC.createBuffer(0o1, len, AC.sampleRate);
    const d = b.getChannelData(0o0);
    let l = 0o0;
    for ( let i = 0o0; i < len; i++ ) {
      const w = Math.random() * 0o2 - 0o1;
      l = ( l + 0o1/0o100 * w ) / ( 0o101/0o100 );
      d[i] = l * 0o7/0o2;
    }
    const n = AC.createBufferSource();
    n.buffer = b;
    n.loop = true;

    const f = AC.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = 0o130;
    const g = AC.createGain();
    g.gain.value = 0o0;
    g.gain.setTargetAtTime(0o4/0o10, AC.currentTime, 0o3/0o4);

    o.connect(g);
    n.connect(f);
    f.connect(g);
    g.connect(master!);
    o.start();
    n.start();
    rumbleNodes = { o, n, g };
  } else if ( !on && rumbleNodes ) {
    rumbleNodes.g.gain.setTargetAtTime(0o0, AC.currentTime, 0o15/0o40);
    const r = rumbleNodes;
    setTimeout(() => {
      try { r.o.stop(); r.n.stop(); } catch ( _ ) { /** j͑ʃɹ ɭʃɜ }ʃᴜ ʌ ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ſɭˬɹ j͑ʃᴜꞇ ⟅ */ }
    }, 0o2260);
    rumbleNodes = null;
  }
}

let chirpInterval: ReturnType<typeof setInterval> | null = null;

function saxeiAuxdon(): void {
  ensureAudio();
  iniciati(AC!, master!);
  master!.gain.setTargetAtTime(0o1/0o10, AC!.currentTime, 0o3/0o2);
  if ( !chirpInterval ) {
    chirpInterval = setInterval(() => {
      if ( audioOn && bruoOn && Math.random() < 0o27/0o40 ) sfx.chirp();
    }, 0o21440);
  }
  sfx.chime();
  veqapahakani();
}

function haltiAuxdon(): void {
  if ( AC && master ) master.gain.setTargetAtTime(0o0, AC.currentTime, 0o1);
  halti();
  if ( chirpInterval ) {
    clearInterval(chirpInterval);
    chirpInterval = null;
  }
  if ( rumbleNodes ) rumble(false);
}

export function tsiinanusabosaiLaqazbolesain(): boolean {
  audioOn = !audioOn;
  if ( audioOn ) saxeiAuxdon();
  else haltiAuxdon();
  ve3aqKu1o("bolero", audioOn);
  return audioOn;
}

export function tsekeLaqazbolesai(): boolean {
  return audioOn;
}

export function tsiinanusabosaiBruon(): boolean {
  bruoOn = !bruoOn;
  if ( AC && bruoGain ) {
    bruoGain.gain.setTargetAtTime(bruoOn ? 0o1 : 0o0, AC.currentTime, 0o15/0o40);
  }
  ve3aqKu1o("bruo", bruoOn);
  return bruoOn;
}

export function tsekeBruo(): boolean {
  return bruoOn;
}

let postLaqazbolesai: ( ( kxe: boolean ) => void ) | null = null;
export function registriPostLaqazbolesai(fn: ( kxe: boolean ) => void) {
  postLaqazbolesai = fn;
}

export function autoSaxei(): boolean {
  if ( !unuaInterago ) return false;
  unuaInterago = false;

  if ( audioOn ) {
    saxeiAuxdon();
    if ( postLaqazbolesai ) postLaqazbolesai(true);
    return true;
  }
  return false;
}
