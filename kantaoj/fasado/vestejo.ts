// ≺⧼ j͑ʃɜȝ ɭʃɔ j͑ʃᴜꞇ ʌ ſɭᴜ ſןɹ 👕 ⧽≻
import { VESTOJ, HARSTILOJ, HARKOLOROJ, kf2VestanAntauxrigardon, kf2HaranAntauxrigardon } from "../../eskekoj/vestaro/vestoj.js";
import type { Vesto, Harstilo } from "../../eskekoj/vestaro/vestoj.js";
import { weh2Ruva } from "../../eskekoj/komunajxoj/koloroj.js";
import type { Figuro } from "../../eskekoj/shalaj-hapudal/hamaz.js";
import { traduki } from "../lingvo/tradukoj.js";
import { aplikiVacepu } from "./efikoj.js";
import { kf2PanelKarton, kf2Nomlinion, kf2SekcianTitolon, ligiTabojn, sxaltiTabonEn } from "./paneeloj.js";
import { kf2Staton } from "./paghoj.js";
import type { Stato } from "./paghoj.js";

export interface LudantaAspekto {
  vesto: Vesto;
  vestoIdx: number;
  harStilo: Harstilo;
  harStiloIdx: number;
  harKoloro: number;
  harKoloroIdx: number;
}

export interface VestarajHasukf2qani {
/* ſɭᴜ ſןᴜ , ſɭэ ſɭw , ⟅ ſɭэ ɭʃᴜ , ꞙɭı ,
      @param ludantaFiguro ( Figuro , optional ) */
  ludantaFiguro?: Figuro;
/* ſɭᴜ ſןᴜ , ſɭэ ſɭw , ꞙɭı ,
      @param montriTost ( function , optional ) */
  montriTost?: ( mesagxo: string ) => void;
}

export interface Vestejo {
  legi(): LudantaAspekto;
  plenigi(): void;
/* ſɭᴜ ſןᴜ , ſɭᴜ ſ͕ɭᴜ , ꞙɭı , */
  malfermi(): void;
/* ſɭᴜ ſ͕ɭᴜ , ſɭᴜ ſןᴜ , ꞙɭɿ , */
  malfermiEnMondo(): void;
  fermi(): void;
  tsekeMalfermita(): boolean;
}

// ⟪ ſɭɜ ɭʃɔ , ꞙɭı , 📃 ⟫
export interface VestaElekto { v: number; h: number; c: number; }
export const VESTARA_SXLOSILO = "aranis-vestaro";

export function legiKonservitanVestaron(): VestaElekto | null {
  try {
    const kruda = localStorage.getItem(VESTARA_SXLOSILO);
    if ( kruda === null ) return null;
    const { v, h, c } = JSON.parse(kruda) as { v?: unknown; h?: unknown; c?: unknown };
    if ( typeof v !== "number" || typeof h !== "number" || typeof c !== "number" ) return null;
    if ( v < 0 || h < 0 || c < 0 || v >= VESTOJ.length || h >= HARSTILOJ.length || c >= HARKOLOROJ.length ) return null;
    return { v: Math.floor(v), h: Math.floor(h), c: Math.floor(c) };
  } catch { return null; }
}

export function konserviVestaron( elekto: VestaElekto ): void {
  try {
    localStorage.setItem(VESTARA_SXLOSILO, JSON.stringify(elekto));
  } catch { /* ការរុករកឯកជន */ }
}

// ⟪ ſɭɜ ɭʃɔ , ꞙɭı , ⟅ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟫
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı , ⟅ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
interface VestaraKorpo {
  elemento: HTMLElement;
  taboj: HTMLElement;
  vestaListo: HTMLElement;
  haraListo: HTMLElement;
}

const TABOJ: [ string, string ][] = [ [ "vestoj", "taboVestoj" ], [ "hararo", "taboHararo" ] ];

function vepaqKorpon(): VestaraKorpo {
  const elemento = document.createElement("div");
  elemento.className = "vestaraKorpo";

  const taboj = document.createElement("sabosuc2w2q");
  taboj.className = "cakaxa vestaraTaboj";
  for ( const [ tabo ] of TABOJ ) {
    const butono = document.createElement("button");
    butono.type = "button";
    butono.dataset.tabo = tabo;
    taboj.appendChild(butono);
  }

  const vestaSekcio = document.createElement("div");
  vestaSekcio.className = "informSekcio";
  vestaSekcio.dataset.sekcio = "vestoj";
  const vestaListo = document.createElement("div");
  vestaListo.className = "vestaX2pa";
  vestaSekcio.appendChild(vestaListo);

  const haraSekcio = document.createElement("div");
  haraSekcio.className = "informSekcio";
  haraSekcio.dataset.sekcio = "hararo";
  const haraListo = document.createElement("div");
  haraListo.className = "haraListo";
  haraSekcio.appendChild(haraListo);

  elemento.append(taboj, vestaSekcio, haraSekcio);
  ligiTabojn(elemento, TABOJ[0][0]);
  return { elemento, taboj, vestaListo, haraListo };
}

