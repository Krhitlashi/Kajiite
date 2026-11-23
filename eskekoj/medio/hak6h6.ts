// ≺⧼ ſɭэ ֭ſɭэ 🛣️ ⧽≻
import * as THREE from "three";
import { kf2GeometriajnHabakaweKatoman, kf2K6h6jnBendojn, kf2Hak6h6nMaterialojn } from "./hak6h6/habakaweKatoma.js";
import { aldoniC2qjnPecojn, DUONA_RONDO, type C2qPeco } from "./hak6h6/hac2q.js";
import { kf2NivelanProfilon, kf2UnuformajnTreadojn,
  type K6h6Truo } from "./hak6h6/havem2.js";
import { VOJA_BORDA_SEFINI, VOJA_DIKECO,
  VOJA_TRUA_DUONO, VOJA_SUPRO_LEVIGXO, STUPA_RISERO, surGrid } from "./hak6h6/havecax2l.js";
import { kf2Brakojn, kunigaPlataAlto, kunigaPlataVem2 } from "./hak6h6/hapa12.js";
import { kunigajBrakAltoj } from "./hak6h6/haqoxa.js";
import { qakaj2AltoEl, elektiPlatanAlton, konsumiDokajnAltojn, kunigaKlavo,
  kunigajHavem2, purigiKunigajnHavem2n, type BrakaAlto } from "./hak6h6/kunig-havem2.js";
import { vepaqGlatanS2nascen, vepaqS2nascenEnHabakaweKatoman,
  vepaqUnuformajnStuparajnHas2nascen, kf2EksteranDuonon,
  kf2SegmentajnPartojn } from "./hak6h6/has2nasce.js";
import { vojSuprajxoj, type VojDifino, type VojHasukf2qani } from "./hak6h6/hahunaq.js";

// ⟪ ចម្ងាយតាមបណ្តោយផ្លូវ 📏 ⟫
// ⟨ តារាងចម្រៀកគណនាម្តង 📃 ⟩ ៖ មាត់ដៃនីមួយៗនៃចំណុចភ្ជាប់ត្រូវប្រៀបធៀបនឹង
// ផ្លូវទាំងអស់ ។ បើគណនាប្រវែងចម្រៀកឡើងវិញរាល់ដង , Math.hypot រត់រាប់សែនដង
// លើផ្លូវដែលនៅឆ្ងាយ ។ តារាងនេះរក្សាប្រវែង និងព្រំដែនរបស់ផ្លូវម្តង , ហើយ
// ព្រំដែនអនុញ្ញាតឱ្យរំលងផ្លូវឆ្ងាយដោយមិនគណនាអ្វីទាំងអស់ ។ 📃 ⟩
interface K6h6Projekcio {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
  hakek: { ax: number; az: number; dx: number; dz: number;
    sahakani: number; kvadrato: number; akum: number }[];
}

const PROJEKTA_MEMORO =
  new WeakMap<readonly ( readonly [ number, number ] )[], K6h6Projekcio>();

function projekcioDe( n2k: readonly ( readonly [ number, number ] )[] ): K6h6Projekcio {
  const konservita = PROJEKTA_MEMORO.get(n2k);
  if ( konservita ) return konservita;
  const hakek: K6h6Projekcio["hakek"] = [];
  let akum = 0;
  let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
  for ( let i = 0; i < n2k.length - 0o1; i++ ) {
    const [ ax, az ] = n2k[ i ];
    const [ bx, bz ] = n2k[ i + 0o1 ];
    const dx = bx - ax, dz = bz - az;
    const sahakani = Math.hypot(dx, dz);
    if ( ax < minX ) minX = ax;
    if ( ax > maxX ) maxX = ax;
    if ( bx < minX ) minX = bx;
    if ( bx > maxX ) maxX = bx;
    if ( az < minZ ) minZ = az;
    if ( az > maxZ ) maxZ = az;
    if ( bz < minZ ) minZ = bz;
    if ( bz > maxZ ) maxZ = bz;
    if ( sahakani < 0o10 ** -0o6 ) continue;
    hakek.push({ ax, az, dx, dz, sahakani, kvadrato: sahakani * sahakani, akum });
    akum += sahakani;
  }
  const projekcio: K6h6Projekcio = { minX, maxX, minZ, maxZ, hakek };
  PROJEKTA_MEMORO.set(n2k, projekcio);
  return projekcio;
}

/*រកចំណុចជិតបំផុតលើបន្ទាត់ផ្លូវ និងចម្ងាយរបស់វាពីដើម
    @param n2k ( [ number , number ] [ ] ) - បន្ទាត់ផ្លូវ
    @param x, z ( number ) - ចំណុចស្វែងរក
@returns { s , h6kuni } ( object ) - ចម្ងាយតាមបណ្តោយ និងចម្ងាយកាត់ */
function projekcioSurK6h6( n2k: readonly ( readonly [ number, number ] )[],
  x: number, z: number ): { s: number; h6kuni: number } {
  let plej = Infinity, plejS = 0;
  for ( const kek of projekcioDe(n2k).hakek ) {
    const t = Math.max(0, Math.min(1,
      ( ( x - kek.ax ) * kek.dx + ( z - kek.az ) * kek.dz ) / kek.kvadrato ));
    const h6kuni = Math.hypot(x - ( kek.ax + kek.dx * t ),
      z - ( kek.az + kek.dz * t ));
    if ( h6kuni < plej ) { plej = h6kuni; plejS = kek.akum + kek.sahakani * t; }
  }
  return { s: plejS, h6kuni: plej };
}

