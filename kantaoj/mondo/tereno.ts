// ≺⧼ ដី ⛰️ ⧽≻
import { skulptaDelta, dekodiMaskon, skulptitaBiomo } from "../tero-datumaro/rultempo.js";
import { SKULPTA_AKVA_NIVELO, SKULPTA_AKVA_MASKO, SKULPTA_AKVOFONTOJ,
  SKULPTA_AKTIVA, SKULPTA_N, SKULPTA_ORIGINO, SKULPTA_PASO } from "../tero-datumaro/aktiva.js";
import { cxuEnFormo } from "../../eskekoj/komunajxoj/mapformo.js";
import { aktivaMapo } from "../tero-datumaro/mapregulo.js";
import { kalkuliAkvon, akvoCxe, niveloCxe, niveloProksima, specimenoBikuba,
  limojDeAkvo, AkvaKalkulo } from "./akvokalkulo.js";

export function riveroZ(x: number): number { return 0o14 * Math.sin(x * 0o1/0o100) - 0o160; }

export const RIVERA_DUONLARĜO = 0o124/0o10;

// ⟪ បឹងខាងកើត 📃 ⟫
export const LAGO_X = -0o270;
export const LAGO_RX = 0o60;
export const LAGO_RZ = 0o110;
export const RIVERA_ENFLUO_X = LAGO_X + LAGO_RX - 0o10;
export function lagoZ(): number { return riveroZ(RIVERA_ENFLUO_X) + 0o30; }
export function lagoNivelo(): number { return akvoY(RIVERA_ENFLUO_X); }
export function lagoRadio(ang: number): number {
  const ondo = Math.sin(0o4 * ang + 0o23/0o20) + 0o1/0o2 * Math.sin(0o13 * ang + 0o7/0o10);
  const rx = LAGO_RX * ( 0o1 + 0o6/0o100 * ondo * 0o53/0o100 );
  const rz = LAGO_RZ * ( 0o1 + 0o6/0o100 * ondo * 0o53/0o100 );
  return 1 / Math.sqrt(( Math.cos(ang) / rx ) ** 2 + ( Math.sin(ang) / rz ) ** 2);
}
export function cxuEnLago(x: number, z: number): boolean {
  const ang = Math.atan2(z - lagoZ(), x - LAGO_X);
  return Math.hypot(x - LAGO_X, z - lagoZ()) < lagoRadio(ang);
}

export const RIVERA_BUŜO_X: number = ( () => {
  for ( let i = 0; i <= 0o470; i++ ) {
    const x = LAGO_X + LAGO_RX + 0o100 - i;
    if ( cxuEnLago(x, riveroZ(x)) ) return x;
  }
  return LAGO_X + LAGO_RX;
} )();

export function riveraAkvaNivelo(x: number): number {
  const m = glataPaso(RIVERA_BUŜO_X - 0o110, RIVERA_BUŜO_X, x);
  return akvoY(x) * ( 1 - m ) + lagoNivelo() * m;
}

export function akvaNivelo(x: number, z: number): number {
  const derivita = skulptitaAkvaNivelo(x, z);
  if ( derivita !== null ) return derivita;
  if ( cxuEnNordorientaRivero(x, z) ) return riveraNordOrientaNivelo(z);
  return cxuEnLago(x, z) ? lagoNivelo() : riveraAkvaNivelo(x);
}

// ⟪ ដីមូលដ្ឋាន 📃 ⟫
export function montetaBazo(x: number, z: number): number {
  return 0o215/0o100 * Math.sin(x * 0o1/0o40 + 0o43/0o40) * Math.cos(z * 0o1/0o40 - 0o4/0o10)
    + 0o55/0o40 * Math.sin(x * 0o1/0o20 - 0o163/0o100) * Math.sin(z * 0o1/0o20 + 0o115/0o100)
    + 0o23/0o40 * Math.sin(( x + z ) * 0o3/0o100 + 0o23/0o100);
}

export function akvoY(x: number): number { return montetaBazo(x, riveroZ(x)) - 0o415/0o100; }

export function glataPaso(lo: number, hi: number, v: number): number {
  const t = Math.max(0, Math.min(1, ( v - lo ) / ( hi - lo )));
  return t * t * ( 3 - 2 * t );
}

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

// ⟪ ទន្លេភាគឦសាន 📃 ⟫
export const RIVERA_NORDORIENTA_FONTO_Z = 0o100;
export const RIVERA_NORDORIENTA_DUONLARĜO = 0o6;

export function riveroNordOrientaX(z: number): number {
  const zS = RIVERA_NORDORIENTA_FONTO_Z, zM = -0o200;
  const t = Math.max(0, Math.min(1, ( z - zM ) / ( zS - zM )));
  const malsupren = 1 - t;
  return -0o350 + 0o30 * malsupren + 0o4 * Math.sin(malsupren * Math.PI * 2);
}

export const RIVERA_NORDORIENTA_BUŜO_Z: number = ( () => {
  for ( let i = 0; i <= 0o700; i++ ) {
    const z = RIVERA_NORDORIENTA_FONTO_Z - i;
    if ( cxuEnLago(riveroNordOrientaX(z), z) ) return z;
  }
  return -0o200;
} )();

