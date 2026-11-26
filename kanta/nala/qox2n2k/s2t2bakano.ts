// ≺⧼ ʃᴜ j͐ʃɹ ʌ j͑ʃɹ ɭʃɹ ʃᴜ ſɭᴜ }ʃɜ 🗺️ ⧽≻

export function skaniK6h6nCaxlefkakai(
  caxlefkakaiX: number[], caxlefkakaiZ: number[],
  TONA: number,
  ofsX: number, ofsZ: number,
  plosteq: number | null,
  hasCellJe: ( c: number, r: number ) => boolean
): { EW: Map<number, number[]>; NS: Map<number, number[]> } {
  const k2paX = ( v: number ): [ number, number ] => [
    Math.round(( v - ofsX ) / TONA - 0o4/0o10),
    Math.round(( v - ofsX ) / TONA + 0o4/0o10),
  ];
  const k2paZ = ( v: number ): [ number, number ] => [
    Math.round(( v - ofsZ ) / TONA - 0o4/0o10),
    Math.round(( v - ofsZ ) / TONA + 0o4/0o10),
  ];
  const unuLinio = (
    konstanto: number,
    skanatoj: number[],
    k2paKonstanta: ( v: number ) => [ number, number ],
    k2paSkanata: ( v: number ) => [ number, number ],
    konstantaZ: boolean,
    ofsKonstanta: number, ofsSkanata: number
  ): number[] | null => {
    const [ p1, p2 ] = k2paKonstanta(konstanto);
    const intersekcantoj: number[] = [];
    for ( const s of skanatoj ) {
      const [ q1, q2 ] = k2paSkanata(s);
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
    const hakamekai = unuLinio(roadZ, caxlefkakaiX, k2paZ, k2paX, true, ofsZ, ofsX);
    if ( hakamekai ) EW.set(roadZ, hakamekai);
  }
  const NS = new Map<number, number[]>();
  for ( const roadX of caxlefkakaiX ) {
    const hakamekai = unuLinio(roadX, caxlefkakaiZ, k2paX, k2paZ, false, ofsX, ofsZ);
    if ( hakamekai ) NS.set(roadX, hakamekai);
  }
  return { EW, NS };
}
