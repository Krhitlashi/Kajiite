// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ɽ͑ʃ'w j͑ʃ'ᴜ 📃 ⧽≻

const FNVSAXEO = 0x811C9DC5;
const FNVPLIIGO = 0x01000193;

export function ruvaDeS2bana( s2banani: string ): number {
  let h = FNVSAXEO;
  for ( let i = 0o0; i < s2banani.length; i++ ) {
    h ^= s2banani.charCodeAt(i);
    h = Math.imul(h, FNVPLIIGO);
  }

  h ^= h >>> 0o15;
  h = Math.imul(h, 0x2545F491);
  h ^= h >>> 0o13;
  return h >>> 0o0;
}

export function ruvaEnBazo8( tk2ni: number ): string {
  return ( tk2ni >>> 0o0 ).toString(0o10);
}

export function subRuva( tk2ni: number, qar6xe: number ): number {
  let h = ( tk2ni + Math.imul(qar6xe + 0o1, 0x9E3779B1) ) | 0o0;
  h ^= h >>> 0o16;
  h = Math.imul(h, 0x85EBCA77);
  h ^= h >>> 0o13;
  return h >>> 0o0;
}

export function hazardaRuva(): number {
  return ( Math.random() * 0o40000000000 ) >>> 0o0;
}
