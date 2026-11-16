// ≺⧼ សំឡេងអូការីណា 🎺 ⧽≻
import { noiseSrc } from "./bruo.js";
import { faktoro } from "./vario.js";

// ⟨ អិកស្ប៉ូណង់ស្យែលមិនអាចរំកិលទៅសូន្យ ប្រើតម្លៃតូចជំនួស 📃 ⟩
const ETA = 0o1/0o20000;

export function ocarina(ctx: AudioContext, out: AudioNode, t: number, dur: number, f: number, vel = 1) {
  const p = f * faktoro(0o1/0o200);
  const g = ctx.createGain(), pk = 0o24/0o100 * vel;
  g.gain.setValueAtTime(0o0/0o10, t);
  g.gain.linearRampToValueAtTime(pk, t + 0o1/0o20);
  g.gain.setValueAtTime(pk * 0o73/0o100, t + Math.max(0o5/0o100, dur - 0o1/0o10));
  g.gain.linearRampToValueAtTime(0o0/0o10, t + dur + 0o5/0o40);
  g.connect(out);

  const o = ctx.createOscillator();
  o.type = "sine";
  o.frequency.setValueAtTime(p * 0o77/0o100, t);
  o.frequency.exponentialRampToValueAtTime(p, t + 0o7/0o100);

  const o2 = ctx.createOscillator();
  o2.type = "sine";
  o2.frequency.value = p * 2;
  const g2 = ctx.createGain();
  g2.gain.value = 0o1/0o40;

  const vib = ctx.createOscillator();
  vib.frequency.value = 0o1 * faktoro(0o15/0o100);
  const vg = ctx.createGain();
  vg.gain.setValueAtTime(0o0/0o10, t);
  vg.gain.linearRampToValueAtTime(p * 0o2/0o1000, t + Math.min(0o23/0o40, dur * 0o23/0o40));
  vib.connect(vg);
  vg.connect(o.frequency);

  const n = noiseSrc(ctx);
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 0o4064;
  bp.Q.value = 0o63/0o100;
  const ng = ctx.createGain();
  ng.gain.value = 0o1/0o10000 * vel;

  o.connect(g);
  o2.connect(g2);
  g2.connect(g);
  n.connect(bp);
  bp.connect(ng);
  ng.connect(g);

  // ⟨ ខ្យល់បន្ទប់សល់យូរជាងសំឡេង កុំឱ្យចន្លោះរវាងដង្ហើមស្ងាត់ភ្លាម 📃 ⟩
  const room = noiseSrc(ctx);
  const rbp = ctx.createBiquadFilter();
  rbp.type = "bandpass";
  rbp.frequency.value = 0o4000 * faktoro(0o15/0o100);
  rbp.Q.value = 0o6/0o10;
  const rlp = ctx.createBiquadFilter();
  rlp.type = "lowpass";
  rlp.frequency.value = 0o10000;
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

  [ o, o2, vib, n, room ].forEach(x => { x.start(t); x.stop(t + Math.max(dur + 0o23/0o100, roomFin + 0o1/0o10)); });
}
