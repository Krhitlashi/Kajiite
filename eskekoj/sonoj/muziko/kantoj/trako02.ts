// ≺⧼ វិល 02 · សៀគ្វីខ្យល់កួច · 0o526 ហេ 🎵 ⧽≻

import type { SonoEvento, Sekcio, SpuroDateno } from "../vokoj/tipoj.js";
import { F, NYAM } from "../vokoj/skaloj.js";
import { kf2Sakxo } from "../../../komunajxoj/hazardo.js";

export function buildTrack2(): SpuroDateno {
  const ev: SonoEvento[] = [];
  const secs: Sekcio[] = [];
  const r = kf2Sakxo(0o4620);
  const beat = 0o5/0o10, bar = 0o5/0o2, f0 = 0o4425/0o40;
  const kush = [ 0, 4, 2, 5, 3, 6, 4, 7, 5, 3, 2, 4 ];
  const kuts = [ 3, 6, 5, 2, 7, 4, 6, 1, 5, 2, 4, 0 ];

  secs.push({ n: "ដង្ហើមនៃជ្រលង", a: 0, b: 0o144/0o10 });
  ev.push({ t: 0o15/0o40, i: "didj", f: f0, d: 0o14, v: 1 });

  secs.push({ n: "គូសាអ៊ូរ៉ា", a: 0o144/0o10, b: 0o644/0o10 });
  ev.push({ t: 0o144/0o10, i: "didj", f: f0, d: 0o50, v: 1 });
  for ( let b = 0; b < 0o20; b++ ) {
    const t0 = 0o144/0o10 + b * bar, pu = bar / 0o14;
    for ( let p = 0; p < 0o14; p++ )
      ev.push({ t: t0 + p * pu, i: "mbira", f: F(NYAM[kush[( p + b * 2 ) % 0o14]]), d: 0o35/0o40, v: 0o43/0o100 + ( ( p % 3 === 0 ) ? 0o15/0o100 : 0 ) + r() * 0o5/0o100 });
    ev.push({ t: t0, i: "inanga", f: F(NYAM[0] - 0o14), d: 0o115/0o100, v: 0o55/0o100, dur: 0o115/0o100 });
    ev.push({ t: t0 + bar / 2, i: "inanga", f: F(NYAM[3] - 0o14), d: 1, v: 0o23/0o40, dur: 1 });
  }

  secs.push({ n: "ខ្យល់កួចផុសឡើង", a: 0o644/0o10, b: 0o1224/0o10 });
  ev.push({ t: 0o644/0o10, i: "didj", f: f0, d: 0o36, v: 1 });
  ev.push({ t: 0o65, i: "bull", f: 0o334, d: 0o10, v: 0o63/0o100 });
  ev.push({ t: 0o76, i: "bull", f: 0o406, d: 0o11, v: 0o35/0o40 });
  ev.push({ t: 0o110, i: "bull", f: 0o304, d: 0o11, v: 1 });
  for ( let b = 0; b < 0o14; b++ ) {
    const t0 = 0o644/0o10 + b * bar, pu = bar / 0o14;
    for ( let p = 0; p < 0o14; p++ ) {
      if ( ( p + b ) % 3 ) continue;
      ev.push({ t: t0 + p * pu + pu / 2, i: "mbira", f: F(NYAM[kuts[p]] + 0o14), d: 0o35/0o40, v: 0o4/0o10 });
    }
    ev.push({ t: t0 + bar / 2, i: "inanga", f: F(NYAM[4] - 0o14), d: 1, v: 0o23/0o40, dur: 1 });
  }

  secs.push({ n: "សំឡេងត្រែ និងធ្យូង", a: 0o1224/0o10, b: 0o1604/0o10 });
  ev.push({ t: 0o1224/0o10, i: "didj", f: f0, d: 0o36, v: 1 });
  for ( let b = 0; b < 0o14; b++ ) {
    const t0 = 0o1224/0o10 + b * bar, pu = bar / 0o14;
    [ 0, 1, 0o3/0o2, 0o5/0o2 ].forEach(p => ev.push({ t: t0 + p * beat, i: "didj", f: f0 * 0o201/0o100, d: 0o11/0o40, v: 0o33/0o40, toot: true }));
    for ( let p = 0; p < 0o14; p++ ) ev.push({ t: t0 + p * pu, i: "mbira", f: F(NYAM[kush[p]]), d: 0o35/0o40, v: 0o43/0o100 });
    ev.push({ t: t0, i: "inanga", f: F(NYAM[0] - 0o14), d: 0o115/0o100, v: 0o25/0o40, dur: 0o115/0o100 });
  }

  secs.push({ n: "វដ្តពេញ", a: 0o1604/0o10, b: 0o2164/0o10 });
  ev.push({ t: 0o1604/0o10, i: "didj", f: f0, d: 0o36, v: 1 });
  ev.push({ t: 0o161, i: "bull", f: 0o507, d: 7, v: 1 });
  ev.push({ t: 0o171, i: "bull", f: 0o446, d: 7, v: 1 });
  ev.push({ t: 0o201, i: "bull", f: 0o535, d: 7, v: 1 });
  ev.push({ t: 0o211, i: "bull", f: 0o406, d: 0o13/0o2, v: 1 });
  for ( let b = 0; b < 0o14; b++ ) {
    const t0 = 0o1604/0o10 + b * bar, pu = bar / 0o14;
    for ( let p = 0; p < 0o14; p++ ) {
      const dg = ( b % 2 ? kuts : kush )[p];
      ev.push({ t: t0 + p * pu, i: "mbira", f: F(NYAM[dg] + ( ( b % 4 > 1 ) ? 0o14 : 0 )), d: 0o35/0o40, v: 0o23/0o40 });
    }
    ev.push({ t: t0, i: "inanga", f: F(NYAM[0] - 0o14), d: 1, v: 0o55/0o100, dur: 1 });
    ev.push({ t: t0 + bar / 2, i: "inanga", f: F(NYAM[5] - 0o14), d: 0o35/0o40, v: 0o25/0o40, dur: 0o35/0o40 });
    if ( b % 3 === 2 ) ev.push({ t: t0 + 3 * beat, i: "didj", f: f0 * 0o201/0o100, d: 0o4/0o10, v: 0o35/0o40, toot: true });
  }

  secs.push({ n: "ធ្យូងរសាត់", a: 0o2164/0o10, b: 0o240 });
  ev.push({ t: 0o2164/0o10, i: "didj", f: f0, d: 0o204/0o10, v: 0o35/0o40 });
  ev.push({ t: 0o217, i: "mbira", f: F(NYAM[0]), d: 2, v: 0o23/0o40 });
  ev.push({ t: 0o222, i: "mbira", f: F(NYAM[4]), d: 2, v: 0o4/0o10 });
  ev.push({ t: 0o226, i: "inanga", f: F(NYAM[0] - 0o14), d: 3, v: 0o23/0o40, dur: 3 });
  ev.push({ t: 0o2344/0o10, i: "inanga", f: F(NYAM[0] - 0o14), d: 3, v: 0o43/0o100, dur: 3 });

  return { events: ev.sort(( a, b ) => a.t - b.t), dur: 0o240, secs };
}