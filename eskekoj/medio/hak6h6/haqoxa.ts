// ≺⧼ ſɭэ ֭ſɭэ j͑ʃᴜꞇ ʌ ſ͕ɭɜ ı],ᴜ 📐 ⧽≻
import * as THREE from "three";
import { surGrid, VOJA_EKSTERA_DUONO, VOJA_SUPRO_LEVIGXO,
  VOJA_TERA_KLINO, VOJA_TRUA_DUONO, k6h6LarghoDuono } from "./havecax2l.js";

// ⟪ ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w 📏 ⟫
/* ſɭэ ֭ſɭэ , ꞙɭı , j͑ʃᴜ ſɭ,w , ſɭɜ ſɭ,w , ꞙɭı ,
   ꞙɭɔ , ſɭэ ֭ſɭэ , ꞙɭı , ⟅
    @param x, z ( number ) - }ʃɹƽ ,
    @param sefini ( number ) - ſɭэ ֭ſɭэ , ꞙɭı ,
    @param heightFn ( function ) - ſɭɜ ſɭ,w , j͑ʃᴜ ſɭ,w ,
@returns hateru ( number ) - ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w , */
export function k6h6Supro( x: number, z: number, sefini: number,
  heightFn: ( x: number, z: number ) => number
): number {
  const duon = k6h6LarghoDuono( sefini );
  let maks = heightFn(x, z);
  for ( let i = 0; i < 0o10; i++ ) {
    const ang = i * Math.PI / 0o4;
    maks = Math.max(maks, heightFn(x + Math.cos(ang) * duon, z + Math.sin(ang) * duon));
  }
  return maks + VOJA_SUPRO_LEVIGXO;
}

// ⟪ ſɭэ ֭ſɭэ , ꞙɭı , }ʃɹƽ 📏 ⟫
// ⟨ ſɭэ ֭ſɭэ , ꞙɭı , }ʃɹƽ , ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭı ,
//   ꞙɭɔ , ſɭᴜ ſןᴜ , ſɭэ ֭ſɭэ , ⟅ ꞙɭı , ſɭᴜ ſןᴜ , ſןɔ˞ᴜƴ , ꞙɭı , ꞙɭı , 📃 ⟩
// ⟨ }ʃɹƽ 📃 ⟩ , ſɭᴜ ſןᴜ , ꞙɭɔ , ꞙɭı , ſɭэ ֭ſɭэ , }ʃɹƽ , ꞙɭɿ ,
//   ꞙɭı , ꞙɭı , ⟅ ꞙɭı , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
// ⟨ ſɭɜ ſɭ,w , j͑ʃᴜ ſɭ,w , 📏 ⟩ , ꞙɭı , j͑ʃᴜ ſɭ,w , ꞙɭı , ſɭэ ֭ſɭэ ,
//   r , ꞙɭı , VOJA_TERA_KLINO * r , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭɔ , ⟅ 📃 ⟩
export function k6h6SuproDeVeb6kek(
  x: number,
  z: number,
  hac2w2q: readonly [ number, number ][],
  ka5ik: number,
  heightFn: ( x: number, z: number ) => number
): { hateru: number; minimumo: number } {
  let maks = heightFn( x, z ), minimumo = maks;
  const konsideru = ( px: number, pz: number, r: number ): void => {
    const h = heightFn( px, pz );
    if ( h - VOJA_TERA_KLINO * r > maks ) maks = h - VOJA_TERA_KLINO * r;
    if ( h < minimumo ) minimumo = h;
  };
  // ⟨ ꞙɭı , ꞙɭı , ſɭᴜ ſןᴜ 📏 ⟩ , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ⟩
  for ( const r of [ ka5ik, VOJA_TRUA_DUONO ] ) {
    for ( let i = 0; i < 0o20; i++ ) {
      const tafkaq = i * Math.PI * 0o2 / 0o20;
      konsideru( x + Math.cos(tafkaq) * r, z + Math.sin(tafkaq) * r, r );
    }
  }
  for ( const [ dx, dz ] of hac2w2q ) {
    const sahakani = Math.hypot( dx, dz );
    if ( sahakani < 0o1/0o1000 ) continue;
    const ux = dx / sahakani, uz = dz / sahakani;
    const px = -uz * ka5ik, pz = ux * ka5ik;
    // ⟨ }ʃɹƽ , ſɭэ ֭ſɭэ , ſɭᴜ ſןᴜ , ꞙɭı , ⟅ 📃 ⟩
    const ex = x + ux * VOJA_TRUA_DUONO, ez = z + uz * VOJA_TRUA_DUONO;
    for ( const f of [ -1, 1 ] ) {
      for ( const [ bx, bz, br ] of [ [ x + px * f, z + pz * f, ka5ik ],
        [ ex + px * f, ez + pz * f, Math.hypot(VOJA_TRUA_DUONO, ka5ik) ] ] as [ number, number, number ][]) {
        konsideru( bx, bz, br );
      }
    }
  }
  return { hateru: maks + VOJA_SUPRO_LEVIGXO, minimumo };
}

