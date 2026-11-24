// ≺⧼ ſɭэ ֭ſɭэ j͑ʃᴜꞇ ʌ ſןw ſɭᴜƴ ʌ ſןᴜ ſᶘɹ 🔬 ⧽≻
// ⟨ ſɭэ ֭ſɭэ , ſɭɹ ſןᴜ , ꞙɭı , ⟅ ſɭᴜ ſןᴜ , ꞙɭı , j͑ʃɜ j͑ʃƨɹ , ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , 📃 ⟩
// ſɭэ ֭ſɭэ , ꞙɭɿ , ⟅ ſɭᴜ ſןᴜ , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭı , ꞙɭɿ , 📃 ⟩
import { aktivajHak6h6, aktivajHaqakaj2 } from "../../kantaoj/tero-datumaro/rultempo.js";
import { alteco } from "../../kantaoj/mondo/tereno.js";
import { troviK6h6RetajnHaveb6kekn } from "../../eskekoj/medio/voj-reto.js";
import { kf2K6h6Alton } from "../../eskekoj/medio/hak6h6/alto.js";
import { k6h6SuproDeVeb6kek } from "../../eskekoj/medio/hak6h6/haqoxa.js";
import { VOJA_EKSTERA_DUONO, VOJA_TRUA_DUONO } from "../../eskekoj/medio/hak6h6/havecax2l.js";

const VOJOJ = aktivajHak6h6().filter(v => v.n2k.length >= 2);
const DOKOJ = aktivajHaqakaj2();
const retaj = VOJOJ.map(v => ( { n2k: v.n2k, sefini: v.sefini } ));
const haveb6kek = troviK6h6RetajnHaveb6kekn(retaj, DOKOJ);
const k6h6Alteco = kf2K6h6Alton(alteco, haveb6kek);

console.log("<( ſɟɹƽ )>");
for ( const k of haveb6kek ) {
  const teru = k6h6SuproDeVeb6kek(k.x, k.z, k.direktaj, VOJA_EKSTERA_DUONO, k6h6Alteco).hateru;
  console.log(`  ( ${k.x.toFixed(2)}, ${k.z.toFixed(2)} ) ｡ ſןᴜ ſᶘɹ ${teru.toFixed(2)}` +
    ` ｡ ſɭɜ ſɭ,w ${alteco(k.x, k.z).toFixed(2)} ｡ ſɭᴜc̗ ɭʃɜ ${k.direktaj.length}` +
    ( k.fermitaj ? " ｡ ſןw ſɭᶗ‹ɔ" : "" ));
}

console.log("<( ſ̀ȷᴜ ſɭᴜƽ ʌ ſɭэ ֭ſɭэ )>");
for ( let i = 0; i < VOJOJ.length; i++ ) {
  const p = VOJOJ[i].n2k;
  for ( const [ ksaka, q ] of [ [ "j͑ʃᴜ ı],ɔ", p[0] ], [ "ſ̀ȷᴜ ſɭᴜƽ", p[p.length - 1] ] ] as const ) {
    let plej = Infinity, proksima: typeof haveb6kek[number] | null = null;
    for ( const k of haveb6kek ) {
      const d = Math.hypot(k.x - q[0], k.z - q[1]);
      if ( d < plej ) { plej = d; proksima = k; }
    }
    const teru = proksima && plej < VOJA_TRUA_DUONO * 0o2
      ? k6h6SuproDeVeb6kek(proksima.x, proksima.z, proksima.direktaj, VOJA_EKSTERA_DUONO,
        k6h6Alteco).hateru : NaN;
    console.log(`  ${i} ${VOJOJ[i].ksaka} ${ksaka} ( ${q[0].toFixed(2)}, ${q[1].toFixed(2)} )` +
      ` ｡ ֭ſɭэ ſɭw }ʃꞇ ${plej.toFixed(2)}` +
      ` ｡ ſןᴜ ſᶘɹ ${Number.isNaN(teru) ? "-" : teru.toFixed(2)}` +
      ` ｡ ſɭɜ ſɭ,w ${alteco(q[0], q[1]).toFixed(2)}`);
  }
}

console.log("<( ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ )>");
for ( const d of DOKOJ ) {
  const r = d.rotacio ?? 0;
  console.log(`  ( ${d.x.toFixed(1)}, ${d.z.toFixed(1)} ) ｡ ɭl̀w ſȷw ${d.profundo}` +
    ` ｡ j͑ʃɹ j͑ʃᴜ ʃɜ ${( r * 180 / Math.PI ).toFixed(0)}°` +
    ` ｡ ᶅſэ ſ͕ɭᴜ ʌ ſɭɜ ſɭ,w ( ${( d.x + Math.sin(r) * d.profundo / 2 ).toFixed(1)},` +
    ` ${( d.z + Math.cos(r) * d.profundo / 2 ).toFixed(1)} )` +
    ` ｡ ᶅſɔ ɽ͑ʃ'ɔ ${k6h6Alteco(d.x + Math.sin(r) * d.profundo / 2,
      d.z + Math.cos(r) * d.profundo / 2).toFixed(2)}`);
}
