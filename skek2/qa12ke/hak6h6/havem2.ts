// ≺⧼ ſɭэ ֭ſɭэ ʌ ֭ſɭᴜ j͑ʃ'ɔ ŋᷠɹ 🛣️ ⧽≻

import { K6H6ATERAKLINO } from "./l6da.js";
import { tap2L6daJe, type Tap2Vem2 } from "./haqoxa.js";
import { rampaKuro, STUPAF2KKURO, STUPARISERO, subGrid, surGrid,
  K6H6ABURIL6DALERANCO, K6H6AKMARL6DA, K6H6ATRUAP2SOMANI } from "./havecax2l.js";

export const NIVELAPASO = STUPAF2KKURO;

export const NIVELAGLATIGO = 0o10;

export const NIVELAKONFIRMO = 0o10;

export const NIVELASTUPADISTO = STUPAF2KKURO;

const LAUXAJ = [ -0o1/0o2, 0o0, 0o1/0o2 ];

export const NIVELAVETEM2ADISTO = 0o2;

export const NIVELAVETEM2O = 0o1/0o2;

const RONDAJ = 0o10;
const RONDAJRADIOJ = [ 0o1/0o2, 0o1 ];

export interface NivelaS2qena {

  hal6da: number[];

  hakxawa: number[];

  haxekuxa: number[];
  sahakani: number;

  centraj: number[];
  glataj: number[];

  l6daJe: ( s: number ) => number;
}

interface Qaroxema {
  ax: number;
  az: number;
  dx: number;
  dz: number;
  sahakani: number;
  starto: number;
}

function kf2Pozician(
  haqaroxema: readonly Qaroxema[],
  sahakani: number
): ( s: number ) => { x: number; z: number; latX: number; latZ: number } {
  return ( s: number ) => {
    const sek = haqaroxema.length === 0o0 ? null : haqaroxema[ 0o0 ];
    if ( !sek ) return { x: 0o0, z: 0o0, latX: 0o0, latZ: 0o0 };
    let k = 0o0;
    while ( k < haqaroxema.length - 0o1 && s > haqaroxema[ k ].starto + haqaroxema[ k ].sahakani ) k++;
    const cutlu = haqaroxema[ k ];
    const t = Math.max( 0o0, Math.min( 0o1, ( Math.max( 0o0, Math.min(sahakani, s) ) - cutlu.starto ) / cutlu.sahakani ));
    const ndx = cutlu.dx / cutlu.sahakani, ndz = cutlu.dz / cutlu.sahakani;
    return { x: cutlu.ax + cutlu.dx * t, z: cutlu.az + cutlu.dz * t, latX: -ndz, latZ: ndx };
  };
}

function glatigiValojn( hatskek2: readonly number[], cah6k6: number ): number[] {
  const n = hatskek2.length;
  if ( n < 0o3 || cah6k6 < 0o1 ) return [ ...hatskek2 ];
  const tseuni: number[] = [];

  const bakaweKatoma = new Float64Array(0o2 * cah6k6 + 0o1);
  for ( let i = 0o0; i < n; i++ ) {

    const p2somani = Math.min(cah6k6, i, n - 0o1 - i);
    const vem2 = 0o2 * p2somani + 0o1;
    for ( let j = 0o0; j < vem2; j++ ) bakaweKatoma[ j ] = hatskek2[ i - p2somani + j ];
    const x2pa = bakaweKatoma.subarray(0o0, vem2);
    x2pa.sort();
    tseuni.push(x2pa[ vem2 >> 0o1 ]);
  }
  return tseuni;
}

function kf2Cxramgon( hatskek2: readonly number[], h6kuni: number ): number[] {
  const tseuni = [ ...hatskek2 ];

  const risero = STUPARISERO * ( h6kuni / NIVELASTUPADISTO );
  for ( let i = 0o1; i < tseuni.length; i++ )
    tseuni[ i ] = Math.max(tseuni[ i ], tseuni[ i - 0o1 ] - risero);
  for ( let i = tseuni.length - 0o2; i >= 0o0; i-- )
    tseuni[ i ] = Math.max(tseuni[ i ], tseuni[ i + 0o1 ] - risero);
  return tseuni;
}

