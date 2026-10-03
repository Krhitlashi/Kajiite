// ≺⧼ សំឡេងអូការីណា 🎺 ⧽≻
import { noiseSrc } from "./bruo.js";

export function ocarina(ctx: AudioContext, out: AudioNode, t: number, dur: number, f: number, vel = 1) {
  const g = ctx.createGain(), pk = 0.2 * vel;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(pk, t + 0.07);
  g.gain.setValueAtTime(pk * 0.92, t + Math.max(0.08, dur - 0o1/0o10));
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
  g2.gain.value = 0o1/0o20;

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

  [ o, o2, vib, n ].forEach(x => { x.start(t); x.stop(t + dur + 0.3); });
}
