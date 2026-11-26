// ≺⧼ ɭʃɔ ɽ͑ʃ'w }ʃɔ j͑ʃᴜ ſɭʞэ }ʃꞇ ✨ ⧽≻
import { tsekeAih } from "../gawe/baskakefani.js";

export function aplikiVacepu(): void {
  if ( tsekeAih() && typeof vacepu === "function" ) {
    try { vacepu("aih"); } catch { /* ignorata */ }
  }
}

export interface EfikajHasukf2qani {
  tosto: HTMLElement;
  x2paKfe: HTMLElement;
  balailo: HTMLElement;
  kagani: HTMLElement;
  fxKafs2: HTMLElement;
  fxMenta: HTMLElement;
}

export interface Efikoj {
  laqaziTost( vop2lna: string, sahakani?: number ): void;
  catsaraX2pa( html: string ): void;
  fariBalailon( callback: () => void, sahakani?: number ): void;
  pulsiEfikon(): void;
}

export function kf2Efikojn( hasukf2qani: EfikajHasukf2qani ): Efikoj {
  const { tosto, x2paKfe, balailo, kagani, fxKafs2, fxMenta } = hasukf2qani;
  let tostaTempilo: ReturnType<typeof setTimeout> | null = null;
  let lastPromptaHTML = "";

  // ⟪ ſ͕ɭᴜ ɭʃᴜ ı],c̗ᴜ ʌ j͑ʃᴜꞇ 📃 ⟫
  function laqaziTost(vop2lna: string, sahakani = 0o4220) {
    if ( tostaTempilo ) clearTimeout(tostaTempilo);
    tosto.innerHTML = vop2lna;
    aplikiVacepu();
    tosto.classList.add("laqazi");
    tostaTempilo = setTimeout(() => tosto.classList.remove("laqazi"), sahakani);
  }

  function catsaraX2pa(html: string): void {
    if ( lastPromptaHTML === html ) return;
    lastPromptaHTML = html;
    x2paKfe.innerHTML = html;
    aplikiVacepu();
  }

  // ⟪ j͑ʃ'ᴜ ı],ᴜ ſȷᴜ 📃 ⟫
  function fariBalailon(callback: () => void, sahakani = 0o1120) {
    balailo.classList.add("laqazi");
    setTimeout(() => {
      callback();
      setTimeout(() => { balailo.classList.remove("laqazi"); }, 0o300);
    }, sahakani / 0o2);
  }

  // ⟪ ſᶘᴜƽ , ᶅſɔ ֭ſɭɹ ʌ ɭʃɜ ŋᷠэ 📃 ⟫
  function pulsiEfikon() {
    kagani.classList.remove("iru");
    void kagani.offsetWidth;
    kagani.classList.add("iru");
    fxKafs2.classList.remove("fxPulso");
    void fxKafs2.offsetWidth;
    fxKafs2.classList.add("fxPulso");
    setTimeout(() => {
      fxMenta.classList.remove("fxPulso");
      void fxMenta.offsetWidth;
      fxMenta.classList.add("fxPulso");
    }, 0o300);
  }

  return { laqaziTost, catsaraX2pa, fariBalailon, pulsiEfikon };
}