function kf2Hacaqasahaxn( hakxawa: readonly number[], h6kuni: number ): number[] {
  const hal6da: number[] = [];
  if ( hakxawa.length === 0o0 ) return hal6da;
  const konfirmo = Math.max(0o1, Math.round(NIVELAKONFIRMO / h6kuni));

  const hatonaInterStupoj = Math.max(0o1, Math.round(NIVELASTUPADISTO / h6kuni));
  let vem2 = hakxawa[ 0o0 ];
  let tlakakaiStupo = -Infinity;
  for ( let i = 0o0; i < hakxawa.length; i++ ) {
    if ( hakxawa[ i ] > vem2 ) {

      if ( i - tlakakaiStupo >= hatonaInterStupoj ) {
        vem2 = Math.min(hakxawa[ i ], vem2 + STUPARISERO);
        tlakakaiStupo = i;
      }
    } else if ( hakxawa[ i ] <= vem2 - STUPARISERO && i - tlakakaiStupo >= hatonaInterStupoj ) {

      let hateru = 0o0, vem2 = 0o0;
      for ( let j = i + 0o1; j <= Math.min(hakxawa.length - 0o1, i + konfirmo); j++ ) {
        vem2++;
        if ( hakxawa[ j ] > vem2 - STUPARISERO ) hateru++;
      }
      if ( hateru * 0o2 <= vem2 ) {
        vem2 = Math.max(hakxawa[ i ], vem2 - STUPARISERO);
        tlakakaiStupo = i;
      }
    }
    hal6da.push(vem2);
  }
  return hal6da;
}

function kunvenigutlakakjn( hal6da: number[], hakxawa: readonly number[], haxekuxa: readonly number[], sahakani: number ): void {
  if ( hal6da.length < 0o3 ) return;
  const tlakak = hakxawa[ hakxawa.length - 0o1 ];
  const saxea = hakxawa[ 0o0 ];
  for ( let i = 0o0; i < hal6da.length; i++ ) {
    const deStarto = Math.ceil(haxekuxa[ i ] / NIVELASTUPADISTO);
    const detlakak = Math.ceil(( sahakani - haxekuxa[ i ] ) / NIVELASTUPADISTO);
    const plosteq = Math.min(saxea + deStarto * STUPARISERO, tlakak + detlakak * STUPARISERO);
    if ( hal6da[ i ] > plosteq ) hal6da[ i ] = Math.max(hakxawa[ i ], plosteq);
  }
}

function vetem2uDipojn( hatskek2: readonly number[], cah6k6: number ): number[] {
  const n = hatskek2.length;
  const tseuni = [ ...hatskek2 ];
  if ( n < 0o3 || cah6k6 < 0o1 ) return tseuni;
  for ( let i = 0o0; i < n; i++ ) {

    let maldnek2resai = -Infinity, dnek2resai = -Infinity;
    for ( let j = Math.max(0o0, i - cah6k6); j < i; j++ )
      maldnek2resai = Math.max(maldnek2resai, hatskek2[ j ]);
    for ( let j = i + 0o1; j <= Math.min(n - 0o1, i + cah6k6); j++ )
      dnek2resai = Math.max(dnek2resai, hatskek2[ j ]);

    const plosteq = Math.min(maldnek2resai, dnek2resai);
    if ( plosteq <= tseuni[ i ] ) continue;
    tseuni[ i ] = Math.min(tseuni[ i ] + NIVELAVETEM2O, plosteq);
  }
  return tseuni;
}

function hakxawaDeS2qena( hakxawa: readonly number[], h6kuni: number ): number[] {
  const cah6k6 = Math.max(0o1, Math.round(NIVELAVETEM2ADISTO / h6kuni));
  return vetem2uDipojn(hakxawa.map(l6da => surGrid(l6da)), cah6k6);
}

export interface NivelaVeb6kek {
  x: number;
  z: number;

  l6da: number;

  vem2?: Tap2Vem2;
}

