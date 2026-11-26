// ≺⧼ j͑ʃп́ꞇ ſɭɔƴ 08 · ſɭɘᴜ ֭ſɭᴜ · ꞙɭээɔ ɭʃɜᴜ̩ ɭʃɜƽ 🎵 ⧽≻

import type { BoleEg2b2, Qaroxema, SpuroDateno } from "../habal/hahunaq.js";
import { F } from "../habal/p6zuk.js";
import { HE, caxomani } from "../habal/tif.js";
import { motifo, A1, A2, KB1, KB2, MAJC } from "./hax2x2q.js";

export function buildTrack8(): SpuroDateno {
  const ev: BoleEg2b2[] = [];
  const secs: Qaroxema[] = [];
  // ⟨ j͑ʃɔ ֭ſɭɔ }ʃꞇ ⟅ j͑ʃᴜꞇ ʌ ꞙɭı ʌ ꞙɭı 📃 ⟩
  const BPQ = 0o40;
  const e8 = caxomani(BPQ), bar = e8 * 0o14;
  const f0 = F(0o44);
  const ost = [ 0o7, 0o11, 0o7, 0o13, 0o11, 0o7, 0o11, 0o14, 0o7, 0o11, 0o13, 0o11 ];

  const akompani = ( t0: number, am: boolean ) => {
    for ( let k = 0o0; k < 0o14; k++ ) {
      ev.push({ t: t0 + k * e8, i: "guiro", d: HE / 0o10, v: ( k % 0o3 === 0o0 ) ? 0o43/0o100 : 0o23/0o40 });
      ev.push({ t: t0 + k * e8, i: "mbira", f: F(MAJC[ost[k]] + ( am ? 0o0 : 0o14 )), d: e8 * 0o2, v: ( k % 0o3 === 0o0 ) ? 0o43/0o100 : 0o35/0o100 });
    }
    [ 0o0, 0o6 ].forEach(k => ev.push({ t: t0 + k * e8, i: "inanga", f: F(MAJC[am ? 0o5 : 0o7] - 0o14), d: e8 * 0o3/0o2, v: 0o4/0o10, dur: e8 * 0o3/0o2 }));
    [ 0o3, 0o11 ].forEach(k => ev.push({ t: t0 + k * e8, i: "inanga", f: F(MAJC[am ? 0o11 : 0o13] - 0o14), d: e8 * 0o2, v: 0o35/0o100, dur: e8 * 0o2 }));
    ev.push({ t: t0, i: "slenthem", f: F(am ? 0o55 : 0o60), d: e8 * 0o2, v: 0o35/0o40 });
    ev.push({ t: t0 + 0o6 * e8, i: "slenthem", f: F(am ? 0o50 : 0o53), d: e8 * 0o2, v: 0o33/0o40 });
  };

  secs.push({ n: "ſɟᴜ j͑ʃᴜ ʌ j͑ʃᴜꞇ ʌ ſᶘᴜƽ", a: 0o0, b: 0o2 * bar });
  ev.push({ t: 0o0, i: "didj", f: f0, d: 0o2 * bar, v: 0o55/0o100 });
  ev.push({ t: 0o0, i: "slenthem", f: F(0o60), d: e8 * 0o2, v: 0o33/0o40 });
  for ( let k = 0o0; k < 0o14; k++ ) ev.push({ t: bar + k * e8, i: "mbira", f: F(MAJC[ost[k]] + 0o14), d: e8 * 0o2, v: 0o35/0o100 });
  [ 0o0, 0o3, 0o6, 0o11 ].forEach(k => ev.push({ t: bar + k * e8, i: "guiro", d: HE / 0o10, v: 0o4/0o10 }));

  secs.push({ n: "ſɟᴜ j͑ʃᴜ ʌ j͑ʃᴜꞇ ʌ j͑ʃᴜ jᷠᴜ", a: 0o2 * bar, b: 0o12 * bar });
  ev.push({ t: 0o2 * bar, i: "didj", f: f0, d: 0o10 * bar, v: 0o55/0o100 });
  for ( let b = 0o0; b < 0o10; b++ ) {
    const t0 = ( 0o2 + b ) * bar, am = b % 0o2 === 0o1;
    motifo(ev, t0, e8, am ? A2 : A1, "siku", 0o63/0o100);
    akompani(t0, am);
    if ( b % 0o2 === 0o1 ) ev.push({ t: t0 + 0o3 * e8, i: "didj", f: f0 * 0o201/0o100, d: e8 * 0o6/0o10, v: 0o35/0o40, toot: true });
    if ( b === 0o7 ) ev.push({ t: t0 + 0o11 * e8, i: "guiro", d: e8 * 0o3/0o2, v: 0o43/0o100, cresc: 0o1 });
  }

  secs.push({ n: "ʃᴜͷ̗ ʌ j͑ʃᴜ ſɭᴜ", a: 0o12 * bar, b: 0o22 * bar });
  ev.push({ t: 0o12 * bar, i: "tjurunga", f: 0o406, d: 0o21 * HE, v: 0o63/0o100 });
  ev.push({ t: 0o12 * bar, i: "didj", f: f0, d: 0o10 * bar, v: 0o63/0o100 });
  for ( let b = 0o0; b < 0o10; b++ ) {
    const t0 = ( 0o12 + b ) * bar, am = b % 0o2 === 0o1;
    motifo(ev, t0, e8, am ? A2 : A1, "ocarina", 0o63/0o100);
    motifo(ev, t0, e8, am ? KB2 : KB1, "siku", 0o33/0o40);
    akompani(t0, am);
    if ( b % 0o2 === 0o0 ) ev.push({ t: t0 + 0o6 * e8, i: "didj", f: f0 * 0o201/0o100, d: e8 * 0o6/0o10, v: 0o35/0o40, toot: true });
  }

  secs.push({ n: "ſɟᴜ j͑ʃᴜ ʌ j͑ʃᴜꞇ ʌ j͑ʃᴜꞇ", a: 0o22 * bar, b: 0o26 * bar });
  ev.push({ t: 0o22 * bar, i: "tjurunga", f: 0o507, d: 0o21 * HE, v: 0o63/0o100 });
  ev.push({ t: 0o22 * bar, i: "didj", f: f0, d: 0o4 * bar, v: 0o63/0o100 });
  for ( let b = 0o0; b < 0o4; b++ ) {
    const t0 = ( 0o22 + b ) * bar, am = b % 0o2 === 0o1;
    motifo(ev, t0, e8, am ? A2 : A1, "ocarina", 0o63/0o100);
    motifo(ev, t0, e8, am ? A2 : A1, "siku", 0o43/0o100, 0o17/0o20, 0o14);
    akompani(t0, am);
    ev.push({ t: t0 + 0o3 * e8, i: "didj", f: f0 * 0o201/0o100, d: e8 * 0o6/0o10, v: 0o35/0o40, toot: true });
  }

  secs.push({ n: "ſɟᴜ j͑ʃᴜ ʌ j͑ʃᴜꞇ ʌ ꞙɭɔ ʌ ʃᴜͷ̗", a: 0o26 * bar, b: 0o440 * HE });
  ev.push({ t: 0o26 * bar, i: "didj", f: f0, d: 0o2 * bar, v: 0o33/0o40 });
  motifo(ev, 0o26 * bar, e8, [ [ 0o0, 0o74, 0o2 ], [ 0o2, 0o100, 0o1 ], [ 0o3, 0o74, 0o2 ] ], "siku", 0o43/0o100);
  ev.push({ t: 0o26 * bar, i: "slenthem", f: F(0o60), d: e8 * 0o2, v: 0o35/0o40 });
  ev.push({ t: 0o27 * bar, i: "slenthem", f: F(0o44), d: e8 * 0o2, v: 0o33/0o40 });
  for ( let k = 0o0; k < 0o14; k++ ) ev.push({ t: 0o26 * bar + k * e8, i: "mbira", f: F(MAJC[ost[k]]), d: e8 * 0o2, v: 0o23/0o40 });
  ev.push({ t: 0o27 * bar + 0o6 * e8, i: "guiro", d: e8 * 0o3/0o2, v: 0o33/0o40, cresc: 0o1 });

  return { events: ev.sort(( a, b ) => a.t - b.t), dur: 0o440 * HE, secs };
}