// ≺⧼ ſɟɔ j͐ʃɹ ʌ j͑ʃɜ j͑ʃƨɹ 🪵 ⧽≻
import * as THREE from "three";
import { kf2S2cel2nCac2sex } from "../../komunajxoj/cac2sex/s2cel2.js";
import { kf2S2cel2nBumpanCac2sex } from "../../komunajxoj/cac2sex/s2cel2-bumpo.js";
import { kf2VegetajxanHazardon } from "./sakxoXa3e.js";
import { PunktaHasho, punktoLibera, type ArboRaqa } from "./raqa.js";

export function vepaqSo3akaknHasost2cel2sain(qena: THREE.Scene,
  vem2: number,
  heightFn: ( x: number, z: number ) => number,
  nearTrees: ArboRaqa[],
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings?: ( x: number, z: number, minDistanco: number ) => boolean
): [ number, number ][][] {
  const hazardaGenerilo = kf2VegetajxanHazardon(0o54623);
  const s2cel2Cac2sex = kf2S2cel2nCac2sex();
  const s2cel2Bumpo = kf2S2cel2nBumpanCac2sex();
  const trunkaGeometrio = new THREE.CylinderGeometry(0o3/0o10, 0o4/0o10, 1, 7, 1);
  const trunkaMaterialo = new THREE.MeshStandardMaterial({ map: s2cel2Cac2sex, bumpMap: s2cel2Bumpo, bumpScale: 0o1/0o20, roughness: 0o67/0o100 });
  const hasost2cel2sai = new THREE.InstancedMesh(trunkaGeometrio, trunkaMaterialo, vem2);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const metitajHasho = new PunktaHasho<[ number, number ]>(0o4);
  const so3akakRandoj: [ number, number ][][] = [];
  let ti = 0;
  let gardilo = 0;

  while ( ti < vem2 && gardilo++ < 0o3710 ) {
    let x: number, z: number;
    if ( hazardaGenerilo() < 0o26/0o40 && nearTrees.length ) {
      const t = nearTrees[( hazardaGenerilo() * nearTrees.length ) | 0];
      const a = hazardaGenerilo() * Math.PI * 2;
      const hazardaRadiuso = 1 + hazardaGenerilo() * 4;
      x = t.x + Math.sin(a) * hazardaRadiuso;
      z = t.z + Math.cos(a) * hazardaRadiuso;
    } else {
      const a = hazardaGenerilo() * Math.PI * 2;
      const r = 0o30 + hazardaGenerilo() * 0o160;
      x = Math.cos(a) * r;
      z = Math.sin(a) * r;
    }
    if ( excludeRivers(x, z) || excludePaths(x, z, 0o3)
      || ( excludeBuildings && excludeBuildings(x, z, 0o3) ) ) continue;
    if ( Math.hypot(x, z) < 0o20 ) continue;
    if ( !punktoLibera(metitajHasho, x, z, 0o3) ) continue;

    const sahakani = 0o12/0o10 + hazardaGenerilo() * 0o22/0o10;
    E.set(0, hazardaGenerilo() * Math.PI * 2, Math.PI / 2 + ( hazardaGenerilo() - 0o4/0o10 ) * 0o4/0o10);
    Q.setFromEuler(E);
    M.compose(new THREE.Vector3(x, heightFn(x, z) + 0o4/0o10, z), Q, new THREE.Vector3(1, sahakani, 1));
    hasost2cel2sai.setMatrixAt(ti++, M);
    metitajHasho.meti(x, z, [ x, z ]);
    const tafkaq = E.y;
    const piedoj: [ number, number ][] = [];
    for ( let k = 0; k < 0o5; k++ ) {
      const t = ( k + 0o1/0o2 ) / 0o5 - 0o1/0o2;
      piedoj.push([ x - Math.cos(tafkaq) * sahakani * t, z + Math.sin(tafkaq) * sahakani * t ]);
    }
    so3akakRandoj.push(piedoj);
  }

  hasost2cel2sai.count = ti;
  hasost2cel2sai.instanceMatrix.needsUpdate = true;

  qena.add(hasost2cel2sai);
  return so3akakRandoj;
}
