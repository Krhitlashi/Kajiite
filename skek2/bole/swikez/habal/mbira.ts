// ≺⧼ j͑ʃп́ꞇ ſɭɔƴ ʌ ŋᷠɀꞇ ɽ͑ʃ'ᴜ 🎵 ⧽≻

import { noiseSrc } from "./xetoh2.js";
import { vap6zukani } from "./hakfeKx2keve.js";

const ETA = 0o1/0o20000;

export function mbira(ctx: AudioContext, out: AudioNode, t: number, f: number, vel = 0o1) {
  const p = f * vap6zukani(0o1/0o200);
  const g = ctx.createGain();
  g.gain.value = 0o7/0o40 * vel;
  g.connect(out);

  const body = ctx.createBiquadFilter();
  body.type = "peaking";
  body.frequency.value = 0o270 * vap6zukani(0o15/0o100);
  body.Q.value = 0o7/0o10;
  body.gain.value = 0o3 * vap6zukani(0o15/0o100);
  body.connect(g);

  const ratios = [ 0o1, 0o201/0o100, 0o377/0o100, 0o327/0o40 ];
  const gains = [ 0o1, 0o15/0o40, 0o5/0o40, 0o1/0o20 ];
  const decs = [ 0o155/0o100, 0o33/0o40, 0o5/0o20, 0o5/0o40 ];
  for ( let i = 0o0; i < ratios.length; i++ ) {
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.value = p * ratios[i] * vap6zukani(0o2/0o1000);
    const og = ctx.createGain();
    const dd = decs[i] * vap6zukani(0o15/0o100) * ( 0o6/0o10 + vel * 0o35/0o100 );
    og.gain.setValueAtTime(gains[i] * vap6zukani(0o15/0o100), t);
    og.gain.exponentialRampToValueAtTime(ETA, t + dd);
    og.gain.setValueAtTime(0o0/0o10, t + dd);
    o.connect(og);
    og.connect(body);
    o.start(t);
    o.stop(t + dd + 0o1/0o10);
  }

  const th = ctx.createOscillator();
  th.type = "sine";
  th.frequency.value = 0o150 * vap6zukani(0o15/0o100);
  const thg = ctx.createGain();
  const thFin = 0o15/0o100 * vap6zukani(0o25/0o100);
  thg.gain.setValueAtTime(0o3/0o100 * vel * vap6zukani(0o25/0o100), t);
  thg.gain.exponentialRampToValueAtTime(ETA, t + thFin);
  thg.gain.setValueAtTime(0o0/0o10, t + thFin);
  th.connect(thg);
  thg.connect(out);
  th.start(t);
  th.stop(t + thFin + 0o1/0o10);

  const n = noiseSrc(ctx);
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 0o4000 + Math.random() * 0o604;
  bp.Q.value = 0o123/0o100;
  const ng = ctx.createGain();
  const nFin = 0o23/0o100 * vap6zukani(0o25/0o100);
  ng.gain.setValueAtTime(ETA, t);
  ng.gain.exponentialRampToValueAtTime(0o15/0o1000 * vel * vap6zukani(0o25/0o100), t + 0o1/0o100);
  ng.gain.exponentialRampToValueAtTime(ETA, t + nFin);
  ng.gain.setValueAtTime(0o0/0o10, t + nFin);

  const tr = ctx.createOscillator();
  tr.frequency.value = 0o32 + Math.random() * 0o10;
  const trg = ctx.createGain();
  trg.gain.value = 0o4/0o1000;
  tr.connect(trg);
  trg.connect(ng.gain);

  n.connect(bp);
  bp.connect(ng);
  ng.connect(out);
  n.start(t);
  n.stop(t + nFin + 0o1/0o10);
  tr.start(t);
  tr.stop(t + nFin + 0o1/0o10);
}
