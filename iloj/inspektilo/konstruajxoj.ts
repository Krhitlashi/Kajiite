// ≺⧼ ឧបករណ៍ពិនិត្យ ( អគារ ) 🔬 ⧽≻
import * as THREE from "three";
import { konstruiSatalon } from "../../eskekoj/konstruajxoj/satalaj-konstruajxoj.js";
import { kreiKlinoTavolon } from "../../eskekoj/konstruajxoj/satalaj/formoj.js";
import { aldoniKadranTubon } from "../../eskekoj/konstruajxoj/satalaj/pilieroj.js";
import { aldoniTavolanRandon } from "../../eskekoj/konstruajxoj/satalaj/ornamoj.js";
import { aldoniPilolFenestron, fenestraMargxeno } from "../../eskekoj/konstruajxoj/satalaj/fenestroj.js";
import { aldoniEnirejon } from "../../eskekoj/konstruajxoj/satalaj/enirejo.js";
import { aldoniSteleanSignon } from "../../eskekoj/konstruajxoj/satalaj/vitro.js";
import { kreiOranMaterialon, kreiPordanMaterialon, kreiFenestranMaterialon } from "../../eskekoj/komunajxoj/materialoj.js";
import { konstruiKrasesxagxon } from "../../eskekoj/konstruajxoj/krasesxagxa-kosmosxipo.js";
import type { Krasesxagxo } from "../../eskekoj/konstruajxoj/krasesxagxa-kosmosxipo.js";
import type { KonstruSpec } from "../../eskekoj/konstruajxoj/satalaj/tipoj.js";
import type { ModelaSpecifo } from "./tipoj.js";

// ⟨ អគារ និងផ្នែករបស់ពួកវា 📃 ⟩
export const oro = kreiOranMaterialon(0xd8b068);
export const muro = new THREE.MeshStandardMaterial({ color: 0x184838, roughness: 0o3/0o4, metalness: 0, envMapIntensity: 0 });
// ⟨ ទ្វារផ្ទះ 📃 ⟩
export const enira = kreiPordanMaterialon(muro);
export const vitraEnira = kreiFenestranMaterialon();
export const vitro = kreiFenestranMaterialon();
export const KLINO = 0o5/0o20;
export const TIERO = 0o315/0o100;
export const HW = 0o10/0o2;

/* លក្ខណៈរួមរបស់ទីក្រុងសម្រាប់ប្រភេទសំណង់មួយ។
    @param tipo ( string ) - ប្រភេទសំណង់ ( domo, mangxejo, ... )។
    @param niveloj ( number ) - ចំនួនស្រទាប់។
    @param tieroAlto ( number ) - កម្ពស់ស្រទាប់។
@returns លក្ខណៈសំណង់ ( KonstruSpec )។ */
export function konstrSpec(tipo: string, niveloj: number, tieroAlto: number): KonstruSpec {
  return { x: 0, z: 0, type: tipo, name: "", niveloj, w: 0o10, d: 0o10,
    tieroAlto, rot: 0, diamond: false, h0: 0,
    sube: tipo === "stacioxipo" ? 0 : niveloj, tieroAltoSub: 0o123/0o40 };
}
/* ស្រទាប់មួយរបស់អគារ គឺជញ្ជាំងរាងចតុកោណកែងស្រក ( តូចជាងនៅខាងលើតាម
   `klino` ) និងសសរជ្រុងមាសទាំងបួន។
    @param grupo ( THREE.Object3D ) - ក្រុមរបស់អគារ។
    @param klino ( number ) - ជម្រាលរបស់ជញ្ជាំង។
    @param alto ( number ) - កម្ពស់ស្រទាប់។
    @param hw ( number ) - កន្លះទទឹង។ */
