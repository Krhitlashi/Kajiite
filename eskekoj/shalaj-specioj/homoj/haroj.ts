// ≺⧼ La haroj 🧵 ⧽≻
// La hararo de la figuro — la UV-oj, kiuj kunigas la ĉapon kaj la kurtenon en unu
// hararon ( HARAJ_UV_*, haraU, haraV ), la kurteno ( kreiHaranKurtenon ), la
// har-materialoj ( haraMaterialo ) kaj la geometrioj po stilo ( kreiHaranĈapon,
// haranGeometrion ).
import * as THREE from "three";
import { kreiBuferanGeometrion, kunfandiGeometriojn } from "../../komunajxoj/kunfandajxoj.js";
import { kreiHaranTeksajxon } from "../../komunajxoj/teksajxoj/haro.js";
import { type Harstilo } from "../../vestaro/vestoj.js";
import { KAPA_R, KAPA_Y } from "./mezuroj.js";

// ⟪ La haraj UV-oj 🧵 ⟫
// La hararo estas DU geometrioj ( la ĉapo sur la kranio kaj la kurteno malantaŭe —
// vidu haranGeometrion ), sed ĝi devas legiĝi kiel UNU hararo. Se ĉiu parto portas
// sian propran UV-amplekson, la tufoj de la kurteno larĝiĝas kaj la harfadenoj
// saltas ĉe la linio, kie la kurteno eliras el sub la ĉapo. La mapado do estas
// CILINDRA kaj KOMUNA por la tuta hararo — la azimuto donas u kaj la MONDALTO
// donas v ( la sama konvencio kiel la interna ĉemizo, vidu kreiInternanSxelon ) —,
// do la sama angulo ricevas la saman u sur ambaŭ meshoj kaj la fadeno de la ĉapo
// daŭriĝas sen salto sur la kurtenon.
// ⟨ Kiom da kaheloj 📃 ⟩ — la kapo ĉirkaŭas unu turnon ( ĉirkaŭ 1.19 m ) kun 0o4
// teksturaj kaheloj, do unu kahelo kovras 0.30 m kaj la haro ricevas tufojn de
// proksimume 2.7 mm. La kurteno sidas sur la sama radiuso, do kun la sama mapado
// ĝiaj tufoj havas la saman mondan larĝon kiel tiuj de la ĉapo — antaŭe ĝia
// propra amplekso larĝigis ilin preskaŭ trifoje.
const HARAJ_UV_SUPRO = 0o166/0o100;      // 1.84375 — super la krono de la ĉapo
const HARAJ_UV_MALSUPRO = 0o104/0o100;   // 1.0625 — la malsupra rando de la kurteno
const HARAJ_UV_TURNOJ = 0o4;             // la teksturaj kaheloj ĉirkaŭ unu turno
//     @param ang ( number ) - La azimuto ( 0 antaŭe, pli granda dekstren ).
//     @returns u ( number ) - La horizontala UV de la haro.
function haraU(ang: number): number {
  return ang / ( Math.PI * 0o2 ) * HARAJ_UV_TURNOJ;
}

//     @param y ( number ) - La mondalto de la punkto de la haro.
//     @returns v ( number ) - La vertikala UV ( 0 ĉe la krono, 1 ĉe la rando ).
function haraV(y: number): number {
  return ( HARAJ_UV_SUPRO - y ) / ( HARAJ_UV_SUPRO - HARAJ_UV_MALSUPRO );
}

