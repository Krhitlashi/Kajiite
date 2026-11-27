// ≺⧼ ſȷɔ ſᶘᴜʞ 🌿 ⧽≻
import * as THREE from "three";
import { kf2HerbanTavolanKlinganCac2sex } from "../../../p6kpu/cac2sex/kofa-kxa-fe1af.js";
import { fe1afKekWeh2, nex2caFe1afKekWeh2, mut6qWeh2En } from "../../../p6kpu/mut6qHaweh2.js";
import { veb6qaiWeh2Skek } from "../../../p6kpu/haweh2.js";
import { vakox2qSenIndekson } from "../../../p6kpu/hakox2q.js";
import { kf2Xa3eHazardon } from "../sakxoXa3e.js";
import { K6H6AEKSTERAP2SOMANI } from "../../../qatsiike/hak6h6/havecax2l.js";
import { bs2, tsasaVem2, tsasaVem2Tsiike, SKULPTAN, SKULPTAPASO, SKULPTAORIGINO,
  type Bs2 } from "../../../../kanta/nala/mut6qSoza.js";
import { kf2HerbanKxa } from "./hakxa.js";
import { kf2HerbanPukekn, hatsiicaTavoloj, devigiHerbanGxisdatigon } from "./g2b2.js";

export interface TsiicaTufo {
  x: number; z: number; y: number;
  sx: number; sy: number; sz: number;
  gx: number; gz: number;

  yaw: number;
  s2weh2: number;
  haga: number;
  bs2: Bs2;
  hunaq: number;
}

export const HERBACXELO = 0o2;
export const HERBATAVOLAKSAKA = "tsiicaTavolo";
const HERBACAX2L = 0o40;

const HERBAPLOSTEQ = 0o40;

export const HERBALARGO = 0o26/0o10;
const HERBACXELAJIT6PLOSTEQ = 0o1/0o4;

export const HERBAAKSOJ = 0o13;
const HERBAHAS2NASCE = 0o1;
export const HERBAHUNAQ = 0o3;

export const HERBASEMO = 0o2715;
export const HERBASEMAPASO = 0o1436;
const HERBACAX2LJANTUXJESI = 0o4;

const HERBALODDISTO = 0o12;
const HERBALODHAS2NASCE = 0o1;
const HERBALODHACEL2NU = 0o3;

const HERBAKLINGAL6DA = 0o44/0o100;
const HERBAHAGAPLOSTEQ = 0o7/0o10;
const HERBADOKLIVAPLOSTEQ = 0o13/0o20;
const HERBASUKENO = 0o1/0o100;

const HERBARADIO = HERBALARGO * 0o1/0o2 + ( 0o14/0o100 + 0o2/0o10 )
  * ( 0o5/0o100 + 0o15/0o100 ) * ( 0o5/0o10 + 0o5/0o10 );

export const HERBABS2JHAWEH2:
  Partial<Record<Bs2, readonly [ number, number, number ]>> = {
    "lota": [ 0o1, 0o1, 0o1 ],
    "qun2nu": [ 0o1, 0o1, 0o4/0o5 ],
    "jaqo": [ 0o17/0o20, 0o1, 0o1 ],
    "tsasa-haxa3e": [ 0o17/0o20, 0o1, 0o4/0o5 ],
    "tsake": [ 0o17/0o20, 0o1, 0o17/0o20 ],
  };

const HERBAG2J6WEH2 = new THREE.Color(0o1, 0o1, 0o1);

const HERBAGRUZAWEH2 = new THREE.Color(0o6/0o10, 0o66/0o100, 0o6/0o10);
const HERBAHUNAWEH2 = new THREE.Color(0o16/0o100, 0o3/0o10, 0o22/0o100);

const HERBAHUNANU = 0o74/0o100;

function tsiicaKp6taf(ix: number, iz: number): number {
  let h = Math.imul(ix, 0x27d4eb2d) ^ Math.imul(iz, 0x165667b1);
  h = Math.imul(h ^ ( h >>> 0o15 ), 0x2545f491);
  return ( ( h ^ ( h >>> 0o13 ) ) >>> 0o0 ) / 0o40000000000;
}

