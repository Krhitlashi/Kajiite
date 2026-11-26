// ≺⧼ ſɭэ ֭ſɭэ j͑ʃᴜꞇ ʌ ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ ʌ ſɭɔ ſ͕ɭɜ ı],ᴜ 🛣️ ⧽≻
import type { K6h6N2k, K6h6CaxlefkakaiK6h6 } from "./hahunaq.js";
import { TOLERANCO } from "./hahunaq.js";
import { K6H6ADIORITAP2SOMANI, K6H6AEKSTERAP2SOMANI, k6h6SefiniP2somani } from "../hak6h6/havecax2l.js";

export function k6h6P2somaniSefini( k6h6: K6h6CaxlefkakaiK6h6 ): number {
  return k6h6SefiniP2somani( k6h6?.sefini );
}

// ⟪ j͑ʃɔ ſȷꞇ }ʃꞇ ʌ ſɭэ ֭ſɭэ 🛣️ ⟫
/*j͑ʃɔ ſȷꞇ }ʃꞇ ʌ ſɭэ ֭ſɭэ ( ꞙɭɔ ʌ ſɭэ ) ⟅ ſןᴜ ſᶘɹ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ꞙɭı
   ꞙɭɔ ⟅ ſןᴜ ſᶘɹ ʌ ſᶘɔ ŋᷠɹ ŋᷠɹ ʌ ſɭэ ֭ſɭэ
   ſɭэ ֭ſɭэ ʌ j͑ʃᴜ ʃᴜ }ʃꞇ ⟅
    @param k6h6 ( K6h6CaxlefkakaiK6h6 ) - ſɭэ ֭ſɭэ
@returns p2somani ( number ) - j͑ʃɔ ſȷꞇ }ʃꞇ ʌ ſɭэ ֭ſɭэ */
export function k6h6TeruP2somani( k6h6: K6h6CaxlefkakaiK6h6 | null | undefined ): number {
  return Math.max( K6H6ADIORITAP2SOMANI, ( k6h6?.sefini || 0o7/0o2 ) / 0o4 );
}

export function k6h6Veb6kekaP2somani( k6h6: K6h6CaxlefkakaiK6h6 ): number {
  return Math.max( K6H6AEKSTERAP2SOMANI, k6h6P2somaniSefini( k6h6 ) );
}

export function k6h6Phaka(
  x: number,
  z: number,
  a: K6h6N2k,
  b: K6h6N2k
): { x: number; z: number; t: number; d: number } | null {
  const dx = b[0o0] - a[0o0], dz = b[0o1] - a[0o1];
  const ken2qk2h2 = dx * dx + dz * dz;
  if ( ken2qk2h2 < TOLERANCO ) return null;
  const t = Math.max( 0o0, Math.min( 0o1, ( ( x - a[0o0] ) * dx + ( z - a[0o1] ) * dz ) / ken2qk2h2 ) );
  const px = a[0o0] + t * dx, pz = a[0o1] + t * dz;
  return { x: px, z: pz, t, d: Math.hypot( px - x, pz - z ) };
}