// ⟪ ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı 📏 ⟫
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı 📃 ⟩ , ſɭᴜ ſןᴜ , ꞙɭı , }ʃɹƽ , ꞙɭэ , ⟅
//   ꞙɭı , ꞙɭɔ , ⟅ ꞙɭı , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
// ⟨ j͑ʃᴜ ſɭ,w , ꞙɭı , 📃 ⟩ , ſɭэ ֭ſɭэ , ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
export interface PlataVem2 {
  // ⟨ j͑ʃᴜ ſɭ,w , ꞙɭı 📃 ⟩ , ꞙɭɔ , ꞙɭı , ꞙɭı , ⟅ ⟩
  l6da: number;
  // ⟨ j͑ʃᴜ ſɭ,w , ꞙɭı , ꞙɭı ⟅ 📃 ⟩
  hal6da: readonly number[];
  // ⟨ }ʃɹƽ , ꞙɭı , [ ꞙɭɔ , ꞙɭɿπ ) ⟅ 📃 ⟩
  hatafkaq: readonly number[];
  // ⟨ ꞙɭı , ꞙɭı , }ʃɹƽ , ⟅ 📃 ⟩
  hap2somani: readonly number[];
}

const DUOBLA_PI = Math.PI * 0o2;
const ANGULA_TOLERO = 0o1 / 0o1000;

/* ꞙɭı , ꞙɭɔ , ꞙɭɿπ , ꞙɭı ,
    @param tafkaq ( number ) - }ʃɹƽ , ꞙɭı ,
@returns tafkaq ( number ) - }ʃɹƽ , [ ꞙɭɔ , ꞙɭɿπ ) */
export function normAngulo(tafkaq: number): number {
  const r = tafkaq % DUOBLA_PI;
  return r < 0 ? r + DUOBLA_PI : r;
}

/* }ʃɹƽ , b , a , ꞙɭı ,
    @param a, b ( number ) - }ʃɹƽ , ꞙɭı ,
@returns delta ( number ) - }ʃɹƽ , ( -π , π ] */
function angulaDif(a: number, b: number): number {
  let d = ( a - b ) % DUOBLA_PI;
  if ( d > Math.PI ) d -= DUOBLA_PI;
  if ( d <= -Math.PI ) d += DUOBLA_PI;
  return d;
}

/* ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
    @param vem2 ( PlataVem2 ) - ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w ,
    @param tafkaq ( number ) - ſɭᴜ ſןᴜ , ꞙɭı ,
@returns l6da ( number ) - ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , */
// ⟨ ꞙɭı , ꞙɭı , 📏 ⟩ , ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı , j͑ʃᴜ ſɭ,w ,
//   ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭı , ⟅ ꞙɭı , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
function plataRimo(vem2: PlataVem2, tafkaq: number): number {
  const n = vem2.hal6da.length;
  if ( n === 0 ) return vem2.l6da;
  if ( n === 1 ) return vem2.hal6da[0];
  const a = normAngulo(tafkaq);
  for ( let i = 0; i < n; i++ ) {
    if ( Math.abs(angulaDif(a, vem2.hatafkaq[i])) <= vem2.hap2somani[i] + ANGULA_TOLERO )
      return vem2.hal6da[i];
  }
  for ( let i = 0; i < n; i++ ) {
    const j = ( i + 1 ) % n;
    const saxeni = vem2.hatafkaq[i] + vem2.hap2somani[i];
    let tlakakani = vem2.hatafkaq[j] - vem2.hap2somani[j];
    if ( j === 0 ) tlakakani += DUOBLA_PI;
    if ( tlakakani <= saxeni + ANGULA_TOLERO ) continue;
    let q = a;
    if ( q < saxeni ) q += DUOBLA_PI;
    if ( q < saxeni || q > tlakakani ) continue;
    const t = ( q - saxeni ) / ( tlakakani - saxeni );
    const glata = t * t * ( 3 - 0o2 * t );
    return vem2.hal6da[i] + ( vem2.hal6da[j] - vem2.hal6da[i] ) * glata;
  }
  // ⟨ ꞙɭı , 📃 ⟩ , ꞙɭɔ , ꞙɭɔ , ꞙɭɔ , ⟅ ꞙɭı , ⟅
  let plej = Infinity, rez = vem2.l6da;
  for ( let i = 0; i < n; i++ ) {
    const d = Math.abs(angulaDif(a, vem2.hatafkaq[i]));
    if ( d < plej ) { plej = d; rez = vem2.hal6da[i]; }
  }
  return rez;
}

/* ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
    @param vem2 ( PlataVem2 ) - ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w ,
    @param tafkaq ( number ) - ſɭᴜ ſןᴜ , ꞙɭı ,
    @param h6kuni ( number , optional ) - ꞙɭı , Infinity ,
@returns l6da ( number ) - ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w */
// ⟨ ꞙɭı , ꞙɭı , 📐 ⟩ , ſɭᴜ ſןᴜ , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
export function plataAltoCxe(vem2: PlataVem2, tafkaq: number,
  h6kuni: number = Infinity): number {
  const rimo = plataRimo(vem2, tafkaq);
  if ( !Number.isFinite(h6kuni) ) return rimo;
  const t = Math.min(1, Math.max(0, h6kuni / VOJA_TRUA_DUONO));
  return vem2.l6da + ( rimo - vem2.l6da ) * t;
}

/* ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
    @param x, z ( number ) - ſɭᴜ ſןᴜ , }ʃɹƽ ,
    @param hac2w2q ( [ number , number ] [ ] ) - ꞙɭı , ꞙɭı ,
    @param hap2somani ( number [ ] ) - ſɭэ ֭ſɭэ , ꞙɭı , hac2w2q ,
    @param heightFn ( function ) - ſɭɜ ſɭ,w , j͑ʃᴜ ſɭ,w ,
@returns hal6da ( number [ ] ) - ꞙɭı , j͑ʃᴜ ſɭ,w , */
// ⟨ ſɭэ ֭ſɭэ , ꞙɭı , 📏 ⟩ , ſɭэ ֭ſɭэ , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭɔ , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
// ⟨ ꞙɭı , ꞙɭɿ , 📏 ⟩ , ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
export function kunigajBrakAltoj(x: number, z: number,
  hac2w2q: readonly [ number, number ][], hap2somani: readonly number[],
  heightFn: ( x: number, z: number ) => number
): number[] {
  const rez: number[] = [];
  for ( let b = 0; b < hac2w2q.length; b++ ) {
    const [ dx, dz ] = hac2w2q[ b ];
    const p2somani = hap2somani[ b ] ?? VOJA_EKSTERA_DUONO;
    const sahakani = Math.hypot(dx, dz);
    if ( sahakani < ANGULA_TOLERO ) { rez.push(NaN); continue; }
    const ux = dx / sahakani, uz = dz / sahakani;
    const nx = -uz, nz = ux;
    let maks = -Infinity;
    for ( const laux of [ 0o0, 0o1/0o4 ] ) {
      const r = VOJA_TRUA_DUONO + laux;
      for ( const kanto of [ -1, 0, 1 ] ) {
        maks = Math.max(maks,
          heightFn(x + ux * r + nx * kanto * p2somani, z + uz * r + nz * kanto * p2somani));
      }
    }
    rez.push(Number.isFinite(maks) ? surGrid(maks) : NaN);
  }
  return rez;
}

