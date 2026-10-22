// ≺⧼ ផ្នែកផ្លូវ 🧩 ⧽≻
import { matricoPor, ANGULA_PROVOLIRO, type VojBendo, type VojGeometriajBufroj } from "./bufroj.js";
import { kreiSegmentGeometrion } from "./formoj.js";
import { VOJA_BURIAL_TOLERANCO, VOJA_EKSTERA_DUONO, VOJA_SUPRO_LEVIGXO,
  VOJA_STUPA_RISERO, VOJA_TRUA_DUONO } from "./mezuroj.js";
import { vojSuprajxoj, type VojKunigoAlto } from "./tipoj.js";

// ⟨ ច្រាំងដែលចានភ្ជាប់ទាញ់ផ្លូវ ៖ ផ្លូវត្រូវឡើងដល់កម្រិតចានភ្ជាប់មុនចុងទៀត ។ 📃 ⟩
export const VOJA_KUNIGO_RADIO = VOJA_TRUA_DUONO + 3;
// ⟨ ច្រាំងដែលផ្លូវស្មើគ្នាចានភ្ជាប់ទាំងមូល ។ 📃 ⟩
export const VOJA_KUNIGO_PLENO = VOJA_TRUA_DUONO + 1;

// ≺⧼ ជំហានខ្ពស់បំផុត 📏 ⟫
// ⟨ ជំហាននីមួយៗខ្ពស់មិនលើសតម្លៃនេះទេ ។ បើដីឡើងឬចុះខ្លាំង ការផ្លាស់ប្តូរ
// ត្រូវបែងចែកជាច្រើនជំហានស្មើគ្នា ។ ដូច្នេះផ្លូវមិនលោតឡើង ឬធ្លាក់ចុះភ្លាមៗ
// នៅកន្លែងដីរដុប ។ 📃 ⟩
export const STUPA_RISERO = VOJA_STUPA_RISERO;

// ⟪ ស្ថានភាពផ្លូវ 📃 ⟫
// ⟨ កឆ្ូលចុងក្រោយនៃផ្លូវមួយ ៖ ចម្រៀកបន្ទាប់បន្តពីទីនោះ ។
// បើគ្មានស្ថានភាព ចម្រៀកនីមួយៗចាប់ផ្តើមដោយខ្លួនឯង ។ 📃 ⟩
export interface VojStuparaStato {
  supro: number | null;
  // ⟨ កម្រិតផ្លូវនៅចុងទៀត ៖ កម្រិតផ្ទឃ្លាំងដែលបានកំណត់មុនចុងទៀត ។ 📃 ⟩
  komenco: number | null;
  // ⟨ កម្រិតជំហានដំបូងនៃបទាឆ់បង្ក្កាន ៖ កម្រិតផ្លូវនៅចុងទៀតនៃបទាឆ់បង្ក្កាននេះ ។ 📃 ⟩
  unua: number | null;
}

// ⟨ ការអត់ធ្មត់កែង 📃 ⟩
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
    // ⟨ នៅកណ្តាល ត្រង់ខ្សែកណ្តាល 📃 ⟩
    const cxeFino = laux <= VOJA_TRUA_DUONO || laux >= longo - VOJA_TRUA_DUONO;
    const perpendikularaTolero = ( cxeFino ? VOJA_EKSTERA_DUONO : 0o1/0o100 ) + 0o1/0o1000;
    if ( perpendikulara > perpendikularaTolero ) continue;
    truoj.push([ Math.max(0, laux - VOJA_TRUA_DUONO), Math.min(longo, laux + VOJA_TRUA_DUONO) ]);
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

// ⟨ ជណ្តើរផ្ទាល់ ៖ រក្សាកម្រាស់ជំហានដែលបានកំណត់ មិនកែតាមដី 📃 ⟩
export function konstruiUnuformajnStuparajnSegmentojn(x1: number, z1: number, x2: number, z2: number,
  bendoj: VojBendo[],
  dikecoBaza: number,
  heightFn: ( x: number, z: number ) => number,
  grundoFn: ( x: number, z: number ) => number,
  bufroj: VojGeometriajBufroj
): void {
  const difX = x2 - x1, difZ = z2 - z1;
  const longo = Math.hypot(difX, difZ);
  if ( longo < 0o1/0o100 ) return;
  const mezaX = ( x1 + x2 ) / 2, mezaZ = ( z1 + z2 ) / 2;
  const ndx = difX / longo, ndz = difZ / longo;
  const eksteraDuon = bendoj.reduce(( maks, bendo ) =>
    Math.max(maks, Math.abs(bendo.ofseto) + bendo.largho / 2), 0);
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
}

