// ≺⧼ j͑ʃɔ ֭ſɭɔ }ʃꞇ gawek2f 🎼 ⧽≻
// j͑ʃп́ꞇ ſɭɔƴ ʌ j͑ʃᴜꞇ ʌ j͑ʃɔ ֭ſɭɔ }ʃꞇ ʌ ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ ⟅ j͑ʃɔ ֭ſɭɔ }ʃꞇ ʌ j͑ʃᴜꞇ ʌ ꞙɭı ʌ ꞙɭı

import { SEKUNDOJ_PO_HE, SEKUNDOJ_PO_QE } from "../../../../kantaoj/komunajxoj/unuoj.js";

// ⟪ ſɭɔƽ ʌ j͑ʃƨꞇ ֭ſɭɹ 📃 ⟫

export const HE = SEKUNDOJ_PO_HE;
export const QE = SEKUNDOJ_PO_QE;

// ⟪ ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ ʌ j͑ʃɔ ֭ſɭɔ }ʃꞇ 📃 ⟫

/* ſᶘᴜ j͐ʃɹ ʌ ꞙɭı ʌ ꞙɭı ʌ j͑ʃƨꞇ ֭ſɭɹ
    @param bpq ( number ) - j͑ʃɔ ֭ſɭɔ }ʃꞇ ʌ ꞙɭı ʌ ꞙɭı
@returns j͑ʃƨꞇ ֭ſɭɹ ( number ) */
export function caxomani( bpq: number ): number {
  return QE / bpq / 0o2;
}
