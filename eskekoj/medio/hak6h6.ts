// ≺⧼ ſɭэ ֭ſɭэ 🛣️ ⧽≻
import * as THREE from "three";
import { kf2GeometriajnHabakaweKatoman, kf2K6h6jnBendojn, kf2Hak6h6nMaterialojn } from "./hak6h6/habakaweKatoma.js";
import { aldoniC2qjnPecojn, DUONA_RONDO, type C2qPeco } from "./hak6h6/hac2q.js";
import { kf2NivelanProfilon, kf2UnuformajnTreadojn,
  type K6h6Truo } from "./hak6h6/havem2.js";
import { VOJA_BORDA_SEFINI, VOJA_DIKECO,
  VOJA_TRUA_DUONO, VOJA_SUPRO_LEVIGXO, STUPA_RISERO, surGrid } from "./hak6h6/havecax2l.js";
import { kf2Brakojn, kunigaPlataAlto, kunigaPlataVem2 } from "./hak6h6/hapa12.js";
import { kunigajBrakAltoj } from "./hak6h6/haqoxa.js";
import { qakaj2AltoEl, elektiPlatanAlton, konsumiDokajnAltojn, kunigaKlavo,
  kunigajHavem2, purigiKunigajnHavem2n, type BrakaAlto } from "./hak6h6/kunig-havem2.js";
import { vepaqGlatanS2nascen, vepaqS2nascenEnHabakaweKatoman,
  vepaqUnuformajnStuparajnHas2nascen, kf2EksteranDuonon,
  kf2SegmentajnPartojn } from "./hak6h6/has2nasce.js";
import { vojSuprajxoj, type VojDifino, type VojHasukf2qani } from "./hak6h6/hahunaq.js";

// ⟪ ſɭэ ֭ſɭэ , ꞙɭı 📏 ⟫
// ⟨ ſɭэ ſɭᴜ , ꞙɭı 📃 ⟩ , ꞙɭı , ꞙɭı , ſɭᴜ ſןᴜ , }ʃɹƽ ,
//   ꞙɭɔ , ſɭэ ֭ſɭэ , ꞙɭɔ , ⟅ ꞙɭɔ , ꞙɭɔ , ꞙɭɔ ,
//   ꞙɭɔ , ſɭэ ֭ſɭэ , ꞙɭɔ , ⟅ ꞙɭɔ , ꞙɭɔ , ꞙɭɔ , ꞙɭɔ ,
//   ꞙɭɔ , ꞙɭɔ , ꞙɭɔ , ꞙɭɔ , ⟅ 📃 ⟩
interface K6h6Projekcio {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
  hakek: { ax: number; az: number; dx: number; dz: number;
    sahakani: number; kvadrato: number; akum: number }[];
}

const PROJEKTA_MEMORO =
  new WeakMap<readonly ( readonly [ number, number ] )[], K6h6Projekcio>();

function projekcioDe( n2k: readonly ( readonly [ number, number ] )[] ): K6h6Projekcio {
  const konservita = PROJEKTA_MEMORO.get(n2k);
  if ( konservita ) return konservita;
  const hakek: K6h6Projekcio["hakek"] = [];
  let akum = 0;
  let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
  for ( let i = 0; i < n2k.length - 0o1; i++ ) {
    const [ ax, az ] = n2k[ i ];
    const [ bx, bz ] = n2k[ i + 0o1 ];
    const dx = bx - ax, dz = bz - az;
    const sahakani = Math.hypot(dx, dz);
    if ( ax < minX ) minX = ax;
    if ( ax > maxX ) maxX = ax;
    if ( bx < minX ) minX = bx;
    if ( bx > maxX ) maxX = bx;
    if ( az < minZ ) minZ = az;
    if ( az > maxZ ) maxZ = az;
    if ( bz < minZ ) minZ = bz;
    if ( bz > maxZ ) maxZ = bz;
    if ( sahakani < 0o10 ** -0o6 ) continue;
    hakek.push({ ax, az, dx, dz, sahakani, kvadrato: sahakani * sahakani, akum });
    akum += sahakani;
  }
  const projekcio: K6h6Projekcio = { minX, maxX, minZ, maxZ, hakek };
  PROJEKTA_MEMORO.set(n2k, projekcio);
  return projekcio;
}

