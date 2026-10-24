// ≺⧼ ការសាកល្បងការទាញចុងផ្លូវ 🧪 ⧽≻
// ⟨ បង្ហាញរន្ធភ្ជាប់ដែលបានបង្កើត ៖ តើដៃរបស់ចានភ្ជាប់ឆ្ពោះទៅផ្លូវដែលទាញមកឬអត់ ។ 📃 ⟩
import * as THREE from "three";
import { aktivajVojoj, aktivajDokoj, aktivajUrboj } from "../../kantaoj/tero-datumaro/rultempo.js";
import { konstruiKradanUrbon } from "../../kantaoj/mondo/urbo/krada-urbo.js";
import { gluiVojaFinon } from "../../kantaoj/mondo/urbo/gluado.js";
import { troviVojaRetajnKunigojn } from "../../eskekoj/medio/voj-reto.js";
import { kreiDioritanMaterialon, kreiAndezitanMaterialon, kreiOranMaterialon } from "../../eskekoj/komunajxoj/materialoj.js";

const CELO: [ number, number ] = [ 112, -121 ];
const VOJOJ = aktivajVojoj();
const DOKOJ = aktivajDokoj();
const sceno = new THREE.Scene();
const oro = kreiOranMaterialon(0xd8b45a);
const kradajPunktoj: [ number, number ][][] = [];
const kradajKunigoj: [ number, number ][] = [];
for ( const u of aktivajUrboj() ) {
  const urbo = konstruiKradanUrbon(sceno,
    { arangxaGrando: u.arangxaGrando, blokaGrando: u.blokaGrando, keuxfhxeso: false, lampoj: false },
    [ u.ofsX, u.ofsZ ], oro, u.aldonajBlokoj ?? [] );
  for ( const d of urbo.vojDifinoj ) kradajPunktoj.push(d.pts);
  kradajKunigoj.push( ...urbo.kunigajPunktoj );
}
const retaj = VOJOJ.filter( v => v.punktoj.length >= 2 ).map( v => ({ punktoj: v.punktoj, larĝo: v.larĝo }) );
const antaŭaj = troviVojaRetajnKunigojn(retaj, DOKOJ);
const celoj: [ number, number ][] = [ ...kradajKunigoj, ...antaŭaj.map( k => [ k.x, k.z ] as [ number, number ] ) ];
const landoj = DOKOJ.map( d => {
  const r = d.rotacio ?? 0;
  return { x: d.x + Math.sin(r) * ( d.profundo / 2 ), z: d.z + Math.cos(r) * ( d.profundo / 2 ) };
});
const gluitaj = retaj.map(( v, vi ) => gluiVojaFinon(v.punktoj, celoj, landoj,
  [ ...kradajPunktoj, ...retaj.map(( w, wi ) => wi === vi ? [] : w.punktoj ) ] as [ number, number ][][] ));
const kunigoj = troviVojaRetajnKunigojn(gluitaj.map(( p, i ) => ({ punktoj: p, larĝo: retaj[i].larĝo })), DOKOJ);
console.log( `ចានភ្ជាប់សរុប ${kunigoj.length}` );
for ( const k of kunigoj ) {
  const d = Math.hypot(k.x - CELO[0], k.z - CELO[1]);
  if ( d > 5 ) continue;
  console.log( `@${k.x.toFixed(2)},${k.z.toFixed(2)} ចម្ងាយ ${d.toFixed(2)}` +
    ` , ដៃ ${k.direktaj.map( b => `(${b[0].toFixed(2)},${b[1].toFixed(2)})` ).join( " " )}` +
    ` , បិទ ${k.fermitaj.join( "," )}` );
}
console.log( "ចុងផ្លូវ ៖ " + gluitaj.map(( p, i ) => `${VOJOJ[i].nomo} (${p[0][0].toFixed(1)},${p[0][1].toFixed(1)})-` +
  `(${p[p.length - 1][0].toFixed(1)},${p[p.length - 1][1].toFixed(1)})` ).join( " | " ) );
