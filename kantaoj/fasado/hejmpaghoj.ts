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
import { cxuAŭdio } from "../../eskekoj/sonoj/sonoro.js";
import { ludi, sxargiTrako, nunaTrako, cxuLudas } from "../../eskekoj/sonoj/muziko/ludilo.js";

// ⟪ ធាតុ DOM 📃 ⟫
const butInformoj = document.getElementById("butInformoj")!;
const butAgordoj = document.getElementById("butAgordoj")!;
const butAgordVestaro = document.getElementById("butAgordVestaro")!;
const paghoKonstruaListo = document.getElementById("paghoKonstruaListo")!;
const paghoMangxaListo = document.getElementById("paghoMangxaListo")!;
const paghoSpeciaListo = document.getElementById("paghoSpeciaListo")!;
const agordTrakaVico = document.getElementById("agordTrakaVico")!;

// ⟪ ព័ត៌មាន 📃 ⟫
function plenigiInformPaghon(): void {
  plenigiKonstruTipListonEn(paghoKonstruaListo);
  plenigiMangxaListonEn(paghoMangxaListo, () => {});
  plenigiSpeciaListonEn(paghoSpeciaListo, () => {});
  aplikiVacepu();
}

const informPagho = kreiPaghon("informPagho", plenigiInformPaghon);
ligiTabojn(document.getElementById("informPagho")!, "konstruajxoj");
butInformoj.addEventListener("click", () => informPagho.malfermi());

// ⟪ សម្លៀកបំពាក់ ៖ ទំព័រតែមួយរួមជាមួយហ្គេម , ដូច្នេះគ្មានអ្វីអណ្តែតលើអ្វីទេ 📃 ⟫
const vestejo = kreiVestejon();
butAgordVestaro.addEventListener("click", () => vestejo.malfermi());

// ⟪ តន្ត្រីក្នុងម៉ឺនុយការកំណត់ 📃 ⟫
function gxisdatigiAgordTrakojn(): void {
  const nuna = nunaTrako();
  agordTrakaVico.querySelectorAll("button").forEach(b => {
    const i = parseInt(( b as HTMLElement ).dataset.trako || "0");
    b.setAttribute("aria-pressed", String(i === nuna && cxuLudas()));
  });
}

agordTrakaVico.querySelectorAll("button").forEach(b => {
  b.addEventListener("click", () => {
    const i = parseInt(( b as HTMLElement ).dataset.trako || "0");
    const estisLudanta = cxuLudas();
    sxargiTrako(i);
    if ( estisLudanta || cxuAŭdio() ) ludi();
    gxisdatigiAgordTrakojn();
  });
});
butAgordoj.addEventListener("click", gxisdatigiAgordTrakojn);
gxisdatigiAgordTrakojn();

// ⟪ បំពេញឡើងវិញពេលភាសាប្តូរ 📃 ⟫
window.addEventListener("lingvosxangxo", () => {
  gxisdatigiAgordTrakojn();
  if ( informPagho.cxuMalfermita() ) plenigiInformPaghon();
});