export function aldoniTavolanSxelon(grupo: THREE.Object3D, klino: number, alto: number, hw: number): void {
  grupo.add(new THREE.Mesh(kreiKlinoTavolon(hw, hw, hw - klino, hw - klino, alto).translate(0, alto / 2, 0), muro));
  const geos: THREE.BufferGeometry[] = [];
  for ( const a of [ -1, 1 ] ) for ( const b of [ -1, 1 ] )
    aldoniKadranTubon(geos, a * hw, b * hw, 0, alto, a, b, true, klino);
  aldoniTavolanRandon(geos, hw, hw, 0, klino, alto);
  for ( const geo of geos ) grupo.add(new THREE.Mesh(geo, oro));
}

// ⟨ យានអវកាស 📃 ⟩
export let spacoSxipo: Krasesxagxo | null = null;

// ⟨ ក្រុម និងឆាក 📃 ⟩
const kielGrupo = ( g: THREE.Scene ): THREE.Group => g as THREE.Object3D as THREE.Group;

// ⟨ តារាងរបស់អគារ 📃 ⟩
export type Konstruajxo = ModelaSpecifo;
export const KONSTRUAJXOJ: Konstruajxo[] = [
  { kodo: "bDomo", nomo: "Domo 🏠", indekso: -1, konstruajxo: true,
    konstruu: ( g ) => konstruiSatalon(konstrSpec("domo", 4, TIERO), g, []),
    priskribo: "La baza loĝdomo de la urbo — kvar klinitaj tavoloj ( ĉiu pli mallarĝa ol la suba per la sama `klino` = 0.3125, do la tuta konstruaĵo estas trapezoido ), oraj angulaj kadroj kaj la oraj horizontalaj stangoj ĉe ĉiu tavol-rando, unu pordo sur la fronta faco, kaj la stelea signo kun la nomo sur la tero apud ĝi.",
    animacio: "Neniu — la konstruaĵoj staras senmove ( la urbo nur turnas la sunon )." },
  { kodo: "bMangxejo", nomo: "Manĝejo 🍲", indekso: -1, konstruajxo: true,
    konstruu: ( g ) => konstruiSatalon(konstrSpec("mangxejo", 4, TIERO), g, []),
    priskribo: "La komuna manĝejo — la sama kvar-tavola skeleto kiel la domo ( w = d = 8, tieroAlto 3.203 ), sed kun la BRUNA mura koloro ( 0x584028 ) kaj la hela kadro. En la mondo ĝi ankaŭ ricevas la eksterajn manĝtablojn kun benkoj antaŭ la pordo ( la ilo lasas ilin for, ĉar ili apartenas al la mebloj-modulo ).",
    animacio: "Neniu — la konstruaĵoj staras senmove." },
  { kodo: "bKasafeo", nomo: "Kunvenejo ☕", indekso: -1, konstruajxo: true,
    konstruu: ( g ) => konstruiSatalon(konstrSpec("kasafeo", 4, 0o155/0o40), g, []),
    priskribo: "La kunvenejo — la sama kvar-tavola skeleto, sed kun pli alta tavolo ( 3.406 ) kaj la krem-kolora muro ( 0xd8c898 ). Ĝi estas la unua konstruaĵo kun la LONGAS pilol-fenestraj vicoj: unu horizontala fenestro po faco po tavolo ( la teretaĝa fronta faco restas libera por la pordo ), ĉiu kun ora pilola rando. La vitro estas travidebla ( opacity 0.7 ) kun propra emisio, do la fenestroj brilas en la krepusko.",
    animacio: "Neniu — la konstruaĵoj staras senmove." },
  { kodo: "bStacio", nomo: "Stacidomo 🚀", indekso: -1, konstruajxo: true,
    konstruu: ( g ) => konstruiSatalon(konstrSpec("stacioxipo", 3, 0o155/0o40), g, []),
    priskribo: "La stacidomo, super kiu flugas la kosmosxipo. Tri tavoloj kun PLI MILDA deklivo ol la domoj ( la supra larĝo estas duono de la baza anstataŭ 0.2969-oble ), helgriza muro ( 0xc8c8c8 ), ŝtona antaŭplato ĉirkaŭ la piedo kun oraj kvadrataj bendoj, kvar lanc-pilieroj kun brilaj pintoj ĉe la anguloj de la plato, kaj ora ringo sur la tegmento. La sama pilol-fenestra vico kiel la kunvenejo, kaj — kiel tiu — ĝia pordo estas la sama VITRO ( ne mur-kolora ).",
    animacio: "Neniu — la konstruaĵoj staras senmove." },
  { kodo: "spacosxipo", nomo: "Kosmoŝipo 🛸", indekso: -1, konstruajxo: true, kosmosxipo: true,
    konstruu: ( g ) => { spacoSxipo = konstruiKrasesxagxon(g, 0, 0, 0, oro, vitraEnira); },
    priskribo: "La kosmoŝipo, kiu flosas super la stacidomo de la ĉefa urbo — la SAMA konstruilo kiel en la mondo ( konstruiKrasesxagxon ). Dek klinitaj tavoloj ( kvin supren, kvin malsupren ) spegulitaj ĉirkaŭ la mezo, do ĝi estas turn-simetria vertikale, oraj angul-framoj kaj oraj horizontalaj stangoj ĉe ĉiu tavol-rando, LONGAs horizontalaj pilol-fenestroj ĉe ĉiu tavolo krom la centraj, kaj sur ĉiuj kvar flankoj la DUPORDA enirejo — du spegulitaj pordoj kunigitaj per la talio, kun ronda ora tuba konturo. ⟨ La kosmoŝipa pordo 📃 ⟩ Ĝi havas la SAMAN dikecon kiel la konstruaĵa pordo ( la folio 0.109375 kun la sama bevelo ), do ĝi elstaras 0.125 de la ŝipo anstataŭ 0.6, kaj la ora tubo kuŝas sur la meza ebeno de la folio kun radio duone de la tuta dikeco, do ĝi ĉirkaŭas la tutan eksteran randon. ⟨ La pordo estas VITRO 📃 ⟩ — malsame ol la konstruaĵaj pordoj ( kiuj ricevas pli malhelan version de la propra mura koloro ), la ŝipo uzas la saman vitron kiel la fenestroj ( malhela travidebla vitro kun bluverda emisio ), do la pordo apartenas al la sama vitra familio kiel la fenestraj vicoj. La muro estas malhelverda ( 0x184838 ), la fenestra vitro emisias ( ĝi brilas en la krepusko ).",
    animacio: "Milda vertikala ŝvebado (±0.05 unuoj) kaj delikata ruliĝo al ambaŭ flankoj — la senfluga pozo de la mondo. La fenestra pulso aperas nur dumfluge ( komenciFlugon )." },
  { kodo: "bTuro", nomo: "Nubskrapulo 🏙️", indekso: -1, konstruajxo: true,
    konstruu: ( g ) => konstruiSatalon(konstrSpec("turo", 0o10, 0o30/0o10), g, []),
    priskribo: "La nubskrapulo — la plej alta konstruaĵo: OK tavoloj sur la sama baza areo de 8×8, ĉiu 3.0 unuojn alta, do la tuta turo altas 24 unuojn. La sama malpliiĝo po tavolo kiel la domoj, do ĝi finiĝas en longa maldika pinto.",
    animacio: "Neniu — la konstruaĵoj staras senmove." },
  { kodo: "bSanktejo", nomo: "Sanktejo ⛩️", indekso: -1, konstruajxo: true,
    konstruu: ( g ) => konstruiSatalon(konstrSpec("sanktejo", 7, TIERO), g, []),
    priskribo: "La sanktejo — sep tavoloj kaj KVAR pordoj ( po unu sur ĉiu flanko, do la konstruaĵo estas turn-simetria kvar-oble ), kronita per ora piramida pinto anstataŭ plata tegmento. Ĝi estas la sola konstruaĵo kun la ora bazplato — nun PLATA ( 0.125 alta, kuŝanta rekte sur la grundo; antaŭe 0.297 alta sojlo ) — kaj la sola kun la NAĜETOJ: ĉe ĉiu pordo DU triangulaj oraj platoj, kiuj FRONTAS ANTAŬEN — ili kuŝas en la ebeno de la pordo kaj etendiĝas de la SUPRaj anguloj de la porda kadro malsupren al la MALSUPRA rando de la ora bazplato ( la pinto sidas en la ronda kadra tubo, la ekstera pinto sur la plato je ±4.28 ), kaj ilia interna rando sekvas la klinitan flankon de la pordo. Tial ĉi tiu specifo tenas `sube` super nulo.",
    animacio: "Neniu — la konstruaĵoj staras senmove." },
  // ⟨ ផ្នែកទាំងឡាយ 📃 ⟩
  { kodo: "pPiliero", nomo: "Angula piliero 🏛️", indekso: -1, konstruajxo: true,
    konstruu: ( g ) => {
      const geos: THREE.BufferGeometry[] = [];
      aldoniKadranTubon(geos, 0, 0, 0, TIERO, 1, 1, true, KLINO);
      for ( const geo of geos ) g.add(new THREE.Mesh(geo, oro));
    },
    priskribo: "Unu ora angula piliero de konstruaĵo, sola. La ŝafto estas PARALELA al la klinita muro — ĝi klinĝas INTERNEN laŭ la muro, do la libero inter piliero kaj muro restas la sama la tutan vojon ( neniu kreskanta truo ). Ĉe la supro la pinto svingiĝas EKSTEREN, super la supra angulo de la tavolo. La diamanta sekco tenas siajn kvar pintojn laŭ la angulaj diagonaloj ( la flankoj kuŝas laŭ la muroj ), do la FRONTA kresto rigardas eksteren kaj restas sur la akso de la piliero: rigardata de antaŭe, tiu meza linio estas perfekte REKTA de la bazo ĝis la pinto. ( La kadro nun venas rekte el la ekstera akso; antaŭe ĝi sekvis la kurbon per paralela transporto, kiu ruligis la sekcon ~20° ĉe la hoko kaj flankenŝovis la kreston. ) Dum la svingo la sekco malvastiĝas ĝis OKONO de sia larĝo en AMBAŬ aksoj — ĝi do restas kvadrata kaj la piliero finiĝas per vera pinto, iom rondigita de la malgranda kapo. ( Pli frue la du malvastigoj MULTIPLIKIĜIS, 0o1/0o10 × 0o1/0o10, do la sekco ĉe la pinto estis 8-obla platlameno kaj la pinto aspektis kiel ortangulo. ) Ĉe la BAZO la piliero iras REKTE MALSUPREN — la ŝafto mem, sen ia ajn plilarĝiĝo aŭ funelo, kaj la bazo finiĝas per la sama diamanta sekco kun la rondigita ferma kapo.",
    animacio: "Neniu — la partoj staras senmove." },
  { kodo: "pTavolo", nomo: "Tavolo 🧱", indekso: -1, konstruajxo: true,
    konstruu: ( g ) => aldoniTavolanSxelon(g, KLINO, TIERO, HW),
    priskribo: "Unu tavolo de la konstruaĵ-skeleto — la trapezoida muro ( kreiKlinoTavolon: la supro pli mallarĝa per `klino` ) kun la kvar oraj angulaj pilieroj, do oni vidas la pilieron apud la muro en sia vera kunteksto.",
    animacio: "Neniu — la partoj staras senmove." },
  { kodo: "pFenestro", nomo: "Pilol-fenestro 🪟", indekso: -1, konstruajxo: true,
    konstruu: ( g ) => {
      aldoniTavolanSxelon(g, KLINO, TIERO, HW);
      aldoniPilolFenestron(kielGrupo(g), oro, vitro, 0, TIERO / 2, HW - KLINO / 2, KLINO, TIERO,
        0o5/0o10, false, fenestraMargxeno(HW - KLINO / 2));
    },
    priskribo: "La LONGAs horizontala pilol-fenestro ( la vitro kaj la STELA ora rando ) sur unu tavolo. La monto-grupo sidas ĉe la fenestra SUBO per la muro-radiuso TIE ( fenestraSubFaco ) — ne per la radiuso ĉe la fenestra centro — kaj kliniĝas per la muro-deklivo, do la fenestro kuŝas plate sur la klinita muro. ⟨ La stela kadro 📃 ⟩ La vitro estas la simpla pilolo, sed la ora kadro estas PLATA kaj PLENA plato kun kvar pintoj — unu ĉe ĉiu el la du finoj kaj unu ĉe la mezo de la supra kaj malsupra randoj — do ĝi etendiĝas super kaj sub la fenestron ( kreiStelanFenestranFormon ). La plato estas la stela konturo plenigita, el kiu oni eltranĉas la vitron, kaj la konturo mem estas la pilolo ŜVELIGITA per la kadra larĝo ĉirkaŭ la SAMA centro ( la vitro do sidas precize centre de la bendo kaj la bendo estas egale dika ĉie ), kaj kuŝas plata sur la muro ( antaŭe ĝi estis ronda tubo laŭ la konturo, kio legiĝis kiel dukto ). La supra kaj malsupra randoj de la kadro restas PARALELAJ al la vitro gxis proksime al la mezo, kaj nur tie ili KURBAS al la pinto kaj reen — la konturo eliras el la arkoj preskaux rekte kaj alvenas vertikale al la pinto, do la pinto legiĝas kiel la pinto de la bendo mem, ne kiel aparta spiko sur gxi. Ĉiu angulo de la konturo estas plus rondigita per malgranda Bézier-tranĉo ( rondigiKonturon ), do la kadro havas neniun rompitan randon. ⟨ La longo kaj la marĝeno 📃 ⟩ La marĝeno ( fenestraMargxeno ) estas UNU nombro por la tuta konstruaĵo, kalkulita el la plej larĝa kaj la plej mallarĝa tavoloj, kaj ĉiu tavolo ricevas ĝin precize tiel, sen multipliko aux divido. La libera spaco ĉe la anguloj do videblas sur ĉiu nivelo. La fenestra ALTO ne ŝanĝiĝas de tavolo al tavolo — nur la longo, do la fenestroj mallongiĝas precize per la sama kvanto, kiun mallongiĝas la tavoloj. Tavolo, kiu kun tiu sama marĝeno ne plu havus lokon por fenestro almenaux tiel longa kiel alta, restas SEN fenestro, ĉar pli bone nenia fenestro ol stumpo. ⟨ La vitro 📃 ⟩ Ĝi estas la sama komuna difino kiel en la mondo ( kreiFenestranMaterialon ), kun roughness 0.109375, do la ĉielo kaj la lampoj reflektiĝas akre sur la plato, kaj la bluverda emisio restas videbla nokte.",
    animacio: "Neniu — la partoj staras senmove." },
  { kodo: "pEnirejo", nomo: "Enirejo 🚪", indekso: -1, konstruajxo: true,
    konstruu: ( g ) => aldoniEnirejon(kielGrupo(g), 0o10, oro, enira, 1, TIERO),
    priskribo: "La pordo de ĉiuj tipoj ( ĉi tie en la doma koloro ) — rondigita trapezo kun eta ora bevelo, kiu kuŝas preskaŭ sur la muro: la folio estas 0.109375 profunda ( antaŭe 0.0625, kaj antaŭ tio 0.25 ) kaj elstaras 0.125 antaŭen, kaj ora tuba kadro ĉirkaŭas la TUTAN eksteran randon — la tubo sidas sur la meza ebeno de la folio kaj ĝia radio egalas la duonon de la tuta dikeco, do ĝi kovras la pordon malantaŭe, antaŭe kaj flanke ( antaŭe la maldika tubo staris nur antaŭ la dika folio ). ⟨ La folio estas la MURO mem 📃 ⟩ Ĝi estas kopio de la propra mura materialo kun malheleigita koloro ( kreiPordanMaterialon ), do la pordo havas la saman surfacon kiel sia muro, kun ĝia roughness, ĝia metalness, ĝiaj reflektoj kaj eĉ ĝiaj teksajxoj se la muro iam ricevos ilin. La malheligo estas SUBTRAHO de 0x08 ĉe ĉiu kanalo ( kiel koloro 0x080808 ), do la pordo de la sabla manĝejo ne plu aspektas kiel tiu de la verda domo kaj ĉiu tipo restas rekonebla pro sia propra nuanco. ⟨ Kial nur 0x08 📃 ⟩ Subtraho de 0x10 faris la pordon de la malhelaj konstruaĵoj preskaŭ nigrajn ( la sankteja 0x184038 → 0x083028 estas 3.7-oble malpli en la linia spaco ), do la centra konstruaĵo aspektis kvazaŭ ĝi havus NENIAN pordan koloron; kun 0x08 la pordo restas videble pli malhela kaj ankoraŭ rekonebla kiel la mura koloro. La tri VITRAJ pordoj estas la escepto — la kunvenejo, la stacidomo kaj la kosmoŝipo uzas la vitron de la fenestroj anstataŭ muran koloron. Ĝi staras sur la tero ĉe la fronta faco ( f=0, +z ) kaj KLINIĜAS laŭ la muro ( 4.5° ĉe la doma tavol-alto ) — la pordo restas paralela al sia muro, anstataŭ malproksimiĝi supren. La sanktejo ricevas kvar kopiojn, po unu sur ĉiu flanko, ĉiu klinita enen de sia propra muro.",
    animacio: "Neniu — la partoj staras senmove." },
  { kodo: "pSigno", nomo: "Stelea signo 🪧", indekso: -1, konstruajxo: true,
    konstruu: ( g ) => aldoniSteleanSignon(kielGrupo(g), "", "domo", 0o10, 0o10),
    priskribo: "La 3D-steleo kun la nomo de la konstruaĵo, apud ĝia pordo. La plato estas FROSTA VITRO ( MeshPhysicalMaterial kun `transmission` 0.35 kaj `roughness` 0.5 ): la fono videblas tra ĝi, sed MALKLARe — oni ne rekonas la objektojn malantaŭe, nur molajn kolorajn makulojn. Tiu materialo postulas apartan trapason de la sceno (`transmissionResolutionScale` 0.25 tenas ĝin malmultekosta). La plato sekvas la tagnokton per sia baza KOLORO: en la fizika modelo de three tiu koloro ankaŭ FILTRAS la trapasantan lumon, do blanka tage = frosta vitro, nigra nokte = solida nigra tabulo ( kun eta emisio, por ke la silueto restu videbla en la krepusko ). La supraĵo estas NESIMETRIA: la granda ronda angulo sidas maldekstre, la malgranda dekstre ( vidate de la fronto ), kaj la malsupraj anguloj estas rektaj. La Gawekiif-teksto ( la nomo, aŭ la tip-nomo por sennomaj konstruaĵoj ) sidas sur la SAMA konturo kiel la plato — nur kelkajn milonojn antaŭ ĝia fronta faco, do ne temas pri aparta karto ene de la signo. Ĝin desegnas malgranda shadero, kiu legas la tekston kiel MASKON kaj aldonas la FLAVAN inkon plus la konturon: la inko estas MUTA flava tage kaj PALA flava nokte, dum la konturo iras la MALAN direkton — BLANKA tage kaj NIGRA nokte — do la literoj restas legeblaj sur ambaŭ fonoj.",
    animacio: "Neniu — la partoj staras senmove." },
];

