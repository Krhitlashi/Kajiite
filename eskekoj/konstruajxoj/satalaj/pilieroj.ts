// ≺⧼ សសរមាស 🏛️ ⧽≻
import * as THREE from "three";
import { kunfandiKajVeldoiGeometriojn } from "../../komunajxoj/kunfandajxoj.js";
import { diamantajDuonoj } from "./formoj.js";

export interface Pilierkadroj {
  tangents: THREE.Vector3[];
  moj: THREE.Vector3[];
  Loj: THREE.Vector3[];
  Woj: THREE.Vector3[];
}
// ⟨ ហេតុអ្វីមិនការដឹកស្រប 📃 ⟩
export function kreiPilierkadrojn(curve: THREE.Curve<THREE.Vector3>, segmentoj: number, H: THREE.Vector3): Pilierkadroj {
  const tangents: THREE.Vector3[] = [], moj: THREE.Vector3[] = [], Loj: THREE.Vector3[] = [], Woj: THREE.Vector3[] = [];
  const V = new THREE.Vector3(), antauxaV = new THREE.Vector3().copy(H);
  const U = new THREE.Vector3(), antauxaU = new THREE.Vector3();
  const L = new THREE.Vector3();
  for ( let i = 0; i <= segmentoj; i++ ) {
    const ta = curve.getTangentAt(i / segmentoj).normalize();
    const m = ta;
    V.copy(H).addScaledVector(m, -H.dot(m));
    if ( V.lengthSq() < 1e-8 ) V.copy(antauxaV).addScaledVector(m, -antauxaV.dot(m));
    if ( V.lengthSq() < 1e-8 ) V.copy(antauxaU);
    V.normalize();
    U.crossVectors(m, V).normalize();
    L.addVectors(V, U).multiplyScalar(Math.SQRT1_2);
    const W = new THREE.Vector3().crossVectors(m, L).normalize();
    tangents.push(ta); moj.push(m); Loj.push(L.clone()); Woj.push(W);
    antauxaV.copy(V); antauxaU.copy(U);
  }
  return { tangents, moj, Loj, Woj };
}

export function kreiDiamantanSvingon(
  curve: THREE.Curve<THREE.Vector3>, segmentoj: number, s: number, kadroj: Pilierkadroj,
  talonoS0 = 0, finialaSkalo = 1, finialaLargho = 1, tipLongeco = 0
): THREE.BufferGeometry {
  const duonoj = diamantajDuonoj(s);
  const RINGO = duonoj.length;
  const ringoj = segmentoj + 1;
  const punktoj = Array.from({ length: ringoj }, ( _, i ) => curve.getPointAt(i / ( ringoj - 1 )));
  const vertoj: number[] = [];
  for ( let i = 0; i < ringoj; i++ ) {
    let p = punktoj[i];
    if ( i === segmentoj && tipLongeco > 0 ) {
      p = p.clone().addScaledVector(curve.getTangentAt(1).normalize(), -tipLongeco);
    }
    const L = kadroj.Loj[i], W = kadroj.Woj[i];
    // ⟨ វណ្ឌវង្កតែមួយ 📃 ⟩
    const konturo = duonoj;
    const t = i / ( ringoj - 1 );
    const u = talonoS0 > 0 ? Math.max(0, Math.min(1, ( t - talonoS0 ) / ( 1 - talonoS0 ))) : 0;
    const glata = u * u * ( 3 - 2 * u );
    // ⟨ ហេតុអ្វីទទឹងមិនគុណ 📃 ⟩
    const skalo = talonoS0 > 0 ? 1 - ( 1 - finialaSkalo ) * glata : 1;
    const largxaSkalo = talonoS0 > 0 ? 1 - ( 1 - finialaLargho ) * glata : 1;
    for ( const [ a, c ] of konturo ) vertoj.push(
      p.x + L.x * a * skalo + W.x * c * largxaSkalo,
      p.y + L.y * a * skalo + W.y * c * largxaSkalo,
      p.z + L.z * a * skalo + W.z * c * largxaSkalo
);
  }
  const indeksoj: number[] = [];
  for ( let i = 0; i < segmentoj; i++ ) {
    const r0 = i * RINGO, r1 = ( i + 1 ) * RINGO;
    for ( let j = 0; j < RINGO; j++ ) {
      const j2 = ( j + 1 ) % RINGO;
      indeksoj.push(r0 + j, r1 + j, r1 + j2, r0 + j, r1 + j2, r0 + j2);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(vertoj), 3));
  g.setIndex(indeksoj);
  g.computeVertexNormals();
  return g;
}

export function kreiRondigitanDiamantanKapon(
  p: THREE.Vector3, ta: THREE.Vector3, n: THREE.Vector3, b: THREE.Vector3, s: number,
  longaSkalo: number, largxaSkalo: number, renversita = false
): THREE.BufferGeometry {
  const formo = new THREE.Shape();
  const punktoj = diamantajDuonoj(s);
  const konturo = renversita ? [ ...punktoj ].reverse() : punktoj;
  formo.moveTo(konturo[0][0] * longaSkalo, konturo[0][1] * largxaSkalo);
  for ( const [ a, c ] of konturo.slice(1) ) formo.lineTo(a * longaSkalo, c * largxaSkalo);
  formo.closePath();
  const kapo = new THREE.ShapeGeometry(formo);
  kapo.applyMatrix4(new THREE.Matrix4().makeBasis(n, b, ta));
  kapo.translate(p.x, p.y, p.z);
  return kapo;
}

