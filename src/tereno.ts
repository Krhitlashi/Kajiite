// Tereno — terenaj alteco-funkcioj por la Aranis-valo

// Rivero fluas orient-okcidente kun milda suda kurbo
// Rivero fluas orient-okcidente — ŝovita suden por malbari la urban kradon
export function riveroZ(x: number): number { return 0o14 * Math.sin(x * 0o1/0o100) - 0o160; }

// Duon-larĝo de la rivera ribono — dividita inter la akva modulo ( urbo.ts ) kaj
// la promenanta akvo-zono ( sperto.ts ), por ke ili ne disiĝu. Antaŭe la piedira
// zono estis 7 ( pli mallarĝa ol la rivero ), do eliri de la doko-pinto
// terenfalis al la riverfundo anstataŭ flosi.
export const RIVERA_DUONLARĜO = 0o124/0o10;

// ⟪ Lago oriente 📃 ⟫ — la rivero enfluas larĝan lagon oriente de la valo.
// Sur la norda mapo ( supro = nordo, +z ) la oriento estas -x ( dekstre ), do
// la lago kuŝas oriente de la urbo. La lago estas ne-akurata elipso ( pli
// larĝa norde-sude, kun milde ondigita rando ), centrita norde de la rivero.
// Ĝi kreskis laŭlonge de la tempo. Etendita orienten ( RX, kun la centro
// ŝovita orienten tiel, ke la okcidenta pinto kaj la akvonivelo restu samaj —
// la rivera buŝo kaj la dokoj ne moviĝas ) kaj ankoraŭ pli norden ( RZ kreskis
// kaj la centro ŝoviĝis norden ), por ke la lago prenu multe da spaco norde de
// la rivero — ĝia norda bordo nun atingas la sudan urban latitudon.
export const LAGO_X = -0o270;   // -184 — oriento de la urbo ( -x sur la norda mapo )
export const LAGO_RX = 0o60;    // 48 — duon-larĝo laŭ x ( la rivero enfluas okcidente )
export const LAGO_RZ = 0o120;   // 80 — duon-larĝo laŭ z ( multe da spaco norde )
// RIVERA_ENFLUO_X — kie la rivera ribono finiĝas. Ĝi sidas ENE de la lago
// ( 0o10 for de la okcidenta pinto ), kie la lagbordo estas larĝa ĉordo kovranta
// la tutan riverlarĝon — la rivero ŝajnas enflui la lagon sen videbla rando.
export const RIVERA_ENFLUO_X = LAGO_X + LAGO_RX - 0o10;   // -144
// La lagcentro sidas norde de la rivero ( je la buŝo ), do la lago prenas
// multe pli da spaco norde ol la malnova disko.
export function lagoZ(): number { return riveroZ(RIVERA_ENFLUO_X) + 0o30; }
export function lagoNivelo(): number { return akvoY( RIVERA_ENFLUO_X ); }
// lagoRadio — la lagrando. Elipso kun milda ondo-perturbo. Unu komuna fonto
// por la baseno (alteco), la akvomesho (akvo.ts) kaj la piedira/kanua testilo.
export function lagoRadio( ang: number ): number {
  const ondo = Math.sin(0o5 * ang + 0o23/0o20) + 0o1/0o2 * Math.sin(0o13 * ang + 0o7/0o10);
  const rx = LAGO_RX * ( 0o1 + 0o1/0o12 * ondo * 0o2/0o3 );
  const rz = LAGO_RZ * ( 0o1 + 0o1/0o12 * ondo * 0o2/0o3 );
  return 1 / Math.sqrt(( Math.cos(ang) / rx ) ** 2 + ( Math.sin(ang) / rz ) ** 2);
}
export function cxuEnLago( x: number, z: number ): boolean {
  const ang = Math.atan2(z - lagoZ(), x - LAGO_X);
  return Math.hypot(x - LAGO_X, z - lagoZ()) < lagoRadio(ang);
}

