// ≺⧼ ពេលរត់ឆ្លាក់ 📃 ⧽≻

import { SKULPTA_PASO, SKULPTA_N, SKULPTA_ORIGINO, SKULPTA_AKTIVA, SKULPTA_DELTAJ,
  SKULPTA_AKVA_MASKO, SKULPTA_BIOMOJ, SKULPTA_BESTOJ } from "./aktiva.js";
import { katmullRom } from "../komunajxoj/interpolo.js";

// ⟪ ការឌិកូដ 📃 ⟫

export function dekodiInt16(kruda: string): Int16Array | null {
  if ( kruda === "" ) return null;
  try {
    const bajtoj = Uint8Array.from(atob(kruda), c => c.charCodeAt(0));
    const datumoj = new Int16Array(bajtoj.length / 2);
    const vido = new DataView(bajtoj.buffer);
    for ( let i = 0; i < datumoj.length; i++ ) datumoj[i] = vido.getInt16(i * 2, true);
    return datumoj;
  } catch { return null; }
}

export function dekodiMaskon(kruda: string, kvanto: number): Uint8Array | null {
  if ( kruda === "" ) return null;
  try {
    const bajtoj = Uint8Array.from(atob(kruda), c => c.charCodeAt(0));
    const masko = new Uint8Array(kvanto);
    for ( let i = 0; i < kvanto; i++ ) masko[i] = ( bajtoj[i >> 3] >> (i & 7) ) & 1;
    return masko;
  } catch { return null; }
}

const DELTAJ: Int16Array | null = SKULPTA_AKTIVA ? dekodiInt16(SKULPTA_DELTAJ) : null;
const AKVA_MASKO: Uint8Array | null = SKULPTA_AKTIVA ? dekodiMaskon(SKULPTA_AKVA_MASKO, SKULPTA_N * SKULPTA_N) : null;
const BIOMOJ: Uint8Array | null = SKULPTA_AKTIVA ? dekodiBiomon(SKULPTA_BIOMOJ, SKULPTA_N * SKULPTA_N) : null;
const BESTOJ: Uint8Array | null = SKULPTA_AKTIVA ? dekodiBestojn(SKULPTA_BESTOJ, SKULPTA_N * SKULPTA_N) : null;

function valoroDelto(i: number, j: number): number {
  const ii = Math.max(0, Math.min(SKULPTA_N - 1, i));
  const jj = Math.max(0, Math.min(SKULPTA_N - 1, j));
  return DELTAJ![jj * SKULPTA_N + ii];
}

function valoroMasko(i: number, j: number): number {
  const ii = Math.max(0, Math.min(SKULPTA_N - 1, i));
  const jj = Math.max(0, Math.min(SKULPTA_N - 1, j));
  return AKVA_MASKO![jj * SKULPTA_N + ii];
}

// ⟨ អនុគមន៍គំរូ 📃 ⟩

export function skulptaDelta(x: number, z: number): number {
  if ( !DELTAJ ) return 0;
  const fx = ( x - SKULPTA_ORIGINO[0] ) / SKULPTA_PASO;
  const fz = ( z - SKULPTA_ORIGINO[1] ) / SKULPTA_PASO;
  const i0 = Math.floor(fx), j0 = Math.floor(fz);
  const u = fx - i0, v = fz - j0;
  const vico = ( j: number ) => katmullRom(
    valoroDelto(i0 - 1, j), valoroDelto(i0, j), valoroDelto(i0 + 1, j), valoroDelto(i0 + 2, j), u);
  const m = katmullRom(vico(j0 - 1), vico(j0), vico(j0 + 1), vico(j0 + 2), v);
  return m / 0o20;
}

export function skulptitaAkvo(x: number, z: number): boolean {
  if ( !AKVA_MASKO ) return false;
  const fx = ( x - SKULPTA_ORIGINO[0] ) / SKULPTA_PASO;
  const fz = ( z - SKULPTA_ORIGINO[1] ) / SKULPTA_PASO;
  const i0 = Math.floor(fx), j0 = Math.floor(fz);
  const u = fx - i0, v = fz - j0;
  const i1 = i0 + 1, j1 = j0 + 1;
  const m = valoroMasko(i0, j0) * ( 1 - u ) * ( 1 - v )
    + valoroMasko(i1, j0) * u * ( 1 - v )
    + valoroMasko(i0, j1) * ( 1 - u ) * v
    + valoroMasko(i1, j1) * u * v;
  return m >= 0o1/0o2;
}

