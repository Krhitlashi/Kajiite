// ≺⧼ ការវាស់ស្ពានថ្មី 🧪 ⧽≻
// ⟨ មើលថាតើផ្លូវឆ្លងទឹកទាំងអស់ក្លាយជាស្ពាន , ផ្ទៃស្ពានផុតទឹក ,
// ស្ពានរត់តាមបន្ទាត់ផ្លូវ , និងគ្មានជំហានលោតធំតាមបណ្តោយផ្លូវ ។ 📃 ⟩
import { aktivajVojoj, aktivajDokoj } from "../../kantaoj/tero-datumaro/rultempo.js";
import { alteco, akvaNivelo } from "../../kantaoj/mondo/tereno.js";
import { troviVojaRetajnKunigojn } from "../../eskekoj/medio/voj-reto.js";
import { PONT_AKVA_KLARANCO } from "../../eskekoj/medio/doko/ponto.js";
import { cxuVeraAkvo, pontaFinAlto, vojaSupro } from "./komunaj.js";
import { konstruiPontanProfilon, havasAkvanTrunkon,
  kreiPontanAkvanTeston } from "../../eskekoj/medio/vojoj/ponto-profilo.js";

const VOJOJ = aktivajVojoj();
const DOKOJ = aktivajDokoj();
console.log("vojoj", VOJOJ.length, "dokoj", DOKOJ.length);

const retaj = VOJOJ.filter(v => v.n2k.length >= 2).map(v => ({ n2k: v.n2k, sefini: v.sefini }));
const kunigoj = troviVojaRetajnKunigojn(retaj, DOKOJ);

let pontoNombro = 0, trakNombro = 0, difektoj = 0;
for (let v = 0; v < VOJOJ.length; v++) {
  const k6h6 = VOJOJ[v];
  if (k6h6.n2k.length < 2) continue;
  const w = k6h6.pontoLarĝo ?? k6h6.sefini;
  const cxuPontaAkvo = kreiPontanAkvanTeston(k6h6.n2k, w, cxuVeraAkvo);
  const akva = havasAkvanTrunkon(k6h6.n2k, cxuPontaAkvo);
  if (!akva) { console.log(`k6h6 ${v} ${k6h6.ksaka} , គ្មានស្ពាន`); continue; }
  pontoNombro++;
  const akvaSupro = (x: number, z: number) =>
    cxuPontaAkvo(x, z) ? akvaNivelo(x, z) + PONT_AKVA_KLARANCO : -Infinity;
  const s2qena = konstruiPontanProfilon(k6h6.n2k, w, vojaSupro,
    akvaSupro, ( x, z, sefini ) => pontaFinAlto(x, z, sefini, kunigoj));
  // ⟨ ជម្រាលតាមបណ្តោយផ្លូវ 📃 ⟩
  let maksSalto = 0, saltoLoko = 0;
  let antaŭa = s2qena.l6da(k6h6.n2k[0][0], k6h6.n2k[0][1]);
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
      if (Math.abs(h - antaŭa) > maksSalto) { maksSalto = Math.abs(h - antaŭa); saltoLoko = vepat6ni; }
      antaŭa = h;
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
    let antaŭaT = trako.deko(0);
    for (let i = 0; i <= specimenoj; i++) {
      const t = i / specimenoj;
      const px = trako.ax + difX * t, pz = trako.az + difZ * t;
      const deka = trako.deko(t);
      maksSaltoTrako = Math.max(maksSaltoTrako, Math.abs(deka - antaŭaT));
      antaŭaT = deka;
      // ⟨ ចម្ងាយពីបន្ទាត់ផ្លូវ 📃 ⟩
      if (!cxuPontaAkvo(px, pz)) {
        subTero = Math.max(subTero, alteco(px, pz) - deka);
        superTero = Math.max(superTero, deka - vojaSupro(px, pz, w));
      } else {
        const klar = deka - akvaNivelo(px, pz);
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
console.log(`ផ្លូវមានស្ពាន ${pontoNombro} , ត្រប់ ${trakNombro} , បញ្ហា ${difektoj}`);
