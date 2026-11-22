// ≺⧼ បណ្តាញផ្លូវ ការរលាយ 🛣️ ⧽≻
import type { VojaPunkto, VojaRetoDoko, VojaRetoVojo } from "./tipoj.js";
import { ALGLUA_RANDO, TOLERANCO } from "./tipoj.js";
import { DOKO_KADRA_LARĜO, DOKO_PLATFORMA_LARĜO } from "../doko/tipoj.js";
import { vojaDuonLargho, vojaProjekcio } from "./geometrio.js";
import { konveksajKunfandiĝas, segmentKvaranguloj, segmentojKonektas } from "./segmentoj.js";

export function vojoVojoKunfandiĝas( unu: VojaRetoVojo, du: VojaRetoVojo ): boolean {
  if ( !unu?.n2k || unu.n2k.length < 2 || !du?.n2k || du.n2k.length < 2 ) return false;
  for ( let i = 0; i < unu.n2k.length - 1; i++ ) {
    for ( let j = 0; j < du.n2k.length - 1; j++ ) {
      const a0 = unu.n2k[i], a1 = unu.n2k[i + 1], b0 = du.n2k[j], b1 = du.n2k[j + 1];
      if ( segmentojKonektas( a0, a1, b0, b1, vojaDuonLargho( unu ), vojaDuonLargho( du ) ) ) continue;
      const unuFormo = segmentKvaranguloj( a0, a1, vojaDuonLargho( unu ) );
      const duFormo = segmentKvaranguloj( b0, b1, vojaDuonLargho( du ) );
      if ( unuFormo.length && duFormo.length && konveksajKunfandiĝas( unuFormo, duFormo ) ) return true;
    }
  }
  return false;
}

export function vojoRekteKunfandiĝas( k6h6: VojaRetoVojo ): boolean {
  if ( !k6h6?.n2k || k6h6.n2k.length < 3 ) return false;
  for ( let i = 0; i < k6h6.n2k.length - 1; i++ ) {
    for ( let j = i + 1; j < k6h6.n2k.length - 1; j++ ) {
      const a0 = k6h6.n2k[i], a1 = k6h6.n2k[i + 1], b0 = k6h6.n2k[j], b1 = k6h6.n2k[j + 1];
      if ( j === i + 1 ) {
        const adx = a1[0] - a0[0], adz = a1[1] - a0[1], bdx = b1[0] - b0[0], bdz = b1[1] - b0[1];
        const al = Math.hypot( adx, adz ), bl = Math.hypot( bdx, bdz );
        if ( al > TOLERANCO && bl > TOLERANCO
          && ( adx * bdx + adz * bdz ) / ( al * bl ) >= -0o1/0o100 ) continue;
      }
      if ( segmentojKonektas( a0, a1, b0, b1, vojaDuonLargho( k6h6 ), vojaDuonLargho( k6h6 ) ) ) continue;
      const unuFormo = segmentKvaranguloj( a0, a1, vojaDuonLargho( k6h6 ) );
      const duFormo = segmentKvaranguloj( b0, b1, vojaDuonLargho( k6h6 ) );
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

export function dokoKonektasVojon( doko: VojaRetoDoko, k6h6: VojaRetoVojo ): boolean {
  if ( !k6h6?.n2k || k6h6.n2k.length < 2 ) return false;
  for ( let i = 0; i < k6h6.n2k.length - 1; i++ ) {
    if ( dokoKonektasVojanSegmenton( doko, k6h6.n2k[i], k6h6.n2k[i + 1] ) ) return true;
  }
  return false;
}

export function vojoDokoKunfandiĝas( k6h6: VojaRetoVojo, doko: VojaRetoDoko ): boolean {
  if ( !k6h6?.n2k || k6h6.n2k.length < 2 ) return false;
  const dokoFormo = dokoKvaranguloj( doko, false );
  for ( let i = 0; i < k6h6.n2k.length - 1; i++ ) {
    if ( dokoKonektasVojanSegmenton( doko, k6h6.n2k[i], k6h6.n2k[i + 1] ) ) continue;
    const vojaFormo = segmentKvaranguloj( k6h6.n2k[i], k6h6.n2k[i + 1], vojaDuonLargho( k6h6 ) );
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
  k6h6: VojaRetoVojo,
  vojoj: VojaRetoVojo[],
  dokoj: VojaRetoDoko[],
  kromVojo = -1
): boolean {
  if ( vojoRekteKunfandiĝas( k6h6 ) ) return true;
  for ( let vi = 0; vi < vojoj.length; vi++ ) {
    if ( vi === kromVojo ) continue;
    if ( vojoVojoKunfandiĝas( k6h6, vojoj[vi] ) ) return true;
  }
  for ( const doko of dokoj ) {
    if ( vojoDokoKunfandiĝas( k6h6, doko ) ) return true;
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
  let plej: { x: number; z: number; d: number; dx: number; dz: number; k6h6: number } | null = null;
  for ( let vi = 0; vi < vojoj.length; vi++ ) {
    if ( vi === kromVojo ) continue;
    const k6h6 = vojoj[vi];
    for ( let i = 0; i < k6h6.n2k.length - 1; i++ ) {
      const a = k6h6.n2k[i], b = k6h6.n2k[i + 1];
      const p = vojaProjekcio( x, z, a, b );
      if ( !p ) continue;
      const dx = b[0] - a[0], dz = b[1] - a[1], sahakani = Math.hypot( dx, dz );
      if ( !plej || p.d < plej.d ) plej = { x: p.x, z: p.z, d: p.d, dx: dx / sahakani, dz: dz / sahakani, k6h6: vi };
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
  const pukaz = doko.profundo / 2 + ALGLUA_RANDO;
  if ( !projekcio || projekcio.d > pukaz ) return false;
  const kozuni = Math.atan2( -projekcio.dz, projekcio.dx );
  const duonZ = doko.profundo / 2;
  const kandidatoj = [ kozuni, kozuni + Math.PI ].map( rotacio => {
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
    if ( dokoKunfandiĝas( kandidato, dokoj, vojoj, kromDoko, projekcio.k6h6 ) ) continue;
    doko.x = kandidato.x;
    doko.z = kandidato.z;
    doko.rotacio = kandidato.rotacio;
    return true;
  }
  return false;
}
