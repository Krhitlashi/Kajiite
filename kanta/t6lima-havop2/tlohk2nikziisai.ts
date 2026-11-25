// ≺⧼ j͑ʃƨꞇʞ ʌ ſɭɔ j͑ʃ'ɔ 📃 ⧽≻

import { SKULPTAPASO, SKULPTAN, SKULPTAORIGINO, SKULPTAAKTIVA, SKULPTADELTAJ,
  SKULPTAAKVAMASKO, SKULPTAAKVANIVELO, SKULPTAHAXAIQ,
  SKULPTABIOMOJ, SKULPTABESTOJ } from "./tik.js";
import { bikubaPx01o } from "../x2x2q/interpolo.js";
import { kf2Sakxo } from "../../skek2/x2x2q/caq2q.js";
import { bsej2kuqQoxa, h6kuniQoxa } from "../../skek2/x2x2q/mapqoxa.js";
import { tikBal2 } from "./mapregulo.js";
import { tikRuva } from "../fasado/nala.js";
import { ruvaDeS2bana, subRuva } from "../nala/ruva.js";
import { generiT6liman, type GeneritaT6lima } from "../nala/casacakakcasai.js";
import { generiSetlejon, type GeneritaSetlejo } from "../nala/kekkaatsiisai.js";
import { SKULPTAOBJEKTOJ, SKULPTAHAKAXTE, SKULPTAHAKAS2KANTA,
  SKULPTAHAQAKAJ2 } from "./tik.js";
import type { Knat6keqanuKuba, Knat6keqanuK6h6N2k, Knat6keqanuTap2Qoxa,
  Neq2qObjekto } from "../nala/kaxte/hahunaq.js";
import type { AkvaTsiq } from "../nala/tsasaVek2fe.js";

// ⟪ j͑ʃƨᴜʞ 📃 ⟫

export function dekodiInt16(kruda: string): Int16Array | null {
  if ( kruda === "" ) return null;
  try {
    const hacacaja = Uint8Array.from(atob(kruda), c => c.charCodeAt(0));
    const havop2 = new Int16Array(hacacaja.length / 2);
    const kix2 = new DataView(hacacaja.buffer);
    for ( let i = 0; i < havop2.length; i++ ) havop2[i] = kix2.getInt16(i * 2, true);
    return havop2;
  } catch { return null; }
}

export function dekodiMaskon(kruda: string, vem2: number): Uint8Array | null {
  if ( kruda === "" ) return null;
  try {
    const hacacaja = Uint8Array.from(atob(kruda), c => c.charCodeAt(0));
    const k6liqani = new Uint8Array(vem2);
    for ( let i = 0; i < vem2; i++ ) k6liqani[i] = ( hacacaja[i >> 3] >> (i & 7) ) & 1;
    return k6liqani;
  } catch { return null; }
}

// ⟪ ſɭc̗ᴜ ɭʃэ ſɭɔȝ ꞁȷ̀ᴜ }ʃw ʌ ſɟɔȝ 📃 ⟫
// }ʃᴜ j͐ʃᴜ ʌ ſɟwƽ ʌ j͑ʃᴜꞇ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ſɟɔȝ ʌ j͑ʃᴜꞇ ( j͐ʃэ ɭ(ᴜ , ſᶘᴜ j͑ʃᴜ , ʃɔ˞ɹ , ſןᴜ ſ͔ɭᴜ , ſᶘᴜ j͑ʃᴜ ʌ j͑ʃ'ɜ ſןɹ ) .
// }ʃᴜ j͐ʃᴜ ʌ ꞁȷ̀ɜ ɭʃᴜ j͑ʃᴜ ʌ ſɟwƽ ʌ j͑ʃᴜꞇ = ſɭc̗ᴜ ɭʃэ ſɭɔȝ ꞁȷ̀ᴜ }ʃw ʌ ſɟɔȝ ʌ ꞁȷ̀ɹ ɭʃᴜ ŋᷠᴜ ʌ ſɭɜ ſᶘɜ ꞁȷ̀ɔ main .
// j͑ʃƨᴜʞ ʌ ſɟwƽ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ⺓ ʌ }ʃᴜ j͐ʃᴜ ʌ }ʃᴜ j͐ʃᴜ ʌ j͑ʃɹ ſȷᴜͷ̗ , ſɭɹ ʌ }ʃᴜ j͐ʃᴜ ʌ ʃᴜ j͐ʃɹ ʌ j͑ʃᴜꞇ ʌ ɭʃᴜ j͑ʃɹ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ .
export const GENERITAT6LIMA: GeneritaT6lima | null = ( () => {
  const ruvaS2bana = tikRuva();
  if ( ruvaS2bana === "" ) return null;
  const bal2 = tikBal2();
  return generiT6liman(
    ruvaDeS2bana(ruvaS2bana), SKULPTAN, SKULPTAPASO,
    SKULPTAORIGINO as [ number, number ], SKULPTAAKVANIVELO,
    ( x, z ) => bsej2kuqQoxa(bal2.qoxa, bal2.pal6, x, z));
} )();

