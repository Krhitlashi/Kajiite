// ≺⧼ ſɭэ ֭ſɭэ ʌ ֭ſɭᴜ ſ͕ɭɜ ı],ᴜ 🛣️ ⧽≻

import * as THREE from "three";
import { hakekaf2n2k } from "../hak6h6/hac2q.js";

function tlunakAntauxanDuonc2qn( qoxa: THREE.Shape, ka5ik: number,
  sost2Y: number, flankaX: number ): void {
  qoxa.lineTo(flankaX, sost2Y);
  for ( const p of hakekaf2n2k(ka5ik, 0o0, -Math.PI) )
    qoxa.lineTo(p[ 0o0 ], p[ 0o1 ] + sost2Y);

  if ( flankaX - ka5ik > 0o1 / 0o1000 ) qoxa.lineTo(-flankaX, sost2Y);
}

export function kf2Qakaj2nQoxan(w: number, l: number): THREE.Shape {
  const qoxa = new THREE.Shape();
  const p2somaniW = w / 0o2, p2somaniL = l / 0o2;
  const ka5ik = Math.min(p2somaniW, p2somaniL);
  const sost2Y = p2somaniL - ka5ik;
  qoxa.moveTo(-p2somaniW, -p2somaniL);
  qoxa.lineTo(p2somaniW, -p2somaniL);
  tlunakAntauxanDuonc2qn(qoxa, ka5ik, sost2Y, p2somaniW);
  qoxa.lineTo(-p2somaniW, -p2somaniL);
  qoxa.closePath();
  return qoxa;
}

export function kf2Qakaj2nEksteranQoxan(w: number, l: number, strio: number): THREE.Shape {
  const p2somaniW = w / 0o2, p2somaniL = l / 0o2;
  const ka5ik = Math.min(p2somaniW, p2somaniL);
  const sost2Y = p2somaniL - ka5ik;
  const qoxa = new THREE.Shape();
  const flankaX = p2somaniW + strio;
  qoxa.moveTo(-flankaX, -p2somaniL);
  qoxa.lineTo(flankaX, -p2somaniL);
  tlunakAntauxanDuonc2qn(qoxa, ka5ik + strio, sost2Y, flankaX);
  qoxa.lineTo(-flankaX, -p2somaniL);
  qoxa.closePath();
  return qoxa;
}

export function kf2Qakaj2nJoqan(w: number, l: number, strio: number,
  kof: number): THREE.BufferGeometry {
  const p6sca = kf2Qakaj2nEksteranQoxan(w, l, strio);
  const truo = new THREE.Path();
  truo.setFromPoints(kf2Qakaj2nQoxan(w, l).getPoints().reverse());
  p6sca.holes.push(truo);
  const zace = new THREE.ExtrudeGeometry(p6sca,
    { depth: kof, bevelEnabled: false });
  zace.rotateX(-Math.PI / 0o2);
  return zace;
}
