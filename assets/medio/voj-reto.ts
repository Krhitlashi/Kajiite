// ≺⧼ Voja reto 🛣️ ⧽≻
// La kunligita reto de la urbaj vojoj kaj la dokaj platformoj.

import { VOJA_BORDA_LARĜO, VOJA_EKSTERA_DUONO } from "./vojoj.js";
import { DOKO_KADRA_LARĜO, DOKO_PLATFORMA_LARĜO } from "./doko.js";

export { DOKO_KADRA_LARĜO, DOKO_PLATFORMA_LARĜO };

export type VojaPunkto = [ number, number ];

export interface VojaRetoVojo {
  punktoj: VojaPunkto[];
  larĝo?: number;
}

export interface VojaRetoDoko {
  x: number;
  z: number;
  profundo: number;
  rotacio?: number;
}

export interface VojaRetoKunigo {
  x: number;
  z: number;
  direktaj: VojaPunkto[];
  rotacio: number;
  fermitaj: [ number, number ];
}

const TOLERANCO = 0o1/0o1000;
const ALGLUA_RANDO = 0o5/0o2;

export function vojaDuonLargho( vojo: VojaRetoVojo ): number {
  return ( vojo?.larĝo || 0o7/0o2 ) / 4 + VOJA_BORDA_LARĜO;
}

export function vojaKunigaDuono( vojo: VojaRetoVojo ): number {
  return Math.max( VOJA_EKSTERA_DUONO, vojaDuonLargho( vojo ) );
}

export function pontoDuonLargho( vojo: VojaRetoVojo ): number {
  return ( vojo?.larĝo || 0o7/0o2 ) / 4 + VOJA_BORDA_LARĜO;
}

export function vojaProjekcio(
  x: number,
  z: number,
  a: VojaPunkto,
  b: VojaPunkto
): { x: number; z: number; t: number; d: number } | null {
  const dx = b[0] - a[0], dz = b[1] - a[1];
  const kvadrato = dx * dx + dz * dz;
  if ( kvadrato < TOLERANCO ) return null;
  const t = Math.max( 0, Math.min( 1, ( ( x - a[0] ) * dx + ( z - a[1] ) * dz ) / kvadrato ) );
  const px = a[0] + t * dx, pz = a[1] + t * dz;
  return { x: px, z: pz, t, d: Math.hypot( px - x, pz - z ) };
}

function segmentKvaranguloj( a: VojaPunkto, b: VojaPunkto, duono: number ): VojaPunkto[] {
  const dx = b[0] - a[0], dz = b[1] - a[1];
  const longo = Math.hypot( dx, dz );
  if ( longo < TOLERANCO ) return [];
  const nx = -dz / longo * duono, nz = dx / longo * duono;
  return [
    [ a[0] + nx, a[1] + nz ],
    [ b[0] + nx, b[1] + nz ],
    [ b[0] - nx, b[1] - nz ],
    [ a[0] - nx, a[1] - nz ],
  ];
}

function konveksajKunfandiĝas( unu: VojaPunkto[], du: VojaPunkto[] ): boolean {
  for ( const kvarangulo of [ unu, du ] ) {
    for ( let i = 0; i < kvarangulo.length; i++ ) {
      const a = kvarangulo[i], b = kvarangulo[( i + 1 ) % kvarangulo.length];
      const ax = -( b[1] - a[1] ), az = b[0] - a[0];
      const longo = Math.hypot( ax, az );
      if ( longo < TOLERANCO ) continue;
      let unuMin = Infinity, unuMax = -Infinity, duMin = Infinity, duMax = -Infinity;
      for ( const p of unu ) {
        const valoro = ( p[0] * ax + p[1] * az ) / longo;
        unuMin = Math.min( unuMin, valoro );
        unuMax = Math.max( unuMax, valoro );
      }
      for ( const p of du ) {
        const valoro = ( p[0] * ax + p[1] * az ) / longo;
        duMin = Math.min( duMin, valoro );
        duMax = Math.max( duMax, valoro );
      }
      if ( unuMax <= duMin + TOLERANCO || duMax <= unuMin + TOLERANCO ) return false;
    }
  }
  return true;
}

