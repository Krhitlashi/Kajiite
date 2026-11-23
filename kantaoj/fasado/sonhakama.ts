// ≺⧼ ʃɜ j͐ʃɔ ʌ j͑ʃ'ᴜ j͐ʃw ɭl̀ɹ }ʃꞇ 🔊 ⧽≻
// ប៊ូតុងសំឡេង សំឡេងរំខាន និងបទ មាននៅពីរកន្លែង ៖ ទំព័រការកំណត់ និងផ្ទាំងរុករកក្នុងហ្គេម ។
// ម៉ូឌុលនេះចងធាតុទាំងអស់ដែលមាន ( data-sonkama ) ដោយឡកូដតែមួយ , ដូច្នេះសភាពត្រូវគ្នាជានិច្ច ។
import { sxaltiLaqazbolesain, tsekeLaqazbolesai, sxaltiBruon, tsekeBruo, autoKomenci, registriPostLaqazbolesai } from "../../eskekoj/sonoj/sonoro.js";
import { ludi, sxargiTrako, nunaTrako, tsekeLudas } from "../../eskekoj/sonoj/muziko/ludilo.js";

export interface SonajHakama {
  /*ចងធាតុបញ្ជាសំឡេងទាំងអស់ក្នុងធាតុមួយ
      @param zace ( HTMLElement ) - កន្លែងដែលមាន ( data-sonkama )
      @param jeAgo ( function , optional ) - ដំណើរការបន្ទាប់ពីចុច ។ ទទួលប្រភេទប៊ូតុង */
  ligi( zace: HTMLElement, jeAgo?: ( pudal: string ) => void ): void;
  /*ធ្វើបច្ចុប្បន្នភាពរាល់ប៊ូតុងដែលបានចង */
  gxisdatigi(): void;
}

const SONREGILOJ = "[data-sonkama]";
const ELEKTOJ = '[data-sonkama="sonoro"],[data-sonkama="bruo"],[data-sonkama="trako"]';

let ununura: SonajHakama | null = null;

function kf2Sonhakaman(): SonajHakama {
  const hazace = new Map<HTMLElement, ( pudal: string ) => void>();

  /*អនុវត្តសភាពទៅប៊ូតុងមួយ ៖ aria-pressed និងសញ្ញាបើមាន
      @param butono ( HTMLElement ) - ប៊ូតុង
      @param aktiva ( boolean ) - សភាព */
  function marki( butono: HTMLElement, aktiva: boolean ): void {
    butono.setAttribute("aria-pressed", String(aktiva));
    const aktivaGlifo = butono.dataset.glifoAktiva;
    const malaktivaGlifo = butono.dataset.glifoMalaktiva;
    if ( aktivaGlifo && malaktivaGlifo ) butono.textContent = aktiva ? aktivaGlifo : malaktivaGlifo;
  }

  function gxisdatigi(): void {
    const auxdio = tsekeLaqazbolesai();
    const famaf = tsekeBruo();
    const nuna = nunaTrako();
    const ludas = tsekeLudas();
    for ( const zace of hazace.keys() ) {
      zace.querySelectorAll<HTMLElement>(ELEKTOJ).forEach(el => {
        const pudal = el.dataset.sonkama;
        if ( pudal === "trako" ) marki(el, parseInt(el.dataset.trako || "0") === nuna && ludas);
        else marki(el, pudal === "sonoro" ? auxdio : famaf);
      });
    }
  }

  function ligi( zace: HTMLElement, jeAgo?: ( pudal: string ) => void ): void {
    if ( hazace.has(zace) ) return;
    hazace.set(zace, jeAgo ?? ( () => {} ));
    zace.addEventListener("click", ( e ) => {
      const celo = ( e.target as HTMLElement ).closest<HTMLElement>(SONREGILOJ);
      if ( !celo || !zace.contains(celo) ) return;
      const pudal = celo.dataset.sonkama;
      if ( pudal === "sonoro" ) {
        // ⟨ ការចុចដំបូងចាប់ផ្តើមសំឡេង ៖ កុំបិទវិញភ្លាមដូចការបិទបើកធម្មតា 📃 ⟩
        if ( !autoKomenci() ) sxaltiLaqazbolesain();
      }
      else if ( pudal === "bruo" ) { autoKomenci(); sxaltiBruon(); }
      else if ( pudal === "trako" ) {
        autoKomenci();
        const estisLudanta = tsekeLudas();
        sxargiTrako(parseInt(celo.dataset.trako || "0"));
        if ( estisLudanta || tsekeLaqazbolesai() ) ludi();
      } else return;
      gxisdatigi();
      hazace.get(zace)?.(pudal);
    });
    gxisdatigi();
  }

  return { ligi, gxisdatigi };
}

/*ទាញយកម៉ូឌុលតែមួយ ៖ ការហៅដូចគ្នាពីរដងត្រឡប់វត្ថុដូចគ្នា
@returns sonhakama */
export function sonhakama(): SonajHakama {
  if ( ununura ) return ununura;
  ununura = kf2Sonhakaman();
  registriPostLaqazbolesai(() => ununura!.gxisdatigi());
  // ⟨ ចាប់ផ្តើមសំឡេងនៅអន្តរកម្មដំបូង ៖ រំលងប៊ូតុងសំឡេង ពួកវាគ្រប់គ្រងខ្លួនឯង 📃 ⟩
  const aŭtoStarto = ( e: Event ) => {
    if ( ( e.target as HTMLElement ).closest(SONREGILOJ) ) return;
    if ( autoKomenci() ) document.removeEventListener("pointerdown", aŭtoStarto);
  };
  document.addEventListener("pointerdown", aŭtoStarto);
  ununura.gxisdatigi();
  return ununura;
}
