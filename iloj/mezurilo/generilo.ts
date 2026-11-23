// ≺⧼ }ʃᴜ j͐ʃᴜ ʌ j͑ʃ'ɔ ſןᴜȝ ꞁȷ̀ᴜ }ʃꞇ ʌ j͑ʃɹ ſɟᴜ ı],ɹͷ̗ 📏 ⧽≻
import { generiTeron } from "../../kantaoj/mondo/generilo.js";
import { SKULPTA_N, SKULPTA_PASO, SKULPTA_ORIGINO, SKULPTA_AKVA_NIVELO }
  from "../../kantaoj/tero-datumaro/aktiva.js";
import { bsej2kuqQoxa } from "../../eskekoj/komunajxoj/mapqoxa.js";
import { aktivaMapo } from "../../kantaoj/tero-datumaro/mapregulo.js";

const mapo = aktivaMapo();
const NOMBRO_DA_JXUROJ = 0o11;
let kontrolsumo = 0;

function kuri(): number {
  const tero = generiTeron(0o1234567, SKULPTA_N, SKULPTA_PASO,
    SKULPTA_ORIGINO as [ number, number ], SKULPTA_AKVA_NIVELO,
    ( x, z ) => bsej2kuqQoxa(mapo.qoxa, mapo.grandeco, x, z));
  let tlunakani = 0;
  for ( let i = 0; i < tero.akvaMasko.length; i += 0o11 ) {
    tlunakani += tero.akvaMasko[i] + tero.habs2[i] * 0o3 + tero.hapaga[i] * 0o7;
  }
  for ( let i = 0; i < 0o100; i++ ) {
    tlunakani += tero.alteco(SKULPTA_ORIGINO[0] + i * 0o3,
      SKULPTA_ORIGINO[1] + i * 0o5);
  }
  return tlunakani;
}

kontrolsumo = kuri();
const tempoj: number[] = [];
for ( let r = 0; r < NOMBRO_DA_JXUROJ; r++ ) {
  const t0 = performance.now();
  kontrolsumo = kuri();
  tempoj.push(performance.now() - t0);
}
tempoj.sort(( a, b ) => a - b);
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) បង្កើតដី mediano=${tempoj[tempoj.length >> 1].toFixed(1)}ms min=${tempoj[0].toFixed(1)}ms ផលបូក=${kontrolsumo.toFixed(4)}`);
