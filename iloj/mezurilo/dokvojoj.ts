// ≺⧼ ផ្លូវកំពង់ , ចានភ្ជាប់ និងកម្ពស់ 🧪 ⧽≻
// ⟨ ពីរបញ្ហានៅតំបន់ចំណត ៖ ចានភ្ជាប់តូចជាងផ្លូវ , និងផ្លូវខ្ពស់ខុសគ្នា
// រវាងខ្សែដេកនិងខ្សែឈរ ។ វាស់នៅទីនេះ , ដើម្បីកុំឱ្យការកែជាការស្មាន ។
// វាស់តែផ្លូវឆ្លាក់និងចំណត ។ ផ្លូវក្រឡាទីក្រុងនៅឆ្ងាយ , ដូច្នេះមិនរាប់ ។ 📃 ⟩
import { aktivajDokoj } from "../../kantaoj/tero-datumaro/rultempo.js";
import { alteco } from "../../kantaoj/mondo/tereno.js";
import { vojaKunigaDuono } from "../../eskekoj/medio/voj-reto.js";
import { kreiBazanVojoAlton } from "../../eskekoj/medio/vojoj/alto.js";
import { kreiNivelanProfilon } from "../../eskekoj/medio/vojoj/niveloj.js";
import { VOJA_BORDA_LARĜO, VOJA_DIORITA_DUONO,
  VOJA_EKSTERA_DUONO, VOJA_TRUA_DUONO } from "../../eskekoj/medio/vojoj/mezuroj.js";
import { kreiBrakojn, kreiPlatajnPoligonojn } from "../../eskekoj/medio/vojoj/platoj.js";
import { akvaFino, kreiMezuranMondon } from "./komunaj.js";
import type { VojaPunkto } from "../../eskekoj/medio/voj-reto/tipoj.js";

// ⟨ ដូច urbo.ts ៖ ចុងផ្លូវទាក់ទៅចានភ្ជាប់ , បន្ទាប់មករកចំណុចភ្ជាប់ម្តងទៀត 📃 ⟩
// ⟨ ប្លុកសាងសង់ពិភពលោកនៅ `komunaj.ts` 📏 ⟩ ៖ ដូច្នេះការវាស់នេះអាន
// ពិភពលោកដូចឧបករណ៍ឯទៀត ។ ទីក្រុងក្រឡាមិនរាប់ ( ដូចក្នុងឯកសារនេះ ) ។ 📃 ⟩
const mondo = kreiMezuranMondon(false);
const VOJOJ = mondo.vojoj;
const DOKOJ = aktivajDokoj();
const gluitaj = mondo.gluitaj;
const kunigoj = mondo.kunigoj;

// ⟪ ផ្នែកទីមួយ , ទទឹងចានភ្ជាប់ 📏 ⟫
console.log("<( ទទឹងចានភ្ជាប់ )>");
// ⟨ ចានភ្ជាប់ប្រើ VOJA_EKSTERA_DUONO ថេរ ។ បើផ្លូវធំជាងនោះ , ចានតូចជាងផ្លូវ 📃 ⟩
let mallarĝaj = 0;
for ( const k of kunigoj ) {
  let plej = 0, nomo = "";
  for ( let i = 0; i < VOJOJ.length; i++ ) {
    const duono = vojaKunigaDuono( { punktoj: gluitaj[i], larĝo: VOJOJ[i].larĝo } );
    for ( let s = 0; s < gluitaj[i].length - 1; s++ ) {
      const a = gluitaj[i][s], b = gluitaj[i][s + 1];
      const dx = b[0] - a[0], dz = b[1] - a[1];
      const longo2 = dx * dx + dz * dz;
      if ( longo2 < 1e-9 ) continue;
      const t = Math.max(0, Math.min(1, ( ( k.x - a[0] ) * dx + ( k.z - a[1] ) * dz ) / longo2 ));
      if ( Math.hypot(a[0] + dx * t - k.x, a[1] + dz * t - k.z) > 0o1/0o2 ) continue;
      if ( duono > plej ) { plej = duono; nomo = VOJOJ[i].nomo; }
    }
  }
  if ( plej > VOJA_EKSTERA_DUONO + 0o1/0o100 ) {
    mallarĝaj++;
    console.log(`  ( ${k.x.toFixed(1)}, ${k.z.toFixed(1)} ) ផ្លូវ ${nomo}` +
      ` កន្លះទទឹង ${plej.toFixed(2)} , ចាន ${VOJA_EKSTERA_DUONO.toFixed(2)}` +
      ` , ខ្វះ ${( plej - VOJA_EKSTERA_DUONO ).toFixed(2)}`);
  }
}
console.log(`  ចំណុចភ្ជាប់ ${kunigoj.length} , ចានតូចជាងផ្លូវ ${mallarĝaj}`);

