// ≺⧼ ſɭɔ ᶅſɔ }ʃꞇ 🎮 ⧽≻
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { VESTOJ } from "../../eskekoj/vestaro/vestoj.js";
import { vepaqFiguron } from "../../eskekoj/shalaj-hapudal/hamaz.js";
import type { Figuro } from "../../eskekoj/shalaj-hapudal/hamaz.js";
import { kf2Retilon } from "./retilo.js";
import { kf2Minimapon } from "../bildo/minimapo.js";
import { aplikiVacepu, kf2Efikojn } from "../fasado/efikoj.js";
import { kf2Sargxilon } from "../fasado/sxargxo.js";
import { kf2Enkondukon } from "../fasado/enkonduko.js";
import { kf2Paneelojn } from "../fasado/paneeloj.js";
import { kf2Vestejon } from "../fasado/vestejo.js";
import { kf2Enigojn } from "../fasado/enigoj.js";
import { kf2Menuon } from "../fasado/menuo.js";
import { konserviEliriMondon } from "../fasado/mondoj.js";
import { kf2Rezimojn } from "./rezimoj.js";
import { kf2Animacion } from "./animacio.js";
import { kf2Ludanton } from "./ludanto.js";
import { kf2Kanuanton } from "./kanuado.js";
import type { PiedaMondo } from "./piedirado.js";
import { kf2Agojn } from "./agoj.js";

import { kf2KolizianKradon } from "../mondo/kolizioj.js";
import { alteco } from "../mondo/tereno.js";
import { aktivaMapo } from "../tero-datumaro/mapregulo.js";
import { kf2Scenon } from "../bildo/scena.js";
import type { ScenaSistemo } from "../bildo/scena/hahunaq.js";
import { registriKunigitajnMeshojn, registriVivantojn, spacigiInstancojn } from "../bildo/vidlimo.js";
import { kf2Statistikon } from "../fasado/statistiko.js";
import { veb6qaiQena, saxeVeb6qai } from "../../eskekoj/komunajxoj/koloroj.js";
import { liberigiCac2sexnKampojn } from "../../eskekoj/komunajxoj/cac2sex/helpiloj.js";

// ⟪ ſɭэ ſɭw , 📃 ⟫
const mapoDatumoj = aktivaMapo();
const mapoQoxa = mapoDatumoj.qoxa;
const mapoGrandeco = mapoDatumoj.grandeco;
import type { UrbaSistemo } from "../mondo/kaxte/hahunaq.js";
import { vepaqKaxten } from "../mondo/kaxte.js";
import { traduki, kunKlavo, paqNomo } from "../lingvo/tradukoj.js";
import { tsekeLaqazbolesai, sfx } from "../../eskekoj/sonoj/sonoro.js";

// ⟪ ſɭᴜ ſןᴜ , 📃 ⟫
const kanvaso = document.getElementById("sceno") as HTMLCanvasElement;
const kartoElemento = document.getElementById("karto")!;
const kartoNomo = document.getElementById("kartoNomo")!;
const kartoChip = document.getElementById("kartoChip")!;
const kartoStatistikoj = document.getElementById("kartoStatistikoj")!;
const kartoFlavor = document.getElementById("kartoFlavor")!;
const kartoEniri = document.getElementById("kartoEniri")!;
const promptoElemento = document.getElementById("prompto")!;
const supermeta = document.getElementById("supermeta")!;
const supermetaEnhavo = document.getElementById("supermetaEnhavo")!;
const sxargxaElemento = document.getElementById("sxargxo")!;
const stango = document.getElementById("stango")!;
const sxargxaTitolo = document.getElementById("sxargxaTitolo")!;
const retikulo = document.getElementById("retikulo")!;
const balailo = document.getElementById("balailo")!;
const svingo = document.getElementById("svingo")!;
const fxVarma = document.getElementById("fxVarma")!;
const fxMenta = document.getElementById("fxMenta")!;
const tosto = document.getElementById("tosto")!;

// ⟪ ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟫
const navPopUp = document.getElementById("navPopUp")!;
const navButono = document.getElementById("navButono")!;
const butRezimo = document.getElementById("butRezimo")!;
const mobJoystickZono = document.getElementById("mobJoystickZono")!;
const mobJoystickBazo = document.getElementById("mobJoystickBazo")!;
const mobJoystickTenilo = document.getElementById("mobJoystickTenilo")!;
const mobButInterakti = document.getElementById("mobButInterakti")!;
const mobButSalti = document.getElementById("mobButSalti")!;

