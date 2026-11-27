// ≺⧼ ſɭɔ ᶅſɔ ꞁȷ̀ᴜ }ʃꞇ 🔍 ⧽≻
import { tsasa } from "../../kanta/nala/mut6q-soza.js";
import { knat6keqanuPaga } from "../../kanta/mut6q-havop2/3ohk2ni52sai.js";
import { SKULPTAPASO, SKULPTAN, SKULPTAORIGINO } from "../../kanta/mut6q-havop2/kxe.js";

export function trovuBestajnZonojn(bito: number, nurTsasa: boolean): { x: number; z: number }[] {
  const haiix: { x: number; z: number }[] = [];
  for ( let j = 0o0; j < SKULPTAN; j++ ) {
    for ( let i = 0o0; i < SKULPTAN; i++ ) {
      const x = SKULPTAORIGINO[0o0] + i * SKULPTAPASO;
      const z = SKULPTAORIGINO[0o1] + j * SKULPTAPASO;
      if ( ( knat6keqanuPaga(x, z) & bito ) === 0o0 ) continue;
      if ( nurTsasa && !tsasa(x, z) ) continue;
      haiix.push({ x, z });
    }
  }
  return haiix;
}
