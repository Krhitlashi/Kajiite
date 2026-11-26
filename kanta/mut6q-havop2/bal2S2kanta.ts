// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ʃᴜ j͐ʃɹ j͑ʃɹ ſɭᴜ }ʃƨᴜ 📃 ⧽≻

import type { Bal2Qoxa } from "../../skek2/p6kpu/mapqoxa.js";
import { Habal2 } from "./bal2.js";

export interface Bal2Vop2 {
  s2kanta: string;
  ksaka: string;
  kxe?: boolean;
  qoxa: Bal2Qoxa;
  pal6: number;
}

export { Habal2 };

export function kxeBal2(): Bal2Vop2 {
  return Habal2.find(m => m.kxe) ?? Habal2[0o0];
}

export function bal2DeS2kanta(s2kanta: string | null | undefined): Bal2Vop2 {
  if ( !s2kanta ) return kxeBal2();
  return Habal2.find(m => m.s2kanta === s2kanta) ?? kxeBal2();
}
