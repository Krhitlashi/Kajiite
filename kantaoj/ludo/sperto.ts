// ≺⧼ Sperto 🎮 ⧽≻
// La orkestrilo de la ludo — la ĉefa buklo, la fotilo, la klavoj kaj la kunligo
// de ĉiuj moduloj ( la urbo, la akvo, la bestoj, la panelaĵoj kaj la retilo ).
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { kreiKanoton, Kanoto } from "../../eskekoj/medio/transporto.js";
import { VESTOJ } from "../../eskekoj/vestaro/vestoj.js";
import { konstruiFiguron } from "../../eskekoj/shalaj-specioj/homoj.js";
import type { Figuro } from "../../eskekoj/shalaj-specioj/homoj.js";
import { kreiRetilon } from "./retilo.js";
import { kreiMinimapon } from "../bildo/minimapo.js";
import { aplikiVacepu, kreiEfikojn } from "../fasado/efikoj.js";
import { kreiSargxilon } from "../fasado/sxargxo.js";
import { kreiPaneelojn, manĝaKlavo } from "../fasado/paneeloj.js";
import { kreiVestejon } from "../fasado/vestejo.js";
import { kreiEnigojn } from "../fasado/enigoj.js";
import { kreiMenuon } from "../fasado/menuo.js";
import { kreiRezimojn } from "./rezimoj.js";
import { kreiAnimacion } from "./animacio.js";
import { kreiLudanton } from "./ludanto.js";
import { kreiKanuanton } from "./kanuado.js";
import type { PiedaMondo } from "./piedirado.js";
import type { LitoInfo } from "./ludanto.js";


import { TIPARO } from "../../eskekoj/konstruajxoj/satalaj-konstruajxoj.js";
import { MangxajxItemo } from "../../eskekoj/mebloj/mangxajxoj.js";
import { kreiKolizianKradon } from "../mondo/kolizioj.js";
import { alteco, RIVERA_DUONLARĜO, cxuEnLago, RIVERA_NORDORIENTA_DUONLARĜO, skulptitaAkvo } from "../mondo/tereno.js";
import { aktivaMapo } from "../tero-datumaro/mapregulo.js";
import { kreiScenon, ScenaSistemo } from "../bildo/scena.js";
import { spacigiInstancojn, sekviVidlimon } from "../bildo/vidlimo.js";
import { kreiStatistikon } from "../fasado/statistiko.js";

// ⟪ La formo de la mondo 📃 ⟫ — la tereno de la ludo havas la formon de la aktiva
// mapo ( la cirklo, la rondigita kvadrato aŭ la rondigita triangulo ), do la
// promenaj limoj sekvas ĝin anstataŭ kvadraton.
const mapoDatumoj = aktivaMapo();
const mapoFormo = mapoDatumoj.formo;
const mapoGrandeco = mapoDatumoj.grandeco;
import type { UrbaSistemo } from "../mondo/urbo.js";
import { konstruiUrbon } from "../mondo/urbo.js";
import { traduki, konstruaĵaNomo } from "../lingvo/tradukoj.js";
import { sxaltiAŭdion, cxuAŭdio, sxaltiBruon, cxuBruo, sfx, rumble, autoKomenci, registriPostAŭdio } from "../../eskekoj/sonoj/sonoro.js";
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
const vinjeto = document.getElementById("vinjeto")!;
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

