// ─── Scale & pitch helpers ───────────────────────────────

export const A4 = 432;
export const F = (m: number) => A4 * Math.pow(2, (m - 69) / 12);

export const PENT_E = [52, 55, 57, 59, 62, 64, 67, 69, 71, 74, 76];

export const SLENDRO = [0, 231, 474, 717, 955].map(c => 55 + c / 100);
export const SL2 = SLENDRO.concat(SLENDRO.map(x => x + 12));

export const NYAM = [0, 190, 370, 510, 690, 860, 1030, 1200, 1390, 1560].map(c => 48 + c / 100);

export const PENT_A = [0, 200, 400, 700, 900, 1200, 1400, 1600, 1900, 2100, 2400].map(c => 45 + c / 100);

// ─── Seeded PRNG ( mulberry32 ) ──────────────────────────

export function mulberry(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ─── Noise buffer cache ──────────────────────────────────

let noiseCache: AudioBuffer | null = null;

function noiseBuf(ctx: AudioContext) {
  if (noiseCache) return noiseCache;
  const len = ctx.sampleRate * 2;
  const b = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = b.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  noiseCache = b;
  return b;
}

function noiseSrc(ctx: AudioContext) {
  const s = ctx.createBufferSource();
  s.buffer = noiseBuf(ctx);
  s.loop = true;
  return s;
}

// ─── The Eight Voices ────────────────────────────────────

export function siku(ctx: AudioContext, out: AudioNode, t: number, dur: number, f: number, vel = 1) {
  const g = ctx.createGain(), pk = 0.21 * vel;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(pk, t + 0.045);
  g.gain.setValueAtTime(pk * 0.9, t + Math.max(0.06, dur - 0.09));
  g.gain.linearRampToValueAtTime(0.0001, t + dur + 0.12);
  g.connect(out);

  const o = ctx.createOscillator();
  o.type = "sine";
  o.frequency.setValueAtTime(f * 1.012, t);
  o.frequency.exponentialRampToValueAtTime(f, t + 0.09);

  const o2 = ctx.createOscillator();
  o2.type = "sine";
  o2.frequency.value = f * 2;
  const g2 = ctx.createGain();
  g2.gain.value = 0.14;

  const o3 = ctx.createOscillator();
  o3.type = "sine";
  o3.frequency.value = f * 3;
  const g3 = ctx.createGain();
  g3.gain.value = 0.045;

  const vib = ctx.createOscillator();
  vib.frequency.value = 5.2;
  const vg = ctx.createGain();
  vg.gain.setValueAtTime(0, t);
  vg.gain.linearRampToValueAtTime(f * 0.005, t + Math.min(0.5, dur * 0.5));
  vib.connect(vg);
  vg.connect(o.frequency);

  const n = noiseSrc(ctx);
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = Math.min(6000, f * 2.6);
  bp.Q.value = 0.9;
  const ng = ctx.createGain();
  ng.gain.value = 0.05 * vel;

  o.connect(g);
  o2.connect(g2);
  g2.connect(g);
  o3.connect(g3);
  g3.connect(g);
  n.connect(bp);
  bp.connect(ng);
  ng.connect(g);

  [o, o2, o3, vib, n].forEach(x => { x.start(t); x.stop(t + dur + 0.3); });
}

export function ocarina(ctx: AudioContext, out: AudioNode, t: number, dur: number, f: number, vel = 1) {
  const g = ctx.createGain(), pk = 0.2 * vel;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(pk, t + 0.07);
  g.gain.setValueAtTime(pk * 0.92, t + Math.max(0.08, dur - 0.1));
  g.gain.linearRampToValueAtTime(0.0001, t + dur + 0.15);
  g.connect(out);

  const o = ctx.createOscillator();
  o.type = "sine";
  o.frequency.setValueAtTime(f * 0.982, t);
  o.frequency.exponentialRampToValueAtTime(f, t + 0.11);

  const o2 = ctx.createOscillator();
  o2.type = "sine";
  o2.frequency.value = f * 2;
  const g2 = ctx.createGain();
  g2.gain.value = 0.05;

  const vib = ctx.createOscillator();
  vib.frequency.value = 4.4;
  const vg = ctx.createGain();
  vg.gain.setValueAtTime(0, t);
  vg.gain.linearRampToValueAtTime(f * 0.007, t + Math.min(0.6, dur * 0.6));
  vib.connect(vg);
  vg.connect(o.frequency);

  const n = noiseSrc(ctx);
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 2100;
  bp.Q.value = 0.8;
  const ng = ctx.createGain();
  ng.gain.value = 0.018 * vel;

  o.connect(g);
  o2.connect(g2);
  g2.connect(g);
  n.connect(bp);
  bp.connect(ng);
  ng.connect(g);

  [o, o2, vib, n].forEach(x => { x.start(t); x.stop(t + dur + 0.3); });
}

export function didj(ctx: AudioContext, out: AudioNode, t: number, dur: number, f: number, vel = 1, toot = false) {
  const g = ctx.createGain(), pk = (toot ? 0.10 : 0.15) * vel;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(pk, t + (toot ? 0.05 : 0.7));
  g.gain.setValueAtTime(pk, t + Math.max(toot ? 0.06 : 0.8, dur - (toot ? 0.08 : 0.9)));
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  g.connect(out);

  const o = ctx.createOscillator();
  o.type = "sawtooth";
  o.frequency.value = f;

  const sub = ctx.createOscillator();
  sub.type = "sine";
  sub.frequency.value = f;
  const sg = ctx.createGain();
  sg.gain.value = toot ? 0.15 : 0.5;

  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = toot ? 1400 : 820;
  lp.Q.value = 1.4;

  const f1 = ctx.createBiquadFilter();
  f1.type = "bandpass";
  f1.frequency.value = toot ? 950 : 460;
  f1.Q.value = toot ? 4 : 7;

  const f2 = ctx.createBiquadFilter();
  f2.type = "bandpass";
  f2.frequency.value = toot ? 1900 : 1050;
  f2.Q.value = 6;

  const mix = ctx.createGain();
  mix.gain.value = 0.8;

  o.connect(lp);
  sub.connect(sg);
  sg.connect(lp);
  lp.connect(mix);
  mix.connect(f1);
  f1.connect(g);
  mix.connect(f2);
  f2.connect(g);

  const extras: (OscillatorNode | AudioBufferSourceNode)[] = [];
  if (!toot) {
    const l1 = ctx.createOscillator();
    l1.frequency.value = 0.11 + Math.random() * 0.08;
    const l1g = ctx.createGain();
    l1g.gain.value = 170;
    l1.connect(l1g);
    l1g.connect(f1.frequency);

    const l2 = ctx.createOscillator();
    l2.frequency.value = 0.07 + Math.random() * 0.05;
    const l2g = ctx.createGain();
    l2g.gain.value = 240;
    l2.connect(l2g);
    l2g.connect(f2.frequency);

    const am = ctx.createOscillator();
    am.frequency.value = 2.1 + Math.random() * 0.8;
    const amg = ctx.createGain();
    amg.gain.value = 0.05;
    am.connect(amg);
    amg.connect(mix.gain);

    const n = noiseSrc(ctx);
    const nf = ctx.createBiquadFilter();
    nf.type = "bandpass";
    nf.frequency.value = 260;
    nf.Q.value = 0.8;
    const ng = ctx.createGain();
    ng.gain.value = 0.012;
    n.connect(nf);
    nf.connect(ng);
    ng.connect(g);

    extras.push(l1, l2, am, n);
  }

  [o, sub, ...extras].forEach(x => { x.start(t); x.stop(t + dur + 0.15); });
}

export function guiro(ctx: AudioContext, out: AudioNode, t: number, dur: number, vel = 1, opts: { cresc?: number } = {}) {
  const ticks = dur < 0.08 ? 1 : Math.max(2, Math.round(dur / 0.03));
  const step = dur / ticks;
  for (let i = 0; i < ticks; i++) {
    const tt = t + i * step + Math.random() * 0.004;
    const n = noiseSrc(ctx);
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 2300 + Math.random() * 800 + (opts.cresc ? (i / ticks) * 1400 : 0);
    bp.Q.value = 6.5;
    const g = ctx.createGain();
    let v = (0.09 + Math.random() * 0.05) * vel;
    if (opts.cresc) v *= 0.35 + 0.75 * (i / ticks);
    g.gain.setValueAtTime(v, tt);
    g.gain.exponentialRampToValueAtTime(0.001, tt + 0.04);
    n.connect(bp);
    bp.connect(g);
    g.connect(out);
    n.start(tt);
    n.stop(tt + 0.06);
  }
}

export function bull(ctx: AudioContext, out: AudioNode, t: number, dur: number, f: number, vel = 1) {
  const g = ctx.createGain(), pk = 0.13 * vel;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(pk, t + dur * 0.32);
  g.gain.setValueAtTime(pk, t + dur * 0.72);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  g.connect(out);

  const am2 = ctx.createGain();
  am2.gain.value = 0.72;
  const who = ctx.createOscillator();
  who.frequency.value = 1.25 + Math.random() * 0.3;
  const wg = ctx.createGain();
  wg.gain.value = 0.26;
  who.connect(wg);
  wg.connect(am2.gain);

  const o = ctx.createOscillator();
  o.type = "triangle";
  o.frequency.setValueAtTime(f * 0.82, t);
  o.frequency.exponentialRampToValueAtTime(f, t + dur * 0.3);
  o.frequency.exponentialRampToValueAtTime(f * 0.9, t + dur);

  const wob = ctx.createOscillator();
  wob.frequency.value = 2.6;
  const wobg = ctx.createGain();
  wobg.gain.value = f * 0.045;
  wob.connect(wobg);
  wobg.connect(o.frequency);

  const swell = ctx.createOscillator();
  swell.frequency.value = 0.21;
  const swg = ctx.createGain();
  swg.gain.value = 0.9;
  swell.connect(swg);
  swg.connect(wob.frequency);

  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = f * 2.4;
  bp.Q.value = 1.2;

  o.connect(bp);
  bp.connect(am2);
  am2.connect(g);

  const n = noiseSrc(ctx);
  const nf = ctx.createBiquadFilter();
  nf.type = "bandpass";
  nf.frequency.value = f * 1.6;
  nf.Q.value = 0.9;
  const ng = ctx.createGain();
  ng.gain.value = 0.05;
  n.connect(nf);
  nf.connect(ng);
  ng.connect(am2);

  [o, wob, swell, who, n].forEach(x => { x.start(t); x.stop(t + dur + 0.15); });
}

export function slenthem(ctx: AudioContext, out: AudioNode, t: number, f: number, vel = 1) {
  const g = ctx.createGain();
  g.gain.value = 0.17 * vel;
  g.connect(out);

  const ratios = [1, 2.756, 5.404, 8.933];
  const gains = [1, 0.3, 0.13, 0.05];
  const decs = [4.6, 1.7, 0.75, 0.38];
  for (let i = 0; i < 4; i++) {
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.value = f * ratios[i] * (1 + (Math.random() - 0.5) * 0.0016);
    const og = ctx.createGain();
    og.gain.setValueAtTime(gains[i], t);
    og.gain.exponentialRampToValueAtTime(0.0001, t + decs[i]);
    o.connect(og);
    og.connect(g);
    o.start(t);
    o.stop(t + decs[i] + 0.1);
  }

  const n = noiseSrc(ctx);
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 380;
  const ng = ctx.createGain();
  ng.gain.setValueAtTime(0.09 * vel, t);
  ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.028);
  n.connect(lp);
  lp.connect(ng);
  ng.connect(out);
  n.start(t);
  n.stop(t + 0.05);
}