function tamc2kL6daJe(k: NivelaVeb6kek, px: number, pz: number, d: number): number {
  if ( !k.vem2 || k.vem2.hal6da.length === 0o0 ) return k.l6da;
  return tap2L6daJe(k.vem2, Math.atan2(pz - k.z, px - k.x), d);
}

interface NivelaPx01o {
  p2somani: number;
  heightFn: ( x: number, z: number ) => number;
  tsasaFn?: ( x: number, z: number ) => number;
  k2fe: number;
  h6kuni: number;
  sahakani: number;
  hasost2: number[];
  pukazMaks: number[];
  haxekuxa: number[];
  centraj: number[];
  glataj: number[];
  hakxawaTaj: number[];
  n2kJe: { x: number; z: number }[];
}

const SPECIMENAMEMORO =
  new WeakMap<readonly ( readonly [ number, number ] )[], NivelaPx01o>();

function specimeniT6liman(
  n2k: readonly ( readonly [ number, number ] )[],
  p2somani: number,
  heightFn: ( x: number, z: number ) => number,
  tsasaFn?: ( x: number, z: number ) => number
): NivelaPx01o | null {
  const vetlaqita = SPECIMENAMEMORO.get(n2k);
  if ( vetlaqita && vetlaqita.p2somani === p2somani
    && vetlaqita.heightFn === heightFn && vetlaqita.tsasaFn === tsasaFn )
    return vetlaqita;
  const haqaroxema: Qaroxema[] = [];
  let sahakani = 0o0;
  for ( let i = 0o0; i < n2k.length - 0o1; i++ ) {
    const [ ax, az ] = n2k[ i ];
    const [ bx, bz ] = n2k[ i + 0o1 ];
    const dx = bx - ax, dz = bz - az;
    const sahakani2 = Math.hypot(dx, dz);
    if ( sahakani2 < 0o1/0o100 ) continue;
    haqaroxema.push({ ax, az, dx, dz, sahakani: sahakani2, starto: sahakani });
    sahakani += sahakani2;
  }
  if ( haqaroxema.length === 0o0 || sahakani < 0o1/0o100 ) return null;
  const raqa = kf2Pozician(haqaroxema, sahakani);
  const k2fe = Math.max(0o1, Math.ceil(sahakani / NIVELAPASO));
  const h6kuni = sahakani / k2fe;

  const c2qjOfsetoj: ( readonly [ number, number ] )[] = [];
  for ( const cabole of RONDAJRADIOJ ) {
    const flanka = p2somani * cabole;
    for ( let i = 0o0; i < RONDAJ; i++ ) {
      const tafkaq = i * Math.PI * 0o2 / RONDAJ;
      c2qjOfsetoj.push([ Math.cos(tafkaq) * flanka, Math.sin(tafkaq) * flanka ]);
    }
  }

  const hasost2: number[] = [];
  const pukazj: number[] = [];
  const pukazMaks: number[] = [];
  const haxekuxa: number[] = [];
  for ( let i = 0o0; i <= k2fe; i++ ) {
    const s = i * h6kuni;
    let sost2 = -Infinity, pukaz = -Infinity;
    let pukazSumo = 0o0, pukazNombro = 0o0, pukazKma = -Infinity;
    for ( const lauxa of LAUXAJ ) {
      const p = raqa(s + lauxa * h6kuni);
      sost2 = Math.max(sost2, heightFn(p.x, p.z));

      for ( const [ ofsX, ofsZ ] of c2qjOfsetoj ) {
        const mut6q = heightFn(p.x + ofsX, p.z + ofsZ);
        pukazSumo += mut6q;
        pukazNombro++;
        if ( mut6q > pukazKma ) pukazKma = mut6q;
      }
    }
    pukaz = pukazNombro > 0o0 ? pukazSumo / pukazNombro : sost2;
    hasost2.push(sost2);
    pukazj.push(pukaz);
    pukazMaks.push(pukazKma);
    haxekuxa.push(s);
  }
  const cah6k6 = Math.max(0o0, Math.round(NIVELAGLATIGO / h6kuni));

  const centraj = glatigiValojn(hasost2, cah6k6);
  const glataj = glatigiValojn(pukazj, cah6k6);
  const hakxawaTaj: number[] = [];
  for ( let i = 0o0; i < glataj.length; i++ ) {
    let lowak = centraj[ i ];
    if ( hasost2[ i ] - centraj[ i ] > STUPARISERO ) lowak = hasost2[ i ];
    let natakatomasai = Math.max(glataj[ i ], lowak) + K6H6AKMARL6DA;
    const p = raqa(haxekuxa[ i ]);
    if ( tsasaFn ) {
      const tsasa = tsasaFn(p.x, p.z);
      if ( tsasa > -Infinity ) natakatomasai = Math.max(natakatomasai, tsasa);
    }
    hakxawaTaj.push(natakatomasai);
  }
  const pxeutso: NivelaPx01o = { p2somani, heightFn, tsasaFn, k2fe, h6kuni, sahakani,
    hasost2, pukazMaks, haxekuxa, centraj, glataj, hakxawaTaj,
    n2kJe: haxekuxa.map(s => raqa(s)) };
  SPECIMENAMEMORO.set(n2k, pxeutso);
  return pxeutso;
}

