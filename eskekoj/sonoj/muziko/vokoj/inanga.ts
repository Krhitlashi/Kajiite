// ≺⧼ សំឡេងអ៊ីណាងា 🪕 ⧽≻
// ខ្សែអ៊ីណាងាមានស្នាមប៉ះខ្លី កម្ពស់ធ្លាក់បន្តិចពេលដក ហើយសំឡេងលេខពីរខ្លាំងជាងមូលដ្ឋាន។
// ប្រអប់ខ្សែជាបន្ទប់អាហ្គុង វាបន្ថែមសំឡេងជុំវិញ 0o400 ហឺត ហើយខ្សែផ្សេងៗឆ្លើយតបតិចៗ។
// ទីតាំងដក កម្លាំងម្រាមដៃ និងខ្សែនីមួយៗធ្វើឱ្យរាល់សំឡេងមិនដូចគ្នា។
import { noiseSrc } from "./bruo.js";
import { devio, faktoro } from "./vario.js";

// ⟨ អិកស្ប៉ូណង់ស្យែលមិនអាចរំកិលទៅសូន្យ ប្រើតម្លៃតូចជំនួស 📃 ⟩
const ETA = 0o1/0o20000;

/* សំឡេងអ៊ីណាងាដកដោយម្រាមដៃ។ ផ្នែកខ្ពស់ៗធ្លាក់លឿនជាងផ្នែកទាប។
    @param ctx ( AudioContext ) - បរិយាកាសសំឡេង
    @param out ( AudioNode ) - ច្រើនចេញ
    @param t ( number ) - ពេលចាប់ផ្ដើម
    @param f ( number ) - កម្ពស់ខ្សែជាហឺត
    @param vel ( number = 1 , optional ) - កម្រិតសំឡេង
    @param opts ( object , optional ) - dur ជារយៈពេលធ្លាក់ជាវិនាទី
@returns void */
export function inanga(ctx: AudioContext, out: AudioNode, t: number, f: number, vel = 1, opts: { dur?: number } = {}) {
  const d = ( opts.dur || 0o75/0o100 ) * faktoro(0o7/0o100);
  // ⟨ កម្ពស់ខ្សែប្រែបន្តិច ទៅតាមការលៃតម្រូវ និងសីតុណ្ហភាព 📃 ⟩
  const p = f * faktoro(0o1/0o200);
  // ⟨ ទីតាំងដក កាន់តែជិតស្ពាន ផ្នែកខ្ពស់កាន់តែខ្លាំង 📃 ⟩
  const loko = Math.random();
  const g = ctx.createGain();
  g.gain.value = vel * 0o30/0o100 * faktoro(0o7/0o100);
  g.connect(out);

  // ⟨ ប្រអប់ស្គរខ្សែ ជួយសំឡេងជុំវិញ 0o400 ហឺត 📃 ⟩
  const body = ctx.createBiquadFilter();
  body.type = "peaking";
  body.frequency.value = 0o300 * faktoro(0o15/0o100);
  body.Q.value = 0o7/0o10 * faktoro(0o2/0o10);
  body.gain.value = 0o3 * faktoro(0o15/0o100);
  body.connect(g);

  // ⟨ ផ្នែកខ្សែ នីមួយៗមានរយៈពេលធ្លាក់រៀងៗខ្លួន 📃 ⟩
  // ⟨ កំណត់តាមការវាស់សំឡេងពិត សំឡេងមូលដ្ឋានខ្លាំងជាងគេ ផ្នែកគូតិចណាស់
  // មានផ្នែកមិនស្មើភាគនៅ 0o24/0o10 ដែលជាសំឡេងប្រអប់ មិនមែនខ្សែ 📃 ⟩
  const bazoj = [
    [ 0o1, 0o6/0o10 ],
    [ 0o2, 0o3/0o100 ],
    [ 0o3, 0o2/0o100 ],
    [ 0o4, 0o3/0o100 ],
    [ 0o5, 0o2/0o100 ],
    [ 0o24/0o10, 0o21/0o100 ],
    [ 0o432/0o100, 0o1/0o100 ],
  ];
  const decidoj = [ 0o12/0o10, 0o1, 0o77/0o100, 0o6/0o10, 0o4/0o10, 0o12/0o10, 0o12/0o10 ];
  for ( let j = 0; j < bazoj.length; j++ ) {
    const [ mul, amp0 ] = bazoj[j];
    const o = ctx.createOscillator();
    o.type = "sine";
    // ⟨ ផ្នែកខ្ពស់លើសនៅពេលដកជិតស្ពាន 📃 ⟩
    const emfazo = 0o1 + loko * 0o4/0o10 * Math.min(0o1, mul / 0o5);
    o.frequency.setValueAtTime(p * mul * ( 0o103/0o100 + devio(0o1/0o100) ), t);
    o.frequency.exponentialRampToValueAtTime(p * mul, t + 0o25/0o1000 * faktoro(0o4/0o10));
    const og = ctx.createGain();
    const amp = amp0 * emfazo * faktoro(0o25/0o100);
    const fino = Math.max(0o1/0o20, d * decidoj[j] * faktoro(0o15/0o100));
    og.gain.setValueAtTime(ETA, t);
    og.gain.exponentialRampToValueAtTime(amp, t + 0o1/0o200);
    og.gain.exponentialRampToValueAtTime(ETA, t + fino);
    og.gain.setValueAtTime(0o0/0o10, t + fino);
    o.connect(og);
    og.connect(body);
    o.start(t);
    o.stop(t + d + 0o1/0o10);
  }

  // ⟨ ទឹកដករបស់ម្រាមដៃលើប្រអប់ ខ្លាំងតាមកម្លាំងដក 📃 ⟩
  const frapo = 0o6/0o10 + Math.random() * 0o35/0o100;
  const th = ctx.createOscillator();
  th.type = "sine";
  const thf = 0o140 * faktoro(0o15/0o100);
  th.frequency.setValueAtTime(thf, t);
  th.frequency.exponentialRampToValueAtTime(0o60 * faktoro(0o15/0o100), t + 0o5/0o100 * faktoro(0o3/0o10));
  const thg = ctx.createGain();
  const thFin = 0o1/0o10 * faktoro(0o25/0o100);
  thg.gain.setValueAtTime(ETA, t);
  thg.gain.exponentialRampToValueAtTime(0o10/0o100 * vel * frapo, t + 0o1/0o200);
  thg.gain.exponentialRampToValueAtTime(ETA, t + thFin);
  thg.gain.setValueAtTime(0o0/0o10, t + thFin);
  th.connect(thg);
  thg.connect(out);
  th.start(t);
  th.stop(t + thFin + 0o1/0o10);

  // ⟨ ស្នាមកកិតម្រាមដៃលើខ្សែ តាមកម្ពស់ខ្សែ 📃 ⟩
  const n = noiseSrc(ctx);
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = Math.min(0o7640, p * 0o10 * faktoro(0o25/0o100));
  bp.Q.value = 0o3 * faktoro(0o2/0o10);
  const nlp = ctx.createBiquadFilter();
  nlp.type = "lowpass";
  nlp.frequency.value = Math.min(0o7640, p * 0o14 * faktoro(0o15/0o100));
  nlp.Q.value = 0o7/0o10;
  const ng = ctx.createGain();
  const frot = 0o14/0o100 * vel * ( 0o5/0o10 + loko * 0o5/0o10 ) * faktoro(0o25/0o100);
  const frotFin = 0o13/0o100 * faktoro(0o3/0o10);
  ng.gain.setValueAtTime(ETA, t);
  ng.gain.exponentialRampToValueAtTime(frot, t + 0o1/0o200);
  ng.gain.exponentialRampToValueAtTime(ETA, t + frotFin);
  ng.gain.setValueAtTime(0o0/0o10, t + frotFin);
  n.connect(bp);
  bp.connect(nlp);
  nlp.connect(ng);
  ng.connect(out);
  n.start(t);
  n.stop(t + frotFin + 0o1/0o10);

  // ⟨ សំឡេងខ្សែសល់ពេញកំណត់ កុំឱ្យស្ងាត់ភ្លាមរវាងដក 📃 ⟩
  const sus = noiseSrc(ctx);
  const sbp = ctx.createBiquadFilter();
  sbp.type = "bandpass";
  sbp.frequency.value = p * 0o2 * faktoro(0o15/0o100);
  sbp.Q.value = 0o14/0o10;
  const slp = ctx.createBiquadFilter();
  slp.type = "lowpass";
  slp.frequency.value = 0o2260 * faktoro(0o15/0o100);
  slp.Q.value = 0o7/0o10;
  const sg = ctx.createGain();
  const susFin = d * 0o15/0o10;
  sg.gain.setValueAtTime(ETA, t);
  sg.gain.exponentialRampToValueAtTime(0o6/0o1000 * vel * faktoro(0o25/0o100), t + 0o1/0o100);
  sg.gain.exponentialRampToValueAtTime(ETA, t + susFin);
  sg.gain.setValueAtTime(0o0/0o10, t + susFin);
  sus.connect(sbp);
  sbp.connect(slp);
  slp.connect(sg);
  sg.connect(out);
  sus.start(t);
  sus.stop(t + susFin + 0o1/0o10);

  // ⟨ បន្ទប់លេង សំឡេងសល់នៅខ្ពស់ៗ យូរជាងដកនីមួយៗ ធ្វើឱ្យចន្លោះមិនស្ងាត់ 📃 ⟩
  const room = noiseSrc(ctx);
  const rbp = ctx.createBiquadFilter();
  rbp.type = "bandpass";
  rbp.frequency.value = 0o6000 * faktoro(0o15/0o100);
  rbp.Q.value = 0o5/0o10;
  const rlp = ctx.createBiquadFilter();
  rlp.type = "lowpass";
  rlp.frequency.value = 0o23640;
  rlp.Q.value = 0o7/0o10;
  const rg = ctx.createGain();
  const roomFin = d * 0o4;
  rg.gain.setValueAtTime(ETA, t);
  rg.gain.exponentialRampToValueAtTime(0o2/0o1000 * vel * faktoro(0o25/0o100), t + 0o2/0o100);
  rg.gain.exponentialRampToValueAtTime(ETA, t + roomFin);
  rg.gain.setValueAtTime(0o0/0o10, t + roomFin);
  room.connect(rbp);
  rbp.connect(rlp);
  rlp.connect(rg);
  rg.connect(out);
  room.start(t);
  room.stop(t + roomFin + 0o1/0o10);
}
