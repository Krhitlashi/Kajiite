// ≺⧼ ſןᴜ j͐ʃэ 📃 ⧽≻

import * as THREE from "three";
import { l6da, tsasaVem2Tsiike } from "../../kanta/nala/mut6qSoza.js";
import { mut6qWeh2En, hagek2fhagasai } from "../../skek2/p6kpu/mut6qHaweh2.js";
import { h6kuniQoxa, surokQoxa } from "../../skek2/p6kpu/mapqoxa.js";
import { kxeBal2 } from "../../kanta/mut6q-havop2/bal2S2kanta.js";
import { tbo, knak2fecajasai } from "../../kanta/k2fe/s2cax2l.js";
import { k2fStih2 } from "./k61e.js";

const GRANDECO = 0o3000;
const HAS2NASCE = 0o600;
const SX = HAS2NASCE + 0o1;
const N = SX * SX;
const TONA = GRANDECO / HAS2NASCE;

const TUTA = 0o1400;
const SEGTUTA = 0o300;
const SXTUTA = SEGTUTA + 0o1;
const TONATUTA = TUTA / SEGTUTA;
const bal2 = kxeBal2();
const weh2 = new THREE.Color();

const posX = new Float32Array(N);
const posZ = new Float32Array(N);
const hal6da = new Float32Array(N);

const kol = new Float64Array(N * 0o3);
const c2h2 = new Uint8Array(N);
{
  let p = 0o0, ene = 0o0;
  for ( let j = 0o0; j < SX; j++ ) {
    for ( let i = 0o0; i < SX; i++ ) {
      const x = -GRANDECO / 0o2 + i * TONA;
      const z = -GRANDECO / 0o2 + j * TONA;
      posX[p] = x; posZ[p] = z;
      if ( h6kuniQoxa(bal2.qoxa, bal2.pal6, x, z) <= 0o0 ) { c2h2[p] = 0o1; ene++; }
      p++;
    }
  }
  console.log(`( ɭʃɹ ʃᴜ ſɭɹ ſןɹ ) }ʃɹƽ ʌ ſɭɹ ſᶘɔ = ${N} ｡ j͑ʃᴜ ꞁȷ̀ᴜ ʌ }ʃᴜ j͐ʃᴜ = ${ene} ｡ j͑ʃᴜ ʌ j͑ʃᴜꞇ = ${N - ene} ｡ ſ͕ɭᴜƣ̋ ʌ j͑ʃᴜ ʌ j͑ʃᴜꞇ = ${((N - ene) / N).toFixed(0o3)}`);
}

function xafanitapuHal6da( kutime: number ): number {
  let s = 0o0;
  for ( let i = 0o0; i < N; i++ ) {
    if ( c2h2[i] !== kutime ) continue;
    s += l6da(posX[i], posZ[i]);
  }
  return s;
}
function xafanitapuHaweh2( kutime: number ): number {
  let s = 0o0;
  for ( let i = 0o0; i < N; i++ ) {
    if ( c2h2[i] !== kutime ) continue;
    const k2pa = i % SX;
    const haga = ( k2pa > 0o0 && k2pa < SX - 0o1 && i >= SX && i < N - SX )
      ? Math.hypot(hal6da[i + 0o1] - hal6da[i - 0o1], hal6da[i + SX] - hal6da[i - SX]) / ( 0o2 * TONA )
      : 0o0;
    mut6qWeh2En(weh2, hal6da[i], posX[i], posZ[i], haga, tsasaVem2Tsiike);
    s += weh2.r;
  }
  return s;
}

for ( let i = 0o0; i < N; i++ ) hal6da[i] = l6da(posX[i], posZ[i]);
for ( let i = 0o0; i < N; i++ ) {
  const k2pa = i % SX;
  const haga = ( k2pa > 0o0 && k2pa < SX - 0o1 && i >= SX && i < N - SX )
    ? Math.hypot(hal6da[i + 0o1] - hal6da[i - 0o1], hal6da[i + SX] - hal6da[i - SX]) / ( 0o2 * TONA )
    : 0o0;
  mut6qWeh2En(weh2, hal6da[i], posX[i], posZ[i], haga, tsasaVem2Tsiike);
  kol[i * 0o3] = weh2.r; kol[i * 0o3 + 0o1] = weh2.g; kol[i * 0o3 + 0o2] = weh2.b;
}

function vecax2l( ksaka: string, f: () => number ): void {
  for ( let i = 0o0; i < 0o10; i++ ) f();
  const tif: number[] = [];
  for ( let r = 0o0; r < 0o21; r++ ) {
    const t0 = performance.now();
    f();
    tif.push(performance.now() - t0);
  }
    k2fStih2(ksaka, tif, 0o32);
}