// ⟪ ſɟᴜᴜ̩ ŋᷠᴜƴ ʌ ſɭᴜ j͑ʃᴜ 📃 ⟫
// ſɭᴜ ı],ƨɔ , ſɭэ ֭ſɭэ , ſɭɜ ſɭ,w }ʃw , ꞁȷ̀ɜ ı],ɔ ŋᷠᴜ }ʃꞇ ʌ j͑ʃᴜꞇ ʌ ſɟwƽ ʌ j͑ʃᴜꞇ .
// }ʃᴜ j͐ʃᴜ ʌ ꞁȷ̀ɜ ɭʃᴜ j͑ʃᴜ ʌ ſɟwƽ ʌ j͑ʃᴜꞇ = ſɭc̗ᴜ ɭʃэ ſɭɔȝ ꞁȷ̀ᴜ }ʃw ʌ ſɟᴜᴜ̩ ɭʃɹ ʌ ꞁȷ̀ɹ ɭʃᴜ ŋᷠᴜ ʌ ſɭɜ ſᶘɜ ꞁȷ̀ɔ main .
export const GENERITASETLEJO: GeneritaSetlejo | null = ( () => {
  if ( !GENERITAT6LIMA ) return null;
  const bal2 = tikBal2();
  return generiSetlejon(GENERITAT6LIMA.ruva, GENERITAT6LIMA, {
    vem2: SKULPTAAKVANIVELO,
    enQoxa: ( x, z ) => bsej2kuqQoxa(bal2.qoxa, bal2.pal6, x, z),
    pukazDeQoxa: ( x, z ) => h6kuniQoxa(bal2.qoxa, bal2.pal6, x, z),
  });
} )();

const DELTAJ: Int16Array | null = GENERITAT6LIMA || !SKULPTAAKTIVA ? null : dekodiInt16(SKULPTADELTAJ);
const AKVAMASKO: Uint8Array | null = GENERITAT6LIMA ? GENERITAT6LIMA.tsasaMasko
  : SKULPTAAKTIVA ? dekodiMaskon(SKULPTAAKVAMASKO, SKULPTAN * SKULPTAN) : null;
const BIOMOJ: Uint8Array | null = GENERITAT6LIMA ? GENERITAT6LIMA.habs2
  : SKULPTAAKTIVA ? dekodi3Bit(SKULPTABIOMOJ, SKULPTAN * SKULPTAN) : null;
const BESTOJ: Uint8Array | null = GENERITAT6LIMA ? GENERITAT6LIMA.hapaga
  : SKULPTAAKTIVA ? dekodi3Bit(SKULPTABESTOJ, SKULPTAN * SKULPTAN) : null;

// ⟪ ʃᴜ j͐ʃɹ ʌ ſɟɔȝ ʌ j͑ʃ'ɜ ſןɹ 📃 ⟫

/* ſɟɔȝ ʌ j͑ʃ'ɜ ſןɹ ʌ }ʃᴜ j͐ʃᴜ ʌ ʃᴜ j͐ʃɹ
    @param x,z ( number ) - ſɟᴜ j͑ʃᴜ ʌ ſןᴜ j͐ʃэ ʌ }ʃᴜ j͐ʃᴜ
@returns y ( number ) - ſɭᴜ ſɭᴜ ſɭc̗ᴜ ɭʃэ ſɭɔȝ ꞁȷ̀ᴜ }ʃw ʌ ſɟɔȝ ʌ ꞁȷ̀ɹ ɭʃᴜ ŋᷠᴜ */
export function tikL6da( x: number, z: number ): number {
  return GENERITAT6LIMA ? GENERITAT6LIMA.l6da(x, z) : 0;
}

