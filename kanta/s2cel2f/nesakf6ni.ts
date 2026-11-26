// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ }ʃɔ j͑ʃᴜ ſɭʞэ }ʃꞇ 📃 ⧽≻

import { tsekeAih } from "../gawe/baskakefani.js";

export function k2reiVacepu(): void {
  if ( tsekeAih() && typeof vacepu === "function" ) {
    try { vacepu("aih"); } catch {  }
  }
}

export interface EfikajHasukf2qani {
  k61e: HTMLElement;
  x2paKfe: HTMLElement;
  balailo: HTMLElement;
  kagani: HTMLElement;
  fxKafs2: HTMLElement;
  fxMenta: HTMLElement;
}

export interface Efikoj {
  laqaziK61e( vop2lna: string, sahakani?: number ): void;
  catsaraX2pa( html: string ): void;
  kf2J2ko( cal: () => void, sahakani?: number ): void;
  pulsiEfikon(): void;
}

export function kf2Efikojn( hasukf2qani: EfikajHasukf2qani ): Efikoj {
  const { k61e, x2paKfe, balailo, kagani, fxKafs2, fxMenta } = hasukf2qani;
  let tostaTempilo: ReturnType<typeof setTimeout> | null = null;
  let tlakakaiKsaka = "";

  function laqaziK61e(vop2lna: string, sahakani = 0o4220) {
    if ( tostaTempilo ) clearTimeout(tostaTempilo);
    k61e.innerHTML = vop2lna;
    k2reiVacepu();
    k61e.classList.add("laqazi");
    tostaTempilo = setTimeout(() => k61e.classList.remove("laqazi"), sahakani);
  }

  function catsaraX2pa(html: string): void {
    if ( tlakakaiKsaka === html ) return;
    tlakakaiKsaka = html;
    x2paKfe.innerHTML = html;
    k2reiVacepu();
  }

  function kf2J2ko(cal: () => void, sahakani = 0o1120) {
    balailo.classList.add("laqazi");
    setTimeout(() => {
      cal();
      setTimeout(() => { balailo.classList.remove("laqazi"); }, 0o300);
    }, sahakani / 0o2);
  }

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

  return { laqaziK61e, catsaraX2pa, kf2J2ko, pulsiEfikon };
}
