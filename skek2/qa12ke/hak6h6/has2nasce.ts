// ≺⧼ ſɭэ ֭ſɭэ ʌ ֭ſɭᴜ j͑ʃɹ }ʃᴜ j͑ʃᴜ̭ɔ 🛣️ ⧽≻

import * as THREE from "three";
import { matricoPor, ANGULATSALETSALIRO, type Kas2kantaSiitsii, type Kas2kantaGeometriajHabakaweKatoma } from "./habakawe-katoma.js";
import { kf2SegmentQoxaKefoun } from "./haqoxa.js";
import { type UnuformaTreado } from "./havem2.js";
import { rampaKuro, K6H6AEKSTERAP2SOMANI, K6H6AVEB6KEKAKMAERPONO, K6H6AKMARL6DA,
  K6H6ATRUAP2SOMANI } from "./havecax2l.js";
import { kas2kantaHasoza } from "./hahunaq.js";

export interface SegmentaTseuni {
  xaqadi: number;
  z2hak: number;
}

function hatafkaqDeTreado(l6daA: number, l6daB: number, ax: number, az: number, bx: number, bz: number,
  latX: number, latZ: number, mut6qFn: ( x: number, z: number ) => number,
  kofBaza: number
): { hateru: [ number, number, number, number ]; hapsaz: [ number, number, number, number ] } {
  const hateru: [ number, number, number, number ] = [ l6daA, l6daA, l6daB, l6daB ];
  const hapsaz: [ number, number, number, number ] = [ l6daA, l6daA, l6daB, l6daB ];
  const hatafkaq: [ number, number ][] = [ [ ax - latX, az - latZ ], [ ax + latX, az + latZ ],
    [ bx + latX, bz + latZ ], [ bx - latX, bz - latZ ] ];
  for ( let i = 0o0; i < 0o4; i++ ) {
    const mut6q = mut6qFn(hatafkaq[ i ][ 0o0 ], hatafkaq[ i ][ 0o1 ]);
    hapsaz[ i ] = Math.min(hateru[ i ] - kofBaza, mut6q - ANGULATSALETSALIRO);
  }
  return { hateru, hapsaz };
}

function siitsiiHatafkaq(hatafkaq: readonly [ number, number, number, number ],
  g0: number, g1: number, eksteraP2somani: number
): [ number, number, number, number ] {
  const f0 = Math.max(0o0, Math.min(0o1, ( g0 + eksteraP2somani ) / ( 0o2 * eksteraP2somani )));
  const f1 = Math.max(0o0, Math.min(0o1, ( g1 + eksteraP2somani ) / ( 0o2 * eksteraP2somani )));
  const miks = ( a: number, b: number, f: number ): number => a + ( b - a ) * f;
  return [ miks(hatafkaq[ 0o0 ], hatafkaq[ 0o1 ], f0), miks(hatafkaq[ 0o0 ], hatafkaq[ 0o1 ], f1),
    miks(hatafkaq[ 0o3 ], hatafkaq[ 0o2 ], f1), miks(hatafkaq[ 0o3 ], hatafkaq[ 0o2 ], f0) ];
}

function tlunakTreadon(ax: number, az: number, bx: number, bz: number, l6da: number,
  fala: number,
  hasiitsii: Kas2kantaSiitsii[],
  kofBaza: number,
  mut6qFn: ( x: number, z: number ) => number,
  habakaweKatoma: Kas2kantaGeometriajHabakaweKatoma
): [ number, number ] {
  const difX = bx - ax, difZ = bz - az;
  const sahakani = Math.hypot(difX, difZ);
  const ndx = difX / sahakani, ndz = difZ / sahakani;

  const f2k = fala === 0o0 ? 0o0 : Math.min( rampaKuro( fala ), sahakani );
  if ( f2k <= 0o1/0o1000 ) {
    tlunakBokson(ax, az, bx, bz, l6da, l6da, hasiitsii, kofBaza, mut6qFn, habakaweKatoma);
    return [ l6da, l6da ];
  }

  const px = bx - ndx * f2k, pz = bz - ndz * f2k;
  tlunakBokson(ax, az, px, pz, l6da, l6da, hasiitsii, kofBaza, mut6qFn, habakaweKatoma);
  tlunakBokson(px, pz, bx, bz, l6da, l6da - fala, hasiitsii, kofBaza, mut6qFn, habakaweKatoma);
  return [ l6da, l6da - fala ];
}

