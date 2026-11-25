// ≺⧼ ᶅſɔ ֭ſɭɹ ʌ j͑ʃɔ }ʃᴜȝ }ʃꞇ ʌ ꞁȷ̀ɔ ſ͔ɭꞇƨ ſɭᴜͷ̗ 📏 ⧽≻
import * as THREE from "three";
import { t6limaWeh2En as weh2Sef4 } from "../../skek2/x2x2q/t6limaHaweh2.js";
import { t6limaWeh2En as weh2H2y2k } from "./h2y2k-t6limaHaweh2.js";

const C2QR = 0o11;
const KOLOJ = 0o200000;
const kolA = new THREE.Color(), kolB = new THREE.Color();
const hax2paksupusai: number[] = [];
for ( let i = 0; i < KOLOJ; i++ ) {
  hax2paksupusai.push(( i % 0o200 ) - 0o100, ( i % 0o1000 ) - 0o500, ( i % 0o777 ) - 0o400, 0o25/0o100 );
}

// ⟨ j͑ʃɹ j͐ʃɹ ŋᷠɔ ʌ ſɭᴜ }ʃᴜȝ 📃 ⟩
let malsamaj = 0;
for ( let i = 0; i < KOLOJ; i++ ) {
  const o = i * 0o4;
  weh2H2y2k(kolA, hax2paksupusai[o], hax2paksupusai[o + 1], hax2paksupusai[o + 2], hax2paksupusai[o + 3]);
  weh2Sef4(kolB, hax2paksupusai[o], hax2paksupusai[o + 1], hax2paksupusai[o + 2], hax2paksupusai[o + 3]);
  if ( kolA.r !== kolB.r || kolA.g !== kolB.g || kolA.b !== kolB.b ) malsamaj++;
}
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) j͑ʃɹ j͐ʃɹ ŋᷠɔ ⟅ j͑ʃ'ɔ ſ͕ɭэ ſɭɹ=${malsamaj}`);

function vecax2lPare( ksaka: string, sef4: ( c: THREE.Color, h: number, x: number, z: number, d: number ) => number,
  h2y2k: ( c: THREE.Color, h: number, x: number, z: number, d: number ) => number ): void {
  for ( let i = 0; i < 0o4; i++ ) {
    sef4(kolB, 0o3, 0o12, 0o33, 0o25/0o100); h2y2k(kolA, 0o3, 0o12, 0o33, 0o25/0o100);
  }
  const tn: number[] = [], tm: number[] = [];
  let sn = 0, sm = 0;
  for ( let r = 0; r < C2QR; r++ ) {
    let t0: number;
    if ( ( r & 1 ) === 0 ) {
      t0 = performance.now();
      for ( let i = 0; i < KOLOJ; i++ ) { const o = i * 0o4; sn += sef4(kolB, hax2paksupusai[o], hax2paksupusai[o + 1], hax2paksupusai[o + 2], hax2paksupusai[o + 3]); }
      tn.push(performance.now() - t0);
      t0 = performance.now();
      for ( let i = 0; i < KOLOJ; i++ ) { const o = i * 0o4; sm += h2y2k(kolA, hax2paksupusai[o], hax2paksupusai[o + 1], hax2paksupusai[o + 2], hax2paksupusai[o + 3]); }
      tm.push(performance.now() - t0);
    } else {
      t0 = performance.now();
      for ( let i = 0; i < KOLOJ; i++ ) { const o = i * 0o4; sm += h2y2k(kolA, hax2paksupusai[o], hax2paksupusai[o + 1], hax2paksupusai[o + 2], hax2paksupusai[o + 3]); }
      tm.push(performance.now() - t0);
      t0 = performance.now();
      for ( let i = 0; i < KOLOJ; i++ ) { const o = i * 0o4; sn += sef4(kolB, hax2paksupusai[o], hax2paksupusai[o + 1], hax2paksupusai[o + 2], hax2paksupusai[o + 3]); }
      tn.push(performance.now() - t0);
    }
  }
  tn.sort(( a, b ) => a - b ); tm.sort(( a, b ) => a - b );
  const mn = tn[tn.length >> 1], mm = tm[tm.length >> 1];
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ${ksaka} ſɭˬɹ=${mm.toFixed(1)}ms ſɭɔ˞ɜƴ=${mn.toFixed(1)}ms j͑ʃɔ ֭ſɭɔ=${( mm / mn ).toFixed(2)}x min ${Math.min(...tm).toFixed(1)} ${Math.min(...tn).toFixed(1)} j͑ʃɜ j͑ʃƨɹ=${sn === sm ? "ſɭᴜ }ʃᴜȝ" : "j͑ʃ'ɔ ſ͕ɭэ ſɭɹ"}`);
}

vecax2lPare(`t6limaWeh2En x${KOLOJ}`,
  ( c, h, x, z, d ) => { weh2Sef4(c, h, x, z, d); return c.r; },
  ( c, h, x, z, d ) => { weh2H2y2k(c, h, x, z, d); return c.r; });
