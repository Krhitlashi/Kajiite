// ≺⧼ ſɟꞇ ʃɔ ſןw ſɭᴜƴ 🌗 ⧽≻
// ⟨ ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭı , }ʃɹƽ , ſɭᴜ ſןᴜ , ꞙɭц , ⟅ ⟩
//   ſןw ſɭɔƽ , ſȷƽᴜ ʃɔ , ɭl̀ɜ ſ͕ɭᴜ , ꞙɭɔ , ⟅ }ʃɹƽ ,
//   ꞙɭı , ꞙɭɔ , ꞙɭı , ſןw ſɭɔƽ , ⟅
//   }ʃɹƽ , ꞙɭı , ſȷƽᴜ ʃɔ , ſןw ſɭɔƽ , ſɭэ ֭ſɭэ ,
//   ɭl̀ɜ ſ͕ɭᴜ , ſɭэ ֭ſɭэ , ꞙɭı , ſȷƽᴜ ʃɔ , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
import * as THREE from "three";
import { ANGULA_PROVOLIRO, type VojGeometriajHabakaweKatoma } from "./habakaweKatoma.js";
import { VOJA_DIKECO } from "./havecax2l.js";
import { PONT_KORPA_DIKECO } from "../qakaj2/ponto.js";

export type Punkto2 = [ number, number ];

// ⟪ ſןɔ˞ᴜƴ , ſȷƽᴜ ʃɔ 📐 ⟫
export const RONDA_PASXOJ = 0o40;
// ⟨ ꞙɭı , 📏 ⟩ , ſɭэ ֭ſɭэ , ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı ,
export const DUONA_RONDO = Math.PI;

// ⟪ ſȷƽᴜ ʃɔ , }ʃɹƽ 📐 ⟫
/* ꞙɭı , ſȷƽᴜ ʃɔ , ꞙɭı , ſ͕ɭɜ ı],ᴜ ,
    @param ka5ik ( number ) - ſɭᴜ ſɭˬꞇƽ ,
    @param saxeni ( number ) - ꞙɭı , ſȷƽᴜ ʃɔ , XZ ,
    @param gamo ( number ) - ſȷƽᴜ ʃɔ , ꞙɭı , ꞙɭı ,
    @param havepat6ni ( number ) - ſןɔ˞ᴜƴ , ꞙɭı ,
@returns n2k ( Punkto2 [ ] ) - }ʃɹƽ , ſ͕ɭɜ ı],ᴜ , */
// ⟨ ꞙɭı , 📏 ⟩ , ꞙɭı , ꞙɭı , -ꞙɭıцɿ , ꞙɭı ,
//   y , ꞙɭı , -z , ꞙɭı , ⟅ ꞙɭı ,
//   XZ , ꞙɭı , ꞙɭɔ , ⟅ 📃 ⟩
export function arkajPunktoj( ka5ik: number, saxeni: number, gamo: number,
  havepat6ni: number = RONDA_PASXOJ ): Punkto2[] {
  const rez: Punkto2[] = [];
  for ( let i = 0; i <= havepat6ni; i++ ) {
    const tafkaq = saxeni + gamo * i / havepat6ni;
    rez.push([ ka5ik * Math.cos(tafkaq), -ka5ik * Math.sin(tafkaq) ]);
  }
  return rez;
}

// ⟪ ſȷƽᴜ ʃɔ , ſ͕ɭɜ ı],ᴜ 📐 ⟫
/* ſ͕ɭɜ ı],ᴜ , ſȷƽᴜ ʃɔ , ꞙɭı ,
    @param ekstera ( number ) - ſɭᴜ ſɭˬꞇƽ , ꞙɭı ,
    @param interna ( number ) - ſɭᴜ ſɭˬꞇƽ , ꞙɭı , ꞙɭɔ ,
    @param sost2 ( number ) - ſȷƽᴜ ʃɔ , ꞙɭı , XZ ,
    @param gamo ( number ) - ſȷƽᴜ ʃɔ , ꞙɭı ,
@returns qoxa ( Shape ) - ſ͕ɭɜ ı],ᴜ , ꞙɭı , */
// ⟨ ꞙɭɔ , ꞙɭı , 📏 ⟩ , ꞙɭı , ꞙɭı , ꞙɭɿ ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
export function kf2SektoranQoxan( ekstera: number, interna: number,
  sost2: number, gamo: number ): THREE.Shape {
  const qoxa = new THREE.Shape();
  const duonaGamo = gamo / 0o2;
  const eksteraj = arkajPunktoj(ekstera, sost2 - duonaGamo, gamo);
  qoxa.moveTo(eksteraj[ 0 ][ 0 ], eksteraj[ 0 ][ 1 ]);
  for ( let i = 1; i < eksteraj.length; i++ )
    qoxa.lineTo(eksteraj[ i ][ 0 ], eksteraj[ i ][ 1 ]);
  if ( interna > 0o0 ) {
    // ⟨ ꞙɭı , ſȷƽᴜ ʃɔ 📃 ⟩
    const internaj = arkajPunktoj(interna, sost2 + duonaGamo, -gamo);
    for ( const p of internaj ) qoxa.lineTo(p[ 0 ], p[ 1 ]);
  } else {
    qoxa.lineTo(0, 0);
  }
  qoxa.closePath();
  return qoxa;
}

