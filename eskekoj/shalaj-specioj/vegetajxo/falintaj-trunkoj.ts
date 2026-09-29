// ≺⧼ La falintaj trunkoj 🪵 ⧽≻
// La falintaj arbtrunkoj de la arbaro ( konstruiFalintajnTrunkojn ) —
// longaj, hazarde klinitaj trunkaj pecoj kun siaj propraj piedaj randoj por
// la kolizioj.
import * as THREE from "three";
import { kreiSxelanTeksajxon } from "../../komunajxoj/teksajxoj/sxelo.js";
import { kreiSxelanBumpanTeksajxon } from "../../komunajxoj/teksajxoj/sxelo-bumpo.js";
import { kreiVegetajxanHazardon } from "./hazardoj.js";
import { PunktaHasho, punktoLibera, type ArboMetado } from "./metado.js";

// konstruiFalintajnTrunkojn — Metu falintajn arbtrunkojn en la arbaron.
export function konstruiFalintajnTrunkojn(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  nearTrees: ArboMetado[],
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings?: ( x: number, z: number, minDistanco: number ) => boolean
): [ number, number ][][] {
  const hazardaGenerilo = kreiVegetajxanHazardon(22931);
  const sxelaTeksajxo = kreiSxelanTeksajxon();
  const sxelaBumpo = kreiSxelanBumpanTeksajxon();
  const trunkaGeometrio = new THREE.CylinderGeometry(0o3/0o10, 0o4/0o10, 1, 7, 1);
  const trunkaMaterialo = new THREE.MeshStandardMaterial({ map: sxelaTeksajxo, bumpMap: sxelaBumpo, bumpScale: 0o6/0o10, roughness: 0o67/0o100 });
  const trunkoj = new THREE.InstancedMesh(trunkaGeometrio, trunkaMaterialo, kvanto);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const metitajHasho = new PunktaHasho<[ number, number ]>(0o4);
  const falintajRandoj: [ number, number ][][] = [];
  let ti = 0;
  let gardilo = 0;

  while ( ti < kvanto && gardilo++ < 0o3710 ) {
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
    // La trunko estas longa kaj solida — ĝia marĝeno estas pli granda ol tiu de
    // la etaj plantoj, same kiel ĉe la vojoj ( la trunko atingas 0o23/0o10 unuojn
    // de sia centro ).
    if ( excludeRivers(x, z) || excludePaths(x, z, 0o3)
      || ( excludeBuildings && excludeBuildings(x, z, 0o3) ) ) continue;
    if ( Math.hypot(x, z) < 0o20 ) continue;
    // Eta interspaco — la falintaj trunkoj ne kuŝu krucigitaj sur la grundo.
    if ( !punktoLibera(metitajHasho, x, z, 0o3) ) continue;

    const longo = 0o12/0o10 + hazardaGenerilo() * 0o22/0o10;
    E.set(0, hazardaGenerilo() * Math.PI * 2, Math.PI / 2 + ( hazardaGenerilo() - 0o4/0o10 ) * 0o4/0o10);
    Q.setFromEuler(E);
    M.compose(new THREE.Vector3(x, heightFn(x, z) + 0o4/0o10, z), Q, new THREE.Vector3(1, longo, 1));
    trunkoj.setMatrixAt(ti++, M);
    metitajHasho.meti(x, z, [ x, z ]);
    // Piedaj randoj por la kolizioj — la sama Eulera rotacio ( yaw = angulo ),
    // kiun la matrico uzas ( Rz unue klinas la akson al -x, Ry turnas ĝin ),
    // do la ringo kongruas kun la vidita trunko.
    const angulo = E.y;
    const piedoj: [ number, number ][] = [];
    for ( let k = 0; k < 0o5; k++ ) {
      const t = ( k + 0o1/0o2 ) / 0o5 - 0o1/0o2;   // -0o4/0o10 .. 0o4/0o10 laŭlonge
      piedoj.push([ x - Math.cos(angulo) * longo * t, z + Math.sin(angulo) * longo * t ]);
    }
    falintajRandoj.push(piedoj);
  }

  trunkoj.count = ti;
  trunkoj.instanceMatrix.needsUpdate = true;

  sceno.add(trunkoj);
  return falintajRandoj;
}