/* ꞙɭı , ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı ,
    @param hac2w2q ( [ number , number ] [ ] ) - ꞙɭı , ꞙɭı ,
    @param hap2somani ( number [ ] ) - ſɭэ ֭ſɭэ , ꞙɭı ,
    @param hal6da ( number [ ] ) - ꞙɭı , j͑ʃᴜ ſɭ,w ,
    @param fallback ( number ) - j͑ʃᴜ ſɭ,w , ꞙɭɔ ,
@returns vem2 ( PlataVem2 ) - ſɭᴜ ſןᴜ , ꞙɭı , */
// ⟨ ꞙɭı , ꞙɭı , 📐 ⟩ , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭɔ , ꞙɭı , ⟅ 📃 ⟩
export function kf2PlataVem2n(
  hac2w2q: readonly [ number, number ][], hap2somani: readonly number[],
  hal6da: readonly number[], fallback: number
): PlataVem2 {
  const paroj: { ang: number; l6da: number; p2somani: number }[] = [];
  for ( let b = 0; b < hac2w2q.length; b++ ) {
    const l6da = hal6da[ b ];
    const [ dx, dz ] = hac2w2q[ b ];
    if ( !Number.isFinite(l6da) || Math.hypot(dx, dz) < ANGULA_TOLERO ) continue;
    const ang = normAngulo(Math.atan2(dz, dx));
    if ( paroj.some(p => Math.abs(angulaDif(p.ang, ang)) < ANGULA_TOLERO) ) continue;
    const p2somani = hap2somani[ b ] ?? VOJA_EKSTERA_DUONO;
    paroj.push({ ang, l6da, p2somani: Math.atan2(p2somani, VOJA_TRUA_DUONO) });
  }
  paroj.sort(( p, q ) => p.ang - q.ang);
  if ( paroj.length === 0 )
    return { l6da: fallback, hal6da: [], hatafkaq: [], hap2somani: [] };
  return {
    l6da: paroj.reduce(( s, p ) => s + p.l6da, 0 ) / paroj.length,
    hal6da: paroj.map(p => p.l6da),
    hatafkaq: paroj.map(p => p.ang),
    hap2somani: paroj.map(p => p.p2somani),
  };
}

