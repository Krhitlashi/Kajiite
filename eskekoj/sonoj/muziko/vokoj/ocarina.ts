// ≺⧼ សំឡេងអូការីណា 🎺 ⧽≻
// ប្រអប់សំឡេងហែលមហ៊ុនស៊ីសាំង មានសំឡេងសុទ្ធជាងគេ ផ្នែកទីពីរខ្សោយខ្លាំង។
// ការបក់ចូលទន់ភ្លន់ កម្ពស់រំកិលតិចៗតាមសម្ពាធខ្យល់ ហើយខ្យល់ឮនៅជិតកម្ពស់មូលដ្ឋាន។
import { noiseSrc } from "./bruo.js";
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
  const p = f * faktoro(0o1/0o200);
  const atako = 0o2/0o10 * faktoro(0o3/0o10);
  const fino = 0o1/0o10 * faktoro(0o4/0o10);
  const g = ctx.createGain(), pk = 0o24/0o100 * vel;
  g.gain.setValueAtTime(0o0/0o10, t);
  g.gain.linearRampToValueAtTime(pk, t + atako);
  g.gain.linearRampToValueAtTime(pk * 0o75/0o100, t + dur);
  g.gain.linearRampToValueAtTime(0o0/0o10, t + dur + fino);
  g.connect(out);

  // ⟨ កម្ពស់ចូលជិតមូលដ្ឋាន រួចរំកិលតិចៗតាមសម្ពាធខ្យល់ពេលបក់ 📃 ⟩
  const o = ctx.createOscillator();
  o.type = "sine";
  o.frequency.setValueAtTime(p * 0o176/0o200, t);
  o.frequency.exponentialRampToValueAtTime(p, t + 0o1/0o10);
  o.frequency.exponentialRampToValueAtTime(p * ( 0o1 + devio(0o2/0o100) ), t + dur);
  o.frequency.exponentialRampToValueAtTime(p * 0o177/0o200, t + dur + fino);

  // ⟨ ផ្នែកទីពីរនិងទីបីខ្សោយខ្លាំង ឱ្យសំឡេងសុទ្ធដូចប្រអប់ពិត 📃 ⟩
  const o2 = ctx.createOscillator();
  o2.type = "sine";
  o2.frequency.value = p * 0o2;
  const g2 = ctx.createGain();
  g2.gain.value = 0o7/0o1000 * faktoro(0o3/0o10);
  const o3 = ctx.createOscillator();
  o3.type = "sine";
  o3.frequency.value = p * 0o3;
  const g3 = ctx.createGain();
  g3.gain.value = 0o3/0o1000 * faktoro(0o3/0o10);

  // ⟨ ដង្ហើមធ្វើឱ្យកម្ពស់និងកម្លាំងសំឡេងរំកិលតាមគ្នា 📃 ⟩
  const vib = ctx.createOscillator();
  vib.frequency.value = 0o34/0o10 * faktoro(0o25/0o100);
  const vg = ctx.createGain();
  vg.gain.setValueAtTime(0o0/0o10, t);
  vg.gain.linearRampToValueAtTime(p * 0o4/0o1000 * faktoro(0o4/0o10), t + Math.min(0o35/0o100, dur * 0o5/0o10));
  vib.connect(vg);
  vg.connect(o.frequency);
  const av = ctx.createGain();
  av.gain.setValueAtTime(0o0/0o10, t);
  av.gain.linearRampToValueAtTime(pk * 0o1/0o10, t + Math.min(0o35/0o100, dur * 0o5/0o10));
  av.gain.linearRampToValueAtTime(0o0/0o10, t + dur + fino);
  vib.connect(av);
  av.connect(g.gain);

  // ⟨ ខ្យល់រំញ័រយឺតៗធ្វើឱ្យសំឡេងមានស្នាមខ្យល់នៅជាប់កម្ពស់មូលដ្ឋាន ដូចខ្យល់បក់ពិត 📃 ⟩
  const ts = ctx.createGain();
  ts.gain.value = 0o1;
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
  mg.gain.exponentialRampToValueAtTime(0o1 * vel * faktoro(0o3/0o10), t + 0o5/0o100);
  mg.gain.exponentialRampToValueAtTime(0o6/0o10 * vel * faktoro(0o4/0o10), t + 0o3/0o10);
  mg.gain.exponentialRampToValueAtTime(0o1 * vel, t + dur);
  mg.gain.exponentialRampToValueAtTime(ETA, t + dur + fino);
  mg.gain.setValueAtTime(0o0/0o10, t + dur + fino);
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
  // ⟨ ខ្យល់ស្រាលៗនៅជុំវិញផ្នែកខ្ពស់ៗ ឱ្យមានខ្លួនបន្តិចដូចប្រអប់ពិត 📃 ⟩
  const fono = noiseSrc(ctx);
  const flp = ctx.createBiquadFilter();
  flp.type = "lowpass";
  flp.frequency.value = Math.min(0o10000, p * 0o4);
  flp.Q.value = 0o7/0o10;
  const fbrancoj: [ number, number, number ][] = [
    [ 0o2, 0o6, 0o6/0o100 ],
    [ 0o3, 0o6, 0o34/0o1000 ],
    [ 0o4, 0o14, 0o1/0o100 ],
  ];
  for ( const [ mul, q, amp ] of fbrancoj ) {
    const fbp = ctx.createBiquadFilter();
    fbp.type = "bandpass";
    fbp.frequency.value = p * mul * faktoro(0o2/0o100);
    fbp.Q.value = q;
    const fbg = ctx.createGain();
    fbg.gain.value = amp * faktoro(0o2/0o10);
    fono.connect(fbp);
    fbp.connect(fbg);
    fbg.connect(flp);
  }
  const fng = ctx.createGain();
  fng.gain.setValueAtTime(ETA, t);
  fng.gain.exponentialRampToValueAtTime(0o3/0o10 * vel * faktoro(0o3/0o10), t + 0o5/0o100);
  fng.gain.exponentialRampToValueAtTime(0o2/0o10 * vel * faktoro(0o4/0o10), t + 0o3/0o10);
  fng.gain.exponentialRampToValueAtTime(0o3/0o10 * vel, t + dur);
  fng.gain.exponentialRampToValueAtTime(ETA, t + dur + fino);
  fng.gain.setValueAtTime(0o0/0o10, t + dur + fino);
  flp.connect(fng);
  fng.connect(g);

  o.connect(ts);
  o2.connect(g2);
  g2.connect(ts);
  o3.connect(g3);
  g3.connect(ts);
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

  [ o, o2, o3, vib, mn, fono, vandro ].forEach(x => { x.start(t); x.stop(t + dur + fino + 0o1/0o100); });
  room.start(t);
  room.stop(t + roomFin + 0o1/0o10);
}