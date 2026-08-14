// ≺⧼ Terena skulptilo 🔨 ⧽≻
// Staras ekster la ludo ( aparta paĝo en iloj/ ) kaj skulptas la terenon —
// montojn, la riveron, la lagon — kiel la TUTAN terenon ( la natura tavolo en
// tereno.ts estas plata ). La mapo montras nordon supre kaj orienton dekstren
// ( la sama orientiĝo kiel la minimapo de la ludo ). La savo skribas la
// rezulton rekte al src/tero-datumaro/, kiun la ludo legas kiel la teron.
// La biomo ( tereno.ts ) venas TUTE de la PENTRITA tavolo. akvo ( la masko )
// kaj la pentritaj montaro/valo/ebenaĵo/akvaj-plantoj/ekvizeto
// ( SKULPTA_BIOMOJ ) — NENIU deriva biomo. La biomo-ilo PENTRAS la biomon
// rekte sur la biomo-tavolon, kaj la tero mem NE sxangxigxas. La AKVAJ biomoj
// ( Akvaj plantoj 🌿, Ekvizeto 🌾 ) ekzistas nur sur la akvo — la peniko
// pentras ilin nur en akvaj ĉeloj, kaj la teraj biomoj neniam pentrigxas sur
// akvo. Aŭtomata forigas la pentraĵon cxiu loke — la loko revenas al nenio,
// same kiel loko sen datumoj. La besto-ilo ( Animaloj 🐾, paletro Akvaj bestoj
// 🐟, Petreloj 🕊️ aux NPC-oj 🧍 ) pentras la bestajn zonojn ( la SKULPTA_BESTOJ
// tavolo ) kiel BITOJ — ĉelo povas teni PLURAJN specojn samtempe, do pentri
// la duan sur la unua kombinas ilin. la akvaj bestoj naĝas nur en la pentritaj
// akvaj ĉeloj ( nur akvo ), la petreloj rondflugas super ajna pentrita ĉelo
// ( tero aux akvo ), la NPC-oj piediras nur sur la pentritaj teraj ĉeloj
// ( neniam akvo ). La SAMA ilo forvisxas — sxaltita per Forviŝi 🧽 en la
// paletro, la elektita specio forvisxigxas, la ceteraj restas ( malplena ĉelo
// = nenia besto ). La defaŭltaj lokoj estas bakitaj en la tavolon. La skulptilo montras la biomojn nur dum la biomo-ilo estas
// malfermita kaj la bestajn zonojn nur dum la besto-ilo estas malfermita — la
// besta vido montras NUR la elektitan specion. la montara biomo purpura, la
// vala blu-verda, la ebenaĵo pala helverda, la akvaj plantoj profunda
// blu-verda, la ekvizeto helverda, la nuda akvo sen nuanco, la akvaj-bestaj
// ĉeloj helbluaj, la petrelaj helaj ( kun Aŭtomata ambaŭ montrigxas ), kaj
// nenio aliloke. La akva peniko pentras la maskon kaj eltrancxas la basenon.
// La OBJEKTA ilo ( Objektoj 🎯 — langeto de la ilo-karto ) metas
// INDIVIDUAJN objektojn ( plantojn, bestojn, NPC-ojn ) cxe precizaj pozicioj
// kun ecoj. Gxi havas siajn proprajn sub-ilojn. Meti ➕ ( klako metas; klako
// proksime de metita objekto ELEKTAS gxin ), Movu ✋ ( trenu objekton sur la
// mapo aux la reliefo ) kaj Forigi 🗑️ ( klako forigas ). La panelo montras
// la vivajn koordinatojn de la kursoro, la x/z-enigojn por tajpi precizajn
// koordinatojn kaj la liston de metitaj objektoj ( SKULPTA_OBJEKTOJ ).
//
// Uzado. Kuru npm run dev kaj malfermu /iloj/tero-skulptilo.html
// Maldekstra klako + treno skulptas. Dekstra klako aŭ Shift + treno movas la
// vidon. La rado zomas. Duobla klako resendas la tutan vidon. La ilo Movigi ✋
// permesas treni la vidon per la maldekstra klako — en la 2D-mapo gxi movas
// la mapon, en la 3D-vido gxi turnas la fotilon. WASD aŭ la sagoklavoj movas
// la vidon ankaŭ per la klavaro ( en la 3D-vido Q/E supren/malsupren, Shift
// rapidigas; en la 2D-mapo +/- zomas ). La 3D-vido ( butono Vido ) permesas
// orbiti ( dekstra klako ), movi ( meza klako ) kaj skulpti rekte sur la
// reliefo ( maldekstra
// klako ). Savi skribas rekte al la dosiero per la File System Access API
// ( Chromium ); aliaj retumiloj ricevas elŝuton.
import { bazaAlteco, riveroZ, RIVERA_DUONLARĜO, LAGO_X, lagoZ, lagoRadio,
  cxuEnLago, cxuEnNordorientaRivero, akvaNivelo, riveroNordOrientaX } from "../src/tereno.js";
import { SKULPTA_PASO, SKULPTA_N, SKULPTA_ORIGINO,
  SKULPTA_DELTAJ } from "../src/tero-datumaro/krado.js";
import { SKULPTA_AKVA_NIVELO, SKULPTA_AKVA_MASKO } from "../src/tero-datumaro/akvo.js";
import { SKULPTA_BIOMOJ } from "../src/tero-datumaro/biomoj.js";
import { SKULPTA_BESTOJ } from "../src/tero-datumaro/bestoj.js";
// La cetera datumaro en siaj propraj dosieroj — la metitaj objektoj
// ( inkluzive la kanuojn kaj la spacosxipon ), la urboj kaj la vojoj/dokoj.
import { SKULPTA_OBJEKTOJ } from "../src/tero-datumaro/objektoj.js";
import { SKULPTA_URBOJ } from "../src/tero-datumaro/urboj.js";
import { SKULPTA_VOJOJ, SKULPTA_DOKOJ } from "../src/tero-datumaro/vojoj.js";
// La urba krado — la Krado-langeto montras kaj redaktas la saman kradon kiun
// la ludo konstruas el KradaArangxo ( src/krado.ts — pura modulo, komuna kun
// la testilo iloj/testoj/krado/urbo.ts ). kreiKradanPlanon donas la plenan
// planon ( konstruaĵoj, vojoj, spronoj ) kiel purajn datumojn por desegni;
// validiKradon kontrolas la redaktitan kradon.
import { kreiKradanPlanon, validiKradon, aldoniVojon, aldoniBlokon } from "../src/krado.js";
// La realaj konstruaĵoj de la ludo — la 3D-vido de la krado uzas la SAMAJN
// konstruantojn kiel la ludo ( konstruiSatalon ), ne kolorajn kestojn.
import { konstruiSatalon } from "../assets/konstruajxoj/satalaj-konstruajxoj.js";
// La realaj specoj de la ludo — la objekta ilo konstruas la VERAN 3D-aspekton
// de la metitaj objektoj ( samaj konstruantoj kiel la ludo ), por la 2D-bake
// ( kiel la plena mapo ) kaj la 3D-vido.
import { konstruiArbaron, konstruiLarikon, konstruiHxsxaksxlefojn, konstruiPussxlefojn,
  konstruiMetitanRokon, konstruiMetitanFilikon } from "../assets/shalaj-specioj/vegetajxo.js";
import { konstruiMetitanBeston, konstruiMetitanPetrelon } from "../assets/shalaj-specioj/bestoj.js";
import { kreiKanoton } from "../assets/medio/transporto.js";
import { konstruiKrasesxagxon } from "../assets/konstruajxoj/krasesxagxa-kosmosxipo.js";
import { konstruiHxeuxfojn } from "../assets/konstruajxoj/hxeuxfa-lampo.js";
import { konstruiKeuxfhxeso } from "../assets/mebloj/keuxfhxeso.js";
import { kreiOranMaterialon, kreiEniranMaterialon,
  kreiDioritanMaterialon, kreiAndezitanMaterialon } from "../assets/komunajxoj/materialoj.js";
// La veraj vojoj de la ludo — la 3D-vido de la mond-nivelaj vojoj uzas la
// SAMAjn dioritajn/andezitajn vojojn kiel la ludo ( konstruiVojojn ).
import { konstruiVojojn, konstruiPeriferiajnPlatformojn } from "../assets/medio/vojoj.js";
import { konstruiFiguron } from "../assets/shalaj-specioj/homoj.js";
import { VESTOJ } from "../assets/vestaro/vestoj.js";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// ════════════════════════ La skulpta krado ════════════════════════
const PASO = SKULPTA_PASO;
const N = SKULPTA_N;
const X0 = SKULPTA_ORIGINO[0], Z0 = SKULPTA_ORIGINO[1];
const deltoj = new Float32Array(N * N);       // deltoj en mondo-unuoj
const masko = new Uint8Array(N * N);          // pentrita akvo ( 0/1 )
const biomoj = new Uint8Array(N * N);         // pentrita biomo ( 0=aŭtomata, 1=montaro, 2=valo, 3=ebenaĵo, 4=akvaj-plantoj, 5=ekvizeto )
const bestoj = new Uint8Array(N * N);         // pentritaj bestaj zonoj ( 0=aŭtomata, 1=akvaj bestoj, 2=petreloj )
// Metitaj objektoj — la objekta ilo ( APARTA de la penikoj ) metas individuajn
// objektojn ( plantojn, bestojn, NPC-ojn ) cxe precizaj pozicioj kun ecoj.
let objektoj = [];               // { x, z, speco, skalo?, rotacio?, bestospeco?, radio?, vesto?, harstilo?, filikaSpeco? }
let objektaModo = false;         // ĉu la objekta ilo estas aktiva ( anstataŭ peniko )
let objektaIlo = "meti";         // la sub-ilo de la objekta ilo. meti ➕ / movigi ✋ / forigi 🗑️
let objektaTrenata = -1;         // indekso de la trenata objekto ( Movu ✋ )
let objektoAktiva = "betulo";    // la elektita speco
let elektitaObjekto = -1;        // indekso en la listo ( reliefigo sur la mapo )
const objektoProp = { skalo: 1, rotacio: 0, bestospeco: 0, radio: 4, vesto: 0, harstilo: 0, filikaSpeco: 0, stilo: 0 };
const OBJEKTO_SPECOJ = {
  betulo:       { nomo: "Betulo 🌳",     koloro: "#a8d8a8" },
  lariko:       { nomo: "Lariko 🌲",     koloro: "#68a868" },
  hxsxaksxlefo: { nomo: "Ĥŝakŝlefo 🥬", koloro: "#b880d0" },
  pussxlefo:    { nomo: "Pussxlefo 🌱",  koloro: "#d8b0e8" },
  roko:         { nomo: "Roko 🪨",       koloro: "#a0a0a0" },
  filiko:       { nomo: "Filiko 🌿",     koloro: "#70c870" },
  akvabesto:    { nomo: "Akva besto 🐟", koloro: "#80d0e8" },
  petrelo:      { nomo: "Petrelo 🕊️",   koloro: "#e8e8e8" },
  npco:         { nomo: "NPC 🧍",        koloro: "#e0b070" },
  sanktejo:     { nomo: "Sanktejo 🛕",   koloro: "#184038" },
  turo:         { nomo: "Turo 🏢",       koloro: "#205040" },
  domo:         { nomo: "Domo 🏠",       koloro: "#184838" },
  mangxejo:     { nomo: "Manĝejo 🍽️",   koloro: "#584028" },
  kasafeo:      { nomo: "Kasafeo 🏛️",   koloro: "#d8c898" },
  stacio:       { nomo: "Stacio 🚀",     koloro: "#c8c8c8" },
  hxeuxfo:      { nomo: "Lampo 🏮",      koloro: "#d8b068" },
  hxeuxfoPlato: { nomo: "Lampo kun plato 🏮", koloro: "#b8c8c8" },
  keuxfhxeso:   { nomo: "Keŭfĥeso ⭐",   koloro: "#60a0b8" },
  kanuo:        { nomo: "Kanuo 🛶",      koloro: "#c8b890" },
  spacosxipo:   { nomo: "Spacosxipo 🚀", koloro: "#d8b068" },
};
const OBJEKTO_BESTOSPECOJ = [ "Beroe", "Mnemiopsis", "Pleŭrobrakia", "Glacifiso", "Marlaraksxo" ];
const OBJEKTO_VESTOJ = [ "Verdant", "Hearth", "Mist", "Ember", "Azure", "Violet", "Gilt", "Rose", "Obsidian", "Cyan" ];
const OBJEKTO_KANUAJ_STILOJ = [ "Baza", "Satala" ];
// La materialoj de la kanuoj kaj la spacosxipo — la samaj kiel en la ludo.
const ORA_MATERIALO = kreiOranMaterialon(0xd8b068);
const ENIRA_MATERIALO = kreiEniranMaterialon();
// La diorita materialo de la lampoj ( hxeuxfoj ) — unu komuna ekzemplero, kiun
// konstruiHxeuxfojn klonas por la lampaj kolonoj/bovloj ( kiel en la ludo ).
let DIORITA_MATERIALO = null;
function dioritaMaterialo() {
  if ( !DIORITA_MATERIALO ) DIORITA_MATERIALO = kreiDioritanMaterialon();
  return DIORITA_MATERIALO;
}
let akvaNiveloValoro = SKULPTA_AKVA_NIVELO;     // la agordebla akva nivelo

// ════════════════════════ Mondkanvaso ( fiksita 768² ) ════════════════════════
const MONDO = 0o1400;                           // 768 — mondlarĝo [ -384, 384 )
const MONDO_HALFO = 0o600;                      // 384
const REZ = 0o1400;                             // 768 — pikseloj sur la mondkanvaso
const bazaCanvas = document.createElement("canvas");
bazaCanvas.width = bazaCanvas.height = REZ;
const bazaKunteksto = bazaCanvas.getContext("2d");
const bazaBildo = bazaKunteksto.createImageData(REZ, REZ);
const bazoj = new Float32Array(REZ * REZ);            // proceduraj altoj
const naturaAkvo = new Uint8Array(REZ * REZ);         // natura akvo-zono ( 0/1 )
const naturaNivelo = new Float32Array(REZ * REZ);     // natura akva nivelo
const deklivoj = new Float32Array(REZ * REZ);         // monteta ombra faktoro

// ════════════════════════ Vido kaj eventoj ════════════════════════
const mapo = document.getElementById("mapo");
const mapoKunteksto = mapo.getContext("2d");
// La loka stilfolio ( stiloj.css ) plenigas la larghon — la kursoro kaj
// touch-action estas funkciaj ( penikado kaj trenado sur la kanvaso ).
mapo.style.cursor = "crosshair";
mapo.style.touchAction = "none";
// La vido-ilo Movigi ✋ uzas la saman kanvason — la kursoro ŝanĝigxas per
// gxisdatigiKursoro ( prena mano anstataux celkruco ).
let vidCX = 0, vidCZ = 0, vidSkalo = minimaSkalo();   // mondcentro kaj pikseloj/unuo
// minimaSkalo — la malplej zomo ( la tuta mondo videbla kun larĝa bordo, por
// ke oni povu rigardi iomete preter la randoj ).
function minimaSkalo(){ return Math.min(mapo.width, mapo.height) / ( MONDO + 0o200 ); }
// alpingiVidon — tenu la videblan rektangulon sur la skulpta krado, kun eta
// libereco preter la randoj ( 64 unuoj — oni povas rigardi iomete eksteren ).
function alpingiVidon(){
  const duonw = mapo.width / vidSkalo / 2;
  const duonh = mapo.height / vidSkalo / 2;
  const ekstero = 0o100;
  // Se la vido estas pli larĝa ol la krado plus la libereco, ne ekzistas
  // pozicio kie gxi tute enestas — centru gxin sur la mondo.
  vidCX = duonw >= MONDO_HALFO + ekstero ? 0 : Math.max(-( MONDO_HALFO + ekstero - duonw ), Math.min(MONDO_HALFO + ekstero - duonw, vidCX));
  vidCZ = duonh >= MONDO_HALFO + ekstero ? 0 : Math.max(-( MONDO_HALFO + ekstero - duonh ), Math.min(MONDO_HALFO + ekstero - duonh, vidCZ));
}
let kursoro = null;                             // la lasta musa mondopozicio
let treno = null;                               // { tipo, lastX, lastZ, ... }
let platigaCelo = null;                         // cel-alto por la platiga peniko
let bezonoDesegno = true;

// ════════════════════════ Historio ( malfari/refari ) ════════════════════════
const historio = [];
const refaraHistorio = [];
function momenti(){
  refaraHistorio.length = 0;
  historio.push({ deltoj: deltoj.slice(), masko: masko.slice(), biomoj: biomoj.slice(), bestoj: bestoj.slice(), objektoj: objektoj.map(o => ( { ...o } )), nivelo: akvaNiveloValoro });
  if ( historio.length > 0o40 ) historio.shift();
}
function restoriStaton(s) {
  deltoj.set(s.deltoj);
  masko.set(s.masko);
  biomoj.set(s.biomoj);
  bestoj.set(s.bestoj);
  objektoj = s.objektoj ? s.objektoj.slice() : [];
  gxisdatigiObjektoListon();
  rekonstruiObjektojn();
  akvaNiveloValoro = s.nivelo;
  niveloRegilo.value = akvaNiveloValoro;
  gxisdatigiValorojn();
  gxisdatigiPlenan2Dn();
  gxisdatigi3DnPostPlena();
  sxangxita = true;
}
function malfari(){
  if ( !historio.length ) return;
  refaraHistorio.push({ deltoj: deltoj.slice(), masko: masko.slice(), biomoj: biomoj.slice(), bestoj: bestoj.slice(), objektoj: objektoj.map(o => ( { ...o } )), nivelo: akvaNiveloValoro });
  restoriStaton(historio.pop());
}
function refari(){
  if ( !refaraHistorio.length ) return;
  historio.push({ deltoj: deltoj.slice(), masko: masko.slice(), biomoj: biomoj.slice(), bestoj: bestoj.slice(), objektoj: objektoj.map(o => ( { ...o } )), nivelo: akvaNiveloValoro });
  restoriStaton(refaraHistorio.pop());
}

// ════════════════════════ Kradaj samploj ════════════════════════
// bicuba — Katmull-Rom unu-dimensia interpolo. Glata C1 kurbo sen la diagonalaj
// faldoj de dulineara interpolo — la montodeklivoj ne plu montras krestojn laŭ
// la krad-diagonaloj ( la sama funkcio kiel en tero-datumo.ts ).
function bicuba(p0, p1, p2, p3, t) {
  const t2 = t * t, t3 = t2 * t;
  return 0.5 * ( ( 2 * p1 ) + ( -p0 + p2 ) * t
    + ( 2 * p0 - 5 * p1 + 4 * p2 - p3 ) * t2 + ( -p0 + 3 * p1 - 3 * p2 + p3 ) * t3 );
}
// deltoInterp — Dukuba ( Katmull-Rom ) interpolo super la skulpta krado. La
// valoro cxe kradnodoj restas ekzakte la ĉela valoro; inter la nodoj la
// surfaco estas glata C1 — sen la dulinearaj diagonalaj krestoj.
function deltoInterp(x, z) {
  const fx = ( x - X0 ) / PASO;
  const fz = ( z - Z0 ) / PASO;
  const i0 = Math.floor(fx), j0 = Math.floor(fz);
  const u = fx - i0, v = fz - j0;
  const cxelo = ( i, j ) => deltoj[Math.max(0, Math.min(N - 1, j)) * N + Math.max(0, Math.min(N - 1, i))];
  const vico = ( j ) => bicuba(cxelo(i0 - 1, j), cxelo(i0, j), cxelo(i0 + 1, j), cxelo(i0 + 2, j), u);
  return bicuba(vico(j0 - 1), vico(j0), vico(j0 + 1), vico(j0 + 2), v);
}
function maskoInterp(x, z) {
  const fx = Math.max(0, Math.min(N - 1, ( x - X0 ) / PASO));
  const fz = Math.max(0, Math.min(N - 1, ( z - Z0 ) / PASO));
  const i0 = Math.floor(fx), j0 = Math.floor(fz);
  const u = fx - i0, v = fz - j0;
  const i1 = Math.min(i0 + 1, N - 1), j1 = Math.min(j0 + 1, N - 1);
  const a = masko[j0 * N + i0], b = masko[j0 * N + i1];
  const c = masko[j1 * N + i0], d = masko[j1 * N + i1];
  return a + ( b - a ) * u + ( c - a ) * v + ( a - b - c + d ) * u * v;
}
function deltoCxelo(ix, iz) {
  const ii = Math.max(0, Math.min(N - 1, ix));
  const jj = Math.max(0, Math.min(N - 1, iz));
  return deltoj[jj * N + ii];
}

// ════════════════════════ Penikoj ════════════════════════
let penikoAktiva = "levi";
let biomoAktiva = 1;           // la sub-peniko de la biomo-ilo ( 1=montaro, 2=valo, 3=ebenaĵo, 4=akvaj-plantoj, 5=ekvizeto, 0=aŭtomata )
let bestoAktiva = 1;           // la sub-peniko de la besto-ilo ( 1=akvaj bestoj, 2=petreloj, 4=NPC-oj )
let bestoForvisxa = false;      // ĉu la besto-ilo FORVIŜAS ( la sama ilo ) anstataŭ pentras
// movigi — la vido-ilo. En la 2D-mapo gxi trenas la mapon, en la 3D-vido gxi
// turnas la fotilon. La peniko-aplikado neniam ricevas gxin — la okazaĵoj
// traktas gxin aparte — sed la aktiva-ilo logiko restas komuna.
function cxuMovigi(){ return penikoAktiva === "movigi"; }
const radiuso = () => +radiusoRegilo.value;
const forto = () => +fortoRegilo.value;

function penikoApliki(cx, cz, r, fortoVal, tipo, tuŝitaj) {
  const ix0 = Math.max(0, Math.floor(( cx - r - X0 ) / PASO));
  const ix1 = Math.min(N - 1, Math.floor(( cx + r - X0 ) / PASO));
  const iz0 = Math.max(0, Math.floor(( cz - r - Z0 ) / PASO));
  const iz1 = Math.min(N - 1, Math.floor(( cz + r - Z0 ) / PASO));
  for ( let iz = iz0; iz <= iz1; iz++ ) {
    const z = Z0 + iz * PASO;
    for ( let ix = ix0; ix <= ix1; ix++ ) {
      const x = X0 + ix * PASO;
      const d = Math.hypot(x - cx, z - cz);
      if ( d > r ) continue;
      const f = 1 - ( d / r ) * ( d / r );       // glata fado al la rando
      const idx = iz * N + ix;
      // Ĉiu ĉelo ricevas la penikon unufoje po penikstreko — la interpolo
      // ( paŝo 0.6 ) alie amasigus la forton gxis ~0o50 oble po rapida treno,
      // kaj unu svingo levis la terenon je dekoj da unuoj. La unua ektuŝo de
      // movigxa peniko cxiam estas la BRUSO-RANDO ( f ≈ 0 ), do la ĉelo
      // registrigxas la plej fortan trafikon ( maksimuma f ), ne la unuan.
      const malnovaF = tuŝitaj.get(idx);
      if ( malnovaF !== undefined && f <= malnovaF ) continue;
      // Apliku nur la INCREMENTON inter la malnova kaj la nova forto — la
      // ĉelo tiam ricevas entute fortoVal × f_maks po streko ( ne la sumon de
      // cxiuj pasantaj aplikaĵoj ). La plata/glata peniko tiel glatigxas per
      // unu eta lerpo po streko anstataŭ tuj plena al la celo.
      const df = malnovaF === undefined ? f : f - malnovaF;
      tuŝitaj.set(idx, f);
      if ( tipo === "levi" ) {
        deltoj[idx] += fortoVal * 2 * df;
      } else if ( tipo === "malsuprenigi" ) {
        deltoj[idx] -= fortoVal * 2 * df;
      } else if ( tipo === "platigi" && platigaCelo !== null ) {
        const nova = platigaCelo - bazaAlteco(x, z);
        deltoj[idx] += ( nova - deltoj[idx] ) * fortoVal * df;
      } else if ( tipo === "glatigi" ) {
        const mezo = ( deltoCxelo(ix - 1, iz) + deltoCxelo(ix + 1, iz)
          + deltoCxelo(ix, iz - 1) + deltoCxelo(ix, iz + 1) ) / 4;
        deltoj[idx] += ( mezo - deltoj[idx] ) * fortoVal * df;
      } else if ( tipo === "akvo" ) {
        // La akva peniko PENTRAS la maskon super la tuta peniko — la kavo
        // sekvas la glatan fadon ( la bordo klinas al la maska rando ), sed la
        // masko markas la tutan cirklon. Tiel pentri lagon aux riveron estas
        // facila eĉ sur pli alta grundo. la peniko eltranĉas la basenon sub la
        // akva nivelo kaj la masko difinas la akvan formon.
        const t = Math.max(0, Math.min(1, ( f - 0.05 ) / 0.95));
        if ( t > 0 ) {
          const celo = ( akvaNiveloValoro - 0.25 ) - bazaAlteco(x, z);
          deltoj[idx] = Math.min(deltoj[idx], celo * t);
          masko[idx] = 1;
        }
      } else if ( tipo === "forvisxi" ) {
        deltoj[idx] = 0;
        masko[idx] = 0;
      } else if ( tipo === "biomo" ) {
        // La biomo-ilo PENTRAS la biomon rekte sur la biomo-tavolon. La
        // akvaj biomoj ( 4=akvaj-plantoj, 5=ekvizeto ) ekzistas nur SUR la
        // akvo — la peniko pentras ilin nur en akvaj ĉeloj; la teraj biomoj
        // ( 1=montaro, 2=valo, 3=ebenaĵo ) neniam pentrigxas sur akvo.
        // Aŭtomata forigas la pentraĵon cxiu loke. La tero mem NE ŝanĝiĝas.
        const akva = masko[idx] === 1;
        if ( biomoAktiva === 0 ) biomoj[idx] = 0;
        else if ( biomoAktiva >= 4 ? akva : !akva ) biomoj[idx] = biomoAktiva;
      } else if ( tipo === "bestoj" ) {
        // La besto-ilo PENTRAS la bestajn zonojn sur la besta-tavolon kiel
        // BITOJ. 1=akvaj bestoj, 2=petreloj, 4=NPC-oj — ĉelo povas teni
        // PLURAJN samtempe, do pentri la duan specion sur la unua KOMBINAS
        // ilin. La akvaj bestoj naĝas nur en akvo ( akvaj ĉeloj ); la
        // petreloj povas flugi super ajna loko ( tero AUX akvo ); la NPC-oj
        // piediras nur sur tero ( NENIAM sur akvo ). La forviŝo ( la SAMA
        // ilo, sxaltita per la butono Forviŝi 🧽 en la paletro ) forigas NUR
        // la elektitan specion — la ceteraj restas. La tero mem NE ŝanĝiĝas.
        const akva = masko[idx] === 1;
        if ( bestoForvisxa ) bestoj[idx] &= ~bestoAktiva;
        else if ( bestoAktiva === 1 ? akva : bestoAktiva === 4 ? !akva : true ) bestoj[idx] |= bestoAktiva;
      }
      // "movigi" ne estas peniko — la okazaĵoj traktas gxin aparte.
    }
  }
  return { ix0, ix1, iz0, iz1 };
}
function penikoPasxo(cx, cz) {
  const t = treno;
  const disto = Math.hypot(cx - t.lastX, cz - t.lastZ);
  const pasoj = Math.max(1, Math.ceil(disto / 0.6));
  for ( let k = 1; k <= pasoj; k++ ) {
    const px = t.lastX + ( cx - t.lastX ) * k / pasoj;
    const pz = t.lastZ + ( cz - t.lastZ ) * k / pasoj;
    penikoApliki(px, pz, radiuso(), forto(), penikoAktiva, t.tuŝitaj);
  }
  // La malnova punkto antaŭ la gxisdatigo — la pentrado kovru la TUTAN
  // vojon de la stroko, ne nur la nunan punkton ( t.lastX sxangxigxas
  // tuj poste, do max( lastX, cx ) estus cxiam nur cx ).
  const deX = t.lastX, deZ = t.lastZ;
  t.lastX = cx; t.lastZ = cz;
  sxangxita = true;
  statuso("Nesavitaj ŝanĝoj");
  const r = radiuso();
  const px0 = Math.max(0, Math.min(REZ - 1, mondoxAlPikselo(Math.max(deX, cx) + r + 1)));
  const px1 = Math.max(0, Math.min(REZ - 1, mondoxAlPikselo(Math.min(deX, cx) - r - 1)));
  const py0 = Math.max(0, Math.min(REZ - 1, mondozAlPikselo(Math.max(deZ, cz) + r + 1)));
  const py1 = Math.max(0, Math.min(REZ - 1, mondozAlPikselo(Math.min(deZ, cz) - r - 1)));
  rekalkuliDeklivojn(px0 - 2, py0 - 2, px1 + 2, py1 + 2);
  pentri(px0, py0, px1, py1);
  bezonoDesegno = true;
}

// ════════════════════════ Pentrado ════════════════════════
function mondoxAlPikselo(x) { return Math.round(( MONDO_HALFO - x ) / MONDO * REZ); }   // oriento dekstren
function mondozAlPikselo(z) { return Math.round(( MONDO_HALFO - z ) / MONDO * REZ); }

// naturaAkvoEn — ĉu la natura mondo havas akvon ĉe ( x, z ) ( la lago, la
// nordorienta rivereto aŭ la rivero ).
function naturaAkvoEn(x, z) {
  return cxuEnLago(x, z) || cxuEnNordorientaRivero(x, z)
    || Math.abs(z - riveroZ(x)) < RIVERA_DUONLARĜO;
}

function prerenderiBazon(){
  for ( let py = 0; py < REZ; py++ ) {
    const z = MONDO_HALFO - ( py + 0.5 ) * MONDO / REZ;
    for ( let px = 0; px < REZ; px++ ) {
      const x = MONDO_HALFO - ( px + 0.5 ) * MONDO / REZ;
      const i = py * REZ + px;
      bazoj[i] = bazaAlteco(x, z);
      const en = naturaAkvoEn(x, z);
      naturaAkvo[i] = en ? 1 : 0;
      naturaNivelo[i] = en ? akvaNivelo(x, z) : 0;
    }
  }
}

// bruo2D — izotropa valora bruo ( hash-bazita, glate interpolita ) en [0,1].
// La antaŭa du-oktava SIN-bruo havis ondofrontojn laŭ la diagonaloj — sur la
// plata natura tereno ĝi montris videblajn DIAGONALAJN STRIOJN. Ĉi tiu bruo
// havas neniun preferatan direkton — natura makuleco.
function bruo2D(x, z) {
  const ix = Math.floor(x), iz = Math.floor(z);
  const fx = x - ix, fz = z - iz;
  const h = ( xi, zi ) => {
    let n = ( xi * 0x28f0f0 + zi * 0x28d8e8 ) | 0;
    n = ( n ^ ( n >>> 13 ) ) * 0x48a028;
    return ( ( n ^ ( n >>> 16 ) ) >>> 0 ) / 4294967296;
  };
  const a = h(ix, iz), b = h(ix + 1, iz), c = h(ix, iz + 1), d = h(ix + 1, iz + 1);
  const u = fx * fx * ( 3 - 2 * fx );
  const v = fz * fz * ( 3 - 2 * fz );
  return a + ( b - a ) * u + ( c - a ) * v + ( a - b - c + d ) * u * v;
}

// koloroDeAlto — la tera koloro por la alto h ĉe ( x, z ). Glataj tavoloj
// ( sabla bordo, herbejo, sekherba deklivo, roko, neĝo ) kun malgranda
// sin-teksturo. La herbejaj nuancoj sekvas la malnovan malseketan paletron
// de la ludo. La skulptita zono montrigxas per eta freŝa-tero malheliĝo
// ( delta ≠ 0 ), ne per la malnova forta oranĝa tintado — la sama koloro
// sur la 2D-mapo kaj la 3D-meŝo.
const ALTAJ_TAVOLOJ = [
  [ -0o10, 0o212, 0o172, 0o112 ],   // sabla bordo ( −8 )
  [ 0o2, 0o52, 0o116, 0o46 ],       // malseka herbo ( 2 )
  [ 0o10, 0o64, 0o130, 0o60 ],      // herbejo ( 8 )
  [ 0o22, 0o130, 0o130, 0o100 ],    // sekherba deklivo ( 18 )
  [ 0o30, 0o122, 0o116, 0o104 ],    // roko ( 24 )
  [ 0o60, 0o340, 0o350, 0o350 ],    // neĝo ( 48 )
];
function koloroDeAlto(h, x, z, delta) {
  let malsupra = ALTAJ_TAVOLOJ[0], supra = ALTAJ_TAVOLOJ[ALTAJ_TAVOLOJ.length - 1];
  for ( let i = 0; i < ALTAJ_TAVOLOJ.length - 1; i++ ) {
    if ( h >= ALTAJ_TAVOLOJ[i][0] && h < ALTAJ_TAVOLOJ[i + 1][0] ) {
      malsupra = ALTAJ_TAVOLOJ[i]; supra = ALTAJ_TAVOLOJ[i + 1]; break;
    }
  }
  const t = Math.max(0, Math.min(1, ( h - malsupra[0] ) / ( supra[0] - malsupra[0] )));
  let r = malsupra[1] + ( supra[1] - malsupra[1] ) * t;
  let g = malsupra[2] + ( supra[2] - malsupra[2] ) * t;
  let b = malsupra[3] + ( supra[3] - malsupra[3] ) * t;
  // Du-oktava IZOTROPA valora bruo — natura makuleco sen direkto ( la antaŭa
  // sin-bruo montris diagonalajn striojn sur la plata tereno ). La verda
  // kanalo sxangxigxas plej ( kreskajxo ), la blua plej malmulte.
  const v = 0.5 + 0.35 * ( 2 * bruo2D(x / 0o40, z / 0o40) - 1 )
    + 0.15 * ( 2 * bruo2D(x / 0o10, z / 0o10) - 1 );
  r += v * 0o4; g += v * 0o10; b += v * 0o4;
  if ( delta !== 0 ) {
    // Freŝa tero — malheliĝo kun bruneta subtono, proksima al la natura
    // paletro. La forto fadas kun la delto, por ke la redaktita zono restu
    // videbla sen la malnova oranĝa ŝmiraĵo.
    const s = 0.06 + Math.min(0.28, Math.abs(delta) / 5);
    r += 0o30 * s; g -= 0o14 * s; b -= 0o20 * s;
  }
  return [ Math.max(0, Math.min(255, r)), Math.max(0, Math.min(255, g)), Math.max(0, Math.min(255, b)) ];
}

