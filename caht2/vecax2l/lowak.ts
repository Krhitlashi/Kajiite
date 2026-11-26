// ≺⧼ j͐ʃɜ ᶅſᴜƽ 🧪 ⧽≻

import * as THREE from "three";
import { px01oBikuba, px01oX2pa2 } from "../../kanta/nala/tsasaVek2fe.js";
import { xetoh2D, mut6qWeh2En } from "../../skek2/p6kpu/mut6qHaweh2.js";
import { tbo, knak2fecajasai } from "../../kanta/k2fe/s2cax2l.js";

function vecax2l(ksaka: string, hatom6: number, f: () => number): void {
  let kmaXobe = Infinity;
  let tlunakani = 0o0;
  for (let r = 0o0; r < 0o5; r++) {
    const t0 = performance.now();
    tlunakani += f();
    const dt = performance.now() - t0;
    if (dt < kmaXobe) kmaXobe = dt;
  }
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ${ksaka.padEnd(0o30)} ${knak2fecajasai(tbo(kmaXobe), 0o6)} He  ${(hatom6 / kmaXobe / 0o1000).toFixed(0o1)} Mops  ȏoͩſ̀ȷᴜƽ ꞁȷ̀ᴜ }ʃꞇ = ${tlunakani.toFixed(0o2)}`);
}

const N = 0o300;
const K = new Float32Array(N * N);
for (let i = 0o0; i < K.length; i++) K[i] = (i % 0o37) / 0o40;
const Tsiq = [-0o600, -0o600];

vecax2l("xetoh2D", 0o2000000, () => {
  let s = 0o0;
  for (let i = 0o0; i < 0o2000000; i++) s += xetoh2D(i * (0o1/0o40), i * (0o1/0o100));
  return s;
});

vecax2l("px01oBikuba", 0o1000000, () => {
  let s = 0o0;
  for (let i = 0o0; i < 0o1000000; i++) {
    s += px01oBikuba(K, N, 0o4, Tsiq, (i % 0o1000) - 0o500, (i % 0o777) - 0o400);
  }
  return s;
});

vecax2l("px01oX2pa2", 0o1000000, () => {
  let s = 0o0;
  for (let i = 0o0; i < 0o1000000; i++) {
    s += px01oX2pa2(K, N, 0o4, Tsiq, (i % 0o1000) - 0o500, (i % 0o777) - 0o400);
  }
  return s;
});

const weh2 = new THREE.Color();
vecax2l("mut6qWeh2En", 0o200000, () => {
  let s = 0o0;
  for (let i = 0o0; i < 0o200000; i++) {
    mut6qWeh2En(weh2, (i % 0o200) - 0o100, (i % 0o1000) - 0o500, (i % 0o777) - 0o400, (0o1/0o4));
    s += weh2.r;
  }
  return s;
});