// RIVERA_BUŜO_X — kie la rivera centra linio unue eniras la lagon ( la okcidenta
// buŝo ). La rivera ribono finiĝas ĉi tie anstataŭ tranĉi tra la laga surfaco,
// kaj la akvonivela krampo ( riveraAkvaNivelo ) algluas la riveron al la lago.
// Komputita unufoje ĉe modulo-ŝarĝo per skana serĉo. La rivero alvenas de
// okcidento ( +x ), do ni iras orienten ( malkreskanta x ) ĝis la UNUA punkto
// ene de la lago — tio estas la enirbordo, ne la orienta elirbordo.
export const RIVERA_BUŜO_X: number = (() => {
  for ( let i = 0; i <= 0o500; i++ ) {
    const x = LAGO_X + LAGO_RX + 0o100 - i;
    if ( cxuEnLago(x, riveroZ(x)) ) return x;
  }
  return LAGO_X + LAGO_RX;   // sekurkopio — ne atingita en normala geometrio
})();

// riveraAkvaNivelo — la akvosurfaca Y de la rivero, glate krampita al la laga
// nivelo dum la lastaj ~0o110 unuoj antaŭ la buŝo, por ke la rivero enfluu la
// lagon sen videbla paŝo ( la laga nivelo estas plata; la rivero adaptiĝas ).
export function riveraAkvaNivelo( x: number ): number {
  const m = glataPaso(RIVERA_BUŜO_X - 0o110, RIVERA_BUŜO_X, x);
  return akvoY(x) * ( 1 - m ) + lagoNivelo() * m;
}

// akvaNivelo — la akvosurfaca Y en la lago, la nordorienta rivereto aŭ la cxefa rivero.
export function akvaNivelo( x: number, z: number ): number {
  if ( cxuEnNordorientaRivero( x, z ) ) return riveraNordOrientaNivelo( z );
  return cxuEnLago(x, z) ? lagoNivelo() : riveraAkvaNivelo(x);
}

// Baza tereno. mildaj ruligxantaj montetoj por la arbaro trans la urbo
export function montetaBazo(x: number, z: number): number {
  return 0o215/0o100 * Math.sin(x * 0o1/0o40 + 0o43/0o40) * Math.cos(z * 0o1/0o40 - 0o4/0o10)
    + 0o55/0o40 * Math.sin(x * 0o1/0o20 - 0o163/0o100) * Math.sin(z * 0o1/0o20 + 0o115/0o100)
    + 0o23/0o40 * Math.sin(( x + z ) * 0o3/0o100 + 0o23/0o100);
}

export function akvoY(x: number): number { return montetaBazo(x, riveroZ(x)) - 0o415/0o100; }

export function glataPaso(lo: number, hi: number, v: number): number {
  const t = Math.max(0, Math.min(1, ( v - lo ) / ( hi - lo )));
  return t * t * ( 3 - 2 * t );
}

