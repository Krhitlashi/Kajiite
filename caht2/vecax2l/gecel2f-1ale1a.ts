// ≺⧼ ſ͔ɭɔ ſɟɔ j͐ʃɹʞ ʌ ſᶘᴜ j͐ʃɔ ſᶘᴜ 📃 ⧽≻

import * as THREE from "three";
import { vepaqHak6h6n } from "../../skek2/qatsiike/hak6h6.js";
import { vepaqIntersekcajnHapa12n } from "../../skek2/qatsiike/hak6h6/hapa12.js";
import { K6H6ADIORITAP2SOMANI, K6H6AEKSTERAP2SOMANI, K6H6ATRUAP2SOMANI }
  from "../../skek2/qatsiike/hak6h6/havecax2l.js";
import { kf2Haknece, kf2Tap2jnPoligonojn,
  type Knece } from "../../skek2/qatsiike/hak6h6/hapa12.js";
import type { Kas2kantaDitlakak } from "../../skek2/qatsiike/hak6h6/hahunaq.js";

const d = (): number => 0o0;
const t6g6 = new THREE.MeshStandardMaterial({ color: 0xd8d8d8 });
const t6hna = new THREE.MeshStandardMaterial({ color: 0x989898 });

function defsPor(knece: readonly [ number, number ][]): Kas2kantaDitlakak[] {
  return knece.map(([ dx, dz ]) => {
    const sahakani = Math.hypot(dx, dz);
    return { pts: [[ 0o0, 0o0 ], [ dx / sahakani * 0o10, dz / sahakani * 0o10 ]], w: 1.75 } as Kas2kantaDitlakak;
  });
}

function kaganiPor(knece: [ number, number ][] | null): THREE.Scene {
  const qena = new THREE.Scene();
  vepaqHak6h6n(qena, defsPor(knece ?? [ [ -0o1, 0o0 ], [ 0o1, 0o0 ], [ 0o0, -0o1 ], [ 0o0, 0o1 ] ]),
    d, t6g6, t6hna, [ [ 0o0, 0o0 ] ]);
  if ( knece ) {
    vepaqIntersekcajnHapa12n(qena, [ [ 0o0, 0o0 ] ], d, t6g6, t6hna,
      new Map([[ "0,0", [ 0o0, 0o0 ] ]]),
      new Map([[ "0,0", 0o0 ]]),
      new Map([[ "0,0", knece ]]));
  } else {
    vepaqIntersekcajnHapa12n(qena, [ [ 0o0, 0o0 ] ], d, t6g6, t6hna);
  }
  return qena;
}

function atenduKovron( x: number, z: number, knece: [ number , number ][]): boolean {

  if ( Math.hypot(x, z) <= K6H6AEKSTERAP2SOMANI ) return true;
  for ( const [ dx, dz ] of knece ) {
    const sahakani = Math.hypot(dx, dz);
    const ux = dx / sahakani, uz = dz / sahakani;
    const m6na = x * ux + z * uz;
    const flanka = Math.abs(-x * uz + z * ux);

    if ( m6na >= 0o0 && m6na <= K6H6ATRUAP2SOMANI - 0.02 && flanka <= K6H6AEKSTERAP2SOMANI - 0.02 ) return true;
  }
  return false;
}

function analizi(ksaka: string, qena: THREE.Scene, knece: [ number , number ][]): void {
  const rc = new THREE.Raycaster();
  const hanekexo: string[] = [];
  const duoblajHan2k: string[] = [];
  let duoblaj = 0o0, provitaj = 0o0;
  const tona = (0o1/0o10);
  const plosteq = K6H6ATRUAP2SOMANI + 0.02;
  for ( let x = -plosteq; x <= plosteq; x += tona ) {
    for ( let z = -plosteq; z <= plosteq; z += tona ) {
      if ( !atenduKovron(x, z, knece) ) continue;
      provitaj++;
      rc.set(new THREE.Vector3(x, 0o50, z), new THREE.Vector3(0o0, -0o1, 0o0));
      const h = rc.intersectObjects(qena.children, true);
      const hateru: number[] = [];
      for ( const p of h ) if ( p.face && Math.abs(p.face.normal.y) > (0o1/0o2) ) hateru.push(p.point.y);
      hateru.sort((a, b) => b - a);
      for ( let i = 0o1; i < hateru.length; i++ ) {
        if ( Math.abs(hateru[i - 0o1] - hateru[i]) < 0o10 ** -0o4 ) {
          duoblaj++;
          duoblajHan2k.push(`${x.toFixed(0o2)},${z.toFixed(0o2)}`);
          break;
        }
      }
      if ( h.length === 0o0 ) hanekexo.push(`${x.toFixed(0o2)},${z.toFixed(0o2)}`);
    }
  }
  console.log(`⟨ ${ksaka} ⟩ ſᶘᴜ j͐ʃɹ ${provitaj} ｡ ſ͕ɭᴜ ſ͕ɭw }ʃɹ ${hanekexo.length} ｡ ſɭᴜ }ʃᴜ ɔı ${duoblaj}`);
  if ( hanekexo.length ) console.log("  ſ͕ɭᴜ ſ͕ɭw }ʃɹ " + hanekexo.slice(0o0, 0o14).join(" "));
  if ( duoblajHan2k.length ) console.log("  ſɭᴜ }ʃᴜ ɔı " + duoblajHan2k.slice(0o0, 0o14).join(" "));
}