/* ꞙɭɔ , }ʃɹƽ , ꞙɭı , ſɭэ ſɭᴜ , ꞙɭı ,
    @param n2k ( [ number , number ] [ ] ) - ſɭэ ſɭᴜ , ꞙɭı ,
    @param x, z ( number ) - }ʃɹƽ , ꞙɭı ,
@returns { s , h6kuni } ( object ) - ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭı , */
function projekcioSurK6h6( n2k: readonly ( readonly [ number, number ] )[],
  x: number, z: number ): { s: number; h6kuni: number } {
  let plej = Infinity, plejS = 0;
  for ( const kek of projekcioDe(n2k).hakek ) {
    const t = Math.max(0, Math.min(1,
      ( ( x - kek.ax ) * kek.dx + ( z - kek.az ) * kek.dz ) / kek.kvadrato ));
    const h6kuni = Math.hypot(x - ( kek.ax + kek.dx * t ),
      z - ( kek.az + kek.dz * t ));
    if ( h6kuni < plej ) { plej = h6kuni; plejS = kek.akum + kek.sahakani * t; }
  }
  return { s: plejS, h6kuni: plej };
}

/* ꞙɭɔ , ſɭэ ſɭᴜ , ꞙɭɔ , ſɭэ ſɭᴜ , ꞙɭı ,
    @param n2k ( [ number , number ] [ ] ) - ſɭэ ſɭᴜ , ꞙɭı ,
    @param x, z ( number ) - }ʃɹƽ , ꞙɭı ,
    @param limo ( number ) - ꞙɭı , ꞙɭı , ꞙɭı ,
@returns h6kuni ( number ) - ꞙɭɔ , ſɭэ ſɭᴜ , Infinity */
function distancoAlK6h6( n2k: readonly ( readonly [ number, number ] )[],
  x: number, z: number, limo: number ): number {
  const projekcio = projekcioDe(n2k);
  if ( x < projekcio.minX - limo || x > projekcio.maxX + limo
    || z < projekcio.minZ - limo || z > projekcio.maxZ + limo ) return Infinity;
  let plej = Infinity;
  for ( const kek of projekcio.hakek ) {
    const t = Math.max(0, Math.min(1,
      ( ( x - kek.ax ) * kek.dx + ( z - kek.az ) * kek.dz ) / kek.kvadrato ));
    const h6kuni = Math.hypot(x - ( kek.ax + kek.dx * t ),
      z - ( kek.az + kek.dz * t ));
    if ( h6kuni < plej ) plej = h6kuni;
  }
  return plej;
}

// ⟪ ſɭэ ֭ſɭэ , ſɭᴜ ſןᴜ , ꞙɭı 📏 ⟫
/* j͑ʃᴜ ſɭ,w , ꞙɭı , ſɭэ ֭ſɭэ , ( ſɟɹƽ ꞁȷ̀ᴜ }ʃw ) , ſɭᴜ ſןᴜ ,
   ꞙɭı , kf2NivelanProfilon , ꞙɭɔ , ꞙɭɔ , ꞙɭı ,
   ꞙɭɔ , ꞙɭı , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭɔ , ſɭᴜc̗ ɭʃɜ ſןᴜȝ ꞁȷ̀ᴜꞇ , ꞙɭı ,
    @param kruda ( function ) - ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w ,
    @param n2k ( [ number , number ] [ ] ) - ſɭэ ſɭᴜ , ꞙɭı ,
    @param haveb6kek ( [ number , number ] [ ] ) - ſɭᴜ ſןᴜ , }ʃɹƽ ,
    @param plataAlto ( function ) - ſɭᴜ ſןᴜ , ꞙɭı , }ʃɹƽ ,
    @param p2somani ( number ) - ꞙɭı , ꞙɭı , ſɭэ ֭ſɭэ ,
@returns l6da ( function ) - j͑ʃᴜ ſɭ,w , ꞙɭı , ſɭᴜ ſןᴜ , */
// ⟨ ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭɔ , ꞙɭı , 📏 ⟩ , ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w ,
//   ꞙɭı , ꞙɭɿ , ( ꞙɭɔ , ꞙɭı ) , ⟅ ꞙɭɔ , ꞙɭı ,
//   ꞙɭɔ , ꞙɭɔ , ꞙɭı , ꞙɭɔ , ꞙɭɔ ,
//   ꞙɭɔ , ꞙɭɔ , ꞙɭɔ , ꞙɭɔ ,
//   ꞙɭɔ , ꞙɭɔ , ꞙɭɔ , ⟅ 📃 ⟩
// ⟨ ꞙɭı , ſןɔ˞ᴜƴ , ꞙɭı , 📏 ⟩ , ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭɔ ,
//   ꞙɭɔ , ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭɔ ,
//   ꞙɭɔ , ꞙɭɔ , ⟅ 📃 ⟩
function rampigiAlPa12n(
  kruda: ( x: number, z: number ) => number,
  n2k: readonly ( readonly [ number, number ] )[],
  haveb6kek: readonly ( readonly [ number, number ] )[],
  plataAlto: ( x: number, z: number ) => number,
  p2somani: number
): ( x: number, z: number ) => number {
  // ⟨ ꞙɭı , ſɭᴜ ſןᴜ , }ʃɹƽ , ꞙɭı , 📐 ⟩ , ꞙɭı , ꞙɭɔ , ꞙɭɔ , ⟅
  const lokoj = haveb6kek.map(([ kx, kz ]) => {
    const p = projekcioSurK6h6(n2k, kx, kz);
    return { x: kx, z: kz, s: p.s, h6kuni: p.h6kuni };
  }).filter(l => l.h6kuni <= p2somani + 0o1/0o100);
  // ⟨ ꞙɭı , ꞙɭɿ , 📏 ⟩ , ꞙɭı , j͐ʃэ ɭ(ᴜ , ꞙɭı , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ꞙɭɔ , ꞙɭɔ , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭɔ , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ꞙɭɔ , ꞙɭı , = ſɭᴜc̗ ɭʃɜ ſןᴜȝ ꞁȷ̀ᴜꞇ ⟅ ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  return ( x, z ) => {
    const soza = kruda( x, z ) + VOJA_SUPRO_LEVIGXO;
    const { s } = projekcioSurK6h6(n2k, x, z);
    let psaz = -Infinity, teru = Infinity;
    for ( const l of lokoj ) {
      const d = Math.abs(s - l.s);
      if ( d > VOJA_TRUA_DUONO + 0o20 ) continue;
      const p = plataAlto( l.x, l.z );
      const margxo = Math.max(0, d - VOJA_TRUA_DUONO);
      psaz = Math.max(psaz, p - margxo);
      teru = Math.min(teru, p + margxo);
    }
    // ⟨ ꞙɭı , ꞙɭı , 📏 ⟩ , ſɭᴜ ſןᴜ , ꞙɭɿ , ꞙɭı ,
    //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
    const tseuni = psaz <= teru
      ? Math.max(psaz, Math.min(teru, soza))
      : ( psaz + teru ) / 0o2;
    return tseuni - VOJA_SUPRO_LEVIGXO;
  };
}

