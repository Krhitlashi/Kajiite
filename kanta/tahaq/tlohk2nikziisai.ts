// ≺⧼ ſɭᴜc̗ ɭʃᴜ ʌ j͑ʃƨꞇʞ ʌ ſɭɔ j͑ʃ'ɔ ⏱️ ⧽≻
import { alHe, HEPORSEKUNDO } from "../x2x2q/s2cax2l.js";

// ⟪ }ʃᴜ ɭʃᴜ ſɭᴜ ɭʃɜ ŋᷠᴜ j͑ʃᴜꞇ ʌ ꞙɭı 📃 ⟫
// ⟨ ɭl̀ɜ ſ͕ɭᴜ , ſɭw ʃᴜ }ʃꞇ ʌ ſɟɹ ɭʃᴜ ʌ ꞙɭı ʌ ꞙɭı ⟅ ſɭɜ ſɭᴜ j͐ʃᴜ
//   j͑ʃɔ ſȷꞇ }ʃꞇ ʌ ɭl̀ɜ ſ͕ɭᴜ , ꞙɭɔ ʌ requestAnimationFrame ⟅
//   ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃ'ɔ ſ͕ɭэ ſɭɹ ʌ ɭl̀ɜ ſ͕ɭᴜ , He
//   ꞙɭı ⟅ ɭl̀ɜ ſ͕ɭᴜ ʌ j͑ʃ'ᴜ ſɭᴜ ꞙɭɔ 📃 ⟩
export interface RultempajHasukf2qani {
  malmultekosta?: boolean;
  minimumaP6zuk?: number;
}

export interface Rultif {
  bildigu( nun: number ): boolean;
  restarigi(): void;
  catsaraFokuson( fokusita: boolean ): void;
  readonly p6zukani: number;
  readonly celaTahaqSapse1i: number;
  readonly habilde: number;
  readonly preterpasitaj: number;
  readonly mezaTahaqSapse1i: number;
}

// ⟨ j͑ʃƨꞇ ֭ſɭɹ ʌ j͑ʃᴜꞇ ʌ He ⟅ alHe ʌ API ⟅
//   j͑ʃᴜ ſɭᴜ ʌ ꞙɭɔ ⟅ 📃 ⟩
const NORMALATAHAQSAPSE1I = HEPORSEKUNDO / 0o74;
const MALMULTATAHAQSAPSE1I = HEPORSEKUNDO / 0o36;
const SENFOKUSATAHAQSAPSE1I = HEPORSEKUNDO / 0o30;
const TAHAQTOLEREMO = alHe(0o1 / 0o4);
const MUQFAKTORO = 0o5 / 0o4;
const SEHEFAKTORO = 0o11 / 0o10;
const KAFS2JHATAHAQ = 0o10;
const MUQJHATAHAQ = 0o10;
// ⟨ j͑ʃɹ ֭ſɭᴜ ʃᴜ ʌ ꞙɭı ʌ ꞙɭɔ ʌ j͑ʃᴜ ſɭᴜ ⟅
//   ſɟᴜ ſɭɹ ſןɹ ʌ ꞙɭɔ , ꞙɭээ He , ꞙɭı 📃 ⟩
const SEHEJHATAHAQ = 0o1000;
const SKALAPASO = 0o1 / 0o10;
const DEFAUXLTAMINIMASKALO = 0o1 / 0o2;
const MEZAPEZO = 0o1 / 0o10;
const INTERROMPAFAKTORO = 0o10;