// ⟪ Frua bildigo 📃 ⟫ — la ĉielo, la montoj kaj la tereno jam ekzistas en la
// sceno antaŭ la urbo. Rendu ilin malantaŭ la glacia ŝarĝa kurtino ( la fono
// de la malklarigita vitro ) anstataŭ nigra kanvaso. La konstrua cedoj ( jesi )
// permesas al la retumilo pentri tiujn kadrojn inter la konstruaj sekcioj.
// La ĉefa buklo ( animacii ) ekas post la urbo kaj la mapo-bakado — cxi tiu
// malgranda frua buklo haltas tiam ( haltoFrua ).
// ⟨ Kina drift 📃 ⟩ — dum la sxargxo la fotilo orbitas malrapide ( 0o1/0o10
// radianoj po He ) ĉirkaŭ la urba centro ( la sanktejo ) kun subtila
// alta oscilo — kina enkonduko de la valo. Kiam la ĉefa buklo ekas, la
// Orbit-regiloj transprenas sen salto ( la drifta radiuso 0o110 kuŝas inter
// minDistance kaj maxDistance ).
let haltoFrua = false;
const fruaBildigo = () => {
  if ( haltoFrua ) return;
  // Regrandigu se la fenestro sxangxigxis dum la sxargxo ( turnado, regrandigo ).
  // Post setSize la komparo estas egala, do neniu rebufro okazas cxiukadre.
  const fruaRatio = Math.min(devicePixelRatio, maksimumaRatio);
  if ( kanvaso.width !== Math.floor(innerWidth * fruaRatio) || kanvaso.height !== Math.floor(innerHeight * fruaRatio) ) {
    fotilo.aspect = innerWidth / innerHeight;
    fotilo.updateProjectionMatrix();
    bildilo.setSize(innerWidth, innerHeight);
  }
  const angulo = ( performance.now() / 0o1000 ) * 0o1/0o10;
  fotilo.position.set(Math.cos(angulo) * 0o110, 0o30 + Math.sin(angulo * 0o1/0o2) * 0o4, Math.sin(angulo) * 0o110);
  fotilo.lookAt(0, 0o10, 0);
  bildilo.render(sceno, fotilo);
  requestAnimationFrame(fruaBildigo);
};
fruaBildigo();

const urbo: UrbaSistemo = await konstruiUrbon(sceno, dioritaMaterialo, andezitaMaterialo, eniraMaterialo, oraMaterialo, ( p ) => {
  // La ekstera <cab6tem2>-stango ( la ekstera stilfolio ) plenigas sian
  // ::before-on per la variablo --តេមិនី ( frakcio 0..1 ).
  stango.style.setProperty("--តេមិនី", `${Math.round(p * 0o144) / 0o144}`);
  const novaTitolo = p > 0o33/0o40 ? traduki("sxargxaNebulo") : p > 0o23/0o40 ? traduki("sxargxaTraboj") : p > 0o23/0o100 ? traduki("sxargxaSatalo") : null;
  if ( novaTitolo !== null && sxargxaTitolo.textContent !== novaTitolo ) {
    sxargxaTitolo.textContent = novaTitolo;
    aplikiVacepu();
  }
});
// La ceteraj sistemoj de la urbo ( la akvoj, la lampoj, la nebulo, la sxipo, la
// beroj ) apartenas al la animacia buklo — la orkestrilo donas la TUTAN urban
// sistemon al gxi per `mondo: urbo` sube.
const {
  konstruSpecoj, kolizioj, dokoKolizioj, selektajxoj,
  bestoj, petreloj, kanuoj, npcoj, internaSistemo,
} = urbo;
// La urbo kaj la bakita mapo estas pretaj — haltu la fruan bildigon ( la ĉefa
// buklo ekas ĉe la fino de la dosiero ).
haltoFrua = true;

// ⟪ Vidlimo — la bildiga distanco 📃 ⟫ — la mondo registriĝas ĉe la vidlimo
// ( kantaoj/bildo/vidlimo.ts ) tuj post la konstruado. La grandaj instancigitaj tavoloj
// ( la arbaroj, la herbo, la rokoj ) disdividiĝas laŭ spaca krado, do ĉiu peco
// havas propran limigan sferon: la vidkampo kaj la ombra fotilo povas forigi la
// pecojn ekster la vido, kaj la distanca limo forigas la malgrandajn detalojn
// antaŭ ol ili eĉ atingas la GPU-on. La vivantoj registriĝas per sia propra
// pozicio ( ili moviĝas ) — ilia per-kadra animacio preterlasas la kaŝitojn.
// Antaŭe la tuta arbaro ( miloj da instancoj ) kaj ĉiu figuro pasis tra la
// vertica shadero ĉiukadre, kvankam la nebulo kaŝas ĉion trans ~0o200 unuoj.
spacigiInstancojn(sceno);

