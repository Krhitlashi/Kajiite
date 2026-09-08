// ≺⧼ Terenaj koloroj 🎨 ⧽≻
// La KOMUNA terena paletro de la ludo ( scena.ts ) kaj de la terena
// skulptilo ( iloj/tero-skulptilo.js ) — unu fonto por la izotropa bruo, la
// altecaj kolor-tavoloj kaj la alternaj triangulaj diagonaloj. Antaŭe la
// bruo kaj la indeksa konstruanto estis kopiitaj en ambaŭ dosieroj, kaj la
// paletoj devojiĝis ( la skulptilo montris aliajn kolorojn ol la ludo ).
import * as THREE from "three";

// bruo2D — izotropa valora bruo ( hash-bazita, glate interpolita ) en [0,1].
// La antaŭa du-oktava SIN-bruo havis ondofrontojn laŭ la diagonaloj — sur la
// plata natura tereno ĝi montris videblajn DIAGONALAJN STRIOJN. Ĉi tiu bruo
// havas neniun preferatan direkton — natura makuleco.
//     @param x, z ( number ) - Monda pozicio ( la skalo apartenas al la
//         vokanto — ekz. bruo2D( x / 0o60, z / 0o60 ) ).
//     @returns La bruo ( 0-1 ).
//         Example.
// @returns La brua valoro ( 0-1 )
export function bruo2D(x: number, z: number): number {
  const ix = Math.floor(x), iz = Math.floor(z);
  const fx = x - ix, fz = z - iz;
  const h = ( xi: number, zi: number ): number => {
    let n = ( xi * 0x28f0f0 + zi * 0x28d8e8 ) | 0;
    n = ( n ^ ( n >>> 13 ) ) * 0x48a028;
    return ( ( n ^ ( n >>> 16 ) ) >>> 0 ) / 4294967296;
  };
  const a = h(ix, iz), b = h(ix + 1, iz), c = h(ix, iz + 1), d = h(ix + 1, iz + 1);
  const u = fx * fx * ( 3 - 2 * fx );
  const v = fz * fz * ( 3 - 2 * fz );
  return a + ( b - a ) * u + ( c - a ) * v + ( a - b - c + d ) * u * v;
}

// alternajDiagonalojn — la triangulaj indeksoj por ( segmentoj + 1 )²
// verticoj. La diagonaloj ALTERNIĜAS per ĉelo ( ŝaktabulo ), por ke la
// montodeklivoj ne montru longajn krestojn laŭ unu konsekvenca diagonalo.
// Ĉiuj trianguloj estas kontraŭhorloĝaj vidataj de supre ( la antaŭaj
// flankoj rigardu supren, +y ).
//     @param segmentoj ( number ) - La kvanto da ĉeloj sur ĉiu flanko.
//         Example.
// @returns La indeksa listo ( 6 nombroj po ĉelo )
export function alternajDiagonalojn(segmentoj: number): number[] {
  const indeksoj: number[] = [];
  const sx = segmentoj + 1;
  for ( let j = 0; j < segmentoj; j++ ) {
    for ( let i = 0; i < segmentoj; i++ ) {
      const a = j * sx + i, b = a + 1, c = a + sx, d = c + 1;
      if ( ( i + j ) % 2 === 0 ) {
        indeksoj.push(a, c, d, a, d, b);
      } else {
        indeksoj.push(a, c, b, c, d, b);
      }
    }
  }
  return indeksoj;
}

// La paletraj koloroj — la malseketaj oliv-herbejaj nuancoj de la ludo, kun
// la malseka lito apud la akvo, la sekherba deklivo, la roko kaj la neĝo.
const HERBO_A = new THREE.Color(0x485848);
const HERBO_B = new THREE.Color(0x587058);
const LITO = new THREE.Color(0x384848);
const PROFUNDA = new THREE.Color(0x283838);
const SEKHERBO = new THREE.Color(0x787850);
const ROKO = new THREE.Color(0x787868);
const NEGO = new THREE.Color(0xe0e8f0);

// terenaKoloroEn — la natura terena koloro por la alto h ĉe ( x, z ), skribita
// en la donitan THREE.Color ( linia laborejo — taŭga rekte por la
// vertexColor-atributo de la ludo kaj de la skulptilo ).
//     @param celo ( THREE.Color ) - La cela koloro ( reskribita ).
//     @param h ( number ) - La tera alto en mondo-unuoj.
//     @param x, z ( number ) - Monda pozicio ( por la bruo ).
//     @param deklivo ( number ) - La gradiento |∇h| ( 0 ĉe nekonataj randoj —
//         tiam nur la roko laŭ la alto validas ).
//         Example.
// @returns La sama celo, reskribita
export function terenaKoloroEn(celo: THREE.Color, h: number, x: number, z: number, deklivo: number): THREE.Color {
  // Du-oktava IZOTROPA valora bruo — natura makuleco sen direkto. Milda
  // amplitudo — la makuleco restas subtila, ne bendoj.
  const t = Math.max(0, Math.min(1,
    0o4/0o10 + 0o2/0o10 * ( 2 * bruo2D(x / 0o60, z / 0o60) - 1 )
    + 0o4/0o100 * ( 2 * bruo2D(x / 0o14, z / 0o14) - 1 )));
  celo.copy(HERBO_A).lerp(HERBO_B, t);
  // Malseka lito apud la akvo, kaj la profunda fundo sub gxi.
  if ( h < -2 ) celo.lerp(LITO, Math.min(1, ( h + 2 ) / -3));
  if ( h < -5 ) celo.lerp(PROFUNDA, Math.min(1, ( h + 5 ) / -( 0o115/0o100 )));
  // Sekherba zono inter la herbejo kaj la roko — la montetoj sekigas.
  if ( h > 0o10 ) celo.lerp(SEKHERBO, Math.min(1, ( h - 0o10 ) / 0o10));
  // Rokego — kaj sur krutaj deklivoj ( kie la grundo ne tenas kreskajxon,
  // eĉ sub la arbolinio; la bordo de la rivero/lago restas herba ) kaj
  // super la arbolinio ( h > ~0o22 ). La frakcioj estas en PARENTOJ — la
  // malnova kodo skribis ( deklivo - 0o45/0o100 ) / 0o5/0o10 sen ili, kaj
  // la dekuma dekstra-asocieco faris ambaŭ lerpojn mortajn.
  const rokF = Math.max(
    Math.max(0, Math.min(1, ( deklivo - ( 0o45/0o100 ) ) / ( 0o5/0o10 ))),
    Math.max(0, Math.min(1, ( h - 0o22 ) / 0o20 )));
  celo.lerp(ROKO, rokF);
  // Neĝo sur la pintoj ( la montaro pintas ĝis ~0o60 ).
  if ( h > 0o46 ) celo.lerp(NEGO, Math.min(1, ( h - 0o46 ) / 0o10));
  return celo;
}
