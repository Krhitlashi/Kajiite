// ≺⧼ វិល 01 · ſןw ſןᴜɔ˞ ɭʃꞇʞ ʌ ᶅſɔ ɽ͑ʃ'ɔ · 0o500 ហេ 🎵 ⧽≻

import type { SonoEvento, Sekcio, SpuroDateno } from "../vokoj/tipoj.js";
import { F, PENT_E } from "../vokoj/skaloj.js";
import { HE, caxomani } from "../vokoj/tempo.js";
import { motifoS, treni } from "./komunajxoj.js";

export function buildTrack1(): SpuroDateno {
  const ev: SonoEvento[] = [];
  const secs: Sekcio[] = [];
  // ⟨ ក្រឡាចង្វាក់ ៖ ភាគប្រាំបីស្មើមួយហេ បារមួយមានប្រាំបីភាគ 📃 ⟩
  const e8 = caxomani(0o40), bar = e8 * 0o10;
  const S = PENT_E;
  const arpA = [ 0, 2, 4, 2, 5, 4, 2, 1 ];
  const arpB = [ 0, 3, 5, 3, 4, 3, 2, 3 ];
  const M1: [ number, number, number ][] = [ [ 0, 5, 3 ], [ 3, 6, 1 ], [ 4, 5, 2 ], [ 6, 4, 2 ], [ 8, 5, 3 ], [ 11, 7, 1 ], [ 12, 6, 2 ], [ 14, 5, 2 ] ];
  const M2: [ number, number, number ][] = [ [ 0, 7, 2 ], [ 2, 6, 1 ], [ 3, 7, 2 ], [ 5, 8, 2 ], [ 7, 7, 1 ], [ 8, 6, 2 ], [ 10, 5, 2 ], [ 12, 4, 3 ], [ 15, 3, 1 ] ];
  const M3: [ number, number, number ][] = [ [ 0, 6, 2 ], [ 2, 7, 1 ], [ 3, 8, 2 ], [ 5, 7, 1 ], [ 6, 6, 2 ] ];
  const M1H = M1.map(( [ p, dg, l ] ) => [ p, Math.max(0, dg - 2), l ] as [ number, number, number ]);

  const akompani = ( t0: number, arp: number[], dens: boolean ) => {
    for ( let k = 0; k < 0o10; k++ ) {
      ev.push({ t: t0 + k * e8, i: "inanga", f: F(S[arp[k]] - 0o14), d: e8 * 0o2, v: 0o4/0o10, dur: e8 * 0o2 });
      ev.push({ t: t0 + k * e8, i: "guiro", d: HE / 0o10, v: ( k % 0o2 === 0 ) ? 0o4/0o10 : 0o13/0o40 });
      if ( dens && k % 0o2 === 1 ) ev.push({ t: t0 + k * e8 + e8 / 2, i: "guiro", d: HE / 0o10, v: 0o23/0o40 });
    }
    ev.push({ t: t0, i: "inanga", f: F(S[0] - 0o26), d: e8 * 0o3, v: 0o33/0o40, dur: e8 * 0o3 });
    ev.push({ t: t0 + 4 * e8, i: "inanga", f: F(S[4] - 0o14), d: e8 * 0o2, v: 0o23/0o40, dur: e8 * 0o2 });
  };

  secs.push({ n: "កាដេនសាអរុណ", a: 0, b: 0o4 * bar });
  ev.push({ t: 0, i: "inanga", f: F(S[0] - 0o26), d: 0o40 * e8, v: 0o43/0o100, dur: 0o40 * e8 });
  [ [ 0o2, 2, 0o4 ], [ 0o7, 3, 0o3 ], [ 0o13, 4, 0o4 ], [ 0o20, 5, 0o3 ], [ 0o24, 6, 0o4 ], [ 0o31, 7, 0o4 ], [ 0o36, 5, 0o2 ] ]
    .forEach(( [ p, dg, l ] ) => ev.push({ t: p * e8, i: "siku", f: F(S[dg]), d: l * e8, v: 0o63/0o100 }));
  ev.push({ t: 0o34 * e8, i: "guiro", d: e8 * 0o4, v: 0o23/0o40, cresc: 1 });

  secs.push({ n: "ពន្លឺដំបូង", a: 0o4 * bar, b: 0o20 * bar });
  for ( let b = 0; b < 0o14; b++ ) {
    const t0 = ( 0o4 + b ) * bar;
    akompani(t0, arpA, b >= 0o6);
    if ( b % 0o2 === 0 ) motifoS(ev, t0, e8, S, M1, "siku", 0o63/0o100);
    // ⟨ ហ៊ីវេឆ្លើយស្នូល ៖ អូសខ្លីបីដងចុងបារ ដូចដៃអូសសាកលើខ្សែ 📃 ⟩
    if ( b >= 0o6 && b % 0o4 === 0o2 ) treni(ev, t0 + 3 * e8, e8, S, [ [ 0, 4 ], [ 0o2, 3 ], [ 0o3, 2 ] ], 0o35/0o40);
  }

  secs.push({ n: "ការឆ្លើយតបអូការីណា", a: 0o20 * bar, b: 0o34 * bar });
  for ( let b = 0; b < 0o14; b++ ) {
    const t0 = ( 0o20 + b ) * bar;
    akompani(t0, arpB, true);
    if ( b % 0o4 === 0 ) motifoS(ev, t0, e8, S, M2, "ocarina", 0o63/0o100);
    else if ( b % 0o4 === 2 ) motifoS(ev, t0, e8, S, M3, "siku", 0o55/0o100);
    else if ( b % 0o4 === 3 ) motifoS(ev, t0, e8, S, M3, "ocarina", 0o43/0o100);
    // ⟨ ហ៊ីវេបំពេញចន្លោះ ៖ អូសខ្លីបីដងក្រោយឃ្លាអូការីណា 📃 ⟩
    if ( b % 0o4 === 0o2 ) treni(ev, t0 + 3 * e8, e8, S, [ [ 0, 5 ], [ 0o2, 4 ], [ 0o4, 3 ] ], 0o33/0o40);
  }

  secs.push({ n: "ការបែកហ្គីរ៉ូ", a: 0o34 * bar, b: 0o40 * bar });
  for ( let b = 0; b < 0o4; b++ ) {
    const t0 = ( 0o34 + b ) * bar;
    ev.push({ t: t0, i: "inanga", f: F(S[0] - 0o26), d: bar * 0o7/0o10, v: 0o25/0o40, dur: bar * 0o7/0o10 });
    for ( let k = 0; k < 0o10; k++ ) ev.push({ t: t0 + k * e8, i: "guiro", d: HE / 0o10, v: 0o4/0o10 + ( k / 0o10 ) * 0o23/0o40 });
    if ( b === 0o3 ) motifoS(ev, t0, e8, S, M3, "ocarina", 0o43/0o100);
    // ⟨ ហ៊ីវេអូសយូរមួយដង ៖ សំឡេងខ្សែលេចឡើងក្រោមហ្គីរ៉ូ 📃 ⟩
    if ( b === 0o2 ) ev.push({ t: t0, i: "hiwe", f: F(S[1] - 0o14), d: bar * 0o6/0o10, v: 0o25/0o40 });
  }

  secs.push({ n: "ចន្លោះបីស្របគ្នា", a: 0o40 * bar, b: 0o46 * bar });
  for ( let b = 0; b < 0o6; b++ ) {
    const t0 = ( 0o40 + b ) * bar;
    akompani(t0, arpA, true);
    if ( b % 0o2 === 0 ) {
      motifoS(ev, t0, e8, S, M1, "siku", 0o55/0o100);
      motifoS(ev, t0, e8, S, M1H, "ocarina", 0o33/0o40);
    }
    // ⟨ ហ៊ីវេអូសយូរក្រោមខ្សែពីរ ៖ ខ្សែទាបមួយបន្ទាប់ពីពីរបារ 📃 ⟩
    if ( b % 0o3 === 0 ) ev.push({ t: t0, i: "hiwe", f: F(S[0] - 0o14), d: bar * 0o12/0o10, v: 0o23/0o40 });
  }

  secs.push({ n: "ការរលាយ", a: 0o46 * bar, b: 0o500 * HE });
  const t0 = 0o46 * bar;
  motifoS(ev, t0, e8, S, [ [ 0, 5, 4 ], [ 4, 4, 2 ], [ 6, 2, 4 ] ], "siku", 0o43/0o100);
  ev.push({ t: t0, i: "inanga", f: F(S[0] - 0o26), d: 0o20 * e8, v: 0o33/0o40, dur: 0o20 * e8 });
  ev.push({ t: t0 + 0o10 * e8, i: "ocarina", f: F(S[7]), d: 0o6 * e8, v: 0o23/0o40 });
  ev.push({ t: t0 + 0o14 * e8, i: "guiro", d: e8 * 0o2, v: 0o23/0o40, cresc: 1 });
  // ⟨ ហ៊ីវេអូសចុងក្រោយ ៖ ខ្សែទាបអូសយូរ រួចខ្សែខ្ពស់អូសខ្លីបញ្ចប់ 📃 ⟩
  ev.push({ t: t0, i: "hiwe", f: F(S[0] - 0o14), d: 0o13 * e8, v: 0o33/0o40 });
  ev.push({ t: t0 + 0o10 * e8, i: "hiwe", f: F(S[4] - 0o14), d: 0o6 * e8, v: 0o23/0o40 });

  return { events: ev.sort(( a, b ) => a.t - b.t), dur: 0o500 * HE, secs };
}