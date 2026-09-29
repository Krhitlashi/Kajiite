// ≺⧼ La manĝaĵaj tipoj 🍽️ ⧽≻
// La stato de unu metita manĝaĵo ( MangxajxItemo ).
import * as THREE from "three";
import type { MangxajxDatumo } from "./datumoj.js";
export interface MangxajxItemo {
  mesh: THREE.Group;
  key: string;
  f: MangxajxDatumo;
  pos: THREE.Vector3;
  dead: boolean;
  // Nuna malkreska animacio ( konsumi ) — por nuligi gxin, kiam la interno
  // estas kasxita kaj reuzata ( la animacio ne plu apartenu al la reaperanta
  // mangxajxo ).
  malkreska?: number | null;
}