export function kf2HerbanTavolanKopion(varia: THREE.BufferGeometry, vem2: number,
  doklivo?: THREE.InstancedBufferAttribute): THREE.BufferGeometry {
  const zace = new THREE.BufferGeometry();
  for ( const ksaka of [ "position", "uv", "color" ] ) {
    const atributo = varia.getAttribute(ksaka);
    if ( atributo ) zace.setAttribute(ksaka, atributo);
  }
  const vecax2lani = varia.getIndex();
  if ( vecax2lani ) zace.setIndex(vecax2lani);

  zace.setAttribute("tsiicaDoklivo", doklivo
    ?? new THREE.InstancedBufferAttribute(new Float32Array(vem2 * 0o2), 0o2));
  return zace;
}

export interface TsiicaTufaHasukf2qani {
  heightFn: ( x: number, z: number ) => number;
  excludeRivers: ( x: number, z: number ) => boolean;
  excludePaths: ( x: number, z: number, minH6kuni: number ) => boolean;
  excludeBuildings: ( x: number, z: number, minH6kuni: number ) => boolean;
  habs2Tu5ekomani?: readonly Bs2[];
  k6h6Klaro?: ( x: number, z: number, maks: number ) => number;
  kruxaKlaro?: ( x: number, z: number, maks: number ) => number;

  bs2Fn?: ( x: number, z: number ) => Bs2;
  tsasaVem2Fn?: ( x: number, z: number ) => number;
}

const TUFE = new THREE.Euler();
const TUFQ = new THREE.Quaternion();

export function vek2feHerbanTufon(ix: number, iz: number,
  hasukf2qani: TsiicaTufaHasukf2qani): TsiicaTufo | null {
  const heightFn = hasukf2qani.heightFn;
  const x = ( ix + 0o1/0o2 + ( tsiicaKp6taf(ix, iz) - 0o1/0o2 ) * HERBACXELAJIT6PLOSTEQ ) * HERBACXELO;
  const z = ( iz + 0o1/0o2 + ( tsiicaKp6taf(ix + 0o27, iz + 0o11) - 0o1/0o2 ) * HERBACXELAJIT6PLOSTEQ )
    * HERBACXELO;
  const bi = ( hasukf2qani.bs2Fn ?? bs2 )(x, z);
  if ( hasukf2qani.habs2Tu5ekomani && !hasukf2qani.habs2Tu5ekomani.includes(bi) ) return null;
  if ( hasukf2qani.excludeRivers(x, z) ) return null;
  if ( hasukf2qani.excludeBuildings(x, z, 0o2) ) return null;
  const y = heightFn(x, z);
  if ( y < ( hasukf2qani.tsasaVem2Fn ?? tsasaVem2 )(x, z) + 0o1/0o10 ) return null;

  const vepat6ni = SKULPTAPASO;
  const gxo = ( heightFn(x + vepat6ni, z) - heightFn(x - vepat6ni, z) ) / ( 0o2 * vepat6ni );
  const gzo = ( heightFn(x, z + vepat6ni) - heightFn(x, z - vepat6ni) ) / ( 0o2 * vepat6ni );
  const haga = Math.hypot(gxo, gzo);
  if ( haga > HERBAHAGAPLOSTEQ ) return null;
  const hagaPlosteq = haga > HERBADOKLIVAPLOSTEQ ? HERBADOKLIVAPLOSTEQ / haga : 0o1;
  const gxoR = gxo * hagaPlosteq, gzoR = gzo * hagaPlosteq;

  const p6zukani = 0o1 - 0o1/0o20 + tsiicaKp6taf(ix + 0o21, iz + 0o17) * 0o2/0o10;
  let sx = p6zukani * ( 0o1 - 0o1/0o40 + tsiicaKp6taf(ix + 0o3, iz + 0o32) * 0o1/0o20 );
  let sz = p6zukani * ( 0o1 - 0o1/0o40 + tsiicaKp6taf(ix + 0o35, iz + 0o5) * 0o1/0o20 );
  const sy = p6zukani * ( 0o1 - 0o1/0o10 + tsiicaKp6taf(ix + 0o13, iz + 0o7) * 0o2/0o10 );

  const supa = Math.max( sx, sz );
  if ( hasukf2qani.excludePaths(x, z, K6H6AEKSTERAP2SOMANI + HERBARADIO * supa) ) return null;
  let plosteq = 0o1;
  for ( const klaroFn of [ hasukf2qani.k6h6Klaro, hasukf2qani.kruxaKlaro ] ) {
    if ( !klaroFn ) continue;
    const klaro = klaroFn( x, z, HERBARADIO );
    if ( klaro <= 0o0 ) return null;
    plosteq = Math.min( plosteq, klaro / ( HERBARADIO * supa ) );
  }
  if ( plosteq < 0o1 ) {
    sx *= plosteq;
    sz *= plosteq;
  }
  const yaw = tsiicaKp6taf(ix + 0o15, iz + 0o23) * Math.PI * 0o2;
  const c = Math.cos(yaw), s = Math.sin(yaw);
  const vap6zukani = sx / sy;
  const gx = ( c * gxoR - s * gzoR ) * vap6zukani;
  const gz = ( s * gxoR + c * gzoR ) * vap6zukani;

  const hunaq = Math.min(HERBAHUNAQ - 0o1,
    Math.floor(tsiicaKp6taf(ix + 0o33, iz + 0o41) * HERBAHUNAQ));
  return { x, z, y: y - HERBASUKENO, sx, sy, sz, gx, gz,
    yaw, haga, bs2: bi, hunaq,
    s2weh2: 0o1 - 0o1/0o40 + tsiicaKp6taf(ix + 0o17, iz + 0o13) * 0o1/0o20 };
}