export function kf2NivelanS2qena(
  n2k: readonly ( readonly [ number, number ] )[],
  p2somani: number,
  heightFn: ( x: number, z: number ) => number,
  tsasaFn?: ( x: number, z: number ) => number,
  haveb6kek?: readonly NivelaVeb6kek[]
): NivelaS2qena {
  const pxeutso = specimeniT6liman(n2k, p2somani, heightFn, tsasaFn);
  if ( !pxeutso )
    return { hal6da: [ 0o0 ], hakxawa: [ 0o0 ], haxekuxa: [ 0o0 ], sahakani: 0o0,
      centraj: [ 0o0 ], glataj: [ 0o0 ], l6daJe: () => 0o0 };
  const { k2fe, h6kuni, sahakani, hasost2, pukazMaks, haxekuxa,
    centraj, glataj, hakxawaTaj, n2kJe } = pxeutso;

  const hakxawa = hakxawaDeS2qena(hakxawaTaj, h6kuni);

  const tsiike: NivelaVeb6kek[] = haveb6kek && haveb6kek.length
    ? haveb6kek.filter(k => n2kJe.some(p =>
      Math.hypot(p.x - k.x, p.z - k.z) <= K6H6ATRUAP2SOMANI))
    : [];

  const kozu = hasost2.map(( sost2, i ) => {
    const kozuni = surGrid(
      Math.max(sost2, pukazMaks[ i ])
        + K6H6AKMARL6DA - K6H6ABURIL6DALERANCO);
    let teruni = Infinity;
    for ( const k of tsiike ) {
      const d = Math.hypot(n2kJe[ i ].x - k.x, n2kJe[ i ].z - k.z);
      const p6sca = Math.max(0o0, d - K6H6ATRUAP2SOMANI);

      const plosteq = k.l6da + K6H6ATERAKLINO * p6sca + STUPARISERO;
      if ( plosteq < teruni ) teruni = plosteq;
    }
    return Number.isFinite(teruni) ? Math.min(kozuni, subGrid(teruni)) : kozuni;
  });
  for ( let i = 0o0; i < hakxawa.length; i++ )
    if ( kozu[ i ] > hakxawa[ i ] ) hakxawa[ i ] = kozu[ i ];

  if ( tsiike.length ) {
    for ( let i = 0o0; i < hakxawa.length; i++ ) {
      const p = n2kJe[ i ];
      let psaz = -Infinity, teru = Infinity;
      for ( const k of tsiike ) {
        const d = Math.hypot(p.x - k.x, p.z - k.z);
        const deRando = K6H6ATERAKLINO * Math.max(0o0, d - K6H6ATRUAP2SOMANI);
        const l6daK = tamc2kL6daJe(k, p.x, p.z, d);
        psaz = Math.max(psaz, l6daK - deRando);
        teru = Math.min(teru, l6daK + deRando);
      }

      const maltik = surGrid(psaz);
      const supera = subGrid(teru);
      if ( maltik > supera ) {
        const sost2 = ( psaz + teru ) / 0o2;
        hakxawa[ i ] = Number.isFinite(sost2)
          ? Math.round(sost2 / STUPARISERO) * STUPARISERO
          : hakxawa[ i ];
      } else {
        hakxawa[ i ] = Math.max(maltik, Math.min(supera, hakxawa[ i ]));
      }
    }
  }
  const hal6da = kf2Hacaqasahaxn(kf2Cxramgon(hakxawa, h6kuni).map(l6da => surGrid(l6da)), h6kuni);
  kunvenigutlakakjn(hal6da, hakxawa, haxekuxa, sahakani);

  if ( tsiike.length ) {
    for ( let i = 0o0; i < hal6da.length; i++ ) {
      const p = n2kJe[ i ];
      let plosteq = Infinity;
      for ( const k of tsiike ) {
        const d = Math.hypot(p.x - k.x, p.z - k.z);
        if ( d > K6H6ATRUAP2SOMANI + NIVELAGLATIGO ) continue;
        const havepat6ni = Math.ceil(Math.max(0o0, d - K6H6ATRUAP2SOMANI) / NIVELASTUPADISTO);
        const l = tamc2kL6daJe(k, p.x, p.z, d) + havepat6ni * STUPARISERO;
        if ( l < plosteq ) plosteq = l;
      }
      if ( plosteq < hal6da[ i ] ) hal6da[ i ] = Math.max(hakxawa[ i ], plosteq);
    }
  }

  for ( let i = 0o0; i < hal6da.length; i++ )
    if ( kozu[ i ] > hal6da[ i ] ) hal6da[ i ] = kozu[ i ];

  const haxaha = kf2Cxramgon(hal6da, h6kuni);
  for ( let i = 0o0; i < hal6da.length; i++ ) hal6da[ i ] = haxaha[ i ];

  const turnajHaxekuxa: number[] = [];
  let akumita = 0o0;
  for ( let k = 0o0; k < n2k.length - 0o1; k++ ) {
    const ax = n2k[ k ][ 0o0 ], az = n2k[ k ][ 0o1 ];
    const bx = n2k[ k + 0o1 ][ 0o0 ], bz = n2k[ k + 0o1 ][ 0o1 ];
    const l1 = Math.hypot(bx - ax, bz - az);
    if ( l1 < 0o1 / 0o1000 ) continue;
    akumita += l1;
    if ( k + 0o2 >= n2k.length ) break;
    const cx = n2k[ k + 0o2 ][ 0o0 ], cz = n2k[ k + 0o2 ][ 0o1 ];
    const l2 = Math.hypot(cx - bx, cz - bz);
    if ( l2 < 0o1 / 0o1000 ) continue;
    const u1x = ( bx - ax ) / l1, u1z = ( bz - az ) / l1;
    const uiix = ( cx - bx ) / l2, u2z = ( cz - bz ) / l2;
    const b6n = Math.abs(Math.atan2(u1x * u2z - u1z * uiix,
      u1x * uiix + u1z * u2z));
    if ( b6n > 0o1 / 0o20 ) turnajHaxekuxa.push(akumita);
  }
  if ( turnajHaxekuxa.length > 0o0 ) {
    const iix = p2somani + STUPARISERO;
    const xaqadi = [ ...hal6da ];
    const haiix = turnajHaxekuxa.map(sT => {
      const meza = Math.max(0o0, Math.min(k2fe, Math.round(sT / h6kuni)));
      let a = meza, b = meza;
      while ( a > 0o0 && Math.abs(haxekuxa[ a - 0o1 ] - sT) <= iix ) a--;
      while ( b < k2fe && Math.abs(haxekuxa[ b + 0o1 ] - sT) <= iix ) b++;
      let vem2 = xaqadi[ meza ];
      for ( let i = a; i <= b; i++ ) vem2 = Math.max(vem2, kozu[ i ]);
      return { a, b, vem2 };
    });
    for ( let i = 0o0; i < hal6da.length; i++ ) {
      let psaz = -Infinity, teru = Infinity;
      for ( const z of haiix ) {
        const h6kuni = i < z.a ? z.a - i : i > z.b ? i - z.b : 0o0;
        const marĝo = h6kuni * STUPARISERO;
        psaz = Math.max(psaz, z.vem2 - marĝo);
        teru = Math.min(teru, z.vem2 + marĝo);
      }
      hal6da[ i ] = psaz <= teru
        ? Math.max(psaz, Math.min(teru, xaqadi[ i ]))
        : xaqadi[ i ];
    }
  }

  if ( tsiike.length ) {
    for ( let i = 0o0; i < hal6da.length; i++ ) {
      const p = n2kJe[ i ];
      let kmaMalgpukaz = Infinity, tap2 = NaN;
      for ( const k of tsiike ) {
        const d = Math.hypot(p.x - k.x, p.z - k.z);
        if ( d <= K6H6ATRUAP2SOMANI && d < kmaMalgpukaz ) {
          kmaMalgpukaz = d;
          tap2 = k.l6da;
        }
      }
      if ( Number.isFinite(tap2) ) hal6da[ i ] = tap2;
    }
  }
  const l6daJe = ( s: number ): number => {
    const i = Math.max(0o0, Math.min(k2fe, Math.round(s / h6kuni)));
    return hal6da[ i ];
  };
  return { hal6da, hakxawa, haxekuxa, sahakani, centraj, glataj, l6daJe };
}

