// ≺⧼ Sperto 🎮 ⧽≻
// La orkestrilo de la ludo — la ĉefa buklo, la fotilo, la klavoj kaj la kunligo
// de ĉiuj moduloj ( la urbo, la akvo, la bestoj, la panelaĵoj kaj la retilo ).
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
import { registriVivantojn, spacigiInstancojn } from "../bildo/vidlimo.js";
import { kreiStatistikon } from "../fasado/statistiko.js";

// ⟪ La formo de la mondo 📃 ⟫ — la tereno de la ludo havas la formon de la aktiva
// mapo ( la cirklo, la rondigita kvadrato aŭ la rondigita triangulo ), do la
// promenaj limoj sekvas ĝin anstataŭ kvadraton.
const mapoDatumoj = aktivaMapo();
const mapoFormo = mapoDatumoj.formo;
const mapoGrandeco = mapoDatumoj.grandeco;
import type { UrbaSistemo } from "../mondo/urbo/tipoj.js";
import { konstruiUrbon } from "../mondo/urbo.js";
import { traduki, konstruaĵaNomo } from "../lingvo/tradukoj.js";
import { sxaltiAŭdion, cxuAŭdio, sxaltiBruon, cxuBruo, sfx, autoKomenci, registriPostAŭdio } from "../../eskekoj/sonoj/sonoro.js";
import { ludi, sxargiTrako, nunaTrako, cxuLudas } from "../../eskekoj/sonoj/muziko/ludilo.js";

// ⟪ DOM-elementoj 📃 ⟫
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

// ⟪ Poŝtelefonaj elementoj 📃 ⟫
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

// ⟪ Informo-panelaj elementoj 📃 ⟫
const informButono = document.getElementById("informButono")!;
const informo = document.getElementById("informo")!;
const konstruaListo = document.getElementById("konstruaListo")!;
const mangxaListo = document.getElementById("mangxaListo")!;
const speciaListo = document.getElementById("speciaListo")!;

// ⟪ Vestaro-panelaj elementoj 📃 ⟫
const vestaro = document.getElementById("vestaro")!;
const vestaListo = document.getElementById("vestaListo")!;
const haraListo = document.getElementById("haraListo")!;

// ⟪ La fasado-efikoj kaj la ŝarĝa kurteno 📃 ⟫ — la komunaj iloj de la fasado
// ( la tosto, la promptilo, la balaila transiro, la svingo kaj la vacepu-volvaĵo )
// kaj la ŝarĝa ekrano de la eniroj. Ili uzas la elementojn supre, do ili naskiĝas
// ĉi tie — antaŭ la urbo, ĉar la progreso de la konstruado jam montras la stangon.
const { montriTost, agordiPrompton, fariBalailon, pulsiEfikon } = kreiEfikojn({ tosto, promptoElemento, balailo, svingo, fxVarma, fxMenta });
const { montriSargxon } = kreiSargxilon({ stango, sxargxaElemento });


// ⟪ Krei scenon kaj urbon 📃 ⟫
const scena: ScenaSistemo = kreiScenon(kanvaso, sxargxaElemento);
const { bildilo, fotilo, sceno, dioritaMaterialo, andezitaMaterialo, eniraMaterialo, oraMaterialo, aplikiRezimon, aplikiVeteron, gxisdatigiVeteron, gxisdatigiOmbron, maksimumaRatio } = scena;

// FIXME provizore por la inspektado de la vojoj
( window as unknown as { __sceno?: typeof sceno; __fotilo?: typeof fotilo } ).__sceno = sceno;
( window as unknown as { __sceno?: typeof sceno; __fotilo?: typeof fotilo } ).__fotilo = fotilo;

// ⟪ La diagnoza surmetaĵo 📃 ⟫ — montras la nombrojn de la bildilo kaj de la
// vidlimo ( kadroj en He, desegnaj alvokoj, trianguloj, kaj kiuj scen-partoj
// pezas ).
// Ŝaltita per ?statistiko; sen la parametro ĝi nur dormas ( unu bulea testo
// po kadro ). Vidu kantaoj/fasado/statistiko.ts.
const statistiko = kreiStatistikon(bildilo, sceno, fotilo);
( window as unknown as { statistiko: typeof statistiko } ).statistiko = statistiko;

