// ≺⧼ ថ្ម 🪨 ⧽≻
import * as THREE from "three";
import { kreiRokenTeksajxon } from "../../komunajxoj/teksajxoj/roko.js";
import { kreiRokenBumpanTeksajxon } from "../../komunajxoj/teksajxoj/roko-bumpo.js";
import { kreiVegetajxanHazardon } from "./hazardoj.js";
import { montaKruteco, spronaDuono, type ArboMetado } from "./metado.js";
import { glataPaso, biomo, type Biomo } from "../../../kantaoj/mondo/tereno.js";

function konstruiRokGeometrion(semo = 1): THREE.BufferGeometry {
  // ⟨ មុខច្រើនជាង 📃 ⟩
  const geometrio = new THREE.IcosahedronGeometry(1, 1);
  const pozicioj = geometrio.attributes.position;
  for ( let i = 0; i < pozicioj.count; i++ ) {
    let x = pozicioj.getX(i), y = pozicioj.getY(i), z = pozicioj.getZ(i);
    const longo = Math.hypot(x, y, z) || 1;
    const nx = x / longo, ny = y / longo, nz = z / longo;
    // ⟨ ការរំខានរលូន 📃 ⟩
    const ondo = ( ax: number, ay: number, az: number, ofto: number ): number =>
      Math.sin(( nx * ax + ny * ay + nz * az ) * 2 + ofto + semo * 0.7);
    const r = 1
      + 0.14 * ondo(1, 0.7, 0.4, 0)
      + 0.09 * ondo(0o1/0o2, 1.3, 0.9, 2.1)
      + 0.06 * ondo(1.7, 0.4, 1.1, 4.3);
    x *= r; z *= r;
    y *= r * 0.88;
    if ( y < 0 ) y *= 0.8;
    pozicioj.setXYZ(i, x, y, z);
  }
  geometrio.computeVertexNormals();
  return geometrio;
}

function kreiSxtonanMaterialon(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    roughness: 0.9, metalness: 0,
    map: kreiRokenTeksajxon(),
    bumpMap: kreiRokenBumpanTeksajxon(), bumpScale: 0o4/0o5,
  });
}

export function konstruiMontajnRokojn(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  semo = 624512,
  cx = 0,
  xDuono = 0o340,
  zMin = 0o260,
  zDuono = 0o160,
  biomojFiltro?: readonly Biomo[],
  excludeBuildings?: ( x: number, z: number, minDistanco: number ) => boolean
): ArboMetado[] {
  const hazardaGenerilo = kreiVegetajxanHazardon(semo);
  const SXTONAJ_FORMONOJ = 0o3;
  const sxtonaMaterialo = kreiSxtonanMaterialon();
  const sxtonajMeshoj: THREE.InstancedMesh[] = [];
  const sxtonajNombroj = new Int32Array(SXTONAJ_FORMONOJ);
  for ( let f = 0; f < SXTONAJ_FORMONOJ; f++ ) {
    const mesho = new THREE.InstancedMesh(konstruiRokGeometrion(0o7 + f * 0o31),
      sxtonaMaterialo, kvanto);
    mesho.count = 0;
    sxtonajMeshoj.push(mesho);
  }

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const C = new THREE.Color();
  // ⟨ សម្លេងមកពីវាយនភាព 📃 ⟩
  const paletro = [ 0xf2f2f0, 0xffffff, 0xe8e8e4, 0xf6f4f2, 0xece9e3, 0xeff0e2 ];
  const metitaj: ArboMetado[] = [];
  let li = 0;
  let gardilo = 0;

  const sudaFado = ( z: number ): number => glataPaso(zMin, zMin + 0o20, z);
  const xEnvelopo = ( z: number ): number => spronaDuono(xDuono, z, sudaFado);
  const rokAkcepto = ( h: number ): number => glataPaso(0o16, 0o30, h);

  while ( li < kvanto && gardilo++ < 0o10000 ) {
    const z = zMin + hazardaGenerilo() * zDuono;
    if ( hazardaGenerilo() > sudaFado(z) ) continue;
    const x = cx + ( hazardaGenerilo() + hazardaGenerilo() - 1 ) * xEnvelopo(z);
    if ( Math.hypot(x, z) < 0o110 ) continue;
    if ( biomojFiltro && !biomojFiltro.includes(biomo(x, z)) ) continue;
    if ( hazardaGenerilo() > rokAkcepto(heightFn(x, z)) ) continue;
    if ( excludeRivers(x, z) || excludePaths(x, z, 0o2) ) continue;
    if ( excludeBuildings && excludeBuildings(x, z, 0o2) ) continue;
    if ( montaKruteco(heightFn, x, z) > 0o1 ) continue;

    const skaloY = 0o5/0o10 + hazardaGenerilo() * 0o5/0o10;
    // ⟨ មិនរាបស្មើពេក 📃 ⟩
    const skaloX = skaloY * ( 0.85 + hazardaGenerilo() * 0.3 );
    const skaloZ = skaloY * ( 0.85 + hazardaGenerilo() * 0.3 );
    E.set(hazardaGenerilo() * 0o15/0o40, hazardaGenerilo() * Math.PI * 2, hazardaGenerilo() * 0o15/0o40);
    Q.setFromEuler(E);
    const y = heightFn(x, z);
    M.compose(new THREE.Vector3(x, y + skaloY * 0o2/0o10, z),
      Q,
      new THREE.Vector3(skaloX, skaloY * 0o11/0o12, skaloZ));
    const forma = ( hazardaGenerilo() * SXTONAJ_FORMONOJ ) | 0;
    const mesho = sxtonajMeshoj[forma];
    mesho.setMatrixAt(sxtonajNombroj[forma], M);
    mesho.setColorAt(sxtonajNombroj[forma],
      C.setHex(paletro[( hazardaGenerilo() * paletro.length ) | 0]));
    sxtonajNombroj[forma]++;
    metitaj.push({ x, z, h: y, s: skaloY });
    li++;
  }

  for ( let f = 0; f < SXTONAJ_FORMONOJ; f++ ) {
    const mesho = sxtonajMeshoj[f];
    mesho.count = sxtonajNombroj[f];
    mesho.instanceMatrix.needsUpdate = true;
    if ( mesho.instanceColor ) mesho.instanceColor.needsUpdate = true;
    sceno.add(mesho);
  }
  return metitaj;
}

