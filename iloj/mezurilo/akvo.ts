// ≺⧼ ការវាស់ការគណនាទឹក 💧 ⧽≻
// ប្រៀបធៀបកំណែចាស់ ( ច្បាប់ចម្លងពី git ) និងកំណែថ្មីលើដីពិត ។
import * as THREE from "three";
import { konstruiSkulptitanAkvon } from "../../eskekoj/medio/akvo.js";
import { kalkuliAkvon as kalkuliAkvonNova } from "../../kantaoj/mondo/akvokalkulo.js";
import { kalkuliAkvon as kalkuliAkvonMalnova } from "./malnova-akvokalkulo.js";
import type { AkvaKalkulo } from "../../kantaoj/mondo/akvokalkulo.js";
import { sekaAlteco } from "../../kantaoj/mondo/tereno.js";
import { aktivajAkvofontoj, aktivaAkvaMasko } from "../../kantaoj/tero-datumaro/rultempo.js";
import { SKULPTA_AKVA_NIVELO, SKULPTA_N, SKULPTA_ORIGINO, SKULPTA_PASO }
  from "../../kantaoj/tero-datumaro/aktiva.js";
import { cxuEnFormo } from "../../eskekoj/komunajxoj/mapformo.js";
import { aktivaMapo } from "../../kantaoj/tero-datumaro/mapregulo.js";

const NOMBRO_DA_JXUROJ = 0o11;
const mapo = aktivaMapo();
const enFormo = ( x: number, z: number ) => cxuEnFormo(mapo.formo, mapo.grandeco, x, z);
const fontoj = aktivajAkvofontoj();
const hatk2ni = aktivaAkvaMasko();

function kuri( kiu: "malnova" | "sef4" ): AkvaKalkulo {
  const fn = kiu === "malnova" ? kalkuliAkvonMalnova : kalkuliAkvonNova;
  return fn(SKULPTA_N, SKULPTA_PASO, SKULPTA_ORIGINO as [number, number],
    sekaAlteco, enFormo, fontoj, hatk2ni,
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

const malnova = kuri("malnova");
const sef4 = kuri("sef4");
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) លេខស្មើគ្នា=${komparu(malnova, sef4)} ទឹក=${sef4.statistikoj.akvaj} ប្រឡាយ=${sef4.statistikoj.haqar6xe}`);

let minM = Infinity, minN = Infinity;
for ( let r = 0; r < NOMBRO_DA_JXUROJ; r++ ) {
  const unueNova = ( r & 1 ) === 1;
  const t0 = performance.now();
  if ( unueNova ) kuri("sef4"); else kuri("malnova");
  const t1 = performance.now();
  if ( unueNova ) kuri("malnova"); else kuri("sef4");
  const t2 = performance.now();
  const dNova = unueNova ? t1 - t0 : t2 - t1;
  const dMalnova = unueNova ? t2 - t1 : t1 - t0;
  if ( dMalnova < minM ) minM = dMalnova;
  if ( dNova < minN ) minN = dNova;
}
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) kalkuliAkvon ចាស់=${minM.toFixed(1)}ms ថ្មី=${minN.toFixed(1)}ms លឿន=${(minM / minN).toFixed(2)}x`);

// ⟨ ក្រឡាសាកល្បង 0o11 × 0o11 ៖ មានទឹកតែ 0o4 ក្រឡាក្នុង 0o11 ក្រឡា 📃 ⟩
const qena = new THREE.Scene();
const akvaMesho = konstruiSkulptitanAkvon(qena, 0, 0, 2, 2, 2,
  ( x, z ) => x >= 1 && z >= 1, () => 1,
  ( x, z ) => x >= 1 && z >= 1 ? 0 : 2);
const akvaIndeksoj = akvaMesho.mesh.geometry.getIndex()!;
if ( akvaIndeksoj.count !== 0o30 ) {
  throw new Error(`( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) សន្ទស្សន៍ទឹក ${akvaIndeksoj.count} មិនមែន 0o30`);
}
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ក្រឡាទឹកមើលឃើញ=0o4/0o11 ត្រីកោណ=${akvaIndeksoj.count / 3} ✅`);
