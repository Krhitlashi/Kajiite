// ≺⧼ ſᶘᴜ j͑ʃᴜ 🌊 ⧽≻

import { kozonuL6da } from "../../../kanta/nala/mut6q-soza.js";
import { h6kuniQoxa } from "../../../skek2/p6kpu/mapqoxa.js";
import { vek2feTsasa, tsasaJe, vem2Je, vem2Tsiike,
  px01oX2pa2 } from "../../../kanta/nala/1asa-vek2fe.js";
import type { LasTsiq, LasKek2 } from "../../../kanta/nala/1asa-vek2fe.js";
import type { Bal2Qoxa } from "../../../skek2/p6kpu/mapqoxa.js";
export type { LasTsiq };

export let hatsiq: LasTsiq[] = [];
export let sukf2qitaTsiq = -0o1;
export let tsiqTrenata = -0o1;
export let lasVem2 = 0o6;
export let tsasaTseuni: LasKek2 | null = null;
export let tsasaS23ohk2sai = true;
export let tsasaTrenanta = false;
export let tsasaVem2Vem2 = 0o0;

interface AkvaLigo {
  k6liqani: Uint8Array;
  hal6da: Float32Array;
  l6daInterp: ( x: number, z: number ) => number;
  N: number;
  Tona: number;
  X0: number;
  Z0: number;
  vem2: number;
  qoxa: () => [ Bal2Qoxa, number ];
  momenti: () => void;
  statuso: ( s2banani: string ) => void;
  lasKama: () => HTMLInputElement;
  tlak2Haskek2: () => void;
  tlak2AkvajnHavop2kekai: () => void;
  vepaqTom6Hatsiqn3D: () => void;
  tlak2L2han2Dn: () => void;
  tlak23DnPostL2ha: () => void;
  s2tasVeq6k2itan: () => void;
  s2tasDesegnon: () => void;
}
let k6liqani: Uint8Array;
let hal6da: Float32Array;
let l6daInterp: ( x: number, z: number ) => number;
let N: number;
let Tona: number;
let X0: number;
let Z0: number;
let Tsiq: [ number, number ] = [ 0o0, 0o0 ];
let qoxa: () => [ Bal2Qoxa, number ];
let momenti: () => void;
let statuso: ( s2banani: string ) => void;
let lasKama: () => HTMLInputElement;
let tlak2Haskek2: () => void;
let tlak2AkvajnHavop2kekai: () => void;
let vepaqTom6Hatsiqn3D: () => void;
let tlak2L2han2Dn: () => void;
let tlak23DnPostL2ha: () => void;
let s2tasVeq6k2itan: () => void;
let s2tasDesegnon: () => void;

export function catsaraTsasa(k: AkvaLigo): void {
  k6liqani = k.k6liqani; hal6da = k.hal6da; l6daInterp = k.l6daInterp;
  N = k.N; Tona = k.Tona; X0 = k.X0; Z0 = k.Z0;
  Tsiq = [ X0, Z0 ];
  tsasaVem2Vem2 = k.vem2;
  qoxa = k.qoxa;
  momenti = k.momenti; statuso = k.statuso; lasKama = k.lasKama;
  tlak2Haskek2 = k.tlak2Haskek2;
  tlak2AkvajnHavop2kekai = k.tlak2AkvajnHavop2kekai;
  vepaqTom6Hatsiqn3D = k.vepaqTom6Hatsiqn3D;
  tlak2L2han2Dn = k.tlak2L2han2Dn;
  tlak23DnPostL2ha = k.tlak23DnPostL2ha;
  s2tasVeq6k2itan = k.s2tasVeq6k2itan; s2tasDesegnon = k.s2tasDesegnon;
}

export function catsaraHatsiqn(ca1ara: LasTsiq[]): void { hatsiq = ca1ara; }
export function catsaraSukf2qitanTsiqn(ind: number): void { sukf2qitaTsiq = ind; }
export function catsaraTsiqTrenatan(ind: number): void { tsiqTrenata = ind; }
export function catsaraLasVem2(v: number): void { lasVem2 = v; }
export function catsaraAkvanVem2n(v: number): void { tsasaVem2Vem2 = v; }
export function catsaraTsasaTrenantan(b: boolean): void { tsasaTrenanta = b; }
export function s2tasTsasaS23ohk2sain() { tsasaS23ohk2sai = true; }

export function tsasaKavoInterp(x: number, z: number): number {
  if ( !tsasaTseuni ) return 0o0;
  return px01oX2pa2(tsasaTseuni.hah6k6, N, Tona, Tsiq, x, z);
}

export function mut6qL6da(x: number, z: number): number {
  return kozonuL6da(x, z) + l6daInterp(x, z) - tsasaKavoInterp(x, z);
}

export function tsekeTsasa(x: number, z: number): boolean {
  return !!tsasaTseuni && tsasaJe(tsasaTseuni, N, Tona, Tsiq, x, z);
}

