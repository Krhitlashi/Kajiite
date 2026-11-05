// ≺⧼ ប្រភេទផ្លូវ 🛣️ ⧽≻

export interface VojDifino {
  pts: [ number, number ][];
  w: number;
  heightFn?: ( x: number, z: number ) => number;
  grundoFn?: ( x: number, z: number ) => number;
  stuparo?: boolean;
  // ⟨ ផ្ទៃរលូន 📃 ⟩ ៖ សម្រាប់ស្ពាន ។ ចម្រៀកវែងតែមួយរត់តាមធ្នូ , មិនមែនជណ្តើរ ។
  glata?: boolean;
  kapoj?: boolean;
}

// ⟨ ជម្រើសសម្រាបផ្លូវ 📃 ⟩
export interface VojOpcioj {
  // ⟨ កម្រិតទឹកនៅចំណុចមួយ ឬ -Infinity បើគ្មានទឹក ។ ផ្លូវត្រូវនៅលើផ្ទឃ្លាំងទឹក មិនអាចកប់ក្នុងទឹកទេ ។ 📃 ⟩
  akvaFn?: ( x: number, z: number ) => number;
  grundoFn?: ( x: number, z: number ) => number;
  // ⟨ ដៃរបស់ចានភ្ជាប់ 📃 ⟩ ៖ ចានសាងសង់ដោយដៃពិត , ដូច្នេះកម្រិតរបស់វាអាន
  // តាមដៃទាំងនោះ ។ បើផ្លូវអានតែចំណុចកណ្តាល , កម្រិតផ្លូវខុសពីចានមួយជំហាន ,
  // ហើយឃើញជាជញ្ជាំងឈរនៅមាត់ចាន ។ 📃 ⟩
  kunigajDirektoj?: Map<string, [ number, number ][]>;
  // ⟨ ការបិទជ្រុង និងមុំចាន 📃 ⟩ ៖ ចានសំយោគដៃពីព័ត៌មាននេះ ពេលទិសដៃទទេ
  // ( ចំណុចក្រឡា ) ។ បើផ្លូវមិនដឹងព័ត៌មាននេះ , វាអានកម្រិតខុសពីចាន ។ 📃 ⟩
  kunigajFermitaj?: Map<string, [ number, number ]>;
  kunigajRotacioj?: Map<string, number>;
  // ⟨ កន្លះទទឹងផ្លូវពិត 📏 ⟩ ៖ ចានត្រូវធំល្មមនឹងផ្លូវ ។ បើខ្វះ , ចានប្រើតម្លៃថេរ ,
  // ហើយផ្លូវធំជាងចានបន្តិច ។ 📃 ⟩
  kunigajDuonoj?: Map<string, number>;
}

// ⟨ ផ្ទឃ្លាំងផ្លូវ សម្រាបការប៉ះទង្គិច 📃 ⟩
export interface VojSuprajxo { x1: number; z1: number; x2: number; z2: number; duono: number; y0: number; y1: number; }
export const vojSuprajxoj: VojSuprajxo[] = [];
