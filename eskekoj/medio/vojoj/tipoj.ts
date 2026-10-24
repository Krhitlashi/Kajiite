// ≺⧼ ប្រភេទផ្លូវ 🛣️ ⧽≻

export interface VojDifino {
  pts: [ number, number ][];
  w: number;
  heightFn?: ( x: number, z: number ) => number;
  grundoFn?: ( x: number, z: number ) => number;
  stuparo?: boolean;
  kapoj?: boolean;
  glata?: boolean;
}

// ⟨ ជម្រើសសម្រាបផ្លូវ 📃 ⟩
export interface VojOpcioj {
  // ⟨ កម្រិតទឹកនៅចំណុចមួយ ឬ -Infinity បើគ្មានទឹក ។ ផ្លូវត្រូវនៅលើផ្ទឃ្លាំងទឹក មិនអាចកប់ក្នុងទឹកទេ ។ 📃 ⟩
  akvaFn?: ( x: number, z: number ) => number;
  grundoFn?: ( x: number, z: number ) => number;
}

// ⟨ ផ្ទឃ្លាំងផ្លូវ សម្រាបការប៉ះទង្គិច 📃 ⟩
export interface VojSuprajxo { x1: number; z1: number; x2: number; z2: number; duono: number; y0: number; y1: number; }
export const vojSuprajxoj: VojSuprajxo[] = [];
