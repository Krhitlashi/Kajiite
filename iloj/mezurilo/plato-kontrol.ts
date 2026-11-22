// ≺⧼ កម្រិតចានភ្ជាប់ និងកម្រិតផ្លូវ 🔬 ⧽≻
// ⟨ ហេតុអ្វីត្រូវវាស់ 📃 ⟩ ៖ ចានភ្ជាប់គួរឈរនៅកម្រិតតែមួយនឹងផ្លូវដែលមកដល់ ។
// បើវាគណនាកម្រិតដោយឡែក , មាត់ចានលោតឬធ្លាក់ , ហើយឃើញជាជញ្ជាំង ។
// ស្គ្រីបនេះប្រៀបធៀបកម្រិតចាននឹងកម្រិតផ្លូវនៅចំណុចភ្ជាប់នីមួយៗ ។ 📃 ⟩
//
// ការប្រើ ៖
//   node iloj/mezurilo/konstruu.mjs plato-kontrol
//   node --import ./iloj/mezurilo/falsdomo.mjs iloj/mezurilo/plato-kontrol.mjs
import { kreiBrakojn, kunigaPlataAlto } from "../../eskekoj/medio/vojoj/platoj.js";
import { VOJA_TRUA_DUONO } from "../../eskekoj/medio/vojoj/mezuroj.js";
import { kreiMezuranMondon, punktoCxe } from "./komunaj.js";

const mondo = kreiMezuranMondon();
const mapoj = mondo.mapoj;

// ⟪ ការប្រៀបធៀបតាមចំណុចភ្ជាប់ 📏 ⟫
let rompoj = 0, provitaj = 0;
let plejGranda = 0, plejLoko = "";
for ( const k of mondo.kunigoj ) {
  const ca3aq = k.x + "," + k.z;
  const knece = kreiBrakojn(mapoj.hac2w2q.get(ca3aq) ?? [], mapoj.fermitaj.get(ca3aq),
    mapoj.rotacioj.get(ca3aq) ?? 0, mapoj.hap2somani.get(ca3aq));
  const plato = kunigaPlataAlto(k.x, k.z, knece, mondo.vojoAlteco);
  const linioj: string[] = [];
  for ( let i = 0; i < mondo.vojoj.length; i++ ) {
    // ⟨ ចំណុចផ្លូវជិតបំផុតនឹងចាន 📃 ⟩ ៖ កម្រិតផ្លូវត្រូវអាននៅទីនោះ ។
    const s2qena = mondo.profiloDe(i);
    let plej = Infinity, plejS = 0;
    for ( let s = 0; s <= s2qena.sahakani; s += 0o1/0o10 ) {
      const p = punktoCxe(mondo.gluitaj[ i ], s);
      const d = Math.hypot(p.x - k.x, p.z - k.z);
      if ( d < plej ) { plej = d; plejS = s; }
    }
    if ( plej > VOJA_TRUA_DUONO + 0o1/0o4 ) continue;
    provitaj++;
    const l6da = s2qena.altoCxe(plejS);
    const dif = l6da - plato;
    if ( Math.abs(dif) > plejGranda ) { plejGranda = Math.abs(dif); plejLoko = `${k.x},${k.z}`; }
    if ( Math.abs(dif) > 0o1/0o1000 ) rompoj++;
    linioj.push(`ផ្លូវ${i} ចម្ងាយ${plej.toFixed(2)} កម្រិត${l6da.toFixed(2)}` +
      ( Math.abs(dif) > 0o1/0o1000 ? ` ខុស${dif.toFixed(2)}` : "" ));
  }
  console.log(`ចាន ${k.x.toFixed(1)},${k.z.toFixed(1)} កម្រិត ${plato.toFixed(2)}` +
    ( linioj.length ? ` | ${linioj.join(" | ")}` : " | គ្មានផ្លូវ" ));
}
console.log(`ចានភ្ជាប់ដែលខុសកម្រិត ${rompoj} / ${provitaj} , ខុសខ្ពស់បំផុត ${plejGranda.toFixed(2)} @${plejLoko}` +
  ( rompoj > 0 ? "  ſ̀ȷᴜ̩ ſɭɹ }ʃꞇ" : "" ));
