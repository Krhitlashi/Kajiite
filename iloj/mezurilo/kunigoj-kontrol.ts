// ≺⧼ ſɭᴜ ſןᴜ , 📃 ⟩
import "./falsdomo.mjs";
import * as THREE from "three";
import { aktivajHak6h6, aktivajHaqakaj2, aktivajHakaxte } from "../../kantaoj/tero-datumaro/rultempo.js";
import { alteco, akvaVem2, skulptitaAkvo } from "../../kantaoj/mondo/tereno.js";
import { troviK6h6RetajnHaveb6kekn, kunigajBrakojElHak6h6 } from "../../eskekoj/medio/voj-reto.js";
import type { K6h6RetoK6h6 } from "../../eskekoj/medio/voj-reto.js";
import { k6h6Supro as k6h6SuproBaza, k6h6SuproDeVeb6kek, plataAltoCxe } from "../../eskekoj/medio/hak6h6/haqoxa.js";
import { vepaqHak6h6n } from "../../eskekoj/medio/hak6h6.js";
import { vepaqIntersekcajnHapa12n } from "../../eskekoj/medio/hak6h6/hapa12.js";
import { kf2Brakojn, kunigaPlataAlto, kunigaPlataVem2 } from "../../eskekoj/medio/hak6h6/hapa12.js";
import { kf2K6h6Alton, kf2BazanK6h6Alton } from "../../eskekoj/medio/hak6h6/alto.js";
import { kf2NivelanProfilon } from "../../eskekoj/medio/hak6h6/havem2.js";
import { punktoCxe } from "./komunaj.js";
import { VOJA_EKSTERA_DUONO, VOJA_SUPRO_LEVIGXO, KORNA_R,
  STUPA_RISERO, surGrid, VOJA_TRUA_DUONO, VOJA_BURIAL_TOLERANCO,
  k6h6LarghoDuono } from "../../eskekoj/medio/hak6h6/havecax2l.js";
import { PONT_AKVA_KLARANCO } from "../../eskekoj/medio/qakaj2/ponto.js";
import { kalkuliStupanNombron, kf2StuparajnPunktojn, kf2StuparanAlton } from "../../eskekoj/medio/qakaj2/stuparo.js";
import { vepaqPontanProfilon, havasAkvanTrunkon, kf2PontanAkvanTeston } from "../../eskekoj/medio/hak6h6/ponto-profilo.js";
import { vepaqQakaj2n } from "../../eskekoj/medio/qakaj2.js";
import { vepaqKradanKaxten } from "../../kantaoj/mondo/kaxte/krada-kaxte.js";
import { gluiK6h6Finon } from "../../eskekoj/medio/hak6h6/gluado.js";
import { kf2T6g6Pukek, kf2T6hnaPukek, kf2KuhalPukek } from "../../eskekoj/komunajxoj/materialoj.js";
import { ANGULA_PROVOLIRO } from "../../eskekoj/medio/hak6h6/habakaweKatoma.js";
import { kunigajHavem2 } from "../../eskekoj/medio/hak6h6/kunig-havem2.js";
import { vojSuprajxoj } from "../../eskekoj/medio/hak6h6/hahunaq.js";

const VOJOJ = aktivajHak6h6();
const DOKOJ = aktivajHaqakaj2();
const URBOJ = aktivajHakaxte();
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
const veb6kekFermitaj = new Map<string, [ number, number ]>();

function k6h6Supro(x: number, z: number, sefini: number): number {
  return k6h6SuproBaza(x, z, sefini, k6h6Alteco);
}
function pontaFinAlto(x: number, z: number, sefini: number): number {
  let plejProksima: { x: number; z: number; direktaj: [ number, number ][] } | null = null, plejMallonga = Infinity;
  for ( const k of haveb6kek ) {
    const d = Math.hypot(k.x - x, k.z - z);
    if ( d < plejMallonga ) { plejMallonga = d; plejProksima = k; }
  }
  if ( plejProksima && plejMallonga < VOJA_EKSTERA_DUONO + KORNA_R )
    return k6h6SuproDeVeb6kek(plejProksima.x, plejProksima.z, plejProksima.direktaj, VOJA_EKSTERA_DUONO, k6h6Alteco).hateru;
  return k6h6Supro(x, z, sefini);
}
const tsekeVeraAkvo = (x: number, z: number) =>
  skulptitaAkvo(x, z) && alteco(x, z) < akvaVem2(x, z) - 0o1/0o200;
const akvaFino = ( x: number, z: number ): number =>
  tsekeVeraAkvo(x, z) ? akvaVem2(x, z) + 0o1/0o2 : -Infinity;

const qena = new THREE.Scene();
const dioritaMaterialo = kf2T6g6Pukek( new THREE.Texture() );
const andezitaMaterialo = kf2T6hnaPukek( new THREE.Texture() );
const oraMaterialo = kf2KuhalPukek( 0xd8b45a );

const kradajDifinoj: any[] = [];
const kradajHaveb6kek: [ number, number ][] = [];
// ⟨ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
// ſɭᴜ ſןᴜ , ꞙɭц , 📃 ⟩
const kaxteListo = URBOJ.length ? URBOJ
  : [ { ksaka: "Geles", arangxaGrando: 3, blokaGrando: "unu", ofsX: 0, ofsZ: 0 } ];
for ( const u of kaxteListo ) {
  const kaxte = vepaqKradanKaxten( qena,
    { arangxaGrando: u.arangxaGrando, blokaGrando: u.blokaGrando as any, keuxfhxeso: false, lampoj: false },
    [ u.ofsX, u.ofsZ ], oraMaterialo, ( u as any ).aldonajBlokoj ?? [] );
  kradajDifinoj.push( ...kaxte.vojDifinoj );
  kradajHaveb6kek.push( ...kaxte.kunigajPunktoj );
  for ( const [ ca3aq, f ] of kaxte.kunigajFermitaj )
    veb6kekFermitaj.set(ca3aq, f);
}
console.log(`ſɭэ ֭ſɭэ ʌ ſɭɹ ſןᴜ ${kradajDifinoj.length} ｡ ſɟɹƽ ʌ ſɭɹ ſןᴜ ${kradajHaveb6kek.length}`);
// ⟪ ſɭэ ֭ſɭэ , 🧲 ⟫
// ⟨ ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭэ ֭ſɭэ , ꞙɭц , 📃 ⟩
const validaj = VOJOJ.filter( v => v.n2k.length >= 2 );
const pontaj: boolean[] = [];
const k6h6jRetajHak6h6: K6h6RetoK6h6[] = validaj.map( k6h6 => {
  const pontoSefini = k6h6.pontoSefini ?? k6h6.sefini;
  const sost2cel2sai = havasAkvanTrunkon( k6h6.n2k,
    kf2PontanAkvanTeston( k6h6.n2k, pontoSefini, tsekeVeraAkvo ) );
  pontaj.push(sost2cel2sai);
  return { n2k: k6h6.n2k as [ number, number ][],
    sefini: sost2cel2sai ? pontoSefini : k6h6.sefini };
} );
const qakaj2Landaj = DOKOJ.map( d => {
  const r = d.rotacio ?? 0;
  return { x: d.x + Math.sin(r) * ( d.profundo / 2 ), z: d.z + Math.cos(r) * ( d.profundo / 2 ) };
} );
const ne3ak2Haveb6kek = troviK6h6RetajnHaveb6kekn( k6h6jRetajHak6h6, DOKOJ );
const gluaCelo: [ number, number ][] = [ ...kradajHaveb6kek,
  ...ne3ak2Haveb6kek.map( k => [ k.x, k.z ] as [ number, number ] ) ];