// kreiHaranKurtenon — Konstruu fleksitan haran kurtenon kiu ĉirkaŭas la
// malantaŭon de la kapo kaj falas ĝis la ŝultroj, kun skalopita ( pinteca )
// malsupra rando kiel harfringo. La kurteno estas pli larĝa sube, do ĝi elstaras
// ekster la roba silueto kaj restas videbla de malantaŭe.
//     @returns geometrio ( THREE.BufferGeometry ) - La har-kurteno, ĉe la kapo.
function kreiHaranKurtenon(): THREE.BufferGeometry {
  const vicoj = 0o20, kolonoj = 0o40;
  // ⟨ La kurteno restas MALANTAŬE 📃 ⟩ — antaŭe ĝi etendiĝis ±90° de la dorso, do
  // ĝiaj plej flankaj punktoj ( x = ± r ) troviĝis ĝuste super la manikoj kaj la
  // haroj trapikis la ŝultrojn. Nun ĝi etendiĝas ±66°, do ĝiaj finoj sidas 0.09
  // malantaŭ la manika akso — la hararo drapiĝas sur la DORSON de la ĉemizo.
  const fiMax = 0o115/0o100;        // radianoj — 1.203, do ±69° de la dorso
  // ⟨ La kurteno estas mallonga bobo 📃 ⟩ — antaŭe ĝi iris ĝis y = 0.94 kaj
  // disfloris al radiuso 0.42, do ĝi estis pli larĝa ol la robo mem kaj la
  // longhara NPC aspektis kiel portanta nigran mantelon. Nun ĝi finiĝas ĉe la
  // ŝultroj ( y = 1.375 ) kun radiuso 0.203 — la haro drapiĝas sur la ŝultrojn,
  // nur iomete ekster la kolumo.
  // ⟨ La supra rando kaŝiĝas en la ĉapo 📃 ⟩ — la ĉapo nun estas ŝelo kiu sekvas
  // la kranion ( vidu kreiHaranĈapon ), do ĝia radiuso ĉe la alto 1.70 estas nur
  // 0.154. La kurteno komenciĝas je 1.703 kun radiuso 0.133, do ĝia supra rando
  // restas INTERNE de la ĉapo kaj la kudro ne videblas.
  // ⟨ La kurteno finiĝas SUPER la kolumo 📃 ⟩ — antaŭe ĝi iris ĝis 1.375 ( sub la
  // kolumo de la ĉemizo 1.4063 kaj de la robo 1.3906 ) kun radiuso 0.172, do ĝia
  // malsupra rando SINKIS en la kolumojn kaj la haroj malaperis en la ŝtofon dum
  // la kapo kliniĝis. Nun ĝi finiĝas ĉe 1.3906 — la pinto de la roba kolumo — kaj
  // ĝia radiuso ( 0.2266 ) estas PLI GRANDA ol tiu kolumo ( 0.2109 ) kaj ol la
  // ŝultro-kovrilo de la ĉemizo ( 0.203 ), do la haroj drapiĝas SUR la kolumoj
  // anstataŭ en ili. Sub tiu alto la kurteno tute ne ekzistas.
  // ⟨ La kurteno estas LONGA kaj FLUA 📃 ⟩ — antaŭe ĝi finiĝis ĉe 1.3906 ( la
  // pinto de la roba kolumo ), do la longhara NPC portis BOBON: la hararo estis
  // tranĉita per preskaŭ horizontala linio ĉe la kolumoj. Nun ĝi falas ĝis
  // 1.0625 — la talio — kaj ĝia malsupra rando ONDAS, do la haroj legiĝas kiel
  // longa fluanta hararo anstataŭ kiel kasko.
  // ⟨ La kurteno sekvas la DORSAN konturon 📃 ⟩ — la haro-grupo sidas 0.094
  // malantaŭ la kapo, sed la mesho mem kompensas tiun ŝovon ( vidu
  // haranGeometrion ), do la geometrio de la kurteno estas jam en la mondaj
  // koordinatoj kaj ĝia akso sidas sur la kap-akso. La kurteno eliras el la
  // harĉapo kaj FALAS malantaŭ la dorso — ĝi neniam trafas la kolumojn nek la
  // mantelon.
  const ySupro = 0o155/0o100, yMalsupro = 0o104/0o100;
  // ⟨ La sekco de la kurteno sekvas la robon 📃 ⟩ — la malantaŭo de la robo NE
  // estas rondo: ĝia sekco estas RONDIGITA ORTANGULO ( duonlarĝo 0.218,
  // duonprofundo 0.175, potenco 3 — mezurite sur la meshoj ). Rondo de radiuso
  // 0.20 restus ekster ĝi nur ĉe la mezo, do la videbla hararo legiĝus kiel
  // mallarĝa vosto. La kurteno do ELVOLVIĜAS de rondo ( ĉe la kranio ) al
  // superelipso ( ĉe la dorso ) kaj kuŝas kiel LARĜA tavolo super la tuta dorso.
  // ⟨ La kurteno ELVOLVIĜAS TIUJ ĈE LA KOLUMO 📃 ⟩ — la hararo eliras el sub la
  // harĉapo ĈE la kranio ( 0.11 ) kaj devas esti pli larĝa ol la mantelo ( 0.188 )
  // jam ĉe la kolumo ( la mondo 1.45 ), nur 0.1 sub la krono. La malnova profilo
  // kreskis per t^0.6, do ĉe la kolumo ĝi estis nur 0.173 — INTERNE de la mantelo
  // kaj la hararo trairis la dorson de la ĉemizo dum la kapo bobis ( la mezurita
  // penetro estis 0.035 ). Nun la kresko estas 1 − ( 1 − t )⁵, kiu preskaŭ
  // kompletas jam ĉe t = 0.2, do la kurteno sidas ekster la ŝtofo ekde la kolumo
  // malsupren kaj restas preskaŭ egallarĝa — kiel vera hararo, kiu disvastiĝas
  // super la ŝultroj kaj poste pendas.
  const larĝMalsupro = 0o100/0o400, profMalsupro = 0o73/0o400;
  // rSupro 0.156 estas pli mallarĝa ol la harĉapo ( 0.188 ), do la supra rando
  // de la kurteno sidas INTERNE de la ĉapo kaj la kudro ne videblas. Kun
  // 0.1875 la du randoj preskaŭ koincidis kaj la kurteno montris sian tranĉitan
  // supran randon kiel du platajn ortangulojn flanke de la vizaĝo.
  const rSupro = 0o11/0o100;

  const pozicioj: number[] = [];
  const normaloj: number[] = [];
  const indeksoj: number[] = [];
  // ⟨ La harfadenaj UV-oj 📃 ⟩ — la kurteno antaŭe havis NENIAJN UV-ojn, do la
  // har-teksajxo specimeniĝis ĉe unu sola punkto kaj la kurteno restis plata
  // koloro dum la ĉapo havis fadenojn. Poste ĝi havis propran u-amplekson
  // ( 0o43/0o100 de turno por ±69° ), kiu tamen estis malĝusta — la tufoj de la
  // kurteno larĝiĝis preskaŭ trifoje kaj la fadenoj saltis ĉe la ĉapo. Nun u kaj v
  // venas el la KOMUNA cilindra mapado super la tuta hararo ( vidu haraU kaj
  // haraV ), do la tufa larĝo kaj la fadena fazo restas la samaj trans la kudro.
  const uvoj: number[] = [];
  for ( let v = 0; v <= vicoj; v++ ) {
    const t = v / vicoj;
    // ⟨ La sekco kreskas NELINIE 📃 ⟩ — la hararo disiĝas super la ŝultroj ( kie
    // la kapo estas larĝa ) kaj poste pendas preskaŭ vertikale, do la profilo
    // estas kurbo anstataŭ konuso. La kvin-pota formo faras la kurbo JENAN :
    // preskaŭ la tuta kresko okazas dum la unua kvinono de la falo ( la ŝultroj ),
    // kaj la cetero pendas egallarĝa. La du duonaksoj de la superelipso kreskas
    // kune, do la sekco restas glata tra la tuta falo.
    const elvolvo = 0o1 - Math.pow( 0o1 - t, 0o5 );
    const larĝoK = rSupro + ( larĝMalsupro - rSupro ) * elvolvo;
    const profoK = rSupro + ( profMalsupro - rSupro ) * elvolvo;
    const potenco = 0o2 + t;
    const y = ySupro + ( yMalsupro - ySupro ) * t;
    for ( let k = 0; k <= kolonoj; k++ ) {
      const fi = -fiMax + k / kolonoj * 0o2 * fiMax;
      // ⟨ La malsupra rando 📃 ⟩ — la mezo ( la dorso ) estas la plej malalta
      // punkto, kaj la du finoj KURBIĜAS SUPRE ( la kvaroncirklo sube ). La
      // hararo do finiĝas per suprenkurba flanko, kiel veraj harfinoj. La sama
      // rando ankaŭ kuntiras la sekcon ĉe la finoj, do la haroj finiĝas KURBE
      // malantaŭ la oreloj.
      const rando = Math.abs(k / kolonoj - 0o1/0o2) * 0o2;   // 0 meze, 1 ĉe la finoj
      // ⟨ La flankoj RONDIĜAS 📃 ⟩ — la levigilo estis rando², kies deklivo ĉe la
      // finoj estas 2, do la malsupra rando renkontis la FLANKAN randon per angulo
      // ( la hararo finiĝis per akra angulo super la ŝultro ). La kvaroncirklo
      // ( 1 − √( 1 − rando² ) ) havas la samajn finpunktojn sed VERTIKALAN
      // deklivon ĉe la finoj, do ĝi kurbiĝas glate en la flankan randon kaj la
      // haroj finiĝas per ronda transiro. Ĝi ankaŭ tenas la mezon pli plata, do la
      // centra pinto restas la sola pinto.
      const supren = 0o1 - Math.sqrt(Math.max(0, 0o1 - rando * rando));
      const tucko = rando * rando;
      // La kurbiĝo 1 − ( 1 − rando )^1.5 havas deklivon ĉe la mezo ( la pinto ) sed
      // nulan deklivon ĉe la finoj ( la glataj flankoj ).
      const pinto = 0o1 - Math.pow( 0o1 - rando, 0o3/0o2 );
      const finoY = ( 0o1/0o10 * supren - 0o1/0o40 * ( 0o1 - pinto ) ) * t;
      // ⟨ La hararo havas FAKSJOJN 📃 ⟩ — la radiuso ondiĝas per kvin molaj loboj,
      // kiuj fortiĝas malsupren ( t ), do la malsupra parto de la kurteno legiĝas
      // kiel faskoj da haro anstataŭ kiel glata konko.
      // ⟨ La faskoj estas MOLAJ 📃 ⟩ — la ondo de la radiuso malaltiĝis de 0.075
      // al 0.04, ĉar kun la pli profunda ondo la silueto montris skallopojn ( kaj
      // la mantelo kovras la plej grandan parton de la kurteno, do oni vidis nur
      // la randon mem ). Nun ĝi nur milde ondigas la staturon.
      const fasko = 0o1 + 0o1/0o25 * t * Math.cos(fi * 0o5);
      // La punkto de la superelipso en la direkto fi — k solvas
      // ( k sin fi / larĝoK )^p + ( k cos fi / profoK )^p = 1, do la sekco estas
      // rondo ĉe p = 2 ( ĉe la kranio ) kaj rondigita ortangulo ĉe p = 3 ( ĉe la
      // dorso ). Unu formulo tenas ambaŭ finojn.
      const s = Math.abs(Math.sin(fi)), ko = Math.abs(Math.cos(fi));
      const kK = 0o1 / Math.pow(Math.pow(s / larĝoK, potenco) + Math.pow(ko / profoK, potenco), 0o1 / potenco);
      const rK = kK * ( 0o1 - 0o3/0o20 * tucko ) * fasko;
      const x = Math.sin(fi) * rK;
      const z = -Math.cos(fi) * rK;
      // ⟨ La finoj LEVIĜAS 📃 ⟩ — la malsupra vico leviĝas 0.1 ĉe la du finoj
      // ( la sama tucko ankaŭ kuntiras la sekcon tie ), do la hararo finiĝas per
      // suprenkurba flanko anstataŭ per akra angulo super la manikoj.
      pozicioj.push(x, y + finoY, z);
      // Ekstera normalo — radiala horizontala direkto, for de la kapo-akso.
      normaloj.push(Math.sin(fi), 0, -Math.cos(fi));
      // La azimuto de la ĉapo estas π − fi ( la kurteno mezuras de la dorso, la
      // ĉapo de la fronto ), do haraU ricevas la SAMAN angulon kiel la ĉapo.
      uvoj.push(haraU(Math.PI - fi), haraV(y + finoY));
    }
  }
  for ( let v = 0; v < vicoj; v++ ) {
    for ( let k = 0; k < kolonoj; k++ ) {
      const a = v * ( kolonoj + 0o1 ) + k, b = a + 0o1;
      const c = a + kolonoj + 0o1, d = c + 0o1;
      indeksoj.push(a, b, d, a, d, c);
    }
  }
  return kreiBuferanGeometrion(pozicioj, indeksoj, { normaloj, uvoj });
}

