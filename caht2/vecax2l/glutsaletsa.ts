// ≺⧼ ſ͔ɭͷ̗w ſᶘᴜ j͐ʃɔ ſᶘᴜ 🧪 ⧽≻

import * as THREE from "three";
import { tikHak6h6, tikHaqakaj2, tikHakaxte } from "../../kanta/mut6q-havop2/tlohk2nikziisai.js";
import { vepaqQox2n2kKaxten } from "../../kanta/nala/kaxte/qox2n2k-kaxte.js";
import { gluiK6h6tlakakn } from "../../skek2/qatsiike/hak6h6/scac6.js";
import { troviK6h6RetajnHaveb6kekn } from "../../skek2/qatsiike/k6h6-caxlefkakai.js";
import { kf2T6g6Pukek, kf2T6hnaPukek, kf2KuhalPukek } from "../../skek2/p6kpu/pukek.js";

const CELO: [ number, number ] = [ 0o160, -0o171 ];
const HAKAS2KANTA = tikHak6h6();
const HAQAKAJ2 = tikHaqakaj2();
const qena = new THREE.Scene();
const oro = kf2KuhalPukek(0xd8b058);
const qox2n2kHan2k: [ number, number ][][] = [];
const qox2n2kHaveb6kek: [ number, number ][] = [];
for ( const u of tikHakaxte() ) {
  const kaxte = vepaqQox2n2kKaxten(qena,
    { ptaluPal6: u.ptaluPal6, k6liqPal6: u.k6liqPal6, kekufxeso: false, hahufwuk2: false },
    [ u.ofsX, u.ofsZ ], oro, u.tlunakHak6liq ?? [] );
  for ( const d of kaxte.kas2kantaHavop2ni ) qox2n2kHan2k.push(d.pts);
  qox2n2kHaveb6kek.push( ...kaxte.tamc2kHan2k );
}
const hacaxlefkakai = HAKAS2KANTA.filter( v => v.n2k.length >= 0o2 ).map( v => ({ n2k: v.n2k, sefini: v.sefini }) );
const ne3ak2 = troviK6h6RetajnHaveb6kekn(hacaxlefkakai, HAQAKAJ2);
const hakxawa: [ number, number ][] = [ ...qox2n2kHaveb6kek, ...ne3ak2.map( k => [ k.x, k.z ] as [ number, number ] ) ];
const hat6lima = HAQAKAJ2.map( d => {
  const r = d.s2sabo ?? 0o0;
  return { x: d.x + Math.sin(r) * ( d.jufu / 0o2 ), z: d.z + Math.cos(r) * ( d.jufu / 0o2 ) };
});
const hascac6 = hacaxlefkakai.map(( v, vi ) => gluiK6h6tlakakn(v.n2k, hakxawa, hat6lima,
  [ ...qox2n2kHan2k, ...hacaxlefkakai.map(( w, wi ) => wi === vi ? [] : w.n2k ) ] as [ number, number ][][] ));
const haveb6kek = troviK6h6RetajnHaveb6kekn(hascac6.map(( p, i ) => ({ n2k: p, sefini: hacaxlefkakai[i].sefini })), HAQAKAJ2);
console.log( `ſןᴜ ſᶘɹ ʌ j͑ʃᴜꞇ ${haveb6kek.length}` );
for ( const k of haveb6kek ) {
  const d = Math.hypot(k.x - CELO[0o0], k.z - CELO[0o1]);
  if ( d > 0o5 ) continue;
  console.log( `@${k.x.toFixed(0o2)},${k.z.toFixed(0o2)} ֭ſɭэ ſɭw }ʃꞇ ${d.toFixed(0o2)}` +
    ` , ſɭᴜ ŋᷠᴜ ${k.c2w2qa.map( b => `(${b[0o0].toFixed(0o2)},${b[0o1].toFixed(0o2)})` ).join( " " )}` +
    ` , ſȷwɔ˞ ${k.hapukxe.join( "," )}` );
}
console.log( "ſɭэ ֭ſɭэ ʌ ſɟɔ ɭʃɹ ⟅ " + hascac6.map(( p, i ) => `${HAKAS2KANTA[i].ksaka} (${p[0o0][0o0].toFixed(0o1)},${p[0o0][0o1].toFixed(0o1)})-` +
  `(${p[p.length - 0o1][0o0].toFixed(0o1)},${p[p.length - 0o1][0o1].toFixed(0o1)})` ).join( " | " ) );}