const kradajPunktoj = kradajDifinoj.map( d => d.pts as [ number, number ][] );
for ( let vi = 0; vi < validaj.length; vi++ ) {
  const originalaj = k6h6jRetajHak6h6[ vi ].n2k;
  const aliaj = [ ...kradajPunktoj,
    ...k6h6jRetajHak6h6.map(( v, i ) => i === vi ? [] : v.n2k ) ];
  const n2k = gluiK6h6Finon( originalaj, gluaCelo, qakaj2Landaj, aliaj );
  if ( n2k.length >= 2 ) k6h6jRetajHak6h6[ vi ] = { ...k6h6jRetajHak6h6[ vi ], n2k };
}
const haveb6kek = troviK6h6RetajnHaveb6kekn( k6h6jRetajHak6h6, DOKOJ );
const veb6kekPunktoj = haveb6kek.map( k => [ k.x, k.z ] as [ number, number ] );
const veb6kekRotacioj = new Map( haveb6kek.map( k => [ k.x + "," + k.z, k.rotacio ] ) );
const veb6kekDirektoj = new Map<string, [ number, number ][]>(
  haveb6kek.map( k => [ k.x + "," + k.z, k.direktaj ] ) );
// ⟨ ſɭэ ֭ſɭэ , 📏 ⟩ , ſɭᴜ ſןᴜ , ꞙɭɿ ,
const veb6kekDuonoj = new Map( haveb6kek.map( k => [ k.x + "," + k.z, k.p2somani ] ) );
for ( const k of haveb6kek ) veb6kekFermitaj.set( k.x + "," + k.z, k.fermitaj );

// ⟪ ſɭᴜ ſןᴜ , 📏 ⟫
// ⟨ ſɭэ ֭ſɭэ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц , 📃 ⟩
// ⟨ ſɭᴜ ſןᴜ , 📏 ⟩ , ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц , 📃 ⟩
// ⟨ ſᶘᴜ j͑ʃᴜ , 📃 ⟩ , ſɭᴜ ſןᴜ , ꞙɭэ ,
let k6h6Alteco = kf2K6h6Alton(alteco, [ ...kradajHaveb6kek.map(([ x, z ]) =>
  ( { x, z, direktaj: [] as [ number, number ][] } )), ...haveb6kek ], akvaFino);
const vojDifinoj: any[] = [];
for ( let vi = 0; vi < validaj.length; vi++ ) {
  const k6h6 = validaj[ vi ];
  const n2k = k6h6jRetajHak6h6[ vi ].n2k;
  const pontoSefini = k6h6.pontoSefini ?? k6h6.sefini;
  let heightFn: ( ( x: number, z: number ) => number ) | undefined;
  let glata = false;
  if ( pontaj[ vi ] ) {
    const tsekePontaAkvo = kf2PontanAkvanTeston( n2k, pontoSefini, tsekeVeraAkvo );
    const akvaSupro = ( x: number, z: number ): number => {
      if ( !tsekePontaAkvo(x, z) ) return -Infinity;
      return akvaVem2(x, z) + PONT_AKVA_KLARANCO;
    };
    const s2qena = vepaqPontanProfilon( n2k, pontoSefini, k6h6Supro, akvaSupro, pontaFinAlto );
    heightFn = ( x, z ) => s2qena.l6da(x, z) - VOJA_SUPRO_LEVIGXO;
    glata = true;
  }
  vojDifinoj.push( { pts: n2k, w: k6h6.sefini / 2, hateruni: true, heightFn, glata } );
}
// ⟨ ſןɔ˞ᴜƴ , ꞙɭɩ , 📃 ⟩
/* ſɭᴜ ſןᴜ , ꞙɭı ,
    @param x, z ( number ) - }ʃɹƽ ʌ j͐ʃᴜ ſ͕ɭᴜƴ
@returns veb6kek ( ſɟɹƽ | null ) - ſɟɹƽ ʌ ſᶘɹ ſɭɔ ｡ ſןɔ ｡ null */
function proksimaVeb6kek( x: number, z: number ) {
  let plejProksima = null, plejMallonga = Infinity;
  for ( const k of haveb6kek ) {
    const h6kuni = Math.hypot(k.x - x, k.z - z);
    if ( h6kuni < plejMallonga ) { plejMallonga = h6kuni; plejProksima = k; }
  }
  return plejMallonga < VOJA_TRUA_DUONO ? plejProksima : null;
}
const qakaj2jObjektoj: ReturnType<typeof vepaqQakaj2n>[] = [];
for ( const D of DOKOJ ) {
  const qakaj2 = vepaqQakaj2n( qena, D.x, D.z, D.rotacio ?? 0, k6h6Alteco, akvaVem2, D.profundo );
  qakaj2jObjektoj.push(qakaj2);
  if ( qakaj2.stuparajPunktoj.length < 2 ) continue;
  const rotacio = D.rotacio ?? 0;
  const landaX = D.x + Math.sin( rotacio ) * ( D.profundo / 2 );
  const landaZ = D.z + Math.cos( rotacio ) * ( D.profundo / 2 );
  const starto = surGrid( pontaFinAlto( landaX, landaZ, qakaj2.platformWidth ) );
  const falto = starto - qakaj2.landejaY;
  if ( falto <= STUPA_RISERO * 0o1/0o2 ) continue;
// ⟨ ſɭᴜ ſןᴜ , ꞙɭɩ , 📃 ⟩
  const nombro = kalkuliStupanNombron( falto );
// ⟨ ſןɔ˞ᴜƴ , ꞙɭı ,
// ſןɔ˞ᴜƴ , ꞙɭɿ , 📃 ⟩
  let saxeni = qakaj2.stuparajPunktoj[0];
  const tlakakani = qakaj2.stuparajPunktoj[1];
  const veb6kek = proksimaVeb6kek(landaX, landaZ);
  if ( veb6kek ) {
    const diferencoX = tlakakani[0] - veb6kek.x, diferencoZ = tlakakani[1] - veb6kek.z;
    const sahakani = Math.hypot(diferencoX, diferencoZ);
    if ( sahakani > VOJA_TRUA_DUONO ) {
      const kek = VOJA_TRUA_DUONO / sahakani;
      saxeni = [ veb6kek.x + diferencoX * kek, veb6kek.z + diferencoZ * kek ];
    }
  }
  const n2k = kf2StuparajnPunktojn( saxeni, tlakakani, nombro );
  vojDifinoj.push( { pts: n2k, w: qakaj2.platformWidth, stuparo: true,
    heightFn: kf2StuparanAlton( n2k, starto - VOJA_SUPRO_LEVIGXO, qakaj2.landejaY ),
    grundoFn: alteco } );
// ⟨ ſɭᴜ ſןᴜ , 📃 ⟩
  if ( DOKOJ.indexOf( D ) === 0 ) {
    const provAlto = kf2StuparanAlton( n2k, starto - VOJA_SUPRO_LEVIGXO, qakaj2.landejaY );
    console.log( `  ⚑ prov nombro=${nombro} starto=${starto.toFixed(3)} LEVIGXO=${VOJA_SUPRO_LEVIGXO.toFixed(3)} landejaY=${qakaj2.landejaY.toFixed(3)}` );
    console.log( `    saxeni=${JSON.stringify(saxeni)} tlakakani=${JSON.stringify(tlakakani)}` );
    for ( let s = 0; s <= 0o10; s++ ) {
      const tt = s / 0o10;
      const x = saxeni[0] + ( tlakakani[0] - saxeni[0] ) * tt;
      const z = saxeni[1] + ( tlakakani[1] - saxeni[1] ) * tt;
      console.log( `    t=${tt.toFixed(2)} (${x.toFixed(2)},${z.toFixed(2)}) -> ${provAlto(x,z).toFixed(3)}` );
    }
  }
}
// ⟪ ſɭэ ֭ſɭэ , 📏 ⟫
// ⟨ ſɭᴜ ſןᴜ , 📃 ⟩ , ſɭэ ֭ſɭэ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц , 📃 ⟩
const k21eDifinoj = [ ...kradajDifinoj, ...vojDifinoj ] as
  { pts: [ number, number ][]; w: number }[];
