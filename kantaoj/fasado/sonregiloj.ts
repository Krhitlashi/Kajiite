// ≺⧼ ការបញ្ជាសំឡេង 🔊 ⧽≻
// ប៊ូតុងសំឡេង សំឡេងរំខាន និងបទ មាននៅពីរកន្លែង ៖ ទំព័រការកំណត់ និងផ្ទាំងរុករកក្នុងហ្គេម ។
// ម៉ូឌុលនេះចងធាតុទាំងអស់ដែលមាន ( data-sonregilo ) ដោយឡកូដតែមួយ , ដូច្នេះសភាពត្រូវគ្នាជានិច្ច ។
import { sxaltiAŭdion, cxuAŭdio, sxaltiBruon, cxuBruo, autoKomenci, registriPostAŭdio } from "../../eskekoj/sonoj/sonoro.js";
import { ludi, sxargiTrako, nunaTrako, cxuLudas } from "../../eskekoj/sonoj/muziko/ludilo.js";

export interface SonajRegiloj {
  /*ចងធាតុបញ្ជាសំឡេងទាំងអស់ក្នុងធាតុមួយ
      @param radiko ( HTMLElement ) - កន្លែងដែលមាន ( data-sonregilo )
      @param jeAgo ( function , optional ) - ដំណើរការបន្ទាប់ពីចុច ។ ទទួលប្រភេទប៊ូតុង */
  ligi( radiko: HTMLElement, jeAgo?: ( speco: string ) => void ): void;
  /*ធ្វើបច្ចុប្បន្នភាពរាល់ប៊ូតុងដែលបានចង */
  gxisdatigi(): void;
}

const SONREGILOJ = '[data-sonregilo]';
const ELEKTOJ = '[data-sonregilo="sonoro"],[data-sonregilo="bruo"],[data-sonregilo="trako"]';

let ununura: SonajRegiloj | null = null;

function kreiSonregilojn(): SonajRegiloj {
  const radikoj = new Map<HTMLElement, ( speco: string ) => void>();

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
    const bruo = cxuBruo();
    const nuna = nunaTrako();
    const ludas = cxuLudas();
    for ( const radiko of radikoj.keys() ) {
      radiko.querySelectorAll<HTMLElement>(ELEKTOJ).forEach(el => {
        const speco = el.dataset.sonregilo;
        if ( speco === "trako" ) marki(el, parseInt(el.dataset.trako || "0") === nuna && ludas);
        else marki(el, speco === "sonoro" ? auxdio : bruo);
      });
    }
  }

  function ligi( radiko: HTMLElement, jeAgo?: ( speco: string ) => void ): void {
    if ( radikoj.has(radiko) ) return;
    radikoj.set(radiko, jeAgo ?? ( () => {} ));
    radiko.addEventListener("click", ( e ) => {
      const celo = ( e.target as HTMLElement ).closest<HTMLElement>(SONREGILOJ);
      if ( !celo || !radiko.contains(celo) ) return;
      const speco = celo.dataset.sonregilo;
      if ( speco === "sonoro" ) sxaltiAŭdion();
      else if ( speco === "bruo" ) sxaltiBruon();
      else if ( speco === "trako" ) {
        const estisLudanta = cxuLudas();
        sxargiTrako(parseInt(celo.dataset.trako || "0"));
        if ( estisLudanta || cxuAŭdio() ) ludi();
      } else return;
      gxisdatigi();
      radikoj.get(radiko)?.(speco);
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
  document.addEventListener("pointerdown", () => autoKomenci(), { once: true });
  ununura.gxisdatigi();
  return ununura;
}
