// ≺⧼ ផ្លូវ 🛣️ ⧽≻
import * as THREE from "three";
import { kreiGeometriajnBufrojn, kreiVojajnBendojn, kreiVojojnMaterialojn } from "./vojoj/bufroj.js";
import { aldoniRondajnPecojn, DUONA_RONDO, type RondaPeco } from "./vojoj/rondoj.js";
import { kreiNivelanProfilon, kreiUnuformajnTreadojn,
  type VojaTruo } from "./vojoj/niveloj.js";
import { VOJA_BORDA_LARĜO, VOJA_DIKECO,
  VOJA_TRUA_DUONO, VOJA_SUPRO_LEVIGXO, STUPA_RISERO, surGrid } from "./vojoj/mezuroj.js";
import { kreiBrakojn, kunigaPlataAlto, kunigaPlataNivelo } from "./vojoj/platoj.js";
import { kunigajBrakAltoj } from "./vojoj/formoj.js";
import { dokaAltoEl, elektiPlatanAlton, konsumiDokajnAltojn, kunigaKlavo,
  kunigajNiveloj, purigiKunigajnNivelojn, type BrakaAlto } from "./vojoj/kunig-niveloj.js";
import { konstruiGlatanSegmenton, konstruiSegmentonEnBufrojn,
  konstruiUnuformajnStuparajnSegmentojn, kreiEksteranDuonon,
  kreiSegmentajnPartojn } from "./vojoj/segmentoj.js";
import { vojSuprajxoj, type VojDifino, type VojOpcioj } from "./vojoj/tipoj.js";

// ⟪ ចម្ងាយតាមបណ្តោយផ្លូវ 📏 ⟫
/*រកចំណុចជិតបំផុតលើបន្ទាត់ផ្លូវ និងចម្ងាយរបស់វាពីដើម
    @param punktoj ( [ number , number ] [ ] ) - បន្ទាត់ផ្លូវ
    @param x, z ( number ) - ចំណុចស្វែងរក
@returns { s , distanco } ( object ) - ចម្ងាយតាមបណ្តោយ និងចម្ងាយកាត់ */
function projekcioSurVojo( punktoj: readonly ( readonly [ number, number ] )[],
  x: number, z: number ): { s: number; distanco: number } {
  let akum = 0, plej = Infinity, plejS = 0;
  for ( let i = 0; i < punktoj.length - 0o1; i++ ) {
    const [ ax, az ] = punktoj[ i ];
    const [ bx, bz ] = punktoj[ i + 0o1 ];
    const dx = bx - ax, dz = bz - az;
    const longo = Math.hypot(dx, dz);
    if ( longo < 0o1/0o1000000 ) continue;
    const t = Math.max(0, Math.min(1, ( ( x - ax ) * dx + ( z - az ) * dz ) / ( longo * longo ) ));
    const distanco = Math.hypot(x - ( ax + dx * t ), z - ( az + dz * t ));
    if ( distanco < plej ) { plej = distanco; plejS = akum + longo * t; }
    akum += longo;
  }
  return { s: plejS, distanco: plej };
}

