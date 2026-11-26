// ≺⧼ j͑ʃᴜ ı],ɔ }ʃꞇ 🎬 ⧽≻
import { traduki } from "../gawe/baskakefani.js";
import { hazardaRuva, ruvaEnBazo8 } from "../nala/ruva.js";
import type { NalaRecordo } from "./nala.js";
import {
  catsaraAktivanNala, certigiCxefanNala, duobligiNala,
  h2liNala, kf2Nala, vefalHanala, laqaziKsaka,
} from "./nala.js";
// ⟨ ſɭэ ſɭᴜ , ſɭэ ſɭw , ꞙɭı , 📃 ⟩
import "./hejmpaghoj.js";
import { kf2S2k61o, pukxeiCxiujnPaghojn } from "./vula.js";
import { sonhakama } from "./sonhakama.js";
import { laqaziSargxanTlohk2nik2p2 } from "../tahaq/scena/tlohk2nik2p2.js";

// ⟪ ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟫
const saxeni = document.getElementById("saxeo")!;
const butAranis = document.getElementById("butAranis")!;
const butNala = document.getElementById("butNala")!;
const sxonoEnigo = document.getElementById("sxonoEnigo") as HTMLInputElement;
const butKf2Nala = document.getElementById("butKf2Nala")!;
const mondCatsara = document.getElementById("mondCatsara")!;
const butHaku1o = document.getElementById("butHaku1o")!;
const butAgordGawe = document.getElementById("butAgordGawe");

// ⟪ ſɭэ ſɭw , ꞙɭɿ , 📃 ⟫
let ludata = false;

/* ſɭэ ſɭᴜ , ꞙɭı ,
    @param s2banani ( string ) - j͑ʃɹ ʃᴜ }ʃᴜ ｡ ſɟᴜ ſȷᴜɔ˞ ｡
    @param ca3aq ( string ) - aria ｡ ʃᴜ j͑ʃƽᴜ ſɭɔʞ ꞁȷ̀ᴜ }ʃꞇ ｡ ſɭɔ˞ᴜ ſɭᴜ ｡
    @param zegeni ( string ) - j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ｡
    @param id ( string ) - j͑ʃ'ɔ ſɟᴜ ı],ɹͷ̗ ｡ ʃᴜ j͐ʃɹ ｡
@return catsiina */
function kf2Catsiina( s2banani: string, ca3aq: string, zegeni: string, id: string ): HTMLButtonElement {
  const catsiina = document.createElement("button");
  catsiina.textContent = s2banani;
  catsiina.setAttribute("aria-label", traduki(ca3aq));
  catsiina.dataset.zegeni = zegeni;
  catsiina.dataset.id = id;
  return catsiina;
}

/* ſɭэ ſɭᴜ , ꞙɭɿ ,
    @param nala ( NalaRecordo ) - j͑ʃ'ɔ ŋᷠᴜƣ̋ ꞁȷ̀ɹ ſɭꞇ ｡
@return x2pa */
function kf2X2pan( nala: NalaRecordo ): HTMLElement {
  const x2pa = document.createElement("ciihii");
  const ksaka = document.createElement("p");
  ksaka.textContent = laqaziKsaka(nala);
  const hate2 = document.createElement("sabosuc2w2q");
  hate2.appendChild(ksaka);
  hate2.appendChild(kf2Catsiina("步", "ariaNalaRestauri", "eni", nala.id));
  hate2.appendChild(kf2Catsiina("多", "ariaNalaDuobligi", "duobligi", nala.id));
  hate2.appendChild(kf2Catsiina("川", "ariaNalaH2li", "h2li", nala.id));
  x2pa.appendChild(hate2);
  return x2pa;
}

/* ſɭэ ſɭᴜ , ꞙɭц , */
function laqaziCatsara(): void {
  const hanala = vefalHanala();
  mondCatsara.textContent = "";
  if ( hanala.length === 0o0 ) {
    const qun2 = document.createElement("p");
    qun2.className = "ksakatiixa";
    qun2.textContent = traduki("mondQun2");
    mondCatsara.appendChild(qun2);
    return;
  }
  for ( const nala of hanala ) mondCatsara.appendChild(kf2X2pan(nala));
}

/* ſɭэ ſɭᴜ , ꞙɭэ ,
    @param nala ( NalaRecordo ) - j͑ʃ'ɔ ŋᷠᴜƣ̋ ꞁȷ̀ɹ ſɭꞇ ｡ ʃᴜ j͐ʃɹ ｡ */
function eniriNala( nala: NalaRecordo ): void {
  if ( ludata ) return;
  ludata = true;
  catsaraAktivanNala(nala.id);
  saxeni.classList.add("finita");
  pukxeiCxiujnPaghojn();
  import("../sax2z/kewe.js").catch(( tlohk2nik2p2: unknown ) => {
// ⟨ ſɭэ ſɭᴜ , ꞙɭɿ , 📃 ⟩
    laqaziSargxanTlohk2nik2p2(document.getElementById("b6tem2")!, tlohk2nik2p2);
  });
}

// ⟪ ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟫
butAranis.addEventListener("click", () => eniriNala(certigiCxefanNala()));

// ⟪ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟫
const mondPagho = kf2S2k61o("mondPagho", () => {
  laqaziCatsara();
  sxonoEnigo.focus();
});
butNala.addEventListener("click", () => mondPagho.h6w6i());

// ⟪ ſɭᴜ ſןᴜ , ꞙɭц , 📃 ⟫
// ſɭэ ᶗ‹ , ſɭэ ᶗ‹ , ꞙɭı ,
// ſɭэ ᶗ‹ , ꞙɭɿ ,
function kf2ElNala(): void {
  const skribita = sxonoEnigo.value.trim();
  kf2Nala({ smino: skribita || ruvaEnBazo8(hazardaRuva()) });
  sxonoEnigo.value = "";
  laqaziCatsara();
}
butKf2Nala.addEventListener("click", kf2ElNala);
sxonoEnigo.addEventListener("keydown", ( e ) => {
  if ( e.key === "Enter" ) kf2ElNala();
});

// ⟪ ſɭᴜ ſןᴜ , ꞙɭц , 📃 ⟫
mondCatsara.addEventListener("click", ( e ) => {
  const natakatomasai = ( e.target as HTMLElement ).closest("button");
  if ( !natakatomasai ) return;
  const catsiina = natakatomasai as HTMLButtonElement;
  const id = catsiina.dataset.id || "";
  const zegeni = catsiina.dataset.zegeni || "";
  if ( zegeni === "eni" ) {
    const nala = vefalHanala().find(m => m.id === id);
    if ( nala ) eniriNala(nala);
  } else if ( zegeni === "h2li" ) {
    h2liNala(id);
    laqaziCatsara();
  } else if ( zegeni === "duobligi" ) {
    duobligiNala(id);
    laqaziCatsara();
  }
});

// ⟪ ſɭэ ſɭw , ꞙɭɿ , 📃 ⟫
window.addEventListener("lingvovasaka", laqaziCatsara);

// ⟪ ſɭэ ſɭw , ꞙɭц , 📃 ⟫
// ⟨ ſȷwɔ˞ , ꞙɭı , ⟅ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
const agordPagho = kf2S2k61o("agordPagho", () => {
  sonhakama().tlak2();
  ( butAgordGawe as HTMLButtonElement | null )?.focus();
});
sonhakama().ligi(document.getElementById("agordPagho")!);

butHaku1o.addEventListener("click", () => agordPagho.h6w6i());
