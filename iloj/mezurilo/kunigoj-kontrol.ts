// ≺⧼ រកចំណុច ៖ ចានភ្ជាប់គ្របដណ្តប់ទៅផ្លូវនៅរង្វើម ។ 📃 ⟩
import "./falsdomo.mjs";
import * as THREE from "three";
import { aktivajVojoj, aktivajDokoj, aktivajUrboj } from "../../kantaoj/tero-datumaro/rultempo.js";
import { alteco, akvaNivelo, skulptitaAkvo } from "../../kantaoj/mondo/tereno.js";
import { troviVojaRetajnKunigojn, kunigajBrakojElVojoj } from "../../eskekoj/medio/voj-reto.js";
import type { VojaRetoVojo } from "../../eskekoj/medio/voj-reto.js";
import { vojaSupro as vojaSuproBaza, vojaSuproDeKunigo, plataAltoCxe } from "../../eskekoj/medio/vojoj/formoj.js";
import { konstruiVojojn } from "../../eskekoj/medio/vojoj.js";
import { konstruiIntersekcajnPlatojn } from "../../eskekoj/medio/vojoj/platoj.js";
import { kreiBrakojn, kunigaPlataAlto, kunigaPlataNivelo } from "../../eskekoj/medio/vojoj/platoj.js";
import { kreiVojoAlton, kreiBazanVojoAlton } from "../../eskekoj/medio/vojoj/alto.js";
import { kreiNivelanProfilon } from "../../eskekoj/medio/vojoj/niveloj.js";
import { punktoCxe } from "./komunaj.js";
import { VOJA_EKSTERA_DUONO, VOJA_SUPRO_LEVIGXO, KORNA_R,
  STUPA_RISERO, surGrid, VOJA_TRUA_DUONO, VOJA_BURIAL_TOLERANCO,
  vojaLarghoDuono } from "../../eskekoj/medio/vojoj/mezuroj.js";
import { PONT_AKVA_KLARANCO } from "../../eskekoj/medio/doko/ponto.js";
import { kalkuliStupanNombron, kreiStuparajnPunktojn, kreiStuparanAlton } from "../../eskekoj/medio/doko/stuparo.js";
import { konstruiPontanProfilon, havasAkvanTrunkon, kreiPontanAkvanTeston } from "../../eskekoj/medio/vojoj/ponto-profilo.js";
import { konstruiDokon } from "../../eskekoj/medio/doko.js";
import { konstruiKradanUrbon } from "../../kantaoj/mondo/urbo/krada-urbo.js";
import { gluiVojaFinon } from "../../eskekoj/medio/vojoj/gluado.js";
import { kreiDioritanMaterialon, kreiAndezitanMaterialon, kreiOranMaterialon } from "../../eskekoj/komunajxoj/materialoj.js";
import { ANGULA_PROVOLIRO } from "../../eskekoj/medio/vojoj/bufroj.js";
import { kunigajNiveloj } from "../../eskekoj/medio/vojoj/kunig-niveloj.js";
import { vojSuprajxoj } from "../../eskekoj/medio/vojoj/tipoj.js";

const VOJOJ = aktivajVojoj();
const DOKOJ = aktivajDokoj();
const URBOJ = aktivajUrboj();
// ⟨ ចំណុចបិទជ្រុង ៖ បញ្ចូលពីទីក្រុងក្រឡា និងពីផ្លូវដៃ ។ 📃 ⟩
const kunigoFermitaj = new Map<string, [ number, number ]>();

function vojaSupro(x: number, z: number, larĝo: number): number {
  return vojaSuproBaza(x, z, larĝo, vojoAlteco);
}
function pontaFinAlto(x: number, z: number, larĝo: number): number {
  let plejProksima: { x: number; z: number; direktaj: [ number, number ][] } | null = null, plejMallonga = Infinity;
  for ( const k of kunigoj ) {
    const d = Math.hypot(k.x - x, k.z - z);
    if ( d < plejMallonga ) { plejMallonga = d; plejProksima = k; }
  }
  if ( plejProksima && plejMallonga < VOJA_EKSTERA_DUONO + KORNA_R )
    return vojaSuproDeKunigo(plejProksima.x, plejProksima.z, plejProksima.direktaj, VOJA_EKSTERA_DUONO, vojoAlteco).supro;
  return vojaSupro(x, z, larĝo);
}
const cxuVeraAkvo = (x: number, z: number) =>
  skulptitaAkvo(x, z) && alteco(x, z) < akvaNivelo(x, z) - 0o1/0o200;
const akvaFino = ( x: number, z: number ): number =>
  cxuVeraAkvo(x, z) ? akvaNivelo(x, z) + 0o1/0o2 : -Infinity;

const sceno = new THREE.Scene();
const dioritaMaterialo = kreiDioritanMaterialon( new THREE.Texture() );
const andezitaMaterialo = kreiAndezitanMaterialon( new THREE.Texture() );
const oraMaterialo = kreiOranMaterialon( 0xd8b45a );

const kradajDifinoj: any[] = [];
const kradajKunigoj: [ number, number ][] = [];
// ⟨ ទីក្រុងលំនាំដើម ៖ ដូច urbo.ts ។ បើគ្មានទីក្រុងឆ្លាក់ , ទីក្រុងក្រឡានៅតែមាន ,
// ដូច្នេះការវាស់ត្រូវរាប់ចំណុចប្រសព្វរបស់វាដែរ ។ 📃 ⟩
const urboListo = URBOJ.length ? URBOJ
  : [ { nomo: "Ĉefa", arangxaGrando: 3, blokaGrando: "unu", ofsX: 0, ofsZ: 0 } ];
for ( const u of urboListo ) {
  const urbo = konstruiKradanUrbon( sceno,
    { arangxaGrando: u.arangxaGrando, blokaGrando: u.blokaGrando as any, keuxfhxeso: false, lampoj: false },
    [ u.ofsX, u.ofsZ ], oraMaterialo, ( u as any ).aldonajBlokoj ?? [] );
  kradajDifinoj.push( ...urbo.vojDifinoj );
  kradajKunigoj.push( ...urbo.kunigajPunktoj );
  for ( const [ klavo, f ] of urbo.kunigajFermitaj )
    kunigoFermitaj.set(klavo, f);
}
console.log(`ផ្លូវក្រឡា ${kradajDifinoj.length} , ចំណុចភ្ជាប់ក្រឡា ${kradajKunigoj.length}`);
// ⟪ ការទាញចុងផ្លូវ 🧲 ⟫
// ⟨ ដូច urbo.ts ៖ ចុងផ្លូវត្រូវទាញទៅចានភ្ជាប់ជិតបំផុត ។ បើមិនទាញ ,
// មាត់ផ្លូវមិនដល់ចាន , ហើយការវាស់ជញ្ជាំងគឺជាការវាស់ខុស ។ 📃 ⟩
const validaj = VOJOJ.filter( v => v.punktoj.length >= 2 );
const pontaj: boolean[] = [];
const vojajRetajVojoj: VojaRetoVojo[] = validaj.map( vojo => {
  const pontoLarĝo = vojo.pontoLarĝo ?? vojo.larĝo;
  const trunko = havasAkvanTrunkon( vojo.punktoj,
    kreiPontanAkvanTeston( vojo.punktoj, pontoLarĝo, cxuVeraAkvo ) );
  pontaj.push(trunko);
  return { punktoj: vojo.punktoj as [ number, number ][],
    larĝo: trunko ? pontoLarĝo : vojo.larĝo };
} );
const dokaLandaj = DOKOJ.map( d => {
  const r = d.rotacio ?? 0;
  return { x: d.x + Math.sin(r) * ( d.profundo / 2 ), z: d.z + Math.cos(r) * ( d.profundo / 2 ) };
} );
const antaŭajKunigoj = troviVojaRetajnKunigojn( vojajRetajVojoj, DOKOJ );
const gluaCelo: [ number, number ][] = [ ...kradajKunigoj,
  ...antaŭajKunigoj.map( k => [ k.x, k.z ] as [ number, number ] ) ];