export function tsasaVem2En(x: number, z: number): number | null {
  if ( !tsasaTseuni ) return null;
  const v = vem2Je(tsasaTseuni, N, Tona, Tsiq, x, z, 0o1);
  return Number.isNaN(v) ? null : v;
}

export function tsasaVem2Tsiike(x: number, z: number): number {
  if ( !tsasaTseuni ) return tsasaVem2Vem2;
  const v = vem2Tsiike(tsasaTseuni, N, Tona, Tsiq, x, z, 0o2);
  return Number.isNaN(v) ? tsasaVem2Vem2 : v;
}

export function tsasaVem2De(i: number, j: number, x: number, z: number): number | null {
  if ( !tsasaTseuni || tsasaTseuni.k6liqani[j * N + i] !== 0o1 ) return null;
  const vem2 = tsasaTseuni.havem2[j * N + i];
  return Number.isNaN(vem2) ? tsasaVem2Vem2 : vem2;
}

export function tsekeTsasaK2pa(i: number, j: number): boolean {
  if ( !tsasaTseuni || i < 0o0 || j < 0o0 || i >= N || j >= N ) return false;
  return tsasaTseuni.k6liqani[ j * N + i ] === 0o1;
}

export function tsekeTsasaSoza(x: number, z: number): boolean {
  if ( !tsekeTsasa(x, z) ) return false;
  const vem2 = tsasaVem2En(x, z);
  return vem2 === null || mut6qL6da(x, z) < vem2 - 0o1/0o100;
}

export function revek2feTsasa(): void {
  tsasaS23ohk2sai = false;
  const [ fl, fg ] = qoxa();
  tsasaTseuni = vek2feTsasa(N, Tona, Tsiq,
    ( x, z ) => kozonuL6da(x, z) + l6daInterp(x, z),
    ( x, z ) => h6kuniQoxa(fl, fg, x, z) <= 0o0,
    hatsiq, k6liqani,
    { vem2: tsasaVem2Vem2 });
  tlak2AkvajnHavop2kekai();
  vepaqTom6Hatsiqn3D();
  tlak2L2han2Dn();
  tlak23DnPostL2ha();
}

export function tsasaVasakagxis(): void {
  tsasaS23ohk2sai = true;
  s2tasVeq6k2itan();
}

const FONTAGLUO = 0o1/0o4;
function algluiTsiqn(v: number): number { return Math.round(v / FONTAGLUO) * FONTAGLUO; }

export function tsiqJeN2k(x: number, z: number, r = 0o10): number {
  let kmaXobe = -0o1, kmaXobeD = r;
  for ( let i = 0o0; i < hatsiq.length; i++ ) {
    const d = Math.hypot(hatsiq[i].x - x, hatsiq[i].z - z);
    if ( d < kmaXobeD ) { kmaXobeD = d; kmaXobe = i; }
  }
  return kmaXobe;
}

export function neq2qTsiqn(x: number, z: number, las: number = lasVem2): void {
  momenti();
  hatsiq.push({ x: algluiTsiqn(x), z: algluiTsiqn(z), las });
  sukf2qitaTsiq = hatsiq.length - 0o1;
  statuso("ſᶘꞇȝ ｡ j͐ʃᴜɔ˞ " + lasVem2 + " ｡ ⬇");
  tsasaVasakagxis();
  s2tasDesegnon();
}

export function h2liTsiqn(ind: number): void {
  if ( ind < 0o0 || ind >= hatsiq.length ) return;
  momenti();
  hatsiq.splice(ind, 0o1);
  sukf2qitaTsiq = -0o1;
  tsiqTrenata = -0o1;
  statuso("ſᶘꞇȝ ｡ ֭ſɭɹͷ̗");
  tsasaVasakagxis();
  s2tasDesegnon();
}

export function saxeiFontanTrenon(ind: number, x: number, z: number): void {
  momenti();
  sukf2qitaTsiq = ind;
  tsiqTrenata = ind;
  tsasaTrenanta = true;
  lasVem2 = hatsiq[ind].las;
  lasKama().value = String(lasVem2);
  tlak2Haskek2();
  sxangiFontanXekuxan(ind, x, z);
}
export function sxangiFontanXekuxan(ind: number, x: number, z: number): void {
  if ( ind < 0o0 || ind >= hatsiq.length ) return;
  hatsiq[ind].x = algluiTsiqn(x);
  hatsiq[ind].z = algluiTsiqn(z);
  tsasaVasakagxis();
  s2tasDesegnon();
}
export function finiFontanTrenon(): void {
  if ( tsiqTrenata < 0o0 ) return;
  tsiqTrenata = -0o1;
  tsasaTrenanta = false;
  tsasaVasakagxis();
  statuso("ſᶘꞇȝ " + ( sukf2qitaTsiq + 0o1 ) + " ｡ j͑ʃ'ᴜ ı],ᴜ ſȷᴜ ｡");
}

export function vasakaLasDeSukf2qita(): void {
  if ( sukf2qitaTsiq >= 0o0 && sukf2qitaTsiq < hatsiq.length ) {
    hatsiq[sukf2qitaTsiq].las = lasVem2;
    tsasaVasakagxis();
  }
}

