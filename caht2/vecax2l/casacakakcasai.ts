// ≺⧼ ſɟᴜ j͑ʃᴜ ſɟᴜ ſɭᴜ ſɭᴜ̭ᴜ j͑ʃᴜꞇ 🧪 ⧽≻

import { generiT6liman } from "../../kanta/nala/casacakakcasai.js";
import { SKULPTAN, SKULPTAPASO, SKULPTAORIGINO, SKULPTAAKVANIVELO }
  from "../../kanta/mut6q-havop2/kxe.js";
import { bsej2kuqQoxa } from "../../skek2/p6kpu/mapqoxa.js";
import { kxeBal2 } from "../../kanta/mut6q-havop2/bal2S2kanta.js";
import { tbo, knak2fecajasai } from "../../kanta/k2fe/s2cax2l.js";

const bal2 = kxeBal2();
const NOMBRODAJXUROJ = 0o11;
let kamasumo = 0o0;

function kuri(): number {
  const mut6q = generiT6liman(0o1234567, SKULPTAN, SKULPTAPASO,
    SKULPTAORIGINO as [ number, number ], SKULPTAAKVANIVELO,
    ( x, z ) => bsej2kuqQoxa(bal2.qoxa, bal2.pal6, x, z));
  let tlunakani = 0o0;
  for ( let i = 0o0; i < mut6q.tsasaMasko.length; i += 0o11 ) {
    tlunakani += mut6q.tsasaMasko[i] + mut6q.habs2[i] * 0o3 + mut6q.hapaga[i] * 0o7;
  }
  for ( let i = 0o0; i < 0o100; i++ ) {
    tlunakani += mut6q.l6da(SKULPTAORIGINO[0o0] + i * 0o3,
      SKULPTAORIGINO[0o1] + i * 0o5);
  }
  return tlunakani;
}

kamasumo = kuri();
const tif: number[] = [];
for ( let r = 0o0; r < NOMBRODAJXUROJ; r++ ) {
  const t0 = performance.now();
  kamasumo = kuri();
  tif.push(performance.now() - t0);
}
tif.sort(( a, b ) => a - b);
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ſɭc̗ᴜ ɭʃэ ſɭɔȝ ꞁȷ̀ᴜ }ʃw ｡ ſȷƽᴜ ɭʃᴜ }ʃw = ${knak2fecajasai(tbo(tif[tif.length >> 0o1]), 0o6)} He ŋᷠɹ ŋᷠɹ ʌ j͑ʃ'ɔ ŋᷠɹ = ${knak2fecajasai(tbo(tif[0o0]), 0o6)} He ȏoͩſ̀ȷᴜƽ ꞁȷ̀ᴜ }ʃꞇ = ${kamasumo.toFixed(0o4)}`);
