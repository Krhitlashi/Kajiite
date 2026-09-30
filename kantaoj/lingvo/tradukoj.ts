// ≺⧼ Tradukoj 🗣️ ⧽≻
// La traduk-sistemo de Aranis — la kvin lingvoj ( aih, eo, en, ja, km ) kaj la
// iloj por apliki ilin al la paĝo.
import { gkAlIpa, ipaAlLingvo } from "./sonaj-reguloj.js";
import { TIPARO } from "../../eskekoj/konstruajxoj/satalaj/tipoj.js";
import { AIH } from "./tradukoj/aih.js";
import { EO } from "./tradukoj/eo.js";
import { EN } from "./tradukoj/en.js";
import { JA } from "./tradukoj/ja.js";
import { KM } from "./tradukoj/km.js";

// ⟪ La vortaroj 📃 ⟫ — la kvin lingvoj logxas en kantaoj/lingvo/tradukoj/
// ( aih.ts, eo.ts, en.ts, ja.ts, km.ts ); cxi tie ili kunmetigxas en la
// vortaron, kiun la traduk-funkcioj kaj la derivado legas.
const skakefani: Record<string, Record<string, string>> = {
  aih: AIH,
  eo: EO,
  en: EN,
  ja: JA,
  km: KM,
};

const LINGVOJ = [ "aih", "eo", "en", "ja", "km", ];
let aktivaLingvo = "aih";

// ⟪ Publika API — traduki 📃 ⟫
// Redonu la tradukitan ŝnuron por la aktiva lingvo.
// Falu reen al la ŝlosilo mem se ne trovita.
// nomoAih — Nomo de konstruajxo en la gepatra Gawekiif-skribo (por la strat-signoj).
// Sennomaj konstruajxoj ( name preter paq33 ) falu reen al la defauxta nomo
// de ilia tipo el la satala TIPARO ( tipDomo, tipMangxejo, tipKasafeo, ... ).
//     @param tipo ( string = klavo ) - La konstrua-tipo ( satala TIPARO-sxlosilo ).
export function nomoAih(klavo: string, tipo = klavo): string {
  const rekta = skakefani.aih[klavo];
  if ( rekta ) return rekta;
  return skakefani.aih[TIPARO[tipo]?.labelKey ?? ""] ?? klavo;
}

// Konstruaĵnomoj ( paqN ), trakonomoj ( trakoN ), manĝaĵnomoj
// ( manĝFokN / manĝTlaN ) kaj la specifaj plantnomoj ( spec* ) povas esti
// DERIVITAJ de la aih-a Gawekiif per la sonaj reguloj ( kantaoj/lingvo/sonaj-reguloj.ts )
// kiam la aktiva lingvo ne havas propran tekston. En aih la gk-formo estas jam
// la fonto, kaj eo/en konservas siajn eksplicitajn plantnomojn.
// La aria-etikedoj de la trakoj ( ariaTrakoN ) uzas la derivitan trakonomon.
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
  // ariaTrakoN. Prefikso ( lingvo-specifa ) + derivita trakonomo.
  // spec*. Mankas rekta ja/km-ŝnuro por la specifaj plantnomoj, do ili ankaŭ
  // venas el la aih-formo per la samaj sonaj reguloj.
  const aria = /^ariaTrako(\d+)$/.exec(klavo);
  const bazo = aria ? "trako" + aria[1] : klavo;
  if ( !/^(paq|trako|manĝFok|manĝTla|manĝPuss)\d+$/.test(bazo) && !SPECIFIKAJ_PLANTNOMOJ.has(bazo) && !KONSTRUAJ_NOMOJ.has(bazo) ) return null;
  const aihFormo = skakefani.aih[bazo];
  if ( !aihFormo ) return null;
  // Manĝaĵnomoj kunhavas "•" disigilon ( nomo • gusto ). Derivu ĉiun flankon
  // aparte, por ke la disigilo kaj spacoj postvivu la konverton.
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

// konstruaĵaNomo — Nomo de konstruajxo por la UI ( karto, listo, prompto ).
// Sennomaj konstruajxoj ( name preter paq33, ne en la vortaro ) montru la
// defauxtan nomon de ilia tipo ( TIPARO-labelKey ) anstataux la krudan sxlosilon.
// traduki mem derivas la tip-nomojn ( KONSTRUAJ_NOMOJ ) en ĉiuj lingvoj.
//     @param tipo ( string = klavo ) - La konstrua-tipo ( satala TIPARO-sxlosilo ).
export function konstruaĵaNomo(klavo: string, tipo = klavo): string {
  if ( skakefani[aktivaLingvo]?.[klavo] || ( aktivaLingvo !== "aih" && deriviNomon(klavo) ) ) return traduki(klavo);
  return traduki(TIPARO[tipo]?.labelKey ?? klavo);
}

// Cxu la nuna lingvo estas la gepatra aih-a? ( Por la vacepu-formato. )
export function cxuAih(): boolean {
  return aktivaLingvo === "aih";
}

// ⟪ Apliki tradukojn al DOM 📃 ⟫
function aplikiSkakefanon(lingvo: string): void {
  aktivaLingvo = lingvo;
  // La skribo-direkto ( .menuPanel / #tosto ) sekvas la lingvon per html[lang=...].
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
  // En la aih-a lingvo oni envolvu la vortojn per vacepu ( el la ekstera ſɭɔ j͑ʃ'ɔ }ʃꞇ.js ).
  // La sama nestita-.aih-escepto kiel en sperto.ts — ne lasu ĝin haltigi la
  // lingvo-ŝanĝon ( la lingvosxangxo-dispeto okazas poste ).
  if ( lingvo === "aih" && typeof vacepu === "function" ) {
    try { vacepu("aih"); } catch { /* ignorata */ }
  }
  // Anoncu la ŝanĝon por ke dinamikaj etikedoj ( ekz. la reĝima butono ) refreŝiĝu.
  window.dispatchEvent(new CustomEvent("lingvosxangxo"));
}

// ⟪ Sxalti al sekva lingvo 📃 ⟫
function sxaltiLingvon(): void {
  const idx = LINGVOJ.indexOf(aktivaLingvo);
  const sekva = LINGVOJ[( idx + 1 ) % LINGVOJ.length];
  aplikiSkakefanon(sekva);
}

// ⟪ Detekti preferatan lingvon 📃 ⟫
function detektiLingvon(): string {
  try {
    const konservita = localStorage.getItem("aranis-lingvo");
    if ( konservita && LINGVOJ.includes(konservita) ) return konservita;
  } catch { /* private browsing */ }
  const lang = ( navigator.language || ( navigator as any ).userLanguage || "" ).split("-")[0];
  if ( lang === "eo" || lang === "ja" || lang === "aih" || lang === "km" ) return lang;
  return "aih";
}

// ⟪ Inicializi 📃 ⟫
function inicializi(): void {
  aplikiSkakefanon(detektiLingvon());
  document.getElementById("butLingvo")?.addEventListener("click", sxaltiLingvon);
}

// Atendu la DOM-on, tiam apliku la tradukojn
if ( document.readyState === "loading" ) {
  document.addEventListener("DOMContentLoaded", inicializi);
} else {
  inicializi();
}
