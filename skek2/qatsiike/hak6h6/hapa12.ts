// ≺⧼ j͑ʃᴜ ſɟɹƽ ꞁȷ̀ᴜ }ʃꞇ ʌ ſןᴜ ſᶘɹ 🔲 ⧽≻
import * as THREE from "three";
import { ANGULATSALETSALIRO, kf2GeometriajnHabakaweKatoman, kf2Hak6h6nHapukek } from "./habakaweKatoma.js";
import { kf2Tap2Vem2n, tamc2kBrakHal6da, k6h6TeruDeVeb6kek,
  type Tap2Vem2 } from "./haqoxa.js";
import { tamc2kHavem2 } from "./veb6kek-havem2.js";
import { surGrid, K6H6ABORDASEFINI, K6H6ADIORITAP2SOMANI, K6H6AEKSTERAP2SOMANI,
  K6H6AKMARL6DA, K6H6ATRUAP2SOMANI } from "./havecax2l.js";

// ⟪ ſɭᴜ ſןᴜ , ꞙɭı 🧭 ⟫
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı , ⟅ ꞙɭı , ꞙɭэ , ꞙɭı ,
//   ꞙɭı , ꞙɭꞟꞟ , ꞙɭıцɿ , ꞙɭı , ꞙɭɔ , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭɔ , ꞙɭı , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
const DUOBLAPI = Math.PI * 0o2;
// ⟨ ſןɔ˞ᴜƴ , ꞙɭı 📏 ⟩ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭцɿ , ꞙɭı , ⟅ ⟩
const ANGULATONA = 0o1 / 0o40;
const ANGULATOLERO = 0o1 / 0o1000;

export interface Knece {
  ang: number;
  ux: number;
  uz: number;
  nx: number;
  nz: number;
  // ⟨ ꞙɭı , ꞙɭı , ſɭэ ֭ſɭэ 🛣️ ⟩ , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ꞙɭɔ , ꞙɭı , ⟅ ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭɔ , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  p2somani: number;
  // ⟨ ꞙɭı , ꞙɭı , ꞙɭı 📏 ⟩ , ꞙɭı , ꞙɭı , ⟅ ⟩
  p6sca: number;
}

// ⟪ }ʃɹƽ , ꞙɭı 📐 ⟫
/* }ʃɹƽ , ꞙɭɔ , ꞙɭɿπ , ꞙɭı ,
    @param tafkaq ( number ) - }ʃɹƽ , ꞙɭı ,
@returns tafkaq ( number ) - }ʃɹƽ , [ ꞙɭɔ , ꞙɭɿπ ) */
function normAng(tafkaq: number): number {
  const r = tafkaq % DUOBLAPI;
  return r < 0o0 ? r + DUOBLAPI : r;
}

// ⟪ }ʃɹƽ , ꞙɭı 📐 ⟫
/* }ʃɹƽ , ꞙɭɿ , ꞙɭı ,
    @param a, b ( number ) - }ʃɹƽ , ꞙɭı ,
@returns sama ( boolean ) - ꞙɭı , ANGULATOLERO */
function samaAng(a: number, b: number): boolean {
  const d = Math.abs(normAng(a) - normAng(b));
  return Math.min(d, DUOBLAPI - d) < ANGULATOLERO;
}

// ⟪ ꞙɭı , ꞙɭı 📏 ⟫
/* ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
    @param hac2w2q ( [ number , number ] [ ] ) - ꞙɭı , ꞙɭı ,
@returns knece ( Knece [ ] ) - ꞙɭı , ꞙɭı , */
function hakneceElHac2w2q(hac2w2q: readonly [ number, number ][], p2somani: number): Knece[] {
  const rez: Knece[] = [];
  const p6sca = p2somani + K6H6ABORDASEFINI;
  for ( const [ dx, dz ] of hac2w2q ) {
    const sahakani = Math.hypot(dx, dz);
    if ( sahakani < ANGULATOLERO ) continue;
    const ux = dx / sahakani, uz = dz / sahakani;
    const ang = normAng(Math.atan2(uz, ux));
    if ( rez.some(b => samaAng(b.ang, ang)) ) continue;
    rez.push({ ang, ux, uz, nx: -uz, nz: ux, p2somani, p6sca });
  }
  rez.sort(( a, b ) => a.ang - b.ang);
  return rez;
}

