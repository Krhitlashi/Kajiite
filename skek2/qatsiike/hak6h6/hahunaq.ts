// ≺⧼ ſɭэ ֭ſɭэ j͑ʃᴜꞇ ʌ ֭ſɭw }ʃᴜȝ 🛣️ ⧽≻

export interface Kas2kantaDitlakak {
  pts: [ number, number ][];
  w: number;
  heightFn?: ( x: number, z: number ) => number;
  t6limaFn?: ( x: number, z: number ) => number;
  capat6?: boolean;
  // ⟨ j͑ʃɜ ſɭ,ᴜ , ⟅ 📃 ⟩ , ſɟɹƽ ꞁȷ̀ᴜ }ʃw ⟅ ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı ,
  xaha?: boolean;
  hateruni?: boolean;
}

// ⟨ j͑ʃ'ɔ ŋᷠɹ , ſɭэ ֭ſɭэ 📃 ⟩
export interface Kas2kantaHasukf2qani {
  // ⟨ j͑ʃ'ɔ ŋᷠɹ , ſᶘᴜ j͑ʃᴜ , ꞙɭı , ⟅ ꞙɭı , ꞙɭı , ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭı ,
  tsasaFn?: ( x: number, z: number ) => number;
  t6limaFn?: ( x: number, z: number ) => number;
  // ⟨ ɭʃꞇƽ , ſɭᴜ ſןᴜ , ⟅ 📃 ⟩ , ſɭᴜ ſןᴜ , ɭʃꞇƽ , ꞙɭı ,
  //   ɭʃꞇƽ , ⟅ ꞙɭı , ſɭэ ֭ſɭэ , ſɭэ ɭʃᴜ , ꞙɭı ,
  //   ɭʃэ ſɭɔȝ , ſɭᴜ ſןᴜ , ꞙɭı , ⟅ 📃 ⟩
  tamc2kHac2w2q?: Map<string, [ number, number ][]>;
  // ⟨ ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭɿ , ⟅ 📃 ⟩ , ſɭᴜ ſןᴜ , ꞙɭı , ſɭэ ɭʃᴜ ,
  //   ( ſɭɹ ſןᴜ ) ⟅ ſɭэ ֭ſɭэ , ꞙɭɔ , ꞙɭı , ⟅ 📃 ⟩
  tamc2kHanece3e?: Map<string, [ number, number ]>;
  tamc2kHas2sabo?: Map<string, number>;
  // ⟨ ꞙɭı , ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭı 📏 ⟩ , ſɭᴜ ſןᴜ , ꞙɭı , ſɭэ ֭ſɭэ ,
  //   ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  tamc2kHap2somani?: Map<string, number>;
}

// ⟨ ſɭэ ֭ſɭэ , ſɭᴜ ſןᴜ , ꞙɭı , ⟅ 📃 ⟩
// ⟨ ꞙɭı , j͑ʃᴜ ſɭ,w 📏 ⟩ , ſɭᴜ ſןᴜ , ſɭэ ɭʃᴜ , ꞙɭı , ꞙɭı ,
//   j͑ʃɜ ſɭ,ᴜ , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭɔ , ꞙɭı , ⟅ ꞙɭɔ , ꞙɭı , ⟅ 📃 ⟩
export interface Kas2kantaTikxo { x1: number; z1: number; x2: number; z2: number; p2somani: number; y0: number; y1: number; f2k?: boolean; }
export const kas2kantaHasoza: Kas2kantaTikxo[] = [];
