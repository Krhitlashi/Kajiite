// ≺⧼ ſɟᴜ j͐ʃэ ſᶘꞇ ɭl̀ɔ 📖 ⧽≻
import { TIPARO, VepaqSpec, VepaqHunaq } from "../../skek2/hapaq/satalaj/hahunaq.js";
import { FOKS, TLAS } from "../../skek2/w2ta/m7x/vop2.js";
import { traduki, paqKsaka } from "../gawe/baskakefani.js";
import { aplikiVacepu } from "./nesakf6ni.js";
import { kf2S2k61o } from "./vula.js";
import type { S2k61o } from "./vula.js";

/*ſɭɔ˞ᴜ ſɭᴜ ʌ j͑ʃᴜꞇ ʌ j͑ʃᴜ , ſɭɹ ʌ j͑ʃᴜꞇ ʌ j͑ʃᴜꞇ ʌ ꞙɭı ʌ ꞙɭı
    @param ca3aq ( string ) - ſɟᴜ ſ̀ȷᴜȝ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ
@returns hate2 */
export function kf2SekcianTitolon( ca3aq: string ): HTMLParagraphElement {
  const hate2 = document.createElement("p");
  hate2.className = "ksakap2sa aih";
  hate2.textContent = traduki(ca3aq);
  return hate2;
}

