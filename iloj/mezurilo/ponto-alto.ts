// ≺⧼ ſɟɹƽ ꞁȷ̀ᴜ }ʃw ʌ ſɟɔȝ ʌ j͑ʃɹ ſɟᴜ ı],ɹͷ̗ 🧪 ⧽≻
// ⟨ គណនាផ្ទៃស្ពាន pontaHeight ដូច kaxte.ts ពិត , រកជញ្ជាំងនៅមាត់ទឹក ។ 📃 ⟩
import { aktivajHak6h6, aktivajHaqakaj2 } from "../../kantaoj/tero-datumaro/rultempo.js";
import { akvaVem2 } from "../../kantaoj/mondo/tereno.js";
import { troviK6h6RetajnHaveb6kekn } from "../../eskekoj/medio/voj-reto.js";
import { VOJA_SUPRO_LEVIGXO, surGrid } from "../../eskekoj/medio/hak6h6/havecax2l.js";
import { PONT_AKVA_KLARANCO } from "../../eskekoj/medio/qakaj2/ponto.js";
import { tsekeVeraAkvo, pontaFinAlto, k6h6Supro } from "./komunaj.js";
import { vepaqPontanProfilon, havasAkvanTrunkon,
  kf2PontanAkvanTeston } from "../../eskekoj/medio/hak6h6/ponto-profilo.js";

const VOJOJ = aktivajHak6h6();
const DOKOJ = aktivajHaqakaj2();

for ( let v = 0; v < VOJOJ.length; v++ ) {
  const k6h6 = VOJOJ[ v ];
  if ( k6h6.n2k.length < 2 ) continue;
  const w = k6h6.pontoSefini ?? k6h6.sefini;
  const tsekePontaAkvo = kf2PontanAkvanTeston(k6h6.n2k, w, tsekeVeraAkvo);
  if ( !havasAkvanTrunkon(k6h6.n2k, tsekePontaAkvo) ) continue;
  const retaj = VOJOJ.filter(o => o.n2k.length >= 2).map(o => ({ n2k: o.n2k, sefini: o.sefini }));
  const haveb6kek = troviK6h6RetajnHaveb6kekn(retaj, DOKOJ);
  const akvaSupro = ( x: number, z: number ) =>
    tsekePontaAkvo(x, z) ? akvaVem2(x, z) + PONT_AKVA_KLARANCO : -Infinity;
  const s2qena = vepaqPontanProfilon(k6h6.n2k, w, k6h6Supro, akvaSupro,
    ( x, z, sefini ) => pontaFinAlto(x, z, sefini, haveb6kek));
  // ⟨ ផ្ទៃស្ពានពិត pontaHeight ដូច kaxte.ts 📃 ⟩
  const pontaHeight = ( x: number, z: number ): number => {
    const l6da = s2qena.l6da(x, z);
    return ( tsekePontaAkvo(x, z) ? l6da : surGrid(l6da) ) - VOJA_SUPRO_LEVIGXO;
  };
  console.log(`k6h6 ${v} ${k6h6.ksaka} pontaHeight តាមបណ្តោយផ្លូវ ៖`);
  let ne3ak2 = pontaHeight(k6h6.n2k[0][0], k6h6.n2k[0][1]);
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
      const salto = h - ne3ak2;
      const ak = tsekePontaAkvo(x, z);
      if ( Math.abs(salto) > maksSalto ) {
        maksSalto = Math.abs(salto); saltoLoko = vepat6ni; saltoAkvo = ak;
      }
      if ( Math.abs(salto) > 0o1/0o100 ) {
        const cx = tsekePontaAkvo(x, z), cxp = tsekePontaAkvo(x, z);
        console.log(`  @${vepat6ni.toFixed(1)} h=${h.toFixed(3)} ${cx ? "ទឹក" : "ដី"} salto=${salto.toFixed(3)}`);
      }
      ne3ak2 = h;
    }
  }
  console.log(`  maksSalto=${maksSalto.toFixed(3)} @${saltoLoko.toFixed(1)} ${saltoAkvo ? "ទឹក" : "ដី"}`);
}
