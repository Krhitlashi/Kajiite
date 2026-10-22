// ≺⧼ មួកផ្លូវ 🌗 ⧽≻
import * as THREE from "three";
import { ANGULA_PROVOLIRO, kreiGeometriajnBufrojn, kreiVojojnMaterialojn, specimeniAngulojn } from "./bufroj.js";
import { VOJA_BORDA_LARĜO } from "./mezuroj.js";

// ⟨ ហេតុអ្វីថ្នាំងក្រឡាមិនទទួលមួក 📃 ⟩

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

function kreiRondanKapGeometrion(internaRadiuso: number, eksteraRadiuso: number, dikeco: number, dx: number, dz: number): THREE.ExtrudeGeometry {
  const geometrio = new THREE.ExtrudeGeometry(kreiDuonrondanFormon(internaRadiuso, eksteraRadiuso, dx, dz), { depth: dikeco, bevelEnabled: false, curveSegments: 0o40 });
  geometrio.rotateX(-Math.PI / 2);
  return geometrio;
}

export function konstruiRondajnKapojn(sceno: THREE.Scene,
  nodoj: [ number, number ][],
  direktoj: [ number, number ][],
  supraj: number[],
  larĝoj: number[],
  heightFn: ( x: number, z: number ) => number,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial
): void {
  if ( nodoj.length === 0 ) return;
  const { supraMaterialo, bordaMaterialo } = kreiVojojnMaterialojn(dioritaMaterialo, andezitaMaterialo, -4, -2, -1, -1);
  const bufroj = kreiGeometriajnBufrojn();
  for ( let i = 0; i < nodoj.length; i++ ) {
    const [ x, z ] = nodoj[i];
    const [ dx, dz ] = direktoj[i];
    // ⟨ កម្រិតមួក ៖ ត្រូវដូចកម្រិតផ្លូវនៅចុងទៀត ដើម្បីកុំឱ្យមួកខុសពីផ្លូវ ។ 📃 ⟩
    const supraY = supraj[i];
    // ⟨ កាវទូនៃមួក ៖ ត្រូវស្មើគ្នានឹងទទឹងផ្លូវ ។ 📃 ⟩
    const duon = larĝoj[i] / 2;
    const ekstera = duon + VOJA_BORDA_LARĜO;
    const minimumo = specimeniAngulojn(x, z, ekstera, ekstera, heightFn).minimumo;
    const kapDikeco = supraY - ( minimumo - ANGULA_PROVOLIRO );
    const y = supraY - kapDikeco;
    bufroj.aldoni(kreiRondanKapGeometrion(duon, ekstera, kapDikeco, dx, dz), bordaMaterialo, new THREE.Matrix4().makeTranslation(x, y, z));
    bufroj.aldoni(kreiRondanKapGeometrion(0, duon, kapDikeco, dx, dz), supraMaterialo, new THREE.Matrix4().makeTranslation(x, y, z));
  }
  bufroj.kunigi(sceno, false);
}
