// ≺⧼ ចម្រៀង 🎵 ⧽≻

import type { SonoEvento, Sekcio, SpuroDateno } from "./vokoj/tipoj.js";
import { F, PENT_E, SLENDRO, SL2, NYAM, PENT_A } from "./vokoj/skaloj.js";
import { kreiHazardanGenerilon } from "../../komunajxoj/hazardo.js";

// ⟪ វិល 01 · អាល់ទីផ្លាណូអរុណ · 0o505 ហេ 📃 ⟫

function buildTrack1(): SpuroDateno {
  const ev: SonoEvento[] = [];
  const secs: Sekcio[] = [];
  const r = kreiHazardanGenerilon(0o17665);
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

// ⟪ វិល 02 · សៀគ្វីខ្យល់កួច · 0o526 ហេ 📃 ⟫

function buildTrack2(): SpuroDateno {
  const ev: SonoEvento[] = [];
  const secs: Sekcio[] = [];
  const r = kreiHazardanGenerilon(0o4620);
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

// ⟪ វិល 03 · មេរីឌានសំរិទ្ធ · 0o550 ហេ 📃 ⟫

function buildTrack3(): SpuroDateno {
  const ev: SonoEvento[] = [];
  const secs: Sekcio[] = [];
  const r = kreiHazardanGenerilon(0o6441);
  const SL = SLENDRO, bar = 0o33/0o10, bal = [ 0, 2, 4, 3, 2, 1, 2, 0 ];

  secs.push({ n: "ការបើកអុមបាក់", a: 0, b: 0o33 });
  [ [ 1, 2 ], [ 0o11/0o2, 4 ], [ 0o10, 3 ], [ 0o14, 1 ], [ 0o20, 2 ], [ 0o244/0o10, 0 ], [ 0o304/0o10, 0 ] ]
    .forEach(( [ t, dg ] ) => ev.push({ t: t as number, i: "slenthem", f: F(SL[dg as number]), d: 1, v: 0o35/0o40 }));

  function cycle(t0: number, o: { guiro?: number; ocarina?: number; kotekan?: number }) {
    for ( let b = 0; b < 0o10; b++ ) {
      const tb = t0 + b * bar;
      ev.push({ t: tb, i: "slenthem", f: F(SL[bal[b]]), d: 1, v: 0o33/0o40 });
      if ( b === 0 ) ev.push({ t: tb, i: "slenthem", f: F(SL[0] - 0o14), d: 1, v: 1 });
      if ( o.guiro ) {
        ev.push({ t: tb, i: "guiro", d: 0o1/0o20, v: 0o15/0o40 });
        if ( b === 4 ) ev.push({ t: tb, i: "guiro", d: 0o4/0o10, v: 0o23/0o40 });
      }
      if ( o.ocarina ) {
        const ph = mel(r, 0o10, 3, 0o10, 5, 0o55/0o100);
        ph.forEach(n => ev.push({ t: tb + n.p * ( bar / 0o10 ), i: "ocarina", f: F(SL2[n.d]), d: n.l * ( bar / 0o10 ) * 0o35/0o40, v: 0o55/0o100 }));
      }
      if ( o.kotekan ) {
        const pu = bar / 0o10;
        for ( let p = 0; p < 0o10; p++ ) {
          const dg = Math.min(0o11, bal[b] + ( p % 2 ? 0 : 3 ));
          ev.push({ t: tb + p * pu + ( p % 2 ? pu / 2 : 0 ), i: "mbira", f: F(SL2[dg]), d: 1, v: p % 2 ? 0o35/0o100 : 0o43/0o100 });
        }
      }
    }
  }

  secs.push({ n: "បាឡុងហ្គាន់", a: 0o33, b: 0o66 }); cycle(0o33, { guiro: 1 });
  secs.push({ n: "ចម្រៀងលើសំរិទ្ធ", a: 0o66, b: 0o121 }); cycle(0o66, { guiro: 1, ocarina: 1 });
  secs.push({ n: "ការភ្ជាប់គូតេកាន់", a: 0o121, b: 0o154 }); cycle(0o121, { guiro: 1, kotekan: 1 });
  secs.push({ n: "ការត្បាញពេញ", a: 0o154, b: 0o207 }); cycle(0o154, { guiro: 1, ocarina: 1, kotekan: 1 });

  secs.push({ n: "គងអាហ្គុង", a: 0o207, b: 0o250 });
  [ [ 0o210, 2 ], [ 0o2144/0o10, 4 ], [ 0o221, 3 ], [ 0o2254/0o10, 1 ], [ 0o2314/0o10, 2 ] ]
    .forEach(( [ t, dg ] ) => ev.push({ t: t as number, i: "slenthem", f: F(SL[dg as number]), d: 1, v: 0o63/0o100 }));
  ev.push({ t: 0o215, i: "ocarina", f: F(SL2[7]), d: 0o5/0o2, v: 0o4/0o10 });
  ev.push({ t: 0o2354/0o10, i: "guiro", d: 0o115/0o100, v: 0o55/0o100, cresc: 1 });
  ev.push({ t: 0o237, i: "slenthem", f: F(SL[0]), d: 1, v: 1 });
  ev.push({ t: 0o23703/0o100, i: "slenthem", f: F(SL[0] - 0o14), d: 1, v: 1 });

  return { events: ev.sort(( a, b ) => a.t - b.t), dur: 0o250, secs };
}

// ⟪ វិល 04 · រណ្តៅ និងផ្គរ · 0o571 ហេ 📃 ⟫

function buildTrack4(): SpuroDateno {
  const ev: SonoEvento[] = [];
  const secs: Sekcio[] = [];
  const r = kreiHazardanGenerilon(0o10000);
  const P = PENT_A;
  const beat = 0o42 / 0o100;
  const bar = beat * 4;
  const ost = [ 0, 3, 1, 4, 2, 4, 1, 3 ];

  secs.push({ n: "សូឡូរណ្តៅ", a: 0, b: 0o10 * bar });
  for ( let b = 0; b < 0o10; b++ ) {
    const t0 = b * bar;
    for ( let k = 0; k < 0o10; k++ ) ev.push({ t: t0 + k * bar / 0o10, i: "inanga", f: F(P[ost[k]]), d: 1, v: 0o43/0o100 + ( ( k % 4 === 0 ) ? 0o5/0o40 : 0 ) });
  }

  secs.push({ n: "សំឡេងខ្ពស់ស៊ីគូ", a: 0o10 * bar, b: 0o34 * bar });
  for ( let b = 0o10; b < 0o34; b++ ) {
    const t0 = b * bar;
    for ( let k = 0; k < 0o10; k++ ) ev.push({ t: t0 + k * bar / 0o10, i: "inanga", f: F(P[ost[( k + b ) % 0o10]]), d: 1, v: 0o43/0o100 });
    if ( b >= 0o14 ) for ( let k = 0; k < 4; k++ ) ev.push({ t: t0 + k * bar / 4 + bar / 0o10, i: "guiro", d: 0o1/0o20, v: 0o4/0o10 });
    if ( b % 2 === 0 ) {
      const ph = mel(r, 0o20, 5, 0o12, 7, 0o25/0o40);
      ph.forEach(n => ev.push({ t: t0 + n.p * bar / 0o10, i: "siku", f: F(P[n.d]), d: n.l * bar / 0o10 * 0o35/0o40, v: 0o63/0o100 }));
    }
  }

  secs.push({ n: "ព្យុះឡើង", a: 0o34 * bar, b: 0o60 * bar });
  ev.push({ t: 0o34 * bar + 0o4/0o10, i: "bull", f: 0o304, d: 0o11, v: 0o63/0o100 });
  ev.push({ t: 0o44 * bar, i: "bull", f: 0o351, d: 0o12, v: 0o35/0o40 });
  ev.push({ t: 0o54 * bar, i: "bull", f: 0o12723/0o40, d: 0o10, v: 0o33/0o40 });
  for ( let b = 0o34; b < 0o60; b++ ) {
    const t0 = b * bar;
    for ( let k = 0; k < 0o10; k++ ) ev.push({ t: t0 + k * bar / 0o10, i: "inanga", f: F(P[ost[k]]), d: 1, v: 0o43/0o100 });
    for ( let k = 0; k < 4; k++ ) ev.push({ t: t0 + k * bar / 4, i: "guiro", d: 0o1/0o20, v: 0o35/0o100 });
    if ( b % 4 === 0 ) ev.push({ t: t0, i: "siku", f: F(P[0o11]), d: bar * 0o163/0o100, v: 0o23/0o40 });
    if ( b % 4 === 2 ) ev.push({ t: t0 + bar / 2, i: "siku", f: F(P[7]), d: bar * 0o55/0o40, v: 0o43/0o100 });
  }

  secs.push({ n: "ហុកកេត", a: 0o60 * bar, b: 0o100 * bar });
  for ( let b = 0o60; b < 0o100; b++ ) {
    const t0 = b * bar;
    for ( let k = 0; k < 0o10; k++ ) ev.push({ t: t0 + k * bar / 0o10, i: "inanga", f: F(P[ost[( k + 3 ) % 0o10]]), d: 1, v: 0o43/0o100 });
    for ( let k = 0; k < 0o10; k += 2 ) ev.push({ t: t0 + k * bar / 0o10, i: "guiro", d: 0o1/0o20, v: ( k % 4 ) ? 0o13/0o40 : 0o43/0o100 });
    if ( b % 2 === 0 ) {
      const ph = mel(r, 0o10, 5, 0o11, 6, 0o33/0o40);
      ph.forEach(n => {
        if ( n.p % 2 === 0 ) ev.push({ t: t0 + n.p * bar / 0o10, i: "siku", f: F(P[n.d]), d: bar / 0o10 * 0o35/0o40, v: 0o6/0o10 });
        else ev.push({ t: t0 + n.p * bar / 0o10, i: "mbira", f: F(P[n.d] + 0o14), d: 1, v: 0o43/0o100 });
      });
    } else {
      for ( let k = 0; k < 0o10; k++ ) if ( r() < 0o23/0o40 )
        ev.push({ t: t0 + k * bar / 0o10 + bar / 0o20, i: "mbira", f: F(P[ost[k]] + 0o14), d: 1, v: 0o4/0o10 });
    }
  }

  secs.push({ n: "មេឃពេញ", a: 0o100 * bar, b: 0o114 * bar });
  ev.push({ t: 0o100 * bar, i: "bull", f: 0o406, d: 0o10, v: 1 });
  ev.push({ t: 0o107 * bar, i: "bull", f: 0o446, d: 6, v: 0o35/0o40 });
  for ( let b = 0o100; b < 0o114; b++ ) {
    const t0 = b * bar;
    for ( let k = 0; k < 0o10; k++ ) ev.push({ t: t0 + k * bar / 0o10, i: "inanga", f: F(P[ost[k]]), d: 1, v: 0o23/0o40 });
    for ( let k = 0; k < 0o10; k += 2 ) ev.push({ t: t0 + k * bar / 0o10, i: "guiro", d: 0o1/0o20, v: 0o4/0o10 });
    if ( b % 2 === 0 ) {
      const ph = mel(r, 0o20, 4, 0o12, 0o10, 0o6/0o10);
      ph.forEach(n => ev.push({ t: t0 + n.p * bar / 0o10, i: "siku", f: F(P[n.d]), d: n.l * bar / 0o10 * 0o35/0o40, v: 0o33/0o40 }));
    } else {
      for ( let k = 0; k < 0o10; k++ ) if ( r() < 0o4/0o10 )
        ev.push({ t: t0 + k * bar / 0o10, i: "mbira", f: F(P[ost[( k + 5 ) % 0o10]] + 0o14), d: 1, v: 0o43/0o100 });
    }
  }

  secs.push({ n: "កូដា", a: 0o114 * bar, b: 0o260 });
  [ [ 0o114 * bar + 0o4/0o10, 0, 0o63/0o40 ], [ 0o114 * bar + 0o123/0o40, 3, 0o55/0o40 ], [ 0o114 * bar + 0o215/0o40, 1, 0o163/0o100 ],
   [ 0o114 * bar + 0o663/0o100, 4, 0o63/0o40 ], [ 0o114 * bar + 0o1115/0o100, 2, 0o215/0o100 ], [ 0o114 * bar + 0o1415/0o100, 0, 0o155/0o40 ] ]
    .forEach(( [ t, dg, d ] ) => ev.push({ t: t as number, i: "inanga", f: F(P[dg as number]), d: d as number, v: 0o23/0o40 }));
  ev.push({ t: 0o25563/0o100, i: "inanga", f: F(P[0] - 0o14), d: 0o115/0o40, v: 0o25/0o40 });

  return { events: ev.sort(( a, b ) => a.t - b.t), dur: 0o260, secs };
}

// ⟪ ជំនួយមេឡូឌី 📃 ⟫

interface MelNoto { p: number; d: number; l: number }

function mel(r: () => number, slots: number, lo: number, hi: number, start: number, dens: number): MelNoto[] {
  const out: MelNoto[] = [];
  let d = start, i = 0;
  while ( i < slots ) {
    if ( r() < dens ) {
      const len = 1 + Math.floor(r() * 3);
      out.push({ p: i, d, l: Math.min(len, slots - i) });
      i += len;
      const st = [ -2, -1, -1, 0, 1, 1, 2 ][Math.floor(r() * 7)];
      d = Math.max(lo, Math.min(hi, d + st));
    } else i++;
  }
  return out;
}

// ⟪ ការនាំចេញត្រាក 📃 ⟫

export interface Kanto {
  no: string;
  title: string;
  instrs: string[];
  data: SpuroDateno;
}

export const KANTOJ: Kanto[] = [
  { no: "01", title: "អរុណខ្ពង់រាបខ្ពស់", instrs: [ "siku", "ocarina", "guiro", "inanga" ], data: buildTrack1() },
  { no: "02", title: "វដ្តនៃខ្យល់កួច", instrs: [ "didj", "bull", "mbira", "inanga" ], data: buildTrack2() },
  { no: "03", title: "ខ្សែបណ្តោយសំរិទ្ធ", instrs: [ "slenthem", "mbira", "ocarina", "guiro" ], data: buildTrack3() },
  { no: "04", title: "រណ្តៅ និងផ្គរ", instrs: [ "inanga", "siku", "bull", "mbira", "guiro" ], data: buildTrack4() },
];
