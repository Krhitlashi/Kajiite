// ≺⧼ La pilolaj fenestroj 🪟 ⧽≻
// La longaj horizontalaj rondigitaj fenestroj — la mezuroj ( fenestraSubFaco,
// fenestraMargxeno, fenestraLargho ), la konstruilo ( aldoniPilolFenestron ) kaj
// la fenestra materialo ( fenestraMaterialo ).
import * as THREE from "three";
import { kreiFenestranMaterialon } from "../../komunajxoj/materialoj.js";
import { kreiPilolFenestranFormon, kreiStelanFenestranFormon, rondigiKonturon } from "../../komunajxoj/formoj.js";
import { konstruajxaMaterialo } from "./tipoj.js";

// ⟨ La pilol-fenestroj 📃 ⟩ — la sama LONGAs horizontala rondigita fenestro kun ora
// rando aperas sur la kosmosxipo, sur la kunvenejo ( kasafeo ) kaj sur la
// stacidomo ( stacioxipo ). La meto estas la delikata parto: la monto-grupo sidas
// ĉe la fenestra SUBO, do ĝia z-offset devas esti la muro-radiuso TIE — ne la
// radiuso ĉe la fenestra CENTRO ( lv.faco ). Ĉar ĉiu tavolo malvastiĝas supren per
// `klino`, la muro ĉe la fenestra subo estas klino·fenAlto/(2·tieroAlto) pli
// larĝa ol la centro-radiuso: kun la centro-radiuso la supraj fenestroj
// entombiĝis 0.0115 en la muron ( kaj la spegulitaj subaj flosis 0.043 eksteren )
// — ili tute ne montriĝis. La tri lokoj antaŭe kalkulis tion mem; nun unu helpilo.
const fenProud = 0o1/0o100;

// kadroRondigo — Kiom granda la glata tranĉo ĉe ĉiu angulo de la stela fenestra
// kadro ( la bendo, la pintoj kaj iliaj ŝultroj ). La antaŭa kadro havis akrajn
// angulojn ĉe ĉiu pinto kaj ĉe ĉiu ŝultro.
const kadroRondigo = 0o1/0o20;

// fenestraSubFaco — La muro-radiuso ĉe la fenestra SUBO, plus eta elstaro antaŭen.
//     @param facaRadiuso ( number ) - La muro-radiuso ĉe la fenestra CENTRO.
//     @param suba ( boolean ) - Ĉu la tavolo speguliĝas: malsuprenirantaj tavoloj
//              malvastiĝas malsupren, do tie la signo de la klino inversiĝas.
export function fenestraSubFaco(facaRadiuso: number, klino: number, fenAlto: number,
  tieroAlto: number, suba = false
): number {
  const klinaAngulo = Math.atan(klino / tieroAlto);
  return facaRadiuso + ( suba ? -1 : 1 ) * klino * fenAlto / ( 2 * tieroAlto )
    + fenProud / Math.cos(klinaAngulo);
}

// fenestraMargxeno — La horizontala interspaco ĉe ĉiu flanko de la fenestro.
// ⟨ UNU nombro por la tuta konstruaĵo 📃 ⟩ La marĝeno estas kalkulita UNUFOJE kaj
// ĉiu tavolo ricevas precize tiun nombron, sen multipliko aux divido per sia propra
// faco. La libera spaco ĉe la anguloj estas do la SAMA nombro sur ĉiu tavolo kaj ĝi
// VIDEBIAS ie ajn. La fenestra alto ne ŝanĝiĝas de tavolo al tavolo, do la fenestroj
// mallongiĝas precize per la sama kvanto, kiun mallongiĝas la tavoloj.
// ⟨ Kiom granda 📃 ⟩ 0o2/0o10 de la muro-radiuso de la PLEJ LARĜA ( teretaĝa ) faco,
// t.e. 0o1/0o10 de la faco ĉe ĉiu flanko — la fenestro do okupas 0o6/0o10 de la
// plej larĝa faco kaj 0o1/0o10 da libera muro restas ĉe ĉiu flanko.
// ⟨ Kial ne el la pinta tavolo 📃 ⟩ Se la marĝeno estus kalkulita el la plej
// mallarĝa tavolo, la nombro estus tiel malgranda ( 0.4 sur la kunvenejo ), ke la
// ora kadro plenigus la tutan liberan spacon kaj la fenestro aspektus kiel la tuta
// muro — la interspaco tute ne videblus. Anstataŭe la tro mallarĝaj tavoloj restas
// SEN fenestro ( vidu konstruiSatalon ).
//     @param facaRadiusoLarga ( number ) - La muro-radiuso de la plej larĝa
//              ( teretaĝa ) tavolo, kie fenestroj estas.
//     @returns marĝeno ( number ) - La interspaco po flanko, por ĉiuj tavoloj.
export function fenestraMargxeno(facaRadiusoLarga: number): number {
  return facaRadiusoLarga * 0o2/0o10;
}

