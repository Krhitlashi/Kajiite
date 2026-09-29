// ≺⧼ Voja reto — geometrio 🛣️ ⧽≻
// La larĝoj kaj la projekcio de la vojoj — kiom larĝa estas vojo,
// la kuniga duono kaj la plej proksima punkto sur segmento.
import type { VojaPunkto, VojaRetoVojo } from "./tipoj.js";
import { TOLERANCO } from "./tipoj.js";
import { VOJA_BORDA_LARĜO, VOJA_EKSTERA_DUONO } from "../vojoj/mezuroj.js";

export function vojaDuonLargho( vojo: VojaRetoVojo ): number {
  return ( vojo?.larĝo || 0o7/0o2 ) / 4 + VOJA_BORDA_LARĜO;
}

export function vojaKunigaDuono( vojo: VojaRetoVojo ): number {
  return Math.max( VOJA_EKSTERA_DUONO, vojaDuonLargho( vojo ) );
}

export function pontoDuonLargho( vojo: VojaRetoVojo ): number {
  return ( vojo?.larĝo || 0o7/0o2 ) / 4 + VOJA_BORDA_LARĜO;
}

export function vojaProjekcio(
  x: number,
  z: number,
  a: VojaPunkto,
  b: VojaPunkto
): { x: number; z: number; t: number; d: number } | null {
  const dx = b[0] - a[0], dz = b[1] - a[1];
  const kvadrato = dx * dx + dz * dz;
  if ( kvadrato < TOLERANCO ) return null;
  const t = Math.max( 0, Math.min( 1, ( ( x - a[0] ) * dx + ( z - a[1] ) * dz ) / kvadrato ) );
  const px = a[0] + t * dx, pz = a[1] + t * dz;
  return { x: px, z: pz, t, d: Math.hypot( px - x, pz - z ) };
}