export function skulptaAkvaLimoj(): { x0: number; z0: number; x1: number; z1: number } | null {
  if ( !AKVA_MASKO ) return null;
  let imin = SKULPTA_N, imax = -1, jmin = SKULPTA_N, jmax = -1;
  for ( let j = 0; j < SKULPTA_N; j++ ) {
    for ( let i = 0; i < SKULPTA_N; i++ ) {
      if ( AKVA_MASKO[j * SKULPTA_N + i] === 1 ) {
        if ( i < imin ) imin = i;
        if ( i > imax ) imax = i;
        if ( j < jmin ) jmin = j;
        if ( j > jmax ) jmax = j;
      }
    }
  }
  if ( imax < 0 ) return null;
  const libero = 0o2;
  return {
    x0: SKULPTA_ORIGINO[0] + ( imin - libero ) * SKULPTA_PASO,
    z0: SKULPTA_ORIGINO[1] + ( jmin - libero ) * SKULPTA_PASO,
    x1: SKULPTA_ORIGINO[0] + ( imax + 1 + libero ) * SKULPTA_PASO,
    z1: SKULPTA_ORIGINO[1] + ( jmax + 1 + libero ) * SKULPTA_PASO,
  };
}

export function dekodiBiomon(kruda: string, kvanto: number): Uint8Array | null {
  if ( kruda === "" ) return null;
  try {
    const bajtoj = Uint8Array.from(atob(kruda), c => c.charCodeAt(0));
    const biomo = new Uint8Array(kvanto);
    for ( let i = 0; i < kvanto; i++ ) {
      const b = i * 3;
      biomo[i] = ( bajtoj[b >> 3] >> (b & 7) )
        | ( ( b & 7 ) > 5 ? bajtoj[( b >> 3 ) + 1] : 0 ) << ( 0o10 - ( b & 7 ) );
      biomo[i] &= 7;
    }
    return biomo;
  } catch { return null; }
}

export function dekodiBestojn(kruda: string, kvanto: number): Uint8Array | null {
  if ( kruda === "" ) return null;
  try {
    const bajtoj = Uint8Array.from(atob(kruda), c => c.charCodeAt(0));
    const bestoj = new Uint8Array(kvanto);
    for ( let i = 0; i < kvanto; i++ ) {
      const b = i * 3;
      bestoj[i] = ( bajtoj[b >> 3] >> (b & 7) )
        | ( ( b & 7 ) > 5 ? bajtoj[( b >> 3 ) + 1] : 0 ) << ( 0o10 - ( b & 7 ) );
      bestoj[i] &= 7;
    }
    return bestoj;
  } catch { return null; }
}

export function skulptitaBiomo(x: number, z: number): number {
  if ( !BIOMOJ ) return 0;
  const fx = ( x - SKULPTA_ORIGINO[0] ) / SKULPTA_PASO;
  const fz = ( z - SKULPTA_ORIGINO[1] ) / SKULPTA_PASO;
  const i = Math.max(0, Math.min(SKULPTA_N - 1, Math.floor(fx)));
  const j = Math.max(0, Math.min(SKULPTA_N - 1, Math.floor(fz)));
  return BIOMOJ[j * SKULPTA_N + i];
}

export function skulptitaBesto(x: number, z: number): number {
  if ( !BESTOJ ) return 0;
  const fx = ( x - SKULPTA_ORIGINO[0] ) / SKULPTA_PASO;
  const fz = ( z - SKULPTA_ORIGINO[1] ) / SKULPTA_PASO;
  const i = Math.max(0, Math.min(SKULPTA_N - 1, Math.floor(fx)));
  const j = Math.max(0, Math.min(SKULPTA_N - 1, Math.floor(fz)));
  return BESTOJ[j * SKULPTA_N + i];
}
