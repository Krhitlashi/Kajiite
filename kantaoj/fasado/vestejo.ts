// ≺⧼ Vestejo 👕 ⧽≻
// La vestara panelo ( plenekrana, kiel la informo-panelo ) kun langetoj por la
// vestoj kaj la hararo, kaj la elektita aspekto de la ludanto. La elekto restas
// tra la lanĉoj — la modulo mem tenas la nunan veston, har-stilon kaj -koloron
// ( kaj la indeksojn, kiujn la retila stato bezonas ĉiukadre ), do la orkestrilo
// nur legas ilin kaj malfermas la panelon.
import { VESTOJ, HARSTILOJ, HARKOLOROJ, kreiVestanAntauxrigardon, kreiHaranAntauxrigardon } from "../../eskekoj/vestaro/vestoj.js";
import type { Vesto, Harstilo } from "../../eskekoj/vestaro/vestoj.js";
import { deksesuma } from "../../eskekoj/komunajxoj/koloroj.js";
import type { Figuro } from "../../eskekoj/shalaj-specioj/homoj.js";
import { traduki } from "../lingvo/tradukoj.js";
import { aplikiVacepu } from "./efikoj.js";
import { kreiPanelKarton, kreiNomlinion } from "./paneeloj.js";

// LudantaAspekto — la nuna aspekto de la ludanto. La indeksoj iras al la retila
// stato ( por ke la aliaj ludantoj vidu la saman figureton ), la objektoj al la
// internoj ( la vestaj koloroj tintas la pordon ).
export interface LudantaAspekto {
  vesto: Vesto;
  vestoIdx: number;
  harStilo: Harstilo;
  harStiloIdx: number;
  harKoloro: number;
  harKoloroIdx: number;
}

// VestarajOpcioj — la elementoj de la panelo, la figuro sur kiu la elekto
// aperas, kaj la kelkaj agoj de la orkestrilo, kiujn la butonoj bezonas.
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

  // Nuna har-stilo kaj -koloro de la ludanto — por la aktiva-karto marko kaj la
  // antauxrigardoj en la vestaro.
  let aktivaHarStilo = HARSTILOJ[0], aktivaHarKoloro = HARKOLOROJ[0].koloro;
  // La nuna vesto — spuro por la retilo ( la aspekto de la ludanto ĉe la aliaj ).
  let aktivaVesto = VESTOJ[0];
  // Kaŝitaj indeksoj de la aktiva aspekto — la retila stato uzas ilin ĉiukadre,
  // kaj indexOf/findIndex ĉiukadre estus senutila skanado de la vestaro.
  let aktivaVestoIdx = 0, aktivaHarStiloIdx = 0, aktivaHarKoloroIdx = 0;

  // ⟪ Konservita vestaro ( localStorage ) 📃 ⟫ — la elektita vesto, har-stilo
  // kaj -koloro restas tra la lanĉoj. La samaj indeksoj kiel la retila stato.
  const VESTARA_SXLOSILO = "aranis-vestaro";
  // sxargiKonservitanVestaron — Legu la konservitajn indeksojn kaj kontrolu ilin
  // kontraŭ la nuna vestaro ( malnova aŭ fremda konservo ne rompu la lanĉon ).
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
  // konserviVestaron — Skribu la nunajn indeksojn post ĉiu elekto.
  function konserviVestaron(): void {
    try {
      localStorage.setItem(VESTARA_SXLOSILO, JSON.stringify({ v: aktivaVestoIdx, h: aktivaHarStiloIdx, c: aktivaHarKoloroIdx }));
    } catch { /* privata retumado */ }
  }
  // Apliku la elektitan aspekton al la figuro — la konservita aŭ la defaŭlta
  // ( la samaj kiel la unuaj kartoj, anstataŭ la hazarda NPC-nuanco ).
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

  // ⟪ La panelo 📃 ⟫ — la langeta sxaltado reuzas sxaltiTabon ( kantaoj/fasado/paneeloj.ts ).
  function plenigiVestaron() {
    vestaListo.innerHTML = "";
    VESTOJ.forEach(( o ) => {
      const card = kreiPanelKarton([
        kreiVestanAntauxrigardon(o),
        kreiNomlinion(traduki(o.nomo)),
      ], () => {
        vestaro.classList.remove("montri");
        // Surmetu la veston al la ludanto — la modelo sxangxas kolorojn tuj.
        aktivaVesto = o;
        aktivaVestoIdx = VESTOJ.indexOf(o);
        ludantaFiguro.agordiVeston(o);
        montriTost(traduki(o.nomo));
        konserviVestaron();
      });
      vestaListo.appendChild(card);
    });
    // Har-stila sekcio — apartaj kartoj por la formo de la haro. La elekto
    // sxangxas la modelon tuj; la koloro restas la nuna.
    haraListo.innerHTML = "";
    const sekcio = document.createElement("p");
    // La aih-klaso bezonatas por ke vacepu envolvu la titolon ( ĝi traktas
    // nur elementojn kun la aih-klaso ) — samkiel la kartoj.
    sekcio.className = "ksakap2sa aih";
    sekcio.textContent = traduki("sekcioHararo");
    haraListo.appendChild(sekcio);
    const stilaKartaro = document.createElement("div");
    stilaKartaro.className = "vestaVico";
    HARSTILOJ.forEach(( stilo ) => {
      // La antauxrigardo uzas la NUNAN har-koloron, por ke la karto spegulu la
      // modelon post kolor-elekto.
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
    // Har-kolora sekcio — paletro sendependa de la stilo; ronda svecxo montras
    // la nuancon. La elekto tinkturas la nuna stilon tuj.
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
    // La novaj titoloj/kartoj bezonas la vacepu-vortojn ( aih ) — ĉiukaze,
    // ankaŭ post lingvo-ŝangxo dum la panelo estas malfermita.
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
    // La novaj vestaj kartoj bezonas la vacepu-vortojn ( aih ).
    aplikiVacepu();
  });
  vestaro.addEventListener("click", ( e ) => {
    if ( e.target === vestaro ) fermiVestaron();
  });
  // Kiam la lingvo ŝanĝiĝas dum la panelo estas malfermita, replenu la listojn.
  window.addEventListener("lingvosxangxo", () => {
    if ( vestaro.classList.contains("montri") ) plenigiVestaron();
  });

  return {
    legi: () => ({ vesto: aktivaVesto, vestoIdx: aktivaVestoIdx, harStilo: aktivaHarStilo, harStiloIdx: aktivaHarStiloIdx, harKoloro: aktivaHarKoloro, harKoloroIdx: aktivaHarKoloroIdx }),
    plenigi: plenigiVestaron,
    fermi: fermiVestaron,
  };
}
