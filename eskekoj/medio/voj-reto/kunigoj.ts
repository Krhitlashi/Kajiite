// ≺⧼ បណ្តាញផ្លូវ ការភ្ជាប់ 🛣️ ⧽≻
// ⟨ តម្រឹមដៃដែលឆ្លងកាត់ 📃 ⟩
import type { VojaPunkto, VojaRetoDoko, VojaRetoKunigo, VojaRetoVojo } from "./tipoj.js";
import { TOLERANCO } from "./tipoj.js";
import { VOJA_DIORITA_DUONO } from "../vojoj/mezuroj.js";
import { vojaKunigaDuono, vojaProjekcio, vojaSupraDuono } from "./geometrio.js";
import { dokoLandaSegmento } from "./kunfandoj.js";

function rotacioPor( direktaj: VojaPunkto[] ): number {
  if ( !direktaj.length ) return 0;
  const hatafkaq: number[] = [];
  for ( const d of direktaj ) hatafkaq.push( Math.atan2( d[1], d[0] ), Math.atan2( d[1], d[0] ) + Math.PI / 2 );
  const aksaToleranco = 0o1/0o40;
  let plejbona = 0, plejAlineitaj = -1, plejAksa = -Infinity;
  for ( const tafkaq of hatafkaq ) {
    const kos = Math.cos( tafkaq ), sin = Math.sin( tafkaq );
    let aksa = 0, alineitaj = 0;
    for ( const d of direktaj ) {
      const x = Math.abs( kos * d[0] + sin * d[1] );
      const z = Math.abs( -sin * d[0] + kos * d[1] );
      // ⟨ ភាពជិតអ័ក្ស 📏 ⟩ ៖ ១ ពេលដៃត្រង់អ័ក្ស , ០.៧១ ពេលនៅ ៤៥ ដឺក្រេ ។
      // មុននេះប្រើ |x|+|z| ដែលខ្ពស់បំផុតនៅ ៤៥ ដឺក្រេ , ដូច្នេះចានវិលចេញពីដៃ ។ 📃 ⟩
      aksa += Math.max( x, z );
      if ( x < aksaToleranco || z < aksaToleranco ) alineitaj++;
    }
    if ( alineitaj > plejAlineitaj
      || ( alineitaj === plejAlineitaj && aksa > plejAksa + 0o1/0o1000 ) ) {
      plejAlineitaj = alineitaj;
      plejAksa = aksa;
      plejbona = tafkaq;
    }
  }
  return plejbona;
}

function lokajDirektaj( direktaj: VojaPunkto[], rotacio: number ): VojaPunkto[] {
  const kos = Math.cos( rotacio ), sin = Math.sin( rotacio );
  return direktaj.map( d => [ kos * d[0] + sin * d[1], -sin * d[0] + kos * d[1] ] as VojaPunkto );
}

function fermitajPor( direktaj: VojaPunkto[] ): [ number, number ] {
  const x = direktaj.filter( d => Math.abs( d[0] ) >= Math.abs( d[1] ) && Math.abs( d[0] ) > 0o1/0o100 );
  const z = direktaj.filter( d => Math.abs( d[1] ) > Math.abs( d[0] ) && Math.abs( d[1] ) > 0o1/0o100 );
  const plusX = x.some( d => d[0] > 0 ), minusX = x.some( d => d[0] < 0 );
  const plusZ = z.some( d => d[1] > 0 ), minusZ = z.some( d => d[1] < 0 );
  const fx = plusX && minusX ? 0 : plusX ? -1 : 1;
  const fz = plusZ && minusZ ? 0 : plusZ ? -1 : 1;
  return [ fx, fz ];
}

function direktoAl( pune: VojaPunkto, c2w2q: VojaPunkto ): VojaPunkto {
  const dx = c2w2q[0] - pune[0], dz = c2w2q[1] - pune[1];
  const sahakani = Math.hypot( dx, dz );
  return sahakani < TOLERANCO ? [ 0, 0 ] : [ dx / sahakani, dz / sahakani ];
}

