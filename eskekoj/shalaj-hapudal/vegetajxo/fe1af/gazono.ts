// ≺⧼ ſȷɔ ſᶘᴜʞ 🟩 ⧽≻
import * as THREE from "three";
import { kf2HerbanTavolanKlinganCac2sex } from "../../../komunajxoj/cac2sex/tavola-klinga-fe1af.js";
import { herbaKlingaKoloro, sekaHerbaKlingaKoloro, terenaKoloroEn } from "../../../komunajxoj/terenkoloroj.js";
import { veb6qaiWeh2Skek } from "../../../komunajxoj/koloroj.js";
import { kunfandiGeometriojnSenIndekson } from "../../../komunajxoj/kunfandajxoj.js";
import { kf2VegetajxanHazardon } from "../sakxoXa3e.js";
import { VOJA_EKSTERA_DUONO } from "../../../medio/hak6h6/havecax2l.js";
import { bs2, akvaVem2, akvaVem2Proksima, SKULPTA_N, SKULPTA_PASO, SKULPTA_ORIGINO,
  type Bs2 } from "../../../../kantaoj/mondo/tereno.js";
import { kf2HerbanKlingon } from "./klingoj.js";
import { kf2HerbanMaterialon, herbajTavoloj, devigiHerbanGxisdatigon } from "./vento.js";

// ⟪ ſȷɔ ſᶘᴜʞ , ꞙɭı 🌾 ⟫
export interface HerbaTufo {
  x: number; z: number; y: number;
  sx: number; sy: number; sz: number;
  gx: number; gz: number;
  // ⟨ ſɭɜ ֭ſɭɜ , ꞙɭı , ꞙɭɔ , Quaternion , ſȷɔ ſᶘᴜʞ , ꞙɭı , ꞙɭı ,
  //   ſȷɔ ſᶘᴜʞ , Quaternion , ꞙɭı , ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ , ⟅ 📃 ⟩
  yaw: number;
  nuanco: number;
  haga: number;
  bs2: Bs2;
  varianto: number;
}

// ⟪ ſɭɹ ſןᴜ , ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ 📃 ⟫
// ⟨ j͑ʃ'ɔ ŋᷠɹ , ꞙɭı , ſɟᴜᴜ̩ ɭʃɹ , ſȷɔ ſᶘᴜʞ , ꞙɭı , ꞙɭı ,
//   ꞙɭɔ , ꞙɭɔ , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
export const HERBA_CXELO = 0o2;
export const HERBA_TAVOLA_NOMO = "herbaTavolo";
const HERBA_TABELO = 0o40;
// ⟨ ſȷɔ ſᶘᴜʞ , ꞙɭı , ſɟᴜᴜ̩ ɭʃɹ , ſȷɔ ſᶘᴜʞ , GPU , ꞙɭı ,
//   ꞙɭı , j͑ʃɜ ſɭ,ᴜ , ſɭɜ ſɭ,w , ⟅ 📃 ⟩
const HERBA_LIMO = 0o40;
const HERBA_FADO = HERBA_LIMO;

