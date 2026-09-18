// ≺⧼ Natura inspektilo 🔬 ⧽≻ — la laborilo por la modeloj de la mondo: la
// bestoj kaj iliaj animacioj, la plantoj kaj la rokoj ( la kunulo de la terena
// skulptilo ). Ĉiu specio montriĝas SOLA, centre kaj kadrita — oni turnas kaj
// zumas per la muso, paŭzas la animacion por studi unu pozon, montras la
// pivotajn aksojn de la artikoj kaj la dratkadron de la geometrio, kaj legas la
// konstru-detalojn de la modelo ( la kvanton de la meshoj, de la trianguloj kaj
// de la instancoj — vidu la kunfandon en konstruiPetrelanMalneton ).
//
// La ilo UZAS la ludajn konstruilojn rekte ( la samajn funkciojn kiel la urbo ),
// do ĝi neniam devojiĝas de la ludo — kio aperas ĉi tie, tio aperas en la mondo.
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { konstruiMetitanBeston, gxisdatigiBestojn, konstruiMetitanPetrelon,
  gxisdatigiPetrelojn } from "../../assets/shalaj-specioj/bestoj.js";
import { konstruiArbaron, konstruiLarikon, konstruiHxsxaksxlefojn,
  konstruiPussxlefojn, konstruiMetitanRokon, konstruiFilikojn,
  konstruiPurpurajnPlantojn, konstruiPurpurajnFilikojn, konstruiAltajnPurpurajnFilikojn,
  konstruiHerbon, konstruiMusxajnMontetojn, konstruiFalintajnTrunkojn,
  konstruiCetkuojn, konstruiCakeojn, konstruiLaganSubkreskajxojn,
  konstruiMontajnSubkreskajxojn, konstruiMontajnRokojn, konstruiLikenojn,
  konstruiLikenSxtonojn, konstruiTrunkajnLikenojn } from "../../assets/shalaj-specioj/vegetajxo.js";

// ⟨ La helpiloj por la plantoj kaj la rokoj 📃 ⟩ — tiuj konstruiloj DISŜUTAS
// siajn specimenojn tra la tuta mondo laŭ hazarda semo ( kaj akceptas filtrilojn
// por riveroj, vojoj kaj biomoj ). Por la inspektilo oni donas al ili ebenan
// mondon ( alto 0 ), neniujn filtrilojn kaj malgrandan kvanton — kaj poste oni
// CENTRIGAS la grupon: la tuta grupo transloĝas tiel, ke la centro de la
// specimenoj staras super la origino kaj ilia bazo sur la grundo. Sen tio la
// modelo aperus ie ajn en la mondo ( ekzemple 200 unuojn norde ) kaj la kadro
// montrus malplenan herbejon.
const nulaAlto = () => 0;
const neniom = () => false;
// ⟨ Konfinu la disŝuton 📃 ⟩ — la disŝutaj konstruiloj ( likenoj, subkreskaĵoj )
// havas neniun arean parametron: ili disŝutas siajn specimenojn tra la tuta mondo
// laŭ la semo, do la ilo montris maldikajn makulojn dise de centoj da unuoj kaj
// la kadro aspektis malplena. La riveraj kaj vojaj filtriloj tamen estas
// demandataj por ĉiu kandidato, do filtrilo kiu rifuzas ĉion for de eta radiuso
// tenas la specimenojn en unu videbla makulo.
const nurApud = ( radiuso ) => ( x, z ) => Math.hypot( x, z ) > radiuso;
// La montaj subkreskaĵoj rifuzas ĉion ene de 16 unuoj de la monda centro ( tie
// estas la urbo ), do la ilo metas ANKRON malproksime — la konstruilo amasigas
// plejparton de la specimenoj ĉirkaŭ la ankrOJ, kaj la dua filtrilo tenas ilin
// en eta rondo ĉirkaŭ tiu ankro. Poste centri() reportas la tutan makulon al la
// origino, do la kadro montras ilin kiel unu grupon.
const nurApudPunkto = ( cx, cz, radiuso ) => ( x, z ) => Math.hypot( x - cx, z - cz ) > radiuso;
const malproksimaAnkro = [ { x: 0o100, z: 0, h: 0, s: 1, r: 0 } ];
// La montaj konstruiloj akceptas nur altajn lokojn ( super la arbolinio ), do
// ili bezonas alton super la limo — alie ili metus NENION kaj la kadro montrus
// malplenan grundon.
const montaAlto = () => 0o24;
// La likenoj kaj kelkaj subkreskajxoj bezonas ANKRojn ( arboj / ŝtonoj ) por
// grupigi sin. Unu eta ankro ĉe la origino sufiĉas por la inspektilo.
const ankrArboj = [ { x: 0, z: 0, h: 0, s: 0o3/0o10 } ];
const centri = ( grupo ) => {
  grupo.updateMatrixWorld(true);
  const skatolo = new THREE.Box3().setFromObject(grupo);
  const centro = skatolo.getCenter(new THREE.Vector3());
  // ⟨ Kial oni ŝovas la GEFILOJN, ne la grupon 📃 ⟩ — mezuriModelon provizore
  // nuligas la pozicion de la GRUPO antaŭ ol mezuri, do grupoŝovo malaperus en
  // la mezuro kaj la kadro centriĝus sur la malnova monda pozicio. La roko do
  // staris 280 unuojn for — la ekrano montris nur la ĉielon. La gefiloj portas
  // la saman ŝovon kaj restas sendependaj de la grupa pozicio.
  for ( const filo of grupo.children ) {
    filo.position.x -= centro.x;
    filo.position.y -= skatolo.min.y;
    filo.position.z -= centro.z;
  }
  grupo.updateMatrixWorld(true);
};

