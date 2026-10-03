// ≺⧼ តុ និងកៅអី 🍽 ⧽≻
// ⟨ ត្រឡប់ទៅទម្រង់រាបវិញ 📃 ⟩
// ⟨ ម្ចាស់កម្ពស់ 📃 ⟩
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

export const LIGNA_KOLORO = 0x584030;

export const TABLA_SUPRO = 0o7/0o20;

const oraTablaRando = new THREE.MeshStandardMaterial({ color: 0xd8b068, metalness: 0o3/0o4, roughness: 0o3/0o10 });

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
  rando.position.set(x, y + 0o2/0o10 + 0o3/0o20 - 0o1/0o40 - 0o1/0o100, z);
  rando.castShadow = true;
  grupo.add(rando);
}

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
  const rando = new THREE.Mesh(new RoundedBoxGeometry(0o12/0o10 + 0o1/0o20, 0o1/0o20, 0o4/0o10 + 0o1/0o20, 3, 0o1/0o10), randoMaterialo);
  rando.position.set(x, y + 0o3/0o20 + 0o3/0o20 - 0o1/0o40 - 0o1/0o100, z);
  rando.rotation.y = rotacio;
  rando.castShadow = true;
  grupo.add(rando);
}

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
