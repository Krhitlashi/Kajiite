// ≺⧼ j͑ʃп́ꞇ ſɭɔƴ ʌ j͑ʃп́ꞇ ſɭɔƴ ʌ ꞁȷ̀ɔⅎꝛ̗ 🎵 ⧽≻

import type { BoleEg2b2, Qaroxema, SpuroDateno } from "../habal/hahunaq.js";
import { F, PENTE } from "../habal/p6zuk.js";
import { HE, caxomani } from "../habal/tif.js";
import { motifoS, treni } from "./tom6nu.js";

export function kf2Swikez1(): SpuroDateno {
  const ev: BoleEg2b2[] = [];
  const secs: Qaroxema[] = [];

  const e8 = caxomani(0o40), bar = e8 * 0o10;
  const S = PENTE;
  const arpA = [ 0o0, 0o2, 0o4, 0o2, 0o5, 0o4, 0o2, 0o1 ];
  const arpB = [ 0o0, 0o3, 0o5, 0o3, 0o4, 0o3, 0o2, 0o3 ];
  const M1: [ number, number, number ][] = [ [ 0o0, 0o5, 0o3 ], [ 0o3, 0o6, 0o1 ], [ 0o4, 0o5, 0o2 ], [ 0o6, 0o4, 0o2 ], [ 0o10, 0o5, 0o3 ], [ 0o13, 0o7, 0o1 ], [ 0o14, 0o6, 0o2 ], [ 0o16, 0o5, 0o2 ] ];
  const M2: [ number, number, number ][] = [ [ 0o0, 0o7, 0o2 ], [ 0o2, 0o6, 0o1 ], [ 0o3, 0o7, 0o2 ], [ 0o5, 0o10, 0o2 ], [ 0o7, 0o7, 0o1 ], [ 0o10, 0o6, 0o2 ], [ 0o12, 0o5, 0o2 ], [ 0o14, 0o4, 0o3 ], [ 0o17, 0o3, 0o1 ] ];
  const M3: [ number, number, number ][] = [ [ 0o0, 0o6, 0o2 ], [ 0o2, 0o7, 0o1 ], [ 0o3, 0o10, 0o2 ], [ 0o5, 0o7, 0o1 ], [ 0o6, 0o6, 0o2 ] ];
  const M1H = M1.map(( [ p, dg, l ] ) => [ p, Math.max(0o0, dg - 0o2), l ] as [ number, number, number ]);

  const akompani = ( t0: number, arp: number[], dens: boolean ) => {
    for ( let k = 0o0; k < 0o10; k++ ) {
      ev.push({ t: t0 + k * e8, i: "inanga", f: F(S[arp[k]] - 0o14), d: e8 * 0o2, v: 0o4/0o10, dur: e8 * 0o2 });
      ev.push({ t: t0 + k * e8, i: "guiro", d: HE / 0o10, v: ( k % 0o2 === 0o0 ) ? 0o4/0o10 : 0o13/0o40 });
      if ( dens && k % 0o2 === 0o1 ) ev.push({ t: t0 + k * e8 + e8 / 0o2, i: "guiro", d: HE / 0o10, v: 0o23/0o40 });
    }
    ev.push({ t: t0, i: "inanga", f: F(S[0o0] - 0o26), d: e8 * 0o3, v: 0o33/0o40, dur: e8 * 0o3 });
    ev.push({ t: t0 + 0o4 * e8, i: "inanga", f: F(S[0o4] - 0o14), d: e8 * 0o2, v: 0o23/0o40, dur: e8 * 0o2 });
  };

  secs.push({ n: "ſɭэ ſɭ,w , ſɭᴜ ſןᴜ , ɭʃэʞ", a: 0o0, b: 0o4 * bar });
  ev.push({ t: 0o0, i: "inanga", f: F(S[0o0] - 0o26), d: 0o40 * e8, v: 0o43/0o100, dur: 0o40 * e8 });
  [ [ 0o2, 0o2, 0o4 ], [ 0o7, 0o3, 0o3 ], [ 0o13, 0o4, 0o4 ], [ 0o20, 0o5, 0o3 ], [ 0o24, 0o6, 0o4 ], [ 0o31, 0o7, 0o4 ], [ 0o36, 0o5, 0o2 ] ]
    .forEach(( [ p, dg, l ] ) => ev.push({ t: p * e8, i: "siku", f: F(S[dg]), d: l * e8, v: 0o63/0o100 }));
  ev.push({ t: 0o34 * e8, i: "guiro", d: e8 * 0o4, v: 0o23/0o40, cresc: 0o1 });

  secs.push({ n: "ɭʃэʞ , j͑ʃᴜ ſןɹ , ꞙɭı", a: 0o4 * bar, b: 0o20 * bar });
  for ( let b = 0o0; b < 0o14; b++ ) {
    const t0 = ( 0o4 + b ) * bar;
    akompani(t0, arpA, b >= 0o6);
    if ( b % 0o2 === 0o0 ) motifoS(ev, t0, e8, S, M1, "siku", 0o63/0o100);

    if ( b >= 0o6 && b % 0o4 === 0o2 ) treni(ev, t0 + 0o3 * e8, e8, S, [ [ 0o0, 0o4 ], [ 0o2, 0o3 ], [ 0o3, 0o2 ] ], 0o35/0o40);
  }

  secs.push({ n: "ſɭᴜ ſ͕ȷɔ , ſɭᴜ ſןᴜ ʃɜ j͐ʃɔ", a: 0o20 * bar, b: 0o34 * bar });
  for ( let b = 0o0; b < 0o14; b++ ) {
    const t0 = ( 0o20 + b ) * bar;
    akompani(t0, arpB, true);
    if ( b % 0o4 === 0o0 ) motifoS(ev, t0, e8, S, M2, "ocarina", 0o63/0o100);
    else if ( b % 0o4 === 0o2 ) motifoS(ev, t0, e8, S, M3, "siku", 0o55/0o100);
    else if ( b % 0o4 === 0o3 ) motifoS(ev, t0, e8, S, M3, "ocarina", 0o43/0o100);

    if ( b % 0o4 === 0o2 ) treni(ev, t0 + 0o3 * e8, e8, S, [ [ 0o0, 0o5 ], [ 0o2, 0o4 ], [ 0o4, 0o3 ] ], 0o33/0o40);
  }

  secs.push({ n: "guiro , ꞙɭı ſɭэ ɭʃᴜ , ſɭɜ j͐ʃɹ", a: 0o34 * bar, b: 0o40 * bar });
  for ( let b = 0o0; b < 0o4; b++ ) {
    const t0 = ( 0o34 + b ) * bar;
    ev.push({ t: t0, i: "inanga", f: F(S[0o0] - 0o26), d: bar * 0o7/0o10, v: 0o25/0o40, dur: bar * 0o7/0o10 });
    for ( let k = 0o0; k < 0o10; k++ ) ev.push({ t: t0 + k * e8, i: "guiro", d: HE / 0o10, v: 0o4/0o10 + ( k / 0o10 ) * 0o23/0o40 });
    if ( b === 0o3 ) motifoS(ev, t0, e8, S, M3, "ocarina", 0o43/0o100);

    if ( b === 0o2 ) ev.push({ t: t0, i: "hiwe", f: F(S[0o1] - 0o14), d: bar * 0o6/0o10, v: 0o25/0o40 });
  }

  secs.push({ n: "ꞙɭц ʃɜ j͐ʃɔ , ꞙɭı ɭʃɜᴜ̩ ɭʃɜƽ", a: 0o40 * bar, b: 0o46 * bar });
  for ( let b = 0o0; b < 0o6; b++ ) {
    const t0 = ( 0o40 + b ) * bar;
    akompani(t0, arpA, true);
    if ( b % 0o2 === 0o0 ) {
      motifoS(ev, t0, e8, S, M1, "siku", 0o55/0o100);
      motifoS(ev, t0, e8, S, M1H, "ocarina", 0o33/0o40);
    }

    if ( b % 0o3 === 0o0 ) ev.push({ t: t0, i: "hiwe", f: F(S[0o0] - 0o14), d: bar * 0o12/0o10, v: 0o23/0o40 });
  }

  secs.push({ n: "ſɭɜ j͐ʃɹ , ſɭᴜ ſןᴜ", a: 0o46 * bar, b: 0o500 * HE });
  const t0 = 0o46 * bar;
  motifoS(ev, t0, e8, S, [ [ 0o0, 0o5, 0o4 ], [ 0o4, 0o4, 0o2 ], [ 0o6, 0o2, 0o4 ] ], "siku", 0o43/0o100);
  ev.push({ t: t0, i: "inanga", f: F(S[0o0] - 0o26), d: 0o20 * e8, v: 0o33/0o40, dur: 0o20 * e8 });
  ev.push({ t: t0 + 0o10 * e8, i: "ocarina", f: F(S[0o7]), d: 0o6 * e8, v: 0o23/0o40 });
  ev.push({ t: t0 + 0o14 * e8, i: "guiro", d: e8 * 0o2, v: 0o23/0o40, cresc: 0o1 });

  ev.push({ t: t0, i: "hiwe", f: F(S[0o0] - 0o14), d: 0o13 * e8, v: 0o33/0o40 });
  ev.push({ t: t0 + 0o10 * e8, i: "hiwe", f: F(S[0o4] - 0o14), d: 0o6 * e8, v: 0o23/0o40 });

  return { events: ev.sort(( a, b ) => a.t - b.t), dur: 0o500 * HE, secs };
}
