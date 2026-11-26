// ≺⧼ ֭ſɭᴜ j͑ʃ'ɔ ʃэ ſɭɔ ſɭᴜ }ʃꞇ ƽ ŋᷠᴜ 🧪 ⧽≻

import "./ceh2kap2.mjs";
import * as THREE from "three";
import { tikHak6h6, tikHaqakaj2, tikHakaxte } from "../../kanta/mut6q-havop2/tlohk2nikziisai.js";
import { l6da, tsasaVem2, skulptitaTsasa } from "../../kanta/nala/mut6qSoza.js";
import { troviK6h6RetajnHaveb6kekn, tamc2kHakneceElHak6h6 } from "../../skek2/qatsiike/k6h6-caxlefkakai.js";
import type { K6h6CaxlefkakaiK6h6 } from "../../skek2/qatsiike/k6h6-caxlefkakai.js";
import { k6h6Teru as k6h6TeruBaza, k6h6TeruDeVeb6kek, tap2L6daJe } from "../../skek2/qatsiike/hak6h6/haqoxa.js";
import { vepaqHak6h6n } from "../../skek2/qatsiike/hak6h6.js";
import { vepaqIntersekcajnHapa12n } from "../../skek2/qatsiike/hak6h6/hapa12.js";
import { kf2Haknece, tamc2kTap2L6da, tamc2kTap2Vem2 } from "../../skek2/qatsiike/hak6h6/hapa12.js";
import { kf2K6h6L6dan, kf2BazanK6h6L6dan } from "../../skek2/qatsiike/hak6h6/l6da.js";
import { kf2NivelanS2qena } from "../../skek2/qatsiike/hak6h6/havem2.js";
import { n2kJe } from "./p6kpu.js";
import { K6H6AEKSTERAP2SOMANI, K6H6AKMARL6DA, KORNAR,
  STUPARISERO, surGrid, K6H6ATRUAP2SOMANI, K6H6ABURIL6DALERANCO,
  k6h6SefiniP2somani } from "../../skek2/qatsiike/hak6h6/havecax2l.js";
import { PONTAKVAKLARANCO } from "../../skek2/qatsiike/qakaj2/c2kanu.js";
import { vek2feStupanNombron, kf2StuparajnHan2kn, kf2StuparanL6da } from "../../skek2/qatsiike/qakaj2/hatona.js";
import { vepaqPontanS2qena, havasAkvanTrunkon, kf2PontanAkvanTeston } from "../../skek2/qatsiike/hak6h6/c2kanu-profilo.js";
import { vepaqQakaj2n } from "../../skek2/qatsiike/qakaj2.js";
import { vepaqQox2n2kKaxten } from "../../kanta/nala/kaxte/qox2n2k-kaxte.js";
import { gluiK6h6tlakakn } from "../../skek2/qatsiike/hak6h6/scac6.js";
import { kf2T6g6Pukek, kf2T6hnaPukek, kf2KuhalPukek } from "../../skek2/p6kpu/pukek.js";
import { ANGULATSALETSALIRO } from "../../skek2/qatsiike/hak6h6/habakaweKatoma.js";
import { tamc2kHavem2 } from "../../skek2/qatsiike/hak6h6/veb6kek-havem2.js";
import { kas2kantaHasoza } from "../../skek2/qatsiike/hak6h6/hahunaq.js";

const HAKAS2KANTA = tikHak6h6();
const HAQAKAJ2 = tikHaqakaj2();
const HAKAXTE = tikHakaxte();

const veb6kekHanece3e = new Map<string, [ number, number ]>();

function k6h6Teru(x: number, z: number, sefini: number): number {
  return k6h6TeruBaza(x, z, sefini, k6h6L6da);
}
function pontaFinL6da(x: number, z: number, sefini: number): number {
  let kmaTsiike: { x: number; z: number; c2w2qa: [ number, number ][] } | null = null, kmaC2na = Infinity;
  for ( const k of haveb6kek ) {
    const d = Math.hypot(k.x - x, k.z - z);
    if ( d < kmaC2na ) { kmaC2na = d; kmaTsiike = k; }
  }
  if ( kmaTsiike && kmaC2na < K6H6AEKSTERAP2SOMANI + KORNAR )
    return k6h6TeruDeVeb6kek(kmaTsiike.x, kmaTsiike.z, kmaTsiike.c2w2qa, K6H6AEKSTERAP2SOMANI, k6h6L6da).hateru;
  return k6h6Teru(x, z, sefini);
}
const tsekeVeraTsasa = (x: number, z: number) =>
  skulptitaTsasa(x, z) && l6da(x, z) < tsasaVem2(x, z) - 0o1/0o200;
const tsasatlakak = ( x: number, z: number ): number =>
  tsekeVeraTsasa(x, z) ? tsasaVem2(x, z) + 0o1/0o2 : -Infinity;

const qena = new THREE.Scene();
const dioritaPukek = kf2T6g6Pukek( new THREE.Texture() );
const andezitaPukek = kf2T6hnaPukek( new THREE.Texture() );
const oraPukek = kf2KuhalPukek( 0xd8b058 );

const qox2n2kHavop2ni: any[] = [];
const qox2n2kHaveb6kek: [ number, number ][] = [];

const kaxteCatsara = HAKAXTE.length ? HAKAXTE
  : [ { ksaka: "Geles", ptaluPal6: 0o3, k6liqPal6: "vakox2qita", ofsX: 0o0, ofsZ: 0o0 } ];
for ( const u of kaxteCatsara ) {
  const kaxte = vepaqQox2n2kKaxten( qena,
    { ptaluPal6: u.ptaluPal6, k6liqPal6: u.k6liqPal6 as any, kekufxeso: false, hahufwuk2: false },
    [ u.ofsX, u.ofsZ ], oraPukek, ( u as any ).tlunakHak6liq ?? [] );
  qox2n2kHavop2ni.push( ...kaxte.kas2kantaHavop2ni );
  qox2n2kHaveb6kek.push( ...kaxte.tamc2kHan2k );
  for ( const [ ca3aq, f ] of kaxte.tamc2kHanece3e )
    veb6kekHanece3e.set(ca3aq, f);
}
console.log(`ſɭэ ֭ſɭэ ʌ ſɭɹ ſןᴜ ${qox2n2kHavop2ni.length} ｡ ſɟɹƽ ʌ ſɭɹ ſןᴜ ${qox2n2kHaveb6kek.length}`);

