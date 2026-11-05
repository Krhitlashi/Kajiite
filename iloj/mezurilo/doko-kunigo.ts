// ≺⧼ ចំណត និង ចានភ្ជាប់ 🚢 ⧽≻
// ⟨ ចំណតមិនត្រូវជាន់លើចានភ្ជាប់ ៖ វេទិកាចំណតឈប់ត្រង់គែមចាន , ហើយចានបំពេញ
// ចន្លោះរហូតដល់មាត់ដី ។ បើវេទិកាលាតក្រោមចាន , ផ្ទៃពីរជាន់គ្នា ។ 📃 ⟩
import "./falsdomo.mjs";
import { aktivajDokoj } from "../../kantaoj/tero-datumaro/rultempo.js";
import { alteco, akvaNivelo } from "../../kantaoj/mondo/tereno.js";
import { konstruiDokon } from "../../eskekoj/medio/doko.js";
import { dokaAltoCxe } from "../../eskekoj/medio/vojoj/kunig-niveloj.js";
import { DOKO_KADRA_LARĜO, DOKO_PLATFORMA_LARĜO } from "../../eskekoj/medio/doko/tipoj.js";
import { VOJA_DIKECO, VOJA_EKSTERA_DUONO, VOJA_SUPRO_LEVIGXO, VOJA_TRUA_DUONO,
  surGrid } from "../../eskekoj/medio/vojoj/mezuroj.js";
import { kreiMezuranMondon } from "./komunaj.js";

const mondo = kreiMezuranMondon(false);
const DOKOJ = aktivajDokoj();

let trafoj = 0;
for ( let i = 0; i < DOKOJ.length; i++ ) {
  const D = DOKOJ[ i ];
  const r = D.rotacio ?? 0;
  const kos = Math.cos(r), sin = Math.sin(r);
  // ⟨ គែមវេទិកាខាងដី ៖ ចាប់ពីគែមចានភ្ជាប់ ។ 📃 ⟩
  const landaZ = D.profundo / 2 - VOJA_TRUA_DUONO;
  const hx = DOKO_PLATFORMA_LARĜO / 2 + DOKO_KADRA_LARĜO;
  const loka = ( x: number, z: number ) => ( {
    lx: ( x - D.x ) * kos - ( z - D.z ) * sin,
    lz: ( x - D.x ) * sin + ( z - D.z ) * kos } );
  let ene = 0, plejProksima = Infinity, loko = "", plejLz = 0;
  for ( const k of mondo.kunigoj ) {
    const { lx, lz } = loka(k.x, k.z);
    if ( Math.abs(lx) <= hx && lz <= landaZ + 0.05 && lz >= -D.profundo / 2 ) ene++;
    const d = Math.hypot(k.x - D.x, k.z - D.z);
    if ( d < plejProksima ) { plejProksima = d; loko = `${k.x.toFixed(1)},${k.z.toFixed(1)}`; plejLz = lz; }
  }
  // ⟨ កម្ពស់វេទិកា និងកម្ពស់ចាន ៖ បើខុសគ្នា , ចានលេចចេញពីវេទិកា ។ 📃 ⟩
  const landX = D.x + sin * ( D.profundo / 2 );
  const landZ = D.z + kos * ( D.profundo / 2 );
  // ⟨ សាងចំណតពិត 📏 ⟩ ៖ វាចុះឈ្មោះកម្រិតដែលចានភ្ជាប់ត្រូវយក ។ បើ
  // ឧបករណ៍គ្រាន់តែគណនាពីវាល , វារាយការចន្លោះចាស់ដែលលែងមានហើយ ។ 📃 ⟩
  konstruiDokon(mondo.sceno, D.x, D.z, r, mondo.vojoAlteco, akvaNivelo, D.profundo, alteco);
  let vojaY = mondo.vojoAlteco(landX, landZ);
  for ( const ofseto of [ -0.75, 0, 0.75 ] )
    vojaY = Math.max(vojaY, mondo.vojoAlteco(landX + kos * ofseto, landZ - sin * ofseto));
  vojaY = surGrid(vojaY + VOJA_SUPRO_LEVIGXO) - VOJA_SUPRO_LEVIGXO;
  const plato = dokaAltoCxe(landX, landZ) ?? mondo.platoCxe(landX, landZ);
  trafoj += ene;
  console.log(`ចំណត ${i} @(${D.x.toFixed(1)},${D.z.toFixed(1)}) ប្រវែង ${D.profundo.toFixed(2)}` +
    ` ទទឹង ${DOKO_PLATFORMA_LARĜO.toFixed(2)} មុំ ${( r * 180 / Math.PI ).toFixed(1)}°`);
  console.log(`  ចានជិត ${plejProksima.toFixed(2)} @${loko} លើអ័ក្ស ${plejLz.toFixed(2)}` +
    ` , គែមវេទិកា ${landaZ.toFixed(2)} , ចានក្នុងវេទិកា ${ene}` +
    ( ene ? "  ſ̀ȷᴜ̩ ſɭɹ }ʃꞇ" : "" ) );
  console.log(`  វេទិកា ${( vojaY + VOJA_DIKECO ).toFixed(2)} ចាន ${plato.toFixed(2)}` +
    ` ខុស ${( plato - vojaY - VOJA_DIKECO ).toFixed(2)}` +
    ` , កន្លះទទឹងចាន ${VOJA_EKSTERA_DUONO.toFixed(2)} / វេទិកា ${hx.toFixed(2)}` +
    ` , ចានជ្រៅ ${VOJA_TRUA_DUONO.toFixed(2)}` );
}
console.log(`ចំណតសរុប ${DOKOJ.length} , ចានក្នុងវេទិកា ${trafoj}` +
  ( trafoj ? "  ſ̀ȷᴜ̩ ſɭɹ }ʃꞇ" : "" ));
