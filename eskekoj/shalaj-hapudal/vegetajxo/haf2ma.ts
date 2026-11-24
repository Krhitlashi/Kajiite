// ≺⧼ ſɟэᶗ‹ 🍃 ⧽≻
import * as THREE from "three";
import { kf2ByssoidanLikenanCac2sex } from "../../komunajxoj/cac2sex/byssoida-f2ma.js";
import { kf2FolisanLikenanCac2sex } from "../../komunajxoj/cac2sex/folisa-f2ma.js";
import { kf2FrutikosanLikenanCac2sex } from "../../komunajxoj/cac2sex/frutikosa-f2ma.js";
import { kf2LikenanCac2sex } from "../../komunajxoj/cac2sex/f2ma.js";
import { kf2LikenanBumpanCac2sex } from "../../komunajxoj/cac2sex/f2ma-bumpo.js";
import { kf2BuferanGeometrion, kunfandiDuGeometriojn, kunfandiGeometriojnSenIndekson } from "../../komunajxoj/kunfandajxoj.js";
import { kf2VegetajxanHazardon } from "./sakxoXa3e.js";
import { PunktaHasho, punktoLibera, spronaDuono, type ArboRaqa } from "./raqa.js";
import { glataPaso } from "../../../kantaoj/komunajxoj/interpolo.js";

export function vepaqKrustanLikenGeometrion(): THREE.BufferGeometry {
  const has2nasce = 0o40, c2q = 0o4;
  const radio = 0o10/0o10;
  const dikeco = 0o15/0o100;
  const fazo1 = Math.random() * Math.PI * 2;
  const fazo2 = Math.random() * Math.PI * 2;
  const l6da = ( t: number, a: number ): number => {
    const kupolo = Math.max(0, Math.cos(t * 0o16/0o10));
    const tubero = 0o15/0o100 * Math.sin(a * 0o3 + fazo1) * Math.sin(t * Math.PI)
      + 0o1/0o10 * Math.sin(a * 0o7 + fazo2) * Math.sin(t * Math.PI * 0o3/0o2);
    return dikeco * kupolo * ( 1 + tubero );
  };
  const haxekuxa: number[] = [];
  const uv: number[] = [];
  const havecax2lani: number[] = [];
  haxekuxa.push(0, l6da(0, 0), 0);
  uv.push(0o5/0o10, 0o5/0o10);
  for ( let r = 1; r <= c2q; r++ ) {
    const t = r / c2q;
    for ( let sIdx = 0; sIdx < has2nasce; sIdx++ ) {
      const a = sIdx / has2nasce * Math.PI * 2;
      const x = Math.cos(a) * radio * t;
      const z = Math.sin(a) * radio * t;
      haxekuxa.push(x, l6da(t, a), z);
      uv.push(x * 0o5/0o10 + 0o5/0o10, z * 0o5/0o10 + 0o5/0o10);
    }
  }
  for ( let sIdx = 0; sIdx < has2nasce; sIdx++ ) {
    const s2 = ( sIdx + 1 ) % has2nasce;
    havecax2lani.push(0, 1 + sIdx, 1 + s2);
  }
  for ( let r = 1; r < c2q; r++ ) {
    const sube = 1 + ( r - 1 ) * has2nasce;
    const supre = 1 + r * has2nasce;
    for ( let sIdx = 0; sIdx < has2nasce; sIdx++ ) {
      const s2 = ( sIdx + 1 ) % has2nasce;
      havecax2lani.push(sube + sIdx, supre + sIdx, supre + s2);
      havecax2lani.push(sube + sIdx, supre + s2, sube + s2);
    }
  }
  return kf2BuferanGeometrion(haxekuxa, havecax2lani, { qan2k: uv });
}

export function vepaqFrutikosanLikenGeometrion(): THREE.BufferGeometry {
  const hakek: THREE.BufferGeometry[] = [];
  const tuftoj = 0o4;
  for ( let t = 0; t < tuftoj; t++ ) {
    const x = ( Math.random() - 0o5/0o10 ) * 0o4/0o10;
    const z = ( Math.random() - 0o5/0o10 ) * 0o4/0o10;
    const l6da = 0o5/0o10 + Math.random() * 0o4/0o10;
    const sefini = 0o16/0o100 + Math.random() * 0o1/0o10;
    const ang = Math.random() * Math.PI * 2;
    const a = new THREE.PlaneGeometry(sefini, l6da).translate(0, l6da / 2, 0);
    const b = a.clone().applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2));
    const tufto = kunfandiDuGeometriojn(a, b);
    tufto.applyMatrix4(new THREE.Matrix4().makeRotationY(ang));
    tufto.translate(x, 0, z);
    hakek.push(tufto);
  }
  return kunfandiGeometriojnSenIndekson(hakek);
}

