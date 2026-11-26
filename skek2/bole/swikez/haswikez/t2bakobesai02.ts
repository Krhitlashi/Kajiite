// ≺⧼ j͑ʃп́ꞇ ſɭɔƴ ɔɿ · ſןᴜ ʃɜƽ ʌ ſ͔ɭɹ ʃɹ · ꞙɭꞟɿɔ ɭʃɜᴜ̩ ɭʃɜƽ 🎵 ⧽≻

import type { BoleEg2b2, Qaroxema, SpuroDateno } from "../habal/hahunaq.js";
import { F, NYAM } from "../habal/p6zuk.js";
import { HE, caxomani } from "../habal/tif.js";

export function buildTrack2(): SpuroDateno {
  const ev: BoleEg2b2[] = [];
  const secs: Qaroxema[] = [];
  // ⟨ ſɭᴜ ſןᴜ ʌ ʃɜ j͐ʃɔ , ꞙɭıɔ ɭʃɜᴜ̩ ɭʃɜƽ ʌ ꞙɭı , ꞙɭıɿ j͑ʃɹ ſןw , mbira ⟅ ⟩
  const e8 = caxomani(0o40), bar = e8 * 0o14, f0 = 0o4425/0o40;
  const N = NYAM;
  const kush = [ 0o0, 0o4, 0o2, 0o5, 0o3, 0o6, 0o4, 0o7, 0o5, 0o3, 0o2, 0o4 ];
  const kuts = [ 0o3, 0o6, 0o5, 0o2, 0o7, 0o4, 0o6, 0o1, 0o5, 0o2, 0o4, 0o0 ];

  const mbira = ( t0: number, pat: number[], oct: number, v: number ) => {
    for ( let p = 0o0; p < 0o14; p++ )
      ev.push({ t: t0 + p * e8, i: "mbira", f: F(N[pat[p]] + oct), d: e8 * 0o2, v: v + ( p % 0o3 === 0o0 ? 0o13/0o40 : 0o0 ) });
  };
  const bass = ( t0: number ) => {
    ev.push({ t: t0, i: "inanga", f: F(N[0o0] - 0o14), d: e8 * 0o4, v: 0o43/0o100, dur: e8 * 0o4 });
    ev.push({ t: t0 + 0o6 * e8, i: "inanga", f: F(N[0o3] - 0o14), d: e8 * 0o3, v: 0o23/0o40, dur: e8 * 0o3 });
  };

  secs.push({ n: "j͑ʃ'ƽᴜ ɭl̀ɹ ʌ j͐ʃɜ ɭʃᴜ", a: 0o0, b: 0o2 * bar });
  ev.push({ t: 0o0, i: "didj", f: f0, d: 0o30 * e8, v: 0o63/0o100 });
  [ [ 0o4, 0o0 ], [ 0o12, 0o4 ], [ 0o20, 0o2 ] ].forEach(( [ p, dg ] ) => ev.push({ t: p * e8, i: "mbira", f: F(N[dg]), d: e8 * 0o3, v: 0o33/0o40 }));

  secs.push({ n: "ſɭэ ɭʃᴜ ʌ ſɭэ ſɭ,w , j͑ʃᴜ ʃɜƽ", a: 0o2 * bar, b: 0o12 * bar });
  ev.push({ t: 0o2 * bar, i: "didj", f: f0, d: 0o10 * bar, v: 0o55/0o100 });
  for ( let b = 0o0; b < 0o10; b++ ) {
    const t0 = ( 0o2 + b ) * bar;
    mbira(t0, kush, 0o0, 0o43/0o100);
    bass(t0);
  }

  secs.push({ n: "j͑ʃɹ ŋᷠɹ , j͑ʃᴜ ʃɜƽ , j͑ʃᴜ ſɭᴜ ɭʃɹ", a: 0o12 * bar, b: 0o20 * bar });
  ev.push({ t: 0o12 * bar, i: "didj", f: f0, d: 0o6 * bar, v: 0o63/0o100 });
  ev.push({ t: 0o12 * bar + 0o2 * e8, i: "tjurunga", f: 0o334, d: 0o21 * HE, v: 0o63/0o100 });
  ev.push({ t: 0o15 * bar, i: "tjurunga", f: 0o406, d: 0o23 * HE, v: 0o35/0o40 });
  for ( let b = 0o0; b < 0o6; b++ ) {
    const t0 = ( 0o12 + b ) * bar;
    mbira(t0, kuts, 0o14, 0o4/0o10);
    ev.push({ t: t0, i: "kiiqflak", f: F(N[0o1]), d: HE / 0o2, v: 0o6/0o10 });
    if ( b % 0o2 === 0o0 ) ev.push({ t: t0 + 0o6 * e8, i: "kiiqflak", f: F(N[0o2]), d: HE / 0o3, v: 0o43/0o100 });
    ev.push({ t: t0 + 0o6 * e8, i: "inanga", f: F(N[0o4] - 0o14), d: e8 * 0o3, v: 0o23/0o40, dur: e8 * 0o3 });
  }

  secs.push({ n: "didj , ʃɜ j͐ʃɔ , ſɭᴜ ſןᴜ", a: 0o20 * bar, b: 0o26 * bar });
  ev.push({ t: 0o20 * bar, i: "didj", f: f0, d: 0o6 * bar, v: 0o55/0o100 });
  for ( let b = 0o0; b < 0o6; b++ ) {
    const t0 = ( 0o20 + b ) * bar;
    [ 0o0, 0o3, 0o6, 0o11 ].forEach(p => ev.push({ t: t0 + p * e8, i: "didj", f: f0 * 0o201/0o100, d: e8 * 0o3/0o2, v: 0o33/0o40, toot: true }));
    mbira(t0, kush, 0o0, 0o43/0o100);
    bass(t0);
  }

  secs.push({ n: "ſɭᴜ ſןᴜ ꞙɭı , j͑ʃɜ j͐ʃɹ", a: 0o26 * bar, b: 0o33 * bar });
  ev.push({ t: 0o26 * bar, i: "didj", f: f0, d: 0o5 * bar, v: 0o63/0o100 });
  ev.push({ t: 0o26 * bar + 0o2 * e8, i: "tjurunga", f: 0o507, d: 0o17 * HE, v: 0o63/0o100 });
  ev.push({ t: 0o31 * bar, i: "tjurunga", f: 0o446, d: 0o17 * HE, v: 0o55/0o100 });
  for ( let b = 0o0; b < 0o5; b++ ) {
    const t0 = ( 0o26 + b ) * bar;
    mbira(t0, b % 0o2 ? kuts : kush, b % 0o4 > 0o1 ? 0o14 : 0o0, 0o23/0o40);
    bass(t0);
    ev.push({ t: t0, i: "kiiqflak", f: F(N[0o0] + 0o2), d: HE / 0o2, v: 0o63/0o100 });
    if ( b % 0o2 === 0o1 ) ev.push({ t: t0 + 0o11 * e8, i: "didj", f: f0 * 0o201/0o100, d: e8 * 0o5/0o2, v: 0o35/0o40, toot: true });
  }

  secs.push({ n: "ſɭᴜ ſןᴜ , j͑ʃп́ꞇ ſɭɔƴ , j͑ʃɜ j͐ʃɹ", a: 0o33 * bar, b: 0o520 * HE });
  const t0 = 0o33 * bar;
  ev.push({ t: t0, i: "didj", f: f0, d: 0o14 * e8, v: 0o35/0o40 });
  ev.push({ t: t0, i: "mbira", f: F(N[0o0]), d: e8 * 0o4, v: 0o33/0o40 });
  ev.push({ t: t0 + 0o6 * e8, i: "mbira", f: F(N[0o4]), d: e8 * 0o4, v: 0o23/0o40 });
  ev.push({ t: t0 + 0o10 * e8, i: "inanga", f: F(N[0o0] - 0o14), d: e8 * 0o4, v: 0o33/0o40, dur: e8 * 0o4 });

  return { events: ev.sort(( a, b ) => a.t - b.t), dur: 0o520 * HE, secs };
}