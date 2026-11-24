// ≺⧼ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ j͑ʃᴜꞇ ʌ j͐ʃэ ɭ(ᴜ ʌ j͑ʃɹ ſɟᴜ ı],ɹͷ̗ 🧪 ⧽≻
import * as THREE from "three";
import { vepaqQakaj2n } from "../../eskekoj/medio/qakaj2.js";
import { kalkuliStupanNombron, kf2StuparanAlton, kf2StuparajnPunktojn } from "../../eskekoj/medio/qakaj2/stuparo.js";
import { vepaqHak6h6n } from "../../eskekoj/medio/hak6h6.js";
import { vojSuprajxoj } from "../../eskekoj/medio/hak6h6/hahunaq.js";
import { aktivajHak6h6, aktivajHaqakaj2 } from "../../kantaoj/tero-datumaro/rultempo.js";
import { alteco, akvaVem2 } from "../../kantaoj/mondo/tereno.js";
import { troviK6h6RetajnHaveb6kekn } from "../../eskekoj/medio/voj-reto.js";
import { kf2T6g6Pukek, kf2T6hnaPukek } from "../../eskekoj/komunajxoj/materialoj.js";
import { surGrid, STUPA_RISERO, VOJA_SUPRO_LEVIGXO } from "../../eskekoj/medio/hak6h6/havecax2l.js";
import { pontaFinAlto } from "./komunaj.js";

const qena = new THREE.Scene();
const t6g6 = kf2T6g6Pukek(new THREE.Texture());
const t6hna = kf2T6hnaPukek(new THREE.Texture());
const DOKOJ = aktivajHaqakaj2();
const VOJOJ = aktivajHak6h6();
const retaj = VOJOJ.filter(v => v.n2k.length >= 2).map(v => ({ n2k: v.n2k, sefini: v.sefini }));
const haveb6kek = troviK6h6RetajnHaveb6kekn(retaj, DOKOJ);

for ( const d of DOKOJ ) {
  const rot = d.rotacio ?? 0;
  const qakaj2 = vepaqQakaj2n(qena, d.x, d.z, rot, alteco, akvaVem2, d.profundo);
  const sinR = Math.sin(rot), cosR = Math.cos(rot);
  const landaX = d.x + sinR * ( d.profundo / 2 );
  const landaZ = d.z + cosR * ( d.profundo / 2 );
  console.log("\n<( qakaj2 " + d.x.toFixed(2) + ", " + d.z.toFixed(2) + " )>", {
    n2k: qakaj2.stuparajPunktoj.length,
    platformY: +qakaj2.platformY.toFixed(4),
    landejaY: +qakaj2.landejaY.toFixed(4),
    akvo: +akvaVem2(d.x, d.z).toFixed(4),
  });
  if ( qakaj2.stuparajPunktoj.length < 2 ) continue;
  const saxeni = surGrid(pontaFinAlto(landaX, landaZ, qakaj2.platformWidth, haveb6kek));
  const falto = saxeni - qakaj2.landejaY;
  const nombro = kalkuliStupanNombron(falto);
  const n2k = kf2StuparajnPunktojn(qakaj2.stuparajPunktoj[0], qakaj2.stuparajPunktoj[1], nombro);
  const sost2cel2sai = Math.hypot(n2k[0][0] - n2k[nombro][0], n2k[0][1] - n2k[nombro][1]);
  console.log("  saxeni " + saxeni.toFixed(4) + " , falto " + falto.toFixed(4) +
    " , nombro " + nombro + " , risero " + STUPA_RISERO.toFixed(5) +
    " , vepat6ni " + ( sost2cel2sai / nombro ).toFixed(5) );
  vojSuprajxoj.length = 0;
  vepaqHak6h6n(qena, [ { pts: n2k, w: qakaj2.platformWidth, stuparo: true,
    heightFn: kf2StuparanAlton(n2k, saxeni - VOJA_SUPRO_LEVIGXO, qakaj2.landejaY) } ],
    alteco, t6g6, t6hna, []);
  const hasoza = vojSuprajxoj.map(s => s.y0);
  const saltoj: number[] = [];
  for ( let i = 1; i < hasoza.length; i++ ) saltoj.push(hasoza[i] - hasoza[i - 1]);
  console.log("  ｡ ɭʃɜ }ʃᴜ " + hasoza.length + " ｡ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ " + hasoza[0].toFixed(4) +
    " ｡ ɭl̀ᴜȝ ſןᴜ ɭʃɔ " + hasoza[hasoza.length - 1].toFixed(4) +
    " ｡ ſ͕ɭᴜ ſ͕ɭw }ʃɹ ʌ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ " + ( hasoza[hasoza.length - 1] - qakaj2.landejaY ).toFixed(4));
  console.log("  j͐ʃэ ɭ(ᴜ ɭl̀ᴜ " + [ ...new Set(saltoj.map(s => s.toFixed(5))) ].join(" ｡ ") ) ;
// ⟨ ſɭᴜ ſןᴜ , ֭ſɭэ ſɭэ , ⟅ ſןɔ˞ᴜƴ , j͑ʃɜ ſɭ,ᴜ , ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
  vojSuprajxoj.length = 0;
  vepaqHak6h6n(qena, [ { pts: n2k, w: qakaj2.platformWidth, stuparo: true,
    heightFn: kf2StuparanAlton(n2k, saxeni - VOJA_SUPRO_LEVIGXO, qakaj2.landejaY) } ],
    alteco, t6g6, t6hna, haveb6kek.map(k => [ k.x, k.z ] as [ number, number ]));
  const kunSurfacoj = vojSuprajxoj.map(s => s.y0);
  console.log("  ｡ j͑ʃɜ ſɭ,ᴜ ʌ ſ͕ɭᴜ ſ͕ɭw }ʃɹ " + kunSurfacoj.length + " ｡ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ " +
    kunSurfacoj[0]?.toFixed(4) + " ｡ ɭl̀ᴜȝ ſןᴜ ɭʃɔ " +
    kunSurfacoj[kunSurfacoj.length - 1]?.toFixed(4));
  const kunSaltoj: number[] = [];
  for ( let i = 1; i < kunSurfacoj.length; i++ ) kunSaltoj.push(kunSurfacoj[i] - kunSurfacoj[i - 1]);
  console.log("  j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ʌ ſ͕ɭᴜ ſ͕ɭw }ʃɹ " + [ ...new Set(kunSaltoj.map(s => s.toFixed(5))) ].join(" ｡ "));
}
