// ≺⧼ j͑ʃᴜ ı],ɔ }ʃꞇ ʌ j͑ʃ'w j͐ʃᴜ 🏠 ⧽≻
// ſɭᴜ ſןᴜ , ſɭэ ɭʃᴜ , ꞙɭı , ⟅ ſɭэ ſɭᴜ , ſɭᴜ ſןᴜ , ꞙɭɔ ,
// ſɭᴜ ſןᴜ , ſɭэ ſɭᴜ , ꞙɭı , ⟅ ı],ᴜ ֭ſɭᴜ , ꞙɭı , 📃 ⟩
import { ligiTabojn } from "./paneeloj.js";
import {
  plenigiMangxaListonEn, plenigiSpeciaListonEn, plenigiVepaqTipListonEn,
} from "./paneeloj.js";
import { kf2Vestejon } from "./vestejo.js";
import { kf2Staton } from "./paghoj.js";
import { aplikiVacepu } from "./efikoj.js";

// ⟪ ſɭᴜ ſןᴜ , ſɭэ ſɭᴜ 📃 ⟫
const butInhaqoxa = document.getElementById("butInhaqoxa")!;
const butAgordVestaro = document.getElementById("butAgordVestaro")!;
const paghoVepaqListo = document.getElementById("paghoVepaqListo")!;
const paghoMangxaListo = document.getElementById("paghoMangxaListo")!;
const paghoSpeciaListo = document.getElementById("paghoSpeciaListo")!;

// ⟪ ſɭэ ſɭᴜ , ꞙɭı 📃 ⟫
// ⟨ ſɭᴜ ſןᴜ , ſɭэ ſɭᴜ , ꞙɭɔ , ⟅ ſɭᴜ ſןᴜ , ꞙɭɔ , 📃 ⟩
function plenigiInformPaghon(): void {
  plenigiVepaqTipListonEn(paghoVepaqListo);
  plenigiMangxaListonEn(paghoMangxaListo);
  plenigiSpeciaListonEn(paghoSpeciaListo);
  aplikiVacepu();
}

const informPagho = kf2Staton("informPagho", plenigiInformPaghon);
ligiTabojn(document.getElementById("informPagho")!, "hapaq");
butInhaqoxa.addEventListener("click", () => informPagho.malfermi());

// ⟪ ſɭɜ ɭʃɔ , ꞙɭı , ſɭэ ſɭᴜ , ꞙɭı , 📃 ⟫
const vestejo = kf2Vestejon();
butAgordVestaro.addEventListener("click", () => vestejo.malfermi());

// ⟪ ſȷwɔ˞ , ſɭэ ſɭᴜ , ꞙɭɿ , 📃 ⟫
window.addEventListener("lingvosxangxo", () => {
  if ( informPagho.tsekeMalfermita() ) plenigiInformPaghon();
});
