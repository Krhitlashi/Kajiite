// ≺⧼ រកចំណុច ៖ ចានភ្ជាប់គ្របដណ្តប់ទៅផ្លូវនៅរង្វើម ។ 📃 ⟩
import * as THREE from "three";
import { aktivajVojoj, aktivajDokoj, aktivajUrboj } from "../../kantaoj/tero-datumaro/rultempo.js";
import { alteco, akvaNivelo, skulptitaAkvo } from "../../kantaoj/mondo/tereno.js";
import { troviVojaRetajnKunigojn } from "../../eskekoj/medio/voj-reto.js";
import { vojaSuproDeKunigo } from "../../eskekoj/medio/vojoj/formoj.js";
import { konstruiVojojn } from "../../eskekoj/medio/vojoj.js";
import { konstruiIntersekcajnPlatojn } from "../../eskekoj/medio/vojoj/platoj.js";
import { VOJA_EKSTERA_DUONO, VOJA_SUPRO_LEVIGXO, KORNA_R, VOJA_BORDA_LARĜO,
  STUPA_RISERO, surGrid } from "../../eskekoj/medio/vojoj/mezuroj.js";
import { PONT_AKVA_KLARANCO } from "../../eskekoj/medio/doko/ponto.js";
import { kreiStuparajnPunktojn, kreiStuparanAlton } from "../../eskekoj/medio/doko/stuparo.js";
import { konstruiPontanProfilon, havasAkvanTrunkon, kreiPontanAkvanTeston } from "../../kantaoj/mondo/urbo/ponto-profilo.js";
import { konstruiDokon } from "../../eskekoj/medio/doko.js";
import { konstruiKradanUrbon } from "../../kantaoj/mondo/urbo/krada-urbo.js";
import { kreiDioritanMaterialon, kreiAndezitanMaterialon, kreiOranMaterialon } from "../../eskekoj/komunajxoj/materialoj.js";

const VOJOJ = aktivajVojoj();
const DOKOJ = aktivajDokoj();
const URBOJ = aktivajUrboj();
const retaj = VOJOJ.filter(v => v.punktoj.length >= 2).map(v => ({ punktoj: v.punktoj, larĝo: v.larĝo }));
const kunigoj = troviVojaRetajnKunigojn(retaj, DOKOJ);
const kunigoPunktoj = kunigoj.map(k => [ k.x, k.z ] as [ number, number ]);
const kunigoRotacioj = new Map(kunigoj.map(k => [ k.x + "," + k.z, k.rotacio ]));
const kunigoDirektoj = new Map(kunigoj.map(k => [ k.x + "," + k.z, k.direktaj ]));
const kunigoFermitaj = new Map(kunigoj.map(k => [ k.x + "," + k.z, k.fermitaj ]));

function vojaSupro(x: number, z: number, larĝo: number): number {
  const duon = larĝo / 4 + VOJA_BORDA_LARĜO;
  let maks = alteco(x, z);
  for ( let i = 0; i < 0o10; i++ ) {
    const ang = i * Math.PI / 4;
    maks = Math.max(maks, alteco(x + Math.cos(ang) * duon, z + Math.sin(ang) * duon));
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
    return vojaSuproDeKunigo(plejProksima.x, plejProksima.z, plejProksima.direktaj, VOJA_EKSTERA_DUONO, alteco).supro;
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
for ( const u of URBOJ ) {
  const urbo = konstruiKradanUrbon( sceno,
    { arangxaGrando: u.arangxaGrando, blokaGrando: u.blokaGrando, keuxfhxeso: false, lampoj: false },
    [ u.ofsX, u.ofsZ ], oraMaterialo, u.aldonajBlokoj ?? [] );
  kradajDifinoj.push( ...urbo.vojDifinoj );
  kradajKunigoj.push( ...urbo.kunigajPunktoj );
}
const vojDifinoj: any[] = [];
for ( const vojo of VOJOJ ) {
  if ( vojo.punktoj.length < 2 ) continue;
  const pontoLarĝo = vojo.pontoLarĝo ?? vojo.larĝo;
  const trunko = havasAkvanTrunkon( vojo.punktoj, kreiPontanAkvanTeston( vojo.punktoj, pontoLarĝo, cxuVeraAkvo ) );
  let heightFn: ( ( x: number, z: number ) => number ) | undefined;
  let glata = false;
  if ( trunko ) {
    const cxuPontaAkvo = kreiPontanAkvanTeston( vojo.punktoj, pontoLarĝo, cxuVeraAkvo );
    const akvaSupro = ( x: number, z: number ): number => {
      if ( !cxuPontaAkvo(x, z) ) return -Infinity;
      return akvaNivelo(x, z) + PONT_AKVA_KLARANCO;
    };
    const profilo = konstruiPontanProfilon( vojo.punktoj, pontoLarĝo, vojaSupro, akvaSupro, pontaFinAlto );
    heightFn = ( x, z ) => profilo.alto(x, z) - VOJA_SUPRO_LEVIGXO;
    glata = true;
  }
  vojDifinoj.push( { pts: vojo.punktoj, w: vojo.larĝo / 2, kapoj: true, heightFn, glata } );
}
// ⟨ ជណ្តើរចឆណត ៖ បង្កើតករ្រង់ទន្លេ ដឹងកម្ពស់ចានភ្ជាប់ ។ 📃 ⟩
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
  const punktoj = kreiStuparajnPunktojn( doko.stuparajPunktoj[0], doko.stuparajPunktoj[1], nombro );
  vojDifinoj.push( { pts: punktoj, w: doko.platformWidth, stuparo: true,
    heightFn: kreiStuparanAlton( punktoj, starto - STUPA_RISERO - VOJA_SUPRO_LEVIGXO ),
    grundoFn: alteco } );
}
const ĉiujKunigoj = [ ...kradajKunigoj, ...kunigoPunktoj ];
konstruiVojojn( sceno, [ ...kradajDifinoj, ...vojDifinoj ], alteco, dioritaMaterialo, andezitaMaterialo, ĉiujKunigoj,
  { akvaFn: akvaFino } );
konstruiIntersekcajnPlatojn( sceno, ĉiujKunigoj, alteco, dioritaMaterialo, andezitaMaterialo,
  kunigoFermitaj, kunigoRotacioj, kunigoDirektoj );

// ⟨ ស្ក្សាប់ ៖ រកចន្លោះនៃចានភ្ជាប់ក្រោមផ្លូវ ។ 📃 ⟩
const rc = new THREE.Raycaster();
const raporto: string[] = [];
for ( const k of kunigoj ) {
  const mankoj: string[] = [];
  for ( let a = 0; a < 0o20; a++ ) {
    const ang = a * Math.PI * 2 / 0o20;
    for ( const r of [ 0.5, 1.0, 1.5, 1.9 ] ) {
      rc.set( new THREE.Vector3( k.x + Math.cos(ang) * r, 60, k.z + Math.sin(ang) * r ),
        new THREE.Vector3(0, -1, 0) );
      const h = rc.intersectObjects( sceno.children, true );
      if ( !h.find( x => x.object.visible ) ) mankoj.push( `${(ang * 180 / Math.PI).toFixed(0)}°/${r}` );
    }
  }
  if ( mankoj.length > 0 )
    raporto.push( `ចានភ្ជាប់ ( ${k.x.toFixed(2)}, ${k.z.toFixed(2)} ) ចន្លោះ ${mankoj.length} : ${mankoj.slice(0,10).join(" ")}` );
}
for ( const r of raporto ) console.log( r );
console.log( `ចានភ្ជាប់សរុប ${kunigoj.length} , មានចន្លោះ ${raporto.length}` );
