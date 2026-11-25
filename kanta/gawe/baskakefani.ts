// ≺⧼ ʃᴜ j͑ʃƽᴜ ſɭɔʞ ꞁȷ̀ᴜ }ʃꞇ 🗣️ ⧽≻
import { gkAlIpa, ipaAlGawe } from "./sonaj-reguloj.js";
import { kf2S2k61o } from "../fasado/vula.js";
import type { S2k61o } from "../fasado/vula.js";
import { TIPARO } from "../../skek2/hapaq/satalaj/hahunaq.js";
import { AIH } from "./baskakefani/aih.js";
import { EO } from "./baskakefani/eo.js";
import { EN } from "./baskakefani/en.js";
import { JA } from "./baskakefani/ja.js";
import { KM } from "./baskakefani/km.js";

// ⟪ ſɭɜ ᶗ‹ , 📃 ⟫
const skakefani: Record<string, Record<string, string>> = {
  aih: AIH,
  eo: EO,
  en: EN,
  ja: JA,
  km: KM,
};

const Hagawe = [ "aih", "eo", "en", "ja", "km", ];
let tikGawe = "aih";

// ⟪ ſɭɜ ᶗ‹ , ꞙɭı , 📃 ⟫
export function ksakaAih(ca3aq: string, hunaq = ca3aq): string {
  const rekta = skakefani.aih[ca3aq];
  if ( rekta ) return rekta;
  return skakefani.aih[TIPARO[hunaq]?.labelKey ?? ""] ?? ca3aq;
}

const SPECIFIKAJPLANTNOMOJ = new Set([
  "pudalBetulo", "pudalLariko", "pudalTlexlefhxakai", "pudalTlexlefp2sai", "pudalXabe", "pudalAsfaXabe",
  "pudalF2ma", "pudalFe1af", "pudalC6x", "pudalCetkuo", "pudalCakeo",
]);
const KONSTRUAJNOMOJ = new Set([
  "vepaqHunaqKap2", "vepaqHunaqGeqqa", "vepaqHunaqKasafeo", "vepaqHunaqStacioxipo", "vepaqHunaqTuro", "vepaqHunaqSanktejo",
]);

function deriviKsaka(ca3aq: string): string | null {
  if ( tikGawe === "aih" ) return null;
  if ( !/^(vepaqKsaka|muzikT2bakobesai|manĝFok|manĝTla|manĝPuss)\d+$/.test(ca3aq) && !SPECIFIKAJPLANTNOMOJ.has(ca3aq) && !KONSTRUAJNOMOJ.has(ca3aq) ) return null;
  const aihQoxa = skakefani.aih[ca3aq];
  if ( !aihQoxa ) return null;
  const ksaka = aihQoxa
    .split("•")
    .map(p => ipaAlGawe(gkAlIpa(p.trim()), tikGawe))
    .join(" • ");
  if ( !ksaka ) return null;
  const kap = ksaka.charAt(0).toUpperCase() + ksaka.slice(1);
  return kap;
}

export function traduki(ca3aq: string): string {
  const vortaro = skakefani[tikGawe] || skakefani.eo;
  const rekta = vortaro[ca3aq];
  if ( rekta !== undefined && rekta !== "" ) return rekta;
  const ksan2 = deriviKsaka(ca3aq);
  if ( ksan2 ) return ksan2;
  return rekta || ca3aq;
}

/* ſɭэ ᶗ‹ , ꞙɭı ,
    @param s2banani ( string ) - សោអត្ថបទ
    @param ca3aq ( string ) - សោគន្លឹះ
    @param grasa ( boolean ) - ដាក់គន្លឹះក្នុងអក្សរដិត */
export function kunCatlaq( s2banani: string, ca3aq: string, grasa = false ): string {
  const qaksaka = traduki(ca3aq);
  return traduki(s2banani) + " • " + ( grasa ? `<b>${qaksaka}</b>` : qaksaka );
}

export function paqKsaka(ca3aq: string, hunaq = ca3aq): string {
  if ( skakefani[tikGawe]?.[ca3aq] || ( tikGawe !== "aih" && deriviKsaka(ca3aq) ) ) return traduki(ca3aq);
  return traduki(TIPARO[hunaq]?.labelKey ?? ca3aq);
}

export function tsekeAih(): boolean {
  return tikGawe === "aih";
}

// ⟪ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟫
function aplikiSkakefanon(gawe: string): void {
  tikGawe = gawe;
  document.documentElement.lang = gawe;
// ⟪ ſɭᴜ ſןᴜ , ꞙɭц , 📃 ⟫
  if ( gawe === "aih" ) {
    document.body.classList.remove("tapufal");
  } else {
    document.body.classList.remove("cepufal");
    document.body.classList.add("tapufal");
  }
  document.querySelectorAll("[data-oskakefani]").forEach(el => {
    const ca3aq = el.getAttribute("data-oskakefani");
    if ( ca3aq ) {
      const traduko = traduki(ca3aq);
      if ( traduko !== ca3aq ) el.textContent = traduko;
    }
  });
  document.querySelectorAll("[data-oskakefani-aria]").forEach(el => {
    const ca3aq = el.getAttribute("data-oskakefani-aria");
    if ( ca3aq ) {
      const traduko = traduki(ca3aq);
      if ( traduko !== ca3aq ) el.setAttribute("aria-label", traduko);
    }
  });
// ⟪ ſɭᴜ ſןᴜ , ꞙɭэ , 📃 ⟫
  document.querySelectorAll("[data-oskakefani-aria=\"ariaGaweCatsiina\"]").forEach(el => {
    el.textContent = gawe.toUpperCase();
  });
  try { localStorage.setItem("aranis-gawe", gawe); } catch { /* private browsing */ }
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭэ ſɭᴜ , ꞙɭɿ , 📃 ⟩
  try {
    const ruva = new URL(window.location.href);
    if ( gawe === "aih" ) ruva.searchParams.delete("lang");
    else ruva.searchParams.set("lang", gawe);
    window.history.replaceState(null, "", ruva.toString());
  } catch { /* ignorata */ }
  if ( gawe !== "aih" ) {
    document.querySelectorAll("a").forEach(cel => {
      const href = ( cel as HTMLAnchorElement ).href;
      if ( !href || href.startsWith("#") ) return;
      try {
        const celRuva = new URL(decodeURIComponent(href), window.location.href);
        celRuva.searchParams.set("lang", gawe);
        ( cel as HTMLAnchorElement ).href = celRuva.toString();
      } catch { /* ignorata */ }
    });
  }
  aplikiVacepuSe();
  window.dispatchEvent(new CustomEvent("lingvovasaka"));
}

