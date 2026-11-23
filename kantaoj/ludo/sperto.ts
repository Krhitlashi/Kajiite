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

// ⟪ រូបរាងពិភពលោក 📃 ⟫
const mapoDatumoj = aktivaMapo();
const mapoQoxa = mapoDatumoj.qoxa;
const mapoGrandeco = mapoDatumoj.grandeco;
import type { UrbaSistemo } from "../mondo/kaxte/hahunaq.js";
import { vepaqKaxten } from "../mondo/kaxte.js";
import { traduki, kunKlavo, paqNomo } from "../lingvo/tradukoj.js";
import { tsekeLaqazbolesai, sfx } from "../../eskekoj/sonoj/sonoro.js";

// ⟪ ធាតុ DOM 📃 ⟫
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

// ⟪ ធាតុទូរស័ព្ទ 📃 ⟫
const navPopUp = document.getElementById("navPopUp")!;
const navButono = document.getElementById("navButono")!;
const butRezimo = document.getElementById("butRezimo")!;
const mobJoystickZono = document.getElementById("mobJoystickZono")!;
const mobJoystickBazo = document.getElementById("mobJoystickBazo")!;
const mobJoystickTenilo = document.getElementById("mobJoystickTenilo")!;
const mobButInterakti = document.getElementById("mobButInterakti")!;
const mobButSalti = document.getElementById("mobButSalti")!;

// ⟪ ធាតុផ្ទាំងព័ត៌មាន 📃 ⟫
const informButono = document.getElementById("informButono")!;
const inqoxa = document.getElementById("inqoxa")!;
const vepaqListo = document.getElementById("vepaqListo")!;
const mangxaListo = document.getElementById("mangxaListo")!;
const pudalListo = document.getElementById("pudalListo")!;

// ⟪ បែបផែនមុខ និងវាំងននផ្ទុក 📃 ⟫
const { montriTost, agordiPrompton, fariBalailon, pulsiEfikon } = kf2Efikojn({ tosto, promptoElemento, balailo, svingo, fxVarma, fxMenta });
const { montriSargxon } = kf2Sargxilon({ stango, sxargxaElemento });

// ⟪ បង្កើតឆាក និងទីក្រុង 📃 ⟫
const scena: ScenaSistemo = kf2Scenon(kanvaso, sxargxaElemento);
const { bildilo, fotilo, qena, dioritaMaterialo, andezitaMaterialo, eniraMaterialo, oraMaterialo, aplikiRezimon, aplikiVeteron, gxisdatigiVeteron, gxisdatigiOmbron, maksimumaRatio } = scena;

( window as unknown as { __sceno?: typeof qena; __fotilo?: typeof fotilo } ).__sceno = qena;
( window as unknown as { __sceno?: typeof qena; __fotilo?: typeof fotilo } ).__fotilo = fotilo;

// ⟪ ស្រទាប់លើរោគវិនិច្ឆ័យ 📃 ⟫
const statistiko = kf2Statistikon(bildilo, qena, fotilo);
( window as unknown as { statistiko: typeof statistiko } ).statistiko = statistiko;

// ⟪ ការណែនាំ 📃 ⟫
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

// ⟪ ដែនមើល , ចម្ងាយបង្ហាញ 📃 ⟫
// ⟨ ឆាកមិនបង្ខំក្រាហ្វិក 📃 ⟩
qena.matrixAutoUpdate = false;
spacigiInstancojn(qena);
// ⟨ សំណាញ់នៅស្ងៀមដែលភ្ជាប់ 📃 ⟩
registriKunigitajnMeshojn(qena);
registriVivantojn({ npcoj, kanuoj, hapaga: hapaga.hapaga, hatemek: hatemek.hatemek });

// ⟪ រូបអ្នកលេង 📃 ⟫
const ludantaFiguro: Figuro = vepaqFiguron(VESTOJ[0]);
ludantaFiguro.group.visible = false;
qena.add(ludantaFiguro.group);

// ⟪ ពណ៌ KNAKEHE គ្រប់ពន្លឺ 🎨 ⟫
// ⟨ បន្ទាប់ពីគ្រប់វត្ថុចូលឆាក បង្គត់ពណ៌ពន្លឺ អ័ព្ទ និងវត្ថុធាតុទាំងអស់
//   ទៅ #nmnmnm ។ ការលាយថ្ងៃ-ព្រលប់បន្តបង្គត់ក្នុង aplikiAtmosferon ។ 📃 ⟩
veb6qaiQena(qena);
// ⟨ បន្ទាប់ពីនេះ វត្ថុដែលចូលឆាកត្រូវបង្គត់ពណ៌ភ្លាម មិនចាំបាច់ឆ្លងកាត់ឆាកវិញ ។ 📃 ⟩
saxeVeb6qai();

// ⟪ បណ្តាញ ( លេងច្រើននាក់ ) 📃 ⟫
const retilo = kf2Retilon(qena, montriTost, traduki);

// ⟪ ឧបករណ៍បញ្ជាគន្លង 📃 ⟫
const hakama = new OrbitControls(fotilo, bildilo.domElement);
hakama.target.set(0, 2, 0);
hakama.enableDamping = true;
hakama.dampingFactor = 0o5/0o100;
hakama.maxPolarAngle = Math.PI * 0o37/0o100;
hakama.minDistance = 0o10;
hakama.maxDistance = 0o330;
hakama.update();
( window as unknown as { __hakama?: typeof hakama } ).__hakama = hakama;

// ⟪ ស្ថានភាព 📃 ⟫
const ludanto = kf2Ludanton();

// ⟪ របៀប 📃 ⟫
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

// ⟪ ផ្ទាំងព័ត៌មាន 📃 ⟫
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

