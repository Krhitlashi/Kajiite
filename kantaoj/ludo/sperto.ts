// ≺⧼ បទពិសោធន៍ 🎮 ⧽≻
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { VESTOJ } from "../../eskekoj/vestaro/vestoj.js";
import { konstruiFiguron } from "../../eskekoj/shalaj-specioj/homoj.js";
import type { Figuro } from "../../eskekoj/shalaj-specioj/homoj.js";
import { kreiRetilon } from "./retilo.js";
import { kreiMinimapon } from "../bildo/minimapo.js";
import { aplikiVacepu, kreiEfikojn } from "../fasado/efikoj.js";
import { kreiSargxilon } from "../fasado/sxargxo.js";
import { kreiEnkondukon } from "../fasado/enkonduko.js";
import { kreiPaneelojn } from "../fasado/paneeloj.js";
import { kreiVestejon } from "../fasado/vestejo.js";
import { kreiEnigojn } from "../fasado/enigoj.js";
import { kreiMenuon } from "../fasado/menuo.js";
import { kreiRezimojn } from "./rezimoj.js";
import { kreiAnimacion } from "./animacio.js";
import { kreiLudanton } from "./ludanto.js";
import { kreiKanuanton } from "./kanuado.js";
import type { PiedaMondo } from "./piedirado.js";
import { kreiAgojn } from "./agoj.js";

import { kreiKolizianKradon } from "../mondo/kolizioj.js";
import { alteco } from "../mondo/tereno.js";
import { aktivaMapo } from "../tero-datumaro/mapregulo.js";
import { kreiScenon } from "../bildo/scena.js";
import type { ScenaSistemo } from "../bildo/scena/tipoj.js";
import { registriKunigitajnMeshojn, registriVivantojn, spacigiInstancojn } from "../bildo/vidlimo.js";
import { kreiStatistikon } from "../fasado/statistiko.js";

// ⟪ រូបរាងពិភពលោក 📃 ⟫
const mapoDatumoj = aktivaMapo();
const mapoFormo = mapoDatumoj.formo;
const mapoGrandeco = mapoDatumoj.grandeco;
import type { UrbaSistemo } from "../mondo/urbo/tipoj.js";
import { konstruiUrbon } from "../mondo/urbo.js";
import { traduki, konstruaĵaNomo } from "../lingvo/tradukoj.js";
import { sxaltiAŭdion, cxuAŭdio, sxaltiBruon, cxuBruo, sfx, autoKomenci, registriPostAŭdio } from "../../eskekoj/sonoj/sonoro.js";
import { ludi, sxargiTrako, nunaTrako, cxuLudas } from "../../eskekoj/sonoj/muziko/ludilo.js";

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
const vestaVico = document.getElementById("vestaVico")!;
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
const butSonoro = document.getElementById("butSonoro")!;
const butRezimo = document.getElementById("butRezimo")!;
const butBruo = document.getElementById("butBruo")!;
const mobJoystickZono = document.getElementById("mobJoystickZono")!;
const mobJoystickBazo = document.getElementById("mobJoystickBazo")!;
const mobJoystickTenilo = document.getElementById("mobJoystickTenilo")!;
const mobButInterakti = document.getElementById("mobButInterakti")!;
const mobButSalti = document.getElementById("mobButSalti")!;

// ⟪ ធាតុផ្ទាំងព័ត៌មាន 📃 ⟫
const informButono = document.getElementById("informButono")!;
const informo = document.getElementById("informo")!;
const konstruaListo = document.getElementById("konstruaListo")!;
const mangxaListo = document.getElementById("mangxaListo")!;
const speciaListo = document.getElementById("speciaListo")!;

// ⟪ ធាតុផ្ទាំងសម្លៀកបំពាក់ 📃 ⟫
const vestaro = document.getElementById("vestaro")!;
const vestaListo = document.getElementById("vestaListo")!;
const haraListo = document.getElementById("haraListo")!;

// ⟪ បែបផែនមុខ និងវាំងននផ្ទុក 📃 ⟫
const { montriTost, agordiPrompton, fariBalailon, pulsiEfikon } = kreiEfikojn({ tosto, promptoElemento, balailo, svingo, fxVarma, fxMenta });
const { montriSargxon } = kreiSargxilon({ stango, sxargxaElemento });

// ⟪ បង្កើតឆាក និងទីក្រុង 📃 ⟫
const scena: ScenaSistemo = kreiScenon(kanvaso, sxargxaElemento);
const { bildilo, fotilo, sceno, dioritaMaterialo, andezitaMaterialo, eniraMaterialo, oraMaterialo, aplikiRezimon, aplikiVeteron, gxisdatigiVeteron, gxisdatigiOmbron, maksimumaRatio } = scena;

( window as unknown as { __sceno?: typeof sceno; __fotilo?: typeof fotilo } ).__sceno = sceno;
( window as unknown as { __sceno?: typeof sceno; __fotilo?: typeof fotilo } ).__fotilo = fotilo;

