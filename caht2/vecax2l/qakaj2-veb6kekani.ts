// ≺⧼ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ʌ j͑ʃᴜ ſɟɹƽ ꞁȷ̀ᴜ }ʃꞇ ʌ ſןᴜ ſᶘɹ 🚢 ⧽≻
// ⟨ ſɭᴜ ſןᴜ , ſɭᴜ ſןᴜ , ſןw ſɭᴜƴ , ꞙɭɔ , ⟅ ſɭᴜ ſןᴜ ,
// ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı , ꞙɭɿ , 📃 ⟩
import "./ceh2kap2.mjs";
import { tikHaqakaj2 } from "../../kanta/t6lima-havop2/tlohk2nikziisai.js";
import { l6da, tsasaVem2 } from "../../kanta/nala/t6limaSoza.js";
import { vepaqQakaj2n } from "../../skek2/qatsiike/qakaj2.js";
import { qakaj2L6daJe } from "../../skek2/qatsiike/hak6h6/veb6kek-havem2.js";
import { HAQAKAJ2OQASEFINI, QAKAJ2KOZUNUASEFINI } from "../../skek2/qatsiike/qakaj2/hahunaq.js";
import { K6H6AEKSTERAP2SOMANI, K6H6ATRUAP2SOMANI } from "../../skek2/qatsiike/hak6h6/havecax2l.js";
import { kf2Vecax2lanNala } from "./x2x2q.js";

const nala = kf2Vecax2lanNala(false);
const HAQAKAJ2 = tikHaqakaj2();

let haxes2waz = 0;
for ( let i = 0; i < HAQAKAJ2.length; i++ ) {
  const D = HAQAKAJ2[ i ];
  const r = D.s2sabo ?? 0;
  const kos = Math.cos(r), sin = Math.sin(r);
// ⟨ ſɭᴜ ſןᴜ , ſןw ſɭᴜƴ , ſɭᴜ ſןᴜ , 📃 ⟩
  const landaZ = D.jufu / 2 - K6H6ATRUAP2SOMANI;
  const hx = QAKAJ2KOZUNUASEFINI / 2 + HAQAKAJ2OQASEFINI;
  const qar = ( x: number, z: number ) => ( {
    lx: ( x - D.x ) * kos - ( z - D.z ) * sin,
    lz: ( x - D.x ) * sin + ( z - D.z ) * kos } );
  let ene = 0, kmaTsiike = Infinity, raqa = "", kmaLz = 0;
  for ( const k of nala.haveb6kek ) {
    const { lx, lz } = qar(k.x, k.z);
    if ( Math.abs(lx) <= hx && lz <= landaZ + 0.05 && lz >= -D.jufu / 2 ) ene++;
    const d = Math.hypot(k.x - D.x, k.z - D.z);
    if ( d < kmaTsiike ) { kmaTsiike = d; raqa = `${k.x.toFixed(1)},${k.z.toFixed(1)}`; kmaLz = lz; }
  }
// ⟨ ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ⟅ ꞙɭɿ , ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
  const landX = D.x + sin * ( D.jufu / 2 );
  const landZ = D.z + kos * ( D.jufu / 2 );
// ⟨ ſɭᴜ ſןᴜ , ſɭᴜ ſןᴜ , 📏 ⟩ , j͑ʃᴜ ſɭ,w ,
// j͑ʃᴜ ſɭ,w , ſɭᴜ ſןᴜ , ſןɔ˞ᴜƴ , 📃 ⟩
// ſɟᴜ ſןᴜ ɭʃэ , ꞙɭı , 📃 ⟩
  const dok = vepaqQakaj2n(nala.qena, D.x, D.z, r, nala.k6h6L6da,
    tsasaVem2, D.jufu, l6da);
  const b6qaiQafej2 = qakaj2L6daJe(landX, landZ) ?? nala.pa12Je(landX, landZ);
  haxes2waz += ene;
  console.log(`ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ${i} @(${D.x.toFixed(1)},${D.z.toFixed(1)}) ｡ ſɭэ }ʃᴜ ${D.jufu.toFixed(2)}` +
    ` ｡ j͑ʃɔ ſȷꞇ }ʃꞇ ${QAKAJ2KOZUNUASEFINI.toFixed(2)} ｡ ſɭᴜc̗ ɭʃɜ ${( r * 180 / Math.PI ).toFixed(1)}°`);
  console.log(`  ｡ ſןᴜ ſᶘɹ ʌ ſᶘɹ ſɭɔ ${kmaTsiike.toFixed(2)} @${raqa} ｡ ɭl̀ᴜ ʌ ſɭᴜc̗ ɭʃɜ ${kmaLz.toFixed(2)}` +
    ` ｡ ſןw ſɭᴜƴ ʌ j͑ʃп́ꞇ ${landaZ.toFixed(2)} ｡ ſןᴜ ſᶘɹ ʌ j͑ʃ'ᴜ j͑ʃꞇ ${ene}` +
    ( ene ? "  ſ̀ȷᴜ̩ ſɭɹ }ʃꞇ" : "" ) );
  console.log(`  ｡ j͑ʃ'ᴜ j͑ʃꞇ ${dok.landejaY.toFixed(2)} ｡ ſןᴜ ſᶘɹ ${b6qaiQafej2.toFixed(2)}` +
    ` ｡ j͐ʃᴜɔ˞ ${( b6qaiQafej2 - dok.landejaY ).toFixed(2)}` +
    ` ｡ ſɟᴜ ſןᴜ ɭʃэ ${dok.capat6aN2kj.length} ｡ }ʃɹƽ` +
    ` ｡ ſɭɜc̗ ɭʃɜ ʌ j͑ʃɔ ſȷꞇ }ʃꞇ ʌ ſןᴜ ſᶘɹ ${K6H6AEKSTERAP2SOMANI.toFixed(2)} / j͑ʃ'ᴜ j͑ʃꞇ ${hx.toFixed(2)}` +
    ` ｡ ſןᴜ ſᶘɹ ɭl̀w ſȷw ${K6H6ATRUAP2SOMANI.toFixed(2)}` );
}
console.log(`ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ʌ ſɭɹ ſᶘɔ ${HAQAKAJ2.length} ｡ ſןᴜ ſᶘɹ ʌ j͑ʃ'ᴜ j͑ʃꞇ ${haxes2waz}` +
  ( haxes2waz ? "  ſ̀ȷᴜ̩ ſɭɹ }ʃꞇ" : "" ));
