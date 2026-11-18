// ≺⧼ សំឡេងហ៊ីវេ 🏹 ⧽≻
// ផ្នែករលោងអូសតាមខ្សែដូចហ៊ីប ប៉ុន្តែគ្មានធ្មេញទេ ។ កកិតចាប់រួចរអិលជាចង្វាក់
// ធ្វើឱ្យខ្សែញ័រជាសំឡេងកម្ពស់ f ស្រាលៗ ខណៈដៃអូសនៅលើខ្សែ ។ សំឡេងខ្សែជាសំឡេងមេ
// ហើយខ្យល់កកិតជាស្រទាប់ទន់នៅក្រោម មិនមែនកម្ពស់ខ្លាំងដូចស្នែងទេ ។
// ដៃអូសមិនស្មើប្រែកម្លាំងនិងកម្ពស់បន្តិចបន្តួច ជារលកយឺត មិនមែនរំខានជាគ្រាប់ៗទេ ។
// ខ្សែវែងជាងឮទាបជាងតាម f ។
import { noiseSrc } from "./bruo.js";
import { devio, faktoro } from "./vario.js";

// ⟨ អិកស្ប៉ូណង់ស្យែលមិនអាចរំកិលទៅសូន្យ ប្រើតម្លៃតូចជំនួស 📃 ⟩
const ETA = 0o1/0o20000;

