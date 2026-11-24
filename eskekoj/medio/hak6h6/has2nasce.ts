// ≺⧼ ſɭэ ֭ſɭэ j͑ʃᴜꞇ ʌ j͑ʃɹ }ʃᴜ j͑ʃᴜ̭ɔ 🧩 ⧽≻
import * as THREE from "three";
import { matricoPor, ANGULA_PROVOLIRO, type VojBendo, type VojGeometriajHabakaweKatoma } from "./habakaweKatoma.js";
import { kf2SegmentGeometrion } from "./haqoxa.js";
import { type UnuformaTreado } from "./havem2.js";
import { rampaKuro, VOJA_EKSTERA_DUONO, VOJA_KUNIGA_SUPERPONO, VOJA_SUPRO_LEVIGXO,
  VOJA_TRUA_DUONO } from "./havecax2l.js";
import { vojSuprajxoj } from "./hahunaq.js";

// ⟪ ꞙɭı , j͑ʃᴜ ſɭ,w 📃 ⟫
export interface SegmentaRezulto {
  xaqadi: number;
  z2hak: number;
}

// ⟪ }ʃɹƽ , ſןɔ˞ᴜƴ 📏 ⟫
/* }ʃɹƽ , ꞙɭэ , ſןɔ˞ᴜƴ , ꞙɭı , ꞙɭı , ꞙɭı , ſɭɜ ɭʃᴜ ,
    @param altoA, altoB ( number ) - ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
    @param ax, az, bx, bz ( number ) - ꞙɭı , ſɭэ ſɭᴜ ,
    @param latX, latZ ( number ) - ꞙɭı , ꞙɭı ,
    @param grundoFn ( function ) - ſɭɜ ſɭ,w , j͑ʃᴜ ſɭ,w ,
    @param dikecoBaza ( number ) - ſɭᴜ ſɭ,w , ꞙɭı ,
@returns hatafkaq ( { hateru ; fundoj } ) - ꞙɭı , ꞙɭı , ꞙɭэ , ꞙɭı , */
// ⟨ ꞙɭı , ꞙɭı , 📃 ⟩ , ꞙɭı , ꞙɭı , ꞙɭɿ ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
function angulojDeTreado(altoA: number, altoB: number, ax: number, az: number, bx: number, bz: number,
  latX: number, latZ: number, grundoFn: ( x: number, z: number ) => number,
  dikecoBaza: number
): { hateru: [ number, number, number, number ]; fundoj: [ number, number, number, number ] } {
  const hateru: [ number, number, number, number ] = [ altoA, altoA, altoB, altoB ];
  const fundoj: [ number, number, number, number ] = [ altoA, altoA, altoB, altoB ];
  const hatafkaq: [ number, number ][] = [ [ ax - latX, az - latZ ], [ ax + latX, az + latZ ],
    [ bx + latX, bz + latZ ], [ bx - latX, bz - latZ ] ];
  for ( let i = 0; i < 0o4; i++ ) {
    const grundo = grundoFn(hatafkaq[ i ][ 0 ], hatafkaq[ i ][ 1 ]);
    fundoj[ i ] = Math.min(hateru[ i ] - dikecoBaza, grundo - ANGULA_PROVOLIRO);
  }
  return { hateru, fundoj };
}

// ⟪ ꞙɭı , }ʃɹƽ 📐 ⟫
/* j͑ʃᴜ ſɭ,w , ꞙɭı , }ʃɹƽ , ꞙɭı ,
    @param hatafkaq ( [ number , number , number , number ] ) - j͑ʃᴜ ſɭ,w , ꞙɭэ ,
    @param g0, g1 ( number ) - ꞙɭı , ꞙɭı ,
    @param eksteraDuon ( number ) - ꞙɭı , ꞙɭı ,
@returns hatskek2 ( [ number , number , number , number ] ) - ꞙɭı , ꞙɭı , */
function bendoAnguloj(hatafkaq: readonly [ number, number, number, number ],
  g0: number, g1: number, eksteraDuon: number
): [ number, number, number, number ] {
  const f0 = Math.max(0, Math.min(1, ( g0 + eksteraDuon ) / ( 0o2 * eksteraDuon )));
  const f1 = Math.max(0, Math.min(1, ( g1 + eksteraDuon ) / ( 0o2 * eksteraDuon )));
  const miks = ( a: number, b: number, f: number ): number => a + ( b - a ) * f;
  return [ miks(hatafkaq[ 0 ], hatafkaq[ 1 ], f0), miks(hatafkaq[ 0 ], hatafkaq[ 1 ], f1),
    miks(hatafkaq[ 3 ], hatafkaq[ 2 ], f1), miks(hatafkaq[ 3 ], hatafkaq[ 2 ], f0) ];
}

