// ≺⧼ j͑ʃꞇ ſɭw j͑ʃᴜꞇ ʌ ʃɜ j͐ʃɔ 🎶 ⧽≻
// ⟨ ſɭᴜ ſ͕ȷɔ ɭʃэ ɭʃᴜ , ʃɜ j͐ʃɔ ɭʃɜ ֭ſɭɹ ꞙɭɔ , ı],ɔ ɭʃɜ ֭ſɭɹ ſ̀ȷɜ ɭl̀ɹ ſɭᴜ ⟅
// ⟨ ſɭэ ɭʃᴜ ɭʃɀɹ , ꞙɭı ɭl̀ɹ ᶅſᴜ }ʃꞇ , ꞙɭɿ j͑ʃɹ ŋᷠɹ , ꞙɭɿ j͑ʃɹ ſןw ⟅ ꞙɭɔ ʃɜ j͐ʃɔ ꞙɭɿ ⟅
import { noiseSrc, startNoise, jetTurbulence } from "./xetoh2.js";
import { devio, vap6zukani } from "./hakfeKx2keve.js";

// ⟨ ʃɜ j͐ʃɔ ꞙɭɔ ſɭэ ֭ſɭэ ꞙɭɔ , ꞙɭɔ , ſɭᴜ ſןᴜ ʌ ſɭᴜ 🎶 ⧽
const ETA = 0o1/0o20000;