// ⟪ ម៉ឺនុយ 📃 ⟫
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

// ⟪ សកម្មភាព 📃 ⟫
const { salti, agaEskapon, proviInterakti } = kf2Agojn({
  ludanto, kanuoj, promptoElemento,
  inqoxa, tsekeVestaroMalfermita: () => vestejo.tsekeMalfermita(), fxVarma, fxMenta,
  montriTost, fermiInqoxan,
  fermiVestaron: () => vestejo.fermi(),
  eliriKanoton: ( c ) => kanuanto.eliri(c),
  fermuMapon: () => { if ( minimapo.tsekeMalfermita() ) { minimapo.fermi(); return true; } return false; },
  eniriPaqn, eliriInternon,
});

// ⟪ ការបញ្ចូល 📃 ⟫
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

// ⟪ ការបញ្ជាបណ្តាញ 📃 ⟫
function gxisdatigiRetikulon() {
  retikulo.classList.toggle("montri", ludanto.rezimo === "orbito");
}

// ⟪ ចុចដើម្បីជ្រើស 📃 ⟫
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

// ⟪ ស្រទាប់លើរួម ( ជំនួយ និងផែនទីពេញ ) ៖ បិទដោយចុចខាងក្រៅ ឬប៊ូតុង 川 📃 ⟫
function fermiSupermetan(): void {
  if ( minimapo.tsekeMalfermita() ) minimapo.fermi();
  else supermeta.classList.remove("montri");
}
supermeta.addEventListener("click", ( e ) => {
  if ( e.target === supermeta ) fermiSupermetan();
});
document.getElementById("supermetaFermi")!.addEventListener("click", fermiSupermetan);

// ⟪ បន្ទប់សម្លៀកបំពាក់ ៖ ទំព័រតែមួយរួមជាមួយផ្ទាំងចាប់ផ្តើម 📃 ⟫
// ⟨ ប៊ូតុងនៅក្នុងផ្ទាំងរុករកបើកវា , ដូច្នេះផ្ទាំងលេចឡើងបិទមុន 📃 ⟩
const vestejo = kf2Vestejon({ ludantaFiguro, montriTost });
document.getElementById("butVesti")!.addEventListener("click", () => vestejo.malfermiEnMondo());

// ⟪ ជំនួយ 📃 ⟫
// ⟨ ជួរនីមួយៗ ៖ សោអត្ថបទ , សោគន្លឹះ ។ សញ្ញា • មកពីកូដ , មិនមែនពីវចនានុក្រមទេ ។ 📃 ⟩
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

// ⟪ ការប៉ះទង្គិចក្រឡា 📃 ⟫
const koliziaKrado = kf2KolizianKradon(kolizioj, qakaj2Kolizioj);
const piedoj: PiedaMondo = { fotilo, kolizioj: koliziaKrado };

// ⟪ ការជិះទូក 📃 ⟫
const kanuanto = kf2Kanuanton({
  ludanto, kanuoj, piedoj, ca3aq, promptoElemento, agordiPrompton,
});

// ⟪ ផែនទីតូច 📃 ⟫
const minimapo = kf2Minimapon({
  qena, bildilo, supermeta, supermetaEnhavo, mapoGrandeco,
  miniKanvaso: document.getElementById("minimapaKanvaso") as HTMLCanvasElement,
  kompaso: document.getElementById("kompaso")!,
  nadlo: document.getElementById("nadlo")!,
  movantoj: { npcoj, kanuoj, hapaga, hatemek },
  traduki, aplikiVacepu,
});
// ⟪ ការកម្តៅ GPU 📃 ⟫
// ⟨ កម្តៅបន្ទាប់ពីឆាកចប់ 📃 ⟩ ៖ រូបអ្នកលេង , ពណ៌ KNAKEHE និងផែនទីតូចបន្ថែម
// វត្ថុធាតុថ្មី ។ បើកម្តៅមុនពួកវា , ស៊ុមដំបូងដែលអ្នកលេងឃើញត្រូវចងក្រងកម្មវិធី
// ស្រមោលដែលនៅខ្វះម្តងមួយៗ ហើយឆាកកក ។ ដូច្នេះកម្តៅនៅទីនេះ ខណៈវាំងនននៅបិទ ។ 📃 ⟩
enkonduko.varmigi();
// ⟨ ដុតផែនទីតូចខណៈវាំងនននៅបិទ ដើម្បីឱ្យរ៉ាដាបង្ហាញភ្លាមពេលលេង ។
//   ការដុតមានតម្លៃ , ដូច្នេះវាមិនត្រូវរង់ចាំការចុចត្រីវិស័យទេ ។ 📃 ⟩
await minimapo.pretigi();
enkonduko.fini();
// ⟨ ដោះលែងវាលចម្ងាយ និង វាលហូរ ព្រោះវាលទាំងនោះធំហើយលែងប្រើ ។
//   ក្រណាត់នៅរក្សាពិកសែលដើម ដូច្នេះការផ្ទុកឡើងវិញមិនធ្វើឱ្យខ្មៅទេ ។ 📃 ⟩
liberigiCac2sexnKampojn();
gxisdatigiRetikulon();

// ⟪ ចលនា 📃 ⟫
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

// ⟪ ការផ្ទុក 📃 ⟫

// ⟪ ការចាប់ផ្តើមដំណើរការ 📃 ⟫
animacii();
// ⟨ កុំដុតផែនទីដោយស្វ័យប្រវត្តិ ។ GPU ត្រូវការវាតែពេលអ្នកប្រើ
//   ចុចផែនទី ដូច្នេះពិភពលោកដែលទើបបើកមិនមានការងារបន្ថែមធំ 📃 ⟩
