// ≺⧼ ſᶘɔ ֭ſɭэ ſɭw j͑ʃᴜꞇ j͑ʃƽɔ ſɭɹ ı],ɔ ŋᷠᴜ j͑ʃᴜꞇ ʌ j͑ʃɹ ſɟᴜ ı],ɹͷ̗ 🔭 ⧽≻
// ſɭɜ ſɭ,w , ſɭᴜ ſןᴜ , ꞙɭцɔɔɔ , ⟅ ſɭэ ſɭw , ꞙɭɩɔɔ ,
// ſɭэ ſɭᴜ , ſןw ſɭᴜƴ , ꞙɭı ,
// ſɭɜ ſɭ,w , ſɭɹ ſןᴜ , ꞙɭı ,
// ſɭэ ſɭw , ꞙɭı , 📃 ⟩
import * as THREE from "three";
import { alteco, akvaVem2Proksima } from "../../kantaoj/mondo/tereno.js";
import { terenaKoloroEn, alternajDiagonalojn } from "../../eskekoj/komunajxoj/terenkoloroj.js";
import { h6kuniQoxa, surokQoxa } from "../../eskekoj/komunajxoj/mapqoxa.js";
import { aktivaMapo } from "../../kantaoj/tero-datumaro/mapregulo.js";

// ⟨ ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
const GRANDECO = 0o3000;
const SEGMENTOJ = 0o600;
const SX = SEGMENTOJ + 1;
const N = SX * SX;
const PASXO = GRANDECO / SEGMENTOJ;
// ⟨ ſɭᴜ ſןᴜ , ꞙɭɿ , ⟅ ſɭэ ſɭw , ꞙɭɿ , 📃 ⟩
const TUTA = 0o1400;
const SEG_TUTA = 0o300;
const SX_TUTA = SEG_TUTA + 1;
const PASXO_TUTA = TUTA / SEG_TUTA;
const mapo = aktivaMapo();
const weh2 = new THREE.Color();

const posX = new Float32Array(N);
const posZ = new Float32Array(N);
const hoj = new Float32Array(N);
// ſɭэ ſɭw , ꞙɭɿ , ⟅ ꞙɭɿ , 📃 ⟩
const kol = new Float64Array(N * 3);
const interna = new Uint8Array(N);
{
  let p = 0, ene = 0;
  for ( let j = 0; j < SX; j++ ) {
    for ( let i = 0; i < SX; i++ ) {
      const x = -GRANDECO / 2 + i * PASXO;
      const z = -GRANDECO / 2 + j * PASXO;
      posX[p] = x; posZ[p] = z;
      if ( h6kuniQoxa(mapo.qoxa, mapo.grandeco, x, z) <= 0 ) { interna[p] = 1; ene++; }
      p++;
    }
  }
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) }ʃɹƽ ʌ ſɭɹ ſᶘɔ=${N} ｡ j͑ʃᴜ ꞁȷ̀ᴜ ʌ }ʃᴜ j͐ʃᴜ=${ene} ｡ j͑ʃᴜ ʌ j͑ʃᴜꞇ=${N - ene} ｡ ſ͕ɭᴜƣ̋ ʌ j͑ʃᴜ ʌ j͑ʃᴜꞇ=${((N - ene) / N).toFixed(3)}`);
}

function fazoAltoj( kutime: number ): number {
  let s = 0;
  for ( let i = 0; i < N; i++ ) {
    if ( interna[i] !== kutime ) continue;
    s += alteco(posX[i], posZ[i]);
  }
  return s;
}
function fazoKoloroj( kutime: number ): number {
  let s = 0;
  for ( let i = 0; i < N; i++ ) {
    if ( interna[i] !== kutime ) continue;
    const cxelo = i % SX;
    const haga = ( cxelo > 0 && cxelo < SX - 1 && i >= SX && i < N - SX )
      ? Math.hypot(hoj[i + 1] - hoj[i - 1], hoj[i + SX] - hoj[i - SX]) / ( 2 * PASXO )
      : 0;
    terenaKoloroEn(weh2, hoj[i], posX[i], posZ[i], haga, akvaVem2Proksima);
    s += weh2.r;
  }
  return s;
}

for ( let i = 0; i < N; i++ ) hoj[i] = alteco(posX[i], posZ[i]);
for ( let i = 0; i < N; i++ ) {
  const cxelo = i % SX;
  const haga = ( cxelo > 0 && cxelo < SX - 1 && i >= SX && i < N - SX )
    ? Math.hypot(hoj[i + 1] - hoj[i - 1], hoj[i + SX] - hoj[i - SX]) / ( 2 * PASXO )
    : 0;
  terenaKoloroEn(weh2, hoj[i], posX[i], posZ[i], haga, akvaVem2Proksima);
  kol[i * 3] = weh2.r; kol[i * 3 + 1] = weh2.g; kol[i * 3 + 2] = weh2.b;
}

function mezuri( ksaka: string, f: () => number ): void {
  for ( let i = 0; i < 0o10; i++ ) f();
  const tempaj: number[] = [];
  for ( let r = 0; r < 0o21; r++ ) {
    const t0 = performance.now();
    f();
    tempaj.push(performance.now() - t0);
  }
  tempaj.sort(( a, b ) => a - b);
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ${ksaka.padEnd(0o32)} mediano=${tempaj[0o10].toFixed(1)}ms min=${tempaj[0].toFixed(1)}ms`);
}

