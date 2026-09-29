// ≺⧼ Paneloj 📖 ⧽≻
// La informo-panelo ( konstruaĵoj · manĝaĵoj · specioj ) kaj la komunaj
// panelkartoj. La butono (书) malfermas panelon kun tri langetoj — alklaki
// konstruaĵon enfokusigas ĝin en orbito kaj montras la konatan karton, dum
// manĝaĵoj kaj specioj montras sian informon en la sama karto ( sen la
// Eniri-butono ).
//
// La kartaj konstruiloj ( kreiPanelKarton, kreiNomlinion ) estas ankaŭ la
// sxablono de la vestaro, do ili estas aparte eksportitaj — la vestara panelo
// mem restas en la orkestrilo ( ĝi bezonas la ludantan figuron ).
import { TIPARO, KonstruSpec, KonstruTipo } from "../../eskekoj/konstruajxoj/satalaj-konstruajxoj.js";
import { FOKS, TLAS } from "../../eskekoj/mebloj/mangxajxoj.js";
import { traduki, konstruaĵaNomo } from "../lingvo/tradukoj.js";
import { aplikiVacepu } from "./efikoj.js";

// kreiPanelKarton — La komuna sxablono de la panelkartoj ( ciihii.vestaKardo.aih ).
// La kvar listoj ( konstruaĵoj, manĝaĵoj, specioj, vestaro ) malsamas nur en la
// enhavo, la elektita-stato kaj la klak-traktanto — la sxablono vivas unu loke.
//     @param enhavo ( HTMLElement [] , deviga ) - La eroj de la karto, en ordo
//         ( [ ĉipo, nomo, gusto ] aŭ [ antaŭrigardo, nomo ] ).
//     @param klako ( () => void , deviga ) - La klak-traktanto de la karto.
//     @param elektita ( boolean , nedeviga ) - Se donita, markas la karton
//         elektita kaj skribas aria-pressed ( la hararaj kaj har-koloraj kartoj ).
// @returns la karta elemento
export function kreiPanelKarton(enhavo: HTMLElement[], klako: () => void, elektita?: boolean): HTMLElement {
  const card = document.createElement("ciihii");
  card.className = "vestaKardo aih";
  card.append(...enhavo);
  if ( elektita !== undefined ) {
    card.classList.toggle("elektita", elektita);
    card.setAttribute("aria-pressed", String(elektita));
  }
  card.addEventListener("click", klako);
  return card;
}

// kreiNomlinion — La komuna <p class="vn"> ( la nomo ) de la panelkartoj.
//     @param teksto ( string , deviga ) - La montrata nomo.
// @returns la nom-elemento
export function kreiNomlinion(teksto: string): HTMLParagraphElement {
  const nomo = document.createElement("p");
  nomo.className = "vn";
  nomo.textContent = teksto;
  return nomo;
}

// kreiPeceton — La komuna kolora etikedo ( span.peco ) de la listoj.
//     @param koloro ( string , deviga ) - La fona koloro de la etikedo.
//     @param teksto ( string , deviga ) - La teksto de la etikedo.
// @returns la etikeda elemento
function kreiPeceton(koloro: string, teksto: string): HTMLSpanElement {
  const peco = document.createElement("span");
  peco.className = "peco";
  peco.style.background = koloro;
  peco.textContent = teksto;
  return peco;
}

// kreiGustlinion — La komuna <p class="gusto"> ( la gusto ) de la panelkartoj.
//     @param flavorKlavo ( string , deviga ) - La traduka klavo de la gusto.
// @returns la gust-elemento
function kreiGustlinion(flavorKlavo: string): HTMLParagraphElement {
  const gusto = document.createElement("p");
  gusto.className = "gusto";
  const flavor = traduki(flavorKlavo);
  // En aih la speciaj gustoj estas provizore malplenaj — montru malplenan linion.
  gusto.textContent = flavor === flavorKlavo ? "" : flavor;
  return gusto;
}

// manĝaKlavo — La traduka klavo de unu manĝaĵo ( "manĝ" + Kapitaligita ŝlosilo ).
// UNU kapitalig-loko ( antaŭe tri kopioj en la listo, la konsumo kaj la prompto ).
export function manĝaKlavo(ŝlosilo: string): string {
  return "manĝ" + ŝlosilo.charAt(0).toUpperCase() + ŝlosilo.slice(1);
}

