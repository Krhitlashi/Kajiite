// ≺⧼ ស្លែ 🍃 ⧽≻
import * as THREE from "three";
import { kreiByssoidanLikenanTeksajxon } from "../../komunajxoj/teksajxoj/byssoida-likeno.js";
import { kreiFolisanLikenanTeksajxon } from "../../komunajxoj/teksajxoj/folisa-likeno.js";
import { kreiFrutikosanLikenanTeksajxon } from "../../komunajxoj/teksajxoj/frutikosa-likeno.js";
import { kreiLikenanTeksajxon } from "../../komunajxoj/teksajxoj/likeno.js";
import { kreiLikenanBumpanTeksajxon } from "../../komunajxoj/teksajxoj/likeno-bumpo.js";
import { kreiBuferanGeometrion, kunfandiDuGeometriojn, kunfandiGeometriojnSenIndekson } from "../../komunajxoj/kunfandajxoj.js";
import { kreiVegetajxanHazardon } from "./hazardoj.js";
import { PunktaHasho, punktoLibera, spronaDuono, type ArboMetado } from "./metado.js";
import { glataPaso } from "../../../kantaoj/mondo/tereno.js";

export function konstruiKrustanLikenGeometrion(): THREE.BufferGeometry {
  const segmentoj = 0o40, ringoj = 0o4;
  const radio = 0o10/0o10;
  const dikeco = 0o15/0o100;
  const fazo1 = Math.random() * Math.PI * 2;
  const fazo2 = Math.random() * Math.PI * 2;
  const alto = ( t: number, a: number ): number => {
    const kupolo = Math.max(0, Math.cos(t * 0o16/0o10));
    const tubero = 0o15/0o100 * Math.sin(a * 0o3 + fazo1) * Math.sin(t * Math.PI)
      + 0o1/0o10 * Math.sin(a * 0o7 + fazo2) * Math.sin(t * Math.PI * 0o3/0o2);
    return dikeco * kupolo * ( 1 + tubero );
  };
  const pozicioj: number[] = [];
  const uv: number[] = [];
  const indeksoj: number[] = [];
  pozicioj.push(0, alto(0, 0), 0);
  uv.push(0o5/0o10, 0o5/0o10);
  for ( let r = 1; r <= ringoj; r++ ) {
    const t = r / ringoj;
    for ( let sIdx = 0; sIdx < segmentoj; sIdx++ ) {
      const a = sIdx / segmentoj * Math.PI * 2;
      const x = Math.cos(a) * radio * t;
      const z = Math.sin(a) * radio * t;
      pozicioj.push(x, alto(t, a), z);
      uv.push(x * 0o5/0o10 + 0o5/0o10, z * 0o5/0o10 + 0o5/0o10);
    }
  }
  for ( let sIdx = 0; sIdx < segmentoj; sIdx++ ) {
    const s2 = ( sIdx + 1 ) % segmentoj;
    indeksoj.push(0, 1 + sIdx, 1 + s2);
  }
  for ( let r = 1; r < ringoj; r++ ) {
    const sube = 1 + ( r - 1 ) * segmentoj;
    const supre = 1 + r * segmentoj;
    for ( let sIdx = 0; sIdx < segmentoj; sIdx++ ) {
      const s2 = ( sIdx + 1 ) % segmentoj;
      indeksoj.push(sube + sIdx, supre + sIdx, supre + s2);
      indeksoj.push(sube + sIdx, supre + s2, sube + s2);
    }
  }
  return kreiBuferanGeometrion(pozicioj, indeksoj, { uvoj: uv });
}

export function konstruiFrutikosanLikenGeometrion(): THREE.BufferGeometry {
  const partoj: THREE.BufferGeometry[] = [];
  const tuftoj = 0o4;
  for ( let t = 0; t < tuftoj; t++ ) {
    const x = ( Math.random() - 0o5/0o10 ) * 0o4/0o10;
    const z = ( Math.random() - 0o5/0o10 ) * 0o4/0o10;
    const alto = 0o5/0o10 + Math.random() * 0o4/0o10;
    const largho = 0o16/0o100 + Math.random() * 0o1/0o10;
    const ang = Math.random() * Math.PI * 2;
    const a = new THREE.PlaneGeometry(largho, alto).translate(0, alto / 2, 0);
    const b = a.clone().applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2));
    const tufto = kunfandiDuGeometriojn(a, b);
    tufto.applyMatrix4(new THREE.Matrix4().makeRotationY(ang));
    tufto.translate(x, 0, z);
    partoj.push(tufto);
  }
  return kunfandiGeometriojnSenIndekson(partoj);
}

