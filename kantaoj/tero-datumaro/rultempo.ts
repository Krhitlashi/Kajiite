// ≺⧼ ពេលរត់ឆ្លាក់ 📃 ⧽≻

import { SKULPTA_PASO, SKULPTA_N, SKULPTA_ORIGINO, SKULPTA_AKTIVA, SKULPTA_DELTAJ,
  SKULPTA_AKVA_MASKO, SKULPTA_AKVA_NIVELO, SKULPTA_AKVOFONTOJ,
  SKULPTA_BIOMOJ, SKULPTA_BESTOJ } from "./aktiva.js";
import { katmullRom } from "../komunajxoj/interpolo.js";
import { kreiHazardanGenerilon } from "../../eskekoj/komunajxoj/hazardo.js";
import { cxuEnFormo, distancoDeFormo } from "../../eskekoj/komunajxoj/mapformo.js";
import { aktivaMapo } from "./mapregulo.js";
import { aktivaSemo } from "../fasado/mondoj.js";
import { semoDeTeksto, subSemo } from "../mondo/semo.js";
import { generiTeron, type GeneritaTero } from "../mondo/generilo.js";
import { generiSetlejon, type GeneritaSetlejo } from "../mondo/setlejo.js";
import { SKULPTA_OBJEKTOJ, SKULPTA_URBOJ, SKULPTA_VOJOJ,
  SKULPTA_DOKOJ } from "./aktiva.js";
import type { SkulptaUrbo, SkulptaVojo, SkulptaPlatformo,
  MetitaObjekto } from "../mondo/urbo/tipoj.js";
import type { AkvaFonto } from "../mondo/akvokalkulo.js";

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

export function dekodiMaskon(kruda: string, kvanto: number): Uint8Array | null {
  if ( kruda === "" ) return null;
  try {
    const bajtoj = Uint8Array.from(atob(kruda), c => c.charCodeAt(0));
    const masko = new Uint8Array(kvanto);
    for ( let i = 0; i < kvanto; i++ ) masko[i] = ( bajtoj[i >> 3] >> (i & 7) ) & 1;
    return masko;
  } catch { return null; }
}

// ⟪ ដីដែលបានបង្កើត 📃 ⟫
// ពិភពលោកដែលមានគ្រាប់ពូជបង្កើតដីខ្លួនឯង ( កម្ពស់ ទឹក ជីវតំបន់ សត្វ ប្រភពទឹក ) ។
// ពិភពលោកដែលគ្មានគ្រាប់ពូជប្រើដីដែលឆ្លាក់ដោយដៃក្នុងថត cxefa ។ ការអាន
// គ្រាប់ពូជប្រើបញ្ជីពិភពលោកនៃម៉ាស៊ីន ដូច្នេះពិភពលោកសកម្មត្រូវកំណត់រួចមុន ។
export const GENERITA_TERO: GeneritaTero | null = ( () => {
  const semoTeksto = aktivaSemo();
  if ( semoTeksto === "" ) return null;
  const mapo = aktivaMapo();
  return generiTeron(
    semoDeTeksto(semoTeksto), SKULPTA_N, SKULPTA_PASO,
    SKULPTA_ORIGINO as [ number, number ], SKULPTA_AKVA_NIVELO,
    ( x, z ) => cxuEnFormo(mapo.formo, mapo.grandeco, x, z));
} )();

// ⟪ អ្វីដែលមនុស្សសាងសង់ 📃 ⟫
// ទីក្រុង ផ្លូវ ចំណត និងវត្ថុដាក់ក៏មកពីគ្រាប់ពូជដែរ ។ ពិភពលោកដែលគ្មាន
// គ្រាប់ពូជប្រើអ្វីដែលឆ្លាក់ដោយដៃក្នុងថត cxefa ។
export const GENERITA_SETLEJO: GeneritaSetlejo | null = ( () => {
  if ( !GENERITA_TERO ) return null;
  const mapo = aktivaMapo();
  return generiSetlejon(GENERITA_TERO.semo, GENERITA_TERO, {
    nivelo: SKULPTA_AKVA_NIVELO,
    enFormo: ( x, z ) => cxuEnFormo(mapo.formo, mapo.grandeco, x, z),
    randoDeFormo: ( x, z ) => distancoDeFormo(mapo.formo, mapo.grandeco, x, z),
  });
} )();

const DELTAJ: Int16Array | null = GENERITA_TERO || !SKULPTA_AKTIVA ? null : dekodiInt16(SKULPTA_DELTAJ);
const AKVA_MASKO: Uint8Array | null = GENERITA_TERO ? GENERITA_TERO.akvaMasko
  : SKULPTA_AKTIVA ? dekodiMaskon(SKULPTA_AKVA_MASKO, SKULPTA_N * SKULPTA_N) : null;
const BIOMOJ: Uint8Array | null = GENERITA_TERO ? GENERITA_TERO.biomoj
  : SKULPTA_AKTIVA ? dekodiBiomon(SKULPTA_BIOMOJ, SKULPTA_N * SKULPTA_N) : null;
