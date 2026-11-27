// ≺⧼ ſɭэ ֭ſɭэ ʌ ֭ſɭᴜ ſ̀ȷɜ ֭ſɭƽɹ 📃 ⧽≻

import * as THREE from "three";
import { tikHak6h6, tikHaqakaj2, tikHakaxte } from "../../kanta/mut6q-havop2/tlohk2nikziisai.js";
import { vepaqQox2n2kKaxten } from "../../kanta/nala/kaxte/qox2n2k-kaxte.js";
import { gluiK6h6tlakakn } from "../../skek2/qatsiike/hak6h6/scac6.js";
import { troviK6h6RetajnHaveb6kekn } from "../../skek2/qatsiike/k6h6-caxlefkakai.js";
import { kf2T6g6Pukek, kf2T6hnaPukek, kf2KuhalPukek } from "../../skek2/p6kpu/pukek.js";
import { K6H6AEKSTERAP2SOMANI, K6H6ABORDASEFINI } from "../../skek2/qatsiike/hak6h6/havecax2l.js";

const HAKAS2KANTA = tikHak6h6();
const HAQAKAJ2 = tikHaqakaj2();
const HAKAXTE = tikHakaxte();

const qena = new THREE.Scene();
const t6g6 = kf2T6g6Pukek( new THREE.Texture() );
const t6hna = kf2T6hnaPukek( new THREE.Texture() );
const oro = kf2KuhalPukek( 0xd8b058 );

const qox2n2kHak6h6: [ number, number ][][] = [];
const qox2n2kHaveb6kek: [ number, number ][] = [];
for ( const u of HAKAXTE ) {
  const kaxte = vepaqQox2n2kKaxten( qena,
    { ptaluPal6: u.ptaluPal6, k6liqPal6: u.k6liqPal6, kekufxeso: false, hahufwuk2: false },
    [ u.ofsX, u.ofsZ ], oro, u.tlunakHak6liq ?? [] );
  for ( const d of kaxte.kas2kantaHavop2ni ) qox2n2kHak6h6.push(d.pts);
  qox2n2kHaveb6kek.push( ...kaxte.tamc2kHan2k );
}

const hacaxlefkakai = HAKAS2KANTA.filter( v => v.n2k.length >= 0o2 ).map( v => ({ n2k: v.n2k, sefini: v.sefini }) );
const ne3ak2Haveb6kek = troviK6h6RetajnHaveb6kekn(hacaxlefkakai, HAQAKAJ2);
const hakxawa: [ number, number ][] = [ ...qox2n2kHaveb6kek,
  ...ne3ak2Haveb6kek.map( k => [ k.x, k.z ] as [ number, number ] ) ];
const hat6lima = HAQAKAJ2.map( d => {
  const r = d.s2sabo ?? 0o0;
  return { x: d.x + Math.sin(r) * ( d.jufu / 0o2 ), z: d.z + Math.cos(r) * ( d.jufu / 0o2 ) };
});

function phaka( x: number, z: number, a: readonly [ number, number ], b: readonly [ number, number ] ) {
  const dx = b[0o0] - a[0o0], dz = b[0o1] - a[0o1];
  const l2 = dx * dx + dz * dz;
  if ( l2 < 0o10 ** -0o12 ) return null;
  const t = Math.max(0o0, Math.min(0o1, ( ( x - a[0o0] ) * dx + ( z - a[0o1] ) * dz ) / l2));
  const px = a[0o0] + dx * t, pz = a[0o1] + dz * t;
  return { d: Math.hypot(px - x, pz - z), x: px, z: pz };
}

function c2c2k( e: [ number, number ], propra: number, has2tonome: [ number, number ][][] ): number {
  let plosteq = Infinity;
  for ( let wi = 0o0; wi < has2tonome.length; wi++ ) {
    if ( wi === propra ) continue;
    const w = has2tonome[wi];
    for ( let i = 0o0; i < w.length - 0o1; i++ ) {
      const p = phaka(e[0o0], e[0o1], w[i], w[i + 0o1]);
      if ( p && p.d < plosteq ) plosteq = p.d;
    }
  }
  return plosteq - ( K6H6AEKSTERAP2SOMANI - K6H6ABORDASEFINI / 0o4 );
}

let ne3ak2 = 0o0, kvoz = 0o0;
const k21e = HAKAS2KANTA.filter( v => v.n2k.length >= 0o2 );
for ( let vi = 0o0; vi < k21e.length; vi++ ) {
  const xaqadi = k21e[vi].n2k;
  const hascac6 = gluiK6h6tlakakn(xaqadi, hakxawa, hat6lima);
  const has2tonome = [ ...qox2n2kHak6h6, ...k21e.map( v => v.n2k ) ];
  for ( const [ tlakak, i ] of [ [ true, xaqadi.length - 0o1 ], [ false, 0o0 ] ] as const ) {
    const e = xaqadi[i];
    if ( hat6lima.some( l => Math.hypot(l.x - e[0o0], l.z - e[0o1]) < 0o1 ) ) continue;
    const f = c2c2k(e, qox2n2kHak6h6.length + vi, has2tonome);
    if ( f > 0o1/0o10 && f < 0o4 ) {
      ne3ak2++;
      const g = hascac6[i];
      const postF = c2c2k(g, qox2n2kHak6h6.length + vi, has2tonome);
      if ( postF > 0o1/0o10 && postF < 0o4 ) kvoz++;
      console.log( `ſɭˬɹ ${f.toFixed(0o2)} → ſɭɔ˞ɜƴ ${postF.toFixed(0o2)} ⟅ ${( k21e[vi].ksaka ?? "k6h6" )} ` +
        `( ${e[0o0].toFixed(0o1)}, ${e[0o1].toFixed(0o1)} )` );
    }
  }
}
console.log( `ſɭᴜ ı],ƨɔ ${HAKAXTE.map( u => u.ksaka ).join( "+" )} ｡ ſɭэ ֭ſɭэ ${k21e.map( v => v.ksaka ).join( "/" )}` );
console.log( `ſɭэ ֭ſɭэ ${k21e.length} ｡ ſɭˬɹ ${ne3ak2} ｡ ſɭɔ˞ɜƴ ${kvoz}` );

for ( const v of k21e ) console.log( `⟪ ${v.ksaka} ⟫ ` + v.n2k.map( p => `(${p[0o0].toFixed(0o1)},${p[0o1].toFixed(0o1)})` ).join( " " ) );