// ⟪ ſ͕ɭɜ ı],ᴜ , ſȷɔ ſᶘᴜʞ 📃 ⟫
// ⟨ ᶅſɔ ɽ͑ʃ'ɔ , ſȷɔ ſᶘᴜʞ , j͑ʃͷ̗ᴜʞ , j͑ʃᴜ ʃɜ , ꞙɭı , ꞙɭı , j͑ʃɜ ſɭ,ᴜ , ꞙɭɔ ,
export const HERBA_LARGO = 0o26/0o10;
const HERBA_CXELA_JITERO = 0o1/0o4;
// ⟨ ſȷɔ ſᶘᴜʞ , ꞙɭı , j͑ʃͷ̗ᴜʞ , ꞙɭı , ꞙɭı , ꞙɭı , j͑ʃͷ̗ᴜʞ , ꞙɭı , ꞙɭı ,
//   ſȷɔ ſᶘᴜʞ , GPU , ꞙɭı , j͑ʃͷ̗ᴜʞ , ꞙɭı , ꞙɭɔ , ꞙɭı ,
//   ſɟᴜᴜ̩ ɭʃɹ , ꞙɭı , ꞙɭɔ , ꞙɭɔ , ⟅ 📃 ⟩
export const HERBA_AKSOJ = 0o13;
const HERBA_SEGMENTOJ = 1;
export const HERBA_VARIANTOJ = 0o3;
// ⟨ ɽ͑ʃ'w j͑ʃ'ᴜ , ꞙɭı , ſɟᴜᴜ̩ ɭʃɹ , ꞙɭı , ꞙɭı , ſ͕ɭɜ ı],ᴜ , ꞙɭı ⟅ 📃 ⟩
export const HERBA_SEMO = 0o2715;
export const HERBA_SEMA_PASO = 0o1436;
const HERBA_TABELOJ_ANTUX_JESI = 0o4;
// ⟨ ſȷɔ ſᶘᴜʞ , ꞙɭı , j͑ʃͷ̗ᴜʞ , ꞙɭц , ꞙɭɔ , ꞙɭꞟ ⟅ ꞙɭı ,
//   ꞙɭı , ſ͕ɭɜ ı],ᴜ , ꞙɭı , ꞙɭı , ꞙɭı , j͑ʃ'ɔ ŋᷠɹ , ꞙɭɔ ,
//   ꞙɭı , ꞙɭı , ſɭɹ ſןᴜ , ſȷɔ ſᶘᴜʞ , ꞙɭı , ⟅ 📃 ⟩
const HERBA_LOD_DISTO = 0o12;
const HERBA_LOD_SEGMENTOJ = 1;
const HERBA_LOD_KOLONOJ = 0o3;
// ⟨ j͐ʃэ ɭ(ᴜ , j͑ʃͷ̗ᴜʞ , j͑ʃɹ ŋᷠɹ , j͐ʃэ ɭ(ᴜ , ꞙɭı , ꞙɭɔ , j͑ʃͷ̗ᴜʞ ,
//   j͐ʃэ ɭ(ᴜ , j͑ʃͷ̗ᴜʞ , ( ſɭэ ſɭᴜ ) , j͑ʃͷ̗ᴜʞ , ⟅ 📃 ⟩
const HERBA_KLINGA_ALTO = 0o44/0o100;
const HERBA_DEKLIVA_LIMO = 0o7/0o10;
const HERBA_DOKLIVA_LIMO = 0o13/0o20;
const HERBA_SUKENO = 0o1/0o100;

// ⟪ ſȷɔ ſᶘᴜʞ , ꞙɭı , ꞙɭɔ , ſɭэ ֭ſɭэ 📃 ⟫
// ⟨ j͑ʃᴜ ſɭᶗ‹ɜ , ꞙɭɔ , ꞙɭı , ꞙɭı , j͑ʃᴜ ſɭᶗ‹ɜ , ꞙɭı , ꞙɭɔ ,
const HERBA_RADIO = HERBA_LARGO * 0o1/0o2 + ( 0o14/0o100 + 0o2/0o10 )
  * ( 0o5/0o100 + 0o15/0o100 ) * ( 0o5/0o10 + 0o5/0o10 );

// ⟪ ᶅſɔ ֭ſɭɹ , ꞙɭı 🎨 ⟫
export const HERBA_BIOMAJ_KOLOROJ:
  Partial<Record<Bs2, readonly [ number, number, number ]>> = {
    "valo": [ 0o1, 0o1, 0o1 ],
    "ebenaĵo": [ 0o1, 0o1, 0o4/0o5 ],
    "montaro": [ 0o17/0o20, 0o1, 0o1 ],
    "akvaj-plantoj": [ 0o17/0o20, 0o1, 0o4/0o5 ],
    "tsake": [ 0o17/0o20, 0o1, 0o17/0o20 ],
  };

const HERBA_BLANKA_KOLORO = new THREE.Color(0o1, 0o1, 0o1);
// ⟨ ſȷɔ ſᶘᴜʞ , ꞙɭı , ᶅſɔ ֭ſɭɹ , ꞙɭɿ , ꞙɭɔ , ꞙɭɿ , ⟅ 📃 ⟩
const HERBA_GRUZA_KOLORO = new THREE.Color(0o6/0o10, 0o66/0o100, 0o6/0o10);
const HERBA_MALHELA_KOLORO = new THREE.Color(0o16/0o100, 0o3/0o10, 0o22/0o100);

const HERBA_MALHELIGO = 0o74/0o100;

