// ≺⧼ ֭ſɭw }ʃᴜȝ ʌ ſɟɹ ֭ſɭɹ 🚪 ⧽≻
import * as THREE from "three";
import type { VepaqSpec } from "../satalaj/hahunaq.js";
import type { MangxajxItemo } from "../../mebloj/mangxajxoj/hahunaq.js";

export interface PlankoInfo {
/** ſןw ſɭᴜƴ , j͑ʃᴜ ſɭ,w , ꞙɭı */
  y: number;
/** ſɭᴜ ſןᴜ , ſɭэ ſɭᴜ , ꞙɭı , */
  hw: number;
/** ſɭᴜ ſןᴜ , ſɭɜ ſɭ,w , ꞙɭı , */
  hd: number;
/** ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , */
  l6da: number;
}

export interface HeliksoInfo {
/** ſɭᴜ ſןᴜ , ſןᴜ ᶘɹ , ꞙɭı , */
  rKol: number;
/** ſɟᴜ ſןᴜ ɭʃэ , ſɭᴜ ſɭˬꞇƽ , */
  rEkster: number;
/** ſɟᴜ ſןᴜ ɭʃэ , ſןɔ˞ᴜƴ , ꞙɭı , */
  perTurno: number;
/** ſɟᴜ ſןᴜ ɭʃэ , j͑ʃᴜ ſɭ,w , ꞙɭı , */
  turnoAlto: number;
/** ſɟᴜ ſןᴜ ɭʃэ , ſɭɜ ſɭ,w , j͑ʃᴜ ſɭ,w , ꞙɭı , */
  turnoAltoSub: number;
/** ſɟᴜ ſןᴜ ɭʃэ , ꞙɭı , */
  turnoj: number;
/** ſɟᴜ ſןᴜ ɭʃэ , ꞙɭɿ , */
  turnojSube: number;
}

export function heliksaAltecxo(h: HeliksoInfo, turno: number): number {
  return turno >= 0 ? turno * h.turnoAlto : turno * h.turnoAltoSub;
}

export interface InternaEnirPunkto {
  x: number;
  z: number;
  y: number;
  c2w2q: number;
}

export interface InternaSistemo {
  currentGroup: THREE.Group | null;
  animated: { update: ( t: number ) => void }[];
  plankoj: PlankoInfo[];
  helikso: HeliksoInfo | null;
  m7x: MangxajxItemo[];
  vaporNuboj: { cloud: THREE.Points; basePos: THREE.Vector3; ph: number }[];
  litkoj: { x: number; z: number; y: number; sefini: number }[];
  kasxo: Map<string, KasxitaInterno>;
  nunaSxlosilo: string | null;
}

export interface KasxitaInterno {
  hate: THREE.Group;
  plankoj: PlankoInfo[];
  helikso: HeliksoInfo | null;
  m7x: MangxajxItemo[];
  vaporNuboj: { cloud: THREE.Points; basePos: THREE.Vector3; ph: number }[];
  litkoj: { x: number; z: number; y: number; sefini: number }[];
  animated: { update: ( t: number ) => void }[];
}

export const KASXA_LIMO = 0o6;

export function sxlosiloDePudal(spec: VepaqSpec): string {
  return `${spec.type}|${spec.name}`;
}
