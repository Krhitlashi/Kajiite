// ≺⧼ ផ្នែកផ្លូវ 🧩 ⧽≻
import * as THREE from "three";
import { matricoPor, ANGULA_PROVOLIRO, type VojBendo, type VojGeometriajBufroj } from "./bufroj.js";
import { kreiSegmentGeometrion } from "./formoj.js";
import { type UnuformaTreado } from "./niveloj.js";
import { rampaKuro, VOJA_EKSTERA_DUONO, VOJA_KUNIGA_SUPERPONO, VOJA_SUPRO_LEVIGXO,
  VOJA_TRUA_DUONO } from "./mezuroj.js";
import { vojSuprajxoj } from "./tipoj.js";

// ⟪ កម្ពស់ចុងចម្រៀក 📃 ⟫
export interface SegmentaRezulto {
  unua: number;
  lasta: number;
}

// ⟪ ជ្រុងជំហាន 📏 ⟫
/*កម្ពស់ជ្រុងទាំងបួននៃជំហាន ៖ កំពូលតាមកម្ពស់ចុងទាំងពីរ , បាតដល់ដី
    @param altoA, altoB ( number ) - កម្រិតកំពូលនៅចុងដើម និងចុងចុង
    @param ax, az, bx, bz ( number ) - ចុងចម្រៀក
    @param latX, latZ ( number ) - វ៉ិចទ័រចំហៀងទៅគែម
    @param grundoFn ( function ) - កម្ពស់ដី
    @param dikecoBaza ( number ) - កម្រាស់យ៉ាងតិច
@returns anguloj ( { suproj ; fundoj } ) - កំពូល និងបាត តាមលំដាប់ ដើមឆ្វេង , ដើមស្តាំ , ចុងស្តាំ , ចុងឆ្វេង */
// ⟨ កំពូលតាមចុង 📃 ⟩ ៖ ផ្នែករាបមានកម្ពស់ស្មើគ្នាទាំងពីរចុង , ផ្នែកជម្រាលមាន
// កម្ពស់ខុសគ្នា ៖ ដើមខ្ពស់ , ចុងទាប ។ មុខចំហៀងនៅតែឈរត្រង់ ។ 📃 ⟩
function angulojDeTreado(altoA: number, altoB: number, ax: number, az: number, bx: number, bz: number,
  latX: number, latZ: number, grundoFn: ( x: number, z: number ) => number,
  dikecoBaza: number
): { suproj: [ number, number, number, number ]; fundoj: [ number, number, number, number ] } {
  const suproj: [ number, number, number, number ] = [ altoA, altoA, altoB, altoB ];
  const fundoj: [ number, number, number, number ] = [ altoA, altoA, altoB, altoB ];
  const anguloj: [ number, number ][] = [ [ ax - latX, az - latZ ], [ ax + latX, az + latZ ],
    [ bx + latX, bz + latZ ], [ bx - latX, bz - latZ ] ];
  for ( let i = 0; i < 0o4; i++ ) {
    const grundo = grundoFn(anguloj[ i ][ 0 ], anguloj[ i ][ 1 ]);
    fundoj[ i ] = Math.min(suproj[ i ] - dikecoBaza, grundo - ANGULA_PROVOLIRO);
  }
  return { suproj, fundoj };
}