const k21eHaveb6kek = [ ...kradajHaveb6kek, ...veb6kekPunktoj ];
const k21eRetajHak6h6: K6h6RetoK6h6[] = [
  ...kradajDifinoj.map( d => ( { n2k: d.pts as [ number, number ][], sefini: 0o2 * d.w } ) ),
  ...k6h6jRetajHak6h6 ];
const derivitajBrakoj = kunigajBrakojElHak6h6(k21eHaveb6kek, k21eRetajHak6h6);
for ( const k of haveb6kek ) {
  const ca3aq = k.x + "," + k.z;
  const ca1ara = derivitajBrakoj.get(ca3aq) ?? [];
  for ( const d of k.direktaj )
    if ( !ca1ara.some( u => u[0] * d[0] + u[1] * d[1] > 0o1 - 0o1/0o1000 ) ) ca1ara.push(d);
  derivitajBrakoj.set(ca3aq, ca1ara);
  k.direktaj = ca1ara;
}
for ( const [ ca3aq, ca1ara ] of derivitajBrakoj ) veb6kekDirektoj.set(ca3aq, ca1ara);
k6h6Alteco = kf2K6h6Alton(alteco, k21eHaveb6kek.map(([ x, z ]) =>
  ( { x, z, direktaj: derivitajBrakoj.get(x + "," + z) ?? [],
    p2somani: veb6kekDuonoj.get(x + "," + z) ?? 0.875 } )), akvaFino);
// ⟪ ſɭᴜ ſןᴜ , 📏 ⟫
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
interface KunigaDatumo {
  x: number; z: number;
  direktaj: readonly [ number, number ][];
  fermitaj: [ number, number ] | undefined;
  rotacio: number;
}
const k21eKunigajDatumoj: KunigaDatumo[] = [
  ...haveb6kek.map(k => ( { x: k.x, z: k.z, direktaj: k.direktaj,
    fermitaj: k.fermitaj, rotacio: k.rotacio } )),
  ...kradajHaveb6kek.map(([ x, z ]) => ( { x, z,
    direktaj: ( derivitajBrakoj.get(x + "," + z) ?? [] ) as [ number, number ][],
    fermitaj: veb6kekFermitaj.get(x + "," + z), rotacio: 0 } )) ];
// ⟨ ſɭэ ֭ſɭэ , 📏 ⟩ , ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ , 📃 ⟩
const ne3ak2Infanoj = new Set<THREE.Object3D>(qena.children);
vepaqHak6h6n( qena, [ ...kradajDifinoj, ...vojDifinoj ], k6h6Alteco, dioritaMaterialo, andezitaMaterialo, k21eHaveb6kek,
  { akvaFn: akvaFino, kunigajDirektoj: veb6kekDirektoj, kunigajFermitaj: veb6kekFermitaj,
    kunigajRotacioj: veb6kekRotacioj, kunigajDuonoj: veb6kekDuonoj } );
vepaqIntersekcajnHapa12n( qena, k21eHaveb6kek, k6h6Alteco, dioritaMaterialo, andezitaMaterialo,
  veb6kekFermitaj, veb6kekRotacioj, veb6kekDirektoj, alteco, veb6kekDuonoj );
const vojMeshoj = qena.children.filter(o => !ne3ak2Infanoj.has(o));
qena.updateMatrixWorld(true);

// ⟪ ſɭэ ֭ſɭэ , 📏 ⟫
// ⟨ ſɭэ ֭ſɭэ , ꞙɭı ,
// ſɭɜ ſɭ,w , ꞙɭɿ , 📃 ⟩
let plejEnterigxo = 0, enterigxintaj = 0, enterigxaLoko = "";
for ( const kek of vojSuprajxoj ) {
  const sahakani = Math.hypot(kek.x2 - kek.x1, kek.z2 - kek.z1);
  if ( sahakani < 0o1 / 0o1000 ) continue;
  const ndx = ( kek.x2 - kek.x1 ) / sahakani, ndz = ( kek.z2 - kek.z1 ) / sahakani;
  for ( const f of [ 0, 0o1 / 0o4, 0o1 / 0o2, 0o3 / 0o4, 1 ] ) {
    const cx = kek.x1 + ( kek.x2 - kek.x1 ) * f;
    const cz = kek.z1 + ( kek.z2 - kek.z1 ) * f;
    const teru = kek.y0 + ( kek.y1 - kek.y0 ) * f;
    for ( const lat of [ -kek.p2somani, 0, kek.p2somani ] ) {
      const px = cx - ndz * lat, pz = cz + ndx * lat;
      const enterigxo = alteco(px, pz) - teru;
      if ( enterigxo > VOJA_BURIAL_TOLERANCO ) enterigxintaj++;
      if ( enterigxo > plejEnterigxo ) {
        plejEnterigxo = enterigxo;
        enterigxaLoko = `@${px.toFixed(1)},${pz.toFixed(1)} j͑ʃɜ ſɭ,ᴜ ${teru.toFixed(2)}` +
          ` ſɭɜ ſɭ,w ${alteco(px, pz).toFixed(2)}`;
      }
    }
  }
}
console.log(`ſɭэ ֭ſɭэ ɭl̀w ſȷw ɭl̀ᴜ ʌ ſɭɜ ſɭ,w ${plejEnterigxo.toFixed(3)} ${enterigxaLoko}` +
  ` ｡ ſᶘᴜ j͐ʃɹ ${enterigxintaj}`);

