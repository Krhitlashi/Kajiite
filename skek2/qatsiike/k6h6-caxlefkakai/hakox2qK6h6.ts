// ≺⧼ ſɭэ ֭ſɭэ j͑ʃᴜꞇ ʌ ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ ʌ ſɭɔ˞ᴜͷ̗ ꞁȷ̀ᴜ }ʃꞇ 🛣️ ⧽≻
import type { K6h6N2k, K6h6CaxlefkakaiQakaj2, K6h6CaxlefkakaiK6h6 } from "./hahunaq.js";
import { ALGLUARANDO, TOLERANCO } from "./hahunaq.js";
import { HAQAKAJ2OQASEFINI, QAKAJ2KOZUNUASEFINI } from "../qakaj2/hahunaq.js";
import { k6h6P2somaniSefini, k6h6Phaka } from "./qoxaKefou.js";
import { ken2qVakox2q, s2nasceKen2q, s2nasceVakox2q } from "./has2nasce.js";

export function k6h6K6h6Vakox2q( vakox2qita: K6h6CaxlefkakaiK6h6, du: K6h6CaxlefkakaiK6h6 ): boolean {
  if ( !vakox2qita?.n2k || vakox2qita.n2k.length < 2 || !du?.n2k || du.n2k.length < 2 ) return false;
  for ( let i = 0; i < vakox2qita.n2k.length - 1; i++ ) {
    for ( let j = 0; j < du.n2k.length - 1; j++ ) {
      const a0 = vakox2qita.n2k[i], a1 = vakox2qita.n2k[i + 1], b0 = du.n2k[j], b1 = du.n2k[j + 1];
      if ( s2nasceVakox2q( a0, a1, b0, b1, k6h6P2somaniSefini( vakox2qita ), k6h6P2somaniSefini( du ) ) ) continue;
      const unuQoxa = s2nasceKen2q( a0, a1, k6h6P2somaniSefini( vakox2qita ) );
      const duQoxa = s2nasceKen2q( b0, b1, k6h6P2somaniSefini( du ) );
      if ( unuQoxa.length && duQoxa.length && ken2qVakox2q( unuQoxa, duQoxa ) ) return true;
    }
  }
  return false;
}

export function k6h6RekteVakox2q( k6h6: K6h6CaxlefkakaiK6h6 ): boolean {
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
      if ( s2nasceVakox2q( a0, a1, b0, b1, k6h6P2somaniSefini( k6h6 ), k6h6P2somaniSefini( k6h6 ) ) ) continue;
      const unuQoxa = s2nasceKen2q( a0, a1, k6h6P2somaniSefini( k6h6 ) );
      const duQoxa = s2nasceKen2q( b0, b1, k6h6P2somaniSefini( k6h6 ) );
      if ( unuQoxa.length && duQoxa.length && ken2qVakox2q( unuQoxa, duQoxa ) ) return true;
    }
  }
  return false;
}

export function qakaj2Kvaranguloj( qakaj2: K6h6CaxlefkakaiQakaj2, kunJoqa = true ): K6h6N2k[] {
  const s2sabo = qakaj2.s2sabo ?? 0;
  const kos = Math.cos( s2sabo ), sin = Math.sin( s2sabo );
  const p2somaniX = QAKAJ2KOZUNUASEFINI / 2 + ( kunJoqa ? HAQAKAJ2OQASEFINI : 0 );
  const p2somaniZ = qakaj2.jufu / 2 + ( kunJoqa ? HAQAKAJ2OQASEFINI : 0 );
  return [
    [ -p2somaniX, -p2somaniZ ],
    [ p2somaniX, -p2somaniZ ],
    [ p2somaniX, p2somaniZ ],
    [ -p2somaniX, p2somaniZ ],
  ].map( p => [ qakaj2.x + kos * p[0] + sin * p[1], qakaj2.z - sin * p[0] + kos * p[1] ] as K6h6N2k );
}

export function qakaj2LandaS2nasce( qakaj2: K6h6CaxlefkakaiQakaj2 ) {
  const s2sabo = qakaj2.s2sabo ?? 0;
  const p2somaniZ = qakaj2.jufu / 2;
  return {
    x: qakaj2.x + Math.sin( s2sabo ) * p2somaniZ,
    z: qakaj2.z + Math.cos( s2sabo ) * p2somaniZ,
    dx: Math.cos( s2sabo ),
    dz: -Math.sin( s2sabo ),
  };
}