// ⟪ ſɭэ ֭ſɭэ , ꞙɭı 🏗️ ⟫
export function vepaqHak6h6n(qena: THREE.Scene,
  defs: VojDifino[],
  heightFn: ( x: number, z: number ) => number,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial,
  haveb6kek: [ number, number ][] = [],
  hasukf2qani: VojHasukf2qani = {}
): THREE.Vector3[] {
  const { akvaFn, grundoFn = heightFn, kunigajDirektoj,
    kunigajFermitaj, kunigajRotacioj, kunigajDuonoj } = hasukf2qani;
  // ⟨ ꞙɭɔ , ſᶘᴜ j͑ʃᴜ , ꞙɭɔ , 📏 ⟩ , ſɭɜ ſɭ,w , ꞙɭı ,
  //   ꞙɭı , ſᶘᴜ j͑ʃᴜ , ſɭэ ſɭ,w , ſɭᴜc̗ ɭʃɜ ſןᴜȝ ꞁȷ̀ᴜꞇ ,
  //   ꞙɭı , ſᶘᴜ j͑ʃᴜ , ꞙɭɔ , ꞙɭı , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭı ,
  //   ꞙɭı , ſᶘᴜ j͑ʃᴜ , ꞙɭı , ⟅ 📃 ⟩
  const fundaFn: ( x: number, z: number ) => number = akvaFn
    ? ( x, z ) => {
        const grundo = grundoFn(x, z);
        const akvo = akvaFn(x, z);
        if ( akvo <= -Infinity ) return grundo;
        // ⟨ ſᶘᴜ j͑ʃᴜ , ꞙɭɔ , ꞙɭɔ , ſɭэ ֭ſɭэ , ꞙɭı , ⟅ 📃 ⟩
        if ( grundo < akvo ) return Infinity;
        return grundo;
      }
    : grundoFn;
  const samples: THREE.Vector3[] = [];
  const { supraMaterialo, bordaMaterialo } = kf2Hak6h6nMaterialojn(dioritaMaterialo, andezitaMaterialo, -2, -4, -1, -1);

  const habakaweKatoma = kf2GeometriajnHabakaweKatoman();
  // ⟪ ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w , ꞙɭı 📏 ⟫
  // ⟨ ſɭэ ֭ſɭэ , ꞙɭɔ , ꞙɭı , 📃 ⟩ , ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ( ꞙɭɔ ) , ⟅ ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ( ſɟɹƽ ꞁȷ̀ᴜ }ʃw ) , ꞙɭɔ ,
  //   ꞙɭɔ , ꞙɭɔ , ꞙɭɔ , ꞙɭı , ſɭᴜc̗ ɭʃɜ ſןᴜȝ ꞁȷ̀ᴜꞇ ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  purigiKunigajnHavem2n();
  // ⟨ ſɭᴜ ſןᴜ , ⚓ ⟩ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭɔ , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  const qakaj2jAltoj = konsumiDokajnAltojn();
  const naturaj = defs.map(def => {
    const bendoj = kf2K6h6jnBendojn(def.w, supraMaterialo, bordaMaterialo);
    const p2somani = kf2EksteranDuonon(bendoj);
    const kruda = def.heightFn || heightFn;
    const pudalla = def.glata === true || def.stuparo === true;
    // ⟨ ꞙɭı , 📏 ⟩ , ꞙɭɔ , haveb6kek , ꞙɭɔ , ꞙɭı , ꞙɭɔ , ⟅
    const s2qena = pudalla ? null : kf2NivelanProfilon(def.pts, p2somani, kruda, akvaFn);
    return { p2somani, altoCxe: ( px: number, pz: number ): number => {
      if ( s2qena ) return s2qena.altoCxe(projekcioSurK6h6(def.pts, px, pz).s);
      return kruda(px, pz) + VOJA_SUPRO_LEVIGXO;
    } };
  });
  for ( const [ kx, kz ] of haveb6kek ) {
    const ca3aq = kunigaKlavo(kx, kz);
    const knece = kf2Brakojn(kunigajDirektoj?.get(ca3aq) ?? [],
      kunigajFermitaj?.get(ca3aq), kunigajRotacioj?.get(ca3aq) ?? 0,
      kunigajDuonoj?.get(ca3aq));
    const brakajAltoj: BrakaAlto[] = knece.map(b => {
      // ⟨ ꞙɭı , ꞙɭı , 📏 ⟩ , ꞙɭɔ , ꞙɭı , ꞙɭı , ⟅
      const px = kx + b.ux * ( VOJA_TRUA_DUONO + 0o1/0o4 );
      const pz = kz + b.uz * ( VOJA_TRUA_DUONO + 0o1/0o4 );
      let plej = Infinity, l6da = NaN;
      for ( let i = 0; i < defs.length; i++ ) {
        const limo = naturaj[ i ].p2somani + 0o1/0o100;
        const h6kuni = distancoAlK6h6(defs[ i ].pts, px, pz, limo);
        if ( h6kuni > limo ) continue;
        if ( h6kuni < plej ) { plej = h6kuni; l6da = naturaj[ i ].altoCxe(px, pz); }
      }
      // ⟨ }ʃɹƽ , ꞙɭı 📏 ⟩ , ꞙɭɔ , ſɭэ ֭ſɭэ , ꞙɭı , ꞙɭı , ⟅
      if ( !Number.isFinite(l6da) )
        l6da = kunigajBrakAltoj(kx, kz, [ [ b.ux, b.uz ] ], [ b.p2somani ], heightFn)[ 0 ]
          + VOJA_SUPRO_LEVIGXO;
      return { ux: b.ux, uz: b.uz, l6da: surGrid(l6da), p2somani: b.p2somani };
    });
    // ⟨ ſɭɜ ſɭ,w , ꞙɭı 📏 ⟩ , ſɭᴜ ſןᴜ , ꞙɭɔ , ꞙɭı , ꞙɭı ,
    //   kunigaPlataAlto , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
    const rezervo = kunigaPlataAlto(kx, kz, knece, heightFn);
    // ⟨ ſɭᴜ ſןᴜ , ⚓ ⟩ , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭı ,
    //   ꞙɭı , ꞙɭı , ꞙɭɔ , ꞙɭı , ꞙɭɔ ,
    //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
    const qakaj2Alto = qakaj2AltoEl(qakaj2jAltoj, kx, kz);
    kunigajHavem2.set(ca3aq, { x: kx, z: kz,
      l6da: qakaj2Alto ?? elektiPlatanAlton(brakajAltoj, rezervo),
      knece: brakajAltoj });
  }
  const plataAltoCxeVeb6kek = ( x: number, z: number ): number => {
    const ca3aq = kunigaKlavo(x, z);
    const reg = kunigajHavem2.get(ca3aq);
    if ( reg ) return reg.l6da;
    const knece = kf2Brakojn(kunigajDirektoj?.get(ca3aq) ?? [],
      kunigajFermitaj?.get(ca3aq), kunigajRotacioj?.get(ca3aq) ?? 0,
      kunigajDuonoj?.get(ca3aq));
    return surGrid(kunigaPlataVem2(x, z, knece, heightFn).l6da);
  };
  // ⟨ ꞙɭɔ , ꞙɭı , 📏 ⟩ , ſɭᴜ ſןᴜ , ꞙɭı , ſןɔ˞ᴜƴ , ꞙɭı ,
  const pa12Cxe = plataAltoCxeVeb6kek;
  // ⟨ ꞙɭı , ꞙɭı , ꞙɭɔ , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  const kapoAltoj = new Map<VojDifino, { saxeni: number | null; fino: number | null }>();
  // ⟨ }ʃɹƽ , ꞙɭı , 🌗 ⟩ , ꞙɭı , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  const c2qjPecoj: C2qPeco[] = [];

  for ( const def of defs ) {
    const krudaAlt = def.heightFn || heightFn;
    // ⟨ ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭı , ꞙɭı 📏 ⟩ , ꞙɭı , ꞙɭɔ , ꞙɭı ,
    //   ꞙɭı , ꞙɭɔ , kf2NivelanProfilon , ꞙɭɔ , ꞙɭı , ꞙɭɔ ,
    //   ꞙɭı , ꞙɭı , ꞙɭı , ſןɔ˞ᴜƴ , ꞙɭı , ꞙɭı ,
    //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
    const bendoj = kf2K6h6jnBendojn(def.w, supraMaterialo, bordaMaterialo);
    const eksteraDuono = kf2EksteranDuonon(bendoj);
    const defAlt = def.glata === true
      ? rampigiAlPa12n(krudaAlt, def.pts, haveb6kek, plataAltoCxeVeb6kek, eksteraDuono)
      : krudaAlt;
    const defGrundo = def.grundoFn ?? fundaFn;
    kapoAltoj.set( def, { saxeni: null, fino: null } );
    const notiFinon = ( saxeni: number | null, tlakakani: number | null ): void => {
      const teruni = kapoAltoj.get(def)!;
      teruni.saxeni = saxeni;
      teruni.fino = tlakakani;
    };
    if ( def.stuparo === true ) {
      let xaqadi: number | null = null, z2hak: number | null = null;
      // ⟨ ꞙɭı , ꞙɭı , ſןɔ˞ᴜƴ , 📏 ⟩ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
      //   ꞙɭɔ , ꞙɭı , ꞙɭɔ , ⟅ ꞙɭɔ , ꞙɭı , ꞙɭı ,
      //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
      const pa12CxeFinon = ( pto: [ number, number ] ): number | null => {
        for ( const [ kX, kZ ] of haveb6kek ) {
          if ( Math.hypot(pto[0] - kX, pto[1] - kZ) > VOJA_TRUA_DUONO ) continue;
          return pa12Cxe(kX, kZ);
        }
        return null;
      };
      const unuaPa12 = pa12CxeFinon(def.pts[0]);
      const lastaPa12 = pa12CxeFinon(def.pts[def.pts.length - 1]);
      // ⟨ ꞙɭı , ꞙɭı , ꞙɭı 📏 ⟩ , ꞙɭı , ꞙɭı , ꞙɭı ,
      //   ꞙɭı , ꞙɭı , ꞙɭı , VOJA_SUPRO_LEVIGXO ,
      //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
      const stupaAlto = ( x: number, z: number ): number => {
        const pa12 = pa12CxeFinon([ x, z ]);
        if ( pa12 !== null ) return pa12 - STUPA_RISERO - VOJA_SUPRO_LEVIGXO;
        return defAlt(x, z);
      };
      // ⟨ ꞙɭı , ꞙɭı , 📏 ⟩ , ꞙɭı , ꞙɭı , ꞙɭı ,
      //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭɔ , ꞙɭı ,
      //   ꞙɭı , ꞙɭı , ꞙɭɔ , ꞙɭı , ⟅ 📃 ⟩
      // ⟨ ꞙɭı , ꞙɭı , ꞙɭɔ , 📏 ⟩ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
      //   ꞙɭɔ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
      //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭɔ , ꞙɭı , ⟅ 📃 ⟩
      const teraPlanko = ( ax: number, az: number, bx: number, bz: number ): number => {
        const sahakani = Math.hypot(bx - ax, bz - az);
        if ( sahakani < 0o1/0o1000 ) return -Infinity;
        const latX = -( bz - az ) / sahakani * eksteraDuono;
        const latZ = ( bx - ax ) / sahakani * eksteraDuono;
        let planko = -Infinity;
        for ( const t of [ 0, 0o1/0o2, 1 ] ) {
          const px = ax + ( bx - ax ) * t, pz = az + ( bz - az ) * t;
          for ( const kanto of [ -1, 0, 1 ] ) {
            const grundo = defGrundo(px + latX * kanto, pz + latZ * kanto);
            if ( !Number.isFinite(grundo) ) continue;
            const akvo = akvaFn?.(px + latX * kanto, pz + latZ * kanto) ?? -Infinity;
            // ⟨ ꞙɭɔ , ſᶘᴜ j͑ʃᴜ , ꞙɭɔ , ꞙɭı , 📏 ⟩ , j͑ʃᴜ ſɭ,w , ꞙɭɔ ,
            //   ſᶘᴜ j͑ʃᴜ , ꞙɭı , ꞙɭɔ , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
            const levigita = Math.min(grundo + VOJA_SUPRO_LEVIGXO + STUPA_RISERO,
              akvo - VOJA_SUPRO_LEVIGXO);
            planko = Math.max(planko, grundo + VOJA_SUPRO_LEVIGXO, levigita);
          }
        }
        return planko;
      };
      const stupajAltoj: number[] = [];
      const lastaIndekso = def.pts.length - 0o2;
      for ( let i = 0; i < def.pts.length - 1; i++ ) {
        const [ ax, az ] = def.pts[i], [ bx, bz ] = def.pts[i + 1];
        const sost2 = stupaAlto(( ax + bx ) / 0o2, ( az + bz ) / 0o2);
        stupajAltoj.push(Math.max(sost2, teraPlanko(ax, az, bx, bz)));
      }
      // ⟨ ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , 📏 ⟩ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
      //   ꞙɭɔ , ꞙɭı , ꞙɭɔ , ꞙɭı , ꞙɭı , ꞙɭı ,
      //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭɔ , ꞙɭı , ⟅ 📃 ⟩
      // ⟨ ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭɔ , STUPA_RISERO , ꞙɭɔ , ꞙɭı ,
      //   ꞙɭɔ , ꞙɭı , ꞙɭı , ( ꞙɭɔ , ꞙɭɔ.э , ) , ꞙɭı , ꞙɭɔ.ꞟ , ꞙɭı ,
      //   ꞙɭı , ꞙɭı , ꞙɭı , = ſɭᴜc̗ ɭʃɜ ſןᴜȝ ꞁȷ̀ᴜꞇ ⟅ ꞙɭı ,
      //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭɔ , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
      if ( lastaIndekso >= 0 ) {
        if ( unuaPa12 !== null ) stupajAltoj[0] = Math.max(stupajAltoj[0],
          defAlt(def.pts[0][0], def.pts[0][1]));
        if ( lastaPa12 !== null ) stupajAltoj[lastaIndekso] = Math.max(stupajAltoj[lastaIndekso],
          defAlt(def.pts[lastaIndekso + 1][0], def.pts[lastaIndekso + 1][1]));
      }
      for ( let i = 0; i < def.pts.length - 1; i++ ) {
        const [ aX, aZ ] = def.pts[i];
        const [ bX, bZ ] = def.pts[i + 1];
        const fala = i + 1 < stupajAltoj.length ? stupajAltoj[i] - stupajAltoj[i + 1] : 0;
        const tseuni = vepaqUnuformajnStuparajnHas2nascen(aX, aZ, bX, bZ, bendoj, VOJA_DIKECO,
          () => stupajAltoj[i], defGrundo, habakaweKatoma, fala);
        if ( tseuni ) {
          if ( xaqadi === null ) xaqadi = tseuni.xaqadi;
          z2hak = tseuni.z2hak;
        }
        aldonuSpecimenojn(samples, aX, aZ, bX, bZ, defAlt);
      }
      notiFinon(xaqadi, z2hak);
      continue;
    }
    // ⟨ ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭı ,
    //   ꞙɭɔ , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
    // ⟨ ꞙɭı , ꞙɭı , ꞙɭı , 📃 ⟩ , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭɔ , ꞙɭı ,
    //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
    //   ꞙɭı , ꞙɭɔ , ꞙɭɔ , ꞙɭı , ꞙɭı , ꞙɭı , ( ſȷƽᴜ ʃɔ ) ,
    //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
    const s2qena = def.glata === true
      ? null
      : kf2NivelanProfilon(def.pts, eksteraDuono, defAlt, akvaFn,
        haveb6kek.map(([ x, z ]) => ( { x, z, l6da: pa12Cxe(x, z) } )));
    // ⟨ ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , 📏 ⟩ , ſɭэ ſɭᴜ , ꞙɭı ,
    //   ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı , ⟅ ꞙɭı ,
    //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭı , ꞙɭı ,
    // ⟨ ꞙɭı , ꞙɭı , 📏 ⟩ , ꞙɭı , kf2SegmentajnPartojn , ꞙɭı ,
    //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭɔ , ꞙɭı ,
    //   ꞙɭɔ , ſɭᴜ ſןᴜ , ⟅ ꞙɭɔ , ꞙɭɔ , ⟅ 📃 ⟩
    const truoj: K6h6Truo[] = [];
    if ( s2qena ) {
      let sTruo = 0;
      for ( let i = 0; i < def.pts.length - 0o1; i++ ) {
        const [ aX, aZ ] = def.pts[ i ], [ bX, bZ ] = def.pts[ i + 0o1 ];
        const longo2 = Math.hypot(bX - aX, bZ - aZ);
        if ( longo2 < 0o1/0o100 ) continue;
        for ( const [ t0, t1, vepaquPec ] of
          kf2SegmentajnPartojn(aX, aZ, bX, bZ, longo2, haveb6kek) )
          if ( !vepaquPec ) truoj.push({ s0: sTruo + t0, s1: sTruo + t1 });
        sTruo += longo2;
      }
    }
    const treadoj = s2qena ? kf2UnuformajnTreadojn(s2qena, truoj) : [];
    // ⟪ ſןɔ˞ᴜƴ , }ʃɹƽ , 🌗 ⟫
    // ⟨ ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı , 📏 ⟩ , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı , ꞙɭı ,
    //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
    let akum = 0;
    for ( let k = 1; k < def.pts.length - 0o1; k++ ) {
      const antaux = def.pts[ k - 0o1 ], nuna = def.pts[ k ], sekva = def.pts[ k + 0o1 ];
      const l1 = Math.hypot(nuna[ 0 ] - antaux[ 0 ], nuna[ 1 ] - antaux[ 1 ]);
      const l2 = Math.hypot(sekva[ 0 ] - nuna[ 0 ], sekva[ 1 ] - nuna[ 1 ]);
      akum += l1;
      if ( l1 < 0o1/0o1000 || l2 < 0o1/0o1000 ) continue;
      const u1x = ( nuna[ 0 ] - antaux[ 0 ] ) / l1, u1z = ( nuna[ 1 ] - antaux[ 1 ] ) / l1;
      const u2x = ( sekva[ 0 ] - nuna[ 0 ] ) / l2, u2z = ( sekva[ 1 ] - nuna[ 1 ] ) / l2;
      const turno = Math.abs(Math.atan2(u1x * u2z - u1z * u2x, u1x * u2x + u1z * u2z));
      if ( turno < 0o1/0o20 ) continue;
      let enTruo = false;
      for ( const [ kx, kz ] of haveb6kek ) {
        if ( Math.hypot(nuna[ 0 ] - kx, nuna[ 1 ] - kz ) < VOJA_TRUA_DUONO + 0o1/0o10 ) {
          enTruo = true; break;
        }
      }
      if ( enTruo ) continue;
      // ⟨ ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı 📏 ⟩ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
      //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
      //   ꞙɭı , ꞙɭı , ꞙɭı ,
      //   ꞙɭı , ꞙɭı , u1 , u2 , ꞙɭɔ ,
      //   ꞙɭı , ꞙɭɔ , ꞙɭı , ꞙɭɔ , ⟅ 📃 ⟩
      c2qjPecoj.push({ x: nuna[ 0 ], z: nuna[ 1 ],
        sost2: Math.atan2(u1z - u2z, u1x - u2x), gamo: turno,
        teru: s2qena ? s2qena.altoCxe(akum)
          : defAlt(nuna[ 0 ], nuna[ 1 ]) + VOJA_SUPRO_LEVIGXO,
        p2somani: def.w / 0o2, ekstera: eksteraDuono });
    }
    let xaqadi: number | null = null, z2hak: number | null = null;
    let saxeni = 0;
    for ( let i = 0; i < def.pts.length - 1; i++ ) {
      const [ aX, aZ ] = def.pts[i];
      const [ bX, bZ ] = def.pts[i + 1];
      const sahakani = Math.hypot(bX - aX, bZ - aZ);
      if ( sahakani < 0o1/0o100 ) continue;
      const ndx = ( bX - aX ) / sahakani, ndz = ( bZ - aZ ) / sahakani;
      for ( const [ t0, t1, vepaquPec ] of kf2SegmentajnPartojn(aX, aZ, bX, bZ, sahakani, haveb6kek) ) {
        const px1 = aX + ndx * t0, pz1 = aZ + ndz * t0;
        const px2 = aX + ndx * t1, pz2 = aZ + ndz * t1;
        if ( vepaquPec ) {
          const tseuni = s2qena
            ? vepaqS2nascenEnHabakaweKatoman(px1, pz1, px2, pz2, saxeni + t0, saxeni + t1, bendoj,
              treadoj, habakaweKatoma, VOJA_DIKECO, defGrundo)
            : vepaqGlatanS2nascen(px1, pz1, px2, pz2, bendoj, VOJA_DIKECO, defAlt, defGrundo, habakaweKatoma);
          if ( tseuni ) {
            if ( xaqadi === null ) xaqadi = tseuni.xaqadi;
            z2hak = tseuni.z2hak;
          }
          continue;
        }
        // ⟨ ꞙɭı , ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭɔ , ꞙɭı , ⟅ 📃 ⟩
        const mX = ( px1 + px2 ) / 0o2, mZ = ( pz1 + pz2 ) / 0o2;
        const kunigaSupro = s2qena
          ? s2qena.altoCxe(saxeni + ( t0 + t1 ) / 0o2)
          : Math.max(defAlt(mX, mZ)) + 0o1/0o100 + VOJA_DIKECO;
        vojSuprajxoj.push({ x1: px1, z1: pz1, x2: px2, z2: pz2, p2somani: eksteraDuono,
          y0: kunigaSupro, y1: kunigaSupro });
      }
      aldonuSpecimenojn(samples, aX, aZ, bX, bZ, defAlt);
      saxeni += sahakani;
    }
    notiFinon(xaqadi, z2hak);
  }
  // ⟪ ꞙɭı , ꞙɭı , 🌗 ⟫
  // ⟨ ꞙɭı , ꞙɭı , ꞙɭı , 📏 ⟩ , ꞙɭı , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , π , ꞙɭɔ , ⟅ 📃 ⟩
  const finokalkulo = new Map<string, number>();
  for ( const def of defs ) {
    if ( def.pts.length < 2 || def.hateruni !== true ) continue;
    for ( const pto of [ def.pts[0], def.pts[def.pts.length - 1] ] ) {
      const ca3aq = pto[0] + "," + pto[1];
      finokalkulo.set(ca3aq, ( finokalkulo.get(ca3aq) ?? 0 ) + 1);
    }
  }
  const kapoVidita: [ number, number ][] = [];
  for ( const def of defs ) {
    if ( def.pts.length < 2 || def.hateruni !== true || def.stuparo === true ) continue;
    const teruni = kapoAltoj.get( def );
    const hatlakakani: [ [ number, number ], [ number, number ], number | null ][] = [
      [ def.pts[0], def.pts[1], teruni?.saxeni ?? null ],
      [ def.pts[def.pts.length - 1], def.pts[def.pts.length - 2], teruni?.fino ?? null ],
    ];
    for ( const [ tlakakani, najbaro, supraY ] of hatlakakani ) {
      const dx = tlakakani[0] - najbaro[0], dz = tlakakani[1] - najbaro[1];
      const direktaLongo = Math.hypot( dx, dz );
      if ( direktaLongo < 0o1/0o100 ) continue;
      if ( ( finokalkulo.get(tlakakani[0] + "," + tlakakani[1]) ?? 0 ) > 1 ) continue;
      if ( kapoVidita.some(([ vx, vz ]) => Math.hypot(tlakakani[0] - vx, tlakakani[1] - vz) < 0o1/0o100) ) continue;
      let enTruo = false;
      for ( const [ kX, kZ ] of haveb6kek ) {
        if ( Math.hypot(tlakakani[0] - kX, tlakakani[1] - kZ) < VOJA_TRUA_DUONO + 0o1/0o100 ) { enTruo = true; break; }
      }
      if ( enTruo ) continue;
      kapoVidita.push([ tlakakani[0], tlakakani[1] ]);
      const defAlt = def.heightFn || heightFn;
      c2qjPecoj.push({ x: tlakakani[ 0 ], z: tlakakani[ 1 ],
        sost2: Math.atan2(dz, dx), gamo: DUONA_RONDO,
        p2somani: def.w / 0o2, ekstera: def.w / 0o2 + VOJA_BORDA_SEFINI,
        teru: supraY ?? defAlt(tlakakani[ 0 ], tlakakani[ 1 ]) + VOJA_SUPRO_LEVIGXO });
    }
  }
  // ⟨ ꞙɭı , ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı , 📏 ⟩ ,
  aldoniC2qjnPecojn(habakaweKatoma, c2qjPecoj, supraMaterialo, bordaMaterialo, fundaFn);
  // ⟨ ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭɔ , ꞙɭɔ ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  habakaweKatoma.kunigi(qena, false);
  return samples;
}

// ⟪ ſɭэ ֭ſɭэ , ꞙɭı , 🌿 ⟫
/* ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭɔ , ꞙɭı ,
    @param samples ( Vector3 [ ] ) - }ʃɹƽ , ꞙɭı ,
    @param aX, aZ ( number ) - ꞙɭı , ꞙɭı ,
    @param bX, bZ ( number ) - ꞙɭı , ꞙɭı ,
    @param altFn ( function ) - ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w */
function aldonuSpecimenojn( samples: THREE.Vector3[], aX: number, aZ: number,
  bX: number, bZ: number, altFn: ( x: number, z: number ) => number ): void {
  const sahakani = Math.hypot(bX - aX, bZ - aZ);
  const nombro = Math.max(1, Math.round(sahakani / 2));
  for ( let k = 0; k <= nombro; k++ ) {
    const t = k / nombro;
    const sx = aX + ( bX - aX ) * t;
    const sz = aZ + ( bZ - aZ ) * t;
    samples.push(new THREE.Vector3(sx, altFn(sx, sz), sz));
  }
}
