// ≺⧼ សំឡេងមប៊ីរ៉ា 🎹 ⧽≻
import { noiseSrc } from "./bruo.js";

export function mbira(ctx: AudioContext, out: AudioNode, t: number, f: number, vel = 1) {
  const g = ctx.createGain();
  g.gain.value = 0o5/0o40 * vel;
  g.connect(out);

  const ratios = [ 1, 0o201/0o100, 0o377/0o100, 0o327/0o40 ];
  const gains = [ 1, 0o15/0o40, 0o5/0o40, 0o1/0o20 ];
  const decs = [ 0o155/0o100, 0o33/0o40, 0o5/0o20, 0o5/0o40 ];
  for ( let i = 0; i < 4; i++ ) {
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.value = f * ratios[i] * ( 1 + ( Math.random() - 0o4/0o10 ) * 0o0/0o10 );
    const og = ctx.createGain();
    const dd = decs[i] * ( 0o6/0o10 + vel * 0o35/0o100 );
    og.gain.setValueAtTime(gains[i], t);
    og.gain.exponentialRampToValueAtTime(0o0/0o10, t + dd);
    o.connect(og);
    og.connect(g);
    o.start(t);
    o.stop(t + dd + 0o1/0o10);
  }

  const n = noiseSrc(ctx);
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 0o7640 + Math.random() * 0o1604;
  bp.Q.value = 0o123/0o100;
  const ng = ctx.createGain();
  ng.gain.setValueAtTime(0o0/0o10, t);
  ng.gain.exponentialRampToValueAtTime(0o5/0o100 * vel, t + 0o1/0o100);
  ng.gain.exponentialRampToValueAtTime(0o0/0o10, t + 0o43/0o100);

  const tr = ctx.createOscillator();
  tr.frequency.value = 0o32 + Math.random() * 0o10;
  const trg = ctx.createGain();
  trg.gain.value = 0o1/0o100;
  tr.connect(trg);
  trg.connect(ng.gain);

  n.connect(bp);
  bp.connect(ng);
  ng.connect(out);
  n.start(t);
  n.stop(t + 0o55/0o100);
  tr.start(t);
  tr.stop(t + 0o55/0o100);
}