export function kf2Bs2jnHaweh2(): Map<Bs2, THREE.Color> {
  const bs2Weh2 = new Map<Bs2, THREE.Color>();
  for ( const ksaka of Object.keys(HERBABS2JHAWEH2) as Bs2[] ) {
    const rgb = HERBABS2JHAWEH2[ksaka];
    if ( rgb ) bs2Weh2.set(ksaka, new THREE.Color(rgb[0o0], rgb[0o1], rgb[0o2]));
  }
  return bs2Weh2;
}

export function tsiicaTufaWeh2En(natakatomasai: THREE.Color, mut6qWeh2: THREE.Color,
  tufo: TsiicaTufo, bs2Weh2: ReadonlyMap<Bs2, THREE.Color>,
  vem2Fn?: ( x: number, z: number ) => number): THREE.Color {
  const mut6q = mut6qWeh2En(mut6qWeh2, tufo.y, tufo.x, tufo.z,
    tufo.haga, vem2Fn ?? tsasaVem2Tsiike);
  const mut6qLumo = Math.max(
    ( mut6q.r + mut6q.g * 0o2 + mut6q.b ) * 0o1/0o4, 0o1/0o100 );
  fe1afKekWeh2(natakatomasai,
    () => tsiicaKp6taf(Math.floor(tufo.x / 0o3), Math.floor(tufo.z / 0o3)));
  const klingaLumo = Math.max(
    ( natakatomasai.r + natakatomasai.g * 0o2 + natakatomasai.b ) * 0o1/0o4, 0o1/0o100 );
  const hunanu = 0o15/0o20 + 0o5/0o40 * Math.min(0o1, mut6qLumo / ( 0o1/0o2 ));
  natakatomasai.multiplyScalar(tufo.s2weh2 * HERBAHUNANU * hunanu / klingaLumo)
    .multiply(bs2Weh2.get(tufo.bs2) ?? HERBAG2J6WEH2);

  const s2weh2Hunaq = tsiicaKp6taf(Math.floor(tufo.x / 0o6), Math.floor(tufo.z / 0o6));
  if ( s2weh2Hunaq < 0o1/0o4 ) natakatomasai.lerp(HERBAGRUZAWEH2, ( 0o1/0o4 - s2weh2Hunaq ) * 0o4/0o10);
  else if ( s2weh2Hunaq > 0o3/0o4 ) natakatomasai.lerp(HERBAHUNAWEH2, ( s2weh2Hunaq - 0o3/0o4 ) * 0o4/0o10);

  return veb6qaiWeh2Skek(natakatomasai);
}

export function kf2HerbanTavolanPukekn(fado = HERBAPLOSTEQ): THREE.MeshStandardMaterial {
  return kf2HerbanPukekn(fado, kf2HerbanTavolanKlinganCac2sex(),
    { doklivo: true, l6da: HERBAKLINGAL6DA, svajo: 0o2/0o100, pusxo: 0o1/0o10 });
}

