// ≺⧼ វិល 06 · ɭl̀э ſɭэ ſᶘɹ ʌ j͑ʃп́ɔ j͑ʃɹ ɭl̀ᴜ · 0o440 ហេ 🎵 ⧽≻
// ⟨ មេឡូឌីពី MP3 អៃស៊ីអាគ្រី ៖ អូស្ទីណាតូមប៊ីរ៉ាក្នុងផ្សារ 📃 ⟩

import type { SonoEvento, Sekcio, SpuroDateno } from "../vokoj/tipoj.js";
import { F } from "../vokoj/skaloj.js";
import { HE, okono } from "../vokoj/tempo.js";
import { motifo, U1, U2, U0, MIN_BB } from "./komunajxoj.js";

export function buildTrack6(): SpuroDateno {
  const ev: SonoEvento[] = [];
  const secs: Sekcio[] = [];
  // ⟨ ចង្វាក់ ៖ បាតក្នុងមួយគុយអេ 📃 ⟩
  const BPQ = 0o40;
  const e8 = okono(BPQ), bar = e8 * 0o14;
  const f0 = F(0o45);
  const ost = [ 7, 9, 7, 11, 9, 7, 9, 12, 7, 9, 11, 9 ];

  const akompani = ( t0: number, am: boolean ) => {
    for ( let k = 0; k < 0o14; k++ ) {
      ev.push({ t: t0 + k * e8, i: "guiro", d: HE / 0o10, v: ( k % 0o3 === 0 ) ? 0o43/0o100 : 0o23/0o40 });
      ev.push({ t: t0 + k * e8, i: "mbira", f: F(MIN_BB[ost[k]] + ( am ? 0 : 0o14 )), d: e8 * 0o2, v: ( k % 0o3 === 0 ) ? 0o43/0o100 : 0o35/0o100 });
    }
    [ 0, 6 ].forEach(k => ev.push({ t: t0 + k * e8, i: "inanga", f: F(MIN_BB[am ? 4 : 6] - 0o14), d: e8 * 0o3/0o2, v: 0o4/0o10, dur: e8 * 0o3/0o2 }));
    [ 3, 9 ].forEach(k => ev.push({ t: t0 + k * e8, i: "inanga", f: F(MIN_BB[am ? 8 : 10] - 0o14), d: e8 * 0o2, v: 0o35/0o100, dur: e8 * 0o2 }));
    ev.push({ t: t0, i: "slenthem", f: F(am ? 0o56 : 0o61), d: e8 * 0o2, v: 0o35/0o40 });
    ev.push({ t: t0 + 6 * e8, i: "slenthem", f: F(am ? 0o65 : 0o54), d: e8 * 0o2, v: 0o33/0o40 });
  };

  secs.push({ n: "ផ្សារភ្ញាក់", a: 0, b: 0o2 * bar });
  ev.push({ t: 0, i: "didj", f: f0, d: 0o2 * bar, v: 0o55/0o100 });
  ev.push({ t: 0, i: "slenthem", f: F(0o61), d: e8 * 0o2, v: 0o33/0o40 });
  for ( let k = 0; k < 0o14; k++ ) ev.push({ t: bar + k * e8, i: "mbira", f: F(MIN_BB[ost[k]] + 0o14), d: e8 * 0o2, v: 0o35/0o100 });
  [ 0, 3, 6, 9 ].forEach(k => ev.push({ t: bar + k * e8, i: "guiro", d: HE / 0o10, v: 0o4/0o10 }));

  secs.push({ n: "ស៊ីគូលើផ្សារ", a: 0o2 * bar, b: 0o12 * bar });
  ev.push({ t: 0o2 * bar, i: "didj", f: f0, d: 0o10 * bar, v: 0o55/0o100 });
  for ( let b = 0; b < 0o10; b++ ) {
    const t0 = ( 0o2 + b ) * bar, am = b % 0o2 === 1;
    motifo(ev, t0, e8, am ? U2 : U1, "siku", 0o63/0o100);
    akompani(t0, am);
    if ( b % 0o2 === 1 ) ev.push({ t: t0 + 3 * e8, i: "didj", f: f0 * 0o201/0o100, d: e8 * 0o6/0o10, v: 0o35/0o40, toot: true });
    if ( b === 0o7 ) ev.push({ t: t0 + 9 * e8, i: "guiro", d: e8 * 0o3/0o2, v: 0o43/0o100, cresc: 1 });
  }

  secs.push({ n: "អូការីណាឆ្លើយ", a: 0o12 * bar, b: 0o22 * bar });
  ev.push({ t: 0o12 * bar, i: "tjurunga", f: 0o406, d: 0o21 * HE, v: 0o63/0o100 });
  ev.push({ t: 0o12 * bar, i: "didj", f: f0, d: 0o10 * bar, v: 0o63/0o100 });
  for ( let b = 0; b < 0o10; b++ ) {
    const t0 = ( 0o12 + b ) * bar, am = b % 0o2 === 1;
    motifo(ev, t0, e8, am ? U2 : U1, "ocarina", 0o63/0o100);
    motifo(ev, t0, e8, U0, "siku", 0o33/0o40);
    akompani(t0, am);
    if ( b % 0o2 === 0 ) ev.push({ t: t0 + 6 * e8, i: "didj", f: f0 * 0o201/0o100, d: e8 * 0o6/0o10, v: 0o35/0o40, toot: true });
  }

  secs.push({ n: "ផ្សារពេញ", a: 0o22 * bar, b: 0o26 * bar });
  ev.push({ t: 0o22 * bar, i: "tjurunga", f: 0o507, d: 0o21 * HE, v: 0o63/0o100 });
  ev.push({ t: 0o22 * bar, i: "didj", f: f0, d: 0o4 * bar, v: 0o63/0o100 });
  for ( let b = 0; b < 0o4; b++ ) {
    const t0 = ( 0o22 + b ) * bar, am = b % 0o2 === 1;
    motifo(ev, t0, e8, am ? U2 : U1, "ocarina", 0o63/0o100);
    motifo(ev, t0, e8, am ? U2 : U1, "siku", 0o43/0o100, 0o17/0o20, 0o14);
    akompani(t0, am);
    ev.push({ t: t0 + 3 * e8, i: "didj", f: f0 * 0o201/0o100, d: e8 * 0o6/0o10, v: 0o35/0o40, toot: true });
  }

  secs.push({ n: "ផ្សារស្ងាត់", a: 0o26 * bar, b: 0o440 * HE });
  ev.push({ t: 0o26 * bar, i: "didj", f: f0, d: 0o2 * bar, v: 0o33/0o40 });
  motifo(ev, 0o26 * bar, e8, [ [ 0, 0o101, 2 ], [ 2, 0o104, 1 ], [ 3, 0o101, 2 ] ], "siku", 0o43/0o100);
  ev.push({ t: 0o26 * bar, i: "slenthem", f: F(0o61), d: e8 * 0o2, v: 0o35/0o40 });
  ev.push({ t: 0o27 * bar, i: "slenthem", f: F(0o45), d: e8 * 0o2, v: 0o33/0o40 });
  for ( let k = 0; k < 0o14; k++ ) ev.push({ t: 0o26 * bar + k * e8, i: "mbira", f: F(MIN_BB[ost[k]]), d: e8 * 0o2, v: 0o23/0o40 });
  ev.push({ t: 0o27 * bar + 6 * e8, i: "guiro", d: e8 * 0o3/0o2, v: 0o33/0o40, cresc: 1 });

  return { events: ev.sort(( a, b ) => a.t - b.t), dur: 0o440 * HE, secs };
}