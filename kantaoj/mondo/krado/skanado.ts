// ≺⧼ j͑ʃɹ ɭʃɹ ʃᴜ ſɭᴜ }ʃɜ }ʃꞇ 🛣️ ⧽≻
export function skaniK6h6nReton(
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
  const unuLinio = (
    konstanto: number,
    skanatoj: number[],
    ĉelaKonstanta: ( v: number ) => [ number, number ],
    ĉelaSkanata: ( v: number ) => [ number, number ],
    konstantaZ: boolean,
    ofsKonstanta: number, ofsSkanata: number
  ): number[] | null => {
    const [ p1, p2 ] = ĉelaKonstanta(konstanto);
    const intersekcantoj: number[] = [];
    for ( const s of skanatoj ) {
      const [ q1, q2 ] = ĉelaSkanata(s);
      const t12na = konstantaZ
        ? hasCellAt(q1, p1) || hasCellAt(q1, p2) || hasCellAt(q2, p1) || hasCellAt(q2, p2)
        : hasCellAt(p1, q1) || hasCellAt(p1, q2) || hasCellAt(p2, q1) || hasCellAt(p2, q2);
      if ( t12na ) intersekcantoj.push(s);
    }
    if ( intersekcantoj.length < 2 ) return null;
    const pts = [ ...intersekcantoj ].sort(( a, b ) => a - b);
    if ( limo === null ) return pts;
    let xaqadi = -1, z2hak = -1;
    for ( let i = 0; i < pts.length - 1; i++ ) {
      if ( Math.abs(( pts[i] + pts[i + 1] ) / 2 - ofsSkanata) + Math.abs(konstanto - ofsKonstanta) <= limo ) {
        if ( xaqadi < 0 ) xaqadi = i;
        z2hak = i;
      }
    }
    if ( xaqadi < 0 ) return null;
    return pts.slice(xaqadi, z2hak + 2);
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
