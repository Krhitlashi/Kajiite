// ≺⧼ ſɟᴜ ı],ɹͷ̗ 🍽 ⧽≻
// ⟨ }ʃᴜ j͐ʃᴜ ʌ ɭʃᴜ ſןɹ 📃 ⟩
// ⟨ j͐ʃэ ɭ(ᴜ 📃 ⟩
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

export const KEHUWEH2 = 0x584030;

export const CAX2LTERU = 0o7/0o20;

const kuhalCax2lPukaz = new THREE.MeshStandardMaterial({ color: 0xd8b068, metalness: 0o3/0o4, roughness: 0o3/0o10 });

export function tlunakCax2l(
  hate2: THREE.Group,
  x: number, z: number, y: number,
  sefini: number, jufu: number,
  kehuPukek: THREE.MeshStandardMaterial,
  pukazPukek: THREE.Material = kuhalCax2lPukaz
): void {
  const tabelo = new THREE.Mesh(new RoundedBoxGeometry(sefini, 0o3/0o10, jufu, 0o3, 0o1/0o10), kehuPukek);
  tabelo.position.set(x, y + 0o2/0o10, z);
  tabelo.castShadow = true;
  hate2.add(tabelo);
  const pukaz = new THREE.Mesh(new RoundedBoxGeometry(sefini + 0o1/0o20, 0o1/0o20, jufu + 0o1/0o20, 0o3, 0o1/0o10), pukazPukek);
  pukaz.position.set(x, y + 0o2/0o10 + 0o3/0o20 - 0o1/0o40 - 0o1/0o100, z);
  pukaz.castShadow = true;
  hate2.add(pukaz);
}

export function tlunakCacap2baz2(
  hate2: THREE.Group,
  x: number, z: number, y: number,
  cacap2baz2Pukek: THREE.MeshStandardMaterial,
  pukazPukek: THREE.Material = kuhalCax2lPukaz,
  tafkaq = 0o0
): void {
  const cacap2baz2 = new THREE.Mesh(new RoundedBoxGeometry(0o12/0o10, 0o3/0o10, 0o4/0o10, 0o3, 0o1/0o20), cacap2baz2Pukek);
  cacap2baz2.position.set(x, y + 0o3/0o20, z);
  cacap2baz2.rotation.y = tafkaq;
  cacap2baz2.castShadow = true;
  hate2.add(cacap2baz2);
  const pukaz = new THREE.Mesh(new RoundedBoxGeometry(0o12/0o10 + 0o1/0o20, 0o1/0o20, 0o4/0o10 + 0o1/0o20, 0o3, 0o1/0o10), pukazPukek);
  pukaz.position.set(x, y + 0o3/0o20 + 0o3/0o20 - 0o1/0o40 - 0o1/0o100, z);
  pukaz.rotation.y = tafkaq;
  pukaz.castShadow = true;
  hate2.add(pukaz);
}

export function tlunakMangxCax2l(
  hate2: THREE.Group,
  x: number, z: number, y: number,
  kehuPukek: THREE.MeshStandardMaterial,
  pukazPukek: THREE.Material,
  namaTlVek2fe = false
): void {
  tlunakCax2l(hate2, x, z, y, 0o16/0o10, 0o12/0o10, kehuPukek, pukazPukek);
  const cacap2baz2X2pa: [ number, number ][] = namaTlVek2fe
    ? [ [ 0o14/0o10, 0o0 ], [ -0o14/0o10, 0o0 ], [ 0o0, 0o12/0o10 ] ]
    : [ [ 0o14/0o10, 0o0 ], [ -0o14/0o10, 0o0 ], [ 0o0, 0o12/0o10 ], [ 0o0, -0o12/0o10 ] ];
  for ( const [ ox, oz ] of cacap2baz2X2pa ) {
    tlunakCacap2baz2(hate2, x + ox, z + oz, y, kehuPukek, pukazPukek, oz === 0o0 ? Math.PI / 0o2 : 0o0);
  }
}