// ⟪ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟫
const informButono = document.getElementById("informButono")!;
const inqoxa = document.getElementById("inqoxa")!;
const vepaqListo = document.getElementById("vepaqListo")!;
const mangxaListo = document.getElementById("mangxaListo")!;
const pudalListo = document.getElementById("pudalListo")!;

// ⟪ ſ͕ɭɜ ı],ᴜ , 📃 ⟫
const { montriTost, agordiPrompton, fariBalailon, pulsiEfikon } = kf2Efikojn({ tosto, promptoElemento, balailo, svingo, fxVarma, fxMenta });
const { montriSargxon } = kf2Sargxilon({ stango, sxargxaElemento });

// ⟪ ſɭᴜ ſןᴜ , ꞙɭц , 📃 ⟫
const scena: ScenaSistemo = kf2Scenon(kanvaso, sxargxaElemento);
const { bildilo, fotilo, qena, dioritaMaterialo, andezitaMaterialo, eniraMaterialo, oraMaterialo, aplikiRezimon, aplikiVeteron, gxisdatigiVeteron, gxisdatigiOmbron, maksimumaRatio } = scena;

( window as unknown as { __sceno?: typeof qena; __fotilo?: typeof fotilo } ).__sceno = qena;
( window as unknown as { __sceno?: typeof qena; __fotilo?: typeof fotilo } ).__fotilo = fotilo;

// ⟪ ſɭᴜ ſןᴜ , ꞙɭэ , 📃 ⟫
const statistiko = kf2Statistikon(bildilo, qena, fotilo);
( window as unknown as { statistiko: typeof statistiko } ).statistiko = statistiko;

// ⟪ ſɭэ ſɭw , 📃 ⟫
const enkonduko = kf2Enkondukon({
  kanvaso, sxargxaElemento, stango, sxargxaTitolo,
  bildilo, fotilo, qena, maksimumaRatio,
  traduki, aplikiVacepu,
});
enkonduko.komenci();

const kaxte: UrbaSistemo = await vepaqKaxten(qena, dioritaMaterialo, andezitaMaterialo, eniraMaterialo, oraMaterialo, enkonduko.gxisdatigiProgreson);
const {
  vepaqPudalj, kolizioj, qakaj2Kolizioj, selektajxoj,
  hapaga, hatemek, kanuoj, npcoj, internaSistemo,
} = kaxte;
enkonduko.halti();

// ⟪ ſɭᴜ ſןᴜ , ꞙɭɩ , 📃 ⟫
// ⟨ ſɭᴜ ſןᴜ , 📃 ⟩
qena.matrixAutoUpdate = false;
spacigiInstancojn(qena);
// ⟨ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
registriKunigitajnMeshojn(qena);
registriVivantojn({ npcoj, kanuoj, hapaga: hapaga.hapaga, hatemek: hatemek.hatemek });

// ⟪ ſɭᴜ ſןᴜ , 📃 ⟫
const ludantaFiguro: Figuro = vepaqFiguron(VESTOJ[0]);
ludantaFiguro.group.visible = false;
qena.add(ludantaFiguro.group);

// ⟪ ſ͕ɭɜ ı],ᴜ , 🎨 ⟫
// ⟨ ſ͕ɭɜ ı],ᴜ , ꞙɭı ,
//   ſ͕ɭɜ ı],ᴜ , ꞙɭɿ , 📃 ⟩
veb6qaiQena(qena);
// ⟨ ſ͕ɭɜ ı],ᴜ , ꞙɭц , 📃 ⟩
saxeVeb6qai();

// ⟪ ſɭᴜ ſןᴜ , 📃 ⟫
const retilo = kf2Retilon(qena, montriTost, traduki);

// ⟪ ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟫
const hakama = new OrbitControls(fotilo, bildilo.domElement);
hakama.target.set(0, 2, 0);
hakama.enableDamping = true;
hakama.dampingFactor = 0o5/0o100;
hakama.maxPolarAngle = Math.PI * 0o37/0o100;
hakama.minDistance = 0o10;
hakama.maxDistance = 0o330;
hakama.update();
( window as unknown as { __hakama?: typeof hakama } ).__hakama = hakama;

// ⟪ ſɭэ ſɭw , 📃 ⟫
const ludanto = kf2Ludanton();

// ⟪ ſɭᴜ ſןᴜ , 📃 ⟫
const { eniriPaqn, eliriInternon, sxaltiRezimon } = kf2Rezimojn({
  ludanto,
  kanvaso, butRezimo, kartoElemento, promptoElemento,
  qena, fotilo, hakama, internaSistemo, ludantaFiguro, retilo,
  cxielo: scena.cxielo,
  lumoj: { hemiLumo: scena.hemiLumo, suna: scena.suna, sunaSprajto: scena.sunaSprajto },
  alteco, sfx, tsekeLaqazbolesai, traduki, paqNomo, aplikiVacepu,
  montriSargxon, montriTost, pulsiEfikon, fariBalailon,
  gxisdatigiRetikulon,
  legiVeston: () => vestejo.legi(),
});