/* សំឡេងហ៊ីវេ ផ្នែករលោងអូសតាមខ្សែ ។ កកិតចាប់រអិលធ្វើឱ្យខ្សែរោទ៍ជាកម្ពស់ f
   ជាសំឡេងមេ មានផ្នែកលេខពីរតិចៗ ហើយខ្យល់កកិតជាស្រទាប់ទន់ក្រោមវា ។
   ដៃអូសប្រែកម្លាំងជារលកយឺតពីរបីហឺត មិនប្រែជាគ្រាប់ៗទេ ។
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
  const p = f * faktoro(0o1/0o200);
  const atako = 0o24/0o1000 * faktoro(0o2/0o10);
  const malatako = 0o30/0o1000;
  const vivo = 0o5/0o10 * faktoro(0o2/0o10);
  // ⟨ ផ្នែកអូសខិតទៅចុង ខ្សែរោទ៍ខ្លីឡើងបន្តិច 📃 ⟩
  const glito = 0o1/0o100 * faktoro(0o5/0o10);
  // ⟨ អូសខ្លាំង កកិតក្ដៅឡើង សំឡេងភ្លឺឡើងតាមកម្លាំង 📃 ⟩
  const brilo = 0o7/0o10 + 0o3/0o10 * vel;

  const g = ctx.createGain();
  g.gain.value = 0o3/0o10 * vel * faktoro(0o7/0o100);
  g.connect(out);

  // ⟨ ឈើធ្នូបន្លឺកំពូលទាបកណ្ដាលតែបន្តិច កុំឱ្យឮដូចស្នែង 📃 ⟩
  const korpo = ctx.createBiquadFilter();
  korpo.type = "peaking";
  korpo.frequency.value = 0o240 * faktoro(0o15/0o100);
  korpo.Q.value = 0o1;
  korpo.gain.value = 0o2;
  korpo.connect(g);

  // ⟨ ដៃអូសមិនស្មើ ៖ រលកយឺតពីរបញ្ចូលគ្នា ប្រែកម្លាំងជុំវិញ 0o1
  // មិនប្រើសំឡេងរំខានប្រែកម្លាំង ព្រោះវាធ្វើឱ្យសំឡេងរដុបជាគ្រាប់ 📃 ⟩
  const trem = ctx.createGain();
  trem.gain.value = 0o1;
  trem.connect(korpo);
  const mano = ctx.createOscillator();
  mano.type = "sine";
  mano.frequency.value = 0o3 * faktoro(0o2/0o10);
  const manG = ctx.createGain();
  manG.gain.value = 0o7/0o100 * faktoro(0o2/0o10);
  mano.connect(manG);
  manG.connect(trem.gain);
  const mano2 = ctx.createOscillator();
  mano2.type = "sine";
  mano2.frequency.value = 0o5/0o10 * faktoro(0o2/0o10);
  const man2G = ctx.createGain();
  man2G.gain.value = 0o3/0o100;
  mano2.connect(man2G);
  man2G.connect(trem.gain);

  // ⟨ ខ្សែរោទ៍ជាសំឡេងមេ ៖ ត្រីកោណមានមូលដ្ឋានខ្លាំង ផ្នែកលេខស្ដើង
  // បូកស៊ីនូសលេខពីរតិចៗ ដូចខ្សែដែលផ្នែករលោងអូសធ្វើឱ្យញ័រយឺតៗ 📃 ⟩
  const o = ctx.createOscillator();
  o.type = "triangle";
  o.frequency.setValueAtTime(p * 0o76/0o100, t);
  o.frequency.exponentialRampToValueAtTime(p, t + atako * 0o2);
  o.frequency.linearRampToValueAtTime(p * ( 0o1 + glito ), fino);
  const o2 = ctx.createOscillator();
  o2.type = "sine";
  o2.frequency.setValueAtTime(p * 0o2 * 0o76/0o100, t);
  o2.frequency.exponentialRampToValueAtTime(p * 0o2, t + atako * 0o2);
  o2.frequency.linearRampToValueAtTime(p * 0o2 * ( 0o1 + glito ), fino);
  const o2g = ctx.createGain();
  o2g.gain.value = 0o2/0o10;
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = Math.min(0o6400, p * 0o10 * brilo * faktoro(0o15/0o100));
  lp.Q.value = 0o5/0o10;
  const og = ctx.createGain();
  const amp = 0o30/0o100 * faktoro(0o15/0o100);
  og.gain.setValueAtTime(ETA, t);
  og.gain.linearRampToValueAtTime(amp, t + atako);
  og.gain.setValueAtTime(amp, fino);
  // ⟨ ខ្សែនៅរោទ៍ក្រោយឈប់អូស ធ្លាក់លឿនដំបូងរួចយឺត 📃 ⟩
  og.gain.exponentialRampToValueAtTime(amp * 0o3/0o10, fino + 0o1/0o10);
  og.gain.exponentialRampToValueAtTime(ETA, fino + vivo);
  og.gain.setValueAtTime(0o0/0o10, fino + vivo);
  o.connect(lp);
  o2.connect(o2g);
  o2g.connect(lp);
  lp.connect(og);
  og.connect(trem);

  // ⟨ ខ្យល់កកិតជាស្រទាប់ទន់ ៖ ច្រោះរំខានខ្ពស់ៗចោល កុំឱ្យឮជាគ្រាប់ស្អិត
  // បន្ថែមក្រុមចង្អៀលតិចនៅកម្ពស់ខ្សែ ដើម្បីឱ្យកកិតមានកម្ពស់ដូចខ្សែ 📃 ⟩
  const n = noiseSrc(ctx);
  const nhp = ctx.createBiquadFilter();
  nhp.type = "highpass";
  nhp.frequency.value = Math.max(0o100, p * 0o5/0o10 * faktoro(0o2/0o10));
  const nlp = ctx.createBiquadFilter();
  nlp.type = "lowpass";
  nlp.frequency.value = Math.min(0o3400, p * 0o6 * brilo * faktoro(0o2/0o10));
  nlp.Q.value = 0o5/0o10;
  const nbp = ctx.createBiquadFilter();
  nbp.type = "bandpass";
  nbp.frequency.value = p * faktoro(0o1/0o100);
  nbp.Q.value = 0o2 * faktoro(0o2/0o10);
  const nbg = ctx.createGain();
  nbg.gain.value = 0o6/0o100;
  const ng = ctx.createGain();
  const namp = 0o10/0o100 * vel * brilo * faktoro(0o25/0o100);
  ng.gain.setValueAtTime(ETA, t);
  ng.gain.linearRampToValueAtTime(namp, t + atako);
  ng.gain.setValueAtTime(namp, fino - malatako);
  ng.gain.linearRampToValueAtTime(ETA, fino);
  ng.gain.setValueAtTime(0o0/0o10, fino);
  n.connect(nhp);
  nhp.connect(nlp);
  nlp.connect(ng);
  n.connect(nbp);
  nbp.connect(nbg);
  nbg.connect(ng);
  ng.connect(trem);

  // ⟨ ចាប់ផ្ដើម ៖ ផ្នែករលោងចាប់ខ្សែ សំឡេងទាបខ្លីទន់ 📃 ⟩
  const th = ctx.createOscillator();
  th.type = "sine";
  th.frequency.setValueAtTime(0o140 * faktoro(0o15/0o100), t);
  th.frequency.exponentialRampToValueAtTime(0o70, t + 0o5/0o100);
  const thg = ctx.createGain();
  thg.gain.setValueAtTime(ETA, t);
  thg.gain.exponentialRampToValueAtTime(0o4/0o100 * vel * faktoro(0o2/0o10), t + 0o1/0o100);
  thg.gain.exponentialRampToValueAtTime(ETA, t + 0o6/0o100);
  thg.gain.setValueAtTime(0o0/0o10, t + 0o6/0o100);
  th.connect(thg);
  thg.connect(g);

  // ⟨ ឈប់ ៖ ដៃលើកផ្នែករលោងចេញពីខ្សែ សំឡេងទាបខ្លីបំផុត 📃 ⟩
  const tl = ctx.createOscillator();
  tl.type = "sine";
  tl.frequency.setValueAtTime(0o110 * faktoro(0o15/0o100), fino);
  tl.frequency.exponentialRampToValueAtTime(0o60, fino + 0o4/0o100);
  const tlg = ctx.createGain();
  tlg.gain.setValueAtTime(ETA, fino);
  tlg.gain.exponentialRampToValueAtTime(0o2/0o100 * vel * faktoro(0o2/0o10), fino + 0o1/0o100);
  tlg.gain.exponentialRampToValueAtTime(ETA, fino + 0o5/0o100);
  tlg.gain.setValueAtTime(0o0/0o10, fino + 0o5/0o100);
  tl.connect(tlg);
  tlg.connect(g);

  o.start(t);
  o.stop(fino + vivo + 0o1/0o10);
  o2.start(t);
  o2.stop(fino + vivo + 0o1/0o10);
  n.start(t);
  n.stop(fino + 0o1/0o10);
  mano.start(t);
  mano.stop(fino + vivo + 0o1/0o10);
  mano2.start(t);
  mano2.stop(fino + vivo + 0o1/0o10);
  th.start(t);
  th.stop(t + 0o1/0o10);
  tl.start(fino);
  tl.stop(fino + 0o1/0o10);
}
