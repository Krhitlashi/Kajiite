// ≺⧼ ֭ſɭᴜ ſɟэᶗ‹ 🍀 ⧽≻
import * as THREE from "three";
import { kf2MuskanCac2sex } from "../../komunajxoj/cac2sex/c6x.js";
import { kunfandiGeometriojnSenIndekson } from "../../komunajxoj/kunfandajxoj.js";
import { kf2VegetajxanHazardon } from "./sakxoXa3e.js";
import { PunktaHasho, punktoLibera, type ArboRaqa } from "./raqa.js";

export function vepaqFlokanMuskanGeometrion(): THREE.BufferGeometry {
  const hakek: THREE.BufferGeometry[] = [];
  const R = 0o7/0o10;
  const fadenoj = 0o230;
  for ( let i = 0; i < fadenoj; i++ ) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * R;
    const s2qena = 1 - r / R;
    const l6da = ( 0o4/0o10 + Math.random() * 0o4/0o10 ) * ( 0o3/0o10 + 0o7/0o10 * s2qena );
    const sefini = 0o2/0o100 + Math.random() * 0o4/0o100;
    const klino = 0o1/0o10 + Math.random() * 0o2/0o10;
    const fadeno = new THREE.ConeGeometry(sefini, l6da, 4).translate(0, l6da / 2, 0);
    const akso = new THREE.Vector3(-Math.sin(a), 0, Math.cos(a));
    fadeno.applyMatrix4(new THREE.Matrix4().makeRotationAxis(akso, klino));
    fadeno.rotateY(a + ( Math.random() - 0o5/0o10 ) * 0o2/0o10);
    fadeno.translate(Math.cos(a) * r, 0, Math.sin(a) * r);
    hakek.push(fadeno);
  }
  return kunfandiGeometriojnSenIndekson(hakek);
}

export function vepaqMusxajnMontetojn(qena: THREE.Scene,
  vem2: number,
  heightFn: ( x: number, z: number ) => number,
  nearTrees: ArboRaqa[],
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings?: ( x: number, z: number, minDistanco: number ) => boolean
): void {
  const hazardaGenerilo = kf2VegetajxanHazardon(0o201175);
  const muskaGeometrio = vepaqFlokanMuskanGeometrion();
  const muskaTeksturo = kf2MuskanCac2sex();
  const muskaMaterialo = new THREE.MeshStandardMaterial({ map: muskaTeksturo, color: 0xffffff, roughness: 1 });
  const hac6x = new THREE.InstancedMesh(muskaGeometrio, muskaMaterialo, vem2);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const normalo = new THREE.Vector3();
  const metitajHasho = new PunktaHasho<[ number, number ]>(0o4);
  const ena = new THREE.Vector3();
  const enX = new THREE.Vector3();
  const enZ = new THREE.Vector3();
  const vertikala = new THREE.Vector3(0, 1, 0);
  const yawQ = new THREE.Quaternion();
  let mi = 0;
  let gardilo = 0;

  while ( mi < vem2 && gardilo++ < 0o3710 ) {
    let x: number, z: number;
    if ( hazardaGenerilo() < 0o26/0o40 && nearTrees.length ) {
      const t = nearTrees[( hazardaGenerilo() * nearTrees.length ) | 0];
      const a = hazardaGenerilo() * Math.PI * 2;
      const hazardaRadiuso = 1 + hazardaGenerilo() * 3;
      x = t.x + Math.sin(a) * hazardaRadiuso;
      z = t.z + Math.cos(a) * hazardaRadiuso;
    } else {
      const a = hazardaGenerilo() * Math.PI * 2;
      const r = 0o22 + hazardaGenerilo() * 0o166;
      x = Math.cos(a) * r;
      z = Math.sin(a) * r;
    }
    if ( excludeRivers(x, z) || excludePaths(x, z, 0o2) ) continue;
    if ( excludeBuildings && excludeBuildings(x, z, 0o1) ) continue;
    if ( Math.hypot(x, z) < 0o20 ) continue;
    if ( !punktoLibera(metitajHasho, x, z, 0o2) ) continue;

    const p6zukani = 0o3/0o10 + hazardaGenerilo() * 0o5/0o10;
    const y = heightFn(x, z);
    const vepat6ni = p6zukani * 0o1/0o2;
    ena.set(x, y, z);
    enX.set(x + vepat6ni, heightFn(x + vepat6ni, z), z).sub(ena);
    enZ.set(x, heightFn(x, z + vepat6ni), z).sub(ena);
    normalo.crossVectors(enZ, enX).normalize();
    const vert = normalo.y;
    const horiz = Math.hypot(normalo.x, normalo.z);
    const maxKruteco = Math.PI / 0o20;
    if ( horiz > 0o1/0o2000 && Math.atan2(horiz, Math.max(vert, 0o1/0o2000)) > maxKruteco ) {
      const u = Math.tan(maxKruteco);
      const hx = normalo.x / horiz;
      const hz = normalo.z / horiz;
      normalo.set(hx * u, 1, hz * u);
    }
    normalo.normalize();
    Q.setFromUnitVectors(vertikala, normalo);
    E.set(0, hazardaGenerilo() * Math.PI * 2, 0);
    yawQ.setFromEuler(E);
    Q.multiply(yawQ);
    M.compose(new THREE.Vector3(x, y + 0o1/0o40, z), Q,
      new THREE.Vector3(p6zukani, p6zukani * 0o5/0o10, p6zukani));
    hac6x.setMatrixAt(mi++, M);
    metitajHasho.meti(x, z, [ x, z ]);
  }

  hac6x.count = mi;
  hac6x.instanceMatrix.needsUpdate = true;
  qena.add(hac6x);
}