// ⟪ ខ្សែនៅចន្លោះជ្រុង 📐 ⟫
/*កម្ពស់ខ្សែតាមចម្ងាយចំហៀង ៖ ជ្រុងត្រូវបានភ្ជាប់ជាបន្ទាត់ត្រង់
    @param anguloj ( [ number , number , number , number ] ) - កម្ពស់ជ្រុងទាំងបួន
    @param g0, g1 ( number ) - ចម្ងាយចំហៀងនៃគែមខ្សែ
    @param eksteraDuon ( number ) - កន្លះទទឹងខាងក្រៅ
@returns valoroj ( [ number , number , number , number ] ) - កម្ពស់នៅគែមខ្សែ */
function bendoAnguloj(anguloj: readonly [ number, number, number, number ],
  g0: number, g1: number, eksteraDuon: number
): [ number, number, number, number ] {
  const f0 = Math.max(0, Math.min(1, ( g0 + eksteraDuon ) / ( 0o2 * eksteraDuon )));
  const f1 = Math.max(0, Math.min(1, ( g1 + eksteraDuon ) / ( 0o2 * eksteraDuon )));
  const miks = ( a: number, b: number, f: number ): number => a + ( b - a ) * f;
  return [ miks(anguloj[ 0 ], anguloj[ 1 ], f0), miks(anguloj[ 0 ], anguloj[ 1 ], f1),
    miks(anguloj[ 3 ], anguloj[ 2 ], f1), miks(anguloj[ 3 ], anguloj[ 2 ], f0) ];
}

// ⟪ សាងសង់ជំហានមួយ 📏 ⟫
/*សាងសង់ជំហានមួយ ៖ កំពូលរាប , មុខជម្រាល , និងបាតចុះដល់ដី
    @param ax, az ( number ) - ចំណុចដើមជំហាន
    @param bx, bz ( number ) - ចំណុចចុងជំហាន
    @param alto ( number ) - កម្ពស់កំពូល
    @param fala ( number ) - កម្ពស់ដែលមុខជំហានចុះទៅជំហានបន្ទាប់ ( ០ គ្មានជម្រាល )
    @param bendoj ( VojBendo [ ] ) - ខ្សែនៃផ្ទៃផ្លូវ
    @param dikecoBaza ( number ) - កម្រាស់យ៉ាងតិច
    @param grundoFn ( function ) - កម្ពស់ដីក្រោម
    @param bufroj ( VojGeometriajBufroj ) - កន្លែងប្រមូលធរណីមាត្រ
@returns altoj ( [ number , number ] ) - កម្ពស់កំពូលនៅចុងដើម និងចុងចុង */
// ⟨ អនុគមន៍តែមួយសម្រាប់ជំហានទាំងអស់ 📃 ⟩ ៖ ជណ្តើរចំណត ( កម្ពស់ថេរតាមអនុគមន៍កម្ពស់ )
// និងផ្លូវកម្រិត ( កម្ពស់ថេរតាមបំណែកកម្រិត ) សាងសង់ជំហានដូចគ្នា ។ មុននេះកូដសាងសង់
// ស្ទួនគ្នានៅក្នុងអនុគមន៍ពីរ , ដូច្នេះជំហានពីរប្រភេទអាចមើលខុសគ្នា ។ 📃 ⟩
// ⟨ កំពូលរាប , មុខជម្រាល 📃 ⟩ ៖ កំពូលជំហានរាប និងស្របគ្នាទាំងអស់ , ដូច្នេះផ្លូវ
// ត្រង់ មិនកោងតាមដី ។ ជម្រាលស្ថិតនៅមុខជំហាន ៖ ផ្នែកខាងចុងនៃកំពូលទ្រេតចុះទៅ
// កម្រិតបន្ទាប់ ។ ដូច្នេះមុខជំហានមិនឈរត្រង់ ( ចុះផ្តេក ) ទេ , ហើយជំហានជាប់គ្នា ។ 📃 ⟩
function aldoniTreadon(ax: number, az: number, bx: number, bz: number, alto: number,
  fala: number,
  bendoj: VojBendo[],
  dikecoBaza: number,
  grundoFn: ( x: number, z: number ) => number,
  bufroj: VojGeometriajBufroj
): [ number, number ] {
  const difX = bx - ax, difZ = bz - az;
  const longo = Math.hypot(difX, difZ);
  const ndx = difX / longo, ndz = difZ / longo;
  // ⟨ ប្រវែងជម្រាល 📏 ⟩ ៖ ច្បាប់តែមួយ rampaKuro គុណកម្ពស់ធ្លាក់នឹង VOJA_STUPA_RAMPO ។
  // ជណ្តើរចំណតមានចម្រៀកគ្រប់គ្រាន់ , ដូច្នេះការកាត់ត្រឹម longo ជាការកាពារ
  // ចុងចម្រៀកប៉ុណ្ណោះ ។ ផ្លូវធម្មតាមិនឆ្លងកាត់ទីនេះទេ , ព្រោះវាអានកាលវិភាគ
  // ជម្រាលលើផ្លូវទាំងមូល មុនពេលកាត់ជាចម្រៀក ។ 📃 ⟩
  const rampo = fala === 0 ? 0 : Math.min( rampaKuro( fala ), longo );
  if ( rampo <= 0o1/0o1000 ) {
    aldoniBokson(ax, az, bx, bz, alto, alto, bendoj, dikecoBaza, grundoFn, bufroj);
    return [ alto, alto ];
  }
  // ⟨ កំពូលរាប បន្ទាប់មកជម្រាល 📃 ⟩ ៖ ផ្នែកដំបូងរាប , ផ្នែកចុងទ្រេតចុះ ។
  // ចុងជម្រាលស្ថិតនៅកម្រិតជំហានបន្ទាប់ , ដូច្នេះជំហានជាប់គ្នាដោយគ្មានមុខឈរ ។
  const px = bx - ndx * rampo, pz = bz - ndz * rampo;
  aldoniBokson(ax, az, px, pz, alto, alto, bendoj, dikecoBaza, grundoFn, bufroj);
  aldoniBokson(px, pz, bx, bz, alto, alto - fala, bendoj, dikecoBaza, grundoFn, bufroj);
  return [ alto, alto - fala ];
}

