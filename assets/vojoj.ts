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
// Kreu rektangulan Shape por vojsegmento — neniuj rondaj anguloj por puraj longaj flankoj
function kreiSegmentGeometrion(w: number, l: number, d: number): THREE.ExtrudeGeometry {
  const formo = new THREE.Shape();
  const duonW = w / 2, duonL = l / 2;
  formo.moveTo(-duonW, -duonL);
  formo.lineTo(duonW, -duonL);
  formo.lineTo(duonW, duonL);
  formo.lineTo(-duonW, duonL);
  formo.closePath();
  return new THREE.ExtrudeGeometry(formo, { depth: d, bevelEnabled: false });
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
  const angle = Math.atan2(difX, difZ);
  // Nombro da pasxoj. unu cxiun ~4 unuojn, almenaux 1
  const steps = Math.max(1, Math.round(longo / 4));
  const pasoLongo = longo / steps;
  for ( let s = 0; s < steps; s++ ) {
    const t0 = s / steps, t1 = (s + 1) / steps;
    const sx1 = x1 + difX * t0, sz1 = z1 + difZ * t0;
    const sx2 = x1 + difX * t1, sz2 = z1 + difZ * t1;
    const movX = (sx1 + sx2) / 2, movZ = (sz1 + sz2) / 2;
    const y = heightFn(movX, movZ);
    const geometrio = kreiSegmentGeometrion(width, pasoLongo, dikeco);
    const mesh = new THREE.Mesh(geometrio, materialo);
    mesh.rotation.x = -Math.PI / 2;
    mesh.rotation.z = angle;
    mesh.position.set(movX, y + dikeco / 2, movZ);
    mesh.receiveShadow = mesh.castShadow = true;
    sceno.add(mesh);
  }
}

// Aldoni rondigitajn angulojn cxe vojintersekcoj — kvaroncirkloj en cxiu kvadranto
export function aldoniIntersekcajnRondigojn(
  sceno: THREE.Scene,
  nodes: [number, number][],
  heightFn: (x: number, z: number) => number,
  duonLargxFn: (g: number) => number,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial
): void {
  const dikeco = 2/8;
  const dioritaTeksajxo = kreiDioritanTeksajxon();
  const andezitaTeksajxo = kreiAndezitanTeksajxon();
  const sM = dioritaMaterialo.clone();
  sM.map = dioritaTeksajxo; sM.needsUpdate = true;
  sM.polygonOffset = true; sM.polygonOffsetFactor = -2; sM.polygonOffsetUnits = -1;
  const bM = andezitaMaterialo.clone();
  bM.map = andezitaTeksajxo; bM.needsUpdate = true;
  bM.polygonOffset = true; bM.polygonOffsetFactor = -1; bM.polygonOffsetUnits = -1;

  // Kvar angulaj intervaloj por la 4 kvadrantoj. [startAngle, endAngle]
  // absarc(0,0,r, start, end, false) desegnas de start al end kontrauxhorlogxe
  const anguloj: [number, number][] = [
    [ 0, Math.PI / 2 ],          // QI.  +X al +Z
    [ Math.PI / 2, Math.PI ],    // QII. +Z al -X
    [ Math.PI, 3 * Math.PI / 2 ],// QIII. -X al -Z
    [ 3 * Math.PI / 2, 2 * Math.PI ], // QIV. -Z al +X
  ];

  for (const [gx, gz] of nodes) {
    const y = heightFn(gx, gz) + dikeco / 2;
    const rx = duonLargxFn(gx);
    const rz = duonLargxFn(gz);
    const r = Math.max(rx, rz);
    const rB = r + 4/8;

    for (const [sa, ea] of anguloj) {
      // Supra kvaroncirklo (diorito)
      const sf = new THREE.Shape();
      sf.moveTo(0, 0);
      sf.absarc(0, 0, r, sa, ea, false);
      sf.closePath();
      const sg = new THREE.ExtrudeGeometry(sf, { depth: dikeco, bevelEnabled: false });
      const sm = new THREE.Mesh(sg, sM);
      sm.rotation.x = -Math.PI / 2;
      sm.position.set(gx, y, gz);
      sceno.add(sm);

      // Borda kvaronringo (andesito) — interna arko + radia linio + ekstera arko (horlogxe) + fermo
      const bf = new THREE.Shape();
      bf.moveTo(Math.cos(sa) * r, Math.sin(sa) * r);
      bf.absarc(0, 0, r, sa, ea, false);
      bf.lineTo(Math.cos(ea) * rB, Math.sin(ea) * rB);
      bf.absarc(0, 0, rB, ea, sa, true);
      bf.closePath();
      const bg = new THREE.ExtrudeGeometry(bf, { depth: dikeco, bevelEnabled: false });
      const bm = new THREE.Mesh(bg, bM);
      bm.rotation.x = -Math.PI / 2;
      bm.position.set(gx, y - 1/64, gz);
      sceno.add(bm);
    }
  }
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
      // Rando (iomete pli largha, sama dikeco)
      konstruiSegmenton(aX, aZ, bX, bZ, def.w + 8/8, 2/8, heightFn, bordaMaterialo, sceno);
      // Specimenoj por lampoj
      const movX = (aX + bX) / 2, movZ = (aZ + bZ) / 2;
      samples.push(new THREE.Vector3(movX, heightFn(movX, movZ), movZ));
    }
  }
  return samples;
}

