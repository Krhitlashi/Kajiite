// ≺⧼ ʃɜ j͐ʃɔ ʌ j͑ʃ'ᴜ j͐ʃw ɭl̀ɹ }ʃꞇ 🔊 ⧽≻
// ſȷwɔ˞ , ſןɔ˞ᴜƴ , ꞙɭɿ , ⟅ ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭı , ⟅ ſɭɜ ɭʃᴜ , ꞙɭı ,
import { tsiinanusabosaiLaqazbolesain, tsekeLaqazbolesai, tsiinanusabosaiBruon, tsekeBruo, autoSaxei, registriPostLaqazbolesai } from "../../skek2/bole/boleS2t2bakano.js";
import { veqapahakani, b6tem2T2bakobesai, cutluT2bakobesai, tsekeVeqapahakani } from "../../skek2/bole/swikez/cagaqi.js";

export interface SonajHakama {
/* ſȷwɔ˞ , ſןɔ˞ᴜƴ , ꞙɭı ,
      @param zace ( HTMLElement ) - កន្លែងដែលមាន ( data-sonkama )
      @param jeAgo ( function , optional ) - ដំណើរការបន្ទាប់ពីចុច ។ ទទួលប្រភេទប៊ូតុង */
  ligi( zace: HTMLElement, jeAgo?: ( pudal: string ) => void ): void;
/* ſȷwɔ˞ , ſןɔ˞ᴜƴ , ꞙɭɿ , */
  tlak2(): void;
}

const SONREGHACAHT2 = "[data-sonkama]";
const SUKF2QOJ = '[data-sonkama="bolero"],[data-sonkama="bruo"],[data-sonkama="t2bakobesai"]';

let ununura: SonajHakama | null = null;

function kf2Sonhakaman(): SonajHakama {
  const hazace = new Map<HTMLElement, ( pudal: string ) => void>();

/* ſȷwɔ˞ , ſןɔ˞ᴜƴ , ꞙɭı , ⟅ ſȷwɔ˞ , ꞙɭɿ ,
      @param catsiina ( HTMLElement ) - ប៊ូតុង
      @param tik ( boolean ) - សភាព */
  function s2tas( catsiina: HTMLElement, tik: boolean ): void {
    catsiina.setAttribute("aria-pressed", String(tik));
    const tikGlifo = catsiina.dataset.glifoAktiva;
    const malaktivaGlifo = catsiina.dataset.glifoMalaktiva;
    if ( tikGlifo && malaktivaGlifo ) catsiina.textContent = tik ? tikGlifo : malaktivaGlifo;
  }

  function tlak2(): void {
    const auxdio = tsekeLaqazbolesai();
    const famaf = tsekeBruo();
    const cutlu = cutluT2bakobesai();
    const veqapahakani = tsekeVeqapahakani();
    for ( const zace of hazace.keys() ) {
      zace.querySelectorAll<HTMLElement>(SUKF2QOJ).forEach(el => {
        const pudal = el.dataset.sonkama;
        if ( pudal === "t2bakobesai" ) s2tas(el, parseInt(el.dataset.t2bakobesai || "0") === cutlu && veqapahakani);
        else s2tas(el, pudal === "bolero" ? auxdio : famaf);
      });
    }
  }

  function ligi( zace: HTMLElement, jeAgo?: ( pudal: string ) => void ): void {
    if ( hazace.has(zace) ) return;
    hazace.set(zace, jeAgo ?? ( () => {} ));
    zace.addEventListener("click", ( e ) => {
      const natakatomasai = ( e.target as HTMLElement ).closest<HTMLElement>(SONREGHACAHT2);
      if ( !natakatomasai || !zace.contains(natakatomasai) ) return;
      const pudal = natakatomasai.dataset.sonkama;
      if ( pudal === "bolero" ) {
// ⟨ ſȷwɔ˞ , ꞙɭı , ⟅ ſȷwɔ˞ , ꞙɭɿ , 📃 ⟩
        if ( !autoSaxei() ) tsiinanusabosaiLaqazbolesain();
      }
      else if ( pudal === "bruo" ) { autoSaxei(); tsiinanusabosaiBruon(); }
      else if ( pudal === "t2bakobesai" ) {
        autoSaxei();
        const estisLudanta = tsekeVeqapahakani();
        b6tem2T2bakobesai(parseInt(natakatomasai.dataset.t2bakobesai || "0"));
        if ( estisLudanta || tsekeLaqazbolesai() ) veqapahakani();
      } else return;
      tlak2();
      hazace.get(zace)?.(pudal);
    });
    tlak2();
  }

  return { ligi, tlak2 };
}

/* ſȷwɔ˞ , ꞙɭı , ⟅ j͑ʃᴜ ſɭ,w , ꞙɭɿ ,
@returns sonhakama */
export function sonhakama(): SonajHakama {
  if ( ununura ) return ununura;
  ununura = kf2Sonhakaman();
  registriPostLaqazbolesai(() => ununura!.tlak2());
// ⟨ ſȷwɔ˞ , ꞙɭı , ⟅ ſȷwɔ˞ , ꞙɭɿ , 📃 ⟩
  const aŭtoStarto = ( e: Event ) => {
    if ( ( e.target as HTMLElement ).closest(SONREGHACAHT2) ) return;
    if ( autoSaxei() ) document.removeEventListener("pointerdown", aŭtoStarto);
  };
  document.addEventListener("pointerdown", aŭtoStarto);
  ununura.tlak2();
  return ununura;
}
