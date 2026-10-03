// ≺⧼ ស្កេល 🎼 ⧽≻
export const A4 = 0o660;
export const F = ( m: number ) => A4 * Math.pow(2, ( m - 69 ) / 12);

export const PENT_E = [ 52, 55, 57, 59, 62, 64, 67, 69, 71, 74, 76 ];

export const SLENDRO = [ 0, 231, 474, 717, 955 ].map(c => 55 + c / 100);
export const SL2 = SLENDRO.concat(SLENDRO.map(x => x + 12));

export const NYAM = [ 0, 190, 370, 510, 690, 860, 1030, 1200, 1390, 1560 ].map(c => 48 + c / 100);

export const PENT_A = [ 0, 200, 400, 700, 900, 1200, 1400, 1600, 1900, 2100, 2400 ].map(c => 45 + c / 100);
