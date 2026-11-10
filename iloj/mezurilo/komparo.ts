// ≺⧼ ការវាស់ប្រៀបធៀប A/B ក្នុងដំណើរការតែមួយ 📏 ⧽≻
// ការវាស់តាមដំណើរការដាច់ដោយឡែកមានសំឡេងច្រើន ។ នៅទីនេះ កំណែចាស់ និងថ្មី
// រត់បញ្ច្រាសគ្នាក្នុងដំណើរការតែមួយ ដើម្បីលុបសំឡេងនៃម៉ាស៊ីន ។
import { bruo2D as bruo2DNova, terenaKoloroEn } from "../../eskekoj/komunajxoj/terenkoloroj.js";
import { specimenoBikuba as bikubaNova } from "../../kantaoj/mondo/akvokalkulo.js";
import { bruo2DMalnova, bikubaMalnova, deltoMalnova, deltoNova } from "./bazlinio.js";
import { alteco, akvaNiveloProksima } from "../../kantaoj/mondo/tereno.js";
import * as THREE from "three";

// ⟨ ច្បាប់ចាស់ទាំងបួនមកពី bazlinio ។ គ្រាប់ពូជចៃដន្យនៅទីនេះ
//   ខុសពី verifiki ដដែល ដើម្បីរក្សាក្រឡាសាកល្បងរបស់ឧបករណ៍នីមួយៗ ។ 📃 ⟩

let semo = 0o12345;
const hazardo = (): number => ((semo = (Math.imul(semo, 0x41C64E6D) + 0x3039) | 0) >>> 0) / 0o40000000000;
const RONDOR = 0o11;
const K = new Float32Array(0o300 * 0o300);
const T = new Int16Array(0o300 * 0o300);
for (let i = 0; i < K.length; i++) { K[i] = hazardo() * 0o40 - 0o20; T[i] = (hazardo() * 0o200 - 0o100) | 0; }

