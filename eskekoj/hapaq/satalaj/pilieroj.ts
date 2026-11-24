// ≺⧼ ſɟɔ j͐ʃɹ }ʃw ʌ ſɭэ ɭʃᴜ 🏛️ ⧽≻
import * as THREE from "three";
import { kunfandiKajVeldoiGeometriojn } from "../../komunajxoj/kunfandajxoj.js";
import { kf2X2x2qQan2k } from "../../komunajxoj/haqoxa.js";
import { diamantajDuonoj } from "./haqoxa.js";

export interface Pilierhajoqa {
  tangents: THREE.Vector3[];
  moj: THREE.Vector3[];
  Loj: THREE.Vector3[];
  Woj: THREE.Vector3[];
}
// ⟨ ſȷƽᴜ ʃɔ , ꞙɭı , 📃 ⟩
export function kf2Pilierhajoqan(curve: THREE.Curve<THREE.Vector3>, has2nasce: number, H: THREE.Vector3): Pilierhajoqa {
  const tangents: THREE.Vector3[] = [], moj: THREE.Vector3[] = [], Loj: THREE.Vector3[] = [], Woj: THREE.Vector3[] = [];
  const V = new THREE.Vector3(), antauxaV = new THREE.Vector3().copy(H);
  const U = new THREE.Vector3(), antauxaU = new THREE.Vector3();
  const L = new THREE.Vector3();
  for ( let i = 0; i <= has2nasce; i++ ) {
    const ta = curve.getTangentAt(i / has2nasce).normalize();
    const m = ta;
    V.copy(H).addScaledVector(m, -H.dot(m));
    if ( V.lengthSq() < 0o10 ** -0o11 ) V.copy(antauxaV).addScaledVector(m, -antauxaV.dot(m));
    if ( V.lengthSq() < 0o10 ** -0o11 ) V.copy(antauxaU);
    V.normalize();
    U.crossVectors(m, V).normalize();
    L.addVectors(V, U).multiplyScalar(Math.SQRT1_2);
    const W = new THREE.Vector3().crossVectors(m, L).normalize();
    tangents.push(ta); moj.push(m); Loj.push(L.clone()); Woj.push(W);
    antauxaV.copy(V); antauxaU.copy(U);
  }
  return { tangents, moj, Loj, Woj };
}

export function kf2DiamantanSvingon(
  curve: THREE.Curve<THREE.Vector3>, has2nasce: number, s: number, hajoqa: Pilierhajoqa,
  talonoS0 = 0, finialaSkalo = 1, finialaLargho = 1, tipLongeco = 0
): THREE.BufferGeometry {
  const hap2somani = diamantajDuonoj(s);
  const RINGO = hap2somani.length;
  const c2q = has2nasce + 1;
  const n2k = Array.from({ length: c2q }, ( _, i ) => curve.getPointAt(i / ( c2q - 1 )));
  const vertoj: number[] = [];
  const qan2k: number[] = [];
  const poFaco = RINGO / 4;
  for ( let i = 0; i < c2q; i++ ) {
    let p = n2k[i];
    if ( i === has2nasce && tipLongeco > 0 ) {
      p = p.clone().addScaledVector(curve.getTangentAt(1).normalize(), -tipLongeco);
    }
    const L = hajoqa.Loj[i], W = hajoqa.Woj[i];
// ⟨ ſןw ſɭᴜƴ , ꞙɭı , 📃 ⟩
    const konturo = hap2somani;
    const t = i / ( c2q - 1 );
    const u = talonoS0 > 0 ? Math.max(0, Math.min(1, ( t - talonoS0 ) / ( 1 - talonoS0 ))) : 0;
    const glata = u * u * ( 3 - 2 * u );
// ⟨ j͑ʃᴜ ſɭᴜ , ꞙɭı , 📃 ⟩
    const p6zukani = talonoS0 > 0 ? 1 - ( 1 - finialaSkalo ) * glata : 1;
    const largxaSkalo = talonoS0 > 0 ? 1 - ( 1 - finialaLargho ) * glata : 1;
    for ( let j = 0; j < konturo.length; j++ ) {
      const [ a, c ] = konturo[j];
      vertoj.push(
        p.x + L.x * a * p6zukani + W.x * c * largxaSkalo,
        p.y + L.y * a * p6zukani + W.y * c * largxaSkalo,
        p.z + L.z * a * p6zukani + W.z * c * largxaSkalo
      );
      qan2k.push( ( j % poFaco ) / poFaco, i / ( c2q - 1 ) );
    }
  }
  const havecax2lani: number[] = [];
  for ( let i = 0; i < has2nasce; i++ ) {
    const r0 = i * RINGO, r1 = ( i + 1 ) * RINGO;
    for ( let j = 0; j < RINGO; j++ ) {
      const j2 = ( j + 1 ) % RINGO;
      havecax2lani.push(r0 + j, r1 + j, r1 + j2, r0 + j, r1 + j2, r0 + j2);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(vertoj), 3));
  g.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(qan2k), 2));
  g.setIndex(havecax2lani);
  g.computeVertexNormals();
  return g;
}