// ⟨ តែជណ្តើរ 📃 ⟩
export function konstruiSegmentonEnBufrojn(x1: number, z1: number, x2: number, z2: number,
  bendoj: VojBendo[],
  dikecoBaza: number,
  heightFn: ( x: number, z: number ) => number,
  bufroj: VojGeometriajBufroj,
  glata = false,
  stato?: VojStuparaStato,
  risero = STUPA_RISERO,
  grundoFn: ( x: number, z: number ) => number = heightFn,
  akvaFn?: ( x: number, z: number ) => number,
  kunigoAltoj?: VojKunigoAlto[]
): void {
  const difX = x2 - x1, difZ = z2 - z1;
  const longo = Math.hypot(difX, difZ);
  if ( longo < 0o1/0o100 ) return;
  const steps = Math.max(1, Math.ceil(longo / 0o1));
  const pasoLongo = longo / steps;
  const ndx = difX / longo, ndz = difZ / longo;
  let eksteraDuon = 0;
  for ( const bendo of bendoj ) {
    const rando = Math.abs(bendo.ofseto) + bendo.largho / 2;
    if ( rando > eksteraDuon ) eksteraDuon = rando;
  }
  const latX = -ndz * eksteraDuon, latZ = ndx * eksteraDuon;
  // ⟨ គែមខ្ពស់កំណត់ផ្ទៃផ្លូវ ដើម្បីកុំឱ្យផ្លូវលិចក្នុងជម្រាល 📃 ⟩
  const suprenoCxe = ( px: number, pz: number ): number => Math.max(
    heightFn(px - latX, pz - latZ), heightFn(px, pz), heightFn(px + latX, pz + latZ));
  // ⟨ ផ្ទឃ្លាំងទឹកនៅផ្លូវ ដើម្បីកុំឱ្យផ្លូវកប់ក្នុងទឹក ។ ត្រូវរកជាភាគតាមមជ្ឈមណ្ឌទឹក ដើម្បីឱ្យអាចរកបានបាន និងកុំឱ្យទឹកដែលជាប់ផ្លូវលិចឡើយឡើង។ 📃 ⟩
  const akvoCxe = ( px: number, pz: number ): number => {
    if ( !akvaFn ) return -Infinity;
    return akvaFn( px, pz );
  };
  // ⟨ កម្រិតចានភ្ជាប់ដែលនៅចំណុចនេះ ៖ ចានភ្ជាប់ត្រូវនៅជាមួយផ្លូវ ដើម្បីកុំឱ្យផ្លូវលិចទៅចាន ។ 📃 ⟩
  const kunigoCxe = ( px: number, pz: number ): { alto: number; pes: number } | null => {
    if ( !kunigoAltoj || kunigoAltoj.length === 0 ) return null;
    let plejProksima: VojKunigoAlto | null = null, plejMallonga = Infinity;
    for ( const k of kunigoAltoj ) {
      const d = Math.hypot( k.x - px, k.z - pz );
      if ( d < plejMallonga ) { plejMallonga = d; plejProksima = k; }
    }
    if ( !plejProksima || plejMallonga >= VOJA_KUNIGO_RADIO ) return null;
    // ⟨ ច្រាំងចម្រៀក ៖ ចានភ្ជាប់ត្រូវជាកម្រិតផ្លូវពេញចិត្ត ដើម្បីឱ្យផ្លូវអាចឡើងដល់ចានភ្ជាប់ដោយរលូន ។ 📃 ⟩
    const pes = Math.max(0, Math.min(1,
      ( VOJA_KUNIGO_RADIO - plejMallonga ) / ( VOJA_KUNIGO_RADIO - VOJA_KUNIGO_PLENO ) ));
    return { alto: plejProksima.alto, pes };
  };
  // ⟨ ជម្រាលរលូន ( តែដប់ស្ពាន ) 📃 ⟩
  if ( glata ) {
    for ( let s = 0; s < steps; s++ ) {
      const t0 = s / steps, t1 = ( s + 1 ) / steps;
      const sx1 = x1 + difX * t0, sz1 = z1 + difZ * t0;
      const sx2 = x1 + difX * t1, sz2 = z1 + difZ * t1;
      const movX = ( sx1 + sx2 ) / 2, movZ = ( sz1 + sz2 ) / 2;
      // ⟨ ការគំរូគែម 📃 ⟩
      const h0a = heightFn(sx1 - latX, sz1 - latZ);
      const h0b = heightFn(sx1 + latX, sz1 + latZ);
      const h1a = heightFn(sx2 - latX, sz2 - latZ);
      const h1b = heightFn(sx2 + latX, sz2 + latZ);
      // ⟨ បាតដី ៖ ជណ្តើរចុះដល់ដីដូចផ្លូវ , មិនអណ្តែតលើទឹកទេ 📃 ⟩
      const minimum0 = Math.min(grundoFn(sx1 - latX, sz1 - latZ), grundoFn(sx1 + latX, sz1 + latZ));
      const minimum1 = Math.min(grundoFn(sx2 - latX, sz2 - latZ), grundoFn(sx2 + latX, sz2 + latZ));
      const maks0 = Math.max(h0a, h0b);
      const maks1 = Math.max(h1a, h1b);
      const s0 = maks0 + 0o1/0o100 + dikecoBaza;
      const s1 = maks1 + 0o1/0o100 + dikecoBaza;
      const difo = s1 - s0;
      vojSuprajxoj.push({ x1: sx1, z1: sz1, x2: sx2, z2: sz2, duono: eksteraDuon, y0: s0, y1: s1 });
      if ( stato ) {
        if ( stato.komenco === null ) stato.komenco = s0;
        if ( stato.unua === null ) stato.unua = s0;
        stato.supro = s1;
      }
      const klinoL = Math.hypot(pasoLongo, difo);
      const ang = Math.atan2(difo, pasoLongo);
      const dikeco = ( Math.max(s0 - minimum0, s1 - minimum1) + ANGULA_PROVOLIRO ) / Math.cos(ang);
      const y = ( s0 + s1 ) / 2 - dikeco * Math.cos(ang);
      for ( const bendo of bendoj ) {
        const geometrio = kreiSegmentGeometrion(bendo.largho, klinoL, dikeco, bendo.ofseto);
        geometrio.rotateX(ang);
        bufroj.aldoni(geometrio, bendo.materialo, matricoPor(difX, difZ, movX, y, movZ));
      }
    }
    return;
  }
  // ⟪ ជំហាន ព្រាងជណ្តើរ ៖ កម្រិតផ្លូវនៅស្មើគ្នារវាងចម្រៀក និងចម្រៀកមុន ត្រូវកន្លែងជណ្តើរ រលូន និងគិរលើង ៖ កម្រិតផ្លូវនៅគ្រប់ជណ្តើរខាងលើ មិនយក់កាប់ក្នុងដីទេ ។ 📃 ⟩
  // ⟨ ចំណុចតូច ៖ កម្រិតផ្លូវតាមបណ្ឌវី ដើម្បីរកកម្រិតផ្លូវ និងកន្លែងជណ្តើរ ។ 📃 ⟩
  const paŝoFino = 0o1/0o2;
  const nombroPaŝoj = Math.max(1, Math.ceil(longo / paŝoFino));
  const celoj: number[] = [];
  const puloj: ( number | null )[] = [];
  for ( let i = 0; i <= nombroPaŝoj; i++ ) {
    const t = i / nombroPaŝoj;
    const px = x1 + difX * t, pz = z1 + difZ * t;
    // ⟨ កម្រិតផ្លូវ ៖ ធំនៃដី ឬជណ្តើរចំណត ឬផ្ទឃ្លាំងទឹក ដែលឈឺស្ថានជាច្រើនដោយគ្នា ។ 📃 ⟩
    const natura = suprenoCxe(px, pz) + 0o1/0o100 + dikecoBaza;
    let alto = natura;
    let pulo: number | null = null;
    const kunigo = kunigoCxe(px, pz);
    if ( kunigo ) {
      // ⟨ ចានភ្ជាប់ទាញ់ផ្លូវ ៖ កម្រិតផ្លូវត្រូវប៉ជងក៏ទៅកម្រិតចានភ្ជាប់ និងមិនយក់កាប់ក្នុងដីទេ ។ 📃 ⟩
      const altaj = kunigo.alto * kunigo.pes + natura * ( 1 - kunigo.pes );
      alto = Math.max( altaj, natura - VOJA_BURIAL_TOLERANCO );
      if ( kunigo.pes >= 1 ) pulo = kunigo.alto;
    }
    celoj.push( Math.max( alto, akvoCxe(px, pz) ) );
    puloj.push( pulo );
  }
  // ⟨ ការកំណត់ជំហាន ៖ ជំហានតូចត្រូវកន្លែងដល់ចម្រៀកមុន រហូតវេស្តីកំពោះកម្រិតផ្លូវ ដើម្បីកុំឱ្យជំហានធំមួយដែលមានច្បាស់ចេញ ។ 📃 ⟩
  // ⟨ កម្រិតជំហាន ៖ កម្រិតផ្លូវត្រូវជាមួយជំហានមុន ដើម្បីកុំឱ្យមានជំហានធំចម្ងាយពីគម្រៀក ត្រូវមិនកប់ក្នុងដី និងមិនលង់កុងពីកម្រិតចានភ្ជាប់ ។ 📃 ⟩
  const kalkuliAlton = ( maks: number, nivelo: number | null, pulo: number | null ): number => {
    // ⟨ ចានភ្ជាប់ ៖ កម្រិតផ្លូវនៅជណ្តើរត្រូវជាកម្រិតចានភ្ជាប់ត្រូវគ្នា ។ 📃 ⟩
    if ( pulo !== null ) return pulo;
    if ( nivelo === null ) return maks;
    // ⟨ ការឡើងជាជំហាន ៖ កម្រិតផ្លូវមិនឡើងលឿនជាងតម្លៃនេះទេ បើដីឡើងឬចុះខ្លាំង ការផ្លាស់ប្តូរត្រូវបែងចែកជាច្រើនជំហានស្មើគ្នា ។ 📃 ⟩
    const limo = Math.min( maks, nivelo + risero + VOJA_BURIAL_TOLERANCO );
    return Math.max( limo, maks - VOJA_BURIAL_TOLERANCO );
  };
  const treads: { t0: number; t1: number; alto: number }[] = [];
  {
    let t0 = 0;
    let maks = celoj[0], minimumo = celoj[0];
    let nivelo: number | null = stato?.supro ?? null;
    for ( let i = 1; i <= nombroPaŝoj; i++ ) {
      const c = celoj[i];
      const nMaks = Math.max(maks, c), nMin = Math.min(minimumo, c);
      const puloŜanĝis = puloj[i] !== puloj[i - 1];
      if ( nMaks - nMin > risero || puloŜanĝis ) {
        // ⟨ ជំហានចុងរាល់ ៖ កម្រិតផ្លូវកំណត់ពីចម្រៀកមុន ត្រូវចាប់ផ្តាម ទៅជំហានបន្ទាប់ ។ 📃 ⟩
        const alto = kalkuliAlton( maks, nivelo, puloj[i - 1] );
        treads.push({ t0, t1: ( i - 1 ) / nombroPaŝoj, alto });
        nivelo = alto;
        t0 = ( i - 1 ) / nombroPaŝoj;
        maks = c; minimumo = c;
      } else { maks = nMaks; minimumo = nMin; }
    }
    treads.push({ t0, t1: 1, alto: kalkuliAlton( maks, nivelo, puloj[nombroPaŝoj] ) });
  }
  for ( const tread of treads ) {
    const ax = x1 + difX * tread.t0, az = z1 + difZ * tread.t0;
    const bx = x1 + difX * tread.t1, bz = z1 + difZ * tread.t1;
    const mezaX = ( ax + bx ) / 2, mezaZ = ( az + bz ) / 2;
    const longoTread = Math.hypot(bx - ax, bz - az);
    if ( longoTread < 0o1/0o1000 ) continue;
    // ⟨ បាតដីក្រោមជំហាន ៖ ជណ្តើរត្រូវចូលដល់ដីដូចផ្លូវ , មិនអណ្តែតលើទឹកទេ 📃 ⟩
    let minProfundo = Infinity;
    for ( const f of [ 0, 0o1/0o2, 1 ] ) {
      const px = ax + ( bx - ax ) * f, pz = az + ( bz - az ) * f;
      minProfundo = Math.min( minProfundo,
        grundoFn(px - latX, pz - latZ), grundoFn(px + latX, pz + latZ), grundoFn(px, pz) );
    }
    const dikecoTread = tread.alto - ( minProfundo - ANGULA_PROVOLIRO );
    const y = tread.alto - dikecoTread;
    // ⟨ កម្រិតផ្លូវនៅចុងទៀត ៖ កម្រិតផ្ទឃ្លាំងដែលបានកំណត់មុនចុងទៀត ។ 📃 ⟩
    if ( stato ) {
      if ( stato.komenco === null ) stato.komenco = tread.alto;
      if ( stato.unua === null ) stato.unua = tread.alto;
    }
    vojSuprajxoj.push({ x1: ax, z1: az, x2: bx, z2: bz, duono: eksteraDuon,
      y0: tread.alto, y1: tread.alto });
    for ( const bendo of bendoj ) {
      const geometrio = kreiSegmentGeometrion(bendo.largho, longoTread, dikecoTread, bendo.ofseto);
      bufroj.aldoni(geometrio, bendo.materialo, matricoPor(difX, difZ, mezaX, y, mezaZ));
    }
  }
  if ( stato ) {
    stato.supro = treads[treads.length - 1]?.alto ?? 0;
    if ( stato.unua === null ) stato.unua = stato.supro;
  }
}
