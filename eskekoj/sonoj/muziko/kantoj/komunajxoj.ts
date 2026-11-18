// ≺⧼ ជំនួយរួមរបស់ចម្រៀង 🎼 ⧽≻
// មេឡូឌីដឹកនាំ និងជំនួយគូរណោតដែលវិលនីមួយៗប្រើរួមគ្នា។

import type { SonoEvento } from "../vokoj/tipoj.js";
import { F } from "../vokoj/skaloj.js";

// ⟪ មេឡូឌីដឹកនាំ អៃស៊ីអាគ្រី 📃 ⟫

export const A1: [ number, number, number ][] = [ [ 0, 0o74, 2 ], [ 2, 0o100, 1 ], [ 3, 0o74, 2 ], [ 5, 0o103, 1 ], [ 6, 0o100, 1 ], [ 7, 0o76, 4 ] ];
export const A2: [ number, number, number ][] = [ [ 0, 0o74, 2 ], [ 2, 0o73, 1 ], [ 3, 0o71, 2 ], [ 5, 0o73, 1 ], [ 6, 0o76, 1 ], [ 7, 0o100, 4 ] ];
export const B0: [ number, number, number ][] = [ [ 0, 0o74, 4 ], [ 6, 0o76, 4 ] ];
export const KB1: [ number, number, number ][] = [ [ 1, 0o103, 1 ], [ 2, 0o100, 1 ], [ 3, 0o105, 1 ], [ 4, 0o100, 2 ], [ 6, 0o76, 1 ], [ 7, 0o103, 2 ], [ 9, 0o100, 2 ] ];
export const KB2: [ number, number, number ][] = [ [ 1, 0o74, 1 ], [ 2, 0o74, 1 ], [ 3, 0o100, 1 ], [ 4, 0o74, 2 ], [ 6, 0o73, 2 ], [ 8, 0o73, 1 ], [ 9, 0o100, 2 ] ];
export const MAJ_C = [ 0o60, 0o62, 0o64, 0o65, 0o67, 0o71, 0o73, 0o74, 0o76, 0o100, 0o101, 0o103, 0o105, 0o107, 0o110 ];

// ⟪ មេឡូឌីដឹកនាំពី MP3 អៃស៊ីអាគ្រី 📃 ⟫
// ⟨ បានចម្លងពីការវិភាគសំឡេង MP3 ៖ កូនសោ Bb មីន័រភែនតាតូនិក , ស្នូល C# , F4 ជាណោតដឹកនាំ 📃 ⟩

export const U1: [ number, number, number ][] = [ [ 0, 0o101, 2 ], [ 2, 0o104, 1 ], [ 3, 0o101, 1 ], [ 4, 0o77, 2 ], [ 6, 0o75, 3 ], [ 9, 0o72, 1 ], [ 10, 0o75, 2 ] ];
export const U2: [ number, number, number ][] = [ [ 0, 0o75, 2 ], [ 2, 0o77, 1 ], [ 3, 0o101, 2 ], [ 5, 0o104, 1 ], [ 6, 0o101, 1 ], [ 7, 0o77, 2 ], [ 9, 0o75, 3 ] ];
export const U0: [ number, number, number ][] = [ [ 0, 0o70, 2 ], [ 2, 0o61, 1 ], [ 3, 0o70, 2 ], [ 5, 0o65, 1 ], [ 6, 0o72, 4 ] ];
export const MIN_BB = [ 0o56, 0o61, 0o63, 0o65, 0o70, 0o72, 0o75, 0o77, 0o101, 0o104, 0o106, 0o111, 0o113, 0o115, 0o120 ];

/*គូរមេឡូឌីមួយទៅឧបករណ៍មួយ ៖ p ជាទីតាំងគិតជាភាគប្រាំបី , m ជាណោត MIDI , l ជាប្រវែង
    @param ev ( SonoEvento[] ) - បញ្ជីព្រឹត្តិការណ៍
    @param t0 ( number ) - ពេលចាប់ផ្តើម
    @param e8 ( number ) - រយៈពេលភាគប្រាំបី
    @param noto ( tuple[] ) - ណោតរបស់មេឡូឌី
    @param i ( string ) - ឧបករណ៍
    @param v ( number ) - កម្រិតសំឡេង
    @param du ( number = 0o17/0o20 , optional ) - ភាគរយប្រវែងណោត
    @param trans ( number = 0 , optional ) - ការផ្លាស់ទីកម្រិតសំឡេង */
