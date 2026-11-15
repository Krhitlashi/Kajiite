// ≺⧼ វិល 01 · អាល់ទីផ្លាណូអរុណ · 0o505 ហេ 🎵 ⧽≻

import type { SonoEvento, Sekcio, SpuroDateno } from "../vokoj/tipoj.js";
import { F, PENT_E } from "../vokoj/skaloj.js";
import { kf2Sakxo } from "../../../komunajxoj/hazardo.js";
import { mel } from "./komunajxoj.js";

export function buildTrack1(): SpuroDateno {
  const ev: SonoEvento[] = [];
  const secs: Sekcio[] = [];
  const r = kf2Sakxo(0o17665);
  const e8 = 0o15/0o40, bar = 0o115/0o40;
  const S = PENT_E;
  const add = ( t: number, i: string, f: number, d: number, v: number, x?: Record<string, number | boolean> ) =>
    ev.push(Object.assign({ t, i, f, d, v }, x || {}));

  secs.push({ n: "កាដេនសាអរុណ", a: 0, b: 0o715/0o40 });
  [
    [ 0o23/0o40, 7, 0o43/0o40 ], [ 0o103/0o40, 6, 0o35/0o40 ], [ 0o7/0o2, 5, 0o55/0o40 ], [ 0o523/0o100, 6, 0o63/0o100 ],
    [ 0o655/0o100, 4, 0o115/0o100 ], [ 0o1023/0o100, 5, 0o10/0o10 ], [ 0o1155/0o100, 3, 0o3/0o2 ], [ 0o134/0o10, 4, 0o35/0o40 ], [ 0o1455/0o100, 2, 0o63/0o40 ]
  ].forEach(( [ t, dg, d ] ) => add(t as number, "siku", F(S[dg as number]), d as number, 0o63/0o100));
  add(0o150/0o10, "inanga", F(S[0] - 0o14), 0o115/0o40, 0o55/0o100, { dur: 0o115/0o40 });

  secs.push({ n: "ពន្លឺដំបូង", a: 0o715/0o40, b: 0o3715/0o40 });
  for ( let b = 0; b < 0o24; b++ ) {
    const t0 = 0o715/0o40 + b * bar;
    const arp = [ 0, 2, 1, 3, 2, 4, 3, 1 ];
    for ( let k = 0; k < 0o10; k++ ) add(t0 + k * e8, "inanga", F(S[arp[k]] - 0o14), 0o35/0o40, 0o4/0o10 + r() * 0o5/0o40, { dur: 0o33/0o40 });
    [ 0, 0o3/0o2, 3, 0o11/0o2 ].forEach(p => add(t0 + p * e8, "guiro", 0, 0o1/0o20, 0o4/0o10));
    if ( b % 4 === 3 ) add(t0 + 5 * e8, "guiro", 0, 0o55/0o100, 0o55/0o100, { cresc: 1 });
    if ( b % 2 === 0 ) {
      const ph = mel(r, 0o20, 3, 0o11, 5 + Math.floor(r() * 3), 0o27/0o40);
      ph.forEach(n => add(t0 + n.p * e8, "siku", F(S[n.d]), n.l * e8 * 0o35/0o40, 0o33/0o40));
    }
  }

  secs.push({ n: "ការឆ្លើយតបអូការីណា", a: 0o3715/0o40, b: 0o140 });
  for ( let b = 0; b < 0o16; b++ ) {
    const t0 = 0o3715/0o40 + b * bar;
    const arp = [ 0, 3, 2, 4, 3, 2, 1, 2 ];
    for ( let k = 0; k < 0o10; k++ ) add(t0 + k * e8, "inanga", F(S[arp[k]] - 0o14), 0o35/0o40, 0o4/0o10, { dur: 0o63/0o100 });
    for ( let k = 0; k < 0o10; k++ ) add(t0 + k * e8, "guiro", 0, 0o3/0o100, ( k % 2 ) ? 0o13/0o40 : 0o23/0o40);
    if ( b % 2 === 0 ) {
      const ph = mel(r, 0o10, 5, 0o12, 7, 0o63/0o100);
      ph.forEach(n => add(t0 + n.p * e8, "ocarina", F(S[n.d]), n.l * e8 * 0o75/0o100, 0o63/0o100));
    } else {
      const ph = mel(r, 0o10, 2, 6, 4, 0o55/0o100);
      ph.forEach(n => add(t0 + n.p * e8, "siku", F(S[n.d]), n.l * e8 * 0o35/0o40, 0o55/0o100));
    }
  }

  secs.push({ n: "ការបែកហ្គីរ៉ូ", a: 0o140, b: 0o6715/0o40 });
  for ( let b = 0; b < 6; b++ ) {
    const t0 = 0o140 + b * bar;
    if ( b < 4 ) {
      add(t0, "guiro", 0, 0o75/0o100, 0o33/0o40, { cresc: 1 });
      for ( let k = 0; k < 5; k++ ) add(t0 + 3 * e8 + k * 0o1/0o20, "guiro", 0, 0o1/0o20, 0o55/0o100);
      add(t0, "inanga", F(S[0] - 0o14), 0o55/0o40, 0o25/0o40, { dur: 0o55/0o40 });
      add(t0 + 3 * e8, "inanga", F(S[3] - 0o14), 0o10/0o10, 0o23/0o40, { dur: 1 });
    } else {
      const div = ( b === 4 ) ? 0o10 : 0o20;
      for ( let k = 0; k < div; k++ ) add(t0 + k * bar / div, "guiro", 0, 0o3/0o100, 0o4/0o10 + 0o15/0o40 * k / div);
      if ( b === 5 ) [3, 4, 5, 7].forEach(( dg, k ) => add(t0 + k * e8 * 2, "ocarina", F(S[dg]), e8 * 0o63/0o40, 0o23/0o40));
    }
  }

  secs.push({ n: "ចន្លោះបីស្របគ្នា", a: 0o6715/0o40, b: 0o10315/0o40 });
  for ( let b = 0; b < 0o12; b++ ) {
    const t0 = 0o6715/0o40 + b * bar;
    const arp = [ 0, 2, 3, 4, 3, 2, 4, 3 ];
    for ( let k = 0; k < 0o10; k++ ) add(t0 + k * e8, "inanga", F(S[arp[k]] - 0o14), 0o35/0o40, 0o43/0o100, { dur: 0o63/0o100 });
    [ 0, 0o3/0o2, 3, 0o11/0o2 ].forEach(p => add(t0 + p * e8, "guiro", 0, 0o1/0o20, 0o43/0o100));
    if ( b % 2 === 0 ) {
      const ph = mel(r, 0o20, 4, 0o11, 6, 0o31/0o40);
      ph.forEach(n => {
        add(t0 + n.p * e8, "siku", F(S[n.d]), n.l * e8 * 0o35/0o40, 0o33/0o40);
        add(t0 + n.p * e8, "ocarina", F(S[Math.max(0, n.d - 2)]), n.l * e8 * 0o35/0o40, 0o23/0o40);
      });
    }
  }

  secs.push({ n: "ការរលាយ", a: 0o10315/0o40, b: 0o230 });
  add(0o20663/0o100, "siku", F(S[5]), 0o315/0o100, 0o6/0o10);
  add(0o2070/0o10, "inanga", F(S[0] - 0o14), 4, 0o23/0o40, { dur: 4 });
  add(0o2134/0o10, "ocarina", F(S[0o11]), 0o115/0o40, 0o4/0o10);
  add(0o21415/0o100, "inanga", F(S[2] - 0o14), 3, 0o4/0o10, { dur: 3 });
  add(0o2174/0o10, "siku", F(S[4]), 0o155/0o40, 0o23/0o40);
  add(0o22263/0o100, "guiro", 0, 0o55/0o40, 0o23/0o40, { cresc: 1 });
  add(0o2234/0o10, "inanga", F(S[0] - 0o14), 0o415/0o100, 0o43/0o100, { dur: 0o415/0o100 });
  add(0o2244/0o10, "siku", F(S[0]), 0o155/0o40, 0o43/0o100);

  return { events: ev.sort(( a, b ) => a.t - b.t), dur: 0o230, secs };
}