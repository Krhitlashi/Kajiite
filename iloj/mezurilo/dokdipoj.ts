// ≺⧼ រណ្តៅកម្ពស់ជិតចំណត និងស្ពាន 🧪 ⧽≻
// ⟨ ផ្លូវទៅចំណត និងទៅស្ពានធ្លាក់ចុះរួចឡើងវិញ ។ ការវាស់ចាស់លោតតំបន់រន្ធភ្ជាប់
// ចេញ , ដូច្នេះរណ្តៅនៅមាត់ចានមិនត្រូវរាប់ ។ វាស់នៅទីនេះតាមកម្រិតផ្លូវពិត ,
// ទាំងផ្លូវជំហានធម្មតា និងផ្លូវរលូនរបស់ស្ពាន ។ 📃 ⟩
import { aktivajVojoj, aktivajDokoj } from "../../kantaoj/tero-datumaro/rultempo.js";
import { alteco, akvaNivelo } from "../../kantaoj/mondo/tereno.js";
import { troviVojaRetajnKunigojn } from "../../eskekoj/medio/voj-reto.js";
import { gluiVojaFinon } from "../../eskekoj/medio/vojoj/gluado.js";
import { kreiVojoAlton } from "../../eskekoj/medio/vojoj/alto.js";
import { kreiNivelanProfilon } from "../../eskekoj/medio/vojoj/niveloj.js";
import { VOJA_EKSTERA_DUONO,
  VOJA_TRUA_DUONO, surGrid, vojaLarghoDuono } from "../../eskekoj/medio/vojoj/mezuroj.js";
import { vojaSuproDeKunigo } from "../../eskekoj/medio/vojoj/formoj.js";
import { havasAkvanTrunkon, kreiPontanAkvanTeston,
  konstruiPontanProfilon } from "../../eskekoj/medio/vojoj/ponto-profilo.js";
import { akvaFino, cxuVeraAkvo, vojaSupro } from "./komunaj.js";
import type { VojaPunkto } from "../../eskekoj/medio/voj-reto/tipoj.js";

// ⟨ រណ្តៅខ្លី ៖ ចុះហើយឡើងវិញក្នុងចម្ងាយនេះ 📏 ⟩
const DIP_DISTO = 0o10;
// ⟨ រណ្តៅជ្រៅជាងនេះគួរកែ 📏 ⟩
const DIP_LIMO = 0o1/0o4;
// ⟨ ចម្ងាយពីមាត់ចំណត ឬមាត់ទឹក ដែលរាប់ថាជិត 📏 ⟩
const PROKSIMA = 0o20;
const PAŜO = 0o1/0o4;

const VOJOJ = aktivajVojoj().filter(v => v.punktoj.length >= 2);
const DOKOJ = aktivajDokoj();
const retaj = VOJOJ.map(v => ( { punktoj: v.punktoj, larĝo: v.larĝo } ));
const landoj = DOKOJ.map(d => {
  const r = d.rotacio ?? 0;
  return [ d.x + Math.sin(r) * ( d.profundo / 2 ),
    d.z + Math.cos(r) * ( d.profundo / 2 ) ] as VojaPunkto;
});
const antaŭaj = troviVojaRetajnKunigojn(retaj, DOKOJ);
const celoj: VojaPunkto[] = antaŭaj.map(k => [ k.x, k.z ] as VojaPunkto);
const gluitaj = VOJOJ.map((v, i) => gluiVojaFinon(v.punktoj, celoj,
  landoj.map(p => ( { x: p[0], z: p[1] } )),
  VOJOJ.filter((_, j) => j !== i).map(o => o.punktoj)));
const kunigoj = troviVojaRetajnKunigojn(
  VOJOJ.map((v, i) => ( { punktoj: gluitaj[i], larĝo: v.larĝo } )), DOKOJ);
const vojoAlteco = kreiVojoAlton(alteco, kunigoj);

