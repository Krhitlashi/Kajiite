// Voja modulo — poluritaj dioritaj vojoj kun andezitaj bordoj
// Uzas rektangulajn Shape + ExtrudeGeometry por puraj longaj flankoj ( intersekcoj interkovras )
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { kreiDioritanTeksajxon, kreiAndezitanTeksajxon } from "../komunajxoj/teksajxoj.js";
import { kreiRondigitanRektangulanFormon } from "../komunajxoj/formoj.js";

export interface VojDifino { pts: [ number, number ][]; w: number; heightFn?: ( x: number, z: number ) => number; }

/**
 * Konstruu ŝtupetan vojan segmenton inter du vojpunktoj.
 * Specimenigas la terenon-altecon ĉiun ~4 unuojn, por ke la vojo nature
 * formu ŝtupojn kie la grundo deklivas kaj restu glata sur ebena grundo.
 */
// kreiRondanRektangulon — Rondigita rektangula plato ( la voja kruciĝa plato
// kaj anguloj ). La komuna formo venas el formoj.js ( kreiRondigitan-
// RektangulanFormon ); cxi tiu nur aldonas la ekstrudan dikecon.
function kreiRondanRektangulon(w: number, l: number, d: number, radiuso: number): THREE.ExtrudeGeometry {
  // Konservu rektan sekcion ĉe ambaŭ finoj; neniam lasu mallongan ŝtupon fariĝi kapsulo.
  const r = Math.max(0, Math.min(radiuso, w / 2, l / 4));
  return new THREE.ExtrudeGeometry(kreiRondigitanRektangulanFormon(w, l, r), { depth: d, bevelEnabled: false });
}

