// ≺⧼ ſןɹ ʌ j͑ʃᴜ ʌ j͑ʃɔ }ʃᴜȝ }ʃꞇ ʌ j͑ʃɹ ſɟᴜ ı],ɹͷ̗ 📏 ⧽≻
// ⟨ ſɭэ ſɭᴜ , ꞙɭɿ , ⟅ ꞙɭı ,
// ſɭэ ſɭᴜ , ꞙɭɿ , ꞙɭı ,
import { bruo2D as bruo2DSef4, terenaKoloroEn } from "../../eskekoj/komunajxoj/terenkoloroj.js";
import { specimenoBikuba as bikubaSef4 } from "../../kantaoj/mondo/akvokalkulo.js";
import { bruo2DS23ohk2sai, bikubaS23ohk2sai, l6daS23ohk2sai, l6daSef4 } from "./bazlinio.js";
import { alteco, akvaVem2Proksima } from "../../kantaoj/mondo/tereno.js";
import * as THREE from "three";

// ⟨ ſɭɜ ſɭᴜ , ꞙɭэ , ⟅ ſɭэ ſɭᴜ , ꞙɭı ,
// ſɭэ ſɭᴜ , ꞙɭɿ , 📃 ⟩

let tk2ni = 0o12345;
const hazardo = (): number => ((tk2ni = (Math.imul(tk2ni, 0x41C64E6D) + 0x3039) | 0) >>> 0) / 0o40000000000;
const RONDOR = 0o11;
const K = new Float32Array(0o300 * 0o300);
const T = new Int16Array(0o300 * 0o300);
for (let i = 0; i < K.length; i++) { K[i] = hazardo() * 0o40 - 0o20; T[i] = (hazardo() * 0o200 - 0o100) | 0; }

// ⟨ ſȷwɔ˞ , ꞙɭı , ⟅ ꞙɭɿ ,
// ꞙɭı , ꞙɭı ,
function mezuriPare(ksaka: string, ripetoj: number, sef4: () => number, s23ohk2sai: () => number): void {
  for (let i = 0; i < 0o4; i++) { sef4(); s23ohk2sai(); }
  const tn: number[] = [], tm: number[] = [];
// ſ͕ɭɜ ᶗ‹ , ꞙɭı ,
// ſɭэ ſɭᴜ , ꞙɭɿ ,
  let sn = 0, sm = 0;
// ſɭэ ſɭᴜ , ꞙɭɿ ,
  for (let r = 0; r < RONDOR; r++) {
    if ((r & 1) === 0) {
      let t0 = performance.now(); for (let i = 0; i < ripetoj; i++) sn += sef4();
      tn.push(performance.now() - t0);
      t0 = performance.now(); for (let i = 0; i < ripetoj; i++) sm += s23ohk2sai();
      tm.push(performance.now() - t0);
    } else {
      let t0 = performance.now(); for (let i = 0; i < ripetoj; i++) sm += s23ohk2sai();
      tm.push(performance.now() - t0);
      t0 = performance.now(); for (let i = 0; i < ripetoj; i++) sn += sef4();
      tn.push(performance.now() - t0);
    }
  }
  const mediano = (a: number[]) => { a.sort((x, y) => x - y); return a[a.length >> 1]; };
  const mn = mediano(tn), mm = mediano(tm);
  const kn = Math.min(...tn), km = Math.min(...tm);
  const egala = sn === sm ? "ſɭɹ ſȷɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ" : "ſɭɹ ſȷɔ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ";
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ${ksaka.padEnd(0o20)} j͑ʃᴜ ı],ɔ=${mm.toFixed(1)}ms j͑ʃɔ ſȷэⅎ=${mn.toFixed(1)}ms j͑ʃƨꞇʞ ŋᷠɹ=${(mm / mn).toFixed(2)}x j͑ʃƨꞇʞ ŋᷠɹ ｡ ſɭɹ ſᶘɔ=${(km / kn).toFixed(2)}x ${egala}`);
}

mezuriPare("bruo2D", 0o1, () => { let s = 0; for (let i = 0; i < 0o2000000; i++) s += bruo2DSef4(i * 0.03125, i * 0.015625); return s; },
  () => { let s = 0; for (let i = 0; i < 0o2000000; i++) s += bruo2DS23ohk2sai(i * 0.03125, i * 0.015625); return s; });

mezuriPare("specimenoBikuba", 0o1, () => { let s = 0; for (let i = 0; i < 0o400000; i++) s += bikubaSef4(K, 0o300, 0o4, [-0o600, -0o600], (i % 0o1000) - 0o500, (i % 0o777) - 0o400); return s; },
  () => { let s = 0; for (let i = 0; i < 0o400000; i++) s += bikubaS23ohk2sai(K, 0o300, 0o4, [-0o600, -0o600], (i % 0o1000) - 0o500, (i % 0o777) - 0o400); return s; });

mezuriPare("skulptaDelta", 0o1, () => { let s = 0; for (let i = 0; i < 0o400000; i++) s += l6daSef4(T, 0o300, 0o4, [-0o600, -0o600], (i % 0o1000) - 0o500, (i % 0o777) - 0o400); return s; },
  () => { let s = 0; for (let i = 0; i < 0o400000; i++) s += l6daS23ohk2sai(T, 0o300, 0o4, [-0o600, -0o600], (i % 0o1000) - 0o500, (i % 0o777) - 0o400); return s; });

// ⟨ j͑ʃᴜ ſɭ,w , ꞙɭı , 📃 ⟩
const SX = 0o300 + 1, GR = 0o1400, PS = GR / 0o300;
const px = new Float32Array(SX * SX), pz = new Float32Array(SX * SX), hh = new Float32Array(SX * SX);
{ let p = 0; for (let j = 0; j < SX; j++) for (let i = 0; i < SX; i++) { px[p] = -GR / 2 + i * PS; pz[p] = -GR / 2 + j * PS; p++; } }
const kol = new THREE.Color();
function fluoSef4(): number {
  let s = 0;
  for (let i = 0; i < px.length; i++) { const h = alteco(px[i], pz[i]); hh[i] = h; s += h; }
  for (let i = 0; i < px.length; i++) {
    const c = i % SX;
    const d = (c > 0 && c < SX - 1 && i >= SX && i < px.length - SX) ? Math.hypot(hh[i + 1] - hh[i - 1], hh[i + SX] - hh[i - SX]) / (2 * PS) : 0;
    terenaKoloroEn(kol, hh[i], px[i], pz[i], d, akvaVem2Proksima); s += kol.r;
  }
  return s;
}
function mezuriUnu(ksaka: string, f: () => number): void {
  for (let i = 0; i < 0o4; i++) f();
  const t: number[] = [];
  let s = 0;
  for (let r = 0; r < RONDOR; r++) { const t0 = performance.now(); s += f(); t.push(performance.now() - t0); }
  t.sort((a, b) => a - b);
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ${ksaka.padEnd(0o20)} ſȷƽᴜ ɭʃᴜ=${t[t.length >> 1].toFixed(1)}ms min=${t[0].toFixed(1)}ms ſɭɹ ſᶘɔ=${s.toFixed(0o2)}`);
}
mezuriUnu("ſɭɹ ſᶘɔ ʌ j͐ʃᴜɔ˞ ( j͑ʃɔ ſȷэⅎ )", fluoSef4);

