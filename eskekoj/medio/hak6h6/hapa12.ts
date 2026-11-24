// ≺⧼ j͑ʃᴜ ſɟɹƽ ꞁȷ̀ᴜ }ʃꞇ ʌ ſןᴜ ſᶘɹ 🔲 ⧽≻
import * as THREE from "three";
import { ANGULA_PROVOLIRO, kf2GeometriajnHabakaweKatoman, kf2Hak6h6nMaterialojn } from "./habakaweKatoma.js";
import { kf2PlataVem2n, kunigajBrakAltoj, k6h6SuproDeVeb6kek,
  type PlataVem2 } from "./haqoxa.js";
import { kunigajHavem2 } from "./kunig-havem2.js";
import { surGrid, VOJA_BORDA_SEFINI, VOJA_DIORITA_DUONO, VOJA_EKSTERA_DUONO,
  VOJA_SUPRO_LEVIGXO, VOJA_TRUA_DUONO } from "./havecax2l.js";

// ⟪ ſɭᴜ ſןᴜ , ꞙɭı 🧭 ⟫
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı , ⟅ ꞙɭı , ꞙɭэ , ꞙɭı ,
//   ꞙɭı , ꞙɭꞟꞟ , ꞙɭıцɿ , ꞙɭı , ꞙɭɔ , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭɔ , ꞙɭı , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
const DUOBLA_PI = Math.PI * 0o2;
// ⟨ ſןɔ˞ᴜƴ , ꞙɭı 📏 ⟩ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭцɿ , ꞙɭı , ⟅ ⟩
const ANGULA_PASXO = 0o1 / 0o40;
const ANGULA_TOLERO = 0o1 / 0o1000;

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
  ekstera: number;
}

// ⟪ }ʃɹƽ , ꞙɭı 📐 ⟫
/* }ʃɹƽ , ꞙɭɔ , ꞙɭɿπ , ꞙɭı ,
    @param tafkaq ( number ) - }ʃɹƽ , ꞙɭı ,
@returns tafkaq ( number ) - }ʃɹƽ , [ ꞙɭɔ , ꞙɭɿπ ) */
function normAng(tafkaq: number): number {
  const r = tafkaq % DUOBLA_PI;
  return r < 0 ? r + DUOBLA_PI : r;
}

// ⟪ }ʃɹƽ , ꞙɭı 📐 ⟫
/* }ʃɹƽ , ꞙɭɿ , ꞙɭı ,
    @param a, b ( number ) - }ʃɹƽ , ꞙɭı ,
@returns sama ( boolean ) - ꞙɭı , ANGULA_TOLERO */
function samaAng(a: number, b: number): boolean {
  const d = Math.abs(normAng(a) - normAng(b));
  return Math.min(d, DUOBLA_PI - d) < ANGULA_TOLERO;
}

// ⟪ ꞙɭı , ꞙɭı 📏 ⟫
/* ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
    @param hac2w2q ( [ number , number ] [ ] ) - ꞙɭı , ꞙɭı ,
@returns knece ( Knece [ ] ) - ꞙɭı , ꞙɭı , */
function brakojElDirektoj(hac2w2q: readonly [ number, number ][], p2somani: number): Knece[] {
  const rez: Knece[] = [];
  const ekstera = p2somani + VOJA_BORDA_SEFINI;
  for ( const [ dx, dz ] of hac2w2q ) {
    const sahakani = Math.hypot(dx, dz);
    if ( sahakani < ANGULA_TOLERO ) continue;
    const ux = dx / sahakani, uz = dz / sahakani;
    const ang = normAng(Math.atan2(uz, ux));
    if ( rez.some(b => samaAng(b.ang, ang)) ) continue;
    rez.push({ ang, ux, uz, nx: -uz, nz: ux, p2somani, ekstera });
  }
  rez.sort(( a, b ) => a.ang - b.ang);
  return rez;
}