// kreiFormonElPunktoj — THREE.Shape el relative punktoj ( Δx, Δz ) ĉirkaŭ la
// origino. La formo-ebeno uzas ( x, -z ) — la sama konvencio kiel la aliaj
// ekstruditaj formoj post rotateX( -π/2 ). La volvaĵo normaliĝas CCW per la
// shoelace-signo — la supra faco supren post la rotacio, sendepende de la
// eniga ordo.
//     @param punktoj ( [ number, number ][] ) - La relative punktoj ( Δx, Δz ).
//     @returns formo ( Shape ) - La formo el la punktoj.
function kreiFormonElPunktoj(punktoj: [ number, number ][]): THREE.Shape {
  const formaj = punktoj.map(p => [ p[0], -p[1] ] as [ number, number ]);
  let areo = 0;
  for ( let i = 0; i < formaj.length; i++ ) {
    const a = formaj[i], b = formaj[( i + 1 ) % formaj.length];
    areo += a[0] * b[1] - b[0] * a[1];
  }
  if ( areo < 0 ) formaj.reverse();
  const formo = new THREE.Shape();
  formo.moveTo(formaj[0][0], formaj[0][1]);
  for ( let i = 1; i < formaj.length; i++ ) formo.lineTo(formaj[i][0], formaj[i][1]);
  formo.closePath();
  return formo;
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

// ⟪ Geometria kunigo 📃 ⟫ — la rultima rentableco de la voja modulo. La voja
// reto generis MILKVOJE da etaj meshoj ( tri bendoj po voja ŝtupo ) kaj la
// foliumilo elspezis plejparte desegnajn alvokojn. Ĉiu konstrua funkcio
// kolektas siajn geometriojn en bufrojn PO MATERIO kaj kunigas ilin
// unufoje — la tuta reto desegnas per DU meshoj ( diorito + andezito ).
// KUNIGO — kombini geometriojn en unu kunigon.

// VojGeometriajBufroj — la kolektaj bufroj de unu konstrua funkcio. Ĉiu
// materialo ricevas sian liston; `aldoni` transformas la geometrion al la
// monda spaco ( matrico anstataŭ mesh-transformo — kunigitaj geometrioj
// devas jam kuŝi ĝuste ) kaj memoras ĝin en la materiala listo.
interface VojGeometriajBufroj {
  listoj: Map<THREE.Material, THREE.BufferGeometry[]>;
  aldoni(geometrio: THREE.BufferGeometry, materialo: THREE.Material, matrico: THREE.Matrix4): void;
  kunigi(sceno: THREE.Scene, kastajOmbroj?: boolean): void;
}

// kreiGeometriajnBufrojn — Nova malplena bufraro. `kunigi` kunfandas ĉiun
// materialan liston per mergeGeometries kaj aldonas UN meshon po materialo
// ( nenio aldoniĝas kiam la listo restas malplena ).
//     @returns bufoj ( VojGeometriajBufroj ) - La bufroj de la konstrua funkcio.
function kreiGeometriajnBufrojn(): VojGeometriajBufroj {
  const listoj = new Map<THREE.Material, THREE.BufferGeometry[]>();
  return {
    listoj,
    aldoni(geometrio: THREE.BufferGeometry, materialo: THREE.Material, matrico: THREE.Matrix4): void {
      if ( matrico ) geometrio.applyMatrix4(matrico);
      let listo = listoj.get(materialo);
      if ( !listo ) { listo = []; listoj.set(materialo, listo); }
      listo.push(geometrio);
    },
    kunigi(sceno: THREE.Scene, kastajOmbroj = true): void {
      for ( const [ materialo, listo ] of listoj ) {
        if ( listo.length === 0 ) continue;
        const kunigita = mergeGeometries(listo, false);
        for ( const g of listo ) g.dispose();
        if ( !kunigita ) continue;
        const mesh = new THREE.Mesh(kunigita, materialo);
        mesh.receiveShadow = true;
        mesh.castShadow = kastajOmbroj;
        sceno.add(mesh);
      }
      listoj.clear();
    },
  };
}

// matricoPor — La monda matrico de voja bendo — la sama orientiĝo kaj
// pozicio kiel la malnovaj per-stupaj meshoj ( orientiVojMeshon + lokigi-
// VojMeshon ), sed ĉirkaŭita en matricon por geometria kunigo.
//     @param dx, dz ( number ) - La voja direkto.
//     @param x, y, z ( number ) - La meza punkto ( la ekstrudo komencighxas cxe loka z=0 ).
//     @returns matrico ( Matrix4 ) - La bazo-orientiĝo + pozicio.
function matricoPor(dx: number, dz: number, x: number, y: number, z: number): THREE.Matrix4 {
  const longo = Math.hypot(dx, dz);
  const direkto = new THREE.Vector3(dx / longo, 0, dz / longo);
  const flanko = new THREE.Vector3(-direkto.z, 0, direkto.x);
  const matrico = new THREE.Matrix4().makeBasis(flanko, direkto, new THREE.Vector3(0, 1, 0));
  matrico.setPosition(x, y, z);
  return matrico;
}

// ANGULA_PROVOLIRO — La provoliro de la angulaj specimenadoj ( la punktoj
// de la rando de la bendo malproksimaj de la centro ). La pinto estas la
// maksimuma angula alto + eta levo, la enfosita profundo kreskas je la
// disvastiĝo inter la altaj kaj malaltaj anguloj + margxeno.
const ANGULA_PROVOLIRO = 0o1/0o4;

// SOJA_SXVIPADO — La falso-sojo de la DISKRETAJ ŝtupoj. Kiam la tereno falas
// pli ol ĉi tiu alteco ene de UNU intervalo ( ~4 unuoj ), la ŝtupo fariĝas
// plata eskalero ( la supro sidas je la alta rando, la vizaĝo tranĉas la
// deklivon ) — sub la sojo la ŝtupo KLINIĜAS kaj la vojo fluas glate.
const SOJA_SXVIPADO = 0o2;

// specimeniAngulojn — La maksimuman kaj minimuman teren-altojn super la
// kvar anguloj de rektangulo ( la voja ŝtupo aŭ la kruciĝa plato ).
// La voja ŝtupo sidas je la maksimumo ( ĉiam super la grundo ) kaj la
// ekstruda profundo kovras la malaltajn angulojn ( ĉiam enfosita ).
//     @param x, z ( number ) - La centro de la rektangulo.
//     @param duonX, duonZ ( number ) - La duon-ampleksoj laux la mondaj aksoj.
//     @param heightFn ( ( x, z ) => number ) - La terena alteco.
//     @returns altoj ( { maksimumo, minimumo } ) - La angulaj ekstremoj.
function specimeniAngulojn(x: number, z: number, duonX: number, duonZ: number,
  heightFn: ( x: number, z: number ) => number
): { maksimumo: number; minimumo: number } {
  let maksimumo = -Infinity, minimumo = Infinity;
  for ( const sx of [ -duonX, duonX ] ) {
    for ( const sz of [ -duonZ, duonZ ] ) {
      const h = heightFn(x + sx, z + sz);
      if ( h > maksimumo ) maksimumo = h;
      if ( h < minimumo ) minimumo = h;
    }
  }
  return { maksimumo, minimumo };
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
function kreiVojajnBendojn(w: number,
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

// kreiVojojnMaterialojn — Klonitaj voja materialoj kun siaj teksajxoj kaj
// polygonOffset. La bazo-materialoj ( diorita/andezita ) estas komunaj tra la
// mondo, do cxiu uzanto klonas ilin kaj aldonas la teksajxon kaj la offset-
// valorojn — la SAMA agordo en konstruiVojojn, konstruiIntersekcajnPlatojn,
// konstruiRondigitanArkon kaj konstruiSpronon.
//     @param dioritaMaterialo ( MeshStandardMaterial ) - La baza diorita materialo.
//     @param andezitaMaterialo ( MeshStandardMaterial ) - La baza andezita materialo.
//     @param centraF ( number ) - La polygonOffset-faktoro de la diorita centro.
//     @param centraU ( number ) - La polygonOffset-unuoj de la diorita centro.
//     @param bordoF ( number ) - La polygonOffset-faktoro de la andezita bordo.
//     @param bordoU ( number ) - La polygonOffset-unuoj de la andezita bordo.
//     @returns materialoj ( { supraMaterialo, bordaMaterialo } ) - La klonoj.
function kreiVojojnMaterialojn(dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial,
  centraF: number, centraU: number,
  bordoF: number, bordoU: number
): { supraMaterialo: THREE.MeshStandardMaterial; bordaMaterialo: THREE.MeshStandardMaterial } {
  const dioritaTx = kreiDioritanTeksajxon();
  const andezitaTx = kreiAndezitanTeksajxon();
  const supraMaterialo = dioritaMaterialo.clone();
  supraMaterialo.map = dioritaTx; supraMaterialo.needsUpdate = true;
  supraMaterialo.polygonOffset = true; supraMaterialo.polygonOffsetFactor = centraF; supraMaterialo.polygonOffsetUnits = centraU;
  const bordaMaterialo = andezitaMaterialo.clone();
  bordaMaterialo.map = andezitaTx; bordaMaterialo.needsUpdate = true;
  bordaMaterialo.polygonOffset = true; bordaMaterialo.polygonOffsetFactor = bordoF; bordaMaterialo.polygonOffsetUnits = bordoU;
  return { supraMaterialo, bordaMaterialo };
}

// konstruiSegmenton — Konstruu unu vojan segmenton ( la spronoj ). La ŝtupa
// logiko vivas en konstruiSegmentonEnBufrojn — la KOMUNA glata generacio de
// la ĉefaj vojoj kaj la spronoj ( neniu duobla kopio ). Ĉi tiu envolvaĵo
// kreas proprajn bufrojn kaj kunigas ilin post la konstruado.
//     @param x1, z1, x2, z2 ( number ) - La segmenta komenco kaj fino.
//     @param bendoj ( VojBendo[] ) - La bendoj de la voja sekco.
//     @param dikecoBaza ( number ) - La baza benda dikeco.
//     @param heightFn ( ( x, z ) => number ) - La terena alteco.
//     @param sceno ( Scene ) - La sceno.
//     @returns nenio
function konstruiSegmenton(x1: number, z1: number, x2: number, z2: number,
  bendoj: VojBendo[],
  dikecoBaza: number,
  heightFn: ( x: number, z: number ) => number,
  sceno: THREE.Scene
): void {
  const bufroj = kreiGeometriajnBufrojn();
  konstruiSegmentonEnBufrojn(x1, z1, x2, z2, bendoj, dikecoBaza, heightFn, bufroj);
  bufroj.kunigi(sceno);
}

// konstruiVojojn — Konstruu cxiujn vojsegmentojn kun dioritaj suprajoj kaj andezitaj randoj.
export function konstruiVojojn(sceno: THREE.Scene,
  defs: VojDifino[],
  heightFn: ( x: number, z: number ) => number,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial
): THREE.Vector3[] {
  const samples: THREE.Vector3[] = [];
  // La bendoj ne plu intertavoligas. PolygonOffset restas por ke la voja
  // CENTRO gajnu super la perpendikularaj bordoj ( la samloke kuŝantaj bendoj
  // de la alia vojo ). Kun egalaj unuoj ( -1/-1 ) la desegna ordo decidis kaj
  // la andezita bordo de la alia vojo fendetis sur la diorita centro ĉe la
  // L-korneroj. La centro nun havas -4 unuojn — tri pli ol la bordoj ( -1 ).
  // Unu-du unuoj da diferenco restis ĉe la precizec-rando ( la gajnanto
  // ŝanceliĝis laŭ la fotila distanco ). Tri unuoj apartigas glate, do la
  // centroj kunfandiĝas pure kaj la bordoj finiĝas ĉe la perpendikulara centro.
  const { supraMaterialo, bordaMaterialo } = kreiVojojnMaterialojn(dioritaMaterialo, andezitaMaterialo, -2, -4, -1, -1);

  // La tuta reto konstruiĝas en DU bufroj — unu po materialo — kaj kunigas
  // unufoje ĉe la fino. La miloj da etaj per-ŝtupaj meshoj fariĝas DU
  // desegnajn alvokojn por la tuta voja reto.
  const bufroj = kreiGeometriajnBufrojn();
  for ( const def of defs ) {
    // Unuopaj difinoj povas doni propran altan funkcion ( ekz. la arbarvojo
    // malsupreniras al la aprona nivelo cxe la kosmoporda stacio ).
    const defAlt = def.heightFn || heightFn;
    for ( let i = 0; i < def.pts.length - 1; i++ ) {
      const [ aX, aZ ] = def.pts[i];
      const [ bX, bZ ] = def.pts[i + 1];
      // Voja surfaco. Diorita centro kun andezitaj flankoj APUD gxi — ne plu
      // randa strio tavolita sub la centro. La malnova intertavolo z-fightingis
      // kiam la fotilo rigardis preskaux rekte malsupren ( la minimapo ), kaj
      // la tuta vojo aperis nigra. La tri bendoj nun sidas flank-al-flanke.
      konstruiSegmentonEnBufrojn(aX, aZ, bX, bZ, kreiVojajnBendojn(def.w, supraMaterialo, bordaMaterialo), 0o2/0o10, defAlt, bufroj);
      // Specimenoj por lampoj — kaj por la vegetajxo-ekskludo. Unu specimeno
      // cxiun ~2 unuojn, por ke neniu planto povu sidi inter maldensajn
      // specimenojn kaj aperi sur la vojo.
      const longo = Math.hypot(bX - aX, bZ - aZ);
      const nombro = Math.max(1, Math.round(longo / 2));
      for ( let k = 0; k <= nombro; k++ ) {
        const t = k / nombro;
        const sx = aX + ( bX - aX ) * t;
        const sz = aZ + ( bZ - aZ ) * t;
        samples.push(new THREE.Vector3(sx, defAlt(sx, sz), sz));
      }
    }
  }
  bufroj.kunigi(sceno);
  return samples;
}

// konstruiSegmentonEnBufrojn — La buffer-a internaĵo de konstruiSegmenton.
// La ĉefaj vojoj kolektas ĉiujn difinojn en KOMUNAJN bufrojn ( unu po
// materialo por la tuta reto ) kaj la spronoj kunigas per sia propra bufraro.
// ⟨ GLATA generacio ⟩ — ĉiu ŝtupo specimenas la du RANDOJ ( la komenco kaj
// la fino — la maksimuman kaj minimuman teren-altojn de iliaj lateralaj
// anguloj ) kaj KLINIĜAS inter la du randaj niveloj — dekliva plana supro
// kiu precize kunigas la najbarajn ŝtupojn ĉe la komuna rando ( la najbaroj
// kunhavas la randan specimenon ). Nur kiam la tereno falas pli ol
// SOJA_SXVIPADO ene de unu intervalo, la ŝtupo fariĝas DISKRETA eskalero
// ( plata supro je la alta rando, la vizaĝo tranĉas la deklivon ). La
// profundo ĉiam etendiĝas sub la minimuman randan altecon + margxeno —
// neniu ŝvebanta rando kaj neniu sinko.
function konstruiSegmentonEnBufrojn(x1: number, z1: number, x2: number, z2: number,
  bendoj: VojBendo[],
  dikecoBaza: number,
  heightFn: ( x: number, z: number ) => number,
  bufroj: VojGeometriajBufroj
): void {
  const difX = x2 - x1, difZ = z2 - z1;
  const longo = Math.hypot(difX, difZ);
  if ( longo < 0o1/0o100 ) return;
  const steps = Math.max(1, Math.round(longo / 4));
  const pasoLongo = longo / steps;
  const ndx = difX / longo, ndz = difZ / longo;
  // La ekstera benda duon-largho — la randaj specimenadoj kovras la tutan sekcon.
  let eksteraDuon = 0;
  for ( const bendo of bendoj ) {
    const rando = Math.abs(bendo.ofseto) + bendo.largho / 2;
    if ( rando > eksteraDuon ) eksteraDuon = rando;
  }
  // La laterala duon-vektoro ( ⊥ al la voja direkto ) — la du anguloj de
  // ĉiu rando sidas je ± ĉi tiu de la randa centro.
  const latX = -ndz * eksteraDuon, latZ = ndx * eksteraDuon;
  for ( let s = 0; s < steps; s++ ) {
    const t0 = s / steps, t1 = ( s + 1 ) / steps;
    const sx1 = x1 + difX * t0, sz1 = z1 + difZ * t0;
    const sx2 = x1 + difX * t1, sz2 = z1 + difZ * t1;
    const movX = ( sx1 + sx2 ) / 2, movZ = ( sz1 + sz2 ) / 2;
    // ⟨ Randaj specimenadoj ⟩ — la maksimuman kaj minimuman teren-altojn de
    // la du lateralaj anguloj de ĉiu rando. La najbara ŝtupo specimenas LA
    // SAMAJN punktojn ĉe la komuna rando — la supro daŭriĝas kontinue.
    const h0a = heightFn(sx1 - latX, sz1 - latZ);
    const h0b = heightFn(sx1 + latX, sz1 + latZ);
    const h1a = heightFn(sx2 - latX, sz2 - latZ);
    const h1b = heightFn(sx2 + latX, sz2 + latZ);
    const maks0 = Math.max(h0a, h0b), minimum0 = Math.min(h0a, h0b);
    const maks1 = Math.max(h1a, h1b), minimum1 = Math.min(h1a, h1b);
    const s0 = maks0 + 0o1/0o100 + dikecoBaza;
    const s1 = maks1 + 0o1/0o100 + dikecoBaza;
    const difo = s1 - s0;
    if ( difo < -SOJA_SXVIPADO ) {
      // ⟨ Eskalera ŝtupo ⟩ — la tereno falas pli ol SOJA_SXVIPADO ene de unu
      // intervalo. Plata supro je la ALTA rando ( la sama nivelo kiel la
      // klinita rando de la antaŭa ŝtupo — la transiro restas preciza ) kaj
      // profundo ĝis sub la minimuman angulan altecon + margxeno — la
      // vertikala vizaĝo montras la andezitan/dioritan bordon kiel la
      // eskalera riso.
      const supro = s0;
      const dikeco = supro - ( Math.min(minimum0, minimum1) - ANGULA_PROVOLIRO );
      const y = supro - dikeco;
      for ( const bendo of bendoj ) {
        const geometrio = kreiSegmentGeometrion(bendo.largho, pasoLongo, dikeco, bendo.ofseto);
        bufroj.aldoni(geometrio, bendo.materialo, matricoPor(difX, difZ, movX, y, movZ));
      }
    } else {
      // ⟨ Klinita ŝtupo ⟩ — la supro klino de s0 ( la komenc-rando ) ĝis s1
      // ( la fin-rando ). La geometrio longiĝas al la dekliva longo kaj
      // turniĝas je la dekliva angulo ĉirkaŭ la laterala akso — la
      // horizontalan pied-signon restas ekzakte pasoLongo kaj la randaj
      // suproj restas ekzakte s0 kaj s1 ( sin(ang) = difo / klinoL ). La
      // profundo entombiĝas sub ambaŭ randaj minimumoj + margxeno.
      const klinoL = Math.hypot(pasoLongo, difo);
      const ang = Math.atan2(difo, pasoLongo);
      const dikeco = ( Math.max(s0 - minimum0, s1 - minimum1) + ANGULA_PROVOLIRO ) / Math.cos(ang);
      const y = ( s0 + s1 ) / 2 - dikeco * Math.cos(ang);
      for ( const bendo of bendoj ) {
        const geometrio = kreiSegmentGeometrion(bendo.largho, klinoL, dikeco, bendo.ofseto);
        geometrio.rotateX(ang);
        bufroj.aldoni(geometrio, bendo.materialo, matricoPor(difX, difZ, movX, y, movZ));
      }
    }
  }
}

function kreiRondanDiamanton(radiuso: number, dikeco: number): THREE.ExtrudeGeometry {
  const rondo = radiuso * 0o1/0o4, k = radiuso - rondo;
  const formo = new THREE.Shape();
  // Ferma vojo el kvar egalaj rondigitaj anguloj. La malnova fermo komencigxis
  // interne kaj krampe tranĉis la malsupran-dekstran randon (paperklipa fermo).
  formo.moveTo(rondo, -k);
  formo.lineTo(k, -rondo);
  formo.quadraticCurveTo(radiuso, 0, k, rondo);
  formo.lineTo(rondo, k);
  formo.quadraticCurveTo(0, radiuso, -rondo, k);
  formo.lineTo(-k, rondo);
  formo.quadraticCurveTo(-radiuso, 0, -k, -rondo);
  formo.lineTo(-rondo, -k);
  formo.quadraticCurveTo(0, -radiuso, rondo, -k);
  formo.closePath();
  return new THREE.ExtrudeGeometry(formo, { depth: dikeco, bevelEnabled: false });
}

// konstruiPlacojn FORIGITA — la malnovaj rondigitaj kapoj ( disko + ringo ) ĉe la vojo-finoj
// kuŝis SUR la vojoj kaj la tereno samplane, kaj la interkovritaj partoj z-flagris laŭ la
// fotila angulo. La vojoj mem jam plenigas ĉiun rando-nodon. ĉe T-kunigo la trapasanta vojo
// kovras la tutan disko-regionon ( la centra bendo estas 0o7/0o10 duon-larĝa, la disko estas
// cirklo de la sama radiuso — plene ene ), kaj la pasanta andezita bordo donas la bordon sur
// la fermita kvara flanko. Neniu ĉapo bezonatas; la rando-nodoj restas nur por la lampoj (
// placajNodoj en urbo.ts ). Nur la doka bordo ( la kajo-finoj kaj la dokaj landrandoj )
// ricevas novajn kapojn — tiuj nodoj havas nek arkon nek platon, kaj la polygonOffset-
// hierarkio en konstruiRondajnKapojn apartigas ilin de la vojoj.

// kreiDuonrondanFormon — Duoncirkla formo ( la ĉapa duondisko aŭ duonringo )
// en la duon-ebeno de la MUNDA direkto ( dx, dz ). la rekta flanko pasas tra
// la origino perpendikulare al la direkto, kaj la arko elstaras en la
// direkto. La sama orientiĝo kiel la aliaj vojoj ( ExtrudeGeometry +
// rotateX -90° ). la formo sidas en la XZ-ebeno, la ekstrudo kreskas supren
// per la voja dikeco, kaj la videbla supro sidas ĉe la pozicio + dikeco kun
// la muroj pendantaj sub ĝi. La truo ( duonringo ) estas 0o1/0o100 ENIGITA
// al la arko, por ke ĝia rekta flanko ne kuŝu sur la ekstera rekta flanko (
// Earcut alie ne tranĉus la truon — la koincidaj rektoj malsukcesigis la
// ponton ).
function kreiDuonrondanFormon(internaRadiuso: number, eksteraRadiuso: number, dx: number, dz: number): THREE.Shape {
  const paŝoj = 0o40;
  const aMezo = Math.atan2(dz, dx);
  const punkto = ( radiuso: number, ang: number ): [ number, number ] =>
    [ radiuso * Math.cos(ang), -radiuso * Math.sin(ang) ];
  const formo = new THREE.Shape();
  const eksteraj: [ number, number ][] = [];
  for ( let i = paŝoj; i >= 0; i-- ) {
    eksteraj.push(punkto(eksteraRadiuso, aMezo + Math.PI / 2 - ( i / paŝoj ) * Math.PI));
  }
  formo.moveTo(eksteraj[0][0], eksteraj[0][1]);
  for ( let i = 1; i < eksteraj.length; i++ ) formo.lineTo(eksteraj[i][0], eksteraj[i][1]);
  formo.closePath();
  if ( internaRadiuso > 0 ) {
    const enu = 0o1/0o100;
    const truo = new THREE.Path();
    const internaj: [ number, number ][] = [];
    for ( let i = 0; i <= paŝoj; i++ ) {
      internaj.push(punkto(internaRadiuso, aMezo - Math.PI / 2 + ( i / paŝoj ) * Math.PI));
    }
    for ( const p of internaj ) { p[0] += enu * dx; p[1] -= enu * dz; }
    truo.moveTo(internaj[0][0], internaj[0][1]);
    for ( let i = 1; i < internaj.length; i++ ) truo.lineTo(internaj[i][0], internaj[i][1]);
    truo.closePath();
    formo.holes.push(truo);
  }
  return formo;
}

// kreiRondanKapGeometrion — Ekstrudita DUONCIRKLO ( duondisko aŭ duonringo )
// por la ĉapoj ĉe la doka bordo, elstaranta en la monda direkto ( dx, dz ).
function kreiRondanKapGeometrion(internaRadiuso: number, eksteraRadiuso: number, dikeco: number, dx: number, dz: number): THREE.ExtrudeGeometry {
  const geometrio = new THREE.ExtrudeGeometry(kreiDuonrondanFormon(internaRadiuso, eksteraRadiuso, dx, dz), { depth: dikeco, bevelEnabled: false, curveSegments: 0o40 });
  geometrio.rotateX(-Math.PI / 2);
  return geometrio;
}

// konstruiRondajnKapojn — DUONCIRKLAJ ĉapoj ĉe la donitaj vojo-finoj de la
// doka bordo, elstarantaj en la direkto kiu daŭrigas la vojon. la du
// kajo-finoj ( okcidente en la arbaro, oriente sur la seka bordo ) bulas
// preter la fino, kaj la tri dokaj landrandoj bulas SUDEN sur la platformon
// ( la doko estas voja etendo, do la ĉapo rondigas la transiron ). La disko
// ( 0o7/0o10 = la diorita centro ) kaj la ringo ( 0o7/0o10..0o13/0o10 = la
// andezita bordo ) estas EKSTRUDITAJ per la sama dikeco kiel la voja strio
// ( 0o2/0o10 ) kaj poziciitaj ĉe la terena nivelo. la videbla supro sidas
// ĉe la voja supro-nivelo ( tereno + 0o2/0o10 ) kaj la 0o2/0o10-altaj muroj
// pendas de ĝi ĝis la tereno — ĝuste kiel la vojoj, do la ĉapoj montras
// verajn 3D-flankajn murojn, ne plu platajn 2D-diskojn kaj -ringojn. Kie la
// ĉapoj interkovras la vojon, la polygonOffset-hierarkio decidas la
// koincidajn facojn. la disko ( -4/-2, la sama kiel la spronoj ) gajnas
// super la voja centro ( -2/-1 ), kaj la ringo ( -1/-1 ) malgajnas kontraŭ
// la vojo kaj la disko — la andezita ringo montriĝas nur preter la voja
// rando, kiel la rondigita bordo de la ĉapo. La ĉapoj de ĉiuj nodoj
// kunigas po materialo ( du desegnaj alvokoj anstataŭ du po nodo ).
//     @param sceno ( Scene ) - La sceno.
//     @param nodoj ( [ number, number ][] ) - La vojo-finoj.
//     @param direktoj ( [ number, number ][] ) - La elstara direkto de ĉiu
//         ĉapo ( normaligita aŭ ne ) — paralela al la voja daŭrigo.
//     @param heightFn ( ( x, z ) => number ) - La terena alteco.
//     @param dioritaMaterialo ( MeshStandardMaterial ) - La baza diorita materialo.
//     @param andezitaMaterialo ( MeshStandardMaterial ) - La baza andezita materialo.
//     @returns nenio
export function konstruiRondajnKapojn(sceno: THREE.Scene,
  nodoj: [ number, number ][],
  direktoj: [ number, number ][],
  heightFn: ( x: number, z: number ) => number,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial
): void {
  if ( nodoj.length === 0 ) return;
  const dikeco = 0o2/0o10;
  // La disko uzas la saman pli altan offseton kiel la spronoj ( -4/-2 kontraux
  // la striaj -2/-1 ) — la koincidaj facoj kun la voja supro gajnas determinite.
  const { supraMaterialo, bordaMaterialo } = kreiVojojnMaterialojn(dioritaMaterialo, andezitaMaterialo, -4, -2, -1, -1);
  const bufroj = kreiGeometriajnBufrojn();
  for ( let i = 0; i < nodoj.length; i++ ) {
    const [ x, z ] = nodoj[i];
    const [ dx, dz ] = direktoj[i];
    // La SUPRO restas je la originala nivelo ( tereno + dikeco ) — la ĉapo
    // kongruas kun la voja strio. Nur la profundo etendiĝas sub la
    // minimuman angulan altecon + margxeno — la muroj ĉiam enfosiĝas.
    const terenaY = heightFn(x, z);
    const altoj = specimeniAngulojn(x, z, 0o13/0o10, 0o13/0o10, heightFn);
    const kapDikeco = dikeco + ( terenaY + dikeco - altoj.minimumo ) + ANGULA_PROVOLIRO;
    const y = terenaY + dikeco - kapDikeco;
    bufroj.aldoni(kreiRondanKapGeometrion(0o7/0o10, 0o13/0o10, kapDikeco, dx, dz), bordaMaterialo, new THREE.Matrix4().makeTranslation(x, y, z));
    bufroj.aldoni(kreiRondanKapGeometrion(0, 0o7/0o10, kapDikeco, dx, dz), supraMaterialo, new THREE.Matrix4().makeTranslation(x, y, z));
  }
  // La ĉapoj restas RICEVAJ ombroj — kaj la ombro-elfluado de la kunigitaj
  // surfacoj kaj la malnova kasto estas ĉi tie nenia ( la ĉapoj sidas samloke
  // kun la vojoj, kastigi la ombrojn de la vojo mem ne havas sencon ).
  bufroj.kunigi(sceno, false);
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

  const bufroj = kreiGeometriajnBufrojn();
  for ( const [ x, z ] of lokoj ) {
    const y = heightFn(x, z);
    // Inklini la platformon laux la loka terena deklivo. Alie unu flanko flosu
    // super la grundo kaj la alia enfosigxus (la arbara rando deklivas).
    const e = 0o1/0o4;
    const gx = ( heightFn(x + e, z) - heightFn(x - e, z) ) / ( 2 * e );
    const gz = ( heightFn(x, z + e) - heightFn(x, z - e) ) / ( 2 * e );
    const normalo = new THREE.Vector3(-gx, 1, -gz).normalize();
    // Baza kuŝigo (extrude laux +Z → supren), tiam klino al la terena normalo.
    const klino = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), normalo);
    const orienti = klino.multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0)));
    const matrico = new THREE.Matrix4().makeRotationFromQuaternion(orienti).setPosition(x, y, z);

    bufroj.aldoni(kreiRondanDiamanton(3, 0o2/0o10), subaMaterialo, matrico);

    // Supra tavolo kusxas precize sur la suba ( laŭ la normalo, ne nura vertikala ofseto ).
    const bordoMatrico = matrico.clone().multiply(new THREE.Matrix4().makeTranslation(0, 0, 0o2/0o10));
    bufroj.aldoni(kreiRondanDiamanton(0o25/0o10, 0o2/0o10), subaMaterialo, bordoMatrico);

    // Diorita centro kun andezita ringo ĉirkaŭe — la sama rando-stilo kiel la vojoj.
    bufroj.aldoni(kreiRondanDiamanton(0o22/0o10, 0o2/0o10), supraMaterialo, bordoMatrico);
  }
  bufroj.kunigi(sceno);
  return lokoj;
}

