// ≺⧼ ſɭɜ ſɭ,w ⛰️ ⧽≻
import { knat6keqanuDelta, skulptitaBs2, tikL6da, tikTsasahatsiq,
  tikAkvaMasko, tsekeGeneritaT6lima } from "../t6lima-havop2/tlohk2nikziisai.js";
import { SKULPTAAKVANIVELO,
  SKULPTAAKTIVA, SKULPTAN, SKULPTAORIGINO, SKULPTAPASO } from "../t6lima-havop2/tik.js";
import { bsej2kuqQoxa } from "../../skek2/x2x2q/mapqoxa.js";
import { tikBal2 } from "../t6lima-havop2/mapregulo.js";
import { vek2feTsasa, tsasaJe, vem2Je, vem2Tsiike, px01oBikuba,
  plosteqDeTsasa, AkvaKek2 } from "./tsasaVek2fe.js";
import { glataTona } from "../x2x2q/interpolo.js";

export function k6siZ(x: number): number { return 0o14 * Math.sin(x * 0o1/0o100) - 0o160; }

export const RIVERADUONSEFINI = 0o124/0o10;

// ⟪ j͑ʃɹ ı],w ɽ͑ʃ'w ʌ ɽ͑ʃ'ᴜȝ 📃 ⟫
export const LAGOX = -0o270;
export const LAGORX = 0o60;
export const LAGORZ = 0o110;
export const RIVERAENFLUOX = LAGOX + LAGORX - 0o10;
// ⟨ ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ 📏 ⟩ , }ʃɹƽ , ſᶘᴜ j͑ʃᴜ ʌ j͑ʃ'ɔ ŋᷠɹ
// j͑ʃ'ɔ ŋᷠɹ , ꞙɭı ⟅ ſᶘᴜ j͑ʃᴜ ʌ ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ⟅
// j͑ʃ'ɔ ŋᷠɹ ʌ ſɭɜ ſɭ,w ⟅ 📃 ⟩
const LAGOZ = k6siZ(RIVERAENFLUOX) + 0o30;
const LAGONIVELO = tsasaY(RIVERAENFLUOX);
export function s2xuruZ(): number { return LAGOZ; }
export function s2xuruVem2(): number { return LAGONIVELO; }
export function s2xuruCabole(ang: number): number {
  const x6mi = Math.sin(0o4 * ang + 0o23/0o20) + 0o1/0o2 * Math.sin(0o13 * ang + 0o7/0o10);
  const rx = LAGORX * ( 0o1 + 0o6/0o100 * x6mi * 0o53/0o100 );
  const rz = LAGORZ * ( 0o1 + 0o6/0o100 * x6mi * 0o53/0o100 );
  return 1 / Math.sqrt(( Math.cos(ang) / rx ) ** 2 + ( Math.sin(ang) / rz ) ** 2);
}
// ⟨ ſɭᴜ ſɭˬꞇƽ ʌ ſᶘᴜ j͑ʃᴜ 📏 ⟩ , ſᶘᴜ j͑ʃᴜ ʌ ſɭᴜ ſɭᴜ ꞙɭɔɩ ꞙɭꞟц ʌ ſɭɹ ſןᴜ ʌ ſןᴜ j͐ʃэ
// ꞙɭı ʌ ſᶘᴜ j͑ʃᴜ ʌ j͑ʃɜ ſɭ,ᴜ 📃 ⟩
// }ʃɹƽ ʌ ꞙɭɔ ʌ ſɭᴜ ꞁȷ̀ᴜ ʌ ſɭᴜ ſɭˬꞇƽ , ꞙɭɔ ʌ ſɭᴜʞ ſɭᴜȝ , ꞙɭɔ ʌ ſɭᴜ
// ⟨ ſᶘᴜ j͑ʃᴜ ʌ ſɭɹ ſןᴜ ʌ ſɭᴜ ſɭᴜ 📃 ⟩
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

export const RIVERABUŜOX: number = ( () => {
  for ( let i = 0; i <= 0o470; i++ ) {
    const x = LAGOX + LAGORX + 0o100 - i;
    if ( tsekeEnS2xuru(x, k6siZ(x)) ) return x;
  }
  return LAGOX + LAGORX;
} )();

