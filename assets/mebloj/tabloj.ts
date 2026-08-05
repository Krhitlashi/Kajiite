// Tabloj kaj segxoj — la KOMMUNA tablo/segxo-aseto, uzata kaj de la internaj
// spacoj ( eniriInternon ) kaj de la eksteraj mangxejo-tabloj ( konstruiSatalon ).
// Unu sola difino ambauxflanke — neniu diverganta ekstera kaj interna tablo.
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

// La komuna BRUNA ligna koloro por la tabloj — la SAMA por la internaj kaj
// eksteraj tabloj, por ke la aseto ne drivu duope.
export const LIGNA_KOLORO = 0x54402e;

// Komuna ora rando por la tabloj ( defauxlte; la alvokantoj povas anstatauxi
// gxin per la kadra materialo de la konstruajxo por kongrui al gxia koloro ).
const oraTablaRando = new THREE.MeshStandardMaterial({ color: 0xd9b36a, metalness: 0o3/0o4, roughness: 0o3/0o10 });

// aldoniTablon — Rondangula ligna tablo kun ora rando sur la supro. La sama
// restoraci-stila tablo en la domo, la kasafeo kaj la mangxejo — interne kaj
// ekstere.
//     @param x, z, y ( number ) - La tablo-centro kaj la planko-nivelo.
//     @param largho, profundo ( number ) - La tablo-dimensioj.
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
  const tablo = new THREE.Mesh( new RoundedBoxGeometry( largho, 0o3/0o10, profundo, 3, 0o1/0o10 ), lignaMaterialo );
  tablo.position.set( x, y + 0o2/0o10, z );
  tablo.castShadow = true;
  grupo.add( tablo );
  const rando = new THREE.Mesh( new RoundedBoxGeometry( largho + 0o1/0o20, 0o1/0o20, profundo + 0o1/0o20, 3, 0o1/0o10 ), randoMaterialo );
  // Rando iomete sub la tablo-supro (0o7/0o20) por eviti z-batalan brilon
  rando.position.set( x, y + 0o2/0o10 + 0o3/0o20 - 0o1/0o40 - 0o1/0o100, z );
  rando.castShadow = true;
  grupo.add( rando );
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
  const benko = new THREE.Mesh( new RoundedBoxGeometry( 0o12/0o10, 0o3/0o10, 0o4/0o10, 3, 0o1/0o20 ), segxMaterialo );
  benko.position.set( x, y + 0o3/0o20, z );
  benko.rotation.y = rotacio;
  benko.castShadow = true;
  grupo.add( benko );
  // Rando sur la benko-supro — iomete sub la supro ( 0o1/0o100 libero ) por
  // eviti z-batalan brilon ( kiel la tabla rando ).
  const rando = new THREE.Mesh( new RoundedBoxGeometry( 0o12/0o10 + 0o1/0o20, 0o1/0o20, 0o4/0o10 + 0o1/0o20, 3, 0o1/0o10 ), randoMaterialo );
  rando.position.set( x, y + 0o3/0o20 + 0o3/0o20 - 0o1/0o40 - 0o1/0o100, z );
  rando.rotation.y = rotacio;
  rando.castShadow = true;
  grupo.add( rando );
}
