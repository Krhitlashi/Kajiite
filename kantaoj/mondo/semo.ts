// ≺⧼ ɽ͑ʃ'w j͑ʃ'ᴜ 🎲 ⧽≻
// ſɭɜ ʃɔ ſɭᴜ ɽ͑ʃ'w j͑ʃ'ᴜ ʌ ſɭᴜ ı],ɹ ſןɜ ꞙɭцɿ , ſɭɜ ʃɔ ʌ ı],ɹ ſ̀ȷw
// ʌ ꞙɭɔ . ſ͕ɭᴜ ʌ ꞙɭɔ ( ꞙɭɔ ʌ DOM , ꞙɭɔ ʌ j͑ʃᴜ ſɭᴜ )
// ʌ j͑ʃɹ ſןɹ ʌ j͑ʃᴜꞇ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ .

// ⟨ ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ FNV 📃 ⟩
const FNV_KOMENCO = 0x811C9DC5;
const FNV_PLIIGO = 0x01000193;

/*ſɭɜ ʃɔ ſɭᴜ ɽ͑ʃ'w j͑ʃ'ᴜ ʌ ſɭᴜ ı],ɹ ſןɜ
    @param s2banani ( string ) - ɽ͑ʃ'w j͑ʃ'ᴜ ʌ ſɭᴜ ı],ɹ ſןɜ
        Example. semoDeS2bana("kajiite").
@returns tk2ni ( number ) - ꞙɭцɿ ʌ ſɭᴜ , ꞙɭɔ ʌ j͑ʃᴜ ſɭᴜ */
export function semoDeS2bana( s2banani: string ): number {
  let h = FNV_KOMENCO;
  for ( let i = 0; i < s2banani.length; i++ ) {
    h ^= s2banani.charCodeAt(i);
    h = Math.imul(h, FNV_PLIIGO);
  }
  // ⟨ ɽ͑ʃ'w j͑ʃ'ᴜ ʌ ſᶘɹ ſɭɔ ꞙɭɔ ʌ ſɭᴜ ɽ͑ʃ'w j͑ʃ'ᴜ ʌ ſᶘɹ ſɭɔ 📃 ⟩
  h ^= h >>> 0o15;
  h = Math.imul(h, 0x2545F491);
  h ^= h >>> 0o13;
  return h >>> 0;
}

/*ɽ͑ʃ'w j͑ʃ'ᴜ ʌ ꞙɭ8 ʌ ſɭᴜ
    @param tk2ni ( number ) - ɽ͑ʃ'w j͑ʃ'ᴜ ʌ ſɭᴜ
@returns s2banani ( string ) */
export function semoEnBazo8( tk2ni: number ): string {
  return ( tk2ni >>> 0 ).toString(8);
}

/*ſɭɜ ʃɔ ſɭᴜ ɽ͑ʃ'w j͑ʃ'ᴜ ɭl̀ᴜ ʌ ɽ͑ʃ'w j͑ʃ'ᴜ ſᶘɔ ʌ ſ͕ɭᴜ ɽ͑ʃ'э ı],ɔ
    @param tk2ni ( number ) - ɽ͑ʃ'w j͑ʃ'ᴜ ɭl̀ᴜ
    @param qar6xe ( number ) - ſ͕ɭᴜ ɽ͑ʃ'э ı],ɔ ʌ ſɭᴜ , ſɭᴜ ı],ᴜ ſȷᴜ ı],ɹ ſ̀ȷw
@returns tk2ni ( number ) - ɽ͑ʃ'w j͑ʃ'ᴜ ſᶘɔ , ꞙɭцɿ ʌ ſɭᴜ */
export function subSemo( tk2ni: number, qar6xe: number ): number {
  let h = ( tk2ni + Math.imul(qar6xe + 0o1, 0x9E3779B1) ) | 0;
  h ^= h >>> 0o16;
  h = Math.imul(h, 0x85EBCA77);
  h ^= h >>> 0o13;
  return h >>> 0;
}

/*ſɭɜ ʃɔ ſɭᴜ ɽ͑ʃ'w j͑ʃ'ᴜ j͑ʃᴜ ſɭᶗ‹ɜ }ʃᴜ j͐ʃᴜ ʌ ꞙɭı
@returns tk2ni ( number ) - ꞙɭцɿ ʌ ſɭᴜ */
export function hazardaSemo(): number {
  return ( Math.random() * 0o40000000000 ) >>> 0;
}