// ⟪ ꞙɭı , ꞙɭı , ꞙɭı 📏 ⟫
/* ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭɔ , ꞙɭı , ꞙɭı ,
    @param pukxea ( [ number , number ] ) - }ʃɹƽ , ( x , z ) ,
    @param s2sabo ( number ) - ſɭᴜ ſןᴜ , ꞙɭı ,
@returns knece ( Knece [ ] ) - ꞙɭı , ꞙɭı , */
function hakneceElHanece3e(pukxea: [ number, number ], s2sabo: number, p2somani: number): Knece[] {
  const kos = Math.cos(s2sabo), sin = Math.sin(s2sabo);
  const lokaj: [ number, number ][] = [];
  if ( pukxea[0o0] !== 0o1 ) lokaj.push([ 0o1, 0o0 ]);
  if ( pukxea[0o0] !== -0o1 ) lokaj.push([ -0o1, 0o0 ]);
  if ( pukxea[0o1] !== 0o1 ) lokaj.push([ 0o0, 0o1 ]);
  if ( pukxea[0o1] !== -0o1 ) lokaj.push([ 0o0, -0o1 ]);
  return hakneceElHac2w2q(lokaj.map(([ lx, lz ]) =>
    [ kos * lx - sin * lz, sin * lx + kos * lz ] as [ number, number ]), p2somani);
}

// ⟪ ſɭᴜ ſɭˬꞇƽ , ſɭэ ֭ſɭэ 📏 ⟫
/* ꞙɭı , ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭı ,
    @param knece ( Knece ) - ſɭэ ֭ſɭэ , ꞙɭı ,
    @param p2somani ( number ) - ꞙɭı , ꞙɭı ,
    @param tafkaq ( number ) - }ʃɹƽ , ꞙɭı ,
@returns ka5ik ( number ) - ꞙɭı , ꞙɭı , ꞙɭɔ , */
function siitsiiKa5ik(knece: Knece, p2somani: number, tafkaq: number): number {
  const rel = normAng(tafkaq - knece.ang);
  const m6na = Math.cos(rel);
  if ( m6na <= ANGULATOLERO ) return 0o0;
  const vek2fe = Math.abs(Math.sin(rel));
  const tlakakani = K6H6ATRUAP2SOMANI / m6na;
  const pukaz = vek2fe > ANGULATOLERO ? p2somani / vek2fe : Infinity;
  return Math.min(tlakakani, pukaz);
}

// ⟪ ſȷƽᴜ ʃɔ , }ʃɹƽ 📐 ⟫
interface Fileto {
  cx: number;
  cz: number;
  rTop: number;
  rOut: number;
  phi0: number;
  delta: number;
}

// ⟪ }ʃɹƽ , ꞙɭı 📐 ⟫
/* }ʃɹƽ , ( -π , π ] , ꞙɭı ,
    @param a, b ( number ) - }ʃɹƽ , ꞙɭı ,
@returns delta ( number ) - }ʃɹƽ , b , a */
function angulaDiferenco(a: number, b: number): number {
  let d = ( a - b ) % DUOBLAPI;
  if ( d > Math.PI ) d -= DUOBLAPI;
  if ( d <= -Math.PI ) d += DUOBLAPI;
  return d;
}

