// ≺⧼ ឧបករណ៍ពិនិត្យ ( ទិន្នន័យ ) 🔬 ⧽≻
import * as THREE from "three";
import { konstruiArbaron } from "../../eskekoj/shalaj-specioj/vegetajxo/betuloj/arbaro.js";
import { konstruiLarikon } from "../../eskekoj/shalaj-specioj/vegetajxo/larikoj.js";
import { konstruiFilikojn } from "../../eskekoj/shalaj-specioj/vegetajxo/filikoj.js";
import { konstruiPurpurajnPlantojn, konstruiPurpurajnFilikojn, konstruiAltajnPurpurajnFilikojn } from "../../eskekoj/shalaj-specioj/vegetajxo/purpuraj.js";
import { konstruiHxsxaksxlefojn } from "../../eskekoj/shalaj-specioj/vegetajxo/hxsxaksxlefo.js";
import { konstruiPussxlefojn } from "../../eskekoj/shalaj-specioj/vegetajxo/pussxlefo.js";
import { konstruiMetitanRokon, konstruiLikenSxtonojn } from "../../eskekoj/shalaj-specioj/vegetajxo/rokoj.js";
import { konstruiLikenojn, konstruiTrunkajnLikenojn } from "../../eskekoj/shalaj-specioj/vegetajxo/likenoj.js";
import { konstruiMontajnSubkreskajxojn, konstruiLaganSubkreskajxojn } from "../../eskekoj/shalaj-specioj/vegetajxo/subkreskajxoj.js";
import { konstruiMusxajnMontetojn } from "../../eskekoj/shalaj-specioj/vegetajxo/muskoj.js";
import { konstruiFalintajnTrunkojn } from "../../eskekoj/shalaj-specioj/vegetajxo/falintaj-trunkoj.js";
import { konstruiCetkuojn, konstruiCakeojn } from "../../eskekoj/shalaj-specioj/vegetajxo/ekvizetoj.js";
import { konstruiHerbon } from "../../eskekoj/shalaj-specioj/vegetajxo/herbo/tufoj.js";
import type { ModelaSpecifo } from "./tipoj.js";

// ⟨ ឧបករណ៍ជំនួយសម្រាប់រុក្ខជាតិ និងថ្ម 📃 ⟩
export const nulaAlto = () => 0;
export const neniom = () => false;
// ⟨ កំណត់ការបែងចែកឱ្យជាប់ 📃 ⟩
export const nurApud = ( radiuso: number ) => ( x: number, z: number ): boolean => Math.hypot(x, z) > radiuso;
export const nurApudPunkto = ( cx: number, cz: number, radiuso: number ) => ( x: number, z: number ): boolean => Math.hypot(x - cx, z - cz) > radiuso;
export const malproksimaAnkro = [ { x: 0o100, z: 0, h: 0, s: 1, r: 0 } ];
export const montaAlto = () => 0o24;
export const ankrArboj = [ { x: 0, z: 0, h: 0, s: 0o3/0o10 } ];
/* ដាក់ក្រុមនៅកណ្តាល គឺក្រុមទាំងមូលផ្លាស់ទីដូច្នេះចំណុចកណ្តាលនៃ
   គំរូស្ថិតលើដើមកំណើត ហើយគោលរបស់ពួកវានៅលើដី។
    @param grupo ( THREE.Object3D ) - ក្រុមដែលត្រូវដាក់នៅកណ្តាល។ */
export const centri = ( grupo: THREE.Object3D ): void => {
  grupo.updateMatrixWorld(true);
  const skatolo = new THREE.Box3().setFromObject(grupo);
  const centro = skatolo.getCenter(new THREE.Vector3());
  // ⟨ ហេតុអ្វីត្រូវរុញកូន មិនមែនក្រុម 📃 ⟩
  for ( const filo of grupo.children ) {
    filo.position.x -= centro.x;
    filo.position.y -= skatolo.min.y;
    filo.position.z -= centro.z;
  }
  grupo.updateMatrixWorld(true);
};