// ⟨ La specioj 📃 ⟩ — la kvin akvaj malnetoj de la besta modulo ( la indeksoj de
// konstruiMetitanBeston ), la neĝopetrelo ( kiu havas sian propran flugilon ),
// kaj la plantoj, la likenoj kaj la rokoj de vegetajxo.ts. La animacio-priskriboj
// venas de la animacia bloko de gxisdatigiBestojn; la plantoj kaj la rokoj ne
// havas animacion, do ili montras unu senmov­an momenton.
const SPECOJ = [
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
  // ⟨ La plantoj, la likenoj kaj la rokoj 📃 ⟩ — la samaj konstruiloj kiel la
  // urbo ( vegetajxo.ts ). Neniu el ili havas animacion, do la momento-regilo
  // ne movas ilin — sed la kadrigo, la pivotaj aksoj kaj la dratkadro funkcias
  // same kiel ĉe la bestoj, kaj la specimeno montriĝas sola kaj centre.
  // „konstruu“ ricevas malplenan grupon; la konstruilo aldonas siajn meshojn.
  { kodo: "betulo", nomo: "Betulo 🌳", indekso: -1, grandeco: 1,
    akva: false, konstruu: ( g ) => konstruiArbaron(g, [ { x: 0, z: 0, h: 0, s: 1 } ]),
    priskribo: "Paperbetulo — blanka trunko kun nigraj lentokeloj kaj radika larĝiĝo, kaj ovoforma krono el ok kusenoj, ĉiu sur videbla branĉo. En la koro de ĉiu kuseno sidas malhela, malregula kerno — ĝi estas la ombro inter la folioj, ne videblaĵo mem — kaj ĉirkaŭ ĝi sidas la unuopaj folioj: kartetoj kun la UNU-FOLIA teksaĵo ( segildenta rando, vejnoj, tigo ) kaj alphaTest, do ĉiu folio montras sian veran formon. Ĉiu kartono havas sian propran nuancon ( vertexColors ) kaj ruliĝas ĉirkaŭ sia propra longa akso, do la foliaro ne estas unutona.",
    animacio: "Neniu — la arboj staras senmove ( la plantoj ne havas animacion en la ludo )." },
  // ⟨ Tri larikoj 📃 ⟩ — la larika alto estas HAZARDA ( 1.4–9.8 unuoj ) kaj
  // ĝi decidas la trunk-larĝon kaj la kron-larĝon, do unu sola specimeno
  // montrus nur unu el la kazoj. La ilo starigas tri: junan, mezan kaj
  // plenkreskan, kun la sama spektro, kiun la larikaro de la mondo montras.
  { kodo: "lariko", nomo: "Lariko 🌲", indekso: -1, grandeco: 1,
    akva: false, konstruu: ( g ) => konstruiLarikon(g, [
      { x: -1.5, z: 0.4, h: 0, s: 0.45 },
      { x: 0.1, z: -0.5, h: 0, s: 0.72 },
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
    // ⟨ Kial ne la disŝuta konstruilo 📃 ⟩ — konstruiMontajnRokojn rifuzas ĉiun
    // lokon ene de 72 unuoj de la monda centro ( tie estas la urbo ), do filtrilo
    // ne povus teni la rokojn apud la origino. La ilo do starigas la TRIAJN
    // formojn mem, unu post la alia, ĉe eta rondo — la samaj semoj kiel la tri
    // instancomeshoj de la mondo ( 0o7, 0o40, 0o71 ).
    konstruu: ( g ) => { konstruiMetitanRokon(g, -1.1, 0.4, nulaAlto, 0o12/0o20, 0, 0o7);
      konstruiMetitanRokon(g, 1.2, -0.9, nulaAlto, 0o15/0o20, 0, 0o40);
      konstruiMetitanRokon(g, 0.1, 1.3, nulaAlto, 0o1, 0, 0o71); },
    priskribo: "La rokblokoj de la alpa zono — TRIMALSAMAJ formoj ( tri semoj de la sama ondaro ), ĉiu kun sia propra ne-uniforma skalo, do la montaro ne montras la saman ŝtonon ripetitan.",
    animacio: "Neniu — la rokoj staras senmove." },
  { kodo: "petrelo", nomo: "Neĝopetrelo 🕊️", indekso: -1, grandeco: 0o4,
    akva: false, petrelo: true,
    priskribo: "Neĝopetrelo ( Pagodroma nivea ) — tute blanka marbirdo kun nigraj flugilpintoj, tubo-naza hokbeko kaj malhela lora makulo antaŭ la okuloj.",
    animacio: "Du-segmenta flugilo. la brako kaj la mano svingiĝas ĉe la vera kubuto, la pinto malfruas je kvarono de la bato ( la vipado ) kaj la vosto ventumas. La batoj venas en eksplodoj inter glitoj." },
];

// ⟨ La sceno 📃 ⟩ — malgranda studia ĉambro. La ĉielo estas simpla koloro, la
// grundo estas eta ebeno sub la besto kaj la lumoj estas tri — la ĉiela, la
// suna ( kun ombroj, kiuj montras la formojn ) kaj kontraŭa malvarma plenigo.
const sceno = new THREE.Scene();
sceno.background = new THREE.Color(0x2e3f4a);

const kanvaso = document.getElementById("bestoVido");
const bildilo = new THREE.WebGLRenderer({ canvas: kanvaso, antialias: true });
bildilo.shadowMap.enabled = true;
bildilo.shadowMap.type = THREE.PCFShadowMap;

const fotilo = new THREE.PerspectiveCamera(0o50, 1, 0o1/0o20, 0o4000);
const regiloj = new OrbitControls(fotilo, kanvaso);
regiloj.enableDamping = true;
regiloj.autoRotate = true;
regiloj.autoRotateSpeed = 0o3/0o2;

const cxielaLumo = new THREE.HemisphereLight(0xe0f0f8, 0x50705a, 0o17/0o10);
sceno.add(cxielaLumo);
const sunlumo = new THREE.DirectionalLight(0xfff4e0, 0o16/0o10);
sunlumo.position.set(0o6, 0o11, 0o5);
sunlumo.castShadow = true;
sunlumo.shadow.mapSize.set(0o1000, 0o1000);
// ⟨ La ombra bias 📃 ⟩ — la kruroj de la marlaraksxo estas tre MALDIKAJ, do la
// ombra mapo de la lumo trafis siajn proprajn surfacojn kaj desegnis mallumajn
// triangulojn ĉe la genuoj ( „shadow acne“ ). La bias kaj la normala bias
// proksimigas la komparon al la surfaco mem.
sunlumo.shadow.bias = -0o1/0o2000;
sunlumo.shadow.normalBias = 0o1/0o100;
const ombraDuono = 0o30;
sunlumo.shadow.camera.left = -ombraDuono;
sunlumo.shadow.camera.right = ombraDuono;
sunlumo.shadow.camera.top = ombraDuono;
sunlumo.shadow.camera.bottom = -ombraDuono;
sunlumo.shadow.camera.near = 0o1/0o2;
sunlumo.shadow.camera.far = 0o100;
sunlumo.shadow.camera.updateProjectionMatrix();
sceno.add(sunlumo);
sceno.add(sunlumo.target);
const kontrauxLumo = new THREE.DirectionalLight(0xa8c0d8, 0o7/0o10);
kontrauxLumo.position.set(-0o7, 0o4, -0o6);
sceno.add(kontrauxLumo);

// La akva ebeno — travidebla surfaco je y = 0. La akvaj bestoj flosas ĝuste
// ĉe ĝi ( la supro de la korpo restas super la akvo ), do oni vidas ilin de
// sube kaj de supre samtempe, kiel en la lago.
const akvaMaterialo = new THREE.MeshStandardMaterial({
  color: 0x30708c, transparent: true, opacity: 0o3/0o10, roughness: 0o1/0o4,
  metalness: 0, side: THREE.DoubleSide, depthWrite: false,
});
const akvaEbeno = new THREE.Mesh(new THREE.PlaneGeometry(0o400, 0o400), akvaMaterialo);
akvaEbeno.rotation.x = -Math.PI / 2;
akvaEbeno.renderOrder = 1;
sceno.add(akvaEbeno);

// La grundo — malhela ebeno sub la besto, kiu ricevas la ombron. Ĝi moviĝas
// suben laŭ la modelo ( vidu kadrigi ), do ĝi restas ĝuste sub la piedoj.
const grundoMaterialo = new THREE.MeshStandardMaterial({ color: 0x2a3a34, roughness: 1 });
const grundo = new THREE.Mesh(new THREE.PlaneGeometry(0o400, 0o400), grundoMaterialo);
grundo.rotation.x = -Math.PI / 2;
grundo.receiveShadow = true;
sceno.add(grundo);

// La krado — la sama grando kiel la grundo, por mezuri la modelojn.
const krado = new THREE.GridHelper(0o100, 0o40, 0x587068, 0x384a44);
krado.position.y = 0o1/0o100;
sceno.add(krado);

// ⟨ La stato 📃 ⟩ — la nuna specio, la modelo, la animacia sistemo kaj la
// tempokalkulo.
let specio = SPECOJ[0];
let modelo = null;
let animacio = null;       // la { bestoj } / { petreloj } objekto de la update-funkcio
let tempo = 0;             // la animacia tempo ( sekundoj )
let pauxzita = false;
let rapido = 1;
let pivotojMontritaj = false;
let dratoMontrita = false;
// La nuna kameraa angulo ĉirkaŭ la celo — la videblaj butonoj uzas ĝin, kaj la
// aŭtomata turno ĝin sekvas ( la turno skribas rekte al la kamerao ).
let vidAngulo = Math.PI / 0o4;
let vidKlino = 0o3/0o10;
let kadraDistanco = 0o1;
let zomaFaktoro = 0o1;
// La lasta pozicio de la fluganta petrelo — la fremo moviĝas per la diferenco
// ( vidu la buklon ).
const lastaBirdaPozicio = new THREE.Vector3();

// kreiModelon — Konstruu la nunan specion el la ludaj konstruiloj kaj aldonu
// ĝin al la sceno.
//     @returns La grupo de la modelo ( aŭ null se la konstruado malsukcesis ).
function kreiModelon() {
  // ⟨ La plantoj kaj la rokoj 📃 ⟩ — tiuj konstruiloj aldonas siajn meshojn
  // rekte al la sceno ( ili ne havas propran grupon ), do la ilo donas al ili
  // NOVAN grupon kiel "scenon". Tiel la modelo estas unu objekto, kiun la ilo
  // povas forigi, mezuri kaj kadrigi per la samaj funkcioj kiel la bestoj —
  // sed la grupo mem devas ankaŭ eniri la scenon.
  if ( specio.konstruu ) {
    const grupo = new THREE.Group();
    specio.konstruu(grupo);
    centri(grupo);
    sceno.add(grupo);
    animacio = null;
    return grupo;
  }
  if ( specio.petrelo ) {
    const petrelo = konstruiMetitanPetrelon(sceno, 0, 0, () => 0, 0o4, specio.grandeco);
    if ( !petrelo ) return null;
    // La flugalto estas hazarda en la ludo ( la birdo sekvas la terenon sub si )
    // — ĉi tie ĝi fiksiĝas, por ke la birdo restu en la sama kadro ĉiun fojon.
    // La flugcirclo estas malgranda, do la birdo restas granda en la kadro kaj
    // la kliniĝo en la turnoj klare videblas.
    petrelo.bazaY = 0o6;
    petrelo.flugY = 0o6;
    petrelo.alto = 0o4;
    // La hazardaj fazoj fiksiĝas — la birdo ekflugas ĉiam sam-direkte, do la
    // vidpunktoj „Antaŭo“ kaj „Flanko“ montras la saman flankon ĉiun fojon
    // ( en la ludo la birdoj ja havas hazardajn fazojn ).
    petrelo.angulo = 0;
    petrelo.direkto = 1;
    petrelo.phase = 0;
    petrelo.batoFazo = 0;
    animacio = { petreloj: [ petrelo ], altecoFn: () => 0 };
    return petrelo.grupo;
  }
  const besto = konstruiMetitanBeston(sceno, specio.indekso, 0, 0, 0, specio.grandeco);
  if ( !besto ) return null;
  animacio = { bestoj: [ besto ], riverFn: () => 0, akvoYFn: () => 0 };
  return besto.grupo;
}

// mezuriModelon — La amplekso de la modelo ( la skatolo kaj ĝia centro ), kiel
// la kadrigo kaj la pivotaj aksoj bezonas ĝin. La kadro ampleksas la TUTAN
// animacian vojon, ne nur la nunan pozicion — la akvaj bestoj naĝas sian
// osciladon kaj la petrelo rondflugas la tutan cirklon.
//     @param grupo ( THREE.Object3D ) - La modelo.
//     @returns { centro, radiuso }.
function mezuriModelon(grupo) {
  // ⟨ Kial la mezuro malŝaltas la grupon 📃 ⟩ — la animacio skribas la pozicion
  // kaj la rotacion de la grupo ĈIUKADRE, do mezuro de la vivanta grupo sekvus
  // la naĝantan beston kaj la besto dancus tra la kadro. La mezuro do okazas en
  // la PROPRA spaco de la modelo ( la grupo provizore revenas al la origino ),
  // kaj la animacia vojo aldoniĝas poste el la datumoj de la animacia sistemo.
  const sxparitaPozicio = grupo.position.clone();
  const sxparitaRotacio = grupo.rotation.clone();
  grupo.position.set(0, 0, 0);
  grupo.rotation.set(0, 0, 0);
  grupo.updateMatrixWorld(true);
  const skatolo = new THREE.Box3().setFromObject(grupo);
  const mezo = skatolo.getCenter(new THREE.Vector3());
  let radiuso = Math.max(0o1/0o2, skatolo.getSize(new THREE.Vector3()).length() * 0o1/0o2);
  grupo.position.copy(sxparitaPozicio);
  grupo.rotation.copy(sxparitaRotacio);
  grupo.updateMatrixWorld(true);
  const centro = mezo.clone();
  if ( specio.konstruu ) {
    // La planto aŭ la roko staras sur la grundo — la grupo estis centrita, do
    // la origino de la grupo estas la radika ebeno kaj la radiuso jam ampleksas
    // la tutan specimenon ( la InstancedMesh-oj raportas sian propran kadron al
    // THREE.Box3, do ĉiuj instancoj enkalkuliĝas ).
    return { centro, radiuso };
  }
  if ( specio.petrelo ) {
    // La fluganta birdo — la kadro sekvas GIN mem ( vidu la sekvan fremon en
    // la buklo ), ne la centron de la flugcirklo.
    centro.copy(animacio.petreloj[0].grupo.position);
    radiuso += 0o1/0o2;
  } else {
    // La besto naĝas laŭ la rivero — la kadro centru sur la ankro ( la origino
    // de la grupo, sen la naĝa oscilado ) kaj ampleksu la tutan osciladon.
    const b = animacio.bestoj[0];
    centro.y = ( b.nivelo ?? 0 ) + b.bazaY + mezo.y;
    radiuso += 0o1/0o4;
  }
  return { centro, radiuso };
}

// kadrigi — Metu la kameraon tiel, ke la tuta modelo plenigu la kadron, kaj
// sidigu la grundon sub la modelon.
//     @param grupo ( THREE.Object3D ) - La modelo.
function kadrigi(grupo) {
  const { centro, radiuso } = mezuriModelon(grupo);
  // ⟨ La kadra distanco 📃 ⟩ — la distanco devas respekti AMBAŬ vidangulojn. La
  // fenestro de la ilo estas mallarĝa kaj alta, do la HORIZONTALA vidangulo
  // estas multe pli malgranda ol la vertikala; antaŭe la kadro mezuris nur la
  // vertikalan, do larĝaj modeloj ( la marlaraksxo kun 1.6 unuoj da kruroj )
  // elitis la kadron flanke. Oni prenas la pli malgrandan duonvidangulon.
  const duonFov = THREE.MathUtils.degToRad(fotilo.fov * 0o1/0o2);
  const aspekto = ( kanvaso.clientWidth || 1 ) / ( kanvaso.clientHeight || 1 );
  const duonFovLargha = Math.atan(Math.tan(duonFov) * aspekto);
  const distanco = radiuso / Math.sin(Math.min(duonFov, duonFovLargha)) * 0o7/0o10;
  fotilo.aspect = aspekto;
  kadraDistanco = distanco;
  zomaFaktoro = 0o1;
  regiloj.target.copy(centro);
  fotilo.position.copy(centro).add(new THREE.Vector3(
    distanco * 0o3/0o10, distanco * 0o25/0o100, distanco));
  fotilo.near = Math.max(0o1/0o100, distanco / 0o100);
  fotilo.far = distanco * 0o10;
  fotilo.updateProjectionMatrix();
  regiloj.update();
  vidAngulo = Math.PI / 0o4;
  vidKlino = 0o3/0o10;
  // La grundo kaj la krado — ĝuste sub la modelo ( la fluganta petrelo restas
  // en la aero super la grundo, kiel en la mondo, kaj la plantoj staras sur
  // la origina ebeno de siaj konstruiloj ).
  const malsupro = ( specio.petrelo || specio.konstruu ) ? 0
    : centro.y - radiuso * 0o4/0o10 - 0o1/0o2;
  grundo.position.y = malsupro;
  krado.position.y = malsupro + 0o1/0o100;
  sunlumo.position.set(centro.x + ombraDuono * 0o3/0o10, malsupro + ombraDuono,
    centro.z + ombraDuono * 0o1/0o4);
  sunlumo.target.position.set(centro.x, malsupro, centro.z);
  sunlumo.target.updateMatrixWorld();
}

// ⟨ La pivotaj aksoj kaj la dratkadro 📃 ⟩ — la du laboriloj de la inspektilo.
// La aksoj sidas sur ĉiu NOMITA objekto de la modelo ( la grupoj kaj la partoj
// „flugilo“, „mano“, „vosto“, „genuo“ ... ), do ili montras la artikojn mem —
// tie, kie la animacio turniĝas.
//     @param grupo ( THREE.Object3D ) - La modelo.
//     @param radiuso ( number ) - La amplekso de la modelo ( la aksa grando ).
function montriPivotojn(grupo, radiuso) {
  const grando = Math.max(0o1/0o10, radiuso * 0o1/0o4);
  grupo.traverse((o) => {
    if ( !o.name || o.name === "__akso" ) return;
    const akso = new THREE.AxesHelper(grando);
    akso.name = "__akso";
    akso.material.depthTest = false;
    akso.material.transparent = true;
    akso.renderOrder = 0o2;
    o.add(akso);
  });
}

// forigiPivotojn — Forprenu la aksojn de ĉiu objekto.
function forigiPivotojn(grupo) {
  const forigitaj = [];
  grupo.traverse((o) => { if ( o.name === "__akso" ) forigitaj.push(o); });
  for ( const o of forigitaj ) o.parent.remove(o);
}

// metiVidon — Metu la kameraon en norman vidpunkton ĉirkaŭ la kadra celo. La
// distanco restas la kadra distanco, do la modelo ne ŝanĝas sian grandon — oni
// nur rigardas ĝin de alia flanko ( kaj la dratkadro kaj la pivotaj aksoj
// legiĝas multe pli facile de antaŭe kaj de supre ).
//     @param angulo ( number ) - La angulo ĉirkaŭ la vertikala akso ( rad ).
//     @param klino ( number ) - La levangulo super la horizonton ( rad ).
function metiVidon(angulo, klino) {
  if ( !modelo ) return;
  vidAngulo = angulo;
  vidKlino = klino;
  regiloj.autoRotate = false;
  document.getElementById("turnu").setAttribute("aria-pressed", "false");
  metiKameraon();
}

// metiKameraon — Metu la kameraon laŭ la nuna vid-angulo kaj la zoma faktoro.
function metiKameraon() {
  const c = regiloj.target;
  const distanco = kadraDistanco * zomaFaktoro;
  const horiz = Math.cos(vidKlino) * distanco;
  fotilo.position.set(c.x + Math.sin(vidAngulo) * horiz,
    c.y + Math.sin(vidKlino) * distanco, c.z + Math.cos(vidAngulo) * horiz);
  fotilo.updateProjectionMatrix();
  regiloj.update();
}

// zomo — Zomu per la donita faktoro ( la musa rado faras la samon, sed la
// butonoj donas ripeteblajn, egalajn paŝojn por la detalaj studoj — malgranda
// besto kiel la marlaraksxo bezonas proksimon por esti juĝata ).
//     @param faktoro ( number ) - Malpli ol 1 proksimigas, pli ol 1 malproksimigas.
function zomo(faktoro) {
  zomaFaktoro = Math.min(0o4, Math.max(0o1/0o4, zomaFaktoro * faktoro));
  metiKameraon();
}

// agordiDratojn — Ŝaltu la dratkadran vidon de ĉiuj materialoj de la modelo.
function agordiDratojn(grupo) {
  grupo.traverse((o) => {
    if ( !o.isMesh || !o.material ) return;
    const materialoj = Array.isArray(o.material) ? o.material : [ o.material ];
    for ( const m of materialoj ) m.wireframe = dratoMontrita;
  });
}

// gxisdatigiInformon — Plenigu la informan panelon por la nuna modelo.
//     @param grupo ( THREE.Object3D ) - La modelo.
function gxisdatigiInformon(grupo) {
  let meshoj = 0, trianguloj = 0, instancoj = 0, materialoj = new Set();
  grupo.traverse((o) => {
    if ( !o.isMesh ) return;
    meshoj++;
    // La instancigitaj meshoj ( la arboj, la folioj kaj la ŝelaj tasoj de la
    // plantoj ) desegnas sian geometrion multfoje — la instanca nombro montras
    // la veran koston, ne la kvanton de la unuopaj meshoj.
    if ( o.isInstancedMesh ) instancoj += o.count;
    const g = o.geometry;
    trianguloj += ( g.index ? g.index.count : g.attributes.position.count ) / 0o3;
    for ( const m of ( Array.isArray(o.material) ? o.material : [ o.material ] ) ) materialoj.add(m);
  });
  const nomo = document.getElementById("specoNomo");
  nomo.textContent = specio.nomo;
  document.getElementById("specoPriskribo").textContent = specio.priskribo;
  document.getElementById("specoDatumoj").innerHTML =
    "⟨ La animacio 📃 ⟩ " + specio.animacio + "<br>" +
    "⟨ La modelo 📃 ⟩ " + meshoj + " meshoj · " + trianguloj +
      " trianguloj · " + materialoj.size + " materialoj" +
      ( instancoj ? " · " + instancoj + " instancoj" : "" ) +
      ( specio.konstruu ? " · planto aŭ roko" : " · skalo " + specio.grandeco );
}

// elektiSpecio — Forigu la antaŭan modelon, konstruu la novan kaj kadrigu ĝin.
//     @param nova ( object ) - La specio el SPECOJ.
function elektiSpecio(nova) {
  if ( modelo ) {
    if ( pivotojMontritaj ) forigiPivotojn(modelo);
    sceno.remove(modelo);
    modelo = null;
  }
  specio = nova;
  pivotojMontritaj = false;
  document.getElementById("pivotoj").setAttribute("aria-pressed", "false");
  modelo = kreiModelon();
  if ( !modelo ) return;
  lastaBirdaPozicio.copy(modelo.position);
  akvaEbeno.visible = !!specio.akva && akvaMontrita;
  krado.visible = kradoMontrita;
  tempo = 0;
  bezonataGxisdatigo = true;
  kadrigi(modelo);
  if ( dratoMontrita ) agordiDratojn(modelo);
  gxisdatigiInformon(modelo);
  for ( const butono of document.querySelectorAll("#specaro button") ) {
    butono.setAttribute("aria-pressed", String(butono.dataset.kodo === specio.kodo));
  }
}

// ⟨ La butonoj 📃 ⟩ — la specia listo kaj la vidaj ŝaltiloj.
const specaro = document.getElementById("specaro");
for ( const s of SPECOJ ) {
  const butono = document.createElement("button");
  butono.textContent = s.nomo;
  butono.dataset.kodo = s.kodo;
  butono.setAttribute("aria-pressed", "false");
  butono.addEventListener("click", () => elektiSpecio(s));
  specaro.appendChild(butono);
}

let akvaMontrita = true;
let kradoMontrita = true;

// sxalti — La komuna traktilo de la ŝaltilaj butonoj ( la sama ŝablono kiel en
// la terena skulptilo — aria-pressed restas la sola stato ).
//     @param id ( string ) - La identigilo de la butono.
//     @param ago ( funkcio ) - La ago, kun la nova stato.
function sxalti(id, ago) {
  const butono = document.getElementById(id);
  butono.addEventListener("click", () => {
    const nova = butono.getAttribute("aria-pressed") !== "true";
    butono.setAttribute("aria-pressed", String(nova));
    ago(nova);
  });
}

let bezonataGxisdatigo = true;
sxalti("pauxzu", (n) => { pauxzita = n; bezonataGxisdatigo = true; });
sxalti("turnu", (n) => { regiloj.autoRotate = n; });
sxalti("akvo", (n) => { akvaMontrita = n; akvaEbeno.visible = n && specio.akva; });
sxalti("krado", (n) => { kradoMontrita = n; krado.visible = n; });
sxalti("drato", (n) => { dratoMontrita = n; if ( modelo ) agordiDratojn(modelo); });
sxalti("fono", (n) => {
  // La fono — la malhela studia fundo aŭ la hela akva fundo. La hela fono
  // montras la travideblajn ktenoforojn ( la gelatenaj korpoj malaperas sur la
  // malhela fundo ) kaj la siluetojn de la malhelaj partoj.
  sceno.background.set(n ? 0xdce6ec : 0x2e3f4a);
  grundoMaterialo.color.set(n ? 0x9fb0ab : 0x2a3a34);
  akvaMaterialo.color.set(n ? 0x88b4c8 : 0x30708c);
});
sxalti("pivotoj", (n) => {
  pivotojMontritaj = n;
  if ( !modelo ) return;
  const { radiuso } = mezuriModelon(modelo);
  if ( n ) montriPivotojn(modelo, radiuso); else forigiPivotojn(modelo);
});
document.getElementById("kadru").addEventListener("click", () => { if ( modelo ) kadrigi(modelo); });
// La kvar normaj vidpunktoj — antaŭo, flanko, supre ( kun eta klino, por ke la
// vertikalaj aksoj ne kaŝiĝu ) kaj la triona vido.
document.getElementById("vidAntauxo").addEventListener("click", () => metiVidon(0, 0o1/0o10));
document.getElementById("vidFlanko").addEventListener("click", () => metiVidon(Math.PI / 0o2, 0o1/0o10));
document.getElementById("vidSupre").addEventListener("click", () => metiVidon(Math.PI / 0o4, Math.PI / 0o2 - 0o15/0o100));
document.getElementById("vidSube").addEventListener("click", () => metiVidon(Math.PI / 0o2, -Math.PI / 0o2 + 0o15/0o100));
document.getElementById("zomoEn").addEventListener("click", () => zomo(0o3/0o4));
document.getElementById("zomoEl").addEventListener("click", () => zomo(0o4/0o3));

// La momenta regilo — legu unu pozicion de la animacio sen atendi ĝin ( la
// paŭzo kaj la regilo kune donas precizan studon de unu kadro de la ciklo ).
const momentoRegilo = document.getElementById("momento");
const momentoValoro = document.getElementById("momentoValoro");
momentoRegilo.addEventListener("input", () => {
  tempo = Number(momentoRegilo.value);
  momentoValoro.textContent = tempo.toFixed(0o1) + " s";
  bezonataGxisdatigo = true;
});

const rapidoRegilo = document.getElementById("rapido");
const rapidoValoro = document.getElementById("rapidoValoro");
// gxisdatigiRapidon — Legu la rapidan regilon kaj reskribu ĝian etikedon.
function gxisdatigiRapidon() {
  rapido = Number(rapidoRegilo.value);
  rapidoValoro.textContent = "× " + rapido;
}
rapidoRegilo.addEventListener("input", gxisdatigiRapidon);
gxisdatigiRapidon();

// ⟨ La buklo 📃 ⟩ — la animacio uzas la ABSOLUTAN tempon ( la ludaj
// update-funkcioj atendas ĝin ), do la paŭzo simple ĉesas antaŭenigi ĝin. La
// tempopaso venas de performance.now — la kadra limo gardas kontraŭ la grandaj
// valoroj de la unua kadro kaj de paŭzo.
let lastaTempo = performance.now();
function animacii() {
  requestAnimationFrame(animacii);
  const nun = performance.now();
  const dt = Math.min(0o1/0o10, ( nun - lastaTempo ) / 0o1000);
  lastaTempo = nun;
  if ( !pauxzita ) {
    tempo += dt * rapido;
    momentoRegilo.value = String(tempo % 0o10);
    momentoValoro.textContent = momentoRegilo.value + " s";
  }
  // ⟨ La paŭzo 📃 ⟩ — la petrela animacio AKUMULAS la flug-angulon kaj la alton
  // per la kadra tempopaso ( la dinamika ŝvebo bezonas ĝin ), do ĝi moviĝus ankaŭ
  // dum la paŭzo. La paŭzo tial tute ĉesas la ĝisdatigon — oni vidas UNU pozon,
  // kaj la momento-regilo alvokas la ĝisdatigon unufoje por la nova tempo.
  if ( animacio && ( !pauxzita || bezonataGxisdatigo ) ) {
    bezonataGxisdatigo = false;
    if ( animacio.petreloj ) {
      gxisdatigiPetrelojn(animacio, tempo);
      // ⟨ La sekva fremo 📃 ⟩ — la birdo rondflugas sian cirklon, do la kamerao
      // sekvas ĝin: la vido montras la petrelon, ne la malplenan centron de la
      // cirklo. Nur la celo moviĝas — oni turnas kaj zumas plu per la muso.
      if ( modelo ) {
        const delto = modelo.position.clone().sub(lastaBirdaPozicio);
        lastaBirdaPozicio.copy(modelo.position);
        regiloj.target.add(delto);
        fotilo.position.add(delto);
      }
    } else {
      gxisdatigiBestojn(animacio, tempo);
      // ⟨ La ankro 📃 ⟩ — la akvaj bestoj naĝas laŭ la rivero ( ±amplitudo laŭ
      // x kaj ±0.5 laŭ z ), do la besto forkurus el la fremo dum la zomo. La
      // ilo tenas ĝin ĉe la ankro — la vertikala bobado restas, do la pulso kaj
      // la paŝado montriĝas plene, sed la studata besto restas centre.
      if ( modelo ) { modelo.position.x = 0; modelo.position.z = 0; }
    }
  }
  if ( regiloj.autoRotate && !pauxzita ) {
    // La aŭtomata turno skribas rekte al la kamerao ( OrbitControls faras tion
    // mem, sed ĝi ne konas tion, ke ni montras la angulon al la uzanto ).
    vidAngulo = Math.atan2(fotilo.position.x - regiloj.target.x,
      fotilo.position.z - regiloj.target.z);
  }
  const w = kanvaso.clientWidth || 1, h = kanvaso.clientHeight || 1;
  if ( fotilo.aspect !== w / h ) { fotilo.aspect = w / h; fotilo.updateProjectionMatrix(); }
  bildilo.setSize(w, h, false);
  regiloj.update();
  bildilo.render(sceno, fotilo);
}

// ⟨ La hokoj 📃 ⟩ — por la konsolo de la retumilo. La ilo ne havas alian
// interfacon por demandi la nunan modelon, do tiuj ĉi referencoj permesas
// kontroli la scenon kaj la animacion permane ( kaj ripari la pozon de la
// modelo dum la studado ). Vidu la saman skemon en src/sperto.ts.
window.naturoInspektilo = {
  THREE, sceno, fotilo, regiloj, bildilo,
  modelo: () => modelo, animacio: () => animacio, tempo: () => tempo,
  specio: () => specio, serchi: ( nomo ) => ( modelo ? modelo.getObjectByName(nomo) : null ),
};

elektiSpecio(SPECOJ[0]);
animacii();
