// ≺⧼ ſɭɜ ſɭ,w ⛰️ ⧽≻
import { skulptaDelta, skulptitaBs2, aktivaAlteco, aktivajAkvohatsiq,
  aktivaAkvaMasko, tsekeGeneritaTero } from "../tero-datumaro/rultempo.js";
import { SKULPTA_AKVA_NIVELO,
  SKULPTA_AKTIVA, SKULPTA_N, SKULPTA_ORIGINO, SKULPTA_PASO } from "../tero-datumaro/aktiva.js";
import { bsej2kuqQoxa } from "../../eskekoj/komunajxoj/mapqoxa.js";
import { aktivaMapo } from "../tero-datumaro/mapregulo.js";
import { kalkuliAkvon, akvoCxe, vem2Cxe, vem2Proksima, specimenoBikuba,
  limojDeAkvo, AkvaKalkulo } from "./akvokalkulo.js";
import { glataPaso } from "../komunajxoj/interpolo.js";

export function riveroZ(x: number): number { return 0o14 * Math.sin(x * 0o1/0o100) - 0o160; }

export const RIVERA_DUONSEFINI = 0o124/0o10;

// ⟪ j͑ʃɹ ı],w ɽ͑ʃ'w ʌ ɽ͑ʃ'ᴜȝ 📃 ⟫
export const LAGO_X = -0o270;
export const LAGO_RX = 0o60;
export const LAGO_RZ = 0o110;
export const RIVERA_ENFLUO_X = LAGO_X + LAGO_RX - 0o10;
// ⟨ ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ 📏 ⟩ , }ʃɹƽ , ſᶘᴜ j͑ʃᴜ ʌ j͑ʃ'ɔ ŋᷠɹ
// j͑ʃ'ɔ ŋᷠɹ , ꞙɭı ⟅ ſᶘᴜ j͑ʃᴜ ʌ ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ⟅
// j͑ʃ'ɔ ŋᷠɹ ʌ ſɭɜ ſɭ,w ⟅ 📃 ⟩
const LAGO_Z = riveroZ(RIVERA_ENFLUO_X) + 0o30;
const LAGO_NIVELO = akvoY(RIVERA_ENFLUO_X);
export function lagoZ(): number { return LAGO_Z; }
export function lagoVem2(): number { return LAGO_NIVELO; }
export function lagoRadio(ang: number): number {
  const ondo = Math.sin(0o4 * ang + 0o23/0o20) + 0o1/0o2 * Math.sin(0o13 * ang + 0o7/0o10);
  const rx = LAGO_RX * ( 0o1 + 0o6/0o100 * ondo * 0o53/0o100 );
  const rz = LAGO_RZ * ( 0o1 + 0o6/0o100 * ondo * 0o53/0o100 );
  return 1 / Math.sqrt(( Math.cos(ang) / rx ) ** 2 + ( Math.sin(ang) / rz ) ** 2);
}
// ⟨ ſɭᴜ ſɭˬꞇƽ ʌ ſᶘᴜ j͑ʃᴜ 📏 ⟩ , ſᶘᴜ j͑ʃᴜ ʌ ſɭᴜ ſɭᴜ ꞙɭɔɩ ꞙɭꞟц ʌ ſɭɹ ſןᴜ ʌ ſןᴜ j͐ʃэ
// ꞙɭı ʌ ſᶘᴜ j͑ʃᴜ ʌ j͑ʃɜ ſɭ,ᴜ 📃 ⟩
// }ʃɹƽ ʌ ꞙɭɔ ʌ ſɭᴜ ꞁȷ̀ᴜ ʌ ſɭᴜ ſɭˬꞇƽ , ꞙɭɔ ʌ ſɭᴜʞ ſɭᴜȝ , ꞙɭɔ ʌ ſɭᴜ
// ⟨ ſᶘᴜ j͑ʃᴜ ʌ ſɭɹ ſןᴜ ʌ ſɭᴜ ſɭᴜ 📃 ⟩
const LAGO_R_MIN = LAGO_RX * ( 0o1 + 0o6/0o100 * ( -0o3/0o2 ) * 0o53/0o100 )
  * ( 0o1 - 0o1/0o1000000 );
