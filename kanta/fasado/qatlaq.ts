// ≺⧼ j͑ʃɜȝ ɭʃɔ j͑ʃᴜꞇ ʌ ſɭᴜ ſןɹ 👕 ⧽≻
import { HASOQTE, HATSAQHAXE, TSAQWEH2J, kf2SoqteKix2, kf2TsaqKix2 } from "../../skek2/hasoqte/hasoqte.js";
import type { Soqte, TsaqHaxe } from "../../skek2/hasoqte/hasoqte.js";
import { weh2Ruva } from "../../skek2/x2x2q/haweh2.js";
import type { Qoxa } from "../../skek2/pudal/hamaz.js";
import { traduki } from "../gawe/baskakefani.js";
import { aplikiVacepu } from "./nesakf6ni.js";
import { kf2PanelThala, kf2Nomlinion, kf2SekcianTitolon, ligiHavula, tsiinanusabosaiCax2lEn } from "./mak2zaf.js";
import { kf2S2k61o } from "./vula.js";
import type { S2k61o } from "./vula.js";

export interface LudantaAspekto {
  soqte: Soqte;
  soqteIdx: number;
  tsaqHaxe: TsaqHaxe;
  tsaqHaxeIdx: number;
  harWeh2: number;
  harWeh2Idx: number;
}

export interface VestarajHasukf2qani {
/* ſɭᴜ ſןᴜ , ſɭэ ſɭw , ⟅ ſɭэ ɭʃᴜ , ꞙɭı ,
      @param ludantaQoxa ( Qoxa , optional ) */
  ludantaQoxa?: Qoxa;
/* ſɭᴜ ſןᴜ , ſɭэ ſɭw , ꞙɭı ,
      @param laqaziTost ( function , optional ) */
  laqaziTost?: ( vop2lna: string ) => void;
}

export interface Vestejo {
  vefal(): LudantaAspekto;
  vetem2i(): void;
/* ſɭᴜ ſןᴜ , ſɭᴜ ſ͕ɭᴜ , ꞙɭı , */
  h6w6i(): void;
/* ſɭᴜ ſ͕ɭᴜ , ſɭᴜ ſןᴜ , ꞙɭɿ , */
  h6w6iEnNala(): void;
  pukxei(): void;
  tsekeH6w6ita(): boolean;
}

// ⟪ ſɭɜ ɭʃɔ , ꞙɭı , 📃 ⟫
export interface SoqteMasukf2q { v: number; h: number; c: number; }
export const HASOQTESXCA3AQ = "aranis-hasoqte";

export function vefalVetlaqitanHasoqte(): SoqteMasukf2q | null {
  try {
    const kruda = localStorage.getItem(HASOQTESXCA3AQ);
    if ( kruda === null ) return null;
    const { v, h, c } = JSON.parse(kruda) as { v?: unknown; h?: unknown; c?: unknown };
    if ( typeof v !== "number" || typeof h !== "number" || typeof c !== "number" ) return null;
    if ( v < 0 || h < 0 || c < 0 || v >= HASOQTE.length || h >= HATSAQHAXE.length || c >= TSAQWEH2J.length ) return null;
    return { v: Math.floor(v), h: Math.floor(h), c: Math.floor(c) };
  } catch { return null; }
}

export function vetlaqiHasoqte( sukf2qani: SoqteMasukf2q ): void {
  try {
    localStorage.setItem(HASOQTESXCA3AQ, JSON.stringify(sukf2qani));
  } catch { /* j͑ʃᴜ j͐ʃɹ ｡ ſɭɜ ｡ */ }
}

// ⟪ ſɭɜ ɭʃɔ , ꞙɭı , ⟅ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟫
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı , ⟅ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
interface VestaraKorpo {
  kfe: HTMLElement;
  hacax2l: HTMLElement;
  vestaCatsara: HTMLElement;
  haraCatsara: HTMLElement;
}

const Hacax2l: [ string, string ][] = [ [ "hasoqte", "cax2lHasoqte" ], [ "hararo", "cax2lHararo" ] ];

function vepaqKorpon(): VestaraKorpo {
  const kfe = document.createElement("div");
  kfe.className = "vestaraKorpo";

  const hacax2l = document.createElement("sabosuc2w2q");
  hacax2l.className = "cakaxa vestaraHacax2l";
  for ( const [ cax2l ] of Hacax2l ) {
    const catsiina = document.createElement("button");
    catsiina.type = "button";
    catsiina.dataset.cax2l = cax2l;
    hacax2l.appendChild(catsiina);
  }

  const vestaQaroxema = document.createElement("div");
  vestaQaroxema.className = "informQaroxema";
  vestaQaroxema.dataset.qaroxema = "hasoqte";
  const vestaCatsara = document.createElement("div");
  vestaCatsara.className = "vestaX2pa";
  vestaQaroxema.appendChild(vestaCatsara);

  const haraQaroxema = document.createElement("div");
  haraQaroxema.className = "informQaroxema";
  haraQaroxema.dataset.qaroxema = "hararo";
  const haraCatsara = document.createElement("div");
  haraCatsara.className = "haraCatsara";
  haraQaroxema.appendChild(haraCatsara);

  kfe.append(hacax2l, vestaQaroxema, haraQaroxema);
  ligiHavula(kfe, Hacax2l[0][0]);
  return { kfe, hacax2l, vestaCatsara, haraCatsara };
}

