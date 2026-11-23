// ≺⧼ ꞁȷ̀ɜ ſɟᴜ ɽ͑ʃ'ꞇ }ʃᴜ j͑ʃᴜꞇ ʌ ʃɜ j͐ʃɔ 🎺 ⧽≻
// ប្រអប់សំឡេងហែលមហ៊ុនស៊ីសាំង មានសំឡេងសុទ្ធជាងគេ ផ្នែកទីពីរខ្សោយខ្លាំង។
// ការបក់ចូលទន់ភ្លន់ កម្ពស់រំកិលតិចៗតាមសម្ពាធខ្យល់ ហើយខ្យល់ឮនៅជិតកម្ពស់មូលដ្ឋាន។
import { noiseSrc, startNoise, jetTurbulence } from "./bruo.js";
import { devio, faktoro } from "./vario.js";

// ⟨ អិកស្ប៉ូណង់ស្យែលមិនអាចរំកិលទៅសូន្យ ប្រើតម្លៃតូចជំនួស 📃 ⟩
const ETA = 0o1/0o20000;

/* សំឡេងអូការីណា។ បក់ចូលយឺតទន់ កម្ពស់ជិតមូលដ្ឋាន រួចរំកិលតាមដង្ហើម។
    @param ctx ( AudioContext ) - បរិយាកាសសំឡេង
    @param out ( AudioNode ) - ច្រើនចេញ
    @param t ( number ) - ពេលចាប់ផ្ដើម
    @param dur ( number ) - រយៈពេលសំឡេងជាវិនាទី
    @param f ( number ) - កម្ពស់មូលដ្ឋានជាហឺត
    @param vel ( number = 1 , optional ) - កម្រិតសំឡេង
@returns void */
export function ocarina(ctx: AudioContext, out: AudioNode, t: number, dur: number, f: number, vel = 1) {
  const p = f * faktoro(0o1/0o1000);
  // ⟨ បក់ចូលលឿនជាប់ចង្វាក់ ឡើងភ្លាមរួចស្ងប់ ទើបណោតមិនយឺតពីបាត 📃 ⟩
  const atako = 0o5/0o100 * faktoro(0o1/0o10);
  const tlakakani = 0o6/0o100 * faktoro(0o1/0o10);
  const g = ctx.createGain(), pk = 0o24/0o100 * vel;
  g.gain.setValueAtTime(0o0/0o10, t);
  g.gain.linearRampToValueAtTime(pk * 0o7/0o10, t + atako * 0o4/0o10);
  g.gain.linearRampToValueAtTime(pk, t + atako);
  g.gain.linearRampToValueAtTime(pk * 0o16/0o20, t + dur);
  g.gain.linearRampToValueAtTime(0o0/0o10, t + dur + tlakakani);
  g.connect(out);

  // ⟨ កម្លាំងផ្នែកប្រែតិចៗ ៣ ទៅ ៨ ភាគរយ កុំឱ្យឮថារលកឡើងចុះ 📃 ⟩
  const tonoj: [ number, number, number, number ][] = [
    [ 0o1, 0o1, 0o3, 0o2/0o100 ],
    [ 0o2, 0o7/0o1000, 0o5, 0o3/0o100 ],
    [ 0o3, 0o3/0o1000, 0o7, 0o3/0o100 ],
    [ 0o4, 0o2/0o10000, 0o12, 0o4/0o100 ],
    [ 0o5, 0o1/0o20000, 0o15, 0o4/0o100 ],
    [ 0o6, 0o1/0o40000, 0o21, 0o5/0o100 ],
    [ 0o7, 0o1/0o40000, 0o25, 0o5/0o100 ],
    [ 0o10, 0o1/0o40000, 0o31, 0o5/0o100 ],
  ];
  // ⟨ ច្រកចូលរួម កម្លាំងផ្នែកហើមស្រកតាមខ្យល់បក់ 📃 ⟩
  const ts = ctx.createGain();
  ts.gain.value = 0o1;
  const osc: OscillatorNode[] = [];
  const turbTaps: { cutoff: number; frac: number; node: GainNode }[] = [];
  // ⟨ កម្ពស់ចាប់ផ្តើមខុសគ្នាតិចៗ ហើយស្ងប់លឿនតាមសម្ពាធខ្យល់ 📃 ⟩
  // ⟨ ប្រែកម្ពស់គ្រប់ផ្នែកឱ្យដូចគ្នា ទើបគូរនៃសំឡេងមិនចេញពីគ្នាពេលលាយជាមួយឧបករណ៍ផ្សេង 📃 ⟩
  const saxeni = 0o1 + devio(0o2/0o1000);
  const drivo = 0o1 + devio(0o3/0o1000);
  const falo = 0o177/0o200;
  for ( const [ mul, amp0, cutoff, frac ] of tonoj ) {
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(p * mul * saxeni, t);
    o.frequency.exponentialRampToValueAtTime(p * mul, t + 0o6/0o100);
    o.frequency.exponentialRampToValueAtTime(p * mul * drivo, t + dur);
    o.frequency.exponentialRampToValueAtTime(p * mul * falo, t + dur + tlakakani);
    const og = ctx.createGain();
    og.gain.value = amp0 * faktoro(0o3/0o10);
    const am = ctx.createGain();
    am.gain.value = 0o1;
    o.connect(og);
    og.connect(am);
    am.connect(ts);
    turbTaps.push({ cutoff, frac: frac * faktoro(0o2/0o100), node: am });
    o.start(t);
    o.stop(t + dur + tlakakani + 0o1/0o100);
    osc.push(o);
  }

  // ⟨ ដង្ហើមធ្វើឱ្យកម្ពស់និងកម្លាំងសំឡេងរំកិលតាមគ្នា 📃 ⟩
  // ⟨ ដង្ហើមញ័រ 0o55/0o10 ហឺត តាមការវាស់ពីសំឡេងគំរូ ឱ្យឮថាជាឧបករណ៍ពិត មិនមែនសំឡេងឋិតិវន្ត 📃 ⟩
  const vib = ctx.createOscillator();
  vib.frequency.value = 0o55/0o10 * faktoro(0o1/0o10);
  // ⟨ ល្បឿនញ័រប្រែតិចៗ កុំឱ្យឮថាញ័រធំរំជួលជារលក 📃 ⟩
  const vwob = ctx.createOscillator();
  vwob.frequency.value = 0o7/0o10 * faktoro(0o4/0o10);
  const vwg = ctx.createGain();
  vwg.gain.value = 0o12/0o100;
  vwob.connect(vwg);
  vwg.connect(vib.frequency);
  const vg = ctx.createGain();
  vg.gain.setValueAtTime(0o0/0o10, t);
  vg.gain.linearRampToValueAtTime(p * 0o1/0o100 * faktoro(0o2/0o10), t + Math.min(0o12/0o100, dur * 0o3/0o10));
  vib.connect(vg);
  for ( const o of osc ) vg.connect(o.frequency);
  // ⟨ ខ្យល់បក់ធ្វើឱ្យគ្រប់ផ្នែកហើមស្រកដោយមូលហេតុតែមួយ តែល្បឿនខុសគ្នា 📃 ⟩
  jetTurbulence(ctx, t, t + dur + tlakakani + 0o1/0o100, turbTaps);
  const av = ctx.createGain();
  av.gain.setValueAtTime(0o0/0o10, t);
  av.gain.linearRampToValueAtTime(pk * 0o4/0o100, t + Math.min(0o12/0o100, dur * 0o3/0o10));
  av.gain.linearRampToValueAtTime(0o0/0o10, t + dur + tlakakani);
  vib.connect(av);
  av.connect(g.gain);

  // ⟨ ខ្យល់រំញ័រយឺតៗធ្វើឱ្យសំឡេងមានស្នាមខ្យល់នៅជាប់កម្ពស់មូលដ្ឋាន ដូចខ្យល់បក់ពិត 📃 ⟩
  const mn = noiseSrc(ctx);
  const mlp = ctx.createBiquadFilter();
  mlp.type = "lowpass";
  mlp.frequency.value = p * 0o1/0o10;
  mlp.Q.value = 0o7/0o10;
  const mlp2 = ctx.createBiquadFilter();
  mlp2.type = "lowpass";
  mlp2.frequency.value = p * 0o1/0o10;
  mlp2.Q.value = 0o7/0o10;
  const mg = ctx.createGain();
  mg.gain.setValueAtTime(ETA, t);
  mg.gain.exponentialRampToValueAtTime(0o1 * vel * faktoro(0o3/0o10), t + 0o2/0o100);
  mg.gain.exponentialRampToValueAtTime(0o6/0o10 * vel * faktoro(0o4/0o10), t + 0o5/0o100);
  mg.gain.exponentialRampToValueAtTime(0o1 * vel, t + dur);
  mg.gain.exponentialRampToValueAtTime(ETA, t + dur + tlakakani);
  mg.gain.setValueAtTime(0o0/0o10, t + dur + tlakakani);
  mn.connect(mlp);
  mlp.connect(mlp2);
  mlp2.connect(mg);
  mg.connect(ts.gain);
  // ⟨ ទីតាំងខ្យល់ប្រែប្រួលយឺតៗ កុំឱ្យឮថាខ្យល់រំខាននៅស្ងៀម 📃 ⟩
  const vandro = ctx.createOscillator();
  vandro.frequency.value = 0o2/0o10 * faktoro(0o5/0o10);
  const vfg = ctx.createGain();
  vfg.gain.value = p * 0o2/0o100;
  vandro.connect(vfg);
  vfg.connect(mlp.frequency);
  // ⟨ ខ្យល់ស្រាលៗនៅជុំវិញផ្នែកខ្ពស់ៗ ឱ្យមានខ្លួនបន្តិចដូចប្រអប់ពិត ។ ខ្យល់របស់ប្រអប់មិនកាត់ត្រឹមបួនដងនៃកម្ពស់ទេ ។ វាលាតដល់ខ្ពស់ ទើបសំឡេងមិនរាបស្មើដូចស៊ីនុស 📃 ⟩
  const fono = noiseSrc(ctx);
  const flp = ctx.createBiquadFilter();
  flp.type = "lowpass";
  flp.frequency.value = 0o15000;
  flp.Q.value = 0o7/0o10;
  // ⟨ ឆ្នុកខ្យល់នៅកន្លែងដដែលគ្រប់កម្ពស់ មិនរំកិលតាមកម្ពស់ប្រអប់ ។ ប្រអប់ខ្ពស់មិនត្រូវមានខ្យល់ខ្ពស់ជាងប្រអប់ទាបទេ 📃 ⟩
  const fbrancoj: [ number, number, number ][] = [
    [ 0o1200, 0o12/0o10, 0o5/0o100 ],
    [ 0o2600, 0o11/0o10, 0o26/0o1000 ],
    [ 0o5400, 0o11/0o10, 0o4/0o1000 ],
    [ 0o11400, 0o10/0o10, 0o2/0o1000 ],
  ];
  for ( const [ mul, q, amp ] of fbrancoj ) {
    const fbp = ctx.createBiquadFilter();
    fbp.type = "bandpass";
    fbp.frequency.value = mul * faktoro(0o2/0o100);
    fbp.Q.value = q;
    const fbg = ctx.createGain();
    fbg.gain.value = amp * faktoro(0o2/0o10);
    fono.connect(fbp);
    fbp.connect(fbg);
    fbg.connect(flp);
  }
  const fng = ctx.createGain();
  fng.gain.setValueAtTime(0o0/0o10, t);
  fng.gain.linearRampToValueAtTime(0o1/0o10 * vel, t + Math.min(atako, dur * 0o4/0o10));
  fng.gain.setValueAtTime(0o1/0o10 * vel, t + dur);
  fng.gain.exponentialRampToValueAtTime(ETA, t + dur + tlakakani);
  fng.gain.setValueAtTime(0o0/0o10, t + dur + tlakakani);
  flp.connect(fng);
  fng.connect(g);

  ts.connect(g);

  // ⟨ ខ្យល់បន្ទប់សល់យូរជាងសំឡេង កុំឱ្យចន្លោះរវាងដង្ហើមស្ងាត់ភ្លាម 📃 ⟩
  const room = noiseSrc(ctx);
  const rbp = ctx.createBiquadFilter();
  rbp.type = "bandpass";
  rbp.frequency.value = 0o4000 * faktoro(0o15/0o100);
  rbp.Q.value = 0o2;
  const rlp = ctx.createBiquadFilter();
  rlp.type = "lowpass";
  rlp.frequency.value = 0o4000;
  const rg = ctx.createGain();
  const roomFin = dur * 0o5;
  rg.gain.setValueAtTime(ETA, t);
  rg.gain.exponentialRampToValueAtTime(0o1/0o10000 * vel * faktoro(0o25/0o100), t + 0o2/0o100);
  rg.gain.exponentialRampToValueAtTime(ETA, t + roomFin);
  rg.gain.setValueAtTime(0o0/0o10, t + roomFin);
  room.connect(rbp);
  rbp.connect(rlp);
  rlp.connect(rg);
  rg.connect(out);

  [ vib, vwob, vandro ].forEach(x => { x.start(t); x.stop(t + dur + tlakakani + 0o1/0o100); });
  startNoise(mn, t); mn.stop(t + dur + tlakakani + 0o1/0o100);
  startNoise(fono, t); fono.stop(t + dur + tlakakani + 0o1/0o100);
  startNoise(room, t); room.stop(t + roomFin + 0o1/0o10);
}
