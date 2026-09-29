// ≺⧼ La ĉela krado 🔷 ⧽≻
// La generita ĉela krado — la diamanta formo ( kreiKradon, enKrado ), la
// konstruaĵaj tipoj laŭ la ringo ( tipoDeRingo ), la rotacia fazo de
// kvar-blokaj ĉeloj ( fazoDeCelo ) kaj la tipoj de la kvar blokaj anguloj
// ( tipoDeBloko ).
import type { CellType, KradaArangxo, KradaĈelo } from "./tipoj.js";
// kreiKradon — la ĉefurba krado kun kvar-flanka simetrio.
//   · n=1 — plus-formo. centro kun kvar ĉirkaŭantaj.
//   · n≥2 — DIAMANTO |x| + |z| ≤ n + 1. rondeta, kvazaŭ-cirkla formo — la
//     meza bendo plenlarĝa, la flankoj glate malkreskas al la diagonalaj
//     pintoj. NENIAM kvadrato, NENIAM izolita kornera bloko kaj NENIAM
//     ŝtuparo — ĉiu ĉelo konektiĝas al sia najbaro sen malplenaj spacoj
//     ( grandeco 3 = 37 ĉeloj, 4 = 57, 5 = 81, 6 = 109 ).
export function kreiKradon(arangxo: KradaArangxo): KradaĈelo[] {
  const n = arangxo.arangxaGrando;
  const ĉeloj: KradaĈelo[] = [];
  if ( n === 1 ) {
    // Unu tavolo — centro kun kvar ĉirkaŭantaj ( plus-formo ).
    for ( const [ x, z ] of [ [ 0, 1 ], [ 0, -1 ], [ -1, 0 ], [ 1, 0 ] ] ) ĉeloj.push([ x, z, "kasafeo" ]);
    ĉeloj.push([ 0, 0, "sanktejo" ]);
    return ĉeloj;
  }
  for ( let z = n; z >= -n; z-- ) {
    for ( let x = -n; x <= n; x++ ) {
      if ( x === 0 && z === 0 ) { ĉeloj.push([ 0, 0, "sanktejo" ]); continue; }
      if ( enKrado(n, x, z) ) {
        ĉeloj.push([ x, z, tipoDeRingo(Math.max(Math.abs(x), Math.abs(z)), x, z) ]);
      }
    }
  }
  return ĉeloj;
}

// enKrado — ĉu la ĉelo ( x, z ) apartenas al la krado je grandeco n? ( la
// diamanto priskribita supre ).
function enKrado(n: number, x: number, z: number): boolean {
  return Math.abs(x) + Math.abs(z) <= n + 1;
}

// tipoDeRingo — la konstruaĵa tipo de ĉelo laŭ ĝia ringo ( la Chebyshev-
// distanco de la centro ). La tipoj estas simetriaj sur ĉiuj kvar flankoj.
// La ALIAJ tipoj ( krom la domoj ) kreskas kun la grandeco — pli granda urbo
// havas pli da turoj, kasafeoj kaj mangxejoj, ne nur pli da domoj. La domoj
// tamen ĉiam superas la aliajn konstruaĵojn kune ( „pli da domoj ol la
// aliaj konstruaĵoj ĝenerale“ ).
//   · ringo 0 — la centra konstruaĵo ( sanktejo ).
//   · ringo 1 ( rekte apud la centro ) — kasafeoj ( kunvenoĉambroj ) ĉe la
//     kardinaloj, mangxejoj ĉe la diagonaloj.
//   · ringo 2 — turoj sur la kardinalaj aksoj, domoj alie.
//   · ringo 3 — la proksim-diagonalaj ĉeloj ( |x|+|z| = 5, koordinatoj 2 kaj
//     3 ) alternas kasafeojn kaj mangxejojn ĉirkaŭ la diamanto ( ili ekzistas
//     nur de grandeco 4 supren — ĉe grandeco 3 ĉi tiu ringo estas tute domoj
//     ); la cetero domoj.
//   · ringo 4+ — turoj sur la kardinalaj aksoj, domoj alie ( la turoj kreskas
//     kvar po ringo ).
export function tipoDeRingo(r: number, x: number, z: number): CellType {
  if ( r === 0 ) return "sanktejo";
  if ( r === 1 ) return Math.abs(x) === Math.abs(z) ? "mangxejo" : "kasafeo";
  if ( r === 2 ) return Math.min(Math.abs(x), Math.abs(z)) === 0 ? "turo" : "domo";
  if ( r === 3 ) {
    // La proksim-diagonalaj ĉeloj ( koordinatoj 2 kaj 3 ) alternas la tipojn
    // ĉirkaŭ la diamanto. Kasafeo kiam la signoj de x·z kaj |x|−|z| kongruas.
    // (3,2), (−2,3), (−3,−2), (2,−3) — kaj la aliaj kvar estas mangxejoj.
    // La aro estas fermita sub 90°-rotacio, do la tuta krado restas simetria.
    if ( Math.abs(x) + Math.abs(z) === 5 ) {
      return ( x * z > 0 ) === ( Math.abs(x) > Math.abs(z) ) ? "kasafeo" : "mangxejo";
    }
    return "domo";
  }
  return Math.min(Math.abs(x), Math.abs(z)) === 0 ? "turo" : "domo";
}

