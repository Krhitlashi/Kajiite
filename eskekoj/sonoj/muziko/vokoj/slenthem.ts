// ≺⧼ សំឡេងស្លេនថេម 🔔 ⧽≻
import { noiseSrc } from "./bruo.js";

export function slenthem(ctx: AudioContext, out: AudioNode, t: number, f: number, vel = 1) {
  const g = ctx.createGain();
  g.gain.value = 0.17 * vel;
  g.connect(out);

  const ratios = [ 1, 2.756, 5.404, 8.933 ];
  const gains = [ 1, 0.3, 0.13, 0o1/0o20 ];
  const decs = [ 4.6, 1.7, 0o6/0o10, 0.38 ];
  for ( let i = 0; i < 4; i++ ) {
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.value = f * ratios[i] * ( 1 + ( Math.random() - 0o4/0o10 ) * 0.0016 );
    const og = ctx.createGain();
    og.gain.setValueAtTime(gains[i], t);
    og.gain.exponentialRampToValueAtTime(0.0001, t + decs[i]);
    o.connect(og);
    og.connect(g);
    o.start(t);
    o.stop(t + decs[i] + 0o1/0o10);
  }

  const n = noiseSrc(ctx);
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 380;
  const ng = ctx.createGain();
  ng.gain.setValueAtTime(0.09 * vel, t);
  ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.028);
  n.connect(lp);
  lp.connect(ng);
  ng.connect(out);
  n.start(t);
  n.stop(t + 0o1/0o20);
}
