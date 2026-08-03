// Paths module — polished diorite roads with andesite borders
// Uzas rektangulajn Shape + ExtrudeGeometry por puraj longaj flankoj (intersekcoj interkovras)
import * as THREE from "three";
import { kreiDioritanTeksajxon, kreiAndezitanTeksajxon } from "./teksajxoj.js";

export interface VojDifino { pts: [number, number][]; w: number; heightFn?: (x: number, z: number) => number; }

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

function kreiSegmentGeometrion(w: number, l: number, d: number, ofsetoX: number = 0): THREE.ExtrudeGeometry {
  // Connected road spans stay straight; only the grid slabs get rounded corners.
  // ofsetoX sxovas la strion laux la loka flank-akso ( ⊥ al la voja direkto ),
  // por ke la andezitaj flankoj sidu APUD la diorita centro — ne sub gxi.
  const formo = new THREE.Shape();
  const duonW = w / 2, duonL = l / 2;
  formo.moveTo(-duonW + ofsetoX, -duonL);
  formo.lineTo(duonW + ofsetoX, -duonL);
  formo.lineTo(duonW + ofsetoX, duonL);
  formo.lineTo(-duonW + ofsetoX, duonL);
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

// VojBendo — unu longa strio de la voja sekco: largho kaj ofseto laux la loka
// flank-akso ( la perpendikularo de la voja direkto ). La vojo konsistas el tri
// apudaj bendoj — andezitaj randoj, diorita centro — sen intertavoloj.
interface VojBendo {
  largho: number;
  ofseto: number;
  materialo: THREE.MeshStandardMaterial;
}

// kreiVojajnBendojn — La tri apudajn bendojn de unu vojo: diorita centro ( w )
// kun andezitaj flankoj ( ( wb - w ) / 2 cxiu ) apud gxi. La ekstera largho wb
// restas la sama kiel la malnova randa strio, do la voja spuro ne sxangxigxas.
function kreiVojajnBendojn( w: number,
  supraMaterialo: THREE.MeshStandardMaterial,
  bordaMaterialo: THREE.MeshStandardMaterial
): VojBendo[] {
  const wb = w + 0o10/0o10;
  const flankaLargho = ( wb - w ) / 2; // 0o5/0o10 cxiu flanko
  const flankaOfseto = w / 2 + flankaLargho / 2;
  return [
    { largho: flankaLargho, ofseto: -flankaOfseto, materialo: bordaMaterialo },
    { largho: w, ofseto: 0, materialo: supraMaterialo },
    { largho: flankaLargho, ofseto: flankaOfseto, materialo: bordaMaterialo },
  ];
}

function konstruiSegmenton( x1: number, z1: number, x2: number, z2: number,
  bendoj: VojBendo[],
  dikeco: number,
  heightFn: (x: number, z: number) => number,
  sceno: THREE.Scene
): void {
  const difX = x2 - x1, difZ = z2 - z1;
  const longo = Math.hypot(difX, difZ);
  if (longo < 0o1/0o100) return;
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
    for ( const bendo of bendoj ) {
      // Road steps stay square so adjacent pieces meet with no rounded seam.
      const geometrio = kreiSegmentGeometrion(bendo.largho, pasoLongo, dikeco, bendo.ofseto);
      const mesh = new THREE.Mesh(geometrio, bendo.materialo);
      orientiVojMeshon(mesh, difX, difZ);
      lokigiVojMeshon(mesh, movX, y, movZ);
      mesh.receiveShadow = mesh.castShadow = true;
      sceno.add(mesh);
    }
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
  // La bendoj ne plu intertavoligas: polygonOffset restas nur por ke la voja
  // surfaco gajnu ce intersekcoj kaj la placa disko (-3) gajnu ce vojkapoj.
  supraMaterialo.polygonOffset = true; supraMaterialo.polygonOffsetFactor = -2; supraMaterialo.polygonOffsetUnits = -1;
  const bordaMaterialo = andezitaMaterialo.clone();
  bordaMaterialo.map = andezitaTeksajxo; bordaMaterialo.needsUpdate = true;
  bordaMaterialo.polygonOffset = true; bordaMaterialo.polygonOffsetFactor = -1; bordaMaterialo.polygonOffsetUnits = -1;

  for ( const def of defs ) {
    // Unuopaj difinoj povas doni propran altan funkcion ( ekz. la arbarvojo
    // malsupreniras al la aprona nivelo cxe la kosmoporda stacio ).
    const defAlt = def.heightFn || heightFn;
    for ( let i = 0; i < def.pts.length - 1; i++ ) {
      const [aX, aZ] = def.pts[i];
      const [bX, bZ] = def.pts[i + 1];
      // Voja surfaco: diorita centro kun andezitaj flankoj APUD gxi — ne plu
      // randa strio tavolita sub la centro. La malnova intertavolo z-fightingis
      // kiam la fotilo rigardis preskaux rekte malsupren ( la minimapo ), kaj
      // la tuta vojo aperis nigra. La tri bendoj nun sidas flank-al-flanke.
      konstruiSegmenton(aX, aZ, bX, bZ, kreiVojajnBendojn(def.w, supraMaterialo, bordaMaterialo), 0o2/0o10, defAlt, sceno);
      // Specimenoj por lampoj — kaj por la vegetajxo-ekskludo: unu specimeno
      // cxiun ~2 unuojn, por ke neniu planto povu sidi inter maldensajn
      // specimenojn kaj aperi sur la vojo.
      const longo = Math.hypot(bX - aX, bZ - aZ);
      const nombro = Math.max(1, Math.round(longo / 2));
      for (let k = 0; k <= nombro; k++) {
        const t = k / nombro;
        const sx = aX + (bX - aX) * t;
        const sz = aZ + (bZ - aZ) * t;
        samples.push(new THREE.Vector3(sx, defAlt(sx, sz), sz));
      }
    }
  }
  return samples;
}

function kreiRondanDiamanton( radiuso: number, dikeco: number ): THREE.ExtrudeGeometry {
  const rondo = radiuso * 0o1/0o4, k = radiuso - rondo;
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

// konstruiPlacojn — Konstruu rondajn kapojn cxe la donitaj rando-nodoj de la
// voja reto, samgrandajn kiel la vojo. T-krucigxoj kaj internaj intersekcoj
// restas liberaj ( la alvokanto donas nur la verajn rando-finojn ).
export function konstruiPlacojn( sceno: THREE.Scene,
  nodes: [number, number][],
  heightFn: (x: number, z: number) => number,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial
): { x: number; z: number }[] {
  const kajoj: { x: number; z: number }[] = [];
  if (nodes.length === 0) return kajoj;

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

  for ( const [bX, bZ] of nodes ) {
    const y = heightFn(bX, bZ) + 0o2/0o10;
    // Samgrandaj kiel la vojo: la disko kongruas kun la diorita surfaco (0o7/0o10
    // duon-larĝo) kaj la ringo kun la andezita bordo (0o13/0o10), kuŝantaj plate.
    const border = new THREE.Mesh( new THREE.RingGeometry(0o7/0o10, 0o13/0o10, 0o40).rotateX(-Math.PI / 2), bordaMaterialo );
    border.position.set( bX, y - 0o3/0o100, bZ );
    border.receiveShadow = true;
    sceno.add( border );
    const placo = new THREE.Mesh( new THREE.CircleGeometry(0o7/0o10, 0o40).rotateX(-Math.PI / 2), placaMaterialo );
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
    const e = 0o1/0o4;
    const gx = ( heightFn( x + e, z ) - heightFn( x - e, z ) ) / ( 2 * e );
    const gz = ( heightFn( x, z + e ) - heightFn( x, z - e ) ) / ( 2 * e );
    const normalo = new THREE.Vector3( -gx, 1, -gz ).normalize();
    // Baza kuŝigo (extrude laux +Z → supren), tiam klino al la terena normalo.
    const klino = new THREE.Quaternion().setFromUnitVectors( new THREE.Vector3( 0, 1, 0 ), normalo );
    const orienti = klino.multiply( new THREE.Quaternion().setFromEuler( new THREE.Euler( -Math.PI / 2, 0, 0 ) ) );

    const suba = new THREE.Mesh( kreiRondanDiamanton( 3, 0o2/0o10 ), subaMaterialo );
    suba.quaternion.copy( orienti );
    suba.position.set( x, y, z );
    suba.receiveShadow = true;
    sceno.add( suba );

    // Supra tavolo kusxas precize sur la suba (laŭ la normalo, ne nura vertikala ofseto).
    const bordo = new THREE.Mesh( kreiRondanDiamanton( 2.6, 0o2/0o10 ), subaMaterialo );
    bordo.quaternion.copy( orienti );
    bordo.position.copy( suba.position ).addScaledVector( normalo, 0o2/0o10 );
    bordo.receiveShadow = true;
    sceno.add( bordo );

    // Diorita centro kun andezita ringo ĉirkaŭe — la sama rando-stilo kiel la vojoj.
    const centro = new THREE.Mesh( kreiRondanDiamanton( 2.2, 0o2/0o10 ), supraMaterialo );
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
  if (longo < 0o4/0o10) return;
  // La porda vojo uzas la saman larghon kiel la regula vojreto.
  const w = 0o16/0o10;
  const dikeco = 0o2/0o10;
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
  // La spronaj bendoj uzas pli altan polygonOffset ol la cefaj vojoj ( -4/-3
  // kontraux -2/-1 ), por ke cxe la kunigxo kun la cefa vojo la sprono gajnu
  // determinite ( neniu z-fighting inter la du vojoj ).
  konstruiSegmenton(x1, z1, x2, z2, kreiVojajnBendojn(w, supraMaterialo, bordaMaterialo), dikeco, heightFn, sceno);
}

// konstruiFontanon — Konstruu placon kun fontana baseno kaj akva surfaco.
export function konstruiFontanon( sceno: THREE.Scene,
  x: number, z: number,
  heightFn: (x: number, z: number) => number,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial,
  oraMaterialo: THREE.MeshStandardMaterial
): THREE.Mesh {
  const y = heightFn(x, z) + 0o2/0o10;
  // Plaza disc
  const placo = new THREE.Mesh( new THREE.CircleGeometry(0o12, 0o60).rotateX(-Math.PI / 2),
    new THREE.MeshStandardMaterial({ color: 0xb8b8b8, roughness: 0o17/0o100, metalness: 0o3/0o100 }) );
  placo.position.set(x, y, z); placo.receiveShadow = true;
  sceno.add(placo);
  // Andezita ringa rando
  const ring = new THREE.Mesh( new THREE.RingGeometry(0o1115/0o100, 0o515/0o40, 0o60).rotateX(-Math.PI / 2), andezitaMaterialo );
  ring.position.set(x, y + 0o3/0o100, z); sceno.add(ring);
  // Basena randa ringo
  const coping = new THREE.Mesh( new THREE.RingGeometry(0o463/0o100, 0o563/0o100, 0o60).rotateX(-Math.PI / 2),
    new THREE.MeshStandardMaterial({ color: 0x586060, roughness: 0o23/0o40 }) );
  coping.position.set(x, y + 0o3/0o100, z); sceno.add(coping);
  // Baseno (malhela enkavita cirklo)
  const basin = new THREE.Mesh( new THREE.CircleGeometry(0o50/0o10, 0o40).rotateX(-Math.PI / 2),
    new THREE.MeshStandardMaterial({ color: 0x203038, roughness: 0o35/0o40 }) );
  basin.position.set(x, y - 0o163/0o100, z); sceno.add(basin);
  // Akva surfaco
  const akvaMaterialo = new THREE.MeshStandardMaterial({
    color: 0x386868, roughness: 0o3/0o40, metalness: 0o23/0o100,
    transparent: true, opacity: 0o6/0o10
  });
  const akvaSurfaco = new THREE.Mesh( new THREE.CircleGeometry(0o223/0o40, 0o40).rotateX(-Math.PI / 2), akvaMaterialo );
  akvaSurfaco.position.set(x, y - 0o5/0o40, z);
  sceno.add(akvaSurfaco);
  return akvaSurfaco;
}
