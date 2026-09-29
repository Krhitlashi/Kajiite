// ≺⧼ La internaj tipoj 🚪 ⧽≻
// La datumaj tipoj de la internaj spacoj — la plankoj ( PlankoInfo ), la heliksa
// ŝtuparo ( HeliksoInfo, heliksaAltecxo ), la enira punkto ( InternaEnirPunkto )
// kaj la interna sistemo ( InternaSistemo, KasxitaInterno, KASXA_LIMO,
// sxlosiloDeSpeco ).
import * as THREE from "three";
import type { KonstruSpec } from "../satalaj/tipoj.js";
import type { MangxajxItemo } from "../../mebloj/mangxajxoj/tipoj.js";

export interface PlankoInfo {
  /** Y-nivelo de la planko */
  y: number;
  /** Duon-largho de la etaĝa spaco */
  hw: number;
  /** Duon-profundo de la etaĝa spaco */
  hd: number;
  /** Alto de la etaĝo */
  alto: number;
}

export interface HeliksoInfo {
  /** Radiuso de la centra kolono */
  rKol: number;
  /** Ekstera radiuso de la ŝtuparo */
  rEkster: number;
  /** Paŝoj po plena turno */
  perTurno: number;
  /** Alto de unu plena turno ( = tieroAlto ) */
  turnoAlto: number;
  /** Alto de unu sub-tera plena turno ( = tieroAltoSub ) */
  turnoAltoSub: number;
  /** Nombro da supraj plenaj turnoj ( = niveloj - 1 ) */
  turnoj: number;
  /** Nombro da sub-teraj plenaj turnoj ( = sube ) */
  turnojSube: number;
}

// heliksaAltecxo — Alteco de kontinua turno sur la spiralo. Pozitivaj turnoj
// supren laŭ turnoAlto, negativaj malsupren laŭ turnoAltoSub.
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
  // Litoj — lokoj por la kuŝ-interago ( lokaj koordinatoj en la konstruajxo ).
  litkoj: { x: number; z: number; y: number; largho: number }[];
  // Reuzo de konstruitaj internoj. La interno de ĉiu konstruaĵo estas peza
  // ( dekoj da meŝoj, plankaj/plakedaj teksturoj ), sed determinisma — la sama
  // spec ĉiam konstruas la saman grupon. Anstataŭ forĵeti kaj rekonstrui
  // ĉiun eniron, la lastaj vizititaj internoj restas ĉi tie kaj revenas tuj.
  // La Mapo tenas la enmetan ordon, do la malplej freŝa ( unua ) foriĝas kiam
  // la limo estas superita.
  kasxo: Map<string, KasxitaInterno>;
  // La ŝlosilo de la nuna interno — por scii kien reenmeti ĝin ĉe foriro.
  nunaSxlosilo: string | null;
}

// Reuzebla konstruita interno — ĉio bezonata por re-vivigi ĝin en la sceno.
export interface KasxitaInterno {
  grupo: THREE.Group;
  plankoj: PlankoInfo[];
  helikso: HeliksoInfo | null;
  manĝaĵoj: MangxajxItemo[];
  vaporNuboj: { cloud: THREE.Points; basePos: THREE.Vector3; ph: number }[];
  litkoj: { x: number; z: number; y: number; largho: number }[];
  animated: { update: ( t: number ) => void }[];
}

// Kiom da internoj restu en la kasxo. Ĉiu okupas GPU-memoron ( geometrioj,
// materialoj, teksturoj ), do la limo estas malgranda — sufiĉa por la lastaj
// vizitoj, sen manĝi la tutan memoron. 0o6 = 6 internoj.
export const KASXA_LIMO = 0o6;

// sxlosiloDeSpeco — Unika kaj STABILA ŝlosilo de konstrua speco. La nomo
// ( "paq" + indekso ) estas unika en la urbo, do ĝi identigas la konstruaĵon
// sen dependecon de la tip- aŭ pozicio-ŝanĝoj.
export function sxlosiloDeSpeco(spec: KonstruSpec): string {
  return `${spec.type}|${spec.name}`;
}