const kradajPunktoj = kradajDifinoj.map( d => d.pts as [ number, number ][] );
for ( let vi = 0; vi < validaj.length; vi++ ) {
  const originalaj = vojajRetajVojoj[ vi ].punktoj;
  const aliaj = [ ...kradajPunktoj,
    ...vojajRetajVojoj.map(( v, i ) => i === vi ? [] : v.punktoj ) ];
  const punktoj = gluiVojaFinon( originalaj, gluaCelo, dokaLandaj, aliaj );
  if ( punktoj.length >= 2 ) vojajRetajVojoj[ vi ] = { ...vojajRetajVojoj[ vi ], punktoj };
}
const kunigoj = troviVojaRetajnKunigojn( vojajRetajVojoj, DOKOJ );
const kunigoPunktoj = kunigoj.map( k => [ k.x, k.z ] as [ number, number ] );
const kunigoRotacioj = new Map( kunigoj.map( k => [ k.x + "," + k.z, k.rotacio ] ) );
const kunigoDirektoj = new Map<string, [ number, number ][]>(
  kunigoj.map( k => [ k.x + "," + k.z, k.direktaj ] ) );
// ⟨ កន្លះទទឹងផ្លូវពិត 📏 ⟩ ៖ ចានត្រូវធំល្មមនឹងផ្លូវដែលចូលមក ។
const kunigoDuonoj = new Map( kunigoj.map( k => [ k.x + "," + k.z, k.duono ] ) );
for ( const k of kunigoj ) kunigoFermitaj.set( k.x + "," + k.z, k.fermitaj );

// ⟪ វាលកម្ពស់តែមួយ 📏 ⟫
// ⟨ ផ្លូវ និងចានភ្ជាប់ត្រូវអានវាលតែមួយ ។ បើផ្លូវអានដីឆៅ ,
// ផ្លូវនីមួយៗមានកម្រិតផ្ទាល់ខ្លួន ហើយមាត់ចានលោត ។ វាស់ដូចហ្គេម ។ 📃 ⟩
// ⟨ វាលបណ្តោះអាសន្ន 📏 ⟩ ៖ កម្រិតចានត្រូវការវាល , តែវាលត្រូវការកម្រិតចាន ។
// ដូច្នេះវាលសាងពីដីមុន , ហើយសាងឡើងវិញក្រោយការទាញដៃ ។ 📃 ⟩
// ⟨ ផ្ទឃ្លាំងទឹក 📃 ⟩ ៖ បញ្ជូនផ្ទឃ្លាំងទឹកទៅវាលផ្លូវ ដូច្នេះកោណមិនលើកផ្លូវលើទឹក ។
let vojoAlteco = kreiVojoAlton(alteco, [ ...kradajKunigoj.map(([ x, z ]) =>
  ( { x, z, direktaj: [] as [ number, number ][] } )), ...kunigoj ], akvaFino);
const vojDifinoj: any[] = [];
for ( let vi = 0; vi < validaj.length; vi++ ) {
  const vojo = validaj[ vi ];
  const punktoj = vojajRetajVojoj[ vi ].punktoj;
  const pontoLarĝo = vojo.pontoLarĝo ?? vojo.larĝo;
  let heightFn: ( ( x: number, z: number ) => number ) | undefined;
  let glata = false;
  if ( pontaj[ vi ] ) {
    const cxuPontaAkvo = kreiPontanAkvanTeston( punktoj, pontoLarĝo, cxuVeraAkvo );
    const akvaSupro = ( x: number, z: number ): number => {
      if ( !cxuPontaAkvo(x, z) ) return -Infinity;
      return akvaNivelo(x, z) + PONT_AKVA_KLARANCO;
    };
    const profilo = konstruiPontanProfilon( punktoj, pontoLarĝo, vojaSupro, akvaSupro, pontaFinAlto );
    heightFn = ( x, z ) => profilo.alto(x, z) - VOJA_SUPRO_LEVIGXO;
    glata = true;
  }
  vojDifinoj.push( { pts: punktoj, w: vojo.larĝo / 2, kapoj: true, heightFn, glata } );
}
// ⟨ ជណ្តើរចឆណត ៖ បង្កើតករ្រង់ទន្លេ ដឹងកម្ពស់ចានភ្ជាប់ ។ 📃 ⟩
/*រកចំណុចភ្ជាប់ជិតបំផុតក្នុងចម្ងាយចានភ្ជាប់
    @param x, z ( number ) - ចំណុចស្វែងរក
@returns kunigo ( ចំណុចភ្ជាប់ | null ) - ចំណុចភ្ជាប់ជិតបំផុត , ឬ null */
function proksimaKunigo( x: number, z: number ) {
  let plejProksima = null, plejMallonga = Infinity;
  for ( const k of kunigoj ) {
    const distanco = Math.hypot(k.x - x, k.z - z);
    if ( distanco < plejMallonga ) { plejMallonga = distanco; plejProksima = k; }
  }
  return plejMallonga < VOJA_TRUA_DUONO ? plejProksima : null;
}
const dokajObjektoj: ReturnType<typeof konstruiDokon>[] = [];
for ( const D of DOKOJ ) {
  const doko = konstruiDokon( sceno, D.x, D.z, D.rotacio ?? 0, vojoAlteco, akvaNivelo, D.profundo );
  dokajObjektoj.push(doko);
  if ( doko.stuparajPunktoj.length < 2 ) continue;
  const rotacio = D.rotacio ?? 0;
  const landaX = D.x + Math.sin( rotacio ) * ( D.profundo / 2 );
  const landaZ = D.z + Math.cos( rotacio ) * ( D.profundo / 2 );
  const starto = surGrid( pontaFinAlto( landaX, landaZ, doko.platformWidth ) );
  const falto = starto - doko.landejaY;
  if ( falto <= STUPA_RISERO * 0o1/0o2 ) continue;
  // ⟨ ត្រូវមានយ៉ាងតិចពីរកថាប៉ាស ( ដូច urbo.ts ) ៖ កថាប៉ាសតែមួយរាបទាំងស្រុង ។ 📃 ⟩
  const nombro = kalkuliStupanNombron( falto );
  // ⟨ ជណ្តើរចាប់ផ្តើមត្រង់មាត់ចាន ៖ បើវាចាប់ក្នុងចាន , ជំហានដំបូងលិចក្រោមចាន
  // ហើយជំហានដែលឃើញនៅមាត់ចានទាបជាងចានច្រើនជំហាន = ជញ្ជាំង ។ 📃 ⟩
  let komenco = doko.stuparajPunktoj[0];
  const fino = doko.stuparajPunktoj[1];
  const kunigo = proksimaKunigo(landaX, landaZ);
  if ( kunigo ) {
    const diferencoX = fino[0] - kunigo.x, diferencoZ = fino[1] - kunigo.z;
    const longo = Math.hypot(diferencoX, diferencoZ);
    if ( longo > VOJA_TRUA_DUONO ) {
      const parto = VOJA_TRUA_DUONO / longo;
      komenco = [ kunigo.x + diferencoX * parto, kunigo.z + diferencoZ * parto ];
    }
  }
  const punktoj = kreiStuparajnPunktojn( komenco, fino, nombro );
  vojDifinoj.push( { pts: punktoj, w: doko.platformWidth, stuparo: true,
    heightFn: kreiStuparanAlton( punktoj, starto - VOJA_SUPRO_LEVIGXO, doko.landejaY ),
    grundoFn: alteco } );
  // ⟨ វិនិច្ចយសាកល្បង 📃 ⟩
  if ( DOKOJ.indexOf( D ) === 0 ) {
    const provAlto = kreiStuparanAlton( punktoj, starto - VOJA_SUPRO_LEVIGXO, doko.landejaY );
    console.log( `  ⚑ prov nombro=${nombro} starto=${starto.toFixed(3)} LEVIGXO=${VOJA_SUPRO_LEVIGXO.toFixed(3)} landejaY=${doko.landejaY.toFixed(3)}` );
    console.log( `    komenco=${JSON.stringify(komenco)} fino=${JSON.stringify(fino)}` );
    for ( let s = 0; s <= 0o10; s++ ) {
      const tt = s / 0o10;
      const x = komenco[0] + ( fino[0] - komenco[0] ) * tt;
      const z = komenco[1] + ( fino[1] - komenco[1] ) * tt;
      console.log( `    t=${tt.toFixed(2)} (${x.toFixed(2)},${z.toFixed(2)}) -> ${provAlto(x,z).toFixed(3)}` );
    }
  }
}
// ⟪ ដៃពីផ្លូវទាំងអស់ 📏 ⟫
// ⟨ ដូច urbo.ts 📃 ⟩ ៖ ដៃត្រូវមកពីផ្លូវពិតទាំងអស់ ( ក្រឡា និងដៃ ) ។
// បើមកតែពី troviVojaRetajnKunigojn , ចំណុចក្រឡាដែលផ្លូវដៃមកដល់នៅតែពីរដៃ ,
// ហើយការវាស់មិនឃើញបញ្ហាជ្រុង-ជំនួស-តួ T ទេ ។ 📃 ⟩
const ĉiujDifinoj = [ ...kradajDifinoj, ...vojDifinoj ] as
  { pts: [ number, number ][]; w: number }[];
