// ≺⧼ សំឡេងស៊ីគូ 🎶 ⧽≻
import { noiseSrc } from "./bruo.js";

export function siku(ctx: AudioContext, out: AudioNode, t: number, dur: number, f: number, vel = 1) {
  const g = ctx.createGain(), pk = 0o15/0o100 * vel;
  g.gain.setValueAtTime(0o0/0o10, t);
  g.gain.linearRampToValueAtTime(pk, t + 0o3/0o100);
  g.gain.setValueAtTime(pk * 0o35/0o40, t + Math.max(0o1/0o20, dur - 0o3/0o40));
  g.gain.linearRampToValueAtTime(0o0/0o10, t + dur + 0o1/0o10);
  g.connect(out);

  const o = ctx.createOscillator();
  o.type = "sine";
  o.frequency.setValueAtTime(f * 0o101/0o100, t);
  o.frequency.exponentialRampToValueAtTime(f, t + 0o3/0o40);

  const o2 = ctx.createOscillator();
  o2.type = "sine";
  o2.frequency.value = f * 2;
  const g2 = ctx.createGain();
  g2.gain.value = 0o11/0o100;

  const o3 = ctx.createOscillator();
  o3.type = "sine";
  o3.frequency.value = f * 3;
  const g3 = ctx.createGain();
  g3.gain.value = 0o3/0o100;

  const vib = ctx.createOscillator();
  vib.frequency.value = 0o515/0o100;
  const vg = ctx.createGain();
  vg.gain.setValueAtTime(0, t);
  vg.gain.linearRampToValueAtTime(f * 0o0/0o10, t + Math.min(0o4/0o10, dur * 0o4/0o10));
  vib.connect(vg);
  vg.connect(o.frequency);

  const n = noiseSrc(ctx);
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = Math.min(0o13560, f * 0o123/0o40);
  bp.Q.value = 0o35/0o40;
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

  [ o, o2, o3, vib, n ].forEach(x => { x.start(t); x.stop(t + dur + 0o23/0o100); });
}