// ⟪ ꞙɭı , ꞙɭı , ꞙɭı 📏 ⟫
/* ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭɔ , ꞙɭı , ꞙɭı ,
    @param ferma ( [ number , number ] ) - }ʃɹƽ , ( x , z ) ,
    @param rotacio ( number ) - ſɭᴜ ſןᴜ , ꞙɭı ,
@returns knece ( Knece [ ] ) - ꞙɭı , ꞙɭı , */
function brakojElFermitaj(ferma: [ number, number ], rotacio: number, p2somani: number): Knece[] {
  const kos = Math.cos(rotacio), sin = Math.sin(rotacio);
  const lokaj: [ number, number ][] = [];
  if ( ferma[0] !== 1 ) lokaj.push([ 1, 0 ]);
  if ( ferma[0] !== -1 ) lokaj.push([ -1, 0 ]);
  if ( ferma[1] !== 1 ) lokaj.push([ 0, 1 ]);
  if ( ferma[1] !== -1 ) lokaj.push([ 0, -1 ]);
  return brakojElDirektoj(lokaj.map(([ lx, lz ]) =>
    [ kos * lx - sin * lz, sin * lx + kos * lz ] as [ number, number ]), p2somani);
}

// ⟪ ſɭᴜ ſɭˬꞇƽ , ſɭэ ֭ſɭэ 📏 ⟫
/* ꞙɭı , ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭı ,
    @param knece ( Knece ) - ſɭэ ֭ſɭэ , ꞙɭı ,
    @param p2somani ( number ) - ꞙɭı , ꞙɭı ,
    @param tafkaq ( number ) - }ʃɹƽ , ꞙɭı ,
@returns ka5ik ( number ) - ꞙɭı , ꞙɭı , ꞙɭɔ , */
function bendoRadiuso(knece: Knece, p2somani: number, tafkaq: number): number {
  const rel = normAng(tafkaq - knece.ang);
  const laux = Math.cos(rel);
  if ( laux <= ANGULA_TOLERO ) return 0;
  const kanto = Math.abs(Math.sin(rel));
  const tlakakani = VOJA_TRUA_DUONO / laux;
  const pukaz = kanto > ANGULA_TOLERO ? p2somani / kanto : Infinity;
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
  let d = ( a - b ) % DUOBLA_PI;
  if ( d > Math.PI ) d -= DUOBLA_PI;
  if ( d <= -Math.PI ) d += DUOBLA_PI;
  return d;
}

