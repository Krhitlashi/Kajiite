// ≺⧼ ការវាស់ប្រៀបធៀប A/B ក្នុងដំណើរការតែមួយ 📏 ⧽≻
// ការវាស់តាមដំណើរការដាច់ដោយឡែកមានសំឡេងច្រើន ។ នៅទីនេះ កំណែចាស់ និងថ្មី
// រត់បញ្ច្រាសគ្នាក្នុងដំណើរការតែមួយ ដើម្បីលុបសំឡេងនៃម៉ាស៊ីន ។
import { bruo2D as bruo2DNova, terenaKoloroEn } from "../../eskekoj/komunajxoj/terenkoloroj.js";
import { specimenoBikuba as bikubaNova } from "../../kantaoj/mondo/akvokalkulo.js";
import { katmullRom } from "../../kantaoj/komunajxoj/interpolo.js";
import { alteco, akvaNiveloProksima } from "../../kantaoj/mondo/tereno.js";
import * as THREE from "three";

// ⟪ កំណែចាស់ ៖ ចម្លងចេញពី git មុនការកែ 📃 ⟫
function bruo2DMalnova(x: number, z: number): number {
  const ix = Math.floor(x), iz = Math.floor(z);
  const fx = x - ix, fz = z - iz;
  const h = (xi: number, zi: number): number => {
    let n = (xi * 0x28f0f0 + zi * 0x28d8e8) | 0;
    n = (n ^ (n >>> 0o15)) * 0x48a028;
    return ((n ^ (n >>> 0o20)) >>> 0) / 0o40000000000;
  };
  const a = h(ix, iz), b = h(ix + 1, iz), c = h(ix, iz + 1), d = h(ix + 1, iz + 1);
  const u = fx * fx * (3 - 2 * fx);
  const v = fz * fz * (3 - 2 * fz);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function bikubaMalnova(krado: Float32Array, n: number, paso: number, origino: number[], x: number, z: number): number {
  const fx = (x - origino[0]) / paso, fz = (z - origino[1]) / paso;
  const i0 = Math.floor(fx), j0 = Math.floor(fz);
  const u = fx - i0, v = fz - j0;
  const val = (i: number, j: number): number => {
    const ii = Math.max(0, Math.min(n - 1, i));
    const jj = Math.max(0, Math.min(n - 1, j));
    return krado[jj * n + ii];
  };
  const vico = (j: number): number => katmullRom(val(i0 - 1, j), val(i0, j), val(i0 + 1, j), val(i0 + 2, j), u);
  return Math.max(0, katmullRom(vico(j0 - 1), vico(j0), vico(j0 + 1), vico(j0 + 2), v));
}
function deltoNova(T: Int16Array, n: number, paso: number, o: number[], x: number, z: number): number {
  const n1 = n - 1;
  const fk = (w: number): number => (w < 0 ? 0 : w > n1 ? n1 : w);
  const fx = (x - o[0]) / paso, fz = (z - o[1]) / paso;
  const i0 = Math.floor(fx), j0 = Math.floor(fz);
  const u = fx - i0, v = fz - j0;
  const c0 = fk(i0 - 1), c1 = fk(i0), c2 = fk(i0 + 1), c3 = fk(i0 + 2);
  const r0 = fk(j0 - 1) * n, r1 = fk(j0) * n, r2 = fk(j0 + 1) * n, r3 = fk(j0 + 2) * n;
  const m = katmullRom(
    katmullRom(T[r0 + c0], T[r0 + c1], T[r0 + c2], T[r0 + c3], u),
    katmullRom(T[r1 + c0], T[r1 + c1], T[r1 + c2], T[r1 + c3], u),
    katmullRom(T[r2 + c0], T[r2 + c1], T[r2 + c2], T[r2 + c3], u),
    katmullRom(T[r3 + c0], T[r3 + c1], T[r3 + c2], T[r3 + c3], u), v);
  return m / 0o20;
}
function deltoMalnova(T: Int16Array, n: number, paso: number, o: number[], x: number, z: number): number {
  const val = (i: number, j: number): number => {
    const ii = Math.max(0, Math.min(n - 1, i));
    const jj = Math.max(0, Math.min(n - 1, j));
    return T[jj * n + ii];
  };
  const fx = (x - o[0]) / paso, fz = (z - o[1]) / paso;
  const i0 = Math.floor(fx), j0 = Math.floor(fz);
  const u = fx - i0, v = fz - j0;
  const vico = (j: number): number => katmullRom(val(i0 - 1, j), val(i0, j), val(i0 + 1, j), val(i0 + 2, j), u);
  return katmullRom(vico(j0 - 1), vico(j0), vico(j0 + 1), vico(j0 + 2), v) / 0o20;
}

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

