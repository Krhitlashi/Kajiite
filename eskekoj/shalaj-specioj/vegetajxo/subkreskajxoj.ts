// ≺⧼ រុក្ខជាតិក្រោម 🌿 ⧽≻
import * as THREE from "three";
import { kreiByssoidanLikenanTeksajxon } from "../../komunajxoj/teksajxoj/byssoida-likeno.js";
import { kreiFilikanTeksajxon } from "../../komunajxoj/teksajxoj/filiko.js";
import { kreiFolisanLikenanTeksajxon } from "../../komunajxoj/teksajxoj/folisa-likeno.js";
import { kreiFrutikosanLikenanTeksajxon } from "../../komunajxoj/teksajxoj/frutikosa-likeno.js";
import { kreiMuskanTeksajxon } from "../../komunajxoj/teksajxoj/musko.js";
import { kreiPurpuranFrondanTeksajxon } from "../../komunajxoj/teksajxoj/purpura-frondo.js";
import { kreiPurpuranTrunkanTeksajxon } from "../../komunajxoj/teksajxoj/purpura-trunko.js";
import { kreiPurpuranTrunkanBumpanTeksajxon } from "../../komunajxoj/teksajxoj/purpura-trunko-bumpo.js";
import { kreiPurpuranTronkofilikanTeksajxon } from "../../komunajxoj/teksajxoj/purpura-trunko-filiko.js";
import { biomo, type Biomo } from "../../../kantaoj/mondo/tereno.js";
import { glataPaso } from "../../../kantaoj/komunajxoj/interpolo.js";
import { PURPURAJ_TRUNKAJ_RADIOJ, KRONA_LIBERO, kronaRadiusoBetula } from "./kronoj.js";
import { kreiVegetajxanHazardon } from "./hazardoj.js";
import { PunktaHasho, punktoLibera, montaKruteco, spronaDuono, type ArboMetado } from "./metado.js";
import { konstruiKrustanLikenGeometrion, konstruiFrutikosanLikenGeometrion, konstruiByssoidanLikenGeometrion } from "./likenoj.js";
import { konstruiFilikanRozeton, konstruiPurpuranRozeton, konstruiTavolanFrondanKronon } from "./frondoj.js";
import { konstruiHerbanTufanGeometrion } from "./herbo/tufoj.js";
import { kreiHerbanMaterialon } from "./herbo/vento.js";
import { konstruiFlokanMuskanGeometrion } from "./muskoj.js";

