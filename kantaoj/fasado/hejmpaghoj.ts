// ≺⧼ j͑ʃᴜ ı],ɔ }ʃꞇ ʌ j͑ʃ'w j͐ʃᴜ 🏠 ⧽≻
// ទំព័រនៃផ្ទាំងចាប់ផ្តើម ៖ ព័ត៌មាន , ការកំណត់ , សម្លៀកបំពាក់ ។
// ទំព័រទាំងអស់បង្កើតដោយឧបករណ៍រួម ( paghoj.ts ) ដូចហ្គេមដែរ ។
import { ligiTabojn } from "./paneeloj.js";
import {
  plenigiMangxaListonEn, plenigiSpeciaListonEn, plenigiVepaqTipListonEn,
} from "./paneeloj.js";
import { kf2Vestejon } from "./vestejo.js";
import { kf2Staton } from "./paghoj.js";
import { aplikiVacepu } from "./efikoj.js";

// ⟪ ធាតុ DOM 📃 ⟫
const butInhaqoxa = document.getElementById("butInhaqoxa")!;
const butAgordVestaro = document.getElementById("butAgordVestaro")!;
const paghoVepaqListo = document.getElementById("paghoVepaqListo")!;
const paghoMangxaListo = document.getElementById("paghoMangxaListo")!;
const paghoSpeciaListo = document.getElementById("paghoSpeciaListo")!;

// ⟪ ព័ត៌មាន 📃 ⟫
// ⟨ បញ្ជីទាំងនេះសម្រាប់អានតែប៉ុណ្ណោះ ៖ ដូច្នេះគ្មានដំណើរការចុចទេ 📃 ⟩
function plenigiInformPaghon(): void {
  plenigiVepaqTipListonEn(paghoVepaqListo);
  plenigiMangxaListonEn(paghoMangxaListo);
  plenigiSpeciaListonEn(paghoSpeciaListo);
  aplikiVacepu();
}

const informPagho = kf2Staton("informPagho", plenigiInformPaghon);
ligiTabojn(document.getElementById("informPagho")!, "hapaq");
butInhaqoxa.addEventListener("click", () => informPagho.malfermi());

// ⟪ សម្លៀកបំពាក់ ៖ តួតែមួយរួមជាមួយហ្គេម , ដូច្នេះគ្មានអ្វីអណ្តែតលើអ្វីទេ 📃 ⟫
const vestejo = kf2Vestejon();
butAgordVestaro.addEventListener("click", () => vestejo.malfermi());

// ⟪ បំពេញឡើងវិញពេលភាសាប្តូរ 📃 ⟫
window.addEventListener("lingvosxangxo", () => {
  if ( informPagho.tsekeMalfermita() ) plenigiInformPaghon();
});