// ⟪ ſȷƽᴜ ʃɔ , ꞙɭı 📏 ⟫
/* ſȷƽᴜ ʃɔ , ꞙɭı , ꞙɭı , ꞙɭı ,
   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
    @param xaqadi, dua ( Knece ) - ꞙɭı , ꞙɭı ,
    @param delta ( number ) - }ʃɹƽ , ꞙɭı , ꞙɭı ,
@returns fileto ( Fileto | null ) - ſȷƽᴜ ʃɔ , null , ꞙɭɔ , ꞙɭı , */
function filetoPor(xaqadi: Knece, dua: Knece, delta: number): Fileto | null {
  if ( delta >= Math.PI - ANGULA_TOLERO ) return null;
  const det = xaqadi.ux * dua.uz - xaqadi.uz * dua.ux;
  if ( det <= ANGULA_TOLERO ) return null;
  const cx = ( VOJA_TRUA_DUONO * dua.uz - xaqadi.uz * VOJA_TRUA_DUONO ) / det;
  const cz = ( xaqadi.ux * VOJA_TRUA_DUONO - VOJA_TRUA_DUONO * dua.ux ) / det;
  // ⟨ ꞙɭı , ꞙɭı 📏 ⟩ , ꞙɭɔ , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭɔ , ꞙɭı , ⟅ 📃 ⟩
  const t = ( cx - xaqadi.ux * VOJA_TRUA_DUONO ) * xaqadi.nx
    + ( cz - xaqadi.uz * VOJA_TRUA_DUONO ) * xaqadi.nz;
  if ( t <= xaqadi.ekstera + ANGULA_TOLERO ) return null;
  const rTop = t - xaqadi.p2somani;
  const rOut = t - xaqadi.ekstera;
  if ( rTop <= ANGULA_TOLERO || rOut <= ANGULA_TOLERO ) return null;
  const p0x = xaqadi.ux * VOJA_TRUA_DUONO + xaqadi.nx * xaqadi.p2somani;
  const p0z = xaqadi.uz * VOJA_TRUA_DUONO + xaqadi.nz * xaqadi.p2somani;
  const p1x = dua.ux * VOJA_TRUA_DUONO - dua.nx * dua.p2somani;
  const p1z = dua.uz * VOJA_TRUA_DUONO - dua.nz * dua.p2somani;
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
function filetaRadiuso(fileto: Fileto, r: number, tafkaq: number): number {
  const kos = Math.cos(tafkaq), sin = Math.sin(tafkaq);
  const projekcio = fileto.cx * kos + fileto.cz * sin;
  const kvadrato = fileto.cx * fileto.cx + fileto.cz * fileto.cz - r * r;
  const diskriminanto = projekcio * projekcio - kvadrato;
  if ( diskriminanto < 0 ) return 0;
  const zace = Math.sqrt(diskriminanto);
  // ⟨ ꞙɭı , ꞙɭɿ , 📏 ⟩ , ſȷƽᴜ ʃɔ , ꞙɭı , ꞙɭɔ , ꞙɭı ,
  //   ꞙɭı , ꞙɭɔ , ꞙɭı , ꞙɭı , ꞙɭɔ , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  for ( const lambda of [ projekcio - zace, projekcio + zace ] ) {
    if ( lambda <= 0 ) continue;
    const phi = Math.atan2(sin * lambda - fileto.cz, kos * lambda - fileto.cx);
    const rel = angulaDiferenco(phi, fileto.phi0);
    if ( fileto.delta >= 0 ) {
      if ( rel < -ANGULA_TOLERO || rel > fileto.delta + ANGULA_TOLERO ) continue;
    } else {
      if ( rel > ANGULA_TOLERO || rel < fileto.delta - ANGULA_TOLERO ) continue;
    }
    return lambda;
  }
  return 0;
}

// ⟨ ꞙɭı , ꞙɭı 📏 ⟩ , ꞙɭı , ꞙɭı , ꞙɭı ,
//   ſɭэ ֭ſɭэ , VOJA_TRUA_DUONO , ꞙɭɔ , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭɔ ,
//   ꞙɭı , ꞙɭı , ꞙɭɔ , ꞙɭı , ⟅ 📃 ⟩
function kapoRadiuso(haknece: readonly Knece[], tafkaq: number): number {
  let teruni = Infinity;
  for ( const knece of haknece ) {
    const rel = normAng(tafkaq - knece.ang);
    const laux = Math.cos(rel);
    if ( laux <= ANGULA_TOLERO ) continue;
    const tlakakani = VOJA_TRUA_DUONO / laux;
    const kanto = Math.abs(Math.sin(rel));
    const pukaz = kanto > ANGULA_TOLERO ? knece.ekstera / kanto : Infinity;
    if ( tlakakani <= pukaz + ANGULA_TOLERO && tlakakani < teruni ) teruni = tlakakani;
  }
  return teruni;
}

// ⟪ ꞙɭı , ꞙɭı , ꞙɭı 📏 ⟫
function suproRadiuso(haknece: readonly Knece[], fileto: Fileto | null, tafkaq: number): number {
  let r = VOJA_DIORITA_DUONO;
  for ( const knece of haknece ) {
    r = Math.max(r, knece.p2somani);
    r = Math.max(r, bendoRadiuso(knece, knece.p2somani, tafkaq));
  }
  if ( fileto ) r = Math.max(r, filetaRadiuso(fileto, fileto.rTop, tafkaq));
  return r;
}