mezuri("alteco ｡ j͑ʃᴜ ꞁȷ̀ᴜ ʌ }ʃᴜ j͐ʃᴜ", () => fazoAltoj(1));
mezuri("alteco ｡ j͑ʃᴜ ʌ j͑ʃᴜꞇ ʌ }ʃᴜ j͐ʃᴜ", () => fazoAltoj(0));
mezuri("koloroj ｡ j͑ʃᴜ ꞁȷ̀ᴜ ʌ }ʃᴜ j͐ʃᴜ", () => fazoKoloroj(1));
mezuri("koloroj ｡ j͑ʃᴜ ʌ j͑ʃᴜꞇ ʌ }ʃᴜ j͐ʃᴜ", () => fazoKoloroj(0));

// ⟨ ſɭᴜ ſןᴜ , ꞙɭɿ , ⟅ ſɭэ ſɭw , 📃 ⟩
// ſɭᴜ ſןᴜ , ꞙɭɿ , ⟅ ſɭэ ſɭᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ſןw ſɭᴜƴ , ꞙɭɿ , 📃 ⟩
{
  const NT = SX_TUTA * SX_TUTA;
  const hojT = new Float32Array(NT);
  for ( let j = 0; j < SX_TUTA; j++ ) {
    for ( let i = 0; i < SX_TUTA; i++ ) {
      hojT[j * SX_TUTA + i] = alteco(-TUTA / 2 + i * PASXO_TUTA, -TUTA / 2 + j * PASXO_TUTA);
    }
  }
  let altojMalsamaj = 0, kolorojMalsamaj = 0, enTuto = 0;
  for ( let j = 0; j < SX_TUTA; j++ ) {
    for ( let i = 0; i < SX_TUTA; i++ ) {
      const x = -TUTA / 2 + i * PASXO_TUTA;
      const z = -TUTA / 2 + j * PASXO_TUTA;
      if ( h6kuniQoxa(mapo.qoxa, mapo.grandeco, x, z) > 0 ) continue;
      enTuto++;
      const idx = j * SX_TUTA + i;
      const idxS23ohk2sai = ( ( z + GRANDECO / 2 ) / PASXO ) * SX + ( x + GRANDECO / 2 ) / PASXO;
      if ( hojT[idx] !== hoj[idxS23ohk2sai] ) altojMalsamaj++;
      const cxelo = i % SX_TUTA;
      const haga = ( cxelo > 0 && cxelo < SX_TUTA - 1 && idx >= SX_TUTA && idx < NT - SX_TUTA )
        ? Math.hypot(hojT[idx + 1] - hojT[idx - 1], hojT[idx + SX_TUTA] - hojT[idx - SX_TUTA]) / ( 2 * PASXO_TUTA )
        : 0;
      terenaKoloroEn(weh2, hojT[idx], x, z, haga, akvaVem2Proksima);
      if ( weh2.r !== kol[idxS23ohk2sai * 3] || weh2.g !== kol[idxS23ohk2sai * 3 + 1] || weh2.b !== kol[idxS23ohk2sai * 3 + 2] ) {
        kolorojMalsamaj++;
      }
    }
  }
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) j͐ʃᴜ ſ͕ɭɜ ŋᷠɹ ｡ j͑ʃᴜ ꞁȷ̀ᴜ ʌ }ʃᴜ j͐ʃᴜ=${enTuto} ｡ j͐ʃэ ɭ(ᴜ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ=${altojMalsamaj} ｡ ſɭɔʞ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ=${kolorojMalsamaj}`);
}

// ⟨ ſɭɜ ſɭ,w , ꞙɭɿ , ⟅ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
// ſɭɜ ſɭ,w , j͑ʃᴜ ſɭ,w , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
function kreuTerenon( grandeco: number, has2nasce: number ): () => number {
  const sx = has2nasce + 1;
  const n = sx * sx;
  const vepat6ni = grandeco / has2nasce;
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
        const x = -grandeco / 2 + i * vepat6ni, z = -grandeco / 2 + j * vepat6ni;
        px[k] = x; pz[k] = z;
        const h = alteco(x, z);
        hh[k] = h; s += h;
      }
    }
    for ( let k = 0; k < n; k++ ) {
      const cxelo = k % sx;
      const haga = ( cxelo > 0 && cxelo < sx - 1 && k >= sx && k < n - sx )
        ? Math.hypot(hh[k + 1] - hh[k - 1], hh[k + sx] - hh[k - sx]) / ( 2 * vepat6ni )
        : 0;
      terenaKoloroEn(kk, hh[k], px[k], pz[k], haga, akvaVem2Proksima);
      s += kk.r;
    }
    for ( let k = 0; k < n; k++ ) {
      if ( surokQoxa(mapo.qoxa, mapo.grandeco, px[k], pz[k], prem) ) { px[k] = prem.x; pz[k] = prem.z; s++; }
    }
    s += alternajDiagonalojn(has2nasce).length;
    return s;
  };
}

{
  const A = kreuTerenon(0o3000, 0o600);
  const B = kreuTerenon(0o1400, 0o300);
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
  if ( surokQoxa(mapo.qoxa, mapo.grandeco, posX[i], posZ[i], premita) ) premitaj++;
}
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) }ʃɹƽ ʌ ſןw ſɭᴜƴ=${premitaj} ｡ ſ͕ɭɜ ɭʃɹ ı],ɔ ɭl̀ᴜ=${2 * SEGMENTOJ * SEGMENTOJ} ｡ ſ͕ɭɜ ɭʃɹ ı],ɔ ŋᷠɹ=${2 * SEG_TUTA * SEG_TUTA}`);
let haKekkozusaiUzataj = 0;
for ( let j = 0; j < SEG_TUTA; j++ ) {
  for ( let i = 0; i < SEG_TUTA; i++ ) {
    let internaK2pa = false;
    for ( const [ di, dj ] of [ [ 0, 0 ], [ 1, 0 ], [ 0, 1 ], [ 1, 1 ] ] as const ) {
      const x = -TUTA / 2 + ( i + di ) * PASXO_TUTA;
      const z = -TUTA / 2 + ( j + dj ) * PASXO_TUTA;
      if ( h6kuniQoxa(mapo.qoxa, mapo.grandeco, x, z) <= 0 ) internaK2pa = true;
    }
    if ( internaK2pa ) haKekkozusaiUzataj++;
  }
}
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ſɭɹ ſןᴜ ʌ ſɭɜ ſɭ,w ʌ ſןw ſɭᴜƴ=${haKekkozusaiUzataj}/${SEG_TUTA * SEG_TUTA} ｡ ſ͕ɭɜ ɭʃɹ ı],ɔ ʌ jɑʃᴜ ſȷᴜ=${haKekkozusaiUzataj * 2}`);
