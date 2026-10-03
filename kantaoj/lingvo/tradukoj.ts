// ≺⧼ ការបកប្រែ 🗣️ ⧽≻
import { gkAlIpa, ipaAlLingvo } from "./sonaj-reguloj.js";
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
  try { localStorage.setItem("aranis-lingvo", lingvo); } catch { /* private browsing */ }
  if ( lingvo === "aih" && typeof vacepu === "function" ) {
    try { vacepu("aih"); } catch { /* ignorata */ }
  }
  window.dispatchEvent(new CustomEvent("lingvosxangxo"));
}

// ⟪ ប្តូរទៅភាសាបន្ទាប់ 📃 ⟫
function sxaltiLingvon(): void {
  const idx = LINGVOJ.indexOf(aktivaLingvo);
  const sekva = LINGVOJ[( idx + 1 ) % LINGVOJ.length];
  aplikiSkakefanon(sekva);
}

// ⟪ រកភាសាដែលចូលចិត្ត 📃 ⟫
function detektiLingvon(): string {
  try {
    const konservita = localStorage.getItem("aranis-lingvo");
    if ( konservita && LINGVOJ.includes(konservita) ) return konservita;
  } catch { /* private browsing */ }
  const lang = ( navigator.language || ( navigator as any ).userLanguage || "" ).split("-")[0];
  if ( lang === "eo" || lang === "ja" || lang === "aih" || lang === "km" ) return lang;
  return "aih";
}

// ⟪ ចាប់ផ្តើម 📃 ⟫
function inicializi(): void {
  aplikiSkakefanon(detektiLingvon());
  document.getElementById("butLingvo")?.addEventListener("click", sxaltiLingvon);
}

if ( document.readyState === "loading" ) {
  document.addEventListener("DOMContentLoaded", inicializi);
} else {
  inicializi();
}
