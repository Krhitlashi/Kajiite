// ≺⧼ La vizaĝa teksturo 👁️ ⧽≻
// La kanvasaj okuloj, brovoj, okulharoj kaj buŝo — la koloraj paletroj ( OKULAJ_*,
// BROVA_*, LAŜO_*, BUŜO_*, PALPEBRA_* ), la desegniloj ( okulaFoliaVojo,
// okulaRombo ) kaj la kaŝmemoritaj teksturoj kaj materialoj ( okulaTeksajxo,
// okulaMaterialo ). La okulaj formoj mem vivas en vizagxo.ts.
import * as THREE from "three";
import { deksesuma } from "../../komunajxoj/koloroj.js";

// ⟪ La okuloj 👁️ ⟫
// ⟨ La okulaj koloroj 📃 ⟩ — ĉiu paletro havas DU kolorojn kaj la pupilo montras
// ilin en tri horizontalaj bendoj. La meza bendo estas la MIKSO de la du, do la
// okulo transiras de unu nuanco al la alia sen vera gradiento. KNAKEHE permesas nur
// la kolorojn #nmnmnm ( ĉiu kanalo oblo de 8 ), do ankaŭ la mikso RONDIGIĜAS al tiu
// krado — la transira bendo do restas laŭregula.
const okulaKrado = (kanalo: number): number =>
  Math.min(0o370, Math.round(kanalo / 0o10) * 0o10);
