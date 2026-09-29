// ≺⧼ La kunfando de la manĝaĵaj partoj 🧩 ⧽≻
// La bakado de ĉiuj partoj de unu manĝaĵo en unu geometrion po materialo
// ( kunfandiPartojn ).
import * as THREE from "three";
import { kunfandiGeometriojn } from "../../komunajxoj/kunfandajxoj.js";

// ⟪ La partoj de unu manĝaĵo, kunigitaj 📃 ⟫ — unu bulko aŭ glaso konsistas el
// dek ĝis dek-kvin etaj meshoj ( la karno, la faldoj, la korbo, la rimo, la oraj
// stangoj; la vitro, la likvaĵo, la surfaco, la menisko, la citrono, la mento,
// la subteno ). En plena mangxejo ( kvar tabloj, ok manĝaĵoj ) tio estas pli ol
// cent desegnaj alvokoj por nur manĝaĵoj — kaj ili NE povas iri tra la monda
// kunfando ( urbo.ts ), ĉar ĉiu el ili malaperas UNUOPE kiam la ludanto manĝas
// ĝin. Ĉi tiu helpilo bakas ĉiun parton en unu geometrion PO MATERIALO ( la
// loka transformo aplikiĝas dum la bakado ), do la grupo de unu manĝaĵo portas
// tri-kvin meshojn anstataŭ dek-kvin.
//     @param g ( THREE.Group ) - La grupo de la manĝaĵo ( la partoj rekte en ĝi ).
export function kunfandiPartojn(g: THREE.Group): void {
  const listoj = new Map<THREE.Material, { geoj: THREE.BufferGeometry[]; kastas: boolean }>();
  for ( const infano of g.children ) {
    const parto = infano as THREE.Mesh;
    if ( parto.isMesh !== true || Array.isArray(parto.material) ) continue;
    // La loka matrico de la parto — la grupo mem ricevas sian transformon
    // poste de la alvokanto, do ni bakas nur la lokan pozicion/rotacion/skalon.
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
