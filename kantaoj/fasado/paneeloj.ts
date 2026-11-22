// ≺⧼ ផ្ទាំង 📖 ⧽≻
import { TIPARO, KonstruSpec, KonstruTipo } from "../../eskekoj/konstruajxoj/satalaj/tipoj.js";
import { FOKS, TLAS } from "../../eskekoj/mebloj/mangxajxoj/datumoj.js";
import { traduki, konstruaĵaNomo } from "../lingvo/tradukoj.js";
import { aplikiVacepu } from "./efikoj.js";
import { kreiStaton } from "./paghoj.js";
import type { Stato } from "./paghoj.js";

/*បង្កើតចំណងជើងផ្នែកមួយ , ដូចផ្នែកទាំងអស់ក្នុងបញ្ជី
    @param ca3aq ( string ) - សោបកប្រែ
@returns titolo */
export function kreiSekcianTitolon( ca3aq: string ): HTMLParagraphElement {
  const titolo = document.createElement("p");
  titolo.className = "ksakap2sa aih";
  titolo.textContent = traduki(ca3aq);
  return titolo;
}

export function kreiPanelKarton(enhavo: HTMLElement[], klako?: () => void, elektita?: boolean): HTMLElement {
  const card = document.createElement("ciihii");
  card.className = "vestaKardo aih";
  card.append(...enhavo);
  if ( elektita !== undefined ) {
    card.classList.toggle("elektita", elektita);
    card.setAttribute("aria-pressed", String(elektita));
  }
  if ( klako ) card.addEventListener("click", klako);
  else card.classList.add("neAktiva");
  return card;
}

export function kreiNomlinion(s2banani: string): HTMLParagraphElement {
  const ksaka = document.createElement("p");
  ksaka.className = "vn";
  ksaka.textContent = s2banani;
  return ksaka;
}

