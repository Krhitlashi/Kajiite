// ≺⧼ ការវាស់សមត្ថភាពសាងសង់ដី តាមដំណាក់កាល 📏 ⧽≻
import * as THREE from "three";
import { alteco, akvaNiveloProksima } from "../../kantaoj/mondo/tereno.js";
import { alternajDiagonalojn, terenaKoloroEn, bruo2D } from "../../eskekoj/komunajxoj/terenkoloroj.js";
import { terenaKoloroEn as terenaKoloroEnMalnova } from "./malnova-terenkoloroj.js";
import { premuAlFormo } from "../../eskekoj/komunajxoj/mapformo.js";
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

const koloro = new THREE.Color();
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
    const deklivo = (cxelo > 0 && cxelo < SX - 1 && i >= SX && i < N - SX)
      ? Math.hypot(hoj[i + 1] - hoj[i - 1], hoj[i + SX] - hoj[i - SX]) / (2 * PASXO)
      : 0;
    terenaKoloroEn(koloro, hoj[i], posX[i], posZ[i], deklivo, akvaNiveloProksima);
    s += koloro.r;
  }
  return s;
}
function fazoPremo(): number {
  const premita = { x: 0, z: 0 };
  let s = 0;
  for (let i = 0; i < N; i++) {
    if (premuAlFormo(mapo.formo, mapo.grandeco, posX[i], posZ[i], premita)) { posX[i] = premita.x; posZ[i] = premita.z; s++; }
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

// ⟨ ការប្រៀបធៀបផ្លូវពណ៌ ៖ កំណែចាស់ពី git ធៀបនឹងកំណែថ្មី 📃 ⟩
function fazoKolorojMalnova(): number {
  let s = 0;
  for (let i = 0; i < N; i++) {
    const cxelo = i % SX;
    const deklivo = (cxelo > 0 && cxelo < SX - 1 && i >= SX && i < N - SX)
      ? Math.hypot(hoj[i + 1] - hoj[i - 1], hoj[i + SX] - hoj[i - SX]) / (2 * PASXO)
      : 0;
    terenaKoloroEnMalnova(koloro, hoj[i], posX[i], posZ[i], deklivo, akvaNiveloProksima);
    s += koloro.r;
  }
  return s;
}
function mezuriPareKoloroj(): void {
  for (let i = 0; i < 0o4; i++) { fazoKoloroj(); fazoKolorojMalnova(); }
  const tn: number[] = [], tm: number[] = [];
  let sn = 0, sm = 0;
  for (let r = 0; r < 0o11; r++) {
    if ((r & 1) === 0) {
      let t0 = performance.now(); sn += fazoKoloroj(); tn.push(performance.now() - t0);
      t0 = performance.now(); sm += fazoKolorojMalnova(); tm.push(performance.now() - t0);
    } else {
      let t0 = performance.now(); sm += fazoKolorojMalnova(); tm.push(performance.now() - t0);
      t0 = performance.now(); sn += fazoKoloroj(); tn.push(performance.now() - t0);
    }
  }
  tn.sort((a, b) => a - b); tm.sort((a, b) => a - b);
  const mn = tn[tn.length >> 1], mm = tm[tm.length >> 1];
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) koloroj A/B ចាស់=${mm.toFixed(1)}ms ថ្មី=${mn.toFixed(1)}ms លឿន=${(mm / mn).toFixed(2)}x min ${Math.min(...tm).toFixed(1)} ${Math.min(...tn).toFixed(1)} លេខ=${sn === sm ? "ស្មើ" : "ខុស"}`);
}

function mezuri(nomo: string, f: () => number): void {
  for (let i = 0; i < 0o10; i++) f();
  const tempaj: number[] = [];
  for (let r = 0; r < 0o21; r++) {
    const t0 = performance.now();
    f();
    tempaj.push(performance.now() - t0);
  }
  tempaj.sort((a, b) => a - b);
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ${nomo.padEnd(0o24)} mediano=${tempaj[0o10].toFixed(1)}ms min=${tempaj[0].toFixed(1)}ms`);
}

console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ក្រឡាគណនា ${N}`);
mezuri("altoj", fazoAltoj);
mezuri("koloroj", fazoKoloroj);
mezuri("premo", fazoPremo);
mezuri("indeksoj", fazoIndeksoj);
mezuri("bruo2D x1", fazoBruo);
mezuri("ទាំងអស់", fazoCxiuj);
mezuriPareKoloroj();
