// ≺⧼ ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ ꞁȷ̀ᴜꞇ ʌ ſɭᴜ ı],ƨɔ j͑ʃᴜꞇ ʌ ſɭэ ֭ſɭэ 🔬 ⧽≻
// ⟨ j͑ʃɜ j͑ʃƨɹ , ſɭэ ֭ſɭэ , ſɭэ ſɭᴜ ,
// ſɭэ ſɭᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
// ſɭᴜ ſןᴜ , ſɭɜ ſɭᴜ , ꞙɭɿ , 📃 ⟩
import * as THREE from "three";
import { vepaqKradanKaxten } from "../../kantaoj/mondo/kaxte/krada-kaxte.js";
import { aktivajHaqakaj2 } from "../../kantaoj/tero-datumaro/rultempo.js";
import { alteco } from "../../kantaoj/mondo/tereno.js";
import { kf2K6h6Alton } from "../../eskekoj/medio/hak6h6/alto.js";
import { kf2NivelanProfilon } from "../../eskekoj/medio/hak6h6/havem2.js";
import { kf2Brakojn, kunigaPlataAlto } from "../../eskekoj/medio/hak6h6/hapa12.js";
import { akvaFino, punktoCxe as punktoCxeBaza } from "./komunaj.js";
import type { AltaVeb6kek } from "../../eskekoj/medio/hak6h6/alto.js";
import { aktivajHak6h6 } from "../../kantaoj/tero-datumaro/rultempo.js";
import { troviK6h6RetajnHaveb6kekn } from "../../eskekoj/medio/voj-reto.js";

const qena = new THREE.Scene();
const pukek = new THREE.MeshStandardMaterial();
const kaxte = vepaqKradanKaxten(qena, { arangxaGrando: 3, blokaGrando: "unu" },
  [ 0, 0 ], pukek);
const difinoj = kaxte.vojDifinoj;
const haveb6kek: AltaVeb6kek[] = [ ...kaxte.kunigajPunktoj.map(([ x, z ]) => {
  const fermita = kaxte.kunigajFermitaj.get(x + "," + z);
  return { x, z, direktaj: fermita ? [ fermita ] : [] };
}), ...troviK6h6RetajnHaveb6kekn(
  aktivajHak6h6().filter(v => v.n2k.length >= 2)
    .map(v => ({ n2k: v.n2k, sefini: v.sefini })), aktivajHaqakaj2()) ];
const k6h6Alteco = kf2K6h6Alton(alteco, haveb6kek);
// ⟨ ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , 📏 ⟩ , ſɭэ ֭ſɭэ , ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
const hapa12 = new Map<string, number>();
const pa12Cxe = ( x: number, z: number ): number => {
  const ca3aq = x + "," + z;
  let l6da = hapa12.get(ca3aq);
  if ( l6da === undefined ) {
// ⟨ ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , 📏 ⟩ , ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭɿ ,
// ꞙɭı , ſɭᴜ ſןᴜ , ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w , ꞙɭɔ , 📃 ⟩
    const k = haveb6kek.find(n => n.x === x && n.z === z);
    const knece = kf2Brakojn(k?.direktaj ?? [], undefined, 0);
    l6da = kunigaPlataAlto(x, z, knece, k6h6Alteco);
    hapa12.set(ca3aq, l6da);
  }
  return l6da;
};
const ankroj = haveb6kek.map(k => ({ x: k.x, z: k.z, l6da: pa12Cxe(k.x, k.z) }));
console.log(`ſɭэ ֭ſɭэ ʌ ſɭɹ ſןᴜ ${difinoj.length} ｡ ſɟɹƽ ${haveb6kek.length}`);

// ⟨ ſɭэ ֭ſɭэ , ſɭэ ſɭᴜ , ꞙɭı , 📏 ⟩
/* ſɭэ ֭ſɭэ , ſɭэ ſɭᴜ , ꞙɭı ,
    @param pts ( [ number , number ] [ ] ) - }ʃɹƽ ʌ ſɭэ ֭ſɭэ
    @param s ( number ) - ֭ſɭэ ſɭw }ʃꞇ ʌ ſɭэ ֭ſɭэ
@returns p ( { x , z } ) - }ʃɹƽ */
// ⟨ ı],ᴜ ֭ſɭᴜ , ſɭэ ſɭᴜ , ꞙɭɿ , 📃 ⟩
const punktoCxe = ( pts: readonly [ number, number ][], s: number ): { x: number; z: number } =>
  punktoCxeBaza( pts, s, 0o10 ** -0o6 );