// montaroNorda — La norda montaro. Piedirebla montara zono norde de la urbo,
// kie la arbaro transiras al montoj. La dezajno sekvas la saman gramatikon
// kiel la orienta monto ( montaroNordOrienta ): ĉiu monto estas unu maso kun
// ĉefa pinto, pli malalta kunulo, larĝa dorso kaj selo inter la pintoj.
// Kontraste al antaŭe ( tri larĝaj masivoj kiuj kunkreskis en unu kontinuan
// ŝvelaĵon ), la montoj nun sidas pli dise laŭ la kresto kun profundaj
// sel-noĉoj inter ili, do la montaro legiĝas kiel pluraj apartaj montoj kun
// videblaj valoj anstataŭ unu kunligita areo. La suda flanko restas longa
// ramplo kaj la norda flanko pli kruta al la grundrando ( z≈0o444 ), kaj la
// finoj malsupreniĝas per longaj spronoj al la maprando.
// montaroNordOrienta — Nova orienta monto norde de la lago. La antaŭa
// radia kupolo situis tro malproksime oriente kaj jam estis nula ĉe la
// riverfonto, do ĝi aspektis kiel izolita ŝvelaĵo kaj la rivero ŝajnis veni de
// plata tereno. Ĉi tiu formo uzas apartajn pintojn, larĝan sudan antaŭtason kaj
// mildajn fadojn al la lago, la valo kaj la norda maprando.
export function montaroNordOrienta( x: number, z: number ): number {
  const sudaEniro = glataPaso( 0o44, 0o122, z );
  if ( sudaEniro <= 0 ) return 0;
  const nordaEliro = 1 - glataPaso( 0o130, 0o200, z );
  if ( nordaEliro <= 0 ) return 0;
  const okcidentaEliro = glataPaso( -0o434, -0o400, x );
  if ( okcidentaEliro <= 0 ) return 0;
  const orientaEliro = 1 - glataPaso( -0o366, -0o302, x );
  if ( orientaEliro <= 0 ) return 0;
  const envolvaĵo = Math.min( sudaEniro, nordaEliro, okcidentaEliro, orientaEliro );

  // Ĉefa pinto — larĝa, iom nordokcidente de la riverfonto.
  const dx1 = ( x + 0o370 ) / 0o56, dz1 = ( z - 0o126 ) / 0o56;
  const pinto1 = 0o40 * Math.exp( -0o1/0o2 * ( dx1 * dx1 + dz1 * dz1 ) );
  // Orienta kunulo — pli malalta pinto super la rivera valo.
  const dx2 = ( x + 0o340 ) / 0o50, dz2 = ( z - 0o104 ) / 0o50;
  const pinto2 = 0o21 * Math.exp( -0o1/0o2 * ( dx2 * dx2 + dz2 * dz2 ) );
  // Malalta dorso ligas la du pintojn al unu monto anstataŭ du buloj.
  const dx3 = ( x + 0o354 ) / 0o50, dz3 = ( z - 0o120 ) / 0o54;
  const pinto3 = 0o16 * Math.exp( -0o1/0o2 * ( dx3 * dx3 + dz3 * dz3 ) );
  const dxS = ( x + 0o354 ) / 0o42, dzS = ( z - 0o116 ) / 0o50;
  const selo = 0o14 * Math.exp( -0o1/0o2 * ( dxS * dxS + dzS * dzS ) );
  return Math.max( 0, ( pinto1 + pinto2 + pinto3 - selo ) * envolvaĵo );
}

// ⟪ Nordorienta rivero 📃 ⟫ — rivero kiu eliras el la suda deklivo de la
// orienta monto kaj fluas suden en la lagon. La fonto estas rekte ligita al la
// antaŭtaso de la monto, ne al la malalta ebenaĵo ekster ĝia envolvaĵo.
export const RIVERA_NORDORIENTA_FONTO_Z = 0o100;
export const RIVERA_NORDORIENTA_DUONLARĜO = 0o6;

// riveroNordOrientaX — La nordorienta rivera centra linio: x por ĉiu z.
// Ĝi komenciĝas ĉe la monto ( -0o360, 0o100 ) kaj iom ŝoviĝas orienten dum ĝi
// malsupreniras al la laga buŝo. La formulo estas kontinua ĉe la fonto.
export function riveroNordOrientaX( z: number ): number {
  const zS = RIVERA_NORDORIENTA_FONTO_Z, zM = -0o170;
  const t = Math.max( 0, Math.min( 1, ( z - zM ) / ( zS - zM ) ) );
  const malsupren = 1 - t;
  return -0o360 + 0o30 * malsupren + 0o4 * Math.sin( malsupren * Math.PI * 2 );
}

