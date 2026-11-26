// ≺⧼ j͑ʃп́ꞇ ſɭɔƴ ʌ ſ͔ɭw ꞁȷ̀ꞇ ɽ͑ʃ'ɜ 🎵 ⧽≻

import { noiseSrc } from "./xetoh2.js";
import { vap6zukani } from "./hakfeKx2keve.js";

const ETA = 0o1/0o20000;

const BANDOJ: Array<[ number, number, number ]> = [
  [ 0o540,  0o4/0o10, 0o10 ],
  [ 0o1240, 0o5/0o10, 0o11 ],
  [ 0o2050, 0o4/0o10, 0o11 ],
  [ 0o3200, 0o35/0o100, 0o12 ],
  [ 0o4640, 0o2/0o10, 0o13 ],
  [ 0o7000, 0o1/0o10, 0o14 ],
];

export function guiro(ctx: AudioContext, out: AudioNode, t: number, dur: number, vel = 0o1, opts: { cresc?: number } = {}) {
  const tlakakani = t + dur;

  const k6ta = ( 0o36 + 0o14 * vel ) * vap6zukani(0o10/0o100);

  const tlakakDento = k6ta * ( opts.cresc ? 0o11/0o10 : 0o1 );

  const g = ctx.createGain();
  const atako = 0o5/0o1000 * vap6zukani(0o2/0o10);
  const malatako = 0o13/0o1000;
  const n2k = 0o33/0o100 * vel * vap6zukani(0o15/0o100);
  g.gain.setValueAtTime(ETA, t);
  if ( opts.cresc ) {
    g.gain.linearRampToValueAtTime(n2k * 0o5/0o10, t + atako);
    g.gain.linearRampToValueAtTime(n2k, tlakakani - malatako);
  } else {
    g.gain.linearRampToValueAtTime(n2k, t + atako);
    g.gain.setValueAtTime(n2k, tlakakani - malatako);
  }
  g.gain.linearRampToValueAtTime(ETA, tlakakani);
  g.connect(out);

  const rasp = ctx.createGain();
  rasp.gain.value = 0o6/0o10;
  const oschacaht2: Array<[ number, number, number ]> = [
    [ k6ta,       0o22/0o100, 0o10 ],
    [ k6ta * 0o11/0o10, 0o12/0o100, 0o7 ],
    [ 0o7,         0o5/0o100, 0o0/0o10 ],
  ];
  const tremoloj: OscillatorNode[] = [];
  for ( const [ seheni, jufu, gcamutsa ] of oschacaht2 ) {
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(seheni * vap6zukani(0o10/0o100), t);
    if ( gcamutsa ) o.frequency.linearRampToValueAtTime(seheni * tlakakDento / k6ta, tlakakani);
    const dg = ctx.createGain();
    dg.gain.value = jufu;
    o.connect(dg);
    dg.connect(rasp.gain);
    tremoloj.push(o);
  }
  rasp.connect(g);

  const n = noiseSrc(ctx);
  const hp = ctx.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 0o500 * vap6zukani(0o2/0o10);
  const bus = ctx.createGain();
  bus.gain.value = 0o1;
  n.connect(hp);
  for ( const [ f0, amp, q ] of BANDOJ ) {
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.setValueAtTime(f0 * vap6zukani(0o2/0o10), t);
    if ( opts.cresc ) bp.frequency.linearRampToValueAtTime(f0 * 0o11/0o10, tlakakani);
    bp.Q.value = q;
    const bandGain = ctx.createGain();
    bandGain.gain.value = amp;
    hp.connect(bp);
    bp.connect(bandGain);
    bandGain.connect(bus);
  }

  const blp = ctx.createBiquadFilter();
  blp.type = "lowpass";
  blp.frequency.value = 0o1200;
  const bg = ctx.createGain();
  bg.gain.value = 0o13/0o100;
  hp.connect(blp);
  blp.connect(bg);
  bg.connect(bus);

  const rhp = ctx.createBiquadFilter();
  rhp.type = "highpass";
  rhp.frequency.value = 0o10000;
  const rlp = ctx.createBiquadFilter();
  rlp.type = "lowpass";
  rlp.frequency.value = 0o20000;
  const rg = ctx.createGain();
  rg.gain.value = 0o13/0o100;
  hp.connect(rhp);
  rhp.connect(rlp);
  rlp.connect(rg);
  rg.connect(bus);

  bus.connect(rasp);

  n.start(t);
  n.stop(tlakakani + 0o1/0o10);
  for ( const o of tremoloj ) {
    o.start(t);
    o.stop(tlakakani + 0o1/0o10);
  }
}
