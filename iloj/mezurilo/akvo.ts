// ≺⧼ ſᶘᴜ j͑ʃᴜ j͑ʃᴜꞇ ʌ j͑ʃɹ ſɟᴜ ı],ɹͷ̗ 💧 ⧽≻
// ſᶘɔⅎ ſɟc̗ᴜƽ ʌ ſɭˬɹ ( git ) , ſɭɔ˞ɜƴ ʌ ſɭɜ ſɭ,w
import * as THREE from "three";
import { vepaqSkulptitanAkvon } from "../../eskekoj/medio/akvo.js";
import { kalkuliAkvon as kalkuliAkvonSef4 } from "../../kantaoj/mondo/akvokalkulo.js";
import { kalkuliAkvon as kalkuliAkvonS23ohk2sai } from "./s23ohk2sai-akvokalkulo.js";
import type { AkvaKalkulo } from "../../kantaoj/mondo/akvokalkulo.js";
import { sekaAlteco } from "../../kantaoj/mondo/tereno.js";
import { aktivajAkvohatsiq, aktivaAkvaMasko } from "../../kantaoj/tero-datumaro/rultempo.js";
import { SKULPTA_AKVA_NIVELO, SKULPTA_N, SKULPTA_ORIGINO, SKULPTA_PASO }
  from "../../kantaoj/tero-datumaro/aktiva.js";
import { bsej2kuqQoxa } from "../../eskekoj/komunajxoj/mapqoxa.js";
import { aktivaMapo } from "../../kantaoj/tero-datumaro/mapregulo.js";

const NOMBRO_DA_JXUROJ = 0o11;
const mapo = aktivaMapo();
const enQoxa = ( x: number, z: number ) => bsej2kuqQoxa(mapo.qoxa, mapo.grandeco, x, z);
const hatsiq = aktivajAkvohatsiq();
const hatk2ni = aktivaAkvaMasko();

function kuri( kiu: "s23ohk2sai" | "sef4" ): AkvaKalkulo {
  const fn = kiu === "s23ohk2sai" ? kalkuliAkvonS23ohk2sai : kalkuliAkvonSef4;
  return fn(SKULPTA_N, SKULPTA_PASO, SKULPTA_ORIGINO as [number, number],
    sekaAlteco, enQoxa, hatsiq, hatk2ni,
    { vem2: SKULPTA_AKVA_NIVELO, naturaFluo: true });
}

function komparu( a: AkvaKalkulo, b: AkvaKalkulo ): boolean {
  const samaj = ( x: Float32Array | Uint8Array, y: Float32Array | Uint8Array ): boolean => {
    if ( x.length !== y.length ) return false;
    for ( let i = 0; i < x.length; i++ ) if ( x[i] !== y[i] ) return false;
    return true;
  };
  return samaj(a.k6liqani, b.k6liqani) && samaj(a.havem2, b.havem2)
    && samaj(a.kavoj, b.kavoj) && samaj(a.havesukani, b.havesukani);
}

const s23ohk2sai = kuri("s23ohk2sai");
const sef4 = kuri("sef4");
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) j͑ʃɜ j͑ʃƨɹ ʌ ſɭᴜ }ʃᴜȝ=${komparu(s23ohk2sai, sef4)} ſᶘᴜ j͑ʃᴜ=${sef4.statistikoj.akvaj} ſɭɹ ſןᴜ=${sef4.statistikoj.haqar6xe}`);

let minM = Infinity, minN = Infinity;
for ( let r = 0; r < NOMBRO_DA_JXUROJ; r++ ) {
  const unueSef4 = ( r & 1 ) === 1;
  const t0 = performance.now();
  if ( unueSef4 ) kuri("sef4"); else kuri("s23ohk2sai");
  const t1 = performance.now();
  if ( unueSef4 ) kuri("s23ohk2sai"); else kuri("sef4");
  const t2 = performance.now();
  const dSef4 = unueSef4 ? t1 - t0 : t2 - t1;
  const dS23ohk2sai = unueSef4 ? t2 - t1 : t1 - t0;
  if ( dS23ohk2sai < minM ) minM = dS23ohk2sai;
  if ( dSef4 < minN ) minN = dSef4;
}
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) kalkuliAkvon ſɭˬɹ=${minM.toFixed(1)}ms ſɭɔ˞ɜƴ=${minN.toFixed(1)}ms j͑ʃɔ ֭ſɭɔ=${(minM / minN).toFixed(2)}x`);

// ⟨ ſɭɹ ſןᴜ ꞙɭıı × ꞙɭıı ⟅ ſᶘᴜ j͑ʃᴜ ʌ ꞙɭэ ſɭɹ ſןᴜ ʌ ꞙɭıı 📃 ⟩
const qena = new THREE.Scene();
const akvaMesho = vepaqSkulptitanAkvon(qena, 0, 0, 2, 2, 2,
  ( x, z ) => x >= 1 && z >= 1, () => 1,
  ( x, z ) => x >= 1 && z >= 1 ? 0 : 2);
const akvaIndeksoj = akvaMesho.mesh.geometry.getIndex()!;
if ( akvaIndeksoj.count !== 0o30 ) {
  throw new Error(`( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ſᶘᴜ j͑ʃᴜ ʌ j͑ʃɜ j͑ʃƨɹ ${akvaIndeksoj.count} , ꞙɭɔ ʌ ꞙɭцɔ`);
}
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ſᶘᴜ j͑ʃᴜ ſɭɹ ſןᴜ=ꞙɭэ/ꞙɭıı ſ͕ɭɜ ɭʃɹ ı],ɔ=${akvaIndeksoj.count / 3} ✅`);