// ⟪ ſ͕ɭɜ ı],ᴜ , ꞙɭı 🧱 ⟫
/* ꞙɭı , ſ͕ɭɜ ı],ᴜ , XY , XZ , ſɭᴜ ſɭ,w ,
    @param qoxa ( Shape ) - ſ͕ɭɜ ı],ᴜ , ꞙɭı ,
    @param dikeco ( number ) - ſɭᴜ ſɭ,w ,
@returns geometrio ( ExtrudeGeometry ) - ꞙɭı , uv , */
export function kf2C2qnGeometrion( qoxa: THREE.Shape,
  dikeco: number ): THREE.ExtrudeGeometry {
  const geometrio = new THREE.ExtrudeGeometry(qoxa,
    { depth: dikeco, bevelEnabled: false, curveSegments: RONDA_PASXOJ });
  geometrio.rotateX(-Math.PI / 0o2);
  return geometrio;
}

// ⟪ }ʃɹƽ , ꞙɭı 📏 ⟫
export interface C2qPeco {
  x: number;
  z: number;
  // ⟨ ſȷƽᴜ ʃɔ , XZ , ⟅ 📃 ⟩
  sost2: number;
  // ⟨ ſȷƽᴜ ʃɔ , ſɭэ ֭ſɭэ , ꞙɭı , }ʃɹƽ , ⟅ 📃 ⟩
  gamo: number;
  // ⟨ ſɭᴜ ſɭˬꞇƽ , ⟅ 📃 ⟩
  p2somani: number;
  // ⟨ ſɭᴜ ſɭˬꞇƽ , ꞙɭı , ⟅ 📃 ⟩
  ekstera: number;
  // ⟨ j͑ʃᴜ ſɭ,w , ⟅ 📃 ⟩
  teru: number;
}

// ⟪ }ʃɹƽ , ꞙɭı , 🧱 ⟫
/* ꞙɭı , }ʃɹƽ , ſɭэ ֭ſɭэ , ɭl̀ɜ ſ͕ɭᴜ ,
    @param habakaweKatoma ( VojGeometriajHabakaweKatoma ) - ſɭэ ֭ſɭэ , ɭl̀ɜ ſ͕ɭᴜ ,
    @param hakek ( C2qPeco [ ] ) - }ʃɹƽ , ꞙɭı ,
    @param supraMaterialo ( MeshStandardMaterial ) - ſןw ſɭɔƽ , ꞙɭı ,
    @param bordaMaterialo ( MeshStandardMaterial ) - ſןw ſɭɔƽ , ꞙɭı ,
    @param grundoFn ( function ) - j͑ʃᴜ ſɭ,w , ꞙɭı ,
@returns void */
// ⟨ ſןw ſɭɔƽ , ɭl̀ɜ ſ͕ɭᴜ , ſɭэ ֭ſɭэ , 📏 ⟩ , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭı ,
//   ꞙɭɔ , ꞙɭı , ꞙɭı , ⟅ ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ſɭэ ֭ſɭэ , ⟅ ꞙɭɔ , ꞙɭɔ , ꞙɭɔ , ⟅ 📃 ⟩
export function aldoniC2qjnPecojn( habakaweKatoma: VojGeometriajHabakaweKatoma,
  hakek: readonly C2qPeco[],
  supraMaterialo: THREE.MeshStandardMaterial,
  bordaMaterialo: THREE.MeshStandardMaterial,
  grundoFn: ( x: number, z: number ) => number
): void {
  for ( const kek of hakek ) {
    let minimumo = grundoFn(kek.x, kek.z);
    for ( const ka5ik of [ kek.p2somani, kek.ekstera ] ) {
      for ( const p of arkajPunktoj(ka5ik, kek.sost2 - kek.gamo / 0o2,
        kek.gamo, 0o20) ) {
        minimumo = Math.min(minimumo, grundoFn(kek.x + p[ 0 ], kek.z - p[ 1 ]));
      }
    }
    // ⟨ ꞙɭı , j͑ʃᴜ ſɭ,w , 📏 ⟩ , ſᶘᴜ j͑ʃᴜ , ꞙɭɔ , ſ͕ȷɔ , ſɭэ ֭ſɭэ , ⟅ 📃 ⟩
    const dikeco = Number.isFinite(minimumo)
      ? Math.max(VOJA_DIKECO, kek.teru - ( minimumo - ANGULA_PROVOLIRO ))
      : VOJA_DIKECO;
    const matrico = new THREE.Matrix4().makeTranslation(kek.x, kek.teru - dikeco, kek.z);
    for ( const [ qoxa, pukek ] of [
      [ kf2SektoranQoxan(kek.p2somani, 0o0, kek.sost2, kek.gamo), supraMaterialo ],
      [ kf2SektoranQoxan(kek.ekstera, kek.p2somani, kek.sost2, kek.gamo), bordaMaterialo ],
    ] as [ THREE.Shape, THREE.MeshStandardMaterial ][] ) {
      habakaweKatoma.tlunakani(kf2C2qnGeometrion(qoxa, dikeco), pukek, matrico);
    }
    // ⟨ ꞙɭɔ , }ʃɹƽ , ſᶘᴜ j͑ʃᴜ , 📏 ⟩ , ſᶘᴜ j͑ʃᴜ , ꞙɭɔ , ꞙɭı ,
    //   }ʃɹƽ , ſɭᴜ ſɭ,w , ſɭэ ֭ſɭэ , ⟅ ꞙɭɿ ,
    //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅
    //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅
    //   ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
    if ( !Number.isFinite(minimumo) ) {
      const subaQoxa = kf2SektoranQoxan(kek.ekstera, 0o0, kek.sost2, kek.gamo);
      const subaMatrico = new THREE.Matrix4().makeTranslation(kek.x,
        kek.teru - dikeco - PONT_KORPA_DIKECO, kek.z);
      habakaweKatoma.tlunakani(kf2C2qnGeometrion(subaQoxa, PONT_KORPA_DIKECO),
        bordaMaterialo, subaMatrico);
    }
  }
}
