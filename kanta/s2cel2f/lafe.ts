// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ j͐ʃᴜ ſȷɔ 📃 ⧽≻

import { ligiHavula } from "./mak2zaf.js";
import {
  vetem2iMangxaCatsaraEn, vetem2iSpeciaCatsaraEn, vetem2iVepaqTipCatsaraEn,
} from "./mak2zaf.js";
import { kf2SoqteHakaman } from "./qa3aq.js";
import { kf2S2k61o } from "./vula.js";
import { k2reiVacepu } from "./nesakf6ni.js";

const ca12naVop2 = document.getElementById("butInformoj")!;
const ca12naSoqte = document.getElementById("butAgordHasoqte")!;
const vulaVepaqCa1ara = document.getElementById("paghoKonstruaCatsara")!;
const vulaGeqCa1ara = document.getElementById("paghoMangxaCatsara")!;
const vulaGelCa1ara = document.getElementById("paghoSpeciaCatsara")!;

function lafeVop2(): void {
  vetem2iVepaqTipCatsaraEn(vulaVepaqCa1ara);
  vetem2iMangxaCatsaraEn(vulaGeqCa1ara);
  vetem2iSpeciaCatsaraEn(vulaGelCa1ara);
  k2reiVacepu();
}

const vop2Vula = kf2S2k61o("informPagho", lafeVop2);
ligiHavula(document.getElementById("informPagho")!, "konstruajxoj");
ca12naVop2.addEventListener("click", () => vop2Vula.h6w6i());

const soqte = kf2SoqteHakaman();
ca12naSoqte.addEventListener("click", () => soqte.h6w6i());

// ⟪ ſ͔ɭᴜ ᶅſɔ 📃 ⟫

window.addEventListener("lingvovasaka", () => {
  if ( vop2Vula.tsekeH6w6ita() ) lafeVop2();
});