// konstruiIntersekcajnPlatojn — Kovru ĉiun kruciĝon per unu solida plato (
// la tuta 0o26/0o10 = 2.75 voja larĝo ) kies anglaj regionoj MEM estas
// andezitaj. La diorita parto estas ENTAJPITA — la kvar angulaj kvadratoj (
// 0o4/0o10 = 0.5, kie la andezitaj randoj de la DU vojoj interkovrus ) estas
// eltranĉitaj el ĝia formo — kaj solidaj andezitaj blokoj plenigas la
// eltranĉojn precize ( la sama supro kaj la sama bazo kiel la plato ). La
// pecoj najbaras sen interkovri — ili kunhavas nur RANDOJN, ne areojn — do
// neniu koincidaj-supraj-facoj batalo ekzistas kaj la andezitaj anguloj
// montriĝas determinisme, sen offset-hierarĥio inter la du materialoj.
//
// T-kunigoj ricevas la saman entajpitan platon, sed kun FERMITA flanko — la
// flanko kie la finiĝanta vojo ne daŭrigas ( la direkto de tiu vojo,
// tFermitaj ). La tuta bando de tiu flanko ( trans la plato-larĝo, ĉe la
// sama bendo-pozicio kiel la voja bordo — 0o875..0o1375 de la centro )
// eltranĉiĝas kaj UNU kontinua andezita bloko plenigas ĝin — la tria vojo ne
// lasas la kruciĝon malfermita sen bordo, kaj la trapasanta voja bordo
// daŭriĝas kontinue tra la kruciĝo.
//
// La platoj de ĉiuj kruciĝoj kunigas po materialo ( du desegnaj alvokoj
// anstataŭ kvin po plato ). La SUPRO restas je la malalta originala nivelo
// en plata tereno ( tereno + dikeco ) kaj leviĝas ĝis la maksimuma angula
// alto nur en deklivoj — la andezitaj blokoj sekvas la saman supron kiel
// partoj de la plato mem; la profundo etendiĝas sub la terenon ( la sama
// konformeco kiel la vojaj ŝtupoj ).
export function konstruiIntersekcajnPlatojn(sceno: THREE.Scene,
  punktoj: [ number, number ][],
  heightFn: ( x: number, z: number ) => number,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial,
  tFermitaj: Map<string, [ number, number ]> = new Map()
): void {
  if ( punktoj.length === 0 ) return;
  // La platoj kaj arkoj sidas super la vojoj — pli alta offset ( -3/-2 kontraŭ
  // la striaj -2/-1 ), por ke la centro estu unu kontinua diorita placo. La
  // andezitaj blokoj uzas la samajn tri kromajn unuojn ( -4/-5 ) — la vojaj
  // bendoj pasas sub ili samnivele kaj la pli forta offset gajnas
  // determinisme ( la kunmateriala ligo kun la voja bordo estus tamen
  // nevidebla, ĉar ambaŭ estas andezito ).
  const { supraMaterialo, bordaMaterialo } = kreiVojojnMaterialojn(dioritaMaterialo, andezitaMaterialo, -3, -2, -4, -5);
  // La anguloj sidas ĉe wb/2 - angulo/2 = 1.125 de la centro, do ĉiu kvadrato
  // kovras [ 0.875, 1.375 ] — la saman regionon kiel la duoblaj vojo-randoj.
  const wb = 0o26/0o10, angulaLargho = 0o4/0o10, dikeco = 0o2/0o10;
  const angulaOfseto = wb / 2 - angulaLargho / 2;
  const duon = wb / 2, interna = duon - angulaLargho;
  const bufroj = kreiGeometriajnBufrojn();
  for ( const [ x, z ] of punktoj ) {
    // ⟨ Angula specimenado ⟩ — la SUPRO restas je la malalta originala
    // nivelo ( tereno + dikeco ) kaj leviĝas ĝis la maksimuma angula alto
    // nur en deklivoj — la kvar andezitaj anguloj montriĝas super ĝi. La
    // profundo etendiĝas sub la minimuman angulan altecon + margxeno — la
    // flankaj muroj ĉiam enfosiĝas ( neniu ŝvebanta rando ).
    const altoj = specimeniAngulojn(x, z, duon, duon, heightFn);
    const supro = Math.max(heightFn(x, z) + 0o1/0o100 + dikeco, altoj.maksimumo + 0o1/0o100 + dikeco);
    const platoDikeco = supro - ( altoj.minimumo - ANGULA_PROVOLIRO );
    const bazo = supro - platoDikeco;
    const ferma = tFermitaj.get(x + "," + z);
    // ⟨ Entajpita plato ⟩ — la andezitaj regionoj estas ELTRANĈITAJ el la
    // diorita formo kaj solidaj andezitaj blokoj plenigas la eltranĉojn
    // precize ( la sama supro kaj la sama bazo kiel la plato ). La pecoj
    // najbaras sen interkovri, do neniu koincidaj-facoj batalo ekzistas —
    // la anguloj estas la plato mem, ne tavoloj surmetitaj super ĝi.
    let relativaj: [ number, number ][];
    if ( ferma ) {
      // T-kunigo — la FERMITA flanko ( la direkto de la finiĝanta vojo )
      // perdas la tutan bandon ĉe la voja-borda bendo-pozicio kaj la du
      // anguloj de la malfermita ( kontraŭa ) flanko perdas siajn kvadratojn.
      const [ dx, dz ] = ferma;
      // ( t, u ) = la fermita-aksa koordinato ( pozitiva LAŬ la ferma direkto
      // — la bando sidas je t ∈ [ interna, duon ] ) kaj la perpendiculara.
      // La vojkuro: la funda rando kun la du malfermit-flankaj angulaj
      // eltranĉoj, ambaŭ flankaj randoj, kaj la interna rando de la fermita
      // bando — dek de punktoj, unu simpla volvaĵo.
      const lauxFermo = ( t: number, u: number ): [ number, number ] =>
        dz !== 0 ? [ u, dz * t ] : [ dx * t, u ];
      relativaj = [
        lauxFermo(-duon, -duon), lauxFermo(-duon, -interna),
        lauxFermo(-interna, -interna), lauxFermo(-interna, interna),
        lauxFermo(-duon, interna), lauxFermo(-duon, duon),
        lauxFermo(interna, duon), lauxFermo(interna, interna),
        lauxFermo(interna, -interna), lauxFermo(interna, -duon),
      ];
    } else {
      // Kvarvoja kruciĝo — la kvar diagonalaj angulaj kvadratoj eltranĉitaj.
      relativaj = [
        [ -interna, -duon ], [ interna, -duon ], [ interna, -interna ], [ duon, -interna ],
        [ duon, interna ], [ interna, interna ], [ interna, duon ], [ -interna, duon ],
        [ -interna, interna ], [ -duon, interna ], [ -duon, -interna ], [ -interna, -interna ],
      ];
    }
    const platoGeo = new THREE.ExtrudeGeometry(kreiFormonElPunktoj(relativaj), { depth: platoDikeco, bevelEnabled: false });
    platoGeo.rotateX(-Math.PI / 2);
    bufroj.aldoni(platoGeo, supraMaterialo, new THREE.Matrix4().makeTranslation(x, bazo, z));
    // La andezitaj blokoj — la sama profundo kiel la plato, ankritaj ĉe la
    // sama bazo, do iliaj suproj kuŝas precize sur la plato-supro ( unu
    // kontinua surfaco, neniu ŝtupo inter la materialoj ).
    if ( ferma ) {
      const [ dx, dz ] = ferma;
      // T-kunigo — unu kontinua andezita bloko en la eltranĉita bando de la
      // fermita flanko kaj du angulaj blokoj en la malfermitaj anguloj.
      const bandoGeo = kreiRondanRektangulon(dz !== 0 ? wb : angulaLargho, dz !== 0 ? angulaLargho : wb, platoDikeco, 0);
      bandoGeo.rotateX(-Math.PI / 2);
      bufroj.aldoni(bandoGeo, bordaMaterialo,
        new THREE.Matrix4().makeTranslation(x + dx * angulaOfseto, bazo, z + dz * angulaOfseto));
      for ( const s of [ -1, 1 ] ) {
        const anguloGeo = kreiRondanRektangulon(angulaLargho, angulaLargho, platoDikeco, 0);
        anguloGeo.rotateX(-Math.PI / 2);
        bufroj.aldoni(anguloGeo, bordaMaterialo, new THREE.Matrix4().makeTranslation(
          x + ( dz !== 0 ? s * angulaOfseto : -dx * angulaOfseto ),
          bazo,
          z + ( dz !== 0 ? -dz * angulaOfseto : s * angulaOfseto )
        ));
      }
    } else {
      // Kvarvoja kruciĝo — kvar angulaj blokoj ĉe la kvar diagonalaj anguloj.
      for ( const sx of [ -1, 1 ] ) {
        for ( const sz of [ -1, 1 ] ) {
          const anguloGeo = kreiRondanRektangulon(angulaLargho, angulaLargho, platoDikeco, 0);
          anguloGeo.rotateX(-Math.PI / 2);
          bufroj.aldoni(anguloGeo, bordaMaterialo,
            new THREE.Matrix4().makeTranslation(x + sx * angulaOfseto, bazo, z + sz * angulaOfseto));
        }
      }
    }
  }
  bufroj.kunigi(sceno);
}