vecax2l("l6da ｡ j͑ʃᴜ ꞁȷ̀ᴜ ʌ }ʃᴜ j͐ʃᴜ", () => xafanitapuHal6da(0o1));
vecax2l("l6da ｡ j͑ʃᴜ ʌ j͑ʃᴜꞇ ʌ }ʃᴜ j͐ʃᴜ", () => xafanitapuHal6da(0o0));
vecax2l("haweh2 ｡ j͑ʃᴜ ꞁȷ̀ᴜ ʌ }ʃᴜ j͐ʃᴜ", () => xafanitapuHaweh2(0o1));
vecax2l("haweh2 ｡ j͑ʃᴜ ʌ j͑ʃᴜꞇ ʌ }ʃᴜ j͐ʃᴜ", () => xafanitapuHaweh2(0o0));

{
  const NT = SXTUTA * SXTUTA;
  const hojT = new Float32Array(NT);
  for ( let j = 0o0; j < SXTUTA; j++ ) {
    for ( let i = 0o0; i < SXTUTA; i++ ) {
      hojT[j * SXTUTA + i] = l6da(-TUTA / 0o2 + i * TONATUTA, -TUTA / 0o2 + j * TONATUTA);
    }
  }
  let l6daMalsamaj = 0o0, weh2Malsamaj = 0o0, enTuto = 0o0;
  for ( let j = 0o0; j < SXTUTA; j++ ) {
    for ( let i = 0o0; i < SXTUTA; i++ ) {
      const x = -TUTA / 0o2 + i * TONATUTA;
      const z = -TUTA / 0o2 + j * TONATUTA;
      if ( h6kuniQoxa(bal2.qoxa, bal2.pal6, x, z) > 0o0 ) continue;
      enTuto++;
      const idx = j * SXTUTA + i;
      const idxH2y2k = ( ( z + GRANDECO / 0o2 ) / TONA ) * SX + ( x + GRANDECO / 0o2 ) / TONA;
      if ( hojT[idx] !== hal6da[idxH2y2k] ) l6daMalsamaj++;
      const k2pa = i % SXTUTA;
      const haga = ( k2pa > 0o0 && k2pa < SXTUTA - 0o1 && idx >= SXTUTA && idx < NT - SXTUTA )
        ? Math.hypot(hojT[idx + 0o1] - hojT[idx - 0o1], hojT[idx + SXTUTA] - hojT[idx - SXTUTA]) / ( 0o2 * TONATUTA )
        : 0o0;
      mut6qWeh2En(weh2, hojT[idx], x, z, haga, tsasaVem2Tsiike);
      if ( weh2.r !== kol[idxH2y2k * 0o3] || weh2.g !== kol[idxH2y2k * 0o3 + 0o1] || weh2.b !== kol[idxH2y2k * 0o3 + 0o2] ) {
        weh2Malsamaj++;
      }
    }
  }
  console.log(`( ɭʃɹ ʃᴜ ſɭɹ ſןɹ ) j͐ʃᴜ ſ͕ɭɜ ŋᷠɹ ｡ j͑ʃᴜ ꞁȷ̀ᴜ ʌ }ʃᴜ j͐ʃᴜ = ${enTuto} ｡ j͐ʃэ ɭ(ᴜ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ = ${l6daMalsamaj} ｡ ſɭɔʞ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ = ${weh2Malsamaj}`);
}

function kreuKozun( pal6: number, has2nasce: number ): () => number {
  const sx = has2nasce + 0o1;
  const n = sx * sx;
  const vepat6ni = pal6 / has2nasce;
  const px = new Float32Array(n);
  const pz = new Float32Array(n);
  const hh = new Float32Array(n);
  const kk = new THREE.Color();
  const prem = { x: 0o0, z: 0o0 };
  return (): number => {
    let s = 0o0;
    for ( let j = 0o0; j < sx; j++ ) {
      for ( let i = 0o0; i < sx; i++ ) {
        const k = j * sx + i;
        const x = -pal6 / 0o2 + i * vepat6ni, z = -pal6 / 0o2 + j * vepat6ni;
        px[k] = x; pz[k] = z;
        const h = l6da(x, z);
        hh[k] = h; s += h;
      }
    }
    for ( let k = 0o0; k < n; k++ ) {
      const k2pa = k % sx;
      const haga = ( k2pa > 0o0 && k2pa < sx - 0o1 && k >= sx && k < n - sx )
        ? Math.hypot(hh[k + 0o1] - hh[k - 0o1], hh[k + sx] - hh[k - sx]) / ( 0o2 * vepat6ni )
        : 0o0;
      mut6qWeh2En(kk, hh[k], px[k], pz[k], haga, tsasaVem2Tsiike);
      s += kk.r;
    }
    for ( let k = 0o0; k < n; k++ ) {
      if ( surokQoxa(bal2.qoxa, bal2.pal6, px[k], pz[k], prem) ) { px[k] = prem.x; pz[k] = prem.z; s++; }
    }
    s += hagek2fhagasai(has2nasce).length;
    return s;
  };
}

