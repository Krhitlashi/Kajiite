// ≺⧼ Akvo 🌊 ⧽≻
// La akva subsistemo de la skulptilo — la FONTOJ ( la nura enigo ), la deriva
// akvokalkulo kaj la specimenaj helpiloj, kiujn legas la 2D-bako ( bako.js )
// kaj la 3D-vido. La stato de la akvo logxas cxi tie — la cefa dosiero legas
// gxin rekte ( la vivaj ligoj de ES-moduloj ) kaj sxangxas gxin per la agordaj
// funkcioj malsupre. La kalkulo mem venas de la komuna modulo
// kantaoj/mondo/akvokalkulo.ts — la sama kiel la ludo, do la skulptilo kaj la
// ludo montras la saman akvon.
import { bazaAlteco } from "../../../kantaoj/mondo/tereno.js";
import { distancoDeFormo } from "../../../eskekoj/komunajxoj/mapformo.js";
import { kalkuliAkvon, akvoCxe, niveloCxe, niveloProksima,
  specimenoDulineara } from "../../../kantaoj/mondo/akvokalkulo.js";

// ⟪ La akva stato 📃 ⟫ — la fontoj kaj la du labor-statoj. La cefa dosiero
// legas ilin rekte; la agordaj funkcioj ( malsupre ) estas la nura vojo
// sxangxi ilin de ekstere.
// La akvofontoj — { x, z, fluo } ( la akvo estas deriva de ili ).
export let fontoj = [];
export let elektitaFonto = -1;    // la elektita fonto ( reliefigita )
export let fontoTrenata = -1;     // la trenata fonto ( la kapto de la klako )
export let fluoValoro = 0o6;      // la fluo de novaj fontoj ( la glitilo )
export let akvaRezulto = null;    // la rezulto de kalkuliAkvon
export let akvoMalpura = true;    // ĉu la akvo rekalkulu ( en la kadra buklo )
export let akvoTrenanta = false;  // dum fonta treno la akvo ne rekalkulu cxiun kadron
export let akvaNiveloValoro = 0;  // la agordebla akva nivelo

// La referencoj de la cefa dosiero — agordiAkvon ligas ilin unufoje.
let masko, deltoj, deltoInterp;
let N, PASO, X0, Z0;
let ORIGINO = [ 0, 0 ];
let formo, momenti, statuso, fluoRegilo, gxisdatigiValorojn,
  gxisdatigiAkvajnStatistikojn, rekonstruiFontojn3D,
  gxisdatigiPlenan2Dn, gxisdatigi3DnPostPlena, markiSxangxitan, markiDesegnon;

// agordiAkvon — la unufoja kunligo kun la ĉefa dosiero. La tabeloj ( la masko
// kaj la deltoj ) neniam reasigniĝas, do la referencoj restas validaj dum la
// tuta seanco. La formo de la mondo legigxas per FUNKCIO — ĝi sxangxigxas en la
// mapo-panelo — kaj la desegnaj funkcioj venas kiel fermoj, ĉar ilia stato
// ( la statusskribo, la bezono-desegno ) logxas en la ĉefa dosiero.
//     @param k ( object ) - La referencoj de la ĉefa dosiero.
export function agordiAkvon(k) {
  masko = k.masko; deltoj = k.deltoj; deltoInterp = k.deltoInterp;
  N = k.N; PASO = k.PASO; X0 = k.X0; Z0 = k.Z0;
  ORIGINO = [ X0, Z0 ];
  akvaNiveloValoro = k.nivelo;
  formo = k.formo;
  momenti = k.momenti; statuso = k.statuso; fluoRegilo = k.fluoRegilo;
  gxisdatigiValorojn = k.gxisdatigiValorojn;
  gxisdatigiAkvajnStatistikojn = k.gxisdatigiAkvajnStatistikojn;
  rekonstruiFontojn3D = k.rekonstruiFontojn3D;
  gxisdatigiPlenan2Dn = k.gxisdatigiPlenan2Dn;
  gxisdatigi3DnPostPlena = k.gxisdatigi3DnPostPlena;
  markiSxangxitan = k.markiSxangxitan; markiDesegnon = k.markiDesegnon;
}

// ⟪ La agordaj funkcioj 📃 ⟫ — la cefa dosiero sxangxas la akvan staton per
// cxi tiuj ( la importitaj valoroj estas nur legeblaj ).
export function agordiFontojn(listo) { fontoj = listo; }
export function agordiElektitanFonton(ind) { elektitaFonto = ind; }
export function agordiFontoTrenatan(ind) { fontoTrenata = ind; }
export function agordiFluoValoron(v) { fluoValoro = v; }
export function agordiAkvanNivelon(v) { akvaNiveloValoro = v; }
export function agordiAkvoTrenantan(b) { akvoTrenanta = b; }
// markiAkvonMalpuran — la tereno sxangxigxis ( sen la akvo mem ).
export function markiAkvonMalpuran() { akvoMalpura = true; }

