// Paths module — polished diorite roads with andesite borders
// Uzas rektangulajn Shape + ExtrudeGeometry por puraj longaj flankoj (intersekcoj interkovras)
import * as THREE from "three";
import { kreiDioritanTeksajxon, kreiAndezitanTeksajxon } from "./teksajxoj.js";

export interface VojDifino { pts: [number, number][]; w: number; }

/**
 * Build a stepped road segment between two waypoints.
 * Samples terrain height every ~4 units so the road naturally
 * forms stairs where the ground slopes and stays flush on flat ground.
 */
// Rondigita rektangulo: nur la kvar anguloj estas rondaj; la vojo ne fariĝas kapsulo.
function kreiRondanRektangulon(w: number, l: number, d: number, radiuso: number): THREE.ExtrudeGeometry {
  const formo = new THREE.Shape();
  const duonW = w / 2, duonL = l / 2;
  // Keep a straight section at both ends; never let a short step become a capsule.
  const r = Math.max(0, Math.min(radiuso, duonW, duonL / 2));

  // Counter-clockwise winding keeps ExtrudeGeometry's top face pointing upward
  // after the existing -90° X rotation.
  formo.moveTo(-duonW + r, -duonL);
  formo.lineTo(duonW - r, -duonL);
  formo.absarc(duonW - r, -duonL + r, r, -Math.PI / 2, 0, false);
  formo.lineTo(duonW, duonL - r);
  formo.absarc(duonW - r, duonL - r, r, 0, Math.PI / 2, false);
  formo.lineTo(-duonW + r, duonL);
  formo.absarc(-duonW + r, duonL - r, r, Math.PI / 2, Math.PI, false);
  formo.lineTo(-duonW, -duonL + r);
  formo.absarc(-duonW + r, -duonL + r, r, Math.PI, 3 * Math.PI / 2, false);
  formo.closePath();
  return new THREE.ExtrudeGeometry(formo, { depth: d, bevelEnabled: false });
}

function kreiSegmentGeometrion(w: number, l: number, d: number): THREE.ExtrudeGeometry {
  // Connected road spans stay straight; only the grid slabs get rounded corners.
  const formo = new THREE.Shape();
  const duonW = w / 2, duonL = l / 2;
  formo.moveTo(-duonW, -duonL);
  formo.lineTo(duonW, -duonL);
  formo.lineTo(duonW, duonL);
  formo.lineTo(-duonW, duonL);
  formo.closePath();
  return new THREE.ExtrudeGeometry(formo, { depth: d, bevelEnabled: false });
}

function orientiVojMeshon(mesh: THREE.Mesh, dx: number, dz: number): void {
  const longo = Math.hypot(dx, dz);
  const direkto = new THREE.Vector3(dx / longo, 0, dz / longo);
  const flanko = new THREE.Vector3(-direkto.z, 0, direkto.x);
  // ExtrudeGeometry grows along local +Z. Use a right-handed basis: local
  // +X is the width axis, local +Y follows the road, and local +Z is up.
  // The earlier reversed middle axis put the whole road on its side.
  mesh.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(
    flanko, direkto, new THREE.Vector3(0, 1, 0)
  ));
}

function lokigiVojMeshon(mesh: THREE.Mesh, x: number, y: number, z: number): void {
  // The extrusion starts at local z=0, so its bottom meets the sampled terrain.
  mesh.position.set(x, y, z);
}

function konstruiSegmenton( x1: number, z1: number, x2: number, z2: number,
  width: number, dikeco: number,
  heightFn: (x: number, z: number) => number,
  materialo: THREE.MeshStandardMaterial,
  sceno: THREE.Scene
): void {
  const difX = x2 - x1, difZ = z2 - z1;
  const longo = Math.hypot(difX, difZ);
  if (longo < 1/64) return;
  // Keep the original stepped construction: each roughly four-unit piece
  // follows the same straight axis, while only the two exposed ends can be
  // rounded. Connected interior pieces remain square and join cleanly.
  const steps = Math.max(1, Math.round(longo / 4));
  const pasoLongo = longo / steps;
  for ( let s = 0; s < steps; s++ ) {
    const t0 = s / steps, t1 = (s + 1) / steps;
    const sx1 = x1 + difX * t0, sz1 = z1 + difZ * t0;
    const sx2 = x1 + difX * t1, sz2 = z1 + difZ * t1;
    const movX = (sx1 + sx2) / 2, movZ = (sz1 + sz2) / 2;
    const y = heightFn(movX, movZ);
    // Road steps stay square so adjacent pieces meet with no rounded seam.
    const geometrio = kreiSegmentGeometrion(width, pasoLongo, dikeco);
    const mesh = new THREE.Mesh(geometrio, materialo);
    orientiVojMeshon(mesh, difX, difZ);
    lokigiVojMeshon(mesh, movX, y, movZ);
    mesh.receiveShadow = mesh.castShadow = true;
    sceno.add(mesh);
  }
}

