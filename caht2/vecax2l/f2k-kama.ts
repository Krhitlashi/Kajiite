// ≺⧼ ſȷɹ ſɭƽ ŋᷠᴜ 🧪 ⧽≻

import "./ceh2kap2.mjs";
import * as THREE from "three";
import { vepaqKaxten } from "../../kanta/nala/kaxte.js";
import { kf2T6g6Pukek, kf2T6hnaPukek,
  kf2Cah6k6Pukek, kf2KuhalPukek } from "../../skek2/p6kpu/pukek.js";
import { kas2kantaHasoza } from "../../skek2/qatsiike/hak6h6/hahunaq.js";
import { rampaKuro, STUPAF2KKURO, K6H6ASTUPAF2K } from "../../skek2/qatsiike/hak6h6/havecax2l.js";

const DEKLIVOLIMO = 0o1 / K6H6ASTUPAF2K + 0o1 / 0o20;
const KUROTOLERO = 0o1 / 0o40;

const qena = new THREE.Scene();
const texture = new THREE.Texture();
kas2kantaHasoza.length = 0o0;
await vepaqKaxten(qena,
  kf2T6g6Pukek(texture), kf2T6hnaPukek(texture),
  kf2Cah6k6Pukek(), kf2KuhalPukek(0xd8b068), () => {});

interface F2k { fala: number; kuro: number; haga: number; x: number; z: number }
const haf2k: F2k[] = [];
let glataj = 0o0;
for ( const kek of kas2kantaHasoza ) {
  const kuro = Math.hypot(kek.x2 - kek.x1, kek.z2 - kek.z1);
  const fala = Math.abs(kek.y1 - kek.y0);
  if ( fala < 0o1 / 0o1000 || kuro < 0o1 / 0o1000 ) continue;

  if ( kek.f2k !== true ) { glataj++; continue; }
  haf2k.push({ fala, kuro, haga: fala / kuro,
    x: ( kek.x1 + kek.x2 ) / 0o2, z: ( kek.z1 + kek.z2 ) / 0o2 });
}
haf2k.sort(( p, q ) => q.haga - p.haga);

const troaj = haf2k.filter(r => r.haga > DEKLIVOLIMO);
const premitaj = haf2k.filter(r => rampaKuro(r.fala) - r.kuro > KUROTOLERO);
const haga = [ ...new Set(haf2k.map(r => r.haga.toFixed(0o2))) ].sort();
const plosteq = haf2k[0o0];

console.log( `ſɭᴜc̗ ɭʃɜ ʌ ɭʃɜ }ʃᴜ ${haf2k.length} ｡ j͑ʃɜ ſɭ,ᴜ ı],ᴜ ֭ſɭᴜ ${glataj} ｡ ɭl̀ᴜ ʌ ſןw ſɭᴜƴ ʌ ɭʃɜ }ʃᴜ ${troaj.length}` +
  ` ｡ ſןw ſɭᴜƴ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${( plosteq?.haga ?? 0o0 ).toFixed(0o2)}` +
  ( plosteq ? ` @${plosteq.x.toFixed(0o1)},${plosteq.z.toFixed(0o1)}` : "" ) );
console.log( `ſןw ſɭᴜƴ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ${haga.length} [ ${haga.slice(0o0, 0o10).join(" ")} ]` +
  ` ｡ ſɭэ }ʃᴜ ʌ ֭ſɭᴜ ſ͔ɭᴜ ʌ ſɭɹ ſᶘɔ ${STUPAF2KKURO.toFixed(0o2)}` );
console.log( `֭ſɭᴜ ſ͔ɭᴜ ʌ ŋᷠɹ ŋᷠɹ ʌ j͑ʃɔ ſȷꞇ }ʃꞇ ${premitaj.length}` );
for ( const r of troaj.slice(0o0, 0o10) )
  console.log( `  ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ ſᶘɔ j͐ʃɹ j͑ʃᴜꞇ ｡ j͐ʃᴜɔ˞ ${r.fala.toFixed(0o2)} ｡ ſɭэ ɭʃᴜ ${r.kuro.toFixed(0o3)}` +
    ` ｡ ſןw ſɭᴜƴ ${r.haga.toFixed(0o2)} @${r.x.toFixed(0o1)},${r.z.toFixed(0o1)}` );

const xobe = troaj.length === 0o0 && premitaj.length === 0o0 && haf2k.length > 0o0;
console.log( xobe ? "ſןᴜ j͐ʃэ ʌ ֭ſɭᴜ ſ͔ɭᴜ ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ" :
  `ſןᴜ j͐ʃэ ʌ ֭ſɭᴜ ſ͔ɭᴜ ｡ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ${troaj.length + premitaj.length}` );