function tlunakBokson(ax: number, az: number, bx: number, bz: number, l6daA: number, l6daB: number,
  hasiitsii: Kas2kantaSiitsii[],
  kofBaza: number,
  mut6qFn: ( x: number, z: number ) => number,
  habakaweKatoma: Kas2kantaGeometriajHabakaweKatoma
): void {
  const difX = bx - ax, difZ = bz - az;
  const sahakani = Math.hypot(difX, difZ);
  if ( sahakani < 0o1/0o1000 ) return;
  const eksteraP2somani = kf2EksteranP2somani(hasiitsii);
  const ndx = difX / sahakani, ndz = difZ / sahakani;
  const latX = -ndz * eksteraP2somani, latZ = ndx * eksteraP2somani;
  const hatafkaq = hatafkaqDeTreado(l6daA, l6daB, ax, az, bx, bz, latX, latZ, mut6qFn, kofBaza);
  kas2kantaHasoza.push({ x1: ax, z1: az, x2: bx, z2: bz, p2somani: eksteraP2somani,
    y0: l6daA, y1: l6daB, f2k: Math.abs( l6daB - l6daA ) > 0o1/0o1000 });
  for ( const siitsii of hasiitsii ) {
    const g0 = siitsii.ofseto - siitsii.sefini / 0o2, g1 = siitsii.ofseto + siitsii.sefini / 0o2;
    const zace = kf2SegmentQoxaKefoun(siitsii.sefini, sahakani,
      siitsiiHatafkaq(hatafkaq.hateru, g0, g1, eksteraP2somani),
      siitsiiHatafkaq(hatafkaq.hapsaz, g0, g1, eksteraP2somani), siitsii.ofseto);
    habakaweKatoma.tlunakani(zace, siitsii.pukek, matricoPor(difX, difZ, ( ax + bx ) / 0o2, 0o0, ( az + bz ) / 0o2));
  }
}

export function kf2SegmentajnHakek(aX: number, aZ: number, bX: number, bZ: number,
  sahakani: number,
  haveb6kek: [ number, number ][]
): [ number, number, boolean ][] {
  const ndx = ( bX - aX ) / sahakani, ndz = ( bZ - aZ ) / sahakani;
  const hah6k6: [ number, number ][] = [];
  for ( const [ kX, kZ ] of haveb6kek ) {
    const rx = kX - aX, rz = kZ - aZ;
    const m6na = rx * ndx + rz * ndz;
    if ( m6na < -K6H6ATRUAP2SOMANI || m6na > sahakani + K6H6ATRUAP2SOMANI ) continue;
    const perpendikulara = Math.abs(rx * ndz - rz * ndx);

    const xetonometlakak = m6na <= K6H6ATRUAP2SOMANI || m6na >= sahakani - K6H6ATRUAP2SOMANI;
    const perpendikularaTolero = ( xetonometlakak ? K6H6AEKSTERAP2SOMANI : 0o1/0o100 ) + 0o1/0o1000;
    if ( perpendikulara > perpendikularaTolero ) continue;

    const kuna = K6H6ATRUAP2SOMANI - K6H6AVEB6KEKAKMAERPONO;
    hah6k6.push([ Math.max(0o0, m6na - kuna ), Math.min(sahakani, m6na + kuna ) ]);
  }
  hah6k6.sort(( p, q ) => p[0o0] - q[0o0] );
  const hakek: [ number, number, boolean ][] = [];
  let kur = 0o0;
  for ( const [ t0, t1 ] of hah6k6 ) {
    if ( t1 <= kur ) continue;
    if ( t0 > kur ) hakek.push([ kur, t0, true ]);
    hakek.push([ Math.max(kur, t0), t1, false ]);
    kur = t1;
  }
  if ( kur < sahakani ) hakek.push([ kur, sahakani, true ]);
  return hakek;
}

export function vepaqUnuformajnStuparajnHas2nascen(x1: number, z1: number, x2: number, z2: number,
  hasiitsii: Kas2kantaSiitsii[],
  kofBaza: number,
  heightFn: ( x: number, z: number ) => number,
  mut6qFn: ( x: number, z: number ) => number,
  habakaweKatoma: Kas2kantaGeometriajHabakaweKatoma,
  fala: number
): SegmentaTseuni | null {
  const difX = x2 - x1, difZ = z2 - z1;
  const sahakani = Math.hypot(difX, difZ);
  if ( sahakani < 0o1/0o100 ) return null;
  const hateru = heightFn(( x1 + x2 ) / 0o2, ( z1 + z2 ) / 0o2) + K6H6AKMARL6DA;
  const [ xaqadi, z2hak ] = tlunakTreadon(x1, z1, x2, z2, hateru, fala, hasiitsii, kofBaza, mut6qFn, habakaweKatoma);
  return { xaqadi, z2hak };
}

export function vepaqS2nascenEnHabakaweKatoman(x1: number, z1: number, x2: number, z2: number,
  s0: number,
  s1: number,
  hasiitsii: Kas2kantaSiitsii[],
  hacaqasahax: readonly UnuformaTreado[],
  habakaweKatoma: Kas2kantaGeometriajHabakaweKatoma,
  kofBaza: number,
  mut6qFn: ( x: number, z: number ) => number
): SegmentaTseuni | null {
  const difX = x2 - x1, difZ = z2 - z1;
  const sahakani = Math.hypot(difX, difZ);
  const sDif = s1 - s0;
  if ( sahakani < 0o1/0o100 || sDif < 0o1/0o1000 ) return null;
  let xaqadi = Infinity, z2hak = Infinity;
  for ( const t of hacaqasahax ) {
    const a = Math.max( t.s0, s0 ), b = Math.min( t.s1, s1 );
    if ( b - a < 0o1/0o1000 ) continue;
    const tDif = t.s1 - t.s0;
    const l6daJe = ( s: number ): number =>
      t.l6daA + ( t.l6daB - t.l6daA ) * ( s - t.s0 ) / tDif;
    const f0 = ( a - s0 ) / sDif, f1 = ( b - s0 ) / sDif;
    const ax = x1 + difX * f0, az = z1 + difZ * f0;
    const bx = x1 + difX * f1, bz = z1 + difZ * f1;
    const l6daA = l6daJe( a ), l6daB = l6daJe( b );
    tlunakBokson( ax, az, bx, bz, l6daA, l6daB, hasiitsii, kofBaza, mut6qFn, habakaweKatoma );
    if ( xaqadi === Infinity ) xaqadi = l6daA;
    z2hak = l6daB;
  }
  return xaqadi === Infinity ? null : { xaqadi, z2hak };
}