const s2l2me = HAKAS2KANTA.filter( v => v.n2k.length >= 0o2 );
const pontaj: boolean[] = [];
const k6h6jHacaxlefkakaiHak6h6: K6h6CaxlefkakaiK6h6[] = s2l2me.map( k6h6 => {
  const c2kanuSefini = k6h6.c2kanuSefini ?? k6h6.sefini;
  const sost2cel2sai = havasAkvanTrunkon( k6h6.n2k,
    kf2PontanAkvanTeston( k6h6.n2k, c2kanuSefini, tsekeVeraTsasa ) );
  pontaj.push(sost2cel2sai);
  return { n2k: k6h6.n2k as [ number, number ][],
    sefini: sost2cel2sai ? c2kanuSefini : k6h6.sefini };
} );
const qakaj2Landaj = HAQAKAJ2.map( d => {
  const r = d.s2sabo ?? 0o0;
  return { x: d.x + Math.sin(r) * ( d.jufu / 0o2 ), z: d.z + Math.cos(r) * ( d.jufu / 0o2 ) };
} );
const ne3ak2Haveb6kek = troviK6h6RetajnHaveb6kekn( k6h6jHacaxlefkakaiHak6h6, HAQAKAJ2 );
const gluaCelo: [ number, number ][] = [ ...qox2n2kHaveb6kek,
  ...ne3ak2Haveb6kek.map( k => [ k.x, k.z ] as [ number, number ] ) ];
const qox2n2kHan2k = qox2n2kHavop2ni.map( d => d.pts as [ number, number ][] );
for ( let vi = 0o0; vi < s2l2me.length; vi++ ) {
  const xaqadi = k6h6jHacaxlefkakaiHak6h6[ vi ].n2k;
  const has2tonome = [ ...qox2n2kHan2k,
    ...k6h6jHacaxlefkakaiHak6h6.map(( v, i ) => i === vi ? [] : v.n2k ) ];
  const n2k = gluiK6h6tlakakn( xaqadi, gluaCelo, qakaj2Landaj, has2tonome );
  if ( n2k.length >= 0o2 ) k6h6jHacaxlefkakaiHak6h6[ vi ] = { ...k6h6jHacaxlefkakaiHak6h6[ vi ], n2k };
}
const haveb6kek = troviK6h6RetajnHaveb6kekn( k6h6jHacaxlefkakaiHak6h6, HAQAKAJ2 );
const veb6kekHan2k = haveb6kek.map( k => [ k.x, k.z ] as [ number, number ] );
const veb6kekHas2sabo = new Map( haveb6kek.map( k => [ k.x + "," + k.z, k.s2sabo ] ) );
const veb6kekHac2w2q = new Map<string, [ number, number ][]>(
  haveb6kek.map( k => [ k.x + "," + k.z, k.c2w2qa ] ) );

const veb6kekHap2somani = new Map( haveb6kek.map( k => [ k.x + "," + k.z, k.p2somani ] ) );
for ( const k of haveb6kek ) veb6kekHanece3e.set( k.x + "," + k.z, k.hapukxe );

let k6h6L6da = kf2K6h6L6dan(l6da, [ ...qox2n2kHaveb6kek.map(([ x, z ]) =>
  ( { x, z, c2w2qa: [] as [ number, number ][] } )), ...haveb6kek ], tsasatlakak);
const kas2kantaHavop2ni: any[] = [];
for ( let vi = 0o0; vi < s2l2me.length; vi++ ) {
  const k6h6 = s2l2me[ vi ];
  const n2k = k6h6jHacaxlefkakaiHak6h6[ vi ].n2k;
  const c2kanuSefini = k6h6.c2kanuSefini ?? k6h6.sefini;
  let heightFn: ( ( x: number, z: number ) => number ) | undefined;
  let xaha = false;
  if ( pontaj[ vi ] ) {
    const tsekePontaTsasa = kf2PontanAkvanTeston( n2k, c2kanuSefini, tsekeVeraTsasa );
    const tsasaTeru = ( x: number, z: number ): number => {
      if ( !tsekePontaTsasa(x, z) ) return -Infinity;
      return tsasaVem2(x, z) + PONTAKVAKLARANCO;
    };
    const s2qena = vepaqPontanS2qena( n2k, c2kanuSefini, k6h6Teru, tsasaTeru, pontaFinL6da );
    heightFn = ( x, z ) => s2qena.l6da(x, z) - K6H6AKMARL6DA;
    xaha = true;
  }
  kas2kantaHavop2ni.push( { pts: n2k, w: k6h6.sefini / 0o2, hateruni: true, heightFn, xaha } );
}

function tsiikeVeb6kek( x: number, z: number ) {
  let kmaTsiike = null, kmaC2na = Infinity;
  for ( const k of haveb6kek ) {
    const h6kuni = Math.hypot(k.x - x, k.z - z);
    if ( h6kuni < kmaC2na ) { kmaC2na = h6kuni; kmaTsiike = k; }
  }
  return kmaC2na < K6H6ATRUAP2SOMANI ? kmaTsiike : null;
}
const qakaj2jHatoxemani: ReturnType<typeof vepaqQakaj2n>[] = [];
for ( const D of HAQAKAJ2 ) {
  const qakaj2 = vepaqQakaj2n( qena, D.x, D.z, D.s2sabo ?? 0o0, k6h6L6da, tsasaVem2, D.jufu );
  qakaj2jHatoxemani.push(qakaj2);
  if ( qakaj2.capat6aN2kj.length < 0o2 ) continue;
  const s2sabo = D.s2sabo ?? 0o0;
  const landaX = D.x + Math.sin( s2sabo ) * ( D.jufu / 0o2 );
  const landaZ = D.z + Math.cos( s2sabo ) * ( D.jufu / 0o2 );
  const starto = surGrid( pontaFinL6da( landaX, landaZ, qakaj2.kozunuSefini ) );
  const fl6da = starto - qakaj2.landejaY;
  if ( fl6da <= STUPARISERO * 0o1/0o2 ) continue;

  const k2fe = vek2feStupanNombron( fl6da );

  let saxeni = qakaj2.capat6aN2kj[0o0];
  const tlakakani = qakaj2.capat6aN2kj[0o1];
  const veb6kek = tsiikeVeb6kek(landaX, landaZ);
  if ( veb6kek ) {
    const diferencoX = tlakakani[0o0] - veb6kek.x, diferencoZ = tlakakani[0o1] - veb6kek.z;
    const sahakani = Math.hypot(diferencoX, diferencoZ);
    if ( sahakani > K6H6ATRUAP2SOMANI ) {
      const kek = K6H6ATRUAP2SOMANI / sahakani;
      saxeni = [ veb6kek.x + diferencoX * kek, veb6kek.z + diferencoZ * kek ];
    }
  }
  const n2k = kf2StuparajnHan2kn( saxeni, tlakakani, k2fe );
  kas2kantaHavop2ni.push( { pts: n2k, w: qakaj2.kozunuSefini, capat6: true,
    heightFn: kf2StuparanL6da( n2k, starto - K6H6AKMARL6DA, qakaj2.landejaY ),
    mut6qFn: l6da } );

  if ( HAQAKAJ2.indexOf( D ) === 0o0 ) {
    const provL6da = kf2StuparanL6da( n2k, starto - K6H6AKMARL6DA, qakaj2.landejaY );
    console.log( `  ⚑ j͑ʃɹ j͐ʃɹ ŋᷠɔ }ʃꞇ k2fe=${k2fe} j͑ʃᴜ ı],ɔ }ʃꞇ = ${starto.toFixed(0o3)} L6DA=${K6H6AKMARL6DA.toFixed(0o3)} landejaY=${qakaj2.landejaY.toFixed(0o3)}` );
    console.log( `    saxeni=${JSON.stringify(saxeni)} tlakakani=${JSON.stringify(tlakakani)}` );
    for ( let s = 0o0; s <= 0o10; s++ ) {
      const tt = s / 0o10;
      const x = saxeni[0o0] + ( tlakakani[0o0] - saxeni[0o0] ) * tt;
      const z = saxeni[0o1] + ( tlakakani[0o1] - saxeni[0o1] ) * tt;
      console.log( `    t=${tt.toFixed(0o2)} (${x.toFixed(0o2)},${z.toFixed(0o2)}) -> ${provL6da(x,z).toFixed(0o3)}` );
    }
  }
}