// ⟨ La akvaj helpiloj 📃 ⟩ — la REZULTO de la akvokalkulo ( ne la pentrita
// masko ). La ludo legas la samajn kampojn per la samaj specimenaj funkcioj
// ( kantaoj/mondo/akvokalkulo.ts ), do la ilo kaj la ludo montras la saman akvon.
// akvaKavoInterp — la akva eltrancxo ( la riverlito mordita de la akvo ).
export function akvaKavoInterp(x, z) {
  if ( !akvaRezulto ) return 0;
  return specimenoDulineara(akvaRezulto.kavoj, N, PASO, ORIGINO, x, z);
}
// teraAlto — la videbla tereno: la procedura bazo, la skulptitaj deltoj kaj la
// akva eltrancxo ( la sama sumo kiel alteco() en tereno.ts ).
export function teraAlto(x, z) {
  return bazaAlteco(x, z) + deltoInterp(x, z) - akvaKavoInterp(x, z);
}
// cxuAkvo — ĉu la punkto estas akvo ( la deriva masko ).
export function cxuAkvo(x, z) {
  return !!akvaRezulto && akvoCxe(akvaRezulto, N, PASO, ORIGINO, x, z);
}
// akvaNiveloEn — la akvosurfaca Y, aŭ null. La riveroj malsupreniras, la
// basenoj estas plataj — ĉiu akva ĉelo portas sian propran nivelon.
export function akvaNiveloEn(x, z) {
  if ( !akvaRezulto ) return null;
  const v = niveloCxe(akvaRezulto, N, PASO, ORIGINO, x, z, 0o1);
  return Number.isNaN(v) ? null : v;
}
// akvaNiveloProksima — la nivelo de la plej proksima akvo ( gxis du ĉeloj for ),
// aŭ la agordita akva nivelo. La tera akvoborda tavolo bezonas gxin.
export function akvaNiveloProksima(x, z) {
  if ( !akvaRezulto ) return akvaNiveloValoro;
  const v = niveloProksima(akvaRezulto, N, PASO, ORIGINO, x, z, 0o2);
  return Number.isNaN(v) ? akvaNiveloValoro : v;
}
// akvaNiveloDe — la akva nivelo por kradĉelo ( i, j ) ĉe ( x, z ). la
// pentrita masko decidas — la sama regulo kiel la ludo — alie nenio.
export function akvaNiveloDe(i, j, x, z) {
  if ( !akvaRezulto || akvaRezulto.masko[j * N + i] !== 1 ) return null;
  const nivelo = akvaRezulto.niveloj[j * N + i];
  return Number.isNaN(nivelo) ? akvaNiveloValoro : nivelo;
}
// rekalkuliAkvon — rulu la akvan kalkulon. La tereno estas la SEKA tereno ( la
// deltoj sen la eltrancxo ) — alie la kalkulo ripetus sian propran eltrancxon kaj
// la kanalo profundigxus sen fino.
export function rekalkuliAkvon() {
  akvoMalpura = false;
  const [ fl, fg ] = formo();
  akvaRezulto = kalkuliAkvon(N, PASO, ORIGINO,
    ( x, z ) => bazaAlteco(x, z) + deltoInterp(x, z),
    ( x, z ) => distancoDeFormo(fl, fg, x, z) <= 0,
    fontoj, masko,
    { nivelo: akvaNiveloValoro } );
  gxisdatigiAkvajnStatistikojn();
  rekonstruiFontojn3D();
  gxisdatigiPlenan2Dn();
  gxisdatigi3DnPostPlena();
}
// akvoSxangxigxis — io sangxis la akvon ( la tereno, la fontoj, la nivelo ).
// La buklo rekalkulas unufoje po kadro ( sed ne dum fonta treno — tiam la
// kalkulo atendus la finon de la treno ).
export function akvoSxangxigxis() {
  akvoMalpura = true;
  markiSxangxitan();
}

