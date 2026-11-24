// ≺⧼ ſןᴜ ſᶘɹ j͑ʃᴜꞇ ʌ j͑ʃ'ɔ ŋᷠɹ ʌ ſɭэ ֭ſɭэ j͑ʃᴜꞇ ʌ j͑ʃ'ɔ ŋᷠɹ 🔬 ⧽≻
// ⟨ ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , 📃 ⟩ , ſɭᴜ ſןᴜ , ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
// ſɭᴜ ſןᴜ , ſɭᴜ ſןᴜ , ꞙɭɿ , ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ , ꞙɭı ,
// ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w , ꞙɭɿ , 📃 ⟩
//
// ſɭэ ɭʃᴜ , ⟅
//   node iloj/mezurilo/vepaqu.mjs pa12-kontrol
//   node --import ./iloj/mezurilo/falsdomo.mjs iloj/mezurilo/pa12-kontrol.mjs
import { kf2Brakojn, kunigaPlataAlto } from "../../eskekoj/medio/hak6h6/hapa12.js";
import { VOJA_TRUA_DUONO } from "../../eskekoj/medio/hak6h6/havecax2l.js";
import { kf2MezuranMondon, punktoCxe } from "./komunaj.js";

const mondo = kf2MezuranMondon();
const mapoj = mondo.mapoj;

// ⟪ ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭɿ , 📏 ⟫
let rompoj = 0, provitaj = 0;
let plejGranda = 0, plejLoko = "";
for ( const k of mondo.haveb6kek ) {
  const ca3aq = k.x + "," + k.z;
  const knece = kf2Brakojn(mapoj.hac2w2q.get(ca3aq) ?? [], mapoj.fermitaj.get(ca3aq),
    mapoj.rotacioj.get(ca3aq) ?? 0, mapoj.hap2somani.get(ca3aq));
  const pa12 = kunigaPlataAlto(k.x, k.z, knece, mondo.k6h6Alteco);
  const linioj: string[] = [];
  for ( let i = 0; i < mondo.hak6h6.length; i++ ) {
// ⟨ ſɭэ ֭ſɭэ , ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩ , ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
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
    const dif = l6da - pa12;
    if ( Math.abs(dif) > plejGranda ) { plejGranda = Math.abs(dif); plejLoko = `${k.x},${k.z}`; }
    if ( Math.abs(dif) > 0o1/0o1000 ) rompoj++;
    linioj.push(`ſɭэ ֭ſɭэ ${i} ｡ ֭ſɭэ ſɭw }ʃꞇ ${plej.toFixed(2)} ｡ j͑ʃ'ɔ ŋᷠɹ ${l6da.toFixed(2)}` +
      ( Math.abs(dif) > 0o1/0o1000 ? ` ｡ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ${dif.toFixed(2)}` : "" ));
  }
  console.log(`｡ ſןᴜ ſᶘɹ ${k.x.toFixed(1)},${k.z.toFixed(1)} ｡ j͑ʃ'ɔ ŋᷠɹ ${pa12.toFixed(2)}` +
    ( linioj.length ? ` | ${linioj.join(" | ")}` : " | ſןɔ ʌ ſɭэ ֭ſɭэ" ));
}
console.log(`ſɟɹƽ ʌ j͑ʃ'ɔ ŋᷠɹ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ${rompoj} / ${provitaj} ｡ j͑ʃ'ɔ ŋᷠɹ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ɭl̀ᴜ ${plejGranda.toFixed(2)} @${plejLoko}` +
  ( rompoj > 0 ? "  ſ̀ȷᴜ̩ ſɭɹ }ʃꞇ" : "" ));
