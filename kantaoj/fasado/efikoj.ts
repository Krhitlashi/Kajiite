// ≺⧼ បែបផែនមុខ ✨ ⧽≻
import { cxuAih } from "../lingvo/tradukoj.js";

export function aplikiVacepu(): void {
  if ( cxuAih() && typeof vacepu === "function" ) {
    try { vacepu("aih"); } catch { /* ignorata */ }
  }
}

export interface EfikajOpcioj {
  tosto: HTMLElement;
  promptoElemento: HTMLElement;
  balailo: HTMLElement;
  svingo: HTMLElement;
  fxVarma: HTMLElement;
  fxMenta: HTMLElement;
}

export interface Efikoj {
  montriTost( mesagxo: string, daŭro?: number ): void;
  agordiPrompton( html: string ): void;
  fariBalailon( callback: () => void, daŭro?: number ): void;
  pulsiEfikon(): void;
}

export function kreiEfikojn( opcioj: EfikajOpcioj ): Efikoj {
  const { tosto, promptoElemento, balailo, svingo, fxVarma, fxMenta } = opcioj;
  let tostaTempilo: ReturnType<typeof setTimeout> | null = null;
  let lastPromptaHTML = "";

  // ⟪ ប្រព័ន្ធជូនដំណឹង 📃 ⟫
  function montriTost(mesagxo: string, daŭro = 0o4220) {
    if ( tostaTempilo ) clearTimeout(tostaTempilo);
    tosto.innerHTML = mesagxo;
    aplikiVacepu();
    tosto.classList.add("montri");
    tostaTempilo = setTimeout(() => tosto.classList.remove("montri"), daŭro);
  }

  function agordiPrompton(html: string): void {
    if ( lastPromptaHTML === html ) return;
    lastPromptaHTML = html;
    promptoElemento.innerHTML = html;
    aplikiVacepu();
  }

  // ⟪ ការផ្លាស់ប្តូរបាឡាឡា 📃 ⟫
  function fariBalailon(callback: () => void, daŭro = 0o1120) {
    balailo.classList.add("montri");
    setTimeout(() => {
      callback();
      setTimeout(() => { balailo.classList.remove("montri"); }, 0o300);
    }, daŭro / 2);
  }

  // ⟪ ការយោល និងបែបផែនពណ៌ 📃 ⟫
  function pulsiEfikon() {
    svingo.classList.remove("iru");
    void svingo.offsetWidth;
    svingo.classList.add("iru");
    fxVarma.classList.remove("fxPulso");
    void fxVarma.offsetWidth;
    fxVarma.classList.add("fxPulso");
    setTimeout(() => {
      fxMenta.classList.remove("fxPulso");
      void fxMenta.offsetWidth;
      fxMenta.classList.add("fxPulso");
    }, 0o300);
  }

  return { montriTost, agordiPrompton, fariBalailon, pulsiEfikon };
}