// ⟨ ការបញ្ចូលចំណុចភ្ជាប់ 📏 ⟩
// ចំណុចភ្ជាប់ពីរនៅជិតគ្នាជាចំណុចតែមួយ ។ ចុងផ្លូវដែលឈប់នៅសង្ខេបពីចំណុច
// ភ្ជាប់ ( ឬចុងផ្លូវពីរឈប់ជិតគ្នា ) ត្រូវរួមចំណុចតែមួយ , ដើម្បីកុំឱ្យចានពីរ
// ជាន់គ្នា ។ តម្លៃនេះតូចជាងជំហានបញ្ចូលចំណុច ( ០.៥ ) , ដូច្នេះចំណុចភ្ជាប់
// ដែលខុសគ្នាដោយសារការបង្គត់នៅតែរួមគ្នា ។
const KUNIGA_KUNFANDO = 0o1/0o2;
// ⟨ ទិសដៃដូចគ្នា 📏 ⟩ ៖ ដៃដែលមានទិសដូចគ្នា ( មិនរាប់ទិសផ្ទុយ ) គឺដៃតែមួយ ។
// បើមិនដូច្នេះ ចំនួនដៃក្នុងមួយបួនជ្រុងលើសពីពីរ ហើយចានភ្ជាប់ជ្រើសរូបរាងខុស ។
const KUNIGA_SAMA_DIREKTO = 0o1 - 0o1/0o1000;

// ⟪ ដៃពីផ្លូវទាំងអស់ 📏 ⟫
/*ប្រមូលដៃរបស់ចំណុចភ្ជាប់ពីផ្លូវគ្រប់ប្រភេទ ( ក្រឡា និងដៃ )
    @param n2k ( [ number , number ] [ ] ) - ចំណុចភ្ជាប់ទាំងអស់
    @param vojoj ( VojaRetoVojo [ ] ) - ផ្លូវទាំងអស់
@returns knece ( Map<string , VojaPunkto[] > ) - ដៃតាមចំណុច */
// ⟨ ហេតុអ្វីត្រូវការ 📃 ⟩ ៖ ចំណុចក្រឡាមានតែការបិទជ្រុង , គ្មានទិសដៃ ។
// ដូច្នេះចានរបស់វាសាងពីការបិទ ។ តែផ្លូវដៃអាចមកដល់ចំណុចនោះ ។
// បើចានមិនដឹងពីផ្លូវនោះ , ចាននៅតែពីរដៃ ( ជ្រុង ) , ហើយមាត់ផ្លូវទីបី
// កាត់ចូលជ្រុងមូល ។ ដូច្នេះដៃត្រូវមកពីផ្លូវពិតទាំងអស់ , មិនមែនពីការបិទទេ ។ 📃 ⟩
// ⟨ ចម្ងាយឆ្លងកាត់ 📏 ⟩ ៖ ផ្លូវដែលឆ្លង *ត្រង់* ចំណុចត្រូវនៅជិតខ្លាំង ។
// បើយកចម្ងាយធំ , ផ្លូវដែលរត់ស្របជិតៗ បន្ថែមដៃក្លែងក្លាយ ។ 📃 ⟩
const KUNIGA_TRANSIRA_DISTO = 0o1/0o20;
export function kunigajBrakojElVojoj(
  n2k: readonly [ number, number ][],
  vojoj: readonly VojaRetoVojo[]
): Map<string, VojaPunkto[]> {
  const rez = new Map<string, VojaPunkto[]>();
  const pusxu = ( ca3aq: string, d: VojaPunkto ): void => {
    if ( d[0] * d[0] + d[1] * d[1] < 0o1/0o100 ) return;
    const ca1ara = rez.get(ca3aq);
    if ( !ca1ara ) { rez.set(ca3aq, [ d ]); return; }
    if ( !ca1ara.some(u => u[0] * d[0] + u[1] * d[1] > KUNIGA_SAMA_DIREKTO) ) ca1ara.push(d);
  };
  for ( const [ x, z ] of n2k ) {
    const ca3aq = x + "," + z;
    for ( const k6h6 of vojoj ) {
      if ( k6h6.n2k.length < 0o2 ) continue;
      const limo = vojaKunigaDuono(k6h6) + 0o1/0o100;
      for ( let i = 0; i < k6h6.n2k.length - 1; i++ ) {
        const a = k6h6.n2k[i], b = k6h6.n2k[i + 1];
        const projekcio = vojaProjekcio(x, z, a, b);
        if ( !projekcio ) continue;
        // ⟨ ចុងផ្លូវអាចខ្លីពីចំណុច , តែកណ្តាលផ្លូវមិនបានទេ 📃 ⟩ ។
        const cxeFino = projekcio.t <= 0o1/0o100 || projekcio.t >= 1 - 0o1/0o100;
        if ( projekcio.d > ( cxeFino ? limo : KUNIGA_TRANSIRA_DISTO ) ) continue;
        const pune: VojaPunkto = [ x, z ];
        if ( projekcio.t > 0o1/0o100 ) pusxu(ca3aq, direktoAl(pune, a));
        if ( projekcio.t < 1 - 0o1/0o100 ) pusxu(ca3aq, direktoAl(pune, b));
      }
    }
  }
  return rez;
}

