// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ſ͕ɭᴜ ſ̀ȷᴜȝ 📃 ⧽≻

import { HASOQTE, HATSAQHAXE, TSAQWEH2J, kf2SoqteKix2, kf2TsaqKix2 } from "../../skek2/hasoqte/hasoqte.js";
import type { Soqte, TsaqHaxe } from "../../skek2/hasoqte/hasoqte.js";
import { weh2Ruva } from "../../skek2/p6kpu/haweh2.js";
import type { Qoxa } from "../../skek2/pudal/hamaz.js";
import { skakef } from "../gawe/baskakefani.js";
import { k2reiVacepu } from "./nesakf6ni.js";
import { kf2PanelThala, kf2Nomlinion, kf2Ksakap2san, ligiHavula, tsiinanusabosaiCax2lEn } from "./mak2zaf.js";
import { kf2S2k61o } from "./vula.js";
import type { S2k61o } from "./vula.js";

export interface S2qenaHaba {
  soqte: Soqte;
  soqteIdx: number;
  tsaqHaxe: TsaqHaxe;
  tsaqHaxeIdx: number;
  harWeh2: number;
  harWeh2Idx: number;
}

export interface SoqteHasukf2qani {

  s2qenaQoxa?: Qoxa;

  laqaziK61e?: ( vop2lna: string ) => void;
}

export interface SoqteHakama {
  vefal(): S2qenaHaba;
  vetem2i(): void;

  h6w6i(): void;

  h6w6iEnNala(): void;
  kobe(): void;
  tsekeH6w6ita(): boolean;
}

export interface SoqteMasukf2q { v: number; h: number; c: number; }
export const HASOQTESXCA3AQ = "aranis-hasoqte";

export function vefalVetlaqitanHasoqte(): SoqteMasukf2q | null {
  try {
    const caqavop2 = localStorage.getItem(HASOQTESXCA3AQ);
    if ( caqavop2 === null ) return null;
    const { v, h, c } = JSON.parse(caqavop2) as { v?: unknown; h?: unknown; c?: unknown };
    if ( typeof v !== "number" || typeof h !== "number" || typeof c !== "number" ) return null;
    if ( v < 0o0 || h < 0o0 || c < 0o0 || v >= HASOQTE.length || h >= HATSAQHAXE.length || c >= TSAQWEH2J.length ) return null;
    return { v: Math.floor(v), h: Math.floor(h), c: Math.floor(c) };
  } catch { return null; }
}

export function vetlaqiHasoqte( sukf2qani: SoqteMasukf2q ): void {
  try {
    localStorage.setItem(HASOQTESXCA3AQ, JSON.stringify(sukf2qani));
  } catch {  }
}

interface SoqteKfe {
  kfe: HTMLElement;
  hacax2l: HTMLElement;
  soqteCatsara: HTMLElement;
  haxeCatsara: HTMLElement;
}

const Hacax2l: [ string, string ][] = [ [ "hasoqte", "cax2lHasoqte" ], [ "hararo", "cax2lHararo" ] ];

function vepaqSoqteKfon(): SoqteKfe {
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

  const soqteQaroxema = document.createElement("div");
  soqteQaroxema.className = "informQaroxema";
  soqteQaroxema.dataset.qaroxema = "hasoqte";
  const soqteCatsara = document.createElement("div");
  soqteCatsara.className = "vestaX2pa";
  soqteQaroxema.appendChild(soqteCatsara);

  const haxeQaroxema = document.createElement("div");
  haxeQaroxema.className = "informQaroxema";
  haxeQaroxema.dataset.qaroxema = "hararo";
  const haxeCatsara = document.createElement("div");
  haxeCatsara.className = "haxeCatsara";
  haxeQaroxema.appendChild(haxeCatsara);

  kfe.append(hacax2l, soqteQaroxema, haxeQaroxema);
  ligiHavula(kfe, Hacax2l[0o0][0o0]);
  return { kfe, hacax2l, soqteCatsara, haxeCatsara };
}

function vetem2iSoqteCa1arojn( kfeSoqte: SoqteKfe, sukf2qani: SoqteMasukf2q ): void {
  kfeSoqte.soqteCatsara.innerHTML = "";
  HASOQTE.forEach(( o, soqteIdx ) => {
    kfeSoqte.soqteCatsara.appendChild(kf2PanelThala([
      kf2SoqteKix2(o),
      kf2Nomlinion(skakef(o.ksaka)),
    ], () => sukf2qi("soqte", soqteIdx), soqteIdx === sukf2qani.v));
  });

  kfeSoqte.haxeCatsara.innerHTML = "";
  kfeSoqte.haxeCatsara.appendChild(kf2Ksakap2san("tsaqQaroxema"));
  const haxeKartaro = document.createElement("div");
  haxeKartaro.className = "vestaX2pa";
  HATSAQHAXE.forEach(( haxe, harIdx ) => {
    haxeKartaro.appendChild(kf2PanelThala([
      kf2TsaqKix2(haxe, TSAQWEH2J[sukf2qani.c].weh2),
      kf2Nomlinion(skakef(haxe.ksaka)),
    ], () => sukf2qi("tsaq", harIdx), harIdx === sukf2qani.h));
  });
  kfeSoqte.haxeCatsara.appendChild(haxeKartaro);

  kfeSoqte.haxeCatsara.appendChild(kf2Ksakap2san("harWeh2Qaroxema"));
  const weh2Kartaro = document.createElement("div");
  weh2Kartaro.className = "vestaX2pa";
  TSAQWEH2J.forEach(( harWeh2, weh2Idx ) => {
    const weh2Kfe = document.createElement("span");
    weh2Kfe.className = "harWeh2Kfe";
    weh2Kfe.style.background = weh2Ruva(harWeh2.weh2);
    weh2Kartaro.appendChild(kf2PanelThala([
      weh2Kfe,
      kf2Nomlinion(skakef(harWeh2.ksaka)),
    ], () => sukf2qi("weh2", weh2Idx), weh2Idx === sukf2qani.c));
  });
  kfeSoqte.haxeCatsara.appendChild(weh2Kartaro);
}

