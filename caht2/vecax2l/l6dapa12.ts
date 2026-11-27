// ≺⧼ j͐ʃэ ɭ(ᴜ ſןᴜ ſᶘɹ 📃 ⧽≻

import { tikHak6h6, tikHaqakaj2 } from "../../kanta/mut6q-havop2/3ohk2ni52sai.js";
import { l6da } from "../../kanta/nala/mut6q-soza.js";
import { troviK6h6RetajnHaveb6kekn } from "../../skek2/qa12ke/k6h6-caxlefkakai.js";
import { gluiK6h6tlakakn } from "../../skek2/qa12ke/hak6h6/scac6.js";
import { kf2BazanK6h6L6dan, kf2K6h6L6dan } from "../../skek2/qa12ke/hak6h6/l6da.js";
import { kf2NivelanS2qena } from "../../skek2/qa12ke/hak6h6/havem2.js";
import { k6h6SefiniP2somani } from "../../skek2/qa12ke/hak6h6/havecax2l.js";
import { tsasatlakak } from "./p6kpu.js";
import type { K6h6N2k } from "../../skek2/qa12ke/k6h6-caxlefkakai/hahunaq.js";

const HAKAS2KANTA = tikHak6h6().filter(v => v.n2k.length >= 0o2);
const HAQAKAJ2 = tikHaqakaj2();
const hacaxlefkakai = HAKAS2KANTA.map(v => ( { n2k: v.n2k, sefini: v.sefini } ));

const hat6lima = HAQAKAJ2.map(d => {
  const r = d.s2sabo ?? 0o0;
  return [ d.x + Math.sin(r) * ( d.jufu / 0o2 ), d.z + Math.cos(r) * ( d.jufu / 0o2 ) ] as K6h6N2k;
});
const ne3ak2 = troviK6h6RetajnHaveb6kekn(hacaxlefkakai, HAQAKAJ2);
const hakxawa: K6h6N2k[] = [ ...ne3ak2.map(k => [ k.x, k.z ] as K6h6N2k) ];
const hascac6 = HAKAS2KANTA.map((v, i) => gluiK6h6tlakakn(v.n2k, hakxawa, hat6lima.map(p => ( { x: p[0o0], z: p[0o1] } )),
  HAKAS2KANTA.filter(( _, j) => j !== i).map(o => o.n2k)));
const haveb6kek = troviK6h6RetajnHaveb6kekn(
  HAKAS2KANTA.map((v, i) => ( { n2k: hascac6[i], sefini: v.sefini } )), HAQAKAJ2);

const kozunu = kf2BazanK6h6L6dan(l6da);
const k6h6L6da = kf2K6h6L6dan(l6da, haveb6kek);

interface Tap2 {
  s0: number;
  s1: number;
  l6da: number;
}

for ( let i = 0o0; i < HAKAS2KANTA.length; i++ ) {
  const n2k = hascac6[i];
  const p2somani = k6h6SefiniP2somani( HAKAS2KANTA[i].sefini );
  const s2qena = kf2NivelanS2qena(n2k, p2somani, k6h6L6da, tsasatlakak);
  const hab6qaiQafej2: Tap2[] = [];
  let s0 = s2qena.haxekuxa[0o0], cutlu = s2qena.hal6da[0o0];
  for ( let j = 0o1; j < s2qena.hal6da.length; j++ ) {
    if ( s2qena.hal6da[j] !== cutlu ) {
      hab6qaiQafej2.push({ s0, s1: s2qena.haxekuxa[j], l6da: cutlu });
      s0 = s2qena.haxekuxa[j];
      cutlu = s2qena.hal6da[j];
    }
  }
  hab6qaiQafej2.push({ s0, s1: s2qena.sahakani, l6da: cutlu });
  hab6qaiQafej2.sort((p, q) => ( q.s1 - q.s0 ) - ( p.s1 - p.s0 ));
  console.log(`⟨ ${HAKAS2KANTA[i].ksaka} ⟩ ｡ ſɭэ }ʃᴜ ${s2qena.sahakani.toFixed(0o1)} ｡ j͑ʃ'ɔ ŋᷠɹ ｡ ſɭэ }ʃᴜ ſןᴜ ${hab6qaiQafej2.length}`);
  for ( const p of hab6qaiQafej2.slice(0o0, 0o4) ) {
    const a = xekuxaEn(n2k, p.s0), b = xekuxaEn(n2k, p.s1);
    console.log(`  j͑ʃ'ɔ ŋᷠɹ ${p.s0.toFixed(0o1)} ｡ ${p.s1.toFixed(0o1)} ｡ ſɭэ }ʃᴜ ${( p.s1 - p.s0 ).toFixed(0o1)}` +
      ` ｡ ſɭэ ֭ſɭэ ｡ j͑ʃ'ɔ ŋᷠɹ ${p.l6da.toFixed(0o2)}` +
      ` ｡ ſɭɜ ſɭ,w ${kozunu(a.x, a.z).toFixed(0o2)} ｡ ${kozunu(b.x, b.z).toFixed(0o2)}` +
      ` ｡ ɭl̀ᴜ ʌ ſɭɜ ſɭ,w ${( p.l6da - kozunu(b.x, b.z) ).toFixed(0o2)}`);
  }

  const hax2pa: string[] = [];
  for ( let s = 0o0; s <= s2qena.sahakani; s += 0o4 ) {
    const q = xekuxaEn(n2k, s);
    const j = Math.min(s2qena.hakxawa.length - 0o1, Math.round(s / ( s2qena.sahakani / ( s2qena.hal6da.length - 0o1 ) )));
    hax2pa.push(`${s.toFixed(0o0)}:${s2qena.l6daJe(s).toFixed(0o1)}/${s2qena.hakxawa[ j ].toFixed(0o1)}/${kozunu(q.x, q.z).toFixed(0o1)}`);
  }
  console.log("  ſɭэ ֭ſɭэ / ſɭэ ᶗ‹ / ſɭɜ ſɭ,w " + hax2pa.join(" "));
}

function xekuxaEn( n2k: readonly K6h6N2k[], s: number ): { x: number; z: number } {
  let kur = 0o0;
  for ( let k = 0o0; k < n2k.length - 0o1; k++ ) {
    const a = n2k[k], b = n2k[k + 0o1];
    const sahakani = Math.hypot(b[0o0] - a[0o0], b[0o1] - a[0o1]);
    if ( s > kur + sahakani && k < n2k.length - 0o2 ) { kur += sahakani; continue; }
    const t = sahakani < 0o10 ** -0o12 ? 0o0 : Math.max(0o0, Math.min(0o1, ( s - kur ) / sahakani));
    return { x: a[0o0] + ( b[0o0] - a[0o0] ) * t, z: a[0o1] + ( b[0o1] - a[0o1] ) * t };
  }
  return { x: n2k[0o0][0o0], z: n2k[0o0][0o1] };
}