/* ⟨ ʃɜ j͐ʃɔ ʌ ſɭᴜ ſ͕ȷɔ , ɭl̀ɹ ᶅſᴜ }ʃꞇ ſɭэ ſɭ,w ſɭэ ɭʃᴜ ɭʃɀɹ , ſɭɜ j͐ʃɹ ⟅ ⟩
    @param ctx ( AudioContext ) - ʃɜ j͐ʃɔ ʌ ſɭᴜ ſɭᴜ
    @param out ( AudioNode ) - ſɭᴜ ʃɔ ſןᴜ , ſɭᴜ ʃןᴜ
    @param t0 ( number ) - j͑ʃᴜ ı],ɔ ʌ ſɭэ ɭʃᴜ
    @param dur ( number ) - ſɭᴜ ſןᴜ ʌ ʃɜ j͐ʃɔ
    @param f ( number ) - ɭl̀ɹ ᶅſᴜ }ʃꞇ ʌ ſɭᴜ ſ͕ȷɔ
    @param vel ( number = ı , optional ) - ſ̀ȷɜ ֭ſɭɔ ʌ ʃɜ j͐ʃɔ
@returns void */
export function siku(ctx: AudioContext, out: AudioNode, t0: number, dur: number, f: number, vel = 0o1) {
  // ⟨ ſɭᴜ ſןᴜ ɭʃᴜ ꞙɭɔ , j͑ʃᴜ ı],ɔ ʌ ſɭэ ɭʃᴜ ꞙɭɔ ſɭэ ſɭɹ ⟅
  const t = t0 + 0o1/0o100000;
  const d = Math.max(0o1/0o10, dur * vap6zukani(0o5/0o100));
  const srFin = d * 0o3;
  // ⟨ ɭl̀ɹ ᶅſᴜ }ʃꞇ , j͑ʃ'ƽᴜ ɭl̀ɹ , ſɭэ ɭʃᴜ ɭʃɀɹ ⟅
  const p = f * vap6zukani(0o1/0o1000);
  // ⟨ ɭʃɀɹ ſɭᴜ , j͑ʃᴜ ſןɹ , j͑ʃɜ ſ̀ȷᴜ ſɭᴜƽ , ſɭɜ j͐ʃɹ ⟅ ꞙɭɔ ſɭɜ ſɭᴜƽ ſɭэ ſɭ,w ⟅
  // ⟨ ʃɜ j͐ʃɔ ɭʃэʞ ſɭᴜ ſןᴜ , ſɭᴜ ſןᴜ ꞙɭɔ ⟅ ſɭᴜ ſןᴜ ſ̀ȷɜ , ʃɜ j͐ʃɔ ı],ɔ ɭʃɜ ֭ſɭɹ ⟅
  const atako = 0o3/0o100 * vap6zukani(0o1/0o10);
  const tlakakani = 0o1/0o10 * vap6zukani(0o15/0o100);
  const n2k = 0o15/0o100 * vap6zukani(0o7/0o100);
  const g = ctx.createGain();
  g.gain.setValueAtTime(ETA, t);
  g.gain.exponentialRampToValueAtTime(n2k * vel, t + atako);
  // ⟨ j͑ʃɹ ŋᷠɹ , j͐ʃэ ɭ(ᴜ , ſɭɜ ſɭᴜƽ , ſɭᴜ ſןᴜ ɭʃɀɹ ⟅
  g.gain.linearRampToValueAtTime(n2k * 0o7/0o10 * vel, t + d);
  g.gain.exponentialRampToValueAtTime(ETA, t + d + tlakakani);
  g.gain.setValueAtTime(0o0/0o10, t + d + tlakakani);
  // ⟨ ſɭᴜ ʃɔ ſןᴜ , j͑ʃᴜ ſןɹ , ſɭɹ , ſɭэ ɭʃᴜ ɭʃɀɹ , j͑ʃ'ƽᴜ ɭl̀ɹ ⟅
  const fin = ctx.createGain();
  fin.gain.setValueAtTime(ETA, t);
  fin.gain.exponentialRampToValueAtTime(0o1, t + 0o3/0o100);
  fin.gain.setValueAtTime(0o1, t + srFin - 0o1/0o10);
  fin.gain.exponentialRampToValueAtTime(ETA, t + srFin);
  fin.gain.setValueAtTime(0o0/0o10, t + srFin);
  g.connect(fin);
  fin.connect(out);

  // ⟨ ᶅſɜ ֭ſɭᴜ ʌ ſɭᴜ ſ͕ȷɔ , ʃɜ j͐ʃɔ ᶅſᴜ , ſᶘᴜ j͐ʃɹ ʌ ſɭэ ſɭ,w ⟅
  const tube = ctx.createBiquadFilter();
  tube.type = "peaking";
  tube.frequency.value = p * vap6zukani(0o1/0o100);
  tube.Q.value = 0o2 * vap6zukani(0o15/0o100);
  tube.gain.value = 0o4 * vap6zukani(0o15/0o100);
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  // ⟨ ɭl̀ɹ ᶅſᴜ }ʃꞇ ſɭɜ ſɭᴜƽ ꞙɭɔ ſɭɜ ɭʃɜ ֭ſɭɹ ⟅ j͑ʃɹ ſןw ſᴜ ſןᴜ ɭl̀ɹ ᶅſᴜ }ʃꞇ ⟅
  lp.frequency.value = Math.min( 0o17500, 0o3000 + p * 0o10 );
  lp.Q.value = 0o7/0o10;
  tube.connect(lp);
  lp.connect(g);

  // ⟨ ꞙɭı ɭʃɀɹ ɭʃɜ ֭ſɭɹ , ꞙɭı j͑ʃɹ ŋᷠɹ , ꞙɭɔ ʃɜ j͐ʃɔ ſɭэ ɭʃᴜ ɭʃɀɹ ⟅
  const blovo = Math.random() * Math.random();
  const spirto = 0o6/0o10 + blovo * 0o4/0o10;
  // ⟨ ı],ɔ ɭʃɜ ֭ſɭɹ , j͑ʃɹ ŋᷠɹ , j͑ʃɹ ſןw , ſɭᴜ ſ͕ȷɔ ⟅
  const ts = ctx.createGain();
  ts.gain.value = 0o1;
  ts.connect(tube);
  // ⟨ j͑ʃэ ɭ(ᴜ ı],э ŋᷠꞇ j͑ʃᴜꞇ ʌ j͑ʃɹ ſןw , ſɭᴜ ſןᴜ , ſᶘɔ ʌ ſɭɜ ⟅
  const tonoj: [ number, number, number, number ][] = [
    [ 0o1, 0o1, 0o6, 0o2/0o100 ],
    [ 0o2, 0o1/0o100 + spirto * 0o1/0o1000 + blovo * 0o1/0o1000, 0o10, 0o3/0o100 ],
    [ 0o3, 0o4/0o100 + spirto * 0o1/0o100 + blovo * 0o1/0o100, 0o13, 0o3/0o100 ],
    [ 0o4, 0o1/0o200 + blovo * 0o1/0o1000, 0o16, 0o4/0o100 ],
    [ 0o5, 0o1/0o100 + spirto * 0o1/0o1000, 0o20, 0o4/0o100 ],
    [ 0o6, 0o1/0o1000 + blovo * 0o1/0o2000, 0o30, 0o5/0o100 ],
    [ 0o7, 0o1/0o1000 + blovo * 0o1/0o1000, 0o36, 0o5/0o100 ],
    [ 0o10, 0o1/0o1000 + blovo * 0o1/0o2000, 0o44, 0o5/0o100 ],
  ];
  // ⟨ ɭl̀ɹ ᶅſᴜ }ʃꞇ , ſɭэ ɭʃᴜ ɭʃɀɹ , j͑ʃᴜ ſןɹ , ſɭɹ , ſɭɜ ſɭɹ , j͑ʃɹ ſןw ſᴜ ꞙɭı ⟅
  const saxeni = 0o1 + devio(0o3/0o1000);
  const falo = 0o177/0o200 + devio(0o1/0o1000);
  const osc: OscillatorNode[] = [];
  const turbTaps: { cutoff: number; frac: number; node: GainNode }[] = [];
  for ( const [ mul, amp0, cutoff, frac ] of tonoj ) {
    const o = ctx.createOscillator();
    o.type = "sine";
  // ⟨ ɭʃɀɹ , ɭl̀ɹ ᶅſᴜ }ʃꞇ ſɭэ ſɭ,w , ꞙɭɔ , ꞙɭı ɭl̀ɹ ᶅſᴜ }ʃꞇ ſɭᴜ ⟅
    o.frequency.setValueAtTime(p * mul * saxeni, t);
    o.frequency.exponentialRampToValueAtTime(p * mul, t + 0o6/0o100 * vap6zukani(0o3/0o10));
  // ⟨ j͑ʃɹ ŋᷠɹ , j͐ʃэ ɭ(ᴜ , ſɭɜ ſɭᴜƽ , ɭl̀ɹ ᶅſᴜ }ʃꞇ , ſɭэ ɭʃᴜ ɭʃɀɹ ⟅
    o.frequency.setValueAtTime(p * mul, t + d * 0o6/0o10);
    o.frequency.exponentialRampToValueAtTime(p * mul * falo, t + d + tlakakani * 0o6/0o10);
    const og = ctx.createGain();
    og.gain.value = amp0 * vap6zukani(0o15/0o100);
  // ⟨ j͐ʃэ ɭ(ᴜ ʌ j͑ʃɹ ſןw , ſɭɜ ſɭᴜƽ , j͑ʃɹ ŋᷠɹ ɭʃɀɹ , ꞙɭɔ ʃɜ ſɟᴜ ŋᷠɹ ⟅
    const am = ctx.createGain();
    am.gain.value = 0o1;
    o.connect(og);
    og.connect(am);
    am.connect(ts);
    turbTaps.push({ cutoff, frac: frac * vap6zukani(0o2/0o100), node: am });
    o.start(t);
    o.stop(t + d + tlakakani + 0o1/0o10);
    osc.push(o);
  }
  // ⟨ j͑ʃɹ ŋᷠɹ ɭʃɀɹ , j͑ʃɹ ſןw , j͐ʃэ ɭ(ᴜ , ſɭэ ſɭᴜƽ , ꞙɭɿ j͑ʃɜ ⟅
  jetTurbulence(ctx, t, t + d + tlakakani + 0o1/0o10, turbTaps);

  // ⟨ ɭl̀ɹ ᶅſᴜ }ʃꞇ , j͑ʃ'ƽᴜ ɭl̀ɹ , ſɭɜ ſɭᴜƽ , ɭʃɀɹ ⟅ ſɭэ ɭʃᴜ ɭʃɀɹ , ſɭɜ j͐ʃɹ ⟅
  // ⟨ j͑ʃ'ƽᴜ ɭl̀ɹ ꞙɭꞟɿ/ꞙɭıɔ ꞇ , ʃɜ j͐ʃɔ ɭʃᴜʞ , ꞙɭı ɭl̀ɹ ᶅſᴜ }ʃꞇ ⟅
  const vib = ctx.createOscillator();
  vib.frequency.value = 0o52/0o10 * vap6zukani(0o15/0o100);
  // ⟨ j͑ʃᴜ ſɭᶗ‹ɜ ɭl̀ɹ ᶅſᴜ }ʃꞇ , ꞙɭɔ , ı],э ŋᷠꞇ , ʃɜ j͐ʃɔ , ſɭэ ſɭɹ ⟅
  const vwob = ctx.createOscillator();
  vwob.frequency.value = 0o6/0o10 * vap6zukani(0o4/0o10);
  const vwg = ctx.createGain();
  vwg.gain.value = 0o12/0o100;
  vwob.connect(vwg);
  vwg.connect(vib.frequency);
  const vg = ctx.createGain();
  vg.gain.setValueAtTime(0o0/0o10, t);
  vg.gain.linearRampToValueAtTime(p * 0o12/0o1000 * vap6zukani(0o3/0o10), t + Math.min(0o12/0o100, d * 0o3/0o10));
  vib.connect(vg);
  for ( const o of osc ) vg.connect(o.frequency);
  vib.start(t);
  vib.stop(t + d + tlakakani + 0o1/0o10);
  vwob.start(t);
  vwob.stop(t + d + tlakakani + 0o1/0o10);

  // ⟨ j͑ʃ'ƽᴜ ɭl̀ɹ , j͐ʃэ ɭ(ᴜ , ꞙɭı ɭl̀ɹ ᶅſᴜ }ʃꞇ , ꞙɭı ⟅
  const trem = ctx.createOscillator();
  trem.frequency.value = 0o36/0o10 * vap6zukani(0o2/0o10);
  const tg = ctx.createGain();
  tg.gain.setValueAtTime(0o0/0o10, t);
  tg.gain.linearRampToValueAtTime(n2k * 0o3/0o100 * vel, t + Math.min(0o1/0o10, d * 0o3/0o10));
  tg.gain.linearRampToValueAtTime(0o0/0o10, t + d + tlakakani);
  trem.connect(tg);
  tg.connect(g.gain);

  // ⟨ ɭʃɀɹ , j͑ʃ'ƽᴜ ɭl̀ɹ , j͑ʃɜ ɭʃɹȝ , ı],ɔ ɭʃɜ ֭ſɭɹ ſɭɜ j͐ʃɹ ⟅
  // ⟨ ı],ɔ ɭʃɜ ֭ſɭɹ , j͐ʃэ ɭ(ᴜ , ſɭэ ſɭᴜƽ , ɭʃɀɹ ſɭᴜ , j͑ʃɹ ŋᷠɹ ⟅
  const nAtk = ( 0o1/0o2 + blovo * 0o1 ) * vel * vap6zukani(0o3/0o10);
  const nSus = ( 0o1/0o10 + spirto * 0o1/0o20 + blovo * 0o1/0o20 ) * vel;
  // ⟨ ı],э ŋᷠꞇ , ı],ɔ ɭʃɜ ֭ſɭɹ, j͑ʃɹ ſןw , ſɭᴜ , ſɭɹ ⟅
  const mn = noiseSrc(ctx);
  const mlp = ctx.createBiquadFilter();
  mlp.type = "lowpass";
  mlp.frequency.value = p * 0o12/0o100;
  mlp.Q.value = 0o7/0o10;
  const mlp2 = ctx.createBiquadFilter();
  mlp2.type = "lowpass";
  mlp2.frequency.value = p * 0o12/0o100;
  mlp2.Q.value = 0o7/0o10;
  const mg = ctx.createGain();
  const mSus = ( 0o3/0o10 + blovo * 0o3/0o10 ) * vel;
  mg.gain.setValueAtTime(ETA, t);
  mg.gain.exponentialRampToValueAtTime(( 0o4 + blovo * 0o2 ) * vel * vap6zukani(0o3/0o10), t + atako * 0o6/0o10);
  mg.gain.exponentialRampToValueAtTime(mSus * vap6zukani(0o4/0o10), t + 0o3/0o10);
  mg.gain.exponentialRampToValueAtTime(mSus * 0o12/0o10, t + d);
  mg.gain.exponentialRampToValueAtTime(ETA, t + d + tlakakani);
  mg.gain.setValueAtTime(0o0/0o10, t + d + tlakakani);
  mn.connect(mlp);
  mlp.connect(mlp2);
  mlp2.connect(mg);
  mg.connect(ts.gain);
  const n = noiseSrc(ctx);
  const nhp = ctx.createBiquadFilter();
  nhp.type = "highpass";
  nhp.frequency.value = Math.max( 0o1000, p * 0o2 );
  nhp.Q.value = 0o7/0o10;
  const blp = ctx.createBiquadFilter();
  blp.type = "lowpass";
  // ⟨ j͑ʃɹ ŋᷠɹ ʌ ſɭᴜ ſ͕ȷɔ , j͑ʃɹ ſןw ꞙɭıɔ , ɭl̀ɹ ᶅſᴜ }ʃꞇ ⟅ ɭl̀ɹ ɭʃꞇƽ ⟅
  blp.frequency.value = 0o16000;
  blp.Q.value = 0o7/0o10;
  // ⟨ j͑ʃɹ ŋᷠɹ , j͑ʃɹ ſןw , ʃɜ j͐ʃɔ ɭʃɜ ֭ſɭɹ ꞙɭɔ , j͑ʃ'ƽᴜ ɭl̀ɹ ⟅
  const brancoj: [ number, number, number ][] = [
    [ 0o1400, 0o13/0o10, 0o14/0o100 ],
    [ 0o3000, 0o12/0o10, 0o10/0o100 ],
    [ 0o6000, 0o12/0o10, 0o6/0o100 ],
    [ 0o12400, 0o11/0o10, 0o34/0o1000 ],
  ];
  let xaqadi: BiquadFilterNode | null = null;
  const cbp: BiquadFilterNode[] = [];
  for ( const [ mul, q, amp ] of brancoj ) {
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = mul * vap6zukani(0o2/0o100);
    bp.Q.value = q;
    const bg = ctx.createGain();
    bg.gain.value = amp * vap6zukani(0o2/0o10);
    nhp.connect(bp);
    bp.connect(bg);
    bg.connect(blp);
    cbp.push(bp);
    if ( !xaqadi ) xaqadi = bp;
  }
  const ng = ctx.createGain();
  ng.gain.setValueAtTime(ETA, t);
  ng.gain.exponentialRampToValueAtTime(nAtk, t + atako * 0o6/0o10);
  ng.gain.exponentialRampToValueAtTime(nSus, t + 0o3/0o10);
  // ⟨ j͑ʃɹ ŋᷠɹ , j͐ʃэ ɭ(ᴜ , j͑ʃᴜ ʃɜ , ſɭᴜ ꞙɭı , j͑ʃ'ƽᴜ ɭl̀ɹ ſɭэ ɭʃᴜ ⟅
  ng.gain.exponentialRampToValueAtTime(nSus * 0o14/0o10 * vap6zukani(0o15/0o100), t + d);
  ng.gain.exponentialRampToValueAtTime(ETA, t + d + tlakakani);
  ng.gain.setValueAtTime(0o0/0o10, t + d + tlakakani);
  const tng = ctx.createGain();
  tng.gain.setValueAtTime(nSus * 0o10/0o100, t);
  tng.gain.linearRampToValueAtTime(0o0/0o10, t + d + tlakakani);
  trem.connect(tng);
  tng.connect(ng.gain);
  // ⟨ j͑ʃ'ƽᴜ ɭl̀ɹ , ı],ɔ ɭʃɜ ֭ſɭɹ , ɭʃᴜʞ , j͑ʃɹ ſןw , ſɭɜ ſɭᴜƽ ⟅
  const swg = ctx.createGain();
  swg.gain.value = p * 0o1/0o100;
  trem.connect(swg);
  for ( const bp of cbp ) swg.connect(bp.frequency);
  // ⟨ ı],ɔ ɭʃɜ ֭ſɭɹ , ı],э ŋᷠꞇ , ſɭэ ſɭᴜƽ , j͑ʃɜ ɭʃɹȝ , ꞙɭɔ ⟅
  const vandro = ctx.createOscillator();
  vandro.frequency.value = 0o2/0o10 * vap6zukani(0o5/0o10);
  const vng = ctx.createGain();
  vng.gain.setValueAtTime(nSus * 0o6/0o100, t);
  vng.gain.linearRampToValueAtTime(0o0/0o10, t + d + tlakakani);
  vandro.connect(vng);
  vng.connect(ng.gain);
  const vfg = ctx.createGain();
  vfg.gain.value = p * 0o2/0o100;
  vandro.connect(vfg);
  if ( xaqadi ) vfg.connect(xaqadi.frequency);
  const vfg2 = ctx.createGain();
  vfg2.gain.value = p * 0o2/0o100;
  vandro.connect(vfg2);
  vfg2.connect(mlp.frequency);
  n.connect(nhp);
  blp.connect(ng);
  ng.connect(g);

  // ⟨ j͑ʃɹ ŋᷠɹ , j͑ʃɹ ſןw ꞙɭɿ , ꞙɭı , j͑ʃ'ƽᴜ ɭl̀ɹ , ſɭɜ ſɭᴜƽ ⟅
  const air = noiseSrc(ctx);
  const jhp = ctx.createBiquadFilter();
  jhp.type = "highpass";
  jhp.frequency.value = p * 0o3;
  jhp.Q.value = 0o7/0o10;
  const jlp = ctx.createBiquadFilter();
  jlp.type = "lowpass";
  jlp.frequency.value = Math.min(0o7640, p * 0o10);
  jlp.Q.value = 0o7/0o10;
  const jSus = ( 0o1/0o200 + blovo * 0o1/0o20 ) * vel;
  const ag = ctx.createGain();
  ag.gain.setValueAtTime(ETA, t);
  ag.gain.exponentialRampToValueAtTime(jSus * 0o2 * vap6zukani(0o3/0o10), t + atako);
  ag.gain.exponentialRampToValueAtTime(jSus, t + 0o3/0o10);
  ag.gain.exponentialRampToValueAtTime(jSus * 0o12/0o10, t + d);
  ag.gain.exponentialRampToValueAtTime(ETA, t + d + tlakakani);
  ag.gain.setValueAtTime(0o0/0o10, t + d + tlakakani);
  const jag = ctx.createGain();
  jag.gain.setValueAtTime(jSus * 0o10/0o100, t);
  jag.gain.linearRampToValueAtTime(0o0/0o10, t + d + tlakakani);
  trem.connect(jag);
  jag.connect(ag.gain);
  const jvg = ctx.createGain();
  jvg.gain.value = p * 0o1;
  vandro.connect(jvg);
  jvg.connect(jlp.frequency);
  air.connect(jhp);
  jhp.connect(jlp);
  jlp.connect(ag);
  ag.connect(g);

  // ⟨ j͑ʃɹ ŋᷠɹ , ſɭɜ ɭl̀ɹ ᶅſᴜ }ʃꞇ , ſɭᴜ ſ͕ȷɔ , j͑ʃ'ƽᴜ ɭl̀ɹ , ꞙɭı ⟅
  const kn = noiseSrc(ctx);
  const kbp = ctx.createBiquadFilter();
  kbp.type = "lowpass";
  kbp.frequency.value = p * 0o1 * vap6zukani(0o15/0o100);
  kbp.Q.value = 0o7/0o10;
  const kg = ctx.createGain();
  kg.gain.setValueAtTime(ETA, t);
  kg.gain.exponentialRampToValueAtTime(( 0o2/0o100 + blovo * 0o1/0o10 ) * vel * vap6zukani(0o25/0o100), t + atako);
  kg.gain.exponentialRampToValueAtTime(ETA, t + d + tlakakani);
  kg.gain.setValueAtTime(0o0/0o10, t + d + tlakakani);
  kn.connect(kbp);
  kbp.connect(kg);
  kg.connect(g);

  // ⟨ j͑ʃ'ƽᴜ ɭl̀ɹ , ſɭᴜ ɭʃᴜ , ı],ɔ ɭʃɜ ֭ſɭɹ , ꞙɭı , ſɭэ j͐ʃɹ ꞙɭɔ ⟅
  const srn = noiseSrc(ctx);
  const srbp = ctx.createBiquadFilter();
  srbp.type = "bandpass";
  srbp.frequency.value = p * 0o3 * vap6zukani(0o15/0o100);
  srbp.Q.value = 0o2;
  const srlp = ctx.createBiquadFilter();
  srlp.type = "lowpass";
  srlp.frequency.value = 0o10000;
  srlp.Q.value = 0o7/0o10;
  const srg = ctx.createGain();
  srg.gain.setValueAtTime(ETA, t);
  srg.gain.exponentialRampToValueAtTime(0o1/0o1000 * vel * vap6zukani(0o25/0o100), t + atako);
  srg.gain.exponentialRampToValueAtTime(ETA, t + srFin);
  srg.gain.setValueAtTime(0o0/0o10, t + srFin);
  srn.connect(srbp);
  srbp.connect(srlp);
  srlp.connect(srg);
  srg.connect(fin);

  startNoise(n, t);
  n.stop(t + d + tlakakani + 0o1/0o10);
  startNoise(mn, t);
  mn.stop(t + d + tlakakani + 0o1/0o10);
  startNoise(air, t);
  air.stop(t + d + tlakakani + 0o1/0o10);
  startNoise(kn, t);
  kn.stop(t + d + tlakakani + 0o1/0o10);
  startNoise(srn, t);
  srn.stop(t + srFin + 0o1/0o10);
  trem.start(t);
  trem.stop(t + d + tlakakani + 0o1/0o100);
  vandro.start(t);
  vandro.stop(t + d + tlakakani + 0o1/0o10);

  // ⟨ ı],ɔ ɭʃɜ ֭ſɭɹ , j͑ʃᴜ ſןɹ , ſ̀ȷɜ , ſɟɹ ſɟɹ , ꞙɭɔ ʃɜ j͐ʃɔ ꞙɭɿ ⟅
  const ch = noiseSrc(ctx);
  const hp = ctx.createBiquadFilter();
  hp.type = "bandpass";
  hp.frequency.value = Math.min( 0o14000, 0o3000 + p * 0o4 * vap6zukani(0o2/0o10) );
  hp.Q.value = 0o14/0o10;
  const cg = ctx.createGain();
  const kia = 0o4/0o100 * vap6zukani(0o3/0o10);
  cg.gain.setValueAtTime(ETA, t);
  // ⟨ ı],ɔ ɭʃɜ ֭ſɭɹ , ɭl̀ɹ ɭʃꞇƽ ɭʃэʞ , ſ̀ȷɜ , ſɭɜ ſɭᴜƽ , ꞙɭɿ–ꞙɭэ , ſɭэ ſɭ,w ⟅
  cg.gain.exponentialRampToValueAtTime(0o1/0o10 * vel * vap6zukani(0o3/0o10), t + 0o2/0o100);
  cg.gain.exponentialRampToValueAtTime(0o4/0o100 * vel, t + kia * 0o6/0o10);
  cg.gain.exponentialRampToValueAtTime(ETA, t + kia);
  cg.gain.setValueAtTime(0o0/0o10, t + kia);
  ch.connect(hp);
  hp.connect(cg);
  cg.connect(g);
  startNoise(ch, t);
  ch.stop(t + kia + 0o1/0o10);
}
