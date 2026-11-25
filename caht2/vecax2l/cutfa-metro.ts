// ≺⧼ ſɭˬᴜ ſɟɹ ɽ͑ʃ'ɔƽ ʌ j͐ʃэ ɭ(ᴜ ʌ j͑ʃᴜƽ ſןw ʌ ſɭɜ ſɭ,w 📏 ⧽≻
// ⟨ ſɭэ ֭ſɭэ , ꞙɭɿ , ſɭɜ ſɭ,w , ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ , ꞙɭı , 📃 ⟩
import * as THREE from "three";
import { tikHak6h6, tikHaqakaj2, tikHakaxte } from "../../kanta/t6lima-havop2/tlohk2nikziisai.js";
import { l6da as kozuL6da } from "../../kanta/nala/t6limaSoza.js";
import { troviK6h6RetajnHaveb6kekn } from "../../skek2/qatsiike/k6h6-caxlefkakai.js";
import { gluiK6h6tlakakn } from "../../skek2/qatsiike/hak6h6/scac6.js";
import { kf2K6h6L6dan } from "../../skek2/qatsiike/hak6h6/l6da.js";
import { kf2NivelanS2qena } from "../../skek2/qatsiike/hak6h6/havem2.js";
import { K6H6ABORDASEFINI, K6H6AEKSTERAP2SOMANI, surGrid, STUPARISERO } from "../../skek2/qatsiike/hak6h6/havecax2l.js";
import { k6h6TeruDeVeb6kek } from "../../skek2/qatsiike/hak6h6/haqoxa.js";
import { vepaqKradanKaxten } from "../../kanta/nala/kaxte/krada-kaxte.js";
import { kf2KuhalPukek } from "../../skek2/x2x2q/pukek.js";
import { tsasatlakak, n2kJe as n2kJeBaza } from "./x2x2q.js";

const CXUURBO = process.argv[2] !== "sen";
const GRANDO = Number(process.argv[3] ?? 4);
const OFSX = Number(process.argv[4] ?? 0o10);
const OFSZ = Number(process.argv[5] ?? 0);
const T6LIMAPA12 = process.argv[6] === "t6lima";
const HAKAS2KANTA = tikHak6h6().filter(v => v.n2k.length >= 2);
const HAQAKAJ2 = tikHaqakaj2();
const HAKAXTE = tikHakaxte();