/*ចម្ងាយកាត់ទៅផ្លូវ ឬ Infinity បើផ្លូវនៅឆ្ងាយជាង limo
    @param n2k ( [ number , number ] [ ] ) - បន្ទាត់ផ្លូវ
    @param x, z ( number ) - ចំណុចស្វែងរក
    @param limo ( number ) - ចម្ងាយអតិបរមាដែលអ្នកហៅយកចិត្តទុកដាក់
@returns h6kuni ( number ) - ចម្ងាយកាត់ ឬ Infinity */
function distancoAlK6h6( n2k: readonly ( readonly [ number, number ] )[],
  x: number, z: number, limo: number ): number {
  const projekcio = projekcioDe(n2k);
  if ( x < projekcio.minX - limo || x > projekcio.maxX + limo
    || z < projekcio.minZ - limo || z > projekcio.maxZ + limo ) return Infinity;
  let plej = Infinity;
  for ( const kek of projekcio.hakek ) {
    const t = Math.max(0, Math.min(1,
      ( ( x - kek.ax ) * kek.dx + ( z - kek.az ) * kek.dz ) / kek.kvadrato ));
    const h6kuni = Math.hypot(x - ( kek.ax + kek.dx * t ),
      z - ( kek.az + kek.dz * t ));
    if ( h6kuni < plej ) plej = h6kuni;
  }
  return plej;
}

// ⟪ ជម្រាលផ្លូវរលូនចូលចាន 📏 ⟫
/*បង្កើតអនុគមន៍កម្ពស់ដែលនាំផ្លូវរលូន ( ស្ពាន ) ទៅកម្រិតចានរាប ។
    ផ្លូវរលូនគ្មាន kf2NivelanProfilon ទេ , ដូច្នេះវាមិនដឹងពីកោណចាន ។
    បើគ្មានការកែនេះ ស្ពានឈប់នៅកម្ពស់ផ្ទាល់ខ្លួន ហើយមាត់ចានក្លាយជាជញ្ជាំង ។
    @param kruda ( function ) - កម្ពស់ផ្ទៃផ្លូវដើម
    @param n2k ( [ number , number ] [ ] ) - បន្ទាត់ផ្លូវ
    @param haveb6kek ( [ number , number ] [ ] ) - ចំណុចភ្ជាប់
    @param plataAlto ( function ) - កម្រិតចានរាបនៅចំណុចភ្ជាប់
    @param p2somani ( number ) - កន្លះទទឹងផ្លូវ
@returns l6da ( function ) - កម្ពស់ដែលឡើងជាជម្រាលពីចាន */
// ⟨ ចម្ងាយតាមបណ្តោយផ្លូវ មិនមែនចម្ងាយត្រង់ 📏 ⟩ ៖ ផ្លូវរលូនអានកម្ពស់
// នៅគែមទាំងពីរ ( ឆ្វេង / ស្តាំ ) ។ បើវាស់ចម្ងាយត្រង់ពីចំណុចភ្ជាប់ , គែម
// នៅឆ្ងាយជាងខ្សែកណ្តាល , ទទួលបានជម្រាលខ្ពស់ជាង , ហើយផ្លូវលោតនៅមាត់ចាន ។
// ឥឡូវគ្រប់ចំណុចលើបន្ទាត់កាត់ដូចគ្នាប្រើចម្ងាយតាមបណ្តោយដូចគ្នា ,
// ដូច្នេះផ្ទៃផ្លូវនៅរាបពេញទទឹង ហើយជម្រាលចាប់ពីកម្រិតចានពិត ។ 📃 ⟩
// ⟨ ជម្រាលមួយជំហានក្នុងមួយឯកតា 📏 ⟩ ៖ ចម្ងាយពីមាត់ចានកំណត់ថាផ្លូវ
// អាចខុសពីកម្រិតចានប៉ុន្មាន ។ ដូច្នេះផ្លូវឡើងដល់កម្ពស់របស់វាដោយជម្រាល ,
// មិនលោតភ្លាមៗ ។ 📃 ⟩
function rampigiAlPa12n(
  kruda: ( x: number, z: number ) => number,
  n2k: readonly ( readonly [ number, number ] )[],
  haveb6kek: readonly ( readonly [ number, number ] )[],
  plataAlto: ( x: number, z: number ) => number,
  p2somani: number
): ( x: number, z: number ) => number {
  // ⟨ ទីតាំងចំណុចភ្ជាប់លើផ្លូវ 📐 ⟩ ៖ គណនាម្តង , មិនគណនារាល់គំរូ ។
  const lokoj = haveb6kek.map(([ kx, kz ]) => {
    const p = projekcioSurK6h6(n2k, kx, kz);
    return { x: kx, z: kz, s: p.s, h6kuni: p.h6kuni };
  }).filter(l => l.h6kuni <= p2somani + 0o1/0o100);
  // ⟨ កោណទាំងពីរទិស 📏 ⟩ ៖ មុននេះ tseuni ចាប់ផ្តើមពី soza ហើយ
  // គ្រាន់តែយក Math.min ជាមួយកោណនីមួយៗ ។ ដូច្នេះវាអាចទាញផ្លូវចុះ
  // មករកចាន តែមិនអាចលើកផ្លូវឡើងដល់ចានខ្ពស់ជាងបានទេ ។ ចុងម្ខាង
  // នៃស្ពាននៅទាបជាងចាន ហើយជម្រាលមិនកើតឡើង = ជញ្ជាំងឈរ ។ ឥឡូវ
  // ប្រមូលព្រំដែនទាញឡើងទាំងអស់ និងព្រំដែនទាញចុះទាំងអស់ រួចកំណត់
  // ផ្ទៃឱ្យនៅក្នុងចន្លោះនោះ ។ កោណឆ្ងាយរលាយទៅជាគ្មានកំណត់ ។ 📃 ⟩
  return ( x, z ) => {
    const soza = kruda( x, z ) + VOJA_SUPRO_LEVIGXO;
    const { s } = projekcioSurK6h6(n2k, x, z);
    let psaz = -Infinity, teru = Infinity;
    for ( const l of lokoj ) {
      const d = Math.abs(s - l.s);
      if ( d > VOJA_TRUA_DUONO + 0o20 ) continue;
      const p = plataAlto( l.x, l.z );
      const margxo = Math.max(0, d - VOJA_TRUA_DUONO);
      psaz = Math.max(psaz, p - margxo);
      teru = Math.min(teru, p + margxo);
    }
    // ⟨ កោណជាន់គ្នា 📏 ⟩ ៖ ចានពីរខុសកម្រិតខ្លាំងពេកសម្រាប់ចម្ងាយ ។
    // យកកណ្តាល ដើម្បីកុំឱ្យផ្លូវលោតពីកោណមួយទៅកោណមួយ ។ 📃 ⟩
    const tseuni = psaz <= teru
      ? Math.max(psaz, Math.min(teru, soza))
      : ( psaz + teru ) / 0o2;
    return tseuni - VOJA_SUPRO_LEVIGXO;
  };
}

