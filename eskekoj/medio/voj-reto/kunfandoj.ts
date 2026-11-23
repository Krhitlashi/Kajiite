// ≺⧼ ſɭэ ֭ſɭэ j͑ʃᴜꞇ ʌ ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ ʌ ſɭɔ˞ᴜͷ̗ ꞁȷ̀ᴜ }ʃꞇ 🛣️ ⧽≻
import type { K6h6Punkto, K6h6RetoQakaj2, K6h6RetoK6h6 } from "./hahunaq.js";
import { ALGLUA_RANDO, TOLERANCO } from "./hahunaq.js";
import { DOKO_JOQA_SEFINI, DOKO_PLATFORMA_SEFINI } from "../qakaj2/hahunaq.js";
import { k6h6DuonLargho, k6h6Projekcio } from "./geometrio.js";
import { konveksajVakox2q, segmentKvaranguloj, has2nasceKonektas } from "./has2nasce.js";

export function k6h6K6h6Vakox2q( unu: K6h6RetoK6h6, du: K6h6RetoK6h6 ): boolean {
  if ( !unu?.n2k || unu.n2k.length < 2 || !du?.n2k || du.n2k.length < 2 ) return false;
  for ( let i = 0; i < unu.n2k.length - 1; i++ ) {
    for ( let j = 0; j < du.n2k.length - 1; j++ ) {
      const a0 = unu.n2k[i], a1 = unu.n2k[i + 1], b0 = du.n2k[j], b1 = du.n2k[j + 1];
      if ( has2nasceKonektas( a0, a1, b0, b1, k6h6DuonLargho( unu ), k6h6DuonLargho( du ) ) ) continue;
      const unuQoxa = segmentKvaranguloj( a0, a1, k6h6DuonLargho( unu ) );
      const duQoxa = segmentKvaranguloj( b0, b1, k6h6DuonLargho( du ) );
      if ( unuQoxa.length && duQoxa.length && konveksajVakox2q( unuQoxa, duQoxa ) ) return true;
    }
  }
  return false;
}

export function k6h6RekteVakox2q( k6h6: K6h6RetoK6h6 ): boolean {
  if ( !k6h6?.n2k || k6h6.n2k.length < 3 ) return false;
  for ( let i = 0; i < k6h6.n2k.length - 1; i++ ) {
    for ( let j = i + 1; j < k6h6.n2k.length - 1; j++ ) {
      const a0 = k6h6.n2k[i], a1 = k6h6.n2k[i + 1], b0 = k6h6.n2k[j], b1 = k6h6.n2k[j + 1];
      if ( j === i + 1 ) {
        const adx = a1[0] - a0[0], adz = a1[1] - a0[1], bdx = b1[0] - b0[0], bdz = b1[1] - b0[1];
        const al = Math.hypot( adx, adz ), bl = Math.hypot( bdx, bdz );
        if ( al > TOLERANCO && bl > TOLERANCO
          && ( adx * bdx + adz * bdz ) / ( al * bl ) >= -0o1/0o100 ) continue;
      }
      if ( has2nasceKonektas( a0, a1, b0, b1, k6h6DuonLargho( k6h6 ), k6h6DuonLargho( k6h6 ) ) ) continue;
      const unuQoxa = segmentKvaranguloj( a0, a1, k6h6DuonLargho( k6h6 ) );
      const duQoxa = segmentKvaranguloj( b0, b1, k6h6DuonLargho( k6h6 ) );
      if ( unuQoxa.length && duQoxa.length && konveksajVakox2q( unuQoxa, duQoxa ) ) return true;
    }
  }
  return false;
}

export function qakaj2Kvaranguloj( qakaj2: K6h6RetoQakaj2, kunJoqa = true ): K6h6Punkto[] {
  const rotacio = qakaj2.rotacio ?? 0;
  const kos = Math.cos( rotacio ), sin = Math.sin( rotacio );
  const duonX = DOKO_PLATFORMA_SEFINI / 2 + ( kunJoqa ? DOKO_JOQA_SEFINI : 0 );
  const duonZ = qakaj2.profundo / 2 + ( kunJoqa ? DOKO_JOQA_SEFINI : 0 );
  return [
    [ -duonX, -duonZ ],
    [ duonX, -duonZ ],
    [ duonX, duonZ ],
    [ -duonX, duonZ ],
  ].map( p => [ qakaj2.x + kos * p[0] + sin * p[1], qakaj2.z - sin * p[0] + kos * p[1] ] as K6h6Punkto );
}