const qena = new THREE.Scene();
const oro = kf2KuhalPukek(0xd8b45a);
const qox2n2kHavop2ni: any[] = [];
const qox2n2kHaveb6kek: [number, number][] = [];
if (CXUURBO) {
  const kaxteCatsara = HAKAXTE.length ? HAKAXTE
    : [{ ksaka: "Geles", ptaluPal6: GRANDO, k6liqPal6: "vakox2qita", ofsX: OFSX, ofsZ: OFSZ }];
  for (const u of kaxteCatsara) {
    const kaxte = vepaqKradanKaxten(qena,
      { ptaluPal6: u.ptaluPal6, k6liqPal6: u.k6liqPal6 as any, kekufxeso: false, hahufwuk2: false },
      [u.ofsX, u.ofsZ], oro);
    qox2n2kHavop2ni.push(...kaxte.kas2kantaHavop2ni);
    qox2n2kHaveb6kek.push(...kaxte.tamc2kHan2k);
  }
}
const hat6lima = HAQAKAJ2.map(d => {
  const r = d.s2sabo ?? 0;
  return { x: d.x + Math.sin(r) * (d.jufu / 2), z: d.z + Math.cos(r) * (d.jufu / 2) };
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

// ⟨ ı],ᴜ ֭ſɭᴜ , ſɭɜ ſɭᴜ , ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
const n2kJe = ( pts: readonly [ number, number ][], s: number ): { x: number; z: number } =>
  n2kJeBaza( pts, s, 0o10 ** -0o12 );

let tlunakani = 0, k2fe = 0, maks = 0, maksQar = "", boritaj = 0, kmaBoreo = 0;
let maksTap2 = 0, maksTap2K6h6 = "", shal6da = 0, maksSl6da = 0;
for (let i = 0; i < HAKAS2KANTA.length; i++) {
  const v = HAKAS2KANTA[i] as any;
  const p = kf2NivelanS2qena(hascac6[i], (v.c2kanuSefini ?? v.sefini) / 4 + K6H6ABORDASEFINI,
    k6h6L6da, tsasatlakak, hacakukkaj2sai);
  let radaSumo = 0, radaMaks = 0;
  for (let j = 0; j < p.hal6da.length; j++) {
    const q = n2kJe(hascac6[i], p.haxekuxa[j]);
    const teru = p.hal6da[j] - kozuL6da(q.x, q.z);
    tlunakani += teru; k2fe++;
    radaSumo += teru;
    if (teru > radaMaks) radaMaks = teru;
    if (teru > maks) { maks = teru; maksQar = `${q.x.toFixed(1)},${q.z.toFixed(1)} ſɭэ ֭ſɭэ ${i}`; }
    if (-teru > kmaBoreo) kmaBoreo = -teru;
    if (-teru > STUPARISERO) boritaj++;
  }
  let s0 = p.haxekuxa[0], cutlu = p.hal6da[0];
  let radaTap2 = 0;
  const sahakj: string[] = [];
  for (let j = 1; j < p.hal6da.length; j++) {
    if (p.hal6da[j] !== cutlu) {
      const sahakani = p.haxekuxa[j] - s0;
      if (sahakani > 4) {
        const qa = n2kJe(hascac6[i], s0), qb = n2kJe(hascac6[i], p.haxekuxa[j]);
        let malk = Infinity, maksG = -Infinity;
        for (let u = s0; u <= p.haxekuxa[j]; u += 0.5) {
          const qq = n2kJe(hascac6[i], u);
          malk = Math.min(malk, kozuL6da(qq.x, qq.z));
          maksG = Math.max(maksG, kozuL6da(qq.x, qq.z));
        }
        sahakj.push(`${s0.toFixed(0)}..${p.haxekuxa[j].toFixed(0)}@${cutlu.toFixed(1)}` +
          ` ſɭɜ ſɭ,w ${malk.toFixed(1)}..${maksG.toFixed(1)} ( ${qa.x.toFixed(0)},${qa.z.toFixed(0)} )`);
      }
      if (sahakani > radaTap2) radaTap2 = sahakani;
      if (sahakani > maksTap2) {
        maksTap2 = sahakani;
        const q = n2kJe(hascac6[i], s0);
        maksTap2K6h6 = `${q.x.toFixed(0)},${q.z.toFixed(0)} ſɭэ ֭ſɭэ ${i}`;
      }
      s0 = p.haxekuxa[j]; cutlu = p.hal6da[j];
    }
  }
  for (let j = 1; j < p.hal6da.length; j++) {
    const s = Math.abs(p.hal6da[j] - p.hal6da[j - 1]);
    if (s > STUPARISERO + 0o10 ** -0o7) { shal6da++; if (s > maksSl6da) maksSl6da = s; }
  }
  const a = hascac6[i][0], b = hascac6[i][hascac6[i].length - 1];
  const ma = kozuL6da(a[0], a[1]), mb = kozuL6da(b[0], b[1]);
  console.log(`${i} ${v.ksaka} ｡ ɭl̀ᴜ ʌ ſɭɜ ſɭ,w ｡ ſȷƽᴜ ɭʃᴜ ${(radaSumo / p.hal6da.length).toFixed(2)}` +
    ` ｡ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${radaMaks.toFixed(2)} ｡ j͑ʃ'ɔ ŋᷠɹ ｡ ſɭэ }ʃᴜ ɭl̀ᴜ ${radaTap2.toFixed(1)}` +
    ` ｡ ᶅſэ ſ͕ɭᴜ ${(p.hal6da[0] - ma).toFixed(2)} / ${(p.hal6da[p.hal6da.length - 1] - mb).toFixed(2)}`);
  for (const r of sahakj) console.log(`    j͑ʃ'ɔ ŋᷠɹ ${r}`);
}
console.log(`ſɭɹ ſᶘɔ ｡ ſȷƽᴜ ɭʃᴜ ${(tlunakani / k2fe).toFixed(2)} ｡ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${maks.toFixed(2)} @${maksQar}` +
  ` ｡ ɭl̀w ſȷw ${kmaBoreo.toFixed(2)} ｡ ſᶘᴜ j͐ʃɹ ɭl̀w ${boritaj}` +
  ` ｡ j͑ʃ'ɔ ŋᷠɹ ｡ ſɭэ }ʃᴜ ɭl̀ᴜ ${maksTap2.toFixed(1)} @${maksTap2K6h6}` +
  ` ｡ ɭʃɜ }ʃᴜ ɭl̀ᴜ ${shal6da} ｡ j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ${maksSl6da.toFixed(3)}`);
console.log(CXUURBO ? `ſɭᴜ ı],ƨɔ ʌ j͑ʃᴜ ｡ ${qox2n2kHaveb6kek.length} ｡ }ʃɹƽ` : "ſןɔ ʌ ſɭᴜ ı],ƨɔ");
