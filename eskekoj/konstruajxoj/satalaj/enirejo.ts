// ≺⧼ ច្រកចូល 🚪 ⧽≻
import * as THREE from "three";
import { MURA_KLINO, rondigitaTrapezaFormo } from "./formoj.js";

// ⟨ ហេតុអ្វី 📃 ⟩
export function kreiKadranKurbon(formo: THREE.Path, z: number,
  sampoj = 0o20): THREE.CurvePath<THREE.Vector3> {
  const putho = new THREE.CurvePath<THREE.Vector3>();
  const punktoj: THREE.Vector3[] = [];
  for ( const kurbo of formo.curves ) {
    const partoj = kurbo.getPoints(sampoj);
    for ( let i = 0; i < partoj.length; i++ ) {
      if ( i === 0 && punktoj.length > 0 ) continue;
      punktoj.push(new THREE.Vector3(partoj[i].x, partoj[i].y, z));
    }
  }
  if ( punktoj.length > 1 && punktoj[0].distanceTo(punktoj[punktoj.length - 1]) < 1e-6 ) punktoj.pop();
  for ( let i = 0; i < punktoj.length - 1; i++ ) putho.add(new THREE.LineCurve3(punktoj[i], punktoj[i + 1]));
  return putho;
}

export function aldoniEnirejon(group: THREE.Group, d: number, kadraMaterialo: THREE.MeshStandardMaterial, eniraMaterialo: THREE.MeshStandardMaterial, flankoj = 1, tieroAlto = 0, nagetoj = false): void {
  const pordGrupo = new THREE.Group();
  const blokoLargho = 0o233/0o100, tw = blokoLargho * 0o45/0o100, eh = 0o11/0o4;
  // ⟨ ស៊ុមស៊ីមេទ្រី 📃 ⟩
  const shape = rondigitaTrapezaFormo(blokoLargho, tw, eh, 0o1/0o4, 0o1/0o4);
  // ⟨ ទ្វារស្តើង 📃 ⟩
  // ⟨ ឥឡូវវែងជាងទៅមុខ 📃 ⟩
  // ⟨ ហេតុអ្វីមិន 0o3/0o40 📃 ⟩
  const pordDikeco = 0o7/0o100, pordBevelo = 0o1/0o40;
  const pordDikecoTuta = pordDikeco + pordBevelo * 2;
  const klinGrupo = new THREE.Group();
  klinGrupo.position.set(0, 0, d / 2);
  pordGrupo.add(klinGrupo);
  const enirejo = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: pordDikeco, bevelEnabled: true, bevelSize: pordBevelo, bevelThickness: pordBevelo, bevelSegments: 2, curveSegments: 0o20 }), eniraMaterialo);
  const pordZ = -0o1/0o100;
  enirejo.position.set(0, 0, pordZ); klinGrupo.add(enirejo);
  // ⟨ ស៊ុមគ្របទ្វារទាំងមូល 📃 ⟩
  const kadraKurbo = kreiKadranKurbon(shape, pordZ + pordDikeco / 2);
  klinGrupo.add(new THREE.Mesh(new THREE.TubeGeometry(kadraKurbo, 0o200, pordDikecoTuta / 2, 0o14, true), kadraMaterialo));
  // ⟨ ទ្វារផ្អៀងតាមជញ្ជាំង 📃 ⟩
  if ( tieroAlto > 0 ) klinGrupo.rotation.x = -Math.atan(MURA_KLINO / tieroAlto);
  // ⟨ ព្រុយនៃអគារកណ្តាល 📃 ⟩
  if ( nagetoj ) {
    // ⟨ ព្រុយជាស្លាបតូចទៅមុខ 📃 ⟩
    // ⟨ ហេតុអ្វីប្លង់មិនមែនប្លង់បញ្ឈរធម្មតា 📃 ⟩
    const bazaX = blokoLargho / 2;
    const supraX = tw / 2;
    const nagetaDikeco = 0o1/0o20;
    // ⟨ មូលដ្ឋានព្រុយនៅលើចានមូលដ្ឋាន 📃 ⟩
    const nagetaProfundo = 0o3/0o10;
    const zMebl = pordZ + pordDikeco / 2;
    for ( const sX of [ -1, 1 ] ) {
      const malsupra = new THREE.Vector3(sX * bazaX, 0, zMebl);
      const supra = new THREE.Vector3(sX * supraX, eh, zMebl);
      const lauxFlanko = supra.clone().sub(malsupra);
      const longo = lauxFlanko.length();
      const unuo = lauxFlanko.clone().divideScalar(longo);
      const antauxen = new THREE.Vector3(0, 0, 1);
      const normalo = new THREE.Vector3().crossVectors(unuo, antauxen).normalize();
      const triangulo = new THREE.Shape();
      triangulo.moveTo(0, 0);
      triangulo.lineTo(longo, 0);
      triangulo.lineTo(0, nagetaProfundo);
      triangulo.closePath();
      const geometrio = new THREE.ExtrudeGeometry(triangulo, { depth: nagetaDikeco, bevelEnabled: false });
      const matrico = new THREE.Matrix4().makeBasis(unuo, antauxen, normalo);
      matrico.setPosition(malsupra.clone().addScaledVector(normalo, -nagetaDikeco / 2));
      geometrio.applyMatrix4(matrico);
      klinGrupo.add(new THREE.Mesh(geometrio, kadraMaterialo));
    }
  }
  for ( let i = 0; i < flankoj; i++ ) {
    const kopio = i === 0 ? pordGrupo : pordGrupo.clone();
    kopio.rotation.y = i * Math.PI / 2;
    group.add(kopio);
  }
}
