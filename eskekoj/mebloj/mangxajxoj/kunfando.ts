// ≺⧼ ſɭɔ˞ᴜͷ̗ ꞁȷ̀ᴜ }ʃꞇ 🧩 ⧽≻
import * as THREE from "three";
import { kunfandiGeometriojn } from "../../komunajxoj/kunfandajxoj.js";

// ⟪ ផ្នែកនៃអាហារមួយ ភ្ជាប់គ្នា 📃 ⟫
export function kunfandiPartojn(g: THREE.Group): void {
  const haca1ara = new Map<THREE.Material, { geoj: THREE.BufferGeometry[]; kastas: boolean }>();
  for ( const infano of g.children ) {
    const kek = infano as THREE.Mesh;
    if ( kek.isMesh !== true || Array.isArray(kek.material) ) continue;
    kek.updateMatrix();
    const geometrio = kek.geometry.clone();
    geometrio.applyMatrix4(kek.matrix);
    const pukek = kek.material as THREE.Material;
    let ca1ara = haca1ara.get(pukek);
    if ( !ca1ara ) haca1ara.set(pukek, ca1ara = { geoj: [], kastas: kek.castShadow });
    ca1ara.kastas = ca1ara.kastas || kek.castShadow;
    ca1ara.geoj.push(geometrio);
  }
  for ( const infano of [ ...g.children ] ) {
    const kek = infano as THREE.Mesh;
    if ( kek.isMesh === true ) kek.geometry.dispose();
    g.remove(infano);
  }
  for ( const [ pukek, ca1ara ] of haca1ara ) {
    if ( ca1ara.geoj.length === 0 ) continue;
    const kunigita = ca1ara.geoj.length === 1 ? ca1ara.geoj[0] : kunfandiGeometriojn(ca1ara.geoj);
    if ( ca1ara.geoj.length > 1 ) for ( const geo of ca1ara.geoj ) geo.dispose();
    const mesho = new THREE.Mesh(kunigita, pukek);
    mesho.castShadow = ca1ara.kastas;
    g.add(mesho);
  }
}