export function riveraAkvaVem2(x: number): number {
  const m = glataTona(RIVERABUŜOX - 0o110, RIVERABUŜOX, x);
  // ⟨ ꞙɭɿ ʌ ſɭɹ ſןᴜ 📏 ⟩ , ꞙɭɔ ʌ ſɭᴜ ꞙɭı ⟅ ſɭɜ ſɭ,w 📃 ⟩
  // ꞙɭɔ ʌ ſɭɹ ſןᴜ ʌ ſᶘᴜ j͑ʃᴜ , ꞙɭɔ ʌ }ʃɹƽ , }ʃɹƽ ʌ ſᶘᴜ j͑ʃᴜ 📃 ⟩
  if ( m === 0 ) return tsasaY(x);
  if ( m === 1 ) return LAGONIVELO;
  return tsasaY(x) * ( 1 - m ) + LAGONIVELO * m;
}

export function tsasaVem2(x: number, z: number): number {
  const ksan2 = skulptitaAkvaVem2(x, z);
  if ( ksan2 !== null ) return ksan2;
  if ( tsekeEnNordorientaK6si(x, z) ) return riveraNordOrientaVem2(z);
  return tsekeEnS2xuru(x, z) ? s2xuruVem2() : riveraAkvaVem2(x);
}

// ⟪ ſɭɜ ſɭ,w ʌ ſɭᴜ ꞁȷ̀ᴜ 📃 ⟫
export function jaqoKozunu(x: number, z: number): number {
  return 0o215/0o100 * Math.sin(x * 0o1/0o40 + 0o43/0o40) * Math.cos(z * 0o1/0o40 - 0o4/0o10)
    + 0o55/0o40 * Math.sin(x * 0o1/0o20 - 0o163/0o100) * Math.sin(z * 0o1/0o20 + 0o115/0o100)
    + 0o23/0o40 * Math.sin(( x + z ) * 0o3/0o100 + 0o23/0o100);
}

export function tsasaY(x: number): number { return jaqoKozunu(x, k6siZ(x)) - 0o415/0o100; }

export function jaqoNordOrienta(x: number, z: number): number {
  const sudaEniro = glataTona(0o44, 0o122, z);
  if ( sudaEniro <= 0 ) return 0;
  const nordaEliro = 1 - glataTona(0o130, 0o200, z);
  if ( nordaEliro <= 0 ) return 0;
  const okcidentaEliro = glataTona(-0o434, -0o400, x);
  if ( okcidentaEliro <= 0 ) return 0;
  const orientaEliro = 1 - glataTona(-0o366, -0o302, x);
  if ( orientaEliro <= 0 ) return 0;
  const envolvaĵo = Math.min(sudaEniro, nordaEliro, okcidentaEliro, orientaEliro);

  const dx1 = ( x + 0o370 ) / 0o56, dz1 = ( z - 0o126 ) / 0o56;
  const cet21 = 0o40 * Math.exp(-0o1/0o2 * ( dx1 * dx1 + dz1 * dz1 ));
  const dx2 = ( x + 0o340 ) / 0o40, dz2 = ( z - 0o104 ) / 0o40;
  const cet22 = 0o21 * Math.exp(-0o1/0o2 * ( dx2 * dx2 + dz2 * dz2 ));
  const dx3 = ( x + 0o354 ) / 0o40, dz3 = ( z - 0o110 ) / 0o54;
  const cet23 = 0o16 * Math.exp(-0o1/0o2 * ( dx3 * dx3 + dz3 * dz3 ));
  const dxS = ( x + 0o354 ) / 0o42, dzS = ( z - 0o116 ) / 0o40;
  const selo = 0o14 * Math.exp(-0o1/0o2 * ( dxS * dxS + dzS * dzS ));
  return Math.max(0, ( cet21 + cet22 + cet23 - selo ) * envolvaĵo);
}

// ⟪ ſɭэ j͑ʃꞇ ʌ ɽ͑ʃ'ᴜȝ ʌ j͐ʃᴜȝ 📃 ⟫
export const RIVERANORDORIENTAFONTOZ = 0o100;
export const RIVERANORDORIENTADUONSEFINI = 0o6;

export function k6siNordOrientaX(z: number): number {
  const zS = RIVERANORDORIENTAFONTOZ, zM = -0o200;
  const t = Math.max(0, Math.min(1, ( z - zM ) / ( zS - zM )));
  const maltikn = 1 - t;
  return -0o350 + 0o30 * maltikn + 0o4 * Math.sin(maltikn * Math.PI * 2);
}

export const RIVERANORDORIENTABUŜOZ: number = ( () => {
  for ( let i = 0; i <= 0o700; i++ ) {
    const z = RIVERANORDORIENTAFONTOZ - i;
    if ( tsekeEnS2xuru(k6siNordOrientaX(z), z) ) return z;
  }
  return -0o200;
} )();

