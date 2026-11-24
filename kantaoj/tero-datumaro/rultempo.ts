// ≺⧼ j͑ʃƨꞇʞ ʌ ſɭɔ j͑ʃ'ɔ 📃 ⧽≻

import { SKULPTA_PASO, SKULPTA_N, SKULPTA_ORIGINO, SKULPTA_AKTIVA, SKULPTA_DELTAJ,
  SKULPTA_AKVA_MASKO, SKULPTA_AKVA_NIVELO, SKULPTA_HAXAIQ,
  SKULPTA_BIOMOJ, SKULPTA_BESTOJ } from "./aktiva.js";
import { bikubaSpecimeno } from "../komunajxoj/interpolo.js";
import { kf2Sakxo } from "../../eskekoj/komunajxoj/hazardo.js";
import { bsej2kuqQoxa, h6kuniQoxa } from "../../eskekoj/komunajxoj/mapqoxa.js";
import { aktivaMapo } from "./mapregulo.js";
import { aktivaSemo } from "../fasado/mondoj.js";
import { semoDeS2bana, subSemo } from "../mondo/semo.js";
import { generiTeron, type GeneritaTero } from "../mondo/generilo.js";
import { generiSetlejon, type GeneritaSetlejo } from "../mondo/setlejo.js";
import { SKULPTA_OBJEKTOJ, SKULPTA_URBOJ, SKULPTA_VOJOJ,
  SKULPTA_DOKOJ } from "./aktiva.js";
import type { SkulptaKaxte, SkulptaK6h6, SkulptaPlatqoxa,
  MetitaObjekto } from "../mondo/kaxte/hahunaq.js";
import type { AkvaTsiq } from "../mondo/akvokalkulo.js";

// ⟪ j͑ʃƨᴜʞ 📃 ⟫

export function dekodiInt16(kruda: string): Int16Array | null {
  if ( kruda === "" ) return null;
  try {
    const bajtoj = Uint8Array.from(atob(kruda), c => c.charCodeAt(0));
    const datumoj = new Int16Array(bajtoj.length / 2);
    const vido = new DataView(bajtoj.buffer);
    for ( let i = 0; i < datumoj.length; i++ ) datumoj[i] = vido.getInt16(i * 2, true);
    return datumoj;
  } catch { return null; }
}

export function dekodiMaskon(kruda: string, vem2: number): Uint8Array | null {
  if ( kruda === "" ) return null;
  try {
    const bajtoj = Uint8Array.from(atob(kruda), c => c.charCodeAt(0));
    const k6liqani = new Uint8Array(vem2);
    for ( let i = 0; i < vem2; i++ ) k6liqani[i] = ( bajtoj[i >> 3] >> (i & 7) ) & 1;
    return k6liqani;
  } catch { return null; }
}

// ⟪ ſɭc̗ᴜ ɭʃэ ſɭɔȝ ꞁȷ̀ᴜ }ʃw ʌ ſɟɔȝ 📃 ⟫
// }ʃᴜ j͐ʃᴜ ʌ ſɟwƽ ʌ j͑ʃᴜꞇ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ſɟɔȝ ʌ j͑ʃᴜꞇ ( j͐ʃэ ɭ(ᴜ , ſᶘᴜ j͑ʃᴜ , ʃɔ˞ɹ , ſןᴜ ſ͔ɭᴜ , ſᶘᴜ j͑ʃᴜ ʌ j͑ʃ'ɜ ſןɹ ) .
// }ʃᴜ j͐ʃᴜ ʌ ꞁȷ̀ɜ ɭʃᴜ j͑ʃᴜ ʌ ſɟwƽ ʌ j͑ʃᴜꞇ = ſɭc̗ᴜ ɭʃэ ſɭɔȝ ꞁȷ̀ᴜ }ʃw ʌ ſɟɔȝ ʌ ꞁȷ̀ɹ ɭʃᴜ ŋᷠᴜ ʌ ſɭɜ ſᶘɜ ꞁȷ̀ɔ cxefa .
// j͑ʃƨᴜʞ ʌ ſɟwƽ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ⺓ ʌ }ʃᴜ j͐ʃᴜ ʌ }ʃᴜ j͐ʃᴜ ʌ j͑ʃɹ ſȷᴜͷ̗ , ſɭɹ ʌ }ʃᴜ j͐ʃᴜ ʌ ʃᴜ j͐ʃɹ ʌ j͑ʃᴜꞇ ʌ ɭʃᴜ j͑ʃɹ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ .
export const GENERITA_TERO: GeneritaTero | null = ( () => {
  const semoS2bana = aktivaSemo();
  if ( semoS2bana === "" ) return null;
  const mapo = aktivaMapo();
  return generiTeron(
    semoDeS2bana(semoS2bana), SKULPTA_N, SKULPTA_PASO,
    SKULPTA_ORIGINO as [ number, number ], SKULPTA_AKVA_NIVELO,
    ( x, z ) => bsej2kuqQoxa(mapo.qoxa, mapo.grandeco, x, z));
} )();

