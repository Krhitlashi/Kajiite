// ≺⧼ ការបកប្រែ 🗣️ ⧽≻
import { gkAlIpa, ipaAlLingvo } from "./sonaj-reguloj.js";
import { kreiPaghon, kreiPanelon } from "../fasado/paghoj.js";
import type { Pagho, Panelo } from "../fasado/paghoj.js";
import { TIPARO } from "../../eskekoj/konstruajxoj/satalaj/tipoj.js";
import { AIH } from "./tradukoj/aih.js";
import { EO } from "./tradukoj/eo.js";
import { EN } from "./tradukoj/en.js";
import { JA } from "./tradukoj/ja.js";
import { KM } from "./tradukoj/km.js";

// ⟪ វចនានុក្រម 📃 ⟫
const skakefani: Record<string, Record<string, string>> = {
  aih: AIH,
  eo: EO,
  en: EN,
  ja: JA,
  km: KM,
};

const LINGVOJ = [ "aih", "eo", "en", "ja", "km", ];
let aktivaLingvo = "aih";

// ⟪ API សាធារណៈ , បកប្រែ 📃 ⟫
export function nomoAih(klavo: string, tipo = klavo): string {
  const rekta = skakefani.aih[klavo];
  if ( rekta ) return rekta;
  return skakefani.aih[TIPARO[tipo]?.labelKey ?? ""] ?? klavo;
}

const ARIA_TRAKO_PREFIKSO: Record<string, ( n: number ) => string> = {
  eo: n => "Elekti trakon " + n + " ",
  en: n => "Select track " + n + " ",
  ja: n => "トラック " + n + " を選択 ",
  km: n => "ជ្រើសរើសបទ " + n + " ",
};
const SPECIFIKAJ_PLANTNOMOJ = new Set([
  "specBetulo", "specLariko", "specHxsxaksxlefo", "specPussxlefo", "specFiliko", "specPurpuraFiliko",
  "specLikeno", "specHerbo", "specMusko", "specCetkuo", "specCakeo",
]);
const KONSTRUAJ_NOMOJ = new Set([
  "tipDomo", "tipMangxejo", "tipKasafeo", "tipStacioxipo", "tipTuro", "tipSanktejo",
]);

function deriviNomon(klavo: string): string | null {
  if ( aktivaLingvo === "aih" ) return null;
  const aria = /^ariaTrako(\d+)$/.exec(klavo);
  const bazo = aria ? "trako" + aria[1] : klavo;
  if ( !/^(paq|trako|manĝFok|manĝTla|manĝPuss)\d+$/.test(bazo) && !SPECIFIKAJ_PLANTNOMOJ.has(bazo) && !KONSTRUAJ_NOMOJ.has(bazo) ) return null;
  const aihFormo = skakefani.aih[bazo];
  if ( !aihFormo ) return null;
  const nomo = aihFormo
    .split("•")
    .map(p => ipaAlLingvo(gkAlIpa(p.trim()), aktivaLingvo))
    .join(" • ");
  if ( !nomo ) return null;
  const kap = nomo.charAt(0).toUpperCase() + nomo.slice(1);
  if ( aria ) {
    const pre = ARIA_TRAKO_PREFIKSO[aktivaLingvo] ?? ARIA_TRAKO_PREFIKSO.eo;
    return pre(parseInt(aria[1]) + 1) + kap;
  }
  return kap;
}

export function traduki(klavo: string): string {
  const vortaro = skakefani[aktivaLingvo] || skakefani.eo;
  const rekta = vortaro[klavo];
  if ( rekta !== undefined && rekta !== "" ) return rekta;
  const derivita = deriviNomon(klavo);
  if ( derivita ) return derivita;
  return rekta || klavo;
}

export function konstruaĵaNomo(klavo: string, tipo = klavo): string {
  if ( skakefani[aktivaLingvo]?.[klavo] || ( aktivaLingvo !== "aih" && deriviNomon(klavo) ) ) return traduki(klavo);
  return traduki(TIPARO[tipo]?.labelKey ?? klavo);
}

export function cxuAih(): boolean {
  return aktivaLingvo === "aih";
}