export function qakaj2LandaS2nasce( qakaj2: K6h6RetoQakaj2 ) {
  const rotacio = qakaj2.rotacio ?? 0;
  const duonZ = qakaj2.profundo / 2;
  return {
    x: qakaj2.x + Math.sin( rotacio ) * duonZ,
    z: qakaj2.z + Math.cos( rotacio ) * duonZ,
    dx: Math.cos( rotacio ),
    dz: -Math.sin( rotacio ),
  };
}

export function qakaj2KonektasK6h6nS2nascen(
  qakaj2: K6h6RetoQakaj2,
  a: K6h6Punkto,
  b: K6h6Punkto
): boolean {
  const landa = qakaj2LandaS2nasce( qakaj2 );
  const duonL = DOKO_PLATFORMA_SEFINI / 2;
  const landaA: K6h6Punkto = [ landa.x - landa.dx * duonL, landa.z - landa.dz * duonL ];
  const landaB: K6h6Punkto = [ landa.x + landa.dx * duonL, landa.z + landa.dz * duonL ];
  const projekcio = k6h6Projekcio( landa.x, landa.z, a, b );
  if ( projekcio && projekcio.d <= 0o1/0o10 ) return true;
  for ( const p of [ a, b ] ) {
    const surLando = k6h6Projekcio( p[0], p[1], landaA, landaB );
    if ( surLando && surLando.d <= 0o1/0o10 ) return true;
  }
  return false;
}

export function qakaj2KonektasK6h6n( qakaj2: K6h6RetoQakaj2, k6h6: K6h6RetoK6h6 ): boolean {
  if ( !k6h6?.n2k || k6h6.n2k.length < 2 ) return false;
  for ( let i = 0; i < k6h6.n2k.length - 1; i++ ) {
    if ( qakaj2KonektasK6h6nS2nascen( qakaj2, k6h6.n2k[i], k6h6.n2k[i + 1] ) ) return true;
  }
  return false;
}

export function k6h6Qakaj2Vakox2q( k6h6: K6h6RetoK6h6, qakaj2: K6h6RetoQakaj2 ): boolean {
  if ( !k6h6?.n2k || k6h6.n2k.length < 2 ) return false;
  const qakaj2Qoxa = qakaj2Kvaranguloj( qakaj2, false );
  for ( let i = 0; i < k6h6.n2k.length - 1; i++ ) {
    if ( qakaj2KonektasK6h6nS2nascen( qakaj2, k6h6.n2k[i], k6h6.n2k[i + 1] ) ) continue;
    const k6h6Qoxa = segmentKvaranguloj( k6h6.n2k[i], k6h6.n2k[i + 1], k6h6DuonLargho( k6h6 ) );
    if ( k6h6Qoxa.length && konveksajVakox2q( k6h6Qoxa, qakaj2Qoxa ) ) return true;
  }
  return false;
}

export function qakaj2Vakox2q(
  qakaj2: K6h6RetoQakaj2,
  haqakaj2: K6h6RetoQakaj2[],
  hak6h6: K6h6RetoK6h6[],
  kromQakaj2 = -1,
  kromK6h6 = -1
): boolean {
  const alia = qakaj2Kvaranguloj( qakaj2 );
  for ( let di = 0; di < haqakaj2.length; di++ ) {
    if ( di === kromQakaj2 ) continue;
    if ( konveksajVakox2q( alia, qakaj2Kvaranguloj( haqakaj2[di] ) ) ) return true;
  }
  for ( let vi = 0; vi < hak6h6.length; vi++ ) {
    if ( vi === kromK6h6 ) continue;
    if ( k6h6Qakaj2Vakox2q( hak6h6[vi], qakaj2 ) ) return true;
  }
  return false;
}

export function k6h6Vakox2q(
  k6h6: K6h6RetoK6h6,
  hak6h6: K6h6RetoK6h6[],
  haqakaj2: K6h6RetoQakaj2[],
  kromK6h6 = -1
): boolean {
  if ( k6h6RekteVakox2q( k6h6 ) ) return true;
  for ( let vi = 0; vi < hak6h6.length; vi++ ) {
    if ( vi === kromK6h6 ) continue;
    if ( k6h6K6h6Vakox2q( k6h6, hak6h6[vi] ) ) return true;
  }
  for ( const qakaj2 of haqakaj2 ) {
    if ( k6h6Qakaj2Vakox2q( k6h6, qakaj2 ) ) return true;
  }
  return false;
}

