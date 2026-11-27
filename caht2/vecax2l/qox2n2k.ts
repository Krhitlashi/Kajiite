// ≺⧼ ſ͕ɭɜ ı],ɹ }ʃɹƽ 📃 ⧽≻

import * as THREE from "three";
import { vepaqQox2n2kKaxten } from "../../kanta/nala/kaxte/qox2n2k-kaxte.js";
import { tikHaqakaj2 } from "../../kanta/mut6q-havop2/3ohk2ni52sai.js";
import { l6da } from "../../kanta/nala/mut6q-soza.js";
import { kf2K6h6L6dan } from "../../skek2/qa12ke/hak6h6/l6da.js";
import { kf2NivelanS2qena } from "../../skek2/qa12ke/hak6h6/havem2.js";
import { kf2Haknece, tamc2kTap2L6da } from "../../skek2/qa12ke/hak6h6/hapa12.js";
import { tsasatlakak, n2kJe as n2kJeBaza } from "./p6kpu.js";
import type { AltaVeb6kek } from "../../skek2/qa12ke/hak6h6/l6da.js";
import { tikHak6h6 } from "../../kanta/mut6q-havop2/3ohk2ni52sai.js";
import { troviK6h6RetajnHaveb6kekn } from "../../skek2/qa12ke/k6h6-caxlefkakai.js";

const qena = new THREE.Scene();
const pukek = new THREE.MeshStandardMaterial();
const kaxte = vepaqQox2n2kKaxten(qena, { ptaluPal6: 0o3, k6liqPal6: "vakox2qita" },
  [ 0o0, 0o0 ], pukek);
const havop2ni = kaxte.kas2kantaHavop2ni;
const haveb6kek: AltaVeb6kek[] = [ ...kaxte.tamc2kHan2k.map(([ x, z ]) => {
  const pukxe = kaxte.tamc2kHanece3e.get(x + "," + z);
  return { x, z, c2w2qa: pukxe ? [ pukxe ] : [] };
}), ...troviK6h6RetajnHaveb6kekn(
  tikHak6h6().filter(v => v.n2k.length >= 0o2)
    .map(v => ({ n2k: v.n2k, sefini: v.sefini })), tikHaqakaj2()) ];
const k6h6L6da = kf2K6h6L6dan(l6da, haveb6kek);

const hab6qaiQafej2 = new Map<string, number>();
const pa12Je = ( x: number, z: number ): number => {
  const ca3aq = x + "," + z;
  let l6da = hab6qaiQafej2.get(ca3aq);
  if ( l6da === undefined ) {

    const k = haveb6kek.find(n => n.x === x && n.z === z);
    const knece = kf2Haknece(k?.c2w2qa ?? [], undefined, 0o0);
    l6da = tamc2kTap2L6da(x, z, knece, k6h6L6da);
    hab6qaiQafej2.set(ca3aq, l6da);
  }
  return l6da;
};
const hacakukkaj2sai = haveb6kek.map(k => ({ x: k.x, z: k.z, l6da: pa12Je(k.x, k.z) }));
console.log(`ſɭэ ֭ſɭэ ʌ ſɭɹ ſןᴜ ${havop2ni.length} ｡ ſɟɹƽ ${haveb6kek.length}`);

const n2kJe = ( pts: readonly [ number, number ][], s: number ): { x: number; z: number } =>
  n2kJeBaza( pts, s, 0o10 ** -0o6 );