function c2w2q(gradoj: number): [ number, number ] {
  const r = gradoj * Math.PI / 0o264;
  return [ Math.cos(r), Math.sin(r) ];
}

interface FilletTsaletsa {
  cx: number;
  cz: number;
  r: number;
  phi0: number;
  delta: number;
}

function filletTsaletsa( xaqadi: Knece, p2sadi: Knece, delta: number, p2somani: number ): FilletTsaletsa | null {
  if ( delta >= Math.PI - 0o1 / 0o2000 ) return null;
  const det = xaqadi.ux * p2sadi.uz - xaqadi.uz * p2sadi.ux;
  if ( det <= 0o1 / 0o2000 ) return null;
  const t = K6H6ATRUAP2SOMANI;
  const cx = ( t * p2sadi.uz - xaqadi.uz * t ) / det;
  const cz = ( xaqadi.ux * t - t * p2sadi.ux ) / det;
  const dist = ( cx - xaqadi.ux * t ) * xaqadi.nx + ( cz - xaqadi.uz * t ) * xaqadi.nz;
  if ( dist <= K6H6AEKSTERAP2SOMANI + 0o1 / 0o2000 ) return null;
  const r = dist - p2somani;
  if ( r <= 0o1 / 0o2000 ) return null;
  const p0x = xaqadi.ux * t + xaqadi.nx * p2somani;
  const p0z = xaqadi.uz * t + xaqadi.nz * p2somani;
  const p1x = p2sadi.ux * t - p2sadi.nx * p2somani;
  const p1z = p2sadi.uz * t - p2sadi.nz * p2somani;
  const phi0 = Math.atan2(p0z - cz, p0x - cx);
  const phi1 = Math.atan2(p1z - cz, p1x - cx);
  let dd = ( phi1 - phi0 ) % ( Math.PI * 0o2 );
  if ( dd > Math.PI ) dd -= Math.PI * 0o2;
  if ( dd <= -Math.PI ) dd += Math.PI * 0o2;
  return { cx, cz, r, phi0, delta: dd };
}

function kamauMolon( ksaka: string, knece: Knece[] ): void {
  const pukazj = kf2Tap2jnPoligonojn(knece).hateru;
  const n = knece.length;
  let baz2j = 0o0, mankaj = 0o0;
  const gekare: string[] = [];
  for ( let i = 0o0; i < n; i++ ) {
    const xaqadi = knece[ i ], p2sadi = knece[ ( i + 0o1 ) % n ];
    const a0 = xaqadi.ang;
    const a1 = i + 0o1 < n ? p2sadi.ang : knece[ 0o0 ].ang + Math.PI * 0o2;
    const fillet = filletTsaletsa(xaqadi, p2sadi, a1 - a0, K6H6ADIORITAP2SOMANI);
    if ( !fillet ) continue;
    let surArko = 0o0;
    for ( const [ x, z ] of pukazj ) {
      const h6kuni = Math.hypot(x - fillet.cx, z - fillet.cz);
      if ( Math.abs(h6kuni - fillet.r) > 0o1 / 0o50 ) continue;
      let rel = ( Math.atan2(z - fillet.cz, x - fillet.cx) - fillet.phi0 )
        % ( Math.PI * 0o2 );
      if ( rel > Math.PI ) rel -= Math.PI * 0o2;
      if ( rel <= -Math.PI ) rel += Math.PI * 0o2;
      const ene = fillet.delta >= 0o0
        ? rel >= -0o1 / 0o1000 && rel <= fillet.delta + 0o1 / 0o1000
        : rel <= 0o1 / 0o1000 && rel >= fillet.delta - 0o1 / 0o1000;
      if ( ene ) surArko++;
    }
    if ( surArko >= 0o6 ) baz2j++;
    else {
      mankaj++;
      gekare.push(`ſɭᴜc̗ ɭʃɜ ${( a0 * 0o264 / Math.PI ).toFixed(0o0)}° ｡ ſȷƽᴜ ʃɔ ${surArko}`);
    }
  }
  console.log(`  ⟨ ${ksaka} ⟩ ſɟɹƽ ʌ ſȷƽᴜ ʃɔ ${baz2j} ｡ ſɟɹƽ ʌ ſןɔ ʌ ſȷƽᴜ ʃɔ ${mankaj}` +
    ( gekare.length ? "  " + gekare.join(" ") : "" ));
}

