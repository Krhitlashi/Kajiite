// ≺⧼ ſᶘɔ ֭ſɭэ ſɭw j͑ʃᴜꞇ j͑ʃƽɔ ſɭɹ ı],ɔ ŋᷠᴜ j͑ʃᴜꞇ ʌ j͑ʃɹ ſɟᴜ ı],ɹͷ̗ 🔭 ⧽≻
// ſɭɜ ſɭ,w , ſɭᴜ ſןᴜ , ꞙɭцɔɔɔ , ⟅ ſɭэ ſɭw , ꞙɭɩɔɔ ,
// ſɭэ ſɭᴜ , ſןw ſɭᴜƴ , ꞙɭı ,
// ſɭɜ ſɭ,w , ſɭɹ ſןᴜ , ꞙɭı ,
// ſɭэ ſɭw , ꞙɭı , 📃 ⟩
import * as THREE from "three";
import { l6da, tsasaVem2Tsiike } from "../../kanta/nala/t6limaSoza.js";
import { t6limaWeh2En, hagek2fhagasai } from "../../skek2/x2x2q/t6limaHaweh2.js";
import { h6kuniQoxa, surokQoxa } from "../../skek2/x2x2q/mapqoxa.js";
import { tikBal2 } from "../../kanta/t6lima-havop2/mapregulo.js";

// ⟨ ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
const GRANDECO = 0o3000;
const HAS2NASCE = 0o600;
const SX = HAS2NASCE + 1;
const N = SX * SX;
const TONA = GRANDECO / HAS2NASCE;
// ⟨ ſɭᴜ ſןᴜ , ꞙɭɿ , ⟅ ſɭэ ſɭw , ꞙɭɿ , 📃 ⟩
const TUTA = 0o1400;
const SEGTUTA = 0o300;
const SXTUTA = SEGTUTA + 1;
const TONATUTA = TUTA / SEGTUTA;
const bal2 = tikBal2();
const weh2 = new THREE.Color();

const posX = new Float32Array(N);
const posZ = new Float32Array(N);
const hal6da = new Float32Array(N);
// ſɭэ ſɭw , ꞙɭɿ , ⟅ ꞙɭɿ , 📃 ⟩
const kol = new Float64Array(N * 3);
const c2h2 = new Uint8Array(N);
{
  let p = 0, ene = 0;
  for ( let j = 0; j < SX; j++ ) {
    for ( let i = 0; i < SX; i++ ) {
      const x = -GRANDECO / 2 + i * TONA;
      const z = -GRANDECO / 2 + j * TONA;
      posX[p] = x; posZ[p] = z;
      if ( h6kuniQoxa(bal2.qoxa, bal2.pal6, x, z) <= 0 ) { c2h2[p] = 1; ene++; }
      p++;
    }
  }
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) }ʃɹƽ ʌ ſɭɹ ſᶘɔ=${N} ｡ j͑ʃᴜ ꞁȷ̀ᴜ ʌ }ʃᴜ j͐ʃᴜ=${ene} ｡ j͑ʃᴜ ʌ j͑ʃᴜꞇ=${N - ene} ｡ ſ͕ɭᴜƣ̋ ʌ j͑ʃᴜ ʌ j͑ʃᴜꞇ=${((N - ene) / N).toFixed(3)}`);
}

function xafanitapuHal6da( kutime: number ): number {
  let s = 0;
  for ( let i = 0; i < N; i++ ) {
    if ( c2h2[i] !== kutime ) continue;
    s += l6da(posX[i], posZ[i]);
  }
  return s;
}
function xafanitapuHaweh2( kutime: number ): number {
  let s = 0;
  for ( let i = 0; i < N; i++ ) {
    if ( c2h2[i] !== kutime ) continue;
    const k2pa = i % SX;
    const haga = ( k2pa > 0 && k2pa < SX - 1 && i >= SX && i < N - SX )
      ? Math.hypot(hal6da[i + 1] - hal6da[i - 1], hal6da[i + SX] - hal6da[i - SX]) / ( 2 * TONA )
      : 0;
    t6limaWeh2En(weh2, hal6da[i], posX[i], posZ[i], haga, tsasaVem2Tsiike);
    s += weh2.r;
  }
  return s;
}

for ( let i = 0; i < N; i++ ) hal6da[i] = l6da(posX[i], posZ[i]);
for ( let i = 0; i < N; i++ ) {
  const k2pa = i % SX;
  const haga = ( k2pa > 0 && k2pa < SX - 1 && i >= SX && i < N - SX )
    ? Math.hypot(hal6da[i + 1] - hal6da[i - 1], hal6da[i + SX] - hal6da[i - SX]) / ( 2 * TONA )
    : 0;
  t6limaWeh2En(weh2, hal6da[i], posX[i], posZ[i], haga, tsasaVem2Tsiike);
  kol[i * 3] = weh2.r; kol[i * 3 + 1] = weh2.g; kol[i * 3 + 2] = weh2.b;
}

function vecax2l( ksaka: string, f: () => number ): void {
  for ( let i = 0; i < 0o10; i++ ) f();
  const tif: number[] = [];
  for ( let r = 0; r < 0o21; r++ ) {
    const t0 = performance.now();
    f();
    tif.push(performance.now() - t0);
  }
  tif.sort(( a, b ) => a - b);
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ${ksaka.padEnd(0o32)} mediano=${tif[0o10].toFixed(1)}ms min=${tif[0].toFixed(1)}ms`);
}

