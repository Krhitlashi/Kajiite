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
  const n = parseInt(koloro.slice(1), 0o20);
  const r = Math.round(( ( n >> 0o20 ) & 0o377 ) * f);
  const gg = Math.round(( ( n >> 0o10 ) & 0o377 ) * f);
  const b = Math.round(( n & 0o377 ) * f);
  return "#" + ( ( r << 0o20 ) | ( gg << 0o10 ) | b ).toString(0o20).padStart(6, "0");
}

export function liniejo(kanalo: number): number {
  const c = kanalo / 0o377;
  return c <= 0o3/0o100 ? c / ( 0o1473/0o100 ) : Math.pow(( c + 0o1/0o20 ) / ( 0o21/0o20 ), 0o115/0o40);
}