// ⟪ ជម្រាលផ្លូវរលូនចូលចាន 📏 ⟫
/*បង្កើតអនុគមន៍កម្ពស់ដែលនាំផ្លូវរលូន ( ស្ពាន ) ទៅកម្រិតចានរាប ។
    ផ្លូវរលូនគ្មាន kreiNivelanProfilon ទេ , ដូច្នេះវាមិនដឹងពីកោណចាន ។
    បើគ្មានការកែនេះ ស្ពានឈប់នៅកម្ពស់ផ្ទាល់ខ្លួន ហើយមាត់ចានក្លាយជាជញ្ជាំង ។
    @param kruda ( function ) - កម្ពស់ផ្ទៃផ្លូវដើម
    @param punktoj ( [ number , number ] [ ] ) - បន្ទាត់ផ្លូវ
    @param kunigoj ( [ number , number ] [ ] ) - ចំណុចភ្ជាប់
    @param plataAlto ( function ) - កម្រិតចានរាបនៅចំណុចភ្ជាប់
    @param duono ( number ) - កន្លះទទឹងផ្លូវ
@returns alto ( function ) - កម្ពស់ដែលឡើងជាជម្រាលពីចាន */
// ⟨ ចម្ងាយតាមបណ្តោយផ្លូវ មិនមែនចម្ងាយត្រង់ 📏 ⟩ ៖ ផ្លូវរលូនអានកម្ពស់
// នៅគែមទាំងពីរ ( ឆ្វេង / ស្តាំ ) ។ បើវាស់ចម្ងាយត្រង់ពីចំណុចភ្ជាប់ , គែម
// នៅឆ្ងាយជាងខ្សែកណ្តាល , ទទួលបានជម្រាលខ្ពស់ជាង , ហើយផ្លូវលោតនៅមាត់ចាន ។
// ឥឡូវគ្រប់ចំណុចលើបន្ទាត់កាត់ដូចគ្នាប្រើចម្ងាយតាមបណ្តោយដូចគ្នា ,
// ដូច្នេះផ្ទៃផ្លូវនៅរាបពេញទទឹង ហើយជម្រាលចាប់ពីកម្រិតចានពិត ។ 📃 ⟩
// ⟨ ជម្រាលមួយជំហានក្នុងមួយឯកតា 📏 ⟩ ៖ ចម្ងាយពីមាត់ចានកំណត់ថាផ្លូវ
// អាចខុសពីកម្រិតចានប៉ុន្មាន ។ ដូច្នេះផ្លូវឡើងដល់កម្ពស់របស់វាដោយជម្រាល ,
// មិនលោតភ្លាមៗ ។ 📃 ⟩
function rampigiAlPlaton(
  kruda: ( x: number, z: number ) => number,
  punktoj: readonly ( readonly [ number, number ] )[],
  kunigoj: readonly ( readonly [ number, number ] )[],
  plataAlto: ( x: number, z: number ) => number,
  duono: number
): ( x: number, z: number ) => number {
  // ⟨ ទីតាំងចំណុចភ្ជាប់លើផ្លូវ 📐 ⟩ ៖ គណនាម្តង , មិនគណនារាល់គំរូ ។
  const lokoj = kunigoj.map(([ kx, kz ]) => {
    const p = projekcioSurVojo(punktoj, kx, kz);
    return { x: kx, z: kz, s: p.s, distanco: p.distanco };
  }).filter(l => l.distanco <= duono + 0o1/0o100);
  // ⟨ កោណទាំងពីរទិស 📏 ⟩ ៖ មុននេះ rezulto ចាប់ផ្តើមពី surfaco ហើយ
  // គ្រាន់តែយក Math.min ជាមួយកោណនីមួយៗ ។ ដូច្នេះវាអាចទាញផ្លូវចុះ
  // មករកចាន តែមិនអាចលើកផ្លូវឡើងដល់ចានខ្ពស់ជាងបានទេ ។ ចុងម្ខាង
  // នៃស្ពាននៅទាបជាងចាន ហើយជម្រាលមិនកើតឡើង = ជញ្ជាំងឈរ ។ ឥឡូវ
  // ប្រមូលព្រំដែនទាញឡើងទាំងអស់ និងព្រំដែនទាញចុះទាំងអស់ រួចកំណត់
  // ផ្ទៃឱ្យនៅក្នុងចន្លោះនោះ ។ កោណឆ្ងាយរលាយទៅជាគ្មានកំណត់ ។ 📃 ⟩
  return ( x, z ) => {
    const surfaco = kruda( x, z ) + VOJA_SUPRO_LEVIGXO;
    const { s } = projekcioSurVojo(punktoj, x, z);
    let suba = -Infinity, supra = Infinity;
    for ( const l of lokoj ) {
      const d = Math.abs(s - l.s);
      if ( d > VOJA_TRUA_DUONO + 0o20 ) continue;
      const p = plataAlto( l.x, l.z );
      const margxo = Math.max(0, d - VOJA_TRUA_DUONO);
      suba = Math.max(suba, p - margxo);
      supra = Math.min(supra, p + margxo);
    }
    // ⟨ កោណជាន់គ្នា 📏 ⟩ ៖ ចានពីរខុសកម្រិតខ្លាំងពេកសម្រាប់ចម្ងាយ ។
    // យកកណ្តាល ដើម្បីកុំឱ្យផ្លូវលោតពីកោណមួយទៅកោណមួយ ។ 📃 ⟩
    const rezulto = suba <= supra
      ? Math.max(suba, Math.min(supra, surfaco))
      : ( suba + supra ) / 0o2;
    return rezulto - VOJA_SUPRO_LEVIGXO;
  };
}