const k21eHavop2ni = [ ...qox2n2kHavop2ni, ...kas2kantaHavop2ni ] as
  { pts: [ number, number ][]; w: number }[];
const k21eHaveb6kek = [ ...qox2n2kHaveb6kek, ...veb6kekHan2k ];
const k21eHacaxlefkakaiHak6h6: K6h6CaxlefkakaiK6h6[] = [
  ...qox2n2kHavop2ni.map( d => ( { n2k: d.pts as [ number, number ][], sefini: 0o2 * d.w } ) ),
  ...k6h6jHacaxlefkakaiHak6h6 ];
const haksan2Haknece = tamc2kHakneceElHak6h6(k21eHaveb6kek, k21eHacaxlefkakaiHak6h6);
for ( const k of haveb6kek ) {
  const ca3aq = k.x + "," + k.z;
  const ca1ara = haksan2Haknece.get(ca3aq) ?? [];
  for ( const d of k.c2w2qa )
    if ( !ca1ara.some( u => u[0o0] * d[0o0] + u[0o1] * d[0o1] > 0o1 - 0o1/0o1000 ) ) ca1ara.push(d);
  haksan2Haknece.set(ca3aq, ca1ara);
  k.c2w2qa = ca1ara;
}
for ( const [ ca3aq, ca1ara ] of haksan2Haknece ) veb6kekHac2w2q.set(ca3aq, ca1ara);
k6h6L6da = kf2K6h6L6dan(l6da, k21eHaveb6kek.map(([ x, z ]) =>
  ( { x, z, c2w2qa: haksan2Haknece.get(x + "," + z) ?? [],
    p2somani: veb6kekHap2somani.get(x + "," + z) ?? (0o7/0o10) } )), tsasatlakak);

interface Veb6kekaVop2 {
  x: number; z: number;
  c2w2qa: readonly [ number, number ][];
  hapukxe: [ number, number ] | undefined;
  s2sabo: number;
}
const k21eVeb6kekajHavop2: Veb6kekaVop2[] = [
  ...haveb6kek.map(k => ( { x: k.x, z: k.z, c2w2qa: k.c2w2qa,
    hapukxe: k.hapukxe, s2sabo: k.s2sabo } )),
  ...qox2n2kHaveb6kek.map(([ x, z ]) => ( { x, z,
    c2w2qa: ( haksan2Haknece.get(x + "," + z) ?? [] ) as [ number, number ][],
    hapukxe: veb6kekHanece3e.get(x + "," + z), s2sabo: 0o0 } )) ];

const ne3ak2Ham2rap2 = new Set<THREE.Object3D>(qena.children);
vepaqHak6h6n( qena, [ ...qox2n2kHavop2ni, ...kas2kantaHavop2ni ], k6h6L6da, dioritaPukek, andezitaPukek, k21eHaveb6kek,
  { tsasaFn: tsasatlakak, tamc2kHac2w2q: veb6kekHac2w2q, tamc2kHanece3e: veb6kekHanece3e,
    tamc2kHas2sabo: veb6kekHas2sabo, tamc2kHap2somani: veb6kekHap2somani } );
vepaqIntersekcajnHapa12n( qena, k21eHaveb6kek, k6h6L6da, dioritaPukek, andezitaPukek,
  veb6kekHanece3e, veb6kekHas2sabo, veb6kekHac2w2q, l6da, veb6kekHap2somani );
const kas2kantaHacakamaha = qena.children.filter(o => !ne3ak2Ham2rap2.has(o));
qena.updateMatrixWorld(true);

let kmaEnterigxo = 0o0, enterigxintaj = 0o0, enterigxaQar = "";
for ( const kek of kas2kantaHasoza ) {
  const sahakani = Math.hypot(kek.x2 - kek.x1, kek.z2 - kek.z1);
  if ( sahakani < 0o1 / 0o1000 ) continue;
  const ndx = ( kek.x2 - kek.x1 ) / sahakani, ndz = ( kek.z2 - kek.z1 ) / sahakani;
  for ( const f of [ 0o0, 0o1 / 0o4, 0o1 / 0o2, 0o3 / 0o4, 0o1 ] ) {
    const cx = kek.x1 + ( kek.x2 - kek.x1 ) * f;
    const cz = kek.z1 + ( kek.z2 - kek.z1 ) * f;
    const teru = kek.y0 + ( kek.y1 - kek.y0 ) * f;
    for ( const lat of [ -kek.p2somani, 0o0, kek.p2somani ] ) {
      const px = cx - ndz * lat, pz = cz + ndx * lat;
      const enterigxo = l6da(px, pz) - teru;
      if ( enterigxo > K6H6ABURIL6DALERANCO ) enterigxintaj++;
      if ( enterigxo > kmaEnterigxo ) {
        kmaEnterigxo = enterigxo;
        enterigxaQar = `@${px.toFixed(0o1)},${pz.toFixed(0o1)} j͑ʃɜ ſɭ,ᴜ ${teru.toFixed(0o2)}` +
          ` ſɭɜ ſɭ,w ${l6da(px, pz).toFixed(0o2)}`;
      }
    }
  }
}
console.log(`ſɭэ ֭ſɭэ ɭl̀w ſȷw ɭl̀ᴜ ʌ ſɭɜ ſɭ,w ${kmaEnterigxo.toFixed(0o3)} ${enterigxaQar}` +
  ` ｡ ſᶘᴜ j͐ʃɹ ${enterigxintaj}`);

const malsamaj = [ ...tamc2kHavem2.values() ].filter(n => {
  const hal6da = n.knece.map(b => b.l6da).filter(Number.isFinite);
  return hal6da.length > 0o1 && Math.max(...hal6da) - Math.min(...hal6da) > STUPARISERO;
});
for ( const n of malsamaj.slice(0o0, 0o10) )
  console.log( `ſןᴜ ſᶘɹ ( ${n.x.toFixed(0o1)}, ${n.z.toFixed(0o1)} ) ｡ j͑ʃ'ɔ ŋᷠɹ ${n.l6da.toFixed(0o2)}` +
    ` ｡ ſɭᴜc̗ ɭʃɜ [ ${n.knece.map(b => b.l6da.toFixed(0o2)).join(" ")} ]` );
console.log( `ſןᴜ ſᶘɹ ʌ ſɭᴜc̗ ɭʃɜ ʌ j͐ʃэ ɭ(ᴜ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ${malsamaj.length} / ${tamc2kHavem2.size}` );