// ⟨ La flankaj har-strioj estis forigitaj 📃 ⟩ — la malnova kreiHaranFlankon
// konstruis PLATAN rubandon de la tempio ĝis la genuoj. Ĝi ne havis dikecon,
// do la lumo falis egale sur ĝin kaj ĝi legiĝis kiel klingo, ne kiel hartufo
// ( kaj kun la pli longa kurteno ĝi faris du klingojn ĉe la vizaĝo ). La
// kurteno nun ĉirkaŭas pli antaŭen ( fiMax 0o157/0o100 ≈ 100° ) kaj mem kadras
// la vizaĝon per vera kurbiĝanta surfaco, do la apartaj strioj ne plu necesas.

// har-koloroj — malhelbruna ĝis ruĝeta malhelbruna. Ĉiu NPC ricevas propran
// nuancon per hazarda mikso inter la du, por ke la homamaso ne aspektu unuforma.
export const harKoloroA = new THREE.Color(0x201810); // malhelbruna
export const harKoloroB = new THREE.Color(0x402818); // ruĝeta malhelbruna
export const harKoloro = new THREE.Color();            // provizora miksita koloro

// ⟨ La har-materialoj 📃 ⟩ — kaŝmemoritaj po koloro. La haro nun portas sian
// propran fadenan teksajxon ( kreiHaranTeksajxon ) kaj molan malvarm-bluan
// brilon ( sheen ). Sen la kaŝo ĉiu unuopa NPC konstruus propran materialon — la
// sama programo kaj la sama teksajxo, sed aparta material-objekto por ĉiu. Kun
// la kaŝo la tuta NPC-aro uzas tiom da materialoj, kiom da har-koloroj estas en
// la vido.
// ⟨ La blua brilo 📃 ⟩ La haro multiplikas la teksajxon per la baza koloro, do
// la teksajxo povas nur MALLUMIGI — ĝi neniam povus bluigi brunan haron. La
// sheen-tavolo tamen ALDONAS koloron super la bazo, do ĝi donas la malvarmetan
// bluecan nuancon de malhela haro en la nebula mondo ( la sama malvarmo kiel la
// nebulo kaj la griza ĉielo ).
const HARAJ_MATERIALOJ = new Map<number, THREE.MeshPhysicalMaterial>();
// ⟨ La malvarma bluo 📃 ⟩ — la du finoj de la sheen-koloro. Helaj haroj ricevas
// preskaŭ neŭtralan grizbluan brilon ( haro ne brilu blue ), malhelaj haroj
// ricevas profundan malvarm-bluan. Kun multa sheen la malhela haro legiĝas
// blueca-nigra — la sama malvarmo kiel la nebulo, la griza ĉielo kaj la ombroj de
// la har-teksajxo.
const SHEEN_HELA = new THREE.Color(0xb0bccc);
const SHEEN_MALHELA = new THREE.Color(0x284878);
// ⟨ La blua nuanco 📃 ⟩ — kiom la BAZA koloro de malhela haro moviĝas al la bluo.
// La materialo multiplikas la har-teksajxon per ĉi tiu koloro, do la teksturo
// povas nur MALLUMIGI — ĝi neniam povus bluigi brunan haron. La eta movo de la
// baza koloro ( maksimume 0o1/0o10 ) estas tio, kio permesas al malhela haro
// fariĝi malvarm-blua nuanco sen nova har-koloro en la paletro.
const HARO_BLUO = new THREE.Color(0x18304c);
export function haraMaterialo(koloro: number): THREE.MeshPhysicalMaterial {
  let m = HARAJ_MATERIALOJ.get(koloro);
  if ( !m ) {
    // La malheleco de la baza koloro ( 0 hela, 1 preskaŭ nigra ). La valoroj estas
    // en lineara kolor-spaco ( three konvertas la deksesumajn kolorojn ), do la
    // paletro disvastiĝas de proksimume 0.005 ( la nigra ) gxis 0.3 ( la blonda ).
    const koloroO = new THREE.Color(koloro);
    const lumo = koloroO.r * 0o52/0o100 + koloroO.g * 0o143/0o200 + koloroO.b * 0o7/0o100;
    // ⟨ La sojlo gravas 📃 ⟩ — kun sojlo 0.2 la kaŝtana ( 0x583820, lumo 0.055 )
    // ricevis preskaŭ la saman bluon kiel la nigra, do la bruna haro perdis sian
    // varmon. Kun sojlo 0.1 nur la preskaŭ nigraj nuancoj atingas la plenan bluon
    // kaj la mezaj brunoj restas brunaj kun eta malvarmo.
    const malheleco = Math.min(0o1, Math.max(0, 0o1 - lumo / 0o6/0o100));
    m = new THREE.MeshPhysicalMaterial({
      color: koloroO.clone().lerp(HARO_BLUO, malheleco * 0o1/0o10),
      map: kreiHaranTeksajxon(),
      // La malglateco estas sufiĉe alta. kun 0.58 la haro montris grandan
      // spegulan makulon kaj legiĝis kiel polurita plasto. La sheen-tavolo
      // ( malglateco 0.5 ) ankoraŭ donas la molan bluan brilon.
      roughness: 0o55/0o100,
      sheen: 0o4/0o100 + 0o26/0o100 * malheleco,
      sheenColor: SHEEN_HELA.clone().lerp(SHEEN_MALHELA, malheleco),
      sheenRoughness: 0o13/0o20 - 0o1/0o10 * malheleco,
      side: THREE.DoubleSide,
    });
    HARAJ_MATERIALOJ.set(koloro, m);
  }
  return m;
}

