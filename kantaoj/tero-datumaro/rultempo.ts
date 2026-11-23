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

// ⟪ ការឌិកូដ 📃 ⟫

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

// ⟪ ដីដែលបានបង្កើត 📃 ⟫
// ពិភពលោកដែលមានគ្រាប់ពូជបង្កើតដីខ្លួនឯង ( កម្ពស់ ទឹក ជីវតំបន់ សត្វ ប្រភពទឹក ) ។
// ពិភពលោកដែលគ្មានគ្រាប់ពូជប្រើដីដែលឆ្លាក់ដោយដៃក្នុងថត cxefa ។ ការអាន
// គ្រាប់ពូជប្រើបញ្ជីពិភពលោកនៃម៉ាស៊ីន ដូច្នេះពិភពលោកសកម្មត្រូវកំណត់រួចមុន ។
export const GENERITA_TERO: GeneritaTero | null = ( () => {
  const semoS2bana = aktivaSemo();
  if ( semoS2bana === "" ) return null;
  const mapo = aktivaMapo();
  return generiTeron(
    semoDeS2bana(semoS2bana), SKULPTA_N, SKULPTA_PASO,
    SKULPTA_ORIGINO as [ number, number ], SKULPTA_AKVA_NIVELO,
    ( x, z ) => bsej2kuqQoxa(mapo.qoxa, mapo.grandeco, x, z));
} )();

// ⟪ អ្វីដែលមនុស្សសាងសង់ 📃 ⟫
// ទីក្រុង ផ្លូវ ចំណត និងវត្ថុដាក់ក៏មកពីគ្រាប់ពូជដែរ ។ ពិភពលោកដែលគ្មាន
// គ្រាប់ពូជប្រើអ្វីដែលឆ្លាក់ដោយដៃក្នុងថត cxefa ។
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

// ⟪ ការនាំចេញរបស់ដីសកម្ម 📃 ⟫

/*កម្ពស់ធម្មជាតិនៃពិភពលោកសកម្ម
    @param x,z ( number ) - កូអរដោនេពិភពលោក
@returns y ( number ) - សូន្យសម្រាប់ដីដែលឆ្លាក់ដោយដៃ */
export function aktivaAlteco( x: number, z: number ): number {
  return GENERITA_TERO ? GENERITA_TERO.alteco(x, z) : 0;
}

/*ប្រភពទឹកនៃពិភពលោកសកម្ម
@returns hatsiq ( AkvaTsiq[] ) */
export function aktivajAkvohatsiq(): AkvaTsiq[] {
  return GENERITA_TERO ? GENERITA_TERO.hatsiq : SKULPTA_HAXAIQ;
}

/*គ្រាប់អាងទឹកនៃពិភពលោកសកម្ម
@returns k6liqani ( Uint8Array | null ) */
export function aktivaAkvaMasko(): Uint8Array | null {
  return AKVA_MASKO;
}

/*គ្រាប់ពូជរបស់ជួរភ្នំជុំវិញពិភពលោក
@returns tk2ni ( number ) */
export function montaraSemoBazo(): number {
  return GENERITA_TERO ? GENERITA_TERO.montaraSemoBazo : 0o123/0o100;
}

/*តើពិភពលោកសកម្មបង្កើតដីខ្លួនឯង
@returns generita ( boolean ) */
export function tsekeGeneritaTero(): boolean {
  return GENERITA_TERO !== null;
}

/*តើពិភពលោកសកម្មបង្កើតទីក្រុងខ្លួនឯង
@returns generita ( boolean ) */
export function tsekeGeneritaSetlejo(): boolean {
  return GENERITA_SETLEJO !== null;
}

/*ទីក្រុងនៃពិភពលោកសកម្ម
@returns hakaxte ( SkulptaKaxte[] ) */
export function aktivajHakaxte(): SkulptaKaxte[] {
  return GENERITA_SETLEJO ? GENERITA_SETLEJO.hakaxte : SKULPTA_URBOJ as SkulptaKaxte[];
}

/*ផ្លូវកម្រិតពិភពលោកនៃពិភពលោកសកម្ម
@returns hak6h6 ( SkulptaK6h6[] ) */
export function aktivajHak6h6(): SkulptaK6h6[] {
  return GENERITA_SETLEJO ? GENERITA_SETLEJO.hak6h6 : SKULPTA_VOJOJ as SkulptaK6h6[];
}

/*ចំណតនៃពិភពលោកសកម្ម
@returns haqakaj2 ( SkulptaPlatqoxa[] ) */
export function aktivajHaqakaj2(): SkulptaPlatqoxa[] {
  return GENERITA_SETLEJO ? GENERITA_SETLEJO.haqakaj2 : SKULPTA_DOKOJ as SkulptaPlatqoxa[];
}

/*វត្ថុដាក់នៃពិភពលោកសកម្ម
@returns objektoj ( MetitaObjekto[] ) */
export function aktivajObjektoj(): MetitaObjekto[] {
  return GENERITA_SETLEJO ? GENERITA_SETLEJO.objektoj : SKULPTA_OBJEKTOJ as MetitaObjekto[];
}

/*គ្រាប់ពូជនៃការរាយរុក្ខជាតិ ។ ក្នុងពិភពលោកដែលមានគ្រាប់ពូជ គ្រាប់ពូជ
  ដើមត្រូវបានលាយជាមួយគ្រាប់ពូជរបស់ពិភពលោក ។
    @param bazaSemo ( number ) - គ្រាប់ពូជដើមរបស់រុក្ខជាតិ
@returns tk2ni ( number ) */
export function vegetajxaSemo( bazaSemo: number ): number {
  if ( !GENERITA_TERO ) return bazaSemo;
  return subSemo(GENERITA_TERO.semo, ( bazaSemo & 0o777777 ) + 0o1);
}

// ⟨ ស្ទ្រីមចៃដន្យដែលនៅសល់ 📃 ⟩
// អ្វីដែលសល់ ( មនុស្ស , ផេត្រេល , ព្រិល ប្រភពចលនា ) ក៏មកពីគ្រាប់ពូជដែរ ,
// ដូច្នេះពិភពលោកតែមួយផ្ដល់រូបរាងតែមួយរាល់ដង ។ ពិភពលោកដែលគ្មានគ្រាប់ពូជ
// ប្រើ Math.random ដូចមុន ។ ហៅម្តងហើយចែកមុខងារដែលបានត្រឡប់ទៅអ្នកហៅ ។
const MONDIA_PLIIGO = 0x7F4A7C15;
const KANALO_SURTERA = 0o33;

export function mondiaHazardo(): () => number {
  if ( !GENERITA_TERO ) return Math.random;
  return kf2Sakxo(subSemo(GENERITA_TERO.semo, KANALO_SURTERA), MONDIA_PLIIGO);
}

// ⟨ អនុគមន៍គំរូ 📃 ⟩

export function skulptaDelta(x: number, z: number): number {
  if ( !DELTAJ ) return 0;
  const fx = ( x - SKULPTA_ORIGINO[0] ) / SKULPTA_PASO;
  const fz = ( z - SKULPTA_ORIGINO[1] ) / SKULPTA_PASO;
  return bikubaSpecimeno(DELTAJ, SKULPTA_N, fx, fz) / 0o20;
}

/*ឌិកូដតម្លៃ 3 ប៊ីតក្នុងមួយក្រឡា ពី base64 ៖ ជីវតំបន់ និងសត្វប្រើទ្រង់ទ្រាយតែមួយ
    @param kruda ( string ) - ខ្សែ base64
    @param vem2 ( number ) - ចំនួនក្រឡា
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
