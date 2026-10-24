// ≺⧼ រកចន្លោះចុងផ្លូវ 🧪 ⧽≻
// ⟨ ចុងផ្លូវដែលឈប់ខ្លីពីផ្លូវផ្សេង ៖ ត្រូវឃើញជាចន្លោះស្មៅដូចជំហានមួយបាត់ ។
// ស្គ្រីបនេះវាស់ចន្លោះនោះមុន និងក្រោយការទាញចុងផ្លូវ ។ 📃 ⟩
import * as THREE from "three";
import { aktivajVojoj, aktivajDokoj, aktivajUrboj } from "../../kantaoj/tero-datumaro/rultempo.js";
import { konstruiKradanUrbon } from "../../kantaoj/mondo/urbo/krada-urbo.js";
import { gluiVojaFinon } from "../../kantaoj/mondo/urbo/gluado.js";
import { troviVojaRetajnKunigojn } from "../../eskekoj/medio/voj-reto.js";
import { kreiDioritanMaterialon, kreiAndezitanMaterialon, kreiOranMaterialon } from "../../eskekoj/komunajxoj/materialoj.js";
import { VOJA_EKSTERA_DUONO, VOJA_BORDA_LARĜO } from "../../eskekoj/medio/vojoj/mezuroj.js";

const VOJOJ = aktivajVojoj();
const DOKOJ = aktivajDokoj();
const URBOJ = aktivajUrboj();

const sceno = new THREE.Scene();
const diorito = kreiDioritanMaterialon( new THREE.Texture() );
const andezito = kreiAndezitanMaterialon( new THREE.Texture() );
const oro = kreiOranMaterialon( 0xd8b45a );

const kradajVojoj: [ number, number ][][] = [];
const kradajKunigoj: [ number, number ][] = [];
for ( const u of URBOJ ) {
  const urbo = konstruiKradanUrbon( sceno,
    { arangxaGrando: u.arangxaGrando, blokaGrando: u.blokaGrando, keuxfhxeso: false, lampoj: false },
    [ u.ofsX, u.ofsZ ], oro, u.aldonajBlokoj ?? [] );
  for ( const d of urbo.vojDifinoj ) kradajVojoj.push(d.pts);
  kradajKunigoj.push( ...urbo.kunigajPunktoj );
}

const retaj = VOJOJ.filter( v => v.punktoj.length >= 2 ).map( v => ({ punktoj: v.punktoj, larĝo: v.larĝo }) );
const antaŭajKunigoj = troviVojaRetajnKunigojn(retaj, DOKOJ);
const celoj: [ number, number ][] = [ ...kradajKunigoj,
  ...antaŭajKunigoj.map( k => [ k.x, k.z ] as [ number, number ] ) ];
const landoj = DOKOJ.map( d => {
  const r = d.rotacio ?? 0;
  return { x: d.x + Math.sin(r) * ( d.profundo / 2 ), z: d.z + Math.cos(r) * ( d.profundo / 2 ) };
});

function projekcio( x: number, z: number, a: readonly [ number, number ], b: readonly [ number, number ] ) {
  const dx = b[0] - a[0], dz = b[1] - a[1];
  const l2 = dx * dx + dz * dz;
  if ( l2 < 1e-9 ) return null;
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
  return plej - ( VOJA_EKSTERA_DUONO - VOJA_BORDA_LARĜO / 4 );
}

let antaŭe = 0, poste = 0;
const ĉiuj = VOJOJ.filter( v => v.punktoj.length >= 2 );
for ( let vi = 0; vi < ĉiuj.length; vi++ ) {
  const originalaj = ĉiuj[vi].punktoj;
  const gluitaj = gluiVojaFinon(originalaj, celoj, landoj);
  const aliaj = [ ...kradajVojoj, ...ĉiuj.map( v => v.punktoj ) ];
  for ( const [ fina, i ] of [ [ true, originalaj.length - 1 ], [ false, 0 ] ] as const ) {
    const e = originalaj[i];
    if ( landoj.some( l => Math.hypot(l.x - e[0], l.z - e[1]) < 1 ) ) continue;
    const f = fendo(e, kradajVojoj.length + vi, aliaj);
    if ( f > 0o1/0o10 && f < 0o4 ) {
      antaŭe++;
      const g = gluitaj[i];
      const postF = fendo(g, kradajVojoj.length + vi, aliaj);
      if ( postF > 0o1/0o10 && postF < 0o4 ) poste++;
      console.log( `មុន ${f.toFixed(2)} → ក្រោយ ${postF.toFixed(2)} ៖ ${( ĉiuj[vi].nomo ?? "vojo" )} ` +
        `( ${e[0].toFixed(1)}, ${e[1].toFixed(1)} )` );
    }
  }
}
console.log( `ទីក្រុង ${URBOJ.map( u => u.nomo ).join( "+" )} , ផ្លូវ ${ĉiuj.map( v => v.nomo ).join( "/" )}` );
console.log( `ផ្លូវ ${ĉiuj.length} , ចន្លោះមុន ${antaŭe} , ក្រោយ ${poste}` );

for ( const v of ĉiuj ) console.log( `⟪ ${v.nomo} ⟫ ` + v.punktoj.map( p => `(${p[0].toFixed(1)},${p[1].toFixed(1)})` ).join( " " ) );