const BRAKATOLERO = Math.cos(Math.PI / 0o10);
function havasBrakon( knece: readonly { ux: number; uz: number }[],
  dx: number, dz: number ): boolean {
  const sahakani = Math.hypot(dx, dz);
  if ( sahakani < 0o1/0o100 ) return true;
  const ux = dx / sahakani, uz = dz / sahakani;
  return knece.some(b => b.ux * ux + b.uz * uz > BRAKATOLERO);
}
let mankaj = 0o0;
for ( const k of k21eHaveb6kek ) {
  const knece = kf2Haknece(veb6kekHac2w2q.get(k[0o0] + "," + k[0o1]) ?? [],
    veb6kekHanece3e.get(k[0o0] + "," + k[0o1]), veb6kekHas2sabo.get(k[0o0] + "," + k[0o1]) ?? 0o0,
    veb6kekHap2somani.get(k[0o0] + "," + k[0o1]));
  const hanekexo: string[] = [];
  for ( const d of k21eHavop2ni ) {
    if ( d.pts.length < 0o2 ) continue;

    for ( const [ ei, ni ] of [ [ 0o0, 0o1 ], [ d.pts.length - 0o1, d.pts.length - 0o2 ] ] ) {
      const e = d.pts[ei], n = d.pts[ni];
      if ( !e || !n ) continue;
      if ( Math.hypot(e[0o0] - k[0o0], e[0o1] - k[0o1]) > K6H6ATRUAP2SOMANI ) continue;
      if ( !havasBrakon(knece, n[0o0] - k[0o0], n[0o1] - k[0o1]) )
        hanekexo.push(`ſ̀ȷᴜ ſɭᴜƽ ${e[0o0].toFixed(0o1)},${e[0o1].toFixed(0o1)}→${n[0o0].toFixed(0o1)},${n[0o1].toFixed(0o1)}`);
    }

    for ( let i = 0o0; i < d.pts.length - 0o1; i++ ) {
      const a = d.pts[i], b = d.pts[i + 0o1];
      const vx = b[0o0] - a[0o0], vz = b[0o1] - a[0o1];
      const sahakani2 = vx * vx + vz * vz;
      if ( sahakani2 < 0o10 ** -0o4 ) continue;
      const t = (( k[0o0] - a[0o0] ) * vx + ( k[0o1] - a[0o1] ) * vz) / sahakani2;
      if ( t <= 0o1/0o50 || t >= 0o1 - 0o1/0o50 ) continue;
      const px = a[0o0] + vx * t, pz = a[0o1] + vz * t;
      if ( Math.hypot(px - k[0o0], pz - k[0o1]) > 0o1/0o10 ) continue;
      for ( const [ qx, qz ] of [ [ a[0o0], a[0o1] ], [ b[0o0], b[0o1] ] ] ) {
        if ( !havasBrakon(knece, qx - k[0o0], qz - k[0o1]) )
          hanekexo.push(`ſɭэ ֭ſɭэ ｡ ${qx.toFixed(0o1)},${qz.toFixed(0o1)}`);
      }
    }
  }
  if ( hanekexo.length ) {
    mankaj++;
    console.log(`ſɟɹƽ ( ${k[0o0].toFixed(0o1)}, ${k[0o1].toFixed(0o1)} ) ｡ ſɭᴜc̗ ɭʃɜ ${knece.length} ｡ ` +
      `ſɭэ ֭ſɭэ ʌ ſןɔ ʌ ſɭᴜc̗ ɭʃɜ ${hanekexo.length} ｡ ${hanekexo.slice(0o0,0o6).join(" ")}`);
  }
}
console.log(`ſɟɹƽ ʌ ſןɔ ʌ ſɭᴜc̗ ɭʃɜ ${mankaj} / ${k21eHaveb6kek.length}`);

function atenduKovron( x: number, z: number, knece: readonly { ux: number; uz: number }[] ): boolean {
  if ( Math.hypot(x, z) <= K6H6AEKSTERAP2SOMANI - 0.02 ) return true;
  for ( const b of knece ) {
    const m6na = x * b.ux + z * b.uz;
    const flanka = Math.abs(-x * b.uz + z * b.ux);
    if ( m6na >= 0o0 && m6na <= K6H6ATRUAP2SOMANI - 0.02
      && flanka <= K6H6AEKSTERAP2SOMANI - 0.02 ) return true;
  }
  return false;
}

const rc = new THREE.Raycaster();

function mezuY( x: number, z: number ): number | null {
  rc.set( new THREE.Vector3(x, 0o120, z), new THREE.Vector3(0o0, -0o1, 0o0) );
  const h = rc.intersectObjects( kas2kantaHacakamaha, true ).find( x2 => x2.object.visible );
  return h ? h.point.y : null;
}
console.log("\n⟪ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ʌ ſɭᴜc̗ ɭʃɜ 🚢 ⟫");
for ( const D of HAQAKAJ2 ) {
  const r = D.s2sabo ?? 0o0, cosR = Math.cos(r), sinR = Math.sin(r);
  const prof = D.jufu ?? 0o14;
  const wx = ( lx: number, lz: number ) => D.x + cosR * lx + sinR * lz;
  const wz = ( lx: number, lz: number ) => D.z - sinR * lx + cosR * lz;
  const x2pa: string[] = [];
  let ne3ak2 = NaN, maksSl6da = 0o0, qarSl6da = "";
  for ( let lz = prof / 0o2 + 0o3; lz >= -prof / 0o2 - 0o1; lz -= 0o1/0o4 ) {
    const y = mezuY( wx(0o0, lz), wz(0o0, lz) );
    const tsasa = tsekeVeraTsasa( wx(0o0, lz), wz(0o0, lz) );
    const t = ( y === null ? "--" : y.toFixed(0o2) ) + ( tsasa ? "≈" : " " );
    x2pa.push(`${lz.toFixed(0o1)}:${t}`);
    if ( y !== null && Number.isFinite(ne3ak2) ) {
      const sl6da = ne3ak2 - y;
      if ( sl6da > maksSl6da ) { maksSl6da = sl6da; qarSl6da = `${lz.toFixed(0o1)}`; }
    }
    ne3ak2 = y ?? NaN;
  }
  const qakaj2 = HAQAKAJ2.indexOf(D);
  const dokObj = qakaj2jHatoxemani[qakaj2];
  console.log(`ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ${qakaj2} @(${D.x.toFixed(0o1)},${D.z.toFixed(0o1)}) ｡ ſɭэ }ʃᴜ ${prof} ｡ ſɭᴜc̗ ɭʃɜ`);
  console.log(`  ᶅſɔ ɽ͑ʃ'ɔ ʌ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ kozunuY=${dokObj.kozunuY.toFixed(0o3)} landejaY=${dokObj.landejaY.toFixed(0o3)} ` +
    `kozunuSefini=${dokObj.kozunuSefini.toFixed(0o2)} kozunuJufu=${dokObj.kozunuJufu.toFixed(0o2)}`);
  console.log(`  haqaroxema: ` + dokObj.haqaroxema.map((s: any) => `y=${s.y.toFixed(0o3)}@(lz=${s.lz.toFixed(0o2)},d=${s.d.toFixed(0o2)})`).join(" "));
  console.log("  " + x2pa.join(" "));
  console.log(`  j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ʌ ſɭᴜc̗ ɭʃɜ ${maksSl6da.toFixed(0o2)} @lz=${qarSl6da}`);
  const x2pa2: string[] = [];
  let ne3ak22 = NaN, maksSl6da2 = 0o0, qar = "";
  for ( let lx = -0o4; lx <= 0o4; lx += 0o1/0o4 ) {
    const y = mezuY( wx(lx, prof / 0o2), wz(lx, prof / 0o2) );
    x2pa2.push(`${lx.toFixed(0o1)}:${y === null ? "--" : y.toFixed(0o2)}`);
    if ( y !== null && Number.isFinite(ne3ak22) ) {
      const sl6da = Math.abs(y - ne3ak22);
      if ( sl6da > maksSl6da2 ) { maksSl6da2 = sl6da; qar = `${lx.toFixed(0o1)}`; }
    }
    ne3ak22 = y ?? NaN;
  }
  console.log("  j͑ʃɔ ſȷꞇ }ʃꞇ ʌ ᶅſэ ſ͕ɭᴜ ｡ " + x2pa2.join(" "));
  console.log(`  j͑ʃɔ ſȷꞇ }ʃꞇ ʌ ſɭᴜc̗ ɭʃɜ ɭl̀ᴜ ${maksSl6da2.toFixed(0o2)} @lx=${qar}`);
}