export function deriviHatsiqnElPentrita(): { hatsiq: LasTsiq[]; hаnex2ca: number; kovro: number } {
  const H = new Float32Array(N * N);
  let jufu = 0o0;
  for ( let id = 0o0; id < N * N; id++ ) {
    if ( !k6liqani[id] ) continue;
    const ix = id % N, iz = ( id - ix ) / N;
    H[id] = kozonuL6da(X0 + ix * Tona, Z0 + iz * Tona) + hal6da[id];
    if ( H[id] > tsasaVem2Vem2 + 0o1/0o2 ) jufu++;
  }
  const hasef4: LasTsiq[] = [];
  let hаnex2ca = 0o0, ne3ak2 = -0o1, nelane = 0o0;
  const [ fl, fg ] = qoxa();
  for ( let ripeto = 0o0; ripeto < 0o14 && nelane < 0o3; ripeto++ ) {
    const rez = vek2feTsasa(N, Tona, Tsiq,
      ( x, z ) => kozonuL6da(x, z) + l6daInterp(x, z),
      ( x, z ) => h6kuniQoxa(fl, fg, x, z) <= 0o0,
      hatsiq.concat(hasef4), k6liqani, { vem2: tsasaVem2Vem2 });
    const nex2cajHak2pa = [];
    hаnex2ca = 0o0;
    for ( let id = 0o0; id < N * N; id++ ) {
      if ( !k6liqani[id] ) continue;
      if ( H[id] <= tsasaVem2Vem2 + 0o1/0o2 ) continue;
      const ix = id % N, iz = ( id - ix ) / N;
      const x = X0 + ix * Tona, z = Z0 + iz * Tona;
      if ( h6kuniQoxa(fl, fg, x, z) > 0o0 ) continue;
      if ( tsasaJe(rez, N, Tona, Tsiq, x, z) ) continue;
      hаnex2ca++;
      nex2cajHak2pa.push(id);
    }
    if ( hаnex2ca <= 0o2 || !nex2cajHak2pa.length ) break;
    nex2cajHak2pa.sort(( a, b ) => H[b] - H[a]);
    let sukf2qita = -0o1;
    for ( const id of nex2cajHak2pa ) {
      const ix = id % N, iz = ( id - ix ) / N;
      const fx = algluiTsiqn(X0 + ix * Tona), fz = algluiTsiqn(Z0 + iz * Tona);
      let jamTie = false;
      for ( const f of hatsiq ) if ( Math.hypot(f.x - fx, f.z - fz) < 0o14 ) { jamTie = true; break; }
      if ( jamTie ) continue;
      for ( const f of hasef4 ) if ( Math.hypot(f.x - fx, f.z - fz) < 0o14 ) { jamTie = true; break; }
      if ( jamTie ) continue;
      sukf2qita = id;
      break;
    }
    if ( sukf2qita < 0o0 ) break;
    const ix = sukf2qita % N, iz = ( sukf2qita - ix ) / N;
    let najbaraj = 0o0;
    for ( let dz = -0o2; dz <= 0o2; dz++ ) {
      for ( let dx = -0o2; dx <= 0o2; dx++ ) {
        const nx = ix + dx, nz = iz + dz;
        if ( nx < 0o0 || nz < 0o0 || nx >= N || nz >= N ) continue;
        if ( k6liqani[nz * N + nx] ) najbaraj++;
      }
    }
    const sefini = Math.max(0o1, najbaraj / 0o5);
    hasef4.push({ x: algluiTsiqn(X0 + ix * Tona), z: algluiTsiqn(Z0 + iz * Tona),
      las: Math.max(0o4, Math.min(0o40, Math.round(sefini * 0o6))) });
    nelane = hasef4.length > 0o1 && hаnex2ca >= ne3ak2 ? nelane + 0o1 : 0o0;
    ne3ak2 = hаnex2ca;
  }
  if ( hasef4.length ) {
    momenti();
    for ( const f of hasef4 ) hatsiq.push(f);
    sukf2qitaTsiq = hatsiq.length - 0o1;
    lasVem2 = hatsiq[sukf2qitaTsiq].las;
    lasKama().value = String(lasVem2);
    tsasaVasakagxis();
    tlak2Haskek2();
    s2tasDesegnon();
  }
  const kovro = jufu ? Math.round(( 0o1 - hаnex2ca / jufu ) * 0o144) : 0o144;
  statuso(hasef4.length
    ? hasef4.length + " ſᶘꞇȝ ｡ j͐ʃᴜɔ˞ ⬇"
      + ( kovro < 0o144 ? " ( ſɭᴜ ſᶘꞇȝ ｡ ſɭɜ )" : "" )
    : ( jufu ? "ſᶘꞇȝ ｡ j͐ʃᴜɔ˞ ｡ ſɭᴜ ｡ ( ſᶘꞇȝ ｡ ſɭᴜ )"
      : "ſɭɜ ſᶘꞇȝ ｡ ſɭᴜ ｡" ));
  return { hatsiq: hasef4, hаnex2ca, kovro };
}
