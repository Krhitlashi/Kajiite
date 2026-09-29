// ≺⧼ Fasado-efikoj ✨ ⧽≻
// La komunaj iloj de la fasado — la tosto, la promptilo, la balaila transiro,
// la svingo-efikoj kaj la vacepu-volvaĵo ( la aih-a lingvo ). Ĉiu tenas sian
// propran staton kaj la orkestrilo nur vokas ilin, do la buklo restas sen
// fasada rubo.
import { cxuAih } from "../lingvo/tradukoj.js";

// aplikiVacepu — Envolvi la vortojn de la flosantaj kartoj en la aih-a lingvo.
// La modulo mem ne havas staton — ĝi nur legas la lingvon kaj la eksteran
// scripton.
export function aplikiVacepu(): void {
  if ( cxuAih() && typeof vacepu === "function" ) {
    // La ekstera vacepu-scripto abortas meze kiam .aih-elementoj estas
    // nestitaj ( la panelo enhavas la kartojn ) — la teksto jam estas
    // envolvita tiukaze. Ne lasu la escepton rompi la fluon ( ekz. la
    // malfermo de la vestaro ).
    try { vacepu("aih"); } catch { /* ignorata */ }
  }
}

// EfikajOpcioj — la elementoj de la fasado, kiujn la efektoj bezonas. La tosto
// kaj la promptilo ankaŭ apartenas al la orkestrilo ( la retilo montras toston,
// la buklo skribas la prompton ), do ili venas ĉi tien anstataŭ esti serĉataj
// duafoje.
export interface EfikajOpcioj {
  tosto: HTMLElement;
  promptoElemento: HTMLElement;
  balailo: HTMLElement;
  svingo: HTMLElement;
  fxVarma: HTMLElement;
  fxMenta: HTMLElement;
}

// Efikoj — la kvar efektaj agoj kun sia propra statoteno ( la tosta tempigilo
// kaj la lasta prompta teksto restas private ĉi tie ).
export interface Efikoj {
  montriTost( mesagxo: string, daŭro?: number ): void;
  agordiPrompton( html: string ): void;
  fariBalailon( callback: () => void, daŭro?: number ): void;
  pulsiEfikon(): void;
}

export function kreiEfikojn( opcioj: EfikajOpcioj ): Efikoj {
  const { tosto, promptoElemento, balailo, svingo, fxVarma, fxMenta } = opcioj;
  let tostaTempilo: ReturnType<typeof setTimeout> | null = null;
  // La prompto sxangxigxas cxiun kadron. Envolvu nur kiam la teksto vere sxangxigxis.
  let lastPromptaHTML = "";

  // ⟪ Tosta sistemo 📃 ⟫
  function montriTost(mesagxo: string, daŭro = 0o4220) {
    if ( tostaTempilo ) clearTimeout(tostaTempilo);
    tosto.innerHTML = mesagxo;
    // La aih-a noto bezonas la vacepu-vortojn post cxiu gxisdatigo.
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

  // ⟪ Balaila transiro 📃 ⟫
  function fariBalailon(callback: () => void, daŭro = 0o1120) {
    balailo.classList.add("montri");
    setTimeout(() => {
      callback();
      setTimeout(() => { balailo.classList.remove("montri"); }, 0o300);
    }, daŭro / 2);
  }

  // ⟪ Svingo kaj kolor-efikoj 📃 ⟫
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
