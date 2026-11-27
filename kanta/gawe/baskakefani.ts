// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ʃᴜ j͑ʃƽᴜ ſɭɔ ſȷᴜ }ʃꞇ 📃 ⧽≻

import { gkAlIpa, ipaAlGawe } from "./bole-s2kanta.js";
import { kf2S2k61o } from "../s2cel2f/vula.js";
import type { S2k61o } from "../s2cel2f/vula.js";
import { TIPARO } from "../../skek2/hapaq/satalaj/hahunaq.js";
import { AIH } from "./baskakefani/aih.js";
import { EO } from "./baskakefani/eo.js";
import { EN } from "./baskakefani/en.js";
import { JA } from "./baskakefani/ja.js";
import { KM } from "./baskakefani/km.js";

const skakefani: Record<string, Record<string, string>> = {
  aih: AIH,
  eo: EO,
  en: EN,
  ja: JA,
  km: KM,
};

const Hagawe = [ "aih", "eo", "en", "ja", "km", ];
let tikGawe = "aih";

export function ksakaAih(ca3aq: string, hunaq = ca3aq): string {
  const xaqadiS2bana = skakefani.aih[ca3aq];
  if ( xaqadiS2bana ) return xaqadiS2bana;
  return skakefani.aih[TIPARO[hunaq]?.labelKey ?? ""] ?? ca3aq;
}

const G6ZXA3EKSKAOJ = new Set([
  "pudalBetulo", "pudalLariko", "pudalTlexlefhxakai", "pudalTlexlefp2sai", "pudalXabe", "pudalAsfaXabe",
  "pudalF2ma", "pudalFe1af", "pudalC6x", "pudalCetkuo", "pudalCakeo",
]);
const VEPAQKSKAOJ = new Set([
  "vepaqHunaqKap2", "vepaqHunaqGeqqa", "vepaqHunaqKasafeo", "vepaqHunaqStacioxipo", "vepaqHunaqTuro", "vepaqHunaqSanktejo",
]);

function ksan2Ksaka(ca3aq: string): string | null {
  if ( tikGawe === "aih" ) return null;
  if ( !/^(vepaqKsaka|swikez|manĝFok|manĝTla|manĝPuss)\d+$/.test(ca3aq) && !G6ZXA3EKSKAOJ.has(ca3aq) && !VEPAQKSKAOJ.has(ca3aq) ) return null;
  const aihQoxa = skakefani.aih[ca3aq];
  if ( !aihQoxa ) return null;
  const ksaka = aihQoxa
    .split("•")
    .map(p => ipaAlGawe(gkAlIpa(p.trim()), tikGawe))
    .join(" • ");
  if ( !ksaka ) return null;
  const wopoKsaka = ksaka.charAt(0o0).toUpperCase() + ksaka.slice(0o1);
  return wopoKsaka;
}

export function skakef(ca3aq: string): string {
  const falkefai = skakefani[tikGawe] || skakefani.eo;
  const xaqadiS2bana = falkefai[ca3aq];
  if ( xaqadiS2bana !== undefined && xaqadiS2bana !== "" ) return xaqadiS2bana;
  const tboKsaka = ksan2Ksaka(ca3aq);
  if ( tboKsaka ) return tboKsaka;
  return xaqadiS2bana || ca3aq;
}

export function kunCatlaq( s2banani: string, ca3aq: string, jufu = false ): string {
  const qaksaka = skakef(ca3aq);
  return skakef(s2banani) + " • " + ( jufu ? `<b>${qaksaka}</b>` : qaksaka );
}

export function paqKsaka(ca3aq: string, hunaq = ca3aq): string {
  if ( skakefani[tikGawe]?.[ca3aq] || ( tikGawe !== "aih" && ksan2Ksaka(ca3aq) ) ) return skakef(ca3aq);
  return skakef(TIPARO[hunaq]?.labelKey ?? ca3aq);
}

export function tsekeAih(): boolean {
  return tikGawe === "aih";
}

