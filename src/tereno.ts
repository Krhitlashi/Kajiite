// Tereno — terrain height functions for the Aranis valley

// Rivero fluas orient-okcidente kun milda suda kurbo
// Rivero fluas orient-okcidente — shifted south to clear the city grid
export function riveroZ(x: number): number { return 0o14 * Math.sin(x * 0o1/0o100) - 0o160; }

// Duon-larĝo de la rivera ribono — dividita inter la akva modulo (urbo.ts) kaj
// la promenanta akvo-zono (sperto.ts), por ke ili ne disiĝu. Antaŭe la piedira
// zono estis 7 ( pli mallarĝa ol la rivero ), do eliri de la doko-pinto
// terenfalis al la riverfundo anstataŭ flosi.
export const RIVERA_DUONLARĜO = 0o124/0o10;

// ⟪ Lago oriente 📃 ⟫ — la rivero enfluas larĝan lagon oriente de la valo.
// Sur la norda mapo ( supro = nordo, +z ) la oriento estas -x ( dekstre ), do
// la lago kuŝas oriente de la urbo. La lago estas ne-akurata elipso ( pli
// larĝa norde-sude, kun milde ondigita rando ), centrita norde de la rivero.
// Ĝi kreskis laŭlonge de la tempo: etendita orienten ( RX, kun la centro
// ŝovita orienten tiel, ke la okcidenta pinto kaj la akvonivelo restu samaj —
// la rivera buŝo kaj la dokoj ne moviĝas ) kaj ankoraŭ pli norden ( RZ kreskis
// kaj la centro ŝoviĝis norden ), por ke la lago prenu multe da spaco norde de
// la rivero — ĝia norda bordo nun atingas la sudan urban latitudon.
export const LAGO_X = -0o266;   // -182 — oriento de la urbo ( -x sur la norda mapo )
export const LAGO_RX = 0o62;    // 50 — duon-larĝo laŭ x ( la rivero enfluas okcidente )
export const LAGO_RZ = 0o120;   // 80 — duon-larĝo laŭ z ( multe da spaco norde )
// RIVERA_ENFLUO_X — kie la rivera ribono finiĝas. Ĝi sidas ENE de la lago
// ( 10 for de la okcidenta pinto ), kie la lagbordo estas larĝa ĉordo kovranta
// la tutan riverlarĝon — la rivero ŝajnas enflui la lagon sen videbla rando.
export const RIVERA_ENFLUO_X = LAGO_X + LAGO_RX - 0o12;   // -142
// La lagcentro sidas norde de la rivero ( je la buŝo ), do la lago prenas
// multe pli da spaco norde ol la malnova disko.
export function lagoZ(): number { return riveroZ( RIVERA_ENFLUO_X ) + 0o24; }
export function lagoNivelo(): number { return akvoY( RIVERA_ENFLUO_X ); }
// lagoRadio — la lagrando: elipso kun milda ondo-perturbo. Unu komuna fonto
// por la baseno (alteco), la akvomesho (akvo.ts) kaj la piedira/kanua testilo.
export function lagoRadio( ang: number ): number {
  const ondo = Math.sin( 0o5 * ang + 0o23/0o20 ) + 0o1/0o2 * Math.sin( 0o13 * ang + 0o7/0o10 );
  const rx = LAGO_RX * ( 0o1 + 0o1/0o12 * ondo * 2/3 );
  const rz = LAGO_RZ * ( 0o1 + 0o1/0o12 * ondo * 2/3 );
  return 1 / Math.sqrt( ( Math.cos( ang ) / rx ) ** 2 + ( Math.sin( ang ) / rz ) ** 2 );
}
export function cxuEnLago( x: number, z: number ): boolean {
  const ang = Math.atan2( z - lagoZ(), x - LAGO_X );
  return Math.hypot( x - LAGO_X, z - lagoZ() ) < lagoRadio( ang );
}

// RIVERA_BUŜO_X — kie la rivera centra linio unue eniras la lagon ( la okcidenta
// buŝo ). La rivera ribono finiĝas ĉi tie anstataŭ tranĉi tra la laga surfaco,
// kaj la akvonivela krampo ( riveraAkvaNivelo ) algluas la riveron al la lago.
// Komputita unufoje ĉe modulo-ŝarĝo per skana serĉo: la rivero alvenas de
// okcidento ( +x ), do ni iras orienten ( malkreskanta x ) ĝis la UNUA punkto
// ene de la lago — tio estas la enirbordo, ne la orienta elirbordo.
export const RIVERA_BUŜO_X: number = (() => {
  for ( let i = 0; i <= 0o500; i++ ) {
    const x = LAGO_X + LAGO_RX + 0o100 - i;
    if ( cxuEnLago( x, riveroZ( x ) ) ) return x;
  }
  return LAGO_X + LAGO_RX;   // sekurkopio — ne atingita en normala geometrio
})();

