// ≺⧼ ſɟꞇ ʃɔ ſןw ſɭᴜƴ 🌗 ⧽≻
// ⟨ ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭı , }ʃɹƽ , ſɭᴜ ſןᴜ , ꞙɭц , ⟅ ⟩
//   ſןw ſɭɔƽ , ſȷƽᴜ ʃɔ , ɭl̀ɜ ſ͕ɭᴜ , ꞙɭɔ , ⟅ }ʃɹƽ ,
//   ꞙɭı , ꞙɭɔ , ꞙɭı , ſןw ſɭɔƽ , ⟅
//   }ʃɹƽ , ꞙɭı , ſȷƽᴜ ʃɔ , ſןw ſɭɔƽ , ſɭэ ֭ſɭэ ,
//   ɭl̀ɜ ſ͕ɭᴜ , ſɭэ ֭ſɭэ , ꞙɭı , ſȷƽᴜ ʃɔ , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
import * as THREE from "three";
import { ANGULATSALETSALIRO, type Kas2kantaGeometriajHabakaweKatoma } from "./habakaweKatoma.js";
import { K6H6ASEFINI } from "./havecax2l.js";
import { PONTKORPADIKECO } from "../qakaj2/c2kanu.js";

export type N2k = [ number, number ];

// ⟪ ſןɔ˞ᴜƴ , ſȷƽᴜ ʃɔ 📐 ⟫
export const RONDAHATONA = 0o40;
// ⟨ ꞙɭı , 📏 ⟩ , ſɭэ ֭ſɭэ , ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı ,
export const DUONAC2Q = Math.PI;

// ⟪ ſȷƽᴜ ʃɔ , }ʃɹƽ 📐 ⟫
/* ꞙɭı , ſȷƽᴜ ʃɔ , ꞙɭı , ſ͕ɭɜ ı],ᴜ ,
    @param ka5ik ( number ) - ſɭᴜ ſɭˬꞇƽ ,
    @param saxeni ( number ) - ꞙɭı , ſȷƽᴜ ʃɔ , XZ ,
    @param gamo ( number ) - ſȷƽᴜ ʃɔ , ꞙɭı , ꞙɭı ,
    @param havepat6ni ( number ) - ſןɔ˞ᴜƴ , ꞙɭı ,
@returns n2k ( N2k [ ] ) - }ʃɹƽ , ſ͕ɭɜ ı],ᴜ , */
// ⟨ ꞙɭı , 📏 ⟩ , ꞙɭı , ꞙɭı , -ꞙɭıцɿ , ꞙɭı ,
//   y , ꞙɭı , -z , ꞙɭı , ⟅ ꞙɭı ,
//   XZ , ꞙɭı , ꞙɭɔ , ⟅ 📃 ⟩
export function hakekaf2n2k( ka5ik: number, saxeni: number, gamo: number,
  havepat6ni: number = RONDAHATONA ): N2k[] {
  const rez: N2k[] = [];
  for ( let i = 0o0; i <= havepat6ni; i++ ) {
    const tafkaq = saxeni + gamo * i / havepat6ni;
    rez.push([ ka5ik * Math.cos(tafkaq), -ka5ik * Math.sin(tafkaq) ]);
  }
  return rez;
}

// ⟪ ſȷƽᴜ ʃɔ , ſ͕ɭɜ ı],ᴜ 📐 ⟫
/* ſ͕ɭɜ ı],ᴜ , ſȷƽᴜ ʃɔ , ꞙɭı ,
    @param p6sca ( number ) - ſɭᴜ ſɭˬꞇƽ , ꞙɭı ,
    @param c2h2 ( number ) - ſɭᴜ ſɭˬꞇƽ , ꞙɭı , ꞙɭɔ ,
    @param sost2 ( number ) - ſȷƽᴜ ʃɔ , ꞙɭı , XZ ,
    @param gamo ( number ) - ſȷƽᴜ ʃɔ , ꞙɭı ,
@returns qoxa ( Shape ) - ſ͕ɭɜ ı],ᴜ , ꞙɭı , */
// ⟨ ꞙɭɔ , ꞙɭı , 📏 ⟩ , ꞙɭı , ꞙɭı , ꞙɭɿ ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
export function kf2SektoranQoxan( p6sca: number, c2h2: number,
  sost2: number, gamo: number ): THREE.Shape {
  const qoxa = new THREE.Shape();
  const p2somaniGamo = gamo / 0o2;
  const hap6sca = hakekaf2n2k(p6sca, sost2 - p2somaniGamo, gamo);
  qoxa.moveTo(hap6sca[ 0o0 ][ 0o0 ], hap6sca[ 0o0 ][ 0o1 ]);
  for ( let i = 0o1; i < hap6sca.length; i++ )
    qoxa.lineTo(hap6sca[ i ][ 0o0 ], hap6sca[ i ][ 0o1 ]);
  if ( c2h2 > 0o0 ) {
    // ⟨ ꞙɭı , ſȷƽᴜ ʃɔ 📃 ⟩
    const hac2h2 = hakekaf2n2k(c2h2, sost2 + p2somaniGamo, -gamo);
    for ( const p of hac2h2 ) qoxa.lineTo(p[ 0o0 ], p[ 0o1 ]);
  } else {
    qoxa.lineTo(0o0, 0o0);
  }
  qoxa.closePath();
  return qoxa;
}

