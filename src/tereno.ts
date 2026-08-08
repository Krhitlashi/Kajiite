// Tereno — terenaj alteco-funkcioj por la Aranis-valo
import { skulptaDelta, skulptitaAkvo, SKULPTA_AKVA_NIVELO } from "./tero-datumo.js";

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

// akvaNivelo — la akvosurfaca Y en la lago, la nordorienta rivereto, la cxefa
// rivero aŭ la pentrita ( skulptita ) akvo. La skulptita masko superregas la
// naturan akvon, por ke la ludanto nagxu en la pentritaj basenoj.
export function akvaNivelo( x: number, z: number ): number {
  if ( skulptitaAkvo( x, z ) ) return SKULPTA_AKVA_NIVELO;
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

// alteco — La plena terena alto: la procedura bazo plus la skulptita tavolo
// ( se la skulptilo savis datumaron ). Cxiuj grundo/kolizio/akva kalkuloj
// legas cxi tiun funkcion, do la skulptajxo sxangxas la tutan mondon.
export function alteco(x: number, z: number): number {
  return bazaAlteco(x, z) + skulptaDelta(x, z);
}

// bazaAlteco — La natura ( procedura ) tereno. ĈI TIU LAYERO ESTAS PLATA:
// la mondon ( montoj, rivero, lago, ĉio ) portas la skulptita tavolo
// ( tero-datumo.ts ), bakitita de la skulptilo en la dosieron. La ludo legas
// alteco() = bazaAlteco + skulptaDelta, do la tuta tereno estas nun redaktebla
// en iloj/tero-skulptilo.html — ne plu kaŝita procedura generado.
export function bazaAlteco(x: number, z: number): number {
  return 0;
}

// Re-eksportoj — la skulptita tavolo el tero-datumo.ts, por ke la konsumantoj
// ( sperto.ts, urbo.ts ) legu gxin de cxi tiu modulo kiel la ceteran terenon.
export { skulptitaAkvo, skulptaAkvaLimoj, SKULPTA_PASO, SKULPTA_AKVA_NIVELO } from "./tero-datumo.js";