// ⟪ ſɭэ ֭ſɭэ , 📏 ⟫
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
const malsamaj = [ ...kunigajHavem2.values() ].filter(n => {
  const hal6da = n.knece.map(b => b.l6da).filter(Number.isFinite);
  return hal6da.length > 0o1 && Math.max(...hal6da) - Math.min(...hal6da) > STUPA_RISERO;
});
for ( const n of malsamaj.slice(0, 0o10) )
  console.log( `ſןᴜ ſᶘɹ ( ${n.x.toFixed(1)}, ${n.z.toFixed(1)} ) ｡ j͑ʃ'ɔ ŋᷠɹ ${n.l6da.toFixed(2)}` +
    ` ｡ ſɭᴜc̗ ɭʃɜ [ ${n.knece.map(b => b.l6da.toFixed(2)).join(" ")} ]` );
console.log( `ſןᴜ ſᶘɹ ʌ ſɭᴜc̗ ɭʃɜ ʌ j͐ʃэ ɭ(ᴜ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ${malsamaj.length} / ${kunigajHavem2.size}` );

// ⟪ ſɭᴜ ſןᴜ , 📏 ⟫
// ⟨ ſɭэ ֭ſɭэ , ꞙɭı , 📃 ⟩ , ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ , 📃 ⟩
// ⟨ ſɭэ ֭ſɭэ , 📃 ⟩ , ſɭᴜ ſןᴜ , ꞙɭɩ ,
// ſɭᴜ ſןᴜ , ꞙɭꞟ , 📃 ⟩
// ⟨ ſɭᴜ ſןᴜ , 📏 ⟩ , ſɭᴜ ſןᴜ , ꞙɭı ,
const BRAKA_TOLERO = Math.cos(Math.PI / 0o10);
function havasBrakon( knece: readonly { ux: number; uz: number }[],
  dx: number, dz: number ): boolean {
  const sahakani = Math.hypot(dx, dz);
  if ( sahakani < 0o1/0o100 ) return true;
  const ux = dx / sahakani, uz = dz / sahakani;
  return knece.some(b => b.ux * ux + b.uz * uz > BRAKA_TOLERO);
}
let mankaj = 0;
for ( const k of k21eHaveb6kek ) {
  const knece = kf2Brakojn(veb6kekDirektoj.get(k[0] + "," + k[1]) ?? [],
    veb6kekFermitaj.get(k[0] + "," + k[1]), veb6kekRotacioj.get(k[0] + "," + k[1]) ?? 0,
    veb6kekDuonoj.get(k[0] + "," + k[1]));
  const mankoj: string[] = [];
  for ( const d of k21eDifinoj ) {
    if ( d.pts.length < 2 ) continue;
// ⟨ ſɭэ ֭ſɭэ , ꞙɭı , 📃 ⟩
    for ( const [ ei, ni ] of [ [ 0, 1 ], [ d.pts.length - 1, d.pts.length - 2 ] ] ) {
      const e = d.pts[ei], n = d.pts[ni];
      if ( !e || !n ) continue;
      if ( Math.hypot(e[0] - k[0], e[1] - k[1]) > VOJA_TRUA_DUONO ) continue;
      if ( !havasBrakon(knece, n[0] - k[0], n[1] - k[1]) )
        mankoj.push(`ſ̀ȷᴜ ſɭᴜƽ ${e[0].toFixed(1)},${e[1].toFixed(1)}→${n[0].toFixed(1)},${n[1].toFixed(1)}`);
    }
// ⟨ ſɭэ ֭ſɭэ , ꞙɭɿ , 📃 ⟩
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
        if ( !havasBrakon(knece, qx - k[0], qz - k[1]) )
          mankoj.push(`ſɭэ ֭ſɭэ ｡ ${qx.toFixed(1)},${qz.toFixed(1)}`);
      }
    }
  }
  if ( mankoj.length ) {
    mankaj++;
    console.log(`ſɟɹƽ ( ${k[0].toFixed(1)}, ${k[1].toFixed(1)} ) ｡ ſɭᴜc̗ ɭʃɜ ${knece.length} ｡ ` +
      `ſɭэ ֭ſɭэ ʌ ſןɔ ʌ ſɭᴜc̗ ɭʃɜ ${mankoj.length} ｡ ${mankoj.slice(0,6).join(" ")}`);
  }
}
console.log(`ſɟɹƽ ʌ ſןɔ ʌ ſɭᴜc̗ ɭʃɜ ${mankaj} / ${k21eHaveb6kek.length}`);

// ⟨ ſɭᴜ ſןᴜ , ꞙɭц , 📃 ⟩
// ⟨ ſɭᴜ ſןᴜ , 📏 ⟩ , ſɭᴜ ſןᴜ ,
// ſɭэ ֭ſɭэ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
function atenduKovron( x: number, z: number, knece: readonly { ux: number; uz: number }[] ): boolean {
  if ( Math.hypot(x, z) <= VOJA_EKSTERA_DUONO - 0.02 ) return true;
  for ( const b of knece ) {
    const laux = x * b.ux + z * b.uz;
    const flanka = Math.abs(-x * b.uz + z * b.ux);
    if ( laux >= 0 && laux <= VOJA_TRUA_DUONO - 0.02
      && flanka <= VOJA_EKSTERA_DUONO - 0.02 ) return true;
  }
  return false;
}

const rc = new THREE.Raycaster();

