// ≺⧼ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ j͑ʃᴜꞇ ʌ ſɟᴜ ſןᴜ ɭʃэ ʌ j͑ʃᴜ ſɟɹƽ ꞁȷ̀ᴜ }ʃꞇ ʌ ſןᴜ ſᶘɹ 🔬 ⧽≻
// ⟨ ſɟᴜ ſןᴜ ɭʃэ , ſɭᴜ ſןᴜ , ſɭэ ɭʃᴜ , ⟅ ſןɔ˞ᴜƴ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
// ſɟᴜ ſןᴜ ɭʃэ , ſɭᴜ ſןᴜ , ꞙɭɿ , ſɭᴜ ſןᴜ , ֭ſɭэ ſɭэ , ꞙɭı ,
// ſןɔ˞ᴜƴ , ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
import * as THREE from "three";
import { tikHak6h6, tikHaqakaj2 } from "../../kanta/t6lima-havop2/tlohk2nikziisai.js";
import { l6da, tsasaVem2 } from "../../kanta/nala/t6limaSoza.js";
import { troviK6h6RetajnHaveb6kekn } from "../../skek2/qatsiike/k6h6-caxlefkakai.js";
import { gluiK6h6tlakakn } from "../../skek2/qatsiike/hak6h6/scac6.js";
import { kf2K6h6L6dan } from "../../skek2/qatsiike/hak6h6/l6da.js";
import { k6h6TeruDeVeb6kek } from "../../skek2/qatsiike/hak6h6/haqoxa.js";
import { K6H6AEKSTERAP2SOMANI, K6H6AKMARL6DA,
  K6H6ATRUAP2SOMANI, k6h6SefiniP2somani } from "../../skek2/qatsiike/hak6h6/havecax2l.js";
import { vepaqQakaj2n } from "../../skek2/qatsiike/qakaj2.js";
import { kf2Qakaj2nStuparon } from "../../skek2/qatsiike/qakaj2/hatona.js";
import { qakaj2L6daJe } from "../../skek2/qatsiike/hak6h6/veb6kek-havem2.js";
import type { K6h6N2k } from "../../skek2/qatsiike/k6h6-caxlefkakai/hahunaq.js";

const qena = new THREE.Scene();
const HAKAS2KANTA = tikHak6h6().filter(v => v.n2k.length >= 2);
const HAQAKAJ2 = tikHaqakaj2();
const hat6lima = HAQAKAJ2.map(d => {
  const r = d.s2sabo ?? 0;
  return [ d.x + Math.sin(r) * ( d.jufu / 2 ), d.z + Math.cos(r) * ( d.jufu / 2 ) ] as K6h6N2k;
});
const ne3ak2 = troviK6h6RetajnHaveb6kekn(
  HAKAS2KANTA.map(v => ( { n2k: v.n2k, sefini: v.sefini } )), HAQAKAJ2);
const hascac6 = HAKAS2KANTA.map((v, i) => gluiK6h6tlakakn(v.n2k,
  ne3ak2.map(k => [ k.x, k.z ] as K6h6N2k),
  hat6lima.map(p => ( { x: p[0], z: p[1] } )),
  HAKAS2KANTA.filter(( _, j) => j !== i).map(o => o.n2k)));
const haveb6kek = troviK6h6RetajnHaveb6kekn(
  HAKAS2KANTA.map((v, i) => ( { n2k: hascac6[i], sefini: v.sefini } )), HAQAKAJ2);
const k6h6L6da = kf2K6h6L6dan(l6da, haveb6kek);

function tsiike( x: number, z: number, plosteqM: number ) {
  let plosteq = Infinity, p: typeof haveb6kek[number] | null = null;
  for ( const k of haveb6kek ) {
    const d = Math.hypot(k.x - x, k.z - z);
    if ( d < plosteq ) { plosteq = d; p = k; }
  }
  return plosteq < plosteq ? p : null;
}
function finL6da( x: number, z: number, sefini: number ): number {
  const k = tsiike(x, z, K6H6ATRUAP2SOMANI);
  if ( k ) return k6h6TeruDeVeb6kek(k.x, k.z, k.c2w2qa, K6H6AEKSTERAP2SOMANI, k6h6L6da).hateru;
  const p2somani = k6h6SefiniP2somani( sefini );
  let maks = k6h6L6da(x, z);
  for ( let i = 0; i < 0o10; i++ ) {
    const ang = i * Math.PI / 4;
    maks = Math.max(maks, k6h6L6da(x + Math.cos(ang) * p2somani, z + Math.sin(ang) * p2somani));
  }
  return maks + K6H6AKMARL6DA;
}

