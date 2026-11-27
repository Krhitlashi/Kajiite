// ≺⧼ ŋᷠw ɭʃэȝ 📃 ⧽≻

import * as THREE from "three";
import { l6da, tsasaVem2Tsiike } from "../../kanta/nala/mut6q-soza.js";
import { hagek2fhagasai, mut6qWeh2En, xetoh2D } from "../../skek2/p6kpu/mut6q-haweh2.js";
import { mut6qWeh2En as kozuaWeh2EnH2y2k } from "./h2y2k-mut6q-haweh2.js";
import { surokQoxa } from "../../skek2/p6kpu/mapqoxa.js";
import { kxeBal2 } from "../../kanta/mut6q-havop2/bal2-s2kanta.js";
import { tbo, knak2fecajasai } from "../../kanta/k2fe/s2cax2l.js";

const GRANDECO = 0o1400;
const HAS2NASCE = 0o300;
const SX = HAS2NASCE + 0o1;
const N = SX * SX;
const TONA = GRANDECO / HAS2NASCE;

const posX = new Float32Array(N);
const posZ = new Float32Array(N);
const hal6da = new Float32Array(N);
{
  let p = 0o0;
  for (let j = 0o0; j < SX; j++) {
    for (let i = 0o0; i < SX; i++) {
      posX[p] = -GRANDECO / 0o2 + i * TONA;
      posZ[p] = -GRANDECO / 0o2 + j * TONA;
      p++;
    }
  }
}

const weh2 = new THREE.Color();
const bal2 = kxeBal2();

function xafanitapuHal6da(): number {
  let s = 0o0;
  for (let i = 0o0; i < N; i++) { const h = l6da(posX[i], posZ[i]); hal6da[i] = h; s += h; }
  return s;
}
function xafanitapuHaweh2(): number {
  let s = 0o0;
  for (let i = 0o0; i < N; i++) {
    const k2pa = i % SX;
    const haga = (k2pa > 0o0 && k2pa < SX - 0o1 && i >= SX && i < N - SX)
      ? Math.hypot(hal6da[i + 0o1] - hal6da[i - 0o1], hal6da[i + SX] - hal6da[i - SX]) / (0o2 * TONA)
      : 0o0;
    mut6qWeh2En(weh2, hal6da[i], posX[i], posZ[i], haga, tsasaVem2Tsiike);
    s += weh2.r;
  }
  return s;
}
function xafanitapuPremo(): number {
  const premita = { x: 0o0, z: 0o0 };
  let s = 0o0;
  for (let i = 0o0; i < N; i++) {
    if (surokQoxa(bal2.qoxa, bal2.pal6, posX[i], posZ[i], premita)) { posX[i] = premita.x; posZ[i] = premita.z; s++; }
  }
  return s;
}
function xafanitapuHavecax2l(): number {
  return hagek2fhagasai(HAS2NASCE).length;
}
function xafanitapuBruo(): number {
  let s = 0o0;
  for (let i = 0o0; i < N; i++) s += xetoh2D(posX[i] / 0o13, posZ[i] / 0o13);
  return s;
}
function xafanitapuCxiuj(): number {
  return xafanitapuHal6da() + xafanitapuHaweh2() + xafanitapuPremo() + xafanitapuHavecax2l();
}

function xafanitapuHaweh2H2y2k(): number {
  let s = 0o0;
  for (let i = 0o0; i < N; i++) {
    const k2pa = i % SX;
    const haga = (k2pa > 0o0 && k2pa < SX - 0o1 && i >= SX && i < N - SX)
      ? Math.hypot(hal6da[i + 0o1] - hal6da[i - 0o1], hal6da[i + SX] - hal6da[i - SX]) / (0o2 * TONA)
      : 0o0;
    kozuaWeh2EnH2y2k(weh2, hal6da[i], posX[i], posZ[i], haga, tsasaVem2Tsiike);
    s += weh2.r;
  }
  return s;
}
function vecax2lPareHaweh2(): void {
  for (let i = 0o0; i < 0o4; i++) { xafanitapuHaweh2(); xafanitapuHaweh2H2y2k(); }
  const tn: number[] = [], tm: number[] = [];
  let sn = 0o0, sm = 0o0;
  for (let r = 0o0; r < 0o11; r++) {
    if ((r & 0o1) === 0o0) {
      let t0 = performance.now(); sn += xafanitapuHaweh2(); tn.push(performance.now() - t0);
      t0 = performance.now(); sm += xafanitapuHaweh2H2y2k(); tm.push(performance.now() - t0);
    } else {
      let t0 = performance.now(); sm += xafanitapuHaweh2H2y2k(); tm.push(performance.now() - t0);
      t0 = performance.now(); sn += xafanitapuHaweh2(); tn.push(performance.now() - t0);
    }
  }
  tn.sort((a, b) => a - b); tm.sort((a, b) => a - b);
  const mn = tn[tn.length >> 0o1], mm = tm[tm.length >> 0o1];
  console.log(`( ɭʃɹ ʃᴜ ſɭɹ ſןɹ ) ſᶘꞇ ɭl̀ɔ ｡ ſɭˬɹ }ʃꞇ = ${knak2fecajasai(tbo(mm), 0o6)} He ſɭɔ˞ɜƴ ꞁȷ̀ᴜ }ʃꞇ = ${knak2fecajasai(tbo(mn), 0o6)} He j͑ʃɔ ֭ſɭɔ }ʃw = ${(mm / mn).toFixed(0o2)}x ſɭc̭ᴜ ŋᷠɹ ŋᷠɹ = ${Math.min(...tm).toFixed(0o1)} ${Math.min(...tn).toFixed(0o1)} ſɭᴜ }ʃᴜȝ ꞁȷ̀ᴜ }ʃꞇ = ${sn === sm ? "ſɭᴜ }ʃᴜȝ" : "j͑ʃ'ɔ ſ͕ɭэ ſɭɹ"}`);
}

function vecax2l(ksaka: string, f: () => number): void {
  for (let i = 0o0; i < 0o10; i++) f();
  const tif: number[] = [];
  for (let r = 0o0; r < 0o21; r++) {
    const t0 = performance.now();
    f();
    tif.push(performance.now() - t0);
  }
  tif.sort((a, b) => a - b);
  console.log(`( ɭʃɹ ʃᴜ ſɭɹ ſןɹ ) ${ksaka.padEnd(0o24)} ſȷƽᴜ ɭʃᴜ }ʃw = ${knak2fecajasai(tbo(tif[0o10]), 0o6)} He ſɭc̭ᴜ ŋᷠɹ ŋᷠɹ = ${knak2fecajasai(tbo(tif[0o0]), 0o6)} He`);
}

console.log(`( ɭʃɹ ʃᴜ ſɭɹ ſןɹ ) ſɭɹ ſןᴜ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ${N}`);
vecax2l("hal6da", xafanitapuHal6da);
vecax2l("haweh2", xafanitapuHaweh2);
vecax2l("premo", xafanitapuPremo);
vecax2l("havecax2l", xafanitapuHavecax2l);
vecax2l("xetoh2D x1", xafanitapuBruo);
vecax2l("j͑ʃᴜꞇ", xafanitapuCxiuj);
vecax2lPareHaweh2();
