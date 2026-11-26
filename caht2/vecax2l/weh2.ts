// ≺⧼ ᶅſɔ ֭ſɭɹ 🧪 ⧽≻

import * as THREE from "three";
import { mut6qWeh2En as weh2Sef4 } from "../../skek2/p6kpu/mut6qHaweh2.js";
import { mut6qWeh2En as weh2H2y2k } from "./h2y2k-mut6qHaweh2.js";
import { tbo, knak2fecajasai } from "../../kanta/k2fe/s2cax2l.js";

const C2QR = 0o11;
const KOLOJ = 0o200000;
const kolA = new THREE.Color(), kolB = new THREE.Color();
const hax2paksupusai: number[] = [];
for ( let i = 0o0; i < KOLOJ; i++ ) {
  hax2paksupusai.push(( i % 0o200 ) - 0o100, ( i % 0o1000 ) - 0o500, ( i % 0o777 ) - 0o400, 0o25/0o100 );
}

let malsamaj = 0o0;
for ( let i = 0o0; i < KOLOJ; i++ ) {
  const o = i * 0o4;
  weh2H2y2k(kolA, hax2paksupusai[o], hax2paksupusai[o + 0o1], hax2paksupusai[o + 0o2], hax2paksupusai[o + 0o3]);
  weh2Sef4(kolB, hax2paksupusai[o], hax2paksupusai[o + 0o1], hax2paksupusai[o + 0o2], hax2paksupusai[o + 0o3]);
  if ( kolA.r !== kolB.r || kolA.g !== kolB.g || kolA.b !== kolB.b ) malsamaj++;
}
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) j͑ʃɹ j͐ʃɹ ŋᷠɔ ⟅ j͑ʃ'ɔ ſ͕ɭэ ſɭɹ }ʃꞇ = ${malsamaj}`);

function vecax2lPare( ksaka: string, sef4: ( c: THREE.Color, h: number, x: number, z: number, d: number ) => number,
  h2y2k: ( c: THREE.Color, h: number, x: number, z: number, d: number ) => number ): void {
  for ( let i = 0o0; i < 0o4; i++ ) {
    sef4(kolB, 0o3, 0o12, 0o33, 0o25/0o100); h2y2k(kolA, 0o3, 0o12, 0o33, 0o25/0o100);
  }
  const tn: number[] = [], tm: number[] = [];
  let sn = 0o0, sm = 0o0;
  for ( let r = 0o0; r < C2QR; r++ ) {
    let t0: number;
    if ( ( r & 0o1 ) === 0o0 ) {
      t0 = performance.now();
      for ( let i = 0o0; i < KOLOJ; i++ ) { const o = i * 0o4; sn += sef4(kolB, hax2paksupusai[o], hax2paksupusai[o + 0o1], hax2paksupusai[o + 0o2], hax2paksupusai[o + 0o3]); }
      tn.push(performance.now() - t0);
      t0 = performance.now();
      for ( let i = 0o0; i < KOLOJ; i++ ) { const o = i * 0o4; sm += h2y2k(kolA, hax2paksupusai[o], hax2paksupusai[o + 0o1], hax2paksupusai[o + 0o2], hax2paksupusai[o + 0o3]); }
      tm.push(performance.now() - t0);
    } else {
      t0 = performance.now();
      for ( let i = 0o0; i < KOLOJ; i++ ) { const o = i * 0o4; sm += h2y2k(kolA, hax2paksupusai[o], hax2paksupusai[o + 0o1], hax2paksupusai[o + 0o2], hax2paksupusai[o + 0o3]); }
      tm.push(performance.now() - t0);
      t0 = performance.now();
      for ( let i = 0o0; i < KOLOJ; i++ ) { const o = i * 0o4; sn += sef4(kolB, hax2paksupusai[o], hax2paksupusai[o + 0o1], hax2paksupusai[o + 0o2], hax2paksupusai[o + 0o3]); }
      tn.push(performance.now() - t0);
    }
  }
  tn.sort(( a, b ) => a - b ); tm.sort(( a, b ) => a - b );
  const mn = tn[tn.length >> 0o1], mm = tm[tm.length >> 0o1];
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ${ksaka} ｡ ſɭˬɹ }ʃꞇ = ${knak2fecajasai(tbo(mm), 0o6)} He ſɭɔ˞ɜƴ ꞁȷ̀ᴜ }ʃꞇ = ${knak2fecajasai(tbo(mn), 0o6)} He j͑ʃɔ ֭ſɭɔ }ʃw = ${( mm / mn ).toFixed(0o2)}x ŋᷠɹ ŋᷠɹ ʌ j͑ʃ'ɔ ŋᷠɹ = ${Math.min(...tm).toFixed(0o1)} ${Math.min(...tn).toFixed(0o1)} ſɭᴜ }ʃᴜȝ ꞁȷ̀ᴜ }ʃꞇ = ${sn === sm ? "ſɭᴜ }ʃᴜȝ" : "j͑ʃ'ɔ ſ͕ɭэ ſɭɹ"}`);
}

vecax2lPare(`ſᶘꞇ ɭl̀ɔ`,
  ( c, h, x, z, d ) => { weh2Sef4(c, h, x, z, d); return c.r; },
  ( c, h, x, z, d ) => { weh2H2y2k(c, h, x, z, d); return c.r; });
