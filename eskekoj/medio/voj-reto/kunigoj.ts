// ≺⧼ Voja reto — kunigoj 🛣️ ⧽≻
// La kunigoj de la reto — la turno de la kuniga plato, la fermitaj
// flankoj kaj la tuta serĉo de la kunigoj ( troviVojaRetajnKunigojn ).
// rotacioPor — La turno de la kuniga plato. La plato konstruiĝas en LOKA kadro
// ( la kvadranto-logiko de konstruiIntersekcajnPlatojn supozas ke la brakoj
// kuŝas sur la aksoj ), do ni elektas la turnon kiu plej bone alineas la brakojn
// al la aksoj. ⟨ Aliniu la TRAPASANTAJN brakojn 📃 ⟩ — antaŭe la poento nur
// sumis |x| + |z|, kaj ĉe malperpendikulara T-kunigo ( ekz. la avenuo renkontas
// la kajon je ~11° ) tio alineis la UNUOPAN finiĝantan brakon kaj lasis la
// trapasantan paron oblique — la rekta andezita bordo de la trapasanta vojo tiam
// misalignis kun la kurbo de la plato kaj ŝajnis traliki. Nun la PRIMA poento
// estas kiom da brakoj kuŝas sur akso ( la trapasanta paro donas du, la
// finiĝanta brako unu ), do la plato alineas la trapasantan vojon kaj la
// finiĝanta brako restas malantaŭ la kurbo. La malnova poento restas kiel
// egaliga kriterio.
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
    let kunigo = kunigoj.find( k => Math.hypot( k.x - x, k.z - z ) < 0o1/0o100 );
    if ( !kunigo ) {
      kunigo = { x, z, direktaj: [] };
      kunigoj.push( kunigo );
    }
    for ( const direkto of direktaj ) {
      if ( direkto[0] * direkto[0] + direkto[1] * direkto[1] < 0o1/0o100 ) continue;
      if ( !kunigo.direktaj.some( d => Math.abs( d[0] * direkto[0] + d[1] * direkto[1] ) > 0o1/0o1 ) ) {
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
    let kunigis = false;
    const kontroluFinojn = (
      finaA: boolean,
      finaB: boolean,
      venonta: typeof unu,
      celo: typeof du,
      celoVojo: number
    ) => {
      if ( kunigis ) return;
      const paroj: [ VojaPunkto, VojaPunkto, boolean ][] = [
        [ venonta.a, venonta.b, finaA ],
        [ venonta.b, venonta.a, finaB ],
      ];
      for ( const [ e, najbaro, estasFino ] of paroj ) {
        if ( !estasFino ) continue;
        const projekcio = vojaProjekcio( e[0], e[1], celo.a, celo.b );
        if ( !projekcio || Math.abs( projekcio.d - vojaKunigaDuono( vojoj[celoVojo] ) ) > 0o1/0o10 ) continue;
        const pune: VojaPunkto = [ projekcio.x, projekcio.z ];
        const direktaj: VojaPunkto[] = [ direktoAl( pune, najbaro ) ];
        if ( projekcio.t > 0o1/0o100 ) direktaj.push( direktoAl( pune, celo.a ) );
        if ( projekcio.t < 1 - 0o1/0o100 ) direktaj.push( direktoAl( pune, celo.b ) );
        aldoni( pune[0], pune[1], direktaj );
        kunigis = true;
        return;
      }
    };
    kontroluFinojn( unu.finaA, unu.finaB, unu, du, du.vojo );
    kontroluFinojn( du.finaA, du.finaB, du, unu, unu.vojo );
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
    if ( !plej || plej.d > 0o1/0o10 ) continue;
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
    const direktaj = najajBravoj.length ? najajBravoj : k.direktaj;
    const rotacio = rotacioPor( direktaj );
    return { x: k.x, z: k.z, direktaj: k.direktaj, rotacio, fermitaj: fermitajPor( lokajDirektaj( direktaj, rotacio ) ) };
  } );
}