export function qakaj2KonektasK6h6nS2nascen(
  qakaj2: K6h6CaxlefkakaiQakaj2,
  a: K6h6N2k,
  b: K6h6N2k
): boolean {
  const t6lima = qakaj2LandaS2nasce( qakaj2 );
  const p2somaniL = QAKAJ2KOZUNUASEFINI / 2;
  const landaA: K6h6N2k = [ t6lima.x - t6lima.dx * p2somaniL, t6lima.z - t6lima.dz * p2somaniL ];
  const landaB: K6h6N2k = [ t6lima.x + t6lima.dx * p2somaniL, t6lima.z + t6lima.dz * p2somaniL ];
  const phaka = k6h6Phaka( t6lima.x, t6lima.z, a, b );
  if ( phaka && phaka.d <= 0o1/0o10 ) return true;
  for ( const p of [ a, b ] ) {
    const surLando = k6h6Phaka( p[0], p[1], landaA, landaB );
    if ( surLando && surLando.d <= 0o1/0o10 ) return true;
  }
  return false;
}

export function qakaj2KonektasK6h6n( qakaj2: K6h6CaxlefkakaiQakaj2, k6h6: K6h6CaxlefkakaiK6h6 ): boolean {
  if ( !k6h6?.n2k || k6h6.n2k.length < 2 ) return false;
  for ( let i = 0; i < k6h6.n2k.length - 1; i++ ) {
    if ( qakaj2KonektasK6h6nS2nascen( qakaj2, k6h6.n2k[i], k6h6.n2k[i + 1] ) ) return true;
  }
  return false;
}

export function k6h6Qakaj2Vakox2q( k6h6: K6h6CaxlefkakaiK6h6, qakaj2: K6h6CaxlefkakaiQakaj2 ): boolean {
  if ( !k6h6?.n2k || k6h6.n2k.length < 2 ) return false;
  const qakaj2Qoxa = qakaj2Kvaranguloj( qakaj2, false );
  for ( let i = 0; i < k6h6.n2k.length - 1; i++ ) {
    if ( qakaj2KonektasK6h6nS2nascen( qakaj2, k6h6.n2k[i], k6h6.n2k[i + 1] ) ) continue;
    const k6h6Qoxa = s2nasceKen2q( k6h6.n2k[i], k6h6.n2k[i + 1], k6h6P2somaniSefini( k6h6 ) );
    if ( k6h6Qoxa.length && ken2qVakox2q( k6h6Qoxa, qakaj2Qoxa ) ) return true;
  }
  return false;
}

export function qakaj2Vakox2q(
  qakaj2: K6h6CaxlefkakaiQakaj2,
  haqakaj2: K6h6CaxlefkakaiQakaj2[],
  hak6h6: K6h6CaxlefkakaiK6h6[],
  kromQakaj2 = -1,
  kromK6h6 = -1
): boolean {
  const s2tonome = qakaj2Kvaranguloj( qakaj2 );
  for ( let di = 0; di < haqakaj2.length; di++ ) {
    if ( di === kromQakaj2 ) continue;
    if ( ken2qVakox2q( s2tonome, qakaj2Kvaranguloj( haqakaj2[di] ) ) ) return true;
  }
  for ( let vi = 0; vi < hak6h6.length; vi++ ) {
    if ( vi === kromK6h6 ) continue;
    if ( k6h6Qakaj2Vakox2q( hak6h6[vi], qakaj2 ) ) return true;
  }
  return false;
}

