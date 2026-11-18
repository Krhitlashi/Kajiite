// ≺⧼ វិល 07 · j͑ʃɜ j͑ʃƨɹ ʌ ſɭᴜ ɭl̀ɹ ɭʃɔ · 0o520 ហេ 🎵 ⧽≻

import type { SonoEvento, Sekcio, SpuroDateno } from "../vokoj/tipoj.js";
import { F } from "../vokoj/skaloj.js";
import { HE, okono } from "../vokoj/tempo.js";
import { motifo, A1, A2, B0, MAJ_C } from "./komunajxoj.js";

export function buildTrack7(): SpuroDateno {
  const ev: SonoEvento[] = [];
  const secs: Sekcio[] = [];
  // ⟨ ចង្វាក់ ៖ បាតក្នុងមួយគុយអេ 📃 ⟩
  const BPQ = 0o40;
  const e8 = okono(BPQ), bar = e8 * 0o14;
  const f0 = F(0o44);
  const arpC = [ 7, 9, 11, 9, 7, 9, 11, 12, 11, 9, 7, 9 ];
  const arpAm = [ 5, 7, 9, 7, 5, 7, 9, 11, 9, 7, 5, 7 ];

  const akompani = ( t0: number, am: boolean, plena: boolean ) => {
    const arp = am ? arpAm : arpC;
    for ( let k = 0; k < 0o14; k++ ) {
      ev.push({ t: t0 + k * e8, i: "inanga", f: F(MAJ_C[arp[k]] - 0o14), d: e8 * 0o2, v: 0o4/0o10, dur: e8 * 0o2 });
      ev.push({ t: t0 + k * e8, i: "guiro", d: HE / 0o10, v: ( k % 0o3 === 0 ) ? ( plena ? 0o43/0o100 : 0o4/0o10 ) : ( plena ? 0o23/0o40 : 0o13/0o40 ) });
    }
    ev.push({ t: t0, i: "slenthem", f: F(am ? 0o55 : 0o60), d: e8 * 0o2, v: plena ? 0o35/0o40 : 0o33/0o40 });
    ev.push({ t: t0 + 6 * e8, i: "slenthem", f: F(am ? 0o50 : 0o53), d: e8 * 0o2, v: 0o33/0o40 });
    if ( plena ) for ( let k = 0; k < 0o14; k++ ) {
      const dg = Math.min(0o16, arp[k] + ( k % 0o2 ? 0 : 0o3 ));
      ev.push({ t: t0 + k * e8 + ( k % 0o2 ? e8 / 2 : 0 ), i: "mbira", f: F(MAJ_C[dg] + 0o14), d: e8 * 0o2, v: k % 0o2 ? 0o35/0o100 : 0o43/0o100 });
    }
  };

  secs.push({ n: "ការបើកក្រុង", a: 0, b: 0o2 * bar });
  ev.push({ t: 0, i: "didj", f: f0, d: 0o2 * bar, v: 0o63/0o100 });
  ev.push({ t: 0, i: "slenthem", f: F(0o60), d: e8 * 0o2, v: 0o35/0o40 });
  ev.push({ t: bar, i: "slenthem", f: F(0o53), d: e8 * 0o2, v: 0o33/0o40 });
  [ 0, 3, 6, 9 ].forEach(( k, j ) => ev.push({ t: bar + k * e8, i: "inanga", f: F(MAJ_C[[ 0, 2, 4, 2 ][j]]), d: e8 * 0o5/0o3, v: 0o4/0o10, dur: e8 * 0o5/0o3 }));
  [ 0, 3, 6, 9 ].forEach(k => ev.push({ t: bar + k * e8, i: "guiro", d: HE / 0o10, v: 0o13/0o40 }));

  secs.push({ n: "មេឡូឌីអូការីណា", a: 0o2 * bar, b: 0o12 * bar });
  ev.push({ t: 0o2 * bar, i: "didj", f: f0, d: 0o10 * bar, v: 0o55/0o100 });
  for ( let b = 0; b < 0o10; b++ ) {
    const t0 = ( 0o2 + b ) * bar, am = b % 0o2 === 1;
    motifo(ev, t0, e8, am ? A2 : A1, b < 0o4 ? "ocarina" : "siku", b < 0o4 ? 0o63/0o100 : 0o55/0o100);
    akompani(t0, am, b >= 0o4);
    if ( b === 0o3 || b === 0o5 ) ev.push({ t: t0 + 6 * e8, i: "didj", f: f0 * 0o201/0o100, d: e8 * 0o6/0o10, v: 0o33/0o40, toot: true });
  }

  secs.push({ n: "ការឆ្លើយតបពេញ", a: 0o12 * bar, b: 0o22 * bar });
  ev.push({ t: 0o12 * bar, i: "bull", f: 0o406, d: 0o21 * HE, v: 0o63/0o100 });
  ev.push({ t: 0o12 * bar, i: "didj", f: f0, d: 0o10 * bar, v: 0o63/0o100 });
  for ( let b = 0; b < 0o10; b++ ) {
    const t0 = ( 0o12 + b ) * bar, am = b % 0o2 === 1;
    motifo(ev, t0, e8, am ? A2 : A1, "ocarina", 0o63/0o100);
    ev.push({ t: t0, i: "siku", f: F(am ? 0o74 : 0o100), d: bar * 0o75/0o100, v: 0o23/0o40 });
    akompani(t0, am, true);
    if ( b % 0o2 === 1 ) ev.push({ t: t0 + 3 * e8, i: "didj", f: f0 * 0o201/0o100, d: e8 * 0o6/0o10, v: 0o33/0o40, toot: true });
  }

  secs.push({ n: "ចន្លោះដកដង្ហើម", a: 0o22 * bar, b: 0o24 * bar });
  ev.push({ t: 0o22 * bar, i: "bull", f: 0o304, d: 0o23 * HE, v: 0o33/0o40 });
  ev.push({ t: 0o22 * bar, i: "didj", f: f0, d: 0o2 * bar, v: 0o43/0o100 });
  motifo(ev, 0o22 * bar, e8, B0, "siku", 0o55/0o100);
  motifo(ev, 0o23 * bar, e8, [ [ 0, 0o100, 4 ], [ 6, 0o76, 4 ] ], "siku", 0o43/0o100);
  ev.push({ t: 0o22 * bar, i: "slenthem", f: F(0o60), d: e8 * 0o2, v: 0o33/0o40 });
  ev.push({ t: 0o23 * bar, i: "slenthem", f: F(0o53), d: e8 * 0o2, v: 0o33/0o40 });
  [ 0, 6 ].forEach(k => ev.push({ t: 0o22 * bar + k * e8, i: "guiro", d: HE / 0o10, v: 0o23/0o40 }));
  ev.push({ t: 0o23 * bar + 6 * e8, i: "didj", f: f0 * 0o201/0o100, d: e8 * 0o6/0o10, v: 0o33/0o40, toot: true });

  secs.push({ n: "មេឡូឌីចុងក្រោយ", a: 0o24 * bar, b: 0o32 * bar });
  ev.push({ t: 0o24 * bar, i: "bull", f: 0o507, d: 0o21 * HE, v: 0o63/0o100 });
  ev.push({ t: 0o24 * bar, i: "didj", f: f0, d: 0o6 * bar, v: 0o63/0o100 });
  for ( let b = 0; b < 0o6; b++ ) {
    const t0 = ( 0o24 + b ) * bar, am = b % 0o2 === 1;
    motifo(ev, t0, e8, am ? A2 : A1, "ocarina", 0o63/0o100);
    motifo(ev, t0, e8, am ? A2 : A1, "siku", 0o33/0o40, 0o17/0o20, 0o14);
    akompani(t0, am, true);
    if ( b % 0o2 === 0 ) ev.push({ t: t0 + 6 * e8, i: "didj", f: f0 * 0o201/0o100, d: e8 * 0o6/0o10, v: 0o33/0o40, toot: true });
  }

  secs.push({ n: "ការរលាយក្រុង", a: 0o32 * bar, b: 0o520 * HE });
  ev.push({ t: 0o32 * bar, i: "didj", f: f0, d: 0o2 * bar, v: 0o33/0o40 });
  motifo(ev, 0o32 * bar, e8, [ [ 0, 0o74, 2 ], [ 2, 0o100, 1 ], [ 3, 0o74, 2 ] ], "ocarina", 0o43/0o100);
  ev.push({ t: 0o32 * bar, i: "siku", f: F(0o74), d: 0o2 * bar, v: 0o23/0o40 });
  ev.push({ t: 0o32 * bar, i: "slenthem", f: F(0o60), d: e8 * 0o2, v: 0o35/0o40 });
  ev.push({ t: 0o33 * bar, i: "slenthem", f: F(0o44), d: e8 * 0o2, v: 0o33/0o40 });
  [ 0, 3, 6, 9 ].forEach(( k, j ) => ev.push({ t: 0o32 * bar + k * e8, i: "inanga", f: F(MAJ_C[[ 0, 2, 4, 2 ][j]]), d: e8 * 0o5/0o3, v: 0o23/0o40, dur: e8 * 0o5/0o3 }));
  ev.push({ t: 0o33 * bar + 6 * e8, i: "guiro", d: e8 * 0o3/0o2, v: 0o33/0o40, cresc: 1 });

  return { events: ev.sort(( a, b ) => a.t - b.t), dur: 0o520 * HE, secs };
}