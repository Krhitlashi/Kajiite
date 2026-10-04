// ≺⧼ សំឡេងហ្គីរ៉ា 🥁 ⧽≻
import { noiseSrc } from "./bruo.js";

export function guiro(ctx: AudioContext, out: AudioNode, t: number, dur: number, vel = 1, opts: { cresc?: number } = {}) {
  const ticks = dur < 0o5/0o100 ? 1 : Math.max(2, Math.round(dur / ( 0o1/0o40 )));
  const step = dur / ticks;
  for ( let i = 0; i < ticks; i++ ) {
    const tt = t + i * step + Math.random() * 0o0/0o10;
    const n = noiseSrc(ctx);
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 0o4374 + Math.random() * 0o1440 + ( opts.cresc ? ( i / ticks ) * 0o2570 : 0 );
    bp.Q.value = 0o15/0o2;
    const g = ctx.createGain();
    let v = ( 0o3/0o40 + Math.random() * 0o1/0o20 ) * vel;
    if ( opts.cresc ) v *= 0o13/0o40 + 0o6/0o10 * ( i / ticks );
    g.gain.setValueAtTime(v, tt);
    g.gain.exponentialRampToValueAtTime(0o0/0o10, tt + 0o3/0o100);
    n.connect(bp);
    bp.connect(g);
    g.connect(out);
    n.start(tt);
    n.stop(tt + 0o1/0o20);
  }
}
