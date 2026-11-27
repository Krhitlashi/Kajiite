// ≺⧼ ſ͕ɭɜ ı],ɹ }ʃɹƽ ʌ ſᶘᴜ j͐ʃɔ ſᶘᴜ 📃 ⧽≻

import "./ceh2kap2.mjs";
import { l6da } from "../../kanta/nala/mut6qSoza.js";
import { kf2BazanK6h6L6dan } from "../../skek2/qatsiike/hak6h6/l6da.js";
import { kf2Tap2Vem2n, tamc2kBrakHal6da, tap2L6daJe } from
  "../../skek2/qatsiike/hak6h6/haqoxa.js";
import { kf2Haknece, tamc2kTap2Vem2 } from "../../skek2/qatsiike/hak6h6/hapa12.js";
import { K6H6ADIORITAP2SOMANI } from "../../skek2/qatsiike/hak6h6/havecax2l.js";
import { kf2Vecax2lanNala } from "./p6kpu.js";

const nala = kf2Vecax2lanNala(false);
const kozunu = kf2BazanK6h6L6dan(l6da);

const hakxawa: [ number, number ][] = [ [ 0o24, -0o100 ], [ 0o65, -0o44 ], [ 0o70, -0o44 ], [ 0o134, -0o74 ] ];
for ( const [ qx, qz ] of hakxawa ) {
  console.log(`\n}ʃɹƽ ${qx},${qz} ｡ ſɭɜ ſɭ,w ${l6da(qx, qz).toFixed(0o2)}`);
  for ( const k of nala.haveb6kek ) {
    const d = Math.hypot(k.x - qx, k.z - qz);
    if ( d > 0o12 ) continue;
    const knece = kf2Haknece(nala.bal2.hac2w2q.get(k.x + "," + k.z) ?? [],
      nala.bal2.hapukxe.get(k.x + "," + k.z),
      nala.bal2.s2sabo.get(k.x + "," + k.z) ?? 0o0,
      nala.bal2.hap2somani.get(k.x + "," + k.z));
    const hap2somani = knece.map(b => b.p2somani);
    const hal6da = tamc2kBrakHal6da(k.x, k.z, knece.map(b => [ b.ux, b.uz ]), hap2somani, kozunu);
    const vem2 = tamc2kTap2Vem2(k.x, k.z, knece, nala.k6h6L6da);
    console.log(`  ｡ ſןᴜ ſᶘɹ ${k.x.toFixed(0o1)},${k.z.toFixed(0o1)} d=${d.toFixed(0o1)}` +
      ` ｡ ſɭɜ ſɭ,w ${l6da(k.x, k.z).toFixed(0o2)} ｡ ᶅſɔ ɽ͑ʃ'ɔ ${nala.k6h6L6da(k.x, k.z).toFixed(0o2)}`);
    console.log(`    ｡ ſɭɜ ſɭ,w ʌ ᶅſэ ſ͕ɭᴜ ${hal6da.map(v => v.toFixed(0o2)).join(" ")}` +
      ` | ᶅſɔ ɽ͑ʃ'ɔ ʌ ᶅſэ ſ͕ɭᴜ ${vem2.hal6da.map(v => v.toFixed(0o2)).join(" ")}` +
      ` | j͑ʃɜ j͑ʃƨɹ ${vem2.l6da.toFixed(0o2)}`);
    console.log(`    ｡ ſɟɹ ᶅſɹȝ ${knece.map(b => `${b.ux.toFixed(0o2)}/${b.uz.toFixed(0o2)}`).join(" ")}`);
  }
  for ( const ox of [ -6, -3, 0, 3, 6 ] ) {
    const x2pa: string[] = [];
    for ( const oz of [ -6, -3, 0, 3, 6 ] ) {
      const px = qx + ox, pz = qz + oz;
      x2pa.push(`(${px},${pz}) ${nala.k6h6L6da(px, pz).toFixed(0o1)}/${l6da(px, pz).toFixed(1)}`);
    }
    console.log("  " + x2pa.join("  "));
  }
}
