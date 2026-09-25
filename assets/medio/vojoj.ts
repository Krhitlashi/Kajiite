// ≺⧼ Vojoj 🛣️ ⧽≻
// Poluritaj dioritaj vojoj kun andezitaj bordoj
// Uzas rektangulajn Shape + ExtrudeGeometry por puraj longaj flankoj ( intersekcoj interkovras )
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { kreiDioritanTeksajxon, kreiAndezitanTeksajxon } from "../komunajxoj/teksajxoj.js";

// stuparo — Historia marko por la doko-malsupreniro ( `stuparo: true` ). ĈIU vojo
// nun ŝtupas ( vidu konstruiSegmentonEnBufrojn ) — la kampo restas nur por ke la
// malnovaj difinoj kaj la ĉap-logiko ( kiuj ankoraŭ legas ĝin ) plu funkciu; ĝi
// ne plu ŝanĝas la generacion. La doka ŝtuparo do venas el la SAMA voja maŝinaro
// kiel ĉiu strato ( la sama diorita/andezita sekco ).
export interface VojDifino { pts: [ number, number ][]; w: number; heightFn?: ( x: number, z: number ) => number; stuparo?: boolean; kapoj?: boolean; glata?: boolean; }

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

function specimeniRotitajn(
  x: number,
  z: number,
  duono: number,
  rotacio: number,
  heightFn: ( x: number, z: number ) => number
): { maksimumo: number; minimumo: number } {
  const kos = Math.cos( rotacio ), sin = Math.sin( rotacio );
  let maksimumo = -Infinity, minimumo = Infinity;
  for ( const lx of [ -duono, duono ] ) for ( const lz of [ -duono, duono ] ) {
    const h = heightFn( x + kos * lx - sin * lz, z + sin * lx + kos * lz );
    maksimumo = Math.max( maksimumo, h );
    minimumo = Math.min( minimumo, h );
  }
  return { maksimumo, minimumo };
}

// plataAltoj — La SUPRO kaj la MINIMUMO de kuniga plato je la kunigo ( x, z )
// kun la rotacio de la kunigo. La plato sidas je la maksimuma angula teren-alto
// ( plus la sama levigxo kiel la vojoj — VOJA_SUPRO_LEVIGXO ), kaj la minimumo
// restas por la profundo de la plato.
// ⟨ Kial aparta funkcio 📃 ⟩ — la PONTaj finoj legas GXUSTE cxi tiun supran
// valoron. Ponto alvenas SUR la kunigan platon ( gxia fino sidas sub la plato ),
// do se la deko legus nur la terenon sub si, gxi finigxus gxis 0.4 unuojn sub la
// plato kaj la ponto sxajnus duone enfosita cxe siaj surterigxejoj. Unu formulo,
// du legantoj — la plato kaj la ponto restas samnivelaj.
//     @param x, z ( number ) - La centro de la kunigo.
//     @param rotacio ( number ) - La rotacio de la kunigo ( el rotacioPor ).
//     @param heightFn ( function ) - La terena alta funkcio.
//     @returns { supro, minimumo } ( object ) - La plata supro kaj la minimuma angula alto.
export function plataAltoj(x: number, z: number, rotacio: number,
  heightFn: ( x: number, z: number ) => number
): { supro: number; minimumo: number } {
  const altoj = specimeniRotitajn(x, z, VOJA_EKSTERA_DUONO, rotacio, heightFn);
  return { supro: Math.max( heightFn(x, z), altoj.maksimumo ) + VOJA_SUPRO_LEVIGXO,
    minimumo: altoj.minimumo };
}

// kreiEnanKornanArkon — La U-forma interna rando de la TUTA angulo en la
// DU-braka kvadranto ( sx, sz ). Gxi iras de voj-rando al voj-rando ( de S1 al
// E1 ) cxirkaux la ekstera centro O per la radiuso KORNA_ENA_R, do la akra V
// farigxas glata U. La centro O estas la sama kiel tiu de la ekstera kurbo,
// do ambaux arkoj estas samcentraj. La SAMA arko rondigas cxiun kvarvojan
// krucigxon, cxiun T-kunigon kaj la enan angulon de cxiun L-korneron.
//     @param sx, sz ( number ) - La kvadranto ( cxiu ±1 ).
//     @param ekstera ( number ) - La voja ekstera duono ( por O, S1 kaj E1 ).
//     @returns arko ( [ number, number ][] ) - La U-arko de S1 al E1.
function kreiEnanKornanArkon(sx: number, sz: number, ekstera: number): [ number, number ][] {
  return kreiArkPunktojn(sx * ( ekstera + KORNA_R ), sz * ( ekstera + KORNA_R ), KORNA_ENA_R, -sx, -sz).reverse();
}