// ⟪ ការសាងសង់បណ្តាញផ្លូវ 🏗️ ⟫
export function konstruiVojojn(sceno: THREE.Scene,
  defs: VojDifino[],
  heightFn: ( x: number, z: number ) => number,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial,
  kunigoj: [ number, number ][] = [],
  opcioj: VojOpcioj = {}
): THREE.Vector3[] {
  const { akvaFn, grundoFn = heightFn, kunigajDirektoj,
    kunigajFermitaj, kunigajRotacioj, kunigajDuonoj } = opcioj;
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
  const { supraMaterialo, bordaMaterialo } = kreiVojojnMaterialojn(dioritaMaterialo, andezitaMaterialo, -2, -4, -1, -1);

  const bufroj = kreiGeometriajnBufrojn();
  // ⟪ កម្ពស់ផ្លូវតាមដៃ 📏 ⟫
  // ⟨ តាមដានផ្លូវពិត មិនមែនវាលរួម 📃 ⟩ ៖ មុននេះចានអានវាលកម្ពស់រួមនៅមាត់
  // ដៃទាំងអស់ ។ វាលនោះមានកោណចានរួចហើយ ( វង់ ) , ដូច្នេះគ្រប់ដៃរកឃើញ
  // កម្ពស់តែមួយ ។ ផ្លូវដែលមានអនុគមន៍កម្ពស់ផ្ទាល់ខ្លួន ( ស្ពាន ) មិនត្រូវបាន
  // គិតទាល់តែសោះ ហើយបញ្ចប់ដោយជញ្ជាំងឈរ ។ ឥឡូវរាល់ផ្លូវរាយការណ៍កម្ពស់
  // ផ្ទៃរបស់វាតាមដៃនីមួយៗ មុនពេលកោណចានណាមួយត្រូវបានអនុវត្ត ។ 📃 ⟩
  purigiKunigajnNivelojn();
  // ⟨ កម្រិតចំណត ⚓ ⟩ ៖ ចំណតបានចុះឈ្មោះមុនផ្លូវ ។ យកវាម្តង ហើយលុប
  // ដើម្បីឱ្យការសាងសង់បន្ទាប់ចាប់ផ្តើមស្អាត ។ 📃 ⟩
  const dokajAltoj = konsumiDokajnAltojn();
  const naturaj = defs.map(def => {
    const bendoj = kreiVojajnBendojn(def.w, supraMaterialo, bordaMaterialo);
    const duono = kreiEksteranDuonon(bendoj);
    const kruda = def.heightFn || heightFn;
    const speciala = def.glata === true || def.stuparo === true;
    // ⟨ ប្រវត្តិរូបធម្មជាតិ 📏 ⟩ ៖ គ្មាន kunigoj , ដូច្នេះវាមិនអានកម្រិតចានវិញទេ ។
    const profilo = speciala ? null : kreiNivelanProfilon(def.pts, duono, kruda, akvaFn);
    return { duono, altoCxe: ( px: number, pz: number ): number => {
      if ( profilo ) return profilo.altoCxe(projekcioSurVojo(def.pts, px, pz).s);
      return kruda(px, pz) + VOJA_SUPRO_LEVIGXO;
    } };
  });
  for ( const [ kx, kz ] of kunigoj ) {
    const klavo = kunigaKlavo(kx, kz);
    const brakoj = kreiBrakojn(kunigajDirektoj?.get(klavo) ?? [],
      kunigajFermitaj?.get(klavo), kunigajRotacioj?.get(klavo) ?? 0,
      kunigajDuonoj?.get(klavo));
    const brakajAltoj: BrakaAlto[] = brakoj.map(b => {
      // ⟨ អានមាត់ដៃខាងក្រៅរន្ធ 📏 ⟩ ៖ ត្រង់ណាដែលផ្លូវពិតចាប់ផ្តើម ។
      const px = kx + b.ux * ( VOJA_TRUA_DUONO + 0o1/0o4 );
      const pz = kz + b.uz * ( VOJA_TRUA_DUONO + 0o1/0o4 );
      let plej = Infinity, alto = NaN;
      for ( let i = 0; i < defs.length; i++ ) {
        const { distanco } = projekcioSurVojo(defs[ i ].pts, px, pz);
        if ( distanco > naturaj[ i ].duono + 0o1/0o100 ) continue;
        if ( distanco < plej ) { plej = distanco; alto = naturaj[ i ].altoCxe(px, pz); }
      }
      // ⟨ ជ្រុងបិទ 📏 ⟩ ៖ គ្មានផ្លូវមកដល់ដៃនេះ , អានវាលជុំវិញជំនួស ។
      if ( !Number.isFinite(alto) )
        alto = kunigajBrakAltoj(kx, kz, [ [ b.ux, b.uz ] ], [ b.duono ], heightFn)[ 0 ]
          + VOJA_SUPRO_LEVIGXO;
      return { ux: b.ux, uz: b.uz, alto: surGrid(alto), duono: b.duono };
    });
    // ⟨ កម្រិតដី 📏 ⟩ ៖ ចានមិនអាចទាបជាងដីកណ្តាល ឬ ដីនៅមាត់ដៃទេ ។
    // kunigaPlataAlto អានទាំងពីរ ហើយហ្គេម ចាន និងឧបករណ៍វាស់ប្រើវាដូចគ្នា ។ 📃 ⟩
    const rezervo = kunigaPlataAlto(kx, kz, brakoj, heightFn);
    // ⟨ ចាននៅមាត់ចំណត ⚓ ⟩ ៖ វេទិកាចំណតជាប់នឹងចានដោយផ្ទាល់ ។ ចានត្រូវ
    // យកកម្រិតវេទិកា , មិនមែនកម្រិតដែលគណនាពីផ្លូវទេ ។ ផ្លូវឡើង/ចុះ
    // ជាជំហានមករកចានវិញ ដូចគ្រប់ចំណុចភ្ជាប់ផ្សេង ។ 📃 ⟩
    const dokaAlto = dokaAltoEl(dokajAltoj, kx, kz);
    kunigajNiveloj.set(klavo, { x: kx, z: kz,
      alto: dokaAlto ?? elektiPlatanAlton(brakajAltoj, rezervo),
      brakoj: brakajAltoj });
  }
  const plataAltoCxeKunigo = ( x: number, z: number ): number => {
    const klavo = kunigaKlavo(x, z);
    const reg = kunigajNiveloj.get(klavo);
    if ( reg ) return reg.alto;
    const brakoj = kreiBrakojn(kunigajDirektoj?.get(klavo) ?? [],
      kunigajFermitaj?.get(klavo), kunigajRotacioj?.get(klavo) ?? 0,
      kunigajDuonoj?.get(klavo));
    return surGrid(kunigaPlataNivelo(x, z, brakoj, heightFn).alto);
  };
  // ⟨ កម្រិតរាបតែមួយ 📏 ⟩ ៖ ចាន និងចុងជណ្តើរអានលេខដូចគ្នា ។
  const platoCxe = plataAltoCxeKunigo;
  // ⟨ កម្រិតផ្លូវនៅចុងក្រោយ ៖ ប្រើសម្រាប់មួកផ្លូវដែលឆ្លងចូលមកចានភ្ជាប់ ។ 📃 ⟩
  const kapoAltoj = new Map<VojDifino, { komenco: number | null; fino: number | null }>();
  // ⟨ គែមមូលទាំងអស់ 🌗 ⟩ ៖ ចុងផ្លូវសេរី និងជ្រុងកន្លែងបត់ ឆ្លងកាត់
  // ប៊ូហ្វ័រតែមួយជាមួយចម្រៀកត្រង់ ។ ប្រមូលមុនគូរធរណីមាត្រ , ព្រោះ
  // កម្ពស់របស់វាត្រូវស្ថិតលើកម្រិតផ្លូវដូចគ្នានឹងចម្រៀកទាំងពីរ ។ 📃 ⟩
  const rondajPecoj: RondaPeco[] = [];

  for ( const def of defs ) {
    const krudaAlt = def.heightFn || heightFn;
    // ⟨ ស្ពានត្រូវឡើងដល់ចានដោយជម្រាល 📏 ⟩ ៖ ផ្លូវរលូនគ្មានប្រវត្តិរូប
    // ជំហាន , ដូច្នេះកោណចានក្នុង kreiNivelanProfilon មិនប៉ះវាទេ ។
    // ផ្លូវធម្មតាមានប្រវត្តិរូបរួចហើយ ; ជណ្តើរចំណតមានកម្រាលផ្ទាល់ខ្លួន ។
    // ការរុំអនុគមន៍កម្ពស់នាំតែស្ពានចុះ/ឡើងដល់កម្រិតចានត្រង់មាត់រន្ធ ។ 📃 ⟩
    const bendoj = kreiVojajnBendojn(def.w, supraMaterialo, bordaMaterialo);
    const eksteraDuono = kreiEksteranDuonon(bendoj);
    const defAlt = def.glata === true
      ? rampigiAlPlaton(krudaAlt, def.pts, kunigoj, plataAltoCxeKunigo, eksteraDuono)
      : krudaAlt;
    const defGrundo = def.grundoFn ?? fundaFn;
    kapoAltoj.set( def, { komenco: null, fino: null } );
    const notiFinon = ( komenco: number | null, fino: number | null ): void => {
      const kapo = kapoAltoj.get(def)!;
      kapo.komenco = komenco;
      kapo.fino = fino;
    };
    if ( def.stuparo === true ) {
      let unua: number | null = null, lasta: number | null = null;
      // ⟨ ចានភ្ជាប់នៅចុងជណ្តើរ 📏 ⟩ ៖ ជណ្តើរដែលចូលដល់ចានភ្ជាប់ត្រូវយកកម្រិតចាននោះ ,
      // មិនមែនកម្រិតរបស់ខ្លួនទេ ។ បើមិនដូច្នេះ , កម្រាលខ្ពស់បំផុតរបស់ជណ្តើរ
      // ខុសពីចាន , ហើយឃើញជាជញ្ជាំងឈរនៅចន្លោះ ។ 📃 ⟩
      const platoCxeFinon = ( pto: [ number, number ] ): number | null => {
        for ( const [ kX, kZ ] of kunigoj ) {
          if ( Math.hypot(pto[0] - kX, pto[1] - kZ) > VOJA_TRUA_DUONO ) continue;
          return platoCxe(kX, kZ);
        }
        return null;
      };
      const unuaPlato = platoCxeFinon(def.pts[0]);
      const lastaPlato = platoCxeFinon(def.pts[def.pts.length - 1]);
      // ⟨ កម្រាលទីមួយចុះមួយជំហាន 📏 ⟩ ៖ ផ្ទៃចានជាកន្លែងឈរ , ដូច្នេះកម្រាលទីមួយ
      // ទាបជាងចានមួយជំហាន ។ អនុគមន៍សាងសង់បន្ថែម VOJA_SUPRO_LEVIGXO ,
      // ដូច្នេះដកវាចេញនៅទីនេះ ។ 📃 ⟩
      const stupaAlto = ( x: number, z: number ): number => {
        const plato = platoCxeFinon([ x, z ]);
        if ( plato !== null ) return plato - STUPA_RISERO - VOJA_SUPRO_LEVIGXO;
        return defAlt(x, z);
      };
      // ⟨ ជម្រាលមុខជំហាន 📏 ⟩ ៖ ជំហាននីមួយៗចុះទៅកម្រិតជំហានបន្ទាប់ ។
      // កម្រិតអានត្រង់កណ្តាលចម្រៀក , ដូចអនុគមន៍សាងសង់ , ដូច្នេះជម្រាលត្រូវនឹងជំហានពិត ។
      // ជំហានចុងក្រោយគ្មានជំហានបន្ទាប់ទេ , ដូច្នេះវារាបទាំងស្រុង ។ 📃 ⟩
      const stupajAltoj: number[] = [];
      const lastaIndekso = def.pts.length - 0o2;
      for ( let i = 0; i < def.pts.length - 1; i++ ) {
        const mezo = stupaAlto(( def.pts[i][0] + def.pts[i + 1][0] ) / 0o2,
          ( def.pts[i][1] + def.pts[i + 1][1] ) / 0o2);
        stupajAltoj.push(mezo);
      }
      // ⟨ ចុងជណ្តើរយកកម្រិតចានដោយផ្ទាល់ 📏 ⟩ ៖ ការអានត្រង់កណ្តាលចម្រៀកមិនគ្រប់ទេ ,
      // ព្រោះចំណុចកណ្តាលអាចនៅឆ្ងាយពីចាន ។ ដូច្នេះចម្រៀកដំបូង និងចុងក្រោយ
      // យកកម្រិតចានដោយផ្ទាល់ ។ 📃 ⟩
      // ⟨ ជម្រាលចុងយកកម្រិតពីអនុគមន៍កម្ពស់ ៖ មិនប្រើជំហានថេរ STUPA_RISERO ទេ ។
      // បើប្រើជំហានថេរ , ចំណតដែលធ្លាក់តិច ( ឧ. 0.4 ) នឹងលើសជំហាន 0.5 ហើយ
      // ជណ្តើរលិចក្រោមផ្ទៃចំណត រួចឡើងវិញ = ជញ្ជាំងឈរ ។ អនុគមន៍កម្ពស់ដឹងជំហានពិត
      // ដូច្នេះចានភ្ជាប់បានរាបដល់ផ្ទៃចំណតដោយគ្មានជញ្ជាំង ។ 📃 ⟩
      if ( lastaIndekso >= 0 ) {
        if ( unuaPlato !== null ) stupajAltoj[0] = defAlt(def.pts[0][0], def.pts[0][1]);
        if ( lastaPlato !== null ) stupajAltoj[lastaIndekso] =
          defAlt(def.pts[lastaIndekso + 1][0], def.pts[lastaIndekso + 1][1]);
      }
      for ( let i = 0; i < def.pts.length - 1; i++ ) {
        const [ aX, aZ ] = def.pts[i];
        const [ bX, bZ ] = def.pts[i + 1];
        const fala = i + 1 < stupajAltoj.length ? stupajAltoj[i] - stupajAltoj[i + 1] : 0;
        const rezulto = konstruiUnuformajnStuparajnSegmentojn(aX, aZ, bX, bZ, bendoj, VOJA_DIKECO,
          () => stupajAltoj[i], defGrundo, bufroj, fala);
        if ( rezulto ) {
          if ( unua === null ) unua = rezulto.unua;
          lasta = rezulto.lasta;
        }
        aldonuSpecimenojn(samples, aX, aZ, bX, bZ, defAlt);
      }
      notiFinon(unua, lasta);
      continue;
    }
    // ⟨ កម្រិតទាំងអស់កំណត់ម្តង មុនការសាងសង់ ៖ ដូច្នេះជំហានមិនអាចលោត
    // ឬធ្លាក់ចូលរណ្តៅខ្លីនៅចន្លោះចម្រៀកបានទេ ។ 📃 ⟩
    // ⟨ ផ្លូវទាំងអស់ចេញពីកន្លែងតែមួយ 📃 ⟩ ៖ ស្ពានមិនមែនប្រព័ន្ធដាច់ដោយឡែកទេ ។
    // វាចូលរួមខ្សែ , សម្ភារៈ , មួកផ្លូវ និងការប៉ះទង្គិចដូចផ្លូវឯទៀត ។
    // ភាពខុសគ្នាតែមួយ ៖ ផ្ទៃរបស់វារលូន , ព្រោះវាជាចម្រៀកវែងតែមួយ ( ធ្នូ ) ,
    // មិនមែនជណ្តើរថ្មដូចផ្លូវលើដី ។ 📃 ⟩
    const profilo = def.glata === true
      ? null
      : kreiNivelanProfilon(def.pts, eksteraDuono, defAlt, akvaFn,
        kunigoj.map(([ x, z ]) => ( { x, z, alto: platoCxe(x, z) } )));
    // ⟨ កាលវិភាគជម្រាលម្តងសម្រាប់ផ្លូវទាំងមូល 📏 ⟩ ៖ ចម្រៀក និងរន្ធ
    // ចានភ្ជាប់កាត់ផ្លូវនៅចំណុចណាមួយ ។ បើគណនាជម្រាលក្រោយកាត់ , បំណែកខ្លី
    // បង្ហាប់ជម្រាលឱ្យឈរដូចជញ្ជាំង ។ គណនាមុនកាត់ រួចគ្រាន់តែកាត់ប្រអប់ ។ 📃 ⟩
    // ⟨ គែមចេញនៃរន្ធ 📏 ⟩ ៖ ប្រមូលរន្ធពី kreiSegmentajnPartojn ដដែល
    // ដែលកាត់ធរណីមាត្រ ។ កាលវិភាគប្រើវាដើម្បីកុំឱ្យជម្រាលចាប់ផ្តើម
    // នៅក្រោមចាន ។ គ្មានច្បាប់កាត់ផ្លូវទីពីរទេ ។ 📃 ⟩
    const truoj: VojaTruo[] = [];
    if ( profilo ) {
      let sTruo = 0;
      for ( let i = 0; i < def.pts.length - 0o1; i++ ) {
        const [ aX, aZ ] = def.pts[ i ], [ bX, bZ ] = def.pts[ i + 0o1 ];
        const longo2 = Math.hypot(bX - aX, bZ - aZ);
        if ( longo2 < 0o1/0o100 ) continue;
        for ( const [ t0, t1, konstruuPec ] of
          kreiSegmentajnPartojn(aX, aZ, bX, bZ, longo2, kunigoj) )
          if ( !konstruuPec ) truoj.push({ s0: sTruo + t0, s1: sTruo + t1 });
        sTruo += longo2;
      }
    }
    const treadoj = profilo ? kreiUnuformajnTreadojn(profilo, truoj) : [];
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
      for ( const [ kx, kz ] of kunigoj ) {
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
      rondajPecoj.push({ x: nuna[ 0 ], z: nuna[ 1 ],
        mezo: Math.atan2(u1z - u2z, u1x - u2x), gamo: turno,
        supro: profilo ? profilo.altoCxe(akum)
          : defAlt(nuna[ 0 ], nuna[ 1 ]) + VOJA_SUPRO_LEVIGXO,
        duono: def.w / 0o2, ekstera: eksteraDuono });
    }
    let unua: number | null = null, lasta: number | null = null;
    let starto = 0;
    for ( let i = 0; i < def.pts.length - 1; i++ ) {
      const [ aX, aZ ] = def.pts[i];
      const [ bX, bZ ] = def.pts[i + 1];
      const longo = Math.hypot(bX - aX, bZ - aZ);
      if ( longo < 0o1/0o100 ) continue;
      const ndx = ( bX - aX ) / longo, ndz = ( bZ - aZ ) / longo;
      for ( const [ t0, t1, konstruuPec ] of kreiSegmentajnPartojn(aX, aZ, bX, bZ, longo, kunigoj) ) {
        const px1 = aX + ndx * t0, pz1 = aZ + ndz * t0;
        const px2 = aX + ndx * t1, pz2 = aZ + ndz * t1;
        if ( konstruuPec ) {
          const rezulto = profilo
            ? konstruiSegmentonEnBufrojn(px1, pz1, px2, pz2, starto + t0, starto + t1, bendoj,
              treadoj, bufroj, VOJA_DIKECO, defGrundo)
            : konstruiGlatanSegmenton(px1, pz1, px2, pz2, bendoj, VOJA_DIKECO, defAlt, defGrundo, bufroj);
          if ( rezulto ) {
            if ( unua === null ) unua = rezulto.unua;
            lasta = rezulto.lasta;
          }
          continue;
        }
        // ⟨ រន្ធភ្ជាប់ ៖ ចានភ្ជាប់គ្របទីនោះ , តែកម្រិតត្រូវកត់ទុកសម្រាប់ការប៉ះទង្គិច ។ 📃 ⟩
        const mX = ( px1 + px2 ) / 0o2, mZ = ( pz1 + pz2 ) / 0o2;
        const kunigaSupro = profilo
          ? profilo.altoCxe(starto + ( t0 + t1 ) / 0o2)
          : Math.max(defAlt(mX, mZ)) + 0o1/0o100 + VOJA_DIKECO;
        vojSuprajxoj.push({ x1: px1, z1: pz1, x2: px2, z2: pz2, duono: eksteraDuono,
          y0: kunigaSupro, y1: kunigaSupro });
      }
      aldonuSpecimenojn(samples, aX, aZ, bX, bZ, defAlt);
      starto += longo;
    }
    notiFinon(unua, lasta);
  }
  // ⟪ មួកផ្លូវចុងសេរី 🌗 ⟫
  // ⟨ ពាក់រង្វង់ពេញដូចចុងចំណត 📏 ⟩ ៖ ចុងផ្លូវប្រើទម្រង់ធ្នូរួមដូចគ្នា
  // នឹងជង្គង់ , គ្រាន់តែទំហំធ្នូ π ជំនួសឱ្យមុំបត់ ។ 📃 ⟩
  const finokalkulo = new Map<string, number>();
  for ( const def of defs ) {
    if ( def.pts.length < 2 || def.kapoj !== true ) continue;
    for ( const pto of [ def.pts[0], def.pts[def.pts.length - 1] ] ) {
      const klavo = pto[0] + "," + pto[1];
      finokalkulo.set(klavo, ( finokalkulo.get(klavo) ?? 0 ) + 1);
    }
  }
  const kapoVidita: [ number, number ][] = [];
  for ( const def of defs ) {
    if ( def.pts.length < 2 || def.kapoj !== true || def.stuparo === true ) continue;
    const kapo = kapoAltoj.get( def );
    const finoj: [ [ number, number ], [ number, number ], number | null ][] = [
      [ def.pts[0], def.pts[1], kapo?.komenco ?? null ],
      [ def.pts[def.pts.length - 1], def.pts[def.pts.length - 2], kapo?.fino ?? null ],
    ];
    for ( const [ fino, najbaro, supraY ] of finoj ) {
      const dx = fino[0] - najbaro[0], dz = fino[1] - najbaro[1];
      const direktaLongo = Math.hypot( dx, dz );
      if ( direktaLongo < 0o1/0o100 ) continue;
      if ( ( finokalkulo.get(fino[0] + "," + fino[1]) ?? 0 ) > 1 ) continue;
      if ( kapoVidita.some(([ vx, vz ]) => Math.hypot(fino[0] - vx, fino[1] - vz) < 0o1/0o100) ) continue;
      let enTruo = false;
      for ( const [ kX, kZ ] of kunigoj ) {
        if ( Math.hypot(fino[0] - kX, fino[1] - kZ) < VOJA_TRUA_DUONO + 0o1/0o100 ) { enTruo = true; break; }
      }
      if ( enTruo ) continue;
      kapoVidita.push([ fino[0], fino[1] ]);
      const defAlt = def.heightFn || heightFn;
      rondajPecoj.push({ x: fino[ 0 ], z: fino[ 1 ],
        mezo: Math.atan2(dz, dx), gamo: DUONA_RONDO,
        duono: def.w / 0o2, ekstera: def.w / 0o2 + VOJA_BORDA_LARĜO,
        supro: supraY ?? defAlt(fino[ 0 ], fino[ 1 ]) + VOJA_SUPRO_LEVIGXO });
    }
  }
  // ⟨ ផ្លូវទាំងអស់ជា Mesh តែមួយក្នុងមួយសម្ភារៈ 📏 ⟩ ។
  aldoniRondajnPecojn(bufroj, rondajPecoj, supraMaterialo, bordaMaterialo, fundaFn);
  bufroj.kunigi(sceno);
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
  const longo = Math.hypot(bX - aX, bZ - aZ);
  const nombro = Math.max(1, Math.round(longo / 2));
  for ( let k = 0; k <= nombro; k++ ) {
    const t = k / nombro;
    const sx = aX + ( bX - aX ) * t;
    const sz = aZ + ( bZ - aZ ) * t;
    samples.push(new THREE.Vector3(sx, altFn(sx, sz), sz));
  }
}