// ⟪ ꞙɭı , ſɭэ ֭ſɭэ , 📐 ⟫
/* ꞙɭı , ſɭэ ֭ſɭэ , ſɭɜ ſɭ,w , ꞙɭı ,
    @param w ( number ) - ꞙɭı , ꞙɭı ,
    @param l ( number ) - ꞙɭı , ꞙɭı ,
    @param hateru ( [ number , number , number , number ] ) - j͑ʃᴜ ſɭ,w , ꞙɭı ,
    @param fundoj ( [ number , number , number , number ] ) - j͑ʃᴜ ſɭ,w , ꞙɭı ,
    @param ofsetoX ( number ) - ꞙɭı , ꞙɭı ,
@returns geometrio ( BufferGeometry ) - ꞙɭı , j͑ʃᴜ ſɭ,w , */
// ⟨ ſᶘɔ ʌ ꞙɭı , 📃 ⟩ , ꞙɭı , ꞙɭı , ⟅ ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
// ⟪ ꞙɭı , 📐 ⟫
// ⟨ ſɭэ ֭ſɭэ , ꞙɭı , 📏 ⟩ , ꞙɭı , ſɭᴜc̗ ɭʃɜ ſןᴜȝ ꞁȷ̀ᴜꞇ , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
export function kf2SegmentGeometrion(w: number, l: number,
  hateru: readonly [ number, number, number, number ],
  fundoj: readonly [ number, number, number, number ],
  ofsetoX: number = 0): THREE.BufferGeometry {
  const x0 = -w / 2 + ofsetoX, x1 = w / 2 + ofsetoX;
  const y0 = -l / 2, y1 = l / 2;
  const p: [ number, number, number ][] = [
    [ x0, y0, hateru[ 0 ] ], [ x1, y0, hateru[ 1 ] ],
    [ x1, y1, hateru[ 2 ] ], [ x0, y1, hateru[ 3 ] ],
    [ x0, y0, fundoj[ 0 ] ], [ x1, y0, fundoj[ 1 ] ],
    [ x1, y1, fundoj[ 2 ] ], [ x0, y1, fundoj[ 3 ] ],
  ];
  // ⟨ ꞙɭı , ꞙɭı , 📃 ⟩ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
  // ⟨ UV , ꞙɭı 📏 ⟩ , ꞙɭı , UV , ( x , y ) , ꞙɭı , x , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , UV , ꞙɭı ,
  //   ( x , y ) , ꞙɭɔ , ( ꞙɭı , ꞙɭı ) , ⟅ 📃 ⟩
  const kvadratoj: { ind: [ number, number, number, number ]; uv: ( q: [ number, number, number ] ) => [ number, number ] }[] = [
    { ind: [ 0, 1, 2, 3 ], uv: q => [ q[ 0 ], q[ 1 ] ] },
    { ind: [ 4, 7, 6, 5 ], uv: q => [ q[ 0 ], q[ 1 ] ] },
    { ind: [ 0, 4, 5, 1 ], uv: q => [ q[ 0 ], q[ 2 ] ] },
    { ind: [ 3, 2, 6, 7 ], uv: q => [ q[ 0 ], q[ 2 ] ] },
    { ind: [ 0, 3, 7, 4 ], uv: q => [ q[ 1 ], q[ 2 ] ] },
    { ind: [ 1, 5, 6, 2 ], uv: q => [ q[ 1 ], q[ 2 ] ] },
  ];
  const trianguloj: number[] = [];
  const uvDe: (( q: [ number, number, number ] ) => [ number, number ])[] = [];
  for ( const k of kvadratoj ) {
    for ( const t of [ [ 0, 1, 2 ], [ 0, 2, 3 ] ] ) {
      for ( const n of t ) { trianguloj.push(k.ind[ n ]); uvDe.push(k.uv); }
    }
  }
  const haxekuxa = new Float32Array(trianguloj.length * 3);
  const uv = new Float32Array(trianguloj.length * 2);
  for ( let i = 0; i < trianguloj.length; i++ ) {
    const q = p[ trianguloj[ i ] ];
    haxekuxa[ i * 3 ] = q[ 0 ]; haxekuxa[ i * 3 + 1 ] = q[ 1 ]; haxekuxa[ i * 3 + 2 ] = q[ 2 ];
    const k = uvDe[ i ](q);
    uv[ i * 2 ] = k[ 0 ]; uv[ i * 2 + 1 ] = k[ 1 ];
  }
  const geometrio = new THREE.BufferGeometry();
  geometrio.setAttribute("position", new THREE.BufferAttribute(haxekuxa, 3));
  geometrio.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  geometrio.computeVertexNormals();
  return geometrio;
}