// ⟪ ផ្នែកទីពីរ , មាត់ចាន 📏 ⟫
// ⟨ ចានធ្វើតាមដៃពិត ។ ដូច្នេះការពិនិត្យគឺ ៖ តើពហុកោណចានគ្របពីរជ្រុងមាត់ដៃនីមួយៗឬទេ ។
// បើខ្វះ , ផ្លូវនឹងជាប់នឹងគែមចានដែលកាត់ចូល , ហើយលេចរន្ធឬជំហាន ។
// ការរាប់តាមត្រីមាសចាស់មិនត្រឹមត្រូវទៀតទេ , ព្រោះចានលែងបែងជាការេ ។ 📃 ⟩
function enaPoligono( px: number, pz: number, rando: readonly [ number, number ][]): boolean {
  let ene = false;
  for ( let i = 0, j = rando.length - 1; i < rando.length; j = i++ ) {
    const [ xi, zi ] = rando[i], [ xj, zj ] = rando[j];
    if ( ( zi > pz ) !== ( zj > pz )
      && px < ( xj - xi ) * ( pz - zi ) / ( zj - zi ) + xi ) ene = !ene;
  }
  return ene;
}
console.log("<( មាត់ចាន )>");
let malplenaj = 0;
for ( const k of kunigoj ) {
  const brakoj = kreiBrakojn(k.direktaj, k.fermitaj, k.rotacio);
  const plato = kreiPlatajnPoligonojn(brakoj);
  for ( const b of brakoj ) {
    for ( const f of [ -1, 0, 1 ] ) {
      const px = b.ux * VOJA_TRUA_DUONO * 0.98 - b.uz * VOJA_EKSTERA_DUONO * 0.9 * f;
      const pz = b.uz * VOJA_TRUA_DUONO * 0.98 + b.ux * VOJA_EKSTERA_DUONO * 0.9 * f;
      if ( enaPoligono(px, pz, plato.supraj) || plato.bandoj.some(r => enaPoligono(px, pz, r)) ) continue;
      malplenaj++;
      console.log(`  ( ${k.x.toFixed(1)}, ${k.z.toFixed(1)} ) ដៃ ${( b.ang * 180 / Math.PI ).toFixed(0)}°`
        + ` ជ្រុង ${f} មិនគ្រប , ដៃ ${brakoj.length}`);
    }
  }
}
console.log(`  មាត់ចានខ្វះ ${malplenaj}`);