// ⟪ ſןɔ˞ᴜƴ , ꞙɭı 📏 ⟫
/* ſןɔ˞ᴜƴ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ſɭɜ ɭʃᴜ ,
    @param ax, az ( number ) - ꞙɭı , ſןɔ˞ᴜƴ ,
    @param bx, bz ( number ) - ꞙɭı , ſןɔ˞ᴜƴ ,
    @param l6da ( number ) - ꞙɭı , j͑ʃᴜ ſɭ,w ,
    @param fala ( number ) - j͑ʃᴜ ſɭ,w , ꞙɭı , ſןɔ˞ᴜƴ , ꞙɭɔ ,
    @param bendoj ( VojBendo [ ] ) - ſɭэ ֭ſɭэ , ꞙɭı ,
    @param dikecoBaza ( number ) - ſɭᴜ ſɭ,w , ꞙɭı ,
    @param grundoFn ( function ) - ſɭɜ ſɭ,w , j͑ʃᴜ ſɭ,w ,
    @param habakaweKatoma ( VojGeometriajHabakaweKatoma ) - ɭl̀ɜ ſ͕ɭᴜ ,
@returns hal6da ( [ number , number ] ) - j͑ʃᴜ ſɭ,w , ꞙɭɿ , */
// ⟨ ꞙɭı , ꞙɭı , ſןɔ˞ᴜƴ 📃 ⟩ , ſןɔ˞ᴜƴ , ( ꞙɭı , ꞙɭı ) ,
//   ꞙɭı , ſɭэ ֭ſɭэ , ( ꞙɭı , ꞙɭı ) , ꞙɭı , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭɿ , ⟅ ꞙɭı , ſןɔ˞ᴜƴ , ꞙɭɿ , ⟅ 📃 ⟩
// ⟨ ꞙɭı , ꞙɭı , 📃 ⟩ , ſןɔ˞ᴜƴ , ꞙɭı , ꞙɭı , ꞙɭı , ⟅
//   ꞙɭı , ꞙɭı , ſɭɜ ſɭ,w , ⟅ ꞙɭı , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
function aldoniTreadon(ax: number, az: number, bx: number, bz: number, l6da: number,
  fala: number,
  bendoj: VojBendo[],
  dikecoBaza: number,
  grundoFn: ( x: number, z: number ) => number,
  habakaweKatoma: VojGeometriajHabakaweKatoma
): [ number, number ] {
  const difX = bx - ax, difZ = bz - az;
  const sahakani = Math.hypot(difX, difZ);
  const ndx = difX / sahakani, ndz = difZ / sahakani;
  // ⟨ ꞙɭı , 📏 ⟩ , rampaKuro , VOJA_STUPA_RAMPO ,
  //   ꞙɭı , ſןɔ˞ᴜƴ , ꞙɭı , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭɔ , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  const rampo = fala === 0 ? 0 : Math.min( rampaKuro( fala ), sahakani );
  if ( rampo <= 0o1/0o1000 ) {
    aldoniBokson(ax, az, bx, bz, l6da, l6da, bendoj, dikecoBaza, grundoFn, habakaweKatoma);
    return [ l6da, l6da ];
  }
  // ⟨ ꞙɭı , ꞙɭı , ꞙɭı , 📃 ⟩ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭɔ , ꞙɭı , ⟅ 📃 ⟩
  const px = bx - ndx * rampo, pz = bz - ndz * rampo;
  aldoniBokson(ax, az, px, pz, l6da, l6da, bendoj, dikecoBaza, grundoFn, habakaweKatoma);
  aldoniBokson(px, pz, bx, bz, l6da, l6da - fala, bendoj, dikecoBaza, grundoFn, habakaweKatoma);
  return [ l6da, l6da - fala ];
}