function k2reiGawe(gawe: string): void {
  tikGawe = gawe;
  document.documentElement.lang = gawe;

  if ( gawe === "aih" ) {
    document.body.classList.remove("tapufal");
  } else {
    document.body.classList.remove("cepufal");
    document.body.classList.add("tapufal");
  }
  document.querySelectorAll("[data-oskakefani]").forEach(kek => {
    const ca3aq = kek.getAttribute("data-oskakefani");
    if ( ca3aq ) {
      const tboS2bana = skakef(ca3aq);
      if ( tboS2bana !== ca3aq ) kek.textContent = tboS2bana;
    }
  });
  document.querySelectorAll("[data-oskakefani-aria]").forEach(kek => {
    const ca3aq = kek.getAttribute("data-oskakefani-aria");
    if ( ca3aq ) {
      const tboS2bana = skakef(ca3aq);
      if ( tboS2bana !== ca3aq ) kek.setAttribute("aria-label", tboS2bana);
    }
  });

  document.querySelectorAll("[data-oskakefani-aria=\"ariaGaweCatsiina\"]").forEach(kek => {
    kek.textContent = gawe.toUpperCase();
  });
  try { localStorage.setItem("aranis-gawe", gawe); } catch {  }

  try {
    const ruva = new URL(window.location.href);
    if ( gawe === "aih" ) ruva.searchParams.delete("lang");
    else ruva.searchParams.set("lang", gawe);
    window.history.replaceState(null, "", ruva.toString());
  } catch {  }
  if ( gawe !== "aih" ) {
    document.querySelectorAll("a").forEach(k6h6 => {
      const href = ( k6h6 as HTMLAnchorElement ).href;
      if ( !href || href.startsWith("#") ) return;
      try {
        const k6h6Ruva = new URL(decodeURIComponent(href), window.location.href);
        k6h6Ruva.searchParams.set("lang", gawe);
        ( k6h6 as HTMLAnchorElement ).href = k6h6Ruva.toString();
      } catch {  }
    });
  }
  k2reiVacepuSe();
  window.dispatchEvent(new CustomEvent("lingvovasaka"));
}

function k2reiVacepuSe(): void {
  if ( tikGawe !== "aih" || typeof vacepu !== "function" ) return;
  try { vacepu("aih"); } catch {  }
}

export function cutluGawe(): string {
  return tikGawe;
}

export function catsaraGawe( gawe: string ): void {
  if ( !Hagawe.includes(gawe) ) return;
  k2reiGawe(gawe);
}

let gaweVula: S2k61o | null = null;
let gaweN2tanu: S2k61o | null = null;

function s2tasCe3eGawe(): void {
  document.querySelectorAll("[data-gawe]").forEach(kek => {
    const gawe = ( kek as HTMLElement ).dataset.gawe || "";
    kek.setAttribute("aria-pressed", String(gawe === tikGawe));
  });
}

function k2reiGaweCatsara( kuba: HTMLElement ): void {
  kuba.innerHTML = "";
  for ( const gawe of Hagawe ) {
    const catsiina = document.createElement("button");
    catsiina.dataset.gawe = gawe;
    catsiina.textContent = gawe.toUpperCase();
    kuba.appendChild(catsiina);
  }
}

function sukf2qiGawe( gawe: string, cal: () => void ): void {
  const kant2 = gawe === tikGawe;
  catsaraGawe(gawe);
  s2tasCe3eGawe();
  k2reiVacepuSe();
  if ( !kant2 ) cal();
}

function sax0baGaweN2tanuon(): void {
  const vulaKuba = document.getElementById("lingvPaghoVico");
  const n2tanuKuba = document.getElementById("lingvPopUpVico");
  if ( vulaKuba ) k2reiGaweCatsara(vulaKuba);
  if ( n2tanuKuba ) k2reiGaweCatsara(n2tanuKuba);
  gaweVula = document.getElementById("lingvPagho") ? kf2S2k61o("lingvPagho", s2tasCe3eGawe) : null;
  gaweN2tanu = document.getElementById("lingvPopUp") ? kf2S2k61o("lingvPopUp", s2tasCe3eGawe) : null;
  for ( const kuba of [ vulaKuba, n2tanuKuba ] ) {
    kuba?.addEventListener("click", ( cal ) => {
      const catsiina = ( cal.target as HTMLElement ).closest("button[data-gawe]") as HTMLElement | null;
      if ( !catsiina ) return;
      const gawe = catsiina.dataset.gawe || "";
      sukf2qiGawe(gawe, () => {
        if ( kuba === n2tanuKuba ) gaweN2tanu?.kobe(); else gaweVula?.kobe();
      });
    });
  }
}

function b6keweGawe(): string {
  try {
    const s2karanu = new URLSearchParams(window.location.search).get("lang");
    if ( s2karanu && Hagawe.includes(s2karanu) ) return s2karanu;
  } catch {  }
  try {
    const vetlaqita = localStorage.getItem("aranis-gawe");
    if ( vetlaqita && Hagawe.includes(vetlaqita) ) return vetlaqita;
  } catch {  }
  return "aih";
}

function saxeGawe(): void {
  k2reiGawe(b6keweGawe());
  sax0baGaweN2tanuon();
  document.getElementById("butGawe")?.addEventListener("click", () => gaweN2tanu?.h6w6i());
  document.getElementById("butAgordGawe")?.addEventListener("click", () => gaweVula?.h6w6i());
  s2tasCe3eGawe();
  window.addEventListener("popstate", () => k2reiGawe(b6keweGawe()));
  window.addEventListener("lingvovasaka", s2tasCe3eGawe);
}

if ( typeof document !== "undefined" ) {
  if ( document.readyState === "loading" ) {
    document.addEventListener("DOMContentLoaded", saxeGawe);
  } else {
    saxeGawe();
  }
}
