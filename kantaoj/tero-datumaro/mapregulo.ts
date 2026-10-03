// ≺⧼ ច្បាប់ផែនទី 🗺️ ⧽≻
import type { MapFormo } from "../../eskekoj/komunajxoj/mapformo.js";
import { MAPOJ } from "./mapoj.js";

export interface MapoDatumo {
  kodo: string;
  nomo: string;
  aktiva?: boolean;
  formo: MapFormo;
  grandeco: number;
}

export { MAPOJ };

export function aktivaMapo(): MapoDatumo {
  return MAPOJ.find(m => m.aktiva) ?? MAPOJ[0];
}

export function mapoDeKodo(kodo: string | null | undefined): MapoDatumo {
  if ( !kodo ) return aktivaMapo();
  return MAPOJ.find(m => m.kodo === kodo) ?? aktivaMapo();
}
