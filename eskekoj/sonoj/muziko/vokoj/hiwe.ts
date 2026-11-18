// ≺⧼ សំឡេងហ៊ីវេ 🏹 ⧽≻
// ផ្នែករលោងមួយត្រូវអូសតាមខ្សែ ។ ការកកិតចាប់រួចរអិលធ្វើឱ្យខ្សែញ័រ
// ហើយខ្សែនោះជាសំឡេងមេ មិនមែនសំឡេងកកិតទេ ។ ខ្សែពិតលឺផ្នែកលេខច្រើន ៖
// ផ្នែកខ្ពស់រលត់លឿនជាងផ្នែកទាប ហើយផ្នែកដែលមានថ្នាំងត្រង់កន្លែងអូស
// ត្រូវបាត់ ដូច្នេះសំឡេងប្រែតាមកន្លែងដែលដៃអូស ។ ខ្យល់កកិតជាស្រទាប់ទន់
// នៅក្រោមវា ហើយវាលោតញ័រលឿនតាមល្បឿនអូស ដូចហ៊ីបដែលរអិលធ្មេញ ។
// ខ្សែវែងជាងឮទាបជាងតាម f ។
//
// ⟨ កុំឱ្យឮជាម៉ាស៊ីន 📃 ⟩
// ⟨ ខ្សែពិតញ័រជាពីរទិស ៖ ទិសនីមួយៗមានកម្ពស់ខុសគ្នាបន្តិច ដូច្នេះផ្នែកទាប
//   លោតញ័រយឺតៗ មិននៅស្មើ ។ ផ្នែកទាំងអស់មិនចាប់ផ្ដើមព្រមគ្នាទេ ហើយកម្ពស់
//   ខ្សែរសាត់តិចៗ ដូចដៃកាន់ខ្សែមិននឹង ។ ពេលចាប់ សំឡេងរំខានខ្លីរត់ចូល
//   ប្រអប់ខ្សែ ៖ នោះជាសំឡេងនៃការប៉ះ មិនមែនស៊ីនបើកភ្លាម ។ ស្រទាប់កកិត
//   ចុះខ្សោយ និងច្រោះខ្លាំងជាងមុន ដើម្បីឱ្យវាឮជាខ្យល់ មិនមែនជាសំឡេងគែម 📃 ⟩
import { noiseSrc, startNoise } from "./bruo.js";
import { faktoro } from "./vario.js";

// ⟨ អិកស្ប៉ូណង់ស្យែលមិនអាចរំកិលទៅសូន្យ ប្រើតម្លៃតូចជំនួស 📃 ⟩
const ETA = 0o1/0o20000;

// ⟨ ខ្សែរឹងបន្តិច ដូច្នេះផ្នែកខ្ពស់ៗខ្ពស់ជាងពហុគុណពិតបន្តិច
//   ហើយមិនតម្រឹមនឹងផ្នែកទាបទេ 📃 ⟩
const INHARMONIO = 0o1/0o4000;

// ⟨ ខ្សែពិតមានពីរទិសញ័រ ៖ ទិសនីមួយៗមានកម្ពស់និងរយៈពេលរលត់ខុសគ្នាតិចៗ
//   បំបែកផ្នែកដែលទាបជាងចំនួននេះជាពីរ ដើម្បីឱ្យវាលោតញ័រ ។ កម្លាំងរួមដដែល
//   ព្រោះថាមពលខ្សែបែងចែករវាងពីរទិស 📃 ⟩
const DUPLEX = 0o6;

// ⟨ ផ្នែកនីមួយៗមិនចាប់ផ្ដើមព្រមគ្នាទេ ៖ ការខុសគ្នាប៉ុន្មានមីលីវិនាទី
//   ធ្វើឱ្យកំពូលដំបូងទន់ មិនឮជាចុច 📃 ⟩
const DISPERSO = 0o5/0o1000;