export function vepaqByssoidanLikenGeometrion(): THREE.BufferGeometry {
  const hakek: THREE.BufferGeometry[] = [];
  const nombro = 0o3 + ( ( Math.random() * 0o3 ) | 0 );
  for ( let i = 0; i < nombro; i++ ) {
    const r = 0o2/0o10 + Math.random() * 0o2/0o10;
    const x = ( Math.random() - 0o1/0o2 ) * 0o4/0o10;
    const z = ( Math.random() - 0o1/0o2 ) * 0o4/0o10;
    const sfero = new THREE.SphereGeometry(r, 0o10, 6);
    const raqa = sfero.attributes.position;
    const uv = new Float32Array(raqa.count * 2);
    for ( let j = 0; j < raqa.count; j++ ) {
      uv[j * 2] = raqa.getX(j) / ( 2 * r ) + 0o1/0o2;
      uv[j * 2 + 1] = raqa.getZ(j) / ( 2 * r ) + 0o1/0o2;
    }
    sfero.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
    sfero.applyMatrix4(new THREE.Matrix4().makeScale(1, 0o3/0o10, 1));
    sfero.translate(x, r * 0o2/0o10, z);
    hakek.push(sfero);
  }
  return kunfandiGeometriojnSenIndekson(hakek);
}

