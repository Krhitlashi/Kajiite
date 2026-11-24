// ≺⧼ ʃɜ j͐ʃɔ 🔊 ⧽≻

import { iniciati, ludi, halti } from "./muziko/ludilo.js";
import { vefalKu1o, ve3aqKu1o } from "../komunajxoj/agordoj.js";

let AC: AudioContext | null = null;
let master: GainNode | null = null;
let bruoGain: GainNode | null = null;
// ⟨ ʃɜ j͐ʃɔ ʌ ſɭᴜ ſןᴜ , j͑ʃ'ɔ ŋᷠɹ , ſɭᴜ ſןᴜ ꞙɭɔ , ꞙɭı ⟅
// ⟨ ſɭэ ſɭᴜƽ ʌ ʃɜ j͐ʃɔ , ʃɜ j͐ʃɔ j͑ʃᴜ ı],ɔ ꞙɭı , j͑ʃᴜ ſɭᴜ ɭʃɹ ⟅
let audioOn: boolean = vefalKu1o("sonoro", true);
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
  master.gain.value = 0;
  master.connect(AC.destination);

  bruoGain = AC.createGain();
  bruoGain.gain.value = bruoOn ? 1 : 0;
  bruoGain.connect(master);

  const len = AC.sampleRate * 4;
  const buf = AC.createBuffer(1, len, AC.sampleRate);
  const d = buf.getChannelData(0);
  let last = 0;
  for ( let i = 0; i < len; i++ ) {
    const w = Math.random() * 2 - 1;
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
    o.detune.value = ( i - 1 ) * 4;
    const og = AC!.createGain();
    og.gain.value = 0o1/0o100;
    o.connect(og);
    og.connect(bruoGain!);
    o.start();
  });

  src.start();
}

