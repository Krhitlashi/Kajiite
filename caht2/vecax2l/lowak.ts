// ≺⧼ j͐ʃɜ ᶅſᴜƽ 📃 ⧽≻

import * as THREE from "three";
import { px01oBikuba, px01oX2pa2 } from "../../kanta/nala/tsasaVek2fe.js";
import { xetoh2D, mut6qWeh2En } from "../../skek2/p6kpu/mut6qHaweh2.js";
import { k2fKmaNlakani } from "./k61e.js";

function vecax2l(ksaka: string, hatom6: number, f: () => number): void {
  let kmaXobe = Infinity;
  let tlunakani = 0o0;
  for (let r = 0o0; r < 0o5; r++) {
    const t0 = performance.now();
    tlunakani += f();
    const dt = performance.now() - t0;
    if (dt < kmaXobe) kmaXobe = dt;
  }
  k2fKmaNlakani(ksaka, kmaXobe, tlunakani, 0o30);
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