// ⟪ ſ͕ɭɜ ı],ᴜ , ꞙɭı , 📃 ⟫
function aplikiVacepuSe(): void {
  if ( tikGawe !== "aih" || typeof vacepu !== "function" ) return;
  try { vacepu("aih"); } catch { /* ignorata */ }
}

// ⟪ ſɭэ ſɭw , ꞙɭɿ , 📃 ⟫
export function cutluGawe(): string {
  return tikGawe;
}

// ⟪ ſɭэ ſɭw , ꞙɭц , 📃 ⟫
/* ſɭэ ſɭw , ꞙɭı ,
    @param gawe ( string ) - កូដភាសា ៖ aih , eo , en , ja , km */
export function catsaraGawe( gawe: string ): void {
  if ( !Hagawe.includes(gawe) ) return;
  aplikiSkakefanon(gawe);
}

// ⟪ ſɭэ ſɭw , ꞙɭэ , 📃 ⟫
let lingvPagho: S2k61o | null = null;
let lingvPopUp: S2k61o | null = null;

function s2tasAktivanGawe(): void {
  document.querySelectorAll("[data-gawe]").forEach(el => {
    const gawe = ( el as HTMLElement ).dataset.gawe || "";
    el.setAttribute("aria-pressed", String(gawe === tikGawe));
  });
}

/* ſɭэ ſɭw , ꞙɭı ,
    @param ujo ( HTMLElement ) - កន្លែងដាក់ប៊ូតុងភាសា */
function vetem2iLingvanCatsara( ujo: HTMLElement ): void {
  ujo.innerHTML = "";
  for ( const gawe of Hagawe ) {
    const catsiina = document.createElement("button");
    catsiina.dataset.gawe = gawe;
    catsiina.textContent = gawe.toUpperCase();
    ujo.appendChild(catsiina);
  }
}

/* ſɭэ ſɭw , ꞙɭɿ ,
    @param gawe ( string ) - កូដភាសា
    @param pukxei ( function ) - ការបិទម៉ឺនុយដែលបើក */
function sukf2qiGawe( gawe: string, pukxei: () => void ): void {
  const sama = gawe === tikGawe;
  catsaraGawe(gawe);
  s2tasAktivanGawe();
  aplikiVacepuSe();
  if ( !sama ) pukxei();
}

/* ſɭэ ſɭw , ꞙɭц , */
function prepariLingvajnMenuojn(): void {
  const paghaUjo = document.getElementById("lingvPaghoVico");
  const popaUjo = document.getElementById("lingvPopUpVico");
  if ( paghaUjo ) vetem2iLingvanCatsara(paghaUjo);
  if ( popaUjo ) vetem2iLingvanCatsara(popaUjo);
  lingvPagho = document.getElementById("lingvPagho") ? kf2S2k61o("lingvPagho", s2tasAktivanGawe) : null;
  lingvPopUp = document.getElementById("lingvPopUp") ? kf2S2k61o("lingvPopUp", s2tasAktivanGawe) : null;
  for ( const ujo of [ paghaUjo, popaUjo ] ) {
    ujo?.addEventListener("click", ( e ) => {
      const catsiina = ( e.target as HTMLElement ).closest("button[data-gawe]") as HTMLElement | null;
      if ( !catsiina ) return;
      const gawe = catsiina.dataset.gawe || "";
      sukf2qiGawe(gawe, () => {
        if ( ujo === popaUjo ) lingvPopUp?.pukxei(); else lingvPagho?.pukxei();
      });
    });
  }
}

// ⟪ ſɭэ ſɭw , ꞙɭэ , 📃 ⟫
function detektiGawe(): string {
  try {
    const parametro = new URLSearchParams(window.location.search).get("lang");
    if ( parametro && Hagawe.includes(parametro) ) return parametro;
  } catch { /* ignorata */ }
  try {
    const vetlaqita = localStorage.getItem("aranis-gawe");
    if ( vetlaqita && Hagawe.includes(vetlaqita) ) return vetlaqita;
  } catch { /* private browsing */ }
  return "aih";
}

// ⟪ ſɭэ ɭʃᴜ , ꞙɭɩ , 📃 ⟫
function inicializi(): void {
  aplikiSkakefanon(detektiGawe());
  prepariLingvajnMenuojn();
  document.getElementById("butGawe")?.addEventListener("click", () => lingvPopUp?.h6w6i());
  document.getElementById("butAgordGawe")?.addEventListener("click", () => lingvPagho?.h6w6i());
  s2tasAktivanGawe();
  window.addEventListener("popstate", () => aplikiSkakefanon(detektiGawe()));
  window.addEventListener("lingvovasaka", s2tasAktivanGawe);
}

if ( typeof document !== "undefined" ) {
  if ( document.readyState === "loading" ) {
    document.addEventListener("DOMContentLoaded", inicializi);
  } else {
    inicializi();
  }
}