export function vepaqF2majn(qena: THREE.Scene,
  vem2: number,
  heightFn: ( x: number, z: number ) => number,
  nearTrees: ArboRaqa[],
  nearSxtonoj: ArboRaqa[],
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  montara = false,
  excludeBuildings?: ( x: number, z: number, minDistanco: number ) => boolean
): void {
  const hazardaGenerilo = kf2VegetajxanHazardon(0o72331);

  const haqoxa = [
    { geometrio: vepaqFrutikosanLikenGeometrion(), cac2sex: kf2FrutikosanLikenanCac2sex() },
    { geometrio: vepaqKrustanLikenGeometrion(), cac2sex: kf2FolisanLikenanCac2sex() },
    { geometrio: vepaqByssoidanLikenGeometrion(), cac2sex: kf2ByssoidanLikenanCac2sex() },
  ].map(( qoxa ) => {
    const reto = new THREE.InstancedMesh(qoxa.geometrio,
      new THREE.MeshStandardMaterial({
        map: qoxa.cac2sex, alphaTest: 0o15/0o40, side: THREE.DoubleSide,
        transparent: true, depthWrite: false, roughness: 1,
      }), vem2);
    return { reto, nombro: 0 };
  });

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const yawQ = new THREE.Quaternion();
  const vertikala = new THREE.Vector3(0, 1, 0);
  const normalo = new THREE.Vector3();
  const ena = new THREE.Vector3();
  const enX = new THREE.Vector3();
  const enZ = new THREE.Vector3();
  const ankroj = [ ...nearTrees, ...nearSxtonoj ];
  const metitajHasho = new PunktaHasho<[ number, number ]>(0o4);
  let li = 0;
  let gardilo = 0;

  const sudaFado = ( z: number ): number => glataPaso(0o260, 0o300, z);
  const xEnvelopo = ( z: number ): number => spronaDuono(0o340, z, sudaFado);
  const altaAkcepto = ( h: number ): number => glataPaso(0o14, 0o26, h);

  while ( li < vem2 && gardilo++ < 0o10000 ) {
    let x: number, z: number;
    if ( montara ) {
      z = 0o260 + hazardaGenerilo() * 0o160;
      if ( hazardaGenerilo() > sudaFado(z) ) continue;
      x = ( hazardaGenerilo() + hazardaGenerilo() - 1 ) * xEnvelopo(z);
    } else if ( ankroj.length && hazardaGenerilo() < 0o3/0o4 ) {
      const t = ankroj[( hazardaGenerilo() * ankroj.length ) | 0];
      const a = hazardaGenerilo() * Math.PI * 2;
      const hazardaRadiuso = 1 + hazardaGenerilo() * 3;
      x = t.x + Math.sin(a) * hazardaRadiuso;
      z = t.z + Math.cos(a) * hazardaRadiuso;
    } else {
      const a = hazardaGenerilo() * Math.PI * 2;
      const r = 0o20 + 0o160 * Math.sqrt(hazardaGenerilo());
      x = Math.cos(a) * r;
      z = Math.sin(a) * r;
    }
    if ( excludeRivers(x, z) || excludePaths(x, z, 0o2) ) continue;
    if ( excludeBuildings && excludeBuildings(x, z, 0o2) ) continue;
    if ( Math.hypot(x, z) < 0o20 ) continue;
    if ( montara && hazardaGenerilo() > altaAkcepto(heightFn(x, z)) ) continue;
    if ( !punktoLibera(metitajHasho, x, z, 0o2) ) continue;

    const p6zukani = 0o6/0o10 + hazardaGenerilo() * 0o12/0o10;
    const vepat6ni = p6zukani * 0o1/0o2;
    ena.set(x, heightFn(x, z), z);
    enX.set(x + vepat6ni, heightFn(x + vepat6ni, z), z).sub(ena);
    enZ.set(x, heightFn(x, z + vepat6ni), z).sub(ena);
    normalo.crossVectors(enZ, enX).normalize();
    const vert = normalo.y;
    const horiz = Math.hypot(normalo.x, normalo.z);
    const maxKruteco = Math.PI / 0o20;
    if ( horiz > 0o1/0o2000 && Math.atan2(horiz, Math.max(vert, 0o1/0o2000)) > maxKruteco ) {
      const u = Math.tan(maxKruteco);
      const hx = normalo.x / horiz;
      const hz = normalo.z / horiz;
      normalo.set(hx * u, 1, hz * u);
    }
    normalo.normalize();
    Q.setFromUnitVectors(vertikala, normalo);
    E.set(0, hazardaGenerilo() * Math.PI * 2, 0);
    yawQ.setFromEuler(E);
    Q.multiply(yawQ);
    M.compose(new THREE.Vector3(x, ena.y + 0o1/0o40, z), Q,
      new THREE.Vector3(p6zukani, p6zukani, p6zukani));
    const loto = hazardaGenerilo();
    const elekto = loto < 0o4/0o10 ? 0 : loto < 0o7/0o10 ? 1 : 2;
    haqoxa[elekto].reto.setMatrixAt(haqoxa[elekto].nombro++, M);
    li++;
    metitajHasho.meti(x, z, [ x, z ]);
  }

  for ( const qoxa of haqoxa ) {
    qoxa.reto.count = qoxa.nombro;
    qoxa.reto.instanceMatrix.needsUpdate = true;
    qena.add(qoxa.reto);
  }
}

function vepaqTrunkanLikenBulon(): THREE.BufferGeometry {
  const hazardaGenerilo = kf2VegetajxanHazardon(0o62455);
  const geometrio = new THREE.IcosahedronGeometry(1, 1);
  const haxekuxa = geometrio.attributes.position.array as Float32Array;
  const vem2 = haxekuxa.length / 3;
  const hac2w2q = new Float32Array(vem2 * 3);
  hac2w2q.set(haxekuxa);
  const tuberoj: [ number, number, number, number ][] = [];
  for ( let t = 0; t < 0o6; t++ ) {
    const a = hazardaGenerilo() * Math.PI * 2;
    const b = Math.acos(2 * hazardaGenerilo() - 1);
    const r = 0o3/0o10 + hazardaGenerilo() * 0o3/0o10;
    tuberoj.push([ Math.sin(b) * Math.cos(a), Math.cos(b), Math.sin(b) * Math.sin(a), r ]);
  }
  for ( let i = 0; i < vem2; i++ ) {
    const ox = hac2w2q[i * 3], oy = hac2w2q[i * 3 + 1], oz = hac2w2q[i * 3 + 2];
    let deloko = 0;
    for ( const [ bx, by, bz, br ] of tuberoj ) {
      const d = Math.sqrt(( ox - bx ) ** 2 + ( oy - by ) ** 2 + ( oz - bz ) ** 2);
      deloko += Math.max(0, 1 - d / br) * 0o14/0o100;
    }
    deloko += Math.sin(ox * 0o4) * Math.sin(oy * 0o7) * Math.sin(oz * 0o11) * 0o4/0o100
      + Math.sin(ox * 0o13 + 1) * Math.cos(oy * 0o20 + 2) * 0o3/0o100;
    const f = 1 + deloko;
    haxekuxa[i * 3] = ox * f;
    haxekuxa[i * 3 + 1] = oy * f * 0o6/0o10;
    haxekuxa[i * 3 + 2] = oz * f;
  }
  const uv = new Float32Array(vem2 * 2);
  for ( let i = 0; i < vem2; i++ ) {
    if ( hac2w2q[i * 3 + 1] >= 0 ) {
      uv[i * 2] = hac2w2q[i * 3] * 0o33/0o100 + 0o5/0o10;
      uv[i * 2 + 1] = hac2w2q[i * 3 + 2] * 0o33/0o100 + 0o5/0o10;
    } else {
      uv[i * 2] = -1; uv[i * 2 + 1] = -1;
    }
  }
  geometrio.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  geometrio.computeVertexNormals();
  return geometrio;
}