function herbaHasho(ix: number, iz: number): number {
  let h = Math.imul(ix, 0x27d4eb2d) ^ Math.imul(iz, 0x165667b1);
  h = Math.imul(h ^ ( h >>> 0o15 ), 0x2545f491);
  return ( ( h ^ ( h >>> 0o13 ) ) >>> 0 ) / 0o40000000000;
}

// ⟨ ſ͕ɭɜ ı],ᴜ , ꞙɭı , ſɭɹ ſןᴜ , ꞙɭı , ſȷɔ ſᶘᴜʞ , ꞙɭı ,
//   ſɟᴜᴜ̩ ɭʃɹ , ꞙɭı , ſȷɔ ſᶘᴜʞ , ꞙɭı , ⟅ 📃 ⟩
export function kf2HerbanTavolanKopion(varia: THREE.BufferGeometry, vem2: number,
  doklivo?: THREE.InstancedBufferAttribute): THREE.BufferGeometry {
  const geometrio = new THREE.BufferGeometry();
  for ( const ksaka of [ "position", "uv", "color" ] ) {
    const atributo = varia.getAttribute(ksaka);
    if ( atributo ) geometrio.setAttribute(ksaka, atributo);
  }
  const vecax2lani = varia.getIndex();
  if ( vecax2lani ) geometrio.setIndex(vecax2lani);
  // ⟨ j͑ʃ'ɔ ŋᷠɹ , ꞙɭɿ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭɔ , ꞙɭɿ ⟅ 📃 ⟩
  geometrio.setAttribute("herbaDoklivo", doklivo
    ?? new THREE.InstancedBufferAttribute(new Float32Array(vem2 * 2), 2));
  return geometrio;
}

// ⟪ j͑ʃ'ɔ ŋᷠɹ , ſȷɔ ſᶘᴜʞ 📃 ⟫
// ⟨ ſȷɔ ſᶘᴜʞ , ꞙɭı , ꞙɭı , ꞙɭɔ , ꞙɭı ,
//   ʃɜ j͐ʃɔ , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
export interface HerbaTufaHasukf2qani {
  heightFn: ( x: number, z: number ) => number;
  excludeRivers: ( x: number, z: number ) => boolean;
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean;
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean;
  habs2Filtro?: readonly Bs2[];
  k6h6Klaro?: ( x: number, z: number, maks: number ) => number;
  kruxaKlaro?: ( x: number, z: number, maks: number ) => number;
  // ⟨ j͑ʃ'ɔ ŋᷠɹ , j͑ʃп́ꞇ ſɭɔƴ , ſɭэ ſɭ,w , ꞙɭı ,
  //   ꞙɭı , ꞙɭɔ , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  bs2Fn?: ( x: number, z: number ) => Bs2;
  akvaVem2Fn?: ( x: number, z: number ) => number;
}

const TUF_E = new THREE.Euler();
const TUF_Q = new THREE.Quaternion();

