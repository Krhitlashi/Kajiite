// ≺⧼ ប្រភេទខាងក្នុង 🚪 ⧽≻
import * as THREE from "three";
import type { KonstruSpec } from "../satalaj/tipoj.js";
import type { MangxajxItemo } from "../../mebloj/mangxajxoj/tipoj.js";

export interface PlankoInfo {
  /** កម្រិត Y នៃកម្រាល */
  y: number;
  /** កន្លះទទឹងនៃលំហជាន់ */
  hw: number;
  /** កន្លះជម្រៅនៃលំហជាន់ */
  hd: number;
  /** កម្ពស់ជាន់ */
  alto: number;
}

export interface HeliksoInfo {
  /** កាំនៃសសរកណ្តាល */
  rKol: number;
  /** កាំខាងក្រៅនៃជណ្តើរ */
  rEkster: number;
  /** ជំហានក្នុងមួយវេនពេញ */
  perTurno: number;
  /** កម្ពស់មួយវេនពេញ ( = tieroAlto ) */
  turnoAlto: number;
  /** កម្ពស់មួយវេនពេញក្រោមដី ( = tieroAltoSub ) */
  turnoAltoSub: number;
  /** ចំនួនវេនពេញខាងលើ ( = niveloj - 1 ) */
  turnoj: number;
  /** ចំនួនវេនពេញក្រោមដី ( = sube ) */
  turnojSube: number;
}

export function heliksaAltecxo(h: HeliksoInfo, turno: number): number {
  return turno >= 0 ? turno * h.turnoAlto : turno * h.turnoAltoSub;
}

export interface InternaEnirPunkto {
  x: number;
  z: number;
  y: number;
  direkto: number;
}

export interface InternaSistemo {
  currentGroup: THREE.Group | null;
  animated: { update: ( t: number ) => void }[];
  plankoj: PlankoInfo[];
  helikso: HeliksoInfo | null;
  manĝaĵoj: MangxajxItemo[];
  vaporNuboj: { cloud: THREE.Points; basePos: THREE.Vector3; ph: number }[];
  litkoj: { x: number; z: number; y: number; largho: number }[];
  kasxo: Map<string, KasxitaInterno>;
  nunaSxlosilo: string | null;
}

export interface KasxitaInterno {
  grupo: THREE.Group;
  plankoj: PlankoInfo[];
  helikso: HeliksoInfo | null;
  manĝaĵoj: MangxajxItemo[];
  vaporNuboj: { cloud: THREE.Points; basePos: THREE.Vector3; ph: number }[];
  litkoj: { x: number; z: number; y: number; largho: number }[];
  animated: { update: ( t: number ) => void }[];
}

export const KASXA_LIMO = 0o6;

export function sxlosiloDeSpeco(spec: KonstruSpec): string {
  return `${spec.type}|${spec.name}`;
}