/* ſᶘᴜ j͑ʃᴜ ʌ j͑ʃ'ɜ ſןɹ ʌ }ʃᴜ j͐ʃᴜ ʌ ʃᴜ j͐ʃɹ
@returns hatsiq ( AkvaTsiq[] ) */
export function tikTsasahatsiq(): AkvaTsiq[] {
  return GENERITAT6LIMA ? GENERITAT6LIMA.hatsiq : SKULPTAHAXAIQ;
}

/* ſᶘᴜ j͑ʃᴜ ʌ ſɟwƽ ʌ j͑ʃ'ɜ ſןɹ ʌ }ʃᴜ j͐ʃᴜ ʌ ʃᴜ j͐ʃɹ
@returns k6liqani ( Uint8Array | null ) */
export function tikAkvaMasko(): Uint8Array | null {
  return AKVAMASKO;
}

/* ſɟwƽ ʌ ɭl̀ᴜ ſ͕ɭɜ ʌ ſᶘɹ ɭʃᴜ }ʃꞇ ʌ }ʃᴜ j͐ʃᴜ
@returns tk2ni ( number ) */
export function jaqoRuvaKozunu(): number {
  return GENERITAT6LIMA ? GENERITAT6LIMA.jaqoRuvaKozunu : 0o123/0o100;
}

/* j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ſɟɔȝ ʌ j͑ʃ'ɜ ſןɹ ʌ }ʃᴜ j͐ʃᴜ ʌ ʃᴜ j͐ʃɹ ʌ j͑ʃᴜꞇ
@returns generita ( boolean ) */
export function tsekeGeneritaT6lima(): boolean {
  return GENERITAT6LIMA !== null;
}

/* j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ſɭᴜ ı],ƨɔ ʌ }ʃᴜ j͐ʃᴜ ʌ ʃᴜ j͐ʃɹ ʌ j͑ʃᴜꞇ
@returns generita ( boolean ) */
export function tsekeGeneritaSetlejo(): boolean {
  return GENERITASETLEJO !== null;
}

/* ſɭᴜ ı],ƨɔ ʌ }ʃᴜ j͐ʃᴜ ʌ ʃᴜ j͐ʃɹ
@returns hakaxte ( Knat6keqanuKuba[] ) */
export function tikHakaxte(): Knat6keqanuKuba[] {
  return GENERITASETLEJO ? GENERITASETLEJO.hakaxte : SKULPTAHAKAXTE as Knat6keqanuKuba[];
}

/* ſɭэ ֭ſɭэ ʌ }ʃᴜ j͐ʃᴜ ʌ ʃᴜ j͐ʃɹ
@returns hak6h6 ( Knat6keqanuK6h6N2k[] ) */
export function tikHak6h6(): Knat6keqanuK6h6N2k[] {
  return GENERITASETLEJO ? GENERITASETLEJO.hak6h6 : SKULPTAHAKAS2KANTA as Knat6keqanuK6h6N2k[];
}

/* ſɭɜ ſɭ,w }ʃw ʌ }ʃᴜ j͐ʃᴜ ʌ ʃᴜ j͐ʃɹ
@returns haqakaj2 ( Knat6keqanuTap2Qoxa[] ) */
export function tikHaqakaj2(): Knat6keqanuTap2Qoxa[] {
  return GENERITASETLEJO ? GENERITASETLEJO.haqakaj2 : SKULPTAHAQAKAJ2 as Knat6keqanuTap2Qoxa[];
}

/* ꞁȷ̀ɜ ı],ɔ ŋᷠᴜ }ʃꞇ ʌ }ʃᴜ j͐ʃᴜ ʌ ʃᴜ j͐ʃɹ
@returns hazace ( Neq2qObjekto[] ) */
export function tikHatoxemani(): Neq2qObjekto[] {
  return GENERITASETLEJO ? GENERITASETLEJO.hazace : SKULPTAOBJEKTOJ as Neq2qObjekto[];
}

/* ſɟwƽ ʌ ı],ᴜ ſ̀ȷɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ . }ʃᴜ j͐ʃᴜ ʌ ſɟwƽ ʌ j͑ʃᴜꞇ
  ſɟwƽ ʌ ı],ᴜ ſ̀ȷɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ꞁȷ̀ɹ ſɟwƽ ʌ }ʃᴜ j͐ʃᴜ .
    @param kozunuRuva ( number ) - ſɟwƽ ʌ ı],ᴜ ſ̀ȷɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ
@returns tk2ni ( number ) */
export function vegetajxaRuva( kozunuRuva: number ): number {
  if ( !GENERITAT6LIMA ) return kozunuRuva;
  return subRuva(GENERITAT6LIMA.ruva, ( kozunuRuva & 0o777777 ) + 0o1);
}