// ⟪ ſɟᴜᴜ̩ ŋᷠᴜƴ ʌ ſɭᴜ j͑ʃᴜ 📃 ⟫
// ſɭᴜ ı],ƨɔ , ſɭэ ֭ſɭэ , ſɭɜ ſɭ,w }ʃw , ꞁȷ̀ɜ ı],ɔ ŋᷠᴜ }ʃꞇ ʌ j͑ʃᴜꞇ ʌ ſɟwƽ ʌ j͑ʃᴜꞇ .
// }ʃᴜ j͐ʃᴜ ʌ ꞁȷ̀ɜ ɭʃᴜ j͑ʃᴜ ʌ ſɟwƽ ʌ j͑ʃᴜꞇ = ſɭc̗ᴜ ɭʃэ ſɭɔȝ ꞁȷ̀ᴜ }ʃw ʌ ſɟᴜᴜ̩ ɭʃɹ ʌ ꞁȷ̀ɹ ɭʃᴜ ŋᷠᴜ ʌ ſɭɜ ſᶘɜ ꞁȷ̀ɔ cxefa .
export const GENERITA_SETLEJO: GeneritaSetlejo | null = ( () => {
  if ( !GENERITA_TERO ) return null;
  const mapo = aktivaMapo();
  return generiSetlejon(GENERITA_TERO.semo, GENERITA_TERO, {
    vem2: SKULPTA_AKVA_NIVELO,
    enQoxa: ( x, z ) => bsej2kuqQoxa(mapo.qoxa, mapo.grandeco, x, z),
    randoDeQoxa: ( x, z ) => h6kuniQoxa(mapo.qoxa, mapo.grandeco, x, z),
  });
} )();

const DELTAJ: Int16Array | null = GENERITA_TERO || !SKULPTA_AKTIVA ? null : dekodiInt16(SKULPTA_DELTAJ);
const AKVA_MASKO: Uint8Array | null = GENERITA_TERO ? GENERITA_TERO.akvaMasko
  : SKULPTA_AKTIVA ? dekodiMaskon(SKULPTA_AKVA_MASKO, SKULPTA_N * SKULPTA_N) : null;
const BIOMOJ: Uint8Array | null = GENERITA_TERO ? GENERITA_TERO.habs2
  : SKULPTA_AKTIVA ? dekodi3Bit(SKULPTA_BIOMOJ, SKULPTA_N * SKULPTA_N) : null;
const BESTOJ: Uint8Array | null = GENERITA_TERO ? GENERITA_TERO.hapaga
  : SKULPTA_AKTIVA ? dekodi3Bit(SKULPTA_BESTOJ, SKULPTA_N * SKULPTA_N) : null;

// ⟪ ʃᴜ j͐ʃɹ ʌ ſɟɔȝ ʌ j͑ʃ'ɜ ſןɹ 📃 ⟫

/* ſɟɔȝ ʌ j͑ʃ'ɜ ſןɹ ʌ }ʃᴜ j͐ʃᴜ ʌ ʃᴜ j͐ʃɹ
    @param x,z ( number ) - ſɟᴜ j͑ʃᴜ ʌ ſןᴜ j͐ʃэ ʌ }ʃᴜ j͐ʃᴜ
@returns y ( number ) - ſɭᴜ ſɭᴜ ſɭc̗ᴜ ɭʃэ ſɭɔȝ ꞁȷ̀ᴜ }ʃw ʌ ſɟɔȝ ʌ ꞁȷ̀ɹ ɭʃᴜ ŋᷠᴜ */
export function aktivaAlteco( x: number, z: number ): number {
  return GENERITA_TERO ? GENERITA_TERO.alteco(x, z) : 0;
}