// Speciaj datumoj — la bestoj kaj plantoj de la valo ( ne plu vestoj ).
//     key       - traduka klavo por la nomo.
//     flavorKey - traduka klavo por la gusto.
//     grupo     - "besto" aŭ "planto" ( la ĉipo-etikedo ).
//     col       - koloro de la ĉipo ( la sama kiel la 3D-specio ).
interface SpeciaDatumo {
  key: string;
  flavorKey: string;
  grupo: "besto" | "planto";
  col: string;
}
const SPECIOJ: SpeciaDatumo[] = [
  // Bestoj de la rivero kaj lago kaj de la ĉielo ( ĉiuj el bestoj.ts )
  { key: "specBeroe", flavorKey: "flvSpecBeroe", grupo: "besto", col: "#e8d8e080" },
  { key: "specMnemiopsis", flavorKey: "flvSpecMnemiopsis", grupo: "besto", col: "#d8e8f080" },
  { key: "specPleŭrobrakia", flavorKey: "flvSpecPleŭrobrakia", grupo: "besto", col: "#d8f0e880" },
  { key: "specGlacifiso", flavorKey: "flvSpecGlacifiso", grupo: "besto", col: "#d0e8e880" },
  { key: "specMarlaraksxo", flavorKey: "flvSpecMarlaraksxo", grupo: "besto", col: "#c8b09080" },
  { key: "specNeĝopetrelo", flavorKey: "flvSpecNeĝopetrelo", grupo: "besto", col: "#f0f4f680" },
  // Plantoj de la betularo ( el vegetajxo.ts )
  { key: "specBetulo", flavorKey: "flvSpecBetulo", grupo: "planto", col: "#a0b88880" },
  { key: "specLariko", flavorKey: "flvSpecLariko", grupo: "planto", col: "#c8b85880" },
  { key: "specHxsxaksxlefo", flavorKey: "flvSpecHxsxaksxlefo", grupo: "planto", col: "#a868c880" },
  { key: "specPussxlefo", flavorKey: "flvSpecPussxlefo", grupo: "planto", col: "#c8b8e880" },
  { key: "specFiliko", flavorKey: "flvSpecFiliko", grupo: "planto", col: "#78a86880" },
  { key: "specPurpuraFiliko", flavorKey: "flvSpecPurpuraFiliko", grupo: "planto", col: "#9858b880" },
  { key: "specLikeno", flavorKey: "flvSpecLikeno", grupo: "planto", col: "#b8b08880" },
  { key: "specHerbo", flavorKey: "flvSpecHerbo", grupo: "planto", col: "#88a85880" },
  { key: "specMusko", flavorKey: "flvSpecMusko", grupo: "planto", col: "#68884880" },
  { key: "specCetkuo", flavorKey: "flvSpecCetkuo", grupo: "planto", col: "#78986880" },
  { key: "specCakeo", flavorKey: "flvSpecCakeo", grupo: "planto", col: "#68885880" },
];

// PanelajOpcioj — kion la paneloj bezonas de la orkestrilo: la elementojn de la
// fasado, la speciajn datumojn kaj la kelkajn agojn, kiuj apartenas al la
// orkestrilo ( la reĝimo, la orbit-regiloj, la eniro en konstruaĵon ).
export interface PanelajOpcioj {
  informButono: HTMLElement;
  informo: HTMLElement;
  konstruaListo: HTMLElement;
  mangxaListo: HTMLElement;
  speciaListo: HTMLElement;
  kartoElemento: HTMLElement;
  kartoNomo: HTMLElement;
  kartoChip: HTMLElement;
  kartoStatistikoj: HTMLElement;
  kartoFlavor: HTMLElement;
  kartoEniri: HTMLElement;
  konstruSpecoj: KonstruSpec[];
  legiRezimon: () => "orbit" | "walk" | "interior";
  sxaltiRezimon: () => void;
  regiloj: { enabled: boolean; target: { set( x: number, y: number, z: number ): void }; update(): void };
  fotilo: { position: { set( x: number, y: number, z: number ): void } };
  gxisdatigiRetikulon: () => void;
  fermiVestaron: () => void;
  skribiElektitan: ( spec: KonstruSpec | null ) => void;
  eniriKonstruajxon: ( spec: KonstruSpec, bt: KonstruTipo ) => void;
}

