// ≺⧼ ſןɹ ʌ j͑ʃᴜ ʌ j͑ʃɔ }ʃᴜȝ }ʃꞇ ʌ j͑ʃɹ ſɟᴜ ı],ɹͷ̗ 📏 ⧽≻
// ⟨ ſɭэ ſɭᴜ , ꞙɭɿ , ⟅ ꞙɭı ,
// ſɭэ ſɭᴜ , ꞙɭɿ , ꞙɭı ,
import { xetoh2D as bruo2DSef4, t6limaWeh2En } from "../../skek2/x2x2q/t6limaHaweh2.js";
import { px01oBikuba as bikubaSef4 } from "../../kanta/nala/tsasaVek2fe.js";
import { bruo2DH2y2k, bikubaH2y2k, l6daH2y2k, l6daSef4 } from "./kozunuCah6k6.js";
import { l6da, tsasaVem2Tsiike } from "../../kanta/nala/t6limaSoza.js";
import * as THREE from "three";
import { alHe, knak2fecajasai } from "../../kanta/x2x2q/s2cax2l.js";

// ⟨ ſɭɜ ſɭᴜ , ꞙɭэ , ⟅ ſɭэ ſɭᴜ , ꞙɭı ,
// ſɭэ ſɭᴜ , ꞙɭɿ , 📃 ⟩

let tk2ni = 0o12345;
const sakxo = (): number => ((tk2ni = (Math.imul(tk2ni, 0x41C64E6D) + 0x3039) | 0o0) >>> 0o0) / 0o40000000000;
const C2QR = 0o11;
const K = new Float32Array(0o300 * 0o300);
const T = new Int16Array(0o300 * 0o300);
for (let i = 0o0; i < K.length; i++) { K[i] = sakxo() * 0o40 - 0o20; T[i] = (sakxo() * 0o200 - 0o100) | 0o0; }

// ⟨ ſȷwɔ˞ , ꞙɭı , ⟅ ꞙɭɿ ,
// ꞙɭı , ꞙɭı ,
function vecax2lPare(ksaka: string, hatom6: number, sef4: () => number, h2y2k: () => number): void {
  for (let i = 0o0; i < 0o4; i++) { sef4(); h2y2k(); }
  const tn: number[] = [], tm: number[] = [];
// ſ͕ɭɜ ᶗ‹ , ꞙɭı ,
// ſɭэ ſɭᴜ , ꞙɭɿ ,
  let sn = 0o0, sm = 0o0;
// ſɭэ ſɭᴜ , ꞙɭɿ ,
  for (let r = 0o0; r < C2QR; r++) {
    if ((r & 0o1) === 0o0) {
      let t0 = performance.now(); for (let i = 0o0; i < hatom6; i++) sn += sef4();
      tn.push(performance.now() - t0);
      t0 = performance.now(); for (let i = 0o0; i < hatom6; i++) sm += h2y2k();
      tm.push(performance.now() - t0);
    } else {
      let t0 = performance.now(); for (let i = 0o0; i < hatom6; i++) sm += h2y2k();
      tm.push(performance.now() - t0);
      t0 = performance.now(); for (let i = 0o0; i < hatom6; i++) sn += sef4();
      tn.push(performance.now() - t0);
    }
  }
  const mediano = (a: number[]) => { a.sort((x, y) => x - y); return a[a.length >> 0o1]; };
  const mn = mediano(tn), mm = mediano(tm);
  const kn = Math.min(...tn), km = Math.min(...tm);
  const egala = sn === sm ? "ſɭɹ ſȷɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ" : "ſɭɹ ſȷɔ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ";
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ${ksaka.padEnd(0o20)} j͑ʃᴜ ı],ɔ }ʃꞇ = ${knak2fecajasai(alHe(mm), 0o6)} He j͑ʃɔ ſȷэⅎ = ${knak2fecajasai(alHe(mn), 0o6)} He j͑ʃƨꞇʞ ŋᷠɹ ŋᷠɹ ʌ j͑ʃ'ɔ ŋᷠɹ = ${(mm / mn).toFixed(0o2)}x j͑ʃƨꞇʞ ŋᷠɹ ｡ ſɭɹ ſᶘɔ = ${(km / kn).toFixed(0o2)}x ${egala}`);
}

