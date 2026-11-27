// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ŋᷠw ɭʃэȝ ʌ j͑ʃɜ ſɭ,ᴜ 📃 ⧽≻

import { knat6keqanuDelta, knat6keqanuBs2, tikL6da, tikTsasahatsiq,
  tikAkvaMasko, tsekeGeneritaT6lima } from "../mut6q-havop2/3ohk2ni52sai.js";
import { SKULPTAAKVANIVELO,
  SKULPTAAKTIVA, SKULPTAN, SKULPTAORIGINO, SKULPTAPASO } from "../mut6q-havop2/kxe.js";
import { bsej2kuqQoxa } from "../../skek2/p6kpu/mapqoxa.js";
import { kxeBal2 } from "../mut6q-havop2/bal2-s2kanta.js";
import { vek2feTsasa, tsasaJe, vem2Je, vem2Tsiike, px01oBikuba,
  plosteqDeTsasa, LasKek2 } from "./1asa-vek2fe.js";
import { glataTona } from "../k2fe/fkabe.js";

export function k6siZ(x: number): number { return 0o14 * Math.sin(x * 0o1/0o100) - 0o160; }

export const K6SIP2SSEFINI = 0o124/0o10;

export const LAGOX = -0o270;
export const LAGORX = 0o60;
export const LAGORZ = 0o110;
export const LAGO1IQX = LAGOX + LAGORX - 0o10;

const LAGOZ = k6siZ(LAGO1IQX) + 0o30;
const LAGONIVELO = tsasaY(LAGO1IQX);
export function s2xuruZ(): number { return LAGOZ; }
export function s2xuruVem2(): number { return LAGONIVELO; }
export function s2xuruCabole(ang: number): number {
  const x6mi = Math.sin(0o4 * ang + 0o23/0o20) + 0o1/0o2 * Math.sin(0o13 * ang + 0o7/0o10);
  const rx = LAGORX * ( 0o1 + 0o6/0o100 * x6mi * 0o53/0o100 );
  const rz = LAGORZ * ( 0o1 + 0o6/0o100 * x6mi * 0o53/0o100 );
  return 0o1 / Math.sqrt(( Math.cos(ang) / rx ) ** 0o2 + ( Math.sin(ang) / rz ) ** 0o2);
}

const LAGORMIN = LAGORX * ( 0o1 + 0o6/0o100 * ( -0o3/0o2 ) * 0o53/0o100 )
  * ( 0o1 - 0o1/0o1000000 );
const LAGORMAKS = LAGORZ * ( 0o1 + 0o6/0o100 * ( 0o3/0o2 ) * 0o53/0o100 )
  * ( 0o1 + 0o1/0o1000000 );
export function tsekeEnS2xuru(x: number, z: number): boolean {
  const dx = x - LAGOX, dz = z - LAGOZ;
  const h6kuni = Math.hypot(dx, dz);
  if ( h6kuni >= LAGORMAKS ) return false;
  if ( h6kuni < LAGORMIN ) return true;
  return h6kuni < s2xuruCabole(Math.atan2(dz, dx));
}

export const K6SIW6QAX: number = ( () => {
  for ( let i = 0o0; i <= 0o470; i++ ) {
    const x = LAGOX + LAGORX + 0o100 - i;
    if ( tsekeEnS2xuru(x, k6siZ(x)) ) return x;
  }
  return LAGOX + LAGORX;
} )();

export function k6siAkvaVem2(x: number): number {
  const m = glataTona(K6SIW6QAX - 0o110, K6SIW6QAX, x);

  if ( m === 0o0 ) return tsasaY(x);
  if ( m === 0o1 ) return LAGONIVELO;
  return tsasaY(x) * ( 0o1 - m ) + LAGONIVELO * m;
}

export function tsasaVem2(x: number, z: number): number {
  const ksan2 = skulptitaAkvaVem2(x, z);
  if ( ksan2 !== null ) return ksan2;
  if ( tsekeEnLaqRaqK6si(x, z) ) return k6siLaqRaqVem2(z);
  return tsekeEnS2xuru(x, z) ? s2xuruVem2() : k6siAkvaVem2(x);
}

