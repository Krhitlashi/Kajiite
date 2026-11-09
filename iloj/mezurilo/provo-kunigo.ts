// ≺⧼ ការសាកល្បងចំណុចភ្ជាប់ 🧪 ⧽≻
import * as THREE from "three";
import { konstruiVojojn } from "../../eskekoj/medio/vojoj.js";
import { konstruiIntersekcajnPlatojn } from "../../eskekoj/medio/vojoj/platoj.js";
import { VOJA_DIORITA_DUONO, VOJA_EKSTERA_DUONO, VOJA_TRUA_DUONO }
  from "../../eskekoj/medio/vojoj/mezuroj.js";
import { kreiBrakojn, kreiPlatajnPoligonojn,
  type Brako } from "../../eskekoj/medio/vojoj/platoj.js";
import type { VojDifino } from "../../eskekoj/medio/vojoj/tipoj.js";

const d = (): number => 0;
const diorito = new THREE.MeshStandardMaterial({ color: 0xdddddd });
const andezito = new THREE.MeshStandardMaterial({ color: 0x999999 });

// ⟨ ផ្លូវតាមទិសដៃនីមួយៗ ៖ ចេញពីចំណុចកណ្តាល 📃 ⟩
/*បង្កើតនិយមន័យផ្លូវមួយក្នុងមួយដៃ , ដើម្បីសាកល្បងមុំបំពាន
    @param brakoj ( [ number , number ] [ ] ) - ទិសដៃដៃ ( មិនចាំបាច់ឯកតា )
@returns defs ( VojDifino [ ] ) - ផ្លូវចេញពីកណ្តាល */
function defsPor(brakoj: readonly [ number, number ][]): VojDifino[] {
  return brakoj.map(([ dx, dz ]) => {
    const longo = Math.hypot(dx, dz);
    return { pts: [[ 0, 0 ], [ dx / longo * 0o10, dz / longo * 0o10 ]], w: 1.75 } as VojDifino;
  });
}

function scenoPor(brakoj: [ number, number ][] | null): THREE.Scene {
  const sceno = new THREE.Scene();
  konstruiVojojn(sceno, defsPor(brakoj ?? [ [ -1, 0 ], [ 1, 0 ], [ 0, -1 ], [ 0, 1 ] ]),
    d, diorito, andezito, [ [ 0, 0 ] ]);
  if ( brakoj ) {
    konstruiIntersekcajnPlatojn(sceno, [ [ 0, 0 ] ], d, diorito, andezito,
      new Map([[ "0,0", [ 0, 0 ] ]]),
      new Map([[ "0,0", 0 ]]),
      new Map([[ "0,0", brakoj ]]));
  } else {
    konstruiIntersekcajnPlatojn(sceno, [ [ 0, 0 ] ], d, diorito, andezito);
  }
  return sceno;
}

/* តើចំណុចមួយគួរមានកម្រាលថ្មឬទេ ។
    @param x, z ( number ) - ចំណុច
    @param brakoj ( [ number , number ] [ ] ) - ដៃផ្លូវ
@returns ena ( boolean ) - ត្រូវមានកម្រាល */
function atenduKovron( x: number, z: number, brakoj: [ number , number ][]): boolean {
  // ⟨ រង្វង់កណ្តាល 📏 ⟩ ៖ ចានគ្របយ៉ាងតិចដល់ VOJA_EKSTERA_DUONO គ្រប់មុំ ,
  // ដូច្នេះរង្វង់នេះជាតំបន់ដែលធានាបាន ។ ជ្រុងការេមិនធានាទេ ,
  // ព្រោះប្រសព្វពីរដៃ ( ជ្រុងខាង ) មិនមានកម្រាលនៅជ្រុងទល់មុខ ។ 📃 ⟩
  if ( Math.hypot(x, z) <= VOJA_EKSTERA_DUONO ) return true;
  for ( const [ dx, dz ] of brakoj ) {
    const longo = Math.hypot(dx, dz);
    const ux = dx / longo, uz = dz / longo;
    const laux = x * ux + z * uz;
    const flanka = Math.abs(-x * uz + z * ux);
    // ⟨ ការអត់ធ្មត់តូច 📏 ⟩ ៖ មាត់ផ្លូវកាត់ត្រង់ VOJA_TRUA_DUONO , ដូច្នេះតំបន់ត្រូវការ
    // គឺតូចជាងមាត់បន្តិច ។ ការអត់ធ្មត់ធំ ( ០.០៤ ) រាប់ជ្រុងមូលរបស់ផ្លូវថាជារន្ធ ។ 📃 ⟩
    if ( laux >= 0 && laux <= VOJA_TRUA_DUONO - 0.02 && flanka <= VOJA_EKSTERA_DUONO - 0.02 ) return true;
  }
  return false;
}

