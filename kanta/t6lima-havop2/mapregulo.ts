// ≺⧼ j͑ʃɹ ſɭᴜc̗ ɭʃᴜ ʌ ʃᴜ j͐ʃɹ 🗺️ ⧽≻
import type { Bal2Qoxa } from "../../skek2/x2x2q/mapqoxa.js";
import { Habal2 } from "./bal2.js";

export interface Bal2Vop2 {
  s2kanta: string;
  ksaka: string;
  tik?: boolean;
  qoxa: Bal2Qoxa;
  pal6: number;
}

export { Habal2 };

export function tikBal2(): Bal2Vop2 {
  return Habal2.find(m => m.tik) ?? Habal2[0];
}

export function bal2DeS2kanta(s2kanta: string | null | undefined): Bal2Vop2 {
  if ( !s2kanta ) return tikBal2();
  return Habal2.find(m => m.s2kanta === s2kanta) ?? tikBal2();
}