function okulaMikso(a: number, b: number): number {
  const mezumo = (sxovo: number): number =>
    okulaKrado(( ( a >> sxovo & 0xff ) + ( b >> sxovo & 0xff ) ) / 0o2);
  return mezumo(0o20) << 0o20 | mezumo(0o10) << 0o10 | mezumo(0);
}
// ⟨ La mezuroj de la okulo 📃 ⟩ — la duonlarĝo kaj la duonalto de la folio. La
// kanvasa pentraĵo kaj la geometrio ( vidu kreiOkulon ) devas uzi la SAMAN
// nombrojn, ĉar la blanka okulglobo pentriĝas per la folia kurbo mem — se la du
// disiĝus, la rando de la blanka areo ne plu kongruus kun la rando de la okulo.
export const OKULA_LARĜO = 0o4/0o200;    // 0.03125
export const OKULA_ALTO = 0o13/0o1000;   // 0.0215
// La pozicio de la okulo sur la kranio — uzata ankaŭ de la brovoj kaj de la
// okulharoj ( vidu kreiVizaĝajnStrikojn ), do ĝi estas nomita unufoje.
// ⟨ La okuloj LEVIĜIS 📃 ⟩ — kun −0.0547 la okullinio sidis 0.049 SUB la mezo de
// la kranio ( la krono estas ĉe +0.160 kaj la mentono ĉe −0.172 ), do la frunto
// legis kiel du trionoj de la kapo kaj la malsupra vizaĝo etendiĝis. Nun la
// okuloj sidas apud la PLEJ LARĜA ringo de la kranio ( −0.0078 ), kie ili ankaŭ
// devas sidi ĉe vera kapo — la vertikala divido de la kapo estas preskaŭ egala.
// ⟨ La profundo sekvas la kranion 📃 ⟩ — kiam la okuloj leviĝas ili ankaŭ
// antaŭeniras, ĉar la kranio plilarĝiĝas supren; OKULA_DZ do ĉiam estas la
// profundo de la kranio ĉe la nova alto plus la sama eta elstaro, kiun la okulo
// havis antaŭe.
export const OKULA_DX = 0o11/0o200;      // 0.0703 — kiom flanken de la kapcentro
export const OKULA_DY = -0o13/0o1000;    // −0.0215 — kiom sub la kapcentro
export const OKULA_DZ = 0o117/0o1000;    // 0.1543 — kiom antaŭen
// ⟨ La anguloj de la pupilo restas PINTECAJ 📃 ⟩ — la rondigo de la rombo estas
// kvarono de ĉiu rando ( 0.25 ), sed tio legiĝis kiel RONDIGITA KVADRATO, ne kiel
// rombo. 0.1 nur molaĵas la kvar pintojn, do la formo restas rombo.
const OKULA_ANGULO = 0o1/0o10;
// ⟨ La brovoj kaj la okulharoj 📃 ⟩ — la haraj strioj sur la vizaĝo ( vidu
// kreiVizaĝajnStrikojn ). Ili estas GEOMETRIO, ne pentraĵo, ĉar la vizaĝa kanvaso
// estas dividita po okula paletro — brovo pentrita en ĝi havus la saman koloron por
// ĉiuj figuroj. Kiel geometrio ili portas la haran materialon kaj sekvas la
// har-koloron de la figuro.
// La brovo arkas super la okulo, mallarĝiĝas al la finoj kaj kuŝas SUR la krania
// surfaco ( vidu kapaSurfacon ); la okulharoj sekvas la supran arkon de la okula
// folio, iomete super ĝia rimo.
export const BROVA_DUONO = 0o21/0o1000;     // 0.0332 — la duonlarĝo de la brovo
export const BROVA_ALTO = 0o21/0o1000;      // 0.0332 — super la centro de la okulo
export const BROVA_ARko = 0o2/0o1000;       // 0.0039 — kiom la mezo de la brovo leviĝas
export const BROVA_KLINO = 0o2/0o1000;      // 0.0039 — kiom la ekstera fino malleviĝas
export const BROVA_LARĜO = 0o4/0o1000;      // 0.0078 — la larĝo ( la dikeco de la haro )
export const BROVA_DIKECO = 0o2/0o1000;     // 0.0039 — kiom la strio elstaras el la haŭto
export const BROVA_LEVO = 0o1/0o1000;       // 0.0020 — do la interna flanko tuŝas la haŭton
export const LAŜO_LARĜO = 0o3/0o1000;       // 0.0059 — la larĝo de la okulharoj
export const LAŜO_DIKECO = 0o2/0o1000;      // 0.0039
export const LAŜO_LEVO = 0o1/0o400;         // 0.0039 — super la rimo de la okulo
export const STRIO_STACIOJ = 0o14;          // la stacioj de ĉiu strio
// ⟨ La buŝo 📃 ⟩ — LONGA V sur la malsupra vizaĝo ( vidu kreiBuŝon ). La buŝo
// sidas en la spaco inter la pinto de la nazo ( 0.092 sub la kapcentro ) kaj la
// mentono ( 0.172 ), do la du anguloj leviĝas kaj la mezo malsupreniras — la
// legado de V. La strio estas geometrio kiel la brovoj, sed ĝi NE portas la haran
// materialon : ĝi apartenas al la vizaĝa geometrio ( la okuloj ) kaj montras la
// malhelan angulon de la okula kanvaso per siaj UV-oj ( vidu kreiBuŝon ), do la
// buŝo estas malhela ĉe ĉiu okula paletro sen nova materialo.
export const BUŜO_DUONO = 0o26/0o1000;      // 0.0430 — la duonlarĝo ( la direkto de la anguloj )
export const BUŜO_ANGULO = -0o64/0o1000;    // −0.1016 — la alto de la anguloj
export const BUŜO_MEZO = -0o72/0o1000;      // −0.1133 — la alto de la mezo ( la pinto de la V )
export const BUŜO_LARĜO = 0o4/0o1000;       // 0.0078 — la larĝo de la strio meze
export const BUŜO_DIKECO = 0o2/0o1000;      // 0.0039 — kiom la strio elstaras el la haŭto
export const BUŜO_LEVO = 0o1/0o1000;        // 0.0020 — do la interna flanko tuŝas la haŭton
export const BUŜO_STACIOJ = 0o10;           // la stacioj de ĉiu duono de la V
// ⟨ La palpebroj 📃 ⟩ — la figuro palpebrumas per HAŬTA folio super ĉiu okulo,
// kiu SKALIĜAS malsupren super la okulon. La okulo mem NENIAM ŝanĝiĝas, do la
// pupilo kaj la blanka parto restas senkudraj.
// ⟨ La palpebro estas KOPIO de la okulo 📃 ⟩ — ĝi portas la saman folion, la
// saman bazaron kaj la saman kliniĝon kiel la okulo, nur PALPEBRA_GRANDON pli
// grandan. Ĉiu vertico de la palpebro do sidas SAMPROPORCIE ekster la responda
// vertico de la okulo, kaj fermite la folio plene kovras ĝin — ankaŭ ĉe la du
// pintoj, kie ĉiu alia formo lasis strieton de la blanko videbla.
// ⟨ Kial la palpebro SKALIĜAS kaj ne GLITAS 📃 ⟩ — la unuaj provoj estis plataj
// folioj, kiuj glitis malsupren super la okulon. Ili devis sidi plurajn
// okulaltojn super la okulo, do ili ankaŭ kovris la BROVON kaj la vizaĝo
// aspektis kvazaŭ portanta du haŭtajn platojn. La folio anstataŭe havas sian
// pivoton super la okulo kaj nur SKALon malsupren, do malfermite ĝi estas
// preskaŭ nevidebla strio kaj ĝi NENIAM tuŝas la brovon.
// ⟨ Kial la palpebro sidas ANTAŬE 📃 ⟩ — la okulo elstaras el la haŭto, do la
// palpebro devas pasi antaŭ ĝi; alie la okulo trapikus la fermitan palpebron.
export const OKULA_DIKO = 0o1/0o200;        // 0.0078 — kiom la okulo elstaras
export const PALPEBRA_GRANDO = 0o23/0o20;   // 1.1875 — kiom pli granda ol la okulo
export const PALPEBRA_DIKO = 0o1/0o400;     // 0.0039 — kiom antaŭ la okulo. La palpebro
                                     // estas PARALELA al la okulo, do tiu eta
                                     // antaŭeno validas ĉie; se la du diskoj
                                     // estus pli proksimaj la bildigilo batalus
                                     // pri la profundo kaj la okulo montriĝus tra
                                     // la fermita palpebro.
