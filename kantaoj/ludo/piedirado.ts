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

export function movoEniro(klavoj: Record<string, boolean>, direkto: number): { movX: number; movZ: number; longo: number; fortoX: number; fortoZ: number; radX: number; radZ: number } {
  let movX = ( klavoj.KeyD || klavoj.ArrowRight ? 1 : 0 ) - ( klavoj.KeyA || klavoj.ArrowLeft ? 1 : 0 );
  let movZ = ( klavoj.KeyW || klavoj.ArrowUp ? 1 : 0 ) - ( klavoj.KeyS || klavoj.ArrowDown ? 1 : 0 );
  const longo = Math.hypot(movX, movZ);
  if ( longo > 1 ) { movX /= longo; movZ /= longo; }
  const fortoX = -Math.sin(direkto), fortoZ = -Math.cos(direkto);
  const radX = Math.cos(direkto), radZ = -Math.sin(direkto);
  return { movX, movZ, longo, fortoX, fortoZ, radX, radZ };
}

export function agordiPromenanFotilon(mondo: PiedaMondo, ludanto: Ludanto, okulY: number, bob: number, krampi = true, subaLimo: number | null = null): void {
  const { fotilo, kolizioj } = mondo;
  if ( ludanto.kameraDistanco <= 0o1/0o20 ) {
    fotilo.position.set(ludanto.pozicio.x, okulY + bob, ludanto.pozicio.z);
    fotilo.rotation.set(ludanto.klinigxo, ludanto.direkto, 0);
    return;
  }
  const d = ludanto.kameraDistanco;
  const kos = Math.cos(ludanto.klinigxo), sinP = Math.sin(ludanto.klinigxo);
  fotilo.position.set(
    ludanto.pozicio.x + Math.sin(ludanto.direkto) * d * kos,
    okulY + d * 0o3/0o10 - d * sinP * 0o7/0o10 + bob,
    ludanto.pozicio.z + Math.cos(ludanto.direkto) * d * kos
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
  fotilo.lookAt(ludanto.pozicio.x, okulY + d * 0o1/0o10, ludanto.pozicio.z);
}