// ⟪ ស្រទាប់លើរោគវិនិច្ឆ័យ 📃 ⟫
const statistiko = kreiStatistikon(bildilo, sceno, fotilo);
( window as unknown as { statistiko: typeof statistiko } ).statistiko = statistiko;

// ⟪ ការណែនាំ 📃 ⟫
const enkonduko = kreiEnkondukon({
  kanvaso, sxargxaElemento, stango, sxargxaTitolo,
  bildilo, fotilo, sceno, maksimumaRatio,
  traduki, aplikiVacepu,
});
enkonduko.komenci();

const urbo: UrbaSistemo = await konstruiUrbon(sceno, dioritaMaterialo, andezitaMaterialo, eniraMaterialo, oraMaterialo, enkonduko.gxisdatigiProgreson);
const {
  konstruSpecoj, kolizioj, dokoKolizioj, selektajxoj,
  bestoj, petreloj, kanuoj, npcoj, internaSistemo,
} = urbo;
enkonduko.halti();

// ⟪ ដែនមើល , ចម្ងាយបង្ហាញ 📃 ⟫
// ⟨ ឆាកមិនបង្ខំក្រាហ្វិក 📃 ⟩
sceno.matrixAutoUpdate = false;
spacigiInstancojn(sceno);
// ⟨ សំណាញ់នៅស្ងៀមដែលភ្ជាប់ 📃 ⟩
registriKunigitajnMeshojn(sceno);
registriVivantojn({ npcoj, kanuoj, bestoj: bestoj.bestoj, petreloj: petreloj.petreloj });

// ⟪ ការកម្តៅ GPU 📃 ⟫
enkonduko.varmigi();

// ⟪ រូបអ្នកលេង 📃 ⟫
const ludantaFiguro: Figuro = konstruiFiguron(VESTOJ[0]);
ludantaFiguro.group.visible = false;
sceno.add(ludantaFiguro.group);

// ⟪ បណ្តាញ ( លេងច្រើននាក់ ) 📃 ⟫
const retilo = kreiRetilon(sceno, montriTost, traduki);

// ⟪ ឧបករណ៍បញ្ជាគន្លង 📃 ⟫
const regiloj = new OrbitControls(fotilo, bildilo.domElement);
regiloj.target.set(0, 2, 0);
regiloj.enableDamping = true;
regiloj.dampingFactor = 0o5/0o100;
regiloj.maxPolarAngle = Math.PI * 0o37/0o100;
regiloj.minDistance = 0o10;
regiloj.maxDistance = 0o330;
regiloj.update();
( window as unknown as { __regiloj?: typeof regiloj } ).__regiloj = regiloj;

// ⟪ ស្ថានភាព 📃 ⟫
const ludanto = kreiLudanton();

// ⟪ របៀប 📃 ⟫
const { eniriKonstruajxon, eliriInternon, sxaltiRezimon } = kreiRezimojn({
  ludanto,
  kanvaso, butRezimo, kartoElemento, promptoElemento,
  sceno, fotilo, regiloj, internaSistemo, ludantaFiguro, retilo,
  cxielo: scena.cxielo,
  lumoj: { hemiLumo: scena.hemiLumo, suna: scena.suna, sunaSprajto: scena.sunaSprajto },
  alteco, sfx, cxuAŭdio, traduki, konstruaĵaNomo, aplikiVacepu,
  montriSargxon, montriTost, pulsiEfikon, fariBalailon,
  gxisdatigiRetikulon,
  legiVeston: () => vestejo.legi(),
});

// ⟪ ផ្ទាំងព័ត៌មាន 📃 ⟫
const { fermiInformon, montriKarton, kasxiKarton } = kreiPaneelojn({
  informButono, informo, konstruaListo, mangxaListo, speciaListo,
  kartoElemento, kartoNomo, kartoChip, kartoStatistikoj, kartoFlavor, kartoEniri,
  konstruSpecoj,
  legiRezimon: () => ludanto.rezimo,
  sxaltiRezimon,
  regiloj, fotilo,
  gxisdatigiRetikulon,
  fermiVestaron: () => vestejo.fermi(),
  skribiElektitan: ( spec ) => { ludanto.elektitaSpec = spec; },
  eniriKonstruajxon,
});

// ⟪ ម៉ឺនុយ 📃 ⟫
const butKrepusko = document.getElementById("butKrepusko")!;
const duskRegilo = document.getElementById("duskRegilo") as HTMLInputElement;
const butVetero = document.getElementById("butVetero")!;
const veteroEtikedo = document.getElementById("veteroEtikedo")!;
const menuo = kreiMenuon({
  navPopUp, navButono, butSonoro, butBruo,
  butKrepusko, duskRegilo, butVetero, veteroEtikedo,
  vestaro, informo,
  fermiVestaron: () => vestejo.fermi(), fermiInformon,
  traduki, aplikiVacepu,
  aplikiRezimon, aplikiVeteron,
  sonoro: { registriPostAŭdio, autoKomenci, sxaltiAŭdion, cxuAŭdio, sxaltiBruon, cxuBruo },
  muziko: { nunaTrako, cxuLudas, sxargiTrako, ludi },
});
const { fermiNaviganPopUp } = menuo;