// ⟨ La normalo de la okulo ne estas horizontala 📃 ⟩ — la okuloj sidas sur la
// antaŭa sfero de la vizaĝo, do ilia normalo montras ankaŭ malsupren. Ĉiu
// antaŭeno laŭ tiu normalo do ankaŭ mallevas la punkton, kaj la folio de la
// palpebro devas kompensi tion, alie ĝi ne kuŝus ĝuste sur la folio de la okulo.
// ( La normalo mem kalkuliĝas en vizaĝaBazaro — ĉi tio estas nur ĝia y-parto. )
export const OKULA_NORMALA_Y = OKULA_DY / Math.sqrt(
  OKULA_DX * OKULA_DX + OKULA_DY * OKULA_DY + OKULA_DZ * OKULA_DZ );
// ⟨ La linio de la kunpremita palpebro 📃 ⟩ — malfermite la palpebro kunpremiĝas
// al maldika strio. Tiu strio devas sidi en la mallarĝa FENESTRO inter la supra
// rimo de la okulo kaj la okulharoj — supre ĝi trafus la brovon, malsupre ĝi
// lasus haŭtan streĉon sur la okulo. Ĝi mezuriĝas de la okulcentro laŭ la
// vertikala akso, do ĝi sekvas la okulojn se ili iam moviĝos.
export const PALPEBRA_STRIO = 0o14/0o1000;  // 0.0234 — super la centro de la okulo
export const PALPEBRA_FERMO = 0o1/0o40;     // 0.03125 — la plej malgranda skalo; la
                                     // okulo restas malkovrita kaj la haroj videblaj