// Legacy entry point kept square and border-aware for callers outside the city builder.
export function aldoniIntersekcajnRondigojn(
  sceno: THREE.Scene,
  nodes: [number, number][],
  heightFn: (x: number, z: number) => number,
  _duonLargxFn: (g: number) => number,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial
): void {
  konstruiPlacojn(sceno, nodes, heightFn, dioritaMaterialo, andezitaMaterialo);
}

// konstruiVojojn — Konstruu cxiujn vojsegmentojn kun dioritaj suprajoj kaj andezitaj randoj.
export function konstruiVojojn( sceno: THREE.Scene,
  defs: VojDifino[],
  heightFn: (x: number, z: number) => number,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial
): THREE.Vector3[] {
  const samples: THREE.Vector3[] = [];
  const dioritaTeksajxo = kreiDioritanTeksajxon();
  const andezitaTeksajxo = kreiAndezitanTeksajxon();
  const supraMaterialo = dioritaMaterialo.clone();
  supraMaterialo.map = dioritaTeksajxo; supraMaterialo.needsUpdate = true;
  // Surface (diorite) must be closest to camera to win z-fight over border
  supraMaterialo.polygonOffset = true; supraMaterialo.polygonOffsetFactor = -2; supraMaterialo.polygonOffsetUnits = -1;
  const bordaMaterialo = andezitaMaterialo.clone();
  bordaMaterialo.map = andezitaTeksajxo; bordaMaterialo.needsUpdate = true;
  // Border (andesite) rendered behind surface so it's only visible at the edges
  bordaMaterialo.polygonOffset = true; bordaMaterialo.polygonOffsetFactor = -1; bordaMaterialo.polygonOffsetUnits = -1;

  for ( const def of defs ) {
    for ( let i = 0; i < def.pts.length - 1; i++ ) {
      const [aX, aZ] = def.pts[i];
      const [bX, bZ] = def.pts[i + 1];
      // Voja surfaco
      konstruiSegmenton(aX, aZ, bX, bZ, def.w, 2/8, heightFn, supraMaterialo, sceno);
      // Andesite remains only along the outside road edge.
      konstruiSegmenton(aX, aZ, bX, bZ, def.w + 8/8, 2/8, heightFn, bordaMaterialo, sceno);
      // Specimenoj por lampoj
      const movX = (aX + bX) / 2, movZ = (aZ + bZ) / 2;
      samples.push(new THREE.Vector3(movX, heightFn(movX, movZ), movZ));
    }
  }
  return samples;
}

function kreiRondanDiamanton( radiuso: number, dikeco: number ): THREE.ExtrudeGeometry {
  const rondo = radiuso * 1/4, k = radiuso - rondo;
  const formo = new THREE.Shape();
  // Ferma vojo el kvar egalaj rondigitaj anguloj. La malnova fermo komencigxis
  // interne kaj krampe tranĉis la malsupran-dekstran randon (paperklipa fermo).
  formo.moveTo( rondo, -k );
  formo.lineTo( k, -rondo );
  formo.quadraticCurveTo( radiuso, 0, k, rondo );
  formo.lineTo( rondo, k );
  formo.quadraticCurveTo( 0, radiuso, -rondo, k );
  formo.lineTo( -k, rondo );
  formo.quadraticCurveTo( -radiuso, 0, -k, -rondo );
  formo.lineTo( -rondo, -k );
  formo.quadraticCurveTo( 0, -radiuso, rondo, -k );
  formo.closePath();
  return new THREE.ExtrudeGeometry( formo, { depth: dikeco, bevelEnabled: false } );
}