// ⟪ ſȷƽᴜ ʃɔ , ꞙɭı 📏 ⟫
/* ſȷƽᴜ ʃɔ , ꞙɭı , ꞙɭı , ꞙɭı ,
   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
    @param xaqadi, p2sadi ( Knece ) - ꞙɭı , ꞙɭı ,
    @param delta ( number ) - }ʃɹƽ , ꞙɭı , ꞙɭı ,
@returns fileto ( Fileto | null ) - ſȷƽᴜ ʃɔ , null , ꞙɭɔ , ꞙɭı , */
function filetoPor(xaqadi: Knece, p2sadi: Knece, delta: number): Fileto | null {
  if ( delta >= Math.PI - ANGULATOLERO ) return null;
  const det = xaqadi.ux * p2sadi.uz - xaqadi.uz * p2sadi.ux;
  if ( det <= ANGULATOLERO ) return null;
  const cx = ( K6H6ATRUAP2SOMANI * p2sadi.uz - xaqadi.uz * K6H6ATRUAP2SOMANI ) / det;
  const cz = ( xaqadi.ux * K6H6ATRUAP2SOMANI - K6H6ATRUAP2SOMANI * p2sadi.ux ) / det;
  // ⟨ ꞙɭı , ꞙɭı 📏 ⟩ , ꞙɭɔ , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭɔ , ꞙɭı , ⟅ 📃 ⟩
  const t = ( cx - xaqadi.ux * K6H6ATRUAP2SOMANI ) * xaqadi.nx
    + ( cz - xaqadi.uz * K6H6ATRUAP2SOMANI ) * xaqadi.nz;
  if ( t <= xaqadi.p6sca + ANGULATOLERO ) return null;
  const rTop = t - xaqadi.p2somani;
  const rOut = t - xaqadi.p6sca;
  if ( rTop <= ANGULATOLERO || rOut <= ANGULATOLERO ) return null;
  const p0x = xaqadi.ux * K6H6ATRUAP2SOMANI + xaqadi.nx * xaqadi.p2somani;
  const p0z = xaqadi.uz * K6H6ATRUAP2SOMANI + xaqadi.nz * xaqadi.p2somani;
  const p1x = p2sadi.ux * K6H6ATRUAP2SOMANI - p2sadi.nx * p2sadi.p2somani;
  const p1z = p2sadi.uz * K6H6ATRUAP2SOMANI - p2sadi.nz * p2sadi.p2somani;
  const phi0 = Math.atan2(p0z - cz, p0x - cx);
  const phi1 = Math.atan2(p1z - cz, p1x - cx);
  return { cx, cz, rTop, rOut, phi0, delta: angulaDiferenco(phi1, phi0) };
}

// ⟪ ſɭᴜ ſɭˬꞇƽ , ſȷƽᴜ ʃɔ 📏 ⟫
/* ꞙɭı , ſȷƽᴜ ʃɔ , ꞙɭı , ꞙɭı ,
    @param fileto ( Fileto ) - ſȷƽᴜ ʃɔ , ꞙɭı ,
    @param r ( number ) - ꞙɭı , ſȷƽᴜ ʃɔ ,
    @param tafkaq ( number ) - }ʃɹƽ , ꞙɭı ,
@returns ka5ik ( number ) - ꞙɭı , ꞙɭɔ , ꞙɭı , */
function filetaKa5ik(fileto: Fileto, r: number, tafkaq: number): number {
  const kos = Math.cos(tafkaq), sin = Math.sin(tafkaq);
  const phaka = fileto.cx * kos + fileto.cz * sin;
  const ken2qk2h2 = fileto.cx * fileto.cx + fileto.cz * fileto.cz - r * r;
  const diskriminanto = phaka * phaka - ken2qk2h2;
  if ( diskriminanto < 0o0 ) return 0o0;
  const zace = Math.sqrt(diskriminanto);
  // ⟨ ꞙɭı , ꞙɭɿ , 📏 ⟩ , ſȷƽᴜ ʃɔ , ꞙɭı , ꞙɭɔ , ꞙɭı ,
  //   ꞙɭı , ꞙɭɔ , ꞙɭı , ꞙɭı , ꞙɭɔ , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  for ( const lambda of [ phaka - zace, phaka + zace ] ) {
    if ( lambda <= 0o0 ) continue;
    const phi = Math.atan2(sin * lambda - fileto.cz, kos * lambda - fileto.cx);
    const rel = angulaDiferenco(phi, fileto.phi0);
    if ( fileto.delta >= 0o0 ) {
      if ( rel < -ANGULATOLERO || rel > fileto.delta + ANGULATOLERO ) continue;
    } else {
      if ( rel > ANGULATOLERO || rel < fileto.delta - ANGULATOLERO ) continue;
    }
    return lambda;
  }
  return 0o0;
}

// ⟨ ꞙɭı , ꞙɭı 📏 ⟩ , ꞙɭı , ꞙɭı , ꞙɭı ,
//   ſɭэ ֭ſɭэ , K6H6ATRUAP2SOMANI , ꞙɭɔ , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭɔ ,
//   ꞙɭı , ꞙɭı , ꞙɭɔ , ꞙɭı , ⟅ 📃 ⟩
function kapoKa5ik(haknece: readonly Knece[], tafkaq: number): number {
  let teruni = Infinity;
  for ( const knece of haknece ) {
    const rel = normAng(tafkaq - knece.ang);
    const m6na = Math.cos(rel);
    if ( m6na <= ANGULATOLERO ) continue;
    const tlakakani = K6H6ATRUAP2SOMANI / m6na;
    const vek2fe = Math.abs(Math.sin(rel));
    const pukaz = vek2fe > ANGULATOLERO ? knece.p6sca / vek2fe : Infinity;
    if ( tlakakani <= pukaz + ANGULATOLERO && tlakakani < teruni ) teruni = tlakakani;
  }
  return teruni;
}

