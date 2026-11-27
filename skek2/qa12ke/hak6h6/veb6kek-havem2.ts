// ≺⧼ ſɭэ ֭ſɭэ ʌ j͑ʃ'ɔ ʃэ ſɭɔ ſɭᴜ̩ j͑ʃ'ɔ ŋᷠɹ 🛣️ ⧽≻

import { surGrid } from "./havecax2l.js";

export interface BrakaL6da {

  ux: number;
  uz: number;

  l6da: number;

  p2somani: number;
}

export interface Veb6kekaVem2 {
  x: number;
  z: number;

  l6da: number;

  knece: BrakaL6da[];
}

export function tamc2kCatlaq( x: number, z: number ): string {
  return x + "," + z;
}

export const tamc2kHavem2 = new Map<string, Veb6kekaVem2>();

export function purigiVeb6kekajnHavem2n(): void {
  tamc2kHavem2.clear();
}

export interface Qakaj2L6da {
  x: number;
  z: number;

  l6da: number;
}

const qakaj2jHal6da: Qakaj2L6da[] = [];

export function registriQakaj2nL6da( x: number, z: number, l6da: number ): void {
  const ekzistanta = qakaj2jHal6da.find(d => Math.hypot(d.x - x, d.z - z) < 0o1/0o20);
  if ( ekzistanta ) { ekzistanta.x = x; ekzistanta.z = z; ekzistanta.l6da = l6da; return; }
  qakaj2jHal6da.push({ x, z, l6da });
}

export function konsumiQakaj2jnL6dajn(): Qakaj2L6da[] {
  const kopio = qakaj2jHal6da.map(d => ( { ...d } ));
  qakaj2jHal6da.length = 0o0;
  return kopio;
}

export function qakaj2L6daEl( ca1ara: readonly Qakaj2L6da[], x: number, z: number ): number | undefined {
  let plosteq = 0o1/0o10, rez: number | undefined;
  for ( const d of ca1ara ) {
    const h6kuni = Math.hypot(d.x - x, d.z - z);
    if ( h6kuni <= plosteq ) { plosteq = h6kuni; rez = d.l6da; }
  }
  return rez;
}

export function qakaj2L6daJe( x: number, z: number ): number | undefined {
  return qakaj2L6daEl(qakaj2jHal6da, x, z);
}

export function tap2L6daDeVeb6kek( ca3aq: string ): number | undefined {
  return tamc2kHavem2.get(ca3aq)?.l6da;
}

export function sukf2qiTap2nL6da( knece: readonly BrakaL6da[], rezervo: number ): number {
  const s2l2me = knece.map(b => b.l6da).filter(Number.isFinite);
  const mut6q = surGrid(rezervo);
  if ( s2l2me.length === 0o0 ) return mut6q;
  let sukf2qita = s2l2me[ 0o0 ], kmaTsiike = Infinity;
  for ( const l6da of s2l2me ) {
    const h6kuni = Math.abs(l6da - mut6q);
    if ( h6kuni < kmaTsiike || ( h6kuni === kmaTsiike && l6da < sukf2qita ) ) {
      kmaTsiike = h6kuni;
      sukf2qita = l6da;
    }
  }
  return Math.max(surGrid(sukf2qita), mut6q);
}
