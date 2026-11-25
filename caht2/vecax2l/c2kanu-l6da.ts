// ≺⧼ ſɟɹƽ ꞁȷ̀ᴜ }ʃw ʌ ſɟɔȝ ʌ j͑ʃɹ ſɟᴜ ı],ɹͷ̗ 🧪 ⧽≻
// ⟨ ſɟɹƽ ꞁȷ̀ᴜ }ʃw ʌ j͑ʃɜ ſɭ,ᴜ pontaHeight ʌ kaxte.ts ⟅ ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ ʌ ſᶘᴜ j͑ʃᴜ 📃 ⟩
import { tikHak6h6, tikHaqakaj2 } from "../../kanta/t6lima-havop2/tlohk2nikziisai.js";
import { tsasaVem2 } from "../../kanta/nala/t6limaSoza.js";
import { troviK6h6RetajnHaveb6kekn } from "../../skek2/qatsiike/k6h6-caxlefkakai.js";
import { K6H6AKMARL6DA, surGrid } from "../../skek2/qatsiike/hak6h6/havecax2l.js";
import { PONTAKVAKLARANCO } from "../../skek2/qatsiike/qakaj2/c2kanu.js";
import { tsekeVeraTsasa, pontaFinL6da, k6h6Teru } from "./x2x2q.js";
import { vepaqPontanS2qena, havasAkvanTrunkon,
  kf2PontanAkvanTeston } from "../../skek2/qatsiike/hak6h6/c2kanu-profilo.js";

const HAKAS2KANTA = tikHak6h6();
const HAQAKAJ2 = tikHaqakaj2();

for ( let v = 0; v < HAKAS2KANTA.length; v++ ) {
  const k6h6 = HAKAS2KANTA[ v ];
  if ( k6h6.n2k.length < 2 ) continue;
  const w = k6h6.c2kanuSefini ?? k6h6.sefini;
  const tsekePontaTsasa = kf2PontanAkvanTeston(k6h6.n2k, w, tsekeVeraTsasa);
  if ( !havasAkvanTrunkon(k6h6.n2k, tsekePontaTsasa) ) continue;
  const hacaxlefkakai = HAKAS2KANTA.filter(o => o.n2k.length >= 2).map(o => ({ n2k: o.n2k, sefini: o.sefini }));
  const haveb6kek = troviK6h6RetajnHaveb6kekn(hacaxlefkakai, HAQAKAJ2);
  const tsasaTeru = ( x: number, z: number ) =>
    tsekePontaTsasa(x, z) ? tsasaVem2(x, z) + PONTAKVAKLARANCO : -Infinity;
  const s2qena = vepaqPontanS2qena(k6h6.n2k, w, k6h6Teru, tsasaTeru,
    ( x, z, sefini ) => pontaFinL6da(x, z, sefini, haveb6kek));
  // ⟨ ſɟɹƽ ꞁȷ̀ᴜ }ʃw ʌ j͑ʃɜ ſɭ,ᴜ pontaHeight ʌ kaxte.ts 📃 ⟩
  const pontaHeight = ( x: number, z: number ): number => {
    const l6da = s2qena.l6da(x, z);
    return ( tsekePontaTsasa(x, z) ? l6da : surGrid(l6da) ) - K6H6AKMARL6DA;
  };
  console.log(`k6h6 ${v} ${k6h6.ksaka} pontaHeight ʌ ſɭэ ֭ſɭэ ⟅`);
  let ne3ak2 = pontaHeight(k6h6.n2k[0][0], k6h6.n2k[0][1]);
  let maksSl6da = 0, sl6daQar = 0, sl6daTsasa = false, vepat6ni = 0;
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
      const sl6da = h - ne3ak2;
      const ak = tsekePontaTsasa(x, z);
      if ( Math.abs(sl6da) > maksSl6da ) {
        maksSl6da = Math.abs(sl6da); sl6daQar = vepat6ni; sl6daTsasa = ak;
      }
      if ( Math.abs(sl6da) > 0o1/0o100 ) {
        const cx = tsekePontaTsasa(x, z), cxp = tsekePontaTsasa(x, z);
        console.log(`  @${vepat6ni.toFixed(1)} h=${h.toFixed(3)} ${cx ? "ſᶘᴜ j͑ʃᴜ" : "ſɭɜ ſɭ,w"} sl6da=${sl6da.toFixed(3)}`);
      }
      ne3ak2 = h;
    }
  }
  console.log(`  maksSl6da=${maksSl6da.toFixed(3)} @${sl6daQar.toFixed(1)} ${sl6daTsasa ? "ſᶘᴜ j͑ʃᴜ" : "ſɭɜ ſɭ,w"}`);
}