// ⟪ ផ្នែកទីបី , កម្ពស់ផ្លូវ 📏 ⟫
// ⟨ baza = ដីតែម្នាក់ , ruluma = ដីបូកចំណុចភ្ជាប់ ។ ផ្លូវអាន ruluma 📃 ⟩
console.log("<( កម្ពស់ផ្លូវ )>");
const baza = kreiBazanVojoAlton(alteco);
const vojoAlteco = mondo.vojoAlteco;
let diferencoMaks = 0, diferencoLoko = "";
for ( let i = 0; i < VOJOJ.length; i++ ) {
  const punktoj = gluitaj[i];
  let maks = 0, loko = "", altoMaks = -Infinity, altecoMaks = "";
  for ( let s = 0; s < punktoj.length - 1; s++ ) {
    const [ ax, az ] = punktoj[s];
    const [ bx, bz ] = punktoj[s + 1];
    const longo = Math.hypot(bx - ax, bz - az);
    const paŝoj = Math.max(1, Math.ceil(longo / 0o1/0o2));
    for ( let p = 0; p < paŝoj; p++ ) {
      const t = p / paŝoj;
      const x = ax + ( bx - ax ) * t, z = az + ( bz - az ) * t;
      const difer = Math.abs(vojoAlteco(x, z) - baza(x, z));
      if ( difer > maks ) { maks = difer; loko = x.toFixed(1) + "," + z.toFixed(1); }
      if ( vojoAlteco(x, z) > altoMaks ) { altoMaks = vojoAlteco(x, z); altecoMaks = x.toFixed(1) + "," + z.toFixed(1); }
    }
  }
  const difino = kreiNivelanProfilon(punktoj, VOJOJ[i].larĝo / 4 + VOJA_BORDA_LARĜO,
    vojoAlteco, akvaFino);
  let salto = 0, saltoLoko = "";
  let supremaj = 1;
  for ( let j = 1; j < difino.altoj.length; j++ ) {
    const d = Math.abs(difino.altoj[j] - difino.altoj[j - 1]);
    if ( d > salto ) { salto = d; saltoLoko = difino.situoj[j].toFixed(1); }
    // ⟨ ជំហានចុះមួយកម្រិត = មួយជំហាន 📃 ⟩
    if ( difino.altoj[j] < difino.altoj[j - 1] ) supremaj++;
  }
  if ( maks > diferencoMaks ) { diferencoMaks = maks; diferencoLoko = loko; }
  console.log(`  ផ្លូវ ${i} ${VOJOJ[i].nomo} , តម្រឹមខ្ពស់បំផុត ${maks.toFixed(2)} @${loko}` +
    ` , កម្ពស់ខ្ពស់បំផុត ${altoMaks.toFixed(2)} @${altecoMaks}` +
    ` , ជំហាន ${supremaj} , លោតខ្ពស់បំផុត ${salto.toFixed(2)} @${saltoLoko}`);
}
console.log(`  តម្រឹមខ្ពស់បំផុត ${diferencoMaks.toFixed(2)} @${diferencoLoko}`);

