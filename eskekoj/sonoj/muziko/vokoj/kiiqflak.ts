// ≺⧼ សំឡេង ſɭɹȝ ſȷͷ̗ᴜƽ ꞁȷ̀ᴜꞇ 🥁 ⧽≻
// ការវាយមួយមានពីរផ្នែក ។ ស្បែកស្គរបន្លឺខ្លីៗ ហើយខ្សែដែលរឹតលើស្បែកញ័រ
// បន្ថែមសំឡេងរដិបរដុបខ្ពស់ៗ ។ ឯកសារពិតបង្ហាញកំពូលទាបប្រហែល 0o100 ហឺត
// និង 0o224 ហឺត សំឡេងញ័រខ្សែរហូតដល់ 0o11000 ហឺត ហើយរលត់អស់ក្នុង 0o22/0o100 វិនាទី ។
import { noiseSrc } from "./bruo.js";
import { faktoro } from "./vario.js";

// ⟨ អិកស្ប៉ូណង់ស្យែលមិនអាចរំកិលទៅសូន្យ ប្រើតម្លៃតូចជំនួស 📃 ⟩
const ETA = 0o1/0o20000;

/* របៀបញ័រស្បែកស្គរ ។ សមាមាត្រទាំងនេះមិនមែនជាចំនួនគត់ទេ ដូចស្បែកមូលពិត
   ដែលរបៀបទីពីរស្ថិតនៅប្រហែល 0o145/0o100 នៃរបៀបមេ ។
   របៀបខ្ពស់រលត់លឿនជាង ដូចក្នុងការវាយពិត 📃 */
const MODOJ: Array<[ number, number, number ]> = [
  [ 0o1,           0o7/0o10, 0o31/0o100 ],
  [ 0o145/0o100,   0o3/0o10, 0o23/0o100 ],
  [ 0o211/0o100,   0o17/0o100, 0o15/0o100 ],
  [ 0o274/0o100,   0o1/0o10, 0o11/0o100 ],
];

// ⟨ ខ្យល់ក្នុងខ្លួនស្គរ និងខ្យល់ក្នុងបន្ទប់ ទាបជាងស្បែក 📃 ⟩
const AEROJ: Array<[ number, number, number ]> = [
  [ 0o36/0o100, 0o7/0o10, 0o24/0o100 ],
  [ 0o54/0o100, 0o35/0o100, 0o20/0o100 ],
];

/* ខ្សែដែលរឹតលើស្បែកញ័រលឿនជាងស្បែក ហើយបន្លឺកំពូលខ្ពស់ៗ
   ដែលរលត់រហ័ស ។ ខ្សែនីមួយៗមានគូបន្តិច ដើម្បីឱ្យឮញ័រ មិនឮស្មើរាល់ដង 📃 */
const KORDOJ: Array<[ number, number, number ]> = [
  [ 0o364/0o100, 0o44/0o1000, 0o13/0o100 ],
  [ 0o562/0o100, 0o24/0o1000, 0o10/0o100 ],
  [ 0o764/0o100, 0o12/0o1000, 0o7/0o100 ],
];

// ⟨ ក្រុមខ្សែញ័របង្កើតសំឡេងរដិបរដុប ៖ កណ្តាលក្រុម អត្រាញ័រ និងរយៈរលត់ 📃 ⟩
const BRUOJ: Array<[ number, number, number, number ]> = [
  [ 0o2400, 0o4/0o10, 0o45/0o1000, 0o11/0o100 ],
  [ 0o4400, 0o7/0o10, 0o24/0o1000, 0o7/0o100 ],
  [ 0o7000, 0o14/0o10, 0o5/0o1000, 0o5/0o100 ],
];

