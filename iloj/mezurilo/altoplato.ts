// ≺⧼ កម្រិតផ្លូវរាបស្មើ 🔬 ⧽≻
// ⟨ ផ្លូវអាចឈរនៅកម្រិតមួយយូរ ៖ បើវាខ្ពស់លើដីដែលចុះ ,
// នោះជាកំពែងវែង , ហើយចុងរបស់វាធ្លាក់ចុះភ្លាមៗនៅចំណុចភ្ជាប់ ។
// ស្គ្រីបនេះរកកំណាត់រាបស្មើវែងបំផុត , និងបង្ហាញកម្ពស់ផ្លូវបន្ទាប់ពីដី ។ 📃 ⟩
import { aktivajVojoj, aktivajDokoj } from "../../kantaoj/tero-datumaro/rultempo.js";
import { alteco } from "../../kantaoj/mondo/tereno.js";
import { troviVojaRetajnKunigojn } from "../../eskekoj/medio/voj-reto.js";
import { gluiVojaFinon } from "../../eskekoj/medio/vojoj/gluado.js";
import { kreiBazanVojoAlton, kreiVojoAlton } from "../../eskekoj/medio/vojoj/alto.js";
import { kreiNivelanProfilon } from "../../eskekoj/medio/vojoj/niveloj.js";
import { vojaLarghoDuono } from "../../eskekoj/medio/vojoj/mezuroj.js";
import { akvaFino } from "./komunaj.js";
import type { VojaPunkto } from "../../eskekoj/medio/voj-reto/tipoj.js";

const VOJOJ = aktivajVojoj().filter(v => v.punktoj.length >= 2);
const DOKOJ = aktivajDokoj();
const retaj = VOJOJ.map(v => ( { punktoj: v.punktoj, larĝo: v.larĝo } ));

// ⟨ ដូច urbo.ts ៖ ចុងផ្លូវទាក់ទៅចានភ្ជាប់ 📃 ⟩
const landoj = DOKOJ.map(d => {
  const r = d.rotacio ?? 0;
  return [ d.x + Math.sin(r) * ( d.profundo / 2 ), d.z + Math.cos(r) * ( d.profundo / 2 ) ] as VojaPunkto;
});
const antaŭaj = troviVojaRetajnKunigojn(retaj, DOKOJ);
const celoj: VojaPunkto[] = [ ...antaŭaj.map(k => [ k.x, k.z ] as VojaPunkto) ];
const gluitaj = VOJOJ.map((v, i) => gluiVojaFinon(v.punktoj, celoj, landoj.map(p => ( { x: p[0], z: p[1] } )),
  VOJOJ.filter((_, j) => j !== i).map(o => o.punktoj)));
const kunigoj = troviVojaRetajnKunigojn(
  VOJOJ.map((v, i) => ( { punktoj: gluitaj[i], larĝo: v.larĝo } )), DOKOJ);

const baza = kreiBazanVojoAlton(alteco);
const vojoAlteco = kreiVojoAlton(alteco, kunigoj);

// ⟨ រកកំណាត់រាបស្មើ ៖ កម្ពស់ផ្លូវដូចគ្នាតាមលំដាប់គំរូ 📏 ⟩
interface Plata {
  s0: number;
  s1: number;
  alto: number;
}

for ( let i = 0; i < VOJOJ.length; i++ ) {
  const punktoj = gluitaj[i];
  const duono = vojaLarghoDuono( VOJOJ[i].larĝo );
  const profilo = kreiNivelanProfilon(punktoj, duono, vojoAlteco, akvaFino);
  const platoj: Plata[] = [];
  let s0 = profilo.situoj[0], nuna = profilo.altoj[0];
  for ( let j = 1; j < profilo.altoj.length; j++ ) {
    if ( profilo.altoj[j] !== nuna ) {
      platoj.push({ s0, s1: profilo.situoj[j], alto: nuna });
      s0 = profilo.situoj[j];
      nuna = profilo.altoj[j];
    }
  }
  platoj.push({ s0, s1: profilo.longo, alto: nuna });
  platoj.sort((p, q) => ( q.s1 - q.s0 ) - ( p.s1 - p.s0 ));
  console.log(`⟨ ${VOJOJ[i].nomo} ⟩ ប្រវែង ${profilo.longo.toFixed(1)} កំណាត់រាបស្មើ ${platoj.length}`);
  for ( const p of platoj.slice(0, 0o4) ) {
    const a = pozicioEn(punktoj, p.s0), b = pozicioEn(punktoj, p.s1);
    console.log(`  រាបស្មើ ${p.s0.toFixed(1)} ំ ${p.s1.toFixed(1)} ប្រវែង ${( p.s1 - p.s0 ).toFixed(1)}` +
      ` , ផ្លូវ ${p.alto.toFixed(2)}` +
      ` , ដី ${baza(a.x, a.z).toFixed(2)} ំ ${baza(b.x, b.z).toFixed(2)}` +
      ` , លើដី ${( p.alto - baza(b.x, b.z) ).toFixed(2)}`);
  }
  // ⟨ កម្រិតសង្ខេប ៖ រៀងរាល់ ៤ ឯកតា 📏 ⟩
  const vicoj: string[] = [];
  for ( let s = 0; s <= profilo.longo; s += 0o4 ) {
    const q = pozicioEn(punktoj, s);
    const j = Math.min(profilo.celoj.length - 1, Math.round(s / ( profilo.longo / ( profilo.altoj.length - 1 ) )));
    vicoj.push(`${s.toFixed(0)}:${profilo.altoCxe(s).toFixed(1)}/${profilo.celoj[ j ].toFixed(1)}/${baza(q.x, q.z).toFixed(1)}`);
  }
  console.log("  ផ្លូវ/គម្រោង/ដី " + vicoj.join(" "));
}

/*រកចំណុចតាមចម្ងាយលើបន្ទាត់ផ្លូវ
    @param punktoj ( VojaPunkto [ ] ) - បន្ទាត់ផ្លូវ
    @param s ( number ) - ចម្ងាយតាមផ្លូវ
@returns p ( { x , z } ) - ចំណុច */
function pozicioEn( punktoj: readonly VojaPunkto[], s: number ): { x: number; z: number } {
  let kur = 0;
  for ( let k = 0; k < punktoj.length - 1; k++ ) {
    const a = punktoj[k], b = punktoj[k + 1];
    const longo = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if ( s > kur + longo && k < punktoj.length - 2 ) { kur += longo; continue; }
    const t = longo < 1e-9 ? 0 : Math.max(0, Math.min(1, ( s - kur ) / longo));
    return { x: a[0] + ( b[0] - a[0] ) * t, z: a[1] + ( b[1] - a[1] ) * t };
  }
  return { x: punktoj[0][0], z: punktoj[0][1] };
}
