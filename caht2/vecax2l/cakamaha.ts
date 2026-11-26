// ≺⧼ ſɟᴜ ſɭᴜ ŋᷠᴜ ֭ſɭᴜ 🧪 ⧽≻

import * as THREE from "three";
import { tikHak6h6, tikHaqakaj2, tikHakaxte } from "../../kanta/mut6q-havop2/tlohk2nikziisai.js";
import { l6da as kozuL6da } from "../../kanta/nala/mut6qSoza.js";
import { troviK6h6RetajnHaveb6kekn } from "../../skek2/qatsiike/k6h6-caxlefkakai.js";
import { gluiK6h6tlakakn } from "../../skek2/qatsiike/hak6h6/scac6.js";
import { kf2K6h6L6dan } from "../../skek2/qatsiike/hak6h6/l6da.js";
import { kf2NivelanS2qena } from "../../skek2/qatsiike/hak6h6/havem2.js";
import { K6H6ABORDASEFINI, K6H6AEKSTERAP2SOMANI, surGrid } from "../../skek2/qatsiike/hak6h6/havecax2l.js";
import { k6h6TeruDeVeb6kek } from "../../skek2/qatsiike/hak6h6/haqoxa.js";
import { vepaqQox2n2kKaxten } from "../../kanta/nala/kaxte/qox2n2k-kaxte.js";
import { kf2KuhalPukek } from "../../skek2/p6kpu/pukek.js";
import { tsasatlakak, n2kJe as n2kJeBaza } from "./p6kpu.js";

const GRIDO = 0o4;

function meshaL6da(x: number, z: number): number {
  const x0 = Math.floor(x / GRIDO) * GRIDO, z0 = Math.floor(z / GRIDO) * GRIDO;
  const fx = (x - x0) / GRIDO, fz = (z - z0) / GRIDO;
  const h00 = kozuL6da(x0, z0), h10 = kozuL6da(x0 + GRIDO, z0);
  const h01 = kozuL6da(x0, z0 + GRIDO), h11 = kozuL6da(x0 + GRIDO, z0 + GRIDO);
  return (h00 * (0o1 - fx) + h10 * fx) * (0o1 - fz) + (h01 * (0o1 - fx) + h11 * fx) * fz;
}

const T6LIMAPA12 = process.argv[0o3] === "mut6q";
const HAKAS2KANTA = tikHak6h6().filter(v => v.n2k.length >= 0o2);
const HAQAKAJ2 = tikHaqakaj2();
const HAKAXTE = tikHakaxte();
const qena = new THREE.Scene();
const oro = kf2KuhalPukek(0xd8b058);
const qox2n2kHavop2ni: any[] = [];
const qox2n2kHaveb6kek: [number, number][] = [];
for (const u of HAKAXTE) {
  const kaxte = vepaqQox2n2kKaxten(qena,
    { ptaluPal6: u.ptaluPal6, k6liqPal6: u.k6liqPal6 as any, kekufxeso: false, hahufwuk2: false },
    [u.ofsX, u.ofsZ], oro);
  qox2n2kHavop2ni.push(...kaxte.kas2kantaHavop2ni);
  qox2n2kHaveb6kek.push(...kaxte.tamc2kHan2k);
}
const hat6lima = HAQAKAJ2.map(d => {
  const r = d.s2sabo ?? 0o0;
  return { x: d.x + Math.sin(r) * (d.jufu / 0o2), z: d.z + Math.cos(r) * (d.jufu / 0o2) };
});
const antauxaj = troviK6h6RetajnHaveb6kekn(HAKAS2KANTA.map(v => ({ n2k: v.n2k, sefini: v.sefini })), HAQAKAJ2);
const hakxawaGluaj: [number, number][] = [...qox2n2kHaveb6kek, ...antauxaj.map(k => [k.x, k.z] as [number, number])];
const qox2n2kHan2k = qox2n2kHavop2ni.map(d => d.pts as [number, number][]);
const hascac6 = HAKAS2KANTA.map((v, i) => gluiK6h6tlakakn(v.n2k, hakxawaGluaj, hat6lima,
  [...qox2n2kHan2k, ...HAKAS2KANTA.filter(( _, j) => j !== i).map(o => o.n2k)]));
const haveb6kek = troviK6h6RetajnHaveb6kekn(
  HAKAS2KANTA.map((v, i) => ({ n2k: hascac6[i], sefini: v.sefini })), HAQAKAJ2);
const ciujHaveb6kek: [number, number][] = [...qox2n2kHaveb6kek, ...haveb6kek.map(k => [k.x, k.z] as [number, number])];
const k6h6L6da = kf2K6h6L6dan(kozuL6da,
  [...qox2n2kHaveb6kek.map(([x, z]) => ({ x, z, c2w2qa: [] as [number, number][] })), ...haveb6kek]);