// ⟪ ꞙɭı , ꞙɭı , ꞙɭı 📏 ⟫
function teruKa5ik(haknece: readonly Knece[], fileto: Fileto | null, tafkaq: number): number {
  let r = K6H6ADIORITAP2SOMANI;
  for ( const knece of haknece ) {
    r = Math.max(r, knece.p2somani);
    r = Math.max(r, siitsiiKa5ik(knece, knece.p2somani, tafkaq));
  }
  if ( fileto ) r = Math.max(r, filetaKa5ik(fileto, fileto.rTop, tafkaq));
  return r;
}

function eksteraKa5ik(haknece: readonly Knece[], fileto: Fileto | null, tafkaq: number): number {
  let r = K6H6AEKSTERAP2SOMANI;
  for ( const knece of haknece ) {
    r = Math.max(r, knece.p6sca);
    r = Math.max(r, siitsiiKa5ik(knece, knece.p6sca, tafkaq));
  }
  if ( fileto ) r = Math.max(r, filetaKa5ik(fileto, fileto.rOut, tafkaq));
  return r;
}

// ⟪ ꞙɭı , ꞙɭı , ꞙɭı 📐 ⟫
/* ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭɔ ,
    @param a0, a1 ( number ) - ꞙɭı , ꞙɭı , ( a1 > a0 )
    @param hapu3ohk2 ( number [ ] ) - ꞙɭı , ꞙɭı , ꞙɭı ,
@returns hatafkaq ( number [ ] ) - ꞙɭı , ꞙɭı , */
function hatafkaqGap(a0: number, a1: number, hapu3ohk2: readonly number[]): number[] {
  const enaj: number[] = [ a0, a1 ];
  for ( const r of hapu3ohk2 ) {
    for ( const b of [ r - DUOBLAPI, r, r + DUOBLAPI ] ) {
      if ( b > a0 + ANGULATOLERO && b < a1 - ANGULATOLERO ) enaj.push(b);
    }
  }
  enaj.sort(( a, b ) => a - b);
  const rez: number[] = [ enaj[0o0] ];
  for ( let i = 0o1; i < enaj.length; i++ ) {
    const p0 = enaj[i - 0o1], p1 = enaj[i];
    if ( p1 - p0 < ANGULATOLERO ) continue;
    const n = Math.max(0o1, Math.ceil(( p1 - p0 ) / ANGULATONA));
    for ( let k = 0o1; k <= n; k++ ) rez.push(p0 + ( p1 - p0 ) * k / n);
  }
  if ( rez.length < 0o3 ) rez.push(( a0 + a1 ) / 0o2);
  return rez;
}

// ⟪ ſɭᴜ ſןᴜ , ꞙɭı 📏 ⟫
/* ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭɔ , ꞙɭı , ꞙɭэ ,
    @param hac2w2q ( [ number , number ] [ ] ) - ꞙɭı , ꞙɭı , ꞙɭı ,
    @param pukxea ( [ number , number ] | undefined ) - }ʃɹƽ , ꞙɭı ,
    @param s2sabo ( number ) - ſɭᴜ ſןᴜ , ꞙɭı ,
@returns knece ( Knece [ ] ) - ꞙɭı , ꞙɭı , */
export function kf2Haknece(hac2w2q: readonly [ number, number ][],
  pukxea: [ number, number ] | undefined, s2sabo: number,
  p2somani: number = K6H6ADIORITAP2SOMANI): Knece[] {
  const haknece = hakneceElHac2w2q(hac2w2q, p2somani);
  if ( haknece.length ) return haknece;
  // ⟨ ꞙɭɔ , ꞙɭı , 📃 ⟩ , ꞙɭɔ , ꞙɭı , ꞙɭɔ , ꞙɭı , ( ꞙɭɔ , ꞙɭı ,
  //   ꞙɭɔ , ꞙɭı , ꞙɭɔ , ꞙɭı , ) , ꞙɭɔ , ꞙɭэ , ⟅ ꞙɭɔ ,
  //   ꞙɭɔ , K6H6ATRUAP2SOMANI , ꞙɭɔ , ꞙɭɔ , ꞙɭɔ , ⟅ 📃 ⟩
  return hakneceElHanece3e(pukxea ?? [ 0o0, 0o0 ], s2sabo, p2somani);
}