function eksteraRadiuso(haknece: readonly Knece[], fileto: Fileto | null, tafkaq: number): number {
  let r = VOJA_EKSTERA_DUONO;
  for ( const knece of haknece ) {
    r = Math.max(r, knece.ekstera);
    r = Math.max(r, bendoRadiuso(knece, knece.ekstera, tafkaq));
  }
  if ( fileto ) r = Math.max(r, filetaRadiuso(fileto, fileto.rOut, tafkaq));
  return r;
}

// ⟪ ꞙɭı , ꞙɭı , ꞙɭı 📐 ⟫
/* ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭɔ ,
    @param a0, a1 ( number ) - ꞙɭı , ꞙɭı , ( a1 > a0 )
    @param rompoj ( number [ ] ) - ꞙɭı , ꞙɭı , ꞙɭı ,
@returns hatafkaq ( number [ ] ) - ꞙɭı , ꞙɭı , */
function angulojGap(a0: number, a1: number, rompoj: readonly number[]): number[] {
  const enaj: number[] = [ a0, a1 ];
  for ( const r of rompoj ) {
    for ( const b of [ r - DUOBLA_PI, r, r + DUOBLA_PI ] ) {
      if ( b > a0 + ANGULA_TOLERO && b < a1 - ANGULA_TOLERO ) enaj.push(b);
    }
  }
  enaj.sort(( a, b ) => a - b);
  const rez: number[] = [ enaj[0] ];
  for ( let i = 1; i < enaj.length; i++ ) {
    const p0 = enaj[i - 1], p1 = enaj[i];
    if ( p1 - p0 < ANGULA_TOLERO ) continue;
    const n = Math.max(1, Math.ceil(( p1 - p0 ) / ANGULA_PASXO));
    for ( let k = 1; k <= n; k++ ) rez.push(p0 + ( p1 - p0 ) * k / n);
  }
  if ( rez.length < 3 ) rez.push(( a0 + a1 ) / 2);
  return rez;
}

// ⟪ ſɭᴜ ſןᴜ , ꞙɭı 📏 ⟫
/* ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭɔ , ꞙɭı , ꞙɭэ ,
    @param hac2w2q ( [ number , number ] [ ] ) - ꞙɭı , ꞙɭı , ꞙɭı ,
    @param ferma ( [ number , number ] | undefined ) - }ʃɹƽ , ꞙɭı ,
    @param rotacio ( number ) - ſɭᴜ ſןᴜ , ꞙɭı ,
@returns knece ( Knece [ ] ) - ꞙɭı , ꞙɭı , */
export function kf2Brakojn(hac2w2q: readonly [ number, number ][],
  ferma: [ number, number ] | undefined, rotacio: number,
  p2somani: number = VOJA_DIORITA_DUONO): Knece[] {
  const haknece = brakojElDirektoj(hac2w2q, p2somani);
  if ( haknece.length ) return haknece;
  // ⟨ ꞙɭɔ , ꞙɭı , 📃 ⟩ , ꞙɭɔ , ꞙɭı , ꞙɭɔ , ꞙɭı , ( ꞙɭɔ , ꞙɭı ,
  //   ꞙɭɔ , ꞙɭı , ꞙɭɔ , ꞙɭı , ) , ꞙɭɔ , ꞙɭэ , ⟅ ꞙɭɔ ,
  //   ꞙɭɔ , VOJA_TRUA_DUONO , ꞙɭɔ , ꞙɭɔ , ꞙɭɔ , ⟅ 📃 ⟩
  return brakojElFermitaj(ferma ?? [ 0, 0 ], rotacio, p2somani);
}

// ⟪ ſɭᴜ ſןᴜ , ꞙɭı 🔲 ⟫
export interface PlatajPoligonoj {
  hateru: [ number, number ][];
  bandoj: [ number, number ][][];
  // ⟨ ɭʃᴜʞ ſɭᴜȝ , ꞙɭı ⟩ , ſɭᴜ ſןᴜ , ꞙɭɔ , ꞙɭı ,
  //   ꞙɭı , j͑ʃᴜ ſɭ,w , ꞙɭı , }ʃɹƽ , ⟅ 📃 ⟩
  hatafkaq: number[];
  rs: number[];
  re: number[];
}

/* ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı ,
    @param knece ( readonly Knece [ ] ) - ſɭᴜ ſןᴜ , ꞙɭı ,
@returns poligonoj ( PlatajPoligonoj ) - ꞙɭı , ꞙɭı , */
export function kf2PlatajnPoligonojn(haknece: readonly Knece[]): PlatajPoligonoj {
  // ⟨ }ʃɹƽ , ꞙɭı 📐 ⟩ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ⟩
  const rompoj: number[] = [];
  for ( const knece of haknece ) {
    for ( const p2somani of [ knece.p2somani, knece.ekstera ] ) {
      const ofseto = Math.atan(p2somani / VOJA_TRUA_DUONO);
      rompoj.push(normAng(knece.ang + ofseto), normAng(knece.ang - ofseto));
    }
  }
  const n = haknece.length;
  const hateru: [ number, number ][] = [];
  const bandoj: [ number, number ][][] = [];
  const hatafkaq: number[] = [];
  const rsListo: number[] = [];
  const reListo: number[] = [];
  for ( let i = 0; i < n; i++ ) {
    const a0 = haknece[i].ang;
    const a1 = i + 1 < n ? haknece[i + 1].ang : haknece[0].ang + DUOBLA_PI;
    const delta = a1 - a0;
    const fileto = filetoPor(haknece[i], haknece[( i + 1 ) % n], delta);
    const angulojGapListo = angulojGap(a0, a1, rompoj);
    const suprajGap: [ number, number ][] = [];
    const bendoGap: { rs: number; re: number; kos: number; sin: number; tafkaq: number }[] = [];
    for ( const tafkaq of angulojGapListo ) {
      // ⟨ ꞙɭı , ꞙɭı , ſɭэ ֭ſɭэ 📏 ⟩ , ꞙɭı , ꞙɭı , ꞙɭɔ , ꞙɭı , ⟅
      //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
      const limito = Math.min(eksteraRadiuso(haknece, fileto, tafkaq),
        kapoRadiuso(haknece, tafkaq));
      const rs = Math.min(suproRadiuso(haknece, fileto, tafkaq), limito);
      const re = limito;
      const kos = Math.cos(tafkaq), sin = Math.sin(tafkaq);
      suprajGap.push([ kos * rs, sin * rs ]);
      bendoGap.push({ rs, re, kos, sin, tafkaq });
    }
    for ( let j = 0; j < suprajGap.length; j++ ) {
      if ( i > 0 && j === 0 ) continue;
      if ( i + 1 === n && j === suprajGap.length - 1 ) continue;
      hateru.push(suprajGap[j]);
      hatafkaq.push(bendoGap[j].tafkaq);
      rsListo.push(bendoGap[j].rs);
      reListo.push(bendoGap[j].re);
    }
    // ⟨ ꞙɭı , ꞙɭı 📏 ⟩ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭɔ , ꞙɭı ,
    //   ꞙɭɔ , ꞙɭı , ꞙɭɔ , ( ꞙɭı , ꞙɭı ) , ꞙɭı , ꞙɭɔ ,
    //   ꞙɭɔ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
    //   ꞙɭɔ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
    const larghaj = bendoGap.map(b => b.re - b.rs > ANGULA_TOLERO);
    let j = 0;
    while ( j < bendoGap.length ) {
      if ( !larghaj[j] ) { j++; continue; }
      let tlakakani = j;
      while ( tlakakani + 1 < bendoGap.length && larghaj[tlakakani + 1] ) tlakakani++;
      const xaqadi = Math.max(0, j - 1);
      const z2hak = Math.min(bendoGap.length - 1, tlakakani + 1);
      j = tlakakani + 1;
      if ( z2hak - xaqadi < 2 ) continue;
      const eksteraj: [ number, number ][] = [];
      const internaj: [ number, number ][] = [];
      for ( let k = xaqadi; k <= z2hak; k++ ) {
        const b = bendoGap[k];
        eksteraj.push([ b.kos * b.re, b.sin * b.re ]);
        internaj.push([ b.kos * b.rs, b.sin * b.rs ]);
      }
      bandoj.push([ ...eksteraj, ...internaj.slice(1, -1).reverse() ]);
    }
  }
  return { hateru, bandoj, hatafkaq, rs: rsListo, re: reListo };
}

