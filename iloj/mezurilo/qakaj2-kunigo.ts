// ≺⧼ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ʌ j͑ʃᴜ ſɟɹƽ ꞁȷ̀ᴜ }ʃꞇ ʌ ſןᴜ ſᶘɹ 🚢 ⧽≻
// ⟨ ſɭᴜ ſןᴜ , ſɭᴜ ſןᴜ , ſןw ſɭᴜƴ , ꞙɭɔ , ⟅ ſɭᴜ ſןᴜ ,
// ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı , ꞙɭɿ , 📃 ⟩
import "./falsdomo.mjs";
import { aktivajHaqakaj2 } from "../../kantaoj/tero-datumaro/rultempo.js";
import { alteco, akvaVem2 } from "../../kantaoj/mondo/tereno.js";
import { vepaqQakaj2n } from "../../eskekoj/medio/qakaj2.js";
import { qakaj2AltoCxe } from "../../eskekoj/medio/hak6h6/kunig-havem2.js";
import { DOKO_JOQA_SEFINI, DOKO_PLATFORMA_SEFINI } from "../../eskekoj/medio/qakaj2/hahunaq.js";
import { VOJA_EKSTERA_DUONO, VOJA_TRUA_DUONO } from "../../eskekoj/medio/hak6h6/havecax2l.js";
import { kf2MezuranMondon } from "./komunaj.js";

const mondo = kf2MezuranMondon(false);
const DOKOJ = aktivajHaqakaj2();

let trafoj = 0;
for ( let i = 0; i < DOKOJ.length; i++ ) {
  const D = DOKOJ[ i ];
  const r = D.rotacio ?? 0;
  const kos = Math.cos(r), sin = Math.sin(r);
// ⟨ ſɭᴜ ſןᴜ , ſןw ſɭᴜƴ , ſɭᴜ ſןᴜ , 📃 ⟩
  const landaZ = D.profundo / 2 - VOJA_TRUA_DUONO;
  const hx = DOKO_PLATFORMA_SEFINI / 2 + DOKO_JOQA_SEFINI;
  const loka = ( x: number, z: number ) => ( {
    lx: ( x - D.x ) * kos - ( z - D.z ) * sin,
    lz: ( x - D.x ) * sin + ( z - D.z ) * kos } );
  let ene = 0, plejProksima = Infinity, raqa = "", plejLz = 0;
  for ( const k of mondo.haveb6kek ) {
    const { lx, lz } = loka(k.x, k.z);
    if ( Math.abs(lx) <= hx && lz <= landaZ + 0.05 && lz >= -D.profundo / 2 ) ene++;
    const d = Math.hypot(k.x - D.x, k.z - D.z);
    if ( d < plejProksima ) { plejProksima = d; raqa = `${k.x.toFixed(1)},${k.z.toFixed(1)}`; plejLz = lz; }
  }
// ⟨ ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ⟅ ꞙɭɿ , ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
  const landX = D.x + sin * ( D.profundo / 2 );
  const landZ = D.z + kos * ( D.profundo / 2 );
// ⟨ ſɭᴜ ſןᴜ , ſɭᴜ ſןᴜ , 📏 ⟩ , j͑ʃᴜ ſɭ,w ,
// j͑ʃᴜ ſɭ,w , ſɭᴜ ſןᴜ , ſןɔ˞ᴜƴ , 📃 ⟩
// ſɟᴜ ſןᴜ ɭʃэ , ꞙɭı , 📃 ⟩
  const dok = vepaqQakaj2n(mondo.qena, D.x, D.z, r, mondo.k6h6Alteco,
    akvaVem2, D.profundo, alteco);
  const pa12 = qakaj2AltoCxe(landX, landZ) ?? mondo.pa12Cxe(landX, landZ);
  trafoj += ene;
  console.log(`ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ${i} @(${D.x.toFixed(1)},${D.z.toFixed(1)}) ｡ ſɭэ }ʃᴜ ${D.profundo.toFixed(2)}` +
    ` ｡ j͑ʃɔ ſȷꞇ }ʃꞇ ${DOKO_PLATFORMA_SEFINI.toFixed(2)} ｡ ſɭᴜc̗ ɭʃɜ ${( r * 180 / Math.PI ).toFixed(1)}°`);
  console.log(`  ｡ ſןᴜ ſᶘɹ ʌ ſᶘɹ ſɭɔ ${plejProksima.toFixed(2)} @${raqa} ｡ ɭl̀ᴜ ʌ ſɭᴜc̗ ɭʃɜ ${plejLz.toFixed(2)}` +
    ` ｡ ſןw ſɭᴜƴ ʌ j͑ʃп́ꞇ ${landaZ.toFixed(2)} ｡ ſןᴜ ſᶘɹ ʌ j͑ʃ'ᴜ j͑ʃꞇ ${ene}` +
    ( ene ? "  ſ̀ȷᴜ̩ ſɭɹ }ʃꞇ" : "" ) );
  console.log(`  ｡ j͑ʃ'ᴜ j͑ʃꞇ ${dok.landejaY.toFixed(2)} ｡ ſןᴜ ſᶘɹ ${pa12.toFixed(2)}` +
    ` ｡ j͐ʃᴜɔ˞ ${( pa12 - dok.landejaY ).toFixed(2)}` +
    ` ｡ ſɟᴜ ſןᴜ ɭʃэ ${dok.stuparajPunktoj.length} ｡ }ʃɹƽ` +
    ` ｡ ſɭɜc̗ ɭʃɜ ʌ j͑ʃɔ ſȷꞇ }ʃꞇ ʌ ſןᴜ ſᶘɹ ${VOJA_EKSTERA_DUONO.toFixed(2)} / j͑ʃ'ᴜ j͑ʃꞇ ${hx.toFixed(2)}` +
    ` ｡ ſןᴜ ſᶘɹ ɭl̀w ſȷw ${VOJA_TRUA_DUONO.toFixed(2)}` );
}
console.log(`ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ʌ ſɭɹ ſᶘɔ ${DOKOJ.length} ｡ ſןᴜ ſᶘɹ ʌ j͑ʃ'ᴜ j͑ʃꞇ ${trafoj}` +
  ( trafoj ? "  ſ̀ȷᴜ̩ ſɭɹ }ʃꞇ" : "" ));