// ⟪ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟫
const { fermiInqoxan, montriKarton, kasxiKarton } = kf2Paneelojn({
  informButono, inqoxa, vepaqListo, mangxaListo, pudalListo,
  kartoElemento, kartoNomo, kartoChip, kartoStatistikoj, kartoFlavor, kartoEniri,
  vepaqPudalj,
  legiRezimon: () => ludanto.rezimo,
  sxaltiRezimon,
  hakama, fotilo,
  gxisdatigiRetikulon,
  skribiElektitan: ( spec ) => { ludanto.elektitaSpec = spec; },
  eniriPaqn,
});

// ⟪ ſɭэ ſɭw , 📃 ⟫
const butKrepusko = document.getElementById("butKrepusko")!;
const duskKama = document.getElementById("duskKama") as HTMLInputElement;
const butVetero = document.getElementById("butVetero")!;
const veteroEtikedo = document.getElementById("veteroEtikedo")!;
const butKonserviEliri = document.getElementById("butKonserviEliri")!;
const menuo = kf2Menuon({
  navPopUp, navButono,
  butKrepusko, duskKama, butVetero, veteroEtikedo,
  butKonserviEliri, konserviEliri: konserviEliriMondon,
  tsekeVestaroMalfermita: () => vestejo.tsekeMalfermita(), inqoxa,
  fermiVestaron: () => vestejo.fermi(), fermiInqoxan,
  traduki, aplikiVacepu,
  aplikiRezimon, aplikiVeteron,
});
const { fermiNaviganPopUp } = menuo;

// ⟪ ſɭᴜ ſןᴜ , ꞙɭц , 📃 ⟫
const { salti, agaEskapon, proviInterakti } = kf2Agojn({
  ludanto, kanuoj, promptoElemento,
  inqoxa, tsekeVestaroMalfermita: () => vestejo.tsekeMalfermita(), fxVarma, fxMenta,
  montriTost, fermiInqoxan,
  fermiVestaron: () => vestejo.fermi(),
  eliriKanoton: ( c ) => kanuanto.eliri(c),
  fermuMapon: () => { if ( minimapo.tsekeMalfermita() ) { minimapo.fermi(); return true; } return false; },
  eniriPaqn, eliriInternon,
});

// ⟪ ſɭэ ſɭw , ꞙɭɿ , 📃 ⟫
const { ca3aq, tsekeSprintas, tsekeSaltas } = kf2Enigojn({
  kanvaso, promptoElemento,
  joystickZono: mobJoystickZono, joystickBazo: mobJoystickBazo, joystickTenilo: mobJoystickTenilo,
  butInterakti: mobButInterakti, butSalti: mobButSalti,
  ludanto: {
    rezimo: () => ludanto.rezimo,
    fsata: () => ludanto.fsata,
    surKanoto: () => ludanto.surKanoto !== null,
    movoValoro: () => ludanto.movoValoro,
    aldoniRigardon: ( dDirekto, dKlinigxo ) => {
      ludanto.c2w2q += dDirekto;
      ludanto.klinigxo = Math.max(-0o135/0o100, Math.min(0o135/0o100, ludanto.klinigxo + dKlinigxo));
    },
    aldoniZumon: ( dZumo ) => { ludanto.celDistanco = Math.max(0, Math.min(0o16, ludanto.celDistanco + dZumo)); },
  },
  agoj: { interakti: proviInterakti, sxaltiRezimon, salti, eskapo: agaEskapon },
});

// ⟪ ſɭᴜ ſןᴜ , ꞙɭэ , 📃 ⟫
function gxisdatigiRetikulon() {
  retikulo.classList.toggle("montri", ludanto.rezimo === "orbito");
}

// ⟪ ſɭᴜ ſןᴜ , ꞙɭɩ , 📃 ⟫
const radioRestilo = new THREE.Raycaster();
kanvaso.addEventListener("click", ( e ) => {
  if ( ludanto.rezimo !== "orbito" ) return;
  const muso = new THREE.Vector2(( e.clientX / innerWidth ) * 2 - 1, -( e.clientY / innerHeight ) * 2 + 1);
  radioRestilo.setFromCamera(muso, fotilo);
  const trafoj = radioRestilo.intersectObjects(selektajxoj);
  if ( trafoj.length > 0 ) {
    const data = trafoj[0].object.userData;
    if ( data && data.spec ) montriKarton(data.spec, data.buildingType);
  } else {
    kasxiKarton();
  }
});