// ⟪ ſןɔ˞ᴜƴ , ꞙɭı 📦 ⟫
/* ſןɔ˞ᴜƴ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ſɭɜ ɭʃᴜ ,
    @param ax, az ( number ) - ꞙɭı , ꞙɭı ,
    @param bx, bz ( number ) - ꞙɭı , ꞙɭı ,
    @param altoA, altoB ( number ) - j͑ʃᴜ ſɭ,w , ꞙɭı , ꞙɭı ,
    @param bendoj ( VojBendo [ ] ) - ſɭэ ֭ſɭэ , ꞙɭı ,
    @param dikecoBaza ( number ) - ſɭᴜ ſɭ,w , ꞙɭı ,
    @param grundoFn ( function ) - ſɭɜ ſɭ,w , j͑ʃᴜ ſɭ,w ,
    @param habakaweKatoma ( VojGeometriajHabakaweKatoma ) - ɭl̀ɜ ſ͕ɭᴜ */
function aldoniBokson(ax: number, az: number, bx: number, bz: number, altoA: number, altoB: number,
  bendoj: VojBendo[],
  dikecoBaza: number,
  grundoFn: ( x: number, z: number ) => number,
  habakaweKatoma: VojGeometriajHabakaweKatoma
): void {
  const difX = bx - ax, difZ = bz - az;
  const sahakani = Math.hypot(difX, difZ);
  if ( sahakani < 0o1/0o1000 ) return;
  const eksteraDuon = kf2EksteranDuonon(bendoj);
  const ndx = difX / sahakani, ndz = difZ / sahakani;
  const latX = -ndz * eksteraDuon, latZ = ndx * eksteraDuon;
  const hatafkaq = angulojDeTreado(altoA, altoB, ax, az, bx, bz, latX, latZ, grundoFn, dikecoBaza);
  vojSuprajxoj.push({ x1: ax, z1: az, x2: bx, z2: bz, p2somani: eksteraDuon,
    y0: altoA, y1: altoB, rampo: Math.abs( altoB - altoA ) > 0o1/0o1000 });
  for ( const bendo of bendoj ) {
    const g0 = bendo.ofseto - bendo.sefini / 0o2, g1 = bendo.ofseto + bendo.sefini / 0o2;
    const geometrio = kf2SegmentGeometrion(bendo.sefini, sahakani,
      bendoAnguloj(hatafkaq.hateru, g0, g1, eksteraDuon),
      bendoAnguloj(hatafkaq.fundoj, g0, g1, eksteraDuon), bendo.ofseto);
    habakaweKatoma.tlunakani(geometrio, bendo.pukek, matricoPor(difX, difZ, ( ax + bx ) / 0o2, 0, ( az + bz ) / 0o2));
  }
}

/* ꞙɭı , ſɭэ ֭ſɭэ , ſɭᴜ ſןᴜ , ꞙɭɔ , ſןɔ˞ᴜƴ ,
    @param aX, aZ ( number ) - ꞙɭı , ſɭэ ſɭᴜ ,
    @param bX, bZ ( number ) - ꞙɭı , ſɭэ ſɭᴜ ,
    @param sahakani ( number ) - ꞙɭı , ſɭэ ſɭᴜ ,
    @param haveb6kek ( [ number , number ] [ ] ) - ſɭᴜ ſןᴜ , }ʃɹƽ ,
@returns hakek ( [ number , number , boolean ] [ ] ) - ꞙɭı , ꞙɭı , */
export function kf2SegmentajnPartojn(aX: number, aZ: number, bX: number, bZ: number,
  sahakani: number,
  haveb6kek: [ number, number ][]
): [ number, number, boolean ][] {
  const ndx = ( bX - aX ) / sahakani, ndz = ( bZ - aZ ) / sahakani;
  const truoj: [ number, number ][] = [];
  for ( const [ kX, kZ ] of haveb6kek ) {
    const rx = kX - aX, rz = kZ - aZ;
    const laux = rx * ndx + rz * ndz;
    if ( laux < -VOJA_TRUA_DUONO || laux > sahakani + VOJA_TRUA_DUONO ) continue;
    const perpendikulara = Math.abs(rx * ndz - rz * ndx);
    // ⟨ ꞙɭı , ſɭэ ſɭᴜ 📃 ⟩ , ſɭᴜ ſןᴜ , ſɭэ ֭ſɭэ ,
    const cxeFino = laux <= VOJA_TRUA_DUONO || laux >= sahakani - VOJA_TRUA_DUONO;
    const perpendikularaTolero = ( cxeFino ? VOJA_EKSTERA_DUONO : 0o1/0o100 ) + 0o1/0o1000;
    if ( perpendikulara > perpendikularaTolero ) continue;
    // ⟨ ꞙɭɔ , ꞙɭı , ꞙɭı , 📏 ⟩ , ſɭэ ֭ſɭэ , ꞙɭı , ꞙɭı ,
    //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
    const kuna = VOJA_TRUA_DUONO - VOJA_KUNIGA_SUPERPONO;
    truoj.push([ Math.max(0, laux - kuna ), Math.min(sahakani, laux + kuna ) ]);
  }
  truoj.sort(( p, q ) => p[0] - q[0] );
  const hakek: [ number, number, boolean ][] = [];
  let kur = 0;
  for ( const [ t0, t1 ] of truoj ) {
    if ( t1 <= kur ) continue;
    if ( t0 > kur ) hakek.push([ kur, t0, true ]);
    hakek.push([ Math.max(kur, t0), t1, false ]);
    kur = t1;
  }
  if ( kur < sahakani ) hakek.push([ kur, sahakani, true ]);
  return hakek;
}