// ⟨ La akvofontoj 📃 ⟩ — la akva ilo metas, movas kaj forigas FONTOJN. La
// riveroj elfluas de ili, la kavoj plenigxas, la kanaloj eltrancxigxas.
const FONTA_GLUO = 0o1/0o4;      // 0.25 — la fontoj algluigxas kiel la objektoj
function algluiFonton(v) { return Math.round(v / FONTA_GLUO) * FONTA_GLUO; }
// fontoCxePunkto — la indekso de la fonto plej proksima al la punkto ( en
// mondunuoj ), aux -1 se neniu estas ene de la radiuso.
export function fontoCxePunkto(x, z, r = 0o10) {
  let plejBona = -1, plejBonaD = r;
  for ( let i = 0; i < fontoj.length; i++ ) {
    const d = Math.hypot(fontoj[i].x - x, fontoj[i].z - z);
    if ( d < plejBonaD ) { plejBonaD = d; plejBona = i; }
  }
  return plejBona;
}
// metiFonton — nova fonto cxe la punkto kun la fluo de la glitilo.
export function metiFonton(x, z, fluo = fluoValoro) {
  momenti();
  fontoj.push({ x: algluiFonton(x), z: algluiFonton(z), fluo });
  elektitaFonto = fontoj.length - 1;
  statuso("Fonto metita ( fluo " + fluoValoro + " ) — la akvo fluas malsupren");
  akvoSxangxigxis();
  markiDesegnon();
}
// forigiFonton — forigu fonton ( la akvo de gxi malaperas ).
export function forigiFonton(ind) {
  if ( ind < 0 || ind >= fontoj.length ) return;
  momenti();
  fontoj.splice(ind, 1);
  elektitaFonto = -1;
  fontoTrenata = -1;
  statuso("Fonto forigita");
  akvoSxangxigxis();
  markiDesegnon();
}
// komenciFontanTrenon / sxangiFontanPozicion / finiFontanTrenon — kaptu fonton
// kaj trenu gxin ( la akvo rekalkuligxas cxe la fino de la treno ).
export function komenciFontanTrenon(ind, x, z) {
  momenti();
  elektitaFonto = ind;
  fontoTrenata = ind;
  akvoTrenanta = true;
  // La glitilo sekvu la fluon de la kaptita fonto.
  fluoValoro = fontoj[ind].fluo;
  fluoRegilo().value = String(fluoValoro);
  gxisdatigiValorojn();
  sxangiFontanPozicion(ind, x, z);
}
export function sxangiFontanPozicion(ind, x, z) {
  if ( ind < 0 || ind >= fontoj.length ) return;
  fontoj[ind].x = algluiFonton(x);
  fontoj[ind].z = algluiFonton(z);
  akvoSxangxigxis();
  markiDesegnon();
}
export function finiFontanTrenon() {
  if ( fontoTrenata < 0 ) return;
  fontoTrenata = -1;
  akvoTrenanta = false;
  akvoSxangxigxis();
  statuso("Fonto " + ( elektitaFonto + 1 ) + " movita — la akvo refreŝigxas");
}
// sxangxiFluonDeElektita — la glitilo de la fluo dum la fonta ilo: kun
// elektita fonto gxi sxangxas gxian fluon, alie gxi difinas la fluon de la
// venontaj fontoj.
export function sxangxiFluonDeElektita() {
  if ( elektitaFonto >= 0 && elektitaFonto < fontoj.length ) {
    fontoj[elektitaFonto].fluo = fluoValoro;
    akvoSxangxigxis();
  }
}

