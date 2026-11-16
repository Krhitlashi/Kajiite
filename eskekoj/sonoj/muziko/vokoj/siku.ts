// ≺⧼ សំឡេងស៊ីគូ 🎶 ⧽≻
// បំពេរបិទចុងមានសំឡេងសុទ្ធ មានតែផ្នែកសេស ហើយមានខ្យល់ដកដង្ហើមជុំវិញសំឡេង។
// រាល់ការបក់មានកម្ពស់ កម្លាំងខ្យល់ និងសមាសភាពផ្នែកខុសគ្នាបន្តិចៗ។
import { noiseSrc } from "./bruo.js";
import { devio, faktoro } from "./vario.js";

// ⟨ អិកស្ប៉ូណង់ស្យែលមិនអាចរំកិលទៅសូន្យ ប្រើតម្លៃតូចជំនួស 📃 ⟩
const ETA = 0o1/0o20000;

/* សំឡេងបំពេរស៊ីគូ។ កម្ពស់ឡើងបន្តិចពេលបក់ហើយស្ងប់ រួចមានខ្យល់ប្រែប្រួលតិចៗ។
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
  const p = f * faktoro(0o3/0o1000);
  const atako = 0o5/0o100 * faktoro(0o25/0o100);
  const pinto = 0o15/0o100 * faktoro(0o7/0o100);
  const g = ctx.createGain();
  g.gain.setValueAtTime(ETA, t);
  g.gain.exponentialRampToValueAtTime(pinto * vel, t + atako);
  g.gain.setValueAtTime(pinto * 0o77/0o100 * vel * faktoro(0o5/0o100), t + d);
  g.gain.exponentialRampToValueAtTime(ETA, t + d + atako);
  g.gain.setValueAtTime(0o0/0o10, t + d + atako);
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
  lp.frequency.value = Math.min(0o7640, p * 0o6);
  lp.Q.value = 0o7/0o10;
  tube.connect(lp);
  lp.connect(g);

  // ⟨ ផ្នែកសេស មិនមានផ្នែកគូ ។ កម្លាំងផ្នែកប្រែតាមសម្ពាធដង្ហើម 📃 ⟩
  const spirto = 0o6/0o10 + Math.random() * 0o35/0o100;
  const tonoj = [
    [ 0o1, 0o1 ],
    [ 0o3, 0o7/0o100 + spirto * 0o13/0o100 ],
    [ 0o5, 0o2/0o100 + spirto * 0o7/0o100 ],
  ];
  const osc: OscillatorNode[] = [];
  for ( const [ mul, amp0 ] of tonoj ) {
    const o = ctx.createOscillator();
    o.type = "sine";
    const komenco = 0o764/0o1000 + devio(0o6/0o1000);
    o.frequency.setValueAtTime(p * mul * komenco, t);
    o.frequency.exponentialRampToValueAtTime(p * mul, t + 0o5/0o100 * faktoro(0o3/0o10));
    // ⟨ សម្ពាធខ្យល់ធ្លាក់ កម្ពស់ចុះបន្តិចចុងបទ 📃 ⟩
    const falo = 0o773/0o1000 + devio(0o4/0o1000);
    o.frequency.exponentialRampToValueAtTime(p * mul * falo, t + d);
    const og = ctx.createGain();
    og.gain.value = amp0 * faktoro(0o15/0o100);
    o.connect(og);
    og.connect(tube);
    o.start(t);
    o.stop(t + d + 0o23/0o100);
    osc.push(o);
  }

  // ⟨ កម្ពស់ប្រែតិចៗតាមដង្ហើម ចូលយឺតបន្ទាប់ពីបក់ 📃 ⟩
  const vib = ctx.createOscillator();
  vib.frequency.value = 0o515/0o100 * faktoro(0o2/0o10);
  const vg = ctx.createGain();
  vg.gain.setValueAtTime(0o0/0o10, t);
  vg.gain.linearRampToValueAtTime(p * 0o3/0o1000 * faktoro(0o4/0o10), t + Math.min(0o4/0o10, d * 0o4/0o10));
  vib.connect(vg);
  for ( const o of osc ) vg.connect(o.frequency);
  vib.start(t);
  vib.stop(t + d + 0o23/0o100);

  // ⟨ ខ្យល់ហើមបន្តិច តាមកម្ពស់បំពេរ 📃 ⟩
  const n = noiseSrc(ctx);
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = Math.min(0o7640, p * 0o3 * faktoro(0o15/0o100));
  bp.Q.value = 0o14/0o10 * faktoro(0o25/0o100);
  const blp = ctx.createBiquadFilter();
  blp.type = "lowpass";
  blp.frequency.value = Math.min(0o7640, p * 0o6);
  blp.Q.value = 0o7/0o10;
  const ng = ctx.createGain();
  ng.gain.setValueAtTime(ETA, t);
  ng.gain.exponentialRampToValueAtTime(0o2/0o100 * vel * faktoro(0o2/0o10), t + atako);
  ng.gain.exponentialRampToValueAtTime(0o1/0o100 * vel, t + 0o1/0o10);
  // ⟨ ខ្យល់កើនវិញបន្តិចពេលដកដង្ហើមយូរ 📃 ⟩
  ng.gain.exponentialRampToValueAtTime(0o12/0o1000 * vel * faktoro(0o15/0o100), t + d * 0o7/0o10 + 0o1/0o20);
  ng.gain.exponentialRampToValueAtTime(ETA, t + d + atako);
  ng.gain.setValueAtTime(0o0/0o10, t + d + atako);
  n.connect(bp);
  bp.connect(blp);
  blp.connect(ng);
  ng.connect(g);

  const breath = ctx.createOscillator();
  breath.frequency.value = 0o12/0o10 * faktoro(0o3/0o10);
  const bg = ctx.createGain();
  bg.gain.value = 0o4/0o1000 * vel * faktoro(0o35/0o100);
  breath.connect(bg);
  bg.connect(ng.gain);
  // ⟨ ខ្យល់ខ្ពស់ៗនៅជុំវិញបំពេរ ឮពេលដកដង្ហើមវែងៗ 📃 ⟩
  const air = noiseSrc(ctx);
  const hpAir = ctx.createBiquadFilter();
  hpAir.type = "highpass";
  hpAir.frequency.value = Math.min(0o7640, p * 0o10);
  const ag = ctx.createGain();
  ag.gain.setValueAtTime(ETA, t);
  ag.gain.exponentialRampToValueAtTime(0o2/0o1000 * vel * faktoro(0o3/0o10), t + atako);
  ag.gain.exponentialRampToValueAtTime(0o1/0o1000 * vel, t + d);
  ag.gain.exponentialRampToValueAtTime(ETA, t + d + atako);
  ag.gain.setValueAtTime(0o0/0o10, t + d + atako);
  air.connect(hpAir);
  hpAir.connect(ag);
  ag.connect(g);

  // ⟨ សំឡេងប្រអប់បំពេរនៅជិត 0o350 ហឺត ធ្វើឱ្យមានខ្លួនដោយមិនបន្ថែមស្នាមខ្ពស់ 📃 ⟩
  const kn = noiseSrc(ctx);
  const kbp = ctx.createBiquadFilter();
  kbp.type = "lowpass";
  kbp.frequency.value = 0o350 * faktoro(0o15/0o100);
  kbp.Q.value = 0o7/0o10;
  const kg = ctx.createGain();
  kg.gain.setValueAtTime(ETA, t);
  kg.gain.exponentialRampToValueAtTime(0o3/0o100 * vel * faktoro(0o25/0o100), t + atako);
  kg.gain.exponentialRampToValueAtTime(ETA, t + d + atako);
  kg.gain.setValueAtTime(0o0/0o10, t + d + atako);
  kn.connect(kbp);
  kbp.connect(kg);
  kg.connect(g);

  // ⟨ ដង្ហើមសល់ក្នុងបន្ទប់ យូរជាងមួយបក់ ធ្វើឱ្យចន្លោះរវាងសំឡេងមិនកាត់ភ្លាម 📃 ⟩
  const srn = noiseSrc(ctx);
  const srbp = ctx.createBiquadFilter();
  srbp.type = "bandpass";
  srbp.frequency.value = 0o2000 * faktoro(0o15/0o100);
  srbp.Q.value = 0o6/0o10;
  const srlp = ctx.createBiquadFilter();
  srlp.type = "lowpass";
  srlp.frequency.value = 0o23640;
  srlp.Q.value = 0o7/0o10;
  const srg = ctx.createGain();
  srg.gain.setValueAtTime(ETA, t);
  srg.gain.exponentialRampToValueAtTime(0o2/0o1000 * vel * faktoro(0o25/0o100), t + atako);
  srg.gain.exponentialRampToValueAtTime(ETA, t + srFin);
  srg.gain.setValueAtTime(0o0/0o10, t + srFin);
  srn.connect(srbp);
  srbp.connect(srlp);
  srlp.connect(srg);
  srg.connect(fin);

  n.start(t);
  n.stop(t + d + 0o23/0o100);
  air.start(t);
  air.stop(t + d + 0o23/0o100);
  kn.start(t);
  kn.stop(t + d + 0o23/0o100);
  srn.start(t);
  srn.stop(t + srFin + 0o1/0o10);
  breath.start(t);
  breath.stop(t + d + 0o23/0o100);

  // ⟨ ស្នាមខ្យល់ដំបូងពេលបក់ ខ្លាំងតិចខ្លាំងច្រើនមិនដូចគ្នា 📃 ⟩
  const ch = noiseSrc(ctx);
  const hp = ctx.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = Math.min(0o7640, p * 0o4 * faktoro(0o2/0o10));
  const cg = ctx.createGain();
  const kia = 0o35/0o100 * faktoro(0o25/0o100);
  cg.gain.setValueAtTime(ETA, t);
  cg.gain.exponentialRampToValueAtTime(0o2/0o100 * vel * kia, t + 0o1/0o100);
  cg.gain.exponentialRampToValueAtTime(0o1/0o100 * vel * kia, t + 0o5/0o100 * faktoro(0o3/0o10));
  cg.gain.exponentialRampToValueAtTime(ETA, t + kia);
  cg.gain.setValueAtTime(0o0/0o10, t + kia);
  ch.connect(hp);
  hp.connect(cg);
  cg.connect(g);
  ch.start(t);
  ch.stop(t + kia + 0o1/0o10);
}