// ⟪ La enkonduko 📃 ⟫ — la kina drivo de la fotilo sub la ŝarĝa kurteno, la
// titolo kaj la progreso-stango, la GPU-varmigo kaj la fermo de la kurteno vivas
// en kantaoj/fasado/enkonduko.ts. La frua buklo ekas ĉi tie ( la tereno jam
// staras ) kaj la ĉefa buklo haltigas ĝin post la urbo.
const enkonduko = kreiEnkondukon({
  kanvaso, sxargxaElemento, stango, sxargxaTitolo,
  bildilo, fotilo, sceno, maksimumaRatio,
  traduki, aplikiVacepu,
});
enkonduko.komenci();

const urbo: UrbaSistemo = await konstruiUrbon(sceno, dioritaMaterialo, andezitaMaterialo, eniraMaterialo, oraMaterialo, enkonduko.gxisdatigiProgreson);
// La ceteraj sistemoj de la urbo ( la akvoj, la lampoj, la nebulo, la sxipo, la
// beroj ) apartenas al la animacia buklo — la orkestrilo donas la TUTAN urban
// sistemon al gxi per `mondo: urbo` sube.
const {
  konstruSpecoj, kolizioj, dokoKolizioj, selektajxoj,
  bestoj, petreloj, kanuoj, npcoj, internaSistemo,
} = urbo;
// La urbo estas preta — haltu la enkondukan drivon ( la ĉefa buklo ekas ĉe la
// fino de la dosiero ).
enkonduko.halti();

// ⟪ Vidlimo — la bildiga distanco 📃 ⟫ — la mondo registriĝas ĉe la vidlimo
// ( kantaoj/bildo/vidlimo.ts ) tuj post la konstruado. La grandaj instancigitaj tavoloj
// ( la arbaroj, la herbo, la rokoj ) disdividiĝas laŭ spaca krado, do ĉiu peco
// havas propran limigan sferon: la vidkampo kaj la ombra fotilo povas forigi la
// pecojn ekster la vido, kaj la distanca limo forigas la malgrandajn detalojn
// antaŭ ol ili eĉ atingas la GPU-on. La vivantoj registriĝas per la sama modulo
// ( registriVivantojn ) per sia propra pozicio.
// Antaŭe la tuta arbaro ( miloj da instancoj ) kaj ĉiu figuro pasis tra la
// vertica shadero ĉiukadre, kvankam la nebulo kaŝas ĉion trans ~0o200 unuoj.
spacigiInstancojn(sceno);
registriVivantojn({ npcoj, kanuoj, bestoj: bestoj.bestoj, petreloj: petreloj.petreloj });

// ⟪ GPU-varmigo 📃 ⟫ — la antaŭkompilo de la shader-programoj kaj la unua
// ombra kadro sub la kurteno ( vidu la klarigon en kantaoj/fasado/enkonduko.ts ).
enkonduko.varmigi();

// ⟪ Ludanta figuro 📃 ⟫ — la NPC-stila modelo de la ludanto. Videbla nur en
// tria persono, kiam la rado malzomas eksteren dum promenado.
const ludantaFiguro: Figuro = konstruiFiguron(VESTOJ[0]);
ludantaFiguro.group.visible = false;
sceno.add(ludantaFiguro.group);
// La aspekto ( la vesto, la har-stilo kaj -koloro ) vivas en
// kantaoj/fasado/vestejo.ts, kiu aplikas la konservitan elekton al ĉi tiu figuro.

// ⟪ Retilo ( multludada ) 📃 ⟫ — konektas al la servila WebSocket kaj montras
// la aliajn ludantojn kiel figurojn en la mondo. Se la servilo ne estas
// atingebla, la retilo restas silente malaktiva.
const retilo = kreiRetilon(sceno, montriTost, traduki);