// ⟪ ſןɔ˞ᴜƴ , 📏 ⟫
// ⟨ ſןɔ˞ᴜƴ , ſɭᴜ ſןᴜ , 📃 ⟩
function mezuY( x: number, z: number ): number | null {
  rc.set( new THREE.Vector3(x, 0o120, z), new THREE.Vector3(0, -1, 0) );
  const h = rc.intersectObjects( vojMeshoj, true ).find( x2 => x2.object.visible );
  return h ? h.point.y : null;
}
console.log("\n⟪ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ʌ ſɭᴜc̗ ɭʃɜ 🚢 ⟫");
for ( const D of DOKOJ ) {
  const r = D.rotacio ?? 0, cosR = Math.cos(r), sinR = Math.sin(r);
  const prof = D.profundo ?? 0o14;
  const wx = ( lx: number, lz: number ) => D.x + cosR * lx + sinR * lz;
  const wz = ( lx: number, lz: number ) => D.z - sinR * lx + cosR * lz;
  const x2pa: string[] = [];
  let ne3ak2 = NaN, maksSalto = 0, lokoSalto = "";
  for ( let lz = prof / 2 + 3; lz >= -prof / 2 - 1; lz -= 0o1/0o4 ) {
    const y = mezuY( wx(0, lz), wz(0, lz) );
    const akvo = tsekeVeraAkvo( wx(0, lz), wz(0, lz) );
    const t = ( y === null ? "--" : y.toFixed(2) ) + ( akvo ? "≈" : " " );
    x2pa.push(`${lz.toFixed(1)}:${t}`);
    if ( y !== null && Number.isFinite(ne3ak2) ) {
      const salto = ne3ak2 - y;
      if ( salto > maksSalto ) { maksSalto = salto; lokoSalto = `${lz.toFixed(1)}`; }
    }
    ne3ak2 = y ?? NaN;
  }
  const qakaj2 = DOKOJ.indexOf(D);
  const dokObj = qakaj2jObjektoj[qakaj2];
  console.log(`ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ${qakaj2} @(${D.x.toFixed(1)},${D.z.toFixed(1)}) ｡ ſɭэ }ʃᴜ ${prof} ｡ ſɭᴜc̗ ɭʃɜ`);
  console.log(`  ᶅſɔ ɽ͑ʃ'ɔ ʌ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ platformY=${dokObj.platformY.toFixed(3)} landejaY=${dokObj.landejaY.toFixed(3)} ` +
    `platformWidth=${dokObj.platformWidth.toFixed(2)} platformDepth=${dokObj.platformDepth.toFixed(2)}`);
  console.log(`  sekcioj: ` + dokObj.sekcioj.map((s: any) => `y=${s.y.toFixed(3)}@(lz=${s.lz.toFixed(2)},d=${s.d.toFixed(2)})`).join(" "));
  console.log("  " + x2pa.join(" "));
  console.log(`  j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ʌ ſɭᴜc̗ ɭʃɜ ${maksSalto.toFixed(2)} @lz=${lokoSalto}`);
  const x2pa2: string[] = [];
  let ne3ak22 = NaN, maksSalto2 = 0, loko2 = "";
  for ( let lx = -4; lx <= 4; lx += 0o1/0o4 ) {
    const y = mezuY( wx(lx, prof / 2), wz(lx, prof / 2) );
    x2pa2.push(`${lx.toFixed(1)}:${y === null ? "--" : y.toFixed(2)}`);
    if ( y !== null && Number.isFinite(ne3ak22) ) {
      const salto = Math.abs(y - ne3ak22);
      if ( salto > maksSalto2 ) { maksSalto2 = salto; loko2 = `${lx.toFixed(1)}`; }
    }
    ne3ak22 = y ?? NaN;
  }
  console.log("  j͑ʃɔ ſȷꞇ }ʃꞇ ʌ ᶅſэ ſ͕ɭᴜ ｡ " + x2pa2.join(" "));
  console.log(`  j͑ʃɔ ſȷꞇ }ʃꞇ ʌ ſɭᴜc̗ ɭʃɜ ɭl̀ᴜ ${maksSalto2.toFixed(2)} @lx=${loko2}`);
}
// ⟪ ſןɔ˞ᴜƴ , ꞙɭɔ , 🔬 ⟫
{
  const mezuPlena = ( x: number, z: number ): number | null => {
    rc.set( new THREE.Vector3(x, 0o120, z), new THREE.Vector3(0, -1, 0) );
    const h = rc.intersectObjects( qena.children, true ).find( x2 => x2.object.visible );
    return h ? h.point.y : null;
  };
  const D = DOKOJ[0];
  const r = D.rotacio ?? 0, cosR = Math.cos(r), sinR = Math.sin(r);
  const wx = ( lx: number, lz: number ) => D.x + cosR * lx + sinR * lz;
  const wz = ( lx: number, lz: number ) => D.z - sinR * lx + cosR * lz;
  const x2pa: string[] = [];
  for ( let lz = 0o13; lz >= -0o11; lz -= 0o1/0o4 ) {
    const y = mezuPlena( wx(0, lz), wz(0, lz) );
    x2pa.push(`${lz.toFixed(1)}:${y === null ? "--" : y.toFixed(2)}`);
  }
  console.log("  ſɭᴜc̗ ɭʃɜ ʌ ſɭɹ ſᶘɔ ｡ " + x2pa.join(" "));
}
// ⟪ ſןɔ˞ᴜƴ , 📏 ⟫
console.log("\n⟪ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ j͑ʃ'ɔ ŋᷠɹ ɔ ʌ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ 🔬 ⟫");
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
for ( const k of haveb6kek ) {
  const knece = kf2Brakojn(k.direktaj, k.fermitaj, k.rotacio);
  const mankoj: string[] = [];
  for ( let a = 0; a < 0o40; a++ ) {
    const ang = a * Math.PI * 2 / 0o40;
    for ( const r of [ 0.5, 1.0, 1.4, 1.8, 2.05 ] ) {
      const x = k.x + Math.cos(ang) * r, z = k.z + Math.sin(ang) * r;
      if ( !atenduKovron(x - k.x, z - k.z, knece) ) continue;
      provitaj++;
      rc.set( new THREE.Vector3(x, 0o74, z), new THREE.Vector3(0, -1, 0) );
      const h = rc.intersectObjects( vojMeshoj, true );
      if ( !h.find( x2 => x2.object.visible ) ) mankoj.push( `${(ang * 180 / Math.PI).toFixed(0)}°/${r}` );
    }
  }
  if ( mankoj.length > 0 )
    raporto.push( `ſɟɹƽ ( ${k.x.toFixed(2)}, ${k.z.toFixed(2)} ) ｡ ſ͕ɭᴜ ſ͕ɭw }ʃɹ ${mankoj.length} ｡ ${mankoj.slice(0,10).join(" ")}` );
}
for ( const r of raporto ) console.log( r );
console.log( `ſɟɹƽ ʌ ſɭɹ ſᶘɔ ${haveb6kek.length} ｡ ſᶘᴜ j͐ʃɹ ${provitaj} ｡ ſ͕ɭᴜ ſ͕ɭw }ʃɹ ${raporto.length}` );