// ⟨ កម្ពស់ចានភ្ជាប់ 📏 ⟩ ៖ វាស់ដូចហ្គេម ៖ កម្រិតផ្លូវត្រូវដល់កម្រិតចាន ។ 📃 ⟩
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
const ankroj = kunigoj.map(k => ( { x: k.x, z: k.z, alto: platoCxe(k.x, k.z) } ));

// ⟪ កម្ពស់ចានភ្ជាប់ 📏 ⟫
/*កម្ពស់ផ្ទៃចាននៅចុងផ្លូវ , ដូច urbo.ts
    @param x, z ( number ) - ចុងផ្លូវ
    @param larĝo ( number ) - ទទឹងផ្លូវ
@returns alto ( number ) - កម្ពស់ចាន */
function pontaFinAlto( x: number, z: number, larĝo: number ): number {
  let plejProksima: typeof kunigoj[number] | null = null, plejMallonga = Infinity;
  for ( const k of kunigoj ) {
    const d = Math.hypot(k.x - x, k.z - z);
    if ( d < plejMallonga ) { plejMallonga = d; plejProksima = k; }
  }
  if ( plejProksima && plejMallonga < VOJA_EKSTERA_DUONO + VOJA_TRUA_DUONO )
    return vojaSuproDeKunigo(plejProksima.x, plejProksima.z, plejProksima.direktaj,
      VOJA_EKSTERA_DUONO, vojoAlteco).supro;
  return vojaSupro(x, z, larĝo);
}

// ⟪ កម្ពស់ផ្ទៃតាមចំណុច 📃 ⟫
interface VojaSupra {
  alto: ( x: number, z: number ) => number;
  trunko: boolean;
  akvaStarto: number;
  akvaFino: number;
}

/*កម្ពស់ផ្ទៃផ្លូវពិត តាមផ្លូវមួយ
    @param i ( number ) - លេខផ្លូវ
@returns supra ( VojaSupra ) - អនុគមន៍កម្ពស់ និងដែនទឹក */
function supraDeVojo( i: number ): VojaSupra {
  const punktoj = gluitaj[i];
  const larĝo = VOJOJ[i].pontoLarĝo ?? VOJOJ[i].larĝo;
  const cxuPontaAkvo = kreiPontanAkvanTeston(punktoj, larĝo, cxuVeraAkvo);
  const trunko = havasAkvanTrunkon(punktoj, cxuPontaAkvo);
  if ( trunko ) {
    const profilo = konstruiPontanProfilon(punktoj, larĝo, vojaSupro,
      ( x, z ) => cxuPontaAkvo(x, z) ? akvaNivelo(x, z) : -Infinity,
      pontaFinAlto, alteco);
    const trako = profilo.trakoj[0];
    const akvaStarto = trako
      ? distancoDe(punktoj, trako.ax, trako.az) : 0;
    const akvaFino = trako
      ? distancoDe(punktoj, trako.bx, trako.bz) : 0;
    return {
      alto: ( x, z ) => profilo.alto(x, z),
      trunko, akvaStarto, akvaFino };
  }
  const profilo = kreiNivelanProfilon(punktoj, vojaLarghoDuono( larĝo ),
    vojoAlteco, akvaFino, ankroj);
  return { alto: ( x, z ) => profilo.altoCxe(distancoDe(punktoj, x, z)),
    trunko, akvaStarto: 0, akvaFino: profilo.longo };
}

// ⟪ ចម្ងាយតាមបណ្តោយ 📏 ⟫
/*ចម្ងាយតាមបណ្តោយផ្លូវ រហូតដល់ចំណុចជិតបំផុត
    @param punktoj ( [ number , number ] [ ] ) - បន្ទាត់ផ្លូវ
    @param x, z ( number ) - ចំណុច
@returns s ( number ) - ចម្ងាយតាមបណ្តោយ */
function distancoDe( punktoj: readonly VojaPunkto[], x: number, z: number ): number {
  let kur = 0, plejBona = Infinity, plejS = 0;
  for ( let k = 0; k < punktoj.length - 1; k++ ) {
    const a = punktoj[k], b = punktoj[k + 1];
    const dx = b[0] - a[0], dz = b[1] - a[1];
    const l2 = dx * dx + dz * dz;
    const longo = Math.sqrt(l2);
    if ( longo < 0o10 ** -0o6 ) continue;
    const t = Math.max(0, Math.min(1, ( ( x - a[0] ) * dx + ( z - a[1] ) * dz ) / l2));
    const d = Math.hypot(a[0] + dx * t - x, a[1] + dz * t - z);
    if ( d < plejBona ) { plejBona = d; plejS = kur + longo * t; }
    kur += longo;
  }
  return plejS;
}

