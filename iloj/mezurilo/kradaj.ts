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
import { vojaSuproDeKunigo } from "../../eskekoj/medio/vojoj/formoj.js";
import { surGrid, VOJA_BORDA_LARĜO, VOJA_EKSTERA_DUONO } from "../../eskekoj/medio/vojoj/mezuroj.js";
import { akvaFino } from "./komunaj.js";
import type { AltaKunigo } from "../../eskekoj/medio/vojoj/alto.js";
import { aktivajVojoj } from "../../kantaoj/tero-datumaro/rultempo.js";
import { troviVojaRetajnKunigojn } from "../../eskekoj/medio/voj-reto.js";

const sceno = new THREE.Scene();
const materialo = new THREE.MeshStandardMaterial();
const urbo = konstruiKradanUrbon(sceno, { arangxaGrando: 3, blokaGrando: "unu" },
  [ 0, 0 ], materialo);
const difinoj = urbo.vojDifinoj;
const kunigoj: AltaKunigo[] = [ ...urbo.kunigajPunktoj.map(([ x, z ]) => {
  const fermita = urbo.kunigajFermitaj.get(x + "," + z);
  return { x, z, direktaj: fermita ? [ fermita ] : [] };
}), ...troviVojaRetajnKunigojn(
  aktivajVojoj().filter(v => v.punktoj.length >= 2)
    .map(v => ({ punktoj: v.punktoj, larĝo: v.larĝo })), aktivajDokoj()) ];
const vojoAlteco = kreiVojoAlton(alteco, kunigoj);
// ⟨ កម្ពស់ចានភ្ជាប់ 📏 ⟩ ៖ ផ្លូវត្រូវឈរលើចាន , ដូច្នេះវាស់ដូចហ្គេមធ្វើ ។ 📃 ⟩
const platoj = new Map<string, number>();
const platoCxe = ( x: number, z: number ): number => {
  const klavo = x + "," + z;
  let alto = platoj.get(klavo);
  if ( alto === undefined ) {
    alto = surGrid(vojaSuproDeKunigo(x, z, [], VOJA_EKSTERA_DUONO, vojoAlteco).supro);
    platoj.set(klavo, alto);
  }
  return alto;
};
const ankroj = kunigoj.map(k => ({ x: k.x, z: k.z, alto: platoCxe(k.x, k.z) }));
console.log(`ផ្លូវក្រឡា ${difinoj.length} , ចំណុចភ្ជាប់ ${kunigoj.length}`);

// ⟨ ចំណុចតាមបណ្តោយបន្ទាត់ 📏 ⟩
/*ចំណុចនៅចម្ងាយ s លើបន្ទាត់ផ្លូវ
    @param pts ( [ number , number ] [ ] ) - បន្ទាត់ផ្លូវ
    @param s ( number ) - ចម្ងាយតាមបណ្តោយ
@returns p ( { x , z } ) - ចំណុច */
function punktoCxe( pts: readonly [ number, number ][], s: number ): { x: number; z: number } {
  let kur = 0;
  for ( let k = 0; k < pts.length - 1; k++ ) {
    const [ x1, z1 ] = pts[ k ], [ x2, z2 ] = pts[ k + 1 ];
    const lo = Math.hypot(x2 - x1, z2 - z1);
    if ( s <= kur + lo || k === pts.length - 2 ) {
      const t = lo < 0o1/0o1000000 ? 0 : Math.max(0, Math.min(1, ( s - kur ) / lo));
      return { x: x1 + ( x2 - x1 ) * t, z: z1 + ( z2 - z1 ) * t };
    }
    kur += lo;
  }
  const p = pts[ pts.length - 1 ];
  return { x: p[ 0 ], z: p[ 1 ] };
}

// ⟨ កម្រិតតាមផ្លូវនីមួយៗ 📏 ⟩
let plataj = 0, maksPlata = 0, maksPlataVojo = "";
let saltoj = 0, maksSalto = 0;
let plejSupero = 0, superoLoko = "", superoSumo = 0, superoNombro = 0;
let plejBoreo = 0, boreoLoko = "", boritaj = 0;
for ( let i = 0; i < difinoj.length; i++ ) {
  const d = difinoj[i];
  const duono = d.w;
  const punktoj = d.pts as [ number, number ][];
  const profilo = kreiNivelanProfilon(punktoj, duono, vojoAlteco, akvaFino, ankroj);
  // ⟨ កម្ពស់លើសដី 📏 ⟩ ៖ ផ្លូវដែលឡើងខ្ពស់ហើយមិនចុះបង្ហាញនៅទីនេះ ។ 📃 ⟩
  for ( let j = 0; j < profilo.altoj.length; j++ ) {
    const p = punktoCxe(punktoj, profilo.situoj[ j ]);
    const supero = profilo.altoj[ j ] - alteco(p.x, p.z);
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
  let s0 = profilo.situoj[0], nuna = profilo.altoj[0];
  for ( let j = 1; j < profilo.altoj.length; j++ ) {
    if ( profilo.altoj[j] !== nuna ) {
      const longo = profilo.situoj[j] - s0;
      if ( longo > 0o10 ) plataj++;
      if ( longo > maksPlata ) {
        maksPlata = longo;
        const a = d.pts[0], b = d.pts[d.pts.length - 1];
        maksPlataVojo = `${a[0].toFixed(0)},${a[1].toFixed(0)} ំ ${b[0].toFixed(0)},${b[1].toFixed(0)}`;
      }
      s0 = profilo.situoj[j];
      nuna = profilo.altoj[j];
    }
  }
  for ( let j = 1; j < profilo.altoj.length; j++ ) {
    const s = Math.abs(profilo.altoj[j] - profilo.altoj[j - 1]);
    if ( s > 0o1/0o2 + 0o1/0o100 ) {
      saltoj++;
      const t = profilo.situoj[j] / profilo.longo || 0;
      const a = d.pts[0], b = d.pts[d.pts.length - 1];
      const x = a[0] + ( b[0] - a[0] ) * t, z = a[1] + ( b[1] - a[1] ) * t;
      console.log(`  លោត ${s.toFixed(3)} ផ្លូវ ${i} s ${profilo.situoj[j].toFixed(1)}` +
        ` ( ${x.toFixed(1)},${z.toFixed(1)} ) ${profilo.altoj[j - 1].toFixed(2)}` +
        ` ំ ${profilo.altoj[j].toFixed(2)} ដី ${alteco(x, z).toFixed(2)}`);
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
  const profilo = kreiNivelanProfilon(d.pts as [ number, number ][], d.w, vojoAlteco, akvaFino, ankroj);
  const a = d.pts[0], b = d.pts[d.pts.length - 1];
  console.log(`⟨ ផ្លូវ ${montru} ⟩ ( ${a[0].toFixed(1)}, ${a[1].toFixed(1)} ) ំ` +
    ` ( ${b[0].toFixed(1)}, ${b[1].toFixed(1)} ) ប្រវែង ${profilo.longo.toFixed(1)}`);
  const vicoj: string[] = [];
  for ( let s = 0; s <= profilo.longo; s += 0o4 ) {
    const t = s / profilo.longo;
    const x = a[0] + ( b[0] - a[0] ) * t, z = a[1] + ( b[1] - a[1] ) * t;
    vicoj.push(`${s.toFixed(0)}:${profilo.altoCxe(s).toFixed(1)}/${alteco(x, z).toFixed(1)}`);
  }
  console.log("  ផ្លូវ/ដី " + vicoj.join(" "));
}
console.log(`ចំណត ${aktivajDokoj().length}`);