// kreiEksteranKurbanArkon — La ekstera kurbo de la TUTA angulo en la DU-braka
// kvadranto ( sx, sz ). Gxi iras de voj-rando al voj-rando ( de E1 al S1 )
// cxirkaux la sama centro O per la radiuso KORNA_R kaj tangentigxas al ambaux
// vojaj eksteraj randoj, do la vojaj bordoj fluas glate en la kurbon.
//     @param sx, sz ( number ) - La kvadranto ( cxiu ±1 ).
//     @param ekstera ( number ) - La voja ekstera duono ( por O, S1 kaj E1 ).
//     @returns arko ( [ number, number ][] ) - La kurbo de E1 al S1.
function kreiEksteranKurbanArkon(sx: number, sz: number, ekstera: number): [ number, number ][] {
  return kreiArkPunktojn(sx * ( ekstera + KORNA_R ), sz * ( ekstera + KORNA_R ), KORNA_R, -sx, -sz);
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
// konstruiRondajnKapojn kaj la ordinaraj vojoj.
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

// ⟪ La mezursistemo de la vojoj 📏 ⟫ — ĉiu longo en la voja mondo estas en la
// longounuo de CAX2L ( vidu S2WENI/CAX2L.md ). La mondo havas UNU longounuon,
// 0o100 Peu ( la koda unuo de la tereno kaj de la kradoj ), kaj la komentoj
// donas la Peu-valoron kiam ĝi helpas legi la nombron. 0o1 Peu estas la plej
// malgranda mezuro, kiun oni bezonas ĉi tie — la dikeco de fadeno de la
// teksajxoj, la harareto de la polygonOffset-margxenoj.
//
// VOJA_DIKECO — La dikeco de la voja plato: kiom alte la voja rubando staras
// super la tereno, tio estas kiom alta estas la videbla andezita rando de la
// flanko. La malnova valoro estis 0o2/0o10 ( 0o20 Peu ) — la stratoj aspektis
// kiel levitaj estradoj kun alta sxtonsxirmo, kaj sur deklivoj la rando sxajnis
// MURETO. Nun 0o5/0o100 ( 0o5 Peu ): la rubando kusxas preskaux sur la tereno,
// la rando legigxas kiel maldika sxirmo, kaj la vojo mem sxajnas PLI PLATA.
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
export const VOJA_DIORITA_DUONO = 0o7/0o10;
export const VOJA_BORDA_LARĜO = 0o3/0o5;
export const VOJA_EKSTERA_DUONO = VOJA_DIORITA_DUONO + VOJA_BORDA_LARĜO;

// KORNA_R — La UNUFORMA radiuso de la ekstera kurbo en la DU-braka kvadranto
// ( per kreiEksteranKurbanArkon ). Gxi egalas la andezitan bordon, do la kurbo
// restas tangenta al la vojaj eksteraj randoj.
// KORNA_ENA_R — La radiuso de la ena diorita rando ( per kreiEnanKornanArkon ).
// Gxi estas KORNA_R plus la borda largxo, do ambaux arkoj estas SAMCENTRAJ
// ( centro O ekster la plato ) kaj la andezita strio inter ili havas uniforman
// largxon ( la bordon ) en la tuta korno. Ambaux radiusoj validas en cxiuj
// kvar kvadrantoj, do la kvarvoja krucigxo, la T-kunigo kaj la L-kornero
// kunhavas unu arkoparon.
export const KORNA_R = VOJA_BORDA_LARĜO;
export const KORNA_ENA_R = VOJA_BORDA_LARĜO + KORNA_R;

// VOJA_TRUA_DUONO — La duon-longo de la vojaj truoj cxirkaux cxiu kunigo
// ( la vojoj haltas cxe gxia rando ). Gxi estas la plata duono plus la korna
// radiuso, do la truoj atingas la tangentopunktojn de la rondigitaj kornoj
// ( S1 kaj E1 ) kaj la plataj stumpoj plenigas ilin gxis la vojaj randoj.
export const VOJA_TRUA_DUONO = VOJA_EKSTERA_DUONO + KORNA_R;

// kreiSegmentajnPartojn — La partoj de unu voja segmento kiujn la geometrio
// konstruu, laŭ la segmentaj distancoj ( 0 .. longo ). Ĉiu KUNIGO forprenas la
// truan duonon de la vojo ( VOJA_TRUA_DUONO ) ambaŭflanke de la
// kuniga punkto — la kuniga plato kaj gxiaj stumpoj plenigas tiun intervalon
// per sia propra surfaco, do la andezitaj flankoj de la vojoj ne povas kuŝi
// super la dioritaj partoj de la plato ( tion faris la rektangulaj anguloj
// antauxe ).
//
// ⟨ La perpendikulara tolero 📃 ⟩ — la kunigaj punktoj de la KRADA urbo sidas
// ĝuste SUR la vojaj centrolinioj ( la linioj kruciĝas en la punkto mem ), do
// ilia perpendikulara distanco estas nulo. Kelkaj skulptitaj vojoj tamen
// FINIĜAS ĉe la RANDO de la vojo, kiun ili renkontas — la ponto kaj la avenuo
// finiĝas ĉe VOJA_EKSTERA_DUONO de la kaja centrolinio, ne ĉe ĝi mem ( la deko
// devas surteriĝi sur la kajan rubandon, ne trapasi ĝin ĝis la mezo ). Tia
// kunigo sidas 1.475 unuojn FLANKEN de la finiĝanta vojo, do malstrikta tolero
// estas nepra ĉe la segmentaj FINOJ; meze de vojo ĝi restas preskaŭ nula, ĉar
// tie tranĉus nur kunigo, kiu apartenas al ALIA vojo — truo, kiun tiu plato ne
// kovrus. Sen ĉi tiu apartigo la fino de la ponto neniam ricevis truon: ĝia
// rubando penetris en la kunigan kvadraton, du pavimoj kuŝis samalte unu en la
// alia, kaj la rekta andezita rando de la deko tranĉis la rondigitan kornon de
// la plato.
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
    const laux = rx * ndx + rz * ndz;
    if ( laux < -VOJA_TRUA_DUONO || laux > longo + VOJA_TRUA_DUONO ) continue;
    const perpendikulara = Math.abs(rx * ndz - rz * ndx);
    // ⟨ Meze — ĝuste sur la centrolinio 📃 ⟩ kaj ⟨ Ĉe la finoj — ĝis la
    // rubanda rando 📃 ⟩ — vidu la klarigon super la funkcio.
    const cxeFino = laux <= VOJA_TRUA_DUONO || laux >= longo - VOJA_TRUA_DUONO;
    const perpendikularaTolero = ( cxeFino ? VOJA_EKSTERA_DUONO : 0o1/0o100 ) + 0o1/0o1000;
    if ( perpendikulara > perpendikularaTolero ) continue;
    truoj.push([ Math.max(0, laux - VOJA_TRUA_DUONO), Math.min(longo, laux + VOJA_TRUA_DUONO) ]);
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
          konstruiSegmentonEnBufrojn(px1, pz1, px2, pz2, bendoj, VOJA_DIKECO, defAlt, bufroj, def.glata === true);
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
  // ⟨ Aŭtomataj rondigitaj finoj 📃 ⟩ — la unua kaj la lasta punktoj de ĉiu
  // difino kun `kapoj: true` estas liberaj voj-finoj. Ĉiu fino ekster ĉiu kuniga
  // truo ( do ne kovrita de plato ) ricevas rondigitan ĉapon aux­tomate, kun la
  // elira direkto de la vojo. Kradaj segmentoj, doka ŝtuparoj kaj aliaj
  // internaj difinoj sen `kapoj: true` ne ricevas ĉapojn. Liberaj finoj ( kajaj
  // finajxoj, pontaj surterigxoj, T-kunigoj al skulptitaj vojoj ) rondigxas mem.
  const kapoj = new Map<( x: number, z: number ) => number, { nodoj: [ number, number ][]; direktoj: [ number, number ][] }>();
  const kapoVidita: [ number, number ][] = [];
  // Kunigitaj finoj ( la sama punkto kiel fino de pluraj difinoj ) estas
  // internaj kubutoj, ne voj-finoj — ili ricevas nenian ĉapon.
  const finokalkulo = new Map<string, number>();
  for ( const def of defs ) {
    if ( def.pts.length < 2 || def.kapoj !== true ) continue;
    for ( const pto of [ def.pts[0], def.pts[def.pts.length - 1] ] ) {
      const klavo = pto[0] + "," + pto[1];
      finokalkulo.set(klavo, ( finokalkulo.get(klavo) ?? 0 ) + 1);
    }
  }
  for ( const def of defs ) {
    if ( def.pts.length < 2 || def.kapoj !== true ) continue;
    // La dokaj ŝtuparoj jam havas sian finon ( la rondigita platforma pinto ),
    // do ili ricevas nenian ĉapon.
    if ( def.stuparo === true ) continue;
    const finoj: [ [ number, number ], [ number, number ] ][] = [
      [ def.pts[0], def.pts[1] ],
      [ def.pts[def.pts.length - 1], def.pts[def.pts.length - 2] ],
    ];
    for ( const [ fino, najbaro ] of finoj ) {
      const dx = fino[0] - najbaro[0], dz = fino[1] - najbaro[1];
      const direktaLongo = Math.hypot(dx, dz);
      if ( direktaLongo < 0o1/0o100 ) continue;
      // Kunigita fino ( interna kubuto ) ricevas nenian ĉapon.
      if ( ( finokalkulo.get(fino[0] + "," + fino[1]) ?? 0 ) > 1 ) continue;
      // Jam kovrita fino ( du vojoj kunigas kap-al-kape, aux fermita buklo )
      // ricevas unu solan ĉapon — neniu duobla geometrio samloke.
      if ( kapoVidita.some(([ vx, vz ]) => Math.hypot(fino[0] - vx, fino[1] - vz) < 0o1/0o100) ) continue;
      let enTruo = false;
      for ( const [ kX, kZ ] of kunigoj ) {
        if ( Math.hypot(fino[0] - kX, fino[1] - kZ) < VOJA_TRUA_DUONO + 0o1/0o100 ) { enTruo = true; break; }
      }
      if ( enTruo ) continue;
      kapoVidita.push([ fino[0], fino[1] ]);
      const defAlt = def.heightFn || heightFn;
      let grupo = kapoj.get(defAlt);
      if ( !grupo ) { grupo = { nodoj: [], direktoj: [] }; kapoj.set(defAlt, grupo); }
      grupo.nodoj.push([ fino[0], fino[1] ]);
      grupo.direktoj.push([ dx / direktaLongo, dz / direktaLongo ]);
    }
  }
  for ( const [ altFn, grupo ] of kapoj ) {
    konstruiRondajnKapojn(sceno, grupo.nodoj, grupo.direktoj, altFn, dioritaMaterialo, andezitaMaterialo);
  }
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

// konstruiSegmentonEnBufrojn — La buffer-a internaĵo de unu voja segmento.
// ĈIU vojo — la kradaj stratoj, la spronoj de la konstruaĵoj kaj la
// skulptitaj mondvojoj — iras tra ĉi tiu SAMA funkcio, kolektite en la samajn
// bufrojn ( unu po materialo por la tuta reto ).
// ⟨ Nur ŝtupoj 📃 ⟩ — ĉiu ordinara intervalo estas PLATA ŝtupo. Ĝi specimenas la
// du RANDOJN ( la komenco kaj la fino — la maksimuman kaj minimuman teren-altojn
// de iliaj lateralaj anguloj ), KAJ la INTERNON de la intervalo ( kvaronaj
// punktoj laŭlonge — vidu "Kromaj specimenoj meze" sube ), sidas je la ALTA
// rando ( la maksimumo de ĉiuj specimenoj ) kaj havas vertikalan vizaĝon ĝis sub
// la teron. La vojo NENIAM kliniĝas — la alto ŝanĝiĝas nur per la naturaj ŝtupoj,
// kaj la najbaraj ŝtupoj kunhavas randan specimenon, do la transiro restas
// preciza. La profundo ĉiam etendiĝas sub la minimuman specimenon + margxeno —
// neniu ŝvebanta rando, neniu sinko. ( La nura escepto estas `glata: true` — la REKTA ponta
// deko, kiu devas resti unu linio kun sia balustrado kaj arko. )
function konstruiSegmentonEnBufrojn(x1: number, z1: number, x2: number, z2: number,
  bendoj: VojBendo[],
  dikecoBaza: number,
  heightFn: ( x: number, z: number ) => number,
  bufroj: VojGeometriajBufroj,
  glata = false
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
    // ⟨ Randaj specimenadoj 📃 ⟩ — la maksimuman kaj minimuman teren-altojn de
    // la du lateralaj anguloj de ĉiu rando. La najbara ŝtupo specimenas LA
    // SAMAJN punktojn ĉe la komuna rando — la supro daŭriĝas kontinue.
    const h0a = heightFn(sx1 - latX, sz1 - latZ);
    const h0b = heightFn(sx1 + latX, sz1 + latZ);
    const h1a = heightFn(sx2 - latX, sz2 - latZ);
    const h1b = heightFn(sx2 + latX, sz2 + latZ);
    const minimum0 = Math.min(h0a, h0b);
    const minimum1 = Math.min(h1a, h1b);
    const maks0 = Math.max(h0a, h0b);
    const maks1 = Math.max(h1a, h1b);
    if ( glata ) {
      // ⟨ Glata deklivo ( nur la ponta deko ) 📃 ⟩ — la ponta deko estas unu
      // REKTA trabo, kaj ĝia balustrado kaj arko ( konstruiPonton ) sekvas la
      // saman rektan linion. Se la deko ŝtupus, la fostoj kaj la arko misalignus
      // kun la ŝtupoj, do nur ĉi tiu speciala difino ( `glata: true` ) restas
      // klinita — ĉiuj ordinaraj vojoj ŝtupas ( sube ).
      const s0 = maks0 + 0o1/0o100 + dikecoBaza;
      const s1 = maks1 + 0o1/0o100 + dikecoBaza;
      const difo = s1 - s0;
      vojSuprajxoj.push({ x1: sx1, z1: sz1, x2: sx2, z2: sz2, duono: eksteraDuon, y0: s0, y1: s1 });
      const klinoL = Math.hypot(pasoLongo, difo);
      const ang = Math.atan2(difo, pasoLongo);
      const dikeco = ( Math.max(s0 - minimum0, s1 - minimum1) + ANGULA_PROVOLIRO ) / Math.cos(ang);
      const y = ( s0 + s1 ) / 2 - dikeco * Math.cos(ang);
      for ( const bendo of bendoj ) {
        const geometrio = kreiSegmentGeometrion(bendo.largho, klinoL, dikeco, bendo.ofseto);
        geometrio.rotateX(ang);
        bufroj.aldoni(geometrio, bendo.materialo, matricoPor(difX, difZ, movX, y, movZ));
      }
      continue;
    }
    // ⟨ ĈIAM ŝtupoj, neniam deklivo 📃 ⟩ — ĉiu ordinara vojo NENIAM kliniĝas.
    // Ĉiu intervalo estas PLATA ŝtupo, kies supro sidas je la ALTA rando de la
    // intervalo ( la maksimumo de la du randaj specimenoj ), kaj la sekva
    // intervalo komenciĝas je la sama komuna rando. La alto do ŝanĝiĝas per
    // naturaj ŝtupoj — la riso estas ĝuste la terena falo trans unu intervalon —
    // anstataŭ per glata malsupren-kurbiĝo. Ĉar la ŝtupo sidas je la alta rando,
    // la vojo ĉiam kovras la terenon ( nek sinko nek elfluo ), kaj la profundo
    // malsupreniras sub ambaŭ randajn minimumojn + margxenon — la vertikala
    // vizaĝo montras la andezitan/dioritan bordon kiel la ŝtupa riso.
    // ⟨ Kromaj specimenoj meze 📃 ⟩ — la tereno povas ELSTARI inter la du randoj
    // de intervalo. La krado specimeniĝas ĉiun SKULPTA_PASOn ( 0o4 unuoj ), kaj la
    // intervalaj randoj ne ĉiam falas sur kradonodon, do la maksimumo de la du
    // randaj specimenoj povas preterlasi terenan elstaraĵon MEZE de la intervalo
    // — la tero tiam pinĉas tra la plata supro ( ĝuste tio estis la "duone sub la
    // tero" simptomo ĉe la kajo apud la riverbordo ). Ni do specimenas ankaŭ la
    // INTERNON de la intervalo — kvaronaj punktoj laŭlonge kaj la mezo flanke —
    // kaj prenas la maksimumon por la supro kaj la minimumon por la profundo. La
    // randoj restas la samaj specimenoj, do la ŝtupoj daŭre kongruas ĉe la komunaj
    // randoj kaj la alta rando de ĉiu intervalo restas la reganta.
    let maksSupro = Math.max(maks0, maks1);
    let minProfundo = Math.min(minimum0, minimum1);
    for ( const f of [ 0o1/0o4, 0o1/0o2, 0o3/0o4 ] ) {
      const mezaX = sx1 + ( sx2 - sx1 ) * f, mezaZ = sz1 + ( sz2 - sz1 ) * f;
      const hmA = heightFn(mezaX - latX, mezaZ - latZ);
      const hmB = heightFn(mezaX + latX, mezaZ + latZ);
      const hmC = heightFn(mezaX, mezaZ);
      if ( hmA > maksSupro ) maksSupro = hmA;
      if ( hmB > maksSupro ) maksSupro = hmB;
      if ( hmC > maksSupro ) maksSupro = hmC;
      if ( hmA < minProfundo ) minProfundo = hmA;
      if ( hmB < minProfundo ) minProfundo = hmB;
      if ( hmC < minProfundo ) minProfundo = hmC;
    }
    const supro = maksSupro + 0o1/0o100 + dikecoBaza;
    // Registru la piedeblan supraĵon de la ŝtupo — plata supro je supro.
    vojSuprajxoj.push({ x1: sx1, z1: sz1, x2: sx2, z2: sz2, duono: eksteraDuon, y0: supro, y1: supro });
    const dikeco = supro - ( minProfundo - ANGULA_PROVOLIRO );
    const y = supro - dikeco;
    for ( const bendo of bendoj ) {
      const geometrio = kreiSegmentGeometrion(bendo.largho, pasoLongo, dikeco, bendo.ofseto);
      bufroj.aldoni(geometrio, bendo.materialo, matricoPor(difX, difZ, movX, y, movZ));
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
// restas nur por la lampoj ( placajNodoj en urbo.ts ). Nur liberaj voj-finoj
// ricevas ĉapojn — konstruiVojojn detektas ilin aux­tomate ( ĉiu difino-fino
// ekster la kunigaj truoj ) — do la doka bordo kaj la aliaj skulptitaj finoj
// rondigxas sen mana listo.

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
  fermitaj: Map<string, [ number, number ]> = new Map(),
  rotacioj: Map<string, number> = new Map(),
  direktoj: Map<string, [ number, number ][]> = new Map()
): void {
  if ( punktoj.length === 0 ) return;
  // La plato sidas super la vojoj kaj ĝiaj offsetoj estas la PLEJ FORTAJ (
  // -3/-2 por la diorito, -4/-5 por la andezito — kontraŭ la voja centro
  // -2/-4 kaj la voja bordo -1/-1 ). La plato do decidas ĉie ene de sia
  // kvadrato; la vojoj sub ĝi ne povas trarampi, kaj ĉar la vojoj haltas ĉe
  // la rando de la kvadrato ( konstruiVojojn lasas la kunigajn truojn ), la
  // plato estas la sola supraĵo ene.
  const { supraMaterialo, bordaMaterialo } = kreiVojojnMaterialojn(dioritaMaterialo, andezitaMaterialo, -3, -2, -4, -5);
  const bufroj = kreiGeometriajnBufrojn();
  for ( const [ x, z ] of punktoj ) {
    // La brakoj de la kunigo — ĉiu komponento de la fermita direkto (±1 aŭ 0)
    // forprenas unu brakon. T-kunigo havas unu, L-kornero du, kaj la kvarvoja
    // kruciĝo neniun; la brako laŭ la kvadranto ( sx, sz ) ekzistas ĝuste kiam
    // sx NE estas la fermita direkto laŭ x ( kaj same laŭ z ).
    const ferma = fermitaj.get(x + "," + z);
    const fx = ferma ? ferma[0] : 0, fz = ferma ? ferma[1] : 0;
    const rotacio = rotacioj.get(x + "," + z) ?? 0;
    const rotKos = Math.cos( rotacio ), rotSin = Math.sin( rotacio );
    // ⟨ Angula specimenado 📃 ⟩ — la SUPRO restas je la malalta terena nivelo
    // ( tereno + VOJA_SUPRO_LEVIGXO ) kaj leviĝas ĝis la maksimuma angula alto
    // nur en deklivoj. La profundo etendiĝas sub la minimuman angulan altecon +
    // margxeno — la flankaj muroj ĉiam enfosiĝas ( neniu ŝvebanta rando ).
    const altoj = plataAltoj(x, z, rotacio, heightFn);
    const supro = altoj.supro;
    const platoDikeco = supro - ( altoj.minimumo - ANGULA_PROVOLIRO );
    const bazo = supro - platoDikeco;
    // ⟨ La kvadrantoj 📃 ⟩ — la plato konsistas el la kvar kvadrantoj, ĉiu kun
    // sia diorita parto ( la strioj de la vojoj kiuj trapasas ĝin ) kaj sia
    // andezita parto. La samaj offsetoj kaj la sama profundo por ĉiuj, do la
    // partoj najbaras sen interkovri kaj neniu koincidaj-facoj batalo ekzistas.
    const aldoni = ( punktoj2: [ number, number ][], materialo: THREE.MeshStandardMaterial ): void => {
      // ⟨ Neniu plato preter braka fino 📃 ⟩ — la plato rajtas kovri nur la
      // truon de la kunigo; preter la fino-linio de iu brako kusxas la vojo
      // mem. La perpendikularaj brakoj jam respektas ĉiun limon ( iliaj arkoj
      // estas tangeantaj kaj la stumpoj atingas la finon ekzakte ), do ĉi tiu
      // tranĉo estas NE-AGO por la krada urbo kaj por ĉiu orta kunigo — ĝi
      // forprenas nur la kojnojn, kiujn la OBLIKVAJ brakoj lasus. Sen ĝi la
      // plato etendigxas gxis 0.4 unuojn en la vojon kaj ĝia rekta andezita
      // rando aperas trans la kurbo de la korno.
      let randaj = punktoj2;
      for ( const d of lokajBrakoj ) {
        randaj = tranĉi(randaj, d);
        if ( randaj.length < 3 ) return;
      }
      const rotaciitaj = randaj.map( p => [
        rotKos * p[0] - rotSin * p[1],
        rotSin * p[0] + rotKos * p[1],
      ] as [ number, number ] );
      const geometrio = new THREE.ExtrudeGeometry(kreiFormonElPunktoj(rotaciitaj), { depth: platoDikeco, bevelEnabled: false });
      geometrio.rotateX(-Math.PI / 2);
      bufroj.aldoni(geometrio, materialo, new THREE.Matrix4().makeTranslation(x, bazo, z));
    };
    // ⟨ La kvadranta kadro 📃 ⟩ — ĉiu punkto skribiĝas kiel ( trans, laŭ ) paro
    // en la kvadranto ( sx, sz ), kie `trans` estas la perpendikulara ofseto de
    // la braka akso kaj `laŭ` la distanco laŭ gxi. `lauxX` ( la brako laŭ x )
    // mapas trans → z kaj laŭ → x, `lauxZ` male. Ambaŭ uzas la SAMAN argumentan
    // ordon, do unu formulo priskribas la sekcon en ĉiu kvadranto.
    const diorita = VOJA_DIORITA_DUONO, ekstera = VOJA_EKSTERA_DUONO;
    const stumpofino = ekstera + KORNA_R;
    // ⟨ La VERAJ brakoj 📃 ⟩ — la skulptitaj kunigoj liveras la direktojn de
    // siaj brakoj, la kradaj ne ( ties brakoj ĉiam kuŝas sur la aksoj, do la
    // aksa kadro estas ekzakta por ili ). La direktoj venas en mondaj
    // koordinatoj, do ni turnas ilin en la lokan kadron per la INVERSO de la
    // turno, kiun `aldoni` uzas ( rotKos·x + rotSin·z, −rotSin·x + rotKos·z ).
    //
    // ⟨ Kial la brakoj gravas 📃 ⟩ — la plato konstruiĝas en LOKA kadro kaj
    // la anguloj ( la arkoj, la randaj stumpoj ) supozis, ke la brakoj kuŝas
    // sur la aksoj. Ĉe malperpendikulara kunigo — la avenuo renkontas la
    // kajon je 0o10 gxıs 0o13 gradoj — la OBLIKVA brako tiam NE kongruas kun
    // la aksa stumpo: ĝia rekta andezita bordo ( kiu finigxas 2.075 unuojn
    // de la centro ) tralikigxas en la rondigitan kornon de la plato kaj
    // aperas kiel rekta linio trans la kurbo. Kun la veraj direktoj la
    // stumpo, la tangentopunktoj kaj la arkoj sekvas la brakon mem, kaj la
    // vojoj daŭras senfende en la platon.
    const lokajBrakoj: [ number, number ][] = ( direktoj.get(x + "," + z) ?? [] )
      .map( d => [ rotKos * d[0] + rotSin * d[1], -rotSin * d[0] + rotKos * d[1] ] as [ number, number ] )
      .filter( d => Math.hypot(d[0], d[1]) > 0o1/0o1000 );
    // unuo — la vektoro normaligita al longo 1.
    const unuo = ( d: [ number, number ] ): [ number, number ] => {
      const longo2 = Math.hypot(d[0], d[1]);
      return [ d[0] / longo2, d[1] / longo2 ];
    };
    // normalo — la perpendikularo de d turnita al la flanko de `celo` ( la
    // alia brako aŭ la kvadranta direkto ) — do la ofsetoj iras EN la kornon.
    const normalo = ( d: [ number, number ], celo: [ number, number ] ): [ number, number ] => {
      const n: [ number, number ] = [ -d[1], d[0] ];
      return n[0] * celo[0] + n[1] * celo[1] < 0 ? [ d[1], -d[0] ] : n;
    };
    // ⟨ Tranĉo laŭ la braka fino 📃 ⟩ — la plato NE rajtas etendiĝi preter la
    // finoj de siaj brakoj ( la vojaj truoj, VOJA_TRUA_DUONO ), alie ĝi kovrus
    // la vojon mem per diorito. La perpendikularaj brakoj atingas sian finon
    // ekzakte ( la anguloj estas tangeantaj al la bezonataj linioj ), sed la
    // OBLIKVAJ NE — iliaj tangentpunktoj falas preter la fino-linio. Ni do
    // tranĉas ĉiun angulan parton per la du duonaj ebenoj p · u ≤ fino.
    const tranĉi = ( punktoj2: [ number, number ][], direkto: [ number, number ] ): [ number, number ][] => {
      const ena: [ number, number ][] = [];
      for ( let i = 0; i < punktoj2.length; i++ ) {
        const a = punktoj2[i], b = punktoj2[( i + 1 ) % punktoj2.length];
        const da = a[0] * direkto[0] + a[1] * direkto[1] - stumpofino;
        const db = b[0] * direkto[0] + b[1] * direkto[1] - stumpofino;
        if ( da <= 0 ) ena.push(a);
        if (( da < 0 && db > 0 ) || ( da > 0 && db < 0 )) {
          const t = da / ( da - db );
          ena.push([ a[0] + ( b[0] - a[0] ) * t, a[1] + ( b[1] - a[1] ) * t ]);
        }
      }
      return ena;
    };
    // arko — la INTERNajn punktojn de cirkla arko ĉirkaŭ c kun radiuso r, de
    // la punkto a al la punkto b, laŭ la pli mallonga vojo ( la konveksa
    // korno ). La finoj mem jam estas verticoj de la plurangulo.
    const arko = ( c: [ number, number ], r: number, a: [ number, number ], b: [ number, number ] ): [ number, number ][] => {
      const a0 = Math.atan2(a[1] - c[1], a[0] - c[0]);
      let a1 = Math.atan2(b[1] - c[1], b[0] - c[0]);
      while ( a1 - a0 > Math.PI ) a1 -= 2 * Math.PI;
      while ( a0 - a1 > Math.PI ) a1 += 2 * Math.PI;
      const punktoj2: [ number, number ][] = [];
      for ( let i = 1; i < 0o10; i++ ) {
        const ang = a0 + ( a1 - a0 ) * i / 0o10;
        punktoj2.push([ c[0] + Math.cos(ang) * r, c[1] + Math.sin(ang) * r ]);
      }
      return punktoj2;
    };
    for ( const sx of [ -1, 1 ] ) {
      for ( const sz of [ -1, 1 ] ) {
        const lauxX = ( trans: number, lauv: number ): [ number, number ] => [ sx * lauv, sz * trans ];
        const lauxZ = ( trans: number, lauv: number ): [ number, number ] => [ sx * trans, sz * lauv ];
        const brakoX = sx !== fx, brakoZ = sz !== fz;
        // La brakoj de la kunigo, kiuj kuŝas en ĉi tiu kvadranto.
        const kvadrantaj = lokajBrakoj.filter( d => sx * d[0] >= -0o1/0o1000 && sz * d[1] >= -0o1/0o1000 );
        if ( brakoX && brakoZ && kvadrantaj.length === 2 ) {
          // ⟨ DU brakoj, laŭ iliaj VERAJ direktoj 📃 ⟩ — u estas la pli
          // aksa brako ( la trapasanta vojo ), w la alia ( la finigxanta ).
          // nu kaj nw estas iliaj perpendikularoj EN la kornon. La korno-centro
          // C kuŝas sur la komuna punkto de la du randoj ofsetitaj eksteren per
          // ekstera + KORNA_R — la samaj du linioj, al kiuj la ekstera kurbo
          // ( r = KORNA_R ) kaj la ena diorita rando ( r = KORNA_ENA_R ) estas
          // tangeantaj, ĉar KORNA_ENA_R = KORNA_R + la borda larĝo.
          const unuaAksa = Math.abs(kvadrantaj[0][0]) >= Math.abs(kvadrantaj[1][0]);
          const u = unuo(unuaAksa ? kvadrantaj[0] : kvadrantaj[1]);
          const w = unuo(unuaAksa ? kvadrantaj[1] : kvadrantaj[0]);
          const nu = normalo(u, w), nw = normalo(w, u);
          const det = u[1] * w[0] - u[0] * w[1];
          if ( Math.abs(det) > 0o1/0o1000 ) {
            const b0 = stumpofino * ( nw[0] - nu[0] ), b1 = stumpofino * ( nw[1] - nu[1] );
            const alfa = ( -b0 * w[1] + w[0] * b1 ) / det;
            const c: [ number, number ] = [ stumpofino * nu[0] + alfa * u[0], stumpofino * nu[1] + alfa * u[1] ];
            const rEna = KORNA_ENA_R, rEkstera = KORNA_R;
            const enaU: [ number, number ] = [ c[0] - rEna * nu[0], c[1] - rEna * nu[1] ];
            const enaW: [ number, number ] = [ c[0] - rEna * nw[0], c[1] - rEna * nw[1] ];
            const ekU: [ number, number ] = [ c[0] - rEkstera * nu[0], c[1] - rEkstera * nu[1] ];
            const ekW: [ number, number ] = [ c[0] - rEkstera * nw[0], c[1] - rEkstera * nw[1] ];
            const punkto = ( t: number, lauv: number ): [ number, number ] =>
              [ u[0] * lauv + nu[0] * t, u[1] * lauv + nu[1] * t ];
            const punktoW = ( t: number, lauv: number ): [ number, number ] =>
              [ w[0] * lauv + nw[0] * t, w[1] * lauv + nw[1] * t ];
            const diorito = tranĉi([ [ 0, 0 ], punkto(0, stumpofino), punkto(diorita, stumpofino), enaU,
              ...arko(c, rEna, enaU, enaW), enaW, punktoW(diorita, stumpofino), punktoW(0, stumpofino) ], u);
            const diorito2 = tranĉi(diorito, w);
            if ( diorito2.length >= 3 ) aldoni(diorito2, supraMaterialo);
            const bordo = tranĉi([ punkto(diorita, stumpofino), punkto(ekstera, stumpofino), ekU,
              ...arko(c, rEkstera, ekU, ekW), ekW, punktoW(ekstera, stumpofino), punktoW(diorita, stumpofino),
              enaW, ...arko(c, rEna, enaW, enaU), enaU ], u);
            const bordo2 = tranĉi(bordo, w);
            if ( bordo2.length >= 3 ) aldoni(bordo2, bordaMaterialo);
            continue;
          }
        }
        if ( brakoX && brakoZ ) {
          // DU brakoj — la du vojoj renkontigxas en cxi tiu kvadranto. La korno
          // inkluzivas la konektitan vojon laux ties TUTA largxo kaj atingas
          // gxis la tangentopunktoj ( S1 kaj E1 ), kiujn la vojaj truoj lasas
          // liberaj. La diorito sekvas la glatan U-arkon de stumpo-fino al
          // stumpo-fino kaj la andezito estas la uniforma strio inter la ena
          // kaj la ekstera arkoj ( amabaux samcentraj, largxo la bordo ). La
          // stumpoj reparas la truan intervalon per la sama sekco kiel la
          // vojoj, do la vojaj sekcoj dauras senfende en la kornon. Neniu
          // akra angulo restas, nek interne nek ekstere.
          const enaArko = kreiEnanKornanArkon(sx, sz, ekstera);
          const eksteraArko = kreiEksteranKurbanArkon(sx, sz, ekstera);
          aldoni([ [ 0, 0 ], lauxX(0, stumpofino), ...enaArko, lauxZ(0, stumpofino) ], supraMaterialo);
          aldoni([ lauxX(diorita, stumpofino), [ sx * stumpofino, sz * ekstera ],
            ...eksteraArko.slice().reverse().slice(1, -1),
            [ sx * ekstera, sz * stumpofino ], lauxZ(diorita, stumpofino),
            ...enaArko.slice().reverse().slice(1, -1) ], bordaMaterialo);
        } else if ( ( brakoX || brakoZ ) && kvadrantaj.length === 1 ) {
          // UNU brako, laŭ sia VERA direkto — la voja sekco daŭras rekte tra
          // la rando de la plato kaj atingas gxis la fino, kiun la voja truo
          // lasas libera. Neniu angulo ekzistas, do nenio por rondigi.
          const u = unuo(kvadrantaj[0]);
          const nu = normalo(u, brakoX ? [ 0, sz ] : [ sx, 0 ]);
          const p = ( t: number, lauv: number ): [ number, number ] =>
            [ u[0] * lauv + nu[0] * t, u[1] * lauv + nu[1] * t ];
          aldoni([ p(0, 0), p(0, stumpofino), p(diorita, stumpofino), p(diorita, 0) ], supraMaterialo);
          aldoni([ p(diorita, 0), p(diorita, stumpofino), p(ekstera, stumpofino), p(ekstera, 0) ], bordaMaterialo);
        } else if ( brakoX || brakoZ ) {
          // UNU brako, aksa kadro ( la krado ). La voja sekco daŭras rekte tra
          // la rando de la plato; neniu angulo ekzistas, do nenio por rondigi.
          const l = brakoX ? lauxX : lauxZ;
          aldoni([ l(0, 0), l(0, stumpofino), l(diorita, stumpofino), l(diorita, 0) ], supraMaterialo);
          aldoni([ l(diorita, 0), l(diorita, stumpofino), l(ekstera, stumpofino), l(ekstera, 0) ], bordaMaterialo);
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
// brakoj renkontiĝas ricevas la tutan rondigitan kornon ( la ena diorita U,
// la uniforma andezita strio inter la samcentraj arkoj kaj la stumpoj gxis la
// tangentopunktoj per kreiEnanKornanArkon kaj kreiEksteranKurbanArkon ), la
// trapasantaj brakoj ricevas stumpojn gxis la vojaj truoj, kaj aliloke restas
// nenia angulo. Neniu aparta arka funkcio bezonatas — unu plato, unu paro da
// materialoj, unu kunigo por la tuta reto.

// ⟨ La spronoj estas ORDINARAJ vojoj 📃 ⟩ — la vojeto de konstruaĵa pordo al
// la strato NE plu havas propran konstruilon ( la malnova konstruiSpronon kun
// sia propra bufraro kaj sia propra polygonOffset-hierarkio ). Ĝi estas
// ordinara `VojDifino` en la SAMA listo kiel la kradaj kaj la skulptitaj
// vojoj — la sama sekco, la samaj materialoj, la sama ŝtupa generacio, kaj —
// ĉefe — la sama truo ĉe la kunigo kaj la sama kuniga plato. Tiel la sprono
// ne plu povas kuŝi ene de la strato, kiun ĝi atingas, nek tralasiĝi tra la
// rondigita korno de la plato.

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
