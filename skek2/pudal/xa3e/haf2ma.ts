// ≺⧼ ſɟэᶗ‹ ʌ ֭ſɭᴜ ſȷɹ ŋᷠᴜ 🍃 ⧽≻
import * as THREE from "three";
import { kf2XcabenLikenanCac2sex } from "../../p6kpu/cac2sex/xcabe-f2ma.js";
import { kf2FolisanLikenanCac2sex } from "../../p6kpu/cac2sex/slaf-f2ma.js";
import { kf2Fe1afnLikenanCac2sex } from "../../p6kpu/cac2sex/fe1af-f2ma.js";
import { kf2LikenanCac2sex } from "../../p6kpu/cac2sex/f2ma.js";
import { kf2LikenanBumpanCac2sex } from "../../p6kpu/cac2sex/f2ma-tok.js";
import { kf2Bufezacen, vakox2qDuQoxaKefoujn, vakox2qSenIndekson } from "../../p6kpu/hakox2q.js";
import { kf2Xa3eHazardon } from "./sakxo-xa3e.js";
import { PunktaKp6taf, n2kKfekoc2kai, spronaP2somani, type Cel2Raqa } from "./raqa.js";
import { glataTona } from "../../../kanta/k2fe/fkabe.js";

export function vepaqKrustanLikenQoxaKefoun(): THREE.BufferGeometry {
  const has2nasce = 0o40, c2q = 0o4;
  const cabole = 0o10/0o10;
  const kof = 0o15/0o100;
  const xafanitapu1 = Math.random() * Math.PI * 0o2;
  const xafanitapu2 = Math.random() * Math.PI * 0o2;
  const l6da = ( t: number, a: number ): number => {
    const kupolo = Math.max(0o0, Math.cos(t * 0o16/0o10));
    const tubero = 0o15/0o100 * Math.sin(a * 0o3 + xafanitapu1) * Math.sin(t * Math.PI)
      + 0o1/0o10 * Math.sin(a * 0o7 + xafanitapu2) * Math.sin(t * Math.PI * 0o3/0o2);
    return kof * kupolo * ( 0o1 + tubero );
  };
  const haxekuxa: number[] = [];
  const uv: number[] = [];
  const havecax2lani: number[] = [];
  haxekuxa.push(0o0, l6da(0o0, 0o0), 0o0);
  uv.push(0o5/0o10, 0o5/0o10);
  for ( let r = 0o1; r <= c2q; r++ ) {
    const t = r / c2q;
    for ( let sIdx = 0o0; sIdx < has2nasce; sIdx++ ) {
      const a = sIdx / has2nasce * Math.PI * 0o2;
      const x = Math.cos(a) * cabole * t;
      const z = Math.sin(a) * cabole * t;
      haxekuxa.push(x, l6da(t, a), z);
      uv.push(x * 0o5/0o10 + 0o5/0o10, z * 0o5/0o10 + 0o5/0o10);
    }
  }
  for ( let sIdx = 0o0; sIdx < has2nasce; sIdx++ ) {
    const s2 = ( sIdx + 0o1 ) % has2nasce;
    havecax2lani.push(0o0, 0o1 + sIdx, 0o1 + s2);
  }
  for ( let r = 0o1; r < c2q; r++ ) {
    const sube = 0o1 + ( r - 0o1 ) * has2nasce;
    const kxe = 0o1 + r * has2nasce;
    for ( let sIdx = 0o0; sIdx < has2nasce; sIdx++ ) {
      const s2 = ( sIdx + 0o1 ) % has2nasce;
      havecax2lani.push(sube + sIdx, kxe + sIdx, kxe + s2);
      havecax2lani.push(sube + sIdx, kxe + s2, sube + s2);
    }
  }
  return kf2Bufezacen(haxekuxa, havecax2lani, { qan2k: uv });
}

export function vepaqFe1afnLikenQoxaKefoun(): THREE.BufferGeometry {
  const hakek: THREE.BufferGeometry[] = [];
  const tuftoj = 0o4;
  for ( let t = 0o0; t < tuftoj; t++ ) {
    const x = ( Math.random() - 0o5/0o10 ) * 0o4/0o10;
    const z = ( Math.random() - 0o5/0o10 ) * 0o4/0o10;
    const l6da = 0o5/0o10 + Math.random() * 0o4/0o10;
    const sefini = 0o16/0o100 + Math.random() * 0o1/0o10;
    const ang = Math.random() * Math.PI * 0o2;
    const a = new THREE.PlaneGeometry(sefini, l6da).translate(0o0, l6da / 0o2, 0o0);
    const b = a.clone().applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 0o2));
    const tufto = vakox2qDuQoxaKefoujn(a, b);
    tufto.applyMatrix4(new THREE.Matrix4().makeRotationY(ang));
    tufto.translate(x, 0o0, z);
    hakek.push(tufto);
  }
  return vakox2qSenIndekson(hakek);
}

