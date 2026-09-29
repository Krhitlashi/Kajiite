// ≺⧼ La vojaj ĉapoj 🌗 ⧽≻
// La duoncirkla ĉapo ĉe libera voj-fino — la duondiska formo
// ( kreiDuonrondanFormon ), la ekstrudita geometrio ( kreiRondanKapGeometrion )
// kaj la konstruilo ( konstruiRondajnKapojn ).
import * as THREE from "three";
import { ANGULA_PROVOLIRO, kreiGeometriajnBufrojn, kreiVojojnMaterialojn, specimeniAngulojn } from "./bufroj.js";
import { VOJA_SUPRO_LEVIGXO } from "./mezuroj.js";

// ⟨ Kial la kradaj nodoj ne ricevas ĉapojn 📃 ⟩ — la vojoj mem kaj la kunigaj
// platoj plenigas ĉiun kradan nodon ( la trapasanta diorita bendo kaj la
// andezitaj bordoj kovras la tutan diskan regionon ). La kradaj rando-nodoj
// restas nur por la lampoj ( placajNodoj en urbo.ts ). Nur liberaj voj-finoj
// ricevas ĉapojn — konstruiVojojn detektas ilin aux­tomate ( ĉiu difino-fino
// ekster la kunigaj truoj ) — do la doka bordo kaj la aliaj skulptitaj finoj
// rondigxas sen mana listo.

// kreiDuonrondanFormon — Duoncirkla formo ( la ĉapa duondisko aŭ duonringo )
// en la duon-ebeno de la MUNDA direkto ( dx, dz ). la rekta flanko pasas tra
// la origino perpendikulare al la direkto, kaj la arko elstaras en la
// direkto. La sama orientiĝo kiel la aliaj vojoj ( ExtrudeGeometry +
// rotateX -90° ). la formo sidas en la XZ-ebeno, la ekstrudo kreskas supren
// per la voja dikeco, kaj la videbla supro sidas ĉe la pozicio + dikeco kun
// la muroj pendantaj sub ĝi. La truo ( duonringo ) estas 0o1/0o100 ENIGITA
// al la arko, por ke ĝia rekta flanko ne kuŝu sur la ekstera rekta flanko (
// Earcut alie ne tranĉus la truon — la koincidaj rektoj malsukcesigis la
// ponton ).
function kreiDuonrondanFormon(internaRadiuso: number, eksteraRadiuso: number, dx: number, dz: number): THREE.Shape {
  const paŝoj = 0o40;
  const aMezo = Math.atan2(dz, dx);
  const punkto = ( radiuso: number, ang: number ): [ number, number ] =>
    [ radiuso * Math.cos(ang), -radiuso * Math.sin(ang) ];
  const formo = new THREE.Shape();
  const eksteraj: [ number, number ][] = [];
  for ( let i = paŝoj; i >= 0; i-- ) {
    eksteraj.push(punkto(eksteraRadiuso, aMezo + Math.PI / 2 - ( i / paŝoj ) * Math.PI));
  }
  formo.moveTo(eksteraj[0][0], eksteraj[0][1]);
  for ( let i = 1; i < eksteraj.length; i++ ) formo.lineTo(eksteraj[i][0], eksteraj[i][1]);
  formo.closePath();
  if ( internaRadiuso > 0 ) {
    const enu = 0o1/0o100;
    const truo = new THREE.Path();
    const internaj: [ number, number ][] = [];
    for ( let i = 0; i <= paŝoj; i++ ) {
      internaj.push(punkto(internaRadiuso, aMezo - Math.PI / 2 + ( i / paŝoj ) * Math.PI));
    }
    for ( const p of internaj ) { p[0] += enu * dx; p[1] -= enu * dz; }
    truo.moveTo(internaj[0][0], internaj[0][1]);
    for ( let i = 1; i < internaj.length; i++ ) truo.lineTo(internaj[i][0], internaj[i][1]);
    truo.closePath();
    formo.holes.push(truo);
  }
  return formo;
}

// kreiRondanKapGeometrion — Ekstrudita DUONCIRKLO ( duondisko aŭ duonringo )
// por la ĉapoj ĉe la doka bordo, elstaranta en la monda direkto ( dx, dz ).
function kreiRondanKapGeometrion(internaRadiuso: number, eksteraRadiuso: number, dikeco: number, dx: number, dz: number): THREE.ExtrudeGeometry {
  const geometrio = new THREE.ExtrudeGeometry(kreiDuonrondanFormon(internaRadiuso, eksteraRadiuso, dx, dz), { depth: dikeco, bevelEnabled: false, curveSegments: 0o40 });
  geometrio.rotateX(-Math.PI / 2);
  return geometrio;
}

