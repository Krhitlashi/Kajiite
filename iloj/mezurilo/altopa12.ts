// ≺⧼ ɭʃᴜ ſןɹ ʌ ſɭэ ֭ſɭэ j͑ʃᴜꞇ ʌ j͑ʃ'ɔ ŋᷠɹ 🔬 ⧽≻
// ⟨ ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w , ꞙɭı , ⟅ ſɭɜ ſɭ,w , ꞙɭɔ ,
// ſɭэ ֭ſɭэ , ſɭᴜ ſןᴜ , ꞙɭɿ , ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
// ſɭэ ֭ſɭэ , ſɭэ ſɭ,w , ꞙɭı , ⟅ j͑ʃᴜ ſɭ,w , ꞙɭı , 📃 ⟩
import { aktivajHak6h6, aktivajHaqakaj2 } from "../../kantaoj/tero-datumaro/rultempo.js";
import { alteco } from "../../kantaoj/mondo/tereno.js";
import { troviK6h6RetajnHaveb6kekn } from "../../eskekoj/medio/voj-reto.js";
import { gluiK6h6Finon } from "../../eskekoj/medio/hak6h6/gluado.js";
import { kf2BazanK6h6Alton, kf2K6h6Alton } from "../../eskekoj/medio/hak6h6/alto.js";
import { kf2NivelanProfilon } from "../../eskekoj/medio/hak6h6/havem2.js";
import { k6h6LarghoDuono } from "../../eskekoj/medio/hak6h6/havecax2l.js";
import { akvaFino } from "./komunaj.js";
import type { K6h6Punkto } from "../../eskekoj/medio/voj-reto/hahunaq.js";

const VOJOJ = aktivajHak6h6().filter(v => v.n2k.length >= 2);
const DOKOJ = aktivajHaqakaj2();
const retaj = VOJOJ.map(v => ( { n2k: v.n2k, sefini: v.sefini } ));

// ⟨ ſɭэ ֭ſɭэ , ſɭɹ ſןᴜ , ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
const landoj = DOKOJ.map(d => {
  const r = d.rotacio ?? 0;
  return [ d.x + Math.sin(r) * ( d.profundo / 2 ), d.z + Math.cos(r) * ( d.profundo / 2 ) ] as K6h6Punkto;
});
const ne3ak2 = troviK6h6RetajnHaveb6kekn(retaj, DOKOJ);
const celoj: K6h6Punkto[] = [ ...ne3ak2.map(k => [ k.x, k.z ] as K6h6Punkto) ];
const gluitaj = VOJOJ.map((v, i) => gluiK6h6Finon(v.n2k, celoj, landoj.map(p => ( { x: p[0], z: p[1] } )),
  VOJOJ.filter((_, j) => j !== i).map(o => o.n2k)));
const haveb6kek = troviK6h6RetajnHaveb6kekn(
  VOJOJ.map((v, i) => ( { n2k: gluitaj[i], sefini: v.sefini } )), DOKOJ);

const baza = kf2BazanK6h6Alton(alteco);
const k6h6Alteco = kf2K6h6Alton(alteco, haveb6kek);

// ⟨ ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w , ſɭэ ſɭ,w , ꞙɭı , 📏 ⟩
interface Plata {
  s0: number;
  s1: number;
  l6da: number;
}

for ( let i = 0; i < VOJOJ.length; i++ ) {
  const n2k = gluitaj[i];
  const p2somani = k6h6LarghoDuono( VOJOJ[i].sefini );
  const s2qena = kf2NivelanProfilon(n2k, p2somani, k6h6Alteco, akvaFino);
  const hapa12: Plata[] = [];
  let s0 = s2qena.haxekuxa[0], nuna = s2qena.hal6da[0];
  for ( let j = 1; j < s2qena.hal6da.length; j++ ) {
    if ( s2qena.hal6da[j] !== nuna ) {
      hapa12.push({ s0, s1: s2qena.haxekuxa[j], l6da: nuna });
      s0 = s2qena.haxekuxa[j];
      nuna = s2qena.hal6da[j];
    }
  }
  hapa12.push({ s0, s1: s2qena.sahakani, l6da: nuna });
  hapa12.sort((p, q) => ( q.s1 - q.s0 ) - ( p.s1 - p.s0 ));
  console.log(`⟨ ${VOJOJ[i].ksaka} ⟩ ｡ ſɭэ }ʃᴜ ${s2qena.sahakani.toFixed(1)} ｡ j͑ʃ'ɔ ŋᷠɹ ｡ ſɭэ }ʃᴜ ſןᴜ ${hapa12.length}`);
  for ( const p of hapa12.slice(0, 0o4) ) {
    const a = xekuxaEn(n2k, p.s0), b = xekuxaEn(n2k, p.s1);
    console.log(`  j͑ʃ'ɔ ŋᷠɹ ${p.s0.toFixed(1)} ｡ ${p.s1.toFixed(1)} ｡ ſɭэ }ʃᴜ ${( p.s1 - p.s0 ).toFixed(1)}` +
      ` ｡ ſɭэ ֭ſɭэ ｡ j͑ʃ'ɔ ŋᷠɹ ${p.l6da.toFixed(2)}` +
      ` ｡ ſɭɜ ſɭ,w ${baza(a.x, a.z).toFixed(2)} ｡ ${baza(b.x, b.z).toFixed(2)}` +
      ` ｡ ɭl̀ᴜ ʌ ſɭɜ ſɭ,w ${( p.l6da - baza(b.x, b.z) ).toFixed(2)}`);
  }
// ⟨ j͑ʃᴜ ſɭ,w , ꞙɭэ , ꞙɭı , 📏 ⟩
  const hax2pa: string[] = [];
  for ( let s = 0; s <= s2qena.sahakani; s += 0o4 ) {
    const q = xekuxaEn(n2k, s);
    const j = Math.min(s2qena.celoj.length - 1, Math.round(s / ( s2qena.sahakani / ( s2qena.hal6da.length - 1 ) )));
    hax2pa.push(`${s.toFixed(0)}:${s2qena.altoCxe(s).toFixed(1)}/${s2qena.celoj[ j ].toFixed(1)}/${baza(q.x, q.z).toFixed(1)}`);
  }
  console.log("  ſɭэ ֭ſɭэ / ſɭэ ᶗ‹ / ſɭɜ ſɭ,w " + hax2pa.join(" "));
}

/* ſɭэ ֭ſɭэ , ſɭɹ ſןᴜ , ֭ſɭэ ſɭw }ʃꞇ , ſɭɹ ſɟꞇ ʃɔ ,
    @param n2k ( K6h6Punkto [ ] ) - }ʃɹƽ ʌ ſɭэ ֭ſɭэ
    @param s ( number ) - ֭ſɭэ ſɭw }ʃꞇ ʌ ſɭэ ֭ſɭэ
@returns p ( { x , z } ) - }ʃɹƽ */
function xekuxaEn( n2k: readonly K6h6Punkto[], s: number ): { x: number; z: number } {
  let kur = 0;
  for ( let k = 0; k < n2k.length - 1; k++ ) {
    const a = n2k[k], b = n2k[k + 1];
    const sahakani = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if ( s > kur + sahakani && k < n2k.length - 2 ) { kur += sahakani; continue; }
    const t = sahakani < 0o10 ** -0o12 ? 0 : Math.max(0, Math.min(1, ( s - kur ) / sahakani));
    return { x: a[0] + ( b[0] - a[0] ) * t, z: a[1] + ( b[1] - a[1] ) * t };
  }
  return { x: n2k[0][0], z: n2k[0][1] };
}