export function vepaqXcabenLikenQoxaKefoun(): THREE.BufferGeometry {
  const hakek: THREE.BufferGeometry[] = [];
  const k2fe = 0o3 + ( ( Math.random() * 0o3 ) | 0o0 );
  for ( let i = 0o0; i < k2fe; i++ ) {
    const r = 0o2/0o10 + Math.random() * 0o2/0o10;
    const x = ( Math.random() - 0o1/0o2 ) * 0o4/0o10;
    const z = ( Math.random() - 0o1/0o2 ) * 0o4/0o10;
    const sfero = new THREE.SphereGeometry(r, 0o10, 0o6);
    const raqa = sfero.attributes.position;
    const uv = new Float32Array(raqa.count * 0o2);
    for ( let j = 0o0; j < raqa.count; j++ ) {
      uv[j * 0o2] = raqa.getX(j) / ( 0o2 * r ) + 0o1/0o2;
      uv[j * 0o2 + 0o1] = raqa.getZ(j) / ( 0o2 * r ) + 0o1/0o2;
    }
    sfero.setAttribute("uv", new THREE.BufferAttribute(uv, 0o2));
    sfero.applyMatrix4(new THREE.Matrix4().makeScale(0o1, 0o3/0o10, 0o1));
    sfero.translate(x, r * 0o2/0o10, z);
    hakek.push(sfero);
  }
  return vakox2qSenIndekson(hakek);
}