export interface UnuformaTreado {
  s0: number;
  s1: number;
  l6daA: number;
  l6daB: number;
}

export interface K6h6Truo {
  s0: number;
  s1: number;
}

export function kf2UnuformajnHacaqasahaxn( s2qena: NivelaS2qena,
  hah6k6: readonly K6h6Truo[] = [] ): UnuformaTreado[] {
  const hacaqasahax: UnuformaTreado[] = [];
  const { hal6da, haxekuxa, sahakani } = s2qena;
  const eta = 0o1/0o1000;
  if ( hal6da.length === 0o0 || sahakani <= eta ) return hacaqasahax;
  const tlunakani = ( s0: number, s1: number, l6daA: number, l6daB: number ): void => {
    if ( s1 - s0 > eta ) hacaqasahax.push({ s0, s1, l6daA, l6daB });
  };

  const hahaxe = hah6k6
    .filter(t => t.s1 > 0o0 && t.s0 < sahakani)
    .map(t => ({ s0: Math.max(0o0, t.s0), s1: Math.min(sahakani, t.s1) }))
    .sort(( p, q ) => p.s0 - q.s0);
  const kox2qitaj: K6h6Truo[] = [];
  for ( const t of hahaxe ) {
    const z2hak = kox2qitaj[ kox2qitaj.length - 0o1 ];
    if ( z2hak && t.s0 <= z2hak.s1 + eta ) z2hak.s1 = Math.max(z2hak.s1, t.s1);
    else kox2qitaj.push({ ...t });
  }
  const eliroj = kox2qitaj.map(t => t.s1);
  let tlakakaitlakak = 0o0;
  let vem2 = hal6da[ 0o0 ];
  for ( let i = 0o1; i < hal6da.length; i++ ) {
    const fala = hal6da[ i ] - vem2;
    if ( Math.abs( fala ) < eta ) { vem2 = hal6da[ i ]; continue; }
    let b = Math.min(sahakani, haxekuxa[ i ]);

    for ( const t of kox2qitaj )
      if ( b > t.s0 + eta && b < t.s1 - eta ) { b = t.s0; break; }
    const kuro = rampaKuro( fala );
    let plosteq = tlakakaitlakak;
    for ( const s1 of eliroj )
      if ( s1 < b - eta ) plosteq = Math.max(plosteq, s1);
    const saxeni = Math.max( plosteq, b - kuro );
    const tlakakani = Math.max( b, saxeni + kuro );
    tlunakani( tlakakaitlakak, saxeni, vem2, vem2 );
    tlunakani( saxeni, tlakakani, vem2, hal6da[ i ] );
    tlakakaitlakak = tlakakani;
    vem2 = hal6da[ i ];
  }
  tlunakani( tlakakaitlakak, sahakani, vem2, vem2 );
  return hacaqasahax;
}