export function k6h6jKunfandajxoj( hak6h6: K6h6RetoK6h6[], haqakaj2: K6h6RetoQakaj2[] ) {
  const detale = { k6h6K6h6: 0, k6h6Qakaj2: 0, qakaj2Qakaj2: 0, totalo: 0 };
  for ( let vi = 0; vi < hak6h6.length; vi++ ) {
    if ( k6h6RekteVakox2q( hak6h6[vi] ) ) detale.k6h6K6h6++;
    for ( let aj = vi + 1; aj < hak6h6.length; aj++ ) {
      if ( k6h6K6h6Vakox2q( hak6h6[vi], hak6h6[aj] ) ) detale.k6h6K6h6++;
    }
    for ( const qakaj2 of haqakaj2 ) if ( k6h6Qakaj2Vakox2q( hak6h6[vi], qakaj2 ) ) detale.k6h6Qakaj2++;
  }
  for ( let di = 0; di < haqakaj2.length; di++ ) for ( let aj = di + 1; aj < haqakaj2.length; aj++ ) {
    if ( konveksajVakox2q( qakaj2Kvaranguloj( haqakaj2[di] ), qakaj2Kvaranguloj( haqakaj2[aj] ) ) ) detale.qakaj2Qakaj2++;
  }
  detale.totalo = detale.k6h6K6h6 + detale.k6h6Qakaj2 + detale.qakaj2Qakaj2;
  return detale;
}

export function plejProximaK6h6(
  x: number,
  z: number,
  hak6h6: K6h6RetoK6h6[],
  kromK6h6 = -1
) {
  let plej: { x: number; z: number; d: number; dx: number; dz: number; k6h6: number } | null = null;
  for ( let vi = 0; vi < hak6h6.length; vi++ ) {
    if ( vi === kromK6h6 ) continue;
    const k6h6 = hak6h6[vi];
    for ( let i = 0; i < k6h6.n2k.length - 1; i++ ) {
      const a = k6h6.n2k[i], b = k6h6.n2k[i + 1];
      const p = k6h6Projekcio( x, z, a, b );
      if ( !p ) continue;
      const dx = b[0] - a[0], dz = b[1] - a[1], sahakani = Math.hypot( dx, dz );
      if ( !plej || p.d < plej.d ) plej = { x: p.x, z: p.z, d: p.d, dx: dx / sahakani, dz: dz / sahakani, k6h6: vi };
    }
  }
  return plej;
}

export function konektiQakaj2nAlK6h6(
  qakaj2: K6h6RetoQakaj2,
  hak6h6: K6h6RetoK6h6[],
  haqakaj2: K6h6RetoQakaj2[],
  kromQakaj2 = -1,
  akvas?: ( x: number, z: number ) => boolean
): boolean {
  const projekcio = plejProximaK6h6( qakaj2.x, qakaj2.z, hak6h6 );
  const pukaz = qakaj2.profundo / 2 + ALGLUA_RANDO;
  if ( !projekcio || projekcio.d > pukaz ) return false;
  const kozuni = Math.atan2( -projekcio.dz, projekcio.dx );
  const duonZ = qakaj2.profundo / 2;
  const kandidatoj = [ kozuni, kozuni + Math.PI ].map( rotacio => {
const landoX = projekcio.x + Math.sin( rotacio ) * duonZ;
const landoZ = projekcio.z + Math.cos( rotacio ) * duonZ;
    const akvaPunktoX = projekcio.x - Math.sin( rotacio ) * qakaj2.profundo;
    const akvaPunktoZ = projekcio.z - Math.cos( rotacio ) * qakaj2.profundo;
    const ponto = akvas ? ( akvas( akvaPunktoX, akvaPunktoZ ) ? 2 : 0 ) + ( akvas( landoX, landoZ ) ? 0 : 1 ) : 0;
    return {
      ponto,
      qakaj2: {
        ...qakaj2,
        x: projekcio.x - Math.sin( rotacio ) * duonZ,
        z: projekcio.z - Math.cos( rotacio ) * duonZ,
        rotacio,
      },
    };
  } ).sort( ( a, b ) => b.ponto - a.ponto );
  for ( const { qakaj2: kandidato } of kandidatoj ) {
    if ( qakaj2Vakox2q( kandidato, haqakaj2, hak6h6, kromQakaj2, projekcio.k6h6 ) ) continue;
    qakaj2.x = kandidato.x;
    qakaj2.z = kandidato.z;
    qakaj2.rotacio = kandidato.rotacio;
    return true;
  }
  return false;
}