{
  const mezuL2ha = ( x: number, z: number ): number | null => {
    rc.set( new THREE.Vector3(x, 0o120, z), new THREE.Vector3(0o0, -0o1, 0o0) );
    const h = rc.intersectObjects( qena.children, true ).find( x2 => x2.object.visible );
    return h ? h.point.y : null;
  };
  const D = HAQAKAJ2[0o0];
  const r = D.s2sabo ?? 0o0, cosR = Math.cos(r), sinR = Math.sin(r);
  const wx = ( lx: number, lz: number ) => D.x + cosR * lx + sinR * lz;
  const wz = ( lx: number, lz: number ) => D.z - sinR * lx + cosR * lz;
  const x2pa: string[] = [];
  for ( let lz = 0o13; lz >= -0o11; lz -= 0o1/0o4 ) {
    const y = mezuL2ha( wx(0o0, lz), wz(0o0, lz) );
    x2pa.push(`${lz.toFixed(0o1)}:${y === null ? "--" : y.toFixed(0o2)}`);
  }
  console.log("  ſɭᴜc̗ ɭʃɜ ʌ ſɭɹ ſᶘɔ ｡ " + x2pa.join(" "));
}

console.log("\n⟪ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ j͑ʃ'ɔ ŋᷠɹ ɔ ʌ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ 🔬 ⟫");
{
  const D = HAQAKAJ2[0o0];
  const r = D.s2sabo ?? 0o0, cosR = Math.cos(r), sinR = Math.sin(r);
  const wx = ( lx: number, lz: number ) => D.x + cosR * lx + sinR * lz;
  const wz = ( lx: number, lz: number ) => D.z - sinR * lx + cosR * lz;
  for ( const [ lx, lz ] of [ [ 0o0, 0o10 ], [ 0o0, 0o0 ], [ 0o0, -0o4 ] ] as [ number, number ][] ) {
    rc.set( new THREE.Vector3(wx(lx, lz), 0o120, wz(lx, lz)), new THREE.Vector3(0o0, -0o1, 0o0) );
    const hs = rc.intersectObjects( kas2kantaHacakamaha, true ).filter( h => h.object.visible );
    const ys = hs.map( h => h.point.y.toFixed(0o3) ).join(", ");
    console.log(`  (lx=${lx},lz=${lz}) -> [${ys}]`);
  }
}

const raporto: string[] = [];
let provitaj = 0o0;
for ( const k of haveb6kek ) {
  const knece = kf2Haknece(k.c2w2qa, k.hapukxe, k.s2sabo);
  const hanekexo: string[] = [];
  for ( let a = 0o0; a < 0o40; a++ ) {
    const ang = a * Math.PI * 0o2 / 0o40;
    for ( const r of [ (0o1/0o2), 0o1, 1.4, 1.8, 2.05 ] ) {
      const x = k.x + Math.cos(ang) * r, z = k.z + Math.sin(ang) * r;
      if ( !atenduKovron(x - k.x, z - k.z, knece) ) continue;
      provitaj++;
      rc.set( new THREE.Vector3(x, 0o74, z), new THREE.Vector3(0o0, -0o1, 0o0) );
      const h = rc.intersectObjects( kas2kantaHacakamaha, true );
      if ( !h.find( x2 => x2.object.visible ) ) hanekexo.push( `${(ang * 0o264 / Math.PI).toFixed(0o0)}°/${r}` );
    }
  }
  if ( hanekexo.length > 0o0 )
    raporto.push( `ſɟɹƽ ( ${k.x.toFixed(0o2)}, ${k.z.toFixed(0o2)} ) ｡ ſ͕ɭᴜ ſ͕ɭw }ʃɹ ${hanekexo.length} ｡ ${hanekexo.slice(0o0,0o12).join(" ")}` );
}
for ( const r of raporto ) console.log( r );
console.log( `ſɟɹƽ ʌ ſɭɹ ſᶘɔ ${haveb6kek.length} ｡ ſᶘᴜ j͐ʃɹ ${provitaj} ｡ ſ͕ɭᴜ ſ͕ɭw }ʃɹ ${raporto.length}` );

const PASHO = 0o1/0o10;
const SL6DATOLERO = 0o1/0o200;

const DEKALO = 0o1/0o20;

