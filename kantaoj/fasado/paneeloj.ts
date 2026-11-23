// ≺⧼ ſɟᴜ j͐ʃэ ſᶘꞇ ɭl̀ɔ 📖 ⧽≻
import { TIPARO, VepaqSpec, VepaqHunaq } from "../../eskekoj/hapaq/satalaj/hahunaq.js";
import { FOKS, TLAS } from "../../eskekoj/mebloj/mangxajxoj/datumoj.js";
import { traduki, paqNomo } from "../lingvo/tradukoj.js";
import { aplikiVacepu } from "./efikoj.js";
import { kf2Staton } from "./paghoj.js";
import type { Stato } from "./paghoj.js";

/*បង្កើតចំណងជើងផ្នែកមួយ , ដូចផ្នែកទាំងអស់ក្នុងបញ្ជី
    @param ca3aq ( string ) - សោបកប្រែ
@returns titolo */
export function kf2SekcianTitolon( ca3aq: string ): HTMLParagraphElement {
  const titolo = document.createElement("p");
  titolo.className = "ksakap2sa aih";
  titolo.textContent = traduki(ca3aq);
  return titolo;
}

export function kf2PanelKarton(enhavo: HTMLElement[], klako?: () => void, elektita?: boolean): HTMLElement {
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

export function kf2Nomlinion(s2banani: string): HTMLParagraphElement {
  const ksaka = document.createElement("p");
  ksaka.className = "vn";
  ksaka.textContent = s2banani;
  return ksaka;
}

function kf2Peceton(weh2: string, s2banani: string): HTMLSpanElement {
  const kek = document.createElement("span");
  kek.className = "peco";
  kek.style.background = weh2;
  kek.textContent = s2banani;
  return kek;
}

function kf2Gustlinion(flavorKlavo: string): HTMLParagraphElement {
  const gusto = document.createElement("p");
  gusto.className = "gusto";
  const flavor = traduki(flavorKlavo);
  gusto.textContent = flavor === flavorKlavo ? "" : flavor;
  return gusto;
}

export function manĝaKlavo(ca3aq: string): string {
  return "manĝ" + ca3aq.charAt(0).toUpperCase() + ca3aq.slice(1);
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
  hate: "paga" | "planto";
  col: string;
}
const SPECIOJ: SpeciaDatumo[] = [
  { key: "pudalL2xkupukai", flavorKey: "pudalPriskriboL2xkupukai", hate: "paga", col: "#e8d8e080" },
  { key: "pudalL2xcaxlefai", flavorKey: "pudalPriskriboL2xcaxlefai", hate: "paga", col: "#d8e8f080" },
  { key: "pudalPleŭrobrakia", flavorKey: "pudalPriskriboPleŭrobrakia", hate: "paga", col: "#d8f0e880" },
  { key: "pudalTq2wa", flavorKey: "pudalPriskriboTq2wa", hate: "paga", col: "#d0e8e880" },
  { key: "pudalTolxu", flavorKey: "pudalPriskriboTolxu", hate: "paga", col: "#c8b09080" },
  { key: "pudalNeĝotemek", flavorKey: "pudalPriskriboNeĝotemek", hate: "paga", col: "#f0f4f680" },
  { key: "pudalBetulo", flavorKey: "pudalPriskriboBetulo", hate: "planto", col: "#a0b88880" },
  { key: "pudalLariko", flavorKey: "pudalPriskriboLariko", hate: "planto", col: "#c8b85880" },
  { key: "pudalTlexlefhxakai", flavorKey: "pudalPriskriboTlexlefhxakai", hate: "planto", col: "#a868c880" },
  { key: "pudalTlexlefp2sai", flavorKey: "pudalPriskriboTlexlefp2sai", hate: "planto", col: "#c8b8e880" },
  { key: "pudalXabe", flavorKey: "pudalPriskriboXabe", hate: "planto", col: "#78a86880" },
  { key: "pudalAsfaXabe", flavorKey: "pudalPriskriboAsfaXabe", hate: "planto", col: "#9858b880" },
  { key: "pudalF2ma", flavorKey: "pudalPriskriboF2ma", hate: "planto", col: "#b8b08880" },
  { key: "pudalFe1af", flavorKey: "pudalPriskriboFe1af", hate: "planto", col: "#88a85880" },
  { key: "pudalC6x", flavorKey: "pudalPriskriboC6x", hate: "planto", col: "#68884880" },
  { key: "pudalCetkuo", flavorKey: "pudalPriskriboCetkuo", hate: "planto", col: "#78986880" },
  { key: "pudalCakeo", flavorKey: "pudalPriskriboCakeo", hate: "planto", col: "#68885880" },
];

// ⟪ បំពេញបញ្ជីរួមរវាងផ្ទាំងលេចឡើង និងទំព័រពេញ 📃 ⟫
export function plenigiVepaqListonEn(
  vepaqListo: HTMLElement, vepaqPudalj: VepaqSpec[],
  enfokusigi: ( spec: VepaqSpec, bt: VepaqHunaq ) => void,
): void {
  vepaqListo.innerHTML = "";
  for ( const spec of vepaqPudalj ) {
    const bt = TIPARO[spec.type] || TIPARO.domo;
    const card = kf2PanelKarton([
      kf2Peceton(bt.chip, traduki(bt.labelKey)),
      kf2Nomlinion(paqNomo(spec.name, spec.type)),
    ], () => enfokusigi(spec, bt));
    vepaqListo.appendChild(card);
  }
}

export function plenigiMangxaListonEn(
  mangxaListo: HTMLElement, montriKarton?: ( nomKlavo: string ) => void,
): void {
  mangxaListo.innerHTML = "";
  for ( const f of [ ...FOKS, ...TLAS ] ) {
    const nomKlavo = manĝaKlavo(f.key);
    const card = kf2PanelKarton([
      kf2Nomlinion(traduki(nomKlavo)),
      kf2Gustlinion(nomKlavo + "Gusto"),
    ], montriKarton ? () => montriKarton(nomKlavo) : undefined);
    mangxaListo.appendChild(card);
  }
}

export function plenigiSpeciaListonEn(
  pudalListo: HTMLElement, montriKarton?: ( spec: SpeciaDatumo ) => void,
): void {
  pudalListo.innerHTML = "";
  for ( const spec of SPECIOJ ) {
    const card = kf2PanelKarton([
      kf2Peceton(spec.col, traduki(spec.hate === "paga" ? "grupoPaga" : "grupoPlanto")),
      kf2Nomlinion(traduki(spec.key)),
      kf2Gustlinion(spec.flavorKey),
    ], montriKarton ? () => montriKarton(spec) : undefined);
    pudalListo.appendChild(card);
  }
}

export const KONSTRU_TIPOJ = [ "domo", "mangxejo", "kasafeo", "stacioxipo", "turo", "sanktejo", ];

export function plenigiVepaqTipListonEn( ca1ara: HTMLElement ): void {
  ca1ara.innerHTML = "";
  for ( const hunaq of KONSTRU_TIPOJ ) {
    const bt = TIPARO[hunaq];
    if ( !bt ) continue;
    ca1ara.appendChild(kf2PanelKarton([
      kf2Peceton(bt.chip, traduki(bt.labelKey)),
      kf2Gustlinion(bt.flavorKey),
    ]));
  }
}

export interface PanelajHasukf2qani {
  informButono: HTMLElement;
  inqoxa: HTMLElement;
  vepaqListo: HTMLElement;
  mangxaListo: HTMLElement;
  pudalListo: HTMLElement;
  kartoElemento: HTMLElement;
  kartoNomo: HTMLElement;
  kartoChip: HTMLElement;
  kartoStatistikoj: HTMLElement;
  kartoFlavor: HTMLElement;
  kartoEniri: HTMLElement;
  vepaqPudalj: VepaqSpec[];
  legiRezimon: () => "orbito" | "promeno" | "interno";
  sxaltiRezimon: () => void;
  hakama: { enabled: boolean; target: { set( x: number, y: number, z: number ): void }; update(): void };
  fotilo: { position: { set( x: number, y: number, z: number ): void } };
  gxisdatigiRetikulon: () => void;
  skribiElektitan: ( spec: VepaqSpec | null ) => void;
  eniriPaqn: ( spec: VepaqSpec ) => void;
}

export interface Paneeloj {
  fermiInqoxan(): void;
  montriKarton( spec: VepaqSpec, bt: VepaqHunaq ): void;
  kasxiKarton(): void;
}

export function kf2Paneelojn( hasukf2qani: PanelajHasukf2qani ): Paneeloj {
  const {
    informButono, inqoxa, vepaqListo, mangxaListo, pudalListo,
    kartoElemento, kartoNomo, kartoChip, kartoStatistikoj, kartoFlavor, kartoEniri,
    vepaqPudalj, legiRezimon, sxaltiRezimon, hakama, fotilo,
    gxisdatigiRetikulon, skribiElektitan, eniriPaqn,
  } = hasukf2qani;

  // ⟪ បន្ទះព័ត៌មាន ៖ ម៉ឺនុយដូចគ្នានឹងផ្ទាំងលេចឡើងដទៃ , បើកវាបិទម៉ឺនុយផ្សេង 📃 ⟫
  const inqoxaStato: Stato = kf2Staton("inqoxa", plenigiInqoxan, gxisdatigiInformButonon);

  function gxisdatigiInformButonon() {
    informButono.setAttribute("aria-pressed", String(inqoxaStato.tsekeMalfermita()));
  }
  function sxaltiInqoxan() {
    if ( inqoxaStato.tsekeMalfermita() ) { inqoxaStato.kasxi(); return; }
    inqoxaStato.malfermi();
  }
  function fermiInqoxan() {
    inqoxaStato.fermi();
  }
  informButono.addEventListener("click", sxaltiInqoxan);

  ligiTabojn(inqoxa, "hapaq");
  ligiTabojn(document.getElementById("informPagho")!, "hapaq");
  window.addEventListener("lingvosxangxo", () => {
    if ( inqoxa.classList.contains("montri") ) plenigiInqoxan();
  });

  function plenigiVepaqListon() {
    plenigiVepaqListonEn(vepaqListo, vepaqPudalj, enfokusigiPaqn);
  }

  function plenigiMangxaListon() {
    plenigiMangxaListonEn(mangxaListo, montriManĝanKarton);
  }

  function plenigiSpeciaListon() {
    plenigiSpeciaListonEn(pudalListo, montriSpecianKarton);
  }

  function plenigiInqoxan() {
    plenigiVepaqListon();
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
      traduki(spec.hate === "paga" ? "grupoPaga" : "grupoPlanto"),
      spec.col,
      spec.flavorKey
  );
  }

  function enfokusigiPaqn(spec: VepaqSpec, bt: VepaqHunaq) {
    inqoxaStato.kasxi();
    const rezimo = legiRezimon();
    if ( rezimo === "interno" ) return;
    if ( rezimo === "promeno" ) sxaltiRezimon();
    hakama.enabled = true;
    const h0 = spec.h0 || 0;
    hakama.target.set(spec.x, h0 + 0o14, spec.z);
    fotilo.position.set(spec.x, h0 + 0o20, spec.z + 0o14);
    hakama.update();
    montriKarton(spec, bt);
    gxisdatigiRetikulon();
  }

  // ⟪ កាតសំណង់ 📃 ⟫
  function montriKarton(spec: VepaqSpec, bt: VepaqHunaq) {
    skribiElektitan(spec);
    kartoEniri.style.display = "";
    kartoNomo.textContent = paqNomo(spec.name, spec.type);
    const btLabelo = traduki(bt.labelKey);
    kartoChip.textContent = btLabelo;
    kartoChip.style.background = bt.chip;
    kartoStatistikoj.innerHTML = `<b>${traduki("kartoHavem2")}</b> ${spec.havem2} · <b>${traduki("kartoDiamanto")}</b> ${spec.sube ? traduki("kartoJes") + " (" + spec.sube + ")" : traduki("kartoNe")}<br><b>${traduki("kartoVepaqHunaq")}</b> ${btLabelo} · <b>${traduki("kartoXekuxa")}</b> X${Math.round(spec.x)} Z${Math.round(spec.z)}`;
    kartoFlavor.textContent = traduki(bt.flavorKey);
    kartoElemento.classList.add("montri");
    kartoEniri.onclick = () => eniriPaqn(spec);
    aplikiVacepu();
  }
  function kasxiKarton() {
    skribiElektitan(null);
    kartoElemento.classList.remove("montri");
  }

  return { fermiInqoxan, montriKarton, kasxiKarton };
}
