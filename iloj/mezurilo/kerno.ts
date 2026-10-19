// ≺⧼ ការវាស់សមត្ថភាពខឺណែល 📏 ⧽≻
import * as THREE from "three";
import { specimenoBikuba, specimenoDulineara } from "../../kantaoj/mondo/akvokalkulo.js";
import { bruo2D, terenaKoloroEn } from "../../eskekoj/komunajxoj/terenkoloroj.js";

function mezuri(nomo: string, ripetoj: number, f: () => number): void {
  let plejBona = Infinity;
  let sumo = 0;
  for (let r = 0; r < 0o5; r++) {
    const t0 = performance.now();
    sumo += f();
    const dt = performance.now() - t0;
    if (dt < plejBona) plejBona = dt;
  }
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ${nomo.padEnd(0o30)} ${plejBona.toFixed(2)}ms  ${(ripetoj / plejBona / 0o1000).toFixed(1)} Mops  sum=${sumo.toFixed(2)}`);
}

const N = 0o300;
const K = new Float32Array(N * N);
for (let i = 0; i < K.length; i++) K[i] = (i % 0o37) / 0o40;
const ORIGINO = [-0o600, -0o600];

mezuri("bruo2D", 0o2000000, () => {
  let s = 0;
  for (let i = 0; i < 0o2000000; i++) s += bruo2D(i * 0.03125, i * 0.015625);
  return s;
});

mezuri("specimenoBikuba", 0o1000000, () => {
  let s = 0;
  for (let i = 0; i < 0o1000000; i++) {
    s += specimenoBikuba(K, N, 0o4, ORIGINO, (i % 0o1000) - 0o500, (i % 0o777) - 0o400);
  }
  return s;
});

mezuri("specimenoDulineara", 0o1000000, () => {
  let s = 0;
  for (let i = 0; i < 0o1000000; i++) {
    s += specimenoDulineara(K, N, 0o4, ORIGINO, (i % 0o1000) - 0o500, (i % 0o777) - 0o400);
  }
  return s;
});

const koloro = new THREE.Color();
mezuri("terenaKoloroEn", 0o200000, () => {
  let s = 0;
  for (let i = 0; i < 0o200000; i++) {
    terenaKoloroEn(koloro, (i % 0o200) - 0o100, (i % 0o1000) - 0o500, (i % 0o777) - 0o400, 0.25);
    s += koloro.r;
  }
  return s;
});
