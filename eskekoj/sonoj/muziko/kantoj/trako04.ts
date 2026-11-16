// ≺⧼ វិល 04 · រណ្តៅ និងផ្គរ · 0o600 ហេ 🎵 ⧽≻

import type { SonoEvento, Sekcio, SpuroDateno } from "../vokoj/tipoj.js";
import { F, PENT_A } from "../vokoj/skaloj.js";
import { HE, bateto, rondBpq } from "../vokoj/tempo.js";
import { kf2Sakxo } from "../../../komunajxoj/hazardo.js";
import { mel } from "./komunajxoj.js";

export function buildTrack4(): SpuroDateno {
  const ev: SonoEvento[] = [];
  const secs: Sekcio[] = [];
  const r = kf2Sakxo(0o10000);
  const P = PENT_A;
  // ⟨ ចង្វាក់ ៖ បាតក្នុងមួយគុយអេ 📃 ⟩
  const BPQ = rondBpq( 0o70 );
  const beat = bateto(BPQ);
  const bar = beat * 4, pu = bar / 0o10;
  const ost = [ 0, 3, 1, 4, 2, 4, 1, 3 ];

  secs.push({ n: "សូឡូរណ្តៅ", a: 0, b: 0o10 * bar });
  for ( let b = 0; b < 0o10; b++ ) {
    const t0 = b * bar;
    for ( let k = 0; k < 0o10; k++ ) ev.push({ t: t0 + k * bar / 0o10, i: "inanga", f: F(P[ost[k]]), d: pu * 0o2, v: 0o43/0o100 + ( ( k % 4 === 0 ) ? 0o5/0o40 : 0 ) });
  }

  secs.push({ n: "សំឡេងខ្ពស់ស៊ីគូ", a: 0o10 * bar, b: 0o34 * bar });
  for ( let b = 0o10; b < 0o34; b++ ) {
    const t0 = b * bar;
    for ( let k = 0; k < 0o10; k++ ) ev.push({ t: t0 + k * bar / 0o10, i: "inanga", f: F(P[ost[( k + b ) % 0o10]]), d: pu * 0o2, v: 0o43/0o100 });
    if ( b >= 0o14 ) for ( let k = 0; k < 4; k++ ) ev.push({ t: t0 + k * bar / 4 + bar / 0o10, i: "guiro", d: HE / 0o10, v: 0o4/0o10 });
    if ( b % 2 === 0 ) {
      const ph = mel(r, 0o20, 5, 0o12, 7, 0o25/0o40);
      ph.forEach(n => ev.push({ t: t0 + n.p * bar / 0o10, i: "siku", f: F(P[n.d]), d: n.l * bar / 0o10 * 0o35/0o40, v: 0o63/0o100 }));
    }
  }

  secs.push({ n: "ព្យុះឡើង", a: 0o34 * bar, b: 0o60 * bar });
  ev.push({ t: 0o34 * bar + pu * 0o2, i: "bull", f: 0o304, d: 0o23 * HE, v: 0o63/0o100 });
  ev.push({ t: 0o44 * bar, i: "bull", f: 0o351, d: 0o25 * HE, v: 0o35/0o40 });
  ev.push({ t: 0o54 * bar, i: "bull", f: 0o12723/0o40, d: 0o21 * HE, v: 0o33/0o40 });
  for ( let b = 0o34; b < 0o60; b++ ) {
    const t0 = b * bar;
    for ( let k = 0; k < 0o10; k++ ) ev.push({ t: t0 + k * bar / 0o10, i: "inanga", f: F(P[ost[k]]), d: pu * 0o2, v: 0o43/0o100 });
    for ( let k = 0; k < 4; k++ ) ev.push({ t: t0 + k * bar / 4, i: "guiro", d: HE / 0o10, v: 0o35/0o100 });
    if ( b % 4 === 0 ) ev.push({ t: t0, i: "siku", f: F(P[0o11]), d: bar * 0o163/0o100, v: 0o23/0o40 });
    if ( b % 4 === 2 ) ev.push({ t: t0 + bar / 2, i: "siku", f: F(P[7]), d: bar * 0o55/0o40, v: 0o43/0o100 });
    ev.push({ t: t0, i: "kiiqflak", f: F(P[2]), d: HE / 0o2, v: 0o63/0o100 });
    if ( b % 0o2 === 0 ) ev.push({ t: t0 + bar / 0o2, i: "kiiqflak", f: F(P[3]), d: HE / 0o3, v: 0o43/0o100 });
  }

  secs.push({ n: "ហុកកេត", a: 0o60 * bar, b: 0o100 * bar });
  for ( let b = 0o60; b < 0o100; b++ ) {
    const t0 = b * bar;
    for ( let k = 0; k < 0o10; k++ ) ev.push({ t: t0 + k * bar / 0o10, i: "inanga", f: F(P[ost[( k + 3 ) % 0o10]]), d: pu * 0o2, v: 0o43/0o100 });
    for ( let k = 0; k < 0o10; k += 2 ) ev.push({ t: t0 + k * bar / 0o10, i: "guiro", d: HE / 0o10, v: ( k % 4 ) ? 0o13/0o40 : 0o43/0o100 });
    if ( b % 2 === 0 ) {
      const ph = mel(r, 0o10, 5, 0o11, 6, 0o33/0o40);
      ph.forEach(n => {
        if ( n.p % 2 === 0 ) ev.push({ t: t0 + n.p * bar / 0o10, i: "siku", f: F(P[n.d]), d: bar / 0o10 * 0o35/0o40, v: 0o6/0o10 });
        else ev.push({ t: t0 + n.p * bar / 0o10, i: "mbira", f: F(P[n.d] + 0o14), d: pu * 0o2, v: 0o43/0o100 });
      });
    } else {
      for ( let k = 0; k < 0o10; k++ ) if ( r() < 0o23/0o40 )
        ev.push({ t: t0 + k * bar / 0o10 + bar / 0o20, i: "mbira", f: F(P[ost[k]] + 0o14), d: pu * 0o2, v: 0o4/0o10 });
    }
  }

  secs.push({ n: "មេឃពេញ", a: 0o100 * bar, b: 0o114 * bar });
  ev.push({ t: 0o100 * bar, i: "bull", f: 0o406, d: 0o21 * HE, v: 1 });
  ev.push({ t: 0o107 * bar, i: "bull", f: 0o446, d: 0o15 * HE, v: 0o35/0o40 });
  for ( let b = 0o100; b < 0o114; b++ ) {
    const t0 = b * bar;
    for ( let k = 0; k < 0o10; k++ ) ev.push({ t: t0 + k * bar / 0o10, i: "inanga", f: F(P[ost[k]]), d: pu * 0o2, v: 0o23/0o40 });
    for ( let k = 0; k < 0o10; k += 2 ) ev.push({ t: t0 + k * bar / 0o10, i: "guiro", d: HE / 0o10, v: 0o4/0o10 });
    if ( b % 2 === 0 ) {
      const ph = mel(r, 0o20, 4, 0o12, 0o10, 0o6/0o10);
      ph.forEach(n => ev.push({ t: t0 + n.p * bar / 0o10, i: "siku", f: F(P[n.d]), d: n.l * bar / 0o10 * 0o35/0o40, v: 0o33/0o40 }));
    } else {
      for ( let k = 0; k < 0o10; k++ ) if ( r() < 0o4/0o10 )
        ev.push({ t: t0 + k * bar / 0o10, i: "mbira", f: F(P[ost[( k + 5 ) % 0o10]] + 0o14), d: pu * 0o2, v: 0o43/0o100 });
    }
  }

  secs.push({ n: "កូដា", a: 0o114 * bar, b: 0o600 * HE });
  [ [ 0o114 * bar + pu * 0o2, 0, pu * 0o6 ], [ 0o114 * bar + pu * 0o12, 3, pu * 0o5 ], [ 0o114 * bar + pu * 0o21, 1, pu * 0o7 ],
   [ 0o114 * bar + pu * 0o32, 4, pu * 0o6 ], [ 0o114 * bar + pu * 0o43, 2, pu * 0o10 ], [ 0o114 * bar + pu * 0o56, 0, pu * 0o15 ] ]
    .forEach(( [ t, dg, d ] ) => ev.push({ t: t as number, i: "inanga", f: F(P[dg as number]), d: d as number, v: 0o23/0o40 }));
  ev.push({ t: 0o564 * HE, i: "inanga", f: F(P[0] - 0o14), d: pu * 0o11, v: 0o25/0o40 });

  return { events: ev.sort(( a, b ) => a.t - b.t), dur: 0o600 * HE, secs };
}