// ⟨ Biomaj montraĵoj ( la biomo-zonoj de la skulptita tero ) 📃 ⟩
// La biomo ( tereno.ts ) venas TUTE de la PENTRITA tavolo. akvo ( la masko )
// kaj la pentritaj montaro/valo/ebenaĵo/akvaj-plantoj/ekvizeto
// ( SKULPTA_BIOMOJ ). Neniu deriva biomo ekzistas — malplena ( 0 = aŭtomata,
// aux sen datumoj ) estas nenio. La skulptilo montras la biomojn nur dum la
// biomo-ilo ( Biomo 🎨 ) estas malfermita — purpura sur la montara biomo,
// verda-blua sur la vala, pala helverda sur la ebenaĵo, kaj la akvaj biomoj
// ( akvaj-plantoj, ekvizeto ) kolorigas la akvajn ĉelojn per siaj propraj
// nuancoj. Ferminte la ilon la tero montras siajn naturajn kolorojn. La
// nuanco sekvas la vivajn pentritajn ĉelojn, do gxi sxangxigxas dum la
// pentrado mem.
const MONTA_NUANCO = [ 0o230, 0o60, 0o300 ];    // purpura — la montara biomo
const VALA_NUANCO = [ 0o40, 0o230, 0o260 ];     // verda-blua — la vala biomo
const EBENAJA_NUANCO = [ 0o220, 0o300, 0o110 ]; // pala helverda — la ebenaĵa biomo
const AKVAJ_PLANTOJ_NUANCO = [ 0o40, 0o200, 0o260 ]; // profunda blu-verda — la akvaj plantoj
const EKVIZETO_NUANCO = [ 0o100, 0o260, 0o140 ];     // helverda — la ekvizeto
const BIOMA_NUANCO = {
  montaro: [ MONTA_NUANCO, 0.3 ],
  valo: [ VALA_NUANCO, 0.3 ],
  ebenaĵo: [ EBENAJA_NUANCO, 0.3 ],
  "akvaj-plantoj": [ AKVAJ_PLANTOJ_NUANCO, 0.45 ],
  ekvizeto: [ EKVIZETO_NUANCO, 0.45 ],
};
// La besta-tavolo montrigxas nur dum la besto-ilo ( Animaloj 🐾 ) estas
// malfermita. helbluaj punktoj sur la akvaj-bestaj ĉeloj, helaj punktoj sur
// la petrelaj ĉeloj, helflavaj punktoj sur la NPC-ĉeloj. La vido montras
// NUR la elektitan specion — kaj la forviŝo montras la samajn ĉelojn, por
// ke oni vidu, kion oni forigas.
const AKVAJ_BESTOJ_NUANCO = [ 0o110, 0o220, 0o300 ];
const PETRELA_NUANCO = [ 0o320, 0o320, 0o320 ];
const NPCA_NUANCO = [ 0o320, 0o260, 0o110 ];
const BESTO_NUANCO = {
  1: [ AKVAJ_BESTOJ_NUANCO, 0.35 ],
  2: [ PETRELA_NUANCO, 0.35 ],
  4: [ NPCA_NUANCO, 0.35 ],
};

// biomoInterp — La pentrita biomo de la punkto ( la plej proksima ĉelo de la
// biomo-tavolo ). 0=aŭtomata, 1=montaro, 2=valo, 3=ebenaĵo, 4=akvaj-plantoj,
// 5=ekvizeto. La sama samplo kiel skulptitaBiomo en tero-datumo.ts.
function biomoInterp(x, z) {
  const i = Math.max(0, Math.min(N - 1, Math.floor(( x - X0 ) / PASO)));
  const j = Math.max(0, Math.min(N - 1, Math.floor(( z - Z0 ) / PASO)));
  return biomoj[j * N + i];
}
const BIOMA_NOMOJ = [ null, "montaro", "valo", "ebenaĵo", "akvaj-plantoj", "ekvizeto" ];

// bestoInterp — La pentrita besta zono de la punkto ( la plej proksima ĉelo
// de la besta-tavolo ). bitoj 1=akvaj bestoj, 2=petreloj, 4=NPC-oj. La sama
// samplo kiel skulptitaBesto en tero-datumo.ts.
function bestoInterp(x, z) {
  const i = Math.max(0, Math.min(N - 1, Math.floor(( x - X0 ) / PASO)));
  const j = Math.max(0, Math.min(N - 1, Math.floor(( z - Z0 ) / PASO)));
  return bestoj[j * N + i];
}

// biomoDe — La biomo de la punkto en la skulptilo ( la sama decido kiel la
// ludo ). la akvaj biomoj validas nur sur la akvo, la masko ĉiam superregas
// la terajn biomojn, kaj malplena ( 0 = aŭtomata, aux sen datumoj ) estas
// nenio — neniu nuanco. Nur la masko ( ne la teralto ) decidas la akvon.
function biomoDe(x, z) {
  const pentrita = biomoInterp(x, z);
  const akva = maskoInterp(x, z) >= 0.5;
  if ( pentrita === 4 && akva ) return "akvaj-plantoj";
  if ( pentrita === 5 && akva ) return "ekvizeto";
  if ( akva ) return "akvo";
  if ( pentrita !== 0 ) return BIOMA_NOMOJ[pentrita];
  return "nenio";
}
function almetiBiomanNuancon(k, x, z, d) {
  // Nur dum la biomo-ilo estas malfermita. La nuda akvo ricevas NENIAN
  // nuancon — la akvaj biomoj ( akvaj-plantoj, ekvizeto ) kolorigas siajn
  // pentritajn ĉelojn, kaj la akvo montras sian propran koloron aliloke.
  if ( penikoAktiva === "biomo" ) {
    const n = BIOMA_NUANCO[biomoDe(x, z)];
    if ( n ) {
      const m = n[1];
      return [
        k[0] + ( n[0][0] - k[0] ) * m,
        k[1] + ( n[0][1] - k[1] ) * m,
        k[2] + ( n[0][2] - k[2] ) * m,
      ];
    }
    return k;
  }  // Nur dum la besto-ilo estas malfermita. la vido montras NUR la elektitan
  // specion ( la akvaj bestoj helbluaj, la petreloj helaj, la NPC-oj
  // helflavaj ).
  if ( penikoAktiva === "bestoj" ) {
    const b = bestoInterp(x, z);
    const n = BESTO_NUANCO[bestoAktiva & 7];
    if ( !n || ( b & ( bestoAktiva & 7 ) ) === 0 ) return k;
    const m = n[1];
    return [
      k[0] + ( n[0][0] - k[0] ) * m,
      k[1] + ( n[0][1] - k[1] ) * m,
      k[2] + ( n[0][2] - k[2] ) * m,
    ];
  }
  return k;
}

// kolorigiAkvon — la akva koloro laŭ la profundo, ombrita kiel la tero. En
// skulptita ĉelo ( delta ≠ 0 ) la akvo malklarigxas ( kiel skuita koto ), por
// ke la peniko montru sian efikon ankaŭ en la rivero kaj la lago — levita
// tero restus alie nevidebla sub la opaka akvo.
function kolorigiAkvon(datumoj, o, h, nivelo, ombro, delta, x, z) {
  const prof = Math.min(6, nivelo - h);
  const t = prof / 6;
  let r = 0o40 + ( 0o10 - 0o40 ) * t;
  let g = 0o150 - 0o110 * t;
  let b = 0o150 - 0o110 * t;
  if ( delta !== 0 ) {
    const s = 0.15 + Math.min(0.5, Math.abs(delta) / 4);
    r += 0o30 * s; g -= 0o14 * s; b -= 0o20 * s;
  }
  // La biomo- kaj besta-nuancoj kovras ankaŭ la akvon — la akvaj biomoj
  // ( akvaj-plantoj, ekvizeto ) kaj la akvaj bestoj pentrigxas sur la akvo mem.
  const k = almetiBiomanNuancon([ r, g, b ], x, z, delta);
  r = k[0]; g = k[1]; b = k[2];
  datumoj[o] = Math.min(255, r * ombro);
  datumoj[o + 1] = Math.min(255, g * ombro);
  datumoj[o + 2] = Math.min(255, b * ombro);
  datumoj[o + 3] = 255;
}

// bicubaDerivata — la derivaĵo de la Katmull-Rom kurbo laŭ t.
function bicubaDerivata(p0, p1, p2, p3, t) {
  const t2 = t * t;
  return 0.5 * ( ( -p0 + p2 ) + 2 * ( 2 * p0 - 5 * p1 + 4 * p2 - p3 ) * t
    + 3 * ( -p0 + 3 * p1 - 3 * p2 + p3 ) * t2 );
}
// deltoKunDerivajoj — la dukuba alto kaj la du partaj derivaĵoj ĉe ( x, z ).
// Unu 4×4-lego donas ĉiujn tri valorojn — 5× pli rapide ol la centraj
// diferencoj de kvin dulinearaj samploj, kaj la normalo estas glata ( la
// derivaĵo de la glata surfaco, sen krad-restaĵoj ).
function deltoKunDerivajoj(x, z) {
  const fx = ( x - X0 ) / PASO, fz = ( z - Z0 ) / PASO;
  const i0 = Math.floor(fx), j0 = Math.floor(fz);
  const u = fx - i0, v = fz - j0;
  const cxelo = ( i, j ) => deltoj[Math.max(0, Math.min(N - 1, j)) * N + Math.max(0, Math.min(N - 1, i))];
  // La kvar vicoj — alto kaj u-derivaĵo po vico.
  const r = [], rd = [];
  for ( let k = -1; k <= 2; k++ ) {
    const j = j0 + k;
    const a = cxelo(i0 - 1, j), b = cxelo(i0, j), c = cxelo(i0 + 1, j), d = cxelo(i0 + 2, j);
    r.push(bicuba(a, b, c, d, u));
    rd.push(bicubaDerivata(a, b, c, d, u));
  }
  const h = bicuba(r[0], r[1], r[2], r[3], v);
  const dhdu = bicuba(rd[0], rd[1], rd[2], rd[3], v);
  const dhdv = bicubaDerivata(r[0], r[1], r[2], r[3], v);
  return [ h, dhdu / PASO, dhdv / PASO ];
}
// rekalkuliDeklivojn — La monteta ombrado ( hillshade ) por la rektangulo.
// La normalo de la alteca kampo kontraŭ lumo el la nordokcidento; la ombra
// faktoro 0.7..1.2 multobliĝas la terajn kolorojn. La derivaĵoj venas de la
// analiza dukuba surfaco ( la bazo estas plata, do la deltoj sufiĉas ).
function rekalkuliDeklivojn(px0, py0, px1, py1) {
  const lumoX = -0.55, lumoY = 0.65, lumoZ = 0.52;
  const lumoLen = Math.hypot(lumoX, lumoY, lumoZ);
  const minPx = Math.max(1, px0), maxPx = Math.min(REZ - 2, px1);
  const minPy = Math.max(1, py0), maxPy = Math.min(REZ - 2, py1);
  for ( let py = minPy; py <= maxPy; py++ ) {
    const z = MONDO_HALFO - ( py + 0.5 ) * MONDO / REZ;
    for ( let px = minPx; px <= maxPx; px++ ) {
      const x = MONDO_HALFO - ( px + 0.5 ) * MONDO / REZ;
      const i = py * REZ + px;
      const [ , deklX, deklZ ] = deltoKunDerivajoj(x, z);
      const nx = -deklX * 2.2, nz = -deklZ * 2.2, ny = 1;
      const len = Math.hypot(nx, ny, nz);
      const lumo = ( nx * lumoX + ny * lumoY + nz * lumoZ ) / len / lumoLen;
      deklivoj[i] = 0.7 + 0.5 * Math.max(0, lumo);
    }
  }
}

// gxisdatigiPlenan2Dn — plena rekalkulado de la ombro kaj de la 2D-bildo.
function gxisdatigiPlenan2Dn(){
  rekalkuliDeklivojn(0, 0, REZ - 1, REZ - 1);
  pentri(0, 0, REZ - 1, REZ - 1);
  bezonoDesegno = true;
}

function pentri(px0, py0, px1, py1) {
  const datumoj = bazaBildo.data;
  for ( let py = py0; py <= py1; py++ ) {
    const z = MONDO_HALFO - ( py + 0.5 ) * MONDO / REZ;
    for ( let px = px0; px <= px1; px++ ) {
      const x = MONDO_HALFO - ( px + 0.5 ) * MONDO / REZ;
      const i = py * REZ + px;
      const bazo = bazoj[i];
      const delta = deltoInterp(x, z);
      const h = bazo + delta;
      const o = i * 4;
      const ombro = deklivoj[i] || 1;
      if ( naturaAkvo[i] && h < naturaNivelo[i] ) {
        kolorigiAkvon(datumoj, o, h, naturaNivelo[i], ombro, delta, x, z);
      } else if ( maskoInterp(x, z) >= 0.5 && h < akvaNiveloValoro ) {
        kolorigiAkvon(datumoj, o, h, akvaNiveloValoro, ombro, delta, x, z);
      } else {
        const k = almetiBiomanNuancon(koloroDeAlto(h, x, z, delta), x, z, delta);
        datumoj[o] = Math.min(255, k[0] * ombro);
        datumoj[o + 1] = Math.min(255, k[1] * ombro);
        datumoj[o + 2] = Math.min(255, k[2] * ombro);
        datumoj[o + 3] = 255;
      }
    }
  }
  bazaKunteksto.putImageData(bazaBildo, 0, 0);
}

function desegniVidon(){
  const k = mapoKunteksto;
  const duonw = mapo.width / 2, duonh = mapo.height / 2;
  // Mondo → ekrano. Nordo ( +z ) supre, oriento ( −x ) dekstren — la sama
  // orientiĝo kiel la minimapo de la ludo.
  const sxMondo = ( x ) => duonw - ( x - vidCX ) * vidSkalo;
  const syMondo = ( z ) => duonh - ( z - vidCZ ) * vidSkalo;
  k.imageSmoothingEnabled = true;
  // La ĉiela fono — la sama helblua tono kiel la 3D-vido. La tereno kovras
  // la tutan mondon; la ĉielo videblas ĉe la randoj kaj preter la mondo.
  k.fillStyle = "#a8d0e8";
  k.fillRect(0, 0, mapo.width, mapo.height);
  // La baza kanvaso havas okcidenton maldekstre ( pixel 0 = x +MONDO_HALFO )
  // kaj nordon supre ( pixel 0 = z +MONDO_HALFO ).
  k.drawImage(bazaCanvas, sxMondo(MONDO_HALFO), syMondo(MONDO_HALFO), MONDO * vidSkalo, MONDO * vidSkalo);
  // La metitaj objektoj — la suprajn bake de la VERAJ 3D-meshxoj ( kiel la
  // plena mapo de la ludo ), travidebla super la tereno.
  if ( objektaBakaKanvaso && objektoj.length > 0 ) {
    // La bake havas okcidenton maldekstre ( imgX 0 = x +MONDO_HALFO ) kaj
    // nordon supre — la sama orientiĝo kiel la baza kanvaso, do gxi ankrigxas
    // cxe sxMondo(MONDO_HALFO) kiel la bazo. ( La antaŭa ankro sxMondo(-MONDO_HALFO)
    // metis la bake-tavolon sur la malĝustan flankon — ekster la ekrano cxe
    // granda zomo. )
    k.drawImage(objektaBakaKanvaso,
      sxMondo(MONDO_HALFO), syMondo(MONDO_HALFO), MONDO * vidSkalo, MONDO * vidSkalo);
  }
  // La krada urbo — vojoj, spronoj kaj konstruaĵoj super la tereno.
  // Montriĝas NUR dum la Krado-langeto 🏙️ estas aktiva ( la konstruaĵoj ne
  // montriĝu sur la mapo alie ). La planaj koordinatoj estas relativaj al la
  // krada centro; la ofseto metas la kradon en la mondon.
  if ( aktivaTabo === "krado" ) {
    desegniKradanTavolon(k, kradoPlano(), x => sxMondo(x + kradoOfsX), z => syMondo(z + kradoOfsZ), vidSkalo);
    // La urbaj markiloj — ĉiu urbo de SKULPTA_URBOJ kiel diamanto kun la
    // nomo, la elektita urbo reliefigita. Klako sur markilon elektas la urbon
    // ( la pointerdown de la mapo ). La markiloj estas fiks-ampleksaj sur la
    // ekrano, por resti legeblaj ĉe ajna zomo.
    urboj.forEach(( u, i ) => {
      const sx = sxMondo(u.ofsX), sy = syMondo(u.ofsZ);
      const elektita = i === elektitaUrbo;
      k.fillStyle = elektita ? "rgba(255,214,64,0.95)" : "rgba(255,255,255,0.85)";
      k.beginPath();
      k.moveTo(sx, sy - 7);
      k.lineTo(sx + 7, sy);
      k.lineTo(sx, sy + 7);
      k.lineTo(sx - 7, sy);
      k.closePath();
      k.fill();
      k.strokeStyle = elektita ? "#e0b840" : "rgba(0,0,0,0.5)";
      k.lineWidth = elektita ? 2.5 : 1;
      k.stroke();
      k.font = "bold 12px sans-serif";
      k.textAlign = "center";
      k.textBaseline = "bottom";
      k.lineWidth = 3;
      k.strokeStyle = "rgba(0,0,0,0.85)";
      k.strokeText(u.nomo, sx, sy - 10);
      k.fillStyle = elektita ? "#f8e8a8" : "#ffffff";
      k.fillText(u.nomo, sx, sy - 10);
    });
    // La dokaj platformoj de la ĉefa urbo — malgrandaj kvadratoj cxe la
    // dokaj x-pozicioj ( la kajo kaj la avenuo montrigxas en la plano ).
    if ( elektitaUrbo === 0 ) {
      for ( const d of dokoj ) {
        const dx = d.x;
        const sx = sxMondo(dx), sy = syMondo(d.z);
        k.fillStyle = "rgba(200,160,80,0.9)";
        k.fillRect(sx - 4, sy - 4, 8, 8);
        k.strokeStyle = "rgba(0,0,0,0.5)";
        k.lineWidth = 1;
        k.strokeRect(sx - 4, sy - 4, 8, 8);
      }
    }
    // La aldonaj blokoj — la elektita bloko reliefigita per ringo ( la
    // konstruajxo mem montrigxas en la plano ). La klako sur la markilon
    // elektas gxin kaj la treno movas gxin.
    const uAld = urboj[elektitaUrbo];
    const aldonaj = uAld && uAld.aldonajBlokoj ? uAld.aldonajBlokoj : [];
    aldonaj.forEach(( b, i ) => {
      const bx = sxMondo(kradoOfsX + b.x), bz = syMondo(kradoOfsZ + b.z);
      if ( i === elektitaAldonaBloko ) {
        k.strokeStyle = "#f8e8a8";
        k.lineWidth = 2.5;
        k.beginPath();
        k.arc(bx, bz, 9, 0, Math.PI * 2);
        k.stroke();
        k.lineWidth = 1;
      }
    });
    // La keŭfĥesoj — kvar sespintaj steloj ĉirkaŭ la centro ( montriĝas nur
    // kiam la redaktata urbo havas ilin ), same kiel en la 3D-vido.
    if ( uAld && uAld.keuxfhxeso ) {
      const R = 0o10;
      k.fillStyle = "rgba(150,210,220,0.95)";
      k.strokeStyle = "rgba(0,0,0,0.4)";
      k.lineWidth = 1;
      for ( let i = 0; i < 4; i++ ) {
        const a = Math.PI / 4 + i * Math.PI / 2;
        const sx = sxMondo(kradoOfsX + Math.cos(a) * R), sy = syMondo(kradoOfsZ + Math.sin(a) * R);
        k.beginPath();
        for ( let q = 0; q < 6; q++ ) {
          const ang = a + q * Math.PI / 3;
          const px = sx + Math.cos(ang) * 4, py = sy + Math.sin(ang) * 4;
          if ( q === 0 ) k.moveTo(px, py); else k.lineTo(px, py);
        }
        k.closePath();
        k.fill();
        k.stroke();
      }
    }
    // La kradaj strato-lampoj — la kvar-lampa ŝablono ĉirkaŭ la placo-nodoj
    // kaj la kruciĝoj ( la sama geometrio kiel la ludo, de la plano ). Varmaj
    // flavaj punktoj kun hela kerno, kiel la lampo-glowo en la 3D-vido.
    if ( uAld && uAld.lampoj !== false ) {
      const plano = kradoPlano();
      for ( const l of plano.lampoj ) {
        const sx = sxMondo(kradoOfsX + l.x), sy = syMondo(kradoOfsZ + l.z);
        k.fillStyle = "rgba(248,168,72,0.95)";
        k.beginPath();
        k.arc(sx, sy, 2.2, 0, Math.PI * 2);
        k.fill();
        k.fillStyle = "rgba(248,232,184,0.95)";
        k.beginPath();
        k.arc(sx, sy, 1.1, 0, Math.PI * 2);
        k.fill();
      }
    }
  }
  // La Vojoj sub-langeto de la Krado-panelo — la mondaj vojoj kaj dokoj
  // redaktataj sur la mapo, super la krada urbo ( por ke oni povu konekti
  // ilin al la urbo ). La sama aspekto kiel la plena mapo de la ludo —
  // helgrizaj vojoj kun malhelaj andezitaj bordoj kaj la dokaj platformoj.
  if ( vojojAktiva() ) {
    // La vojoj — dikaj polilinioj. La ekstera malhela strio ( la andezita
    // bordo, duono = larĝo/2 + 0o10/0o10 ) kaj la hela diorita centro, kun
    // rondaj finoj kiel la ludaj kapoj. La elektita vojo reliefigxas.
    for ( let vi = 0; vi < vojoj.length; vi++ ) {
      const v = vojoj[vi];
      if ( !v.punktoj || v.punktoj.length < 2 ) continue;
      const elektita = vi === elektitaVojo;
      const duono = ( v.larĝo || 3.5 ) / 2 + 0o10/0o10;
      const centro = ( v.larĝo || 3.5 ) / 2;
      const punktoj = v.punktoj.map(p => [ sxMondo(p[0]), syMondo(p[1]) ]);
      const spuro = ( larĝo, koloro ) => {
        k.strokeStyle = koloro;
        k.lineWidth = Math.max(1, larĝo * vidSkalo);
        k.lineCap = "round";
        k.lineJoin = "round";
        k.beginPath();
        punktoj.forEach(( p, i ) => i === 0 ? k.moveTo(p[0], p[1]) : k.lineTo(p[0], p[1]));
        k.stroke();
      };
      spuro(duono, elektita ? "rgba(120,140,120,0.95)" : "rgba(90,98,88,0.9)");
      spuro(centro, elektita ? "rgba(255,232,150,0.95)" : "rgba(216,216,208,0.95)");
      // La punktoj — la elektita punkto reliefigita.
      punktoj.forEach(( p, i ) => {
        const aktiva = elektita && i === elektitaPunkto;
        k.fillStyle = aktiva ? "#f8e8a8" : "rgba(255,255,255,0.9)";
        k.beginPath();
        k.arc(p[0], p[1], aktiva ? 5 : 3.5, 0, Math.PI * 2);
        k.fill();
        k.strokeStyle = "rgba(0,0,0,0.5)";
        k.lineWidth = 1;
        k.stroke();
      });
    }
    // La dokaj platformoj — la diorita centro kun la andezita kadro ( la
    // samaj mezuroj kiel en doko.ts — larĝo 0o16/0o10, kadro 0o4/0o10 ).
    for ( let di = 0; di < dokoj.length; di++ ) {
      const d = dokoj[di];
      const elektita = di === elektitaDoko;
      const w = 0o16/0o10, prof = d.profundo || 16, kadro = 0o4/0o10;
      const sx0 = sxMondo(d.x - w / 2 - kadro), sx1 = sxMondo(d.x + w / 2 + kadro);
      const sz0 = syMondo(d.z + prof / 2 + kadro), sz1 = syMondo(d.z - prof / 2 - kadro);
      k.fillStyle = elektita ? "rgba(120,140,120,0.95)" : "rgba(90,98,88,0.9)";
      k.fillRect(Math.min(sx0, sx1), Math.min(sz0, sz1), Math.abs(sx1 - sx0), Math.abs(sz1 - sz0));
      const cx0 = sxMondo(d.x - w / 2), cx1 = sxMondo(d.x + w / 2);
      const cz0 = syMondo(d.z + prof / 2), cz1 = syMondo(d.z - prof / 2);
      k.fillStyle = elektita ? "rgba(255,232,150,0.95)" : "rgba(216,216,208,0.95)";
      k.fillRect(Math.min(cx0, cx1), Math.min(cz0, cz1), Math.abs(cx1 - cx0), Math.abs(cz1 - cz0));
    }
  }
  // La penika ringo kaj la centro — ne en la vido-ilo Movigi ✋, nek en la
  // Krado-langeto ( la klako redaktas ĉelon, ne pentras ). En la objekta ilo
  // la ringo havas fiksan malgrandan radiuson ( la objekta piedo ).
  if ( kursoro && !cxuMovigi() && aktivaTabo !== "krado" ){
    const sx2 = sxMondo(kursoro.x);
    const sy2 = syMondo(kursoro.z);
    k.strokeStyle = "rgba(255,255,255,0.8)";
    k.lineWidth = 1.5;
    k.beginPath();
    k.arc(sx2, sy2, ( objektaModo ? 1.5 : radiuso() ) * vidSkalo, 0, Math.PI * 2);
    k.stroke();
    k.beginPath();
    k.arc(sx2, sy2, 2, 0, Math.PI * 2);
    k.stroke();
  }
  // La elektita objekto — blanka ringo super la bake.
  if ( elektitaObjekto >= 0 && elektitaObjekto < objektoj.length ) {
    const o = objektoj[elektitaObjekto];
    k.strokeStyle = "#ffffff";
    k.lineWidth = 2;
    k.beginPath();
    k.arc(sxMondo(o.x), syMondo(o.z), 6, 0, Math.PI * 2);
    k.stroke();
  }
}

function buklo(){
  // La klavara movado funkcias en ambaŭ vidoj — gxi ne bezonas la 3D-bildilon.
  moviKlavare();
  // La vido neniam forlasas la skulptan kradon — ajna treno/zomo/klavera
  // movo estas alpinglita antaux la desegno.
  alpingiVidon();
  if ( bezonoDesegno ) { desegniVidon(); bezonoDesegno = false; }
  if ( triaDimensia && bildilo3d ) {
    regiloj3d.update();
    bildilo3d.render(sceno3d, fotilo3d);
  }
  // La objekta antaŭrigardo — malrapide turniĝanta vido de la elektita speco
  // ( nur dum la objekta ilo estas malfermita — la panelo estas kaŝita alie ).
  if ( objektaAntauxRenderilo && objektaAntauxGrupo && objektaModo ) {
    objektaAntauxGrupo.rotation.y = performance.now() / 1000 * 0.4;
    objektaAntauxRenderilo.render(objektaAntauxSceno, objektaAntauxFotilo);
  }
  requestAnimationFrame(buklo);
}

// ════════════════════════ Klavara movado ════════════════════════
// WASD/aroj movas la fotilon en la 3D-vido ( kaj la mapon en la 2D-vido ),
// Q/E supren/malsupren en la 3D-vido, +/- zomas la 2D-vidon, Shift rapidigas.
// La tenataj klavoj kolektiĝas en la aro kaj aplikiĝas cxiun kadron en
// moviKlavare ( la ludo mem uzas la saman ŝablonon ).
const prematajKlavoj = new Set();
function moviKlavare(){
  if ( !triaDimensia ) {
    // 2D-mapo — WASD/aroj trenas la mapon, +/- zomas.
    const rapido = prematajKlavoj.has("Shift") ? 4 : 1.6;
    const paŝo = rapido / vidSkalo;
    let sxangxo = false;
    if ( prematajKlavoj.has("w") || prematajKlavoj.has("ArrowUp") ) { vidCZ += paŝo; sxangxo = true; }
    if ( prematajKlavoj.has("s") || prematajKlavoj.has("ArrowDown") ) { vidCZ -= paŝo; sxangxo = true; }
    if ( prematajKlavoj.has("a") || prematajKlavoj.has("ArrowLeft") ) { vidCX += paŝo; sxangxo = true; }
    if ( prematajKlavoj.has("d") || prematajKlavoj.has("ArrowRight") ) { vidCX -= paŝo; sxangxo = true; }
    if ( prematajKlavoj.has("zomi") ) { vidSkalo = Math.min(4, vidSkalo * 1.04); sxangxo = true; }
    if ( prematajKlavoj.has("malzomi") ) { vidSkalo = Math.max(minimaSkalo(), vidSkalo * 0.96); sxangxo = true; }
    if ( sxangxo ) bezonoDesegno = true;
    return;
  }
  if ( !bildilo3d || !regiloj3d ) return;
  // 3D-vido — movu kaj la fotilon kaj la orbitan celon, por ke la vido
  // glitu sen turniĝi. La rapido sekvas la distancon al la celo, do malproksima
  // vido moviĝas pli rapide ol proksima.
  const disto = fotilo3d.position.distanceTo(regiloj3d.target);
  const rapido = ( prematajKlavoj.has("Shift") ? 3 : 1 ) * Math.max(1, disto * 0.02);
  const antaŭen = new THREE.Vector3().subVectors(regiloj3d.target, fotilo3d.position);
  antaŭen.y = 0;
  if ( antaŭen.lengthSq()< 1e-6 ) antaŭen.set(0, 0, -1);
  antaŭen.normalize();
  // La dekstra vektoro — kruco ( antaŭen × supren ) kun Y-supren. ( -fz, 0, fx ).
  const dekstren = new THREE.Vector3(-antaŭen.z, 0, antaŭen.x);
  const movo = new THREE.Vector3();
  if ( prematajKlavoj.has("w") || prematajKlavoj.has("ArrowUp") ) movo.addScaledVector(antaŭen, rapido);
  if ( prematajKlavoj.has("s") || prematajKlavoj.has("ArrowDown") ) movo.addScaledVector(antaŭen, -rapido);
  if ( prematajKlavoj.has("d") || prematajKlavoj.has("ArrowRight") ) movo.addScaledVector(dekstren, rapido);
  if ( prematajKlavoj.has("a") || prematajKlavoj.has("ArrowLeft") ) movo.addScaledVector(dekstren, -rapido);
  if ( prematajKlavoj.has("e") ) movo.y += rapido * 0.8;
  if ( prematajKlavoj.has("q") ) movo.y -= rapido * 0.8;
  if ( movo.lengthSq()=== 0 ) return;
  regiloj3d.target.add(movo);
  fotilo3d.position.add(movo);
  // Limoj — tenu la celon super la valo ( la krado estas -384..384 ).
  // Limoj — tenu la celon super la krado ( ±MONDO_HALFO ) — la tera meŝo kaj
  // la skulptado finigxas tie.
  regiloj3d.target.x = Math.max(-MONDO_HALFO, Math.min(MONDO_HALFO, regiloj3d.target.x));
  regiloj3d.target.z = Math.max(-MONDO_HALFO, Math.min(MONDO_HALFO, regiloj3d.target.z));
  regiloj3d.target.y = Math.max(-0o40, Math.min(0o300, regiloj3d.target.y));
}

// ════════════════════════ 3D-vido kaj redaktado ════════════════════════
let triaDimensia = false;             // ĉu la 3D-vido montriĝas
let bildilo3d = null;                 // THREE.WebGLRenderer
let sceno3d = null, fotilo3d = null, regiloj3d = null;
let teraMesh = null, akvaMesh = null;
let ringaObjekto = null;
let radiaTreno = null;                // 3D-penika treno ( { lastX, lastZ, ix0, ... } )
let radiaPunkto = null;               // la lasta radia trafo sur la tereno
// La VERAJ 3D-meshxoj de la metitaj objektoj — konstruitaj per la samaj
// konstruantoj kiel la ludo. objektaGrupo2D sidas en la bake-sceno ( la
// suprajn vido por la 2D-mapo, kiel la plena mapo de la ludo );
// objektaGrupo3D sidas en la 3D-vido ( la vera 3D-aspekto ).
let objektaGrupo2D = null;
let objektaGrupo3D = null;
let objektaBakaSceno = null;
let kradaGrupo3D = null;              // la 3D-aspekto de la krada urbo ( nur en la Krado-langeto )
let kradaStaciaGrupo3D = null;        // la STACIAJ kradaj vojoj ( la etendaĵoj de la mond-vojoj ) — kaŝiĝas dum la Vojoj sub-langeto, ĉar la VERAJ mond-vojoj montriĝas tie
let vojaGrupo3D = null;               // la 3D-aspekto de la mond-nivelaj vojoj ( nur en la Vojoj sub-langeto )
let objektaBakaFotilo = null;
let objektaBakaRenderilo = null;
let objektaBakaKanvaso = null;
const YTROIGO = 0o24/0o10;            // 2.5 — vertikala troigo por la reliefo
const RINGA_PUNKTOJ = 0o100;          // 64 — segmentoj de la penika ringo
const mapo3d = document.getElementById("mapo3d");
// La loka stilfolio ( stiloj.css ) plenigas la larghon kaj tondas la
// WebGL-bildon al la rondaj anguloj.
mapo3d.style.cursor = "crosshair";
mapo3d.style.touchAction = "none";
mapo3d.style.display = "none";