// fenestraLargho — Kiom longa fenestro taŭgas sur tiu faco.
// ⟨ Kun marĝeno 📃 ⟩ La fenestro estas la tuta faco minus la marĝeno ĉe ambaŭ
// flankoj. Se tio estus pli mallonga ol la fenestra alto, la alvokanto simple
// malhavas la fenestron sur tiu tavolo — pli bone nenia fenestro ol stumpo.
// ⟨ Sen marĝeno 📃 ⟩ La malnova laŭtavola regulo, por alvokantoj, kiuj volas
// siajn proprajn proporciojn ( nun neniu — ĉiuj pasigas la marĝenon ).
export function fenestraLargho(facaRadiuso: number, fenAlto: number, margxeno?: number): number {
  if ( margxeno !== undefined ) return facaRadiuso * 2 - margxeno * 2;
  return Math.min(facaRadiuso * 2 - 0o3/0o10, facaRadiuso * 4/3 + 0o1/0o4, fenAlto * 9);
}

// aldoniPilolFenestron — Metu unu pilol-fenestron sur unu facon de unu tavolo.
//     @param suba ( boolean = false ) - Ĉu la tavolo speguliĝas malsupren.
//     @param margxeno ( number, nedeviga ) - La sama horizontala interspaco por
//              ĉiuj tavoloj de konstruaĵo ( vidu fenestraMargxeno ). Sen ĝi la
//              malnova laŭtavola regulo validas.
//     @param vertikala ( boolean = false ) - Ĉu la fenestro staras VERTIKALE.
//              ⟨ Kiam ĝi utilas 📃 ⟩ Sur la plej mallarĝaj tavoloj horizontala
//              fenestro ne plu enirus kun la sama marĝeno, sed la sama fenestro
//              turnita per 90° ankoraŭ havas lokon — la tavola alto donas la
//              longan mezuron. La mallonga mezuro restas la fenestra alto, do la
//              fenestroj aspektas samaj, nur staras vertikale.
//     @returns La vitro-panelo ( la kosmosxipo kolektas ilin por la flug-pulso ).
export function aldoniPilolFenestron(
  group: THREE.Group, kadraMaterialo: THREE.MeshStandardMaterial,
  fenestraMaterialo: THREE.MeshStandardMaterial,
  facoIndekso: number, yCentro: number, facaRadiuso: number,
  klino: number, tieroAlto: number, fenAlto: number, suba = false, margxeno?: number,
  vertikala = false
): THREE.Mesh {
  const klinaAngulo = Math.atan(klino / tieroAlto);
  // ⟨ La longa mezuro 📃 ⟩ Horizontale ĝi venas el la faco minus la marĝeno.
  // Vertikale ĝi estas du fenestraj altoj — la sama fenestro, nur turnita, do ĝi
  // restas kompakta anstataux longa fendo en la tuta tavola alto.
  const ww = vertikala ? fenAlto * 0o2 : fenestraLargho(facaRadiuso, fenAlto, margxeno);
  // ⟨ La vertikala mezuro de la fenestro 📃 ⟩ Por la monto-grupo gravas ĉi tiu,
  // ne la longa — la grupo sidas ĉe la fenestra SUBO kaj la fenestro estas
  // centrita en la tavolo.
  const fenAltoTuta = vertikala ? ww : fenAlto;
  // La faco-grupo turnas la fenestron al sia muro; la monto-grupo sidas ĉe la
  // fenestra SUBO kaj kliniĝas ĉirkaŭ la propra centro, do la fenestro kuŝas
  // plate sur la klinita muro ( ne svingiĝas ĉirkaŭ la konstruaĵa origino ).
  const faco = new THREE.Group();
  faco.rotation.y = facoIndekso * Math.PI / 2;
  const monto = new THREE.Group();
  monto.position.set(0, yCentro - fenAltoTuta / 2,
    fenestraSubFaco(facaRadiuso, klino, fenAltoTuta, tieroAlto, suba));
  monto.rotation.x = suba ? klinaAngulo : -klinaAngulo;
  faco.add(monto);
  // Densa sampado de la pilolo — la arkoj aspektas RONDIGITAJ ( la malnova
  // 0o24 lasis la duoncirklajn finojn facete poligonaj ).
  // ⟨ La vertikala turno 📃 ⟩ La tuta formo ( la vitro kaj la kadro ) estas la
  // sama, nur turnita per 90° ĉirkaŭ la monto-najbaro — poste oni ŝovas ĝin reen
  // al la monto-origino, ĉar la turno metus la vitro-subon dekstren.
  const formo = kreiPilolFenestranFormon(ww, fenAlto);
  const fenGeometrio = new THREE.ShapeGeometry(formo, 0o100);
  if ( vertikala ) {
    fenGeometrio.rotateZ(Math.PI / 2);
    fenGeometrio.translate(fenAlto / 2, ww / 2, 0);
  }
  const fen = new THREE.Mesh(fenGeometrio, fenestraMaterialo);
  monto.add(fen);
  // ⟨ La ora kadro estas PLATA PLATO 📃 ⟩ Antaŭe la kadro estis RONDA TUBO laŭ
  // la konturo — ĝi legiĝis kiel kanalo de dukto. Nun ĝi estas PLATA kaj PLENA
  // plato: la stela konturo estas plenigita formo, el kiu oni eltranĉas la
  // vitron, do la oro kuŝas sur la muro kiel plata bendo kun kvar pintoj.
  // ⟨ Kial la stelo estas ŝveligita 📃 ⟩ La stela konturo de la antaŭa versio
  // sekvis la pilolon mem, do plenigita ĝi estus nur kvar oraj trianguloj —
  // la vitra fenestro havus NENIAN kadron ĉirkaŭ si. La konturo nun estas la
  // pilolo ŜVELIGITA per la kadra larĝo ( kadroLargho ), do la oro ĉirkaŭas la
  // vitron per egala bendo, kaj la pintoj elstaras el tiu bendo.
  // La truo estas la pilolo iomete malpli larĝa, por ke la oro kovru la randon
  // de la vitro sen ia fendo. La plato elstaras maldike antaŭen ( kadroDikeco )
  // kaj kuŝas plata sur la muro — neniu bevelo, neniu rondaĵo.
  // La kadra larĝo estas egala al la DIAMETRO de la malnova tubo ( 0.125 ), do
  // la kadro havas la saman videblan pezon kiel antaŭe, sed plata. La dikeco
  // ( 0.0625 ) estas la malnova tuba radiuso — la plato do elstaras same
  // malmulte, nur sen la rondaĵo.
  const kadroLargho = 0o1/0o10, kadroDikeco = 0o1/0o20;
  // ⟨ La flankaj pintoj restu sur la faco 📃 ⟩ La pinto de la kadro neniam rajtas
  // elstari preter la rando de la faco — sur la mallarĝaj pintaj tavoloj de la
  // kosmosxipo, kaj sur la teretaĝo de la kunvenejo, la libera spaco estas
  // malgranda ( 0.26 kaj 0.39 ) dum la pinto estas 0.3125. La krampo mallongigas
  // NUR la flankajn pintojn; la supraj/malsupraj restas konstante longaj, ĉar ili
  // iras laŭ la tavola alto kaj havas ĉiam lokon.
  // ⟨ Kiom da libera spaco 📃 ⟩ La longa kaj la mallonga aksoj havas malsamajn
  // limojn — horizontale la faco, vertikale la tavola alto.
  const liberoLonga = vertikala ? ( tieroAlto - ww ) * 0o1/0o2 : facaRadiuso - ww * 0o1/0o2;
  const liberoMallonga = vertikala ? facaRadiuso - fenAlto * 0o1/0o2
    : ( tieroAlto - fenAlto ) * 0o1/0o2;
  const pintoSupre = fenAlto * 0o1/0o2;
  const pintoFlanko = Math.max(0, Math.min(pintoSupre, liberoLonga - kadroLargho - 0o1/0o100));
  const pintoMallonga = Math.max(0, Math.min(pintoSupre,
    liberoMallonga - kadroLargho - 0o1/0o100));
  // ⟨ Nenia angulo 📃 ⟩ La konturo de la stelo estas glatigita per rondigita
  // tranĉo ĉe ĉiu angulo ( rondigiKonturon ) — la bendo fluas en la pintojn per
  // kurbo, kaj la pintoj mem finiĝas per malgranda rondo anstataŭ per akra
  // vertico. La formo do restas stelo, sed sen ia rompita rando.
  const stelo = rondigiKonturon(
    kreiStelanFenestranFormon(ww, fenAlto, kadroLargho, pintoFlanko, pintoMallonga).getPoints(0o20),
    kadroRondigo);
  const truo = kreiPilolFenestranFormon(ww - 0o1/0o100, fenAlto - 0o1/0o100).getPoints(0o20);
  stelo.holes.push(new THREE.Path(truo.reverse()));
  const kadroGeometrio = new THREE.ExtrudeGeometry(stelo,
    { depth: kadroDikeco, bevelEnabled: false, curveSegments: 0o10 });
  if ( vertikala ) {
    kadroGeometrio.rotateZ(Math.PI / 2);
    kadroGeometrio.translate(fenAlto / 2, ww / 2, 0);
  }
  monto.add(new THREE.Mesh(kadroGeometrio, kadraMaterialo));
  group.add(faco);
  return fen;
}

// fenestraMaterialo. La vitro de la eksteraj fenestroj, unu dividita instance por
// ĉiuj konstruaĵoj ( same kiel la muroj kaj la kadroj ). La difino mem venas el
// la komuna fabriko ( kreiFenestranMaterialon ), do la konstruaĵoj, la internoj,
// la kosmoŝipo kaj la vitraj pordoj uzas la SAMAN vitron. La kosmoŝipo ricevas
// sian propran instancon, ĉar la flugo pulsas ĝian brilon.
export function fenestraMaterialo(): THREE.MeshStandardMaterial {
  return konstruajxaMaterialo("fenestro", () => kreiFenestranMaterialon());
}
