// ≺⧼ ការរលាយផ្នែកអាហារ 🧩 ⧽≻
import * as THREE from "three";
import { kunfandiGeometriojn } from "../../komunajxoj/kunfandajxoj.js";

// ⟪ ផ្នែកនៃអាហារមួយ ភ្ជាប់គ្នា 📃 ⟫
export function kunfandiPartojn(g: THREE.Group): void {
  const listoj = new Map<THREE.Material, { geoj: THREE.BufferGeometry[]; kastas: boolean }>();
  for ( const infano of g.children ) {
    const parto = infano as THREE.Mesh;
    if ( parto.isMesh !== true || Array.isArray(parto.material) ) continue;
    parto.updateMatrix();
    const geometrio = parto.geometry.clone();
    geometrio.applyMatrix4(parto.matrix);
    const materialo = parto.material as THREE.Material;
    let listo = listoj.get(materialo);
    if ( !listo ) listoj.set(materialo, listo = { geoj: [], kastas: parto.castShadow });
    listo.kastas = listo.kastas || parto.castShadow;
    listo.geoj.push(geometrio);
  }
  for ( const infano of [ ...g.children ] ) {
    const parto = infano as THREE.Mesh;
    if ( parto.isMesh === true ) parto.geometry.dispose();
    g.remove(infano);
  }
  for ( const [ materialo, listo ] of listoj ) {
    if ( listo.geoj.length === 0 ) continue;
    const kunigita = listo.geoj.length === 1 ? listo.geoj[0] : kunfandiGeometriojn(listo.geoj);
    if ( listo.geoj.length > 1 ) for ( const geo of listo.geoj ) geo.dispose();
    const mesho = new THREE.Mesh(kunigita, materialo);
    mesho.castShadow = listo.kastas;
    g.add(mesho);
  }
}
