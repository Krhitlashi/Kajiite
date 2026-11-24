// ≺⧼ ſɭэ ֭ſɭэ j͑ʃᴜꞇ ʌ ֭ſɭw }ʃᴜȝ 🛣️ ⧽≻

export interface VojDifino {
  pts: [ number, number ][];
  w: number;
  heightFn?: ( x: number, z: number ) => number;
  grundoFn?: ( x: number, z: number ) => number;
  stuparo?: boolean;
  // ⟨ j͑ʃɜ ſɭ,ᴜ , ⟅ 📃 ⟩ , ſɟɹƽ ꞁȷ̀ᴜ }ʃw ⟅ ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı ,
  glata?: boolean;
  hateruni?: boolean;
}

// ⟨ j͑ʃ'ɔ ŋᷠɹ , ſɭэ ֭ſɭэ 📃 ⟩
export interface VojHasukf2qani {
  // ⟨ j͑ʃ'ɔ ŋᷠɹ , ſᶘᴜ j͑ʃᴜ , ꞙɭı , ⟅ ꞙɭı , ꞙɭı , ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭı ,
  akvaFn?: ( x: number, z: number ) => number;
  grundoFn?: ( x: number, z: number ) => number;
  // ⟨ ɭʃꞇƽ , ſɭᴜ ſןᴜ , ⟅ 📃 ⟩ , ſɭᴜ ſןᴜ , ɭʃꞇƽ , ꞙɭı ,
  //   ɭʃꞇƽ , ⟅ ꞙɭı , ſɭэ ֭ſɭэ , ſɭэ ɭʃᴜ , ꞙɭı ,
  //   ɭʃэ ſɭɔȝ , ſɭᴜ ſןᴜ , ꞙɭı , ⟅ 📃 ⟩
  kunigajDirektoj?: Map<string, [ number, number ][]>;
  // ⟨ ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭɿ , ⟅ 📃 ⟩ , ſɭᴜ ſןᴜ , ꞙɭı , ſɭэ ɭʃᴜ ,
  //   ( ſɭɹ ſןᴜ ) ⟅ ſɭэ ֭ſɭэ , ꞙɭɔ , ꞙɭı , ⟅ 📃 ⟩
  kunigajFermitaj?: Map<string, [ number, number ]>;
  kunigajRotacioj?: Map<string, number>;
  // ⟨ ꞙɭı , ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭı 📏 ⟩ , ſɭᴜ ſןᴜ , ꞙɭı , ſɭэ ֭ſɭэ ,
  //   ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  kunigajDuonoj?: Map<string, number>;
}

// ⟨ ſɭэ ֭ſɭэ , ſɭᴜ ſןᴜ , ꞙɭı , ⟅ 📃 ⟩
// ⟨ ꞙɭı , j͑ʃᴜ ſɭ,w 📏 ⟩ , ſɭᴜ ſןᴜ , ſɭэ ɭʃᴜ , ꞙɭı , ꞙɭı ,
//   j͑ʃɜ ſɭ,ᴜ , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭɔ , ꞙɭı , ⟅ ꞙɭɔ , ꞙɭı , ⟅ 📃 ⟩
export interface VojSuprajxo { x1: number; z1: number; x2: number; z2: number; p2somani: number; y0: number; y1: number; rampo?: boolean; }
export const vojSuprajxoj: VojSuprajxo[] = [];