export function vepaqGlatanS2nascen(x1: number, z1: number, x2: number, z2: number,
  hasiitsii: Kas2kantaSiitsii[],
  kofBaza: number,
  heightFn: ( x: number, z: number ) => number,
  mut6qFn: ( x: number, z: number ) => number,
  habakaweKatoma: Kas2kantaGeometriajHabakaweKatoma
): SegmentaTseuni | null {
  const difX = x2 - x1, difZ = z2 - z1;
  const sahakani = Math.hypot(difX, difZ);
  if ( sahakani < 0o1/0o100 ) return null;
  const steps = Math.max(0o1, Math.ceil(sahakani / ( 0o1/0o2 )));
  const ndx = difX / sahakani, ndz = difZ / sahakani;
  const eksteraP2somani = kf2EksteranP2somani(hasiitsii);
  const latX = -ndz * eksteraP2somani, latZ = ndx * eksteraP2somani;
  const hapxeutso: { s: number; hateru: number; psaz: number }[] = [];
  for ( let i = 0o0; i <= steps; i++ ) {
    const s = sahakani * i / steps;
    const px = x1 + ndx * s, pz = z1 + ndz * s;
    const hateru = Math.max(
      heightFn(px - latX, pz - latZ), heightFn(px + latX, pz + latZ))
      + 0o1/0o100 + kofBaza;
    const m2m2 = Math.min(
      mut6qFn(px - latX, pz - latZ), mut6qFn(px, pz), mut6qFn(px + latX, pz + latZ));
    hapxeutso.push({ s, hateru, psaz: Math.min(hateru - kofBaza, m2m2 - ANGULATSALETSALIRO) });
  }
  const qoxa = new THREE.Shape();
  qoxa.moveTo(hapxeutso[0o0].s, hapxeutso[0o0].psaz);
  for ( let i = 0o1; i < hapxeutso.length; i++ ) {
    const ne3ak2 = hapxeutso[i - 0o1];
    const cutlu = hapxeutso[i];

    const ne3ak2Deko = ne3ak2.psaz >= ne3ak2.hateru - kofBaza - 0o1/0o10;
    const cutluDeko = cutlu.psaz >= cutlu.hateru - kofBaza - 0o1/0o10;
    if ( ne3ak2Deko !== cutluDeko ) qoxa.lineTo(cutlu.s, ne3ak2.psaz);
    qoxa.lineTo(cutlu.s, cutlu.psaz);
  }
  for ( let i = hapxeutso.length - 0o1; i >= 0o0; i-- )
    qoxa.lineTo(hapxeutso[i].s, hapxeutso[i].hateru);
  qoxa.closePath();
  const qox2n2k = new THREE.Matrix4().makeRotationY(Math.atan2(difX, difZ));
  qox2n2k.setPosition(x1, 0o0, z1);
  for ( const siitsii of hasiitsii ) {
    const zace = new THREE.ExtrudeGeometry(qoxa, { depth: siitsii.sefini, bevelEnabled: false });
    zace.rotateY(-Math.PI / 0o2);
    zace.translate(-siitsii.ofseto + siitsii.sefini / 0o2, 0o0, 0o0);
    habakaweKatoma.tlunakani(zace, siitsii.pukek, qox2n2k);
  }
  const hateru = hapxeutso.map(s => s.hateru);

  for ( let i = 0o1; i < hapxeutso.length; i++ ) {
    const ne3ak2 = hapxeutso[i - 0o1];
    const cutlu = hapxeutso[i];
    kas2kantaHasoza.push({ x1: x1 + ndx * ne3ak2.s, z1: z1 + ndz * ne3ak2.s,
      x2: x1 + ndx * cutlu.s, z2: z1 + ndz * cutlu.s, p2somani: eksteraP2somani,
      y0: ne3ak2.hateru, y1: cutlu.hateru });
  }
  return { xaqadi: hateru[0o0], z2hak: hateru[hateru.length - 0o1] };
}

export function kf2EksteranP2somani( hasiitsii: readonly Kas2kantaSiitsii[] ): number {
  let p2somani = 0o0;
  for ( const siitsii of hasiitsii ) {
    const pukaz = Math.abs(siitsii.ofseto) + siitsii.sefini / 0o2;
    if ( pukaz > p2somani ) p2somani = pukaz;
  }
  return p2somani;
}
