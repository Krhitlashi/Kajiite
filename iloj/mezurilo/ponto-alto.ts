// ≺⧼ វាស់ផ្ទៃស្ពានពិត 🧪 ⧽≻
// ⟨ គណនាផ្ទៃស្ពាន pontaHeight ដូច urbo.ts ពិត , រកជញ្ជាំងនៅមាត់ទឹក ។ 📃 ⟩
import { aktivajVojoj, aktivajDokoj } from "../../kantaoj/tero-datumaro/rultempo.js";
import { akvaNivelo } from "../../kantaoj/mondo/tereno.js";
import { troviVojaRetajnKunigojn } from "../../eskekoj/medio/voj-reto.js";
import { VOJA_SUPRO_LEVIGXO, surGrid } from "../../eskekoj/medio/vojoj/mezuroj.js";
import { PONT_AKVA_KLARANCO } from "../../eskekoj/medio/doko/ponto.js";
import { cxuVeraAkvo, pontaFinAlto, vojaSupro } from "./komunaj.js";
import { konstruiPontanProfilon, havasAkvanTrunkon,
  kreiPontanAkvanTeston } from "../../eskekoj/medio/vojoj/ponto-profilo.js";

const VOJOJ = aktivajVojoj();
const DOKOJ = aktivajDokoj();

for ( let v = 0; v < VOJOJ.length; v++ ) {
  const k6h6 = VOJOJ[ v ];
  if ( k6h6.n2k.length < 2 ) continue;
  const w = k6h6.pontoLarĝo ?? k6h6.sefini;
  const cxuPontaAkvo = kreiPontanAkvanTeston(k6h6.n2k, w, cxuVeraAkvo);
  if ( !havasAkvanTrunkon(k6h6.n2k, cxuPontaAkvo) ) continue;
  const retaj = VOJOJ.filter(o => o.n2k.length >= 2).map(o => ({ n2k: o.n2k, sefini: o.sefini }));
  const kunigoj = troviVojaRetajnKunigojn(retaj, DOKOJ);
  const akvaSupro = ( x: number, z: number ) =>
    cxuPontaAkvo(x, z) ? akvaNivelo(x, z) + PONT_AKVA_KLARANCO : -Infinity;
  const s2qena = konstruiPontanProfilon(k6h6.n2k, w, vojaSupro, akvaSupro,
    ( x, z, sefini ) => pontaFinAlto(x, z, sefini, kunigoj));
  // ⟨ ផ្ទៃស្ពានពិត pontaHeight ដូច urbo.ts 📃 ⟩
  const pontaHeight = ( x: number, z: number ): number => {
    const l6da = s2qena.l6da(x, z);
    return ( cxuPontaAkvo(x, z) ? l6da : surGrid(l6da) ) - VOJA_SUPRO_LEVIGXO;
  };
  console.log(`k6h6 ${v} ${k6h6.ksaka} pontaHeight តាមបណ្តោយផ្លូវ ៖`);
  let antaŭa = pontaHeight(k6h6.n2k[0][0], k6h6.n2k[0][1]);
  let maksSalto = 0, saltoLoko = 0, saltoAkvo = false, vepat6ni = 0;
  for ( let s = 0; s < k6h6.n2k.length - 1; s++ ) {
    const [ ax, az ] = k6h6.n2k[s];
    const [ bx, bz ] = k6h6.n2k[s + 1];
    const sahakani = Math.hypot(bx - ax, bz - az);
    const n = Math.max(0o10, Math.round(sahakani * 4));
    for ( let k = 1; k <= n; k++ ) {
      const t = k / n;
      const x = ax + (bx - ax) * t, z = az + (bz - az) * t;
      const h = pontaHeight(x, z);
      vepat6ni += sahakani / n;
      const salto = h - antaŭa;
      const ak = cxuPontaAkvo(x, z);
      if ( Math.abs(salto) > maksSalto ) {
        maksSalto = Math.abs(salto); saltoLoko = vepat6ni; saltoAkvo = ak;
      }
      if ( Math.abs(salto) > 0o1/0o100 ) {
        const cx = cxuPontaAkvo(x, z), cxp = cxuPontaAkvo(x, z);
        console.log(`  @${vepat6ni.toFixed(1)} h=${h.toFixed(3)} ${cx ? "ទឹក" : "ដី"} salto=${salto.toFixed(3)}`);
      }
      antaŭa = h;
    }
  }
  console.log(`  maksSalto=${maksSalto.toFixed(3)} @${saltoLoko.toFixed(1)} ${saltoAkvo ? "ទឹក" : "ដី"}`);
}
