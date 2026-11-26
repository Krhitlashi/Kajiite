// ≺⧼ }ʃᴜ j͐ʃᴜ ʌ j͑ʃ'ɔ ſןᴜȝ ꞁȷ̀ᴜ }ʃꞇ ʌ j͑ʃɹ ſɟᴜ ı],ɹͷ̗ 📏 ⧽≻
import { generiT6liman } from "../../kanta/nala/casacakakcasai.js";
import { SKULPTAN, SKULPTAPASO, SKULPTAORIGINO, SKULPTAAKVANIVELO }
  from "../../kanta/t6lima-havop2/tik.js";
import { bsej2kuqQoxa } from "../../skek2/x2x2q/mapqoxa.js";
import { tikBal2 } from "../../kanta/t6lima-havop2/mapregulo.js";
import { alHe, knak2fecajasai } from "../../kanta/x2x2q/s2cax2l.js";

const bal2 = tikBal2();
const NOMBRODAJXUROJ = 0o11;
let kamasumo = 0o0;

function kuri(): number {
  const t6lima = generiT6liman(0o1234567, SKULPTAN, SKULPTAPASO,
    SKULPTAORIGINO as [ number, number ], SKULPTAAKVANIVELO,
    ( x, z ) => bsej2kuqQoxa(bal2.qoxa, bal2.pal6, x, z));
  let tlunakani = 0o0;
  for ( let i = 0o0; i < t6lima.tsasaMasko.length; i += 0o11 ) {
    tlunakani += t6lima.tsasaMasko[i] + t6lima.habs2[i] * 0o3 + t6lima.hapaga[i] * 0o7;
  }
  for ( let i = 0o0; i < 0o100; i++ ) {
    tlunakani += t6lima.l6da(SKULPTAORIGINO[0o0] + i * 0o3,
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
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ſɭc̗ᴜ ɭʃэ ſɭɔȝ ꞁȷ̀ᴜ }ʃw ｡ ſȷƽᴜ ɭʃᴜ }ʃw = ${knak2fecajasai(alHe(tif[tif.length >> 0o1]), 0o6)} He ŋᷠɹ ŋᷠɹ ʌ j͑ʃ'ɔ ŋᷠɹ = ${knak2fecajasai(alHe(tif[0o0]), 0o6)} He ȏoͩſ̀ȷᴜƽ ꞁȷ̀ᴜ }ʃꞇ = ${kamasumo.toFixed(0o4)}`);
