// ≺⧼ ʃэ ɭʃɔȝ ꞁȷ̀ᴜ }ʃꞇ ʌ ſɭэ ֭ſɭэ j͑ʃᴜꞇ ʌ ſןw ſɭᴜƴ ʌ j͐ʃɹ ŋᷠɔ 🧪 ⧽≻
// ⟨ បង្ហាញរន្ធភ្ជាប់ដែលបានបង្កើត ៖ តើដៃរបស់ចានភ្ជាប់ឆ្ពោះទៅផ្លូវដែលទាញមកឬអត់ ។ 📃 ⟩
import * as THREE from "three";
import { aktivajHak6h6, aktivajHaqakaj2, aktivajHakaxte } from "../../kantaoj/tero-datumaro/rultempo.js";
import { vepaqKradanKaxten } from "../../kantaoj/mondo/kaxte/krada-kaxte.js";
import { gluiK6h6Finon } from "../../eskekoj/medio/hak6h6/gluado.js";
import { troviK6h6RetajnHaveb6kekn } from "../../eskekoj/medio/voj-reto.js";
import { kf2T6g6Pukek, kf2T6hnaPukek, kf2KuhalPukek } from "../../eskekoj/komunajxoj/materialoj.js";

const CELO: [ number, number ] = [ 0o160, -0o171 ];
const VOJOJ = aktivajHak6h6();
const DOKOJ = aktivajHaqakaj2();
const qena = new THREE.Scene();
const oro = kf2KuhalPukek(0xd8b45a);
const kradajPunktoj: [ number, number ][][] = [];
const kradajHaveb6kek: [ number, number ][] = [];
for ( const u of aktivajHakaxte() ) {
  const kaxte = vepaqKradanKaxten(qena,
    { arangxaGrando: u.arangxaGrando, blokaGrando: u.blokaGrando, keuxfhxeso: false, lampoj: false },
    [ u.ofsX, u.ofsZ ], oro, u.aldonajBlokoj ?? [] );
  for ( const d of kaxte.vojDifinoj ) kradajPunktoj.push(d.pts);
  kradajHaveb6kek.push( ...kaxte.kunigajPunktoj );
}
const retaj = VOJOJ.filter( v => v.n2k.length >= 2 ).map( v => ({ n2k: v.n2k, sefini: v.sefini }) );
const ne3ak2 = troviK6h6RetajnHaveb6kekn(retaj, DOKOJ);
const celoj: [ number, number ][] = [ ...kradajHaveb6kek, ...ne3ak2.map( k => [ k.x, k.z ] as [ number, number ] ) ];
const landoj = DOKOJ.map( d => {
  const r = d.rotacio ?? 0;
  return { x: d.x + Math.sin(r) * ( d.profundo / 2 ), z: d.z + Math.cos(r) * ( d.profundo / 2 ) };
});
const gluitaj = retaj.map(( v, vi ) => gluiK6h6Finon(v.n2k, celoj, landoj,
  [ ...kradajPunktoj, ...retaj.map(( w, wi ) => wi === vi ? [] : w.n2k ) ] as [ number, number ][][] ));
const haveb6kek = troviK6h6RetajnHaveb6kekn(gluitaj.map(( p, i ) => ({ n2k: p, sefini: retaj[i].sefini })), DOKOJ);
console.log( `ចានភ្ជាប់សរុប ${haveb6kek.length}` );
for ( const k of haveb6kek ) {
  const d = Math.hypot(k.x - CELO[0], k.z - CELO[1]);
  if ( d > 5 ) continue;
  console.log( `@${k.x.toFixed(2)},${k.z.toFixed(2)} ចម្ងាយ ${d.toFixed(2)}` +
    ` , ដៃ ${k.direktaj.map( b => `(${b[0].toFixed(2)},${b[1].toFixed(2)})` ).join( " " )}` +
    ` , បិទ ${k.fermitaj.join( "," )}` );
}
console.log( "ចុងផ្លូវ ៖ " + gluitaj.map(( p, i ) => `${VOJOJ[i].ksaka} (${p[0][0].toFixed(1)},${p[0][1].toFixed(1)})-` +
  `(${p[p.length - 1][0].toFixed(1)},${p[p.length - 1][1].toFixed(1)})` ).join( " | " ) );
