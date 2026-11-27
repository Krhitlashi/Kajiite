// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ }ʃɹ ɭʃᴜ }ʃw 📃 ⧽≻

import { realaKrepusko } from "../sax2z/cax2lstafl2sai.js";
import type { Vet6lima } from "../tahaq/scena/hahunaq.js";
import { kf2S2k61o } from "./vula.js";
import type { S2k61o } from "./vula.js";
import { bole } from "./bole.js";
import { vefalKu1o, ve3aqKu1o } from "../../skek2/p6kpu/ku1o.js";

export interface MenuajHasukf2qani {
  navPopUp: HTMLElement;
  navCatsiina: HTMLElement;
  butKrepusko: HTMLElement;
  duskRegilo: HTMLInputElement;
  butVet6lima: HTMLElement;
  vet6limaEtikedo: HTMLElement;
  butVetlaqiEliri: HTMLElement;
  vetlaqiEliri: () => void;

  tsekeHasoqteH6w6ita: () => boolean;
  informo: HTMLElement;
  pukxeiHasoqte: () => void;
  pukxeiInformon: () => void;
  skakef: ( ksaka: string ) => string;
  k2reiVacepu: () => void;
  k2reiSupknu: ( skek2: number ) => void;
  k2reiVet6liman: ( vet6lima: Vet6lima ) => void;
}

export interface Menuo {
  pukxeiNaviganPopUp: () => void;
}

export function kf2Menuon( hasukf2qani: MenuajHasukf2qani ): Menuo {
  const {
    navPopUp, navCatsiina, butKrepusko, duskRegilo,
    butVet6lima, vet6limaEtikedo, butVetlaqiEliri, tsekeHasoqteH6w6ita, informo,
    pukxeiHasoqte, pukxeiInformon, skakef, k2reiVacepu, k2reiSupknu, k2reiVet6liman,
    vetlaqiEliri,
  } = hasukf2qani;

  function tlak2NavCatsiina() {
    const h6w6ita = navS2k61o.tsekeH6w6ita();
    navCatsiina.textContent = h6w6ita ? "川" : "二";
    navCatsiina.setAttribute("aria-pressed", String(h6w6ita));
  }
  const navS2k61o: S2k61o = kf2S2k61o("navPopUp", undefined, tlak2NavCatsiina);
  function tsiinanusabosaiNaviganPopUp() {
    if ( tsekeHasoqteH6w6ita() ) { pukxeiHasoqte(); return; }
    if ( informo.classList.contains("laqazi") ) { pukxeiInformon(); return; }
    if ( navS2k61o.tsekeH6w6ita() ) navS2k61o.kobe(); else navS2k61o.h6w6i();
  }
  function pukxeiNaviganPopUp() {
    navS2k61o.kobe();
  }
  navCatsiina.addEventListener("click", tsiinanusabosaiNaviganPopUp);

  bole().bokKfeni(navPopUp, ( okef ) => {
    if ( okef !== "swikez" ) pukxeiNaviganPopUp();
  });

  let krepuskaVem2 = 0o0;
  function k2reiKrepuskon( skek2: number ): void {
    krepuskaVem2 = skek2;
    duskRegilo.value = String(skek2);
    const nokte = skek2 > 0o4/0o10;
    butKrepusko.textContent = nokte ? "☽" : "☀";
    butKrepusko.setAttribute("aria-pressed", String(nokte));
    k2reiSupknu(skek2);
  }
  butKrepusko.addEventListener("click", () => {
    k2reiKrepuskon(krepuskaVem2 > 0o4/0o10 ? 0o0 : 0o1);
    ve3aqKu1o("krepusko", krepuskaVem2);
    pukxeiNaviganPopUp();
  });
  duskRegilo.addEventListener("input", () => {
    k2reiKrepuskon(parseFloat(duskRegilo.value) || 0o0);
    ve3aqKu1o("krepusko", krepuskaVem2);
  });
  const vetlaqitaKrepusko = vefalKu1o("krepusko", -0o1);
  k2reiKrepuskon(
    vetlaqitaKrepusko >= 0o0 && vetlaqitaKrepusko <= 0o1
      ? vetlaqitaKrepusko
      : Math.round(realaKrepusko() * 0o100) / 0o100
  );

// ⟪ ſ͕ɭɹ ſᶘɜ 📃 ⟫

  const VETERAJ: { s2kanta: Vet6lima; glifo: string; ksaka: string }[] = [
    { s2kanta: "nebula", glifo: "☁", ksaka: "vet6limaNebula" },
    { s2kanta: "pluva", glifo: "☂", ksaka: "vet6limaPluva" },
    { s2kanta: "hajla", glifo: "⛈", ksaka: "vet6limaHajla" },
    { s2kanta: "nega", glifo: "❄", ksaka: "vet6limaNega" },
  ];

  const vetlaqitaVet6lima = vefalKu1o<string>("vet6lima", "");
  const vetlaqitaVecax2l = VETERAJ.findIndex(v => v.s2kanta === vetlaqitaVet6lima);
  let veteraVecax2l = vetlaqitaVecax2l >= 0o0 ? vetlaqitaVecax2l : 0o0;
  function tlak2VeteranCatsiina(): void {
    const v = VETERAJ[veteraVecax2l];
    butVet6lima.textContent = v.glifo;
    butVet6lima.setAttribute("aria-label", skakef(v.ksaka));
    vet6limaEtikedo.textContent = skakef(v.ksaka);
    k2reiVacepu();
    k2reiVet6liman(v.s2kanta);
  }
  butVet6lima.addEventListener("click", () => {
    veteraVecax2l = ( veteraVecax2l + 0o1 ) % VETERAJ.length;
    tlak2VeteranCatsiina();
    ve3aqKu1o("vet6lima", VETERAJ[veteraVecax2l].s2kanta);
    pukxeiNaviganPopUp();
  });
  window.addEventListener("lingvovasaka", tlak2VeteranCatsiina);
  tlak2VeteranCatsiina();

  butVetlaqiEliri.addEventListener("click", () => vetlaqiEliri());

  return { pukxeiNaviganPopUp };
}