// ⟨ ប្រភេទទាំងឡាយ 📃 ⟩
export type Specio = ModelaSpecifo;
export const SPECOJ: Specio[] = [
  { kodo: "beroe", nomo: "Beroe 🥒", indekso: 0, grandeco: 0o12/0o10,
    akva: true,
    priskribo: "Ktenoforo sen tentakloj. Melonoforma ĝelo kun larĝa buŝo ĉe la malsupra poluso, la faringo kaj la stomako videblaj tra la travidebla korpo — la glutaĵo glutas aliajn kombulojn.",
    animacio: "Malrapida FORTA pulso ( la ĝelatena korpo larĝiĝas kaj mallarĝiĝas ), ok irizaj kombovicoj en metakrona ondo, kaj la buŝa lipo malfermiĝas je la fino de ĉiu kunpremo." },
  { kodo: "mnemiopsis", nomo: "Mnemiopsis 🍈", indekso: 1, grandeco: 0o12/0o10,
    akva: true,
    priskribo: "Larĝa, ronda marmukso kun DU grandaj buŝaj loboj ( eltruditaj platoj kun onda libera rando ) kaj kvar aŭrikloj, pli plata ol Beroe. Ĝiaj tentakloj estas reduktitaj, kiel ĉe plenkreskulo.",
    animacio: "Rapida milda pulso, la loboj malfermiĝas kaj fermiĝas kiel buŝo, kaj la etaj tentakloj treniĝas malantaŭen." },
  { kodo: "pleurobrakia", nomo: "Pleŭrobrakia 🍇", indekso: 2, grandeco: 0o12/0o10,
    akva: true,
    priskribo: "Globa margrozberujo — preskaŭ sfero — kun la statocisto sur la pinto, du ingoj sur la supra duono kaj du LONGEGAJ tentakloj kun flankaj tentiloj.",
    animacio: "Mezaj pulsoj; la du tentakloj sinuas malantaŭen, kaj la ingoj, la statocisto kaj la buŝa lipo sekvas la pulson de la korpo." },
  { kodo: "glacifiso", nomo: "Glacifiso 🐟", indekso: 3, grandeco: 0o12/0o10,
    akva: true,
    priskribo: "Travidebla kriofiŝo el la malvarmaj akvoj. Granda kapo, longa malalta dua dorsa naĝilo, anala naĝilo kaj larĝaj ventumilformaj brustaj naĝiloj.",
    animacio: "La korpo ondigas per tri-segmenta ĉeno, sed la fiŝo REMAS malrapide per la brustaj naĝiloj antaŭ la fundo." },
  { kodo: "marlaraksxo", nomo: "Marlaraksxo 🕷️", indekso: 4, grandeco: 0o12/0o10,
    akva: true,
    priskribo: "Eta mararaneo kun ok longegaj kruroj kaj ĥitina ŝelo ( segmentaj ringoj kaj tuberoj ). La korpo mem estas malgranda — la kruroj portas la specon, kaj ĉiuj ok piedoj kuŝas sur unu ebeno.",
    animacio: "Alterna metakrona paŝado: la kokso balaas la piedon ĉirkaŭ la vertikala akso de la besto kaj la genuo fleksiĝas dum la levo ( la piedo estas en la aero )." },
  // ⟨ រុក្ខជាតិ ស្លែ និងថ្ម 📃 ⟩
  { kodo: "betulo", nomo: "Betulo 🌳", indekso: -1, grandeco: 1,
    akva: false, konstruu: ( g ) => konstruiArbaron(g, [ { x: 0, z: 0, h: 0, s: 1 } ]),
    priskribo: "Paperbetulo — blanka trunko kun nigraj lentokeloj kaj radika larĝiĝo, kaj ovoforma krono el ok kusenoj, ĉiu sur videbla branĉo. En la koro de ĉiu kuseno sidas malhela, malregula kerno — ĝi estas la ombro inter la folioj, ne videblaĵo mem — kaj ĉirkaŭ ĝi sidas la unuopaj folioj: kartetoj kun la UNU-FOLIA teksaĵo ( segildenta rando, vejnoj, tigo ) kaj alphaTest, do ĉiu folio montras sian veran formon. Ĉiu kartono havas sian propran nuancon ( vertexColors ) kaj ruliĝas ĉirkaŭ sia propra longa akso, do la foliaro ne estas unutona.",
    animacio: "Neniu — la arboj staras senmove ( la plantoj ne havas animacion en la ludo )." },
  // ⟨ ដើមលើចំនួនបី 📃 ⟩
  { kodo: "lariko", nomo: "Lariko 🌲", indekso: -1, grandeco: 1,
    akva: false, konstruu: ( g ) => konstruiLarikon(g, [
      { x: -0o3/0o2, z: 0.4, h: 0, s: 0.45 },
      { x: 0o1/0o10, z: -0o1/0o2, h: 0, s: 0.72 },
      { x: 1.7, z: 0.3, h: 0, s: 1 }]),
    priskribo: "Alpa lariko — griza trunko kun radika larĝiĝo, kelkaj sekaj nudaj branĉetoj sur la malsupra trunko, kaj aŭtuna orflava pinglaro: 3–4 tavoloj de konusaj spajroj el pinglaj ventumiloj. La specio havas FORTAN alton-hazardon ( 1.4–9.8 unuoj, do malgrandaj inter plenkreskuloj ), kaj la trunko kaj la krono skalas kun la alto — la ilo montras tri el ili.",
    animacio: "Neniu — la arboj staras senmove ( la plantoj ne havas animacion en la ludo )." },
  { kodo: "hxsxak", nomo: "Ĥŝakŝlefo 🥬", indekso: -1, grandeco: 1,
    akva: false, konstruu: ( g ) => konstruiHxsxaksxlefojn(g, [ { x: 0, z: 0, h: 0, s: 1 } ]),
    priskribo: "Purpura laktukarbo — alta trunko kun 3–5 tavoloj da kvar grandaj kurbiĝintaj folioj. Ĉiu tavolo havas ŝelan TASON, kiu malfermiĝas supren kaj eksteren; la folioj leviĝas el la interno de la taso, kaj la malsupraj folioj de ĉiu tavolo restas pli mallongaj kaj pli proksime al la trunko. SUPER la lasta folia tavolo la planto finiĝas per PINTA KRONO de kvar foliaj tavoloj, kiuj MALGRANDIĜAS supren ĝis malgranda burĝono de junaj folioj; la lasta tavolo sidas ĝuste sur la pinto de la trunko, kiu mem rondiĝas en konuseton anstataŭ finiĝi per plata tranĉa disko.",
    animacio: "Neniu — la plantoj staras senmove ( la plantoj ne havas animacion en la ludo )." },
  { kodo: "pussx", nomo: "Pussxlefo 🌿", indekso: -1, grandeco: 1,
    akva: false, konstruu: ( g ) => konstruiPussxlefojn(g, [ { x: 0, z: 0, h: 0, s: 1 } ]),
    priskribo: "Filikeca eta Ĥŝakŝlefo — mallonga purpura trunko, 1–2 tavoloj de la samaj laktukaj folioj kaj unu ŝela taso ĉe la unua tavolo. La taso altas 20% de la planto, do ĝi ne kaŝas la foliojn. La planto finiĝas per tri pinta-kronaj tavoloj, kiuj malgrandiĝas supren ĝis burĝono sur la rondigita trunkopinto — ne per nuda stango nek per plata disko. Ĝiaj travideblaj manĝeblaj beroj kreiĝas aparte ( mangxajxoj.ts ).",
    animacio: "Neniu — la plantoj staras senmove ( la plantoj ne havas animacion en la ludo )." },
  { kodo: "filiko", nomo: "Filiko 🌿", indekso: -1, grandeco: 1,
    akva: false, konstruu: ( g ) => konstruiFilikojn(g, 1, nulaAlto, [], [], neniom, neniom),
    priskribo: "Vala filiko — VERA tri-dimensia rozeto da 9 ARKAJ FRONDOJ ( ne plu du krucitaj kartoj ). Ĉiu frondo estas rubando kun levita mezo-ripo kaj la filika teksturo: unu PINATA frondo kun 28 paroj da lobetaj pinnoj, malhelaj randaj strekoj kaj mezvejnetoj. La frondoj leviĝas el la grundo, malfermiĝas eksteren kaj iliaj pintoj malleviĝas sub la propra pezo. La ilo montras UNU specimenon ( la ludo metis centojn ).",
    animacio: "Neniu — la plantoj staras senmove." },
  { kodo: "purpuraFiliko", nomo: "Purpura filiko 🪻", indekso: -1, grandeco: 1,
    akva: false, konstruu: ( g ) => konstruiPurpurajnFilikojn(g, 1, nulaAlto, neniom, neniom, neniom),
    priskribo: "Pli alta purpura filiko el la periferio de la arbaro — VERA tri-dimensia rozeto da 11 ARKAJ FRONDOJ ( ne plu kvar krucitaj ebenoj ), kun la purpura pinata fronda teksturo kaj pli granda skalo ol la vala filiko.",
    animacio: "Neniu — la plantoj staras senmove." },
  { kodo: "purpuraPlanto", nomo: "Purpura planto 🪻", indekso: -1, grandeco: 1,
    akva: false, konstruu: ( g ) => konstruiPurpurajnPlantojn(g, 1, nulaAlto, neniom, neniom, neniom),
    priskribo: "Densa malalta purpura planto — la plej eta el la purpuraj plantoj, kiu randas la arbaron kaj la herbejon.",
    animacio: "Neniu — la plantoj staras senmove." },
  { kodo: "altaPurpuraFiliko", nomo: "Alta purpura filiko 🌴", indekso: -1, grandeco: 1,
    akva: false, konstruu: ( g ) => konstruiAltajnPurpurajnFilikojn(g, 1, nulaAlto, neniom, neniom, neniom),
    priskribo: "La plej alta purpura filiko — trunko kun fronda krono ( tri malsamaj kronaj formoj en la mondaj grupoj ).",
    animacio: "Neniu — la plantoj staras senmove." },
  { kodo: "herbo", nomo: "Herbo 🌱", indekso: -1, grandeco: 1,
    akva: false, konstruu: ( g ) => konstruiHerbon(g, 1, nulaAlto, neniom, neniom, neniom),
    priskribo: "Herba tufo — TRI kartoj je 60° ( du lasus videblan malplenan randon de 45° ) kun la herba teksturo: ~60 maldikaj, klinitaj klingoj, kelkaj sekaj flavaj inter ili kaj mola radika ombro. Ĉiu tufo ankaŭ ricevas propran klinon kaj malregulan alton. La ilo montras UNU tufon ( la ludo metis milojn ).",
    animacio: "Neniu — la plantoj staras senmove." },
  { kodo: "musxo", nomo: "Muska monteto 🟢", indekso: -1, grandeco: 1,
    akva: false, konstruu: ( g ) => konstruiMusxajnMontetojn(g, 1, nulaAlto, [], neniom, neniom),
    priskribo: "Muska monteto — kovrilo el centoj da fleksitaj musko-fadenoj ( pli longaj meze ), kiuj formas molan kupolon sen glata baza kuseno.",
    animacio: "Neniu — la plantoj staras senmove." },
  { kodo: "falintaTrunko", nomo: "Falinta trunko 🪵", indekso: -1, grandeco: 1,
    akva: false, konstruu: ( g ) => konstruiFalintajnTrunkojn(g, 1, nulaAlto, [], neniom, neniom),
    priskribo: "Falinta betula trunko — kuŝas sur la grundo, kun la betula ŝelo kaj la branĉaj stumpoj. Ĝi ankaŭ servas kiel ankro por la trunkaj likenoj.",
    animacio: "Neniu — la plantoj staras senmove." },
  { kodo: "cetkuo", nomo: "Cetkuo ( ekvizeto ) 🌾", indekso: -1, grandeco: 1,
    akva: false, konstruu: ( g ) => konstruiCetkuojn(g, 1, nulaAlto, nulaAlto, neniom, neniom),
    priskribo: "Kavalerbo ( Equisetum praealtum ) — vertikala kano el 11 segmentoj kun OK profundaj ripoj, okdentaj ingoj ĉe la nodoj ( unu dento po ripo, kiel ĉe vera ekvizeto ) kaj skvama strobilo ĉe la pinto. La tuta planto saltas per UNU uniforma skalo, do la ripoj, la ingoj kaj la dentoj tenas siajn proporciojn je ĉiu grandeco.",
    animacio: "Neniu — la plantoj staras senmove." },
  { kodo: "cakeo", nomo: "Cakeoj 🪷", indekso: -1, grandeco: 1,
    akva: false, konstruu: ( g ) => konstruiCakeojn(g, 1, nulaAlto, 0, 0, () => 6, nulaAlto, neniom, neniom),
    priskribo: "Cakeoj ( Equisetum telmateia ) — la granda ĉevalvosto de la lagaj randoj: kanaj tigoj kun ingoj, el kiuj ĉe ĉiu nodo eliras kirlo da BRANĈETOJ. Ĉiu branĉeto havas DU segmentojn — ĝi eliras preskaŭ horizontale, leviĝas ĉe sia pinto, kaj portas malgrandan artikon meze — kaj la kirloj estas plej longaj meze de la tigo, kiel ĉe la vera specio.",
    animacio: "Neniu — la plantoj staras senmove." },
  { kodo: "lagajPlantoj", nomo: "Lagaj subkreskaĵoj 🐸", indekso: -1, grandeco: 1,
    akva: false,
    konstruu: ( g ) => konstruiLaganSubkreskajxojn(g, 0o30, nulaAlto, 0, 0, () => 6,
      nulaAlto, ankrArboj, ankrArboj, nurApud(0o6), neniom, neniom),
    priskribo: "La miksajxo de malaltaj plantoj ĉirkaŭ la lago — deko da formoj kun malsamaj folioj kaj teksturoj, ĉiu en sia propra instancomesho. La ilo montras malgrandan makulon el la miksaĵo ( la ludo metis milojn ).",
    animacio: "Neniu — la plantoj staras senmove." },
  { kodo: "montajPlantoj", nomo: "Montaj subkreskaĵoj ⛰️", indekso: -1, grandeco: 1,
    akva: false, konstruu: ( g ) => konstruiMontajnSubkreskajxojn(g, 0o40, montaAlto,
      malproksimaAnkro, malproksimaAnkro, nurApudPunkto(0o100, 0, 0o10), neniom, neniom),
    priskribo: "La alpaj malaltaj plantoj — sekaj tufoj kaj malgrandaj arbustoj inter la montaraj rokoj kaj la Pussxlefoj. La ilo montras grupon da ili ( la ludo metis milojn ).",
    animacio: "Neniu — la plantoj staras senmove." },
  { kodo: "likenoj", nomo: "Grundaj likenoj 🫧", indekso: -1, grandeco: 1,
    akva: false, konstruu: ( g ) => konstruiLikenojn(g, 0o24, nulaAlto, malproksimaAnkro, [],
      nurApudPunkto(0o100, 0, 0o10), neniom, false),
    priskribo: "TRI likenaj formoj en unu specio — la arbusta ( frutikoza ), la plata folia ( krusta disko ) kaj la lana bisoida. La semo elektas la formon por ĉiu makulo, do la ilo montras plurajn makulojn de ĉiuj tri formoj.",
    animacio: "Neniu — la likenoj staras senmove." },
  { kodo: "likenSxtonoj", nomo: "Likenaj ŝtonoj 🪨", indekso: -1, grandeco: 1,
    akva: false, konstruu: ( g ) => konstruiLikenSxtonojn(g, 1, nulaAlto, neniom, neniom),
    priskribo: "Eta ŝtono kun verdeta ŝtona paletro — la kusenoj, ĉirkaŭ kiuj la grundaj likenoj grupigas sin.",
    animacio: "Neniu — la ŝtonoj staras senmove." },
  { kodo: "trunkajLikenoj", nomo: "Trunkaj likenoj 🍃", indekso: -1, grandeco: 1,    akva: false, konstruu: ( g ) => { const trunkoj = konstruiArbaron(g, [ { x: 0, z: 0, h: 0, s: 0o7/0o20 } ]); konstruiTrunkajnLikenojn(g, [ trunkoj ]); },
    priskribo: "La likenaj buloj sur la trunkoj — tuberaj kupoloj kun la likena teksturo kiel dekalono. La ilo montras ilin sur malgranda betula trunko, ĉar ili bezonas trunkon por sidi.",
    animacio: "Neniu — la likenoj staras senmove." },
  { kodo: "roko", nomo: "Roko 🪨", indekso: -1, grandeco: 1,
    akva: false, konstruu: ( g ) => konstruiMetitanRokon(g, 0, 0, nulaAlto, 1),
    priskribo: "Unu rokbloko — dudekedro kun unu subdivido ( okdek facoj ), kies verticoj estas ŝovitaj per GLATA ondaro de la direkto, do la ŝtono estas neregula sed rondigita, kiel rulita ŝtonego. La surfaco portas la propran ŝtonan teksturon ( eroj, fendoj, kvarco-vejnoj ) kaj la rilatan reliefon, kaj la instanca koloro restas preskaŭ blanka — la tono venas el la teksajxo.",
    animacio: "Neniu — la rokoj staras senmove." },
  { kodo: "montajRokoj", nomo: "Montaraj rokoj ⛰️", indekso: -1, grandeco: 1,
    akva: false,
    // ⟨ ហេតុអ្វីមិនប្រើឧបករណ៍សាងសង់បែងចែក 📃 ⟩
    konstruu: ( g ) => { konstruiMetitanRokon(g, -1.1, 0.4, nulaAlto, 0o12/0o20, 0, 0o7);
      konstruiMetitanRokon(g, 1.2, -0.9, nulaAlto, 0o15/0o20, 0, 0o40);
      konstruiMetitanRokon(g, 0o1/0o10, 1.3, nulaAlto, 0o1, 0, 0o71); },
    priskribo: "La rokblokoj de la alpa zono — TRIMALSAMAJ formoj ( tri semoj de la sama ondaro ), ĉiu kun sia propra ne-uniforma skalo, do la montaro ne montras la saman ŝtonon ripetitan.",
    animacio: "Neniu — la rokoj staras senmove." },
  { kodo: "petrelo", nomo: "Neĝopetrelo 🕊️", indekso: -1, grandeco: 0o4,
    akva: false, petrelo: true,
    priskribo: "Neĝopetrelo ( Pagodroma nivea ) — tute blanka marbirdo kun nigraj flugilpintoj, tubo-naza hokbeko kaj malhela lora makulo antaŭ la okuloj.",
    animacio: "Du-segmenta flugilo. la brako kaj la mano svingiĝas ĉe la vera kubuto, la pinto malfruas je kvarono de la bato ( la vipado ) kaj la vosto ventumas. La batoj venas en eksplodoj inter glitoj." },
];

