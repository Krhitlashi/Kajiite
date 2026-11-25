// ≺⧼ ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ ꞁȷ̀ᴜꞇ ʌ ſɭᴜ ı],ƨɔ j͑ʃᴜꞇ ʌ ſɭэ ֭ſɭэ 🔬 ⧽≻
// ⟨ j͑ʃɜ j͑ʃƨɹ , ſɭэ ֭ſɭэ , ſɭэ ſɭᴜ ,
// ſɭэ ſɭᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
// ſɭᴜ ſןᴜ , ſɭɜ ſɭᴜ , ꞙɭɿ , 📃 ⟩
import * as THREE from "three";
import { vepaqKradanKaxten } from "../../kanta/nala/kaxte/krada-kaxte.js";
import { tikHaqakaj2 } from "../../kanta/t6lima-havop2/tlohk2nikziisai.js";
import { l6da } from "../../kanta/nala/t6limaSoza.js";
import { kf2K6h6L6dan } from "../../skek2/qatsiike/hak6h6/l6da.js";
import { kf2NivelanS2qena } from "../../skek2/qatsiike/hak6h6/havem2.js";
import { kf2Haknece, tamc2kTap2L6da } from "../../skek2/qatsiike/hak6h6/hapa12.js";
import { tsasatlakak, n2kJe as n2kJeBaza } from "./x2x2q.js";
import type { AltaVeb6kek } from "../../skek2/qatsiike/hak6h6/l6da.js";
import { tikHak6h6 } from "../../kanta/t6lima-havop2/tlohk2nikziisai.js";
import { troviK6h6RetajnHaveb6kekn } from "../../skek2/qatsiike/k6h6-caxlefkakai.js";

const qena = new THREE.Scene();
const pukek = new THREE.MeshStandardMaterial();
const kaxte = vepaqKradanKaxten(qena, { ptaluPal6: 3, k6liqPal6: "vakox2qita" },
  [ 0, 0 ], pukek);
const havop2ni = kaxte.kas2kantaHavop2ni;
const haveb6kek: AltaVeb6kek[] = [ ...kaxte.tamc2kHan2k.map(([ x, z ]) => {
  const pukxe = kaxte.tamc2kHanece3e.get(x + "," + z);
  return { x, z, c2w2qa: pukxe ? [ pukxe ] : [] };
}), ...troviK6h6RetajnHaveb6kekn(
  tikHak6h6().filter(v => v.n2k.length >= 2)
    .map(v => ({ n2k: v.n2k, sefini: v.sefini })), tikHaqakaj2()) ];
const k6h6L6da = kf2K6h6L6dan(l6da, haveb6kek);
// ⟨ ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , 📏 ⟩ , ſɭэ ֭ſɭэ , ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
const hab6qaiQafej2 = new Map<string, number>();
const pa12Je = ( x: number, z: number ): number => {
  const ca3aq = x + "," + z;
  let l6da = hab6qaiQafej2.get(ca3aq);
  if ( l6da === undefined ) {
// ⟨ ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , 📏 ⟩ , ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭɿ ,
// ꞙɭı , ſɭᴜ ſןᴜ , ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w , ꞙɭɔ , 📃 ⟩
    const k = haveb6kek.find(n => n.x === x && n.z === z);
    const knece = kf2Haknece(k?.c2w2qa ?? [], undefined, 0);
    l6da = tamc2kTap2L6da(x, z, knece, k6h6L6da);
    hab6qaiQafej2.set(ca3aq, l6da);
  }
  return l6da;
};
const hacakukkaj2sai = haveb6kek.map(k => ({ x: k.x, z: k.z, l6da: pa12Je(k.x, k.z) }));
console.log(`ſɭэ ֭ſɭэ ʌ ſɭɹ ſןᴜ ${havop2ni.length} ｡ ſɟɹƽ ${haveb6kek.length}`);

// ⟨ ſɭэ ֭ſɭэ , ſɭэ ſɭᴜ , ꞙɭı , 📏 ⟩
/* ſɭэ ֭ſɭэ , ſɭэ ſɭᴜ , ꞙɭı ,
    @param pts ( [ number , number ] [ ] ) - }ʃɹƽ ʌ ſɭэ ֭ſɭэ
    @param s ( number ) - ֭ſɭэ ſɭw }ʃꞇ ʌ ſɭэ ֭ſɭэ
@returns p ( { x , z } ) - }ʃɹƽ */
// ⟨ ı],ᴜ ֭ſɭᴜ , ſɭэ ſɭᴜ , ꞙɭɿ , 📃 ⟩
const n2kJe = ( pts: readonly [ number, number ][], s: number ): { x: number; z: number } =>
  n2kJeBaza( pts, s, 0o10 ** -0o6 );