// ⟪ ប្រអប់ជំហានមួយ 📦 ⟫
/*សាងសង់ប្រអប់មួយរបស់ជំហាន ៖ កំពូលតាមកម្ពស់ចុងទាំងពីរ , បាតចុះដល់ដី
    @param ax, az ( number ) - ចំណុចដើម
    @param bx, bz ( number ) - ចំណុចចុង
    @param altoA, altoB ( number ) - កម្ពស់កំពូលនៅចុងដើម និងចុងចុង
    @param bendoj ( VojBendo [ ] ) - ខ្សែនៃផ្ទៃផ្លូវ
    @param dikecoBaza ( number ) - កម្រាស់យ៉ាងតិច
    @param grundoFn ( function ) - កម្ពស់ដីក្រោម
    @param bufroj ( VojGeometriajBufroj ) - កន្លែងប្រមូលធរណីមាត្រ */
function aldoniBokson(ax: number, az: number, bx: number, bz: number, altoA: number, altoB: number,
  bendoj: VojBendo[],
  dikecoBaza: number,
  grundoFn: ( x: number, z: number ) => number,
  bufroj: VojGeometriajBufroj
): void {
  const difX = bx - ax, difZ = bz - az;
  const longo = Math.hypot(difX, difZ);
  if ( longo < 0o1/0o1000 ) return;
  const eksteraDuon = kreiEksteranDuonon(bendoj);
  const ndx = difX / longo, ndz = difZ / longo;
  const latX = -ndz * eksteraDuon, latZ = ndx * eksteraDuon;
  const anguloj = angulojDeTreado(altoA, altoB, ax, az, bx, bz, latX, latZ, grundoFn, dikecoBaza);
  vojSuprajxoj.push({ x1: ax, z1: az, x2: bx, z2: bz, duono: eksteraDuon,
    y0: altoA, y1: altoB, rampo: Math.abs( altoB - altoA ) > 0o1/0o1000 });
  for ( const bendo of bendoj ) {
    const g0 = bendo.ofseto - bendo.largho / 0o2, g1 = bendo.ofseto + bendo.largho / 0o2;
    const geometrio = kreiSegmentGeometrion(bendo.largho, longo,
      bendoAnguloj(anguloj.suproj, g0, g1, eksteraDuon),
      bendoAnguloj(anguloj.fundoj, g0, g1, eksteraDuon), bendo.ofseto);
    bufroj.aldoni(geometrio, bendo.materialo, matricoPor(difX, difZ, ( ax + bx ) / 0o2, 0, ( az + bz ) / 0o2));
  }
}

