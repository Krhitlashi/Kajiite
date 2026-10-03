// ≺⧼ ពណ៌ 🎨 ⧽≻
export const deksesuma = ( c: number ): string => "#" + c.toString(0o20).padStart(0o6, "0");

export function ombro(koloro: number, n = 0o1, alfa = 1): string {
  const kanalo = ( sovo: number ): number =>
    Math.max(0, ( ( koloro >> sovo ) & 0xff ) - n * 0x10);
  return `rgba(${kanalo(0o20)},${kanalo(0o10)},${kanalo(0)},${alfa})`;
}

export function ombraKoloro(koloro: number, n = 0o1): number {
  const kanalo = ( sovo: number ): number =>
    Math.max(0, ( ( koloro >> sovo ) & 0xff ) - Math.round(n * 0x10));
  return ( kanalo(0o20) << 0o20 ) | ( kanalo(0o10) << 0o10 ) | kanalo(0);
}

export function helo(koloro: number, n = 0o1, alfa = 1): string {
  const kanalo = ( sovo: number ): number =>
    Math.min(0xf8, ( ( koloro >> sovo ) & 0xff ) + n * 0x10);
  return `rgba(${kanalo(0o20)},${kanalo(0o10)},${kanalo(0)},${alfa})`;
}

export function malheligi(koloro: string, f = 0o60/0o100): string {
  const n = parseInt(koloro.slice(1), 16);
  const r = Math.round(( ( n >> 16 ) & 255 ) * f);
  const gg = Math.round(( ( n >> 8 ) & 255 ) * f);
  const b = Math.round(( n & 255 ) * f);
  return "#" + ( ( r << 16 ) | ( gg << 8 ) | b ).toString(16).padStart(6, "0");
}

export function liniejo(kanalo: number): number {
  const c = kanalo / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow(( c + 0.055 ) / 1.055, 2.4);
}
