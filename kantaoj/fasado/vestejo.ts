// ≺⧼ បន្ទប់សម្លៀកបំពាក់ 👕 ⧽≻
import { VESTOJ, HARSTILOJ, HARKOLOROJ, kreiVestanAntauxrigardon, kreiHaranAntauxrigardon } from "../../eskekoj/vestaro/vestoj.js";
import type { Vesto, Harstilo } from "../../eskekoj/vestaro/vestoj.js";
import { deksesuma } from "../../eskekoj/komunajxoj/koloroj.js";
import type { Figuro } from "../../eskekoj/shalaj-specioj/homoj.js";
import { traduki } from "../lingvo/tradukoj.js";
import { aplikiVacepu } from "./efikoj.js";
import { kreiPanelKarton, kreiNomlinion } from "./paneeloj.js";

export interface LudantaAspekto {
  vesto: Vesto;
  vestoIdx: number;
  harStilo: Harstilo;
  harStiloIdx: number;
  harKoloro: number;
  harKoloroIdx: number;
}

export interface VestarajOpcioj {
  vestaro: HTMLElement;
  vestaListo: HTMLElement;
  haraListo: HTMLElement;
  ludantaFiguro: Figuro;
  montriTost: ( mesagxo: string ) => void;
  fermiInformon: () => void;
  fermiNaviganPopUp: () => void;
}

export interface Vestejo {
  legi(): LudantaAspekto;
  plenigi(): void;
  fermi(): void;
}

