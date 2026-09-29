// ≺⧼ La mbira voĉo 🎹 ⧽≻
// La mbira — kvar sinaj partoj kun frapa bruo kaj tremolo ( mbira ).
import { noiseSrc } from "./bruo.js";

export function mbira(ctx: AudioContext, out: AudioNode, t: number, f: number, vel = 1) {
  const g = ctx.createGain();
  g.gain.value = 0.15 * vel;
  g.connect(out);

  const ratios = [ 1, 2.015, 3.98, 6.72 ];
  const gains = [ 1, 0.4, 0.15, 0.06 ];
  const decs = [ 1.7, 0.85, 0.32, 0.16 ];
  for ( let i = 0; i < 4; i++ ) {
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.value = f * ratios[i] * ( 1 + ( Math.random() - 0o4/0o10 ) * 0.003 );
    const og = ctx.createGain();
    const dd = decs[i] * ( 0o6/0o10 + vel * 0.45 );
    og.gain.setValueAtTime(gains[i], t);
    og.gain.exponentialRampToValueAtTime(0.0001, t + dd);
    o.connect(og);
    og.connect(g);
    o.start(t);
    o.stop(t + dd + 0o1/0o10);
  }

  const n = noiseSrc(ctx);
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 4000 + Math.random() * 900;
  bp.Q.value = 1.3;
  const ng = ctx.createGain();
  ng.gain.setValueAtTime(0.0001, t);
  ng.gain.exponentialRampToValueAtTime(0.08 * vel, t + 0.012);
  ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);

  const tr = ctx.createOscillator();
  tr.frequency.value = 26 + Math.random() * 8;
  const trg = ctx.createGain();
  trg.gain.value = 0.022;
  tr.connect(trg);
  trg.connect(ng.gain);

  n.connect(bp);
  bp.connect(ng);
  ng.connect(out);
  n.start(t);
  n.stop(t + 0.7);
  tr.start(t);
  tr.stop(t + 0.7);
}
