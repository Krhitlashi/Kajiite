// ≺⧼ j͑ʃɔ ſȷɔ j͑ʃᴜꞇ ʌ ſɟɹƽ ꞁȷ̀ᴜ }ʃw ʌ j͑ʃɹ ſɟᴜ ı],ɹͷ̗ 🧪 ⧽≻
// ⟨ ſɭэ ֭ſɭэ ʌ j͑ʃᴜꞇ ʌ ſᶘᴜ j͑ʃᴜ ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ſɟɹƽ ꞁȷ̀ᴜ }ʃw ʌ j͑ʃɜ ſɭ,ᴜ
// ſɟɹƽ ꞁȷ̀ᴜ }ʃw ʌ ſɭэ ֭ſɭэ , ꞙɭɔ ʌ ſɟᴜ ſɟᴜ ſןɹ ʌ ſɭᴜ ſɭ,w j͐ʃᴜ 📃 ⟩
import { tikHak6h6, tikHaqakaj2 } from "../../kanta/t6lima-havop2/tlohk2nikziisai.js";
import { l6da, tsasaVem2 } from "../../kanta/nala/t6limaSoza.js";
import { troviK6h6RetajnHaveb6kekn } from "../../skek2/qatsiike/k6h6-caxlefkakai.js";
import { PONTAKVAKLARANCO } from "../../skek2/qatsiike/qakaj2/c2kanu.js";
import { tsekeVeraTsasa, pontaFinL6da, k6h6Teru } from "./x2x2q.js";
import { vepaqPontanS2qena, havasAkvanTrunkon,
  kf2PontanAkvanTeston } from "../../skek2/qatsiike/hak6h6/c2kanu-profilo.js";

const HAKAS2KANTA = tikHak6h6();
const HAQAKAJ2 = tikHaqakaj2();
console.log("hak6h6", HAKAS2KANTA.length, "haqakaj2", HAQAKAJ2.length);

const hacaxlefkakai = HAKAS2KANTA.filter(v => v.n2k.length >= 2).map(v => ({ n2k: v.n2k, sefini: v.sefini }));
const haveb6kek = troviK6h6RetajnHaveb6kekn(hacaxlefkakai, HAQAKAJ2);

let c2kanuNombro = 0, trakNombro = 0, difektoj = 0;
for (let v = 0; v < HAKAS2KANTA.length; v++) {
  const k6h6 = HAKAS2KANTA[v];
  if (k6h6.n2k.length < 2) continue;
  const w = k6h6.c2kanuSefini ?? k6h6.sefini;
  const tsekePontaTsasa = kf2PontanAkvanTeston(k6h6.n2k, w, tsekeVeraTsasa);
  const tsasa = havasAkvanTrunkon(k6h6.n2k, tsekePontaTsasa);
  if (!tsasa) { console.log(`k6h6 ${v} ${k6h6.ksaka} , ꞙɭɔ ʌ ſɟɹƽ ꞁȷ̀ᴜ }ʃw`); continue; }
  c2kanuNombro++;
  const tsasaTeru = (x: number, z: number) =>
    tsekePontaTsasa(x, z) ? tsasaVem2(x, z) + PONTAKVAKLARANCO : -Infinity;
  const s2qena = vepaqPontanS2qena(k6h6.n2k, w, k6h6Teru,
    tsasaTeru, ( x, z, sefini ) => pontaFinL6da(x, z, sefini, haveb6kek));
  // ⟨ ֭ſɭᴜ ſ͔ɭᴜ ʌ ſɭэ ֭ſɭэ 📃 ⟩
  let maksSl6da = 0, sl6daQar = 0;
  let ne3ak2 = s2qena.l6da(k6h6.n2k[0][0], k6h6.n2k[0][1]);
  let vepat6ni = 0;
  for (let s = 0; s < k6h6.n2k.length - 1; s++) {
    const [ax, az] = k6h6.n2k[s];
    const [bx, bz] = k6h6.n2k[s + 1];
    const sahakani = Math.hypot(bx - ax, bz - az);
    const n = Math.max(4, Math.round(sahakani * 2));
    for (let k = 1; k <= n; k++) {
      const t = k / n;
      const x = ax + (bx - ax) * t, z = az + (bz - az) * t;
      const h = s2qena.l6da(x, z);
      vepat6ni += sahakani / n;
      if (Math.abs(h - ne3ak2) > maksSl6da) { maksSl6da = Math.abs(h - ne3ak2); sl6daQar = vepat6ni; }
      ne3ak2 = h;
    }
  }
  console.log(`k6h6 ${v} ${k6h6.ksaka} , t2bakobesai=${s2qena.t2bakobesai.length}` +
    ` maksSl6da=${maksSl6da.toFixed(3)} @${sl6daQar.toFixed(1)}`);
  for (const t2bakobesai of s2qena.t2bakobesai) {
    trakNombro++;
    const difX = t2bakobesai.bx - t2bakobesai.ax, difZ = t2bakobesai.bz - t2bakobesai.az;
    const sahakani = Math.hypot(difX, difZ);
    const hapxeutso = Math.max(0o20, Math.round(sahakani * 4));
    let minKlar = Infinity, minQar = 0, subTsasa = 0, subT6lima = 0, superT6lima = 0;
    let maksSl6daT2bakobesai = 0;
    let ne3ak2T = t2bakobesai.deko(0);
    for (let i = 0; i <= hapxeutso; i++) {
      const t = i / hapxeutso;
      const px = t2bakobesai.ax + difX * t, pz = t2bakobesai.az + difZ * t;
      const deka = t2bakobesai.deko(t);
      maksSl6daT2bakobesai = Math.max(maksSl6daT2bakobesai, Math.abs(deka - ne3ak2T));
      ne3ak2T = deka;
      // ⟨ ֭ſɭэ ſɭw }ʃꞇ ʌ ſɭэ ֭ſɭэ 📃 ⟩
      if (!tsekePontaTsasa(px, pz)) {
        subT6lima = Math.max(subT6lima, l6da(px, pz) - deka);
        superT6lima = Math.max(superT6lima, deka - k6h6Teru(px, pz, w));
      } else {
        const klar = deka - tsasaVem2(px, pz);
        if (klar < minKlar) { minKlar = klar; minQar = i; }
        if (klar <= 0) subTsasa++;
      }
    }
    const difekta = subTsasa > 0 || minKlar < PONTAKVAKLARANCO - 0o10 ** -0o7 || maksSl6daT2bakobesai > 0.3;
    if (difekta) difektoj++;
    console.log(`  t2bakobesai ${t2bakobesai.ax.toFixed(1)},${t2bakobesai.az.toFixed(1)}` +
      ` -> ${t2bakobesai.bx.toFixed(1)},${t2bakobesai.bz.toFixed(1)}` +
      ` sahakani=${sahakani.toFixed(1)} minKlar=${minKlar === Infinity ? "-" : minKlar.toFixed(3)} @${(minQar / hapxeutso).toFixed(2)}` +
      ` subTsasa=${subTsasa} subT6lima=${subT6lima.toFixed(2)} superT6lima=${superT6lima.toFixed(2)}` +
      `${difekta ? "  ⚠" : ""}`);
  }
}
console.log(`ſɭэ ֭ſɭэ ſɟɹƽ ꞁȷ̀ᴜ }ʃw ${c2kanuNombro} , ſɭɹ ʃᴜ ſɭɜ ʃɔ j͑ʃᴜꞇ ${trakNombro} , ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ${difektoj}`);