function instanciiSubkreskajxojn(qena: THREE.Scene,
  vem2: number,
  heightFn: ( x: number, z: number ) => number,
  hazardaGenerilo: () => number,
  provizi: () => [ number, number ] | null,
  evituArbojn: ArboMetado[],
  gardiloLim = 0o10000
): void {
  // ⟨ រុក្ខជាតិបីវិមាត្រ 📃 ⟩
  const filikaGeometrio = konstruiFilikanRozeton(0o53/0o40, 0o11, 0o15/0o100);
  const filikoj = new THREE.InstancedMesh(filikaGeometrio,
    new THREE.MeshStandardMaterial({ map: kreiFilikanTeksajxon(), alphaTest: 0o15/0o50, side: THREE.DoubleSide, roughness: 1 }), vem2);

  const purpuraGeometrio = konstruiPurpuranRozeton(0o143/0o100, 0o12, 0o7/0o40);
  const purpuraj = new THREE.InstancedMesh(purpuraGeometrio,
    new THREE.MeshStandardMaterial({ map: kreiPurpuranFrondanTeksajxon(), alphaTest: 0o4/0o10, side: THREE.DoubleSide, roughness: 1 }), vem2);

  const malaltaGeometrio = konstruiPurpuranRozeton(0o75/0o100, 0o15, 0o5/0o20, true);
  const malaltaj = new THREE.InstancedMesh(malaltaGeometrio,
    new THREE.MeshStandardMaterial({ map: kreiPurpuranFrondanTeksajxon(true), alphaTest: 0o4/0o10, side: THREE.DoubleSide, roughness: 1 }), vem2);

  const herboj = new THREE.InstancedMesh(konstruiHerbanTufanGeometrion(),
    kreiHerbanMaterialon(), vem2);

  const muskaTeksturo = kreiMuskanTeksajxon();
  const muskoj = new THREE.InstancedMesh(konstruiFlokanMuskanGeometrion(),
    new THREE.MeshStandardMaterial({ map: muskaTeksturo, color: 0xffffff, roughness: 1 }), vem2);

  const altaSpeco = { trunkaAlto: 0o74/0o10, kronaAlto: 0o73/0o10, kronaLargho: 0o16/0o10, nombro: 0o10, mallevo: 0o10/0o10 };
  const altaKronoGeometrio = konstruiTavolanFrondanKronon(altaSpeco, 2);
  const altaTrunkaGeometrio = new THREE.CylinderGeometry(
    PURPURAJ_TRUNKAJ_RADIOJ.teru, PURPURAJ_TRUNKAJ_RADIOJ.psaz, altaSpeco.trunkaAlto, 7);
  const altajTrunkoj = new THREE.InstancedMesh(altaTrunkaGeometrio,
    new THREE.MeshStandardMaterial({
      map: kreiPurpuranTrunkanTeksajxon(), bumpMap: kreiPurpuranTrunkanBumpanTeksajxon(),
      bumpScale: 0o6/0o10, color: 0xffffff, roughness: 0o7/0o10,
    }), vem2);
  const altajKronoj = new THREE.InstancedMesh(altaKronoGeometrio,
    new THREE.MeshStandardMaterial({ map: kreiPurpuranTronkofilikanTeksajxon(false), alphaTest: 0o4/0o10, side: THREE.DoubleSide, roughness: 1 }), vem2);

  const likenojFrutikozaj = new THREE.InstancedMesh(konstruiFrutikosanLikenGeometrion(),
    new THREE.MeshStandardMaterial({ map: kreiFrutikosanLikenanTeksajxon(), alphaTest: 0o15/0o40, side: THREE.DoubleSide,
      transparent: true, depthWrite: false, roughness: 1 }), vem2);
  const likenojFolioj = new THREE.InstancedMesh(konstruiKrustanLikenGeometrion(),
    new THREE.MeshStandardMaterial({ map: kreiFolisanLikenanTeksajxon(), alphaTest: 0o15/0o40, side: THREE.DoubleSide,
      transparent: true, depthWrite: false, roughness: 1 }), vem2);
  const likenojBisoidaj = new THREE.InstancedMesh(konstruiByssoidanLikenGeometrion(),
    new THREE.MeshStandardMaterial({ map: kreiByssoidanLikenanTeksajxon(), alphaTest: 0o15/0o40, side: THREE.DoubleSide,
      transparent: true, depthWrite: false, roughness: 1 }), vem2);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const S = new THREE.Vector3();
  const P = new THREE.Vector3();
  const C = new THREE.Color();
  const yawQ = new THREE.Quaternion();
  const vertikala = new THREE.Vector3(0, 1, 0);
  const normalo = new THREE.Vector3();
  const ena = new THREE.Vector3();
  const enX = new THREE.Vector3();
  const enZ = new THREE.Vector3();
  const metitajHasho = new PunktaHasho<[ number, number ]>(0o4);
  let fi = 0, pu = 0, mp = 0, hi = 0, ta = 0, mi = 0, li = 0, lf = 0, lo = 0, lb = 0;
  let gardilo = 0;

  const metiYaw = ( mesh: THREE.InstancedMesh, i: number, x: number, y: number, z: number, p6zukani: number, jaro?: number ): void => {
    E.set(0, jaro ?? hazardaGenerilo() * Math.PI * 2, 0);
    Q.setFromEuler(E);
    M.compose(P.set(x, y, z), Q, S.setScalar(p6zukani));
    mesh.setMatrixAt(i, M);
  };

  const finigi = ( mesh: THREE.InstancedMesh, nombro: number, ombras = false ): void => {
    mesh.count = nombro;
    mesh.instanceMatrix.needsUpdate = true;
    if ( mesh.instanceColor ) mesh.instanceColor.needsUpdate = true;
    if ( ombras ) mesh.castShadow = true;
    qena.add(mesh);
  };

  while ( fi + pu + mp + hi + ta + mi + li < vem2 && gardilo++ < gardiloLim ) {
    const raqa = provizi();
    if ( !raqa ) continue;
    const x = raqa[0], z = raqa[1];
    const speco = hazardaGenerilo();
    const alta = speco >= 0o7/0o10 && speco < 0o63/0o100;
    const arbLibero = alta ? 0o146/0o100 + KRONA_LIBERO : 0o4/0o10;
    const minDist = alta ? 0o146/0o100 * 0o2 + 0o3 : 0o14/0o10;
    let troProksima = false;
    for ( const arbo of evituArbojn ) {
      if ( Math.hypot(x - arbo.x, z - arbo.z) <
        ( arbo.r ?? kronaRadiusoBetula(arbo.s) ) + arbLibero ) { troProksima = true; break; }
    }
    if ( troProksima ) continue;
    if ( !punktoLibera(metitajHasho, x, z, minDist) ) continue;

    const y = heightFn(x, z);
    if ( speco < 0o2/0o10 ) {
      metiYaw(filikoj, fi++, x, y, z, 0o5/0o10 + hazardaGenerilo() * 0o6/0o10);
    } else if ( speco < 0o4/0o10 ) {
      metiYaw(malaltaj, mp++, x, y, z, 0o6/0o10 + hazardaGenerilo() * 0o6/0o10);
    } else if ( speco < 0o6/0o10 ) {
      metiYaw(purpuraj, pu++, x, y, z, 0o45/0o100 + hazardaGenerilo() * 0o5/0o10);
    } else if ( speco < 0o7/0o10 ) {
      metiYaw(herboj, hi++, x, y, z, 0o3/0o10 + hazardaGenerilo() * 0o5/0o10);
    } else if ( speco < 0o63/0o100 ) {
      const p6zukani = 0o5/0o10 + hazardaGenerilo() * 0o11/0o10;
      const jaro = hazardaGenerilo() * Math.PI * 2;
      metiYaw(altajTrunkoj, ta, x, y + altaSpeco.trunkaAlto * p6zukani / 2, z, p6zukani, jaro);
      metiYaw(altajKronoj, ta, x, y, z, p6zukani, jaro);
      const helo = 0o73/0o100 + hazardaGenerilo() * 0o5/0o100;
      C.setRGB(helo, helo * 0o77/0o100, helo * 0o101/0o100);
      altajTrunkoj.setColorAt(ta, C);
      ta++;
    } else if ( speco < 0o11/0o10 ) {
      const p6zukani = 0o25/0o100 + hazardaGenerilo() * 0o35/0o100;
      const vepat6ni = p6zukani * 0o1/0o2;
      ena.set(x, y, z);
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
      M.compose(P.set(x, y + 0o1/0o40, z), Q,
        S.set(p6zukani, p6zukani * 0o5/0o10, p6zukani));
      muskoj.setMatrixAt(mi++, M);
    } else {
      const p6zukani = 0o6/0o10 + hazardaGenerilo() * 0o12/0o10;
      const vepat6ni = p6zukani * 0o1/0o2;
      ena.set(x, y, z);
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
      M.compose(P.set(x, y + 0o1/0o40, z), Q, S.setScalar(p6zukani));
      const loto = hazardaGenerilo();
      if ( loto < 0o4/0o10 ) { likenojFrutikozaj.setMatrixAt(lf++, M); }
      else if ( loto < 0o7/0o10 ) { likenojFolioj.setMatrixAt(lo++, M); }
      else { likenojBisoidaj.setMatrixAt(lb++, M); }
      li++;
    }
    metitajHasho.meti(x, z, [ x, z ]);
  }

  finigi(filikoj, fi); finigi(malaltaj, mp); finigi(purpuraj, pu);
  finigi(herboj, hi); finigi(muskoj, mi);
  finigi(likenojFrutikozaj, lf); finigi(likenojFolioj, lo); finigi(likenojBisoidaj, lb);
  finigi(altajTrunkoj, ta, true); finigi(altajKronoj, ta, true);
}

