// ≺⧼ j͑ʃɔ ſȷɔ j͑ʃᴜꞇ ʌ ſɟɹƽ ꞁȷ̀ᴜ }ʃw ʌ j͑ʃɹ ſɟᴜ ı],ɹͷ̗ 🧪 ⧽≻
// ⟨ ſɭэ ֭ſɭэ ʌ j͑ʃᴜꞇ ʌ ſᶘᴜ j͑ʃᴜ ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ſɟɹƽ ꞁȷ̀ᴜ }ʃw ʌ j͑ʃɜ ſɭ,ᴜ
// ſɟɹƽ ꞁȷ̀ᴜ }ʃw ʌ ſɭэ ֭ſɭэ , ꞙɭɔ ʌ ſɟᴜ ſɟᴜ ſןɹ ʌ ſɭᴜ ſɭ,w j͐ʃᴜ 📃 ⟩
import { aktivajHak6h6, aktivajHaqakaj2 } from "../../kantaoj/tero-datumaro/rultempo.js";
import { alteco, akvaVem2 } from "../../kantaoj/mondo/tereno.js";
import { troviK6h6RetajnHaveb6kekn } from "../../eskekoj/medio/voj-reto.js";
import { PONT_AKVA_KLARANCO } from "../../eskekoj/medio/qakaj2/ponto.js";
import { tsekeVeraAkvo, pontaFinAlto, k6h6Supro } from "./komunaj.js";
import { vepaqPontanProfilon, havasAkvanTrunkon,
  kf2PontanAkvanTeston } from "../../eskekoj/medio/hak6h6/ponto-profilo.js";

const VOJOJ = aktivajHak6h6();
const DOKOJ = aktivajHaqakaj2();
console.log("hak6h6", VOJOJ.length, "haqakaj2", DOKOJ.length);

const retaj = VOJOJ.filter(v => v.n2k.length >= 2).map(v => ({ n2k: v.n2k, sefini: v.sefini }));
const haveb6kek = troviK6h6RetajnHaveb6kekn(retaj, DOKOJ);

let pontoNombro = 0, trakNombro = 0, difektoj = 0;
for (let v = 0; v < VOJOJ.length; v++) {
  const k6h6 = VOJOJ[v];
  if (k6h6.n2k.length < 2) continue;
  const w = k6h6.pontoSefini ?? k6h6.sefini;
  const tsekePontaAkvo = kf2PontanAkvanTeston(k6h6.n2k, w, tsekeVeraAkvo);
  const akva = havasAkvanTrunkon(k6h6.n2k, tsekePontaAkvo);
  if (!akva) { console.log(`k6h6 ${v} ${k6h6.ksaka} , ꞙɭɔ ʌ ſɟɹƽ ꞁȷ̀ᴜ }ʃw`); continue; }
  pontoNombro++;
  const akvaSupro = (x: number, z: number) =>
    tsekePontaAkvo(x, z) ? akvaVem2(x, z) + PONT_AKVA_KLARANCO : -Infinity;
  const s2qena = vepaqPontanProfilon(k6h6.n2k, w, k6h6Supro,
    akvaSupro, ( x, z, sefini ) => pontaFinAlto(x, z, sefini, haveb6kek));
  // ⟨ ֭ſɭᴜ ſ͔ɭᴜ ʌ ſɭэ ֭ſɭэ 📃 ⟩
  let maksSalto = 0, saltoLoko = 0;
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
      if (Math.abs(h - ne3ak2) > maksSalto) { maksSalto = Math.abs(h - ne3ak2); saltoLoko = vepat6ni; }
      ne3ak2 = h;
    }
  }
  console.log(`k6h6 ${v} ${k6h6.ksaka} , trakoj=${s2qena.trakoj.length}` +
    ` maksSalto=${maksSalto.toFixed(3)} @${saltoLoko.toFixed(1)}`);
  for (const trako of s2qena.trakoj) {
    trakNombro++;
    const difX = trako.bx - trako.ax, difZ = trako.bz - trako.az;
    const sahakani = Math.hypot(difX, difZ);
    const specimenoj = Math.max(0o20, Math.round(sahakani * 4));
    let minKlar = Infinity, minLoko = 0, subAkvo = 0, subTero = 0, superTero = 0;
    let maksSaltoTrako = 0;
    let ne3ak2T = trako.deko(0);
    for (let i = 0; i <= specimenoj; i++) {
      const t = i / specimenoj;
      const px = trako.ax + difX * t, pz = trako.az + difZ * t;
      const deka = trako.deko(t);
      maksSaltoTrako = Math.max(maksSaltoTrako, Math.abs(deka - ne3ak2T));
      ne3ak2T = deka;
      // ⟨ ֭ſɭэ ſɭw }ʃꞇ ʌ ſɭэ ֭ſɭэ 📃 ⟩
      if (!tsekePontaAkvo(px, pz)) {
        subTero = Math.max(subTero, alteco(px, pz) - deka);
        superTero = Math.max(superTero, deka - k6h6Supro(px, pz, w));
      } else {
        const klar = deka - akvaVem2(px, pz);
        if (klar < minKlar) { minKlar = klar; minLoko = i; }
        if (klar <= 0) subAkvo++;
      }
    }
    const difekta = subAkvo > 0 || minKlar < PONT_AKVA_KLARANCO - 0o10 ** -0o7 || maksSaltoTrako > 0.3;
    if (difekta) difektoj++;
    console.log(`  trako ${trako.ax.toFixed(1)},${trako.az.toFixed(1)}` +
      ` -> ${trako.bx.toFixed(1)},${trako.bz.toFixed(1)}` +
      ` sahakani=${sahakani.toFixed(1)} minKlar=${minKlar === Infinity ? "-" : minKlar.toFixed(3)} @${(minLoko / specimenoj).toFixed(2)}` +
      ` subAkvo=${subAkvo} subTero=${subTero.toFixed(2)} superTero=${superTero.toFixed(2)}` +
      `${difekta ? "  ⚠" : ""}`);
  }
}
console.log(`ſɭэ ֭ſɭэ ſɟɹƽ ꞁȷ̀ᴜ }ʃw ${pontoNombro} , ſɭɹ ʃᴜ ſɭɜ ʃɔ j͑ʃᴜꞇ ${trakNombro} , ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ${difektoj}`);