// ⟪ GPU-varmigo 📃 ⟫ — Antaŭ la unua lud-kadro la bildilo devas kompili la
// shader-programojn ( la materialoj × la lumoj × la ombra pasumo ) kaj alŝuti
// la teksajxojn al la GPU. Three faras tion LAZE — je la unua fojo, kiam la
// materialo aperas en la vido — kaj ĝuste tio estas la "lag" de la unuaj
// He-oj: ĉiu nova materialo ( nova arba specio, la interno de konstruajxo, la
// akvo ) haltigas unu kadron por 0o1/0o20–0o34/0o100 He, ĝuste kiam la ludanto
// turnas la kapon aŭ eniras konstruajxon. La varmigo faras la saman laboron nun,
// sub la ŝarĝa ekrano ( ĝi ankoraŭ kovras la scenon ), anstataŭ dise tra la
// unuaj 0o200 He de la ludo. La tuta kosto estas unu plena kadro.
// ⟨ Kial malmultekosta 📃 ⟩ — la mondo KUNHAVAS la materialojn ( la kaŝmemoroj
// de la moduloj: materialon, konstruajxaMaterialo, sxovu ), do la programoj
// estas dekoj, ne centoj. La bakado de la mapo ( bakiMapon ) sekvas kaj ankaŭ
// desegnas la tutan mondon, do ĝi ne plu trovas malvarman bildilon.
// ⟨ La kialo de la griza kadro 📃 ⟩ — `compile` antaŭkompilas la ĉefan pasumon
// por ĈIU materialo de la sceno ( ankaŭ por la objektoj malantaŭ la fotilo aŭ
// forigitaj de la vidlimo ), sed ĝi ne kovras la OMBRAN pasumon — tiu havas
// sian propran programon por ĉiu materialo. La plena kadro kun la ombroj
// fermas tiun truon: la ombra programo kompiliĝas kaj la videblaj teksajxoj
// alŝutiĝas.
bildilo.compile(sceno, fotilo);
bildilo.shadowMap.needsUpdate = true;
bildilo.render(sceno, fotilo);

// La vivanta limo — 0o200 ( 128 ) unuoj. Pli ol la nebula videbleco ( la
// figuroj restu videblaj kiam ili alproksimiĝas el la nebulo ), malpli ol la
// tuta mondo.
const VIVANTA_LIMO = 0o200;
// ⟨ La ombra limo de la vivantoj 📃 ⟩ — 0o50 ( 40 ) unuoj. Ĉiu figuro
// konsistas el malmultaj meshoj ( la kapo, la vizaĝo, la du vestaj tavoloj, la
// kvar membroj, la manoj kaj la haroj — homoj.ts kunfandas ĉion, kio dividas
// materialon ) kaj markas ĈIUN el ili castShadow, do la
// NPC-oj estas la plej multaj objektoj de la ombra mapo ( ĉirkaŭ 0o1000 en la
// vido, pli ol la duono de ĉiuj ombro-kastantoj ). Pli malproksime ol 0o50
// unuoj la tero estas jam pli ol duone kovrita de la nebulo, do la ombro de la
// figuro apenaŭ videblas — sed ĝi kostis plenan desegnan alvokon. La sama limo
// validas por la kanuoj ( malgranda ombro sur la akvo ).
const VIVANTA_OMBRO = 0o50;
for ( const n of npcoj ) sekviVidlimon(n.group, VIVANTA_LIMO, 0o4, VIVANTA_OMBRO);
for ( const k of kanuoj ) sekviVidlimon(k.group, VIVANTA_LIMO, 0o4, VIVANTA_OMBRO);
for ( const b of bestoj.bestoj ) sekviVidlimon(b.grupo, VIVANTA_LIMO);
for ( const p of petreloj.petreloj ) sekviVidlimon(p.grupo, VIVANTA_LIMO);

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
  materialoj: { diorito: dioritaMaterialo, andezito: andezitaMaterialo, oro: oraMaterialo, eniro: eniraMaterialo },
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

