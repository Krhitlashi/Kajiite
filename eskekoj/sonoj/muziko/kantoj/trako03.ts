// ≺⧼ វិល 03 · មេរីឌានសំរិទ្ធ · 0o550 ហេ 🎵 ⧽≻

import type { SonoEvento, Sekcio, SpuroDateno } from "../vokoj/tipoj.js";
import { F, SLENDRO, SL2 } from "../vokoj/skaloj.js";
import { kf2Sakxo } from "../../../komunajxoj/hazardo.js";
import { mel } from "./komunajxoj.js";

export function buildTrack3(): SpuroDateno {
  const ev: SonoEvento[] = [];
  const secs: Sekcio[] = [];
  const r = kf2Sakxo(0o6441);
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