// ⟪ ſןɔ˞ᴜƴ , ꞙɭı 📏 ⟫
/* ſןɔ˞ᴜƴ , ꞙɭı , ꞙɭı ,
    @param x1, z1 ( number ) - ꞙɭı , ꞙɭı ,
    @param x2, z2 ( number ) - ꞙɭı , ꞙɭı ,
    @param bendoj ( VojBendo [ ] ) - ſɭэ ֭ſɭэ , ꞙɭı ,
    @param dikecoBaza ( number ) - ſɭᴜ ſɭ,w , ꞙɭı ,
    @param heightFn ( function ) - ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w ,
    @param grundoFn ( function ) - ſɭɜ ſɭ,w , j͑ʃᴜ ſɭ,w ,
    @param habakaweKatoma ( VojGeometriajHabakaweKatoma ) - ɭl̀ɜ ſ͕ɭᴜ ,
    @param fala ( number ) - j͑ʃᴜ ſɭ,w , ꞙɭı , ſןɔ˞ᴜƴ , ꞙɭɔ ,
@returns tseuni ( SegmentaRezulto | null ) - j͑ʃᴜ ſɭ,w , ꞙɭɿ , */
export function vepaqUnuformajnStuparajnHas2nascen(x1: number, z1: number, x2: number, z2: number,
  bendoj: VojBendo[],
  dikecoBaza: number,
  heightFn: ( x: number, z: number ) => number,
  grundoFn: ( x: number, z: number ) => number,
  habakaweKatoma: VojGeometriajHabakaweKatoma,
  fala: number
): SegmentaRezulto | null {
  const difX = x2 - x1, difZ = z2 - z1;
  const sahakani = Math.hypot(difX, difZ);
  if ( sahakani < 0o1/0o100 ) return null;
  const hateru = heightFn(( x1 + x2 ) / 0o2, ( z1 + z2 ) / 0o2) + VOJA_SUPRO_LEVIGXO;
  const [ xaqadi, z2hak ] = aldoniTreadon(x1, z1, x2, z2, hateru, fala, bendoj, dikecoBaza, grundoFn, habakaweKatoma);
  return { xaqadi, z2hak };
}

