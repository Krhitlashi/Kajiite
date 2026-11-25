// ≺⧼ ֭ſɭꞇ ᶅſɔ j͑ʃᴜꞇ ʌ ʃɜ j͐ʃɔ 🏹 ⧽≻
// ⟨ ſɭɔ˞ɜⅎ , j͑ʃɜ ſɭ,ᴜ , ɭʃꞇƽ , ſɭᴜ ʃןᴜ , ſןᴜȝ ᶅſw ſɭɹ , ſɭɔ˞ɜⅎ ſɭᴜ ɭl̀ɹ ⟅
//   ſɭɔ˞ɜⅎ , ʃɜ j͐ʃɔ ʌ ſɭэ ɭʃᴜ , ꞙɭɔ ı],ɔ ɭʃɜ ֭ſɭɹ ⟅ ſɭɔ˞ɜⅎ , j͑ʃɹ ſןw ꞙɭɿ ⟅
//   j͑ʃɹ ſןw , ɭʃэʞ , ſɭɜ ſɭᴜƽ , j͑ʃᴜ ſɭᴜ , j͑ʃɹ ſןw , j͑ʃɹ ſןw ʌ ſɭэ ɭʃᴜ ⟅
//   ſɭɜ j͐ʃɹ , ʃɜ j͐ʃɔ , ſɭᴜ ʃןᴜ , ı],ɔ ɭʃɜ ֭ſɭɹ , j͑ʃɜ ſɭ,ᴜ ⟅
//   j͑ʃᴜ ſɭᶗ‹ɜ , ſɭᴜ ʃןᴜ , ſɭᴜ ʃןᴜ , j͑ʃɔ ֭ſɭɔ , ſɭэ ɭʃᴜ ɭʃᴜ , ſɭэ ɭʃᴜ ⟅
// ⟨ ſɭɔ˞ɜⅎ , j͑ʃᴜ ʃɜ , ɭl̀ɹ ᶅſᴜ }ʃꞇ ſɭɜ ſɭᴜƽ , f ⟅
//
// ⟨ ꞙɭɔ ʃɜ j͐ʃɔ ſɟᴜ j͐ʃw ⟅ ⟩
// ⟨ ſɭɔ˞ɜⅎ , ꞙɭɿ ſɟɹ ᶅſɹȝ , ꞙɭı ɭl̀ɹ ᶅſᴜ }ʃꞇ , ꞙɭı , ſɭɜ ſɭᴜƽ
//   j͑ʃᴜ ſɭᶗ‹ɜ , ꞙɭɔ , ꞙɭı ⟅ j͑ʃɹ ſןw , ꞙɭı , j͑ʃᴜ ı],ɔ ꞙɭı ,
//   ɭl̀ɹ ᶅſᴜ }ʃꞇ , ſɭᴜ ʃןᴜ , ſɟɹ ᶅſɹȝ , ꞙɭɔ ⟅ j͑ʃᴜ ı],ɔ , ı],ɔ ɭʃɜ ֭ſɭɹ ,
//   ſɭᴜ ſןᴜ ʌ ſɭᴜ , ſɭᴜ ʃɜ j͐ʃɔ ʌ j͑ʃᴜ ſןɹ , ꞙɭɔ ſɭᴜ ʃɜ j͐ʃɔ ʌ ɭl̀ɹ ⟅ j͑ʃɜ ſɭ,ᴜ
//   ſןᴜȝ ᶅſw ſɭɹ , ɭʃэʞ , ꞙɭɔ ſɭᴜ ʃᶘɔ ⟅ 📃 ⟩
import { noiseSrc, startNoise } from "./xetoh2.js";
import { vap6zukani } from "./hakfeKx2keve.js";

// ⟨ ʃɜ j͐ʃɔ ꞙɭɔ ſɭэ ֭ſɭэ ꞙɭɔ , ꞙɭɔ , ſɭᴜ ſןᴜ ʌ ſɭᴜ 🎶 ⧽
const ETA = 0o1/0o20000;

