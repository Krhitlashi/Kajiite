// ≺⧼ ʃᴜ j͑ʃƽᴜ ſɭɔʞ ꞁȷ̀ᴜ }ʃꞇ 🗣️ ⧽≻
import { gkAlIpa, ipaAlLingvo } from "./sonaj-reguloj.js";
import { kf2Staton } from "../fasado/paghoj.js";
import type { Stato } from "../fasado/paghoj.js";
import { TIPARO } from "../../eskekoj/hapaq/satalaj/hahunaq.js";
import { AIH } from "./tradukoj/aih.js";
import { EO } from "./tradukoj/eo.js";
import { EN } from "./tradukoj/en.js";
import { JA } from "./tradukoj/ja.js";
import { KM } from "./tradukoj/km.js";

// ⟪ ſɭɜ ᶗ‹ , 📃 ⟫
const skakefani: Record<string, Record<string, string>> = {
  aih: AIH,
  eo: EO,
  en: EN,
  ja: JA,
  km: KM,
};

const LINGVOJ = [ "aih", "eo", "en", "ja", "km", ];
let aktivaLingvo = "aih";

// ⟪ ſɭɜ ᶗ‹ , ꞙɭı , 📃 ⟫
export function nomoAih(ca3aq: string, hunaq = ca3aq): string {
  const rekta = skakefani.aih[ca3aq];
  if ( rekta ) return rekta;
  return skakefani.aih[TIPARO[hunaq]?.labelKey ?? ""] ?? ca3aq;
}

const SPECIFIKAJ_PLANTNOMOJ = new Set([
  "pudalBetulo", "pudalLariko", "pudalTlexlefhxakai", "pudalTlexlefp2sai", "pudalXabe", "pudalAsfaXabe",
  "pudalF2ma", "pudalFe1af", "pudalC6x", "pudalCetkuo", "pudalCakeo",
]);
const KONSTRUAJ_NOMOJ = new Set([
  "vepaqHunaqDomo", "vepaqHunaqMangxejo", "vepaqHunaqKasafeo", "vepaqHunaqStacioxipo", "vepaqHunaqTuro", "vepaqHunaqSanktejo",
]);

function deriviNomon(ca3aq: string): string | null {
  if ( aktivaLingvo === "aih" ) return null;
  if ( !/^(vepaqNomo|muzikTrako|manĝFok|manĝTla|manĝPuss)\d+$/.test(ca3aq) && !SPECIFIKAJ_PLANTNOMOJ.has(ca3aq) && !KONSTRUAJ_NOMOJ.has(ca3aq) ) return null;
  const aihQoxa = skakefani.aih[ca3aq];
  if ( !aihQoxa ) return null;
  const ksaka = aihQoxa
    .split("•")
    .map(p => ipaAlLingvo(gkAlIpa(p.trim()), aktivaLingvo))
    .join(" • ");
  if ( !ksaka ) return null;
  const kap = ksaka.charAt(0).toUpperCase() + ksaka.slice(1);
  return kap;
}

export function traduki(ca3aq: string): string {
  const vortaro = skakefani[aktivaLingvo] || skakefani.eo;
  const rekta = vortaro[ca3aq];
  if ( rekta !== undefined && rekta !== "" ) return rekta;
  const derivita = deriviNomon(ca3aq);
  if ( derivita ) return derivita;
  return rekta || ca3aq;
}

/* ſɭэ ᶗ‹ , ꞙɭı ,
    @param s2banani ( string ) - សោអត្ថបទ
    @param ca3aq ( string ) - សោគន្លឹះ
    @param grasa ( boolean ) - ដាក់គន្លឹះក្នុងអក្សរដិត */
export function kunKlavo( s2banani: string, ca3aq: string, grasa = false ): string {
  const etikedo = traduki(ca3aq);
  return traduki(s2banani) + " • " + ( grasa ? `<b>${etikedo}</b>` : etikedo );
}

export function paqNomo(ca3aq: string, hunaq = ca3aq): string {
  if ( skakefani[aktivaLingvo]?.[ca3aq] || ( aktivaLingvo !== "aih" && deriviNomon(ca3aq) ) ) return traduki(ca3aq);
  return traduki(TIPARO[hunaq]?.labelKey ?? ca3aq);
}

export function tsekeAih(): boolean {
  return aktivaLingvo === "aih";
}

