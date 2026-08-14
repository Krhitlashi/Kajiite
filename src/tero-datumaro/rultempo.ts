// ≺⧼ Skulptita rultempo 📃 ⧽≻
// Kreita de la terena skulptilo ( iloj/tero-skulptilo.html ).
// ( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) - Ne redaktu mane. La skulptilo reskribas la dosieron.

// La malkodaj kaj samplaj funkcioj — sen gxi la ludo ne povas legi la
// datumaron. La savo devas produkti kompletan modulon.
import { SKULPTA_PASO, SKULPTA_N, SKULPTA_ORIGINO, SKULPTA_AKTIVA, SKULPTA_DELTAJ } from "./krado.js";
import { SKULPTA_AKVA_MASKO } from "./akvo.js";
import { SKULPTA_BIOMOJ } from "./biomoj.js";
import { SKULPTA_BESTOJ } from "./bestoj.js";

// ⟪ Dekodo 📃 ⟫ — unufoje cxe modulo-sxargxo. Malaktiva skulptajxo restas
// malplena, por ke la ludo ne pagu la kradan logikon.
// ⚠️ ĈI TIU FUNKCION-SEKCION DEVAS RESTI IDENTA al la RUNTIMOTEMPLATO en
// iloj/tero-skulptilo.js — la savo de la skulptilo reskribas ĝin kune kun la
// konstantoj ĉiun fojon.

function dekodiInt16(kruda: string): Int16Array | null {
  if ( kruda === "" ) return null;
  try {
    const bajtoj = Uint8Array.from(atob(kruda), c => c.charCodeAt(0));
    const datumoj = new Int16Array(bajtoj.length / 2);
    const vido = new DataView(bajtoj.buffer);
    for ( let i = 0; i < datumoj.length; i++ ) datumoj[i] = vido.getInt16(i * 2, true);
    return datumoj;
  } catch { return null; }
}

