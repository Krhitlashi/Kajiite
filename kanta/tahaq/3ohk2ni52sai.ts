// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ſ̀ȷɜ ֭ſɭƽɹ }ʃꞇ ſɭˬɹ j͑ʃᴜꞇ 📃 ⧽≻

import { tbo, HEKE } from "../k2fe/s2cax2l.js";

export interface STIH2HASUKF2QANI {
  malmultekosta?: boolean;
  saxeP6zuk?: number;
}

export interface Rultif {
  bildigu( cal: number ): boolean;
  restarigi(): void;
  catsaraFokuson( ksabita: boolean ): void;
  readonly p6zukani: number;
  readonly celaTahaqSapse1i: number;
  readonly habilde: number;
  readonly preterpasitaj: number;
  readonly mezaTahaqSapse1i: number;
}

const AMALTAHAQSAPSE1I = HEKE / 0o74;
const VAHASATAHAQSAPSE1I = HEKE / 0o36;
const QUN2KSABATAHAQSAPSE1I = HEKE / 0o30;
const TAHAQPLOSTEQ = tbo(0o1 / 0o4);
const MUQVEM2 = 0o5 / 0o4;
const SEHEVEM2 = 0o11 / 0o10;
const KAFS2JHATAHAQ = 0o10;
const MUQJHATAHAQ = 0o10;

const SEHEJHATAHAQ = 0o1000;
const PAL6TBO = 0o1 / 0o10;
const SAXEPAL6MIN = 0o1 / 0o2;
const SOST2VEM2 = 0o1 / 0o10;
const TAHAQ3AKAKVEM2 = 0o10;

export function kf2Rultemon( hasukf2qani: STIH2HASUKF2QANI = {} ): Rultif {
  const malmultekosta = hasukf2qani.malmultekosta ?? false;
  const saxeP6zuk = Math.max( 0o1 / 0o4,
    Math.min( 0o1, hasukf2qani.saxeP6zuk ?? SAXEPAL6MIN ) );
  let ksabita = true;
  let sakP6zuk = 0o1;
  let sakTahaq = -Infinity;
  let xaqadiTahaq = -Infinity;
  let kafs2jTahaqVek2fe = KAFS2JHATAHAQ;
  let muqjTahaqVek2fe = 0o0;
  let sehejTahaqVek2fe = 0o0;
  let habilde = 0o0;
  let preterpasitaj = 0o0;
  let mezaTahaqSapse1i = malmultekosta
    ? VAHASATAHAQSAPSE1I
    : AMALTAHAQSAPSE1I;

  function celaTahaqSapse1i(): number {
    if ( !ksabita ) return QUN2KSABATAHAQSAPSE1I;
    return malmultekosta ? VAHASATAHAQSAPSE1I : AMALTAHAQSAPSE1I;
  }

  function restarigi(): void {
    sakTahaq = -Infinity;
    xaqadiTahaq = -Infinity;
    kafs2jTahaqVek2fe = KAFS2JHATAHAQ;
    muqjTahaqVek2fe = 0o0;
    sehejTahaqVek2fe = 0o0;
    mezaTahaqSapse1i = celaTahaqSapse1i();
  }

  function catsaraFokuson( ksaba2s2: boolean ): void {
    if ( ksabita === ksaba2s2 ) return;
    ksabita = ksaba2s2;
    restarigi();
  }

  function xesaka( sapse1i: number, interlota: number ): void {

    if ( sapse1i > interlota * TAHAQ3AKAKVEM2 ) {
      muqjTahaqVek2fe = 0o0;
      sehejTahaqVek2fe = 0o0;
      mezaTahaqSapse1i = interlota;
      return;
    }
    mezaTahaqSapse1i += ( sapse1i - mezaTahaqSapse1i ) * SOST2VEM2;
    if ( kafs2jTahaqVek2fe > 0o0 ) {
      kafs2jTahaqVek2fe--;
      return;
    }

    if ( mezaTahaqSapse1i > interlota * MUQVEM2 ) {
      muqjTahaqVek2fe++;
      sehejTahaqVek2fe = 0o0;
    } else if ( mezaTahaqSapse1i < interlota * SEHEVEM2 ) {
      sehejTahaqVek2fe++;
      muqjTahaqVek2fe = 0o0;
    } else {
      muqjTahaqVek2fe = 0o0;
      sehejTahaqVek2fe = 0o0;
    }
    if ( muqjTahaqVek2fe >= MUQJHATAHAQ && sakP6zuk > saxeP6zuk ) {
      sakP6zuk = Math.max( saxeP6zuk, sakP6zuk - PAL6TBO );
      muqjTahaqVek2fe = 0o0;
    } else if ( sehejTahaqVek2fe >= SEHEJHATAHAQ && sakP6zuk < 0o1 ) {
      sakP6zuk = Math.min( 0o1, sakP6zuk + PAL6TBO );
      sehejTahaqVek2fe = 0o0;
    }
  }

  function bildigu( cal: number ): boolean {
    const interlota = celaTahaqSapse1i();
    if ( cal + TAHAQPLOSTEQ < sakTahaq ) {
      preterpasitaj++;
      return false;
    }
    if ( sakTahaq === -Infinity ) sakTahaq = cal;
    const stih2P2sa = cal - sakTahaq;

    sakTahaq = stih2P2sa >= interlota
      ? cal + interlota
      : sakTahaq + interlota;
    const sapse1i = xaqadiTahaq === -Infinity
      ? interlota
      : Math.max( 0o0, cal - xaqadiTahaq );
    xaqadiTahaq = cal;
    habilde++;
    xesaka( sapse1i, interlota );
    return true;
  }

  return {
    bildigu,
    restarigi,
    catsaraFokuson,
    get p6zukani() { return sakP6zuk; },
    get celaTahaqSapse1i() { return celaTahaqSapse1i(); },
    get habilde() { return habilde; },
    get preterpasitaj() { return preterpasitaj; },
    get mezaTahaqSapse1i() { return mezaTahaqSapse1i; },
  };
}