const BESTOJ: Uint8Array | null = GENERITA_TERO ? GENERITA_TERO.bestoj
  : SKULPTA_AKTIVA ? dekodiBestojn(SKULPTA_BESTOJ, SKULPTA_N * SKULPTA_N) : null;

// ⟪ ការនាំចេញរបស់ដីសកម្ម 📃 ⟫

/*កម្ពស់ធម្មជាតិនៃពិភពលោកសកម្ម
    @param x,z ( number ) - កូអរដោនេពិភពលោក
@returns y ( number ) - សូន្យសម្រាប់ដីដែលឆ្លាក់ដោយដៃ */
export function aktivaAlteco( x: number, z: number ): number {
  return GENERITA_TERO ? GENERITA_TERO.alteco(x, z) : 0;
}

/*ប្រភពទឹកនៃពិភពលោកសកម្ម
@returns fontoj ( AkvaFonto[] ) */
export function aktivajAkvofontoj(): AkvaFonto[] {
  return GENERITA_TERO ? GENERITA_TERO.fontoj : SKULPTA_AKVOFONTOJ;
}

/*គ្រាប់អាងទឹកនៃពិភពលោកសកម្ម
@returns masko ( Uint8Array | null ) */
export function aktivaAkvaMasko(): Uint8Array | null {
  return AKVA_MASKO;
}

/*គ្រាប់ពូជរបស់ជួរភ្នំជុំវិញពិភពលោក
@returns semo ( number ) */
export function montaraSemoBazo(): number {
  return GENERITA_TERO ? GENERITA_TERO.montaraSemoBazo : 0o123/0o100;
}

/*តើពិភពលោកសកម្មបង្កើតដីខ្លួនឯង
@returns generita ( boolean ) */
export function cxuGeneritaTero(): boolean {
  return GENERITA_TERO !== null;
}

/*តើពិភពលោកសកម្មបង្កើតទីក្រុងខ្លួនឯង
@returns generita ( boolean ) */
export function cxuGeneritaSetlejo(): boolean {
  return GENERITA_SETLEJO !== null;
}

/*ទីក្រុងនៃពិភពលោកសកម្ម
@returns urboj ( SkulptaUrbo[] ) */
export function aktivajUrboj(): SkulptaUrbo[] {
  return GENERITA_SETLEJO ? GENERITA_SETLEJO.urboj : SKULPTA_URBOJ as SkulptaUrbo[];
}

/*ផ្លូវកម្រិតពិភពលោកនៃពិភពលោកសកម្ម
@returns vojoj ( SkulptaVojo[] ) */
export function aktivajVojoj(): SkulptaVojo[] {
  return GENERITA_SETLEJO ? GENERITA_SETLEJO.vojoj : SKULPTA_VOJOJ as SkulptaVojo[];
}

/*ចំណតនៃពិភពលោកសកម្ម
@returns dokoj ( SkulptaPlatformo[] ) */
export function aktivajDokoj(): SkulptaPlatformo[] {
  return GENERITA_SETLEJO ? GENERITA_SETLEJO.dokoj : SKULPTA_DOKOJ as SkulptaPlatformo[];
}

/*វត្ថុដាក់នៃពិភពលោកសកម្ម
@returns objektoj ( MetitaObjekto[] ) */
export function aktivajObjektoj(): MetitaObjekto[] {
  return GENERITA_SETLEJO ? GENERITA_SETLEJO.objektoj : SKULPTA_OBJEKTOJ as MetitaObjekto[];
}

/*គ្រាប់ពូជនៃការរាយរុក្ខជាតិ ។ ក្នុងពិភពលោកដែលមានគ្រាប់ពូជ គ្រាប់ពូជ
  ដើមត្រូវបានលាយជាមួយគ្រាប់ពូជរបស់ពិភពលោក ។
    @param bazaSemo ( number ) - គ្រាប់ពូជដើមរបស់រុក្ខជាតិ
@returns semo ( number ) */
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
  return kreiHazardanGenerilon(subSemo(GENERITA_TERO.semo, KANALO_SURTERA), MONDIA_PLIIGO);
}

function valoroDelto(i: number, j: number): number {
  const ii = Math.max(0, Math.min(SKULPTA_N - 1, i));
  const jj = Math.max(0, Math.min(SKULPTA_N - 1, j));
  return DELTAJ![jj * SKULPTA_N + ii];
}

function valoroMasko(i: number, j: number): number {
  const ii = Math.max(0, Math.min(SKULPTA_N - 1, i));
  const jj = Math.max(0, Math.min(SKULPTA_N - 1, j));
  return AKVA_MASKO![jj * SKULPTA_N + ii];
}

// ⟨ អនុគមន៍គំរូ 📃 ⟩

