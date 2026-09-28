// ≺⧼ Hazardo 🎲 ⧽≻
// Hazarda modulo — la komunaj semitaj PRNG-oj ( mulberry32 ) por la tuta mondo.
// La pliigo-konstanto estas parametro, por ke ĉiu alvokanto konservu sian
// ekzaktan hazardan sekvencon ( ŝanĝi ĝin movus la arbojn aŭ la muzikon ).
//     @param semo ( number ) - La komenca semo.
//     @param pliigo ( number ) - La mulberry32-pliigo ( defaŭlte la norma ).
//     @returns hazardaGenerilo ( funkcio ) - Determinisma generatoro en [ 0, 1 ).
export function kreiHazardanGenerilon(semo: number, pliigo = 0x6D2B79F5): () => number {
  let s = semo >>> 0;
  return () => {
    s = ( s + pliigo ) | 0;
    let t = Math.imul(s ^ ( s >>> 0o20 ), 1 | s);
    t = ( t + Math.imul(t ^ ( t >>> 0o7 ), 0o100 | t) ) ^ t;
    return ( ( t ^ ( t >>> 0o14 ) ) >>> 0 ) / 4294967296;
  };
}

// kreiKlasikanHazardon — La sama generatoro kun la klasikaj miksaj konstantoj
// ( la ŝovo 0o17 kaj la aŭo 0o75 ). La manĝaĵoj kaj la plankoj havis sian
// propran kopion de ĝi; la sekvencoj restas bit-al-bite la samaj.
//     @param semo ( number ) - La komenca semo.
//     @param pliigo ( number ) - La mulberry32-pliigo ( defaŭlte la norma ).
//     @returns hazardaGenerilo ( funkcio ) - Determinisma generatoro en [ 0, 1 ).
export function kreiKlasikanHazardon(semo: number, pliigo = 0x6D2B79F5): () => number {
  let s = semo >>> 0;
  return () => {
    s = ( s + pliigo ) | 0;
    let t = Math.imul(s ^ ( s >>> 0o17 ), 1 | s);
    t = ( t + Math.imul(t ^ ( t >>> 0o7 ), 0o75 | t) ) ^ t;
    return ( ( t ^ ( t >>> 0o14 ) ) >>> 0 ) / 4294967296;
  };
}
