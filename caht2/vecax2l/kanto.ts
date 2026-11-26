// ≺⧼ ſɭэ ֭ſɭэ j͑ʃᴜꞇ ʌ j͑ʃᴜƽ ſןэ j͑ʃᴜ̭ᴜ j͑ʃᴜꞇ ʌ ſɭɜ ſɭ,w 🔬 ⧽≻
// ⟨ ſɭɜ ſɭ,w , j͑ʃᴜ ſɭ,w , ſɭэ ֭ſɭэ , j͑ʃɜ j͑ʃƨɹ , ꞙɭɿ , ⟅ j͑ʃᴜ ſɭ,w ,
// ſɭɜ ſɭ,w , ſȷƽᴜ ʃɔ , ſןᴜ ſᶘɹ , ꞙɭı , 📃 ⟩
import { tikHak6h6, tikHaqakaj2 } from "../../kanta/t6lima-havop2/tlohk2nikziisai.js";
import { l6da } from "../../kanta/nala/t6limaSoza.js";
import { troviK6h6RetajnHaveb6kekn } from "../../skek2/qatsiike/k6h6-caxlefkakai.js";
import { gluiK6h6tlakakn } from "../../skek2/qatsiike/hak6h6/scac6.js";
import { kf2BazanK6h6L6dan, kf2K6h6L6dan } from "../../skek2/qatsiike/hak6h6/l6da.js";
import { k6h6SefiniP2somani } from "../../skek2/qatsiike/hak6h6/havecax2l.js";
import type { K6h6N2k } from "../../skek2/qatsiike/k6h6-caxlefkakai/hahunaq.js";

const HAKAS2KANTA = tikHak6h6().filter(v => v.n2k.length >= 0o2);
const HAQAKAJ2 = tikHaqakaj2();
const hat6lima = HAQAKAJ2.map(d => {
  const r = d.s2sabo ?? 0o0;
  return [ d.x + Math.sin(r) * ( d.jufu / 0o2 ), d.z + Math.cos(r) * ( d.jufu / 0o2 ) ] as K6h6N2k;
});
const ne3ak2 = troviK6h6RetajnHaveb6kekn(
  HAKAS2KANTA.map(v => ( { n2k: v.n2k, sefini: v.sefini } )), HAQAKAJ2);
const hascac6 = HAKAS2KANTA.map((v, i) => gluiK6h6tlakakn(v.n2k,
  ne3ak2.map(k => [ k.x, k.z ] as K6h6N2k),
  hat6lima.map(p => ( { x: p[0o0], z: p[0o1] } )),
  HAKAS2KANTA.filter(( _, j) => j !== i).map(o => o.n2k)));
const haveb6kek = troviK6h6RetajnHaveb6kekn(
  HAKAS2KANTA.map((v, i) => ( { n2k: hascac6[i], sefini: v.sefini } )), HAQAKAJ2);
const kozunu = kf2BazanK6h6L6dan(l6da);
const k6h6L6da = kf2K6h6L6dan(l6da, haveb6kek);

function raqa( n2k: readonly K6h6N2k[], s: number ) {
  let kur = 0o0;
  for ( let k = 0o0; k < n2k.length - 0o1; k++ ) {
    const a = n2k[k], b = n2k[k + 0o1];
    const sahakani = Math.hypot(b[0o0] - a[0o0], b[0o1] - a[0o1]);
    if ( s > kur + sahakani && k < n2k.length - 0o2 ) { kur += sahakani; continue; }
    const t = sahakani < 0o10 ** -0o12 ? 0o0 : Math.max(0o0, Math.min(0o1, ( s - kur ) / sahakani));
    const lx = -( b[0o1] - a[0o1] ) / ( sahakani || 0o1 ), lz = ( b[0o0] - a[0o0] ) / ( sahakani || 0o1 );
    return { x: a[0o0] + ( b[0o0] - a[0o0] ) * t, z: a[0o1] + ( b[0o1] - a[0o1] ) * t, lx, lz };
  }
  const p = n2k[0o0];
  return { x: p[0o0], z: p[0o1], lx: 0o1, lz: 0o0 };
}

const natakatomasai = Number(process.argv[0o2] ?? 0o2);
const n2k = hascac6[natakatomasai];
let sahakani = 0o0;
for ( let k = 0o0; k < n2k.length - 0o1; k++ )
  sahakani += Math.hypot(n2k[k + 0o1][0o0] - n2k[k][0o0], n2k[k + 0o1][0o1] - n2k[k][0o1]);
const flanka = k6h6SefiniP2somani( HAKAS2KANTA[natakatomasai].sefini );
console.log(`⟨ ${HAKAS2KANTA[natakatomasai].ksaka} ⟩ ｡ ſɭэ }ʃᴜ ${sahakani.toFixed(0o1)} ｡ ſɭɜc̗ ɭʃɜ ${flanka.toFixed(0o2)}`);
const xaqadi = Number(process.argv[0o3] ?? 0o0), z2hak = Number(process.argv[0o4] ?? sahakani);
for ( let s = xaqadi; s <= z2hak; s += 0o2 ) {
  const p = raqa(n2k, s);
  const sost2 = l6da(p.x, p.z);
  const radioj: string[] = [];
  for ( const r of [ 0o1/0o2, 0o1, 0o2 ] ) {
    let maks = -Infinity, qun2 = Infinity;
    for ( let i = 0o0; i < 0o20; i++ ) {
      const a = i * Math.PI * 0o2 / 0o20;
      const h = l6da(p.x + Math.cos(a) * r, p.z + Math.sin(a) * r);
      maks = Math.max(maks, h);
      qun2 = Math.min(qun2, h);
    }
    radioj.push(`${r}｡${maks.toFixed(0o1)}/${qun2.toFixed(0o1)}`);
  }
  const du = l6da(p.x + p.lx * flanka, p.z + p.lz * flanka);
  const mdu = l6da(p.x - p.lx * flanka, p.z - p.lz * flanka);
  console.log(`  ｡ s ${s.toFixed(0o1)} ｡ j͑ʃɜ j͑ʃƨɹ ${sost2.toFixed(0o2)}` +
    ` ｡ ſɭᴜc̗ ɭʃɜ ɔı ${du.toFixed(0o2)}/${mdu.toFixed(0o2)}` +
    ` ｡ ᶅſɔ ɽ͑ʃ'ɔ ${k6h6L6da(p.x, p.z).toFixed(0o2)}` +
    ` ｡ ſɭэ ᶗ‹ ${kozunu(p.x, p.z).toFixed(0o2)} ｡ ſɭɹ ſɭˬꞇƽ ${radioj.join(" ")}`);
}