/*កន្លែងដែលផ្លូវឆ្លងកាត់ចានភ្ជាប់ មិនត្រូវសាងសង់ជំហានទេ
    @param aX, aZ ( number ) - ចំណុចដើមចម្រៀក
    @param bX, bZ ( number ) - ចំណុចចុងចម្រៀក
    @param longo ( number ) - ប្រវែងចម្រៀក
    @param kunigoj ( [ number , number ] [ ] ) - ចំណុចចានភ្ជាប់
@returns partoj ( [ number , number , boolean ] [ ] ) - ចម្រៀករង និងថាតើត្រូវសាងសង់ឬទេ */
export function kreiSegmentajnPartojn(aX: number, aZ: number, bX: number, bZ: number,
  longo: number,
  kunigoj: [ number, number ][]
): [ number, number, boolean ][] {
  const ndx = ( bX - aX ) / longo, ndz = ( bZ - aZ ) / longo;
  const truoj: [ number, number ][] = [];
  for ( const [ kX, kZ ] of kunigoj ) {
    const rx = kX - aX, rz = kZ - aZ;
    const laux = rx * ndx + rz * ndz;
    if ( laux < -VOJA_TRUA_DUONO || laux > longo + VOJA_TRUA_DUONO ) continue;
    const perpendikulara = Math.abs(rx * ndz - rz * ndx);
    // ⟨ នៅចុងចម្រៀក ៖ ចានភ្ជាប់លាតលើសគែមផ្លូវ 📃 ⟩
    const cxeFino = laux <= VOJA_TRUA_DUONO || laux >= longo - VOJA_TRUA_DUONO;
    const perpendikularaTolero = ( cxeFino ? VOJA_EKSTERA_DUONO : 0o1/0o100 ) + 0o1/0o1000;
    if ( perpendikulara > perpendikularaTolero ) continue;
    // ⟨ រន្ធត្រូវតូចជាងគែមចានបន្តិច 📏 ⟩ ៖ ផ្លូវលាតចូលក្នុងចានដើម្បីជាន់គ្នា ,
    // បិទចន្លោះតូចជាងភិកសែលដែលលេចជាខ្សែងងឹតនៅខ្សែកាត់ ។ 📃 ⟩
    const kuna = VOJA_TRUA_DUONO - VOJA_KUNIGA_SUPERPONO;
    truoj.push([ Math.max(0, laux - kuna ), Math.min(longo, laux + kuna ) ]);
  }
  truoj.sort(( p, q ) => p[0] - q[0] );
  const partoj: [ number, number, boolean ][] = [];
  let kur = 0;
  for ( const [ t0, t1 ] of truoj ) {
    if ( t1 <= kur ) continue;
    if ( t0 > kur ) partoj.push([ kur, t0, true ]);
    partoj.push([ Math.max(kur, t0), t1, false ]);
    kur = t1;
  }
  if ( kur < longo ) partoj.push([ kur, longo, true ]);
  return partoj;
}