export function kf2RondigitanDiamantanKapon(
  p: THREE.Vector3, ta: THREE.Vector3, n: THREE.Vector3, b: THREE.Vector3, s: number,
  longaSkalo: number, largxaSkalo: number, renversita = false
): THREE.BufferGeometry {
  const qoxa = new THREE.Shape();
  const n2k = diamantajDuonoj(s);
  const konturo = renversita ? [ ...n2k ].reverse() : n2k;
  qoxa.moveTo(konturo[0][0] * longaSkalo, konturo[0][1] * largxaSkalo);
  for ( const [ a, c ] of konturo.slice(1) ) qoxa.lineTo(a * longaSkalo, c * largxaSkalo);
  qoxa.closePath();
  const teruni = new THREE.ShapeGeometry(qoxa);
  teruni.applyMatrix4(new THREE.Matrix4().makeBasis(n, b, ta));
  teruni.translate(p.x, p.y, p.z);
  return kf2X2x2qQan2k(teruni);
}

export function aldoniJoqanTubon(geos: THREE.BufferGeometry[], cX: number, cZ: number, yB: number, yT: number, sX: number, sZ: number, upward: boolean, klino = 0, slaf = true, fora = 0o101/0o1000): void {
  const out = 0o7/0o20;
  const foraSub = 0o25/0o200;
  const cXT = cX - sX * klino, cZT = cZ - sZ * klino;
  const tieroAlto = yT - yB;
// ⟨ ſɭɹ ſןᴜ , 📃 ⟩
  const kf2TalonanKkaxte = (): { curve: THREE.Curve<THREE.Vector3>; talonoS0: number } => {
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
    const c2w2q = new THREE.Vector3(dx, dy, dz).normalize();
    const hoko = new THREE.CubicBezierCurve3(
      p1,
      p1.clone().addScaledVector(c2w2q, 0o3/0o20),
      new THREE.Vector3(p2.x - sX * 0o3/0o20, p2.y + ( upward ? -0o1/0o40 : 0o1/0o40 ), p2.z - sZ * 0o3/0o20),
      p2
);
    const putho = new THREE.CurvePath<THREE.Vector3>();
// ⟨ ſɭɜ ſɭ,w , ſɭɹ ſןᴜ , 📃 ⟩
    putho.add(new THREE.LineCurve3(p0, p1));
    putho.add(hoko);
    const shaftLen = p0.distanceTo(p1);
    const tutaKkaxteLongeco = putho.getLength();
    return { curve: putho, talonoS0: tutaKkaxteLongeco > 0 ? Math.min(0o7/0o10, shaftLen / tutaKkaxteLongeco) : 0 };
  };
  const subtera = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(cX + sX * foraSub, yT - 0o1/0o100, cZ + sZ * foraSub),
    new THREE.Vector3(cXT + sX * foraSub, yB + 0o15/0o40, cZT + sZ * foraSub),
    new THREE.Vector3(cXT + sX * out, yB - 0o3/0o10, cZT + sZ * out)
);
  const slafKek = upward || slaf ? kf2TalonanKkaxte() : null;
  const curve = slafKek ? slafKek.curve : subtera;
  const talonoS0 = slafKek ? slafKek.talonoS0 : 0;
  const s = 0o7/0o40;
  const H = new THREE.Vector3(sX, 0, sZ).normalize();
// ⟨ ſ͕ɭɜ ı],ᴜ , ꞙɭıэɔ , ꞙɭı ,
//   ꞙɭэɔ , ꞙɭı , 📃 ⟩
  const SEG = 0o40;
  const hajoqa = kf2Pilierhajoqan(curve, SEG, H);
  const hakek: THREE.BufferGeometry[] = [];
  if ( upward || slaf ) {
    const finialaSkalo = 0o1/0o10, finialaLargho = 0o1/0o10, tipLongeco = 0o1/0o100;
    hakek.push(kf2DiamantanSvingon(curve, SEG, s, hajoqa, talonoS0, finialaSkalo, finialaLargho, tipLongeco));
// ⟨ ſɭɜ ſɭ,w , j͑ʃᴜ ſɭ,w , ꞙɭı , 📃 ⟩
    const bazaKapo = kf2RondigitanDiamantanKapon(curve.getPointAt(0), hajoqa.tangents[0], hajoqa.Loj[0], hajoqa.Woj[0], s, 1, 1);
    const tipaCentro = curve.getPointAt(1);
    const tipaRingo = tipaCentro.clone().addScaledVector(hajoqa.tangents[SEG], -0o1/0o100);
    const finaKapo = kf2RondigitanDiamantanKapon(tipaRingo, hajoqa.tangents[SEG], hajoqa.Loj[SEG], hajoqa.Woj[SEG], s, finialaSkalo, finialaLargho, true);
    geos.push(kunfandiKajVeldoiGeometriojn(hakek));
    geos.push(bazaKapo, finaKapo);
  } else {
    hakek.push(kf2DiamantanSvingon(curve, SEG, s, hajoqa));
    hakek.push(kf2RondigitanDiamantanKapon(curve.getPointAt(0), hajoqa.tangents[0], hajoqa.Loj[0], hajoqa.Woj[0], s, 1, 1));
    hakek.push(kf2RondigitanDiamantanKapon(curve.getPointAt(1), hajoqa.tangents[SEG], hajoqa.Loj[SEG], hajoqa.Woj[SEG], s, 1, 1, true));
  }
  if ( !( upward || slaf ) ) geos.push(kunfandiKajVeldoiGeometriojn(hakek));
}
