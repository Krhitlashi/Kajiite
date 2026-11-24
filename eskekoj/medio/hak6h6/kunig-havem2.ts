// ≺⧼ ſɭэ ֭ſɭэ j͑ʃᴜꞇ ʌ j͐ʃэ ɭ(ᴜ ʌ ɭʃᴜ ŋᷠᴜ ʌ ſɟɹƽ ꞁȷ̀ᴜ }ʃꞇ 📏 ⧽≻
// ⟨ ſɭᴜ ſןᴜ , ſɭэ ֭ſɭэ , ꞙɭı , ɭʃᴜ , ꞙɭı , ⟅ ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭɿ , ⟅ ſɭᴜ ſןᴜ , ⟅ ɭʃɜ ſןᴜȝ ,
//   ꞙɭı , ꞙɭı , ɭʃᴜ , ꞙɭı , ꞙɭı , ſɭэ ֭ſɭэ ,
//   ( ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ſןɔ˞ᴜƴ , ) , ꞙɭı , ꞙɭı , ⟅ ꞙɭı , ſɭэ ֭ſɭэ ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı , ⟅ ⟩
//   ꞙɭı , ɭʃᴜ , ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭɔ , ꞙɭı , ſɭᴜ ſןᴜ , ⟅ 📃 ⟩
import { surGrid } from "./havecax2l.js";

// ⟪ ɭʃᴜ , ꞙɭı , ꞙɭı 📏 ⟫
export interface BrakaAlto {
  // ⟨ ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı , ſɭэ ֭ſɭэ , ⟅ 📃 ⟩
  ux: number;
  uz: number;
  // ⟨ ſɭɜ ſɭ,w , ſɭэ ֭ſɭэ , ꞙɭı , ɭʃᴜ , ( ꞙɭı , ſןɔ˞ᴜƴ ) ⟅ 📃 ⟩
  l6da: number;
  // ⟨ ꞙɭı , ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭı , ⟅ 📃 ⟩
  p2somani: number;
}

// ⟪ ſɭᴜ ſןᴜ , ꞙɭı 📏 ⟫
export interface KunigaVem2 {
  x: number;
  z: number;
  // ⟨ ꞙɭı , ꞙɭı , ꞙɭı , ſɭᴜ ſןᴜ , ⟅ 📃 ⟩
  l6da: number;
  // ⟨ ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭı , ɭʃᴜ , ⟅ 📃 ⟩
  knece: BrakaAlto[];
}

export function kunigaKlavo( x: number, z: number ): string {
  return x + "," + z;
}

// ⟨ ꞙɭı , 🌐 ⟩ , vepaqHak6h6n , ꞙɭı ,
// vepaqIntersekcajnHapa12n , ꞙɭı , ꞙɭı , vojSuprajxoj , ꞙɭı ,
// ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭɔ , ⟅ 📃 ⟩
export const kunigajHavem2 = new Map<string, KunigaVem2>();

/* ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
    @returns void */
export function purigiKunigajnHavem2n(): void {
  kunigajHavem2.clear();
}

// ⟪ ſɭᴜ ſןᴜ , ⚓ ⟫
// ⟨ ſɭᴜ ſןᴜ , ſɭэ ֭ſɭэ , ꞙɭı , ꞙɭı , ſןɔ˞ᴜƴ , ꞙɭı ,
// ꞙɭı , ⟅ ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
// vepaqHak6h6n , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭɔ ,
// ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı , ꞙɭı ,
// ꞙɭı , ſɭэ ֭ſɭэ , ſɭᴜ ſןᴜ , ⟅ 📃 ⟩
export interface DokaAlto {
  x: number;
  z: number;
  // ⟨ ꞙɭı , ꞙɭı , ( VOJA_SUPRO_LEVIGXO - VOJA_DIKECO ) , ⟅ 📃 ⟩
  l6da: number;
}

const qakaj2jAltoj: DokaAlto[] = [];

/* ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
    @param x, z ( number ) - ꞙɭı , ſɭэ ſɭ,w , ꞙɭı ,
    @param l6da ( number ) - ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı ,
@returns void */
export function registriDokanAlton( x: number, z: number, l6da: number ): void {
  const ekzistanta = qakaj2jAltoj.find(d => Math.hypot(d.x - x, d.z - z) < 0o1/0o20);
  if ( ekzistanta ) { ekzistanta.x = x; ekzistanta.z = z; ekzistanta.l6da = l6da; return; }
  qakaj2jAltoj.push({ x, z, l6da });
}

/* ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
    @returns ca1ara ( DokaAlto [ ] ) - ſɭᴜ ſןᴜ , ꞙɭı , */
export function konsumiDokajnAltojn(): DokaAlto[] {
  const kopio = qakaj2jAltoj.map(d => ( { ...d } ));
  qakaj2jAltoj.length = 0;
  return kopio;
}

/* ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
    @param ca1ara ( DokaAlto [ ] ) - ſɭᴜ ſןᴜ , ꞙɭı ,
    @param x, z ( number ) - ſɭᴜ ſןᴜ , }ʃɹƽ ,
@returns l6da ( number | undefined ) - ſɭᴜ ſןᴜ , ꞙɭɔ , ꞙɭı , */
export function qakaj2AltoEl( ca1ara: readonly DokaAlto[], x: number, z: number ): number | undefined {
  let plej = 0o1/0o10, rez: number | undefined;
  for ( const d of ca1ara ) {
    const h6kuni = Math.hypot(d.x - x, d.z - z);
    if ( h6kuni <= plej ) { plej = h6kuni; rez = d.l6da; }
  }
  return rez;
}

/* ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭɔ , ( ꞙɭı , ꞙɭı )
    @param x, z ( number ) - ꞙɭı , ſɭэ ſɭ,w , ꞙɭı ,
@returns l6da ( number | undefined ) - ſɭᴜ ſןᴜ , ꞙɭɔ , ꞙɭı , */
export function qakaj2AltoCxe( x: number, z: number ): number | undefined {
  return qakaj2AltoEl(qakaj2jAltoj, x, z);
}

/* ꞙɭı , ꞙɭı , ꞙɭɔ , undefined , ꞙɭɔ , ꞙɭı ,
    @param ca3aq ( string ) - ꞙɭı , "x,z"
@returns l6da ( number | undefined ) - ſɭᴜ ſןᴜ , ꞙɭı , */
export function plataAltoDeVeb6kek( ca3aq: string ): number | undefined {
  return kunigajHavem2.get(ca3aq)?.l6da;
}

/* ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
    @param knece ( BrakaAlto [ ] ) - ꞙɭı , ɭʃᴜ , ꞙɭı ,
    @param rezervo ( number ) - ꞙɭı , ſɭэ ſɭ,w , ꞙɭı , ꞙɭɔ ,
@returns l6da ( number ) - ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı , */
// ⟨ ꞙɭı , ſɭэ ſɭ,w , 📏 ⟩ , ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭı ,
// ꞙɭı , ꞙɭı , ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı , ⟅ ꞙɭı , ꞙɭı ,
// ꞙɭı , ſɭэ ſɭ,w , ꞙɭı , ⟅ ꞙɭı , ꞙɭı , ꞙɭı ,
// ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭɔ , ꞙɭı ,
// ꞙɭı , ꞙɭɔ , ꞙɭı , ꞙɭı ,
// ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
export function elektiPlatanAlton( knece: readonly BrakaAlto[], rezervo: number ): number {
  const validaj = knece.map(b => b.l6da).filter(Number.isFinite);
  const tera = surGrid(rezervo);
  if ( validaj.length === 0 ) return tera;
  let elektita = validaj[ 0 ], plejProksima = Infinity;
  for ( const l6da of validaj ) {
    const h6kuni = Math.abs(l6da - tera);
    if ( h6kuni < plejProksima || ( h6kuni === plejProksima && l6da < elektita ) ) {
      plejProksima = h6kuni;
      elektita = l6da;
    }
  }
  return Math.max(surGrid(elektita), tera);
}
