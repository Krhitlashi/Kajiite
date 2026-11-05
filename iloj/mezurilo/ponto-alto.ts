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
  const vojo = VOJOJ[ v ];
  if ( vojo.punktoj.length < 2 ) continue;
  const w = vojo.pontoLarĝo ?? vojo.larĝo;
  const cxuPontaAkvo = kreiPontanAkvanTeston(vojo.punktoj, w, cxuVeraAkvo);
  if ( !havasAkvanTrunkon(vojo.punktoj, cxuPontaAkvo) ) continue;
  const retaj = VOJOJ.filter(o => o.punktoj.length >= 2).map(o => ({ punktoj: o.punktoj, larĝo: o.larĝo }));
  const kunigoj = troviVojaRetajnKunigojn(retaj, DOKOJ);
  const akvaSupro = ( x: number, z: number ) =>
    cxuPontaAkvo(x, z) ? akvaNivelo(x, z) + PONT_AKVA_KLARANCO : -Infinity;
  const profilo = konstruiPontanProfilon(vojo.punktoj, w, vojaSupro, akvaSupro,
    ( x, z, larĝo ) => pontaFinAlto(x, z, larĝo, kunigoj));
  // ⟨ ផ្ទៃស្ពានពិត pontaHeight ដូច urbo.ts 📃 ⟩
  const pontaHeight = ( x: number, z: number ): number => {
    const alto = profilo.alto(x, z);
    return ( cxuPontaAkvo(x, z) ? alto : surGrid(alto) ) - VOJA_SUPRO_LEVIGXO;
  };
  console.log(`vojo ${v} ${vojo.nomo} pontaHeight តាមបណ្តោយផ្លូវ ៖`);
  let antaŭa = pontaHeight(vojo.punktoj[0][0], vojo.punktoj[0][1]);
  let maksSalto = 0, saltoLoko = 0, saltoAkvo = false, paso = 0;
  for ( let s = 0; s < vojo.punktoj.length - 1; s++ ) {
    const [ ax, az ] = vojo.punktoj[s];
    const [ bx, bz ] = vojo.punktoj[s + 1];
    const longo = Math.hypot(bx - ax, bz - az);
    const n = Math.max(8, Math.round(longo * 4));
    for ( let k = 1; k <= n; k++ ) {
      const t = k / n;
      const x = ax + (bx - ax) * t, z = az + (bz - az) * t;
      const h = pontaHeight(x, z);
      paso += longo / n;
      const salto = h - antaŭa;
      const ak = cxuPontaAkvo(x, z);
      if ( Math.abs(salto) > maksSalto ) {
        maksSalto = Math.abs(salto); saltoLoko = paso; saltoAkvo = ak;
      }
      if ( Math.abs(salto) > 0o1/0o100 ) {
        const cx = cxuPontaAkvo(x, z), cxp = cxuPontaAkvo(x, z);
        console.log(`  @${paso.toFixed(1)} h=${h.toFixed(3)} ${cx ? "ទឹក" : "ដី"} salto=${salto.toFixed(3)}`);
      }
      antaŭa = h;
    }
  }
  console.log(`  maksSalto=${maksSalto.toFixed(3)} @${saltoLoko.toFixed(1)} ${saltoAkvo ? "ទឹក" : "ដី"}`);
}