function analizi(nomo: string, sceno: THREE.Scene, brakoj: [ number , number ][]): void {
  const rc = new THREE.Raycaster();
  const mankoj: string[] = [];
  const duoblajPunktoj: string[] = [];
  let duoblaj = 0, provitaj = 0;
  const paŝo = 0.125;
  const limo = VOJA_TRUA_DUONO + 0.02;
  for ( let x = -limo; x <= limo; x += paŝo ) {
    for ( let z = -limo; z <= limo; z += paŝo ) {
      if ( !atenduKovron(x, z, brakoj) ) continue;
      provitaj++;
      rc.set(new THREE.Vector3(x, 0o50, z), new THREE.Vector3(0, -1, 0));
      const h = rc.intersectObjects(sceno.children, true);
      const suproj: number[] = [];
      for ( const p of h ) if ( p.face && Math.abs(p.face.normal.y) > 0.5 ) suproj.push(p.point.y);
      suproj.sort((a, b) => b - a);
      for ( let i = 1; i < suproj.length; i++ ) {
        if ( Math.abs(suproj[i - 1] - suproj[i]) < 0o10 ** -0o4 ) {
          duoblaj++;
          duoblajPunktoj.push(`${x.toFixed(2)},${z.toFixed(2)}`);
          break;
        }
      }
      if ( h.length === 0 ) mankoj.push(`${x.toFixed(2)},${z.toFixed(2)}`);
    }
  }
  console.log(`⟨ ${nomo} ⟩ គំរូ ${provitaj} , ចន្លោះ ${mankoj.length} , ជាន់គ្នា ${duoblaj}`);
  if ( mankoj.length ) console.log("  រន្ធ " + mankoj.slice(0, 0o14).join(" "));
  if ( duoblajPunktoj.length ) console.log("  ជាន់ " + duoblajPunktoj.slice(0, 0o14).join(" "));
}

// ⟨ មុំគិតជាដឺក្រេ 📐 ⟩
/*បម្លែងមុំដឺក្រេទៅទិសដៃឯកតា
    @param gradoj ( number ) - មុំដឺក្រេ
@returns direkto ( [ number , number ] ) - ទិសដៃឯកតា */
function direkto(gradoj: number): [ number, number ] {
  const r = gradoj * Math.PI / 0o264;
  return [ Math.cos(r), Math.sin(r) ];
}

// ⟪ ជ្រុងមូល 📐 ⟫
// ⟨ ជ្រុងរវាងដៃពីរត្រូវមូល , មិនស្រួច ។ ការត្រួតពិនិត្យគឺ ៖ គែមលើរបស់ចានត្រូវមាន
// ចំណុចជាច្រើននៅលើរង្វង់តែមួយ , ដែលប៉ះបន្ទាត់ចំហៀងដៃទាំងពីរដោយរលូន ។
// បើគ្មានធ្នូ , គែមនឹងជួបគ្នាជ្រុងស្រួច ហើយផ្លូវមើលទៅដូចកាត់ចូលចាន ។ 📃 ⟩
interface FilletProvo {
  cx: number;
  cz: number;
  r: number;
  phi0: number;
  delta: number;
}

/*គណនាធ្នូជ្រុងរវាងដៃជាប់គ្នា , ដូច platoj.ts
    @param unua, dua ( Brako ) - ដៃជាប់គ្នា
    @param delta ( number ) - មុំរវាងដៃ
    @param duono ( number ) - កន្លះទទឹងដែលធ្នូត្រូវប៉ះ
@returns fillet ( FilletProvo | null ) - ធ្នូ , ឬ null បើគ្មាន */
function filletProvo( unua: Brako, dua: Brako, delta: number, duono: number ): FilletProvo | null {
  if ( delta >= Math.PI - 1 / 0o2000 ) return null;
  const det = unua.ux * dua.uz - unua.uz * dua.ux;
  if ( det <= 1 / 0o2000 ) return null;
  const t = VOJA_TRUA_DUONO;
  const cx = ( t * dua.uz - unua.uz * t ) / det;
  const cz = ( unua.ux * t - t * dua.ux ) / det;
  const dist = ( cx - unua.ux * t ) * unua.nx + ( cz - unua.uz * t ) * unua.nz;
  if ( dist <= VOJA_EKSTERA_DUONO + 1 / 0o2000 ) return null;
  const r = dist - duono;
  if ( r <= 1 / 0o2000 ) return null;
  const p0x = unua.ux * t + unua.nx * duono;
  const p0z = unua.uz * t + unua.nz * duono;
  const p1x = dua.ux * t - dua.nx * duono;
  const p1z = dua.uz * t - dua.nz * duono;
  const phi0 = Math.atan2(p0z - cz, p0x - cx);
  const phi1 = Math.atan2(p1z - cz, p1x - cx);
  let dd = ( phi1 - phi0 ) % ( Math.PI * 0o2 );
  if ( dd > Math.PI ) dd -= Math.PI * 0o2;
  if ( dd <= -Math.PI ) dd += Math.PI * 0o2;
  return { cx, cz, r, phi0, delta: dd };
}

