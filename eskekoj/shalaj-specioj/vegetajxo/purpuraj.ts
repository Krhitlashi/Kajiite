// ≺⧼ រុក្ខជាតិស្វាយ 🟣 ⧽≻
import * as THREE from "three";
import { kreiPurpuranFrondanTeksajxon } from "../../komunajxoj/teksajxoj/purpura-frondo.js";
import { kreiPurpuranTrunkanTeksajxon } from "../../komunajxoj/teksajxoj/purpura-trunko.js";
import { kreiPurpuranTrunkanBumpanTeksajxon } from "../../komunajxoj/teksajxoj/purpura-trunko-bumpo.js";
import { kreiPurpuranTronkofilikanTeksajxon } from "../../komunajxoj/teksajxoj/purpura-trunko-filiko.js";
import { kreiVegetajxanHazardon } from "./hazardoj.js";
import { konstruiPurpuranRozeton, konstruiTavolanFrondanKronon } from "./frondoj.js";
import { KRONA_LIBERO, PURPURAJ_TRUNKAJ_RADIOJ, kronaRadiusoBetula } from "./kronoj.js";
import { PunktaHasho, punktoLibera, kreiGrovojn, hazardaGrovaLoko, type ArboMetado } from "./metado.js";
import { biomo, type Biomo } from "../../../kantaoj/mondo/tereno.js";

export function konstruiPurpurajnPlantojn(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  biomojFiltro?: readonly Biomo[]
): void {
  konstruiPeriferianFilikanAreon(sceno, kvanto, heightFn, excludeRivers, excludePaths, excludeBuildings,
    kreiPurpuranFrondanTeksajxon(true), 0o75/0o100, 0o15, 0o5/0o20, true, 0o53104, biomojFiltro);
}

export function konstruiPurpurajnFilikojn(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  biomojFiltro?: readonly Biomo[]
): void {
  konstruiPeriferianFilikanAreon(sceno, kvanto, heightFn, excludeRivers, excludePaths, excludeBuildings,
    kreiPurpuranFrondanTeksajxon(), 0o135/0o100, 0o13, 0o21/0o100, false, 0o53114, biomojFiltro);
}

function konstruiPeriferianFilikanAreon(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  teksajxo: THREE.CanvasTexture,
  alto: number,
  nombro: number,
  malfermo: number,
  densa: boolean,
  semo: number,
  biomojFiltro?: readonly Biomo[]
): void {
  const hazardaGenerilo = kreiVegetajxanHazardon(semo);
  // ⟨ ហ្វីលីកាយស្វាយបីវិមាត្រ 📃 ⟩
  const materialo = new THREE.MeshStandardMaterial({ map: teksajxo, alphaTest: 0o4/0o10, side: THREE.DoubleSide, roughness: 1 });
  const plantoj = new THREE.InstancedMesh(
    konstruiPurpuranRozeton(alto, nombro, malfermo, densa), materialo, kvanto);

  const grovoj = kreiGrovojn(Math.max(0o4, Math.floor(kvanto / 0o20)), 0o600, hazardaGenerilo, excludeRivers);
  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const metitajHasho = new PunktaHasho<[ number, number ]>(0o4);
  let pi = 0;
  let gardilo = 0;

  while ( pi < kvanto && gardilo++ < 0o10000 ) {
    const loko = hazardaGrovaLoko(hazardaGenerilo, grovoj);
    const x = loko.x;
    const z = loko.z;
    if ( Math.abs(x) > 0o600 || Math.abs(z) > 0o600 ) continue;
    if ( biomojFiltro && !biomojFiltro.includes(biomo(x, z)) ) continue;
    if ( excludeRivers(x, z) ) continue;
    if ( excludePaths(x, z, 0o2) ) continue;
    if ( excludeBuildings(x, z, 0o2) ) continue;
    if ( !punktoLibera(metitajHasho, x, z, 0o2) ) continue;

    const skalo = 0o6/0o10 + hazardaGenerilo() * 0o6/0o10;
    E.set(0, hazardaGenerilo() * Math.PI * 2, 0);
    Q.setFromEuler(E);
    M.compose(new THREE.Vector3(x, heightFn(x, z), z), Q,
      new THREE.Vector3(skalo, skalo, skalo));
    plantoj.setMatrixAt(pi++, M);
    metitajHasho.meti(x, z, [ x, z ]);
  }

  plantoj.count = pi;
  plantoj.instanceMatrix.needsUpdate = true;
  sceno.add(plantoj);
}