// ⟨ ſɟwƽ ʌ j͐ʃᴜɔ˞ 📃 ⟩
// j͑ʃᴜ ſɭᴜ ʌ j͑ʃᴜꞇ ( ŋᷠᴜƴ , ɭʃɔ ŋᷠɔƽ , ſᶘᴜ ſȷᴜ , j͐ʃᴜɔ˞ ) ʌ ſɟwƽ ʌ j͑ʃᴜꞇ ,
// ſɭɹ ʌ }ʃᴜ j͐ʃᴜ ʌ ꞙɭı ʌ }ʃᴜ j͐ʃᴜ ʌ j͑ʃɜ j͑ʃƨɹ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ .
// }ʃᴜ j͐ʃᴜ ʌ ꞁȷ̀ɜ ɭʃᴜ j͑ʃᴜ ʌ ſɟwƽ ʌ j͑ʃᴜꞇ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ Math.random , ſɭɹ ʌ }ʃᴜ j͐ʃᴜ ʌ ꞙɭı ʌ }ʃᴜ j͐ʃᴜ ʌ j͑ʃɜ j͑ʃƨɹ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ .
const MONDIAPLIIGO = 0x7F4A7C15;
const KANALOSURTERA = 0o33;

export function mondiaHazardo(): () => number {
  if ( !GENERITAT6LIMA ) return Math.random;
  return kf2Sakxo(subRuva(GENERITAT6LIMA.ruva, KANALOSURTERA), MONDIAPLIIGO);
}

// ⟨ j͑ʃᴜ ſɭᴜ 📃 ⟩

export function knat6keqanuDelta(x: number, z: number): number {
  if ( !DELTAJ ) return 0;
  const fx = ( x - SKULPTAORIGINO[0] ) / SKULPTAPASO;
  const fz = ( z - SKULPTAORIGINO[1] ) / SKULPTAPASO;
  return bikubaPx01o(DELTAJ, SKULPTAN, fx, fz) / 0o20;
}

/* j͑ʃƨᴜʞ ʌ ꞙɭц ʌ ſ͕ɭᴜ ʌ ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ ʌ ꞁȷ̀ɹ base64 , ʃɔ˞ɹ ʌ ſןᴜ ſ͔ɭᴜ ʌ j͑ʃᴜꞇ ʌ j͑ʃɜ j͑ʃƨɹ
    @param kruda ( string ) - ſɟᴜ ɭʃɜ ʌ base64
    @param vem2 ( number ) - ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ ʌ ꞙɭı ʌ ſןᴜ j͐ʃэ
@returns hatskek2 ( Uint8Array | null ) */
export function dekodi3Bit(kruda: string, vem2: number): Uint8Array | null {
  if ( kruda === "" ) return null;
  try {
    const hacacaja = Uint8Array.from(atob(kruda), c => c.charCodeAt(0));
    const hatskek2 = new Uint8Array(vem2);
    for ( let i = 0; i < vem2; i++ ) {
      const b = i * 3;
      hatskek2[i] = ( hacacaja[b >> 3] >> (b & 7) )
        | ( ( b & 7 ) > 5 ? hacacaja[( b >> 3 ) + 1] : 0 ) << ( 0o10 - ( b & 7 ) );
      hatskek2[i] &= 7;
    }
    return hatskek2;
  } catch { return null; }
}

export function skulptitaBs2(x: number, z: number): number {
  if ( !BIOMOJ ) return 0;
  const fx = ( x - SKULPTAORIGINO[0] ) / SKULPTAPASO;
  const fz = ( z - SKULPTAORIGINO[1] ) / SKULPTAPASO;
  const i = Math.max(0, Math.min(SKULPTAN - 1, Math.floor(fx)));
  const j = Math.max(0, Math.min(SKULPTAN - 1, Math.floor(fz)));
  return BIOMOJ[j * SKULPTAN + i];
}

export function skulptitaPaga(x: number, z: number): number {
  if ( !BESTOJ ) return 0;
  const fx = ( x - SKULPTAORIGINO[0] ) / SKULPTAPASO;
  const fz = ( z - SKULPTAORIGINO[1] ) / SKULPTAPASO;
  const i = Math.max(0, Math.min(SKULPTAN - 1, Math.floor(fx)));
  const j = Math.max(0, Math.min(SKULPTAN - 1, Math.floor(fz)));
  return BESTOJ[j * SKULPTAN + i];
}
