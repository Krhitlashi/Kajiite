// ≺⧼ ការសាកល្បងចំណុចភ្ជាប់ 🧪 ⧽≻
import * as THREE from "three";
import { konstruiVojojn } from "../../eskekoj/medio/vojoj.js";
import { konstruiIntersekcajnPlatojn } from "../../eskekoj/medio/vojoj/platoj.js";
import { VOJA_EKSTERA_DUONO, VOJA_TRUA_DUONO } from "../../eskekoj/medio/vojoj/mezuroj.js";
import type { VojDifino } from "../../eskekoj/medio/vojoj/tipoj.js";

const d = (): number => 0;
const diorito = new THREE.MeshStandardMaterial({ color: 0xdddddd });
const andezito = new THREE.MeshStandardMaterial({ color: 0x999999 });

// ⟨ ផ្លូវបួនជ្រុង ដូចសំណាញ់ទីក្រុង ៖ ចម្រៀកដាច់នៅចំណុចកណ្តាល 📃 ⟩
const defs: VojDifino[] = [
  { pts: [ [ -8, 0 ], [ 0, 0 ] ], w: 1.75 },
  { pts: [ [ 0, 0 ], [ 8, 0 ] ], w: 1.75 },
  { pts: [ [ 0, -8 ], [ 0, 0 ] ], w: 1.75 },
  { pts: [ [ 0, 0 ], [ 0, 8 ] ], w: 1.75 },
];
const kvarBrakoj: [ number, number ][] = [ [ -1, 0 ], [ 1, 0 ], [ 0, -1 ], [ 0, 1 ] ];
// ⟨ ផ្លូវមួយបញ្ចប់នៅកណ្តាលផ្លូវផ្សេង ( តួ T ) 📃 ⟩
const tDefs: VojDifino[] = [
  { pts: [ [ -8, 0 ], [ 0, 0 ] ], w: 1.75 },
  { pts: [ [ 0, 0 ], [ 8, 0 ] ], w: 1.75 },
  { pts: [ [ 0, 0 ], [ 0, 8 ] ], w: 1.75 },
];
const tBrakoj: [ number, number ][] = [ [ -1, 0 ], [ 1, 0 ], [ 0, 1 ] ];

function scenoPor(defs: VojDifino[], brakoj: [ number, number ][] | null): THREE.Scene {
  const sceno = new THREE.Scene();
  konstruiVojojn(sceno, defs, d, diorito, andezito, [ [ 0, 0 ] ]);
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
function atenduKovron( x: number, z: number, brakoj: [ number, number ][] ): boolean {
  if ( Math.abs(x) <= VOJA_EKSTERA_DUONO && Math.abs(z) <= VOJA_EKSTERA_DUONO ) return true;
  for ( const [ dx, dz ] of brakoj ) {
    const laux = x * dx + z * dz;
    const flanka = Math.abs(-x * dz + z * dx);
    if ( laux >= 0 && laux <= VOJA_TRUA_DUONO + 0.04 && flanka <= VOJA_EKSTERA_DUONO + 0.04 ) return true;
  }
  return false;
}

function analizi(nomo: string, sceno: THREE.Scene, brakoj: [ number, number ][]): void {
  const rc = new THREE.Raycaster();
  const mankoj: string[] = [];
  let duoblaj = 0, provitaj = 0;
  const paŝo = 0.25;
  const limo = VOJA_TRUA_DUONO + 0.02;
  for ( let x = -limo; x <= limo; x += paŝo ) {
    for ( let z = -limo; z <= limo; z += paŝo ) {
      if ( !atenduKovron(x, z, brakoj) ) continue;
      provitaj++;
      rc.set(new THREE.Vector3(x, 40, z), new THREE.Vector3(0, -1, 0));
      const h = rc.intersectObjects(sceno.children, true);
      const suproj: number[] = [];
      for ( const p of h ) if ( p.face && Math.abs(p.face.normal.y) > 0.5 ) suproj.push(p.point.y);
      suproj.sort((a, b) => b - a);
      for ( let i = 1; i < suproj.length; i++ ) {
        if ( Math.abs(suproj[i - 1] - suproj[i]) < 1e-4 ) { duoblaj++; break; }
      }
      if ( h.length === 0 ) mankoj.push(`${x.toFixed(2)},${z.toFixed(2)}`);
    }
  }
  console.log(`⟨ ${nomo} ⟩ គំរូ ${provitaj} , ចន្លោះ ${mankoj.length} , ជាន់គ្នា ${duoblaj}`);
  if ( mankoj.length ) console.log("  ឧទាហរណ៍ " + mankoj.slice(0, 12).join(" "));
}

analizi("បួនជ្រុង មានដៃ", scenoPor(defs, kvarBrakoj), kvarBrakoj);
analizi("បួនជ្រុង គ្មានដៃ", scenoPor(defs, null), kvarBrakoj);
analizi("តួ T មានដៃ", scenoPor(tDefs, tBrakoj), tBrakoj);
analizi("តួ T គ្មានដៃ", scenoPor(tDefs, null), tBrakoj);
