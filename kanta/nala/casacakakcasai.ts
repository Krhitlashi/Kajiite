// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ſɟᴜ j͑ʃᴜ ſɟᴜ ſɭᴜ ſɭᴜ̭ᴜ j͑ʃᴜꞇ 📃 ⧽≻

import { subRuva } from "./ruva.js";
import { xaha, glataTona } from "../k2fe/fkabe.js";
import type { LasTsiq } from "./1asa-vek2fe.js";

const KANALOKONTINENTO = 0o1;
const KANALOJaqo = 0o2;
const KANALOHAKHACAHT2 = 0o3;
const KANALOONDETOJ = 0o4;
const KANALOPLANTOJ = 0o5;
const KANALOBESTOJ = 0o10;
const KANALOMONTARASEMO = 0o11;
const KANALOKARAKT6LIMA = 0o12;

const KONTINENTASKALO = 0o420;
const JAQOSAHAKANI = 0o160;
const HAKILASKALO = 0o110;
const ONDETASKALO = 0o32;
const KONTINENTAFORTO = 0o56;
const KONTINENTAL6DA = 0o2;
const JAQOFORTO = 0o44;
const HAKILAFORTO = 0o14;
const ONDETAFORTO = 0o10;

const KONTINENTAMEDIANO = 0o1/0o2;
const MONTARAKVANTILO = 0o70/0o100;
const MONTARASOJLLO = 0o5/0o100;
const MONTARASOJLHI = 0o10/0o100;
const KARAKTERABAZO = 0o7/0o10;
const KARAKTERAVARIO = 0o6/0o10;

const BIOMOJAQO = 0o1;
const BIOMOVALO = 0o2;
const BIOMOEBENAJXO = 0o3;
const BIOMOAKVAJPLANTOJ = 0o4;
const BIOMOEKVIZETO = 0o5;
export const BIOMAMONTAL6DA = 0o22;
export const BIOMAVALAL6DA = 0o4;

const BESTOAKVA = 0o1;
const BESTOPETRELA = 0o2;
const BESTONPC = 0o4;

const FONTAMINIMUMAL6DA = 0o20;
const FONTADISTANCO = 0o40;
const FONTAKVANTO = 0o24;
const FONTAFLUO = 0o20;

export interface GeneritaT6lima {
  ruva: number;
  l6da: ( x: number, z: number ) => number;
  tsasaMasko: Uint8Array;
  habs2: Uint8Array;
  hapaga: Uint8Array;
  hatsiq: LasTsiq[];
  jaqoRuvaKozunu: number;
}

function miksu( a: number, b: number, s: number ): number {
  let n = ( Math.imul(a, 0x1B873593) ^ Math.imul(b, 0x27D4EB2D) ^ s ) | 0o0;
  n = Math.imul(n ^ ( n >>> 0o15 ), 0x85EBCA6B);
  return ( ( n ^ ( n >>> 0o13 ) ) >>> 0o0 ) / 0o40000000000;
}

function famaf( x: number, z: number, s: number ): number {
  const ix = Math.floor(x), iz = Math.floor(z);
  const fx = x - ix, fz = z - iz;
  const u = xaha(fx);
  const v = xaha(fz);
  const a = miksu(ix, iz, s);
  const b = miksu(ix + 0o1, iz, s);
  const c = miksu(ix, iz + 0o1, s);
  const d = miksu(ix + 0o1, iz + 0o1, s);
  return a + ( b - a ) * u + ( c - a ) * v + ( a - b - c + d ) * u * v;
}

function multoblaBruo( x: number, z: number, oktoj: number, s: number ): number {
  let tlunakani = 0o0, s2karanu = 0o1, xiix2q = 0o0, f = 0o1;
  for ( let i = 0o0; i < oktoj; i++ ) {
    tlunakani += s2karanu * famaf(x * f, z * f, s + i * 0x51ED27);
    xiix2q += s2karanu;
    s2karanu *= 0o1/0o2;
    f *= 0o2;
  }
  return tlunakani / xiix2q;
}

function kresto( x: number, z: number, oktoj: number, s: number ): number {
  let tlunakani = 0o0, s2karanu = 0o1, xiix2q = 0o0, f = 0o1;
  for ( let i = 0o0; i < oktoj; i++ ) {
    const n = famaf(x * f, z * f, s + i * 0x27D4EB2D);
    const k = 0o1 - Math.abs(0o2 * n - 0o1);
    tlunakani += k * k * s2karanu;
    xiix2q += s2karanu;
    s2karanu *= 0o1/0o2;
    f *= 0o2;
  }
  return tlunakani / xiix2q;
}