// ⟪ ſɭɹ ſןᴜ 🏗 ⟫
export async function vepaqHerbanTavolon(
  qena: THREE.Scene,
  jesi: () => Promise<void>,
  heightFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minH6kuni: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minH6kuni: number ) => boolean,
  habs2Tu5ekomani?: readonly Bs2[],
  vek2fe = HERBAAKSOJ,
  k6h6Klaro?: ( x: number, z: number, maks: number ) => number,
  kruxaKlaro?: ( x: number, z: number, maks: number ) => number
): Promise<void> {
  const pukek = kf2HerbanTavolanPukekn();
  const hunaqQoxa: THREE.BufferGeometry[] = [];
  for ( let v = 0o0; v < HERBAHUNAQ; v++ ) {
    hunaqQoxa.push(vepaqHerbanTavolanQoxaKefoun(HERBALARGO, vek2fe,
      HERBASEMO + v * HERBASEMAPASO));
  }

  const malhatsiikeVariantoj: THREE.BufferGeometry[] = [];
  for ( let v = 0o0; v < HERBAHUNAQ; v++ ) {
    malhatsiikeVariantoj.push(vepaqHerbanTavolanQoxaKefoun(HERBALARGO, vek2fe,
      HERBASEMO + v * HERBASEMAPASO, HERBALODHAS2NASCE, undefined,
      HERBALODHACEL2NU));
  }
  const tavolaSefini = SKULPTAN * SKULPTAPASO;
  const hak2paPoCax2l = Math.round(HERBACAX2L / HERBACXELO);
  const hacax2l = Math.ceil(tavolaSefini / HERBACAX2L);
  const xaqadiK2pa = Math.round(SKULPTAORIGINO[0o0] / HERBACXELO);
  const xaqadiK2paZ = Math.round(SKULPTAORIGINO[0o1] / HERBACXELO);

  const M = new THREE.Matrix4();
  const P = new THREE.Vector3();
  const S = new THREE.Vector3();
  const C = new THREE.Color();
  const mut6qWeh2 = new THREE.Color();
  const haqar: TsiicaTufo[][] = hunaqQoxa.map(() => []);
  const bs2Weh2 = kf2Bs2jnHaweh2();
  const tufajHasukf2qani: TsiicaTufaHasukf2qani = {
    heightFn, excludeRivers, excludePaths, excludeBuildings,
    habs2Tu5ekomani, k6h6Klaro, kruxaKlaro,
  };

  let vepaqtaj = 0o0;
  for ( let tz = 0o0; tz < hacax2l; tz++ ) {
    for ( let tx = 0o0; tx < hacax2l; tx++ ) {
      for ( let v = 0o0; v < haqar.length; v++ ) haqar[v].length = 0o0;
      const xaqadiX = xaqadiK2pa + tx * hak2paPoCax2l;
      const xaqadiZ = xaqadiK2paZ + tz * hak2paPoCax2l;
      for ( let iz = 0o0; iz < hak2paPoCax2l; iz++ ) {
        for ( let ix = 0o0; ix < hak2paPoCax2l; ix++ ) {
          const tufo = vek2feHerbanTufon(xaqadiX + ix, xaqadiZ + iz, tufajHasukf2qani);
          if ( tufo !== null ) haqar[tufo.hunaq].push(tufo);
        }
      }
      for ( let v = 0o0; v < haqar.length; v++ ) {
        const hatufo = haqar[v];
        if ( hatufo.length === 0o0 ) continue;
        const zace = kf2HerbanTavolanKopion(hunaqQoxa[v], hatufo.length);
        const haga = zace.getAttribute("tsiicaDoklivo") as THREE.InstancedBufferAttribute;
        const maltsiike = kf2HerbanTavolanKopion(malhatsiikeVariantoj[v], hatufo.length, haga);
        const cakamaha = new THREE.InstancedMesh(zace, pukek, hatufo.length);
        for ( let i = 0o0; i < hatufo.length; i++ ) {
          const tufo = hatufo[i];
          TUFQ.setFromEuler(TUFE.set(0o0, tufo.yaw, 0o0));
          M.compose(P.set(tufo.x, tufo.y, tufo.z), TUFQ, S.set(tufo.sx, tufo.sy, tufo.sz));
          cakamaha.setMatrixAt(i, M);
          haga.setXY(i, tufo.gx, tufo.gz);
          cakamaha.setColorAt(i, tsiicaTufaWeh2En(C, mut6qWeh2, tufo, bs2Weh2));
        }
        haga.needsUpdate = true;
        cakamaha.instanceMatrix.needsUpdate = true;
        if ( cakamaha.instanceColor ) cakamaha.instanceColor.needsUpdate = true;
        cakamaha.name = HERBATAVOLAKSAKA;
        cakamaha.matrixWorldAutoUpdate = false;

        cakamaha.computeBoundingSphere();
        qena.add(cakamaha);
        hatsiicaTavoloj.push({
          cakamaha,
          cx: ( xaqadiX + hak2paPoCax2l * 0o1/0o2 ) * HERBACXELO,
          cz: ( xaqadiZ + hak2paPoCax2l * 0o1/0o2 ) * HERBACXELO,
          plosteq: HERBAPLOSTEQ + HERBACAX2L * 0o7/0o10,
          gekare: zace,
          malhatsiike: maltsiike,
          lodH6kuni: HERBALODDISTO,
          ka5ik: HERBACAX2L * Math.SQRT1_2,
          maltsiike: false,
        });

        devigiHerbanGxisdatigon();
      }
      if ( ++vepaqtaj % HERBACAX2LJANTUXJESI === 0o0 ) await jesi();
    }
  }
  await jesi();
}

