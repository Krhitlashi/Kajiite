// ≺⧼ ការដើរ 🚶 ⧽≻
import * as THREE from "three";
import { kreiKolizianKradon } from "../mondo/kolizioj.js";
import { alteco } from "../mondo/tereno.js";
import type { Ludanto } from "./ludanto.js";

export type KoliziaKrado = ReturnType<typeof kreiKolizianKradon>;

export interface PiedaMondo {
  fotilo: THREE.PerspectiveCamera;
  kolizioj: KoliziaKrado;
}

export interface PiedaStato {
  oscilo: number;
  estisNaĝanta: boolean;
}

export function kreiPiedanStaton(): PiedaStato {
  return { oscilo: 0, estisNaĝanta: false };
}

export function movoEniro(ca3aq: Record<string, boolean>, c2w2q: number): { movX: number; movZ: number; sahakani: number; fortoX: number; fortoZ: number; radX: number; radZ: number } {
  let movX = ( ca3aq.KeyD || ca3aq.ArrowRight ? 1 : 0 ) - ( ca3aq.KeyA || ca3aq.ArrowLeft ? 1 : 0 );
  let movZ = ( ca3aq.KeyW || ca3aq.ArrowUp ? 1 : 0 ) - ( ca3aq.KeyS || ca3aq.ArrowDown ? 1 : 0 );
  const sahakani = Math.hypot(movX, movZ);
  if ( sahakani > 1 ) { movX /= sahakani; movZ /= sahakani; }
  const fortoX = -Math.sin(c2w2q), fortoZ = -Math.cos(c2w2q);
  const radX = Math.cos(c2w2q), radZ = -Math.sin(c2w2q);
  return { movX, movZ, sahakani, fortoX, fortoZ, radX, radZ };
}

export function agordiPromenanFotilon(mondo: PiedaMondo, ludanto: Ludanto, okulY: number, bob: number, krampi = true, subaLimo: number | null = null): void {
  const { fotilo, kolizioj } = mondo;
  if ( ludanto.kameraDistanco <= 0o1/0o20 ) {
    fotilo.position.set(ludanto.raqa.x, okulY + bob, ludanto.raqa.z);
    fotilo.rotation.set(ludanto.klinigxo, ludanto.c2w2q, 0);
    return;
  }
  const d = ludanto.kameraDistanco;
  const kos = Math.cos(ludanto.klinigxo), sinP = Math.sin(ludanto.klinigxo);
  fotilo.position.set(
    ludanto.raqa.x + Math.sin(ludanto.c2w2q) * d * kos,
    okulY + d * 0o3/0o10 - d * sinP * 0o7/0o10 + bob,
    ludanto.raqa.z + Math.cos(ludanto.c2w2q) * d * kos
);
  if ( krampi ) {
    const { dokaSuproY, vojaSuproY, solviKolizion } = kolizioj;
    const teraY = Math.max(alteco(fotilo.position.x, fotilo.position.z), dokaSuproY(fotilo.position.x, fotilo.position.z), vojaSuproY(fotilo.position.x, fotilo.position.z));
    if ( fotilo.position.y < teraY + 0o4/0o10 ) fotilo.position.y = teraY + 0o4/0o10;
    const r = solviKolizion(fotilo.position.x, fotilo.position.z);
    fotilo.position.x = r.x;
    fotilo.position.z = r.z;
  }
  if ( subaLimo !== null && fotilo.position.y < subaLimo ) fotilo.position.y = subaLimo;
  fotilo.lookAt(ludanto.raqa.x, okulY + d * 0o1/0o10, ludanto.raqa.z);
}