// ⟪ សកម្មភាព 📃 ⟫
const { salti, agaEskapon, proviInterakti } = kreiAgojn({
  ludanto, kanuoj, promptoElemento,
  informo, vestaro, fxVarma, fxMenta,
  montriTost, fermiInformon,
  fermiVestaron: () => vestejo.fermi(),
  eliriKanoton: ( c ) => kanuanto.eliri(c),
  fermuMapon: () => { if ( minimapo.cxuMalfermita() ) { minimapo.fermi(); return true; } return false; },
  eniriKonstruajxon, eliriInternon,
});

// ⟪ ការបញ្ចូល 📃 ⟫
const { klavoj, cxuSprintas, cxuSaltas } = kreiEnigojn({
  kanvaso, promptoElemento,
  joystickZono: mobJoystickZono, joystickBazo: mobJoystickBazo, joystickTenilo: mobJoystickTenilo,
  butInterakti: mobButInterakti, butSalti: mobButSalti,
  ludanto: {
    rezimo: () => ludanto.rezimo,
    kuŝas: () => ludanto.kuŝas,
    surKanoto: () => ludanto.surKanoto !== null,
    movoValoro: () => ludanto.movoValoro,
    aldoniRigardon: ( dDirekto, dKlinigxo ) => {
      ludanto.direkto += dDirekto;
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

supermeta.addEventListener("click", ( e ) => {
  if ( e.target !== supermeta ) return;
  if ( minimapo.cxuMalfermita() ) minimapo.fermi(); else supermeta.classList.remove("montri");
});
document.getElementById("supermetaFermi")!.addEventListener("click", () => {
  if ( minimapo.cxuMalfermita() ) minimapo.fermi(); else supermeta.classList.remove("montri");
});

// ⟪ បន្ទប់សម្លៀកបំពាក់ 📃 ⟫
const vestejo = kreiVestejon({
  vestaro, vestaListo, haraListo, ludantaFiguro,
  montriTost, fermiInformon, fermiNaviganPopUp,
});

// ⟪ ជំនួយ 📃 ⟫
document.getElementById("butHelpi")!.addEventListener("click", () => {
  document.getElementById("supermetaTitolo")!.textContent = traduki("titoloVojoj");
  document.getElementById("supermetaSupra")!.textContent = traduki("subtitoloHelpo");
  vestaVico.innerHTML = `<div class="statistikoj">
    <b>Orbit</b> · ${traduki("regiloOrbito")}<br>
    <b>Walk</b> · ${traduki("regiloPromeno")}<br>
    <b>WASD</b> · ${traduki("regiloMovado")}<br>
    <b>E</b> · ${traduki("regiloEniri")}<br>
    <b>M</b> · ${traduki("regiloMapo")}<br>
    <b>Escape</b> · ${traduki("regiloEliri")}<br>
    <b>Click spires</b> · ${traduki("regiloSpajroj")}<br>
  </div>`;
  supermeta.classList.add("montri");
  aplikiVacepu();
});

// ⟪ ការប៉ះទង្គិចក្រឡា 📃 ⟫
const koliziaKrado = kreiKolizianKradon(kolizioj, dokoKolizioj);
const piedoj: PiedaMondo = { fotilo, kolizioj: koliziaKrado };

// ⟪ ការជិះទូក 📃 ⟫
const kanuanto = kreiKanuanton({
  ludanto, kanuoj, piedoj, klavoj, promptoElemento, agordiPrompton,
});

// ⟪ ផែនទីតូច 📃 ⟫
const minimapo = kreiMinimapon({
  sceno, bildilo, supermeta, vestaVico, mapoGrandeco,
  miniKanvaso: document.getElementById("minimapaKanvaso") as HTMLCanvasElement,
  kompaso: document.getElementById("kompaso")!,
  nadlo: document.getElementById("nadlo")!,
  movantoj: { npcoj, kanuoj, bestoj, petreloj },
  traduki, aplikiVacepu,
});
enkonduko.fini();
gxisdatigiRetikulon();

// ⟪ ចលនា 📃 ⟫
const { animacii } = kreiAnimacion({
  kanvaso, sxargxaElemento, promptoElemento,
  bildilo, fotilo, sceno, regiloj, maksimumaRatio,
  ludanto, klavoj, cxuSprintas, cxuSaltas,
  ludantaFiguro, minimapo, retilo, statistiko,
  mondo: urbo,
  gxisdatigiVeteron, gxisdatigiOmbron, mapoFormo, mapoGrandeco,
  piedoj, kanuanto,
  legiVeston: () => vestejo.legi(),
  agordiPrompton,
});

// ⟪ ការផ្ទុក 📃 ⟫

// ⟪ ការចាប់ផ្តើមដំណើរការ 📃 ⟫
animacii();