// ⟪ ſןɔ˞ᴜƴ , 📏 ⟫
// ⟨ ſןɔ˞ᴜƴ , ſɭᴜ ſןᴜ ,
// ſןɔ˞ᴜƴ , ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ , 📃 ⟩
// ⟨ ſןɔ˞ᴜƴ , ꞙɭɔꞟ , 📃 ⟩
const PASHO = 0o1/0o10;
const SALTO_TOLERO = 0o1/0o200;
// ⟨ ſןɔ˞ᴜƴ , ꞙɭı , 📏 ⟩ , ſןɔ˞ᴜƴ , ꞙɭɔꞟ ,
// ſןɔ˞ᴜƴ , ꞙɭı , 📃 ⟩
const DEKALO = 0o1/0o20;
// ⟨ ſןɔ˞ᴜƴ , ſɭᴜ ſןᴜ , 📏 ⟩ , ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц , 📃 ⟩
interface Elirejo { x: number; z: number; ux: number; uz: number }
const elirejoj = new Map<string, Elirejo[]>();
for ( const d of k21eDifinoj ) {
  if ( d.pts.length < 2 ) continue;
  for ( const [ ei, ni ] of [ [ 0, 1 ], [ d.pts.length - 1, d.pts.length - 2 ] ] ) {
    const e = d.pts[ ei ], n = d.pts[ ni ];
    if ( !e || !n ) continue;
    const sahakani = Math.hypot(e[0] - n[0], e[1] - n[1]);
    if ( sahakani < 0o1/0o100 ) continue;
    let plej: [ number, number ] | null = null, dist = Infinity;
    for ( const k of k21eHaveb6kek ) {
      const dd = Math.hypot(e[0] - k[0], e[1] - k[1]);
      if ( dd < dist ) { dist = dd; plej = k; }
    }
    if ( !plej || dist > VOJA_TRUA_DUONO ) continue;
    const ca3aq = plej[0] + "," + plej[1];
    const ca1ara = elirejoj.get(ca3aq) ?? [];
    const ux = ( e[0] - n[0] ) / sahakani, uz = ( e[1] - n[1] ) / sahakani;
    if ( !ca1ara.some(b => b.ux * ux + b.uz * uz > 0o1 - 0o1/0o100 ) )
      ca1ara.push({ x: plej[0], z: plej[1], ux, uz });
    elirejoj.set(ca3aq, ca1ara);
  }
}
let tutaSalto = 0;
let rompoj = 0;
for ( const k of k21eKunigajDatumoj ) {
  const elirejo = elirejoj.get(k.x + "," + k.z);
  if ( !elirejo || elirejo.length === 0 ) continue;
  let saltoMaks = 0, lokoMaks = "";
  const sinsekvo: string[] = [];
  for ( const b of elirejo ) {
    sinsekvo.push("|");
    let ne3ak2 = NaN;
    for ( let r = DEKALO; r <= VOJA_TRUA_DUONO + 0o4; r += PASHO ) {
      rc.set( new THREE.Vector3(k.x + b.ux * r, 0o74, k.z + b.uz * r),
        new THREE.Vector3(0, -1, 0) );
      const h = rc.intersectObjects( vojMeshoj, true ).find( x => x.object.visible );
      if ( !h ) { ne3ak2 = NaN; sinsekvo.push(`${r.toFixed(1)}:-`); continue; }
      sinsekvo.push(`${r.toFixed(1)}:${h.point.y.toFixed(2)}`);
      if ( Number.isFinite(ne3ak2) ) {
        const salto = Math.abs(h.point.y - ne3ak2);
        if ( salto > saltoMaks ) {
          saltoMaks = salto;
          lokoMaks = `${( k.x + b.ux * r ).toFixed(1)},${( k.z + b.uz * r ).toFixed(1)}`;
        }
      }
      ne3ak2 = h.point.y;
    }
  }
  if ( saltoMaks > tutaSalto ) tutaSalto = saltoMaks;
  const rompo = saltoMaks > STUPA_RISERO + SALTO_TOLERO;
  if ( rompo ) {
    rompoj++;
    console.log( `ſɟɹƽ ( ${k.x.toFixed(1)}, ${k.z.toFixed(1)} ) ｡ j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ` +
      `${saltoMaks.toFixed(3)} @${lokoMaks}  ⚠ ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ ſᶘɔ j͐ʃɹ j͑ʃᴜꞇ` );
    console.log( "  " + sinsekvo.join(" ") );
  }
}
console.log( `ſɟɹƽ ʌ j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ${rompoj} ｡ j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ʌ ᶅſэ ſ͕ɭᴜ ${tutaSalto.toFixed(3)} ｡ ſןͷ̗ɜ j͑ʃƨɔȝ ${STUPA_RISERO.toFixed(3)}` +
  ( tutaSalto > STUPA_RISERO + SALTO_TOLERO ? "  ſ̀ȷᴜ̩ ſɭɹ }ʃꞇ" : "" ) );

// ⟪ ſɭᴜ ſןᴜ , 📏 ⟫
const baza = kf2BazanK6h6Alton(alteco);
for ( const [ gx, gz ] of [ [ 0o70, -0o44 ], [ 0o65, -0o44 ]] ) {
  console.log(`\nſɭɜ ſɭ,w ${gx},${gz}`);
  for ( let dz = -3; dz <= 3; dz += 0o1/0o2 ) {
    const x2pa: string[] = [];
    for ( let dx = -3; dx <= 3; dx += 0o1/0o2 )
      x2pa.push(alteco(gx + dx, gz + dz).toFixed(2).padStart(6));
    console.log("  " + x2pa.join(" "));
  }
  const x2pa2: string[] = [];
  for ( let dx = -3; dx <= 3; dx += 0o1/0o2 ) x2pa2.push(baza(gx + dx, gz).toFixed(2).padStart(6));
  console.log("  ſɭɜ ſɭ,w ʌ ɭl̀ᴜȝ ſןᴜ ɭʃɔ x ｡ " + x2pa2.join(" "));
}
for ( const [ qx, qz ] of [ [ 0o54, -0o44 ], [ 0o70, -0o44 ], [ 0o104, -0o140 ], [ 0o134, -0o74 ], [ 0o65, -0o44 ]] ) {
  const knece = kf2Brakojn(veb6kekDirektoj.get(qx + "," + qz) ?? [],
    veb6kekFermitaj.get(qx + "," + qz), veb6kekRotacioj.get(qx + "," + qz) ?? 0,
    veb6kekDuonoj.get(qx + "," + qz));
  const pa12 = kunigaPlataAlto(qx, qz, knece, k6h6Alteco);
  const deBaza = k6h6SuproDeVeb6kek(qx, qz, knece.map(b => [ b.ux, b.uz ] as [ number, number ]),
    VOJA_EKSTERA_DUONO, baza).hateru;
  console.log(`\nſןᴜ ſᶘɹ ${qx},${qz} ｡ ſɭɜ ſɭ,w ${alteco(qx, qz).toFixed(2)} ｡ ɭl̀ᴜȝ ſןᴜ ɭʃɔ ${baza(qx, qz).toFixed(2)} ` +
    `ſןͷ̗ɜ j͑ʃƨɔȝ ʌ ſɭɜ ſɭ,w ${deBaza.toFixed(2)} ｡ ᶅſɔ ɽ͑ʃ'ɔ ${k6h6Alteco(qx, qz).toFixed(2)} ` +
    `ſןᴜ ſᶘɹ ${pa12.toFixed(2)} ｡ ſɭᴜc̗ ɭʃɜ ${knece.map(b => `${b.ux.toFixed(2)}/${b.uz.toFixed(2)}`).join(" ")}`);
  for ( const [ ox, oz ] of [ [ 1, 0 ], [ -1, 0 ], [ 0, 1 ], [ 0, -1 ]] ) {
    const x2pa: string[] = [];
    for ( let r = 0; r <= 6; r++ ) {
      const px = qx + ox * r, pz = qz + oz * r;
      x2pa.push(`${r} ｡ ſɭɜ ſɭ,w ${alteco(px, pz).toFixed(1)} / ᶅſɔ ɽ͑ʃ'ɔ ${k6h6Alteco(px, pz).toFixed(1)}`);
    }
    console.log("  " + ( ox ? "x" : "z" ) + ( ox + oz > 0 ? "+" : "-" ) + " " + x2pa.join(" "));
  }
}

