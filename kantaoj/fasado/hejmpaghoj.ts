// ≺⧼ ទំព័រដើម 🏠 ⧽≻
// ទំព័រនៃផ្ទាំងចាប់ផ្តើម ៖ ព័ត៌មាន , ការកំណត់ , សម្លៀកបំពាក់ ។
// ទំព័រទាំងអស់បង្កើតដោយឧបករណ៍រួម ( paghoj.ts ) ដូចហ្គេមដែរ ។
import { ligiTabojn } from "./paneeloj.js";
import {
  plenigiMangxaListonEn, plenigiSpeciaListonEn, plenigiKonstruTipListonEn,
} from "./paneeloj.js";
import { kreiVestejon } from "./vestejo.js";
import { kreiPaghon } from "./paghoj.js";
import { aplikiVacepu } from "./efikoj.js";

// ⟪ ធាតុ DOM 📃 ⟫
const butInformoj = document.getElementById("butInformoj")!;
const butAgordVestaro = document.getElementById("butAgordVestaro")!;
const paghoKonstruaListo = document.getElementById("paghoKonstruaListo")!;
const paghoMangxaListo = document.getElementById("paghoMangxaListo")!;
const paghoSpeciaListo = document.getElementById("paghoSpeciaListo")!;

// ⟪ ព័ត៌មាន 📃 ⟫
// ⟨ បញ្ជីទាំងនេះសម្រាប់អានតែប៉ុណ្ណោះ ៖ ដូច្នេះគ្មានដំណើរការចុចទេ 📃 ⟩
function plenigiInformPaghon(): void {
  plenigiKonstruTipListonEn(paghoKonstruaListo);
  plenigiMangxaListonEn(paghoMangxaListo);
  plenigiSpeciaListonEn(paghoSpeciaListo);
  aplikiVacepu();
}

const informPagho = kreiPaghon("informPagho", plenigiInformPaghon);
ligiTabojn(document.getElementById("informPagho")!, "konstruajxoj");
butInformoj.addEventListener("click", () => informPagho.malfermi());

// ⟪ សម្លៀកបំពាក់ ៖ តួតែមួយរួមជាមួយហ្គេម , ដូច្នេះគ្មានអ្វីអណ្តែតលើអ្វីទេ 📃 ⟫
const vestejo = kreiVestejon();
butAgordVestaro.addEventListener("click", () => vestejo.malfermi());

// ⟪ បំពេញឡើងវិញពេលភាសាប្តូរ 📃 ⟫
window.addEventListener("lingvosxangxo", () => {
  if ( informPagho.cxuMalfermita() ) plenigiInformPaghon();
});
