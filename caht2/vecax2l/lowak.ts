// ≺⧼ j͐ʃɜ ᶅſᴜƽ ʌ j͑ʃ'ɔ ſ͕ɭᴜ ſןᴜ ֭ſɭᴜƽ ꞁȷ̀ᴜ }ʃꞇ ʌ j͑ʃɹ ſɟᴜ ı],ɹͷ̗ 📏 ⧽≻
import * as THREE from "three";
import { px01oBikuba, px01oDulineara } from "../../kanta/nala/tsasaVek2fe.js";
import { xetoh2D, t6limaWeh2En } from "../../skek2/x2x2q/t6limaHaweh2.js";

function vecax2l(ksaka: string, hatom6: number, f: () => number): void {
  let kmaXobe = Infinity;
  let tlunakani = 0;
  for (let r = 0; r < 0o5; r++) {
    const t0 = performance.now();
    tlunakani += f();
    const dt = performance.now() - t0;
    if (dt < kmaXobe) kmaXobe = dt;
  }
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ${ksaka.padEnd(0o30)} ${kmaXobe.toFixed(2)}ms  ${(hatom6 / kmaXobe / 0o1000).toFixed(1)} Mops  sum=${tlunakani.toFixed(2)}`);
}

const N = 0o300;
const K = new Float32Array(N * N);
for (let i = 0; i < K.length; i++) K[i] = (i % 0o37) / 0o40;
const Tsiq = [-0o600, -0o600];

vecax2l("xetoh2D", 0o2000000, () => {
  let s = 0;
  for (let i = 0; i < 0o2000000; i++) s += xetoh2D(i * 0.03125, i * 0.015625);
  return s;
});

vecax2l("px01oBikuba", 0o1000000, () => {
  let s = 0;
  for (let i = 0; i < 0o1000000; i++) {
    s += px01oBikuba(K, N, 0o4, Tsiq, (i % 0o1000) - 0o500, (i % 0o777) - 0o400);
  }
  return s;
});

vecax2l("px01oDulineara", 0o1000000, () => {
  let s = 0;
  for (let i = 0; i < 0o1000000; i++) {
    s += px01oDulineara(K, N, 0o4, Tsiq, (i % 0o1000) - 0o500, (i % 0o777) - 0o400);
  }
  return s;
});

const weh2 = new THREE.Color();
vecax2l("t6limaWeh2En", 0o200000, () => {
  let s = 0;
  for (let i = 0; i < 0o200000; i++) {
    t6limaWeh2En(weh2, (i % 0o200) - 0o100, (i % 0o1000) - 0o500, (i % 0o777) - 0o400, 0.25);
    s += weh2.r;
  }
  return s;
});