export function aldoniKadranTubon(geos: THREE.BufferGeometry[], cX: number, cZ: number, yB: number, yT: number, sX: number, sZ: number, upward: boolean, klino = 0, folio = true, fora = 0o101/0o1000): void {
  const out = 0o7/0o20;
  const foraSub = 0o25/0o200;
  const cXT = cX - sX * klino, cZT = cZ - sZ * klino;
  const tieroAlto = yT - yB;
  // ⟨ ចុង 📃 ⟩
  const kreiTalonanKurbo = (): { curve: THREE.Curve<THREE.Vector3>; talonoS0: number } => {
    const yA = upward ? yB : yT;
    const yS = upward ? yT - 0o1/0o4 : yB + 0o1/0o4;
    const yF = upward ? yT + 0o3/0o10 : yB - 0o3/0o10;
    const linia = ( tieroAlto - 0o1/0o100 ) / tieroAlto;
    const suproX = cX + sX * ( fora - klino * linia );
    const suproZ = cZ + sZ * ( fora - klino * linia );
    const p0 = new THREE.Vector3(cX + sX * fora, yA, cZ + sZ * fora);
    const p1 = new THREE.Vector3(suproX, yS, suproZ);
    const p2 = new THREE.Vector3(cXT + sX * out, yF, cZT + sZ * out);
    const dx = p1.x - p0.x, dy = p1.y - p0.y, dz = p1.z - p0.z;
    const direkto = new THREE.Vector3(dx, dy, dz).normalize();
    const hoko = new THREE.CubicBezierCurve3(
      p1,
      p1.clone().addScaledVector(direkto, 0o3/0o20),
      new THREE.Vector3(p2.x - sX * 0o3/0o20, p2.y + ( upward ? -0o1/0o40 : 0o1/0o40 ), p2.z - sZ * 0o3/0o20),
      p2
);
    const putho = new THREE.CurvePath<THREE.Vector3>();
    // ⟨ មូលដ្ឋានទៅត្រង់ចុះក្រោម 📃 ⟩
    putho.add(new THREE.LineCurve3(p0, p1));
    putho.add(hoko);
    const shaftLen = p0.distanceTo(p1);
    const tutaKurbaLongeco = putho.getLength();
    return { curve: putho, talonoS0: tutaKurbaLongeco > 0 ? Math.min(0o7/0o10, shaftLen / tutaKurbaLongeco) : 0 };
  };
  const subtera = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(cX + sX * foraSub, yT - 0o1/0o100, cZ + sZ * foraSub),
    new THREE.Vector3(cXT + sX * foraSub, yB + 0o15/0o40, cZT + sZ * foraSub),
    new THREE.Vector3(cXT + sX * out, yB - 0o3/0o10, cZT + sZ * out)
);
  const folia = upward || folio ? kreiTalonanKurbo() : null;
  const curve = folia ? folia.curve : subtera;
  const talonoS0 = folia ? folia.talonoS0 : 0;
  const s = 0o7/0o40;
  const H = new THREE.Vector3(sX, 0, sZ).normalize();
  const SEG = upward || folio ? 0o140 : 0o40;
  const kadroj = kreiPilierkadrojn(curve, SEG, H);
  const partoj: THREE.BufferGeometry[] = [];
  if ( upward || folio ) {
    const finialaSkalo = 0o1/0o10, finialaLargho = 0o1/0o10, tipLongeco = 0o1/0o100;
    partoj.push(kreiDiamantanSvingon(curve, SEG, s, kadroj, talonoS0, finialaSkalo, finialaLargho, tipLongeco));
    // ⟨ ក្បាលមូលដ្ឋាននៅដោយឡែក 📃 ⟩
    const bazaKapo = kreiRondigitanDiamantanKapon(curve.getPointAt(0), kadroj.tangents[0], kadroj.Loj[0], kadroj.Woj[0], s, 1, 1);
    const tipaCentro = curve.getPointAt(1);
    const tipaRingo = tipaCentro.clone().addScaledVector(kadroj.tangents[SEG], -0o1/0o100);
    const finaKapo = kreiRondigitanDiamantanKapon(tipaRingo, kadroj.tangents[SEG], kadroj.Loj[SEG], kadroj.Woj[SEG], s, finialaSkalo, finialaLargho, true);
    geos.push(kunfandiKajVeldoiGeometriojn(partoj));
    geos.push(bazaKapo, finaKapo);
  } else {
    partoj.push(kreiDiamantanSvingon(curve, SEG, s, kadroj));
    partoj.push(kreiRondigitanDiamantanKapon(curve.getPointAt(0), kadroj.tangents[0], kadroj.Loj[0], kadroj.Woj[0], s, 1, 1));
    partoj.push(kreiRondigitanDiamantanKapon(curve.getPointAt(1), kadroj.tangents[SEG], kadroj.Loj[SEG], kadroj.Woj[SEG], s, 1, 1, true));
  }
  if ( !( upward || folio ) ) geos.push(kunfandiKajVeldoiGeometriojn(partoj));
}