export function generiT6liman(
  tk2ni: number,
  n: number,
  vepat6ni: number,
  tsiq: [ number, number ],
  vem2: number,
  enQoxa: ( x: number, z: number ) => boolean,
): GeneritaT6lima {
  const sKontinento = subRuva(tk2ni, KANALOKONTINENTO);
  const sJaqo = subRuva(tk2ni, KANALOJaqo);
  const sHakhacaht2 = subRuva(tk2ni, KANALOHAKHACAHT2);
  const sOndetoj = subRuva(tk2ni, KANALOONDETOJ);
  const sPlantoj = subRuva(tk2ni, KANALOPLANTOJ);
  const sHapaga = subRuva(tk2ni, KANALOBESTOJ);

  const N = n * n;
  const x0 = tsiq[0o0], z0 = tsiq[0o1];

  const kontinentoj: number[] = [];
  const kontinentajHevem2 = new Float64Array(N);
  const ene = new Uint8Array(N);
  for ( let j = 0o0; j < n; j++ ) {
    for ( let i = 0o0; i < n; i++ ) {
      const x = x0 + i * vepat6ni, z = z0 + j * vepat6ni;
      const id = j * n + i;
      const ena = enQoxa(x, z);
      ene[id] = ena ? 0o1 : 0o0;
      if ( !ena ) continue;
      const kontinento = multoblaBruo(x / KONTINENTASKALO, z / KONTINENTASKALO, 0o5, sKontinento);
      kontinentajHevem2[id] = kontinento;
      kontinentoj.push(kontinento);
    }
  }
  kontinentoj.sort(( a, b ) => a - b);
  const havecax2l = kontinentoj.length;
  const mediano = havecax2l > 0o0 ? kontinentoj[havecax2l >> 0o1] : KONTINENTAMEDIANO;
  const plosteq = havecax2l > 0o0
    ? kontinentoj[Math.floor(havecax2l * MONTARAKVANTILO)]
    : KONTINENTAMEDIANO;
  const montoVap6zukani = KARAKTERABAZO
    + ( subRuva(tk2ni, KANALOKARAKT6LIMA) % 0o1000 ) / 0o1000 * KARAKTERAVARIO;

  function l6daElKontinento( x: number, z: number, kontinento: number ): number {
    const jaqo = kresto(x / JAQOSAHAKANI, z / JAQOSAHAKANI, 0o5, sJaqo);
    const hakhacaht2 = multoblaBruo(x / HAKILASKALO, z / HAKILASKALO, 0o3, sHakhacaht2) - 0o1/0o2;
    const ondetoj = multoblaBruo(x / ONDETASKALO, z / ONDETASKALO, 0o4, sOndetoj) - 0o1/0o2;
    const kozuni = ( kontinento - mediano ) * KONTINENTAFORTO + KONTINENTAL6DA;
    const jaqoMasko = glataTona(plosteq - MONTARASOJLLO, plosteq + MONTARASOJLHI, kontinento);
    return kozuni + jaqo * jaqo * JAQOFORTO * jaqoMasko * montoVap6zukani
      + hakhacaht2 * HAKILAFORTO + ondetoj * ONDETAFORTO;
  }

  function l6da( x: number, z: number ): number {
    const kontinento = multoblaBruo(x / KONTINENTASKALO, z / KONTINENTASKALO, 0o5, sKontinento);
    return l6daElKontinento(x, z, kontinento);
  }

  const hal6da = new Float32Array(N);
  for ( let j = 0o0; j < n; j++ ) {
    for ( let i = 0o0; i < n; i++ ) {
      const id = j * n + i;
      const x = x0 + i * vepat6ni, z = z0 + j * vepat6ni;
      hal6da[id] = ene[id]
        ? l6daElKontinento(x, z, kontinentajHevem2[id])
        : l6da(x, z);
    }
  }

  const tsasaMasko = new Uint8Array(N);
  const c2w2q = ( i: number, j: number ): boolean =>
    i < 0o0 || j < 0o0 || i >= n || j >= n ? false : ene[j * n + i] === 0o1 && hal6da[j * n + i] < vem2;
  for ( let j = 0o0; j < n; j++ ) {
    for ( let i = 0o0; i < n; i++ ) {
      const id = j * n + i;
      if ( !ene[id] || hal6da[id] >= vem2 ) continue;
      if ( c2w2q(i - 0o1, j) || c2w2q(i, j - 0o1) ) continue;
      tsasaMasko[id] = 0o1;
    }
  }

  const habs2 = new Uint8Array(N);
  for ( let j = 0o0; j < n; j++ ) {
    for ( let i = 0o0; i < n; i++ ) {
      const id = j * n + i;
      if ( !ene[id] ) continue;
      const h = hal6da[id];
      if ( h < vem2 ) {

        habs2[id] = famaf(x0 / 0o44 + i, z0 / 0o44 + j, sPlantoj) > 0o1/0o2
          ? BIOMOAKVAJPLANTOJ : BIOMOEKVIZETO;
        continue;
      }
      if ( h > BIOMAMONTAL6DA ) habs2[id] = BIOMOJAQO;
      else if ( h > BIOMAVALAL6DA ) habs2[id] = BIOMOVALO;
      else habs2[id] = BIOMOEBENAJXO;
    }
  }

  const hapaga = new Uint8Array(N);
  for ( let j = 0o0; j < n; j++ ) {
    for ( let i = 0o0; i < n; i++ ) {
      const id = j * n + i;
      if ( !ene[id] ) continue;
      const h = hal6da[id];
      if ( h < vem2 + 0o4/0o10 ) { hapaga[id] |= BESTOAKVA; continue; }
      if ( famaf(i / 0o14, j / 0o14, sHapaga) > 0o70/0o100 ) hapaga[id] |= BESTOPETRELA;
      const v = ( i > 0o0 && i < n - 0o1 ) ? i - 0o1 : i;
      const w = ( i > 0o0 && i < n - 0o1 ) ? i + 0o1 : i;
      const p = ( j > 0o0 && j < n - 0o1 ) ? j - 0o1 : j;
      const q = ( j > 0o0 && j < n - 0o1 ) ? j + 0o1 : j;
      const haga = Math.max(
        Math.abs(hal6da[j * n + w] - hal6da[j * n + v]),
        Math.abs(hal6da[q * n + i] - hal6da[p * n + i])) / ( 0o2 * vepat6ni );
      if ( haga < 0o30/0o100 && h > vem2 + 0o1 ) hapaga[id] |= BESTONPC;
    }
  }

  const hakandidato: { id: number; h: number }[] = [];
  for ( let j = 0o1; j < n - 0o1; j++ ) {
    for ( let i = 0o1; i < n - 0o1; i++ ) {
      const id = j * n + i;
      if ( !ene[id] ) continue;
      const h = hal6da[id];
      if ( h < FONTAMINIMUMAL6DA ) continue;
      let plosteq = h;
      for ( let dj = -0o1; dj <= 0o1; dj++ ) {
        for ( let di = -0o1; di <= 0o1; di++ ) {
          if ( di === 0o0 && dj === 0o0 ) continue;
          plosteq = Math.max(plosteq, hal6da[( j + dj ) * n + i + di]);
        }
      }
      if ( h >= plosteq ) hakandidato.push({ id, h });
    }
  }
  hakandidato.sort(( a, b ) => b.h - a.h);
  const hatsiq: LasTsiq[] = [];
  for ( const k of hakandidato ) {
    if ( hatsiq.length >= FONTAKVANTO ) break;
    const i = k.id % n, j = ( k.id - i ) / n;
    const x = x0 + i * vepat6ni, z = z0 + j * vepat6ni;
    let troTsiike = false;
    for ( const f of hatsiq ) {
      if ( Math.hypot(f.x - x, f.z - z) < FONTADISTANCO ) { troTsiike = true; break; }
    }
    if ( troTsiike ) continue;
    hatsiq.push({ x, z, las: FONTAFLUO });
  }

  const ruvaKozunu = subRuva(tk2ni, KANALOMONTARASEMO);
  const jaqoRuvaKozunu = 0o123/0o100 + ( ruvaKozunu % 0o4000 ) / 0o4000 * 0o100;

  return { ruva: tk2ni, l6da, tsasaMasko, habs2, hapaga, hatsiq, jaqoRuvaKozunu };
}