// akvaNiveloDe — la akva nivelo por kradĉelo ( i, j ) ĉe ( x, z ). la natura
// nivelo por natura akvo, la agordebla nivelo por pentrita masko, alie nenio.
function akvaNiveloDe(i, j, x, z) {
  if ( naturaAkvoEn(x, z) ) return akvaNivelo(x, z);
  if ( masko[j * N + i] ) return akvaNiveloValoro;
  return null;
}

// konstrui3DIndeksojn — la triangula krado por ( N + 1 )² verticoj. La
// diagonaloj ALTERNIGAS per ĉelo ( ŝaktabulo ), por ke la montodeklivoj ne
// montru longajn krestojn laŭ unu konsekvenca diagonalo.
function konstrui3DIndeksojn(){
  const N1 = N + 1;
  const indeksoj = new Uint32Array(N * N * 6);
  let k = 0;
  for ( let j = 0; j < N; j++ ) {
    for ( let i = 0; i < N; i++ ) {
      const a = j * N1 + i;
      const b = a + 1;
      const c = a + N1;
      const d = c + 1;
      if ( ( i + j ) % 2 === 0 ) {
        // Kontraŭhorloĝa vidata de supre — la antaŭaj flankoj ( normalo +y )
        // rigardu la fotilon, por ke kaj la bildigo kaj la radia trafo trovu ilin.
        indeksoj[k++] = a; indeksoj[k++] = c; indeksoj[k++] = d;
        indeksoj[k++] = a; indeksoj[k++] = d; indeksoj[k++] = b;
      } else {
        // La alia diagonalo — rompas la konsekvencajn krestojn. Same
        // kontraŭhorloĝa vidata de supre ( normalo +y ).
        indeksoj[k++] = a; indeksoj[k++] = c; indeksoj[k++] = b;
        indeksoj[k++] = c; indeksoj[k++] = d; indeksoj[k++] = b;
      }
    }
  }
  return indeksoj;
}

// inicializi3DKradon — la horizontala krado ( x, z ) de la verticoj.
function inicializi3DKradon(geometrio) {
  const N1 = N + 1;
  const poz = geometrio.attributes.position;
  for ( let j = 0; j <= N; j++ ) {
    const z = Z0 + j * PASO;
    for ( let i = 0; i <= N; i++ ) {
      const v = ( j * N1 + i ) * 3;
      poz.array[v] = X0 + i * PASO;
      poz.array[v + 2] = z;
    }
  }
}

function eniri3D(){
  if ( bildilo3d ) return;
  try {
    sceno3d = new THREE.Scene();
    // Ĉielo — vertikala gradiento ( la samaj tonoj kiel la ludo ) kaj nebulo
    // kiu kunfandas la malproksiman terenon kun la horizonto.
    const cieloK = document.createElement("canvas");
    cieloK.width = 2; cieloK.height = 0o200;
    const ck = cieloK.getContext("2d");
    const cieloGradiento = ck.createLinearGradient(0, 0, 0, 0o200);
    cieloGradiento.addColorStop(0, "#70a8d8");
    cieloGradiento.addColorStop(0o5/0o10, "#a8d0e8");
    cieloGradiento.addColorStop(1, "#e0f0f0");
    ck.fillStyle = cieloGradiento;
    ck.fillRect(0, 0, 2, 0o200);
    const cieloTeksajxo = new THREE.CanvasTexture(cieloK);
    cieloTeksajxo.colorSpace = THREE.SRGBColorSpace;
    sceno3d.background = cieloTeksajxo;
    sceno3d.fog = new THREE.Fog(0xe0f0f0, 0o1000, 0o3000);
    fotilo3d = new THREE.PerspectiveCamera(50, 1, 1, 0o4770);
    fotilo3d.position.set(0o400, 0o300, 0o400);   // ( 256, 192, 256 )
    bildilo3d = new THREE.WebGLRenderer({ canvas: mapo3d, antialias: true });
    // Lumo — hema ĉiela lumo kaj suno el la nordokcidento.
    const hemo = new THREE.HemisphereLight(0xb8d8e8, 0x384838, 0.9);
    sceno3d.add(hemo);
    const suno = new THREE.DirectionalLight(0xf8f0d8, 1.1);
    suno.position.set(-0o400, 0o470, 0o300);      // ( -256, 312, 192 )
    sceno3d.add(suno);
    sceno3d.add(new THREE.AmbientLight(0x404848, 0.4));
    // La tera meŝo — la sama krado kiel la skulpto, kun vertikalaj koloroj.
    const N1 = N + 1;
    const geometrio = new THREE.BufferGeometry();
    geometrio.setAttribute("position", new THREE.BufferAttribute(new Float32Array(N1 * N1 * 3), 3));
    geometrio.setAttribute("color", new THREE.BufferAttribute(new Float32Array(N1 * N1 * 3), 3));
    geometrio.setIndex(new THREE.BufferAttribute(konstrui3DIndeksojn(), 1));
    inicializi3DKradon(geometrio);
    teraMesh = new THREE.Mesh(geometrio, new THREE.MeshStandardMaterial({
      vertexColors: true, roughness: 0.92, metalness: 0,
    }));
    sceno3d.add(teraMesh);
    // La akvo — travidebla ebeno sekvanta la nivelojn; senakvaj ĉeloj estas
    // mergitaj sub la terenon por ne videbli.
    const akvaGeometrio = new THREE.BufferGeometry();
    akvaGeometrio.setAttribute("position", new THREE.BufferAttribute(new Float32Array(N1 * N1 * 3), 3));
    akvaGeometrio.setIndex(new THREE.BufferAttribute(konstrui3DIndeksojn(), 1));
    inicializi3DKradon(akvaGeometrio);
    // La akvo estas duon-travidebla, por ke la kolorigita fundo ( kaj la
    // skulptado sub la surfaco ) videblu dum redaktado.
    akvaMesh = new THREE.Mesh(akvaGeometrio, new THREE.MeshStandardMaterial({
      color: 0x287888, transparent: true, opacity: 0.55,
      roughness: 0.15, metalness: 0.1, side: THREE.DoubleSide,
    }));
    akvaMesh.renderOrder = 1;
    sceno3d.add(akvaMesh);
    // Normoj por ambaŭ meŝoj — MeshStandardMaterial postulas la atributon ĉe
    // la unua bildigo ( gxisdatigi3DMeshon rekomputas la teron ĉiufoje ).
    geometrio.computeVertexNormals();
    akvaGeometrio.computeVertexNormals();
    // La penika ringo — sekvas la terenon ĉe la kursoro.
    const ringaGeometrio = new THREE.BufferGeometry();
    ringaGeometrio.setAttribute("position", new THREE.BufferAttribute(new Float32Array(( RINGA_PUNKTOJ + 1 ) * 3), 3));
    ringaObjekto = new THREE.Line(ringaGeometrio, new THREE.LineBasicMaterial({ color: 0xffffff }));
    ringaObjekto.visible = false;
    sceno3d.add(ringaObjekto);
    // La metitaj objektoj — la VERAJ 3D-meshxoj ( la samaj konstruantoj
    // kiel la ludo ), rekonstruitaj cxe cxiu sxangxo.
    objektaGrupo3D = new THREE.Group();
    sceno3d.add(objektaGrupo3D);
    rekonstruiObjektojn();
    // La krada urbo — la 3D-aspekto de la nuna aranĝo. Videbla nur dum la
    // Krado-langeto estas aktiva ( sxaltiIlTabon administras la videblecon ).
    kradaGrupo3D = new THREE.Group();
    kradaGrupo3D.visible = aktivaTabo === "krado";
    sceno3d.add(kradaGrupo3D);
    // La STACIAJ kradaj vojoj — la etendaĵoj de la mond-nivelaj vojoj ( la
    // doka avenuo ). Ili montriĝas kun la krado en la ĉel-redaktaj
    // sub-langetoj, sed KAŜIĜAS dum la Vojoj sub-langeto — tie la VERAJ
    // mond-vojoj montriĝas, kaj la staciaj duobliĝus sur la sama vojo.
    kradaStaciaGrupo3D = new THREE.Group();
    kradaStaciaGrupo3D.visible = aktivaTabo === "krado" && !vojojAktiva();
    sceno3d.add(kradaStaciaGrupo3D);
    rekonstruiKradon3D();
    // La mond-nivelaj vojoj — la VERAJ vojoj de la ludo ( dioritaj/andezitaj
    // strioj ), videblaj nur dum la Vojoj sub-langeto ( vojojAktiva ).
    vojaGrupo3D = new THREE.Group();
    vojaGrupo3D.visible = vojojAktiva();
    sceno3d.add(vojaGrupo3D);
    rekonstruiVojojn3D();
    // Orbito. Dekstra klako turnas, meza movas, rado zomas — la maldekstra
    // restas por la peniko.
    regiloj3d = new OrbitControls(fotilo3d, bildilo3d.domElement);
    regiloj3d.target.set(0, 0, 0);
    regiloj3d.enableDamping = true;
    regiloj3d.dampingFactor = 0.05;
    regiloj3d.minDistance = 0o60;                    // 48
    regiloj3d.maxDistance = 0o1400;                  // 768
    regiloj3d.maxPolarAngle = Math.PI * 0.48;
    regiloj3d.mouseButtons = { LEFT: -1, MIDDLE: THREE.MOUSE.PAN, RIGHT: THREE.MOUSE.ROTATE };
    regiloj3d.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };
    gxisdatigi3DMeshon({ ix0: 0, ix1: N - 1, iz0: 0, iz1: N - 1 });
  } catch ( eraro ) {
    console.error("La 3D-vido ne haveblas:", eraro);
    statuso("La 3D-vido ne haveblas");
    sxaltiVidon(false);
  }
}

// gxisdatigi3DMeshon — rekalkulu la altojn kaj kolorojn de la tera meŝo en la
// krada rektangulo g ( ix0..ix1, iz0..iz1, kradĉeloj ). La akvo sekvas.
function gxisdatigi3DMeshon(g) {
  if ( !teraMesh ) return;
  const N1 = N + 1;
  const poz = teraMesh.geometry.attributes.position;
  const kol = teraMesh.geometry.attributes.color;
  const ix0 = Math.max(0, g.ix0), ix1 = Math.min(N, g.ix1 + 1);
  const iz0 = Math.max(0, g.iz0), iz1 = Math.min(N, g.iz1 + 1);
  for ( let j = iz0; j <= iz1; j++ ) {
    const z = Z0 + j * PASO;
    for ( let i = ix0; i <= ix1; i++ ) {
      const x = X0 + i * PASO;
      const d = deltoj[Math.min(j, N - 1) * N + Math.min(i, N - 1)];
      const h = bazaAlteco(x, z) + d;
      const v = ( j * N1 + i ) * 3;
      poz.array[v + 1] = h * YTROIGO;
      const k = almetiBiomanNuancon(koloroDeAlto(h, x, z, d), x, z, d);
      kol.array[v] = k[0] / 255;
      kol.array[v + 1] = k[1] / 255;
      kol.array[v + 2] = k[2] / 255;
    }
  }
  poz.needsUpdate = true;
  kol.needsUpdate = true;
  gxisdatigi3DAkvon(g);
  teraMesh.geometry.computeVertexNormals();
}

// gxisdatigi3DAkvon — la akva nivelo por ĉiu vertico en la rektangulo.
// Senakvaj ĉeloj mergiĝas sub la terenon.
function gxisdatigi3DAkvon(g) {
  if ( !akvaMesh ) return;
  const N1 = N + 1;
  const poz = akvaMesh.geometry.attributes.position;
  const ix0 = Math.max(0, g.ix0), ix1 = Math.min(N, g.ix1 + 1);
  const iz0 = Math.max(0, g.iz0), iz1 = Math.min(N, g.iz1 + 1);
  for ( let j = iz0; j <= iz1; j++ ) {
    const z = Z0 + j * PASO;
    for ( let i = ix0; i <= ix1; i++ ) {
      const x = X0 + i * PASO;
      const v = ( j * N1 + i ) * 3;
      const niv = akvaNiveloDe(i, j, x, z);
      if ( niv === null ) {
        const d = deltoj[Math.min(j, N - 1) * N + Math.min(i, N - 1)];
        poz.array[v + 1] = ( bazaAlteco(x, z) + d - 0o20 ) * YTROIGO;
      } else {
        poz.array[v + 1] = niv * YTROIGO;
      }
    }
  }
  poz.needsUpdate = true;
}

// radiaTrafo — la radia trafo de la muso sur la tera meŝo ( aŭ nenio ).
const radiaRadio = new THREE.Raycaster();
const radiaMuso = new THREE.Vector2();
function radiaTrafo(e) {
  if ( !bildilo3d ) return null;   // la 3D-vido ankoraŭ ne pretas
  const rect = bildilo3d.domElement.getBoundingClientRect();
  radiaMuso.x = ( ( e.clientX - rect.left ) / rect.width ) * 2 - 1;
  radiaMuso.y = -( ( e.clientY - rect.top ) / rect.height ) * 2 + 1;
  // La matrico de la fotilo komponigxas nur cxe la bildigo — gxisdatigu gxin
  // antaux la radia trafo, por ke la unua klako trafu precize.
  regiloj3d.update();
  fotilo3d.updateMatrixWorld();
  radiaRadio.setFromCamera(radiaMuso, fotilo3d);
  const trafoj = radiaRadio.intersectObject(teraMesh, false);
  return trafoj.length > 0 ? trafoj[0].point : null;
}

// gxisdatigiRingon — la penika ringo sekvas la terenon ĉe la radia punkto.
function gxisdatigiRingon(p) {
  if ( !ringaObjekto ) return;
  if ( !p ) { ringaObjekto.visible = false; return; }
  const r = objektaModo ? 1.5 : radiuso();
  const poz = ringaObjekto.geometry.attributes.position.array;
  for ( let a = 0; a <= RINGA_PUNKTOJ; a++ ) {
    const ang = a / RINGA_PUNKTOJ * Math.PI * 2;
    const x = p.x + Math.cos(ang) * r;
    const z = p.z + Math.sin(ang) * r;
    const h = bazaAlteco(x, z) + deltoInterp(x, z);
    poz[a * 3] = x;
    poz[a * 3 + 1] = h * YTROIGO;
    poz[a * 3 + 2] = z;
  }
  ringaObjekto.geometry.attributes.position.needsUpdate = true;
  ringaObjekto.geometry.setDrawRange(0, RINGA_PUNKTOJ + 1);
  ringaObjekto.visible = true;
}

// gxisdatigi3DnIlon — la ilo ŝanĝis. En Movigi ✋ la maldekstra klako turnas
// la fotilon ( OrbitControls ) kaj la skulptado estas ŝlosita; en la penikoj
// la maldekstra restas por la skulptado ( LEFT. -1 malŝaltas la turnon ).
function gxisdatigi3DnIlon(){
  if ( !regiloj3d ) return;
  // La objekta ilo kondutas kiel peniko — la maldekstra klako metas objektojn,
  // ne turnas la fotilon ( eĉ se la lasta peniko estis Movigi ✋ ).
  const moviga = cxuMovigi() && !objektaModo;
  regiloj3d.mouseButtons.LEFT = moviga ? THREE.MOUSE.ROTATE : -1;
  if ( moviga ){
    radiaTreno = null;
    platigaCelo = null;
    gxisdatigiRingon(null);
  }
}

// La 3D-peniko — maldekstra klako kaj treno skulptas rekte sur la reliefo
// ( krom en la vido-ilo Movigi ✋, kiu turnas la fotilon ).
function peniko3dKomenci(e) {
  if ( e.button !== 0 || e.pointerType === "touch" ) return;
  // La objekta ilo — la sub-ilo decidas la klakon ( same kiel sur la 2D-mapo ).
  // Meti ➕ metas, Movu ✋ kaptas por treni, Forigi 🗑️ forigas.
  if ( objektaModo ) {
    const p = radiaTrafo(e);
    if ( !p ) return;
    if ( objektaIlo === "movigi" ) {
      const ind = objektoCxePunkto(p.x, p.z);
      if ( ind >= 0 ) komenciObjektanTrenon(ind, p.x, p.z);
    } else if ( objektaIlo === "forigi" ) {
      const ind = objektoCxePunkto(p.x, p.z);
      if ( ind >= 0 ) forigiObjekton(ind);
    } else {
      metiObjekton(p.x, p.z);
    }
    return;
  }
  if ( cxuMovigi() ){ mapo3d.style.cursor = "grabbing"; return; }
  // La Krado-langeto redaktas nur sur la 2D-mapo — la 3D-vido ne skulptu.
  if ( aktivaTabo === "krado" ) return;
  const p = radiaTrafo(e);
  if ( !p ) return;
  e.preventDefault();
  momenti();
  platigaCelo = penikoAktiva === "platigi" ? bazaAlteco(p.x, p.z) + deltoInterp(p.x, p.z) : null;
  radiaTreno = { lastX: p.x, lastZ: p.z, ix0: 1e9, ix1: -1e9, iz0: 1e9, iz1: -1e9, tuŝitaj: new Map()};
  peniko3dPasxo(p.x, p.z);
}
function peniko3dMovi(e) {
  if ( cxuMovigi() && !objektaModo ) return;   // la orbito mem movas la fotilon
  const p = radiaTrafo(e);
  radiaPunkto = p;
  gxisdatigiRingon(p);
  if ( objektaModo ) {
    gxisdatigiKoordinatojn(p ? p.x : null, p ? p.z : null);
    // Movu ✋ — la kaptita objekto sekvas la radian punkton.
    if ( objektaTrenata >= 0 && p ) sxangiObjektanPozicion(objektaTrenata, p.x, p.z);
  }
  if ( !radiaTreno || !p ) return;
  peniko3dPasxo(p.x, p.z);
}
function peniko3dFini(){
  radiaTreno = null;
  platigaCelo = null;
  finiObjektanTrenon();
  if ( cxuMovigi() )mapo3d.style.cursor = "grab";
}
function peniko3dPasxo(cx, cz) {
  const t = radiaTreno;
  const disto = Math.hypot(cx - t.lastX, cz - t.lastZ);
  const pasoj = Math.max(1, Math.ceil(disto / 0.6));
  for ( let k = 1; k <= pasoj; k++ ) {
    const px = t.lastX + ( cx - t.lastX ) * k / pasoj;
    const pz = t.lastZ + ( cz - t.lastZ ) * k / pasoj;
    const g = penikoApliki(px, pz, radiuso(), forto(), penikoAktiva, t.tuŝitaj);
    t.ix0 = Math.min(t.ix0, g.ix0); t.ix1 = Math.max(t.ix1, g.ix1);
    t.iz0 = Math.min(t.iz0, g.iz0); t.iz1 = Math.max(t.iz1, g.iz1);
  }
  // La malnova punkto antaŭ la gxisdatigo — la 2D-pentrado kovru la tutan
  // vojon ( samkiel en penikoPasxo ).
  const deX = t.lastX, deZ = t.lastZ;
  t.lastX = cx; t.lastZ = cz;
  sxangxita = true;
  statuso("Nesavitaj ŝanĝoj");
  const r = radiuso();
  const px0 = Math.max(0, Math.min(REZ - 1, mondoxAlPikselo(Math.max(deX, cx) + r + 1)));
  const px1 = Math.max(0, Math.min(REZ - 1, mondoxAlPikselo(Math.min(deX, cx) - r - 1)));
  const py0 = Math.max(0, Math.min(REZ - 1, mondozAlPikselo(Math.max(deZ, cz) + r + 1)));
  const py1 = Math.max(0, Math.min(REZ - 1, mondozAlPikselo(Math.min(deZ, cz) - r - 1)));
  rekalkuliDeklivojn(px0 - 2, py0 - 2, px1 + 2, py1 + 2);
  pentri(px0, py0, px1, py1);
  bezonoDesegno = true;
  gxisdatigi3DMeshon({ ix0: t.ix0, ix1: t.ix1, iz0: t.iz0, iz1: t.iz1 });
}
mapo3d.addEventListener("pointerdown", peniko3dKomenci);
mapo3d.addEventListener("pointermove", peniko3dMovi);
mapo3d.addEventListener("pointerup", peniko3dFini);
mapo3d.addEventListener("pointercancel", peniko3dFini);
mapo3d.addEventListener("pointerleave", () => gxisdatigiRingon(null));

// gxisdatigi3DnPostPlena — plena 3D-gxisdatigo post malfari/refari aŭ ŝarĝo.
function gxisdatigi3DnPostPlena(){
  if ( !triaDimensia ) return;
  gxisdatigi3DMeshon({ ix0: 0, ix1: N - 1, iz0: 0, iz1: N - 1 });
  gxisdatigiRingon(radiaPunkto);
}

// sxaltiVidon — ŝaltu inter la 2D-mapo kaj la 3D-reliefo.
function sxaltiVidon(tria) {
  triaDimensia = tria;
  document.getElementById("vido2d").setAttribute("aria-pressed", String(!tria));
  document.getElementById("vido3d").setAttribute("aria-pressed", String(tria));
  mapo.style.display = tria ? "none" : "";
  mapo3d.style.display = tria ? "" : "none";
  if ( tria ) {
    eniri3D();
    gxisdatigi3DnIlon();
    gxisdatigiKursoro();
    if ( bildilo3d ) {
      const rect = mapo3d.getBoundingClientRect();
      // updateStyle=false — la CSS-larĝo ( 100% ) restu, nur la bilda bufro
      // sekvas la ujon ( alie la fiksitaj pikseloj rompus la plenan larĝon ).
      bildilo3d.setSize(rect.width, rect.height, false);
      fotilo3d.aspect = rect.width / rect.height;
      fotilo3d.updateProjectionMatrix();
      gxisdatigi3DnPostPlena();
    }
  } else {
    gxisdatigiKursoro();
  }
}
document.getElementById("vido2d").addEventListener("click", () => sxaltiVidon(false));
document.getElementById("vido3d").addEventListener("click", () => sxaltiVidon(true));
window.addEventListener("resize", () => {
  if ( triaDimensia && bildilo3d ) {
    const rect = mapo3d.getBoundingClientRect();
    bildilo3d.setSize(rect.width, rect.height, false);
    fotilo3d.aspect = rect.width / rect.height;
    fotilo3d.updateProjectionMatrix();
  }
});

// ════════════════════════ Eventoj ════════════════════════
function mondoDeEvento(e) {
  const rect = mapo.getBoundingClientRect();
  const px = ( e.clientX - rect.left ) * ( mapo.width / rect.width );
  const py = ( e.clientY - rect.top ) * ( mapo.height / rect.height );
  return {
    x: vidCX + ( mapo.width / 2 - px ) / vidSkalo,
    z: vidCZ + ( mapo.height / 2 - py ) / vidSkalo,
  };
}
function gxisdatigiKursoro(){
  // La vido-ilo montras prenan manon; la penikoj kaj la objekta ilo montras celkrucon.
  const prenanta = cxuMovigi() && !objektaModo;
  mapo.style.cursor = prenanta ? "grab" : "crosshair";
  mapo3d.style.cursor = prenanta ? "grab" : "crosshair";
}
mapo.addEventListener("pointerdown", ( e ) => {
  try { mapo.setPointerCapture(e.pointerId); } catch { /* sinteza okazaĵo */ }
  const m = mondoDeEvento(e);
  // Movigi ✋ trenas la mapon per la maldekstra klako; la dekstra kaj Shift
  // trenas cxiame. Dum la tenado la mano "kaptas" la mapon ( la objekta ilo
  // metas objektojn per la maldekstra klako, do gxi ne trenas ).
  if ( e.button === 1 || e.shiftKey || ( e.button === 0 && cxuMovigi() && !objektaModo ) ){
    treno = { tipo: "mov", lastX: e.clientX, lastY: e.clientY };
    if ( cxuMovigi() )mapo.style.cursor = "grabbing";
    e.preventDefault();
    return;
  }
  if ( e.button !== 0 ) return;
  // La Vojoj sub-langeto de la Krado-panelo — la klako elektas/movas
  // punktojn kaj dokojn sur la mapo ( la sub-ilo decidas ); NENIA terena
  // peniko.
  if ( vojojAktiva() ) {
    sxangxiVojanCelon(m.x, m.z);
    return;
  }
  // La Krado-langeto — la klako redaktas la ĉelan tipon ( la paletro
  // elektas la tipon; Aŭtomata ⚙️ resendas al la generita aŭ forigas ).
  // NENIA terena peniko — la krado ne ŝanĝas la teron.
  if ( aktivaTabo === "krado" ) {
    // Klako sur urba markilo elektas la urbon; klako sur ALDONAN blokon
    // elektas gxin ( kaj kaptas gxin por treni ); alie la klako redaktas la
    // ĉelan tipon.
    const u = urboCxePunkto(m.x, m.z);
    if ( u >= 0 ) { elektiUrbon(u); return; }
    const ab = aldonaBlokoCxePunkto(m.x, m.z);
    if ( ab >= 0 ) {
      elektitaAldonaBloko = ab;
      komenciAldonaTrenon(ab);
      gxisdatigiAldonaBlokojn();
      return;
    }
    sxangxiKradanCelon(m.x, m.z);
    return;
  }
  // La objekta ilo — la sub-ilo decidas la klakon. Meti ➕ metas novan
  // objekton sur libera tero ( kaj ELEKTAS proksiman, la blanka ringo ),
  // Movu ✋ kaptas objekton por treni, Forigi 🗑️ forigas per klako.
  if ( objektaModo ) {
    if ( objektaIlo === "movigi" ) {
      const ind = objektoCxePunkto(m.x, m.z);
      if ( ind >= 0 ) komenciObjektanTrenon(ind, m.x, m.z);
      return;
    }
    if ( objektaIlo === "forigi" ) {
      const ind = objektoCxePunkto(m.x, m.z);
      if ( ind >= 0 ) forigiObjekton(ind);
      return;
    }
    const ind = objektoCxePunkto(m.x, m.z);
    if ( ind >= 0 ) {
      elektitaObjekto = elektitaObjekto === ind ? -1 : ind;
      gxisdatigiObjektoListon();
      sxargiObjektajnEnigojn();
      bezonoDesegno = true;
    } else {
      metiObjekton(m.x, m.z);
    }
    return;
  }
  momenti();
  platigaCelo = penikoAktiva === "platigi" ? bazaAlteco(m.x, m.z) + deltoInterp(m.x, m.z) : null;
  treno = { tipo: "peniko", lastX: m.x, lastZ: m.z, tuŝitaj: new Map()};
  penikoPasxo(m.x, m.z);
});
mapo.addEventListener("pointermove", ( e ) => {
  const m = mondoDeEvento(e);
  kursoro = m;
  // La Krado-langeto — la kaptita ALDONA bloko sekvas la kursoron ( algluita
  // al 0.5 ) dum la treno sur la mapo.
  if ( aktivaTabo === "krado" && aldonaTrenata >= 0 ) {
    sxangiAldonaPozicion(m.x, m.z);
    return;
  }
  // La Vojoj sub-langeto — la kaptita punkto/doko sekvas la kursoron
  // ( algluita al 0.5 ) dum Elektu/Movu ✋.
  if ( vojojAktiva() && vojaTrenata ) {
    sxangiVojaPozicion(m.x, m.z);
    return;
  }
  if ( objektaModo ) {
    gxisdatigiKoordinatojn(m.x, m.z);
    // Movu ✋ — la kaptita objekto sekvas la kursoron ( algluita al 0.25 ).
    if ( objektaTrenata >= 0 ) sxangiObjektanPozicion(objektaTrenata, m.x, m.z);
  }
  if ( treno && treno.tipo === "mov" ) {
    const dx = e.clientX - treno.lastX, dy = e.clientY - treno.lastY;
    treno.lastX = e.clientX; treno.lastY = e.clientY;
    vidCX += dx / vidSkalo;
    vidCZ += dy / vidSkalo;
    bezonoDesegno = true;
    return;
  }
  if ( treno && treno.tipo === "peniko" ) {
    penikoPasxo(m.x, m.z);
    return;
  }
  bezonoDesegno = true;
});
function finiTrenon(){
  treno = null;
  platigaCelo = null;
  finiObjektanTrenon();
  finiVojaTrenon();
  finiAldonaTrenon();
  if ( cxuMovigi() )mapo.style.cursor = "grab";
}
mapo.addEventListener("pointerup", finiTrenon);
mapo.addEventListener("pointercancel", finiTrenon);
mapo.addEventListener("wheel", ( e ) => {
  e.preventDefault();
  const m = mondoDeEvento(e);
  // Glata zomo — la sama eksponenta faktoro kiel la plena mapo de la ludo
  // ( liniaj deltoj de kusenetoj ≈ 0o20 pikseloj po linio ), anstataŭ la
  // troa 1.5-oble po rado-paŝo.
  const delt = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
  const novaSkalo = Math.max(minimaSkalo(), Math.min(4, vidSkalo * Math.exp(-delt * 0o1/0o2000)));
  const rect = mapo.getBoundingClientRect();
  const px = ( e.clientX - rect.left ) * ( mapo.width / rect.width );
  const py = ( e.clientY - rect.top ) * ( mapo.height / rect.height );
  vidCX = m.x + ( px - mapo.width / 2 ) / novaSkalo;
  vidCZ = m.z + ( py - mapo.height / 2 ) / novaSkalo;
  vidSkalo = novaSkalo;
  bezonoDesegno = true;
}, { passive: false });
mapo.addEventListener("dblclick", () => {
  vidCX = 0; vidCZ = 0;
  vidSkalo = minimaSkalo();
  bezonoDesegno = true;
});

