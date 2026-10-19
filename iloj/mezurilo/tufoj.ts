// ≺⧼ ការវាស់ការសង់ដុំស្មៅ 🌿 ⧽≻
// ការសង់ដុំស្មៅក្នុងវាលស្មៅជាការងារធ្ងន់បំផុតទីពីរ ។ យើងវាស់វាតាមបំណែក ។
import * as THREE from "three";
import { terenaKoloroEn } from "../../eskekoj/komunajxoj/terenkoloroj.js";
import { alteco, akvaNiveloProksima } from "../../kantaoj/mondo/tereno.js";

const N = 0o333333; // ប្រហែល ១១១ ៦៥៤
const HERBA_MALHELIGO = 0o62 / 0o100;
const NOMBRO_DA_JXUROJ = 0o7;

const geometrio = new THREE.BoxGeometry(1, 1, 1);
const materialo = new THREE.MeshBasicMaterial();

const M = new THREE.Matrix4();
const P = new THREE.Vector3();
const S = new THREE.Vector3();
const Q = new THREE.Quaternion();
const E = new THREE.Euler();
const C = new THREE.Color();
const teraKoloro = new THREE.Color();
const BLANKA = new THREE.Color(1, 1, 1);

interface ProvizoraTufo {
  x: number; z: number; y: number;
  sx: number; sy: number; sz: number;
  gx: number; gz: number;
  nuanco: number; deklivo: number; biomo: string; varianto: number;
}

const tufoj: ProvizoraTufo[] = [];
for ( let i = 0; i < N; i++ ) {
  tufoj.push({ x: ( i % 0o400 ) - 0o200, z: Math.floor(i / 0o400) - 0o200, y: 0,
    sx: 1.1, sy: 1.3, sz: 1.2, gx: 0.1, gz: -0.1,
    nuanco: 1.02, deklivo: 0.2, biomo: "valo", varianto: 0 });
}

function mezuri( nomo: string, ripetoj: number, fn: () => void ): void {
  let plejBona = Infinity;
  for ( let r = 0; r < NOMBRO_DA_JXUROJ; r++ ) {
    const t0 = performance.now();
    for ( let k = 0; k < ripetoj; k++ ) fn();
    const t1 = performance.now();
    if ( t1 - t0 < plejBona ) plejBona = t1 - t0;
  }
  const po = plejBona * 1000000 / ( N * ripetoj );
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ${nomo.padEnd(0o30)} ${plejBona.toFixed(1)}ms ${po.toFixed(0)}ns/ដុំ`);
}

// ⟨ ការបង្កើតម៉ាទ្រីស និងការដាក់ចូល 📃 ⟩
let mesho = new THREE.InstancedMesh(geometrio, materialo, N);
mezuri("compose + setMatrixAt", 1, () => {
  for ( let i = 0; i < N; i++ ) {
    const t = tufoj[i];
    M.compose(P.set(t.x, t.y, t.z), Q.setFromEuler(E.set(0, 0.5, 0)), S.set(t.sx, t.sy, t.sz));
    mesho.setMatrixAt(i, M);
  }
  mesho.instanceMatrix.needsUpdate = true;
});

mezuri("តែ compose", 1, () => {
  for ( let i = 0; i < N; i++ ) {
    const t = tufoj[i];
    M.compose(P.set(t.x, t.y, t.z), Q.setFromEuler(E.set(0, 0.5, 0)), S.set(t.sx, t.sy, t.sz));
  }
});

// ⟨ ការសរសេរដោយផ្ទាល់ចូលតារាង 📃 ⟩
const matrico = new Float32Array(N * 16);
mezuri("compose + សរសេរផ្ទាល់", 1, () => {
  const e = M.elements;
  for ( let i = 0; i < N; i++ ) {
    const t = tufoj[i];
    M.compose(P.set(t.x, t.y, t.z), Q.setFromEuler(E.set(0, 0.5, 0)), S.set(t.sx, t.sy, t.sz));
    const o = i * 16;
    matrico[o] = e[0]; matrico[o + 1] = e[1]; matrico[o + 2] = e[2]; matrico[o + 3] = e[3];
    matrico[o + 4] = e[4]; matrico[o + 5] = e[5]; matrico[o + 6] = e[6]; matrico[o + 7] = e[7];
    matrico[o + 8] = e[8]; matrico[o + 9] = e[9]; matrico[o + 10] = e[10]; matrico[o + 11] = e[11];
    matrico[o + 12] = e[12]; matrico[o + 13] = e[13]; matrico[o + 14] = e[14]; matrico[o + 15] = e[15];
  }
});

mesho = new THREE.InstancedMesh(geometrio, materialo, N);
mesho.setColorAt(0, C);
mezuri("setColorAt", 1, () => {
  for ( let i = 0; i < N; i++ ) {
    C.setRGB(0.4, 0.6, 0.3);
    mesho.setColorAt(i, C);
  }
  mesho.instanceColor!.needsUpdate = true;
});

const deklivoj = new THREE.InstancedBufferAttribute(new Float32Array(N * 2), 2);
mezuri("setXY", 1, () => {
  for ( let i = 0; i < N; i++ ) deklivoj.setXY(i, 0.1, -0.1);
});

mezuri("terenaKoloroEn + akvaNiveloProksima", 1, () => {
  for ( let i = 0; i < N; i++ ) {
    const t = tufoj[i];
    const tera = terenaKoloroEn(teraKoloro, t.y, t.x, t.z, t.deklivo, akvaNiveloProksima);
    const teraLumo = Math.max(( tera.r + tera.g * 0o2 + tera.b ) * 0o1 / 0o4, 0o1 / 0o100);
    C.copy(tera).multiplyScalar(t.nuanco * HERBA_MALHELIGO / teraLumo).multiply(BLANKA);
  }
});

mezuri("គ្មានអ្វី", 1, () => {
  for ( let i = 0; i < N; i++ ) if ( tufoj[i].x < -0o1000 ) console.log("neniam");
});

console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) alteco=${alteco(0, 0).toFixed(3)} N=${N}`);