// ⟪ La enigo 📃 ⟫ — la klavaro, la stirstango, la rigarda gesto, la
// telefonaj butonoj, la montra-seruro kaj la rado vivas en
// kantaoj/fasado/enigoj.ts. La orkestrilo donas al ili la ludanton ( la
// legilojn kaj la du movilojn de la fotilo ) kaj la agojn, kiujn ili vokas;
// ili redonas la klav-staton, kiun la mova buklo legas.

// salti — La salto ( Spaco aŭ la telefona butono ). La impuso kaj la forpuŝa
// sono; la sona forto sekvas la nunan promenan rapidon ( movoValoro ), do kure
// la forpuŝo kaj la aera ŝŝo estas pli laŭtaj ol de loko.
function salti(): void {
  if ( ludanto.rezimo !== "walk" || ludanto.surKanoto || !ludanto.estasSurTERENO ) return;
  ludanto.rapidoY = 0o74/0o10;
  ludanto.estasSurTERENO = false;
  if ( cxuAŭdio() ) sfx.jump(0o4/0o10 + 0o6/0o10 * ludanto.movoValoro);
}

// agaEskapon — La Escape-klavo fermas la plej supran malfermitan aferon.
// Kiam la PLENA MAPO estas malfermita, minimapo.fermi devas okupiĝi ( la nura
// .montri-forigo lasus la mapon malfermita kaj la kompaso rifuzus remalfermi ĝin ).
function agaEskapon(): void {
  if ( informo.classList.contains("montri") ) fermiInformon();
  else if ( vestaro.classList.contains("montri") ) vestejo.fermi();
  else if ( minimapo.cxuMalfermita() ) minimapo.fermi();
  else if ( ludanto.rezimo === "interior" ) { if ( ludanto.kuŝas ) leviĝi(); else eliriInternon(); }
}

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

