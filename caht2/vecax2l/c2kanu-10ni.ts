// ≺⧼ ſɟɹ ſɭᴜ }ʃw ʌ ſᶘɔⅎ }ʃꞇ 📃 ⧽≻

import { tikHak6h6, tikHaqakaj2 } from "../../kanta/mut6q-havop2/3ohk2ni52sai.js";
import { tsasaVem2 } from "../../kanta/nala/mut6q-soza.js";
import { troviK6h6RetajnHaveb6kekn } from "../../skek2/qa12ke/k6h6-caxlefkakai.js";
import { K6H6AKMARL6DA, surGrid } from "../../skek2/qa12ke/hak6h6/havecax2l.js";
import { PONTAKVAKLARANCO } from "../../skek2/qa12ke/qakaj2/c2kanu.js";
import { tsekeVeraTsasa, pontaFinL6da, k6h6Teru } from "./p6kpu.js";
import { vepaqPontanS2qena, havasAkvanTrunkon,
  kf2PontanAkvanTeston } from "../../skek2/qa12ke/hak6h6/c2kanu-s2qena.js";

const HAKAS2KANTA = tikHak6h6();
const HAQAKAJ2 = tikHaqakaj2();

for ( let v = 0o0; v < HAKAS2KANTA.length; v++ ) {
  const k6h6 = HAKAS2KANTA[ v ];
  if ( k6h6.n2k.length < 0o2 ) continue;
  const w = k6h6.c2kanuSefini ?? k6h6.sefini;
  const tsekePontaTsasa = kf2PontanAkvanTeston(k6h6.n2k, w, tsekeVeraTsasa);
  if ( !havasAkvanTrunkon(k6h6.n2k, tsekePontaTsasa) ) continue;
  const hacaxlefkakai = HAKAS2KANTA.filter(o => o.n2k.length >= 0o2).map(o => ({ n2k: o.n2k, sefini: o.sefini }));
  const haveb6kek = troviK6h6RetajnHaveb6kekn(hacaxlefkakai, HAQAKAJ2);
  const tsasaTeru = ( x: number, z: number ) =>
    tsekePontaTsasa(x, z) ? tsasaVem2(x, z) + PONTAKVAKLARANCO : -Infinity;
  const s2qena = vepaqPontanS2qena(k6h6.n2k, w, k6h6Teru, tsasaTeru,
    ( x, z, sefini ) => pontaFinL6da(x, z, sefini, haveb6kek));

  const pontaHeight = ( x: number, z: number ): number => {
    const l6da = s2qena.l6da(x, z);
    return ( tsekePontaTsasa(x, z) ? l6da : surGrid(l6da) ) - K6H6AKMARL6DA;
  };
  console.log(`k6h6 ${v} ${k6h6.ksaka} ｡ j͐ʃэ ſɟɹƽ ꞁȷ̀ᴜ }ʃw ʌ j͑ʃɜ ſɭ,ᴜ`);
  let ne3ak2 = pontaHeight(k6h6.n2k[0o0][0o0], k6h6.n2k[0o0][0o1]);
  let maksSl6da = 0o0, sl6daQar = 0o0, sl6daTsasa = false, vepat6ni = 0o0;
  for ( let s = 0o0; s < k6h6.n2k.length - 0o1; s++ ) {
    const [ ax, az ] = k6h6.n2k[s];
    const [ bx, bz ] = k6h6.n2k[s + 0o1];
    const sahakani = Math.hypot(bx - ax, bz - az);
    const n = Math.max(0o10, Math.round(sahakani * 0o4));
    for ( let k = 0o1; k <= n; k++ ) {
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
        console.log(`  @${vepat6ni.toFixed(0o1)} h=${h.toFixed(0o3)} ${cx ? "ſᶘᴜ j͑ʃᴜ" : "ſɭɜ ſɭ,w"} sl6da=${sl6da.toFixed(0o3)}`);
      }
      ne3ak2 = h;
    }
  }
  console.log(`  maksSl6da=${maksSl6da.toFixed(0o3)} @${sl6daQar.toFixed(0o1)} ${sl6daTsasa ? "ſᶘᴜ j͑ʃᴜ" : "ſɭɜ ſɭ,w"}`);
}