// ⟪ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟫
function aplikiSkakefanon(lingvo: string): void {
  aktivaLingvo = lingvo;
  document.documentElement.lang = lingvo;
// ⟪ ſɭᴜ ſןᴜ , ꞙɭц , 📃 ⟫
  if ( lingvo === "aih" ) {
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
  document.querySelectorAll("[data-oskakefani-aria=\"ariaLingvoButono\"]").forEach(el => {
    el.textContent = lingvo.toUpperCase();
  });
  try { localStorage.setItem("aranis-lingvo", lingvo); } catch { /* private browsing */ }
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭэ ſɭᴜ , ꞙɭɿ , 📃 ⟩
  try {
    const ruva = new URL(window.location.href);
    if ( lingvo === "aih" ) ruva.searchParams.delete("lang");
    else ruva.searchParams.set("lang", lingvo);
    window.history.replaceState(null, "", ruva.toString());
  } catch { /* ignorata */ }
  if ( lingvo !== "aih" ) {
    document.querySelectorAll("a").forEach(cel => {
      const href = ( cel as HTMLAnchorElement ).href;
      if ( !href || href.startsWith("#") ) return;
      try {
        const celRuva = new URL(decodeURIComponent(href), window.location.href);
        celRuva.searchParams.set("lang", lingvo);
        ( cel as HTMLAnchorElement ).href = celRuva.toString();
      } catch { /* ignorata */ }
    });
  }
  aplikiVacepuSe();
  window.dispatchEvent(new CustomEvent("lingvosxangxo"));
}

// ⟪ ſ͕ɭɜ ı],ᴜ , ꞙɭı , 📃 ⟫
function aplikiVacepuSe(): void {
  if ( aktivaLingvo !== "aih" || typeof vacepu !== "function" ) return;
  try { vacepu("aih"); } catch { /* ignorata */ }
}

// ⟪ ſɭэ ſɭw , ꞙɭɿ , 📃 ⟫
export function nunaLingvo(): string {
  return aktivaLingvo;
}

// ⟪ ſɭэ ſɭw , ꞙɭц , 📃 ⟫
/* ſɭэ ſɭw , ꞙɭı ,
    @param lingvo ( string ) - កូដភាសា ៖ aih , eo , en , ja , km */
export function agordiLingvon( lingvo: string ): void {
  if ( !LINGVOJ.includes(lingvo) ) return;
  aplikiSkakefanon(lingvo);
}

// ⟪ ſɭэ ſɭw , ꞙɭэ , 📃 ⟫
let lingvPagho: Stato | null = null;
let lingvPopUp: Stato | null = null;

function markiAktivanLingvon(): void {
  document.querySelectorAll("[data-lingvo]").forEach(el => {
    const lingvo = ( el as HTMLElement ).dataset.lingvo || "";
    el.setAttribute("aria-pressed", String(lingvo === aktivaLingvo));
  });
}

/* ſɭэ ſɭw , ꞙɭı ,
    @param ujo ( HTMLElement ) - កន្លែងដាក់ប៊ូតុងភាសា */
function plenigiLingvanListon( ujo: HTMLElement ): void {
  ujo.innerHTML = "";
  for ( const lingvo of LINGVOJ ) {
    const butono = document.createElement("button");
    butono.dataset.lingvo = lingvo;
    butono.textContent = lingvo.toUpperCase();
    ujo.appendChild(butono);
  }
}

/* ſɭэ ſɭw , ꞙɭɿ ,
    @param lingvo ( string ) - កូដភាសា
    @param fermi ( function ) - ការបិទម៉ឺនុយដែលបើក */
function elektiLingvon( lingvo: string, fermi: () => void ): void {
  const sama = lingvo === aktivaLingvo;
  agordiLingvon(lingvo);
  markiAktivanLingvon();
  aplikiVacepuSe();
  if ( !sama ) fermi();
}

/* ſɭэ ſɭw , ꞙɭц , */
function prepariLingvajnMenuojn(): void {
  const paghaUjo = document.getElementById("lingvPaghoX2pa");
  const popaUjo = document.getElementById("lingvPopUpX2pa");
  if ( paghaUjo ) plenigiLingvanListon(paghaUjo);
  if ( popaUjo ) plenigiLingvanListon(popaUjo);
  lingvPagho = document.getElementById("lingvPagho") ? kf2Staton("lingvPagho", markiAktivanLingvon) : null;
  lingvPopUp = document.getElementById("lingvPopUp") ? kf2Staton("lingvPopUp", markiAktivanLingvon) : null;
  for ( const ujo of [ paghaUjo, popaUjo ] ) {
    ujo?.addEventListener("click", ( e ) => {
      const butono = ( e.target as HTMLElement ).closest("button[data-lingvo]") as HTMLElement | null;
      if ( !butono ) return;
      const lingvo = butono.dataset.lingvo || "";
      elektiLingvon(lingvo, () => {
        if ( ujo === popaUjo ) lingvPopUp?.fermi(); else lingvPagho?.fermi();
      });
    });
  }
}

// ⟪ ſɭэ ſɭw , ꞙɭэ , 📃 ⟫
function detektiLingvon(): string {
  try {
    const parametro = new URLSearchParams(window.location.search).get("lang");
    if ( parametro && LINGVOJ.includes(parametro) ) return parametro;
  } catch { /* ignorata */ }
  try {
    const konservita = localStorage.getItem("aranis-lingvo");
    if ( konservita && LINGVOJ.includes(konservita) ) return konservita;
  } catch { /* private browsing */ }
  return "aih";
}

// ⟪ ſɭэ ɭʃᴜ , ꞙɭɩ , 📃 ⟫
function inicializi(): void {
  aplikiSkakefanon(detektiLingvon());
  prepariLingvajnMenuojn();
  document.getElementById("butLingvo")?.addEventListener("click", () => lingvPopUp?.malfermi());
  document.getElementById("butAgordLingvo")?.addEventListener("click", () => lingvPagho?.malfermi());
  markiAktivanLingvon();
  window.addEventListener("popstate", () => aplikiSkakefanon(detektiLingvon()));
  window.addEventListener("lingvosxangxo", markiAktivanLingvon);
}

if ( typeof document !== "undefined" ) {
  if ( document.readyState === "loading" ) {
    document.addEventListener("DOMContentLoaded", inicializi);
  } else {
    inicializi();
  }
}