const ĉiujKunigoj = [ ...kradajKunigoj, ...kunigoPunktoj ];
const ĉiujRetajVojoj: VojaRetoVojo[] = [
  ...kradajDifinoj.map( d => ( { punktoj: d.pts as [ number, number ][], larĝo: 0o2 * d.w } ) ),
  ...vojajRetajVojoj ];
const derivitajBrakoj = kunigajBrakojElVojoj(ĉiujKunigoj, ĉiujRetajVojoj);
for ( const k of kunigoj ) {
  const klavo = k.x + "," + k.z;
  const listo = derivitajBrakoj.get(klavo) ?? [];
  for ( const d of k.direktaj )
    if ( !listo.some( u => u[0] * d[0] + u[1] * d[1] > 0o1 - 0o1/0o1000 ) ) listo.push(d);
  derivitajBrakoj.set(klavo, listo);
  k.direktaj = listo;
}
for ( const [ klavo, listo ] of derivitajBrakoj ) kunigoDirektoj.set(klavo, listo);
vojoAlteco = kreiVojoAlton(alteco, ĉiujKunigoj.map(([ x, z ]) =>
  ( { x, z, direktaj: derivitajBrakoj.get(x + "," + z) ?? [],
    duono: kunigoDuonoj.get(x + "," + z) ?? 0.875 } )), akvaFino);
// ⟪ ចំណុចភ្ជាប់ទាំងអស់ 📏 ⟫
// ⟨ ចំណុចក្រឡាមានការបិទជ្រុងតែប៉ុណ្ណោះ , គ្មានទិសដៃពិត ។ ការវាស់ត្រូវរាប់ពួកវាដែរ ,
// ព្រោះមាត់ផ្លូវក្រឡាអាចលោតខុសពីមាត់ផ្លូវឆ្លាក់ ។ 📃 ⟩
interface KunigaDatumo {
  x: number; z: number;
  direktaj: readonly [ number, number ][];
  fermitaj: [ number, number ] | undefined;
  rotacio: number;
}
const ĉiujKunigajDatumoj: KunigaDatumo[] = [
  ...kunigoj.map(k => ( { x: k.x, z: k.z, direktaj: k.direktaj,
    fermitaj: k.fermitaj, rotacio: k.rotacio } )),
  ...kradajKunigoj.map(([ x, z ]) => ( { x, z,
    direktaj: ( derivitajBrakoj.get(x + "," + z) ?? [] ) as [ number, number ][],
    fermitaj: kunigoFermitaj.get(x + "," + z), rotacio: 0 } )) ];
// ⟨ បន្ទះផ្លូវ និងចានតែប៉ុណ្ណោះ 📏 ⟩ ៖ អគារក្រឡានៅក្នុងឆាកដែរ ។ កាំរស្មីដែលប៉ះអគារ
// រាយការលោតកម្ពស់ក្លែងក្លាយ ។ ដូច្នេះវាស់តែលើផ្ទៃផ្លូវ ។ 📃 ⟩
const antaŭajInfanoj = new Set<THREE.Object3D>(sceno.children);
konstruiVojojn( sceno, [ ...kradajDifinoj, ...vojDifinoj ], vojoAlteco, dioritaMaterialo, andezitaMaterialo, ĉiujKunigoj,
  { akvaFn: akvaFino, kunigajDirektoj: kunigoDirektoj, kunigajFermitaj: kunigoFermitaj,
    kunigajRotacioj: kunigoRotacioj, kunigajDuonoj: kunigoDuonoj } );
konstruiIntersekcajnPlatojn( sceno, ĉiujKunigoj, vojoAlteco, dioritaMaterialo, andezitaMaterialo,
  kunigoFermitaj, kunigoRotacioj, kunigoDirektoj, alteco, kunigoDuonoj );
const vojMeshoj = sceno.children.filter(o => !antaŭajInfanoj.has(o));
sceno.updateMatrixWorld(true);

// ⟪ ផ្លូវដែលកប់ក្នុងដី 📏 ⟫
// ⟨ វាស់លើផ្ទៃដែលបានសាងសង់ពិត , ទាំងខ្សែកណ្តាល និងគែមទាំងពីរ ។
// ចានភ្ជាប់គ្របរន្ធ , ដូច្នេះរំលងចំណុចក្នុងរន្ធ ។ 📃 ⟩
let plejEnterigxo = 0, enterigxintaj = 0, enterigxaLoko = "";
for ( const peco of vojSuprajxoj ) {
  const longo = Math.hypot(peco.x2 - peco.x1, peco.z2 - peco.z1);
  if ( longo < 0o1 / 0o1000 ) continue;
  const ndx = ( peco.x2 - peco.x1 ) / longo, ndz = ( peco.z2 - peco.z1 ) / longo;
  for ( const f of [ 0, 0o1 / 0o4, 0o1 / 0o2, 0o3 / 0o4, 1 ] ) {
    const cx = peco.x1 + ( peco.x2 - peco.x1 ) * f;
    const cz = peco.z1 + ( peco.z2 - peco.z1 ) * f;
    const supro = peco.y0 + ( peco.y1 - peco.y0 ) * f;
    for ( const lat of [ -peco.duono, 0, peco.duono ] ) {
      const px = cx - ndz * lat, pz = cz + ndx * lat;
      const enterigxo = alteco(px, pz) - supro;
      if ( enterigxo > VOJA_BURIAL_TOLERANCO ) enterigxintaj++;
      if ( enterigxo > plejEnterigxo ) {
        plejEnterigxo = enterigxo;
        enterigxaLoko = `@${px.toFixed(1)},${pz.toFixed(1)} ផ្ទៃ ${supro.toFixed(2)}` +
          ` ដី ${alteco(px, pz).toFixed(2)}`;
      }
    }
  }
}
console.log(`ផ្លូវកប់ក្នុងដីជ្រៅបំផុត ${plejEnterigxo.toFixed(3)} ${enterigxaLoko}` +
  ` , គំរូកប់ ${enterigxintaj}`);

