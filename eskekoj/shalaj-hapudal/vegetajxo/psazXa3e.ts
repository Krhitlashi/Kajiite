// ≺⧼ ı],ᴜ ſ̀ȷɔ 🌿 ⧽≻
import * as THREE from "three";
import { kf2ByssoidanLikenanCac2sex } from "../../komunajxoj/cac2sex/byssoida-f2ma.js";
import { kf2XabenCac2sex } from "../../komunajxoj/cac2sex/xabe.js";
import { kf2FolisanLikenanCac2sex } from "../../komunajxoj/cac2sex/folisa-f2ma.js";
import { kf2FrutikosanLikenanCac2sex } from "../../komunajxoj/cac2sex/frutikosa-f2ma.js";
import { kf2MuskanCac2sex } from "../../komunajxoj/cac2sex/c6x.js";
import { kf2AsfanFc2qnCac2sex } from "../../komunajxoj/cac2sex/asfa-fc2q.js";
import { kf2AsfanTrunkanCac2sex } from "../../komunajxoj/cac2sex/asfa-sost2cel2sai.js";
import { kf2AsfanTrunkanBumpanCac2sex } from "../../komunajxoj/cac2sex/asfa-sost2cel2sai-bumpo.js";
import { kf2AsfanTronkoxabenCac2sex } from "../../komunajxoj/cac2sex/asfa-sost2cel2sai-xabe.js";
import { bs2, type Bs2 } from "../../../kantaoj/mondo/tereno.js";
import { glataPaso } from "../../../kantaoj/komunajxoj/interpolo.js";
import { PURPURAJ_TRUNKAJ_RADIOJ, KRONA_LIBERO, kronaRadiusoLam2v } from "./hasoza.js";
import { kf2VegetajxanHazardon } from "./sakxoXa3e.js";
import { PunktaHasho, punktoLibera, montaKruteco, spronaDuono, type ArboRaqa } from "./raqa.js";
import { vepaqKrustanLikenGeometrion, vepaqFrutikosanLikenGeometrion, vepaqByssoidanLikenGeometrion } from "./haf2ma.js";
import { vepaqXabenRozeton, vepaqAsfanRozeton, vepaqTavolanFc2qnKronon } from "./fhac2q.js";
import { vepaqHerbanTufanGeometrion } from "./fe1af/tufoj.js";
import { kf2HerbanMaterialon } from "./fe1af/vento.js";
import { vepaqFlokanMuskanGeometrion } from "./hac6x.js";

