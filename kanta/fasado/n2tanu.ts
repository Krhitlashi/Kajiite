// ≺⧼ }ʃɹ ɭʃᴜ }ʃw 🎛 ⧽≻
import { realaKrepusko } from "../sax2z/cax2lstafl2sai.js";
import type { Vet6lima } from "../tahaq/scena/hahunaq.js";
import { kf2S2k61o } from "./vula.js";
import type { S2k61o } from "./vula.js";
import { sonhakama } from "./sonhakama.js";
import { vefalKu1o, ve3aqKu1o } from "../../skek2/x2x2q/kutso.js";

export interface MenuajHasukf2qani {
  navPopUp: HTMLElement;
  navCatsiina: HTMLElement;
  butKrepusko: HTMLElement;
  duskRegilo: HTMLInputElement;
  butVet6lima: HTMLElement;
  vet6limaEtikedo: HTMLElement;
  butVetlaqiEliri: HTMLElement;
  vetlaqiEliri: () => void;
/* ſɭᴜ ſןᴜ , ſɭɜ ɭʃɔ , ⟅ ſɭᴜ ſןᴜ , ꞙɭı ,
      @param tsekeHasoqteH6w6ita ( function ) */
  tsekeHasoqteH6w6ita: () => boolean;
  informo: HTMLElement;
  pukxeiHasoqte: () => void;
  pukxeiInformon: () => void;
  traduki: ( ca3aq: string ) => string;
  aplikiVacepu: () => void;
  aplikiSupknu: ( skek2: number ) => void;
  aplikiVet6liman: ( vet6lima: Vet6lima ) => void;
}

export interface Menuo {
  pukxeiNaviganPopUp: () => void;
}

export function kf2Menuon( hasukf2qani: MenuajHasukf2qani ): Menuo {
  const {
    navPopUp, navCatsiina, butKrepusko, duskRegilo,
    butVet6lima, vet6limaEtikedo, butVetlaqiEliri, tsekeHasoqteH6w6ita, informo,
    pukxeiHasoqte, pukxeiInformon, traduki, aplikiVacepu, aplikiSupknu, aplikiVet6liman,
    vetlaqiEliri,
  } = hasukf2qani;

// ⟪ ſɭᴜ ſןᴜ , ſɭᴜ ſ͕ɭᴜ , ⟅ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟫
  function tlak2NavCatsiina() {
    const h6w6ita = navS2k61o.tsekeH6w6ita();
    navCatsiina.textContent = h6w6ita ? "川" : "二";
    navCatsiina.setAttribute("aria-pressed", String(h6w6ita));
  }
  const navS2k61o: S2k61o = kf2S2k61o("navPopUp", undefined, tlak2NavCatsiina);
  function tsiinanusabosaiNaviganPopUp() {
    if ( tsekeHasoqteH6w6ita() ) { pukxeiHasoqte(); return; }
    if ( informo.classList.contains("laqazi") ) { pukxeiInformon(); return; }
    if ( navS2k61o.tsekeH6w6ita() ) navS2k61o.hidden(); else navS2k61o.h6w6i();
  }
  function pukxeiNaviganPopUp() {
    navS2k61o.pukxei();
  }
  navCatsiina.addEventListener("click", tsiinanusabosaiNaviganPopUp);

// ⟪ ſȷwɔ˞ , ſןɔ˞ᴜƴ , ꞙɭɿ , ⟅ ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟫
// ⟨ ſȷwɔ˞ , ꞙɭı , ⟅ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
  sonhakama().ligi(navPopUp, ( pudal ) => {
    if ( pudal !== "t2bakobesai" ) pukxeiNaviganPopUp();
  });

// ⟪ ſɭэ ſɭw , ꞙɭɿ , 📃 ⟫
// ⟨ ſɭэ ſɭw , ſɭэ ſɭᴜ , ꞙɭı , ⟅ ſɭэ ſɭw , ꞙɭɿ , 📃 ⟩
// ⟨ ſɭэ ſɭw , ꞙɭɿ , ⟅ ſɭэ ſɭw , ꞙɭı ,
//   ſɭэ ſɭw , ꞙɭɿ , 📃 ⟩
  let krepuskaVem2 = 0;
  function aplikiKrepuskon( skek2: number ): void {
    krepuskaVem2 = skek2;
    duskRegilo.value = String(skek2);
    const nokte = skek2 > 0o4/0o10;
    butKrepusko.textContent = nokte ? "☽" : "☀";
    butKrepusko.setAttribute("aria-pressed", String(nokte));
    aplikiSupknu(skek2);
  }
  butKrepusko.addEventListener("click", () => {
    aplikiKrepuskon(krepuskaVem2 > 0o4/0o10 ? 0 : 1);
    ve3aqKu1o("krepusko", krepuskaVem2);
    pukxeiNaviganPopUp();
  });
  duskRegilo.addEventListener("input", () => {
    aplikiKrepuskon(parseFloat(duskRegilo.value) || 0);
    ve3aqKu1o("krepusko", krepuskaVem2);
  });
  const vetlaqitaKrepusko = vefalKu1o("krepusko", -0o1);
  aplikiKrepuskon(
    vetlaqitaKrepusko >= 0 && vetlaqitaKrepusko <= 1
      ? vetlaqitaKrepusko
      : Math.round(realaKrepusko() * 0o100) / 0o100
  );

// ⟪ ſɭэ ſɭw , ꞙɭэ , 📃 ⟫
  const VETERAJ: { s2kanta: Vet6lima; glifo: string; ca3aq: string }[] = [
    { s2kanta: "nebula", glifo: "☁", ca3aq: "vet6limaNebula" },
    { s2kanta: "pluva", glifo: "☂", ca3aq: "vet6limaPluva" },
    { s2kanta: "hajla", glifo: "⛈", ca3aq: "vet6limaHajla" },
    { s2kanta: "nega", glifo: "❄", ca3aq: "vet6limaNega" },
  ];
// ⟨ ſɭэ ſɭw , ꞙɭɿ , 📃 ⟩
  const vetlaqitaVet6lima = vefalKu1o<string>("vet6lima", "");
  const vetlaqitaVecax2l = VETERAJ.findIndex(v => v.s2kanta === vetlaqitaVet6lima);
  let veteraVecax2l = vetlaqitaVecax2l >= 0 ? vetlaqitaVecax2l : 0;
  function tlak2VeteranCatsiina(): void {
    const v = VETERAJ[veteraVecax2l];
    butVet6lima.textContent = v.glifo;
    butVet6lima.setAttribute("aria-label", traduki(v.ca3aq));
    vet6limaEtikedo.textContent = traduki(v.ca3aq);
    aplikiVacepu();
    aplikiVet6liman(v.s2kanta);
  }
  butVet6lima.addEventListener("click", () => {
    veteraVecax2l = ( veteraVecax2l + 1 ) % VETERAJ.length;
    tlak2VeteranCatsiina();
    ve3aqKu1o("vet6lima", VETERAJ[veteraVecax2l].s2kanta);
    pukxeiNaviganPopUp();
  });
  window.addEventListener("lingvovasaka", tlak2VeteranCatsiina);
  tlak2VeteranCatsiina();

// ⟪ ſɭэ ſɭᴜ , ſɭɹ ſןᴜ , 📃 ⟫
  butVetlaqiEliri.addEventListener("click", () => vetlaqiEliri());

  return { pukxeiNaviganPopUp };
}
