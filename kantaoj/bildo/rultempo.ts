// ≺⧼ ſɭᴜc̗ ɭʃᴜ ʌ j͑ʃƨꞇʞ ʌ ſɭɔ j͑ʃ'ɔ ⏱️ ⧽≻
import { alHe, HE_POR_SEKUNDO } from "../komunajxoj/unuoj.js";

// ⟪ }ʃᴜ ɭʃᴜ ſɭᴜ ɭʃɜ ŋᷠᴜ j͑ʃᴜꞇ ʌ ꞙɭı 📃 ⟫
// ⟨ ɭl̀ɜ ſ͕ɭᴜ , ſɭw ʃᴜ }ʃꞇ ʌ ſɟɹ ɭʃᴜ ʌ ꞙɭı ʌ ꞙɭı ⟅ ſɭɜ ſɭᴜ j͐ʃᴜ
//   j͑ʃɔ ſȷꞇ }ʃꞇ ʌ ɭl̀ɜ ſ͕ɭᴜ , ꞙɭɔ ʌ requestAnimationFrame ⟅
//   ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃ'ɔ ſ͕ɭэ ſɭɹ ʌ ɭl̀ɜ ſ͕ɭᴜ , He
//   ꞙɭı ⟅ ɭl̀ɜ ſ͕ɭᴜ ʌ j͑ʃ'ᴜ ſɭᴜ ꞙɭɔ 📃 ⟩
export interface RultempajHasukf2qani {
  malmultekosta?: boolean;
  minimumaSkalo?: number;
}

export interface Rultempo {
  bildigu( nun: number ): boolean;
  restarigi(): void;
  agordiFokuson( fokusita: boolean ): void;
  readonly p6zukani: number;
  readonly celaTahaqSapse1i: number;
  readonly bildigitaj: number;
  readonly preterpasitaj: number;
  readonly mezaTahaqSapse1i: number;
}

// ⟨ j͑ʃƨꞇ ֭ſɭɹ ʌ j͑ʃᴜꞇ ʌ He ⟅ alHe ʌ API ⟅
//   j͑ʃᴜ ſɭᴜ ʌ ꞙɭɔ ⟅ 📃 ⟩
const NORMALA_TAHAQ_SAPSE1I = HE_POR_SEKUNDO / 0o74;
const MALMULTA_TAHAQ_SAPSE1I = HE_POR_SEKUNDO / 0o36;
const SENFOKUSA_TAHAQ_SAPSE1I = HE_POR_SEKUNDO / 0o30;
const TAHAQ_TOLEREMO = alHe(0o1 / 0o4);
const MUQ_FAKTORO = 0o5 / 0o4;
const SEHE_FAKTORO = 0o11 / 0o10;
const VARMAJ_HATAHAQ = 0o10;
const MUQJ_HATAHAQ = 0o10;
// ⟨ j͑ʃɹ ֭ſɭᴜ ʃᴜ ʌ ꞙɭı ʌ ꞙɭɔ ʌ j͑ʃᴜ ſɭᴜ ⟅
//   ſɟᴜ ſɭɹ ſןɹ ʌ ꞙɭɔ , ꞙɭээ He , ꞙɭı 📃 ⟩
const SEHEJ_HATAHAQ = 0o1000;
const SKALA_PASO = 0o1 / 0o10;
const DEFAUXLTA_MINIMA_SKALO = 0o1 / 0o2;
const MEZA_PEZO = 0o1 / 0o10;
const INTERROMPA_FAKTORO = 0o10;