// fazoDeCelo — la rotacia fazo de kvar-bloka ĉelo. la baza miksado de la
// bloko rotaciiĝas per ĉi tiu kvanto laŭ la pozicio de la ĉelo en la
// rotacia ciklo de la krado ( N→W→S→E, NE→NW→SW→SE ), por ke la TUTA krado
// estu simetria sub 90°-rotacio — la kardinalaj ĉeloj ( sur la centraj
// linioj ) kaj la diagonalaj ĉiuj rotacias laŭ sia pozicio.
export function fazoDeCelo(cx: number, cz: number): number {
  const ax = Math.abs(cx), az = Math.abs(cz);
  if ( ax === az ) {  // diagonaloj — (+,+)=0, (−,+)=1, (−,−)=2, (+,−)=3
    if ( cx > 0 && cz > 0 ) return 0;
    if ( cx < 0 && cz > 0 ) return 1;
    if ( cx < 0 && cz < 0 ) return 2;
    return 3;
  }
  if ( az > ax ) return cz > 0 ? 0 : 2;   // nordo/sudo sur la centra linio
  return cx > 0 ? 3 : 1;                  // oriento/okcidento sur la centra linio
}

// tipoDeBloko — la tipo de unu sub-konstruaĵo en kvar-bloka ĉelo. La sub-
// pozicioj estas la kvar anguloj ( NE, NW, SW, SE ), ĉiu rotaciita al sia
// flanko. La tipoj miksiĝas en la bloko ( la escepto — domoj restas kune pli
// ofte ), kaj la baza miksado rotaciiĝas per la ĉela fazo ( vidu
// fazoDeCelo ), por ke la tuta krado restu simetria.
export function tipoDeBloko(bazo: CellType, cx: number, cz: number, ox: number, oz: number): CellType {
  if ( bazo === "sanktejo" ) return bazo;          // la centro restas unuopa
  if ( bazo === "stacio" ) return "stacio";        // stacioj okazas kune ( la tuta bloko )
  if ( bazo === "domo" ) return "domo";            // domoj okazas kune pli ofte
  // La bazaj miksadoj ( ĉe fazo 0 ). turo-bloko — domo ĉe NE, kasafeo ĉe SW,
  // turoj ĉe NW/SE; kasafeo/mangxejo — kasafeoj ĉe NE/SW, mangxejoj ĉe NW/SE.
  const bazoTipoj: CellType[] = bazo === "turo"
    ? [ "domo", "turo", "kasafeo", "turo" ]
    : [ "kasafeo", "mangxejo", "kasafeo", "mangxejo" ];
  const fazo = fazoDeCelo(cx, cz);
  const i = ox > 0 ? ( oz > 0 ? 0 : 3 ) : ( oz > 0 ? 1 : 2 );   // NE=0, NW=1, SW=2, SE=3
  return bazoTipoj[( i - fazo + 4 ) % 4];
}