export function segmentojKonektas(
  a0: VojaPunkto,
  a1: VojaPunkto,
  b0: VojaPunkto,
  b1: VojaPunkto,
  duonoA: number,
  duonoB: number
): boolean {
  const rx = b0[0] - a0[0], rz = b0[1] - a0[1];
  const sx = a1[0] - a0[0], sz = a1[1] - a0[1];
  const qx = b1[0] - b0[0], qz = b1[1] - b0[1];
  const det = sx * qz - sz * qx;
  if ( Math.abs( det ) <= TOLERANCO ) {
    if ( Math.abs( rx * sz - rz * sx ) > TOLERANCO ) return false;
    const kvadrato = qx * qx + qz * qz;
    const t0 = ( a0[0] - b0[0] ) * qx + ( a0[1] - b0[1] ) * qz;
    const t1 = ( a1[0] - b0[0] ) * qx + ( a1[1] - b0[1] ) * qz;
    const malproksima = Math.max( 0, Math.min( t0, t1 ) ) - Math.min( kvadrato, Math.max( t0, t1 ) );
    return Math.abs( malproksima ) <= TOLERANCO && kvadrato > TOLERANCO;
  }
  const t = ( rx * qz - rz * qx ) / det;
  const u = ( rx * sz - rz * sx ) / det;
  if ( t >= -0o1/0o100 && t <= 1 + 0o1/0o100 && u >= -0o1/0o100 && u <= 1 + 0o1/0o100 ) return true;
  const rando = Math.max( duonoA, duonoB ) + 0o1/0o10;
  for ( const p of [ a0, a1 ] ) {
    const projekcio = vojaProjekcio( p[0], p[1], b0, b1 );
    if ( projekcio && projekcio.d <= rando ) return true;
  }
  for ( const p of [ b0, b1 ] ) {
    const projekcio = vojaProjekcio( p[0], p[1], a0, a1 );
    if ( projekcio && projekcio.d <= rando ) return true;
  }
  return false;
}

export function vojoVojoKunfandiĝas( unu: VojaRetoVojo, du: VojaRetoVojo ): boolean {
  if ( !unu?.punktoj || unu.punktoj.length < 2 || !du?.punktoj || du.punktoj.length < 2 ) return false;
  for ( let i = 0; i < unu.punktoj.length - 1; i++ ) {
    for ( let j = 0; j < du.punktoj.length - 1; j++ ) {
      const a0 = unu.punktoj[i], a1 = unu.punktoj[i + 1], b0 = du.punktoj[j], b1 = du.punktoj[j + 1];
      if ( segmentojKonektas( a0, a1, b0, b1, vojaDuonLargho( unu ), vojaDuonLargho( du ) ) ) continue;
      const unuFormo = segmentKvaranguloj( a0, a1, vojaDuonLargho( unu ) );
      const duFormo = segmentKvaranguloj( b0, b1, vojaDuonLargho( du ) );
      if ( unuFormo.length && duFormo.length && konveksajKunfandiĝas( unuFormo, duFormo ) ) return true;
    }
  }
  return false;
}

export function vojoRekteKunfandiĝas( vojo: VojaRetoVojo ): boolean {
  if ( !vojo?.punktoj || vojo.punktoj.length < 3 ) return false;
  for ( let i = 0; i < vojo.punktoj.length - 1; i++ ) {
    for ( let j = i + 1; j < vojo.punktoj.length - 1; j++ ) {
      const a0 = vojo.punktoj[i], a1 = vojo.punktoj[i + 1], b0 = vojo.punktoj[j], b1 = vojo.punktoj[j + 1];
      if ( j === i + 1 ) {
        const adx = a1[0] - a0[0], adz = a1[1] - a0[1], bdx = b1[0] - b0[0], bdz = b1[1] - b0[1];
        const al = Math.hypot( adx, adz ), bl = Math.hypot( bdx, bdz );
        if ( al > TOLERANCO && bl > TOLERANCO
          && ( adx * bdx + adz * bdz ) / ( al * bl ) >= -0o1/0o100 ) continue;
      }
      if ( segmentojKonektas( a0, a1, b0, b1, vojaDuonLargho( vojo ), vojaDuonLargho( vojo ) ) ) continue;
      const unuFormo = segmentKvaranguloj( a0, a1, vojaDuonLargho( vojo ) );
      const duFormo = segmentKvaranguloj( b0, b1, vojaDuonLargho( vojo ) );
      if ( unuFormo.length && duFormo.length && konveksajKunfandiĝas( unuFormo, duFormo ) ) return true;
    }
  }
  return false;
}

export function dokoKvaranguloj( doko: VojaRetoDoko, kunKadra = true ): VojaPunkto[] {
  const rotacio = doko.rotacio ?? 0;
  const kos = Math.cos( rotacio ), sin = Math.sin( rotacio );
  const duonX = DOKO_PLATFORMA_LARĜO / 2 + ( kunKadra ? DOKO_KADRA_LARĜO : 0 );
  const duonZ = doko.profundo / 2 + ( kunKadra ? DOKO_KADRA_LARĜO : 0 );
  return [
    [ -duonX, -duonZ ],
    [ duonX, -duonZ ],
    [ duonX, duonZ ],
    [ -duonX, duonZ ],
  ].map( p => [ doko.x + kos * p[0] + sin * p[1], doko.z - sin * p[0] + kos * p[1] ] as VojaPunkto );
}

