// ≺⧼ ប៊ូហ្វ័រ និងខ្សែផ្លូវ 🧱 ⧽≻
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { kreiAndezitanTeksajxon } from "../../komunajxoj/teksajxoj/andezito.js";
import { kreiDioritanTeksajxon } from "../../komunajxoj/teksajxoj/diorito.js";
import { VOJA_BORDA_LARĜO } from "./mezuroj.js";

// ⟪ ការភ្ជាប់ធរណីមាត្រ 📃 ⟫

export interface VojGeometriajBufroj {
  listoj: Map<THREE.Material, THREE.BufferGeometry[]>;
  aldoni(geometrio: THREE.BufferGeometry, materialo: THREE.Material, matrico: THREE.Matrix4): void;
  kunigi(sceno: THREE.Scene, kastajOmbroj?: boolean): void;
}

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

export function matricoPor(dx: number, dz: number, x: number, y: number, z: number): THREE.Matrix4 {
  const longo = Math.hypot(dx, dz);
  const direkto = new THREE.Vector3(dx / longo, 0, dz / longo);
  const flanko = new THREE.Vector3(-direkto.z, 0, direkto.x);
  const matrico = new THREE.Matrix4().makeBasis(flanko, direkto, new THREE.Vector3(0, 1, 0));
  matrico.setPosition(x, y, z);
  return matrico;
}

export const ANGULA_PROVOLIRO = 0o1/0o4;

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

export interface VojBendo {
  largho: number;
  ofseto: number;
  materialo: THREE.MeshStandardMaterial;
}

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
