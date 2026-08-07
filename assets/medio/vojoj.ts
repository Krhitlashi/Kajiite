// Voja modulo — poluritaj dioritaj vojoj kun andezitaj bordoj
// Uzas rektangulajn Shape + ExtrudeGeometry por puraj longaj flankoj ( intersekcoj interkovras )
import * as THREE from "three";
import { kreiDioritanTeksajxon, kreiAndezitanTeksajxon } from "../komunajxoj/teksajxoj.js";

export interface VojDifino { pts: [number, number][]; w: number; heightFn?: (x: number, z: number) => number; }

/**
 * Konstruu ŝtupetan vojan segmenton inter du vojpunktoj.
 * Specimenigas la terenon-altecon ĉiun ~4 unuojn, por ke la vojo nature
 * formu ŝtupojn kie la grundo deklivas kaj restu glata sur ebena grundo.
 */
// Rondigita rektangulo. Nur la kvar anguloj estas rondaj; la vojo ne fariĝas kapsulo.
function kreiRondanRektangulon(w: number, l: number, d: number, radiuso: number): THREE.ExtrudeGeometry {
  const formo = new THREE.Shape();
  const duonW = w / 2, duonL = l / 2;
  // Konservu rektan sekcion ĉe ambaŭ finoj; neniam lasu mallongan ŝtupon fariĝi kapsulo.
  const r = Math.max(0, Math.min(radiuso, duonW, duonL / 2));

  // Kontraŭhorloĝa volvaĵo tenas la supran facon de ExtrudeGeometry supren
  // post la ekzistanta -90° X-rotacio.
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
  // Konektitaj vojo-etendoj restas rektaj; nur la kradaj platoj ricevas rondajn angulojn.
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
  // ExtrudeGeometry kreskas laux loka +Z. Uzu dekstraman bazon. Loka +X estas
  // la larĝa akso, loka +Y sekvas la vojon, kaj loka +Z estas supren.
  // La pli frua renversita meza akso metis la tutan vojon flanke.
  mesh.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(
    flanko, direkto, new THREE.Vector3(0, 1, 0)
  ));
}

function lokigiVojMeshon(mesh: THREE.Mesh, x: number, y: number, z: number): void {
  // La ekstrudo komenciĝas ĉe loka z=0, do ĝia malsupro renkontas la specimenigitan terenon.
  mesh.position.set(x, y, z);
}

// VojBendo — unu longa strio de la voja sekco. Largho kaj ofseto laux la loka
// flank-akso ( la perpendikularo de la voja direkto ). La vojo konsistas el tri
// apudaj bendoj — andezitaj randoj, diorita centro — sen intertavoloj.
interface VojBendo {
  largho: number;
  ofseto: number;
  materialo: THREE.MeshStandardMaterial;
}

