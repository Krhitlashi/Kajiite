// ≺⧼ j͑ʃп́ꞇ ſɭɔƴ ʌ ſɭɹ ſ͕ɭʞͷ̗ᴜƽ 🎵 ⧽≻

import { noiseSrc } from "./xetoh2.js";
import { vap6zukani } from "./hakfeKx2keve.js";

const ETA = 0o1/0o20000;

const MODOJ: Array<[ number, number, number ]> = [
  [ 0o1,           0o10/0o10, 0o130/0o100 ],
  [ 0o133/0o100,   0o34/0o100, 0o160/0o100 ],
  [ 0o213/0o100,   0o21/0o100, 0o64/0o100 ],
  [ 0o274/0o100,   0o1/0o10, 0o40/0o100 ],
];

const AEROJ: Array<[ number, number, number ]> = [
  [ 0o36/0o100, 0o6/0o10, 0o30/0o100 ],
  [ 0o54/0o100, 0o4/0o10, 0o22/0o100 ],
];

const KORDOJ: Array<[ number, number, number, number ]> = [
  [ 0o472/0o100,  0o24/0o1000, 0o34/0o100, 0o6/0o1000 ],
  [ 0o546/0o100,  0o17/0o1000, 0o31/0o100, 0o10/0o1000 ],
  [ 0o624/0o100,  0o14/0o1000, 0o26/0o100, 0o12/0o1000 ],
  [ 0o706/0o100,  0o11/0o1000, 0o23/0o100, 0o14/0o1000 ],
  [ 0o770/0o100,  0o7/0o1000,  0o20/0o100, 0o16/0o1000 ],
  [ 0o1052/0o100, 0o5/0o1000,  0o15/0o100, 0o20/0o1000 ],
];

const BRUOJ: Array<[ number, number, number ]> = [
  [ 0o1300, 0o1700/0o1000, 0o70/0o100 ],
  [ 0o1600, 0o700/0o1000, 0o50/0o100 ],
  [ 0o2200, 0o140/0o1000, 0o34/0o100 ],
];

