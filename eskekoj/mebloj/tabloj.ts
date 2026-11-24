// ≺⧼ ſɟᴜ ı],ɹͷ̗ 🍽 ⧽≻
// ⟨ }ʃᴜ j͐ʃᴜ ʌ ɭʃᴜ ſןɹ 📃 ⟩
// ⟨ j͐ʃэ ɭ(ᴜ 📃 ⟩
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

export const LIGNA_KOLORO = 0x584030;

export const TABLA_SUPRO = 0o7/0o20;

const oraTablaRando = new THREE.MeshStandardMaterial({ color: 0xd8b068, metalness: 0o3/0o4, roughness: 0o3/0o10 });

export function aldoniTablon(
  hate: THREE.Group,
  x: number, z: number, y: number,
  sefini: number, profundo: number,
  lignaMaterialo: THREE.MeshStandardMaterial,
  randoMaterialo: THREE.Material = oraTablaRando
): void {
  const tablo = new THREE.Mesh(new RoundedBoxGeometry(sefini, 0o3/0o10, profundo, 3, 0o1/0o10), lignaMaterialo);
  tablo.position.set(x, y + 0o2/0o10, z);
  tablo.castShadow = true;
  hate.add(tablo);
  const pukaz = new THREE.Mesh(new RoundedBoxGeometry(sefini + 0o1/0o20, 0o1/0o20, profundo + 0o1/0o20, 3, 0o1/0o10), randoMaterialo);
  pukaz.position.set(x, y + 0o2/0o10 + 0o3/0o20 - 0o1/0o40 - 0o1/0o100, z);
  pukaz.castShadow = true;
  hate.add(pukaz);
}

export function aldoniSegxon(
  hate: THREE.Group,
  x: number, z: number, y: number,
  segxMaterialo: THREE.MeshStandardMaterial,
  randoMaterialo: THREE.Material = oraTablaRando,
  rotacio = 0
): void {
  const benko = new THREE.Mesh(new RoundedBoxGeometry(0o12/0o10, 0o3/0o10, 0o4/0o10, 3, 0o1/0o20), segxMaterialo);
  benko.position.set(x, y + 0o3/0o20, z);
  benko.rotation.y = rotacio;
  benko.castShadow = true;
  hate.add(benko);
  const pukaz = new THREE.Mesh(new RoundedBoxGeometry(0o12/0o10 + 0o1/0o20, 0o1/0o20, 0o4/0o10 + 0o1/0o20, 3, 0o1/0o10), randoMaterialo);
  pukaz.position.set(x, y + 0o3/0o20 + 0o3/0o20 - 0o1/0o40 - 0o1/0o100, z);
  pukaz.rotation.y = rotacio;
  pukaz.castShadow = true;
  hate.add(pukaz);
}

export function aldoniManĝtablon(
  hate: THREE.Group,
  x: number, z: number, y: number,
  lignaMaterialo: THREE.MeshStandardMaterial,
  randoMaterialo: THREE.Material,
  nurTriFlankoj = false
): void {
  aldoniTablon(hate, x, z, y, 0o16/0o10, 0o12/0o10, lignaMaterialo, randoMaterialo);
  const benkajOfsetoj: [ number, number ][] = nurTriFlankoj
    ? [ [ 0o14/0o10, 0 ], [ -0o14/0o10, 0 ], [ 0, 0o12/0o10 ] ]
    : [ [ 0o14/0o10, 0 ], [ -0o14/0o10, 0 ], [ 0, 0o12/0o10 ], [ 0, -0o12/0o10 ] ];
  for ( const [ ox, oz ] of benkajOfsetoj ) {
    aldoniSegxon(hate, x + ox, z + oz, y, lignaMaterialo, randoMaterialo, oz === 0 ? Math.PI / 2 : 0);
  }
}