// ⟪ កម្ពស់ផ្លូវដែលបានតាមដានតាមដៃ 📏 ⟫
// ⟨ បង្ហាញចានដែលដៃរបស់វាមិនស្មើគ្នា ។ បើគ្មាន , ការតាមដានបរាជ័យ
// ហើយចានរកឃើញកម្ពស់តែមួយដូចមុន ។ 📃 ⟩
const malsamaj = [ ...kunigajNiveloj.values() ].filter(n => {
  const altoj = n.brakoj.map(b => b.alto).filter(Number.isFinite);
  return altoj.length > 0o1 && Math.max(...altoj) - Math.min(...altoj) > STUPA_RISERO;
});
for ( const n of malsamaj.slice(0, 0o10) )
  console.log( `ចាន ( ${n.x.toFixed(1)}, ${n.z.toFixed(1)} ) រាប ${n.alto.toFixed(2)}` +
    ` ដៃ [ ${n.brakoj.map(b => b.alto.toFixed(2)).join(" ")} ]` );
console.log( `ចានដែលមានដៃខុសកម្ពស់ ${malsamaj.length} / ${kunigajNiveloj.size}` );

// ⟪ ដៃដែលខ្វះនៅចានភ្ជាប់ 📏 ⟫
// ⟨ ផ្លូវមកដល់ , ចានគ្មានដៃ 📃 ⟩ ៖ បើផ្លូវពិតមកដល់ចំណុចភ្ជាប់ តែចានមិនមានដៃ
// ទៅរកផ្លូវនោះ , ចានលាតតែខាងផ្លូវផ្សេង , ហើយមាត់ផ្លូវនោះកាត់ចូលជ្រុងមូល ។
// ឃើញជាចានជ្រុងពីរដៃ ( ជ្រុង ) ជំនួសឱ្យចានបីដៃ ( តួ T ) ។ 📃 ⟩
// ⟨ ហេតុអ្វីរាប់ពីផ្លូវ 📃 ⟩ ៖ ការពិនិត្យរន្ធខាងក្រោមអានតែដៃដែលមាន ។ ដៃដែលខ្វះ
// មិនបង្កើតរន្ធក្នុងការពិនិត្យនោះទេ , ដូច្នេះវាមើលមិនឃើញ ។ 📃 ⟩
// ⟨ ភាពជិតនៃដៃ 📏 ⟩ ៖ ដៃត្រូវរាប់ថាមាន បើវានៅក្នុង ២២.៥ ដឺក្រេ ( π/៨ ) ។
const BRAKA_TOLERO = Math.cos(Math.PI / 0o10);
function havasBrakon( brakoj: readonly { ux: number; uz: number }[],
  dx: number, dz: number ): boolean {
  const longo = Math.hypot(dx, dz);
  if ( longo < 0o1/0o100 ) return true;
  const ux = dx / longo, uz = dz / longo;
  return brakoj.some(b => b.ux * ux + b.uz * uz > BRAKA_TOLERO);
}
let mankaj = 0;
for ( const k of ĉiujKunigoj ) {
  const brakoj = kreiBrakojn(kunigoDirektoj.get(k[0] + "," + k[1]) ?? [],
    kunigoFermitaj.get(k[0] + "," + k[1]), kunigoRotacioj.get(k[0] + "," + k[1]) ?? 0,
    kunigoDuonoj.get(k[0] + "," + k[1]));
  const mankoj: string[] = [];
  for ( const d of ĉiujDifinoj ) {
    if ( d.pts.length < 2 ) continue;
    // ⟨ ចុងផ្លូវនៅចំណុចនេះ 📃 ⟩ ៖ ផ្លូវត្រូវមានដៃទៅរកចុងរបស់វា ។
    for ( const [ ei, ni ] of [ [ 0, 1 ], [ d.pts.length - 1, d.pts.length - 2 ] ] ) {
      const e = d.pts[ei], n = d.pts[ni];
      if ( !e || !n ) continue;
      if ( Math.hypot(e[0] - k[0], e[1] - k[1]) > VOJA_TRUA_DUONO ) continue;
      if ( !havasBrakon(brakoj, n[0] - k[0], n[1] - k[1]) )
        mankoj.push(`ចុង ${e[0].toFixed(1)},${e[1].toFixed(1)}→${n[0].toFixed(1)},${n[1].toFixed(1)}`);
    }
    // ⟨ ផ្លូវឆ្លងកាត់ចំណុចនេះ 📃 ⟩ ៖ ផ្លូវត្រូវមានដៃទាំងពីរខាង ។
    for ( let i = 0; i < d.pts.length - 1; i++ ) {
      const a = d.pts[i], b = d.pts[i + 1];
      const vx = b[0] - a[0], vz = b[1] - a[1];
      const longo2 = vx * vx + vz * vz;
      if ( longo2 < 0o10 ** -0o4 ) continue;
      const t = (( k[0] - a[0] ) * vx + ( k[1] - a[1] ) * vz) / longo2;
      if ( t <= 0o1/0o50 || t >= 1 - 0o1/0o50 ) continue;
      const px = a[0] + vx * t, pz = a[1] + vz * t;
      if ( Math.hypot(px - k[0], pz - k[1]) > 0o1/0o10 ) continue;
      for ( const [ qx, qz ] of [ [ a[0], a[1] ], [ b[0], b[1] ] ] ) {
        if ( !havasBrakon(brakoj, qx - k[0], qz - k[1]) )
          mankoj.push(`ឆ្លងកាត់→${qx.toFixed(1)},${qz.toFixed(1)}`);
      }
    }
  }
  if ( mankoj.length ) {
    mankaj++;
    console.log(`ចានភ្ជាប់ ( ${k[0].toFixed(1)}, ${k[1].toFixed(1)} ) ដៃ ${brakoj.length} , ` +
      `ផ្លូវគ្មានដៃ ${mankoj.length} : ${mankoj.slice(0,6).join(" ")}`);
  }
}
console.log(`ចានភ្ជាប់ដែលខ្វះដៃ ${mankaj} / ${ĉiujKunigoj.length}`);

// ⟨ ស្ក្សាប់ ៖ រកចន្លោះនៃចានភ្ជាប់ក្រោមផ្លូវ ។ 📃 ⟩
// ⟨ តំបន់ត្រូវការ 📏 ⟩ ៖ ចានជាសហជីវនៃបន្ទះផ្លូវ , មិនមែនជាការេទេ ។ ដូច្នេះការពិនិត្យ
// គឺរង្វង់កណ្តាល ( រហូតដល់ VOJA_EKSTERA_DUONO ) និងមាត់ផ្លូវនីមួយៗ ។ ការរាប់
// តាមរង្វង់ថេរនៅ ១.៩ រាប់ជ្រុងទទេរបស់ប្រសព្វពីរដៃថាជារន្ធ , ដែលមិនត្រឹមត្រូវ ។ 📃 ⟩
function atenduKovron( x: number, z: number, brakoj: readonly { ux: number; uz: number }[] ): boolean {
  if ( Math.hypot(x, z) <= VOJA_EKSTERA_DUONO - 0.02 ) return true;
  for ( const b of brakoj ) {
    const laux = x * b.ux + z * b.uz;
    const flanka = Math.abs(-x * b.uz + z * b.ux);
    if ( laux >= 0 && laux <= VOJA_TRUA_DUONO - 0.02
      && flanka <= VOJA_EKSTERA_DUONO - 0.02 ) return true;
  }
  return false;
}

const rc = new THREE.Raycaster();