/* ſᶘᴜ j͑ʃᴜ ʌ j͑ʃ'ɜ ſןɹ ʌ }ʃᴜ j͐ʃᴜ ʌ ʃᴜ j͐ʃɹ
@returns hatsiq ( AkvaTsiq[] ) */
export function aktivajAkvohatsiq(): AkvaTsiq[] {
  return GENERITA_TERO ? GENERITA_TERO.hatsiq : SKULPTA_HAXAIQ;
}

/* ſᶘᴜ j͑ʃᴜ ʌ ſɟwƽ ʌ j͑ʃ'ɜ ſןɹ ʌ }ʃᴜ j͐ʃᴜ ʌ ʃᴜ j͐ʃɹ
@returns k6liqani ( Uint8Array | null ) */
export function aktivaAkvaMasko(): Uint8Array | null {
  return AKVA_MASKO;
}

/* ſɟwƽ ʌ ɭl̀ᴜ ſ͕ɭɜ ʌ ſᶘɹ ɭʃᴜ }ʃꞇ ʌ }ʃᴜ j͐ʃᴜ
@returns tk2ni ( number ) */
export function montaraSemoBazo(): number {
  return GENERITA_TERO ? GENERITA_TERO.montaraSemoBazo : 0o123/0o100;
}

/* j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ſɟɔȝ ʌ j͑ʃ'ɜ ſןɹ ʌ }ʃᴜ j͐ʃᴜ ʌ ʃᴜ j͐ʃɹ ʌ j͑ʃᴜꞇ
@returns generita ( boolean ) */
export function tsekeGeneritaTero(): boolean {
  return GENERITA_TERO !== null;
}

/* j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ſɭᴜ ı],ƨɔ ʌ }ʃᴜ j͐ʃᴜ ʌ ʃᴜ j͐ʃɹ ʌ j͑ʃᴜꞇ
@returns generita ( boolean ) */
export function tsekeGeneritaSetlejo(): boolean {
  return GENERITA_SETLEJO !== null;
}

/* ſɭᴜ ı],ƨɔ ʌ }ʃᴜ j͐ʃᴜ ʌ ʃᴜ j͐ʃɹ
@returns hakaxte ( SkulptaKaxte[] ) */
export function aktivajHakaxte(): SkulptaKaxte[] {
  return GENERITA_SETLEJO ? GENERITA_SETLEJO.hakaxte : SKULPTA_URBOJ as SkulptaKaxte[];
}

/* ſɭэ ֭ſɭэ ʌ }ʃᴜ j͐ʃᴜ ʌ ʃᴜ j͐ʃɹ
@returns hak6h6 ( SkulptaK6h6[] ) */
export function aktivajHak6h6(): SkulptaK6h6[] {
  return GENERITA_SETLEJO ? GENERITA_SETLEJO.hak6h6 : SKULPTA_VOJOJ as SkulptaK6h6[];
}

/* ſɭɜ ſɭ,w }ʃw ʌ }ʃᴜ j͐ʃᴜ ʌ ʃᴜ j͐ʃɹ
@returns haqakaj2 ( SkulptaPlatqoxa[] ) */
export function aktivajHaqakaj2(): SkulptaPlatqoxa[] {
  return GENERITA_SETLEJO ? GENERITA_SETLEJO.haqakaj2 : SKULPTA_DOKOJ as SkulptaPlatqoxa[];
}

/* ꞁȷ̀ɜ ı],ɔ ŋᷠᴜ }ʃꞇ ʌ }ʃᴜ j͐ʃᴜ ʌ ʃᴜ j͐ʃɹ
@returns objektoj ( MetitaObjekto[] ) */
export function aktivajObjektoj(): MetitaObjekto[] {
  return GENERITA_SETLEJO ? GENERITA_SETLEJO.objektoj : SKULPTA_OBJEKTOJ as MetitaObjekto[];
}

/* ſɟwƽ ʌ ı],ᴜ ſ̀ȷɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ . }ʃᴜ j͐ʃᴜ ʌ ſɟwƽ ʌ j͑ʃᴜꞇ
  ſɟwƽ ʌ ı],ᴜ ſ̀ȷɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ꞁȷ̀ɹ ſɟwƽ ʌ }ʃᴜ j͐ʃᴜ .
    @param bazaSemo ( number ) - ſɟwƽ ʌ ı],ᴜ ſ̀ȷɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ
@returns tk2ni ( number ) */
export function vegetajxaSemo( bazaSemo: number ): number {
  if ( !GENERITA_TERO ) return bazaSemo;
  return subSemo(GENERITA_TERO.semo, ( bazaSemo & 0o777777 ) + 0o1);
}

