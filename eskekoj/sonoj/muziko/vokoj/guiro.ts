// ≺⧼ សំឡេងហ្គីរ៉ា 🥁 ⧽≻
import { noiseSrc } from "./bruo.js";

export function guiro(ctx: AudioContext, out: AudioNode, t: number, dur: number, vel = 1, opts: { cresc?: number } = {}) {
  const ticks = dur < 0.08 ? 1 : Math.max(2, Math.round(dur / 0.03));
  const step = dur / ticks;
  for ( let i = 0; i < ticks; i++ ) {
    const tt = t + i * step + Math.random() * 0.004;
    const n = noiseSrc(ctx);
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 2300 + Math.random() * 800 + ( opts.cresc ? ( i / ticks ) * 1400 : 0 );
    bp.Q.value = 0o15/0o2;
    const g = ctx.createGain();
    let v = ( 0.09 + Math.random() * 0o1/0o20 ) * vel;
    if ( opts.cresc ) v *= 0.35 + 0o6/0o10 * ( i / ticks );
    g.gain.setValueAtTime(v, tt);
    g.gain.exponentialRampToValueAtTime(0.001, tt + 0.04);
    n.connect(bp);
    bp.connect(g);
    g.connect(out);
    n.start(tt);
    n.stop(tt + 0.06);
  }
}