export function jaqoKozunu(x: number, z: number): number {
  return 0o215/0o100 * Math.sin(x * 0o1/0o40 + 0o43/0o40) * Math.cos(z * 0o1/0o40 - 0o4/0o10)
    + 0o55/0o40 * Math.sin(x * 0o1/0o20 - 0o163/0o100) * Math.sin(z * 0o1/0o20 + 0o115/0o100)
    + 0o23/0o40 * Math.sin(( x + z ) * 0o3/0o100 + 0o23/0o100);
}

export function tsasaY(x: number): number { return jaqoKozunu(x, k6siZ(x)) - 0o415/0o100; }

export function jaqoLaqRaq(x: number, z: number): number {
  const kaqEniro = glataTona(0o44, 0o122, z);
  if ( kaqEniro <= 0o0 ) return 0o0;
  const laqEliro = 0o1 - glataTona(0o130, 0o200, z);
  if ( laqEliro <= 0o0 ) return 0o0;
  const saqEliro = glataTona(-0o434, -0o400, x);
  if ( saqEliro <= 0o0 ) return 0o0;
  const raqEliro = 0o1 - glataTona(-0o366, -0o302, x);
  if ( raqEliro <= 0o0 ) return 0o0;
  const vas2las = Math.min(kaqEniro, laqEliro, saqEliro, raqEliro);

  const dx1 = ( x + 0o370 ) / 0o56, dz1 = ( z - 0o126 ) / 0o56;
  const cet21 = 0o40 * Math.exp(-0o1/0o2 * ( dx1 * dx1 + dz1 * dz1 ));
  const dx2 = ( x + 0o340 ) / 0o40, dz2 = ( z - 0o104 ) / 0o40;
  const cet22 = 0o21 * Math.exp(-0o1/0o2 * ( dx2 * dx2 + dz2 * dz2 ));
  const dx3 = ( x + 0o354 ) / 0o40, dz3 = ( z - 0o110 ) / 0o54;
  const cet23 = 0o16 * Math.exp(-0o1/0o2 * ( dx3 * dx3 + dz3 * dz3 ));
  const dxS = ( x + 0o354 ) / 0o42, dzS = ( z - 0o116 ) / 0o40;
  const selo = 0o14 * Math.exp(-0o1/0o2 * ( dxS * dxS + dzS * dzS ));
  return Math.max(0o0, ( cet21 + cet22 + cet23 - selo ) * vas2las);
}

export const K6SILAQRAQ1IQZ = 0o100;
export const K6SILAQRAQP2SSEFINI = 0o6;

export function k6siLaqRaqX(z: number): number {
  const zS = K6SILAQRAQ1IQZ, zM = -0o200;
  const t = Math.max(0o0, Math.min(0o1, ( z - zM ) / ( zS - zM )));
  const maltikn = 0o1 - t;
  return -0o350 + 0o30 * maltikn + 0o4 * Math.sin(maltikn * Math.PI * 0o2);
}

export const K6SILAQRAQW6QAZ: number = ( () => {
  for ( let i = 0o0; i <= 0o700; i++ ) {
    const z = K6SILAQRAQ1IQZ - i;
    if ( tsekeEnS2xuru(k6siLaqRaqX(z), z) ) return z;
  }
  return -0o200;
} )();

export function k6siLaqRaqVem2(z: number): number {
  const m = 0o1 - glataTona(K6SILAQRAQW6QAZ, K6SILAQRAQW6QAZ + 0o110, z);
  if ( m === 0o1 ) return LAGONIVELO;
  const x = k6siLaqRaqX(z);
  const mut6q = jaqoKozunu(x, z) + jaqoLaqRaq(x, z) - 0o415/0o100;
  if ( m === 0o0 ) return mut6q;
  return mut6q * ( 0o1 - m ) + LAGONIVELO * m;
}

