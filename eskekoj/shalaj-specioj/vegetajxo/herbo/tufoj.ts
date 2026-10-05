// ≺⧼ ដុំស្មៅ 🌾 ⧽≻
import * as THREE from "three";
import { kunfandiGeometriojnSenIndekson } from "../../../komunajxoj/kunfandajxoj.js";
import { kreiVegetajxanHazardon } from "../hazardoj.js";
import { PunktaHasho, punktoLibera } from "../metado.js";
import { biomo, type Biomo } from "../../../../kantaoj/mondo/tereno.js";
import { kreiHerbanKlingon } from "./klingoj.js";
import { kreiHerbanMaterialon } from "./vento.js";

export function konstruiHerbanTufanGeometrion(semo = 0o2715): THREE.BufferGeometry {
  const hazardo = kreiVegetajxanHazardon(semo);
  const klingoj: THREE.BufferGeometry[] = [];
  const verda = new THREE.Color();
  const seka = new THREE.Color();
  const KLINGOJ = 0o34;
  for ( let i = 0; i < KLINGOJ; i++ ) {
    const ang = hazardo() * Math.PI * 2;
    const r = 0o13/0o100 * Math.sqrt(hazardo());
    const bazoX = Math.cos(ang) * r, bazoZ = Math.sin(ang) * r;
    const elen = 0o5/0o10 + r * 0o55/0o100;
    const longo = 0o33/0o100 + hazardo() * 0o23/0o40;
    const largho = ( 0o1/0o40 + hazardo() * 0o1/0o100 ) * ( 0o27/0o40 + longo * 0o15/0o40 );
    const arkaFaktoro = 0o43/0o100 + r * 0o215/0o100;
    const klino = Math.cos(ang) * elen * ( 0o13/0o40 + hazardo() * 0o25/0o40 )
      + ( hazardo() - 0o1/0o2 ) * 0o5/0o40;
    const arko = Math.sin(ang) * elen * ( 0o13/0o40 + hazardo() * 0o25/0o40 ) * arkaFaktoro
      + ( hazardo() - 0o1/0o2 ) * 0o5/0o40;
    const tordo = ( hazardo() - 0o1/0o2 ) * 0o115/0o100;
    const sekaKlingo = i % 0o4 === 0o1;
    if ( sekaKlingo ) {
      seka.setRGB(0o21/0o20, 0o33/0o40 + hazardo() * 0o1/0o10, 0o13/0o40 + hazardo() * 0o5/0o40 );
    } else {
      verda.setRGB(0o27/0o40 + hazardo() * 0o13/0o40, 0o63/0o100 + hazardo() * 0o11/0o40, 0o5/0o10 + hazardo() * 0o23/0o100);
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
  const hazardaGenerilo = kreiVegetajxanHazardon(0o126345);
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

    const skalo = 0o4/0o10 + hazardaGenerilo() * 0o6/0o10;
    E.set(( hazardaGenerilo() - 0o1/0o2 ) * 0o5/0o40,
      hazardaGenerilo() * Math.PI * 2,
      ( hazardaGenerilo() - 0o1/0o2 ) * 0o5/0o40);
    Q.setFromEuler(E);
    M.compose(new THREE.Vector3(x, heightFn(x, z), z), Q,
      new THREE.Vector3(skalo * ( 0o33/0o40 + hazardaGenerilo() * 0o23/0o100 ),
        skalo * ( 0o3/0o4 + hazardaGenerilo() * 0o43/0o100 ),
        skalo * ( 0o33/0o40 + hazardaGenerilo() * 0o23/0o100 )));
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

    const skalo = 0o4/0o10 + hazardaGenerilo() * 0o6/0o10;
    E.set(( hazardaGenerilo() - 0o1/0o2 ) * 0o5/0o40,
      hazardaGenerilo() * Math.PI * 2,
      ( hazardaGenerilo() - 0o1/0o2 ) * 0o5/0o40);
    Q.setFromEuler(E);
    M.compose(new THREE.Vector3(x, heightFn(x, z), z), Q,
      new THREE.Vector3(skalo * ( 0o33/0o40 + hazardaGenerilo() * 0o23/0o100 ),
        skalo * ( 0o3/0o4 + hazardaGenerilo() * 0o43/0o100 ),
        skalo * ( 0o33/0o40 + hazardaGenerilo() * 0o23/0o100 )));
    herboj.setMatrixAt(hi++, M);
    metitajHasho.meti(x, z, [ x, z ]);
  }

  herboj.count = hi;
  herboj.instanceMatrix.needsUpdate = true;
  sceno.add(herboj);
}
