// Voja modulo — poluritaj dioritaj vojoj kun andezitaj bordoj
// Uzas rektangulajn Shape + ExtrudeGeometry por puraj longaj flankoj ( intersekcoj interkovras )
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { kreiDioritanTeksajxon, kreiAndezitanTeksajxon } from "../komunajxoj/teksajxoj.js";

// stuparo — Ĉu ĉi tiu vojo estas ŜTUPARO. Ĉiu intervalo fariĝas PLATA ŝtupo kun
// vertikala riso anstataŭ dekliva rubando. La normalaj vojoj uzas la klinitan
// "glatan" generacion kaj nur fariĝas eskalero super krutajxoj ( SOJA_SXVIPADO );
// la ŝtuparoj elektas la egalan ŝtupon ĉiam — la doko-malsupreniro al la akvo
// estas ordinara voja difino kun `stuparo: true`, do la ŝtupoj venas el la SAMA
// voja maŝinaro kiel ĉiu strato ( la sama diorita/andezita sekco ).
export interface VojDifino { pts: [ number, number ][]; w: number; heightFn?: ( x: number, z: number ) => number; stuparo?: boolean; }

/**
 * Konstruu ŝtupetan vojan segmenton inter du vojpunktoj.
 * Specimenigas la terenon-altecon ĉiun ~4 unuojn, por ke la vojo nature
 * formu ŝtupojn kie la grundo deklivas kaj restu glata sur ebena grundo.
 */
// kreiArkPunktojn — La specimenaj punktoj de KVONA ARKO ( radiuso r ĉirkaŭ la
// centro ( cx, cz ) ) de la akso laŭ sx ĝis la akso laŭ sz, ambaŭ finoj
// inkluzive. La SAMA arko rondigas ĉiun angulon de la voja reto — la angulojn
// de la kruciĝaj platoj, la liberan kvadranton de la L-kornero kaj la kvaronajn
// diskojn — do la kurbo estas ĉie la sama.
//     @param cx, cz ( number ) - La centro de la arko ( relative al la nodo ).
//     @param r ( number ) - La radiuso de la arko.
//     @param sx, sz ( number ) - La kvadranto ( cxiu ±1 ).
//     @returns punktoj ( [ number, number ][] ) - La specimenaj punktoj.
function kreiArkPunktojn(cx: number, cz: number, r: number, sx: number, sz: number): [ number, number ][] {
  const punktoj: [ number, number ][] = [];
  const pasxoj = 0o40;
  // La arko sidas EN la donita kvadranto, do la anguloj restas ene de unu
  // kvvaro — de la akso laŭ sx al la akso laŭ sz. La negativaj kvadrantoj
  // iras tra -π/2 aux 3π/2 ( ne rekte al -π/2, kio trapasus la malĝustan
  // kvadranton ).
  const a0 = sx > 0 ? 0 : Math.PI;
  const a1 = sz > 0 ? Math.PI / 2 : ( sx > 0 ? -Math.PI / 2 : 3 * Math.PI / 2 );
  for ( let i = 0; i <= pasxoj; i++ ) {
    const ang = a0 + ( a1 - a0 ) * ( i / pasxoj );
    punktoj.push([ cx + r * Math.cos(ang), cz + r * Math.sin(ang) ]);
  }
  return punktoj;
}

// kreiKvaronanRingon — La kvarona ringo inter du samcentraj arkoj en unu
// kvadranto ( sx, sz ) ĉirkaŭ la centro ( cx, cz ). La ekstera arko iras de
// la akso laŭ sx al la akso laŭ sz kaj la interna arko reiras inverse, do la
// fermo donas la du radialajn randojn sen aparta kodo. Gxi rondigas la
// liberan kvadranton de la L-kornero.
//     @param cx, cz ( number ) - La centro de la arkoj ( relative al la nodo ).
//     @param rEna, rEkstera ( number ) - La interna kaj la ekstera radiusoj.
//     @param sx, sz ( number ) - La kvadranto ( cxiu ±1 ).
//     @returns ringo ( [ number, number ][] ) - La fermita ringa poligono.
function kreiKvaronanRingon(cx: number, cz: number, rEna: number, rEkstera: number, sx: number, sz: number): [ number, number ][] {
  return [ ...kreiArkPunktojn(cx, cz, rEkstera, sx, sz),
    ...kreiArkPunktojn(cx, cz, rEna, sx, sz).reverse() ];
}

