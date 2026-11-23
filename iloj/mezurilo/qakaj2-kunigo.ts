// ≺⧼ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ʌ j͑ʃᴜ ſɟɹƽ ꞁȷ̀ᴜ }ʃꞇ ʌ ſןᴜ ſᶘɹ 🚢 ⧽≻
// ⟨ ចំណតមិនត្រូវជាន់លើចានភ្ជាប់ ៖ វេទិកាចំណតឈប់ត្រង់គែមចាន , ហើយចានបំពេញ
// ចន្លោះរហូតដល់មាត់ដី ។ បើវេទិកាលាតក្រោមចាន , ផ្ទៃពីរជាន់គ្នា ។ 📃 ⟩
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
  // ⟨ គែមវេទិកាខាងដី ៖ ចាប់ពីគែមចានភ្ជាប់ ។ 📃 ⟩
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
  // ⟨ កម្ពស់វេទិកា និងកម្ពស់ចាន ៖ បើខុសគ្នា , ចានលេចចេញពីវេទិកា ។ 📃 ⟩
  const landX = D.x + sin * ( D.profundo / 2 );
  const landZ = D.z + kos * ( D.profundo / 2 );
  // ⟨ សាងចំណតពិត 📏 ⟩ ៖ វាចុះឈ្មោះកម្រិតដែលចានភ្ជាប់ត្រូវយក ហើយ
  // ត្រឡប់កម្ពស់វេទិកាទាប និងចំណុចជណ្តើរ ។ វេទិកាលែងស្មើចានទៀតទេ ,
  // ព្រោះជណ្តើរភ្ជាប់គ្នា ។ 📃 ⟩
  const dok = vepaqQakaj2n(mondo.qena, D.x, D.z, r, mondo.k6h6Alteco,
    akvaVem2, D.profundo, alteco);
  const pa12 = qakaj2AltoCxe(landX, landZ) ?? mondo.pa12Cxe(landX, landZ);
  trafoj += ene;
  console.log(`ចំណត ${i} @(${D.x.toFixed(1)},${D.z.toFixed(1)}) ប្រវែង ${D.profundo.toFixed(2)}` +
    ` ទទឹង ${DOKO_PLATFORMA_SEFINI.toFixed(2)} មុំ ${( r * 180 / Math.PI ).toFixed(1)}°`);
  console.log(`  ចានជិត ${plejProksima.toFixed(2)} @${raqa} លើអ័ក្ស ${plejLz.toFixed(2)}` +
    ` , គែមវេទិកា ${landaZ.toFixed(2)} , ចានក្នុងវេទិកា ${ene}` +
    ( ene ? "  ſ̀ȷᴜ̩ ſɭɹ }ʃꞇ" : "" ) );
  console.log(`  វេទិកា ${dok.landejaY.toFixed(2)} ចាន ${pa12.toFixed(2)}` +
    ` ចុះ ${( pa12 - dok.landejaY ).toFixed(2)}` +
    ` , ជណ្តើរ ${dok.stuparajPunktoj.length} ចំណុច` +
    ` , កន្លះទទឹងចាន ${VOJA_EKSTERA_DUONO.toFixed(2)} / វេទិកា ${hx.toFixed(2)}` +
    ` , ចានជ្រៅ ${VOJA_TRUA_DUONO.toFixed(2)}` );
}
console.log(`ចំណតសរុប ${DOKOJ.length} , ចានក្នុងវេទិកា ${trafoj}` +
  ( trafoj ? "  ſ̀ȷᴜ̩ ſɭɹ }ʃꞇ" : "" ));