// ⟨ ſɭɔ˞ɜⅎ , ſ̀ȷɜ ֭ſɭɔ , j͑ʃɹ ſןw , ɭʃэʞ , ꞙɭı j͑ʃɹ ſןw ,
//   ꞙɭɔ j͑ʃᴜ ſɭᴜ , j͑ʃɹ ſןw , j͑ʃɜ ſɭᴜƽ , ⟅
const INHARMONIO = 0o1/0o4000;

// ⟨ ſɭɔ˞ɜⅎ , ꞙɭɿ ſɟɹ ᶅſɹȝ , ꞙɭı ſɟɹ ᶅſɹȝ , ꞙɭı ɭl̀ɹ ᶅſᴜ }ʃꞇ ,
//   j͑ʃɹ ſןw , ſɭɜ ſɭᴜƽ , ꞙɭɿ , j͑ʃᴜ ſɭᶗ‹ɜ ⟅ j͐ʃэ ɭ(ᴜ ꞙɭı ,
//   ſɭᴜ ſןᴜ , ꞙɭɿ ſɟɹ ᶅſɹȝ , ⟅
const DUPLEX = 0o6;

// ⟨ j͑ʃɹ ſןw , ꞙɭı , ꞙɭı ɭʃэ ɭʃᴜ , ꞙɭı
//   ꞙɭı , j͑ʃᴜ ſןɹ ɭl̀ɹ , ꞙɭɔ ⟅ ꞙɭɔ j͑ʃᴜ ı],ɔ ꞙɭı ⟅ ⟩
const DISPERSO = 0o5/0o1000;

