// ≺⧼ ſɭэ ֭ſɭэ j͑ʃᴜꞇ ʌ j͑ʃɹ ſɟᴜ ı],ɹͷ̗ 📏 ⧽≻

// ⟪ ſɭэ ֭ſɭэ , ꞙɭı 📏 ⟫
// ⟨ ſɭэ ֭ſɭэ , ſɭɜ ſɭ,w , ꞙɭı , ⟅ ⟩
export const VOJA_DIKECO = 0o5/0o100;

export const VOJA_SUPRO_LEVIGXO = 0o1/0o100 + VOJA_DIKECO;

export const VOJA_DIORITA_DUONO = 0o7/0o10;
export const VOJA_BORDA_SEFINI = 0o3/0o5;
export const VOJA_EKSTERA_DUONO = VOJA_DIORITA_DUONO + VOJA_BORDA_SEFINI;

export const KORNA_R = VOJA_BORDA_SEFINI;

export const VOJA_TRUA_DUONO = VOJA_EKSTERA_DUONO + KORNA_R;

// ⟪ ſɭᴜ ſןᴜ , }ʃɹƽ , ꞙɭı 📏 ⟫
// ⟨ ſɭэ ֭ſɭэ , ſɭᴜ ſןᴜ , ꞙɭı , ( ſɭэ ֭ſɭэ , ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı ) ⟅
//   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ſɭɹ ſןᴜ , ꞙɭɔ ,
//   ꞙɭɔ , ſɭэ ֭ſɭэ , ꞙɭı , ꞙɭı , ſɭɹ ſןᴜ ,
//   ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
export const VOJA_KUNIGA_SUPERPONO = 0o1/0o40;

// ⟪ ꞙɭı , ꞙɭı , ſɭэ ֭ſɭэ 📏 ⟫
// ⟨ ſɭэ ֭ſɭэ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭɔ , ſɭэ ֭ſɭэ , ꞙɭı , ꞙɭэ ,
//   ꞙɭı , ꞙɭı , ſɭᴜ ſןᴜ , ſɭᴜ ſןᴜ , ſןɔ˞ᴜƴ , ꞙɭı , ꞙɭı ,
//   ꞙɭɔ , ſɭᴜ ſןᴜ , ſɭэ ֭ſɭэ , ꞙɭı , ⟅ 📃 ⟩
export function k6h6LarghoDuono( sefini?: number ): number {
  return ( sefini || 0o7/0o2 ) / 0o4 + VOJA_BORDA_SEFINI;
}

// ⟪ ſɭɜ ſɭ,w , j͑ʃᴜ ſɭᴜ 📏 ⟫
// ⟨ ſɭэ ֭ſɭэ , ſɭɜ ſɭ,w , ꞙɭı , ſɭэ ſɭ,w , ꞙɭı , ꞙɭı , ꞙɭı ,
//   j͐ʃэ ɭ(ᴜ , r , ꞙɭı , r , ꞙɭı , ꞙɭɿ , ꞙɭɔ , ꞙɭı ,
//   ſɭэ ֭ſɭэ , j͐ʃэ ɭ(ᴜ , ꞙɭı , ſɭэ ֭ſɭэ , j͑ʃᴜ ʃɜ , ⟅ 📃 ⟩
export const VOJA_TERA_KLINO = 0o1;

// ⟪ j͑ʃ'ɔ ŋᷠɹ , ꞙɭı , ꞙɭı 📏 ⟫
// ⟨ ſɭэ ֭ſɭэ , ſןɔ˞ᴜƴ , ſɭᴜ ſןᴜ , ꞙɭı , ſɭɹ ſןᴜ , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ſןɔ˞ᴜƴ , ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭɔ , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ſɭэ ֭ſɭэ , ſɭɜ ſɭ,w , ꞙɭɔ , ⟅ 📃 ⟩
export const STUPA_RISERO = 0o1/0o2;

// ⟨ j͑ʃᴜ ʃɜ , j͑ʃᴜ ſɭᴜ , 📏 ⟩ , ꞙɭı , ꞙɭɔ , ꞙɭı , ꞙɭɔ , ꞙɭı , ꞙɭı , ⟅
//   ꞙɭı , j͑ʃᴜ ʃɜ , ꞙɭı , ꞙɭı , ꞙɭı ⟅ ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭэꞟ , ⟅
//   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭɔ , ꞙɭı , ꞙɭı , ꞙɭı ,
//   ( ꞙɭı ɔ.ꞟ , ꞙɭı ɔ.ꞟ ) , ꞙɭэꞟ , ꞙɭı , ⟅
// ⟨ ſᶘɔ ʌ j͑ʃᴜ ʃɜ , ꞙɭı , ⟅ ⟩ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭɔ , ꞙɭı , ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭı , ⟅ 📃 ⟩
export const VOJA_STUPA_RAMPO = 0o1;

// ⟪ ꞙɭı , ꞙɭı , j͑ʃᴜ ſɭᴜ 📏 ⟫
// ⟨ j͑ʃᴜ ʃɜ , j͑ʃᴜ ſɭᴜ , ꞙɭı , j͐ʃэ ɭ(ᴜ , VOJA_STUPA_RAMPO , ⟅
//   ſɭэ ֭ſɭэ , ſןɔ˞ᴜƴ , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı , ⟅ 📃 ⟩
export const STUPA_RAMPO_KURO = STUPA_RISERO * VOJA_STUPA_RAMPO;

export function rampaKuro( fala: number ): number {
  return Math.abs( fala ) * VOJA_STUPA_RAMPO;
}

export function surGrid( l6da: number ): number {
  return Math.ceil( l6da / STUPA_RISERO - 0o10 ** -0o6 ) * STUPA_RISERO;
}

// ⟨ j͑ʃ'ɔ ŋᷠɹ , ꞙɭı , ſɭэ ɭʃᴜ , ꞙɭı , ꞙɭı , ꞙɭɔ , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ſɭэ ֭ſɭэ , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
export function subGrid( l6da: number ): number {
  return Math.floor( l6da / STUPA_RISERO + 0o10 ** -0o6 ) * STUPA_RISERO;
}

// ⟪ ſɭɜ ſɭ,w , ſɭᴜ ſןᴜ 📏 ⟫
// ⟨ ſɭэ ֭ſɭэ , ꞙɭɔ , ſɭɜ ſɭ,w , ꞙɭɔ , ſɭэ ֭ſɭэ , ꞙɭı , ſɭɜ ſɭ,w , ꞙɭı , ⟅ 📃 ⟩
export const VOJA_BURIAL_TOLERANCO = 0o1/0o20;

// ⟪ ſᶘᴜ j͑ʃᴜ , ſɭэ ֭ſɭэ 📏 ⟫
// ⟨ ſɭэ ֭ſɭэ , ſᶘᴜ j͑ʃᴜ , ꞙɭı , ſᶘᴜ j͑ʃᴜ , ꞙɭɔ , ſɭɜ ſɭ,w , ꞙɭɔ , ⟅ 📃 ⟩
export const VOJA_AKVA_KLARANCO = 0o1/0o2;
