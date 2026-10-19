// ≺⧼ បន្ទប់សម្លៀកបំពាក់ 👕 ⧽≻
import { VESTOJ, HARSTILOJ, HARKOLOROJ, kreiVestanAntauxrigardon, kreiHaranAntauxrigardon } from "../../eskekoj/vestaro/vestoj.js";
import type { Vesto, Harstilo } from "../../eskekoj/vestaro/vestoj.js";
import { deksesuma } from "../../eskekoj/komunajxoj/koloroj.js";
import type { Figuro } from "../../eskekoj/shalaj-specioj/homoj.js";
import { traduki } from "../lingvo/tradukoj.js";
import { aplikiVacepu } from "./efikoj.js";
import { kreiPanelKarton, kreiNomlinion, kreiSekcianTitolon, ligiTabojn, sxaltiTabonEn } from "./paneeloj.js";
import { kreiPaghon, kreiPanelon } from "./paghoj.js";
import type { Pagho, Panelo } from "./paghoj.js";

export interface LudantaAspekto {
  vesto: Vesto;
  vestoIdx: number;
  harStilo: Harstilo;
  harStiloIdx: number;
  harKoloro: number;
  harKoloroIdx: number;
}

export interface VestarajOpcioj {
  /*រូបលេងនៅក្នុងពិភពលោក ។ នៅផ្ទាំងចាប់ផ្តើមគ្មានរូបទេ
      @param ludantaFiguro ( Figuro , optional ) */
  ludantaFiguro?: Figuro;
  /*ការជូនដំណឹង ។ នៅផ្ទាំងចាប់ផ្តើមគ្មានទេ
      @param montriTost ( function , optional ) */
  montriTost?: ( mesagxo: string ) => void;
}

export interface Vestejo {
  legi(): LudantaAspekto;
  plenigi(): void;
  /*ទំព័រពេញ ៖ ប្រើនៅផ្ទាំងចាប់ផ្តើម */
  malfermi(): void;
  /*ផ្ទាំងលេចឡើង ៖ ប្រើក្នុងហ្គេម ដូចមុន */
  malfermiEnMondo(): void;
  fermi(): void;
  cxuMalfermita(): boolean;
}

// ⟪ សម្លៀកបំពាក់រក្សាទុក ( localStorage ) 📃 ⟫
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

// ⟪ តួសម្លៀកបំពាក់រួម ៖ សង់ម្តង , ដាក់ចូលទំព័រពេញ ឬផ្ទាំងលេចឡើងតាមការបើក 📃 ⟫
// ⟨ មានតែមួយផ្ទាំងបើកបាន ៖ ដូច្នេះតួតែមួយផ្លាស់ទីរវាងសែលទាំងពីរ ជំនួសការសង់ស្ទួន 📃 ⟩
interface VestaraKorpo {
  elemento: HTMLElement;
  taboj: HTMLElement;
  vestaListo: HTMLElement;
  haraListo: HTMLElement;
}

const TABOJ: [ string, string ][] = [ [ "vestoj", "taboVestoj" ], [ "hararo", "taboHararo" ] ];