function dekodiMaskon(kruda: string, kvanto: number): Uint8Array | null {
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

// ⟨ Samplaj funkcioj 📃 ⟩ — dukuba ( Katmull-Rom ) interpolo super la krado.

// bicuba — Katmull-Rom unu-dimensia interpolo. Glata C1 kurbo sen la diagonalaj
// faldoj de dulineara interpolo — la montodeklivoj ne plu montras krestojn laŭ
// la krad-diagonaloj ( la sama funkcio kiel en iloj/tero-skulptilo.js ).
function bicuba(p0: number, p1: number, p2: number, p3: number, t: number): number {
  const t2 = t * t, t3 = t2 * t;
  return 0o1/0o2 * ( ( 2 * p1 ) + ( -p0 + p2 ) * t
    + ( 2 * p0 - 5 * p1 + 4 * p2 - p3 ) * t2 + ( -p0 + 3 * p1 - 3 * p2 + p3 ) * t3 );
}

// skulptaDelta — La skulptita delto de la tereno cxe monda pozicio. La
// valoro cxe kradnodoj restas ekzakte la ĉela valoro; inter la nodoj la
// surfaco estas glata C1 — sen la dulinearaj diagonalaj krestoj.
//     @param x, z ( number ) - Monda pozicio.
//     @returns La delto en mondo-unuoj ( 0 se neniu skulptajxo ).
export function skulptaDelta(x: number, z: number): number {
  if ( !DELTAJ ) return 0;
  const fx = ( x - SKULPTA_ORIGINO[0] ) / SKULPTA_PASO;
  const fz = ( z - SKULPTA_ORIGINO[1] ) / SKULPTA_PASO;
  const i0 = Math.floor(fx), j0 = Math.floor(fz);
  const u = fx - i0, v = fz - j0;
  const vico = ( j: number ) => bicuba(
    valoroDelto(i0 - 1, j), valoroDelto(i0, j), valoroDelto(i0 + 1, j), valoroDelto(i0 + 2, j), u);
  const m = bicuba(vico(j0 - 1), vico(j0), vico(j0 + 1), vico(j0 + 2), v);
  return m / 0o20;
}

// skulptitaAkvo — Cxu la punkto estas en la pentrita akvo ( la masko ).
//     @param x, z ( number ) - Monda pozicio.
//     @returns Cxu la masko kovras la punkton.
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

// skulptaAkvaLimoj — La plej malgranda kadro cxirkaŭ la pentrita akvo ( kun
// unu cela rando da libero ), por ke la meshxo ne kovru la tutan mondon.
// Nulaj se neniu akvo.
//     @returns Kadro { x0, z0, x1, z1 } aux null.
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

function dekodiBiomon(kruda: string, kvanto: number): Uint8Array | null {
  if ( kruda === "" ) return null;
  try {
    const bajtoj = Uint8Array.from(atob(kruda), c => c.charCodeAt(0));
    const biomo = new Uint8Array(kvanto);
    // 3 bitoj po ĉelo ( 0=aŭtomata, 1=montaro, 2=valo, 3=ebenaĵo,
    // 4=akvaj-plantoj, 5=ekvizeto ) — ok ĉeloj po tri bajtoj.
    for ( let i = 0; i < kvanto; i++ ) {
      const b = i * 3;
      biomo[i] = ( bajtoj[b >> 3] >> (b & 7) )
        | ( ( b & 7 ) > 5 ? bajtoj[( b >> 3 ) + 1] : 0 ) << ( 8 - ( b & 7 ) );
      biomo[i] &= 7;
    }
    return biomo;
  } catch { return null; }
}

function dekodiBestojn(kruda: string, kvanto: number): Uint8Array | null {
  if ( kruda === "" ) return null;
  try {
    const bajtoj = Uint8Array.from(atob(kruda), c => c.charCodeAt(0));
    const bestoj = new Uint8Array(kvanto);
    // 3 bitoj po ĉelo ( bitoj 1=akvaj bestoj, 2=petreloj, 4=NPC-oj ) — ok
    // ĉeloj po tri bajtoj.
    for ( let i = 0; i < kvanto; i++ ) {
      const b = i * 3;
      bestoj[i] = ( bajtoj[b >> 3] >> (b & 7) )
        | ( ( b & 7 ) > 5 ? bajtoj[( b >> 3 ) + 1] : 0 ) << ( 8 - ( b & 7 ) );
      bestoj[i] &= 7;
    }
    return bestoj;
  } catch { return null; }
}

// skulptitaBiomo — La pentrita biomo de la punkto ( la biomo-tavolo de la
// skulptilo ). 0 = aŭtomata ( nenio ), 1 = montaro, 2 = valo, 3 = ebenaĵo,
// 4 = akvaj-plantoj, 5 = ekvizeto. La ludo uzas gxin en biomo() ( tereno.ts )
// — malplena ( 0 aux sen datumoj ) estas nenio, same kiel aŭtomata.
//     @param x, z ( number ) - Monda pozicio.
//     @returns La pentrita biomo ( 0-5 ), aux 0 se neniu biomo-tavolo.
export function skulptitaBiomo(x: number, z: number): number {
  if ( !BIOMOJ ) return 0;
  const fx = ( x - SKULPTA_ORIGINO[0] ) / SKULPTA_PASO;
  const fz = ( z - SKULPTA_ORIGINO[1] ) / SKULPTA_PASO;
  const i = Math.max(0, Math.min(SKULPTA_N - 1, Math.floor(fx)));
  const j = Math.max(0, Math.min(SKULPTA_N - 1, Math.floor(fz)));
  return BIOMOJ[j * SKULPTA_N + i];
}

// skulptitaBesto — La pentrita besta zono de la punkto ( la besta-tavolo de
// la skulptilo ). bitoj 1 = akvaj bestoj, 2 = petreloj, 4 = NPC-oj — ĉelo
// povas teni PLURAJN samtempe ( 3 = akvaj+petreloj, ktp ), kaj la defaŭltaj
// lokoj estas bakitaj en la tavolon. Malplena ( 0 aux sen datumoj ) estas
// nenio — nenia besto tie.
//     @param x, z ( number ) - Monda pozicio.
//     @returns La pentritaj bestaj bitoj ( 0-7 ), aux 0 se neniu besta-tavolo.
export function skulptitaBesto(x: number, z: number): number {
  if ( !BESTOJ ) return 0;
  const fx = ( x - SKULPTA_ORIGINO[0] ) / SKULPTA_PASO;
  const fz = ( z - SKULPTA_ORIGINO[1] ) / SKULPTA_PASO;
  const i = Math.max(0, Math.min(SKULPTA_N - 1, Math.floor(fx)));
  const j = Math.max(0, Math.min(SKULPTA_N - 1, Math.floor(fz)));
  return BESTOJ[j * SKULPTA_N + i];
}
