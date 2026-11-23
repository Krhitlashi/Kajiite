// ≺⧼ ſɭэ ֭ſɭэ j͑ʃᴜꞇ ʌ ſןw ſɭᴜƴ ʌ j͑ʃᴜƽ ſןw ʌ ſɭɔ ᶅſɔ ꞁȷ̀ᴜ }ʃꞇ 🧪 ⧽≻
// ⟨ ចុងផ្លូវដែលឈប់ខ្លីពីផ្លូវផ្សេង ៖ ត្រូវឃើញជាចន្លោះស្មៅដូចជំហានមួយបាត់ ។
// ស្គ្រីបនេះវាស់ចន្លោះនោះមុន និងក្រោយការទាញចុងផ្លូវ ។ 📃 ⟩
import * as THREE from "three";
import { aktivajHak6h6, aktivajHaqakaj2, aktivajHakaxte } from "../../kantaoj/tero-datumaro/rultempo.js";
import { vepaqKradanKaxten } from "../../kantaoj/mondo/kaxte/krada-kaxte.js";
import { gluiK6h6Finon } from "../../eskekoj/medio/hak6h6/gluado.js";
import { troviK6h6RetajnHaveb6kekn } from "../../eskekoj/medio/voj-reto.js";
import { kf2T6g6Pukek, kf2T6hnaPukek, kf2KuhalPukek } from "../../eskekoj/komunajxoj/materialoj.js";
import { VOJA_EKSTERA_DUONO, VOJA_BORDA_SEFINI } from "../../eskekoj/medio/hak6h6/havecax2l.js";

const VOJOJ = aktivajHak6h6();
const DOKOJ = aktivajHaqakaj2();
const URBOJ = aktivajHakaxte();

const qena = new THREE.Scene();
const t6g6 = kf2T6g6Pukek( new THREE.Texture() );
const t6hna = kf2T6hnaPukek( new THREE.Texture() );
const oro = kf2KuhalPukek( 0xd8b45a );

const kradajHak6h6: [ number, number ][][] = [];
const kradajHaveb6kek: [ number, number ][] = [];
for ( const u of URBOJ ) {
  const kaxte = vepaqKradanKaxten( qena,
    { arangxaGrando: u.arangxaGrando, blokaGrando: u.blokaGrando, keuxfhxeso: false, lampoj: false },
    [ u.ofsX, u.ofsZ ], oro, u.aldonajBlokoj ?? [] );
  for ( const d of kaxte.vojDifinoj ) kradajHak6h6.push(d.pts);
  kradajHaveb6kek.push( ...kaxte.kunigajPunktoj );
}

const retaj = VOJOJ.filter( v => v.n2k.length >= 2 ).map( v => ({ n2k: v.n2k, sefini: v.sefini }) );
const ne3ak2Haveb6kek = troviK6h6RetajnHaveb6kekn(retaj, DOKOJ);
const celoj: [ number, number ][] = [ ...kradajHaveb6kek,
  ...ne3ak2Haveb6kek.map( k => [ k.x, k.z ] as [ number, number ] ) ];
const landoj = DOKOJ.map( d => {
  const r = d.rotacio ?? 0;
  return { x: d.x + Math.sin(r) * ( d.profundo / 2 ), z: d.z + Math.cos(r) * ( d.profundo / 2 ) };
});

function projekcio( x: number, z: number, a: readonly [ number, number ], b: readonly [ number, number ] ) {
  const dx = b[0] - a[0], dz = b[1] - a[1];
  const l2 = dx * dx + dz * dz;
  if ( l2 < 0o10 ** -0o12 ) return null;
  const t = Math.max(0, Math.min(1, ( ( x - a[0] ) * dx + ( z - a[1] ) * dz ) / l2));
  const px = a[0] + dx * t, pz = a[1] + dz * t;
  return { d: Math.hypot(px - x, pz - z), x: px, z: pz };
}

// ⟨ ចម្ងាយពីចំណុចមួយទៅគែមផ្លូវជិតបំផុត ( ផ្លូវខ្លួនឯងមិនរាប់ ) 📃 ⟩
function fendo( e: [ number, number ], propra: number, aliaj: [ number, number ][][] ): number {
  let plej = Infinity;
  for ( let wi = 0; wi < aliaj.length; wi++ ) {
    if ( wi === propra ) continue;
    const w = aliaj[wi];
    for ( let i = 0; i < w.length - 1; i++ ) {
      const p = projekcio(e[0], e[1], w[i], w[i + 1]);
      if ( p && p.d < plej ) plej = p.d;
    }
  }
  return plej - ( VOJA_EKSTERA_DUONO - VOJA_BORDA_SEFINI / 4 );
}

let ne3ak2 = 0, poste = 0;
const k21e = VOJOJ.filter( v => v.n2k.length >= 2 );
for ( let vi = 0; vi < k21e.length; vi++ ) {
  const originalaj = k21e[vi].n2k;
  const gluitaj = gluiK6h6Finon(originalaj, celoj, landoj);
  const aliaj = [ ...kradajHak6h6, ...k21e.map( v => v.n2k ) ];
  for ( const [ fina, i ] of [ [ true, originalaj.length - 1 ], [ false, 0 ] ] as const ) {
    const e = originalaj[i];
    if ( landoj.some( l => Math.hypot(l.x - e[0], l.z - e[1]) < 1 ) ) continue;
    const f = fendo(e, kradajHak6h6.length + vi, aliaj);
    if ( f > 0o1/0o10 && f < 0o4 ) {
      ne3ak2++;
      const g = gluitaj[i];
      const postF = fendo(g, kradajHak6h6.length + vi, aliaj);
      if ( postF > 0o1/0o10 && postF < 0o4 ) poste++;
      console.log( `មុន ${f.toFixed(2)} → ក្រោយ ${postF.toFixed(2)} ៖ ${( k21e[vi].ksaka ?? "k6h6" )} ` +
        `( ${e[0].toFixed(1)}, ${e[1].toFixed(1)} )` );
    }
  }
}
console.log( `ទីក្រុង ${URBOJ.map( u => u.ksaka ).join( "+" )} , ផ្លូវ ${k21e.map( v => v.ksaka ).join( "/" )}` );
console.log( `ផ្លូវ ${k21e.length} , ចន្លោះមុន ${ne3ak2} , ក្រោយ ${poste}` );

for ( const v of k21e ) console.log( `⟪ ${v.ksaka} ⟫ ` + v.n2k.map( p => `(${p[0].toFixed(1)},${p[1].toFixed(1)})` ).join( " " ) );