/* សំឡេងហ៊ីវេ ផ្នែករលោងអូសតាមខ្សែ ។ ការកកិតចាប់រអិលធ្វើឱ្យខ្សែរោទ៍
   ជាសំឡេងមេ ដែលមានផ្នែកលេខច្រើន ហើយថ្នាំងត្រង់កន្លែងអូសបិទផ្នែកខ្លះ ។
   ខ្យល់កកិតនៅក្រោម មានសំឡេងរអិលធ្មេញខ្លីៗ លឿនតាមកម្លាំងអូស ។
   ដៃអូសប្រែកម្លាំងជារលកយឺតបី មិនប្រែជាគ្រាប់ៗទេ ។
   ពេលឈប់អូស ខ្យល់កកិតស្ងាត់ភ្លាម តែខ្សែនៅរោទ៍បន្តិចទៀត ។
    @param ctx ( AudioContext ) - បរិយាកាសសំឡេង
    @param out ( AudioNode ) - ច្រកចេញ
    @param t ( number ) - ពេលចាប់ផ្ដើម
    @param dur ( number ) - រយៈពេលអូសជាវិនាទី
    @param f ( number ) - កម្ពស់ខ្សែជាហឺត
    @param vel ( number = 1 , optional ) - កម្លាំងអូស
@returns void */
export function hiwe(ctx: AudioContext, out: AudioNode, t: number, dur: number, f: number, vel = 1) {
  const d = Math.max(0o1/0o10, dur) * faktoro(0o7/0o100);
  const fino = t + d;
  // ⟨ កម្ពស់ខ្សែប្រែបន្តិច ទៅតាមការលៃតម្រូវ និងសីតុណ្ហភាព 📃 ⟩
  const p = f * faktoro(0o1/0o600);
  const atako = 0o1/0o70 * faktoro(0o2/0o10);
  const malatako = 0o30/0o1000;
  const vivo = 0o5/0o10 * faktoro(0o2/0o10);
  // ⟨ ផ្នែកអូសខិតទៅចុង ខ្សែរោទ៍ខ្ពស់ឡើងបន្តិច ៖ បួនសេនគឺគ្រប់គ្រាន់
  //   ធំជាងនេះឮដូចកាសែតរអិល 📃 ⟩
  const glito = 0o1/0o600 * faktoro(0o5/0o10);
  // ⟨ អូសខ្លាំង កកិតក្ដៅឡើង សំឡេងភ្លឺឡើងតាមកម្លាំង 📃 ⟩
  const brilo = 0o7/0o10 + 0o3/0o10 * vel;
  // ⟨ កន្លែងអូសលើខ្សែ ៖ ជិតស្ពានឮខ្លាំង កណ្តាលឮទន់
  //   ហើយថ្នាំងនៅទីនោះបិទផ្នែកលេខខ្លះ 📃 ⟩
  const loko = 0o2/0o10 + Math.random() * 0o5/0o10;

  const g = ctx.createGain();
  g.gain.value = 0o30/0o100 * vel * faktoro(0o7/0o100);
  g.connect(out);

  // ⟨ ប្រអប់ខ្សែ ៖ ពីរកំពូលទាបធ្វើឱ្យសំឡេងមានខ្លួន
  //   មិនស្តើងដូចសំឡេងខ្សែទទេ 📃 ⟩
  const korpo = ctx.createBiquadFilter();
  korpo.type = "peaking";
  korpo.frequency.value = 0o240 * faktoro(0o15/0o100);
  korpo.Q.value = 0o11/0o10;
  korpo.gain.value = 0o3;
  const korpo2 = ctx.createBiquadFilter();
  korpo2.type = "peaking";
  korpo2.frequency.value = 0o1100 * faktoro(0o15/0o100);
  korpo2.Q.value = 0o14/0o10;
  korpo2.gain.value = 0o2;
  korpo.connect(korpo2);
  korpo2.connect(g);

  // ⟨ ដៃអូសមិនស្មើ ៖ រលកយឺតបីបញ្ចូលគ្នា ប្រែកម្លាំងតិចៗ ជុំវិញ 0o1
  //   មិនប្រើសំឡេងរំខានប្រែកម្លាំង ព្រោះវាធ្វើឱ្យសំឡេងរដុបជាគ្រាប់
  //   ល្បឿនទាំងបីមិនចែកគ្នាចេញ ដូច្នេះការលោតមិនដដែលៗ 📃 ⟩
  const trem = ctx.createGain();
  trem.gain.value = 0o1;
  trem.connect(korpo);
  // ⟨ ខ្សែប៉ុណ្ណោះ ៖ ការរអិលធ្មេញបន្ថែមកម្លាំងចូលខ្សែរាល់ដងដែលវារអិល
  //   ដូច្នេះខ្សែខ្លួនឯងលោតញ័រតាមចង្វាក់នោះដែរ មិនត្រឹមតែខ្យល់កកិតទេ 📃 ⟩
  const kordoj = ctx.createGain();
  kordoj.gain.value = 0o1;
  kordoj.connect(trem);
  const manaj: [ number, number ][] = [
    [ 0o25/0o10, 0o25/0o1000 ],
    [ 0o13/0o20, 0o22/0o1000 ],
    [ 0o35/0o20, 0o11/0o1000 ],
  ];
  for ( const [ hz, amplekso ] of manaj ) {
    const m = ctx.createOscillator();
    m.type = "sine";
    m.frequency.value = hz * faktoro(0o2/0o10);
    const mg = ctx.createGain();
    mg.gain.value = amplekso * faktoro(0o2/0o100);
    m.connect(mg);
    mg.connect(trem.gain);
    m.start(t);
    m.stop(fino + vivo + 0o1/0o10);
  }

  // ⟨ កម្ពស់ខ្សែរសាត់បន្តិច ៖ ដៃទាញខ្សែប្រែកម្លាំង ដូច្នេះកម្ពស់លោតតិចៗ
  //   គិតជាសេន មិនមែនជាហឺត ដើម្បីឱ្យគ្រប់ផ្នែករសាត់ស្មើគ្នា 📃 ⟩
  const vibro = ctx.createGain();
  vibro.gain.value = 0o1;
  const vibroj: [ number, number ][] = [
    [ 0o45/0o10, 0o3 ],
    [ 0o7/0o10, 0o2 ],
  ];
  for ( const [ hz, centoj ] of vibroj ) {
    const v = ctx.createOscillator();
    v.type = "sine";
    v.frequency.value = hz * faktoro(0o2/0o10);
    const vg = ctx.createGain();
    vg.gain.value = centoj * faktoro(0o2/0o10);
    v.connect(vg);
    vg.connect(vibro);
    v.start(t);
    v.stop(fino + vivo + 0o1/0o10);
  }

  // ⟨ ខ្សែរោទ៍ជាសំឡេងមេ ៖ ផ្នែកលេខនីមួយៗរលត់រៀងៗខ្លួន
  //   ផ្នែកខ្ពស់រលត់លឿនជាងផ្នែកទាប ដូចខ្សែពិត ។
  //   កម្លាំងផ្នែកនីមួយៗគុណនឹងថ្នាំងត្រង់កន្លែងអូស 📃 ⟩
  const partoj: { n: number; mul: number; pezo: number; detuno: number; malfruo: number }[] = [];
  let sumo = 0;
  for ( let n = 0o1; n <= 0o20; n++ ) {
    const mul = n * Math.sqrt( 0o1 + INHARMONIO * n * n );
    if ( p * mul > 0o10000 ) break;
    const nodo = 0o3/0o20 + 0o17/0o20 * Math.abs( Math.sin( n * Math.PI * loko ) );
    const pezo = Math.pow( n, -0o11/0o10 ) * nodo;
    // ⟨ ផ្នែកទាបបំបែកជាពីរទិសញ័រ ៖ កម្លាំងរួមនៅដើម តែកម្ពស់ខុសគ្នា
    //   ប៉ុន្មានសេន ដូច្នេះវាលោតញ័រយឺតៗ ។ ទិសទីពីររលត់ខុសគ្នាតិច 📃 ⟩
    if ( n <= DUPLEX ) {
      const detuno = 0o2 + Math.random() * 0o2;
      partoj.push({ n, mul, pezo: pezo * 0o4/0o10, detuno: -detuno, malfruo: Math.random() * DISPERSO });
      partoj.push({ n, mul, pezo: pezo * 0o4/0o10, detuno: detuno * faktoro(0o25/0o100), malfruo: Math.random() * DISPERSO });
    } else partoj.push({ n, mul, pezo, detuno: 0, malfruo: Math.random() * DISPERSO });
    sumo += pezo;
  }
  const normo = 0o34/0o100 / Math.max( sumo, 0o1 );
  for ( const { n, mul, pezo, detuno, malfruo } of partoj ) {
    const fn = p * mul;
    const t0 = t + malfruo;
    const o = ctx.createOscillator();
    o.type = "sine";
    // ⟨ ផ្នែកដែលមិនបំបែកក៏មានកម្ពស់ខុសគ្នាតិចៗដែរ 📃 ⟩
    o.detune.value = detuno === 0 ? ( Math.random() * 0o2 - 0o1 ) * 0o1 : detuno;
    vibro.connect(o.detune);
    // ⟨ ចាប់ផ្ដើមទាបបន្តិច រួចឡើងដល់កម្ពស់ពិត ព្រោះដៃទាញខ្សែមុនពេលរអិល 📃 ⟩
    o.frequency.setValueAtTime(fn * 0o77/0o100, t0);
    o.frequency.exponentialRampToValueAtTime(fn, t0 + atako * 0o4);
    const viva = Math.max(vivo * Math.pow(n, -0o5/0o10), 0o3/0o20);
    o.frequency.linearRampToValueAtTime(fn * (0o1 + glito), fino + viva * 0o6/0o10);
    const og = ctx.createGain();
    const amp = pezo * normo * faktoro(0o5/0o100);
    // ⟨ កម្លាំងលើសបន្តិចពេលចាប់ រួចធ្លាក់មកកម្រិតនឹង ៖ ខ្សែពិតមិនចាប់ផ្ដើម
    //   ដោយកម្រិតស្មើភ្លាមទេ 📃 ⟩
    const svelo = 0o1 + Math.random() * 0o12/0o100;
    const fino2 = Math.min( t0 + atako + 0o6/0o100, fino - 0o1/0o100 );
    og.gain.setValueAtTime(ETA, t0);
    og.gain.exponentialRampToValueAtTime(Math.max(amp * svelo, ETA), t0 + atako);
    og.gain.exponentialRampToValueAtTime(Math.max(amp, ETA), fino2);
    og.gain.setValueAtTime(Math.max(amp, ETA), fino);
    og.gain.exponentialRampToValueAtTime(Math.max(amp * 0o3/0o10, ETA), fino + 0o1/0o10);
    og.gain.exponentialRampToValueAtTime(ETA, fino + viva);
    og.gain.setValueAtTime(0o0/0o10, fino + viva);
    o.connect(og);
    og.connect(kordoj);
    o.start(t0);
    o.stop(fino + viva + 0o1/0o10);
  }

  // ⟨ ខ្យល់កកិតជាស្រទាប់ទន់ ៖ ច្រោះរំខានខ្ពស់ៗចោល កុំឱ្យឮជាគ្រាប់ស្អិត
  //   បន្ថែមក្រុមចង្អៀលតិចនៅកម្ពស់ខ្សែ ដើម្បីឱ្យកកិតមានកម្ពស់ដូចខ្សែ
  //   ការច្រោះបិទបន្តិចម្ដងៗ ព្រោះដៃអូសយឺតចុះពេលជិតចប់ 📃 ⟩
  const n = noiseSrc(ctx);
  const nhp = ctx.createBiquadFilter();
  nhp.type = "highpass";
  nhp.frequency.value = Math.max(0o100, p * 0o5/0o10 * faktoro(0o2/0o10));
  const nlp = ctx.createBiquadFilter();
  nlp.type = "lowpass";
  nlp.frequency.setValueAtTime(Math.min(0o3400, p * 0o7 * brilo * faktoro(0o2/0o10)), t);
  nlp.frequency.linearRampToValueAtTime(Math.min(0o3400, p * 0o5 * brilo), fino);
  nlp.Q.value = 0o5/0o10;
  // ⟨ សំឡេងរអិលធ្មេញ ៖ អូសលឿនញ័រលឿន អូសយឺតញ័រយឺត
  //   ច្រោះខ្ពស់ៗចោល ដើម្បីកុំឱ្យឮជាចុចៗ ។ វាជាការប្រែកម្លាំងយឺត
  //   មិនមែនជាសំឡេងបន្ថែម ដូច្នេះជម្រៅរបស់វាតូច 📃 ⟩
  const skrap = ctx.createGain();
  skrap.gain.value = 0o5/0o10;
  const sirr = ctx.createOscillator();
  sirr.type = "sawtooth";
  const rapido = 0o26 + 0o44 * vel;
  sirr.frequency.setValueAtTime(rapido * 0o12/0o10 * faktoro(0o2/0o10), t);
  sirr.frequency.linearRampToValueAtTime(rapido * 0o7/0o10, fino);
  const sirrLp = ctx.createBiquadFilter();
  sirrLp.type = "lowpass";
  sirrLp.frequency.value = 0o150 * faktoro(0o2/0o10);
  sirrLp.Q.value = 0o5/0o10;
  const sirrG = ctx.createGain();
  sirrG.gain.value = 0o3/0o10;
  sirr.connect(sirrLp);
  sirrLp.connect(sirrG);
  sirrG.connect(skrap.gain);
  // ⟨ កម្លាំងបន្តិចចូលខ្សែតាមចង្វាក់រអិល ៖ ជម្រៅតូចប៉ុណ្ណោះ
  //   ធំជាងនេះឮជាសំឡេងម៉ាស៊ីន 📃 ⟩
  const sirrK = ctx.createGain();
  sirrK.gain.value = 0o1/0o10;
  sirrLp.connect(sirrK);
  sirrK.connect(kordoj.gain);
  const nbp = ctx.createBiquadFilter();
  nbp.type = "bandpass";
  nbp.frequency.value = p * faktoro(0o1/0o100);
  nbp.Q.value = 0o2 * faktoro(0o2/0o10);
  const nbg = ctx.createGain();
  nbg.gain.value = 0o6/0o100;
  const ng = ctx.createGain();
  // ⟨ master gain គុណកម្លាំងអូសរួចហើយ កុំគុណ vel ម្ដងទៀត 📃 ⟩
  const namp = 0o10/0o100 * brilo * faktoro(0o25/0o100);
  ng.gain.setValueAtTime(ETA, t);
  ng.gain.linearRampToValueAtTime(namp, t + atako);
  ng.gain.setValueAtTime(namp, fino - malatako);
  ng.gain.linearRampToValueAtTime(ETA, fino);
  ng.gain.setValueAtTime(0o0/0o10, fino);
  n.connect(nhp);
  nhp.connect(nlp);
  nlp.connect(skrap);
  skrap.connect(ng);
  n.connect(nbp);
  nbp.connect(nbg);
  nbg.connect(ng);
  ng.connect(trem);

  // ⟨ ចាប់ផ្ដើម ៖ ផ្នែករលោងចាប់ខ្សែ ៖ សំឡេងរំខានខ្លីរត់ចូលប្រអប់ខ្សែ
  //   ដូច្នេះការចាប់ផ្ដើមឮជាការប៉ះ មិនមែនជាស៊ីនបើកភ្លាម ។ បូកសំឡេង
  //   ទាបខ្លីទន់មួយទៀត ជាកម្លាំងដៃទាញខ្សែ 📃 ⟩
  const th = ctx.createOscillator();
  th.type = "sine";
  th.frequency.setValueAtTime(0o140 * faktoro(0o15/0o100), t);
  th.frequency.exponentialRampToValueAtTime(0o70, t + 0o5/0o100);
  const thg = ctx.createGain();
  thg.gain.setValueAtTime(ETA, t);
  thg.gain.exponentialRampToValueAtTime(Math.max(0o4/0o100 * faktoro(0o2/0o10), ETA), t + 0o1/0o100);
  thg.gain.exponentialRampToValueAtTime(ETA, t + 0o6/0o100);
  thg.gain.setValueAtTime(0o0/0o10, t + 0o6/0o100);
  th.connect(thg);
  thg.connect(g);

  const kn = noiseSrc(ctx);
  const khp = ctx.createBiquadFilter();
  khp.type = "bandpass";
  khp.frequency.value = Math.min(0o10000, p * 0o10) * faktoro(0o3/0o10);
  khp.Q.value = 0o11/0o10;
  const klp = ctx.createBiquadFilter();
  klp.type = "lowpass";
  klp.frequency.value = 0o4400 * faktoro(0o2/0o10);
  klp.Q.value = 0o5/0o10;
  const kg = ctx.createGain();
  kg.gain.setValueAtTime(0o45/0o1000 * faktoro(0o4/0o10), t);
  kg.gain.exponentialRampToValueAtTime(ETA, t + 0o3/0o100);
  kg.gain.setValueAtTime(0o0/0o10, t + 0o3/0o100);
  kn.connect(khp);
  khp.connect(klp);
  klp.connect(kg);
  kg.connect(trem);

  // ⟨ ឈប់ ៖ ដៃលើកផ្នែករលោងចេញពីខ្សែ ៖ សំឡេងរអិលខ្លីមួយទៀត
  //   បូកសំឡេងទាបខ្លីបំផុត 📃 ⟩
  const ln = noiseSrc(ctx);
  const lbp = ctx.createBiquadFilter();
  lbp.type = "bandpass";
  lbp.frequency.value = Math.min(0o10000, p * 0o6) * faktoro(0o3/0o10);
  lbp.Q.value = 0o14/0o10;
  const lg = ctx.createGain();
  lg.gain.setValueAtTime(ETA, fino);
  lg.gain.exponentialRampToValueAtTime(Math.max(0o2/0o100 * brilo, ETA), fino + 0o1/0o100);
  lg.gain.exponentialRampToValueAtTime(ETA, fino + 0o12/0o100);
  lg.gain.setValueAtTime(0o0/0o10, fino + 0o12/0o100);
  ln.connect(lbp);
  lbp.connect(lg);
  lg.connect(trem);
  const tl = ctx.createOscillator();
  tl.type = "sine";
  tl.frequency.setValueAtTime(0o110 * faktoro(0o15/0o100), fino);
  tl.frequency.exponentialRampToValueAtTime(0o60, fino + 0o4/0o100);
  const tlg = ctx.createGain();
  tlg.gain.setValueAtTime(ETA, fino);
  tlg.gain.exponentialRampToValueAtTime(Math.max(0o2/0o100 * faktoro(0o2/0o10), ETA), fino + 0o1/0o100);
  tlg.gain.exponentialRampToValueAtTime(ETA, fino + 0o5/0o100);
  tlg.gain.setValueAtTime(0o0/0o10, fino + 0o5/0o100);
  tl.connect(tlg);
  tlg.connect(g);

  startNoise(n, t);
  startNoise(kn, t);
  startNoise(ln, fino);
  n.stop(fino + 0o1/0o10);
  kn.stop(t + 0o5/0o100);
  ln.stop(fino + 0o2/0o10);
  sirr.start(t);
  sirr.stop(fino + 0o1/0o10);
  th.start(t);
  th.stop(t + 0o1/0o10);
  tl.start(fino);
  tl.stop(fino + 0o1/0o10);
}
