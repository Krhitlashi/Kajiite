// ≺⧼ វិល 04 · j͐ʃɜ ɭʃᴜ ʌ ſɭᴜͷ̗ ʌ ɭʃɜ ı],ɔƽ · 0o600 ហេ 🎵 ⧽≻

import type { SonoEvento, Sekcio, SpuroDateno } from "../vokoj/tipoj.js";
import { F, PENT_A } from "../vokoj/skaloj.js";
import { HE, okono } from "../vokoj/tempo.js";
import { motifoS } from "./komunajxoj.js";

export function buildTrack4(): SpuroDateno {
  const ev: SonoEvento[] = [];
  const secs: Sekcio[] = [];
  // ⟨ ក្រឡាចង្វាក់ ៖ ភាគប្រាំបីស្មើមួយហេ បារមួយមានប្រាំបីភាគ 📃 ⟩
  const e8 = okono(0o40), bar = e8 * 0o10;
  const P = PENT_A;
  const ost = [ 0, 3, 1, 4, 2, 4, 1, 3 ];
  const SM: [ number, number, number ][] = [ [ 0, 5, 2 ], [ 2, 6, 1 ], [ 3, 7, 2 ], [ 5, 6, 1 ], [ 6, 5, 2 ], [ 8, 4, 2 ], [ 10, 5, 2 ], [ 12, 6, 3 ], [ 15, 5, 1 ] ];

  const ostinato = ( t0: number, shift: number, v: number ) => {
    for ( let k = 0; k < 0o10; k++ )
      ev.push({ t: t0 + k * e8, i: "inanga", f: F(P[ost[( k + shift ) % 0o10]]), d: e8 * 0o2, v, dur: e8 * 0o2 });
  };
  const pulse = ( t0: number, dens: boolean ) => {
    for ( let k = 0; k < 0o10; k += 2 ) ev.push({ t: t0 + k * e8, i: "guiro", d: HE / 0o10, v: ( k % 4 === 0 ) ? 0o4/0o10 : 0o23/0o40 });
    if ( dens ) for ( let k = 1; k < 0o10; k += 2 ) ev.push({ t: t0 + k * e8 + e8 / 2, i: "guiro", d: HE / 0o10, v: 0o13/0o40 });
  };

  secs.push({ n: "សូឡូរណ្តៅ", a: 0, b: 0o6 * bar });
  for ( let b = 0; b < 0o6; b++ ) {
    const t0 = b * bar;
    ostinato(t0, 0, 0o43/0o100);
    pulse(t0, b >= 0o3);
    if ( b === 0o5 ) ev.push({ t: t0, i: "siku", f: F(P[5]), d: bar * 0o7/0o10, v: 0o33/0o40 });
  }

  secs.push({ n: "សំឡេងខ្ពស់ស៊ីគូ", a: 0o6 * bar, b: 0o26 * bar });
  for ( let b = 0; b < 0o20; b++ ) {
    const t0 = ( 0o6 + b ) * bar;
    ostinato(t0, b % 0o10, 0o43/0o100);
    pulse(t0, true);
    if ( b % 0o2 === 0 ) motifoS(ev, t0, e8, P, SM, "siku", 0o63/0o100);
  }

  secs.push({ n: "ព្យុះឡើង", a: 0o26 * bar, b: 0o42 * bar });
  ev.push({ t: 0o26 * bar + 0o2 * e8, i: "bull", f: 0o304, d: 0o23 * HE, v: 0o63/0o100 });
  ev.push({ t: 0o32 * bar, i: "bull", f: 0o351, d: 0o25 * HE, v: 0o35/0o40 });
  ev.push({ t: 0o37 * bar, i: "bull", f: 0o406, d: 0o21 * HE, v: 0o55/0o100 });
  for ( let b = 0; b < 0o14; b++ ) {
    const t0 = ( 0o26 + b ) * bar;
    ostinato(t0, 0, 0o43/0o100);
    pulse(t0, true);
    ev.push({ t: t0, i: "kiiqflak", f: F(P[2]), d: HE / 0o2, v: 0o63/0o100 });
    if ( b % 0o2 === 0 ) ev.push({ t: t0 + 4 * e8, i: "kiiqflak", f: F(P[3]), d: HE / 0o3, v: 0o43/0o100 });
    if ( b % 0o4 === 0 ) ev.push({ t: t0, i: "siku", f: F(P[0o12]), d: bar * 0o163/0o100, v: 0o23/0o40 });
    if ( b % 0o4 === 2 ) ev.push({ t: t0 + 4 * e8, i: "siku", f: F(P[7]), d: e8 * 0o3, v: 0o43/0o100 });
  }

  secs.push({ n: "ហុកកេត", a: 0o42 * bar, b: 0o52 * bar });
  for ( let b = 0; b < 0o10; b++ ) {
    const t0 = ( 0o42 + b ) * bar;
    ostinato(t0, 3, 0o33/0o40);
    pulse(t0, true);
    for ( let p = 0; p < 0o10; p++ ) {
      const dg = Math.min(0o12, ost[p] + ( p % 0o2 ? 0 : 2 ));
      ev.push({ t: t0 + p * e8 + ( p % 0o2 ? e8 / 2 : 0 ), i: "mbira", f: F(P[dg] + 0o14), d: e8 * 0o2, v: p % 0o2 ? 0o35/0o100 : 0o43/0o100 });
    }
    if ( b % 0o2 === 0 ) motifoS(ev, t0, e8, P, SM, "siku", 0o55/0o100);
  }

  secs.push({ n: "មេឃពេញ", a: 0o52 * bar, b: 0o57 * bar });
  ev.push({ t: 0o52 * bar, i: "bull", f: 0o406, d: 0o21 * HE, v: 1 });
  ev.push({ t: 0o55 * bar, i: "bull", f: 0o446, d: 0o15 * HE, v: 0o35/0o40 });
  for ( let b = 0; b < 0o5; b++ ) {
    const t0 = ( 0o52 + b ) * bar;
    ostinato(t0, 0, 0o23/0o40);
    pulse(t0, true);
    for ( let p = 0; p < 0o10; p++ ) if ( p % 0o2 === 0 )
      ev.push({ t: t0 + p * e8, i: "mbira", f: F(P[ost[( p + 5 ) % 0o10]] + 0o14), d: e8 * 0o2, v: 0o43/0o100 });
    if ( b % 0o2 === 0 ) motifoS(ev, t0, e8, P, SM, "siku", 0o43/0o100);
  }

  secs.push({ n: "កូដា", a: 0o57 * bar, b: 0o600 * HE });
  const t0 = 0o57 * bar;
  [ [ 0, 0, 3 ], [ 3, 3, 2 ], [ 5, 1, 3 ] ].forEach(( [ p, dg, l ] ) => ev.push({ t: t0 + p * e8, i: "inanga", f: F(P[dg]), d: l * e8, v: 0o33/0o40, dur: l * e8 }));
  ev.push({ t: t0 + 0o6 * e8, i: "inanga", f: F(P[0] - 0o14), d: e8 * 0o2, v: 0o33/0o40, dur: e8 * 0o2 });

  return { events: ev.sort(( a, b ) => a.t - b.t), dur: 0o600 * HE, secs };
}