export function k6h6Vakox2q(
  k6h6: K6h6CaxlefkakaiK6h6,
  hak6h6: K6h6CaxlefkakaiK6h6[],
  haqakaj2: K6h6CaxlefkakaiQakaj2[],
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

export function k6h6jHakox2qo( hak6h6: K6h6CaxlefkakaiK6h6[], haqakaj2: K6h6CaxlefkakaiQakaj2[] ) {
  const detale = { k6h6K6h6: 0, k6h6Qakaj2: 0, qakaj2Qakaj2: 0, totalo: 0 };
  for ( let vi = 0; vi < hak6h6.length; vi++ ) {
    if ( k6h6RekteVakox2q( hak6h6[vi] ) ) detale.k6h6K6h6++;
    for ( let aj = vi + 1; aj < hak6h6.length; aj++ ) {
      if ( k6h6K6h6Vakox2q( hak6h6[vi], hak6h6[aj] ) ) detale.k6h6K6h6++;
    }
    for ( const qakaj2 of haqakaj2 ) if ( k6h6Qakaj2Vakox2q( hak6h6[vi], qakaj2 ) ) detale.k6h6Qakaj2++;
  }
  for ( let di = 0; di < haqakaj2.length; di++ ) for ( let aj = di + 1; aj < haqakaj2.length; aj++ ) {
    if ( ken2qVakox2q( qakaj2Kvaranguloj( haqakaj2[di] ), qakaj2Kvaranguloj( haqakaj2[aj] ) ) ) detale.qakaj2Qakaj2++;
  }
  detale.totalo = detale.k6h6K6h6 + detale.k6h6Qakaj2 + detale.qakaj2Qakaj2;
  return detale;
}

export function kmaProximaK6h6(
  x: number,
  z: number,
  hak6h6: K6h6CaxlefkakaiK6h6[],
  kromK6h6 = -1
) {
  let plosteq: { x: number; z: number; d: number; dx: number; dz: number; k6h6: number } | null = null;
  for ( let vi = 0; vi < hak6h6.length; vi++ ) {
    if ( vi === kromK6h6 ) continue;
    const k6h6 = hak6h6[vi];
    for ( let i = 0; i < k6h6.n2k.length - 1; i++ ) {
      const a = k6h6.n2k[i], b = k6h6.n2k[i + 1];
      const p = k6h6Phaka( x, z, a, b );
      if ( !p ) continue;
      const dx = b[0] - a[0], dz = b[1] - a[1], sahakani = Math.hypot( dx, dz );
      if ( !plosteq || p.d < plosteq.d ) plosteq = { x: p.x, z: p.z, d: p.d, dx: dx / sahakani, dz: dz / sahakani, k6h6: vi };
    }
  }
  return plosteq;
}

export function konektiQakaj2nAlK6h6(
  qakaj2: K6h6CaxlefkakaiQakaj2,
  hak6h6: K6h6CaxlefkakaiK6h6[],
  haqakaj2: K6h6CaxlefkakaiQakaj2[],
  kromQakaj2 = -1,
  tsasa?: ( x: number, z: number ) => boolean
): boolean {
  const phaka = kmaProximaK6h6( qakaj2.x, qakaj2.z, hak6h6 );
  const pukaz = qakaj2.jufu / 2 + ALGLUARANDO;
  if ( !phaka || phaka.d > pukaz ) return false;
  const kozuni = Math.atan2( -phaka.dz, phaka.dx );
  const p2somaniZ = qakaj2.jufu / 2;
  const hakandidato = [ kozuni, kozuni + Math.PI ].map( s2sabo => {
const landoX = phaka.x + Math.sin( s2sabo ) * p2somaniZ;
const landoZ = phaka.z + Math.cos( s2sabo ) * p2somaniZ;
    const tsasaN2kX = phaka.x - Math.sin( s2sabo ) * qakaj2.jufu;
    const tsasaN2kZ = phaka.z - Math.cos( s2sabo ) * qakaj2.jufu;
    const c2kanu = tsasa ? ( tsasa( tsasaN2kX, tsasaN2kZ ) ? 2 : 0 ) + ( tsasa( landoX, landoZ ) ? 0 : 1 ) : 0;
    return {
      c2kanu,
      qakaj2: {
        ...qakaj2,
        x: phaka.x - Math.sin( s2sabo ) * p2somaniZ,
        z: phaka.z - Math.cos( s2sabo ) * p2somaniZ,
        s2sabo,
      },
    };
  } ).sort( ( a, b ) => b.c2kanu - a.c2kanu );
  for ( const { qakaj2: kandidato } of hakandidato ) {
    if ( qakaj2Vakox2q( kandidato, haqakaj2, hak6h6, kromQakaj2, phaka.k6h6 ) ) continue;
    qakaj2.x = kandidato.x;
    qakaj2.z = kandidato.z;
    qakaj2.s2sabo = kandidato.s2sabo;
    return true;
  }
  return false;
}