// ⟪ ផ្នែកទីបួន , ជញ្ជាំងក្រោមផ្លូវ 📏 ⟫
// ⟨ ផ្លូវខ្ពស់លើដីទាប ឬលើទឹក ៖ បាតផ្លូវចុះដល់ដី ។ បើដីជ្រៅ , ជញ្ជាំងខ្ពស់ទទេ 📃 ⟩
console.log("<( ជញ្ជាំង )>");
// ⟨ ចំណុចតាមចម្ងាយ s លើបន្ទាត់ផ្លូវ 📃 ⟩
function pozicio( punktoj: readonly VojaPunkto[], s: number ) {
  let kur = 0;
  for ( let k = 0; k < punktoj.length - 1; k++ ) {
    const a = punktoj[k], b = punktoj[k + 1];
    const longo = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if ( s > kur + longo && k < punktoj.length - 2 ) { kur += longo; continue; }
    const t = longo < 1e-9 ? 0 : Math.max(0, Math.min(1, ( s - kur ) / longo));
    return { x: a[0] + ( b[0] - a[0] ) * t, z: a[1] + ( b[1] - a[1] ) * t,
      latX: -( b[1] - a[1] ) / longo, latZ: ( b[0] - a[0] ) / longo };
  }
  const p = punktoj[0];
  return { x: p[0], z: p[1], latX: 0, latZ: 0 };
}
let muroMaks = 0, muroLoko = "", muroAkva = false;
// ⟨ បំបែកជញ្ជាំងជាពីរផ្នែក ៖ ការលើកដី , និងការរអាក់រអួលនៃជំហាន 📃 ⟩
let teroLiftoMaks = 0, teroLiftoLoko = "", ratĉetoMaks = 0, ratĉetoLoko = "";
for ( let i = 0; i < VOJOJ.length; i++ ) {
  const punktoj = gluitaj[i];
  const flanka = VOJOJ[i].larĝo / 4 + VOJA_BORDA_LARĜO;
  const difino = kreiNivelanProfilon(punktoj, flanka, vojoAlteco, akvaFino);
  for ( let j = 0; j < difino.altoj.length; j++ ) {
    const p = pozicio(punktoj, difino.situoj[j]);
    let fundo = Infinity;
    for ( const f of [ -1, 0, 1 ] )
      fundo = Math.min(fundo, alteco(p.x + p.latX * flanka * f, p.z + p.latZ * flanka * f));
    const muro = difino.altoj[j] - fundo;
    if ( muro > muroMaks ) {
      muroMaks = muro;
      muroLoko = p.x.toFixed(1) + "," + p.z.toFixed(1);
      muroAkva = Number.isFinite(akvaFino(p.x, p.z));
    }
    // ⟨ តើកម្ពស់លើសមកពីវាលដី ( រង្វង់ ៤ ឯកតា ) ឬពីជំហានចុះយឺត 📃 ⟩
    const lifto = baza(p.x, p.z) - fundo;
    const ratĉeto = difino.altoj[j] - baza(p.x, p.z);
    if ( lifto > teroLiftoMaks ) { teroLiftoMaks = lifto; teroLiftoLoko = p.x.toFixed(1) + "," + p.z.toFixed(1); }
    if ( ratĉeto > ratĉetoMaks ) { ratĉetoMaks = ratĉeto; ratĉetoLoko = p.x.toFixed(1) + "," + p.z.toFixed(1); }
  }
}
console.log(`  ការលើកដីខ្ពស់បំផុត ${teroLiftoMaks.toFixed(2)} @${teroLiftoLoko}`);
console.log(`  ជំហានយឺតខ្ពស់បំផុត ${ratĉetoMaks.toFixed(2)} @${ratĉetoLoko}`);
console.log(`  ជញ្ជាំងខ្ពស់បំផុត ${muroMaks.toFixed(2)} @${muroLoko}` +
  ( muroAkva ? " , លើទឹក" : " , លើដីគោក" ));
// ⟨ នៅកន្លែងជញ្ជាំងខ្ពស់បំផុត ៖ ជម្រាលដីតាមផ្លូវនិងឆ្លងកាត់ 📃 ⟩
{
  const [ mx, mz ] = muroLoko.split(",").map(Number);
  const tero = alteco(mx, mz);
  console.log(`  នៅ ${muroLoko} ៖ ដី ${tero.toFixed(2)}` +
    ` , តាមផ្លូវ +៤ ${alteco(mx + 0o4, mz).toFixed(2)} ${alteco(mx - 0o4, mz).toFixed(2)}` +
    ` , ឆ្លងកាត់ +៤ ${alteco(mx, mz + 0o4).toFixed(2)} ${alteco(mx, mz - 0o4).toFixed(2)}`);
}

// ⟪ ផ្នែកទីប្រាំ , ចំណត 📏 ⟫
// ⟨ កម្ពស់ចំណតត្រូវគណនាដោយវាលតែមួយនឹងផ្លូវ ។ បើ baza , ចំណតអាចខុសកម្រិត 📃 ⟩
console.log("<( ចំណត )>");
for ( const d of DOKOJ ) {
  const r = d.rotacio ?? 0;
  const lx = d.x + Math.sin(r) * ( d.profundo / 2 );
  const lz = d.z + Math.cos(r) * ( d.profundo / 2 );
  console.log(`  ( ${d.x.toFixed(1)}, ${d.z.toFixed(1)} ) មាត់ដី baza ${baza(lx, lz).toFixed(2)}` +
    ` , តម្រឹម ${vojoAlteco(lx, lz).toFixed(2)}` +
    ` , ខុស ${( vojoAlteco(lx, lz) - baza(lx, lz) ).toFixed(2)}`);
}
