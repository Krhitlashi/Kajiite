// ≺⧼ ſ͔ɭw ꞁȷ̀ꞇ ɽ͑ʃ'ɜ j͑ʃᴜꞇ ʌ ʃɜ j͐ʃɔ 🥁 ⧽≻
// ⟨ ɭʃꞇƽ ʌ ſɭᴜ , j͑ʃɹ ŋᷠɹ ꞙɭı , ſɭэ ɭʃᴜ ʌ ſɭɔ ֭ſɭw ⟅ ſɭэ ɭʃᴜ ,
//   ꞙɭɔ ʃɜ j͐ʃɔ ʌ ſɭɔƽ ⟅ ſɭɜ ſɭ,w ʌ ſɭɔ ֭ſɭw , j͑ʃɹ ſןw ⟅ ꞙɭı , ɭʃэʞ ⟅
import { noiseSrc } from "./bruo.js";
import { faktoro } from "./vario.js";

// ⟨ ſɭᴜ j͐ʃэ ɭ(ᴜ ꞙɭɔ ⟅ ʃɜ j͐ʃɔ ſᶘɔ ⟅
const ETA = 0o1/0o20000;

// ⟨ ʃɜ j͐ʃɔ ʌ ſɭɜ ſɭ,w ʌ ſɭɔ ֭ſɭw ⟅ ꞙɭı , ⟅
const BANDOJ: Array<[ number, number, number ]> = [
  [ 0o540,  0o4/0o10, 0o10 ],
  [ 0o1240, 0o5/0o10, 0o11 ],
  [ 0o2050, 0o4/0o10, 0o11 ],
  [ 0o3200, 0o35/0o100, 0o12 ],
  [ 0o4640, 0o2/0o10, 0o13 ],
  [ 0o7000, 0o1/0o10, 0o14 ],
];

export function guiro(ctx: AudioContext, out: AudioNode, t: number, dur: number, vel = 1, opts: { cresc?: number } = {}) {
  const tlakakani = t + dur;
// ⟨ ꞙɭэɔ ɭʃэ ɭʃᴜ , ꞙɭı ⟅ ſɭᴜ j͑ʃᴜꞇ ꞙɭı ⟅
  const dento = ( 0o36 + 0o14 * vel ) * faktoro(0o10/0o100);
// ⟨ ſןᴜȝ ᶅſw ſɭɹ , ꞙɭı ⟅
  const finoDento = dento * ( opts.cresc ? 0o11/0o10 : 0o1 );

  const g = ctx.createGain();
  const atako = 0o5/0o1000 * faktoro(0o2/0o10);
  const malatako = 0o13/0o1000;
  const pinto = 0o33/0o100 * vel * faktoro(0o15/0o100);
  g.gain.setValueAtTime(ETA, t);
  if ( opts.cresc ) {
    g.gain.linearRampToValueAtTime(pinto * 0o5/0o10, t + atako);
    g.gain.linearRampToValueAtTime(pinto, tlakakani - malatako);
  } else {
    g.gain.linearRampToValueAtTime(pinto, t + atako);
    g.gain.setValueAtTime(pinto, tlakakani - malatako);
  }
  g.gain.linearRampToValueAtTime(ETA, tlakakani);
  g.connect(out);

// ⟨ ꞙɭц ſɭᴜ ſןᴜ , ꞙɭɔ ɭʃꞇƽ ʌ ſɭɔƽ ⟅
  const rasp = ctx.createGain();
  rasp.gain.value = 0o6/0o10;
  const osciloj: Array<[ number, number, number ]> = [
    [ dento,       0o22/0o100, 0o10 ],
    [ dento * 0o11/0o10, 0o12/0o100, 0o7 ],
    [ 0o7,         0o5/0o100, 0o0/0o10 ],
  ];
  const tremoloj: OscillatorNode[] = [];
  for ( const [ rapido, profundo, glito ] of osciloj ) {
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(rapido * faktoro(0o10/0o100), t);
    if ( glito ) o.frequency.linearRampToValueAtTime(rapido * finoDento / dento, tlakakani);
    const dg = ctx.createGain();
    dg.gain.value = profundo;
    o.connect(dg);
    dg.connect(rasp.gain);
    tremoloj.push(o);
  }
  rasp.connect(g);

// ⟨ j͑ʃɹ ŋᷠɹ , ꞙɭı , ⟅
  const n = noiseSrc(ctx);
  const hp = ctx.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 0o500 * faktoro(0o2/0o10);
  const bus = ctx.createGain();
  bus.gain.value = 0o1;
  n.connect(hp);
  for ( const [ f0, amp, q ] of BANDOJ ) {
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.setValueAtTime(f0 * faktoro(0o2/0o10), t);
    if ( opts.cresc ) bp.frequency.linearRampToValueAtTime(f0 * 0o11/0o10, tlakakani);
    bp.Q.value = q;
    const bandGain = ctx.createGain();
    bandGain.gain.value = amp;
    hp.connect(bp);
    bp.connect(bandGain);
    bandGain.connect(bus);
  }

// ⟨ ſɭᴜ ſɭ,w ꞙɭɔ , ʃɜ j͐ʃɔ ⟅
  const blp = ctx.createBiquadFilter();
  blp.type = "lowpass";
  blp.frequency.value = 0o1200;
  const bg = ctx.createGain();
  bg.gain.value = 0o13/0o100;
  hp.connect(blp);
  blp.connect(bg);
  bg.connect(bus);

// ⟨ ʃɜ j͐ʃɔ ɭʃᴜʞ ꞙɭı , ꞙɭɔ ⟅
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