// kreiVojajnBendojn — La tri apudajn bendojn de unu vojo. Diorita centro ( w )
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
  if ( longo < 0o1/0o100 ) return;
  // Konservu la originalan ŝtupetan konstruadon. Ĉiu proksimume kvar-unua peco
  // sekvas la saman rektan akson, dum nur la du elmetitaj finoj povas esti
  // rondigitaj. Konektitaj internaj pecoj restas kvadrataj kaj kunigxas pure.
  const steps = Math.max(1, Math.round(longo / 4));
  const pasoLongo = longo / steps;
  for ( let s = 0; s < steps; s++ ) {
    const t0 = s / steps, t1 = (s + 1) / steps;
    const sx1 = x1 + difX * t0, sz1 = z1 + difZ * t0;
    const sx2 = x1 + difX * t1, sz2 = z1 + difZ * t1;
    const movX = (sx1 + sx2) / 2, movZ = (sz1 + sz2) / 2;
    const y = heightFn(movX, movZ);
    for ( const bendo of bendoj ) {
      // Vojaj ŝtupoj restas kvadrataj, por ke najbaraj pecoj kuniĝu sen ronda kudro.
      const geometrio = kreiSegmentGeometrion(bendo.largho, pasoLongo, dikeco, bendo.ofseto);
      const mesh = new THREE.Mesh(geometrio, bendo.materialo);
      orientiVojMeshon(mesh, difX, difZ);
      lokigiVojMeshon(mesh, movX, y, movZ);
      mesh.receiveShadow = mesh.castShadow = true;
      sceno.add(mesh);
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
  // La bendoj ne plu intertavoligas. PolygonOffset restas por ke la voja
  // CENTRO gajnu super la perpendikularaj bordoj ( la samloke kuŝantaj bendoj
  // de la alia vojo ). Kun egalaj unuoj ( -1/-1 ) la desegna ordo decidis kaj
  // la andezita bordo de la alia vojo fendetis sur la diorita centro ĉe la
  // L-korneroj. La centro nun havas -4 unuojn — tri pli ol la bordoj ( -1 ).
  // Unu-du unuoj da diferenco restis ĉe la precizec-rando ( la gajnanto
  // ŝanceliĝis laŭ la fotila distanco ). Tri unuoj apartigas glate, do la
  // centroj kunfandiĝas pure kaj la bordoj finiĝas ĉe la perpendikulara centro.
  supraMaterialo.polygonOffset = true; supraMaterialo.polygonOffsetFactor = -2; supraMaterialo.polygonOffsetUnits = -4;
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
      // Voja surfaco. Diorita centro kun andezitaj flankoj APUD gxi — ne plu
      // randa strio tavolita sub la centro. La malnova intertavolo z-fightingis
      // kiam la fotilo rigardis preskaux rekte malsupren ( la minimapo ), kaj
      // la tuta vojo aperis nigra. La tri bendoj nun sidas flank-al-flanke.
      konstruiSegmenton(aX, aZ, bX, bZ, kreiVojajnBendojn(def.w, supraMaterialo, bordaMaterialo), 0o2/0o10, defAlt, sceno);
      // Specimenoj por lampoj — kaj por la vegetajxo-ekskludo. Unu specimeno
      // cxiun ~2 unuojn, por ke neniu planto povu sidi inter maldensajn
      // specimenojn kaj aperi sur la vojo.
      const longo = Math.hypot(bX - aX, bZ - aZ);
      const nombro = Math.max(1, Math.round(longo / 2));
      for ( let k = 0; k <= nombro; k++ ) {
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

// konstruiPlacojn FORIGITA — la malnovaj rondigitaj kapoj ( disko + ringo )
// ĉe la vojo-finoj kuŝis SUR la vojoj kaj la tereno samplane, kaj la
// interkovritaj partoj z-flagris laŭ la fotila angulo. La vojoj mem jam
// plenigas ĉiun rando-nodon: ĉe T-kunigo la trapasanta vojo kovras la tutan
// disko-regionon ( la centra bendo estas 0o7/0o10 duon-larĝa, la disko estas
// cirklo de la sama radiuso — plene ene ), kaj la pasanta andezita bordo
// donas la bordon sur la fermita kvara flanko. Neniu ĉapo bezonatas; la
// rando-nodoj restas nur por la lampoj ( placajNodoj en urbo.ts ).

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
    // Inklini la platformon laux la loka terena deklivo. Alie unu flanko flosu
    // super la grundo kaj la alia enfosigxus (la arbara rando deklivas).
    const e = 0o1/0o4;
    const gx = ( heightFn( x + e, z ) - heightFn( x - e, z ) ) / ( 2 * e );
    const gz = ( heightFn( x, z + e ) - heightFn( x, z - e ) ) / ( 2 * e );
    const normalo = new THREE.Vector3( -gx, 1, -gz ).normalize();
    // Baza kuŝigo (extrude laux +Z → supren), tiam klino al la terena normalo.
    const klino = new THREE.Quaternion().setFromUnitVectors( new THREE.Vector3( 0, 1, 0 ), normalo );
    const orienti = klino.multiply( new THREE.Quaternion().setFromEuler( new THREE.Euler( -Math.PI / 2, 0, 0 ) ) );

    const suba = new THREE.Mesh(kreiRondanDiamanton(3, 0o2/0o10), subaMaterialo);
    suba.quaternion.copy(orienti);
    suba.position.set(x, y, z);
    suba.receiveShadow = true;
    sceno.add(suba);

    // Supra tavolo kusxas precize sur la suba ( laŭ la normalo, ne nura vertikala ofseto ).
    const bordo = new THREE.Mesh(kreiRondanDiamanton(0o25/0o10, 0o2/0o10), subaMaterialo);
    bordo.quaternion.copy(orienti);
    bordo.position.copy(suba.position).addScaledVector(normalo, 0o2/0o10);
    bordo.receiveShadow = true;
    sceno.add(bordo);

    // Diorita centro kun andezita ringo ĉirkaŭe — la sama rando-stilo kiel la vojoj.
    const centro = new THREE.Mesh(kreiRondanDiamanton(0o22/0o10, 0o2/0o10), supraMaterialo);
    centro.quaternion.copy(orienti);
    centro.position.copy(bordo.position);
    centro.receiveShadow = centro.castShadow = true;
    sceno.add(centro);
  }
  return lokoj;
}

// konstruiIntersekcajnPlatojn — Kovru ĉiun kruciĝon per unu solida diorita
// plato ( la tuta 0o26/0o10 = 2.75 voja larĝo ) kun kvar andezitaj anguloj
// SUR ĝi. La diorita plato kovras la vojojn ĉe la kruciĝo ( -3/-2 kontraŭ la
// striaj -2/-1 ), do la centro estas unu kontinua diorita placo. La kvar
// angulaj kvadratoj ( 0o4/0o10 = 0.5 ) sidas ĉe la lokoj kie la andezitaj
// randoj de la DU vojoj interkovrus, levitaj je 0o1/0o100 super la plato kaj
// aldoniĝas POST ĝi — la levo ( ne nur la offset ) garantias ke ili ĉiam
// montriĝas, sendepende de la desegna ordo, kaj sen duobla tavolo.
//
// T-kunigoj ricevas la saman platon, sed kun FERMITA flanko — la flanko kie
// la finiĝanta vojo ne daŭrigas ( la direkto de tiu vojo, tFermitaj ). La du
// angulaj kvadratoj de tiu flanko anstataŭiĝas de UNU kontinua andezita strio
// trans la tuta plato-larĝo, ĉe la sama bendo-pozicio kiel la voja bordo
// ( 0o875..0o1375 de la centro ) — la tria vojo ne lasas la kruciĝon malfermita
// sen bordo, kaj la trapasanta voja bordo daŭriĝas kontinue tra la kruciĝo.
export function konstruiIntersekcajnPlatojn( sceno: THREE.Scene,
  punktoj: [ number, number ][],
  heightFn: ( x: number, z: number ) => number,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial,
  tFermitaj: Map<string, [ number, number ]> = new Map()
): void {
  if ( punktoj.length === 0 ) return;
  const dioritaTx = kreiDioritanTeksajxon();
  const andezitaTx = kreiAndezitanTeksajxon();
  const supraMaterialo = dioritaMaterialo.clone();
  supraMaterialo.map = dioritaTx; supraMaterialo.needsUpdate = true;
  supraMaterialo.polygonOffset = true; supraMaterialo.polygonOffsetFactor = -3; supraMaterialo.polygonOffsetUnits = -2;
  const bordaMaterialo = andezitaMaterialo.clone();
  bordaMaterialo.map = andezitaTx; bordaMaterialo.needsUpdate = true;
  bordaMaterialo.polygonOffset = true; bordaMaterialo.polygonOffsetFactor = -4; bordaMaterialo.polygonOffsetUnits = -2;
  // La anguloj sidas ĉe wb/2 - angulo/2 = 1.125 de la centro, do ĉiu kvadrato
  // kovras [ 0.875, 1.375 ] — la saman regionon kiel la duoblaj vojo-randoj.
  const wb = 0o26/0o10, angulaLargho = 0o4/0o10, dikeco = 0o2/0o10, r = 0;
  const angulaOfseto = wb / 2 - angulaLargho / 2;
  for ( const [ x, z ] of punktoj ) {
    const y = heightFn( x, z );
    const platoGeo = kreiRondanRektangulon( wb, wb, dikeco, r );
    platoGeo.rotateX( -Math.PI / 2 );
    const plato = new THREE.Mesh( platoGeo, supraMaterialo );
    // La plato kaj la anguloj sidas LEVITAJ super la vojoj ( 0o1/0o100 kaj
    // 0o1/0o40 ) — la malnova plata plato kuŝis SUR la vojoj samplane kaj la
    // koincidaj facoj z-flagris laŭ la fotila angulo. La levo apartigas ilin
    // fizike — la kruciĝo havas unu kontinuan surfacon super la vojoj.
    plato.position.set( x, y + 0o1/0o100, z );
    plato.receiveShadow = true;
    sceno.add( plato );
    const ferma = tFermitaj.get( x + "," + z );
    if ( ferma ) {
      // T-kunigo — unu kontinua andezita strio trans la FERMITAN flankon ( la
      // direkto de la finiĝanta vojo ) anstataŭ la du angulaj kvadratoj de tiu
      // flanko. La strio sidas ĉe la sama bendo-pozicio kiel la voja bordo kaj
      // trans la tutan plato-larĝon; la du anguloj de la malfermita ( kontraŭa )
      // flanko restas.
      const [ dx, dz ] = ferma;
      const strioGeo = kreiRondanRektangulon( dz !== 0 ? wb : angulaLargho, dz !== 0 ? angulaLargho : wb, dikeco, r );
      strioGeo.rotateX( -Math.PI / 2 );
      const strio = new THREE.Mesh( strioGeo, bordaMaterialo );
      strio.position.set( x + dx * angulaOfseto, y + 0o1/0o40, z + dz * angulaOfseto );
      strio.receiveShadow = true;
      sceno.add( strio );
      for ( const s of [ -1, 1 ] ) {
        const anguloGeo = kreiRondanRektangulon( angulaLargho, angulaLargho, dikeco, r );
        anguloGeo.rotateX( -Math.PI / 2 );
        const anguloMesh = new THREE.Mesh( anguloGeo, bordaMaterialo );
        anguloMesh.position.set(
          x + ( dz !== 0 ? s * angulaOfseto : -dx * angulaOfseto ),
          y + 0o1/0o40,
          z + ( dz !== 0 ? -dz * angulaOfseto : s * angulaOfseto )
        );
        anguloMesh.receiveShadow = true;
        sceno.add( anguloMesh );
      }
    } else {
      // Kvarvoja kruciĝo — kvar angulaj kvadratoj ĉe la kvar diagonalaj anguloj.
      for ( const sx of [ -1, 1 ] ) {
        for ( const sz of [ -1, 1 ] ) {
          const anguloGeo = kreiRondanRektangulon( angulaLargho, angulaLargho, dikeco, r );
          anguloGeo.rotateX( -Math.PI / 2 );
          const anguloMesh = new THREE.Mesh( anguloGeo, bordaMaterialo );
          anguloMesh.position.set( x + sx * angulaOfseto, y + 0o1/0o40, z + sz * angulaOfseto );
          anguloMesh.receiveShadow = true;
          sceno.add( anguloMesh );
        }
      }
    }
  }
}

// kreiKvaronanArkFormon — Kvarona-disko ( la ark-regiono ) en la kvadranto
// ( sx, sz ) de L-kornero. La ŝipo-koordinatoj uzas x = dx kaj y = -dz, do la
// samplado en MALCRESKANTA angulo ( de a1+90° gxis a1 ) donas kontraŭhorloĝan
// volvaĵon — la supra faco supren post la -90° X-rotacio, kiel la vojoj.
function kreiKvaronanArkFormon( radiuso: number, sx: number, sz: number ): THREE.Shape {
  const a1 = sx > 0 ? ( sz > 0 ? 0 : 3 * Math.PI / 2 ) : ( sz > 0 ? Math.PI / 2 : Math.PI );
  const paŝoj = 0o40;
  const formo = new THREE.Shape();
  formo.moveTo( 0, 0 );
  for ( let i = paŝoj; i >= 0; i-- ) {
    const ang = a1 + ( i / paŝoj ) * Math.PI / 2;
    formo.lineTo( radiuso * Math.cos( ang ), -radiuso * Math.sin( ang ) );
  }
  formo.closePath();
  return formo;
}

// kreiRingSektoron — Ring-sektoro ( anulareto ) inter la internaj kaj
// eksteraj radiusoj en la kvadranto ( sx, sz ). La ekstera arko, la interna
// arko kaj la du radiusaj randoj formas unu simplan plurangulon SEN truo.
// La malnova ringo estis kvarona disko kun truo — la truo kaj la ekstera
// formo kunhavigis la originon, la Earcut-ponto igxis degenera, kaj restis
// andezitaj trianguloj EN la diorita disko. La sektoro neniam tusxas la
// originon, do la triangulado restas kompleta en cxiuj kvar kvadrantoj.
function kreiRingSektoron( internaRadiuso: number, eksteraRadiuso: number, sx: number, sz: number ): THREE.Shape {
  const a1 = sx > 0 ? ( sz > 0 ? 0 : 3 * Math.PI / 2 ) : ( sz > 0 ? Math.PI / 2 : Math.PI );
  const paŝoj = 0o40;
  const formo = new THREE.Shape();
  formo.moveTo( internaRadiuso * Math.cos( a1 + Math.PI / 2 ), -internaRadiuso * Math.sin( a1 + Math.PI / 2 ) );
  formo.lineTo( eksteraRadiuso * Math.cos( a1 + Math.PI / 2 ), -eksteraRadiuso * Math.sin( a1 + Math.PI / 2 ) );
  for ( let i = 0; i <= paŝoj; i++ ) {
    const ang = a1 + Math.PI / 2 - ( i / paŝoj ) * Math.PI / 2;
    formo.lineTo( eksteraRadiuso * Math.cos( ang ), -eksteraRadiuso * Math.sin( ang ) );
  }
  formo.lineTo( internaRadiuso * Math.cos( a1 ), -internaRadiuso * Math.sin( a1 ) );
  for ( let i = 0; i <= paŝoj; i++ ) {
    const ang = a1 + ( i / paŝoj ) * Math.PI / 2;
    formo.lineTo( internaRadiuso * Math.cos( ang ), -internaRadiuso * Math.sin( ang ) );
  }
  formo.closePath();
  return formo;
}

// konstruiRondigitanArkon — Rondigita arko ĉe L-kornero de la voja krado
// ( kie AMBAŬ perpendikularaj vojoj finiĝas samloke ). Kvarona-disko kiu
// plenigas la korneran kvadranton inter la du vojoj — diorita centro
// ( 0o7/0o10 ) kun andezita ringo ĝis la voja ekstera rando ( 0o13/0o10 ),
// la samaj larĝoj kiel la voja banda skemo. La arko anstataŭas la du
// interkovritajn cirklajn ĉapojn. Ĝi konektas la vojojn je iliaj eksteraj
// anguloj, do neniu ringo mordas la vojan centron kaj nenia bulgo preterpasas
// la vojon.
//
// La kvarona disko sidas en la LIBERA kornera kvadranto ( la direkto sx/sz )
// — kie NEK vojo etendiĝas: ambaŭ korpoj iras en la kontraŭan kvadranton kaj
// la du vojoj kruciĝas nur en tiu kontraŭa regiono. La disko kaj la ringo
// sidas LEVITAJ 0o1/0o100 super la tereno, do neniu surfaco kuŝas sur alia
// samplane — la libera angulo pleniĝas sen z-flagrado.
export function konstruiRondigitanArkon( sceno: THREE.Scene,
  x: number, z: number, sx: number, sz: number,
  heightFn: ( x: number, z: number ) => number,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial
): void {
  const dioritaTx = kreiDioritanTeksajxon();
  const andezitaTx = kreiAndezitanTeksajxon();
  const supraMaterialo = dioritaMaterialo.clone();
  supraMaterialo.map = dioritaTx; supraMaterialo.needsUpdate = true;
  supraMaterialo.polygonOffset = true; supraMaterialo.polygonOffsetFactor = -3; supraMaterialo.polygonOffsetUnits = -2;
  const bordaMaterialo = andezitaMaterialo.clone();
  bordaMaterialo.map = andezitaTx; bordaMaterialo.needsUpdate = true;
  bordaMaterialo.polygonOffset = true; bordaMaterialo.polygonOffsetFactor = -4; bordaMaterialo.polygonOffsetUnits = -2;
  const y = heightFn( x, z );
  const dikeco = 0o2/0o10;

  // Diorita centro — la kvarona disko en la libera kornera kvadranto.
  const centroFormo = kreiKvaronanArkFormon( 0o7/0o10, sx, sz );
  const centroGeo = new THREE.ExtrudeGeometry( centroFormo, { depth: dikeco, bevelEnabled: false } );
  centroGeo.rotateX( -Math.PI / 2 );
  const centro = new THREE.Mesh( centroGeo, supraMaterialo );
  // La disko sidas LEVITA kiel la ringo ( 0o1/0o100 super la tereno ). La
  // malnova plata disko kuŝis SUR la tereno samplane en la ebena urbo, kaj la
  // du koincidaj surfacoj z-flagris — la levo apartigas ilin fizike.
  centro.position.set( x, y + 0o1/0o100, z );
  centro.receiveShadow = true;
  sceno.add( centro );

  // Andezita ringo — vera ring-sektoro inter 0o7/0o10 kaj 0o13/0o10 ( la
  // samaj radiusoj kiel la voja centro kaj ekstera rando ). La sektoro
  // sekvas la arkon kaj la du radiusajn randojn ( kiuj kuŝas sur la vojo-facoj
  // — samkoloraj, do nevideblaj ) sen iu truo — neniu andezita triangulo
  // eniras la dioritan diskon kaj neniu truo aperas lauxlonge de la randoj.
  const ringFormo = kreiRingSektoron( 0o7/0o10, 0o13/0o10, sx, sz );
  const ringGeo = new THREE.ExtrudeGeometry( ringFormo, { depth: dikeco, bevelEnabled: false } );
  ringGeo.rotateX( -Math.PI / 2 );
  const ringo = new THREE.Mesh( ringGeo, bordaMaterialo );
  ringo.position.set( x, y + 0o1/0o100, z );
  ringo.receiveShadow = true;
  sceno.add( ringo );

  // La ENKOREJA kvadranto ( la kontraŭo de la kornera kvadranto — direkto
  // -sx/-sz ) estas kie la du vojoj fakte renkontiĝas. Iliaj bendoj
  // interkovras tie samplane ( la samaj dioritaj centroj kaj andezitaj bordoj
  // en la sama loko ) kaj la du tavoloj z-flagris laŭ la fotila angulo.
  // Levita kvarona kruciĝo kovras la interkovron per UNU surfaco — diorita
  // kvadrato ( 0o13/0o10 = duono de la voja ekstera larĝo ) kun andezita
  // angulo ĉe la ekstera angulo, la samaj grandecoj kaj altecoj kiel la
  // kruciĝaj platoj ( la vojoj subiras kaj reaperas sub la plato ).
  const kvarono = 0o13/0o10;
  const enaGeo = kreiRondanRektangulon( kvarono, kvarono, dikeco, 0 );
  enaGeo.rotateX( -Math.PI / 2 );
  const ena = new THREE.Mesh( enaGeo, supraMaterialo );
  ena.position.set( x - sx * kvarono / 2, y + 0o1/0o100, z - sz * kvarono / 2 );
  ena.receiveShadow = true;
  sceno.add( ena );
  const angulaLargho = 0o4/0o10, angulaOfseto = 0o11/0o10;
  const anguloGeo = kreiRondanRektangulon( angulaLargho, angulaLargho, dikeco, 0 );
  anguloGeo.rotateX( -Math.PI / 2 );
  const angulo = new THREE.Mesh( anguloGeo, bordaMaterialo );
  angulo.position.set( x - sx * angulaOfseto, y + 0o1/0o40, z - sz * angulaOfseto );
  angulo.receiveShadow = true;
  sceno.add( angulo );
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
  if ( longo < 0o4/0o10 ) return;
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
  // Placa disko
  const placo = new THREE.Mesh(new THREE.CircleGeometry(0o12, 0o60).rotateX(-Math.PI / 2),
    new THREE.MeshStandardMaterial({ color: 0xb8b8b8, roughness: 0o17/0o100, metalness: 0o3/0o100 }));
  placo.position.set(x, y, z); placo.receiveShadow = true;
  sceno.add(placo);
  // Andezita ringa rando
  const ring = new THREE.Mesh(new THREE.RingGeometry(0o1115/0o100, 0o515/0o40, 0o60).rotateX(-Math.PI / 2), andezitaMaterialo);
  ring.position.set(x, y + 0o3/0o100, z); sceno.add(ring);
  // Basena randa ringo
  const coping = new THREE.Mesh(new THREE.RingGeometry(0o463/0o100, 0o563/0o100, 0o60).rotateX(-Math.PI / 2),
    new THREE.MeshStandardMaterial({ color: 0x586060, roughness: 0o23/0o40 }));
  coping.position.set(x, y + 0o3/0o100, z); sceno.add(coping);
  // Baseno ( malhela enkavita cirklo )
  const basin = new THREE.Mesh(new THREE.CircleGeometry(0o50/0o10, 0o40).rotateX(-Math.PI / 2),
    new THREE.MeshStandardMaterial({ color: 0x203038, roughness: 0o35/0o40 }));
  basin.position.set(x, y - 0o163/0o100, z); sceno.add(basin);
  // Akva surfaco
  const akvaMaterialo = new THREE.MeshStandardMaterial({
    color: 0x386868, roughness: 0o3/0o40, metalness: 0o23/0o100,
    transparent: true, opacity: 0o6/0o10
  });
  const akvaSurfaco = new THREE.Mesh(new THREE.CircleGeometry(0o223/0o40, 0o40).rotateX(-Math.PI / 2), akvaMaterialo);
  akvaSurfaco.position.set(x, y - 0o5/0o40, z);
  sceno.add(akvaSurfaco);
  return akvaSurfaco;
}
