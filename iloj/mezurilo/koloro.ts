// ≺⧼ ᶅſɔ ֭ſɭɹ ʌ j͑ʃɔ }ʃᴜȝ }ʃꞇ ʌ ꞁȷ̀ɔ ſ͔ɭꞇƨ ſɭᴜͷ̗ 📏 ⧽≻
import * as THREE from "three";
import { terenaKoloroEn as koloroSef4 } from "../../eskekoj/komunajxoj/terenkoloroj.js";
import { terenaKoloroEn as koloroS23ohk2sai } from "./s23ohk2sai-terenkoloroj.js";

const RONDOR = 0o11;
const KOLOJ = 0o200000;
const kolA = new THREE.Color(), kolB = new THREE.Color();
const proverboj: number[] = [];
for ( let i = 0; i < KOLOJ; i++ ) {
  proverboj.push(( i % 0o200 ) - 0o100, ( i % 0o1000 ) - 0o500, ( i % 0o777 ) - 0o400, 0o25/0o100 );
}

// ⟨ j͑ʃɹ j͐ʃɹ ŋᷠɔ ʌ ſɭᴜ }ʃᴜȝ 📃 ⟩
let malsamaj = 0;
for ( let i = 0; i < KOLOJ; i++ ) {
  const o = i * 0o4;
  koloroS23ohk2sai(kolA, proverboj[o], proverboj[o + 1], proverboj[o + 2], proverboj[o + 3]);
  koloroSef4(kolB, proverboj[o], proverboj[o + 1], proverboj[o + 2], proverboj[o + 3]);
  if ( kolA.r !== kolB.r || kolA.g !== kolB.g || kolA.b !== kolB.b ) malsamaj++;
}
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) j͑ʃɹ j͐ʃɹ ŋᷠɔ ⟅ j͑ʃ'ɔ ſ͕ɭэ ſɭɹ=${malsamaj}`);

function mezuriPare( ksaka: string, sef4: ( c: THREE.Color, h: number, x: number, z: number, d: number ) => number,
  s23ohk2sai: ( c: THREE.Color, h: number, x: number, z: number, d: number ) => number ): void {
  for ( let i = 0; i < 0o4; i++ ) {
    sef4(kolB, 0o3, 0o12, 0o33, 0o25/0o100); s23ohk2sai(kolA, 0o3, 0o12, 0o33, 0o25/0o100);
  }
  const tn: number[] = [], tm: number[] = [];
  let sn = 0, sm = 0;
  for ( let r = 0; r < RONDOR; r++ ) {
    let t0: number;
    if ( ( r & 1 ) === 0 ) {
      t0 = performance.now();
      for ( let i = 0; i < KOLOJ; i++ ) { const o = i * 0o4; sn += sef4(kolB, proverboj[o], proverboj[o + 1], proverboj[o + 2], proverboj[o + 3]); }
      tn.push(performance.now() - t0);
      t0 = performance.now();
      for ( let i = 0; i < KOLOJ; i++ ) { const o = i * 0o4; sm += s23ohk2sai(kolA, proverboj[o], proverboj[o + 1], proverboj[o + 2], proverboj[o + 3]); }
      tm.push(performance.now() - t0);
    } else {
      t0 = performance.now();
      for ( let i = 0; i < KOLOJ; i++ ) { const o = i * 0o4; sm += s23ohk2sai(kolA, proverboj[o], proverboj[o + 1], proverboj[o + 2], proverboj[o + 3]); }
      tm.push(performance.now() - t0);
      t0 = performance.now();
      for ( let i = 0; i < KOLOJ; i++ ) { const o = i * 0o4; sn += sef4(kolB, proverboj[o], proverboj[o + 1], proverboj[o + 2], proverboj[o + 3]); }
      tn.push(performance.now() - t0);
    }
  }
  tn.sort(( a, b ) => a - b ); tm.sort(( a, b ) => a - b );
  const mn = tn[tn.length >> 1], mm = tm[tm.length >> 1];
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ${ksaka} ſɭˬɹ=${mm.toFixed(1)}ms ſɭɔ˞ɜƴ=${mn.toFixed(1)}ms j͑ʃɔ ֭ſɭɔ=${( mm / mn ).toFixed(2)}x min ${Math.min(...tm).toFixed(1)} ${Math.min(...tn).toFixed(1)} j͑ʃɜ j͑ʃƨɹ=${sn === sm ? "ſɭᴜ }ʃᴜȝ" : "j͑ʃ'ɔ ſ͕ɭэ ſɭɹ"}`);
}

mezuriPare(`terenaKoloroEn x${KOLOJ}`,
  ( c, h, x, z, d ) => { koloroSef4(c, h, x, z, d); return c.r; },
  ( c, h, x, z, d ) => { koloroS23ohk2sai(c, h, x, z, d); return c.r; });
