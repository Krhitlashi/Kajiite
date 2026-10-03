// ≺⧼ ការបើកខាងមុខនៃរ៉ូប 🚪 ⧽≻

// ⟪ ការបើកខាងមុខនៃរ៉ូប 🚪 ⟫
// ⟨ រង្វង់ជាខ្សែកោងចុះក្រោម មិនមែនមាត់ 📃 ⟩
const MALFERMA_DUONO = 0o1/0o14;
export const MALFERMA_RONDO = 0o4/0o1000;
export function malfermaDuono(t: number): number {
  return MALFERMA_DUONO * ( 0o1 - t ) * ( 0o1 - t );
}

// ⟨ ការលើកមូល មិនស្រួច 📃 ⟩
const ROB_LEVO = 0o1/0o4;
export function robLevigho(ang: number, t: number): number {
  const profilo = Math.pow(( Math.cos(ang) + 0o1 ) / 0o2, 0o2);
  return ROB_LEVO * profilo * ( 0o1 - t );
}