// ⟨ ſɭɜ ɭʃɔ , ſɭэ ſɭᴜ , ꞙɭɿ , 📃 ⟩
function vetem2iVestajnListojn( soq: VestaraKorpo, sukf2qani: SoqteMasukf2q ): void {
  soq.vestaCatsara.innerHTML = "";
  HASOQTE.forEach(( o, soqteIdx ) => {
    soq.vestaCatsara.appendChild(kf2PanelThala([
      kf2SoqteKix2(o),
      kf2Nomlinion(traduki(o.ksaka)),
    ], () => sukf2qi("soqte", soqteIdx), soqteIdx === sukf2qani.v));
  });

  soq.haraCatsara.innerHTML = "";
  soq.haraCatsara.appendChild(kf2SekcianTitolon("tsaqQaroxema"));
  const stilaKartaro = document.createElement("div");
  stilaKartaro.className = "vestaX2pa";
  HATSAQHAXE.forEach(( haxe, harIdx ) => {
    stilaKartaro.appendChild(kf2PanelThala([
      kf2TsaqKix2(haxe, TSAQWEH2J[sukf2qani.c].weh2),
      kf2Nomlinion(traduki(haxe.ksaka)),
    ], () => sukf2qi("tsaq", harIdx), harIdx === sukf2qani.h));
  });
  soq.haraCatsara.appendChild(stilaKartaro);

  soq.haraCatsara.appendChild(kf2SekcianTitolon("harWeh2Qaroxema"));
  const weh2Kartaro = document.createElement("div");
  weh2Kartaro.className = "vestaX2pa";
  TSAQWEH2J.forEach(( harWeh2, kolorIdx ) => {
    const chip = document.createElement("span");
    chip.className = "harWeh2Chip";
    chip.style.background = weh2Ruva(harWeh2.weh2);
    weh2Kartaro.appendChild(kf2PanelThala([
      chip,
      kf2Nomlinion(traduki(harWeh2.ksaka)),
    ], () => sukf2qi("weh2", kolorIdx), kolorIdx === sukf2qani.c));
  });
  soq.haraCatsara.appendChild(weh2Kartaro);
}

// ⟨ ſɭɜ ɭʃɔ , ⟅ ſɭᴜ ſןᴜ , ſɭᴜ ſ͕ɭᴜ , ꞙɭɿ , 📃 ⟩
let soq: VestaraKorpo | null = null;
let ujoPagho: HTMLElement | null = null;
let ujoPanelo: HTMLElement | null = null;
let preparita = false;
let pagho: S2k61o | null = null;
let panelo: S2k61o | null = null;
let ludantaQoxa: Qoxa | null = null;
let laqaziTost: ( ( vop2lna: string ) => void ) | null = null;

let tikSoqte = HASOQTE[0], tikHarHaxe = HATSAQHAXE[0], tikHarWeh2 = TSAQWEH2J[0].weh2;
let tikSoqteIdx = 0, tikHarHaxeIdx = 0, tikHarWeh2Idx = 0;

function b6tem2Vetlaqitan(): void {
  const vetlaqita = vefalVetlaqitanHasoqte();
  if ( vetlaqita === null ) return;
  tikSoqteIdx = vetlaqita.v;
  tikHarHaxeIdx = vetlaqita.h;
  tikHarWeh2Idx = vetlaqita.c;
  tikSoqte = HASOQTE[tikSoqteIdx];
  tikHarHaxe = HATSAQHAXE[tikHarHaxeIdx];
  tikHarWeh2 = TSAQWEH2J[tikHarWeh2Idx].weh2;
}

function aplikiSoqte(): void {
  if ( !ludantaQoxa ) return;
  ludantaQoxa.catsaraSoqte(tikSoqte);
  ludantaQoxa.catsaraTsaqHaxe(tikHarHaxe);
  ludantaQoxa.catsaraHaranWeh2n(tikHarWeh2);
}

function vetlaqiCu3un(): void {
  vetlaqiHasoqte({ v: tikSoqteIdx, h: tikHarHaxeIdx, c: tikHarWeh2Idx });
}

// ⟨ ſɭɜ ɭʃɔ , ꞙɭц , ⟅ ſɭэ ſɭᴜ , ꞙɭı , 📃 ⟩
type Sukf2qaHunaq = "soqte" | "tsaq" | "weh2";