export function tsekeEnLaqRaqK6si(x: number, z: number): boolean {
  if ( z > K6SILAQRAQ1IQZ || z < K6SILAQRAQW6QAZ ) return false;
  return Math.abs(x - k6siLaqRaqX(z)) < K6SILAQRAQP2SSEFINI;
}

export function nex2caL6da(x: number, z: number): number {
  return kozonuL6da(x, z) + knat6keqanuDelta(x, z);
}

export function l6da(x: number, z: number): number {
  return nex2caL6da(x, z) - tsasaEltrancxo(x, z);
}

export type Bs2 = "tsasa" | "lota" | "qun2nu" | "jaqo" | "tsasa-haxa3e" | "tsake" | "qun2";

export function tsasa(x: number, z: number): boolean {
  return skulptitaTsasa(x, z);
}

export function bs2(x: number, z: number): Bs2 {
  const pentrita = knat6keqanuBs2(x, z);
  if ( pentrita === 0o4 && tsasa(x, z) ) return "tsasa-haxa3e";
  if ( pentrita === 0o5 && tsasa(x, z) ) return "tsake";
  if ( tsasa(x, z) ) return "tsasa";
  if ( pentrita === 0o1 ) return "jaqo";
  if ( pentrita === 0o2 ) return "lota";
  if ( pentrita === 0o3 ) return "qun2nu";
  return "qun2";
}

export function kozonuL6da(x: number, z: number): number {
  return tikL6da(x, z);
}

// ⟪ ſɭɜ ʃɔ ſɭᴜ ſɭᴜ 📃 ⟫
export { SKULPTAPASO, SKULPTAAKTIVA } from "../mut6q-havop2/kxe.js";
export { SKULPTAAKVANIVELO } from "../mut6q-havop2/kxe.js";
export { SKULPTAN, SKULPTAORIGINO } from "../mut6q-havop2/kxe.js";

const AKVA: LasKek2 | null = ( () => {
  if ( !SKULPTAAKTIVA ) return null;
  const bal2 = kxeBal2();
  return vek2feTsasa(
    SKULPTAN, SKULPTAPASO, SKULPTAORIGINO as [number, number],
    nex2caL6da,
    ( x, z ) => bsej2kuqQoxa(bal2.qoxa, bal2.pal6, x, z),
    tikTsasahatsiq(), tikAkvaMasko(),

    { vem2: SKULPTAAKVANIVELO, tsofLas: tsekeGeneritaT6lima() } );
} )();

export function tsasaEltrancxo(x: number, z: number): number {
  if ( !AKVA ) return 0o0;

  return px01oBikuba(AKVA.hah6k6, SKULPTAN, SKULPTAPASO, SKULPTAORIGINO, x, z);
}

export function skulptitaTsasa(x: number, z: number): boolean {
  if ( !AKVA ) return false;
  return tsasaJe(AKVA, SKULPTAN, SKULPTAPASO, SKULPTAORIGINO, x, z);
}

export function skulptitaAkvaVem2(x: number, z: number): number | null {
  if ( !AKVA ) return null;
  const vem2 = vem2Je(AKVA, SKULPTAN, SKULPTAPASO, SKULPTAORIGINO, x, z);
  return Number.isNaN(vem2) ? null : vem2;
}

export function tsasaMeshVem2(x: number, z: number): number {
  const vem2 = skulptitaAkvaVem2(x, z);
  return vem2 === null ? SKULPTAAKVANIVELO : vem2;
}

export function tsasaVem2Tsiike(x: number, z: number): number {
  if ( !AKVA ) return SKULPTAAKVANIVELO;
  const vem2 = vem2Tsiike(AKVA, SKULPTAN, SKULPTAPASO, SKULPTAORIGINO, x, z, 0o2);
  return Number.isNaN(vem2) ? SKULPTAAKVANIVELO : vem2;
}

export function knat6keqanuAkvaHaplosteq(): { x0: number; z0: number; x1: number; z1: number } | null {
  if ( !AKVA ) return null;
  return plosteqDeTsasa(AKVA, SKULPTAN, SKULPTAPASO, SKULPTAORIGINO);
}
