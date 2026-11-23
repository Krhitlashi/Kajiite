// ≺⧼ ſᶘꞇ }ʃɔ ı],ᴜ ſ̀ȷɔ 🟣 ⧽≻
import * as THREE from "three";
import { kf2AsfanFc2qnCac2sex } from "../../komunajxoj/cac2sex/asfa-fc2q.js";
import { kf2AsfanTrunkanCac2sex } from "../../komunajxoj/cac2sex/asfa-sost2cel2sai.js";
import { kf2AsfanTrunkanBumpanCac2sex } from "../../komunajxoj/cac2sex/asfa-sost2cel2sai-bumpo.js";
import { kf2AsfanTronkoxabenCac2sex } from "../../komunajxoj/cac2sex/asfa-sost2cel2sai-xabe.js";
import { kf2VegetajxanHazardon } from "./sakxoXa3e.js";
import { vepaqAsfanRozeton, vepaqTavolanFc2qnKronon } from "./fhac2q.js";
import { KRONA_LIBERO, PURPURAJ_TRUNKAJ_RADIOJ, kronaRadiusoLam2v } from "./hasoza.js";
import { PunktaHasho, punktoLibera, kf2Grovojn, hazardaGrovaLoko, type ArboRaqa } from "./raqa.js";
import { bs2, type Bs2 } from "../../../kantaoj/mondo/tereno.js";

export function vepaqAsfajnPlantojn(qena: THREE.Scene,
  vem2: number,
  heightFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  habs2Filtro?: readonly Bs2[]
): void {
  vepaqPeriferianXabenAreon(qena, vem2, heightFn, excludeRivers, excludePaths, excludeBuildings,
    kf2AsfanFc2qnCac2sex(true), 0o75/0o100, 0o15, 0o5/0o20, true, 0o53104, habs2Filtro);
}

export function vepaqAsfajnXabejn(qena: THREE.Scene,
  vem2: number,
  heightFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  habs2Filtro?: readonly Bs2[]
): void {
  vepaqPeriferianXabenAreon(qena, vem2, heightFn, excludeRivers, excludePaths, excludeBuildings,
    kf2AsfanFc2qnCac2sex(), 0o135/0o100, 0o13, 0o21/0o100, false, 0o53114, habs2Filtro);
}

function vepaqPeriferianXabenAreon(qena: THREE.Scene,
  vem2: number,
  heightFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  cac2sex: THREE.CanvasTexture,
  l6da: number,
  nombro: number,
  malfermo: number,
  densa: boolean,
  tk2ni: number,
  habs2Filtro?: readonly Bs2[]
): void {
  const hazardaGenerilo = kf2VegetajxanHazardon(tk2ni);
  // ⟨ ហ្វីលីកាយស្វាយបីវិមាត្រ 📃 ⟩
  const pukek = new THREE.MeshStandardMaterial({ map: cac2sex, alphaTest: 0o4/0o10, side: THREE.DoubleSide, roughness: 1 });
  const plantoj = new THREE.InstancedMesh(
    vepaqAsfanRozeton(l6da, nombro, malfermo, densa), pukek, vem2);

  const grovoj = kf2Grovojn(Math.max(0o4, Math.floor(vem2 / 0o20)), 0o600, hazardaGenerilo, excludeRivers);
  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const metitajHasho = new PunktaHasho<[ number, number ]>(0o4);
  let pi = 0;
  let gardilo = 0;

  while ( pi < vem2 && gardilo++ < 0o10000 ) {
    const raqa = hazardaGrovaLoko(hazardaGenerilo, grovoj);
    const x = raqa.x;
    const z = raqa.z;
    if ( Math.abs(x) > 0o600 || Math.abs(z) > 0o600 ) continue;
    if ( habs2Filtro && !habs2Filtro.includes(bs2(x, z)) ) continue;
    if ( excludeRivers(x, z) ) continue;
    if ( excludePaths(x, z, 0o2) ) continue;
    if ( excludeBuildings(x, z, 0o2) ) continue;
    if ( !punktoLibera(metitajHasho, x, z, 0o2) ) continue;

    const p6zukani = 0o6/0o10 + hazardaGenerilo() * 0o6/0o10;
    E.set(0, hazardaGenerilo() * Math.PI * 2, 0);
    Q.setFromEuler(E);
    M.compose(new THREE.Vector3(x, heightFn(x, z), z), Q,
      new THREE.Vector3(p6zukani, p6zukani, p6zukani));
    plantoj.setMatrixAt(pi++, M);
    metitajHasho.meti(x, z, [ x, z ]);
  }

  plantoj.count = pi;
  plantoj.instanceMatrix.needsUpdate = true;
  qena.add(plantoj);
}