interface Elirejo { x: number; z: number; ux: number; uz: number }
const elirejoj = new Map<string, Elirejo[]>();
for ( const d of k21eHavop2ni ) {
  if ( d.pts.length < 0o2 ) continue;
  for ( const [ ei, ni ] of [ [ 0o0, 0o1 ], [ d.pts.length - 0o1, d.pts.length - 0o2 ] ] ) {
    const e = d.pts[ ei ], n = d.pts[ ni ];
    if ( !e || !n ) continue;
    const sahakani = Math.hypot(e[0o0] - n[0o0], e[0o1] - n[0o1]);
    if ( sahakani < 0o1/0o100 ) continue;
    let plosteq: [ number, number ] | null = null, dist = Infinity;
    for ( const k of k21eHaveb6kek ) {
      const dd = Math.hypot(e[0o0] - k[0o0], e[0o1] - k[0o1]);
      if ( dd < dist ) { dist = dd; plosteq = k; }
    }
    if ( !plosteq || dist > K6H6ATRUAP2SOMANI ) continue;
    const ca3aq = plosteq[0o0] + "," + plosteq[0o1];
    const ca1ara = elirejoj.get(ca3aq) ?? [];
    const ux = ( e[0o0] - n[0o0] ) / sahakani, uz = ( e[0o1] - n[0o1] ) / sahakani;
    if ( !ca1ara.some(b => b.ux * ux + b.uz * uz > 0o1 - 0o1/0o100 ) )
      ca1ara.push({ x: plosteq[0o0], z: plosteq[0o1], ux, uz });
    elirejoj.set(ca3aq, ca1ara);
  }
}
let tutaSl6da = 0o0;
let hapu3ohk2 = 0o0;
for ( const k of k21eVeb6kekajHavop2 ) {
  const elirejo = elirejoj.get(k.x + "," + k.z);
  if ( !elirejo || elirejo.length === 0o0 ) continue;
  let sl6daMaks = 0o0, qarMaks = "";
  const sinpanao: string[] = [];
  for ( const b of elirejo ) {
    sinpanao.push("|");
    let ne3ak2 = NaN;
    for ( let r = DEKALO; r <= K6H6ATRUAP2SOMANI + 0o4; r += PASHO ) {
      rc.set( new THREE.Vector3(k.x + b.ux * r, 0o74, k.z + b.uz * r),
        new THREE.Vector3(0o0, -0o1, 0o0) );
      const h = rc.intersectObjects( kas2kantaHacakamaha, true ).find( x => x.object.visible );
      if ( !h ) { ne3ak2 = NaN; sinpanao.push(`${r.toFixed(0o1)}:-`); continue; }
      sinpanao.push(`${r.toFixed(0o1)}:${h.point.y.toFixed(0o2)}`);
      if ( Number.isFinite(ne3ak2) ) {
        const sl6da = Math.abs(h.point.y - ne3ak2);
        if ( sl6da > sl6daMaks ) {
          sl6daMaks = sl6da;
          qarMaks = `${( k.x + b.ux * r ).toFixed(0o1)},${( k.z + b.uz * r ).toFixed(0o1)}`;
        }
      }
      ne3ak2 = h.point.y;
    }
  }
  if ( sl6daMaks > tutaSl6da ) tutaSl6da = sl6daMaks;
  const pu3ohk2 = sl6daMaks > STUPARISERO + SL6DATOLERO;
  if ( pu3ohk2 ) {
    hapu3ohk2++;
    console.log( `ſɟɹƽ ( ${k.x.toFixed(0o1)}, ${k.z.toFixed(0o1)} ) ｡ j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ` +
      `${sl6daMaks.toFixed(0o3)} @${qarMaks}  ⚠ ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ ſᶘɔ j͐ʃɹ j͑ʃᴜꞇ` );
    console.log( "  " + sinpanao.join(" ") );
  }
}
console.log( `ſɟɹƽ ʌ j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ${hapu3ohk2} ｡ j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ʌ ᶅſэ ſ͕ɭᴜ ${tutaSl6da.toFixed(0o3)} ｡ ſןͷ̗ɜ j͑ʃƨɔȝ ${STUPARISERO.toFixed(0o3)}` +
  ( tutaSl6da > STUPARISERO + SL6DATOLERO ? "  ſ̀ȷᴜ̩ ſɭɹ }ʃꞇ" : "" ) );

const kozunu = kf2BazanK6h6L6dan(l6da);
for ( const [ gx, gz ] of [ [ 0o70, -0o44 ], [ 0o65, -0o44 ]] ) {
  console.log(`\nſɭɜ ſɭ,w ${gx},${gz}`);
  for ( let dz = -0o3; dz <= 0o3; dz += 0o1/0o2 ) {
    const x2pa: string[] = [];
    for ( let dx = -0o3; dx <= 0o3; dx += 0o1/0o2 )
      x2pa.push(l6da(gx + dx, gz + dz).toFixed(0o2).padStart(0o6));
    console.log("  " + x2pa.join(" "));
  }
  const x2pa2: string[] = [];
  for ( let dx = -0o3; dx <= 0o3; dx += 0o1/0o2 ) x2pa2.push(kozunu(gx + dx, gz).toFixed(0o2).padStart(0o6));
  console.log("  ſɭɜ ſɭ,w ʌ ɭl̀ᴜȝ ſןᴜ ɭʃɔ x ｡ " + x2pa2.join(" "));
}
for ( const [ qx, qz ] of [ [ 0o54, -0o44 ], [ 0o70, -0o44 ], [ 0o104, -0o140 ], [ 0o134, -0o74 ], [ 0o65, -0o44 ]] ) {
  const knece = kf2Haknece(veb6kekHac2w2q.get(qx + "," + qz) ?? [],
    veb6kekHanece3e.get(qx + "," + qz), veb6kekHas2sabo.get(qx + "," + qz) ?? 0o0,
    veb6kekHap2somani.get(qx + "," + qz));
  const b6qaiQafej2 = tamc2kTap2L6da(qx, qz, knece, k6h6L6da);
  const deBaza = k6h6TeruDeVeb6kek(qx, qz, knece.map(b => [ b.ux, b.uz ] as [ number, number ]),
    K6H6AEKSTERAP2SOMANI, kozunu).hateru;
  console.log(`\nſןᴜ ſᶘɹ ${qx},${qz} ｡ ſɭɜ ſɭ,w ${l6da(qx, qz).toFixed(0o2)} ｡ ɭl̀ᴜȝ ſןᴜ ɭʃɔ ${kozunu(qx, qz).toFixed(0o2)} ` +
    `ſןͷ̗ɜ j͑ʃƨɔȝ ʌ ſɭɜ ſɭ,w ${deBaza.toFixed(0o2)} ｡ ᶅſɔ ɽ͑ʃ'ɔ ${k6h6L6da(qx, qz).toFixed(0o2)} ` +
    `ſןᴜ ſᶘɹ ${b6qaiQafej2.toFixed(0o2)} ｡ ſɭᴜc̗ ɭʃɜ ${knece.map(b => `${b.ux.toFixed(0o2)}/${b.uz.toFixed(0o2)}`).join(" ")}`);
  for ( const [ ox, oz ] of [ [ 1, 0 ], [ -1, 0 ], [ 0, 1 ], [ 0, -1 ]] ) {
    const x2pa: string[] = [];
    for ( let r = 0; r <= 6; r++ ) {
      const px = qx + ox * r, pz = qz + oz * r;
      x2pa.push(`${r} ｡ ſɭɜ ſɭ,w ${l6da(px, pz).toFixed(0o1)} / ᶅſɔ ɽ͑ʃ'ɔ ${k6h6L6da(px, pz).toFixed(1)}`);
    }
    console.log("  " + ( ox ? "x" : "z" ) + ( ox + oz > 0o0 ? "+" : "-" ) + " " + x2pa.join(" "));
  }
}

