// ≺⧼ ʃɜ j͐ʃɔ ʌ j͑ʃ'ᴜ j͐ʃw ɭl̀ɹ }ʃꞇ 🔊 ⧽≻
// ſȷwɔ˞ , ſןɔ˞ᴜƴ , ꞙɭɿ , ⟅ ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭı , ⟅ ſɭɜ ɭʃᴜ , ꞙɭı ,
import { sxaltiLaqazbolesain, tsekeLaqazbolesai, sxaltiBruon, tsekeBruo, autoKomenci, registriPostLaqazbolesai } from "../../eskekoj/sonoj/sonoro.js";
import { ludi, sxargiTrako, nunaTrako, tsekeLudas } from "../../eskekoj/sonoj/muziko/ludilo.js";

export interface SonajHakama {
/* ſȷwɔ˞ , ſןɔ˞ᴜƴ , ꞙɭı ,
      @param zace ( HTMLElement ) - កន្លែងដែលមាន ( data-sonkama )
      @param jeAgo ( function , optional ) - ដំណើរការបន្ទាប់ពីចុច ។ ទទួលប្រភេទប៊ូតុង */
  ligi( zace: HTMLElement, jeAgo?: ( pudal: string ) => void ): void;
/* ſȷwɔ˞ , ſןɔ˞ᴜƴ , ꞙɭɿ , */
  gxisdatigi(): void;
}

const SONREGILOJ = "[data-sonkama]";
const ELEKTOJ = '[data-sonkama="sonoro"],[data-sonkama="bruo"],[data-sonkama="trako"]';

let ununura: SonajHakama | null = null;

function kf2Sonhakaman(): SonajHakama {
  const hazace = new Map<HTMLElement, ( pudal: string ) => void>();

/* ſȷwɔ˞ , ſןɔ˞ᴜƴ , ꞙɭı , ⟅ ſȷwɔ˞ , ꞙɭɿ ,
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
// ⟨ ſȷwɔ˞ , ꞙɭı , ⟅ ſȷwɔ˞ , ꞙɭɿ , 📃 ⟩
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

/* ſȷwɔ˞ , ꞙɭı , ⟅ j͑ʃᴜ ſɭ,w , ꞙɭɿ ,
@returns sonhakama */
export function sonhakama(): SonajHakama {
  if ( ununura ) return ununura;
  ununura = kf2Sonhakaman();
  registriPostLaqazbolesai(() => ununura!.gxisdatigi());
// ⟨ ſȷwɔ˞ , ꞙɭı , ⟅ ſȷwɔ˞ , ꞙɭɿ , 📃 ⟩
  const aŭtoStarto = ( e: Event ) => {
    if ( ( e.target as HTMLElement ).closest(SONREGILOJ) ) return;
    if ( autoKomenci() ) document.removeEventListener("pointerdown", aŭtoStarto);
  };
  document.addEventListener("pointerdown", aŭtoStarto);
  ununura.gxisdatigi();
  return ununura;
}