// riveraAkvaNivelo — la akvosurfaca Y de la rivero, glate krampita al la laga
// nivelo dum la lastaj ~72 unuoj antaŭ la buŝo, por ke la rivero enfluu la
// lagon sen videbla paŝo ( la laga nivelo estas plata; la rivero adaptiĝas ).
export function riveraAkvaNivelo( x: number ): number {
  const m = glataPaso( RIVERA_BUŜO_X - 0o110, RIVERA_BUŜO_X, x );
  return akvoY( x ) * ( 1 - m ) + lagoNivelo() * m;
}

// akvaNivelo — la akvosurfaca Y en la lago aŭ la rivero.
export function akvaNivelo( x: number, z: number ): number {
  return cxuEnLago( x, z ) ? lagoNivelo() : riveraAkvaNivelo( x );
}

// Baza tereno. mildaj ruligxantaj montetoj por la arbaro trans la urbo
export function montetaBazo(x: number, z: number): number {
  return 0o215/0o100 * Math.sin(x * 0o1/0o40 + 0o43/0o40) * Math.cos(z * 0o1/0o40 - 0o4/0o10)
    + 0o55/0o40 * Math.sin(x * 0o1/0o20 - 0o163/0o100) * Math.sin(z * 0o1/0o20 + 0o115/0o100)
    + 0o23/0o40 * Math.sin((x + z) * 0o3/0o100 + 0o23/0o100);
}

export function akvoY(x: number): number { return montetaBazo(x, riveroZ(x)) - 0o415/0o100; }

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
  altecoFina -= 0o100/0o10 * Math.exp(-(rd * rd) / 0o144);
  // Laga baseno oriente — pli larĝa ol la rivero, kun glataj bordoj: la tero
  // subeniras sub la akvonivelon ene de la lagrando kaj leviĝas al la bordo.
  // La rando sekvas la saman ondigitan elipson kiel la akvomesho ( lagoRadio ).
  const lagD = Math.hypot( x - LAGO_X, z - lagoZ() );
  // La kavo estas nula ekster la lagrando ( lagR ≤ ~0o140 = 96, la plej granda
  // lagradiuso ~87 kun la ondo-perturbo ); saltu la trigonometrion por la vasta
  // plimulto de punktoj, ĉar alteco estas varmega funkcio.
  if ( lagD < 0o140 ) {
    const lagR = lagoRadio( Math.atan2( z - lagoZ(), x - LAGO_X ) );
    let basenFaktoro = 1;
    // River-buŝa delto — kie la rivero enfluas, la kanalo malprofundiĝas glate
    // por renkonti la lagon samnivele. La ribono mallarĝiĝas dum la lastaj 0o40
    // unuoj ( akvo.ts ), kaj ĉi tiu levo levas la fundon tiel, ke la malseka
    // larĝo sekvas la ribonan larĝon — neniu elmetita riverfundo aŭ seka bordo
    // ĉe la buŝo. La levo neniam superas la akvonivelon ( la plej granda levo
    // estas la akvonivela profundo 0o100/0o10 − 0o415/0o100 ), do la kanalo
    // restas malseka ĝis la bordo kaj la lago transprenas.
    const rf = glataPaso( RIVERA_BUŜO_X, RIVERA_BUŜO_X + 0o40, x );   // 0 ĉe la buŝo, 1 okcidente
    if ( rf < 1 ) {
      // enLagon — la levo pleniĝas ĉe la buŝo kaj fadas okcidenten ( la sama
      // 0o40-unua fenestro kiel la ribona mallarĝiĝo ), por ke la delto ne
      // leviĝu super la akvonivelon en la alproksimiĝo ( kie la monteta bazo
      // povus malsupreniri ) — sen ĝi la kanalo sekigus antaŭ la buŝo.
      // Oriente en la lagon la levo restas plena laŭ la kanala tongo kaj la
      // baseno profundiĝas ĉirkaŭ ĝi.
      const enLagon = 1 - rf;
      const levo = Math.max( 0, 0o100/0o10 - 0o415/0o100 * Math.exp( 0o7/0o10 * rf * rf ) );
      altecoFina += levo * enLagon * Math.exp( -( rd * rd ) / 0o144 );
    }
    altecoFina -= 0o106/0o10 * ( 1 - glataPaso( lagR * 0o3/0o4, lagR, lagD ) ) * basenFaktoro;
  }
  // Kosmoporda startejo — platigi la terenon sub la stacio kaj ĝia aprono,
  // por ke la konstruajxo ne estu enterigita en la dekliva arbaro. La stacio
  // sidas malantaŭ la norda nova ekstera domo ( z=0o140 ).
  const padX = 0, padZ = 0o140, padR = 0o14;
  const padD = Math.hypot(x - padX, z - padZ);
  const padMiksilo = 1 - glataPaso(padR - 6, padR, padD);
  if ( padMiksilo > 0 ) {
    const padRD = padZ - riveroZ(padX);
    const padAlto = montetaBazo(padX, padZ) - 0o100/0o10 * Math.exp(-(padRD * padRD) / 0o144);
    altecoFina = altecoFina * (1 - padMiksilo) + padAlto * padMiksilo;
  }
  return altecoFina;
}
