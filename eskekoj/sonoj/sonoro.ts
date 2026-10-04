// ≺⧼ សំឡេង 🔊 ⧽≻

import { iniciati, ludi, halti } from "./muziko/ludilo.js";

let AC: AudioContext | null = null;
let master: GainNode | null = null;
let bruoGain: GainNode | null = null;
let audioOn = false;
let bruoOn = true;
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

/** លេងសំឡេងដោយមានការរអិលស្រេចចិត្ត */
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

/** ការផ្ទុះសំឡេងរំខានដែលបានចម្រាញ់ */
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

// ⟨ សំឡេងរំខានយោល 📃 ⟩
function whoosh(dur: number, f0: number, f1: number, vol: number, q = 1,
  tipo: BiquadFilterType = "bandpass", dest?: GainNode): void {
  if ( !AC || !audioOn ) return;
  const n = Math.max(1, Math.floor(AC.sampleRate * dur));
  const b = AC.createBuffer(1, n, AC.sampleRate);
  const d = b.getChannelData(0);
  let lasta = 0;
  for ( let i = 0; i < n; i++ ) {
    const w = Math.random() * 2 - 1;
    lasta = ( lasta + 0o1/0o100 * w ) / ( 0o101/0o100 );
    d[i] = lasta * 0o7/0o2;
  }
  const s = AC.createBufferSource();
  s.buffer = b;
  const f = AC.createBiquadFilter();
  f.type = tipo;
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

// ⟪ សំឡេង 📃 ⟫

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
  // ⟨ ការលោត 📃 ⟩
  jump: ( forto = 1 ) => {
    tone(0o130, 0o5/0o40, "sine", 0o1/0o25 * ( 0o6/0o10 + 0o4/0o10 * forto ), -0o44);
    noiseBurst(0o3/0o40, 0o1500 + 0o600 * forto, 0o1/0o40, "highpass");
    whoosh(0o26/0o40, 0o260, 0o1020 + 0o400 * forto, 0o1/0o10 * ( 0o6/0o10 + 0o4/0o10 * forto ), 2);
    setTimeout(() => whoosh(0o22/0o40, 0o1000, 0o220, 0o1/0o20 * ( 0o4/0o10 + 0o6/0o10 * forto ), 3), 0o140);
  },
  // ⟨ ការចុះចត 📃 ⟩
  land: ( forto = 1 ) => {
    tone(0o106, 0o1/0o5, "sine", 0o1/0o10 * ( 0o3/0o10 + 0o7/0o10 * forto ), -( 0o44 + 0o30 * forto ));
    noiseBurst(0o1/0o20, 0o2000, 0o1/0o40 * ( 0o4/0o10 + 0o6/0o10 * forto ), "highpass");
    whoosh(0o4/0o40, 0o1604, 0o300, 0o1/0o20 * ( 0o3/0o10 + 0o7/0o10 * forto ), 2);
  },
};

// ⟪ ការញ័រ ( សម្រាប់ទូក / ម៉ាស៊ីន ) 📃 ⟫

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

// ⟪ API សាធារណៈ 📃 ⟫

/** បើកសំឡេងជុំវិញ។ ត្រឡប់ស្ថានភាពថ្មី។ */
export function sxaltiAŭdion(): boolean {
  audioOn = !audioOn;
  if ( audioOn ) {
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
  } else {
    master!.gain.setTargetAtTime(0, AC!.currentTime, 0o1);
    halti();
    if ( chirpInterval ) {
      clearInterval(chirpInterval);
      chirpInterval = null;
    }
    if ( rumbleNodes ) rumble(false);
  }
  return audioOn;
}

/** តើសំឡេងកំពុងសកម្មឬទេ */
export function cxuAŭdio(): boolean {
  return audioOn;
}

/** បើកតែសំឡេងផ្ទៃខាងក្រោយ ( ខ្យល់/រលក/សត្វ ) ដោយឯករាជ្យពីតន្ត្រី។ */
export function sxaltiBruon(): boolean {
  bruoOn = !bruoOn;
  if ( AC && bruoGain ) {
    bruoGain.gain.setTargetAtTime(bruoOn ? 1 : 0, AC.currentTime, 0o15/0o40);
  }
  return bruoOn;
}

/** តើសំឡេងផ្ទៃខាងក្រោយកំពុងឮឬទេ។ */
export function cxuBruo(): boolean {
  return bruoOn;
}

/** ចាប់ផ្តើមសំឡេងដោយស្វ័យប្រវត្តិនៅអន្តរកម្មអ្នកប្រើដំបូង។ ធ្វើបច្ចុប្បន្នភាព UI ប្រសិនបើមានការហៅផ្តល់។ */
let postAŭdio: ( ( aktiva: boolean ) => void ) | null = null;
export function registriPostAŭdio(fn: ( aktiva: boolean ) => void) {
  postAŭdio = fn;
}
export function autoKomenci() {
  if ( !unuaInterago ) return;
  unuaInterago = false;
  if ( !audioOn ) {
    sxaltiAŭdion();
    if ( postAŭdio ) postAŭdio(true);
  }
}
