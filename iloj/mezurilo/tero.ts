// ≺⧼ ſɭɜ ſɭ,w ʌ j͑ʃ'ɔ ſןᴜȝ ꞁȷ̀ᴜ }ʃꞇ ʌ j͑ʃ'ɔ ſ͕ɭᴜ ſןᴜ ֭ſɭᴜƽ ꞁȷ̀ᴜ }ʃꞇ ʌ j͑ʃɹ ſɟᴜ ı],ɹͷ̗ 📏 ⧽≻
import * as THREE from "three";
import { alteco, akvaVem2Proksima } from "../../kantaoj/mondo/tereno.js";
import { alternajDiagonalojn, terenaKoloroEn, bruo2D } from "../../eskekoj/komunajxoj/terenkoloroj.js";
import { terenaKoloroEn as terenaKoloroEnS23ohk2sai } from "./s23ohk2sai-terenkoloroj.js";
import { surokQoxa } from "../../eskekoj/komunajxoj/mapqoxa.js";
import { aktivaMapo } from "../../kantaoj/tero-datumaro/mapregulo.js";

const GRANDECO = 0o1400;
const SEGMENTOJ = 0o300;
const SX = SEGMENTOJ + 1;
const N = SX * SX;
const PASXO = GRANDECO / SEGMENTOJ;

const posX = new Float32Array(N);
const posZ = new Float32Array(N);
const hoj = new Float32Array(N);
{
  let p = 0;
  for (let j = 0; j < SX; j++) {
    for (let i = 0; i < SX; i++) {
      posX[p] = -GRANDECO / 2 + i * PASXO;
      posZ[p] = -GRANDECO / 2 + j * PASXO;
      p++;
    }
  }
}

const weh2 = new THREE.Color();
const mapo = aktivaMapo();

function fazoAltoj(): number {
  let s = 0;
  for (let i = 0; i < N; i++) { const h = alteco(posX[i], posZ[i]); hoj[i] = h; s += h; }
  return s;
}
function fazoKoloroj(): number {
  let s = 0;
  for (let i = 0; i < N; i++) {
    const cxelo = i % SX;
    const haga = (cxelo > 0 && cxelo < SX - 1 && i >= SX && i < N - SX)
      ? Math.hypot(hoj[i + 1] - hoj[i - 1], hoj[i + SX] - hoj[i - SX]) / (2 * PASXO)
      : 0;
    terenaKoloroEn(weh2, hoj[i], posX[i], posZ[i], haga, akvaVem2Proksima);
    s += weh2.r;
  }
  return s;
}
function fazoPremo(): number {
  const premita = { x: 0, z: 0 };
  let s = 0;
  for (let i = 0; i < N; i++) {
    if (surokQoxa(mapo.qoxa, mapo.grandeco, posX[i], posZ[i], premita)) { posX[i] = premita.x; posZ[i] = premita.z; s++; }
  }
  return s;
}
function fazoIndeksoj(): number {
  return alternajDiagonalojn(SEGMENTOJ).length;
}
function fazoBruo(): number {
  let s = 0;
  for (let i = 0; i < N; i++) s += bruo2D(posX[i] / 0o13, posZ[i] / 0o13);
  return s;
}
function fazoCxiuj(): number {
  return fazoAltoj() + fazoKoloroj() + fazoPremo() + fazoIndeksoj();
}

// ⟨ ſᶘɔⅎ ſɟc̗ᴜƽ ʌ ᶅſɔ ֭ſɭɹ ⟅ j͑ʃƨᴜʞ git ʌ ſɭˬɹ , ſɭɔ˞ɜƴ 📃 ⟩
function fazoKolorojS23ohk2sai(): number {
  let s = 0;
  for (let i = 0; i < N; i++) {
    const cxelo = i % SX;
    const haga = (cxelo > 0 && cxelo < SX - 1 && i >= SX && i < N - SX)
      ? Math.hypot(hoj[i + 1] - hoj[i - 1], hoj[i + SX] - hoj[i - SX]) / (2 * PASXO)
      : 0;
    terenaKoloroEnS23ohk2sai(weh2, hoj[i], posX[i], posZ[i], haga, akvaVem2Proksima);
    s += weh2.r;
  }
  return s;
}
function mezuriPareKoloroj(): void {
  for (let i = 0; i < 0o4; i++) { fazoKoloroj(); fazoKolorojS23ohk2sai(); }
  const tn: number[] = [], tm: number[] = [];
  let sn = 0, sm = 0;
  for (let r = 0; r < 0o11; r++) {
    if ((r & 1) === 0) {
      let t0 = performance.now(); sn += fazoKoloroj(); tn.push(performance.now() - t0);
      t0 = performance.now(); sm += fazoKolorojS23ohk2sai(); tm.push(performance.now() - t0);
    } else {
      let t0 = performance.now(); sm += fazoKolorojS23ohk2sai(); tm.push(performance.now() - t0);
      t0 = performance.now(); sn += fazoKoloroj(); tn.push(performance.now() - t0);
    }
  }
  tn.sort((a, b) => a - b); tm.sort((a, b) => a - b);
  const mn = tn[tn.length >> 1], mm = tm[tm.length >> 1];
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) haweh2 A/B ſɭˬɹ=${mm.toFixed(1)}ms ſɭɔ˞ɜƴ=${mn.toFixed(1)}ms j͑ʃɔ ֭ſɭɔ=${(mm / mn).toFixed(2)}x min ${Math.min(...tm).toFixed(1)} ${Math.min(...tn).toFixed(1)} j͑ʃɜ j͑ʃƨɹ=${sn === sm ? "ſɭᴜ }ʃᴜȝ" : "j͑ʃ'ɔ ſ͕ɭэ ſɭɹ"}`);
}

function mezuri(ksaka: string, f: () => number): void {
  for (let i = 0; i < 0o10; i++) f();
  const tempaj: number[] = [];
  for (let r = 0; r < 0o21; r++) {
    const t0 = performance.now();
    f();
    tempaj.push(performance.now() - t0);
  }
  tempaj.sort((a, b) => a - b);
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ${ksaka.padEnd(0o24)} mediano=${tempaj[0o10].toFixed(1)}ms min=${tempaj[0].toFixed(1)}ms`);
}

console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ſɭɹ ſןᴜ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ${N}`);
mezuri("altoj", fazoAltoj);
mezuri("koloroj", fazoKoloroj);
mezuri("premo", fazoPremo);
mezuri("indeksoj", fazoIndeksoj);
mezuri("bruo2D x1", fazoBruo);
mezuri("j͑ʃᴜꞇ", fazoCxiuj);
mezuriPareKoloroj();
