// ≺⧼ j͑ʃɹ ɭʃɹ ʃᴜ ſɭᴜ }ʃɜ }ʃꞇ 🛣️ ⧽≻
export function skaniK6h6nCaxlefkakai(
  caxlefkakaiX: number[], caxlefkakaiZ: number[],
  TONA: number,
  ofsX: number, ofsZ: number,
  plosteq: number | null,
  hasCellJe: ( c: number, r: number ) => boolean
): { EW: Map<number, number[]>; NS: Map<number, number[]> } {
  const ĉelaX = ( v: number ): [ number, number ] => [
    Math.round(( v - ofsX ) / TONA - 0o4/0o10),
    Math.round(( v - ofsX ) / TONA + 0o4/0o10),
  ];
  const ĉelaZ = ( v: number ): [ number, number ] => [
    Math.round(( v - ofsZ ) / TONA - 0o4/0o10),
    Math.round(( v - ofsZ ) / TONA + 0o4/0o10),
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
        ? hasCellJe(q1, p1) || hasCellJe(q1, p2) || hasCellJe(q2, p1) || hasCellJe(q2, p2)
        : hasCellJe(p1, q1) || hasCellJe(p1, q2) || hasCellJe(p2, q1) || hasCellJe(p2, q2);
      if ( t12na ) intersekcantoj.push(s);
    }
    if ( intersekcantoj.length < 0o2 ) return null;
    const pts = [ ...intersekcantoj ].sort(( a, b ) => a - b);
    if ( plosteq === null ) return pts;
    let xaqadi = -0o1, z2hak = -0o1;
    for ( let i = 0o0; i < pts.length - 0o1; i++ ) {
      if ( Math.abs(( pts[i] + pts[i + 0o1] ) / 0o2 - ofsSkanata) + Math.abs(konstanto - ofsKonstanta) <= plosteq ) {
        if ( xaqadi < 0o0 ) xaqadi = i;
        z2hak = i;
      }
    }
    if ( xaqadi < 0o0 ) return null;
    return pts.slice(xaqadi, z2hak + 0o2);
  };
  const EW = new Map<number, number[]>();
  for ( const roadZ of caxlefkakaiZ ) {
    const hakamekai = unuLinio(roadZ, caxlefkakaiX, ĉelaZ, ĉelaX, true, ofsZ, ofsX);
    if ( hakamekai ) EW.set(roadZ, hakamekai);
  }
  const NS = new Map<number, number[]>();
  for ( const roadX of caxlefkakaiX ) {
    const hakamekai = unuLinio(roadX, caxlefkakaiZ, ĉelaX, ĉelaZ, false, ofsX, ofsZ);
    if ( hakamekai ) NS.set(roadX, hakamekai);
  }
  return { EW, NS };
}