// ════════════════════════ Interfaco ════════════════════════
const radiusoRegilo = document.getElementById("radiuso");
const fortoRegilo = document.getElementById("forto");
const niveloRegilo = document.getElementById("akvaNivelo");
let sxangxita = false;
function statuso(teksto) {
  document.getElementById("statuso").textContent = teksto;
}
function gxisdatigiValorojn(){
  document.getElementById("radiusoValoro").textContent = radiuso()+ " un";
  document.getElementById("fortoValoro").textContent = forto().toFixed(2);
  document.getElementById("niveloValoro").textContent = niveloRegilo.value + " un";
}
// ⟪ La iloj-langetoj 📃 ⟫ — Tereno 🏔️, Biomo 🎨, Animaloj 🐾 kaj Objektoj 🎯
// estas langetoj de la sama karto. La tereno-langeto tenas la penikojn
// ( levi, malsuprenigi, platigi, glatigi, akvo, forviŝi — la vido-Movigi ✋
// loĝas en la ilo-karto, ekster la langetoj ); la biomo- kaj
// animalo-langetoj tenas siajn paletrojn; la objekto-langeto sxaltas la
// objektan ilon ( la objekto-panelo estas PROPRIA thala-karto, kaj la
// agordoj aperas anstatauxe kiam la objekto-langeto estas fermita ).
const ilTaboj = document.querySelectorAll("#ilTaboj button");
const terenaro = document.getElementById("terenaro");
const biomaro = document.getElementById("biomaro");
const bestaro = document.getElementById("bestaro");
let aktivaTabo = "tereno";
function sxaltiIlTabon(tabo) {
  aktivaTabo = tabo;
  ilTaboj.forEach(b => { if ( b.dataset.iltabo ) b.setAttribute("aria-pressed", String(b.dataset.iltabo === tabo)); });
  // La paneloj estas thala/sabosuc2w2q — la temo donas al ili display.flex,
  // kiu superregus la hidden-atributon, do la kaŝo estas la kobe-klaso.
  terenaro.classList.toggle("kobe", tabo !== "tereno");
  biomaro.classList.toggle("kobe", tabo !== "biomo");
  bestaro.classList.toggle("kobe", tabo !== "animaloj");
  // La ĉel-paletro montriĝas nur en la ĉel-redaktaj sub-langetoj de la
  // Krado-panelo — dum la Vojoj sub-langeto gxi kaŝiĝas.
  kradaro.classList.toggle("kobe", tabo !== "krado" || kradoSubTaboAktiva() === "vojoj");
  kradoPanel.classList.toggle("kobe", tabo !== "krado");
  // La mond-nivelaj vojoj en la 3D-vido — nur dum la Vojoj sub-langeto.
  if ( vojaGrupo3D ) vojaGrupo3D.visible = vojojAktiva();
  // La krada urbo en la 3D-vido — montriĝas nur en la Krado-langeto ( la
  // vojoj en la grupo kaj la konstruaĵoj rekte en la sceno ). La STACIAJ
  // etendaĵoj ( la mond-vojoj kiel kradaj vojoj ) montriĝas kun la krado,
  // sed KAŜIĜAS dum la Vojoj sub-langeto — la VERAJ mond-vojoj montriĝas tie.
  if ( kradaGrupo3D ) kradaGrupo3D.visible = tabo === "krado";
  if ( kradaStaciaGrupo3D ) kradaStaciaGrupo3D.visible = tabo === "krado" && !vojojAktiva();
  krada3DKonstruajxoj.forEach(o => { o.visible = tabo === "krado"; });
  // La terenaj agordoj ( radiuso, forto, nivelo ) estas por la penikoj — la
  // objekto-panelo kaj la krado/vojoj-paneloj havas siajn proprajn kartojn.
  // sxaltiObjektojn administras la agordojn por la objekto-langeto; ĉi tie
  // nur la krado/vojoj ( kaj la ceteraj langetoj revenigas la agordojn ).
  if ( tabo === "krado" ) agordojPanel.classList.add("kobe");
  else if ( tabo !== "objektoj" ) agordojPanel.classList.remove("kobe");
}
// gxisdatigiPenikaron — la aktiva-ilo reliefigo tra la langetoj, la
// tereno-butenoj kaj la vido-Movigi butono ( la objekta ilo sxaltas la
// objekto-langeton ).
function gxisdatigiPenikaron() {
  const moviga = penikoAktiva === "movigi";
  document.querySelectorAll("#terenaro button").forEach(x =>
    x.setAttribute("aria-pressed", String(!objektaModo && x.dataset.peniko === penikoAktiva)));
  movigiIlo.setAttribute("aria-pressed", String(!objektaModo && moviga));
  // Dum la vido-Movigi estas aktiva, NENIU alia ilo restas reliefigita — la
  // movo estas la sola elektita ilo. La paletraj elektoj ( biomo, besto )
  // restas malfermitaj sed ne premitaj.
  document.querySelectorAll("#biomaro button, #bestaro button[data-besto]").forEach(x => {
    const speco = x.dataset.biomo !== undefined ? biomoAktiva : bestoAktiva;
    x.setAttribute("aria-pressed", String(!objektaModo && !moviga && parseInt(x.dataset.biomo !== undefined ? x.dataset.biomo : x.dataset.besto, 10) === speco));
  });
  document.querySelectorAll("#kradaro button").forEach(x =>
    x.setAttribute("aria-pressed", String(x.dataset.kradoTipo === kradoTipoElektita)));
  ilTaboj.forEach(b => {
    if ( !b.dataset.iltabo ) return;   // la vido-Movigi butono ne estas langeto
    const aktiva = objektaModo ? b.dataset.iltabo === "objektoj"
      : moviga ? false
      : aktivaTabo === "krado" ? b.dataset.iltabo === "krado"
      : penikoAktiva === "biomo" ? b.dataset.iltabo === "biomo"
      : penikoAktiva === "bestoj" ? b.dataset.iltabo === "animaloj"
      : b.dataset.iltabo === "tereno";
    b.setAttribute("aria-pressed", String(aktiva));
  });
}
ilTaboj.forEach(b => {
  b.addEventListener("click", () => {
    if ( !b.dataset.iltabo ) return;   // la vido-Movigi butono havas sian propran aganton
    const tabo = b.dataset.iltabo;
    if ( tabo === "objektoj" ) { sxaltiObjektojn(true); return; }
    if ( objektaModo ) sxaltiObjektojn(false);
    if ( tabo === "krado" ) penikoAktiva = "levi";   // la Krado-langeto ne estas peniko
    else if ( tabo === "biomo" ) penikoAktiva = "biomo";
    else if ( tabo === "animaloj" ) penikoAktiva = "bestoj";
    else if ( penikoAktiva === "biomo" || penikoAktiva === "bestoj" ) penikoAktiva = "levi";
    sxaltiIlTabon(tabo);
    gxisdatigiKradon();   // la statistikoj kaj la overlajo ĉiam aktualaj
    if ( tabo === "krado" ) {
      gxisdatigiAldonaBlokojn();
      // Reveninte al la Krado-panelo kun la Vojoj sub-langeto aktiva, la
      // voja regiloj refreŝiĝu.
      if ( kradoSubTaboAktiva() === "vojoj" ) gxisdatigiVojajnRegilojn();
    }
    gxisdatigiPenikaron();
    gxisdatigiAgordojn();
    gxisdatigiKursoro();
    gxisdatigi3DnIlon();
    pentri(0, 0, REZ - 1, REZ - 1);
    bezonoDesegno = true;
    if ( triaDimensia && teraMesh ) gxisdatigi3DMeshon({ ix0: 0, ix1: N - 1, iz0: 0, iz1: N - 1 });
  });
});
// kradoSubTaboAktiva / vojojAktiva — la aktiva sub-langeto de la Krado-panelo.
// La Vojoj redaktado loĝas EN la Krado-panelo ( sub-langeto, kiel la aldonaj
// blokoj ), sed la vojoj mem restas MOND-nivelaj — ili povos konekti plurajn
// urbojn estonte.
function kradoSubTaboAktiva() {
  const b = document.querySelector('#kradoSubTaboj button[aria-pressed="true"]');
  return b ? b.dataset.kradoSub : null;
}
function vojojAktiva() {
  return aktivaTabo === "krado" && kradoSubTaboAktiva() === "vojoj";
}
// La sub-langetoj de la Krado-panelo — Urboj/Redakti/Aldonaj blokoj/Vojoj
// kaj ( ene de la Vojoj sub-panelo ) Vojoj/Punktoj/Dokoj/Mapaj iloj. Cxiu
// butono havas data-krado-sub aux data-vojo-sub, kaj la sub-paneloj la
// respondan data-*-sub-panel. La statistikoj kaj la Helpo restas ekster la
// langetoj.
function sxaltiSubTabojn(prefikso) {
  const aktiva = document.querySelector(`#${prefikso}SubTaboj button[aria-pressed="true"]`);
  const tabo = aktiva ? aktiva.dataset[prefikso + "Sub"] : null;
  // La panelo estas `kradoPanel` aux `vojojPanel` — la lasta havas duoblan j.
  const panelo = document.getElementById(prefikso + "Panel") || document.getElementById(prefikso + "jPanel");
  panelo.querySelectorAll(`[data-${prefikso}-sub-panel]`).forEach(p => {
    // La sub-paneloj estas ciihii — la temo donas al ili display.flex, kiu
    // superregus la hidden-atributon, do la kaŝo estas la kobe-klaso.
    p.classList.toggle("kobe", p.dataset[prefikso + "SubPanel"] !== tabo);
  });
  // En la Krado-panelo la ĉel-paletro montriĝas nur por la ĉel-redaktaj
  // sub-langetoj — dum la Vojoj sub-langeto gxi kaŝiĝas ( la mapo redaktas
  // vojojn, ne ĉelojn ).
  if ( prefikso === "krado" && aktivaTabo === "krado" ) {
    document.getElementById("kradaro").classList.toggle("kobe", tabo === "vojoj");
    if ( vojaGrupo3D ) vojaGrupo3D.visible = vojojAktiva();
    if ( kradaStaciaGrupo3D ) kradaStaciaGrupo3D.visible = tabo !== "vojoj";
    if ( tabo === "vojoj" ) gxisdatigiVojajnRegilojn();
  }
}
document.querySelectorAll("#kradoSubTaboj button, #vojoSubTaboj button").forEach(b => {
  b.addEventListener("click", () => {
    const prefikso = b.dataset.kradoSub !== undefined ? "krado" : "vojo";
    const tabo = b.dataset[prefikso + "Sub"];
    document.querySelectorAll(`#${prefikso}SubTaboj button`).forEach(x => {
      const v = x.dataset[prefikso + "Sub"];
      if ( v ) x.setAttribute("aria-pressed", String(v === tabo));
    });
    sxaltiSubTabojn(prefikso);
    // La sub-langeto sxangxas la mapan desegnon ( la Vojoj sub-langeto
    // montras la vojojn/dokojn, la ceteraj la ĉelojn ) — necesa redesegno.
    bezonoDesegno = true;
  });
});
sxaltiSubTabojn("krado");
sxaltiSubTabojn("vojo");
// La vido-Movigi butono — la vido-ilo loĝas en la ilo-karto, ekster la
// langetoj. gxi sxaltas la movan reĝimon sen sxangxi la aktivan langeton.
// Alia klako ( aux ajna peniko/langeto ) revenigas la lastan penikon ( kaj
// la lastan langeton, se gxi estis biomo/animaloj ).
const movigiIlo = document.getElementById("movigiIlo");
let lastaPeniko = "levi";
let lastaMovigaTabo = null;
movigiIlo.addEventListener("click", () => {
  if ( objektaModo ) {
    sxaltiObjektojn(false);
    // Ferminte la objekto-panelon, la vido revenas al la tereno-langeto kun
    // la baza peniko ( la objekto-langeto ne havas penikon por reveni, kaj
    // la tereno-langeto postulas terenan penikon ).
    penikoAktiva = "levi";
    sxaltiIlTabon("tereno");
  }
  if ( penikoAktiva === "movigi" ) {
    penikoAktiva = lastaPeniko;
    // La memorita langeto validas nur por la langet-nomaj penikoj ( biomo,
    // bestoj ); la terenaj penikoj apartenas al la tereno-langeto.
    if ( lastaMovigaTabo && ( penikoAktiva === "biomo" || penikoAktiva === "bestoj" ) ) {
      sxaltiIlTabon(lastaMovigaTabo);
    } else if ( penikoAktiva !== "biomo" && penikoAktiva !== "bestoj" ) {
      sxaltiIlTabon("tereno");
    }
    lastaMovigaTabo = null;
  } else {
    // En la biomo-/animalo-langeto la peniko NOMAS la langeton ( biomo,
    // bestoj ) — konservu gxin tia, por ke la langeto restu reliefigita kiam
    // la movo finigxas. La terenaj penikoj revenas al la tereno-langeto.
    lastaPeniko = penikoAktiva;
    lastaMovigaTabo = penikoAktiva === "biomo" || penikoAktiva === "bestoj" ? aktivaTabo : null;
    penikoAktiva = "movigi";
  }
  gxisdatigiPenikaron();
  gxisdatigiAgordojn();
  gxisdatigiKursoro();
  gxisdatigi3DnIlon();
  pentri(0, 0, REZ - 1, REZ - 1);
  bezonoDesegno = true;
  if ( triaDimensia && teraMesh ) gxisdatigi3DMeshon({ ix0: 0, ix1: N - 1, iz0: 0, iz1: N - 1 });
});
// La terenaj penikoj — la penikoj de la tereno-langeto ( levi, malsuprenigi,
// platigi, glatigi, akvo, forviŝi ).
document.querySelectorAll("#terenaro button").forEach(b => {
  b.addEventListener("click", () => {
    if ( objektaModo ) sxaltiObjektojn(false);
    penikoAktiva = b.dataset.peniko;
    sxaltiIlTabon("tereno");
    gxisdatigiPenikaron();
    gxisdatigiAgordojn();
    gxisdatigiKursoro();
    gxisdatigi3DnIlon();
    // La biomo-nuanco dependas de la aktiva ilo ( nur la biomo-ilo montras
    // gxin ), do la bazaj koloroj kaj la 3D-tero rekolorigxas tutaj cxe cxiu
    // ilo-sxangxo — desegniVidon nur komponas la bazan kanvason, gxi ne
    // repentras gxin.
    pentri(0, 0, REZ - 1, REZ - 1);
    bezonoDesegno = true;
    if ( triaDimensia && teraMesh ) gxisdatigi3DMeshon({ ix0: 0, ix1: N - 1, iz0: 0, iz1: N - 1 });
  });
});
// ⟪ Biomaro ( la paletro de la biomo-langeto ) 📃 ⟫ — elektas KIUN biomon
// pentri. La biomo-langeto montras la paletron.
document.querySelectorAll("#biomaro button").forEach(b => {
  b.addEventListener("click", () => {
    biomoAktiva = parseInt(b.dataset.biomo, 10);
    document.querySelectorAll("#biomaro button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
    // La nuanco dependas de la elektita biomo — rekolorigu la vidon.
    pentri(0, 0, REZ - 1, REZ - 1);
    bezonoDesegno = true;
    if ( triaDimensia && teraMesh ) gxisdatigi3DMeshon({ ix0: 0, ix1: N - 1, iz0: 0, iz1: N - 1 });
  });
});
// ⟪ Bestaro ( la paletro de la animalo-langeto ) 📃 ⟫ — elektas KIUN bestan
// zonon pentri. La animalo-langeto montras la paletron.
document.querySelectorAll("#bestaro button[data-besto]").forEach(b => {
  b.addEventListener("click", () => {
    bestoAktiva = parseInt(b.dataset.besto, 10);
    document.querySelectorAll("#bestaro button[data-besto]").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
    // La vido montras nur la elektitan specion — rekolorigu la vidon.
    pentri(0, 0, REZ - 1, REZ - 1);
    bezonoDesegno = true;
    if ( triaDimensia && teraMesh ) gxisdatigi3DMeshon({ ix0: 0, ix1: N - 1, iz0: 0, iz1: N - 1 });
  });
});
// La forviŝo — la SAMA ilo kiel la pentrado. sxaltita per Forviŝi 🧽, la
// elektita specio forvisxigxas anstataŭ pentrigxas ( la ceteraj restas ).
const bestoForvisxoBtn = document.getElementById("bestoForvisxo");
bestoForvisxoBtn.addEventListener("click", () => {
  bestoForvisxa = !bestoForvisxa;
  bestoForvisxoBtn.setAttribute("aria-pressed", String(bestoForvisxa));
});

// ════════════════════════ Objektoj 🎯 ( la objekta ilo ) ════════════════════════
// APARTA ilo de la penikoj. gxi metas INDIVIDUAJN objektojn ( plantojn,
// bestojn, NPC-ojn ) cxe precizaj pozicioj kun ecoj, anstataŭ pentri tavolon.
// La panelo montras la elektitan specon, la ecojn, la vivajn koordinatojn de
// la kursoro kaj la liston de metitaj objektoj.
const objektoPanel = document.getElementById("objektoPanel");
const objektoSpeco = document.getElementById("objektoSpeco");
const objektoPropOJ = document.getElementById("objektoPropOJ");
const objektoListo = document.getElementById("objektoListo");
const koordinatajEl = document.getElementById("koordinatoj");
const objektaXEnigo = document.getElementById("objektaX");
const objektaZEnigo = document.getElementById("objektaZ");
const objektaMetuBtn = document.getElementById("objektaMetu");

// gxisdatigiKoordinatojn — la vivaj mondaj koordinatoj de la kursoro ( x, z
// kaj la tera alto y ), por ke oni vidu, KIE oni metas.
function gxisdatigiKoordinatojn(x, z) {
  if ( !koordinatajEl ) return;
  if ( x === null || z === null ) { koordinatajEl.textContent = "—"; return; }
  const h = bazaAlteco(x, z) + deltoInterp(x, z);
  const akva = maskoInterp(x, z) >= 0o1/0o2 || naturaAkvoEn(x, z);
  koordinatajEl.textContent = "x " + x.toFixed(2) + "   z " + z.toFixed(2)
    + "   y " + h.toFixed(2) + ( akva ? "   ( akvo )" : "" );
}

// metiObjekton — metu la elektitan objekton cxe la pozicio ( 0.25-algluita )
// kun la nunaj ecoj. La listo kaj la 3D-punktoj gxisdatigxas tuj.
function metiObjekton(x, z) {
  if ( Math.abs(x) > MONDO_HALFO || Math.abs(z) > MONDO_HALFO ) return;
  momenti();
  const o = { x: Math.round(x * 4) / 4, z: Math.round(z * 4) / 4, speco: objektoAktiva };
  for ( const k of Object.keys(objektoProp) ) o[k] = objektoProp[k];
  // La kanua stilo estas stringo en la datumaro ( "baza" | "satala" ),
  // la elektilo tenas indekson.
  if ( o.speco === "kanuo" ) o.stilo = objektoProp.stilo === 1 ? "satala" : "baza";
  objektoj.push(o);
  sxangxita = true;
  statuso("Nesavitaj ŝanĝoj");
  gxisdatigiObjektoListon();
  rekonstruiObjektojn();
  bezonoDesegno = true;
}

// objektoCxePunkto — la indekso de la plej proksima metita objekto ene de la
// elektada radiuso ( 8 ekranpikseloj je la nuna zomo ), aux -1. La mapklako
// en la objekta ilo ELEKTAS proksiman objekton anstataŭ meti novan.
function objektoCxePunkto(wx, wz) {
  const disto = Math.max(2.5, 8 / vidSkalo);
  let plej = -1, plejDisto = disto;
  for ( let i = 0; i < objektoj.length; i++ ) {
    const o = objektoj[i];
    const d = Math.hypot(o.x - wx, o.z - wz);
    if ( d < plejDisto ) { plejDisto = d; plej = i; }
  }
  return plej;
}

// forigiObjekton — forigu la objekton je la indekso ( la listo, la mapo kaj
// la 3D-vido gxisdatigxas; la forigo estas malfarebla ).
function forigiObjekton(i) {
  momenti();
  objektoj.splice(i, 1);
  if ( elektitaObjekto === i ) elektitaObjekto = -1;
  else if ( elektitaObjekto > i ) elektitaObjekto--;
  sxangxita = true;
  statuso("Nesavitaj ŝanĝoj");
  gxisdatigiObjektoListon();
  sxargiObjektajnEnigojn();
  rekonstruiObjektojn();
  bezonoDesegno = true;
}

// sxargiObjektajnEnigojn — la x/z-enigoj sekvas la elekton. elektinte
// objekton ili montras gxiajn koordinatojn kaj la butono movas gxin;
// alie la butono metas novan objekton cxe la tajpitaj koordinatoj.
function sxargiObjektajnEnigojn() {
  if ( !objektaXEnigo ) return;
  if ( elektitaObjekto >= 0 && elektitaObjekto < objektoj.length ) {
    const o = objektoj[elektitaObjekto];
    objektaXEnigo.value = o.x;
    objektaZEnigo.value = o.z;
    objektaMetuBtn.textContent = "Movu elektitan ➡️";
  } else {
    objektaMetuBtn.textContent = "Meti ĉe koordinatoj ➕";
  }
}
objektaMetuBtn.addEventListener("click", () => {
  const x = parseFloat(objektaXEnigo.value);
  const z = parseFloat(objektaZEnigo.value);
  if ( !isFinite(x) || !isFinite(z) ) { statuso("Enigu nombrojn por x kaj z"); return; }
  if ( Math.abs(x) > MONDO_HALFO || Math.abs(z) > MONDO_HALFO ) {
    statuso("La koordinatoj estas ekster la mondo");
    return;
  }
  if ( elektitaObjekto >= 0 && elektitaObjekto < objektoj.length ) {
    // Movu la elektitan objekton al la tajpitaj koordinatoj.
    momenti();
    const o = objektoj[elektitaObjekto];
    o.x = Math.round(x * 4) / 4;
    o.z = Math.round(z * 4) / 4;
    sxangxita = true;
    statuso("Objekto movita — nesavitaj ŝanĝoj");
    gxisdatigiObjektoListon();
    sxargiObjektajnEnigojn();
    rekonstruiObjektojn();
    bezonoDesegno = true;
  } else {
    metiObjekton(x, z);
  }
});

// La sub-iloj de la objekta ilo — Meti ➕ ( klako metas aŭ elektas ), Movu ✋
// ( trenu por movi objekton sur la mapo ) kaj Forigi 🗑️ ( klako forigas ).
document.querySelectorAll("#objektaIloj button").forEach(b => {
  b.addEventListener("click", () => {
    objektaIlo = b.dataset.objektaIlo;
    document.querySelectorAll("#objektaIloj button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  });
});
// komenciObjektanTrenon — kaptu objekton por Movu ✋ ( la movo estas
// malfarebla — la historio momentigxas cxe la kapto ).
function komenciObjektanTrenon(ind, x, z) {
  if ( objektaTrenata >= 0 ) return;
  momenti();
  objektaTrenata = ind;
  elektitaObjekto = ind;
  sxangxita = true;
  statuso("Nesavitaj ŝanĝoj");
  gxisdatigiObjektoListon();
  sxargiObjektajnEnigojn();
  sxangiObjektanPozicion(ind, x, z);
}
// sxangiObjektanPozicion — gxisdatigu la pozicion de objekto dum Movu ✋
// ( algluita al 0.25 ), rekonstruante la 3D-aspektojn.
function sxangiObjektanPozicion(ind, x, z) {
  const o = objektoj[ind];
  o.x = Math.round(x * 4) / 4;
  o.z = Math.round(z * 4) / 4;
  rekonstruiObjektojn();
  bezonoDesegno = true;
}
function finiObjektanTrenon() {
  if ( objektaTrenata < 0 ) return;
  objektaTrenata = -1;
  gxisdatigiObjektoListon();
  sxargiObjektajnEnigojn();
  bezonoDesegno = true;
}

// La konstruajxaj objektoj ( la objekta ilo metas individuajn satalojn ) —
// la samaj specoj kiel la krada paletro.
const OBJEKTO_KONSTRUAJXOJ = { sanktejo: 1, turo: 1, domo: 1, mangxejo: 1, kasafeo: 1, stacio: 1 };

// konstruiObjektonEn — konstruu la VERAN 3D-aspekton de unu metita objekto
// ( la samaj konstruantoj kiel la ludo ) kaj aldonu gxin al la grupo. La
// konstruantoj aldonas al sceno, do temp-sceno kolektas la meshxojn, kiuj
// transigxas al la grupo. La tera alto estas la troigita 3D-alto ( YTROIGO ),
// por ke la objektoj sidu sur la reliefo de la 3D-vido. La opcio { alto }
// anstatauxigas la teran alton ( la antaŭrigardo uzas nulan alton ) kaj
// { sxipaAlto } la spacosxipan flug-alton ( la antaŭrigardo montras gxin pli
// proksime al la grundo, por ke gxi enkadrigxos).
function konstruiObjektonEn(grupo, o, opcioj) {
  const temp = new THREE.Scene();
  const h = opcioj && opcioj.alto ? opcioj.alto : ( x, z ) => ( bazaAlteco(x, z) + deltoInterp(x, z) ) * YTROIGO;
  const sxipaAlto = opcioj && opcioj.sxipaAlto !== undefined ? opcioj.sxipaAlto : 0o40 * YTROIGO;
  const s = o.skalo ?? 1;
  if ( o.speco === "betulo" ) konstruiArbaron(temp, [ { x: o.x, z: o.z, h: h(o.x, o.z), s } ]);
  else if ( o.speco === "lariko" ) konstruiLarikon(temp, [ { x: o.x, z: o.z, h: h(o.x, o.z), s } ]);
  else if ( o.speco === "hxsxaksxlefo" ) konstruiHxsxaksxlefojn(temp, [ { x: o.x, z: o.z, h: h(o.x, o.z), s } ]);
  else if ( o.speco === "pussxlefo" ) konstruiPussxlefojn(temp, [ { x: o.x, z: o.z, h: h(o.x, o.z), s } ]);
  else if ( o.speco === "roko" ) konstruiMetitanRokon(temp, o.x, o.z, h, s, o.rotacio ?? -1);
  else if ( o.speco === "filiko" ) konstruiMetitanFilikon(temp, o.x, o.z, h, s, o.filikaSpeco ?? 0);
  else if ( o.speco === "akvabesto" ) {
    const i = Math.max(0, Math.min(N - 1, Math.floor(( o.x - X0 ) / PASO)));
    const j = Math.max(0, Math.min(N - 1, Math.floor(( o.z - Z0 ) / PASO)));
    const niv = akvaNiveloDe(i, j, o.x, o.z);
    const b = konstruiMetitanBeston(temp, o.bestospeco ?? 0, o.x, o.z,
      niv === null ? h(o.x, o.z) : niv * YTROIGO, s);
    if ( b ) { temp.remove(b.grupo); grupo.add(b.grupo); }
  } else if ( o.speco === "petrelo" ) {
    const p = konstruiMetitanPetrelon(temp, o.x, o.z, h, o.radio ?? 4, s);
    if ( p ) { temp.remove(p.grupo); grupo.add(p.grupo); }
  } else if ( o.speco === "npco" ) {
    const fig = konstruiFiguron(VESTOJ[( o.vesto ?? 0 ) % VESTOJ.length],
      ( o.harstilo ?? 0 ) === 1 ? "haroLonga" : "haroMalalta");
    fig.group.position.set(o.x, h(o.x, o.z), o.z);
    fig.group.rotation.y = o.rotacio ?? 0;
    grupo.add(fig.group);
  } else if ( o.speco === "kanuo" ) {
    // La kanuo flosas sur la akvosurfaco ( la troigita nivelo en la 3D-vido ).
    const i = Math.max(0, Math.min(N - 1, Math.floor(( o.x - X0 ) / PASO)));
    const j = Math.max(0, Math.min(N - 1, Math.floor(( o.z - Z0 ) / PASO)));
    const niv = akvaNiveloDe(i, j, o.x, o.z);
    // kreiKanoton aldonas la grupon cxe la ORIGINO — la ludo pozicias gxin dum
    // la animacio ( animaciiKanoton ). La statika bake/3D-vido bezonas la
    // eksplicitan pozicion, alie CXIUJ kanuoj stakigxus cxe ( 0, 0 ).
    const kanoto = kreiKanoton(temp, o.x, o.z, o.rotacio ?? 0, ORA_MATERIALO,
      niv === null ? h(o.x, o.z) : niv * YTROIGO, o.stilo === "satala" ? "satala" : "baza");
    kanoto.group.position.set(o.x, niv === null ? h(o.x, o.z) : niv * YTROIGO, o.z);
    kanoto.group.rotation.y = o.rotacio ?? 0;
  } else if ( o.speco === "spacosxipo" ) {
    // La sxipo flosas alte super la stacio — la troigita alteco en la 3D-vido,
    // kaj la bake suprajn vido montras gxin sendepende de la alteco.
    konstruiKrasesxagxon(temp, o.x, sxipaAlto, o.z, ORA_MATERIALO, ENIRA_MATERIALO);
  } else if ( OBJEKTO_KONSTRUAJXOJ[o.speco] ) {
    // La individuaj konstruajxoj ( sataloj ) — la samaj specoj kiel la krada
    // paletro ( stacio kiel stacioxipo ), kun la samaj tavoloj kaj altoj kiel
    // en urbo.ts. La skalo multiplikas la piedon 8×8.
    const tipo = o.speco === "stacio" ? "stacioxipo" : o.speco;
    const niveloj = tipo === "stacioxipo" ? 3 : tipo === "sanktejo" ? 7 : tipo === "turo" ? 0o10 : 4;
    const spec = {
      x: o.x, z: o.z, type: tipo, name: "objekto",
      niveloj, w: 0o10 * s, d: 0o10 * s,
      tieroAlto: tipo === "stacioxipo" ? 0o155/0o40 : tipo === "turo" ? 0o30/0o10 : tipo === "kasafeo" ? 0o155/0o40 : 0o315/0o100,
      rot: o.rotacio ?? 0, diamond: true, h0: h(o.x, o.z),
      sube: tipo === "stacioxipo" ? 0 : niveloj, tieroAltoSub: 0o123/0o40,
    };
    konstruiSatalon(spec, temp, []);
  } else if ( o.speco === "hxeuxfo" || o.speco === "hxeuxfoPlato" ) {
    // La lampo — unu hxeuxfo sur la tero ( la samaj kolonoj/bovloj/flamoj kiel
    // la kradaj lampoj, kun la komuna diorita materialo ). La varianto
    // hxeuxfoPlato staras sur la rondigita diamanta plato ( la sama platformo
    // kiel la lampoj de la mapo — diorita centro kun andezita ringo ), do la
    // lampo ricevas la saman levitan bazon kiel la ludaj plat-lampoj.
    if ( o.speco === "hxeuxfoPlato" ) {
      konstruiPeriferiajnPlatformojn(temp, [ [ o.x, o.z ] ], h, dioritaMaterialo(), kreiAndezitanMaterialon());
      konstruiHxeuxfojn(temp, [ { x: o.x, z: o.z, y: h(o.x, o.z) + 0o4/0o10 - 0o1/0o40, rotacio: o.rotacio ?? Math.PI / 4 } ], dioritaMaterialo(), ORA_MATERIALO);
    } else {
      konstruiHxeuxfojn(temp, [ { x: o.x, z: o.z, y: h(o.x, o.z), rotacio: o.rotacio ?? Math.PI / 4 } ], dioritaMaterialo(), ORA_MATERIALO);
    }
  } else if ( o.speco === "keuxfhxeso" ) {
    // La keuxfhxeso — unu starfrukta strukturo kun ses oraj ripoj.
    konstruiKeuxfhxeso(temp, [ { x: o.x, z: o.z, rot: o.rotacio ?? 0 } ], h, ORA_MATERIALO);
  }
  while ( temp.children.length ) grupo.add(temp.children[0]);
}

// kreiObjektanBakon — la bake-renderilo por la 2D-mapo. Suprajn ortografia
// fotilo ( nordo supre, kiel la plena mapo de la ludo ) kun propra lumo,
// rendras la verajn meshxojn en travideblan kanvason ( objektaBakaKanvaso ).
function kreiObjektanBakon() {
  if ( objektaBakaRenderilo ) return;
  objektaBakaRenderilo = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  objektaBakaRenderilo.setSize(1024, 1024);
  objektaBakaRenderilo.setClearColor(0x000000, 0);
  objektaBakaFotilo = new THREE.OrthographicCamera(-MONDO_HALFO, MONDO_HALFO, MONDO_HALFO, -MONDO_HALFO, 1, 0o600);
  objektaBakaFotilo.up.set(0, 0, 1);   // nordo supre
  objektaBakaFotilo.position.set(0, 0o470, 0);
  objektaBakaFotilo.lookAt(0, 0, 0);
  objektaBakaSceno = new THREE.Scene();
  objektaBakaSceno.add(new THREE.HemisphereLight(0xb8d8e8, 0x384838, 0.9));
  const suno = new THREE.DirectionalLight(0xf8f0d8, 1.1);
  suno.position.set(-0o400, 0o470, 0o300);
  objektaBakaSceno.add(suno);
  objektaBakaSceno.add(new THREE.AmbientLight(0x404848, 0.4));
  objektaGrupo2D = new THREE.Group();
  objektaBakaSceno.add(objektaGrupo2D);
  objektaBakaKanvaso = objektaBakaRenderilo.domElement;
}

// rekonstruiObjektojn — rekonstruu la VERAJN 3D-meshxojn de cxiuj metitaj
// objektoj ( post meto, forigo, malfari/refari aux sxargxo ). la 2D-grupo
// bakigxas suprajn por la mapo, la 3D-grupo refresxigas la 3D-vidon.
function rekonstruiObjektojn() {
  if ( objektoj.length > 0 ) kreiObjektanBakon();
  if ( objektaGrupo2D ) {
    while ( objektaGrupo2D.children.length ) objektaGrupo2D.remove(objektaGrupo2D.children[0]);
    for ( const o of objektoj ) konstruiObjektonEn(objektaGrupo2D, o);
    objektaBakaRenderilo.render(objektaBakaSceno, objektaBakaFotilo);
  }
  if ( objektaGrupo3D ) {
    while ( objektaGrupo3D.children.length ) objektaGrupo3D.remove(objektaGrupo3D.children[0]);
    for ( const o of objektoj ) konstruiObjektonEn(objektaGrupo3D, o);
  }
}

// ⟪ Objekta antaŭrigardo ⟫
// La 3D-antaŭrigardo — malgranda orbitanta vido de la elektita speco en la
// objekto-panelo. La SAMA konstruanto kiel la mapo/bake ( konstruiObjektonEn
// kun nula tera alto kaj la ŝipo pli proksime al la grundo ), centre
// enkadrigita kaj turniĝanta malrapide ĉiukadre.
const objektaAntauxrigardo = document.getElementById("objektaAntauxrigardo");
let objektaAntauxRenderilo = null;
let objektaAntauxSceno = null;
let objektaAntauxFotilo = null;
let objektaAntauxGrupo = null;
function kreiObjektanAntauxrigardon() {
  if ( objektaAntauxRenderilo || !objektaAntauxrigardo ) return;
  objektaAntauxRenderilo = new THREE.WebGLRenderer({ canvas: objektaAntauxrigardo, antialias: true, alpha: true });
  objektaAntauxRenderilo.setClearColor(0x000000, 0);
  objektaAntauxSceno = new THREE.Scene();
  objektaAntauxFotilo = new THREE.PerspectiveCamera(40, 1, 1, 500);
  objektaAntauxFotilo.position.set(16, 12, 16);
  objektaAntauxSceno.add(new THREE.HemisphereLight(0xc8e0f0, 0x404840, 1.0));
  const suno = new THREE.DirectionalLight(0xf8f0d8, 1.2);
  suno.position.set(-10, 20, 8);
  objektaAntauxSceno.add(suno);
  objektaAntauxSceno.add(new THREE.AmbientLight(0x505858, 0.5));
  objektaAntauxGrupo = new THREE.Group();
  objektaAntauxSceno.add(objektaAntauxGrupo);
}
// rekonstruiObjektanAntauxrigardon — konstruu la elektitan specon en la
// antaŭrigardon, centru ĝin kaj enkadrigu la fotilon.
function rekonstruiObjektanAntauxrigardon() {
  kreiObjektanAntauxrigardon();
  if ( !objektaAntauxGrupo ) return;
  // Neniu forigo de la geometrioj/materialoj — la objektoj dividas la
  // komunajn materialojn ( ORA_MATERIALO ), kiel rekonstruiObjektojn faras.
  while ( objektaAntauxGrupo.children.length ) objektaAntauxGrupo.remove(objektaAntauxGrupo.children[0]);
  objektaAntauxGrupo.position.set(0, 0, 0);
  objektaAntauxGrupo.rotation.set(0, 0, 0);
  const o = { x: 0, z: 0, speco: objektoAktiva, skalo: objektoProp.skalo,
    rotacio: objektoProp.rotacio, bestospeco: objektoProp.bestospeco, radio: objektoProp.radio,
    vesto: objektoProp.vesto, harstilo: objektoProp.harstilo, filikaSpeco: objektoProp.filikaSpeco,
    stilo: objektoProp.stilo === 1 ? "satala" : "baza" };
  konstruiObjektonEn(objektaAntauxGrupo, o, { alto: () => 0, sxipaAlto: 0o10 });
  // Enkadrigu — la fotilo rigardas la keston de la objekto; la grupo
  // translokiĝas por ke la objekto turniĝu ĉirkaŭ sia propra centro.
  const kesto = new THREE.Box3().setFromObject(objektaAntauxGrupo);
  const grandeco = kesto.getSize(new THREE.Vector3()).length() || 0o10;
  const mezo = kesto.getCenter(new THREE.Vector3());
  objektaAntauxGrupo.position.sub(mezo);
  const disto = Math.max(0o14, grandeco * 0.9);
  objektaAntauxFotilo.near = Math.max(1, disto * 0.05);
  objektaAntauxFotilo.far = disto * 0o10 + 0o200;
  objektaAntauxFotilo.position.set(disto * 0.8, disto * 0.65, disto * 0.8);
  objektaAntauxFotilo.updateProjectionMatrix();
  objektaAntauxFotilo.lookAt(0, 0, 0);
}

// gxisdatigiObjektoListon — la listo de metitaj objektoj. elektu por
// reliefigi sur la mapo, forigu por forigi.
function gxisdatigiObjektoListon() {
  objektoListo.innerHTML = "";
  if ( objektoj.length === 0 ) {
    const malplena = document.createElement("p");
    malplena.className = "kefhuruq";
    malplena.textContent = "Neniu objekto — klaku sur la mapon por meti.";
    objektoListo.append(malplena);
    return;
  }
  objektoj.forEach(( o, i ) => {
    // sabosuc2w2q — la tema horizontalo por butonoj ( kiel la traka vico de
    // la ludo ). la elekt-buteno kaj Forigi ✕ en unu vico.
    const vico = document.createElement("sabosuc2w2q");
    const speco = OBJEKTO_SPECOJ[o.speco];
    const nomo = speco ? speco.nomo : o.speco;
    const butono = document.createElement("button");
    butono.textContent = nomo + "  ( " + o.x.toFixed(2) + ", " + o.z.toFixed(2) + " )";
    // La elektita objekto montrigxas per la ekzistanta premata-stilo
    // ( button[aria-pressed=true] ) — neniu enlinia stilo.
    butono.setAttribute("aria-pressed", String(i === elektitaObjekto));
    butono.addEventListener("click", () => {
      elektitaObjekto = elektitaObjekto === i ? -1 : i;
      gxisdatigiObjektoListon();
      sxargiObjektajnEnigojn();
      bezonoDesegno = true;
    });
    const forigi = document.createElement("button");
    forigi.textContent = "Forigi ✕";
    forigi.addEventListener("click", () => forigiObjekton(i));
    vico.append(butono, forigi);
    objektoListo.append(vico);
  });
}

// gxisdatigiObjektoPropOJn — la ecoj de la elektita speco ( skalo por cxiuj;
// rotacio/vesto/harstilo por NPC-oj; speco por akvaj bestoj; flugradiuso por
// petreloj ). Rekonstruita cxe speco-sxangxo.
function gxisdatigiObjektoPropOJn() {
  const s = objektoAktiva;
  let html = "";
  const glitilo = ( nomo, klavo, min, max, paso, sufikso ) => {
    const v = objektoProp[klavo];
    return "<label> " + nomo + " <span id=\"propVal_" + klavo + "\"></span>" + ( sufikso || "" )
      + "<input type=\"range\" data-prop=\"" + klavo + "\" min=\"" + min + "\" max=\"" + max
      + "\" step=\"" + paso + "\" value=\"" + v + "\"></label>";
  };
  const elektilo = ( nomo, klavo, opcioj ) => {
    return "<label> " + nomo + " <select data-prop=\"" + klavo + "\">"
      + opcioj.map(( op, i ) => "<option value=\"" + i + "\"" + ( objektoProp[klavo] === i ? " selected" : "" ) + ">" + op + "</option>").join("")
      + "</select></label>";
  };
  html += glitilo("Skalo", "skalo", 0.25, 3, 0.05, "");
  if ( s === "npco" ) {
    html += glitilo("Rotacio", "rotacio", 0, 6.283, 0.05, " rad");
    html += elektilo("Vesto", "vesto", OBJEKTO_VESTOJ);
    html += elektilo("Harstilo", "harstilo", [ "Mallonga", "Longa" ]);
  } else if ( s === "akvabesto" ) {
    html += elektilo("Speco", "bestospeco", OBJEKTO_BESTOSPECOJ);
  } else if ( s === "petrelo" ) {
    html += glitilo("Flugradiuso", "radio", 1, 20, 0.5, " un");
  } else if ( s === "roko" ) {
    // La rokaj varioj — la grandeco kaj la turno ( la tono kaj la formo
    // hazardas cxe cxiu meto, kiel la montaraj rokoj ).
    html += glitilo("Rotacio", "rotacio", 0, 6.283, 0.05, " rad");
  } else if ( s === "filiko" ) {
    // La filika vario — verda aux purpura ( la purpuraj filikoj de la valo ).
    html += elektilo("Koloro", "filikaSpeco", [ "Verda", "Purpura" ]);
  } else if ( s === "kanuo" ) {
    // La kanua turno povas esti negativa ( la flosdirekto sur la rivero ).
    html += glitilo("Rotacio", "rotacio", -3.2, 3.2, 0.05, " rad");
    html += elektilo("Stilo", "stilo", OBJEKTO_KANUAJ_STILOJ);
  } else if ( OBJEKTO_KONSTRUAJXOJ[s] || s === "hxeuxfo" || s === "hxeuxfoPlato" || s === "keuxfhxeso" ) {
    // La konstruajxoj, la lampoj kaj la keuxfhxesoj turnigxas — la pordo / la
    // ripoj alfrontas la elektitan direkton.
    html += glitilo("Rotacio", "rotacio", 0, 6.283, 0.05, " rad");
  }
  // La spacosxipo havas neniun aldonan econ — gxi ĉiam flosas super la stacio.
  objektoPropOJ.innerHTML = html;
  objektoPropOJ.querySelectorAll("input[data-prop], select[data-prop]").forEach(el => {
    el.addEventListener("input", () => {
      objektoProp[el.dataset.prop] = +el.value;
      gxisdatigiPropValorojn();
    });
    el.addEventListener("change", () => {
      objektoProp[el.dataset.prop] = +el.value;
      gxisdatigiPropValorojn();
      // La antaŭrigardo sekvas la liberigitajn ecojn ( skalo, rotacio ).
      rekonstruiObjektanAntauxrigardon();
    });
  });
  gxisdatigiPropValorojn();
}
function gxisdatigiPropValorojn() {
  objektoPropOJ.querySelectorAll("input[type=range]").forEach(el => {
    const sp = document.getElementById("propVal_" + el.dataset.prop);
    if ( sp ) sp.textContent = ( +el.value ).toFixed(2);
  });
}

// sxaltiObjektojn — sxaltu la objektan ilon ( la langeto Objektoj 🎯 ). gxi
// malaktivigas la penikojn, montras la objekto-panelon en la suba karto kaj
// sxaltas la objekto-reĝimon ( la sub-ilo Meti ➕ / Movu ✋ / Forigi 🗑️ decidas
// la klakon ).
function sxaltiObjektojn(on) {
  objektaModo = on;
  gxisdatigiPenikaron();
  if ( on ) sxaltiIlTabon("objektoj");
  // La objekto-panelo aperas NUR kiam la objekto-langeto estas sxaltita;
  // alie la agordoj montrigxas ( ambaŭ estas thala-kartoj — la temo donas
  // display.flex, do la montro estas eksplicita per la enlinia stilo ).
  objektoPanel.classList.toggle("kobe", !on);
  agordojPanel.classList.toggle("kobe", on);
  gxisdatigiAgordojn();
  gxisdatigiKursoro();
  gxisdatigi3DnIlon();
  if ( !on ) { gxisdatigiKoordinatojn(null, null); elektitaObjekto = -1; gxisdatigiObjektoListon(); }
  sxargiObjektajnEnigojn();
  pentri(0, 0, REZ - 1, REZ - 1);
  bezonoDesegno = true;
  if ( triaDimensia && teraMesh ) gxisdatigi3DMeshon({ ix0: 0, ix1: N - 1, iz0: 0, iz1: N - 1 });
}

// ════════════════════════ Krado 🏙️ ( la urba krado ) ════════════════════════
// La Krado-langeto montras kaj redaktas la saman urban kradon kiun la ludo
// konstruas el KradaArangxo ( src/urbo.ts → src/krado.ts — la sama pura
// modulo ). La konstruaĵoj montriĝas NUR dum ĉi tiu langeto estas aktiva —
// en 2D sur la mapo ( desegniKradanTavolon ) kaj kiel reala 3D-aspekto en la
// 3D-vido ( rekonstruiKradon3D — la VERAJ konstruaĵoj de la ludo ). La
// agordoj ŝanĝas la aranĝon ( grandeco, bloko ) kaj la ofseton; la paletro
// elektas la tipon por la klako-redaktado; la superoj ( Mapo "c,r" → tipo )
// ŝanĝas aŭ aldonas ĉelojn mane.
// La urboj — la kradaj aranĝoj kaj ofsetoj de SKULPTA_URBOJ ( la sama listo
// kiun la ludo konstruas ). La urbo-elektilo en la Krado-panelo elektas la
// urbon por redakti; la ŝanĝoj skribiĝas reen al la urbo kaj saviĝas al la
// datumodosiero ( generiDosierojn skribas SKULPTA_URBOJ al src/tero-datumaro/urboj.ts ).
let urboj = SKULPTA_URBOJ.map(u => ( { ...u } ));
let elektitaUrbo = 0;                 // la elektita urbo ( la unua estas la ĉefa )
let kradoGrandeco = urboj[0]?.arangxaGrando ?? 3;   // arangxaGrando ( 1–6 )
let kradoBloko = urboj[0]?.blokaGrando ?? "unu";    // blokaGrando ( "unu" | "kvar" )
let kradoOfsX = urboj[0]?.ofsX ?? 0, kradoOfsZ = urboj[0]?.ofsZ ?? 0;  // la ofseto de la krada centro
let kradoKeuxfhxeso = !!urboj[0]?.keuxfhxeso;        // keŭfĥesoj ĉirkaŭ la centro
let kradoLampoj = urboj[0]?.lampoj !== false;        // la kvar-lampa strato-ŝablono ( defaŭlte ŝaltita )
let kradoTipoElektita = "automata";   // la paletro ( "automata" = la generita tipo )
const kradoSuperoj = new Map();       // "c,r" → tipo ( unu ) aŭ "c,r,SUB" → tipo ( kvar )
let kradaPlanoCache = null;
// La doko kaj la spacoŝipo — la mondaj trajtoj de la ĉefa urbo
// ( SKULPTA_DOKOJ kaj SKULPTA_VOJOJ en src/tero-datumaro/vojoj.ts ),
// redaktataj per la Vojoj sub-langeto de la Krado-panelo.
let vojoj = SKULPTA_VOJOJ.length
  ? SKULPTA_VOJOJ.map(v => ( { ...v, punktoj: v.punktoj.map(p => [ p[0], p[1] ]) } ))
  : [ { nomo: "Kajo", larĝo: 3.5, punktoj: [ [ -84, -96 ], [ -56, -104 ], [ -48, -100 ], [ 0, -90 ], [ 48, -80 ], [ 56, -84 ], [ 84, -82 ] ] },
      { nomo: "Avenuo", larĝo: 3.5, punktoj: [ [ 12, -64 ], [ 12, -88 ] ] } ];
let dokoj = SKULPTA_DOKOJ.length
  ? SKULPTA_DOKOJ.map(d => ( { ...d } ))
  : [ { x: -48, z: -108, profundo: 16 }, { x: 0, z: -98, profundo: 16 }, { x: 48, z: -88, profundo: 16 } ];
// La spacosxipo kaj la kanuoj estas objektoj ( SKULPTA_OBJEKTOJ ) — redaktataj
// per la objekta ilo, ne plu per la Vojoj sub-langeto.
const kradaro = document.getElementById("kradaro");
const kradoPanel = document.getElementById("kradoPanel");
const urboElektilo = document.getElementById("urboElektilo");
const urboNomoEl = document.getElementById("urboNomo");
const urboAldoniBtn = document.getElementById("urboAldoni");
const urboForigiBtn = document.getElementById("urboForigi");
const kradoGrandecoEl = document.getElementById("kradoGrandeco");
const kradoBlokoEl = document.getElementById("kradoBloko");
const kradoOfsXEl = document.getElementById("kradoOfsX");
const kradoOfsZEl = document.getElementById("kradoOfsZ");
const kradoKeuxfhxesoEl = document.getElementById("kradoKeuxfhxeso");
const kradoLampojEl = document.getElementById("kradoLampoj");
const kradoRestarigiBtn = document.getElementById("kradoRestarigi");
const kradoKopiiBtn = document.getElementById("kradoKopii");
// La aldonaj blokoj — la ekstraj konstruajxoj de la redaktata urbo
// ( la spacosxipa stacio de la cefa urbo estas unu ), metitaj aparte de la
// krada generado. La elektita bloko kaj la trenado sur la mapo.
let elektitaAldonaBloko = -1;
let aldonaTrenata = -1;             // indekso de la trenata aldona bloko
const aldonaBlokoElektilo = document.getElementById("aldonaBlokoElektilo");
const aldonaBlokoTipoEl = document.getElementById("aldonaBlokoTipo");
const aldonaBlokoXEl = document.getElementById("aldonaBlokoX");
const aldonaBlokoZEl = document.getElementById("aldonaBlokoZ");
const aldonaBlokoRotEl = document.getElementById("aldonaBlokoRot");
const aldonaBlokoStaciaEl = document.getElementById("aldonaBlokoStacia");
const aldonaBlokoKonektitaEl = document.getElementById("aldonaBlokoKonektita");
const aldonaBlokoAldoniBtn = document.getElementById("aldonaBlokoAldoni");
const aldonaBlokoForigiBtn = document.getElementById("aldonaBlokoForigi");
// La Vojoj sub-langeto de la Krado-panelo — la elektitaj vojo/punkto/doko kaj
// la mapaj sub-iloj. La mondaj trajtoj ( vojoj, dokoj ) redaktigxas ĉi tie,
// sed restas MOND-nivelaj ( por ke ili povu konekti plurajn urbojn estonte ).
let elektitaVojo = 0;          // indekso en vojoj
let elektitaPunkto = -1;       // punkto de la elektita vojo ( -1 = neniu )
let elektitaDoko = 0;          // indekso en dokoj
let vojaIlo = "movu";          // "movu" | "aldoni" | "forigi"
let vojaTrenata = null;        // { speco: "punkto"|"doko", ... }

const vojoElektilo = document.getElementById("vojoElektilo");
const vojoNomoEl = document.getElementById("vojoNomo");
const vojoLargxoEl = document.getElementById("vojoLargxo");
const vojoAldoniBtn = document.getElementById("vojoAldoni");
const vojoForigiBtn = document.getElementById("vojoForigi");
const vojoPunktoElektilo = document.getElementById("vojoPunktoElektilo");
const vojoPunktoAldoniBtn = document.getElementById("vojoPunktoAldoni");
const vojoPunktoForigiBtn = document.getElementById("vojoPunktoForigi");
const vojoPunktoXEl = document.getElementById("vojoPunktoX");
const vojoPunktoZEl = document.getElementById("vojoPunktoZ");
const dokoElektilo = document.getElementById("dokoElektilo");
const dokoXEl = document.getElementById("dokoX");
const dokoZEl = document.getElementById("dokoZ");
const dokoProfundoEl = document.getElementById("dokoProfundo");
const dokoAldoniBtn = document.getElementById("dokoAldoni");
const dokoForigiBtn = document.getElementById("dokoForigi");

// kradoPlano — la nuna plano kun la superoj. La ĉelo-redaktado validiĝas
// tuj. la vojoj, spronoj kaj konstruaĵoj rekalkuliĝas ĉirkaŭ la ŝanĝitaj aŭ
// aldonitaj ĉeloj — la sama logiko kiel la ludo. La ALDONAJ blokoj de la
// redaktata urbo ( la spacosxipa stacio kaj la aliaj ekstraj konstruajxoj )
// venas el la urbo-datumo ( aldonajBlokoj ) — aparte de la krada generado.
// Kiam la ĉefa urbo estas elektita, la voja konstruanto ( aldoniVojon )
// aldonas la dokan avenuon — la mond-nivela vojo de la ĉefa urbo.
function kradoPlano() {
  if ( !kradaPlanoCache ) {
    const u = urboj[elektitaUrbo];
    kradaPlanoCache = kreiKradanPlanon(
      { arangxaGrando: kradoGrandeco, blokaGrando: kradoBloko, lampoj: kradoLampoj },
      kradoSuperoj, u && u.aldonajBlokoj ? u.aldonajBlokoj : []);
    // La mond-nivelaj vojoj KONEKTIĜAS al la krada reto — aks-paralelaj
    // segmentoj sur la SAMA linio kiel ekzistanta krada vojo ( la pozicio
    // egalas ) aldoniĝas kiel staciaj kradaj vojoj. La krado tiam montras
    // ilin kiel sian propran etendaĵon ( la 2D-overlajo, la 3D-vido kaj la
    // spronoj atingas ilin ) — la avenuo de la ĉefa urbo estas la ekzemplo.
    // ĝi daŭrigas la NS-vojon ĉe x=12 suden ĝis la kajo.
    const ofsX = kradoOfsX, ofsZ = kradoOfsZ;
    for ( const v of vojoj ) {
      if ( !v.punktoj || v.punktoj.length < 2 ) continue;
      for ( let i = 0; i < v.punktoj.length - 1; i++ ) {
        const a = v.punktoj[i], b = v.punktoj[i + 1];
        if ( Math.abs(a[0] - b[0]) < 1e-6 ) {
          const poz = a[0] - ofsX;
          if ( kradaPlanoCache.vojoj.some(r => r.orient === "NS" && Math.abs(r.poz - poz) < 1e-6) )
            aldoniVojon(kradaPlanoCache, "NS", poz,
              Math.min(a[1], b[1]) - ofsZ, Math.max(a[1], b[1]) - ofsZ, true);
        } else if ( Math.abs(a[1] - b[1]) < 1e-6 ) {
          const poz = a[1] - ofsZ;
          if ( kradaPlanoCache.vojoj.some(r => r.orient === "EW" && Math.abs(r.poz - poz) < 1e-6) )
            aldoniVojon(kradaPlanoCache, "EW", poz,
              Math.min(a[0], b[0]) - ofsX, Math.max(a[0], b[0]) - ofsX, true);
        }
      }
    }
  }
  return kradaPlanoCache;
}
function gxisdatigiKradon() {
  const u = urboj[elektitaUrbo];
  kradaPlanoCache = kreiKradanPlanon(
    { arangxaGrando: kradoGrandeco, blokaGrando: kradoBloko, lampoj: kradoLampoj },
    kradoSuperoj, u && u.aldonajBlokoj ? u.aldonajBlokoj : []);
  gxisdatigiKradajnStatistikojn();
  rekonstruiKradon3D();
  bezonoDesegno = true;
}
function gxisdatigiKradajnStatistikojn() {
  const el = document.getElementById("kradoStatistikoj");
  if ( !el || !kradaPlanoCache ) return;
  const plano = kradaPlanoCache;
  // La simetriaj kontroloj validas nur por la GENERITAJ kradoj — la mana
  // redaktado rompas ilin intence ( unu ĉelo ŝanĝiĝas, ne ĉiuj kvar
  // speguloj ). La statistikoj montras la strukturajn problemojn.
  const problemoj = validiKradon(plano).filter(p => !p.kodo.startsWith("simetrio-"));
  const bazo = `${plano.ĉeloj.length} ĉeloj · ${plano.konstruaĵoj.length} konstruaĵoj · ${plano.vojoj.length} vojoj · ${plano.spronoj.length} spronoj`;
  el.textContent = problemoj.length
    ? bazo + ` — ✗ ${problemoj.length} problemo(j): ${problemoj.slice(0, 3).map(p => p.kodo).join(", ")}`
    : bazo + " — ✓ strukture validas";
}

// gxisdatigiUrboElektilon — rekonstruu la urbo-elektilon el la urboj. Cxiu
// opcio montras la nomon kaj la ofseton; la elektita urbo restas elektita.
function gxisdatigiUrboElektilon() {
  urboElektilo.innerHTML = "";
  urboj.forEach(( u, i ) => {
    const o = document.createElement("option");
    o.value = String(i);
    o.textContent = u.nomo + " ( " + u.ofsX + ", " + u.ofsZ + " )";
    urboElektilo.appendChild(o);
  });
  urboElektilo.value = String(elektitaUrbo);
  urboNomoEl.value = urboj[elektitaUrbo]?.nomo ?? "";
  urboForigiBtn.disabled = urboj.length <= 1;
}

// elektiUrbon — sxargu la urbon ( grandeco, bloko, ofseto, nomo ) en la
// redaktajn regilojn kaj montru gxian kradon. La superoj ( manaj ĉel-ŝanĝoj )
// restas — la ĉelo-redaktado apartenas al la redaktata urbo.
function elektiUrbon(i) {
  elektitaUrbo = Math.max(0, Math.min(urboj.length - 1, i));
  const u = urboj[elektitaUrbo];
  if ( !u ) return;
  kradoGrandeco = u.arangxaGrando;
  kradoBloko = u.blokaGrando;
  kradoOfsX = u.ofsX;
  kradoOfsZ = u.ofsZ;
  kradoKeuxfhxeso = !!u.keuxfhxeso;
  kradoLampoj = u.lampoj !== false;
  kradoGrandecoEl.value = String(kradoGrandeco);
  kradoBlokoEl.value = kradoBloko;
  kradoOfsXEl.value = String(kradoOfsX);
  kradoOfsZEl.value = String(kradoOfsZ);
  kradoKeuxfhxesoEl.checked = kradoKeuxfhxeso;
  kradoLampojEl.checked = kradoLampoj;
  urboNomoEl.value = u.nomo;
  gxisdatigiUrboElektilon();
  gxisdatigiAldonaBlokojn();
  gxisdatigiKradon();
}

// skribiElektitanUrbon — skribu la nuntempajn regilojn reen al la elektita
// urbo kaj marku la datumaron sxangxita ( la savo skribas la urbojn al
// SKULPTA_URBOJ ).
function skribiElektitanUrbon() {
  const u = urboj[elektitaUrbo];
  if ( !u ) return;
  u.arangxaGrando = kradoGrandeco;
  u.blokaGrando = kradoBloko;
  u.ofsX = kradoOfsX;
  u.ofsZ = kradoOfsZ;
  u.keuxfhxeso = kradoKeuxfhxeso;
  u.lampoj = kradoLampoj;
  sxangxita = true;
}

// gxisdatigiAldonaBlokojn — sxargu la aldonajn blokojn de la redaktata urbo
// en la regilojn ( la elektita bloko restas elektita ).
function gxisdatigiAldonaBlokojn() {
  if ( !aldonaBlokoElektilo ) return;
  const u = urboj[elektitaUrbo];
  const blokoj = u && u.aldonajBlokoj ? u.aldonajBlokoj : [];
  aldonaBlokoElektilo.innerHTML = "";
  blokoj.forEach(( b, i ) => {
    const o = document.createElement("option");
    o.value = String(i);
    o.textContent = ( b.stacia ? "Stacio" : ALDONA_TIPO_NOMOJ[b.tipo] || b.tipo ) + ( b.konektita ? " 🛣️" : "" ) + " ( " + b.x + ", " + b.z + " )";
    aldonaBlokoElektilo.appendChild(o);
  });
  elektitaAldonaBloko = blokoj.length ? Math.max(0, Math.min(blokoj.length - 1, elektitaAldonaBloko)) : -1;
  aldonaBlokoElektilo.value = String(Math.max(0, elektitaAldonaBloko));
  aldonaBlokoForigiBtn.disabled = blokoj.length === 0;
  const b = blokoj[elektitaAldonaBloko];
  if ( b ) {
    aldonaBlokoTipoEl.value = b.tipo;
    aldonaBlokoXEl.value = String(b.x);
    aldonaBlokoZEl.value = String(b.z);
    aldonaBlokoRotEl.value = String(b.rot ?? 0);
    aldonaBlokoStaciaEl.checked = !!b.stacia;
    aldonaBlokoKonektitaEl.checked = !!b.konektita;
  }
  bezonoDesegno = true;
}

// skribiAldonanBlokon — legu la regilojn en la elektitan aldonan blokon kaj
// marku la datumaron sxangxita ( la savo skribas la urbojn al SKULPTA_URBOJ ).
function skribiAldonanBlokon() {
  const u = urboj[elektitaUrbo];
  const blokoj = u && u.aldonajBlokoj ? u.aldonajBlokoj : [];
  const b = blokoj[elektitaAldonaBloko];
  if ( !b ) return;
  b.tipo = aldonaBlokoTipoEl.value;
  b.x = Math.round(( parseFloat(aldonaBlokoXEl.value) || 0 ) * 2) / 2;
  b.z = Math.round(( parseFloat(aldonaBlokoZEl.value) || 0 ) * 2) / 2;
  b.rot = parseFloat(aldonaBlokoRotEl.value) || 0;
  b.stacia = aldonaBlokoStaciaEl.checked;
  b.konektita = aldonaBlokoKonektitaEl.checked;
  sxangxita = true;
}
const ALDONA_TIPO_NOMOJ = { sanktejo: "Sanktejo", turo: "Turo", domo: "Domo", mangxejo: "Manĝejo", kasafeo: "Kasafeo", stacio: "Stacio" };

// aldonaBlokoCxePunkto — la indekso de la aldona bloko kies markilo kovras la
// mondan punkton ( ekran-bazita, kiel la urbaj markiloj ), aux -1.
function aldonaBlokoCxePunkto(mx, mz) {
  const u = urboj[elektitaUrbo];
  const blokoj = u && u.aldonajBlokoj ? u.aldonajBlokoj : [];
  const duonw = mapo.width / 2, duonh = mapo.height / 2;
  const sx = duonw - ( mx - vidCX ) * vidSkalo;
  const sy = duonh - ( mz - vidCZ ) * vidSkalo;
  for ( let i = 0; i < blokoj.length; i++ ) {
    const b = blokoj[i];
    const bx = duonw - ( kradoOfsX + b.x - vidCX ) * vidSkalo;
    const bz = duonh - ( kradoOfsZ + b.z - vidCZ ) * vidSkalo;
    if ( Math.hypot(bx - sx, bz - sy) < 14 ) return i;
  }
  return -1;
}

// komenciAldonaTrenon — kaptu aldonan blokon por movi gxin sur la mapo ( la
// movo estas malfarebla — la historio momentigxas cxe la kapto ).
function komenciAldonaTrenon(i) {
  if ( aldonaTrenata >= 0 ) return;
  momenti();
  aldonaTrenata = i;
  sxangxita = true;
  statuso("Nesavitaj ŝanĝoj");
  bezonoDesegno = true;
}
function sxangiAldonaPozicion(mx, mz) {
  const u = urboj[elektitaUrbo];
  const blokoj = u && u.aldonajBlokoj ? u.aldonajBlokoj : [];
  const b = blokoj[aldonaTrenata];
  if ( !b ) return;
  b.x = Math.round(( mx - kradoOfsX ) * 2) / 2;
  b.z = Math.round(( mz - kradoOfsZ ) * 2) / 2;
  gxisdatigiAldonaBlokojn();
  gxisdatigiKradon();
  bezonoDesegno = true;
}
function finiAldonaTrenon() {
  if ( aldonaTrenata < 0 ) return;
  aldonaTrenata = -1;
  gxisdatigiAldonaBlokojn();
  gxisdatigiKradon();
  bezonoDesegno = true;
}

// gxisdatigiVojajnRegilojn — sxargu la vojojn, punktojn, dokojn kaj la sxipon
// en la regilojn de la Vojoj sub-langeto ( la elektitaj restas elektitaj ).
function gxisdatigiVojajnRegilojn() {
  if ( !vojoElektilo ) return;
  // La krada plano dependas de la mond-nivelaj vojoj ( la konektaj stubs ) —
  // ĉiu ŝanĝo ĉi tie malnovigas la kaŝon. La 3D-vojoj rekonstruiĝas ĉe ĉiu
  // ŝanĝo, sed NE dum la treno ( la 2D-mapo montras la vivan trenon; la 3D
  // refreŝiĝas ĉe la fino ).
  kradaPlanoCache = null;
  if ( bildilo3d && !vojaTrenata ) rekonstruiVojojn3D();
  vojoElektilo.innerHTML = "";
  vojoj.forEach(( v, i ) => {
    const o = document.createElement("option");
    o.value = String(i);
    o.textContent = ( v.nomo || "Vojo" ) + " ( " + v.punktoj.length + " pkt )";
    vojoElektilo.appendChild(o);
  });
  elektitaVojo = Math.max(0, Math.min(vojoj.length - 1, elektitaVojo));
  vojoElektilo.value = String(elektitaVojo);
  vojoForigiBtn.disabled = vojoj.length <= 1;
  const v = vojoj[elektitaVojo];
  if ( v ) {
    vojoNomoEl.value = v.nomo || "";
    vojoLargxoEl.value = String(v.largxo || v.larĝo || 3.5);
    vojoPunktoElektilo.innerHTML = "";
    v.punktoj.forEach(( p, j ) => {
      const o = document.createElement("option");
      o.value = String(j);
      o.textContent = "Punkto " + ( j + 1 ) + " ( " + p[0] + ", " + p[1] + " )";
      vojoPunktoElektilo.appendChild(o);
    });
    elektitaPunkto = Math.max(0, Math.min(v.punktoj.length - 1, elektitaPunkto));
    vojoPunktoElektilo.value = String(elektitaPunkto);
    vojoPunktoForigiBtn.disabled = v.punktoj.length <= 2;
    const p = v.punktoj[elektitaPunkto];
    if ( p ) {
      vojoPunktoXEl.value = String(p[0]);
      vojoPunktoZEl.value = String(p[1]);
    }
  } else {
    vojoNomoEl.value = "";
    vojoLargxoEl.value = "3.5";
    vojoPunktoElektilo.innerHTML = "";
    vojoPunktoForigiBtn.disabled = true;
  }
  dokoElektilo.innerHTML = "";
  dokoj.forEach(( d, i ) => {
    const o = document.createElement("option");
    o.value = String(i);
    o.textContent = "Doko " + ( i + 1 ) + " ( " + d.x + ", " + d.z + " )";
    dokoElektilo.appendChild(o);
  });
  elektitaDoko = Math.max(0, Math.min(dokoj.length - 1, elektitaDoko));
  dokoElektilo.value = String(elektitaDoko);
  dokoForigiBtn.disabled = dokoj.length <= 1;
  const d = dokoj[elektitaDoko];
  if ( d ) {
    dokoXEl.value = String(d.x);
    dokoZEl.value = String(d.z);
    dokoProfundoEl.value = String(d.profundo || 16);
  }
  gxisdatigiVojaStatistikojn();
}

// skribiVojajnRegilojn — legu la regilojn en la staton kaj marku la datumaron
// sxangxita ( la savo skribas SKULPTA_VOJOJ kaj SKULPTA_DOKOJ ).
function skribiVojajnRegilojn() {
  const v = vojoj[elektitaVojo];
  if ( v ) {
    v.nomo = vojoNomoEl.value;
    v.larĝo = parseFloat(vojoLargxoEl.value) || 3.5;
    const p = v.punktoj[elektitaPunkto];
    // La tajpitaj valoroj estas prenataj kiel ili estas ( nur la mapo-treno
    // algluas al 0.5 — la sxargitaj riverbordaj valoroj restu netusxataj ).
    if ( p ) {
      p[0] = parseFloat(vojoPunktoXEl.value) || 0;
      p[1] = parseFloat(vojoPunktoZEl.value) || 0;
    }
  }
  const d = dokoj[elektitaDoko];
  if ( d ) {
    d.x = parseFloat(dokoXEl.value) || 0;
    d.z = parseFloat(dokoZEl.value) || 0;
    d.profundo = Math.max(4, parseFloat(dokoProfundoEl.value) || 16);
  }
  sxangxita = true;
}

// gxisdatigiVojaStatistikojn — la voja statistiklinio ( kvanto kaj longo ).
function gxisdatigiVojaStatistikojn() {
  const el = document.getElementById("vojaStatistikoj");
  if ( !el ) return;
  const longo = vojoj.reduce(( s, v ) => s + v.punktoj.reduce(( a, p, i ) => {
    if ( i === 0 ) return a;
    const q = v.punktoj[i - 1];
    return a + Math.hypot(p[0] - q[0], p[1] - q[1]);
  }, 0), 0);
  el.textContent = vojoj.length + " vojoj ( " + longo.toFixed(1) + " un ) · "
    + dokoj.length + " dokoj";
}

// urboCxePunkto — la indekso de la urbo kies markilo kovras la mondan punkton
// ( komparata sur la ekrano ). -1 se neniu. La sama mondo → ekrano transformo
// kiel en desegniVidon.
function urboCxePunkto(mx, mz) {
  const duonw = mapo.width / 2, duonh = mapo.height / 2;
  const sx = duonw - ( mx - vidCX ) * vidSkalo;
  const sy = duonh - ( mz - vidCZ ) * vidSkalo;
  for ( let i = 0; i < urboj.length; i++ ) {
    const u = urboj[i];
    const ux = duonw - ( u.ofsX - vidCX ) * vidSkalo;
    const uz = duonh - ( u.ofsZ - vidCZ ) * vidSkalo;
    if ( Math.hypot(ux - sx, uz - sy) < 12 ) return i;
  }
  return -1;
}

// vojaCeloCxePunkto — la celo de la Vojoj sub-langeto sub la monda punkto,
// aux null. La elektada ordo — la punktoj de la vojoj unue ( la plej proksima
// ene de la ekrana radiuso ), poste la dokoj, kaj la voja linio
// ( la plej proksima segmento ) laste.
function vojaCeloCxePunkto(mx, mz) {
  const r = 8 / vidSkalo;
  let plej = null, plejD = r;
  for ( let vi = 0; vi < vojoj.length; vi++ ) {
    const v = vojoj[vi];
    for ( let pi = 0; pi < v.punktoj.length; pi++ ) {
      const p = v.punktoj[pi];
      const d = Math.hypot(p[0] - mx, p[1] - mz);
      if ( d < plejD ) { plejD = d; plej = { speco: "punkto", vojo: vi, punkto: pi }; }
    }
  }
  if ( plej ) return plej;
  for ( let di = 0; di < dokoj.length; di++ ) {
    const d = dokoj[di];
    const prof = d.profundo || 16;
    if ( Math.abs(d.x - mx) < 0o16/0o10 + 2.5 && Math.abs(d.z - mz) < prof / 2 + 2.5 ) return { speco: "doko", doko: di };
  }
  for ( let vi = 0; vi < vojoj.length; vi++ ) {
    const v = vojoj[vi];
    for ( let pi = 0; pi < v.punktoj.length - 1; pi++ ) {
      const a = v.punktoj[pi], b = v.punktoj[pi + 1];
      const l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      const t = Math.max(0, Math.min(1, ( ( mx - a[0] ) * ( b[0] - a[0] ) + ( mz - a[1] ) * ( b[1] - a[1] ) ) / ( l * l )));
      const d = Math.hypot(a[0] + t * ( b[0] - a[0] ) - mx, a[1] + t * ( b[1] - a[1] ) - mz);
      if ( d < ( v.larĝo || 3.5 ) / 2 + 1.5 + r ) return { speco: "vojo", vojo: vi };
    }
  }
  return null;
}

// sxangxiVojanCelon — la klako-redaktado sur la 2D-mapo en la Vojoj
// sub-langeto de la Krado-panelo.
// la sub-ilo decidas. Elektu/Movu ✋ elektas la plej proksiman punkton, dokon
// aux la sxipon ( kaj kaptas gxin por treni ); klako sur la vojan linion
// elektas la vojon. Aldoni punkton ➕ enmetas punkton en la elektitan vojon.
// Forigi punkton 🗑️ forigas la plej proksiman punkton.
function sxangxiVojanCelon(mx, mz) {
  const proks = vojaCeloCxePunkto(mx, mz);
  if ( vojaIlo === "forigi" ) {
    if ( proks && proks.speco === "punkto" ) forigiVojanPunkton(proks.vojo, proks.punkto);
    return;
  }
  if ( proks && proks.speco === "punkto" ) {
    elektitaVojo = proks.vojo;
    elektitaPunkto = proks.punkto;
    if ( vojaIlo === "movu" ) komenciVojaTrenon({ speco: "punkto", vojo: proks.vojo, punkto: proks.punkto });
  } else if ( proks && proks.speco === "doko" ) {
    elektitaDoko = proks.doko;
    if ( vojaIlo === "movu" ) komenciVojaTrenon({ speco: "doko", doko: proks.doko });
  } else if ( proks && proks.speco === "vojo" ) {
    elektitaVojo = proks.vojo;
    elektitaPunkto = -1;
  } else if ( vojaIlo === "aldoni" ) {
    aldoniVojanPunkton(mx, mz);
    return;
  } else {
    elektitaPunkto = -1;
  }
  gxisdatigiVojajnRegilojn();
  bezonoDesegno = true;
}

// komenciVojaTrenon — kaptu punkton, dokon aux la sxipon por Elektu/Movu ✋
// ( la movo estas malfarebla — la historio momentigxas cxe la kapto ).
function komenciVojaTrenon(celo) {
  if ( vojaTrenata ) return;
  momenti();
  vojaTrenata = celo;
  sxangxita = true;
  statuso("Nesavitaj ŝanĝoj");
  bezonoDesegno = true;
}

// sxangiVojaPozicion — gxisdatigu la pozicion de la trenata celo ( algluita
// al 0.5 ) dum Elektu/Movu ✋.
// kradaVojaAlglu — la plej proksima krada vojo-linio ( la voja reto de la
// nuna urbo ) ĉe la monda punkto, aux null. NS-vojoj. vertikala linio ĉe fiksa
// x; EW-vojoj. horizontala ĉe fiksa z. La treno de voja punkto algluiĝas al la
// linio ene de la rando, por ke la vojo KONEKTIĜU al la krado.
function kradaVojaAlglu(mx, mz) {
  const plano = kradoPlano();
  const ofsX = kradoOfsX, ofsZ = kradoOfsZ;
  const rando = 2.5;
  let plej = null, plejD = rando;
  for ( const r of plano.vojoj ) {
    if ( r.orient === "NS" ) {
      const wx = ofsX + r.poz;
      const d = Math.abs(mx - wx);
      // La libera koordinato restas sur la sama 0.5-krado kiel la aliaj punktoj.
      // NENIU etenda limo. la punkto povas gliti sur la linion ankaux preter la
      // urba intervalo — la vojo tiam DAŬRIGAS la kradan linion ( la avenuo
      // suden de la ĉefurbo estas la ekzemplo ) kaj KONEKTIĜAS al la krado.
      if ( d < plejD ) { plejD = d; plej = [ wx, Math.round(mz * 2) / 2 ]; }
    } else {
      const wz = ofsZ + r.poz;
      const d = Math.abs(mz - wz);
      if ( d < plejD ) { plejD = d; plej = [ Math.round(mx * 2) / 2, wz ]; }
    }
  }
  return plej;
}
// kradaSegmentoAlglu — la TUTA segmento A→B algluiĝas al la krada voja
// reto. se la segmento estas preskaŭ paralela al krada vojo-linio kaj ĉiu
// punkto de ĝi restas ene de la alglua rando ( 2.5 ) de tiu linio, ĝi glitas
// sur la linion — ambaŭ finoj samlinias, do la segmento KONEKTIĜAS al la
// krado ( ne nur unu finpunkto ). Revenas { linioX } aŭ { linioZ } ( la monda
// pozicio de la linio ) aŭ null.
function kradaSegmentoAlglu(ax, az, bx, bz) {
  const plano = kradoPlano();
  const ofsX = kradoOfsX, ofsZ = kradoOfsZ;
  const rando = 2.5;
  const dx = bx - ax, dz = bz - az;
  if ( Math.hypot(dx, dz) < 1e-6 ) return null;
  // NS — preskaŭ-vertikala segmento ( la angulo al la vertikalo ≤ ~14° )
  // proksime al NS-linio. NENIU etenda limo. la segmento povas gliti sur la
  // linion ankaux preter la urba intervalo kaj tiam DAŬRIGAS la kradan
  // linion ( samkiel la finpunkto-algluo ).
  if ( Math.abs(dx) <= 0.25 * Math.abs(dz) ) {
    let plej = null, plejD = rando;
    for ( const r of plano.vojoj ) {
      if ( r.orient !== "NS" ) continue;
      const wx = ofsX + r.poz;
      const d = Math.max(Math.abs(ax - wx), Math.abs(bx - wx));
      if ( d < plejD ) { plejD = d; plej = wx; }
    }
    if ( plej !== null ) return { linioX: plej, linioZ: null };
  }
  // EW — preskaŭ-horizontala segmento proksime al EW-linio.
  if ( Math.abs(dz) <= 0.25 * Math.abs(dx) ) {
    let plej = null, plejD = rando;
    for ( const r of plano.vojoj ) {
      if ( r.orient !== "EW" ) continue;
      const wz = ofsZ + r.poz;
      const d = Math.max(Math.abs(az - wz), Math.abs(bz - wz));
      if ( d < plejD ) { plejD = d; plej = wz; }
    }
    if ( plej !== null ) return { linioX: null, linioZ: plej };
  }
  return null;
}
function sxangiVojaPozicion(mx, mz) {
  if ( !vojaTrenata ) return;
  const c = vojaTrenata;
  if ( c.speco === "punkto" ) {
    const v = vojoj[c.vojo];
    if ( !v || !v.punktoj[c.punkto] ) return;
    const pi = c.punkto;
    // La algluo al la krada voja reto — la punkto sur la krada linio
    // KONEKTIĜAS la vojon al la krado; alie la kutima 0.5-algluo.
    const algluo = kradaVojaAlglu(mx, mz);
    let gx = algluo ? algluo[0] : Math.round(mx * 2) / 2;
    let gz = algluo ? algluo[1] : Math.round(mz * 2) / 2;
    // La SEGMENTO-algluo — se najbara segmento ( najbaro → la trenata punkto )
    // estas preskaŭ paralela al krada vojo-linio kaj proksima, ankaŭ la najbaro
    // glitas sur la linion. La tuta segmento tiam estas samlinia kaj KONEKTIĜAS
    // al la krado ( ne nur la finpunkto ). Ĉe du fluigitaj segmentoj la punkto
    // venas al la linia intersekco.
    let linioX = null, linioZ = null;
    for ( const ni of [ pi - 1, pi + 1 ] ) {
      const n = v.punktoj[ni];
      if ( !n ) continue;
      const s = kradaSegmentoAlglu(n[0], n[1], gx, gz);
      if ( !s ) continue;
      if ( s.linioX !== null ) { n[0] = s.linioX; linioX = s.linioX; }
      else { n[1] = s.linioZ; linioZ = s.linioZ; }
    }
    if ( linioX !== null ) gx = linioX;
    if ( linioZ !== null ) gz = linioZ;
    v.punktoj[pi] = [ gx, gz ];
    elektitaPunkto = pi;
  } else if ( c.speco === "doko" ) {
    const d = dokoj[c.doko];
    if ( !d ) return;
    d.x = Math.round(mx * 2) / 2;
    d.z = Math.round(mz * 2) / 2;
    elektitaDoko = c.doko;
  }
  gxisdatigiVojajnRegilojn();
  bezonoDesegno = true;
}

// staciaPozicio — la monda pozicio de la cefa stacio ( la stacia aldona
// bloko de la cefa urbo, aux la defaŭlta pozicio — ofseto + stacioZ por la
// unu-bloka, la centro por la kvar-bloka ).
function staciaPozicio() {
  const u = urboj[0];
  if ( !u ) return null;
  const blokoj = u.aldonajBlokoj && u.aldonajBlokoj.length ? u.aldonajBlokoj : null;
  const stacio = blokoj ? ( blokoj.find(b => b.stacia) || blokoj[0] ) : null;
  if ( stacio ) return [ u.ofsX + stacio.x, u.ofsZ + stacio.z ];
  const pasxo = u.blokaGrando === "kvar" ? 0o40 : 0o30;
  const stacioZ = u.blokaGrando === "kvar" ? 0 : u.arangxaGrando * pasxo + 0o30;
  return [ u.ofsX, u.ofsZ + stacioZ ];
}
function finiVojaTrenon() {
  if ( !vojaTrenata ) return;
  vojaTrenata = null;
  gxisdatigiVojajnRegilojn();
  bezonoDesegno = true;
}

// aldoniVojanPunkton — enmetu punkton en la elektitan vojon cxe la klako
// ( sur la plej proksima segmento — la punkto dividas la segmenton; se la
// vojo havas nur unu punkton, la nova punkto metigxas cxe la klako mem ).
function aldoniVojanPunkton(mx, mz) {
  const v = vojoj[elektitaVojo];
  if ( !v ) return;
  momenti();
  // La klako algluiĝas al la krada voja reto se ĝi estas proksime al krada
  // vojo-linio — la nova punkto tiam KONEKTIĜAS la vojon al la krado
  // ( samkiel la treno de punkto en Elektu/Movu ✋ ).
  const algluo = kradaVojaAlglu(mx, mz);
  const gx = algluo ? algluo[0] : mx, gz = algluo ? algluo[1] : mz;
  if ( v.punktoj.length < 2 ) {
    v.punktoj.push([ Math.round(gx * 2) / 2, Math.round(gz * 2) / 2 ]);
    elektitaPunkto = v.punktoj.length - 1;
  } else {
    let plej = 0, plejD = Infinity, plejT = 0;
    for ( let pi = 0; pi < v.punktoj.length - 1; pi++ ) {
      const a = v.punktoj[pi], b = v.punktoj[pi + 1];
      const l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      const t = Math.max(0, Math.min(1, ( ( gx - a[0] ) * ( b[0] - a[0] ) + ( gz - a[1] ) * ( b[1] - a[1] ) ) / ( l * l )));
      const d = Math.hypot(a[0] + t * ( b[0] - a[0] ) - gx, a[1] + t * ( b[1] - a[1] ) - gz);
      if ( d < plejD ) { plejD = d; plej = pi; plejT = t; }
    }
    const a = v.punktoj[plej], b = v.punktoj[plej + 1];
    // La SEGMENTO-algluo — se la dividata segmento ( a→b ) estas preskaŭ
    // paralela al krada vojo-linio kaj proksima, la TUTA segmento glitas sur
    // la linion. a, b kaj la nova punkto samlinias, do la segmento ( kaj la
    // du novaj duonsegmentoj ) KONEKTIĜAS al la krado.
    const seg = kradaSegmentoAlglu(a[0], a[1], b[0], b[1]);
    let nx, nz;
    if ( seg ) {
      if ( seg.linioX !== null ) {
        a[0] = seg.linioX; b[0] = seg.linioX;
        nx = seg.linioX;
        nz = Math.round(( a[1] + plejT * ( b[1] - a[1] ) ) * 2) / 2;
      } else {
        a[1] = seg.linioZ; b[1] = seg.linioZ;
        nz = seg.linioZ;
        nx = Math.round(( a[0] + plejT * ( b[0] - a[0] ) ) * 2) / 2;
      }
    } else {
      // Algluita punkto restas SUR la krada linio; alie la projekcio sur la
      // segmenton ( 0.5-algluita ).
      nx = algluo ? gx : Math.round(( a[0] + plejT * ( b[0] - a[0] ) ) * 2) / 2;
      nz = algluo ? gz : Math.round(( a[1] + plejT * ( b[1] - a[1] ) ) * 2) / 2;
    }
    v.punktoj.splice(plej + 1, 0, [ nx, nz ]);
    elektitaPunkto = plej + 1;
  }
  sxangxita = true;
  gxisdatigiVojajnRegilojn();
  bezonoDesegno = true;
}

// forigiVojanPunkton — forigu la punkton ( la vojo restas kun almenaux 2 ).
function forigiVojanPunkton(vi, pi) {
  const v = vojoj[vi];
  if ( !v || v.punktoj.length <= 2 ) return;
  momenti();
  v.punktoj.splice(pi, 1);
  elektitaVojo = vi;
  elektitaPunkto = Math.max(0, pi - 1);
  sxangxita = true;
  gxisdatigiVojajnRegilojn();
  bezonoDesegno = true;
}

// sxangxiKradanCelon — la klako-redaktado sur la 2D-mapo. la elektita paletra
// tipo metas sur la ĉelon ( aŭ ALDONAS novan ĉelon ĉe la klakita pozicio );
// Aŭtomata ⚙️ forigas la superon — la ĉelo revenas al la generita tipo, aŭ
// foriĝas se ĝi estis aldonita.
function sxangxiKradanCelon(mx, mz) {
  const plano = kradoPlano();
  const PASXO = plano.PASXO;
  const c = Math.round(( mx - kradoOfsX ) / PASXO);
  const r = Math.round(( mz - kradoOfsZ ) / PASXO);
  // La kvar-bloka krado — la klako ŝanĝas la INDIVIDUAN konstruajxon ( la
  // sub-blokon ) sub la kursoro, ne la tutan blokon. La sub-pozicio estas la
  // plej proksima angulo ( NE, NW, SW, SE je ±BLOKO — 8 ).
  if ( kradoBloko === "kvar" ) {
    const BLOKO = 0o10;
    const cx = kradoOfsX + c * PASXO, cz = kradoOfsZ + r * PASXO;
    let plej = "NE", plejD = Infinity;
    for ( const [ sx, sz, nomo ] of [ [ BLOKO, BLOKO, "NE" ], [ -BLOKO, BLOKO, "NW" ], [ -BLOKO, -BLOKO, "SW" ], [ BLOKO, -BLOKO, "SE" ] ] ) {
      const d = Math.hypot(mx - ( cx + sx ), mz - ( cz + sz ));
      if ( d < plejD ) { plejD = d; plej = nomo; }
    }
    const ŝ = c + "," + r + "," + plej;
    if ( kradoTipoElektita === "automata" ) {
      if ( !kradoSuperoj.delete(ŝ) ) return;   // neniu sub-supero — nenio ŝanĝiĝas
    } else {
      // Limoj — la krado povas etendiĝi nur al la rando de la mondo.
      if ( Math.abs(c * PASXO + kradoOfsX) > MONDO_HALFO || Math.abs(r * PASXO + kradoOfsZ) > MONDO_HALFO ) return;
      kradoSuperoj.set(ŝ, kradoTipoElektita);
    }
    gxisdatigiKradon();
    return;
  }
  const ŝ = c + "," + r;
  if ( kradoTipoElektita === "automata" ) {
    if ( !kradoSuperoj.delete(ŝ) ) return;   // neniu supero — nenio ŝanĝiĝas
  } else {
    // Limoj — la krado povas etendiĝi nur al la rando de la mondo.
    if ( Math.abs(c * PASXO + kradoOfsX) > MONDO_HALFO || Math.abs(r * PASXO + kradoOfsZ) > MONDO_HALFO ) return;
    kradoSuperoj.set(ŝ, kradoTipoElektita);
  }
  gxisdatigiKradon();
}

// desegniKradanTavolon — la krada urbo sur AJNA kunteksto. vojoj ( larĝaj
// strioj ), spronoj ( maldikaj linioj ) kaj konstruaĵoj ( kvadratoj turnitaj
// per la rotacio, kun blanka pordo-punkto — la pordoj kaj la turnitaj
// kvar-blokaj konstruaĵoj videblas ). X/Z mapas la planajn koordinatojn
// ( relativaj al la krada centro ) al pikseloj; skalo estas pikseloj po
// mond-unuo. La tavolo desegniĝas sur la 2D-mapo ( kun la vido kaj la
// ofseto ).
const KRADAJ_KOLOROJ = {
  sanktejo: "#e0b840",
  turo: "#98a8b8",
  domo: "#c08858",
  mangxejo: "#e07050",
  kasafeo: "#6898d8",
  stacio: "#9868e0",
};
function desegniKradanTavolon(k, plano, X, Z, skalo) {
  // Vojoj — la samaj segmentoj kiel la ludo ( plena larĝo 3.5 ).
  k.lineWidth = 3.5 * skalo;
  k.strokeStyle = "rgba(218,218,228,0.9)";
  k.beginPath();
  for ( const v of plano.vojoj ) {
    if ( v.orient === "EW" ) { k.moveTo(X(v.de), Z(v.poz)); k.lineTo(X(v.al), Z(v.poz)); }
    else { k.moveTo(X(v.poz), Z(v.de)); k.lineTo(X(v.poz), Z(v.al)); }
  }
  k.stroke();
  // Spronoj — la pordaj vojetoj ( maldikaj ).
  k.lineWidth = Math.max(1, 1.4 * skalo);
  k.strokeStyle = "rgba(255,255,255,0.55)";
  k.beginPath();
  for ( const sp of plano.spronoj ) {
    k.moveTo(X(sp.de[0]), Z(sp.de[1]));
    k.lineTo(X(sp.al[0]), Z(sp.al[1]));
  }
  k.stroke();
  // Konstruaĵoj — kvadratoj ( 8×8 ) turnitaj per la rotacio, la pordo kiel
  // blanka punkto je la porda distanco.
  const radu = 5.657 * skalo;   // la duona diagonalo de 8×8
  for ( const b of plano.konstruaĵoj ) {
    const sx = X(b.x), sy = Z(b.z);
    const koloro = b.stacia ? KRADAJ_KOLOROJ.stacio : KRADAJ_KOLOROJ[b.tipo];
    k.fillStyle = koloro;
    k.beginPath();
    for ( let q = 0; q < 4; q++ ) {
      const ang = b.rot + Math.PI / 4 + q * Math.PI / 2;
      const px = sx + Math.cos(ang) * radu;
      const py = sy + Math.sin(ang) * radu;
      if ( q === 0 ) k.moveTo(px, py); else k.lineTo(px, py);
    }
    k.closePath();
    k.fill();
    k.strokeStyle = "rgba(0,0,0,0.35)";
    k.lineWidth = 1;
    k.stroke();
    const pdx = X(b.x + Math.sin(b.rot) * 5.5);
    const pdz = Z(b.z + Math.cos(b.rot) * 5.5);
    k.fillStyle = "rgba(255,255,255,0.9)";
    k.beginPath();
    k.arc(pdx, pdz, Math.max(1.5, 1.2 * skalo), 0, Math.PI * 2);
    k.fill();
  }
}

// ⟪ La 3D-aspekto ⟫
// rekonstruiKradon3D — la nuna krada aranĝo kiel reala 3D-aspekto en la
// 3D-vido. la konstruaĵoj estas la VERAJ konstruaĵoj de la ludo ( la sama
// konstruiSatalon kiel en urbo.ts — realaj meshoj, materialoj, pordoj kaj la
// diamanta spegulo ) kaj la vojoj maldikaj ebenaj strioj sur la tereno ĉe la
// ofseto. konstruiSatalon aldonas la grupon ( kaj la spegulajn kopiojn )
// REKTE al la sceno, do la objektoj estas spurataj en krada3DKonstruajxoj
// por la forigo ĉe rekonstruo kaj la videbleco dum la langetoj.
let krada3DKonstruajxoj = [];
// rekonstruiVojojn3D — la mond-nivelaj vojoj kiel reala 3D-aspekto en la
// 3D-vido — la SAMAJ dioritaj/andezitaj vojoj kiel la ludo ( konstruiVojojn
// el assets/medio/vojoj.ts ), sekvantaj la terenon ( kun la sama vertikala
// troigo kiel la tera meŝo ). Videblaj nur dum la Vojoj sub-langeto estas
// aktiva ( vojojAktiva — sxaltiIlTabon / sxaltiSubTabojn administras la
// videblecon ). Rekonstruiĝas ĉe ĉiu voja ŝanĝo ( gxisdatigiVojajnRegilojn ),
// sed NE dum la treno — la 2D-mapo montras la vivan trenon, la 3D refreŝiĝas
// ĉe la fino de la treno.
function rekonstruiVojojn3D() {
  if ( !vojaGrupo3D ) return;
  while ( vojaGrupo3D.children.length ) {
    const m = vojaGrupo3D.children.pop();
    if ( m.geometry ) m.geometry.dispose();
    if ( m.material ) {
      const matoj = Array.isArray(m.material) ? m.material : [ m.material ];
      for ( const mat of matoj ) mat.dispose();
    }
  }
  const difinoj = [];
  for ( const v of vojoj ) {
    if ( !v.punktoj || v.punktoj.length < 2 ) continue;
    for ( let i = 0; i < v.punktoj.length - 1; i++ ) {
      difinoj.push({ pts: [ v.punktoj[i], v.punktoj[i + 1] ], w: ( v.larĝo || 3.5 ) / 2 });
    }
  }
  if ( !difinoj.length ) return;
  const alteco = ( x, z ) => ( bazaAlteco(x, z) + deltoInterp(x, z) ) * YTROIGO;
  // La samaj materialoj kiel la ludo — la diorita centro kun la andezitaj
  // bordoj ( konstruiVojojn klonas ilin kaj aplikas la teksajxojn ).
  konstruiVojojn(vojaGrupo3D, difinoj, alteco, kreiDioritanMaterialon(), kreiAndezitanMaterialon());
  vojaGrupo3D.visible = vojojAktiva();
}
function rekonstruiKradon3D() {
  if ( !kradaGrupo3D ) return;
  // Forigu la malnovajn konstruaĵojn ( la grupoj kaj la speguloj — rekte en
  // la sceno ) kaj la vojojn el la grupo.
  for ( const o of krada3DKonstruajxoj ) {
    if ( o.parent ) o.parent.remove(o);
    const forigitaj = new Set();
    o.traverse(m => {
      if ( m.isMesh ) {
        if ( m.geometry && !forigitaj.has(m.geometry) ) { m.geometry.dispose(); forigitaj.add(m.geometry); }
        const matoj = Array.isArray(m.material) ? m.material : [ m.material ];
        for ( const mat of matoj ) if ( mat && !forigitaj.has(mat) ) { mat.dispose(); forigitaj.add(mat); }
      }
    });
  }
  krada3DKonstruajxoj = [];
  while ( kradaGrupo3D.children.length ) {
    const m = kradaGrupo3D.children.pop();
    if ( m.geometry ) m.geometry.dispose();
    if ( m.material ) m.material.dispose();
  }
  if ( kradaStaciaGrupo3D ) while ( kradaStaciaGrupo3D.children.length ) {
    const m = kradaStaciaGrupo3D.children.pop();
    if ( m.geometry ) m.geometry.dispose();
    if ( m.material ) m.material.dispose();
  }
  const plano = kradoPlano();
  const grundo = ( x, z ) => bazaAlteco(x, z) + deltoInterp(x, z);
  const vojaMaterialo = new THREE.MeshStandardMaterial({ color: 0xd8e0e8, roughness: 0.9 });
  const vojaAlto = 0o1/0o10 * 2;   // 0.25
  for ( const v of plano.vojoj ) {
    // La STACIAJ vojoj ( la etendaĵoj de la mond-nivelaj vojoj ) apartenas
    // al sia propra grupo — ili montriĝas kun la krado, sed KAŜIĜAS dum la
    // Vojoj sub-langeto ( la VERAJ mond-vojoj montriĝas tie, kaj la staciaj
    // duobligus la saman vojon ).
    const grupo = v.stacia && kradaStaciaGrupo3D ? kradaStaciaGrupo3D : kradaGrupo3D;
    const longo = Math.abs(v.al - v.de);
    const mezo = ( v.de + v.al ) / 2;
    const x = v.orient === "EW" ? mezo : v.poz;
    const z = v.orient === "EW" ? v.poz : mezo;
    const geo = new THREE.BoxGeometry(v.orient === "EW" ? longo : 3.5, vojaAlto, v.orient === "EW" ? 3.5 : longo);
    const mesho = new THREE.Mesh(geo, vojaMaterialo);
    mesho.position.set(kradoOfsX + x, grundo(kradoOfsX + x, kradoOfsZ + z) + vojaAlto / 2, kradoOfsZ + z);
    grupo.add(mesho);
  }
  // La konstruaĵoj — la VERAJ sataloj de la ludo ( la samaj specoj kiel en
  // urbo.ts. la stacidoma ĉelo ( unu ) kaj la kvar-bloka centro estas
  // stacioxipo, la ceteraj laŭ la ĉela tipo ).
  const selektajxoj = [];
  for ( let i = 0; i < plano.konstruaĵoj.length; i++ ) {
    const b = plano.konstruaĵoj[i];
    // La pentritaj stacioj ( kaj la aŭtomataj ) konstruiĝas kiel stacioxipo.
    const tipo = ( b.stacia || b.tipo === "stacio" ) ? "stacioxipo" : b.tipo;
    const wx = kradoOfsX + b.x, wz = kradoOfsZ + b.z;
    const niveloj = tipo === "stacioxipo" ? 3 : tipo === "turo" ? 0o10 : 4;
    const spec = {
      x: wx, z: wz, type: tipo, name: "krado" + i,
      niveloj, w: 0o10, d: 0o10,
      tieroAlto: tipo === "stacioxipo" ? 0o155/0o40 : tipo === "turo" ? 0o30/0o10 : tipo === "kasafeo" ? 0o155/0o40 : 0o315/0o100,
      rot: b.rot, diamond: true,
      h0: grundo(wx, wz),
      sube: tipo === "stacioxipo" ? 0 : niveloj,
      tieroAltoSub: 0o123/0o40,
    };
    const antaŭ = sceno3d.children.length;
    konstruiSatalon(spec, sceno3d, selektajxoj);
    // konstruiSatalon aldonas la grupon, la spegulan kopion kaj la oran
    // ringon rekte al la sceno — spurigu ĉiujn tri por la forigo/videbleco.
    krada3DKonstruajxoj.push(...sceno3d.children.slice(antaŭ));
  }
  // Keŭfĥesoj — la kvar sespintaj strukturoj ĉirkaŭ la centro ( la sama
  // geometrio kiel la ludo. R=10, unu ekster ĉiu pinto de la centra
  // sanktejo je 45°-obloj ). Montriĝas nur kiam la redaktata urbo havas
  // ilin. La grupo aldoniĝas rekte al la sceno — spurita en
  // krada3DKonstruajxoj por la forigo kaj la videbleco.
  if ( urboj[elektitaUrbo] && urboj[elektitaUrbo].keuxfhxeso ) {
    const KEUXFHXESO_R = 0o10;
    const lokoj = [];
    for ( let i = 0; i < 4; i++ ) {
      const a = Math.PI / 4 + i * Math.PI / 2;
      lokoj.push({ x: kradoOfsX + Math.cos(a) * KEUXFHXESO_R, z: kradoOfsZ + Math.sin(a) * KEUXFHXESO_R, rot: a });
    }
    const antaŭ = sceno3d.children.length;
    konstruiKeuxfhxeso(sceno3d, lokoj, grundo, ORA_MATERIALO);
    krada3DKonstruajxoj.push(...sceno3d.children.slice(antaŭ));
  }
  // La kradaj strato-lampoj — la kvar-lampa ŝablono ĉirkaŭ la placo-nodoj kaj
  // la kruciĝoj ( la sama geometrio kiel la ludo, de la plano ). La VERAJ
  // lampaj meshxoj de la ludo ( konstruiHxeuxfojn — kolonoj, bovloj, flamoj ),
  // kun la komuna diorita/ora materialo. La flamoj ne animiĝas ĉi tie ( la
  // ludo faras tion per animaciiFlammojn ); la sparklaj punktoj restas
  // statikaj sed videblaj.
  if ( urboj[elektitaUrbo] && urboj[elektitaUrbo].lampoj !== false ) {
    const spots = kradoPlano().lampoj.map(l => ( { x: kradoOfsX + l.x, z: kradoOfsZ + l.z, y: grundo(kradoOfsX + l.x, kradoOfsZ + l.z), rotacio: Math.PI / 4 } ));
    if ( spots.length ) {
      const antaŭ = sceno3d.children.length;
      konstruiHxeuxfojn(sceno3d, spots, dioritaMaterialo(), ORA_MATERIALO);
      krada3DKonstruajxoj.push(...sceno3d.children.slice(antaŭ));
    }
  }
  krada3DKonstruajxoj.forEach(o => { o.visible = aktivaTabo === "krado"; });
  if ( kradaStaciaGrupo3D ) kradaStaciaGrupo3D.visible = aktivaTabo === "krado" && !vojojAktiva();
}

// La paletro — elektas la tipon por la klako-redaktado. Aŭtomata ⚙️ ( la
// defaŭlto ) resendas la ĉelon al la generita tipo aŭ forigas aldonitan.
document.querySelectorAll("#kradaro button").forEach(b => {
  b.addEventListener("click", () => {
    kradoTipoElektita = b.dataset.kradoTipo;
    document.querySelectorAll("#kradaro button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  });
});
// La urbo-elektilo — elekti urbon sxargas gxian aranĝon en la regilojn.
urboElektilo.addEventListener("change", () => elektiUrbon(parseInt(urboElektilo.value, 10) || 0));
urboNomoEl.addEventListener("input", () => {
  const u = urboj[elektitaUrbo];
  if ( !u ) return;
  u.nomo = urboNomoEl.value;
  gxisdatigiUrboElektilon();
  sxangxita = true;
  bezonoDesegno = true;
});
urboAldoniBtn.addEventListener("click", () => {
  urboj.push({ nomo: "Nova urbo", arangxaGrando: 1, blokaGrando: "unu", ofsX: 0o200, ofsZ: -0o200, aldonajBlokoj: [] });
  elektiUrbon(urboj.length - 1);
  sxangxita = true;
  bezonoDesegno = true;
});
urboForigiBtn.addEventListener("click", () => {
  if ( urboj.length <= 1 ) return;
  urboj.splice(elektitaUrbo, 1);
  elektiUrbon(Math.max(0, elektitaUrbo - 1));
  sxangxita = true;
  bezonoDesegno = true;
});
// La agordoj — ĉiu ŝanĝo rekonstruas la planon tuj kaj skribas reen al la
// elektita urbo ( la savo skribas la urbojn al SKULPTA_URBOJ ).
kradoGrandecoEl.addEventListener("change", () => { kradoGrandeco = parseInt(kradoGrandecoEl.value, 10); skribiElektitanUrbon(); gxisdatigiKradon(); });
kradoBlokoEl.addEventListener("change", () => { kradoBloko = kradoBlokoEl.value; skribiElektitanUrbon(); gxisdatigiKradon(); });
kradoOfsXEl.addEventListener("change", () => { kradoOfsX = parseFloat(kradoOfsXEl.value) || 0; skribiElektitanUrbon(); gxisdatigiUrboElektilon(); gxisdatigiKradon(); });
kradoOfsZEl.addEventListener("change", () => { kradoOfsZ = parseFloat(kradoOfsZEl.value) || 0; skribiElektitanUrbon(); gxisdatigiUrboElektilon(); gxisdatigiKradon(); });
kradoKeuxfhxesoEl.addEventListener("change", () => { kradoKeuxfhxeso = kradoKeuxfhxesoEl.checked; skribiElektitanUrbon(); gxisdatigiKradon(); });
kradoLampojEl.addEventListener("change", () => { kradoLampoj = kradoLampojEl.checked; skribiElektitanUrbon(); gxisdatigiKradon(); });
// La aldonaj blokoj — ĉiu ŝanĝo skribas la blokon reen al la urbo ( la savo
// skribas la urbojn al SKULPTA_URBOJ ) kaj rekonstruas la planon tuj.
aldonaBlokoElektilo.addEventListener("change", () => {
  elektitaAldonaBloko = parseInt(aldonaBlokoElektilo.value, 10) || 0;
  gxisdatigiAldonaBlokojn();
  bezonoDesegno = true;
});
aldonaBlokoTipoEl.addEventListener("change", () => { skribiAldonanBlokon(); gxisdatigiAldonaBlokojn(); gxisdatigiKradon(); });
aldonaBlokoXEl.addEventListener("change", () => { skribiAldonanBlokon(); gxisdatigiAldonaBlokojn(); gxisdatigiKradon(); });
aldonaBlokoZEl.addEventListener("change", () => { skribiAldonanBlokon(); gxisdatigiAldonaBlokojn(); gxisdatigiKradon(); });
aldonaBlokoRotEl.addEventListener("change", () => { skribiAldonanBlokon(); gxisdatigiKradon(); });
aldonaBlokoStaciaEl.addEventListener("change", () => { skribiAldonanBlokon(); gxisdatigiAldonaBlokojn(); gxisdatigiKradon(); });
aldonaBlokoKonektitaEl.addEventListener("change", () => { skribiAldonanBlokon(); gxisdatigiAldonaBlokojn(); gxisdatigiKradon(); });
aldonaBlokoAldoniBtn.addEventListener("click", () => {
  const u = urboj[elektitaUrbo];
  if ( !u ) return;
  momenti();
  if ( !u.aldonajBlokoj ) u.aldonajBlokoj = [];
  const pasxo = kradoBloko === "kvar" ? 0o40 : 0o30;
  const stacioZ = kradoBloko === "kvar" ? 0 : kradoGrandeco * pasxo + 0o30;
  u.aldonajBlokoj.push({ x: 0, z: stacioZ, tipo: "sanktejo", rot: Math.PI, sub: "centro", stacia: true, konektita: true });
  elektitaAldonaBloko = u.aldonajBlokoj.length - 1;
  sxangxita = true;
  gxisdatigiAldonaBlokojn();
  gxisdatigiKradon();
});
aldonaBlokoForigiBtn.addEventListener("click", () => {
  const u = urboj[elektitaUrbo];
  const blokoj = u && u.aldonajBlokoj ? u.aldonajBlokoj : [];
  if ( !blokoj.length ) return;
  momenti();
  blokoj.splice(elektitaAldonaBloko, 1);
  elektitaAldonaBloko = Math.max(0, elektitaAldonaBloko - 1);
  sxangxita = true;
  gxisdatigiAldonaBlokojn();
  gxisdatigiKradon();
});
// La Vojoj sub-langeto — ĉiu ŝanĝo skribas la datumojn kaj markas la dosieron
// sxangxita ( la savo skribas SKULPTA_VOJOJ kaj SKULPTA_DOKOJ ).
vojoElektilo.addEventListener("change", () => {
  elektitaVojo = parseInt(vojoElektilo.value, 10) || 0;
  elektitaPunkto = -1;
  gxisdatigiVojajnRegilojn();
  bezonoDesegno = true;
});
vojoNomoEl.addEventListener("input", () => { skribiVojajnRegilojn(); gxisdatigiVojajnRegilojn(); bezonoDesegno = true; });
vojoLargxoEl.addEventListener("change", () => { skribiVojajnRegilojn(); bezonoDesegno = true; });
vojoPunktoElektilo.addEventListener("change", () => {
  elektitaPunkto = parseInt(vojoPunktoElektilo.value, 10) || 0;
  gxisdatigiVojajnRegilojn();
  bezonoDesegno = true;
});
vojoPunktoXEl.addEventListener("change", () => { skribiVojajnRegilojn(); gxisdatigiVojajnRegilojn(); bezonoDesegno = true; });
vojoPunktoZEl.addEventListener("change", () => { skribiVojajnRegilojn(); gxisdatigiVojajnRegilojn(); bezonoDesegno = true; });
vojoAldoniBtn.addEventListener("click", () => {
  momenti();
  const v = vojoj[elektitaVojo];
  const last = v && v.punktoj && v.punktoj.length ? v.punktoj[v.punktoj.length - 1] : [ 0, 0 ];
  vojoj.push({ nomo: "Nova vojo", larĝo: 3.5, punktoj: [ [ Math.round(( last[0] - 10 ) * 2) / 2, last[1] ], [ Math.round(( last[0] + 10 ) * 2) / 2, last[1] ] ] });
  elektitaVojo = vojoj.length - 1;
  elektitaPunkto = -1;
  sxangxita = true;
  gxisdatigiVojajnRegilojn();
  bezonoDesegno = true;
});
vojoForigiBtn.addEventListener("click", () => {
  if ( vojoj.length <= 1 ) return;
  momenti();
  vojoj.splice(elektitaVojo, 1);
  elektitaVojo = Math.max(0, elektitaVojo - 1);
  elektitaPunkto = -1;
  sxangxita = true;
  gxisdatigiVojajnRegilojn();
  bezonoDesegno = true;
});
vojoPunktoAldoniBtn.addEventListener("click", () => {
  const v = vojoj[elektitaVojo];
  if ( !v ) return;
  momenti();
  const last = v.punktoj[v.punktoj.length - 1];
  v.punktoj.push([ Math.round(( last[0] + 10 ) * 2) / 2, Math.round(last[1] * 2) / 2 ]);
  elektitaPunkto = v.punktoj.length - 1;
  sxangxita = true;
  gxisdatigiVojajnRegilojn();
  bezonoDesegno = true;
});
vojoPunktoForigiBtn.addEventListener("click", () => {
  const v = vojoj[elektitaVojo];
  if ( !v || v.punktoj.length <= 2 ) return;
  momenti();
  v.punktoj.splice(elektitaPunkto, 1);
  elektitaPunkto = Math.max(0, elektitaPunkto - 1);
  sxangxita = true;
  gxisdatigiVojajnRegilojn();
  bezonoDesegno = true;
});
dokoElektilo.addEventListener("change", () => {
  elektitaDoko = parseInt(dokoElektilo.value, 10) || 0;
  gxisdatigiVojajnRegilojn();
  bezonoDesegno = true;
});
dokoXEl.addEventListener("change", () => { skribiVojajnRegilojn(); gxisdatigiVojajnRegilojn(); bezonoDesegno = true; });
dokoZEl.addEventListener("change", () => { skribiVojajnRegilojn(); gxisdatigiVojajnRegilojn(); bezonoDesegno = true; });
dokoProfundoEl.addEventListener("change", () => { skribiVojajnRegilojn(); bezonoDesegno = true; });
dokoAldoniBtn.addEventListener("click", () => {
  momenti();
  const last = dokoj[dokoj.length - 1];
  dokoj.push({ x: last ? Math.round(( last.x + 24 ) * 2) / 2 : 0, z: last ? last.z : 0, profundo: 16 });
  elektitaDoko = dokoj.length - 1;
  sxangxita = true;
  gxisdatigiVojajnRegilojn();
  bezonoDesegno = true;
});
dokoForigiBtn.addEventListener("click", () => {
  if ( dokoj.length <= 1 ) return;
  momenti();
  dokoj.splice(elektitaDoko, 1);
  elektitaDoko = Math.max(0, elektitaDoko - 1);
  sxangxita = true;
  gxisdatigiVojajnRegilojn();
  bezonoDesegno = true;
});
document.querySelectorAll("#vojaIloj button").forEach(b => {
  b.addEventListener("click", () => {
    vojaIlo = b.dataset.vojaIlo;
    document.querySelectorAll("#vojaIloj button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  });
});
kradoRestarigiBtn.addEventListener("click", () => { kradoSuperoj.clear(); gxisdatigiKradon(); });
kradoKopiiBtn.addEventListener("click", async () => {
  const u = urboj[elektitaUrbo];
  const teksto = u
    ? `{ nomo: "${u.nomo}", arangxaGrando: ${u.arangxaGrando}, blokaGrando: "${u.blokaGrando}", ofsX: ${u.ofsX}, ofsZ: ${u.ofsZ} }`
    : "";
  try {
    await navigator.clipboard.writeText(teksto);
    statuso("Kopiita: " + teksto);
  } catch {
    statuso("Ne eblis kopii aŭtomate — elektu mane: " + teksto);
  }
});

// La akva nivelo apartenas al la peniko Akvo 🌊 — gxi montrigxas en la
// agordoj nur dum la akvo-ilo estas aktiva ( ne kun la aliaj iloj ).
const akvaNivelaEtikedo = document.getElementById("akvaNivelaEtikedo");
const agordojPanel = document.getElementById("agordojPanel");
function gxisdatigiAgordojn() {
  const akva = penikoAktiva === "akvo";
  akvaNivelaEtikedo.style.display = akva ? "" : "none";
  niveloRegilo.style.display = akva ? "" : "none";
}
objektoSpeco.addEventListener("change", () => {
  objektoAktiva = objektoSpeco.value;
  gxisdatigiObjektoPropOJn();
  rekonstruiObjektanAntauxrigardon();
  bezonoDesegno = true;
});
gxisdatigiObjektoPropOJn();
rekonstruiObjektanAntauxrigardon();
gxisdatigiObjektoListon();
// Komenca stato — la tereno-langeto aktivas, la agordoj montrigxas ( la
// objekto-panelo fermita ). La objekto-panelo estas thala, kies temo donas
// display.flex ( superregas la hidden-atributon ), do la fermo estas
// eksplicita cxi tie.
objektoPanel.classList.add("kobe");
agordojPanel.classList.remove("kobe");
sxaltiIlTabon("tereno");
gxisdatigiPenikaron();
gxisdatigiAgordojn();
gxisdatigiVojajnRegilojn();
radiusoRegilo.addEventListener("input", () => { gxisdatigiValorojn(); bezonoDesegno = true; });
fortoRegilo.addEventListener("input", gxisdatigiValorojn);
niveloRegilo.addEventListener("pointerdown", momenti);
niveloRegilo.addEventListener("input", () => {
  akvaNiveloValoro = +niveloRegilo.value;
  gxisdatigiValorojn();
  pentri(0, 0, REZ - 1, REZ - 1);
  bezonoDesegno = true;
  sxangxita = true;
  if ( triaDimensia ) gxisdatigi3DAkvon({ ix0: 0, ix1: N - 1, iz0: 0, iz1: N - 1 });
});
document.getElementById("malfari").addEventListener("click", malfari);
document.getElementById("refari").addEventListener("click", refari);
document.getElementById("restarigi").addEventListener("click", () => {
  momenti();
  deltoj.fill(0);
  masko.fill(0);
  biomoj.fill(0);
  bestoj.fill(0);
  sxangxita = true;
  gxisdatigiPlenan2Dn();
  gxisdatigi3DnPostPlena();
});
// La klavara movado — la sama ŝablono kiel la ludo. Kolektu la tenatajn
// klavojn kaj lasu moviKlavare apliki ilin cxiun kadron. La klavoj en
// agordaj enigoj ( ekz. la glitiloj ) restas por la enigo mem.
function klavoDeKodo(kodo) {
  switch ( kodo ) {
    case "KeyW": case "ArrowUp": return "w";
    case "KeyA": case "ArrowLeft": return "a";
    case "KeyS": case "ArrowDown": return "s";
    case "KeyD": case "ArrowRight": return "d";
    case "KeyQ": return "q";
    case "KeyE": return "e";
    case "ShiftLeft": case "ShiftRight": return "Shift";
    case "Equal": case "NumpadAdd": return "zomi";
    case "Minus": case "NumpadSubtract": return "malzomi";
    default: return null;
  }
}
window.addEventListener("keydown", ( e ) => {
  if ( ( e.ctrlKey || e.metaKey ) && e.key.toLowerCase()=== "z" ) {
    e.preventDefault();
    if ( e.shiftKey ) refari(); else malfari();
    return;
  }
  if ( ( e.ctrlKey || e.metaKey ) && e.key.toLowerCase()=== "y" ) {
    e.preventDefault();
    refari();
    return;
  }
  // Ne trinku la klavojn, kiam la fokuso estas en enigo aŭ alklakita butono,
  // nek kiam Ctrl estas tenata ( la retumilaj ŝparvojoj restu liberaj ).
  if ( e.ctrlKey || e.metaKey ) return;
  const celo = e.target;
  if ( celo && ( celo.tagName === "INPUT" || celo.tagName === "SELECT" || celo.tagName === "TEXTAREA" ) ) return;
  // En la objekta ilo la klavo Forigi ( aŭ Retropaŝo ) forigas la elektitan
  // objekton — la sama ago kiel la butono Forigi ✕ en la listo.
  if ( objektaModo && elektitaObjekto >= 0
    && ( e.key === "Delete" || e.key === "Backspace" ) ) {
    e.preventDefault();
    forigiObjekton(elektitaObjekto);
    return;
  }
  const klavo = klavoDeKodo(e.code);
  if ( !klavo ) return;
  e.preventDefault();
  prematajKlavoj.add(klavo);
});
window.addEventListener("keyup", ( e ) => {
  const klavo = klavoDeKodo(e.code);
  if ( klavo ) prematajKlavoj.delete(klavo);
});
window.addEventListener("blur", () => prematajKlavoj.clear());

// ════════════════════════ Kodigo kaj dosiero ════════════════════════
function oktala(valoro) {
  const n = Math.round(valoro * 0o100);
  if ( n % 0o100 === 0 ) {
    const tuta = n / 0o100;
    return ( tuta < 0 ? "-" : "" ) + "0o" + Math.abs(tuta).toString(8);
  }
  return ( n < 0 ? "-" : "" ) + "0o" + Math.abs(n).toString(8) + "/0o100";
}
// gcdn — la plej granda komuna divizoro ( por simpligi la π-frakciojn ).
function gcdn(a, b) {
  a = Math.abs(a); b = Math.abs(b);
  while ( b ) { const r = a % b; a = b; b = r; }
  return a || 1;
}
// piFrakcio — ĉu la valoro estas ekzakta π-frakcio ( Math.PI, Math.PI/2,
// 3*Math.PI/4, ... )? Revenu la tekston de la ekzakta esprimo, aux null.
function piFrakcio(valoro) {
  if ( !Number.isFinite(valoro) ) return null;
  const r = valoro / Math.PI;
  if ( Math.abs(r) < 1e-9 ) return "0";
  for ( let d = 1; d <= 0o20; d++ ) {
    const k = Math.round(r * d);
    if ( Math.abs(r - k / d) < 1e-7 ) {
      if ( k === 0 ) return "0";
      const g = gcdn(k, d);
      const kk = k / g, dd = d / g;
      const signo = kk < 0 ? "-" : "";
      const abso = Math.abs(kk);
      if ( dd === 1 ) {
        return abso === 1 ? signo + "Math.PI" : signo + abso + " * Math.PI";
      }
      return abso === 1 ? signo + "Math.PI / " + dd : signo + abso + " * Math.PI / " + dd;
    }
  }
  return null;
}
// formatiNombron — la nombro-stilo de la datumaro. tutaj nombroj kiel
// ok-taloj ( 0o140 anstataux 96 ), turnoj kiel ekzaktaj π-frakcioj
// ( Math.PI / 2 anstataux 1.5707963267948966 ), 1/64-oj kiel ok-talaj
// frakcioj ( 0o340/0o100 anstataux 3.5 ). Nur la ceteraj glit-komoj ( ekz.
// la sin-kalkulitaj dokaj z ) restas dekumaj.
function formatiNombron(valoro) {
  if ( !Number.isFinite(valoro) ) return "null";
  if ( valoro === 0 ) return "0";
  const p = piFrakcio(valoro);
  if ( p !== null ) return p;
  if ( Number.isInteger(valoro) && Math.abs(valoro) <= 0o7777777777 ) {
    return ( valoro < 0 ? "-" : "" ) + "0o" + Math.abs(valoro).toString(8);
  }
  const n64 = valoro * 0o100;
  if ( Number.isInteger(n64) && Math.abs(n64) <= 0o7777777777 ) {
    return ( n64 < 0 ? "-" : "" ) + "0o" + Math.abs(n64).toString(8) + "/0o100";
  }
  return String(valoro);
}
// skribiValoron — skribu datuman valoron ( urbojn, vojojn, dokojn, objektojn )
// en la nombro-stilon de la dosiero ( ok-taloj, π-frakcioj ) anstataux JSON.
function skribiValoron(valoro) {
  if ( valoro === null || valoro === undefined ) return "null";
  const t = typeof valoro;
  if ( t === "number" ) return formatiNombron(valoro);
  if ( t === "boolean" ) return valoro ? "true" : "false";
  if ( t === "string" ) return JSON.stringify(valoro);
  if ( Array.isArray(valoro) ) return "[ " + valoro.map(skribiValoron).join(", ") + " ]";
  const eroj = [];
  for ( const k in valoro ) {
    if ( valoro[k] === undefined ) continue;
    eroj.push(JSON.stringify(k) + ": " + skribiValoron(valoro[k]));
  }
  return "{ " + eroj.join(", ") + " }";
}
// parziValoron — malgranda esprimo-analizilo por la datumaro de la skulptilo.
// La savo skribas la nombrojn kiel ok-talojn ( 0o300 ) kaj la turnojn kiel
// ekzaktajn π-frakciojn ( Math.PI / 2, 3 * Math.PI / 4 ) — JSON.parse ne
// povas legi tiun sintakson, do la dosier-sxargxo uzas cxi tiun analizilon.
// ( JSON mem ankaux parseblas — gxi estas subaro de la gramatiko. )
function parziValoron(teksto) {
  let i = 0;
  const sp = () => { while ( i < teksto.length && /\s/.test(teksto[i]) ) i++; };
  const eraro = () => { throw new Error("Ne-analizebla esprimo ĉe " + i + ": " + teksto.slice(i, i + 0o40)); };
  function nombro() {
    sp();
    const m = teksto.slice(i).match(/^-?0o[0-7]+(?:\/0o[0-7]+)?|^-?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/);
    if ( !m ) eraro();
    i += m[0].length;
    const s = m[0];
    if ( /^0o/.test(s) ) {
      const neg = s.startsWith("-");
      const kerno = neg ? s.slice(1) : s;
      const partoj = kerno.split("/");
      let v = parseInt(partoj[0].slice(2), 8);
      if ( partoj.length > 1 ) v = v / parseInt(partoj[1].slice(2), 8);
      return neg ? -v : v;
    }
    return parseFloat(s);
  }
  function faktoro() {
    sp();
    const c = teksto[i];
    if ( c === "-" ) { i++; return -faktoro(); }
    if ( c === "(" ) { i++; const v = adicio(); sp(); if ( teksto[i] !== ")" ) eraro(); i++; return v; }
    if ( teksto.startsWith("Math.PI", i) ) { i += "Math.PI".length; return Math.PI; }
    return nombro();
  }
  function termo() {
    let v = faktoro();
    for ( ;; ) {
      sp();
      const c = teksto[i];
      if ( c === "*" ) { i++; v = v * faktoro(); }
      else if ( c === "/" ) { i++; v = v / faktoro(); }
      else return v;
    }
  }
  function adicio() {
    let v = termo();
    for ( ;; ) {
      sp();
      const c = teksto[i];
      if ( c === "+" ) { i++; v = v + termo(); }
      else if ( c === "-" ) { i++; v = v - termo(); }
      else return v;
    }
  }
  function stringo() {
    sp();
    if ( teksto[i] !== '"' ) eraro();
    let s = "";
    i++;
    for ( ;; ) {
      if ( i >= teksto.length ) eraro();
      const c = teksto[i];
      if ( c === '"' ) { i++; return s; }
      if ( c === "\\" ) {
        const n = teksto[i + 1];
        if ( n === undefined ) eraro();
        if ( n === "n" ) s += "\n";
        else if ( n === "t" ) s += "\t";
        else if ( n === "r" ) s += "\r";
        else if ( n === "b" ) s += "\b";
        else if ( n === "f" ) s += "\f";
        else if ( n === "u" ) { s += String.fromCharCode(parseInt(teksto.slice(i + 2, i + 6), 16)); i += 4; }
        else s += n;
        i += 2;
      } else { s += c; i++; }
    }
  }
  function valoro() {
    sp();
    const c = teksto[i];
    if ( c === "{" ) {
      i++;
      const o = {};
      sp();
      if ( teksto[i] === "}" ) { i++; return o; }
      for ( ;; ) {
        sp();
        // Posta komo ( { ... , } ) — la ferma krampo fermas la objekton.
        if ( teksto[i] === "}" ) { i++; return o; }
        const k = stringo();
        sp();
        if ( teksto[i] !== ":" ) eraro();
        i++;
        o[k] = valoro();
        sp();
        const d = teksto[i];
        if ( d === "," ) { i++; continue; }
        if ( d === "}" ) { i++; return o; }
        eraro();
      }
    }
    if ( c === "[" ) {
      i++;
      const a = [];
      sp();
      if ( teksto[i] === "]" ) { i++; return a; }
      for ( ;; ) {
        sp();
        // Posta komo ( [ ... , ] ) — la ferma krampo fermas la aron.
        if ( teksto[i] === "]" ) { i++; return a; }
        a.push(valoro());
        sp();
        const d = teksto[i];
        if ( d === "," ) { i++; continue; }
        if ( d === "]" ) { i++; return a; }
        eraro();
      }
    }
    if ( c === '"' ) return stringo();
    if ( teksto.startsWith("true", i) ) { i += 4; return true; }
    if ( teksto.startsWith("false", i) ) { i += 5; return false; }
    if ( teksto.startsWith("null", i) ) { i += 4; return null; }
    return adicio();
  }
  sp();
  const v = valoro();
  sp();
  if ( i !== teksto.length ) eraro();
  return v;
}
function bazo64DeBajtoj(bajtoj) {
  // La bloko estas oblo de 3 ( 0o30000 = 12288 ), por ke btoa ne enmetu
  // padding-signojn ( "=" ) en la mezo — ili rompus la tutan ĉenon.
  let teksto = "";
  const bloko = 0o30000;
  for ( let i = 0; i < bajtoj.length; i += bloko ) {
    teksto += btoa(String.fromCharCode.apply(null, bajtoj.subarray(i, i + bloko)));
  }
  return teksto;
}
function bazo64DeInt16(valoroj) {
  const bajtoj = new Uint8Array(valoroj.length * 2);
  const vido = new DataView(bajtoj.buffer);
  for ( let i = 0; i < valoroj.length; i++ ) vido.setInt16(i * 2, valoroj[i], true);
  return bazo64DeBajtoj(bajtoj);
}
function bazo64DeMasko(maskoDatumoj) {
  const bajtoj = new Uint8Array(Math.ceil(maskoDatumoj.length / 8));
  for ( let i = 0; i < maskoDatumoj.length; i++ ) if ( maskoDatumoj[i] ) bajtoj[i >> 3] |= 1 << ( i & 7 );
  return bazo64DeBajtoj(bajtoj);
}
function bazo64DeBiomoj(biomoDatumoj) {
  // 3 bitoj po cxelo ( 0=aŭtomata, 1=montaro, 2=valo, 3=ebenaĵo,
  // 4=akvaj-plantoj, 5=ekvizeto ) — ok cxeloj po tri bajtoj.
  const bajtoj = new Uint8Array(Math.ceil(( biomoDatumoj.length * 3 ) / 8));
  for ( let i = 0; i < biomoDatumoj.length; i++ ) {
    const b = i * 3;
    bajtoj[b >> 3] |= ( biomoDatumoj[i] & 7 ) << ( b & 7 );
    if ( ( b & 7 ) > 5 ) bajtoj[( b >> 3 ) + 1] |= ( biomoDatumoj[i] & 7 ) >> (8 - ( b & 7 ));
  }
  return bazo64DeBajtoj(bajtoj);
}
function bazo64DeBestoj(bestoDatumoj) {
  // 3 bitoj po cxelo ( bitoj 1=akvaj bestoj, 2=petreloj, 4=NPC-oj ) — ok
  // cxeloj po tri bajtoj.
  const bajtoj = new Uint8Array(Math.ceil(bestoDatumoj.length * 3 / 8));
  for ( let i = 0; i < bestoDatumoj.length; i++ ) {
    const b = i * 3;
    const v = bestoDatumoj[i] & 7;
    bajtoj[b >> 3] |= v << ( b & 7 );
    if ( ( b & 7 ) > 5 ) bajtoj[( b >> 3 ) + 1] |= v >> (8 - ( b & 7 ));
  }
  return bazo64DeBajtoj(bajtoj);
}
function dekodiInt16(kruda) {
  if ( !kruda ) return null;
  const bajtoj = Uint8Array.from(atob(kruda), c => c.charCodeAt(0));
  const vido = new DataView(bajtoj.buffer);
  const valoroj = new Int16Array(bajtoj.length / 2);
  for ( let i = 0; i < valoroj.length; i++ ) valoroj[i] = vido.getInt16(i * 2, true);
  return valoroj;
}
function dekodiMaskon(kruda, kvanto) {
  if ( !kruda ) return null;
  const bajtoj = Uint8Array.from(atob(kruda), c => c.charCodeAt(0));
  const maskoDatumoj = new Uint8Array(kvanto);
  for ( let i = 0; i < kvanto; i++ ) maskoDatumoj[i] = ( bajtoj[i >> 3] >> (i & 7) ) & 1;
  return maskoDatumoj;
}
function dekodiBiomon(kruda, kvanto) {
  if ( !kruda ) return null;
  const bajtoj = Uint8Array.from(atob(kruda), c => c.charCodeAt(0));
  const biomoDatumoj = new Uint8Array(kvanto);
  // 3 bitoj po ĉelo ( 0=aŭtomata, 1=montaro, 2=valo, 3=ebenaĵo,
  // 4=akvaj-plantoj, 5=ekvizeto ) — ok ĉeloj po tri bajtoj.
  for ( let i = 0; i < kvanto; i++ ) {
    const b = i * 3;
    biomoDatumoj[i] = ( bajtoj[b >> 3] >> (b & 7) )
      | ( ( b & 7 ) > 5 ? bajtoj[( b >> 3 ) + 1] : 0 ) << ( 8 - ( b & 7 ) );
    biomoDatumoj[i] &= 7;
  }
  return biomoDatumoj;
}
function dekodiBestojn(kruda, kvanto) {
  if ( !kruda ) return null;
  const bajtoj = Uint8Array.from(atob(kruda), c => c.charCodeAt(0));
  const bestoDatumoj = new Uint8Array(kvanto);
  // 3 bitoj po ĉelo ( bitoj 1=akvaj bestoj, 2=petreloj, 4=NPC-oj ) — ok
  // ĉeloj po tri bajtoj.
  for ( let i = 0; i < kvanto; i++ ) {
    const b = i * 3;
    bestoDatumoj[i] = ( bajtoj[b >> 3] >> (b & 7) )
      | ( ( b & 7 ) > 5 ? bajtoj[( b >> 3 ) + 1] : 0 ) << ( 8 - ( b & 7 ) );
    bestoDatumoj[i] &= 7;
  }
  return bestoDatumoj;
}
// kvantigiDeltojn — la komuna kvantigo ( 1/16-unua precizeco, limigita al la
// int16-gamo ) por la skribo KAJ la memkontrolo, por ke ambaŭ ĉiam kongruu.
function kvantigiDeltojn(){
  const kvantigita = new Int16Array(N * N);
  for ( let i = 0; i < deltoj.length; i++ ) {
    kvantigita[i] = Math.max(-32767, Math.min(32767, Math.round(deltoj[i] * 16)));
  }
  return kvantigita;
}
// cirkuloValidas — antaŭ-skriba memkontrolo. kodigu la datumaron per la samaj
// funkcioj kiel la savo kaj malkodigu ĝin denove, komparante kun la originalo.
// Ĉi tio kaptas ĉian koruptiĝon en la kodigo ( ekz. tranĉita bloko, erara
// bajto-ordo ) antaŭ ol ĝi atingas la dosieron.
function cirkuloValidas(){
  try {
    const kvantigita = kvantigiDeltojn();
    const d = dekodiInt16(bazo64DeInt16(kvantigita));
    const m = dekodiMaskon(bazo64DeMasko(masko), N * N);
    const b = dekodiBiomon(bazo64DeBiomoj(biomoj), N * N);
    const be = dekodiBestojn(bazo64DeBestoj(bestoj), N * N);
    if ( !d || !m || !b || !be || d.length !== kvantigita.length ) return false;
    for ( let i = 0; i < kvantigita.length; i++ ) {
      if ( d[i] !== kvantigita[i] ) return false;
    }
    for ( let i = 0; i < masko.length; i++ ) {
      if ( m[i] !== masko[i] ) return false;
    }
    for ( let i = 0; i < biomoj.length; i++ ) {
      if ( b[i] !== biomoj[i] ) return false;
    }
    for ( let i = 0; i < bestoj.length; i++ ) {
      if ( be[i] !== bestoj[i] ) return false;
    }
    return true;
  } catch { return false; }
}
// cirkuloDeDatumojValidas — la sama memkontrolo por la objektoj, urboj kaj
// vojoj/dokoj. la seriigo ( skribiValoron ) kaj la re-parzigo ( parziValoron )
// devas redoni la saman datumaron, alie la savo skribus koruptitan dosieron.
function cirkuloDeDatumojValidas() {
  try {
    return JSON.stringify(parziValoron(skribiValoron(objektoj))) === JSON.stringify(objektoj)
      && JSON.stringify(parziValoron(skribiValoron(urboj))) === JSON.stringify(urboj)
      && JSON.stringify(parziValoron(skribiValoron(vojoj))) === JSON.stringify(vojoj)
      && JSON.stringify(parziValoron(skribiValoron(dokoj))) === JSON.stringify(dokoj);
  } catch { return false; }
}
// RUNTIMOTEMPLATO — la konstantaj funkcioj de la modulo ( malkodigo kaj
// samplado ) kiujn la LUDO bezonas. La savo skribas ilin al
// src/tero-datumaro/rultempo.ts KUNE kun la konstantaj dosieroj — antaŭe la
// savo emisiis nur la konstantojn kaj detruis la modulon ĉiufoje, kiam oni
// skribis rekte al src/tero-datumo.ts.
// ⚠️ ĈI TIU TEKSTO DEVAS RESTI IDENTA al la funkcion-sekcio en
// src/tero-datumaro/rultempo.ts ( de la „⟪ Dekodo 📃 ⟫”-komento ĝis la fino ).
// Se oni ŝanĝas la funkciojn en la modulo, ĝisdatigu ankaŭ ĉi tiun
// ŝablonon — la savo alie skribus malnoviĝintan version.
const RUNTIMOTEMPLATO = `
// ⟪ Dekodo 📃 ⟫ — unufoje cxe modulo-sxargxo. Malaktiva skulptajxo restas
// malplena, por ke la ludo ne pagu la kradan logikon.
// ⚠️ ĈI TIU FUNKCION-SEKCION DEVAS RESTI IDENTA al la RUNTIMOTEMPLATO en
// iloj/tero-skulptilo.js — la savo de la skulptilo reskribas ĝin kune kun la
// konstantoj ĉiun fojon.

function dekodiInt16(kruda: string): Int16Array | null {
  if ( kruda === "" ) return null;
  try {
    const bajtoj = Uint8Array.from(atob(kruda), c => c.charCodeAt(0));
    const datumoj = new Int16Array(bajtoj.length / 2);
    const vido = new DataView(bajtoj.buffer);
    for ( let i = 0; i < datumoj.length; i++ ) datumoj[i] = vido.getInt16(i * 2, true);
    return datumoj;
  } catch { return null; }
}

function dekodiMaskon(kruda: string, kvanto: number): Uint8Array | null {
  if ( kruda === "" ) return null;
  try {
    const bajtoj = Uint8Array.from(atob(kruda), c => c.charCodeAt(0));
    const masko = new Uint8Array(kvanto);
    for ( let i = 0; i < kvanto; i++ ) masko[i] = ( bajtoj[i >> 3] >> (i & 7) ) & 1;
    return masko;
  } catch { return null; }
}

const DELTAJ: Int16Array | null = SKULPTA_AKTIVA ? dekodiInt16(SKULPTA_DELTAJ) : null;
const AKVA_MASKO: Uint8Array | null = SKULPTA_AKTIVA ? dekodiMaskon(SKULPTA_AKVA_MASKO, SKULPTA_N * SKULPTA_N) : null;
const BIOMOJ: Uint8Array | null = SKULPTA_AKTIVA ? dekodiBiomon(SKULPTA_BIOMOJ, SKULPTA_N * SKULPTA_N) : null;
const BESTOJ: Uint8Array | null = SKULPTA_AKTIVA ? dekodiBestojn(SKULPTA_BESTOJ, SKULPTA_N * SKULPTA_N) : null;

function valoroDelto(i: number, j: number): number {
  const ii = Math.max(0, Math.min(SKULPTA_N - 1, i));
  const jj = Math.max(0, Math.min(SKULPTA_N - 1, j));
  return DELTAJ![jj * SKULPTA_N + ii];
}

function valoroMasko(i: number, j: number): number {
  const ii = Math.max(0, Math.min(SKULPTA_N - 1, i));
  const jj = Math.max(0, Math.min(SKULPTA_N - 1, j));
  return AKVA_MASKO![jj * SKULPTA_N + ii];
}

// ⟨ Samplaj funkcioj 📃 ⟩ — dukuba ( Katmull-Rom ) interpolo super la krado.

// bicuba — Katmull-Rom unu-dimensia interpolo. Glata C1 kurbo sen la diagonalaj
// faldoj de dulineara interpolo — la montodeklivoj ne plu montras krestojn laŭ
// la krad-diagonaloj ( la sama funkcio kiel en iloj/tero-skulptilo.js ).
function bicuba(p0: number, p1: number, p2: number, p3: number, t: number): number {
  const t2 = t * t, t3 = t2 * t;
  return 0o1/0o2 * ( ( 2 * p1 ) + ( -p0 + p2 ) * t
    + ( 2 * p0 - 5 * p1 + 4 * p2 - p3 ) * t2 + ( -p0 + 3 * p1 - 3 * p2 + p3 ) * t3 );
}

// skulptaDelta — La skulptita delto de la tereno cxe monda pozicio. La
// valoro cxe kradnodoj restas ekzakte la ĉela valoro; inter la nodoj la
// surfaco estas glata C1 — sen la dulinearaj diagonalaj krestoj.
//     @param x, z ( number ) - Monda pozicio.
//     @returns La delto en mondo-unuoj ( 0 se neniu skulptajxo ).
export function skulptaDelta(x: number, z: number): number {
  if ( !DELTAJ ) return 0;
  const fx = ( x - SKULPTA_ORIGINO[0] ) / SKULPTA_PASO;
  const fz = ( z - SKULPTA_ORIGINO[1] ) / SKULPTA_PASO;
  const i0 = Math.floor(fx), j0 = Math.floor(fz);
  const u = fx - i0, v = fz - j0;
  const vico = ( j: number ) => bicuba(
    valoroDelto(i0 - 1, j), valoroDelto(i0, j), valoroDelto(i0 + 1, j), valoroDelto(i0 + 2, j), u);
  const m = bicuba(vico(j0 - 1), vico(j0), vico(j0 + 1), vico(j0 + 2), v);
  return m / 0o20;
}

// skulptitaAkvo — Cxu la punkto estas en la pentrita akvo ( la masko ).
//     @param x, z ( number ) - Monda pozicio.
//     @returns Cxu la masko kovras la punkton.
export function skulptitaAkvo(x: number, z: number): boolean {
  if ( !AKVA_MASKO ) return false;
  const fx = ( x - SKULPTA_ORIGINO[0] ) / SKULPTA_PASO;
  const fz = ( z - SKULPTA_ORIGINO[1] ) / SKULPTA_PASO;
  const i0 = Math.floor(fx), j0 = Math.floor(fz);
  const u = fx - i0, v = fz - j0;
  const i1 = i0 + 1, j1 = j0 + 1;
  const m = valoroMasko(i0, j0) * ( 1 - u ) * ( 1 - v )
    + valoroMasko(i1, j0) * u * ( 1 - v )
    + valoroMasko(i0, j1) * ( 1 - u ) * v
    + valoroMasko(i1, j1) * u * v;
  return m >= 0o1/0o2;
}

// skulptaAkvaLimoj — La plej malgranda kadro cxirkaŭ la pentrita akvo ( kun
// unu cela rando da libero ), por ke la meshxo ne kovru la tutan mondon.
// Nulaj se neniu akvo.
//     @returns Kadro { x0, z0, x1, z1 } aux null.
export function skulptaAkvaLimoj(): { x0: number; z0: number; x1: number; z1: number } | null {
  if ( !AKVA_MASKO ) return null;
  let imin = SKULPTA_N, imax = -1, jmin = SKULPTA_N, jmax = -1;
  for ( let j = 0; j < SKULPTA_N; j++ ) {
    for ( let i = 0; i < SKULPTA_N; i++ ) {
      if ( AKVA_MASKO[j * SKULPTA_N + i] === 1 ) {
        if ( i < imin ) imin = i;
        if ( i > imax ) imax = i;
        if ( j < jmin ) jmin = j;
        if ( j > jmax ) jmax = j;
      }
    }
  }
  if ( imax < 0 ) return null;
  const libero = 0o2;
  return {
    x0: SKULPTA_ORIGINO[0] + ( imin - libero ) * SKULPTA_PASO,
    z0: SKULPTA_ORIGINO[1] + ( jmin - libero ) * SKULPTA_PASO,
    x1: SKULPTA_ORIGINO[0] + ( imax + 1 + libero ) * SKULPTA_PASO,
    z1: SKULPTA_ORIGINO[1] + ( jmax + 1 + libero ) * SKULPTA_PASO,
  };
}

function dekodiBiomon(kruda: string, kvanto: number): Uint8Array | null {
  if ( kruda === "" ) return null;
  try {
    const bajtoj = Uint8Array.from(atob(kruda), c => c.charCodeAt(0));
    const biomo = new Uint8Array(kvanto);
    // 3 bitoj po ĉelo ( 0=aŭtomata, 1=montaro, 2=valo, 3=ebenaĵo,
    // 4=akvaj-plantoj, 5=ekvizeto ) — ok ĉeloj po tri bajtoj.
    for ( let i = 0; i < kvanto; i++ ) {
      const b = i * 3;
      biomo[i] = ( bajtoj[b >> 3] >> ( b & 7 ) )
        | ( ( b & 7 ) > 5 ? bajtoj[( b >> 3 ) + 1] : 0 ) << ( 8 - ( b & 7 ) );
      biomo[i] &= 7;
    }
    return biomo;
  } catch { return null; }
}

function dekodiBestojn(kruda: string, kvanto: number): Uint8Array | null {
  if ( kruda === "" ) return null;
  try {
    const bajtoj = Uint8Array.from(atob(kruda), c => c.charCodeAt(0));
    const bestoj = new Uint8Array(kvanto);
    // 3 bitoj po ĉelo ( bitoj 1=akvaj bestoj, 2=petreloj, 4=NPC-oj ) — ok
    // ĉeloj po tri bajtoj.
    for ( let i = 0; i < kvanto; i++ ) {
      const b = i * 3;
      bestoj[i] = ( bajtoj[b >> 3] >> ( b & 7 ) )
        | ( ( b & 7 ) > 5 ? bajtoj[( b >> 3 ) + 1] : 0 ) << ( 8 - ( b & 7 ) );
      bestoj[i] &= 7;
    }
    return bestoj;
  } catch { return null; }
}

// skulptitaBiomo — La pentrita biomo de la punkto ( la biomo-tavolo de la
// skulptilo ). 0 = aŭtomata ( nenio ), 1 = montaro, 2 = valo, 3 = ebenaĵo,
// 4 = akvaj-plantoj, 5 = ekvizeto. La ludo uzas gxin en biomo() ( tereno.ts )
// — malplena ( 0 aux sen datumoj ) estas nenio, same kiel aŭtomata.
//     @param x, z ( number ) - Monda pozicio.
//     @returns La pentrita biomo ( 0-5 ), aux 0 se neniu biomo-tavolo.
export function skulptitaBiomo(x: number, z: number): number {
  if ( !BIOMOJ ) return 0;
  const fx = ( x - SKULPTA_ORIGINO[0] ) / SKULPTA_PASO;
  const fz = ( z - SKULPTA_ORIGINO[1] ) / SKULPTA_PASO;
  const i = Math.max(0, Math.min(SKULPTA_N - 1, Math.floor(fx)));
  const j = Math.max(0, Math.min(SKULPTA_N - 1, Math.floor(fz)));
  return BIOMOJ[j * SKULPTA_N + i];
}

// skulptitaBesto — La pentrita besta zono de la punkto ( la besta-tavolo de
// la skulptilo ). bitoj 1 = akvaj bestoj, 2 = petreloj, 4 = NPC-oj — ĉelo
// povas teni PLURAJN samtempe ( 3 = akvaj+petreloj, ktp ), kaj la defaŭltaj
// lokoj estas bakitaj en la tavolon. Malplena ( 0 aux sen datumoj ) estas
// nenio — nenia besto tie.
//     @param x, z ( number ) - Monda pozicio.
//     @returns La pentritaj bestaj bitoj ( 0-7 ), aux 0 se neniu besta-tavolo.
export function skulptitaBesto(x: number, z: number): number {
  if ( !BESTOJ ) return 0;
  const fx = ( x - SKULPTA_ORIGINO[0] ) / SKULPTA_PASO;
  const fz = ( z - SKULPTA_ORIGINO[1] ) / SKULPTA_PASO;
  const i = Math.max(0, Math.min(SKULPTA_N - 1, Math.floor(fx)));
  const j = Math.max(0, Math.min(SKULPTA_N - 1, Math.floor(fz)));
  return BESTOJ[j * SKULPTA_N + i];
}
`;
// La dosieraj titoloj — ĉiu datumodosiero komenciĝas per sia markilo, kiun la
// konserva servilo kontrolas ( neniu fremda enhavo skribiĝas en src/ ).
const DOSIERA_TITOLO = {
  "tero-datumaro/krado.ts": "// ≺⧼ Skulptita krado 📃 ⧽≻",
  "tero-datumaro/akvo.ts": "// ≺⧼ Skulptita akvo 📃 ⧽≻",
  "tero-datumaro/biomoj.ts": "// ≺⧼ Skulptitaj biomoj 📃 ⧽≻",
  "tero-datumaro/bestoj.ts": "// ≺⧼ Skulptitaj bestoj 📃 ⧽≻",
  "tero-datumaro/rultempo.ts": "// ≺⧼ Skulptita rultempo 📃 ⧽≻",
  "tero-datumaro/objektoj.ts": "// ≺⧼ Skulptitaj objektoj 📃 ⧽≻",
  "tero-datumaro/urboj.ts": "// ≺⧼ Skulptitaj urboj 📃 ⧽≻",
  "tero-datumaro/vojoj.ts": "// ≺⧼ Skulptitaj vojoj 📃 ⧽≻",
};
// La datumoj vivas en PROPRAJ dosieroj ( la krado, akvo, biomoj, bestoj, la
// rultempo, la objektoj, la urboj kaj la vojoj/dokoj aparte ) — la savo
// produktas la tutan mapon de dosieroj en src/tero-datumaro/.
function generiDosierojn(){
  const kvantigita = kvantigiDeltojn();
  // Apartaj aktiva-flagoj — akvo-nuraj ŝanĝoj ne devas ŝveligi la dosieron
  // per 32 KB da nulaj deltoj, kaj inverse.
  let deltojAktivaj = false, maskoAktiva = false, biomojAktivaj = false, bestojAktivaj = false;
  for ( let i = 0; i < kvantigita.length; i++ ) if ( kvantigita[i] !== 0 ) { deltojAktivaj = true; break; }
  for ( let i = 0; i < masko.length; i++ ) if ( masko[i] ) { maskoAktiva = true; break; }
  for ( let i = 0; i < biomoj.length; i++ ) if ( biomoj[i] ) { biomojAktivaj = true; break; }
  for ( let i = 0; i < bestoj.length; i++ ) if ( bestoj[i] ) { bestojAktivaj = true; break; }
  const delta64 = deltojAktivaj ? bazo64DeInt16(kvantigita) : "";
  const masko64 = maskoAktiva ? bazo64DeMasko(masko) : "";
  const biomo64 = biomojAktivaj ? bazo64DeBiomoj(biomoj) : "";
  const besto64 = bestojAktivaj ? bazo64DeBestoj(bestoj) : "";
  const aktiva = deltojAktivaj || maskoAktiva || biomojAktivaj || bestojAktivaj;
  const komunajKom = [
    "// Kreita de la terena skulptilo ( iloj/tero-skulptilo.html ).",
    "// ( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) - Ne redaktu mane. La skulptilo reskribas la dosieron.",
  ];
  const kradoTeksto = [
    "// ≺⧼ Skulptita krado 📃 ⧽≻",
    ...komunajKom,
    "",
    "// ⟨ La skulpta krado 📃 ⟩ — la paŝo, grandeco, origino, aktiva-flago kaj la deltoj.",
    "export const SKULPTA_PASO = " + oktala(PASO) + ";",
    "export const SKULPTA_N = " + oktala(N) + ";",
    "export const SKULPTA_ORIGINO = [ " + oktala(X0) + ", " + oktala(Z0) + " ];",
    "export const SKULPTA_AKTIVA = " + ( aktiva ? "true" : "false" ) + ";",
    "export const SKULPTA_DELTAJ = " + JSON.stringify(delta64) + ";",
  ].join("\n");
  const akvoTeksto = [
    "// ≺⧼ Skulptita akvo 📃 ⧽≻",
    ...komunajKom,
    "",
    "// ⟨ La akva tavolo 📃 ⟩ — la nivelo kaj la masko ( kiu ĉelo estas akvo ).",
    "export const SKULPTA_AKVA_NIVELO = " + oktala(akvaNiveloValoro) + ";",
    "export const SKULPTA_AKVA_MASKO = " + JSON.stringify(masko64) + ";",
  ].join("\n");
  const biomoDosiero = [
    "// ≺⧼ Skulptitaj biomoj 📃 ⧽≻",
    ...komunajKom,
    "",
    "// ⟨ La biomo-tavolo 📃 ⟩ ( 0=aŭtomata, 1=montaro, 2=valo, 3=ebenaĵo,",
    "// 4=akvaj-plantoj, 5=ekvizeto ).",
    "export const SKULPTA_BIOMOJ = " + JSON.stringify(biomo64) + ";",
  ].join("\n");
  const bestoDosiero = [
    "// ≺⧼ Skulptitaj bestoj 📃 ⧽≻",
    ...komunajKom,
    "",
    "// ⟨ La besta-tavolo 📃 ⟩ ( bitoj 1=akvaj bestoj, 2=petreloj, 4=NPC-oj ).",
    "export const SKULPTA_BESTOJ = " + JSON.stringify(besto64) + ";",
  ].join("\n");
  const rultempoTeksto = [
    "// ≺⧼ Skulptita rultempo 📃 ⧽≻",
    ...komunajKom,
    "",
    "// La malkodaj kaj samplaj funkcioj — sen gxi la ludo ne povas legi la",
    "// datumaron. La savo devas produkti kompletan modulon.",
    "import { SKULPTA_PASO, SKULPTA_N, SKULPTA_ORIGINO, SKULPTA_AKTIVA, SKULPTA_DELTAJ } from \"./krado.js\";",
    "import { SKULPTA_AKVA_MASKO } from \"./akvo.js\";",
    "import { SKULPTA_BIOMOJ } from \"./biomoj.js\";",
    "import { SKULPTA_BESTOJ } from \"./bestoj.js\";",
    RUNTIMOTEMPLATO,
  ].join("\n");
  // La metitaj objektoj — la sama nombro-stilo kiel la cetera datumaro.
  const objektoTeksto = [
    "// ≺⧼ Skulptitaj objektoj 📃 ⧽≻",
    ...komunajKom,
    "// La metitaj objektoj de la objekta ilo de la terena skulptilo — la kanuoj",
    "// 🛶, la spacosxipo 🚀, la lampoj 🏮, la keuxfhxesoj ⭐ kaj la individuaj",
    "// konstruajxoj 🏛️ estas ankaŭ objektoj. Malplena = neniu objekto.",
    "// Cxiu objekto: x, z ( 0.25-algluita ), speco ( betulo | lariko | hxsxaksxlefo",
    "// | pussxlefo | roko | filiko | akvabesto | petrelo | npco | sanktejo | turo",
    "// | domo | mangxejo | kasafeo | stacio | hxeuxfo | hxeuxfoPlato | keuxfhxeso | kanuo | spacosxipo ),",
    "// skalo, rotacio, bestospeco, radio, vesto, harstilo, filikaSpeco, stilo.",
    "export const SKULPTA_OBJEKTOJ = " + skribiValoron(objektoj) + ";",
  ].join("\n");
  const urboTeksto = [
    "// ≺⧼ Skulptitaj urboj 📃 ⧽≻",
    ...komunajKom,
    "// La urboj de la mondo — la kradaj arangxoj kaj ofsetoj redaktataj per la",
    "// Krado-langeto. La unua urbo estas la cefa. Cxiu urbo: nomo, arangxaGrando,",
    "// blokaGrando ( unu | kvar ), ofsX, ofsZ, keuxfhxeso ( la kvar anguloj ĉirkaŭ",
    "// la centro ), lampoj ( la kvar-lampa strato-ŝablono ) kaj aldonajBlokoj",
    "// ( x, z, tipo, rot, sub, stacia, konektita ).",
    "export const SKULPTA_URBOJ = " + skribiValoron(urboj) + ";",
  ].join("\n");
  const vojoTeksto = [
    "// ≺⧼ Skulptitaj vojoj 📃 ⧽≻",
    ...komunajKom,
    "// La mond-nivelaj vojoj ( la kajo, la avenuo ) kiel polilinioj kun nomo kaj",
    "// larĝo, kaj la dokaj platformoj kun pozicio kaj profundo — redaktataj per",
    "// la Vojoj sub-langeto de la terena skulptilo.",
    "export const SKULPTA_VOJOJ = " + skribiValoron(vojoj) + ";",
    "export const SKULPTA_DOKOJ = " + skribiValoron(dokoj) + ";",
  ].join("\n");
  return {
    "tero-datumaro/krado.ts": kradoTeksto,
    "tero-datumaro/akvo.ts": akvoTeksto,
    "tero-datumaro/biomoj.ts": biomoDosiero,
    "tero-datumaro/bestoj.ts": bestoDosiero,
    "tero-datumaro/rultempo.ts": rultempoTeksto,
    "tero-datumaro/objektoj.ts": objektoTeksto,
    "tero-datumaro/urboj.ts": urboTeksto,
    "tero-datumaro/vojoj.ts": vojoTeksto,
  };
}
// sxargiDatumaronElMapo — sxargu la datumaron el la mapo de dosieroj
// ( { nomo. teksto } — la generitaj dosieroj aux unu elektita dosiero ). Cxiu
// konstanto sercxigxas en CXIUJ donitaj dosieroj, do la malnova unu-dosiera
// formato ( cxiuj konstantoj en tero-datumo.ts ) ankoraŭ sxargxas.
function sxargiDatumaronElMapo(dosieroj) {
  const preni = ( nomo ) => {
    const ankro = "export const " + nomo + " = ";
    for ( const t of Object.values(dosieroj) ) {
      const i = t.indexOf(ankro);
      if ( i < 0 ) continue;
      const resto = t.slice(i + ankro.length);
      const e = resto.indexOf(";");
      if ( e < 0 ) continue;
      return resto.slice(0, e).trim();
    }
    return null;
  };
  const oktalaNombro = ( s ) => {
    if ( s === null ) return null;
    const negativa = s.startsWith("-");
    const kerno = negativa ? s.slice(1) : s;
    const partoj = kerno.split("/");
    const numeratoro = parseInt(partoj[0].replace(/^0o/, ""), 8);
    const denominatoro = partoj.length > 1 ? parseInt(partoj[1].replace(/^0o/, ""), 8) : 1;
    const valoro = numeratoro / denominatoro;
    return negativa ? -valoro : valoro;
  };
  if ( oktalaNombro(preni("SKULPTA_PASO")) !== PASO || oktalaNombro(preni("SKULPTA_N")) !== N ) return false;
  const origino = preni("SKULPTA_ORIGINO");
  if ( origino ) {
    const eroj = origino.replace(/[\[\]]/g, "").split(",");
    if ( eroj.length !== 2
      || oktalaNombro(eroj[0].trim())!== X0
      || oktalaNombro(eroj[1].trim())!== Z0 ) return false;
  }
  const nivelo2 = oktalaNombro(preni("SKULPTA_AKVA_NIVELO"));
  const malpaku = ( s ) => ( s === null ? null : s.replace(/^"|"$/g, "") );
  deltoj.fill(0);
  masko.fill(0);
  biomoj.fill(0);
  bestoj.fill(0);
  const d = dekodiInt16(malpaku(preni("SKULPTA_DELTAJ")));
  if ( d ) for ( let i = 0; i < deltoj.length && i < d.length; i++ ) deltoj[i] = d[i] / 16;
  const m = dekodiMaskon(malpaku(preni("SKULPTA_AKVA_MASKO")), N * N);
  if ( m ) masko.set(m);
  const b = dekodiBiomon(malpaku(preni("SKULPTA_BIOMOJ")), N * N);
  if ( b ) biomoj.set(b);
  const be = dekodiBestojn(malpaku(preni("SKULPTA_BESTOJ")), N * N);
  if ( be ) bestoj.set(be);
  const oj = preni("SKULPTA_OBJEKTOJ");
  try { objektoj = oj ? parziValoron(oj) : []; } catch { objektoj = []; }
  elektitaObjekto = -1;
  gxisdatigiObjektoListon();
  rekonstruiObjektojn();
  const voj = preni("SKULPTA_VOJOJ");
  const dok = preni("SKULPTA_DOKOJ");
  const uj = preni("SKULPTA_URBOJ");
  try {
    const parzitaj = uj ? parziValoron(uj) : [];
    urboj = Array.isArray(parzitaj) ? parzitaj.map(u => ( {
      nomo: String(u && u.nomo !== undefined ? u.nomo : "Urbo"),
      arangxaGrando: Number(u && u.arangxaGrando) || 1,
      blokaGrando: u && u.blokaGrando === "kvar" ? "kvar" : "unu",
      ofsX: Number(u && u.ofsX) || 0,
      ofsZ: Number(u && u.ofsZ) || 0,
      aldonajBlokoj: Array.isArray(u && u.aldonajBlokoj) ? u.aldonajBlokoj.map(b => ( {
        x: Number(b && b.x) || 0,
        z: Number(b && b.z) || 0,
        tipo: b && typeof b.tipo === "string" ? b.tipo : "sanktejo",
        rot: Number(b && b.rot) || 0,
        sub: b && typeof b.sub === "string" ? b.sub : "centro",
        stacia: !!( b && b.stacia ),
        konektita: !!( b && b.konektita ),
      } )) : [],
    } )) : [];
  } catch { urboj = []; }
  if ( !urboj.length ) urboj = [ { nomo: "Ĉefa", arangxaGrando: 3, blokaGrando: "unu", ofsX: 0, ofsZ: 0 } ];
  elektitaUrbo = Math.max(0, Math.min(elektitaUrbo, urboj.length - 1));
  elektiUrbon(elektitaUrbo);
  // La vojoj, dokoj kaj spacoŝipo — la mondaj trajtoj de la ĉefa urbo.
  try {
    const parzV = voj ? parziValoron(voj) : null;
    if ( parzV && Array.isArray(parzV) ) vojoj = parzV.map(v => ( { ...v, punktoj: v.punktoj.map(p => [ p[0], p[1] ]) } ));
  } catch { }
  try {
    const parz = dok ? parziValoron(dok) : null;
    if ( parz && Array.isArray(parz) ) dokoj = parz.map(d => ( { ...d } ));
  } catch { }
  gxisdatigiVojajnRegilojn();
  if ( nivelo2 !== null ) {
    akvaNiveloValoro = nivelo2;
    niveloRegilo.value = akvaNiveloValoro;
  }
  gxisdatigiValorojn();
  historio.length = 0;
  refaraHistorio.length = 0;
  gxisdatigiPlenan2Dn();
  gxisdatigi3DnPostPlena();
  return true;
}
function sxargiDatumaronElKodo(){
  const d = dekodiInt16(SKULPTA_DELTAJ);
  if ( d ) for ( let i = 0; i < deltoj.length && i < d.length; i++ ) deltoj[i] = d[i] / 16;
  const m = dekodiMaskon(SKULPTA_AKVA_MASKO, N * N);
  if ( m ) masko.set(m);
  const b = dekodiBiomon(SKULPTA_BIOMOJ, N * N);
  if ( b ) biomoj.set(b);
  const be = dekodiBestojn(SKULPTA_BESTOJ, N * N);
  if ( be ) bestoj.set(be);
  objektoj = SKULPTA_OBJEKTOJ.map(o => ( { ...o } ));
  elektitaObjekto = -1;
  gxisdatigiObjektoListon();
  rekonstruiObjektojn();
  // La urboj — la kradaj aranĝoj kaj ofsetoj de SKULPTA_URBOJ. La defaŭlto
  // estas la ĉefa urbo, se la listo mankas aŭ malplenas.
  try {
    urboj = Array.isArray(SKULPTA_URBOJ) ? SKULPTA_URBOJ.map(u => ( { ...u } )) : [];
  } catch { urboj = []; }
  if ( !urboj.length ) urboj = [ { nomo: "Ĉefa", arangxaGrando: 3, blokaGrando: "unu", ofsX: 0, ofsZ: 0 } ];
  elektitaUrbo = 0;
  elektiUrbon(0);
  // La vojoj, dokoj kaj spacoŝipo — la mondaj trajtoj de la ĉefa urbo.
  try {
    if ( SKULPTA_VOJOJ && Array.isArray(SKULPTA_VOJOJ) ) vojoj = SKULPTA_VOJOJ.map(v => ( { ...v, punktoj: v.punktoj.map(p => [ p[0], p[1] ]) } ));
  } catch { }
  try {
    const parz = SKULPTA_DOKOJ;
    if ( parz && Array.isArray(parz) ) dokoj = parz.map(d => ( { ...d } ));
  } catch { }
  gxisdatigiVojajnRegilojn();
}

// ⟪ Dosiera tenilo ( File System Access API ) 📃 ⟫ — rememorita en IndexedDB,
// por ke la sekva savo skribu rekte sen elekto. La datumoj vivas en kvar
// dosieroj, do ĉiu nomo havas sian propran memoritan tenilon.
let dosierajTeniloj = {};      // nomo ( "tero-datumaro/krado.ts" ... ) → tenilo
function idbMalfermi(){
  return new Promise(( solvi, rifuzi ) => {
    const peto = indexedDB.open("tero-skulptilo", 1);
    peto.onupgradeneeded = () => { peto.result.createObjectStore("teniloj"); };
    peto.onsuccess = () => solvi(peto.result);
    peto.onerror = () => rifuzi(peto.error);
  });
}
async function konserviDosieranTenilon(tenilo, nomo) {
  try {
    const db = await idbMalfermi();
    await new Promise(( solvi, rifuzi ) => {
      const tx = db.transaction("teniloj", "readwrite");
      tx.objectStore("teniloj").put(tenilo, "dosiero:" + nomo);
      tx.oncomplete = solvi;
      tx.onerror = () => rifuzi(tx.error);
    });
  } catch { }
}
async function sxargiDosierajnTenilojn(){
  try {
    const db = await idbMalfermi();
    const butiko = db.transaction("teniloj").objectStore("teniloj");
    const klavoj = await new Promise(( solvi ) => {
      const peto = butiko.getAllKeys();
      peto.onsuccess = () => solvi(peto.result || []);
      peto.onerror = () => solvi([]);
    });
    for ( const k of klavoj ) {
      const nomo = String(k).replace(/^dosiero:/, "");
      const t = await new Promise(( solvi ) => {
        const peto = butiko.get(k);
        peto.onsuccess = () => solvi(peto.result || null);
        peto.onerror = () => solvi(null);
      });
      if ( t ) dosierajTeniloj[nomo] = t;
    }
  } catch { }
}
async function forgesiDosieranTenilon(nomo){
  delete dosierajTeniloj[nomo];
  try {
    const db = await idbMalfermi();
    await new Promise(( solvi, rifuzi ) => {
      const tx = db.transaction("teniloj", "readwrite");
      tx.objectStore("teniloj").delete("dosiero:" + nomo);
      tx.oncomplete = solvi;
      tx.onerror = () => rifuzi(tx.error);
    });
  } catch { }
}
function elSxuti(teksto, nomo) {
  const blobo = new Blob([ teksto ], { type: "text/plain" });
  const url = URL.createObjectURL(blobo);
  const a = document.createElement("a");
  a.href = url;
  a.download = nomo;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 0o4000);
}
// skribiPerTenilo — provu skribi la datumaron per la elektita tenilo. Revenu
// ĉu la skribo sukcesis — la malsukceso ( ekz. forigita aŭ movita dosiero )
// estas pritraktata de saviDosieron, kiu reprenas la elekton aŭ elŝutas.
async function skribiPerTenilo(tenilo, teksto) {
  try {
    const skribilo = await tenilo.createWritable();
    await skribilo.write(teksto);
    await skribilo.close();
    sxangxita = false;
    statuso("Savite rekte al " + tenilo.name + " ✔️");
    return true;
  } catch { return false; }
}
async function saviDosieron(){
  const dosieroj = generiDosierojn();
  // Antaŭ-skriba memkontrolo — se la kodigo ne cirkulas ( la malkodigo de la
  // savota teksto redonas alian terenon aux datumaron ), ne skribu koruptitan
  // dosieron.
  if ( !cirkuloValidas() || !cirkuloDeDatumojValidas() ){
    statuso("La datumaro ne validas — savo nuligita");
    return;
  }
  if ( !window.showSaveFilePicker ) {
    // Sen dosier-elektilo — elŝutu ĉiujn kvar dosierojn.
    for ( const [ nomo, teksto ] of Object.entries(dosieroj) ) elSxuti(teksto, nomo);
    sxangxita = false;
    statuso("Elsxutite. Metu la dosierojn al src/ kaj reŝargu la ludon");
    return;
  }
  // Cxiu dosiero havas sian propran memoritan tenilon ( aŭ novan elekton ).
  for ( const [ nomo, teksto ] of Object.entries(dosieroj) ) {
    let tenilo = dosierajTeniloj[nomo];
    if ( tenilo && !await skribiPerTenilo(tenilo, teksto) ) {
      statuso("La memorita dosiero ne plu haveblas — elektu denove");
      await forgesiDosieranTenilon(nomo);
      tenilo = null;
    }
    if ( !tenilo ) {
      try {
        tenilo = await window.showSaveFilePicker({
          suggestedName: nomo,
          types: [ { description: "TypeScript datumaro", accept: { "text/plain": [ ".ts" ] } } ],
        });
      } catch {
        statuso("La elekto nuligita — ŝanĝoj restas nesavitaj");
        return;
      }
      if ( !await skribiPerTenilo(tenilo, teksto) ) {
        // Eĉ la nova elekto malsukcesis — neniam perdu la datumon. elŝutu.
        elSxuti(teksto, nomo);
        continue;
      }
      dosierajTeniloj[nomo] = tenilo;
      await konserviDosieranTenilon(tenilo, nomo);
    }
  }
}
async function sargiDosieron(){
  if ( !window.showOpenFilePicker ) {
    statuso("La dosier-ŝarĝo bezonas Chromium-on");
    return;
  }
  try {
    const [ tenilo ] = await window.showOpenFilePicker({
      types: [ { description: "TypeScript datumaro", accept: { "text/plain": [ ".ts" ] } } ],
      multiple: false,
    });
    const dosiero = await tenilo.getFile();
    const teksto = await dosiero.text();
    if ( sxargiDatumaronElMapo({ [ tenilo.name ]: teksto }) ) {
      await konserviDosieranTenilon(tenilo, tenilo.name);
      dosierajTeniloj[tenilo.name] = tenilo;
      statuso("Ŝargite el " + tenilo.name + " 📂");
    } else {
      statuso("La dosiero ne estas skulpta datumaro");
    }
  } catch { }
}

// ════════════════════════ Rekta savo al src/tero-datumaro ════════════════════════
// La konserva servilo ( servilo/konservilo.mjs, npm run konservilo ) ricevas
// la generitan dosierojn per POST kaj skribas ilin rekte al
// src/tero-datumaro/ — sen dosier-elektilo kaj sen elŝuto. Se la servilo ne
// kuras, la butono montras instrukcion anstataŭ silente malsukcesi.
const KONSERVILO = "http://127.0.0.1:4173/";
async function saviRekteAlDosiero(){
  // Neniu ŝanĝo — ne skribu ( la skribo sxangxus la modif-tempon kaj
  // restartigus la ludon per HMR sen kialo ).
  if ( !sxangxita ) {
    statuso("Neniu ŝanĝo — la tereno jam estas en la dosieroj ✔️");
    return;
  }
  const dosieroj = generiDosierojn();
  if ( !cirkuloValidas() || !cirkuloDeDatumojValidas() ){
    statuso("La datumaro ne validas — savo nuligita");
    return;
  }
  try {
    const respondo = await fetch(KONSERVILO, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ dosieroj }),
    });
    const mesagxo = await respondo.text();
    if ( respondo.ok ) {
      sxangxita = false;
      statuso("Savite rekte al src/ ✔️ ( " + mesagxo + " )");
    } else {
      statuso("La konservilo rifuzis: " + mesagxo);
    }
  } catch {
    statuso("La konserva servilo ne kuras — kuru: npm run konservilo");
  }
}

// ════════════════════════ Komenco ════════════════════════
document.getElementById("savi").addEventListener("click", saviDosieron);
document.getElementById("saviRekte").addEventListener("click", saviRekteAlDosiero);
document.getElementById("sargi").addEventListener("click", sargiDosieron);
sxargiDatumaronElKodo();
gxisdatigiValorojn();
sxaltiIlTabon("tereno");
gxisdatigiPenikaron();
gxisdatigiAgordojn();
gxisdatigiKradon();   // la komenca krado — la ĉefa urbo de SKULPTA_URBOJ
prerenderiBazon();
gxisdatigiPlenan2Dn();
sxargiDosierajnTenilojn();
requestAnimationFrame(buklo);