// kreiEnanKornanArkon — La U-forma interna rando de la TUTA angulo en la
// DU-braka kvadranto ( sx, sz ). Gxi iras de voj-rando al voj-rando ( de Q1 al
// Q2 ) cxirkaux la ekstera angulo E per la uniforma radiuso KORNA_R, do la
// akra V farigxas glata U. La SAMA arko rondigas cxiun kvarvojan krucigxon,
// cxiun T-kunigon kaj la enan angulon de cxiun L-korneron.
//     @param sx, sz ( number ) - La kvadranto ( cxiu ±1 ).
//     @param ekstera ( number ) - La voja ekstera duono ( por E ).
//     @returns arko ( [ number, number ][] ) - La U-arko de Q1 al Q2.
function kreiEnanKornanArkon(sx: number, sz: number, ekstera: number): [ number, number ][] {
  return kreiArkPunktojn(sx * ekstera, sz * ekstera, KORNA_R, -sx, -sz).reverse();
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

// matricoPor — La monda matrico de voja bendo. ExtrudeGeometry kreskas laŭ
// loka +Z, do la bazo turnas lokan +X en la flankan akson, lokan +Y laŭ la
// voja direkto kaj lokan +Z supren ( dekstramana bazo ). La matrico ankaŭ
// portas la pozicion — la kunigitaj geometrioj devas jam kuŝi ĝuste.
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
// kun andezita bordo ( VOJA_BORDA_LARĜO ) apud gxi ambaŭflanke. La bordo estas
// la SAMA konstanto kiun uzas la kunigaj platoj ( VOJA_DIORITA_DUONO + bordo =
// VOJA_EKSTERA_DUONO ), do la voja spuro kaj la platoj finiĝas ĉe la samaj
// linioj kaj la transiro restas senfenda.
function kreiVojajnBendojn(w: number,
  supraMaterialo: THREE.MeshStandardMaterial,
  bordaMaterialo: THREE.MeshStandardMaterial
): VojBendo[] {
  const flankaLargho = VOJA_BORDA_LARĜO;
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
// konstruiRondajnKapojn kaj konstruiSpronon.
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
  sceno: THREE.Scene,
  stuparo = false
): void {
  const bufroj = kreiGeometriajnBufrojn();
  konstruiSegmentonEnBufrojn(x1, z1, x2, z2, bendoj, dikecoBaza, heightFn, bufroj, stuparo);
  bufroj.kunigi(sceno);
}

// VOJA_DIKECO — La dikeco de la voja plato: kiom alte la voja rubando staras
// super la tereno, tio estas kiom alta estas la videbla andezita rando de la
// flanko. La malnova valoro estis 0o2/0o10 ( 25 cm ) — la stratoj aspektis kiel
// levitaj estradoj kun alta sxtonsxirmo, kaj sur deklivoj la rando sxajnis
// MURETO. Nun 0o5/0o100 ( 8 cm ): la rubando kusxas preskaux sur la tereno, la
// rando legigxas kiel maldika sxirmo, kaj la vojo mem sxajnas PLI PLATA.
// ⟨ La vojoj kaj la plataĵoj kunhavas ĝin 📃 ⟩ — la kruciĝaj platoj, la arkaj
// kaj la ĉapoj uzas la SAMAN nivelon ( VOJA_SUPRO_LEVIGXO ), alie ili starus
// super la vojoj aŭ malgarus sub ili.
export const VOJA_DIKECO = 0o5/0o100;

// VOJA_SUPRO_LEVIGXO — Kiom la SURFACO de vojo kusxas super la heightFn, kiun
// gxi ricevas: la eta klareco super la tereno ( 0o1/0o100 ) kaj la dikeco de la
// rubando ( VOJA_DIKECO ). Aliaj moduloj importas gxin, kiam iliaj propraj suproj
// devas kongrui kun vojo — la ponta heightFn ( urbo.ts ) subtrahas gxin, do la
// ponta deko finigxas GXUSTE cxe la renkontajxaj platformaj suproj.
export const VOJA_SUPRO_LEVIGXO = 0o1/0o100 + VOJA_DIKECO;

// VOJA_EKSTERA_DUONO — La duon-larĝo de la voja spuro ( la diorita centro
// plus la andezita bordo sur ĉiu flanko ) — la rando de la vojo kaj samtempe
// la duon-larĝo de ĉiu kuniga plato. VOJA_DIORITA_DUONO — la rando de la
// diorita centro, VOJA_BORDA_LARĜO — la andezita bordo inter la du. La tri
// valoroj venas el la bendo-difinoj ( kreiVojajnBendojn ), do la plato kaj la
// vojoj finiĝas ĉe la samaj linioj kaj la transiro restas senfenda.
export const VOJA_EKSTERA_DUONO = 0o13/0o10;
export const VOJA_DIORITA_DUONO = 0o7/0o10;
export const VOJA_BORDA_LARĜO = VOJA_EKSTERA_DUONO - VOJA_DIORITA_DUONO;

// KORNA_R — La UNUFORMA radiuso de la rondigita interna angulo en la DU-braka
// kvadranto. La U-arko ( per kreiEnanKornanArkon ) uzas gxin en cxiuj kvar
// kvadrantoj, do la kvarvoja krucigxo, la T-kunigo kaj la L-kornero kunhavas
// unu arkon. Gxi egalas la andezitan bordon, do la arko restas tangenta al la
// voj-randoj kaj la plato kaj la vojoj finigxas cxe la samaj linioj.
export const KORNA_R = VOJA_BORDA_LARĜO;

// kreiSegmentajnPartojn — La partoj de unu voja segmento kiujn la geometrio
// konstruu, laŭ la segmentaj distancoj ( 0 .. longo ). Ĉiu KUNIGO forprenas la
// EKSTERAN duon-larĝon de la vojo ( VOJA_EKSTERA_DUONO ) ambaŭflanke de la
// kuniga punkto — la kuniga plato plenigas tiun kvadraton per sia propra
// surfaco, do la andezitaj flankoj de la vojoj ne povas kuŝi super la
// dioritaj partoj de la plato ( tion faris la rektangulaj anguloj antauxe ).
//     @param aX, aZ, bX, bZ ( number ) - La segmentaj finoj.
//     @param longo ( number ) - La segmenta longo.
//     @param kunigoj ( [ number, number ][] ) - Ĉiuj kunigaj punktoj.
//     @returns partoj ( [ number, number, boolean ][] ) - La komenco, la fino
//       kaj ĉu la parto estas KONSTRUOTA ( malvera = truo de kunigo ).
function kreiSegmentajnPartojn(aX: number, aZ: number, bX: number, bZ: number,
  longo: number,
  kunigoj: [ number, number ][]
): [ number, number, boolean ][] {
  const ndx = ( bX - aX ) / longo, ndz = ( bZ - aZ ) / longo;
  const truoj: [ number, number ][] = [];
  for ( const [ kX, kZ ] of kunigoj ) {
    const rx = kX - aX, rz = kZ - aZ;
    // Nur la kunigoj SUR ĉi tiu linio — la perpendikulara distanco estas nula
    // ( la kunigaj punktoj sidas sur la vojoj mem ).
    if ( Math.abs(rx * ndz - rz * ndx) > 0o1/0o100 ) continue;
    const laux = rx * ndx + rz * ndz;
    if ( laux < -VOJA_EKSTERA_DUONO || laux > longo + VOJA_EKSTERA_DUONO ) continue;
    truoj.push([ Math.max(0, laux - VOJA_EKSTERA_DUONO), Math.min(longo, laux + VOJA_EKSTERA_DUONO) ]);
  }
  truoj.sort(( p, q ) => p[0] - q[0]);
  const partoj: [ number, number, boolean ][] = [];
  let kur = 0;
  for ( const [ t0, t1 ] of truoj ) {
    if ( t1 <= kur ) continue;
    if ( t0 > kur ) partoj.push([ kur, t0, true ]);
    partoj.push([ Math.max(kur, t0), t1, false ]);
    kur = t1;
  }
  if ( kur < longo ) partoj.push([ kur, longo, true ]);
  return partoj;
}

// konstruiVojojn — Konstruu cxiujn vojsegmentojn kun dioritaj suprajoj kaj andezitaj randoj.
// La kunigaj punktoj ( la nodoj kiuj ricevas platon ) malplenigas la vojan
// geometrion en la kuniga kvadrato — vidu kreiSegmentajnPartojn.
//     @param kunigoj ( [ number, number ][] ) - La punktoj de la kunigaj platoj.
//     @returns samples ( Vector3[] ) - La specimenoj por la lampoj kaj la vegetajxo.
export function konstruiVojojn(sceno: THREE.Scene,
  defs: VojDifino[],
  heightFn: ( x: number, z: number ) => number,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial,
  kunigoj: [ number, number ][] = []
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
      //
      // ⟨ La kunigaj truoj 📃 ⟩ — la segmento konstruiĝas en partoj; ĉe ĉiu
      // kunigo la geometrio haltas ( la plato posedas tiun kvadraton ) kaj la
      // truo ricevas piedeblan strion, por ke la promenanto ne faletu al la
      // tereno trapasante kunigon.
      const longo = Math.hypot(bX - aX, bZ - aZ);
      const bendoj = kreiVojajnBendojn(def.w, supraMaterialo, bordaMaterialo);
      const ndx = ( bX - aX ) / longo, ndz = ( bZ - aZ ) / longo;
      for ( const [ t0, t1, konstruu ] of kreiSegmentajnPartojn(aX, aZ, bX, bZ, longo, kunigoj) ) {
        const px1 = aX + ndx * t0, pz1 = aZ + ndz * t0;
        const px2 = aX + ndx * t1, pz2 = aZ + ndz * t1;
        if ( konstruu ) {
          konstruiSegmentonEnBufrojn(px1, pz1, px2, pz2, bendoj, VOJA_DIKECO, defAlt, bufroj, def.stuparo === true);
          continue;
        }
        const mX = ( px1 + px2 ) / 2, mZ = ( pz1 + pz2 ) / 2;
        const kunigaSupro = specimeniAngulojn(mX, mZ, VOJA_EKSTERA_DUONO, VOJA_EKSTERA_DUONO, defAlt).maksimumo
          + VOJA_SUPRO_LEVIGXO;
        vojSuprajxoj.push({ x1: px1, z1: pz1, x2: px2, z2: pz2, duono: VOJA_EKSTERA_DUONO,
          y0: kunigaSupro, y1: kunigaSupro });
      }
      // Specimenoj por lampoj — kaj por la vegetajxo-ekskludo. Unu specimeno
      // cxiun ~2 unuojn, por ke neniu planto povu sidi inter maldensajn
      // specimenojn kaj aperi sur la vojo.
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

// ⟨ Vojaj supraĵoj por kolizio 📃 ⟩ — ĉiu ŝtupo de la voja konstruado
// registru sian piedeblan supraĵon ( la centrolinio-segmento, la duona
// vasteco kaj la randaj suproj y0/y1 ). La promenanto demandas ĉi tiujn
// striojn ( vojaSuproY en sperto.ts ) anstataŭ trairi la vojojn. La strioj
// uzas la SAMAJN valorojn kiuj konstruis la geometrion, do la demandoj
// estas precizaj per konstruado — ankaŭ sur la klinitaj deklivoj kaj la
// eskaleraj plataĵoj.
export interface VojSuprajxo { x1: number; z1: number; x2: number; z2: number; duono: number; y0: number; y1: number; }
export const vojSuprajxoj: VojSuprajxo[] = [];

// konstruiSegmentonEnBufrojn — La buffer-a internaĵo de konstruiSegmenton.
// La ĉefaj vojoj kolektas ĉiujn difinojn en KOMUNAJN bufrojn ( unu po
// materialo por la tuta reto ) kaj la spronoj kunigas per sia propra bufraro.
// ⟨ GLATA generacio ⟩ — ĉiu ŝtupo specimenas la du RANDOJ ( la komenco kaj
// la fino — la maksimuman kaj minimuman teren-altojn de iliaj lateralaj
// anguloj ) kaj KLINIĜAS inter la du randaj niveloj — dekliva plana supro
// kiu precize kunigas la najbarajn ŝtupojn ĉe la komuna rando ( la najbaroj
// kunhavas randan specimenon ). Nur kiam la tereno falas pli ol
// SOJA_SXVIPADO ene de unu intervalo, aŭ kiam la difino estas ŝtuparo
// ( stuparo = true ), la ŝtupo fariĝas DISKRETA eskalero ( plata supro je la
// alta rando, la vizaĝo tranĉas la deklivon ). La profundo ĉiam etendiĝas sub
// la minimuman randan altecon + margxeno — neniu ŝvebanta rando, neniu sinko.
function konstruiSegmentonEnBufrojn(x1: number, z1: number, x2: number, z2: number,
  bendoj: VojBendo[],
  dikecoBaza: number,
  heightFn: ( x: number, z: number ) => number,
  bufroj: VojGeometriajBufroj,
  stuparo = false
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
    const s0 = maks0 + 0o1/0o100 + dikecoBaza;   // = maks0 + VOJA_SUPRO_LEVIGXO por vojoj
    const s1 = maks1 + 0o1/0o100 + dikecoBaza;
    const difo = s1 - s0;
    // ⟨ La diskreta ŝtupo 📃 ⟩ — aŭ la tereno falas pli ol SOJA_SXVIPADO ene de
    // unu intervalo, aŭ la vojo mem estas ŝtuparo ( `stuparo: true` ). En ambaŭ
    // okazoj la ŝtupo fariĝas PLATA: supro je la ALTA rando kaj vertikala vizaĝo
    // ĝis sub la teron. La ŝtuparo do faras ŝtupon ankaŭ je malgranda falo — la
    // doko-malsupreniro malsupreniras per egalaj ŝtupoj anstataŭ glata deklivo.
    const diskreta = stuparo || difo < -SOJA_SXVIPADO;
    // Registru la piedeblan supraĵon de ĉi tiu ŝtupo — la plata eskalera
    // ŝtupo sidas je s0 ĉe ambaŭ randoj, la klinita ŝtupo inter s0 kaj s1.
    vojSuprajxoj.push({ x1: sx1, z1: sz1, x2: sx2, z2: sz2, duono: eksteraDuon, y0: s0, y1: diskreta ? s0 : s1 });
    if ( diskreta ) {
      // ⟨ Eskalera ŝtupo ⟩ — plata supro je la ALTA rando ( la sama nivelo kiel
      // la klinita rando de la antaŭa ŝtupo — la transiro restas preciza ) kaj
      // profundo ĝis sub la minimuman angulan altecon + margxeno — la vertikala
      // vizaĝo montras la andezitan/dioritan bordon kiel la eskalera riso.
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

// ⟨ Kial la kradaj nodoj ne ricevas ĉapojn 📃 ⟩ — la vojoj mem kaj la kunigaj
// platoj plenigas ĉiun kradan nodon ( la trapasanta diorita bendo kaj la
// andezitaj bordoj kovras la tutan diskan regionon ). La kradaj rando-nodoj
// restas nur por la lampoj ( placajNodoj en urbo.ts ). Nur la doka bordo
// ricevas kapojn — tiuj nodoj havas nek platon nek trapasantan vojon.

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
// preter la fino. ( La dokaj landrandoj KUTIMIS ricevi ĉapojn, kiuj bulis
// suden sur la platformon — la doko estas voja etendo, do la ĉapo rondigis la
// transiron — sed ili montriĝis kiel arko INTERNE de ĉiu doko, do la ludo
// nun konstruas la kapojn nur ĉe la du kajo-finoj; la turnitaj dokoj de la
// malproksima riverbordo havas nenian vojon. ) La disko
// ( 0o7/0o10 = la diorita centro ) kaj la ringo ( 0o7/0o10..0o13/0o10 = la
// andezita bordo ) estas EKSTRUDITAJ per la sama nivelo kiel la voja strio
// ( VOJA_SUPRO_LEVIGXO ) kaj poziciitaj ĉe la terena nivelo. la videbla supro sidas
// ĉe la voja supro-nivelo ( tereno + VOJA_SUPRO_LEVIGXO ) kaj tiom-altaj muroj
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
  const dikeco = VOJA_SUPRO_LEVIGXO;
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

// konstruiIntersekcajnPlatojn — Kovru ĉiun kunigon per unu solida plato ( la
// tuta 0o26/0o10 = 2.75 voja larĝo ) kiu POSEDAS sian kvadraton. La vojoj
// mem haltas ĉe la rando de la kvadrato ( konstruiVojojn forlasas la kunigajn
// truojn ), do la plato estas la sola supraĵo ene — la andezitaj flankoj de la
// vojoj NE povas kuŝi super la dioritaj partoj de la plato. La sama funkcio
// konstruas la kvarvojajn kruciĝojn, la T-kunigojn kaj la L-kornerojn; la
// kvadranto-logiko ( kiuj brakoj ekzistas kaj kiel la anguloj rondiĝas )
// estas priskribita en la funkcio mem.
//
// La platoj de ĉiuj kunigoj kunigas po materialo ( du desegnaj alvokoj
// anstataŭ kvin po plato ). La SUPRO restas je la malalta originala nivelo
// en plata tereno ( tereno + dikeco ) kaj leviĝas ĝis la maksimuma angula
// alto nur en deklivoj — la andezitaj partoj sekvas la saman supron kiel
// partoj de la plato mem; la profundo etendiĝas sub la terenon ( la sama
// konformeco kiel la vojaj ŝtupoj ).
export function konstruiIntersekcajnPlatojn(sceno: THREE.Scene,
  punktoj: [ number, number ][],
  heightFn: ( x: number, z: number ) => number,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial,
  fermitaj: Map<string, [ number, number ]> = new Map()
): void {
  if ( punktoj.length === 0 ) return;
  // La plato sidas super la vojoj kaj ĝiaj offsetoj estas la PLEJ FORTAJ (
  // -3/-2 por la diorito, -4/-5 por la andezito — kontraŭ la voja centro
  // -2/-4 kaj la voja bordo -1/-1 ). La plato do decidas ĉie ene de sia
  // kvadrato; la vojoj sub ĝi ne povas trarampi, kaj ĉar la vojoj haltas ĉe
  // la rando de la kvadrato ( konstruiVojojn lasas la kunigajn truojn ), la
  // plato estas la sola supraĵo ene.
  const { supraMaterialo, bordaMaterialo } = kreiVojojnMaterialojn(dioritaMaterialo, andezitaMaterialo, -3, -2, -4, -5);
  const dikeco = VOJA_SUPRO_LEVIGXO;
  const bufroj = kreiGeometriajnBufrojn();
  for ( const [ x, z ] of punktoj ) {
    // La brakoj de la kunigo — ĉiu komponento de la fermita direkto (±1 aŭ 0)
    // forprenas unu brakon. T-kunigo havas unu, L-kornero du, kaj la kvarvoja
    // kruciĝo neniun; la brako laŭ la kvadranto ( sx, sz ) ekzistas ĝuste kiam
    // sx NE estas la fermita direkto laŭ x ( kaj same laŭ z ).
    const ferma = fermitaj.get(x + "," + z);
    const fx = ferma ? ferma[0] : 0, fz = ferma ? ferma[1] : 0;
    // ⟨ Angula specimenado ⟩ — la SUPRO restas je la malalta terena nivelo
    // ( tereno + dikeco ) kaj leviĝas ĝis la maksimuma angula alto nur en
    // deklivoj. La profundo etendiĝas sub la minimuman angulan altecon +
    // margxeno — la flankaj muroj ĉiam enfosiĝas ( neniu ŝvebanta rando ).
    const altoj = specimeniAngulojn(x, z, VOJA_EKSTERA_DUONO, VOJA_EKSTERA_DUONO, heightFn);
    const supro = Math.max(heightFn(x, z) + dikeco, altoj.maksimumo + dikeco);
    const platoDikeco = supro - ( altoj.minimumo - ANGULA_PROVOLIRO );
    const bazo = supro - platoDikeco;
    // ⟨ La kvadrantoj 📃 ⟩ — la plato konsistas el la kvar kvadrantoj, ĉiu kun
    // sia diorita parto ( la strioj de la vojoj kiuj trapasas ĝin ) kaj sia
    // andezita parto. La samaj offsetoj kaj la sama profundo por ĉiuj, do la
    // partoj najbaras sen interkovri kaj neniu koincidaj-facoj batalo ekzistas.
    const aldoni = ( punktoj2: [ number, number ][], materialo: THREE.MeshStandardMaterial ): void => {
      const geometrio = new THREE.ExtrudeGeometry(kreiFormonElPunktoj(punktoj2), { depth: platoDikeco, bevelEnabled: false });
      geometrio.rotateX(-Math.PI / 2);
      bufroj.aldoni(geometrio, materialo, new THREE.Matrix4().makeTranslation(x, bazo, z));
    };
    // ⟨ La kvadranta kadro 📃 ⟩ — ĉiu punkto skribiĝas kiel ( trans, laŭ ) paro
    // en la kvadranto ( sx, sz ), kie `trans` estas la perpendikulara ofseto de
    // la braka akso kaj `laŭ` la distanco laŭ gxi. `lauxX` ( la brako laŭ x )
    // mapas trans → z kaj laŭ → x, `lauxZ` male. Ambaŭ uzas la SAMAN argumentan
    // ordon, do unu formulo priskribas la sekcon en ĉiu kvadranto.
    const diorita = VOJA_DIORITA_DUONO, ekstera = VOJA_EKSTERA_DUONO;
    for ( const sx of [ -1, 1 ] ) {
      for ( const sz of [ -1, 1 ] ) {
        const lauxX = ( trans: number, lauv: number ): [ number, number ] => [ sx * lauv, sz * trans ];
        const lauxZ = ( trans: number, lauv: number ): [ number, number ] => [ sx * trans, sz * lauv ];
        const brakoX = sx !== fx, brakoZ = sz !== fz;
        if ( brakoX && brakoZ ) {
          // DU brakoj — la du vojoj renkontigxas en cxi tiu kvadranto. La korno
          // inkluzivas la konektitan vojon laux ties TUTA largxo, ne nur la
          // angulan pinton. La diorito sekvas la glatan U-arkon de voj-rando al
          // voj-rando kaj la andezito plenigas la tutan diskon gxis la plata
          // rando ( la radiaj randoj kusxas sur la vojaj randoj, do la vojaj
          // bordoj dauras senfende ). Neniu lenso-pinto, neniu stumpo-kudro kaj
          // neniu akra interna angulo restas. La regiono ekster la disko estas
          // diorito, la regiono interne estas andezito.
          const enaArko = kreiEnanKornanArkon(sx, sz, ekstera);
          aldoni([ [ 0, 0 ], lauxX(0, ekstera), ...enaArko, lauxZ(0, ekstera) ], supraMaterialo);
          aldoni([ ...enaArko, [ sx * ekstera, sz * ekstera ] ], bordaMaterialo);
        } else if ( brakoX || brakoZ ) {
          // UNU brako — la voja sekco daŭras rekte tra la rando de la plato,
          // kaj la transira rando de la najbara kvadranto faras la samon. La
          // plato nur reparas la eltranĉon de la vojo; neniu angulo ekzistas,
          // do nenio por rondigi ( la bendo daŭras rekte ).
          const l = brakoX ? lauxX : lauxZ;
          aldoni([ l(0, 0), l(0, ekstera), l(diorita, ekstera), l(diorita, 0) ], supraMaterialo);
          aldoni([ l(diorita, 0), l(diorita, ekstera), l(ekstera, ekstera), l(ekstera, 0) ], bordaMaterialo);
        } else {
          // NUL brakoj — la libera kvadranto de L-kornero ( nek vojo nek arko
          // eniras gxin ). La kvarona disko por la diorito kaj la kvarona ringo
          // el kreiKvaronanRingon por la andezito, kun la vojaj duonoj kiel
          // radiusoj. La ringo kovras la tutan kvadranton, do ankaux la libera
          // korno estas tuta rondigita angulo.
          aldoni([ [ 0, 0 ], ...kreiArkPunktojn(0, 0, diorita, sx, sz) ], supraMaterialo);
          aldoni(kreiKvaronanRingon(0, 0, diorita, ekstera, sx, sz), bordaMaterialo);
        }
      }
    }
  }
  bufroj.kunigi(sceno);
}

// ⟨ La kvar kunigaj specoj 📃 ⟩ — la kvarvoja kruciĝo ( neniun fermitan
// direkton ), la T-kunigo ( unu ), la L-kornero ( du ) kaj la porda sprono
// ( unu ) ĉiuj pasas tra ĉi tiu SAMA funkcio. La kvadranto-logiko supre jam
// kovras ilin ĉiujn — la libera kvadranto de L-kornero ricevas la kvaronan
// diskon kaj la ringon ( la arko de la tuta voja larĝo ), ĉiu angulo kie du
// brakoj renkontiĝas ricevas la tutan rondigitan kornon ( la ena diorita U kaj
// la andezita disko gxis la plata rando per kreiEnanKornanArkon ), kaj aliloke
// la sekcoj daŭras rekte. Neniu aparta arka funkcio bezonatas — unu plato,
// unu paro da materialoj, unu kunigo por la tuta reto.

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
  const dikeco = VOJA_DIKECO;
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