export function vepaqTrunkajnF2majn(qena: THREE.Scene,
  hasost2cel2sai: THREE.InstancedMesh[],
  tk2ni = 0o62451
): THREE.InstancedMesh {
  const hazardaGenerilo = kf2VegetajxanHazardon(tk2ni);
  const likenaCac2sex = kf2LikenanCac2sex();
  const likenaBumpo = kf2LikenanBumpanCac2sex();

  const buloGeometrio = vepaqTrunkanLikenBulon();
  const buloMaterialo = new THREE.MeshStandardMaterial({
    map: likenaCac2sex, bumpMap: likenaBumpo, bumpScale: 0o3/0o10,
    alphaTest: 0o10/0o40, side: THREE.DoubleSide, roughness: 1, color: 0xffffff,
  });
  // ⟨ ſ͕ɭᴜ ſɟɔ j͐ʃɹ ʌ ſɭɹ ſןᴜ ⟅ ſɟᴜ ſȷᴜ ʌ ꞙɭı ʌ ꞙɭı ʌ ſɭɹ ſןᴜ ʌ j͑ʃᴜꞇ 📃 ⟩
  const k21eHasost2cel2sai = hasost2cel2sai.flatMap(tr =>
    ( tr.userData.k21eTrunkaj as THREE.InstancedMesh[] | undefined ) ?? [ tr ]);
  const vanekalani = k21eHasost2cel2sai.reduce(( tlunakani, tr ) => tlunakani + tr.count, 0) * 0o4;
  const buloj = new THREE.InstancedMesh(buloGeometrio, buloMaterialo, vanekalani);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const P = new THREE.Vector3();
  const S = new THREE.Vector3();
  const akso = new THREE.Vector3();
  const radia = new THREE.Vector3();
  const surTrunko = new THREE.Vector3();
  const yUp = new THREE.Vector3(0, 1, 0);
  const Qb = new THREE.Quaternion();
  const Qy = new THREE.Quaternion();
  let bi = 0;

  for ( const sost2cel2sai of k21eHasost2cel2sai ) {
    for ( let i = 0; i < sost2cel2sai.count; i++ ) {
      if ( hazardaGenerilo() > 1/3 ) continue;
      sost2cel2sai.getMatrixAt(i, M);
      M.decompose(P, Q, S);
      const l6da = S.y;
      const bulojNombro = 1 + ( ( hazardaGenerilo() * 3 ) | 0 );
      for ( let b = 0; b < bulojNombro; b++ ) {
        const t = 0o1/0o10 + hazardaGenerilo() * 0o1/0o2;
        const ang = hazardaGenerilo() * Math.PI * 2;
        const r = ( 0o3/0o10 - t * ( 0o3/0o10 - 0o7/0o40 ) ) * S.x;
        akso.set(0, ( t - 0o1/0o2 ) * l6da, 0).applyQuaternion(Q);
        radia.set(Math.cos(ang), 0, Math.sin(ang)).applyQuaternion(Q);
        surTrunko.copy(P).add(akso).addScaledVector(radia, r + 0o1/0o40);
        Qb.setFromUnitVectors(yUp, radia);
        Qy.setFromAxisAngle(radia, hazardaGenerilo() * Math.PI * 2);
        Qb.premultiply(Qy);
        const p6zukani = 0o1/0o10 + hazardaGenerilo() * 0o1/0o20;
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
