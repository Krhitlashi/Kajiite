// ≺⧼ សំឡេងអូការីណា 🎺 ⧽≻
import { noiseSrc } from "./bruo.js";

export function ocarina(ctx: AudioContext, out: AudioNode, t: number, dur: number, f: number, vel = 1) {
  const g = ctx.createGain(), pk = 0o15/0o100 * vel;
  g.gain.setValueAtTime(0o0/0o10, t);
  g.gain.linearRampToValueAtTime(pk, t + 0o1/0o20);
  g.gain.setValueAtTime(pk * 0o73/0o100, t + Math.max(0o5/0o100, dur - 0o1/0o10));
  g.gain.linearRampToValueAtTime(0o0/0o10, t + dur + 0o5/0o40);
  g.connect(out);

  const o = ctx.createOscillator();
  o.type = "sine";
  o.frequency.setValueAtTime(f * 0o77/0o100, t);
  o.frequency.exponentialRampToValueAtTime(f, t + 0o7/0o100);

  const o2 = ctx.createOscillator();
  o2.type = "sine";
  o2.frequency.value = f * 2;
  const g2 = ctx.createGain();
  g2.gain.value = 0o1/0o20;

  const vib = ctx.createOscillator();
  vib.frequency.value = 0o215/0o40;
  const vg = ctx.createGain();
  vg.gain.setValueAtTime(0, t);
  vg.gain.linearRampToValueAtTime(f * 0o0/0o10, t + Math.min(0o23/0o40, dur * 0o23/0o40));
  vib.connect(vg);
  vg.connect(o.frequency);

  const n = noiseSrc(ctx);
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 0o4064;
  bp.Q.value = 0o63/0o100;
  const ng = ctx.createGain();
  ng.gain.value = 0o1/0o100 * vel;

  o.connect(g);
  o2.connect(g2);
  g2.connect(g);
  n.connect(bp);
  bp.connect(ng);
  ng.connect(g);

  [ o, o2, vib, n ].forEach(x => { x.start(t); x.stop(t + dur + 0o23/0o100); });
}