const dikoj: number[] = [];
for ( const [ kx, kz ] of k21eHaveb6kek ) {
  const knece = kf2Haknece(veb6kekHac2w2q.get(kx + "," + kz) ?? [],
    veb6kekHanece3e.get(kx + "," + kz), veb6kekHas2sabo.get(kx + "," + kz) ?? 0o0,
    veb6kekHap2somani.get(kx + "," + kz));
  const vem2 = tamc2kTap2Vem2(kx, kz, knece, k6h6L6da);
  let dika = 0o0;
  for ( let i = 0o0; i < 0o20; i++ ) {
    const tafkaq = i * Math.PI * 0o2 / 0o20;
    const r = K6H6ATRUAP2SOMANI;
    const kma = tap2L6daJe(vem2, tafkaq);
    const mut6q = l6da(kx + Math.cos(tafkaq) * r, kz + Math.sin(tafkaq) * r);
    dika = Math.max(dika, kma - mut6q);
  }
  dikoj.push(Math.max(ANGULATSALETSALIRO, dika + ANGULATSALETSALIRO));
}
dikoj.sort(( p, q ) => q - p);
console.log(`ſןᴜ ſᶘɹ ʌ ſɭɜʞ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${STUPARISERO.toFixed(0o1)} ｡ ${dikoj.filter(v => v > STUPARISERO).length}` +
  ` / ${dikoj.length} ｡ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${dikoj[0o0].toFixed(0o2)} ｡ ſȷƽᴜ ɭʃᴜ ` +
  `${( dikoj.reduce(( p, q ) => p + q, 0o0 ) / dikoj.length ).toFixed(0o2)} ｡ ɭl̀ᴜ ʌ ꞙɭıɿ ` +
  dikoj.slice(0o0, 0o12).map(v => v.toFixed(0o1)).join(" ") );

const FLOSALIMO = 0o1/0o2;
const FLOSAVIDEBA = 0o1 + 0o1/0o2;
let flosantaj = 0o0, hakix2 = 0o0, flosoMaks = 0o0, flosoQar = "";
const kmaFlosantaj: { f: number; x: number; z: number; d: number }[] = [];
for ( const d of k21eHavop2ni ) {
  if ( d.pts.length < 0o2 ) continue;
  for ( let i = 0o0; i < d.pts.length - 0o1; i++ ) {
    const a = d.pts[ i ], b = d.pts[ i + 0o1 ];
    const sahakani = Math.hypot(b[0o0] - a[0o0], b[0o1] - a[0o1]);
    const tonaj = Math.max(0o1, Math.ceil(sahakani));
    for ( let j = 0o0; j <= tonaj; j++ ) {
      const t = j / tonaj;
      const x = a[0o0] + ( b[0o0] - a[0o0] ) * t, z = a[0o1] + ( b[0o1] - a[0o1] ) * t;
      rc.set( new THREE.Vector3(x, 0o120, z), new THREE.Vector3(0o0, -0o1, 0o0) );
      const h = rc.intersectObjects( kas2kantaHacakamaha, true ).find( x2 => x2.object.visible );
      if ( !h ) continue;
      const floso = h.point.y - l6da(x, z);
      if ( floso > flosoMaks ) { flosoMaks = floso; flosoQar = `${x.toFixed(0o1)},${z.toFixed(0o1)}`; }
      if ( floso > FLOSALIMO ) flosantaj++;
      if ( floso > FLOSAVIDEBA ) {
        hakix2++;
        let dVeb6kek = Infinity;
        for ( const k of k21eHaveb6kek ) dVeb6kek = Math.min(dVeb6kek, Math.hypot(k[0o0] - x, k[0o1] - z));
        kmaFlosantaj.push({ f: floso, x, z, d: dVeb6kek });
      }
    }
  }
}
kmaFlosantaj.sort(( p, q ) => q.f - p.f );
console.log( `ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ ſᶘɔ j͐ʃɹ j͑ʃᴜꞇ ʌ ſɭᴜc̗ ɭʃɜ > ${FLOSALIMO} ｡ ${flosantaj} ſᶘᴜ j͐ʃɹ ｡ > ${FLOSAVIDEBA} ｡ ${hakix2}` +
  ` ｡ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${flosoMaks.toFixed(0o2)} @${flosoQar}` +
  ( flosoMaks > FLOSAVIDEBA ? "  ſ̀ȷᴜ̩" : "" ) );
for ( const f of kmaFlosantaj.slice(0o0, 0o10 ) )
  console.log( `  ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ ſᶘɔ j͐ʃɹ j͑ʃᴜꞇ ${f.f.toFixed(0o2)} @${f.x.toFixed(0o1)},${f.z.toFixed(0o1)}` +
    ` ｡ ſןᴜ ſᶘɹ ʌ ſᶘɹ ſɭɔ ${f.d.toFixed(0o1)}` );

const ankrojNivelaj = k21eHaveb6kek.map(([ x, z ]) => {
  const knece = kf2Haknece(veb6kekHac2w2q.get(x + "," + z) ?? [], veb6kekHanece3e.get(x + "," + z),
    veb6kekHas2sabo.get(x + "," + z) ?? 0o0, veb6kekHap2somani.get(x + "," + z));
  return { x, z, l6da: tamc2kTap2L6da(x, z, knece, k6h6L6da),
    vem2: tamc2kTap2Vem2(x, z, knece, k6h6L6da) };
});
const havem2: { vop2ni: { pts: [ number, number ][]; w: number }; s2qena: any }[] = [];
for ( const d of k21eHavop2ni as { pts: [ number, number ][]; w: number;
  heightFn?: unknown; xaha?: boolean }[] ) {
  if ( d.pts.length < 0o2 || d.heightFn || d.xaha ) continue;
  havem2.push( { vop2ni: d, s2qena: kf2NivelanS2qena(d.pts, k6h6SefiniP2somani( 0o2 * d.w ),
    k6h6L6da, tsasatlakak, ankrojNivelaj) } );
}
let vem2jRompoj = 0o0;
for ( const { vop2ni, s2qena } of havem2 ) {
  let maks = 0o0, raqa = 0o0, ne3ak2 = NaN;
  for ( let i = 0o0; i < s2qena.hal6da.length; i++ ) {
    const a = s2qena.hal6da[ i ];
    if ( Number.isFinite(ne3ak2) && Math.abs(a - ne3ak2) > maks ) {
      maks = Math.abs(a - ne3ak2);
      raqa = s2qena.haxekuxa[ i ];
    }
    ne3ak2 = a;
  }
  if ( maks > STUPARISERO + SL6DATOLERO ) {
    vem2jRompoj++;
    const p = n2kJe(vop2ni.pts, raqa);
    console.log(`j͑ʃ'ɔ ŋᷠɹ ʌ ſɭэ ֭ſɭэ ɭl̀ᴜ ${maks.toFixed(0o3)} @${p.x.toFixed(0o1)},${p.z.toFixed(0o1)}` +
      ` s=${raqa.toFixed(0o1)} / ${s2qena.length.toFixed(0o1)} ⚠`);
  }
}
console.log(`j͑ʃ'ɔ ŋᷠɹ ʌ ſɭэ ֭ſɭэ ɭl̀ᴜ ${vem2jRompoj} / ${havem2.length}` +
  ( vem2jRompoj > 0o0 ? "  ſ̀ȷᴜ̩ ſɭɹ }ʃꞇ" : "" ));