// Paneeloj — la agoj, kiujn la orkestrilo vokas el la paneloj ( la resto estas
// private — la langetoj kaj la listoj vivas ene ).
export interface Paneeloj {
  fermiInformon(): void;
  montriKarton( spec: KonstruSpec, bt: KonstruTipo ): void;
  kasxiKarton(): void;
}

export function kreiPaneelojn( opcioj: PanelajOpcioj ): Paneeloj {
  const {
    informButono, informo, konstruaListo, mangxaListo, speciaListo,
    kartoElemento, kartoNomo, kartoChip, kartoStatistikoj, kartoFlavor, kartoEniri,
    konstruSpecoj, legiRezimon, sxaltiRezimon, regiloj, fotilo,
    gxisdatigiRetikulon, fermiVestaron, skribiElektitan, eniriKonstruajxon,
  } = opcioj;

  function gxisdatigiInformButonon() {
    informButono.setAttribute("aria-pressed", String(informo.classList.contains("montri")));
  }
  function sxaltiInformon() {
    informo.classList.toggle("montri");
    gxisdatigiInformButonon();
    if ( informo.classList.contains("montri") ) {
      fermiVestaron();
      plenigiInformon();
    }
  }
  function fermiInformon() {
    informo.classList.remove("montri");
    gxisdatigiInformButonon();
  }
  informButono.addEventListener("click", sxaltiInformon);
  informo.addEventListener("click", ( e ) => {
    if ( e.target === informo ) fermiInformon();
  });

  function sxaltiTabon(tabo: string, tabojId: string, paneloId: string) {
    document.querySelectorAll(`#${tabojId} button`).forEach(b => {
      b.setAttribute("aria-pressed", String(( b as HTMLElement ).dataset.tabo === tabo));
    });
    document.querySelectorAll(`#${paneloId} .informSekcio`).forEach(s => {
      const sekcio = s as HTMLElement;
      sekcio.style.display = sekcio.dataset.sekcio === tabo ? "" : "none";
    });
  }
  function sxaltiInformanTabon(tabo: string) {
    sxaltiTabon(tabo, "informTaboj", "informo");
  }
  function sxaltiVestaranTabon(tabo: string) {
    sxaltiTabon(tabo, "vestaroTaboj", "vestaro");
  }
  document.querySelectorAll("#informTaboj button").forEach(b => {
    const tabo = ( b as HTMLElement ).dataset.tabo || "konstruajxoj";
    b.addEventListener("click", () => sxaltiInformanTabon(tabo));
  });
  // Marku la komencan langeton kiel aktiva ( la unua sekcio estas videbla defaŭlte ).
  sxaltiInformanTabon("konstruajxoj");
  // La vestaro-lingvetoj — la sama sxaltado, kun la vestoj videblaj defaŭlte.
  document.querySelectorAll("#vestaroTaboj button").forEach(b => {
    const tabo = ( b as HTMLElement ).dataset.tabo || "vestoj";
    b.addEventListener("click", () => sxaltiVestaranTabon(tabo));
  });
  sxaltiVestaranTabon("vestoj");
  // Kiam la lingvo ŝanĝiĝas dum la panelo estas malfermita, replenu la listojn
  // ( sama ŝablono kiel la rezima butono ).
  window.addEventListener("lingvosxangxo", () => {
    if ( informo.classList.contains("montri") ) plenigiInformon();
  });

  function plenigiKonstruaListon() {
    konstruaListo.innerHTML = "";
    for ( const spec of konstruSpecoj ) {
      const bt = TIPARO[spec.type] || TIPARO.domo;
      const card = kreiPanelKarton([
        kreiPeceton(bt.chip, traduki(bt.labelKey)),
        kreiNomlinion(konstruaĵaNomo(spec.name, spec.type)),
      ], () => enfokusigiKonstruajxon(spec, bt));
      konstruaListo.appendChild(card);
    }
  }

  function plenigiMangxaListon() {
    mangxaListo.innerHTML = "";
    for ( const f of [ ...FOKS, ...TLAS ] ) {
      const nomKlavo = manĝaKlavo(f.key);
      const card = kreiPanelKarton([
        kreiNomlinion(traduki(nomKlavo)),
        kreiGustlinion(nomKlavo + "Flavor"),
      ], () => montriManĝanKarton(nomKlavo));
      mangxaListo.appendChild(card);
    }
  }

  function plenigiSpeciaListon() {
    speciaListo.innerHTML = "";
    for ( const spec of SPECIOJ ) {
      const card = kreiPanelKarton([
        kreiPeceton(spec.col, traduki(spec.grupo === "besto" ? "grupoBesto" : "grupoPlanto")),
        kreiNomlinion(traduki(spec.key)),
        kreiGustlinion(spec.flavorKey),
      ], () => montriSpecianKarton(spec));
      speciaListo.appendChild(card);
    }
  }

  function plenigiInformon() {
    plenigiKonstruaListon();
    plenigiMangxaListon();
    plenigiSpeciaListon();
    aplikiVacepu();
  }

  // montriNeEnireblanKarton — Montru informon ( manĝaĵo/specio ) en la sama
  // karto kiel konstruaĵoj, sed sen la Eniri-butono.
  function montriNeEnireblanKarton(nomo: string, chipo: string, koloro: string, flavorKlavo: string) {
    skribiElektitan(null);
    kartoNomo.textContent = nomo;
    kartoChip.textContent = chipo;
    kartoChip.style.background = koloro;
    kartoStatistikoj.innerHTML = "";
    const flavor = traduki(flavorKlavo);
    // En aih la speciaj gustoj estas provizore malplenaj — montru malplenan linion.
    kartoFlavor.textContent = flavor === flavorKlavo ? "" : flavor;
    kartoEniri.style.display = "none";
    kartoElemento.classList.add("montri");
    aplikiVacepu();
  }
  function montriManĝanKarton(nomKlavo: string) {
    montriNeEnireblanKarton(traduki(nomKlavo), traduki("tabMangxajxoj"), "#78c8a880", nomKlavo + "Flavor");
  }
  function montriSpecianKarton(spec: SpeciaDatumo) {
    montriNeEnireblanKarton(
      traduki(spec.key),
      traduki(spec.grupo === "besto" ? "grupoBesto" : "grupoPlanto"),
      spec.col,
      spec.flavorKey
  );
  }

  // enfokusigiKonstruajxon — Integriĝo kun la ekzistanta orbit-sistemo. Iru al
  // orbito, enfokusigu la konstruaĵon kaj montru ĝian karton ( kiel klako en orbito ).
  function enfokusigiKonstruajxon(spec: KonstruSpec, bt: KonstruTipo) {
    fermiInformon();
    const rezimo = legiRezimon();
    if ( rezimo === "interior" ) return;
    if ( rezimo === "walk" ) sxaltiRezimon();
    regiloj.enabled = true;
    const h0 = spec.h0 || 0;
    regiloj.target.set(spec.x, h0 + 0o14, spec.z);
    fotilo.position.set(spec.x, h0 + 0o20, spec.z + 0o14);
    regiloj.update();
    montriKarton(spec, bt);
    gxisdatigiRetikulon();
  }

  // ⟪ Konstruajxa karto 📃 ⟫
  function montriKarton(spec: KonstruSpec, bt: KonstruTipo) {
    skribiElektitan(spec);
    // Restarigu la Eniri-butonon ( montriNeEnireblanKarton kaŝas ĝin ).
    kartoEniri.style.display = "";
    kartoNomo.textContent = konstruaĵaNomo(spec.name, spec.type);
    const btLabelo = traduki(bt.labelKey);
    kartoChip.textContent = btLabelo;
    kartoChip.style.background = bt.chip;
    kartoStatistikoj.innerHTML = `<b>${traduki("statTieroj")}</b> ${spec.niveloj} · <b>${traduki("statDiamanto")}</b> ${spec.sube ? traduki("statJes") + " (" + spec.sube + ")" : traduki("statNe")}<br><b>${traduki("statTipo")}</b> ${btLabelo} · <b>${traduki("statPozicio")}</b> X${Math.round(spec.x)} Z${Math.round(spec.z)}`;
    kartoFlavor.textContent = traduki(bt.flavorKey);
    kartoElemento.classList.add("montri");
    kartoEniri.onclick = () => eniriKonstruajxon(spec, bt);
    // La nova karto-enhavo bezonas la vacepu-vortojn ( aih ).
    aplikiVacepu();
  }
  function kasxiKarton() {
    skribiElektitan(null);
    kartoElemento.classList.remove("montri");
  }

  return { fermiInformon, montriKarton, kasxiKarton };
}
