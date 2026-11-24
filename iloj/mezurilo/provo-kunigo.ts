// ≺⧼ j͐ʃɜ ᶅſᴜƽ ʌ j͑ʃɹ ſɟᴜ ʃᴜ ʌ j͐ʃɹ ŋᷠɔ 🧪 ⧽≻
import * as THREE from "three";
import { vepaqHak6h6n } from "../../eskekoj/medio/hak6h6.js";
import { vepaqIntersekcajnHapa12n } from "../../eskekoj/medio/hak6h6/hapa12.js";
import { VOJA_DIORITA_DUONO, VOJA_EKSTERA_DUONO, VOJA_TRUA_DUONO }
  from "../../eskekoj/medio/hak6h6/havecax2l.js";
import { kf2Brakojn, kf2PlatajnPoligonojn,
  type Knece } from "../../eskekoj/medio/hak6h6/hapa12.js";
import type { VojDifino } from "../../eskekoj/medio/hak6h6/hahunaq.js";

const d = (): number => 0;
const t6g6 = new THREE.MeshStandardMaterial({ color: 0xdddddd });
const t6hna = new THREE.MeshStandardMaterial({ color: 0x999999 });

// ⟨ ſɭэ ֭ſɭэ , ſɭэ ſɭᴜ , 📃 ⟩
/* ſɭэ ֭ſɭэ , ꞙɭı ,
    @param knece ( [ number , number ] [ ] ) - ſɟɹ ᶅſɹȝ ʌ ſɭᴜc̗ ɭʃɜ ( ſןɔ ʌ ſɭɹ ſȷɔ ɔ )
@returns defs ( VojDifino [ ] ) - ſɭэ ֭ſɭэ ʌ j͑ʃɜ j͑ʃƨɹ */
function defsPor(knece: readonly [ number, number ][]): VojDifino[] {
  return knece.map(([ dx, dz ]) => {
    const sahakani = Math.hypot(dx, dz);
    return { pts: [[ 0, 0 ], [ dx / sahakani * 0o10, dz / sahakani * 0o10 ]], w: 1.75 } as VojDifino;
  });
}

function scenoPor(knece: [ number, number ][] | null): THREE.Scene {
  const qena = new THREE.Scene();
  vepaqHak6h6n(qena, defsPor(knece ?? [ [ -1, 0 ], [ 1, 0 ], [ 0, -1 ], [ 0, 1 ] ]),
    d, t6g6, t6hna, [ [ 0, 0 ] ]);
  if ( knece ) {
    vepaqIntersekcajnHapa12n(qena, [ [ 0, 0 ] ], d, t6g6, t6hna,
      new Map([[ "0,0", [ 0, 0 ] ]]),
      new Map([[ "0,0", 0 ]]),
      new Map([[ "0,0", knece ]]));
  } else {
    vepaqIntersekcajnHapa12n(qena, [ [ 0, 0 ] ], d, t6g6, t6hna);
  }
  return qena;
}

/* ſɭᴜ ſןᴜ , ꞙɭı ,
    @param x, z ( number ) - }ʃɹƽ
    @param knece ( [ number , number ] [ ] ) - ſɭᴜc̗ ɭʃɜ ʌ ſɭэ ֭ſɭэ
@returns ena ( boolean ) - j͑ʃɜ ſɭ,ᴜ ʌ j͑ʃᴜ / ſɭɹ ſᶘɔ */
function atenduKovron( x: number, z: number, knece: [ number , number ][]): boolean {
// ⟨ ſɭᴜ ſןᴜ , 📏 ⟩ , ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц , 📃 ⟩
  if ( Math.hypot(x, z) <= VOJA_EKSTERA_DUONO ) return true;
  for ( const [ dx, dz ] of knece ) {
    const sahakani = Math.hypot(dx, dz);
    const ux = dx / sahakani, uz = dz / sahakani;
    const laux = x * ux + z * uz;
    const flanka = Math.abs(-x * uz + z * ux);
// ⟨ ſɭᴜ ſןᴜ , 📏 ⟩ , ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭэ , ꞙɭɔ , 📃 ⟩
    if ( laux >= 0 && laux <= VOJA_TRUA_DUONO - 0.02 && flanka <= VOJA_EKSTERA_DUONO - 0.02 ) return true;
  }
  return false;
}