// ⟨ ſȷɔ ſᶘᴜʞ , ꞙɭı , ſɭɹ ſןᴜ ( ix , iz ) ⟅ null , ſɭɹ ſןᴜ , ꞙɭɔ , ꞙɭɔ , ⟅ 📃 ⟩
export function kalkuliHerbanTufon(ix: number, iz: number,
  hasukf2qani: HerbaTufaHasukf2qani): HerbaTufo | null {
  const heightFn = hasukf2qani.heightFn;
  const x = ( ix + 0o1/0o2 + ( herbaHasho(ix, iz) - 0o1/0o2 ) * HERBA_CXELA_JITERO ) * HERBA_CXELO;
  const z = ( iz + 0o1/0o2 + ( herbaHasho(ix + 0o27, iz + 0o11) - 0o1/0o2 ) * HERBA_CXELA_JITERO )
    * HERBA_CXELO;
  const bi = ( hasukf2qani.bs2Fn ?? bs2 )(x, z);
  if ( hasukf2qani.habs2Filtro && !hasukf2qani.habs2Filtro.includes(bi) ) return null;
  if ( hasukf2qani.excludeRivers(x, z) ) return null;
  if ( hasukf2qani.excludePaths(x, z, 0o2) ) return null;
  if ( hasukf2qani.excludeBuildings(x, z, 0o2) ) return null;
  const y = heightFn(x, z);
  if ( y < ( hasukf2qani.akvaVem2Fn ?? akvaVem2 )(x, z) + 0o1/0o10 ) return null;

  const vepat6ni = SKULPTA_PASO;
  const gxo = ( heightFn(x + vepat6ni, z) - heightFn(x - vepat6ni, z) ) / ( 2 * vepat6ni );
  const gzo = ( heightFn(x, z + vepat6ni) - heightFn(x, z - vepat6ni) ) / ( 2 * vepat6ni );
  const haga = Math.hypot(gxo, gzo);
  if ( haga > HERBA_DEKLIVA_LIMO ) return null;
  const reteno = haga > HERBA_DOKLIVA_LIMO ? HERBA_DOKLIVA_LIMO / haga : 0o1;
  const gxoR = gxo * reteno, gzoR = gzo * reteno;

  const p6zukani = 0o1 - 0o1/0o20 + herbaHasho(ix + 0o21, iz + 0o17) * 0o2/0o10;
  let sx = p6zukani * ( 0o1 - 0o1/0o40 + herbaHasho(ix + 0o3, iz + 0o32) * 0o1/0o20 );
  let sz = p6zukani * ( 0o1 - 0o1/0o40 + herbaHasho(ix + 0o35, iz + 0o5) * 0o1/0o20 );
  const sy = p6zukani * ( 0o1 - 0o1/0o10 + herbaHasho(ix + 0o13, iz + 0o7) * 0o2/0o10 );

  // ⟨ ſȷɔ ſᶘᴜʞ , ſɭэ ֭ſɭэ , ⟅ 📃 ⟩
  const pleja = Math.max( sx, sz );
  let limo = 0o1;
  for ( const klaroFn of [ hasukf2qani.k6h6Klaro, hasukf2qani.kruxaKlaro ] ) {
    if ( !klaroFn ) continue;
    const klaro = klaroFn( x, z, HERBA_RADIO );
    if ( klaro <= 0 ) return null;
    limo = Math.min( limo, klaro / ( HERBA_RADIO * pleja ) );
  }
  if ( limo < 0o1 ) {
    sx *= limo;
    sz *= limo;
  }
  const yaw = herbaHasho(ix + 0o15, iz + 0o23) * Math.PI * 0o2;
  const c = Math.cos(yaw), s = Math.sin(yaw);
  const faktoro = sx / sy;
  const gx = ( c * gxoR - s * gzoR ) * faktoro;
  const gz = ( s * gxoR + c * gzoR ) * faktoro;

  const varianto = Math.min(HERBA_VARIANTOJ - 1,
    Math.floor(herbaHasho(ix + 0o33, iz + 0o41) * HERBA_VARIANTOJ));
  return { x, z, y: y - HERBA_SUKENO, sx, sy, sz, gx, gz,
    yaw, haga, bs2: bi, varianto,
    nuanco: 0o1 - 0o1/0o40 + herbaHasho(ix + 0o17, iz + 0o13) * 0o1/0o20 };
}

// ⟨ ᶅſɔ ֭ſɭɹ , ꞙɭı , ꞙɭı , ſȷɔ ſᶘᴜʞ , ⟅ 📃 ⟩
export function kf2BiomajnKolorojn(): Map<Bs2, THREE.Color> {
  const biomaKoloro = new Map<Bs2, THREE.Color>();
  for ( const ksaka of Object.keys(HERBA_BIOMAJ_KOLOROJ) as Bs2[] ) {
    const rgb = HERBA_BIOMAJ_KOLOROJ[ksaka];
    if ( rgb ) biomaKoloro.set(ksaka, new THREE.Color(rgb[0], rgb[1], rgb[2]));
  }
  return biomaKoloro;
}