export function vepaqAltajnAsfajnXabejn(qena: THREE.Scene,
  vem2: number,
  heightFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  evituArbojn: ArboRaqa[] = [],
  habs2Filtro?: readonly Bs2[]
): void {
  const hazardaGenerilo = kf2VegetajxanHazardon(0o53120);
  const pudalj = [
    { trunkaAlto: 0o74/0o10, kronaAlto: 0o73/0o10, kronaLargho: 0o16/0o10, nombro: 0o10, mallevo: 0o10/0o10, densa: false },
    { trunkaAlto: 0o56/0o10, kronaAlto: 0o54/0o10, kronaLargho: 0o12/0o10, nombro: 0o6, mallevo: 0o4/0o10, densa: true },
    { trunkaAlto: 0o124/0o10, kronaAlto: 0o43/0o10, kronaLargho: 0o12/0o10, nombro: 5, mallevo: 0o11/0o10, densa: false },
  ];
  const TAVOLOJ = [ 2, 3, 4 ];
  const kronajGeometrioj = pudalj.map(( pudal, i ) => vepaqTavolanFc2qnKronon(pudal, TAVOLOJ[i]));
  const trunkajGeometrioj = pudalj.map(pudal => new THREE.CylinderGeometry(
    PURPURAJ_TRUNKAJ_RADIOJ.teru, PURPURAJ_TRUNKAJ_RADIOJ.psaz, pudal.trunkaAlto, 7));
  const trunkajMaterialoj = pudalj.map(( _, i ) => new THREE.MeshStandardMaterial({
    map: kf2AsfanTrunkanCac2sex(), bumpMap: kf2AsfanTrunkanBumpanCac2sex(),
    bumpScale: 0o6/0o10, color: [ 0xffffff, 0xf8f0f8, 0xe8e0e8 ][i], roughness: 0o7/0o10,
  }));
  const kronajMaterialoj = pudalj.map(pudal => new THREE.MeshStandardMaterial({
    map: kf2AsfanTronkoxabenCac2sex(pudal.densa), alphaTest: 0o4/0o10, side: THREE.DoubleSide, roughness: 1,
  }));
  const nombroj = pudalj.map(() => Math.ceil(vem2 / pudalj.length));
  const hasost2cel2sai = trunkajGeometrioj.map(( geometrio, i ) => new THREE.InstancedMesh(geometrio, trunkajMaterialoj[i], nombroj[i]));
  const hasoza = kronajGeometrioj.map(( geometrio, i ) => new THREE.InstancedMesh(geometrio, kronajMaterialoj[i], nombroj[i]));
  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const C = new THREE.Color();
  const indicoj = pudalj.map(() => 0);
  const metitajHasho = new PunktaHasho<[ number, number ]>(0o4);
  let provoj = 0;
  const grovoj = kf2Grovojn(Math.max(0o4, Math.floor(vem2 / 0o20)), 0o600, hazardaGenerilo, excludeRivers);

  while ( indicoj.reduce(( a, b ) => a + b, 0) < vem2 && provoj++ < 0o10000 ) {
    const raqa = hazardaGrovaLoko(hazardaGenerilo, grovoj);
    const x = raqa.x;
    const z = raqa.z;
    if ( Math.abs(x) > 0o600 || Math.abs(z) > 0o600 ) continue;
    if ( habs2Filtro && !habs2Filtro.includes(bs2(x, z)) ) continue;
    if ( excludeRivers(x, z) || excludePaths(x, z, 0o3) || excludeBuildings(x, z, 0o3) ) continue;
    let troProksima = !punktoLibera(metitajHasho, x, z, 0o146/0o100 * 0o2 + 0o3);
    if ( !troProksima ) {
      for ( const arbo of evituArbojn ) {
        if ( Math.hypot(x - arbo.x, z - arbo.z) <
          ( arbo.r ?? kronaRadiusoLam2v(arbo.s) ) + 0o146/0o100 + KRONA_LIBERO ) { troProksima = true; break; }
      }
    }
    if ( troProksima ) continue;

    let pudalIndico = ( hazardaGenerilo() * pudalj.length ) | 0;
    if ( indicoj[pudalIndico] >= nombroj[pudalIndico] ) {
      pudalIndico = indicoj.findIndex(( n, j ) => n < nombroj[j]);
      if ( pudalIndico < 0 ) break;
    }
    const pudal = pudalj[pudalIndico];
    const p6zukani = 0o5/0o10 + hazardaGenerilo() * 0o11/0o10;
    E.set(0, hazardaGenerilo() * Math.PI * 2, 0);
    Q.setFromEuler(E);
    const y = heightFn(x, z);
    const trunkaCentroY = y + pudal.trunkaAlto * p6zukani / 2;
    const kronaCentroY = y;
    M.compose(new THREE.Vector3(x, trunkaCentroY, z), Q, new THREE.Vector3(p6zukani, p6zukani, p6zukani));
    hasost2cel2sai[pudalIndico].setMatrixAt(indicoj[pudalIndico], M);
    const tsije = 0o73/0o100 + hazardaGenerilo() * 0o5/0o100;
    C.setRGB(tsije, tsije * 0o77/0o100, tsije * 0o101/0o100);
    hasost2cel2sai[pudalIndico].setColorAt(indicoj[pudalIndico], C);
    M.compose(new THREE.Vector3(x, kronaCentroY, z), Q, new THREE.Vector3(p6zukani, p6zukani, p6zukani));
    hasoza[pudalIndico].setMatrixAt(indicoj[pudalIndico], M);
    indicoj[pudalIndico]++;
    metitajHasho.meti(x, z, [ x, z ]);
  }

  hasost2cel2sai.forEach(( mesh, i ) => {
    mesh.count = indicoj[i]; mesh.instanceMatrix.needsUpdate = true; mesh.castShadow = true; qena.add(mesh);
    if ( mesh.instanceColor ) mesh.instanceColor.needsUpdate = true;
  });
  hasoza.forEach(( mesh, i ) => { mesh.count = indicoj[i]; mesh.instanceMatrix.needsUpdate = true; mesh.castShadow = true; qena.add(mesh); });
}