// harajGeometrioj — la kunigitaj har-geometrioj po stilo, konstruitaj unufoje.
// Ĉiu stilo iĝas UNU meshon — la ĉapo kaj la kurteno dividas la saman
// har-materialon, do ili povas kunfandiĝi sen perdi ion ( la kurteno ne havas
// UV-ojn, kio ne ĝenas, ĉar la har-materialo ne havas mapon ). Nekonata stilo
// uzas la mallongan ĉapon.
//     @param stilo ( Harstilo ) - La stilo por konstrui ( aŭ preni el la kaŝo ).
//     @returns geometrio ( THREE.BufferGeometry ) - La kunigita har-geometrio.
export const HARO_Y = 0o155/0o100;   // 1.703125 — la centro de la har-ĉapo

// kreiHaranĈapon — La har-ĉapo. Kupolo super la kranio kun MALKONSTANTA rando —
// la haroj malsupreniras ĉe la nuko kaj la tempioj kaj altiĝas antaŭe, do la
// frunto videblas. La antaŭa versio estis premiita sfero kun horizontala rando,
// do la haro legiĝis kiel kasko ( aŭ kiel fungo kun la malnova radiuso 0.219 ).
// ⟨ Kial la rando sekvas la kranion 📃 ⟩ La rando malsupreniras malantaŭe je
// 0o11/0o5 radianoj de la poluso, kaj tie la sfera radiuso jam estus INTERNE de la
// kapo — la haro enirus la kranion. La radiuso de ĉiu punkto do estas la MAKSIMUMO
// de la sfera radiuso kaj la krania radiuso ĉe tiu alto ( plus eta spaco ), do la
// ĉapo povas malsupreniri tiom kiom la kapo permesas sen tranĉi en ĝin.
//     @returns geometrio ( THREE.BufferGeometry ) - La ĉapo, ĉe la kapo.
function kreiHaranĈapon(): THREE.BufferGeometry {
  const VICOJ = 0o14, KOLONOJ = 0o24;
  const DIKO_RANDO = 0o6/0o1000;    // 0.0117 — la har-dikeco ĉe la har-limo ( 6 / 512 )
  const DIKO_KRONO = 0o24/0o1000;   // 0.0390 — la har-dikeco ĉe la krono ( 20 / 512 )
  // ⟨ La frunta har-limo LEVIĜIS 📃 ⟩ — kun 1.625 la rando malsupreniris al la
  // mondo 1.615, nur 0.025 super la okuloj, do la brovoj ( vidu
  // kreiVizaĝajnStrikojn ) malaperis sub la hararo.
  // ⟨ La har-limo sekvas la brovojn 📃 ⟩ — la brovoj leviĝis kun la okuloj, do la
  // frunta rando ankaŭ leviĝis — alie la brovoj malaperus sub la fadenoj. Nun la
  // frunta rando sidas ĉe 1.375, do super ĝi staras iom pli da frunto ol la brovoj
  // postulas sed la frunto mem restas pli mallonga ol antaŭe ( la rando kaj la
  // brovoj leviĝis preskaŭ kune ).
  const FI_ANTAUX = 0o26/0o20;      // 1.375 rad — la frunta har-limo
  const FI_MALANTAUX = 0o21/0o10;   // 2.125 rad — la nuka har-limo
  // ⟨ La TEMPLOJ leviĝas 📃 ⟩ — la har-limo malleviĝas antaŭe ( la frunto ) kaj
  // malsupreniras malantaŭe ( la nuko ), sed la FLANKOJ devas resti pli alte ol
  // la mezo. Kiam la okuloj leviĝis, la flankaj fadenoj malsupreniris super ilin
  // kaj la eksteraj anguloj de la okuloj kaj la finoj de la brovoj malaperis sub
  // la hararon. Ĉi tiu levo malaperas ĉe la frunto kaj ĉe la nuko ( sin² ), do
  // tiuj du randoj ne ŝanĝiĝas — nur la temploj altiĝas.
  const TEMPIO = 0o20/0o100;        // 0.25 rad — kiom la temploj leviĝas
  const ONDO = 0o7/0o100;           // 0.109 rad — la profundo de la fadenaj loboj
  const KLUĈO = 0o1/0o20;           // 0.05 — la ondo de la har-dikeco ( la faskoj )
  const pozicioj: number[] = [], uvoj: number[] = [], indeksoj: number[] = [];
  for ( let v = 0; v <= VICOJ; v++ ) {
    const t = v / VICOJ;
    for ( let k = 0; k <= KOLONOJ; k++ ) {
      const ang = k / KOLONOJ * Math.PI * 0o2;
      // ⟨ La har-limo 📃 ⟩ — la latitudo de la rando por ĉi tiu azimuto ( 0
      // antaŭe, π malantaŭe ). Ĝi malleviĝas antaŭe super la okulojn ( la frunton
      // kovras FRINGO ) kaj malsupreniras ĉe la nuko.
      // ⟨ La ondo estas GLATA, ne PINTECA 📃 ⟩ — la kvar loboj de la har-limo
      // antaŭe venis el la ABSOLUTA valoro de la sinuso, kiu havas akrajn kuspojn:
      // la har-limo finiĝis per kvar PINTOJ kaj inter ili per profundaj V-fendoj,
      // do la frunto aspektis kiel dentoj aŭ kiel akra vidvina pinto. Nun la ondo
      // estas simpla kosinuso ( 1 − cos 5·ang ), kiu estas GLATA ĉie kaj havas
      // entjeran periodon ( la kudro malantaŭe restas senrompa ). La har-limo de
      // la haroj do finiĝas per mola, RONDA undeto anstataŭ per akraj dentoj.
      // ⟨ La har-limo RIPETAS la finon de la kurteno 📃 ⟩ — la longa hararo estas
      // DU partoj ( la ĉapo supre, la kurteno malsupre — vidu haranGeometrion ) kaj
      // la malsupra rando de la kurteno ondiĝas per KVIN faskoj, kun la plej
      // malalta fasko malantaŭe ( vidu la faskon en kreiHaranKurtenon ). La har-limo
      // havis KVAR lobojn, do la du partoj de la sama hararo legiĝis kiel du stiloj.
      // Nun ĝi havas kvin lobojn kaj ĝia plej profunda punkto ankaŭ sidas malantaŭe,
      // do la ĉapo portas la saman ritmon kiel la kurteno sub ĝi kaj la kurteno
      // legiĝas kiel la daŭrigo de la ĉapo.
      const fiMax = FI_ANTAUX
        + ( FI_MALANTAUX - FI_ANTAUX ) * ( 0o1 - Math.cos(ang) ) / 0o2
        + ONDO * ( 0o1 - Math.cos(ang * 0o5) ) * 0o1/0o2
        - TEMPIO * Math.sin(ang) * Math.sin(ang);
      const fi = t * fiMax;
      // ⟨ La haro estas SXELO sur la kranio 📃 ⟩ — la punktoj venas el sfero
      // centrita en la kapcentro kun radiuso KAPA_R plus la har-dikeco. Tiel la
      // haro neniam eniras la kapon kaj ĝia dikeco estas regata aparte de la
      // formo. La dikeco malkreskas al la rando, do la haro estas pli dika ĉe la
      // krono ( tie la haroj leviĝas ) kaj plata ĉe la har-limo.
      // ⟨ La faskoj 📃 ⟩ — la har-dikeco ankaŭ ondas ĉirkaŭ la kapo, do la hararo
      // legiĝas kiel pluraj faskoj anstataŭ kiel perfekta ŝelo. La ondo havas
      // entjeran periodon, do la kudro malantaŭe ne rompiĝas.
      // ⟨ La faskoj EŜAS tiujn de la kurteno 📃 ⟩ — la ĉapo mezuras sian angulon de
      // la FRONTO ( ang = 0 ) kaj la kurteno de la DORSO ( fi = 0 ), do la sama
      // kvin-loba ondo aperas ĉe la ĉapo kiel −cos 5·ang : la fasko de la ĉapo kaj
      // la fasko de la kurteno tiam sidas sur la sama meridiano kaj la haro legiĝas
      // kiel unu fasko, kiu daŭriĝas trans la kudro de la du partoj.
      const diko = ( DIKO_RANDO + ( DIKO_KRONO - DIKO_RANDO ) * ( 0o1 - t ) * ( 0o1 - t ) )
        * ( 0o1 - KLUĈO * Math.cos(ang * 0o5) );
      const R = KAPA_R + diko;
      const y = KAPA_Y + R * Math.cos(fi);
      const rTuta = R * Math.sin(fi);
      pozicioj.push(Math.sin(ang) * rTuta, y, Math.cos(ang) * rTuta);
      // La ĉapo uzas la SAMAN cilindran mapadon kiel la kurteno ( vidu haraU kaj
      // haraV ), do la tufo, kiu malsupreniras la ĉapon ĉe iu azimuto, daŭriĝas
      // sur la kurtenon ĉe la sama azimuto — sen salto en la larĝo nek en la fazo.
      uvoj.push(haraU(ang), haraV(y));
    }
  }
  for ( let v = 0; v < VICOJ; v++ ) {
    for ( let k = 0; k < KOLONOJ; k++ ) {
      const a = v * ( KOLONOJ + 0o1 ) + k, b = a + 0o1;
      const c = a + KOLONOJ + 0o1, d = c + 0o1;
      // La ventumilo montras EKSTEREN — la vicoj malsupreniras, do la ordo
      // inversiĝas rilate al la kurteno ( vidu kreiHaranKurtenon ).
      indeksoj.push(a, d, b, a, c, d);
    }
  }
  return kreiBuferanGeometrion(pozicioj, indeksoj, { uvoj });
}

const harajGeometrioj = new Map<string, THREE.BufferGeometry>();
export function haranGeometrion(stilo: Harstilo): THREE.BufferGeometry {
  const cacheita = harajGeometrioj.get(stilo.nomo);
  if ( cacheita ) return cacheita;
  const partoj: THREE.BufferGeometry[] = [];
  // ⟨ La ĉapo estas konko, ne kasko 📃 ⟩ — la radiuso estas 0.188 ( nur iomete
  // pli ol la kranio 0.172 ) kaj la premego 0.625, do la ĉapo sekvas la kranion
  // kaj finiĝas iomete super ĝi.
  partoj.push(kreiHaranĈapon());
  if ( stilo.nomo === "haroLonga" ) {
    // Pli granda ĉapo plus fleksita kurteno kiu ĉirkaŭas la dorson de la kapo
    // ĝis antaŭ la oreloj kaj falas ĝis la ŝultroj kun pinteca fringo.
    partoj.push(kreiHaranKurtenon());
  }
  const geometrio = kunfandiGeometriojn(partoj);
  harajGeometrioj.set(stilo.nomo, geometrio);
  return geometrio;
}