// ⟪ ſɭᴜ ſןᴜ , ꞙɭꞟ , ꞙɭı , 📃 ⟫
function fermiSupermetan(): void {
  if ( minimapo.tsekeMalfermita() ) minimapo.fermi();
  else supermeta.classList.remove("montri");
}
supermeta.addEventListener("click", ( e ) => {
  if ( e.target === supermeta ) fermiSupermetan();
});
document.getElementById("supermetaFermi")!.addEventListener("click", fermiSupermetan);

// ⟪ ſɭɜ ɭʃɔ , ꞙɭɿ , 📃 ⟫
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
const vestejo = kf2Vestejon({ ludantaFiguro, montriTost });
document.getElementById("butVesti")!.addEventListener("click", () => vestejo.malfermiEnMondo());

// ⟪ ſɭэ ſɭw , 📃 ⟫
// ⟨ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
const HELPAJ_VICOJ: [ string, string ][] = [
  [ "kamaOrbito", "klavoTreni" ],
  [ "kamaPromeno", "klavoPromeno" ],
  [ "kamaMovado", "klavoKuro" ],
  [ "kamaSalto", "klavoSalto" ],
  [ "kamaEniri", "klavoEniri" ],
  [ "kamaMapo", "klavoMapo" ],
  [ "kamaEliri", "klavoEliri" ],
  [ "kamaSpajroj", "klavoKlako" ],
  [ "agoGusti", "klavoEniri" ],
  [ "agoKuxi", "klavoEniri" ],
  [ "agoLevi", "klavoEniri" ],
];
document.getElementById("butHelpi")!.addEventListener("click", () => {
  document.getElementById("supermetaTitolo")!.textContent = traduki("titoloHak6h6");
  document.getElementById("supermetaSupra")!.textContent = traduki("subtitoloHelpo");
  supermetaEnhavo.innerHTML = `<div class="statistikoj">` +
    HELPAJ_VICOJ.map(([ s2banani, ca3aq ]) => kunKlavo(s2banani, ca3aq, true)).join("<br>") +
    `</div>`;
  supermeta.classList.add("montri");
  aplikiVacepu();
});

// ⟪ ſɭᴜ ſןᴜ , ꞙɭц , 📃 ⟫
const koliziaKrado = kf2KolizianKradon(kolizioj, qakaj2Kolizioj);
const piedoj: PiedaMondo = { fotilo, kolizioj: koliziaKrado };

// ⟪ ſɭᴜ ſןᴜ , ꞙɭэ , 📃 ⟫
const kanuanto = kf2Kanuanton({
  ludanto, kanuoj, piedoj, ca3aq, promptoElemento, agordiPrompton,
});

// ⟪ ſɭᴜ ſןᴜ , ꞙɭɩ , 📃 ⟫
const minimapo = kf2Minimapon({
  qena, bildilo, supermeta, supermetaEnhavo, mapoGrandeco,
  miniKanvaso: document.getElementById("minimapaKanvaso") as HTMLCanvasElement,
  kompaso: document.getElementById("kompaso")!,
  nadlo: document.getElementById("nadlo")!,
  movantoj: { npcoj, kanuoj, hapaga, hatemek },
  traduki, aplikiVacepu,
});
// ⟪ ſɭᴜ ſןᴜ , ꞙɭꞟ , 📃 ⟫
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩ , ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſ͕ɭɜ ı],ᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ , 📃 ⟩
enkonduko.varmigi();
// ⟨ ſɭᴜ ſןᴜ , ꞙɭɩ ,
//   ſɭᴜ ſןᴜ , ꞙɭꞟ , 📃 ⟩
await minimapo.pretigi();
enkonduko.fini();
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı ,
//   ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
liberigiCac2sexnKampojn();
gxisdatigiRetikulon();

// ⟪ ſɭᴜ ſןᴜ , 📃 ⟫
const { animacii } = kf2Animacion({
  kanvaso, sxargxaElemento, promptoElemento,
  bildilo, fotilo, qena, hakama, maksimumaRatio,
  ludanto, ca3aq, tsekeSprintas, tsekeSaltas,
  ludantaFiguro, minimapo, retilo, statistiko,
  mondo: kaxte,
  gxisdatigiVeteron, gxisdatigiOmbron, mapoQoxa, mapoGrandeco,
  piedoj, kanuanto,
  legiVeston: () => vestejo.legi(),
  agordiPrompton,
});

// ⟪ ſɭэ ſɭᴜ , 📃 ⟫

// ⟪ ſɭэ ɭʃᴜ , 📃 ⟫
animacii();
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı ,
//   ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
