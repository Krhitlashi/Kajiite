// ≺⧼ វិល 02 · សៀគ្វីខ្យល់កួច · 0o525 ហេ 🎵 ⧽≻

import type { SonoEvento, Sekcio, SpuroDateno } from "../vokoj/tipoj.js";
import { F, NYAM } from "../vokoj/skaloj.js";
import { HE, QE, bateto, rondHe, rondBpq } from "../vokoj/tempo.js";
import { kf2Sakxo } from "../../../komunajxoj/hazardo.js";

export function buildTrack2(): SpuroDateno {
  const ev: SonoEvento[] = [];
  const secs: Sekcio[] = [];
  const r = kf2Sakxo(0o4620);
  // ⟨ ចង្វាក់ ៖ បាតក្នុងមួយគុយអេ 📃 ⟩
  const BPQ = rondBpq( 0o60 );
  const beat = bateto(BPQ), bar = beat * 0o4, f0 = 0o4425/0o40;
  const DAUX = rondHe(bar * 0o100);
  const kush = [ 0, 4, 2, 5, 3, 6, 4, 7, 5, 3, 2, 4 ];
  const kuts = [ 3, 6, 5, 2, 7, 4, 6, 1, 5, 2, 4, 0 ];

  secs.push({ n: "ដង្ហើមនៃជ្រលង", a: 0, b: 0o5 * bar });
  ev.push({ t: beat * 0o3/0o5, i: "didj", f: f0, d: 0o32 * HE, v: 1 });

  secs.push({ n: "គូសាអ៊ូរ៉ា", a: 0o5 * bar, b: 0o25 * bar });
  ev.push({ t: 0o5 * bar, i: "didj", f: f0, d: 0o126 * HE, v: 1 });
  for ( let b = 0; b < 0o20; b++ ) {
    const t0 = 0o5 * bar + b * bar, pu = bar / 0o14;
    for ( let p = 0; p < 0o14; p++ )
      ev.push({ t: t0 + p * pu, i: "mbira", f: F(NYAM[kush[( p + b * 2 ) % 0o14]]), d: pu * 0o4, v: 0o43/0o100 + ( ( p % 3 === 0 ) ? 0o15/0o100 : 0 ) + r() * 0o5/0o100 });
    ev.push({ t: t0, i: "inanga", f: F(NYAM[0] - 0o14), d: pu * 0o6, v: 0o55/0o100, dur: pu * 0o6 });
    ev.push({ t: t0 + bar / 2, i: "inanga", f: F(NYAM[3] - 0o14), d: 0o2 * HE, v: 0o23/0o40, dur: 0o2 * HE });
  }

  secs.push({ n: "ខ្យល់កួចផុសឡើង", a: 0o25 * bar, b: 0o41 * bar });
  ev.push({ t: 0o25 * bar, i: "didj", f: f0, d: QE, v: 1 });
  ev.push({ t: 0o161 * HE, i: "bull", f: 0o334, d: 0o21 * HE, v: 0o63/0o100 });
  ev.push({ t: 0o205 * HE, i: "bull", f: 0o406, d: 0o23 * HE, v: 0o35/0o40 });
  ev.push({ t: 0o232 * HE, i: "bull", f: 0o304, d: 0o23 * HE, v: 1 });
  for ( let b = 0; b < 0o14; b++ ) {
    const t0 = 0o25 * bar + b * bar, pu = bar / 0o14;
    for ( let p = 0; p < 0o14; p++ ) {
      if ( ( p + b ) % 3 ) continue;
      ev.push({ t: t0 + p * pu + pu / 2, i: "mbira", f: F(NYAM[kuts[p]] + 0o14), d: pu * 0o4, v: 0o4/0o10 });
    }
    ev.push({ t: t0 + bar / 2, i: "inanga", f: F(NYAM[4] - 0o14), d: 0o2 * HE, v: 0o23/0o40, dur: 0o2 * HE });
    ev.push({ t: t0, i: "kiiqflak", f: F(NYAM[1]), d: HE / 0o2, v: 0o6/0o10 });
    if ( b % 0o2 === 0 ) ev.push({ t: t0 + bar / 0o2, i: "kiiqflak", f: F(NYAM[2]), d: HE / 0o3, v: 0o43/0o100 });
  }

  secs.push({ n: "សំឡេងត្រែ និងធ្យូង", a: 0o41 * bar, b: 0o55 * bar });
  ev.push({ t: 0o41 * bar, i: "didj", f: f0, d: QE, v: 1 });
  for ( let b = 0; b < 0o14; b++ ) {
    const t0 = 0o41 * bar + b * bar, pu = bar / 0o14;
    [ 0, 1, 0o3/0o2, 0o5/0o2 ].forEach(p => ev.push({ t: t0 + p * beat, i: "didj", f: f0 * 0o201/0o100, d: pu * 0o3/0o2, v: 0o33/0o40, toot: true }));
    for ( let p = 0; p < 0o14; p++ ) ev.push({ t: t0 + p * pu, i: "mbira", f: F(NYAM[kush[p]]), d: pu * 0o4, v: 0o43/0o100 });
    ev.push({ t: t0, i: "inanga", f: F(NYAM[0] - 0o14), d: pu * 0o6, v: 0o25/0o40, dur: pu * 0o6 });
  }

  secs.push({ n: "វដ្តពេញ", a: 0o55 * bar, b: 0o71 * bar });
  ev.push({ t: 0o55 * bar, i: "didj", f: f0, d: QE, v: 1 });
  ev.push({ t: 0o362 * HE, i: "bull", f: 0o507, d: 0o17 * HE, v: 1 });
  ev.push({ t: 0o403 * HE, i: "bull", f: 0o446, d: 0o17 * HE, v: 1 });
  ev.push({ t: 0o424 * HE, i: "bull", f: 0o535, d: 0o17 * HE, v: 1 });
  ev.push({ t: 0o445 * HE, i: "bull", f: 0o406, d: 0o16 * HE, v: 1 });
  for ( let b = 0; b < 0o14; b++ ) {
    const t0 = 0o55 * bar + b * bar, pu = bar / 0o14;
    for ( let p = 0; p < 0o14; p++ ) {
      const dg = ( b % 2 ? kuts : kush )[p];
      ev.push({ t: t0 + p * pu, i: "mbira", f: F(NYAM[dg] + ( ( b % 4 > 1 ) ? 0o14 : 0 )), d: pu * 0o4, v: 0o23/0o40 });
    }
    ev.push({ t: t0, i: "inanga", f: F(NYAM[0] - 0o14), d: 0o2 * HE, v: 0o55/0o100, dur: 0o2 * HE });
    ev.push({ t: t0 + bar / 2, i: "inanga", f: F(NYAM[5] - 0o14), d: pu * 0o4, v: 0o25/0o40, dur: pu * 0o4 });
    if ( b % 3 === 2 ) ev.push({ t: t0 + 3 * beat, i: "didj", f: f0 * 0o201/0o100, d: pu * 0o5/0o2, v: 0o35/0o40, toot: true });
    ev.push({ t: t0, i: "kiiqflak", f: F(NYAM[0] + 0o2), d: HE / 0o2, v: 0o63/0o100 });
    if ( b % 0o4 === 0o3 ) ev.push({ t: t0 + bar / 0o2, i: "kiiqflak", f: F(NYAM[2]), d: HE / 0o3, v: 0o55/0o100 });
  }

  secs.push({ n: "ធ្យូងរសាត់", a: 0o71 * bar, b: DAUX });
  ev.push({ t: 0o71 * bar, i: "didj", f: f0, d: 0o43 * HE, v: 0o35/0o40 });
  ev.push({ t: 0o462 * HE, i: "mbira", f: F(NYAM[0]), d: 0o4 * HE, v: 0o23/0o40 });
  ev.push({ t: 0o471 * HE, i: "mbira", f: F(NYAM[4]), d: 0o4 * HE, v: 0o4/0o10 });
  ev.push({ t: 0o501 * HE, i: "inanga", f: F(NYAM[0] - 0o14), d: 0o6 * HE, v: 0o23/0o40, dur: 0o6 * HE });
  ev.push({ t: 0o517 * HE, i: "inanga", f: F(NYAM[0] - 0o14), d: 0o6 * HE, v: 0o43/0o100, dur: 0o6 * HE });

  return { events: ev.sort(( a, b ) => a.t - b.t), dur: DAUX, secs };
}