// ≺⧼ ចុងផ្លូវ និងចានភ្ជាប់ 🔬 ⧽≻
// ⟨ បង្ហាញចុងផ្លូវនីមួយៗ , ចំណុចភ្ជាប់ដែលនៅជិត , និងកម្ពស់ចាន ។
// ដើម្បីដឹងថាផ្លូវមួយណាទៅចំណត និងមួយណាទៅស្ពាន ។ 📃 ⟩
import { aktivajVojoj, aktivajDokoj } from "../../kantaoj/tero-datumaro/rultempo.js";
import { alteco } from "../../kantaoj/mondo/tereno.js";
import { troviVojaRetajnKunigojn } from "../../eskekoj/medio/voj-reto.js";
import { kreiVojoAlton } from "../../eskekoj/medio/vojoj/alto.js";
import { vojaSuproDeKunigo } from "../../eskekoj/medio/vojoj/formoj.js";
import { VOJA_EKSTERA_DUONO, VOJA_TRUA_DUONO } from "../../eskekoj/medio/vojoj/mezuroj.js";

const VOJOJ = aktivajVojoj().filter(v => v.punktoj.length >= 2);
const DOKOJ = aktivajDokoj();
const retaj = VOJOJ.map(v => ( { punktoj: v.punktoj, larĝo: v.larĝo } ));
const kunigoj = troviVojaRetajnKunigojn(retaj, DOKOJ);
const vojoAlteco = kreiVojoAlton(alteco, kunigoj);

console.log("<( ចំណុចភ្ជាប់ )>");
for ( const k of kunigoj ) {
  const supro = vojaSuproDeKunigo(k.x, k.z, k.direktaj, VOJA_EKSTERA_DUONO, vojoAlteco).supro;
  console.log(`  ( ${k.x.toFixed(2)}, ${k.z.toFixed(2)} ) ចាន ${supro.toFixed(2)}` +
    ` , ដី ${alteco(k.x, k.z).toFixed(2)} , ដៃ ${k.direktaj.length}` +
    ( k.fermitaj ? " , បិទ" : "" ));
}

console.log("<( ចុងផ្លូវ )>");
for ( let i = 0; i < VOJOJ.length; i++ ) {
  const p = VOJOJ[i].punktoj;
  for ( const [ nomo, q ] of [ [ "ដើម", p[0] ], [ "ចុង", p[p.length - 1] ] ] as const ) {
    let plej = Infinity, proksima: typeof kunigoj[number] | null = null;
    for ( const k of kunigoj ) {
      const d = Math.hypot(k.x - q[0], k.z - q[1]);
      if ( d < plej ) { plej = d; proksima = k; }
    }
    const supro = proksima && plej < VOJA_TRUA_DUONO * 0o2
      ? vojaSuproDeKunigo(proksima.x, proksima.z, proksima.direktaj, VOJA_EKSTERA_DUONO,
        vojoAlteco).supro : NaN;
    console.log(`  ${i} ${VOJOJ[i].nomo} ${nomo} ( ${q[0].toFixed(2)}, ${q[1].toFixed(2)} )` +
      ` , ចម្ងាយ ${plej.toFixed(2)}` +
      ` , ចាន ${Number.isNaN(supro) ? "-" : supro.toFixed(2)}` +
      ` , ដី ${alteco(q[0], q[1]).toFixed(2)}`);
  }
}

console.log("<( ចំណត )>");
for ( const d of DOKOJ ) {
  const r = d.rotacio ?? 0;
  console.log(`  ( ${d.x.toFixed(1)}, ${d.z.toFixed(1)} ) ជម្រៅ ${d.profundo}` +
    ` , បង្វិល ${( r * 180 / Math.PI ).toFixed(0)}°` +
    ` , មាត់ដី ( ${( d.x + Math.sin(r) * d.profundo / 2 ).toFixed(1)},` +
    ` ${( d.z + Math.cos(r) * d.profundo / 2 ).toFixed(1)} )` +
    ` , វាល ${vojoAlteco(d.x + Math.sin(r) * d.profundo / 2,
      d.z + Math.cos(r) * d.profundo / 2).toFixed(2)}`);
}
