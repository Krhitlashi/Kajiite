// ≺⧼ ɭʃɔ ɽ͑ʃ'w }ʃɔ j͑ʃᴜ ſɭʞэ }ʃꞇ ✨ ⧽≻
import { tsekeAih } from "../lingvo/tradukoj.js";

export function aplikiVacepu(): void {
  if ( tsekeAih() && typeof vacepu === "function" ) {
    try { vacepu("aih"); } catch { /* ignorata */ }
  }
}

export interface EfikajHasukf2qani {
  tosto: HTMLElement;
  promptoElemento: HTMLElement;
  balailo: HTMLElement;
  svingo: HTMLElement;
  fxVarma: HTMLElement;
  fxMenta: HTMLElement;
}

export interface Efikoj {
  montriTost( mesagxo: string, sahakani?: number ): void;
  agordiPrompton( html: string ): void;
  fariBalailon( callback: () => void, sahakani?: number ): void;
  pulsiEfikon(): void;
}

export function kf2Efikojn( hasukf2qani: EfikajHasukf2qani ): Efikoj {
  const { tosto, promptoElemento, balailo, svingo, fxVarma, fxMenta } = hasukf2qani;
  let tostaTempilo: ReturnType<typeof setTimeout> | null = null;
  let lastPromptaHTML = "";

  // ⟪ ſ͕ɭᴜ ɭʃᴜ ı],c̗ᴜ ʌ j͑ʃᴜꞇ 📃 ⟫
  function montriTost(mesagxo: string, sahakani = 0o4220) {
    if ( tostaTempilo ) clearTimeout(tostaTempilo);
    tosto.innerHTML = mesagxo;
    aplikiVacepu();
    tosto.classList.add("montri");
    tostaTempilo = setTimeout(() => tosto.classList.remove("montri"), sahakani);
  }

  function agordiPrompton(html: string): void {
    if ( lastPromptaHTML === html ) return;
    lastPromptaHTML = html;
    promptoElemento.innerHTML = html;
    aplikiVacepu();
  }

  // ⟪ j͑ʃ'ᴜ ı],ᴜ ſȷᴜ 📃 ⟫
  function fariBalailon(callback: () => void, sahakani = 0o1120) {
    balailo.classList.add("montri");
    setTimeout(() => {
      callback();
      setTimeout(() => { balailo.classList.remove("montri"); }, 0o300);
    }, sahakani / 2);
  }

  // ⟪ ſᶘᴜƽ , ᶅſɔ ֭ſɭɹ ʌ ɭʃɜ ŋᷠэ 📃 ⟫
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