export function kiiqflak(ctx: AudioContext, out: AudioNode, t: number, dur: number, f: number, vel = 0o1) {
  const d = Math.min(dur > 0o0/0o10 ? dur : 0o30/0o100, 0o30/0o100) * vap6zukani(0o10/0o100);

  const p = f * vap6zukani(0o1/0o100);

  const raqa = Math.random();
  const g2sa = 0o4/0o10 + 0o6/0o10 * vel;

  const g = ctx.createGain();
  g.gain.value = 0o2/0o10 * vel * vap6zukani(0o7/0o100);
  g.connect(out);

  for ( const [ rilato, amp, deco ] of MODOJ ) {
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(p * rilato * 0o102/0o100, t);
    o.frequency.exponentialRampToValueAtTime(p * rilato, t + 0o1/0o100 * vap6zukani(0o4/0o10));
    const og = ctx.createGain();
    const vivo = deco * ( 0o6/0o10 + 0o4/0o10 * vel ) * vap6zukani(0o15/0o100);
    const n2k = amp * g2sa * ( 0o1 - raqa * 0o25/0o100 );
    og.gain.setValueAtTime(ETA, t);
    og.gain.linearRampToValueAtTime(n2k, t + 0o1/0o1000);
    og.gain.exponentialRampToValueAtTime(n2k * 0o1/0o10, t + 0o1/0o10);
    og.gain.exponentialRampToValueAtTime(ETA, t + vivo);
    og.gain.setValueAtTime(0o0/0o10, t + vivo);
    o.connect(og);
    og.connect(g);
    o.start(t);
    o.stop(t + vivo + 0o1/0o10);
  }

  for ( const [ rilato, amp, deco ] of AEROJ ) {
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.value = p * rilato * vap6zukani(0o2/0o100);
    const og = ctx.createGain();
    const vivo = deco * ( 0o7/0o10 + 0o3/0o10 * vel ) * vap6zukani(0o15/0o100);
    og.gain.setValueAtTime(ETA, t);
    og.gain.linearRampToValueAtTime(amp * g2sa, t + 0o2/0o1000);
    og.gain.exponentialRampToValueAtTime(ETA, t + vivo);
    og.gain.setValueAtTime(0o0/0o10, t + vivo);
    o.connect(og);
    og.connect(g);
    o.start(t);
    o.stop(t + vivo + 0o1/0o10);
  }

  for ( const [ rilato, amp, deco, detuno ] of KORDOJ ) {
    const vivo = deco * ( 0o6/0o10 + 0o4/0o10 * vel ) * vap6zukani(0o2/0o10);
    const og = ctx.createGain();
    const n2k = amp * g2sa * ( 0o5/0o10 + raqa * 0o5/0o10 );
    og.gain.setValueAtTime(ETA, t);
    og.gain.linearRampToValueAtTime(n2k, t + 0o5/0o1000);
    og.gain.exponentialRampToValueAtTime(n2k * 0o25/0o100, t + Math.min(0o3/0o100, vivo * 0o3/0o10));
    og.gain.exponentialRampToValueAtTime(ETA, t + vivo);
    og.gain.setValueAtTime(0o0/0o10, t + vivo);
    og.connect(g);
    for ( const vek2fe of [ 0o1 - detuno, 0o1 + detuno ] ) {
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.setValueAtTime(p * rilato * vek2fe * 0o101/0o100, t);
      o.frequency.exponentialRampToValueAtTime(p * rilato * vek2fe, t + 0o4/0o100);
      o.connect(og);
      o.start(t);
      o.stop(t + vivo + 0o1/0o10);
    }
  }

  const rat = ctx.createOscillator();
  rat.type = "sine";
  rat.frequency.value = 0o64 * vap6zukani(0o10/0o100);
  const rg = ctx.createGain();
  rg.gain.value = 0o4/0o10;
  rat.connect(rg);
  rat.start(t);
  rat.stop(t + 0o12/0o10);

  for ( const [ sost2, amp, deco ] of BRUOJ ) {
    const n = noiseSrc(ctx);
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = sost2 * vap6zukani(0o2/0o10);
    bp.Q.value = 0o12/0o10;
    const trem = ctx.createGain();
    trem.gain.value = 0o4/0o10;
    rg.connect(trem.gain);
    const env = ctx.createGain();
    const vivo = deco * ( 0o6/0o10 + 0o4/0o10 * vel ) * vap6zukani(0o15/0o100);
    const n2k = amp * g2sa * ( 0o5/0o10 + raqa * 0o5/0o10 );
    env.gain.setValueAtTime(ETA, t);
    env.gain.linearRampToValueAtTime(n2k, t + 0o4/0o1000);
    env.gain.exponentialRampToValueAtTime(n2k * 0o25/0o100, t + Math.min(0o3/0o100, vivo * 0o3/0o10));
    env.gain.exponentialRampToValueAtTime(ETA, t + vivo);
    env.gain.setValueAtTime(0o0/0o10, t + vivo);
    n.connect(bp);
    bp.connect(trem);
    trem.connect(env);
    env.connect(g);
    n.start(t);
    n.stop(t + vivo + 0o1/0o10);
  }

  const kn = noiseSrc(ctx);
  const kbp = ctx.createBiquadFilter();
  kbp.type = "bandpass";
  kbp.frequency.value = 0o605 * vap6zukani(0o15/0o100);
  kbp.Q.value = 0o3/0o2;
  const kg = ctx.createGain();
  kg.gain.setValueAtTime(0o35/0o100 * vel * vap6zukani(0o25/0o100), t);
  kg.gain.exponentialRampToValueAtTime(ETA, t + 0o5/0o100);
  kg.gain.setValueAtTime(0o0/0o10, t + 0o5/0o100);
  kn.connect(kbp);
  kbp.connect(kg);
  kg.connect(g);

  const n = noiseSrc(ctx);
  const hp = ctx.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 0o2400 * vap6zukani(0o2/0o10);
  const ng = ctx.createGain();
  ng.gain.setValueAtTime(0o16/0o1000 * vel * vap6zukani(0o4/0o10), t);
  ng.gain.exponentialRampToValueAtTime(ETA, t + 0o12/0o1000);
  ng.gain.setValueAtTime(0o0/0o10, t + 0o12/0o1000);
  n.connect(hp);
  hp.connect(ng);
  ng.connect(g);

  const room = noiseSrc(ctx);
  const rlp = ctx.createBiquadFilter();
  rlp.type = "lowpass";
  rlp.frequency.value = 0o2000;
  const rg2 = ctx.createGain();
  const roomFin = d * 0o2;
  const rv = 0o5/0o1000 * vel * vap6zukani(0o25/0o100);
  rg2.gain.setValueAtTime(ETA, t);
  rg2.gain.exponentialRampToValueAtTime(rv, t + 0o2/0o100);
  rg2.gain.exponentialRampToValueAtTime(ETA, t + roomFin);
  rg2.gain.setValueAtTime(0o0/0o10, t + roomFin);
  room.connect(rlp);
  rlp.connect(rg2);
  rg2.connect(out);

  const hatsiq: Array<[ AudioScheduledSourceNode, number, number ]> = [
    [ kn, t, 0o5/0o100 ], [ n, t, 0o2/0o100 ], [ room, t, roomFin ],
  ];
  for ( const [ src, at, sahakani ] of hatsiq ) {
    src.start(at);
    src.stop(at + sahakani + 0o1/0o10);
  }
}