function instanciiSubkreskajxojn(qena: THREE.Scene,
  vem2: number,
  heightFn: ( x: number, z: number ) => number,
  hazardaGenerilo: () => number,
  provizi: () => [ number, number ] | null,
  evituArbojn: ArboRaqa[],
  gardiloLim = 0o10000
): void {
  // ⟨ រុក្ខជាតិបីវិមាត្រ 📃 ⟩
  const xabeGeometrio = vepaqXabenRozeton(0o53/0o40, 0o11, 0o15/0o100);
  const haxabe = new THREE.InstancedMesh(xabeGeometrio,
    new THREE.MeshStandardMaterial({ map: kf2XabenCac2sex(), alphaTest: 0o15/0o50, side: THREE.DoubleSide, roughness: 1 }), vem2);

  const asfaGeometrio = vepaqAsfanRozeton(0o143/0o100, 0o12, 0o7/0o40);
  const hasfa = new THREE.InstancedMesh(asfaGeometrio,
    new THREE.MeshStandardMaterial({ map: kf2AsfanFc2qnCac2sex(), alphaTest: 0o4/0o10, side: THREE.DoubleSide, roughness: 1 }), vem2);

  const malaltaGeometrio = vepaqAsfanRozeton(0o75/0o100, 0o15, 0o5/0o20, true);
  const malaltaj = new THREE.InstancedMesh(malaltaGeometrio,
    new THREE.MeshStandardMaterial({ map: kf2AsfanFc2qnCac2sex(true), alphaTest: 0o4/0o10, side: THREE.DoubleSide, roughness: 1 }), vem2);

  const hafe1af = new THREE.InstancedMesh(vepaqHerbanTufanGeometrion(),
    kf2HerbanMaterialon(), vem2);

  const muskaTeksturo = kf2MuskanCac2sex();
  const hac6x = new THREE.InstancedMesh(vepaqFlokanMuskanGeometrion(),
    new THREE.MeshStandardMaterial({ map: muskaTeksturo, color: 0xffffff, roughness: 1 }), vem2);

  const altaPudal = { trunkaAlto: 0o74/0o10, kronaAlto: 0o73/0o10, kronaLargho: 0o16/0o10, nombro: 0o10, mallevo: 0o10/0o10 };
  const altaKronoGeometrio = vepaqTavolanFc2qnKronon(altaPudal, 2);
  const altaTrunkaGeometrio = new THREE.CylinderGeometry(
    PURPURAJ_TRUNKAJ_RADIOJ.teru, PURPURAJ_TRUNKAJ_RADIOJ.psaz, altaPudal.trunkaAlto, 7);
  const altajHasost2cel2sai = new THREE.InstancedMesh(altaTrunkaGeometrio,
    new THREE.MeshStandardMaterial({
      map: kf2AsfanTrunkanCac2sex(), bumpMap: kf2AsfanTrunkanBumpanCac2sex(),
      bumpScale: 0o6/0o10, color: 0xffffff, roughness: 0o7/0o10,
    }), vem2);
  const altajKronoj = new THREE.InstancedMesh(altaKronoGeometrio,
    new THREE.MeshStandardMaterial({ map: kf2AsfanTronkoxabenCac2sex(false), alphaTest: 0o4/0o10, side: THREE.DoubleSide, roughness: 1 }), vem2);

  const haf2maFrutikozaj = new THREE.InstancedMesh(vepaqFrutikosanLikenGeometrion(),
    new THREE.MeshStandardMaterial({ map: kf2FrutikosanLikenanCac2sex(), alphaTest: 0o15/0o40, side: THREE.DoubleSide,
      transparent: true, depthWrite: false, roughness: 1 }), vem2);
  const haf2maSlafj = new THREE.InstancedMesh(vepaqKrustanLikenGeometrion(),
    new THREE.MeshStandardMaterial({ map: kf2FolisanLikenanCac2sex(), alphaTest: 0o15/0o40, side: THREE.DoubleSide,
      transparent: true, depthWrite: false, roughness: 1 }), vem2);
  const haf2maBisoidaj = new THREE.InstancedMesh(vepaqByssoidanLikenGeometrion(),
    new THREE.MeshStandardMaterial({ map: kf2ByssoidanLikenanCac2sex(), alphaTest: 0o15/0o40, side: THREE.DoubleSide,
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
    const pudal = hazardaGenerilo();
    const alta = pudal >= 0o7/0o10 && pudal < 0o63/0o100;
    const arbLibero = alta ? 0o146/0o100 + KRONA_LIBERO : 0o4/0o10;
    const minDist = alta ? 0o146/0o100 * 0o2 + 0o3 : 0o14/0o10;
    let troProksima = false;
    for ( const arbo of evituArbojn ) {
      if ( Math.hypot(x - arbo.x, z - arbo.z) <
        ( arbo.r ?? kronaRadiusoLam2v(arbo.s) ) + arbLibero ) { troProksima = true; break; }
    }
    if ( troProksima ) continue;
    if ( !punktoLibera(metitajHasho, x, z, minDist) ) continue;

    const y = heightFn(x, z);
    if ( pudal < 0o2/0o10 ) {
      metiYaw(haxabe, fi++, x, y, z, 0o5/0o10 + hazardaGenerilo() * 0o6/0o10);
    } else if ( pudal < 0o4/0o10 ) {
      metiYaw(malaltaj, mp++, x, y, z, 0o6/0o10 + hazardaGenerilo() * 0o6/0o10);
    } else if ( pudal < 0o6/0o10 ) {
      metiYaw(hasfa, pu++, x, y, z, 0o45/0o100 + hazardaGenerilo() * 0o5/0o10);
    } else if ( pudal < 0o7/0o10 ) {
      metiYaw(hafe1af, hi++, x, y, z, 0o3/0o10 + hazardaGenerilo() * 0o5/0o10);
    } else if ( pudal < 0o63/0o100 ) {
      const p6zukani = 0o5/0o10 + hazardaGenerilo() * 0o11/0o10;
      const jaro = hazardaGenerilo() * Math.PI * 2;
      metiYaw(altajHasost2cel2sai, ta, x, y + altaPudal.trunkaAlto * p6zukani / 2, z, p6zukani, jaro);
      metiYaw(altajKronoj, ta, x, y, z, p6zukani, jaro);
      const tsije = 0o73/0o100 + hazardaGenerilo() * 0o5/0o100;
      C.setRGB(tsije, tsije * 0o77/0o100, tsije * 0o101/0o100);
      altajHasost2cel2sai.setColorAt(ta, C);
      ta++;
    } else if ( pudal < 0o11/0o10 ) {
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
      hac6x.setMatrixAt(mi++, M);
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
      if ( loto < 0o4/0o10 ) { haf2maFrutikozaj.setMatrixAt(lf++, M); }
      else if ( loto < 0o7/0o10 ) { haf2maSlafj.setMatrixAt(lo++, M); }
      else { haf2maBisoidaj.setMatrixAt(lb++, M); }
      li++;
    }
    metitajHasho.meti(x, z, [ x, z ]);
  }

  finigi(haxabe, fi); finigi(malaltaj, mp); finigi(hasfa, pu);
  finigi(hafe1af, hi); finigi(hac6x, mi);
  finigi(haf2maFrutikozaj, lf); finigi(haf2maSlafj, lo); finigi(haf2maBisoidaj, lb);
  finigi(altajHasost2cel2sai, ta, true); finigi(altajKronoj, ta, true);
}

export function vepaqMontajnSubkreskajxojn(qena: THREE.Scene,
  vem2: number,
  heightFn: ( x: number, z: number ) => number,
  montajArboj: ArboRaqa[],
  evituArbojn: ArboRaqa[],
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  tk2ni = 0o53133,
  habs2Filtro?: readonly Bs2[]
): void {
  const hazardaGenerilo = kf2VegetajxanHazardon(tk2ni);

  const sudaFado = ( z: number ): number => glataPaso(0o174, 0o210, z);
  const xEnvelopo = ( z: number ): number => spronaDuono(0o340, z, sudaFado);
  const arboliniaFado = ( h: number ): number => 1 - glataPaso(0o20, 0o34, h);

  const provizi = (): [ number, number ] | null => {
    let x: number, z: number;
    if ( montajArboj.length && hazardaGenerilo() < 0o3/0o4 ) {
      const t = montajArboj[( hazardaGenerilo() * montajArboj.length ) | 0];
      const a = hazardaGenerilo() * Math.PI * 2;
      const d = ( t.r ?? kronaRadiusoLam2v(t.s) ) + 0o5/0o10 + hazardaGenerilo() * 0o4;
      x = t.x + Math.sin(a) * d;
      z = t.z + Math.cos(a) * d;
    } else {
      z = 0o174 + hazardaGenerilo() * 0o250;
      if ( hazardaGenerilo() > sudaFado(z) ) return null;
      x = ( hazardaGenerilo() + hazardaGenerilo() - 1 ) * xEnvelopo(z);
    }
    if ( Math.hypot(x, z) < 0o20 ) return null;
    if ( habs2Filtro && !habs2Filtro.includes(bs2(x, z)) ) return null;
    if ( excludeRivers(x, z) || excludePaths(x, z, 0o2) || excludeBuildings(x, z, 0o2) ) return null;
    if ( hazardaGenerilo() > arboliniaFado(heightFn(x, z)) ) return null;
    if ( montaKruteco(heightFn, x, z) > 0o63/0o100 ) return null;
    return [ x, z ];
  };

  instanciiSubkreskajxojn(qena, vem2, heightFn, hazardaGenerilo, provizi, evituArbojn, 0o20000);
}

export function vepaqLaganSubkreskajxojn(qena: THREE.Scene,
  vem2: number,
  heightFn: ( x: number, z: number ) => number,
  cx: number, cz: number,
  radioFn: ( ang: number ) => number,
  akvoVem2Fn: ( x: number, z: number ) => number,
  lagArboj: ArboRaqa[],
  evituArbojn: ArboRaqa[],
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  tk2ni = 0o53134,
  habs2Filtro?: readonly Bs2[]
): void {
  const hazardaGenerilo = kf2VegetajxanHazardon(tk2ni);

  const provizi = (): [ number, number ] | null => {
    let x: number, z: number;
    if ( lagArboj.length && hazardaGenerilo() < 0o3/0o4 ) {
      const t = lagArboj[( hazardaGenerilo() * lagArboj.length ) | 0];
      const a = hazardaGenerilo() * Math.PI * 2;
      const d = ( t.r ?? kronaRadiusoLam2v(t.s) ) + 0o5/0o10 + hazardaGenerilo() * 0o4;
      x = t.x + Math.sin(a) * d;
      z = t.z + Math.cos(a) * d;
    } else {
      const tafkaq = hazardaGenerilo() * Math.PI * 2;
      const ka5ik = radioFn(tafkaq) + hazardaGenerilo() * 0o40;
      x = cx + Math.cos(tafkaq) * ka5ik;
      z = cz + Math.sin(tafkaq) * ka5ik;
    }
    if ( Math.abs(x) > 0o450 || Math.abs(z) > 0o450 ) return null;
    if ( habs2Filtro && !habs2Filtro.includes(bs2(x, z)) ) return null;
    if ( excludeRivers(x, z) || excludePaths(x, z, 0o2) || excludeBuildings(x, z, 0o2) ) return null;
    if ( heightFn(x, z) < akvoVem2Fn(x, z) ) return null;
    return [ x, z ];
  };

  instanciiSubkreskajxojn(qena, vem2, heightFn, hazardaGenerilo, provizi, evituArbojn, 0o10000);
}
