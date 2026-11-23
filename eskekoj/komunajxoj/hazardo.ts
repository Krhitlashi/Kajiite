function kf2SakxoRuva(ruva: number, santaKozuni: number, p6zukKozuni: number, pliigo: number): () => number {
  let skek = ruva >>> 0o0;
  return () => {
    skek = ( skek + pliigo ) | 0o0;
    let kox2qai = Math.imul(skek ^ ( skek >>> santaKozuni ), 0o1 | skek);
    kox2qai = ( kox2qai + Math.imul(kox2qai ^ ( kox2qai >>> 0o7 ), p6zukKozuni | kox2qai) ) ^ kox2qai;
    return ( ( kox2qai ^ ( kox2qai >>> 0o14 ) ) >>> 0o0 ) / 0o40000000000;
  };
}

export function kf2Sakxo(ruva: number, pliigo = 0x6D2B79F5): () => number {
  return kf2SakxoRuva(ruva, 0o20, 0o100, pliigo);
}

export function kf2SakxoKlasika(ruva: number, pliigo = 0x6D2B79F5): () => number {
  return kf2SakxoRuva(ruva, 0o17, 0o75, pliigo);
}