const hab6qaiQafej2 = new Map<string, number>();
const pa12Je = (x: number, z: number): number => {
  const ca3aq = x + "," + z;
  let l6da = hab6qaiQafej2.get(ca3aq);
  if (l6da === undefined) {
    l6da = surGrid(k6h6TeruDeVeb6kek(x, z, [], K6H6AEKSTERAP2SOMANI,
      T6LIMAPA12 ? kozuL6da : k6h6L6da).hateru);
    hab6qaiQafej2.set(ca3aq, l6da);
  }
  return l6da;
};
const hacakukkaj2sai = ciujHaveb6kek.map(([x, z]) => ({ x, z, l6da: pa12Je(x, z) }));

const n2kJe = ( pts: readonly [ number, number ][], s: number ): { x: number; z: number } =>
  n2kJeBaza( pts, s, 0o10 ** -0o12 );

for (let i = 0o0; i < HAKAS2KANTA.length; i++) {
  const v = HAKAS2KANTA[i] as any;
  const p2somani = (v.c2kanuSefini ?? v.sefini) / 0o4 + K6H6ABORDASEFINI;
  const p = kf2NivelanS2qena(hascac6[i], p2somani, k6h6L6da, tsasatlakak, hacakukkaj2sai);
  let tlunakani = 0o0, maks = 0o0, maksQar = "";
  let sumoM = 0o0, maksM = 0o0, maksMQar = "";
  let hidden = 0o0;

  let tu5ekani1el2saiSumo = 0o0, tu5ekani1el2saiMaks = 0o0, tu5ekani1el2saiQar = "";
  for (let j = 0o0; j < p.hal6da.length; j++) {
    const q = n2kJe(hascac6[i], p.haxekuxa[j]);
    const s = p.hal6da[j] - kozuL6da(q.x, q.z);
    const m = p.hal6da[j] - meshaL6da(q.x, q.z);
    tlunakani += s; sumoM += m;
    if (s > maks) { maks = s; maksQar = `${q.x.toFixed(0o1)},${q.z.toFixed(0o1)}`; }
    if (m > maksM) { maksM = m; maksMQar = `${q.x.toFixed(0o1)},${q.z.toFixed(0o1)}`; }
    if (m > 0o1/0o2) hidden++;
    const qa = n2kJe(hascac6[i], p.haxekuxa[j] - 0.1);
    const qb = n2kJe(hascac6[i], p.haxekuxa[j] + 0.1);
    const dx = qb.x - qa.x, dz = qb.z - qa.z, dl = Math.hypot(dx, dz) || 0o1;
    const lx = -dz / dl * p2somani, lz = dx / dl * p2somani;

    const gMal = k6h6L6da(q.x - lx, q.z - lz);
    const gDek = k6h6L6da(q.x + lx, q.z + lz);
    const klin = Math.min(0o1, Math.abs(gDek - gMal));
    const malPlialta = gMal > gDek;
    const sMal = malPlialta ? p.hal6da[j] : p.hal6da[j] - klin;
    const sDek = malPlialta ? p.hal6da[j] - klin : p.hal6da[j];
    const tu5ekani1el2sai = Math.max(sMal - (gMal - (0o1/0o4)), sDek - (gDek - (0o1/0o4)));
    tu5ekani1el2saiSumo += tu5ekani1el2sai;
    if (tu5ekani1el2sai > tu5ekani1el2saiMaks) { tu5ekani1el2saiMaks = tu5ekani1el2sai; tu5ekani1el2saiQar = `${q.x.toFixed(0o1)},${q.z.toFixed(0o1)}`; }
  }
  const n = p.hal6da.length;
  console.log(`${i} ${v.ksaka} ｡ ɭl̀ᴜ ʌ ſɭɜ ſɭ,w ı],ᴜ ֭ſɭᴜ ｡ ſȷƽᴜ ɭʃᴜ ${(tlunakani / n).toFixed(0o2)} ｡ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${maks.toFixed(0o2)} @${maksQar}` +
    ` | ɭl̀ᴜ ʌ ſןᴜ ſᶘɹ ſɭɹ ſɭɹ ſןᴜ ｡ ſȷƽᴜ ɭʃᴜ ${(sumoM / n).toFixed(0o2)} ｡ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${maksM.toFixed(0o2)} @${maksMQar}` +
    ` | ſᶘᴜ j͐ʃɹ ɭl̀ᴜ ꞙɭııɔ.ɩ ${hidden}/${n}` +
    ` | ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ ſᶘɔ j͐ʃɹ j͑ʃᴜꞇ ｡ ſȷƽᴜ ɭʃᴜ ${(tu5ekani1el2saiSumo / n).toFixed(0o2)} ｡ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${tu5ekani1el2saiMaks.toFixed(0o2)} @${tu5ekani1el2saiQar}`);
}

