// ≺⧼ រកចំណុច ៖ ចានភ្ជាប់គ្របដណ្តប់ទៅផ្លូវនៅរង្វើម ។ 📃 ⟩
import * as THREE from "three";
import { aktivajVojoj, aktivajDokoj, aktivajUrboj } from "../../kantaoj/tero-datumaro/rultempo.js";
import { alteco, akvaNivelo, skulptitaAkvo } from "../../kantaoj/mondo/tereno.js";
import { troviVojaRetajnKunigojn } from "../../eskekoj/medio/voj-reto.js";
import { vojaSuproDeKunigo } from "../../eskekoj/medio/vojoj/formoj.js";
import { konstruiVojojn } from "../../eskekoj/medio/vojoj.js";
import { konstruiIntersekcajnPlatojn } from "../../eskekoj/medio/vojoj/platoj.js";
import { kreiBrakojn } from "../../eskekoj/medio/vojoj/platoj.js";
import { kreiVojoAlton } from "../../eskekoj/medio/vojoj/alto.js";
import { VOJA_EKSTERA_DUONO, VOJA_SUPRO_LEVIGXO, KORNA_R, VOJA_BORDA_LARĜO,
  STUPA_RISERO, surGrid, VOJA_TRUA_DUONO } from "../../eskekoj/medio/vojoj/mezuroj.js";
import { PONT_AKVA_KLARANCO } from "../../eskekoj/medio/doko/ponto.js";
import { kreiStuparajnPunktojn, kreiStuparanAlton } from "../../eskekoj/medio/doko/stuparo.js";
import { konstruiPontanProfilon, havasAkvanTrunkon, kreiPontanAkvanTeston } from "../../kantaoj/mondo/urbo/ponto-profilo.js";
import { konstruiDokon } from "../../eskekoj/medio/doko.js";
import { konstruiKradanUrbon } from "../../kantaoj/mondo/urbo/krada-urbo.js";
import { gluiVojaFinon } from "../../kantaoj/mondo/urbo/gluado.js";
import { kreiDioritanMaterialon, kreiAndezitanMaterialon, kreiOranMaterialon } from "../../eskekoj/komunajxoj/materialoj.js";

const VOJOJ = aktivajVojoj();
const DOKOJ = aktivajDokoj();
const URBOJ = aktivajUrboj();
// ⟨ ចំណុចបិទជ្រុង ៖ បញ្ចូលពីទីក្រុងក្រឡា និងពីផ្លូវដៃ ។ 📃 ⟩
const kunigoFermitaj = new Map<string, [ number, number ]>();