// ⟪ ការសាងសង់បណ្តាញផ្លូវ 🏗️ ⟫
export function vepaqHak6h6n(qena: THREE.Scene,
  defs: VojDifino[],
  heightFn: ( x: number, z: number ) => number,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial,
  haveb6kek: [ number, number ][] = [],
  hasukf2qani: VojHasukf2qani = {}
): THREE.Vector3[] {
  const { akvaFn, grundoFn = heightFn, kunigajDirektoj,
    kunigajFermitaj, kunigajRotacioj, kunigajDuonoj } = hasukf2qani;
  // ⟨ បាតផ្លូវមិនចុះក្រោមទឹក 📏 ⟩ ៖ បាតអានដីពិត , ហើយដីក្រោមទឹកជាបាតទន្លេ ។
  // បើបាតចុះដល់បាតទន្លេ , ផ្លូវក្លាយជាទំនប់ ហើយឃើញជាជញ្ជាំងក្នុងទឹក ។
  // ដូច្នេះលើទឹក បាតមិនចុះទេ ៖ វាត្រឡប់ជាស្តើង , ដូចស្ពាន ។
  // ផ្លូវនៅលើទឹកក៏មើលទៅដូចផ្លូវកំពង់ ។ 📃 ⟩
  const fundaFn: ( x: number, z: number ) => number = akvaFn
    ? ( x, z ) => {
        const grundo = grundoFn(x, z);
        const akvo = akvaFn(x, z);
        if ( akvo <= -Infinity ) return grundo;
        // ⟨ លិចក្រោមទឹក ៖ គ្មានបាត ៖ ផ្លូវស្តើងស្មើគ្នា ។ 📃 ⟩
        if ( grundo < akvo ) return Infinity;
        return grundo;
      }
    : grundoFn;
  const samples: THREE.Vector3[] = [];
  const { supraMaterialo, bordaMaterialo } = kf2Hak6h6nMaterialojn(dioritaMaterialo, andezitaMaterialo, -2, -4, -1, -1);

  const habakaweKatoma = kf2GeometriajnHabakaweKatoman();
  // ⟪ កម្ពស់ផ្លូវតាមដៃ 📏 ⟫
  // ⟨ តាមដានផ្លូវពិត មិនមែនវាលរួម 📃 ⟩ ៖ មុននេះចានអានវាលកម្ពស់រួមនៅមាត់
  // ដៃទាំងអស់ ។ វាលនោះមានកោណចានរួចហើយ ( វង់ ) , ដូច្នេះគ្រប់ដៃរកឃើញ
  // កម្ពស់តែមួយ ។ ផ្លូវដែលមានអនុគមន៍កម្ពស់ផ្ទាល់ខ្លួន ( ស្ពាន ) មិនត្រូវបាន
  // គិតទាល់តែសោះ ហើយបញ្ចប់ដោយជញ្ជាំងឈរ ។ ឥឡូវរាល់ផ្លូវរាយការណ៍កម្ពស់
  // ផ្ទៃរបស់វាតាមដៃនីមួយៗ មុនពេលកោណចានណាមួយត្រូវបានអនុវត្ត ។ 📃 ⟩
  purigiKunigajnHavem2n();
  // ⟨ កម្រិតចំណត ⚓ ⟩ ៖ ចំណតបានចុះឈ្មោះមុនផ្លូវ ។ យកវាម្តង ហើយលុប
  // ដើម្បីឱ្យការសាងសង់បន្ទាប់ចាប់ផ្តើមស្អាត ។ 📃 ⟩
  const qakaj2jAltoj = konsumiDokajnAltojn();
  const naturaj = defs.map(def => {
    const bendoj = kf2K6h6jnBendojn(def.w, supraMaterialo, bordaMaterialo);
    const p2somani = kf2EksteranDuonon(bendoj);
    const kruda = def.heightFn || heightFn;
    const pudalla = def.glata === true || def.stuparo === true;
    // ⟨ ប្រវត្តិរូបធម្មជាតិ 📏 ⟩ ៖ គ្មាន haveb6kek , ដូច្នេះវាមិនអានកម្រិតចានវិញទេ ។
    const s2qena = pudalla ? null : kf2NivelanProfilon(def.pts, p2somani, kruda, akvaFn);
    return { p2somani, altoCxe: ( px: number, pz: number ): number => {
      if ( s2qena ) return s2qena.altoCxe(projekcioSurK6h6(def.pts, px, pz).s);
      return kruda(px, pz) + VOJA_SUPRO_LEVIGXO;
    } };
  });
  for ( const [ kx, kz ] of haveb6kek ) {
    const ca3aq = kunigaKlavo(kx, kz);
    const knece = kf2Brakojn(kunigajDirektoj?.get(ca3aq) ?? [],
      kunigajFermitaj?.get(ca3aq), kunigajRotacioj?.get(ca3aq) ?? 0,
      kunigajDuonoj?.get(ca3aq));
    const brakajAltoj: BrakaAlto[] = knece.map(b => {
      // ⟨ អានមាត់ដៃខាងក្រៅរន្ធ 📏 ⟩ ៖ ត្រង់ណាដែលផ្លូវពិតចាប់ផ្តើម ។
      const px = kx + b.ux * ( VOJA_TRUA_DUONO + 0o1/0o4 );
      const pz = kz + b.uz * ( VOJA_TRUA_DUONO + 0o1/0o4 );
      let plej = Infinity, l6da = NaN;
      for ( let i = 0; i < defs.length; i++ ) {
        const limo = naturaj[ i ].p2somani + 0o1/0o100;
        const h6kuni = distancoAlK6h6(defs[ i ].pts, px, pz, limo);
        if ( h6kuni > limo ) continue;
        if ( h6kuni < plej ) { plej = h6kuni; l6da = naturaj[ i ].altoCxe(px, pz); }
      }
      // ⟨ ជ្រុងបិទ 📏 ⟩ ៖ គ្មានផ្លូវមកដល់ដៃនេះ , អានវាលជុំវិញជំនួស ។
      if ( !Number.isFinite(l6da) )
        l6da = kunigajBrakAltoj(kx, kz, [ [ b.ux, b.uz ] ], [ b.p2somani ], heightFn)[ 0 ]
          + VOJA_SUPRO_LEVIGXO;
      return { ux: b.ux, uz: b.uz, l6da: surGrid(l6da), p2somani: b.p2somani };
    });
    // ⟨ កម្រិតដី 📏 ⟩ ៖ ចានមិនអាចទាបជាងដីកណ្តាល ឬ ដីនៅមាត់ដៃទេ ។
    // kunigaPlataAlto អានទាំងពីរ ហើយហ្គេម ចាន និងឧបករណ៍វាស់ប្រើវាដូចគ្នា ។ 📃 ⟩
    const rezervo = kunigaPlataAlto(kx, kz, knece, heightFn);
    // ⟨ ចាននៅមាត់ចំណត ⚓ ⟩ ៖ វេទិកាចំណតជាប់នឹងចានដោយផ្ទាល់ ។ ចានត្រូវ
    // យកកម្រិតវេទិកា , មិនមែនកម្រិតដែលគណនាពីផ្លូវទេ ។ ផ្លូវឡើង/ចុះ
    // ជាជំហានមករកចានវិញ ដូចគ្រប់ចំណុចភ្ជាប់ផ្សេង ។ 📃 ⟩
    const qakaj2Alto = qakaj2AltoEl(qakaj2jAltoj, kx, kz);
    kunigajHavem2.set(ca3aq, { x: kx, z: kz,
      l6da: qakaj2Alto ?? elektiPlatanAlton(brakajAltoj, rezervo),
      knece: brakajAltoj });
  }
  const plataAltoCxeVeb6kek = ( x: number, z: number ): number => {
    const ca3aq = kunigaKlavo(x, z);
    const reg = kunigajHavem2.get(ca3aq);
    if ( reg ) return reg.l6da;
    const knece = kf2Brakojn(kunigajDirektoj?.get(ca3aq) ?? [],
      kunigajFermitaj?.get(ca3aq), kunigajRotacioj?.get(ca3aq) ?? 0,
      kunigajDuonoj?.get(ca3aq));
    return surGrid(kunigaPlataVem2(x, z, knece, heightFn).l6da);
  };
  // ⟨ កម្រិតរាបតែមួយ 📏 ⟩ ៖ ចាន និងចុងជណ្តើរអានលេខដូចគ្នា ។
  const pa12Cxe = plataAltoCxeVeb6kek;
  // ⟨ កម្រិតផ្លូវនៅចុងក្រោយ ៖ ប្រើសម្រាប់មួកផ្លូវដែលឆ្លងចូលមកចានភ្ជាប់ ។ 📃 ⟩
  const kapoAltoj = new Map<VojDifino, { saxeni: number | null; fino: number | null }>();
  // ⟨ គែមមូលទាំងអស់ 🌗 ⟩ ៖ ចុងផ្លូវសេរី និងជ្រុងកន្លែងបត់ ឆ្លងកាត់
  // ប៊ូហ្វ័រតែមួយជាមួយចម្រៀកត្រង់ ។ ប្រមូលមុនគូរធរណីមាត្រ , ព្រោះ
  // កម្ពស់របស់វាត្រូវស្ថិតលើកម្រិតផ្លូវដូចគ្នានឹងចម្រៀកទាំងពីរ ។ 📃 ⟩
  const c2qjPecoj: C2qPeco[] = [];

  for ( const def of defs ) {
    const krudaAlt = def.heightFn || heightFn;
    // ⟨ ស្ពានត្រូវឡើងដល់ចានដោយជម្រាល 📏 ⟩ ៖ ផ្លូវរលូនគ្មានប្រវត្តិរូប
    // ជំហាន , ដូច្នេះកោណចានក្នុង kf2NivelanProfilon មិនប៉ះវាទេ ។
    // ផ្លូវធម្មតាមានប្រវត្តិរូបរួចហើយ ; ជណ្តើរចំណតមានកម្រាលផ្ទាល់ខ្លួន ។
    // ការរុំអនុគមន៍កម្ពស់នាំតែស្ពានចុះ/ឡើងដល់កម្រិតចានត្រង់មាត់រន្ធ ។ 📃 ⟩
    const bendoj = kf2K6h6jnBendojn(def.w, supraMaterialo, bordaMaterialo);
    const eksteraDuono = kf2EksteranDuonon(bendoj);
    const defAlt = def.glata === true
      ? rampigiAlPa12n(krudaAlt, def.pts, haveb6kek, plataAltoCxeVeb6kek, eksteraDuono)
      : krudaAlt;
    const defGrundo = def.grundoFn ?? fundaFn;
    kapoAltoj.set( def, { saxeni: null, fino: null } );
    const notiFinon = ( saxeni: number | null, tlakakani: number | null ): void => {
      const teruni = kapoAltoj.get(def)!;
      teruni.saxeni = saxeni;
      teruni.fino = tlakakani;
    };
    if ( def.stuparo === true ) {
      let xaqadi: number | null = null, z2hak: number | null = null;
      // ⟨ ចានភ្ជាប់នៅចុងជណ្តើរ 📏 ⟩ ៖ ជណ្តើរដែលចូលដល់ចានភ្ជាប់ត្រូវយកកម្រិតចាននោះ ,
      // មិនមែនកម្រិតរបស់ខ្លួនទេ ។ បើមិនដូច្នេះ , កម្រាលខ្ពស់បំផុតរបស់ជណ្តើរ
      // ខុសពីចាន , ហើយឃើញជាជញ្ជាំងឈរនៅចន្លោះ ។ 📃 ⟩
      const pa12CxeFinon = ( pto: [ number, number ] ): number | null => {
        for ( const [ kX, kZ ] of haveb6kek ) {
          if ( Math.hypot(pto[0] - kX, pto[1] - kZ) > VOJA_TRUA_DUONO ) continue;
          return pa12Cxe(kX, kZ);
        }
        return null;
      };
      const unuaPa12 = pa12CxeFinon(def.pts[0]);
      const lastaPa12 = pa12CxeFinon(def.pts[def.pts.length - 1]);
      // ⟨ កម្រាលទីមួយចុះមួយជំហាន 📏 ⟩ ៖ ផ្ទៃចានជាកន្លែងឈរ , ដូច្នេះកម្រាលទីមួយ
      // ទាបជាងចានមួយជំហាន ។ អនុគមន៍សាងសង់បន្ថែម VOJA_SUPRO_LEVIGXO ,
      // ដូច្នេះដកវាចេញនៅទីនេះ ។ 📃 ⟩
      const stupaAlto = ( x: number, z: number ): number => {
        const pa12 = pa12CxeFinon([ x, z ]);
        if ( pa12 !== null ) return pa12 - STUPA_RISERO - VOJA_SUPRO_LEVIGXO;
        return defAlt(x, z);
      };
      // ⟨ ជម្រាលមុខជំហាន 📏 ⟩ ៖ ជំហាននីមួយៗចុះទៅកម្រិតជំហានបន្ទាប់ ។
      // កម្រិតអានត្រង់កណ្តាលចម្រៀក , ដូចអនុគមន៍សាងសង់ , ដូច្នេះជម្រាលត្រូវនឹងជំហានពិត ។
      // ជំហានចុងក្រោយគ្មានជំហានបន្ទាប់ទេ , ដូច្នេះវារាបទាំងស្រុង ។ 📃 ⟩
      // ⟨ កម្រាលមិនកប់ក្នុងដី 📏 ⟩ ៖ ប្រវត្តិរូបជណ្តើរចំណតដឹងតែកម្រិតចាន
      // និងវេទិកា ។ ដីអាចខ្ពស់ជាងជម្រាលនៅកណ្តាល ឬនៅគែមកម្រាល ។ អានទទឹង
      // ពេញនៃកម្រាលនីមួយៗ ហើយលើកវាឱ្យនៅលើដីខ្ពស់បំផុត ។ 📃 ⟩
      const teraPlanko = ( ax: number, az: number, bx: number, bz: number ): number => {
        const sahakani = Math.hypot(bx - ax, bz - az);
        if ( sahakani < 0o1/0o1000 ) return -Infinity;
        const latX = -( bz - az ) / sahakani * eksteraDuono;
        const latZ = ( bx - ax ) / sahakani * eksteraDuono;
        let planko = -Infinity;
        for ( const t of [ 0, 0o1/0o2, 1 ] ) {
          const px = ax + ( bx - ax ) * t, pz = az + ( bz - az ) * t;
          for ( const kanto of [ -1, 0, 1 ] ) {
            const grundo = defGrundo(px + latX * kanto, pz + latZ * kanto);
            if ( !Number.isFinite(grundo) ) continue;
            const akvo = akvaFn?.(px + latX * kanto, pz + latZ * kanto) ?? -Infinity;
            // ⟨ កម្រាលក្រោមទឹកឡើងមួយជំហាន 📏 ⟩ ៖ កម្ពស់ថ្មីនៅតែក្រោម
            // ផ្ទៃទឹក ដូច្នេះជណ្តើរលេចច្បាស់ដោយមិនក្លាយជាស្ពានទាប ។ 📃 ⟩
            const levigita = Math.min(grundo + VOJA_SUPRO_LEVIGXO + STUPA_RISERO,
              akvo - VOJA_SUPRO_LEVIGXO);
            planko = Math.max(planko, grundo + VOJA_SUPRO_LEVIGXO, levigita);
          }
        }
        return planko;
      };
      const stupajAltoj: number[] = [];
      const lastaIndekso = def.pts.length - 0o2;
      for ( let i = 0; i < def.pts.length - 1; i++ ) {
        const [ ax, az ] = def.pts[i], [ bx, bz ] = def.pts[i + 1];
        const sost2 = stupaAlto(( ax + bx ) / 0o2, ( az + bz ) / 0o2);
        stupajAltoj.push(Math.max(sost2, teraPlanko(ax, az, bx, bz)));
      }
      // ⟨ ចុងជណ្តើរយកកម្រិតចានដោយផ្ទាល់ 📏 ⟩ ៖ ការអានត្រង់កណ្តាលចម្រៀកមិនគ្រប់ទេ ,
      // ព្រោះចំណុចកណ្តាលអាចនៅឆ្ងាយពីចាន ។ ដូច្នេះចម្រៀកដំបូង និងចុងក្រោយ
      // យកកម្រិតចាន លើកលែងតែដីនៅទីនោះខ្ពស់ជាង ។ 📃 ⟩
      // ⟨ ជម្រាលចុងយកកម្រិតពីអនុគមន៍កម្ពស់ ៖ មិនប្រើជំហានថេរ STUPA_RISERO ទេ ។
      // បើប្រើជំហានថេរ , ចំណតដែលធ្លាក់តិច ( ឧ. 0.4 ) នឹងលើសជំហាន 0.5 ហើយ
      // ជណ្តើរលិចក្រោមផ្ទៃចំណត រួចឡើងវិញ = ជញ្ជាំងឈរ ។ អនុគមន៍កម្ពស់ដឹងជំហានពិត
      // ដូច្នេះចានភ្ជាប់បានរាបដល់ផ្ទៃចំណតដោយគ្មានជញ្ជាំង ។ 📃 ⟩
      if ( lastaIndekso >= 0 ) {
        if ( unuaPa12 !== null ) stupajAltoj[0] = Math.max(stupajAltoj[0],
          defAlt(def.pts[0][0], def.pts[0][1]));
        if ( lastaPa12 !== null ) stupajAltoj[lastaIndekso] = Math.max(stupajAltoj[lastaIndekso],
          defAlt(def.pts[lastaIndekso + 1][0], def.pts[lastaIndekso + 1][1]));
      }
      for ( let i = 0; i < def.pts.length - 1; i++ ) {
        const [ aX, aZ ] = def.pts[i];
        const [ bX, bZ ] = def.pts[i + 1];
        const fala = i + 1 < stupajAltoj.length ? stupajAltoj[i] - stupajAltoj[i + 1] : 0;
        const tseuni = vepaqUnuformajnStuparajnHas2nascen(aX, aZ, bX, bZ, bendoj, VOJA_DIKECO,
          () => stupajAltoj[i], defGrundo, habakaweKatoma, fala);
        if ( tseuni ) {
          if ( xaqadi === null ) xaqadi = tseuni.xaqadi;
          z2hak = tseuni.z2hak;
        }
        aldonuSpecimenojn(samples, aX, aZ, bX, bZ, defAlt);
      }
      notiFinon(xaqadi, z2hak);
      continue;
    }
    // ⟨ កម្រិតទាំងអស់កំណត់ម្តង មុនការសាងសង់ ៖ ដូច្នេះជំហានមិនអាចលោត
    // ឬធ្លាក់ចូលរណ្តៅខ្លីនៅចន្លោះចម្រៀកបានទេ ។ 📃 ⟩
    // ⟨ ផ្លូវទាំងអស់ចេញពីកន្លែងតែមួយ 📃 ⟩ ៖ ស្ពានមិនមែនប្រព័ន្ធដាច់ដោយឡែកទេ ។
    // វាចូលរួមខ្សែ , សម្ភារៈ , មួកផ្លូវ និងការប៉ះទង្គិចដូចផ្លូវឯទៀត ។
    // ភាពខុសគ្នាតែមួយ ៖ ផ្ទៃរបស់វារលូន , ព្រោះវាជាចម្រៀកវែងតែមួយ ( ធ្នូ ) ,
    // មិនមែនជណ្តើរថ្មដូចផ្លូវលើដី ។ 📃 ⟩
    const s2qena = def.glata === true
      ? null
      : kf2NivelanProfilon(def.pts, eksteraDuono, defAlt, akvaFn,
        haveb6kek.map(([ x, z ]) => ( { x, z, l6da: pa12Cxe(x, z) } )));
    // ⟨ កាលវិភាគជម្រាលម្តងសម្រាប់ផ្លូវទាំងមូល 📏 ⟩ ៖ ចម្រៀក និងរន្ធ
    // ចានភ្ជាប់កាត់ផ្លូវនៅចំណុចណាមួយ ។ បើគណនាជម្រាលក្រោយកាត់ , បំណែកខ្លី
    // បង្ហាប់ជម្រាលឱ្យឈរដូចជញ្ជាំង ។ គណនាមុនកាត់ រួចគ្រាន់តែកាត់ប្រអប់ ។ 📃 ⟩
    // ⟨ គែមចេញនៃរន្ធ 📏 ⟩ ៖ ប្រមូលរន្ធពី kf2SegmentajnPartojn ដដែល
    // ដែលកាត់ធរណីមាត្រ ។ កាលវិភាគប្រើវាដើម្បីកុំឱ្យជម្រាលចាប់ផ្តើម
    // នៅក្រោមចាន ។ គ្មានច្បាប់កាត់ផ្លូវទីពីរទេ ។ 📃 ⟩
    const truoj: K6h6Truo[] = [];
    if ( s2qena ) {
      let sTruo = 0;
      for ( let i = 0; i < def.pts.length - 0o1; i++ ) {
        const [ aX, aZ ] = def.pts[ i ], [ bX, bZ ] = def.pts[ i + 0o1 ];
        const longo2 = Math.hypot(bX - aX, bZ - aZ);
        if ( longo2 < 0o1/0o100 ) continue;
        for ( const [ t0, t1, vepaquPec ] of
          kf2SegmentajnPartojn(aX, aZ, bX, bZ, longo2, haveb6kek) )
          if ( !vepaquPec ) truoj.push({ s0: sTruo + t0, s1: sTruo + t1 });
        sTruo += longo2;
      }
    }
    const treadoj = s2qena ? kf2UnuformajnTreadojn(s2qena, truoj) : [];
    // ⟪ ជង្គង់មូលនៅកន្លែងបត់ 🌗 ⟫
    // ⟨ ចៀសចំណុចភ្ជាប់ 📏 ⟩ ៖ ចានភ្ជាប់មានធ្នូជ្រុងរួចហើយ ។ បើដាក់
    // ជង្គង់លើវាទៀត , ផ្ទៃពីរជាន់គ្នាហើយលេចជាស្រទាប់ ។ 📃 ⟩
    let akum = 0;
    for ( let k = 1; k < def.pts.length - 0o1; k++ ) {
      const antaux = def.pts[ k - 0o1 ], nuna = def.pts[ k ], sekva = def.pts[ k + 0o1 ];
      const l1 = Math.hypot(nuna[ 0 ] - antaux[ 0 ], nuna[ 1 ] - antaux[ 1 ]);
      const l2 = Math.hypot(sekva[ 0 ] - nuna[ 0 ], sekva[ 1 ] - nuna[ 1 ]);
      akum += l1;
      if ( l1 < 0o1/0o1000 || l2 < 0o1/0o1000 ) continue;
      const u1x = ( nuna[ 0 ] - antaux[ 0 ] ) / l1, u1z = ( nuna[ 1 ] - antaux[ 1 ] ) / l1;
      const u2x = ( sekva[ 0 ] - nuna[ 0 ] ) / l2, u2z = ( sekva[ 1 ] - nuna[ 1 ] ) / l2;
      const turno = Math.abs(Math.atan2(u1x * u2z - u1z * u2x, u1x * u2x + u1z * u2z));
      if ( turno < 0o1/0o20 ) continue;
      let enTruo = false;
      for ( const [ kx, kz ] of haveb6kek ) {
        if ( Math.hypot(nuna[ 0 ] - kx, nuna[ 1 ] - kz ) < VOJA_TRUA_DUONO + 0o1/0o10 ) {
          enTruo = true; break;
        }
      }
      if ( enTruo ) continue;
      // ⟨ តែធ្នូនៃជ្រុងខាងក្នុង 📏 ⟩ ៖ មុននេះជង្គង់ជាចិញ្ចៀនពេញ , ដូច្នេះ
      // អាន់ដេហ្ស៊ីតលាតលើឌីអូរីតនៃចម្រៀកត្រង់ទាំងពីរ ហើយលេចជាសំណល់
      // នៅកណ្តាលផ្លូវ ។ ចន្លោះដែលគ្មានប្រអប់ចម្រៀកគឺជាក្រូចឆ្មាររវាង
      // ទិសចូល និងទិសចេញ ។ កណ្តាលរបស់វាស្ថិតលើ u1 − u2 , ទំហំរបស់វា
      // ស្មើនឹងមុំបត់ ។ គូរតែវិស័យនោះ គ្មានជាន់គ្នានឹងផ្លូវត្រង់ទេ ។ 📃 ⟩
      c2qjPecoj.push({ x: nuna[ 0 ], z: nuna[ 1 ],
        sost2: Math.atan2(u1z - u2z, u1x - u2x), gamo: turno,
        teru: s2qena ? s2qena.altoCxe(akum)
          : defAlt(nuna[ 0 ], nuna[ 1 ]) + VOJA_SUPRO_LEVIGXO,
        p2somani: def.w / 0o2, ekstera: eksteraDuono });
    }
    let xaqadi: number | null = null, z2hak: number | null = null;
    let saxeni = 0;
    for ( let i = 0; i < def.pts.length - 1; i++ ) {
      const [ aX, aZ ] = def.pts[i];
      const [ bX, bZ ] = def.pts[i + 1];
      const sahakani = Math.hypot(bX - aX, bZ - aZ);
      if ( sahakani < 0o1/0o100 ) continue;
      const ndx = ( bX - aX ) / sahakani, ndz = ( bZ - aZ ) / sahakani;
      for ( const [ t0, t1, vepaquPec ] of kf2SegmentajnPartojn(aX, aZ, bX, bZ, sahakani, haveb6kek) ) {
        const px1 = aX + ndx * t0, pz1 = aZ + ndz * t0;
        const px2 = aX + ndx * t1, pz2 = aZ + ndz * t1;
        if ( vepaquPec ) {
          const tseuni = s2qena
            ? vepaqS2nascenEnHabakaweKatoman(px1, pz1, px2, pz2, saxeni + t0, saxeni + t1, bendoj,
              treadoj, habakaweKatoma, VOJA_DIKECO, defGrundo)
            : vepaqGlatanS2nascen(px1, pz1, px2, pz2, bendoj, VOJA_DIKECO, defAlt, defGrundo, habakaweKatoma);
          if ( tseuni ) {
            if ( xaqadi === null ) xaqadi = tseuni.xaqadi;
            z2hak = tseuni.z2hak;
          }
          continue;
        }
        // ⟨ រន្ធភ្ជាប់ ៖ ចានភ្ជាប់គ្របទីនោះ , តែកម្រិតត្រូវកត់ទុកសម្រាប់ការប៉ះទង្គិច ។ 📃 ⟩
        const mX = ( px1 + px2 ) / 0o2, mZ = ( pz1 + pz2 ) / 0o2;
        const kunigaSupro = s2qena
          ? s2qena.altoCxe(saxeni + ( t0 + t1 ) / 0o2)
          : Math.max(defAlt(mX, mZ)) + 0o1/0o100 + VOJA_DIKECO;
        vojSuprajxoj.push({ x1: px1, z1: pz1, x2: px2, z2: pz2, p2somani: eksteraDuono,
          y0: kunigaSupro, y1: kunigaSupro });
      }
      aldonuSpecimenojn(samples, aX, aZ, bX, bZ, defAlt);
      saxeni += sahakani;
    }
    notiFinon(xaqadi, z2hak);
  }
  // ⟪ មួកផ្លូវចុងសេរី 🌗 ⟫
  // ⟨ ពាក់រង្វង់ពេញដូចចុងចំណត 📏 ⟩ ៖ ចុងផ្លូវប្រើទម្រង់ធ្នូរួមដូចគ្នា
  // នឹងជង្គង់ , គ្រាន់តែទំហំធ្នូ π ជំនួសឱ្យមុំបត់ ។ 📃 ⟩
  const finokalkulo = new Map<string, number>();
  for ( const def of defs ) {
    if ( def.pts.length < 2 || def.hateruni !== true ) continue;
    for ( const pto of [ def.pts[0], def.pts[def.pts.length - 1] ] ) {
      const ca3aq = pto[0] + "," + pto[1];
      finokalkulo.set(ca3aq, ( finokalkulo.get(ca3aq) ?? 0 ) + 1);
    }
  }
  const kapoVidita: [ number, number ][] = [];
  for ( const def of defs ) {
    if ( def.pts.length < 2 || def.hateruni !== true || def.stuparo === true ) continue;
    const teruni = kapoAltoj.get( def );
    const hatlakakani: [ [ number, number ], [ number, number ], number | null ][] = [
      [ def.pts[0], def.pts[1], teruni?.saxeni ?? null ],
      [ def.pts[def.pts.length - 1], def.pts[def.pts.length - 2], teruni?.fino ?? null ],
    ];
    for ( const [ tlakakani, najbaro, supraY ] of hatlakakani ) {
      const dx = tlakakani[0] - najbaro[0], dz = tlakakani[1] - najbaro[1];
      const direktaLongo = Math.hypot( dx, dz );
      if ( direktaLongo < 0o1/0o100 ) continue;
      if ( ( finokalkulo.get(tlakakani[0] + "," + tlakakani[1]) ?? 0 ) > 1 ) continue;
      if ( kapoVidita.some(([ vx, vz ]) => Math.hypot(tlakakani[0] - vx, tlakakani[1] - vz) < 0o1/0o100) ) continue;
      let enTruo = false;
      for ( const [ kX, kZ ] of haveb6kek ) {
        if ( Math.hypot(tlakakani[0] - kX, tlakakani[1] - kZ) < VOJA_TRUA_DUONO + 0o1/0o100 ) { enTruo = true; break; }
      }
      if ( enTruo ) continue;
      kapoVidita.push([ tlakakani[0], tlakakani[1] ]);
      const defAlt = def.heightFn || heightFn;
      c2qjPecoj.push({ x: tlakakani[ 0 ], z: tlakakani[ 1 ],
        sost2: Math.atan2(dz, dx), gamo: DUONA_RONDO,
        p2somani: def.w / 0o2, ekstera: def.w / 0o2 + VOJA_BORDA_SEFINI,
        teru: supraY ?? defAlt(tlakakani[ 0 ], tlakakani[ 1 ]) + VOJA_SUPRO_LEVIGXO });
    }
  }
  // ⟨ ផ្លូវទាំងអស់ជា Mesh តែមួយក្នុងមួយសម្ភារៈ 📏 ⟩ ។
  aldoniC2qjnPecojn(habakaweKatoma, c2qjPecoj, supraMaterialo, bordaMaterialo, fundaFn);
  // ⟨ ផ្លូវទទួលស្រមោលតែមិនបញ្ចេញ ៖ មាត់ចានជាន់គ្នាបន្តិច ,
  //   ដូច្នេះស្រមោលខ្លួនឯងបង្កើតខ្សែខ្មៅរវាងចំណុចភ្ជាប់ 📃 ⟩
  habakaweKatoma.kunigi(qena, false);
  return samples;
}

// ⟪ គំរូផ្លូវសម្រាប់ការដករុក្ខជាតិ 🌿 ⟫
/*បន្ថែមចំណុចតាមបណ្តោយផ្លូវ ដើម្បីកុំឱ្យរុក្ខជាតិដុះលើផ្លូវ
    @param samples ( Vector3 [ ] ) - បញ្ជីចំណុចសរុប
    @param aX, aZ ( number ) - ចំណុចដើម
    @param bX, bZ ( number ) - ចំណុចចុង
    @param altFn ( function ) - កម្ពស់ផ្លូវ */
function aldonuSpecimenojn( samples: THREE.Vector3[], aX: number, aZ: number,
  bX: number, bZ: number, altFn: ( x: number, z: number ) => number ): void {
  const sahakani = Math.hypot(bX - aX, bZ - aZ);
  const nombro = Math.max(1, Math.round(sahakani / 2));
  for ( let k = 0; k <= nombro; k++ ) {
    const t = k / nombro;
    const sx = aX + ( bX - aX ) * t;
    const sz = aZ + ( bZ - aZ ) * t;
    samples.push(new THREE.Vector3(sx, altFn(sx, sz), sz));
  }
}
