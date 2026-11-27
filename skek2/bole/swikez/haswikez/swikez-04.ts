// ≺⧼ j͑ʃп́ꞇ ſɭɔƴ ʌ j͑ʃп́ꞇ ſɭɔƴ ʌ ꞁȷ̀ɔⅎ ꞁȷ̀эⅎ 🎵 ⧽≻

import type { BoleEg2b2, Qaroxema, SpuroDateno } from "../habal/hahunaq.js";
import { F, PENTA } from "../habal/p6zuk.js";
import { HE, caxomani } from "../habal/tif.js";
import { motifoS, treni } from "./tom6nu.js";

export function kf2Swikez4(): SpuroDateno {
  const ev: BoleEg2b2[] = [];
  const secs: Qaroxema[] = [];

  const e8 = caxomani(0o40), bar = e8 * 0o10;
  const P = PENTA;
  const ost = [ 0o0, 0o3, 0o1, 0o4, 0o2, 0o4, 0o1, 0o3 ];
  const SM: [ number, number, number ][] = [ [ 0o0, 0o5, 0o2 ], [ 0o2, 0o6, 0o1 ], [ 0o3, 0o7, 0o2 ], [ 0o5, 0o6, 0o1 ], [ 0o6, 0o5, 0o2 ], [ 0o10, 0o4, 0o2 ], [ 0o12, 0o5, 0o2 ], [ 0o14, 0o6, 0o3 ], [ 0o17, 0o5, 0o1 ] ];

  const LBOWGART: number[] = [ 0o0, 0o2, 0o3, 0o4, 0o0, 0o5 ];

  const LGHAZT: [ number, number, number ][] = [ [ 0o0, 0o7, 0o2 ], [ 0o2, 0o5, 0o2 ], [ 0o4, 0o7, 0o2 ], [ 0o6, 0o11, 0o2 ] ];

  const LDANDIDOO: [ number, number ][] = [
    [ 0o0, 0o7 ], [ 0o1, 0o5 ], [ 0o2, 0o10 ], [ 0o3, 0o7 ],
    [ 0o11, 0o5 ], [ 0o12, 0o10 ],
    [ 0o20, 0o5 ], [ 0o21, 0o5 ], [ 0o22, 0o7 ], [ 0o23, 0o5 ],
    [ 0o31, 0o5 ], [ 0o32, 0o7 ],
  ];

  const ostinato = ( t0: number, shift: number, v: number ) => {
    for ( let k = 0o0; k < 0o10; k++ )
      ev.push({ t: t0 + k * e8, i: "inanga", f: F(P[ost[( k + shift ) % 0o10]]), d: e8 * 0o2, v, dur: e8 * 0o2 });
  };
  const pulse = ( t0: number, dens: boolean ) => {
    for ( let k = 0o0; k < 0o10; k += 0o2 ) ev.push({ t: t0 + k * e8, i: "guiro", d: HE / 0o10, v: ( k % 0o4 === 0o0 ) ? 0o4/0o10 : 0o23/0o40 });
    if ( dens ) for ( let k = 0o1; k < 0o10; k += 0o2 ) ev.push({ t: t0 + k * e8 + e8 / 0o2, i: "guiro", d: HE / 0o10, v: 0o13/0o40 });
  };

  const dandidoo = ( t0: number ) => {
    treni( ev, t0, e8, P, LDANDIDOO, 0o37/0o40, 0o1 );
    for ( const [ p, dg ] of LDANDIDOO )
      ev.push({ t: t0 + p * e8, i: "siku", f: F( P[dg] ), d: e8 * 0o1, v: 0o63/0o100 });
  };

  const reedlingo = ( t0: number, tlakak: number ) => {
    const hatsal2: [ number, number, number ][] = [
      [ 0o0, P[0o4] - 0o14, 0o10 ],
      [ 0o10, P[0o0], 0o2 ],
      [ 0o12, P[0o2], 0o2 ],
      [ 0o20, P[0o1], 0o2 ],
      [ 0o22, P[0o3], 0o2 ],
      [ 0o30, tlakak, 0o10 ],
    ];
    for ( const [ p, n, l ] of hatsal2 )
      ev.push({ t: t0 + p * e8, i: "hiwe", f: F( n ), d: l * e8, v: 0o33/0o40 });
  };

  const enTemo = ( b: number ) => b >= 0o44 && b < 0o60;
  const saxeoTemo = ( b: number ) => enTemo( b ) && b % 0o4 === 0o0;

  const BASOFINOJ = [ P[0o3], P[0o3] - 0o14, P[0o4] - 0o14 ];
  const sutlo = ( t0: number, k: number ) => {
    dandidoo( t0 );
    reedlingo( t0, BASOFINOJ[k % 0o3] );
  };

  secs.push({ n: "ſɭэ ɭʃᴜ , jɐ", a: 0o0, b: 0o6 * bar });
  for ( let b = 0o0; b < 0o6; b++ ) {
    const t0 = b * bar;
    ostinato(t0, 0o0, 0o43/0o100);
    pulse(t0, b >= 0o3);
    if ( b === 0o5 ) ev.push({ t: t0, i: "siku", f: F(P[0o5]), d: bar * 0o7/0o10, v: 0o33/0o40 });

    ev.push({ t: t0, i: "hiwe", f: F(P[LBOWGART[b]]), d: bar * 0o5/0o10, v: 0o23/0o40 + b * 0o1/0o100 });
  }

  secs.push({ n: "ʃɜ j͐ʃɔ , ɭʃэʞ , siku", a: 0o6 * bar, b: 0o26 * bar });
  for ( let b = 0o0; b < 0o20; b++ ) {
    const t0 = ( 0o6 + b ) * bar;
    ostinato(t0, b % 0o10, 0o43/0o100);
    pulse(t0, true);
    if ( b % 0o2 === 0o0 && b % 0o10 !== 0o4 ) motifoS(ev, t0, e8, P, SM, "siku", 0o63/0o100);

    if ( b % 0o10 === 0o4 ) motifoS(ev, t0, e8, P, LGHAZT, "hiwe", 0o33/0o40);
    if ( b % 0o10 === 0o5 ) motifoS(ev, t0, e8, P, LGHAZT, "siku", 0o53/0o100, 0o11/0o10, 0o14);

    if ( b % 0o4 === 0o1 && b % 0o10 !== 0o5 ) treni(ev, t0 + 0o3 * e8, e8, P, [ [ 0o0, 0o6 ], [ 0o2, 0o4 ], [ 0o3, 0o2 ] ], 0o33/0o40);
  }

  secs.push({ n: "j͑ʃɹ ŋᷠɹ , j͑ʃᴜ ʃɜƽ", a: 0o26 * bar, b: 0o42 * bar });
  ev.push({ t: 0o26 * bar + 0o2 * e8, i: "tjurunga", f: 0o304, d: 0o23 * HE, v: 0o63/0o100 });
  ev.push({ t: 0o32 * bar, i: "tjurunga", f: 0o351, d: 0o25 * HE, v: 0o35/0o40 });
  ev.push({ t: 0o37 * bar, i: "tjurunga", f: 0o406, d: 0o21 * HE, v: 0o55/0o100 });
  for ( let b = 0o0; b < 0o14; b++ ) {
    const t0 = ( 0o26 + b ) * bar;
    ostinato(t0, 0o0, 0o43/0o100);
    pulse(t0, true);
    ev.push({ t: t0, i: "kiiqflak", f: F(P[0o2]), d: HE / 0o2, v: 0o63/0o100 });
    if ( b % 0o2 === 0o0 ) ev.push({ t: t0 + 0o4 * e8, i: "kiiqflak", f: F(P[0o3]), d: HE / 0o3, v: 0o43/0o100 });
    if ( b % 0o4 === 0o0 ) ev.push({ t: t0, i: "siku", f: F(P[0o12]), d: bar * 0o163/0o100, v: 0o23/0o40 });
    if ( b % 0o4 === 0o2 ) ev.push({ t: t0 + 0o4 * e8, i: "siku", f: F(P[0o7]), d: e8 * 0o3, v: 0o43/0o100 });

    if ( b % 0o3 === 0o0 ) ev.push({ t: t0, i: "hiwe", f: F(P[b % 0o6 === 0o0 ? 0o0 : 0o2]), d: bar * 0o12/0o10, v: 0o25/0o40 });
    if ( b % 0o4 === 0o3 ) treni(ev, t0 + 0o5 * e8, e8, P, [ [ 0o0, 0o5 ], [ 0o2, 0o7 ] ], 0o33/0o40);
  }

  secs.push({ n: "ſɭэ ɭʃᴜ , ꞙɭɿ , ſɭᴜ ſןᴜ", a: 0o42 * bar, b: 0o52 * bar });
  for ( let b = 0o0; b < 0o10; b++ ) {
    const ab = 0o42 + b;
    const t0 = ab * bar;
    const kxe = enTemo( ab );
    ostinato( t0, 0o3, kxe ? 0o23/0o40 : 0o33/0o40 );
    pulse( t0, true );

    for ( let p = 0o0; p < 0o10; p++ ) {
      const dg = Math.min( 0o12, ost[p] + ( p % 0o2 ? 0o0 : 0o2 ) );
      const vm = kxe ? ( p % 0o2 ? 0o31/0o100 : 0o25/0o100 ) : ( p % 0o2 ? 0o35/0o100 : 0o43/0o100 );
      ev.push({ t: t0 + p * e8 + ( p % 0o2 ? e8 / 0o2 : 0o0 ), i: "mbira", f: F( P[dg] + 0o14 ), d: e8 * 0o2, v: vm });
    }
    if ( b % 0o2 === 0o0 && !kxe ) motifoS( ev, t0, e8, P, SM, "siku", 0o55/0o100 );
    if ( !kxe ) {

      const rr = b % 0o2 === 0o0 ? 0o2 : 0o4;
      treni( ev, t0, e8, P, [ [ 0o0, rr ], [ 0o2, rr + 0o1 ], [ 0o4, rr ], [ 0o6, rr + 0o1 ] ], 0o25/0o40, 0o1 );
    }
    if ( saxeoTemo( ab ) ) sutlo( t0, ( ab - 0o44 ) / 0o4 );
  }

  secs.push({ n: "j͑ʃɜ j͐ʃɹ , ꞙɭı", a: 0o52 * bar, b: 0o57 * bar });
  ev.push({ t: 0o52 * bar, i: "tjurunga", f: 0o406, d: 0o21 * HE, v: 0o1 });
  ev.push({ t: 0o55 * bar, i: "tjurunga", f: 0o446, d: 0o15 * HE, v: 0o35/0o40 });
  for ( let b = 0o0; b < 0o5; b++ ) {
    const ab = 0o52 + b;
    const t0 = ab * bar;
    ostinato( t0, 0o0, 0o23/0o40 );
    pulse( t0, true );
    for ( let p = 0o0; p < 0o10; p++ ) if ( p % 0o2 === 0o0 )
      ev.push({ t: t0 + p * e8, i: "mbira", f: F( P[ost[( p + 0o5 ) % 0o10]] + 0o14 ), d: e8 * 0o2, v: 0o33/0o100 });

    if ( saxeoTemo( ab ) ) sutlo( t0, ( ab - 0o44 ) / 0o4 );
  }

  secs.push({ n: "ſɭɜ j͐ʃɹ , j͑ʃɜ j͐ʃɹ", a: 0o57 * bar, b: 0o600 * HE });
  const t0 = 0o57 * bar;
  [ [ 0o0, 0o0, 0o3 ], [ 0o3, 0o3, 0o2 ], [ 0o5, 0o1, 0o3 ] ].forEach(( [ p, dg, l ] ) => ev.push({ t: t0 + p * e8, i: "inanga", f: F(P[dg]), d: l * e8, v: 0o33/0o40, dur: l * e8 }));
  ev.push({ t: t0 + 0o6 * e8, i: "inanga", f: F(P[0o0] - 0o14), d: e8 * 0o2, v: 0o33/0o40, dur: e8 * 0o2 });

  return { events: ev.sort(( a, b ) => a.t - b.t), dur: 0o600 * HE, secs };
}
