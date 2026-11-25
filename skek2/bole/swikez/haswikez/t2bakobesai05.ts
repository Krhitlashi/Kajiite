// ≺⧼ j͑ʃп́ꞇ ſɭɔƴ ɔꞟ · ɭl̀э ſɭᴜ ı],ƨɔ ʌ j͑ʃп́ɔ j͑ʃɹ ɭl̀ᴜ · ꞙɭꞟɿɔ ɭʃɜᴜ̩ ɭʃɜƽ 🎵 ⧽≻
// ⟨ ſɭᴜ , j͑ʃп́ꞇ ſɭɔƴ , MP3 , ſɭᴜ ſ͕ȷɔ , j͑ʃᴜ ſɭᴜ ɭʃɹ , C# ⟅ ⟩

import type { BoleEg2b2, Qaroxema, SpuroDateno } from "../habal/hahunaq.js";
import { F } from "../habal/p6zuk.js";
import { HE, caxomani } from "../habal/tif.js";
import { motifo, treni, U1, U2, U0, MINBB } from "./hax2x2q.js";

export function buildTrack5(): SpuroDateno {
  const ev: BoleEg2b2[] = [];
  const secs: Qaroxema[] = [];
  // ⟨ ſɭᴜ ſןᴜ ʌ ʃɜ j͐ʃɔ , ꞙɭıɔ ɭʃɜᴜ̩ ɭʃɜƽ ʌ ꞙɭı ⟅ ⟩
  const BPQ = 0o40;
  const e8 = caxomani(BPQ), bar = e8 * 0o14;
  const f0 = F(0o45);
  const arpU = [ 5, 7, 9, 7, 5, 7, 9, 11, 9, 7, 5, 7 ];
  const arpU2 = [ 4, 6, 8, 6, 4, 6, 8, 10, 8, 6, 4, 6 ];

  const akompani = ( t0: number, am: boolean, l2ha: boolean ) => {
    const arp = am ? arpU2 : arpU;
    for ( let k = 0; k < 0o14; k++ ) {
      ev.push({ t: t0 + k * e8, i: "inanga", f: F(MINBB[arp[k]] - 0o14), d: e8 * 0o2, v: 0o4/0o10, dur: e8 * 0o2 });
      ev.push({ t: t0 + k * e8, i: "guiro", d: HE / 0o10, v: ( k % 0o3 === 0 ) ? ( l2ha ? 0o43/0o100 : 0o4/0o10 ) : ( l2ha ? 0o23/0o40 : 0o13/0o40 ) });
    }
    ev.push({ t: t0, i: "slenthem", f: F(am ? 0o56 : 0o61), d: e8 * 0o2, v: l2ha ? 0o35/0o40 : 0o33/0o40 });
    ev.push({ t: t0 + 6 * e8, i: "slenthem", f: F(am ? 0o65 : 0o54), d: e8 * 0o2, v: 0o33/0o40 });
    if ( l2ha ) for ( let k = 0; k < 0o14; k++ ) {
      const dg = Math.min(0o16, arp[k] + ( k % 0o2 ? 0 : 0o3 ));
      ev.push({ t: t0 + k * e8 + ( k % 0o2 ? e8 / 2 : 0 ), i: "mbira", f: F(MINBB[dg] + 0o14), d: e8 * 0o2, v: k % 0o2 ? 0o35/0o100 : 0o43/0o100 });
    }
  };

  secs.push({ n: "ſɭᴜ ı],ƨɔ , ֭ſɭэ ᶅſэ", a: 0, b: 0o2 * bar });
  ev.push({ t: 0, i: "didj", f: f0, d: 0o2 * bar, v: 0o63/0o100 });
  ev.push({ t: 0, i: "slenthem", f: F(0o61), d: e8 * 0o2, v: 0o35/0o40 });
  ev.push({ t: bar, i: "slenthem", f: F(0o54), d: e8 * 0o2, v: 0o33/0o40 });
  [ 0, 3, 6, 9 ].forEach(( k, j ) => ev.push({ t: bar + k * e8, i: "inanga", f: F(MINBB[[ 5, 7, 9, 7 ][j]]), d: e8 * 0o5/0o3, v: 0o4/0o10, dur: e8 * 0o5/0o3 }));
  [ 0, 3, 6, 9 ].forEach(k => ev.push({ t: bar + k * e8, i: "guiro", d: HE / 0o10, v: 0o13/0o40 }));

  secs.push({ n: "ʃɔ ſᶘэ ſɭ,ɜ , ſɭᴜ ſ͕ȷɔ", a: 0o2 * bar, b: 0o12 * bar });
  ev.push({ t: 0o2 * bar, i: "didj", f: f0, d: 0o10 * bar, v: 0o55/0o100 });
  for ( let b = 0; b < 0o10; b++ ) {
    const t0 = ( 0o2 + b ) * bar, am = b % 0o2 === 1;
    motifo(ev, t0, e8, am ? U2 : U1, b < 0o4 ? "ocarina" : "siku", b < 0o4 ? 0o63/0o100 : 0o55/0o100);
    akompani(t0, am, b >= 0o4);
    if ( b === 0o3 || b === 0o5 ) ev.push({ t: t0 + 6 * e8, i: "didj", f: f0 * 0o201/0o100, d: e8 * 0o6/0o10, v: 0o33/0o40, toot: true });
    // ⟨ hiwe , ꞙɭɿ ɭʃɜᴜ̩ ɭʃɜƽ , ſɭɜ j͐ʃɹ ʌ j͑ʃп́ꞇ ſɭɔƴ , ſɭᴜ ſןᴜ ⟅ ⟩
    if ( b < 0o4 ) treni(ev, t0 + 0o6 * e8, e8, MINBB, [ [ 0, 9 ], [ 0o3, 7 ] ], 0o33/0o40);
  }

  secs.push({ n: "ʃɜ j͐ʃɔ , ſɭᴜ ſןᴜ , ꞙɭı", a: 0o12 * bar, b: 0o22 * bar });
  ev.push({ t: 0o12 * bar, i: "tjurunga", f: 0o406, d: 0o21 * HE, v: 0o63/0o100 });
  ev.push({ t: 0o12 * bar, i: "didj", f: f0, d: 0o10 * bar, v: 0o63/0o100 });
  for ( let b = 0; b < 0o10; b++ ) {
    const t0 = ( 0o12 + b ) * bar, am = b % 0o2 === 1;
    motifo(ev, t0, e8, am ? U2 : U1, "ocarina", 0o63/0o100);
    ev.push({ t: t0, i: "siku", f: F(am ? 0o75 : 0o101), d: bar * 0o75/0o100, v: 0o23/0o40 });
    akompani(t0, am, true);
    if ( b % 0o2 === 1 ) ev.push({ t: t0 + 3 * e8, i: "didj", f: f0 * 0o201/0o100, d: e8 * 0o6/0o10, v: 0o33/0o40, toot: true });
    // ⟨ hiwe , ſɭᴜ ſ͕ȷɔ , ſɭɜ j͐ʃɹ , ꞙɭı ſɭᴜ , ꞙɭɔ ⟅ ⟩
    if ( b % 0o2 === 1 ) motifo(ev, t0, e8, am ? U2 : U1, "hiwe", 0o23/0o40, 0o17/0o20, -0o14);
  }

  secs.push({ n: "ſɭᴜ ſןᴜ , j͑ʃ'ƽᴜ ɭl̀ɹ", a: 0o22 * bar, b: 0o24 * bar });
  ev.push({ t: 0o22 * bar, i: "tjurunga", f: 0o304, d: 0o23 * HE, v: 0o33/0o40 });
  ev.push({ t: 0o22 * bar, i: "didj", f: f0, d: 0o2 * bar, v: 0o43/0o100 });
  motifo(ev, 0o22 * bar, e8, U0, "siku", 0o55/0o100);
  motifo(ev, 0o23 * bar, e8, [ [ 0, 0o101, 4 ], [ 6, 0o77, 4 ] ], "siku", 0o43/0o100);
  ev.push({ t: 0o22 * bar, i: "slenthem", f: F(0o61), d: e8 * 0o2, v: 0o33/0o40 });
  ev.push({ t: 0o23 * bar, i: "slenthem", f: F(0o54), d: e8 * 0o2, v: 0o33/0o40 });
  [ 0, 6 ].forEach(k => ev.push({ t: 0o22 * bar + k * e8, i: "guiro", d: HE / 0o10, v: 0o23/0o40 }));
  ev.push({ t: 0o23 * bar + 6 * e8, i: "didj", f: f0 * 0o201/0o100, d: e8 * 0o6/0o10, v: 0o33/0o40, toot: true });
  // ⟨ hiwe , j͑ʃ'ƽᴜ ɭl̀ɹ , ꞙɭı ɭʃɜᴜ̩ ɭʃɜƽ , ꞙɭɿ ⟅ ⟩
  ev.push({ t: 0o22 * bar, i: "hiwe", f: F(MINBB[9] - 0o14), d: 0o10 * e8, v: 0o25/0o40 });
  treni(ev, 0o23 * bar + 0o2 * e8, e8, MINBB, [ [ 0, 7 ], [ 0o4, 5 ] ], 0o33/0o40, 0o10/0o10);

  secs.push({ n: "ʃɔ ſᶘэ ſɭ,ɜ , j͑ʃɜ j͐ʃɹ", a: 0o24 * bar, b: 0o32 * bar });
  ev.push({ t: 0o24 * bar, i: "tjurunga", f: 0o507, d: 0o21 * HE, v: 0o63/0o100 });
  ev.push({ t: 0o24 * bar, i: "didj", f: f0, d: 0o6 * bar, v: 0o63/0o100 });
  for ( let b = 0; b < 0o6; b++ ) {
    const t0 = ( 0o24 + b ) * bar, am = b % 0o2 === 1;
    motifo(ev, t0, e8, am ? U2 : U1, "ocarina", 0o63/0o100);
    motifo(ev, t0, e8, am ? U2 : U1, "siku", 0o33/0o40, 0o17/0o20, 0o14);
    akompani(t0, am, true);
    if ( b % 0o2 === 0 ) ev.push({ t: t0 + 6 * e8, i: "didj", f: f0 * 0o201/0o100, d: e8 * 0o6/0o10, v: 0o33/0o40, toot: true });
    // ⟨ hiwe , ʃɔ ſᶘэ ſɭ,ɜ , ſɭᴜ ſ͕ȷɔ , ꞙɭı ⟅ ⟩
    if ( b % 0o2 === 0 ) motifo(ev, t0, e8, am ? U2 : U1, "hiwe", 0o25/0o40, 0o17/0o20, -0o14);
  }

  secs.push({ n: "ſɭᴜ ı],ƨɔ , ſɭɜ j͐ʃɹ", a: 0o32 * bar, b: 0o520 * HE });
  ev.push({ t: 0o32 * bar, i: "didj", f: f0, d: 0o2 * bar, v: 0o33/0o40 });
  motifo(ev, 0o32 * bar, e8, [ [ 0, 0o101, 2 ], [ 2, 0o104, 1 ], [ 3, 0o101, 2 ] ], "ocarina", 0o43/0o100);
  ev.push({ t: 0o32 * bar, i: "siku", f: F(0o75), d: 0o2 * bar, v: 0o23/0o40 });
  ev.push({ t: 0o32 * bar, i: "slenthem", f: F(0o61), d: e8 * 0o2, v: 0o35/0o40 });
  ev.push({ t: 0o33 * bar, i: "slenthem", f: F(0o45), d: e8 * 0o2, v: 0o33/0o40 });
  [ 0, 3, 6, 9 ].forEach(( k, j ) => ev.push({ t: 0o32 * bar + k * e8, i: "inanga", f: F(MINBB[[ 5, 7, 9, 7 ][j]]), d: e8 * 0o5/0o3, v: 0o23/0o40, dur: e8 * 0o5/0o3 }));
  ev.push({ t: 0o33 * bar + 6 * e8, i: "guiro", d: e8 * 0o3/0o2, v: 0o33/0o40, cresc: 1 });
  // ⟨ hiwe , ſɭɜ j͐ʃɹ , ſɭɜ ɭl̀ɹ ᶅſᴜ }ʃꞇ , j͑ʃᴜ ʃɜƽ ⟅ ⟩
  ev.push({ t: 0o32 * bar, i: "hiwe", f: F(MINBB[5] - 0o14), d: 0o10 * e8, v: 0o33/0o40 });
  ev.push({ t: 0o32 * bar + 0o12 * e8, i: "hiwe", f: F(MINBB[1] - 0o14), d: 0o7 * e8, v: 0o23/0o40 });

  return { events: ev.sort(( a, b ) => a.t - b.t), dur: 0o520 * HE, secs };
}