export function dokoLandaSegmento( doko: VojaRetoDoko ) {
  const rotacio = doko.rotacio ?? 0;
  const duonZ = doko.profundo / 2;
  return {
    x: doko.x + Math.sin( rotacio ) * duonZ,
    z: doko.z + Math.cos( rotacio ) * duonZ,
    dx: Math.cos( rotacio ),
    dz: -Math.sin( rotacio ),
  };
}

export function dokoKonektasVojanSegmenton(
  doko: VojaRetoDoko,
  a: VojaPunkto,
  b: VojaPunkto
): boolean {
  const landa = dokoLandaSegmento( doko );
  const duonL = DOKO_PLATFORMA_LARĜO / 2;
  const landaA: VojaPunkto = [ landa.x - landa.dx * duonL, landa.z - landa.dz * duonL ];
  const landaB: VojaPunkto = [ landa.x + landa.dx * duonL, landa.z + landa.dz * duonL ];
  const projekcio = vojaProjekcio( landa.x, landa.z, a, b );
  if ( projekcio && projekcio.d <= 0o1/0o10 ) return true;
  for ( const p of [ a, b ] ) {
    const surLando = vojaProjekcio( p[0], p[1], landaA, landaB );
    if ( surLando && surLando.d <= 0o1/0o10 ) return true;
  }
  return false;
}

export function dokoKonektasVojon( doko: VojaRetoDoko, vojo: VojaRetoVojo ): boolean {
  if ( !vojo?.punktoj || vojo.punktoj.length < 2 ) return false;
  for ( let i = 0; i < vojo.punktoj.length - 1; i++ ) {
    if ( dokoKonektasVojanSegmenton( doko, vojo.punktoj[i], vojo.punktoj[i + 1] ) ) return true;
  }
  return false;
}

export function vojoDokoKunfandiĝas( vojo: VojaRetoVojo, doko: VojaRetoDoko ): boolean {
  if ( !vojo?.punktoj || vojo.punktoj.length < 2 ) return false;
  const dokoFormo = dokoKvaranguloj( doko, false );
  for ( let i = 0; i < vojo.punktoj.length - 1; i++ ) {
    if ( dokoKonektasVojanSegmenton( doko, vojo.punktoj[i], vojo.punktoj[i + 1] ) ) continue;
    const vojaFormo = segmentKvaranguloj( vojo.punktoj[i], vojo.punktoj[i + 1], vojaDuonLargho( vojo ) );
    if ( vojaFormo.length && konveksajKunfandiĝas( vojaFormo, dokoFormo ) ) return true;
  }
  return false;
}

export function dokoKunfandiĝas(
  doko: VojaRetoDoko,
  dokoj: VojaRetoDoko[],
  vojoj: VojaRetoVojo[],
  kromDoko = -1,
  kromVojo = -1
): boolean {
  const alia = dokoKvaranguloj( doko );
  for ( let di = 0; di < dokoj.length; di++ ) {
    if ( di === kromDoko ) continue;
    if ( konveksajKunfandiĝas( alia, dokoKvaranguloj( dokoj[di] ) ) ) return true;
  }
  for ( let vi = 0; vi < vojoj.length; vi++ ) {
    if ( vi === kromVojo ) continue;
    if ( vojoDokoKunfandiĝas( vojoj[vi], doko ) ) return true;
  }
  return false;
}

export function vojoKunfandiĝas(
  vojo: VojaRetoVojo,
  vojoj: VojaRetoVojo[],
  dokoj: VojaRetoDoko[],
  kromVojo = -1
): boolean {
  if ( vojoRekteKunfandiĝas( vojo ) ) return true;
  for ( let vi = 0; vi < vojoj.length; vi++ ) {
    if ( vi === kromVojo ) continue;
    if ( vojoVojoKunfandiĝas( vojo, vojoj[vi] ) ) return true;
  }
  for ( const doko of dokoj ) {
    if ( vojoDokoKunfandiĝas( vojo, doko ) ) return true;
  }
  return false;
}

