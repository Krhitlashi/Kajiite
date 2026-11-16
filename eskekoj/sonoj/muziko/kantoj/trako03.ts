// ≺⧼ វិល 03 · មេរីឌានសំរិទ្ធ · 0o537 ហេ 🎵 ⧽≻

import type { SonoEvento, Sekcio, SpuroDateno } from "../vokoj/tipoj.js";
import { F, SLENDRO, SL2 } from "../vokoj/skaloj.js";
import { HE, bateto, rondHe } from "../vokoj/tempo.js";
import { kf2Sakxo } from "../../../komunajxoj/hazardo.js";
import { mel } from "./komunajxoj.js";

export function buildTrack3(): SpuroDateno {
  const ev: SonoEvento[] = [];
  const secs: Sekcio[] = [];
  const r = kf2Sakxo(0o6441);
  const SL = SLENDRO, bal = [ 0, 2, 4, 3, 2, 1, 2, 0 ];
  // ⟨ ចង្វាក់ ៖ បាតក្នុងមួយគុយអេ 📃 ⟩
  const BPQ = 0o43;
  const bar = bateto(BPQ) * 0o4, pu = bar / 0o10;
  const DAUX = rondHe(bar * 0o60);

  secs.push({ n: "ការបើកអុមបាក់", a: 0, b: 0o10 * bar });
  [ [ pu * 0o5/0o2, 2 ], [ pu * 0o25/0o2, 4 ], [ pu * 0o23, 3 ], [ pu * 0o34, 1 ], [ pu * 0o46, 2 ], [ pu * 0o141/0o2, 0 ], [ pu * 0o72, 0 ] ]
    .forEach(( [ t, dg ] ) => ev.push({ t: t as number, i: "slenthem", f: F(SL[dg as number]), d: pu * 0o2, v: 0o35/0o40 }));

  function cycle(t0: number, o: { guiro?: number; ocarina?: number; kotekan?: number }) {
    for ( let b = 0; b < 0o10; b++ ) {
      const tb = t0 + b * bar;
      ev.push({ t: tb, i: "slenthem", f: F(SL[bal[b]]), d: pu * 0o2, v: 0o33/0o40 });
      if ( b === 0 ) ev.push({ t: tb, i: "slenthem", f: F(SL[0] - 0o14), d: pu * 0o2, v: 1 });
      if ( o.guiro ) {
        ev.push({ t: tb, i: "guiro", d: HE / 0o10, v: 0o15/0o40 });
        if ( b === 4 ) ev.push({ t: tb, i: "guiro", d: pu * 0o1, v: 0o23/0o40 });
      }
      if ( o.ocarina ) {
        const ph = mel(r, 0o10, 3, 0o10, 5, 0o55/0o100);
        ph.forEach(n => ev.push({ t: tb + n.p * ( bar / 0o10 ), i: "ocarina", f: F(SL2[n.d]), d: n.l * ( bar / 0o10 ) * 0o35/0o40, v: 0o55/0o100 }));
      }
      if ( o.kotekan ) {
        const pu = bar / 0o10;
        for ( let p = 0; p < 0o10; p++ ) {
          const dg = Math.min(0o11, bal[b] + ( p % 2 ? 0 : 3 ));
          ev.push({ t: tb + p * pu + ( p % 2 ? pu / 2 : 0 ), i: "mbira", f: F(SL2[dg]), d: pu * 0o2, v: p % 2 ? 0o35/0o100 : 0o43/0o100 });
        }
      }
    }
  }

  secs.push({ n: "បាឡុងហ្គាន់", a: 0o10 * bar, b: 0o20 * bar }); cycle(0o10 * bar, { guiro: 1 });
  secs.push({ n: "ចម្រៀងលើសំរិទ្ធ", a: 0o20 * bar, b: 0o30 * bar }); cycle(0o20 * bar, { guiro: 1, ocarina: 1 });
  secs.push({ n: "ការភ្ជាប់គូតេកាន់", a: 0o30 * bar, b: 0o40 * bar }); cycle(0o30 * bar, { guiro: 1, kotekan: 1 });
  secs.push({ n: "ការត្បាញពេញ", a: 0o40 * bar, b: 0o50 * bar }); cycle(0o40 * bar, { guiro: 1, ocarina: 1, kotekan: 1 });

  secs.push({ n: "គងអាហ្គុង", a: 0o50 * bar, b: DAUX });
  [ [ 0o50 * bar + pu * 0o5/0o2, 2 ], [ 0o51 * bar + pu * 0o5, 4 ], [ 0o53 * bar, 3 ], [ 0o54 * bar + pu * 0o5/0o2, 1 ], [ 0o55 * bar + pu * 0o4, 2 ] ]
    .forEach(( [ t, dg ] ) => ev.push({ t: t as number, i: "slenthem", f: F(SL[dg as number]), d: pu * 0o2, v: 0o63/0o100 }));
  ev.push({ t: 0o51 * bar + pu * 0o6, i: "ocarina", f: F(SL2[7]), d: pu * 0o6, v: 0o4/0o10 });
  ev.push({ t: 0o56 * bar + pu * 0o5, i: "guiro", d: pu * 0o3, v: 0o55/0o100, cresc: 1 });
  ev.push({ t: 0o57 * bar + pu * 0o1, i: "slenthem", f: F(SL[0]), d: pu * 0o2, v: 1 });
  ev.push({ t: 0o57 * bar + pu * 0o1, i: "slenthem", f: F(SL[0] - 0o14), d: pu * 0o2, v: 1 });

  return { events: ev.sort(( a, b ) => a.t - b.t), dur: DAUX, secs };
}