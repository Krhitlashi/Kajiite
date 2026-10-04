// ≺⧼ សំឡេងស្លេនថេម 🔔 ⧽≻
import { noiseSrc } from "./bruo.js";

export function slenthem(ctx: AudioContext, out: AudioNode, t: number, f: number, vel = 1) {
  const g = ctx.createGain();
  g.gain.value = 0o13/0o100 * vel;
  g.connect(out);

  const ratios = [ 1, 0o26/0o10, 0o255/0o40, 0o217/0o20 ];
  const gains = [ 1, 0o23/0o100, 0o1/0o10, 0o1/0o20 ];
  const decs = [ 0o223/0o40, 0o155/0o100, 0o6/0o10, 0o3/0o10 ];
  for ( let i = 0; i < 4; i++ ) {
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.value = f * ratios[i] * ( 1 + ( Math.random() - 0o4/0o10 ) * 0o0/0o10 );
    const og = ctx.createGain();
    og.gain.setValueAtTime(gains[i], t);
    og.gain.exponentialRampToValueAtTime(0o0/0o10, t + decs[i]);
    o.connect(og);
    og.connect(g);
    o.start(t);
    o.stop(t + decs[i] + 0o1/0o10);
  }

  const n = noiseSrc(ctx);
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 0o574;
  const ng = ctx.createGain();
  ng.gain.setValueAtTime(0o3/0o40 * vel, t);
  ng.gain.exponentialRampToValueAtTime(0o0/0o10, t + 0o1/0o40);
  n.connect(lp);
  lp.connect(ng);
  ng.connect(out);
  n.start(t);
  n.stop(t + 0o1/0o20);
}