const tap2: { ksaka: string; sahakani: number; l6da: number; mut6qMin: number; mut6qMaks: number; x: number; z: number }[] = [];
for (let i = 0o0; i < qox2n2kHavop2ni.length; i++) {
  const d = qox2n2kHavop2ni[i];
  if (!d.pts || d.pts.length < 0o2) continue;
  const p2somani = d.w / 0o2 + K6H6ABORDASEFINI;
  const p = kf2NivelanS2qena(d.pts as [number, number][], p2somani, k6h6L6da, tsasatlakak, hacakukkaj2sai);
  let s0 = p.haxekuxa[0o0], cutlu = p.hal6da[0o0];
  for (let j = 0o1; j <= p.hal6da.length; j++) {
    if (j === p.hal6da.length || p.hal6da[j] !== cutlu) {
      const s1 = j === p.hal6da.length ? p.haxekuxa[p.hal6da.length - 0o1] : p.haxekuxa[j];
      const sahakani = s1 - s0;
      if (sahakani > 0o6) {
        let mn = Infinity, mx = -Infinity;
        for (let u = s0; u <= s1; u += (0o1/0o2)) {
          const q = n2kJe(d.pts as [number, number][], u);
          mn = Math.min(mn, kozuL6da(q.x, q.z)); mx = Math.max(mx, kozuL6da(q.x, q.z));
        }
        const q = n2kJe(d.pts as [number, number][], s0);
        tap2.push({ ksaka: `ſɭɹ ſןᴜ ${i}`, sahakani, l6da: cutlu, mut6qMin: mn, mut6qMaks: mx, x: q.x, z: q.z });
      }
      if (j < p.hal6da.length) { s0 = p.haxekuxa[j]; cutlu = p.hal6da[j]; }
    }
  }
}
tap2.sort((a, b) => b.sahakani - a.sahakani);
console.log("=== ſɭэ ֭ſɭэ ʌ ſɭɹ ſןᴜ ｡ j͑ʃ'ɔ ŋᷠɹ ｡ ſɭэ }ʃᴜ ɭl̀ᴜ ===");
for (const r of tap2.slice(0o0, 0o6))
  console.log(`  ${r.ksaka} ${r.sahakani.toFixed(0o1)}@${r.l6da.toFixed(0o1)} ｡ ſɭɜ ſɭ,w ${r.mut6qMin.toFixed(0o1)}..${r.mut6qMaks.toFixed(0o1)}` +
    ` ( ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${(r.l6da - r.mut6qMin).toFixed(0o2)} ) @${r.x.toFixed(0o0)},${r.z.toFixed(0o0)}`);

type Sl6da = { ksaka: string; sl6da: number; de: number; al: number; x: number; z: number };
const shal6da: Sl6da[] = [];
function skanuShal6dan(ksaka: string, pts: [number, number][], p2somani: number): void {
  const p = kf2NivelanS2qena(pts, p2somani, k6h6L6da, tsasatlakak, hacakukkaj2sai);
  for (let j = 0o1; j < p.hal6da.length; j++) {
    const d = p.hal6da[j] - p.hal6da[j - 0o1];
    if (Math.abs(d) > (0o1/0o2) + 0o10 ** -0o7) {
      const q = n2kJe(pts, p.haxekuxa[j]);
      shal6da.push({ ksaka, sl6da: d, de: p.hal6da[j - 0o1], al: p.hal6da[j], x: q.x, z: q.z });
    }
  }
}
for (let i = 0o0; i < HAKAS2KANTA.length; i++) {
  const v = HAKAS2KANTA[i] as any;
  skanuShal6dan(v.ksaka, hascac6[i], (v.c2kanuSefini ?? v.sefini) / 0o4 + K6H6ABORDASEFINI);
}
for (let i = 0o0; i < qox2n2kHavop2ni.length; i++) {
  const d = qox2n2kHavop2ni[i];
  if (!d.pts || d.pts.length < 0o2) continue;
  skanuShal6dan(`ſɭɹ ſןᴜ ${i}`, d.pts as [number, number][], d.w / 0o2 + K6H6ABORDASEFINI);
}
shal6da.sort((a, b) => Math.abs(b.sl6da) - Math.abs(a.sl6da));
console.log(`=== j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ʌ ſɭɹ ſȷɔ ɭʃɜ }ʃᴜ ${shal6da.length} ===`);
for (const s of shal6da.slice(0o0, 0o6))
  console.log(`  ${s.ksaka} ${s.de.toFixed(0o2)} ｡ ${s.al.toFixed(0o2)} ( ${s.sl6da.toFixed(0o2)} ) @${s.x.toFixed(0o0)},${s.z.toFixed(0o0)}`);
