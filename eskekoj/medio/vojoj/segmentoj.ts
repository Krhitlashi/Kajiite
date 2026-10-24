// ≺⧼ ផ្នែកផ្លូវ 🧩 ⧽≻
import * as THREE from "three";
import { matricoPor, ANGULA_PROVOLIRO, type VojBendo, type VojGeometriajBufroj } from "./bufroj.js";
import { kreiSegmentGeometrion } from "./formoj.js";
import { kreiNivelajnPecojn, type NivelaProfilo } from "./niveloj.js";
import { VOJA_EKSTERA_DUONO, VOJA_SUPRO_LEVIGXO, VOJA_TRUA_DUONO } from "./mezuroj.js";
import { vojSuprajxoj } from "./tipoj.js";

// ⟪ កម្ពស់ចុងចម្រៀក 📃 ⟫
export interface SegmentaRezulto {
  unua: number;
  lasta: number;
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
    truoj.push([ Math.max(0, laux - VOJA_TRUA_DUONO ), Math.min(longo, laux + VOJA_TRUA_DUONO ) ]);
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
@returns rezulto ( SegmentaRezulto | null ) - កម្ពស់ចុងទាំងពីរ */
export function konstruiUnuformajnStuparajnSegmentojn(x1: number, z1: number, x2: number, z2: number,
  bendoj: VojBendo[],
  dikecoBaza: number,
  heightFn: ( x: number, z: number ) => number,
  grundoFn: ( x: number, z: number ) => number,
  bufroj: VojGeometriajBufroj
): SegmentaRezulto | null {
  const difX = x2 - x1, difZ = z2 - z1;
  const longo = Math.hypot(difX, difZ);
  if ( longo < 0o1/0o100 ) return null;
  const mezaX = ( x1 + x2 ) / 2, mezaZ = ( z1 + z2 ) / 2;
  const ndx = difX / longo, ndz = difZ / longo;
  const eksteraDuon = kreiEksteranDuonon(bendoj);
  const latX = -ndz * eksteraDuon, latZ = ndx * eksteraDuon;
  const supro = heightFn(mezaX, mezaZ) + VOJA_SUPRO_LEVIGXO;
  let malsupro = Infinity;
  for ( const t of [ 0, 0o1/0o2, 1 ] ) {
    const x = x1 + difX * t, z = z1 + difZ * t;
    for ( const flanko of [ -1, 0, 1 ] )
      malsupro = Math.min(malsupro, grundoFn(x + latX * flanko, z + latZ * flanko));
  }
  const bazo = malsupro - ANGULA_PROVOLIRO;
  const dikeco = Math.max(dikecoBaza, supro - bazo);
  const fundo = supro - dikeco;
  vojSuprajxoj.push({ x1, z1, x2, z2, duono: eksteraDuon, y0: supro, y1: supro });
  for ( const bendo of bendoj ) {
    const geometrio = kreiSegmentGeometrion(bendo.largho, longo, dikeco, bendo.ofseto);
    bufroj.aldoni(geometrio, bendo.materialo, matricoPor(difX, difZ, mezaX, fundo, mezaZ));
  }
  return { unua: supro, lasta: supro };
}

// ⟪ ផ្លូវជំហាន 📃 ⟫
/*សាងសង់ចម្រៀកផ្លូវតាមកម្រិតដែលបានកំណត់
    @param x1, z1 ( number ) - ចំណុចដើម
    @param x2, z2 ( number ) - ចំណុចចុង
    @param s0, s1 ( number ) - ចម្ងាយតាមបណ្តោយផ្លូវ
    @param bendoj ( VojBendo [ ] ) - ខ្សែនៃផ្ទៃផ្លូវ
    @param profilo ( NivelaProfilo ) - កម្រិតផ្លូវទាំងមូល
    @param bufroj ( VojGeometriajBufroj ) - កន្លែងប្រមូលធរណីមាត្រ
    @param dikecoBaza ( number ) - កម្រាស់យ៉ាងតិច
    @param grundoFn ( function ) - កម្ពស់ដីក្រោម
@returns rezulto ( SegmentaRezulto | null ) - កម្ពស់ចុងទាំងពីរ */
export function konstruiSegmentonEnBufrojn(x1: number, z1: number, x2: number, z2: number,
  s0: number,
  s1: number,
  bendoj: VojBendo[],
  profilo: NivelaProfilo,
  bufroj: VojGeometriajBufroj,
  dikecoBaza: number,
  grundoFn: ( x: number, z: number ) => number
): SegmentaRezulto | null {
  const difX = x2 - x1, difZ = z2 - z1;
  const longo = Math.hypot(difX, difZ);
  const sDif = s1 - s0;
  if ( longo < 0o1/0o100 || sDif < 0o1/0o1000 ) return null;
  const ndx = difX / longo, ndz = difZ / longo;
  const eksteraDuon = kreiEksteranDuonon(bendoj);
  const latX = -ndz * eksteraDuon, latZ = ndx * eksteraDuon;
  const pecoj = kreiNivelajnPecojn(profilo, s0, s1);
  let unua = Infinity, lasta = Infinity;
  for ( const peco of pecoj ) {
    const f0 = ( peco.s0 - s0 ) / sDif, f1 = ( peco.s1 - s0 ) / sDif;
    const ax = x1 + difX * f0, az = z1 + difZ * f0;
    const bx = x1 + difX * f1, bz = z1 + difZ * f1;
    const longoTread = Math.hypot(bx - ax, bz - az);
    if ( longoTread < 0o1/0o1000 ) continue;
    // ⟨ បាតដីក្រោមជំហាន ៖ ជណ្តើរចូលដល់ដី , មិនអណ្តែតលើទឹកទេ 📃 ⟩
    let minProfundo = Infinity;
    for ( const f of [ 0, 0o1/0o2, 1 ] ) {
      const px = ax + ( bx - ax ) * f, pz = az + ( bz - az ) * f;
      minProfundo = Math.min( minProfundo,
        grundoFn(px - latX, pz - latZ), grundoFn(px, pz), grundoFn(px + latX, pz + latZ) );
    }
    const dikecoTread = Math.max(dikecoBaza, peco.alto - ( minProfundo - ANGULA_PROVOLIRO ));
    const y = peco.alto - dikecoTread;
    if ( unua === Infinity ) unua = peco.alto;
    lasta = peco.alto;
    vojSuprajxoj.push({ x1: ax, z1: az, x2: bx, z2: bz, duono: eksteraDuon,
      y0: peco.alto, y1: peco.alto });
    for ( const bendo of bendoj ) {
      const geometrio = kreiSegmentGeometrion(bendo.largho, longoTread, dikecoTread, bendo.ofseto);
      bufroj.aldoni(geometrio, bendo.materialo,
        matricoPor(difX, difZ, ( ax + bx ) / 2, y, ( az + bz ) / 2));
    }
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
    geometrio.translate(-bendo.ofseto + bendo.largho / 2, 0, 0);
    bufroj.aldoni(geometrio, bendo.materialo, matrico);
  }
  const suproj = specimenoj.map(s => s.supro);
  vojSuprajxoj.push({ x1, z1, x2, z2, duono: eksteraDuon,
    y0: suproj[0], y1: suproj[suproj.length - 1] });
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
