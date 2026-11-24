// ≺⧼ j͑ʃɔ j͑ʃп́ꞇ ſɭɔƴ ʌ ſȷɔ ſɭ,ꞇ ꞁȷ̀ᴜ }ʃꞇ 🎼 ⧽≻
// ⟨ ʃɔ ſᶘэ ſɭ,ɜ , j͑ʃᴜ ſɭᴜ ɭʃɹ , ʃɜ j͐ʃɔ , ſɭᴜ ſןᴜ , ꞙɭı ⟅ ⟩

import type { SonoEvento } from "../vokoj/hahunaq.js";
import { F } from "../vokoj/skaloj.js";

// ⟪ ʃɔ ſᶘэ ſɭ,ɜ , j͑ʃᴜ ſɭᴜ ɭʃɹ , ꞙɭı 📃 ⟫

export const A1: [ number, number, number ][] = [ [ 0, 0o74, 2 ], [ 2, 0o100, 1 ], [ 3, 0o74, 2 ], [ 5, 0o103, 1 ], [ 6, 0o100, 1 ], [ 7, 0o76, 4 ] ];
export const A2: [ number, number, number ][] = [ [ 0, 0o74, 2 ], [ 2, 0o73, 1 ], [ 3, 0o71, 2 ], [ 5, 0o73, 1 ], [ 6, 0o76, 1 ], [ 7, 0o100, 4 ] ];
export const B0: [ number, number, number ][] = [ [ 0, 0o74, 4 ], [ 6, 0o76, 4 ] ];
export const KB1: [ number, number, number ][] = [ [ 1, 0o103, 1 ], [ 2, 0o100, 1 ], [ 3, 0o105, 1 ], [ 4, 0o100, 2 ], [ 6, 0o76, 1 ], [ 7, 0o103, 2 ], [ 9, 0o100, 2 ] ];
export const KB2: [ number, number, number ][] = [ [ 1, 0o74, 1 ], [ 2, 0o74, 1 ], [ 3, 0o100, 1 ], [ 4, 0o74, 2 ], [ 6, 0o73, 2 ], [ 8, 0o73, 1 ], [ 9, 0o100, 2 ] ];
export const MAJ_C = [ 0o60, 0o62, 0o64, 0o65, 0o67, 0o71, 0o73, 0o74, 0o76, 0o100, 0o101, 0o103, 0o105, 0o107, 0o110 ];

// ⟪ ʃɔ ſᶘэ ſɭ,ɜ , MP3 , j͑ʃᴜ ſɭᴜ ɭʃɹ 📃 ⟫
// ⟨ ꞙɭı , MP3 , ʃɜ j͐ʃɔ , ꞙɭɿ , Bb , C# , F4 , ſɭᴜ j͑ʃᴜ ɭʃɹ ʌ ſᶘᴜ j͐ʃɹ ⟅ ⟩

export const U1: [ number, number, number ][] = [ [ 0, 0o101, 2 ], [ 2, 0o104, 1 ], [ 3, 0o101, 1 ], [ 4, 0o77, 2 ], [ 6, 0o75, 3 ], [ 9, 0o72, 1 ], [ 10, 0o75, 2 ] ];
export const U2: [ number, number, number ][] = [ [ 0, 0o75, 2 ], [ 2, 0o77, 1 ], [ 3, 0o101, 2 ], [ 5, 0o104, 1 ], [ 6, 0o101, 1 ], [ 7, 0o77, 2 ], [ 9, 0o75, 3 ] ];
export const U0: [ number, number, number ][] = [ [ 0, 0o70, 2 ], [ 2, 0o61, 1 ], [ 3, 0o70, 2 ], [ 5, 0o65, 1 ], [ 6, 0o72, 4 ] ];
export const MIN_BB = [ 0o56, 0o61, 0o63, 0o65, 0o70, 0o72, 0o75, 0o77, 0o101, 0o104, 0o106, 0o111, 0o113, 0o115, 0o120 ];

/* ʃɔ ſᶘэ ſɭ,ɜ , ſɟᴜᴜ̩ ɭʃɹ , p , ꞙɭ8 ɭʃɜᴜ̩ ɭʃɜƽ , m , MIDI , l , ſɭᴜ ſןᴜ
    @param ev ( SonoEvento[] ) - ſɭᴜ ſןᴜ ʌ ʃɜ j͐ʃɔ ꞙɭɿ
    @param t0 ( number ) - j͑ʃᴜ ı],ɔ ʌ ſɭэ ɭʃᴜ
    @param e8 ( number ) - ſɭᴜ ſןᴜ ʌ ꞙɭ8 ɭʃɜᴜ̩ ɭʃɜƽ
    @param noto ( tuple[] ) - ſᶘᴜ j͐ʃɹ ʌ ʃɔ ſᶘэ ſɭ,ɜ
    @param i ( string ) - ſɟᴜᴜ̩ ɭʃɹ
    @param v ( number ) - ſ̀ȷɜ ֭ſɭɔ ʌ ʃɜ j͐ʃɔ
    @param du ( number = ꞙɭıƨ/ꞙɭɿɔ , optional ) - ſɭᴜ ſןᴜ ʌ ſᶘᴜ j͐ʃɹ
    @param trans ( number = ɔ , optional ) - ſɭᴜ ʃןᴜ ʌ ʃɜ j͐ʃɔ */
