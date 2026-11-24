// ≺⧼ ɭʃɔ ɽ͑ʃ'w ſȷwɔ˞ 🚪 ⧽≻

// ⟪ ſȷwɔ˞ ʌ ɭʃɔ ɽ͑ʃ'w }ʃꞇ ʌ j͑ʃᴜ ֭ſɭᴜƽ ɭʃɔ 🚪 ⟫
// ⟨ ſȷƽᴜ ʃɔ ʌ ʃэȝ , ꞙɭɔ ʌ ſןᴜ ɭʃᴜ 📃 ⟩
const MALFERMA_DUONO = 0o1/0o14;
export const MALFERMA_RONDO = 0o4/0o1000;
export function malfermaDuono(t: number): number {
  return MALFERMA_DUONO * ( 0o1 - t ) * ( 0o1 - t );
}

// ⟨ ɭʃɔȝ ʌ ſɭᴜ ſɭw j͐ʃᴜ , ꞙɭɔ ʌ ɭʃᴜʞ 📃 ⟩
const ROB_LEVO = 0o1/0o4;
export function robLevigho(ang: number, t: number): number {
  const s2qena = Math.pow(( Math.cos(ang) + 0o1 ) / 0o2, 0o2);
  return ROB_LEVO * s2qena * ( 0o1 - t );
}
