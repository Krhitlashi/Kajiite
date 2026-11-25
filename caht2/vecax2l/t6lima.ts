// ≺⧼ ſɭɜ ſɭ,w ʌ j͑ʃ'ɔ ſןᴜȝ ꞁȷ̀ᴜ }ʃꞇ ʌ j͑ʃ'ɔ ſ͕ɭᴜ ſןᴜ ֭ſɭᴜƽ ꞁȷ̀ᴜ }ʃꞇ ʌ j͑ʃɹ ſɟᴜ ı],ɹͷ̗ 📏 ⧽≻
import * as THREE from "three";
import { l6da, tsasaVem2Tsiike } from "../../kanta/nala/t6limaSoza.js";
import { hagek2fhagasai, t6limaWeh2En, xetoh2D } from "../../skek2/x2x2q/t6limaHaweh2.js";
import { t6limaWeh2En as kozuaWeh2EnH2y2k } from "./h2y2k-t6limaHaweh2.js";
import { surokQoxa } from "../../skek2/x2x2q/mapqoxa.js";
import { tikBal2 } from "../../kanta/t6lima-havop2/mapregulo.js";

const GRANDECO = 0o1400;
const HAS2NASCE = 0o300;
const SX = HAS2NASCE + 1;
const N = SX * SX;
const TONA = GRANDECO / HAS2NASCE;

const posX = new Float32Array(N);
const posZ = new Float32Array(N);
const hal6da = new Float32Array(N);
{
  let p = 0;
  for (let j = 0; j < SX; j++) {
    for (let i = 0; i < SX; i++) {
      posX[p] = -GRANDECO / 2 + i * TONA;
      posZ[p] = -GRANDECO / 2 + j * TONA;
      p++;
    }
  }
}

const weh2 = new THREE.Color();
const bal2 = tikBal2();

function xafanitapuHal6da(): number {
  let s = 0;
  for (let i = 0; i < N; i++) { const h = l6da(posX[i], posZ[i]); hal6da[i] = h; s += h; }
  return s;
}
function xafanitapuHaweh2(): number {
  let s = 0;
  for (let i = 0; i < N; i++) {
    const k2pa = i % SX;
    const haga = (k2pa > 0 && k2pa < SX - 1 && i >= SX && i < N - SX)
      ? Math.hypot(hal6da[i + 1] - hal6da[i - 1], hal6da[i + SX] - hal6da[i - SX]) / (2 * TONA)
      : 0;
    t6limaWeh2En(weh2, hal6da[i], posX[i], posZ[i], haga, tsasaVem2Tsiike);
    s += weh2.r;
  }
  return s;
}
function xafanitapuPremo(): number {
  const premita = { x: 0, z: 0 };
  let s = 0;
  for (let i = 0; i < N; i++) {
    if (surokQoxa(bal2.qoxa, bal2.pal6, posX[i], posZ[i], premita)) { posX[i] = premita.x; posZ[i] = premita.z; s++; }
  }
  return s;
}
function xafanitapuHavecax2l(): number {
  return hagek2fhagasai(HAS2NASCE).length;
}
function xafanitapuBruo(): number {
  let s = 0;
  for (let i = 0; i < N; i++) s += xetoh2D(posX[i] / 0o13, posZ[i] / 0o13);
  return s;
}
function xafanitapuCxiuj(): number {
  return xafanitapuHal6da() + xafanitapuHaweh2() + xafanitapuPremo() + xafanitapuHavecax2l();
}

// ⟨ ſᶘɔⅎ ſɟc̗ᴜƽ ʌ ᶅſɔ ֭ſɭɹ ⟅ j͑ʃƨᴜʞ git ʌ ſɭˬɹ , ſɭɔ˞ɜƴ 📃 ⟩
function xafanitapuHaweh2H2y2k(): number {
  let s = 0;
  for (let i = 0; i < N; i++) {
    const k2pa = i % SX;
    const haga = (k2pa > 0 && k2pa < SX - 1 && i >= SX && i < N - SX)
      ? Math.hypot(hal6da[i + 1] - hal6da[i - 1], hal6da[i + SX] - hal6da[i - SX]) / (2 * TONA)
      : 0;
    kozuaWeh2EnH2y2k(weh2, hal6da[i], posX[i], posZ[i], haga, tsasaVem2Tsiike);
    s += weh2.r;
  }
  return s;
}
function vecax2lPareHaweh2(): void {
  for (let i = 0; i < 0o4; i++) { xafanitapuHaweh2(); xafanitapuHaweh2H2y2k(); }
  const tn: number[] = [], tm: number[] = [];
  let sn = 0, sm = 0;
  for (let r = 0; r < 0o11; r++) {
    if ((r & 1) === 0) {
      let t0 = performance.now(); sn += xafanitapuHaweh2(); tn.push(performance.now() - t0);
      t0 = performance.now(); sm += xafanitapuHaweh2H2y2k(); tm.push(performance.now() - t0);
    } else {
      let t0 = performance.now(); sm += xafanitapuHaweh2H2y2k(); tm.push(performance.now() - t0);
      t0 = performance.now(); sn += xafanitapuHaweh2(); tn.push(performance.now() - t0);
    }
  }
  tn.sort((a, b) => a - b); tm.sort((a, b) => a - b);
  const mn = tn[tn.length >> 1], mm = tm[tm.length >> 1];
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) haweh2 A/B ſɭˬɹ=${mm.toFixed(1)}ms ſɭɔ˞ɜƴ=${mn.toFixed(1)}ms j͑ʃɔ ֭ſɭɔ=${(mm / mn).toFixed(2)}x min ${Math.min(...tm).toFixed(1)} ${Math.min(...tn).toFixed(1)} j͑ʃɜ j͑ʃƨɹ=${sn === sm ? "ſɭᴜ }ʃᴜȝ" : "j͑ʃ'ɔ ſ͕ɭэ ſɭɹ"}`);
}

function vecax2l(ksaka: string, f: () => number): void {
  for (let i = 0; i < 0o10; i++) f();
  const tif: number[] = [];
  for (let r = 0; r < 0o21; r++) {
    const t0 = performance.now();
    f();
    tif.push(performance.now() - t0);
  }
  tif.sort((a, b) => a - b);
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ${ksaka.padEnd(0o24)} mediano=${tif[0o10].toFixed(1)}ms min=${tif[0].toFixed(1)}ms`);
}

console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ſɭɹ ſןᴜ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ${N}`);
vecax2l("hal6da", xafanitapuHal6da);
vecax2l("haweh2", xafanitapuHaweh2);
vecax2l("premo", xafanitapuPremo);
vecax2l("havecax2l", xafanitapuHavecax2l);
vecax2l("xetoh2D x1", xafanitapuBruo);
vecax2l("j͑ʃᴜꞇ", xafanitapuCxiuj);
vecax2lPareHaweh2();