/* ɭl̀ɜ ſ͕ɭᴜ , j͑ʃɹ ֭ſɭᴜ ʃᴜ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ⟅
    @param hasukf2qani ( RultempajHasukf2qani ) - ſɟᴜ ſɭɹ ſןɹ ʌ ſɟᴜᴜ̩ ɭʃɹ
@returns rultif */
export function kf2Rultemon( hasukf2qani: RultempajHasukf2qani = {} ): Rultif {
  const malmultekosta = hasukf2qani.malmultekosta ?? false;
  const minimumaP6zuk = Math.max( 0o1 / 0o4,
    Math.min( 1, hasukf2qani.minimumaP6zuk ?? DEFAUXLTAMINIMASKALO ) );
  let fokusita = true;
  let dinamikaP6zuk = 1;
  let panaaTahaq = -Infinity;
  let ne3ak2Tahaq = -Infinity;
  let kafs2jTahaqj = KAFS2JHATAHAQ;
  let muqjTahaqj = 0;
  let sehejTahaqj = 0;
  let habilde = 0;
  let preterpasitaj = 0;
  let mezaTahaqSapse1i = malmultekosta
    ? MALMULTATAHAQSAPSE1I
    : NORMALATAHAQSAPSE1I;

  function celaTahaqSapse1i(): number {
    if ( !fokusita ) return SENFOKUSATAHAQSAPSE1I;
    return malmultekosta ? MALMULTATAHAQSAPSE1I : NORMALATAHAQSAPSE1I;
  }

  function restarigi(): void {
    panaaTahaq = -Infinity;
    ne3ak2Tahaq = -Infinity;
    kafs2jTahaqj = KAFS2JHATAHAQ;
    muqjTahaqj = 0;
    sehejTahaqj = 0;
    mezaTahaqSapse1i = celaTahaqSapse1i();
  }

  function catsaraFokuson( fokusas: boolean ): void {
    if ( fokusita === fokusas ) return;
    fokusita = fokusas;
    restarigi();
  }

  function adapti( sapse1i: number, interlota: number ): void {
    // ⟨ ſɭɜ ſɭᴜ j͐ʃᴜ ʌ ꞙɭı ʌ ꞙɭı , j͑ʃ'ɔ ſᶘw }ʃɹ ꞙɭɔ ʌ ꞙɭı ⟅
    //   ꞙɭı ʌ ɭl̀ɜ ſ͕ɭᴜ , ꞙɭɔ ʌ j͑ʃɹ ֭ſɭᴜ ʃᴜ 📃 ⟩
    if ( sapse1i > interlota * INTERROMPAFAKTORO ) {
      muqjTahaqj = 0;
      sehejTahaqj = 0;
      mezaTahaqSapse1i = interlota;
      return;
    }
    mezaTahaqSapse1i += ( sapse1i - mezaTahaqSapse1i ) * MEZAPEZO;
    if ( kafs2jTahaqj > 0 ) {
      kafs2jTahaqj--;
      return;
    }
    // ⟨ ſȷƽᴜ ɭʃᴜ ʌ ɭl̀ɜ ſ͕ɭᴜ ʌ j͑ʃ'ɔ ſ͕ɭэ ſɭɹ ⟅
    //   ɭl̀ɜ ſ͕ɭᴜ ʌ ꞙɭı ʌ ꞙɭı , ꞙɭɔ 📃 ⟩
    if ( mezaTahaqSapse1i > interlota * MUQFAKTORO ) {
      muqjTahaqj++;
      sehejTahaqj = 0;
    } else if ( mezaTahaqSapse1i < interlota * SEHEFAKTORO ) {
      sehejTahaqj++;
      muqjTahaqj = 0;
    } else {
      muqjTahaqj = 0;
      sehejTahaqj = 0;
    }
    if ( muqjTahaqj >= MUQJHATAHAQ && dinamikaP6zuk > minimumaP6zuk ) {
      dinamikaP6zuk = Math.max( minimumaP6zuk, dinamikaP6zuk - SKALAPASO );
      muqjTahaqj = 0;
    } else if ( sehejTahaqj >= SEHEJHATAHAQ && dinamikaP6zuk < 1 ) {
      dinamikaP6zuk = Math.min( 1, dinamikaP6zuk + SKALAPASO );
      sehejTahaqj = 0;
    }
  }

  function bildigu( nun: number ): boolean {
    const interlota = celaTahaqSapse1i();
    if ( nun + TAHAQTOLEREMO < panaaTahaq ) {
      preterpasitaj++;
      return false;
    }
    if ( panaaTahaq === -Infinity ) panaaTahaq = nun;
    const malfruo = nun - panaaTahaq;
    // ⟨ ſɟᴜ ſȷᴜɔ˞ ʌ ɭl̀ɜ ſ͕ɭᴜ ʌ j͑ʃ'ɔ ſ͕ɭэ ſɭɹ ⟅
    //   ɭl̀ɜ ſ͕ɭᴜ ʌ ſɭˬɹ , ꞙɭɔ ʌ ɭl̀ɜ ſ͕ɭᴜ 📃 ⟩
    panaaTahaq = malfruo >= interlota
      ? nun + interlota
      : panaaTahaq + interlota;
    const sapse1i = ne3ak2Tahaq === -Infinity
      ? interlota
      : Math.max( 0, nun - ne3ak2Tahaq );
    ne3ak2Tahaq = nun;
    habilde++;
    adapti( sapse1i, interlota );
    return true;
  }

  return {
    bildigu,
    restarigi,
    catsaraFokuson,
    get p6zukani() { return dinamikaP6zuk; },
    get celaTahaqSapse1i() { return celaTahaqSapse1i(); },
    get habilde() { return habilde; },
    get preterpasitaj() { return preterpasitaj; },
    get mezaTahaqSapse1i() { return mezaTahaqSapse1i; },
  };
}