export function vojajKunfandajxoj( vojoj: VojaRetoVojo[], dokoj: VojaRetoDoko[] ) {
  const detale = { vojoVojo: 0, vojoDoko: 0, dokoDoko: 0, totalo: 0 };
  for ( let vi = 0; vi < vojoj.length; vi++ ) {
    if ( vojoRekteKunfandiĝas( vojoj[vi] ) ) detale.vojoVojo++;
    for ( let aj = vi + 1; aj < vojoj.length; aj++ ) {
      if ( vojoVojoKunfandiĝas( vojoj[vi], vojoj[aj] ) ) detale.vojoVojo++;
    }
    for ( const doko of dokoj ) if ( vojoDokoKunfandiĝas( vojoj[vi], doko ) ) detale.vojoDoko++;
  }
  for ( let di = 0; di < dokoj.length; di++ ) for ( let aj = di + 1; aj < dokoj.length; aj++ ) {
    if ( konveksajKunfandiĝas( dokoKvaranguloj( dokoj[di] ), dokoKvaranguloj( dokoj[aj] ) ) ) detale.dokoDoko++;
  }
  detale.totalo = detale.vojoVojo + detale.vojoDoko + detale.dokoDoko;
  return detale;
}

export function plejProximaVojo(
  x: number,
  z: number,
  vojoj: VojaRetoVojo[],
  kromVojo = -1
) {
  let plej: { x: number; z: number; d: number; dx: number; dz: number; vojo: number } | null = null;
  for ( let vi = 0; vi < vojoj.length; vi++ ) {
    if ( vi === kromVojo ) continue;
    const vojo = vojoj[vi];
    for ( let i = 0; i < vojo.punktoj.length - 1; i++ ) {
      const a = vojo.punktoj[i], b = vojo.punktoj[i + 1];
      const p = vojaProjekcio( x, z, a, b );
      if ( !p ) continue;
      const dx = b[0] - a[0], dz = b[1] - a[1], longo = Math.hypot( dx, dz );
      if ( !plej || p.d < plej.d ) plej = { x: p.x, z: p.z, d: p.d, dx: dx / longo, dz: dz / longo, vojo: vi };
    }
  }
  return plej;
}

export function konektiDokonAlVojo(
  doko: VojaRetoDoko,
  vojoj: VojaRetoVojo[],
  dokoj: VojaRetoDoko[],
  kromDoko = -1,
  akvas?: ( x: number, z: number ) => boolean
): boolean {
  const projekcio = plejProximaVojo( doko.x, doko.z, vojoj );
  const rando = doko.profundo / 2 + ALGLUA_RANDO;
  if ( !projekcio || projekcio.d > rando ) return false;
  const bazo = Math.atan2( -projekcio.dz, projekcio.dx );
  const duonZ = doko.profundo / 2;
  const kandidatoj = [ bazo, bazo + Math.PI ].map( rotacio => {
const landoX = projekcio.x + Math.sin( rotacio ) * duonZ;
const landoZ = projekcio.z + Math.cos( rotacio ) * duonZ;
    const akvaPunktoX = projekcio.x - Math.sin( rotacio ) * doko.profundo;
    const akvaPunktoZ = projekcio.z - Math.cos( rotacio ) * doko.profundo;
    const ponto = akvas ? ( akvas( akvaPunktoX, akvaPunktoZ ) ? 2 : 0 ) + ( akvas( landoX, landoZ ) ? 0 : 1 ) : 0;
    return {
      ponto,
      doko: {
        ...doko,
        x: projekcio.x - Math.sin( rotacio ) * duonZ,
        z: projekcio.z - Math.cos( rotacio ) * duonZ,
        rotacio,
      },
    };
  } ).sort( ( a, b ) => b.ponto - a.ponto );
  for ( const { doko: kandidato } of kandidatoj ) {
    if ( dokoKunfandiĝas( kandidato, dokoj, vojoj, kromDoko, projekcio.vojo ) ) continue;
    doko.x = kandidato.x;
    doko.z = kandidato.z;
    doko.rotacio = kandidato.rotacio;
    return true;
  }
  return false;
}

function rotacioPor( direktaj: VojaPunkto[] ): number {
  if ( !direktaj.length ) return 0;
  const anguloj: number[] = [];
  for ( const d of direktaj ) anguloj.push( Math.atan2( d[1], d[0] ), Math.atan2( d[1], d[0] ) + Math.PI / 2 );
  let plejbona = 0, plejalta = -Infinity;
  for ( const angulo of anguloj ) {
    const kos = Math.cos( angulo ), sin = Math.sin( angulo );
    const poento = direktaj.reduce( ( sumo, d ) => {
      const x = kos * d[0] + sin * d[1];
      const z = -sin * d[0] + kos * d[1];
      return sumo + Math.abs( x ) + Math.abs( z );
    }, 0 );
    if ( poento > plejalta + 0o1/0o1000 ) {
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

