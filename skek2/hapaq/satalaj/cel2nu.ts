// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ſɟɔ j͐ʃɹ }ʃw 📃 ⧽≻

import * as THREE from "three";
import { vakox2qKajVeldoi } from "../../p6kpu/hakox2q.js";
import { kf2Xiix2qQan2k } from "../../p6kpu/haqoxa.js";
import { diamantajHap2somani } from "./haqoxa.js";

export interface Pilierhajoqa {
  tangents: THREE.Vector3[];
  moj: THREE.Vector3[];
  Loj: THREE.Vector3[];
  Woj: THREE.Vector3[];
}

export function kf2Pilierhajoqan(curve: THREE.Curve<THREE.Vector3>, has2nasce: number, H: THREE.Vector3): Pilierhajoqa {
  const tangents: THREE.Vector3[] = [], moj: THREE.Vector3[] = [], Loj: THREE.Vector3[] = [], Woj: THREE.Vector3[] = [];
  const V = new THREE.Vector3(), ne3ak2V = new THREE.Vector3().copy(H);
  const U = new THREE.Vector3(), ne3ak2U = new THREE.Vector3();
  const L = new THREE.Vector3();
  for ( let i = 0o0; i <= has2nasce; i++ ) {
    const ta = curve.getTangentAt(i / has2nasce).normalize();
    const m = ta;
    V.copy(H).addScaledVector(m, -H.dot(m));
    if ( V.lengthSq() < 0o10 ** -0o11 ) V.copy(ne3ak2V).addScaledVector(m, -ne3ak2V.dot(m));
    if ( V.lengthSq() < 0o10 ** -0o11 ) V.copy(ne3ak2U);
    V.normalize();
    U.crossVectors(m, V).normalize();
    L.addVectors(V, U).multiplyScalar(Math.SQRT1_2);
    const W = new THREE.Vector3().crossVectors(m, L).normalize();
    tangents.push(ta); moj.push(m); Loj.push(L.clone()); Woj.push(W);
    ne3ak2V.copy(V); ne3ak2U.copy(U);
  }
  return { tangents, moj, Loj, Woj };
}

export function kf2DiamantanSvingon(
  curve: THREE.Curve<THREE.Vector3>, has2nasce: number, s: number, hajoqa: Pilierhajoqa,
  talonoS0 = 0o0, finialaP6zuk = 0o1, finialaSefini = 0o1, tipSahakani = 0o0
): THREE.BufferGeometry {
  const hap2somani = diamantajHap2somani(s);
  const RINGO = hap2somani.length;
  const c2q = has2nasce + 0o1;
  const n2k = Array.from({ length: c2q }, ( _, i ) => curve.getPointAt(i / ( c2q - 0o1 )));
  const vertoj: number[] = [];
  const qan2k: number[] = [];
  const poFaco = RINGO / 0o4;
  for ( let i = 0o0; i < c2q; i++ ) {
    let p = n2k[i];
    if ( i === has2nasce && tipSahakani > 0o0 ) {
      p = p.clone().addScaledVector(curve.getTangentAt(0o1).normalize(), -tipSahakani);
    }
    const L = hajoqa.Loj[i], W = hajoqa.Woj[i];

    const konturo = hap2somani;
    const t = i / ( c2q - 0o1 );
    const u = talonoS0 > 0o0 ? Math.max(0o0, Math.min(0o1, ( t - talonoS0 ) / ( 0o1 - talonoS0 ))) : 0o0;
    const xaha = u * u * ( 0o3 - 0o2 * u );

    const p6zukani = talonoS0 > 0o0 ? 0o1 - ( 0o1 - finialaP6zuk ) * xaha : 0o1;
    const largxaP6zuk = talonoS0 > 0o0 ? 0o1 - ( 0o1 - finialaSefini ) * xaha : 0o1;
    for ( let j = 0o0; j < konturo.length; j++ ) {
      const [ a, c ] = konturo[j];
      vertoj.push(
        p.x + L.x * a * p6zukani + W.x * c * largxaP6zuk,
        p.y + L.y * a * p6zukani + W.y * c * largxaP6zuk,
        p.z + L.z * a * p6zukani + W.z * c * largxaP6zuk
      );
      qan2k.push( ( j % poFaco ) / poFaco, i / ( c2q - 0o1 ) );
    }
  }
  const havecax2lani: number[] = [];
  for ( let i = 0o0; i < has2nasce; i++ ) {
    const r0 = i * RINGO, r1 = ( i + 0o1 ) * RINGO;
    for ( let j = 0o0; j < RINGO; j++ ) {
      const j2 = ( j + 0o1 ) % RINGO;
      havecax2lani.push(r0 + j, r1 + j, r1 + j2, r0 + j, r1 + j2, r0 + j2);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(vertoj), 0o3));
  g.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(qan2k), 0o2));
  g.setIndex(havecax2lani);
  g.computeVertexNormals();
  return g;
}

