// ≺⧼ ſɭэ ֭ſɭэ ʌ ſןᴜ j͐ʃэ 📃 ⧽≻

import { kf2Haknece, tamc2kTap2L6da } from "../../skek2/qatsiike/hak6h6/hapa12.js";
import { K6H6ATRUAP2SOMANI } from "../../skek2/qatsiike/hak6h6/havecax2l.js";
import { kf2Vecax2lanNala, n2kJe } from "./p6kpu.js";

const nala = kf2Vecax2lanNala();
const bal2 = nala.bal2;

let hapu3ohk2 = 0o0, provitaj = 0o0;
let kmaGpukaz = 0o0, kmaQar = "";
for ( const k of nala.haveb6kek ) {
  const ca3aq = k.x + "," + k.z;
  const knece = kf2Haknece(bal2.hac2w2q.get(ca3aq) ?? [], bal2.hapukxe.get(ca3aq),
    bal2.s2sabo.get(ca3aq) ?? 0o0, bal2.hap2somani.get(ca3aq));
  const b6qaiQafej2 = tamc2kTap2L6da(k.x, k.z, knece, nala.k6h6L6da);
  const hax2pa: string[] = [];
  for ( let i = 0o0; i < nala.hak6h6.length; i++ ) {

    const s2qena = nala.s2qenaDe(i);
    let plosteq = Infinity, kmaS = 0o0;
    for ( let s = 0o0; s <= s2qena.sahakani; s += 0o1/0o10 ) {
      const p = n2kJe(nala.hascac6[ i ], s);
      const d = Math.hypot(p.x - k.x, p.z - k.z);
      if ( d < plosteq ) { plosteq = d; kmaS = s; }
    }
    if ( plosteq > K6H6ATRUAP2SOMANI + 0o1/0o4 ) continue;
    provitaj++;
    const l6da = s2qena.l6daJe(kmaS);
    const dif = l6da - b6qaiQafej2;
    if ( Math.abs(dif) > kmaGpukaz ) { kmaGpukaz = Math.abs(dif); kmaQar = `${k.x},${k.z}`; }
    if ( Math.abs(dif) > 0o1/0o1000 ) hapu3ohk2++;
    hax2pa.push(`ſɭэ ֭ſɭэ ${i} ｡ ֭ſɭэ ſɭw }ʃꞇ ${plosteq.toFixed(0o2)} ｡ j͑ʃ'ɔ ŋᷠɹ ${l6da.toFixed(0o2)}` +
      ( Math.abs(dif) > 0o1/0o1000 ? ` ｡ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ${dif.toFixed(0o2)}` : "" ));
  }
  console.log(`｡ ſןᴜ ſᶘɹ ${k.x.toFixed(0o1)},${k.z.toFixed(0o1)} ｡ j͑ʃ'ɔ ŋᷠɹ ${b6qaiQafej2.toFixed(0o2)}` +
    ( hax2pa.length ? ` | ${hax2pa.join(" | ")}` : " | ſןɔ ʌ ſɭэ ֭ſɭэ" ));
}
console.log(`ſɟɹƽ ʌ j͑ʃ'ɔ ŋᷠɹ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ${hapu3ohk2} / ${provitaj} ｡ j͑ʃ'ɔ ŋᷠɹ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ɭl̀ᴜ ${kmaGpukaz.toFixed(0o2)} @${kmaQar}` +
  ( hapu3ohk2 > 0o0 ? "  ſ̀ȷᴜ̩ ſɭɹ }ʃꞇ" : "" ));