// konstruiPlacojn — Konstruu placajn diskojn kaj hazard-ringojn cxe kradaj nodoj.
export function konstruiPlacojn( sceno: THREE.Scene,
  nodes: [number, number][],
  heightFn: (x: number, z: number) => number,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial
): { x: number; z: number }[] {
  const kajoj: { x: number; z: number }[] = [];
  // Placa polygonOffset pli negativa ol vojoj (-3 vs -2) por certigi ke placaj diskoj bildigxas SUR la voja surfaco, ne sub gxi
  const dioritaTx = kreiDioritanTeksajxon();
  const andezitaTx = kreiAndezitanTeksajxon();
  const placaMaterialo = dioritaMaterialo.clone();
  placaMaterialo.map = dioritaTx; placaMaterialo.needsUpdate = true;
  placaMaterialo.polygonOffset = true; placaMaterialo.polygonOffsetFactor = -3; placaMaterialo.polygonOffsetUnits = -2;
  const bordaMaterialo = andezitaMaterialo.clone();
  bordaMaterialo.map = andezitaTx; bordaMaterialo.needsUpdate = true;
  bordaMaterialo.polygonOffset = true; bordaMaterialo.polygonOffsetFactor = -2; bordaMaterialo.polygonOffsetUnits = -2;

  for ( const [bX, bZ] of nodes ) {
    const y = heightFn(bX, bZ) + 2/8;
    // Placa disko (pli malgranda por ne superkovri vojojn)
    const placo = new THREE.Mesh( new THREE.CircleGeometry(18/8, 0o20).rotateX(-Math.PI / 2), placaMaterialo );
    placo.position.set(bX, y, bZ);
    placo.receiveShadow = true;
    sceno.add(placo);
    // Randa ringo
    const border = new THREE.Mesh( new THREE.RingGeometry(18/8, 85/32, 0o20).rotateX(-Math.PI / 2), bordaMaterialo );
    border.position.set(bX, y - 3/64, bZ);
    sceno.add(border);
    kajoj.push({ x: bX, z: bZ });
  }
  return kajoj;
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
  const angle = Math.atan2(difX, difZ);
  const w = 24/8; // pli largha ol cefaj voj-spronoj (3 vs 2)
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

  const steps = Math.max(1, Math.round(longo / 4));
  const pasoLongo = longo / steps;
  for ( let s = 0; s < steps; s++ ) {
    const t0 = s / steps, t1 = (s + 1) / steps;
    const sx1 = x1 + difX * t0, sz1 = z1 + difZ * t0;
    const sx2 = x1 + difX * t1, sz2 = z1 + difZ * t1;
    const movX = (sx1 + sx2) / 2, movZ = (sz1 + sz2) / 2;
    const y = heightFn(movX, movZ);
    // Bordo (andesito - pli largha, samnivela)
    const bordaFormo = new THREE.Shape();
    const duonWb = (w + 8/8) / 2, duonLb = pasoLongo / 2 + 0.1;
    bordaFormo.moveTo(-duonWb, -duonLb);
    bordaFormo.lineTo(duonWb, -duonLb);
    bordaFormo.lineTo(duonWb, duonLb);
    bordaFormo.lineTo(-duonWb, duonLb);
    bordaFormo.closePath();
    const bordaGeom = new THREE.ExtrudeGeometry(bordaFormo, { depth: dikeco, bevelEnabled: false });
    const bordMesh = new THREE.Mesh(bordaGeom, bordaMaterialo);
    bordMesh.rotation.x = -Math.PI / 2;
    bordMesh.rotation.z = angle;
    bordMesh.position.set(movX, y + dikeco / 2, movZ);
    bordMesh.receiveShadow = bordMesh.castShadow = true;
    sceno.add(bordMesh);
    // Surfaco (diorito - samlargha kiel w)
    const surfacaFormo = new THREE.Shape();
    const duonW = w / 2, duonL = pasoLongo / 2;
    surfacaFormo.moveTo(-duonW, -duonL);
    surfacaFormo.lineTo(duonW, -duonL);
    surfacaFormo.lineTo(duonW, duonL);
    surfacaFormo.lineTo(-duonW, duonL);
    surfacaFormo.closePath();
    const surfacaGeom = new THREE.ExtrudeGeometry(surfacaFormo, { depth: dikeco, bevelEnabled: false });
    const surfacaMesh = new THREE.Mesh(surfacaGeom, supraMaterialo);
    surfacaMesh.rotation.x = -Math.PI / 2;
    surfacaMesh.rotation.z = angle;
    surfacaMesh.position.set(movX, y + dikeco / 2 + 1/64, movZ); // iomete pli alta ol bordo
    surfacaMesh.receiveShadow = surfacaMesh.castShadow = true;
    sceno.add(surfacaMesh);
  }
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