// RIVERA_NORDORIENTA_BUŜO_Z — kie la nordorienta rivera centra linio unue
// eniras la lagon ( la nordorienta lagbordo ). Komputita unufoje per skana
// sercxo, kiel RIVERA_BUŜO_X. La rivero fluas norden ( +z ), do ni iras suden
// ( malkreskanta z ) ĝis la UNUA punkto ene de la lago.
export const RIVERA_NORDORIENTA_BUŜO_Z: number = (() => {
  for ( let i = 0; i <= 0o700; i++ ) {
    const z = RIVERA_NORDORIENTA_FONTO_Z - i;
    if ( cxuEnLago( riveroNordOrientaX( z ), z ) ) return z;
  }
  return -0o170;   // sekurkopio
})();

// riveraNordOrientaNivelo — La akvosurfaca Y de la nordorienta rivero: la
// tereno laŭ la pado ( bazo + monto ) minus la kutima profundo, glate krampita
// al la laga nivelo dum la lastaj ~0o120 unuoj antaŭ la buŝo, por ke la rivero
// enfluu la lagon sen videbla paso.
export function riveraNordOrientaNivelo( z: number ): number {
  const x = riveroNordOrientaX( z );
  const tero = montetaBazo( x, z ) + montaroNordOrienta( x, z );
  const m = 1 - glataPaso( RIVERA_NORDORIENTA_BUŜO_Z, RIVERA_NORDORIENTA_BUŜO_Z + 0o120, z );
  return ( tero - 0o415/0o100 ) * ( 1 - m ) + lagoNivelo() * m;
}

// cxuEnNordorientaRivero — Ĉu punkto estas en la nordorienta rivero ( la
// mallarĝa monta rivereto ). Limigita al la rivera z-zono ( de la fonto ĝis la
// buŝo ), por ke la rivereto ne etendiĝu trans la montan fontozonon aŭ en la lagon.
export function cxuEnNordorientaRivero( x: number, z: number ): boolean {
  if ( z > RIVERA_NORDORIENTA_FONTO_Z || z < RIVERA_NORDORIENTA_BUŜO_Z ) return false;
  return Math.abs( x - riveroNordOrientaX( z ) ) < RIVERA_NORDORIENTA_DUONLARĜO;
}

// montaraKonektaPiedo — larĝa transira kresto inter la orienta monto kaj la
// norda montaro. Ĝi ne estas nova akra pinto. Ĝi estas longa, malalta dorso
// kiu kunigas la du masojn super la malnova plata kudro ĉe z≈0o200.
export function montaraKonektaPiedo( x: number, z: number ): number {
  const sudaEniro = glataPaso( 0o140, 0o200, z );
  const nordaEliro = 1 - glataPaso( 0o300, 0o440, z );
  if ( sudaEniro <= 0 || nordaEliro <= 0 ) return 0;

  // La dorso komenciĝas ĉe la norda flanko de la orienta monto ( x≈-0o360 )
  // kaj leviĝas rekte al la okcidenta monto de la norda montaro ( x≈-0o320,
  // z≈0o352 ), anstataŭ preterpasi ĝin okcidenten. La pli larĝa radiuso faras
  // veran piedmontan kolon inter la du masoj, ne mallarĝan diagonalan digon.
  const dorsoX = -0o360 + ( z - 0o100 ) * 0o1/0o5;
  const d = ( x - dorsoX ) / 0o124;
  const longaDorso = 0o22 * Math.exp( -0o1/0o2 * d * d );
  // Larĝa ŝultro — plenigas la koridoron inter la du montoj ( kaj la malaltan
  // flankon okcidente de la orienta monto ) per naturaj piedmontetoj, por ke
  // la tereno inter ili leviĝu kiel unu kontinua maso anstataŭ malalta selo.
  const larĝaSxultro = 0o14 * Math.exp( -0o1/0o2 * (
    (( x + 0o346 ) / 0o150) ** 2 + (( z - 0o245 ) / 0o150) ** 2
  ) );
  return Math.max( 0, ( longaDorso + larĝaSxultro ) * sudaEniro * nordaEliro );
}