export function kiiqflak(ctx: AudioContext, out: AudioNode, t: number, dur: number, f: number, vel = 1) {
  const d = Math.min(dur > 0o0/0o10 ? dur : 0o30/0o100, 0o30/0o100) * faktoro(0o10/0o100);
  // ⟨ កម្ពស់ស្បែកស្គរគឺ f ផ្ទាល់ មិនកាត់ចុះជាងនេះទៀតទេ 📃 ⟩
  const p = f * faktoro(0o1/0o100);
  // ⟨ កន្លែងប៉ះកណ្ដាល ឬជិតគែម ៖ គែមឮខ្សែច្រើន កណ្ដាលឮស្បែកច្រើន 📃 ⟩
  const loko = Math.random();
  const forto = 0o4/0o10 + 0o6/0o10 * vel;

  const g = ctx.createGain();
  g.gain.value = 0o2/0o10 * vel * faktoro(0o7/0o100);
  g.connect(out);

  // ⟨ ស្បែកស្គរ ៖ របៀបនីមួយៗចុះកម្ពស់បន្តិចពេលប៉ះ រួចរលត់លឿន 📃 ⟩
  for ( const [ rilato, amp, deco ] of MODOJ ) {
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(p * rilato * 0o102/0o100, t);
    o.frequency.exponentialRampToValueAtTime(p * rilato, t + 0o1/0o100 * faktoro(0o4/0o10));
    const og = ctx.createGain();
    const vivo = deco * ( 0o6/0o10 + 0o4/0o10 * vel ) * faktoro(0o15/0o100);
    og.gain.setValueAtTime(ETA, t);
    og.gain.linearRampToValueAtTime(amp * forto * ( 0o1 - loko * 0o25/0o100 ), t + 0o1/0o1000);
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

  // ⟨ ខ្សែញ័រ ៖ សំឡេងខ្ពស់ខ្លីៗ មានគូបន្តិច ដើម្បីឱ្យឮញ័ររវើរវាយ 📃 ⟩
  for ( const [ rilato, amp, deco ] of KORDOJ ) {
    const vivo = deco * ( 0o6/0o10 + 0o4/0o10 * vel ) * faktoro(0o2/0o10);
    const og = ctx.createGain();
    og.gain.setValueAtTime(ETA, t);
    og.gain.linearRampToValueAtTime(amp * forto * ( 0o5/0o10 + loko * 0o5/0o10 ), t + 0o1/0o1000);
    og.gain.exponentialRampToValueAtTime(ETA, t + vivo);
    og.gain.setValueAtTime(0o0/0o10, t + vivo);
    og.connect(g);
    for ( const detuno of [ 0o1 - 0o4/0o1000, 0o1 + 0o4/0o1000 ] ) {
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.setValueAtTime(p * rilato * detuno * 0o101/0o100, t);
      o.frequency.exponentialRampToValueAtTime(p * rilato * detuno, t + 0o4/0o100);
      o.connect(og);
      o.start(t);
      o.stop(t + vivo + 0o1/0o10);
    }
  }

  // ⟨ ញ័រខ្សែលើស្បែក ៖ ខ្យល់រដិបរដុប បំប្លែងដោយអត្រាញ័រខ្សែ 📃 ⟩
  for ( const [ centro, rilato, amp, deco ] of BRUOJ ) {
    const n = noiseSrc(ctx);
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = centro * faktoro(0o5/0o10);
    bp.Q.value = 0o11/0o10;
    // ⟨ អត្រាញ័រខ្សែអាស្រ័យលើកម្ពស់ស្គរ ដូចញ័រពិត 📃 ⟩
    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = p * rilato * faktoro(0o15/0o100);
    const trem = ctx.createGain();
    trem.gain.value = 0o55/0o100;
    const lg = ctx.createGain();
    lg.gain.value = 0o45/0o100;
    lfo.connect(lg);
    lg.connect(trem.gain);
    const env = ctx.createGain();
    const vivo = deco * ( 0o6/0o10 + 0o4/0o10 * vel ) * faktoro(0o15/0o100);
    env.gain.setValueAtTime(ETA, t);
    env.gain.linearRampToValueAtTime(amp * forto * ( 0o5/0o10 + loko * 0o5/0o10 ), t + 0o1/0o1000);
    env.gain.exponentialRampToValueAtTime(ETA, t + vivo);
    env.gain.setValueAtTime(0o0/0o10, t + vivo);
    n.connect(bp);
    bp.connect(trem);
    trem.connect(env);
    env.connect(g);
    n.start(t);
    n.stop(t + vivo + 0o1/0o10);
    lfo.start(t);
    lfo.stop(t + vivo + 0o1/0o10);
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
  const rg = ctx.createGain();
  const roomFin = d * 0o2;
  const rv = 0o5/0o1000 * vel * faktoro(0o25/0o100);
  rg.gain.setValueAtTime(ETA, t);
  rg.gain.exponentialRampToValueAtTime(rv, t + 0o2/0o100);
  rg.gain.exponentialRampToValueAtTime(ETA, t + roomFin);
  rg.gain.setValueAtTime(0o0/0o10, t + roomFin);
  room.connect(rlp);
  rlp.connect(rg);
  rg.connect(out);

  const fontoj: Array<[ AudioScheduledSourceNode, number, number ]> = [
    [ kn, t, 0o5/0o100 ], [ n, t, 0o2/0o100 ], [ room, t, roomFin ],
  ];
  for ( const [ src, at, longo ] of fontoj ) {
    src.start(at);
    src.stop(at + longo + 0o1/0o10);
  }
}