// ⟪ ចំណុចតាមបណ្តោយ 📃 ⟫
/*ចំណុចនៅចម្ងាយ s លើផ្លូវ
    @param punktoj ( [ number , number ] [ ] ) - បន្ទាត់ផ្លូវ
    @param s ( number ) - ចម្ងាយតាមបណ្តោយ
@returns p ( { x , z } ) - ចំណុច */
function punktoCxe( punktoj: readonly VojaPunkto[], s: number ): { x: number; z: number } {
  let kur = 0;
  for ( let k = 0; k < punktoj.length - 1; k++ ) {
    const a = punktoj[k], b = punktoj[k + 1];
    const longo = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if ( s <= kur + longo || k === punktoj.length - 2 ) {
      const t = longo < 0o10 ** -0o6 ? 0 : Math.max(0, Math.min(1, ( s - kur ) / longo));
      return { x: a[0] + ( b[0] - a[0] ) * t, z: a[1] + ( b[1] - a[1] ) * t };
    }
    kur += longo;
  }
  const p = punktoj[ punktoj.length - 1 ];
  return { x: p[0], z: p[1] };
}

// ⟪ រណ្តៅខ្លី 📏 ⟫
/*រករណ្តៅដែលធ្លាក់ចុះរួចឡើងវិញក្នុងចម្ងាយខ្លី
    @param suproj ( { x , z , y } [ ] ) - កម្ពស់ផ្ទៃតាមលំដាប់
@returns dipo ( { profundo , x , z , s } | null ) - រណ្តៅជ្រៅបំផុត */
function plejProfundaDipo(
  suproj: readonly { x: number; z: number; y: number; s: number }[]
): { profundo: number; x: number; z: number; s: number } | null {
  let dipo: { profundo: number; x: number; z: number; s: number } | null = null;
  for ( let i = 1; i < suproj.length - 1; i++ ) {
    let maldekstra = -Infinity, dekstra = -Infinity;
    for ( let j = i - 1; j >= 0; j-- ) {
      if ( suproj[i].s - suproj[j].s > DIP_DISTO ) break;
      maldekstra = Math.max(maldekstra, suproj[j].y);
    }
    for ( let j = i + 1; j < suproj.length; j++ ) {
      if ( suproj[j].s - suproj[i].s > DIP_DISTO ) break;
      dekstra = Math.max(dekstra, suproj[j].y);
    }
    const profundo = Math.min(maldekstra, dekstra) - suproj[i].y;
    if ( profundo > ( dipo?.profundo ?? 0 ) )
      dipo = { profundo, x: suproj[i].x, z: suproj[i].z, s: suproj[i].s };
  }
  return dipo;
}

// ⟪ ចម្ងាយទៅមាត់ចំណត 📏 ⟫
/*ចម្ងាយទៅមាត់ដីចំណតជិតបំផុត
    @param x, z ( number ) - ចំណុច
@returns disto ( number ) - ចម្ងាយ , ឬ Infinity បើគ្មានចំណត */
function distoAlLandon( x: number, z: number ): number {
  let plej = Infinity;
  for ( const p of landoj ) plej = Math.min(plej, Math.hypot(p[0] - x, p[1] - z));
  return plej;
}