export function inanga(ctx: AudioContext, out: AudioNode, t: number, f: number, vel = 1, opts: { dur?: number } = {}) {
  const d = opts.dur || 0.95;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.2 * vel, t + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t + d);
  g.connect(out);

  const o = ctx.createOscillator();
  o.type = "sawtooth";
  o.frequency.setValueAtTime(f * 1.008, t);
  o.frequency.exponentialRampToValueAtTime(f, t + 0.035);

  const o2 = ctx.createOscillator();
  o2.type = "triangle";
  o2.frequency.value = f * 2.004;
  const g2 = ctx.createGain();
  g2.gain.value = 0.28;

  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.Q.value = 1.1;
  lp.frequency.setValueAtTime(2400, t);
  lp.frequency.exponentialRampToValueAtTime(420, t + Math.min(0.6, d));

  o.connect(lp);
  o2.connect(g2);
  g2.connect(lp);
  lp.connect(g);

  const n = noiseSrc(ctx);
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 1700 + Math.random() * 500;
  bp.Q.value = 2.2;
  const ng = ctx.createGain();
  ng.gain.setValueAtTime(0.045 * vel, t);
  ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.13);
  n.connect(bp);
  bp.connect(ng);
  ng.connect(out);

  [o, o2, n].forEach(x => { x.start(t); x.stop(t + d + 0.1); });
}