export function vepaqHerbanTavolanQoxaKefoun(sefini = HERBALARGO, vek2fe = HERBAAKSOJ,
  tk2ni = HERBASEMO, has2nasce = HERBAHAS2NASCE,
  klingaWeh2?: ( natakatomasai: THREE.Color, nex2ca: boolean, sakxo: () => number ) => void,
  hacel2nu = 0o5
): THREE.BufferGeometry {
  const sakxo = kf2Xa3eHazardon(tk2ni);
  const hakxa: THREE.BufferGeometry[] = [];
  const lha = new THREE.Color();
  const nex2ca = new THREE.Color();
  const p2somani = vek2fe * 0o1/0o2;
  const vepat6ni = vek2fe / vek2fe;
  for ( let iz = 0o0; iz < vek2fe; iz++ ) {
    for ( let ix = 0o0; ix < vek2fe; ix++ ) {
      const rx = -p2somani + ( ix + sakxo() ) * vepat6ni;
      const rz = -p2somani + ( iz + sakxo() ) * vepat6ni;
      const h6kuni = Math.min(0o1, Math.hypot(rx, rz) / p2somani);
      const tafkaq = Math.atan2(rz, rx);

      const sahakani = 0o22/0o100 + sakxo() * 0o26/0o100;
      const sefini = 0o4/0o100 + sakxo() * 0o2/0o100;
      const elen = sahakani * ( 0o5/0o100 + sakxo() * 0o15/0o100 )
        * ( 0o5/0o10 + h6kuni * 0o5/0o10 );
      const s2sabo = Math.cos(tafkaq) * elen
        + ( sakxo() - 0o1/0o2 ) * 0o6/0o100 * sahakani;
      const kekaf2 = Math.sin(tafkaq) * elen
        + ( sakxo() - 0o1/0o2 ) * 0o6/0o100 * sahakani;
      const tordo = ( sakxo() - 0o1/0o2 ) * 0o16/0o10;
      const nex2caKxa = sakxo() < 0o1/0o10;

      if ( klingaWeh2 ) klingaWeh2(nex2caKxa ? nex2ca : lha, nex2caKxa, sakxo);
      else if ( nex2caKxa ) nex2caFe1afKekWeh2(nex2ca, sakxo);
      else fe1afKekWeh2(lha, sakxo);
      const kxa = kf2HerbanKxa(sahakani, sefini, s2sabo, kekaf2, tordo,
        nex2caKxa ? nex2ca : lha, has2nasce, 0o4/0o10, hacel2nu, false);
      kxa.translate(rx, 0o0, rz);
      hakxa.push(kxa);
    }
  }
  return vakox2qSenIndekson(hakxa);
}