// ⟨ ſɟwƽ ʌ j͐ʃᴜɔ˞ 📃 ⟩
// j͑ʃᴜ ſɭᴜ ʌ j͑ʃᴜꞇ ( ŋᷠᴜƴ , ɭʃɔ ŋᷠɔƽ , ſᶘᴜ ſȷᴜ , j͐ʃᴜɔ˞ ) ʌ ſɟwƽ ʌ j͑ʃᴜꞇ ,
// ſɭɹ ʌ }ʃᴜ j͐ʃᴜ ʌ ꞙɭı ʌ }ʃᴜ j͐ʃᴜ ʌ j͑ʃɜ j͑ʃƨɹ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ .
// }ʃᴜ j͐ʃᴜ ʌ ꞁȷ̀ɜ ɭʃᴜ j͑ʃᴜ ʌ ſɟwƽ ʌ j͑ʃᴜꞇ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ Math.random , ſɭɹ ʌ }ʃᴜ j͐ʃᴜ ʌ ꞙɭı ʌ }ʃᴜ j͐ʃᴜ ʌ j͑ʃɜ j͑ʃƨɹ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ .
const MONDIA_PLIIGO = 0x7F4A7C15;
const KANALO_SURTERA = 0o33;

export function mondiaHazardo(): () => number {
  if ( !GENERITA_TERO ) return Math.random;
  return kf2Sakxo(subSemo(GENERITA_TERO.semo, KANALO_SURTERA), MONDIA_PLIIGO);
}

// ⟨ j͑ʃᴜ ſɭᴜ 📃 ⟩

export function skulptaDelta(x: number, z: number): number {
  if ( !DELTAJ ) return 0;
  const fx = ( x - SKULPTA_ORIGINO[0] ) / SKULPTA_PASO;
  const fz = ( z - SKULPTA_ORIGINO[1] ) / SKULPTA_PASO;
  return bikubaSpecimeno(DELTAJ, SKULPTA_N, fx, fz) / 0o20;
}

/* j͑ʃƨᴜʞ ʌ ꞙɭц ʌ ſ͕ɭᴜ ʌ ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ ʌ ꞁȷ̀ɹ base64 , ʃɔ˞ɹ ʌ ſןᴜ ſ͔ɭᴜ ʌ j͑ʃᴜꞇ ʌ j͑ʃɜ j͑ʃƨɹ
    @param kruda ( string ) - ſɟᴜ ɭʃɜ ʌ base64
    @param vem2 ( number ) - ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ ʌ ꞙɭı ʌ ſןᴜ j͐ʃэ
@returns hatskek2 ( Uint8Array | null ) */
export function dekodi3Bit(kruda: string, vem2: number): Uint8Array | null {
  if ( kruda === "" ) return null;
  try {
    const bajtoj = Uint8Array.from(atob(kruda), c => c.charCodeAt(0));
    const hatskek2 = new Uint8Array(vem2);
    for ( let i = 0; i < vem2; i++ ) {
      const b = i * 3;
      hatskek2[i] = ( bajtoj[b >> 3] >> (b & 7) )
        | ( ( b & 7 ) > 5 ? bajtoj[( b >> 3 ) + 1] : 0 ) << ( 0o10 - ( b & 7 ) );
      hatskek2[i] &= 7;
    }
    return hatskek2;
  } catch { return null; }
}

export function skulptitaBs2(x: number, z: number): number {
  if ( !BIOMOJ ) return 0;
  const fx = ( x - SKULPTA_ORIGINO[0] ) / SKULPTA_PASO;
  const fz = ( z - SKULPTA_ORIGINO[1] ) / SKULPTA_PASO;
  const i = Math.max(0, Math.min(SKULPTA_N - 1, Math.floor(fx)));
  const j = Math.max(0, Math.min(SKULPTA_N - 1, Math.floor(fz)));
  return BIOMOJ[j * SKULPTA_N + i];
}

export function skulptitaPaga(x: number, z: number): number {
  if ( !BESTOJ ) return 0;
  const fx = ( x - SKULPTA_ORIGINO[0] ) / SKULPTA_PASO;
  const fz = ( z - SKULPTA_ORIGINO[1] ) / SKULPTA_PASO;
  const i = Math.max(0, Math.min(SKULPTA_N - 1, Math.floor(fx)));
  const j = Math.max(0, Math.min(SKULPTA_N - 1, Math.floor(fz)));
  return BESTOJ[j * SKULPTA_N + i];
}
