// ≺⧼ បន្ទប់សម្លៀកបំពាក់ 👕 ⧽≻
import { VESTOJ, HARSTILOJ, HARKOLOROJ, kreiVestanAntauxrigardon, kreiHaranAntauxrigardon } from "../../eskekoj/vestaro/vestoj.js";
import type { Vesto, Harstilo } from "../../eskekoj/vestaro/vestoj.js";
import { deksesuma } from "../../eskekoj/komunajxoj/koloroj.js";
import type { Figuro } from "../../eskekoj/shalaj-specioj/homoj.js";
import { traduki } from "../lingvo/tradukoj.js";
import { aplikiVacepu } from "./efikoj.js";
import { kreiPanelKarton, kreiNomlinion, kreiSekcianTitolon } from "./paneeloj.js";
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

// ⟪ បំពេញបញ្ជីសម្លៀកបំពាក់ 📃 ⟫
export function plenigiVestajnListojn(
  vestaListo: HTMLElement, haraListo: HTMLElement, elekto: VestaElekto,
  onVesto: ( idx: number ) => void, onHaro: ( idx: number ) => void, onKoloro: ( idx: number ) => void,
): void {
  vestaListo.innerHTML = "";
  VESTOJ.forEach(( o, vestoIdx ) => {
    const card = kreiPanelKarton([
      kreiVestanAntauxrigardon(o),
      kreiNomlinion(traduki(o.nomo)),
    ], () => onVesto(vestoIdx), vestoIdx === elekto.v);
    vestaListo.appendChild(card);
  });
  haraListo.innerHTML = "";
  haraListo.appendChild(kreiSekcianTitolon("sekcioHararo"));
  const stilaKartaro = document.createElement("div");
  stilaKartaro.className = "vestaVico";
  HARSTILOJ.forEach(( stilo, harIdx ) => {
    const card = kreiPanelKarton([
      kreiHaranAntauxrigardon(stilo, HARKOLOROJ[elekto.c].koloro),
      kreiNomlinion(traduki(stilo.nomo)),
    ], () => onHaro(harIdx), harIdx === elekto.h);
    stilaKartaro.appendChild(card);
  });
  haraListo.appendChild(stilaKartaro);
  haraListo.appendChild(kreiSekcianTitolon("sekcioHarKoloroj"));
  const koloraKartaro = document.createElement("div");
  koloraKartaro.className = "vestaVico";
  HARKOLOROJ.forEach(( harKoloro, kolorIdx ) => {
    const chip = document.createElement("span");
    chip.className = "harKoloroChip";
    chip.style.background = deksesuma(harKoloro.koloro);
    const card = kreiPanelKarton([
      chip,
      kreiNomlinion(traduki(harKoloro.nomo)),
    ], () => onKoloro(kolorIdx), kolorIdx === elekto.c);
    koloraKartaro.appendChild(card);
  });
  haraListo.appendChild(koloraKartaro);
}

// ⟪ ស្ថានភាពរួម ៖ បញ្ជីតែមួយសម្រាប់ទំព័រ ( ផ្ទាំងចាប់ផ្តើម ) និងផ្ទាំងលេចឡើង ( ហ្គេម ) 📃 ⟫
interface VestajUjoj { vesta: HTMLElement; hara: HTMLElement; }
const ujoj: VestajUjoj[] = [];
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

function aplikialVeston(): void {
  if ( !ludantaFiguro ) return;
  ludantaFiguro.agordiVeston(aktivaVesto);
  ludantaFiguro.agordiHaranStilon(aktivaHarStilo);
  ludantaFiguro.agordiHaranKoloron(aktivaHarKoloro);
}

function konserviNunan(): void {
  konserviVestaron({ v: aktivaVestoIdx, h: aktivaHarStiloIdx, c: aktivaHarKoloroIdx });
}

// ⟨ ការជ្រើស ៖ បញ្ជីទាំងអស់ ( ទំព័រ និង ផ្ទាំងលេចឡើង ) ធ្វើបច្ចុប្បន្នភាពជាមួយគ្នា 📃 ⟩
function plenigiVestaron(): void {
  const elekto = { v: aktivaVestoIdx, h: aktivaHarStiloIdx, c: aktivaHarKoloroIdx };
  for ( const ujo of ujoj ) {
    plenigiVestajnListojn(ujo.vesta, ujo.hara, elekto, elektiVeston, elektiHaron, elektiKoloron);
  }
  aplikiVacepu();
}

function elektiVeston( idx: number ): void {
  aktivaVesto = VESTOJ[idx];
  aktivaVestoIdx = idx;
  aplikialVeston();
  montriTost?.(traduki(aktivaVesto.nomo));
  konserviNunan();
  plenigiVestaron();
}

function elektiHaron( idx: number ): void {
  aktivaHarStilo = HARSTILOJ[idx];
  aktivaHarStiloIdx = idx;
  aplikialVeston();
  montriTost?.(traduki(aktivaHarStilo.nomo));
  konserviNunan();
  plenigiVestaron();
}

function elektiKoloron( idx: number ): void {
  aktivaHarKoloro = HARKOLOROJ[idx].koloro;
  aktivaHarKoloroIdx = idx;
  aplikialVeston();
  montriTost?.(traduki(HARKOLOROJ[idx].nomo));
  konserviNunan();
  plenigiVestaron();
}

/*បង្កើតឬទាញយកទំព័រសម្លៀកបំពាក់ ៖ ទំព័រតែមួយសម្រាប់ទាំងអស់
    @param opcioj ( VestarajOpcioj ) - រូបលេង និងការជូនដំណឹង , បើមាន
@returns vestejo */
export function kreiVestejon( opcioj: VestarajOpcioj = {} ): Vestejo {
  if ( opcioj.ludantaFiguro ) {
    ludantaFiguro = opcioj.ludantaFiguro;
    sxargiKonservitan();
    aplikialVeston();
  }
  if ( opcioj.montriTost ) montriTost = opcioj.montriTost;
  if ( !preparita ) {
    preparita = true;
    for ( const [ vestaId, haraId ] of [
      [ "paghoVestaListo", "paghoHaraListo" ],
      [ "vestaListo", "haraListo" ],
    ] ) {
      const vesta = document.getElementById(vestaId);
      const hara = document.getElementById(haraId);
      if ( vesta && hara ) ujoj.push({ vesta, hara });
    }
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
      plenigiVestaron();
      pagho?.malfermi();
      aplikiVacepu();
    },
    malfermiEnMondo: () => {
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
  aplikialVeston();
}
