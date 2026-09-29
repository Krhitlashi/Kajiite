// ≺⧼ Voja reto — segmentoj 🛣️ ⧽≻
// La kvadrantoj de segmento kaj ilia interkovro — ĉu du vojaj
// segmentoj kruciĝas.
import type { VojaPunkto } from "./tipoj.js";
import { TOLERANCO } from "./tipoj.js";
import { vojaProjekcio } from "./geometrio.js";

export function segmentKvaranguloj( a: VojaPunkto, b: VojaPunkto, duono: number ): VojaPunkto[] {
  const dx = b[0] - a[0], dz = b[1] - a[1];
  const longo = Math.hypot( dx, dz );
  if ( longo < TOLERANCO ) return [];
  const nx = -dz / longo * duono, nz = dx / longo * duono;
  return [
    [ a[0] + nx, a[1] + nz ],
    [ b[0] + nx, b[1] + nz ],
    [ b[0] - nx, b[1] - nz ],
    [ a[0] - nx, a[1] - nz ],
  ];
}

export function konveksajKunfandiĝas( unu: VojaPunkto[], du: VojaPunkto[] ): boolean {
  for ( const kvarangulo of [ unu, du ] ) {
    for ( let i = 0; i < kvarangulo.length; i++ ) {
      const a = kvarangulo[i], b = kvarangulo[( i + 1 ) % kvarangulo.length];
      const ax = -( b[1] - a[1] ), az = b[0] - a[0];
      const longo = Math.hypot( ax, az );
      if ( longo < TOLERANCO ) continue;
      let unuMin = Infinity, unuMax = -Infinity, duMin = Infinity, duMax = -Infinity;
      for ( const p of unu ) {
        const valoro = ( p[0] * ax + p[1] * az ) / longo;
        unuMin = Math.min( unuMin, valoro );
        unuMax = Math.max( unuMax, valoro );
      }
      for ( const p of du ) {
        const valoro = ( p[0] * ax + p[1] * az ) / longo;
        duMin = Math.min( duMin, valoro );
        duMax = Math.max( duMax, valoro );
      }
      if ( unuMax <= duMin + TOLERANCO || duMax <= unuMin + TOLERANCO ) return false;
    }
  }
  return true;
}

export function segmentojKonektas(
  a0: VojaPunkto,
  a1: VojaPunkto,
  b0: VojaPunkto,
  b1: VojaPunkto,
  duonoA: number,
  duonoB: number
): boolean {
  const rx = b0[0] - a0[0], rz = b0[1] - a0[1];
  const sx = a1[0] - a0[0], sz = a1[1] - a0[1];
  const qx = b1[0] - b0[0], qz = b1[1] - b0[1];
  const det = sx * qz - sz * qx;
  if ( Math.abs( det ) <= TOLERANCO ) {
    if ( Math.abs( rx * sz - rz * sx ) > TOLERANCO ) return false;
    const kvadrato = qx * qx + qz * qz;
    const t0 = ( a0[0] - b0[0] ) * qx + ( a0[1] - b0[1] ) * qz;
    const t1 = ( a1[0] - b0[0] ) * qx + ( a1[1] - b0[1] ) * qz;
    const malproksima = Math.max( 0, Math.min( t0, t1 ) ) - Math.min( kvadrato, Math.max( t0, t1 ) );
    return Math.abs( malproksima ) <= TOLERANCO && kvadrato > TOLERANCO;
  }
  const t = ( rx * qz - rz * qx ) / det;
  const u = ( rx * sz - rz * sx ) / det;
  if ( t >= -0o1/0o100 && t <= 1 + 0o1/0o100 && u >= -0o1/0o100 && u <= 1 + 0o1/0o100 ) return true;
  const rando = Math.max( duonoA, duonoB ) + 0o1/0o10;
  for ( const p of [ a0, a1 ] ) {
    const projekcio = vojaProjekcio( p[0], p[1], b0, b1 );
    if ( projekcio && projekcio.d <= rando ) return true;
  }
  for ( const p of [ b0, b1 ] ) {
    const projekcio = vojaProjekcio( p[0], p[1], a0, a1 );
    if ( projekcio && projekcio.d <= rando ) return true;
  }
  return false;
}