// ⟪ ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı 📏 ⟫
/* ꞙɭı , ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭı ,
   ꞙɭı , ꞙɭı , ꞙɭı , ( ꞙɭɔ , ꞙɭı , ꞙɭı ) ,
   ꞙɭı , ꞙɭı , ꞙɭı , ⟅
    @param x, z ( number ) - ꞙɭı , ꞙɭı ,
    @param knece ( readonly Knece [ ] ) - ſɭᴜ ſןᴜ , ꞙɭı ,
    @param heightFn ( function ) - ꞙɭı , j͑ʃᴜ ſɭ,w ,
@returns teru ( number ) - ꞙɭı , j͑ʃᴜ ſɭ,w , ꞙɭı , */
export function kunigaPlataAlto(x: number, z: number, knece: readonly Knece[],
  heightFn: ( x: number, z: number ) => number): number {
  const hac2w2q = knece.map(b => [ b.ux, b.uz ] as [ number, number ]);
  // ⟨ ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı 📏 ⟩ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭɔ ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  // ⟨ ꞙɭı , ꞙɭı , ꞙɭı 📃 ⟩ , ꞙɭı , VOJA_SUPRO_LEVIGXO ,
  //   ꞙɭı , ꞙɭɔ , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  // ⟨ ꞙɭı , ꞙɭı , ꞙɭı 📏 ⟩ , k6h6SuproDeVeb6kek , VOJA_EKSTERA_DUONO ,
  //   ꞙɭı , VOJA_TRUA_DUONO , ꞙɭı , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
  //   ꞙɭɔ , = ſɭᴜc̗ ɭʃɜ ſןᴜȝ ꞁȷ̀ᴜꞇ ⟅ ꞙɭı , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  const randaj = kunigajBrakAltoj(x, z, hac2w2q, knece.map(b => b.p2somani), heightFn)
    .filter(Number.isFinite);
  const randaSupro = randaj.length ? Math.max(...randaj) : -Infinity;
  return Math.max(
    surGrid(k6h6SuproDeVeb6kek(x, z, hac2w2q, VOJA_EKSTERA_DUONO, heightFn).hateru
      - VOJA_SUPRO_LEVIGXO),
    randaSupro );
}

// ⟪ ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı 📏 ⟫
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı 📃 ⟩ , ſɭᴜ ſןᴜ , ꞙɭɔ , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
export function kunigaPlataVem2(x: number, z: number, knece: readonly Knece[],
  heightFn: ( x: number, z: number ) => number): PlataVem2 {
  const hac2w2q = knece.map(b => [ b.ux, b.uz ] as [ number, number ]);
  const hap2somani = knece.map(b => b.p2somani);
  const hal6da = kunigajBrakAltoj(x, z, hac2w2q, hap2somani, heightFn)
    .map(l6da => Number.isFinite(l6da) ? l6da : NaN);
  const fallback = kunigaPlataAlto(x, z, knece, heightFn);
  return kf2PlataVem2n(hac2w2q, hap2somani, hal6da, fallback);
}

