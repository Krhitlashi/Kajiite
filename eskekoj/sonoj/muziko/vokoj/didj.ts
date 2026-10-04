// ≺⧼ សំឡេងដីជេរីឌូ 🐘 ⧽≻
import { noiseSrc } from "./bruo.js";

export function didj(ctx: AudioContext, out: AudioNode, t: number, dur: number, f: number, vel = 1, toot = false) {
  const g = ctx.createGain(), pk = ( toot ? 0o3/0o40 : 0o5/0o40 ) * vel;
  g.gain.setValueAtTime(0o0/0o10, t);
  g.gain.exponentialRampToValueAtTime(pk, t + ( toot ? 0o1/0o20 : 0o55/0o100 ));
  g.gain.setValueAtTime(pk, t + Math.max(toot ? 0o1/0o20 : 0o63/0o100, dur - ( toot ? 0o5/0o100 : 0o35/0o40 )));
  g.gain.exponentialRampToValueAtTime(0o0/0o10, t + dur);
  g.connect(out);

  const o = ctx.createOscillator();
  o.type = "sawtooth";
  o.frequency.value = f;

  const sub = ctx.createOscillator();
  sub.type = "sine";
  sub.frequency.value = f;
  const sg = ctx.createGain();
  sg.gain.value = toot ? 0o5/0o40 : 0o4/0o10;

  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = toot ? 0o2570 : 0o1464;
  lp.Q.value = 0o55/0o40;

  const f1 = ctx.createBiquadFilter();
  f1.type = "bandpass";
  f1.frequency.value = toot ? 0o1666 : 0o714;
  f1.Q.value = toot ? 4 : 7;

  const f2 = ctx.createBiquadFilter();
  f2.type = "bandpass";
  f2.frequency.value = toot ? 0o3554 : 0o2032;
  f2.Q.value = 6;

  const mix = ctx.createGain();
  mix.gain.value = 0o63/0o100;

  o.connect(lp);
  sub.connect(sg);
  sg.connect(lp);
  lp.connect(mix);
  mix.connect(f1);
  f1.connect(g);
  mix.connect(f2);
  f2.connect(g);

  const extras: ( OscillatorNode | AudioBufferSourceNode )[] = [];
  if ( !toot ) {
    const l1 = ctx.createOscillator();
    l1.frequency.value = 0o7/0o100 + Math.random() * 0o5/0o100;
    const l1g = ctx.createGain();
    l1g.gain.value = 0o252;
    l1.connect(l1g);
    l1g.connect(f1.frequency);

    const l2 = ctx.createOscillator();
    l2.frequency.value = 0o1/0o20 + Math.random() * 0o1/0o20;
    const l2g = ctx.createGain();
    l2g.gain.value = 0o360;
    l2.connect(l2g);
    l2g.connect(f2.frequency);

    const am = ctx.createOscillator();
    am.frequency.value = 0o103/0o40 + Math.random() * 0o63/0o100;
    const amg = ctx.createGain();
    amg.gain.value = 0o1/0o20;
    am.connect(amg);
    amg.connect(mix.gain);

    const n = noiseSrc(ctx);
    const nf = ctx.createBiquadFilter();
    nf.type = "bandpass";
    nf.frequency.value = 0o404;
    nf.Q.value = 0o63/0o100;
    const ng = ctx.createGain();
    ng.gain.value = 0o1/0o100;
    n.connect(nf);
    nf.connect(ng);
    ng.connect(g);

    extras.push(l1, l2, am, n);
  }

  [ o, sub, ...extras ].forEach(x => { x.start(t); x.stop(t + dur + 0o5/0o40); });
}