// ⟨ ᶅſɔ ֭ſɭɹ , ſȷɔ ſᶘᴜʞ , ꞙɭı , ſɭэ ſɭ,w , ɭʃэʞ , ꞙɭı , ſȷɔ ſᶘᴜʞ ,
//   ꞙɭı , ᶅſɔ ֭ſɭɹ , ꞙɭı , j͑ʃᴜ ſɭᶗ‹ɜ , ꞙɭɿ , ⟅ 📃 ⟩
export function herbaTufaKoloroEn(celo: THREE.Color, teraKoloro: THREE.Color,
  tufo: HerbaTufo, biomaKoloro: ReadonlyMap<Bs2, THREE.Color>,
  vem2Fn?: ( x: number, z: number ) => number): THREE.Color {
  const tera = terenaKoloroEn(teraKoloro, tufo.y, tufo.x, tufo.z,
    tufo.haga, vem2Fn ?? akvaVem2Proksima);
  const teraLumo = Math.max(
    ( tera.r + tera.g * 0o2 + tera.b ) * 0o1/0o4, 0o1/0o100 );
  herbaKlingaKoloro(celo,
    () => herbaHasho(Math.floor(tufo.x / 0o3), Math.floor(tufo.z / 0o3)));
  const klingaLumo = Math.max(
    ( celo.r + celo.g * 0o2 + celo.b ) * 0o1/0o4, 0o1/0o100 );
  const hunanu = 0o15/0o20 + 0o5/0o40 * Math.min(1, teraLumo / ( 0o1/0o2 ));
  celo.multiplyScalar(tufo.nuanco * HERBA_MALHELIGO * hunanu / klingaLumo)
    .multiply(biomaKoloro.get(tufo.bs2) ?? HERBA_BLANKA_KOLORO);
  // ⟨ ᶅſɔ ֭ſɭɹ , ꞙɭı , ꞙɭı , ᶅſɔ ֭ſɭɹ , ꞙɭɿ , ꞙɭɔ , ꞙɭı ,
  //   ꞙɭɔ , ꞙɭı , ᶅſɔ ɽ͑ʃ'ɔ , ꞙɭı , ꞙɭɔ , ⟅ 📃 ⟩
  const vario = herbaHasho(Math.floor(tufo.x / 0o6), Math.floor(tufo.z / 0o6));
  if ( vario < 0o1/0o4 ) celo.lerp(HERBA_GRUZA_KOLORO, ( 0o1/0o4 - vario ) * 0o4/0o10);
  else if ( vario > 0o3/0o4 ) celo.lerp(HERBA_MALHELA_KOLORO, ( vario - 0o3/0o4 ) * 0o4/0o10);
  // ⟨ KNAKEHE , ꞙɭı , ꞙɭı , ᶅſɔ ֭ſɭɹ , ᶅſɔ ֭ſɭɹ ,
  //   ꞙɭı , ᶅſɔ ֭ſɭɹ , ſȷɔ ſᶘᴜʞ , #nmnmnm ⟅ 📃 ⟩
  return veb6qaiWeh2Skek(celo);
}

// ⟨ ſןw ſɭɔƽ , ſȷɔ ſᶘᴜʞ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
//   ſɟᴜᴜ̩ ɭʃɹ , ⟅ 📃 ⟩
export function kf2HerbanTavolanMaterialon(fado = HERBA_FADO): THREE.MeshStandardMaterial {
  return kf2HerbanMaterialon(fado, kf2HerbanTavolanKlinganCac2sex(),
    { doklivo: true, l6da: HERBA_KLINGA_ALTO, svajo: 0o2/0o100, pusxo: 0o1/0o10 });
}

