// ≺⧼ ប្រភេទចំណត ⚓ ⧽≻
import * as THREE from "three";

export const DOKO_PLATFORMA_LARĜO = 0o16/0o10;
export const DOKO_KADRA_LARĜO = 0o4/0o10;

export interface DokaSekcio {
  lx: number;
  lz: number;
  w: number;
  d: number;
  y: number;
}

export interface Doko {
  group: THREE.Group;
  x: number;
  z: number;
  platformWidth: number;
  platformDepth: number;
  platformY: number;
  sekcioj: DokaSekcio[];
  stuparajPunktoj: [ number, number ][];
  stuparaSupro: number;
}
