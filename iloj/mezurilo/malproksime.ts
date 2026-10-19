// ≺⧼ ការវាស់វត្ថុឆ្ងាយ 🔭 ⧽≻
// ដីត្រូវបានសង់លើយន្តហោះធំ ( 0o3000 ) ប៉ុន្តែពិភពលោកមានកាំតែ 0o600 ។
// ចំណុចក្រៅទម្រង់ត្រូវបានចុចត្រឡប់មកគែម ។ យើងវាស់ថាតើការងារប៉ុន្មាន
// ធ្លាក់លើចំណុចឆ្ងាយទាំងនោះ ។ បន្ទាប់មកយើងពិនិត្យថាតើយន្តហោះតូច
// រក្សាលេខខាងក្នុងពិភពលោកដូចគ្នាបេះបិទឬអត់ ។
import * as THREE from "three";
import { alteco, akvaNiveloProksima } from "../../kantaoj/mondo/tereno.js";
import { terenaKoloroEn, alternajDiagonalojn } from "../../eskekoj/komunajxoj/terenkoloroj.js";
import { distancoDeFormo, premuAlFormo } from "../../eskekoj/komunajxoj/mapformo.js";
import { aktivaMapo } from "../../kantaoj/tero-datumaro/mapregulo.js";

// ⟨ យន្តហោះបច្ចុប្បន្ន 📃 ⟩
const GRANDECO = 0o3000;
const SEGMENTOJ = 0o600;
const SX = SEGMENTOJ + 1;
const N = SX * SX;
const PASXO = GRANDECO / SEGMENTOJ;
// ⟨ យន្តហោះតូច ៖ ទទឹងស្មើអង្កត់ផ្ចិតពិភពលោក , ជំហានដូចគ្នា 📃 ⟩
const TUTA = 0o1400;
const SEG_TUTA = 0o300;
const SX_TUTA = SEG_TUTA + 1;
const PASXO_TUTA = TUTA / SEG_TUTA;
const mapo = aktivaMapo();
const koloro = new THREE.Color();

const posX = new Float32Array(N);
const posZ = new Float32Array(N);
const hoj = new Float32Array(N);
// ត្រូវជាលេខទ្វេ ៖ បើជា float32 ការប្រៀបធៀបនឹងខុសដោយសារការកាត់តម្លៃ ។
const kol = new Float64Array(N * 3);
const interna = new Uint8Array(N);
{
  let p = 0, ene = 0;
  for ( let j = 0; j < SX; j++ ) {
    for ( let i = 0; i < SX; i++ ) {
      const x = -GRANDECO / 2 + i * PASXO;
      const z = -GRANDECO / 2 + j * PASXO;
      posX[p] = x; posZ[p] = z;
      if ( distancoDeFormo(mapo.formo, mapo.grandeco, x, z) <= 0 ) { interna[p] = 1; ene++; }
      p++;
    }
  }
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ចំណុចសរុប=${N} ក្នុងពិភពលោក=${ene} ក្រៅ=${N - ene} ភាគក្រៅ=${((N - ene) / N).toFixed(3)}`);
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
    const deklivo = ( cxelo > 0 && cxelo < SX - 1 && i >= SX && i < N - SX )
      ? Math.hypot(hoj[i + 1] - hoj[i - 1], hoj[i + SX] - hoj[i - SX]) / ( 2 * PASXO )
      : 0;
    terenaKoloroEn(koloro, hoj[i], posX[i], posZ[i], deklivo, akvaNiveloProksima);
    s += koloro.r;
  }
  return s;
}

for ( let i = 0; i < N; i++ ) hoj[i] = alteco(posX[i], posZ[i]);
for ( let i = 0; i < N; i++ ) {
  const cxelo = i % SX;
  const deklivo = ( cxelo > 0 && cxelo < SX - 1 && i >= SX && i < N - SX )
    ? Math.hypot(hoj[i + 1] - hoj[i - 1], hoj[i + SX] - hoj[i - SX]) / ( 2 * PASXO )
    : 0;
  terenaKoloroEn(koloro, hoj[i], posX[i], posZ[i], deklivo, akvaNiveloProksima);
  kol[i * 3] = koloro.r; kol[i * 3 + 1] = koloro.g; kol[i * 3 + 2] = koloro.b;
}

function mezuri( nomo: string, f: () => number ): void {
  for ( let i = 0; i < 0o10; i++ ) f();
  const tempaj: number[] = [];
  for ( let r = 0; r < 0o21; r++ ) {
    const t0 = performance.now();
    f();
    tempaj.push(performance.now() - t0);
  }
  tempaj.sort(( a, b ) => a - b);
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ${nomo.padEnd(0o32)} mediano=${tempaj[0o10].toFixed(1)}ms min=${tempaj[0].toFixed(1)}ms`);
}