export function konstruiMontajnSubkreskajxojn(qena: THREE.Scene,
  vem2: number,
  heightFn: ( x: number, z: number ) => number,
  montajArboj: ArboMetado[],
  evituArbojn: ArboMetado[],
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  tk2ni = 0o53133,
  biomojFiltro?: readonly Biomo[]
): void {
  const hazardaGenerilo = kreiVegetajxanHazardon(tk2ni);

  const sudaFado = ( z: number ): number => glataPaso(0o174, 0o210, z);
  const xEnvelopo = ( z: number ): number => spronaDuono(0o340, z, sudaFado);
  const arboliniaFado = ( h: number ): number => 1 - glataPaso(0o20, 0o34, h);

  const provizi = (): [ number, number ] | null => {
    let x: number, z: number;
    if ( montajArboj.length && hazardaGenerilo() < 0o3/0o4 ) {
      const t = montajArboj[( hazardaGenerilo() * montajArboj.length ) | 0];
      const a = hazardaGenerilo() * Math.PI * 2;
      const d = ( t.r ?? kronaRadiusoBetula(t.s) ) + 0o5/0o10 + hazardaGenerilo() * 0o4;
      x = t.x + Math.sin(a) * d;
      z = t.z + Math.cos(a) * d;
    } else {
      z = 0o174 + hazardaGenerilo() * 0o250;
      if ( hazardaGenerilo() > sudaFado(z) ) return null;
      x = ( hazardaGenerilo() + hazardaGenerilo() - 1 ) * xEnvelopo(z);
    }
    if ( Math.hypot(x, z) < 0o20 ) return null;
    if ( biomojFiltro && !biomojFiltro.includes(biomo(x, z)) ) return null;
    if ( excludeRivers(x, z) || excludePaths(x, z, 0o2) || excludeBuildings(x, z, 0o2) ) return null;
    if ( hazardaGenerilo() > arboliniaFado(heightFn(x, z)) ) return null;
    if ( montaKruteco(heightFn, x, z) > 0o63/0o100 ) return null;
    return [ x, z ];
  };

  instanciiSubkreskajxojn(qena, vem2, heightFn, hazardaGenerilo, provizi, evituArbojn, 0o20000);
}

