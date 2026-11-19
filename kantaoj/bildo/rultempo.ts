// ≺⧼ ការគ្រប់គ្រងពេលវេលានៃការរត់ ⏱️ ⧽≻
import { alHe, HE_POR_SEKUNDO } from "../komunajxoj/unuoj.js";

// ⟪ គោលដៅរួម 📃 ⟫
// ⟨ កម្រិតស៊ុម និង ដង់ស៊ីតេភីកសែលត្រូវគ្នានៅគ្រប់ឆាក ។ ការវាស់ផ្អាកលើ
//   រយៈពេលរវាងស៊ុមដែលបានគូរ មិនមែនលើចំនួនហៅ requestAnimationFrame ។
//   ដូច្នេះអេក្រង់ដែលមានរយៈពេលស៊ុមខុសៗគ្នាប្រើគោលដៅជា He
//   ត្រឹមត្រូវ ហើយស៊ុមដែលរំលងមិនធ្វើការអ្វីទេ ។ 📃 ⟩
export interface RultempajOpcioj {
  malmultekosta?: boolean;
  minimumaSkalo?: number;
}

export interface Rultempo {
  bildigu( nun: number ): boolean;
  restarigi(): void;
  agordiFokuson( fokusita: boolean ): void;
  readonly skalo: number;
  readonly celaKadraDaŭro: number;
  readonly bildigitaj: number;
  readonly preterpasitaj: number;
  readonly mezaKadraDaŭro: number;
}

// ⟨ ខ្នាតពេលទាំងអស់ជា He ។ alHe ប្រើតែនៅព្រំដែន API ឬ ការកំណត់
//   គំរូដែលយកតម្លៃពីខ្នាតខាងក្រៅ 📃 ⟩
const NORMALA_KADRA_DAŬRO = HE_POR_SEKUNDO / 0o74;
const MALMULTA_KADRA_DAŬRO = HE_POR_SEKUNDO / 0o36;
const SENFOKUSA_KADRA_DAŬRO = HE_POR_SEKUNDO / 0o30;
const KADRA_TOLEREMO = alHe(0o1 / 0o4);
const MALRAPIDA_FAKTORO = 0o5 / 0o4;
const RAPIDA_FAKTORO = 0o11 / 0o10;
const VARMAJ_KADROJ = 0o10;
const MALRAPIDAJ_KADROJ = 0o10;
// ⟨ ការឡើងគុណភាពយឺតជាងការចុះ ដើម្បីកុំឱ្យមាត្រឡើងចុះ ។ នៅគោល
//   ថវិកាទាប វារង់ចាំប្រហែល 0o44 He មុនសាកមាត្រខ្ពស់ជាង ។ 📃 ⟩
const RAPIDAJ_KADROJ = 0o1000;
const SKALA_PASO = 0o1 / 0o10;
const DEFAUXLTA_MINIMA_SKALO = 0o1 / 0o2;
const MEZA_PEZO = 0o1 / 0o10;
const INTERROMPA_FAKTORO = 0o10;