// konstruiPlacojn — Konstruu rondajn kapojn nur cxe la kvar angulaj nodoj de
// la voja reto, samgrandajn kiel la vojo. T-krucigxoj kaj internaj intersekcoj
// restas liberaj.
export function konstruiPlacojn( sceno: THREE.Scene,
  nodes: [number, number][],
  heightFn: (x: number, z: number) => number,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial
): { x: number; z: number }[] {
  const kajoj: { x: number; z: number }[] = [];
  if (nodes.length === 0) return kajoj;

  // Nur la plej eksteraj nodoj ricevas platformojn.
  const minX = Math.min(...nodes.map(n => n[0]));
  const maxX = Math.max(...nodes.map(n => n[0]));
  const minZ = Math.min(...nodes.map(n => n[1]));
  const maxZ = Math.max(...nodes.map(n => n[1]));
  // Nur la kvar angulaj nodoj — ambaŭ ekstremoj samtempe.
  const angulajNodoj = nodes.filter(([x, z]) => (x === minX || x === maxX) && (z === minZ || z === maxZ));

  const dioritaTx = kreiDioritanTeksajxon();
  const andezitaTx = kreiAndezitanTeksajxon();
  const bordaMaterialo = andezitaMaterialo.clone();
  bordaMaterialo.map = andezitaTx; bordaMaterialo.needsUpdate = true;
  bordaMaterialo.polygonOffset = true; bordaMaterialo.polygonOffsetFactor = -1; bordaMaterialo.polygonOffsetUnits = -1;
  // Placa polygonOffset pli negativa ol vojoj (-3 vs -2) por ke la disko cxiam
  // gajnas super la voja surfaco kie ili interkovras.
  const placaMaterialo = dioritaMaterialo.clone();
  placaMaterialo.map = dioritaTx; placaMaterialo.needsUpdate = true;
  placaMaterialo.polygonOffset = true; placaMaterialo.polygonOffsetFactor = -3; placaMaterialo.polygonOffsetUnits = -2;

  for ( const [bX, bZ] of angulajNodoj ) {
    const y = heightFn(bX, bZ) + 2/8;
    // Samgrandaj kiel la vojo: la disko kongruas kun la diorita surfaco (7/8
    // duon-larĝo) kaj la ringo kun la andezita bordo (11/8), kuŝantaj plate.
    const border = new THREE.Mesh( new THREE.RingGeometry(7/8, 11/8, 0o40).rotateX(-Math.PI / 2), bordaMaterialo );
    border.position.set( bX, y - 3/64, bZ );
    border.receiveShadow = true;
    sceno.add( border );
    const placo = new THREE.Mesh( new THREE.CircleGeometry(7/8, 0o40).rotateX(-Math.PI / 2), placaMaterialo );
    placo.position.set( bX, y, bZ );
    placo.receiveShadow = true;
    sceno.add( placo );
    kajoj.push({ x: bX, z: bZ });
  }
  return kajoj;
}

// konstruiPeriferiajnPlatformojn — Rondigitaj diamantaj platformoj ĉe la arbara rando.
export function konstruiPeriferiajnPlatformojn(
  sceno: THREE.Scene,
  lokoj: [ number, number ][],
  heightFn: ( x: number, z: number ) => number,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial
): [ number, number ][] {
  const subaMaterialo = andezitaMaterialo.clone();
  subaMaterialo.polygonOffset = true;
  subaMaterialo.polygonOffsetFactor = -1;
  subaMaterialo.polygonOffsetUnits = -1;
  const supraMaterialo = dioritaMaterialo.clone();
  supraMaterialo.polygonOffset = true;
  supraMaterialo.polygonOffsetFactor = -2;
  supraMaterialo.polygonOffsetUnits = -1;

  for ( const [ x, z ] of lokoj ) {
    const y = heightFn( x, z );
    // Inklini la platformon laux la loka terena deklivo: alie unu flanko flosu
    // super la grundo kaj la alia enfosigxus (la arbara rando deklivas).
    const e = 1/4;
    const gx = ( heightFn( x + e, z ) - heightFn( x - e, z ) ) / ( 2 * e );
    const gz = ( heightFn( x, z + e ) - heightFn( x, z - e ) ) / ( 2 * e );
    const normalo = new THREE.Vector3( -gx, 1, -gz ).normalize();
    // Baza kuŝigo (extrude laux +Z → supren), tiam klino al la terena normalo.
    const klino = new THREE.Quaternion().setFromUnitVectors( new THREE.Vector3( 0, 1, 0 ), normalo );
    const orienti = klino.multiply( new THREE.Quaternion().setFromEuler( new THREE.Euler( -Math.PI / 2, 0, 0 ) ) );

    const suba = new THREE.Mesh( kreiRondanDiamanton( 3, 2/8 ), subaMaterialo );
    suba.quaternion.copy( orienti );
    suba.position.set( x, y, z );
    suba.receiveShadow = true;
    sceno.add( suba );

    // Supra tavolo kusxas precize sur la suba (laŭ la normalo, ne nura vertikala ofseto).
    const bordo = new THREE.Mesh( kreiRondanDiamanton( 2.6, 2/8 ), subaMaterialo );
    bordo.quaternion.copy( orienti );
    bordo.position.copy( suba.position ).addScaledVector( normalo, 2/8 );
    bordo.receiveShadow = true;
    sceno.add( bordo );

    // Diorita centro kun andezita ringo ĉirkaŭe — la sama rando-stilo kiel la vojoj.
    const centro = new THREE.Mesh( kreiRondanDiamanton( 2.2, 2/8 ), supraMaterialo );
    centro.quaternion.copy( orienti );
    centro.position.copy( bordo.position );
    centro.receiveShadow = centro.castShadow = true;
    sceno.add( centro );
  }
  return lokoj;
}

