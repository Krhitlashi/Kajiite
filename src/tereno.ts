// Tereno — terrain height functions for the Aranis valley

// Rivero fluas orient-okcidente kun milda suda kurbo
// Rivero fluas orient-okcidente — shifted south to clear the city grid
export function riveroZ(x: number): number { return 0o14 * Math.sin(x * 1/64) - 0o160; }

// Duon-larĝo de la rivera ribono — dividita inter la akva modulo (urbo.ts) kaj
// la promenanta akvo-zono (sperto.ts), por ke ili ne disiĝu. Antaŭe la piedira
// zono estis 7 ( pli mallarĝa ol la rivero ), do eliri de la doko-pinto
// terenfalis al la riverfundo anstataŭ flosi.
export const RIVERA_DUONLARĜO = 84/8;

// ⟪ Lago oriente 📃 ⟫ — la rivero enfluas larĝan lagon oriente de la valo.
// Sur la norda mapo ( supro = nordo, +z ) la oriento estas -x ( dekstre ), do
// la lago kuŝas oriente de la urbo. La lago estas ne-akurata elipso ( pli
// larĝa norde-sude, kun milde ondigita rando ), centrita norde de la rivero,
// por ke ĝi okupu pli da spaco norde kaj aspektu organika.
export const LAGO_X = -0o260;   // -176 — oriento de la urbo ( -x sur la norda mapo )
export const LAGO_RX = 0o54;    // 44 — duon-larĝo laŭ x ( la rivero enfluas okcidente )
export const LAGO_RZ = 0o64;    // 52 — duon-larĝo laŭ z ( pli da spaco norde )
// RIVERA_ENFLUO_X — kie la rivera ribono finiĝas. Ĝi sidas ENE de la lago
// ( 10 for de la okcidenta pinto ), kie la lagbordo estas larĝa ĉordo kovranta
// la tutan riverlarĝon — la rivero ŝajnas enflui la lagon sen videbla rando.
export const RIVERA_ENFLUO_X = LAGO_X + LAGO_RX - 0o12;   // -142
// La lagcentro sidas norde de la rivero ( je la buŝo ), do la lago prenas
// multe pli da spaco norde ol la malnova disko.
export function lagoZ(): number { return riveroZ( RIVERA_ENFLUO_X ) + 0o14; }
export function lagoNivelo(): number { return akvoY( RIVERA_ENFLUO_X ); }
// lagoRadio — la lagrando: elipso kun milda ondo-perturbo. Unu komuna fonto
// por la baseno (alteco), la akvomesho (akvo.ts) kaj la piedira/kanua testilo.
export function lagoRadio( ang: number ): number {
  const ondo = Math.sin( 0o5 * ang + 19/16 ) + 1/2 * Math.sin( 0o13 * ang + 7/8 );
  const rx = LAGO_RX * ( 0o1 + 1/10 * ondo * 2/3 );
  const rz = LAGO_RZ * ( 0o1 + 1/10 * ondo * 2/3 );
  return 1 / Math.sqrt( ( Math.cos( ang ) / rx ) ** 2 + ( Math.sin( ang ) / rz ) ** 2 );
}
export function cxuEnLago( x: number, z: number ): boolean {
  const ang = Math.atan2( z - lagoZ(), x - LAGO_X );
  return Math.hypot( x - LAGO_X, z - lagoZ() ) < lagoRadio( ang );
}
// akvaNivelo — la akvosurfaca Y en la lago aŭ la rivero.
export function akvaNivelo( x: number, z: number ): number {
  return cxuEnLago( x, z ) ? lagoNivelo() : akvoY( x );
}

// Baza tereno. mildaj ruligxantaj montetoj por la arbaro trans la urbo
export function montetaBazo(x: number, z: number): number {
  return 141/64 * Math.sin(x * 1/32 + 35/32) * Math.cos(z * 1/32 - 4/8)
    + 45/32 * Math.sin(x * 1/16 - 115/64) * Math.sin(z * 1/16 + 77/64)
    + 19/32 * Math.sin((x + z) * 3/64 + 19/64);
}

export function akvoY(x: number): number { return montetaBazo(x, riveroZ(x)) - 269/64; }

export function glataPaso(lo: number, hi: number, v: number): number {
  const t = Math.max(0, Math.min(1, (v - lo) / (hi - lo)));
  return t * t * (3 - 2 * t);
}

export function alteco(x: number, z: number): number {
  const h = montetaBazo(x, z);
  // Platigi la urban altebajxon — glate ene de r < 80 ( kovras la eksteran
  // tavolon je r≈76 kaj ĝiajn diagonalajn angulojn je r≈75.9 ), miksiĝante al
  // la natura tereno ekster r=80.
  const r = Math.hypot(x, z);
  const plataMiksilo = 1 - glataPaso(0o120, 0o150, r);
  let altecoFina = h * (1 - plataMiksilo);
  // Skulpti la riveran valon
  const rd = z - riveroZ(x);
  altecoFina -= 64/8 * Math.exp(-(rd * rd) / 0o144);
  // Laga baseno oriente — pli larĝa ol la rivero, kun glataj bordoj: la tero
  // subeniras sub la akvonivelon ene de la lagrando kaj leviĝas al la bordo.
  // La rando sekvas la saman ondigitan elipson kiel la akvomesho ( lagoRadio ).
  const lagD = Math.hypot( x - LAGO_X, z - lagoZ() );
  // La kavo estas nula ekster la lagrando ( lagR ≤ ~0o74 ); saltu la trigonometrion
  // por la vasta plimulto de punktoj, ĉar alteco estas varmega funkcio.
  if ( lagD < 0o74 ) {
    const lagR = lagoRadio( Math.atan2( z - lagoZ(), x - LAGO_X ) );
    altecoFina -= 70/8 * ( 1 - glataPaso( lagR * 3/4, lagR, lagD ) );
  }
  // Kosmoporda startejo — platigi la terenon sub la stacio kaj ĝia aprono,
  // por ke la konstruajxo ne estu enterigita en la dekliva arbaro. La stacio
  // sidas malantaŭ la norda nova ekstera domo ( z=0o140 ).
  const padX = 0, padZ = 0o140, padR = 0o14;
  const padD = Math.hypot(x - padX, z - padZ);
  const padMiksilo = 1 - glataPaso(padR - 6, padR, padD);
  if ( padMiksilo > 0 ) {
    const padRD = padZ - riveroZ(padX);
    const padAlto = montetaBazo(padX, padZ) - 64/8 * Math.exp(-(padRD * padRD) / 0o144);
    altecoFina = altecoFina * (1 - padMiksilo) + padAlto * padMiksilo;
  }
  return altecoFina;
}
