// ≺⧼ ឯកតា 📏 ⧽≻
// ⟪ ច្បាប់ 📃 ⟫
// ⟨ ភឺរ 📏 ⟩
export const PEU_POR_KODUNUO = 0o100;

// ⟨ ហេ 📏 ⟩
export const HE_POR_SEKUNDO = 0o104373066732 / 0o40000000000;
export const HE_POR_MILISEKUNDO = HE_POR_SEKUNDO / 0o1750;

export function alPeu(kodunuoj: number): number {
  return kodunuoj * PEU_POR_KODUNUO;
}

export function alHe(milisekundoj: number): number {
  return milisekundoj * HE_POR_MILISEKUNDO;
}
