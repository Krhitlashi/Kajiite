// ≺⧼ ᶅſɔ ֭ſɭɹ 📃 ⧽≻

import * as THREE from "three";
import { mut6qWeh2En as weh2Sef4 } from "../../skek2/p6kpu/mut6q-haweh2.js";
import { mut6qWeh2En as weh2H2y2k } from "./h2y2k-mut6q-haweh2.js";
import { T2BAK2P2, VEQ6K2, k2fKanaq, knak2 } from "./k61e.js";

const C2QR = 0o11;
const KOLOJ = 0o200000;
const kolA = new THREE.Color(), kolB = new THREE.Color();
const hax2paksupusai: number[] = [];
for ( let i = 0o0; i < KOLOJ; i++ ) {
  hax2paksupusai.push(( i % 0o200 ) - 0o100, ( i % 0o1000 ) - 0o500, ( i % 0o777 ) - 0o400, 0o25/0o100 );
}

let veq6k2N2k = 0o0;
for ( let i = 0o0; i < KOLOJ; i++ ) {
  const o = i * 0o4;
  weh2H2y2k(kolA, hax2paksupusai[o], hax2paksupusai[o + 0o1], hax2paksupusai[o + 0o2], hax2paksupusai[o + 0o3]);
  weh2Sef4(kolB, hax2paksupusai[o], hax2paksupusai[o + 0o1], hax2paksupusai[o + 0o2], hax2paksupusai[o + 0o3]);
  if ( kolA.r !== kolB.r || kolA.g !== kolB.g || kolA.b !== kolB.b ) veq6k2N2k++;
}
console.log(`${T2BAK2P2} ſɭɹ ſᶘɔ ｡ ${VEQ6K2} ｡ ${knak2(veq6k2N2k, 0o0)}`);

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
  k2fKanaq(ksaka, tn, tm, sn, sm);
}

vecax2lPare(`ſᶘꞇ ɭl̀ɔ`,
  ( c, h, x, z, d ) => { weh2Sef4(c, h, x, z, d); return c.r; },
  ( c, h, x, z, d ) => { weh2H2y2k(c, h, x, z, d); return c.r; });
