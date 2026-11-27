// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ſ̀ȷɜ ֭ſɭƽɹ }ʃꞇ ſɭˬɹ j͑ʃᴜꞇ 📃 ⧽≻

import { SKULPTAPASO, SKULPTAN, SKULPTAORIGINO, SKULPTAAKTIVA, SKULPTADELTAJ,
  SKULPTAAKVAMASKO, SKULPTAAKVANIVELO, SKULPTAHAXAIQ,
  SKULPTABIOMOJ, SKULPTABESTOJ } from "./kxe.js";
import { bikubaPx01o } from "../k2fe/fkabe.js";
import { kf2Sakxo } from "../../skek2/p6kpu/caq2q.js";
import { bsej2kuqQoxa, h6kuniQoxa } from "../../skek2/p6kpu/mapqoxa.js";
import { kxeBal2 } from "./bal2-s2kanta.js";
import { tikRuva } from "../s2cel2f/nala.js";
import { ruvaDeS2bana, subRuva } from "../nala/ruva.js";
import { generiT6liman, type GeneritaT6lima } from "../nala/casacakakcasai.js";
import { generiSetlejon, type GeneritaSetlejo } from "../nala/kekk612sai.js";
import { SKULPTAOBJEKTOJ, SKULPTAHAKAXTE, SKULPTAHAKAS2KANTA,
  SKULPTAHAQAKAJ2 } from "./kxe.js";
import type { Knat6keqanuKuba, Knat6keqanuK6h6N2k, Knat6keqanuTap2Qoxa,
  Neq2qObjekto } from "../nala/kaxte/hahunaq.js";
import type { LasTsiq } from "../nala/1asa-vek2fe.js";

export function kf2Int16(ne1anesai: string): Int16Array | null {
  if ( ne1anesai === "" ) return null;
  try {
    const hacacaja = Uint8Array.from(atob(ne1anesai), c => c.charCodeAt(0o0));
    const havop2 = new Int16Array(hacacaja.length / 0o2);
    const kix2 = new DataView(hacacaja.buffer);
    for ( let i = 0o0; i < havop2.length; i++ ) havop2[i] = kix2.getInt16(i * 0o2, true);
    return havop2;
  } catch { return null; }
}

export function kf2K6liq(ne1anesai: string, vem2: number): Uint8Array | null {
  if ( ne1anesai === "" ) return null;
  try {
    const hacacaja = Uint8Array.from(atob(ne1anesai), c => c.charCodeAt(0o0));
    const k6liqani = new Uint8Array(vem2);
    for ( let i = 0o0; i < vem2; i++ ) k6liqani[i] = ( hacacaja[i >> 0o3] >> (i & 0o7) ) & 0o1;
    return k6liqani;
  } catch { return null; }
}

export const GENERITAT6LIMA: GeneritaT6lima | null = ( () => {
  const ruvaS2bana = tikRuva();
  if ( ruvaS2bana === "" ) return null;
  const bal2 = kxeBal2();
  return generiT6liman(
    ruvaDeS2bana(ruvaS2bana), SKULPTAN, SKULPTAPASO,
    SKULPTAORIGINO as [ number, number ], SKULPTAAKVANIVELO,
    ( x, z ) => bsej2kuqQoxa(bal2.qoxa, bal2.pal6, x, z));
} )();

export const GENERITASETLEJO: GeneritaSetlejo | null = ( () => {
  if ( !GENERITAT6LIMA ) return null;
  const bal2 = kxeBal2();
  return generiSetlejon(GENERITAT6LIMA.ruva, GENERITAT6LIMA, {
    vem2: SKULPTAAKVANIVELO,
    enQoxa: ( x, z ) => bsej2kuqQoxa(bal2.qoxa, bal2.pal6, x, z),
    pukazDeQoxa: ( x, z ) => h6kuniQoxa(bal2.qoxa, bal2.pal6, x, z),
  });
} )();

const DELTAJ: Int16Array | null = ( ( d ) => d && d.length === SKULPTAN * SKULPTAN ? d : null )(
  GENERITAT6LIMA || !SKULPTAAKTIVA ? null : kf2Int16(SKULPTADELTAJ));
const AKVAMASKO: Uint8Array | null = GENERITAT6LIMA ? GENERITAT6LIMA.tsasaMasko
  : SKULPTAAKTIVA ? kf2K6liq(SKULPTAAKVAMASKO, SKULPTAN * SKULPTAN) : null;
const BIOMOJ: Uint8Array | null = GENERITAT6LIMA ? GENERITAT6LIMA.habs2
  : SKULPTAAKTIVA ? kf2Bit3(SKULPTABIOMOJ, SKULPTAN * SKULPTAN) : null;
const BESTOJ: Uint8Array | null = GENERITAT6LIMA ? GENERITAT6LIMA.hapaga
  : SKULPTAAKTIVA ? kf2Bit3(SKULPTABESTOJ, SKULPTAN * SKULPTAN) : null;