for ( let i = 0; i < HAQAKAJ2.length; i++ ) {
  const d = HAQAKAJ2[i];
  const r = d.s2sabo ?? 0;
// ⟨ ſɭᴜ ſןᴜ , ſɭэ ſɭ,w , 📃 ⟩
  const qakaj2 = vepaqQakaj2n(qena, d.x, d.z, r, k6h6L6da, tsasaVem2, d.jufu, l6da);
  if ( qakaj2.capat6aN2kj.length < 2 ) {
    console.log(`  ｡ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ${i} ｡ ſןɔ ʌ ſɟᴜ ſןᴜ ɭʃэ ｡ j͑ʃ'ᴜ j͑ʃꞇ ${qakaj2.kozunuY.toFixed(2)} ｡ ᶅſэ ſ͕ɭᴜ ʌ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ${qakaj2.landejaY.toFixed(2)}`);
    continue;
  }
  const landaX = d.x + Math.sin(r) * ( d.jufu / 2 );
  const landaZ = d.z + Math.cos(r) * ( d.jufu / 2 );
  const sefini = qakaj2.kozunuSefini;
// ⟨ ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı , 📏 ⟩
  const starto = qakaj2L6daJe(landaX, landaZ) ?? finL6da(landaX, landaZ, sefini);
// ⟨ ſɟᴜ ſןᴜ ɭʃэ , ſɭэ ɭʃᴜ , ſɭᴜ ſןᴜ , 📃 ⟩
  const veb6kek = tsiike(landaX, landaZ, K6H6ATRUAP2SOMANI);
  let saxeni = qakaj2.capat6aN2kj[0];
  const tlakakani = qakaj2.capat6aN2kj[1];
  if ( veb6kek ) {
    const dx = tlakakani[0] - veb6kek.x, dz = tlakakani[1] - veb6kek.z;
    const sahakani = Math.hypot(dx, dz);
    if ( sahakani > K6H6ATRUAP2SOMANI )
      saxeni = [ veb6kek.x + dx * K6H6ATRUAP2SOMANI / sahakani, veb6kek.z + dz * K6H6ATRUAP2SOMANI / sahakani ];
  }
// ⟨ ı],ᴜ ֭ſɭᴜ , ſןɔ˞ᴜƴ , ꞙɭı , 📏 ⟩
  const capat6 = kf2Qakaj2nStuparon(saxeni, tlakakani, starto, qakaj2.landejaY);
  if ( !capat6 ) {
    console.log(`  ｡ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ${i} ｡ ſןɔ ʌ ſɟᴜ ſןᴜ ɭʃэ ｡ j͑ʃ'ᴜ j͑ʃꞇ ${qakaj2.landejaY.toFixed(3)}`);
    continue;
  }
  const xaqadi = capat6.l6da(saxeni[0], saxeni[1]) + K6H6AKMARL6DA;
  const z2hak = capat6.l6da(tlakakani[0], tlakakani[1]) + K6H6AKMARL6DA;
  console.log(`  ｡ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ${i} ( ${d.x.toFixed(1)}, ${d.z.toFixed(1)} )` +
    ` ｡ ſןᴜ ſᶘɹ ${starto.toFixed(3)} ｡ ɭʃɜ }ʃᴜ ${capat6.k2fe}` +
    ` ｡ ɭl̀ᴜ ${xaqadi.toFixed(3)} ｡ ɭl̀ᴜȝ ${z2hak.toFixed(3)}` +
    ` ｡ ᶅſэ ſ͕ɭᴜ ʌ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ${qakaj2.landejaY.toFixed(3)}` +
    ` ｡ ſ̀ȷᴜ ſɭᴜƽ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ${( z2hak - qakaj2.landejaY ).toFixed(3)}` +
    ` ｡ j͑ʃᴜ ı],ɔ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ${( starto - xaqadi ).toFixed(3)}` +
    ` ｡ ֭ſɭэ ſɭw }ʃꞇ ${Math.hypot(saxeni[0] - qakaj2.capat6aN2kj[0][0],
      saxeni[1] - qakaj2.capat6aN2kj[0][1]).toFixed(2)}`);
}
