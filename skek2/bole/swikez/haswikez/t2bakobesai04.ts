// ≺⧼ j͑ʃп́ꞇ ſɭɔƴ ɔэ · j͐ʃɜ ɭʃᴜ ʌ ſɭᴜͷ̗ ʌ ɭʃɜ ı],ɔƽ · ꞙɭɩɔɔ ɭʃɜᴜ̩ ɭʃɜƽ 🎵 ⧽≻

import type { BoleEg2b2, Qaroxema, SpuroDateno } from "../habal/hahunaq.js";
import { F, PENTA } from "../habal/p6zuk.js";
import { HE, caxomani } from "../habal/tif.js";
import { motifoS, treni } from "./hax2x2q.js";

export function buildTrack4(): SpuroDateno {
  const ev: BoleEg2b2[] = [];
  const secs: Qaroxema[] = [];
  // ⟨ ſɭᴜ ſןᴜ ʌ ʃɜ j͐ʃɔ , ꞙɭıɔ ɭʃɜᴜ̩ ɭʃɜƽ ʌ ꞙɭı , ꞙɭıɔ j͑ʃɹ ſןw ⟅ ⟩
  const e8 = caxomani(0o40), bar = e8 * 0o10;
  const P = PENTA;
  const ost = [ 0, 3, 1, 4, 2, 4, 1, 3 ];
  const SM: [ number, number, number ][] = [ [ 0, 5, 2 ], [ 2, 6, 1 ], [ 3, 7, 2 ], [ 5, 6, 1 ], [ 6, 5, 2 ], [ 8, 4, 2 ], [ 10, 5, 2 ], [ 12, 6, 3 ], [ 15, 5, 1 ] ];

  // ⟪ ſɭᴜ ſןᴜ , Aisiakrhi , MIDI 🎹 📃 ⟫
  // ⟨ Aisiakrhi , MIDI , D♭ major , ꞙɭı , ꞙɭɿ , A major pentatonic
  //   ꞙɭı , ſɭᴜ ſןᴜ , j͑ʃᴜ ı],ɔ , ꞙɭı , ſᶘᴜ j͐ʃɹ , PENTA
  //   ꞙɭɔ , ꞙɭı ſןэ ſɭ,wƽ , ꞙɭı , ꞙɭɿ , ſᶘᴜ j͐ʃɹ ⟅ ⟩
  // ⟨ Bowgart , ſןɔ˞ᴜƴ , A#ɿ C#ц D#ц F#ц A#ɿ C#ц F3 , ꞙɭэ ſןɔ˞ᴜƴ , ꞙɭı ,
  //   PENTA , ſןэ ſɭ,wƽ ɔ ɿ ц э ɔ ꞟ ⟅ ⟩
  const LBOWGART: number[] = [ 0, 2, 3, 4, 0, 5 ];
  // ⟨ Ghazt , j͑ʃᴜ ſɭᴜ ɭʃɹ , C#э A#ц C#э G#ц F#э , ꞙɭı , ꞙɭɿ ſɭɜ ſɭᴜƽ ,
  //   PENTA , ꞙɭэ ſᶘᴜ j͐ʃɹ , ſןэ ſɭ,wƽ ƨ ꞟ ƨ 9 ⟅ ⟩
  const LGHAZT: [ number, number, number ][] = [ [ 0, 7, 2 ], [ 0o2, 5, 2 ], [ 0o4, 7, 2 ], [ 0o6, 9, 2 ] ];
  // ⟨ ʃɜ j͐ʃɔ ʌ ſɭэ ɭʃᴜ , Aisiakrhi , ſɭᴜ ſןᴜ ꞙɭээ–ꞙɭэƨ ⟅ Whisp , Dandidoo
  //   F4 C#э G#э F4 , C#э G#э , C#э C#э F4 C#э , C#э F4 ⟅
  //   PENTA , ſןэ ſɭ,wƽ ƨ ꞟ 8 ƨ , ꞟ 8 , ꞟ ꞟ ƨ ꞟ , ꞟ ƨ
  //   C#э A3 E4 C#э , A3 E4 , A3 A3 C#э A3 , A3 C#э ⟅
  //   ꞙɭ8 ɭʃɜᴜ̩ ɭʃɜƽ ʌ ꞙɭı , ꞙɭ8 ſɭᴜ ſןᴜ , ⟅ ⟩
  const LDANDIDOO: [ number, number ][] = [
    [ 0, 7 ], [ 0o1, 5 ], [ 0o2, 8 ], [ 0o3, 7 ],
    [ 0o11, 5 ], [ 0o12, 8 ],
    [ 0o20, 5 ], [ 0o21, 5 ], [ 0o22, 7 ], [ 0o23, 5 ],
    [ 0o31, 5 ], [ 0o32, 7 ],
  ];
  // ⟨ ſɭɜ ɭl̀ɹ ᶅſᴜ }ʃꞇ Reedling , ſɭᴜ ſןᴜ ꞙɭээ–ꞙɭэƨ ⟅ A#ɿ , C#ц F3 , D3 A2 , A2 ⟅
  //   ꞙɭı , ꞙɭɿ ſɭɜ ſɭᴜƽ , ʃɜ j͐ʃɔ ʌ ſɭэ ɭʃᴜ , ſᶘᴜ j͐ʃɹ ,
  //   ſןэ ſɭ,wƽ , F#ɿ A2 C#ц B2 E2 ⟅ ꞙɭı , G#ц , E3 , ꞙɭɿ ſɭᴜ ,
  //   ꞙɭ8 ɭʃɜᴜ̩ ɭʃɜƽ ꞙɭɿ , ꞙɭı ⟅ ⟩

  const ostinato = ( t0: number, shift: number, v: number ) => {
    for ( let k = 0; k < 0o10; k++ )
      ev.push({ t: t0 + k * e8, i: "inanga", f: F(P[ost[( k + shift ) % 0o10]]), d: e8 * 0o2, v, dur: e8 * 0o2 });
  };
  const pulse = ( t0: number, dens: boolean ) => {
    for ( let k = 0; k < 0o10; k += 2 ) ev.push({ t: t0 + k * e8, i: "guiro", d: HE / 0o10, v: ( k % 4 === 0 ) ? 0o4/0o10 : 0o23/0o40 });
    if ( dens ) for ( let k = 1; k < 0o10; k += 2 ) ev.push({ t: t0 + k * e8 + e8 / 2, i: "guiro", d: HE / 0o10, v: 0o13/0o40 });
  };

  // ⟨ ʃɜ j͐ʃɔ ʌ ſɭэ ɭʃᴜ Dandidoo , ꞙɭэ ſɭᴜ ſןᴜ ⟅ hiwe , ꞙɭ8 ɭʃɜᴜ̩ ɭʃɜƽ ,
  //   siku , ſᶘᴜ j͐ʃɹ ꞙɭı , ſ̀ȷɜ ֭ſɭɔ , ꞙɭɔ , inanga , mbira ⟅ ⟩
  const dandidoo = ( t0: number ) => {
    treni( ev, t0, e8, P, LDANDIDOO, 0o37/0o40, 0o1 );
    for ( const [ p, dg ] of LDANDIDOO )
      ev.push({ t: t0 + p * e8, i: "siku", f: F( P[dg] ), d: e8 * 0o1, v: 0o63/0o100 });
  };

  // ⟨ ſɭɜ ɭl̀ɹ ᶅſᴜ }ʃꞇ Reedling , ꞙɭэ ſɭᴜ ſןᴜ ⟅ tlakak , ſᶘᴜ j͐ʃɹ , ꞙɭı ,
  //   ꞙɭı , ꞙɭэꞟ , ꞙɭэɩ , j͑ʃɜ ɭʃɹȝ , ꞙɭı ⟅ ⟩
  const reedlingo = ( t0: number, tlakak: number ) => {
    const hatsal2: [ number, number, number ][] = [
      [ 0, P[4] - 0o14, 0o10 ],
      [ 0o10, P[0], 0o2 ],
      [ 0o12, P[2], 0o2 ],
      [ 0o20, P[1], 0o2 ],
      [ 0o22, P[3], 0o2 ],
      [ 0o30, tlakak, 0o10 ],
    ];
    for ( const [ p, n, l ] of hatsal2 )
      ev.push({ t: t0 + p * e8, i: "hiwe", f: F( n ), d: l * e8, v: 0o33/0o40 });
  };

  // ⟨ ʃɜ j͐ʃɔ ʌ ſɭэ ɭʃᴜ , ſɭᴜ ſןᴜ ꞙɭээ , ꞙɭıɿ ɭʃɜᴜ̩ ɭʃɜƽ , ꞙɭц ⟅
  //   Dandidoo , Reedling , ꞙɭэ ⟅ ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ⟅
  //   ꞙɭı , ʃɜ j͐ʃɔ ʌ ſɭэ ɭʃᴜ , ꞙɭı , ꞙɭı , ꞙɭı ⟅
  //   ſɭᴜ ſןᴜ , ꞙɭɔ , ꞙɭı , ꞙɭɿ ⟅ ⟩
  const enTemo = ( b: number ) => b >= 0o44 && b < 0o60;
  const saxeoTemo = ( b: number ) => enTemo( b ) && b % 0o4 === 0;
  // ⟨ ſᶘᴜ j͐ʃɹ ʌ ſɭɜ j͐ʃɹ , ſɭɜ ɭl̀ɹ ᶅſᴜ }ʃꞇ , ꞙɭı ⟅ ꞙɭı , ꞙɭı , F#ɿ , ꞙɭı ⟅ ⟩
  const BASOFINOJ = [ P[3], P[3] - 0o14, P[4] - 0o14 ];
  const sutlo = ( t0: number, k: number ) => {
    dandidoo( t0 );
    reedlingo( t0, BASOFINOJ[k % 0o3] );
  };

  secs.push({ n: "ſɭэ ɭʃᴜ , jɐ", a: 0, b: 0o6 * bar });
  for ( let b = 0; b < 0o6; b++ ) {
    const t0 = b * bar;
    ostinato(t0, 0, 0o43/0o100);
    pulse(t0, b >= 0o3);
    if ( b === 0o5 ) ev.push({ t: t0, i: "siku", f: F(P[5]), d: bar * 0o7/0o10, v: 0o33/0o40 });
    // ⟨ Bowgart , ſןɔ˞ᴜƴ , ſɭᴜ ʃןᴜ , ꞙɭı ſɭᴜ ſןᴜ , ꞙɭı ſᶘᴜ j͐ʃɹ , Aisiakrhi
    //   , ꞙɭꞟ ꞙɭ8 ɭʃɜᴜ̩ ɭʃɜƽ , ꞙɭı , inanga , ꞙɭı ⟅ ⟩
    ev.push({ t: t0, i: "hiwe", f: F(P[LBOWGART[b]]), d: bar * 0o5/0o10, v: 0o23/0o40 + b * 0o1/0o100 });
  }

  secs.push({ n: "ʃɜ j͐ʃɔ , ɭʃэʞ , siku", a: 0o6 * bar, b: 0o26 * bar });
  for ( let b = 0; b < 0o20; b++ ) {
    const t0 = ( 0o6 + b ) * bar;
    ostinato(t0, b % 0o10, 0o43/0o100);
    pulse(t0, true);
    if ( b % 0o2 === 0 && b % 0o10 !== 0o4 ) motifoS(ev, t0, e8, P, SM, "siku", 0o63/0o100);
    // ⟨ Ghazt , hiwe , ꞙɭı ſɭᴜ ſןᴜ , siku , ꞙɭı ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı ɭʃɜᴜ̩ ɭʃɜƽ ⟅ ⟩
    if ( b % 0o10 === 0o4 ) motifoS(ev, t0, e8, P, LGHAZT, "hiwe", 0o33/0o40);
    if ( b % 0o10 === 0o5 ) motifoS(ev, t0, e8, P, LGHAZT, "siku", 0o53/0o100, 0o11/0o10, 0o14);
    // ⟨ hiwe , siku , ſɭᴜ ſןᴜ ɭʃᴜ , ꞙɭı , ſɭᴜ ʃןᴜ , ſɭɔ˞ɜⅎ , j͑ʃɹ ŋᷠɹ ⟅ ⟩
    if ( b % 0o4 === 0o1 && b % 0o10 !== 0o5 ) treni(ev, t0 + 3 * e8, e8, P, [ [ 0, 6 ], [ 0o2, 4 ], [ 0o3, 2 ] ], 0o33/0o40);
  }

  secs.push({ n: "j͑ʃɹ ŋᷠɹ , j͑ʃᴜ ʃɜƽ", a: 0o26 * bar, b: 0o42 * bar });
  ev.push({ t: 0o26 * bar + 0o2 * e8, i: "tjurunga", f: 0o304, d: 0o23 * HE, v: 0o63/0o100 });
  ev.push({ t: 0o32 * bar, i: "tjurunga", f: 0o351, d: 0o25 * HE, v: 0o35/0o40 });
  ev.push({ t: 0o37 * bar, i: "tjurunga", f: 0o406, d: 0o21 * HE, v: 0o55/0o100 });
  for ( let b = 0; b < 0o14; b++ ) {
    const t0 = ( 0o26 + b ) * bar;
    ostinato(t0, 0, 0o43/0o100);
    pulse(t0, true);
    ev.push({ t: t0, i: "kiiqflak", f: F(P[2]), d: HE / 0o2, v: 0o63/0o100 });
    if ( b % 0o2 === 0 ) ev.push({ t: t0 + 4 * e8, i: "kiiqflak", f: F(P[3]), d: HE / 0o3, v: 0o43/0o100 });
    if ( b % 0o4 === 0 ) ev.push({ t: t0, i: "siku", f: F(P[0o12]), d: bar * 0o163/0o100, v: 0o23/0o40 });
    if ( b % 0o4 === 2 ) ev.push({ t: t0 + 4 * e8, i: "siku", f: F(P[7]), d: e8 * 0o3, v: 0o43/0o100 });
    // ⟨ hiwe , j͑ʃɹ ŋᷠɹ , ꞙɭı ſɭᴜ ſןᴜ , ſɭᴜ ʃןᴜ , ſɭᴜ ʃןᴜ , ſןэ ſɭ,wƽ
    //   , ꞙɭı , ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı ⟅ ⟩
    if ( b % 0o3 === 0 ) ev.push({ t: t0, i: "hiwe", f: F(P[b % 0o6 === 0 ? 0 : 2]), d: bar * 0o12/0o10, v: 0o25/0o40 });
    if ( b % 0o4 === 0o3 ) treni(ev, t0 + 5 * e8, e8, P, [ [ 0, 5 ], [ 0o2, 7 ] ], 0o33/0o40);
  }

  secs.push({ n: "ſɭэ ɭʃᴜ , ꞙɭɿ , ſɭᴜ ſןᴜ", a: 0o42 * bar, b: 0o52 * bar });
  for ( let b = 0; b < 0o10; b++ ) {
    const ab = 0o42 + b;
    const t0 = ab * bar;
    const tik = enTemo( ab );
    ostinato( t0, 3, tik ? 0o23/0o40 : 0o33/0o40 );
    pulse( t0, true );
    // ⟨ ʃɜ j͐ʃɔ ʌ ſɭэ ɭʃᴜ , mbira , j͐ʃэ ɭ(ᴜ , ſɭɜ ſɭᴜƽ , ꞙɭɔ ,
    //   ſɭᴜ ʃןᴜ ⟅ ꞙɭı , siku , ꞙɭı , ʃɜ j͐ʃɔ ʌ ſɭэ ɭʃᴜ ⟅ ⟩
    for ( let p = 0; p < 0o10; p++ ) {
      const dg = Math.min( 0o12, ost[p] + ( p % 0o2 ? 0 : 2 ) );
      const vm = tik ? ( p % 0o2 ? 0o31/0o100 : 0o25/0o100 ) : ( p % 0o2 ? 0o35/0o100 : 0o43/0o100 );
      ev.push({ t: t0 + p * e8 + ( p % 0o2 ? e8 / 2 : 0 ), i: "mbira", f: F( P[dg] + 0o14 ), d: e8 * 0o2, v: vm });
    }
    if ( b % 0o2 === 0 && !tik ) motifoS( ev, t0, e8, P, SM, "siku", 0o55/0o100 );
    if ( !tik ) {
      // ⟨ ꞙɭı , ſᶘᴜ j͐ʃɹ , ꞙɭɿ , ꞙɭɔ , ſɭᴜ ʃןᴜ , ꞙɭэ ɭʃɜᴜ̩ ɭʃɜƽ , ſןэ ſɭ,wƽ
      //   , ſןэ ſɭ,wƽ , ꞙɭɔ ſᶘᴜ j͐ʃɹ ꞙɭɿ , ⟅ ⟩
      const rr = b % 0o2 === 0 ? 2 : 4;
      treni( ev, t0, e8, P, [ [ 0, rr ], [ 0o2, rr + 1 ], [ 0o4, rr ], [ 0o6, rr + 1 ] ], 0o25/0o40, 0o1 );
    }
    if ( saxeoTemo( ab ) ) sutlo( t0, ( ab - 0o44 ) / 0o4 );
  }

  secs.push({ n: "j͑ʃɜ j͐ʃɹ , ꞙɭı", a: 0o52 * bar, b: 0o57 * bar });
  ev.push({ t: 0o52 * bar, i: "tjurunga", f: 0o406, d: 0o21 * HE, v: 1 });
  ev.push({ t: 0o55 * bar, i: "tjurunga", f: 0o446, d: 0o15 * HE, v: 0o35/0o40 });
  for ( let b = 0; b < 0o5; b++ ) {
    const ab = 0o52 + b;
    const t0 = ab * bar;
    ostinato( t0, 0, 0o23/0o40 );
    pulse( t0, true );
    for ( let p = 0; p < 0o10; p++ ) if ( p % 0o2 === 0 )
      ev.push({ t: t0 + p * e8, i: "mbira", f: F( P[ost[( p + 5 ) % 0o10]] + 0o14 ), d: e8 * 0o2, v: 0o33/0o100 });
    // ⟨ ʃɜ j͐ʃɔ ʌ ſɭэ ɭʃᴜ Dandidoo , ſɭɜ ɭl̀ɹ ᶅſᴜ }ʃꞇ Reedling , ꞙɭı ,
    //   Whisp , ꞙɭı , ꞙɭɔ , ꞙɭɿ ʃɔ ſᶘэ ſɭ,ɜ , mbira , j͐ʃэ ɭ(ᴜ , ⟅ ⟩
    if ( saxeoTemo( ab ) ) sutlo( t0, ( ab - 0o44 ) / 0o4 );
  }

  secs.push({ n: "ſɭɜ j͐ʃɹ , j͑ʃɜ j͐ʃɹ", a: 0o57 * bar, b: 0o600 * HE });
  const t0 = 0o57 * bar;
  [ [ 0, 0, 3 ], [ 3, 3, 2 ], [ 5, 1, 3 ] ].forEach(( [ p, dg, l ] ) => ev.push({ t: t0 + p * e8, i: "inanga", f: F(P[dg]), d: l * e8, v: 0o33/0o40, dur: l * e8 }));
  ev.push({ t: t0 + 0o6 * e8, i: "inanga", f: F(P[0] - 0o14), d: e8 * 0o2, v: 0o33/0o40, dur: e8 * 0o2 });
  // ⟨ ſɭᴜ ſןᴜ ꞙɭꞟƨ , ꞙɭэ ɭʃɜᴜ̩ ɭʃɜƽ ꞙɭц ⟅ ʃɜ j͐ʃɔ ʌ ſɭэ ɭʃᴜ Dandidoo ,
  //   ſɭɜ ɭl̀ɹ ᶅſᴜ }ʃꞇ F#ɿ , ꞙɭı ⟅ ꞙɭɔ , hiwe , ꞙɭı , ꞙɭı , ⟅ ⟩

  return { events: ev.sort(( a, b ) => a.t - b.t), dur: 0o600 * HE, secs };
}