// ≺⧼ j͑ʃɹ ſɟᴜ ı],ɹͷ̗ 📏 ⧽≻
// ſɭэ ſɭw , ſ͕ɭɜ ı],ᴜ , ⟅ ſɭэ ſɭw , ꞙɭı ,
// ſɭэ ſɭw , ſןw ſɭɔƽ , ꞙɭɿ , ⟅ ſɭэ ſɭᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ſɟᴜ ſןᴜ , ꞙɭı , ꞙɭı ,
// ſ͕ɭᴜ ı],ᴜ , ſɭэ ſɭw , ꞙɭɿ ,
export const Nala = 0o1400;                           // 768 ｡ j͑ʃɔ ſɭȷꞇ }ʃꞇ ʌ ʃᴜ j͐ʃɹ [ -384, 384 )
export const MONDOHALFO = 0o600;                      // 384 ｡ ſɟɜ ſɭᴜ ｡ j͑ʃɔ ſɭȷꞇ }ʃꞇ ʌ ʃᴜ j͐ʃɹ
export const REZ = 0o1400;                             // 768 ｡ ſɟɹ ɭʃᴜ ｡ ſɭʞ ｡ ʃᴜ j͐ʃɹ

// ſ͕ɭᴜ ı],ᴜ , ſɭэ ſɭw , ꞙɭı , ⟅ ſɭэ ſɭᴜ , ꞙɭı ,
// ſ͕ɭɜ ı],ᴜ , ꞙɭɿ , 📃 ⟩
export interface KradaRektangulo {
  ix0: number;
  ix1: number;
  iz0: number;
  iz1: number;
}

/* ſɭэ ſɭᴜ , ꞙɭı , ⟅ ſɭэ ſɭw , ſɭэ ſɭᴜ ,
    @param x ( number ) - ʃᴜ j͐ʃɹ x ｡
@returns x ｡ ſɭʞ ( number ) ｡ */
export function mondoxAlPikselo(x: number): number { return Math.round(( MONDOHALFO - x ) / Nala * REZ); }

/* ſɭэ ſɭᴜ , ꞙɭɿ , ⟅ ſɭэ ſɭw , ſɭэ ſɭᴜ ,
    @param z ( number ) - ʃᴜ j͐ʃɹ z ｡
@returns z ｡ ſɭʞ ( number ) ｡ */
export function mondozAlPikselo(z: number): number { return Math.round(( MONDOHALFO - z ) / Nala * REZ); }
