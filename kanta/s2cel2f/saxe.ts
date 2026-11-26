// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ j͑ʃᴜ ı],ɔ 📃 ⧽≻

import { skakef } from "../gawe/baskakefani.js";
import { hazardaRuva, ruvaEnBazo8 } from "../nala/ruva.js";
import type { NalaRecordo } from "./nala.js";
import {
  catsaraAktivanNala, certigiCxefanNala, duobligiNala,
  h2liNala, kf2Nala, vefalHanala, laqaziKsaka,
} from "./nala.js";

import "./lafe.js";
import { kf2S2k61o, pukxeiCa1arajnVulajn } from "./vula.js";
import { bole } from "./bole.js";
import { laqaziSargxanTlohk2nik2p2 } from "../tahaq/scena/tlohk2nik2p2.js";

// ⟪ ſɭʞɔ }ʃꞇ 📃 ⟫
const vulaSaxe = document.getElementById("saxeo")!;
const ca12naAranis = document.getElementById("butAranis")!;
const ca12naNala = document.getElementById("butNala")!;
const ksakaEnigo = document.getElementById("sxonoEnigo") as HTMLInputElement;
const ca12naKf2Nala = document.getElementById("butKf2Nala")!;
const mondCa1ara = document.getElementById("mondCatsara")!;
const ca12naHaku1o = document.getElementById("butHaku1o")!;
const ca12naGawe = document.getElementById("butAgordGawe");

// ⟪ ſɟᴜ ſᶘɹ }ʃᴜ 📃 ⟫
let k2feKanta = false;

function kf2Ca12na( ksakaCa12na: string, ksakaAria: string, ksakaJaqaz: string, id: string ): HTMLButtonElement {
  const ca12na = document.createElement("button");
  ca12na.textContent = ksakaCa12na;
  ca12na.setAttribute("aria-label", skakef(ksakaAria));
  ca12na.dataset.ksakaJaqaz = ksakaJaqaz;
  ca12na.dataset.id = id;
  return ca12na;
}

function kf2Jaqaz( nala: NalaRecordo ): HTMLElement {
  const ceme = document.createElement("ciihii");
  const ksaka = document.createElement("p");
  ksaka.textContent = laqaziKsaka(nala);
  const jaqazHate2 = document.createElement("sabosuc2w2q");
  jaqazHate2.appendChild(ksaka);
  jaqazHate2.appendChild(kf2Ca12na("步", "ariaNalaRestauri", "eni", nala.id));
  jaqazHate2.appendChild(kf2Ca12na("多", "ariaNalaDuobligi", "duobligi", nala.id));
  jaqazHate2.appendChild(kf2Ca12na("川", "ariaNalaH2li", "h2li", nala.id));
  ceme.appendChild(jaqazHate2);
  return ceme;
}

function k2fCa1ara(): void {
  const ca1araHanala = vefalHanala();
  mondCa1ara.textContent = "";
  if ( ca1araHanala.length === 0o0 ) {
    const jaqazQun2 = document.createElement("p");
    jaqazQun2.className = "ksakatiixa";
    jaqazQun2.textContent = skakef("mondQun2");
    mondCa1ara.appendChild(jaqazQun2);
    return;
  }
  for ( const nala of ca1araHanala ) mondCa1ara.appendChild(kf2Jaqaz(nala));
}

function bokNala( nala: NalaRecordo ): void {
  if ( k2feKanta ) return;
  k2feKanta = true;
  catsaraAktivanNala(nala.id);
  vulaSaxe.classList.add("finita");
  pukxeiCa1arajnVulajn();
  import("../sax2z/kewe.js").catch(( tlohk2nik2p2: unknown ) => {
    laqaziSargxanTlohk2nik2p2(document.getElementById("b6tem2")!, tlohk2nik2p2);
  });
}

ca12naAranis.addEventListener("click", () => bokNala(certigiCxefanNala()));

const mondVula = kf2S2k61o("mondPagho", () => {
  k2fCa1ara();
  ksakaEnigo.focus();
});
ca12naNala.addEventListener("click", () => mondVula.h6w6i());

function kf2NalaEl(): void {
  const ksaka = ksakaEnigo.value.trim();
  kf2Nala({ smino: ksaka || ruvaEnBazo8(hazardaRuva()) });
  ksakaEnigo.value = "";
  k2fCa1ara();
}
ca12naKf2Nala.addEventListener("click", kf2NalaEl);
ksakaEnigo.addEventListener("keydown", ( e ) => {
  if ( e.key === "Enter" ) kf2NalaEl();
});

// ⟪ ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ 📃 ⟫
mondCa1ara.addEventListener("click", ( e ) => {
  const ca12naTseke = ( e.target as HTMLElement ).closest("button");
  if ( !ca12naTseke ) return;
  const ca12na = ca12naTseke as HTMLButtonElement;
  const id = ca12na.dataset.id || "";
  const ksakaJaqaz = ca12na.dataset.ksakaJaqaz || "";
  if ( ksakaJaqaz === "eni" ) {
    const nala = vefalHanala().find(m => m.id === id);
    if ( nala ) bokNala(nala);
  } else if ( ksakaJaqaz === "h2li" ) {
    h2liNala(id);
    k2fCa1ara();
  } else if ( ksakaJaqaz === "duobligi" ) {
    duobligiNala(id);
    k2fCa1ara();
  }
});

// ⟪ ſ͔ɭᴜ ᶅſɔ 📃 ⟫
window.addEventListener("lingvovasaka", k2fCa1ara);

const agordVula = kf2S2k61o("agordPagho", () => {
  bole().k2fCa12na();
  ( ca12naGawe as HTMLButtonElement | null )?.focus();
});
bole().bokKfeni(document.getElementById("agordPagho")!);

ca12naHaku1o.addEventListener("click", () => agordVula.h6w6i());
