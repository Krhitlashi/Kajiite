// ≺⧼ ſɭэ ֭ſɭэ j͑ʃᴜꞇ ʌ ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ ʌ ſɭɔ ſ͕ɭɜ ı],ᴜ 🛣️ ⧽≻
import type { K6h6Punkto, K6h6RetoK6h6 } from "./hahunaq.js";
import { TOLERANCO } from "./hahunaq.js";
import { VOJA_DIORITA_DUONO, VOJA_EKSTERA_DUONO, k6h6LarghoDuono } from "../hak6h6/havecax2l.js";

export function k6h6DuonLargho( k6h6: K6h6RetoK6h6 ): number {
  return k6h6LarghoDuono( k6h6?.sefini );
}

// ⟪ j͑ʃɔ ſȷꞇ }ʃꞇ ʌ ſɭэ ֭ſɭэ 🛣️ ⟫
/*j͑ʃɔ ſȷꞇ }ʃꞇ ʌ ſɭэ ֭ſɭэ ( ꞙɭɔ ʌ ſɭэ ) ⟅ ſןᴜ ſᶘɹ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ꞙɭı
   ꞙɭɔ ⟅ ſןᴜ ſᶘɹ ʌ ſᶘɔ ŋᷠɹ ŋᷠɹ ʌ ſɭэ ֭ſɭэ
   ſɭэ ֭ſɭэ ʌ j͑ʃᴜ ʃᴜ }ʃꞇ ⟅
    @param k6h6 ( K6h6RetoK6h6 ) - ſɭэ ֭ſɭэ
@returns p2somani ( number ) - j͑ʃɔ ſȷꞇ }ʃꞇ ʌ ſɭэ ֭ſɭэ */
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