// ចំណាំ ៖ ការបិទ ( closure ) នីមួយៗ មានរង្វិលជុំខាងក្នុងរួចហើយ ។ ដូច្នេះ ប៉ារ៉ាម៉ែត្រ ripetoj
// ត្រូវតែជា 0o1 ដើម្បីកុំឱ្យមានរង្វិលជុំជាន់គ្នាបង្កើនទ្វេគុណ ។
function mezuriPare(nomo: string, ripetoj: number, nova: () => number, malnova: () => number): void {
  for (let i = 0; i < 0o4; i++) { nova(); malnova(); }
  const tn: number[] = [], tm: number[] = [];
  // យើងប្រមូលលទ្ធផលដែលអនុគមន៍ត្រឡប់មកវិញ ដើម្បីកុំឱ្យ V8 លុបការហៅចោល
  // ព្រមទាំងផ្ទៀងផ្ទាត់ថាកំណែចាស់ និងថ្មីផ្តល់លេខដូចគ្នាបេះបិទ ។
  let sn = 0, sm = 0;
  // ឆ្លាស់លំដាប់រាល់ជុំ ៖ ជុំគូរត់ថ្មីមុន , ជុំសេសរត់ចាស់មុន ដើម្បីលុបភាពលំអៀងតាមលំដាប់ ។
  for (let r = 0; r < RONDOR; r++) {
    if ((r & 1) === 0) {
      let t0 = performance.now(); for (let i = 0; i < ripetoj; i++) sn += nova();
      tn.push(performance.now() - t0);
      t0 = performance.now(); for (let i = 0; i < ripetoj; i++) sm += malnova();
      tm.push(performance.now() - t0);
    } else {
      let t0 = performance.now(); for (let i = 0; i < ripetoj; i++) sm += malnova();
      tm.push(performance.now() - t0);
      t0 = performance.now(); for (let i = 0; i < ripetoj; i++) sn += nova();
      tn.push(performance.now() - t0);
    }
  }
  const mediano = (a: number[]) => { a.sort((x, y) => x - y); return a[a.length >> 1]; };
  const mn = mediano(tn), mm = mediano(tm);
  const kn = Math.min(...tn), km = Math.min(...tm);
  const egala = sn === sm ? "លេខស្មើគ្នា" : "លេខខុសគ្នា";
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ${nomo.padEnd(0o20)} ចាស់=${mm.toFixed(1)}ms ថ្មី=${mn.toFixed(1)}ms លឿន=${(mm / mn).toFixed(2)}x លឿនល្អបំផុត=${(km / kn).toFixed(2)}x ${egala}`);
}

mezuriPare("bruo2D", 0o1, () => { let s = 0; for (let i = 0; i < 0o2000000; i++) s += bruo2DNova(i * 0.03125, i * 0.015625); return s; },
  () => { let s = 0; for (let i = 0; i < 0o2000000; i++) s += bruo2DMalnova(i * 0.03125, i * 0.015625); return s; });

mezuriPare("specimenoBikuba", 0o1, () => { let s = 0; for (let i = 0; i < 0o400000; i++) s += bikubaNova(K, 0o300, 0o4, [-0o600, -0o600], (i % 0o1000) - 0o500, (i % 0o777) - 0o400); return s; },
  () => { let s = 0; for (let i = 0; i < 0o400000; i++) s += bikubaMalnova(K, 0o300, 0o4, [-0o600, -0o600], (i % 0o1000) - 0o500, (i % 0o777) - 0o400); return s; });

mezuriPare("skulptaDelta", 0o1, () => { let s = 0; for (let i = 0; i < 0o400000; i++) s += deltoNova(T, 0o300, 0o4, [-0o600, -0o600], (i % 0o1000) - 0o500, (i % 0o777) - 0o400); return s; },
  () => { let s = 0; for (let i = 0; i < 0o400000; i++) s += deltoMalnova(T, 0o300, 0o4, [-0o600, -0o600], (i % 0o1000) - 0o500, (i % 0o777) - 0o400); return s; });

// ⟨ លំហូរពេញ ៖ កម្ពស់ + ពណ៌ លើក្រឡាពិត 📃 ⟩
const SX = 0o300 + 1, GR = 0o1400, PS = GR / 0o300;
const px = new Float32Array(SX * SX), pz = new Float32Array(SX * SX), hh = new Float32Array(SX * SX);
{ let p = 0; for (let j = 0; j < SX; j++) for (let i = 0; i < SX; i++) { px[p] = -GR / 2 + i * PS; pz[p] = -GR / 2 + j * PS; p++; } }
const kol = new THREE.Color();
function fluoNova(): number {
  let s = 0;
  for (let i = 0; i < px.length; i++) { const h = alteco(px[i], pz[i]); hh[i] = h; s += h; }
  for (let i = 0; i < px.length; i++) {
    const c = i % SX;
    const d = (c > 0 && c < SX - 1 && i >= SX && i < px.length - SX) ? Math.hypot(hh[i + 1] - hh[i - 1], hh[i + SX] - hh[i - SX]) / (2 * PS) : 0;
    terenaKoloroEn(kol, hh[i], px[i], pz[i], d, akvaNiveloProksima); s += kol.r;
  }
  return s;
}
function mezuriUnu(nomo: string, f: () => number): void {
  for (let i = 0; i < 0o4; i++) f();
  const t: number[] = [];
  let s = 0;
  for (let r = 0; r < RONDOR; r++) { const t0 = performance.now(); s += f(); t.push(performance.now() - t0); }
  t.sort((a, b) => a - b);
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ${nomo.padEnd(0o20)} mediano=${t[t.length >> 1].toFixed(1)}ms min=${t[0].toFixed(1)}ms ផលបូក=${s.toFixed(0o2)}`);
}
mezuriUnu("លំហូរពេញ ( ថ្មី )", fluoNova);

