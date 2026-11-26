// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ֭ſɭᴜ j͑ʃ'ɔ ſɟᴜ ı],ɹͷ̗ 📃 ⧽≻

export const Nala = 0o1400;
export const MONDOHALFO = 0o600;
export const REZ = 0o1400;

export interface KradaRektangulo {
  ix0: number;
  ix1: number;
  iz0: number;
  iz1: number;
}

export function mondoxAlPikselo(x: number): number { return Math.round(( MONDOHALFO - x ) / Nala * REZ); }

export function mondozAlPikselo(z: number): number { return Math.round(( MONDOHALFO - z ) / Nala * REZ); }
