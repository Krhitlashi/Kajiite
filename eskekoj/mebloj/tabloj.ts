// ≺⧼ Tabloj kaj seĝoj 🍽 ⧽≻
// La KOMMUNA tablo/segxo-aseto, uzata kaj de la internaj spacoj ( eniriInternon )
// kaj de la eksteraj mangxejo-tabloj ( konstruiSatalon ).
// Unu sola difino ambauxflanke — neniu diverganta ekstera kaj interna tablo.
//
// ⟨ REEN AL LA PLATA FORMO 📃 ⟩ — la mebloj portis dum unu versio krurojn,
// tabulojn, jupojn kaj dorsapogilojn ( la okcidenta restoracia stilo ). En ĉi tiu
// mondo la homoj SIDAS SUR LA PLANKO: la manĝtabloj kaj la benkoj estas malaltaj
// rondangulaj plotoj kuŝantaj sur la grundo, kiel la ceteraj mebloj ( la litoj,
// la kestoj, la vendotabloj ). La kruroj kaj la seĝa alto venis el alia kulturo,
// do ili forfalis kaj la antaŭa formo revenis — kun la sama oro-randa stilo.
//
// ⟨ La mastro de la altoj 📃 ⟩ — TABLA_SUPRO ( la supro de la tabulo, kie la
// manĝaĵoj sidas ) estas eksportita, ĉar la manĝaĵoj ( kreiMangxajxojn en
// mangxajxoj.ts ) devas suriĝi ĝuste ĉi tie. La malnova valoro vivis dufoje (
// unufoje ĉi tie, unufoje en la manĝaĵoj ) — la dua kopio forfalis.
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

// La komuna BRUNA ligna koloro por la tabloj — la SAMA por la internaj kaj
// eksteraj tabloj, por ke la aseto ne drivu duope.
export const LIGNA_KOLORO = 0x584030;

// La nivelo de la TABULO — la tabloj estas plataj blokoj, kiuj kusxas preskaux
// sur la planko ( la malsupro je 0o4/0o100 = 0.0625, la supro je 0o7/0o20 ).
// La manĝaĵoj sidas sur ĉi tiu nivelo.
export const TABLA_SUPRO = 0o7/0o20;

// Komuna ora rando por la tabloj ( defauxlte; la alvokantoj povas anstatauxi
// gxin per la kadra materialo de la konstruajxo por kongrui al gxia koloro ).
const oraTablaRando = new THREE.MeshStandardMaterial({ color: 0xd8b068, metalness: 0o3/0o4, roughness: 0o3/0o10 });

// aldoniTablon — Plata rondangula ligna tablo kun ora rando sur la supro. La
// sama restoraci-stila tablo en la domo, la kasafeo kaj la mangxejo — interne
// kaj ekstere. La tabulo sidas preskaux sur la planko ( 0.0625 klareco — la
// sama "sur la planko" aspekto kiel la benkoj ).
//     @param x, z, y ( number ) - La tablo-centro kaj la planko-nivelo.
//     @param largho, profundo ( number ) - La tabulo-dimensioj.
//     @param lignaMaterialo ( MeshStandardMaterial ) - La tablo-supro.
//     @param randoMaterialo ( Material = oraTablaRando ) - La ora rando; oni
//         kutime pasas la kadran materialon de la konstruajxo.
export function aldoniTablon(
  grupo: THREE.Group,
  x: number, z: number, y: number,
  largho: number, profundo: number,
  lignaMaterialo: THREE.MeshStandardMaterial,
  randoMaterialo: THREE.Material = oraTablaRando
): void {
  const tablo = new THREE.Mesh(new RoundedBoxGeometry(largho, 0o3/0o10, profundo, 3, 0o1/0o10), lignaMaterialo);
  tablo.position.set(x, y + 0o2/0o10, z);
  tablo.castShadow = true;
  grupo.add(tablo);
  const rando = new THREE.Mesh(new RoundedBoxGeometry(largho + 0o1/0o20, 0o1/0o20, profundo + 0o1/0o20, 3, 0o1/0o10), randoMaterialo);
  // Rando iomete sub la tablo-supro (0o7/0o20) por eviti z-batalan brilon
  rando.position.set(x, y + 0o2/0o10 + 0o3/0o20 - 0o1/0o40 - 0o1/0o100, z);
  rando.castShadow = true;
  grupo.add(rando);
}