// ⟨ j͑ʃᴜ ſɭ,w , ſɭэ ֭ſɭэ , ꞙɭɿ , 📏 ⟩
let plataj = 0, maksPlata = 0, maksPlataK6h6 = "";
let saltoj = 0, maksSalto = 0;
let plejSupero = 0, superoLoko = "", superoSumo = 0, superoNombro = 0;
let plejBoreo = 0, boreoLoko = "", boritaj = 0;
for ( let i = 0; i < difinoj.length; i++ ) {
  const d = difinoj[i];
  const p2somani = d.w;
  const n2k = d.pts as [ number, number ][];
  const s2qena = kf2NivelanProfilon(n2k, p2somani, k6h6Alteco, akvaFino, ankroj);
// ⟨ j͑ʃᴜ ſɭ,w , ſɭɜ ſɭ,w , 📏 ⟩ , ſɭэ ֭ſɭэ , ꞙɭɿ , 📃 ⟩
  for ( let j = 0; j < s2qena.hal6da.length; j++ ) {
    const p = punktoCxe(n2k, s2qena.haxekuxa[ j ]);
    const supero = s2qena.hal6da[ j ] - alteco(p.x, p.z);
    superoSumo += supero;
    superoNombro++;
    if ( supero > plejSupero ) {
      plejSupero = supero;
      superoLoko = `${p.x.toFixed(1)},${p.z.toFixed(1)} ſɭэ ֭ſɭэ ${i}`;
    }
    if ( -supero > plejBoreo ) {
      plejBoreo = -supero;
      boreoLoko = `${p.x.toFixed(1)},${p.z.toFixed(1)} ſɭэ ֭ſɭэ ${i}`;
    }
    if ( -supero > 0o1/0o2 ) boritaj++;
  }
// ⟨ ſɭэ ſɭᴜ , ſɭэ ſɭ,w , ꞙɭı , 📏 ⟩
  let s0 = s2qena.haxekuxa[0], nuna = s2qena.hal6da[0];
  for ( let j = 1; j < s2qena.hal6da.length; j++ ) {
    if ( s2qena.hal6da[j] !== nuna ) {
      const sahakani = s2qena.haxekuxa[j] - s0;
      if ( sahakani > 0o10 ) plataj++;
      if ( sahakani > maksPlata ) {
        maksPlata = sahakani;
        const a = d.pts[0], b = d.pts[d.pts.length - 1];
        maksPlataK6h6 = `${a[0].toFixed(0)},${a[1].toFixed(0)} ｡ ${b[0].toFixed(0)},${b[1].toFixed(0)}`;
      }
      s0 = s2qena.haxekuxa[j];
      nuna = s2qena.hal6da[j];
    }
  }
  for ( let j = 1; j < s2qena.hal6da.length; j++ ) {
    const s = Math.abs(s2qena.hal6da[j] - s2qena.hal6da[j - 1]);
    if ( s > 0o1/0o2 + 0o1/0o100 ) {
      saltoj++;
      const t = s2qena.haxekuxa[j] / s2qena.sahakani || 0;
      const a = d.pts[0], b = d.pts[d.pts.length - 1];
      const x = a[0] + ( b[0] - a[0] ) * t, z = a[1] + ( b[1] - a[1] ) * t;
      console.log(`  j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ${s.toFixed(3)} ｡ ſɭэ ֭ſɭэ ${i} s ${s2qena.haxekuxa[j].toFixed(1)}` +
        ` ( ${x.toFixed(1)},${z.toFixed(1)} ) ${s2qena.hal6da[j - 1].toFixed(2)}` +
        ` ｡ j͑ʃ'ɔ ŋᷠɹ ${s2qena.hal6da[j].toFixed(2)} ｡ ſɭɜ ſɭ,w ${alteco(x, z).toFixed(2)}`);
    }
    if ( s > maksSalto ) maksSalto = s;
  }
}
console.log(`ſɭэ ֭ſɭэ ʌ j͑ʃ'ɔ ŋᷠɹ ｡ ſɭэ }ʃᴜ ꞙɭıɔ ｡ ſɭэ }ʃᴜ ſןᴜ ${plataj} ｡ ſɭэ }ʃᴜ ɭl̀ᴜ ${maksPlata.toFixed(1)} @${maksPlataK6h6}`);
console.log(`j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ʌ j͑ʃᴜ ʌ ſɭɜ ſɭ,w ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${plejSupero.toFixed(2)} @${superoLoko}` +
  ` ｡ ſȷƽᴜ ɭʃᴜ ${( superoSumo / Math.max(1, superoNombro) ).toFixed(2)}`);
console.log(`ſɭɜ ſɭ,w ɭl̀w ſȷw ɭl̀ᴜ ${plejBoreo.toFixed(2)} @${boreoLoko} ｡ ſᶘᴜ j͐ʃɹ ɭl̀w ${boritaj}`);
console.log(`ɭʃɜ }ʃᴜ ɭl̀ᴜ ſןᴜ ſᶘɹ ꞙɭııɔ.ɩ ${saltoj} ｡ j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${maksSalto.toFixed(3)}`);

// ⟨ ſɭэ ֭ſɭэ , ꞙɭı , ⟅ ſɭэ ſɭᴜ , 📏 ⟩
const montru = Number(process.argv[2] ?? 0);
if ( difinoj[montru] ) {
  const d = difinoj[montru];
  const s2qena = kf2NivelanProfilon(d.pts as [ number, number ][], d.w, k6h6Alteco, akvaFino, ankroj);
  const a = d.pts[0], b = d.pts[d.pts.length - 1];
  console.log(`⟨ ſɭэ ֭ſɭэ ${montru} ⟩ ( ${a[0].toFixed(1)}, ${a[1].toFixed(1)} ) ｡` +
    ` ( ${b[0].toFixed(1)}, ${b[1].toFixed(1)} ) ｡ ſɭэ }ʃᴜ ${s2qena.sahakani.toFixed(1)}`);
  const hax2pa: string[] = [];
  for ( let s = 0; s <= s2qena.sahakani; s += 0o4 ) {
    const t = s / s2qena.sahakani;
    const x = a[0] + ( b[0] - a[0] ) * t, z = a[1] + ( b[1] - a[1] ) * t;
    hax2pa.push(`${s.toFixed(0)}:${s2qena.altoCxe(s).toFixed(1)}/${alteco(x, z).toFixed(1)}`);
  }
  console.log("  ſɭэ ֭ſɭэ / ſɭɜ ſɭ,w " + hax2pa.join(" "));
}
console.log(`ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ${aktivajHaqakaj2().length}`);