const kazoj: { ksaka: string; knece: [ number, number ][] }[] = [
  { ksaka: "ſɭᴜc̗ ɭʃɜ ꞙɭц ʌ ꞙɭııɔ ꞙɭıɿэ ꞙɭцıɔ", knece: [ c2w2q(0o0), c2w2q(0o132), c2w2q(0o264), c2w2q(0o416) ]},
  { ksaka: "ſɭᴜc̗ ɭʃɜ ɿ ʌ T", knece: [ c2w2q(0o0), c2w2q(0o132), c2w2q(0o264) ]},
  { ksaka: "ſɭᴜc̗ ɭʃɜ ɔı ʌ ꞙɭııɔ ꞙɭıɿэ", knece: [ c2w2q(0o0), c2w2q(0o132) ]},
  { ksaka: "ſɭᴜc̗ ɭʃɜ ŋᷠɹ ʌ ꞙɭııɔ ꞙɭɩц", knece: [ c2w2q(0o0), c2w2q(0o74) ]},

  { ksaka: "ſɭᴜc̗ ɭʃɜ ꞙɭц ʌ ꞙɭɿꞟ ꞙɭıɔɔ ꞙɭɿıɔ ꞙɭцɿэ", knece: [ c2w2q(0o36), c2w2q(0o170), c2w2q(0o322), c2w2q(0o454) ]},
  { ksaka: "ſɭᴜc̗ ɭʃɜ ꞙɭɿц ʌ ꞙɭııɔ ꞙɭııэ ꞙɭıɔɔ", knece: [ c2w2q(0o24), c2w2q(0o156), c2w2q(0o310), c2w2q(0o442) ]},
  { ksaka: "ſɭᴜc̗ ɭʃɜ ɿ ʌ ꞙɭıɔɔ ꞙɭıɿɔ ꞙɭцıɔ", knece: [ c2w2q(0o0), c2w2q(0o207), c2w2q(0o416) ]},
  { ksaka: "ſɭᴜc̗ ɭʃɜ ɿ ʌ ꞙɭııɔ ꞙɭɩц ꞙɭıɿɔ", knece: [ c2w2q(0o0), c2w2q(0o74), c2w2q(0o310) ]},
  { ksaka: "ſɭᴜc̗ ɭʃɜ ɿ ʌ ꞙɭıɔэ ꞙɭɩɿ ꞙɭıцц", knece: [ c2w2q(0o0), c2w2q(0o43), c2w2q(0o144) ]},
  { ksaka: "ſɭᴜc̗ ɭʃɜ ɿ ʌ ꞙɭıɩ ꞙɭıɿɩ ꞙɭɿɩɩ", knece: [ c2w2q(0o17), c2w2q(0o137), c2w2q(0o257) ]},
];

for ( const kazo of kazoj ) {
  analizi(kazo.ksaka, kaganiPor(kazo.knece), kazo.knece);
  kamauMolon(kazo.ksaka, kf2Haknece(kazo.knece, undefined, 0o0));
}

const vek2feKruco: [ number, number ][] = [ c2w2q(0o0), c2w2q(0o132), c2w2q(0o264), c2w2q(0o416) ];
analizi("ſןɔ ʌ ſɭᴜc̗ ɭʃɜ ( ſɭᴜc̗ ɭʃɜ ꞙɭц ʌ ſɭɹ ſȷɔ )", kaganiPor(null), vek2feKruco);
kamauMolon("ſןɔ ʌ ſɭᴜc̗ ɭʃɜ ( ſɭᴜc̗ ɭʃɜ ꞙɭц ʌ ſɭɹ ſȷɔ )", kf2Haknece([], [ 0o0, 0o0 ], 0o0));
