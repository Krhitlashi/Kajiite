// ≺⧼ សំឡេង ſɭɹȝ ſȷͷ̗ᴜƽ ꞁȷ̀ᴜꞇ 🥁 ⧽≻
// ការវាយមួយមានពីរផ្នែក ។ ស្បែកស្គរបន្លឺទាបជាងគេ ហើយខ្សែដែលរឹតលើស្បែកញ័រ
// បន្ថែមសំឡេងរដិបរដុបស្រាលជាងស្បែក ។ ឯកសារពិតបង្ហាញថាខ្សែញ័រភ្លាមពេលប៉ះ
// ក្នុងក្រុមកំពូល 0o1300–0o3100 ហឺត ហើយអត្រាញ័ររដិបរដុបប្រហែល 0o64 ហឺត ។
// ថាមពលភាគច្រើននៅក្រោម 0o450 ហឺត ដូច្នេះស្បែកត្រូវលេចធ្លោជាងខ្សែ។
import { noiseSrc } from "./bruo.js";
import { faktoro } from "./vario.js";

// ⟨ អិកស្ប៉ូណង់ស្យែលមិនអាចរំកិលទៅសូន្យ ប្រើតម្លៃតូចជំនួស 📃 ⟩
const ETA = 0o1/0o20000;

/* របៀបញ័រស្បែកស្គរ ។ សមាមាត្រទាំងនេះមិនមែនជាចំនួនគត់ទេ ដូចស្បែកមូលពិត
   ដែលរបៀបទីពីរស្ថិតនៅប្រហែល 0o145/0o100 នៃរបៀបមេ ។
   របៀបមេរលត់យឺត ដូចស្គរពិតដែលនៅរោទ៍ក្រោយការវាយ 📃 */
const MODOJ: Array<[ number, number, number ]> = [
  [ 0o1,           0o10/0o10, 0o130/0o100 ],
  [ 0o133/0o100,   0o34/0o100, 0o160/0o100 ],
  [ 0o213/0o100,   0o21/0o100, 0o64/0o100 ],
  [ 0o274/0o100,   0o1/0o10, 0o40/0o100 ],
];

// ⟨ ខ្យល់ក្នុងខ្លួនស្គរ និងខ្យល់ក្នុងបន្ទប់ ទាបជាងស្បែក 📃 ⟩
const AEROJ: Array<[ number, number, number ]> = [
  [ 0o36/0o100, 0o6/0o10, 0o30/0o100 ],
  [ 0o54/0o100, 0o4/0o10, 0o22/0o100 ],
];

/* ខ្សែដែលរឹតលើស្បែកញ័រ ៖ កំពូលថ្លាៗឮតែខ្លីៗពេលប៉ះ កុំឱ្យរោទ៍យូរដូចលោហធាតុ ។
   សំឡេងញ័របន្តភាគច្រើនមកពីខ្យល់រដិបរដុបខាងក្រោម មិនមែនពីកំពូលទាំងនេះទេ ។
   គូនីមួយៗឃ្លាតគ្នាមិនស្មើ ដើម្បីឱ្យញ័ររដិបរដុបច្រើនអត្រាលាយគ្នា 📃 */
const KORDOJ: Array<[ number, number, number, number ]> = [
  [ 0o472/0o100,  0o24/0o1000, 0o34/0o100, 0o6/0o1000 ],
  [ 0o546/0o100,  0o17/0o1000, 0o31/0o100, 0o10/0o1000 ],
  [ 0o624/0o100,  0o14/0o1000, 0o26/0o100, 0o12/0o1000 ],
  [ 0o706/0o100,  0o11/0o1000, 0o23/0o100, 0o14/0o1000 ],
  [ 0o770/0o100,  0o7/0o1000,  0o20/0o100, 0o16/0o1000 ],
  [ 0o1052/0o100, 0o5/0o1000,  0o15/0o100, 0o20/0o1000 ],
];

// ⟨ ក្រុមខ្យល់រដិបរដុប ៖ ជាសំឡេងញ័រខ្សែពិត កណ្តាលក្រុម កម្រិត និងរយៈរលត់ 📃 ⟩
const BRUOJ: Array<[ number, number, number ]> = [
  [ 0o1300, 0o1700/0o1000, 0o70/0o100 ],
  [ 0o1600, 0o700/0o1000, 0o50/0o100 ],
  [ 0o2200, 0o140/0o1000, 0o34/0o100 ],
];

