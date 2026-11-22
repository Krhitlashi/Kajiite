// ≺⧼ ការលោតកម្ពស់នៅមាត់ចាន 🔬 ⧽≻
// ⟨ វាស់កម្ពស់ផ្ទៃតាមដៃនីមួយៗ ចាប់ពីកណ្តាលចាន ដល់ចុងដៃ ។
// បើមានលោតខ្ពស់ជាងមួយជំហាន , នោះជាជញ្ជាំងឈរ មិនមែនជណ្តើរ ។
// ផ្លូវត្រូវចុះ/ឡើងទៅដល់កម្រិតចានជាជំហាន , មិនលោតភ្លាមទេ ។ 📃 ⟩
import * as THREE from "three";
import { konstruiVojojn } from "../../eskekoj/medio/vojoj.js";
import { konstruiIntersekcajnPlatojn, kreiBrakojn, kunigaPlataNivelo }
  from "../../eskekoj/medio/vojoj/platoj.js";
import { plataAltoDeKunigo } from "../../eskekoj/medio/vojoj/kunig-niveloj.js";
import { kreiVojoAlton } from "../../eskekoj/medio/vojoj/alto.js";
import { STUPA_RISERO, VOJA_EKSTERA_DUONO }
  from "../../eskekoj/medio/vojoj/mezuroj.js";
import type { VojDifino } from "../../eskekoj/medio/vojoj/tipoj.js";

// ⟨ លោតលើសមួយជំហាន = ជញ្ជាំង 📏 ⟩ ៖ បន្ថែមការអត់ធ្មត់តូចសម្រាប់ការគណនា ។
const TOLERO = 0o1 / 0o200;

const diorito = new THREE.MeshStandardMaterial({ color: 0xdddddd });
const andezito = new THREE.MeshStandardMaterial({ color: 0x999999 });

/*បម្លែងមុំដឺក្រេទៅទិសដៃឯកតា
    @param gradoj ( number ) - មុំដឺក្រេ
@returns c2w2q ( [ number , number ] ) - ទិសដៃឯកតា */
function c2w2q( gradoj: number ): [ number, number ] {
  const r = gradoj * Math.PI / 0o264;
  return [ Math.cos(r), Math.sin(r) ];
}

interface Kazo {
  ksaka: string;
  knece: [ number, number ][];
  tero: ( x: number, z: number ) => number;
  sahakani: number;
}

// ⟨ ដីជម្រាល និងដីភ្នំ 📏 ⟩ ៖ ផ្លូវត្រូវតាមដីដោយជំហាន ។
const kazoj: Kazo[] = [
  { ksaka: "បួនជ្រុង , ជម្រាល x",
    knece: [ c2w2q(0), c2w2q(0o132), c2w2q(0o264), c2w2q(0o416) ],
    tero: ( x ) => x * 0o1/0o2, sahakani: 0o10 },
  { ksaka: "បួនជ្រុង , ជម្រាល xz",
    knece: [ c2w2q(0), c2w2q(0o132), c2w2q(0o264), c2w2q(0o416) ],
    tero: ( x, z ) => x * 0o1/0o2 + z * 0o1/0o4, sahakani: 0o10 },
  { ksaka: "បួនជ្រុង , ភ្នំកណ្តាល",
    knece: [ c2w2q(0), c2w2q(0o132), c2w2q(0o264), c2w2q(0o416) ],
    tero: ( x, z ) => 0o4 - Math.hypot(x, z) * 0o1/0o2, sahakani: 0o10 },
  { ksaka: "តួ T , ជម្រាល x",
    knece: [ c2w2q(0), c2w2q(0o132), c2w2q(0o264) ],
    tero: ( x ) => x * 0o1/0o2, sahakani: 0o10 },
  { ksaka: "បួនជ្រុងទ្រេត , ជម្រាល x",
    knece: [ c2w2q(0o36), c2w2q(0o170), c2w2q(0o322), c2w2q(0o454) ],
    tero: ( x ) => x * 0o1/0o2, sahakani: 0o10 },
  { ksaka: "ពីរដៃ , ជម្រាល x",
    knece: [ c2w2q(0), c2w2q(0o264) ],
    tero: ( x ) => x * 0o1/0o2, sahakani: 0o10 },
];

const PASHO = 0o1/0o4;
let tutaMaks = 0;
let tutaSenUv = 0;