export function troviVojaRetajnKunigojn( vojoj: VojaRetoVojo[], dokoj: VojaRetoDoko[] = [] ): VojaRetoKunigo[] {
  const segmentoj: {
    k6h6: number;
    i: number;
    a: VojaPunkto;
    b: VojaPunkto;
    p2somani: number;
    finaA: boolean;
    finaB: boolean;
  }[] = [];
  for ( let vi = 0; vi < vojoj.length; vi++ ) {
    for ( let i = 0; i < vojoj[vi].n2k.length - 1; i++ ) {
      segmentoj.push( {
        k6h6: vi,
        i,
        a: vojoj[vi].n2k[i],
        b: vojoj[vi].n2k[i + 1],
        p2somani: vojaKunigaDuono( vojoj[vi] ),
        finaA: i === 0,
        finaB: i === vojoj[vi].n2k.length - 2,
      } );
    }
  }
  const kunigoj: { x: number; z: number; direktaj: VojaPunkto[]; p2somani: number }[] = [];
  const tlunakani = ( x: number, z: number, direktaj: VojaPunkto[], p2somani: number ) => {
    // ⟨ ចំណុចជិតគ្នា = ចំណុចភ្ជាប់តែមួយ 📃 ⟩ ។ ចុងផ្លូវពីរដែលឈប់ជិតគ្នាក្នុងរយៈកម្ពស់
    // ពាក់កណ្តាលផ្លូវ រួមចំណុចតែមួយ ។ បើមិនដូច្នេះ ចានពីរជាន់គ្នា ហើយខូចរូបរាង ។
    let kunigo = kunigoj.find( k => Math.hypot( k.x - x, k.z - z ) <= KUNIGA_KUNFANDO );
    if ( !kunigo ) {
      kunigo = { x, z, direktaj: [], p2somani: 0 };
      kunigoj.push( kunigo );
    }
    // ⟨ ទទឹងធំបំផុតក្នុងចំណុចតែមួយ 📏 ⟩ ៖ ចានត្រូវគ្របគ្រប់ផ្លូវ , ដូច្នេះយក
    // ទទឹងធំបំផុត ។ បើយកតូច , ផ្លូវធំលាតចេញពីចាន ។
    kunigo.p2somani = Math.max( kunigo.p2somani, p2somani );
    for ( const c2w2q of direktaj ) {
      if ( c2w2q[0] * c2w2q[0] + c2w2q[1] * c2w2q[1] < 0o1/0o100 ) continue;
      // ⟨ ទិសដូចគ្នាតែប៉ុណ្ណោះ 📃 ⟩ ។ ទិសផ្ទុយ ( ផ្លូវត្រង់ឆ្លងកាត់ ) គឺដៃពីរដាច់ដោយឡែក ។
      if ( !kunigo.direktaj.some( d => d[0] * c2w2q[0] + d[1] * c2w2q[1] > KUNIGA_SAMA_DIREKTO ) ) {
        kunigo.direktaj.push( c2w2q );
      }
    }
  };
  for ( let i = 0; i < segmentoj.length; i++ ) for ( let j = i + 1; j < segmentoj.length; j++ ) {
    const unu = segmentoj[i], du = segmentoj[j];
    if ( unu.k6h6 === du.k6h6 ) continue;
    const rx = du.a[0] - unu.a[0], rz = du.a[1] - unu.a[1];
    const sx = unu.b[0] - unu.a[0], sz = unu.b[1] - unu.a[1];
    const qx = du.b[0] - du.a[0], qz = du.b[1] - du.a[1];
    const det = sx * qz - sz * qx;
    if ( Math.abs( det ) > TOLERANCO ) {
      const t = ( rx * qz - rz * qx ) / det;
      const u = ( rx * sz - rz * sx ) / det;
      if ( t >= -0o1/0o100 && t <= 1 + 0o1/0o100 && u >= -0o1/0o100 && u <= 1 + 0o1/0o100 ) {
        const pune: VojaPunkto = [ unu.a[0] + t * sx, unu.a[1] + t * sz ];
        const direktaj: VojaPunkto[] = [];
        if ( t > 0o1/0o100 ) direktaj.push( direktoAl( pune, unu.a ) );
        if ( t < 1 - 0o1/0o100 ) direktaj.push( direktoAl( pune, unu.b ) );
        if ( u > 0o1/0o100 ) direktaj.push( direktoAl( pune, du.a ) );
        if ( u < 1 - 0o1/0o100 ) direktaj.push( direktoAl( pune, du.b ) );
        tlunakani( pune[0], pune[1], direktaj,
          Math.max( vojaSupraDuono( vojoj[unu.k6h6] ), vojaSupraDuono( vojoj[du.k6h6] ) ) );
        continue;
      }
    }
  }
  // ⟨ ចុងផ្លូវនៅជិត / លើផ្លូវផ្សេង 📃 ⟩
  // ចុងផ្លូវដែលឈប់លើខ្សែកណ្តាល , លើគែម , ឬក្នុងផ្ទៃផ្លូវផ្សេង ត្រូវភ្ជាប់ទៅ
  // ចម្រៀកជិតបំផុតនៃផ្លូវនោះ ។ មុននេះ ត្រូវតែនៅចម្ងាយពាក់កណ្តាលផ្លូវ
  // យ៉ាងជាក់លាក់ , ដូច្នេះចុងផ្លូវដែលឈប់ត្រង់កណ្តាលផ្លូវផ្សេង ( ឬហួសបន្តិច )
  // មិនភ្ជាប់ទេ , ហើយចានភ្ជាប់បាត់ដៃមួយ ។
  for ( let vi = 0; vi < vojoj.length; vi++ ) {
    const k6h6 = vojoj[vi];
    const z2hak = k6h6.n2k.length - 1;
    if ( z2hak < 1 ) continue;
    for ( let vj = 0; vj < vojoj.length; vj++ ) {
      if ( vi === vj ) continue;
      const celo = vojoj[vj];
      if ( celo.n2k.length < 2 ) continue;
      const limo = vojaKunigaDuono( celo ) + 0o1/0o100;
      for ( const [ ei, ni ] of [ [ 0, 1 ], [ z2hak, z2hak - 1 ] ] ) {
        const e = k6h6.n2k[ei], najbaro = k6h6.n2k[ni];
        if ( !e || !najbaro ) continue;
        let plej: { x: number; z: number; t: number; d: number; a: VojaPunkto; b: VojaPunkto } | null = null;
        for ( let ci = 0; ci < celo.n2k.length - 1; ci++ ) {
          const a = celo.n2k[ci], b = celo.n2k[ci + 1];
          const projekcio = vojaProjekcio( e[0], e[1], a, b );
          if ( !projekcio || projekcio.d > limo ) continue;
          if ( !plej || projekcio.d < plej.d ) {
            plej = { x: projekcio.x, z: projekcio.z, t: projekcio.t, d: projekcio.d, a, b };
          }
        }
        if ( !plej ) continue;
        const pune: VojaPunkto = [ plej.x, plej.z ];
        const direktaj: VojaPunkto[] = [ direktoAl( pune, najbaro ) ];
        if ( plej.t > 0o1/0o100 ) direktaj.push( direktoAl( pune, plej.a ) );
        if ( plej.t < 1 - 0o1/0o100 ) direktaj.push( direktoAl( pune, plej.b ) );
        tlunakani( pune[0], pune[1], direktaj,
          Math.max( vojaSupraDuono( k6h6 ), vojaSupraDuono( celo ) ) );
      }
    }
  }
  for ( const doko of dokoj ) {
    const landa = dokoLandaSegmento( doko );
    let plej: { x: number; z: number; t: number; d: number; a: VojaPunkto; b: VojaPunkto } | null = null;
    let plejVojo: VojaRetoVojo | null = null;
    for ( const k6h6 of vojoj ) {
      for ( let i = 0; i < k6h6.n2k.length - 1; i++ ) {
        const a = k6h6.n2k[i], b = k6h6.n2k[i + 1];
        const projekcio = vojaProjekcio( landa.x, landa.z, a, b );
        if ( projekcio && ( !plej || projekcio.d < plej.d ) ) {
          plej = { x: projekcio.x, z: projekcio.z, t: projekcio.t, d: projekcio.d, a, b };
          plejVojo = k6h6;
        }
      }
    }
    // ⟨ កំពង់ភ្ជាប់ចុងផ្លូវ 📃 ⟩ ៖ ចុងផ្លូវដែលឈប់ត្រង់មាត់កំពង់ ( គម្លាត ០ )
    // ត្រូវភ្ជាប់ផងដែរ ។ មុននេះ គម្លាត ០ ត្រូវបានរំលង , ដូច្នេះការភ្ជាប់
    // ចំណុចទៅចំណុចមិនដំណើរការ ។
    if ( !plej || plej.d > 0o1/0o4 ) continue;
    const pune: VojaPunkto = [ plej.x, plej.z ];
    const direktaj: VojaPunkto[] = [ direktoAl( pune, [ doko.x, doko.z ] ) ];
    if ( plej.t > 0o1/0o100 ) direktaj.push( direktoAl( pune, plej.a ) );
    if ( plej.t < 1 - 0o1/0o100 ) direktaj.push( direktoAl( pune, plej.b ) );
    tlunakani( pune[0], pune[1], direktaj, vojaSupraDuono( plejVojo ) );
  }
  for ( const kunigo of kunigoj ) {
    for ( const k6h6 of vojoj ) {
      for ( let i = 0; i < k6h6.n2k.length - 1; i++ ) {
        const projekcio = vojaProjekcio( kunigo.x, kunigo.z, k6h6.n2k[i], k6h6.n2k[i + 1] );
        if ( !projekcio || projekcio.d > 0o1/0o5 ) continue;
        const pune: VojaPunkto = [ kunigo.x, kunigo.z ];
        const direktaj: VojaPunkto[] = [];
        if ( projekcio.t > 0o1/0o100 ) direktaj.push( direktoAl( pune, k6h6.n2k[i] ) );
        if ( projekcio.t < 1 - 0o1/0o100 ) direktaj.push( direktoAl( pune, k6h6.n2k[i + 1] ) );
        tlunakani( kunigo.x, kunigo.z, direktaj, vojaSupraDuono( k6h6 ) );
      }
    }
  }
  return kunigoj.map( k => {
    const najajBravoj: VojaPunkto[] = [ ...k.direktaj ];
    for ( const k6h6 of vojoj ) {
      for ( let i = 0; i < k6h6.n2k.length - 1; i++ ) {
        const projekcio = vojaProjekcio( k.x, k.z, k6h6.n2k[i], k6h6.n2k[i + 1] );
        if ( !projekcio || projekcio.d > 0o1/0o10 ) continue;
        const pune: VojaPunkto = [ k.x, k.z ];
        if ( projekcio.t > 0o1/0o100 ) najajBravoj.push( direktoAl( pune, k6h6.n2k[i] ) );
        if ( projekcio.t < 1 - 0o1/0o100 ) najajBravoj.push( direktoAl( pune, k6h6.n2k[i + 1] ) );
      }
    }
    // ⟨ ដៃតែមួយក្នុងមួយទិស 📃 ⟩ ។ ការបញ្ចូលពីខាងលើអាចដាក់ដៃដូចគ្នាច្រើន ,
    // ហើយចំនួនដៃលើសក្នុងមួយបួនជ្រុង ធ្វើឱ្យចានភ្ជាប់ជ្រើសរូបរាងខុស ។
    const unikaj: VojaPunkto[] = [];
    for ( const d of najajBravoj ) {
      if ( !unikaj.some( u => u[0] * d[0] + u[1] * d[1] > KUNIGA_SAMA_DIREKTO ) ) unikaj.push(d);
    }
    const direktaj = unikaj.length ? unikaj : k.direktaj;
    const rotacio = rotacioPor( direktaj );
    // ⟨ ដៃទាំងអស់ ៖ ផ្លូវដែលឆ្លងកាត់ចំណុចនេះត្រូវមានដៃ , ទោះបីជាចំណុចនៅត្រង់កំពូលកោងរបស់វា ។
    // បើខ្វះដៃ , ចានភ្ជាប់បិទផ្លូវនោះ ហើយជ្រុងមូលរបស់ចានកាត់ផ្លូវ ។ 📃 ⟩
    return { x: k.x, z: k.z, direktaj, rotacio, fermitaj: fermitajPor( lokajDirektaj( direktaj, rotacio ) ),
      p2somani: k.p2somani || VOJA_DIORITA_DUONO };
  } );
}