function analizi(ksaka: string, qena: THREE.Scene, knece: [ number , number ][]): void {
  const rc = new THREE.Raycaster();
  const mankoj: string[] = [];
  const duoblajPunktoj: string[] = [];
  let duoblaj = 0, provitaj = 0;
  const tona = 0.125;
  const limo = VOJA_TRUA_DUONO + 0.02;
  for ( let x = -limo; x <= limo; x += tona ) {
    for ( let z = -limo; z <= limo; z += tona ) {
      if ( !atenduKovron(x, z, knece) ) continue;
      provitaj++;
      rc.set(new THREE.Vector3(x, 0o50, z), new THREE.Vector3(0, -1, 0));
      const h = rc.intersectObjects(qena.children, true);
      const hateru: number[] = [];
      for ( const p of h ) if ( p.face && Math.abs(p.face.normal.y) > 0.5 ) hateru.push(p.point.y);
      hateru.sort((a, b) => b - a);
      for ( let i = 1; i < hateru.length; i++ ) {
        if ( Math.abs(hateru[i - 1] - hateru[i]) < 0o10 ** -0o4 ) {
          duoblaj++;
          duoblajPunktoj.push(`${x.toFixed(2)},${z.toFixed(2)}`);
          break;
        }
      }
      if ( h.length === 0 ) mankoj.push(`${x.toFixed(2)},${z.toFixed(2)}`);
    }
  }
  console.log(`⟨ ${ksaka} ⟩ ſᶘᴜ j͐ʃɹ ${provitaj} ｡ ſ͕ɭᴜ ſ͕ɭw }ʃɹ ${mankoj.length} ｡ ſɭᴜ }ʃᴜ ɔı ${duoblaj}`);
  if ( mankoj.length ) console.log("  ſ͕ɭᴜ ſ͕ɭw }ʃɹ " + mankoj.slice(0, 0o14).join(" "));
  if ( duoblajPunktoj.length ) console.log("  ſɭᴜ }ʃᴜ ɔı " + duoblajPunktoj.slice(0, 0o14).join(" "));
}

// ⟨ ɭʃᴜʞ ſɭᴜȝ , 📐 ⟩
/* ɭʃᴜʞ ſɭᴜȝ , ſ͔ɭᴜ ,
    @param gradoj ( number ) - ſɭᴜc̗ ɭʃɜ ʌ ſɭɹ ſȷɔ
@returns c2w2q ( [ number , number ] ) - ſɟɹ ᶅſɹȝ ɔ */
function c2w2q(gradoj: number): [ number, number ] {
  const r = gradoj * Math.PI / 0o264;
  return [ Math.cos(r), Math.sin(r) ];
}

// ⟪ ɭʃᴜʞ ſɭᴜȝ , 📐 ⟫
// ⟨ ɭʃᴜʞ ſɭᴜȝ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц , 📃 ⟩
interface FilletProvo {
  cx: number;
  cz: number;
  r: number;
  phi0: number;
  delta: number;
}