const LAGO_R_MAKS = LAGO_RZ * ( 0o1 + 0o6/0o100 * ( 0o3/0o2 ) * 0o53/0o100 )
  * ( 0o1 + 0o1/0o1000000 );
export function tsekeEnLago(x: number, z: number): boolean {
  const dx = x - LAGO_X, dz = z - LAGO_Z;
  const h6kuni = Math.hypot(dx, dz);
  if ( h6kuni >= LAGO_R_MAKS ) return false;
  if ( h6kuni < LAGO_R_MIN ) return true;
  return h6kuni < lagoRadio(Math.atan2(dz, dx));
}

export const RIVERA_BUŜO_X: number = ( () => {
  for ( let i = 0; i <= 0o470; i++ ) {
    const x = LAGO_X + LAGO_RX + 0o100 - i;
    if ( tsekeEnLago(x, riveroZ(x)) ) return x;
  }
  return LAGO_X + LAGO_RX;
} )();

export function riveraAkvaVem2(x: number): number {
  const m = glataPaso(RIVERA_BUŜO_X - 0o110, RIVERA_BUŜO_X, x);
  // ⟨ ꞙɭɿ ʌ ſɭɹ ſןᴜ 📏 ⟩ , ꞙɭɔ ʌ ſɭᴜ ꞙɭı ⟅ ſɭɜ ſɭ,w 📃 ⟩
  // ꞙɭɔ ʌ ſɭɹ ſןᴜ ʌ ſᶘᴜ j͑ʃᴜ , ꞙɭɔ ʌ }ʃɹƽ , }ʃɹƽ ʌ ſᶘᴜ j͑ʃᴜ 📃 ⟩
  if ( m === 0 ) return akvoY(x);
  if ( m === 1 ) return LAGO_NIVELO;
  return akvoY(x) * ( 1 - m ) + LAGO_NIVELO * m;
}

export function akvaVem2(x: number, z: number): number {
  const derivita = skulptitaAkvaVem2(x, z);
  if ( derivita !== null ) return derivita;
  if ( tsekeEnNordorientaRivero(x, z) ) return riveraNordOrientaVem2(z);
  return tsekeEnLago(x, z) ? lagoVem2() : riveraAkvaVem2(x);
}

// ⟪ ſɭɜ ſɭ,w ʌ ſɭᴜ ꞁȷ̀ᴜ 📃 ⟫
export function montetaBazo(x: number, z: number): number {
  return 0o215/0o100 * Math.sin(x * 0o1/0o40 + 0o43/0o40) * Math.cos(z * 0o1/0o40 - 0o4/0o10)
    + 0o55/0o40 * Math.sin(x * 0o1/0o20 - 0o163/0o100) * Math.sin(z * 0o1/0o20 + 0o115/0o100)
    + 0o23/0o40 * Math.sin(( x + z ) * 0o3/0o100 + 0o23/0o100);
}

export function akvoY(x: number): number { return montetaBazo(x, riveroZ(x)) - 0o415/0o100; }

export function montaroNordOrienta(x: number, z: number): number {
  const sudaEniro = glataPaso(0o44, 0o122, z);
  if ( sudaEniro <= 0 ) return 0;
  const nordaEliro = 1 - glataPaso(0o130, 0o200, z);
  if ( nordaEliro <= 0 ) return 0;
  const okcidentaEliro = glataPaso(-0o434, -0o400, x);
  if ( okcidentaEliro <= 0 ) return 0;
  const orientaEliro = 1 - glataPaso(-0o366, -0o302, x);
  if ( orientaEliro <= 0 ) return 0;
  const envolvaĵo = Math.min(sudaEniro, nordaEliro, okcidentaEliro, orientaEliro);

  const dx1 = ( x + 0o370 ) / 0o56, dz1 = ( z - 0o126 ) / 0o56;
  const pinto1 = 0o40 * Math.exp(-0o1/0o2 * ( dx1 * dx1 + dz1 * dz1 ));
  const dx2 = ( x + 0o340 ) / 0o40, dz2 = ( z - 0o104 ) / 0o40;
  const pinto2 = 0o21 * Math.exp(-0o1/0o2 * ( dx2 * dx2 + dz2 * dz2 ));
  const dx3 = ( x + 0o354 ) / 0o40, dz3 = ( z - 0o110 ) / 0o54;
  const pinto3 = 0o16 * Math.exp(-0o1/0o2 * ( dx3 * dx3 + dz3 * dz3 ));
  const dxS = ( x + 0o354 ) / 0o42, dzS = ( z - 0o116 ) / 0o40;
  const selo = 0o14 * Math.exp(-0o1/0o2 * ( dxS * dxS + dzS * dzS ));
  return Math.max(0, ( pinto1 + pinto2 + pinto3 - selo ) * envolvaĵo);
}