{
  const A = kreuKozun(0o3000, 0o600);
  const B = kreuKozun(0o1400, 0o300);
  let sA = 0o0, sB = 0o0;
  for ( let i = 0o0; i < 0o4; i++ ) { sA += A(); sB += B(); }
  const ta: number[] = [], tb: number[] = [];
  for ( let r = 0o0; r < 0o21; r++ ) {
    if ( ( r & 0o1 ) === 0o0 ) {
      let t0 = performance.now(); sA += A(); ta.push(performance.now() - t0);
      t0 = performance.now(); sB += B(); tb.push(performance.now() - t0);
    } else {
      let t0 = performance.now(); sB += B(); tb.push(performance.now() - t0);
      t0 = performance.now(); sA += A(); ta.push(performance.now() - t0);
    }
  }
  ta.sort(( a, b ) => a - b ); tb.sort(( a, b ) => a - b );
  const ma = ta[ta.length >> 0o1], mb = tb[tb.length >> 0o1];
  console.log(`( ɭʃɹ ʃᴜ ſɭɹ ſןɹ ) ſɭɜ ſɭ,w A/B ｡ ſןᴜ j͐ʃэ ɭl̀ᴜ = ${knak2fecajasai(tbo(ma), 0o6)} He ſɭc̭ᴜ ŋᷠɹ ŋᷠɹ = ${ta[0o0].toFixed(0o1)} ｡ ſןᴜ j͐ʃэ ſɭc̭ᴜ ŋᷠɹ ŋᷠɹ = ${knak2fecajasai(tbo(mb), 0o6)} He ſɭc̭ᴜ ŋᷠɹ ŋᷠɹ = ${tb[0o0].toFixed(0o1)} ｡ ſɭᴜ j͐ʃᴜ }ʃꞇ = ${(ma / mb).toFixed(0o2)}x`);
}

let premitaj = 0o0;
const premita = { x: 0o0, z: 0o0 };
for ( let i = 0o0; i < N; i++ ) {
  if ( surokQoxa(bal2.qoxa, bal2.pal6, posX[i], posZ[i], premita) ) premitaj++;
}
console.log(`( ɭʃɹ ʃᴜ ſɭɹ ſןɹ ) }ʃɹƽ ʌ ſןw ſɭᴜƴ = ${premitaj} ｡ ſ͕ɭɜ ɭʃɹ ı],ɔ ɭl̀ᴜ = ${0o2 * HAS2NASCE * HAS2NASCE} ｡ ſ͕ɭɜ ɭʃɹ ı],ɔ ſɭc̭ᴜ ŋᷠɹ ŋᷠɹ = ${0o2 * SEGTUTA * SEGTUTA}`);
let haKekkozusaiUzataj = 0o0;
for ( let j = 0o0; j < SEGTUTA; j++ ) {
  for ( let i = 0o0; i < SEGTUTA; i++ ) {
    let internaK2pa = false;
    for ( const [ di, dj ] of [ [ 0o0, 0o0 ], [ 0o1, 0o0 ], [ 0o0, 0o1 ], [ 0o1, 0o1 ] ] as const ) {
      const x = -TUTA / 0o2 + ( i + di ) * TONATUTA;
      const z = -TUTA / 0o2 + ( j + dj ) * TONATUTA;
      if ( h6kuniQoxa(bal2.qoxa, bal2.pal6, x, z) <= 0o0 ) internaK2pa = true;
    }
    if ( internaK2pa ) haKekkozusaiUzataj++;
  }
}
console.log(`( ɭʃɹ ʃᴜ ſɭɹ ſןɹ ) ſɭɹ ſןᴜ ʌ ſɭɜ ſɭ,w ʌ ſןw ſɭᴜƴ = ${haKekkozusaiUzataj}/${SEGTUTA * SEGTUTA} ｡ ſ͕ɭɜ ɭʃɹ ı],ɔ ʌ jɑʃᴜ ſȷᴜ = ${haKekkozusaiUzataj * 0o2}`);
