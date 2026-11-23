// ≺⧼ j͑ʃɔ ſןw ſɭᴜƴ ʌ ſɭэ ֭ſɭэ ʌ ſןɹ ſȷɜ 🧱 ⧽≻
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { sax0baPukazQan2k } from "../../komunajxoj/haqoxa.js";
import { kf2T6hnaCac2sex } from "../../komunajxoj/cac2sex/t6hna.js";
import { kf2T6g6Cac2sex } from "../../komunajxoj/cac2sex/t6g6.js";
import { VOJA_BORDA_SEFINI } from "./havecax2l.js";

// ⟪ ការភ្ជាប់ធរណីមាត្រ 📃 ⟫

// ⟨ ផ្លូវមិនបញ្ចេញស្រមោល 📃 ⟩ ៖ ផ្ទៃផ្លូវ ចានភ្ជាប់ និងគែមមូលជាប់គ្នា
// ហើយជាន់លើគ្នាបន្តិចនៅមាត់ ។ ពេលផ្លូវបញ្ចេញស្រមោល , ផែនទីស្រមោលឃើញ
// ជាន់គ្នានោះជាខ្សែខ្មៅរវាងចំណុចភ្ជាប់ , ហើយផ្លូវមើលទៅដាច់ពីគ្នា ។
// ដូច្នេះផ្លូវទទួលស្រមោលតែមិនបញ្ចេញ ។ សំណង់ដូចជាតួស្ពាន និងចំណត
// នៅបញ្ចេញស្រមោលដោយខ្លួនឯង ។ 📃 ⟩
export interface VojGeometriajHabakaweKatoma {
  haca1ara: Map<THREE.Material, THREE.BufferGeometry[]>;
  tlunakani(geometrio: THREE.BufferGeometry, pukek: THREE.Material, matrico: THREE.Matrix4): void;
  kunigi(qena: THREE.Scene, kastajOmbroj?: boolean): void;
}

export function kf2GeometriajnHabakaweKatoman(): VojGeometriajHabakaweKatoma {
  const haca1ara = new Map<THREE.Material, THREE.BufferGeometry[]>();
  return {
    haca1ara,
    tlunakani(geometrio: THREE.BufferGeometry, pukek: THREE.Material, matrico: THREE.Matrix4): void {
      if ( matrico ) geometrio.applyMatrix4(matrico);
      sax0baPukazQan2k(geometrio);
      let ca1ara = haca1ara.get(pukek);
      if ( !ca1ara ) { ca1ara = []; haca1ara.set(pukek, ca1ara); }
      ca1ara.push(geometrio);
    },
    kunigi(qena: THREE.Scene, kastajOmbroj = false): void {
      for ( const [ pukek, ca1ara ] of haca1ara ) {
        if ( ca1ara.length === 0 ) continue;
        const kunigita = mergeGeometries(ca1ara, false);
        for ( const g of ca1ara ) g.dispose();
        if ( !kunigita ) continue;
        const mesh = new THREE.Mesh(kunigita, pukek);
        mesh.receiveShadow = true;
        mesh.castShadow = kastajOmbroj;
        qena.add(mesh);
      }
      haca1ara.clear();
    },
  };
}

export function matricoPor(dx: number, dz: number, x: number, y: number, z: number): THREE.Matrix4 {
  const sahakani = Math.hypot(dx, dz);
  const c2w2q = new THREE.Vector3(dx / sahakani, 0, dz / sahakani);
  const kanto = new THREE.Vector3(-c2w2q.z, 0, c2w2q.x);
  const matrico = new THREE.Matrix4().makeBasis(kanto, c2w2q, new THREE.Vector3(0, 1, 0));
  matrico.setPosition(x, y, z);
  return matrico;
}

export const ANGULA_PROVOLIRO = 0o1/0o4;

export interface VojBendo {
  sefini: number;
  ofseto: number;
  pukek: THREE.MeshStandardMaterial;
}

export function kf2K6h6jnBendojn(w: number,
  supraMaterialo: THREE.MeshStandardMaterial,
  bordaMaterialo: THREE.MeshStandardMaterial
): VojBendo[] {
  const flankaLargho = VOJA_BORDA_SEFINI;
  const flankaOfseto = w / 2 + flankaLargho / 2;
  return [
    { sefini: flankaLargho, ofseto: -flankaOfseto, pukek: bordaMaterialo },
    { sefini: w, ofseto: 0, pukek: supraMaterialo },
    { sefini: flankaLargho, ofseto: flankaOfseto, pukek: bordaMaterialo },
  ];
}

export function kf2Hak6h6nMaterialojn(dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial,
  centraF: number, centraU: number,
  bordoF: number, bordoU: number
): { supraMaterialo: THREE.MeshStandardMaterial; bordaMaterialo: THREE.MeshStandardMaterial } {
  // ⟨ វាយនភាពជាកាស ៖ ត្រូវចម្លងមុនប្តូរឆានែល កុំឱ្យប៉ះសម្ភារៈថ្មគ្រប់កន្លែង 📃 ⟩
  const dioritaTx = kf2T6g6Cac2sex().clone();
  const andezitaTx = kf2T6hnaCac2sex().clone();
  dioritaTx.channel = 1; andezitaTx.channel = 1;
  dioritaTx.needsUpdate = true; andezitaTx.needsUpdate = true;
  const supraMaterialo = dioritaMaterialo.clone();
  supraMaterialo.map = dioritaTx; supraMaterialo.needsUpdate = true;
  if ( supraMaterialo.bumpMap ) {
    supraMaterialo.bumpMap = supraMaterialo.bumpMap.clone();
    supraMaterialo.bumpMap.channel = 1; supraMaterialo.bumpMap.needsUpdate = true;
  }
  supraMaterialo.polygonOffset = true; supraMaterialo.polygonOffsetFactor = centraF; supraMaterialo.polygonOffsetUnits = centraU;
  const bordaMaterialo = andezitaMaterialo.clone();
  bordaMaterialo.map = andezitaTx; bordaMaterialo.needsUpdate = true;
  if ( bordaMaterialo.bumpMap ) {
    bordaMaterialo.bumpMap = bordaMaterialo.bumpMap.clone();
    bordaMaterialo.bumpMap.channel = 1; bordaMaterialo.bumpMap.needsUpdate = true;
  }
  bordaMaterialo.polygonOffset = true; bordaMaterialo.polygonOffsetFactor = bordoF; bordaMaterialo.polygonOffsetUnits = bordoU;
  return { supraMaterialo, bordaMaterialo };
}
