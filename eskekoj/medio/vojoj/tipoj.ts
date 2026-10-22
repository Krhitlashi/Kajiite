// ≺⧼ ប្រភេទផ្លូវ 🛣️ ⧽≻

export interface VojDifino { pts: [ number, number ][]; w: number; heightFn?: ( x: number, z: number ) => number; grundoFn?: ( x: number, z: number ) => number; stuparo?: boolean; kapoj?: boolean; glata?: boolean; stuparaRisero?: number; }

// ⟨ ផ្ទឃ្លាំងចានភ្ជាប់ និងកម្រិតចានភ្ជាប់ 📃 ⟩
// ⟨ កម្រិតចានភ្ជាប់ត្រូវត្រូវជាមួយកម្រិតផ្លូវដែលឆ្លងចូលមក ដើម្បីកុំឱ្យផ្លូវលិចទៅចាន ។ 📃 ⟩
export interface VojKunigoAlto { x: number; z: number; alto: number; }

// ⟨ ជម្រើសសម្រាបផ្លូវ 📃 ⟩
export interface VojOpcioj {
  // ⟨ កម្រិតទឹកនៅចំណុចមួយ ឬ -Infinity បើគ្មានទឹក ។ ផ្លូវត្រូវនៅលើផ្ទឃ្លាំងទឹក មិនអាចកប់ក្នុងទឹកទេ ។ 📃 ⟩
  akvaFn?: ( x: number, z: number ) => number;
  // ⟨ កម្រិតចានភ្ជាប់នៅចំណុចភ្ជាប់ផ្លូវ ។ 📃 ⟩
  kunigoAltoj?: VojKunigoAlto[];
  // ⟨ កម្រិតចានភ្ជាប់ដែលបានកំណតដោយផ្លូវជាមួយគ្នា ៖ ចានភ្ជាប់ត្រូវនៅកម្រិតផ្លូវនៅចុងទៀត ដើម្បីកុំឱ្យមានជំហានស្មើគ្នា ។ 📃 ⟩
  altojDeKunigo?: Map<string, number>;
}

// ⟨ ផ្ទឃ្លាំងផ្លូវ សម្រាបការប៉ះទង្គិច 📃 ⟩
export interface VojSuprajxo { x1: number; z1: number; x2: number; z2: number; duono: number; y0: number; y1: number; }
export const vojSuprajxoj: VojSuprajxo[] = [];