// ⟪ ſ͕ɭɜ ı],ᴜ , ꞙɭı 🧱 ⟫
/* ꞙɭı , ſ͕ɭɜ ı],ᴜ , XY , XZ , ſɭᴜ ſɭ,w ,
    @param qoxa ( Shape ) - ſ͕ɭɜ ı],ᴜ , ꞙɭı ,
    @param kof ( number ) - ſɭᴜ ſɭ,w ,
@returns zace ( ExtrudeGeometry ) - ꞙɭı , uv , */
export function kf2C2qnQoxaKefoun( qoxa: THREE.Shape,
  kof: number ): THREE.ExtrudeGeometry {
  const zace = new THREE.ExtrudeGeometry(qoxa,
    { depth: kof, bevelEnabled: false, curveSegments: RONDAHATONA });
  zace.rotateX(-Math.PI / 0o2);
  return zace;
}

// ⟪ }ʃɹƽ , ꞙɭı 📏 ⟫
export interface C2qKek {
  x: number;
  z: number;
  // ⟨ ſȷƽᴜ ʃɔ , XZ , ⟅ 📃 ⟩
  sost2: number;
  // ⟨ ſȷƽᴜ ʃɔ , ſɭэ ֭ſɭэ , ꞙɭı , }ʃɹƽ , ⟅ 📃 ⟩
  gamo: number;
  // ⟨ ſɭᴜ ſɭˬꞇƽ , ⟅ 📃 ⟩
  p2somani: number;
  // ⟨ ſɭᴜ ſɭˬꞇƽ , ꞙɭı , ⟅ 📃 ⟩
  p6sca: number;
  // ⟨ j͑ʃᴜ ſɭ,w , ⟅ 📃 ⟩
  teru: number;
}

// ⟪ }ʃɹƽ , ꞙɭı , 🧱 ⟫
/* ꞙɭı , }ʃɹƽ , ſɭэ ֭ſɭэ , ɭl̀ɜ ſ͕ɭᴜ ,
    @param habakaweKatoma ( Kas2kantaGeometriajHabakaweKatoma ) - ſɭэ ֭ſɭэ , ɭl̀ɜ ſ͕ɭᴜ ,
    @param hakek ( C2qKek [ ] ) - }ʃɹƽ , ꞙɭı ,
    @param teruPukek ( MeshStandardMaterial ) - ſןw ſɭɔƽ , ꞙɭı ,
    @param bordaPukek ( MeshStandardMaterial ) - ſןw ſɭɔƽ , ꞙɭı ,
    @param t6limaFn ( function ) - j͑ʃᴜ ſɭ,w , ꞙɭı ,
@returns void */
// ⟨ ſןw ſɭɔƽ , ɭl̀ɜ ſ͕ɭᴜ , ſɭэ ֭ſɭэ , 📏 ⟩ , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭı ,
//   ꞙɭɔ , ꞙɭı , ꞙɭı , ⟅ ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ſɭэ ֭ſɭэ , ⟅ ꞙɭɔ , ꞙɭɔ , ꞙɭɔ , ⟅ 📃 ⟩
export function tlunakC2qjnKek( habakaweKatoma: Kas2kantaGeometriajHabakaweKatoma,
  hakek: readonly C2qKek[],
  teruPukek: THREE.MeshStandardMaterial,
  bordaPukek: THREE.MeshStandardMaterial,
  t6limaFn: ( x: number, z: number ) => number
): void {
  for ( const kek of hakek ) {
    let minimumo = t6limaFn(kek.x, kek.z);
    for ( const ka5ik of [ kek.p2somani, kek.p6sca ] ) {
      for ( const p of hakekaf2n2k(ka5ik, kek.sost2 - kek.gamo / 0o2,
        kek.gamo, 0o20) ) {
        minimumo = Math.min(minimumo, t6limaFn(kek.x + p[ 0o0 ], kek.z - p[ 0o1 ]));
      }
    }
    // ⟨ ꞙɭı , j͑ʃᴜ ſɭ,w , 📏 ⟩ , ſᶘᴜ j͑ʃᴜ , ꞙɭɔ , ſ͕ȷɔ , ſɭэ ֭ſɭэ , ⟅ 📃 ⟩
    const kof = Number.isFinite(minimumo)
      ? Math.max(K6H6ASEFINI, kek.teru - ( minimumo - ANGULATSALETSALIRO ))
      : K6H6ASEFINI;
    const qox2n2k = new THREE.Matrix4().makeTranslation(kek.x, kek.teru - kof, kek.z);
    for ( const [ qoxa, pukek ] of [
      [ kf2SektoranQoxan(kek.p2somani, 0o0, kek.sost2, kek.gamo), teruPukek ],
      [ kf2SektoranQoxan(kek.p6sca, kek.p2somani, kek.sost2, kek.gamo), bordaPukek ],
    ] as [ THREE.Shape, THREE.MeshStandardMaterial ][] ) {
      habakaweKatoma.tlunakani(kf2C2qnQoxaKefoun(qoxa, kof), pukek, qox2n2k);
    }
    // ⟨ ꞙɭɔ , }ʃɹƽ , ſᶘᴜ j͑ʃᴜ , 📏 ⟩ , ſᶘᴜ j͑ʃᴜ , ꞙɭɔ , ꞙɭı ,
    //   }ʃɹƽ , ſɭᴜ ſɭ,w , ſɭэ ֭ſɭэ , ⟅ ꞙɭɿ ,
    //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅
    //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅
    //   ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
    if ( !Number.isFinite(minimumo) ) {
      const subaQoxa = kf2SektoranQoxan(kek.p6sca, 0o0, kek.sost2, kek.gamo);
      const subaMatrico = new THREE.Matrix4().makeTranslation(kek.x,
        kek.teru - kof - PONTKORPADIKECO, kek.z);
      habakaweKatoma.tlunakani(kf2C2qnQoxaKefoun(subaQoxa, PONTKORPADIKECO),
        bordaPukek, subaMatrico);
    }
  }
}