let difektaj = 0, profunda = 0;
for ( let i = 0; i < VOJOJ.length; i++ ) {
  const supra = supraDeVojo(i);
  const punktoj = gluitaj[i];
  let longo = 0;
  for ( let k = 0; k < punktoj.length - 1; k++ )
    longo += Math.hypot(punktoj[k + 1][0] - punktoj[k][0], punktoj[k + 1][1] - punktoj[k][1]);
  const suproj: { x: number; z: number; y: number; s: number }[] = [];
  const nombro = Math.max(1, Math.ceil(longo / PAŜO));
  for ( let k = 0; k <= nombro; k++ ) {
    const s = longo * k / nombro;
    const p = punktoCxe(punktoj, s);
    suproj.push({ x: p.x, z: p.z, y: supra.alto(p.x, p.z), s });
  }
  const dipo = plejProfundaDipo(suproj);
  const signo = supra.trunko ? "ស្ពាន" : "ផ្លូវ";
  if ( !dipo ) {
    console.log(`  ${signo} ${i} ${VOJOJ[i].nomo} , គ្មានរណ្តៅ , ប្រវែង ${longo.toFixed(1)}`);
    continue;
  }
  const landa = distoAlLandon(dipo.x, dipo.z);
  // ⟨ ចម្ងាយទៅមាត់ទឹក ៖ សម្រាប់ស្ពានតែប៉ុណ្ណោះ 📃 ⟩
  const akva = supra.trunko
    ? Math.min(Math.abs(dipo.s - supra.akvaStarto), Math.abs(dipo.s - supra.akvaFino))
    : Infinity;
  const proksima = Math.min(landa, akva) < PROKSIMA;
  if ( dipo.profundo > DIP_LIMO && proksima ) difektaj++;
  if ( dipo.profundo > profunda ) profunda = dipo.profundo;
  console.log(`  ${signo} ${i} ${VOJOJ[i].nomo} , រណ្តៅ ${dipo.profundo.toFixed(3)}` +
    ` @${dipo.x.toFixed(1)},${dipo.z.toFixed(1)} s=${dipo.s.toFixed(1)}` +
    ` , ចំណត ${landa === Infinity ? "-" : landa.toFixed(1)}` +
    ` , មាត់ទឹក ${akva === Infinity ? "-" : akva.toFixed(1)}` +
    ( dipo.profundo > DIP_LIMO && proksima ? "  ⚠" : "" ));
}
console.log(`ផ្លូវ ${VOJOJ.length} , រណ្តៅជិតចំណតឬស្ពានលើសលីមីត ${difektaj}` +
  ` , រណ្តៅជ្រៅបំផុត ${profunda.toFixed(3)}`);

// ⟪ ស្ពាន ៖ កម្ពស់ចុងស្ពាន និងចាន 📏 ⟫
// ⟨ កម្ពស់ផ្ទៃស្ពាននៅចុងត្រូវស្មើចាន ។ បើខុស , ផ្លូវលិចនៅមាត់ស្ពាន 📃 ⟩
console.log("<( ចុងស្ពាន )>");
for ( let i = 0; i < VOJOJ.length; i++ ) {
  const supra = supraDeVojo(i);
  if ( !supra.trunko ) continue;
  const punktoj = gluitaj[i];
  const unua = punktoj[0], lasta = punktoj[ punktoj.length - 1 ];
  const larĝo = VOJOJ[i].pontoLarĝo ?? VOJOJ[i].larĝo;
  const dezirata0 = pontaFinAlto(unua[0], unua[1], larĝo);
  const dezirata1 = pontaFinAlto(lasta[0], lasta[1], larĝo);
  console.log(`  ${i} ${VOJOJ[i].nomo}` +
    ` , ដើម ${supra.alto(unua[0], unua[1]).toFixed(3)} ចាន ${dezirata0.toFixed(3)}` +
    ` ខុស ${( supra.alto(unua[0], unua[1]) - dezirata0 ).toFixed(3)}` +
    ` , ចុង ${supra.alto(lasta[0], lasta[1]).toFixed(3)} ចាន ${dezirata1.toFixed(3)}` +
    ` ខុស ${( supra.alto(lasta[0], lasta[1]) - dezirata1 ).toFixed(3)}`);
}