mezuri("alteco តែក្នុងពិភពលោក", () => fazoAltoj(1));
mezuri("alteco តែក្រៅពិភពលោក", () => fazoAltoj(0));
mezuri("koloroj តែក្នុងពិភពលោក", () => fazoKoloroj(1));
mezuri("koloroj តែក្រៅពិភពលោក", () => fazoKoloroj(0));

// ⟨ ពិនិត្យ ភាពដូចគ្នានៃយន្តហោះតូច 📃 ⟩
// យន្តហោះតូចប្រើចំណុចដូចគ្នា ។ បញ្ហាតែមួយគត់គឺសន្ទស្សន៍ជាប់គែម
// ដែលគ្មានអ្នកជិតខាង ។ ដូច្នេះជម្រាល ( និងពណ៌ ) អាចខុសតែនៅជួរខាងក្រៅ ។
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
      if ( distancoDeFormo(mapo.formo, mapo.grandeco, x, z) > 0 ) continue;
      enTuto++;
      const idx = j * SX_TUTA + i;
      const idxMalnova = ( ( z + GRANDECO / 2 ) / PASXO ) * SX + ( x + GRANDECO / 2 ) / PASXO;
      if ( hojT[idx] !== hoj[idxMalnova] ) altojMalsamaj++;
      const cxelo = i % SX_TUTA;
      const deklivo = ( cxelo > 0 && cxelo < SX_TUTA - 1 && idx >= SX_TUTA && idx < NT - SX_TUTA )
        ? Math.hypot(hojT[idx + 1] - hojT[idx - 1], hojT[idx + SX_TUTA] - hojT[idx - SX_TUTA]) / ( 2 * PASXO_TUTA )
        : 0;
      terenaKoloroEn(koloro, hojT[idx], x, z, deklivo, akvaNiveloProksima);
      if ( koloro.r !== kol[idxMalnova * 3] || koloro.g !== kol[idxMalnova * 3 + 1] || koloro.b !== kol[idxMalnova * 3 + 2] ) {
        kolorojMalsamaj++;
      }
    }
  }
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) យន្តហោះតូច ក្នុងពិភពលោក=${enTuto} កម្ពស់ខុស=${altojMalsamaj} ពណ៌ខុស=${kolorojMalsamaj}`);
}

// ⟨ ការសង់ដីទាំងស្រុង ៖ ធំ ធៀបនឹង តូច , ឆ្លាស់គ្នា 📃 ⟩
// យើងធ្វើតាមលំដាប់នៃ konstruiTerenon ៖ កម្ពស់ , ពណ៌ , ការចុច , សន្ទស្សន៍ ។
// អង្គចងចាំត្រូវបានបម្រុងទុកម្តង ។ តម្លៃ min ទុកចិត្តបានជាង mediano ។
function kreuTerenon( grandeco: number, segmentoj: number ): () => number {
  const sx = segmentoj + 1;
  const n = sx * sx;
  const paso = grandeco / segmentoj;
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
        const x = -grandeco / 2 + i * paso, z = -grandeco / 2 + j * paso;
        px[k] = x; pz[k] = z;
        const h = alteco(x, z);
        hh[k] = h; s += h;
      }
    }
    for ( let k = 0; k < n; k++ ) {
      const cxelo = k % sx;
      const deklivo = ( cxelo > 0 && cxelo < sx - 1 && k >= sx && k < n - sx )
        ? Math.hypot(hh[k + 1] - hh[k - 1], hh[k + sx] - hh[k - sx]) / ( 2 * paso )
        : 0;
      terenaKoloroEn(kk, hh[k], px[k], pz[k], deklivo, akvaNiveloProksima);
      s += kk.r;
    }
    for ( let k = 0; k < n; k++ ) {
      if ( premuAlFormo(mapo.formo, mapo.grandeco, px[k], pz[k], prem) ) { px[k] = prem.x; pz[k] = prem.z; s++; }
    }
    s += alternajDiagonalojn(segmentoj).length;
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
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ដី A/B ធំ=${ma.toFixed(1)}ms min=${ta[0].toFixed(1)} តូច=${mb.toFixed(1)}ms min=${tb[0].toFixed(1)} លឿន=${(ma / mb).toFixed(2)}x`);
}

// ⟨ ចំណុចដែលចុចមកគែម 📃 ⟩
let premitaj = 0;
const premita = { x: 0, z: 0 };
for ( let i = 0; i < N; i++ ) {
  if ( premuAlFormo(mapo.formo, mapo.grandeco, posX[i], posZ[i], premita) ) premitaj++;
}
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ចំណុចចុចមកគែម=${premitaj} ត្រីកោណធំ=${2 * SEGMENTOJ * SEGMENTOJ} ត្រីកោណតូច=${2 * SEG_TUTA * SEG_TUTA}`);
