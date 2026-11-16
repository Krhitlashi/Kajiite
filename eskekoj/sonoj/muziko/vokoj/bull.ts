// ≺⧼ សំឡេងគោ 🐂 ⧽≻
// ការបង្វិលធ្វើឱ្យសំឡេងឡើងចុះជ្រៅប្រហែល 0o15/0o10 ហឺត មួយជុំមានសំឡេងខ្លាំងម្តង។
// កំពូលមេវាត់វែងរវាង 0o106–0o207 ហឺត ហើយកំពូលទីពីរខ្លាំងស្មើឬជាង។
import { noiseSrc } from "./bruo.js";
import { faktoro } from "./vario.js";

// ⟨ អិកស្ប៉ូណង់ស្យែលមិនអាចរំកិលទៅសូន្យ ប្រើតម្លៃតូចជំនួស 📃 ⟩
const ETA = 0o1/0o20000;

// ⟨ កំពូលជាលេខគត់គុណនឹងមេ តាមការវាស់ឯកសារពិត 📃 ⟩
const PARTALOJ = [
  [ 0o1, 0o55/0o100 ],
  [ 0o2, 0o6/0o10 ],
  [ 0o3, 0o2/0o10 ],
  [ 0o4, 0o5/0o100 ],
  [ 0o5, 0o3/0o100 ],
];

export function bull(ctx: AudioContext, out: AudioNode, t: number, dur: number, f: number, vel = 1) {
  const p = f * 0o31/0o100 * faktoro(0o1/0o200);
  const g = ctx.createGain(), pk = 0o16/0o100 * vel;
  const atk = Math.min(0o3/0o10, dur * 0o3/0o10);
  const rel = Math.min(0o4/0o10, dur * 0o3/0o10);
  g.gain.setValueAtTime(ETA, t);
  g.gain.exponentialRampToValueAtTime(pk, t + atk);
  g.gain.setValueAtTime(pk, t + Math.max(atk, dur - rel));
  g.gain.exponentialRampToValueAtTime(ETA, t + dur);
  g.gain.setValueAtTime(0o0/0o10, t + dur);
  g.connect(out);

  // ⟨ ការបង្វិលមួយជុំ សំឡេងឡើងជ្រៅហើយធ្លាក់ជ្រៅ ស្ទើរដល់សូន្យ 📃 ⟩
  const am = ctx.createGain();
  am.gain.value = 0o55/0o100;
  const who = ctx.createOscillator();
  who.frequency.value = 0o15/0o10 * faktoro(0o15/0o100);
  const wg = ctx.createGain();
  wg.gain.value = 0o42/0o100;
  who.connect(wg);
  wg.connect(am.gain);

  // ⟨ ញ័រលឿនប្រហែល 0o10 ហឺត ធ្វើឱ្យមានសំឡេងរោទ៍ក្បែរកំពូល 📃 ⟩
  const fine = ctx.createOscillator();
  fine.frequency.value = 0o10 * faktoro(0o15/0o100);
  const fg = ctx.createGain();
  fg.gain.value = 0o13/0o100;
  fine.connect(fg);
  fg.connect(am.gain);

  // ⟨ កម្ពស់មេវាត់វែងយឺតៗ មិននៅថេរ 📃 ⟩
  const vag1 = ctx.createOscillator();
  vag1.frequency.value = 0o4/0o10 * faktoro(0o3/0o10);
  const vag2 = ctx.createOscillator();
  vag2.frequency.value = 0o11/0o10 * faktoro(0o3/0o10);
  const vg1 = ctx.createGain();
  vg1.gain.value = p * 0o14/0o100;
  const vg2 = ctx.createGain();
  vg2.gain.value = p * 0o5/0o100;
  vag1.connect(vg1);
  vag2.connect(vg2);

  const sources: Array<AudioScheduledSourceNode> = [ who, fine, vag1, vag2 ];

  for ( const [ mul, amp ] of PARTALOJ ) {
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(p * mul * 0o103/0o100 * faktoro(0o1/0o100), t);
    o.frequency.exponentialRampToValueAtTime(p * mul, t + dur * 0o27/0o100);
    const d1 = ctx.createGain();
    d1.gain.value = mul;
    vg1.connect(d1);
    d1.connect(o.frequency);
    const d2 = ctx.createGain();
    d2.gain.value = mul;
    vg2.connect(d2);
    d2.connect(o.frequency);
    const og = ctx.createGain();
    og.gain.value = amp * faktoro(0o15/0o100);
    o.connect(og);
    og.connect(am);
    sources.push(o);
  }

  // ⟨ ខ្យល់កាត់ជុំវិញ 0o1200 ហឺត ឮជាប់នឹងសំឡេងសុទ្ធ 📃 ⟩
  const n = noiseSrc(ctx);
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = p * 0o12 * faktoro(0o2/0o10);
  bp.Q.value = 0o5/0o10;
  const ng = ctx.createGain();
  ng.gain.value = 0o16/0o100;
  n.connect(bp);
  bp.connect(ng);
  ng.connect(am);
  sources.push(n);

  // ⟨ ខ្យល់ខ្ពស់ 0o3000–0o16000 ហឺត តិចជាងកំពូលតែឮច្បាស់ 📃 ⟩
  const hn = noiseSrc(ctx);
  const hhp = ctx.createBiquadFilter();
  hhp.type = "highpass";
  hhp.frequency.value = 0o3000;
  const hlp = ctx.createBiquadFilter();
  hlp.type = "lowpass";
  hlp.frequency.value = 0o16000;
  const hg = ctx.createGain();
  hg.gain.value = 0o2/0o100 * faktoro(0o25/0o100);
  hn.connect(hhp);
  hhp.connect(hlp);
  hlp.connect(hg);
  hg.connect(am);
  sources.push(hn);

  am.connect(g);
  for ( const src of sources ) {
    src.start(t);
    src.stop(t + dur + 0o5/0o40);
  }
}