// ⟪ Interagu (E-klavo) 📃 ⟫
function proviInterakti() {
  if ( ludanto.rezimo === "interior" ) {
    if ( ludanto.kuŝas ) { leviĝi(); return; }
    if ( ludanto.plejProksimaLito ) { kuŝiĝi(ludanto.plejProksimaLito); return; }
    if ( ludanto.plejProksimaManĝaĵo && !ludanto.plejProksimaManĝaĵo.dead ) { konsumi(ludanto.plejProksimaManĝaĵo); return; }
    eliriInternon(); return;
  }
  if ( ludanto.surKanoto ) {
    const exit = kanuanto.eliri(ludanto.surKanoto);
    ludanto.pozicio.set(exit.x, 0o155/0o100, exit.z);
    ludanto.surKanoto = null;
    promptoElemento.classList.remove("montri");
    montriTost(traduki("eliri"));
    return;
  }
  // En orbita reximo E movas la fotilon vertikale, do la pordo/kanuo
  // interago validas nur dum promenado (ne kun malnovaj statoj).
  if ( ludanto.plejProksimaPordo && ludanto.rezimo === "walk" ) {
    const bt = TIPARO[ludanto.plejProksimaPordo.type] || TIPARO.domo;
    eniriKonstruajxon(ludanto.plejProksimaPordo, bt, ludanto.aktivaPordaAngulo);
    return;
  }
  let plejProksima: Kanoto | null = null;
  let minDistanco = 6;
  for ( const c of kanuoj ) {
    const d = Math.hypot(c.x - ludanto.pozicio.x, c.z - ludanto.pozicio.z);
    if ( d < minDistanco ) { minDistanco = d; plejProksima = c; }
  }
  if ( plejProksima ) {
    ludanto.surKanoto = plejProksima;
    plejProksima.vx = plejProksima.vz = 0;
    promptoElemento.classList.remove("montri");
    montriTost(traduki("regiloKanuo"));
    if ( cxuAŭdio() ) sfx.splash();
  }
  // Pussxlefo-beroj — kolekti ( manĝi ) la beron funkcias same kiel manĝi la
  // manĝaĵojn en la interno. Nur dum promenado — en orbito E movas la fotilon.
  if ( ludanto.plejProksimaBero && !ludanto.plejProksimaBero.dead && ludanto.rezimo === "walk" ) {
    konsumi(ludanto.plejProksimaBero);
    return;
  }
}
// kuŝiĝi — Kuŝi sur la lito. La fotilo malaltigas al la tola, la kapo sur la
// kapkuseno ( +x loka ), rigardante la plafonon. La movado haltas ( la lito
// forigas la movan blokon en la animacia buklo ) ĝis la leviĝo.
function kuŝiĝi(l: LitoInfo): void {
  ludanto.kuŝas = true;
  ludanto.kuŝaStato = l;
  const specH0 = ludanto.elektitaSpec!.flugoY ?? ( ludanto.elektitaSpec!.h0 || 0 );
  // La kapo ripozas sur la kapkuseno ĉe la kapo-fino ( +x loka ). La korpo
  // kuŝas sur la tola ( supro je 0o3/0o10 ) — la fotilo estas iomete super gxi.
  const kapX = l.lokaX + l.largho / 2 - 0o3/0o10;
  ludanto.pozicio.set(
    l.specX + l.cosR * kapX - l.sinR * l.lokaZ,
    specH0 + l.y + 0o3/0o10,
    l.specZ + l.sinR * kapX + l.cosR * l.lokaZ
);
  // Rigardu la plafonon laŭ la longa akso de la lito ( al la piedo ).
  ludanto.direkto = Math.atan2(l.cosR, l.sinR);
  ludanto.klinigxo = 0o7/0o10;
  ludanto.estasSurTERENO = true;
  ludanto.rapidoY = 0;
  ludanto.celDistanco = 0;
  ludanto.kameraDistanco = 0;
  promptoElemento.classList.remove("montri");
  if ( cxuAŭdio() ) sfx.chime();
}
// leviĝi — Stari de la piedo de la lito, frontante la liton.
function leviĝi(): void {
  if ( !ludanto.kuŝaStato ) { ludanto.kuŝas = false; return; }
  const l = ludanto.kuŝaStato;
  ludanto.kuŝas = false;
  ludanto.kuŝaStato = null;
  const specH0 = ludanto.elektitaSpec!.flugoY ?? ( ludanto.elektitaSpec!.h0 || 0 );
  const piedX = l.lokaX - l.largho / 2 - 0o6/0o10;
  ludanto.pozicio.set(
    l.specX + l.cosR * piedX - l.sinR * l.lokaZ,
    specH0 + l.y,
    l.specZ + l.sinR * piedX + l.cosR * l.lokaZ
);
  ludanto.direkto = Math.atan2(-l.cosR, -l.sinR);
  ludanto.klinigxo = -0o1/0o20;
  ludanto.estasSurTERENO = true;
  ludanto.rapidoY = 0;
  promptoElemento.classList.remove("montri");
}
function konsumi(item: MangxajxItemo) {
  if ( !item || item.dead ) return;
  item.dead = true;
  const f = item.f, isFok = item.key.startsWith("fok"), m = item.mesh;
  const start = performance.now();
  // La animacio estas nuligebla — kiam la interno estas kasxita kaj reuzata,
  // la pendanta malkresko ne plu rajtas tuŝi la reaperantan mangxajxon.
  ( function ŝrumpi() {
    const t = ( performance.now() - start ) / 480;
    m.scale.setScalar(Math.max(0o1/0o2000, 1 - t));
    if ( t < 1 ) item.malkreska = requestAnimationFrame(ŝrumpi); else { m.visible = false; item.malkreska = null; }
  } )();
  if ( isFok ) sfx.crunch(); else sfx.sip();
  const foodKey = manĝaKlavo(f.key);
  // En aih la gustoj de la novaj manĝaĵoj estas provizore malplenaj — montru
  // la nomon sole anstataŭ la kruda traduka klavo.
  const flavoro = traduki(foodKey + "Flavor");
  montriTost("<i>" + traduki(foodKey) + "</i><br>" + ( flavoro === foodKey + "Flavor" ? "" : flavoro ));
  const fx = document.getElementById(isFok ? "fxVarma" : "fxMenta")!;
  fx.classList.remove("fxPulso");
  void fx.offsetWidth;
  fx.classList.add("fxPulso");
}

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
sxargxaElemento.classList.add("finita");
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