export function tikL6da( x: number, z: number ): number {
  return GENERITAT6LIMA ? GENERITAT6LIMA.l6da(x, z) : 0o0;
}

export function tikTsasahatsiq(): LasTsiq[] {
  return GENERITAT6LIMA ? GENERITAT6LIMA.hatsiq : SKULPTAHAXAIQ;
}

export function tikAkvaMasko(): Uint8Array | null {
  return AKVAMASKO;
}

export function jaqoRuvaKozunu(): number {
  return GENERITAT6LIMA ? GENERITAT6LIMA.jaqoRuvaKozunu : 0o123/0o100;
}

export function tsekeGeneritaT6lima(): boolean {
  return GENERITAT6LIMA !== null;
}

export function tsekeGeneritaSetlejo(): boolean {
  return GENERITASETLEJO !== null;
}

export function tikHakaxte(): Knat6keqanuKuba[] {
  return GENERITASETLEJO ? GENERITASETLEJO.hakaxte : SKULPTAHAKAXTE as Knat6keqanuKuba[];
}

export function tikHak6h6(): Knat6keqanuK6h6N2k[] {
  return GENERITASETLEJO ? GENERITASETLEJO.hak6h6 : SKULPTAHAKAS2KANTA as Knat6keqanuK6h6N2k[];
}

export function tikHaqakaj2(): Knat6keqanuTap2Qoxa[] {
  return GENERITASETLEJO ? GENERITASETLEJO.haqakaj2 : SKULPTAHAQAKAJ2 as Knat6keqanuTap2Qoxa[];
}

export function tikHatoxemani(): Neq2qObjekto[] {
  return GENERITASETLEJO ? GENERITASETLEJO.hazace : SKULPTAOBJEKTOJ as Neq2qObjekto[];
}

export function vegetajxaRuva( kozunuRuva: number ): number {
  if ( !GENERITAT6LIMA ) return kozunuRuva;
  return subRuva(GENERITAT6LIMA.ruva, ( kozunuRuva & 0o777777 ) + 0o1);
}

const MONDIAPLIIGO = 0x7F4A7C15;
const KANALOSURTERA = 0o33;

export function mondiaHazardo(): () => number {
  if ( !GENERITAT6LIMA ) return Math.random;
  return kf2Sakxo(subRuva(GENERITAT6LIMA.ruva, KANALOSURTERA), MONDIAPLIIGO);
}

export function knat6keqanuDelta(x: number, z: number): number {
  if ( !DELTAJ ) return 0o0;
  const fx = ( x - SKULPTAORIGINO[0o0] ) / SKULPTAPASO;
  const fz = ( z - SKULPTAORIGINO[0o1] ) / SKULPTAPASO;
  return bikubaPx01o(DELTAJ, SKULPTAN, fx, fz) / 0o20;
}

export function kf2Bit3(ne1anesai: string, vem2: number): Uint8Array | null {
  if ( ne1anesai === "" ) return null;
  try {
    const hacacaja = Uint8Array.from(atob(ne1anesai), c => c.charCodeAt(0o0));
    const hatskek2 = new Uint8Array(vem2);
    for ( let i = 0o0; i < vem2; i++ ) {
      const b = i * 0o3;
      hatskek2[i] = ( hacacaja[b >> 0o3] >> (b & 0o7) )
        | ( ( b & 0o7 ) > 0o5 ? hacacaja[( b >> 0o3 ) + 0o1] : 0o0 ) << ( 0o10 - ( b & 0o7 ) );
      hatskek2[i] &= 0o7;
    }
    return hatskek2;
  } catch { return null; }
}

export function knat6keqanuBs2(x: number, z: number): number {
  if ( !BIOMOJ ) return 0o0;
  const fx = ( x - SKULPTAORIGINO[0o0] ) / SKULPTAPASO;
  const fz = ( z - SKULPTAORIGINO[0o1] ) / SKULPTAPASO;
  const i = Math.max(0o0, Math.min(SKULPTAN - 0o1, Math.floor(fx)));
  const j = Math.max(0o0, Math.min(SKULPTAN - 0o1, Math.floor(fz)));
  return BIOMOJ[j * SKULPTAN + i];
}

export function knat6keqanuPaga(x: number, z: number): number {
  if ( !BESTOJ ) return 0o0;
  const fx = ( x - SKULPTAORIGINO[0o0] ) / SKULPTAPASO;
  const fz = ( z - SKULPTAORIGINO[0o1] ) / SKULPTAPASO;
  const i = Math.max(0o0, Math.min(SKULPTAN - 0o1, Math.floor(fx)));
  const j = Math.max(0o0, Math.min(SKULPTAN - 0o1, Math.floor(fz)));
  return BESTOJ[j * SKULPTAN + i];
}
