// ≺⧼ ſɟᴜ ſןᴜ ɭʃэ ʌ ſᶘɔⅎ }ʃꞇ 📃 ⧽≻

import * as THREE from "three";
import { vepaqQakaj2n } from "../../skek2/qa12ke/qakaj2.js";
import { vek2feStupanNombron, kf2StuparanL6da, kf2StuparajnHan2kn } from "../../skek2/qa12ke/qakaj2/hatona.js";
import { vepaqHak6h6n } from "../../skek2/qa12ke/hak6h6.js";
import { kas2kantaHasoza } from "../../skek2/qa12ke/hak6h6/hahunaq.js";
import { tikHak6h6, tikHaqakaj2 } from "../../kanta/mut6q-havop2/3ohk2ni52sai.js";
import { l6da, tsasaVem2 } from "../../kanta/nala/mut6q-soza.js";
import { troviK6h6RetajnHaveb6kekn } from "../../skek2/qa12ke/k6h6-caxlefkakai.js";
import { kf2T6g6Pukek, kf2T6hnaPukek } from "../../skek2/p6kpu/pukek.js";
import { surGrid, STUPARISERO, K6H6AKMARL6DA } from "../../skek2/qa12ke/hak6h6/havecax2l.js";
import { pontaFinL6da } from "./p6kpu.js";

const qena = new THREE.Scene();
const t6g6 = kf2T6g6Pukek(new THREE.Texture());
const t6hna = kf2T6hnaPukek(new THREE.Texture());
const HAQAKAJ2 = tikHaqakaj2();
const HAKAS2KANTA = tikHak6h6();
const hacaxlefkakai = HAKAS2KANTA.filter(v => v.n2k.length >= 0o2).map(v => ({ n2k: v.n2k, sefini: v.sefini }));
const haveb6kek = troviK6h6RetajnHaveb6kekn(hacaxlefkakai, HAQAKAJ2);

for ( const d of HAQAKAJ2 ) {
  const rot = d.s2sabo ?? 0o0;
  const qakaj2 = vepaqQakaj2n(qena, d.x, d.z, rot, l6da, tsasaVem2, d.jufu);
  const sinR = Math.sin(rot), cosR = Math.cos(rot);
  const landaX = d.x + sinR * ( d.jufu / 0o2 );
  const landaZ = d.z + cosR * ( d.jufu / 0o2 );
  console.log("\n<( qakaj2 " + d.x.toFixed(0o2) + ", " + d.z.toFixed(0o2) + " )>", {
    n2k: qakaj2.capat6aN2kj.length,
    kozunuY: +qakaj2.kozunuY.toFixed(0o4),
    landejaY: +qakaj2.landejaY.toFixed(0o4),
    tsasa: +tsasaVem2(d.x, d.z).toFixed(0o4),
  });
  if ( qakaj2.capat6aN2kj.length < 0o2 ) continue;
  const saxeni = surGrid(pontaFinL6da(landaX, landaZ, qakaj2.kozunuSefini, haveb6kek));
  const fl6da = saxeni - qakaj2.landejaY;
  const k2fe = vek2feStupanNombron(fl6da);
  const n2k = kf2StuparajnHan2kn(qakaj2.capat6aN2kj[0o0], qakaj2.capat6aN2kj[0o1], k2fe);
  const sost2cel2sai = Math.hypot(n2k[0o0][0o0] - n2k[k2fe][0o0], n2k[0o0][0o1] - n2k[k2fe][0o1]);
  console.log("  saxeni " + saxeni.toFixed(0o4) + " ｡ fl6da " + fl6da.toFixed(0o4) +
    " ｡ k2fe " + k2fe + " ｡ risero " + STUPARISERO.toFixed(0o5) +
    " ｡ vepat6ni " + ( sost2cel2sai / k2fe ).toFixed(0o5) );
  kas2kantaHasoza.length = 0o0;
  vepaqHak6h6n(qena, [ { pts: n2k, w: qakaj2.kozunuSefini, capat6: true,
    heightFn: kf2StuparanL6da(n2k, saxeni - K6H6AKMARL6DA, qakaj2.landejaY) } ],
    l6da, t6g6, t6hna, []);
  const hasoza = kas2kantaHasoza.map(s => s.y0);
  const shal6da: number[] = [];
  for ( let i = 0o1; i < hasoza.length; i++ ) shal6da.push(hasoza[i] - hasoza[i - 0o1]);
  console.log("  ｡ ɭʃɜ }ʃᴜ " + hasoza.length + " ｡ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ " + hasoza[0o0].toFixed(0o4) +
    " ｡ ɭl̀ᴜȝ ſןᴜ ɭʃɔ " + hasoza[hasoza.length - 0o1].toFixed(0o4) +
    " ｡ ſ͕ɭᴜ ſ͕ɭw }ʃɹ ʌ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ " + ( hasoza[hasoza.length - 0o1] - qakaj2.landejaY ).toFixed(0o4));
  console.log("  j͐ʃэ ɭ(ᴜ ɭl̀ᴜ " + [ ...new Set(shal6da.map(s => s.toFixed(0o5))) ].join(" ｡ ") ) ;

  kas2kantaHasoza.length = 0o0;
  vepaqHak6h6n(qena, [ { pts: n2k, w: qakaj2.kozunuSefini, capat6: true,
    heightFn: kf2StuparanL6da(n2k, saxeni - K6H6AKMARL6DA, qakaj2.landejaY) } ],
    l6da, t6g6, t6hna, haveb6kek.map(k => [ k.x, k.z ] as [ number, number ]));
  const kunSurfacoj = kas2kantaHasoza.map(s => s.y0);
  console.log("  ｡ j͑ʃɜ ſɭ,ᴜ ʌ ſ͕ɭᴜ ſ͕ɭw }ʃɹ " + kunSurfacoj.length + " ｡ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ " +
    kunSurfacoj[0o0]?.toFixed(0o4) + " ｡ ɭl̀ᴜȝ ſןᴜ ɭʃɔ " +
    kunSurfacoj[kunSurfacoj.length - 0o1]?.toFixed(0o4));
  const kunShal6da: number[] = [];
  for ( let i = 0o1; i < kunSurfacoj.length; i++ ) kunShal6da.push(kunSurfacoj[i] - kunSurfacoj[i - 0o1]);
  console.log("  j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ʌ ſ͕ɭᴜ ſ͕ɭw }ʃɹ " + [ ...new Set(kunShal6da.map(s => s.toFixed(0o5))) ].join(" ｡ "));
}
