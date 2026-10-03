// ≺⧼ ផ្ទាំង 📖 ⧽≻
import { TIPARO, KonstruSpec, KonstruTipo } from "../../eskekoj/konstruajxoj/satalaj/tipoj.js";
import { FOKS, TLAS } from "../../eskekoj/mebloj/mangxajxoj/datumoj.js";
import { traduki, konstruaĵaNomo } from "../lingvo/tradukoj.js";
import { aplikiVacepu } from "./efikoj.js";

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

export function kreiNomlinion(teksto: string): HTMLParagraphElement {
  const nomo = document.createElement("p");
  nomo.className = "vn";
  nomo.textContent = teksto;
  return nomo;
}

function kreiPeceton(koloro: string, teksto: string): HTMLSpanElement {
  const peco = document.createElement("span");
  peco.className = "peco";
  peco.style.background = koloro;
  peco.textContent = teksto;
  return peco;
}

function kreiGustlinion(flavorKlavo: string): HTMLParagraphElement {
  const gusto = document.createElement("p");
  gusto.className = "gusto";
  const flavor = traduki(flavorKlavo);
  gusto.textContent = flavor === flavorKlavo ? "" : flavor;
  return gusto;
}

export function manĝaKlavo(ŝlosilo: string): string {
  return "manĝ" + ŝlosilo.charAt(0).toUpperCase() + ŝlosilo.slice(1);
}

interface SpeciaDatumo {
  key: string;
  flavorKey: string;
  grupo: "besto" | "planto";
  col: string;
}
const SPECIOJ: SpeciaDatumo[] = [
  { key: "specBeroe", flavorKey: "flvSpecBeroe", grupo: "besto", col: "#e8d8e080" },
  { key: "specMnemiopsis", flavorKey: "flvSpecMnemiopsis", grupo: "besto", col: "#d8e8f080" },
  { key: "specPleŭrobrakia", flavorKey: "flvSpecPleŭrobrakia", grupo: "besto", col: "#d8f0e880" },
  { key: "specGlacifiso", flavorKey: "flvSpecGlacifiso", grupo: "besto", col: "#d0e8e880" },
  { key: "specMarlaraksxo", flavorKey: "flvSpecMarlaraksxo", grupo: "besto", col: "#c8b09080" },
  { key: "specNeĝopetrelo", flavorKey: "flvSpecNeĝopetrelo", grupo: "besto", col: "#f0f4f680" },
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
  legiRezimon: () => "orbito" | "promeno" | "interno";
  sxaltiRezimon: () => void;
  regiloj: { enabled: boolean; target: { set( x: number, y: number, z: number ): void }; update(): void };
  fotilo: { position: { set( x: number, y: number, z: number ): void } };
  gxisdatigiRetikulon: () => void;
  fermiVestaron: () => void;
  skribiElektitan: ( spec: KonstruSpec | null ) => void;
  eniriKonstruajxon: ( spec: KonstruSpec ) => void;
}

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
  sxaltiInformanTabon("konstruajxoj");
  document.querySelectorAll("#vestaroTaboj button").forEach(b => {
    const tabo = ( b as HTMLElement ).dataset.tabo || "vestoj";
    b.addEventListener("click", () => sxaltiVestaranTabon(tabo));
  });
  sxaltiVestaranTabon("vestoj");
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

  function montriNeEnireblanKarton(nomo: string, chipo: string, koloro: string, flavorKlavo: string) {
    skribiElektitan(null);
    kartoNomo.textContent = nomo;
    kartoChip.textContent = chipo;
    kartoChip.style.background = koloro;
    kartoStatistikoj.innerHTML = "";
    const flavor = traduki(flavorKlavo);
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

  function enfokusigiKonstruajxon(spec: KonstruSpec, bt: KonstruTipo) {
    fermiInformon();
    const rezimo = legiRezimon();
    if ( rezimo === "interno" ) return;
    if ( rezimo === "promeno" ) sxaltiRezimon();
    regiloj.enabled = true;
    const h0 = spec.h0 || 0;
    regiloj.target.set(spec.x, h0 + 0o14, spec.z);
    fotilo.position.set(spec.x, h0 + 0o20, spec.z + 0o14);
    regiloj.update();
    montriKarton(spec, bt);
    gxisdatigiRetikulon();
  }

  // ⟪ កាតសំណង់ 📃 ⟫
  function montriKarton(spec: KonstruSpec, bt: KonstruTipo) {
    skribiElektitan(spec);
    kartoEniri.style.display = "";
    kartoNomo.textContent = konstruaĵaNomo(spec.name, spec.type);
    const btLabelo = traduki(bt.labelKey);
    kartoChip.textContent = btLabelo;
    kartoChip.style.background = bt.chip;
    kartoStatistikoj.innerHTML = `<b>${traduki("statTieroj")}</b> ${spec.niveloj} · <b>${traduki("statDiamanto")}</b> ${spec.sube ? traduki("statJes") + " (" + spec.sube + ")" : traduki("statNe")}<br><b>${traduki("statTipo")}</b> ${btLabelo} · <b>${traduki("statPozicio")}</b> X${Math.round(spec.x)} Z${Math.round(spec.z)}`;
    kartoFlavor.textContent = traduki(bt.flavorKey);
    kartoElemento.classList.add("montri");
    kartoEniri.onclick = () => eniriKonstruajxon(spec);
    aplikiVacepu();
  }
  function kasxiKarton() {
    skribiElektitan(null);
    kartoElemento.classList.remove("montri");
  }

  return { fermiInformon, montriKarton, kasxiKarton };
}
