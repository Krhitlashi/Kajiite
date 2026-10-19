// ≺⧼ ការវាស់ប្រៀបធៀបផ្លូវពណ៌ ៖ កំណែចាស់ពី git ធៀបនឹងកំណែក្នុងតំបន់ 📏 ⧽≻
import * as THREE from "three";
import { terenaKoloroEn as koloroNova } from "../../eskekoj/komunajxoj/terenkoloroj.js";
import { terenaKoloroEn as koloroMalnova } from "./malnova-terenkoloroj.js";

const RONDOR = 0o11;
const KOLOJ = 0o200000;
const kolA = new THREE.Color(), kolB = new THREE.Color();
const proverboj: number[] = [];
for ( let i = 0; i < KOLOJ; i++ ) {
  proverboj.push(( i % 0o200 ) - 0o100, ( i % 0o1000 ) - 0o500, ( i % 0o777 ) - 0o400, 0o25/0o100 );
}

// ⟨ ផ្ទៀងផ្ទាត់ភាពស្មើគ្នាបេះបិទ 📃 ⟩
let malsamaj = 0;
for ( let i = 0; i < KOLOJ; i++ ) {
  const o = i * 0o4;
  koloroMalnova(kolA, proverboj[o], proverboj[o + 1], proverboj[o + 2], proverboj[o + 3]);
  koloroNova(kolB, proverboj[o], proverboj[o + 1], proverboj[o + 2], proverboj[o + 3]);
  if ( kolA.r !== kolB.r || kolA.g !== kolB.g || kolA.b !== kolB.b ) malsamaj++;
}
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ផ្ទៀងផ្ទាត់ ខុស=${malsamaj}`);

function mezuriPare( nomo: string, nova: ( c: THREE.Color, h: number, x: number, z: number, d: number ) => number,
  malnova: ( c: THREE.Color, h: number, x: number, z: number, d: number ) => number ): void {
  for ( let i = 0; i < 0o4; i++ ) {
    nova(kolB, 0o3, 0o12, 0o33, 0o25/0o100); malnova(kolA, 0o3, 0o12, 0o33, 0o25/0o100);
  }
  const tn: number[] = [], tm: number[] = [];
  let sn = 0, sm = 0;
  for ( let r = 0; r < RONDOR; r++ ) {
    let t0: number;
    if ( ( r & 1 ) === 0 ) {
      t0 = performance.now();
      for ( let i = 0; i < KOLOJ; i++ ) { const o = i * 0o4; sn += nova(kolB, proverboj[o], proverboj[o + 1], proverboj[o + 2], proverboj[o + 3]); }
      tn.push(performance.now() - t0);
      t0 = performance.now();
      for ( let i = 0; i < KOLOJ; i++ ) { const o = i * 0o4; sm += malnova(kolA, proverboj[o], proverboj[o + 1], proverboj[o + 2], proverboj[o + 3]); }
      tm.push(performance.now() - t0);
    } else {
      t0 = performance.now();
      for ( let i = 0; i < KOLOJ; i++ ) { const o = i * 0o4; sm += malnova(kolA, proverboj[o], proverboj[o + 1], proverboj[o + 2], proverboj[o + 3]); }
      tm.push(performance.now() - t0);
      t0 = performance.now();
      for ( let i = 0; i < KOLOJ; i++ ) { const o = i * 0o4; sn += nova(kolB, proverboj[o], proverboj[o + 1], proverboj[o + 2], proverboj[o + 3]); }
      tn.push(performance.now() - t0);
    }
  }
  tn.sort(( a, b ) => a - b ); tm.sort(( a, b ) => a - b );
  const mn = tn[tn.length >> 1], mm = tm[tm.length >> 1];
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ${nomo} ចាស់=${mm.toFixed(1)}ms ថ្មី=${mn.toFixed(1)}ms លឿន=${( mm / mn ).toFixed(2)}x min ${Math.min(...tm).toFixed(1)} ${Math.min(...tn).toFixed(1)} លេខ=${sn === sm ? "ស្មើ" : "ខុស"}`);
}

mezuriPare(`terenaKoloroEn x${KOLOJ}`,
  ( c, h, x, z, d ) => { koloroNova(c, h, x, z, d); return c.r; },
  ( c, h, x, z, d ) => { koloroMalnova(c, h, x, z, d); return c.r; });