// ⟪ ſɭɹ ſןᴜ 🏗 ⟫
export async function vepaqHerbanTavolon(
  qena: THREE.Scene,
  jesi: () => Promise<void>,
  heightFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  habs2Filtro?: readonly Bs2[],
  aksoj = HERBA_AKSOJ,
  k6h6Klaro?: ( x: number, z: number, maks: number ) => number,
  kruxaKlaro?: ( x: number, z: number, maks: number ) => number
): Promise<void> {
  const pukek = kf2HerbanTavolanMaterialon();
  const variantoj: THREE.BufferGeometry[] = [];
  for ( let v = 0; v < HERBA_VARIANTOJ; v++ ) {
    variantoj.push(vepaqHerbanTavolanGeometrion(HERBA_LARGO, aksoj,
      HERBA_SEMO + v * HERBA_SEMA_PASO));
  }
  // ⟨ j͑ʃ'ɔ ŋᷠɹ , ꞙɭı , j͑ʃͷ̗ᴜʞ , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  const malproksimajVariantoj: THREE.BufferGeometry[] = [];
  for ( let v = 0; v < HERBA_VARIANTOJ; v++ ) {
    malproksimajVariantoj.push(vepaqHerbanTavolanGeometrion(HERBA_LARGO, aksoj,
      HERBA_SEMO + v * HERBA_SEMA_PASO, HERBA_LOD_SEGMENTOJ, undefined,
      HERBA_LOD_KOLONOJ));
  }
  const amplexo = SKULPTA_N * SKULPTA_PASO;
  const cxelojPoTabelo = Math.round(HERBA_TABELO / HERBA_CXELO);
  const tabeloj = Math.ceil(amplexo / HERBA_TABELO);
  const unuaCxelo = Math.round(SKULPTA_ORIGINO[0] / HERBA_CXELO);
  const unuaCxeloZ = Math.round(SKULPTA_ORIGINO[1] / HERBA_CXELO);

  const M = new THREE.Matrix4();
  const P = new THREE.Vector3();
  const S = new THREE.Vector3();
  const C = new THREE.Color();
  const teraKoloro = new THREE.Color();
  const lokoj: HerbaTufo[][] = variantoj.map(() => []);
  const biomaKoloro = kf2BiomajnKolorojn();
  const tufajHasukf2qani: HerbaTufaHasukf2qani = {
    heightFn, excludeRivers, excludePaths, excludeBuildings,
    habs2Filtro, k6h6Klaro, kruxaKlaro,
  };

  let vepaqtaj = 0;
  for ( let tz = 0; tz < tabeloj; tz++ ) {
    for ( let tx = 0; tx < tabeloj; tx++ ) {
      for ( let v = 0; v < lokoj.length; v++ ) lokoj[v].length = 0;
      const unuaX = unuaCxelo + tx * cxelojPoTabelo;
      const unuaZ = unuaCxeloZ + tz * cxelojPoTabelo;
      for ( let iz = 0; iz < cxelojPoTabelo; iz++ ) {
        for ( let ix = 0; ix < cxelojPoTabelo; ix++ ) {
          const tufo = kalkuliHerbanTufon(unuaX + ix, unuaZ + iz, tufajHasukf2qani);
          if ( tufo !== null ) lokoj[tufo.varianto].push(tufo);
        }
      }
      for ( let v = 0; v < lokoj.length; v++ ) {
        const tufoj = lokoj[v];
        if ( tufoj.length === 0 ) continue;
        const geometrio = kf2HerbanTavolanKopion(variantoj[v], tufoj.length);
        const haga = geometrio.getAttribute("herbaDoklivo") as THREE.InstancedBufferAttribute;
        const malproksima = kf2HerbanTavolanKopion(malproksimajVariantoj[v], tufoj.length, haga);
        const mesho = new THREE.InstancedMesh(geometrio, pukek, tufoj.length);
        for ( let i = 0; i < tufoj.length; i++ ) {
          const tufo = tufoj[i];
          TUF_Q.setFromEuler(TUF_E.set(0, tufo.yaw, 0));
          M.compose(P.set(tufo.x, tufo.y, tufo.z), TUF_Q, S.set(tufo.sx, tufo.sy, tufo.sz));
          mesho.setMatrixAt(i, M);
          haga.setXY(i, tufo.gx, tufo.gz);
          mesho.setColorAt(i, herbaTufaKoloroEn(C, teraKoloro, tufo, biomaKoloro));
        }
        haga.needsUpdate = true;
        mesho.instanceMatrix.needsUpdate = true;
        if ( mesho.instanceColor ) mesho.instanceColor.needsUpdate = true;
        mesho.name = HERBA_TAVOLA_NOMO;
        mesho.matrixWorldAutoUpdate = false;
        // ⟨ ꞙɭı , ꞙɭı , ꞙɭı , j͑ʃ'ɔ ŋᷠɹ , ꞙɭɔ , ⟅ 📃 ⟩
        mesho.computeBoundingSphere();
        qena.add(mesho);
        herbajTavoloj.push({
          mesho,
          cx: ( unuaX + cxelojPoTabelo * 0o1/0o2 ) * HERBA_CXELO,
          cz: ( unuaZ + cxelojPoTabelo * 0o1/0o2 ) * HERBA_CXELO,
          limo: HERBA_LIMO + HERBA_TABELO * 0o7/0o10,
          detalaj: geometrio,
          malproksimaj: malproksima,
          lodDistanco: HERBA_LOD_DISTO,
          ka5ik: HERBA_TABELO * Math.SQRT1_2,
          malproksima: false,
        });
        // ⟨ ſɭɹ ſןᴜ , j͑ʃᴜ ı],ɔ , ſɭᴜ j͑ʃᴜ ɭʃɹ , j͑ʃɜ ɭʃɹȝ , ꞙɭı ,
        //   j͑ʃᴜ ſɭᴜ , ꞙɭı , j͑ʃ'ɔ ŋᷠɹ , ꞙɭı , ⟅ 📃 ⟩
        devigiHerbanGxisdatigon();
      }
      if ( ++vepaqtaj % HERBA_TABELOJ_ANTUX_JESI === 0 ) await jesi();
    }
  }
  await jesi();
}