// ⟪ រកជញ្ជាំងចំណត 📏 ⟫
// ⟨ រកកន្លែងផ្លូវលោតចុះឈរនៅមាត់ចំណត ៖ តាមអ័ក្សចំណត និងតាមទទឹងចាន ។ 📃 ⟩
function mezuY( x: number, z: number ): number | null {
  rc.set( new THREE.Vector3(x, 0o120, z), new THREE.Vector3(0, -1, 0) );
  const h = rc.intersectObjects( vojMeshoj, true ).find( x2 => x2.object.visible );
  return h ? h.point.y : null;
}
console.log("\n⟪ របាយអ័ក្សចំណត 🚢 ⟫");
for ( const D of DOKOJ ) {
  const r = D.rotacio ?? 0, cosR = Math.cos(r), sinR = Math.sin(r);
  const prof = D.profundo ?? 0o14;
  const wx = ( lx: number, lz: number ) => D.x + cosR * lx + sinR * lz;
  const wz = ( lx: number, lz: number ) => D.z - sinR * lx + cosR * lz;
  const vico: string[] = [];
  let antaŭa = NaN, maksSalto = 0, lokoSalto = "";
  for ( let lz = prof / 2 + 3; lz >= -prof / 2 - 1; lz -= 0o1/0o4 ) {
    const y = mezuY( wx(0, lz), wz(0, lz) );
    const akvo = cxuVeraAkvo( wx(0, lz), wz(0, lz) );
    const t = ( y === null ? "--" : y.toFixed(2) ) + ( akvo ? "≈" : " " );
    vico.push(`${lz.toFixed(1)}:${t}`);
    if ( y !== null && Number.isFinite(antaŭa) ) {
      const salto = antaŭa - y;
      if ( salto > maksSalto ) { maksSalto = salto; lokoSalto = `${lz.toFixed(1)}`; }
    }
    antaŭa = y ?? NaN;
  }
  const doko = DOKOJ.indexOf(D);
  const dokObj = dokajObjektoj[doko];
  console.log(`ចំណត ${doko} @(${D.x.toFixed(1)},${D.z.toFixed(1)}) ប្រវែង ${prof} អ័ក្ស:`);
  console.log(`  វាលចំណត platformY=${dokObj.platformY.toFixed(3)} landejaY=${dokObj.landejaY.toFixed(3)} ` +
    `platformWidth=${dokObj.platformWidth.toFixed(2)} platformDepth=${dokObj.platformDepth.toFixed(2)}`);
  console.log(`  sekcioj: ` + dokObj.sekcioj.map((s: any) => `y=${s.y.toFixed(3)}@(lz=${s.lz.toFixed(2)},d=${s.d.toFixed(2)})`).join(" "));
  console.log("  " + vico.join(" "));
  console.log(`  លោតចុះខ្ពស់បំផុត ${maksSalto.toFixed(2)} @lz=${lokoSalto}`);
  const vico2: string[] = [];
  let antaŭa2 = NaN, maksSalto2 = 0, loko2 = "";
  for ( let lx = -4; lx <= 4; lx += 0o1/0o4 ) {
    const y = mezuY( wx(lx, prof / 2), wz(lx, prof / 2) );
    vico2.push(`${lx.toFixed(1)}:${y === null ? "--" : y.toFixed(2)}`);
    if ( y !== null && Number.isFinite(antaŭa2) ) {
      const salto = Math.abs(y - antaŭa2);
      if ( salto > maksSalto2 ) { maksSalto2 = salto; loko2 = `${lx.toFixed(1)}`; }
    }
    antaŭa2 = y ?? NaN;
  }
  console.log("  ទទឹងមាត់: " + vico2.join(" "));
  console.log(`  លោតទទឹងខ្ពស់បំផុត ${maksSalto2.toFixed(2)} @lx=${loko2}`);
}
// ⟪ រកកម្ពស់ស្រទាប់ចំណត 0 ( រួមវេទិកា ) 🔬 ⟫
{
  const mezuPlena = ( x: number, z: number ): number | null => {
    rc.set( new THREE.Vector3(x, 0o120, z), new THREE.Vector3(0, -1, 0) );
    const h = rc.intersectObjects( sceno.children, true ).find( x2 => x2.object.visible );
    return h ? h.point.y : null;
  };
  const D = DOKOJ[0];
  const r = D.rotacio ?? 0, cosR = Math.cos(r), sinR = Math.sin(r);
  const wx = ( lx: number, lz: number ) => D.x + cosR * lx + sinR * lz;
  const wz = ( lx: number, lz: number ) => D.z - sinR * lx + cosR * lz;
  const vico: string[] = [];
  for ( let lz = 0o13; lz >= -0o11; lz -= 0o1/0o4 ) {
    const y = mezuPlena( wx(0, lz), wz(0, lz) );
    vico.push(`${lz.toFixed(1)}:${y === null ? "--" : y.toFixed(2)}`);
  }
  console.log("  អ័ក្សពេញ: " + vico.join(" "));
}
// ⟪ រកកម្ពស់ស្រទាប់ចំណត 📏 ⟫
console.log("\n⟪ រកស្រទាប់ចំណត 0 🔬 ⟫");
{
  const D = DOKOJ[0];
  const r = D.rotacio ?? 0, cosR = Math.cos(r), sinR = Math.sin(r);
  const wx = ( lx: number, lz: number ) => D.x + cosR * lx + sinR * lz;
  const wz = ( lx: number, lz: number ) => D.z - sinR * lx + cosR * lz;
  for ( const [ lx, lz ] of [ [ 0, 0o10 ], [ 0, 0 ], [ 0, -4 ] ] as [ number, number ][] ) {
    rc.set( new THREE.Vector3(wx(lx, lz), 0o120, wz(lx, lz)), new THREE.Vector3(0, -1, 0) );
    const hs = rc.intersectObjects( vojMeshoj, true ).filter( h => h.object.visible );
    const ys = hs.map( h => h.point.y.toFixed(3) ).join(", ");
    console.log(`  (lx=${lx},lz=${lz}) -> [${ys}]`);
  }
}

const raporto: string[] = [];
let provitaj = 0;
for ( const k of kunigoj ) {
  const brakoj = kreiBrakojn(k.direktaj, k.fermitaj, k.rotacio);
  const mankoj: string[] = [];
  for ( let a = 0; a < 0o40; a++ ) {
    const ang = a * Math.PI * 2 / 0o40;
    for ( const r of [ 0.5, 1.0, 1.4, 1.8, 2.05 ] ) {
      const x = k.x + Math.cos(ang) * r, z = k.z + Math.sin(ang) * r;
      if ( !atenduKovron(x - k.x, z - k.z, brakoj) ) continue;
      provitaj++;
      rc.set( new THREE.Vector3(x, 0o74, z), new THREE.Vector3(0, -1, 0) );
      const h = rc.intersectObjects( vojMeshoj, true );
      if ( !h.find( x2 => x2.object.visible ) ) mankoj.push( `${(ang * 180 / Math.PI).toFixed(0)}°/${r}` );
    }
  }
  if ( mankoj.length > 0 )
    raporto.push( `ចានភ្ជាប់ ( ${k.x.toFixed(2)}, ${k.z.toFixed(2)} ) ចន្លោះ ${mankoj.length} : ${mankoj.slice(0,10).join(" ")}` );
}
for ( const r of raporto ) console.log( r );
console.log( `ចានភ្ជាប់សរុប ${kunigoj.length} , គំរូ ${provitaj} , មានចន្លោះ ${raporto.length}` );

