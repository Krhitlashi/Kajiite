// ≺⧼ ផ្លូវទីក្រុងក្រឡា 🔬 ⧽≻
// ⟨ ទីក្រុងក្រឡាមានផ្លូវវែងរវាងចំណុចប្រសព្វ ។ ដើម្បីវាស់កម្ពស់នៅទីនោះ ,
// ស្គ្រីបនេះសាងសង់តែបណ្តាញផ្លូវ ហើយបង្ហាញកម្ពស់តាមបណ្តោយផ្លូវនីមួយៗ ។
// អគារមិនចាំបាច់ទេ , ដូច្នេះលទ្ធផលរត់លឿន ។ 📃 ⟩
import * as THREE from "three";
import { konstruiKradanUrbon } from "../../kantaoj/mondo/urbo/krada-urbo.js";
import { aktivajDokoj } from "../../kantaoj/tero-datumaro/rultempo.js";
import { alteco } from "../../kantaoj/mondo/tereno.js";
import { kreiVojoAlton } from "../../eskekoj/medio/vojoj/alto.js";
import { kreiNivelanProfilon } from "../../eskekoj/medio/vojoj/niveloj.js";
import { kreiBrakojn, kunigaPlataAlto } from "../../eskekoj/medio/vojoj/platoj.js";
import { akvaFino, punktoCxe as punktoCxeBaza } from "./komunaj.js";
import type { AltaKunigo } from "../../eskekoj/medio/vojoj/alto.js";
import { aktivajVojoj } from "../../kantaoj/tero-datumaro/rultempo.js";
import { troviVojaRetajnKunigojn } from "../../eskekoj/medio/voj-reto.js";

const qena = new THREE.Scene();
const pukek = new THREE.MeshStandardMaterial();
const urbo = konstruiKradanUrbon(qena, { arangxaGrando: 3, blokaGrando: "unu" },
  [ 0, 0 ], pukek);
const difinoj = urbo.vojDifinoj;
const kunigoj: AltaKunigo[] = [ ...urbo.kunigajPunktoj.map(([ x, z ]) => {
  const fermita = urbo.kunigajFermitaj.get(x + "," + z);
  return { x, z, direktaj: fermita ? [ fermita ] : [] };
}), ...troviVojaRetajnKunigojn(
  aktivajVojoj().filter(v => v.n2k.length >= 2)
    .map(v => ({ n2k: v.n2k, sefini: v.sefini })), aktivajDokoj()) ];
const vojoAlteco = kreiVojoAlton(alteco, kunigoj);
// ⟨ កម្ពស់ចានភ្ជាប់ 📏 ⟩ ៖ ផ្លូវត្រូវឈរលើចាន , ដូច្នេះវាស់ដូចហ្គេមធ្វើ ។ 📃 ⟩
const platoj = new Map<string, number>();
const platoCxe = ( x: number, z: number ): number => {
  const ca3aq = x + "," + z;
  let l6da = platoj.get(ca3aq);
  if ( l6da === undefined ) {
    // ⟨ កម្រិតចានដូចហ្គេម 📏 ⟩ ៖ kunigaPlataAlto អានទាំងដីកណ្តាល
    // និងដីនៅមាត់ដៃ ។ បើឧបករណ៍គណនាកម្រិតផ្សេង , វារាយការកប់
    // ក្លែងក្លាយនៅជើងភ្នំ ។ 📃 ⟩
    const k = kunigoj.find(n => n.x === x && n.z === z);
    const knece = kreiBrakojn(k?.direktaj ?? [], undefined, 0);
    l6da = kunigaPlataAlto(x, z, knece, vojoAlteco);
    platoj.set(ca3aq, l6da);
  }
  return l6da;
};
const ankroj = kunigoj.map(k => ({ x: k.x, z: k.z, l6da: platoCxe(k.x, k.z) }));
console.log(`ផ្លូវក្រឡា ${difinoj.length} , ចំណុចភ្ជាប់ ${kunigoj.length}`);

// ⟨ ចំណុចតាមបណ្តោយបន្ទាត់ 📏 ⟩
/*ចំណុចនៅចម្ងាយ s លើបន្ទាត់ផ្លូវ
    @param pts ( [ number , number ] [ ] ) - បន្ទាត់ផ្លូវ
    @param s ( number ) - ចម្ងាយតាមបណ្តោយ
@returns p ( { x , z } ) - ចំណុច */
// ⟨ អនុគមន៍រួមនៅ komunaj ជាមួយកម្រិតធំជាងរបស់ឧបករណ៍នេះ 📃 ⟩
const punktoCxe = ( pts: readonly [ number, number ][], s: number ): { x: number; z: number } =>
  punktoCxeBaza( pts, s, 0o10 ** -0o6 );