let kfeSoqte: SoqteKfe | null = null;
let vulaKfe: HTMLElement | null = null;
let qaroxemaKfe: HTMLElement | null = null;
let amal = false;
let vula: S2k61o | null = null;
let qaroxema: S2k61o | null = null;
let s2qenaQoxa: Qoxa | null = null;
let laqaziK61e: ( ( vop2lna: string ) => void ) | null = null;

let tikSoqte = HASOQTE[0o0], tikHarHaxe = HATSAQHAXE[0o0], tikHarWeh2 = TSAQWEH2J[0o0].weh2;
let tikSoqteIdx = 0o0, tikHarHaxeIdx = 0o0, tikHarWeh2Idx = 0o0;

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

function k2reiSoqte(): void {
  if ( !s2qenaQoxa ) return;
  s2qenaQoxa.catsaraSoqte(tikSoqte);
  s2qenaQoxa.catsaraTsaqHaxe(tikHarHaxe);
  s2qenaQoxa.catsaraHaranWeh2n(tikHarWeh2);
}

function vetlaqiCu3un(): void {
  vetlaqiHasoqte({ v: tikSoqteIdx, h: tikHarHaxeIdx, c: tikHarWeh2Idx });
}

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
  k2reiSoqte();
  laqaziK61e?.(skakef(ksakaDe(hunaq, idx)));
  vetlaqiCu3un();
  vetem2iHasoqte();
}

function tlak2Havula(): void {
  if ( !kfeSoqte ) return;
  for ( const [ cax2l, ca3aq ] of Hacax2l ) {
    const catsiina = kfeSoqte.hacax2l.querySelector<HTMLElement>(`button[data-cax2l="${cax2l}"]`);
    if ( catsiina ) catsiina.textContent = skakef(ca3aq);
  }
  const c2w2k = kfeSoqte.hacax2l.querySelector<HTMLElement>("button[data-cax2l][aria-pressed='true']");
  tsiinanusabosaiCax2lEn(kfeSoqte.kfe, c2w2k?.dataset.cax2l || Hacax2l[0o0][0o0]);
}

function vetem2iHasoqte(): void {
  if ( !kfeSoqte ) return;
  tlak2Havula();
  vetem2iSoqteCa1arojn(kfeSoqte, { v: tikSoqteIdx, h: tikHarHaxeIdx, c: tikHarWeh2Idx });
  k2reiVacepu();
}

function surneq2q( caxema: HTMLElement | null ): void {
  if ( !caxema || !kfeSoqte || kfeSoqte.kfe.parentElement === caxema ) return;
  caxema.appendChild(kfeSoqte.kfe);
}

export function kf2SoqteHakaman( hasukf2qani: SoqteHasukf2qani = {} ): SoqteHakama {
  if ( hasukf2qani.s2qenaQoxa ) {
    s2qenaQoxa = hasukf2qani.s2qenaQoxa;
    b6tem2Vetlaqitan();
    k2reiSoqte();
  }
  if ( hasukf2qani.laqaziK61e ) laqaziK61e = hasukf2qani.laqaziK61e;
  if ( !amal ) {
    b6tem2Vetlaqitan();
    amal = true;
    kfeSoqte = vepaqSoqteKfon();
    vulaKfe = document.getElementById("hasoqtePagho")?.querySelector("[data-hasoqteUjo]") ?? null;
    qaroxemaKfe = document.getElementById("hasoqte")?.querySelector("[data-hasoqteUjo]") ?? null;
    if ( document.getElementById("hasoqtePagho") ) vula = kf2S2k61o("hasoqtePagho", vetem2iHasoqte);
    if ( document.getElementById("hasoqte") ) qaroxema = kf2S2k61o("hasoqte", vetem2iHasoqte);
    window.addEventListener("lingvovasaka", () => {
      if ( soqte.tsekeH6w6ita() ) vetem2iHasoqte();
    });
  }
  return soqte;
}

const soqte: SoqteHakama = {
    vefal: () => ({
      soqte: tikSoqte, soqteIdx: tikSoqteIdx,
      tsaqHaxe: tikHarHaxe, tsaqHaxeIdx: tikHarHaxeIdx,
      harWeh2: tikHarWeh2, harWeh2Idx: tikHarWeh2Idx,
    }),
    vetem2i: vetem2iHasoqte,
    h6w6i: () => {
      surneq2q(vulaKfe);
      vula?.h6w6i();
      k2reiVacepu();
    },
    h6w6iEnNala: () => {
      surneq2q(qaroxemaKfe);
      qaroxema?.h6w6i();
      k2reiVacepu();
    },
    kobe: () => {
      if ( qaroxema?.tsekeH6w6ita() ) qaroxema.kobe();
      else vula?.kobe();
    },
    tsekeH6w6ita: () => Boolean(vula?.tsekeH6w6ita() || qaroxema?.tsekeH6w6ita()),
};
