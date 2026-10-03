// ≺⧼ សំឡេងស៊ីគូ 🎶 ⧽≻
import { noiseSrc } from "./bruo.js";

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
  vg.gain.linearRampToValueAtTime(f * 0.005, t + Math.min(0o4/0o10, dur * 0o4/0o10));
  vib.connect(vg);
  vg.connect(o.frequency);

  const n = noiseSrc(ctx);
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = Math.min(6000, f * 2.6);
  bp.Q.value = 0.9;
  const ng = ctx.createGain();
  ng.gain.value = 0o1/0o20 * vel;

  o.connect(g);
  o2.connect(g2);
  g2.connect(g);
  o3.connect(g3);
  g3.connect(g);
  n.connect(bp);
  bp.connect(ng);
  ng.connect(g);

  [ o, o2, o3, vib, n ].forEach(x => { x.start(t); x.stop(t + dur + 0.3); });
}