export function riveraNordOrientaVem2(z: number): number {
  const m = 1 - glataTona(RIVERANORDORIENTABUŜOZ, RIVERANORDORIENTABUŜOZ + 0o110, z);
  if ( m === 1 ) return LAGONIVELO;
  const x = k6siNordOrientaX(z);
  const t6lima = jaqoKozunu(x, z) + jaqoNordOrienta(x, z) - 0o415/0o100;
  if ( m === 0 ) return t6lima;
  return t6lima * ( 1 - m ) + LAGONIVELO * m;
}

export function tsekeEnNordorientaK6si(x: number, z: number): boolean {
  if ( z > RIVERANORDORIENTAFONTOZ || z < RIVERANORDORIENTABUŜOZ ) return false;
  return Math.abs(x - k6siNordOrientaX(z)) < RIVERANORDORIENTADUONSEFINI;
}

export function nex2caL6da(x: number, z: number): number {
  return kozonuL6da(x, z) + knat6keqanuDelta(x, z);
}

// ⟪ ſɭɜ ʃɔ ſɭᴜ ſᶘᴜ j͑ʃᴜ 📃 ⟫
export function l6da(x: number, z: number): number {
  return nex2caL6da(x, z) - tsasaEltrancxo(x, z);
}

// ⟪ j͑ʃɘɹ ʌ j͑ʃᴜ ʃɭ,ᴜ ( ſɭɜ ſɭ,w ʌ ſɭc̗ᴜ ) 📃 ⟫
export type Bs2 = "tsasa" | "lota" | "qun2nu" | "jaqo" | "tsasa-haxa3e" | "tsake" | "qun2";

export function tsasa(x: number, z: number): boolean {
  return skulptitaTsasa(x, z);
}

export function bs2(x: number, z: number): Bs2 {
  const pentrita = skulptitaBs2(x, z);
  if ( pentrita === 4 && tsasa(x, z) ) return "tsasa-haxa3e";
  if ( pentrita === 5 && tsasa(x, z) ) return "tsake";
  if ( tsasa(x, z) ) return "tsasa";
  if ( pentrita === 1 ) return "jaqo";
  if ( pentrita === 2 ) return "lota";
  if ( pentrita === 3 ) return "qun2nu";
  return "qun2";
}

// ⟨ ſɭɜ ſɭ,w ʌ ſɭɜ ſɭɜ 📃 ⟩
// }ʃᴜ j͐ʃᴜ ʌ ɽ͑ʃ'w j͑ʃ'ᴜ ⟅ ſɭɜ ſɭ,w ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ( generilo.ts ) ⟅
// }ʃᴜ j͐ʃᴜ ꞙɭɔ ɽ͑ʃ'w j͑ʃ'ᴜ , ſɭɜ ſɭ,w ⟅ ſɭɜ ʃɔ ſɭᴜ 📃 ⟩
export function kozonuL6da(x: number, z: number): number {
  return tikL6da(x, z);
}

// ⟪ ſɭɜ ʃɔ ſɭᴜ ſɭᴜ 📃 ⟫
export { SKULPTAPASO, SKULPTAAKTIVA } from "../t6lima-havop2/tik.js";
export { SKULPTAAKVANIVELO } from "../t6lima-havop2/tik.js";
export { SKULPTAN, SKULPTAORIGINO } from "../t6lima-havop2/tik.js";

// ⟪ j͑ʃ'ɜ ſןɹ ʌ ſᶘᴜ j͑ʃᴜ 📃 ⟫
const AKVA: AkvaKek2 | null = ( () => {
  if ( !SKULPTAAKTIVA ) return null;
  const bal2 = tikBal2();
  return vek2feTsasa(
    SKULPTAN, SKULPTAPASO, SKULPTAORIGINO as [number, number],
    nex2caL6da,
    ( x, z ) => bsej2kuqQoxa(bal2.qoxa, bal2.pal6, x, z),
    tikTsasahatsiq(), tikAkvaMasko(),
    // ⟨ }ʃᴜ j͐ʃᴜ ʌ ɽ͑ʃ'w j͑ʃ'ᴜ , ſᶘᴜ j͑ʃᴜ ʌ j͐ʃᴜɔ˞ 📃 ⟩
    // ſɭɜ ſɭ,w ʌ ſɭc̗ᴜ ⟅ ſᶘᴜ j͑ʃᴜ 📃 ⟩
    { vem2: SKULPTAAKVANIVELO, tsofLas: tsekeGeneritaT6lima() } );
} )();

export function tsasaEltrancxo(x: number, z: number): number {
  if ( !AKVA ) return 0;
  // ⟨ ſᶘᴜ j͑ʃᴜ ʌ j͑ʃɜ ſɭ,ᴜ , ꞙɭı ſןw ſɭᴜƴ 📃 ⟩
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
