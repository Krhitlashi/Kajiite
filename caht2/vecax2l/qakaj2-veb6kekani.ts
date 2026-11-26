// ≺⧼ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ⰱ ʃэ ſɭɔ ſɭᴜ }ʃꞇ 🧪 ⧽≻

import "./ceh2kap2.mjs";
import { tikHaqakaj2 } from "../../kanta/mut6q-havop2/tlohk2nikziisai.js";
import { l6da, tsasaVem2 } from "../../kanta/nala/mut6qSoza.js";
import { vepaqQakaj2n } from "../../skek2/qatsiike/qakaj2.js";
import { qakaj2L6daJe } from "../../skek2/qatsiike/hak6h6/veb6kek-havem2.js";
import { HAQAKAJ2OQASEFINI, QAKAJ2KOZUNUASEFINI } from "../../skek2/qatsiike/qakaj2/hahunaq.js";
import { K6H6AEKSTERAP2SOMANI, K6H6ATRUAP2SOMANI } from "../../skek2/qatsiike/hak6h6/havecax2l.js";
import { kf2Vecax2lanNala } from "./p6kpu.js";

const nala = kf2Vecax2lanNala(false);
const HAQAKAJ2 = tikHaqakaj2();

let haxes2waz = 0o0;
for ( let i = 0o0; i < HAQAKAJ2.length; i++ ) {
  const D = HAQAKAJ2[ i ];
  const r = D.s2sabo ?? 0o0;
  const kos = Math.cos(r), sin = Math.sin(r);

  const landaZ = D.jufu / 0o2 - K6H6ATRUAP2SOMANI;
  const hx = QAKAJ2KOZUNUASEFINI / 0o2 + HAQAKAJ2OQASEFINI;
  const qar = ( x: number, z: number ) => ( {
    lx: ( x - D.x ) * kos - ( z - D.z ) * sin,
    lz: ( x - D.x ) * sin + ( z - D.z ) * kos } );
  let ene = 0o0, kmaTsiike = Infinity, raqa = "", kmaLz = 0o0;
  for ( const k of nala.haveb6kek ) {
    const { lx, lz } = qar(k.x, k.z);
    if ( Math.abs(lx) <= hx && lz <= landaZ + 0.05 && lz >= -D.jufu / 0o2 ) ene++;
    const d = Math.hypot(k.x - D.x, k.z - D.z);
    if ( d < kmaTsiike ) { kmaTsiike = d; raqa = `${k.x.toFixed(0o1)},${k.z.toFixed(0o1)}`; kmaLz = lz; }
  }

  const landX = D.x + sin * ( D.jufu / 0o2 );
  const landZ = D.z + kos * ( D.jufu / 0o2 );

  const dok = vepaqQakaj2n(nala.qena, D.x, D.z, r, nala.k6h6L6da,
    tsasaVem2, D.jufu, l6da);
  const b6qaiQafej2 = qakaj2L6daJe(landX, landZ) ?? nala.pa12Je(landX, landZ);
  haxes2waz += ene;
  console.log(`ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ${i} @(${D.x.toFixed(0o1)},${D.z.toFixed(0o1)}) ｡ ſɭэ }ʃᴜ ${D.jufu.toFixed(0o2)}` +
    ` ｡ j͑ʃɔ ſȷꞇ }ʃꞇ ${QAKAJ2KOZUNUASEFINI.toFixed(0o2)} ｡ ſɭᴜc̗ ɭʃɜ ${( r * 0o264 / Math.PI ).toFixed(0o1)}°`);
  console.log(`  ｡ ſןᴜ ſᶘɹ ʌ ſᶘɹ ſɭɔ ${kmaTsiike.toFixed(0o2)} @${raqa} ｡ ɭl̀ᴜ ʌ ſɭᴜc̗ ɭʃɜ ${kmaLz.toFixed(0o2)}` +
    ` ｡ ſןw ſɭᴜƴ ʌ j͑ʃп́ꞇ ${landaZ.toFixed(0o2)} ｡ ſןᴜ ſᶘɹ ʌ ɽ͑ʃ'ᴜ ſ͕ɭᴜ ${ene}` +
    ( ene ? "  ſ̀ȷᴜ̩ ſɭɹ }ʃꞇ" : "" ) );
  console.log(`  ｡ ɽ͑ʃ'ᴜ ſ͕ɭᴜ ${dok.landejaY.toFixed(0o2)} ｡ ſןᴜ ſᶘɹ ${b6qaiQafej2.toFixed(0o2)}` +
    ` ｡ j͐ʃᴜɔ˞ ${( b6qaiQafej2 - dok.landejaY ).toFixed(0o2)}` +
    ` ｡ ſɟᴜ ſןᴜ ɭʃэ ${dok.capat6aN2kj.length} ｡ }ʃɹƽ` +
    ` ｡ ſɭɜc̗ ɭʃɜ ʌ j͑ʃɔ ſȷꞇ }ʃꞇ ʌ ſןᴜ ſᶘɹ ${K6H6AEKSTERAP2SOMANI.toFixed(0o2)} / ɽ͑ʃ'ᴜ ſ͕ɭᴜ ${hx.toFixed(0o2)}` +
    ` ｡ ſןᴜ ſᶘɹ ɭl̀w ſȷw ${K6H6ATRUAP2SOMANI.toFixed(0o2)}` );
}
console.log(`ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ʌ ſɭɹ ſᶘɔ ${HAQAKAJ2.length} ｡ ſןᴜ ſᶘɹ ʌ ɽ͑ʃ'ᴜ ſ͕ɭᴜ ${haxes2waz}` +
  ( haxes2waz ? "  ſ̀ȷᴜ̩ ſɭɹ }ʃꞇ" : "" ));
