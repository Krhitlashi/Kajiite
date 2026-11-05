// ≺⧼ ដីជុំវិញផ្លូវ 🔬 ⧽≻
// ⟨ បង្ហាញកម្ពស់ដីនៅកណ្តាលផ្លូវ និងនៅសងខាង ។ ដើម្បីដឹងថាការលើកកម្ពស់
// មកពីជម្រាលចំហៀង ឬមកពីពំនូកក្នុងរង្វង់ ។ 📃 ⟩
import { aktivajVojoj, aktivajDokoj } from "../../kantaoj/tero-datumaro/rultempo.js";
import { alteco } from "../../kantaoj/mondo/tereno.js";
import { troviVojaRetajnKunigojn } from "../../eskekoj/medio/voj-reto.js";
import { gluiVojaFinon } from "../../eskekoj/medio/vojoj/gluado.js";
import { kreiBazanVojoAlton, kreiVojoAlton } from "../../eskekoj/medio/vojoj/alto.js";
import { vojaLarghoDuono } from "../../eskekoj/medio/vojoj/mezuroj.js";
import type { VojaPunkto } from "../../eskekoj/medio/voj-reto/tipoj.js";

const VOJOJ = aktivajVojoj().filter(v => v.punktoj.length >= 2);
const DOKOJ = aktivajDokoj();
const landoj = DOKOJ.map(d => {
  const r = d.rotacio ?? 0;
  return [ d.x + Math.sin(r) * ( d.profundo / 2 ), d.z + Math.cos(r) * ( d.profundo / 2 ) ] as VojaPunkto;
});
const antaŭaj = troviVojaRetajnKunigojn(
  VOJOJ.map(v => ( { punktoj: v.punktoj, larĝo: v.larĝo } )), DOKOJ);
const gluitaj = VOJOJ.map((v, i) => gluiVojaFinon(v.punktoj,
  antaŭaj.map(k => [ k.x, k.z ] as VojaPunkto),
  landoj.map(p => ( { x: p[0], z: p[1] } )),
  VOJOJ.filter((_, j) => j !== i).map(o => o.punktoj)));
const kunigoj = troviVojaRetajnKunigojn(
  VOJOJ.map((v, i) => ( { punktoj: gluitaj[i], larĝo: v.larĝo } )), DOKOJ);
const baza = kreiBazanVojoAlton(alteco);
const vojoAlteco = kreiVojoAlton(alteco, kunigoj);

function pozicio( punktoj: readonly VojaPunkto[], s: number ) {
  let kur = 0;
  for ( let k = 0; k < punktoj.length - 1; k++ ) {
    const a = punktoj[k], b = punktoj[k + 1];
    const longo = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if ( s > kur + longo && k < punktoj.length - 2 ) { kur += longo; continue; }
    const t = longo < 1e-9 ? 0 : Math.max(0, Math.min(1, ( s - kur ) / longo));
    const lx = -( b[1] - a[1] ) / ( longo || 1 ), lz = ( b[0] - a[0] ) / ( longo || 1 );
    return { x: a[0] + ( b[0] - a[0] ) * t, z: a[1] + ( b[1] - a[1] ) * t, lx, lz };
  }
  const p = punktoj[0];
  return { x: p[0], z: p[1], lx: 1, lz: 0 };
}

const celo = Number(process.argv[2] ?? 2);
const punktoj = gluitaj[celo];
let longo = 0;
for ( let k = 0; k < punktoj.length - 1; k++ )
  longo += Math.hypot(punktoj[k + 1][0] - punktoj[k][0], punktoj[k + 1][1] - punktoj[k][1]);
const flanka = vojaLarghoDuono( VOJOJ[celo].larĝo );
console.log(`⟨ ${VOJOJ[celo].nomo} ⟩ ប្រវែង ${longo.toFixed(1)} កន្លះ ${flanka.toFixed(2)}`);
const unua = Number(process.argv[3] ?? 0), lasta = Number(process.argv[4] ?? longo);
for ( let s = unua; s <= lasta; s += 0o2 ) {
  const p = pozicio(punktoj, s);
  const mezo = alteco(p.x, p.z);
  const radioj: string[] = [];
  for ( const r of [ 0o1/0o2, 0o1, 0o2 ] ) {
    let maks = -Infinity, malplena = Infinity;
    for ( let i = 0; i < 0o20; i++ ) {
      const a = i * Math.PI * 0o2 / 0o20;
      const h = alteco(p.x + Math.cos(a) * r, p.z + Math.sin(a) * r);
      maks = Math.max(maks, h);
      malplena = Math.min(malplena, h);
    }
    radioj.push(`${r}:${maks.toFixed(1)}/${malplena.toFixed(1)}`);
  }
  const du = alteco(p.x + p.lx * flanka, p.z + p.lz * flanka);
  const mdu = alteco(p.x - p.lx * flanka, p.z - p.lz * flanka);
  console.log(`  s ${s.toFixed(1)} ៖ កណ្តាល ${mezo.toFixed(2)}` +
    ` , សងខាង ${du.toFixed(2)}/${mdu.toFixed(2)}` +
    ` , វាល ${vojoAlteco(p.x, p.z).toFixed(2)}` +
    ` , គោល ${baza(p.x, p.z).toFixed(2)} , រង្វង់ ${radioj.join(" ")}`);
}