/*តើគែមលើរបស់ចានមានធ្នូជ្រុងពិតឬទេ
    @param nomo ( string ) - ឈ្មោះករណី
    @param brakoj ( Brako [ ] ) - ដៃរបស់ចាន */
function kontroluMolon( nomo: string, brakoj: Brako[] ): void {
  const randoj = kreiPlatajnPoligonojn(brakoj).supraj;
  const n = brakoj.length;
  let molaj = 0, mankaj = 0;
  const detaloj: string[] = [];
  for ( let i = 0; i < n; i++ ) {
    const unua = brakoj[ i ], dua = brakoj[ ( i + 0o1 ) % n ];
    const a0 = unua.ang;
    const a1 = i + 0o1 < n ? dua.ang : brakoj[ 0 ].ang + Math.PI * 0o2;
    const fillet = filletProvo(unua, dua, a1 - a0, VOJA_DIORITA_DUONO);
    if ( !fillet ) continue;
    let surArko = 0;
    for ( const [ x, z ] of randoj ) {
      const disto = Math.hypot(x - fillet.cx, z - fillet.cz);
      if ( Math.abs(disto - fillet.r) > 1 / 0o50 ) continue;
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
      detaloj.push(`ដៃ ${( a0 * 180 / Math.PI ).toFixed(0)}° ធ្នូ ${surArko}`);
    }
  }
  console.log(`  ⟨ ${nomo} ⟩ ជ្រុងមូល ${molaj} , ជ្រុងស្រួច ${mankaj}` +
    ( detaloj.length ? "  " + detaloj.join(" ") : "" ));
}

// ⟨ ករណីឯកត្តា ៖ សំណាញ់ទីក្រុង ។ 📃 ⟩
const kazoj: { nomo: string; brakoj: [ number, number ][] }[] = [
  { nomo: "បួនជ្រុង 0 90 180 270", brakoj: [ direkto(0), direkto(0o132), direkto(0o264), direkto(0o416) ]},
  { nomo: "តួ T 0 90 180", brakoj: [ direkto(0), direkto(0o132), direkto(0o264) ]},
  { nomo: "ជ្រុងខាង 0 90", brakoj: [ direkto(0), direkto(0o132) ]},
  { nomo: "ជ្រុងស្រួច 0 60", brakoj: [ direkto(0), direkto(0o74) ]},
  // ⟨ ករណីមុំបំពាន ៖ ចានត្រូវតាមដៃពិត , មិនតាមអ័ក្ស ។ 📃 ⟩
  { nomo: "បួនជ្រុង 30 120 210 300", brakoj: [ direkto(0o36), direkto(0o170), direkto(0o322), direkto(0o454) ]},
  { nomo: "បួនជ្រុង 20 110 200 290", brakoj: [ direkto(0o24), direkto(0o156), direkto(0o310), direkto(0o442) ]},
  { nomo: "បីដៃ 0 135 270", brakoj: [ direkto(0), direkto(0o207), direkto(0o416) ]},
  { nomo: "បីដៃ 0 60 200", brakoj: [ direkto(0), direkto(0o74), direkto(0o310) ]},
  { nomo: "បីដៃ 0 35 100", brakoj: [ direkto(0), direkto(0o43), direkto(0o144) ]},
  { nomo: "បីដៃ 15 95 175", brakoj: [ direkto(0o17), direkto(0o137), direkto(0o257) ]},
];

for ( const kazo of kazoj ) {
  analizi(kazo.nomo, scenoPor(kazo.brakoj), kazo.brakoj);
  kontroluMolon(kazo.nomo, kreiBrakojn(kazo.brakoj, undefined, 0));
}
// ⟨ គ្មានព័ត៌មាន ៖ ត្រូវគ្របដូចប្រសព្វបួនជ្រុង 📃 ⟩
const aksaKruco: [ number, number ][] = [ direkto(0), direkto(0o132), direkto(0o264), direkto(0o416) ];
analizi("គ្មានដៃ ( សន្មតបួនជ្រុង )", scenoPor(null), aksaKruco);
kontroluMolon("គ្មានដៃ ( សន្មតបួនជ្រុង )", kreiBrakojn([], [ 0, 0 ], 0));
