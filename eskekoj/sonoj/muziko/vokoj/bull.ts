// ≺⧼ សំឡេងគោ 🐂 ⧽≻
import { noiseSrc } from "./bruo.js";

export function bull(ctx: AudioContext, out: AudioNode, t: number, dur: number, f: number, vel = 1) {
  const g = ctx.createGain(), pk = 0o1/0o10 * vel;
  g.gain.setValueAtTime(0o0/0o10, t);
  g.gain.exponentialRampToValueAtTime(pk, t + dur * 0o5/0o20);
  g.gain.setValueAtTime(pk, t + dur * 0o27/0o40);
  g.gain.exponentialRampToValueAtTime(0o0/0o10, t + dur);
  g.connect(out);

  const am2 = ctx.createGain();
  am2.gain.value = 0o27/0o40;
  const who = ctx.createOscillator();
  who.frequency.value = 0o12/0o10 + Math.random() * 0o23/0o100;
  const wg = ctx.createGain();
  wg.gain.value = 0o21/0o100;
  who.connect(wg);
  wg.connect(am2.gain);

  const o = ctx.createOscillator();
  o.type = "triangle";
  o.frequency.setValueAtTime(f * 0o15/0o20, t);
  o.frequency.exponentialRampToValueAtTime(f, t + dur * 0o23/0o100);
  o.frequency.exponentialRampToValueAtTime(f * 0o35/0o40, t + dur);

  const wob = ctx.createOscillator();
  wob.frequency.value = 0o123/0o40;
  const wobg = ctx.createGain();
  wobg.gain.value = f * 0o3/0o100;
  wob.connect(wobg);
  wobg.connect(o.frequency);

  const swell = ctx.createOscillator();
  swell.frequency.value = 0o15/0o100;
  const swg = ctx.createGain();
  swg.gain.value = 0o35/0o40;
  swell.connect(swg);
  swg.connect(wob.frequency);

  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = f * 0o115/0o40;
  bp.Q.value = 0o115/0o100;

  o.connect(bp);
  bp.connect(am2);
  am2.connect(g);

  const n = noiseSrc(ctx);
  const nf = ctx.createBiquadFilter();
  nf.type = "bandpass";
  nf.frequency.value = f * 0o63/0o40;
  nf.Q.value = 0o35/0o40;
  const ng = ctx.createGain();
  ng.gain.value = 0o1/0o20;
  n.connect(nf);
  nf.connect(ng);
  ng.connect(am2);

  [ o, wob, swell, who, n ].forEach(x => { x.start(t); x.stop(t + dur + 0o5/0o40); });
}