// ⟪ Orbit-regiloj 📃 ⟫
const regiloj = new OrbitControls(fotilo, bildilo.domElement);
regiloj.target.set(0, 2, 0);
regiloj.enableDamping = true;
regiloj.dampingFactor = 0o5/0o100;
regiloj.maxPolarAngle = Math.PI * 0o37/0o100;
regiloj.minDistance = 0o10;
regiloj.maxDistance = 0o330;
regiloj.update();
( window as unknown as { __regiloj?: typeof regiloj } ).__regiloj = regiloj;   // FIXME temporarily for road inspection

// ⟪ Stato 📃 ⟫ — la ŝanĝiĝema stato de la ludanto ( la reĝimo, la pozicio, la
// rigardo, la rapidoj kaj la interagaj proksimuloj ) vivas en UNU objekto
// ( kantaoj/ludo/ludanto.ts ), por ke la orkestrilo, la reĝimaj transiroj, la
// eniga tavolo kaj la animacia buklo kunhavigu la samajn valorojn.
const ludanto = kreiLudanton();

// ⟪ La reĝimoj 📃 ⟫ — la eniro kaj eliro de konstruaĵoj, la kaŝado de la ekstera
// mondo dum la interno kaj la reĝima butono vivas en kantaoj/ludo/rezimoj.ts.
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

// ⟪ La informo-panelo 📃 ⟫ — la tri langetoj kaj la komunaj panelkartoj vivas en
// kantaoj/fasado/paneeloj.ts. La langetoj kaj la listoj pleniĝas memstare; la orkestrilo
// nur donas al ili la elementojn kaj la agojn, kiuj apartenas al ĝi.
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

// ⟪ La menuo 📃 ⟫ — la navigada pop-upo, la sonaj butonoj, la traka selektilo,
// la krepuska regilo kaj la vetera ciklo vivas en kantaoj/fasado/menuo.ts. La
// orkestrilo nur donas al gxi la elementojn, la panelajn fermojn kaj la pordegojn
// al la sonaj kaj scenaj moduloj; la pop-upa fermo reen venas, ĉar la vestejo kaj
// la panelaj klakoj fermas la pop-upon post la propra ago.
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

// ⟪ La agoj 📃 ⟫ — la salto, la E-interago, la kuŝiĝo kaj la manĝado vivas en
// kantaoj/ludo/agoj.ts. Ili bezonas la kanuan blokon kaj la minimapon, kiuj
// naskiĝas poste ( ili bezonas la enigon kaj la kolizian kradon ), do tiuj du
// venas kiel mallongaj pordegoj — la agoj vokiĝas nur en la klako.
const { salti, agaEskapon, proviInterakti } = kreiAgojn({
  ludanto, kanuoj, promptoElemento,
  informo, vestaro, fxVarma, fxMenta,
  montriTost, fermiInformon,
  fermiVestaron: () => vestejo.fermi(),
  eliriKanoton: ( c ) => kanuanto.eliri(c),
  fermuMapon: () => { if ( minimapo.cxuMalfermita() ) { minimapo.fermi(); return true; } return false; },
  eniriKonstruajxon, eliriInternon,
});

// ⟪ La enigo 📃 ⟫ — la klavaro, la stirstango, la rigarda gesto, la
// telefonaj butonoj, la montra-seruro kaj la rado vivas en
// kantaoj/fasado/enigoj.ts. La orkestrilo donas al ili la ludanton ( la
// legilojn kaj la du movilojn de la fotilo ) kaj la agojn, kiujn ili vokas;
// ili redonas la klav-staton, kiun la mova buklo legas.
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

// ⟪ Retikula kontrolo 📃 ⟫
function gxisdatigiRetikulon() {
  retikulo.classList.toggle("montri", ludanto.rezimo === "orbit");
}

