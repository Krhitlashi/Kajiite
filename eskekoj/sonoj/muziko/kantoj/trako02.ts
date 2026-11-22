// ≺⧼ វិល 02 · ſןᴜ ʃɜƽ ʌ ſ͔ɭɹ ʃɹ · 0o520 ហេ 🎵 ⧽≻

import type { SonoEvento, Sekcio, SpuroDateno } from "../vokoj/tipoj.js";
import { F, NYAM } from "../vokoj/skaloj.js";
import { HE, caxomani } from "../vokoj/tempo.js";

export function buildTrack2(): SpuroDateno {
  const ev: SonoEvento[] = [];
  const secs: Sekcio[] = [];
  // ⟨ ក្រឡាចង្វាក់ ៖ ភាគប្រាំបីស្មើមួយហេ បារមួយមានដប់ពីរភាគសម្រាប់មប៊ីរ៉ា 📃 ⟩
  const e8 = caxomani(0o40), bar = e8 * 0o14, f0 = 0o4425/0o40;
  const N = NYAM;
  const kush = [ 0, 4, 2, 5, 3, 6, 4, 7, 5, 3, 2, 4 ];
  const kuts = [ 3, 6, 5, 2, 7, 4, 6, 1, 5, 2, 4, 0 ];

  const mbira = ( t0: number, pat: number[], oct: number, v: number ) => {
    for ( let p = 0; p < 0o14; p++ )
      ev.push({ t: t0 + p * e8, i: "mbira", f: F(N[pat[p]] + oct), d: e8 * 0o2, v: v + ( p % 0o3 === 0 ? 0o13/0o40 : 0 ) });
  };
  const bass = ( t0: number ) => {
    ev.push({ t: t0, i: "inanga", f: F(N[0] - 0o14), d: e8 * 0o4, v: 0o43/0o100, dur: e8 * 0o4 });
    ev.push({ t: t0 + 6 * e8, i: "inanga", f: F(N[3] - 0o14), d: e8 * 0o3, v: 0o23/0o40, dur: e8 * 0o3 });
  };

  secs.push({ n: "ដង្ហើមនៃជ្រលង", a: 0, b: 0o2 * bar });
  ev.push({ t: 0, i: "didj", f: f0, d: 0o30 * e8, v: 0o63/0o100 });
  [ [ 0o4, 0 ], [ 0o12, 4 ], [ 0o20, 2 ] ].forEach(( [ p, dg ] ) => ev.push({ t: p * e8, i: "mbira", f: F(N[dg]), d: e8 * 0o3, v: 0o33/0o40 }));

  secs.push({ n: "គូសាអ៊ូរ៉ា", a: 0o2 * bar, b: 0o12 * bar });
  ev.push({ t: 0o2 * bar, i: "didj", f: f0, d: 0o10 * bar, v: 0o55/0o100 });
  for ( let b = 0; b < 0o10; b++ ) {
    const t0 = ( 0o2 + b ) * bar;
    mbira(t0, kush, 0, 0o43/0o100);
    bass(t0);
  }

  secs.push({ n: "ខ្យល់កួចផុសឡើង", a: 0o12 * bar, b: 0o20 * bar });
  ev.push({ t: 0o12 * bar, i: "didj", f: f0, d: 0o6 * bar, v: 0o63/0o100 });
  ev.push({ t: 0o12 * bar + 0o2 * e8, i: "tjurunga", f: 0o334, d: 0o21 * HE, v: 0o63/0o100 });
  ev.push({ t: 0o15 * bar, i: "tjurunga", f: 0o406, d: 0o23 * HE, v: 0o35/0o40 });
  for ( let b = 0; b < 0o6; b++ ) {
    const t0 = ( 0o12 + b ) * bar;
    mbira(t0, kuts, 0o14, 0o4/0o10);
    ev.push({ t: t0, i: "kiiqflak", f: F(N[1]), d: HE / 0o2, v: 0o6/0o10 });
    if ( b % 0o2 === 0 ) ev.push({ t: t0 + 6 * e8, i: "kiiqflak", f: F(N[2]), d: HE / 0o3, v: 0o43/0o100 });
    ev.push({ t: t0 + 6 * e8, i: "inanga", f: F(N[4] - 0o14), d: e8 * 0o3, v: 0o23/0o40, dur: e8 * 0o3 });
  }

  secs.push({ n: "សំឡេងត្រែ និងធ្យូង", a: 0o20 * bar, b: 0o26 * bar });
  ev.push({ t: 0o20 * bar, i: "didj", f: f0, d: 0o6 * bar, v: 0o55/0o100 });
  for ( let b = 0; b < 0o6; b++ ) {
    const t0 = ( 0o20 + b ) * bar;
    [ 0, 3, 6, 9 ].forEach(p => ev.push({ t: t0 + p * e8, i: "didj", f: f0 * 0o201/0o100, d: e8 * 0o3/0o2, v: 0o33/0o40, toot: true }));
    mbira(t0, kush, 0, 0o43/0o100);
    bass(t0);
  }

  secs.push({ n: "វដ្តពេញ", a: 0o26 * bar, b: 0o33 * bar });
  ev.push({ t: 0o26 * bar, i: "didj", f: f0, d: 0o5 * bar, v: 0o63/0o100 });
  ev.push({ t: 0o26 * bar + 0o2 * e8, i: "tjurunga", f: 0o507, d: 0o17 * HE, v: 0o63/0o100 });
  ev.push({ t: 0o31 * bar, i: "tjurunga", f: 0o446, d: 0o17 * HE, v: 0o55/0o100 });
  for ( let b = 0; b < 0o5; b++ ) {
    const t0 = ( 0o26 + b ) * bar;
    mbira(t0, b % 0o2 ? kuts : kush, b % 0o4 > 1 ? 0o14 : 0, 0o23/0o40);
    bass(t0);
    ev.push({ t: t0, i: "kiiqflak", f: F(N[0] + 0o2), d: HE / 0o2, v: 0o63/0o100 });
    if ( b % 0o2 === 1 ) ev.push({ t: t0 + 9 * e8, i: "didj", f: f0 * 0o201/0o100, d: e8 * 0o5/0o2, v: 0o35/0o40, toot: true });
  }

  secs.push({ n: "ធ្យូងរសាត់", a: 0o33 * bar, b: 0o520 * HE });
  const t0 = 0o33 * bar;
  ev.push({ t: t0, i: "didj", f: f0, d: 0o14 * e8, v: 0o35/0o40 });
  ev.push({ t: t0, i: "mbira", f: F(N[0]), d: e8 * 0o4, v: 0o33/0o40 });
  ev.push({ t: t0 + 6 * e8, i: "mbira", f: F(N[4]), d: e8 * 0o4, v: 0o23/0o40 });
  ev.push({ t: t0 + 0o10 * e8, i: "inanga", f: F(N[0] - 0o14), d: e8 * 0o4, v: 0o33/0o40, dur: e8 * 0o4 });

  return { events: ev.sort(( a, b ) => a.t - b.t), dur: 0o520 * HE, secs };
}