export function kiiqflak(ctx: AudioContext, out: AudioNode, t: number, dur: number, f: number, vel = 1) {
  const d = Math.min(dur > 0o0/0o10 ? dur : 0o30/0o100, 0o30/0o100) * faktoro(0o10/0o100);
  // ⟨ កម្ពស់ស្បែកស្គរគឺ f ផ្ទាល់ មិនកាត់ចុះជាងនេះទៀតទេ 📃 ⟩
  const p = f * faktoro(0o1/0o100);
  // ⟨ កន្លែងប៉ះកណ្ដាល ឬជិតគែម ៖ គែមឮខ្សែច្រើន កណ្ដាលឮស្បែកច្រើន 📃 ⟩
  const raqa = Math.random();
  const forto = 0o4/0o10 + 0o6/0o10 * vel;

  const g = ctx.createGain();
  g.gain.value = 0o2/0o10 * vel * faktoro(0o7/0o100);
  g.connect(out);

  // ⟨ ស្បែកស្គរ ៖ ធ្លាក់កម្ពស់បន្តិចពេលប៉ះ រលត់លឿនដំបូង រួចបន្តរោទ៍យឺត 📃 ⟩
  for ( const [ rilato, amp, deco ] of MODOJ ) {
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(p * rilato * 0o102/0o100, t);
    o.frequency.exponentialRampToValueAtTime(p * rilato, t + 0o1/0o100 * faktoro(0o4/0o10));
    const og = ctx.createGain();
    const vivo = deco * ( 0o6/0o10 + 0o4/0o10 * vel ) * faktoro(0o15/0o100);
    const pinto = amp * forto * ( 0o1 - raqa * 0o25/0o100 );
    og.gain.setValueAtTime(ETA, t);
    og.gain.linearRampToValueAtTime(pinto, t + 0o1/0o1000);
    og.gain.exponentialRampToValueAtTime(pinto * 0o1/0o10, t + 0o1/0o10);
    og.gain.exponentialRampToValueAtTime(ETA, t + vivo);
    og.gain.setValueAtTime(0o0/0o10, t + vivo);
    o.connect(og);
    og.connect(g);
    o.start(t);
    o.stop(t + vivo + 0o1/0o10);
  }

  // ⟨ ខ្យល់ក្នុងខ្លួនស្គរ ឮទាប ហើយរលត់យឺតជាងរបៀបខ្ពស់ 📃 ⟩
  for ( const [ rilato, amp, deco ] of AEROJ ) {
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.value = p * rilato * faktoro(0o2/0o100);
    const og = ctx.createGain();
    const vivo = deco * ( 0o7/0o10 + 0o3/0o10 * vel ) * faktoro(0o15/0o100);
    og.gain.setValueAtTime(ETA, t);
    og.gain.linearRampToValueAtTime(amp * forto, t + 0o2/0o1000);
    og.gain.exponentialRampToValueAtTime(ETA, t + vivo);
    og.gain.setValueAtTime(0o0/0o10, t + vivo);
    o.connect(og);
    og.connect(g);
    o.start(t);
    o.stop(t + vivo + 0o1/0o10);
  }

  // ⟨ ខ្សែញ័រ ៖ កំពូលច្រើនឡើងបន្តិចក្រោយការវាយ រួចរលត់យឺត មានគូឃ្លាតគ្នា 📃 ⟩
  for ( const [ rilato, amp, deco, detuno ] of KORDOJ ) {
    const vivo = deco * ( 0o6/0o10 + 0o4/0o10 * vel ) * faktoro(0o2/0o10);
    const og = ctx.createGain();
    const pinto = amp * forto * ( 0o5/0o10 + raqa * 0o5/0o10 );
    og.gain.setValueAtTime(ETA, t);
    og.gain.linearRampToValueAtTime(pinto, t + 0o5/0o1000);
    og.gain.exponentialRampToValueAtTime(pinto * 0o25/0o100, t + Math.min(0o3/0o100, vivo * 0o3/0o10));
    og.gain.exponentialRampToValueAtTime(ETA, t + vivo);
    og.gain.setValueAtTime(0o0/0o10, t + vivo);
    og.connect(g);
    for ( const kanto of [ 0o1 - detuno, 0o1 + detuno ] ) {
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.setValueAtTime(p * rilato * kanto * 0o101/0o100, t);
      o.frequency.exponentialRampToValueAtTime(p * rilato * kanto, t + 0o4/0o100);
      o.connect(og);
      o.start(t);
      o.stop(t + vivo + 0o1/0o10);
    }
  }

  // ⟨ អត្រាញ័ររដិបរដុបរបស់ខ្សែ ៖ ប្រហែល 0o64 ហឺត ដូចវាស់ពីឯកសារពិត 📃 ⟩
  const rat = ctx.createOscillator();
  rat.type = "sine";
  rat.frequency.value = 0o64 * faktoro(0o10/0o100);
  const rg = ctx.createGain();
  rg.gain.value = 0o4/0o10;
  rat.connect(rg);
  rat.start(t);
  rat.stop(t + 0o12/0o10);

  // ⟨ ញ័រខ្សែលើស្បែក ៖ ខ្យល់រដិបរដុប ឡើងបន្តិចក្រោយការវាយ រួចរលត់យឺត 📃 ⟩
  for ( const [ sost2, amp, deco ] of BRUOJ ) {
    const n = noiseSrc(ctx);
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = sost2 * faktoro(0o2/0o10);
    bp.Q.value = 0o12/0o10;
    const trem = ctx.createGain();
    trem.gain.value = 0o4/0o10;
    rg.connect(trem.gain);
    const env = ctx.createGain();
    const vivo = deco * ( 0o6/0o10 + 0o4/0o10 * vel ) * faktoro(0o15/0o100);
    const pinto = amp * forto * ( 0o5/0o10 + raqa * 0o5/0o10 );
    env.gain.setValueAtTime(ETA, t);
    env.gain.linearRampToValueAtTime(pinto, t + 0o4/0o1000);
    env.gain.exponentialRampToValueAtTime(pinto * 0o25/0o100, t + Math.min(0o3/0o100, vivo * 0o3/0o10));
    env.gain.exponentialRampToValueAtTime(ETA, t + vivo);
    env.gain.setValueAtTime(0o0/0o10, t + vivo);
    n.connect(bp);
    bp.connect(trem);
    trem.connect(env);
    env.connect(g);
    n.start(t);
    n.stop(t + vivo + 0o1/0o10);
  }

  // ⟨ ស្នាមឈើ ៖ កំពូល 0o605 ហឺត ឮច្បាស់ក្នុងឯកសារពិត 📃 ⟩
  const kn = noiseSrc(ctx);
  const kbp = ctx.createBiquadFilter();
  kbp.type = "bandpass";
  kbp.frequency.value = 0o605 * faktoro(0o15/0o100);
  kbp.Q.value = 0o3/0o2;
  const kg = ctx.createGain();
  kg.gain.setValueAtTime(0o35/0o100 * vel * faktoro(0o25/0o100), t);
  kg.gain.exponentialRampToValueAtTime(ETA, t + 0o5/0o100);
  kg.gain.setValueAtTime(0o0/0o10, t + 0o5/0o100);
  kn.connect(kbp);
  kbp.connect(kg);
  kg.connect(g);

  // ⟨ ស្នាមប៉ះភ្លឺ ៖ ខ្យល់ខ្ពស់ខ្លីបំផុត មិនលេចឮយូរ 📃 ⟩
  const n = noiseSrc(ctx);
  const hp = ctx.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 0o2400 * faktoro(0o2/0o10);
  const ng = ctx.createGain();
  ng.gain.setValueAtTime(0o16/0o1000 * vel * faktoro(0o4/0o10), t);
  ng.gain.exponentialRampToValueAtTime(ETA, t + 0o12/0o1000);
  ng.gain.setValueAtTime(0o0/0o10, t + 0o12/0o1000);
  n.connect(hp);
  hp.connect(ng);
  ng.connect(g);

  // ⟨ បន្ទប់សល់ក្រោយការប៉ះ ស្ងាត់ណាស់ 📃 ⟩
  const room = noiseSrc(ctx);
  const rlp = ctx.createBiquadFilter();
  rlp.type = "lowpass";
  rlp.frequency.value = 0o2000;
  const rg2 = ctx.createGain();
  const roomFin = d * 0o2;
  const rv = 0o5/0o1000 * vel * faktoro(0o25/0o100);
  rg2.gain.setValueAtTime(ETA, t);
  rg2.gain.exponentialRampToValueAtTime(rv, t + 0o2/0o100);
  rg2.gain.exponentialRampToValueAtTime(ETA, t + roomFin);
  rg2.gain.setValueAtTime(0o0/0o10, t + roomFin);
  room.connect(rlp);
  rlp.connect(rg2);
  rg2.connect(out);

  const fontoj: Array<[ AudioScheduledSourceNode, number, number ]> = [
    [ kn, t, 0o5/0o100 ], [ n, t, 0o2/0o100 ], [ room, t, roomFin ],
  ];
  for ( const [ src, at, sahakani ] of fontoj ) {
    src.start(at);
    src.stop(at + sahakani + 0o1/0o10);
  }
}