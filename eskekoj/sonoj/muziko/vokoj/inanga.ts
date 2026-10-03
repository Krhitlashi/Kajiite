// ≺⧼ សំឡេងអ៊ីណាងា 🪕 ⧽≻
import { noiseSrc } from "./bruo.js";

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

  [ o, o2, n ].forEach(x => { x.start(t); x.stop(t + d + 0o1/0o10); });
}