export const PALPEBRA_INTERVALO = 0o33/0o10;   // 3.375 s — inter du palpebrumoj
export const PALPEBRA_DAURO = 0o12/0o100;      // 0.156 s — kiom longe la okulo restas fermita
// okulaRando — La rando de la folio, kiel parto de la kanvasa alto. La folio estas
// la kunigo de du cirklaj arkoj tra ( ±1, 0 ) kaj ( 0, 1 ) en la unuoj de la
// duonlarĝo, do ĝi estas unu kurbo por ĉiuj okuloj — nur la proporcio gravas.
//     @param f ( number ) - −1 … 1 — la pozicio laŭ la larĝo.
//     @returns alto ( number ) - 0 … 0.5 — la duonalto ĉe tiu pozicio.
const OKULA_PROPORCIO = OKULA_ALTO / OKULA_LARĜO;
const OKULA_RADIUSO = ( 0o1 + OKULA_PROPORCIO * OKULA_PROPORCIO ) / ( 0o2 * OKULA_PROPORCIO );
function okulaRando(f: number): number {
  const folio = Math.sqrt(Math.max(0, OKULA_RADIUSO * OKULA_RADIUSO - f * f))
    - ( OKULA_RADIUSO - OKULA_PROPORCIO );
  return folio / ( 0o2 * OKULA_PROPORCIO );
}
// okulaFoliaVojo — La vojo de la tuta folio sur la kanvaso ( la supra arko, poste
// la malsupra ). Ĝi estas uzata dufoje — por la klipo de la okulglobo kaj por la
// laŝ-linio.
//     @param k ( CanvasRenderingContext2D ) - La kanvasa kunteksto.
//     @param W ( number ) - La larĝo (= alto) de la kanvaso.
function okulaFoliaVojo(k: CanvasRenderingContext2D, W: number): void {
  const PAŜOJ = 0o40;
  k.beginPath();
  for ( let i = 0; i <= PAŜOJ; i++ ) {
    const f = -0o1 + i / PAŜOJ * 0o2;
    const x = ( 0o1/0o2 + f * 0o1/0o2 ) * W;
    const y = ( 0o1/0o2 - okulaRando(f) ) * W;
    if ( i === 0 ) k.moveTo(x, y); else k.lineTo(x, y);
  }
  for ( let i = PAŜOJ; i >= 0; i-- ) {
    const f = -0o1 + i / PAŜOJ * 0o2;
    k.lineTo(( 0o1/0o2 + f * 0o1/0o2 ) * W, ( 0o1/0o2 + okulaRando(f) ) * W);
  }
  k.closePath();
}
// ⟨ La paletroj 📃 ⟩ — viola, bruna, malhelblua kaj malhelflava, ĉiam en paroj. La
// SUPRA bendo estas la malhela duono ( la ombro de la palpebro ), la malsupra la
// pli hela, do la pupilo ricevas profundon anstataŭ esti plata disko.
// ⟨ La unua paletro estas VIOLA kaj ĝi estas la plej ofta 📃 ⟩ — la okuloj de la
// homamaso estis preskaŭ ĉiuj brunaj aŭ malhelbluaj, ĉar la malnova purpuro
// ( 0x381848 ) estis tiom malhela, ke ĝi legis kiel bruno. La unua paletro nun
// portas veran violon ( 0x5c2e8c, heleco 92/140 kontraŭ 72 de la malnova ) kaj
// la elekto sube liveras ĝin al la DUONO de la figuroj — la violaj okuloj estas
// la plej oftaj en la mondo, ne unu el kvar hazardaj nuancoj.
const OKULAJ_PALETROJ: [ number, number ][] = [
  [ 0x5c2e8c, 0x341a52 ],   // viola → malhelviola
  [ 0x402810, 0x381848 ],   // bruna → malhelpurpura
  [ 0x182848, 0x483818 ],   // malhelblua → malhelflava
  [ 0x483818, 0x402810 ],   // malhelflava → bruna
];
// OKULAJ_ELEKTOJ — kiun paletron hazarda figuro ricevas. La paletro 0 ( la viola )
// aperas dufoje pli ofte ol ĉiu el la aliaj, do la plej ofta okulkoloro de la
// mondo estas la viola.
export const OKULAJ_ELEKTOJ = [ 0, 0, 0, 1, 2, 3 ];