// ⟪ Klaku por elekti 📃 ⟫
const radioRestilo = new THREE.Raycaster();
kanvaso.addEventListener("click", ( e ) => {
  if ( ludanto.rezimo !== "orbit" ) return;
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

// La skrim-klako fermas kian panelon ajn. Kiam la PLENA MAPO estas malfermita,
// minimapo.fermi devas okupiĝi anstataŭ la nura .montri-forigo — alie la mapo
// restus malfermita kaj la kompaso rifuzus remalfermi ĝin.
supermeta.addEventListener("click", ( e ) => {
  if ( e.target !== supermeta ) return;
  if ( minimapo.cxuMalfermita() ) minimapo.fermi(); else supermeta.classList.remove("montri");
});
document.getElementById("supermetaFermi")!.addEventListener("click", () => {
  if ( minimapo.cxuMalfermita() ) minimapo.fermi(); else supermeta.classList.remove("montri");
});

// ⟪ Vestejo 📃 ⟫ — la vestara panelo kaj la konservita aspekto de la ludanto
// vivas en kantaoj/fasado/vestejo.ts. La fabriko tuj aplikas la konservitan
// elekton al la figuro kaj tenas la indeksojn, kiujn la retila stato legas.
const vestejo = kreiVestejon({
  vestaro, vestaListo, haraListo, ludantaFiguro,
  montriTost, fermiInformon, fermiNaviganPopUp,
});

// ⟪ Helpo 📃 ⟫
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
  // La helpa listo bezonas la vacepu-vortojn ( aih ).
  aplikiVacepu();
});

// ⟪ La krada kolizio 📃 ⟫ — la koliziaj cirkloj, la dokaj platformoj kaj la
// vojaj supraĵoj en unuforma haŝo-krado ( kantaoj/mondo/kolizioj.ts ). La krado
// konstruiĝas unufoje — ĉi tie, post la urba konstruado — kaj ĉiuj demandoj
// legas nur la ĉelojn ĉirkaŭ la demando-punkto. La krado iras al la buklo kaj al
// la kanuado kiel `piedoj` ( la fotilo plus la krado ).
const koliziaKrado = kreiKolizianKradon(kolizioj, dokoKolizioj);
const piedoj: PiedaMondo = { fotilo, kolizioj: koliziaKrado };

// ⟪ La kanuado 📃 ⟫ — la kanua bloko ( kantaoj/ludo/kanuado.ts ) konstruiĝas ĉi
// tie, ĉar la E-ago ( `proviInterakti` ) bezonas ĝian eliron al la seka bordo.
const kanuanto = kreiKanuanton({
  ludanto, kanuoj, piedoj, klavoj, promptoElemento, agordiPrompton,
});

// ⟪ La minimapo 📃 ⟫ — la bakita radaro kaj la plena mapo ( kantaoj/bildo/minimapo.ts ).
// La modulo bakas la scenon unufoje ĉi tie ( la urbo jam staras ) kaj tenas sian
// propran staton; la buklo nur donas al ĝi la vidpunkton kaj la rigardon ĉiukadre.
const minimapo = kreiMinimapon({
  sceno, bildilo, supermeta, vestaVico, mapoGrandeco,
  miniKanvaso: document.getElementById("minimapaKanvaso") as HTMLCanvasElement,
  kompaso: document.getElementById("kompaso")!,
  nadlo: document.getElementById("nadlo")!,
  movantoj: { npcoj, kanuoj, bestoj, petreloj },
  traduki, aplikiVacepu,
});
// La ŝarĝa ekrano finiĝas nur kiam ĉio estas preta ( konstruado + bakado ).
enkonduko.fini();
gxisdatigiRetikulon();

// ⟪ La animacio 📃 ⟫ — la ĉefa buklo ( la promenado, la interno, la kanuo, la
// ombroj, la herbo, la minimapo kaj la bildigo ) vivas en kantaoj/ludo/animacio.ts.
// La buklo ricevas la sistemojn de la urbo, la kolizian kradon kaj la staton de la
// ludanto, kaj redonas la buklon mem.
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

// ⟪ Sxargxo 📃 ⟫ — la stango estas pelita de la REALA konstrua progreso
// ( konstruiUrbon raportas procentojn ). La finita-klaso aldoniĝas poste, kiam
// la konstruado kaj la mapo-bakado finiĝis ( vidu la mapo-sekcion ).

// ⟪ Ekfunkciigo 📃 ⟫
animacii();