// ⟪ ជណ្តើរស្មើគ្នា 📏 ⟫
/*សាងសង់ជំហានដែលមានកម្ពស់ថេរតាមអនុគមន៍កម្ពស់
    @param x1, z1 ( number ) - ចំណុចដើម
    @param x2, z2 ( number ) - ចំណុចចុង
    @param bendoj ( VojBendo [ ] ) - ខ្សែនៃផ្ទៃផ្លូវ
    @param dikecoBaza ( number ) - កម្រាស់យ៉ាងតិច
    @param heightFn ( function ) - កម្ពស់ផ្លូវ
    @param grundoFn ( function ) - កម្ពស់ដីក្រោម
    @param bufroj ( VojGeometriajBufroj ) - កន្លែងប្រមូលធរណីមាត្រ
    @param fala ( number ) - កម្ពស់ដែលមុខជំហានចុះទៅជំហានបន្ទាប់ ( ០ គ្មានជម្រាល )
@returns rezulto ( SegmentaRezulto | null ) - កម្ពស់ចុងទាំងពីរ */
export function konstruiUnuformajnStuparajnSegmentojn(x1: number, z1: number, x2: number, z2: number,
  bendoj: VojBendo[],
  dikecoBaza: number,
  heightFn: ( x: number, z: number ) => number,
  grundoFn: ( x: number, z: number ) => number,
  bufroj: VojGeometriajBufroj,
  fala: number
): SegmentaRezulto | null {
  const difX = x2 - x1, difZ = z2 - z1;
  const longo = Math.hypot(difX, difZ);
  if ( longo < 0o1/0o100 ) return null;
  const supro = heightFn(( x1 + x2 ) / 0o2, ( z1 + z2 ) / 0o2) + VOJA_SUPRO_LEVIGXO;
  const [ unua, lasta ] = aldoniTreadon(x1, z1, x2, z2, supro, fala, bendoj, dikecoBaza, grundoFn, bufroj);
  return { unua, lasta };
}

// ⟪ ផ្លូវជំហាន 📃 ⟫
/*កាត់កាលវិភាគជម្រាលឱ្យសមនឹងចម្រៀកដែលអាចសាងសង់បាន
    @param x1, z1 ( number ) - ចំណុចដើម
    @param x2, z2 ( number ) - ចំណុចចុង
    @param s0, s1 ( number ) - ចម្ងាយតាមបណ្តោយផ្លូវ
    @param bendoj ( VojBendo [ ] ) - ខ្សែនៃផ្ទៃផ្លូវ
    @param treadoj ( UnuformaTreado [ ] ) - កាលវិភាគលើផ្លូវទាំងមូល
    @param bufroj ( VojGeometriajBufroj ) - កន្លែងប្រមូលធរណីមាត្រ
    @param dikecoBaza ( number ) - កម្រាស់យ៉ាងតិច
    @param grundoFn ( function ) - កម្ពស់ដីក្រោម
@returns rezulto ( SegmentaRezulto | null ) - កម្ពស់ចុងទាំងពីរ */
// ⟨ កាត់ មិនមែនគណនាឡើងវិញ 📏 ⟩ ៖ ច្បាប់ជម្រាលទាំងអស់ស្ថិតក្នុង
// kreiUnuformajnTreadojn ។ ទីនេះគ្រាន់តែយកផ្នែកនៃប្រអប់ដែលស្ថិតក្នុង
// ចម្រៀកនេះ ហើយបកប្រែជាចំណុចពិភពលោក ។ កម្ពស់កាត់ជាលីនេអ៊ែរ ,
// ដូច្នេះច្រាំងមិនប្រែប្រួលទេ ទោះបីចម្រៀកកាត់ពាក់កណ្តាលជម្រាលក៏ដោយ ។
// ពីមុនចម្រៀកនីមួយៗបង្កើតបំណែកកម្រិតផ្ទាល់ខ្លួន ហើយបង្ហាប់ជម្រាល
// ឱ្យសមនឹងបំណែកខ្លី , ដូច្នេះលេចជាជញ្ជាំងឈរ ។ 📃 ⟩
export function konstruiSegmentonEnBufrojn(x1: number, z1: number, x2: number, z2: number,
  s0: number,
  s1: number,
  bendoj: VojBendo[],
  treadoj: readonly UnuformaTreado[],
  bufroj: VojGeometriajBufroj,
  dikecoBaza: number,
  grundoFn: ( x: number, z: number ) => number
): SegmentaRezulto | null {
  const difX = x2 - x1, difZ = z2 - z1;
  const longo = Math.hypot(difX, difZ);
  const sDif = s1 - s0;
  if ( longo < 0o1/0o100 || sDif < 0o1/0o1000 ) return null;
  let unua = Infinity, lasta = Infinity;
  for ( const t of treadoj ) {
    const a = Math.max( t.s0, s0 ), b = Math.min( t.s1, s1 );
    if ( b - a < 0o1/0o1000 ) continue;
    const tDif = t.s1 - t.s0;
    const altoCxe = ( s: number ): number =>
      t.altoA + ( t.altoB - t.altoA ) * ( s - t.s0 ) / tDif;
    const f0 = ( a - s0 ) / sDif, f1 = ( b - s0 ) / sDif;
    const ax = x1 + difX * f0, az = z1 + difZ * f0;
    const bx = x1 + difX * f1, bz = z1 + difZ * f1;
    const altoA = altoCxe( a ), altoB = altoCxe( b );
    aldoniBokson( ax, az, bx, bz, altoA, altoB, bendoj, dikecoBaza, grundoFn, bufroj );
    if ( unua === Infinity ) unua = altoA;
    lasta = altoB;
  }
  return unua === Infinity ? null : { unua, lasta };
}