// ⟪ ſɭэ ֭ſɭэ , ſןɔ˞ᴜƴ 📃 ⟫
/* ꞙɭı , ꞙɭı , ꞙɭı , ſɭэ ſɭᴜ ,
    @param x1, z1 ( number ) - ꞙɭı , ꞙɭı ,
    @param x2, z2 ( number ) - ꞙɭı , ꞙɭı ,
    @param s0, s1 ( number ) - ſɭэ ֭ſɭэ , ꞙɭı , ꞙɭı ,
    @param bendoj ( VojBendo [ ] ) - ſɭэ ֭ſɭэ , ꞙɭı ,
    @param treadoj ( UnuformaTreado [ ] ) - ſɭэ ֭ſɭэ , ꞙɭı ,
    @param habakaweKatoma ( VojGeometriajHabakaweKatoma ) - ɭl̀ɜ ſ͕ɭᴜ ,
    @param dikecoBaza ( number ) - ſɭᴜ ſɭ,w , ꞙɭı ,
    @param grundoFn ( function ) - ſɭɜ ſɭ,w , j͑ʃᴜ ſɭ,w ,
@returns tseuni ( SegmentaRezulto | null ) - j͑ʃᴜ ſɭ,w , ꞙɭɿ , */
// ⟨ ꞙɭı , ꞙɭɔ , ꞙɭı , 📏 ⟩ , ꞙɭı ,
//   kf2UnuformajnTreadojn , ꞙɭı , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
export function vepaqS2nascenEnHabakaweKatoman(x1: number, z1: number, x2: number, z2: number,
  s0: number,
  s1: number,
  bendoj: VojBendo[],
  treadoj: readonly UnuformaTreado[],
  habakaweKatoma: VojGeometriajHabakaweKatoma,
  dikecoBaza: number,
  grundoFn: ( x: number, z: number ) => number
): SegmentaRezulto | null {
  const difX = x2 - x1, difZ = z2 - z1;
  const sahakani = Math.hypot(difX, difZ);
  const sDif = s1 - s0;
  if ( sahakani < 0o1/0o100 || sDif < 0o1/0o1000 ) return null;
  let xaqadi = Infinity, z2hak = Infinity;
  for ( const t of treadoj ) {
    const a = Math.max( t.s0, s0 ), b = Math.min( t.s1, s1 );
    if ( b - a < 0o1/0o1000 ) continue;
    const tDif = t.s1 - t.s0;
    const altoCxe = ( s: number ): number =>
      t.altoA + ( t.altoB - t.altoA ) * ( s - t.s0 ) / tDif;
    const f0 = ( a - s0 ) / sDif, f1 = ( b - s0 ) / sDif;
    const ax = x1 + difX * f0, az = z1 + difZ * f0;
    const bx = x1 + difX * f1, bz = z1 + difZ * f1;
    const altoA = altoCxe( a ), altoB = altoCxe( b );
    aldoniBokson( ax, az, bx, bz, altoA, altoB, bendoj, dikecoBaza, grundoFn, habakaweKatoma );
    if ( xaqadi === Infinity ) xaqadi = altoA;
    z2hak = altoB;
  }
  return xaqadi === Infinity ? null : { xaqadi, z2hak };
}

