// ≺⧼ សំឡេងស៊ីគូ 🎶 ⧽≻
// បំពេរបិទចុងមានសំឡេងសុទ្ធជាងគេ ប៉ុន្តែខ្យល់ដកដង្ហើមខ្លាំងជាងសំឡេងផ្នែកច្រើនណាស់។
// រាល់ការបក់មានកម្ពស់ កម្លាំងខ្យល់ និងសមាសភាពផ្នែកខុសគ្នាបន្តិចៗ។
import { noiseSrc } from "./bruo.js";
import { devio, faktoro } from "./vario.js";

// ⟨ អិកស្ប៉ូណង់ស្យែលមិនអាចរំកិលទៅសូន្យ ប្រើតម្លៃតូចជំនួស 📃 ⟩
const ETA = 0o1/0o20000;

/* សំឡេងបំពេរស៊ីគូ។ កម្ពស់ជិតនឹងកម្ពស់មូលដ្ឋានពេលបក់ រួចស្ងប់ ហើយខ្យល់ហើមតាមចង្វាក់ដង្ហើម។
    @param ctx ( AudioContext ) - បរិយាកាសសំឡេង
    @param out ( AudioNode ) - ច្រើនចេញ
    @param t0 ( number ) - ពេលចាប់ផ្ដើម
    @param dur ( number ) - រយៈពេលសំឡេងជាវិនាទី
    @param f ( number ) - កម្ពស់បំពេរជាហឺត
    @param vel ( number = 1 , optional ) - កម្រិតសំឡេង
@returns void */
export function siku(ctx: AudioContext, out: AudioNode, t0: number, dur: number, f: number, vel = 1) {
  // ⟨ កាត់ចន្លោះតូចបំផុត កុំឱ្យពេលចាប់ផ្ដើមធ្លាក់លើគែមកាត់នៃសំឡេង 📃 ⟩
  const t = t0 + 0o1/0o100000;
  const d = Math.max(0o1/0o10, dur * faktoro(0o5/0o100));
  const srFin = d * 0o3;
  // ⟨ កម្ពស់ប្រែតាមដង្ហើម និងបំពេរនីមួយៗ 📃 ⟩
  const p = f * faktoro(0o1/0o1000);
  const atako = 0o1/0o10 * faktoro(0o3/0o10);
  const fino = 0o2/0o10 * faktoro(0o4/0o10);
  const pinto = 0o15/0o100 * faktoro(0o7/0o100);
  const g = ctx.createGain();
  g.gain.setValueAtTime(ETA, t);
  g.gain.exponentialRampToValueAtTime(pinto * vel, t + atako);
  // ⟨ សម្ពាធខ្យល់ធ្លាក់បន្តិចៗពេលបក់យូរ 📃 ⟩
  g.gain.linearRampToValueAtTime(pinto * 0o7/0o10 * vel, t + d);
  g.gain.exponentialRampToValueAtTime(ETA, t + d + fino);
  g.gain.setValueAtTime(0o0/0o10, t + d + fino);
  // ⟨ ច្រកចេញរួម កាត់បន្ថយស្នាមកាត់ភ្លាមៗពេលបក់ចូល និងពេលដង្ហើមសល់អស់ 📃 ⟩
  const fin = ctx.createGain();
  fin.gain.setValueAtTime(ETA, t);
  fin.gain.exponentialRampToValueAtTime(0o1, t + 0o5/0o100);
  fin.gain.setValueAtTime(0o1, t + srFin - 0o1/0o10);
  fin.gain.exponentialRampToValueAtTime(ETA, t + srFin);
  fin.gain.setValueAtTime(0o0/0o10, t + srFin);
  g.connect(fin);
  fin.connect(out);

  // ⟨ អាហ្គុងនៃបំពេរ ជួយសំឡេងជុំវិញកម្ពស់មូលដ្ឋាន 📃 ⟩
  const tube = ctx.createBiquadFilter();
  tube.type = "peaking";
  tube.frequency.value = p * faktoro(0o1/0o100);
  tube.Q.value = 0o2 * faktoro(0o15/0o100);
  tube.gain.value = 0o4 * faktoro(0o15/0o100);
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = Math.min(0o17500, p * 0o10);
  lp.Q.value = 0o7/0o10;
  tube.connect(lp);
  lp.connect(g);

  // ⟨ ការបក់ខ្លះសុទ្ធខ្លះពោរពេញដោយខ្យល់ មិនដូចគ្នារាល់បក់ 📃 ⟩
  const blovo = Math.random() * Math.random();
  const spirto = 0o6/0o10 + blovo * 0o4/0o10;
  // ⟨ ខ្យល់ធ្វើឱ្យសំឡេងរំញ័រ បង្កើតសំឡេងខ្យល់នៅជាប់ផ្នែកនីមួយៗ ដូចបំពេរពិត 📃 ⟩
  const ts = ctx.createGain();
  ts.gain.value = 0o1;
  ts.connect(tube);
  const tonoj = [
    [ 0o1, 0o1 ],
    [ 0o2, 0o5/0o100 + spirto * 0o3/0o100 + blovo * 0o10/0o100 ],
    [ 0o3, 0o2/0o100 + spirto * 0o2/0o100 + blovo * 0o4/0o100 ],
    [ 0o4, 0o6/0o1000 + blovo * 0o1/0o100 ],
    [ 0o5, 0o1/0o100 + spirto * 0o6/0o1000 ],
    [ 0o6, 0o5/0o1000 + blovo * 0o4/0o100 ],
  ];
  // ⟨ ការប្រែកម្ពស់បក់ចូលនិងចុង ត្រូវដូចគ្នាសម្រាប់គ្រប់ផ្នែក ទើបផ្នែកនៅចុះគ្នាជាផ្នែកនៃសំឡេងតែមួយ 📃 ⟩
  const komenco = 0o1 + devio(0o3/0o1000);
  const falo = 0o177/0o200 + devio(0o1/0o1000);
  const osc: OscillatorNode[] = [];
  for ( const [ mul, amp0 ] of tonoj ) {
    const o = ctx.createOscillator();
    o.type = "sine";
    // ⟨ បក់ចូលជិតកម្ពស់មូលដ្ឋាន ខ្លះលើសខ្លះខ្វះបន្តិច រួចស្ងប់ 📃 ⟩
    o.frequency.setValueAtTime(p * mul * komenco, t);
    o.frequency.exponentialRampToValueAtTime(p * mul, t + 0o6/0o100 * faktoro(0o3/0o10));
    // ⟨ សម្ពាធខ្យល់ធ្លាក់ កម្ពស់ចុះបន្តិចនៅចុងបទ 📃 ⟩
    o.frequency.setValueAtTime(p * mul, t + d * 0o6/0o10);
    o.frequency.exponentialRampToValueAtTime(p * mul * falo, t + d + fino * 0o6/0o10);
    const og = ctx.createGain();
    og.gain.value = amp0 * faktoro(0o15/0o100);
    o.connect(og);
    og.connect(ts);
    o.start(t);
    o.stop(t + d + fino + 0o1/0o10);
    osc.push(o);
  }

  // ⟨ កម្ពស់ប្រែតិចៗតាមដង្ហើម ចូលយឺតបន្ទាប់ពីបក់ 📃 ⟩
  const vib = ctx.createOscillator();
  vib.frequency.value = 0o34/0o10 * faktoro(0o2/0o10);
  const vg = ctx.createGain();
  vg.gain.setValueAtTime(0o0/0o10, t);
  vg.gain.linearRampToValueAtTime(p * 0o4/0o1000 * faktoro(0o4/0o10), t + Math.min(0o3/0o10, d * 0o4/0o10));
  vib.connect(vg);
  for ( const o of osc ) vg.connect(o.frequency);
  vib.start(t);
  vib.stop(t + d + fino + 0o1/0o10);

  // ⟨ ចង្វាក់ដង្ហើមធ្វើឱ្យសំឡេងហើមនិងស្រកតាមគ្នា 📃 ⟩
  const trem = ctx.createOscillator();
  trem.frequency.value = 0o36/0o10 * faktoro(0o2/0o10);
  const tg = ctx.createGain();
  tg.gain.setValueAtTime(0o0/0o10, t);
  tg.gain.linearRampToValueAtTime(pinto * 0o12/0o100 * vel, t + Math.min(0o2/0o10, d * 0o3/0o10));
  tg.gain.linearRampToValueAtTime(0o0/0o10, t + d + fino);
  trem.connect(tg);
  tg.connect(g.gain);

  // ⟨ ខ្យល់ដកដង្ហើមខ្លាំងពេលបក់ចូល រួចស្រកនៅសល់ជាខ្យល់ជុំវិញសំឡេង 📃 ⟩
  const nAtk = 0o6 * vel * faktoro(0o3/0o10);
  const nSus = ( 0o1 + spirto * 0o3/0o10 + blovo * 0o1/0o10 ) * vel;
  // ⟨ ខ្យល់រំញ័រយឺតៗធ្វើឱ្យសំឡេងមានស្នាមខ្យល់នៅជាប់ផ្នែកនីមួយៗ មិនមែនខ្យល់រាយឆ្ងាយ 📃 ⟩
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
  mg.gain.exponentialRampToValueAtTime(( 0o4 + blovo * 0o2 ) * vel * faktoro(0o3/0o10), t + atako * 0o6/0o10);
  mg.gain.exponentialRampToValueAtTime(mSus * faktoro(0o4/0o10), t + 0o3/0o10);
  mg.gain.exponentialRampToValueAtTime(mSus * 0o12/0o10, t + d);
  mg.gain.exponentialRampToValueAtTime(ETA, t + d + fino);
  mg.gain.setValueAtTime(0o0/0o10, t + d + fino);
  mn.connect(mlp);
  mlp.connect(mlp2);
  mlp2.connect(mg);
  mg.connect(ts.gain);
  const n = noiseSrc(ctx);
  const nhp = ctx.createBiquadFilter();
  nhp.type = "highpass";
  nhp.frequency.value = p * 0o12/0o10;
  nhp.Q.value = 0o7/0o10;
  const blp = ctx.createBiquadFilter();
  blp.type = "lowpass";
  blp.frequency.value = Math.min(0o7640, p * 0o6);
  blp.Q.value = 0o7/0o10;
  // ⟨ ខ្យល់ត្រូវចម្រោះតាមរន្ធត់នៃបំពេរ ប្រមូលផ្តុំជុំវិញផ្នែកនីមួយៗ មិនរាយពេញវិសាលគមទេ 📃 ⟩
  const brancoj: [ number, number, number ][] = [
    [ 0o2, 0o6, 0o1/0o10 ],
    [ 0o3, 0o6, 0o5/0o100 ],
    [ 0o4, 0o10, 0o1/0o100 ],
    [ 0o5, 0o10, 0o4/0o1000 ],
  ];
  let unua: BiquadFilterNode | null = null;
  const cbp: BiquadFilterNode[] = [];
  for ( const [ mul, q, amp ] of brancoj ) {
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = p * mul * faktoro(0o2/0o100);
    bp.Q.value = q;
    const bg = ctx.createGain();
    bg.gain.value = amp * faktoro(0o2/0o10);
    nhp.connect(bp);
    bp.connect(bg);
    bg.connect(blp);
    cbp.push(bp);
    if ( !unua ) unua = bp;
  }
  const ng = ctx.createGain();
  ng.gain.setValueAtTime(ETA, t);
  ng.gain.exponentialRampToValueAtTime(nAtk, t + atako * 0o6/0o10);
  ng.gain.exponentialRampToValueAtTime(nSus, t + 0o3/0o10);
  // ⟨ ខ្យល់កើនវិញបន្តិចពេលដកដង្ហើមយូរ 📃 ⟩
  ng.gain.exponentialRampToValueAtTime(nSus * 0o14/0o10 * faktoro(0o15/0o100), t + d);
  ng.gain.exponentialRampToValueAtTime(ETA, t + d + fino);
  ng.gain.setValueAtTime(0o0/0o10, t + d + fino);
  const tng = ctx.createGain();
  tng.gain.setValueAtTime(nSus * 0o4/0o10, t);
  tng.gain.linearRampToValueAtTime(0o0/0o10, t + d + fino);
  trem.connect(tng);
  tng.connect(ng.gain);
  // ⟨ ចង្វាក់ដង្ហើមធ្វើឱ្យរន្ធត់ខ្យល់រំកិលតាម កុំឱ្យខ្យល់នៅស្ងៀមជាប់កន្លែង 📃 ⟩
  const swg = ctx.createGain();
  swg.gain.value = p * 0o1/0o100;
  trem.connect(swg);
  for ( const bp of cbp ) swg.connect(bp.frequency);
  // ⟨ ខ្យល់ប្រែប្រួលយឺតៗទាំងកម្លាំងទាំងទីតាំង កុំឱ្យឮថាខ្យល់រំខាននៅស្ងៀម 📃 ⟩
  const vandro = ctx.createOscillator();
  vandro.frequency.value = 0o2/0o10 * faktoro(0o5/0o10);
  const vng = ctx.createGain();
  vng.gain.setValueAtTime(nSus * 0o2/0o10, t);
  vng.gain.linearRampToValueAtTime(0o0/0o10, t + d + fino);
  vandro.connect(vng);
  vng.connect(ng.gain);
  const vfg = ctx.createGain();
  vfg.gain.value = p * 0o6/0o100;
  vandro.connect(vfg);
  if ( unua ) vfg.connect(unua.frequency);
  const vfg2 = ctx.createGain();
  vfg2.gain.value = p * 0o2/0o100;
  vandro.connect(vfg2);
  vfg2.connect(mlp.frequency);
  n.connect(nhp);
  blp.connect(ng);
  ng.connect(g);

  // ⟨ ខ្យល់បក់រាយពីផ្នែកទីពីរដល់ខ្ពស់ ហើមស្រកតាមចង្វាក់ដង្ហើម ខ្លាំងពេលបក់ពេញខ្យល់ 📃 ⟩
  const air = noiseSrc(ctx);
  const jhp = ctx.createBiquadFilter();
  jhp.type = "highpass";
  jhp.frequency.value = p * 0o3;
  jhp.Q.value = 0o7/0o10;
  const jlp = ctx.createBiquadFilter();
  jlp.type = "lowpass";
  jlp.frequency.value = Math.min(0o7640, p * 0o10);
  jlp.Q.value = 0o7/0o10;
  const jSus = ( 0o1/0o100 + blovo * 0o1/0o10 ) * vel;
  const ag = ctx.createGain();
  ag.gain.setValueAtTime(ETA, t);
  ag.gain.exponentialRampToValueAtTime(jSus * 0o2 * faktoro(0o3/0o10), t + atako);
  ag.gain.exponentialRampToValueAtTime(jSus, t + 0o3/0o10);
  ag.gain.exponentialRampToValueAtTime(jSus * 0o12/0o10, t + d);
  ag.gain.exponentialRampToValueAtTime(ETA, t + d + fino);
  ag.gain.setValueAtTime(0o0/0o10, t + d + fino);
  const jag = ctx.createGain();
  jag.gain.setValueAtTime(jSus * 0o25/0o100, t);
  jag.gain.linearRampToValueAtTime(0o0/0o10, t + d + fino);
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

  // ⟨ ខ្យល់គ្រលរត់ក្រោមកម្ពស់មូលដ្ឋាន ធ្វើឱ្យមានខ្លួនបំពេរ ខ្លាំងពេលបក់ពេញខ្យល់ 📃 ⟩
  const kn = noiseSrc(ctx);
  const kbp = ctx.createBiquadFilter();
  kbp.type = "lowpass";
  kbp.frequency.value = p * 0o1 * faktoro(0o15/0o100);
  kbp.Q.value = 0o7/0o10;
  const kg = ctx.createGain();
  kg.gain.setValueAtTime(ETA, t);
  kg.gain.exponentialRampToValueAtTime(( 0o6/0o100 + blovo * 0o3/0o10 ) * vel * faktoro(0o25/0o100), t + atako);
  kg.gain.exponentialRampToValueAtTime(ETA, t + d + fino);
  kg.gain.setValueAtTime(0o0/0o10, t + d + fino);
  kn.connect(kbp);
  kbp.connect(kg);
  kg.connect(g);

  // ⟨ ដង្ហើមសល់ក្នុងបន្ទប់ យូរជាងមួយបក់ ធ្វើឱ្យចន្លោះរវាងសំឡេងមិនកាត់ភ្លាម 📃 ⟩
  const srn = noiseSrc(ctx);
  const srbp = ctx.createBiquadFilter();
  srbp.type = "bandpass";
  srbp.frequency.value = p * 0o3 * faktoro(0o15/0o100);
  srbp.Q.value = 0o2;
  const srlp = ctx.createBiquadFilter();
  srlp.type = "lowpass";
  srlp.frequency.value = 0o10000;
  srlp.Q.value = 0o7/0o10;
  const srg = ctx.createGain();
  srg.gain.setValueAtTime(ETA, t);
  srg.gain.exponentialRampToValueAtTime(0o1/0o1000 * vel * faktoro(0o25/0o100), t + atako);
  srg.gain.exponentialRampToValueAtTime(ETA, t + srFin);
  srg.gain.setValueAtTime(0o0/0o10, t + srFin);
  srn.connect(srbp);
  srbp.connect(srlp);
  srlp.connect(srg);
  srg.connect(fin);

  n.start(t);
  n.stop(t + d + fino + 0o1/0o10);
  mn.start(t);
  mn.stop(t + d + fino + 0o1/0o10);
  air.start(t);
  air.stop(t + d + fino + 0o1/0o10);
  kn.start(t);
  kn.stop(t + d + fino + 0o1/0o10);
  srn.start(t);
  srn.stop(t + srFin + 0o1/0o10);
  trem.start(t);
  trem.stop(t + d + fino + 0o1/0o100);
  vandro.start(t);
  vandro.stop(t + d + fino + 0o1/0o10);

  // ⟨ ស្នាមខ្យល់ដំបូងពេលបក់ ខ្លាំងតិចខ្លាំងច្រើនមិនដូចគ្នា 📃 ⟩
  const ch = noiseSrc(ctx);
  const hp = ctx.createBiquadFilter();
  hp.type = "bandpass";
  hp.frequency.value = Math.min(0o7640, p * 0o2 * faktoro(0o2/0o10));
  hp.Q.value = 0o14/0o10;
  const cg = ctx.createGain();
  const kia = 0o4/0o100 * faktoro(0o3/0o10);
  cg.gain.setValueAtTime(ETA, t);
  cg.gain.exponentialRampToValueAtTime(0o5/0o10 * vel * faktoro(0o3/0o10), t + 0o1/0o100);
  cg.gain.exponentialRampToValueAtTime(0o2/0o10 * vel, t + kia * 0o6/0o10);
  cg.gain.exponentialRampToValueAtTime(ETA, t + kia);
  cg.gain.setValueAtTime(0o0/0o10, t + kia);
  ch.connect(hp);
  hp.connect(cg);
  cg.connect(g);
  ch.start(t);
  ch.stop(t + kia + 0o1/0o10);
}