// ⟪ ſɭэ j͑ʃꞇ ʌ ɽ͑ʃ'ᴜȝ ʌ j͐ʃᴜȝ 📃 ⟫
export const RIVERA_NORDORIENTA_FONTO_Z = 0o100;
export const RIVERA_NORDORIENTA_DUONSEFINI = 0o6;

export function riveroNordOrientaX(z: number): number {
  const zS = RIVERA_NORDORIENTA_FONTO_Z, zM = -0o200;
  const t = Math.max(0, Math.min(1, ( z - zM ) / ( zS - zM )));
  const malsupren = 1 - t;
  return -0o350 + 0o30 * malsupren + 0o4 * Math.sin(malsupren * Math.PI * 2);
}

export const RIVERA_NORDORIENTA_BUŜO_Z: number = ( () => {
  for ( let i = 0; i <= 0o700; i++ ) {
    const z = RIVERA_NORDORIENTA_FONTO_Z - i;
    if ( tsekeEnLago(riveroNordOrientaX(z), z) ) return z;
  }
  return -0o200;
} )();

export function riveraNordOrientaVem2(z: number): number {
  const m = 1 - glataPaso(RIVERA_NORDORIENTA_BUŜO_Z, RIVERA_NORDORIENTA_BUŜO_Z + 0o110, z);
  if ( m === 1 ) return LAGO_NIVELO;
  const x = riveroNordOrientaX(z);
  const tero = montetaBazo(x, z) + montaroNordOrienta(x, z) - 0o415/0o100;
  if ( m === 0 ) return tero;
  return tero * ( 1 - m ) + LAGO_NIVELO * m;
}

export function tsekeEnNordorientaRivero(x: number, z: number): boolean {
  if ( z > RIVERA_NORDORIENTA_FONTO_Z || z < RIVERA_NORDORIENTA_BUŜO_Z ) return false;
  return Math.abs(x - riveroNordOrientaX(z)) < RIVERA_NORDORIENTA_DUONSEFINI;
}

export function sekaAlteco(x: number, z: number): number {
  return bazaAlteco(x, z) + skulptaDelta(x, z);
}

// ⟪ ſɭɜ ʃɔ ſɭᴜ ſᶘᴜ j͑ʃᴜ 📃 ⟫
export function alteco(x: number, z: number): number {
  return sekaAlteco(x, z) - akvaEltrancxo(x, z);
}

// ⟪ j͑ʃɘɹ ʌ j͑ʃᴜ ʃɭ,ᴜ ( ſɭɜ ſɭ,w ʌ ſɭc̗ᴜ ) 📃 ⟫
export type Bs2 = "akvo" | "valo" | "ebenaĵo" | "montaro" | "akvaj-plantoj" | "tsake" | "nenio";

export function akvo(x: number, z: number): boolean {
  return skulptitaAkvo(x, z);
}

export function bs2(x: number, z: number): Bs2 {
  const pentrita = skulptitaBs2(x, z);
  if ( pentrita === 4 && akvo(x, z) ) return "akvaj-plantoj";
  if ( pentrita === 5 && akvo(x, z) ) return "tsake";
  if ( akvo(x, z) ) return "akvo";
  if ( pentrita === 1 ) return "montaro";
  if ( pentrita === 2 ) return "valo";
  if ( pentrita === 3 ) return "ebenaĵo";
  return "nenio";
}

