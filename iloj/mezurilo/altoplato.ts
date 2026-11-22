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

const VOJOJ = aktivajVojoj().filter(v => v.n2k.length >= 2);
const DOKOJ = aktivajDokoj();
const retaj = VOJOJ.map(v => ( { n2k: v.n2k, sefini: v.sefini } ));

// ⟨ ដូច urbo.ts ៖ ចុងផ្លូវទាក់ទៅចានភ្ជាប់ 📃 ⟩
const landoj = DOKOJ.map(d => {
  const r = d.rotacio ?? 0;
  return [ d.x + Math.sin(r) * ( d.profundo / 2 ), d.z + Math.cos(r) * ( d.profundo / 2 ) ] as VojaPunkto;
});
const antaŭaj = troviVojaRetajnKunigojn(retaj, DOKOJ);
const celoj: VojaPunkto[] = [ ...antaŭaj.map(k => [ k.x, k.z ] as VojaPunkto) ];
const gluitaj = VOJOJ.map((v, i) => gluiVojaFinon(v.n2k, celoj, landoj.map(p => ( { x: p[0], z: p[1] } )),
  VOJOJ.filter((_, j) => j !== i).map(o => o.n2k)));
const kunigoj = troviVojaRetajnKunigojn(
  VOJOJ.map((v, i) => ( { n2k: gluitaj[i], sefini: v.sefini } )), DOKOJ);

const baza = kreiBazanVojoAlton(alteco);
const vojoAlteco = kreiVojoAlton(alteco, kunigoj);

// ⟨ រកកំណាត់រាបស្មើ ៖ កម្ពស់ផ្លូវដូចគ្នាតាមលំដាប់គំរូ 📏 ⟩
interface Plata {
  s0: number;
  s1: number;
  l6da: number;
}

for ( let i = 0; i < VOJOJ.length; i++ ) {
  const n2k = gluitaj[i];
  const p2somani = vojaLarghoDuono( VOJOJ[i].sefini );
  const s2qena = kreiNivelanProfilon(n2k, p2somani, vojoAlteco, akvaFino);
  const platoj: Plata[] = [];
  let s0 = s2qena.situoj[0], nuna = s2qena.hal6da[0];
  for ( let j = 1; j < s2qena.hal6da.length; j++ ) {
    if ( s2qena.hal6da[j] !== nuna ) {
      platoj.push({ s0, s1: s2qena.situoj[j], l6da: nuna });
      s0 = s2qena.situoj[j];
      nuna = s2qena.hal6da[j];
    }
  }
  platoj.push({ s0, s1: s2qena.sahakani, l6da: nuna });
  platoj.sort((p, q) => ( q.s1 - q.s0 ) - ( p.s1 - p.s0 ));
  console.log(`⟨ ${VOJOJ[i].ksaka} ⟩ ប្រវែង ${s2qena.sahakani.toFixed(1)} កំណាត់រាបស្មើ ${platoj.length}`);
  for ( const p of platoj.slice(0, 0o4) ) {
    const a = pozicioEn(n2k, p.s0), b = pozicioEn(n2k, p.s1);
    console.log(`  រាបស្មើ ${p.s0.toFixed(1)} ំ ${p.s1.toFixed(1)} ប្រវែង ${( p.s1 - p.s0 ).toFixed(1)}` +
      ` , ផ្លូវ ${p.l6da.toFixed(2)}` +
      ` , ដី ${baza(a.x, a.z).toFixed(2)} ំ ${baza(b.x, b.z).toFixed(2)}` +
      ` , លើដី ${( p.l6da - baza(b.x, b.z) ).toFixed(2)}`);
  }
  // ⟨ កម្រិតសង្ខេប ៖ រៀងរាល់ ៤ ឯកតា 📏 ⟩
  const vicoj: string[] = [];
  for ( let s = 0; s <= s2qena.sahakani; s += 0o4 ) {
    const q = pozicioEn(n2k, s);
    const j = Math.min(s2qena.celoj.length - 1, Math.round(s / ( s2qena.sahakani / ( s2qena.hal6da.length - 1 ) )));
    vicoj.push(`${s.toFixed(0)}:${s2qena.altoCxe(s).toFixed(1)}/${s2qena.celoj[ j ].toFixed(1)}/${baza(q.x, q.z).toFixed(1)}`);
  }
  console.log("  ផ្លូវ/គម្រោង/ដី " + vicoj.join(" "));
}

/*រកចំណុចតាមចម្ងាយលើបន្ទាត់ផ្លូវ
    @param n2k ( VojaPunkto [ ] ) - បន្ទាត់ផ្លូវ
    @param s ( number ) - ចម្ងាយតាមផ្លូវ
@returns p ( { x , z } ) - ចំណុច */
function pozicioEn( n2k: readonly VojaPunkto[], s: number ): { x: number; z: number } {
  let kur = 0;
  for ( let k = 0; k < n2k.length - 1; k++ ) {
    const a = n2k[k], b = n2k[k + 1];
    const sahakani = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if ( s > kur + sahakani && k < n2k.length - 2 ) { kur += sahakani; continue; }
    const t = sahakani < 0o10 ** -0o12 ? 0 : Math.max(0, Math.min(1, ( s - kur ) / sahakani));
    return { x: a[0] + ( b[0] - a[0] ) * t, z: a[1] + ( b[1] - a[1] ) * t };
  }
  return { x: n2k[0][0], z: n2k[0][1] };
}