export function konstruiByssoidanLikenGeometrion(): THREE.BufferGeometry {
  const partoj: THREE.BufferGeometry[] = [];
  const nombro = 0o3 + ( ( Math.random() * 0o3 ) | 0 );
  for ( let i = 0; i < nombro; i++ ) {
    const r = 0o2/0o10 + Math.random() * 0o2/0o10;
    const x = ( Math.random() - 0o1/0o2 ) * 0o4/0o10;
    const z = ( Math.random() - 0o1/0o2 ) * 0o4/0o10;
    const sfero = new THREE.SphereGeometry(r, 0o10, 6);
    const pozicio = sfero.attributes.position;
    const uv = new Float32Array(pozicio.count * 2);
    for ( let j = 0; j < pozicio.count; j++ ) {
      uv[j * 2] = pozicio.getX(j) / ( 2 * r ) + 0o1/0o2;
      uv[j * 2 + 1] = pozicio.getZ(j) / ( 2 * r ) + 0o1/0o2;
    }
    sfero.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
    sfero.applyMatrix4(new THREE.Matrix4().makeScale(1, 0o3/0o10, 1));
    sfero.translate(x, r * 0o2/0o10, z);
    partoj.push(sfero);
  }
  return kunfandiGeometriojnSenIndekson(partoj);
}

