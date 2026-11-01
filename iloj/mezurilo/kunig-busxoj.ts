// ≺⧼ ការលោតកម្ពស់នៅមាត់ចាន 🔬 ⧽≻
// ⟨ វាស់កម្ពស់ផ្ទៃតាមដៃនីមួយៗ ចាប់ពីកណ្តាលចាន ដល់ចុងដៃ ។
// បើមានលោតខ្ពស់ជាងមួយជំហាន , នោះជាជញ្ជាំងឈរ មិនមែនជណ្តើរ ។
// ផ្លូវត្រូវចុះ/ឡើងទៅដល់កម្រិតចានជាជំហាន , មិនលោតភ្លាមទេ ។ 📃 ⟩
import * as THREE from "three";
import { konstruiVojojn } from "../../eskekoj/medio/vojoj.js";
import { konstruiIntersekcajnPlatojn } from "../../eskekoj/medio/vojoj/platoj.js";
import { kreiVojoAlton } from "../../eskekoj/medio/vojoj/alto.js";
import { vojaSuproDeKunigo } from "../../eskekoj/medio/vojoj/formoj.js";
import { STUPA_RISERO, surGrid, VOJA_EKSTERA_DUONO }
  from "../../eskekoj/medio/vojoj/mezuroj.js";
import type { VojDifino } from "../../eskekoj/medio/vojoj/tipoj.js";

// ⟨ លោតលើសមួយជំហាន = ជញ្ជាំង 📏 ⟩ ៖ បន្ថែមការអត់ធ្មត់តូចសម្រាប់ការគណនា ។
const TOLERO = 0o1 / 0o200;

const diorito = new THREE.MeshStandardMaterial({ color: 0xdddddd });
const andezito = new THREE.MeshStandardMaterial({ color: 0x999999 });

/*បម្លែងមុំដឺក្រេទៅទិសដៃឯកតា
    @param gradoj ( number ) - មុំដឺក្រេ
@returns direkto ( [ number , number ] ) - ទិសដៃឯកតា */
function direkto( gradoj: number ): [ number, number ] {
  const r = gradoj * Math.PI / 180;
  return [ Math.cos(r), Math.sin(r) ];
}

interface Kazo {
  nomo: string;
  brakoj: [ number, number ][];
  tero: ( x: number, z: number ) => number;
  longo: number;
}

// ⟨ ដីជម្រាល និងដីភ្នំ 📏 ⟩ ៖ ផ្លូវត្រូវតាមដីដោយជំហាន ។
const kazoj: Kazo[] = [
  { nomo: "បួនជ្រុង , ជម្រាល x",
    brakoj: [ direkto(0), direkto(90), direkto(180), direkto(270) ],
    tero: ( x ) => x * 0o1/0o2, longo: 0o10 },
  { nomo: "បួនជ្រុង , ជម្រាល xz",
    brakoj: [ direkto(0), direkto(90), direkto(180), direkto(270) ],
    tero: ( x, z ) => x * 0o1/0o2 + z * 0o1/0o4, longo: 0o10 },
  { nomo: "បួនជ្រុង , ភ្នំកណ្តាល",
    brakoj: [ direkto(0), direkto(90), direkto(180), direkto(270) ],
    tero: ( x, z ) => 0o4 - Math.hypot(x, z) * 0o1/0o2, longo: 0o10 },
  { nomo: "តួ T , ជម្រាល x",
    brakoj: [ direkto(0), direkto(90), direkto(180) ],
    tero: ( x ) => x * 0o1/0o2, longo: 0o10 },
  { nomo: "បួនជ្រុងទ្រេត , ជម្រាល x",
    brakoj: [ direkto(30), direkto(120), direkto(210), direkto(300) ],
    tero: ( x ) => x * 0o1/0o2, longo: 0o10 },
  { nomo: "ពីរដៃ , ជម្រាល x",
    brakoj: [ direkto(0), direkto(180) ],
    tero: ( x ) => x * 0o1/0o2, longo: 0o10 },
];