// konstruiRondajnKapojn — DUONCIRKLAJ ĉapoj ĉe la donitaj vojo-finoj de la
// doka bordo, elstarantaj en la direkto kiu daŭrigas la vojon. la du
// kajo-finoj ( okcidente en la arbaro, oriente sur la seka bordo ) bulas
// preter la fino. ( La dokaj landrandoj KUTIMIS ricevi ĉapojn, kiuj bulis
// suden sur la platformon — la doko estas voja etendo, do la ĉapo rondigis la
// transiron — sed ili montriĝis kiel arko INTERNE de ĉiu doko, do la ludo
// nun konstruas la kapojn nur ĉe la du kajo-finoj; la turnitaj dokoj de la
// malproksima riverbordo havas nenian vojon. ) La disko
// ( 0o7/0o10 = la diorita centro ) kaj la ringo ( 0o7/0o10..0o13/0o10 = la
// andezita bordo ) estas EKSTRUDITAJ per la sama nivelo kiel la voja strio
// ( VOJA_SUPRO_LEVIGXO ) kaj poziciitaj ĉe la terena nivelo. la videbla supro sidas
// ĉe la voja supro-nivelo ( tereno + VOJA_SUPRO_LEVIGXO ) kaj tiom-altaj muroj
// pendas de ĝi ĝis la tereno — ĝuste kiel la vojoj, do la ĉapoj montras
// verajn 3D-flankajn murojn, ne plu platajn 2D-diskojn kaj -ringojn. Kie la
// ĉapoj interkovras la vojon, la polygonOffset-hierarkio decidas la
// koincidajn facojn. la disko ( -4/-2, la sama kiel la spronoj ) gajnas
// super la voja centro ( -2/-1 ), kaj la ringo ( -1/-1 ) malgajnas kontraŭ
// la vojo kaj la disko — la andezita ringo montriĝas nur preter la voja
// rando, kiel la rondigita bordo de la ĉapo. La ĉapoj de ĉiuj nodoj
// kunigas po materialo ( du desegnaj alvokoj anstataŭ du po nodo ).
//     @param sceno ( Scene ) - La sceno.
//     @param nodoj ( [ number, number ][] ) - La vojo-finoj.
//     @param direktoj ( [ number, number ][] ) - La elstara direkto de ĉiu
//         ĉapo ( normaligita aŭ ne ) — paralela al la voja daŭrigo.
//     @param heightFn ( ( x, z ) => number ) - La terena alteco.
//     @param dioritaMaterialo ( MeshStandardMaterial ) - La baza diorita materialo.
//     @param andezitaMaterialo ( MeshStandardMaterial ) - La baza andezita materialo.
//     @returns nenio
export function konstruiRondajnKapojn(sceno: THREE.Scene,
  nodoj: [ number, number ][],
  direktoj: [ number, number ][],
  heightFn: ( x: number, z: number ) => number,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial
): void {
  if ( nodoj.length === 0 ) return;
  const dikeco = VOJA_SUPRO_LEVIGXO;
  // La disko uzas la saman pli altan offseton kiel la spronoj ( -4/-2 kontraux
  // la striaj -2/-1 ) — la koincidaj facoj kun la voja supro gajnas determinite.
  const { supraMaterialo, bordaMaterialo } = kreiVojojnMaterialojn(dioritaMaterialo, andezitaMaterialo, -4, -2, -1, -1);
  const bufroj = kreiGeometriajnBufrojn();
  for ( let i = 0; i < nodoj.length; i++ ) {
    const [ x, z ] = nodoj[i];
    const [ dx, dz ] = direktoj[i];
    // La SUPRO restas je la originala nivelo ( tereno + dikeco ) — la ĉapo
    // kongruas kun la voja strio. Nur la profundo etendiĝas sub la
    // minimuman angulan altecon + margxeno — la muroj ĉiam enfosiĝas.
    const terenaY = heightFn(x, z);
    const altoj = specimeniAngulojn(x, z, 0o13/0o10, 0o13/0o10, heightFn);
    const kapDikeco = dikeco + ( terenaY + dikeco - altoj.minimumo ) + ANGULA_PROVOLIRO;
    const y = terenaY + dikeco - kapDikeco;
    bufroj.aldoni(kreiRondanKapGeometrion(0o7/0o10, 0o13/0o10, kapDikeco, dx, dz), bordaMaterialo, new THREE.Matrix4().makeTranslation(x, y, z));
    bufroj.aldoni(kreiRondanKapGeometrion(0, 0o7/0o10, kapDikeco, dx, dz), supraMaterialo, new THREE.Matrix4().makeTranslation(x, y, z));
  }
  // La ĉapoj restas RICEVAJ ombroj — kaj la ombro-elfluado de la kunigitaj
  // surfacoj kaj la malnova kasto estas ĉi tie nenia ( la ĉapoj sidas samloke
  // kun la vojoj, kastigi la ombrojn de la vojo mem ne havas sencon ).
  bufroj.kunigi(sceno, false);
}