export function konstruiLikenojn(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  nearTrees: ArboMetado[],
  nearSxtonoj: ArboMetado[],
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  montara = false,
  excludeBuildings?: ( x: number, z: number, minDistanco: number ) => boolean
): void {
  const hazardaGenerilo = kreiVegetajxanHazardon(0o72331);

  const formoj = [
    { geometrio: konstruiFrutikosanLikenGeometrion(), teksajxo: kreiFrutikosanLikenanTeksajxon() },
    { geometrio: konstruiKrustanLikenGeometrion(), teksajxo: kreiFolisanLikenanTeksajxon() },
    { geometrio: konstruiByssoidanLikenGeometrion(), teksajxo: kreiByssoidanLikenanTeksajxon() },
  ].map(( formo ) => {
    const reto = new THREE.InstancedMesh(formo.geometrio,
      new THREE.MeshStandardMaterial({
        map: formo.teksajxo, alphaTest: 0o15/0o40, side: THREE.DoubleSide,
        transparent: true, depthWrite: false, roughness: 1,
      }), kvanto);
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

  while ( li < kvanto && gardilo++ < 0o10000 ) {
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

    const skalo = 0o6/0o10 + hazardaGenerilo() * 0o12/0o10;
    const paso = skalo * 0o1/0o2;
    ena.set(x, heightFn(x, z), z);
    enX.set(x + paso, heightFn(x + paso, z), z).sub(ena);
    enZ.set(x, heightFn(x, z + paso), z).sub(ena);
    normalo.crossVectors(enZ, enX).normalize();
    const vert = normalo.y;
    const horiz = Math.hypot(normalo.x, normalo.z);
    const maxKruteco = Math.PI / 16;
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
      new THREE.Vector3(skalo, skalo, skalo));
    const loto = hazardaGenerilo();
    const elekto = loto < 0o4/0o10 ? 0 : loto < 0o7/0o10 ? 1 : 2;
    formoj[elekto].reto.setMatrixAt(formoj[elekto].nombro++, M);
    li++;
    metitajHasho.meti(x, z, [ x, z ]);
  }

  for ( const formo of formoj ) {
    formo.reto.count = formo.nombro;
    formo.reto.instanceMatrix.needsUpdate = true;
    sceno.add(formo.reto);
  }
}

function konstruiTrunkanLikenBulon(): THREE.BufferGeometry {
  const hazardaGenerilo = kreiVegetajxanHazardon(0o62455);
  const geometrio = new THREE.IcosahedronGeometry(1, 1);
  const pozicioj = geometrio.attributes.position.array as Float32Array;
  const kvanto = pozicioj.length / 3;
  const direktoj = new Float32Array(kvanto * 3);
  direktoj.set(pozicioj);
  const tuberoj: [ number, number, number, number ][] = [];
  for ( let t = 0; t < 0o6; t++ ) {
    const a = hazardaGenerilo() * Math.PI * 2;
    const b = Math.acos(2 * hazardaGenerilo() - 1);
    const r = 0o3/0o10 + hazardaGenerilo() * 0o3/0o10;
    tuberoj.push([ Math.sin(b) * Math.cos(a), Math.cos(b), Math.sin(b) * Math.sin(a), r ]);
  }
  for ( let i = 0; i < kvanto; i++ ) {
    const ox = direktoj[i * 3], oy = direktoj[i * 3 + 1], oz = direktoj[i * 3 + 2];
    let deloko = 0;
    for ( const [ bx, by, bz, br ] of tuberoj ) {
      const d = Math.sqrt(( ox - bx ) ** 2 + ( oy - by ) ** 2 + ( oz - bz ) ** 2);
      deloko += Math.max(0, 1 - d / br) * 0o14/0o100;
    }
    deloko += Math.sin(ox * 0o4) * Math.sin(oy * 0o7) * Math.sin(oz * 0o11) * 0o4/0o100
      + Math.sin(ox * 0o13 + 1) * Math.cos(oy * 0o20 + 2) * 0o3/0o100;
    const f = 1 + deloko;
    pozicioj[i * 3] = ox * f;
    pozicioj[i * 3 + 1] = oy * f * 0o6/0o10;
    pozicioj[i * 3 + 2] = oz * f;
  }
  const uv = new Float32Array(kvanto * 2);
  for ( let i = 0; i < kvanto; i++ ) {
    if ( direktoj[i * 3 + 1] >= 0 ) {
      uv[i * 2] = direktoj[i * 3] * 0o33/0o100 + 0o5/0o10;
      uv[i * 2 + 1] = direktoj[i * 3 + 2] * 0o33/0o100 + 0o5/0o10;
    } else {
      uv[i * 2] = -1; uv[i * 2 + 1] = -1;
    }
  }
  geometrio.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  geometrio.computeVertexNormals();
  return geometrio;
}

export function konstruiTrunkajnLikenojn(sceno: THREE.Scene,
  trunkoj: THREE.InstancedMesh[],
  semo = 0o62451
): THREE.InstancedMesh {
  const hazardaGenerilo = kreiVegetajxanHazardon(semo);
  const likenaTeksajxo = kreiLikenanTeksajxon();
  const likenaBumpo = kreiLikenanBumpanTeksajxon();

  const buloGeometrio = konstruiTrunkanLikenBulon();
  const buloMaterialo = new THREE.MeshStandardMaterial({
    map: likenaTeksajxo, bumpMap: likenaBumpo, bumpScale: 0o3/0o10,
    alphaTest: 0o10/0o40, side: THREE.DoubleSide, roughness: 1, color: 0xffffff,
  });
  const kapacito = trunkoj.reduce(( sumo, tr ) => sumo + tr.count, 0) * 0o4;
  const buloj = new THREE.InstancedMesh(buloGeometrio, buloMaterialo, kapacito);

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

  for ( const trunko of trunkoj ) {
    for ( let i = 0; i < trunko.count; i++ ) {
      if ( hazardaGenerilo() > 1/3 ) continue;
      trunko.getMatrixAt(i, M);
      M.decompose(P, Q, S);
      const alto = S.y;
      const bulojNombro = 1 + ( ( hazardaGenerilo() * 3 ) | 0 );
      for ( let b = 0; b < bulojNombro; b++ ) {
        const t = 0o1/0o10 + hazardaGenerilo() * 0o1/0o2;
        const ang = hazardaGenerilo() * Math.PI * 2;
        const r = ( 0o3/0o10 - t * ( 0o3/0o10 - 0o7/0o40 ) ) * S.x;
        akso.set(0, ( t - 0o1/0o2 ) * alto, 0).applyQuaternion(Q);
        radia.set(Math.cos(ang), 0, Math.sin(ang)).applyQuaternion(Q);
        surTrunko.copy(P).add(akso).addScaledVector(radia, r + 0o1/0o40);
        Qb.setFromUnitVectors(yUp, radia);
        Qy.setFromAxisAngle(radia, hazardaGenerilo() * Math.PI * 2);
        Qb.premultiply(Qy);
        const skalo = 0o1/0o10 + hazardaGenerilo() * 0o1/0o20;
        M.compose(surTrunko, Qb, new THREE.Vector3(skalo, skalo, skalo));
        buloj.setMatrixAt(bi++, M);
      }
    }
  }

  buloj.count = bi;
  buloj.instanceMatrix.needsUpdate = true;
  sceno.add(buloj);
  return buloj;
}