// ⟪ ſɭᴜ ſןᴜ , ꞙɭı 🔲 ⟫
export interface Tap2jPoligonoj {
  hateru: [ number, number ][];
  havem2: [ number, number ][][];
  // ⟨ ɭʃᴜʞ ſɭᴜȝ , ꞙɭı ⟩ , ſɭᴜ ſןᴜ , ꞙɭɔ , ꞙɭı ,
  //   ꞙɭı , j͑ʃᴜ ſɭ,w , ꞙɭı , }ʃɹƽ , ⟅ 📃 ⟩
  hatafkaq: number[];
  rs: number[];
  re: number[];
}

/* ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı ,
    @param knece ( readonly Knece [ ] ) - ſɭᴜ ſןᴜ , ꞙɭı ,
@returns hapoligono ( Tap2jPoligonoj ) - ꞙɭı , ꞙɭı , */
export function kf2Tap2jnPoligonojn(haknece: readonly Knece[]): Tap2jPoligonoj {
  // ⟨ }ʃɹƽ , ꞙɭı 📐 ⟩ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ⟩
  const hapu3ohk2: number[] = [];
  for ( const knece of haknece ) {
    for ( const p2somani of [ knece.p2somani, knece.p6sca ] ) {
      const ofseto = Math.atan(p2somani / K6H6ATRUAP2SOMANI);
      hapu3ohk2.push(normAng(knece.ang + ofseto), normAng(knece.ang - ofseto));
    }
  }
  const n = haknece.length;
  const hateru: [ number, number ][] = [];
  const havem2: [ number, number ][][] = [];
  const hatafkaq: number[] = [];
  const rsCatsara: number[] = [];
  const reCatsara: number[] = [];
  for ( let i = 0o0; i < n; i++ ) {
    const a0 = haknece[i].ang;
    const a1 = i + 0o1 < n ? haknece[i + 0o1].ang : haknece[0o0].ang + DUOBLAPI;
    const delta = a1 - a0;
    const fileto = filetoPor(haknece[i], haknece[( i + 0o1 ) % n], delta);
    const hatafkaqGapCatsara = hatafkaqGap(a0, a1, hapu3ohk2);
    const teruGap: [ number, number ][] = [];
    const siitsiiQaqun2: { rs: number; re: number; kos: number; sin: number; tafkaq: number }[] = [];
    for ( const tafkaq of hatafkaqGapCatsara ) {
      // ⟨ ꞙɭı , ꞙɭı , ſɭэ ֭ſɭэ 📏 ⟩ , ꞙɭı , ꞙɭı , ꞙɭɔ , ꞙɭı , ⟅
      //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
      const limito = Math.min(eksteraKa5ik(haknece, fileto, tafkaq),
        kapoKa5ik(haknece, tafkaq));
      const rs = Math.min(teruKa5ik(haknece, fileto, tafkaq), limito);
      const re = limito;
      const kos = Math.cos(tafkaq), sin = Math.sin(tafkaq);
      teruGap.push([ kos * rs, sin * rs ]);
      siitsiiQaqun2.push({ rs, re, kos, sin, tafkaq });
    }
    for ( let j = 0o0; j < teruGap.length; j++ ) {
      if ( i > 0o0 && j === 0o0 ) continue;
      if ( i + 0o1 === n && j === teruGap.length - 0o1 ) continue;
      hateru.push(teruGap[j]);
      hatafkaq.push(siitsiiQaqun2[j].tafkaq);
      rsCatsara.push(siitsiiQaqun2[j].rs);
      reCatsara.push(siitsiiQaqun2[j].re);
    }
    // ⟨ ꞙɭı , ꞙɭı 📏 ⟩ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭɔ , ꞙɭı ,
    //   ꞙɭɔ , ꞙɭı , ꞙɭɔ , ( ꞙɭı , ꞙɭı ) , ꞙɭı , ꞙɭɔ ,
    //   ꞙɭɔ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
    //   ꞙɭɔ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
    const sefini = siitsiiQaqun2.map(b => b.re - b.rs > ANGULATOLERO);
    let j = 0o0;
    while ( j < siitsiiQaqun2.length ) {
      if ( !sefini[j] ) { j++; continue; }
      let tlakakani = j;
      while ( tlakakani + 0o1 < siitsiiQaqun2.length && sefini[tlakakani + 0o1] ) tlakakani++;
      const xaqadi = Math.max(0o0, j - 0o1);
      const z2hak = Math.min(siitsiiQaqun2.length - 0o1, tlakakani + 0o1);
      j = tlakakani + 0o1;
      if ( z2hak - xaqadi < 0o2 ) continue;
      const hap6sca: [ number, number ][] = [];
      const hac2h2: [ number, number ][] = [];
      for ( let k = xaqadi; k <= z2hak; k++ ) {
        const b = siitsiiQaqun2[k];
        hap6sca.push([ b.kos * b.re, b.sin * b.re ]);
        hac2h2.push([ b.kos * b.rs, b.sin * b.rs ]);
      }
      havem2.push([ ...hap6sca, ...hac2h2.slice(0o1, -0o1).reverse() ]);
    }
  }
  return { hateru, havem2, hatafkaq, rs: rsCatsara, re: reCatsara };
}