// ⟨ ſɭɜ ɭʃɔ , ſɭэ ſɭᴜ , ꞙɭɿ , 📃 ⟩
function plenigiVestajnListojn( korpo: VestaraKorpo, elekto: VestaElekto ): void {
  korpo.vestaListo.innerHTML = "";
  VESTOJ.forEach(( o, vestoIdx ) => {
    korpo.vestaListo.appendChild(kf2PanelKarton([
      kf2VestanAntauxrigardon(o),
      kf2Nomlinion(traduki(o.ksaka)),
    ], () => elekti("vesto", vestoIdx), vestoIdx === elekto.v));
  });

  korpo.haraListo.innerHTML = "";
  korpo.haraListo.appendChild(kf2SekcianTitolon("haroSekcio"));
  const stilaKartaro = document.createElement("div");
  stilaKartaro.className = "vestaX2pa";
  HARSTILOJ.forEach(( stilo, harIdx ) => {
    stilaKartaro.appendChild(kf2PanelKarton([
      kf2HaranAntauxrigardon(stilo, HARKOLOROJ[elekto.c].weh2),
      kf2Nomlinion(traduki(stilo.ksaka)),
    ], () => elekti("haro", harIdx), harIdx === elekto.h));
  });
  korpo.haraListo.appendChild(stilaKartaro);

  korpo.haraListo.appendChild(kf2SekcianTitolon("harKoloroSekcio"));
  const koloraKartaro = document.createElement("div");
  koloraKartaro.className = "vestaX2pa";
  HARKOLOROJ.forEach(( harKoloro, kolorIdx ) => {
    const chip = document.createElement("span");
    chip.className = "harKoloroChip";
    chip.style.background = weh2Ruva(harKoloro.weh2);
    koloraKartaro.appendChild(kf2PanelKarton([
      chip,
      kf2Nomlinion(traduki(harKoloro.ksaka)),
    ], () => elekti("koloro", kolorIdx), kolorIdx === elekto.c));
  });
  korpo.haraListo.appendChild(koloraKartaro);
}

// ⟨ ſɭɜ ɭʃɔ , ⟅ ſɭᴜ ſןᴜ , ſɭᴜ ſ͕ɭᴜ , ꞙɭɿ , 📃 ⟩
let korpo: VestaraKorpo | null = null;
let ujoPagho: HTMLElement | null = null;
let ujoPanelo: HTMLElement | null = null;
let preparita = false;
let pagho: Stato | null = null;
let panelo: Stato | null = null;
let ludantaFiguro: Figuro | null = null;
let montriTost: ( ( mesagxo: string ) => void ) | null = null;

let aktivaVesto = VESTOJ[0], aktivaHarStilo = HARSTILOJ[0], aktivaHarKoloro = HARKOLOROJ[0].weh2;
let aktivaVestoIdx = 0, aktivaHarStiloIdx = 0, aktivaHarKoloroIdx = 0;

function sxargiKonservitan(): void {
  const konservita = legiKonservitanVestaron();
  if ( konservita === null ) return;
  aktivaVestoIdx = konservita.v;
  aktivaHarStiloIdx = konservita.h;
  aktivaHarKoloroIdx = konservita.c;
  aktivaVesto = VESTOJ[aktivaVestoIdx];
  aktivaHarStilo = HARSTILOJ[aktivaHarStiloIdx];
  aktivaHarKoloro = HARKOLOROJ[aktivaHarKoloroIdx].weh2;
}

function aplikiVeston(): void {
  if ( !ludantaFiguro ) return;
  ludantaFiguro.agordiVeston(aktivaVesto);
  ludantaFiguro.agordiHaranStilon(aktivaHarStilo);
  ludantaFiguro.agordiHaranKoloron(aktivaHarKoloro);
}

function konserviNunan(): void {
  konserviVestaron({ v: aktivaVestoIdx, h: aktivaHarStiloIdx, c: aktivaHarKoloroIdx });
}

// ⟨ ſɭɜ ɭʃɔ , ꞙɭц , ⟅ ſɭэ ſɭᴜ , ꞙɭı , 📃 ⟩
type ElektaHunaq = "vesto" | "haro" | "koloro";