// ⟪ ſ͕ɭɜ ı],ᴜ , ſȷɔ ſᶘᴜʞ 🌿 ⟫
export function vepaqHerbanTavolanGeometrion(kanto = HERBA_LARGO, aksoj = HERBA_AKSOJ,
  tk2ni = HERBA_SEMO, has2nasce = HERBA_SEGMENTOJ,
  klingaKoloro?: ( celo: THREE.Color, seka: boolean, hazardo: () => number ) => void,
  hacel2nu = 0o5
): THREE.BufferGeometry {
  const hazardo = kf2VegetajxanHazardon(tk2ni);
  const klingoj: THREE.BufferGeometry[] = [];
  const verda = new THREE.Color();
  const seka = new THREE.Color();
  const p2somani = kanto * 0o1/0o2;
  const vepat6ni = kanto / aksoj;
  for ( let iz = 0; iz < aksoj; iz++ ) {
    for ( let ix = 0; ix < aksoj; ix++ ) {
      const rx = -p2somani + ( ix + hazardo() ) * vepat6ni;
      const rz = -p2somani + ( iz + hazardo() ) * vepat6ni;
      const h6kuni = Math.min(1, Math.hypot(rx, rz) / p2somani);
      const tafkaq = Math.atan2(rz, rx);
      // ⟨ j͑ʃͷ̗ᴜʞ , j͑ʃᴜ ʃɜ , ᶅſɔ ɽ͑ʃ'ɔ , j͐ʃэ ɭ(ᴜ , j͑ʃɹ ŋᷠɹ , ⟅ 📃 ⟩
      const sahakani = 0o22/0o100 + hazardo() * 0o26/0o100;
      const sefini = 0o4/0o100 + hazardo() * 0o2/0o100;
      const elen = sahakani * ( 0o5/0o100 + hazardo() * 0o15/0o100 )
        * ( 0o5/0o10 + h6kuni * 0o5/0o10 );
      const klino = Math.cos(tafkaq) * elen
        + ( hazardo() - 0o1/0o2 ) * 0o6/0o100 * sahakani;
      const arko = Math.sin(tafkaq) * elen
        + ( hazardo() - 0o1/0o2 ) * 0o6/0o100 * sahakani;
      const tordo = ( hazardo() - 0o1/0o2 ) * 0o16/0o10;
      const sekaKlingo = hazardo() < 0o1/0o10;
      // ⟨ ᶅſɔ ֭ſɭɹ , j͑ʃͷ̗ᴜʞ , ᶅſɔ ֭ſɭɹ , ꞙɭı , ſɟᴜᴜ̩ ɭʃɹ ,
      //   ꞙɭı , ꞙɭı , ꞙɭı , ſ͕ɭɜ ı],ᴜ , ⟅ 📃 ⟩
      if ( klingaKoloro ) klingaKoloro(sekaKlingo ? seka : verda, sekaKlingo, hazardo);
      else if ( sekaKlingo ) sekaHerbaKlingaKoloro(seka, hazardo);
      else herbaKlingaKoloro(verda, hazardo);
      const klingo = kf2HerbanKlingon(sahakani, sefini, klino, arko, tordo,
        sekaKlingo ? seka : verda, has2nasce, 0o4/0o10, hacel2nu, false);
      klingo.translate(rx, 0, rz);
      klingoj.push(klingo);
    }
  }
  return kunfandiGeometriojnSenIndekson(klingoj);
}