function konstruiKorpon(): VestaraKorpo {
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
  vestaListo.className = "vestaVico";
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

// ⟨ បំពេញបញ្ជីសម្លៀកបំពាក់ 📃 ⟩
function plenigiVestajnListojn( korpo: VestaraKorpo, elekto: VestaElekto ): void {
  korpo.vestaListo.innerHTML = "";
  VESTOJ.forEach(( o, vestoIdx ) => {
    korpo.vestaListo.appendChild(kreiPanelKarton([
      kreiVestanAntauxrigardon(o),
      kreiNomlinion(traduki(o.nomo)),
    ], () => elekti("vesto", vestoIdx), vestoIdx === elekto.v));
  });

  korpo.haraListo.innerHTML = "";
  korpo.haraListo.appendChild(kreiSekcianTitolon("sekcioHararo"));
  const stilaKartaro = document.createElement("div");
  stilaKartaro.className = "vestaVico";
  HARSTILOJ.forEach(( stilo, harIdx ) => {
    stilaKartaro.appendChild(kreiPanelKarton([
      kreiHaranAntauxrigardon(stilo, HARKOLOROJ[elekto.c].koloro),
      kreiNomlinion(traduki(stilo.nomo)),
    ], () => elekti("haro", harIdx), harIdx === elekto.h));
  });
  korpo.haraListo.appendChild(stilaKartaro);

  korpo.haraListo.appendChild(kreiSekcianTitolon("sekcioHarKoloroj"));
  const koloraKartaro = document.createElement("div");
  koloraKartaro.className = "vestaVico";
  HARKOLOROJ.forEach(( harKoloro, kolorIdx ) => {
    const chip = document.createElement("span");
    chip.className = "harKoloroChip";
    chip.style.background = deksesuma(harKoloro.koloro);
    koloraKartaro.appendChild(kreiPanelKarton([
      chip,
      kreiNomlinion(traduki(harKoloro.nomo)),
    ], () => elekti("koloro", kolorIdx), kolorIdx === elekto.c));
  });
  korpo.haraListo.appendChild(koloraKartaro);
}

// ⟨ ស្ថានភាពរួម ៖ តួតែមួយសម្រាប់ទំព័រពេញ ( ផ្ទាំងចាប់ផ្តើម ) និងផ្ទាំងលេចឡើង ( ហ្គេម ) 📃 ⟩
let korpo: VestaraKorpo | null = null;
let ujoPagho: HTMLElement | null = null;
let ujoPanelo: HTMLElement | null = null;
let preparita = false;
let pagho: Pagho | null = null;
let panelo: Panelo | null = null;
let ludantaFiguro: Figuro | null = null;
let montriTost: ( ( mesagxo: string ) => void ) | null = null;

let aktivaVesto = VESTOJ[0], aktivaHarStilo = HARSTILOJ[0], aktivaHarKoloro = HARKOLOROJ[0].koloro;
let aktivaVestoIdx = 0, aktivaHarStiloIdx = 0, aktivaHarKoloroIdx = 0;

function sxargiKonservitan(): void {
  const konservita = legiKonservitanVestaron();
  if ( konservita === null ) return;
  aktivaVestoIdx = konservita.v;
  aktivaHarStiloIdx = konservita.h;
  aktivaHarKoloroIdx = konservita.c;
  aktivaVesto = VESTOJ[aktivaVestoIdx];
  aktivaHarStilo = HARSTILOJ[aktivaHarStiloIdx];
  aktivaHarKoloro = HARKOLOROJ[aktivaHarKoloroIdx].koloro;
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

// ⟨ ការជ្រើស ៖ ប្រភេទទាំងបីចែកកូដជ្រើសតែមួយ , រួចធ្វើបច្ចុប្បន្នភាពទាំងអស់ 📃 ⟩
type ElektaTipo = "vesto" | "haro" | "koloro";

function nomoDe( tipo: ElektaTipo, idx: number ): string {
  if ( tipo === "vesto" ) return VESTOJ[idx].nomo;
  if ( tipo === "haro" ) return HARSTILOJ[idx].nomo;
  return HARKOLOROJ[idx].nomo;
}

function elekti( tipo: ElektaTipo, idx: number ): void {
  if ( tipo === "vesto" ) {
    aktivaVesto = VESTOJ[idx];
    aktivaVestoIdx = idx;
  } else if ( tipo === "haro" ) {
    aktivaHarStilo = HARSTILOJ[idx];
    aktivaHarStiloIdx = idx;
  } else {
    aktivaHarKoloro = HARKOLOROJ[idx].koloro;
    aktivaHarKoloroIdx = idx;
  }
  aplikiVeston();
  montriTost?.(traduki(nomoDe(tipo, idx)));
  konserviNunan();
  plenigiVestaron();
}

function gxisdatigiTabojn(): void {
  if ( !korpo ) return;
  for ( const [ tabo, klavo ] of TABOJ ) {
    const butono = korpo.taboj.querySelector<HTMLElement>(`button[data-tabo="${tabo}"]`);
    if ( butono ) butono.textContent = traduki(klavo);
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

// ⟨ ដាក់តួរួមចូលសែលដែលកំពុងបើក 📃 ⟩
function surmeti( ujo: HTMLElement | null ): void {
  if ( !ujo || !korpo || korpo.elemento.parentElement === ujo ) return;
  ujo.appendChild(korpo.elemento);
}

/*បង្កើតឬទាញយកទំព័រសម្លៀកបំពាក់ ៖ តួតែមួយសម្រាប់ទាំងអស់
    @param opcioj ( VestarajOpcioj ) - រូបលេង និងការជូនដំណឹង , បើមាន
@returns vestejo */
export function kreiVestejon( opcioj: VestarajOpcioj = {} ): Vestejo {
  if ( opcioj.ludantaFiguro ) {
    ludantaFiguro = opcioj.ludantaFiguro;
    sxargiKonservitan();
    aplikiVeston();
  }
  if ( opcioj.montriTost ) montriTost = opcioj.montriTost;
  if ( !preparita ) {
    sxargiKonservitan();
    preparita = true;
    korpo = konstruiKorpon();
    ujoPagho = document.getElementById("vestPagho")?.querySelector("[data-vestaraUjo]") ?? null;
    ujoPanelo = document.getElementById("vestaro")?.querySelector("[data-vestaraUjo]") ?? null;
    if ( document.getElementById("vestPagho") ) pagho = kreiPaghon("vestPagho", plenigiVestaron);
    if ( document.getElementById("vestaro") ) panelo = kreiPanelon("vestaro", plenigiVestaron);
    window.addEventListener("lingvosxangxo", () => {
      if ( vestejo.cxuMalfermita() ) plenigiVestaron();
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
      if ( panelo?.cxuMalfermita() ) panelo.fermi();
      else pagho?.fermi();
    },
    cxuMalfermita: () => Boolean(pagho?.cxuMalfermita() || panelo?.cxuMalfermita()),
};

/*សម្លៀកបំពាក់សកម្មរបស់ពិភពលោក ៖ សម្រាប់ការរក្សាទុក
@returns elekto ( VestaElekto ) */
export function aktivaVestaElekto(): VestaElekto {
  return { v: aktivaVestoIdx, h: aktivaHarStiloIdx, c: aktivaHarKoloroIdx };
}

/*អនុវត្តសម្លៀកបំពាក់ដែលបានរក្សាទុកទៅរូបលេងថ្មី
    @param figuro ( Figuro ) - រូបលេង */
export function agordiVestanFiguron( figuro: Figuro ): void {
  ludantaFiguro = figuro;
  sxargiKonservitan();
  aplikiVeston();
}