export function mbira(ctx: AudioContext, out: AudioNode, t: number, f: number, vel = 1) {
  const g = ctx.createGain();
  g.gain.value = 0.15 * vel;
  g.connect(out);

  const ratios = [1, 2.015, 3.98, 6.72];
  const gains = [1, 0.4, 0.15, 0.06];
  const decs = [1.7, 0.85, 0.32, 0.16];
  for (let i = 0; i < 4; i++) {
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.value = f * ratios[i] * (1 + (Math.random() - 0.5) * 0.003);
    const og = ctx.createGain();
    const dd = decs[i] * (0.75 + vel * 0.45);
    og.gain.setValueAtTime(gains[i], t);
    og.gain.exponentialRampToValueAtTime(0.0001, t + dd);
    o.connect(og);
    og.connect(g);
    o.start(t);
    o.stop(t + dd + 0.1);
  }

  const n = noiseSrc(ctx);
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 4000 + Math.random() * 900;
  bp.Q.value = 1.3;
  const ng = ctx.createGain();
  ng.gain.setValueAtTime(0.0001, t);
  ng.gain.exponentialRampToValueAtTime(0.08 * vel, t + 0.012);
  ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);

  const tr = ctx.createOscillator();
  tr.frequency.value = 26 + Math.random() * 8;
  const trg = ctx.createGain();
  trg.gain.value = 0.022;
  tr.connect(trg);
  trg.connect(ng.gain);

  n.connect(bp);
  bp.connect(ng);
  ng.connect(out);
  n.start(t);
  n.stop(t + 0.7);
  tr.start(t);
  tr.stop(t + 0.7);
}

