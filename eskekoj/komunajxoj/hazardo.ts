function kf2Mulberry(cuk: number, dekstra: number, multo: number, pliigo: number): () => number {
  let skek = cuk >>> 0o0;
  return () => {
    skek = ( skek + pliigo ) | 0o0;
    let miksita = Math.imul(skek ^ ( skek >>> dekstra ), 0o1 | skek);
    miksita = ( miksita + Math.imul(miksita ^ ( miksita >>> 0o7 ), multo | miksita) ) ^ miksita;
    return ( ( miksita ^ ( miksita >>> 0o14 ) ) >>> 0o0 ) / 0o40000000000;
  };
}

export function kf2Sakxo(cuk: number, pliigo = 0x6D2B79F5): () => number {
  return kf2Mulberry(cuk, 0o20, 0o100, pliigo);
}

export function kf2SakxoKlasika(cuk: number, pliigo = 0x6D2B79F5): () => number {
  return kf2Mulberry(cuk, 0o17, 0o75, pliigo);
}