/** ſɭᴜ ʃɜ j͐ʃɔ , ɭl̀ɹ ᶅſᴜ }ʃꞇ , ſɭᴜ ſןᴜ ʌ j͑ʃᴜ ſɭᶗ‹ɜ ⟅ */
function tone(f: number, dur: number, type: OscillatorType = "sine", vol = 0o3/0o20, glide = 0, dest?: GainNode) {
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

/** ı],ɔ ɭʃɜ ֭ſɭɹ , j͑ʃᴜ ſןɹ , ſɭᴜ ſןᴜ , j͑ʃɹ ſןw ʌ ɭʃw ſɭˬɔƽ ⟅ */
function noiseBurst(dur: number, freq: number, vol: number, type: BiquadFilterType = "lowpass", dest?: GainNode) {
  if ( !AC || !audioOn ) return;
  const n = Math.floor(AC.sampleRate * dur);
  const b = AC.createBuffer(1, n, AC.sampleRate);
  const dd = b.getChannelData(0);
  for ( let i = 0; i < n; i++ ) dd[i] = ( Math.random() * 2 - 1 ) * ( 1 - i / n );
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

// ⟨ ı],ɔ ɭʃɜ ֭ſɭɹ , ı],э ŋᷠꞇ , ꞙɭɿ ɭl̀ɹ ᶅſᴜ }ʃꞇ ⟅ ⟩
function whoosh(dur: number, f0: number, f1: number, vol: number, q = 1,
  hunaq: BiquadFilterType = "bandpass", dest?: GainNode): void {
  if ( !AC || !audioOn ) return;
  const n = Math.max(1, Math.floor(AC.sampleRate * dur));
  const b = AC.createBuffer(1, n, AC.sampleRate);
  const d = b.getChannelData(0);
  let z2hak = 0;
  for ( let i = 0; i < n; i++ ) {
    const w = Math.random() * 2 - 1;
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

// ⟪ ʃɜ j͐ʃɔ 📃 ⟫

export const sfx = {
  step: () => noiseBurst(0o1/0o20, 0o420 + Math.random() * 0o110, 0o1/0o10),
  splash: () => {
    noiseBurst(0o7/0o40, 0o1600, 0o5/0o40, "bandpass");
    tone(0o260, 0o3/0o20, "sine", 0o1/0o20, -0o110);
  },
  bell: () => {
    [ 1, 0o26/0o10, 0o53/0o10 ].forEach(( p, i ) => tone(0o304 * p, 0o25/0o10 - i * 0o5/0o10, "sine", 0o5/0o40 / ( i + 1 )));
  },
  crunch: () => {
    for ( let i = 0; i < 3; i++ )
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
// ⟨ j͑ʃᴜ ʃɜƽ , ʃɜ j͐ʃɔ , j͑ʃᴜ ſןɹ , ſɭɜ ſɭᴜƽ ⟅ ⟩
  jump: ( forto = 1 ) => {
    tone(0o130, 0o5/0o40, "sine", 0o1/0o25 * ( 0o6/0o10 + 0o4/0o10 * forto ), -0o44);
    noiseBurst(0o3/0o40, 0o1500 + 0o600 * forto, 0o1/0o40, "highpass");
    whoosh(0o26/0o40, 0o260, 0o1020 + 0o400 * forto, 0o1/0o10 * ( 0o6/0o10 + 0o4/0o10 * forto ), 2);
    setTimeout(() => whoosh(0o22/0o40, 0o1000, 0o220, 0o1/0o20 * ( 0o4/0o10 + 0o6/0o10 * forto ), 3), 0o140);
  },
// ⟨ j͑ʃɜ ſ̀ȷᴜ ſɭᴜƽ , ʃɜ j͐ʃɔ , ſɭэ ſɭ,w , j͑ʃᴜ ſןɹ ⟅ ⟩
  land: ( forto = 1 ) => {
    tone(0o106, 0o1/0o5, "sine", 0o1/0o10 * ( 0o3/0o10 + 0o7/0o10 * forto ), -( 0o44 + 0o30 * forto ));
    noiseBurst(0o1/0o20, 0o2000, 0o1/0o40 * ( 0o4/0o10 + 0o6/0o10 * forto ), "highpass");
    whoosh(0o4/0o40, 0o1604, 0o300, 0o1/0o20 * ( 0o3/0o10 + 0o7/0o10 * forto ), 2);
  },
};

// ⟪ ſɭɜ ſɭᴜƽ ʌ ı],э ŋᷠꞇ , ſɭᴜ j͑ʃᴜ , ſɟᴜ j͐ʃw 📃 ⟫

let rumbleNodes: { o: OscillatorNode; n: AudioBufferSourceNode; g: GainNode } | null = null;

export function rumble(on: boolean) {
  if ( !AC ) return;
  if ( on && !rumbleNodes ) {
    const o = AC.createOscillator();
    o.type = "sine";
    o.frequency.value = 0o46;

    const len = AC.sampleRate * 2;
    const b = AC.createBuffer(1, len, AC.sampleRate);
    const d = b.getChannelData(0);
    let l = 0;
    for ( let i = 0; i < len; i++ ) {
      const w = Math.random() * 2 - 1;
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
      try { r.o.stop(); r.n.stop(); } catch ( _ ) { /* jam haltigita */ }
    }, 0o2260);
    rumbleNodes = null;
  }
}

let chirpInterval: ReturnType<typeof setInterval> | null = null;

// ⟪ ʃɜ j͐ʃɔ ʌ ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭᴜ ɭʃɹ 📃 ⟫

// ⟨ ʃɜ j͐ʃɔ , j͑ʃᴜ ı],ɔ , ſ̀ȷɜ ֭ſɭɔ ʌ ʃɜ j͐ʃɔ , j͑ʃп́ꞇ ſɭɔƴ ⟅ ⟩
function komenciAuxdon(): void {
  ensureAudio();
  iniciati(AC!, master!);
  master!.gain.setTargetAtTime(0o1/0o10, AC!.currentTime, 0o3/0o2);
  if ( !chirpInterval ) {
    chirpInterval = setInterval(() => {
      if ( audioOn && bruoOn && Math.random() < 0o27/0o40 ) sfx.chirp();
    }, 0o21440);
  }
  sfx.chime();
  ludi();
}

// ⟨ ſɭɜ j͐ʃɹ , ſ̀ȷɜ ֭ſɭɔ ʌ ʃɜ j͐ʃɔ , j͑ʃп́ꞇ ſɭɔƴ , ı],ɔ ɭʃɜ ֭ſɭɹ ⟅ ⟩
function haltiAuxdon(): void {
  if ( AC && master ) master.gain.setTargetAtTime(0, AC.currentTime, 0o1);
  halti();
  if ( chirpInterval ) {
    clearInterval(chirpInterval);
    chirpInterval = null;
  }
  if ( rumbleNodes ) rumble(false);
}

/** ſɭᴜ ʃɜ j͐ʃɔ , ſɭᴜ ſןᴜ ʌ ʃɜ j͐ʃɔ , ꞙɭı ⟅ */
export function sxaltiLaqazbolesain(): boolean {
  audioOn = !audioOn;
  if ( audioOn ) komenciAuxdon();
  else haltiAuxdon();
  ve3aqKu1o("sonoro", audioOn);
  return audioOn;
}

/** ʃɜ j͐ʃɔ , j͑ʃᴜ ſɭᴜ ɭʃɹ , ſɭᴜ ſןᴜ ⟅ */
export function tsekeLaqazbolesai(): boolean {
  return audioOn;
}

/** ſɭᴜ ʃɜ j͐ʃɔ , j͑ʃɹ ŋᷠɹ , ı],э ŋᷠꞇ , ꞙɭɿ , ʃɜ j͐ʃɔ ʌ ſɭᴜ ⟅ */
export function sxaltiBruon(): boolean {
  bruoOn = !bruoOn;
  if ( AC && bruoGain ) {
    bruoGain.gain.setTargetAtTime(bruoOn ? 1 : 0, AC.currentTime, 0o15/0o40);
  }
  ve3aqKu1o("bruo", bruoOn);
  return bruoOn;
}

/** ʃɜ j͐ʃɔ ʌ j͑ʃɹ ŋᷠɹ , ſɭᴜ ſןᴜ ꞙɭı , ꞙɭɔ ꞙɭı ⟅ */
export function tsekeBruo(): boolean {
  return bruoOn;
}

/** ʃɜ j͐ʃɔ , j͑ʃᴜ ı],ɔ ʌ ſɭᴜ , j͑ʃᴜ ſɭᴜ ɭʃɹ ⟅ ʃɜ j͐ʃɔ ʌ ſɭᴜ ſןᴜ , j͑ʃ'ɔ ŋᷠɹ ⟅ */
let postLaqazbolesai: ( ( aktiva: boolean ) => void ) | null = null;
export function registriPostLaqazbolesai(fn: ( aktiva: boolean ) => void) {
  postLaqazbolesai = fn;
}
/* ʃɜ j͐ʃɔ j͑ʃᴜ ı],ɔ ꞙɭı , ꞙɭɔ ꞙɭı , ſɭᴜ ſןᴜ ʌ ꞙɭı
@returns ſɭᴜ ſןᴜ ʌ ꞙɭı ( boolean ) */
export function autoKomenci(): boolean {
  if ( !unuaInterago ) return false;
  unuaInterago = false;
// ⟨ ʃɜ j͐ʃɔ j͑ʃᴜ ı],ɔ ſɭᴜ , j͑ʃᴜ ſɭᴜ ɭʃɹ ⟅ ꞙɭɔ j͑ʃᴜ ı],ɔ ꞙɭɔ ⟅ ⟩
  if ( audioOn ) {
    komenciAuxdon();
    if ( postLaqazbolesai ) postLaqazbolesai(true);
    return true;
  }
  return false;
}