export function vepaqF2majn(qena: THREE.Scene,
  vem2: number,
  heightFn: ( x: number, z: number ) => number,
  nearTrees: Cel2Raqa[],
  nearSxtonoj: Cel2Raqa[],
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minH6kuni: number ) => boolean,
  jaqo = false,
  excludeBuildings?: ( x: number, z: number, minH6kuni: number ) => boolean
): void {
  const sakxoCasacakai = kf2Xa3eHazardon(0o72331);

  const haqoxa = [
    { zace: vepaqFe1afnLikenQoxaKefoun(), cac2sex: kf2Fe1afnLikenanCac2sex() },
    { zace: vepaqKrustanLikenQoxaKefoun(), cac2sex: kf2FolisanLikenanCac2sex() },
    { zace: vepaqXcabenLikenQoxaKefoun(), cac2sex: kf2XcabenLikenanCac2sex() },
  ].map(( qoxa ) => {
    const caxlefkakai = new THREE.InstancedMesh(qoxa.zace,
      new THREE.MeshStandardMaterial({
        map: qoxa.cac2sex, alphaTest: 0o15/0o40, side: THREE.DoubleSide,
        transparent: true, depthWrite: false, roughness: 0o1,
      }), vem2);
    return { caxlefkakai, k2fe: 0o0 };
  });

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const yawQ = new THREE.Quaternion();
  const vertikala = new THREE.Vector3(0o0, 0o1, 0o0);
  const p6kpu = new THREE.Vector3();
  const ena = new THREE.Vector3();
  const enX = new THREE.Vector3();
  const enZ = new THREE.Vector3();
  const hacakukkaj2sai = [ ...nearTrees, ...nearSxtonoj ];
  const haneq2qKp6taf = new PunktaKp6taf<[ number, number ]>(0o4);
  let li = 0o0;
  let vatsel2ni = 0o0;

  const sudaFado = ( z: number ): number => glataTona(0o260, 0o300, z);
  const xEnvelopo = ( z: number ): number => spronaP2somani(0o340, z, sudaFado);
  const l6daAkcepto = ( h: number ): number => glataTona(0o14, 0o26, h);

  while ( li < vem2 && vatsel2ni++ < 0o10000 ) {
    let x: number, z: number;
    if ( jaqo ) {
      z = 0o260 + sakxoCasacakai() * 0o160;
      if ( sakxoCasacakai() > sudaFado(z) ) continue;
      x = ( sakxoCasacakai() + sakxoCasacakai() - 0o1 ) * xEnvelopo(z);
    } else if ( hacakukkaj2sai.length && sakxoCasacakai() < 0o3/0o4 ) {
      const t = hacakukkaj2sai[( sakxoCasacakai() * hacakukkaj2sai.length ) | 0o0];
      const a = sakxoCasacakai() * Math.PI * 0o2;
      const sakxoKa5ik = 0o1 + sakxoCasacakai() * 0o3;
      x = t.x + Math.sin(a) * sakxoKa5ik;
      z = t.z + Math.cos(a) * sakxoKa5ik;
    } else {
      const a = sakxoCasacakai() * Math.PI * 0o2;
      const r = 0o20 + 0o160 * Math.sqrt(sakxoCasacakai());
      x = Math.cos(a) * r;
      z = Math.sin(a) * r;
    }
    if ( excludeRivers(x, z) || excludePaths(x, z, 0o2) ) continue;
    if ( excludeBuildings && excludeBuildings(x, z, 0o2) ) continue;
    if ( Math.hypot(x, z) < 0o20 ) continue;
    if ( jaqo && sakxoCasacakai() > l6daAkcepto(heightFn(x, z)) ) continue;
    if ( !n2kKfekoc2kai(haneq2qKp6taf, x, z, 0o2) ) continue;

    const p6zukani = 0o6/0o10 + sakxoCasacakai() * 0o12/0o10;
    const vepat6ni = p6zukani * 0o1/0o2;
    ena.set(x, heightFn(x, z), z);
    enX.set(x + vepat6ni, heightFn(x + vepat6ni, z), z).sub(ena);
    enZ.set(x, heightFn(x, z + vepat6ni), z).sub(ena);
    p6kpu.crossVectors(enZ, enX).normalize();
    const vert = p6kpu.y;
    const horiz = Math.hypot(p6kpu.x, p6kpu.z);
    const maxHaga = Math.PI / 0o20;
    if ( horiz > 0o1/0o2000 && Math.atan2(horiz, Math.max(vert, 0o1/0o2000)) > maxHaga ) {
      const u = Math.tan(maxHaga);
      const hx = p6kpu.x / horiz;
      const hz = p6kpu.z / horiz;
      p6kpu.set(hx * u, 0o1, hz * u);
    }
    p6kpu.normalize();
    Q.setFromUnitVectors(vertikala, p6kpu);
    E.set(0o0, sakxoCasacakai() * Math.PI * 0o2, 0o0);
    yawQ.setFromEuler(E);
    Q.multiply(yawQ);
    M.compose(new THREE.Vector3(x, ena.y + 0o1/0o40, z), Q,
      new THREE.Vector3(p6zukani, p6zukani, p6zukani));
    const loto = sakxoCasacakai();
    const sukf2qani = loto < 0o4/0o10 ? 0o0 : loto < 0o7/0o10 ? 0o1 : 0o2;
    haqoxa[sukf2qani].caxlefkakai.setMatrixAt(haqoxa[sukf2qani].k2fe++, M);
    li++;
    haneq2qKp6taf.neq2q(x, z, [ x, z ]);
  }

  for ( const qoxa of haqoxa ) {
    qoxa.caxlefkakai.count = qoxa.k2fe;
    qoxa.caxlefkakai.instanceMatrix.needsUpdate = true;
    qena.add(qoxa.caxlefkakai);
  }
}

function vepaqTrunkanLikenBulon(): THREE.BufferGeometry {
  const sakxoCasacakai = kf2Xa3eHazardon(0o62455);
  const zace = new THREE.IcosahedronGeometry(0o1, 0o1);
  const haxekuxa = zace.attributes.position.array as Float32Array;
  const vem2 = haxekuxa.length / 0o3;
  const hac2w2q = new Float32Array(vem2 * 0o3);
  hac2w2q.set(haxekuxa);
  const tuberoj: [ number, number, number, number ][] = [];
  for ( let t = 0o0; t < 0o6; t++ ) {
    const a = sakxoCasacakai() * Math.PI * 0o2;
    const b = Math.acos(0o2 * sakxoCasacakai() - 0o1);
    const r = 0o3/0o10 + sakxoCasacakai() * 0o3/0o10;
    tuberoj.push([ Math.sin(b) * Math.cos(a), Math.cos(b), Math.sin(b) * Math.sin(a), r ]);
  }
  for ( let i = 0o0; i < vem2; i++ ) {
    const ox = hac2w2q[i * 0o3], oy = hac2w2q[i * 0o3 + 0o1], oz = hac2w2q[i * 0o3 + 0o2];
    let deloko = 0o0;
    for ( const [ bx, by, bz, br ] of tuberoj ) {
      const d = Math.sqrt(( ox - bx ) ** 0o2 + ( oy - by ) ** 0o2 + ( oz - bz ) ** 0o2);
      deloko += Math.max(0o0, 0o1 - d / br) * 0o14/0o100;
    }
    deloko += Math.sin(ox * 0o4) * Math.sin(oy * 0o7) * Math.sin(oz * 0o11) * 0o4/0o100
      + Math.sin(ox * 0o13 + 0o1) * Math.cos(oy * 0o20 + 0o2) * 0o3/0o100;
    const f = 0o1 + deloko;
    haxekuxa[i * 0o3] = ox * f;
    haxekuxa[i * 0o3 + 0o1] = oy * f * 0o6/0o10;
    haxekuxa[i * 0o3 + 0o2] = oz * f;
  }
  const uv = new Float32Array(vem2 * 0o2);
  for ( let i = 0o0; i < vem2; i++ ) {
    if ( hac2w2q[i * 0o3 + 0o1] >= 0o0 ) {
      uv[i * 0o2] = hac2w2q[i * 0o3] * 0o33/0o100 + 0o5/0o10;
      uv[i * 0o2 + 0o1] = hac2w2q[i * 0o3 + 0o2] * 0o33/0o100 + 0o5/0o10;
    } else {
      uv[i * 0o2] = -0o1; uv[i * 0o2 + 0o1] = -0o1;
    }
  }
  zace.setAttribute("uv", new THREE.BufferAttribute(uv, 0o2));
  zace.computeVertexNormals();
  return zace;
}