export function montaroNorda( x: number, z: number ): number {
  const sudaEniro = glataPaso(0o200, 0o346, z);   // piedo z≈0o200 → kresto z≈0o346
  if ( sudaEniro <= 0 ) return 0;
  const nordaEliro = 1 - glataPaso(0o346, 0o444, z);  // norda deklivo 0o346 → 0o444
  if ( nordaEliro <= 0 ) return 0;
  // La orienta sprono estas iom pli longa ol la okcidenta. Tio rompas la
  // malnaturan spegulon kaj lasas la orientan flankon ligiĝi al la piedo.
  const okcidentaEliro = 1 - glataPaso(0o260, 0o444, x);
  if ( okcidentaEliro <= 0 ) return 0;
  const orientaEliro = 1 - glataPaso(0o260, 0o460, -x);
  if ( orientaEliro <= 0 ) return 0;
  const envolvaĵo = Math.min( sudaEniro, nordaEliro, okcidentaEliro, orientaEliro );

  // monto — unu monta korpo kun ĉefa pinto, sudorienta kunulo, larĝa dorso
  // kaj selo inter la du pintoj — la sama strukturo kiel la orienta monto.
  // La kunulo kaj dorso estas malpezaj ( 0o4/0o10, 0o3/0o10 ), por ke la
  // montoj ne kunkresku per siaj larĝaj bas-sukoj.
  function monto( cx: number, cz: number, sx: number, sz: number, alto: number ): number {
    const dx1 = ( x - cx ) / sx, dz1 = ( z - cz ) / sz;
    const pinto = alto * Math.exp( -0o1/0o2 * ( dx1 * dx1 + dz1 * dz1 ) );
    // Kunulo — pli malalta pinto sudoriente de la ĉefa.
    const dx2 = ( x - cx - sx * 0o5/0o10 ) / ( sx * 0o17/0o20 );
    const dz2 = ( z - cz + sz * 0o4/0o10 ) / ( sz * 0o17/0o20 );
    const kunulo = alto * 0o4/0o10 * Math.exp( -0o1/0o2 * ( dx2 * dx2 + dz2 * dz2 ) );
    // Dorso — larĝa, malalta korpo kiu kunigas la du pintojn al unu maso.
    const dx3 = ( x - cx ) / ( sx * 0o11/0o12 );
    const dz3 = ( z - cz ) / ( sz * 0o11/0o12 );
    const dorso = alto * 0o3/0o10 * Math.exp( -0o1/0o2 * ( dx3 * dx3 + dz3 * dz3 ) );
    // Selo — malaltigita noĉo inter la ĉefa pinto kaj la kunulo.
    const dxS = ( x - cx - sx * 0o3/0o10 ) / ( sx * 0o6/0o10 );
    const dzS = ( z - cz + sz * 0o2/0o10 ) / ( sz * 0o17/0o20 );
    const selo = alto * 0o26/0o100 * Math.exp( -0o1/0o2 * ( dxS * dxS + dzS * dzS ) );
    return Math.max( 0, pinto + kunulo + dorso - selo );
  }

  // Tri apartaj montoj laŭ la kresto — sufiĉe dise por ke la seloj inter
  // ili malkovru la valojn, kaj je malsamaj krestaj z, por ke la ĉiellinio
  // ne estu plata muro. La okcidenta monto sidas apud la konekta piedo ( kiu
  // alvenas de la orienta monto ), kaj la orienta monto fadas per longa
  // sprono al la maprando ( la orienta envolvaĵo kaj ĝia propra suko ).
  const okcidenta = monto( -0o320, 0o352, 0o104, 0o106, 0o44 );
  const norda = monto( -0o40, 0o364, 0o112, 0o112, 0o36 );
  const centra = monto( 0o250, 0o354, 0o106, 0o106, 0o40 );

  // Seloj inter apudaj montoj — profundaj noĉoj, por ke la montaro legiĝu
  // kiel pluraj apartaj montoj kun videblaj valoj anstataŭ unu kunligita
  // ŝvelaĵo. Ĉiu noĉo sidas ĉe la mezpunkto de du apudaj montoj kaj etendiĝas
  // laŭ la kresto ( x ), kun larĝa z-envolvaĵo, por ke ĝi tranci la tutan
  // montaran korpon sen tuŝi la pintojn mem.
  const valo12 = 0o44 * Math.exp( -0o1/0o2 * (
    (( x + 0o170 ) / 0o50) ** 2 + (( z - 0o360 ) / 0o110) ** 2 ) );
  const valo23 = 0o40 * Math.exp( -0o1/0o2 * (
    (( x - 0o100 ) / 0o54) ** 2 + (( z - 0o360 ) / 0o110) ** 2 ) );

  return Math.max( 0, ( okcidenta + norda + centra - valo12 - valo23 ) * envolvaĵo );
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
  altecoFina -= 0o100/0o10 * Math.exp(-(rd * rd) / 0o140);
  // Laga baseno oriente — pli larĝa ol la rivero, kun glataj bordoj. La tero
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
    const rf = glataPaso(RIVERA_BUŜO_X, RIVERA_BUŜO_X + 0o40, x);   // 0 ĉe la buŝo, 1 okcidente
    if ( rf < 1 ) {
      // enLagon — la levo pleniĝas ĉe la buŝo kaj fadas okcidenten ( la sama
      // 0o40-unua fenestro kiel la ribona mallarĝiĝo ), por ke la delto ne
      // leviĝu super la akvonivelon en la alproksimiĝo ( kie la monteta bazo
      // povus malsupreniri ) — sen ĝi la kanalo sekigus antaŭ la buŝo.
      // Oriente en la lagon la levo restas plena laŭ la kanala tongo kaj la
      // baseno profundiĝas ĉirkaŭ ĝi.
      const enLagon = 1 - rf;
      const levo = Math.max(0, 0o100/0o10 - 0o415/0o100 * Math.exp( 0o7/0o10 * rf * rf ));
      altecoFina += levo * enLagon * Math.exp( -( rd * rd ) / 0o140 );
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
    const padAlto = montetaBazo(padX, padZ) - 0o100/0o10 * Math.exp(-(padRD * padRD) / 0o140);
    altecoFina = altecoFina * (1 - padMiksilo) + padAlto * padMiksilo;
  }
  // Norda montaro — piedirebla montara zono norde de la urbo
  altecoFina += montaraKonektaPiedo( x, z );
  altecoFina += montaroNorda( x, z );
  // Nordorienta monto — nova monto oriente-norde de la lago
  altecoFina += montaroNordOrienta( x, z );
  // Nordorienta rivera valo — mallarĝa kavo ( 0o6 ) laŭ la nova rivera pado,
  // plena de la fonto ĝis la buŝo, fadanta en la lagon post la buŝo ( la
  // lagbaseno transprenas ). La kavo restas sub la akvonivelo la tutan vojon,
  // do la rivereto estas malseka de la montodekliva fonto ĝis la lago. Super
  // la fonto la kavo fermiĝas ( RIVERA_NORDORIENTA_FONTO_Z → +0o20 ), por ke
  // ĝi ne tranĉu linian depresion tra la monta korpo — la akvomesho jam
  // mallarĝiĝas al punkto ĉe la fonto ( akvo.ts ), do neniu seka fendo restas.
  const nrd = x - riveroNordOrientaX( z );
  const valoEn = glataPaso( RIVERA_NORDORIENTA_BUŜO_Z - 0o40, RIVERA_NORDORIENTA_BUŜO_Z, z )
    * ( 1 - glataPaso( RIVERA_NORDORIENTA_FONTO_Z, RIVERA_NORDORIENTA_FONTO_Z + 0o20, z ) );
  if ( valoEn > 0 ) altecoFina -= 0o6 * Math.exp(-( nrd * nrd ) / 0o64) * valoEn;
  return altecoFina;
}