// okulaRombo — La vojo de la pupilo — rombo kun RONDIGITAJ anguloj. Ĉiu angulo
// estas kvadrata kurbo kiu iras de punkto sur unu rando, tra la angulo mem, al
// punkto sur la sekva rando, do la formo restas rombo kun molaj anguloj anstataŭ
// rombo kun tranĉitaj anguloj.
//     @param k ( CanvasRenderingContext2D ) - La kanvasa kunteksto.
//     @param cx, cy ( number ) - La centro de la rombo.
//     @param dl, da ( number ) - La duonlarĝo kaj la duonalto.
//     @param angulo ( number ) - Kiom de ĉiu rando apartenas al la angulo.
function okulaRombo(k: CanvasRenderingContext2D, cx: number, cy: number,
  dl: number, da: number, angulo: number): void {
  const anguloj: [ number, number ][] = [ [ 0, -da ], [ dl, 0 ], [ 0, da ], [ -dl, 0 ] ];
  k.beginPath();
  for ( let i = 0; i < 0o4; i++ ) {
    const a = anguloj[i], b = anguloj[( i + 0o1 ) % 0o4 ];
    const post = anguloj[( i + 0o2 ) % 0o4 ];
    const en: [ number, number ] = [ a[0] + ( b[0] - a[0] ) * angulo,
      a[1] + ( b[1] - a[1] ) * angulo ];
    const el: [ number, number ] = [ b[0] + ( post[0] - b[0] ) * angulo,
      b[1] + ( post[1] - b[1] ) * angulo ];
    if ( i === 0 ) k.moveTo(cx + en[0], cy + en[1]);
    else k.lineTo(cx + en[0], cy + en[1]);
    k.quadraticCurveTo(cx + b[0], cy + b[1], cx + el[0], cy + el[1]);
  }
  k.closePath();
}