// kreiKvaronanArkFormon — Kvarona-disko ( la ark-regiono ) en la kvadranto
// ( sx, sz ) de L-kornero. La ŝipo-koordinatoj uzas x = dx kaj y = -dz, do la
// samplado en MALCRESKANTA angulo ( de a1+90° gxis a1 ) donas kontraŭhorloĝan
// volvaĵon — la supra faco supren post la -90° X-rotacio, kiel la vojoj.
function kreiKvaronanArkFormon(radiuso: number, sx: number, sz: number): THREE.Shape {
  const a1 = sx > 0 ? ( sz > 0 ? 0 : 3 * Math.PI / 2 ) : ( sz > 0 ? Math.PI / 2 : Math.PI );
  const paŝoj = 0o40;
  const formo = new THREE.Shape();
  formo.moveTo(0, 0);
  for ( let i = paŝoj; i >= 0; i-- ) {
    const ang = a1 + ( i / paŝoj ) * Math.PI / 2;
    formo.lineTo(radiuso * Math.cos(ang), -radiuso * Math.sin(ang));
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
function kreiRingSektoron(internaRadiuso: number, eksteraRadiuso: number, sx: number, sz: number): THREE.Shape {
  const a1 = sx > 0 ? ( sz > 0 ? 0 : 3 * Math.PI / 2 ) : ( sz > 0 ? Math.PI / 2 : Math.PI );
  const paŝoj = 0o40;
  const formo = new THREE.Shape();
  formo.moveTo(internaRadiuso * Math.cos(a1 + Math.PI / 2), -internaRadiuso * Math.sin(a1 + Math.PI / 2));
  formo.lineTo(eksteraRadiuso * Math.cos(a1 + Math.PI / 2), -eksteraRadiuso * Math.sin(a1 + Math.PI / 2));
  for ( let i = 0; i <= paŝoj; i++ ) {
    const ang = a1 + Math.PI / 2 - ( i / paŝoj ) * Math.PI / 2;
    formo.lineTo(eksteraRadiuso * Math.cos(ang), -eksteraRadiuso * Math.sin(ang));
  }
  formo.lineTo(internaRadiuso * Math.cos(a1), -internaRadiuso * Math.sin(a1));
  for ( let i = 0; i <= paŝoj; i++ ) {
    const ang = a1 + ( i / paŝoj ) * Math.PI / 2;
    formo.lineTo(internaRadiuso * Math.cos(ang), -internaRadiuso * Math.sin(ang));
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
// — kie NEK vojo etendiĝas. ambaŭ korpoj iras en la kontraŭan kvadranton kaj
// la du vojoj kruciĝas nur en tiu kontraŭa regiono. La disko kaj la ringo
// sidas ĉe la ORIGINALA malalta nivelo en plata tereno ( la supro = tereno
// + dikeco ) kaj leviĝas ĝis la maksimuma angula alto nur en deklivoj. La
// profundo etendiĝas sub la minimuman angulan altecon + margxeno — la muroj
// ĉiam enfosiĝas sub ĉiujn angulojn de la deklivo.
export function konstruiRondigitanArkon(sceno: THREE.Scene,
  x: number, z: number, sx: number, sz: number,
  heightFn: ( x: number, z: number ) => number,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial
): void {
  // La arko sidas super la vojoj — la sama pli alta offset kiel la kruciĝaj
  // platoj ( -3/-2 ), por ke neniu surfaco kuŝu sur alia samplane. La ringo
  // kaj la angulo uzas la samajn tri kromajn unuojn ( -5 kontraŭ -2 ) kiel la
  // kruciĝaj anguloj — determinisma venko sur flataj facoj.
  const { supraMaterialo, bordaMaterialo } = kreiVojojnMaterialojn(dioritaMaterialo, andezitaMaterialo, -3, -2, -4, -5);
  const dikeco = 0o2/0o10;
  // ⟨ Angula specimenado ⟩ — la kvar anguloj de la ark-a kvadrata areo (
  // la dua ekstera radiuso — la sama grandeco kiel la kruciĝa plato ). La
  // SUPRO restas je la malalta originala nivelo kaj leviĝas ĝis la
  // maksimuma angula alto nur en deklivoj; la profundo etendiĝas sub la
  // minimuman angulan altecon + margxeno.
  const altoj = specimeniAngulojn(x, z, 0o13/0o10, 0o13/0o10, heightFn);
  const terenaY = heightFn(x, z);
  const supro = Math.max(terenaY + 0o1/0o100 + dikeco, altoj.maksimumo + 0o1/0o100 + dikeco);
  const arkaDikeco = supro - ( altoj.minimumo - ANGULA_PROVOLIRO );
  const bazo = supro - arkaDikeco;
  const bufroj = kreiGeometriajnBufrojn();

  // Diorita centro — la kvarona disko en la libera kornera kvadranto.
  const centroFormo = kreiKvaronanArkFormon(0o7/0o10, sx, sz);
  const centroGeo = new THREE.ExtrudeGeometry(centroFormo, { depth: arkaDikeco, bevelEnabled: false });
  centroGeo.rotateX(-Math.PI / 2);
  bufroj.aldoni(centroGeo, supraMaterialo, new THREE.Matrix4().makeTranslation(x, bazo, z));

  // Andezita ringo — vera ring-sektoro inter 0o7/0o10 kaj 0o13/0o10 ( la
  // samaj radiusoj kiel la voja centro kaj ekstera rando ). La sektoro
  // sekvas la arkon kaj la du radiusajn randojn ( kiuj kuŝas sur la vojo-facoj
  // — samkoloraj, do nevideblaj ) sen iu truo — neniu andezita triangulo
  // eniras la dioritan diskon kaj neniu truo aperas lauxlonge de la randoj.
  const ringFormo = kreiRingSektoron(0o7/0o10, 0o13/0o10, sx, sz);
  const ringGeo = new THREE.ExtrudeGeometry(ringFormo, { depth: arkaDikeco, bevelEnabled: false });
  ringGeo.rotateX(-Math.PI / 2);
  bufroj.aldoni(ringGeo, bordaMaterialo, new THREE.Matrix4().makeTranslation(x, bazo, z));

  // La ENKOREJA kvadranto ( la kontraŭo de la kornera kvadranto — direkto
  // -sx/-sz ) estas kie la du vojoj fakte renkontiĝas. Iliaj bendoj
  // interkovras tie samplane ( la samaj dioritaj centroj kaj andezitaj bordoj
  // en la sama loko ) kaj la du tavoloj z-flagris laŭ la fotila angulo.
  // Solidaj pecoj kovras la interkovron — diorita kvadrato ( 0o13/0o10 =
  // duono de la voja ekstera larĝo ) ENTAJPITA ĉe sia ekstera angulo, kie
  // andezita bloko plenigas la eltranĉon precize. Ambaŭ sidas ĉe la NORMA
  // nivelo ( la supro = la voja supro, kiel la kruciĝaj platoj ) kaj kovras
  // la interkovron per la offset-hierarĥio ( -3/-2 kontraŭ la striaj -2/-1
  // ) — NENIU levita piedestalo super la vojoj.
  const kvarono = 0o13/0o10, angulaLargho = 0o4/0o10;
  // La entajpita formo de la kovra kvadrato — la kvadranto etendiĝas de la
  // centro ĝis la ekstera angulo ( -sx·kvarono, -sz·kvarono ) kaj la ekstera
  // angula kvadrato ( angulaLargho × angulaLargho ĉe tiu angulo ) eltranĉita.
  const ekstX = -sx * kvarono, ekstZ = -sz * kvarono;
  const enaX = ekstX + sx * angulaLargho, enaZ = ekstZ + sz * angulaLargho;
  const padajPunktoj: [ number, number ][] = [
    [ enaX, ekstZ ], [ 0, ekstZ ], [ 0, 0 ], [ ekstX, 0 ], [ ekstX, enaZ ], [ enaX, enaZ ],
  ];
  const enaGeo = new THREE.ExtrudeGeometry(kreiFormonElPunktoj(padajPunktoj), { depth: arkaDikeco, bevelEnabled: false });
  enaGeo.rotateX(-Math.PI / 2);
  bufroj.aldoni(enaGeo, supraMaterialo, new THREE.Matrix4().makeTranslation(x, bazo, z));
  // La andezita angula bloko — precize en la eltranĉo, ankrita ĉe la sama
  // bazo kiel la tuta arko ( la pecoj najbaras rande, la suproj kuŝas
  // samnivele — la angulo estas PARTO de la arko, ne peco starigita super ĝi ).
  const anguloGeo = kreiRondanRektangulon(angulaLargho, angulaLargho, arkaDikeco, 0);
  anguloGeo.rotateX(-Math.PI / 2);
  bufroj.aldoni(anguloGeo, bordaMaterialo,
    new THREE.Matrix4().makeTranslation(x + ekstX + sx * angulaLargho / 2, bazo, z + ekstZ + sz * angulaLargho / 2));
  bufroj.kunigi(sceno);
}

// konstruiSpronon — Konstruu ununuran voj-spronon de konstruajxa pordo gxis voja rando.
// Uzas pli altan polygonOffset ol cefaj vojoj por certigi videblon.
export function konstruiSpronon(x1: number, z1: number, x2: number, z2: number,
  heightFn: ( x: number, z: number ) => number,
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
  // La spronaj bendoj uzas pli altan polygonOffset ol la cefaj vojoj ( -4/-3
  // kontraux -2/-1 ), por ke cxe la kunigxo kun la cefa vojo la sprono gajnu
  // determinite ( neniu z-fighting inter la du vojoj ).
  const { supraMaterialo, bordaMaterialo } = kreiVojojnMaterialojn(dioritaMaterialo, andezitaMaterialo, -4, -2, -3, -2);
  konstruiSegmenton(x1, z1, x2, z2, kreiVojajnBendojn(w, supraMaterialo, bordaMaterialo), dikeco, heightFn, sceno);
}

// konstruiFontanon — Konstruu placon kun fontana baseno kaj akva surfaco.
export function konstruiFontanon(sceno: THREE.Scene,
  x: number, z: number,
  heightFn: ( x: number, z: number ) => number,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial,
  oraMaterialo: THREE.MeshStandardMaterial
): THREE.Mesh {
  const y = heightFn(x, z) + 0o2/0o10;
  // Placa disko
  const placo = new THREE.Mesh(new THREE.CircleGeometry(0o10, 0o60).rotateX(-Math.PI / 2),
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