// ⟪ ſɭэ ֭ſɭэ , ꞙɭı , ( ſɟɹƽ ꞁȷ̀ᴜ }ʃw ) 📃 ⟫
/* ſɭэ ֭ſɭэ , ꞙɭı , ꞙɭı ,
    @param x1, z1 ( number ) - ꞙɭı , ꞙɭı ,
    @param x2, z2 ( number ) - ꞙɭı , ꞙɭı ,
    @param bendoj ( VojBendo [ ] ) - ſɭэ ֭ſɭэ , ꞙɭı ,
    @param dikecoBaza ( number ) - ſɭᴜ ſɭ,w , ꞙɭı ,
    @param heightFn ( function ) - ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w ,
    @param grundoFn ( function ) - ſɭɜ ſɭ,w , j͑ʃᴜ ſɭ,w ,
    @param habakaweKatoma ( VojGeometriajHabakaweKatoma ) - ɭl̀ɜ ſ͕ɭᴜ ,
@returns tseuni ( SegmentaRezulto | null ) - j͑ʃᴜ ſɭ,w , ꞙɭɿ , */
// ⟨ ſᶘɔ ʌ ꞙɭı , 📃 ⟩ , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭı , ꞙɭɔ , ſןɔ˞ᴜƴ ,
//   ꞙɭɔ , ꞙɭı , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭı , ſȷƽᴜ ʃɔ , ⟅
//   ꞙɭı , ꞙɭı , ⟅ ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
export function vepaqGlatanS2nascen(x1: number, z1: number, x2: number, z2: number,
  bendoj: VojBendo[],
  dikecoBaza: number,
  heightFn: ( x: number, z: number ) => number,
  grundoFn: ( x: number, z: number ) => number,
  habakaweKatoma: VojGeometriajHabakaweKatoma
): SegmentaRezulto | null {
  const difX = x2 - x1, difZ = z2 - z1;
  const sahakani = Math.hypot(difX, difZ);
  if ( sahakani < 0o1/0o100 ) return null;
  const steps = Math.max(0o1, Math.ceil(sahakani / ( 0o1/0o2 )));
  const ndx = difX / sahakani, ndz = difZ / sahakani;
  const eksteraDuon = kf2EksteranDuonon(bendoj);
  const latX = -ndz * eksteraDuon, latZ = ndx * eksteraDuon;
  const specimenoj: { s: number; hateru: number; fundo: number }[] = [];
  for ( let i = 0; i <= steps; i++ ) {
    const s = sahakani * i / steps;
    const px = x1 + ndx * s, pz = z1 + ndz * s;
    const hateru = Math.max(
      heightFn(px - latX, pz - latZ), heightFn(px + latX, pz + latZ))
      + 0o1/0o100 + dikecoBaza;
    const minimumo = Math.min(
      grundoFn(px - latX, pz - latZ), grundoFn(px, pz), grundoFn(px + latX, pz + latZ));
    specimenoj.push({ s, hateru, fundo: Math.min(hateru - dikecoBaza, minimumo - ANGULA_PROVOLIRO) });
  }
  const qoxa = new THREE.Shape();
  qoxa.moveTo(specimenoj[0].s, specimenoj[0].fundo);
  for ( let i = 1; i < specimenoj.length; i++ ) {
    const antauxa = specimenoj[i - 1];
    const nuna = specimenoj[i];
    // ⟨ ꞙɭɔ , ſɭɜ ɭʃᴜ , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
    const antauxaDeko = antauxa.fundo >= antauxa.hateru - dikecoBaza - 0o1/0o10;
    const nunaDeko = nuna.fundo >= nuna.hateru - dikecoBaza - 0o1/0o10;
    if ( antauxaDeko !== nunaDeko ) qoxa.lineTo(nuna.s, antauxa.fundo);
    qoxa.lineTo(nuna.s, nuna.fundo);
  }
  for ( let i = specimenoj.length - 1; i >= 0; i-- )
    qoxa.lineTo(specimenoj[i].s, specimenoj[i].hateru);
  qoxa.closePath();
  const matrico = new THREE.Matrix4().makeRotationY(Math.atan2(difX, difZ));
  matrico.setPosition(x1, 0, z1);
  for ( const bendo of bendoj ) {
    const geometrio = new THREE.ExtrudeGeometry(qoxa, { depth: bendo.sefini, bevelEnabled: false });
    geometrio.rotateY(-Math.PI / 2);
    geometrio.translate(-bendo.ofseto + bendo.sefini / 0o2, 0, 0);
    habakaweKatoma.tlunakani(geometrio, bendo.pukek, matrico);
  }
  const hateru = specimenoj.map(s => s.hateru);
  // ⟨ ꞙɭı , ꞙɭı , 📏 ⟩ , ꞙɭı , ꞙɭı , ꞙɭɿ ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  for ( let i = 1; i < specimenoj.length; i++ ) {
    const antauxa = specimenoj[i - 1];
    const nuna = specimenoj[i];
    vojSuprajxoj.push({ x1: x1 + ndx * antauxa.s, z1: z1 + ndz * antauxa.s,
      x2: x1 + ndx * nuna.s, z2: z1 + ndz * nuna.s, p2somani: eksteraDuon,
      y0: antauxa.hateru, y1: nuna.hateru });
  }
  return { xaqadi: hateru[0], z2hak: hateru[hateru.length - 1] };
}

// ⟪ ꞙɭı , ꞙɭı 📏 ⟫
/* ꞙɭı , ꞙɭı , ſɭэ ֭ſɭэ ,
    @param bendoj ( VojBendo [ ] ) - ſɭэ ֭ſɭэ , ꞙɭı ,
@returns p2somani ( number ) - ꞙɭı , ꞙɭı , */
export function kf2EksteranDuonon( bendoj: readonly VojBendo[] ): number {
  let p2somani = 0;
  for ( const bendo of bendoj ) {
    const pukaz = Math.abs(bendo.ofseto) + bendo.sefini / 2;
    if ( pukaz > p2somani ) p2somani = pukaz;
  }
  return p2somani;
}