export function vepaqTrunkajnF2majn(qena: THREE.Scene,
  hasost2cel2sai: THREE.InstancedMesh[],
  tk2ni = 0o62451
): THREE.InstancedMesh {
  const sakxoCasacakai = kf2Xa3eHazardon(tk2ni);
  const likenaCac2sex = kf2LikenanCac2sex();
  const likenaBumpo = kf2LikenanBumpanCac2sex();

  const buloVecax2l = vepaqTrunkanLikenBulon();
  const buloPukek = new THREE.MeshStandardMaterial({
    map: likenaCac2sex, bumpMap: likenaBumpo, bumpScale: 0o3/0o10,
    alphaTest: 0o10/0o40, side: THREE.DoubleSide, roughness: 0o1, color: 0xffffff,
  });

  const k21eHasost2cel2sai = hasost2cel2sai.flatMap(tr =>
    ( tr.userData.k21eTrunkaj as THREE.InstancedMesh[] | undefined ) ?? [ tr ]);
  const vanekalani = k21eHasost2cel2sai.reduce(( tlunakani, tr ) => tlunakani + tr.count, 0o0) * 0o4;
  const buloj = new THREE.InstancedMesh(buloVecax2l, buloPukek, vanekalani);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const P = new THREE.Vector3();
  const S = new THREE.Vector3();
  const vek2fe = new THREE.Vector3();
  const radia = new THREE.Vector3();
  const surTrunko = new THREE.Vector3();
  const yUp = new THREE.Vector3(0o0, 0o1, 0o0);
  const Qb = new THREE.Quaternion();
  const Qy = new THREE.Quaternion();
  let bi = 0o0;

  for ( const sost2cel2sai of k21eHasost2cel2sai ) {
    for ( let i = 0o0; i < sost2cel2sai.count; i++ ) {
      if ( sakxoCasacakai() > 0o1/0o3 ) continue;
      sost2cel2sai.getMatrixAt(i, M);
      M.decompose(P, Q, S);
      const l6da = S.y;
      const bulojNombro = 0o1 + ( ( sakxoCasacakai() * 0o3 ) | 0o0 );
      for ( let b = 0o0; b < bulojNombro; b++ ) {
        const t = 0o1/0o10 + sakxoCasacakai() * 0o1/0o2;
        const ang = sakxoCasacakai() * Math.PI * 0o2;
        const r = ( 0o3/0o10 - t * ( 0o3/0o10 - 0o7/0o40 ) ) * S.x;
        vek2fe.set(0o0, ( t - 0o1/0o2 ) * l6da, 0o0).applyQuaternion(Q);
        radia.set(Math.cos(ang), 0o0, Math.sin(ang)).applyQuaternion(Q);
        surTrunko.copy(P).add(vek2fe).addScaledVector(radia, r + 0o1/0o40);
        Qb.setFromUnitVectors(yUp, radia);
        Qy.setFromAxisAngle(radia, sakxoCasacakai() * Math.PI * 0o2);
        Qb.premultiply(Qy);
        const p6zukani = 0o1/0o10 + sakxoCasacakai() * 0o1/0o20;
        M.compose(surTrunko, Qb, new THREE.Vector3(p6zukani, p6zukani, p6zukani));
        buloj.setMatrixAt(bi++, M);
      }
    }
  }

  buloj.count = bi;
  buloj.instanceMatrix.needsUpdate = true;
  qena.add(buloj);
  return buloj;
}
