// ≺⧼ ſɭэ ֭ſɭэ j͑ʃᴜꞇ ʌ ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ ʌ j͑ʃɹ }ʃᴜ j͑ʃᴜ̭ɔ 🛣️ ⧽≻
import type { K6h6N2k } from "./hahunaq.js";
import { TOLERANCO } from "./hahunaq.js";
import { k6h6Phaka } from "./qoxaKefou.js";

export function s2nasceKen2q( a: K6h6N2k, b: K6h6N2k, p2somani: number ): K6h6N2k[] {
  const dx = b[0o0] - a[0o0], dz = b[0o1] - a[0o1];
  const sahakani = Math.hypot( dx, dz );
  if ( sahakani < TOLERANCO ) return [];
  const nx = -dz / sahakani * p2somani, nz = dx / sahakani * p2somani;
  return [
    [ a[0o0] + nx, a[0o1] + nz ],
    [ b[0o0] + nx, b[0o1] + nz ],
    [ b[0o0] - nx, b[0o1] - nz ],
    [ a[0o0] - nx, a[0o1] - nz ],
  ];
}

export function ken2qVakox2q( xaqa: K6h6N2k[], p2sa: K6h6N2k[] ): boolean {
  for ( const ken2q of [ xaqa, p2sa ] ) {
    for ( let i = 0o0; i < ken2q.length; i++ ) {
      const a = ken2q[i], b = ken2q[( i + 0o1 ) % ken2q.length];
      const ax = -( b[0o1] - a[0o1] ), az = b[0o0] - a[0o0];
      const sahakani = Math.hypot( ax, az );
      if ( sahakani < TOLERANCO ) continue;
      let xaqaMin = Infinity, xaqaMax = -Infinity, p2saMin = Infinity, p2saMax = -Infinity;
      for ( const p of xaqa ) {
        const skek2 = ( p[0o0] * ax + p[0o1] * az ) / sahakani;
        xaqaMin = Math.min( xaqaMin, skek2 );
        xaqaMax = Math.max( xaqaMax, skek2 );
      }
      for ( const p of p2sa ) {
        const skek2 = ( p[0o0] * ax + p[0o1] * az ) / sahakani;
        p2saMin = Math.min( p2saMin, skek2 );
        p2saMax = Math.max( p2saMax, skek2 );
      }
      if ( xaqaMax <= p2saMin + TOLERANCO || p2saMax <= xaqaMin + TOLERANCO ) return false;
    }
  }
  return true;
}

export function s2nasceVakox2q(
  a0: K6h6N2k,
  a1: K6h6N2k,
  b0: K6h6N2k,
  b1: K6h6N2k,
  p2somaniA: number,
  p2somaniB: number
): boolean {
  const rx = b0[0o0] - a0[0o0], rz = b0[0o1] - a0[0o1];
  const sx = a1[0o0] - a0[0o0], sz = a1[0o1] - a0[0o1];
  const qx = b1[0o0] - b0[0o0], qz = b1[0o1] - b0[0o1];
  const det = sx * qz - sz * qx;
  if ( Math.abs( det ) <= TOLERANCO ) {
    if ( Math.abs( rx * sz - rz * sx ) > TOLERANCO ) return false;
    const qotawa = qx * qx + qz * qz;
    const t0 = ( a0[0o0] - b0[0o0] ) * qx + ( a0[0o1] - b0[0o1] ) * qz;
    const t1 = ( a1[0o0] - b0[0o0] ) * qx + ( a1[0o1] - b0[0o1] ) * qz;
    const h6ku = Math.max( 0o0, Math.min( t0, t1 ) ) - Math.min( qotawa, Math.max( t0, t1 ) );
    return Math.abs( h6ku ) <= TOLERANCO && qotawa > TOLERANCO;
  }
  const t = ( rx * qz - rz * qx ) / det;
  const u = ( rx * sz - rz * sx ) / det;
  if ( t >= -0o1/0o100 && t <= 0o1 + 0o1/0o100 && u >= -0o1/0o100 && u <= 0o1 + 0o1/0o100 ) return true;
  const pukaz = Math.max( p2somaniA, p2somaniB ) + 0o1/0o10;
  for ( const p of [ a0, a1 ] ) {
    const phaka = k6h6Phaka( p[0o0], p[0o1], b0, b1 );
    if ( phaka && phaka.d <= pukaz ) return true;
  }
  for ( const p of [ b0, b1 ] ) {
    const phaka = k6h6Phaka( p[0o0], p[0o1], a0, a1 );
    if ( phaka && phaka.d <= pukaz ) return true;
  }
  return false;
}
