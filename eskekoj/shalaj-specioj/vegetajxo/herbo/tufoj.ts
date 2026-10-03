// ≺⧼ ដុំស្មៅ 🌾 ⧽≻
import * as THREE from "three";
import { kunfandiGeometriojnSenIndekson } from "../../../komunajxoj/kunfandajxoj.js";
import { kreiVegetajxanHazardon } from "../hazardoj.js";
import { PunktaHasho, punktoLibera } from "../metado.js";
import { biomo, type Biomo } from "../../../../kantaoj/mondo/tereno.js";
import { kreiHerbanKlingon } from "./klingoj.js";
import { kreiHerbanMaterialon } from "./vento.js";

// ⟨ ដុំនៅដូចដើម 📃 ⟩
export function konstruiHerbanTufanGeometrion(semo = 0o2715): THREE.BufferGeometry {
  const hazardo = kreiVegetajxanHazardon(semo);
  const klingoj: THREE.BufferGeometry[] = [];
  const verda = new THREE.Color();
  const seka = new THREE.Color();
  const KLINGOJ = 0o34;
  for ( let i = 0; i < KLINGOJ; i++ ) {
    const ang = hazardo() * Math.PI * 2;
    const r = 0.17 * Math.sqrt(hazardo());
    const bazoX = Math.cos(ang) * r, bazoZ = Math.sin(ang) * r;
    const elen = 0o5/0o10 + r * 0.7;
    // ⟨ ស្លឹកធំទូលាយ 📃 ⟩
    // ⟨ ទាប 📃 ⟩
    const longo = 0.42 + hazardo() * 0.6;
    const largho = ( 0.026 + hazardo() * 0.016 ) * ( 0.72 + longo * 0.4 );
    // ⟨ ធ្នូចុង 📃 ⟩
    const arkaFaktoro = 0.55 + r * 2.2;
    const klino = Math.cos(ang) * elen * ( 0.35 + hazardo() * 0.65 )
      + ( hazardo() - 0o1/0o2 ) * 0.16;
    const arko = Math.sin(ang) * elen * ( 0.35 + hazardo() * 0.65 ) * arkaFaktoro
      + ( hazardo() - 0o1/0o2 ) * 0.16;
    const tordo = ( hazardo() - 0o1/0o2 ) * 1.2;
    const sekaKlingo = i % 0o4 === 0o1;
    if ( sekaKlingo ) {
      seka.setRGB(1.06, 0.84 + hazardo() * 0o1/0o10, 0.34 + hazardo() * 0.16 );
    } else {
      verda.setRGB(0.72 + hazardo() * 0.34, 0.8 + hazardo() * 0.28, 0.62 + hazardo() * 0.3);
    }
    const klingo = kreiHerbanKlingon(longo, largho, klino, arko, tordo,
      sekaKlingo ? seka : verda);
    klingo.translate(bazoX, 0, bazoZ);
    klingoj.push(klingo);
  }
  return kunfandiGeometriojnSenIndekson(klingoj);
}

