// ≺⧼ ſɭэ ֭ſɭэ j͑ʃᴜꞇ ʌ j͑ʃᴜƽ ſןэ j͑ʃᴜ̭ᴜ j͑ʃᴜꞇ ʌ ſɭɜ ſɭ,w 🔬 ⧽≻
// ⟨ ſɭɜ ſɭ,w , j͑ʃᴜ ſɭ,w , ſɭэ ֭ſɭэ , j͑ʃɜ j͑ʃƨɹ , ꞙɭɿ , ⟅ j͑ʃᴜ ſɭ,w ,
// ſɭɜ ſɭ,w , ſȷƽᴜ ʃɔ , ſןᴜ ſᶘɹ , ꞙɭı , 📃 ⟩
import { aktivajHak6h6, aktivajHaqakaj2 } from "../../kantaoj/tero-datumaro/rultempo.js";
import { alteco } from "../../kantaoj/mondo/tereno.js";
import { troviK6h6RetajnHaveb6kekn } from "../../eskekoj/medio/voj-reto.js";
import { gluiK6h6Finon } from "../../eskekoj/medio/hak6h6/gluado.js";
import { kf2BazanK6h6Alton, kf2K6h6Alton } from "../../eskekoj/medio/hak6h6/alto.js";
import { k6h6LarghoDuono } from "../../eskekoj/medio/hak6h6/havecax2l.js";
import type { K6h6Punkto } from "../../eskekoj/medio/voj-reto/hahunaq.js";

const VOJOJ = aktivajHak6h6().filter(v => v.n2k.length >= 2);
const DOKOJ = aktivajHaqakaj2();
const landoj = DOKOJ.map(d => {
  const r = d.rotacio ?? 0;
  return [ d.x + Math.sin(r) * ( d.profundo / 2 ), d.z + Math.cos(r) * ( d.profundo / 2 ) ] as K6h6Punkto;
});
const ne3ak2 = troviK6h6RetajnHaveb6kekn(
  VOJOJ.map(v => ( { n2k: v.n2k, sefini: v.sefini } )), DOKOJ);
const gluitaj = VOJOJ.map((v, i) => gluiK6h6Finon(v.n2k,
  ne3ak2.map(k => [ k.x, k.z ] as K6h6Punkto),
  landoj.map(p => ( { x: p[0], z: p[1] } )),
  VOJOJ.filter((_, j) => j !== i).map(o => o.n2k)));
const haveb6kek = troviK6h6RetajnHaveb6kekn(
  VOJOJ.map((v, i) => ( { n2k: gluitaj[i], sefini: v.sefini } )), DOKOJ);
const baza = kf2BazanK6h6Alton(alteco);
const k6h6Alteco = kf2K6h6Alton(alteco, haveb6kek);

function raqa( n2k: readonly K6h6Punkto[], s: number ) {
  let kur = 0;
  for ( let k = 0; k < n2k.length - 1; k++ ) {
    const a = n2k[k], b = n2k[k + 1];
    const sahakani = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if ( s > kur + sahakani && k < n2k.length - 2 ) { kur += sahakani; continue; }
    const t = sahakani < 0o10 ** -0o12 ? 0 : Math.max(0, Math.min(1, ( s - kur ) / sahakani));
    const lx = -( b[1] - a[1] ) / ( sahakani || 1 ), lz = ( b[0] - a[0] ) / ( sahakani || 1 );
    return { x: a[0] + ( b[0] - a[0] ) * t, z: a[1] + ( b[1] - a[1] ) * t, lx, lz };
  }
  const p = n2k[0];
  return { x: p[0], z: p[1], lx: 1, lz: 0 };
}

const celo = Number(process.argv[2] ?? 2);
const n2k = gluitaj[celo];
let sahakani = 0;
for ( let k = 0; k < n2k.length - 1; k++ )
  sahakani += Math.hypot(n2k[k + 1][0] - n2k[k][0], n2k[k + 1][1] - n2k[k][1]);
const flanka = k6h6LarghoDuono( VOJOJ[celo].sefini );
console.log(`⟨ ${VOJOJ[celo].ksaka} ⟩ ｡ ſɭэ }ʃᴜ ${sahakani.toFixed(1)} ｡ ſɭɜc̗ ɭʃɜ ${flanka.toFixed(2)}`);
const xaqadi = Number(process.argv[3] ?? 0), z2hak = Number(process.argv[4] ?? sahakani);
for ( let s = xaqadi; s <= z2hak; s += 0o2 ) {
  const p = raqa(n2k, s);
  const sost2 = alteco(p.x, p.z);
  const radioj: string[] = [];
  for ( const r of [ 0o1/0o2, 0o1, 0o2 ] ) {
    let maks = -Infinity, malplena = Infinity;
    for ( let i = 0; i < 0o20; i++ ) {
      const a = i * Math.PI * 0o2 / 0o20;
      const h = alteco(p.x + Math.cos(a) * r, p.z + Math.sin(a) * r);
      maks = Math.max(maks, h);
      malplena = Math.min(malplena, h);
    }
    radioj.push(`${r}:${maks.toFixed(1)}/${malplena.toFixed(1)}`);
  }
  const du = alteco(p.x + p.lx * flanka, p.z + p.lz * flanka);
  const mdu = alteco(p.x - p.lx * flanka, p.z - p.lz * flanka);
  console.log(`  ｡ s ${s.toFixed(1)} ｡ j͑ʃɜ j͑ʃƨɹ ${sost2.toFixed(2)}` +
    ` ｡ ſɭᴜc̗ ɭʃɜ ɔı ${du.toFixed(2)}/${mdu.toFixed(2)}` +
    ` ｡ ᶅſɔ ɽ͑ʃ'ɔ ${k6h6Alteco(p.x, p.z).toFixed(2)}` +
    ` ｡ ſɭэ ᶗ‹ ${baza(p.x, p.z).toFixed(2)} ｡ ſɭɹ ſɭˬꞇƽ ${radioj.join(" ")}`);
}