export function konstruiAltajnPurpurajnFilikojn(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  evituArbojn: ArboMetado[] = [],
  biomojFiltro?: readonly Biomo[]
): void {
  const hazardaGenerilo = kreiVegetajxanHazardon(0o53120);
  const specoj = [
    { trunkaAlto: 0o74/0o10, kronaAlto: 0o73/0o10, kronaLargho: 0o16/0o10, nombro: 0o10, mallevo: 0o10/0o10, densa: false },
    { trunkaAlto: 0o56/0o10, kronaAlto: 0o54/0o10, kronaLargho: 0o12/0o10, nombro: 0o6, mallevo: 0o4/0o10, densa: true },
    { trunkaAlto: 0o124/0o10, kronaAlto: 0o43/0o10, kronaLargho: 0o12/0o10, nombro: 5, mallevo: 0o11/0o10, densa: false },
  ];
  const TAVOLOJ = [ 2, 3, 4 ];
  const kronajGeometrioj = specoj.map(( speco, i ) => konstruiTavolanFrondanKronon(speco, TAVOLOJ[i]));
  const trunkajGeometrioj = specoj.map(speco => new THREE.CylinderGeometry(
    PURPURAJ_TRUNKAJ_RADIOJ.supro, PURPURAJ_TRUNKAJ_RADIOJ.malsupro, speco.trunkaAlto, 7));
  const trunkajMaterialoj = specoj.map(( _, i ) => new THREE.MeshStandardMaterial({
    map: kreiPurpuranTrunkanTeksajxon(), bumpMap: kreiPurpuranTrunkanBumpanTeksajxon(),
    bumpScale: 0o6/0o10, color: [ 0xffffff, 0xf8f0f8, 0xe8e0e8 ][i], roughness: 0o7/0o10,
  }));
  const kronajMaterialoj = specoj.map(speco => new THREE.MeshStandardMaterial({
    map: kreiPurpuranTronkofilikanTeksajxon(speco.densa), alphaTest: 0o4/0o10, side: THREE.DoubleSide, roughness: 1,
  }));
  const nombroj = specoj.map(() => Math.ceil(kvanto / specoj.length));
  const trunkoj = trunkajGeometrioj.map(( geometrio, i ) => new THREE.InstancedMesh(geometrio, trunkajMaterialoj[i], nombroj[i]));
  const kronoj = kronajGeometrioj.map(( geometrio, i ) => new THREE.InstancedMesh(geometrio, kronajMaterialoj[i], nombroj[i]));
  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const C = new THREE.Color();
  const indicoj = specoj.map(() => 0);
  const metitajHasho = new PunktaHasho<[ number, number ]>(0o4);
  let provoj = 0;
  const grovoj = kreiGrovojn(Math.max(0o4, Math.floor(kvanto / 0o20)), 0o600, hazardaGenerilo, excludeRivers);

  while ( indicoj.reduce(( a, b ) => a + b, 0) < kvanto && provoj++ < 0o10000 ) {
    const loko = hazardaGrovaLoko(hazardaGenerilo, grovoj);
    const x = loko.x;
    const z = loko.z;
    if ( Math.abs(x) > 0o600 || Math.abs(z) > 0o600 ) continue;
    if ( biomojFiltro && !biomojFiltro.includes(biomo(x, z)) ) continue;
    if ( excludeRivers(x, z) || excludePaths(x, z, 0o3) || excludeBuildings(x, z, 0o3) ) continue;
    let troProksima = !punktoLibera(metitajHasho, x, z, 0o146/0o100 * 0o2 + 0o3);
    if ( !troProksima ) {
      for ( const arbo of evituArbojn ) {
        if ( Math.hypot(x - arbo.x, z - arbo.z) <
          ( arbo.r ?? kronaRadiusoBetula(arbo.s) ) + 0o146/0o100 + KRONA_LIBERO ) { troProksima = true; break; }
      }
    }
    if ( troProksima ) continue;

    let specoIndico = ( hazardaGenerilo() * specoj.length ) | 0;
    if ( indicoj[specoIndico] >= nombroj[specoIndico] ) {
      specoIndico = indicoj.findIndex(( n, j ) => n < nombroj[j]);
      if ( specoIndico < 0 ) break;
    }
    const speco = specoj[specoIndico];
    const skalo = 0o5/0o10 + hazardaGenerilo() * 0o11/0o10;
    E.set(0, hazardaGenerilo() * Math.PI * 2, 0);
    Q.setFromEuler(E);
    const y = heightFn(x, z);
    const trunkaCentroY = y + speco.trunkaAlto * skalo / 2;
    const kronaCentroY = y;
    M.compose(new THREE.Vector3(x, trunkaCentroY, z), Q, new THREE.Vector3(skalo, skalo, skalo));
    trunkoj[specoIndico].setMatrixAt(indicoj[specoIndico], M);
    const helo = 0o73/0o100 + hazardaGenerilo() * 0o5/0o100;
    C.setRGB(helo, helo * 0o77/0o100, helo * 0o101/0o100);
    trunkoj[specoIndico].setColorAt(indicoj[specoIndico], C);
    M.compose(new THREE.Vector3(x, kronaCentroY, z), Q, new THREE.Vector3(skalo, skalo, skalo));
    kronoj[specoIndico].setMatrixAt(indicoj[specoIndico], M);
    indicoj[specoIndico]++;
    metitajHasho.meti(x, z, [ x, z ]);
  }

  trunkoj.forEach(( mesh, i ) => {
    mesh.count = indicoj[i]; mesh.instanceMatrix.needsUpdate = true; mesh.castShadow = true; sceno.add(mesh);
    if ( mesh.instanceColor ) mesh.instanceColor.needsUpdate = true;
  });
  kronoj.forEach(( mesh, i ) => { mesh.count = indicoj[i]; mesh.instanceMatrix.needsUpdate = true; mesh.castShadow = true; sceno.add(mesh); });
}