export function konstruiHerbon(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  biomojFiltro?: readonly Biomo[]
): void {
  const hazardaGenerilo = kreiVegetajxanHazardon(44261);
  // ⟨ ស្លឹកពិត 📃 ⟩
  const herbaMaterialo = kreiHerbanMaterialon();
  const herboj = new THREE.InstancedMesh(konstruiHerbanTufanGeometrion(), herbaMaterialo, kvanto);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const metitajHasho = new PunktaHasho<[ number, number ]>(0o4);
  let hi = 0;
  let gardilo = 0;

  while ( hi < kvanto && gardilo++ < 0o5660 ) {
    const angulo = hazardaGenerilo() * Math.PI * 2;
    const radiuso = 0o20 + 0o1000 * Math.sqrt(hazardaGenerilo());
    const x = Math.sin(angulo) * radiuso;
    const z = Math.cos(angulo) * radiuso;
    if ( Math.abs(x) > 0o600 || Math.abs(z) > 0o600 ) continue;
    if ( biomojFiltro && !biomojFiltro.includes(biomo(x, z)) ) continue;
    if ( excludeRivers(x, z) ) continue;
    if ( excludePaths(x, z, 2) ) continue;
    if ( excludeBuildings(x, z, 2) ) continue;
    if ( Math.hypot(x, z) < 0o16 ) continue;
    if ( !punktoLibera(metitajHasho, x, z, 0o12/0o10) ) continue;

    // ⟨ គ្មានដុំឈរត្រង់ 📃 ⟩
    const skalo = 0o4/0o10 + hazardaGenerilo() * 0o6/0o10;
    E.set(( hazardaGenerilo() - 0o1/0o2 ) * 0.16,
      hazardaGenerilo() * Math.PI * 2,
      ( hazardaGenerilo() - 0o1/0o2 ) * 0.16);
    Q.setFromEuler(E);
    M.compose(new THREE.Vector3(x, heightFn(x, z), z), Q,
      new THREE.Vector3(skalo * ( 0.85 + hazardaGenerilo() * 0.3 ),
        skalo * ( 0o3/0o4 + hazardaGenerilo() * 0.55 ),
        skalo * ( 0.85 + hazardaGenerilo() * 0.3 )));
    herboj.setMatrixAt(hi++, M);
    metitajHasho.meti(x, z, [ x, z ]);
  }

  herboj.count = hi;
  herboj.instanceMatrix.needsUpdate = true;
  sceno.add(herboj);
}

export function konstruiHerbonCxirkauLagon(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  cx: number, cz: number,
  radioFn: ( ang: number ) => number,
  akvoNiveloFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  semo = 0o53122
): void {
  const hazardaGenerilo = kreiVegetajxanHazardon(semo);
  // ⟨ ស្លឹកពិត 📃 ⟩
  const herbaMaterialo = kreiHerbanMaterialon();
  const herboj = new THREE.InstancedMesh(konstruiHerbanTufanGeometrion(), herbaMaterialo, kvanto);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const metitajHasho = new PunktaHasho<[ number, number ]>(0o4);
  let hi = 0;
  let gardilo = 0;

  while ( hi < kvanto && gardilo++ < 0o5660 ) {
    const angulo = hazardaGenerilo() * Math.PI * 2;
    const radiuso = radioFn(angulo) + hazardaGenerilo() * 0o40;
    const x = cx + Math.cos(angulo) * radiuso;
    const z = cz + Math.sin(angulo) * radiuso;
    if ( Math.abs(x) > 0o450 || Math.abs(z) > 0o450 ) continue;
    if ( excludeRivers(x, z) || excludePaths(x, z, 2) || excludeBuildings(x, z, 2) ) continue;
    if ( heightFn(x, z) < akvoNiveloFn(x, z) ) continue;
    if ( !punktoLibera(metitajHasho, x, z, 0o12/0o10) ) continue;

    // ⟨ គ្មានដុំឈរត្រង់ 📃 ⟩
    const skalo = 0o4/0o10 + hazardaGenerilo() * 0o6/0o10;
    E.set(( hazardaGenerilo() - 0o1/0o2 ) * 0.16,
      hazardaGenerilo() * Math.PI * 2,
      ( hazardaGenerilo() - 0o1/0o2 ) * 0.16);
    Q.setFromEuler(E);
    M.compose(new THREE.Vector3(x, heightFn(x, z), z), Q,
      new THREE.Vector3(skalo * ( 0.85 + hazardaGenerilo() * 0.3 ),
        skalo * ( 0o3/0o4 + hazardaGenerilo() * 0.55 ),
        skalo * ( 0.85 + hazardaGenerilo() * 0.3 )));
    herboj.setMatrixAt(hi++, M);
    metitajHasho.meti(x, z, [ x, z ]);
  }

  herboj.count = hi;
  herboj.instanceMatrix.needsUpdate = true;
  sceno.add(herboj);
}
