// ≺⧼ ហ្វីលីកា 🌱 ⧽≻
import * as THREE from "three";
import { kreiFilikanTeksajxon } from "../../komunajxoj/teksajxoj/filiko.js";
import { kreiPurpuranFrondanTeksajxon } from "../../komunajxoj/teksajxoj/purpura-frondo.js";
import { kreiVegetajxanHazardon } from "./hazardoj.js";
import { konstruiFilikanRozeton, konstruiFrondanKronon, konstruiPurpuranRozeton } from "./frondoj.js";
import { PunktaHasho, punktoLibera, kreiGrovojn, hazardaGrovaLoko, type ArboMetado } from "./metado.js";
import { biomo, type Biomo } from "../../../kantaoj/mondo/tereno.js";

export function konstruiFilikojn(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  nearTrees: ArboMetado[],
  vojSpecimenoj: THREE.Vector3[],
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  biomojFiltro?: readonly Biomo[]
): void {
  const hazardaGenerilo = kreiVegetajxanHazardon(55661);
  const filikaTeksajxo = kreiFilikanTeksajxon();

  // ⟨ ហ្វីលីកាបីវិមាត្រ 📃 ⟩
  // ⟨ សមាមាត្រ 📃 ⟩
  const filikaGeometrio = konstruiFrondanKronon(0o11, 0.32, 1.05, 0.20, 0.012, 0.62);
  const filikaMaterialo = new THREE.MeshStandardMaterial({ map: filikaTeksajxo, alphaTest: 0o15/0o50, side: THREE.DoubleSide, roughness: 1 });
  const filikoj = new THREE.InstancedMesh(filikaGeometrio, filikaMaterialo, kvanto);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const metitajHasho = new PunktaHasho<[ number, number ]>(0o4);
  let fi = 0;
  let gardilo = 0;
  const filikaGrovoj = kreiGrovojn(Math.max(0o4, Math.floor(kvanto / 0o20)), 0o600, hazardaGenerilo, excludeRivers);

  while ( fi < kvanto && gardilo++ < 0o5660 ) {
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
      const loko = hazardaGrovaLoko(hazardaGenerilo, filikaGrovoj);
      x = loko.x;
      z = loko.z;
    }

    if ( biomojFiltro && !biomojFiltro.includes(biomo(x, z)) ) continue;
    if ( excludeRivers(x, z) || excludePaths(x, z, 2) || Math.hypot(x, z) < 0o16 ) continue;
    if ( !punktoLibera(metitajHasho, x, z, 0o2) ) continue;

    const skalo = 0o55/0o100 + hazardaGenerilo() * 0o63/0o100;
    E.set(( hazardaGenerilo() - 0o5/0o10 ) * 0o2/0o10, hazardaGenerilo() * Math.PI * 2,
      ( hazardaGenerilo() - 0o5/0o10 ) * 0o2/0o10);
    Q.setFromEuler(E);
    M.compose(new THREE.Vector3(x, heightFn(x, z), z), Q, new THREE.Vector3(skalo, skalo, skalo));
    filikoj.setMatrixAt(fi++, M);
    metitajHasho.meti(x, z, [ x, z ]);
  }

  filikoj.count = fi;
  filikoj.instanceMatrix.needsUpdate = true;
  sceno.add(filikoj);
}

// ⟨ បីវិមាត្រ 📃 ⟩
export function konstruiMetitanFilikon(sceno: THREE.Scene,
  x: number, z: number,
  heightFn: ( x: number, z: number ) => number,
  skalo: number,
  filikaSpeco = 0
): THREE.InstancedMesh {
  const filikaTeksajxo = filikaSpeco === 1 ? kreiPurpuranFrondanTeksajxon(true) : kreiFilikanTeksajxon();
  const filikaGeometrio = filikaSpeco === 1
    ? konstruiPurpuranRozeton(1.35, 0o13, 0.30, true)
    : konstruiFilikanRozeton(1.30, 0o11, 0.20);
  const filikaMaterialo = new THREE.MeshStandardMaterial({ map: filikaTeksajxo, alphaTest: 0o15/0o50, side: THREE.DoubleSide, roughness: 1 });
  const filikoj = new THREE.InstancedMesh(filikaGeometrio, filikaMaterialo, 1);
  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  E.set(0, Math.random() * Math.PI * 2, 0);
  Q.setFromEuler(E);
  M.compose(new THREE.Vector3(x, heightFn(x, z), z), Q, new THREE.Vector3(skalo, skalo, skalo));
  filikoj.setMatrixAt(0, M);
  filikoj.count = 1;
  filikoj.instanceMatrix.needsUpdate = true;
  sceno.add(filikoj);
  return filikoj;
}