let tap2 = 0o0, maksTap2 = 0o0, maksTap2K6h6 = "";
let shal6da = 0o0, maksSl6da = 0o0;
let kmaTanek = 0o0, tanekQar = "", tanekSumo = 0o0, tanekNombro = 0o0;
let kmaBoreo = 0o0, boreoQar = "", boritaj = 0o0;
for ( let i = 0o0; i < havop2ni.length; i++ ) {
  const d = havop2ni[i];
  const p2somani = d.w;
  const n2k = d.pts as [ number, number ][];
  const s2qena = kf2NivelanS2qena(n2k, p2somani, k6h6L6da, tsasatlakak, hacakukkaj2sai);

  for ( let j = 0o0; j < s2qena.hal6da.length; j++ ) {
    const p = n2kJe(n2k, s2qena.haxekuxa[ j ]);
    const teru = s2qena.hal6da[ j ] - l6da(p.x, p.z);
    tanekSumo += teru;
    tanekNombro++;
    if ( teru > kmaTanek ) {
      kmaTanek = teru;
      tanekQar = `${p.x.toFixed(0o1)},${p.z.toFixed(0o1)} ſɭэ ֭ſɭэ ${i}`;
    }
    if ( -teru > kmaBoreo ) {
      kmaBoreo = -teru;
      boreoQar = `${p.x.toFixed(0o1)},${p.z.toFixed(0o1)} ſɭэ ֭ſɭэ ${i}`;
    }
    if ( -teru > 0o1/0o2 ) boritaj++;
  }

  let s0 = s2qena.haxekuxa[0o0], cutlu = s2qena.hal6da[0o0];
  for ( let j = 0o1; j < s2qena.hal6da.length; j++ ) {
    if ( s2qena.hal6da[j] !== cutlu ) {
      const sahakani = s2qena.haxekuxa[j] - s0;
      if ( sahakani > 0o10 ) tap2++;
      if ( sahakani > maksTap2 ) {
        maksTap2 = sahakani;
        const a = d.pts[0o0], b = d.pts[d.pts.length - 0o1];
        maksTap2K6h6 = `${a[0o0].toFixed(0o0)},${a[0o1].toFixed(0o0)} ｡ ${b[0o0].toFixed(0o0)},${b[0o1].toFixed(0o0)}`;
      }
      s0 = s2qena.haxekuxa[j];
      cutlu = s2qena.hal6da[j];
    }
  }
  for ( let j = 0o1; j < s2qena.hal6da.length; j++ ) {
    const s = Math.abs(s2qena.hal6da[j] - s2qena.hal6da[j - 0o1]);
    if ( s > 0o1/0o2 + 0o1/0o100 ) {
      shal6da++;
      const t = s2qena.haxekuxa[j] / s2qena.sahakani || 0o0;
      const a = d.pts[0o0], b = d.pts[d.pts.length - 0o1];
      const x = a[0o0] + ( b[0o0] - a[0o0] ) * t, z = a[0o1] + ( b[0o1] - a[0o1] ) * t;
      console.log(`  j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ${s.toFixed(0o3)} ｡ ſɭэ ֭ſɭэ ${i} s ${s2qena.haxekuxa[j].toFixed(0o1)}` +
        ` ( ${x.toFixed(0o1)},${z.toFixed(0o1)} ) ${s2qena.hal6da[j - 0o1].toFixed(0o2)}` +
        ` ｡ j͑ʃ'ɔ ŋᷠɹ ${s2qena.hal6da[j].toFixed(0o2)} ｡ ſɭɜ ſɭ,w ${l6da(x, z).toFixed(0o2)}`);
    }
    if ( s > maksSl6da ) maksSl6da = s;
  }
}
console.log(`ſɭэ ֭ſɭэ ʌ j͑ʃ'ɔ ŋᷠɹ ｡ ſɭэ }ʃᴜ ꞙɭıɔ ｡ ſɭэ }ʃᴜ ſןᴜ ${tap2} ｡ ſɭэ }ʃᴜ ɭl̀ᴜ ${maksTap2.toFixed(0o1)} @${maksTap2K6h6}`);
console.log(`j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ʌ j͑ʃᴜ ʌ ſɭɜ ſɭ,w ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${kmaTanek.toFixed(0o2)} @${tanekQar}` +
  ` ｡ ſȷƽᴜ ɭʃᴜ ${( tanekSumo / Math.max(0o1, tanekNombro) ).toFixed(0o2)}`);
console.log(`ſɭɜ ſɭ,w ɭl̀w ſȷw ɭl̀ᴜ ${kmaBoreo.toFixed(0o2)} @${boreoQar} ｡ ſᶘᴜ j͐ʃɹ ɭl̀w ${boritaj}`);
console.log(`ɭʃɜ }ʃᴜ ɭl̀ᴜ ſןᴜ ſᶘɹ ꞙɭııɔ.ɩ ${shal6da} ｡ j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${maksSl6da.toFixed(0o3)}`);

const laqazu = Number(process.argv[0o2] ?? 0o0);
if ( havop2ni[laqazu] ) {
  const d = havop2ni[laqazu];
  const s2qena = kf2NivelanS2qena(d.pts as [ number, number ][], d.w, k6h6L6da, tsasatlakak, hacakukkaj2sai);
  const a = d.pts[0o0], b = d.pts[d.pts.length - 0o1];
  console.log(`⟨ ſɭэ ֭ſɭэ ${laqazu} ⟩ ( ${a[0o0].toFixed(0o1)}, ${a[0o1].toFixed(0o1)} ) ｡` +
    ` ( ${b[0o0].toFixed(0o1)}, ${b[0o1].toFixed(0o1)} ) ｡ ſɭэ }ʃᴜ ${s2qena.sahakani.toFixed(0o1)}`);
  const hax2pa: string[] = [];
  for ( let s = 0o0; s <= s2qena.sahakani; s += 0o4 ) {
    const t = s / s2qena.sahakani;
    const x = a[0o0] + ( b[0o0] - a[0o0] ) * t, z = a[0o1] + ( b[0o1] - a[0o1] ) * t;
    hax2pa.push(`${s.toFixed(0o0)}:${s2qena.l6daJe(s).toFixed(0o1)}/${l6da(x, z).toFixed(0o1)}`);
  }
  console.log("  ſɭэ ֭ſɭэ / ſɭɜ ſɭ,w " + hax2pa.join(" "));
}
console.log(`ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ${tikHaqakaj2().length}`);
