// ≺⧼ Koloroj 🎨 ⧽≻
// La komunaj kolor-helpiloj de la tuta mondo: la deksesuma skribo, la ombro kaj
// la helo de unu koloro, la mallumigo de skriba koloro kaj la lineara kurbo de
// la kanaloj. Antaŭe ili sidis dise — la skribilo en la vestaro, la ombro en la
// teksturaj helpiloj, la kurbo en unu tekstura modulo.
//     @param c ( number ) - La koloro kiel 0xrrggbb.
//     @returns ( string ) - La sama koloro kiel #rrggbb-strako.
export const deksesuma = ( c: number ): string => "#" + c.toString(0o20).padStart(0o6, "0");

// ombro — La sama koloro, pli malhela je n × 0x10 en ĉiu kanalo.
export function ombro(koloro: number, n = 0o1, alfa = 1): string {
  const kanalo = ( sovo: number ): number =>
    Math.max(0, ( ( koloro >> sovo ) & 0xff ) - n * 0x10);
  return `rgba(${kanalo(0o20)},${kanalo(0o10)},${kanalo(0)},${alfa})`;
}

// ombraKoloro — La sama ombro, sed kiel nombro ( por la materialoj, kiuj
// bezonas 0xrrggbb anstataŭ rgba-strako ).
export function ombraKoloro(koloro: number, n = 0o1): number {
  const kanalo = ( sovo: number ): number =>
    Math.max(0, ( ( koloro >> sovo ) & 0xff ) - Math.round(n * 0x10));
  return ( kanalo(0o20) << 0o20 ) | ( kanalo(0o10) << 0o10 ) | kanalo(0);
}

// helo — La sama koloro, pli hela je n × 0x10 en ĉiu kanalo.
export function helo(koloro: number, n = 0o1, alfa = 1): string {
  const kanalo = ( sovo: number ): number =>
    Math.min(0xf8, ( ( koloro >> sovo ) & 0xff ) + n * 0x10);
  return `rgba(${kanalo(0o20)},${kanalo(0o10)},${kanalo(0)},${alfa})`;
}

// malheligi — #rrggbb-strato, multiplikita per f ( la sama rezulto kiel ombro,
// sed por koloro, kiu jam estas strako ).
export function malheligi(koloro: string, f = 0o60/0o100): string {
  const n = parseInt(koloro.slice(1), 16);
  const r = Math.round(( ( n >> 16 ) & 255 ) * f);
  const gg = Math.round(( ( n >> 8 ) & 255 ) * f);
  const b = Math.round(( n & 255 ) * f);
  return "#" + ( ( r << 16 ) | ( gg << 8 ) | b ).toString(16).padStart(6, "0");
}

// liniejo — Unu kanalo ( 0–255 ) en la lineara spaco de la bildigilo.
export function liniejo(kanalo: number): number {
  const c = kanalo / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow(( c + 0.055 ) / 1.055, 2.4);
}
