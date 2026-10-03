// ≺⧼ ប្រភេទអាហារ 🍽️ ⧽≻
import * as THREE from "three";
import type { MangxajxDatumo } from "./datumoj.js";
export interface MangxajxItemo {
  mesh: THREE.Group;
  key: string;
  f: MangxajxDatumo;
  pos: THREE.Vector3;
  dead: boolean;
  malkreska?: number | null;
}