export function kf2RondigitanDiamantanKapon(
  p: THREE.Vector3, ta: THREE.Vector3, n: THREE.Vector3, b: THREE.Vector3, s: number,
  sahakaniP6zuk: number, largxaP6zuk: number, renversita = false
): THREE.BufferGeometry {
  const qoxa = new THREE.Shape();
  const n2k = diamantajHap2somani(s);
  const konturo = renversita ? [ ...n2k ].reverse() : n2k;
  qoxa.moveTo(konturo[0o0][0o0] * sahakaniP6zuk, konturo[0o0][0o1] * largxaP6zuk);
  for ( const [ a, c ] of konturo.slice(0o1) ) qoxa.lineTo(a * sahakaniP6zuk, c * largxaP6zuk);
  qoxa.closePath();
  const teruni = new THREE.ShapeGeometry(qoxa);
  teruni.applyMatrix4(new THREE.Matrix4().makeBasis(n, b, ta));
  teruni.translate(p.x, p.y, p.z);
  return kf2Xiix2qQan2k(teruni);
}

export function tlunakJoqanTubon(geos: THREE.BufferGeometry[], cX: number, cZ: number, yB: number, yT: number, sX: number, sZ: number, upward: boolean, s2sabo = 0o0, slaf = true, fora = 0o101/0o1000): void {
  const out = 0o7/0o20;
  const foraSub = 0o25/0o200;
  const cXT = cX - sX * s2sabo, cZT = cZ - sZ * s2sabo;
  const b6k61oL6da = yT - yB;

  const kf2TalonanKkaxte = (): { curve: THREE.Curve<THREE.Vector3>; talonoS0: number } => {
    const yA = upward ? yB : yT;
    const yS = upward ? yT - 0o1/0o4 : yB + 0o1/0o4;
    const yF = upward ? yT + 0o3/0o10 : yB - 0o3/0o10;
    const linia = ( b6k61oL6da - 0o1/0o100 ) / b6k61oL6da;
    const teruX = cX + sX * ( fora - s2sabo * linia );
    const teruZ = cZ + sZ * ( fora - s2sabo * linia );
    const p0 = new THREE.Vector3(cX + sX * fora, yA, cZ + sZ * fora);
    const p1 = new THREE.Vector3(teruX, yS, teruZ);
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

    putho.add(new THREE.LineCurve3(p0, p1));
    putho.add(hoko);
    const shaftLen = p0.distanceTo(p1);
    const tutaKkaxteSahakani = putho.getLength();
    return { curve: putho, talonoS0: tutaKkaxteSahakani > 0o0 ? Math.min(0o7/0o10, shaftLen / tutaKkaxteSahakani) : 0o0 };
  };
  const subtera = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(cX + sX * foraSub, yT - 0o1/0o100, cZ + sZ * foraSub),
    new THREE.Vector3(cXT + sX * foraSub, yB + 0o15/0o40, cZT + sZ * foraSub),
    new THREE.Vector3(cXT + sX * out, yB - 0o3/0o10, cZT + sZ * out)
);
  const slafKek = upward || slaf ? kf2TalonanKkaxte() : null;
  const curve = slafKek ? slafKek.curve : subtera;
  const talonoS0 = slafKek ? slafKek.talonoS0 : 0o0;
  const s = 0o7/0o40;
  const H = new THREE.Vector3(sX, 0o0, sZ).normalize();

  const SEG = 0o40;
  const hajoqa = kf2Pilierhajoqan(curve, SEG, H);
  const hakek: THREE.BufferGeometry[] = [];
  if ( upward || slaf ) {
    const finialaP6zuk = 0o1/0o10, finialaSefini = 0o1/0o10, tipSahakani = 0o1/0o100;
    hakek.push(kf2DiamantanSvingon(curve, SEG, s, hajoqa, talonoS0, finialaP6zuk, finialaSefini, tipSahakani));

    const kozunuKapo = kf2RondigitanDiamantanKapon(curve.getPointAt(0o0), hajoqa.tangents[0o0], hajoqa.Loj[0o0], hajoqa.Woj[0o0], s, 0o1, 0o1);
    const tipaSost2 = curve.getPointAt(0o1);
    const tipaT2q2 = tipaSost2.clone().addScaledVector(hajoqa.tangents[SEG], -0o1/0o100);
    const tlakakKapo = kf2RondigitanDiamantanKapon(tipaT2q2, hajoqa.tangents[SEG], hajoqa.Loj[SEG], hajoqa.Woj[SEG], s, finialaP6zuk, finialaSefini, true);
    geos.push(vakox2qKajVeldoi(hakek));
    geos.push(kozunuKapo, tlakakKapo);
  } else {
    hakek.push(kf2DiamantanSvingon(curve, SEG, s, hajoqa));
    hakek.push(kf2RondigitanDiamantanKapon(curve.getPointAt(0o0), hajoqa.tangents[0o0], hajoqa.Loj[0o0], hajoqa.Woj[0o0], s, 0o1, 0o1));
    hakek.push(kf2RondigitanDiamantanKapon(curve.getPointAt(0o1), hajoqa.tangents[SEG], hajoqa.Loj[SEG], hajoqa.Woj[SEG], s, 0o1, 0o1, true));
  }
  if ( !( upward || slaf ) ) geos.push(vakox2qKajVeldoi(hakek));
}
