// ≺⧼ La vojaj bufroj kaj bendoj 🧱 ⧽≻
// La kuniga maŝinaro de la vojoj — la bufroj ( VojGeometriajBufroj,
// kreiGeometriajnBufrojn ), la monda matrico ( matricoPor ), la angula
// specimenado ( specimeniAngulojn ), la tri bendoj de unu vojo ( VojBendo,
// kreiVojajnBendojn ) kaj la klonitaj materialoj ( kreiVojojnMaterialojn ).
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { kreiAndezitanTeksajxon } from "../../komunajxoj/teksajxoj/andezito.js";
import { kreiDioritanTeksajxon } from "../../komunajxoj/teksajxoj/diorito.js";
import { VOJA_BORDA_LARĜO } from "./mezuroj.js";

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
export interface VojGeometriajBufroj {
  listoj: Map<THREE.Material, THREE.BufferGeometry[]>;
  aldoni(geometrio: THREE.BufferGeometry, materialo: THREE.Material, matrico: THREE.Matrix4): void;
  kunigi(sceno: THREE.Scene, kastajOmbroj?: boolean): void;
}

// kreiGeometriajnBufrojn — Nova malplena bufraro. `kunigi` kunfandas ĉiun
// materialan liston per mergeGeometries kaj aldonas UN meshon po materialo
// ( nenio aldoniĝas kiam la listo restas malplena ).
//     @returns bufoj ( VojGeometriajBufroj ) - La bufroj de la konstrua funkcio.
export function kreiGeometriajnBufrojn(): VojGeometriajBufroj {
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
export function matricoPor(dx: number, dz: number, x: number, y: number, z: number): THREE.Matrix4 {
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
export const ANGULA_PROVOLIRO = 0o1/0o4;

// specimeniAngulojn — La maksimuman kaj minimuman teren-altojn super la
// kvar anguloj de rektangulo ( la voja ŝtupo aŭ la kruciĝa plato ).
// La voja ŝtupo sidas je la maksimumo ( ĉiam super la grundo ) kaj la
// ekstruda profundo kovras la malaltajn angulojn ( ĉiam enfosita ).
//     @param x, z ( number ) - La centro de la rektangulo.
//     @param duonX, duonZ ( number ) - La duon-ampleksoj laux la mondaj aksoj.
//     @param heightFn ( ( x, z ) => number ) - La terena alteco.
//     @returns altoj ( { maksimumo, minimumo } ) - La angulaj ekstremoj.
export function specimeniAngulojn(x: number, z: number, duonX: number, duonZ: number,
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
export interface VojBendo {
  largho: number;
  ofseto: number;
  materialo: THREE.MeshStandardMaterial;
}

// kreiVojajnBendojn — La tri apudajn bendojn de unu vojo. Diorita centro ( w )
// kun andezita bordo ( VOJA_BORDA_LARĜO ) apud gxi ambaŭflanke. La bordo estas
// la SAMA konstanto kiun uzas la kunigaj platoj ( VOJA_DIORITA_DUONO + bordo =
// VOJA_EKSTERA_DUONO ), do la voja spuro kaj la platoj finiĝas ĉe la samaj
// linioj kaj la transiro restas senfenda.
export function kreiVojajnBendojn(w: number,
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
export function kreiVojojnMaterialojn(dioritaMaterialo: THREE.MeshStandardMaterial,
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
