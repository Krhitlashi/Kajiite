// ≺⧼ ការរកតំបន់ 🔍 ⧽≻
import { akvo } from "../../kantaoj/mondo/tereno.js";
import { skulptitaBesto } from "../../kantaoj/tero-datumaro/rultempo.js";
import { SKULPTA_PASO, SKULPTA_N, SKULPTA_ORIGINO } from "../../kantaoj/tero-datumaro/aktiva.js";

export function trovuBestajnZonojn(bito: number, nurAkvo: boolean): { x: number; z: number }[] {
  const zonoj: { x: number; z: number }[] = [];
  for ( let j = 0; j < SKULPTA_N; j++ ) {
    for ( let i = 0; i < SKULPTA_N; i++ ) {
      const x = SKULPTA_ORIGINO[0] + i * SKULPTA_PASO;
      const z = SKULPTA_ORIGINO[1] + j * SKULPTA_PASO;
      if ( ( skulptitaBesto(x, z) & bito ) === 0 ) continue;
      if ( nurAkvo && !akvo(x, z) ) continue;
      zonoj.push({ x, z });
    }
  }
  return zonoj;
}