if ( process.env.KKSONDO ) {
  const hakxawa = [ [ -0o34, -0o140 ], [ 0o104, -0o44 ] ];
  console.log(`\nſןᴜ ſᶘɹ ʌ ſɭᴜc̗ ɭʃɜ ʌ ſɭɹ ſᶘɔ`);
  for ( let i = 0o0; i < k21eHaveb6kek.length; i++ ) {
    const [ kx, kz ] = k21eHaveb6kek[ i ];
    const knece = kf2Haknece(veb6kekHac2w2q.get(kx + "," + kz) ?? [],
      veb6kekHanece3e.get(kx + "," + kz), veb6kekHas2sabo.get(kx + "," + kz) ?? 0o0,
      veb6kekHap2somani.get(kx + "," + kz));
    if ( knece.length < 0o3 ) continue;
    console.log(`  (${kx.toFixed(0o1)},${kz.toFixed(0o1)}) ｡ ſɭᴜc̗ ɭʃɜ ${knece.length} l6da=${ankrojNivelaj[ i ].l6da.toFixed(0o2)}` +
      ` ｡ ſɭɜ ſɭ,w=${l6da(kx, kz).toFixed(0o2)}` +
      ` ｡ ſɟɹ ᶅſɹȝ ${knece.map(b => `${b.ux.toFixed(0o2)}/${b.uz.toFixed(0o2)}`).join(" ")}`);
  }
  for ( const [ tx, tz ] of hakxawa ) {
    console.log(`\n}ʃᴜ j͐ʃᴜ ${tx},${tz}`);
    for ( const a of ankrojNivelaj ) {
      const d = Math.hypot(a.x - tx, a.z - tz);
      if ( d > 0o24 ) continue;
      console.log(`    ſןᴜ ſᶘɹ (${a.x.toFixed(0o1)},${a.z.toFixed(0o1)}) l6da=${a.l6da.toFixed(0o2)} d=${d.toFixed(0o2)}`);
    }
    for ( const { vop2ni, s2qena } of havem2 ) {
      let plosteq = -1, dist = Infinity;
      for ( let i = 0; i < s2qena.haxekuxa.length; i++ ) {
        const p = n2kJe(vop2ni.pts, s2qena.haxekuxa[ i ]);
        const d = Math.hypot(p.x - tx, p.z - tz);
        if ( d < dist ) { dist = d; plosteq = i; }
      }
      if ( plosteq < 0 || dist > 1.2 ) continue;
      const p = n2kJe(vop2ni.pts, s2qena.haxekuxa[ plosteq ]);
      console.log(`  ſɭэ ֭ſɭэ ${vop2ni.pts.length} ｡ }ʃɹƽ w=${vop2ni.w} ｡ ſᶘɹ ſɭɔ ${dist.toFixed(0o2)} i=${plosteq}` +
        ` s=${s2qena.haxekuxa[ plosteq ].toFixed(0o2)}/${s2qena.length.toFixed(1)}` +
        ` ｡ ſ̀ȷᴜ ſɭᴜƽ ${JSON.stringify(vop2ni.pts[ 0o0 ])}→${JSON.stringify(vop2ni.pts[ vop2ni.pts.length - 0o1 ])}`);
      for ( let k = Math.max(0o0, plosteq - 0o10); k <= Math.min(s2qena.hal6da.length - 0o1, plosteq + 0o10); k++ ) {
        const q = n2kJe(vop2ni.pts, s2qena.haxekuxa[ k ]);
        let psaz = -Infinity, teru = Infinity;
        for ( const a of ankrojNivelaj ) {
          const d = Math.hypot(q.x - a.x, q.z - a.z);
          const deRando = 0o1 * Math.max(0o0, d - K6H6ATRUAP2SOMANI);
          if ( a.l6da - deRando > psaz ) psaz = a.l6da - deRando;
          if ( a.l6da + deRando < teru ) teru = a.l6da + deRando;
        }
        console.log(`    i=${k} s=${s2qena.haxekuxa[ k ].toFixed(0o2)} (${q.x.toFixed(0o1)},${q.z.toFixed(0o1)})` +
          ` natakatomasai=${s2qena.hakxawa[ k ].toFixed(0o3)} l6da=${s2qena.hal6da[ k ].toFixed(0o3)}` +
          ` ｡ ᶅſɔ ɽ͑ʃ'ɔ = ${k6h6L6da(q.x, q.z).toFixed(0o3)} ｡ ſɭɜ ſɭ,w=${l6da(q.x, q.z).toFixed(0o3)}` +
          ` sost2=${s2qena.centraj[ k ].toFixed(0o3)} xaha=${s2qena.glataj[ k ].toFixed(0o3)}` +
          ` psaz=${psaz.toFixed(0o2)} teru=${teru.toFixed(0o2)}`);
      }
    }
  }
}

const hab6qaiQafej2 = new Map<string, ReturnType<typeof tamc2kTap2Vem2>>();
for ( const [ kx, kz ] of k21eHaveb6kek )
  hab6qaiQafej2.set(kx + "," + kz, tamc2kTap2Vem2(kx, kz,
    kf2Haknece(veb6kekHac2w2q.get(kx + "," + kz) ?? [], veb6kekHanece3e.get(kx + "," + kz),
      veb6kekHas2sabo.get(kx + "," + kz) ?? 0o0, veb6kekHap2somani.get(kx + "," + kz)), k6h6L6da));
let celajRompoj = 0o0, celajMaks = 0o0, celajQar = "";
const celajHax2pa: string[] = [];
for ( const { vop2ni, s2qena } of havem2 ) {
  let maks = -Infinity, catlaqMaks = "";
  for ( let i = 0o0; i < s2qena.hal6da.length; i++ ) {
    const p = n2kJe(vop2ni.pts, s2qena.haxekuxa[ i ]);
    for ( const [ kx, kz ] of k21eHaveb6kek ) {
      const d = Math.hypot(p.x - kx, p.z - kz);
      if ( d < K6H6ATRUAP2SOMANI - 0.05 || d > K6H6ATRUAP2SOMANI + 0.6 ) continue;
      const vem2 = hab6qaiQafej2.get(kx + "," + kz);
      const b6qaiQafej2 = vem2
        ? tap2L6daJe(vem2, Math.atan2(p.z - kz, p.x - kx))
        : 0o0;
      const dif = s2qena.hakxawa[ i ] - b6qaiQafej2;
      if ( dif > maks ) { maks = dif; catlaqMaks = `${kx},${kz}`; }
    }
  }
  if ( maks > STUPARISERO + SL6DATOLERO ) {
    celajRompoj++;
    if ( maks > celajMaks ) { celajMaks = maks; celajQar = catlaqMaks; }
    if ( celajHax2pa.length < 0o10 )
      celajHax2pa.push(`ſɭэ ֭ſɭэ ʌ j͑ʃ'ɔ ŋᷠɹ ɭl̀ᴜ ${maks.toFixed(0o2)} ｡ ſןᴜ ſᶘɹ ${catlaqMaks}`);
  }
}
for ( const v of celajHax2pa ) console.log("  " + v);
console.log(`ſɭэ ֭ſɭэ ʌ j͑ʃ'ɔ ŋᷠɹ ɭl̀ᴜ ʌ ᶅſэ ſ͕ɭᴜ ${celajRompoj} / ${havem2.length} ｡ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ` +
  `${celajMaks.toFixed(0o2)} @${celajQar}` + ( celajRompoj > 0o0 ? "  ſ̀ȷᴜ̩ ſɭɹ }ʃꞇ" : "" ));}
