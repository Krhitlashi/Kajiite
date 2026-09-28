// ≺⧼ Sonoro 🔊 ⧽≻
// Media sona motoro por Aranis ( alportita de ornaveth-v2 )
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
  AC = new ( window.AudioContext || ( window as any ).webkitAudioContext )();
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
  for ( let i = 0; i < len; i++ ) {
    const w = Math.random() * 2 - 1;
    last = ( last + 0o1/0o100 * w ) / ( 0o101/0o100 );
    d[i] = last * 0o7/0o2;
  }

  // Bruo → malaltpasa ( balaita per LFO ) → ĉefa
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

  // Harmoniaj drunoj. A2 ( 0o156 ), E3 ( 0o245 ), A3 ( 0o334 ) kun eta malagordiĝo
  [ 0o160, 0o250, 0o330 ].forEach(( f, i ) => {
    const o = AC!.createOscillator();
    o.type = "sine";
    o.frequency.value = f;
    o.detune.value = ( i - 1 ) * 4;
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
  if ( glide ) o.frequency.exponentialRampToValueAtTime(Math.max(0o40, f + glide), t + dur);
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

// ⟨ Svingita bruo 📃 ⟩ — filtrila bru-eksplodo kies bendpaso GLITAS de f0 al f1
// dum la sonado, kun atak-elfada envolviloj anstataŭ rekta volumeno. Ĉi tio
// faras la sonon pli natura ol la kruda noiseBurst ( la aero de la salto kaj
// la frotŝovo de la surteriĝo legiĝas kiel ŝtofo kaj vento, ne kiel klako ).
//     @param dur ( number ) - La daŭro en sekundoj.
//     @param f0, f1 ( number ) - La bendpasa frekvenco ĉe la komenco kaj la fino.
//     @param vol ( number ) - La pinta volumeno.
//     @param q ( number = 1 ) - La kvalito-faktoro de la filtrilo.
//     @param tipo ( BiquadFilterType = "bandpass" ) - La filtrila tipo.
//     @param dest ( GainNode ) - La celloko, defaŭlte la ĉefa buso.
//     @returns nenio
function whoosh(dur: number, f0: number, f1: number, vol: number, q = 1,
  tipo: BiquadFilterType = "bandpass", dest?: GainNode): void {
  if ( !AC || !audioOn ) return;
  const n = Math.max(1, Math.floor(AC.sampleRate * dur));
  const b = AC.createBuffer(1, n, AC.sampleRate);
  const d = b.getChannelData(0);
  // Bruna bruo ( la sama integralilo kiel la fona zumado ) — pli varma kaj pli
  // "aera" ol la blanka, do la ŝŝo ne fajfas.
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

// ⟪ Sonaĵoj 📃 ⟫

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
  // ⟨ Salto 📃 ⟩ — la forpuŝo kaj la aero. Tri tavoloj kiel ĉe vera salto.
  //   · La FORPUŜA BATO — la kruroj etendiĝas kontraŭ la grundo ( mola malalta
  //     tono kiu falas, do la bato ne sonas kiel tamburo ).
  //   · La ŜTOFA FROTO — la vestoj svingiĝas kun la korpo ( tre mallonga
  //     altfrekvenca siblado ).
  //   · La AERA ŜŜO — la korpo trapasas la aeron. La bendpaso SUPIRENIRAS dum
  //     la supreniro kaj la dua, pli malfrua ŝŝo malsupreniras dum la falo —
  //     tiel la salto havas veran komencon kaj finon, ne unu platan siblon.
  //     `forto` ( 0..1 ) venas de la promena rapido, do kurante oni saltas pli
  //     laŭte kaj la aero pli sibladas.
  //     @param forto ( number = 1 ) - La salta forto, 0..1.
  //     @returns nenio
  jump: ( forto = 1 ) => {
    tone(0o130, 0o5/0o40, "sine", 0o1/0o25 * ( 0o6/0o10 + 0o4/0o10 * forto ), -0o44);
    noiseBurst(0o3/0o40, 0o1500 + 0o600 * forto, 0o1/0o40, "highpass");
    whoosh(0o26/0o40, 0o260, 0o1020 + 0o400 * forto, 0o1/0o10 * ( 0o6/0o10 + 0o4/0o10 * forto ), 2);
    setTimeout(() => whoosh(0o22/0o40, 0o1000, 0o220, 0o1/0o20 * ( 0o4/0o10 + 0o6/0o10 * forto ), 3), 0o140);
  },
  // ⟨ Surteriĝo 📃 ⟩ — la mola bato de la plandoj, la frotŝovo de la ŝuoj sur
  // la pavimo kaj la aero kiu fermiĝas. `forto` ( 0..1 ) venas de la fala
  // rapido — de malalta ŝtupo oni apenaŭ aŭdas ĝin, de alta bordo ĝi batas.
  //     @param forto ( number = 1 ) - La fala forto, 0..1.
  //     @returns nenio
  land: ( forto = 1 ) => {
    tone(0o106, 0o1/0o5, "sine", 0o1/0o10 * ( 0o3/0o10 + 0o7/0o10 * forto ), -( 0o44 + 0o30 * forto ));
    noiseBurst(0o1/0o20, 0o2000, 0o1/0o40 * ( 0o4/0o10 + 0o6/0o10 * forto ), "highpass");
    whoosh(0o4/0o40, 0o1604, 0o300, 0o1/0o20 * ( 0o3/0o10 + 0o7/0o10 * forto ), 2);
  },
};

// ⟪ Tremo ( por boatoj / maŝinoj ) 📃 ⟫

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
    }, 1200);
    rumbleNodes = null;
  }
}

let chirpInterval: ReturnType<typeof setInterval> | null = null;

// ⟪ Publika API 📃 ⟫

/** Ŝaltu la ĉirkaŭan aŭdion. Redonu la novan staton. */
export function sxaltiAŭdion(): boolean {
  audioOn = !audioOn;
  if ( audioOn ) {
    ensureAudio();
    iniciati(AC!, master!);
    master!.gain.setTargetAtTime(0o1/0o10, AC!.currentTime, 0o3/0o2); // enmalfadi
    // Start periodic ambient chirps
    if ( !chirpInterval ) {
      chirpInterval = setInterval(() => {
        if ( audioOn && bruoOn && Math.random() < 0o27/0o40 ) sfx.chirp();
      }, 0o21440);
    }
    sfx.chime(); // bonvena sonorilo ĉe aktivigo
    ludi(); // komencu generan muzikon
  } else {
    master!.gain.setTargetAtTime(0, AC!.currentTime, 0o1); // elfadi
    halti(); // haltigu generan muzikon
    if ( chirpInterval ) {
      clearInterval(chirpInterval);
      chirpInterval = null;
    }
    if ( rumbleNodes ) rumble(false);
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