// okulaTeksajxo — La kanvaso de unu okulo, kaŝmemorita po paletro. La tuta kanvaso
// estas malhela kadro, SUR ĝi sidas la blanka okulglobo kun la palpebra ombro, kaj
// SUR tio la pupilo — rombo kun rondigitaj anguloj, pentrita en tri bendoj. La
// UV-oj de la okula geometrio ampleksas la tutan kanvon, do la rombo sidas meze de
// la folio.
// ⟨ La rombo estas pli mallarĝa ol alta 📃 ⟩ — la UV-oj dismetas la kanvon sur la
// okulon, kiu mem estas pli larĝa ol alta, do rombo 0.375 × 0.4375 sur la kanvaso
// montriĝas kiel preskaŭ egallatera rombo sur la okulo mem.
// ⟨ La pupilo PLIGRANDIĜIS 📃 ⟩ — la malnova rombo ( 0.30 × 0.375 ) lasis tiom da
// blanko, ke la okulo legis kiel blanka folio kun malgranda makulo. Nun la rombo
// estas 0.375 × 0.4375 — ĝi plenigas la okulon kaj restas nur maldika blanka
// rando ĉirkaŭ ĝi. La limo estas la folia kurbo mem ( vidu okulaRandon ): ĉe la
// mezlarĝo la folio ankoraŭ estas plena, do la pintoj de la rombo povas iri
// preskaŭ ĝis la rando, sed la anguloj de la rombo devas resti ene de la kurbo
// ĉe ĉiu larĝo — ĉe 0.5 la pintoj jam tranĉiĝus per la okulaj randoj.
//     @param paletro ( [ number, number ] ) - La du koloroj de la pupilo.
//     @returns teksajxo ( THREE.CanvasTexture ) - La preta okula teksturo.
const okulajTeksajxoj = new Map<string, THREE.CanvasTexture>();
function okulaTeksajxo(paletro: [ number, number ]): THREE.CanvasTexture {
  const klavo = paletro.join("-");
  const cacheita = okulajTeksajxoj.get(klavo);
  if ( cacheita ) return cacheita;
  const W = 0o200;
  const kanvasa = document.createElement("canvas");
  kanvasa.width = W; kanvasa.height = W;
  const k = kanvasa.getContext("2d")!;
  const laŝo = deksesuma(0x100808);
  // ⟨ La kadro 📃 ⟩ — la tuta kanvaso estas malhela antaŭ ĉio. La randoj de la
  // folio ( la anguloj de la okulo ) kaj la laŝ-linio montras ĉi tiun koloron.
  k.fillStyle = laŝo;
  k.fillRect(0, 0, W, W);
  const [ supra, malsupra ] = paletro;
  // ⟨ La blanka parto LUMIĜIS 📃 ⟩ — la palpebra ombro estis 0xc0c0c0 kaj la
  // hela bendo 0xd8d8d8, do la tuta okulo legiĝis griza. Nun ili estas 0xd0d0d0
  // kaj 0xe0e0e0 — la supra ombro ankoraŭ sidas sur la globo, sed la blanko vere
  // BLANKAS.
  const cx = W * 0o1/0o2, cy = W * 0o1/0o2;
  const dl = W * 0o24/0o100, da = W * 0o34/0o100;
  const tri = da * 0o2/0o3;
  // ⟨ La blanka okulglobo 📃 ⟩ — la folio pleniĝas per blanko kaj la supra parto
  // ricevas grizan bendon ( la ombro de la palpebro ). La pupilo sidas SUR la
  // globo. La blanka areo estas KLIPITA per la sama folia kurbo kiel la geometrio,
  // do la okulo havas veran blankan parton kaj ne blankan kvadraton.
  k.save();
  okulaFoliaVojo(k, W);
  k.clip();
  k.fillStyle = "#FFFFFF";
  k.fillRect(0, 0, W, W);
  k.fillStyle = deksesuma(0xd0d0d0);
  k.fillRect(0, 0, W, W * 0o26/0o100);
  k.fillStyle = deksesuma(0xe0e0e0);
  k.fillRect(0, W * 0o26/0o100, W, W * 0o11/0o100);
  k.save();
  okulaRombo(k, cx, cy, dl, da, OKULA_ANGULO);
  k.clip();
  k.fillStyle = deksesuma(supra);
  k.fillRect(0, cy - da, W, tri + 0o1);
  k.fillStyle = deksesuma(okulaMikso(supra, malsupra));
  k.fillRect(0, cy - da + tri, W, tri + 0o1);
  k.fillStyle = deksesuma(malsupra);
  k.fillRect(0, cy - da + tri * 0o2, W, tri + 0o1);
  // ⟨ La luma punkto 📃 ⟩ — malgranda blanka glimo en la supra-maldekstra angulo
  // de la pupilo. Sen ĝi la malhela okulo legiĝas kiel plata makulo, ĉar la mondo
  // lumas la okulojn preskaŭ egale.
  k.fillStyle = "#FFFFFF";
  k.beginPath();
  k.arc(cx - dl * 0o34/0o100, cy - da * 0o44/0o100, dl * 0o26/0o100, 0, Math.PI * 0o2);
  k.fill();
  k.restore();
  k.strokeStyle = laŝo;                         // la konturo de la pupilo
  k.lineWidth = Math.max(0o1, W * 0o1/0o50);
  okulaRombo(k, cx, cy, dl, da, OKULA_ANGULO);
  k.stroke();
  k.restore();
  // ⟨ La laŝ-linio 📃 ⟩ — malhela streko sur la rando de la folio, do la okulo
  // havas palpebron super kaj sub la blanka globo. Ĝi kongruas kun la geometria
  // rando, ĉar ambaŭ venas el okulaRando.
  k.strokeStyle = laŝo;
  k.lineWidth = W * 0o1/0o24;
  k.lineJoin = "round";
  okulaFoliaVojo(k, W);
  k.stroke();
  const t = new THREE.CanvasTexture(kanvasa);
  t.colorSpace = THREE.SRGBColorSpace;
  okulajTeksajxoj.set(klavo, t);
  return t;
}

// okulaMaterialo — La okula materialo de unu paletro ( kaŝmemorita ). La okuloj
// ricevas hazardan paletron po figuro, do la homamaso havas diversajn rigardojn
// sed nur kvar materialojn entute. La materialo portas sian propran teksturon, do
// la har-koloro ne tuŝas la okulojn ( blonda hararo ne faru blondajn okulojn ).
//     @param indekso ( number ) - La indekso de la paletro.
//     @returns materialo ( THREE.MeshStandardMaterial ) - La okula materialo.
const OKULAJ_MATERIALOJ = new Map<number, THREE.MeshStandardMaterial>();
export function okulaMaterialo(indekso: number): THREE.MeshStandardMaterial {
  const n = indekso % OKULAJ_PALETROJ.length;
  let m = OKULAJ_MATERIALOJ.get(n);
  if ( !m ) {
    m = new THREE.MeshStandardMaterial({ map: okulaTeksajxo(OKULAJ_PALETROJ[n]),
      roughness: 0o55/0o100 });
    OKULAJ_MATERIALOJ.set(n, m);
  }
  return m;
}
