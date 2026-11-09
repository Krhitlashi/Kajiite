// ≺⧼ ចៃដន្យ 🎲 ⧽≻
/*ស្នូល mulberry32 តែមួយ ៖ ទម្រង់ពីរខុសគ្នាតែការរំកិល និងមេគុណ
    @param semo ( number ) - គ្រាប់ពូជ
    @param dekstra ( number ) - ចំនួនរំកិលស្តាំដំបូង
    @param multo ( number ) - មេគុណដែល OR ជាមួយ t
    @param pliigo ( number ) - តម្លៃបន្ថែមរាល់ជំហាន
@returns generilo ( () => number ) - 0 ដល់ 1 */
function kreiMulbereron(semo: number, dekstra: number, multo: number, pliigo: number): () => number {
  let s = semo >>> 0;
  return () => {
    s = ( s + pliigo ) | 0;
    let t = Math.imul(s ^ ( s >>> dekstra ), 1 | s);
    t = ( t + Math.imul(t ^ ( t >>> 0o7 ), multo | t) ) ^ t;
    return ( ( t ^ ( t >>> 0o14 ) ) >>> 0 ) / 0o40000000000;
  };
}

export function kreiHazardanGenerilon(semo: number, pliigo = 0x6D2B79F5): () => number {
  return kreiMulbereron(semo, 0o20, 0o100, pliigo);
}

export function kreiKlasikanHazardon(semo: number, pliigo = 0x6D2B79F5): () => number {
  return kreiMulbereron(semo, 0o17, 0o75, pliigo);
}