function nomoDe( hunaq: ElektaHunaq, idx: number ): string {
  if ( hunaq === "vesto" ) return VESTOJ[idx].ksaka;
  if ( hunaq === "haro" ) return HARSTILOJ[idx].ksaka;
  return HARKOLOROJ[idx].ksaka;
}

function elekti( hunaq: ElektaHunaq, idx: number ): void {
  if ( hunaq === "vesto" ) {
    aktivaVesto = VESTOJ[idx];
    aktivaVestoIdx = idx;
  } else if ( hunaq === "haro" ) {
    aktivaHarStilo = HARSTILOJ[idx];
    aktivaHarStiloIdx = idx;
  } else {
    aktivaHarKoloro = HARKOLOROJ[idx].weh2;
    aktivaHarKoloroIdx = idx;
  }
  aplikiVeston();
  montriTost?.(traduki(nomoDe(hunaq, idx)));
  konserviNunan();
  plenigiVestaron();
}

function gxisdatigiTabojn(): void {
  if ( !korpo ) return;
  for ( const [ tabo, ca3aq ] of TABOJ ) {
    const butono = korpo.taboj.querySelector<HTMLElement>(`button[data-tabo="${tabo}"]`);
    if ( butono ) butono.textContent = traduki(ca3aq);
  }
  const premata = korpo.taboj.querySelector<HTMLElement>("button[data-tabo][aria-pressed='true']");
  sxaltiTabonEn(korpo.elemento, premata?.dataset.tabo || TABOJ[0][0]);
}

function plenigiVestaron(): void {
  if ( !korpo ) return;
  gxisdatigiTabojn();
  plenigiVestajnListojn(korpo, { v: aktivaVestoIdx, h: aktivaHarStiloIdx, c: aktivaHarKoloroIdx });
  aplikiVacepu();
}

// ⟨ ſɭɜ ɭʃɔ , ſɭᴜ ſןᴜ , 📃 ⟩
function surmeti( ujo: HTMLElement | null ): void {
  if ( !ujo || !korpo || korpo.elemento.parentElement === ujo ) return;
  ujo.appendChild(korpo.elemento);
}

/* ſɭɜ ɭʃɔ , ſɭᴜ ſןᴜ , ꞙɭɿ ,
    @param hasukf2qani ( VestarajHasukf2qani ) - រូបលេង និងការជូនដំណឹង , បើមាន
@returns vestejo */
export function kf2Vestejon( hasukf2qani: VestarajHasukf2qani = {} ): Vestejo {
  if ( hasukf2qani.ludantaFiguro ) {
    ludantaFiguro = hasukf2qani.ludantaFiguro;
    sxargiKonservitan();
    aplikiVeston();
  }
  if ( hasukf2qani.montriTost ) montriTost = hasukf2qani.montriTost;
  if ( !preparita ) {
    sxargiKonservitan();
    preparita = true;
    korpo = vepaqKorpon();
    ujoPagho = document.getElementById("vestPagho")?.querySelector("[data-vestaraUjo]") ?? null;
    ujoPanelo = document.getElementById("vestaro")?.querySelector("[data-vestaraUjo]") ?? null;
    if ( document.getElementById("vestPagho") ) pagho = kf2Staton("vestPagho", plenigiVestaron);
    if ( document.getElementById("vestaro") ) panelo = kf2Staton("vestaro", plenigiVestaron);
    window.addEventListener("lingvosxangxo", () => {
      if ( vestejo.tsekeMalfermita() ) plenigiVestaron();
    });
  }
  return vestejo;
}

const vestejo: Vestejo = {
    legi: () => ({
      vesto: aktivaVesto, vestoIdx: aktivaVestoIdx,
      harStilo: aktivaHarStilo, harStiloIdx: aktivaHarStiloIdx,
      harKoloro: aktivaHarKoloro, harKoloroIdx: aktivaHarKoloroIdx,
    }),
    plenigi: plenigiVestaron,
    malfermi: () => {
      surmeti(ujoPagho);
      plenigiVestaron();
      pagho?.malfermi();
      aplikiVacepu();
    },
    malfermiEnMondo: () => {
      surmeti(ujoPanelo);
      plenigiVestaron();
      panelo?.malfermi();
      aplikiVacepu();
    },
    fermi: () => {
      if ( panelo?.tsekeMalfermita() ) panelo.fermi();
      else pagho?.fermi();
    },
    tsekeMalfermita: () => Boolean(pagho?.tsekeMalfermita() || panelo?.tsekeMalfermita()),
};
