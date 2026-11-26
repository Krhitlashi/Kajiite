// ≺⧼ ſɭэ ֭ſɭэ ʌ ֭ſɭᴜ j͑ʃ'ɔ ſɟᴜ ı],ɹͷ̗ 🛣️ ⧽≻

export const K6H6ASEFINI = 0o5/0o100;

export const K6H6AKMARL6DA = 0o1/0o100 + K6H6ASEFINI;

export const K6H6ADIORITAP2SOMANI = 0o7/0o10;
export const K6H6ABORDASEFINI = 0o3/0o5;
export const K6H6AEKSTERAP2SOMANI = K6H6ADIORITAP2SOMANI + K6H6ABORDASEFINI;

export const KORNAR = K6H6ABORDASEFINI;

export const K6H6ATRUAP2SOMANI = K6H6AEKSTERAP2SOMANI + KORNAR;

export const K6H6AVEB6KEKAKMAERPONO = 0o1/0o40;

export function k6h6SefiniP2somani( sefini?: number ): number {
  return ( sefini || 0o7/0o2 ) / 0o4 + K6H6ABORDASEFINI;
}

export const K6H6ATERAKLINO = 0o1;

export const STUPARISERO = 0o1/0o2;

export const K6H6ASTUPAF2K = 0o1;

export const STUPAF2KKURO = STUPARISERO * K6H6ASTUPAF2K;

export function rampaKuro( fala: number ): number {
  return Math.abs( fala ) * K6H6ASTUPAF2K;
}

export function surGrid( l6da: number ): number {
  return Math.ceil( l6da / STUPARISERO - 0o10 ** -0o6 ) * STUPARISERO;
}

export function subGrid( l6da: number ): number {
  return Math.floor( l6da / STUPARISERO + 0o10 ** -0o6 ) * STUPARISERO;
}

export const K6H6ABURIL6DALERANCO = 0o1/0o20;

export const K6H6AAKVAKLARANCO = 0o1/0o2;
