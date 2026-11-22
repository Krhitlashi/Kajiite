// ≺⧼ ការបកប្រែ 🗣️ ⧽≻
import { gkAlIpa, ipaAlLingvo } from "./sonaj-reguloj.js";
import { kreiStaton } from "../fasado/paghoj.js";
import type { Stato } from "../fasado/paghoj.js";
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
export function nomoAih(ca3aq: string, tipo = ca3aq): string {
  const rekta = skakefani.aih[ca3aq];
  if ( rekta ) return rekta;
  return skakefani.aih[TIPARO[tipo]?.labelKey ?? ""] ?? ca3aq;
}

const SPECIFIKAJ_PLANTNOMOJ = new Set([
  "specioBetulo", "specioLariko", "specioHxsxaksxlefo", "specioPussxlefo", "specioFiliko", "specioPurpuraFiliko",
  "specioLikeno", "specioHerbo", "specioMusko", "specioCetkuo", "specioCakeo",
]);
const KONSTRUAJ_NOMOJ = new Set([
  "konstruTipoDomo", "konstruTipoMangxejo", "konstruTipoKasafeo", "konstruTipoStacioxipo", "konstruTipoTuro", "konstruTipoSanktejo",
]);

function deriviNomon(ca3aq: string): string | null {
  if ( aktivaLingvo === "aih" ) return null;
  if ( !/^(konstruNomo|muzikTrako|manĝFok|manĝTla|manĝPuss)\d+$/.test(ca3aq) && !SPECIFIKAJ_PLANTNOMOJ.has(ca3aq) && !KONSTRUAJ_NOMOJ.has(ca3aq) ) return null;
  const aihFormo = skakefani.aih[ca3aq];
  if ( !aihFormo ) return null;
  const ksaka = aihFormo
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

/*ភ្ជាប់អត្ថបទជំនួយជាមួយគន្លឹះ ៖ អត្ថបទ • គន្លឹះ
    @param s2banani ( string ) - សោអត្ថបទ
    @param ca3aq ( string ) - សោគន្លឹះ
    @param grasa ( boolean ) - ដាក់គន្លឹះក្នុងអក្សរដិត */
export function kunKlavo( s2banani: string, ca3aq: string, grasa = false ): string {
  const etikedo = traduki(ca3aq);
  return traduki(s2banani) + " • " + ( grasa ? `<b>${etikedo}</b>` : etikedo );
}

export function konstruaĵaNomo(ca3aq: string, tipo = ca3aq): string {
  if ( skakefani[aktivaLingvo]?.[ca3aq] || ( aktivaLingvo !== "aih" && deriviNomon(ca3aq) ) ) return traduki(ca3aq);
  return traduki(TIPARO[tipo]?.labelKey ?? ca3aq);
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
  // ⟪ ប៊ូតុងភាសាទាំងអស់ ( ការកំណត់ និងហ្គេម ) បង្ហាញកូដភាសា 📃 ⟫
  document.querySelectorAll("[data-oskakefani-aria=\"ariaLingvoButono\"]").forEach(el => {
    el.textContent = lingvo.toUpperCase();
  });
  try { localStorage.setItem("aranis-lingvo", lingvo); } catch { /* private browsing */ }
  // ⟨ ភាសាដើមមិនបានសរសេរក្នុង URL ទេ ៖ `lang=` បង្ហាញតែពេលអ្នកប្រើជ្រើសភាសាផ្សេង ។
  // ដូច្នេះ URL ធម្មតានៅស្អាត , ហើយការផ្ទុកឡើងវិញមិនបន្ថែមអ្វីដោយខ្លួនឯងទេ ។ 📃 ⟩
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

// ⟪ អនុវត្តបែបផែនមុខ aih ទៅអក្សរថ្មី ។ បើភាសាផ្សេង គ្មានអ្វីទេ 📃 ⟫
function aplikiVacepuSe(): void {
  if ( aktivaLingvo !== "aih" || typeof vacepu !== "function" ) return;
  try { vacepu("aih"); } catch { /* ignorata */ }
}

// ⟪ ភាសាសកម្ម 📃 ⟫
export function nunaLingvo(): string {
  return aktivaLingvo;
}

// ⟪ ជ្រើសភាសាដោយផ្ទាល់ , ដោយគ្មានការរំលង 📃 ⟫
/*ដាក់ភាសាមួយឱ្យសកម្ម , ហើយធ្វើបច្ចុប្បន្នភាព UI
    @param lingvo ( string ) - កូដភាសា ៖ aih , eo , en , ja , km */
export function agordiLingvon( lingvo: string ): void {
  if ( !LINGVOJ.includes(lingvo) ) return;
  aplikiSkakefanon(lingvo);
}

// ⟪ ជ្រើសរើសភាសា ៖ បញ្ជីតែមួយសម្រាប់ទំព័រ ( ផ្ទាំងចាប់ផ្តើម ) និងផ្ទាំងលេចឡើង ( ហ្គេម ) 📃 ⟫
let lingvPagho: Stato | null = null;
let lingvPopUp: Stato | null = null;

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
  lingvPagho = document.getElementById("lingvPagho") ? kreiStaton("lingvPagho", markiAktivanLingvon) : null;
  lingvPopUp = document.getElementById("lingvPopUp") ? kreiStaton("lingvPopUp", markiAktivanLingvon) : null;
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

if ( typeof document !== "undefined" ) {
  if ( document.readyState === "loading" ) {
    document.addEventListener("DOMContentLoaded", inicializi);
  } else {
    inicializi();
  }
}
