// ≺⧼ La periferiaj platformoj 💠 ⧽≻
// La rondigitaj diamantaj platformoj ĉe la arbara rando
// ( konstruiPeriferiajnPlatformoj ) kaj ilia baza formo ( kreiRondanDiamanton ).
import * as THREE from "three";
import { kreiGeometriajnBufrojn } from "./bufroj.js";

function kreiRondanDiamanton(radiuso: number, dikeco: number): THREE.ExtrudeGeometry {
  const rondo = radiuso * 0o1/0o4, k = radiuso - rondo;
  const formo = new THREE.Shape();
  // Ferma vojo el kvar egalaj rondigitaj anguloj. La malnova fermo komencigxis
  // interne kaj krampe tranĉis la malsupran-dekstran randon (paperklipa fermo).
  formo.moveTo(rondo, -k);
  formo.lineTo(k, -rondo);
  formo.quadraticCurveTo(radiuso, 0, k, rondo);
  formo.lineTo(rondo, k);
  formo.quadraticCurveTo(0, radiuso, -rondo, k);
  formo.lineTo(-k, rondo);
  formo.quadraticCurveTo(-radiuso, 0, -k, -rondo);
  formo.lineTo(-rondo, -k);
  formo.quadraticCurveTo(0, -radiuso, rondo, -k);
  formo.closePath();
  return new THREE.ExtrudeGeometry(formo, { depth: dikeco, bevelEnabled: false });
}

// konstruiPeriferiajnPlatformojn — Rondigitaj diamantaj platformoj ĉe la arbara rando.
export function konstruiPeriferiajnPlatformojn(
  sceno: THREE.Scene,
  lokoj: [ number, number ][],
  heightFn: ( x: number, z: number ) => number,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial
): [ number, number ][] {
  const subaMaterialo = andezitaMaterialo.clone();
  subaMaterialo.polygonOffset = true;
  subaMaterialo.polygonOffsetFactor = -1;
  subaMaterialo.polygonOffsetUnits = -1;
  const supraMaterialo = dioritaMaterialo.clone();
  supraMaterialo.polygonOffset = true;
  supraMaterialo.polygonOffsetFactor = -2;
  supraMaterialo.polygonOffsetUnits = -1;

  const bufroj = kreiGeometriajnBufrojn();
  for ( const [ x, z ] of lokoj ) {
    const y = heightFn(x, z);
    // Inklini la platformon laux la loka terena deklivo. Alie unu flanko flosu
    // super la grundo kaj la alia enfosigxus (la arbara rando deklivas).
    const e = 0o1/0o4;
    const gx = ( heightFn(x + e, z) - heightFn(x - e, z) ) / ( 2 * e );
    const gz = ( heightFn(x, z + e) - heightFn(x, z - e) ) / ( 2 * e );
    const normalo = new THREE.Vector3(-gx, 1, -gz).normalize();
    // Baza kuŝigo (extrude laux +Z → supren), tiam klino al la terena normalo.
    const klino = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), normalo);
    const orienti = klino.multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0)));
    const matrico = new THREE.Matrix4().makeRotationFromQuaternion(orienti).setPosition(x, y, z);

    bufroj.aldoni(kreiRondanDiamanton(3, 0o2/0o10), subaMaterialo, matrico);

    // Supra tavolo kusxas precize sur la suba ( laŭ la normalo, ne nura vertikala ofseto ).
    const bordoMatrico = matrico.clone().multiply(new THREE.Matrix4().makeTranslation(0, 0, 0o2/0o10));
    bufroj.aldoni(kreiRondanDiamanton(0o25/0o10, 0o2/0o10), subaMaterialo, bordoMatrico);

    // Diorita centro kun andezita ringo ĉirkaŭe — la sama rando-stilo kiel la vojoj.
    bufroj.aldoni(kreiRondanDiamanton(0o22/0o10, 0o2/0o10), supraMaterialo, bordoMatrico);
  }
  bufroj.kunigi(sceno);
  return lokoj;
}
