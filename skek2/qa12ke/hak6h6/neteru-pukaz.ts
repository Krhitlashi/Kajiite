// ≺⧼ ſɭэ ֭ſɭэ ʌ }ʃɔ ɭʃɔ ɽ͑ʃ'w ʌ ſןw ſɭᴜƴ 🛣️ ⧽≻

import * as THREE from "three";
import { kf2GeometriajnHabakaweKatoman, kf2Hak6h6nHapukek } from "./habakawe-katoma.js";

function kf2C2qnDiamanton(ka5ik: number, kof: number): THREE.ExtrudeGeometry {
  const c2q = ka5ik * 0o1/0o4, k = ka5ik - c2q;
  const qoxa = new THREE.Shape();
  qoxa.moveTo(c2q, -k);
  qoxa.lineTo(k, -c2q);
  qoxa.quadraticCurveTo(ka5ik, 0o0, k, c2q);
  qoxa.lineTo(c2q, k);
  qoxa.quadraticCurveTo(0o0, ka5ik, -c2q, k);
  qoxa.lineTo(-k, c2q);
  qoxa.quadraticCurveTo(-ka5ik, 0o0, -k, -c2q);
  qoxa.lineTo(-c2q, -k);
  qoxa.quadraticCurveTo(0o0, -ka5ik, c2q, -k);
  qoxa.closePath();
  return new THREE.ExtrudeGeometry(qoxa, { depth: kof, bevelEnabled: false });
}

export function vepaqPeriferiajnPlathaqoxan(
  qena: THREE.Scene,
  haqar: [ number, number ][],
  heightFn: ( x: number, z: number ) => number,
  dioritaPukek: THREE.MeshStandardMaterial,
  andezitaPukek: THREE.MeshStandardMaterial
): [ number, number ][] {

  const { teruPukek, bordaPukek: subaPukek } = kf2Hak6h6nHapukek(
    dioritaPukek, andezitaPukek, -0o2, -0o1, -0o1, -0o1 );

  const habakaweKatoma = kf2GeometriajnHabakaweKatoman();
  for ( const [ x, z ] of haqar ) {
    const y = heightFn(x, z);
    const e = 0o1/0o4;
    const gx = ( heightFn(x + e, z) - heightFn(x - e, z) ) / ( 0o2 * e );
    const gz = ( heightFn(x, z + e) - heightFn(x, z - e) ) / ( 0o2 * e );
    const p6kpu = new THREE.Vector3(-gx, 0o1, -gz).normalize();
    const s2sabo = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0o0, 0o1, 0o0), p6kpu);
    const orienti = s2sabo.multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 0o2, 0o0, 0o0)));
    const qox2n2k = new THREE.Matrix4().makeRotationFromQuaternion(orienti).setPosition(x, y, z);

    habakaweKatoma.tlunakani(kf2C2qnDiamanton(0o3, 0o2/0o10), subaPukek, qox2n2k);

    const bordoMatrico = qox2n2k.clone().multiply(new THREE.Matrix4().makeTranslation(0o0, 0o0, 0o2/0o10));
    habakaweKatoma.tlunakani(kf2C2qnDiamanton(0o25/0o10, 0o2/0o10), subaPukek, bordoMatrico);

    habakaweKatoma.tlunakani(kf2C2qnDiamanton(0o22/0o10, 0o2/0o10), teruPukek, bordoMatrico);
  }
  habakaweKatoma.veb6kek(qena, false);
  return haqar;
}