// aldoniSegxon — Longa rondangula benko rekte sur la planko kun molaj
// anguloj kaj ora rando sur la supro ( kiel la tabloj ). `rotacio` turnas la
// longan akson de la benko. 0 = laux x ( lauxlonge de la tabla flanko ),
// π/2 = laux z.
//     @param x, z, y ( number ) - La benko-centro kaj la planko-nivelo.
//     @param segxMaterialo ( MeshStandardMaterial ) - La benko.
//     @param randoMaterialo ( Material = oraTablaRando ) - La ora rando; oni
//         kutime pasas la kadran materialon de la konstruajxo.
//     @param rotacio ( number = 0 ) - Turno de la longa akso. 0 = laux x,
//         π/2 = laux z.
export function aldoniSegxon(
  grupo: THREE.Group,
  x: number, z: number, y: number,
  segxMaterialo: THREE.MeshStandardMaterial,
  randoMaterialo: THREE.Material = oraTablaRando,
  rotacio = 0
): void {
  const benko = new THREE.Mesh(new RoundedBoxGeometry(0o12/0o10, 0o3/0o10, 0o4/0o10, 3, 0o1/0o20), segxMaterialo);
  benko.position.set(x, y + 0o3/0o20, z);
  benko.rotation.y = rotacio;
  benko.castShadow = true;
  grupo.add(benko);
  // Rando sur la benko-supro — iomete sub la supro ( 0o1/0o100 libero ) por
  // eviti z-batalan brilon ( kiel la tabla rando ).
  const rando = new THREE.Mesh(new RoundedBoxGeometry(0o12/0o10 + 0o1/0o20, 0o1/0o20, 0o4/0o10 + 0o1/0o20, 3, 0o1/0o10), randoMaterialo);
  rando.position.set(x, y + 0o3/0o20 + 0o3/0o20 - 0o1/0o40 - 0o1/0o100, z);
  rando.rotation.y = rotacio;
  rando.castShadow = true;
  grupo.add(rando);
}

// aldoniManĝtablon — Tablo kun la kvar benkoj cxirkaux gxi ( la komuna manĝa
// arangxo de la mangxejoj ). La benkoj kuŝas lauxlonge de la tablaj flankoj
// ( π/2 cxe la x-flankoj, 0 cxe la z-flankoj ); la x-flankaj benkoj staras pli
// fore ( 0o14/0o10 ) ol la z-flankaj ( 0o12/0o10 ), cxar la tablo estas pli
// largxa ol profunda — la libero al la tablo-rando tiel egalas cxirkaŭe
// ( 0o3/0o8 ). Uzata de la ekstera mangxejo ( satalaj-konstruajxoj ) kaj de
// la internaj mangxejoj ( internoj ).
//     @param grupo ( THREE.Group ) - La grupo.
//     @param x, z ( number ) - La tablo-centro.
//     @param y ( number ) - La planko-nivelo.
//     @param lignaMaterialo ( MeshStandardMaterial ) - La tablo-supro kaj benkoj.
//     @param randoMaterialo ( Material ) - La ora rando; oni kutime pasas la
//         kadran materialon de la konstruajxo.
//     @param nurTriFlankoj ( boolean = false ) - Cxu preterlasi la benkon cxe
//         la malantauxa flanko ( -z ) — la flanko kontraŭ la vendotablo en la
//         mangxejo restas libera por la kalkulanto.
export function aldoniManĝtablon(
  grupo: THREE.Group,
  x: number, z: number, y: number,
  lignaMaterialo: THREE.MeshStandardMaterial,
  randoMaterialo: THREE.Material,
  nurTriFlankoj = false
): void {
  aldoniTablon(grupo, x, z, y, 0o16/0o10, 0o12/0o10, lignaMaterialo, randoMaterialo);
  const benkajOfsetoj: [ number, number ][] = nurTriFlankoj
    ? [ [ 0o14/0o10, 0 ], [ -0o14/0o10, 0 ], [ 0, 0o12/0o10 ] ]
    : [ [ 0o14/0o10, 0 ], [ -0o14/0o10, 0 ], [ 0, 0o12/0o10 ], [ 0, -0o12/0o10 ] ];
  for ( const [ ox, oz ] of benkajOfsetoj ) {
    aldoniSegxon(grupo, x + ox, z + oz, y, lignaMaterialo, randoMaterialo, oz === 0 ? Math.PI / 2 : 0);
  }
}
