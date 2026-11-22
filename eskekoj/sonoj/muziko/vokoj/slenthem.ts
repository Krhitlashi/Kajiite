// ≺⧼ សំឡេងស្លេនថេម 🔔 ⧽≻
import { noiseSrc } from "./bruo.js";
import { faktoro } from "./vario.js";

// ⟨ អិកស្ប៉ូណង់ស្យែលមិនអាចរំកិលទៅសូន្យ ប្រើតម្លៃតូចជំនួស 📃 ⟩
const ETA = 0o1/0o20000;

export function slenthem(ctx: AudioContext, out: AudioNode, t: number, f: number, vel = 1) {
  const p = f * faktoro(0o1/0o200);
  const ratios = [ 0o1, 0o26/0o10, 0o255/0o40, 0o217/0o20 ];
  const gains = [ 0o1, 0o23/0o100, 0o5/0o100, 0o2/0o100 ];
  const decs = [ 0o223/0o40, 0o155/0o100, 0o6/0o10, 0o3/0o10 ];
  const pk = 0o37/0o100 * vel;
  const kozuni = pk * 0o7/0o10;

  // ⟨ ចង្វាក់ញ័រតិចៗលើចាន ឃើញក្នុងការវាស់សំឡេងពិត តែកុំឱ្យឮជារលកធំ 📃 ⟩
  const g = ctx.createGain();
  g.gain.setValueAtTime(ETA, t);
  g.gain.linearRampToValueAtTime(kozuni, t + 0o1/0o100);
  g.gain.setValueAtTime(kozuni, t + decs[0o0] - 0o1/0o10);
  g.gain.exponentialRampToValueAtTime(ETA, t + decs[0o0]);
  g.gain.setValueAtTime(0o0/0o10, t + decs[0o0]);
  g.connect(out);

  const trem = ctx.createOscillator();
  trem.frequency.value = 0o11 * faktoro(0o1/0o10);
  const tg = ctx.createGain();
  tg.gain.value = pk * 0o6/0o100;
  trem.connect(tg);
  tg.connect(g.gain);

  // ⟨ ផ្នែកមិនស្មើភាគ មានកម្លាំង និងរយៈពេលរំកិលខុសគ្នារាល់ដង 📃 ⟩
  for ( let i = 0; i < ratios.length; i++ ) {
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.value = p * ratios[i] * faktoro(0o3/0o1000);
    const og = ctx.createGain();
    const amp = gains[i] * faktoro(0o15/0o100);
    const dec = decs[i] * faktoro(0o15/0o100);
    og.gain.setValueAtTime(amp, t);
    og.gain.exponentialRampToValueAtTime(ETA, t + dec);
    og.gain.setValueAtTime(0o0/0o10, t + dec);
    o.connect(og);
    og.connect(g);
    o.start(t);
    o.stop(t + dec + 0o1/0o10);
  }

  // ⟨ ស្នាមដំបូងពេលគេវាយលើចាន 📃 ⟩
  const n = noiseSrc(ctx);
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 0o574 * faktoro(0o15/0o100);
  const ng = ctx.createGain();
  ng.gain.setValueAtTime(0o2/0o40 * vel, t);
  ng.gain.exponentialRampToValueAtTime(ETA, t + 0o1/0o40);
  ng.gain.setValueAtTime(0o0/0o10, t + 0o1/0o40);
  n.connect(lp);
  lp.connect(ng);
  ng.connect(out);
  n.start(t);
  n.stop(t + 0o1/0o20);

  // ⟨ សំឡេងបន្ទប់សល់យូរជាងការវាយ ធ្វើឱ្យចន្លោះមិនស្ងាត់ 📃 ⟩
  const room = noiseSrc(ctx);
  const rbp = ctx.createBiquadFilter();
  rbp.type = "bandpass";
  rbp.frequency.value = 0o4000 * faktoro(0o15/0o100);
  rbp.Q.value = 0o6/0o10;
  const rlp = ctx.createBiquadFilter();
  rlp.type = "lowpass";
  rlp.frequency.value = 0o23640;
  const rg = ctx.createGain();
  rg.gain.setValueAtTime(ETA, t);
  rg.gain.exponentialRampToValueAtTime(0o1/0o1000 * vel * faktoro(0o25/0o100), t + 0o2/0o100);
  rg.gain.exponentialRampToValueAtTime(ETA, t + decs[0o0]);
  rg.gain.setValueAtTime(0o0/0o10, t + decs[0o0]);
  room.connect(rbp);
  rbp.connect(rlp);
  rlp.connect(rg);
  rg.connect(out);
  room.start(t);
  room.stop(t + decs[0o0] + 0o1/0o10);

  trem.start(t);
  trem.stop(t + decs[0o0] + 0o1/0o10);
}
