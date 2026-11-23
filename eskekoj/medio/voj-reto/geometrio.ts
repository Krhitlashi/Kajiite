// ≺⧼ ſɭэ ֭ſɭэ j͑ʃᴜꞇ ʌ ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ ʌ ſɭɔ ſ͕ɭɜ ı],ᴜ 🛣️ ⧽≻
import type { K6h6Punkto, K6h6RetoK6h6 } from "./hahunaq.js";
import { TOLERANCO } from "./hahunaq.js";
import { VOJA_DIORITA_DUONO, VOJA_EKSTERA_DUONO, k6h6LarghoDuono } from "../hak6h6/havecax2l.js";

export function k6h6DuonLargho( k6h6: K6h6RetoK6h6 ): number {
  return k6h6LarghoDuono( k6h6?.sefini );
}

// ⟪ កន្លះទទឹងផ្ទៃផ្លូវ 🛣️ ⟫
/*កន្លះទទឹងបន្ទះកំពូលផ្លូវ ( មិនរាប់ស្មា ) ។ ចានភ្ជាប់ត្រូវប្រើតម្លៃនេះ ,
   មិនមែនតម្លៃថេរទេ ។ បើចានតូចជាងផ្លូវ , ស្មាងងឹតរបស់ផ្លូវលាតចេញ
   ហួសចាន , ហើយឃើញជាខ្សែងងឹតកាត់ចំណុចភ្ជាប់ ។
    @param k6h6 ( K6h6RetoK6h6 ) - ផ្លូវ
@returns p2somani ( number ) - កន្លះទទឹងកំពូល */
export function k6h6SupraDuono( k6h6: K6h6RetoK6h6 | null | undefined ): number {
  return Math.max( VOJA_DIORITA_DUONO, ( k6h6?.sefini || 0o7/0o2 ) / 0o4 );
}

export function k6h6KunigaDuono( k6h6: K6h6RetoK6h6 ): number {
  return Math.max( VOJA_EKSTERA_DUONO, k6h6DuonLargho( k6h6 ) );
}

export function k6h6Projekcio(
  x: number,
  z: number,
  a: K6h6Punkto,
  b: K6h6Punkto
): { x: number; z: number; t: number; d: number } | null {
  const dx = b[0] - a[0], dz = b[1] - a[1];
  const kvadrato = dx * dx + dz * dz;
  if ( kvadrato < TOLERANCO ) return null;
  const t = Math.max( 0, Math.min( 1, ( ( x - a[0] ) * dx + ( z - a[1] ) * dz ) / kvadrato ) );
  const px = a[0] + t * dx, pz = a[1] + t * dz;
  return { x: px, z: pz, t, d: Math.hypot( px - x, pz - z ) };
}