// ─── Event types ─────────────────────────────────────────

export interface SonoEvento {
  t: number;
  i: string;
  f?: number;
  d: number;
  v?: number;
  dur?: number;
  cresc?: number;
  toot?: boolean;
}

export interface Sekcio {
  n: string;
  a: number;
  b: number;
}

export interface SpuroDateno {
  events: SonoEvento[];
  dur: number;
  secs: Sekcio[];
}

// ─── Instrument dispatcher ───────────────────────────────

export function instrumento(ctx: AudioContext, out: AudioNode, e: SonoEvento, t: number) {
  const f = e.f ?? 0;
  const v = (e.v == null ? 1 : e.v);
  const d = (e.d == null ? 1 : e.d);

  switch (e.i) {
    case "siku":     siku(ctx, out, t, d, f, v); break;
    case "ocarina":  ocarina(ctx, out, t, d, f, v); break;
    case "didj":     didj(ctx, out, t, d, f, v, e.toot || false); break;
    case "guiro":    guiro(ctx, out, t, d, v, e); break;
    case "bull":     bull(ctx, out, t, d, f, v); break;
    case "slenthem": slenthem(ctx, out, t, f, v); break;
    case "inanga":   inanga(ctx, out, t, f, v, e); break;
    case "mbira":    mbira(ctx, out, t, f, v); break;
  }
}