// ⟪ ſɭᴜ ſןᴜ , 📏 ⟫
// ⟨ ſɭᴜ ſןᴜ , 📃 ⟩ , ſɭᴜ ſןᴜ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
const dikoj: number[] = [];
for ( const [ kx, kz ] of k21eHaveb6kek ) {
  const knece = kf2Brakojn(veb6kekDirektoj.get(kx + "," + kz) ?? [],
    veb6kekFermitaj.get(kx + "," + kz), veb6kekRotacioj.get(kx + "," + kz) ?? 0,
    veb6kekDuonoj.get(kx + "," + kz));
  const vem2 = kunigaPlataVem2(kx, kz, knece, k6h6Alteco);
  let dika = 0;
  for ( let i = 0; i < 0o20; i++ ) {
    const tafkaq = i * Math.PI * 0o2 / 0o20;
    const r = VOJA_TRUA_DUONO;
    const sup = plataAltoCxe(vem2, tafkaq);
    const tera = alteco(kx + Math.cos(tafkaq) * r, kz + Math.sin(tafkaq) * r);
    dika = Math.max(dika, sup - tera);
  }
  dikoj.push(Math.max(ANGULA_PROVOLIRO, dika + ANGULA_PROVOLIRO));
}
dikoj.sort(( p, q ) => q - p);
console.log(`ſןᴜ ſᶘɹ ʌ ſɭɜʞ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${STUPA_RISERO.toFixed(1)} ｡ ${dikoj.filter(v => v > STUPA_RISERO).length}` +
  ` / ${dikoj.length} ｡ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${dikoj[0].toFixed(2)} ｡ ſȷƽᴜ ɭʃᴜ ` +
  `${( dikoj.reduce(( p, q ) => p + q, 0 ) / dikoj.length ).toFixed(2)} ｡ ɭl̀ᴜ ʌ ꞙɭıɿ ` +
  dikoj.slice(0, 0o12).map(v => v.toFixed(1)).join(" ") );

// ⟪ ſɭэ ֭ſɭэ , ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ , 📏 ⟫
// ⟨ ſɭэ ֭ſɭэ , ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ ,
// ſɭэ ֭ſɭэ , ſןɔ˞ᴜƴ , 📃 ⟩
const FLOSA_LIMO = 0o1/0o2;
const FLOSA_VIDEBA = 0o1 + 0o1/0o2;
let flosantaj = 0, videblaj = 0, flosoMaks = 0, flosoLoko = "";
const plejFlosantaj: { f: number; x: number; z: number; d: number }[] = [];
for ( const d of k21eDifinoj ) {
  if ( d.pts.length < 2 ) continue;
  for ( let i = 0; i < d.pts.length - 1; i++ ) {
    const a = d.pts[ i ], b = d.pts[ i + 1 ];
    const sahakani = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const tonaj = Math.max(1, Math.ceil(sahakani));
    for ( let j = 0; j <= tonaj; j++ ) {
      const t = j / tonaj;
      const x = a[0] + ( b[0] - a[0] ) * t, z = a[1] + ( b[1] - a[1] ) * t;
      rc.set( new THREE.Vector3(x, 0o120, z), new THREE.Vector3(0, -1, 0) );
      const h = rc.intersectObjects( vojMeshoj, true ).find( x2 => x2.object.visible );
      if ( !h ) continue;
      const floso = h.point.y - alteco(x, z);
      if ( floso > flosoMaks ) { flosoMaks = floso; flosoLoko = `${x.toFixed(1)},${z.toFixed(1)}`; }
      if ( floso > FLOSA_LIMO ) flosantaj++;
      if ( floso > FLOSA_VIDEBA ) {
        videblaj++;
        let dVeb6kek = Infinity;
        for ( const k of k21eHaveb6kek ) dVeb6kek = Math.min(dVeb6kek, Math.hypot(k[0] - x, k[1] - z));
        plejFlosantaj.push({ f: floso, x, z, d: dVeb6kek });
      }
    }
  }
}
plejFlosantaj.sort(( p, q ) => q.f - p.f );
console.log( `ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ ſᶘɔ j͐ʃɹ j͑ʃᴜꞇ ʌ ſɭᴜc̗ ɭʃɜ > ${FLOSA_LIMO} ｡ ${flosantaj} ſᶘᴜ j͐ʃɹ ｡ > ${FLOSA_VIDEBA} ｡ ${videblaj}` +
  ` ｡ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${flosoMaks.toFixed(2)} @${flosoLoko}` +
  ( flosoMaks > FLOSA_VIDEBA ? "  ſ̀ȷᴜ̩" : "" ) );
for ( const f of plejFlosantaj.slice(0, 0o10 ) )
  console.log( `  ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ ſᶘɔ j͐ʃɹ j͑ʃᴜꞇ ${f.f.toFixed(2)} @${f.x.toFixed(1)},${f.z.toFixed(1)}` +
    ` ｡ ſןᴜ ſᶘɹ ʌ ſᶘɹ ſɭɔ ${f.d.toFixed(1)}` );

// ⟪ ſɭэ ֭ſɭэ , ꞙɭɿ , 📏 ⟫
// ⟨ ſɭэ ֭ſɭэ , ſןɔ˞ᴜƴ ,
// ſɭэ ֭ſɭэ , ꞙɭı , 📃 ⟩
// ⟨ ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ſןɔ˞ᴜƴ , 📃 ⟩ , ſɟɹƽ ꞁȷ̀ᴜ }ʃw ,
// ſןɔ˞ᴜƴ , ꞙɭı , 📃 ⟩
const ankrojNivelaj = k21eHaveb6kek.map(([ x, z ]) => {
  const knece = kf2Brakojn(veb6kekDirektoj.get(x + "," + z) ?? [], veb6kekFermitaj.get(x + "," + z),
    veb6kekRotacioj.get(x + "," + z) ?? 0, veb6kekDuonoj.get(x + "," + z));
  return { x, z, l6da: kunigaPlataAlto(x, z, knece, k6h6Alteco),
    vem2: kunigaPlataVem2(x, z, knece, k6h6Alteco) };
});
const vem2j: { difino: { pts: [ number, number ][]; w: number }; s2qena: any }[] = [];
for ( const d of k21eDifinoj as { pts: [ number, number ][]; w: number;
  heightFn?: unknown; glata?: boolean }[] ) {
  if ( d.pts.length < 2 || d.heightFn || d.glata ) continue;
  vem2j.push( { difino: d, s2qena: kf2NivelanProfilon(d.pts, k6h6LarghoDuono( 0o2 * d.w ),
    k6h6Alteco, akvaFino, ankrojNivelaj) } );
}
let vem2jRompoj = 0;
for ( const { difino, s2qena } of vem2j ) {
  let maks = 0, raqa = 0, ne3ak2 = NaN;
  for ( let i = 0; i < s2qena.hal6da.length; i++ ) {
    const a = s2qena.hal6da[ i ];
    if ( Number.isFinite(ne3ak2) && Math.abs(a - ne3ak2) > maks ) {
      maks = Math.abs(a - ne3ak2);
      raqa = s2qena.haxekuxa[ i ];
    }
    ne3ak2 = a;
  }
  if ( maks > STUPA_RISERO + SALTO_TOLERO ) {
    vem2jRompoj++;
    const p = punktoCxe(difino.pts, raqa);
    console.log(`j͑ʃ'ɔ ŋᷠɹ ʌ ſɭэ ֭ſɭэ ɭl̀ᴜ ${maks.toFixed(3)} @${p.x.toFixed(1)},${p.z.toFixed(1)}` +
      ` s=${raqa.toFixed(1)} / ${s2qena.sahakani.toFixed(1)} ⚠`);
  }
}
console.log(`j͑ʃ'ɔ ŋᷠɹ ʌ ſɭэ ֭ſɭэ ɭl̀ᴜ ${vem2jRompoj} / ${vem2j.length}` +
  ( vem2jRompoj > 0 ? "  ſ̀ȷᴜ̩ ſɭɹ }ʃꞇ" : "" ));

