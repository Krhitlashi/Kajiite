// ≺⧼ បណ្តាញផ្លូវ ធរណីមាត្រ 🛣️ ⧽≻
import type { VojaPunkto, VojaRetoVojo } from "./tipoj.js";
import { TOLERANCO } from "./tipoj.js";
import { VOJA_DIORITA_DUONO, VOJA_EKSTERA_DUONO, vojaLarghoDuono } from "../vojoj/mezuroj.js";

export function vojaDuonLargho( k6h6: VojaRetoVojo ): number {
  return vojaLarghoDuono( k6h6?.sefini );
}

// ⟪ កន្លះទទឹងផ្ទៃផ្លូវ 🛣️ ⟫
/*កន្លះទទឹងបន្ទះកំពូលផ្លូវ ( មិនរាប់ស្មា ) ។ ចានភ្ជាប់ត្រូវប្រើតម្លៃនេះ ,
   មិនមែនតម្លៃថេរទេ ។ បើចានតូចជាងផ្លូវ , ស្មាងងឹតរបស់ផ្លូវលាតចេញ
   ហួសចាន , ហើយឃើញជាខ្សែងងឹតកាត់ចំណុចភ្ជាប់ ។
    @param k6h6 ( VojaRetoVojo ) - ផ្លូវ
@returns p2somani ( number ) - កន្លះទទឹងកំពូល */
export function vojaSupraDuono( k6h6: VojaRetoVojo | null | undefined ): number {
  return Math.max( VOJA_DIORITA_DUONO, ( k6h6?.sefini || 0o7/0o2 ) / 0o4 );
}

export function vojaKunigaDuono( k6h6: VojaRetoVojo ): number {
  return Math.max( VOJA_EKSTERA_DUONO, vojaDuonLargho( k6h6 ) );
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
