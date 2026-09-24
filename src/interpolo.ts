// ≺⧼ Interpolo 📐 ⧽≻
// La glataj interpolo-kurboj de la ludo — puraj formuloj sen datumoj, do la
// ludo ( src/tero-datumaro/rultempo.ts ), la specioj ( assets/shalaj-specioj )
// kaj la terena skulptilo ( iloj/tero-skulptilo ) povas uzi la saman kurbon.
// Antaŭe la sama funkcio estis kopiita en ĉiun el ili ( bicuba / katmullRom ),
// do la kopioj povis devojiĝi aparte. Nun estas unu fonto.

// katmullRom — unu-dimensia glata interpolo ( Katmull-Rom ). Glata C1 kurbo
// sen la diagonalaj faldoj de la dulineara interpolo — la montodeklivoj ne
// montras krestojn laŭ la krad-diagonaloj, kaj la densigitaj profiloj estas
// glataj anstataŭ facetaj.
//     @param p0, p1, p2, p3 ( number ) - La kvar apudaj nodaj valoroj.
//     @param t ( number ) - La pozicio inter p1 kaj p2 ( 0 .. 1 ).
//     @returns La interpolita valoro.
export function katmullRom(p0: number, p1: number, p2: number, p3: number, t: number): number {
  const t2 = t * t, t3 = t2 * t;
  return 0o1/0o2 * ( ( 2 * p1 ) + ( -p0 + p2 ) * t
    + ( 2 * p0 - 5 * p1 + 4 * p2 - p3 ) * t2 + ( -p0 + 3 * p1 - 3 * p2 + p3 ) * t3 );
}
