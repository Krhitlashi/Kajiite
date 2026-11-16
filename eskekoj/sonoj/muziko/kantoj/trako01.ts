// ≺⧼ វិល 01 · អាល់ទីផ្លាណូអរុណ · 0o505 ហេ 🎵 ⧽≻

import type { SonoEvento, Sekcio, SpuroDateno } from "../vokoj/tipoj.js";
import { F, PENT_E } from "../vokoj/skaloj.js";
import { HE, okono, rondBpq } from "../vokoj/tempo.js";
import { kf2Sakxo } from "../../../komunajxoj/hazardo.js";
import { mel } from "./komunajxoj.js";

export function buildTrack1(): SpuroDateno {
  const ev: SonoEvento[] = [];
  const secs: Sekcio[] = [];
  const r = kf2Sakxo(0o17665);
  // ⟨ ចង្វាក់ ៖ បាតក្នុងមួយគុយអេ 📃 ⟩
  const BPQ = rondBpq( 0o45 );
  const e8 = okono(BPQ), bar = e8 * 0o6;
  const S = PENT_E;
  const add = ( t: number, i: string, f: number, d: number, v: number, x?: Record<string, number | boolean> ) =>
    ev.push(Object.assign({ t, i, f, d, v }, x || {}));

  secs.push({ n: "កាដេនសាអរុណ", a: 0, b: 0o6 * bar });
  [
    [ e8 * 0o3/0o2, 7, e8 * 0o5/0o2 ], [ e8 * 0o5, 6, e8 * 0o2 ], [ e8 * 0o11/0o2, 5, e8 * 0o7/0o2 ], [ e8 * 0o15, 6, e8 * 0o2 ],
    [ e8 * 0o41/0o2, 4, e8 * 0o3 ], [ e8 * 0o24, 5, e8 * 0o5/0o2 ], [ e8 * 0o30, 3, e8 * 0o7/0o2 ], [ e8 * 0o34, 4, e8 * 0o2 ], [ e8 * 0o37, 2, e8 * 0o4 ]
  ].forEach(( [ t, dg, d ] ) => add(t as number, "siku", F(S[dg as number]), d as number, 0o63/0o100));
  add(e8 * 0o40, "inanga", F(S[0] - 0o14), e8 * 0o6, 0o55/0o100, { dur: e8 * 0o6 });

  secs.push({ n: "ពន្លឺដំបូង", a: 0o6 * bar, b: 0o32 * bar });
  for ( let b = 0; b < 0o24; b++ ) {
    const t0 = 0o6 * bar + b * bar;
    const arp = [ 0, 2, 1, 3, 2, 4, 3, 1 ];
    for ( let k = 0; k < 0o10; k++ ) add(t0 + k * e8, "inanga", F(S[arp[k]] - 0o14), e8 * 0o2, 0o4/0o10 + r() * 0o5/0o40, { dur: e8 * 0o2 });
    [ 0, 0o3/0o2, 3, 0o11/0o2 ].forEach(p => add(t0 + p * e8, "guiro", 0, HE / 0o10, 0o4/0o10));
    if ( b % 4 === 3 ) add(t0 + 5 * e8, "guiro", 0, e8 * 0o7/0o4, 0o55/0o100, { cresc: 1 });
    if ( b % 2 === 0 ) {
      const ph = mel(r, 0o20, 3, 0o11, 5 + Math.floor(r() * 3), 0o27/0o40);
      ph.forEach(n => add(t0 + n.p * e8, "siku", F(S[n.d]), n.l * e8 * 0o35/0o40, 0o33/0o40));
    }
  }

  secs.push({ n: "ការឆ្លើយតបអូការីណា", a: 0o32 * bar, b: 0o50 * bar });
  for ( let b = 0; b < 0o16; b++ ) {
    const t0 = 0o32 * bar + b * bar;
    const arp = [ 0, 3, 2, 4, 3, 2, 1, 2 ];
    for ( let k = 0; k < 0o10; k++ ) add(t0 + k * e8, "inanga", F(S[arp[k]] - 0o14), e8 * 0o2, 0o4/0o10, { dur: e8 * 0o2 });
    for ( let k = 0; k < 0o10; k++ ) add(t0 + k * e8, "guiro", 0, HE / 0o10, ( k % 2 ) ? 0o13/0o40 : 0o23/0o40);
    if ( b % 2 === 0 ) {
      const ph = mel(r, 0o10, 5, 0o12, 7, 0o63/0o100);
      ph.forEach(n => add(t0 + n.p * e8, "ocarina", F(S[n.d]), n.l * e8 * 0o7/0o10, 0o63/0o100));
    } else {
      const ph = mel(r, 0o10, 2, 6, 4, 0o55/0o100);
      ph.forEach(n => add(t0 + n.p * e8, "siku", F(S[n.d]), n.l * e8 * 0o35/0o40, 0o55/0o100));
    }
  }

  secs.push({ n: "ការបែកហ្គីរ៉ូ", a: 0o50 * bar, b: 0o56 * bar });
  for ( let b = 0; b < 6; b++ ) {
    const t0 = 0o50 * bar + b * bar;
    if ( b < 4 ) {
      add(t0, "guiro", 0, e8 * 0o11/0o4, 0o33/0o40, { cresc: 1 });
      for ( let k = 0; k < 5; k++ ) add(t0 + 3 * e8 + k * e8 / 0o10, "guiro", 0, HE / 0o10, 0o55/0o100);
      add(t0, "inanga", F(S[0] - 0o14), e8 * 0o7/0o2, 0o25/0o40, { dur: e8 * 0o7/0o2 });
      add(t0 + 3 * e8, "inanga", F(S[3] - 0o14), e8 * 0o5/0o2, 0o23/0o40, { dur: e8 * 0o5/0o2 });
    } else {
      const div = ( b === 4 ) ? 0o10 : 0o20;
      for ( let k = 0; k < div; k++ ) add(t0 + k * bar / div, "guiro", 0, HE / 0o10, 0o4/0o10 + 0o15/0o40 * k / div);
      if ( b === 5 ) [3, 4, 5, 7].forEach(( dg, k ) => add(t0 + k * e8 * 2, "ocarina", F(S[dg]), e8 * 0o63/0o40, 0o23/0o40));
    }
  }

  secs.push({ n: "ចន្លោះបីស្របគ្នា", a: 0o56 * bar, b: 0o70 * bar });
  for ( let b = 0; b < 0o12; b++ ) {
    const t0 = 0o56 * bar + b * bar;
    const arp = [ 0, 2, 3, 4, 3, 2, 4, 3 ];
    for ( let k = 0; k < 0o10; k++ ) add(t0 + k * e8, "inanga", F(S[arp[k]] - 0o14), e8 * 0o2, 0o43/0o100, { dur: e8 * 0o2 });
    [ 0, 0o3/0o2, 3, 0o11/0o2 ].forEach(p => add(t0 + p * e8, "guiro", 0, HE / 0o10, 0o43/0o100));
    if ( b % 2 === 0 ) {
      const ph = mel(r, 0o20, 4, 0o11, 6, 0o31/0o40);
      ph.forEach(n => {
        add(t0 + n.p * e8, "siku", F(S[n.d]), n.l * e8 * 0o35/0o40, 0o33/0o40);
        add(t0 + n.p * e8, "ocarina", F(S[Math.max(0, n.d - 2)]), n.l * e8 * 0o35/0o40, 0o23/0o40);
      });
    }
  }

  secs.push({ n: "ការរលាយ", a: 0o70 * bar, b: 0o505 * HE });
  // ⟨ ពេលចុងក្រោយវាស់ពីដើមផ្នែក ឱ្យនៅជាប់នឹងចង្វាក់ថ្មី 📃 ⟩
  add(0o70 * bar, "siku", F(S[5]), 0o7 * HE, 0o6/0o10);
  add(0o70 * bar, "inanga", F(S[0] - 0o14), 0o11 * HE, 0o23/0o40, { dur: 0o11 * HE });
  add(0o70 * bar + 0o10 * HE, "ocarina", F(S[0o11]), 0o5 * HE, 0o4/0o10);
  add(0o70 * bar + 0o11 * HE, "inanga", F(S[2] - 0o14), 0o6 * HE, 0o4/0o10, { dur: 0o6 * HE });
  add(0o70 * bar + 0o20 * HE, "siku", F(S[4]), 0o7 * HE, 0o23/0o40);
  add(0o70 * bar + 0o30 * HE, "guiro", 0, 0o3 * HE, 0o23/0o40, { cresc: 1 });
  add(0o70 * bar + 0o32 * HE, "inanga", F(S[0] - 0o14), 0o11 * HE, 0o43/0o100, { dur: 0o11 * HE });
  add(0o70 * bar + 0o34 * HE, "siku", F(S[0]), 0o7 * HE, 0o43/0o100);

  return { events: ev.sort(( a, b ) => a.t - b.t), dur: 0o505 * HE, secs };
}