// ⟪ ចម្រៀករលូន ( ស្ពាន ) 📃 ⟫
/*សាងសង់ចម្រៀកផ្លូវដែលមានផ្ទៃរលូនតាមប្រវត្តិរូប
    @param x1, z1 ( number ) - ចំណុចដើម
    @param x2, z2 ( number ) - ចំណុចចុង
    @param bendoj ( VojBendo [ ] ) - ខ្សែនៃផ្ទៃផ្លូវ
    @param dikecoBaza ( number ) - កម្រាស់យ៉ាងតិច
    @param heightFn ( function ) - កម្ពស់ផ្ទៃផ្លូវ
    @param grundoFn ( function ) - កម្ពស់ដីក្រោម
    @param bufroj ( VojGeometriajBufroj ) - កន្លែងប្រមូលធរណីមាត្រ
@returns rezulto ( SegmentaRezulto | null ) - កម្ពស់ចុងទាំងពីរ */
// ⟨ ហេតុអ្វីស្ពានរលូន 📃 ⟩ ៖ ស្ពានជាចម្រៀកវែងតែមួយ មិនមែនជណ្តើរ ។ បើសាងសង់
// ជាប្រអប់តាមជំហាន , ធ្នូក្លាយជាជណ្តើរថ្ម ហើយគែមប្រអប់ឃើញជាធ្មេញ ។ ដូច្នេះ
// ស្ពានសាងសង់ជាទម្រង់តែមួយរត់តាមធ្នូ ៖ ខ្សែ និងសម្ភារៈដូចផ្លូវឯទៀត ,
// តែផ្ទៃរលូន ។ ការប៉ះទង្គិចកត់តាមគំរូ , ដូច្នេះការដើរលើស្ពានតាមធ្នូ ។ 📃 ⟩
export function konstruiGlatanSegmenton(x1: number, z1: number, x2: number, z2: number,
  bendoj: VojBendo[],
  dikecoBaza: number,
  heightFn: ( x: number, z: number ) => number,
  grundoFn: ( x: number, z: number ) => number,
  bufroj: VojGeometriajBufroj
): SegmentaRezulto | null {
  const difX = x2 - x1, difZ = z2 - z1;
  const longo = Math.hypot(difX, difZ);
  if ( longo < 0o1/0o100 ) return null;
  const steps = Math.max(0o1, Math.ceil(longo / ( 0o1/0o2 )));
  const ndx = difX / longo, ndz = difZ / longo;
  const eksteraDuon = kreiEksteranDuonon(bendoj);
  const latX = -ndz * eksteraDuon, latZ = ndx * eksteraDuon;
  const specimenoj: { s: number; supro: number; fundo: number }[] = [];
  for ( let i = 0; i <= steps; i++ ) {
    const s = longo * i / steps;
    const px = x1 + ndx * s, pz = z1 + ndz * s;
    const supro = Math.max(
      heightFn(px - latX, pz - latZ), heightFn(px + latX, pz + latZ))
      + 0o1/0o100 + dikecoBaza;
    const minimumo = Math.min(
      grundoFn(px - latX, pz - latZ), grundoFn(px, pz), grundoFn(px + latX, pz + latZ));
    specimenoj.push({ s, supro, fundo: Math.min(supro - dikecoBaza, minimumo - ANGULA_PROVOLIRO) });
  }
  const formo = new THREE.Shape();
  formo.moveTo(specimenoj[0].s, specimenoj[0].fundo);
  for ( let i = 1; i < specimenoj.length; i++ ) {
    const antauxa = specimenoj[i - 1];
    const nuna = specimenoj[i];
    // ⟨ គ្មានជម្រាលបាត ៖ ព្រំដែនរវាងដី និងស្ពានត្រូវធ្លាក់កាត់កែង 📃 ⟩
    const antauxaDeko = antauxa.fundo >= antauxa.supro - dikecoBaza - 0o1/0o10;
    const nunaDeko = nuna.fundo >= nuna.supro - dikecoBaza - 0o1/0o10;
    if ( antauxaDeko !== nunaDeko ) formo.lineTo(nuna.s, antauxa.fundo);
    formo.lineTo(nuna.s, nuna.fundo);
  }
  for ( let i = specimenoj.length - 1; i >= 0; i-- )
    formo.lineTo(specimenoj[i].s, specimenoj[i].supro);
  formo.closePath();
  const matrico = new THREE.Matrix4().makeRotationY(Math.atan2(difX, difZ));
  matrico.setPosition(x1, 0, z1);
  for ( const bendo of bendoj ) {
    const geometrio = new THREE.ExtrudeGeometry(formo, { depth: bendo.largho, bevelEnabled: false });
    geometrio.rotateY(-Math.PI / 2);
    geometrio.translate(-bendo.ofseto + bendo.largho / 0o2, 0, 0);
    bufroj.aldoni(geometrio, bendo.materialo, matrico);
  }
  const suproj = specimenoj.map(s => s.supro);
  // ⟨ ការប៉ះទង្គិចតាមគំរូ 📏 ⟩ ៖ ចម្រៀកតែមួយកត់តែកម្ពស់ចុងពីរ , ដូច្នេះការដើរ
  // តាមខ្សែត្រង់រវាងចុង ។ ធ្នូខ្ពស់នៅកណ្តាល , ដូច្នេះនៅកណ្តាលស្ពានការដើរ
  // ទាបជាងផ្ទៃដែលឃើញ ។ ដូច្នេះកត់មួយក្នុងមួយគំរូ ៖ ការដើរតាមធ្នូ ។ 📃 ⟩
  for ( let i = 1; i < specimenoj.length; i++ ) {
    const antauxa = specimenoj[i - 1];
    const nuna = specimenoj[i];
    vojSuprajxoj.push({ x1: x1 + ndx * antauxa.s, z1: z1 + ndz * antauxa.s,
      x2: x1 + ndx * nuna.s, z2: z1 + ndz * nuna.s, duono: eksteraDuon,
      y0: antauxa.supro, y1: nuna.supro });
  }
  return { unua: suproj[0], lasta: suproj[suproj.length - 1] };
}

// ⟪ កន្លះទទឹងខាងក្រៅ 📏 ⟫
/*រកកន្លះទទឹងនៃខ្សែផ្លូវធំបំផុត
    @param bendoj ( VojBendo [ ] ) - ខ្សែនៃផ្ទៃផ្លូវ
@returns duono ( number ) - កន្លះទទឹងខាងក្រៅ */
export function kreiEksteranDuonon( bendoj: readonly VojBendo[] ): number {
  let duono = 0;
  for ( const bendo of bendoj ) {
    const rando = Math.abs(bendo.ofseto) + bendo.largho / 2;
    if ( rando > duono ) duono = rando;
  }
  return duono;
}
