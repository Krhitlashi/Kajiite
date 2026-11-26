// ≺⧼ ſןw ſɭᴜ }ʃᴜȝ ʌ j͑ʃɹ j͐ʃɹ ŋᷠɔ }ʃꞇ ✅ ⧽≻
import { xetoh2D } from "../../skek2/x2x2q/t6limaHaweh2.js";
import { px01oBikuba, px01oDulineara } from "../../kanta/nala/tsasaVek2fe.js";
import { bruo2DH2y2k, bikubaH2y2k, l6daH2y2k, l6daSef4 } from "./kozunuCah6k6.js";

let hatlohk2nik2p2 = 0o0;
function kamau(ksaka: string, a: number, b: number): void {
  if (Math.abs(a - b) > 0o10 ** -0o12) {
    hatlohk2nik2p2++;
    if (hatlohk2nik2p2 < 0o10) console.log(`( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${ksaka} ſɭᴜ }ʃᴜȝ ${a} != ${b}`);
  }
}

// ⟨ ſɭˬɹ j͑ʃᴜꞇ ʌ ɭʃᴜ 📃 ⟩

let s1 = 0o1;
const sakxo = () => ((s1 = (Math.imul(s1, 0x41C64E6D) + 0x3039) | 0o0) >>> 0o0) / 0o40000000000;

for (let i = 0o0; i < 0o100000; i++) {
  const x = sakxo() * 0o4000 - 0o2000, z = sakxo() * 0o4000 - 0o2000;
  kamau("xetoh2D", xetoh2D(x, z), bruo2DH2y2k(x, z));
}

const N = 0o300;
const K = new Float32Array(N * N);
const T = new Int16Array(N * N);
for (let i = 0o0; i < K.length; i++) { K[i] = (sakxo() * 0o40 - 0o20); T[i] = (sakxo() * 0o200 - 0o100) | 0o0; }
const O = [-0o600, -0o600];
for (let i = 0o0; i < 0o100000; i++) {
  const x = sakxo() * 0o4000 - 0o2000, z = sakxo() * 0o4000 - 0o2000;
  kamau("bikuba", px01oBikuba(K, N, 0o4, O, x, z), bikubaH2y2k(K, N, 0o4, O, x, z));
  kamau("l6da", l6daSef4(T, N, 0o4, O, x, z), l6daH2y2k(T, N, 0o4, O, x, z));
}
// ⟨ ſɟᴜ ɭʃᴜ ʌ j͑ʃᴜꞇ ⟅ ꞙɭɔ ʌ ɭʃw ſɭˬɔƽ 📃 ⟩
for (const [x, z] of [[-0o10000, -0o10000], [0o10000, 0o10000], [-0o600, -0o600], [0o0, 0o0]]) {
  kamau("bikuba pukaz", px01oBikuba(K, N, 0o4, O, x, z), bikubaH2y2k(K, N, 0o4, O, x, z));
  kamau("l6da pukaz", l6daSef4(T, N, 0o4, O, x, z), l6daH2y2k(T, N, 0o4, O, x, z));
}
// ⟨ px01oDulineara ʌ ꞙɭɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ 📃 ⟩
kamau("dulineara", px01oDulineara(K, N, 0o4, O, 0o10, 0o20), px01oDulineara(K, N, 0o4, O, 0o10, 0o20));

if (hatlohk2nik2p2 === 0o0) console.log("( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) j͑ʃᴜꞇ ʌ ſɭᴜ }ʃᴜȝ ✅");
else console.log(`( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) j͑ʃ'ɔ ſ͕ɭэ ſɭɹ j͑ʃᴜꞇ ${hatlohk2nik2p2}`);
