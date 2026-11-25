// ≺⧼ j͑ʃᴜ ı],ɔ }ʃꞇ ʌ j͑ʃ'w j͐ʃᴜ 🏠 ⧽≻
// ſɭᴜ ſןᴜ , ſɭэ ɭʃᴜ , ꞙɭı , ⟅ ſɭэ ſɭᴜ , ſɭᴜ ſןᴜ , ꞙɭɔ ,
// ſɭᴜ ſןᴜ , ſɭэ ſɭᴜ , ꞙɭı , ⟅ ı],ᴜ ֭ſɭᴜ , ꞙɭı , 📃 ⟩
import { ligiHavula } from "./mak2zaf.js";
import {
  vetem2iMangxaCatsaraEn, vetem2iSpeciaCatsaraEn, vetem2iVepaqTipCatsaraEn,
} from "./mak2zaf.js";
import { kf2Vestejon } from "./qatlaq.js";
import { kf2S2k61o } from "./vula.js";
import { aplikiVacepu } from "./nesakf6ni.js";

// ⟪ ſɭᴜ ſןᴜ , ſɭэ ſɭᴜ 📃 ⟫
const butInformoj = document.getElementById("butInformoj")!;
const butAgordHasoqte = document.getElementById("butAgordHasoqte")!;
const paghoKonstruaCatsara = document.getElementById("paghoKonstruaCatsara")!;
const paghoMangxaCatsara = document.getElementById("paghoMangxaCatsara")!;
const paghoSpeciaCatsara = document.getElementById("paghoSpeciaCatsara")!;

// ⟪ ſɭэ ſɭᴜ , ꞙɭı 📃 ⟫
// ⟨ ſɭᴜ ſןᴜ , ſɭэ ſɭᴜ , ꞙɭɔ , ⟅ ſɭᴜ ſןᴜ , ꞙɭɔ , 📃 ⟩
function vetem2iInformPaghon(): void {
  vetem2iVepaqTipCatsaraEn(paghoKonstruaCatsara);
  vetem2iMangxaCatsaraEn(paghoMangxaCatsara);
  vetem2iSpeciaCatsaraEn(paghoSpeciaCatsara);
  aplikiVacepu();
}

const informPagho = kf2S2k61o("informPagho", vetem2iInformPaghon);
ligiHavula(document.getElementById("informPagho")!, "hapaq");
butInformoj.addEventListener("click", () => informPagho.h6w6i());

// ⟪ ſɭɜ ɭʃɔ , ꞙɭı , ſɭэ ſɭᴜ , ꞙɭı , 📃 ⟫
const soqte = kf2Vestejon();
butAgordHasoqte.addEventListener("click", () => soqte.h6w6i());

// ⟪ ſȷwɔ˞ , ſɭэ ſɭᴜ , ꞙɭɿ , 📃 ⟫
window.addEventListener("lingvovasaka", () => {
  if ( informPagho.tsekeH6w6ita() ) vetem2iInformPaghon();
});