// ⟪ ការលោតកម្ពស់នៅមាត់ចាន 📏 ⟫
// ⟨ ផ្លូវត្រូវចេញពីចានដោយជំហាន ។ បើលោតលើសមួយជំហាននៅមាត់ចាន ,
// នោះជាជញ្ជាំងឈរ ហើយផ្លូវមើលទៅខ្ពស់ជាងចានដោយគ្មានជណ្តើរ ។ 📃 ⟩
// ⟨ ជំហានគំរូ ៖ ០.៥ ឯកតា ។ ជំហានផ្លូវមានកម្ពស់ ០.៥ , ដូច្នេះគំរូនេះឃើញជញ្ជាំងឈរ ។ 📃 ⟩
const PASHO = 0o1/0o10;
const SALTO_TOLERO = 0o1/0o200;
// ⟨ គំរូត្រូវចៀសពីគែមបំណែក 📏 ⟩ ៖ ជំហានមានកម្ពស់ ០.៥ , ដូច្នេះគំរូត្រង់គែមបំណែក
// ធ្លាក់លើជំហានពីរដង ។ ការចៀស ០.១ ធ្វើឱ្យគំរូនៅក្នុងបំណែកមួយជានិច្ច ។ 📃 ⟩
const DEKALO = 0o1/0o20;
// ⟨ គំរូតាមផ្លូវ ៖ មិនតាមដៃចានទេ 📏 ⟩ ៖ ដៃរបស់ចានអាចជាទិសដែលគ្មានផ្លូវ ។
// ពេលនោះកាំរស្មីឆ្លងទៅលើផ្លូវផ្សេង ហើយវាស់ការលោតក្លែងក្លាយ ។
// ដូច្នេះគំរូដើរតាមបន្ទាត់ផ្លូវពិតដែលចេញពីចាន ។ 📃 ⟩
interface Elirejo { x: number; z: number; ux: number; uz: number }
const elirejoj = new Map<string, Elirejo[]>();
for ( const d of ĉiujDifinoj ) {
  if ( d.pts.length < 2 ) continue;
  for ( const [ ei, ni ] of [ [ 0, 1 ], [ d.pts.length - 1, d.pts.length - 2 ] ] ) {
    const e = d.pts[ ei ], n = d.pts[ ni ];
    if ( !e || !n ) continue;
    const longo = Math.hypot(e[0] - n[0], e[1] - n[1]);
    if ( longo < 0o1/0o100 ) continue;
    let plej: [ number, number ] | null = null, dist = Infinity;
    for ( const k of ĉiujKunigoj ) {
      const dd = Math.hypot(e[0] - k[0], e[1] - k[1]);
      if ( dd < dist ) { dist = dd; plej = k; }
    }
    if ( !plej || dist > VOJA_TRUA_DUONO ) continue;
    const klavo = plej[0] + "," + plej[1];
    const listo = elirejoj.get(klavo) ?? [];
    const ux = ( e[0] - n[0] ) / longo, uz = ( e[1] - n[1] ) / longo;
    if ( !listo.some(b => b.ux * ux + b.uz * uz > 0o1 - 0o1/0o100 ) )
      listo.push({ x: plej[0], z: plej[1], ux, uz });
    elirejoj.set(klavo, listo);
  }
}
let tutaSalto = 0;
let rompoj = 0;
for ( const k of ĉiujKunigajDatumoj ) {
  const elirejo = elirejoj.get(k.x + "," + k.z);
  if ( !elirejo || elirejo.length === 0 ) continue;
  let saltoMaks = 0, lokoMaks = "";
  const sinsekvo: string[] = [];
  for ( const b of elirejo ) {
    sinsekvo.push("|");
    let antaŭa = NaN;
    for ( let r = DEKALO; r <= VOJA_TRUA_DUONO + 0o4; r += PASHO ) {
      rc.set( new THREE.Vector3(k.x + b.ux * r, 0o74, k.z + b.uz * r),
        new THREE.Vector3(0, -1, 0) );
      const h = rc.intersectObjects( vojMeshoj, true ).find( x => x.object.visible );
      if ( !h ) { antaŭa = NaN; sinsekvo.push(`${r.toFixed(1)}:-`); continue; }
      sinsekvo.push(`${r.toFixed(1)}:${h.point.y.toFixed(2)}`);
      if ( Number.isFinite(antaŭa) ) {
        const salto = Math.abs(h.point.y - antaŭa);
        if ( salto > saltoMaks ) {
          saltoMaks = salto;
          lokoMaks = `${( k.x + b.ux * r ).toFixed(1)},${( k.z + b.uz * r ).toFixed(1)}`;
        }
      }
      antaŭa = h.point.y;
    }
  }
  if ( saltoMaks > tutaSalto ) tutaSalto = saltoMaks;
  const rompo = saltoMaks > STUPA_RISERO + SALTO_TOLERO;
  if ( rompo ) {
    rompoj++;
    console.log( `ចានភ្ជាប់ ( ${k.x.toFixed(1)}, ${k.z.toFixed(1)} ) លោតខ្ពស់បំផុត ` +
      `${saltoMaks.toFixed(3)} @${lokoMaks}  ⚠ ជញ្ជាំង` );
    console.log( "  " + sinsekvo.join(" ") );
  }
}
console.log( `ចានភ្ជាប់ដែលលោត ${rompoj} , លោតខ្ពស់បំផុតតាមមាត់ចាន ${tutaSalto.toFixed(3)} , លីមីត ${STUPA_RISERO.toFixed(3)}` +
  ( tutaSalto > STUPA_RISERO + SALTO_TOLERO ? "  ſ̀ȷᴜ̩ ſɭɹ }ʃꞇ" : "" ) );

// ⟪ ការវិភាគបណ្តោះអាសន្ន 📏 ⟫
const baza = kreiBazanVojoAlton(alteco);
for ( const [ gx, gz ] of [ [ 0o70, -0o44 ], [ 0o65, -0o44 ]] ) {
  console.log(`\nដីជុំវិញ ${gx},${gz}`);
  for ( let dz = -3; dz <= 3; dz += 0o1/0o2 ) {
    const vico: string[] = [];
    for ( let dx = -3; dx <= 3; dx += 0o1/0o2 )
      vico.push(alteco(gx + dx, gz + dz).toFixed(2).padStart(6));
    console.log("  " + vico.join(" "));
  }
  const vico2: string[] = [];
  for ( let dx = -3; dx <= 3; dx += 0o1/0o2 ) vico2.push(baza(gx + dx, gz).toFixed(2).padStart(6));
  console.log("  មូលដ្ឋាន x: " + vico2.join(" "));
}
for ( const [ qx, qz ] of [ [ 0o54, -0o44 ], [ 0o70, -0o44 ], [ 0o104, -0o140 ], [ 0o134, -0o74 ], [ 0o65, -0o44 ]] ) {
  const brakoj = kreiBrakojn(kunigoDirektoj.get(qx + "," + qz) ?? [],
    kunigoFermitaj.get(qx + "," + qz), kunigoRotacioj.get(qx + "," + qz) ?? 0,
    kunigoDuonoj.get(qx + "," + qz));
  const plato = kunigaPlataAlto(qx, qz, brakoj, vojoAlteco);
  const deBaza = vojaSuproDeKunigo(qx, qz, brakoj.map(b => [ b.ux, b.uz ] as [ number, number ]),
    VOJA_EKSTERA_DUONO, baza).supro;
  console.log(`\nចាន ${qx},${qz} ដី ${alteco(qx, qz).toFixed(2)} មូលដ្ឋាន ${baza(qx, qz).toFixed(2)} ` +
    `កំពូលដី ${deBaza.toFixed(2)} វាល ${vojoAlteco(qx, qz).toFixed(2)} ` +
    `ចាន ${plato.toFixed(2)} ដៃ ${brakoj.map(b => `${b.ux.toFixed(2)}/${b.uz.toFixed(2)}`).join(" ")}`);
  for ( const [ ox, oz ] of [ [ 1, 0 ], [ -1, 0 ], [ 0, 1 ], [ 0, -1 ]] ) {
    const vico: string[] = [];
    for ( let r = 0; r <= 6; r++ ) {
      const px = qx + ox * r, pz = qz + oz * r;
      vico.push(`${r}:ដី${alteco(px, pz).toFixed(1)}/វាល${vojoAlteco(px, pz).toFixed(1)}`);
    }
    console.log("  " + ( ox ? "x" : "z" ) + ( ox + oz > 0 ? "+" : "-" ) + " " + vico.join(" "));
  }
}