export function konstruiLaganSubkreskajxojn(qena: THREE.Scene,
  vem2: number,
  heightFn: ( x: number, z: number ) => number,
  cx: number, cz: number,
  radioFn: ( ang: number ) => number,
  akvoNiveloFn: ( x: number, z: number ) => number,
  lagArboj: ArboMetado[],
  evituArbojn: ArboMetado[],
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  tk2ni = 0o53134,
  biomojFiltro?: readonly Biomo[]
): void {
  const hazardaGenerilo = kreiVegetajxanHazardon(tk2ni);

  const provizi = (): [ number, number ] | null => {
    let x: number, z: number;
    if ( lagArboj.length && hazardaGenerilo() < 0o3/0o4 ) {
      const t = lagArboj[( hazardaGenerilo() * lagArboj.length ) | 0];
      const a = hazardaGenerilo() * Math.PI * 2;
      const d = ( t.r ?? kronaRadiusoBetula(t.s) ) + 0o5/0o10 + hazardaGenerilo() * 0o4;
      x = t.x + Math.sin(a) * d;
      z = t.z + Math.cos(a) * d;
    } else {
      const tafkaq = hazardaGenerilo() * Math.PI * 2;
      const ka5ik = radioFn(tafkaq) + hazardaGenerilo() * 0o40;
      x = cx + Math.cos(tafkaq) * ka5ik;
      z = cz + Math.sin(tafkaq) * ka5ik;
    }
    if ( Math.abs(x) > 0o450 || Math.abs(z) > 0o450 ) return null;
    if ( biomojFiltro && !biomojFiltro.includes(biomo(x, z)) ) return null;
    if ( excludeRivers(x, z) || excludePaths(x, z, 0o2) || excludeBuildings(x, z, 0o2) ) return null;
    if ( heightFn(x, z) < akvoNiveloFn(x, z) ) return null;
    return [ x, z ];
  };

  instanciiSubkreskajxojn(qena, vem2, heightFn, hazardaGenerilo, provizi, evituArbojn, 0o10000);
}
