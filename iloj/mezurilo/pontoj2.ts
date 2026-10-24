// ≺⧼ ការវាស់ស្ពានថ្មី 🧪 ⧽≻
// ⟨ មើលថាតើផ្លូវឆ្លងទឹកទាំងអស់ក្លាយជាស្ពាន , ផ្ទៃស្ពានផុតទឹក ,
// ស្ពានរត់តាមបន្ទាត់ផ្លូវ , និងគ្មានជំហានលោតធំតាមបណ្តោយផ្លូវ ។ 📃 ⟩
import { aktivajVojoj, aktivajDokoj } from "../../kantaoj/tero-datumaro/rultempo.js";
import { alteco, akvaNivelo } from "../../kantaoj/mondo/tereno.js";
import { troviVojaRetajnKunigojn } from "../../eskekoj/medio/voj-reto.js";
import { PONT_AKVA_KLARANCO } from "../../eskekoj/medio/doko/ponto.js";
import { cxuVeraAkvo, pontaFinAlto, vojaSupro } from "./komunaj.js";
import { konstruiPontanProfilon, havasAkvanTrunkon,
  kreiPontanAkvanTeston } from "../../kantaoj/mondo/urbo/ponto-profilo.js";

const VOJOJ = aktivajVojoj();
const DOKOJ = aktivajDokoj();
console.log("vojoj", VOJOJ.length, "dokoj", DOKOJ.length);

const retaj = VOJOJ.filter(v => v.punktoj.length >= 2).map(v => ({ punktoj: v.punktoj, larĝo: v.larĝo }));
const kunigoj = troviVojaRetajnKunigojn(retaj, DOKOJ);

let pontoNombro = 0, trakNombro = 0, difektoj = 0;
for (let v = 0; v < VOJOJ.length; v++) {
  const vojo = VOJOJ[v];
  if (vojo.punktoj.length < 2) continue;
  const w = vojo.pontoLarĝo ?? vojo.larĝo;
  const cxuPontaAkvo = kreiPontanAkvanTeston(vojo.punktoj, w, cxuVeraAkvo);
  const akva = havasAkvanTrunkon(vojo.punktoj, cxuPontaAkvo);
  if (!akva) { console.log(`vojo ${v} ${vojo.nomo} , គ្មានស្ពាន`); continue; }
  pontoNombro++;
  const akvaSupro = (x: number, z: number) =>
    cxuPontaAkvo(x, z) ? akvaNivelo(x, z) + PONT_AKVA_KLARANCO : -Infinity;
  const profilo = konstruiPontanProfilon(vojo.punktoj, w, vojaSupro,
    akvaSupro, ( x, z, larĝo ) => pontaFinAlto(x, z, larĝo, kunigoj));
  // ⟨ ជម្រាលតាមបណ្តោយផ្លូវ 📃 ⟩
  let maksSalto = 0, saltoLoko = 0;
  let antaŭa = profilo.alto(vojo.punktoj[0][0], vojo.punktoj[0][1]);
  let paso = 0;
  for (let s = 0; s < vojo.punktoj.length - 1; s++) {
    const [ax, az] = vojo.punktoj[s];
    const [bx, bz] = vojo.punktoj[s + 1];
    const longo = Math.hypot(bx - ax, bz - az);
    const n = Math.max(4, Math.round(longo * 2));
    for (let k = 1; k <= n; k++) {
      const t = k / n;
      const x = ax + (bx - ax) * t, z = az + (bz - az) * t;
      const h = profilo.alto(x, z);
      paso += longo / n;
      if (Math.abs(h - antaŭa) > maksSalto) { maksSalto = Math.abs(h - antaŭa); saltoLoko = paso; }
      antaŭa = h;
    }
  }
  console.log(`vojo ${v} ${vojo.nomo} , trakoj=${profilo.trakoj.length}` +
    ` maksSalto=${maksSalto.toFixed(3)} @${saltoLoko.toFixed(1)}`);
  for (const trako of profilo.trakoj) {
    trakNombro++;
    const difX = trako.bx - trako.ax, difZ = trako.bz - trako.az;
    const longo = Math.hypot(difX, difZ);
    const specimenoj = Math.max(16, Math.round(longo * 4));
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
    const difekta = subAkvo > 0 || minKlar < PONT_AKVA_KLARANCO - 1e-6 || maksSaltoTrako > 0.3;
    if (difekta) difektoj++;
    console.log(`  trako ${trako.ax.toFixed(1)},${trako.az.toFixed(1)}` +
      ` -> ${trako.bx.toFixed(1)},${trako.bz.toFixed(1)}` +
      ` longo=${longo.toFixed(1)} minKlar=${minKlar === Infinity ? "-" : minKlar.toFixed(3)} @${(minLoko / specimenoj).toFixed(2)}` +
      ` subAkvo=${subAkvo} subTero=${subTero.toFixed(2)} superTero=${superTero.toFixed(2)}` +
      `${difekta ? "  ⚠" : ""}`);
  }
}
console.log(`ផ្លូវមានស្ពាន ${pontoNombro} , ត្រប់ ${trakNombro} , បញ្ហា ${difektoj}`);