// ⟪ កម្រាស់ចានភ្ជាប់ 📏 ⟫
// ⟨ មុខចំហៀងចាន 📃 ⟩ ៖ ចានលាតចុះដល់ដី ។ បើកំពូលខ្ពស់លើដីច្រើន , មុខចំហៀង
// ខ្ពស់ដូចជញ្ជាំង ។ ចានមានកម្ពស់តាមដៃ , ដូច្នេះវាស់តាមទិសជុំវិញ ,
// មិនមែនកម្ពស់តែមួយទេ ។ 📃 ⟩
const dikoj: number[] = [];
for ( const [ kx, kz ] of ĉiujKunigoj ) {
  const brakoj = kreiBrakojn(kunigoDirektoj.get(kx + "," + kz) ?? [],
    kunigoFermitaj.get(kx + "," + kz), kunigoRotacioj.get(kx + "," + kz) ?? 0,
    kunigoDuonoj.get(kx + "," + kz));
  const nivelo = kunigaPlataNivelo(kx, kz, brakoj, vojoAlteco);
  let dika = 0;
  for ( let i = 0; i < 0o20; i++ ) {
    const angulo = i * Math.PI * 0o2 / 0o20;
    const r = VOJA_TRUA_DUONO;
    const sup = plataAltoCxe(nivelo, angulo);
    const tera = alteco(kx + Math.cos(angulo) * r, kz + Math.sin(angulo) * r);
    dika = Math.max(dika, sup - tera);
  }
  dikoj.push(Math.max(ANGULA_PROVOLIRO, dika + ANGULA_PROVOLIRO));
}
dikoj.sort(( p, q ) => q - p);
console.log(`ចានក្រាស់លើស ${STUPA_RISERO.toFixed(1)} ៖ ${dikoj.filter(v => v > STUPA_RISERO).length}` +
  ` / ${dikoj.length} , ខ្ពស់បំផុត ${dikoj[0].toFixed(2)} , មធ្យម ` +
  `${( dikoj.reduce(( p, q ) => p + q, 0 ) / dikoj.length ).toFixed(2)} , ខ្ពស់ ១០ ` +
  dikoj.slice(0, 0o12).map(v => v.toFixed(1)).join(" ") );

// ⟪ ជញ្ជាំងចំហៀងផ្លូវ 📏 ⟫
// ⟨ ផ្លូវអណ្តែត ៖ ជញ្ជាំងចំហៀងខ្ពស់ ។ បើផ្ទៃផ្លូវខ្ពស់ជាងដីច្រើន ,
// អ្នកឃើញមុខឈរត្រង់វែងជំនួសជណ្តើរ ។ វាស់កម្ពស់នោះតាមខ្សែកណ្តាលផ្លូវ ។ 📃 ⟩
const FLOSA_LIMO = 0o1/0o2;
const FLOSA_VIDEBA = 0o1 + 0o1/0o2;
let flosantaj = 0, videblaj = 0, flosoMaks = 0, flosoLoko = "";
const plejFlosantaj: { f: number; x: number; z: number; d: number }[] = [];
for ( const d of ĉiujDifinoj ) {
  if ( d.pts.length < 2 ) continue;
  for ( let i = 0; i < d.pts.length - 1; i++ ) {
    const a = d.pts[ i ], b = d.pts[ i + 1 ];
    const longo = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const paŝoj = Math.max(1, Math.ceil(longo));
    for ( let j = 0; j <= paŝoj; j++ ) {
      const t = j / paŝoj;
      const x = a[0] + ( b[0] - a[0] ) * t, z = a[1] + ( b[1] - a[1] ) * t;
      rc.set( new THREE.Vector3(x, 0o120, z), new THREE.Vector3(0, -1, 0) );
      const h = rc.intersectObjects( vojMeshoj, true ).find( x2 => x2.object.visible );
      if ( !h ) continue;
      const floso = h.point.y - alteco(x, z);
      if ( floso > flosoMaks ) { flosoMaks = floso; flosoLoko = `${x.toFixed(1)},${z.toFixed(1)}`; }
      if ( floso > FLOSA_LIMO ) flosantaj++;
      if ( floso > FLOSA_VIDEBA ) {
        videblaj++;
        let dKunigo = Infinity;
        for ( const k of ĉiujKunigoj ) dKunigo = Math.min(dKunigo, Math.hypot(k[0] - x, k[1] - z));
        plejFlosantaj.push({ f: floso, x, z, d: dKunigo });
      }
    }
  }
}
plejFlosantaj.sort(( p, q ) => q.f - p.f );
console.log( `ជញ្ជាំងចំហៀង > ${FLOSA_LIMO} ៖ ${flosantaj} គំរូ , > ${FLOSA_VIDEBA} ៖ ${videblaj}` +
  ` , ខ្ពស់បំផុត ${flosoMaks.toFixed(2)} @${flosoLoko}` +
  ( flosoMaks > FLOSA_VIDEBA ? "  ſ̀ȷᴜ̩" : "" ) );
for ( const f of plejFlosantaj.slice(0, 0o10 ) )
  console.log( `  ជញ្ជាំង ${f.f.toFixed(2)} @${f.x.toFixed(1)},${f.z.toFixed(1)}` +
    ` ចានជិត ${f.d.toFixed(1)}` );

// ⟪ ការលោតក្នុងកម្រិតផ្លូវ 📏 ⟫
// ⟨ កម្រិតផ្លូវត្រូវឡើងចុះមួយជំហានក្នុងមួយជំហាន ។ បើគំរូជាប់គ្នាខុសគ្នាច្រើនជាងមួយជំហាន ,
// ផ្ទៃផ្លូវលោតជាជញ្ជាំង ទោះជាមាត់ចានល្អក៏ដោយ ។ ដូច្នេះវាស់កម្រិតផ្លូវដោយផ្ទាល់ ។ 📃 ⟩
// ⟨ ផ្លូវស្ពានត្រូវរំលង 📃 ⟩ ៖ ស្ពានមានកម្រិតផ្ទាល់ខ្លួន ( `heightFn` ) , មិនមែនកម្រិត
// ជំហានទេ ។ ការវាស់វាដោយកម្រិតជំហានរាយការលោតក្លែងក្លាយ ។ 📃 ⟩
const ankrojNivelaj = ĉiujKunigoj.map(([ x, z ]) => {
  const brakoj = kreiBrakojn(kunigoDirektoj.get(x + "," + z) ?? [], kunigoFermitaj.get(x + "," + z),
    kunigoRotacioj.get(x + "," + z) ?? 0, kunigoDuonoj.get(x + "," + z));
  return { x, z, alto: kunigaPlataAlto(x, z, brakoj, vojoAlteco),
    nivelo: kunigaPlataNivelo(x, z, brakoj, vojoAlteco) };
});
const nivelaj: { difino: { pts: [ number, number ][]; w: number }; profilo: any }[] = [];
for ( const d of ĉiujDifinoj as { pts: [ number, number ][]; w: number;
  heightFn?: unknown; glata?: boolean }[] ) {
  if ( d.pts.length < 2 || d.heightFn || d.glata ) continue;
  nivelaj.push( { difino: d, profilo: kreiNivelanProfilon(d.pts, vojaLarghoDuono( 0o2 * d.w ),
    vojoAlteco, akvaFino, ankrojNivelaj) } );
}
let nivelajRompoj = 0;
for ( const { difino, profilo } of nivelaj ) {
  let maks = 0, loko = 0, antaŭa = NaN;
  for ( let i = 0; i < profilo.altoj.length; i++ ) {
    const a = profilo.altoj[ i ];
    if ( Number.isFinite(antaŭa) && Math.abs(a - antaŭa) > maks ) {
      maks = Math.abs(a - antaŭa);
      loko = profilo.situoj[ i ];
    }
    antaŭa = a;
  }
  if ( maks > STUPA_RISERO + SALTO_TOLERO ) {
    nivelajRompoj++;
    const p = punktoCxe(difino.pts, loko);
    console.log(`កម្រិតផ្លូវលោត ${maks.toFixed(3)} @${p.x.toFixed(1)},${p.z.toFixed(1)}` +
      ` s=${loko.toFixed(1)} / ${profilo.longo.toFixed(1)} ⚠`);
  }
}
console.log(`កម្រិតផ្លូវដែលលោត ${nivelajRompoj} / ${nivelaj.length}` +
  ( nivelajRompoj > 0 ? "  ſ̀ȷᴜ̩ ſɭɹ }ʃꞇ" : "" ));