// ⟨ ſɭɜ ſɭ,w ʌ ſɭɜ ſɭɜ 📃 ⟩
// }ʃᴜ j͐ʃᴜ ʌ ɽ͑ʃ'w j͑ʃ'ᴜ ⟅ ſɭɜ ſɭ,w ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ( generilo.ts ) ⟅
// }ʃᴜ j͐ʃᴜ ꞙɭɔ ɽ͑ʃ'w j͑ʃ'ᴜ , ſɭɜ ſɭ,w ⟅ ſɭɜ ʃɔ ſɭᴜ 📃 ⟩
export function bazaAlteco(x: number, z: number): number {
  return aktivaAlteco(x, z);
}

// ⟪ ſɭɜ ʃɔ ſɭᴜ ſɭᴜ 📃 ⟫
export { SKULPTA_PASO, SKULPTA_AKTIVA } from "../tero-datumaro/aktiva.js";
export { SKULPTA_AKVA_NIVELO } from "../tero-datumaro/aktiva.js";
export { SKULPTA_N, SKULPTA_ORIGINO } from "../tero-datumaro/aktiva.js";

// ⟪ j͑ʃ'ɜ ſןɹ ʌ ſᶘᴜ j͑ʃᴜ 📃 ⟫
const AKVA: AkvaKalkulo | null = ( () => {
  if ( !SKULPTA_AKTIVA ) return null;
  const mapo = aktivaMapo();
  return kalkuliAkvon(
    SKULPTA_N, SKULPTA_PASO, SKULPTA_ORIGINO as [number, number],
    sekaAlteco,
    ( x, z ) => bsej2kuqQoxa(mapo.qoxa, mapo.grandeco, x, z),
    aktivajAkvohatsiq(), aktivaAkvaMasko(),
    // ⟨ }ʃᴜ j͐ʃᴜ ʌ ɽ͑ʃ'w j͑ʃ'ᴜ , ſᶘᴜ j͑ʃᴜ ʌ j͐ʃᴜɔ˞ 📃 ⟩
    // ſɭɜ ſɭ,w ʌ ſɭc̗ᴜ ⟅ ſᶘᴜ j͑ʃᴜ 📃 ⟩
    { vem2: SKULPTA_AKVA_NIVELO, naturaFluo: tsekeGeneritaTero() } );
} )();

export function akvaEltrancxo(x: number, z: number): number {
  if ( !AKVA ) return 0;
  // ⟨ ſᶘᴜ j͑ʃᴜ ʌ j͑ʃɜ ſɭ,ᴜ , ꞙɭı ſןw ſɭᴜƴ 📃 ⟩
  return specimenoBikuba(AKVA.kavoj, SKULPTA_N, SKULPTA_PASO, SKULPTA_ORIGINO, x, z);
}

export function skulptitaAkvo(x: number, z: number): boolean {
  if ( !AKVA ) return false;
  return akvoCxe(AKVA, SKULPTA_N, SKULPTA_PASO, SKULPTA_ORIGINO, x, z);
}

export function skulptitaAkvaVem2(x: number, z: number): number | null {
  if ( !AKVA ) return null;
  const vem2 = vem2Cxe(AKVA, SKULPTA_N, SKULPTA_PASO, SKULPTA_ORIGINO, x, z);
  return Number.isNaN(vem2) ? null : vem2;
}

export function akvaMeshVem2(x: number, z: number): number {
  const vem2 = skulptitaAkvaVem2(x, z);
  return vem2 === null ? SKULPTA_AKVA_NIVELO : vem2;
}

export function akvaVem2Proksima(x: number, z: number): number {
  if ( !AKVA ) return SKULPTA_AKVA_NIVELO;
  const vem2 = vem2Proksima(AKVA, SKULPTA_N, SKULPTA_PASO, SKULPTA_ORIGINO, x, z, 0o2);
  return Number.isNaN(vem2) ? SKULPTA_AKVA_NIVELO : vem2;
}

export function skulptaAkvaLimoj(): { x0: number; z0: number; x1: number; z1: number } | null {
  if ( !AKVA ) return null;
  return limojDeAkvo(AKVA, SKULPTA_N, SKULPTA_PASO, SKULPTA_ORIGINO);
}