/* ɭʃᴜʞ ſɭᴜȝ , ꞙɭı ,
    @param xaqadi, dua ( Knece ) - ſɭᴜc̗ ɭʃɜ ʌ ſɟɹƽ
    @param delta ( number ) - ſɭᴜc̗ ɭʃɜ ɔı ʌ j͑ʃɜ j͑ʃƨɹ
    @param p2somani ( number ) - ſɭɜc̗ ɭʃɜ ʌ j͑ʃɔ ſȷꞇ }ʃꞇ ʌ ſȷƽᴜ ʃɔ
@returns fillet ( FilletProvo | null ) - ſȷƽᴜ ʃɔ ｡ ſןɔ ｡ null ｡ ſɭᴜ ｡ */
function filletProvo( xaqadi: Knece, dua: Knece, delta: number, p2somani: number ): FilletProvo | null {
  if ( delta >= Math.PI - 1 / 0o2000 ) return null;
  const det = xaqadi.ux * dua.uz - xaqadi.uz * dua.ux;
  if ( det <= 1 / 0o2000 ) return null;
  const t = VOJA_TRUA_DUONO;
  const cx = ( t * dua.uz - xaqadi.uz * t ) / det;
  const cz = ( xaqadi.ux * t - t * dua.ux ) / det;
  const dist = ( cx - xaqadi.ux * t ) * xaqadi.nx + ( cz - xaqadi.uz * t ) * xaqadi.nz;
  if ( dist <= VOJA_EKSTERA_DUONO + 1 / 0o2000 ) return null;
  const r = dist - p2somani;
  if ( r <= 1 / 0o2000 ) return null;
  const p0x = xaqadi.ux * t + xaqadi.nx * p2somani;
  const p0z = xaqadi.uz * t + xaqadi.nz * p2somani;
  const p1x = dua.ux * t - dua.nx * p2somani;
  const p1z = dua.uz * t - dua.nz * p2somani;
  const phi0 = Math.atan2(p0z - cz, p0x - cx);
  const phi1 = Math.atan2(p1z - cz, p1x - cx);
  let dd = ( phi1 - phi0 ) % ( Math.PI * 0o2 );
  if ( dd > Math.PI ) dd -= Math.PI * 0o2;
  if ( dd <= -Math.PI ) dd += Math.PI * 0o2;
  return { cx, cz, r, phi0, delta: dd };
}

/* ɭʃᴜʞ ſɭᴜȝ , ꞙɭɿ ,
    @param ksaka ( string ) - ſɭɔ˞ᴜ ſɭᴜ ʌ j͑ʃᴜ ı],ᴜ ｡
    @param knece ( Knece [ ] ) - ſɭᴜc̗ ɭʃɜ ʌ ſןᴜ ſᶘɹ ｡ */
function kontroluMolon( ksaka: string, knece: Knece[] ): void {
  const randoj = kf2PlatajnPoligonojn(knece).hateru;
  const n = knece.length;
  let molaj = 0, mankaj = 0;
  const detaloj: string[] = [];
  for ( let i = 0; i < n; i++ ) {
    const xaqadi = knece[ i ], dua = knece[ ( i + 0o1 ) % n ];
    const a0 = xaqadi.ang;
    const a1 = i + 0o1 < n ? dua.ang : knece[ 0 ].ang + Math.PI * 0o2;
    const fillet = filletProvo(xaqadi, dua, a1 - a0, VOJA_DIORITA_DUONO);
    if ( !fillet ) continue;
    let surArko = 0;
    for ( const [ x, z ] of randoj ) {
      const h6kuni = Math.hypot(x - fillet.cx, z - fillet.cz);
      if ( Math.abs(h6kuni - fillet.r) > 1 / 0o50 ) continue;
      let rel = ( Math.atan2(z - fillet.cz, x - fillet.cx) - fillet.phi0 )
        % ( Math.PI * 0o2 );
      if ( rel > Math.PI ) rel -= Math.PI * 0o2;
      if ( rel <= -Math.PI ) rel += Math.PI * 0o2;
      const ene = fillet.delta >= 0
        ? rel >= -1 / 0o1000 && rel <= fillet.delta + 1 / 0o1000
        : rel <= 1 / 0o1000 && rel >= fillet.delta - 1 / 0o1000;
      if ( ene ) surArko++;
    }
    if ( surArko >= 0o6 ) molaj++;
    else {
      mankaj++;
      detaloj.push(`ſɭᴜc̗ ɭʃɜ ${( a0 * 180 / Math.PI ).toFixed(0)}° ｡ ſȷƽᴜ ʃɔ ${surArko}`);
    }
  }
  console.log(`  ⟨ ${ksaka} ⟩ ſɟɹƽ ʌ ſȷƽᴜ ʃɔ ${molaj} ｡ ſɟɹƽ ʌ ſןɔ ʌ ſȷƽᴜ ʃɔ ${mankaj}` +
    ( detaloj.length ? "  " + detaloj.join(" ") : "" ));
}