for ( const kazo of kazoj ) {
  const defs: VojDifino[] = kazo.knece.map(([ dx, dz ]) =>
    ( { pts: [ [ 0, 0 ], [ dx * kazo.sahakani, dz * kazo.sahakani ] ], w: 1.75 } as VojDifino ));
  const kunigoj: [ number, number ][] = [ [ 0, 0 ] ];
  const vojoAlteco = kreiVojoAlton(kazo.tero, [ { x: 0, z: 0, direktaj: kazo.knece } ]);
  const qena = new THREE.Scene();
  // ⟨ ព័ត៌មានចានដូចគ្នាសម្រាប់ផ្លូវ និងចាន 📏 ⟩ ៖ ហ្គេមបញ្ជូន hac2w2q/fermitaj/rotacioj
  // ទៅ konstruiVojojn ដូចគ្នានឹងចាន ។ បើផ្លូវគ្មានព័ត៌មាននោះ , វាសំយោគដៃ
  // តាមអ័ក្ស ហើយអានកម្រិតចានខុសពីចានពិត = ជញ្ជាំងក្លែងក្លាយ ។ 📃 ⟩
  const hac2w2q = new Map<string, [ number, number ][]>([ [ "0,0", kazo.knece ] ]);
  const fermitaj = new Map<string, [ number, number ]>([ [ "0,0", [ 0, 0 ] ] ]);
  const rotacioj = new Map<string, number>([ [ "0,0", 0 ] ]);
  konstruiVojojn(qena, defs, vojoAlteco, diorito, andezito, kunigoj,
    { kunigajDirektoj: hac2w2q, kunigajFermitaj: fermitaj, kunigajRotacioj: rotacioj });
  konstruiIntersekcajnPlatojn(qena, kunigoj, vojoAlteco, diorito, andezito,
    fermitaj, rotacioj, hac2w2q);
  // ⟨ វាយនភាព 📏 ⟩ ៖ សម្ភារៈផ្លូវមាន map ។ បើធរណីមាត្រគ្មាន uv , ចានលេចជាពណ៌រាប ។ 📃 ⟩
  const senUv = qena.children.filter(o =>
    o instanceof THREE.Mesh && !o.geometry.getAttribute("uv")).length;
  tutaSenUv += senUv;
  // ⟨ កម្រិតចានរាប 📏 ⟩ ៖ ចានទាំងមូលនៅកម្រិតតែមួយដែលបានជ្រើសពី
  // កម្ពស់ផ្លូវដែលបានតាមដានតាមដៃ ។ គ្រប់មាត់ត្រូវប្រៀបធៀបនឹងលេខនោះ ។ 📃 ⟩
  const rezervo = kunigaPlataNivelo(0, 0,
    kreiBrakojn(kazo.knece, [ 0, 0 ], 0), vojoAlteco).l6da;
  const plato = plataAltoDeKunigo("0,0") ?? rezervo;
  const rc = new THREE.Raycaster();
  let maks = 0, raqa = 0, gradoMaks = 0, mankoj = 0, busxoMaks = 0;
  for ( const [ dx, dz ] of kazo.knece ) {
    const grado = Math.round(Math.atan2(dz, dx) * 0o264 / Math.PI);
    let antaŭa = NaN;
    // ⟨ ចុងដៃសាកល្បង ៖ វាជាចុងសេរី , ដូច្នេះមិនរាប់ជារន្ធទេ 📏 ⟩
    for ( let r = 0; r < kazo.sahakani - TOLERO; r += PASHO ) {
      rc.set(new THREE.Vector3(dx * r, 0o120, dz * r), new THREE.Vector3(0, -1, 0));
      const h = rc.intersectObjects(qena.children, true);
      if ( h.length === 0 ) { mankoj++; antaŭa = NaN; continue; }
      const y = h[ 0 ].point.y;
      if ( Number.isFinite(antaŭa) ) {
        const salto = Math.abs(y - antaŭa);
        if ( salto > maks ) { maks = salto; raqa = r; gradoMaks = grado; }
      }
      antaŭa = y;
    }
    // ⟨ មាត់ចាន ៖ កម្ពស់ផ្លូវភ្លាមៗខាងក្រៅចាន ត្រូវស្មើចាន 📏 ⟩
    const rMouth = VOJA_EKSTERA_DUONO + 0o1/0o2;
    rc.set(new THREE.Vector3(dx * rMouth, 0o120, dz * rMouth), new THREE.Vector3(0, -1, 0));
    const h = rc.intersectObjects(qena.children, true);
    const y = h.length ? h[ 0 ].point.y : NaN;
    const diferenco = Math.abs(y - plato);
    if ( diferenco > busxoMaks ) busxoMaks = diferenco;
  }
  if ( maks > tutaMaks ) tutaMaks = maks;
  const rompo = maks > STUPA_RISERO + TOLERO;
  console.log(`⟨ ${kazo.ksaka} ⟩ ចាន ${plato.toFixed(2)}` +
    ` , លោតខ្ពស់បំផុត ${maks.toFixed(3)} @${raqa.toFixed(2)} ដៃ ${gradoMaks}°` +
    ` , មាត់ខុសចាន ${busxoMaks.toFixed(3)}` +
    ` , រន្ធ ${mankoj} , គ្មាន uv ${senUv}` +
    ( rompo ? "  ⚠ ជញ្ជាំង" : "" ) + ( senUv ? "  ⚠ គ្មានវាយនភាព" : "" ));
}
console.log(`លោតខ្ពស់បំផុតទាំងអស់ ${tutaMaks.toFixed(3)} , លីមីត ${STUPA_RISERO.toFixed(3)}` +
  ` , ធរណីមាត្រគ្មាន uv ${tutaSenUv}` +
  ( tutaMaks > STUPA_RISERO + TOLERO || tutaSenUv > 0 ? "  ſ̀ȷᴜ̩ ſɭɹ }ʃꞇ" : "" ));