function vojaSupro(x: number, z: number, larĝo: number): number {
  const duon = larĝo / 4 + VOJA_BORDA_LARĜO;
  let maks = vojoAlteco(x, z);
  for ( let i = 0; i < 0o10; i++ ) {
    const ang = i * Math.PI / 4;
    maks = Math.max(maks, vojoAlteco(x + Math.cos(ang) * duon, z + Math.sin(ang) * duon));
  }
  return maks + VOJA_SUPRO_LEVIGXO;
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
interface VojaRetoVojo { punktoj: [ number, number ][]; larĝo: number }
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
const kunigoDirektoj = new Map( kunigoj.map( k => [ k.x + "," + k.z, k.direktaj ] ) );
for ( const k of kunigoj ) kunigoFermitaj.set( k.x + "," + k.z, k.fermitaj );

// ⟪ វាលកម្ពស់តែមួយ 📏 ⟫
// ⟨ ផ្លូវ និងចានភ្ជាប់ត្រូវអានវាលតែមួយ ។ បើផ្លូវអានដីឆៅ ,
// ផ្លូវនីមួយៗមានកម្រិតផ្ទាល់ខ្លួន ហើយមាត់ចានលោត ។ វាស់ដូចហ្គេម ។ 📃 ⟩
const vojoAlteco = kreiVojoAlton(alteco, [ ...kradajKunigoj.map(([ x, z ]) =>
  ( { x, z, direktaj: [] as [ number, number ][] } )), ...kunigoj ]);
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
for ( const D of DOKOJ ) {
  const doko = konstruiDokon( sceno, D.x, D.z, D.rotacio ?? 0, alteco, akvaNivelo, D.profundo );
  if ( doko.stuparajPunktoj.length < 2 ) continue;
  const rotacio = D.rotacio ?? 0;
  const landaX = D.x + Math.sin( rotacio ) * ( D.profundo / 2 );
  const landaZ = D.z + Math.cos( rotacio ) * ( D.profundo / 2 );
  const starto = surGrid( pontaFinAlto( landaX, landaZ, doko.platformWidth ) );
  const falto = starto - doko.landejaY;
  if ( falto <= STUPA_RISERO * 0o1/0o2 ) continue;
  const nombro = Math.max( 1, Math.round( falto / STUPA_RISERO ) );
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
    heightFn: kreiStuparanAlton( punktoj, starto - STUPA_RISERO - VOJA_SUPRO_LEVIGXO ),
    grundoFn: alteco } );
}
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
    direktaj: [] as [ number, number ][],
    fermitaj: kunigoFermitaj.get(x + "," + z), rotacio: 0 } )) ];
const ĉiujKunigoj = [ ...kradajKunigoj, ...kunigoPunktoj ];
// ⟨ បន្ទះផ្លូវ និងចានតែប៉ុណ្ណោះ 📏 ⟩ ៖ អគារក្រឡានៅក្នុងឆាកដែរ ។ កាំរស្មីដែលប៉ះអគារ
// រាយការលោតកម្ពស់ក្លែងក្លាយ ។ ដូច្នេះវាស់តែលើផ្ទៃផ្លូវ ។ 📃 ⟩
const antaŭajInfanoj = new Set<THREE.Object3D>(sceno.children);
konstruiVojojn( sceno, [ ...kradajDifinoj, ...vojDifinoj ], vojoAlteco, dioritaMaterialo, andezitaMaterialo, ĉiujKunigoj,
  { akvaFn: akvaFino } );
konstruiIntersekcajnPlatojn( sceno, ĉiujKunigoj, vojoAlteco, dioritaMaterialo, andezitaMaterialo,
  kunigoFermitaj, kunigoRotacioj, kunigoDirektoj );
const vojMeshoj = sceno.children.filter(o => !antaŭajInfanoj.has(o));
sceno.updateMatrixWorld(true);

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
      rc.set( new THREE.Vector3(x, 60, z), new THREE.Vector3(0, -1, 0) );
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
const PASHO = 0o1/0o2;
const SALTO_TOLERO = 0o1/0o200;
// ⟨ គំរូត្រូវចៀសពីគែមបំណែក 📏 ⟩ ៖ ជំហានមានកម្ពស់ ០.៥ , ដូច្នេះគំរូត្រង់គែមបំណែក
// ធ្លាក់លើជំហានពីរដង ។ ការចៀស ០.១ ធ្វើឱ្យគំរូនៅក្នុងបំណែកមួយជានិច្ច ។ 📃 ⟩
const DEKALO = 0o1/0o10;
let tutaSalto = 0;
let rompoj = 0;
for ( const k of ĉiujKunigajDatumoj ) {
  const brakoj = kreiBrakojn(k.direktaj, k.fermitaj, k.rotacio);
  let saltoMaks = 0, lokoMaks = "";
  const sinsekvo: string[] = [];
  for ( const b of brakoj ) {
    sinsekvo.push("|");
    let antaŭa = NaN;
    for ( let r = DEKALO; r <= VOJA_TRUA_DUONO + 0o4; r += PASHO ) {
      rc.set( new THREE.Vector3(k.x + b.ux * r, 60, k.z + b.uz * r),
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