/* ⟨ ʃɜ j͐ʃɔ ʌ hiwe , j͑ʃɜ ſɭ,ᴜ , ſɭᴜ ʃןᴜ , ſɭɔ˞ɜⅎ ⟅ ſןᴜȝ ᶅſw ſɭɹ ,
   ſɭɔ˞ɜⅎ , ſɭᴜ ɭl̀ɹ , ʃɜ j͐ʃɔ ʌ ſɭэ ɭʃᴜ , j͑ʃɹ ſןw , j͑ʃɹ ſןw ,
   ı],ɔ ɭʃɜ ֭ſɭɹ , j͑ʃɜ ſɭ,ᴜ , ſɭᴜ ʃןᴜ ɭʃᴜ , ſɭᴜ ʃןᴜ , j͑ʃᴜ ſןɹ ,
   ɭʃꞇƽ , ſɭᴜ ʃןᴜ , ſɭᴜ ʃןᴜ , ꞙɭц , ꞙɭɔ , ſɭᴜ ſןᴜ ⟅
   ſɭɜ j͐ʃɹ , ſɭᴜ ʃןᴜ , ı],ɔ ɭʃɜ ֭ſɭɹ , ɭʃɜ ɭʃɹȝ , ſɭɜ j͐ʃɹ , ꞙɭı ⟅
    @param ctx ( AudioContext ) - ʃɜ j͐ʃɔ ʌ ſɭᴜ ſɭᴜ
    @param out ( AudioNode ) - ſɭᴜ ʃɔ ſןᴜ
    @param t ( number ) - j͑ʃᴜ ı],ɔ ʌ ſɭэ ɭʃᴜ
    @param dur ( number ) - ſɭᴜ ſןᴜ ʌ ſɭᴜ ʃןᴜ
    @param f ( number ) - ɭl̀ɹ ᶅſᴜ }ʃꞇ ʌ ſɭɔ˞ɜⅎ
    @param vel ( number = ı , optional ) - ſ̀ȷɜ ֭ſɭɔ ʌ ſɭᴜ ʃןᴜ
@returns void */
export function hiwe(ctx: AudioContext, out: AudioNode, t: number, dur: number, f: number, vel = 1) {
  const d = Math.max(0o1/0o10, dur) * vap6zukani(0o7/0o100);
  const tlakakani = t + d;
  // ⟨ ɭl̀ɹ ᶅſᴜ }ʃꞇ ʌ ſɭɔ˞ɜⅎ , ꞙɭı , ſɭᴜ ſןᴜ , ſɭᴜ ſɭ,w , j͑ʃᴜ ⟅ ⟩
  const p = f * vap6zukani(0o1/0o600);
  const atako = 0o1/0o70 * vap6zukani(0o2/0o10);
  const malatako = 0o30/0o1000;
  const vivo = 0o5/0o10 * vap6zukani(0o2/0o10);
  // ⟨ ſɭᴜ ʃןᴜ , ɭl̀ɹ ᶅſᴜ }ʃꞇ , j͑ʃᴜ ʃɜƽ , ꞙɭı ⟅ ꞙɭэ ſɭᴜ ,
  //   ſɭᴜ ʃןᴜ , ꞙɭı , ʃɜ j͐ʃɔ ʌ ſɭᴜ ʃןᴜ ⟅ ⟩
  const gcamutsa = 0o1/0o600 * vap6zukani(0o5/0o10);
  // ⟨ ſɭᴜ ʃןᴜ , ſ̀ȷɜ ֭ſɭɔ , ɭʃэʞ , ʃɜ j͐ʃɔ ⟅ ⟩
  const dci = 0o7/0o10 + 0o3/0o10 * vel;
  // ⟨ ſɭᴜ ʃןᴜ , ſɭɔ˞ɜⅎ , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ſ̀ȷɜ ֭ſɭɔ , ꞙɭı ,
  //   ſɭᴜ ſןᴜ , ſɭᴜ ſןᴜ , j͑ʃɹ ſןw , ⟅ ⟩
  const raqa = 0o2/0o10 + Math.random() * 0o5/0o10;

  const g = ctx.createGain();
  g.gain.value = 0o30/0o100 * vel * vap6zukani(0o7/0o100);
  g.connect(out);

  // ⟨ ſɭᴜ ſןᴜ ʌ ſɭᴜ , ꞙɭɿ ɭl̀ɹ ᶅſᴜ }ʃꞇ , ʃɜ j͐ʃɔ , j͑ʃᴜ ſɭᴜ ,
  //   ꞙɭɔ ɭl̀ɹ ᶅſᴜ }ʃꞇ ſɭɔ˞ɜⅎ ꞙɭı ⟅ ⟩
  const soq = ctx.createBiquadFilter();
  soq.type = "peaking";
  soq.frequency.value = 0o240 * vap6zukani(0o15/0o100);
  soq.Q.value = 0o11/0o10;
  soq.gain.value = 0o3;
  const korpo2 = ctx.createBiquadFilter();
  korpo2.type = "peaking";
  korpo2.frequency.value = 0o1100 * vap6zukani(0o15/0o100);
  korpo2.Q.value = 0o14/0o10;
  korpo2.gain.value = 0o2;
  soq.connect(korpo2);
  korpo2.connect(g);

  // ⟨ ɭʃꞇƽ ſɭᴜ ʃןᴜ , ꞙɭɔ , ꞙɭц ı],э ŋᷠꞇ ɭʃɜ ⟅ j͐ʃэ ɭ(ᴜ , ꞙɭı ,
  //   ʃɜ j͐ʃɔ ꞙɭɔ ı],ɔ ɭʃɜ ֭ſɭɹ , j͐ʃэ ɭ(ᴜ , ⟅
  //   ꞙɭц ı],э ŋᷠꞇ , ꞙɭц , ꞙɭı , ſɭᴜ ſןᴜ ꞙɭı ⟅ ⟩
  const trem = ctx.createGain();
  trem.gain.value = 0o1;
  trem.connect(soq);
  // ⟨ ſɭᴜ ʃןᴜ , ſɭэ ɭʃᴜ , ſɭᴜ ʃןᴜ , j͐ʃэ ɭ(ᴜ , ſɭɔ˞ɜⅎ , ꞙɭı ,
  //   ſɭᴜ ʃןᴜ , ſɭᴜ ʃןᴜ , j͑ʃɹ ſןw , ꞙɭɔ ı],ɔ ɭʃɜ ֭ſɭɹ ⟅ ⟩
  const hakzapawa = ctx.createGain();
  hakzapawa.gain.value = 0o1;
  hakzapawa.connect(trem);
  const manaj: [ number, number ][] = [
    [ 0o25/0o10, 0o25/0o1000 ],
    [ 0o13/0o20, 0o22/0o1000 ],
    [ 0o35/0o20, 0o11/0o1000 ],
  ];
  for ( const [ hz, amplekso ] of manaj ) {
    const m = ctx.createOscillator();
    m.type = "sine";
    m.frequency.value = hz * vap6zukani(0o2/0o10);
    const mg = ctx.createGain();
    mg.gain.value = amplekso * vap6zukani(0o2/0o100);
    m.connect(mg);
    mg.connect(trem.gain);
    m.start(t);
    m.stop(tlakakani + vivo + 0o1/0o10);
  }

  // ⟨ ɭl̀ɹ ᶅſᴜ }ʃꞇ ʌ ſɭɔ˞ɜⅎ , ɭʃꞇƽ , ſɭᴜ ʃןᴜ , ⟅ ꞙɭı ,
  //   j͑ʃɹ ſןw ꞙɭı , ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı , ⟅ ⟩
  const vibro = ctx.createGain();
  vibro.gain.value = 0o1;
  const vibroj: [ number, number ][] = [
    [ 0o45/0o10, 0o3 ],
    [ 0o7/0o10, 0o2 ],
  ];
  for ( const [ hz, centoj ] of vibroj ) {
    const v = ctx.createOscillator();
    v.type = "sine";
    v.frequency.value = hz * vap6zukani(0o2/0o10);
    const vg = ctx.createGain();
    vg.gain.value = centoj * vap6zukani(0o2/0o10);
    v.connect(vg);
    vg.connect(vibro);
    v.start(t);
    v.stop(tlakakani + vivo + 0o1/0o10);
  }

  // ⟨ ſɭɔ˞ɜⅎ , ʃɜ j͐ʃɔ ʌ ſɭэ ɭʃᴜ , ſɭᴜ ſןᴜ , ꞙɭı ,
  //   j͑ʃɹ ſןw , ɭʃэʞ , ſɭɜ ſɭᴜƽ , ſɭɔ˞ɜⅎ , ſɭэ ɭʃᴜ ⟅
  //   j͐ʃэ ɭ(ᴜ , j͑ʃɹ ſןw , j͑ʃɹ ſןw ʌ ſɭэ ɭʃᴜ ⟅ ⟩
  const hakek: { n: number; mul: number; s2karanu: number; detuno: number; malfruo: number }[] = [];
  let tlunakani = 0;
  for ( let n = 0o1; n <= 0o20; n++ ) {
    const mul = n * Math.sqrt( 0o1 + INHARMONIO * n * n );
    if ( p * mul > 0o10000 ) break;
    const maxema = 0o3/0o20 + 0o17/0o20 * Math.abs( Math.sin( n * Math.PI * raqa ) );
    const s2karanu = Math.pow( n, -0o11/0o10 ) * maxema;
    // ⟨ j͑ʃɹ ſןw , ꞙɭɿ ſɟɹ ᶅſɹȝ , j͐ʃэ ɭ(ᴜ , ꞙɭı , j͐ʃэ ɭ(ᴜ ,
    //   ɭl̀ɹ ᶅſᴜ }ʃꞇ , ꞙɭɿ , ⟅ j͑ʃᴜ ſɭᶗ‹ɜ , ꞙɭɔ , ⟅ ⟩
    if ( n <= DUPLEX ) {
      const detuno = 0o2 + Math.random() * 0o2;
      hakek.push({ n, mul, s2karanu: s2karanu * 0o4/0o10, detuno: -detuno, malfruo: Math.random() * DISPERSO });
      hakek.push({ n, mul, s2karanu: s2karanu * 0o4/0o10, detuno: detuno * vap6zukani(0o25/0o100), malfruo: Math.random() * DISPERSO });
    } else hakek.push({ n, mul, s2karanu, detuno: 0, malfruo: Math.random() * DISPERSO });
    tlunakani += s2karanu;
  }
  const xiix2q = 0o34/0o100 / Math.max( tlunakani, 0o1 );
  for ( const { n, mul, s2karanu, detuno, malfruo } of hakek ) {
    const fn = p * mul;
    const t0 = t + malfruo;
    const o = ctx.createOscillator();
    o.type = "sine";
    // ⟨ j͑ʃɹ ſןw , ꞙɭɔ , ꞙɭı , ɭl̀ɹ ᶅſᴜ }ʃꞇ , ſɭᴜ ſןᴜ , ꞙɭı ⟅ ⟩
    o.detune.value = detuno === 0 ? ( Math.random() * 0o2 - 0o1 ) * 0o1 : detuno;
    vibro.connect(o.detune);
    // ⟨ j͑ʃᴜ ı],ɔ , ſɭɜ ſɭᴜƽ , ſɭᴜ ʃןᴜ , ɭl̀ɹ ᶅſᴜ }ʃꞇ , ɭʃꞇƽ , ꞙɭı ⟅ ⟩
    o.frequency.setValueAtTime(fn * 0o77/0o100, t0);
    o.frequency.exponentialRampToValueAtTime(fn, t0 + atako * 0o4);
    const viva = Math.max(vivo * Math.pow(n, -0o5/0o10), 0o3/0o20);
    o.frequency.linearRampToValueAtTime(fn * (0o1 + gcamutsa), tlakakani + viva * 0o6/0o10);
    const og = ctx.createGain();
    const amp = s2karanu * xiix2q * vap6zukani(0o5/0o100);
    // ⟨ j͐ʃэ ɭ(ᴜ , ꞙɭı , j͑ʃᴜ ſןɹ , ſɭɜ ſɭᴜƽ , j͐ʃэ ɭ(ᴜ , ꞙɭı ⟅ ſɭɔ˞ɜⅎ
    //   , j͑ʃᴜ ı],ɔ , j͐ʃэ ɭ(ᴜ ꞙɭı ꞙɭɔ ⟅ ⟩
    const svelo = 0o1 + Math.random() * 0o12/0o100;
    const tlakak2 = Math.min( t0 + atako + 0o6/0o100, tlakakani - 0o1/0o100 );
    og.gain.setValueAtTime(ETA, t0);
    og.gain.exponentialRampToValueAtTime(Math.max(amp * svelo, ETA), t0 + atako);
    og.gain.exponentialRampToValueAtTime(Math.max(amp, ETA), tlakak2);
    og.gain.setValueAtTime(Math.max(amp, ETA), tlakakani);
    og.gain.exponentialRampToValueAtTime(Math.max(amp * 0o3/0o10, ETA), tlakakani + 0o1/0o10);
    og.gain.exponentialRampToValueAtTime(ETA, tlakakani + viva);
    og.gain.setValueAtTime(0o0/0o10, tlakakani + viva);
    o.connect(og);
    og.connect(hakzapawa);
    o.start(t0);
    o.stop(tlakakani + viva + 0o1/0o10);
  }

  // ⟨ ı],ɔ ɭʃɜ ֭ſɭɹ , j͑ʃɜ ſɭ,ᴜ , ſᶘɔ , ı],ɔ ɭʃɜ ֭ſɭɹ ɭʃэʞ ꞙɭɔ ,
  //   ſɭᴜ ſןᴜ , ı],ɔ ɭʃɜ ֭ſɭɹ , ɭl̀ɹ ᶅſᴜ }ʃꞇ ʌ ſɭɔ˞ɜⅎ , ⟅
  //   ſᶘɔ , ſɭᴜ ſןᴜ , ɭʃꞇƽ ſɭᴜ ʃןᴜ , ſɭᴜ ʃןᴜ , ŋᷠwȝ , ⟅ ⟩
  const n = noiseSrc(ctx);
  const nhp = ctx.createBiquadFilter();
  nhp.type = "highpass";
  nhp.frequency.value = Math.max(0o100, p * 0o5/0o10 * vap6zukani(0o2/0o10));
  const nlp = ctx.createBiquadFilter();
  nlp.type = "lowpass";
  nlp.frequency.setValueAtTime(Math.min(0o3400, p * 0o7 * dci * vap6zukani(0o2/0o10)), t);
  nlp.frequency.linearRampToValueAtTime(Math.min(0o3400, p * 0o5 * dci), tlakakani);
  nlp.Q.value = 0o5/0o10;
  // ⟨ ʃɜ j͐ʃɔ ʌ ſɭᴜ ʃןᴜ , j͑ʃᴜ ſɭᶗ‹ɜ , ſɭᴜ ʃןᴜ , ꞙɭı ſɭᴜ ſןᴜ ,
  //   ſᶘɔ , ɭʃэʞ , ꞙɭɔ , ꞙɭɔ ʃɜ j͐ʃɔ , j͐ʃэ ɭ(ᴜ ſɭᴜ ſןᴜ ,
  //   ꞙɭɔ ʃɜ j͐ʃɔ ſᶘɔ , ʃɜ j͐ʃɔ ꞙɭı , ſɭᴜ ſןᴜ , ⟅ ⟩
  const skrap = ctx.createGain();
  skrap.gain.value = 0o5/0o10;
  const sirr = ctx.createOscillator();
  sirr.type = "sawtooth";
  const seheni = 0o26 + 0o44 * vel;
  sirr.frequency.setValueAtTime(seheni * 0o12/0o10 * vap6zukani(0o2/0o10), t);
  sirr.frequency.linearRampToValueAtTime(seheni * 0o7/0o10, tlakakani);
  const sirrLp = ctx.createBiquadFilter();
  sirrLp.type = "lowpass";
  sirrLp.frequency.value = 0o150 * vap6zukani(0o2/0o10);
  sirrLp.Q.value = 0o5/0o10;
  const sirrG = ctx.createGain();
  sirrG.gain.value = 0o3/0o10;
  sirr.connect(sirrLp);
  sirrLp.connect(sirrG);
  sirrG.connect(skrap.gain);
  // ⟨ j͐ʃэ ɭ(ᴜ , ſɭᴜ ſןᴜ , ſɭᴜ ʃןᴜ , ſɭᴜ ʃןᴜ , ſɭᴜ ſןᴜ , ꞙɭı ,
  //   ꞙɭı , ʃɜ j͐ʃɔ ſɟᴜ j͐ʃw ⟅ ⟩
  const sirrK = ctx.createGain();
  sirrK.gain.value = 0o1/0o10;
  sirrLp.connect(sirrK);
  sirrK.connect(hakzapawa.gain);
  const nbp = ctx.createBiquadFilter();
  nbp.type = "bandpass";
  nbp.frequency.value = p * vap6zukani(0o1/0o100);
  nbp.Q.value = 0o2 * vap6zukani(0o2/0o10);
  const nbg = ctx.createGain();
  nbg.gain.value = 0o6/0o100;
  const ng = ctx.createGain();
  // ⟨ master gain , ſ̀ȷɜ ֭ſɭɔ ʌ ſɭᴜ ʃןᴜ , ꞙɭı , ꞙɭɔ vel ꞙɭɿ ⟅ ⟩
  const namp = 0o10/0o100 * dci * vap6zukani(0o25/0o100);
  ng.gain.setValueAtTime(ETA, t);
  ng.gain.linearRampToValueAtTime(namp, t + atako);
  ng.gain.setValueAtTime(namp, tlakakani - malatako);
  ng.gain.linearRampToValueAtTime(ETA, tlakakani);
  ng.gain.setValueAtTime(0o0/0o10, tlakakani);
  n.connect(nhp);
  nhp.connect(nlp);
  nlp.connect(skrap);
  skrap.connect(ng);
  n.connect(nbp);
  nbp.connect(nbg);
  nbg.connect(ng);
  ng.connect(trem);

  // ⟨ j͑ʃᴜ ı],ɔ , j͑ʃɜ ſɭ,ᴜ , ſɭɔ˞ɜⅎ , ı],ɔ ɭʃɜ ֭ſɭɹ , ſɭᴜ ſןᴜ
  //   ſɭᴜ ſןᴜ ʌ ſɭᴜ , j͑ʃᴜ ı],ɔ , j͑ʃᴜ ſןɹ , ꞙɭɔ ɭl̀ɹ ᶅſᴜ }ʃꞇ ɭʃɜ ⟅ ʃɜ j͐ʃɔ
  //   j͑ʃɜ ſɭᴜƽ , ɭl̀ɹ ᶅſᴜ }ʃꞇ , ꞙɭı , ſɭᴜ ſןᴜ ʌ ɭʃꞇƽ ⟅ ⟩
  const th = ctx.createOscillator();
  th.type = "sine";
  th.frequency.setValueAtTime(0o140 * vap6zukani(0o15/0o100), t);
  th.frequency.exponentialRampToValueAtTime(0o70, t + 0o5/0o100);
  const thg = ctx.createGain();
  thg.gain.setValueAtTime(ETA, t);
  thg.gain.exponentialRampToValueAtTime(Math.max(0o4/0o100 * vap6zukani(0o2/0o10), ETA), t + 0o1/0o100);
  thg.gain.exponentialRampToValueAtTime(ETA, t + 0o6/0o100);
  thg.gain.setValueAtTime(0o0/0o10, t + 0o6/0o100);
  th.connect(thg);
  thg.connect(g);

  const kn = noiseSrc(ctx);
  const khp = ctx.createBiquadFilter();
  khp.type = "bandpass";
  khp.frequency.value = Math.min(0o10000, p * 0o10) * vap6zukani(0o3/0o10);
  khp.Q.value = 0o11/0o10;
  const klp = ctx.createBiquadFilter();
  klp.type = "lowpass";
  klp.frequency.value = 0o4400 * vap6zukani(0o2/0o10);
  klp.Q.value = 0o5/0o10;
  const kg = ctx.createGain();
  kg.gain.setValueAtTime(0o45/0o1000 * vap6zukani(0o4/0o10), t);
  kg.gain.exponentialRampToValueAtTime(ETA, t + 0o3/0o100);
  kg.gain.setValueAtTime(0o0/0o10, t + 0o3/0o100);
  kn.connect(khp);
  khp.connect(klp);
  klp.connect(kg);
  kg.connect(trem);

  // ⟨ ſɭɜ j͐ʃɹ , ɭʃꞇƽ , j͑ʃɜ ſɭ,ᴜ , ſɭɔ˞ɜⅎ , ꞙɭɔ ,
  //   ʃɜ j͐ʃɔ ʌ ſɭᴜ ʃןᴜ , ꞙɭı , ɭl̀ɹ ᶅſᴜ }ʃꞇ ſɭɜ ſɭᴜƽ ⟅ ⟩
  const ln = noiseSrc(ctx);
  const lbp = ctx.createBiquadFilter();
  lbp.type = "bandpass";
  lbp.frequency.value = Math.min(0o10000, p * 0o6) * vap6zukani(0o3/0o10);
  lbp.Q.value = 0o14/0o10;
  const lg = ctx.createGain();
  lg.gain.setValueAtTime(ETA, tlakakani);
  lg.gain.exponentialRampToValueAtTime(Math.max(0o2/0o100 * dci, ETA), tlakakani + 0o1/0o100);
  lg.gain.exponentialRampToValueAtTime(ETA, tlakakani + 0o12/0o100);
  lg.gain.setValueAtTime(0o0/0o10, tlakakani + 0o12/0o100);
  ln.connect(lbp);
  lbp.connect(lg);
  lg.connect(trem);
  const tl = ctx.createOscillator();
  tl.type = "sine";
  tl.frequency.setValueAtTime(0o110 * vap6zukani(0o15/0o100), tlakakani);
  tl.frequency.exponentialRampToValueAtTime(0o60, tlakakani + 0o4/0o100);
  const tlg = ctx.createGain();
  tlg.gain.setValueAtTime(ETA, tlakakani);
  tlg.gain.exponentialRampToValueAtTime(Math.max(0o2/0o100 * vap6zukani(0o2/0o10), ETA), tlakakani + 0o1/0o100);
  tlg.gain.exponentialRampToValueAtTime(ETA, tlakakani + 0o5/0o100);
  tlg.gain.setValueAtTime(0o0/0o10, tlakakani + 0o5/0o100);
  tl.connect(tlg);
  tlg.connect(g);

  startNoise(n, t);
  startNoise(kn, t);
  startNoise(ln, tlakakani);
  n.stop(tlakakani + 0o1/0o10);
  kn.stop(t + 0o5/0o100);
  ln.stop(tlakakani + 0o2/0o10);
  sirr.start(t);
  sirr.stop(tlakakani + 0o1/0o10);
  th.start(t);
  th.stop(t + 0o1/0o10);
  tl.start(tlakakani);
  tl.stop(tlakakani + 0o1/0o10);
}