// ⟪ ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı 📏 ⟫
/* ꞙɭı , ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭı ,
   ꞙɭı , ꞙɭı , ꞙɭı , ( ꞙɭɔ , ꞙɭı , ꞙɭı ) ,
   ꞙɭı , ꞙɭı , ꞙɭı , ⟅
    @param x, z ( number ) - ꞙɭı , ꞙɭı ,
    @param knece ( readonly Knece [ ] ) - ſɭᴜ ſןᴜ , ꞙɭı ,
    @param heightFn ( function ) - ꞙɭı , j͑ʃᴜ ſɭ,w ,
@returns teru ( number ) - ꞙɭı , j͑ʃᴜ ſɭ,w , ꞙɭı , */
export function tamc2kTap2L6da(x: number, z: number, knece: readonly Knece[],
  heightFn: ( x: number, z: number ) => number): number {
  const hac2w2q = knece.map(b => [ b.ux, b.uz ] as [ number, number ]);
  // ⟨ ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı 📏 ⟩ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭɔ ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  // ⟨ ꞙɭı , ꞙɭı , ꞙɭı 📃 ⟩ , ꞙɭı , K6H6AKMARL6DA ,
  //   ꞙɭı , ꞙɭɔ , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  // ⟨ ꞙɭı , ꞙɭı , ꞙɭı 📏 ⟩ , k6h6TeruDeVeb6kek , K6H6AEKSTERAP2SOMANI ,
  //   ꞙɭı , K6H6ATRUAP2SOMANI , ꞙɭı , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
  //   ꞙɭɔ , = ſɭᴜc̗ ɭʃɜ ſןᴜȝ ꞁȷ̀ᴜꞇ ⟅ ꞙɭı , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  const hapukaz = tamc2kBrakHal6da(x, z, hac2w2q, knece.map(b => b.p2somani), heightFn)
    .filter(Number.isFinite);
  const pukazTeru = hapukaz.length ? Math.max(...hapukaz) : -Infinity;
  return Math.max(
    surGrid(k6h6TeruDeVeb6kek(x, z, hac2w2q, K6H6AEKSTERAP2SOMANI, heightFn).hateru
      - K6H6AKMARL6DA),
    pukazTeru );
}

// ⟪ ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı 📏 ⟫
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı 📃 ⟩ , ſɭᴜ ſןᴜ , ꞙɭɔ , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
export function tamc2kTap2Vem2(x: number, z: number, knece: readonly Knece[],
  heightFn: ( x: number, z: number ) => number): Tap2Vem2 {
  const hac2w2q = knece.map(b => [ b.ux, b.uz ] as [ number, number ]);
  const hap2somani = knece.map(b => b.p2somani);
  const hal6da = tamc2kBrakHal6da(x, z, hac2w2q, hap2somani, heightFn)
    .map(l6da => Number.isFinite(l6da) ? l6da : NaN);
  const fallback = tamc2kTap2L6da(x, z, knece, heightFn);
  return kf2Tap2Vem2n(hac2w2q, hap2somani, hal6da, fallback);
}