/* ɭl̀ɜ ſ͕ɭᴜ , j͑ʃɹ ֭ſɭᴜ ʃᴜ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ⟅
    @param hasukf2qani ( RultempajHasukf2qani ) - ſɟᴜ ſɭɹ ſןɹ ʌ ſɟᴜᴜ̩ ɭʃɹ
@returns rultempo */
export function kf2Rultemon( hasukf2qani: RultempajHasukf2qani = {} ): Rultempo {
  const malmultekosta = hasukf2qani.malmultekosta ?? false;
  const minimumaSkalo = Math.max( 0o1 / 0o4,
    Math.min( 1, hasukf2qani.minimumaSkalo ?? DEFAUXLTA_MINIMA_SKALO ) );
  let fokusita = true;
  let dinamikaSkalo = 1;
  let sekvaTahaq = -Infinity;
  let ne3ak2Tahaq = -Infinity;
  let varmajTahaqj = VARMAJ_HATAHAQ;
  let muqjTahaqj = 0;
  let sehejTahaqj = 0;
  let bildigitaj = 0;
  let preterpasitaj = 0;
  let mezaTahaqSapse1i = malmultekosta
    ? MALMULTA_TAHAQ_SAPSE1I
    : NORMALA_TAHAQ_SAPSE1I;

  function celaTahaqSapse1i(): number {
    if ( !fokusita ) return SENFOKUSA_TAHAQ_SAPSE1I;
    return malmultekosta ? MALMULTA_TAHAQ_SAPSE1I : NORMALA_TAHAQ_SAPSE1I;
  }

  function restarigi(): void {
    sekvaTahaq = -Infinity;
    ne3ak2Tahaq = -Infinity;
    varmajTahaqj = VARMAJ_HATAHAQ;
    muqjTahaqj = 0;
    sehejTahaqj = 0;
    mezaTahaqSapse1i = celaTahaqSapse1i();
  }

  function agordiFokuson( fokusas: boolean ): void {
    if ( fokusita === fokusas ) return;
    fokusita = fokusas;
    restarigi();
  }

  function adapti( sapse1i: number, intervalo: number ): void {
    // ⟨ ſɭɜ ſɭᴜ j͐ʃᴜ ʌ ꞙɭı ʌ ꞙɭı , j͑ʃ'ɔ ſᶘw }ʃɹ ꞙɭɔ ʌ ꞙɭı ⟅
    //   ꞙɭı ʌ ɭl̀ɜ ſ͕ɭᴜ , ꞙɭɔ ʌ j͑ʃɹ ֭ſɭᴜ ʃᴜ 📃 ⟩
    if ( sapse1i > intervalo * INTERROMPA_FAKTORO ) {
      muqjTahaqj = 0;
      sehejTahaqj = 0;
      mezaTahaqSapse1i = intervalo;
      return;
    }
    mezaTahaqSapse1i += ( sapse1i - mezaTahaqSapse1i ) * MEZA_PEZO;
    if ( varmajTahaqj > 0 ) {
      varmajTahaqj--;
      return;
    }
    // ⟨ ſȷƽᴜ ɭʃᴜ ʌ ɭl̀ɜ ſ͕ɭᴜ ʌ j͑ʃ'ɔ ſ͕ɭэ ſɭɹ ⟅
    //   ɭl̀ɜ ſ͕ɭᴜ ʌ ꞙɭı ʌ ꞙɭı , ꞙɭɔ 📃 ⟩
    if ( mezaTahaqSapse1i > intervalo * MUQ_FAKTORO ) {
      muqjTahaqj++;
      sehejTahaqj = 0;
    } else if ( mezaTahaqSapse1i < intervalo * SEHE_FAKTORO ) {
      sehejTahaqj++;
      muqjTahaqj = 0;
    } else {
      muqjTahaqj = 0;
      sehejTahaqj = 0;
    }
    if ( muqjTahaqj >= MUQJ_HATAHAQ && dinamikaSkalo > minimumaSkalo ) {
      dinamikaSkalo = Math.max( minimumaSkalo, dinamikaSkalo - SKALA_PASO );
      muqjTahaqj = 0;
    } else if ( sehejTahaqj >= SEHEJ_HATAHAQ && dinamikaSkalo < 1 ) {
      dinamikaSkalo = Math.min( 1, dinamikaSkalo + SKALA_PASO );
      sehejTahaqj = 0;
    }
  }

  function bildigu( nun: number ): boolean {
    const intervalo = celaTahaqSapse1i();
    if ( nun + TAHAQ_TOLEREMO < sekvaTahaq ) {
      preterpasitaj++;
      return false;
    }
    if ( sekvaTahaq === -Infinity ) sekvaTahaq = nun;
    const malfruo = nun - sekvaTahaq;
    // ⟨ ſɟᴜ ſȷᴜɔ˞ ʌ ɭl̀ɜ ſ͕ɭᴜ ʌ j͑ʃ'ɔ ſ͕ɭэ ſɭɹ ⟅
    //   ɭl̀ɜ ſ͕ɭᴜ ʌ ſɭˬɹ , ꞙɭɔ ʌ ɭl̀ɜ ſ͕ɭᴜ 📃 ⟩
    sekvaTahaq = malfruo >= intervalo
      ? nun + intervalo
      : sekvaTahaq + intervalo;
    const sapse1i = ne3ak2Tahaq === -Infinity
      ? intervalo
      : Math.max( 0, nun - ne3ak2Tahaq );
    ne3ak2Tahaq = nun;
    bildigitaj++;
    adapti( sapse1i, intervalo );
    return true;
  }

  return {
    bildigu,
    restarigi,
    agordiFokuson,
    get p6zukani() { return dinamikaSkalo; },
    get celaTahaqSapse1i() { return celaTahaqSapse1i(); },
    get bildigitaj() { return bildigitaj; },
    get preterpasitaj() { return preterpasitaj; },
    get mezaTahaqSapse1i() { return mezaTahaqSapse1i; },
  };
}
