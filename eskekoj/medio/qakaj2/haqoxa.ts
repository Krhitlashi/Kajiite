// ≺⧼ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ j͑ʃᴜꞇ ʌ ſ͕ɭɜ ı],ᴜ 📐 ⧽≻
// ⟨ ɭʃэ ſɭɔȝ , ꞙɭı , ꞙɭı , ᶅſw ſןɜ ɭʃɔ , ſɭэ ֭ſɭэ , ⟅ ꞙɭı , ꞙɭэ ,
//   ꞙɭɿ , ꞙɭı , ⟅ ꞙɭı , ɭʃэ ſɭɔȝ , ꞙɭı , ɭʃэ ſɭɔȝ , ⟅ ſȷƽᴜ ʃɔ ,
//   ɭl̀ɜ ſ͕ɭᴜ , ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭı , ꞙɭı , ſ͕ɭɜ ı],ᴜ , ꞙɭı , ⟅ 📃 ⟩
import * as THREE from "three";
import { arkajPunktoj } from "../hak6h6/hac2q.js";

// ⟪ ɭʃэ ſɭɔȝ , ꞙɭı 📐 ⟫
/* ſȷƽᴜ ʃɔ , ꞙɭı , ſ͕ɭɜ ı],ᴜ ,
    @param qoxa ( Shape ) - ſ͕ɭɜ ı],ᴜ , ꞙɭı ,
    @param ka5ik ( number ) - ſɭᴜ ſɭˬꞇƽ , ſȷƽᴜ ʃɔ ,
    @param centroY ( number ) - ꞙɭı y , ꞙɭɿ ,
    @param flankaX ( number ) - ꞙɭı , ꞙɭı , ⟅
@returns void */
// ⟨ ꞙɭɔ , ꞙɭı 📏 ⟩ , ſɭᴜ ſɭˬꞇƽ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭɿ
//   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
function aldoniAntauxanDuonc2qn( qoxa: THREE.Shape, ka5ik: number,
  centroY: number, flankaX: number ): void {
  qoxa.lineTo(flankaX, centroY);
  for ( const p of arkajPunktoj(ka5ik, 0, -Math.PI) )
    qoxa.lineTo(p[ 0 ], p[ 1 ] + centroY);
  // ⟨ ꞙɭı , }ʃɹƽ , ꞙɭı 📏 ⟩ , ſɭᴜ ſɭˬꞇƽ , ꞙɭı , ꞙɭı , }ʃɹƽ ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭц , ⟅ 📃 ⟩
  if ( flankaX - ka5ik > 0o1 / 0o1000 ) qoxa.lineTo(-flankaX, centroY);
}

// ⟪ ſ͕ɭɜ ı],ᴜ , ꞙɭı 📐 ⟫
/* ſ͕ɭɜ ı],ᴜ , ꞙɭı , ꞙɭı ,
    @param w ( number ) - ſɭᴜ ſןᴜ ,
    @param l ( number ) - ſɭᴜ ſןᴜ , ꞙɭı ,
@returns qoxa ( Shape ) - ſ͕ɭɜ ı],ᴜ , ꞙɭı */
export function kf2DokanQoxan(w: number, l: number): THREE.Shape {
  const qoxa = new THREE.Shape();
  const duonW = w / 2, duonL = l / 2;
  const ka5ik = Math.min(duonW, duonL);
  const centroY = duonL - ka5ik;
  qoxa.moveTo(-duonW, -duonL);
  qoxa.lineTo(duonW, -duonL);
  aldoniAntauxanDuonc2qn(qoxa, ka5ik, centroY, duonW);
  qoxa.lineTo(-duonW, -duonL);
  qoxa.closePath();
  return qoxa;
}

// ⟪ ſ͕ɭɜ ı],ᴜ , ꞙɭı 📐 ⟫
/* ſ͕ɭɜ ı],ᴜ , ꞙɭı , ꞙɭı , ꞙɭı ,
    @param w ( number ) - ſɭᴜ ſןᴜ ,
    @param l ( number ) - ſɭᴜ ſןᴜ , ꞙɭı ,
    @param strio ( number ) - ꞙɭı , ꞙɭı ,
@returns qoxa ( Shape ) - ſ͕ɭɜ ı],ᴜ , ꞙɭı */
// ⟨ ſ͕ɭɜ ı],ᴜ , ꞙɭı , ꞙɭɿ ⟅ 📃 ⟩ , ɭl̀ɜ ſ͕ɭᴜ , ſɭэ j͐ʃꞇȝ , ꞙɭı ,
export function kf2DokanEksteranQoxan(w: number, l: number, strio: number): THREE.Shape {
  const duonW = w / 2, duonL = l / 2;
  const ka5ik = Math.min(duonW, duonL);
  const centroY = duonL - ka5ik;
  const qoxa = new THREE.Shape();
  const flankaX = duonW + strio;
  qoxa.moveTo(-flankaX, -duonL);
  qoxa.lineTo(flankaX, -duonL);
  aldoniAntauxanDuonc2qn(qoxa, ka5ik + strio, centroY, flankaX);
  qoxa.lineTo(-flankaX, -duonL);
  qoxa.closePath();
  return qoxa;
}

// ⟪ ɭl̀ɜ ſ͕ɭᴜ , ꞙɭı 📐 ⟫
/* ɭl̀ɜ ſ͕ɭᴜ , ꞙɭı , ſ͕ɭɜ ı],ᴜ , ꞙɭı
    @param w ( number ) - ſɭᴜ ſןᴜ ,
    @param l ( number ) - ſɭᴜ ſןᴜ , ꞙɭı ,
    @param strio ( number ) - ꞙɭı , ꞙɭı ,
    @param dikeco ( number ) - ſɭᴜ ſɭ,w ,
@returns geometrio ( BufferGeometry ) - ɭl̀ɜ ſ͕ɭᴜ , ꞙɭı , */
export function kf2DokanJoqan(w: number, l: number, strio: number,
  dikeco: number): THREE.BufferGeometry {
  const ekstera = kf2DokanEksteranQoxan(w, l, strio);
  const truo = new THREE.Path();
  truo.setFromPoints(kf2DokanQoxan(w, l).getPoints().reverse());
  ekstera.holes.push(truo);
  const geometrio = new THREE.ExtrudeGeometry(ekstera,
    { depth: dikeco, bevelEnabled: false });
  geometrio.rotateX(-Math.PI / 2);
  return geometrio;
}
