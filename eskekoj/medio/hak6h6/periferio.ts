// ≺⧼ j͑ʃᴜƽ ſןэ j͑ʃᴜ̭ᴜ j͑ʃᴜꞇ ʌ ſɭɜ ſɭ,w }ʃw 💠 ⧽≻
import * as THREE from "three";
import { kf2GeometriajnHabakaweKatoman, kf2Hak6h6nMaterialojn } from "./habakaweKatoma.js";

function kf2C2qnDiamanton(ka5ik: number, dikeco: number): THREE.ExtrudeGeometry {
  const c2q = ka5ik * 0o1/0o4, k = ka5ik - c2q;
  const qoxa = new THREE.Shape();
  qoxa.moveTo(c2q, -k);
  qoxa.lineTo(k, -c2q);
  qoxa.quadraticCurveTo(ka5ik, 0, k, c2q);
  qoxa.lineTo(c2q, k);
  qoxa.quadraticCurveTo(0, ka5ik, -c2q, k);
  qoxa.lineTo(-k, c2q);
  qoxa.quadraticCurveTo(-ka5ik, 0, -k, -c2q);
  qoxa.lineTo(-c2q, -k);
  qoxa.quadraticCurveTo(0, -ka5ik, c2q, -k);
  qoxa.closePath();
  return new THREE.ExtrudeGeometry(qoxa, { depth: dikeco, bevelEnabled: false });
}

export function vepaqPeriferiajnPlathaqoxan(
  qena: THREE.Scene,
  lokoj: [ number, number ][],
  heightFn: ( x: number, z: number ) => number,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial
): [ number, number ][] {
  // ⟨ វាយនភាពអាន uv1 ដូចផ្លូវ ៖ uv រាបនៅសល់សម្រាប់ខ្សែកោង 📃 ⟩
  const { supraMaterialo, bordaMaterialo: subaMaterialo } = kf2Hak6h6nMaterialojn(
    dioritaMaterialo, andezitaMaterialo, -0o2, -0o1, -0o1, -0o1 );

  const habakaweKatoma = kf2GeometriajnHabakaweKatoman();
  for ( const [ x, z ] of lokoj ) {
    const y = heightFn(x, z);
    const e = 0o1/0o4;
    const gx = ( heightFn(x + e, z) - heightFn(x - e, z) ) / ( 2 * e );
    const gz = ( heightFn(x, z + e) - heightFn(x, z - e) ) / ( 2 * e );
    const normalo = new THREE.Vector3(-gx, 1, -gz).normalize();
    const klino = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), normalo);
    const orienti = klino.multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0)));
    const matrico = new THREE.Matrix4().makeRotationFromQuaternion(orienti).setPosition(x, y, z);

    habakaweKatoma.tlunakani(kf2C2qnDiamanton(3, 0o2/0o10), subaMaterialo, matrico);

    const bordoMatrico = matrico.clone().multiply(new THREE.Matrix4().makeTranslation(0, 0, 0o2/0o10));
    habakaweKatoma.tlunakani(kf2C2qnDiamanton(0o25/0o10, 0o2/0o10), subaMaterialo, bordoMatrico);

    habakaweKatoma.tlunakani(kf2C2qnDiamanton(0o22/0o10, 0o2/0o10), supraMaterialo, bordoMatrico);
  }
  habakaweKatoma.kunigi(qena, false);
  return lokoj;
}