// ⟪ ស៊ើបអង្កេតបណ្តោះអាសន្ន 🔬 ⟫
if ( process.env.KK_SONDO ) {
  const celoj = [ [ -0o34, -0o140 ], [ 0o104, -0o44 ] ];
  console.log(`\nចានដែលមានដៃច្រើន`);
  for ( let i = 0; i < ĉiujKunigoj.length; i++ ) {
    const [ kx, kz ] = ĉiujKunigoj[ i ];
    const brakoj = kreiBrakojn(kunigoDirektoj.get(kx + "," + kz) ?? [],
      kunigoFermitaj.get(kx + "," + kz), kunigoRotacioj.get(kx + "," + kz) ?? 0,
      kunigoDuonoj.get(kx + "," + kz));
    if ( brakoj.length < 3 ) continue;
    console.log(`  (${kx.toFixed(1)},${kz.toFixed(1)}) ដៃ ${brakoj.length} alto=${ankrojNivelaj[ i ].alto.toFixed(2)}` +
      ` ដី=${alteco(kx, kz).toFixed(2)}` +
      ` ទិស ${brakoj.map(b => `${b.ux.toFixed(2)}/${b.uz.toFixed(2)}`).join(" ")}`);
  }
  for ( const [ tx, tz ] of celoj ) {
    console.log(`\nស៊ើបអង្កេត ${tx},${tz}`);
    for ( const a of ankrojNivelaj ) {
      const d = Math.hypot(a.x - tx, a.z - tz);
      if ( d > 0o24 ) continue;
      console.log(`    ចាន (${a.x.toFixed(1)},${a.z.toFixed(1)}) alto=${a.alto.toFixed(2)} d=${d.toFixed(2)}`);
    }
    for ( const { difino, profilo } of nivelaj ) {
      let plej = -1, dist = Infinity;
      for ( let i = 0; i < profilo.situoj.length; i++ ) {
        const p = punktoCxe(difino.pts, profilo.situoj[ i ]);
        const d = Math.hypot(p.x - tx, p.z - tz);
        if ( d < dist ) { dist = d; plej = i; }
      }
      if ( plej < 0 || dist > 1.2 ) continue;
      const p = punktoCxe(difino.pts, profilo.situoj[ plej ]);
      console.log(`  ផ្លូវ ${difino.pts.length} ចំណុច w=${difino.w} ជិត ${dist.toFixed(2)} i=${plej}` +
        ` s=${profilo.situoj[ plej ].toFixed(2)}/${profilo.longo.toFixed(1)}` +
        ` ចុង ${JSON.stringify(difino.pts[ 0 ])}→${JSON.stringify(difino.pts[ difino.pts.length - 1 ])}`);
      for ( let k = Math.max(0, plej - 0o10); k <= Math.min(profilo.altoj.length - 1, plej + 0o10); k++ ) {
        const q = punktoCxe(difino.pts, profilo.situoj[ k ]);
        let suba = -Infinity, supra = Infinity;
        for ( const a of ankrojNivelaj ) {
          const d = Math.hypot(q.x - a.x, q.z - a.z);
          const deRando = 0o1 * Math.max(0, d - VOJA_TRUA_DUONO);
          if ( a.alto - deRando > suba ) suba = a.alto - deRando;
          if ( a.alto + deRando < supra ) supra = a.alto + deRando;
        }
        console.log(`    i=${k} s=${profilo.situoj[ k ].toFixed(2)} (${q.x.toFixed(1)},${q.z.toFixed(1)})` +
          ` celo=${profilo.celoj[ k ].toFixed(3)} alto=${profilo.altoj[ k ].toFixed(3)}` +
          ` វាល=${vojoAlteco(q.x, q.z).toFixed(3)} ដី=${alteco(q.x, q.z).toFixed(3)}` +
          ` centra=${profilo.centraj[ k ].toFixed(3)} glata=${profilo.glataj[ k ].toFixed(3)}` +
          ` suba=${suba.toFixed(2)} supra=${supra.toFixed(2)}`);
      }
    }
  }
}

// ⟪ គម្រោងកម្រិតនៅមាត់ចាន 📏 ⟫
// ⟨ មាត់ចានលោតព្រោះគម្រោង ( celoj ) នៅមាត់ខ្ពស់ជាងចាន ។ ការកាត់ចុះមិនអាចទាបជាង
// គម្រោងបានទេ , ដូច្នេះកម្រិតគម្រោងជាដែនកំណត់ពិត ។ វាស់វាត្រង់មាត់ ។ 📃 ⟩
const platoj = new Map<string, ReturnType<typeof kunigaPlataNivelo>>();
for ( const [ kx, kz ] of ĉiujKunigoj )
  platoj.set(kx + "," + kz, kunigaPlataNivelo(kx, kz,
    kreiBrakojn(kunigoDirektoj.get(kx + "," + kz) ?? [], kunigoFermitaj.get(kx + "," + kz),
      kunigoRotacioj.get(kx + "," + kz) ?? 0, kunigoDuonoj.get(kx + "," + kz)), vojoAlteco));
let celajRompoj = 0, celajMaks = 0, celajLoko = "";
const celajVicoj: string[] = [];
for ( const { difino, profilo } of nivelaj ) {
  let maks = -Infinity, klavoMaks = "";
  for ( let i = 0; i < profilo.altoj.length; i++ ) {
    const p = punktoCxe(difino.pts, profilo.situoj[ i ]);
    for ( const [ kx, kz ] of ĉiujKunigoj ) {
      const d = Math.hypot(p.x - kx, p.z - kz);
      if ( d < VOJA_TRUA_DUONO - 0.05 || d > VOJA_TRUA_DUONO + 0.6 ) continue;
      const nivelo = platoj.get(kx + "," + kz);
      const plato = nivelo
        ? plataAltoCxe(nivelo, Math.atan2(p.z - kz, p.x - kx))
        : 0;
      const dif = profilo.celoj[ i ] - plato;
      if ( dif > maks ) { maks = dif; klavoMaks = `${kx},${kz}`; }
    }
  }
  if ( maks > STUPA_RISERO + SALTO_TOLERO ) {
    celajRompoj++;
    if ( maks > celajMaks ) { celajMaks = maks; celajLoko = klavoMaks; }
    if ( celajVicoj.length < 0o10 )
      celajVicoj.push(`គម្រោងលើស ${maks.toFixed(2)} ចាន ${klavoMaks}`);
  }
}
for ( const v of celajVicoj ) console.log("  " + v);
console.log(`គម្រោងខ្ពស់ជាងចាននៅមាត់ ${celajRompoj} / ${nivelaj.length} , ខ្ពស់បំផុត ` +
  `${celajMaks.toFixed(2)} @${celajLoko}` + ( celajRompoj > 0 ? "  ſ̀ȷᴜ̩ ſɭɹ }ʃꞇ" : "" ));