export function motifo(ev: SonoEvento[], t0: number, e8: number, noto: [ number, number, number ][], i: string, v: number, du = 0o17/0o20, trans = 0) {
  for ( const [ p, m, l ] of noto ) ev.push({ t: t0 + p * e8, i, f: F(m + trans), d: l * e8 * du, v });
}

/* ʃɔ ſᶘэ ſɭ,ɜ , ſןэ ſɭ,wƽ , p , ꞙɭ8 ɭʃɜᴜ̩ ɭʃɜƽ , dg , ſןэ ſɭ,wƽ , l , ſɭᴜ ſןᴜ
    @param ev ( SonoEvento[] ) - ſɭᴜ ſןᴜ ʌ ʃɜ j͐ʃɔ ꞙɭɿ
    @param t0 ( number ) - j͑ʃᴜ ı],ɔ ʌ ſɭэ ɭʃᴜ
    @param e8 ( number ) - ſɭᴜ ſןᴜ ʌ ꞙɭ8 ɭʃɜᴜ̩ ɭʃɜƽ
    @param p6zukani ( number[] ) - ſןэ ſɭ,wƽ ʌ ʃɜ j͐ʃɔ
    @param noto ( tuple[] ) - ſᶘᴜ j͐ʃɹ ʌ ʃɔ ſᶘэ ſɭ,ɜ , ſןэ ſɭ,wƽ
    @param i ( string ) - ſɟᴜᴜ̩ ɭʃɹ
    @param v ( number ) - ſ̀ȷɜ ֭ſɭɔ ʌ ʃɜ j͐ʃɔ
    @param du ( number = ꞙɭıƨ/ꞙɭɿɔ , optional ) - ſɭᴜ ſןᴜ ʌ ſᶘᴜ j͐ʃɹ
    @param trans ( number = ɔ , optional ) - ſɭᴜ ʃןᴜ ʌ ʃɜ j͐ʃɔ */
export function motifoS(ev: SonoEvento[], t0: number, e8: number, p6zukani: number[], noto: [ number, number, number ][], i: string, v: number, du = 0o17/0o20, trans = 0) {
  for ( const [ p, dg, l ] of noto ) ev.push({ t: t0 + p * e8, i, f: F(p6zukani[dg] + trans), d: l * e8 * du, v });
}

/* ɭʃꞇƽ , ſɭᴜ ʃןᴜ , hiwe , ꞙɭı , ꞙɭı , ɭʃꞇƽ , ſɭᴜ ʃןᴜ , ſɭɔ˞ɜⅎ
   ꞙɭ8 ɭʃɜᴜ̩ ɭʃɜƽ , ſןэ ſɭ,wƽ , ꞙɭı , ſɭᴜ ʃןᴜ , ſɭᴜ ſןᴜ
    @param ev ( SonoEvento[] ) - ſɭᴜ ſןᴜ ʌ ʃɜ j͐ʃɔ ꞙɭɿ
    @param t0 ( number ) - j͑ʃᴜ ı],ɔ ʌ ſɭэ ɭʃᴜ
    @param e8 ( number ) - ſɭᴜ ſןᴜ ʌ ꞙɭ8 ɭʃɜᴜ̩ ɭʃɜƽ
    @param p6zukani ( number[] ) - ſןэ ſɭ,wƽ ʌ ʃɜ j͐ʃɔ
    @param noto ( tuple[] ) - ꞙɭı , ꞙɭɿ , ſɭᴜ ʃןᴜ
    @param v ( number ) - ſ̀ȷɜ ֭ſɭɔ ʌ ʃɜ j͐ʃɔ
    @param du ( number = ꞙɭц/ꞙɭэ , optional ) - ſɭᴜ ſןᴜ ʌ ſɭᴜ ʃןᴜ */
export function treni(ev: SonoEvento[], t0: number, e8: number, p6zukani: number[], noto: [ number, number ][], v: number, du = 0o3/0o4) {
  for ( const [ p, dg ] of noto ) ev.push({ t: t0 + p * e8, i: "hiwe", f: F(p6zukani[dg]), d: e8 * du, v });
}

// ⟪ ʃɔ ſᶘэ ſɭ,ɜ , ſɭᴜ ſןᴜ 📃 ⟫

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