// ⟨ ſɭэ ֭ſɭэ , ꞙɭı , 📃 ⟩
const kazoj: { ksaka: string; knece: [ number, number ][] }[] = [
  { ksaka: "ſɭᴜc̗ ɭʃɜ ꞙɭц ʌ ꞙɭııɔ ꞙɭıɿэ ꞙɭцıɔ", knece: [ c2w2q(0), c2w2q(0o132), c2w2q(0o264), c2w2q(0o416) ]},
  { ksaka: "ſɭᴜc̗ ɭʃɜ ɿ ʌ T", knece: [ c2w2q(0), c2w2q(0o132), c2w2q(0o264) ]},
  { ksaka: "ſɭᴜc̗ ɭʃɜ ɔı ʌ ꞙɭııɔ ꞙɭıɿэ", knece: [ c2w2q(0), c2w2q(0o132) ]},
  { ksaka: "ſɭᴜc̗ ɭʃɜ ŋᷠɹ ʌ ꞙɭııɔ ꞙɭɩц", knece: [ c2w2q(0), c2w2q(0o74) ]},
// ⟨ ɭʃᴜʞ ſɭᴜȝ , ꞙɭɿ , 📃 ⟩
  { ksaka: "ſɭᴜc̗ ɭʃɜ ꞙɭц ʌ ꞙɭɿꞟ ꞙɭıɔɔ ꞙɭɿıɔ ꞙɭцɿэ", knece: [ c2w2q(0o36), c2w2q(0o170), c2w2q(0o322), c2w2q(0o454) ]},
  { ksaka: "ſɭᴜc̗ ɭʃɜ ꞙɭɿц ʌ ꞙɭııɔ ꞙɭııэ ꞙɭıɔɔ", knece: [ c2w2q(0o24), c2w2q(0o156), c2w2q(0o310), c2w2q(0o442) ]},
  { ksaka: "ſɭᴜc̗ ɭʃɜ ɿ ʌ ꞙɭıɔɔ ꞙɭıɿɔ ꞙɭцıɔ", knece: [ c2w2q(0), c2w2q(0o207), c2w2q(0o416) ]},
  { ksaka: "ſɭᴜc̗ ɭʃɜ ɿ ʌ ꞙɭııɔ ꞙɭɩц ꞙɭıɿɔ", knece: [ c2w2q(0), c2w2q(0o74), c2w2q(0o310) ]},
  { ksaka: "ſɭᴜc̗ ɭʃɜ ɿ ʌ ꞙɭıɔэ ꞙɭɩɿ ꞙɭıцц", knece: [ c2w2q(0), c2w2q(0o43), c2w2q(0o144) ]},
  { ksaka: "ſɭᴜc̗ ɭʃɜ ɿ ʌ ꞙɭıɩ ꞙɭıɿɩ ꞙɭɿɩɩ", knece: [ c2w2q(0o17), c2w2q(0o137), c2w2q(0o257) ]},
];

for ( const kazo of kazoj ) {
  analizi(kazo.ksaka, scenoPor(kazo.knece), kazo.knece);
  kontroluMolon(kazo.ksaka, kf2Brakojn(kazo.knece, undefined, 0));
}
// ⟨ ſɭᴜ ſןᴜ , ꞙɭц , 📃 ⟩
const aksaKruco: [ number, number ][] = [ c2w2q(0), c2w2q(0o132), c2w2q(0o264), c2w2q(0o416) ];
analizi("ſןɔ ʌ ſɭᴜc̗ ɭʃɜ ( ſɭᴜc̗ ɭʃɜ ꞙɭц ʌ ſɭɹ ſȷɔ )", scenoPor(null), aksaKruco);
kontroluMolon("ſןɔ ʌ ſɭᴜc̗ ɭʃɜ ( ſɭᴜc̗ ɭʃɜ ꞙɭц ʌ ſɭɹ ſȷɔ )", kf2Brakojn([], [ 0, 0 ], 0));