// ⟨ កម្រិតតាមផ្លូវនីមួយៗ 📏 ⟩
let plataj = 0, maksPlata = 0, maksPlataVojo = "";
let saltoj = 0, maksSalto = 0;
let plejSupero = 0, superoLoko = "", superoSumo = 0, superoNombro = 0;
let plejBoreo = 0, boreoLoko = "", boritaj = 0;
for ( let i = 0; i < difinoj.length; i++ ) {
  const d = difinoj[i];
  const p2somani = d.w;
  const n2k = d.pts as [ number, number ][];
  const s2qena = kreiNivelanProfilon(n2k, p2somani, vojoAlteco, akvaFino, ankroj);
  // ⟨ កម្ពស់លើសដី 📏 ⟩ ៖ ផ្លូវដែលឡើងខ្ពស់ហើយមិនចុះបង្ហាញនៅទីនេះ ។ 📃 ⟩
  for ( let j = 0; j < s2qena.hal6da.length; j++ ) {
    const p = punktoCxe(n2k, s2qena.situoj[ j ]);
    const supero = s2qena.hal6da[ j ] - alteco(p.x, p.z);
    superoSumo += supero;
    superoNombro++;
    if ( supero > plejSupero ) {
      plejSupero = supero;
      superoLoko = `${p.x.toFixed(1)},${p.z.toFixed(1)} ផ្លូវ ${i}`;
    }
    if ( -supero > plejBoreo ) {
      plejBoreo = -supero;
      boreoLoko = `${p.x.toFixed(1)},${p.z.toFixed(1)} ផ្លូវ ${i}`;
    }
    if ( -supero > 0o1/0o2 ) boritaj++;
  }
  // ⟨ កំណាត់រាបស្មើវែងបំផុត 📏 ⟩
  let s0 = s2qena.situoj[0], nuna = s2qena.hal6da[0];
  for ( let j = 1; j < s2qena.hal6da.length; j++ ) {
    if ( s2qena.hal6da[j] !== nuna ) {
      const sahakani = s2qena.situoj[j] - s0;
      if ( sahakani > 0o10 ) plataj++;
      if ( sahakani > maksPlata ) {
        maksPlata = sahakani;
        const a = d.pts[0], b = d.pts[d.pts.length - 1];
        maksPlataVojo = `${a[0].toFixed(0)},${a[1].toFixed(0)} ំ ${b[0].toFixed(0)},${b[1].toFixed(0)}`;
      }
      s0 = s2qena.situoj[j];
      nuna = s2qena.hal6da[j];
    }
  }
  for ( let j = 1; j < s2qena.hal6da.length; j++ ) {
    const s = Math.abs(s2qena.hal6da[j] - s2qena.hal6da[j - 1]);
    if ( s > 0o1/0o2 + 0o1/0o100 ) {
      saltoj++;
      const t = s2qena.situoj[j] / s2qena.sahakani || 0;
      const a = d.pts[0], b = d.pts[d.pts.length - 1];
      const x = a[0] + ( b[0] - a[0] ) * t, z = a[1] + ( b[1] - a[1] ) * t;
      console.log(`  លោត ${s.toFixed(3)} ផ្លូវ ${i} s ${s2qena.situoj[j].toFixed(1)}` +
        ` ( ${x.toFixed(1)},${z.toFixed(1)} ) ${s2qena.hal6da[j - 1].toFixed(2)}` +
        ` ំ ${s2qena.hal6da[j].toFixed(2)} ដី ${alteco(x, z).toFixed(2)}`);
    }
    if ( s > maksSalto ) maksSalto = s;
  }
}
console.log(`កំណាត់រាបស្មើលើស ៨ ឯកតា ${plataj} , វែងបំផុត ${maksPlata.toFixed(1)} @${maksPlataVojo}`);
console.log(`កម្ពស់លើសដីខ្ពស់បំផុត ${plejSupero.toFixed(2)} @${superoLoko}` +
  ` , មធ្យម ${( superoSumo / Math.max(1, superoNombro) ).toFixed(2)}`);
console.log(`កប់ក្នុងដីជ្រៅបំផុត ${plejBoreo.toFixed(2)} @${boreoLoko} , គំរូកប់ ${boritaj}`);
console.log(`ជំហានលើស ០.៥ ${saltoj} , លោតខ្ពស់បំផុត ${maksSalto.toFixed(3)}`);

// ⟨ ផ្លូវដេកមួយ ៖ បង្ហាញកម្ពស់តាមចម្ងាយ 📏 ⟩
const montru = Number(process.argv[2] ?? 0);
if ( difinoj[montru] ) {
  const d = difinoj[montru];
  const s2qena = kreiNivelanProfilon(d.pts as [ number, number ][], d.w, vojoAlteco, akvaFino, ankroj);
  const a = d.pts[0], b = d.pts[d.pts.length - 1];
  console.log(`⟨ ផ្លូវ ${montru} ⟩ ( ${a[0].toFixed(1)}, ${a[1].toFixed(1)} ) ំ` +
    ` ( ${b[0].toFixed(1)}, ${b[1].toFixed(1)} ) ប្រវែង ${s2qena.sahakani.toFixed(1)}`);
  const vicoj: string[] = [];
  for ( let s = 0; s <= s2qena.sahakani; s += 0o4 ) {
    const t = s / s2qena.sahakani;
    const x = a[0] + ( b[0] - a[0] ) * t, z = a[1] + ( b[1] - a[1] ) * t;
    vicoj.push(`${s.toFixed(0)}:${s2qena.altoCxe(s).toFixed(1)}/${alteco(x, z).toFixed(1)}`);
  }
  console.log("  ផ្លូវ/ដី " + vicoj.join(" "));
}
console.log(`ចំណត ${aktivajDokoj().length}`);
