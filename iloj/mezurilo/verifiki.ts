// ≺⧼ ការផ្ទៀងផ្ទាត់ភាពស្មើគ្នា ✅ ⧽≻
import { bruo2D } from "../../eskekoj/komunajxoj/terenkoloroj.js";
import { specimenoBikuba, specimenoDulineara } from "../../kantaoj/mondo/akvokalkulo.js";
import { katmullRom } from "../../kantaoj/komunajxoj/interpolo.js";

let eraroj = 0;
function kontrolu(nomo: string, a: number, b: number): void {
  if (Math.abs(a - b) > 1e-9) {
    eraroj++;
    if (eraroj < 0o10) console.log(`( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${nomo} malegalas ${a} != ${b}`);
  }
}

// ⟨ កំណែចាស់នៃ bruo2D 📃 ⟩
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

let s1 = 1;
const hazardo = () => ((s1 = (Math.imul(s1, 0x41C64E6D) + 0x3039) | 0) >>> 0) / 0o40000000000;

for (let i = 0; i < 0o100000; i++) {
  const x = hazardo() * 0o4000 - 0o2000, z = hazardo() * 0o4000 - 0o2000;
  kontrolu("bruo2D", bruo2D(x, z), bruo2DMalnova(x, z));
}

// ⟨ កំណែចាស់នៃ specimenoBikuba 📃 ⟩
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

// ⟨ កំណែចាស់នៃ skulptaDelta 📃 ⟩
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
function deltoNova(T: Int16Array, n: number, paso: number, o: number[], x: number, z: number): number {
  const fk = (w: number): number => { const n1 = n - 1; return w < 0 ? 0 : w > n1 ? n1 : w; };
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

const N = 0o300;
const K = new Float32Array(N * N);
const T = new Int16Array(N * N);
for (let i = 0; i < K.length; i++) { K[i] = (hazardo() * 0o40 - 0o20); T[i] = (hazardo() * 0o200 - 0o100) | 0; }
const O = [-0o600, -0o600];
for (let i = 0; i < 0o100000; i++) {
  const x = hazardo() * 0o4000 - 0o2000, z = hazardo() * 0o4000 - 0o2000;
  kontrolu("bikuba", specimenoBikuba(K, N, 0o4, O, x, z), bikubaMalnova(K, N, 0o4, O, x, z));
  kontrolu("delto", deltoNova(T, N, 0o4, O, x, z), deltoMalnova(T, N, 0o4, O, x, z));
}
// ⟨ តេស្តគែម ៖ ក្រៅដែន 📃 ⟩
for (const [x, z] of [[-0o10000, -0o10000], [0o10000, 0o10000], [-0o600, -0o600], [0, 0]]) {
  kontrolu("bikuba rando", specimenoBikuba(K, N, 0o4, O, x, z), bikubaMalnova(K, N, 0o4, O, x, z));
  kontrolu("delto rando", deltoNova(T, N, 0o4, O, x, z), deltoMalnova(T, N, 0o4, O, x, z));
}
// ⟨ specimenoDulineara មិនប្រែ 📃 ⟩
kontrolu("dulineara", specimenoDulineara(K, N, 0o4, O, 0o10, 0o20), specimenoDulineara(K, N, 0o4, O, 0o10, 0o20));

if (eraroj === 0) console.log("( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ទាំងអស់ស្មើគ្នា ✅");
else console.log(`( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) មានភាពខុសគ្នា ${eraroj}`);