export function riveraNordOrientaNivelo(z: number): number {
  const x = riveroNordOrientaX(z);
  const tero = montetaBazo(x, z) + montaroNordOrienta(x, z);
  const m = 1 - glataPaso(RIVERA_NORDORIENTA_BUŜO_Z, RIVERA_NORDORIENTA_BUŜO_Z + 0o110, z);
  return ( tero - 0o415/0o100 ) * ( 1 - m ) + lagoNivelo() * m;
}

export function cxuEnNordorientaRivero(x: number, z: number): boolean {
  if ( z > RIVERA_NORDORIENTA_FONTO_Z || z < RIVERA_NORDORIENTA_BUŜO_Z ) return false;
  return Math.abs(x - riveroNordOrientaX(z)) < RIVERA_NORDORIENTA_DUONLARĜO;
}

export function sekaAlteco(x: number, z: number): number {
  return bazaAlteco(x, z) + skulptaDelta(x, z);
}

// ⟪ ការកាត់ទឹកចេញ 📃 ⟫
export function alteco(x: number, z: number): number {
  return sekaAlteco(x, z) - akvaEltrancxo(x, z);
}

// ⟪ ជីវតំបន់ ( តំបន់ដាំនៃដីឆ្លាក់ ) 📃 ⟫
export type Biomo = "akvo" | "valo" | "ebenaĵo" | "montaro" | "akvaj-plantoj" | "ekvizeto" | "nenio";

export function akvo(x: number, z: number): boolean {
  return skulptitaAkvo(x, z);
}

export function biomo(x: number, z: number): Biomo {
  const pentrita = skulptitaBiomo(x, z);
  if ( pentrita === 4 && akvo(x, z) ) return "akvaj-plantoj";
  if ( pentrita === 5 && akvo(x, z) ) return "ekvizeto";
  if ( akvo(x, z) ) return "akvo";
  if ( pentrita === 1 ) return "montaro";
  if ( pentrita === 2 ) return "valo";
  if ( pentrita === 3 ) return "ebenaĵo";
  return "nenio";
}

export function bazaAlteco(_x: number, _z: number): number {
  return 0;
}

// ⟪ ការនាំចេញឡើងវិញ 📃 ⟫
export { SKULPTA_PASO, SKULPTA_AKTIVA } from "../tero-datumaro/aktiva.js";
export { SKULPTA_AKVA_NIVELO } from "../tero-datumaro/aktiva.js";
export { SKULPTA_N, SKULPTA_ORIGINO } from "../tero-datumaro/aktiva.js";

// ⟪ ការគណនាទឹក 📃 ⟫
const AKVA: AkvaKalkulo | null = ( () => {
  if ( !SKULPTA_AKTIVA ) return null;
  const mapo = aktivaMapo();
  const semoj = dekodiMaskon(SKULPTA_AKVA_MASKO, SKULPTA_N * SKULPTA_N);
  return kalkuliAkvon(
    SKULPTA_N, SKULPTA_PASO, SKULPTA_ORIGINO as [number, number],
    sekaAlteco,
    ( x, z ) => cxuEnFormo(mapo.formo, mapo.grandeco, x, z),
    SKULPTA_AKVOFONTOJ, semoj,
    { nivelo: SKULPTA_AKVA_NIVELO } );
} )();

export function akvaEltrancxo(x: number, z: number): number {
  if ( !AKVA ) return 0;
  // ⟨ ចង្អូរទឹករលូន ដើម្បីកុំឱ្យច្រាំងកាត់ជ្រុង 📃 ⟩
  return specimenoBikuba(AKVA.kavoj, SKULPTA_N, SKULPTA_PASO, SKULPTA_ORIGINO, x, z);
}

export function skulptitaAkvo(x: number, z: number): boolean {
  if ( !AKVA ) return false;
  return akvoCxe(AKVA, SKULPTA_N, SKULPTA_PASO, SKULPTA_ORIGINO, x, z);
}

export function skulptitaAkvaNivelo(x: number, z: number): number | null {
  if ( !AKVA ) return null;
  const nivelo = niveloCxe(AKVA, SKULPTA_N, SKULPTA_PASO, SKULPTA_ORIGINO, x, z);
  return Number.isNaN(nivelo) ? null : nivelo;
}

export function akvaMeshNivelo(x: number, z: number): number {
  const nivelo = skulptitaAkvaNivelo(x, z);
  return nivelo === null ? SKULPTA_AKVA_NIVELO : nivelo;
}

export function akvaNiveloProksima(x: number, z: number): number {
  if ( !AKVA ) return SKULPTA_AKVA_NIVELO;
  const nivelo = niveloProksima(AKVA, SKULPTA_N, SKULPTA_PASO, SKULPTA_ORIGINO, x, z, 0o2);
  return Number.isNaN(nivelo) ? SKULPTA_AKVA_NIVELO : nivelo;
}

export function skulptaAkvaLimoj(): { x0: number; z0: number; x1: number; z1: number } | null {
  if ( !AKVA ) return null;
  return limojDeAkvo(AKVA, SKULPTA_N, SKULPTA_PASO, SKULPTA_ORIGINO);
}
