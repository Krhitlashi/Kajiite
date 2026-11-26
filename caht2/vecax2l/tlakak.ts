// ≺⧼ ſɭэ ֭ſɭэ j͑ʃᴜꞇ ʌ ſןw ſɭᴜƴ ʌ ſןᴜ ſᶘɹ 🔬 ⧽≻
// ⟨ ſɭэ ֭ſɭэ , ſɭɹ ſןᴜ , ꞙɭı , ⟅ ſɭᴜ ſןᴜ , ꞙɭı , j͑ʃɜ j͑ʃƨɹ , ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , 📃 ⟩
// ſɭэ ֭ſɭэ , ꞙɭɿ , ⟅ ſɭᴜ ſןᴜ , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭı , ꞙɭɿ , 📃 ⟩
import { tikHak6h6, tikHaqakaj2 } from "../../kanta/t6lima-havop2/tlohk2nikziisai.js";
import { l6da } from "../../kanta/nala/t6limaSoza.js";
import { troviK6h6RetajnHaveb6kekn } from "../../skek2/qatsiike/k6h6-caxlefkakai.js";
import { kf2K6h6L6dan } from "../../skek2/qatsiike/hak6h6/l6da.js";
import { k6h6TeruDeVeb6kek } from "../../skek2/qatsiike/hak6h6/haqoxa.js";
import { K6H6AEKSTERAP2SOMANI, K6H6ATRUAP2SOMANI } from "../../skek2/qatsiike/hak6h6/havecax2l.js";

const HAKAS2KANTA = tikHak6h6().filter(v => v.n2k.length >= 0o2);
const HAQAKAJ2 = tikHaqakaj2();
const hacaxlefkakai = HAKAS2KANTA.map(v => ( { n2k: v.n2k, sefini: v.sefini } ));
const haveb6kek = troviK6h6RetajnHaveb6kekn(hacaxlefkakai, HAQAKAJ2);
const k6h6L6da = kf2K6h6L6dan(l6da, haveb6kek);

console.log("<( ſɟɹƽ )>");
for ( const k of haveb6kek ) {
  const teru = k6h6TeruDeVeb6kek(k.x, k.z, k.c2w2qa, K6H6AEKSTERAP2SOMANI, k6h6L6da).hateru;
  console.log(`  ( ${k.x.toFixed(0o2)}, ${k.z.toFixed(0o2)} ) ｡ ſןᴜ ſᶘɹ ${teru.toFixed(0o2)}` +
    ` ｡ ſɭɜ ſɭ,w ${l6da(k.x, k.z).toFixed(0o2)} ｡ ſɭᴜc̗ ɭʃɜ ${k.c2w2qa.length}` +
    ( k.hapukxe ? " ｡ ſןw ſɭᶗ‹ɔ" : "" ));
}

console.log("<( ſ̀ȷᴜ ſɭᴜƽ ʌ ſɭэ ֭ſɭэ )>");
for ( let i = 0o0; i < HAKAS2KANTA.length; i++ ) {
  const p = HAKAS2KANTA[i].n2k;
  for ( const [ ksaka, q ] of [ [ "j͑ʃᴜ ı],ɔ", p[0o0] ], [ "ſ̀ȷᴜ ſɭᴜƽ", p[p.length - 0o1] ] ] as const ) {
    let plosteq = Infinity, tsiike: typeof haveb6kek[number] | null = null;
    for ( const k of haveb6kek ) {
      const d = Math.hypot(k.x - q[0o0], k.z - q[0o1]);
      if ( d < plosteq ) { plosteq = d; tsiike = k; }
    }
    const teru = tsiike && plosteq < K6H6ATRUAP2SOMANI * 0o2
      ? k6h6TeruDeVeb6kek(tsiike.x, tsiike.z, tsiike.c2w2qa, K6H6AEKSTERAP2SOMANI,
        k6h6L6da).hateru : NaN;
    console.log(`  ${i} ${HAKAS2KANTA[i].ksaka} ${ksaka} ( ${q[0o0].toFixed(0o2)}, ${q[0o1].toFixed(0o2)} )` +
      ` ｡ ֭ſɭэ ſɭw }ʃꞇ ${plosteq.toFixed(0o2)}` +
      ` ｡ ſןᴜ ſᶘɹ ${Number.isNaN(teru) ? "-" : teru.toFixed(0o2)}` +
      ` ｡ ſɭɜ ſɭ,w ${l6da(q[0o0], q[0o1]).toFixed(0o2)}`);
  }
}

console.log("<( ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ )>");
for ( const d of HAQAKAJ2 ) {
  const r = d.s2sabo ?? 0o0;
  console.log(`  ( ${d.x.toFixed(0o1)}, ${d.z.toFixed(0o1)} ) ｡ ɭl̀w ſȷw ${d.jufu}` +
    ` ｡ j͑ʃɹ j͑ʃᴜ ʃɜ ${( r * 0o264 / Math.PI ).toFixed(0o0)}°` +
    ` ｡ ᶅſэ ſ͕ɭᴜ ʌ ſɭɜ ſɭ,w ( ${( d.x + Math.sin(r) * d.jufu / 0o2 ).toFixed(0o1)},` +
    ` ${( d.z + Math.cos(r) * d.jufu / 0o2 ).toFixed(0o1)} )` +
    ` ｡ ᶅſɔ ɽ͑ʃ'ɔ ${k6h6L6da(d.x + Math.sin(r) * d.jufu / 0o2,
      d.z + Math.cos(r) * d.jufu / 0o2).toFixed(0o2)}`);
}
