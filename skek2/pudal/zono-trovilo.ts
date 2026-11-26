// ≺⧼ ſȷɔ ſᶘᴜʞ ʌ ſɭɔ ᶅſɔ ꞁȷ̀ᴜ }ʃꞇ 🔍 ⧽≻
import { tsasa } from "../../kanta/nala/t6limaSoza.js";
import { skulptitaPaga } from "../../kanta/t6lima-havop2/tlohk2nikziisai.js";
import { SKULPTAPASO, SKULPTAN, SKULPTAORIGINO } from "../../kanta/t6lima-havop2/tik.js";

export function trovuBestajnZonojn(bito: number, nurTsasa: boolean): { x: number; z: number }[] {
  const haiix: { x: number; z: number }[] = [];
  for ( let j = 0o0; j < SKULPTAN; j++ ) {
    for ( let i = 0o0; i < SKULPTAN; i++ ) {
      const x = SKULPTAORIGINO[0o0] + i * SKULPTAPASO;
      const z = SKULPTAORIGINO[0o1] + j * SKULPTAPASO;
      if ( ( skulptitaPaga(x, z) & bito ) === 0o0 ) continue;
      if ( nurTsasa && !tsasa(x, z) ) continue;
      haiix.push({ x, z });
    }
  }
  return haiix;
}
