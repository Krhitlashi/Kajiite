// ≺⧼ បណ្តាញផ្លូវ ការភ្ជាប់ 🛣️ ⧽≻
// ⟨ តម្រឹមដៃដែលឆ្លងកាត់ 📃 ⟩
import type { VojaPunkto, VojaRetoDoko, VojaRetoKunigo, VojaRetoVojo } from "./tipoj.js";
import { TOLERANCO } from "./tipoj.js";
import { vojaKunigaDuono, vojaProjekcio } from "./geometrio.js";
import { dokoLandaSegmento } from "./kunfandoj.js";

function rotacioPor( direktaj: VojaPunkto[] ): number {
  if ( !direktaj.length ) return 0;
  const anguloj: number[] = [];
  for ( const d of direktaj ) anguloj.push( Math.atan2( d[1], d[0] ), Math.atan2( d[1], d[0] ) + Math.PI / 2 );
  const aksaToleranco = 0o1/0o40;
  let plejbona = 0, plejalta = -Infinity, plejAlineitaj = -1;
  for ( const angulo of anguloj ) {
    const kos = Math.cos( angulo ), sin = Math.sin( angulo );
    let poento = 0, alineitaj = 0;
    for ( const d of direktaj ) {
      const x = kos * d[0] + sin * d[1];
      const z = -sin * d[0] + kos * d[1];
      poento += Math.abs( x ) + Math.abs( z );
      if ( Math.abs( x ) < aksaToleranco || Math.abs( z ) < aksaToleranco ) alineitaj++;
    }
    if ( alineitaj > plejAlineitaj
      || ( alineitaj === plejAlineitaj && poento > plejalta + 0o1/0o1000 ) ) {
      plejAlineitaj = alineitaj;
      plejalta = poento;
      plejbona = angulo;
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

function direktoAl( pune: VojaPunkto, direkto: VojaPunkto ): VojaPunkto {
  const dx = direkto[0] - pune[0], dz = direkto[1] - pune[1];
  const longo = Math.hypot( dx, dz );
  return longo < TOLERANCO ? [ 0, 0 ] : [ dx / longo, dz / longo ];
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

export function troviVojaRetajnKunigojn( vojoj: VojaRetoVojo[], dokoj: VojaRetoDoko[] = [] ): VojaRetoKunigo[] {
  const segmentoj: {
    vojo: number;
    i: number;
    a: VojaPunkto;
    b: VojaPunkto;
    duono: number;
    finaA: boolean;
    finaB: boolean;
  }[] = [];
  for ( let vi = 0; vi < vojoj.length; vi++ ) {
    for ( let i = 0; i < vojoj[vi].punktoj.length - 1; i++ ) {
      segmentoj.push( {
        vojo: vi,
        i,
        a: vojoj[vi].punktoj[i],
        b: vojoj[vi].punktoj[i + 1],
        duono: vojaKunigaDuono( vojoj[vi] ),
        finaA: i === 0,
        finaB: i === vojoj[vi].punktoj.length - 2,
      } );
    }
  }
  const kunigoj: { x: number; z: number; direktaj: VojaPunkto[] }[] = [];
  const aldoni = ( x: number, z: number, direktaj: VojaPunkto[] ) => {
    // ⟨ ចំណុចជិតគ្នា = ចំណុចភ្ជាប់តែមួយ 📃 ⟩ ។ ចុងផ្លូវពីរដែលឈប់ជិតគ្នាក្នុងរយៈកម្ពស់
    // ពាក់កណ្តាលផ្លូវ រួមចំណុចតែមួយ ។ បើមិនដូច្នេះ ចានពីរជាន់គ្នា ហើយខូចរូបរាង ។
    let kunigo = kunigoj.find( k => Math.hypot( k.x - x, k.z - z ) <= KUNIGA_KUNFANDO );
    if ( !kunigo ) {
      kunigo = { x, z, direktaj: [] };
      kunigoj.push( kunigo );
    }
    for ( const direkto of direktaj ) {
      if ( direkto[0] * direkto[0] + direkto[1] * direkto[1] < 0o1/0o100 ) continue;
      // ⟨ ទិសដូចគ្នាតែប៉ុណ្ណោះ 📃 ⟩ ។ ទិសផ្ទុយ ( ផ្លូវត្រង់ឆ្លងកាត់ ) គឺដៃពីរដាច់ដោយឡែក ។
      if ( !kunigo.direktaj.some( d => d[0] * direkto[0] + d[1] * direkto[1] > KUNIGA_SAMA_DIREKTO ) ) {
        kunigo.direktaj.push( direkto );
      }
    }
  };
  for ( let i = 0; i < segmentoj.length; i++ ) for ( let j = i + 1; j < segmentoj.length; j++ ) {
    const unu = segmentoj[i], du = segmentoj[j];
    if ( unu.vojo === du.vojo ) continue;
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
        aldoni( pune[0], pune[1], direktaj );
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
    const vojo = vojoj[vi];
    const lasta = vojo.punktoj.length - 1;
    if ( lasta < 1 ) continue;
    for ( let vj = 0; vj < vojoj.length; vj++ ) {
      if ( vi === vj ) continue;
      const celo = vojoj[vj];
      if ( celo.punktoj.length < 2 ) continue;
      const limo = vojaKunigaDuono( celo ) + 0o1/0o100;
      for ( const [ ei, ni ] of [ [ 0, 1 ], [ lasta, lasta - 1 ] ] ) {
        const e = vojo.punktoj[ei], najbaro = vojo.punktoj[ni];
        if ( !e || !najbaro ) continue;
        let plej: { x: number; z: number; t: number; d: number; a: VojaPunkto; b: VojaPunkto } | null = null;
        for ( let ci = 0; ci < celo.punktoj.length - 1; ci++ ) {
          const a = celo.punktoj[ci], b = celo.punktoj[ci + 1];
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
        aldoni( pune[0], pune[1], direktaj );
      }
    }
  }
  for ( const doko of dokoj ) {
    const landa = dokoLandaSegmento( doko );
    let plej: { x: number; z: number; t: number; d: number; a: VojaPunkto; b: VojaPunkto } | null = null;
    for ( const vojo of vojoj ) {
      for ( let i = 0; i < vojo.punktoj.length - 1; i++ ) {
        const a = vojo.punktoj[i], b = vojo.punktoj[i + 1];
        const projekcio = vojaProjekcio( landa.x, landa.z, a, b );
        if ( projekcio && ( !plej || projekcio.d < plej.d ) ) {
          plej = { x: projekcio.x, z: projekcio.z, t: projekcio.t, d: projekcio.d, a, b };
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
    aldoni( pune[0], pune[1], direktaj );
  }
  for ( const kunigo of kunigoj ) {
    for ( const vojo of vojoj ) {
      for ( let i = 0; i < vojo.punktoj.length - 1; i++ ) {
        const projekcio = vojaProjekcio( kunigo.x, kunigo.z, vojo.punktoj[i], vojo.punktoj[i + 1] );
        if ( !projekcio || projekcio.d > 0o1/0o5 ) continue;
        const pune: VojaPunkto = [ kunigo.x, kunigo.z ];
        const direktaj: VojaPunkto[] = [];
        if ( projekcio.t > 0o1/0o100 ) direktaj.push( direktoAl( pune, vojo.punktoj[i] ) );
        if ( projekcio.t < 1 - 0o1/0o100 ) direktaj.push( direktoAl( pune, vojo.punktoj[i + 1] ) );
        aldoni( kunigo.x, kunigo.z, direktaj );
      }
    }
  }
  return kunigoj.map( k => {
    const najajBravoj: VojaPunkto[] = [ ...k.direktaj ];
    for ( const vojo of vojoj ) {
      for ( let i = 0; i < vojo.punktoj.length - 1; i++ ) {
        const projekcio = vojaProjekcio( k.x, k.z, vojo.punktoj[i], vojo.punktoj[i + 1] );
        if ( !projekcio || projekcio.d > 0o1/0o10 ) continue;
        const pune: VojaPunkto = [ k.x, k.z ];
        if ( projekcio.t > 0o1/0o100 ) najajBravoj.push( direktoAl( pune, vojo.punktoj[i] ) );
        if ( projekcio.t < 1 - 0o1/0o100 ) najajBravoj.push( direktoAl( pune, vojo.punktoj[i + 1] ) );
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
    return { x: k.x, z: k.z, direktaj, rotacio, fermitaj: fermitajPor( lokajDirektaj( direktaj, rotacio ) ) };
  } );
}
