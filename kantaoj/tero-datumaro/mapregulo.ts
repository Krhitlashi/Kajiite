// ≺⧼ j͑ʃɹ ſɭᴜc̗ ɭʃᴜ ʌ ʃᴜ j͐ʃɹ 🗺️ ⧽≻
import type { Bal2Qoxa } from "../../eskekoj/komunajxoj/mapqoxa.js";
import { MAPOJ } from "./mapoj.js";

export interface MapoDatumo {
  kodo: string;
  ksaka: string;
  aktiva?: boolean;
  qoxa: Bal2Qoxa;
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
