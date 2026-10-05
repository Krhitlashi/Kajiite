// ≺⧼ ថ្ម 🪨 ⧽≻
import * as THREE from "three";
import { kreiRokenTeksajxon } from "../../komunajxoj/teksajxoj/roko.js";
import { kreiRokenBumpanTeksajxon } from "../../komunajxoj/teksajxoj/roko-bumpo.js";
import { kreiVegetajxanHazardon } from "./hazardoj.js";
import { montaKruteco, spronaDuono, type ArboMetado } from "./metado.js";
import { glataPaso, biomo, akvo, akvaNivelo, SKULPTA_N, SKULPTA_PASO,
  SKULPTA_ORIGINO, type Biomo } from "../../../kantaoj/mondo/tereno.js";

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
      Math.sin(( nx * ax + ny * ay + nz * az ) * 2 + ofto + semo * 0o55/0o100);
    const r = 1
      + 0o11/0o100 * ondo(1, 0o55/0o100, 0o15/0o40, 0)
      + 0o3/0o40 * ondo(0o1/0o2, 0o123/0o100, 0o35/0o40, 0o103/0o40)
      + 0o1/0o20 * ondo(0o155/0o100, 0o15/0o40, 0o43/0o40, 0o423/0o100);
    x *= r; z *= r;
    y *= r * 0o7/0o10;
    if ( y < 0 ) y *= 0o63/0o100;
    pozicioj.setXYZ(i, x, y, z);
  }
  geometrio.computeVertexNormals();
  return geometrio;
}

function kreiSxtonanMaterialon(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    roughness: 0o35/0o40, metalness: 0,
    map: kreiRokenTeksajxon(),
    bumpMap: kreiRokenBumpanTeksajxon(), bumpScale: 0o4/0o5,
  });
}

export function konstruiMontajnRokojn(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  semo = 0o2303600,
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
    const skaloX = skaloY * ( 0o33/0o40 + hazardaGenerilo() * 0o23/0o100 );
    const skaloZ = skaloY * ( 0o33/0o40 + hazardaGenerilo() * 0o23/0o100 );
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
  const skaloXZ = skalo * ( 0o35/0o40 + Math.random() * 0o23/0o100 );
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
  const hazardaGenerilo = kreiVegetajxanHazardon(0o301625);
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
      new THREE.Vector3(skaloY * ( 0o35/0o40 + hazardaGenerilo() * 0o15/0o40 ),
        skaloY * 0o7/0o10,
        skaloY * ( 0o35/0o40 + hazardaGenerilo() * 0o15/0o40 )));
    sxtonoj.setMatrixAt(i, M);
    sxtonoj.setColorAt(i, C.setHex(paletro[( hazardaGenerilo() * paletro.length ) | 0]));
    metitaj.push({ x, z, h: y, s: skaloY });
  }

  sxtonoj.instanceMatrix.needsUpdate = true;
  if ( sxtonoj.instanceColor ) sxtonoj.instanceColor.needsUpdate = true;

  sceno.add(sxtonoj);
  return metitaj;
}

// ⟨ គ្រួសតាមច្រាំងទន្លេ និងបឹង 📃 ⟩
/* ដាក់គ្រួសតូចៗនៅតាមក្រឡាដីដែលជាប់នឹងទឹក។
    @param sceno ( THREE.Scene ) - ឆាកដែលបន្ថែមសំណាញ់។
    @param heightFn ( ( x , z ) => number ) - អនុគមន៍កម្ពស់ដី។
    @param excludePaths ( ( x , z , m ) => boolean ) - តំបន់ផ្លូវដែលត្រូវគេច។
    @param excludeBuildings ( ( x , z , m ) => boolean , ជាជម្រើស ) - តំបន់សំណង់។
@returns metitaj */
export function konstruiBordajnSxtonojn(sceno: THREE.Scene,
  heightFn: ( x: number, z: number ) => number,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings?: ( x: number, z: number, minDistanco: number ) => boolean
): ArboMetado[] {
  const hazardaGenerilo = kreiVegetajxanHazardon(0o701234);
  const FORMOJ = 0o3;
  const materialo = kreiSxtonanMaterialon();
  const kapacito = SKULPTA_N * 0o4;
  const meshoj: THREE.InstancedMesh[] = [];
  const nombroj = new Int32Array(FORMOJ);
  for ( let f = 0; f < FORMOJ; f++ ) {
    const mesho = new THREE.InstancedMesh(konstruiRokGeometrion(0o11 + f * 0o27), materialo, kapacito);
    mesho.count = 0;
    meshoj.push(mesho);
  }

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const C = new THREE.Color();
  const paletro = [ 0x98a0a0, 0x888890, 0xa8a8a8, 0x909898, 0xb0a898 ];
  const metitaj: ArboMetado[] = [];
  const PASO = SKULPTA_PASO;

  for ( let j = 0; j < SKULPTA_N; j++ ) {
    for ( let i = 0; i < SKULPTA_N; i++ ) {
      const x = SKULPTA_ORIGINO[0] + ( i + 0o1/0o2 ) * PASO;
      const z = SKULPTA_ORIGINO[1] + ( j + 0o1/0o2 ) * PASO;
      if ( akvo(x, z) ) continue;
      // ⟨ ក្រឡាដីដែលជាប់នឹងទឹក 📃 ⟩
      if ( !( akvo(x + PASO, z) || akvo(x - PASO, z)
        || akvo(x, z + PASO) || akvo(x, z - PASO) ) ) continue;
      if ( hazardaGenerilo() > 0o5/0o10 ) continue;
      const jx = x + ( hazardaGenerilo() - 0o1/0o2 ) * PASO * 0o7/0o10;
      const jz = z + ( hazardaGenerilo() - 0o1/0o2 ) * PASO * 0o7/0o10;
      const y = heightFn(jx, jz);
      if ( y < akvaNivelo(jx, jz) - 0o1/0o10 ) continue;
      if ( excludePaths(jx, jz, 0o1) ) continue;
      if ( excludeBuildings && excludeBuildings(jx, jz, 0o1) ) continue;
      const skaloY = 0o5/0o40 + hazardaGenerilo() * 0o5/0o40;
      const skaloXZ = skaloY * ( 0o35/0o40 + hazardaGenerilo() * 0o15/0o40 );
      E.set(hazardaGenerilo() * 0o15/0o40, hazardaGenerilo() * Math.PI * 2, hazardaGenerilo() * 0o15/0o40);
      Q.setFromEuler(E);
      M.compose(new THREE.Vector3(jx, y + skaloY * 0o2/0o10, jz), Q,
        new THREE.Vector3(skaloXZ, skaloY * 0o7/0o10, skaloXZ));
      const forma = ( hazardaGenerilo() * FORMOJ ) | 0;
      if ( nombroj[forma] >= kapacito ) continue;
      meshoj[forma].setMatrixAt(nombroj[forma], M);
      meshoj[forma].setColorAt(nombroj[forma], C.setHex(paletro[( hazardaGenerilo() * paletro.length ) | 0]));
      nombroj[forma]++;
      metitaj.push({ x: jx, z: jz, h: y, s: skaloY });
    }
  }

  for ( let f = 0; f < FORMOJ; f++ ) {
    const mesho = meshoj[f];
    mesho.count = nombroj[f];
    mesho.instanceMatrix.needsUpdate = true;
    if ( mesho.instanceColor ) mesho.instanceColor.needsUpdate = true;
    sceno.add(mesho);
  }
  return metitaj;
}