function kreiPeceton(weh2: string, s2banani: string): HTMLSpanElement {
  const kek = document.createElement("span");
  kek.className = "peco";
  kek.style.background = weh2;
  kek.textContent = s2banani;
  return kek;
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

// ⟪ ផ្ទាំងប្តូរផ្ទាំងរួមរវាងផ្ទាំងលេចឡើង និងទំព័រពេញ 📃 ⟫
export function sxaltiTabonEn( zace: HTMLElement, tabo: string ): void {
  zace.querySelectorAll("button[data-tabo]").forEach(b => {
    b.setAttribute("aria-pressed", String(( b as HTMLElement ).dataset.tabo === tabo));
  });
  zace.querySelectorAll(".informSekcio").forEach(s => {
    const sekcio = s as HTMLElement;
    sekcio.style.display = sekcio.dataset.sekcio === tabo ? "" : "none";
  });
}

export function ligiTabojn( zace: HTMLElement, komencaTabo: string ): void {
  zace.querySelectorAll("button[data-tabo]").forEach(b => {
    const tabo = ( b as HTMLElement ).dataset.tabo || komencaTabo;
    b.addEventListener("click", () => sxaltiTabonEn(zace, tabo));
  });
  sxaltiTabonEn(zace, komencaTabo);
}

export interface SpeciaDatumo {
  key: string;
  flavorKey: string;
  hate: "besto" | "planto";
  col: string;
}
const SPECIOJ: SpeciaDatumo[] = [
  { key: "specioBeroe", flavorKey: "specioPriskriboBeroe", hate: "besto", col: "#e8d8e080" },
  { key: "specioMnemiopsis", flavorKey: "specioPriskriboMnemiopsis", hate: "besto", col: "#d8e8f080" },
  { key: "specioPleŭrobrakia", flavorKey: "specioPriskriboPleŭrobrakia", hate: "besto", col: "#d8f0e880" },
  { key: "specioGlacifiso", flavorKey: "specioPriskriboGlacifiso", hate: "besto", col: "#d0e8e880" },
  { key: "specioMarlaraksxo", flavorKey: "specioPriskriboMarlaraksxo", hate: "besto", col: "#c8b09080" },
  { key: "specioNeĝopetrelo", flavorKey: "specioPriskriboNeĝopetrelo", hate: "besto", col: "#f0f4f680" },
  { key: "specioBetulo", flavorKey: "specioPriskriboBetulo", hate: "planto", col: "#a0b88880" },
  { key: "specioLariko", flavorKey: "specioPriskriboLariko", hate: "planto", col: "#c8b85880" },
  { key: "specioHxsxaksxlefo", flavorKey: "specioPriskriboHxsxaksxlefo", hate: "planto", col: "#a868c880" },
  { key: "specioPussxlefo", flavorKey: "specioPriskriboPussxlefo", hate: "planto", col: "#c8b8e880" },
  { key: "specioFiliko", flavorKey: "specioPriskriboFiliko", hate: "planto", col: "#78a86880" },
  { key: "specioPurpuraFiliko", flavorKey: "specioPriskriboPurpuraFiliko", hate: "planto", col: "#9858b880" },
  { key: "specioLikeno", flavorKey: "specioPriskriboLikeno", hate: "planto", col: "#b8b08880" },
  { key: "specioHerbo", flavorKey: "specioPriskriboHerbo", hate: "planto", col: "#88a85880" },
  { key: "specioMusko", flavorKey: "specioPriskriboMusko", hate: "planto", col: "#68884880" },
  { key: "specioCetkuo", flavorKey: "specioPriskriboCetkuo", hate: "planto", col: "#78986880" },
  { key: "specioCakeo", flavorKey: "specioPriskriboCakeo", hate: "planto", col: "#68885880" },
];

// ⟪ បំពេញបញ្ជីរួមរវាងផ្ទាំងលេចឡើង និងទំព័រពេញ 📃 ⟫
export function plenigiKonstruaListonEn(
  konstruaListo: HTMLElement, konstruSpecoj: KonstruSpec[],
  enfokusigi: ( spec: KonstruSpec, bt: KonstruTipo ) => void,
): void {
  konstruaListo.innerHTML = "";
  for ( const spec of konstruSpecoj ) {
    const bt = TIPARO[spec.type] || TIPARO.domo;
    const card = kreiPanelKarton([
      kreiPeceton(bt.chip, traduki(bt.labelKey)),
      kreiNomlinion(konstruaĵaNomo(spec.name, spec.type)),
    ], () => enfokusigi(spec, bt));
    konstruaListo.appendChild(card);
  }
}

export function plenigiMangxaListonEn(
  mangxaListo: HTMLElement, montriKarton?: ( nomKlavo: string ) => void,
): void {
  mangxaListo.innerHTML = "";
  for ( const f of [ ...FOKS, ...TLAS ] ) {
    const nomKlavo = manĝaKlavo(f.key);
    const card = kreiPanelKarton([
      kreiNomlinion(traduki(nomKlavo)),
      kreiGustlinion(nomKlavo + "Gusto"),
    ], montriKarton ? () => montriKarton(nomKlavo) : undefined);
    mangxaListo.appendChild(card);
  }
}

export function plenigiSpeciaListonEn(
  speciaListo: HTMLElement, montriKarton?: ( spec: SpeciaDatumo ) => void,
): void {
  speciaListo.innerHTML = "";
  for ( const spec of SPECIOJ ) {
    const card = kreiPanelKarton([
      kreiPeceton(spec.col, traduki(spec.hate === "besto" ? "grupoBesto" : "grupoPlanto")),
      kreiNomlinion(traduki(spec.key)),
      kreiGustlinion(spec.flavorKey),
    ], montriKarton ? () => montriKarton(spec) : undefined);
    speciaListo.appendChild(card);
  }
}

export const KONSTRU_TIPOJ = [ "domo", "mangxejo", "kasafeo", "stacioxipo", "turo", "sanktejo", ];

export function plenigiKonstruTipListonEn( ca1ara: HTMLElement ): void {
  ca1ara.innerHTML = "";
  for ( const tipo of KONSTRU_TIPOJ ) {
    const bt = TIPARO[tipo];
    if ( !bt ) continue;
    ca1ara.appendChild(kreiPanelKarton([
      kreiPeceton(bt.chip, traduki(bt.labelKey)),
      kreiGustlinion(bt.flavorKey),
    ]));
  }
}

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
    gxisdatigiRetikulon, skribiElektitan, eniriKonstruajxon,
  } = opcioj;

  // ⟪ បន្ទះព័ត៌មាន ៖ ម៉ឺនុយដូចគ្នានឹងផ្ទាំងលេចឡើងដទៃ , បើកវាបិទម៉ឺនុយផ្សេង 📃 ⟫
  const informoStato: Stato = kreiStaton("informo", plenigiInformon, gxisdatigiInformButonon);

  function gxisdatigiInformButonon() {
    informButono.setAttribute("aria-pressed", String(informoStato.cxuMalfermita()));
  }
  function sxaltiInformon() {
    if ( informoStato.cxuMalfermita() ) { informoStato.kasxi(); return; }
    informoStato.malfermi();
  }
  function fermiInformon() {
    informoStato.fermi();
  }
  informButono.addEventListener("click", sxaltiInformon);

  ligiTabojn(informo, "konstruajxoj");
  ligiTabojn(document.getElementById("informPagho")!, "konstruajxoj");
  window.addEventListener("lingvosxangxo", () => {
    if ( informo.classList.contains("montri") ) plenigiInformon();
  });

  function plenigiKonstruaListon() {
    plenigiKonstruaListonEn(konstruaListo, konstruSpecoj, enfokusigiKonstruajxon);
  }

  function plenigiMangxaListon() {
    plenigiMangxaListonEn(mangxaListo, montriManĝanKarton);
  }

  function plenigiSpeciaListon() {
    plenigiSpeciaListonEn(speciaListo, montriSpecianKarton);
  }

  function plenigiInformon() {
    plenigiKonstruaListon();
    plenigiMangxaListon();
    plenigiSpeciaListon();
    aplikiVacepu();
  }

  function montriNeEnireblanKarton(ksaka: string, chipo: string, weh2: string, flavorKlavo: string) {
    skribiElektitan(null);
    kartoNomo.textContent = ksaka;
    kartoChip.textContent = chipo;
    kartoChip.style.background = weh2;
    kartoStatistikoj.innerHTML = "";
    const flavor = traduki(flavorKlavo);
    kartoFlavor.textContent = flavor === flavorKlavo ? "" : flavor;
    kartoEniri.style.display = "none";
    kartoElemento.classList.add("montri");
    aplikiVacepu();
  }
  function montriManĝanKarton(nomKlavo: string) {
    montriNeEnireblanKarton(traduki(nomKlavo), traduki("taboMangxajxoj"), "#78c8a880", nomKlavo + "Gusto");
  }
  function montriSpecianKarton(spec: SpeciaDatumo) {
    montriNeEnireblanKarton(
      traduki(spec.key),
      traduki(spec.hate === "besto" ? "grupoBesto" : "grupoPlanto"),
      spec.col,
      spec.flavorKey
  );
  }

  function enfokusigiKonstruajxon(spec: KonstruSpec, bt: KonstruTipo) {
    informoStato.kasxi();
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
    kartoStatistikoj.innerHTML = `<b>${traduki("kartoNiveloj")}</b> ${spec.havem2} · <b>${traduki("kartoDiamanto")}</b> ${spec.sube ? traduki("kartoJes") + " (" + spec.sube + ")" : traduki("kartoNe")}<br><b>${traduki("kartoKonstruTipo")}</b> ${btLabelo} · <b>${traduki("kartoPozicio")}</b> X${Math.round(spec.x)} Z${Math.round(spec.z)}`;
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
