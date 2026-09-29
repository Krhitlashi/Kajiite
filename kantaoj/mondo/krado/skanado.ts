// ≺⧼ La voja segmenta skanado 🛣️ ⧽≻
// La komuna voja segmenta skanado de la krada reto — la uzeblaj
// perpendikularaj koordinatoj de ĉiu vojo-linio ( skaniVojanReton ).
// skaniVojanReton — La komuna voja segmenta skanado de la krada reto ( la
// sama algoritmo kiel en urbo.ts, sen la meshoj ). Por ĉiu vojo-linio ( EW aŭ
// NS ), trovu la perpendikularajn vojojn, kiuj reale intersekcas ĝin — la
// kvar ĉeloj ĉirkaŭ ĉiu kruciĝo ( hasCellAt ) — kaj, por la unu-bloka
// aranĝo, limigu ilin al la krada diamanto |x − ofsX| + |z − ofsZ| ≤ limo.
// La rezulto estas la uzeblaj perpendikularaj koordinatoj de ĉiu linio.
//     @param retoX, retoZ ( number[] ) - La voja reto ( x- kaj z-linioj ).
//     @param PASXO ( number ) - La ĉela paŝo.
//     @param ofsX, ofsZ ( number ) - La krada centro ( 0 en krado.ts ).
//     @param limo ( number | null ) - La diamanta limo; null malŝaltas ĝin.
//     @param hasCellAt ( funkcio ) - Ĉu ĉelo ekzistas en la reto.
//     @returns { EW, NS } ( Map<number, number[]> ) - La uzeblaj segmentoj.
export function skaniVojanReton(
  retoX: number[], retoZ: number[],
  PASXO: number,
  ofsX: number, ofsZ: number,
  limo: number | null,
  hasCellAt: ( c: number, r: number ) => boolean
): { EW: Map<number, number[]>; NS: Map<number, number[]> } {
  const ĉelaX = ( v: number ): [ number, number ] => [
    Math.round(( v - ofsX ) / PASXO - 0o4/0o10),
    Math.round(( v - ofsX ) / PASXO + 0o4/0o10),
  ];
  const ĉelaZ = ( v: number ): [ number, number ] => [
    Math.round(( v - ofsZ ) / PASXO - 0o4/0o10),
    Math.round(( v - ofsZ ) / PASXO + 0o4/0o10),
  ];
  // unuLinio — Skanu unu vojo-linion. la perpendikularaj vojoj, kiuj reale
  // intersekcas ĝin ( la kvar ĉeloj ĉirkaŭ ĉiu kruciĝo — hasCellAt( x, z ) ),
  // limigitaj al la diamanta limo.
  const unuLinio = (
    konstanto: number,
    skanatoj: number[],
    ĉelaKonstanta: ( v: number ) => [ number, number ],
    ĉelaSkanata: ( v: number ) => [ number, number ],
    konstantaZ: boolean,          // ĉu la konstanta akso estas Z ( EW-vojoj )
    ofsKonstanta: number, ofsSkanata: number
  ): number[] | null => {
    const [ p1, p2 ] = ĉelaKonstanta(konstanto);
    const intersekcantoj: number[] = [];
    for ( const s of skanatoj ) {
      const [ q1, q2 ] = ĉelaSkanata(s);
      // La X-paro ( kolumnoj ) ĉiam estas la UNUA argumento de hasCellAt,
      // la Z-paro ( vicoj ) la dua — la roloj interŝanĝiĝas inter EW kaj NS.
      const tuŝas = konstantaZ
        ? hasCellAt(q1, p1) || hasCellAt(q1, p2) || hasCellAt(q2, p1) || hasCellAt(q2, p2)
        : hasCellAt(p1, q1) || hasCellAt(p1, q2) || hasCellAt(p2, q1) || hasCellAt(p2, q2);
      if ( tuŝas ) intersekcantoj.push(s);
    }
    if ( intersekcantoj.length < 2 ) return null;
    const pts = [ ...intersekcantoj ].sort(( a, b ) => a - b);
    if ( limo === null ) return pts;
    // La DIAMANTA limo ( unu-bloka ). la vojoj ne ĉirkaŭvolvas la kornerajn
    // blokojn — segmento ekzistas nur se ĝia mezo kuŝas ene de la krada
    // diamanto |x| + |z| ≤ limo ( relativa al la centro ). La korneraj
    // blokoj ( ±(n−1), ±(n−1) ) ricevas vojon nur sur siaj internaj flankoj —
    // NE la plenan vojan kvadraton kiel la flankaj blokoj.
    let unua = -1, lasta = -1;
    for ( let i = 0; i < pts.length - 1; i++ ) {
      if ( Math.abs(( pts[i] + pts[i + 1] ) / 2 - ofsSkanata) + Math.abs(konstanto - ofsKonstanta) <= limo ) {
        if ( unua < 0 ) unua = i;
        lasta = i;
      }
    }
    if ( unua < 0 ) return null;
    return pts.slice(unua, lasta + 2);
  };
  const EW = new Map<number, number[]>();
  for ( const roadZ of retoZ ) {
    const uzeblaj = unuLinio(roadZ, retoX, ĉelaZ, ĉelaX, true, ofsZ, ofsX);
    if ( uzeblaj ) EW.set(roadZ, uzeblaj);
  }
  const NS = new Map<number, number[]>();
  for ( const roadX of retoX ) {
    const uzeblaj = unuLinio(roadX, retoZ, ĉelaX, ĉelaZ, false, ofsX, ofsZ);
    if ( uzeblaj ) NS.set(roadX, uzeblaj);
  }
  return { EW, NS };
}