// ⟪ ſɭᴜ ſןᴜ , 🔬 ⟫
if ( process.env.KK_SONDO ) {
  const celoj = [ [ -0o34, -0o140 ], [ 0o104, -0o44 ] ];
  console.log(`\nſןᴜ ſᶘɹ ʌ ſɭᴜc̗ ɭʃɜ ʌ ſɭɹ ſᶘɔ`);
  for ( let i = 0; i < k21eHaveb6kek.length; i++ ) {
    const [ kx, kz ] = k21eHaveb6kek[ i ];
    const knece = kf2Brakojn(veb6kekDirektoj.get(kx + "," + kz) ?? [],
      veb6kekFermitaj.get(kx + "," + kz), veb6kekRotacioj.get(kx + "," + kz) ?? 0,
      veb6kekDuonoj.get(kx + "," + kz));
    if ( knece.length < 3 ) continue;
    console.log(`  (${kx.toFixed(1)},${kz.toFixed(1)}) ｡ ſɭᴜc̗ ɭʃɜ ${knece.length} l6da=${ankrojNivelaj[ i ].l6da.toFixed(2)}` +
      ` ｡ ſɭɜ ſɭ,w=${alteco(kx, kz).toFixed(2)}` +
      ` ｡ ſɟɹ ᶅſɹȝ ${knece.map(b => `${b.ux.toFixed(2)}/${b.uz.toFixed(2)}`).join(" ")}`);
  }
  for ( const [ tx, tz ] of celoj ) {
    console.log(`\n}ʃᴜ j͐ʃᴜ ${tx},${tz}`);
    for ( const a of ankrojNivelaj ) {
      const d = Math.hypot(a.x - tx, a.z - tz);
      if ( d > 0o24 ) continue;
      console.log(`    ſןᴜ ſᶘɹ (${a.x.toFixed(1)},${a.z.toFixed(1)}) l6da=${a.l6da.toFixed(2)} d=${d.toFixed(2)}`);
    }
    for ( const { difino, s2qena } of vem2j ) {
      let plej = -1, dist = Infinity;
      for ( let i = 0; i < s2qena.haxekuxa.length; i++ ) {
        const p = punktoCxe(difino.pts, s2qena.haxekuxa[ i ]);
        const d = Math.hypot(p.x - tx, p.z - tz);
        if ( d < dist ) { dist = d; plej = i; }
      }
      if ( plej < 0 || dist > 1.2 ) continue;
      const p = punktoCxe(difino.pts, s2qena.haxekuxa[ plej ]);
      console.log(`  ſɭэ ֭ſɭэ ${difino.pts.length} ｡ }ʃɹƽ w=${difino.w} ｡ ſᶘɹ ſɭɔ ${dist.toFixed(2)} i=${plej}` +
        ` s=${s2qena.haxekuxa[ plej ].toFixed(2)}/${s2qena.sahakani.toFixed(1)}` +
        ` ｡ ſ̀ȷᴜ ſɭᴜƽ ${JSON.stringify(difino.pts[ 0 ])}→${JSON.stringify(difino.pts[ difino.pts.length - 1 ])}`);
      for ( let k = Math.max(0, plej - 0o10); k <= Math.min(s2qena.hal6da.length - 1, plej + 0o10); k++ ) {
        const q = punktoCxe(difino.pts, s2qena.haxekuxa[ k ]);
        let psaz = -Infinity, teru = Infinity;
        for ( const a of ankrojNivelaj ) {
          const d = Math.hypot(q.x - a.x, q.z - a.z);
          const deRando = 0o1 * Math.max(0, d - VOJA_TRUA_DUONO);
          if ( a.l6da - deRando > psaz ) psaz = a.l6da - deRando;
          if ( a.l6da + deRando < teru ) teru = a.l6da + deRando;
        }
        console.log(`    i=${k} s=${s2qena.haxekuxa[ k ].toFixed(2)} (${q.x.toFixed(1)},${q.z.toFixed(1)})` +
          ` celo=${s2qena.celoj[ k ].toFixed(3)} l6da=${s2qena.hal6da[ k ].toFixed(3)}` +
          ` ｡ ᶅſɔ ɽ͑ʃ'ɔ=${k6h6Alteco(q.x, q.z).toFixed(3)} ｡ ſɭɜ ſɭ,w=${alteco(q.x, q.z).toFixed(3)}` +
          ` centra=${s2qena.centraj[ k ].toFixed(3)} glata=${s2qena.glataj[ k ].toFixed(3)}` +
          ` psaz=${psaz.toFixed(2)} teru=${teru.toFixed(2)}`);
      }
    }
  }
}

// ⟪ ſɭᴜ ſןᴜ , 📏 ⟫
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
const hapa12 = new Map<string, ReturnType<typeof kunigaPlataVem2>>();
for ( const [ kx, kz ] of k21eHaveb6kek )
  hapa12.set(kx + "," + kz, kunigaPlataVem2(kx, kz,
    kf2Brakojn(veb6kekDirektoj.get(kx + "," + kz) ?? [], veb6kekFermitaj.get(kx + "," + kz),
      veb6kekRotacioj.get(kx + "," + kz) ?? 0, veb6kekDuonoj.get(kx + "," + kz)), k6h6Alteco));
let celajRompoj = 0, celajMaks = 0, celajLoko = "";
const celajHax2pa: string[] = [];
for ( const { difino, s2qena } of vem2j ) {
  let maks = -Infinity, klavoMaks = "";
  for ( let i = 0; i < s2qena.hal6da.length; i++ ) {
    const p = punktoCxe(difino.pts, s2qena.haxekuxa[ i ]);
    for ( const [ kx, kz ] of k21eHaveb6kek ) {
      const d = Math.hypot(p.x - kx, p.z - kz);
      if ( d < VOJA_TRUA_DUONO - 0.05 || d > VOJA_TRUA_DUONO + 0.6 ) continue;
      const vem2 = hapa12.get(kx + "," + kz);
      const pa12 = vem2
        ? plataAltoCxe(vem2, Math.atan2(p.z - kz, p.x - kx))
        : 0;
      const dif = s2qena.celoj[ i ] - pa12;
      if ( dif > maks ) { maks = dif; klavoMaks = `${kx},${kz}`; }
    }
  }
  if ( maks > STUPA_RISERO + SALTO_TOLERO ) {
    celajRompoj++;
    if ( maks > celajMaks ) { celajMaks = maks; celajLoko = klavoMaks; }
    if ( celajHax2pa.length < 0o10 )
      celajHax2pa.push(`ſɭэ ֭ſɭэ ʌ j͑ʃ'ɔ ŋᷠɹ ɭl̀ᴜ ${maks.toFixed(2)} ｡ ſןᴜ ſᶘɹ ${klavoMaks}`);
  }
}
for ( const v of celajHax2pa ) console.log("  " + v);
console.log(`ſɭэ ֭ſɭэ ʌ j͑ʃ'ɔ ŋᷠɹ ɭl̀ᴜ ʌ ᶅſэ ſ͕ɭᴜ ${celajRompoj} / ${vem2j.length} ｡ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ` +
  `${celajMaks.toFixed(2)} @${celajLoko}` + ( celajRompoj > 0 ? "  ſ̀ȷᴜ̩ ſɭɹ }ʃꞇ" : "" ));