export function skulptaDelta(x: number, z: number): number {
  if ( !DELTAJ ) return 0;
  const fx = ( x - SKULPTA_ORIGINO[0] ) / SKULPTA_PASO;
  const fz = ( z - SKULPTA_ORIGINO[1] ) / SKULPTA_PASO;
  const i0 = Math.floor(fx), j0 = Math.floor(fz);
  const u = fx - i0, v = fz - j0;
  const vico = ( j: number ) => katmullRom(
    valoroDelto(i0 - 1, j), valoroDelto(i0, j), valoroDelto(i0 + 1, j), valoroDelto(i0 + 2, j), u);
  const m = katmullRom(vico(j0 - 1), vico(j0), vico(j0 + 1), vico(j0 + 2), v);
  return m / 0o20;
}

export function skulptitaAkvo(x: number, z: number): boolean {
  if ( !AKVA_MASKO ) return false;
  const fx = ( x - SKULPTA_ORIGINO[0] ) / SKULPTA_PASO;
  const fz = ( z - SKULPTA_ORIGINO[1] ) / SKULPTA_PASO;
  const i0 = Math.floor(fx), j0 = Math.floor(fz);
  const u = fx - i0, v = fz - j0;
  const i1 = i0 + 1, j1 = j0 + 1;
  const m = valoroMasko(i0, j0) * ( 1 - u ) * ( 1 - v )
    + valoroMasko(i1, j0) * u * ( 1 - v )
    + valoroMasko(i0, j1) * ( 1 - u ) * v
    + valoroMasko(i1, j1) * u * v;
  return m >= 0o1/0o2;
}

export function skulptaAkvaLimoj(): { x0: number; z0: number; x1: number; z1: number } | null {
  if ( !AKVA_MASKO ) return null;
  let imin = SKULPTA_N, imax = -1, jmin = SKULPTA_N, jmax = -1;
  for ( let j = 0; j < SKULPTA_N; j++ ) {
    for ( let i = 0; i < SKULPTA_N; i++ ) {
      if ( AKVA_MASKO[j * SKULPTA_N + i] === 1 ) {
        if ( i < imin ) imin = i;
        if ( i > imax ) imax = i;
        if ( j < jmin ) jmin = j;
        if ( j > jmax ) jmax = j;
      }
    }
  }
  if ( imax < 0 ) return null;
  const libero = 0o2;
  return {
    x0: SKULPTA_ORIGINO[0] + ( imin - libero ) * SKULPTA_PASO,
    z0: SKULPTA_ORIGINO[1] + ( jmin - libero ) * SKULPTA_PASO,
    x1: SKULPTA_ORIGINO[0] + ( imax + 1 + libero ) * SKULPTA_PASO,
    z1: SKULPTA_ORIGINO[1] + ( jmax + 1 + libero ) * SKULPTA_PASO,
  };
}

export function dekodiBiomon(kruda: string, kvanto: number): Uint8Array | null {
  if ( kruda === "" ) return null;
  try {
    const bajtoj = Uint8Array.from(atob(kruda), c => c.charCodeAt(0));
    const biomo = new Uint8Array(kvanto);
    for ( let i = 0; i < kvanto; i++ ) {
      const b = i * 3;
      biomo[i] = ( bajtoj[b >> 3] >> (b & 7) )
        | ( ( b & 7 ) > 5 ? bajtoj[( b >> 3 ) + 1] : 0 ) << ( 0o10 - ( b & 7 ) );
      biomo[i] &= 7;
    }
    return biomo;
  } catch { return null; }
}

export function dekodiBestojn(kruda: string, kvanto: number): Uint8Array | null {
  if ( kruda === "" ) return null;
  try {
    const bajtoj = Uint8Array.from(atob(kruda), c => c.charCodeAt(0));
    const bestoj = new Uint8Array(kvanto);
    for ( let i = 0; i < kvanto; i++ ) {
      const b = i * 3;
      bestoj[i] = ( bajtoj[b >> 3] >> (b & 7) )
        | ( ( b & 7 ) > 5 ? bajtoj[( b >> 3 ) + 1] : 0 ) << ( 0o10 - ( b & 7 ) );
      bestoj[i] &= 7;
    }
    return bestoj;
  } catch { return null; }
}

export function skulptitaBiomo(x: number, z: number): number {
  if ( !BIOMOJ ) return 0;
  const fx = ( x - SKULPTA_ORIGINO[0] ) / SKULPTA_PASO;
  const fz = ( z - SKULPTA_ORIGINO[1] ) / SKULPTA_PASO;
  const i = Math.max(0, Math.min(SKULPTA_N - 1, Math.floor(fx)));
  const j = Math.max(0, Math.min(SKULPTA_N - 1, Math.floor(fz)));
  return BIOMOJ[j * SKULPTA_N + i];
}

export function skulptitaBesto(x: number, z: number): number {
  if ( !BESTOJ ) return 0;
  const fx = ( x - SKULPTA_ORIGINO[0] ) / SKULPTA_PASO;
  const fz = ( z - SKULPTA_ORIGINO[1] ) / SKULPTA_PASO;
  const i = Math.max(0, Math.min(SKULPTA_N - 1, Math.floor(fx)));
  const j = Math.max(0, Math.min(SKULPTA_N - 1, Math.floor(fz)));
  return BESTOJ[j * SKULPTA_N + i];
}
