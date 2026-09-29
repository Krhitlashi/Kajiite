// ≺⧼ La bula voĉo 🐂 ⧽≻
// La bulo — triangula tono tra bando kun malrapida kirlado kaj spira bruo
// ( bull ).
import { noiseSrc } from "./bruo.js";

export function bull(ctx: AudioContext, out: AudioNode, t: number, dur: number, f: number, vel = 1) {
  const g = ctx.createGain(), pk = 0.13 * vel;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(pk, t + dur * 0.32);
  g.gain.setValueAtTime(pk, t + dur * 0.72);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  g.connect(out);

  const am2 = ctx.createGain();
  am2.gain.value = 0.72;
  const who = ctx.createOscillator();
  who.frequency.value = 1.25 + Math.random() * 0.3;
  const wg = ctx.createGain();
  wg.gain.value = 0.26;
  who.connect(wg);
  wg.connect(am2.gain);

  const o = ctx.createOscillator();
  o.type = "triangle";
  o.frequency.setValueAtTime(f * 0.82, t);
  o.frequency.exponentialRampToValueAtTime(f, t + dur * 0.3);
  o.frequency.exponentialRampToValueAtTime(f * 0.9, t + dur);

  const wob = ctx.createOscillator();
  wob.frequency.value = 2.6;
  const wobg = ctx.createGain();
  wobg.gain.value = f * 0.045;
  wob.connect(wobg);
  wobg.connect(o.frequency);

  const swell = ctx.createOscillator();
  swell.frequency.value = 0.21;
  const swg = ctx.createGain();
  swg.gain.value = 0.9;
  swell.connect(swg);
  swg.connect(wob.frequency);

  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = f * 2.4;
  bp.Q.value = 1.2;

  o.connect(bp);
  bp.connect(am2);
  am2.connect(g);

  const n = noiseSrc(ctx);
  const nf = ctx.createBiquadFilter();
  nf.type = "bandpass";
  nf.frequency.value = f * 1.6;
  nf.Q.value = 0.9;
  const ng = ctx.createGain();
  ng.gain.value = 0o1/0o20;
  n.connect(nf);
  nf.connect(ng);
  ng.connect(am2);

  [ o, wob, swell, who, n ].forEach(x => { x.start(t); x.stop(t + dur + 0.15); });
}