export function motifo(ev: SonoEvento[], t0: number, e8: number, noto: [ number, number, number ][], i: string, v: number, du = 0o17/0o20, trans = 0) {
  for ( const [ p, m, l ] of noto ) ev.push({ t: t0 + p * e8, i, f: F(m + trans), d: l * e8 * du, v });
}

/*គូរមេឡូឌីតាមស្កេល ៖ p ជាទីតាំងគិតជាភាគប្រាំបី , dg ជាដឺក្រេស្កេល , l ជាប្រវែង
    @param ev ( SonoEvento[] ) - បញ្ជីព្រឹត្តិការណ៍
    @param t0 ( number ) - ពេលចាប់ផ្តើម
    @param e8 ( number ) - រយៈពេលភាគប្រាំបី
    @param skalo ( number[] ) - ស្កេលកម្រិតសំឡេង
    @param noto ( tuple[] ) - ណោតរបស់មេឡូឌីជាដឺក្រេ
    @param i ( string ) - ឧបករណ៍
    @param v ( number ) - កម្រិតសំឡេង
    @param du ( number = 0o17/0o20 , optional ) - ភាគរយប្រវែងណោត
    @param trans ( number = 0 , optional ) - ការផ្លាស់ទីកម្រិតសំឡេង */
export function motifoS(ev: SonoEvento[], t0: number, e8: number, skalo: number[], noto: [ number, number, number ][], i: string, v: number, du = 0o17/0o20, trans = 0) {
  for ( const [ p, dg, l ] of noto ) ev.push({ t: t0 + p * e8, i, f: F(skalo[dg] + trans), d: l * e8 * du, v });
}

/*គូរលំនាំអូសខ្សែហ៊ីវេ ៖ ការអូសខ្លីៗដដែលៗដូចដៃអូសលើខ្សែ
    ទីតាំងជាភាគប្រាំបី , ដឺក្រេយកពីស្កេល ហើយរាល់អូសមានរយៈពេលខ្លី
    @param ev ( SonoEvento[] ) - បញ្ជីព្រឹត្តិការណ៍
    @param t0 ( number ) - ពេលចាប់ផ្ដើម
    @param e8 ( number ) - រយៈពេលភាគប្រាំបី
    @param skalo ( number[] ) - ស្កេលកម្រិតសំឡេង
    @param noto ( tuple[] ) - ទីតាំងនិងដឺក្រេនៃការអូស
    @param v ( number ) - កម្រិតសំឡេង
    @param du ( number = 0o3/0o4 , optional ) - ភាគរយប្រវែងការអូស */
export function treni(ev: SonoEvento[], t0: number, e8: number, skalo: number[], noto: [ number, number ][], v: number, du = 0o3/0o4) {
  for ( const [ p, dg ] of noto ) ev.push({ t: t0 + p * e8, i: "hiwe", f: F(skalo[dg]), d: e8 * du, v });
}

// ⟪ ជំនួយមេឡូឌី 📃 ⟫

export interface MelNoto { p: number; d: number; l: number }

export function mel(r: () => number, slots: number, lo: number, hi: number, start: number, dens: number): MelNoto[] {
  const out: MelNoto[] = [];
  let d = start, i = 0;
  while ( i < slots ) {
    if ( r() < dens ) {
      const len = 1 + Math.floor(r() * 3);
      out.push({ p: i, d, l: Math.min(len, slots - i) });
      i += len;
      const st = [ -2, -1, -1, 0, 1, 1, 2 ][Math.floor(r() * 7)];
      d = Math.max(lo, Math.min(hi, d + st));
    } else i++;
  }
  return out;
}