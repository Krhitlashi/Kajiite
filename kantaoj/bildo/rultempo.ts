// ≺⧼ ſɭᴜc̗ ɭʃᴜ ʌ j͑ʃƨꞇʞ ʌ ſɭɔ j͑ʃ'ɔ ⏱️ ⧽≻
import { alHe, HE_POR_SEKUNDO } from "../komunajxoj/unuoj.js";

// ⟪ គោលដៅរួម 📃 ⟫
// ⟨ កម្រិតស៊ុម និង ដង់ស៊ីតេភីកសែលត្រូវគ្នានៅគ្រប់ឆាក ។ ការវាស់ផ្អាកលើ
//   រយៈពេលរវាងស៊ុមដែលបានគូរ មិនមែនលើចំនួនហៅ requestAnimationFrame ។
//   ដូច្នេះអេក្រង់ដែលមានរយៈពេលស៊ុមខុសៗគ្នាប្រើគោលដៅជា He
//   ត្រឹមត្រូវ ហើយស៊ុមដែលរំលងមិនធ្វើការអ្វីទេ ។ 📃 ⟩
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

// ⟨ ខ្នាតពេលទាំងអស់ជា He ។ alHe ប្រើតែនៅព្រំដែន API ឬ ការកំណត់
//   គំរូដែលយកតម្លៃពីខ្នាតខាងក្រៅ 📃 ⟩
const NORMALA_TAHAQ_SAPSE1I = HE_POR_SEKUNDO / 0o74;
const MALMULTA_TAHAQ_SAPSE1I = HE_POR_SEKUNDO / 0o36;
const SENFOKUSA_TAHAQ_SAPSE1I = HE_POR_SEKUNDO / 0o30;
const TAHAQ_TOLEREMO = alHe(0o1 / 0o4);
const MUQ_FAKTORO = 0o5 / 0o4;
const SEHE_FAKTORO = 0o11 / 0o10;
const VARMAJ_HATAHAQ = 0o10;
const MUQJ_HATAHAQ = 0o10;
// ⟨ ការឡើងគុណភាពយឺតជាងការចុះ ដើម្បីកុំឱ្យមាត្រឡើងចុះ ។ នៅគោល
//   ថវិកាទាប វារង់ចាំប្រហែល 0o44 He មុនសាកមាត្រខ្ពស់ជាង ។ 📃 ⟩
const SEHEJ_HATAHAQ = 0o1000;
const SKALA_PASO = 0o1 / 0o10;
const DEFAUXLTA_MINIMA_SKALO = 0o1 / 0o2;
const MEZA_PEZO = 0o1 / 0o10;
const INTERROMPA_FAKTORO = 0o10;

/* បង្កើតអ្នកកំណត់ល្បឿនស៊ុម និង គុណភាពដោយស្វ័យប្រវត្តិ ។
    @param hasukf2qani ( RultempajHasukf2qani ) - កម្រិតថវិការបស់ឧបករណ៍
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
    // ⟨ ការផ្អាកយូររបស់ប្រព័ន្ធ ឬ ការដេកមិនមែនជាកម្រិតសមត្ថភាពថ្មីទេ ។
    //   រង់ចាំស៊ុមថ្មីជាជាងកាត់គុណភាពដោយស៊ុមមួយខុសប្រក្រតី ។ 📃 ⟩
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
    // ⟨ មធ្យមរារាំងស៊ុមខ្លី និង វែងឆ្លាស់គ្នាពីការកំណត់ខុស ។ ការរាប់
    //   ស៊ុមវែងជាប់គ្នាតែមួយមិនឃើញការលើសទំហំពាក់កណ្តាលពេលទេ ។ 📃 ⟩
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
    // ⟨ រក្សាដំណាក់កាលអេក្រង់ដែលមានស៊ុមមិនស្ម៾គ្នា ។ បន្ទាប់ពីការយឺតយ៉ាវ
    //   រំលងស៊ុមចាស់ជាជាងគូរជាប់គ្នាដើម្បីទាស់ស៊ុមដែលបានបាត់ ។ 📃 ⟩
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