/* បង្កើតអ្នកកំណត់ល្បឿនស៊ុម និង គុណភាពដោយស្វ័យប្រវត្តិ ។
    @param opcioj ( RultempajOpcioj ) - កម្រិតថវិការបស់ឧបករណ៍
@returns rultempo */
export function kreiRultemon( opcioj: RultempajOpcioj = {} ): Rultempo {
  const malmultekosta = opcioj.malmultekosta ?? false;
  const minimumaSkalo = Math.max( 0o1 / 0o4,
    Math.min( 1, opcioj.minimumaSkalo ?? DEFAUXLTA_MINIMA_SKALO ) );
  let fokusita = true;
  let dinamikaSkalo = 1;
  let sekvaKadro = -Infinity;
  let antaŭaKadro = -Infinity;
  let varmajKadroj = VARMAJ_KADROJ;
  let malrapidajKadroj = 0;
  let rapidajKadroj = 0;
  let bildigitaj = 0;
  let preterpasitaj = 0;
  let mezaKadraDaŭro = malmultekosta
    ? MALMULTA_KADRA_DAŬRO
    : NORMALA_KADRA_DAŬRO;

  function celaKadraDaŭro(): number {
    if ( !fokusita ) return SENFOKUSA_KADRA_DAŬRO;
    return malmultekosta ? MALMULTA_KADRA_DAŬRO : NORMALA_KADRA_DAŬRO;
  }

  function restarigi(): void {
    sekvaKadro = -Infinity;
    antaŭaKadro = -Infinity;
    varmajKadroj = VARMAJ_KADROJ;
    malrapidajKadroj = 0;
    rapidajKadroj = 0;
    mezaKadraDaŭro = celaKadraDaŭro();
  }

  function agordiFokuson( fokusas: boolean ): void {
    if ( fokusita === fokusas ) return;
    fokusita = fokusas;
    restarigi();
  }

  function adapti( daŭro: number, intervalo: number ): void {
    // ⟨ ការផ្អាកយូររបស់ប្រព័ន្ធ ឬ ការដេកមិនមែនជាកម្រិតសមត្ថភាពថ្មីទេ ។
    //   រង់ចាំស៊ុមថ្មីជាជាងកាត់គុណភាពដោយស៊ុមមួយខុសប្រក្រតី ។ 📃 ⟩
    if ( daŭro > intervalo * INTERROMPA_FAKTORO ) {
      malrapidajKadroj = 0;
      rapidajKadroj = 0;
      mezaKadraDaŭro = intervalo;
      return;
    }
    mezaKadraDaŭro += ( daŭro - mezaKadraDaŭro ) * MEZA_PEZO;
    if ( varmajKadroj > 0 ) {
      varmajKadroj--;
      return;
    }
    // ⟨ មធ្យមរារាំងស៊ុមខ្លី និង វែងឆ្លាស់គ្នាពីការកំណត់ខុស ។ ការរាប់
    //   ស៊ុមវែងជាប់គ្នាតែមួយមិនឃើញការលើសទំហំពាក់កណ្តាលពេលទេ ។ 📃 ⟩
    if ( mezaKadraDaŭro > intervalo * MALRAPIDA_FAKTORO ) {
      malrapidajKadroj++;
      rapidajKadroj = 0;
    } else if ( mezaKadraDaŭro < intervalo * RAPIDA_FAKTORO ) {
      rapidajKadroj++;
      malrapidajKadroj = 0;
    } else {
      malrapidajKadroj = 0;
      rapidajKadroj = 0;
    }
    if ( malrapidajKadroj >= MALRAPIDAJ_KADROJ && dinamikaSkalo > minimumaSkalo ) {
      dinamikaSkalo = Math.max( minimumaSkalo, dinamikaSkalo - SKALA_PASO );
      malrapidajKadroj = 0;
    } else if ( rapidajKadroj >= RAPIDAJ_KADROJ && dinamikaSkalo < 1 ) {
      dinamikaSkalo = Math.min( 1, dinamikaSkalo + SKALA_PASO );
      rapidajKadroj = 0;
    }
  }

  function bildigu( nun: number ): boolean {
    const intervalo = celaKadraDaŭro();
    if ( nun + KADRA_TOLEREMO < sekvaKadro ) {
      preterpasitaj++;
      return false;
    }
    if ( sekvaKadro === -Infinity ) sekvaKadro = nun;
    const malfruo = nun - sekvaKadro;
    // ⟨ រក្សាដំណាក់កាលអេក្រង់ដែលមានស៊ុមមិនស្ម៾គ្នា ។ បន្ទាប់ពីការយឺតយ៉ាវ
    //   រំលងស៊ុមចាស់ជាជាងគូរជាប់គ្នាដើម្បីទាស់ស៊ុមដែលបានបាត់ ។ 📃 ⟩
    sekvaKadro = malfruo >= intervalo
      ? nun + intervalo
      : sekvaKadro + intervalo;
    const daŭro = antaŭaKadro === -Infinity
      ? intervalo
      : Math.max( 0, nun - antaŭaKadro );
    antaŭaKadro = nun;
    bildigitaj++;
    adapti( daŭro, intervalo );
    return true;
  }

  return {
    bildigu,
    restarigi,
    agordiFokuson,
    get skalo() { return dinamikaSkalo; },
    get celaKadraDaŭro() { return celaKadraDaŭro(); },
    get bildigitaj() { return bildigitaj; },
    get preterpasitaj() { return preterpasitaj; },
    get mezaKadraDaŭro() { return mezaKadraDaŭro; },
  };
}
