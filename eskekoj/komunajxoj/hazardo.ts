// ≺⧼ ចៃដន្យ 🎲 ⧽≻
export function kreiHazardanGenerilon(semo: number, pliigo = 0x6D2B79F5): () => number {
  let s = semo >>> 0;
  return () => {
    s = ( s + pliigo ) | 0;
    let t = Math.imul(s ^ ( s >>> 0o20 ), 1 | s);
    t = ( t + Math.imul(t ^ ( t >>> 0o7 ), 0o100 | t) ) ^ t;
    return ( ( t ^ ( t >>> 0o14 ) ) >>> 0 ) / 0o40000000000;
  };
}

export function kreiKlasikanHazardon(semo: number, pliigo = 0x6D2B79F5): () => number {
  let s = semo >>> 0;
  return () => {
    s = ( s + pliigo ) | 0;
    let t = Math.imul(s ^ ( s >>> 0o17 ), 1 | s);
    t = ( t + Math.imul(t ^ ( t >>> 0o7 ), 0o75 | t) ) ^ t;
    return ( ( t ^ ( t >>> 0o14 ) ) >>> 0 ) / 0o40000000000;
  };
}