// ⟨ Fontoj el la pentrita akvo 📃 ⟩ — la malnova pentrita akvomasko diras KIE
// la akvo devus esti, sed ne DE KIE gxi venas. Cxi tiu ago legas gxin kaj
// metas la fontojn — sed ne unu po pentrita makulo: gxi FLUAS la kalkulon kaj
// rigardas, kiuj pentritaj celoj restas SEKaj, poste metas fonton cxe la plej
// alta seka celo, kaj ripetas. La fontoj do aperas nur tie, kie la akvo vere
// bezonas eniron — la basenoj plenigxas per si mem ( la semoj ), kaj la
// riveroj supren-sxovas gxis la akvo atingas la tutan pentritan akvon.
//     @returns { fontoj, sekaj } — la metitaj fontoj kaj la restaj sekaj celoj.
export function deriviFontojnElPentrita(){
  // La terenaj altoj de la pentritaj celoj — unufoja specimenado.
  const H = new Float32Array(N * N);
  let profundaj = 0;
  for ( let id = 0; id < N * N; id++ ) {
    if ( !masko[id] ) continue;
    const ix = id % N, iz = ( id - ix ) / N;
    H[id] = bazaAlteco(X0 + ix * PASO, Z0 + iz * PASO) + deltoj[id];
    if ( H[id] > akvaNiveloValoro + 0o1/0o2 ) profundaj++;
  }
  const novaj = [];
  let sekaj = 0, antauxa = -0o1, malsukcesoj = 0;
  const [ fl, fg ] = formo();
  // Nur la PROFUNDAJ pentritaj celoj gravas — la celoj apud la akva nivelo
  // ( la strando ) restas sekaj cxiam, cxar la akvo tie estas tro malprofunda
  // por eltrancxi kanalon. La fontoj celas la partojn, kiuj vere portas akvon.
  for ( let ripeto = 0; ripeto < 0o14 && malsukcesoj < 0o3; ripeto++ ) {
    const rez = kalkuliAkvon(N, PASO, ORIGINO,
      ( x, z ) => bazaAlteco(x, z) + deltoInterp(x, z),
      ( x, z ) => distancoDeFormo(fl, fg, x, z) <= 0,
      fontoj.concat(novaj), masko, { nivelo: akvaNiveloValoro });
    // La pentritaj celoj, kiujn la akvo ankoraux ne atingas. Sub la akva
    // nivelo la celoj estas basenoj — la semoj plenigas ilin, do ili ne gravas
    // por la fontoj; super la nivelo la rivero devas alveni.
    const sekajCxeloj = [];
    sekaj = 0;
    for ( let id = 0; id < N * N; id++ ) {
      if ( !masko[id] ) continue;
      if ( H[id] <= akvaNiveloValoro + 0o1/0o2 ) continue;
      const ix = id % N, iz = ( id - ix ) / N;
      const x = X0 + ix * PASO, z = Z0 + iz * PASO;
      // Ekster la mondformo neniu rivero povas flui — la pentrita akvo de la
      // malnovaj mapoj etendigxas gxis la krada rando.
      if ( distancoDeFormo(fl, fg, x, z) > 0 ) continue;
      if ( akvoCxe(rez, N, PASO, ORIGINO, x, z) ) continue;
      sekaj++;
      sekajCxeloj.push(id);
    }
    if ( sekaj <= 0o2 || !sekajCxeloj.length ) break;
    // La plej alta unue — la akvo devas eniri supre kaj flui malsupren. La
    // celoj apud jam metita fonto ne helpas ( neniu nova akvo venus ), do ni
    // preterpasas ilin ( kaj la buklo haltas, se la kovro ne plu kreskas ).
    sekajCxeloj.sort(( a, b ) => H[b] - H[a]);
    let elektita = -1;
    for ( const id of sekajCxeloj ) {
      const ix = id % N, iz = ( id - ix ) / N;
      const fx = algluiFonton(X0 + ix * PASO), fz = algluiFonton(Z0 + iz * PASO);
      let jamTie = false;
      for ( const f of fontoj ) if ( Math.hypot(f.x - fx, f.z - fz) < 0o14 ) { jamTie = true; break; }
      if ( jamTie ) continue;
      for ( const f of novaj ) if ( Math.hypot(f.x - fx, f.z - fz) < 0o14 ) { jamTie = true; break; }
      if ( jamTie ) continue;
      elektita = id;
      break;
    }
    if ( elektita < 0 ) break;
    const ix = elektita % N, iz = ( elektita - ix ) / N;
    // La fluo laux la largho de la kanalo apud la fonto — la pentrita rivero
    // diras, kiom largha la akvo devus esti ( 5-obla fenestro, do /5 = cxeloj ).
    let najbaraj = 0;
    for ( let dz = -0o2; dz <= 0o2; dz++ ) {
      for ( let dx = -0o2; dx <= 0o2; dx++ ) {
        const nx = ix + dx, nz = iz + dz;
        if ( nx < 0 || nz < 0 || nx >= N || nz >= N ) continue;
        if ( masko[nz * N + nx] ) najbaraj++;
      }
    }
    const larghxo = Math.max(1, najbaraj / 0o5);
    novaj.push({ x: algluiFonton(X0 + ix * PASO), z: algluiFonton(Z0 + iz * PASO),
      fluo: Math.max(0o4, Math.min(0o40, Math.round(larghxo * 0o6))) });
    malsukcesoj = novaj.length > 1 && sekaj >= antauxa ? malsukcesoj + 1 : 0;
    antauxa = sekaj;
  }
  if ( novaj.length ) {
    momenti();
    for ( const f of novaj ) fontoj.push(f);
    elektitaFonto = fontoj.length - 1;
    fluoValoro = fontoj[elektitaFonto].fluo;
    fluoRegilo().value = String(fluoValoro);
    akvoSxangxigxis();
    gxisdatigiValorojn();
    markiDesegnon();
  }
  // La kovro de la PROFUNDAJ pentritaj celoj ( super la nivelo ) — tio estas,
  // kiom multe de la malnova rivero la novaj fontoj sukcesis revivigi.
  const kovro = profundaj ? Math.round(( 0o1 - sekaj / profundaj ) * 0o144 ) : 0o144;
  statuso(novaj.length
    ? novaj.length + " fonto" + ( novaj.length === 1 ? "" : "j" ) + " metitaj — la akvo fluas malsupren"
      + ( kovro < 0o144 ? " ( la malgrandaj fontoj ne kovras la tutan malnovan pentritan akvon )" : "" )
    : ( profundaj ? "La akvo jam fluas — neniu fonto bezonata ( la pentrita akvo estas baseno )"
      : "Neniu pentrita akvo trovigxis" ));
  return { fontoj: novaj, sekaj, kovro };
}
