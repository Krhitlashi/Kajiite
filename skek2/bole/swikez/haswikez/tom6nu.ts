// ≺⧼ j͑ʃп́ꞇ ſɭɔƴ ʌ ɭʃɜ ŋᷠэ }ʃw 🎵 ⧽≻

import type { BoleEg2b2 } from "../habal/hahunaq.js";
import { F } from "../habal/p6zuk.js";

export const A1: [ number, number, number ][] = [ [ 0o0, 0o74, 0o2 ], [ 0o2, 0o100, 0o1 ], [ 0o3, 0o74, 0o2 ], [ 0o5, 0o103, 0o1 ], [ 0o6, 0o100, 0o1 ], [ 0o7, 0o76, 0o4 ] ];
export const A2: [ number, number, number ][] = [ [ 0o0, 0o74, 0o2 ], [ 0o2, 0o73, 0o1 ], [ 0o3, 0o71, 0o2 ], [ 0o5, 0o73, 0o1 ], [ 0o6, 0o76, 0o1 ], [ 0o7, 0o100, 0o4 ] ];
export const B0: [ number, number, number ][] = [ [ 0o0, 0o74, 0o4 ], [ 0o6, 0o76, 0o4 ] ];
export const KB1: [ number, number, number ][] = [ [ 0o1, 0o103, 0o1 ], [ 0o2, 0o100, 0o1 ], [ 0o3, 0o105, 0o1 ], [ 0o4, 0o100, 0o2 ], [ 0o6, 0o76, 0o1 ], [ 0o7, 0o103, 0o2 ], [ 0o11, 0o100, 0o2 ] ];
export const KB2: [ number, number, number ][] = [ [ 0o1, 0o74, 0o1 ], [ 0o2, 0o74, 0o1 ], [ 0o3, 0o100, 0o1 ], [ 0o4, 0o74, 0o2 ], [ 0o6, 0o73, 0o2 ], [ 0o10, 0o73, 0o1 ], [ 0o11, 0o100, 0o2 ] ];
export const MAJC = [ 0o60, 0o62, 0o64, 0o65, 0o67, 0o71, 0o73, 0o74, 0o76, 0o100, 0o101, 0o103, 0o105, 0o107, 0o110 ];

export const U1: [ number, number, number ][] = [ [ 0o0, 0o101, 0o2 ], [ 0o2, 0o104, 0o1 ], [ 0o3, 0o101, 0o1 ], [ 0o4, 0o77, 0o2 ], [ 0o6, 0o75, 0o3 ], [ 0o11, 0o72, 0o1 ], [ 0o12, 0o75, 0o2 ] ];
export const U2: [ number, number, number ][] = [ [ 0o0, 0o75, 0o2 ], [ 0o2, 0o77, 0o1 ], [ 0o3, 0o101, 0o2 ], [ 0o5, 0o104, 0o1 ], [ 0o6, 0o101, 0o1 ], [ 0o7, 0o77, 0o2 ], [ 0o11, 0o75, 0o3 ] ];
export const U0: [ number, number, number ][] = [ [ 0o0, 0o70, 0o2 ], [ 0o2, 0o61, 0o1 ], [ 0o3, 0o70, 0o2 ], [ 0o5, 0o65, 0o1 ], [ 0o6, 0o72, 0o4 ] ];
export const MINBB = [ 0o56, 0o61, 0o63, 0o65, 0o70, 0o72, 0o75, 0o77, 0o101, 0o104, 0o106, 0o111, 0o113, 0o115, 0o120 ];

export function motifo(ev: BoleEg2b2[], t0: number, e8: number, tsalii: [ number, number, number ][], i: string, v: number, du = 0o17/0o20, trans = 0o0) {
  for ( const [ p, m, l ] of tsalii ) ev.push({ t: t0 + p * e8, i, f: F(m + trans), d: l * e8 * du, v });
}

export function motifoS(ev: BoleEg2b2[], t0: number, e8: number, p6zukani: number[], tsalii: [ number, number, number ][], i: string, v: number, du = 0o17/0o20, trans = 0o0) {
  for ( const [ p, dg, l ] of tsalii ) ev.push({ t: t0 + p * e8, i, f: F(p6zukani[dg] + trans), d: l * e8 * du, v });
}

export function treni(ev: BoleEg2b2[], t0: number, e8: number, p6zukani: number[], tsalii: [ number, number ][], v: number, du = 0o3/0o4) {
  for ( const [ p, dg ] of tsalii ) ev.push({ t: t0 + p * e8, i: "hiwe", f: F(p6zukani[dg]), d: e8 * du, v });
}

export interface MelTsalii { p: number; d: number; l: number }

export function mel(r: () => number, slots: number, lo: number, hi: number, start: number, dens: number): MelTsalii[] {
  const out: MelTsalii[] = [];
  let d = start, i = 0o0;
  while ( i < slots ) {
    if ( r() < dens ) {
      const len = 0o1 + Math.floor(r() * 0o3);
      out.push({ p: i, d, l: Math.min(len, slots - i) });
      i += len;
      const st = [ -0o2, -0o1, -0o1, 0o0, 0o1, 0o1, 0o2 ][Math.floor(r() * 0o7)];
      d = Math.max(lo, Math.min(hi, d + st));
    } else i++;
  }
  return out;
}
