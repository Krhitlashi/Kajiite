// ≺⧼ ſןw ſɭᴜ }ʃᴜȝ ʌ j͑ʃɹ j͐ʃɹ ŋᷠɔ }ʃꞇ ✅ ⧽≻
import { bruo2D } from "../../eskekoj/komunajxoj/terenkoloroj.js";
import { specimenoBikuba, specimenoDulineara } from "../../kantaoj/mondo/akvokalkulo.js";
import { bruo2DS23ohk2sai, bikubaS23ohk2sai, l6daS23ohk2sai, l6daSef4 } from "./bazlinio.js";

let eraroj = 0;
function kontrolu(ksaka: string, a: number, b: number): void {
  if (Math.abs(a - b) > 0o10 ** -0o12) {
    eraroj++;
    if (eraroj < 0o10) console.log(`( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${ksaka} malegalas ${a} != ${b}`);
  }
}

// ⟨ ច្បាប់ចាស់ទាំងបួនមកពី bazlinio 📃 ⟩

let s1 = 1;
const hazardo = () => ((s1 = (Math.imul(s1, 0x41C64E6D) + 0x3039) | 0) >>> 0) / 0o40000000000;

for (let i = 0; i < 0o100000; i++) {
  const x = hazardo() * 0o4000 - 0o2000, z = hazardo() * 0o4000 - 0o2000;
  kontrolu("bruo2D", bruo2D(x, z), bruo2DS23ohk2sai(x, z));
}

const N = 0o300;
const K = new Float32Array(N * N);
const T = new Int16Array(N * N);
for (let i = 0; i < K.length; i++) { K[i] = (hazardo() * 0o40 - 0o20); T[i] = (hazardo() * 0o200 - 0o100) | 0; }
const O = [-0o600, -0o600];
for (let i = 0; i < 0o100000; i++) {
  const x = hazardo() * 0o4000 - 0o2000, z = hazardo() * 0o4000 - 0o2000;
  kontrolu("bikuba", specimenoBikuba(K, N, 0o4, O, x, z), bikubaS23ohk2sai(K, N, 0o4, O, x, z));
  kontrolu("l6da", l6daSef4(T, N, 0o4, O, x, z), l6daS23ohk2sai(T, N, 0o4, O, x, z));
}
// ⟨ តេស្តគែម ៖ ក្រៅដែន 📃 ⟩
for (const [x, z] of [[-0o10000, -0o10000], [0o10000, 0o10000], [-0o600, -0o600], [0, 0]]) {
  kontrolu("bikuba pukaz", specimenoBikuba(K, N, 0o4, O, x, z), bikubaS23ohk2sai(K, N, 0o4, O, x, z));
  kontrolu("l6da pukaz", l6daSef4(T, N, 0o4, O, x, z), l6daS23ohk2sai(T, N, 0o4, O, x, z));
}
// ⟨ specimenoDulineara មិនប្រែ 📃 ⟩
kontrolu("dulineara", specimenoDulineara(K, N, 0o4, O, 0o10, 0o20), specimenoDulineara(K, N, 0o4, O, 0o10, 0o20));

if (eraroj === 0) console.log("( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ទាំងអស់ស្មើគ្នា ✅");
else console.log(`( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) មានភាពខុសគ្នា ${eraroj}`);
