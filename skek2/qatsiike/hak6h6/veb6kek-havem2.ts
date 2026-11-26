// ≺⧼ ſɭэ ֭ſɭэ j͑ʃᴜꞇ ʌ j͐ʃэ ɭ(ᴜ ʌ ɭʃᴜ ŋᷠᴜ ʌ ſɟɹƽ ꞁȷ̀ᴜ }ʃꞇ 📏 ⧽≻
// ⟨ ſɭᴜ ſןᴜ , ſɭэ ֭ſɭэ , ꞙɭı , ɭʃᴜ , ꞙɭı , ⟅ ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭɿ , ⟅ ſɭᴜ ſןᴜ , ⟅ ɭʃɜ ſןᴜȝ ,
//   ꞙɭı , ꞙɭı , ɭʃᴜ , ꞙɭı , ꞙɭı , ſɭэ ֭ſɭэ ,
//   ( ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ſןɔ˞ᴜƴ , ) , ꞙɭı , ꞙɭı , ⟅ ꞙɭı , ſɭэ ֭ſɭэ ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı , ⟅ ⟩
//   ꞙɭı , ɭʃᴜ , ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭɔ , ꞙɭı , ſɭᴜ ſןᴜ , ⟅ 📃 ⟩
import { surGrid } from "./havecax2l.js";

// ⟪ ɭʃᴜ , ꞙɭı , ꞙɭı 📏 ⟫
export interface BrakaL6da {
  // ⟨ ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı , ſɭэ ֭ſɭэ , ⟅ 📃 ⟩
  ux: number;
  uz: number;
  // ⟨ ſɭɜ ſɭ,w , ſɭэ ֭ſɭэ , ꞙɭı , ɭʃᴜ , ( ꞙɭı , ſןɔ˞ᴜƴ ) ⟅ 📃 ⟩
  l6da: number;
  // ⟨ ꞙɭı , ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭı , ⟅ 📃 ⟩
  p2somani: number;
}

// ⟪ ſɭᴜ ſןᴜ , ꞙɭı 📏 ⟫
export interface Veb6kekaVem2 {
  x: number;
  z: number;
  // ⟨ ꞙɭı , ꞙɭı , ꞙɭı , ſɭᴜ ſןᴜ , ⟅ 📃 ⟩
  l6da: number;
  // ⟨ ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭı , ɭʃᴜ , ⟅ 📃 ⟩
  knece: BrakaL6da[];
}

export function tamc2kCatlaq( x: number, z: number ): string {
  return x + "," + z;
}

// ⟨ ꞙɭı , 🌐 ⟩ , vepaqHak6h6n , ꞙɭı ,
// vepaqIntersekcajnHapa12n , ꞙɭı , ꞙɭı , kas2kantaHasoza , ꞙɭı ,
// ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭɔ , ⟅ 📃 ⟩
export const tamc2kHavem2 = new Map<string, Veb6kekaVem2>();

/* ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
    @returns void */
export function purigiVeb6kekajnHavem2n(): void {
  tamc2kHavem2.clear();
}

// ⟪ ſɭᴜ ſןᴜ , ⚓ ⟫
// ⟨ ſɭᴜ ſןᴜ , ſɭэ ֭ſɭэ , ꞙɭı , ꞙɭı , ſןɔ˞ᴜƴ , ꞙɭı ,
// ꞙɭı , ⟅ ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
// vepaqHak6h6n , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭɔ ,
// ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı , ꞙɭı ,
// ꞙɭı , ſɭэ ֭ſɭэ , ſɭᴜ ſןᴜ , ⟅ 📃 ⟩
export interface Qakaj2L6da {
  x: number;
  z: number;
  // ⟨ ꞙɭı , ꞙɭı , ( K6H6AKMARL6DA - K6H6ASEFINI ) , ⟅ 📃 ⟩
  l6da: number;
}

const qakaj2jHal6da: Qakaj2L6da[] = [];

/* ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
    @param x, z ( number ) - ꞙɭı , ſɭэ ſɭ,w , ꞙɭı ,
    @param l6da ( number ) - ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı ,
@returns void */
export function registriQakaj2nL6da( x: number, z: number, l6da: number ): void {
  const ekzistanta = qakaj2jHal6da.find(d => Math.hypot(d.x - x, d.z - z) < 0o1/0o20);
  if ( ekzistanta ) { ekzistanta.x = x; ekzistanta.z = z; ekzistanta.l6da = l6da; return; }
  qakaj2jHal6da.push({ x, z, l6da });
}

/* ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
    @returns ca1ara ( Qakaj2L6da [ ] ) - ſɭᴜ ſןᴜ , ꞙɭı , */
export function konsumiQakaj2jnL6dajn(): Qakaj2L6da[] {
  const kopio = qakaj2jHal6da.map(d => ( { ...d } ));
  qakaj2jHal6da.length = 0o0;
  return kopio;
}

/* ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
    @param ca1ara ( Qakaj2L6da [ ] ) - ſɭᴜ ſןᴜ , ꞙɭı ,
    @param x, z ( number ) - ſɭᴜ ſןᴜ , }ʃɹƽ ,
@returns l6da ( number | undefined ) - ſɭᴜ ſןᴜ , ꞙɭɔ , ꞙɭı , */
export function qakaj2L6daEl( ca1ara: readonly Qakaj2L6da[], x: number, z: number ): number | undefined {
  let plosteq = 0o1/0o10, rez: number | undefined;
  for ( const d of ca1ara ) {
    const h6kuni = Math.hypot(d.x - x, d.z - z);
    if ( h6kuni <= plosteq ) { plosteq = h6kuni; rez = d.l6da; }
  }
  return rez;
}

/* ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭɔ , ( ꞙɭı , ꞙɭı )
    @param x, z ( number ) - ꞙɭı , ſɭэ ſɭ,w , ꞙɭı ,
@returns l6da ( number | undefined ) - ſɭᴜ ſןᴜ , ꞙɭɔ , ꞙɭı , */
export function qakaj2L6daJe( x: number, z: number ): number | undefined {
  return qakaj2L6daEl(qakaj2jHal6da, x, z);
}

/* ꞙɭı , ꞙɭı , ꞙɭɔ , undefined , ꞙɭɔ , ꞙɭı ,
    @param ca3aq ( string ) - ꞙɭı , "x,z"
@returns l6da ( number | undefined ) - ſɭᴜ ſןᴜ , ꞙɭı , */
export function tap2L6daDeVeb6kek( ca3aq: string ): number | undefined {
  return tamc2kHavem2.get(ca3aq)?.l6da;
}

/* ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
    @param knece ( BrakaL6da [ ] ) - ꞙɭı , ɭʃᴜ , ꞙɭı ,
    @param rezervo ( number ) - ꞙɭı , ſɭэ ſɭ,w , ꞙɭı , ꞙɭɔ ,
@returns l6da ( number ) - ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı , */
// ⟨ ꞙɭı , ſɭэ ſɭ,w , 📏 ⟩ , ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭı ,
// ꞙɭı , ꞙɭı , ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı , ⟅ ꞙɭı , ꞙɭı ,
// ꞙɭı , ſɭэ ſɭ,w , ꞙɭı , ⟅ ꞙɭı , ꞙɭı , ꞙɭı ,
// ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭɔ , ꞙɭı ,
// ꞙɭı , ꞙɭɔ , ꞙɭı , ꞙɭı ,
// ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
export function sukf2qiTap2nL6da( knece: readonly BrakaL6da[], rezervo: number ): number {
  const s2l2me = knece.map(b => b.l6da).filter(Number.isFinite);
  const t6lima = surGrid(rezervo);
  if ( s2l2me.length === 0o0 ) return t6lima;
  let sukf2qita = s2l2me[ 0o0 ], kmaTsiike = Infinity;
  for ( const l6da of s2l2me ) {
    const h6kuni = Math.abs(l6da - t6lima);
    if ( h6kuni < kmaTsiike || ( h6kuni === kmaTsiike && l6da < sukf2qita ) ) {
      kmaTsiike = h6kuni;
      sukf2qita = l6da;
    }
  }
  return Math.max(surGrid(sukf2qita), t6lima);
}