export function kf2PanelThala(enhavo: HTMLElement[], klako?: () => void, sukf2qita?: boolean): HTMLElement {
  const card = document.createElement("ciihii");
  card.className = "vestaKardo aih";
  card.append(...enhavo);
  if ( sukf2qita !== undefined ) {
    card.classList.toggle("sukf2qita", sukf2qita);
    card.setAttribute("aria-pressed", String(sukf2qita));
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
  kek.className = "kek";
  kek.style.background = weh2;
  kek.textContent = s2banani;
  return kek;
}

function kf2Gustlinion(flavorCatlaq: string): HTMLParagraphElement {
  const gusto = document.createElement("p");
  gusto.className = "gusto";
  const flavor = traduki(flavorCatlaq);
  gusto.textContent = flavor === flavorCatlaq ? "" : flavor;
  return gusto;
}

export function manĝaCatlaq(ca3aq: string): string {
  return "manĝ" + ca3aq.charAt(0).toUpperCase() + ca3aq.slice(1);
}

// ⟪ ſɟᴜ j͐ʃэ ſᶘꞇ ɭl̀ɔ ʌ j͑ʃᴜꞇ , j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ j͑ʃ'w j͐ʃᴜ 📃 ⟫
export function tsiinanusabosaiCax2lEn( zace: HTMLElement, cax2l: string ): void {
  zace.querySelectorAll("button[data-cax2l]").forEach(b => {
    b.setAttribute("aria-pressed", String(( b as HTMLElement ).dataset.cax2l === cax2l));
  });
  zace.querySelectorAll(".informQaroxema").forEach(s => {
    const qaroxema = s as HTMLElement;
    qaroxema.style.display = qaroxema.dataset.qaroxema === cax2l ? "" : "none";
  });
}

export function ligiHavula( zace: HTMLElement, saxeaCax2l: string ): void {
  zace.querySelectorAll("button[data-cax2l]").forEach(b => {
    const cax2l = ( b as HTMLElement ).dataset.cax2l || saxeaCax2l;
    b.addEventListener("click", () => tsiinanusabosaiCax2lEn(zace, cax2l));
  });
  tsiinanusabosaiCax2lEn(zace, saxeaCax2l);
}

export interface SpeciaVop2 {
  key: string;
  flavorKey: string;
  hate2: "paga" | "xa3e";
  col: string;
}
const SPECIOJ: SpeciaVop2[] = [
  { key: "pudalLiixkupukai", flavorKey: "pudalPriskriboLiixkupukai", hate2: "paga", col: "#e8d8e080" },
  { key: "pudalLiixcaxlefai", flavorKey: "pudalPriskriboLiixcaxlefai", hate2: "paga", col: "#d8e8f080" },
  { key: "pudalPleŭrobrakia", flavorKey: "pudalPriskriboPleŭrobrakia", hate2: "paga", col: "#d8f0e880" },
  { key: "pudalTq2wa", flavorKey: "pudalPriskriboTq2wa", hate2: "paga", col: "#d0e8e880" },
  { key: "pudalTolxu", flavorKey: "pudalPriskriboTolxu", hate2: "paga", col: "#c8b09080" },
  { key: "pudalNeĝotemek", flavorKey: "pudalPriskriboNeĝotemek", hate2: "paga", col: "#f0f4f680" },
  { key: "pudalBetulo", flavorKey: "pudalPriskriboBetulo", hate2: "xa3e", col: "#a0b88880" },
  { key: "pudalLariko", flavorKey: "pudalPriskriboLariko", hate2: "xa3e", col: "#c8b85880" },
  { key: "pudalTlexlefhxakai", flavorKey: "pudalPriskriboTlexlefhxakai", hate2: "xa3e", col: "#a868c880" },
  { key: "pudalTlexlefp2sai", flavorKey: "pudalPriskriboTlexlefp2sai", hate2: "xa3e", col: "#c8b8e880" },
  { key: "pudalXabe", flavorKey: "pudalPriskriboXabe", hate2: "xa3e", col: "#78a86880" },
  { key: "pudalAsfaXabe", flavorKey: "pudalPriskriboAsfaXabe", hate2: "xa3e", col: "#9858b880" },
  { key: "pudalF2ma", flavorKey: "pudalPriskriboF2ma", hate2: "xa3e", col: "#b8b08880" },
  { key: "pudalFe1af", flavorKey: "pudalPriskriboFe1af", hate2: "xa3e", col: "#88a85880" },
  { key: "pudalC6x", flavorKey: "pudalPriskriboC6x", hate2: "xa3e", col: "#68884880" },
  { key: "pudalCetkuo", flavorKey: "pudalPriskriboCetkuo", hate2: "xa3e", col: "#78986880" },
  { key: "pudalCakeo", flavorKey: "pudalPriskriboCakeo", hate2: "xa3e", col: "#68885880" },
];

// ⟪ ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ ʌ j͑ʃᴜꞇ , j͑ʃ'w j͐ʃᴜ 📃 ⟫
export function vetem2iVepaqCatsaraEn(
  konstruaCatsara: HTMLElement, vepaqPudalj: VepaqSpec[],
  enfokusigi: ( spec: VepaqSpec, bt: VepaqHunaq ) => void,
): void {
  konstruaCatsara.innerHTML = "";
  for ( const spec of vepaqPudalj ) {
    const bt = TIPARO[spec.type] || TIPARO.kap2;
    const card = kf2PanelThala([
      kf2Peceton(bt.chip, traduki(bt.labelKey)),
      kf2Nomlinion(paqKsaka(spec.name, spec.type)),
    ], () => enfokusigi(spec, bt));
    konstruaCatsara.appendChild(card);
  }
}

export function vetem2iMangxaCatsaraEn(
  mangxaCatsara: HTMLElement, laqaziThala?: ( nomCatlaq: string ) => void,
): void {
  mangxaCatsara.innerHTML = "";
  for ( const f of [ ...FOKS, ...TLAS ] ) {
    const nomCatlaq = manĝaCatlaq(f.key);
    const card = kf2PanelThala([
      kf2Nomlinion(traduki(nomCatlaq)),
      kf2Gustlinion(nomCatlaq + "Gusto"),
    ], laqaziThala ? () => laqaziThala(nomCatlaq) : undefined);
    mangxaCatsara.appendChild(card);
  }
}

export function vetem2iSpeciaCatsaraEn(
  speciaCatsara: HTMLElement, laqaziThala?: ( spec: SpeciaVop2 ) => void,
): void {
  speciaCatsara.innerHTML = "";
  for ( const spec of SPECIOJ ) {
    const card = kf2PanelThala([
      kf2Peceton(spec.col, traduki(spec.hate2 === "paga" ? "hatePaga" : "hatePlanto")),
      kf2Nomlinion(traduki(spec.key)),
      kf2Gustlinion(spec.flavorKey),
    ], laqaziThala ? () => laqaziThala(spec) : undefined);
    speciaCatsara.appendChild(card);
  }
}

export const KONSTRUTIPOJ = [ "kap2", "geqqa", "kasafeo", "ka5asexazxipo", "turo", "qaman2", ];

export function vetem2iVepaqTipCatsaraEn( ca1ara: HTMLElement ): void {
  ca1ara.innerHTML = "";
  for ( const hunaq of KONSTRUTIPOJ ) {
    const bt = TIPARO[hunaq];
    if ( !bt ) continue;
    ca1ara.appendChild(kf2PanelThala([
      kf2Peceton(bt.chip, traduki(bt.labelKey)),
      kf2Gustlinion(bt.flavorKey),
    ]));
  }
}

export interface PanelajHasukf2qani {
  informCatsiina: HTMLElement;
  informo: HTMLElement;
  konstruaCatsara: HTMLElement;
  mangxaCatsara: HTMLElement;
  speciaCatsara: HTMLElement;
  thalaKfe: HTMLElement;
  thalaKsaka: HTMLElement;
  thalaChip: HTMLElement;
  thalaHavop2kekai: HTMLElement;
  thalaFlavor: HTMLElement;
  thalaEniri: HTMLElement;
  vepaqPudalj: VepaqSpec[];
  vefalSupknu: () => "orbito" | "promeno" | "c2h2";
  tsiinanusabosaiSupknu: () => void;
  hakama: { enabled: boolean; target: { set( x: number, y: number, z: number ): void }; update(): void };
  catahaq: { position: { set( x: number, y: number, z: number ): void } };
  tlak2Retikulon: () => void;
  skribiSukf2qitan: ( spec: VepaqSpec | null ) => void;
  eniriPaqn: ( spec: VepaqSpec ) => void;
}

export interface Paneeloj {
  pukxeiInformon(): void;
  laqaziThala( spec: VepaqSpec, bt: VepaqHunaq ): void;
  kobesaiThala(): void;
}

export function kf2Paneelojn( hasukf2qani: PanelajHasukf2qani ): Paneeloj {
  const {
    informCatsiina, informo, konstruaCatsara, mangxaCatsara, speciaCatsara,
    thalaKfe, thalaKsaka, thalaChip, thalaHavop2kekai, thalaFlavor, thalaEniri,
    vepaqPudalj, vefalSupknu, tsiinanusabosaiSupknu, hakama, catahaq,
    tlak2Retikulon, skribiSukf2qitan, eniriPaqn,
  } = hasukf2qani;

  // ⟪ ſɟᴜ j͐ʃэ ſᶘꞇ ɭl̀ɔ ⟅ }ʃɹ ɭʃᴜ }ʃw ʌ ꞙɭı ʌ ꞙɭı , ſȷwɔ˞ ꞙɭɔ 📃 ⟫
  const informoS2k61o: S2k61o = kf2S2k61o("informo", vetem2iInformon, tlak2InformCatsiina);

  function tlak2InformCatsiina() {
    informCatsiina.setAttribute("aria-pressed", String(informoS2k61o.tsekeH6w6ita()));
  }
  function tsiinanusabosaiInformon() {
    if ( informoS2k61o.tsekeH6w6ita() ) { informoS2k61o.hidden(); return; }
    informoS2k61o.h6w6i();
  }
  function pukxeiInformon() {
    informoS2k61o.pukxei();
  }
  informCatsiina.addEventListener("click", tsiinanusabosaiInformon);

  ligiHavula(informo, "hapaq");
  ligiHavula(document.getElementById("informPagho")!, "hapaq");
  window.addEventListener("lingvovasaka", () => {
    if ( informo.classList.contains("laqazi") ) vetem2iInformon();
  });

  function vetem2iVepaqCatsara() {
    vetem2iVepaqCatsaraEn(konstruaCatsara, vepaqPudalj, enfokusigiPaqn);
  }

  function vetem2iMangxaCatsara() {
    vetem2iMangxaCatsaraEn(mangxaCatsara, laqaziManĝanThala);
  }

  function vetem2iSpeciaCatsara() {
    vetem2iSpeciaCatsaraEn(speciaCatsara, laqaziSpecianThala);
  }

  function vetem2iInformon() {
    vetem2iVepaqCatsara();
    vetem2iMangxaCatsara();
    vetem2iSpeciaCatsara();
    aplikiVacepu();
  }

  function laqaziNeEnireblanThala(ksaka: string, chipo: string, weh2: string, flavorCatlaq: string) {
    skribiSukf2qitan(null);
    thalaKsaka.textContent = ksaka;
    thalaChip.textContent = chipo;
    thalaChip.style.background = weh2;
    thalaHavop2kekai.innerHTML = "";
    const flavor = traduki(flavorCatlaq);
    thalaFlavor.textContent = flavor === flavorCatlaq ? "" : flavor;
    thalaEniri.style.display = "none";
    thalaKfe.classList.add("laqazi");
    aplikiVacepu();
  }
  function laqaziManĝanThala(nomCatlaq: string) {
    laqaziNeEnireblanThala(traduki(nomCatlaq), traduki("cax2lMangxajxoj"), "#78c8a880", nomCatlaq + "Gusto");
  }
  function laqaziSpecianThala(spec: SpeciaVop2) {
    laqaziNeEnireblanThala(
      traduki(spec.key),
      traduki(spec.hate2 === "paga" ? "hatePaga" : "hatePlanto"),
      spec.col,
      spec.flavorKey
  );
  }

  function enfokusigiPaqn(spec: VepaqSpec, bt: VepaqHunaq) {
    informoS2k61o.hidden();
    const supknu = vefalSupknu();
    if ( supknu === "c2h2" ) return;
    if ( supknu === "promeno" ) tsiinanusabosaiSupknu();
    hakama.enabled = true;
    const h0 = spec.h0 || 0;
    hakama.target.set(spec.x, h0 + 0o14, spec.z);
    catahaq.position.set(spec.x, h0 + 0o20, spec.z + 0o14);
    hakama.update();
    laqaziThala(spec, bt);
    tlak2Retikulon();
  }

  // ⟪ ʃэ ŋᷠэȝ ʌ ſɟɔȝ 📃 ⟫
  function laqaziThala(spec: VepaqSpec, bt: VepaqHunaq) {
    skribiSukf2qitan(spec);
    thalaEniri.style.display = "";
    thalaKsaka.textContent = paqKsaka(spec.name, spec.type);
    const btLabelo = traduki(bt.labelKey);
    thalaChip.textContent = btLabelo;
    thalaChip.style.background = bt.chip;
    thalaHavop2kekai.innerHTML = `<b>${traduki("thalaHavem2")}</b> ${spec.havem2} · <b>${traduki("thalaDiamanto")}</b> ${spec.sube ? traduki("thalaJes") + " (" + spec.sube + ")" : traduki("thalaNe")}<br><b>${traduki("thalaVepaqHunaq")}</b> ${btLabelo} · <b>${traduki("thalaXekuxa")}</b> X${Math.round(spec.x)} Z${Math.round(spec.z)}`;
    thalaFlavor.textContent = traduki(bt.flavorKey);
    thalaKfe.classList.add("laqazi");
    thalaEniri.onclick = () => eniriPaqn(spec);
    aplikiVacepu();
  }
  function kobesaiThala() {
    skribiSukf2qitan(null);
    thalaKfe.classList.remove("laqazi");
  }

  return { pukxeiInformon, laqaziThala, kobesaiThala };
}