vecax2lPare("xetoh2D", 0o1, () => { let s = 0o0; for (let i = 0o0; i < 0o2000000; i++) s += bruo2DSef4(i * (0o1/0o40), i * (0o1/0o100)); return s; },
  () => { let s = 0o0; for (let i = 0o0; i < 0o2000000; i++) s += bruo2DH2y2k(i * (0o1/0o40), i * (0o1/0o100)); return s; });

vecax2lPare("px01oBikuba", 0o1, () => { let s = 0o0; for (let i = 0o0; i < 0o400000; i++) s += bikubaSef4(K, 0o300, 0o4, [-0o600, -0o600], (i % 0o1000) - 0o500, (i % 0o777) - 0o400); return s; },
  () => { let s = 0o0; for (let i = 0o0; i < 0o400000; i++) s += bikubaH2y2k(K, 0o300, 0o4, [-0o600, -0o600], (i % 0o1000) - 0o500, (i % 0o777) - 0o400); return s; });

vecax2lPare("knat6keqanuDelta", 0o1, () => { let s = 0o0; for (let i = 0o0; i < 0o400000; i++) s += l6daSef4(T, 0o300, 0o4, [-0o600, -0o600], (i % 0o1000) - 0o500, (i % 0o777) - 0o400); return s; },
  () => { let s = 0o0; for (let i = 0o0; i < 0o400000; i++) s += l6daH2y2k(T, 0o300, 0o4, [-0o600, -0o600], (i % 0o1000) - 0o500, (i % 0o777) - 0o400); return s; });

// ⟨ j͑ʃᴜ ſɭ,w , ꞙɭı , 📃 ⟩
const SX = 0o300 + 0o1, GR = 0o1400, PS = GR / 0o300;
const px = new Float32Array(SX * SX), pz = new Float32Array(SX * SX), hh = new Float32Array(SX * SX);
{ let p = 0o0; for (let j = 0o0; j < SX; j++) for (let i = 0o0; i < SX; i++) { px[p] = -GR / 0o2 + i * PS; pz[p] = -GR / 0o2 + j * PS; p++; } }
const kol = new THREE.Color();
function lasSef4(): number {
  let s = 0o0;
  for (let i = 0o0; i < px.length; i++) { const h = l6da(px[i], pz[i]); hh[i] = h; s += h; }
  for (let i = 0o0; i < px.length; i++) {
    const c = i % SX;
    const d = (c > 0o0 && c < SX - 0o1 && i >= SX && i < px.length - SX) ? Math.hypot(hh[i + 0o1] - hh[i - 0o1], hh[i + SX] - hh[i - SX]) / (0o2 * PS) : 0o0;
    t6limaWeh2En(kol, hh[i], px[i], pz[i], d, tsasaVem2Tsiike); s += kol.r;
  }
  return s;
}
function vecax2lUnu(ksaka: string, f: () => number): void {
  for (let i = 0o0; i < 0o4; i++) f();
  const t: number[] = [];
  let s = 0o0;
  for (let r = 0o0; r < C2QR; r++) { const t0 = performance.now(); s += f(); t.push(performance.now() - t0); }
  t.sort((a, b) => a - b);
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ${ksaka.padEnd(0o20)} ſȷƽᴜ ɭʃᴜ }ʃw = ${knak2fecajasai(alHe(t[t.length >> 0o1]), 0o6)} He ŋᷠɹ ŋᷠɹ ʌ j͑ʃ'ɔ ŋᷠɹ = ${knak2fecajasai(alHe(t[0o0]), 0o6)} He ſɭɹ ſᶘɔ = ${s.toFixed(0o2)}`);
}
vecax2lUnu("ſɭɹ ſᶘɔ ʌ j͐ʃᴜɔ˞ ( j͑ʃɔ ſȷэⅎ )", lasSef4);