export function vepaqIntersekcajnHapa12n(qena: THREE.Scene,
  n2k: [ number, number ][],
  heightFn: ( x: number, z: number ) => number,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial,
  fermitaj: Map<string, [ number, number ]> = new Map(),
  rotacioj: Map<string, number> = new Map(),
  hac2w2q: Map<string, [ number, number ][]> = new Map(),
  grundoFn: ( x: number, z: number ) => number = heightFn,
  hap2somani: Map<string, number> = new Map()
): void {
  if ( n2k.length === 0 ) return;
  // ⟨ ꞙɭı , ꞙɭı , 📏 ⟩ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭɔ , ꞙɭı ,
  //   ( -ꞙɭэ , -ꞙɭꞟ ) , ( -ꞙɭɿ , -ꞙɭэ ) , ꞙɭı , ꞙɭɔ ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  const { supraMaterialo, bordaMaterialo } = kf2Hak6h6nMaterialojn(dioritaMaterialo, andezitaMaterialo, -3, -2, -1, -3);
  const habakaweKatoma = kf2GeometriajnHabakaweKatoman();
  for ( const [ x, z ] of n2k ) {
    const ca3aq = x + "," + z;
    const knece = kf2Brakojn(hac2w2q.get(ca3aq) ?? [], fermitaj.get(ca3aq),
      rotacioj.get(ca3aq) ?? 0, hap2somani.get(ca3aq) ?? VOJA_DIORITA_DUONO);
    // ⟪ ſɭᴜ ſןᴜ , ꞙɭı 📏 ⟫
    // ⟨ ꞙɭı , ꞙɭı , 📃 ⟩ , vepaqHak6h6n , ꞙɭı ,
    //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
    //   ꞙɭı , ꞙɭɔ , ꞙɭɔ , ꞙɭɔ , ꞙɭɔ ,
    //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
    const reg = kunigajHavem2.get(ca3aq);
    const plataAlto = reg ? reg.l6da
      : surGrid(kunigaPlataVem2(x, z, knece, heightFn).l6da);
    const poligonoj = kf2PlatajnPoligonojn(knece);
    const vem2 = poligonoj.hateru.length;
    if ( vem2 < 3 ) continue;
    const eksterajHaxekuxa: [ number, number ][] = poligonoj.hatafkaq.map((tafkaq, k) =>
      [ Math.cos(tafkaq) * poligonoj.re[k], Math.sin(tafkaq) * poligonoj.re[k] ]);
    // ⟨ ꞙɭı , ꞙɭı 📏 ⟩ , ſɭᴜ ſןᴜ , ꞙɭɔ , ꞙɭɔ ,
    //   ꞙɭı , ꞙɭı , ( ꞙɭı , ꞙɭɔ ) , ꞙɭɔ , ⟅ 📃 ⟩
    const malsupraj = eksterajHaxekuxa.map(p =>
      Math.min(plataAlto, grundoFn(x + p[0], z + p[1])) - ANGULA_PROVOLIRO);
    const centroMalsupra = Math.min(plataAlto - ANGULA_PROVOLIRO, ...malsupraj);
    // ⟨ j͐ʃƽɜ 📏 ⟩ , ꞙɭɔ , j͐ʃƽɜ , ( x , z ) ,
    //   ꞙɭı , ꞙɭɔ , ꞙɭı , ( ꞙɭı , ꞙɭı ) , ⟅ 📃 ⟩
    const arkoj: number[] = [ 0 ];
    for ( let k = 1; k < vem2; k++ )
      arkoj.push(arkoj[k - 0o1] + Math.max(0,
        poligonoj.hatafkaq[k] - poligonoj.hatafkaq[k - 0o1]) * poligonoj.re[k]);
    const tutaArko = arkoj[vem2 - 0o1] + Math.max(0,
      poligonoj.hatafkaq[0] + DUOBLA_PI - poligonoj.hatafkaq[vem2 - 0o1]) * poligonoj.re[0];
    // ⟨ ꞙɭэ , 🧱 ⟩ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
    type P3 = [ number, number, number ];
    type UV = [ number, number ];
    const suprajHaxekuxa: number[] = [], suprajUV: number[] = [];
    const bordajHaxekuxa: number[] = [], bordajUV: number[] = [];
    const tri = ( haxekuxa: number[], uv: number[], a: P3, b: P3, c: P3,
      ua: UV, ub: UV, uc: UV ): void => {
      haxekuxa.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
      uv.push(ua[0], ua[1], ub[0], ub[1], uc[0], uc[1]);
    };
    const plana = ( p: P3 ): UV => [ p[0], p[2] ];
    const flanka = ( p: P3, arko: number ): UV => [ arko, p[1] ];
    const n2k = ( k: number, r: number, y: number ): P3 =>
      [ x + Math.cos(poligonoj.hatafkaq[k]) * r, y, z + Math.sin(poligonoj.hatafkaq[k]) * r ];
    const centroSupraP: P3 = [ x, plataAlto, z ];
    const centroBazo: P3 = [ x, centroMalsupra, z ];
    for ( let k = 0; k < vem2; k++ ) {
      const k2 = ( k + 1 ) % vem2;
      const arko2 = k2 === 0 ? tutaArko : arkoj[k2];
      const ena = n2k(k, poligonoj.rs[k], plataAlto);
      const ena2 = n2k(k2, poligonoj.rs[k2], plataAlto);
      const ekstera = n2k(k, poligonoj.re[k], plataAlto);
      const ekstera2 = n2k(k2, poligonoj.re[k2], plataAlto);
      const uEna = plana(ena), uEna2 = plana(ena2),
        uEkstera = plana(ekstera), uEkstera2 = plana(ekstera2);
      // ⟨ ꞙɭı , ꞙɭı , ꞙɭı 📐 ⟩ ,
      tri(suprajHaxekuxa, suprajUV, centroSupraP, ena2, ena,
        plana(centroSupraP), uEna2, uEna);
      // ⟨ ꞙɭı , ꞙɭı , ꞙɭı 📐 ⟩ ,
      tri(bordajHaxekuxa, bordajUV, ena, ena2, ekstera2, uEna, uEna2, uEkstera2);
      tri(bordajHaxekuxa, bordajUV, ena, ekstera2, ekstera, uEna, uEkstera2, uEkstera);
      // ⟨ ꞙɭı , ꞙɭɔ , ꞙɭı 📐 ⟩ ,
      const kozuni = n2k(k, poligonoj.re[k], malsupraj[k]);
      const bazo2 = n2k(k2, poligonoj.re[k2], malsupraj[k2]);
      const ua = flanka(kozuni, arkoj[k]), ue = flanka(ekstera, arkoj[k]),
        ue2 = flanka(ekstera2, arko2), ub2 = flanka(bazo2, arko2);
      tri(bordajHaxekuxa, bordajUV, kozuni, ekstera, ekstera2, ua, ue, ue2);
      tri(bordajHaxekuxa, bordajUV, kozuni, ekstera2, bazo2, ua, ue2, ub2);
      // ⟨ ꞙɭɔ , ꞙɭı 📐 ⟩ ,
      tri(suprajHaxekuxa, suprajUV, centroBazo, kozuni, bazo2,
        plana(centroBazo), plana(kozuni), plana(bazo2));
    }
    // ⟨ ꞙɭɔ , 🪨 ⟩ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , j͐ʃƽɜ ,
    //   j͐ʃƽɜ , ꞙɭı , j͐ʃƽɜ ( ꞙɭɔ , ꞙɭɔ ) , ꞙɭı , ꞙɭı ,
    //   j͐ʃƽɜ , ( x , z ) , ꞙɭı , ꞙɭı , j͐ʃƽɜ , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
    const alglui = ( haxekuxa: number[], uv: number[],
      pukek: THREE.MeshStandardMaterial ): void => {
      if ( haxekuxa.length < 0o11 ) return;
      const geometrio = new THREE.BufferGeometry();
      geometrio.setAttribute("position", new THREE.Float32BufferAttribute(haxekuxa, 3));
      geometrio.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
      geometrio.computeVertexNormals();
      habakaweKatoma.tlunakani(geometrio, pukek, new THREE.Matrix4());
    };
    alglui(suprajHaxekuxa, suprajUV, supraMaterialo);
    alglui(bordajHaxekuxa, bordajUV, bordaMaterialo);
  }
  habakaweKatoma.kunigi(qena, false);
}
