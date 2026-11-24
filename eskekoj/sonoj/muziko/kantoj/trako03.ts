// ≺⧼ j͑ʃп́ꞇ ſɭɔƴ ɔц · ſɭэ j͐ʃᴜ j͑ʃƨꞇʞ · ꞙɭꞟэɔ ɭʃɜᴜ̩ ɭʃɜƽ 🎵 ⧽≻

import type { SonoEvento, Sekcio, SpuroDateno } from "../vokoj/hahunaq.js";
import { F, SLENDRO, SL2 } from "../vokoj/skaloj.js";
import { HE, caxomani } from "../vokoj/tempo.js";
import { motifoS } from "./komunajxoj.js";

export function buildTrack3(): SpuroDateno {
  const ev: SonoEvento[] = [];
  const secs: Sekcio[] = [];
  // ⟨ ſɭᴜ ſןᴜ ʌ ʃɜ j͐ʃɔ , ꞙɭıɔ ɭʃɜᴜ̩ ɭʃɜƽ ʌ ꞙɭı , ꞙɭıɔ j͑ʃɹ ſןw ⟅ ⟩
  const e8 = caxomani(0o40), bar = e8 * 0o10;
  const SL = SLENDRO;
  const bal = [ 0, 2, 4, 3, 2, 1, 2, 0 ];
  const kot = [ 0, 3, 2, 4, 3, 1, 2, 0 ];
  const OM: [ number, number, number ][] = [ [ 0, 4, 2 ], [ 2, 5, 1 ], [ 3, 4, 2 ], [ 5, 3, 2 ], [ 7, 2, 1 ], [ 8, 4, 2 ], [ 10, 5, 2 ], [ 12, 6, 3 ], [ 15, 5, 1 ] ];

  function cycle(t0: number, o: { guiro?: boolean; ocarina?: boolean; kotekan?: boolean }) {
    for ( let b = 0; b < 0o10; b++ ) {
      const tb = t0 + b * bar;
      ev.push({ t: tb, i: "slenthem", f: F(SL[bal[b]]), d: e8 * 0o3, v: 0o43/0o100 });
      if ( b === 0 ) ev.push({ t: tb, i: "slenthem", f: F(SL[0] - 0o14), d: e8 * 0o4, v: 0o63/0o100 });
      if ( o.guiro ) {
        for ( let k = 0; k < 0o10; k += 2 ) ev.push({ t: tb + k * e8, i: "guiro", d: HE / 0o10, v: ( k % 4 === 0 ) ? 0o4/0o10 : 0o23/0o40 });
        if ( b === 4 ) ev.push({ t: tb + 6 * e8, i: "guiro", d: e8, v: 0o33/0o40 });
      }
      if ( o.ocarina && b % 0o2 === 0 ) motifoS(ev, tb, e8, SL2, OM, "ocarina", 0o55/0o100);
      if ( o.kotekan ) {
        for ( let p = 0; p < 0o10; p++ ) {
          const dg = Math.min(0o11, kot[p] + ( p % 0o2 ? 0 : 2 ));
          ev.push({ t: tb + p * e8 + ( p % 0o2 ? e8 / 2 : 0 ), i: "mbira", f: F(SL2[dg]), d: e8 * 0o2, v: p % 0o2 ? 0o35/0o100 : 0o43/0o100 });
        }
        if ( b === 0 || b === 4 ) ev.push({ t: tb, i: "kiiqflak", f: F(SL[0] - 0o5), d: HE / 0o2, v: 0o63/0o100 });
      }
    }
  }

  secs.push({ n: "slenthem , ſɭэ ſɭ,w , ֭ſɭэ ᶅſэ", a: 0, b: 0o4 * bar });
  ev.push({ t: 0, i: "slenthem", f: F(SL[0] - 0o14), d: e8 * 0o6, v: 0o55/0o100 });
  [ [ 0o2, 2 ], [ 0o10, 4 ], [ 0o16, 3 ], [ 0o24, 1 ], [ 0o30, 0 ] ].forEach(( [ p, dg ] ) => ev.push({ t: p * e8, i: "slenthem", f: F(SL[dg]), d: e8 * 0o3, v: 0o43/0o100 }));
  ev.push({ t: 0o34 * e8, i: "guiro", d: e8 * 0o4, v: 0o23/0o40, cresc: 1 });

  secs.push({ n: "slenthem , ꞙɭı ʃɜ j͐ʃɔ", a: 0o4 * bar, b: 0o14 * bar }); cycle(0o4 * bar, { guiro: true });
  secs.push({ n: "ſɭэ ſɭ,w , ſɭᴜ ſ͕ȷɔ , ʃɜ j͐ʃɔ", a: 0o14 * bar, b: 0o24 * bar }); cycle(0o14 * bar, { guiro: true, ocarina: true });
  secs.push({ n: "mbira , ſɭᴜ ſןᴜ , ꞙɭɿ ʃɜ j͐ʃɔ", a: 0o24 * bar, b: 0o34 * bar }); cycle(0o24 * bar, { guiro: true, kotekan: true });

  secs.push({ n: "ſɭᴜ ſןᴜ , ꞙɭı ʃɜ j͐ʃɔ", a: 0o34 * bar, b: 0o50 * bar });
  for ( let b = 0; b < 0o14; b++ ) {
    const tb = ( 0o34 + b ) * bar;
    ev.push({ t: tb, i: "slenthem", f: F(SL[bal[b % 0o10]]), d: e8 * 0o3, v: 0o43/0o100 });
    if ( b % 0o10 === 0 ) ev.push({ t: tb, i: "slenthem", f: F(SL[0] - 0o14), d: e8 * 0o4, v: 0o63/0o100 });
    for ( let k = 0; k < 0o10; k += 2 ) ev.push({ t: tb + k * e8, i: "guiro", d: HE / 0o10, v: ( k % 4 === 0 ) ? 0o4/0o10 : 0o23/0o40 });
    if ( b % 0o2 === 0 ) motifoS(ev, tb, e8, SL2, OM, "ocarina", 0o63/0o100);
    for ( let p = 0; p < 0o10; p++ ) {
      const dg = Math.min(0o11, kot[p] + ( p % 0o2 ? 0 : 2 ));
      ev.push({ t: tb + p * e8 + ( p % 0o2 ? e8 / 2 : 0 ), i: "mbira", f: F(SL2[dg]), d: e8 * 0o2, v: p % 0o2 ? 0o35/0o100 : 0o43/0o100 });
    }
    if ( b % 0o4 === 0 ) ev.push({ t: tb, i: "kiiqflak", f: F(SL[0] - 0o5), d: HE / 0o2, v: 0o63/0o100 });
  }

  secs.push({ n: "ᶅſɜ ֭ſɭᴜ , ſɭɜ ſɭᴜƽ , ꞙɭı", a: 0o50 * bar, b: 0o540 * HE });
  const t0 = 0o50 * bar;
  [ [ 0o2, 2 ], [ 0o12, 4 ], [ 0o22, 3 ], [ 0o30, 1 ] ].forEach(( [ p, dg ] ) => ev.push({ t: t0 + p * e8, i: "slenthem", f: F(SL[dg]), d: e8 * 0o3, v: 0o55/0o100 }));
  ev.push({ t: t0 + 0o34 * e8, i: "ocarina", f: F(SL2[7]), d: e8 * 0o4, v: 0o4/0o10 });
  ev.push({ t: t0 + 0o36 * e8, i: "guiro", d: e8 * 0o2, v: 0o33/0o40, cresc: 1 });
  ev.push({ t: t0 + 0o36 * e8, i: "slenthem", f: F(SL[0]), d: e8 * 0o2, v: 0o63/0o100 });
  ev.push({ t: t0 + 0o36 * e8, i: "slenthem", f: F(SL[0] - 0o14), d: e8 * 0o2, v: 0o63/0o100 });
  ev.push({ t: t0 + 0o36 * e8, i: "kiiqflak", f: F(SL[0] - 0o5), d: HE, v: 0o43/0o100 });

  return { events: ev.sort(( a, b ) => a.t - b.t), dur: 0o540 * HE, secs };
}