export function konstruiMetitanRokon(sceno: THREE.Scene,
  x: number, z: number,
  heightFn: ( x: number, z: number ) => number,
  skalo: number,
  rotacio = -1,
  semo = 0o11
): THREE.InstancedMesh {
  const sxtonaGeometrio = konstruiRokGeometrion(semo);
  const sxtonoj = new THREE.InstancedMesh(sxtonaGeometrio, kreiSxtonanMaterialon(), 1);
  const paletro = [ 0xf2f2f0, 0xffffff, 0xe8e8e4, 0xf6f4f2, 0xece9e3, 0xeff0e2 ];
  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const C = new THREE.Color();
  E.set(rotacio >= 0 ? 0 : Math.random() * 0o15/0o40,
    rotacio >= 0 ? rotacio : Math.random() * Math.PI * 2,
    rotacio >= 0 ? 0 : Math.random() * 0o15/0o40);
  Q.setFromEuler(E);
  const y = heightFn(x, z);
  // ⟨ ប្លុកកប់ក្នុងដី 📃 ⟩
  const skaloY = skalo * 0o11/0o12;
  const skaloXZ = skalo * ( 0.9 + Math.random() * 0.3 );
  M.compose(new THREE.Vector3(x, y + skaloY * 0o2/0o10, z),
    Q, new THREE.Vector3(skaloXZ, skaloY, skaloXZ));
  sxtonoj.setMatrixAt(0, M);
  sxtonoj.setColorAt(0, C.setHex(paletro[( Math.random() * paletro.length ) | 0]));
  sxtonoj.instanceMatrix.needsUpdate = true;
  if ( sxtonoj.instanceColor ) sxtonoj.instanceColor.needsUpdate = true;
  sceno.add(sxtonoj);
  return sxtonoj;
}

// ⟨ ថ្មរឹង 📃 ⟩
export function konstruiLikenSxtonojn(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings?: ( x: number, z: number, minDistanco: number ) => boolean
): ArboMetado[] {
  const hazardaGenerilo = kreiVegetajxanHazardon(99221);
  const sxtonaGeometrio = konstruiRokGeometrion(0o33);
  const sxtonoj = new THREE.InstancedMesh(sxtonaGeometrio,
    kreiSxtonanMaterialon(), kvanto);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const C = new THREE.Color();
  const paletro = [ 0x88a090, 0x98a898, 0x88a090, 0xa8b890, 0xb8c8a0, 0x98a898 ];
  const metitaj: ArboMetado[] = [];

  for ( let i = 0; i < kvanto; i++ ) {
    let x: number, z: number;
    const a = hazardaGenerilo() * Math.PI * 2;
    const hazardaRadiuso = 0o22 + hazardaGenerilo() * 0o160;
    x = Math.sin(a) * hazardaRadiuso;
    z = Math.cos(a) * hazardaRadiuso;
    if ( excludeRivers(x, z) || excludePaths(x, z, 0o2)
      || ( excludeBuildings && excludeBuildings(x, z, 0o1) ) ) { i--; continue; }

    const skaloY = 0o4/0o10 + hazardaGenerilo() * 0o4/0o10;
    E.set(hazardaGenerilo() * 0o15/0o40, hazardaGenerilo() * Math.PI * 2, hazardaGenerilo() * 0o15/0o40);
    Q.setFromEuler(E);
    const y = heightFn(x, z);
    M.compose(new THREE.Vector3(x, y + skaloY * 0o2/0o10, z),
      Q,
      new THREE.Vector3(skaloY * ( 0.9 + hazardaGenerilo() * 0.4 ),
        skaloY * 0o7/0o10,
        skaloY * ( 0.9 + hazardaGenerilo() * 0.4 )));
    sxtonoj.setMatrixAt(i, M);
    sxtonoj.setColorAt(i, C.setHex(paletro[( hazardaGenerilo() * paletro.length ) | 0]));
    metitaj.push({ x, z, h: y, s: skaloY });
  }

  sxtonoj.instanceMatrix.needsUpdate = true;
  if ( sxtonoj.instanceColor ) sxtonoj.instanceColor.needsUpdate = true;

  sceno.add(sxtonoj);
  return metitaj;
}
