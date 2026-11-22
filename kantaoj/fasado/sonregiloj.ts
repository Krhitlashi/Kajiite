// ≺⧼ ការបញ្ជាសំឡេង 🔊 ⧽≻
// ប៊ូតុងសំឡេង សំឡេងរំខាន និងបទ មាននៅពីរកន្លែង ៖ ទំព័រការកំណត់ និងផ្ទាំងរុករកក្នុងហ្គេម ។
// ម៉ូឌុលនេះចងធាតុទាំងអស់ដែលមាន ( data-sonregilo ) ដោយឡកូដតែមួយ , ដូច្នេះសភាពត្រូវគ្នាជានិច្ច ។
import { sxaltiAŭdion, cxuAŭdio, sxaltiBruon, cxuBruo, autoKomenci, registriPostAŭdio } from "../../eskekoj/sonoj/sonoro.js";
import { ludi, sxargiTrako, nunaTrako, cxuLudas } from "../../eskekoj/sonoj/muziko/ludilo.js";

export interface SonajRegiloj {
  /*ចងធាតុបញ្ជាសំឡេងទាំងអស់ក្នុងធាតុមួយ
      @param zace ( HTMLElement ) - កន្លែងដែលមាន ( data-sonregilo )
      @param jeAgo ( function , optional ) - ដំណើរការបន្ទាប់ពីចុច ។ ទទួលប្រភេទប៊ូតុង */
  ligi( zace: HTMLElement, jeAgo?: ( speco: string ) => void ): void;
  /*ធ្វើបច្ចុប្បន្នភាពរាល់ប៊ូតុងដែលបានចង */
  gxisdatigi(): void;
}

const SONREGILOJ = "[data-sonregilo]";
const ELEKTOJ = '[data-sonregilo="sonoro"],[data-sonregilo="bruo"],[data-sonregilo="trako"]';

let ununura: SonajRegiloj | null = null;

function kreiSonregilojn(): SonajRegiloj {
  const hazace = new Map<HTMLElement, ( speco: string ) => void>();

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
    const auxdio = cxuAŭdio();
    const famaf = cxuBruo();
    const nuna = nunaTrako();
    const ludas = cxuLudas();
    for ( const zace of hazace.keys() ) {
      zace.querySelectorAll<HTMLElement>(ELEKTOJ).forEach(el => {
        const speco = el.dataset.sonregilo;
        if ( speco === "trako" ) marki(el, parseInt(el.dataset.trako || "0") === nuna && ludas);
        else marki(el, speco === "sonoro" ? auxdio : famaf);
      });
    }
  }

  function ligi( zace: HTMLElement, jeAgo?: ( speco: string ) => void ): void {
    if ( hazace.has(zace) ) return;
    hazace.set(zace, jeAgo ?? ( () => {} ));
    zace.addEventListener("click", ( e ) => {
      const celo = ( e.target as HTMLElement ).closest<HTMLElement>(SONREGILOJ);
      if ( !celo || !zace.contains(celo) ) return;
      const speco = celo.dataset.sonregilo;
      if ( speco === "sonoro" ) {
        // ⟨ ការចុចដំបូងចាប់ផ្តើមសំឡេង ៖ កុំបិទវិញភ្លាមដូចការបិទបើកធម្មតា 📃 ⟩
        if ( !autoKomenci() ) sxaltiAŭdion();
      }
      else if ( speco === "bruo" ) { autoKomenci(); sxaltiBruon(); }
      else if ( speco === "trako" ) {
        autoKomenci();
        const estisLudanta = cxuLudas();
        sxargiTrako(parseInt(celo.dataset.trako || "0"));
        if ( estisLudanta || cxuAŭdio() ) ludi();
      } else return;
      gxisdatigi();
      hazace.get(zace)?.(speco);
    });
    gxisdatigi();
  }

  return { ligi, gxisdatigi };
}

/*ទាញយកម៉ូឌុលតែមួយ ៖ ការហៅដូចគ្នាពីរដងត្រឡប់វត្ថុដូចគ្នា
@returns sonregiloj */
export function sonregiloj(): SonajRegiloj {
  if ( ununura ) return ununura;
  ununura = kreiSonregilojn();
  registriPostAŭdio(() => ununura!.gxisdatigi());
  // ⟨ ចាប់ផ្តើមសំឡេងនៅអន្តរកម្មដំបូង ៖ រំលងប៊ូតុងសំឡេង ពួកវាគ្រប់គ្រងខ្លួនឯង 📃 ⟩
  const aŭtoStarto = ( e: Event ) => {
    if ( ( e.target as HTMLElement ).closest(SONREGILOJ) ) return;
    if ( autoKomenci() ) document.removeEventListener("pointerdown", aŭtoStarto);
  };
  document.addEventListener("pointerdown", aŭtoStarto);
  ununura.gxisdatigi();
  return ununura;
}