const PASHO = 0o1/0o4;
let tutaMaks = 0;

for ( const kazo of kazoj ) {
  const defs: VojDifino[] = kazo.brakoj.map(([ dx, dz ]) =>
    ( { pts: [ [ 0, 0 ], [ dx * kazo.longo, dz * kazo.longo ] ], w: 1.75 } as VojDifino ));
  const kunigoj: [ number, number ][] = [ [ 0, 0 ] ];
  const vojoAlteco = kreiVojoAlton(kazo.tero, [ { x: 0, z: 0, direktaj: kazo.brakoj } ]);
  const sceno = new THREE.Scene();
  konstruiVojojn(sceno, defs, vojoAlteco, diorito, andezito, kunigoj);
  konstruiIntersekcajnPlatojn(sceno, kunigoj, vojoAlteco, diorito, andezito,
    new Map([[ "0,0", [ 0, 0 ] ]]),
    new Map([[ "0,0", 0 ]]),
    new Map([[ "0,0", kazo.brakoj ]]));
  const plato = surGrid(vojaSuproDeKunigo(0, 0, kazo.brakoj,
    VOJA_EKSTERA_DUONO, vojoAlteco).supro);
  const rc = new THREE.Raycaster();
  let maks = 0, loko = 0, gradoMaks = 0, mankoj = 0, busxoMaks = 0;
  for ( const [ dx, dz ] of kazo.brakoj ) {
    const grado = Math.round(Math.atan2(dz, dx) * 180 / Math.PI);
    let antaŭa = NaN;
    // ⟨ ចុងដៃសាកល្បង ៖ វាជាចុងសេរី , ដូច្នេះមិនរាប់ជារន្ធទេ 📏 ⟩
    for ( let r = 0; r < kazo.longo - TOLERO; r += PASHO ) {
      rc.set(new THREE.Vector3(dx * r, 80, dz * r), new THREE.Vector3(0, -1, 0));
      const h = rc.intersectObjects(sceno.children, true);
      if ( h.length === 0 ) { mankoj++; antaŭa = NaN; continue; }
      const y = h[ 0 ].point.y;
      if ( Number.isFinite(antaŭa) ) {
        const salto = Math.abs(y - antaŭa);
        if ( salto > maks ) { maks = salto; loko = r; gradoMaks = grado; }
      }
      antaŭa = y;
    }
    // ⟨ មាត់ចាន ៖ កម្ពស់ផ្លូវភ្លាមៗខាងក្រៅចាន ត្រូវស្មើចាន 📏 ⟩
    const rMouth = VOJA_EKSTERA_DUONO + 0o1/0o2;
    rc.set(new THREE.Vector3(dx * rMouth, 80, dz * rMouth), new THREE.Vector3(0, -1, 0));
    const h = rc.intersectObjects(sceno.children, true);
    const y = h.length ? h[ 0 ].point.y : NaN;
    const diferenco = Math.abs(y - plato);
    if ( diferenco > busxoMaks ) busxoMaks = diferenco;
  }
  if ( maks > tutaMaks ) tutaMaks = maks;
  const rompo = maks > STUPA_RISERO + TOLERO;
  console.log(`⟨ ${kazo.nomo} ⟩ ចាន ${plato.toFixed(2)}` +
    ` , លោតខ្ពស់បំផុត ${maks.toFixed(3)} @${loko.toFixed(2)} ដៃ ${gradoMaks}°` +
    ` , មាត់ខុសចាន ${busxoMaks.toFixed(3)}` +
    ` , រន្ធ ${mankoj}` + ( rompo ? "  ⚠ ជញ្ជាំង" : "" ));
}
console.log(`លោតខ្ពស់បំផុតទាំងអស់ ${tutaMaks.toFixed(3)} , លីមីត ${STUPA_RISERO.toFixed(3)}` +
  ( tutaMaks > STUPA_RISERO + TOLERO ? "  ſ̀ȷᴜ̩ ſɭɹ }ʃꞇ" : "" ));