vecax2l("l6da ｡ j͑ʃᴜ ꞁȷ̀ᴜ ʌ }ʃᴜ j͐ʃᴜ", () => xafanitapuHal6da(1));
vecax2l("l6da ｡ j͑ʃᴜ ʌ j͑ʃᴜꞇ ʌ }ʃᴜ j͐ʃᴜ", () => xafanitapuHal6da(0));
vecax2l("haweh2 ｡ j͑ʃᴜ ꞁȷ̀ᴜ ʌ }ʃᴜ j͐ʃᴜ", () => xafanitapuHaweh2(1));
vecax2l("haweh2 ｡ j͑ʃᴜ ʌ j͑ʃᴜꞇ ʌ }ʃᴜ j͐ʃᴜ", () => xafanitapuHaweh2(0));

// ⟨ ſɭᴜ ſןᴜ , ꞙɭɿ , ⟅ ſɭэ ſɭw , 📃 ⟩
// ſɭᴜ ſןᴜ , ꞙɭɿ , ⟅ ſɭэ ſɭᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ſןw ſɭᴜƴ , ꞙɭɿ , 📃 ⟩
{
  const NT = SXTUTA * SXTUTA;
  const hojT = new Float32Array(NT);
  for ( let j = 0; j < SXTUTA; j++ ) {
    for ( let i = 0; i < SXTUTA; i++ ) {
      hojT[j * SXTUTA + i] = l6da(-TUTA / 2 + i * TONATUTA, -TUTA / 2 + j * TONATUTA);
    }
  }
  let l6daMalsamaj = 0, weh2Malsamaj = 0, enTuto = 0;
  for ( let j = 0; j < SXTUTA; j++ ) {
    for ( let i = 0; i < SXTUTA; i++ ) {
      const x = -TUTA / 2 + i * TONATUTA;
      const z = -TUTA / 2 + j * TONATUTA;
      if ( h6kuniQoxa(bal2.qoxa, bal2.pal6, x, z) > 0 ) continue;
      enTuto++;
      const idx = j * SXTUTA + i;
      const idxH2y2k = ( ( z + GRANDECO / 2 ) / TONA ) * SX + ( x + GRANDECO / 2 ) / TONA;
      if ( hojT[idx] !== hal6da[idxH2y2k] ) l6daMalsamaj++;
      const k2pa = i % SXTUTA;
      const haga = ( k2pa > 0 && k2pa < SXTUTA - 1 && idx >= SXTUTA && idx < NT - SXTUTA )
        ? Math.hypot(hojT[idx + 1] - hojT[idx - 1], hojT[idx + SXTUTA] - hojT[idx - SXTUTA]) / ( 2 * TONATUTA )
        : 0;
      t6limaWeh2En(weh2, hojT[idx], x, z, haga, tsasaVem2Tsiike);
      if ( weh2.r !== kol[idxH2y2k * 3] || weh2.g !== kol[idxH2y2k * 3 + 1] || weh2.b !== kol[idxH2y2k * 3 + 2] ) {
        weh2Malsamaj++;
      }
    }
  }
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) j͐ʃᴜ ſ͕ɭɜ ŋᷠɹ ｡ j͑ʃᴜ ꞁȷ̀ᴜ ʌ }ʃᴜ j͐ʃᴜ=${enTuto} ｡ j͐ʃэ ɭ(ᴜ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ=${l6daMalsamaj} ｡ ſɭɔʞ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ=${weh2Malsamaj}`);
}

// ⟨ ſɭɜ ſɭ,w , ꞙɭɿ , ⟅ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
// ſɭɜ ſɭ,w , j͑ʃᴜ ſɭ,w , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
function kreuKozun( pal6: number, has2nasce: number ): () => number {
  const sx = has2nasce + 1;
  const n = sx * sx;
  const vepat6ni = pal6 / has2nasce;
  const px = new Float32Array(n);
  const pz = new Float32Array(n);
  const hh = new Float32Array(n);
  const kk = new THREE.Color();
  const prem = { x: 0, z: 0 };
  return (): number => {
    let s = 0;
    for ( let j = 0; j < sx; j++ ) {
      for ( let i = 0; i < sx; i++ ) {
        const k = j * sx + i;
        const x = -pal6 / 2 + i * vepat6ni, z = -pal6 / 2 + j * vepat6ni;
        px[k] = x; pz[k] = z;
        const h = l6da(x, z);
        hh[k] = h; s += h;
      }
    }
    for ( let k = 0; k < n; k++ ) {
      const k2pa = k % sx;
      const haga = ( k2pa > 0 && k2pa < sx - 1 && k >= sx && k < n - sx )
        ? Math.hypot(hh[k + 1] - hh[k - 1], hh[k + sx] - hh[k - sx]) / ( 2 * vepat6ni )
        : 0;
      t6limaWeh2En(kk, hh[k], px[k], pz[k], haga, tsasaVem2Tsiike);
      s += kk.r;
    }
    for ( let k = 0; k < n; k++ ) {
      if ( surokQoxa(bal2.qoxa, bal2.pal6, px[k], pz[k], prem) ) { px[k] = prem.x; pz[k] = prem.z; s++; }
    }
    s += hagek2fhagasai(has2nasce).length;
    return s;
  };
}

{
  const A = kreuKozun(0o3000, 0o600);
  const B = kreuKozun(0o1400, 0o300);
  let sA = 0, sB = 0;
  for ( let i = 0; i < 0o4; i++ ) { sA += A(); sB += B(); }
  const ta: number[] = [], tb: number[] = [];
  for ( let r = 0; r < 0o21; r++ ) {
    if ( ( r & 1 ) === 0 ) {
      let t0 = performance.now(); sA += A(); ta.push(performance.now() - t0);
      t0 = performance.now(); sB += B(); tb.push(performance.now() - t0);
    } else {
      let t0 = performance.now(); sB += B(); tb.push(performance.now() - t0);
      t0 = performance.now(); sA += A(); ta.push(performance.now() - t0);
    }
  }
  ta.sort(( a, b ) => a - b ); tb.sort(( a, b ) => a - b );
  const ma = ta[ta.length >> 1], mb = tb[tb.length >> 1];
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ſɭɜ ſɭ,w A/B ｡ ſןᴜ j͐ʃэ ɭl̀ᴜ=${ma.toFixed(1)}ms min=${ta[0].toFixed(1)} ｡ ſןᴜ j͐ʃэ ŋᷠɹ=${mb.toFixed(1)}ms min=${tb[0].toFixed(1)} ｡ j͑ʃƨꞇʞ ŋᷠɹ=${(ma / mb).toFixed(2)}x`);
}