export function kreiVestejon( opcioj: VestarajOpcioj ): Vestejo {
  const { vestaro, vestaListo, haraListo, ludantaFiguro, montriTost, fermiInformon, fermiNaviganPopUp } = opcioj;

  let aktivaHarStilo = HARSTILOJ[0], aktivaHarKoloro = HARKOLOROJ[0].koloro;
  let aktivaVesto = VESTOJ[0];
  let aktivaVestoIdx = 0, aktivaHarStiloIdx = 0, aktivaHarKoloroIdx = 0;

  // ⟪ សម្លៀកបំពាក់រក្សាទុក ( localStorage ) 📃 ⟫
  const VESTARA_SXLOSILO = "aranis-vestaro";
  function sxargiKonservitanVestaron(): { v: number; h: number; c: number } | null {
    try {
      const kruda = localStorage.getItem(VESTARA_SXLOSILO);
      if ( kruda === null ) return null;
      const { v, h, c } = JSON.parse(kruda) as { v?: unknown; h?: unknown; c?: unknown };
      if ( typeof v !== "number" || typeof h !== "number" || typeof c !== "number" ) return null;
      if ( v < 0 || h < 0 || c < 0 || v >= VESTOJ.length || h >= HARSTILOJ.length || c >= HARKOLOROJ.length ) return null;
      return { v: Math.floor(v), h: Math.floor(h), c: Math.floor(c) };
    } catch { return null; }
  }
  function konserviVestaron(): void {
    try {
      localStorage.setItem(VESTARA_SXLOSILO, JSON.stringify({ v: aktivaVestoIdx, h: aktivaHarStiloIdx, c: aktivaHarKoloroIdx }));
    } catch { /* privata retumado */ }
  }
  const konservitaVestaro = sxargiKonservitanVestaron();
  if ( konservitaVestaro !== null ) {
    aktivaVesto = VESTOJ[konservitaVestaro.v];
    aktivaHarStilo = HARSTILOJ[konservitaVestaro.h];
    aktivaHarKoloro = HARKOLOROJ[konservitaVestaro.c].koloro;
    aktivaVestoIdx = konservitaVestaro.v;
    aktivaHarStiloIdx = konservitaVestaro.h;
    aktivaHarKoloroIdx = konservitaVestaro.c;
  }
  ludantaFiguro.agordiVeston(aktivaVesto);
  ludantaFiguro.agordiHaranStilon(aktivaHarStilo);
  ludantaFiguro.agordiHaranKoloron(aktivaHarKoloro);

  // ⟪ ផ្ទាំង 📃 ⟫
  function plenigiVestaron() {
    vestaListo.innerHTML = "";
    VESTOJ.forEach(( o ) => {
      const card = kreiPanelKarton([
        kreiVestanAntauxrigardon(o),
        kreiNomlinion(traduki(o.nomo)),
      ], () => {
        vestaro.classList.remove("montri");
        aktivaVesto = o;
        aktivaVestoIdx = VESTOJ.indexOf(o);
        ludantaFiguro.agordiVeston(o);
        montriTost(traduki(o.nomo));
        konserviVestaron();
      });
      vestaListo.appendChild(card);
    });
    haraListo.innerHTML = "";
    const sekcio = document.createElement("p");
    sekcio.className = "ksakap2sa aih";
    sekcio.textContent = traduki("sekcioHararo");
    haraListo.appendChild(sekcio);
    const stilaKartaro = document.createElement("div");
    stilaKartaro.className = "vestaVico";
    HARSTILOJ.forEach(( stilo ) => {
      const card = kreiPanelKarton([
        kreiHaranAntauxrigardon(stilo, aktivaHarKoloro),
        kreiNomlinion(traduki(stilo.nomo)),
      ], () => {
        vestaro.classList.remove("montri");
        aktivaHarStilo = stilo;
        aktivaHarStiloIdx = HARSTILOJ.indexOf(stilo);
        ludantaFiguro.agordiHaranStilon(stilo);
        montriTost(traduki(stilo.nomo));
        konserviVestaron();
      }, stilo.nomo === aktivaHarStilo.nomo);
      stilaKartaro.appendChild(card);
    });
    haraListo.appendChild(stilaKartaro);
    const koloraSekcio = document.createElement("p");
    koloraSekcio.className = "ksakap2sa aih";
    koloraSekcio.textContent = traduki("sekcioHarKoloroj");
    haraListo.appendChild(koloraSekcio);
    const koloraKartaro = document.createElement("div");
    koloraKartaro.className = "vestaVico";
    HARKOLOROJ.forEach(( harKoloro ) => {
      const chip = document.createElement("span");
      chip.className = "harKoloroChip";
      chip.style.background = deksesuma(harKoloro.koloro);
      const card = kreiPanelKarton([
        chip,
        kreiNomlinion(traduki(harKoloro.nomo)),
      ], () => {
        vestaro.classList.remove("montri");
        aktivaHarKoloro = harKoloro.koloro;
        aktivaHarKoloroIdx = HARKOLOROJ.indexOf(harKoloro);
        ludantaFiguro.agordiHaranKoloron(harKoloro.koloro);
        montriTost(traduki(harKoloro.nomo));
        konserviVestaron();
      }, harKoloro.koloro === aktivaHarKoloro);
      koloraKartaro.appendChild(card);
    });
    haraListo.appendChild(koloraKartaro);
    aplikiVacepu();
  }
  function fermiVestaron() {
    vestaro.classList.remove("montri");
  }
  document.getElementById("butVesti")!.addEventListener("click", () => {
    plenigiVestaron();
    fermiInformon();
    fermiNaviganPopUp();
    vestaro.classList.add("montri");
    aplikiVacepu();
  });
  vestaro.addEventListener("click", ( e ) => {
    if ( e.target === vestaro ) fermiVestaron();
  });
  window.addEventListener("lingvosxangxo", () => {
    if ( vestaro.classList.contains("montri") ) plenigiVestaron();
  });

  return {
    legi: () => ({ vesto: aktivaVesto, vestoIdx: aktivaVestoIdx, harStilo: aktivaHarStilo, harStiloIdx: aktivaHarStiloIdx, harKoloro: aktivaHarKoloro, harKoloroIdx: aktivaHarKoloroIdx }),
    plenigi: plenigiVestaron,
    fermi: fermiVestaron,
  };
}
