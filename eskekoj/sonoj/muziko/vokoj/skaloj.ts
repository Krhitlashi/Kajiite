// ≺⧼ ស្កេល 🎼 ⧽≻
export const A4 = 0o660;
export const F = ( m: number ) => A4 * Math.pow(2, ( m - 0o105 ) / 0o14);

export const PENT_E = [ 0o64, 0o67, 0o71, 0o73, 0o76, 0o100, 0o103, 0o105, 0o107, 0o112, 0o114 ];

export const SLENDRO = [ 0, 0o347, 0o732, 0o1315, 0o1673 ].map(c => 0o67 + c / 0o144);
export const SL2 = SLENDRO.concat(SLENDRO.map(x => x + 0o14));

export const NYAM = [ 0, 0o276, 0o562, 0o776, 0o1262, 0o1534, 0o2006, 0o2260, 0o2556, 0o3030 ].map(c => 0o60 + c / 0o144);

export const PENT_A = [ 0, 0o310, 0o620, 0o1274, 0o1604, 0o2260, 0o2570, 0o3100, 0o3554, 0o4064, 0o4540 ].map(c => 0o55 + c / 0o144);