// ⟨ ſɭэ ſɭᴜ , ſןw ſɭᴜƴ , 📃 ⟩
let premitaj = 0;
const premita = { x: 0, z: 0 };
for ( let i = 0; i < N; i++ ) {
  if ( surokQoxa(bal2.qoxa, bal2.pal6, posX[i], posZ[i], premita) ) premitaj++;
}
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) }ʃɹƽ ʌ ſןw ſɭᴜƴ=${premitaj} ｡ ſ͕ɭɜ ɭʃɹ ı],ɔ ɭl̀ᴜ=${2 * HAS2NASCE * HAS2NASCE} ｡ ſ͕ɭɜ ɭʃɹ ı],ɔ ŋᷠɹ=${2 * SEGTUTA * SEGTUTA}`);
let haKekkozusaiUzataj = 0;
for ( let j = 0; j < SEGTUTA; j++ ) {
  for ( let i = 0; i < SEGTUTA; i++ ) {
    let internaK2pa = false;
    for ( const [ di, dj ] of [ [ 0, 0 ], [ 1, 0 ], [ 0, 1 ], [ 1, 1 ] ] as const ) {
      const x = -TUTA / 2 + ( i + di ) * TONATUTA;
      const z = -TUTA / 2 + ( j + dj ) * TONATUTA;
      if ( h6kuniQoxa(bal2.qoxa, bal2.pal6, x, z) <= 0 ) internaK2pa = true;
    }
    if ( internaK2pa ) haKekkozusaiUzataj++;
  }
}
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ſɭɹ ſןᴜ ʌ ſɭɜ ſɭ,w ʌ ſןw ſɭᴜƴ=${haKekkozusaiUzataj}/${SEGTUTA * SEGTUTA} ｡ ſ͕ɭɜ ɭʃɹ ı],ɔ ʌ jɑʃᴜ ſȷᴜ=${haKekkozusaiUzataj * 2}`);