// ⟨ j͑ʃᴜ ſɭ,w , ſɭэ ֭ſɭэ , ꞙɭɿ , 📏 ⟩
let tap2 = 0, maksTap2 = 0, maksTap2K6h6 = "";
let shal6da = 0, maksSl6da = 0;
let kmaTanek = 0, tanekQar = "", tanekSumo = 0, tanekNombro = 0;
let kmaBoreo = 0, boreoQar = "", boritaj = 0;
for ( let i = 0; i < havop2ni.length; i++ ) {
  const d = havop2ni[i];
  const p2somani = d.w;
  const n2k = d.pts as [ number, number ][];
  const s2qena = kf2NivelanS2qena(n2k, p2somani, k6h6L6da, tsasatlakak, hacakukkaj2sai);
// ⟨ j͑ʃᴜ ſɭ,w , ſɭɜ ſɭ,w , 📏 ⟩ , ſɭэ ֭ſɭэ , ꞙɭɿ , 📃 ⟩
  for ( let j = 0; j < s2qena.hal6da.length; j++ ) {
    const p = n2kJe(n2k, s2qena.haxekuxa[ j ]);
    const teru = s2qena.hal6da[ j ] - l6da(p.x, p.z);
    tanekSumo += teru;
    tanekNombro++;
    if ( teru > kmaTanek ) {
      kmaTanek = teru;
      tanekQar = `${p.x.toFixed(1)},${p.z.toFixed(1)} ſɭэ ֭ſɭэ ${i}`;
    }
    if ( -teru > kmaBoreo ) {
      kmaBoreo = -teru;
      boreoQar = `${p.x.toFixed(1)},${p.z.toFixed(1)} ſɭэ ֭ſɭэ ${i}`;
    }
    if ( -teru > 0o1/0o2 ) boritaj++;
  }
// ⟨ ſɭэ ſɭᴜ , ſɭэ ſɭ,w , ꞙɭı , 📏 ⟩
  let s0 = s2qena.haxekuxa[0], cutlu = s2qena.hal6da[0];
  for ( let j = 1; j < s2qena.hal6da.length; j++ ) {
    if ( s2qena.hal6da[j] !== cutlu ) {
      const sahakani = s2qena.haxekuxa[j] - s0;
      if ( sahakani > 0o10 ) tap2++;
      if ( sahakani > maksTap2 ) {
        maksTap2 = sahakani;
        const a = d.pts[0], b = d.pts[d.pts.length - 1];
        maksTap2K6h6 = `${a[0].toFixed(0)},${a[1].toFixed(0)} ｡ ${b[0].toFixed(0)},${b[1].toFixed(0)}`;
      }
      s0 = s2qena.haxekuxa[j];
      cutlu = s2qena.hal6da[j];
    }
  }
  for ( let j = 1; j < s2qena.hal6da.length; j++ ) {
    const s = Math.abs(s2qena.hal6da[j] - s2qena.hal6da[j - 1]);
    if ( s > 0o1/0o2 + 0o1/0o100 ) {
      shal6da++;
      const t = s2qena.haxekuxa[j] / s2qena.sahakani || 0;
      const a = d.pts[0], b = d.pts[d.pts.length - 1];
      const x = a[0] + ( b[0] - a[0] ) * t, z = a[1] + ( b[1] - a[1] ) * t;
      console.log(`  j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ${s.toFixed(3)} ｡ ſɭэ ֭ſɭэ ${i} s ${s2qena.haxekuxa[j].toFixed(1)}` +
        ` ( ${x.toFixed(1)},${z.toFixed(1)} ) ${s2qena.hal6da[j - 1].toFixed(2)}` +
        ` ｡ j͑ʃ'ɔ ŋᷠɹ ${s2qena.hal6da[j].toFixed(2)} ｡ ſɭɜ ſɭ,w ${l6da(x, z).toFixed(2)}`);
    }
    if ( s > maksSl6da ) maksSl6da = s;
  }
}
console.log(`ſɭэ ֭ſɭэ ʌ j͑ʃ'ɔ ŋᷠɹ ｡ ſɭэ }ʃᴜ ꞙɭıɔ ｡ ſɭэ }ʃᴜ ſןᴜ ${tap2} ｡ ſɭэ }ʃᴜ ɭl̀ᴜ ${maksTap2.toFixed(1)} @${maksTap2K6h6}`);
console.log(`j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ʌ j͑ʃᴜ ʌ ſɭɜ ſɭ,w ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${kmaTanek.toFixed(2)} @${tanekQar}` +
  ` ｡ ſȷƽᴜ ɭʃᴜ ${( tanekSumo / Math.max(1, tanekNombro) ).toFixed(2)}`);
console.log(`ſɭɜ ſɭ,w ɭl̀w ſȷw ɭl̀ᴜ ${kmaBoreo.toFixed(2)} @${boreoQar} ｡ ſᶘᴜ j͐ʃɹ ɭl̀w ${boritaj}`);
console.log(`ɭʃɜ }ʃᴜ ɭl̀ᴜ ſןᴜ ſᶘɹ ꞙɭııɔ.ɩ ${shal6da} ｡ j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${maksSl6da.toFixed(3)}`);

// ⟨ ſɭэ ֭ſɭэ , ꞙɭı , ⟅ ſɭэ ſɭᴜ , 📏 ⟩
const laqazu = Number(process.argv[2] ?? 0);
if ( havop2ni[laqazu] ) {
  const d = havop2ni[laqazu];
  const s2qena = kf2NivelanS2qena(d.pts as [ number, number ][], d.w, k6h6L6da, tsasatlakak, hacakukkaj2sai);
  const a = d.pts[0], b = d.pts[d.pts.length - 1];
  console.log(`⟨ ſɭэ ֭ſɭэ ${laqazu} ⟩ ( ${a[0].toFixed(1)}, ${a[1].toFixed(1)} ) ｡` +
    ` ( ${b[0].toFixed(1)}, ${b[1].toFixed(1)} ) ｡ ſɭэ }ʃᴜ ${s2qena.sahakani.toFixed(1)}`);
  const hax2pa: string[] = [];
  for ( let s = 0; s <= s2qena.sahakani; s += 0o4 ) {
    const t = s / s2qena.sahakani;
    const x = a[0] + ( b[0] - a[0] ) * t, z = a[1] + ( b[1] - a[1] ) * t;
    hax2pa.push(`${s.toFixed(0)}:${s2qena.l6daJe(s).toFixed(1)}/${l6da(x, z).toFixed(1)}`);
  }
  console.log("  ſɭэ ֭ſɭэ / ſɭɜ ſɭ,w " + hax2pa.join(" "));
}
console.log(`ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ${tikHaqakaj2().length}`);