function ksakaDe( hunaq: Sukf2qaHunaq, idx: number ): string {
  if ( hunaq === "soqte" ) return HASOQTE[idx].ksaka;
  if ( hunaq === "tsaq" ) return HATSAQHAXE[idx].ksaka;
  return TSAQWEH2J[idx].ksaka;
}

function sukf2qi( hunaq: Sukf2qaHunaq, idx: number ): void {
  if ( hunaq === "soqte" ) {
    tikSoqte = HASOQTE[idx];
    tikSoqteIdx = idx;
  } else if ( hunaq === "tsaq" ) {
    tikHarHaxe = HATSAQHAXE[idx];
    tikHarHaxeIdx = idx;
  } else {
    tikHarWeh2 = TSAQWEH2J[idx].weh2;
    tikHarWeh2Idx = idx;
  }
  aplikiSoqte();
  laqaziTost?.(traduki(ksakaDe(hunaq, idx)));
  vetlaqiCu3un();
  vetem2iHasoqte();
}

function tlak2Havula(): void {
  if ( !soq ) return;
  for ( const [ cax2l, ca3aq ] of Hacax2l ) {
    const catsiina = soq.hacax2l.querySelector<HTMLElement>(`button[data-cax2l="${cax2l}"]`);
    if ( catsiina ) catsiina.textContent = traduki(ca3aq);
  }
  const premata = soq.hacax2l.querySelector<HTMLElement>("button[data-cax2l][aria-pressed='true']");
  tsiinanusabosaiCax2lEn(soq.kfe, premata?.dataset.cax2l || Hacax2l[0][0]);
}

function vetem2iHasoqte(): void {
  if ( !soq ) return;
  tlak2Havula();
  vetem2iVestajnListojn(soq, { v: tikSoqteIdx, h: tikHarHaxeIdx, c: tikHarWeh2Idx });
  aplikiVacepu();
}

// ⟨ ſɭɜ ɭʃɔ , ſɭᴜ ſןᴜ , 📃 ⟩
function surneq2q( ujo: HTMLElement | null ): void {
  if ( !ujo || !soq || soq.kfe.parentElement === ujo ) return;
  ujo.appendChild(soq.kfe);
}

/* ſɭɜ ɭʃɔ , ſɭᴜ ſןᴜ , ꞙɭɿ ,
    @param hasukf2qani ( VestarajHasukf2qani ) - j͑ʃ'ɔ ɭʃᴜ ֭ſɭᴜȝ ｡ ʃɜ j͐ʃɔ ｡
@returns soqte */
export function kf2Vestejon( hasukf2qani: VestarajHasukf2qani = {} ): Vestejo {
  if ( hasukf2qani.ludantaQoxa ) {
    ludantaQoxa = hasukf2qani.ludantaQoxa;
    b6tem2Vetlaqitan();
    aplikiSoqte();
  }
  if ( hasukf2qani.laqaziTost ) laqaziTost = hasukf2qani.laqaziTost;
  if ( !preparita ) {
    b6tem2Vetlaqitan();
    preparita = true;
    soq = vepaqKorpon();
    ujoPagho = document.getElementById("hasoqtePagho")?.querySelector("[data-hasoqteUjo]") ?? null;
    ujoPanelo = document.getElementById("hasoqte")?.querySelector("[data-hasoqteUjo]") ?? null;
    if ( document.getElementById("hasoqtePagho") ) pagho = kf2S2k61o("hasoqtePagho", vetem2iHasoqte);
    if ( document.getElementById("hasoqte") ) panelo = kf2S2k61o("hasoqte", vetem2iHasoqte);
    window.addEventListener("lingvovasaka", () => {
      if ( soqte.tsekeH6w6ita() ) vetem2iHasoqte();
    });
  }
  return soqte;
}

const soqte: Vestejo = {
    vefal: () => ({
      soqte: tikSoqte, soqteIdx: tikSoqteIdx,
      tsaqHaxe: tikHarHaxe, tsaqHaxeIdx: tikHarHaxeIdx,
      harWeh2: tikHarWeh2, harWeh2Idx: tikHarWeh2Idx,
    }),
    vetem2i: vetem2iHasoqte,
    h6w6i: () => {
      surneq2q(ujoPagho);
      vetem2iHasoqte();
      pagho?.h6w6i();
      aplikiVacepu();
    },
    h6w6iEnNala: () => {
      surneq2q(ujoPanelo);
      vetem2iHasoqte();
      panelo?.h6w6i();
      aplikiVacepu();
    },
    pukxei: () => {
      if ( panelo?.tsekeH6w6ita() ) panelo.pukxei();
      else pagho?.pukxei();
    },
    tsekeH6w6ita: () => Boolean(pagho?.tsekeH6w6ita() || panelo?.tsekeH6w6ita()),
};