export function vepaqIntersekcajnHapa12n(qena: THREE.Scene,
  n2k: [ number, number ][],
  heightFn: ( x: number, z: number ) => number,
  dioritaPukek: THREE.MeshStandardMaterial,
  andezitaPukek: THREE.MeshStandardMaterial,
  hapukxe: Map<string, [ number, number ]> = new Map(),
  s2sabo: Map<string, number> = new Map(),
  hac2w2q: Map<string, [ number, number ][]> = new Map(),
  t6limaFn: ( x: number, z: number ) => number = heightFn,
  hap2somani: Map<string, number> = new Map()
): void {
  if ( n2k.length === 0o0 ) return;
  // ⟨ ꞙɭı , ꞙɭı , 📏 ⟩ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭɔ , ꞙɭı ,
  //   ( -ꞙɭэ , -ꞙɭꞟ ) , ( -ꞙɭɿ , -ꞙɭэ ) , ꞙɭı , ꞙɭɔ ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  const { teruPukek, bordaPukek } = kf2Hak6h6nHapukek(dioritaPukek, andezitaPukek, -0o3, -0o2, -0o1, -0o3);
  const habakaweKatoma = kf2GeometriajnHabakaweKatoman();
  for ( const [ x, z ] of n2k ) {
    const ca3aq = x + "," + z;
    const knece = kf2Haknece(hac2w2q.get(ca3aq) ?? [], hapukxe.get(ca3aq),
      s2sabo.get(ca3aq) ?? 0o0, hap2somani.get(ca3aq) ?? K6H6ADIORITAP2SOMANI);
    // ⟪ ſɭᴜ ſןᴜ , ꞙɭı 📏 ⟫
    // ⟨ ꞙɭı , ꞙɭı , 📃 ⟩ , vepaqHak6h6n , ꞙɭı ,
    //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
    //   ꞙɭı , ꞙɭɔ , ꞙɭɔ , ꞙɭɔ , ꞙɭɔ ,
    //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
    const reg = tamc2kHavem2.get(ca3aq);
    const tap2L6da = reg ? reg.l6da
      : surGrid(tamc2kTap2Vem2(x, z, knece, heightFn).l6da);
    const hapoligono = kf2Tap2jnPoligonojn(knece);
    const vem2 = hapoligono.hateru.length;
    if ( vem2 < 0o3 ) continue;
    const eksterajHaxekuxa: [ number, number ][] = hapoligono.hatafkaq.map((tafkaq, k) =>
      [ Math.cos(tafkaq) * hapoligono.re[k], Math.sin(tafkaq) * hapoligono.re[k] ]);
    // ⟨ ꞙɭı , ꞙɭı 📏 ⟩ , ſɭᴜ ſןᴜ , ꞙɭɔ , ꞙɭɔ ,
    //   ꞙɭı , ꞙɭı , ( ꞙɭı , ꞙɭɔ ) , ꞙɭɔ , ⟅ 📃 ⟩
    const maltik = eksterajHaxekuxa.map(p =>
      Math.min(tap2L6da, t6limaFn(x + p[0o0], z + p[0o1])) - ANGULATSALETSALIRO);
    const sost2Maltik = Math.min(tap2L6da - ANGULATSALETSALIRO, ...maltik);
    // ⟨ j͐ʃƽɜ 📏 ⟩ , ꞙɭɔ , j͐ʃƽɜ , ( x , z ) ,
    //   ꞙɭı , ꞙɭɔ , ꞙɭı , ( ꞙɭı , ꞙɭı ) , ⟅ 📃 ⟩
    const hakekaf2: number[] = [ 0o0 ];
    for ( let k = 0o1; k < vem2; k++ )
      hakekaf2.push(hakekaf2[k - 0o1] + Math.max(0o0,
        hapoligono.hatafkaq[k] - hapoligono.hatafkaq[k - 0o1]) * hapoligono.re[k]);
    const tutaArko = hakekaf2[vem2 - 0o1] + Math.max(0o0,
      hapoligono.hatafkaq[0o0] + DUOBLAPI - hapoligono.hatafkaq[vem2 - 0o1]) * hapoligono.re[0o0];
    // ⟨ ꞙɭэ , 🧱 ⟩ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
    type P3 = [ number, number, number ];
    type UV = [ number, number ];
    const teruHaxekuxa: number[] = [], teruUV: number[] = [];
    const bordajHaxekuxa: number[] = [], bordajUV: number[] = [];
    const tri = ( haxekuxa: number[], uv: number[], a: P3, b: P3, c: P3,
      ua: UV, ub: UV, uc: UV ): void => {
      haxekuxa.push(a[0o0], a[0o1], a[0o2], b[0o0], b[0o1], b[0o2], c[0o0], c[0o1], c[0o2]);
      uv.push(ua[0o0], ua[0o1], ub[0o0], ub[0o1], uc[0o0], uc[0o1]);
    };
    const b6vakanta = ( p: P3 ): UV => [ p[0o0], p[0o2] ];
    const flanka = ( p: P3, kekaf2: number ): UV => [ kekaf2, p[0o1] ];
    const n2k = ( k: number, r: number, y: number ): P3 =>
      [ x + Math.cos(hapoligono.hatafkaq[k]) * r, y, z + Math.sin(hapoligono.hatafkaq[k]) * r ];
    const sost2TeruP: P3 = [ x, tap2L6da, z ];
    const sost2Kozunu: P3 = [ x, sost2Maltik, z ];
    for ( let k = 0o0; k < vem2; k++ ) {
      const k2 = ( k + 0o1 ) % vem2;
      const arko2 = k2 === 0o0 ? tutaArko : hakekaf2[k2];
      const ena = n2k(k, hapoligono.rs[k], tap2L6da);
      const ena2 = n2k(k2, hapoligono.rs[k2], tap2L6da);
      const p6sca = n2k(k, hapoligono.re[k], tap2L6da);
      const ekstera2 = n2k(k2, hapoligono.re[k2], tap2L6da);
      const uEna = b6vakanta(ena), uEna2 = b6vakanta(ena2),
        uEkstera = b6vakanta(p6sca), uEkstera2 = b6vakanta(ekstera2);
      // ⟨ ꞙɭı , ꞙɭı , ꞙɭı 📐 ⟩ ,
      tri(teruHaxekuxa, teruUV, sost2TeruP, ena2, ena,
        b6vakanta(sost2TeruP), uEna2, uEna);
      // ⟨ ꞙɭı , ꞙɭı , ꞙɭı 📐 ⟩ ,
      tri(bordajHaxekuxa, bordajUV, ena, ena2, ekstera2, uEna, uEna2, uEkstera2);
      tri(bordajHaxekuxa, bordajUV, ena, ekstera2, p6sca, uEna, uEkstera2, uEkstera);
      // ⟨ ꞙɭı , ꞙɭɔ , ꞙɭı 📐 ⟩ ,
      const kozuni = n2k(k, hapoligono.re[k], maltik[k]);
      const kozunu2 = n2k(k2, hapoligono.re[k2], maltik[k2]);
      const ua = flanka(kozuni, hakekaf2[k]), ue = flanka(p6sca, hakekaf2[k]),
        ue2 = flanka(ekstera2, arko2), ub2 = flanka(kozunu2, arko2);
      tri(bordajHaxekuxa, bordajUV, kozuni, p6sca, ekstera2, ua, ue, ue2);
      tri(bordajHaxekuxa, bordajUV, kozuni, ekstera2, kozunu2, ua, ue2, ub2);
      // ⟨ ꞙɭɔ , ꞙɭı 📐 ⟩ ,
      tri(teruHaxekuxa, teruUV, sost2Kozunu, kozuni, kozunu2,
        b6vakanta(sost2Kozunu), b6vakanta(kozuni), b6vakanta(kozunu2));
    }
    // ⟨ ꞙɭɔ , 🪨 ⟩ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , j͐ʃƽɜ ,
    //   j͐ʃƽɜ , ꞙɭı , j͐ʃƽɜ ( ꞙɭɔ , ꞙɭɔ ) , ꞙɭı , ꞙɭı ,
    //   j͐ʃƽɜ , ( x , z ) , ꞙɭı , ꞙɭı , j͐ʃƽɜ , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
    const alglui = ( haxekuxa: number[], uv: number[],
      pukek: THREE.MeshStandardMaterial ): void => {
      if ( haxekuxa.length < 0o11 ) return;
      const zace = new THREE.BufferGeometry();
      zace.setAttribute("position", new THREE.Float32BufferAttribute(haxekuxa, 0o3));
      zace.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 0o2));
      zace.computeVertexNormals();
      habakaweKatoma.tlunakani(zace, pukek, new THREE.Matrix4());
    };
    alglui(teruHaxekuxa, teruUV, teruPukek);
    alglui(bordajHaxekuxa, bordajUV, bordaPukek);
  }
  habakaweKatoma.veb6kek(qena, false);
}