// ⟪ អនុវត្តការបកប្រែទៅ DOM 📃 ⟫
function aplikiSkakefanon(lingvo: string): void {
  aktivaLingvo = lingvo;
  document.documentElement.lang = lingvo;
  // ⟪ ប្លង់ផ្តេកសម្រាប់ភាសាបកប្រែ , បញ្ឈរសម្រាប់ aih , ដូចស្គ្រីបខាងក្រៅ 📃 ⟫
  if ( lingvo === "aih" ) {
    document.body.classList.remove("tapufal");
  } else {
    document.body.classList.remove("cepufal");
    document.body.classList.add("tapufal");
  }
  document.querySelectorAll("[data-oskakefani]").forEach(el => {
    const klavo = el.getAttribute("data-oskakefani");
    if ( klavo ) {
      const traduko = traduki(klavo);
      if ( traduko !== klavo ) el.textContent = traduko;
    }
  });
  document.querySelectorAll("[data-oskakefani-aria]").forEach(el => {
    const klavo = el.getAttribute("data-oskakefani-aria");
    if ( klavo ) {
      const traduko = traduki(klavo);
      if ( traduko !== klavo ) el.setAttribute("aria-label", traduko);
    }
  });
  const butono = document.getElementById("butLingvo");
  if ( butono ) butono.textContent = lingvo.toUpperCase();
  const agordButono = document.getElementById("butAgordLingvo");
  if ( agordButono ) agordButono.textContent = lingvo.toUpperCase();
  try { localStorage.setItem("aranis-lingvo", lingvo); } catch { /* private browsing */ }
  try {
    const ruva = new URL(window.location.href);
    ruva.searchParams.set("lang", lingvo);
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

// ⟪ អនុវត្តបែបផែនមុខ aih ទៅអក្សរថ្មី ។ បើភាសាផ្សេង គ្មានអ្វីទេ 📃 ⟫
function aplikiVacepuSe(): void {
  if ( aktivaLingvo !== "aih" || typeof vacepu !== "function" ) return;
  try { vacepu("aih"); } catch { /* ignorata */ }
}

// ⟪ ភាសាសកម្ម 📃 ⟫
export function nunaLingvo(): string {
  return aktivaLingvo;
}

export function cxuLingvo( lingvo: string ): boolean {
  return LINGVOJ.includes(lingvo);
}

// ⟪ ជ្រើសភាសាដោយផ្ទាល់ , ដោយគ្មានការរំលង 📃 ⟫
/*ដាក់ភាសាមួយឱ្យសកម្ម , ហើយធ្វើបច្ចុប្បន្នភាព UI
    @param lingvo ( string ) - កូដភាសា ៖ aih , eo , en , ja , km */
export function agordiLingvon( lingvo: string ): void {
  if ( !LINGVOJ.includes(lingvo) ) return;
  aplikiSkakefanon(lingvo);
}

// ⟪ ជ្រើសរើសភាសា ៖ បញ្ជីតែមួយសម្រាប់ទំព័រ ( ផ្ទាំងចាប់ផ្តើម ) និងផ្ទាំងលេចឡើង ( ហ្គេម ) 📃 ⟫
let lingvPagho: Pagho | null = null;
let lingvPopUp: Panelo | null = null;

function markiAktivanLingvon(): void {
  document.querySelectorAll("[data-lingvo]").forEach(el => {
    const lingvo = ( el as HTMLElement ).dataset.lingvo || "";
    el.setAttribute("aria-pressed", String(lingvo === aktivaLingvo));
  });
}

/*បំពេញបញ្ជីភាសាមួយ
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

/*ជ្រើសភាសាមួយ , រួចបិទម៉ឺនុយ ដើម្បីត្រឡប់ទៅម៉ឺនុយមុន
    @param lingvo ( string ) - កូដភាសា
    @param fermi ( function ) - ការបិទម៉ឺនុយដែលបើក */
function elektiLingvon( lingvo: string, fermi: () => void ): void {
  const sama = lingvo === aktivaLingvo;
  agordiLingvon(lingvo);
  markiAktivanLingvon();
  aplikiVacepuSe();
  if ( !sama ) fermi();
}

/*រៀបចំម៉ឺនុយភាសាទាំងពីរ ៖ ទំព័រនៅផ្ទាំងចាប់ផ្តើម , ផ្ទាំងនៅក្នុងហ្គេម*/
function prepariLingvajnMenuojn(): void {
  const paghaUjo = document.getElementById("lingvPaghoVico");
  const popaUjo = document.getElementById("lingvPopUpVico");
  if ( paghaUjo ) plenigiLingvanListon(paghaUjo);
  if ( popaUjo ) plenigiLingvanListon(popaUjo);
  lingvPagho = document.getElementById("lingvPagho") ? kreiPaghon("lingvPagho", markiAktivanLingvon) : null;
  lingvPopUp = document.getElementById("lingvPopUp") ? kreiPanelon("lingvPopUp", markiAktivanLingvon) : null;
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

// ⟪ រកភាសាចាប់ផ្តើម ៖ ភាសាដើមគឺ aih ។ lang= និងភាសាដែលរក្សាទុកមានអាទិភាព 📃 ⟫
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

// ⟪ ចាប់ផ្តើម ៖ ក្នុងហ្គេមបើកផ្ទាំងលេចឡើង , ផ្ទាំងចាប់ផ្តើមបើកទំព័រពេញ 📃 ⟫
function inicializi(): void {
  aplikiSkakefanon(detektiLingvon());
  prepariLingvajnMenuojn();
  document.getElementById("butLingvo")?.addEventListener("click", () => lingvPopUp?.malfermi());
  document.getElementById("butAgordLingvo")?.addEventListener("click", () => lingvPagho?.malfermi());
  markiAktivanLingvon();
  window.addEventListener("popstate", () => aplikiSkakefanon(detektiLingvon()));
  window.addEventListener("lingvosxangxo", markiAktivanLingvon);
}

if ( document.readyState === "loading" ) {
  document.addEventListener("DOMContentLoaded", inicializi);
} else {
  inicializi();
}
