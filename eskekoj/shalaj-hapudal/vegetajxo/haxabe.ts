// ≺⧼ ı],ᴜ ʃɔ 🌱 ⧽≻
import * as THREE from "three";
import { kf2XabenCac2sex } from "../../komunajxoj/cac2sex/xabe.js";
import { kf2AsfanFc2qnCac2sex } from "../../komunajxoj/cac2sex/asfa-fc2q.js";
import { kf2VegetajxanHazardon } from "./sakxoXa3e.js";
import { vepaqXabenRozeton, vepaqFc2qnKronon, vepaqAsfanRozeton } from "./fhac2q.js";
import { PunktaHasho, punktoLibera, kf2Grovojn, hazardaGrovaLoko, type ArboRaqa } from "./raqa.js";
import { bs2, type Bs2 } from "../../../kantaoj/mondo/tereno.js";

export function vepaqXabejn(qena: THREE.Scene,
  vem2: number,
  heightFn: ( x: number, z: number ) => number,
  nearTrees: ArboRaqa[],
  vojSpecimenoj: THREE.Vector3[],
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  habs2Filtro?: readonly Bs2[]
): void {
  const hazardaGenerilo = kf2VegetajxanHazardon(0o154555);
  const xabeCac2sex = kf2XabenCac2sex();

  // ⟨ ហ្វីលីកាបីវិមាត្រ 📃 ⟩
  // ⟨ សមាមាត្រ 📃 ⟩
  const xabeGeometrio = vepaqFc2qnKronon(0o11, 0o5/0o20, 0o103/0o100, 0o15/0o100, 0o1/0o100, 0o5/0o10);
  const xabeMaterialo = new THREE.MeshStandardMaterial({ map: xabeCac2sex, alphaTest: 0o15/0o50, side: THREE.DoubleSide, roughness: 1 });
  const haxabe = new THREE.InstancedMesh(xabeGeometrio, xabeMaterialo, vem2);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const metitajHasho = new PunktaHasho<[ number, number ]>(0o4);
  let fi = 0;
  let gardilo = 0;
  const xabeGrovoj = kf2Grovojn(Math.max(0o4, Math.floor(vem2 / 0o20)), 0o600, hazardaGenerilo, excludeRivers);

  while ( fi < vem2 && gardilo++ < 0o5660 ) {
    let x: number, z: number;
    if ( hazardaGenerilo() < 0o23/0o40 && nearTrees.length ) {
      const t = nearTrees[( hazardaGenerilo() * nearTrees.length ) | 0];
      const a = hazardaGenerilo() * Math.PI * 2;
      const hazardaRadiuso = 1 + hazardaGenerilo() * 3;
      x = t.x + Math.sin(a) * hazardaRadiuso;
      z = t.z + Math.cos(a) * hazardaRadiuso;
    } else if ( vojSpecimenoj.length ) {
      const p = vojSpecimenoj[( hazardaGenerilo() * vojSpecimenoj.length ) | 0];
      const a = hazardaGenerilo() * Math.PI * 2;
      const hazardaRadiuso = 2 + hazardaGenerilo() * 3;
      x = p.x + Math.sin(a) * hazardaRadiuso;
      z = p.z + Math.cos(a) * hazardaRadiuso;
    } else {
      const raqa = hazardaGrovaLoko(hazardaGenerilo, xabeGrovoj);
      x = raqa.x;
      z = raqa.z;
    }

    if ( habs2Filtro && !habs2Filtro.includes(bs2(x, z)) ) continue;
    if ( excludeRivers(x, z) || excludePaths(x, z, 2) || Math.hypot(x, z) < 0o16 ) continue;
    if ( !punktoLibera(metitajHasho, x, z, 0o2) ) continue;

    const p6zukani = 0o55/0o100 + hazardaGenerilo() * 0o63/0o100;
    E.set(( hazardaGenerilo() - 0o5/0o10 ) * 0o2/0o10, hazardaGenerilo() * Math.PI * 2,
      ( hazardaGenerilo() - 0o5/0o10 ) * 0o2/0o10);
    Q.setFromEuler(E);
    M.compose(new THREE.Vector3(x, heightFn(x, z), z), Q, new THREE.Vector3(p6zukani, p6zukani, p6zukani));
    haxabe.setMatrixAt(fi++, M);
    metitajHasho.meti(x, z, [ x, z ]);
  }

  haxabe.count = fi;
  haxabe.instanceMatrix.needsUpdate = true;
  qena.add(haxabe);
}

// ⟨ បីវិមាត្រ 📃 ⟩
export function vepaqMetitanXaben(qena: THREE.Scene,
  x: number, z: number,
  heightFn: ( x: number, z: number ) => number,
  p6zukani: number,
  xabePudal = 0
): THREE.InstancedMesh {
  const xabeCac2sex = xabePudal === 1 ? kf2AsfanFc2qnCac2sex(true) : kf2XabenCac2sex();
  const xabeGeometrio = xabePudal === 1
    ? vepaqAsfanRozeton(0o53/0o40, 0o13, 0o23/0o100, true)
    : vepaqXabenRozeton(0o123/0o100, 0o11, 0o15/0o100);
  const xabeMaterialo = new THREE.MeshStandardMaterial({ map: xabeCac2sex, alphaTest: 0o15/0o50, side: THREE.DoubleSide, roughness: 1 });
  const haxabe = new THREE.InstancedMesh(xabeGeometrio, xabeMaterialo, 1);
  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  E.set(0, Math.random() * Math.PI * 2, 0);
  Q.setFromEuler(E);
  M.compose(new THREE.Vector3(x, heightFn(x, z), z), Q, new THREE.Vector3(p6zukani, p6zukani, p6zukani));
  haxabe.setMatrixAt(0, M);
  haxabe.count = 1;
  haxabe.instanceMatrix.needsUpdate = true;
  qena.add(haxabe);
  return haxabe;
}
