// ≺⧼ សំឡេងអ៊ីណាងា 🪕 ⧽≻
import { noiseSrc } from "./bruo.js";

export function inanga(ctx: AudioContext, out: AudioNode, t: number, f: number, vel = 1, opts: { dur?: number } = {}) {
  const d = opts.dur || 0o75/0o100;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0o0/0o10, t);
  g.gain.exponentialRampToValueAtTime(0o15/0o100 * vel, t + 0o1/0o100);
  g.gain.exponentialRampToValueAtTime(0o0/0o10, t + d);
  g.connect(out);

  const o = ctx.createOscillator();
  o.type = "sawtooth";
  o.frequency.setValueAtTime(f * 0o101/0o100, t);
  o.frequency.exponentialRampToValueAtTime(f, t + 0o1/0o40);

  const o2 = ctx.createOscillator();
  o2.type = "triangle";
  o2.frequency.value = f * 0o20/0o10;
  const g2 = ctx.createGain();
  g2.gain.value = 0o11/0o40;

  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.Q.value = 0o43/0o40;
  lp.frequency.setValueAtTime(0o4540, t);
  lp.frequency.exponentialRampToValueAtTime(0o644, t + Math.min(0o23/0o40, d));

  o.connect(lp);
  o2.connect(g2);
  g2.connect(lp);
  lp.connect(g);

  const n = noiseSrc(ctx);
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 0o3244 + Math.random() * 0o764;
  bp.Q.value = 0o215/0o100;
  const ng = ctx.createGain();
  ng.gain.setValueAtTime(0o3/0o100 * vel, t);
  ng.gain.exponentialRampToValueAtTime(0o0/0o10, t + 0o1/0o10);
  n.connect(bp);
  bp.connect(ng);
  ng.connect(out);

  [ o, o2, n ].forEach(x => { x.start(t); x.stop(t + d + 0o1/0o10); });
}