// konstruiSpronon — Konstruu ununuran voj-spronon de konstruajxa pordo gxis voja rando.
// Uzas pli altan polygonOffset ol cefaj vojoj por certigi videblon.
export function konstruiSpronon( x1: number, z1: number, x2: number, z2: number,
  heightFn: (x: number, z: number) => number,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial,
  sceno: THREE.Scene
): void {
  const difX = x2 - x1, difZ = z2 - z1;
  const longo = Math.hypot(difX, difZ);
  if (longo < 4/8) return;
  // La porda vojo uzas la saman larghon kiel la regula vojreto.
  const w = 14/8;
  const dikeco = 2/8;
  // Surfacaj kaj bordaj materialoj kun teksturo kaj polygonOffset pli alta ol cefaj vojoj (-4 vs -2)
  const dioritaTx = kreiDioritanTeksajxon();
  const andezitaTx = kreiAndezitanTeksajxon();
  const supraMaterialo = dioritaMaterialo.clone();
  supraMaterialo.map = dioritaTx; supraMaterialo.needsUpdate = true;
  supraMaterialo.polygonOffset = true;
  supraMaterialo.polygonOffsetFactor = -4;
  supraMaterialo.polygonOffsetUnits = -2;
  const bordaMaterialo = andezitaMaterialo.clone();
  bordaMaterialo.map = andezitaTx; bordaMaterialo.needsUpdate = true;
  bordaMaterialo.polygonOffset = true;
  bordaMaterialo.polygonOffsetFactor = -3;
  bordaMaterialo.polygonOffsetUnits = -2;
  // Keep the andesite edge on building approaches, with a diorite surface
  // laid slightly above it to cover the inner part of that border.
  konstruiSegmenton(x1, z1, x2, z2, w + 8/8, dikeco, heightFn, bordaMaterialo, sceno);
  konstruiSegmenton(x1, z1, x2, z2, w, dikeco + 1/64, heightFn, supraMaterialo, sceno);
}

// konstruiFontanon — Konstruu placon kun fontana baseno kaj akva surfaco.
export function konstruiFontanon( sceno: THREE.Scene,
  x: number, z: number,
  heightFn: (x: number, z: number) => number,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial,
  oraMaterialo: THREE.MeshStandardMaterial
): THREE.Mesh {
  const y = heightFn(x, z) + 2/8;
  // Plaza disc
  const placo = new THREE.Mesh( new THREE.CircleGeometry(0o12, 0o60).rotateX(-Math.PI / 2),
    new THREE.MeshStandardMaterial({ color: 0xb8b8b8, roughness: 15/64, metalness: 3/64 }) );
  placo.position.set(x, y, z); placo.receiveShadow = true;
  sceno.add(placo);
  // Andezita ringa rando
  const ring = new THREE.Mesh( new THREE.RingGeometry(589/64, 333/32, 0o60).rotateX(-Math.PI / 2), andezitaMaterialo );
  ring.position.set(x, y + 3/64, z); sceno.add(ring);
  // Basena randa ringo
  const coping = new THREE.Mesh( new THREE.RingGeometry(307/64, 371/64, 0o60).rotateX(-Math.PI / 2),
    new THREE.MeshStandardMaterial({ color: 0x586060, roughness: 19/32 }) );
  coping.position.set(x, y + 3/64, z); sceno.add(coping);
  // Baseno (malhela enkavita cirklo)
  const basin = new THREE.Mesh( new THREE.CircleGeometry(40/8, 0o40).rotateX(-Math.PI / 2),
    new THREE.MeshStandardMaterial({ color: 0x203038, roughness: 29/32 }) );
  basin.position.set(x, y - 115/64, z); sceno.add(basin);
  // Akva surfaco
  const akvaMaterialo = new THREE.MeshStandardMaterial({
    color: 0x386868, roughness: 3/32, metalness: 19/64,
    transparent: true, opacity: 6/8
  });
  const akvaSurfaco = new THREE.Mesh( new THREE.CircleGeometry(147/32, 0o40).rotateX(-Math.PI / 2), akvaMaterialo );
  akvaSurfaco.position.set(x, y - 5/32, z);
  sceno.add(akvaSurfaco);
  return akvaSurfaco;
}
